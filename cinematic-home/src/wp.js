import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { createEngine, defaults, TIERS } from './engine.js';
import { ACTS, WORDS, SHAPE_AT, METAL_AT, filmState, addStory, pickTier, canRender3D } from './story.js';
import { AO_LIB } from './ao-lib.js';

/**
 * The film inside a WordPress page (Wulf Elementor Kit, "Cinematic film"
 * widget). The page can hold up to three acts of the film between its
 * other sections; each act scrubs its own part of one story timeline as it
 * scrolls past. One WebGL canvas moves into whichever act is on screen and
 * nothing renders while none is, so the rest of the page costs nothing.
 *
 * Each act shows a still picture of its first frame until the 3D is ready
 * (and keeps it where 3D cannot run), so the page never waits on the 3D.
 */
gsap.registerPlugin( ScrollTrigger, SplitText );

const q = new URLSearchParams( location.search );
const CAPTURE = q.has( 'capture' );
const REDUCED = ! CAPTURE && matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
const $ = ( s, el = document ) => el.querySelector( s );
const $$ = ( s, el = document ) => [ ...el.querySelectorAll( s ) ];
const root = document.documentElement;
// Where the contact-shadow add-on lives (printed by the kit next to this script).
const AO_URL = ( window.wkFilm && window.wkFilm.ao ) || '';

function editing() {
	return document.body.classList.contains( 'elementor-editor-active' ) || !! ( window.elementorFrontend && window.elementorFrontend.isEditMode && window.elementorFrontend.isEditMode() );
}

/** The sticky site header's height, so the film's stage sits just under it. */
function headerOffset() {
	const host = $( '.wk-sticky' );
	const hd = host && $( '.hd', host );
	if ( ! hd ) {
		return 0;
	}
	const bar = parseFloat( getComputedStyle( root ).getPropertyValue( '--wp-admin--admin-bar--height' ) ) || 0;
	return hd.offsetHeight + bar;
}

/** Wait until the browser has a quiet moment (or at most `ms`). */
function idle( ms ) {
	return new Promise( ( r ) => ( window.requestIdleCallback ? requestIdleCallback( () => r(), { timeout: ms } ) : setTimeout( r, 1 ) ) );
}

async function boot() {
	const acts = $$( '.wk-film .film-act' );
	if ( ! acts.length || root.classList.contains( 'film-on' ) ) {
		return;
	}
	if ( editing() ) {
		root.classList.add( 'film-editor' );
		return;
	}
	root.classList.add( 'film-on' );
	if ( CAPTURE ) {
		root.classList.add( 'film-capture' );
	}
	// The stage sticks under the site header. On the first screen it starts lower (an
	// announcement bar, or a header that scrolls away), so the opening words are lifted to match.
	// The header can settle after this script runs (the kit makes it sticky once the page is
	// ready), so this is measured again then; returns whether anything changed.
	let measured = '';
	const setTop = () => {
		const top = headerOffset();
		const first = acts.find( ( a ) => a.dataset.act === 'opening' );
		const lift = first ? Math.max( 0, Math.round( first.getBoundingClientRect().top + scrollY - top ) ) : 0;
		const key = top + '|' + Math.round( Math.min( lift, innerHeight * 0.3 ) );
		if ( key === measured ) {
			return false;
		}
		measured = key;
		root.style.setProperty( '--film-top', top + 'px' );
		root.style.setProperty( '--film-lift', key.split( '|' )[ 1 ] + 'px' );
		return true;
	};
	setTop();

	const use3D = canRender3D( q.has( 'no3d' ) );
	if ( ! use3D ) {
		root.classList.add( 'film-no3d' );
	}
	if ( document.fonts && document.fonts.ready ) {
		await Promise.race( [ document.fonts.ready, new Promise( ( r ) => setTimeout( r, 2500 ) ) ] );
	}
	setTop();

	/* ---------- One story timeline: the 3D state, plus every act's words ---------- */
	const F = filmState();
	const tl = addStory( gsap.timeline( { paused: true, defaults: { ease: 'power2.inOut' } } ), F );
	const opening = acts.find( ( a ) => a.dataset.act === 'opening' );
	$$( '.film-chap' ).forEach( ( el ) => {
		const i = Number( el.dataset.chapter );
		const w = WORDS[ i ];
		if ( ! w ) {
			return;
		}
		// The opening words are on screen from the start (they rise in with CSS); scrolling takes them away.
		if ( i === 0 ) {
			tl.to( el, { autoAlpha: 0, y: - 40, duration: 0.45, ease: 'power2.in' }, w.out );
			return;
		}
		const h = $( '[data-split]', el );
		const lines = h ? SplitText.create( h, { type: 'lines', mask: 'lines', linesClass: 'film-line' } ).lines : [];
		const rest = $$( ':scope > :not([data-split])', el );
		tl.set( el, { autoAlpha: 1 }, w.in );
		if ( lines.length ) {
			tl.from( lines, { yPercent: 115, stagger: 0.07, duration: 0.55, ease: 'power3.out' }, w.in );
		}
		tl.from( rest, { opacity: 0, y: 18, stagger: 0.06, duration: 0.5, ease: 'power2.out' }, w.in + 0.12 );
		if ( w.out ) {
			tl.to( el, { autoAlpha: 0, y: - 30, duration: 0.45, ease: 'power2.in' }, w.out );
		}
	} );
	$$( '.film-cue' ).forEach( ( el ) => tl.to( el, { opacity: 0, duration: 0.2 }, 0.1 ) );
	$$( '.film-year' ).forEach( ( el ) => tl.fromTo( el, { opacity: 0, yPercent: 8 }, { opacity: 1, yPercent: 0, duration: 1.2, ease: 'power2.out' }, 15.3 ) );
	// The words sit left, then right for the metal and the details, then left: the scrim follows.
	$$( '.film-scrim.l' ).forEach( ( el ) => {
		tl.to( el, { opacity: 0, duration: 0.6 }, 8.7 );
		tl.to( el, { opacity: 1, duration: 0.6 }, 15 );
	} );
	$$( '.film-scrim.r' ).forEach( ( el ) => {
		tl.to( el, { opacity: 1, duration: 0.6 }, 8.9 );
		tl.to( el, { opacity: 0, duration: 0.6 }, 14.8 );
	} );

	// Chips (shapes, metals) follow the film, and a tap jumps to that moment.
	const shapes = $$( '[data-film-shape]' );
	const metals = $$( '[data-film-metal]' );
	let lastKey = '';
	tl.eventCallback( 'onUpdate', () => {
		const s = Math.round( F.morph ) % 4;
		const m = Math.round( F.metal );
		const key = s + '|' + m;
		if ( key !== lastKey ) {
			lastKey = key;
			shapes.forEach( ( b ) => b.setAttribute( 'aria-pressed', String( Number( b.dataset.filmShape ) === s ) ) );
			metals.forEach( ( b ) => b.setAttribute( 'aria-pressed', String( Number( b.dataset.filmMetal ) === m ) ) );
		}
	} );
	// A moment picked with a chip. With reduced motion the film only shows still frames, so the
	// picked moment is held while the page stays where the chip took it.
	let picked = null;
	const scrollToTime = ( act, t ) => {
		const [ t0, t1 ] = ACTS[ act.dataset.act ];
		const top = act.getBoundingClientRect().top + scrollY - headerOffset();
		const run = act.offsetHeight - $( '.film-stage', act ).offsetHeight;
		const y = Math.round( top + ( ( t - t0 ) / ( t1 - t0 ) ) * run );
		picked = REDUCED ? { y, t } : null;
		window.scrollTo( { top: y, behavior: REDUCED ? 'auto' : 'smooth' } );
		if ( picked ) {
			goTo( t );
		}
	};
	shapes.forEach( ( b ) => b.addEventListener( 'click', () => scrollToTime( b.closest( '.film-act' ), SHAPE_AT[ Number( b.dataset.filmShape ) ] ) ) );
	metals.forEach( ( b ) => b.addEventListener( 'click', () => scrollToTime( b.closest( '.film-act' ), METAL_AT[ Number( b.dataset.filmMetal ) ] ) ) );

	/* ---------- Scroll: each act drives its part of the story ---------- */
	const goTo = ( t ) => {
		if ( CAPTURE || REDUCED ) {
			gsap.killTweensOf( tl );
			tl.time( t );
		} else {
			gsap.to( tl, { time: t, duration: 0.5, ease: 'power3.out', overwrite: true } );
		}
	};
	const timeFor = ( act, progress ) => {
		const [ t0, t1 ] = ACTS[ act.dataset.act ] || ACTS.opening;
		if ( picked && Math.abs( scrollY - picked.y ) < 3 ) {
			return picked.t;
		}
		picked = null;
		if ( REDUCED ) {
			// No scrubbing: each chapter appears composed and still.
			const holds = WORDS.filter( ( w ) => w.hold >= t0 && w.hold <= t1 ).map( ( w ) => w.hold );
			return holds[ Math.min( holds.length - 1, Math.floor( progress * holds.length ) ) ] ?? t0;
		}
		return t0 + progress * ( t1 - t0 );
	};
	const triggers = acts.map( ( act ) => ScrollTrigger.create( {
		trigger: act,
		// The stage sticks just under the site header, so the act starts there.
		start: () => 'top top+=' + headerOffset(),
		end: 'bottom bottom',
		invalidateOnRefresh: true,
		onUpdate: ( self ) => {
			goTo( timeFor( act, self.progress ) );
			const bar = $( '.film-bar', act );
			if ( bar ) {
				bar.style.transform = `scaleX(${ self.progress.toFixed( 4 ) })`;
			}
		},
	} ) );
	ScrollTrigger.config( { ignoreMobileResize: true } );
	const retop = () => {
		if ( setTop() ) {
			ScrollTrigger.refresh();
		}
	};
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', () => setTimeout( retop, 0 ) );
	}
	addEventListener( 'load', retop );
	// Start where the page is (a reload can land mid-page): the act on screen, else the last one passed.
	{
		let i = acts.findIndex( ( a ) => a.getBoundingClientRect().bottom > 0 && a.getBoundingClientRect().top < innerHeight );
		if ( i < 0 ) {
			i = acts.reduce( ( k, a, j ) => ( a.getBoundingClientRect().bottom <= 0 ? j : k ), - 1 );
		}
		gsap.killTweensOf( tl );
		tl.time( i < 0 ? 0 : timeFor( acts[ i ], triggers[ i ].progress ) );
	}

	/* ---------- The 3D ---------- */
	let engine = null;
	let ready = false;
	const canvas = document.createElement( 'canvas' );
	canvas.className = 'film-canvas';
	canvas.setAttribute( 'aria-hidden', 'true' );
	const fallBack = () => {
		engine = null;
		ready = false;
		acts.forEach( ( a ) => a.classList.remove( 'is-live' ) );
		root.classList.add( 'film-no3d' );
	};
	canvas.addEventListener( 'webglcontextlost', ( e ) => {
		e.preventDefault();
		fallBack();
	} );

	let dprCap = 1;
	const resize = () => {
		if ( ! engine ) {
			return;
		}
		const w = canvas.clientWidth || innerWidth;
		const h = canvas.clientHeight || innerHeight;
		// The best tier renders above screen resolution on 1x screens (cleaner, sharper detail).
		let dpr = Math.min( Math.max( devicePixelRatio || 1, engine.tier.supersample || 1 ), engine.tier.dpr ) * dprCap;
		// Keep the pixel count sane on very large screens.
		const budget = engine.tier.name === 'high' ? 4.2e6 : 2.6e6;
		if ( w * h * dpr * dpr > budget ) {
			dpr = Math.sqrt( budget / ( w * h ) );
		}
		engine.resize( w, h, Math.max( 0.6, dpr ) );
	};

	// The opening's still picture lights up as the page appears (CSS). If the 3D
	// arrives while that is still happening, it takes over at the same brightness.
	const intro = { e: 1 };
	let introDone = false;
	const matchPosterLight = () => {
		introDone = true;
		const img = opening && $( '.film-poster img', opening );
		const run = img && img.getAnimations ? img.getAnimations().find( ( a ) => a.playState === 'running' ) : null;
		if ( ! run ) {
			return;
		}
		const m = /brightness\(([\d.]+)\)/.exec( getComputedStyle( img ).filter );
		const b = m ? Math.min( 1, Number( m[ 1 ] ) ) : 1;
		const left = ( run.effect.getComputedTiming().endTime - run.currentTime ) / 1000;
		intro.e = Math.pow( b, 2.2 );
		gsap.to( intro, { e: 1, duration: Math.max( 0.3, left ), ease: 'power2.out' } );
	};

	/* ---------- Which act is on screen; render only there ---------- */
	let active = null;
	let holder = null;
	let needs = true;
	const R = defaults();
	const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
	if ( ! CAPTURE && ! REDUCED && matchMedia( '(pointer: fine)' ).matches ) {
		addEventListener( 'pointermove', ( e ) => {
			pointer.x = ( e.clientX / innerWidth ) * 2 - 1;
			pointer.y = ( e.clientY / innerHeight ) * 2 - 1;
		}, { passive: true } );
	}
	const where = () => {
		let best = null;
		let seen = 0;
		for ( const a of acts ) {
			const r = a.getBoundingClientRect();
			const vis = Math.min( innerHeight, r.bottom ) - Math.max( 0, r.top );
			if ( vis > seen ) {
				seen = vis;
				best = a;
			}
		}
		if ( best !== active ) {
			active = best;
			needs = true;
			root.classList.toggle( 'film-playing', !! active );
		}
		// The canvas moves into the act on screen; the act it leaves shows its picture again.
		if ( engine && active && holder !== active ) {
			if ( holder ) {
				holder.classList.remove( 'is-live' );
			}
			holder = active;
			const stage = $( '.film-stage', active );
			stage.insertBefore( canvas, stage.firstChild );
			resize();
			needs = true;
		}
	};

	let lastNow = 0;
	let acc = 0;
	let count = 0;
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
		}
		resize();
	};

	// The film's own clock starts at 0 on its first frame, like the still pictures, so the
	// hand-over from picture to 3D is exact.
	let clock0 = null;
	const draw = ( time ) => {
		if ( ! engine || ! ready || ! active ) {
			return;
		}
		if ( clock0 === null ) {
			clock0 = time;
		}
		time -= clock0;
		if ( ! introDone && active === opening && ! CAPTURE ) {
			matchPosterLight();
		}
		const S = Object.assign( R, F );
		S.exposure = F.exposure * intro.e;
		if ( ! CAPTURE ) {
			pointer.sx += ( pointer.x - pointer.sx ) * 0.05;
			pointer.sy += ( pointer.y - pointer.sy ) * 0.035;
			S.az += pointer.sx * 0.06;
			S.el += pointer.sy * 0.035;
		}
		engine.render( S, REDUCED ? 0 : time );
		active.classList.add( 'is-live' );
	};

	let rt = 0;
	addEventListener( 'resize', () => {
		clearTimeout( rt );
		rt = setTimeout( () => {
			retop();
			resize();
			needs = true;
		}, 120 );
	} );

	// Build the 3D once the page has settled; the pictures cover the wait.
	const start = async () => {
		if ( ! use3D ) {
			return;
		}
		if ( ! CAPTURE ) {
			await idle( 600 );
		}
		try {
			engine = createEngine( canvas, { tier: pickTier( q.get( 'tier' ) ), preserve: CAPTURE } );
		} catch ( e ) {
			fallBack();
			return;
		}
		where();
		resize();
		try {
			await engine.warm();
		} catch ( e ) {
			// Compiling in the background is only a nicety; the first frame compiles anyway.
		}
		if ( engine ) {
			ready = true;
			needs = true;
			loadAO();
		}
	};
	// Contact shadows (best tier only) come as a small add-on once the film is running.
	const loadAO = () => {
		if ( ! AO_URL || ! engine.tier.ao ) {
			return;
		}
		window.__wulfFilmLib = AO_LIB;
		const s = document.createElement( 'script' );
		s.src = AO_URL;
		s.async = true;
		s.onload = () => {
			if ( engine && engine.tier.ao && window.WulfFilmAO ) {
				engine.useAO( window.WulfFilmAO );
				needs = true;
			}
		};
		document.head.appendChild( s );
	};
	const started = start();

	if ( ! CAPTURE ) {
		let lastT = - 1;
		gsap.ticker.add( ( time ) => {
			where();
			if ( ! engine || ! ready || ! active ) {
				lastNow = 0;
				return;
			}
			const moving = tl.time() !== lastT || intro.e < 1;
			lastT = tl.time();
			if ( REDUCED && ! moving && ! needs ) {
				return;
			}
			needs = false;
			draw( time );
			if ( ! REDUCED ) {
				govern( performance.now() );
			}
		} );
	}

	/* ---------- Capture: exact frames for the still pictures and checks ---------- */
	window.__film = {
		started,
		live: () => !! ( engine && ready ),
		tier: () => engine && engine.tier.name,
		/** Force a quality level, as the governor would (for checks). */
		setTier( name ) {
			if ( engine && TIERS[ name ] ) {
				engine.setTier( TIERS[ name ] );
				resize();
			}
		},
		height: () => root.scrollHeight - innerHeight,
		top: ( sel ) => $( sel ).getBoundingClientRect().top + scrollY,
		/** Scroll to y and draw that frame now; reports the act and the film time. */
		frame( y, time = 0 ) {
			window.scrollTo( 0, y );
			ScrollTrigger.update();
			where();
			draw( time );
			return { act: active && active.dataset.act, t: tl.time(), tier: engine && engine.tier.name };
		},
		/** Draw the film at time t in the act on screen (for the act pictures). */
		at( t, time = 0 ) {
			gsap.killTweensOf( tl );
			tl.time( t );
			where();
			clock0 = 0;
			draw( time );
			return { act: active && active.dataset.act, t: tl.time() };
		},
		/** Contact shadows loaded (best tier). */
		ao: () => !! window.WulfFilmAO,
	};
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', boot );
} else {
	boot();
}
