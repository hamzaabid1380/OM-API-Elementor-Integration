import * as THREE from 'three';

/**
 * The air around the stone in the jewellery case: a soft beam of light from
 * above, and fine motes drifting through it that catch the light. Both are
 * drawn additively and cost almost nothing; `motes` and `beam` (0..1) fade
 * them in and out.
 */
const moteVertex = /* glsl */`
	uniform float time;
	uniform float scale;
	uniform vec3 centre;
	uniform vec3 lightDir;
	attribute vec4 seed;
	varying float vAlpha;
	void main() {
		// Each mote wanders on its own slow loop and rises, wrapping round the box.
		vec3 p = position;
		p.x += sin( time * ( 0.11 + seed.x * 0.08 ) + seed.y * 6.28 ) * 0.22;
		p.z += cos( time * ( 0.09 + seed.y * 0.07 ) + seed.z * 6.28 ) * 0.22;
		p.y = mod( p.y + time * ( 0.035 + seed.z * 0.05 ) + 2.4, 4.8 ) - 2.4;
		vec3 world = centre + p;
		// Brightest inside the beam (distance from its axis), fading out of it.
		vec3 rel = world - centre;
		float along = dot( rel, - lightDir );
		float off = length( rel + lightDir * along );
		float inBeam = 1.0 - smoothstep( 0.6, 2.6, off );
		float twinkle = 0.55 + 0.45 * sin( time * ( 0.8 + seed.w * 1.6 ) + seed.x * 40.0 );
		vec4 mv = modelViewMatrix * vec4( world, 1.0 );
		gl_Position = projectionMatrix * mv;
		float size = mix( 0.006, 0.022, seed.w * seed.w );
		// Never a blurry blob, even right in front of the lens.
		gl_PointSize = clamp( size * scale / - mv.z, 1.0, 7.0 );
		vAlpha = ( 0.18 + 0.82 * inBeam ) * twinkle * ( 0.35 + 0.65 * seed.w );
	}
`;
const moteFragment = /* glsl */`
	uniform float strength;
	varying float vAlpha;
	void main() {
		float r = length( gl_PointCoord - 0.5 ) * 2.0;
		float a = smoothstep( 1.0, 0.0, r );
		a *= a;
		gl_FragColor = vec4( vec3( 1.0, 0.93, 0.8 ) * a * vAlpha * strength, 1.0 );
	}
`;

const beamVertex = /* glsl */`
	varying vec3 vNormalW;
	varying vec3 vWorld;
	varying float vAlong;
	void main() {
		vAlong = uv.y;
		vec4 w = modelMatrix * vec4( position, 1.0 );
		vWorld = w.xyz;
		vNormalW = normalize( mat3( modelMatrix ) * normal );
		gl_Position = projectionMatrix * viewMatrix * w;
	}
`;
const beamFragment = /* glsl */`
	uniform float strength;
	uniform vec3 tint;
	varying vec3 vNormalW;
	varying vec3 vWorld;
	varying float vAlong;
	void main() {
		// Thickest where the eye looks through the middle of the cone; soft at its edges and ends.
		vec3 v = normalize( cameraPosition - vWorld );
		float face = abs( dot( v, vNormalW ) );
		float a = pow( face, 2.2 );
		a *= smoothstep( 0.0, 0.35, vAlong ) * ( 1.0 - smoothstep( 0.82, 1.0, vAlong ) );
		gl_FragColor = vec4( tint * a * strength, 1.0 );
	}
`;

export function createAtmosphere( scene, { count = 150 } = {} ) {
	const rand = ( () => {
		let s = 7;
		return () => ( ( s = ( s * 16807 ) % 2147483647 ) / 2147483647 );
	} )();
	const pos = new Float32Array( count * 3 );
	const seed = new Float32Array( count * 4 );
	for ( let i = 0; i < count; i ++ ) {
		pos[ i * 3 ] = ( rand() - 0.5 ) * 6.4;
		pos[ i * 3 + 1 ] = ( rand() - 0.5 ) * 4.8;
		pos[ i * 3 + 2 ] = ( rand() - 0.5 ) * 6.4;
		seed.set( [ rand(), rand(), rand(), rand() ], i * 4 );
	}
	const geo = new THREE.BufferGeometry();
	geo.setAttribute( 'position', new THREE.BufferAttribute( pos, 3 ) );
	geo.setAttribute( 'seed', new THREE.BufferAttribute( seed, 4 ) );
	const lightDir = new THREE.Vector3( - 0.32, - 1, 0.18 ).normalize();
	const moteMat = new THREE.ShaderMaterial( {
		vertexShader: moteVertex,
		fragmentShader: moteFragment,
		transparent: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending,
		uniforms: {
			time: { value: 0 },
			scale: { value: 800 },
			centre: { value: new THREE.Vector3() },
			lightDir: { value: lightDir },
			strength: { value: 0 },
		},
	} );
	const motes = new THREE.Points( geo, moteMat );
	motes.frustumCulled = false;
	motes.renderOrder = 5;
	scene.add( motes );

	// The beam: an open cone from high above, slightly behind and to the right, down onto the stone.
	const len = 7.5;
	const beamGeo = new THREE.CylinderGeometry( 0.12, 1.15, len, 64, 1, true );
	beamGeo.translate( 0, len / 2, 0 );
	const beamMat = new THREE.ShaderMaterial( {
		vertexShader: beamVertex,
		fragmentShader: beamFragment,
		transparent: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending,
		side: THREE.FrontSide,
		uniforms: { strength: { value: 0 }, tint: { value: new THREE.Color( 1, 0.9, 0.74 ).multiplyScalar( 0.07 ) } },
	} );
	const beam = new THREE.Mesh( beamGeo, beamMat );
	beam.frustumCulled = false;
	beam.renderOrder = 4;
	// The cone's wide end sits at the stone; it points back up along the light.
	beam.quaternion.setFromUnitVectors( new THREE.Vector3( 0, 1, 0 ), lightDir.clone().negate() );
	scene.add( beam );

	return {
		/** centre: the stone's world position; pxScale: canvas height in pixels over the lens. */
		update( { time, centre, motes: m = 0, beam: b = 0, pxScale = 800 } ) {
			moteMat.uniforms.time.value = time;
			moteMat.uniforms.strength.value = m;
			moteMat.uniforms.scale.value = pxScale;
			moteMat.uniforms.centre.value.copy( centre );
			motes.visible = m > 0.002;
			beamMat.uniforms.strength.value = b;
			beam.position.copy( centre );
			beam.visible = b > 0.002;
		},
	};
}
