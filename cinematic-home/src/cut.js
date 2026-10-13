import * as THREE from 'three';

/**
 * A round brilliant built the way a real one is: 57 flat facets (table,
 * 8 stars, 8 bezels, 16 upper girdle, 16 lower girdle, 8 pavilion mains)
 * meeting a round girdle. Every facet is a true plane; where a facet meets
 * the girdle its edge follows the curve, so the girdle is round and
 * slightly scalloped like a polished stone, not a polygon.
 *
 * Proportions are an ideal cut (fractions of the girdle diameter): table
 * 56%, crown 34.5°, pavilion 40.8°, stars 50%, lower girdle 77%.
 *
 * Fancy shapes use the same facets on their own outline, so one shape can
 * flow into another facet by facet.
 */
const TABLE = 0.56;
const CROWN = THREE.MathUtils.degToRad( 34.5 );
const PAVILION = THREE.MathUtils.degToRad( 40.8 );
const GIRDLE = 0.03;
const STAR = 0.5;
const LOWER = 0.77;
const R = 0.5;
const N = 8; // mains
const SUB = 4; // girdle segments per upper or lower girdle facet: 64 around
const STEP = ( Math.PI * 2 ) / N;

const crownH = ( R - TABLE / 2 ) * Math.tan( CROWN );
const pavH = R * Math.tan( PAVILION );

export const CUT = {
	tableY: GIRDLE / 2 + crownH,
	girdleTop: GIRDLE / 2,
	girdleBottom: - GIRDLE / 2,
	culetY: - GIRDLE / 2 - pavH,
	crownH,
	pavH,
};

/** Girdle outlines: the point at parameter a (radians) for a stone about 1 unit across. */
export const SHAPES = {
	round: ( a ) => [ Math.cos( a ) * R, Math.sin( a ) * R ],
	oval: ( a ) => [ Math.cos( a ) * 0.6, Math.sin( a ) * 0.6 * 0.69 ],
	cushion: ( a ) => {
		const c = Math.cos( a );
		const s = Math.sin( a );
		const p = 3.2;
		const r = Math.pow( Math.pow( Math.abs( c ), p ) + Math.pow( Math.abs( s ), p ), - 1 / p ) * 0.455;
		return [ c * r, s * r ];
	},
	// Teardrop: point towards +x, round end behind the culet.
	pear: ( a ) => {
		const k = 0.58;
		return [ ( Math.cos( a ) + 0.3 ) * k, Math.sin( a ) * Math.sin( a / 2 ) * 0.84 * k ];
	},
};

export const SHAPE_ORDER = [ 'round', 'oval', 'cushion', 'pear' ];

/** Height on the plane through a, b, c at (x, z). */
function onPlane( a, b, c, x, z ) {
	const ux = b[ 0 ] - a[ 0 ];
	const uy = b[ 1 ] - a[ 1 ];
	const uz = b[ 2 ] - a[ 2 ];
	const vx = c[ 0 ] - a[ 0 ];
	const vy = c[ 1 ] - a[ 1 ];
	const vz = c[ 2 ] - a[ 2 ];
	const nx = uy * vz - uz * vy;
	const ny = uz * vx - ux * vz;
	const nz = ux * vy - uy * vx;
	if ( Math.abs( ny ) < 1e-9 ) {
		return a[ 1 ];
	}
	return a[ 1 ] - ( nx * ( x - a[ 0 ] ) + nz * ( z - a[ 2 ] ) ) / ny;
}

/**
 * The faces of the cut as a flat list of triangles (3 points each), the same
 * order for every outline. Winding is fixed later from the round stone.
 */
function faces( outline ) {
	const out = [];
	const tri = ( a, b, c ) => out.push( a, b, c );
	const at = ( a, f, y ) => {
		const p = outline( a );
		return [ p[ 0 ] * f, y, p[ 1 ] * f ];
	};
	const yT = CUT.tableY;
	const gT = CUT.girdleTop;
	const gB = CUT.girdleBottom;
	const yC = CUT.culetY;
	const fT = ( TABLE / 2 ) / R;
	const fS = ( TABLE / 2 + ( R - TABLE / 2 ) * STAR ) / R;
	const fL = 1 - LOWER;
	// Star and lower-girdle points sit where the bezels and mains stay flat.
	const half = Math.cos( STEP / 2 );
	const yS = yT - ( fS * R * half - TABLE / 2 ) * Math.tan( CROWN );
	const yL = yC + pavH * fL * half;

	const T = [];
	const S = [];
	const L = [];
	for ( let k = 0; k < N; k ++ ) {
		T.push( at( k * STEP, fT, yT ) );
		S.push( at( ( k + 0.5 ) * STEP, fS, yS ) );
		L.push( at( ( k + 0.5 ) * STEP, fL, yL ) );
	}
	const G = 2 * N * SUB; // girdle points around
	const ga = ( j ) => ( j / G ) * Math.PI * 2;
	const top = ( j ) => at( ga( j ), 1, gT );
	const bot = ( j ) => at( ga( j ), 1, gB );
	const tc = [ 0, yT, 0 ];
	const cul = [ 0, yC, 0 ];

	// Girdle edges: each point takes its height from the facet it belongs to,
	// so the facets stay flat and the girdle stays round.
	const gTop = [];
	const gBot = [];
	for ( let k = 0; k < N; k ++ ) {
		const j0 = k * 2 * SUB;
		const jm = j0 + SUB;
		const j1 = ( j0 + 2 * SUB ) % G;
		const facetsTop = [ [ S[ k ], top( j0 ), top( jm ) ], [ S[ k ], top( jm ), top( j1 ) ] ];
		const facetsBot = [ [ L[ k ], bot( j0 ), bot( jm ) ], [ L[ k ], bot( jm ), bot( j1 ) ] ];
		for ( let s = 0; s < 2 * SUB; s ++ ) {
			const j = j0 + s;
			const ft = facetsTop[ s < SUB ? 0 : 1 ];
			const fb = facetsBot[ s < SUB ? 0 : 1 ];
			const p = top( j );
			gTop[ j ] = s === 0 || s === SUB ? p : [ p[ 0 ], onPlane( ft[ 0 ], ft[ 1 ], ft[ 2 ], p[ 0 ], p[ 2 ] ), p[ 2 ] ];
			const q = bot( j );
			gBot[ j ] = s === 0 || s === SUB ? q : [ q[ 0 ], onPlane( fb[ 0 ], fb[ 1 ], fb[ 2 ], q[ 0 ], q[ 2 ] ), q[ 2 ] ];
		}
	}

	for ( let k = 0; k < N; k ++ ) {
		const k1 = ( k + 1 ) % N;
		const km = ( k + N - 1 ) % N;
		const j0 = k * 2 * SUB;
		// Table (one plane, as a fan) and the star.
		tri( tc, T[ k ], T[ k1 ] );
		tri( T[ k ], T[ k1 ], S[ k ] );
		// Bezel: a flat kite from the table corner down to the girdle.
		tri( T[ k ], S[ k ], gTop[ j0 ] );
		tri( T[ k ], gTop[ j0 ], S[ km ] );
		// Two upper girdle facets under each star point, following the girdle curve.
		for ( let s = 0; s < 2 * SUB; s ++ ) {
			tri( S[ k ], gTop[ ( j0 + s ) % G ], gTop[ ( j0 + s + 1 ) % G ] );
		}
		// Two lower girdle facets, then the pavilion main (a flat kite to the culet).
		for ( let s = 0; s < 2 * SUB; s ++ ) {
			tri( L[ k ], gBot[ ( j0 + s ) % G ], gBot[ ( j0 + s + 1 ) % G ] );
		}
		tri( gBot[ j0 ], L[ k ], cul );
		tri( gBot[ j0 ], cul, L[ km ] );
	}
	// The polished girdle band.
	for ( let j = 0; j < G; j ++ ) {
		const j1 = ( j + 1 ) % G;
		tri( gTop[ j ], gBot[ j ], gBot[ j1 ] );
		tri( gTop[ j ], gBot[ j1 ], gTop[ j1 ] );
	}
	return out;
}

/** Positions (non-indexed) for an outline, wound outwards like the round stone. */
const flips = [];
export function cutPositions( outline ) {
	const f = faces( outline );
	const pos = new Float32Array( f.length * 3 );
	const mid = ( CUT.tableY + CUT.culetY ) / 2;
	const ab = new THREE.Vector3();
	const ac = new THREE.Vector3();
	const n = new THREE.Vector3();
	const c = new THREE.Vector3();
	const learn = flips.length === 0;
	for ( let t = 0; t < f.length / 3; t ++ ) {
		let [ a, b, d ] = [ f[ t * 3 ], f[ t * 3 + 1 ], f[ t * 3 + 2 ] ];
		if ( learn ) {
			ab.set( b[ 0 ] - a[ 0 ], b[ 1 ] - a[ 1 ], b[ 2 ] - a[ 2 ] );
			ac.set( d[ 0 ] - a[ 0 ], d[ 1 ] - a[ 1 ], d[ 2 ] - a[ 2 ] );
			n.crossVectors( ab, ac );
			c.set( ( a[ 0 ] + b[ 0 ] + d[ 0 ] ) / 3, ( a[ 1 ] + b[ 1 ] + d[ 1 ] ) / 3 - mid, ( a[ 2 ] + b[ 2 ] + d[ 2 ] ) / 3 );
			flips.push( n.dot( c ) < 0 );
		}
		if ( flips[ t ] ) {
			[ b, d ] = [ d, b ];
		}
		pos.set( a, t * 9 );
		pos.set( b, t * 9 + 3 );
		pos.set( d, t * 9 + 6 );
	}
	return pos;
}

// Learn the winding from the round stone first.
cutPositions( SHAPES.round );

const cache = {};
export function shapePositions( name ) {
	if ( ! cache[ name ] ) {
		cache[ name ] = cutPositions( SHAPES[ name ] );
	}
	return cache[ name ];
}

/**
 * Blend along SHAPE_ORDER: m = 0 round, 1 oval, 2 cushion, 3 pear, 4 round
 * again. Writes into out.
 */
export function morphPositions( m, out ) {
	const n = SHAPE_ORDER.length;
	const mm = ( ( m % n ) + n ) % n;
	const i = Math.floor( mm );
	const t = mm - i;
	const a = shapePositions( SHAPE_ORDER[ i ] );
	const b = shapePositions( SHAPE_ORDER[ ( i + 1 ) % n ] );
	for ( let k = 0; k < out.length; k ++ ) {
		out[ k ] = a[ k ] + ( b[ k ] - a[ k ] ) * t;
	}
	return out;
}

/** The girdle outline point (x, z) for a morph value, at parameter a. */
export function outlineAt( m, a ) {
	const n = SHAPE_ORDER.length;
	const mm = ( ( m % n ) + n ) % n;
	const i = Math.floor( mm );
	const t = mm - i;
	const p = SHAPES[ SHAPE_ORDER[ i ] ]( a );
	const q = SHAPES[ SHAPE_ORDER[ ( i + 1 ) % n ] ]( a );
	return [ p[ 0 ] + ( q[ 0 ] - p[ 0 ] ) * t, p[ 1 ] + ( q[ 1 ] - p[ 1 ] ) * t ];
}

/** A small round stone (pave, halo): the same cut. */
export function smallStoneGeometry() {
	const g = new THREE.BufferGeometry();
	g.setAttribute( 'position', new THREE.BufferAttribute( shapePositions( 'round' ).slice(), 3 ) );
	g.computeVertexNormals();
	return g;
}
