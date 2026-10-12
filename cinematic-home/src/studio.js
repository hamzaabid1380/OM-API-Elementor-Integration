import * as THREE from 'three';

/**
 * Two photo studios built from light alone, each rendered once into a cube
 * map, the way jewellery photographers light metal and stones differently:
 *
 * - "stone": near black with a few softboxes and a scatter of small hard
 *   lights. The diamond reads it sharp, which gives the black-and-white
 *   facet pattern and the sparkle.
 * - "tent": a bright light tent with black cards. The metal reads a blurred
 *   copy (PMREM), so polished gold looks bright with crisp dark edges.
 *
 * Turning the lights is a rotation of the lookups, so the light sweep costs
 * nothing per frame.
 */
const domeVertex = /* glsl */`
	varying vec3 vDir;
	void main() {
		vDir = normalize( position );
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`;
const domeFragment = /* glsl */`
	uniform vec3 top;
	uniform vec3 horizon;
	uniform vec3 bottom;
	varying vec3 vDir;
	void main() {
		float y = vDir.y;
		vec3 c = y > 0.0 ? mix( horizon, top, pow( y, 0.7 ) ) : mix( horizon, bottom, pow( - y, 0.45 ) );
		gl_FragColor = vec4( c, 1.0 );
	}
`;

/** Small hard lights of the stone studio (for star glints), as directions. */
export const LIGHTS = [];

const lin = ( r, g, b ) => new THREE.Color().setRGB( r, g, b, THREE.LinearSRGBColorSpace );

function dome( scene, top, horizon, bottom ) {
	scene.add( new THREE.Mesh(
		new THREE.SphereGeometry( 60, 64, 32 ),
		new THREE.ShaderMaterial( {
			vertexShader: domeVertex,
			fragmentShader: domeFragment,
			side: THREE.BackSide,
			depthWrite: false,
			uniforms: { top: { value: top }, horizon: { value: horizon }, bottom: { value: bottom } },
		} )
	) );
}

function card( scene, w, h, pos, intensity, color = [ 1, 1, 1 ], round = false ) {
	const geo = round ? new THREE.CircleGeometry( w / 2, 48 ) : new THREE.PlaneGeometry( w, h );
	const mat = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } );
	mat.color.setRGB( color[ 0 ] * intensity, color[ 1 ] * intensity, color[ 2 ] * intensity, THREE.LinearSRGBColorSpace );
	const m = new THREE.Mesh( geo, mat );
	m.position.set( pos[ 0 ], pos[ 1 ], pos[ 2 ] );
	m.lookAt( 0, 0, 0 );
	scene.add( m );
	return m;
}

const WARM = [ 1, 0.965, 0.92 ];
const COOL = [ 0.94, 0.97, 1 ];

function stoneStudio() {
	const scene = new THREE.Scene();
	dome( scene, lin( 0.07, 0.07, 0.075 ), lin( 0.016, 0.016, 0.018 ), lin( 0.002, 0.002, 0.002 ) );
	card( scene, 16, 11, [ 0, 26, 8 ], 3.2, WARM );
	card( scene, 3, 30, [ - 24, 6, - 4 ], 8, COOL );
	card( scene, 3, 30, [ 24, 6, 3 ], 8, WARM );
	card( scene, 20, 2.4, [ 0, 18, - 22 ], 3.2, COOL );
	card( scene, 1.2, 22, [ - 12, 2, - 24 ], 7 );
	card( scene, 20, 6, [ 0, - 4, 26 ], 0.5, WARM );
	card( scene, 9, 9, [ 18, 16, 18 ], 2.6, WARM, true );
	LIGHTS.length = 0;
	const rand = mulberry( 1971 );
	for ( let i = 0; i < 34; i ++ ) {
		const az = rand() * Math.PI * 2;
		const el = 0.08 + rand() * 1.25;
		const d = 34;
		const pos = [ Math.cos( az ) * Math.cos( el ) * d, Math.sin( el ) * d, Math.sin( az ) * Math.cos( el ) * d ];
		const s = 0.5 + rand() * 0.9;
		const power = 26 + rand() * 40;
		card( scene, s, s, pos, power, rand() > 0.5 ? WARM : COOL, true );
		LIGHTS.push( { dir: new THREE.Vector3( ...pos ).normalize(), power: power / 66 } );
	}
	return scene;
}

function tentStudio() {
	const scene = new THREE.Scene();
	dome( scene, lin( 0.62, 0.62, 0.63 ), lin( 0.3, 0.3, 0.31 ), lin( 0.035, 0.035, 0.037 ) );
	card( scene, 26, 18, [ 0, 26, 4 ], 3.2, WARM );
	card( scene, 9, 32, [ - 24, 4, 6 ], 2.6, COOL );
	card( scene, 9, 32, [ 24, 4, - 6 ], 2.6, WARM );
	card( scene, 2, 30, [ - 16, 6, - 20 ], 6 );
	card( scene, 2, 30, [ 16, 6, 20 ], 5, WARM );
	// Black cards give polished metal its crisp dark edges.
	card( scene, 6, 40, [ - 20, 0, - 14 ], 0.01 );
	card( scene, 6, 40, [ 20, 0, 14 ], 0.01 );
	card( scene, 5, 40, [ 6, 0, - 24 ], 0.015 );
	card( scene, 60, 10, [ 0, - 6, 26 ], 0.04 );
	return scene;
}

function bake( renderer, scene, size ) {
	const rt = new THREE.WebGLCubeRenderTarget( size, {
		type: THREE.HalfFloatType,
		generateMipmaps: false,
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
	} );
	new THREE.CubeCamera( 0.1, 200, rt ).update( renderer, scene );
	return rt;
}

export function createStudio( renderer, { size = 512 } = {} ) {
	const stoneRT = bake( renderer, stoneStudio(), size );
	const tentRT = bake( renderer, tentStudio(), Math.min( 256, size ) );
	const pmrem = new THREE.PMREMGenerator( renderer );
	const envRT = pmrem.fromCubemap( tentRT.texture );
	pmrem.dispose();

	const rotation = new THREE.Matrix3();
	const m4 = new THREE.Matrix4();
	return {
		cube: stoneRT.texture,
		bright: tentRT.texture,
		env: envRT.texture,
		rotation,
		angle: 0,
		/** Turn both studios around the vertical axis (radians). */
		setAngle( a ) {
			this.angle = a;
			// Same convention three uses for scene.environmentRotation.
			rotation.setFromMatrix4( m4.makeRotationY( - a ) );
		},
		dispose() {
			stoneRT.dispose();
			tentRT.dispose();
			envRT.dispose();
		},
	};
}

function mulberry( seed ) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = ( a + 0x6d2b79f5 ) | 0;
		let t = Math.imul( a ^ ( a >>> 15 ), 1 | a );
		t = ( t + Math.imul( t ^ ( t >>> 7 ), 61 | t ) ) ^ t;
		return ( ( t ^ ( t >>> 14 ) ) >>> 0 ) / 4294967296;
	};
}
