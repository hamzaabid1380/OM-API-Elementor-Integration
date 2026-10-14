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

/** When each chapter's words come and go (film clock); a held frame for reduced motion (never mid-sweep). */
export const WORDS = [
	{ in: - 1, out: 0.3, hold: 0.01 },
	{ in: 2.2, out: 4.3, hold: 4.4 },
	{ in: 5.3, out: 8.4, hold: 6.45 },
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
		// idle: a strip of light crosses the stone every few seconds until the first scroll.
		tx: 0, ty: 2.12, tz: 0, dist: 4.3, az: 0.55, el: 0.72, fov: 24,
		shift: 0.42, shiftY: 0.6, spin: 0.2, wobble: 0, shimmer: 0.6, bg: 0,
		mood: 1, turn: 0.2, glint: 0.8, motes: 0.6, pool: 1, bloom: 1.6, idle: 4.5,
	} );
}

/** Add the 3D story to a paused GSAP timeline that animates state F. */
export function addStory( tl, F ) {
	const to = ( t, vars, duration, ease ) => tl.to( F, { ...vars, duration, ease }, t );
	// A strip of light crossing behind the camera: its reflection runs across the stone and the metal.
	const sweep = ( t, duration, gain = 4 ) => {
		tl.fromTo( F, { sweep: - 1.4 }, { sweep: 1.4, duration, ease: 'none', immediateRender: false }, t );
		tl.to( F, { sweepGain: gain, duration: 0.15, ease: 'none' }, t );
		tl.to( F, { sweepGain: 0, duration: 0.15, ease: 'none' }, t + duration - 0.15 );
	};

	// 1 · Brilliance: the first scroll turns the stone into the light and brings it close,
	// face up, so the crown fills the frame in a cascade of flashes as a light crosses it.
	// The words leave first; then the stone comes to the middle of the screen.
	to( 0, { el: 0.84, dist: 3.97, idle: 0 }, 0.6, 'power1.in' );
	to( 0, { env: 1.3 }, 1.4, 'none' );
	to( 0.55, { el: 1.1, dist: 3, az: 1.2, shift: 0.1, shiftY: 0.36, spin: 0.95, mood: 0.85 }, 0.85, 'power2.out' );
	to( 0.9, { glint: 1 }, 0.5, 'none' );
	sweep( 0.5, 0.95, 4.2 );

	// 2 · The setting: one long pull-back while the band is cast under the stone, seen side on,
	// glowing where it forms; the four claws close over the stone one after another (opposite
	// pairs, as a jeweler sets them), then the ring turns to show its circle at three-quarters.
	to( 1.4, { el: 0.42, dist: 9.2, az: 0.85, ty: 0.85, shiftY: 0.3 }, 3.2, 'power2.inOut' );
	// The stone moves aside before the words arrive.
	to( 1.4, { shift: 0.38 }, 0.8, 'power2.inOut' );
	to( 1.4, { spin: - 0.55 }, 0.35, 'power1.inOut' );
	to( 1.4, { turn: 0, mood: 0.55, glint: 0.45, motes: 0.4, bloom: 1.25 }, 1.2 );
	to( 1.6, { forge: 1 }, 0.3, 'none' );
	to( 1.7, { band: 1 }, 1.5, 'power1.inOut' );
	to( 3.0, { forge: 0 }, 0.7, 'power1.in' );
	to( 3.0, { prongs: 1 }, 1.15, 'power1.inOut' );
	to( 3.1, { spin: 0.3 }, 1.5, 'power2.inOut' );
	to( 3.2, { env: 2.1 }, 1.4, 'power1.inOut' );
	sweep( 3.75, 0.6, 3.2 );

	// 3 · The shape: up and over the stone, the band running up the screen, then the shapes Wulf
	// sets most (round, emerald, pear, oval), each change riding a sweep of light while the claws
	// slide to their new places. It stays an oval: the ring the film finishes on.
	// (On tall screens the band runs across instead, above the words.)
	to( 4.6, { ty: 2.12, dist: 5.2, el: 1.38, az: 0, shift: 0.3, shiftY: 0.27, spin: Math.PI / 2, spinTall: - Math.PI / 2, mood: 0.8, glint: 0.6 }, 1.0 );
	to( 5.7, { morph: 1, env: 2.6 }, 0.6 );
	to( 6.6, { morph: 2, env: 3.1 }, 0.6 );
	to( 7.5, { morph: 3, env: 3.6 }, 0.6 );
	sweep( 5.6, 0.8, 3.6 );
	sweep( 6.5, 0.8, 3.6 );
	sweep( 7.4, 0.8, 3.6 );

	// 4 · The metal: down to a low three-quarter view, the ring turning as each metal flows around
	// it from the head, a seam of light at its edge.
	to( 8.6, { ty: 0.8, dist: 10.8, el: 0.2, az: 1.1, shift: - 0.27, shiftY: 0.4, mood: 0.45, glint: 0.4 }, 1.1 );
	to( 8.6, { spin: 0.3, spinTall: 0 }, 1.1 );
	to( 9.7, { spin: 0.55 }, 2.1, 'none' );
	to( 9.5, { metal: 1, env: 5.2 }, 0.95, 'power1.inOut' );
	to( 10.55, { metal: 2, env: 6.3 }, 0.95, 'power1.inOut' );
	sweep( 9.55, 0.85, 2.6 );
	sweep( 10.6, 0.85, 2.6 );

	// 5 · The details: low and close under the stone while the hidden halo's stones drop into their
	// collar one by one, then along the shoulder as the pave is set from the head down.
	to( 11.8, { tx: 0, ty: 1.95, dist: 4.6, el: 0.08, az: 0.3, fov: 22, shift: - 0.47, shiftY: 0.24, wobble: 0.15, spin: 0, mood: 0.6 }, 1.0 );
	to( 12.5, { halo: 1 }, 1.0, 'none' );
	to( 13.5, { tx: 0.7, ty: 1.25, dist: 3.7, el: 0.36, az: 0.35, shift: - 0.42 }, 1.2 );
	to( 13.7, { pave: 1 }, 1.0, 'none' );
	sweep( 14.1, 0.65, 2.4 );

	// 6 · Since 1971: the finished ring (the Oval Hidden Halo with a diamond band) from above, the
	// way the catalog photographs it, turning slowly in warm light, one last light across it.
	to( 15, { tx: 0, ty: 1.0, dist: 7.7, el: 1.1, az: 0.05, fov: 24, shift: 0.4, shiftY: 0.42, bg: 1, exposure: 0.95, wobble: 0.5, mood: 0.7, glint: 0.55, motes: 0.55, bloom: 1.3 }, 1.4 );
	to( 15, { spin: - 0.62 }, 1.4 );
	to( 16.4, { spin: - 0.22 }, 1.6, 'none' );
	sweep( 16.3, 1.1, 2.6 );
	tl.set( {}, {}, LENGTH );
	return tl;
}

/**
 * The heaviest moment of the film: the stone face-up, close enough to fill the screen, with a
 * light crossing it. The film draws it a few times while the still picture is showing to choose its level.
 */
export const HEAVY = { el: 1.1, dist: 3, az: 1.2, shift: 0.1, shiftY: 0.36, spin: 0.95, mood: 0.85, glint: 1, motes: 0.6, turn: 0.2, sweep: 0, sweepGain: 5 };

/** The graphics chip as the browser names it (Chrome, Edge and Safari say; Firefox may not). */
let GPU = '';
export function gpuName() {
	return GPU;
}

/** Drawing without a graphics chip (software): the 3D would crawl, so the still pictures are kinder. */
export function softwareGPU( name = GPU ) {
	return /swiftshader|llvmpipe|softpipe|software|basic render/i.test( name );
}

/**
 * Which quality level to start at. The graphics chip matters far more than the processor:
 * built-in laptop graphics start on the light level, dedicated graphics on the best, and
 * anything else in the middle. The warm-up then measures the heaviest frame and settles
 * on the level this device really draws smoothly (see fit.js).
 */
export function pickTier( forced ) {
	if ( forced && TIERS[ forced ] ) {
		return TIERS[ forced ];
	}
	const coarse = matchMedia( '(pointer: coarse)' ).matches;
	const small = Math.min( screen.width, screen.height ) < 820;
	const cores = navigator.hardwareConcurrency || 8;
	// Only Chrome reports memory; elsewhere assume a normal device.
	const mem = navigator.deviceMemory || 8;
	const g = GPU.toLowerCase();
	if ( coarse && small ) {
		return mem <= 3 || cores <= 2 ? TIERS.low : TIERS.medium;
	}
	// Dedicated graphics (Intel's Arc cards before the built-in Intel chips).
	if ( /nvidia|geforce|quadro|rtx|radeon\s?(rx|pro)|arc\s?a\d/.test( g ) ) {
		return TIERS.high;
	}
	// Built-in graphics: Intel UHD / Iris, AMD's laptop Radeon graphics, phone and tablet chips.
	if ( /intel|iris|uhd|radeon\(tm\) graphics|radeon graphics|vega|mali|adreno|powervr/.test( g ) ) {
		return TIERS.low;
	}
	return cores <= 4 || mem <= 4 ? TIERS.low : TIERS.medium;
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
		// Firefox names the chip directly; Chrome and Safari need the debug extension for it.
		GPU = String( gl.getParameter( gl.RENDERER ) || '' );
		if ( ! GPU || /^webkit webgl$/i.test( GPU ) ) {
			const info = gl.getExtension( 'WEBGL_debug_renderer_info' );
			GPU = String( ( info && gl.getParameter( info.UNMASKED_RENDERER_WEBGL ) ) || GPU );
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
