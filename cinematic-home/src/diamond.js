import * as THREE from 'three';
import { MeshBVH, MeshBVHUniformStruct, BVHShaderGLSL, SAH } from 'three-mesh-bvh';
import { shapePositions, morphPositions } from './cut.js';

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
 * in front of it. That dark reflection is what draws the crisp grey and
 * black pattern you see in real diamond photos.
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

	uniform samplerCube envMap;
	uniform mat3 envRotation;
	uniform float envIntensity;
	uniform BVH bvh;
	uniform float ior;
	uniform float iors[ WAVES ];
	uniform vec3 weights[ WAVES ];
	uniform int bounces;
	uniform vec3 obstruction; // cos inner, cos outer, how dark
	uniform float opacity;
	uniform float glow;
	varying vec3 vWorldPosition;
	flat varying mat4 vToLocal;
	flat varying mat3 vToWorld;
	flat varying vec3 vCenter;

	vec3 toCamera;

	// The studio, with the camera and photographer as a dark patch in front of the stone.
	vec3 env( vec3 dir ) {
		vec3 c = texture( envMap, envRotation * dir ).rgb * envIntensity;
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

	void main() {
		toCamera = normalize( cameraPosition - vCenter );
		vec3 n = normalize( cross( dFdx( vWorldPosition ), dFdy( vWorldPosition ) ) );
		vec3 view = normalize( vWorldPosition - cameraPosition );
		if ( dot( n, view ) > 0.0 ) n = - n;

		float cosV = clamp( - dot( view, n ), 0.0, 1.0 );
		float fIn = fresnel( cosV, 1.0, ior );
		vec3 surface = env( reflect( view, n ) );

		// Into the stone, in its own space (where the BVH lives).
		vec3 rdW = refract( view, n, 1.0 / ior );
		vec3 ro = ( vToLocal * vec4( vWorldPosition, 1.0 ) ).xyz;
		vec3 rd = normalize( ( vToLocal * vec4( rdW, 0.0 ) ).xyz );

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
			float left = 0.0;
			for ( int w = 0; w < WAVES; w ++ ) {
				vec3 o = refract( rd, fn, iors[ w ] );
				if ( dot( o, o ) > 0.0 ) {
					float f = fresnel( cosI, iors[ w ], 1.0 );
					vec3 dirW = normalize( vToWorld * o );
					acc += weights[ w ] * ( through[ w ] * ( 1.0 - f ) ) * env( dirW );
					through[ w ] *= f;
				}
				left = max( left, through[ w ] );
			}
			rd = reflect( rd, fn );
			if ( left < 0.02 ) break;
		}
		// Whatever is still inside after the last bounce leaves the way it is heading.
		vec3 last = env( normalize( vToWorld * rd ) );
		for ( int w = 0; w < WAVES; w ++ ) acc += weights[ w ] * through[ w ] * last;

		vec3 col = surface * fIn + acc * ( 1.0 - fIn );
		col = min( col, vec3( 24.0 ) );
		col += glow * vec3( 1.0, 0.97, 0.92 );
		gl_FragColor = vec4( col, opacity );
	}
`;

let roundBVH = null;
function sharedRoundBVH() {
	// Small stones share one BVH: the round cut never changes shape.
	if ( ! roundBVH ) {
		const g = new THREE.BufferGeometry();
		g.setAttribute( 'position', new THREE.BufferAttribute( shapePositions( 'round' ).slice(), 3 ) );
		const bvh = new MeshBVH( g, { strategy: SAH, targetLeafSize: 4 } );
		roundBVH = { geometry: g, struct: new MeshBVHUniformStruct() };
		roundBVH.struct.updateFrom( bvh );
	}
	return roundBVH;
}

export function stoneMaterial( envCube, { bounces = 7, waves = 7, bvhStruct, obstruction } ) {
	const { iors, weights } = spectrum( waves );
	return new THREE.ShaderMaterial( {
		vertexShader,
		fragmentShader,
		defines: { WAVES: waves },
		uniforms: {
			envMap: { value: envCube },
			envRotation: { value: new THREE.Matrix3() },
			envIntensity: { value: 1 },
			bvh: { value: bvhStruct },
			ior: { value: diamondIOR( 589 ) },
			iors: { value: iors },
			weights: { value: weights.map( ( w ) => new THREE.Vector3( ...w ) ) },
			bounces: { value: bounces },
			obstruction: { value: obstruction || new THREE.Vector3( Math.cos( THREE.MathUtils.degToRad( 18 ) ), Math.cos( THREE.MathUtils.degToRad( 27 ) ), 0.04 ) },
			opacity: { value: 1 },
			glow: { value: 0 },
		},
	} );
}

/** The centre stone: morphs between shapes (the BVH is refitted as it does). */
export function createDiamond( envCube, { bounces = 7, waves = 7 } = {} ) {
	const geometry = new THREE.BufferGeometry();
	const positions = shapePositions( 'round' ).slice();
	geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	const bvh = new MeshBVH( geometry, { strategy: SAH, targetLeafSize: 4 } );
	geometry.boundsTree = bvh;
	const bvhStruct = new MeshBVHUniformStruct();
	bvhStruct.updateFrom( bvh );

	const material = stoneMaterial( envCube, { bounces, waves, bvhStruct } );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.name = 'diamond';

	let current = 0;
	return {
		mesh,
		material,
		/** 0 round, 1 oval, 2 cushion, 3 pear, 4 round again. */
		setMorph( m ) {
			if ( Math.abs( m - current ) < 1e-5 ) {
				return;
			}
			current = m;
			morphPositions( m, positions );
			geometry.attributes.position.needsUpdate = true;
			geometry.computeBoundingSphere();
			bvh.refit();
			bvhStruct.updateFrom( bvh );
		},
		setBounces( n ) {
			material.uniforms.bounces.value = n;
		},
	};
}

/** Material for the small stones (pave, hidden halo): instanced, same physics. */
export function smallStoneMaterial( envCube, { bounces = 4, waves = 3 } = {} ) {
	return stoneMaterial( envCube, { bounces, waves, bvhStruct: sharedRoundBVH().struct } );
}
