import * as THREE from 'three';

/**
 * Two photo studios, the way jewellery photographers light stones and metal
 * differently:
 *
 * - "stone": a product-photo studio (bright softboxes above and around, a
 *   darker horizon and floor, black cards between the lights). The stones
 *   evaluate it exactly, shape by shape, in their shader, so the edges of
 *   the lights stay sharp at any zoom. (The lightest quality level reads a
 *   baked cube map of the same studio instead.)
 * - "tent": the metal's light tent, bright all round with a few darker
 *   panels for crisp edges, baked once and prefiltered (PMREM) for the
 *   polished metal.
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

/** Kept for the glints module (no hard point lights in the photo studio). */
export const LIGHTS = [];

const WARM = [ 1, 0.965, 0.92 ];
const COOL = [ 0.94, 0.97, 1 ];
const WHITE = [ 1, 1, 1 ];

/**
 * The stone studio, as data: the dome gradient and the cards (softboxes and
 * flags), each facing the stone. Used both for the exact shader version and
 * for the baked cube map.
 */
export const STONE_STUDIO = {
	dome: { top: 0.6, horizon: 0.16, bottom: 0.04 },
	cards: [
		// w, h, position, intensity, colour, round
		[ 20, 20, [ 0, 28, 0 ], 2.6, WHITE ],
		[ 12, 26, [ - 22, 8, 14 ], 2.0, COOL ],
		[ 12, 26, [ 22, 8, 14 ], 2.0, WARM ],
		[ 28, 10, [ 0, 10, - 26 ], 1.6, WHITE ],
		[ 4, 30, [ - 26, 2, - 8 ], 2.8, WHITE ],
		[ 4, 30, [ 26, 2, - 8 ], 2.8, WHITE ],
		[ 7, 44, [ Math.cos( 0.8 ) * 25, 0, Math.sin( 0.8 ) * 25 ], 0.02, WHITE ],
		[ 7, 44, [ Math.cos( 2.35 ) * 25, 0, Math.sin( 2.35 ) * 25 ], 0.02, WHITE ],
		[ 7, 44, [ Math.cos( 3.95 ) * 25, 0, Math.sin( 3.95 ) * 25 ], 0.02, WHITE ],
		[ 7, 44, [ Math.cos( 5.5 ) * 25, 0, Math.sin( 5.5 ) * 25 ], 0.02, WHITE ],
		[ 9, 18, [ - 25, 4, 6 ], 0.25, WHITE ],
		[ 9, 18, [ 25, 4, - 2 ], 0.25, WHITE ],
		[ 40, 5, [ 0, 2, 28 ], 0.3, WHITE ],
	],
};

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

function card( scene, w, h, pos, intensity, color = WHITE, round = false ) {
	const geo = round ? new THREE.CircleGeometry( w / 2, 64 ) : new THREE.PlaneGeometry( w, h );
	const mat = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } );
	mat.color.setRGB( color[ 0 ] * intensity, color[ 1 ] * intensity, color[ 2 ] * intensity, THREE.LinearSRGBColorSpace );
	const m = new THREE.Mesh( geo, mat );
	m.position.set( pos[ 0 ], pos[ 1 ], pos[ 2 ] );
	m.lookAt( 0, 0, 0 );
	scene.add( m );
	return m;
}

function stoneStudio() {
	const scene = new THREE.Scene();
	const d = STONE_STUDIO.dome;
	dome( scene, lin( d.top, d.top, d.top ), lin( d.horizon, d.horizon, d.horizon * 1.03 ), lin( d.bottom, d.bottom, d.bottom * 1.05 ) );
	for ( const c of STONE_STUDIO.cards ) {
		card( scene, ...c );
	}
	LIGHTS.length = 0;
	return scene;
}

/**
 * The cards as shader uniforms: centre (w = round), unit axes divided by
 * the half sizes (w = edge softness in those units), facing normal (w = the
 * plane offset) and colour. Sorted far to near so nearer cards win.
 */
export function stoneStudioUniforms( feather = 0.22 ) {
	const o = new THREE.Object3D();
	const list = STONE_STUDIO.cards.map( ( [ w, h, pos, intensity, color, round ] ) => {
		o.position.set( ...pos );
		o.lookAt( 0, 0, 0 );
		o.updateMatrixWorld( true );
		const u = new THREE.Vector3().setFromMatrixColumn( o.matrixWorld, 0 ).normalize();
		const v = new THREE.Vector3().setFromMatrixColumn( o.matrixWorld, 1 ).normalize();
		const n = new THREE.Vector3().setFromMatrixColumn( o.matrixWorld, 2 ).normalize();
		const c = new THREE.Vector3( ...pos );
		return {
			dist: c.length(),
			c: new THREE.Vector4( c.x, c.y, c.z, round ? 1 : 0 ),
			u: new THREE.Vector4( u.x / ( w / 2 ), u.y / ( w / 2 ), u.z / ( w / 2 ), feather / ( w / 2 ) ),
			v: new THREE.Vector4( v.x / ( h / 2 ), v.y / ( h / 2 ), v.z / ( h / 2 ), feather / ( h / 2 ) ),
			n: new THREE.Vector4( n.x, n.y, n.z, c.dot( n ) ),
			col: new THREE.Vector3( color[ 0 ] * intensity, color[ 1 ] * intensity, color[ 2 ] * intensity ),
		};
	} ).sort( ( a, b ) => b.dist - a.dist );
	const d = STONE_STUDIO.dome;
	return {
		count: list.length,
		c: list.map( ( l ) => l.c ),
		u: list.map( ( l ) => l.u ),
		v: list.map( ( l ) => l.v ),
		n: list.map( ( l ) => l.n ),
		col: list.map( ( l ) => l.col ),
		dome: new THREE.Vector3( d.top, d.horizon, d.bottom ),
	};
}

function tentStudio() {
	// Bright all round (polished white gold reads white, not chrome-dark), with
	// softboxes separated by slightly darker gaps and two grey flags, so the
	// polish shows crisp bands of light the way it does in a close-up photo.
	const scene = new THREE.Scene();
	dome( scene, lin( 0.85, 0.85, 0.86 ), lin( 0.5, 0.5, 0.51 ), lin( 0.26, 0.26, 0.27 ) );
	card( scene, 26, 14, [ 0, 26, 4 ], 3.2, WARM );
	card( scene, 7, 32, [ - 24, 4, 6 ], 2.8, COOL );
	card( scene, 7, 32, [ 24, 4, - 6 ], 2.8, WARM );
	card( scene, 2.2, 30, [ - 16, 6, - 20 ], 4.5 );
	card( scene, 2.2, 30, [ 16, 6, 20 ], 4, WARM );
	card( scene, 12, 8, [ 0, 14, - 24 ], 2.4 );
	card( scene, 8, 40, [ - 20, 0, - 14 ], 0.14 );
	card( scene, 8, 40, [ 20, 0, 14 ], 0.14 );
	card( scene, 60, 8, [ 0, - 8, 26 ], 0.16 );
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

export function createStudio( renderer, { size = 512, metal = 512 } = {} ) {
	const stoneRT = bake( renderer, stoneStudio(), size );
	const tentRT = bake( renderer, tentStudio(), metal );
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
