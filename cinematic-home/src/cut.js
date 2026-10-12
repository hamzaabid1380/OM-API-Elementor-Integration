import * as THREE from 'three';

/**
 * A brilliant-cut diamond built from real proportions (fractions of the
 * girdle diameter): table, 8 stars, 8 bezels, upper girdle facets, the
 * girdle, lower girdle facets and 8 pavilion mains. Fancy shapes keep the
 * same facets stretched to their own outline, so one shape can flow into
 * another facet by facet.
 */
const TABLE = 0.56;
const CROWN = THREE.MathUtils.degToRad( 34.5 );
const PAVILION = THREE.MathUtils.degToRad( 40.8 );
const GIRDLE = 0.03;
const STAR = 0.5;
const LOWER = 0.77;
const R = 0.5;
const STEPS = 2; // girdle points between two mains: 16 around, two upper and two lower girdle facets per main, like a real 57-facet brilliant

const crownH = ( R - TABLE / 2 ) * Math.tan( CROWN );
const pavH = R * Math.tan( PAVILION );

export const CUT = {
	tableY: GIRDLE / 2 + crownH,
	girdleTop: GIRDLE / 2,
	girdleBottom: -GIRDLE / 2,
	culetY: -GIRDLE / 2 - pavH,
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

/** A point of the cut: at parameter a, a fraction f of the way out to the girdle, at height y. */
function at( outline, a, f, y ) {
	const p = outline( a );
	return [ p[ 0 ] * f, y, p[ 1 ] * f ];
}

/**
 * The faces of the cut as a flat list of triangles (9 numbers each), the
 * same order for every outline. Winding is fixed later from the round stone.
 */
function faces( outline ) {
	const out = [];
	const tri = ( a, b, c ) => out.push( a, b, c );
	const yT = CUT.tableY;
	const gT = CUT.girdleTop;
	const gB = CUT.girdleBottom;
	const yC = CUT.culetY;
	const fT = ( TABLE / 2 ) / R;
	const fS = ( TABLE / 2 + ( R - TABLE / 2 ) * STAR ) / R;
	const yS = gT + crownH * ( 1 - STAR );
	const fL = 1 - LOWER;
	const yL = gB - pavH * LOWER;
	const N = 8;
	const step = ( Math.PI * 2 ) / N;
	const G = N * STEPS;
	const gTop = [];
	const gBot = [];
	for ( let j = 0; j < G; j ++ ) {
		const a = ( j / G ) * Math.PI * 2;
		gTop.push( at( outline, a, 1, gT ) );
		gBot.push( at( outline, a, 1, gB ) );
	}
	const T = [];
	const S = [];
	const L = [];
	for ( let k = 0; k < N; k ++ ) {
		T.push( at( outline, k * step, fT, yT ) );
		S.push( at( outline, k * step + step / 2, fS, yS ) );
		L.push( at( outline, k * step + step / 2, fL, yL ) );
	}
	const tc = [ 0, yT, 0 ];
	const cul = [ 0, yC, 0 ];
	for ( let k = 0; k < N; k ++ ) {
		const k1 = ( k + 1 ) % N;
		const km = ( k + N - 1 ) % N;
		const gm = gTop[ k * STEPS ];
		// Table (a fan of one plane), star, bezel (two halves).
		tri( tc, T[ k ], T[ k1 ] );
		tri( T[ k ], T[ k1 ], S[ k ] );
		tri( T[ k ], S[ k ], gm );
		tri( T[ k ], gm, S[ km ] );
		// Upper girdle facets: from the star point down to the girdle.
		for ( let j = 0; j < STEPS; j ++ ) {
			tri( S[ k ], gTop[ ( k * STEPS + j ) % G ], gTop[ ( k * STEPS + j + 1 ) % G ] );
		}
		// Lower girdle facets and the pavilion mains.
		for ( let j = 0; j < STEPS; j ++ ) {
			tri( L[ k ], gBot[ ( k * STEPS + j ) % G ], gBot[ ( k * STEPS + j + 1 ) % G ] );
		}
		tri( gBot[ k * STEPS ], L[ k ], cul );
		tri( gBot[ k * STEPS ], cul, L[ km ] );
	}
	// The girdle band.
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

/** A small round stone (pave, halo): same cut, fewer girdle points is fine. */
export function smallStoneGeometry() {
	const g = new THREE.BufferGeometry();
	g.setAttribute( 'position', new THREE.BufferAttribute( shapePositions( 'round' ).slice(), 3 ) );
	g.computeVertexNormals();
	return g;
}
