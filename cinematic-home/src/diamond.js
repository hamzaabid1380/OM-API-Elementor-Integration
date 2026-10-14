import * as THREE from 'three';
import { MeshBVH, MeshBVHUniformStruct, BVHShaderGLSL, SAH } from 'three-mesh-bvh';
import { shapePositions, morphPositions, restPositions, smallStoneGeometry, SHAPE_ORDER } from './cut.js';

/**
 * Diamonds, ray traced through the real cut. The ray enters through the
 * facet it lands on, bounces around inside (total internal reflection does
 * most of the work, as in a real stone) and leaves through the facets that
 * let it out. Where it leaves, each wavelength bends by its own amount
 * (diamond's measured refractive index, 2.407 at red to 2.451 at violet),
 * which is where the fire comes from.
 *
 * What the stone shows is its surroundings, so it is lit like a product
 * photograph: a bright studio, plus the dark camera and photographer right
 * in front of it. On the better quality levels the studio is evaluated
 * exactly, light by light, so its edges stay sharp at any zoom; each pixel
 * is traced four times for clean edges inside the stone; and the prongs and
 * rails of the setting show up inside the centre stone, as they do in a
 * real set diamond.
 *
 * The same material draws the centre stone and, instanced, every small
 * stone (pave, hidden halo).
 */

// Diamond's refractive index by wavelength (Sellmeier, wavelength in micrometres).
export function diamondIOR( nm ) {
	const l2 = ( nm / 1000 ) ** 2;
	return Math.sqrt( 1 + ( 0.3306 * l2 ) / ( l2 - 0.175 ** 2 ) + ( 4.3356 * l2 ) / ( l2 - 0.106 ** 2 ) );
}

// CIE 1931 colour matching at the sample wavelengths, turned into linear sRGB
// weights (negative lobes dropped) that add up to white.
const CIE = {
	430: [ 0.2839, 0.0116, 1.3856 ], 470: [ 0.1954, 0.091, 1.2876 ], 510: [ 0.0093, 0.503, 0.1582 ],
	550: [ 0.4334, 0.995, 0.0087 ], 590: [ 1.0263, 0.757, 0.0011 ], 630: [ 0.6424, 0.265, 0.00005 ], 670: [ 0.0874, 0.032, 0 ],
};
function spectrum( waves ) {
	if ( waves === 3 ) {
		return { iors: [ 640, 550, 465 ].map( diamondIOR ), weights: [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ] };
	}
	const nms = [ 430, 470, 510, 550, 590, 630, 670 ];
	const rgb = nms.map( ( nm ) => {
		const [ X, Y, Z ] = CIE[ nm ];
		return [
			Math.max( 0, 3.2406 * X - 1.5372 * Y - 0.4986 * Z ),
			Math.max( 0, - 0.9689 * X + 1.8758 * Y + 0.0415 * Z ),
			Math.max( 0, 0.0557 * X - 0.204 * Y + 1.057 * Z ),
		];
	} );
	const sum = [ 0, 1, 2 ].map( ( c ) => rgb.reduce( ( a, w ) => a + w[ c ], 0 ) );
	return { iors: nms.map( diamondIOR ), weights: rgb.map( ( w ) => w.map( ( v, c ) => v / sum[ c ] ) ) };
}

/**
 * The light sweep: a tall strip of light that crosses the room (world space), so its
 * reflection runs across the stones and along the metal. One set of uniforms, shared by every
 * material that shows it; the engine moves it.
 */
export const SWEEP = {
	axis: { value: new THREE.Vector4( 1, 0, 0, 0.12 ) }, // normal of the strip's plane, half width
	dir: { value: new THREE.Vector4( 0, 0, 1, 0 ) }, // the strip's middle, brightness
};
export const SWEEP_GLSL = /* glsl */`
	uniform vec4 sweepAxis;
	uniform vec4 sweepDir;
	vec3 sweepLight( vec3 d ) {
		if ( sweepDir.w <= 0.0 ) return vec3( 0.0 );
		float across = abs( dot( d, sweepAxis.xyz ) );
		float band = 1.0 - smoothstep( sweepAxis.w * 0.5, sweepAxis.w, across );
		float facing = smoothstep( - 0.1, 0.5, dot( d, sweepDir.xyz ) );
		return vec3( 1.0, 0.97, 0.93 ) * ( band * facing * sweepDir.w );
	}
`;

/** The most capsules (prong and rail pieces) the centre stone can see inside it. */
export const MAX_CAPS = 36;

const vertexShader = /* glsl */`
	varying vec3 vWorldPosition;
	flat varying mat4 vToLocal;
	flat varying mat3 vToWorld;
	flat varying vec3 vCenter;
	void main() {
		mat4 m = modelMatrix;
		#ifdef USE_INSTANCING
			m = modelMatrix * instanceMatrix;
		#endif
		vToLocal = inverse( m );
		vToWorld = mat3( m );
		vCenter = m[ 3 ].xyz;
		vec4 wp = m * vec4( position, 1.0 );
		vWorldPosition = wp.xyz;
		gl_Position = projectionMatrix * viewMatrix * wp;
	}
`;

const fragmentShader = /* glsl */`
	#define RAY_OFFSET 1e-4
	${ BVHShaderGLSL.common_functions }
	${ BVHShaderGLSL.bvh_struct_definitions }
	${ BVHShaderGLSL.bvh_ray_functions }

	uniform mat3 envRotation;
	uniform float envIntensity;
	uniform BVH bvh;
	uniform float ior;
	uniform float iors[ WAVES ];
	uniform vec3 weights[ WAVES ];
	uniform int bounces;
	// How much of the light still inside after the last bounce comes out along its last direction.
	// With few bounces that is a lot of light, and one direction makes flat white patches; the light
	// levels turn it down (it would have bounced on and left mostly through the dark pavilion).
	uniform float tail;
	uniform vec3 obstruction; // cos inner, cos outer, how dark
	uniform float frost;
	uniform float opacity;
	uniform float glow;
	${ SWEEP_GLSL }
	#ifdef ANALYTIC_ENV
		uniform vec4 cardC[ CARDS ];
		uniform vec4 cardU[ CARDS ];
		uniform vec4 cardV[ CARDS ];
		uniform vec4 cardN[ CARDS ];
		uniform vec3 cardCol[ CARDS ];
		uniform vec3 dome;
	#else
		uniform samplerCube envMap;
	#endif
	#ifdef SETTING
		uniform vec4 capA[ ${ MAX_CAPS } ];
		uniform vec4 capB[ ${ MAX_CAPS } ];
		uniform int capCount;
		uniform samplerCube metalMap;
		uniform vec3 metalTint;
	#endif
	varying vec3 vWorldPosition;
	flat varying mat4 vToLocal;
	flat varying mat3 vToWorld;
	flat varying vec3 vCenter;

	vec3 toCamera;

	// The studio, light by light (or from its baked cube map).
	vec3 studio( vec3 d ) {
		#ifdef ANALYTIC_ENV
			float y = d.y;
			float g = y > 0.0 ? mix( dome.y, dome.x, pow( y, 0.7 ) ) : mix( dome.y, dome.z, pow( - y, 0.45 ) );
			vec3 c = vec3( g );
			for ( int i = 0; i < CARDS; i ++ ) {
				float dn = dot( d, cardN[ i ].xyz );
				if ( dn > - 1e-4 ) continue;
				float t = cardN[ i ].w / dn;
				if ( t <= 0.0 ) continue;
				vec3 l = d * t - cardC[ i ].xyz;
				float a = dot( l, cardU[ i ].xyz );
				float b = dot( l, cardV[ i ].xyz );
				float cov;
				if ( cardC[ i ].w > 0.5 ) {
					cov = 1.0 - smoothstep( 1.0 - cardU[ i ].w, 1.0 + cardU[ i ].w, length( vec2( a, b ) ) );
				} else {
					cov = ( 1.0 - smoothstep( 1.0 - cardU[ i ].w, 1.0 + cardU[ i ].w, abs( a ) ) )
						* ( 1.0 - smoothstep( 1.0 - cardV[ i ].w, 1.0 + cardV[ i ].w, abs( b ) ) );
				}
				c = mix( c, cardCol[ i ], cov );
			}
			return c;
		#else
			return texture( envMap, d ).rgb;
		#endif
	}

	// What a ray leaving the stone sees: the studio, with the camera and
	// photographer as a dark patch in front of the stone.
	vec3 env( vec3 dir ) {
		vec3 c = studio( envRotation * dir ) * envIntensity + sweepLight( dir );
		float o = smoothstep( obstruction.y, obstruction.x, dot( dir, toCamera ) );
		return c * mix( 1.0, obstruction.z, o );
	}

	float fresnel( float cosI, float etaI, float etaT ) {
		float sinT = etaI / etaT * sqrt( max( 0.0, 1.0 - cosI * cosI ) );
		if ( sinT >= 1.0 ) return 1.0;
		float cosT = sqrt( max( 0.0, 1.0 - sinT * sinT ) );
		float rs = ( etaT * cosI - etaI * cosT ) / ( etaT * cosI + etaI * cosT );
		float rp = ( etaI * cosI - etaT * cosT ) / ( etaI * cosI + etaT * cosT );
		return 0.5 * ( rs * rs + rp * rp );
	}

	#ifdef SETTING
		// Ray against a capsule (segment a-b, radius r): distance, or -1.
		float capsuleHit( vec3 ro, vec3 rd, vec3 a, vec3 b, float r ) {
			vec3 ba = b - a;
			vec3 oa = ro - a;
			float baba = dot( ba, ba );
			float bard = dot( ba, rd );
			float baoa = dot( ba, oa );
			float rdoa = dot( rd, oa );
			float oaoa = dot( oa, oa );
			float A = baba - bard * bard;
			float B = baba * rdoa - baoa * bard;
			float C = baba * oaoa - baoa * baoa - r * r * baba;
			float h = B * B - A * C;
			if ( h >= 0.0 ) {
				float t = ( - B - sqrt( h ) ) / A;
				float y = baoa + t * bard;
				if ( y > 0.0 && y < baba ) return t;
				vec3 oc = y <= 0.0 ? oa : ro - b;
				B = dot( rd, oc );
				C = dot( oc, oc ) - r * r;
				h = B * B - C;
				if ( h > 0.0 ) return - B - sqrt( h );
			}
			return - 1.0;
		}

		// A ray (stone space) that meets the prongs or rails sees polished metal.
		bool settingHit( vec3 ro, vec3 rd, out vec3 radiance ) {
			float best = 1e9;
			int bi = - 1;
			for ( int i = 0; i < ${ MAX_CAPS }; i ++ ) {
				if ( i >= capCount ) break;
				float t = capsuleHit( ro, rd, capA[ i ].xyz, capB[ i ].xyz, capA[ i ].w );
				if ( t > 1e-4 && t < best ) {
					best = t;
					bi = i;
				}
			}
			if ( bi < 0 ) return false;
			vec3 p = ro + rd * best;
			vec3 a = capA[ bi ].xyz;
			vec3 ba = capB[ bi ].xyz - a;
			float h = clamp( dot( p - a, ba ) / dot( ba, ba ), 0.0, 1.0 );
			vec3 nrm = normalize( p - a - ba * h );
			vec3 rW = normalize( vToWorld * reflect( rd, nrm ) );
			radiance = texture( metalMap, envRotation * rW ).rgb * metalTint * envIntensity * 0.9;
			return true;
		}
	#endif

	// One sample: reflection off the surface plus the light that comes back out.
	vec3 shade( vec3 p, vec3 view, vec3 n, float spread ) {
		float cosV = clamp( - dot( view, n ), 0.0, 1.0 );
		float fIn = fresnel( cosV, 1.0, ior );
		vec3 refl = reflect( view, n );
		vec3 surface;
		vec3 ro = ( vToLocal * vec4( p, 1.0 ) ).xyz;
		#ifdef SETTING
			if ( ! settingHit( ro, normalize( ( vToLocal * vec4( refl, 0.0 ) ).xyz ), surface ) ) surface = env( refl );
		#else
			surface = env( refl );
		#endif

		// Into the stone, in its own space (where the BVH lives).
		vec3 rd = normalize( ( vToLocal * vec4( refract( view, n, 1.0 / ior ), 0.0 ) ).xyz );

		// One path inside; each wavelength keeps its own share of the light.
		float through[ WAVES ];
		for ( int w = 0; w < WAVES; w ++ ) through[ w ] = 1.0;
		vec3 acc = vec3( 0.0 );
		for ( int i = 0; i < 12; i ++ ) {
			if ( i >= bounces ) break;
			uvec4 faceIndices = uvec4( 0u );
			vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
			vec3 barycoord = vec3( 0.0 );
			float side = 1.0;
			float dist = 0.0;
			bool hit = bvhIntersectFirstHit( bvh, ro + rd * RAY_OFFSET, rd, faceIndices, faceNormal, barycoord, side, dist );
			if ( ! hit ) break;
			ro = ro + rd * ( dist + RAY_OFFSET );
			vec3 fn = normalize( faceNormal );
			float cosI = clamp( - dot( rd, fn ), 0.0, 1.0 );
			bool blocked = false;
			vec3 metal = vec3( 0.0 );
			#ifdef SETTING
				vec3 mean = refract( rd, fn, ior );
				if ( dot( mean, mean ) > 0.0 ) blocked = settingHit( ro, normalize( mean ), metal );
			#endif
			float left = 0.0;
			for ( int w = 0; w < WAVES; w ++ ) {
				float eta = ior + ( iors[ w ] - ior ) * spread;
				vec3 o = refract( rd, fn, eta );
				if ( dot( o, o ) > 0.0 ) {
					float f = fresnel( cosI, eta, 1.0 );
					vec3 rad = blocked ? metal : env( normalize( vToWorld * o ) );
					acc += weights[ w ] * ( through[ w ] * ( 1.0 - f ) ) * rad;
					through[ w ] *= f;
				}
				left = max( left, through[ w ] );
			}
			rd = reflect( rd, fn );
			if ( left < 0.02 ) break;
		}
		// Whatever is still inside after the last bounce leaves the way it is heading.
		vec3 last = env( normalize( vToWorld * rd ) ) * tail;
		for ( int w = 0; w < WAVES; w ++ ) acc += weights[ w ] * through[ w ] * last;
		return surface * fIn + acc * ( 1.0 - fIn );
	}

	void main() {
		toCamera = normalize( cameraPosition - vCenter );
		vec3 dpx = dFdx( vWorldPosition );
		vec3 dpy = dFdy( vWorldPosition );
		vec3 n = normalize( cross( dpx, dpy ) );
		if ( dot( n, vWorldPosition - cameraPosition ) > 0.0 ) n = - n;

		// Several rays per pixel (rotated grid) for clean edges inside the stone.
		#if SS == 4
			const vec2 OFF[ 4 ] = vec2[ 4 ]( vec2( 0.125, 0.375 ), vec2( - 0.375, 0.125 ), vec2( - 0.125, - 0.375 ), vec2( 0.375, - 0.125 ) );
			const float SPREAD[ 4 ] = float[ 4 ]( 0.86, 1.14, 0.95, 1.05 );
		#elif SS == 2
			const vec2 OFF[ 2 ] = vec2[ 2 ]( vec2( 0.25, 0.25 ), vec2( - 0.25, - 0.25 ) );
			const float SPREAD[ 2 ] = float[ 2 ]( 0.93, 1.07 );
		#else
			const vec2 OFF[ 1 ] = vec2[ 1 ]( vec2( 0.0 ) );
			const float SPREAD[ 1 ] = float[ 1 ]( 1.0 );
		#endif
		vec3 col = vec3( 0.0 );
		for ( int s = 0; s < SS; s ++ ) {
			vec3 p = vWorldPosition + dpx * OFF[ s ].x + dpy * OFF[ s ].y;
			col += shade( p, normalize( p - cameraPosition ), n, SPREAD[ s ] );
		}
		col /= float( SS );

		// A polished girdle reads as a thin pale band, not a dark seam.
		vec3 nl = normalize( mat3( vToLocal ) * n );
		float g = 1.0 - smoothstep( 0.04, 0.2, abs( nl.y ) );
		col = mix( col, vec3( 0.5 ) * envIntensity, g * frost );

		col = min( col, vec3( 24.0 ) );
		col += glow * vec3( 1.0, 0.97, 0.92 );
		gl_FragColor = vec4( col, opacity );
	}
`;

let roundBVH = null;
function sharedRoundBVH() {
	// Small stones share one BVH: the round cut never changes shape.
	if ( ! roundBVH ) {
		const g = smallStoneGeometry();
		const bvh = new MeshBVH( g, { strategy: SAH, targetLeafSize: 4 } );
		roundBVH = { geometry: g, struct: new MeshBVHUniformStruct() };
		roundBVH.struct.updateFrom( bvh );
	}
	return roundBVH;
}

/**
 * opts: bounces, waves (3 or 7), ss (1, 2 or 4 rays per pixel), studio
 * (uniforms from stoneStudioUniforms, or null to read the cube map), setting
 * (a cube map for the metal, to show the prongs inside the stone).
 */
export function stoneMaterial( envCube, { bounces = 7, waves = 7, ss = 1, bvhStruct, studio = null, setting = null } ) {
	const { iors, weights } = spectrum( waves );
	const defines = { WAVES: waves, SS: ss };
	const uniforms = {
		envMap: { value: envCube },
		envRotation: { value: new THREE.Matrix3() },
		envIntensity: { value: 1 },
		bvh: { value: bvhStruct },
		ior: { value: diamondIOR( 589 ) },
		iors: { value: iors },
		weights: { value: weights.map( ( w ) => new THREE.Vector3( ...w ) ) },
		bounces: { value: bounces },
		tail: { value: 1 },
		obstruction: { value: new THREE.Vector3( Math.cos( THREE.MathUtils.degToRad( 21 ) ), Math.cos( THREE.MathUtils.degToRad( 30 ) ), 0.03 ) },
		frost: { value: 0.55 },
		opacity: { value: 1 },
		glow: { value: 0 },
		sweepAxis: SWEEP.axis,
		sweepDir: SWEEP.dir,
	};
	if ( studio ) {
		defines.ANALYTIC_ENV = '';
		defines.CARDS = studio.count;
		Object.assign( uniforms, {
			cardC: { value: studio.c },
			cardU: { value: studio.u },
			cardV: { value: studio.v },
			cardN: { value: studio.n },
			cardCol: { value: studio.col },
			dome: { value: studio.dome },
		} );
	}
	if ( setting ) {
		defines.SETTING = '';
		Object.assign( uniforms, {
			capA: { value: Array.from( { length: MAX_CAPS }, () => new THREE.Vector4() ) },
			capB: { value: Array.from( { length: MAX_CAPS }, () => new THREE.Vector4() ) },
			capCount: { value: 0 },
			metalMap: { value: setting },
			metalTint: { value: new THREE.Color( 1, 1, 1 ) },
		} );
	}
	return new THREE.ShaderMaterial( { vertexShader, fragmentShader, defines, uniforms } );
}

/**
 * The centre stone: morphs between shapes. While it moves, its rays are traced against the
 * morphing triangles (the BVH refitted each step); once it settles on a shape, against that
 * shape's own lean set of triangles (one BVH per shape, built once), so its rays stay quick.
 */
const restBVH = {};
function shapeBVH( name ) {
	if ( ! restBVH[ name ] ) {
		const g = new THREE.BufferGeometry();
		g.setAttribute( 'position', new THREE.BufferAttribute( restPositions( name ).slice(), 3 ) );
		restBVH[ name ] = new MeshBVH( g, { strategy: SAH, targetLeafSize: 4 } );
	}
	return restBVH[ name ];
}

export function createDiamond( envCube, { bounces = 7, waves = 7, ss = 1, studio = null, setting = null } = {} ) {
	const geometry = new THREE.BufferGeometry();
	const positions = shapePositions( 'round' ).slice();
	geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	let bvh = null;
	const bvhStruct = new MeshBVHUniformStruct();
	bvhStruct.updateFrom( shapeBVH( 'round' ) );

	const material = stoneMaterial( envCube, { bounces, waves, ss, bvhStruct, studio, setting } );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.name = 'diamond';

	let current = 0;
	return {
		mesh,
		material,
		/** 0 round, 1 emerald, 2 pear, 3 oval (see SHAPE_ORDER). */
		setMorph( m ) {
			if ( Math.abs( m - current ) < 1e-5 ) {
				return;
			}
			current = m;
			morphPositions( m, positions );
			geometry.attributes.position.needsUpdate = true;
			geometry.computeBoundingSphere();
			if ( Math.abs( m - Math.round( m ) ) < 1e-4 ) {
				const n = SHAPE_ORDER.length;
				bvhStruct.updateFrom( shapeBVH( SHAPE_ORDER[ ( ( Math.round( m ) % n ) + n ) % n ] ) );
				return;
			}
			if ( ! bvh ) {
				bvh = new MeshBVH( geometry, { strategy: SAH, targetLeafSize: 4 } );
			} else {
				bvh.refit();
			}
			bvhStruct.updateFrom( bvh );
		},
		setBounces( n ) {
			material.uniforms.bounces.value = n;
		},
		/**
		 * Step the quality down (or up): bounces, rays per pixel (ss), colours of light (waves),
		 * and whether the studio is evaluated light by light (exact) or read from its cube map.
		 * Changing ss, waves or exact recompiles the shader once.
		 */
		setQuality( { bounces, ss, waves, exact } ) {
			const d = material.defines;
			const u = material.uniforms;
			let dirty = false;
			if ( bounces !== undefined ) {
				u.bounces.value = bounces;
			}
			if ( ss !== undefined && d.SS !== ss ) {
				d.SS = ss;
				dirty = true;
			}
			if ( waves !== undefined && d.WAVES !== waves ) {
				const sp = spectrum( waves );
				d.WAVES = waves;
				u.iors.value = sp.iors;
				u.weights.value = sp.weights.map( ( w ) => new THREE.Vector3( ...w ) );
				dirty = true;
			}
			if ( exact === false && 'ANALYTIC_ENV' in d ) {
				delete d.ANALYTIC_ENV;
				dirty = true;
			}
			if ( dirty ) {
				material.needsUpdate = true;
			}
		},
		/** The setting as capsules in the stone's own space: [ax, ay, az, r, bx, by, bz] each. */
		setSetting( caps, tint ) {
			const u = material.uniforms;
			if ( ! u.capA ) {
				return;
			}
			const n = Math.min( MAX_CAPS, caps.length );
			for ( let i = 0; i < n; i ++ ) {
				const c = caps[ i ];
				u.capA.value[ i ].set( c[ 0 ], c[ 1 ], c[ 2 ], c[ 3 ] );
				u.capB.value[ i ].set( c[ 4 ], c[ 5 ], c[ 6 ], 0 );
			}
			u.capCount.value = n;
			if ( tint ) {
				u.metalTint.value.copy( tint );
			}
		},
	};
}

/** Material for the small stones (pave, hidden halo): instanced, same physics. */
export function smallStoneMaterial( envCube, { bounces = 4, waves = 3, studio = null } = {} ) {
	return stoneMaterial( envCube, { bounces, waves, ss: 1, bvhStruct: sharedRoundBVH().struct, studio } );
}
