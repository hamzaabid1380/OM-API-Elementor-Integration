import * as THREE from 'three';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, VignetteEffect, NoiseEffect, ToneMappingEffect, ToneMappingMode, BlendFunction, Effect, DepthOfFieldEffect } from 'postprocessing';
import { createStudio, stoneStudioUniforms, moodLights } from './studio.js';
import { createAtmosphere } from './atmos.js';
import { createDiamond, SWEEP } from './diamond.js';
import { createRing, HEAD_Y } from './ring.js';
import { createGlints } from './glints.js';

/** Quality tiers. The governor in film.js steps down when frames run slow. */
export const TIERS = {
	// ss: rays per pixel inside the centre stone; exact: the studio evaluated light by light;
	// ao: contact shadows; dpr: the most pixels drawn per point (2: a Retina screen in full);
	// supersample: render above screen resolution on 1x screens; budget: pixels at most (see fit.js);
	// dof: a macro lens's depth of field, off everywhere: the ring stays crisp edge to edge.
	high: { name: 'high', dpr: 2, supersample: 1.5, budget: 8.3e6, msaa: 4, bounces: 8, waves: 7, ss: 4, exact: true, cube: 512, metal: 512, grain: true, dof: false, ao: true },
	medium: { name: 'medium', dpr: 2, supersample: 1, budget: 8.3e6, msaa: 2, bounces: 6, waves: 7, ss: 1, exact: true, cube: 512, metal: 256, grain: true, dof: false, ao: false },
	low: { name: 'low', dpr: 1, supersample: 1, budget: 2.6e6, msaa: 0, bounces: 4, tail: 0.85, waves: 3, ss: 1, exact: false, cube: 256, metal: 256, grain: false, dof: false, ao: false },
	// The lightest: fewer light paths inside the stones (uniforms, so no shaders to rebuild from
	// low), the light still inside after the last one turned down so the stone keeps its facet
	// pattern. Only reached by measuring: for laptops that would otherwise get the pictures.
	lite: { name: 'lite', dpr: 1, supersample: 1, budget: 2.6e6, msaa: 0, bounces: 3, tail: 0.5, waves: 3, ss: 1, exact: false, cube: 256, metal: 256, grain: false, dof: false, ao: false },
	// The floor, for the weakest built-in graphics: two light paths inside the stones (a third
	// cheaper again than the light level), what is left turned well down so no facet goes flat white.
	lite2: { name: 'lite2', dpr: 1, supersample: 1, budget: 2.6e6, msaa: 0, bounces: 2, tail: 0.45, waves: 3, ss: 1, exact: false, cube: 256, metal: 256, grain: false, dof: false, ao: false },
};

/** Film grain on the richer levels: a hint of texture that never clouds the stone's edges. */
const GRAIN = 0.02;

/** Backdrops: [centre, edge]. */
const PALETTES = [
	[ '#221b14', '#030304' ], // 0 first light
	[ '#2e2318', '#080605' ], // 1 1971, warm
	[ '#1a2333', '#05070b' ], // 2 night studio
	[ '#ffffff', '#ffffff' ], // 3 white (catalogue cards, like the product photos)
	[ '#1f2738', '#0b0e14' ], // 4 visit, brand night
];

export function defaults() {
	return {
		tx: 0, ty: HEAD_Y, tz: 0, dist: 3.6, az: 0.55, el: 0.3, fov: 24, shift: 0, shiftY: 0,
		spin: 0, wobble: 1, shimmer: 1, band: 0, prongs: 0, morph: 0, metal: 0, halo: 0, pave: 0,
		env: 0, exposure: 1, bg: 0, glint: 0, endGlow: 1, glow: 0, dof: 0, focus: 0,
		// mood: photo studio (0) to jewellery case (1); turn: the loose stone turning on its own (rad/s);
		// motes, beam: the air in the case; pool: how tightly the backdrop's light gathers behind the subject.
		mood: 0, turn: 0, motes: 0, beam: 0, pool: 0,
		// bloom: how much the brightest flashes glow (1 = the usual soft glow).
		bloom: 1,
		// spinTall: an extra turn on tall screens only, where the words sit below the ring instead of beside it.
		spinTall: 0,
		// The light sweep: a tall strip of light crossing behind the camera from left (-1) to right (1);
		// sweepGain: how bright; idle: sweeps on its own every few seconds (the opening, before any scroll).
		sweep: - 2, sweepGain: 0, idle: 0,
		// forge: how hot newly cast metal glows behind the band's growing ends.
		forge: 0,
	};
}

const backVertex = /* glsl */`
	varying vec2 vUv;
	void main() {
		vUv = position.xy * 0.5 + 0.5;
		gl_Position = vec4( position.xy, 0.99999, 1.0 );
	}
`;
const backFragment = /* glsl */`
	uniform vec3 inner;
	uniform vec3 outer;
	uniform vec2 centre;
	uniform float aspect;
	uniform float spread;
	varying vec2 vUv;
	void main() {
		vec2 d = ( vUv - centre ) * vec2( aspect, 1.0 );
		float t = smoothstep( 0.0, spread, length( d ) );
		vec3 c = mix( inner, outer, t );
		// A touch of dither so the gradient never bands.
		float n = fract( sin( dot( gl_FragCoord.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
		c += ( n - 0.5 ) / 255.0;
		gl_FragColor = vec4( c, 1.0 );
	}
`;

class GradeEffect extends Effect {
	constructor() {
		super( 'GradeEffect', /* glsl */`
			uniform float exposure;
			void mainImage( const in vec4 inputColor, const in vec2 uv, out vec4 outputColor ) {
				outputColor = vec4( inputColor.rgb * exposure, inputColor.a );
			}
		`, { uniforms: new Map( [ [ 'exposure', new THREE.Uniform( 1 ) ] ] ) } );
	}
}

/**
 * The film's renderer. `aoPass` is the contact-shadow pass class (N8AOPostPass); it can
 * also arrive later through useAO(), so pages can load it only where the best tier runs.
 */
export function createEngine( canvas, { tier = TIERS.high, preserve = false, aoPass = null } = {} ) {
	const renderer = new THREE.WebGLRenderer( {
		canvas,
		antialias: false,
		alpha: false,
		stencil: false,
		depth: true,
		powerPreference: 'high-performance',
		preserveDrawingBuffer: preserve,
	} );
	renderer.toneMapping = THREE.NoToneMapping;
	renderer.outputColorSpace = THREE.SRGBColorSpace;

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 24, 1, 0.05, 80 );

	const studio = createStudio( renderer, { size: tier.cube, metal: tier.metal } );
	scene.environment = studio.env;
	const exact = tier.exact ? stoneStudioUniforms() : null;

	const ring = createRing( { cube: studio.cube, rotation: studio.rotation, studio: exact } );
	scene.add( ring.group );
	// Elongated shapes sit north-south on the finger.
	ring.head.rotation.y = Math.PI / 2;

	// The centre stone also sees the prongs and rails of its own setting.
	const diamond = createDiamond( studio.cube, { bounces: tier.bounces, waves: tier.waves, ss: tier.ss, studio: exact, setting: studio.bright } );
	diamond.material.uniforms.envRotation.value = studio.rotation;
	ring.head.add( diamond.mesh );

	const backMat = new THREE.ShaderMaterial( {
		vertexShader: backVertex,
		fragmentShader: backFragment,
		depthWrite: false,
		depthTest: false,
		uniforms: {
			inner: { value: new THREE.Color() },
			outer: { value: new THREE.Color() },
			centre: { value: new THREE.Vector2( 0.5, 0.55 ) },
			aspect: { value: 1 },
			spread: { value: 1.05 },
		},
	} );
	const back = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), backMat );
	back.frustumCulled = false;
	back.renderOrder = - 1000;
	scene.add( back );

	const glints = createGlints( scene );
	const atmos = createAtmosphere( scene );
	const stoneAt = new THREE.Vector3( 0, HEAD_Y, 0 );
	const buffer = new THREE.Vector2();
	let stonePhase = 0;
	let lastTime = null;

	let composer;
	let grade;
	let bloom;
	let vignette;
	let noise = null;
	let dof = null;
	let dofPass = null;
	let ao = null;
	let AOPass = aoPass;
	const size = { w: 1, h: 1 };
	function buildPost( t ) {
		if ( composer ) {
			composer.dispose();
		}
		composer = new EffectComposer( renderer, { frameBufferType: THREE.HalfFloatType, multisampling: t.msaa } );
		composer.addPass( new RenderPass( scene, camera ) );
		// Contact shadows where metal meets stone and metal meets metal (best tier).
		ao = null;
		if ( t.ao && AOPass ) {
			ao = new AOPass( scene, camera, size.w, size.h );
			Object.assign( ao.configuration, { aoRadius: 0.09, distanceFalloff: 0.6, intensity: 2.2, aoSamples: 16, denoiseSamples: 8, denoiseRadius: 8, gammaCorrection: false, halfRes: false } );
			composer.addPass( ao );
		}
		// Macro-lens depth of field, for a level that asks for it (none does now; off when unused).
		dof = null;
		dofPass = null;
		if ( t.dof ) {
			dof = new DepthOfFieldEffect( camera, { focusDistance: 3, focusRange: 0.6, bokehScale: 0, resolutionScale: 0.5 } );
			dofPass = new EffectPass( camera, dof );
			dofPass.enabled = false;
			composer.addPass( dofPass );
		}
		bloom = new BloomEffect( { intensity: 0.35, luminanceThreshold: 1.6, luminanceSmoothing: 0.4, mipmapBlur: true, radius: 0.62, levels: 8 } );
		grade = new GradeEffect();
		const tone = new ToneMappingEffect( { mode: ToneMappingMode.NEUTRAL } );
		vignette = new VignetteEffect( { offset: 0.3, darkness: 0.55 } );
		const effects = [ bloom, grade, tone, vignette ];
		noise = null;
		if ( t.grain ) {
			noise = new NoiseEffect( { premultiply: true, blendFunction: BlendFunction.SCREEN } );
			noise.blendMode.opacity.value = GRAIN;
			effects.push( noise );
		}
		composer.addPass( new EffectPass( camera, ...effects ) );
	}
	buildPost( tier );
	// The light still inside after the last bounce, and the small stones' bounces, per level.
	function stoneQuality( t ) {
		const small = ring.pave && ring.pave.material.uniforms;
		if ( small && small.bounces ) {
			small.bounces.value = Math.min( 4, t.bounces );
		}
		for ( const u of [ diamond.material.uniforms, small ] ) {
			if ( u && u.tail ) {
				u.tail.value = t.tail === undefined ? 1 : t.tail;
			}
		}
	}
	stoneQuality( tier );

	const cA = new THREE.Color();
	const cB = new THREE.Color();
	// The white backdrop is pushed past 1 so it still reads pure white after tone mapping.
	const palettes = PALETTES.map( ( p, i ) => [ new THREE.Color( p[ 0 ] ).multiplyScalar( i === 3 ? 2.2 : 1 ), new THREE.Color( p[ 1 ] ).multiplyScalar( i === 3 ? 2.2 : 1 ) ] );
	const ends = [ new THREE.Vector3(), new THREE.Vector3() ];
	const camBack = new THREE.Vector3();
	const camUp = new THREE.Vector3();
	const swDir = new THREE.Vector3();
	const swAxis = new THREE.Vector3();
	const pings = [];
	const pingPool = Array.from( { length: 24 }, () => ( { pos: new THREE.Vector3(), s: 0, size: 0 } ) );

	/**
	 * The light sweep for this frame: where the strip is (-1 left .. 1 right, beyond 1.4 off)
	 * and how bright. It crosses behind the camera, a little above it, so its reflection runs
	 * across whatever faces the lens.
	 */
	function sweepLight( S, time ) {
		let at = S.sweep;
		let gain = S.sweepGain;
		if ( Math.abs( at ) >= 1.4 || gain <= 0 ) {
			// Between scroll sweeps, the opening's own: one pass every few seconds.
			at = ( ( time / 6.5 ) % 1 ) * 4 - 1.6;
			gain = S.idle;
		}
		const fade = 1 - THREE.MathUtils.smoothstep( Math.abs( at ), 1, 1.4 );
		const k = gain * fade;
		if ( k <= 0.001 ) {
			SWEEP.dir.value.w = 0;
			return;
		}
		camBack.copy( camera.position ).sub( target ).normalize();
		camUp.set( 0, 1, 0 ).applyQuaternion( camera.quaternion );
		swDir.copy( camBack ).applyAxisAngle( camUp, at * 1.05 ).addScaledVector( camUp, 0.3 ).normalize();
		swAxis.crossVectors( swDir, camUp ).normalize();
		SWEEP.axis.value.set( swAxis.x, swAxis.y, swAxis.z, 0.085 );
		SWEEP.dir.value.set( swDir.x, swDir.y, swDir.z, k );
	}
	const target = new THREE.Vector3();

	function setBackdrop( bg ) {
		const i = Math.max( 0, Math.min( palettes.length - 1, Math.floor( bg ) ) );
		const j = Math.min( palettes.length - 1, i + 1 );
		const t = Math.min( 1, Math.max( 0, bg - i ) );
		cA.copy( palettes[ i ][ 0 ] ).lerp( palettes[ j ][ 0 ], t );
		cB.copy( palettes[ i ][ 1 ] ).lerp( palettes[ j ][ 1 ], t );
		backMat.uniforms.inner.value.copy( cA );
		backMat.uniforms.outer.value.copy( cB );
	}

	return {
		renderer,
		scene,
		camera,
		ring,
		diamond,
		studio,
		tier,
		get size() {
			return size;
		},
		resize( w, h, dpr ) {
			size.w = w;
			size.h = h;
			renderer.setPixelRatio( dpr );
			renderer.setSize( w, h, false );
			composer.setSize( w, h );
			camera.aspect = w / h;
			backMat.uniforms.aspect.value = w / h;
			camera.updateProjectionMatrix();
		},
		setTier( t ) {
			this.tier = t;
			// Fewer bounces, rays and colours in the centre stone; the studio as a cube map on the lightest level.
			diamond.setQuality( { bounces: t.bounces, ss: t.ss, waves: t.waves, exact: t.exact } );
			stoneQuality( t );
			buildPost( t );
			composer.setSize( size.w, size.h );
		},
		/** Add the contact shadows once their code has arrived (they only run on the best tier). */
		useAO( Pass ) {
			AOPass = Pass;
			if ( this.tier.ao ) {
				buildPost( this.tier );
				composer.setSize( size.w, size.h );
			}
		},
		/**
		 * Compile every material the way the film draws it (into the composer's
		 * linear buffer) without freezing the page; resolves when the first frame
		 * can be drawn without a stall. Where the browser cannot compile in the
		 * background this still works, it just compiles in one go.
		 */
		warm() {
			const prev = renderer.getRenderTarget();
			renderer.setRenderTarget( composer.inputBuffer );
			let ready;
			try {
				ready = renderer.compileAsync( scene, camera );
			} finally {
				renderer.setRenderTarget( prev );
			}
			return ready;
		},
		/** How much of the picture the centre stone covered in the last frame drawn (0 to 1). */
		stoneCoverage() {
			const g = diamond.mesh.geometry;
			if ( ! g.boundingSphere ) {
				g.computeBoundingSphere();
			}
			const c = g.boundingSphere.center.clone().applyMatrix4( diamond.mesh.matrixWorld );
			const r = g.boundingSphere.radius * diamond.mesh.matrixWorld.getMaxScaleOnAxis();
			const d = camera.position.distanceTo( c );
			if ( d <= r ) {
				return 1;
			}
			const k = r / ( d * Math.tan( THREE.MathUtils.degToRad( camera.fov ) / 2 ) );
			return Math.min( 1, ( Math.PI * k * k ) / ( 4 * camera.aspect ) );
		},
		/**
		 * How long this device takes to draw state S, in milliseconds, waiting for the graphics
		 * chip to finish each frame: the median of a few frames, after one that wakes it up.
		 * A very slow device stops early (the answer is already clear).
		 */
		async bench( S, frames = 3 ) {
			const gl = renderer.getContext();
			const px = new Uint8Array( 4 );
			const times = [];
			for ( let i = 0; i <= frames; i ++ ) {
				const t0 = performance.now();
				this.render( S, i * 0.04 );
				renderer.setRenderTarget( null );
				gl.readPixels( 0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px );
				const ms = performance.now() - t0;
				// The first frame wakes the chip up; it only counts when it already shows the device is far too slow.
				if ( i > 0 || ms > 1500 ) {
					times.push( ms );
				}
				if ( ms > ( i ? 300 : 1500 ) ) {
					break;
				}
				// Let the page breathe between frames.
				await new Promise( ( r ) => setTimeout( r, 0 ) );
			}
			times.sort( ( a, b ) => a - b );
			return times[ Math.floor( ( times.length - 1 ) / 2 ) ];
		},
		/** Draw one frame of state S at time (seconds). */
		render( S, time ) {
			const ce = Math.cos( S.el );
			// Tall screens: widen the lens so the ring keeps roughly the same width in frame.
			const aspect = size.w / size.h;
			const w = size.w;
			const h = size.h;
			const portrait = h > w * 1.05;
			// Squarer landscape screens (4:3 laptops, tablets on their side): the words keep their width
			// while the picture narrows, so the lens pulls back a little and the subject moves further
			// aside, clear of them.
			const squeeze = portrait ? 0 : THREE.MathUtils.clamp( ( 1.75 - aspect ) / 0.5, 0, 1 );
			let k = aspect < 1.25 ? Math.min( 2.4, Math.pow( 1.6 / aspect, 0.62 ) ) : 1;
			k *= 1 + 0.25 * squeeze;
			let fov = S.fov;
			if ( k !== 1 ) {
				fov = THREE.MathUtils.radToDeg( 2 * Math.atan( Math.tan( THREE.MathUtils.degToRad( fov / 2 ) ) * k ) );
			}
			camera.fov = fov;
			camera.position.set( S.tx + S.dist * ce * Math.sin( S.az ), S.ty + S.dist * Math.sin( S.el ), S.tz + S.dist * ce * Math.cos( S.az ) );
			camera.up.set( 0, 1, 0 );
			target.set( S.tx, S.ty, S.tz );
			camera.lookAt( target );
			// Lens shift: move the subject off-centre without bending the perspective.
			const sx = portrait ? 0 : S.shift * ( 1 + 0.45 * squeeze );
			const sy = portrait ? S.shiftY : 0;
			if ( sx || sy ) {
				camera.setViewOffset( w, h, - sx * w * 0.5, sy * h * 0.5, w, h );
			} else {
				camera.clearViewOffset();
			}
			camera.updateProjectionMatrix();
			// The backdrop's light gathers behind the subject, wherever the lens puts it.
			backMat.uniforms.centre.value.set( 0.5 + sx * 0.5, 0.53 + sy * 0.5 );
			backMat.uniforms.spread.value = 1.05 - 0.38 * S.pool;

			// The loose stone turns on its own in the light; once the setting starts it eases back to
			// rest (a whole turn, so its facets line up with the prongs again).
			const dt = lastTime === null ? 0 : Math.min( 0.1, Math.max( 0, time - lastTime ) );
			lastTime = time;
			if ( ( S.turn || 0 ) > 0.0005 ) {
				stonePhase += S.turn * dt;
			} else {
				const rest = Math.round( stonePhase / ( Math.PI * 2 ) ) * Math.PI * 2;
				stonePhase = rest + ( stonePhase - rest ) * Math.exp( - dt * 2.5 );
			}
			diamond.mesh.rotation.y = stonePhase;
			ring.group.rotation.y = S.spin + ( portrait ? S.spinTall : 0 ) + S.wobble * Math.sin( time * 0.32 ) * 0.28;
			// The lights: photo studio or jewellery case (the glints follow the case's spots).
			if ( exact ) {
				exact.mood( S.mood );
			} else {
				moodLights( S.mood );
			}
			ring.update( S );
			diamond.setMorph( S.morph );
			diamond.setSetting( ring.setting, ring.metals[ 1 ].color );
			diamond.material.uniforms.glow.value = S.glow;

			const envA = S.env + S.shimmer * Math.sin( time * 0.19 + 1.3 ) * 0.42;
			studio.setAngle( envA );
			scene.environmentRotation.y = envA;

			setBackdrop( S.bg );
			grade.uniforms.get( 'exposure' ).value = S.exposure;
			const white = Math.max( 0, 1 - Math.abs( S.bg - 3 ) * 2 );
			vignette.darkness = 0.55 * ( 1 - white );
			bloom.intensity = 0.35 * S.bloom * ( 1 - white );
			bloom.luminanceMaterial.threshold = Math.max( 0.9, 1.6 - 0.45 * ( S.bloom - 1 ) );
			if ( noise ) {
				noise.blendMode.opacity.value = GRAIN * ( 1 - white );
			}

			if ( dofPass ) {
				dofPass.enabled = S.dof > 0.01;
				dof.bokehScale = S.dof * 3.2;
				dof.cocMaterial.focusDistance = S.focus || S.dist;
				dof.cocMaterial.focusRange = 0.25 + S.dist * 0.12;
			}
			scene.updateMatrixWorld();
			ring.syncFlow();
			sweepLight( S, time );
			const growing = S.band > 0.001 && S.band < 0.999;
			ends[ 0 ].copy( ring.bandEnds[ 0 ] ).applyMatrix4( ring.group.matrixWorld );
			ends[ 1 ].copy( ring.bandEnds[ 1 ] ).applyMatrix4( ring.group.matrixWorld );
			renderer.getDrawingBufferSize( buffer );
			atmos.update( {
				time,
				centre: stoneAt,
				motes: S.motes * ( 1 - white ),
				beam: S.beam * ( 1 - white ),
				pxScale: buffer.y / ( 2 * Math.tan( THREE.MathUtils.degToRad( camera.fov ) / 2 ) ),
			} );
			// Glints where a claw closes over the stone and where a small stone lands in its seat.
			pings.length = 0;
			let used = 0;
			const ping = ( local, obj, s, size ) => {
				if ( s > 0.02 && used < pingPool.length ) {
					const p = pingPool[ used ++ ];
					p.pos.copy( local ).applyMatrix4( obj.matrixWorld );
					p.s = s;
					p.size = size;
					pings.push( p );
				}
			};
			for ( const tip of ring.tips ) {
				if ( tip.on > 0.5 ) {
					ping( tip.pos, ring.head, Math.sin( Math.PI * THREE.MathUtils.clamp( ( tip.closed - 0.7 ) / 0.3, 0, 1 ) ), 0.75 );
				}
			}
			for ( const sp of ring.sparks.halo ) {
				ping( sp.pos, ring.head, sp.s, sp.size );
			}
			for ( const sp of ring.sparks.pave ) {
				ping( sp.pos, ring.group, sp.s, sp.size );
			}
			glints.update( camera, {
				diamond: diamond.mesh,
				pave: ring.pave,
				envAngle: envA,
				strength: S.glint,
				ends,
				endGlow: growing ? S.endGlow * Math.min( 1, ( 1 - S.band ) * 6 ) : 0,
				pings,
			} );
			composer.render();
		},
	};
}
