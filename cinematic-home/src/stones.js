import * as THREE from 'three';

/**
 * Small diamonds (pave, hidden halo). Too small on screen to need real ray
 * tracing: a mirror reflection of the studio plus a scrambled "inside"
 * reflection with a little colour split reads as sparkle at this size.
 */
const vertexShader = /* glsl */`
	varying vec3 vWorldPosition;
	varying vec3 vSeed;
	void main() {
		vec4 lp = vec4( position, 1.0 );
		vSeed = vec3( 0.0 );
		#ifdef USE_INSTANCING
			lp = instanceMatrix * lp;
			vSeed = instanceMatrix[ 3 ].xyz;
		#endif
		vec4 wp = modelMatrix * lp;
		vWorldPosition = wp.xyz;
		gl_Position = projectionMatrix * viewMatrix * wp;
	}
`;

const fragmentShader = /* glsl */`
	uniform samplerCube envMap;
	uniform samplerCube brightMap;
	uniform mat3 envRotation;
	uniform float envIntensity;
	uniform float flash;
	varying vec3 vWorldPosition;
	varying vec3 vSeed;

	vec3 env( vec3 d ) {
		return texture( envMap, envRotation * d ).rgb * envIntensity;
	}
	vec3 bright( vec3 d ) {
		return texture( brightMap, envRotation * d ).rgb * envIntensity;
	}
	float hash( vec3 p ) {
		return fract( sin( dot( p, vec3( 12.9898, 78.233, 37.719 ) ) ) * 43758.5453 );
	}

	void main() {
		vec3 n = normalize( cross( dFdx( vWorldPosition ), dFdy( vWorldPosition ) ) );
		vec3 v = normalize( vWorldPosition - cameraPosition );
		if ( dot( n, v ) > 0.0 ) n = - n;
		float cosV = clamp( - dot( v, n ), 0.0, 1.0 );
		float F = 0.17 + 0.83 * pow( 1.0 - cosV, 5.0 );
		vec3 refl = env( reflect( v, n ) );

		float h = hash( floor( n * 9.0 ) + vSeed * 7.0 );
		vec3 j = vec3( h - 0.5, fract( h * 7.13 ) - 0.5, fract( h * 13.7 ) - 0.5 );
		vec3 m = normalize( n + j * 1.3 );
		vec3 r = reflect( v, m );
		r.y = abs( r.y ) * 0.85 + 0.15;
		r = normalize( r );
		vec3 side = normalize( cross( r, vec3( 0.0, 1.0, 0.0 ) ) + 1e-4 );
		vec3 inner = vec3(
			env( normalize( r - side * 0.02 ) ).r,
			env( r ).g,
			env( normalize( r + side * 0.02 ) ).b
		);
		// Small stones look bright overall: some of the soft tent light comes through too.
		vec3 body = bright( normalize( mix( r, vec3( 0.0, 1.0, 0.0 ), 0.35 ) ) );
		vec3 col = refl * F + ( inner * 1.1 + body * 0.55 ) * ( 1.0 - F );
		// Keep hot spots from turning into big single-colour blooms.
		float L = dot( col, vec3( 0.3, 0.59, 0.11 ) );
		col = mix( vec3( L ), col, 0.55 );
		col = min( col, vec3( 6.0 ) );
		col += flash * vec3( 1.0, 0.98, 0.95 );
		gl_FragColor = vec4( col, 1.0 );
	}
`;

export function smallStoneMaterial( cube, rotation, brightCube ) {
	return new THREE.ShaderMaterial( {
		vertexShader,
		fragmentShader,
		uniforms: {
			envMap: { value: cube },
			brightMap: { value: brightCube },
			envRotation: { value: rotation },
			envIntensity: { value: 1 },
			flash: { value: 0 },
		},
	} );
}
