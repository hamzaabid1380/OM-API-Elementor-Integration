import * as THREE from 'three';
import { MeshBVH, MeshBVHUniformStruct, BVHShaderGLSL, SAH } from 'three-mesh-bvh';
import { shapePositions, morphPositions } from './cut.js';

/**
 * The centre stone. Every pixel of it is ray traced through the real cut:
 * the ray enters through the facet it lands on, bounces around inside
 * (total internal reflection does most of the work, like a real diamond),
 * and leaves through the facets that let it out. Each time it leaves, red,
 * green and blue bend by slightly different amounts, which is where the
 * coloured fire comes from. The geometry lives in a BVH so the tracing stays
 * cheap enough for phones.
 */
const vertexShader = /* glsl */`
	varying vec3 vWorldPosition;
	void main() {
		vec4 wp = modelMatrix * vec4( position, 1.0 );
		vWorldPosition = wp.xyz;
		gl_Position = projectionMatrix * viewMatrix * wp;
	}
`;

const fragmentShader = /* glsl */`
	#define RAY_OFFSET 1e-4
	${ BVHShaderGLSL.common_functions }
	${ BVHShaderGLSL.bvh_struct_definitions }
	${ BVHShaderGLSL.bvh_ray_functions }

	uniform mat4 modelMatrix;
	uniform mat4 modelMatrixInverse;
	uniform samplerCube envMap;
	uniform samplerCube brightMap;
	uniform float brightMix;
	uniform mat3 envRotation;
	uniform float envIntensity;
	uniform BVH bvh;
	uniform float ior;
	uniform float spread;
	uniform int bounces;
	uniform vec3 tint;
	uniform float opacity;
	uniform float glow;
	varying vec3 vWorldPosition;

	vec3 env( vec3 dir ) {
		vec3 d = envRotation * dir;
		vec3 c = texture( envMap, d ).rgb;
		// On white (catalogue pictures) the stone sits in a light tent instead.
		if ( brightMix > 0.0 ) c = mix( c, texture( brightMap, d ).rgb, brightMix );
		return c * envIntensity;
	}

	float fresnel( float cosI, float etaI, float etaT ) {
		float sinT = etaI / etaT * sqrt( max( 0.0, 1.0 - cosI * cosI ) );
		if ( sinT >= 1.0 ) return 1.0;
		float cosT = sqrt( max( 0.0, 1.0 - sinT * sinT ) );
		float rs = ( etaT * cosI - etaI * cosT ) / ( etaT * cosI + etaI * cosT );
		float rp = ( etaI * cosI - etaT * cosT ) / ( etaI * cosI + etaT * cosT );
		return 0.5 * ( rs * rs + rp * rp );
	}

	// One exit through a facet, per colour: what leaves, and what reflects back in.
	void leave( vec3 rd, vec3 n, float cosI, inout vec3 through, inout vec3 acc ) {
		vec3 iors = vec3( ior - spread, ior, ior + spread );
		for ( int c = 0; c < 3; c ++ ) {
			float eta = iors[ c ];
			vec3 out_ = refract( rd, n, eta );
			if ( dot( out_, out_ ) > 0.0 ) {
				float f = fresnel( cosI, eta, 1.0 );
				vec3 w = normalize( ( modelMatrix * vec4( out_, 0.0 ) ).xyz );
				acc[ c ] += through[ c ] * ( 1.0 - f ) * env( w )[ c ];
				through[ c ] *= f;
			}
		}
	}

	void main() {
		vec3 n = normalize( cross( dFdx( vWorldPosition ), dFdy( vWorldPosition ) ) );
		vec3 view = normalize( vWorldPosition - cameraPosition );
		if ( dot( n, view ) > 0.0 ) n = - n;

		float cosV = clamp( - dot( view, n ), 0.0, 1.0 );
		float fIn = fresnel( cosV, 1.0, ior );
		vec3 surface = env( reflect( view, n ) );

		// Into the stone (local space, where the BVH lives).
		vec3 rdW = refract( view, n, 1.0 / ior );
		vec3 ro = ( modelMatrixInverse * vec4( vWorldPosition, 1.0 ) ).xyz;
		vec3 rd = normalize( ( modelMatrixInverse * vec4( rdW, 0.0 ) ).xyz );

		vec3 through = vec3( 1.0 );
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
			leave( rd, fn, cosI, through, acc );
			rd = reflect( rd, fn );
			if ( max( through.r, max( through.g, through.b ) ) < 0.02 ) break;
		}
		// Whatever is still inside after the last bounce leaves the way it is heading.
		acc += through * env( normalize( ( modelMatrix * vec4( rd, 0.0 ) ).xyz ) );

		vec3 col = surface * fIn + acc * ( 1.0 - fIn ) * tint;
		col = min( col, vec3( 14.0 ) );
		col += glow * vec3( 1.0, 0.97, 0.92 );
		gl_FragColor = vec4( col, opacity );
	}
`;

export function createDiamond( envCube, { bounces = 7, bright = null } = {} ) {
	const geometry = new THREE.BufferGeometry();
	const positions = shapePositions( 'round' ).slice();
	geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	const bvh = new MeshBVH( geometry, { strategy: SAH, targetLeafSize: 4 } );
	geometry.boundsTree = bvh;

	const bvhStruct = new MeshBVHUniformStruct();
	bvhStruct.updateFrom( bvh );

	const material = new THREE.ShaderMaterial( {
		vertexShader,
		fragmentShader,
		uniforms: {
			modelMatrixInverse: { value: new THREE.Matrix4() },
			envMap: { value: envCube },
			brightMap: { value: bright },
			brightMix: { value: 0 },
			envRotation: { value: new THREE.Matrix3() },
			envIntensity: { value: 1 },
			bvh: { value: bvhStruct },
			ior: { value: 2.418 },
			spread: { value: 0.026 },
			bounces: { value: bounces },
			tint: { value: new THREE.Color( 1, 1, 1 ) },
			opacity: { value: 1 },
			glow: { value: 0 },
		},
		transparent: false,
	} );

	const mesh = new THREE.Mesh( geometry, material );
	mesh.name = 'diamond';
	mesh.onBeforeRender = () => {
		material.uniforms.modelMatrixInverse.value.copy( mesh.matrixWorld ).invert();
	};

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
