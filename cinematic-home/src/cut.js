import * as THREE from 'three';

/**
 * Diamonds built the way real ones are cut, on one shared layout of facets, so
 * one shape can flow into another facet by facet.
 *
 * - Brilliant cuts (round, oval, pear): 57 flat facets (table, 8 stars, 8
 *   bezels, 16 upper girdle, 16 lower girdle, 8 pavilion mains) meeting a
 *   round girdle. Every facet is a true plane; where a facet meets the girdle
 *   its edge follows the curve, so the girdle is round and slightly scalloped
 *   like a polished stone, not a polygon. Proportions are an ideal cut
 *   (fractions of the girdle diameter): table 56%, crown 34.5°, pavilion
 *   40.8°, stars 50%, lower girdle 77%.
 * - Step cuts (emerald): a table, three rows of steps on the crown and three
 *   on the pavilion down to a keel, with cut corners: the long flashes and
 *   the "hall of mirrors" of a real emerald cut.
 *
 * The shared layout is eight wedges around the stone. Each wedge has rings
 * of points from the table out to the girdle and from the girdle down to the
 * culet, joined in the same order for every shape. A step cut uses every
 * ring as the edge of a step; a brilliant puts the rings it does not need on
 * the edges of its own facets, where they make no visible line.
 */
const TABLE = 0.56;
const CROWN = THREE.MathUtils.degToRad( 34.5 );
const PAVILION = THREE.MathUtils.degToRad( 40.8 );
const GIRDLE = 0.03;
const STAR = 0.5;
const LOWER = 0.77;
const R = 0.5;
const N = 8; // wedges (the brilliant's mains; the step cut's sides and corners)
const SUB = 4; // girdle segments per upper or lower girdle facet: 64 around
const STEP = ( Math.PI * 2 ) / N;
const G = 2 * N * SUB;

const crownH = ( R - TABLE / 2 ) * Math.tan( CROWN );
const pavH = R * Math.tan( PAVILION );

/** The round brilliant's heights (the setting is built around them). */
export const CUT = {
	tableY: GIRDLE / 2 + crownH,
	girdleTop: GIRDLE / 2,
	girdleBottom: - GIRDLE / 2,
	culetY: - GIRDLE / 2 - pavH,
	crownH,
	pavH,
};

/**
 * The emerald cut: 7.5 x 5.5 mm (the stone of style 51156-E) with cut corners. Each ring of
 * steps is the girdle outline moved inwards by d on every side; the corners shrink with it.
 * Crown steps from the girdle in, then pavilion steps from the girdle down to the keel:
 * [how far in, slope in degrees].
 */
const EMERALD = { L: 0.58, W: 0.425, b: 0.13 };
const STEP_CROWN = [ [ 0.045, 42 ], [ 0.05, 32 ], [ 0.055, 23 ] ];
const STEP_PAVILION = [ [ 0.135, 52 ], [ 0.135, 44 ], [ EMERALD.W - 0.01 - 0.27, 34 ] ];

function emeraldRing( d ) {
	const L = EMERALD.L - d;
	const W = Math.max( 0.004, EMERALD.W - d );
	const b = ( EMERALD.b * W ) / EMERALD.W;
	return [ [ L, W - b ], [ L - b, W ], [ - ( L - b ), W ], [ - L, W - b ], [ - L, - ( W - b ) ], [ - ( L - b ), - W ], [ L - b, - W ], [ L, - ( W - b ) ] ];
}

/** A point on a polygon of eight corners (one per wedge boundary) at parameter a. */
function polyAt( corners, a ) {
	const u = ( ( ( a / STEP ) % N ) + N ) % N;
	const k = Math.min( N - 1, Math.floor( u ) );
	const t = u - k;
	const p = corners[ k ];
	const q = corners[ ( k + 1 ) % N ];
	return [ p[ 0 ] + ( q[ 0 ] - p[ 0 ] ) * t, p[ 1 ] + ( q[ 1 ] - p[ 1 ] ) * t ];
}

// Step heights, from the girdle: crown rings outwards-in, pavilion rings downwards.
const stepCrown = [];
const stepPavilion = [];
{
	let d = 0;
	let y = GIRDLE / 2;
	for ( const [ dd, deg ] of STEP_CROWN ) {
		d += dd;
		y += dd * Math.tan( THREE.MathUtils.degToRad( deg ) );
		stepCrown.push( { d, y } );
	}
	d = 0;
	y = - GIRDLE / 2;
	for ( const [ dd, deg ] of STEP_PAVILION ) {
		d += dd;
		y -= dd * Math.tan( THREE.MathUtils.degToRad( deg ) );
		stepPavilion.push( { d, y } );
	}
}

/**
 * The shapes: girdle outline (the point at parameter a for a stone about 1 unit across;
 * a = k * 45° are the wedge boundaries), how it is cut, and the pavilion's surface at a
 * height (for the prongs and the hidden halo, which hug it).
 */
const brilliantSurface = ( outline ) => ( a, y ) => {
	const f = THREE.MathUtils.clamp( ( y - CUT.culetY ) / pavH, 0, 1 );
	const p = outline( a );
	return [ p[ 0 ] * f, p[ 1 ] * f ];
};

const round = ( a ) => [ Math.cos( a ) * R, Math.sin( a ) * R ];
const oval = ( a ) => [ Math.cos( a ) * 0.6, Math.sin( a ) * 0.6 * 0.69 ];
// Teardrop: point towards -x (away from the words in the film), round end behind the culet.
// Traced mirrored (parameter pi - a) so it runs the same way round as the other outlines.
const pear = ( a ) => {
	const k = 0.58;
	const b = ( ( ( Math.PI - a ) % ( Math.PI * 2 ) ) + Math.PI * 2 ) % ( Math.PI * 2 );
	return [ - ( Math.cos( b ) + 0.3 ) * k, Math.sin( b ) * Math.sin( b / 2 ) * 0.84 * k ];
};
const emeraldGirdle = emeraldRing( 0 );
const emerald = ( a ) => polyAt( emeraldGirdle, a );

export const SHAPES = {
	round: { outline: round, step: false, surface: brilliantSurface( round ) },
	oval: { outline: oval, step: false, surface: brilliantSurface( oval ) },
	pear: { outline: pear, step: false, surface: brilliantSurface( pear ) },
	emerald: {
		outline: emerald,
		step: true,
		surface( a, y ) {
			// Inset at this height, between the girdle and the keel.
			const hs = [ - GIRDLE / 2, ...stepPavilion.map( ( s ) => s.y ) ];
			const ds = [ 0, ...stepPavilion.map( ( s ) => s.d ) ];
			let d = ds[ ds.length - 1 ];
			for ( let i = 0; i < hs.length - 1; i ++ ) {
				if ( y <= hs[ i ] && y >= hs[ i + 1 ] ) {
					d = ds[ i ] + ( ds[ i + 1 ] - ds[ i ] ) * ( ( hs[ i ] - y ) / ( hs[ i ] - hs[ i + 1 ] ) );
					break;
				}
			}
			if ( y > hs[ 0 ] ) {
				d = 0;
			}
			return polyAt( emeraldRing( d ), a );
		},
	},
};

/** The order the film shows them in (and the morph value of each): it ends on the oval. */
export const SHAPE_ORDER = [ 'round', 'emerald', 'pear', 'oval' ];

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

const lerp3 = ( p, q, t ) => [ p[ 0 ] + ( q[ 0 ] - p[ 0 ] ) * t, p[ 1 ] + ( q[ 1 ] - p[ 1 ] ) * t, p[ 2 ] + ( q[ 2 ] - p[ 2 ] ) * t ];
const ga = ( j ) => ( j / G ) * Math.PI * 2;
const each = ( f ) => Array.from( { length: N }, ( _, k ) => f( k ) );

/**
 * A brilliant on the shared layout. Rings: crown C0 (table), C1 (stars), C2 (girdle corners),
 * pavilion P3, P2 (girdle corners) and P1 (lower girdle points). Each ring has a point on every
 * wedge boundary (B) and one in the middle of every wedge (M).
 */
function brilliantRings( outline ) {
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
	const T = each( ( k ) => at( k * STEP, fT, yT ) );
	const S = each( ( k ) => at( ( k + 0.5 ) * STEP, fS, yS ) );
	const L = each( ( k ) => at( ( k + 0.5 ) * STEP, fL, yL ) );
	const top = ( j ) => at( ga( j ), 1, gT );
	const bot = ( j ) => at( ga( j ), 1, gB );

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
	const corner = ( g ) => each( ( k ) => g[ k * 2 * SUB ] );
	const mid = ( g ) => ( k ) => g[ k * 2 * SUB + SUB ];
	const cul = [ 0, yC, 0 ];
	return {
		tc: [ 0, yT, 0 ],
		cul,
		C: [
			{ B: T, M: each( ( k ) => lerp3( T[ k ], T[ ( k + 1 ) % N ], 0.5 ) ) },
			{ B: each( ( k ) => lerp3( T[ k ], gTop[ k * 2 * SUB ], 0.5 ) ), M: S },
			{ B: corner( gTop ), M: each( ( k ) => lerp3( S[ k ], mid( gTop )( k ), 0.5 ) ) },
		],
		P: [
			{ B: each( ( k ) => lerp3( gBot[ k * 2 * SUB ], cul, 0.5 ) ), M: L },
			{ B: corner( gBot ), M: each( ( k ) => lerp3( L[ k ], mid( gBot )( k ), 0.33 ) ) },
			{ B: corner( gBot ), M: each( ( k ) => lerp3( L[ k ], mid( gBot )( k ), 0.67 ) ) },
		],
		gTop,
		gBot,
	};
}

/** The emerald cut on the same layout: every ring is the edge of a step. */
function stepRings() {
	const ring = ( d, y ) => {
		const c = emeraldRing( d );
		return {
			B: c.map( ( p ) => [ p[ 0 ], y, p[ 1 ] ] ),
			M: c.map( ( p, k ) => {
				const q = c[ ( k + 1 ) % N ];
				return [ ( p[ 0 ] + q[ 0 ] ) / 2, y, ( p[ 1 ] + q[ 1 ] ) / 2 ];
			} ),
		};
	};
	const crown = stepCrown.map( ( s ) => ring( s.d, s.y ) );
	const pav = stepPavilion.map( ( s ) => ring( s.d, s.y ) );
	const gTop = [];
	const gBot = [];
	for ( let j = 0; j < G; j ++ ) {
		const p = emerald( ga( j ) );
		gTop.push( [ p[ 0 ], GIRDLE / 2, p[ 1 ] ] );
		gBot.push( [ p[ 0 ], - GIRDLE / 2, p[ 1 ] ] );
	}
	const keel = stepPavilion[ stepPavilion.length - 1 ].y;
	return {
		tc: [ 0, stepCrown[ stepCrown.length - 1 ].y, 0 ],
		cul: [ 0, keel, 0 ],
		C: [ crown[ 2 ], crown[ 1 ], crown[ 0 ] ],
		P: [ pav[ 2 ], pav[ 1 ], pav[ 0 ] ],
		gTop,
		gBot,
	};
}

/**
 * The faces as a flat list of triangles (3 points each), in the same order for every shape.
 * Between two rings each wedge is two quads, split along a diagonal chosen so a brilliant's
 * facets stay whole: from the inner ring's corner to the outer ring's middle (BM) or the other
 * way (MB). Winding is fixed later.
 */
function faces( r ) {
	const out = [];
	const tri = ( a, b, c ) => out.push( a, b, c );
	const nx = ( k ) => ( k + 1 ) % N;
	const gap = ( I, O, k, bm ) => {
		const k1 = nx( k );
		if ( bm ) {
			tri( I.B[ k ], I.M[ k ], O.M[ k ] );
			tri( I.B[ k ], O.M[ k ], O.B[ k ] );
			tri( I.M[ k ], I.B[ k1 ], O.M[ k ] );
			tri( I.B[ k1 ], O.B[ k1 ], O.M[ k ] );
		} else {
			tri( I.B[ k ], I.M[ k ], O.B[ k ] );
			tri( I.M[ k ], O.M[ k ], O.B[ k ] );
			tri( I.M[ k ], I.B[ k1 ], O.B[ k1 ] );
			tri( I.M[ k ], O.B[ k1 ], O.M[ k ] );
		}
	};
	// From a ring out to the girdle: a fan from the wedge's middle point.
	const fan = ( I, g, k ) => {
		const j0 = k * 2 * SUB;
		tri( I.B[ k ], I.M[ k ], g[ j0 ] );
		for ( let s = 0; s < 2 * SUB; s ++ ) {
			tri( I.M[ k ], g[ ( j0 + s ) % G ], g[ ( j0 + s + 1 ) % G ] );
		}
		tri( I.M[ k ], g[ ( j0 + 2 * SUB ) % G ], I.B[ nx( k ) ] );
	};
	const [ C0, C1, C2 ] = r.C;
	const [ P1, P2, P3 ] = r.P;
	for ( let k = 0; k < N; k ++ ) {
		// Table, then the crown out to the girdle.
		tri( r.tc, C0.B[ k ], C0.M[ k ] );
		tri( r.tc, C0.M[ k ], C0.B[ nx( k ) ] );
		gap( C0, C1, k, true );
		gap( C1, C2, k, false );
		fan( C2, r.gTop, k );
		// The pavilion from the girdle down to the culet.
		fan( P3, r.gBot, k );
		gap( P2, P3, k, true );
		gap( P1, P2, k, false );
		tri( P1.B[ k ], P1.M[ k ], r.cul );
		tri( P1.M[ k ], P1.B[ nx( k ) ], r.cul );
	}
	// The polished girdle band.
	for ( let j = 0; j < G; j ++ ) {
		const j1 = ( j + 1 ) % G;
		tri( r.gTop[ j ], r.gBot[ j ], r.gBot[ j1 ] );
		tri( r.gTop[ j ], r.gBot[ j1 ], r.gTop[ j1 ] );
	}
	return out;
}

const facesOf = ( name ) => faces( SHAPES[ name ].step ? stepRings() : brilliantRings( SHAPES[ name ].outline ) );

/**
 * A brilliant at rest, as few triangles as its facets need (the shared layout splits some of
 * them): what the rays inside a stone that is not changing shape are traced against.
 */
function restFaces( r ) {
	const out = [];
	const tri = ( a, b, c ) => out.push( a, b, c );
	const T = r.C[ 0 ].B;
	const S = r.C[ 1 ].M;
	const L = r.P[ 0 ].M;
	for ( let k = 0; k < N; k ++ ) {
		const k1 = ( k + 1 ) % N;
		const km = ( k + N - 1 ) % N;
		const j0 = k * 2 * SUB;
		tri( r.tc, T[ k ], T[ k1 ] );
		tri( T[ k ], T[ k1 ], S[ k ] );
		tri( T[ k ], S[ k ], r.gTop[ j0 ] );
		tri( T[ k ], r.gTop[ j0 ], S[ km ] );
		for ( let s = 0; s < 2 * SUB; s ++ ) {
			tri( S[ k ], r.gTop[ ( j0 + s ) % G ], r.gTop[ ( j0 + s + 1 ) % G ] );
			tri( L[ k ], r.gBot[ ( j0 + s ) % G ], r.gBot[ ( j0 + s + 1 ) % G ] );
		}
		tri( r.gBot[ j0 ], L[ k ], r.cul );
		tri( r.gBot[ j0 ], r.cul, L[ km ] );
	}
	for ( let j = 0; j < G; j ++ ) {
		const j1 = ( j + 1 ) % G;
		tri( r.gTop[ j ], r.gBot[ j ], r.gBot[ j1 ] );
		tri( r.gTop[ j ], r.gBot[ j1 ], r.gTop[ j1 ] );
	}
	return out;
}

/** Triangles wound outwards from the middle of a convex stone, dropping any with no area. */
function wound( f ) {
	let lo = Infinity;
	let hi = - Infinity;
	for ( const p of f ) {
		lo = Math.min( lo, p[ 1 ] );
		hi = Math.max( hi, p[ 1 ] );
	}
	const mid = ( lo + hi ) / 2;
	const out = [];
	const ab = new THREE.Vector3();
	const ac = new THREE.Vector3();
	const n = new THREE.Vector3();
	for ( let t = 0; t < f.length / 3; t ++ ) {
		const [ a, b, d ] = [ f[ t * 3 ], f[ t * 3 + 1 ], f[ t * 3 + 2 ] ];
		ab.set( b[ 0 ] - a[ 0 ], b[ 1 ] - a[ 1 ], b[ 2 ] - a[ 2 ] );
		ac.set( d[ 0 ] - a[ 0 ], d[ 1 ] - a[ 1 ], d[ 2 ] - a[ 2 ] );
		n.crossVectors( ab, ac );
		if ( n.lengthSq() < 1e-14 ) {
			continue;
		}
		const cx = ( a[ 0 ] + b[ 0 ] + d[ 0 ] ) / 3;
		const cy = ( a[ 1 ] + b[ 1 ] + d[ 1 ] ) / 3 - mid;
		const cz = ( a[ 2 ] + b[ 2 ] + d[ 2 ] ) / 3;
		out.push( ...( n.x * cx + n.y * cy + n.z * cz < 0 ? [ a, d, b ] : [ a, b, d ] ) );
	}
	return new Float32Array( out.flat() );
}

const restCache = {};
/** A shape at rest: the fewest triangles that make it (for tracing rays, not for morphing). */
export function restPositions( name ) {
	if ( ! restCache[ name ] ) {
		const sh = SHAPES[ name ];
		restCache[ name ] = wound( sh.step ? faces( stepRings() ) : restFaces( brilliantRings( sh.outline ) ) );
	}
	return restCache[ name ];
}

/**
 * Winding, per triangle and the same for every shape (so a morph never turns a face inside
 * out): outwards from the stone's middle, learned from whichever shape gives the triangle the
 * most area (some faces only open up on the step cut).
 */
const flips = [];
{
	const ab = new THREE.Vector3();
	const ac = new THREE.Vector3();
	const n = new THREE.Vector3();
	const c = new THREE.Vector3();
	const best = [];
	for ( const name of Object.keys( SHAPES ) ) {
		const f = facesOf( name );
		let lo = Infinity;
		let hi = - Infinity;
		for ( const p of f ) {
			lo = Math.min( lo, p[ 1 ] );
			hi = Math.max( hi, p[ 1 ] );
		}
		const mid = ( lo + hi ) / 2;
		for ( let t = 0; t < f.length / 3; t ++ ) {
			const [ a, b, d ] = [ f[ t * 3 ], f[ t * 3 + 1 ], f[ t * 3 + 2 ] ];
			ab.set( b[ 0 ] - a[ 0 ], b[ 1 ] - a[ 1 ], b[ 2 ] - a[ 2 ] );
			ac.set( d[ 0 ] - a[ 0 ], d[ 1 ] - a[ 1 ], d[ 2 ] - a[ 2 ] );
			n.crossVectors( ab, ac );
			const area = n.length();
			if ( area > ( best[ t ] || 1e-9 ) ) {
				best[ t ] = area;
				c.set( ( a[ 0 ] + b[ 0 ] + d[ 0 ] ) / 3, ( a[ 1 ] + b[ 1 ] + d[ 1 ] ) / 3 - mid, ( a[ 2 ] + b[ 2 ] + d[ 2 ] ) / 3 );
				flips[ t ] = n.dot( c ) < 0;
			}
		}
	}
}

/** Positions (non-indexed) for a shape, wound outwards. */
function cutPositions( name ) {
	const f = facesOf( name );
	const pos = new Float32Array( f.length * 3 );
	for ( let t = 0; t < f.length / 3; t ++ ) {
		let [ a, b, d ] = [ f[ t * 3 ], f[ t * 3 + 1 ], f[ t * 3 + 2 ] ];
		if ( flips[ t ] ) {
			[ b, d ] = [ d, b ];
		}
		pos.set( a, t * 9 );
		pos.set( b, t * 9 + 3 );
		pos.set( d, t * 9 + 6 );
	}
	return pos;
}

const cache = {};
export function shapePositions( name ) {
	if ( ! cache[ name ] ) {
		cache[ name ] = cutPositions( name );
	}
	return cache[ name ];
}

/** The two shapes either side of morph value m, and how far between them. */
export function pair( m ) {
	const n = SHAPE_ORDER.length;
	const mm = ( ( m % n ) + n ) % n;
	const i = Math.floor( mm );
	return [ SHAPES[ SHAPE_ORDER[ i ] ], SHAPES[ SHAPE_ORDER[ ( i + 1 ) % n ] ], mm - i, SHAPE_ORDER[ i ], SHAPE_ORDER[ ( i + 1 ) % n ] ];
}

/**
 * Blend along SHAPE_ORDER: m = 0 round, 1 emerald, 2 pear, 3 oval (4 would be round again).
 * Writes into out.
 */
export function morphPositions( m, out ) {
	const [ , , t, an, bn ] = pair( m );
	const a = shapePositions( an );
	const b = shapePositions( bn );
	for ( let k = 0; k < out.length; k ++ ) {
		out[ k ] = a[ k ] + ( b[ k ] - a[ k ] ) * t;
	}
	return out;
}

/** The girdle outline point (x, z) for a morph value, at parameter a. */
export function outlineAt( m, a ) {
	const [ A, B, t ] = pair( m );
	const p = A.outline( a );
	const q = B.outline( a );
	return [ p[ 0 ] + ( q[ 0 ] - p[ 0 ] ) * t, p[ 1 ] + ( q[ 1 ] - p[ 1 ] ) * t ];
}

/** The pavilion's surface (x, z) at height y, parameter a: where the setting hugs the stone. */
export function surfaceAt( m, a, y ) {
	const [ A, B, t ] = pair( m );
	const p = A.surface( a, y );
	const q = B.surface( a, y );
	return [ p[ 0 ] + ( q[ 0 ] - p[ 0 ] ) * t, p[ 1 ] + ( q[ 1 ] - p[ 1 ] ) * t ];
}

/** A small round stone (pave, hidden halo): the same cut, as few triangles as it needs. */
export function smallStoneGeometry() {
	const g = new THREE.BufferGeometry();
	g.setAttribute( 'position', new THREE.BufferAttribute( restPositions( 'round' ).slice(), 3 ) );
	g.computeVertexNormals();
	return g;
}
