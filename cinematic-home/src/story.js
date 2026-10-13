import { defaults, TIERS } from './engine.js';

/**
 * The film's story on its own clock (0 to 18): what the camera, the ring
 * and the light do in each chapter. Shared by the stand-alone page and the
 * WordPress widget, which each add their own words on top.
 */
export const CHAPTERS = [ 0, 1.4, 4.6, 8.6, 11.8, 15 ];
export const LENGTH = 18;

/** The three acts the WordPress page splits the film into: [start, end] on the film's clock. */
export const ACTS = {
	opening: [ 0, 4.6 ], // first light, then the setting builds itself
	shapes: [ 4.6, 11.8 ], // the shape, then the metal
	details: [ 11.8, 18 ], // the hidden details, then since 1971
};

/** When each chapter's words come and go (film clock); a held frame for reduced motion. */
export const WORDS = [
	{ in: - 1, out: 0.5, hold: 0.01 },
	{ in: 2.0, out: 4.3, hold: 4.4 },
	{ in: 5.2, out: 8.4, hold: 5.9 },
	{ in: 9.55, out: 11.5, hold: 11.6 },
	{ in: 12.75, out: 14.8, hold: 14.8 },
	{ in: 15.6, out: 0, hold: 17.9 },
];

/** Shapes and metals on the clock, for the clickable chips (where each one is fully shown). */
export const SHAPE_AT = [ 5.55, 6.4, 7.3, 8.2 ];
export const METAL_AT = [ 9.3, 10.4, 11.4 ];

/** The film's state at the start, before any scrolling. */
export function filmState() {
	return Object.assign( defaults(), {
		// shiftY (tall screens only) keeps the stone high, clear of the opening words.
		tx: 0, ty: 2.2, tz: 0, dist: 3.4, az: 0.55, el: 0.3, fov: 24,
		shift: 0.33, shiftY: 0.6, wobble: 1, shimmer: 1, bg: 0,
	} );
}

/** Add the 3D story to a paused GSAP timeline that animates state F. */
export function addStory( tl, F ) {
	const to = ( t, vars, duration, ease ) => tl.to( F, { ...vars, duration, ease }, t );

	// 1 · First light: the stone alone; a slow push in while the light sweeps.
	to( 0, { dist: 3.0, az: 0.95, env: 0.9 }, 1.4, 'none' );

	// 2 · The setting: pull back while the band draws itself up to the stone.
	to( 1.4, { tx: 0, ty: 0.85, dist: 11, el: 0.16, az: 0.42, shift: 0.3, shiftY: 0.24, wobble: 0.5 }, 2.0 );
	to( 1.7, { band: 1 }, 1.8 );
	to( 3.3, { prongs: 1 }, 1.0, 'power2.out' );
	to( 3.4, { dist: 10.2, ty: 0.75, az: 0.3, env: 1.6 }, 1.2, 'power1.inOut' );

	// 3 · The shape: straight down onto the table, then morph through the shapes.
	to( 4.6, { ty: 2.2, dist: 4.4, el: 1.42, az: 0, shift: 0.3, shiftY: 0.27, wobble: 0, spin: 0, dof: 0.55 }, 1.0 );
	to( 5.7, { morph: 1 }, 0.55 );
	to( 6.6, { morph: 2 }, 0.55 );
	to( 7.5, { morph: 3 }, 0.55 );
	to( 8.35, { morph: 4 }, 0.45 );

	// 4 · The metal: low three-quarter view; each change rides a sweep of light.
	to( 8.6, { ty: 0.7, dist: 9.4, el: 0.06, az: 0.95, shift: - 0.3, shiftY: 0.4, wobble: 0.3, dof: 0 }, 1.1 );
	to( 8.6, { spin: 0.7 }, 3.2, 'none' );
	to( 9.6, { metal: 1, env: 2.9 }, 0.7 );
	to( 10.6, { metal: 2, env: 4.3 }, 0.7 );

	// 5 · The details: low and close under the stone, then along the shoulder.
	to( 11.8, { tx: 0, ty: 2.06, dist: 2.7, el: - 0.04, az: 0.3, fov: 22, shift: - 0.28, shiftY: 0.24, wobble: 0.15, spin: 0, dof: 1 }, 1.0 );
	to( 12.5, { halo: 1 }, 1.0, 'none' );
	to( 13.5, { tx: 0.7, ty: 1.25, dist: 3.7, el: 0.36, az: 0.35, shift: - 0.42 }, 1.2 );
	to( 13.7, { pave: 1 }, 1.0, 'none' );

	// 6 · Since 1971: the ring steps back into warm light.
	to( 15, { tx: 0, ty: 0.55, dist: 12.5, el: 0.2, az: 0.85, fov: 24, shift: 0.42, shiftY: 0.3, bg: 2, exposure: 0.92, wobble: 0.6, dof: 0 }, 1.4 );
	to( 15, { spin: 1.2 }, 3.0, 'none' );
	tl.set( {}, {}, LENGTH );
	return tl;
}

/** Which quality level to start at for this device (the governor can still step down). */
export function pickTier( forced ) {
	if ( forced && TIERS[ forced ] ) {
		return TIERS[ forced ];
	}
	const coarse = matchMedia( '(pointer: coarse)' ).matches;
	const small = Math.min( screen.width, screen.height ) < 820;
	const cores = navigator.hardwareConcurrency || 8;
	// Only Chrome reports memory; elsewhere assume a normal device and let the governor judge.
	const mem = navigator.deviceMemory || 8;
	if ( coarse && small ) {
		return mem <= 3 || cores <= 2 ? TIERS.low : TIERS.medium;
	}
	if ( cores <= 4 || mem <= 4 ) {
		return TIERS.medium;
	}
	return TIERS.high;
}

/** WebGL2 available, and the visitor has not asked to save data. */
export function canRender3D( off = false ) {
	if ( off ) {
		return false;
	}
	if ( navigator.connection && navigator.connection.saveData ) {
		return false;
	}
	try {
		const gl = document.createElement( 'canvas' ).getContext( 'webgl2' );
		if ( ! gl ) {
			return false;
		}
		// Hand the test context straight back: browsers allow only a few at a time.
		const lose = gl.getExtension( 'WEBGL_lose_context' );
		if ( lose ) {
			lose.loseContext();
		}
		return true;
	} catch ( e ) {
		return false;
	}
}
