import { TIERS } from './engine.js';

/**
 * Fitting the film to the device it plays on.
 *
 * The processor and memory say little about the graphics chip, so the film measures
 * instead. While the still picture is still showing, it draws its heaviest frame (the
 * stone filling the screen) a few times and settles on the best rung of the ladder this
 * device draws smoothly. While the film plays, a governor watches the frame rate: within
 * a second or two of trouble it lowers the resolution, then the quality, and if even the
 * lightest rung stutters the still pictures take over (the words keep playing). The rung
 * is remembered for the rest of the visit, so the next page starts there straight away.
 */

/**
 * Rungs, best first: [quality level, sharpness]. The sharpness is a share of the most the level draws
 * at on this screen (see dprFor): the richer levels at the screen's own sharpness (a Retina screen in
 * full), the light ones at one pixel per point at most. Not every rung suits every screen, so each
 * device gets its own ladder (ladderFor). At the bottom the film first gives up a little sharpness and
 * keeps its sparkle (lite at 42%), and only then a light path (lite2), so a modest laptop never has to
 * fall back to the still pictures.
 */
export const LADDER = [ [ 'high', 1 ], [ 'high', 0.9 ], [ 'high', 0.8 ], [ 'medium', 1 ], [ 'medium', 0.8 ], [ 'medium', 0.65 ], [ 'medium', 0.5 ], [ 'low', 1 ], [ 'low', 0.8 ], [ 'low', 0.65 ], [ 'lite', 0.65 ], [ 'lite', 0.5 ], [ 'lite', 0.42 ], [ 'lite2', 0.42 ], [ 'lite2', 0.35 ] ];

/** Rough cost of a pixel on each level, relative to the best: a guess at how far down to go. */
const COST = { high: 1, medium: 0.4, low: 0.22, lite: 0.17, lite2: 0.115 };

/** Milliseconds allowed for the heaviest frame: about 38 a second there, more everywhere else. */
export const TARGET = 26;

const screenDpr = () => ( typeof devicePixelRatio === 'number' && devicePixelRatio > 0 ? devicePixelRatio : 1 );

/**
 * Pixels drawn per point for level `t` at sharpness `scale` on a w x h stage (in points). Each level
 * has a top (`dpr`; the best one draws finer than ordinary screens, `supersample`) and a pixel budget,
 * so a very large screen stays sane; never below a third.
 */
export function dprFor( t, scale, w, h, native = screenDpr() ) {
	const top = Math.min( Math.max( native, t.supersample || 1 ), t.dpr || 1 );
	return Math.max( 0.33, Math.min( top * scale, Math.sqrt( ( t.budget || 2.6e6 ) / Math.max( 1, w * h ) ) ) );
}

/**
 * The ladder on this screen (a w x h stage, in points): the rungs worth offering, dearest first, and
 * what each costs here. On a sharp screen (a Mac's Retina) the middle level keeps going at the screen's
 * own sharpness before anything plainer is tried, so a strong chip that cannot afford everything gives
 * up effects in the close-up, not crispness. On ordinary screens the ladder is the one modest laptops
 * already play well on.
 */
export function ladderFor( w, h, native = screenDpr() ) {
	const dpr = ( r ) => dprFor( TIERS[ r[ 0 ] ], r[ 1 ], w, h, native );
	const cost = ( r ) => COST[ r[ 0 ] ] * w * h * dpr( r ) * dpr( r );
	const rank = ( r ) => Object.keys( COST ).indexOf( r[ 0 ] );
	const rungs = [];
	const offered = LADDER.filter( ( r ) => {
		// The best level at most a shade softer than the middle one: any softer, the middle one looks better.
		if ( r[ 0 ] === 'high' && r[ 1 ] < 1 ) {
			return dpr( r ) >= dpr( [ 'medium', 1 ] ) * 0.9 - 1e-6;
		}
		// The middle level's extra steps are for sharp screens, where they still draw a pixel per point.
		if ( r[ 0 ] === 'medium' && r[ 1 ] < 0.8 ) {
			return dpr( r ) >= 1 - 1e-6;
		}
		return true;
	} );
	for ( const r of offered.sort( ( a, b ) => cost( b ) - cost( a ) ) ) {
		const last = rungs[ rungs.length - 1 ];
		// Each rung clearly lighter than the one before, and never a richer level below a plainer one.
		if ( ! last || ( cost( r ) < cost( last ) * 0.97 && rank( r ) >= rank( last ) ) ) {
			rungs.push( r );
		}
	}
	return {
		rungs,
		dpr,
		cost,
		/** The rung to drop to from r: the best one that costs clearly less, or null on the lightest. */
		next( r ) {
			return rungs.find( ( x ) => cost( x ) < cost( r ) * 0.97 ) || null;
		},
	};
}

// A new key when the ladder changes, so an old "off" or rung from an earlier version is not reused.
const KEY = 'wk-film-fit-3';

/** The rung chosen earlier in this visit: [level, scale], 'off' for the still pictures, or null. */
export function recall() {
	try {
		const v = JSON.parse( sessionStorage.getItem( KEY ) || 'null' );
		return v === 'off' || ( Array.isArray( v ) && TIERS[ v[ 0 ] ] && v[ 1 ] > 0 ) ? v : null;
	} catch ( e ) {
		return null;
	}
}

export function remember( v ) {
	try {
		sessionStorage.setItem( KEY, JSON.stringify( v ) );
	} catch ( e ) {
		// Private browsing or storage turned off: the film just measures again next time.
	}
}

/**
 * Settle on a rung for this device, starting from `rung`. `apply( rung )` switches the film
 * to a rung and resolves once its shaders are ready; `bench()` resolves to the milliseconds
 * the heaviest frame takes there. `probe()`, when given, estimates that first measurement
 * from a small copy of the frame instead, so a weak chip is never handed a full-size heavy
 * frame. `ladder` is this screen's (ladderFor). Resolves to the rung to play at, or null when
 * even the lightest rung would stutter (show the still pictures instead).
 */
export async function settle( rung, apply, bench, target = TARGET, probe = null, ladder = ladderFor( 1280, 720, 1 ) ) {
	const predict = ( ms, from, to ) => ms * ( ladder.cost( to ) / ladder.cost( from ) );
	// A chip believed strong starts on a richer level. The small copy overstates what a frame costs
	// (the fixed part of every frame is counted eight times over), and on a fast chip that part is most
	// of it: so a strong chip is timed on a real frame whenever the estimate is anywhere near. A modest
	// chip only gets a full-size frame where the small copy already says it fits.
	const strong = COST[ rung[ 0 ] ] >= COST.medium;
	let ms = await ( probe || bench )();
	if ( probe && ms <= target * ( strong ? 4 : 1 ) ) {
		ms = await bench();
	}
	// Room to spare on a strong chip: try the best rung that should still fit, at most a shade less sharp.
	if ( strong && ms <= target ) {
		const from = rung;
		const up = ladder.rungs.find( ( r ) => ladder.cost( r ) > ladder.cost( from ) * 1.03 && ladder.dpr( r ) >= ladder.dpr( from ) * 0.9 - 1e-6 && predict( ms, from, r ) <= target * 0.8 );
		if ( up ) {
			await apply( up );
			if ( ( await bench() ) <= target ) {
				return up;
			}
			await apply( from );
		}
	}
	for ( let tries = 0; ms > target && tries < 4; tries ++ ) {
		const below = ladder.rungs.filter( ( r ) => ladder.cost( r ) < ladder.cost( rung ) * 0.97 );
		if ( ! below.length ) {
			break;
		}
		// Hopeless even on the lightest rung: don't keep the visitor waiting on more tries.
		const lightest = below[ below.length - 1 ];
		if ( predict( ms, rung, lightest ) > target * 2.2 ) {
			return null;
		}
		// Straight to the first rung that should fit.
		const from = rung;
		rung = below.find( ( r ) => predict( ms, from, r ) <= target ) || lightest;
		await apply( rung );
		ms = await bench();
	}
	return ms <= target * 1.6 ? rung : null;
}

/**
 * Watches the frame rate while the film plays: tick( now, floor ) once per drawn frame. Returns
 * 'down' when the film should drop a rung. Slow frames count however slow they are (a film
 * crawling at two frames a second must step down too); call reset() after a change, when
 * the film comes back on screen, or when the tab comes back, so those pauses don't count.
 * On the lightest rung (floor) dropping means the still pictures, so it is patient: it plays
 * through a slow moment such as the close-up, and gives up only when the film really crawls.
 */
export function createGovernor() {
	let last = 0;
	let acc = 0;
	let n = 0;
	let wait = 12;
	let since = 0;
	let strikes = 0;
	let judged = 0;
	return {
		/** The last judged average frame time (ms), for the check box. */
		get last() {
			return judged;
		},
		reset( frames = 12 ) {
			last = 0;
			acc = 0;
			n = 0;
			wait = frames;
			since = 0;
			strikes = 0;
		},
		tick( now, floor = false ) {
			const dt = last ? now - last : 0;
			last = now;
			if ( ! dt ) {
				return '';
			}
			// Let a change settle for a few frames, but never more than about half a second.
			since = since || now;
			if ( wait > 0 && now - since < 600 ) {
				wait --;
				return '';
			}
			wait = 0;
			acc += Math.min( dt, 1500 );
			n ++;
			// Judge every 20 frames, or after a second when they are slow.
			if ( n < 20 && acc < 1000 ) {
				return '';
			}
			const avg = acc / n;
			acc = 0;
			n = 0;
			judged = avg;
			if ( avg <= ( floor ? 55 : 38 ) ) {
				strikes = 0;
				return '';
			}
			strikes ++;
			if ( floor ) {
				return avg > 110 || strikes >= 3 ? 'down' : '';
			}
			return avg > 70 || strikes >= 2 ? 'down' : '';
		},
	};
}
