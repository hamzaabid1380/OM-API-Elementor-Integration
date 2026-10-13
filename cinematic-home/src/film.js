import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { createEngine, defaults, TIERS } from './engine.js';

/**
 * The director. One GSAP timeline holds the whole film: camera, ring,
 * light and words. Scrolling scrubs it, so every frame is a pure function
 * of how far down the page you are (which is also what makes the capture
 * mode exact). The ring only renders while it can be seen.
 */
gsap.registerPlugin( ScrollTrigger, SplitText );

const q = new URLSearchParams( location.search );
const CAPTURE = q.has( 'capture' );
const REDUCED = ! CAPTURE && matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
const $ = ( s, el = document ) => el.querySelector( s );
const $$ = ( s, el = document ) => [ ...el.querySelectorAll( s ) ];

/* ---------- Chapters: when each one starts on the film's clock ---------- */
const CHAPTERS = [ 0, 1.4, 4.6, 8.6, 11.8, 15 ];
const LENGTH = 18;

function pickTier() {
	const forced = q.get( 'tier' );
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

function canRender3D() {
	if ( q.has( 'no3d' ) ) {
		return false;
	}
	if ( navigator.connection && navigator.connection.saveData ) {
		return false;
	}
	try {
		const c = document.createElement( 'canvas' );
		return !! c.getContext( 'webgl2' );
	} catch ( e ) {
		return false;
	}
}

/* ---------- The film's state, scrubbed by the timeline ---------- */
const F = Object.assign( defaults(), {
	tx: 0, ty: 2.2, tz: 0, dist: 3.4, az: 0.55, el: 0.3, fov: 24,
	shift: 0.33, shiftY: 0.36, wobble: 1, shimmer: 1, bg: 0,
} );

function buildTimeline() {
	const tl = gsap.timeline( { paused: true, defaults: { ease: 'power2.inOut' } } );
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
	to( 8.6, { ty: 0.7, dist: 9.4, el: 0.06, az: 0.95, shift: - 0.3, shiftY: 0.24, wobble: 0.3, dof: 0 }, 1.1 );
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

	// Words.
	const splits = new Map();
	$$( '[data-split]' ).forEach( ( h ) => {
		splits.set( h, SplitText.create( h, { type: 'lines', mask: 'lines', linesClass: 'split-line' } ) );
	} );
	const chap = ( sel, tIn, tOut ) => {
		const el = $( sel );
		const lines = splits.get( $( '[data-split]', el ) ).lines;
		const rest = $$( ':scope > :not([data-split])', el );
		tl.set( el, { opacity: 1 }, tIn );
		tl.from( lines, { yPercent: 115, stagger: 0.07, duration: 0.55, ease: 'power3.out' }, tIn );
		tl.from( rest, { opacity: 0, y: 18, stagger: 0.06, duration: 0.5, ease: 'power2.out' }, tIn + 0.12 );
		if ( tOut ) {
			tl.to( el, { opacity: 0, y: - 30, duration: 0.45, ease: 'power2.in' }, tOut );
		}
	};
	gsap.set( '.c1', { opacity: 1 } );
	tl.to( '.c1', { opacity: 0, y: - 40, duration: 0.45, ease: 'power2.in' }, 0.5 );
	tl.to( '.cue', { opacity: 0, duration: 0.2 }, 0.1 );
	chap( '.c2', 2.0, 4.3 );
	chap( '.c3', 5.2, 8.4 );
	chap( '.c4', 9.55, 11.5 );
	chap( '.c5', 12.75, 14.8 );
	chap( '.c6', 15.6, 0 );
	tl.fromTo( '.year', { opacity: 0, yPercent: 8 }, { opacity: 1, yPercent: 0, duration: 1.2, ease: 'power2.out' }, 15.3 );
	// The dark scrim follows the words: left, then right for the metal and the details, then left.
	tl.to( '.scrim.l', { opacity: 0, duration: 0.6 }, 8.7 );
	tl.to( '.scrim.r', { opacity: 1, duration: 0.6 }, 8.9 );
	tl.to( '.scrim.r', { opacity: 0, duration: 0.6 }, 14.8 );
	tl.to( '.scrim.l', { opacity: 0.8, duration: 0.6 }, 15 );

	// Keep the little lists and the chapter rail in step with the film.
	const shapes = $$( '.pick.shapes li' );
	const metals = $$( '.pick.metals li' );
	const rail = $$( '.rail li' );
	const bar = $( '.bar' );
	const mark = ( list, k ) => list.forEach( ( li, i ) => li.classList.toggle( 'on', i === k ) );
	let last = '';
	tl.eventCallback( 'onUpdate', () => {
		const t = tl.time();
		let c = 0;
		CHAPTERS.forEach( ( s, i ) => {
			if ( t >= s - 0.2 ) {
				c = i;
			}
		} );
		const key = `${ c }|${ Math.round( F.morph ) % 4 }|${ Math.round( F.metal ) }`;
		if ( key !== last ) {
			last = key;
			mark( rail, c );
			mark( shapes, Math.round( F.morph ) % 4 );
			mark( metals, Math.round( F.metal ) );
		}
		bar.style.transform = `scaleX(${ tl.progress().toFixed( 4 ) })`;
	} );
	return tl;
}

/* ---------- The ring at the visit section: a slow turntable ---------- */
const V = Object.assign( defaults(), {
	ty: 0.75, dist: 11.5, el: 0.17, az: 0.62, shift: 0.36, shiftY: 0.42,
	band: 1, prongs: 1, halo: 1, pave: 1, morph: 0, metal: 1, bg: 4, wobble: 0, shimmer: 1,
} );

/* ---------- Boot ---------- */
async function boot() {
	const canvas = $( '#film-canvas' );
	const poster = $( '#poster' );
	const hd = $( '#hd' );
	const film = $( '#film' );
	const visit = $( '#visit' );
	const lights = $$( '[data-tone="light"]' );
	const use3D = canRender3D();
	if ( ! use3D ) {
		document.documentElement.classList.add( 'no-3d' );
	}

	if ( document.fonts && document.fonts.ready ) {
		await Promise.race( [ document.fonts.ready, new Promise( ( r ) => setTimeout( r, 2500 ) ) ] );
	}
	const tl = buildTimeline();

	// The hero words arrive on load while the stone lights up; scrolling takes them away.
	const hero = $( '.c1' );
	const heroLines = SplitText.create( $( 'h1', hero ), { type: 'lines', mask: 'lines', linesClass: 'split-line' } ).lines;
	const intro = { e: 0, env: - 1.4 };
	const it = gsap.timeline( { paused: true } );
	it.to( intro, { e: 1, duration: 2.4, ease: 'power2.out' }, 0.1 );
	it.to( intro, { env: 0, duration: 3.2, ease: 'power3.out' }, 0.1 );
	it.from( $( '.eyebrow', hero ), { opacity: 0, y: 12, duration: 0.8, ease: 'power2.out' }, 0.35 );
	it.from( heroLines, { yPercent: 115, stagger: 0.09, duration: 1.1, ease: 'power3.out' }, 0.5 );
	it.from( $$( 'p, .acts', hero ), { opacity: 0, y: 16, stagger: 0.1, duration: 0.9, ease: 'power2.out' }, 0.95 );
	it.from( '.cue, .skipfilm, .rail', { opacity: 0, duration: 1 }, 1.35 );
	if ( CAPTURE || REDUCED ) {
		it.progress( 1 );
	}
	if ( CAPTURE ) {
		document.documentElement.classList.add( 'capture' );
	}

	let engine = null;
	let tier = pickTier();
	if ( use3D ) {
		try {
			engine = createEngine( canvas, { tier, preserve: CAPTURE } );
		} catch ( e ) {
			engine = null;
			document.documentElement.classList.add( 'no-3d' );
		}
	}

	let mode = 'film';
	let needs = true;
	const R = defaults();
	let dprCap = 1;
	// If the graphics driver drops the canvas (phones do when memory runs short),
	// fall back to the still picture instead of a black screen.
	canvas.addEventListener( 'webglcontextlost', ( e ) => {
		e.preventDefault();
		engine = null;
		poster.classList.remove( 'gone' );
		document.documentElement.classList.add( 'no-3d' );
	} );
	const resize = () => {
		if ( ! engine ) {
			return;
		}
		const w = canvas.clientWidth || innerWidth;
		const h = canvas.clientHeight || innerHeight;
		let dpr = Math.min( devicePixelRatio || 1, engine.tier.dpr ) * dprCap;
		// Keep the pixel count sane on very large screens.
		const budget = engine.tier.name === 'high' ? 4.2e6 : 2.6e6;
		if ( w * h * dpr * dpr > budget ) {
			dpr = Math.sqrt( budget / ( w * h ) );
		}
		engine.resize( w, h, Math.max( 0.6, dpr ) );
	};
	resize();
	let resizeTimer = 0;
	addEventListener( 'resize', () => {
		clearTimeout( resizeTimer );
		resizeTimer = setTimeout( () => {
			resize();
			needs = true;
		}, 120 );
	} );

	// Scroll: Lenis for the smooth feel (not when motion is reduced), scrub the film.
	let lenis = null;
	if ( ! CAPTURE && ! REDUCED ) {
		lenis = new Lenis( { lerp: 0.09, anchors: true, wheelMultiplier: 0.9 } );
		lenis.on( 'scroll', ScrollTrigger.update );
		gsap.ticker.add( ( time ) => lenis.raf( time * 1000 ) );
		gsap.ticker.lagSmoothing( 0 );
	}
	ScrollTrigger.config( { ignoreMobileResize: true } );
	if ( REDUCED ) {
		// No scrubbing: each chapter appears composed and still.
		ScrollTrigger.create( {
			trigger: film,
			start: 'top top',
			end: 'bottom bottom',
			onUpdate: ( self ) => {
				const t = self.progress * LENGTH;
				let c = 0;
				CHAPTERS.forEach( ( s, i ) => {
					if ( t >= s ) {
						c = i;
					}
				} );
				const hold = [ 0.01, 4.4, 5.9, 11.6, 14.8, 17.9 ][ c ];
				if ( Math.abs( tl.time() - hold ) > 0.001 ) {
					tl.time( hold );
					needs = true;
				}
			},
		} );
		F.wobble = 0;
		F.shimmer = 0;
	} else {
		ScrollTrigger.create( { trigger: film, start: 'top top', end: 'bottom bottom', animation: tl, scrub: CAPTURE ? true : 0.35 } );
	}

	// Pointer parallax on desktops.
	const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
	if ( ! CAPTURE && ! REDUCED && matchMedia( '(pointer: fine)' ).matches ) {
		addEventListener( 'pointermove', ( e ) => {
			pointer.x = ( e.clientX / innerWidth ) * 2 - 1;
			pointer.y = ( e.clientY / innerHeight ) * 2 - 1;
		}, { passive: true } );
	}

	// Which picture is on screen (if any), and the header's tone.
	const where = () => {
		const vh = innerHeight;
		const fr = film.getBoundingClientRect();
		const vr = visit.getBoundingClientRect();
		const m = fr.bottom > 0 ? 'film' : vr.top < vh && vr.bottom > 0 ? 'visit' : null;
		if ( m !== mode ) {
			mode = m;
			needs = true;
		}
		const line = hd.offsetHeight * 0.5;
		const light = lights.some( ( s ) => {
			const r = s.getBoundingClientRect();
			return r.top <= line && r.bottom >= line;
		} );
		hd.classList.toggle( 'is-light', light );
	};

	// Governor: if frames run slow, step down quietly.
	let lastNow = 0;
	let acc = 0;
	let count = 0;
	let still = false;
	const govern = ( now ) => {
		if ( lastNow ) {
			const dt = now - lastNow;
			if ( dt < 250 ) {
				acc += dt;
				count ++;
			}
		}
		lastNow = now;
		if ( count < 90 ) {
			return;
		}
		const avg = acc / count;
		acc = 0;
		count = 0;
		if ( avg < 27 ) {
			return;
		}
		if ( engine.tier.name === 'high' ) {
			engine.setTier( TIERS.medium );
		} else if ( engine.tier.name === 'medium' ) {
			engine.setTier( TIERS.low );
		} else if ( dprCap > 0.7 ) {
			dprCap = Math.max( 0.7, dprCap - 0.15 );
		} else {
			still = true; // render only when the scroll moves
		}
		resize();
	};

	let started = false;
	let lastP = - 1;
	const draw = ( time ) => {
		if ( ! engine || ! mode ) {
			return;
		}
		let S;
		if ( mode === 'film' ) {
			S = Object.assign( R, F );
			S.exposure = F.exposure * intro.e;
			S.env = F.env + intro.env;
		} else {
			S = Object.assign( R, V );
			S.spin = REDUCED ? 0.6 : time * 0.22;
		}
		if ( ! CAPTURE ) {
			pointer.sx += ( pointer.x - pointer.sx ) * 0.05;
			pointer.sy += ( pointer.y - pointer.sy ) * 0.05;
			S.az += pointer.sx * 0.06;
			S.el += pointer.sy * 0.035;
		}
		if ( REDUCED ) {
			time = 0;
		}
		engine.render( S, time );
		if ( ! started ) {
			started = true;
			poster.classList.add( 'gone' );
		}
	};

	if ( ! CAPTURE ) {
		if ( ! REDUCED ) {
			it.play();
		}
		gsap.ticker.add( ( time ) => {
			where();
			if ( ! engine || ! mode ) {
				lastNow = 0;
				return;
			}
			const p = tl.progress();
			const moving = p !== lastP || intro.e < 1 || pointer.sx !== pointer.x;
			lastP = p;
			if ( ( still || REDUCED ) && ! moving && ! needs ) {
				return;
			}
			needs = false;
			draw( time );
			if ( ! REDUCED ) {
				govern( performance.now() );
			}
		} );
	}

	/* ---------- Capture: exact frames for stills and the walkthrough video ---------- */
	window.__film = {
		ready: true,
		tier: () => engine && engine.tier.name,
		height: () => document.documentElement.scrollHeight - innerHeight,
		top: ( sel ) => $( sel ).getBoundingClientRect().top + scrollY,
		/** Seek the opening (seconds since load). */
		introAt( t ) {
			it.time( t );
		},
		frame( y, time = 0 ) {
			window.scrollTo( 0, y );
			ScrollTrigger.update();
			where();
			draw( time );
			return { mode, p: tl.progress(), tier: engine && engine.tier.name };
		},
		filmTime( t, time = 0 ) {
			const st = ScrollTrigger.getAll().find( ( s ) => s.trigger === film );
			const y = st.start + ( st.end - st.start ) * ( t / LENGTH );
			return this.frame( y, time );
		},
		cards( list, w, h ) {
			engine.resize( w, h, 1 );
			const out = list.map( ( c ) => {
				const S = Object.assign( defaults(), {
					band: 1, prongs: 1, halo: 1, pave: 1, bg: 3, wobble: 0, shimmer: 0, glint: 0,
					ty: 0.62, dist: 10.6, el: 0.2, az: 0.55, shift: 0, shiftY: 0,
				}, c );
				engine.render( S, 0 );
				return canvas.toDataURL( 'image/webp', 0.9 );
			} );
			resize();
			return out;
		},
	};
}

boot();
