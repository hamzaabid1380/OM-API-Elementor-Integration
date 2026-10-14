import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { createEngine, defaults, TIERS } from './engine.js';
import { ACTS, WORDS, SHAPE_AT, METAL_AT, HEAVY, filmState, addStory, pickTier, canRender3D, softwareGPU, gpuName } from './story.js';
import { TARGET, recall, remember, settle, createGovernor, dprFor, ladderFor } from './fit.js';
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
// ?tier=high|medium|low pins a level (checks); ?fit measures the device even then (?fit=ms sets the bar).
const FORCED = !! TIERS[ q.get( 'tier' ) ];
const FIT = ! CAPTURE && ( ! FORCED || q.has( 'fit' ) );
const FIT_TARGET = Number( q.get( 'fit' ) ) || TARGET;
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

	// Without a graphics chip (software drawing) the 3D would crawl: the still pictures are kinder.
	const can3D = canRender3D( q.has( 'no3d' ) );
	const use3D = can3D && ( CAPTURE || FORCED || q.has( 'fit' ) || ! softwareGPU() );
	// Why the 3D is off, when it is (shown by ?filmcheck).
	let why = '';
	if ( ! use3D ) {
		const saver = !! ( navigator.connection && navigator.connection.saveData );
		why = q.has( 'no3d' ) ? 'turned off in the address (?no3d)' : can3D ? 'software graphics (no graphics chip in use)' : saver ? 'Data Saver is on' : 'this browser has 3D graphics (WebGL 2) switched off or unavailable; get.webgl.org/webgl2 shows the same';
	}
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
	// The caption naming the ring the film ends on, once it is turning at its best angle.
	$$( '.film-shown' ).forEach( ( el ) => tl.fromTo( el, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 16.1 ) );
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
	// The still pictures take over (the words keep playing), and the graphics memory is freed.
	const fallBack = ( reason ) => {
		why = reason || why;
		const e = engine;
		engine = null;
		ready = false;
		if ( e ) {
			try {
				e.renderer.dispose();
				e.renderer.forceContextLoss();
			} catch ( err ) {
				// Already gone.
			}
		}
		canvas.remove();
		holder = null;
		acts.forEach( ( a ) => a.classList.remove( 'is-live' ) );
		root.classList.add( 'film-no3d' );
	};
	canvas.addEventListener( 'webglcontextlost', ( e ) => {
		e.preventDefault();
		// The graphics driver dropped the film (a phone short of memory, a driver reset): the
		// still pictures for the rest of the visit.
		// (When the film turned itself off, freeing the graphics memory lands here too: keep its reason.)
		if ( engine && ! FORCED && ! CAPTURE ) {
			remember( 'off' );
		}
		fallBack( engine ? 'the graphics driver dropped the 3D' : '' );
	} );

	/* ---------- Keeping each stage on screen ---------- */
	// The stage stays on screen with CSS (position: sticky). A wrapper that hides its overflow
	// (themes and page settings often do, to stop sideways scrolling) quietly turns that off, and
	// the film would scroll away after its first moment. Such wrappers get overflow: clip instead:
	// the same look, and the stage stays on screen again. Where that isn't possible, or the stage
	// still doesn't stay, the film pins its stages itself.
	const stages = acts.map( ( a ) => $( '.film-stage', a ) );
	let pinJS = '';
	let unblocked = 0;
	const hides = ( v ) => v !== 'visible' && v !== 'clip';
	const blockers = ( el ) => {
		const out = [];
		const hs = getComputedStyle( root );
		// The page's own overflow goes to the window, unless the root element has its own.
		const bodyToWindow = ! hides( hs.overflowX ) && ! hides( hs.overflowY );
		for ( let n = el.parentElement; n && n !== root; n = n.parentElement ) {
			if ( n === document.body && bodyToWindow ) {
				continue;
			}
			const cs = getComputedStyle( n );
			if ( hides( cs.overflowX ) || hides( cs.overflowY ) ) {
				out.push( n );
			}
		}
		return out;
	};
	const clipOK = !! ( window.CSS && CSS.supports && CSS.supports( 'overflow', 'clip' ) );
	// An ancestor with a transform (or filter, containment) makes "fixed" follow it, not the screen.
	const holdsFixed = ( n ) => {
		const cs = getComputedStyle( n );
		return cs.transform !== 'none' || cs.perspective !== 'none' || cs.filter !== 'none' || ( !! cs.backdropFilter && cs.backdropFilter !== 'none' ) || /paint|layout|strict|content/.test( cs.contain || '' ) || /transform|perspective|filter/.test( cs.willChange || '' );
	};
	const frames = new Map();
	const frameOf = ( st ) => {
		if ( ! frames.has( st ) ) {
			let c = null;
			for ( let n = st.parentElement; n && n !== root && ! c; n = n.parentElement ) {
				c = holdsFixed( n ) ? n : null;
			}
			frames.set( st, c );
		}
		return frames.get( st );
	};
	const usePinJS = ( reason ) => {
		if ( pinJS ) {
			return;
		}
		pinJS = reason;
		root.classList.add( 'film-pinjs' );
		frames.clear();
		ScrollTrigger.refresh();
	};
	// (Marked important, so a theme rule that forces a position can't undo it.)
	const place = ( st, pos, top, bottom, left, width ) => {
		const s = st.style;
		const set = ( k, v ) => {
			if ( s.getPropertyValue( k ) !== v ) {
				s.setProperty( k, v, 'important' );
			}
		};
		set( 'position', pos );
		set( 'top', top );
		set( 'bottom', bottom );
		set( 'left', left );
		set( 'width', width );
	};
	const filmTop = () => parseFloat( root.style.getPropertyValue( '--film-top' ) ) || 0;
	// Each frame, when pinning by hand: before its act, at the act's top; during, fixed under the
	// header; after, at the act's bottom (exactly what sticky would do).
	const pin = () => {
		if ( ! pinJS ) {
			return;
		}
		const top = filmTop();
		acts.forEach( ( a, i ) => {
			const st = stages[ i ];
			const r = a.getBoundingClientRect();
			const h = st.offsetHeight;
			if ( r.top > top ) {
				place( st, 'absolute', '0px', 'auto', '0px', '100%' );
			} else if ( r.bottom < top + h ) {
				place( st, 'absolute', 'auto', '0px', '0px', '100%' );
			} else {
				const f = frameOf( st );
				const fr = f ? f.getBoundingClientRect() : { left: 0, top: 0 };
				place( st, 'fixed', ( top - fr.top ) + 'px', 'auto', ( r.left - fr.left ) + 'px', r.width + 'px' );
			}
		} );
	};
	const unblock = () => {
		for ( const st of stages ) {
			for ( const n of blockers( st ) ) {
				const cs = getComputedStyle( n );
				// A real inner scroller (content longer than it, scrolled on purpose) is left alone.
				const scrolls = ( cs.overflowY !== 'hidden' && n.scrollHeight > n.clientHeight + 1 ) || ( cs.overflowX !== 'hidden' && n.scrollWidth > n.clientWidth + 1 );
				if ( ! clipOK || scrolls ) {
					continue;
				}
				// Keep what overflow: hidden did besides clipping (contain floats, keep margins inside).
				if ( cs.display === 'block' ) {
					n.style.setProperty( 'display', 'flow-root' );
				}
				n.style.setProperty( 'overflow-x', cs.overflowX === 'hidden' ? 'clip' : 'visible', 'important' );
				n.style.setProperty( 'overflow-y', cs.overflowY === 'hidden' ? 'clip' : 'visible', 'important' );
				unblocked ++;
			}
		}
		if ( stages.some( ( st ) => blockers( st ).length ) ) {
			usePinJS( 'a page wrapper hides its overflow' );
		}
	};
	// The safety net: in the middle of an act the stage must sit right under the header.
	const checkPinned = () => {
		if ( pinJS || ! active ) {
			return;
		}
		const top = filmTop();
		const r = active.getBoundingClientRect();
		const st = $( '.film-stage', active );
		const h = st.offsetHeight;
		if ( r.top < top - 40 && r.bottom > top + h + 40 && Math.abs( st.getBoundingClientRect().top - top ) > 3 ) {
			usePinJS( 'the page did not keep the film on screen' );
		}
	};
	if ( ! CAPTURE ) {
		unblock();
		addEventListener( 'load', unblock );
		// ?pinjs: pin by hand regardless (checks).
		if ( q.has( 'pinjs' ) ) {
			usePinJS( 'asked for in the address' );
		}
	}

	let dprCap = 1;
	const stageSize = () => [ canvas.clientWidth || innerWidth, canvas.clientHeight || innerHeight ];
	// The richer levels draw at the screen's own sharpness (a Retina screen in full), the best one
	// finer than ordinary screens; the light levels at one pixel per point at most (see fit.js).
	const pixelRatio = () => {
		const [ w, h ] = stageSize();
		return dprFor( engine.tier, dprCap, w, h );
	};
	// The rungs this screen offers, cheapest last (worked out again when the stage changes size).
	let ladder = ladderFor( innerWidth, innerHeight );
	const resize = () => {
		if ( ! engine ) {
			return;
		}
		const [ w, h ] = stageSize();
		ladder = ladderFor( w, h );
		const dpr = pixelRatio();
		// Unchanged: nothing to do (a new size clears the picture until the next frame).
		if ( engine.size.w === w && engine.size.h === h && engine.renderer.getPixelRatio() === dpr ) {
			return;
		}
		engine.resize( w, h, dpr );
	};
	// The stage can change size without the window doing so (the site header settling once the page
	// has loaded, an announcement bar closing): the picture would be stretched until the next resize.
	// Picked up at the start of the next frame, so it is drawn at its new size straight away.
	let stale = false;
	if ( window.ResizeObserver ) {
		new ResizeObserver( () => {
			stale = true;
		} ).observe( canvas );
	}

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

	/* ---------- Fitting the film to the device (see fit.js) ---------- */
	const gov = createGovernor();
	let rung = [ 'medium', 1 ];
	let busy = false;
	let aoOn = false;
	// The rung's resolution was fitted to the close-up, where the stone fills the screen. Wherever it
	// is smaller (the first screen, the ring scenes) the same device can afford more pixels, so the
	// film sharpens up there, and drops back as the stone grows again.
	let covHeavy = 0.6;
	let lastScale = 0;
	// When the visitor stops scrolling (reading the words), one step sharper is fine: only the slow
	// turn of the stone is moving. Scrolling again drops it back at once.
	let lastMoveAt = 0;
	const STEPS = [ 1, 0.8, 0.65, 0.5 ];
	const tuneScale = ( force = false ) => {
		if ( ( CAPTURE && ! q.has( 'tune' ) ) || ! engine || rung[ 1 ] >= 1 ) {
			return;
		}
		const cov = Math.max( 0.02, engine.stoneCoverage() );
		const calm = performance.now() - lastMoveAt > 400;
		const room = rung[ 1 ] * Math.sqrt( covHeavy / cov ) * ( calm ? 1.25 : 1 );
		const want = Math.max( rung[ 1 ], STEPS.find( ( v ) => v <= room + 1e-6 ) || rung[ 1 ] );
		if ( want === dprCap ) {
			return;
		}
		// Down at once (keep it smooth); up only after a calm half second (no flicker).
		const now = performance.now();
		if ( force || want < dprCap || now - lastScale > 500 ) {
			dprCap = want;
			lastScale = now;
			resize();
		}
	};
	// Switch to a rung: a new resolution is instant; a new quality level compiles its shaders in
	// the background first, with the last frame left on screen meanwhile.
	const useRung = async ( r ) => {
		if ( ! engine ) {
			return;
		}
		const recompile = engine.tier.name !== r[ 0 ];
		rung = r;
		dprCap = r[ 1 ];
		if ( recompile ) {
			const was = ready;
			ready = false;
			engine.setTier( TIERS[ r[ 0 ] ] );
			resize();
			try {
				await engine.warm();
			} catch ( e ) {
				// The first frame compiles anyway.
			}
			ready = was && !! engine;
		} else {
			resize();
		}
		needs = true;
		gov.reset();
	};
	// The film runs slow: one rung down, or the still pictures from the lightest rung.
	const stepDown = async () => {
		const next = ladder.next( rung );
		if ( ! next ) {
			if ( ! FORCED ) {
				remember( 'off' );
				fallBack( 'too slow while playing, even on the lightest level (about ' + Math.max( 1, Math.round( 1000 / ( gov.last || 1000 ) ) ) + ' frames a second)' );
			}
			return;
		}
		await useRung( next );
		if ( ! FORCED ) {
			remember( [ rung[ 0 ], rung[ 1 ], covHeavy ] );
		}
	};
	document.addEventListener( 'visibilitychange', () => gov.reset( 4 ) );

	// The film's own clock starts at 0 on its first frame, like the still pictures, so the
	// hand-over from picture to 3D is exact.
	let clock0 = null;
	const draw = ( time ) => {
		if ( ! engine || ! ready || ! active ) {
			return;
		}
		if ( shaderFailed && ! CAPTURE ) {
			if ( ! FORCED ) {
				remember( 'off' );
			}
			fallBack( 'this graphics chip could not build the 3D (a shader failed)' );
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
		try {
			engine.render( S, REDUCED ? 0 : time );
		} catch ( err ) {
			// Something in the 3D failed on this browser or graphics chip. The contact shadows are
			// an extra, so they go first; otherwise the still pictures take over rather than a
			// frozen film (the error stays in the console for checks).
			console.error( 'Wulf film:', err );
			if ( aoOn ) {
				aoOn = false;
				try {
					engine.useAO( null );
					needs = true;
					return;
				} catch ( e2 ) {
					// Fall through to the pictures.
				}
			}
			if ( ! FORCED ) {
				remember( 'off' );
			}
			fallBack( 'error: ' + ( ( err && err.message ) || err ) );
			return;
		}
		active.classList.add( 'is-live' );
		tuneScale();
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

	// The contact-shadow add-on (best level only): fetched while the 3D gets ready, and only ever
	// switched on before the film takes over, so its shaders are built during the warm-up and never
	// mid-film (a hitch on some laptops).
	let aoLoad = null;
	const fetchAO = () => {
		if ( ! aoLoad && AO_URL ) {
			window.__wulfFilmLib = AO_LIB;
			aoLoad = new Promise( ( resolve ) => {
				const s = document.createElement( 'script' );
				s.src = AO_URL;
				s.async = true;
				s.onload = () => resolve( window.WulfFilmAO || null );
				s.onerror = () => resolve( null );
				document.head.appendChild( s );
			} );
		}
		return aoLoad || Promise.resolve( null );
	};
	const wait = ( ms ) => new Promise( ( r ) => setTimeout( r, ms ) );
	// A graphics driver that can't build one of the film's shaders: the still pictures, with the reason.
	let shaderFailed = false;

	// Build the 3D once the page has settled; the pictures cover the wait.
	const start = async () => {
		if ( ! use3D ) {
			return;
		}
		if ( ! CAPTURE ) {
			await idle( 600 );
		}
		// Earlier in this visit the film already found its level (or found it couldn't run smoothly).
		const memo = FORCED || CAPTURE ? null : recall();
		if ( memo === 'off' ) {
			fallBack( 'turned off earlier in this visit (too slow, or it failed)' );
			return;
		}
		let tier = pickTier( q.get( 'tier' ) );
		if ( memo ) {
			tier = TIERS[ memo[ 0 ] ];
			dprCap = memo[ 1 ];
			covHeavy = memo[ 2 ] || covHeavy;
		}
		try {
			engine = createEngine( canvas, { tier, preserve: CAPTURE } );
		} catch ( e ) {
			fallBack( 'the 3D could not start: ' + ( ( e && e.message ) || e ) );
			return;
		}
		engine.renderer.debug.onShaderError = ( gl, program ) => {
			shaderFailed = true;
			console.error( 'Wulf film: this graphics chip could not build a shader.', gl.getProgramInfoLog( program ) );
		};
		if ( tier.ao || tier.name === 'medium' ) {
			fetchAO();
		}
		rung = [ tier.name, dprCap ];
		where();
		resize();
		try {
			await engine.warm();
		} catch ( e ) {
			// Compiling in the background is only a nicety; the first frame compiles anyway.
		}
		// Measure the heaviest frame while the still picture still shows, and settle on a level.
		if ( engine && FIT && ! memo ) {
			const S = Object.assign( defaults(), filmState(), HEAVY );
			let ms = 0;
			// First a small copy of the heaviest frame (an eighth of the pixels): a weak graphics chip is
			// never handed a frame long enough for Windows to reset its driver (which makes the browser
			// turn 3D off). The full-size cost is worked out from it.
			const probe = async () => {
				const [ w, h ] = stageSize();
				const k = 0.35;
				engine.resize( w, h, pixelRatio() * k );
				const small = await engine.bench( S, 2 );
				covHeavy = Math.max( 0.05, engine.stoneCoverage() );
				resize();
				return ( ms = small / ( k * k ) );
			};
			const chosen = await settle( rung, useRung, async () => ( ms = await engine.bench( S ) ), FIT_TARGET, probe, ladder );
			if ( ! engine ) {
				return;
			}
			if ( ! chosen ) {
				remember( 'off' );
				fallBack( 'too slow on this computer (its heaviest frame would take about ' + Math.round( ms ) + ' ms)' );
				return;
			}
			if ( chosen !== rung ) {
				await useRung( chosen );
			}
			remember( [ rung[ 0 ], rung[ 1 ], covHeavy ] );
		}
		// Contact shadows on the best level: switched on now or not at all this visit.
		if ( engine && engine.tier.ao && AO_URL ) {
			const Pass = await ( CAPTURE ? fetchAO() : Promise.race( [ fetchAO(), wait( 2500 ) ] ) );
			if ( Pass && engine && engine.tier.ao ) {
				try {
					engine.useAO( Pass );
					aoOn = true;
				} catch ( e ) {
					console.error( 'Wulf film (contact shadows):', e );
				}
			}
		}
		// One hidden frame, still under the picture: the finishing passes build their shaders now
		// (depth of field too, which the film only switches on later).
		if ( engine ) {
			try {
				engine.render( Object.assign( defaults(), F, engine.tier.dof ? { dof: 0.5 } : {} ), 0 );
			} catch ( e ) {
				fallBack( 'error: ' + ( ( e && e.message ) || e ) );
				return;
			}
		}
		// Sharpen for the moment on screen before the film takes over (no visible jump).
		tuneScale( true );
		if ( engine && shaderFailed && ! CAPTURE ) {
			if ( ! FORCED ) {
				remember( 'off' );
			}
			fallBack( 'this graphics chip could not build the 3D (a shader failed)' );
			return;
		}
		if ( engine ) {
			ready = true;
			needs = true;
			gov.reset();
		}
	};
	const started = start();

	if ( ! CAPTURE ) {
		let lastT = - 1;
		gsap.ticker.add( ( time ) => {
			pin();
			where();
			checkPinned();
			if ( ! engine || ! ready || ! active ) {
				gov.reset( 4 );
				return;
			}
			if ( stale ) {
				stale = false;
				resize();
				needs = true;
			}
			const moving = tl.time() !== lastT || intro.e < 1;
			lastT = tl.time();
			if ( moving ) {
				lastMoveAt = performance.now();
			}
			if ( REDUCED && ! moving && ! needs ) {
				return;
			}
			needs = false;
			draw( time );
			// The governor keeps scrolling smooth; a calm moment (sharper, slower) is not its business.
			if ( ! moving ) {
				gov.reset( 6 );
			} else if ( ! REDUCED && ! busy && gov.tick( performance.now(), ! ladder.next( rung ) ) === 'down' ) {
				busy = true;
				stepDown().finally( () => {
					busy = false;
				} );
			}
		} );
	}

	/* ---------- ?filmcheck: what the film decided on this computer, for support ---------- */
	if ( q.has( 'filmcheck' ) ) {
		const box = document.createElement( 'div' );
		box.className = 'film-check';
		box.setAttribute( 'role', 'status' );
		box.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:99999;max-width:min(380px,calc(100vw - 24px));padding:12px 14px;border-radius:10px;background:rgba(5,7,11,.9);color:#fff;font:500 12.5px/1.55 system-ui,sans-serif;white-space:pre-line;pointer-events:none';
		document.body.appendChild( box );
		let frames = 0;
		let since = performance.now();
		let fps = 0;
		gsap.ticker.add( () => {
			frames ++;
			const now = performance.now();
			if ( now - since >= 1000 ) {
				fps = Math.round( ( frames * 1000 ) / ( now - since ) );
				frames = 0;
				since = now;
			}
		} );
		// How sharp the film draws, as a share of what this screen can show (100% = every pixel of it).
		const sharpness = ( scale ) => {
			const [ w, h ] = stageSize();
			return Math.round( ( 100 * dprFor( engine.tier, scale, w, h ) ) / ( devicePixelRatio || 1 ) );
		};
		const show = () => {
			const on = engine && ready;
			const [ sw, sh ] = stageSize();
			const density = Math.round( ( devicePixelRatio || 1 ) * 100 ) / 100;
			box.textContent = [
				'Film check (kit ' + ( ( window.wkFilm && window.wkFilm.v ) || 'unknown' ) + ')',
				'Graphics: ' + ( gpuName() || 'not reported by this browser' ),
				'Screen: ' + Math.round( sw ) + ' x ' + Math.round( sh ) + ', ' + density + 'x density' + ( density >= 1.75 ? ' (Retina class)' : '' ),
				'Stays on screen: ' + ( pinJS ? 'pinned by the film, because ' + pinJS : unblocked ? 'yes (' + unblocked + ' page wrapper' + ( unblocked > 1 ? 's' : '' ) + ' adjusted)' : 'yes' ),
				'3D: ' + ( on ? 'on, ' + ( rung[ 0 ] === 'lite2' ? 'lightest' : rung[ 0 ] ) + ' quality, sharpness ' + sharpness( rung[ 1 ] ) + '% of this screen' + ( sharpness( rung[ 1 ] ) > 100 ? ' (drawn finer than the screen)' : '' ) + ( dprCap > rung[ 1 ] ? ', ' + sharpness( dprCap ) + '% right now' : '' ) : why ? 'off, ' + why : 'starting' ),
				on ? 'Frames a second: ' + fps : '',
				REDUCED ? 'Reduce motion is on in this computer\'s settings, so the film shows calm still frames.' : '',
			].filter( Boolean ).join( '\n' );
		};
		show();
		setInterval( show, 500 );
	}

	/* ---------- Capture: exact frames for the still pictures and checks ---------- */
	window.__film = {
		started,
		live: () => !! ( engine && ready ),
		tier: () => engine && engine.tier.name,
		/** The rung the film plays at ([level, resolution scale]) and the graphics chip it found. */
		rung: () => rung,
		gpu: () => gpuName(),
		/** The resolution scale in use right now (the rung's, or sharper where the stone is small). */
		scale: () => dprCap,
		/** Pixels drawn per point right now, and the rungs this screen offers (checks). */
		dpr: () => ( engine ? engine.renderer.getPixelRatio() : 0 ),
		ladder: () => ladder.rungs.map( ( r ) => [ r[ 0 ], r[ 1 ], Math.round( ladder.dpr( r ) * 100 ) / 100 ] ),
		/** The stone's share of the picture in the close-up the level was fitted to (checks). */
		covHeavy( v ) {
			if ( v ) {
				covHeavy = v;
			}
			return covHeavy;
		},
		coverage: () => ( engine ? engine.stoneCoverage() : 0 ),
		/** Centre stone and small stones: bounces and tail, for comparisons. */
		stone( { bounces, tail } ) {
			const mats = [ engine.diamond.material, engine.ring.pave && engine.ring.pave.material ].filter( Boolean );
			for ( const m of mats ) {
				if ( bounces !== undefined ) {
					m.uniforms.bounces.value = bounces;
				}
				if ( tail !== undefined && m.uniforms.tail ) {
					m.uniforms.tail.value = tail;
				}
			}
		},
		/** Play at a rung, as the fitting would ([level, resolution scale]; checks and comparisons). */
		async useRung( r ) {
			await useRung( r );
		},
		/** Shader programs built so far (checks: nothing new should compile mid-film). */
		programs: () => ( engine ? engine.renderer.info.programs.length : 0 ),
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
