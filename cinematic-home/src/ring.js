import * as THREE from 'three';
import { outlineAt, surfaceAt, pair, smallStoneGeometry } from './cut.js';
import { Tube } from './tube.js';
import { smallStoneMaterial, SWEEP, SWEEP_GLSL } from './diamond.js';

/**
 * Wulf's own rings, built in code, in units where the centre stone is 1 across
 * (a 1 ct round is about 6.5 mm, so the finger hole is a size 6). Modelled on
 * the catalog: the Round 4-Prong Solitaire (85121) as the setting builds, the
 * same head on each shape, and at the end the Oval Hidden Halo with a diamond
 * band (51162-E): a slim polished band, four claw prongs that meet the band in
 * a V, a hidden halo of tiny stones under the girdle, French pave along the
 * shoulders.
 *
 * The band stands in the XY plane with the head at the top (+Y); the finger
 * runs along Z. The head (stone, prongs, rail, hidden halo) has its own group
 * with the girdle at its origin, turned so long shapes sit north-south.
 */
export const R_IN = 1.27;
// The head is drawn a little larger than a 1 ct stone, as the catalog photos show it.
export const HEAD_SCALE = 1.15;
export const HEAD_Y = 2.1;
const SUPER = 2.4; // band profile: rounded, a touch fuller than a circle
const PRONGS = 5; // four claws, and a fifth at the tip of the pear

// Band profile along u = angle from the top (0) to the bottom (PI): a slim polished wire,
// a little fuller under the head where the setting sits.
const thick = ( u ) => 0.24 + 0.03 * Math.exp( - Math.pow( u / 0.38, 2 ) );
const halfWidth = ( u ) => 0.121 + 0.009 * ( u / Math.PI );
const rOut = ( u ) => R_IN + thick( u );

/**
 * Polished metals: white, yellow and rose gold in 14k, the paler, softer tones the catalog
 * renders show (deeper golds read as brass or copper next to them).
 */
export const METALS = {
	white: new THREE.Color( '#ecebe8' ),
	yellow: new THREE.Color( '#f0cf92' ),
	rose: new THREE.Color( '#f0bfae' ),
};
const METAL_ORDER = [ METALS.white, METALS.yellow, METALS.rose ];

/**
 * Where the claws sit on each shape (outline parameter, degrees) and which are there: four on
 * the corners of the round, emerald and oval, five on the pear (one guards its tip).
 */
const PRONG_AT = {
	round: [ 45, 135, 225, 315, 180 ],
	emerald: [ 22.5, 112.5, 202.5, 292.5, 180 ],
	pear: [ 35, 110, 250, 325, 180 ],
	oval: [ 50.6, 129.4, 230.6, 309.4, 180 ],
};
const PRONG_ON = {
	round: [ 1, 1, 1, 1, 0 ],
	emerald: [ 1, 1, 1, 1, 0 ],
	pear: [ 1, 1, 1, 1, 1 ],
	oval: [ 1, 1, 1, 1, 0 ],
};

function prongAt( m, k ) {
	const [ , , t, an, bn ] = pair( m );
	const deg = PRONG_AT[ an ][ k ] + ( PRONG_AT[ bn ][ k ] - PRONG_AT[ an ][ k ] ) * t;
	const on = PRONG_ON[ an ][ k ] + ( PRONG_ON[ bn ][ k ] - PRONG_ON[ an ][ k ] ) * t;
	return [ THREE.MathUtils.degToRad( deg ), on ];
}

/** Outward 2D normal of the stone outline at parameter a. */
function outlineNormal( m, a, out ) {
	const e = 1e-3;
	const p = outlineAt( m, a + e );
	const q = outlineAt( m, a - e );
	let nx = p[ 1 ] - q[ 1 ];
	let nz = - ( p[ 0 ] - q[ 0 ] );
	const c = outlineAt( m, a );
	if ( nx * c[ 0 ] + nz * c[ 1 ] < 0 ) {
		nx = - nx;
		nz = - nz;
	}
	const l = Math.hypot( nx, nz ) || 1;
	out[ 0 ] = nx / l;
	out[ 1 ] = nz / l;
	return out;
}

/**
 * What the metal shows beyond a plain polished surface, shared by every metal part:
 * - the light sweep (diamond.js) running along it;
 * - a new metal that flows around the ring from the head down both sides, a bright seam of
 *   light at its edge (front and seam; colours old and new);
 * - on the band, while it is cast, newly formed metal that glows and cools behind the
 *   growing ends (forge: where the ends are, how hot).
 * Positions are measured in the ring's own space (ringInv), as the angle from the top.
 */
const FLOW = {
	metalA: { value: new THREE.Color() },
	metalB: { value: new THREE.Color() },
	front: { value: - 1 },
	seam: { value: 0 },
	ringInv: { value: new THREE.Matrix4() },
	forge: { value: new THREE.Vector2( 0, 0 ) },
};
function polish( material, forge = false ) {
	material.onBeforeCompile = ( shader ) => {
		Object.assign( shader.uniforms, FLOW, { sweepAxis: SWEEP.axis, sweepDir: SWEEP.dir } );
		shader.vertexShader = shader.vertexShader
			.replace( '#include <common>', '#include <common>\nuniform mat4 ringInv;\nvarying vec3 vRingPos;' )
			.replace( '#include <worldpos_vertex>', '#include <worldpos_vertex>\nvRingPos = ( ringInv * worldPosition ).xyz;' );
		shader.fragmentShader = shader.fragmentShader
			.replace( '#include <common>', `#include <common>
uniform vec3 metalA;
uniform vec3 metalB;
uniform float front;
uniform float seam;
uniform vec2 forge;
varying vec3 vRingPos;
${ SWEEP_GLSL }` )
			.replace( '#include <color_fragment>', `#include <color_fragment>
float ringU = abs( atan( vRingPos.x, vRingPos.y ) );
diffuseColor.rgb = mix( metalB, metalA, smoothstep( front - 0.14, front + 0.14, ringU ) );` )
			.replace( '#include <emissivemap_fragment>', `#include <emissivemap_fragment>
totalEmissiveRadiance += vec3( 1.0, 0.95, 0.86 ) * seam * exp( - pow( ( ringU - front ) / 0.06, 2.0 ) );
#ifdef FORGE
	float fresh = ringU - forge.x;
	if ( forge.y > 0.0 && fresh > - 0.02 ) {
		float f = max( fresh, 0.0 );
		totalEmissiveRadiance += mix( vec3( 1.0, 0.32, 0.06 ), vec3( 1.0, 0.86, 0.62 ), exp( - f / 0.05 ) ) * forge.y * exp( - f / 0.2 ) * 2.4;
	}
#endif` )
			.replace( '#include <lights_fragment_end>', `#if defined( RE_IndirectSpecular )
	radiance += sweepLight( inverseTransformDirection( reflect( - geometryViewDir, geometryNormal ), viewMatrix ) ) * 0.85;
#endif
#include <lights_fragment_end>` );
	};
	if ( forge ) {
		material.defines = { FORGE: '' };
	}
	return material;
}

const smooth = ( a, b, x ) => {
	const t = Math.min( 1, Math.max( 0, ( x - a ) / ( b - a ) ) );
	return t * t * ( 3 - 2 * t );
};

/** The band: a swept rounded profile, built only over the part that has "grown". */
class Band {
	constructor( material ) {
		this.NT = 360;
		this.NC = 40;
		const ringVerts = ( this.NT + 1 ) * ( this.NC + 1 );
		const capVerts = 2 * ( this.NC + 2 );
		this.pos = new Float32Array( ( ringVerts + capVerts ) * 3 );
		this.nrm = new Float32Array( ( ringVerts + capVerts ) * 3 );
		const idx = [];
		for ( let i = 0; i < this.NT; i ++ ) {
			for ( let j = 0; j < this.NC; j ++ ) {
				const a = i * ( this.NC + 1 ) + j;
				const b = a + this.NC + 1;
				idx.push( a, b, a + 1, b, b + 1, a + 1 );
			}
		}
		this.bodyCount = idx.length;
		// Caps: a fan per end.
		this.capBase = ringVerts;
		for ( let c = 0; c < 2; c ++ ) {
			const centre = ringVerts + c * ( this.NC + 2 );
			for ( let j = 0; j < this.NC; j ++ ) {
				if ( c === 0 ) {
					idx.push( centre, centre + 1 + j, centre + 2 + j );
				} else {
					idx.push( centre, centre + 2 + j, centre + 1 + j );
				}
			}
		}
		const g = new THREE.BufferGeometry();
		g.setIndex( idx );
		g.setAttribute( 'position', new THREE.BufferAttribute( this.pos, 3 ).setUsage( THREE.DynamicDrawUsage ) );
		g.setAttribute( 'normal', new THREE.BufferAttribute( this.nrm, 3 ).setUsage( THREE.DynamicDrawUsage ) );
		this.geometry = g;
		this.mesh = new THREE.Mesh( g, material );
		this.mesh.frustumCulled = false;
		this.ends = [ new THREE.Vector3(), new THREE.Vector3() ];
		this.g = - 1;
	}

	set( g ) {
		g = Math.min( 1, Math.max( 0, g ) );
		if ( g === this.g ) {
			return;
		}
		this.g = g;
		this.mesh.visible = g > 0.001;
		if ( ! this.mesh.visible ) {
			return;
		}
		const NT = this.NT;
		const NC = this.NC;
		const cut = Math.PI * ( 1 - g );
		const p = this.pos;
		const n = this.nrm;
		const e = 2 / SUPER;
		for ( let i = 0; i <= NT; i ++ ) {
			const phi = cut + ( Math.PI * 2 - 2 * cut ) * ( i / NT );
			const u = Math.min( phi, Math.PI * 2 - phi );
			const ex = Math.sin( phi );
			const ey = Math.cos( phi );
			const ro = rOut( u );
			const mid = ( R_IN + ro ) / 2;
			const h = ( ro - R_IN ) / 2;
			const w = halfWidth( u );
			for ( let j = 0; j <= NC; j ++ ) {
				const psi = ( j / NC ) * Math.PI * 2;
				const c = Math.cos( psi );
				const s = Math.sin( psi );
				const X = Math.sign( c ) * Math.pow( Math.abs( c ), e );
				const Y = Math.sign( s ) * Math.pow( Math.abs( s ), e );
				const x = X * w;
				const y = Y * h;
				let nx = ( Math.sign( X ) * Math.pow( Math.abs( X ), SUPER - 1 ) ) / w;
				let ny = ( Math.sign( Y ) * Math.pow( Math.abs( Y ), SUPER - 1 ) ) / h;
				const l = Math.hypot( nx, ny ) || 1;
				nx /= l;
				ny /= l;
				const k = ( i * ( NC + 1 ) + j ) * 3;
				p[ k ] = ex * ( mid + y );
				p[ k + 1 ] = ey * ( mid + y );
				p[ k + 2 ] = x;
				n[ k ] = ex * ny;
				n[ k + 1 ] = ey * ny;
				n[ k + 2 ] = nx;
			}
		}
		// End caps (only while growing).
		const open = g < 0.999;
		for ( let c = 0; c < 2; c ++ ) {
			const i = c === 0 ? 0 : NT;
			const phi = cut + ( Math.PI * 2 - 2 * cut ) * ( i / NT );
			const tx = Math.cos( phi ) * ( c === 0 ? - 1 : 1 );
			const ty = - Math.sin( phi ) * ( c === 0 ? - 1 : 1 );
			const centre = this.capBase + c * ( NC + 2 );
			const u = Math.min( phi, Math.PI * 2 - phi );
			const mid = ( R_IN + rOut( u ) ) / 2;
			this.ends[ c ].set( Math.sin( phi ) * mid, Math.cos( phi ) * mid, 0 );
			for ( let j = - 1; j <= NC; j ++ ) {
				const k = ( j < 0 ? centre : centre + 1 + j ) * 3;
				if ( j < 0 ) {
					p[ k ] = this.ends[ c ].x;
					p[ k + 1 ] = this.ends[ c ].y;
					p[ k + 2 ] = 0;
				} else {
					const s = ( i * ( NC + 1 ) + j ) * 3;
					p[ k ] = p[ s ];
					p[ k + 1 ] = p[ s + 1 ];
					p[ k + 2 ] = p[ s + 2 ];
				}
				n[ k ] = tx;
				n[ k + 1 ] = ty;
				n[ k + 2 ] = 0;
			}
		}
		this.geometry.setDrawRange( 0, open ? this.geometry.index.count : this.bodyCount );
		this.geometry.attributes.position.needsUpdate = true;
		this.geometry.attributes.normal.needsUpdate = true;
	}
}

/** A point on the band's outer surface at angle phi (0 top), with its outward normal. */
function bandSurface( phi, z = 0 ) {
	const u = Math.min( Math.abs( phi ), Math.PI * 2 - Math.abs( phi ) );
	const ro = rOut( u );
	const w = halfWidth( u );
	const h = ( ro - R_IN ) / 2;
	const mid = ( R_IN + ro ) / 2;
	// Height of the profile at this z.
	const X = Math.min( 0.999, Math.abs( z ) / w );
	const top = h * Math.pow( 1 - Math.pow( X, SUPER ), 1 / SUPER );
	const r = mid + top;
	const e = 1e-3;
	const r1 = rOut( Math.min( Math.abs( phi + e ), Math.PI * 2 - Math.abs( phi + e ) ) );
	const r0 = rOut( Math.min( Math.abs( phi - e ), Math.PI * 2 - Math.abs( phi - e ) ) );
	const dr = ( r1 - r0 ) / ( 2 * e );
	const er = new THREE.Vector3( Math.sin( phi ), Math.cos( phi ), 0 );
	const et = new THREE.Vector3( Math.cos( phi ), - Math.sin( phi ), 0 );
	const normal = er.clone().multiplyScalar( ro ).addScaledVector( et, - dr ).normalize();
	return { point: er.multiplyScalar( r ).setZ( z ), normal };
}

/** Points spaced evenly by length around the outline loop at height y (pavilion side), for stones. */
function evenAround( m, y, off, spacing, out ) {
	const SAMPLES = 192;
	const pts = [];
	const nrm = [ 0, 0 ];
	let len = 0;
	let prev = null;
	for ( let i = 0; i <= SAMPLES; i ++ ) {
		const a = ( i / SAMPLES ) * Math.PI * 2;
		const p = surfaceAt( m, a, y );
		outlineNormal( m, a, nrm );
		const q = [ p[ 0 ] + nrm[ 0 ] * off, p[ 1 ] + nrm[ 1 ] * off ];
		if ( prev ) {
			len += Math.hypot( q[ 0 ] - prev[ 0 ], q[ 1 ] - prev[ 1 ] );
		}
		pts.push( { a, x: q[ 0 ], z: q[ 1 ], nx: nrm[ 0 ], nz: nrm[ 1 ], s: len } );
		prev = q;
	}
	const count = Math.max( 8, Math.floor( len / spacing ) );
	out.length = 0;
	let j = 0;
	for ( let i = 0; i < count; i ++ ) {
		const s = ( ( i + 0.5 ) / count ) * len;
		while ( j < SAMPLES - 1 && pts[ j + 1 ].s < s ) {
			j ++;
		}
		const A = pts[ j ];
		const B = pts[ j + 1 ];
		const t = ( s - A.s ) / Math.max( 1e-6, B.s - A.s );
		const nx = A.nx + ( B.nx - A.nx ) * t;
		const nz = A.nz + ( B.nz - A.nz ) * t;
		const l = Math.hypot( nx, nz ) || 1;
		out.push( { a: A.a + ( B.a - A.a ) * t, x: A.x + ( B.x - A.x ) * t, z: A.z + ( B.z - A.z ) * t, nx: nx / l, nz: nz / l, order: i / count } );
	}
	return out;
}

export function createRing( { cube, rotation, waves = 3, studio = null } ) {
	const group = new THREE.Group();
	group.name = 'ring';
	const head = new THREE.Group();
	head.position.y = HEAD_Y;
	head.scale.setScalar( HEAD_SCALE );
	group.add( head );

	const metal = ( forge = false ) => polish( new THREE.MeshStandardMaterial( { color: METALS.white.clone(), metalness: 1, roughness: 0.07, envMapIntensity: 1 } ), forge );
	const bandMat = metal( true );
	bandMat.side = THREE.DoubleSide;
	const headMat = metal();
	const detailMat = metal();
	detailMat.roughness = 0.1;
	const metals = [ bandMat, headMat, detailMat ];

	const band = new Band( bandMat );
	group.add( band.mesh );

	// Claws and the basket rail.
	const prongs = [];
	for ( let k = 0; k < PRONGS; k ++ ) {
		const t = new Tube( 64, 24, headMat );
		prongs.push( t );
		head.add( t.mesh );
	}
	const rail = new Tube( 124, 16, headMat );
	head.add( rail.mesh );
	const collar = new Tube( 144, 16, detailMat );
	head.add( collar.mesh );

	// Hidden halo stones and pave.
	const stoneGeo = smallStoneGeometry();
	const stoneMat = smallStoneMaterial( cube, { bounces: 4, waves, studio } );
	stoneMat.uniforms.envRotation.value = rotation;
	const HALO = 34;
	const halo = new THREE.InstancedMesh( stoneGeo, stoneMat, HALO );
	halo.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
	halo.frustumCulled = false;
	head.add( halo );

	// French pave along both shoulders, from the head down past the sides, the stones nearly
	// touching and as wide as the band, as on 51162-E.
	const paveSpots = [];
	{
		let phi = 0.3;
		const end = 1.62;
		while ( phi < end ) {
			const f = ( phi - 0.3 ) / ( end - 0.3 );
			const size = 0.205 - 0.02 * f;
			paveSpots.push( { phi, size } );
			phi += ( size + 0.012 ) / rOut( phi );
		}
	}
	const paveCount = paveSpots.length * 2;
	const pave = new THREE.InstancedMesh( stoneGeo, stoneMat, paveCount );
	pave.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
	pave.frustumCulled = false;
	group.add( pave );
	const beadGeo = new THREE.SphereGeometry( 1, 24, 16 );
	const beadCount = ( paveSpots.length + 1 ) * 2 * 2;
	// Beads are tiny: a touch more roughness keeps their reflections soft, as on a real ring.
	const beadMat = metal();
	beadMat.roughness = 0.17;
	metals.push( beadMat );
	const beads = new THREE.InstancedMesh( beadGeo, beadMat, beadCount );
	beads.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
	beads.frustumCulled = false;
	group.add( beads );

	const paveData = [];
	const beadData = [];
	{
		const up = new THREE.Vector3( 0, 1, 0 );
		const q = new THREE.Quaternion();
		for ( const side of [ 1, - 1 ] ) {
			paveSpots.forEach( ( s, i ) => {
				const phi = s.phi * side;
				const { point, normal } = bandSurface( phi );
				q.setFromUnitVectors( up, normal );
				// Girdle just under the metal, crown standing proud like set pave.
				const pos = point.clone().addScaledVector( normal, - 0.008 );
				paveData.push( { pos, normal: normal.clone(), q: q.clone(), size: s.size, order: i, side } );
				// Shared beads between neighbours, on both edges, just over the girdles.
				const prev = i === 0 ? s.phi - ( s.size + 0.012 ) / rOut( s.phi ) : paveSpots[ i - 1 ].phi;
				const gapPhi = ( ( s.phi + prev ) / 2 ) * side;
				for ( const z of [ - 1, 1 ] ) {
					const b = bandSurface( gapPhi, z * s.size * 0.36 );
					beadData.push( { pos: b.point.clone().addScaledVector( b.normal, 0.004 ), size: 0.03, order: i, side } );
				}
				if ( i === paveSpots.length - 1 ) {
					const after = ( s.phi + ( s.size + 0.012 ) / 2 / rOut( s.phi ) ) * side;
					for ( const z of [ - 1, 1 ] ) {
						const b = bandSurface( after, z * s.size * 0.36 );
						beadData.push( { pos: b.point.clone().addScaledVector( b.normal, 0.004 ), size: 0.028, order: i + 0.5, side } );
					}
				}
			} );
		}
	}

	const state = { band: - 1, prongs: - 1, morph: - 1, metal: - 1, halo: - 1, pave: - 1 };
	const m4 = new THREE.Matrix4();
	const v3 = new THREE.Vector3();
	const s3 = new THREE.Vector3();
	const q4 = new THREE.Quaternion();
	const nrm = [ 0, 0 ];
	// The band's top under the head, in the head's space.
	const BAND_TOP = ( rOut( 0 ) - HEAD_Y ) / HEAD_SCALE;

	// The setting as capsules (stone space) so the centre stone can reflect it.
	const caps = [];
	const collarCaps = [];
	function loopCaps( pts, radius, closed, out = caps ) {
		const segs = 6;
		const n = pts.length;
		for ( let c = 0; c < segs; c ++ ) {
			const i0 = Math.round( ( c / segs ) * ( closed ? n : n - 1 ) ) % n;
			const i1 = Math.round( ( ( c + 1 ) / segs ) * ( closed ? n : n - 1 ) ) % n;
			if ( i0 === i1 ) {
				continue;
			}
			const a = pts[ i0 ];
			const b = pts[ i1 ];
			out.push( [ a.x, a.y, a.z, radius, b.x, b.y, b.z ] );
		}
	}

	// Where each claw's tip is (head space) and how closed it is: the glints flash as they close.
	const tips = Array.from( { length: PRONGS }, () => ( { pos: new THREE.Vector3(), closed: 0, on: 0 } ) );

	// Sparkles where a stone has just landed in its seat (the glints draw them).
	const sparks = { pave: [], halo: [] };
	const spark = ( list, pos, t, size ) => {
		if ( t > 0.5 && t < 1 ) {
			list.push( { pos: pos.clone(), s: Math.sin( ( Math.PI * ( t - 0.5 ) ) / 0.5 ), size } );
		}
	};

	function buildHead( morph, grow ) {
		// Claws: from the band, up the pavilion, over the girdle, a rounded tip on the crown.
		// The two claws at each end lean in and meet the slim band in a V, as on the catalog ring.
		const curve = new THREE.CatmullRomCurve3( Array.from( { length: 6 }, () => new THREE.Vector3() ), false, 'centripetal' );
		caps.length = 0;
		const pts = curve.points;
		const pg = smooth( 0, 1, grow );
		for ( let k = 0; k < PRONGS; k ++ ) {
			const [ a, on ] = prongAt( morph, k );
			const tube = prongs[ k ];
			const tip = tips[ k ];
			tip.on = on;
			// The pear's extra claw grows in and out with the shape. The claws close one after another,
			// around the stone, each with a glint as its tip settles on the crown.
			const presence = smooth( 0.15, 0.85, on );
			const delay = k < 4 ? [ 0, 0.16, 0.08, 0.24 ][ k ] * 1.4 : 0.1;
			const g = smooth( delay, delay + 0.62, pg ) * presence;
			if ( g <= 0.001 ) {
				tip.closed = 0;
				tube.begin();
				tube.end();
				continue;
			}
			const P = outlineAt( morph, a );
			outlineNormal( morph, a, nrm );
			const hug = ( y, off ) => {
				const s = surfaceAt( morph, a, y );
				return [ s[ 0 ] + nrm[ 0 ] * off, s[ 1 ] + nrm[ 1 ] * off ];
			};
			// Base on the band, inside its width across the finger (local x), nearer the middle along it.
			const bz = P[ 1 ] * 0.48;
			pts[ 0 ].set( P[ 0 ] * 0.18, BAND_TOP - 0.035 - ( bz * bz * HEAD_SCALE ) / ( 2 * rOut( 0 ) ), bz );
			let q = hug( - 0.3, 0.064 );
			pts[ 1 ].set( q[ 0 ], - 0.3, q[ 1 ] );
			q = hug( - 0.13, 0.062 );
			pts[ 2 ].set( q[ 0 ], - 0.13, q[ 1 ] );
			pts[ 3 ].set( P[ 0 ] + nrm[ 0 ] * 0.058, - 0.01, P[ 1 ] + nrm[ 1 ] * 0.058 );
			pts[ 4 ].set( P[ 0 ] + nrm[ 0 ] * 0.048, 0.048, P[ 1 ] + nrm[ 1 ] * 0.048 );
			pts[ 5 ].set( P[ 0 ] * 0.965 + nrm[ 0 ] * 0.026, 0.074, P[ 1 ] * 0.965 + nrm[ 1 ] * 0.026 );
			const n = 48;
			const path = [];
			for ( let i = 0; i < n; i ++ ) {
				path.push( curve.getPointAt( ( i / ( n - 1 ) ) * g ) );
			}
			tip.pos.copy( path[ n - 1 ] );
			tip.closed = g;
			const radius = ( u ) => ( 0.062 - 0.008 * u * g ) * ( 0.55 + 0.45 * presence );
			tube.sweep( path, radius, { capEnd: true, capSteps: 10 } );
			// The same claw, as four capsules, for its reflections inside the stone.
			for ( let c = 0; c < 4; c ++ ) {
				const a0 = path[ Math.round( ( c / 4 ) * ( n - 1 ) ) ];
				const a1 = path[ Math.round( ( ( c + 1 ) / 4 ) * ( n - 1 ) ) ];
				caps.push( [ a0.x, a0.y, a0.z, radius( ( c + 0.5 ) / 4 ), a1.x, a1.y, a1.z ] );
			}
		}
		// The basket rail: a slim loop low on the pavilion that ties the claws together.
		const rg = smooth( 0.35, 1, pg );
		if ( rg <= 0.001 ) {
			rail.begin();
			rail.end();
		} else {
			const pts2 = [];
			const closed = rg >= 0.999;
			const count = 100;
			const total = closed ? count : Math.max( 2, Math.round( count * rg ) + 1 );
			const yr = - 0.28;
			for ( let i = 0; i < total; i ++ ) {
				const a = closed ? ( i / count ) * Math.PI * 2 : ( i / ( total - 1 ) ) * Math.PI * 2 * rg - Math.PI / 2;
				const p = surfaceAt( morph, a, yr );
				outlineNormal( morph, a, nrm );
				pts2.push( new THREE.Vector3( p[ 0 ] + nrm[ 0 ] * 0.03, yr, p[ 1 ] + nrm[ 1 ] * 0.03 ) );
			}
			rail.sweep( pts2, 0.024, { up: new THREE.Vector3( 0, 1, 0 ), closed, capStart: ! closed, capEnd: ! closed } );
			loopCaps( pts2, 0.024, closed );
		}
		return pg;
	}

	const haloSpots = [];
	function buildHalo( morph, h ) {
		const yh = - 0.12;
		const cg = smooth( 0, 0.55, h );
		collarCaps.length = 0;
		sparks.halo.length = 0;
		if ( h <= 0.001 ) {
			collar.begin();
			collar.end();
			halo.count = 0;
			halo.visible = false;
			return;
		}
		if ( cg <= 0.001 ) {
			collar.begin();
			collar.end();
		} else {
			const pts = [];
			const closed = cg >= 0.999;
			const count = 120;
			const total = closed ? count : Math.max( 2, Math.round( count * cg ) + 1 );
			// The collar: a band of metal that wraps the pavilion just under the girdle, the stones set in it.
			for ( let i = 0; i < total; i ++ ) {
				const a = closed ? ( i / count ) * Math.PI * 2 : ( i / ( total - 1 ) ) * Math.PI * 2 * cg + Math.PI / 2;
				const p = surfaceAt( morph, a, yh - 0.01 );
				outlineNormal( morph, a, nrm );
				pts.push( new THREE.Vector3( p[ 0 ] + nrm[ 0 ] * 0.036, yh - 0.01, p[ 1 ] + nrm[ 1 ] * 0.036 ) );
			}
			collar.sweep( pts, 0.044, { up: new THREE.Vector3( 0, 1, 0 ), closed, capStart: ! closed, capEnd: ! closed } );
			loopCaps( pts, 0.044, closed, collarCaps );
		}
		// Stones on the outside of the collar, evenly by length, tilted up a little; none where a claw passes.
		evenAround( morph, yh, 0.066, 0.118, haloSpots );
		const claws = [];
		for ( let k = 0; k < PRONGS; k ++ ) {
			const [ a, on ] = prongAt( morph, k );
			if ( on > 0.5 ) {
				const p = surfaceAt( morph, a, yh );
				outlineNormal( morph, a, nrm );
				claws.push( [ p[ 0 ] + nrm[ 0 ] * 0.066, p[ 1 ] + nrm[ 1 ] * 0.066 ] );
			}
		}
		let used = 0;
		const up = new THREE.Vector3( 0, 1, 0 );
		for ( const s of haloSpots ) {
			if ( used >= HALO ) {
				break;
			}
			if ( claws.some( ( c ) => Math.hypot( c[ 0 ] - s.x, c[ 1 ] - s.z ) < 0.1 ) ) {
				continue;
			}
			// Each stone drops into its seat in turn, around from the front.
			const order = ( s.a / ( Math.PI * 2 ) + 0.75 ) % 1;
			const t = smooth( 0.3 + order * 0.55, 0.3 + order * 0.55 + 0.12, h );
			if ( t <= 0.001 ) {
				continue;
			}
			const out = new THREE.Vector3( s.nx, 0, s.nz );
			// Facing out and a little up, tucked under the girdle: hidden from the front, a sparkle from the side.
			const axis = out.clone().multiplyScalar( Math.cos( 0.3 ) ).addScaledVector( up, Math.sin( 0.3 ) ).normalize();
			v3.set( s.x, yh + 0.008, s.z ).addScaledVector( axis, ( 1 - t ) * 0.22 );
			q4.setFromUnitVectors( up, axis );
			const size = 0.104 * ( 0.7 + 0.3 * t );
			s3.set( size, size, size );
			halo.setMatrixAt( used ++, m4.compose( v3, q4, s3 ) );
			spark( sparks.halo, v3.clone().addScaledVector( axis, size * 0.3 ), t, 0.26 );
		}
		halo.count = used;
		halo.instanceMatrix.needsUpdate = true;
		halo.visible = used > 0;
	}

	function buildPave( p ) {
		let used = 0;
		const n = paveSpots.length;
		sparks.pave.length = 0;
		for ( const d of paveData ) {
			// Set from the head outwards: each stone drops into its seat.
			const start = ( d.order / n ) * 0.75;
			const t = smooth( start, start + 0.18, p );
			if ( t <= 0.001 ) {
				continue;
			}
			const size = d.size * ( 0.7 + 0.3 * t );
			s3.set( size, size, size );
			v3.copy( d.pos ).addScaledVector( d.normal, ( 1 - t ) * 0.3 );
			pave.setMatrixAt( used ++, m4.compose( v3, d.q, s3 ) );
			spark( sparks.pave, v3.clone().addScaledVector( d.normal, size * 0.3 ), t, d.size * 2.4 );
		}
		pave.count = used;
		pave.instanceMatrix.needsUpdate = true;
		pave.visible = used > 0;
		let b = 0;
		q4.identity();
		for ( const d of beadData ) {
			// The beads close over the stones just after they land.
			const start = ( d.order / n ) * 0.75 + 0.1;
			const t = smooth( start, start + 0.12, p );
			if ( t <= 0.001 ) {
				continue;
			}
			const size = d.size * t;
			s3.set( size, size, size );
			beads.setMatrixAt( b ++, m4.compose( d.pos, q4, s3 ) );
		}
		beads.count = b;
		beads.instanceMatrix.needsUpdate = true;
		beads.visible = b > 0;
	}

	const color = new THREE.Color();
	return {
		group,
		head,
		pave,
		halo,
		metals,
		stoneMaterial: stoneMat,
		tips,
		/** Prongs, rail and collar as capsules in the stone's space. */
		get setting() {
			return caps.concat( collarCaps );
		},
		bandEnds: band.ends,
		get bandGrow() {
			return band.g;
		},
		/** Apply a state: band, prongs, halo, pave in 0..1; morph 0..3; metal 0..2. */
		update( s ) {
			if ( s.band !== state.band ) {
				band.set( s.band );
				state.band = s.band;
			}
			const headDirty = s.morph !== state.morph;
			if ( headDirty || s.prongs !== state.prongs ) {
				buildHead( s.morph, s.prongs );
				state.prongs = s.prongs;
			}
			if ( headDirty || s.halo !== state.halo ) {
				buildHalo( s.morph, s.halo );
				state.halo = s.halo;
			}
			state.morph = s.morph;
			if ( s.pave !== state.pave ) {
				buildPave( s.pave );
				state.pave = s.pave;
			}
			if ( s.metal !== state.metal ) {
				// The new metal flows from the head down both sides to the bottom, a seam of light at its edge.
				const i = Math.min( 1, Math.floor( s.metal ) );
				const t = Math.min( 1, Math.max( 0, s.metal - i ) );
				FLOW.metalA.value.copy( METAL_ORDER[ i ] );
				FLOW.metalB.value.copy( METAL_ORDER[ Math.min( 2, i + 1 ) ] );
				FLOW.front.value = - 0.3 + t * ( Math.PI + 0.6 );
				FLOW.seam.value = Math.sin( Math.PI * t ) * 1.4;
				// The head's colour, for the claws seen inside the stone.
				const k = smooth( FLOW.front.value - 0.14, FLOW.front.value + 0.14, 0.14 );
				color.copy( FLOW.metalB.value ).lerp( FLOW.metalA.value, k );
				for ( const m of metals ) {
					m.color.copy( color );
				}
				state.metal = s.metal;
			}
			// Newly cast metal glows behind the band's growing ends.
			FLOW.forge.value.set( Math.PI * ( 1 - Math.min( 1, Math.max( 0, s.band ) ) ), s.forge || 0 );
		},
		/** Call once the ring's world matrix is up to date (the flowing metal is measured in its space). */
		syncFlow() {
			FLOW.ringInv.value.copy( group.matrixWorld ).invert();
		},
		sparks,
		setRoughness( r ) {
			bandMat.roughness = r;
			headMat.roughness = r;
			detailMat.roughness = r + 0.05;
		},
	};
}
