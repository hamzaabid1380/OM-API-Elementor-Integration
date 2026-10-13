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
	{ in: - 1, out: 0.3, hold: 0.01 },
	{ in: 2.2, out: 4.3, hold: 4.4 },
	{ in: 5.3, out: 8.4, hold: 5.9 },
	{ in: 9.55, out: 11.5, hold: 11.6 },
	{ in: 12.75, out: 14.8, hold: 14.8 },
	{ in: 15.7, out: 0, hold: 17.9 },
];

/** Shapes and metals on the clock, for the clickable chips (where each one is fully shown). */
export const SHAPE_AT = [ 5.55, 6.4, 7.3, 8.2 ];
export const METAL_AT = [ 9.3, 10.4, 11.4 ];

/** The film's state at the start, before any scrolling: the loose stone, face up and turning in the case's light. */
export function filmState() {
	return Object.assign( defaults(), {
		// shiftY (tall screens only) keeps the stone high, clear of the opening words.
		tx: 0, ty: 2.2, tz: 0, dist: 3.75, az: 0.55, el: 0.72, fov: 24,
		shift: 0.42, shiftY: 0.6, spin: 0.2, wobble: 0, shimmer: 0.6, bg: 0,
		mood: 1, turn: 0.2, glint: 0.8, motes: 0.6, pool: 1, bloom: 1.6,
	} );
}

/** Add the 3D story to a paused GSAP timeline that animates state F. */
export function addStory( tl, F ) {
	const to = ( t, vars, duration, ease ) => tl.to( F, { ...vars, duration, ease }, t );

	// 1 · Brilliance: the first scroll turns the stone into the light and brings it close,
	// face up, so the crown fills the frame in a cascade of flashes.
	// The words leave first; then the stone comes to the middle of the screen.
	to( 0, { el: 0.84, dist: 3.45 }, 0.6, 'power1.in' );
	to( 0, { env: 1.3 }, 1.4, 'none' );
	to( 0.55, { el: 1.1, dist: 2.6, az: 1.2, shift: 0.1, shiftY: 0.36, spin: 0.95, mood: 0.85 }, 0.85, 'power2.out' );
	to( 0.9, { glint: 1 }, 0.5, 'none' );

	// 2 · The setting: one long pull-back while the band rises under the stone, seen side on so it
	// grows like a stem; the prongs close over the stone, then the ring turns to show its circle,
	// ending at a three-quarter angle.
	to( 1.4, { el: 0.42, dist: 9.2, az: 0.85, ty: 0.85, shiftY: 0.3 }, 3.2, 'power2.inOut' );
	// The stone moves aside before the words arrive.
	to( 1.4, { shift: 0.38 }, 0.8, 'power2.inOut' );
	to( 1.4, { spin: - 0.55 }, 0.35, 'power1.inOut' );
	to( 1.4, { turn: 0, mood: 0.55, glint: 0.45, motes: 0.4, bloom: 1.25 }, 1.2 );
	to( 1.7, { band: 1 }, 1.5, 'power1.inOut' );
	to( 3.0, { prongs: 1 }, 0.95, 'power2.out' );
	to( 3.1, { spin: 0.3 }, 1.5, 'power2.inOut' );
	to( 3.2, { env: 2.1 }, 1.4, 'power1.inOut' );

	// 3 · The shape: up and over the stone, the band running up the screen, then the shapes,
	// each change riding a sweep of light.
	// (On tall screens the band runs across instead, above the words.)
	to( 4.6, { ty: 2.2, dist: 4.5, el: 1.38, az: 0, shift: 0.3, shiftY: 0.27, spin: Math.PI / 2, spinTall: - Math.PI / 2, mood: 0.8, glint: 0.6, dof: 0.55 }, 1.0 );
	to( 5.7, { morph: 1, env: 2.6 }, 0.55 );
	to( 6.6, { morph: 2, env: 3.1 }, 0.55 );
	to( 7.5, { morph: 3, env: 3.6 }, 0.55 );
	to( 8.35, { morph: 4, env: 4.0 }, 0.45 );

	// 4 · The metal: down to a low three-quarter view, the ring turning as each metal arrives on a sweep of light.
	to( 8.6, { ty: 0.8, dist: 10.8, el: 0.2, az: 1.1, shift: - 0.27, shiftY: 0.4, dof: 0, mood: 0.45, glint: 0.4 }, 1.1 );
	to( 8.6, { spin: 0.3, spinTall: 0 }, 1.1 );
	to( 9.7, { spin: 0.55 }, 2.1, 'none' );
	to( 9.6, { metal: 1, env: 5.2 }, 0.7 );
	to( 10.6, { metal: 2, env: 6.3 }, 0.7 );

	// 5 · The details: low and close under the stone, then along the shoulder.
	to( 11.8, { tx: 0, ty: 2.06, dist: 3.2, el: - 0.04, az: 0.3, fov: 22, shift: - 0.47, shiftY: 0.24, wobble: 0.15, spin: 0, dof: 1, mood: 0.6 }, 1.0 );
	to( 12.5, { halo: 1 }, 1.0, 'none' );
	to( 13.5, { tx: 0.7, ty: 1.25, dist: 3.7, el: 0.36, az: 0.35, shift: - 0.42 }, 1.2 );
	to( 13.7, { pave: 1 }, 1.0, 'none' );

	// 6 · Since 1971: the finished ring at its best angle, turning slowly in warm light.
	to( 15, { tx: 0, ty: 0.8, dist: 10.6, el: 0.34, az: 1.05, fov: 24, shift: 0.34, shiftY: 0.42, bg: 1, exposure: 0.95, wobble: 0.5, dof: 0, mood: 0.7, glint: 0.55, motes: 0.55, bloom: 1.3 }, 1.4 );
	to( 15, { spin: 0.2 }, 1.4 );
	to( 16.4, { spin: 0.7 }, 1.6, 'none' );
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
