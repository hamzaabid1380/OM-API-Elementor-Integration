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
	// A product-photo studio: bright softboxes above and around, a darker
	// horizon and floor, black cards between the lights. The camera itself is
	// added in the stone's shader (it moves with the view).
	const scene = new THREE.Scene();
	dome( scene, lin( 0.6, 0.6, 0.6 ), lin( 0.16, 0.16, 0.165 ), lin( 0.04, 0.04, 0.042 ) );
	card( scene, 20, 20, [ 0, 28, 0 ], 2.6 );
	card( scene, 12, 26, [ - 22, 8, 14 ], 2.0, COOL );
	card( scene, 12, 26, [ 22, 8, 14 ], 2.0, WARM );
	card( scene, 28, 10, [ 0, 10, - 26 ], 1.6 );
	card( scene, 4, 30, [ - 26, 2, - 8 ], 2.8 );
	card( scene, 4, 30, [ 26, 2, - 8 ], 2.8 );
	for ( const a of [ 0.8, 2.35, 3.95, 5.5 ] ) {
		card( scene, 7, 44, [ Math.cos( a ) * 25, 0, Math.sin( a ) * 25 ], 0.02 );
	}
	card( scene, 9, 18, [ - 25, 4, 6 ], 0.25 );
	card( scene, 9, 18, [ 25, 4, - 2 ], 0.25 );
	card( scene, 40, 5, [ 0, 2, 28 ], 0.3 );
	LIGHTS.length = 0;
	return scene;
}

function tentStudio() {
	// The metal's light tent: bright all round (polished white gold looks white,
	// not chrome-dark), with two thin grey cards for crisp edges.
	const scene = new THREE.Scene();
	dome( scene, lin( 0.95, 0.95, 0.96 ), lin( 0.6, 0.6, 0.61 ), lin( 0.3, 0.3, 0.31 ) );
	card( scene, 26, 18, [ 0, 26, 4 ], 3.0, WARM );
	card( scene, 9, 32, [ - 24, 4, 6 ], 2.4, COOL );
	card( scene, 9, 32, [ 24, 4, - 6 ], 2.4, WARM );
	card( scene, 2, 30, [ - 16, 6, - 20 ], 4 );
	card( scene, 2, 30, [ 16, 6, 20 ], 3.5, WARM );
	card( scene, 4, 40, [ - 20, 0, - 14 ], 0.12 );
	card( scene, 4, 40, [ 20, 0, 14 ], 0.12 );
	card( scene, 60, 8, [ 0, - 8, 26 ], 0.18 );
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
