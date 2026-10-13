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

/** Rungs, best first: [quality level, resolution scale]. */
export const LADDER = [ [ 'high', 1 ], [ 'medium', 1 ], [ 'medium', 0.8 ], [ 'low', 1 ], [ 'low', 0.8 ], [ 'low', 0.65 ], [ 'lite', 0.65 ], [ 'lite', 0.5 ] ];

/** Rough cost of a pixel on each level, relative to the best: a guess at how far down to go. */
const COST = { high: 1, medium: 0.4, low: 0.22, lite: 0.13 };

/** Milliseconds allowed for the heaviest frame: about 38 a second there, more everywhere else. */
export const TARGET = 26;

export function rungIndex( r ) {
	return Math.max( 0, LADDER.findIndex( ( x ) => x[ 0 ] === r[ 0 ] && x[ 1 ] === r[ 1 ] ) );
}

function predict( ms, from, to ) {
	return ms * ( COST[ to[ 0 ] ] / COST[ from[ 0 ] ] ) * Math.pow( to[ 1 ] / from[ 1 ], 2 );
}

const KEY = 'wk-film-fit';

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
 * the heaviest frame takes there. Resolves to the rung to play at, or null when even the
 * lightest rung would stutter (show the still pictures instead).
 */
export async function settle( rung, apply, bench, target = TARGET ) {
	let ms = await bench();
	// A strong chip that started in the middle: try the best level.
	if ( rung[ 0 ] === 'medium' && rung[ 1 ] === 1 && predict( ms, rung, LADDER[ 0 ] ) <= target * 0.8 ) {
		await apply( LADDER[ 0 ] );
		if ( ( await bench() ) <= target ) {
			return LADDER[ 0 ];
		}
		await apply( rung );
	}
	for ( let tries = 0; ms > target && tries < 4; tries ++ ) {
		const i = rungIndex( rung );
		if ( i >= LADDER.length - 1 ) {
			break;
		}
		// Hopeless even on the lightest rung: don't keep the visitor waiting on more tries.
		if ( predict( ms, rung, LADDER[ LADDER.length - 1 ] ) > target * 2.2 ) {
			return null;
		}
		// Straight to the first rung that should fit.
		let j = i + 1;
		while ( j < LADDER.length - 1 && predict( ms, rung, LADDER[ j ] ) > target ) {
			j ++;
		}
		rung = LADDER[ j ];
		await apply( rung );
		ms = await bench();
	}
	return ms <= target * 1.6 ? rung : null;
}

/**
 * Watches the frame rate while the film plays: tick( now ) once per drawn frame. Returns
 * 'down' when the film should drop a rung. Slow frames count however slow they are (a film
 * crawling at two frames a second must step down too); call reset() after a change, when
 * the film comes back on screen, or when the tab comes back, so those pauses don't count.
 */
export function createGovernor() {
	let last = 0;
	let acc = 0;
	let n = 0;
	let wait = 12;
	let since = 0;
	let strikes = 0;
	return {
		reset( frames = 12 ) {
			last = 0;
			acc = 0;
			n = 0;
			wait = frames;
			since = 0;
			strikes = 0;
		},
		tick( now ) {
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
			if ( avg <= 38 ) {
				strikes = 0;
				return '';
			}
			strikes ++;
			return avg > 70 || strikes >= 2 ? 'down' : '';
		},
	};
}
