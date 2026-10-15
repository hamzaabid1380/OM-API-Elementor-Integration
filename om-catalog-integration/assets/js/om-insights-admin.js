/**
 * Insights (wp-admin > Insights) as a small app.
 *
 * Sections, periods, filters and single visits load in place through
 * admin-ajax (om_ins_view and friends) and the address keeps up, so Back,
 * reload and bookmarks still work. The page also works without this script.
 * The time chart and the small lines in the headline numbers are drawn here
 * from the numbers the page carries; settings save as soon as they change.
 * HTML from the server is built and escaped there (admin only, nonce
 * checked); anything written here goes in as text.
 */
( function () {
	'use strict';

	var app = document.querySelector( '[data-om-ins-app]' );
	if ( ! app || ! window.fetch || ! window.FormData || ! window.URL || ! window.history || ! window.history.pushState ) {
		return;
	}
	var cfg = window.omIns || {};
	var i18n = cfg.i18n || {};
	var view = app.querySelector( '[data-om-ins-view]' );
	var lang = document.documentElement.getAttribute( 'lang' ) || undefined;
	var reduce = !! ( window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches );
	var baseTitle = document.title;
	var SVGNS = 'http://www.w3.org/2000/svg';
	var ICON_OK = '<svg class="om-ins-i" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
	var ICON_BAD = '<svg class="om-ins-i" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.1"/></svg>';

	app.classList.add( 'om-ins-js' );

	/* ---------- Small helpers ---------- */

	function $( sel, ctx ) {
		return ( ctx || app ).querySelector( sel );
	}

	function $$( sel, ctx ) {
		return Array.prototype.slice.call( ( ctx || app ).querySelectorAll( sel ) );
	}

	function closest( node, sel ) {
		return node && node.closest ? node.closest( sel ) : null;
	}

	// Remembered choices. Storage can be switched off (private windows), so nothing depends on it.
	function keep( where, key, value ) {
		try {
			var store = 'session' === where ? window.sessionStorage : window.localStorage;
			if ( undefined === value ) {
				return store.getItem( key );
			}
			store.setItem( key, value );
		} catch ( e ) {}
		return null;
	}

	function svg( name, attrs, parent ) {
		var el = document.createElementNS( SVGNS, name );
		Object.keys( attrs || {} ).forEach( function ( k ) {
			el.setAttribute( k, attrs[ k ] );
		} );
		if ( parent ) {
			parent.appendChild( el );
		}
		return el;
	}

	function r1( v ) {
		return Math.round( v * 10 ) / 10;
	}

	/* ---------- Numbers, as the server writes them ---------- */

	var formats = {};

	function num( v, digits ) {
		digits = digits || 0;
		if ( ! formats[ digits ] ) {
			var o = { minimumFractionDigits: digits, maximumFractionDigits: digits };
			try {
				formats[ digits ] = new Intl.NumberFormat( lang, o );
			} catch ( e ) {
				formats[ digits ] = new Intl.NumberFormat( undefined, o );
			}
		}
		return formats[ digits ].format( +v || 0 );
	}

	// 980, 1.2K, 12K, 1.4M.
	function compact( v ) {
		v = +v || 0;
		if ( v >= 1e6 ) {
			return num( v / 1e6, 1 ) + 'M';
		}
		if ( v >= 1e4 ) {
			return num( v / 1e3, 0 ) + 'K';
		}
		if ( v >= 1e3 ) {
			return num( v / 1e3, 1 ) + 'K';
		}
		return num( v );
	}

	function two( n ) {
		return ( n < 10 ? '0' : '' ) + n;
	}

	function duration( s ) {
		s = Math.round( +s || 0 );
		if ( s < 60 ) {
			return ( i18n.dS || '%ds' ).replace( '%d', String( s ) );
		}
		if ( s < 3600 ) {
			return ( i18n.dM || '%1$dm %2$02ds' ).replace( '%1$d', String( Math.floor( s / 60 ) ) ).replace( '%2$02d', two( s % 60 ) );
		}
		return ( i18n.dH || '%1$dh %2$02dm' ).replace( '%1$d', String( Math.floor( s / 3600 ) ) ).replace( '%2$02d', two( Math.floor( ( s % 3600 ) / 60 ) ) );
	}

	// Money as the site writes it ("$%s"); set from the chart's data.
	var moneyFmt = '$%s';

	function money( text ) {
		return moneyFmt.replace( '%s', text );
	}

	// kind: n number, t seconds, p percent, m money.
	function metric( kind, v ) {
		if ( 't' === kind ) {
			return duration( v );
		}
		if ( 'p' === kind ) {
			return num( v, 1 ) + '%';
		}
		if ( 'm' === kind ) {
			return money( num( Math.round( +v || 0 ) ) );
		}
		return num( v );
	}

	function axis( kind, v ) {
		if ( 't' === kind ) {
			return duration( v );
		}
		if ( 'p' === kind ) {
			return num( v, v % 1 ? 1 : 0 ) + '%';
		}
		if ( 'm' === kind ) {
			return money( compact( v ) );
		}
		return compact( v );
	}

	// "▲ 12% more than the period before", or nothing when there is no "before".
	function change( now, before, vs ) {
		before = +before || 0;
		vs = vs || i18n.before || '';
		if ( before <= 0 ) {
			return '';
		}
		var pct = Math.round( ( 100 * ( ( +now || 0 ) - before ) ) / before );
		if ( 0 === pct ) {
			return ( i18n.same || '%s' ).replace( '%s', vs );
		}
		var words = ( pct > 0 ? i18n.more : i18n.less ) || '%1$s';
		return ( pct > 0 ? '▲ ' : '▼ ' ) + words.replace( '%1$s', num( Math.abs( pct ) ) + '%' ).replace( '%2$s', vs );
	}

	/* ---------- Talking to the server ---------- */

	function request( action, pairs ) {
		var body = new FormData();
		body.append( 'action', action );
		body.append( 'nonce', cfg.nonce || '' );
		( pairs || [] ).forEach( function ( p ) {
			body.append( p[ 0 ], p[ 1 ] );
		} );
		return fetch( cfg.ajax, { method: 'POST', body: body, credentials: 'same-origin' } )
			.then( function ( r ) {
				if ( 400 === r.status || 403 === r.status ) {
					// Signed out, or the page is too old: the caller loads it the ordinary way.
					var stale = new Error( 'stale' );
					stale.stale = true;
					throw stale;
				}
				if ( ! r.ok ) {
					throw new Error( 'http' );
				}
				return r.json();
			} )
			.then( function ( res ) {
				if ( ! res || ! res.success ) {
					throw new Error( 'refused' );
				}
				return res.data;
			} );
	}

	// An address' query as form fields (the server reads the same names).
	function pairsOf( href ) {
		var out = [];
		new URL( href, window.location.href ).searchParams.forEach( function ( value, key ) {
			if ( 'refresh' !== key && 'saved' !== key ) {
				out.push( [ key, value ] );
			}
		} );
		return out;
	}

	// The address to keep in the browser (no one-off "refresh" or "saved").
	function clean( href ) {
		var u = new URL( href, window.location.href );
		if ( u.searchParams.has( 'refresh' ) || u.searchParams.has( 'saved' ) ) {
			u.searchParams.delete( 'refresh' );
			u.searchParams.delete( 'saved' );
		}
		return u.href;
	}

	function param( href, key ) {
		return new URL( href, window.location.href ).searchParams.get( key );
	}

	/* ---------- Busy line, messages ---------- */

	var bar = document.createElement( 'div' );
	bar.className = 'om-ins-progress';
	bar.setAttribute( 'aria-hidden', 'true' );
	bar.appendChild( document.createElement( 'i' ) );
	app.appendChild( bar );
	var barFill = bar.firstChild;
	var busyTimer = 0;
	var barTimer = 0;

	function setBusy( on ) {
		window.clearTimeout( busyTimer );
		window.clearTimeout( barTimer );
		view.setAttribute( 'aria-busy', on ? 'true' : 'false' );
		if ( on ) {
			// Dim only when it takes a moment, so quick loads don't flash.
			busyTimer = window.setTimeout( function () {
				app.classList.add( 'is-busy' );
			}, 120 );
			barFill.style.transition = 'none';
			barFill.style.opacity = '1';
			barFill.style.width = '0';
			void barFill.offsetWidth; // Start from zero.
			barFill.style.transition = '';
			barFill.style.width = '40%';
			barTimer = window.setTimeout( function () {
				barFill.style.width = '80%';
			}, 500 );
		} else {
			app.classList.remove( 'is-busy' );
			barFill.style.width = '100%';
			barTimer = window.setTimeout( function () {
				barFill.style.opacity = '0';
			}, 260 );
		}
	}

	var say = document.createElement( 'p' );
	say.className = 'screen-reader-text';
	say.setAttribute( 'aria-live', 'polite' );
	app.appendChild( say );

	function announce( text ) {
		say.textContent = '';
		window.setTimeout( function () {
			say.textContent = text;
		}, 60 );
	}

	function toast( text, bad ) {
		var box = $( '[data-om-ins-toasts]' );
		if ( ! box || ! text ) {
			return;
		}
		var el = document.createElement( 'div' );
		el.className = 'om-ins-toast' + ( bad ? ' bad' : '' );
		el.innerHTML = bad ? ICON_BAD : ICON_OK; // Fixed markup.
		var span = document.createElement( 'span' );
		span.textContent = text;
		el.appendChild( span );
		box.appendChild( el );
		while ( box.children.length > 3 ) {
			box.removeChild( box.firstChild );
		}
		window.setTimeout(
			function () {
				el.classList.add( 'out' );
				window.setTimeout( function () {
					if ( el.parentNode ) {
						el.parentNode.removeChild( el );
					}
				}, 300 );
			},
			bad ? 5000 : 2400
		);
	}

	/* ---------- Tooltips: one for marks with data-tip, one for the chart ---------- */

	function makeTip( id ) {
		var el = document.createElement( 'div' );
		el.className = 'om-ins-tip';
		el.id = id;
		el.setAttribute( 'role', 'tooltip' );
		el.hidden = true;
		document.body.appendChild( el );
		return el;
	}

	var tip = makeTip( 'om-ins-tip' );
	var chartTip = makeTip( 'om-ins-charttip' );
	var tipFor = null;

	function placeAbove( el, x, y ) {
		var w = el.offsetWidth;
		var h = el.offsetHeight;
		var left = Math.max( 8, Math.min( x - w / 2, window.innerWidth - w - 8 ) );
		var top = y - h - 12;
		if ( top < 8 ) {
			top = y + 20;
		}
		el.style.left = Math.round( left ) + 'px';
		el.style.top = Math.round( top ) + 'px';
	}

	function showTip( target, x, y ) {
		var text = target.getAttribute( 'data-tip' );
		if ( ! text ) {
			return;
		}
		if ( tipFor && tipFor !== target ) {
			tipFor.removeAttribute( 'aria-describedby' );
		}
		tipFor = target;
		tip.textContent = text;
		tip.hidden = false;
		if ( 'number' !== typeof x ) {
			var r = target.getBoundingClientRect();
			x = r.left + r.width / 2;
			y = r.top;
			target.setAttribute( 'aria-describedby', 'om-ins-tip' );
		}
		placeAbove( tip, x, y );
	}

	function hideTip() {
		if ( tipFor ) {
			tipFor.removeAttribute( 'aria-describedby' );
		}
		tipFor = null;
		tip.hidden = true;
	}

	function tipTarget( node ) {
		var el = closest( node, '[data-tip]' );
		return el && app.contains( el ) ? el : null;
	}

	document.addEventListener( 'mousemove', function ( e ) {
		var el = tipTarget( e.target );
		if ( ! el ) {
			if ( tipFor ) {
				hideTip();
			}
			return;
		}
		if ( el !== tipFor ) {
			showTip( el, e.clientX, e.clientY );
		} else {
			placeAbove( tip, e.clientX, e.clientY );
		}
	} );
	app.addEventListener( 'focusin', function ( e ) {
		var el = tipTarget( e.target );
		if ( el ) {
			showTip( el );
		} else if ( tipFor ) {
			hideTip();
		}
	} );
	app.addEventListener( 'focusout', function ( e ) {
		if ( tipFor && e.target === tipFor ) {
			hideTip();
		}
	} );

	function hideTips() {
		hideTip();
		hideHover();
	}

	window.addEventListener( 'scroll', hideTips, { passive: true } );
	window.addEventListener( 'blur', hideTips );

	/* ---------- Navigation: everything loads in place ---------- */

	var seq = 0;
	var cache = {};

	// Sections are kept a minute (and asked for on hover), so going back and forth is instant.
	function fetchView( href, fresh ) {
		var key = clean( href );
		var now = Date.now();
		var live = 'live' === param( href, 'tab' ) && ! param( href, 'visit' ) && ! param( href, 'visitor' );
		Object.keys( cache ).forEach( function ( k ) {
			if ( now - cache[ k ].t > 60000 ) {
				delete cache[ k ];
			}
		} );
		if ( ! fresh && ! live && cache[ key ] ) {
			return cache[ key ].p;
		}
		var p = request( 'om_ins_view', pairsOf( href ).concat( fresh ? [ [ 'refresh', '1' ] ] : [] ) );
		if ( ! live ) {
			cache[ key ] = { t: now, p: p };
			p.catch( function () {
				if ( cache[ key ] && cache[ key ].p === p ) {
					delete cache[ key ];
				}
			} );
		}
		return p;
	}

	// What had focus, so the same control has it after the page part is redrawn.
	function focusKey( el ) {
		if ( ! el || el === document.body || ! app.contains( el ) ) {
			return '';
		}
		if ( closest( el, '.om-ins-nav' ) && el.hasAttribute( 'data-om-ins-tab' ) ) {
			return '.om-ins-nav [data-om-ins-tab="' + el.getAttribute( 'data-om-ins-tab' ) + '"]';
		}
		if ( closest( el, '[data-om-ins-picker]' ) ) {
			return '[data-om-ins-picker-btn]';
		}
		if ( closest( el, '[data-om-ins-report]' ) ) {
			return '[data-om-ins-report-btn]';
		}
		if ( closest( el, '.om-ins-livechip' ) ) {
			return '.om-ins-livechip';
		}
		if ( closest( el, '[data-om-ins-refresh]' ) ) {
			return '[data-om-ins-refresh]';
		}
		return 'view';
	}

	function restoreFocus( key ) {
		var now = document.activeElement;
		if ( ! key || ( now && now !== document.body && app.contains( now ) ) ) {
			return;
		}
		var el = 'view' === key ? null : $( key );
		if ( ! el ) {
			el = view;
			view.setAttribute( 'tabindex', '-1' );
		}
		el.focus( { preventScroll: true } );
	}

	function sectionName() {
		var here = $( '.om-ins-nav [aria-current="page"]' );
		return here ? here.textContent.trim() : '';
	}

	// After a new section or filter: show its start (under the sticky bar), never jump down.
	function scrollToStart() {
		var adminBar = document.getElementById( 'wpadminbar' );
		var barH = adminBar && 'fixed' === window.getComputedStyle( adminBar ).position ? adminBar.offsetHeight : 0;
		var nav = $( '.om-ins-nav' );
		var chips = $( '[data-om-ins-chips]' );
		var target = chips && chips.children.length ? chips : view;
		var y = target.getBoundingClientRect().top + window.pageYOffset - barH - ( nav ? nav.offsetHeight : 0 ) - 12;
		if ( window.pageYOffset > y ) {
			window.scrollTo( 0, Math.max( 0, y ) );
		}
	}

	// On narrow screens the section links scroll sideways: keep the current one in sight.
	function navIntoView() {
		var navIn = $( '.om-ins-nav-in' );
		var here = navIn && $( '[aria-current="page"]', navIn );
		if ( ! here ) {
			return;
		}
		var a = here.getBoundingClientRect();
		var b = navIn.getBoundingClientRect();
		if ( a.left < b.left || a.right > b.right ) {
			navIn.scrollLeft += a.left - b.left - 24;
		}
	}

	function show( d ) {
		var navIn = $( '.om-ins-nav-in' );
		var navX = navIn ? navIn.scrollLeft : 0;
		$( '[data-om-ins-navwrap]' ).innerHTML = d.nav;
		$( '[data-om-ins-pickerwrap]' ).innerHTML = d.picker;
		if ( 'string' === typeof d.report ) {
			if ( reportBusy ) {
				reportNext = d.report; // Swapped in once the download in progress is done.
			} else {
				$( '[data-om-ins-reportwrap]' ).innerHTML = d.report;
				namesChoice();
			}
		}
		$( '[data-om-ins-chips]' ).innerHTML = d.chips || '';
		$( '[data-om-ins-controls]' ).hidden = ! d.scoped;
		$( '[data-om-ins-comparewrap]' ).hidden = ! d.compare;
		app.setAttribute( 'data-om-ins-tab', d.tab );
		$$( '.om-ins-banner.ok' ).forEach( function ( b ) {
			b.parentNode.removeChild( b );
		} );
		view.innerHTML = d.html;
		navIn = $( '.om-ins-nav-in' );
		if ( navIn ) {
			navIn.scrollLeft = navX;
		}
		navIntoView();
		initView();
	}

	/**
	 * Load an address into the page. opts: push (new history entry), pop
	 * (Back/Forward), fresh (skip kept results), y (scroll to), focus
	 * ('view' to land on the new content).
	 */
	function go( href, opts ) {
		opts = opts || {};
		var my = ++seq;
		var from = opts.focus || focusKey( document.activeElement );
		if ( opts.push ) {
			window.history.replaceState( { omIns: 1, y: window.pageYOffset }, '' );
		}
		closePicker();
		closeReport();
		hideTips();
		setBusy( true );
		return fetchView( href, opts.fresh ).then(
			function ( d ) {
				if ( my !== seq ) {
					return;
				}
				if ( opts.push ) {
					window.history.pushState( { omIns: 1, y: 0 }, '', clean( href ) );
				} else if ( ! opts.pop ) {
					window.history.replaceState( { omIns: 1, y: window.pageYOffset }, '', clean( href ) );
				}
				show( d );
				setBusy( false );
				if ( 'number' === typeof opts.y ) {
					window.scrollTo( 0, opts.y );
				} else if ( opts.push ) {
					scrollToStart();
				}
				restoreFocus( from );
				if ( opts.push ) {
					announce( sectionName() );
				}
			},
			function ( err ) {
				if ( my !== seq ) {
					return;
				}
				setBusy( false );
				if ( ( err && err.stale ) || opts.pop ) {
					window.location.href = clean( href );
					return;
				}
				toast( i18n.failed, true );
			}
		);
	}

	window.addEventListener( 'popstate', function ( e ) {
		var st = e.state || {};
		closeDrawer( true );
		go( window.location.href, { pop: true, y: 'number' === typeof st.y ? st.y : 0 } );
	} );

	function refreshAll() {
		cache = {};
		go( window.location.href, { fresh: true } );
		livePoll();
	}

	/* ---------- Period menu ---------- */

	function picker() {
		var wrap = $( '[data-om-ins-picker]' );
		return wrap ? { wrap: wrap, btn: $( '[data-om-ins-picker-btn]', wrap ), pop: $( '[data-om-ins-pop]', wrap ) } : null;
	}

	function openPicker() {
		var p = picker();
		if ( ! p ) {
			return;
		}
		closeReport();
		p.pop.hidden = false;
		p.btn.setAttribute( 'aria-expanded', 'true' );
		var here = $( '.om-ins-presets [aria-current="true"]', p.pop ) || $( '.om-ins-presets a', p.pop );
		if ( here ) {
			here.focus();
		}
	}

	function closePicker( refocus ) {
		var p = picker();
		if ( ! p || p.pop.hidden ) {
			return;
		}
		p.pop.hidden = true;
		p.btn.setAttribute( 'aria-expanded', 'false' );
		if ( refocus ) {
			p.btn.focus();
		}
	}

	document.addEventListener( 'click', function ( e ) {
		var p = picker();
		if ( p && ! p.pop.hidden && ! p.wrap.contains( e.target ) ) {
			closePicker();
		}
	} );
	app.addEventListener( 'focusout', function ( e ) {
		var p = picker();
		if ( p && ! p.pop.hidden && e.relatedTarget && ! p.wrap.contains( e.relatedTarget ) ) {
			closePicker();
		}
	} );

	/* ---------- The PDF report ---------- */

	var reportBusy = false;
	var reportNext = null;

	function report() {
		var wrap = $( '[data-om-ins-report]' );
		return wrap
			? {
					wrap: wrap,
					btn: $( '[data-om-ins-report-btn]', wrap ),
					pop: $( '[data-om-ins-report-pop]', wrap ),
					dl: $( '[data-om-ins-report-dl]', wrap ),
					names: $( '[data-om-ins-report-names]', wrap ),
			  }
			: null;
	}

	// Whether names go in the report: remembered, and carried in the download address.
	function namesChoice( changed ) {
		var r = report();
		if ( ! r || ! r.names || ! r.dl ) {
			return;
		}
		if ( changed ) {
			keep( 'local', 'omInsReportNames', r.names.checked ? '1' : '0' );
		} else {
			r.names.checked = '0' !== keep( 'local', 'omInsReportNames' );
		}
		var u = new URL( r.dl.href, window.location.href );
		u.searchParams.set( 'names', r.names.checked ? '1' : '0' );
		r.dl.href = u.href;
	}

	function openReport() {
		var r = report();
		if ( ! r ) {
			return;
		}
		closePicker();
		r.pop.hidden = false;
		r.btn.setAttribute( 'aria-expanded', 'true' );
		r.dl.focus();
	}

	function closeReport( refocus ) {
		var r = report();
		if ( ! r || r.pop.hidden ) {
			return;
		}
		r.pop.hidden = true;
		r.btn.setAttribute( 'aria-expanded', 'false' );
		if ( refocus ) {
			r.btn.focus();
		}
	}

	/**
	 * Fetch the PDF and hand it to the browser as a download, with a busy
	 * state meanwhile and a message when it's done or didn't work. (Without
	 * this script the button is an ordinary download link.)
	 */
	function downloadReport( r ) {
		if ( reportBusy ) {
			return;
		}
		var href = r.dl.href;
		var label = $( 'span', r.dl );
		var was = label ? label.textContent : '';
		reportBusy = true;
		r.dl.classList.add( 'is-busy' );
		r.dl.setAttribute( 'aria-disabled', 'true' );
		r.btn.classList.add( 'is-busy' );
		if ( label ) {
			label.textContent = i18n.making || was;
		}
		announce( i18n.making || '' );
		function done( ok ) {
			reportBusy = false;
			r.dl.classList.remove( 'is-busy' );
			r.dl.removeAttribute( 'aria-disabled' );
			r.btn.classList.remove( 'is-busy' );
			if ( label ) {
				label.textContent = was;
			}
			if ( ok ) {
				closeReport( true );
			}
			if ( null !== reportNext ) {
				// The period changed meanwhile: now the button can follow it.
				var had = r.wrap.contains( document.activeElement );
				$( '[data-om-ins-reportwrap]' ).innerHTML = reportNext;
				reportNext = null;
				namesChoice();
				var btn = had ? $( '[data-om-ins-report-btn]' ) : null;
				if ( btn ) {
					btn.focus();
				}
			}
		}
		fetch( href, { credentials: 'same-origin' } )
			.then( function ( res ) {
				var type = res.headers.get( 'Content-Type' ) || '';
				if ( 403 === res.status ) {
					var old = new Error( 'old' );
					old.old = true;
					throw old;
				}
				if ( ! res.ok || -1 === type.indexOf( 'application/pdf' ) ) {
					throw new Error( 'report' );
				}
				var m = /filename="?([^";]+)"?/i.exec( res.headers.get( 'Content-Disposition' ) || '' );
				return res.blob().then( function ( blob ) {
					return { blob: blob, name: m ? m[ 1 ] : 'insights-report.pdf' };
				} );
			} )
			.then( function ( file ) {
				// Close the menu first (focus back on its button), then save the file.
				done( true );
				var url = URL.createObjectURL( file.blob );
				var a = document.createElement( 'a' );
				a.href = url;
				a.download = file.name;
				a.hidden = true;
				document.body.appendChild( a );
				a.click();
				document.body.removeChild( a );
				window.setTimeout( function () {
					URL.revokeObjectURL( url );
				}, 60000 );
				toast( i18n.reportDone );
			} )
			.catch( function ( err ) {
				done( false );
				toast( err && err.old ? i18n.reportOld : i18n.reportFail, true );
			} );
	}

	document.addEventListener( 'click', function ( e ) {
		var r = report();
		if ( r && ! r.pop.hidden && ! r.wrap.contains( e.target ) ) {
			closeReport();
		}
	} );
	app.addEventListener( 'focusout', function ( e ) {
		var r = report();
		if ( r && ! r.pop.hidden && e.relatedTarget && ! r.wrap.contains( e.relatedTarget ) ) {
			closeReport();
		}
	} );

	/* ---------- The time chart ---------- */

	var chart = null;
	var compare = '0' !== keep( 'local', 'omInsCompare' );
	var resizeObs = null;

	// Round steps (4 lines or fewer): 1, 2, 2.5, 5 × 10ⁿ; for time 15s, 30s, 1m and so on.
	function scaleFor( max, kind ) {
		var step;
		if ( max <= 0 ) {
			step = 't' === kind ? 15 : 1;
		} else if ( 't' === kind ) {
			var raw = max / 4;
			step = [ 5, 10, 15, 20, 30, 60, 120, 180, 300, 600, 900, 1200, 1800, 3600, 7200, 10800 ].filter( function ( s ) {
				return s >= raw;
			} )[ 0 ] || Math.ceil( raw / 3600 ) * 3600;
		} else {
			var raw2 = max / 4;
			var mag = Math.pow( 10, Math.floor( Math.log( raw2 ) / Math.LN10 ) );
			var norm = raw2 / mag;
			// 2.5 only where it stays a whole number (25, 250) or one decimal (2.5%).
			var quarter = norm <= 2.5 && ( 'p' === kind ? mag >= 1 : mag >= 10 );
			step = ( norm <= 1 ? 1 : norm <= 2 ? 2 : quarter ? 2.5 : norm <= 5 ? 5 : 10 ) * mag;
			if ( 'n' === kind ) {
				step = Math.max( 1, Math.round( step ) );
			}
		}
		var count = max <= 0 ? 4 : Math.max( 1, Math.ceil( max / step - 1e-9 ) );
		var ticks = [];
		for ( var i = 0; i <= count; i++ ) {
			ticks.push( Math.round( i * step * 1000 ) / 1000 );
		}
		return { max: count * step, ticks: ticks };
	}

	// A smooth line that never overshoots the numbers (monotone cubic), one piece per gap.
	function curve( pts ) {
		var n = pts.length;
		var s = [];
		var t = [];
		var out = [];
		var i;
		if ( n < 2 ) {
			return out;
		}
		for ( i = 0; i < n - 1; i++ ) {
			var w = pts[ i + 1 ][ 0 ] - pts[ i ][ 0 ];
			s[ i ] = w ? ( pts[ i + 1 ][ 1 ] - pts[ i ][ 1 ] ) / w : 0;
		}
		t[ 0 ] = s[ 0 ];
		t[ n - 1 ] = s[ n - 2 ];
		for ( i = 1; i < n - 1; i++ ) {
			t[ i ] = s[ i - 1 ] * s[ i ] <= 0 ? 0 : 2 / ( 1 / s[ i - 1 ] + 1 / s[ i ] );
		}
		for ( i = 0; i < n - 1; i++ ) {
			var dx = ( pts[ i + 1 ][ 0 ] - pts[ i ][ 0 ] ) / 3;
			out.push( 'C' + r1( pts[ i ][ 0 ] + dx ) + ',' + r1( pts[ i ][ 1 ] + dx * t[ i ] ) + ' ' + r1( pts[ i + 1 ][ 0 ] - dx ) + ',' + r1( pts[ i + 1 ][ 1 ] - dx * t[ i + 1 ] ) + ' ' + r1( pts[ i + 1 ][ 0 ] ) + ',' + r1( pts[ i + 1 ][ 1 ] ) );
		}
		return out;
	}

	function moveTo( p ) {
		return 'M' + r1( p[ 0 ] ) + ',' + r1( p[ 1 ] );
	}

	function has( list, i ) {
		return list && null !== list[ i ] && undefined !== list[ i ];
	}

	// Points 0..count-1 that have a value: runs of whole ones (each drawn as one line) and,
	// apart, the ones cut short.
	function pieces( count, present, cutShort, at ) {
		var runs = [];
		var loose = [];
		var run = [];
		for ( var k = 0; k < count; k++ ) {
			if ( ! present( k ) || cutShort( k ) ) {
				if ( run.length ) {
					runs.push( run );
					run = [];
				}
				if ( present( k ) ) {
					loose.push( at( k ) );
				}
				continue;
			}
			run.push( at( k ) );
		}
		if ( run.length ) {
			runs.push( run );
		}
		return { runs: runs, loose: loose };
	}

	function initChart() {
		if ( resizeObs ) {
			resizeObs.disconnect();
			resizeObs = null;
		}
		chart = null;
		var card = $( '[data-om-ins-chartcard]', view );
		var json = card && $( '[data-om-ins-json]', card );
		if ( ! json ) {
			return;
		}
		var data;
		try {
			data = JSON.parse( json.textContent );
		} catch ( e ) {
			return;
		}
		if ( ! data || ! data.m || ! data.labels ) {
			return;
		}
		var plot = $( '[data-om-ins-plot]', card );
		chart = { card: card, plot: plot, data: data, metric: data.m.leads ? 'leads' : 'visitors', idx: -1 };
		moneyFmt = data.money || moneyFmt;
		var menu = $( '[data-om-ins-metric-select]', card );
		if ( menu && data.m[ menu.value ] ) {
			chart.metric = menu.value;
		}
		plot.setAttribute( 'tabindex', '0' );
		plot.style.touchAction = 'pan-y';
		var help = document.createElement( 'span' );
		help.className = 'screen-reader-text';
		help.id = 'om-ins-chart-help';
		help.textContent = i18n.chartKeys || '';
		card.appendChild( help );
		plot.setAttribute( 'aria-describedby', 'om-ins-chart-help' );
		chart.say = document.createElement( 'p' );
		chart.say.className = 'screen-reader-text';
		chart.say.setAttribute( 'aria-live', 'polite' );
		card.appendChild( chart.say );

		plot.addEventListener( 'pointermove', onPlotPointer );
		plot.addEventListener( 'pointerdown', onPlotPointer );
		plot.addEventListener( 'pointerleave', onPlotLeave );
		plot.addEventListener( 'keydown', onPlotKey );
		plot.addEventListener( 'focus', onPlotFocus );
		plot.addEventListener( 'blur', hideHover );

		var saved = keep( 'local', 'omInsMetric2' );
		if ( saved && /^[a-z]+$/.test( saved ) && data.m[ saved ] ) {
			chart.metric = saved;
		}
		selectKpi( chart.metric );
		applyCompare();
		sparks();
		draw( true );
		if ( window.ResizeObserver ) {
			var frame = 0;
			var width = plot.clientWidth;
			resizeObs = new window.ResizeObserver( function () {
				if ( plot.clientWidth === width ) {
					return;
				}
				width = plot.clientWidth;
				window.cancelAnimationFrame( frame );
				frame = window.requestAnimationFrame( function () {
					draw( false );
				} );
			} );
			resizeObs.observe( plot );
		}
	}

	window.addEventListener( 'resize', function () {
		hideTips();
		if ( ! window.ResizeObserver && chart ) {
			draw( false );
		}
	} );

	function draw( animate ) {
		if ( ! chart || ! chart.plot.isConnected ) {
			return;
		}
		var c = chart;
		var d = c.data;
		var plot = c.plot;
		var W = plot.clientWidth;
		var H = plot.clientHeight;
		if ( W < 60 || H < 60 || ! d.m[ c.metric ] ) {
			return;
		}
		var kind = ( d.kinds && d.kinds[ c.metric ] ) || 'n';
		var cur = d.m[ c.metric ].c || [];
		var prev = d.m[ c.metric ].p || [];
		var n = d.labels.length;
		var cut = Math.max( 0, Math.min( n, +d.cut || n ) );
		var i;

		var max = 0;
		for ( i = 0; i < n; i++ ) {
			if ( i < cut ) {
				max = Math.max( max, +cur[ i ] || 0 );
			}
			if ( compare && has( prev, i ) ) {
				max = Math.max( max, +prev[ i ] || 0 );
			}
		}
		var scale = scaleFor( max, kind );
		var names = scale.ticks.map( function ( v ) {
			return axis( kind, v );
		} );
		var longest = names.reduce( function ( a, s ) {
			return Math.max( a, s.length );
		}, 0 );
		var left = Math.max( 30, Math.round( longest * 6.8 ) + 14 );
		var right = 12;
		var top = 10;
		var bottom = 28;
		var pw = W - left - right;
		var ph = H - top - bottom;
		var x = function ( k ) {
			return n > 1 ? left + ( pw * k ) / ( n - 1 ) : left + pw / 2;
		};
		var y = function ( v ) {
			return top + ph - ( ph * ( +v || 0 ) ) / scale.max;
		};
		c.x = x;
		c.y = y;
		c.n = n;
		c.cut = cut;
		c.kind = kind;
		c.top = top;
		c.ph = ph;

		var root = svg( 'svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true', focusable: 'false' } );
		// The fill under the line fades out; its colour comes from the stylesheet (the brand's gold).
		var grad = svg( 'linearGradient', { id: 'om-ins-fill', x1: '0', y1: '0', x2: '0', y2: '1' }, svg( 'defs', {}, root ) );
		svg( 'stop', { class: 'f0', offset: '0' }, grad );
		svg( 'stop', { class: 'f1', offset: '1' }, grad );

		// Hairline grid, amounts on the left.
		scale.ticks.forEach( function ( v, k ) {
			var yy = Math.round( y( v ) ) + 0.5;
			if ( k > 0 ) {
				svg( 'line', { class: 'g', x1: left, x2: W - right, y1: yy, y2: yy }, root );
			}
			svg( 'text', { class: 't', x: left - 10, y: yy + 4, 'text-anchor': 'end' }, root ).textContent = names[ k ];
		} );
		var baseY = Math.round( y( 0 ) ) + 0.5;
		svg( 'line', { class: 'base', x1: left, x2: W - right, y1: baseY, y2: baseY }, root );

		// Dates along the bottom, spaced so they never touch.
		var room = Math.max( 2, Math.floor( pw / 68 ) );
		var stride = Math.max( 1, Math.ceil( n / room ) );
		for ( i = 0; i < n; i += stride ) {
			var label = String( d.labels[ i ] );
			var lx = x( i );
			var half = ( label.length * 6.4 ) / 2;
			var anchor = 'middle';
			if ( n > 1 && lx - half < left - 6 ) {
				anchor = 'start';
				lx = Math.max( lx, left - 6 );
			} else if ( lx + half > W ) {
				anchor = 'end';
			}
			svg( 'text', { class: 't', x: r1( lx ), y: H - 8, 'text-anchor': anchor }, root ).textContent = label;
		}

		// Weeks or months cut short by the period's ends, and today (not over yet), stand
		// apart as hollow dots instead of pulling the line down as if the numbers had fallen.
		var partial = !! d.partial && cut > 0;
		var cutC = function ( k ) {
			return !! ( d.short && d.short[ k ] ) || ( partial && k === cut - 1 );
		};
		var cutP = function ( k ) {
			return !! ( d.pshort && d.pshort[ k ] );
		};
		var lines = [];
		var areas = [];
		var tail = null;
		if ( compare ) {
			var pp = pieces( n, function ( k ) {
				return has( prev, k );
			}, cutP, function ( k ) {
				return [ x( k ), y( prev[ k ] ) ];
			} );
			pp.runs.forEach( function ( run ) {
				if ( run.length > 1 ) {
					svg( 'path', { class: 'ln prev', d: moveTo( run[ 0 ] ) + curve( run ).join( '' ) }, root );
				} else {
					svg( 'circle', { class: 'dot prev lone', cx: r1( run[ 0 ][ 0 ] ), cy: r1( run[ 0 ][ 1 ] ), r: 3 }, root );
				}
			} );
			pp.loose.forEach( function ( pt ) {
				svg( 'circle', { class: 'dot pshort', cx: r1( pt[ 0 ] ), cy: r1( pt[ 1 ] ), r: 3.5 }, root );
			} );
		}
		var pc = pieces( cut, function () {
			return true;
		}, cutC, function ( k ) {
			return [ x( k ), y( cur[ k ] ) ];
		} );
		pc.runs.forEach( function ( run ) {
			if ( run.length > 1 ) {
				var segs = curve( run );
				var last = run[ run.length - 1 ];
				areas.push( svg( 'path', { class: 'area', d: moveTo( run[ 0 ] ) + segs.join( '' ) + 'L' + r1( last[ 0 ] ) + ',' + baseY + 'L' + r1( run[ 0 ][ 0 ] ) + ',' + baseY + 'Z' }, root ) );
				lines.push( svg( 'path', { class: 'ln cur', d: moveTo( run[ 0 ] ) + segs.join( '' ) }, root ) );
			} else {
				svg( 'circle', { class: 'dot cur', cx: r1( run[ 0 ][ 0 ] ), cy: r1( run[ 0 ][ 1 ] ), r: 4.5 }, root );
			}
		} );
		if ( pc.loose.length ) {
			tail = svg( 'g', { class: 'part' }, root );
			pc.loose.forEach( function ( pt ) {
				svg( 'circle', { class: 'dot part', cx: r1( pt[ 0 ] ), cy: r1( pt[ 1 ] ), r: 4.5 }, tail );
			} );
			if ( partial ) {
				var px = x( cut - 1 );
				var py = y( cur[ cut - 1 ] );
				var below = py < top + 22;
				var edge = px > W - right - 40;
				svg( 'text', { class: 't part', x: r1( px - ( edge ? 2 : 0 ) ), y: r1( below ? py + 20 : py - 11 ), 'text-anchor': edge ? 'end' : 'middle' }, tail ).textContent = i18n.soFar || '';
			}
		}

		c.cross = svg( 'line', { class: 'cross', x1: 0, x2: 0, y1: top, y2: top + ph, visibility: 'hidden' }, root );
		c.dotPrev = svg( 'circle', { class: 'dot prev', r: 4, cx: 0, cy: 0, visibility: 'hidden' }, root );
		c.dotCur = svg( 'circle', { class: 'dot cur', r: 4.5, cx: 0, cy: 0, visibility: 'hidden' }, root );

		plot.textContent = '';
		plot.appendChild( root );

		if ( animate && ! reduce && lines.length && lines[ 0 ].getTotalLength ) {
			lines.forEach( function ( line ) {
				var len = line.getTotalLength();
				line.style.strokeDasharray = len + ' ' + len;
				line.style.strokeDashoffset = String( len );
			} );
			areas.forEach( function ( area ) {
				area.style.opacity = '0';
			} );
			if ( tail ) {
				tail.style.opacity = '0';
			}
			lines[ 0 ].getBoundingClientRect(); // Start from the hidden state.
			lines.forEach( function ( line ) {
				line.style.transition = 'stroke-dashoffset 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)';
				line.style.strokeDashoffset = '0';
			} );
			areas.forEach( function ( area ) {
				area.style.transition = 'opacity 0.5s ease 0.2s';
				area.style.opacity = '1';
			} );
			if ( tail ) {
				tail.style.transition = 'opacity 0.3s ease 0.6s';
				tail.style.opacity = '1';
			}
			window.setTimeout( function () {
				lines.forEach( function ( line ) {
					line.style.strokeDasharray = '';
					line.style.strokeDashoffset = '';
					line.style.transition = '';
				} );
			}, 800 );
		}
		if ( c.idx >= 0 ) {
			showAt( c.idx, false );
		}
	}

	function hideHover() {
		chartTip.hidden = true;
		if ( ! chart ) {
			return;
		}
		window.clearTimeout( chart.leaveTimer );
		chart.idx = -1;
		[ chart.cross, chart.dotCur, chart.dotPrev ].forEach( function ( el ) {
			if ( el ) {
				el.setAttribute( 'visibility', 'hidden' );
			}
		} );
	}

	function tipRow( cls, value, label ) {
		var row = document.createElement( 'span' );
		row.className = 'r' + ( cls ? ' ' + cls : '' );
		row.appendChild( document.createElement( 'i' ) );
		var b = document.createElement( 'b' );
		b.textContent = value;
		row.appendChild( b );
		var s = document.createElement( 'span' );
		s.textContent = label;
		row.appendChild( s );
		return row;
	}

	// The crosshair, both dots and the tooltip at point i.
	function showAt( i, speak ) {
		var c = chart;
		if ( ! c || ! c.cross ) {
			return;
		}
		var d = c.data;
		var last = compare ? c.n - 1 : Math.max( 0, c.cut - 1 );
		i = Math.max( 0, Math.min( last, i ) );
		c.idx = i;
		var cur = d.m[ c.metric ].c || [];
		var prev = d.m[ c.metric ].p || [];
		var hasCur = i < c.cut;
		var hasPrev = compare && has( prev, i );
		var xx = Math.round( c.x( i ) ) + 0.5;
		c.cross.setAttribute( 'x1', xx );
		c.cross.setAttribute( 'x2', xx );
		c.cross.setAttribute( 'visibility', 'visible' );
		[ [ c.dotCur, hasCur, cur ], [ c.dotPrev, hasPrev, prev ] ].forEach( function ( set ) {
			set[ 0 ].setAttribute( 'visibility', set[ 1 ] ? 'visible' : 'hidden' );
			if ( set[ 1 ] ) {
				set[ 0 ].setAttribute( 'cx', r1( c.x( i ) ) );
				set[ 0 ].setAttribute( 'cy', r1( c.y( set[ 2 ][ i ] ) ) );
			}
		} );

		var head = String( d.tips[ i ] || '' ) + ( hasCur && d.partial && i === c.cut - 1 ? ' (' + ( i18n.soFar || '' ) + ')' : '' );
		var name = ( d.names && d.names[ c.metric ] ) || '';
		var words = [ head ];
		chartTip.textContent = '';
		var h = document.createElement( 'span' );
		h.className = 'h';
		h.textContent = head;
		chartTip.appendChild( h );
		if ( hasCur ) {
			chartTip.appendChild( tipRow( '', metric( c.kind, cur[ i ] ), name ) );
			words.push( name + ' ' + metric( c.kind, cur[ i ] ) );
		}
		if ( hasPrev ) {
			var when = String( d.ptips[ i ] || i18n.previous || '' );
			chartTip.appendChild( tipRow( 'prev', metric( c.kind, prev[ i ] ), when ) );
			words.push( when + ' ' + metric( c.kind, prev[ i ] ) );
		}
		var diff = hasCur && hasPrev && ! ( d.partial && i === c.cut - 1 ) ? change( cur[ i ], prev[ i ], d.vs ) : '';
		if ( diff ) {
			var line = document.createElement( 'span' );
			line.className = 'c';
			line.textContent = diff;
			chartTip.appendChild( line );
			words.push( diff.replace( /^[▲▼] /, '' ) );
		}
		chartTip.hidden = false;

		// Beside the point; to its left near the right edge.
		var box = c.plot.getBoundingClientRect();
		var px = box.left + c.x( i );
		var py = box.top + ( hasCur ? c.y( cur[ i ] ) : hasPrev ? c.y( prev[ i ] ) : c.top + c.ph / 2 );
		var w = chartTip.offsetWidth;
		var ht = chartTip.offsetHeight;
		var lx = px + 16;
		if ( lx + w > window.innerWidth - 8 ) {
			lx = px - 16 - w;
		}
		chartTip.style.left = Math.round( Math.max( 8, lx ) ) + 'px';
		chartTip.style.top = Math.round( Math.max( 8, Math.min( py - ht / 2, window.innerHeight - ht - 8 ) ) ) + 'px';
		if ( speak && c.say ) {
			c.say.textContent = words.join( ', ' );
		}
	}

	function onPlotPointer( e ) {
		if ( ! chart || ! chart.x ) {
			return;
		}
		window.clearTimeout( chart.leaveTimer );
		var box = chart.plot.getBoundingClientRect();
		var px = e.clientX - box.left;
		var i = 0;
		if ( chart.n > 1 ) {
			var step = chart.x( 1 ) - chart.x( 0 );
			i = Math.round( ( px - chart.x( 0 ) ) / step );
		}
		if ( i !== chart.idx || chartTip.hidden ) {
			showAt( i, false );
		}
	}

	function onPlotLeave( e ) {
		if ( ! chart ) {
			return;
		}
		if ( e && 'touch' === e.pointerType ) {
			// A finger lifted: leave the numbers up a moment to read.
			window.clearTimeout( chart.leaveTimer );
			chart.leaveTimer = window.setTimeout( hideHover, 2500 );
			return;
		}
		hideHover();
	}

	function onPlotKey( e ) {
		if ( ! chart || ! chart.x ) {
			return;
		}
		var i = chart.idx < 0 ? chart.cut - 1 : chart.idx;
		switch ( e.key ) {
			case 'ArrowLeft':
				i--;
				break;
			case 'ArrowRight':
				i++;
				break;
			case 'Home':
				i = 0;
				break;
			case 'End':
				i = compare ? chart.n - 1 : chart.cut - 1;
				break;
			case 'Escape':
				hideHover();
				return;
			default:
				return;
		}
		e.preventDefault();
		showAt( i, true );
	}

	function onPlotFocus() {
		var keyboard = true;
		try {
			keyboard = chart.plot.matches( ':focus-visible' );
		} catch ( err ) {}
		if ( chart && keyboard ) {
			showAt( chart.idx < 0 ? chart.cut - 1 : chart.idx, true );
		}
	}

	// The chart's numbers as a table (when the interval changes).
	function buildTable() {
		var holder = chart && $( '[data-om-ins-table]', chart.card );
		if ( ! holder ) {
			return;
		}
		var d = chart.data;
		var cols = [ 'leads', 'bookings', 'conv', 'visitors', 'visits', 'designs' ];
		var wrap = document.createElement( 'div' );
		wrap.className = 'om-ins-scroll';
		var table = document.createElement( 'table' );
		table.className = 'om-ins-table';
		var hr = table.createTHead().insertRow();
		var th = document.createElement( 'th' );
		th.scope = 'col';
		th.textContent = i18n.period || '';
		hr.appendChild( th );
		cols.forEach( function ( k ) {
			var h = document.createElement( 'th' );
			h.scope = 'col';
			h.className = 'num';
			h.textContent = ( d.names && d.names[ k ] ) || k;
			hr.appendChild( h );
		} );
		var body = table.createTBody();
		for ( var i = Math.min( d.labels.length, d.cut ) - 1; i >= 0; i-- ) {
			var tr = body.insertRow();
			var rh = document.createElement( 'th' );
			rh.scope = 'row';
			rh.textContent = d.tips[ i ];
			tr.appendChild( rh );
			cols.forEach( function ( k ) {
				var td = tr.insertCell();
				td.className = 'num';
				td.textContent = metric( d.kinds[ k ], d.m[ k ] ? d.m[ k ].c[ i ] : 0 );
			} );
		}
		wrap.appendChild( table );
		holder.textContent = '';
		holder.appendChild( wrap );
	}

	// The small lines in the headline numbers.
	function sparks() {
		if ( ! chart ) {
			return;
		}
		var d = chart.data;
		var n = d.labels.length;
		var cut = Math.max( 0, Math.min( n, +d.cut || n ) );
		var W = 120;
		var H = 34;
		$$( '[data-om-ins-spark]', view ).forEach( function ( holder ) {
			var key = holder.getAttribute( 'data-om-ins-spark' );
			if ( ! d.m[ key ] ) {
				return;
			}
			// Only whole days, weeks and months: today, and weeks or months cut short, are left out.
			var whole = function ( list, cutShort, upto ) {
				var out = [];
				for ( var k = 0; k < upto; k++ ) {
					if ( has( list, k ) && ! cutShort( k ) ) {
						out.push( [ k, +list[ k ] || 0 ] );
					}
				}
				return out;
			};
			var cur = whole( d.m[ key ].c || [], function ( k ) {
				return !! ( d.short && d.short[ k ] ) || ( !! d.partial && k === cut - 1 );
			}, cut );
			var prev = compare ? whole( d.m[ key ].p || [], function ( k ) {
				return !! ( d.pshort && d.pshort[ k ] );
			}, n ) : [];
			var max = 0;
			cur.concat( prev ).forEach( function ( pt ) {
				max = Math.max( max, pt[ 1 ] );
			} );
			max = max || 1;
			var X = function ( i ) {
				return n > 1 ? ( W * i ) / ( n - 1 ) : W / 2;
			};
			var Y = function ( v ) {
				return 2 + ( H - 4 ) * ( 1 - v / max );
			};
			var path = function ( pts ) {
				return pts.map( function ( pt, i ) {
					return ( i ? 'L' : 'M' ) + r1( X( pt[ 0 ] ) ) + ',' + r1( Y( pt[ 1 ] ) );
				} ).join( '' );
			};
			var s = svg( 'svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' } );
			if ( prev.length > 1 ) {
				svg( 'path', { class: 'prev', d: path( prev ), 'vector-effect': 'non-scaling-stroke' }, s );
			}
			if ( cur.length > 1 ) {
				svg( 'path', { class: 'area', d: path( cur ) + 'L' + r1( X( cur[ cur.length - 1 ][ 0 ] ) ) + ',' + H + 'L' + r1( X( cur[ 0 ][ 0 ] ) ) + ',' + H + 'Z' }, s );
				svg( 'path', { class: 'cur', d: path( cur ), 'vector-effect': 'non-scaling-stroke' }, s );
			}
			holder.textContent = '';
			holder.appendChild( s );
		} );
	}

	// The measure in the chart: its tile shows pressed, the menu shows its name.
	function selectKpi( key ) {
		$$( '[data-om-ins-metric]', view ).forEach( function ( b ) {
			b.setAttribute( 'aria-pressed', b.getAttribute( 'data-om-ins-metric' ) === key ? 'true' : 'false' );
		} );
		var menu = chart && $( '[data-om-ins-metric-select]', chart.card );
		if ( menu && menu.value !== key ) {
			menu.value = key;
		}
		if ( chart ) {
			chart.metric = key;
			if ( chart.data.names && chart.data.names[ key ] ) {
				chart.plot.setAttribute( 'aria-label', chart.data.names[ key ] );
			}
		}
	}

	function pickMetric( key ) {
		if ( ! chart || ! chart.data.m[ key ] || key === chart.metric ) {
			selectKpi( key );
			return;
		}
		selectKpi( key );
		keep( 'local', 'omInsMetric2', key );
		hideHover();
		draw( true );
	}

	function applyCompare() {
		var box = $( '[data-om-ins-compare]' );
		if ( box ) {
			box.checked = compare;
		}
		var key = chart && $( '[data-om-ins-legend-prev]', chart.card );
		if ( key ) {
			key.hidden = ! compare;
		}
	}

	// Another interval (hours, days, weeks, months): only the chart reloads.
	var intervalSeq = 0;

	function markInterval( c, unit ) {
		$$( '[data-om-ins-interval]', c.card ).forEach( function ( l ) {
			if ( l.getAttribute( 'data-om-ins-interval' ) === unit ) {
				l.setAttribute( 'aria-current', 'true' );
			} else {
				l.removeAttribute( 'aria-current' );
			}
		} );
	}

	function switchInterval( link ) {
		if ( ! chart ) {
			go( link.href, { push: true } );
			return;
		}
		var my = ++intervalSeq;
		var c = chart;
		c.plot.classList.add( 'is-switching' );
		markInterval( c, link.getAttribute( 'data-om-ins-interval' ) );
		request( 'om_ins_chart', pairsOf( link.href ) ).then(
			function ( d ) {
				if ( my !== intervalSeq || c !== chart ) {
					return;
				}
				c.data = d;
				moneyFmt = d.money || moneyFmt;
				window.history.replaceState( window.history.state, '', clean( link.href ) );
				retarget( d.unit );
				buildTable();
				sparks();
				hideHover();
				draw( true );
			},
			function ( err ) {
				if ( my !== intervalSeq ) {
					return;
				}
				if ( err && err.stale ) {
					window.location.href = clean( link.href );
					return;
				}
				markInterval( c, c.data.unit );
				toast( i18n.failed, true );
			}
		).then( function () {
			if ( my === intervalSeq ) {
				c.plot.classList.remove( 'is-switching' );
			}
		} );
	}

	// Links that stay on this overview keep the chosen interval (the period presets start afresh).
	function retarget( unit ) {
		$$( 'a[data-om-ins-nav], a[data-om-ins-refresh]' ).forEach( function ( a ) {
			if ( a.hasAttribute( 'data-om-ins-range' ) ) {
				return;
			}
			var u = new URL( a.href, window.location.href );
			var q = u.searchParams;
			if ( ( q.get( 'tab' ) || 'overview' ) !== 'overview' || q.has( 'visit' ) || q.has( 'visitor' ) ) {
				return;
			}
			q.set( 'interval', unit );
			a.href = u.href;
		} );
	}

	/* ---------- Panels with small tabs ---------- */

	function selectSub( btn, remember ) {
		var list = btn.parentNode;
		var tabs = $$( '[role="tab"]', list );
		tabs.forEach( function ( b ) {
			var on = b === btn;
			b.setAttribute( 'aria-selected', on ? 'true' : 'false' );
			b.tabIndex = on ? 0 : -1;
			var p = document.getElementById( b.getAttribute( 'aria-controls' ) );
			if ( p ) {
				p.hidden = ! on;
			}
		} );
		if ( list.scrollWidth > list.clientWidth ) {
			var a = btn.getBoundingClientRect();
			var b = list.getBoundingClientRect();
			if ( a.left < b.left ) {
				list.scrollLeft -= b.left - a.left + 8;
			} else if ( a.right > b.right ) {
				list.scrollLeft += a.right - b.right + 8;
			}
		}
		var panel = closest( btn, '[data-om-ins-panel]' );
		if ( remember && panel ) {
			keep( 'session', 'omInsSub:' + panel.getAttribute( 'data-om-ins-panel' ), String( tabs.indexOf( btn ) ) );
		}
	}

	/* ---------- Tables: sort, find, show all ---------- */

	function tableState( table ) {
		if ( ! table.omIns ) {
			table.omIns = { q: '', open: false, cap: parseInt( table.getAttribute( 'data-om-ins-cap' ) || '0', 10 ) || 0 };
		}
		return table.omIns;
	}

	// Rows matching "Find"; past the cap (until "Show all"), the rest wait.
	function refreshRows( table ) {
		var st = tableState( table );
		var body = table.tBodies[ 0 ];
		if ( ! body ) {
			return;
		}
		var shown = 0;
		var capped = false;
		Array.prototype.forEach.call( body.rows, function ( row ) {
			var match = ! st.q || ( row.textContent || '' ).toLowerCase().indexOf( st.q ) !== -1;
			var over = false;
			if ( match ) {
				shown++;
				over = st.cap > 0 && ! st.open && ! st.q && shown > st.cap;
				capped = capped || over;
			}
			row.hidden = ! match || over;
		} );
		var wrap = closest( table, '.om-ins-scroll' );
		var more = wrap && wrap.nextElementSibling;
		if ( more && more.classList.contains( 'om-ins-showall' ) ) {
			more.hidden = ! capped;
		}
	}

	// A number column's empty cells ("–") have no value and always go last.
	function cellValue( row, index, numeric ) {
		var cell = row.children[ index ];
		if ( ! cell ) {
			return null;
		}
		if ( cell.hasAttribute( 'data-v' ) ) {
			var n = parseFloat( cell.getAttribute( 'data-v' ) );
			return isNaN( n ) ? null : n;
		}
		return numeric ? null : ( cell.textContent || '' ).trim().toLowerCase();
	}

	function sortBy( button ) {
		var th = closest( button, 'th' );
		var table = closest( button, 'table' );
		var body = table && table.tBodies[ 0 ];
		if ( ! th || ! body ) {
			return;
		}
		var index = Array.prototype.indexOf.call( th.parentNode.children, th );
		var rows = Array.prototype.slice.call( body.rows );
		var numeric = rows.some( function ( row ) {
			return row.children[ index ] && row.children[ index ].hasAttribute( 'data-v' );
		} );
		var was = th.getAttribute( 'aria-sort' );
		// Numbers start biggest first, words A to Z.
		var dir = was ? ( 'descending' === was ? 'ascending' : 'descending' ) : numeric ? 'descending' : 'ascending';
		Array.prototype.forEach.call( th.parentNode.children, function ( other ) {
			other.removeAttribute( 'aria-sort' );
		} );
		th.setAttribute( 'aria-sort', dir );
		var sign = 'ascending' === dir ? 1 : -1;
		rows.map( function ( row, i ) {
			return { row: row, v: cellValue( row, index, numeric ), i: i };
		} ).sort( function ( a, b ) {
			if ( null === a.v || null === b.v ) {
				return null === a.v ? ( null === b.v ? a.i - b.i : 1 ) : -1;
			}
			if ( a.v < b.v ) {
				return -sign;
			}
			if ( a.v > b.v ) {
				return sign;
			}
			return a.i - b.i;
		} ).forEach( function ( item ) {
			body.appendChild( item.row );
		} );
		refreshRows( table );
	}

	function showAll( button ) {
		var holder = closest( button, '.om-ins-showall' );
		var table = holder && holder.previousElementSibling && $( 'table', holder.previousElementSibling );
		if ( ! table ) {
			return;
		}
		tableState( table ).open = true;
		refreshRows( table );
		var row = Array.prototype.filter.call( table.tBodies[ 0 ].rows, function ( r ) {
			return ! r.hidden;
		} )[ tableState( table ).cap ];
		var link = row && $( 'a, button', row );
		if ( link ) {
			link.focus( { preventScroll: true } );
		}
	}

	/* ---------- Side panel: one visit, one visitor ---------- */

	var drawer = $( '[data-om-ins-drawer-root]' );
	var drawerBody = drawer && $( '[data-om-ins-drawer-body]', drawer );
	var sheet = drawer && $( '.om-ins-sheet', drawer );
	var drawerFrom = null;
	var drawerSeq = 0;
	var locked = null;

	function lockScroll( on ) {
		var html = document.documentElement;
		if ( on && ! locked ) {
			var gap = window.innerWidth - html.clientWidth;
			locked = { o: html.style.overflow, p: document.body.style.paddingRight };
			html.style.overflow = 'hidden';
			if ( gap > 0 ) {
				document.body.style.paddingRight = gap + 'px';
			}
		} else if ( ! on && locked ) {
			html.style.overflow = locked.o;
			document.body.style.paddingRight = locked.p;
			locked = null;
		}
	}

	function openDrawer( href, opener ) {
		if ( ! drawer ) {
			go( href, { push: true } );
			return;
		}
		var my = ++drawerSeq;
		hideTips();
		if ( drawer.hidden ) {
			drawerFrom = opener || document.activeElement;
			drawer.hidden = false;
			lockScroll( true );
			drawerBody.textContent = '';
			var wait = document.createElement( 'div' );
			wait.className = 'om-ins-skeleton';
			wait.setAttribute( 'aria-label', i18n.loading || '' );
			wait.setAttribute( 'role', 'status' );
			for ( var i = 0; i < 6; i++ ) {
				wait.appendChild( document.createElement( 'span' ) );
			}
			drawerBody.appendChild( wait );
			sheet.focus( { preventScroll: true } );
		}
		if ( ! $( '.om-ins-skeleton', drawerBody ) ) {
			drawerBody.classList.add( 'is-busy' );
		}
		drawerBody.setAttribute( 'aria-busy', 'true' );
		request( 'om_ins_view', pairsOf( href ).concat( [ [ 'frag', 'drawer' ] ] ) ).then(
			function ( d ) {
				if ( my !== drawerSeq || drawer.hidden ) {
					return;
				}
				drawerBody.innerHTML = d.html;
				drawerBody.scrollTop = 0;
				var title = $( '#om-ins-drawer-title', drawerBody );
				if ( title ) {
					title.setAttribute( 'tabindex', '-1' );
					title.focus( { preventScroll: true } );
				}
			},
			function ( err ) {
				if ( my !== drawerSeq ) {
					return;
				}
				if ( err && err.stale ) {
					window.location.href = clean( href );
					return;
				}
				toast( i18n.failed, true );
				if ( ! $( '.om-ins-visitview', drawerBody ) ) {
					closeDrawer();
				}
			}
		).then( function () {
			if ( my === drawerSeq ) {
				drawerBody.classList.remove( 'is-busy' );
				drawerBody.removeAttribute( 'aria-busy' );
			}
		} );
	}

	function closeDrawer( quiet ) {
		if ( ! drawer || drawer.hidden ) {
			return;
		}
		drawerSeq++;
		drawer.hidden = true;
		drawerBody.textContent = '';
		lockScroll( false );
		if ( ! quiet && drawerFrom && drawerFrom.isConnected ) {
			drawerFrom.focus( { preventScroll: true } );
		}
		drawerFrom = null;
	}

	// Keep Tab inside the open panel.
	document.addEventListener( 'keydown', function ( e ) {
		if ( 'Tab' !== e.key || ! drawer || drawer.hidden ) {
			return;
		}
		var items = $$( 'a[href], button:not([disabled]), input:not([disabled]), summary, [tabindex="0"]', sheet ).filter( function ( el ) {
			return el.offsetWidth || el.offsetHeight || el.getClientRects().length;
		} );
		if ( ! items.length ) {
			e.preventDefault();
			return;
		}
		var first = items[ 0 ];
		var last = items[ items.length - 1 ];
		var now = document.activeElement;
		if ( e.shiftKey && ( now === first || now === sheet || ! sheet.contains( now ) ) ) {
			e.preventDefault();
			last.focus();
		} else if ( ! e.shiftKey && ( now === last || ! sheet.contains( now ) ) ) {
			e.preventDefault();
			first.focus();
		}
	} );

	/* ---------- Journeys: more visits ---------- */

	function loadMore( link ) {
		if ( link.getAttribute( 'aria-busy' ) ) {
			return;
		}
		var list = $( '[data-om-ins-visits]', view );
		if ( ! list ) {
			go( link.href, { push: true } );
			return;
		}
		var had = document.activeElement === link;
		var before = list.children.length;
		link.setAttribute( 'aria-busy', 'true' );
		request( 'om_ins_view', pairsOf( link.href ).concat( [ [ 'frag', 'rows' ] ] ) ).then(
			function ( d ) {
				list.insertAdjacentHTML( 'beforeend', d.html );
				var first = list.children[ before ] ? $( 'a', list.children[ before ] ) : null;
				if ( d.next ) {
					link.href = d.next;
				} else {
					var p = closest( link, '.om-ins-loadmore' );
					if ( p ) {
						p.parentNode.removeChild( p );
					}
				}
				if ( first && ( had || ! d.next ) ) {
					first.focus();
				}
			},
			function ( err ) {
				if ( err && err.stale ) {
					window.location.href = clean( link.href );
					return;
				}
				toast( i18n.failed, true );
			}
		).then( function () {
			link.removeAttribute( 'aria-busy' );
		} );
	}

	/* ---------- Who is on the site ---------- */

	var liveTimer = 0;
	var liveBusy = false;
	var liveHover = false;

	function liveSchedule() {
		window.clearTimeout( liveTimer );
		liveTimer = window.setTimeout( livePoll, $( '[data-om-ins-livebody]', view ) ? 10000 : 30000 );
	}

	function livePoll() {
		if ( document.hidden || liveBusy ) {
			liveSchedule();
			return;
		}
		var body = $( '[data-om-ins-livebody]', view );
		liveBusy = true;
		request( 'om_ins_live', body ? [ [ 'body', '1' ] ] : [] ).then(
			function ( d ) {
				var count = $( '[data-om-ins-livecount]' );
				var dot = $( '.om-ins-livechip .om-ins-dot' );
				if ( count ) {
					count.textContent = d.label;
				}
				if ( dot ) {
					dot.classList.toggle( 'on', d.count > 0 );
				}
				// Not while someone is pointing at, or on, a row (it would move under them).
				if ( body && body.isConnected && d.html && ! liveHover && ! body.contains( document.activeElement ) ) {
					body.innerHTML = d.html;
				}
			},
			function () {}
		).then( function () {
			liveBusy = false;
			liveSchedule();
		} );
	}

	app.addEventListener( 'mouseover', function ( e ) {
		liveHover = !! closest( e.target, '[data-om-ins-livebody] .om-ins-visits' );
	} );
	document.documentElement.addEventListener( 'mouseleave', function () {
		liveHover = false;
	} );
	document.addEventListener( 'visibilitychange', function () {
		if ( ! document.hidden ) {
			livePoll();
		}
	} );

	/* ---------- Settings: saved as they change ---------- */

	var savedRadio = {};

	function saveSetting( input ) {
		var row = closest( input, '.om-ins-setting' );
		var box = 'checkbox' === input.type;
		var value = box ? ( input.checked ? '1' : '0' ) : input.value;
		var before = box ? ! input.checked : savedRadio[ input.name ];
		request( 'om_ins_save', [ [ 'name', input.name ], [ 'value', value ] ] ).then(
			function ( d ) {
				if ( ! box ) {
					savedRadio[ input.name ] = d.value;
				}
				var tick = row && $( '[data-om-ins-saved]', row );
				if ( tick ) {
					tick.classList.add( 'show' );
					window.clearTimeout( tick.omInsTimer );
					tick.omInsTimer = window.setTimeout( function () {
						tick.classList.remove( 'show' );
					}, 1800 );
				}
				toast( i18n.saved );
				var policy = $( '[data-om-ins-copytext]', view );
				if ( policy && d.policy ) {
					policy.textContent = d.policy;
				}
				if ( 'om_ins' === d.name ) {
					var off = $( '[data-om-ins-offbanner]' );
					if ( off ) {
						off.hidden = '0' !== d.value;
					}
				}
				cache = {};
			},
			function () {
				if ( box ) {
					input.checked = before;
				} else if ( 'number' === input.type ) {
					input.value = undefined !== before ? before : input.defaultValue;
				} else if ( before ) {
					$$( 'input[type="radio"][data-om-ins-opt]', view ).forEach( function ( r ) {
						if ( r.name === input.name ) {
							r.checked = r.value === before;
						}
					} );
				}
				toast( i18n.notSaved, true );
			}
		);
	}

	var wipeDialog = $( '[data-om-ins-wipe-dialog]' );

	function wipeWord() {
		return ( i18n.typeDelete || 'DELETE' ).toLowerCase();
	}

	if ( wipeDialog ) {
		var wipeInput = $( '[data-om-ins-wipe-word]', wipeDialog );
		var wipeOk = $( '[data-om-ins-wipe-ok]', wipeDialog );
		wipeInput.addEventListener( 'input', function () {
			wipeOk.disabled = wipeInput.value.trim().toLowerCase() !== wipeWord();
		} );
		wipeInput.addEventListener( 'keydown', function ( e ) {
			if ( 'Enter' !== e.key ) {
				return;
			}
			// Enter would press the first button (Cancel): confirm when the word is right.
			e.preventDefault();
			if ( ! wipeOk.disabled ) {
				wipeDialog.close( 'ok' );
			}
		} );
		wipeDialog.addEventListener( 'close', function () {
			if ( 'ok' !== wipeDialog.returnValue ) {
				return;
			}
			setBusy( true );
			request( 'om_ins_wipe', [] ).then(
				function () {
					cache = {};
					toast( i18n.deleted );
					go( window.location.href, { fresh: true } );
				},
				function () {
					setBusy( false );
					toast( i18n.failed, true );
				}
			);
		} );
	}

	function openWipe() {
		if ( ! wipeDialog || 'function' !== typeof wipeDialog.showModal ) {
			return false;
		}
		var input = $( '[data-om-ins-wipe-word]', wipeDialog );
		input.value = '';
		$( '[data-om-ins-wipe-ok]', wipeDialog ).disabled = true;
		wipeDialog.returnValue = '';
		wipeDialog.showModal();
		input.focus();
		return true;
	}

	function selectText( el ) {
		var range = document.createRange();
		range.selectNodeContents( el );
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange( range );
	}

	function copyText( button ) {
		var quote = $( '[data-om-ins-copytext]', closest( button, '.om-ins-quote' ) || view );
		if ( ! quote ) {
			return;
		}
		var done = function () {
			toast( i18n.copied );
		};
		var fallback = function () {
			selectText( quote );
			var ok = false;
			try {
				ok = document.execCommand( 'copy' );
			} catch ( e ) {}
			if ( ok ) {
				done();
			} else {
				toast( i18n.copyFailed, true );
			}
		};
		if ( navigator.clipboard && window.isSecureContext ) {
			navigator.clipboard.writeText( quote.textContent ).then( done, fallback );
		} else {
			fallback();
		}
	}

	/* ---------- Clicks, keys, forms ---------- */

	app.addEventListener( 'click', function ( e ) {
		if ( e.defaultPrevented ) {
			return;
		}
		var t = e.target;
		var plain = 0 === e.button && ! e.metaKey && ! e.ctrlKey && ! e.shiftKey && ! e.altKey;
		var el;
		if ( plain && ( el = closest( t, 'a[data-om-ins-drawer]' ) ) ) {
			e.preventDefault();
			openDrawer( el.href, closest( el, '[data-om-ins-drawer-root]' ) ? drawerFrom : el );
			return;
		}
		if ( plain && ( el = closest( t, 'a[data-om-ins-interval]' ) ) ) {
			e.preventDefault();
			if ( 'true' !== el.getAttribute( 'aria-current' ) ) {
				switchInterval( el );
			}
			return;
		}
		if ( plain && ( el = closest( t, 'a[data-om-ins-more]' ) ) ) {
			e.preventDefault();
			loadMore( el );
			return;
		}
		if ( plain && ( el = closest( t, 'a[data-om-ins-refresh]' ) ) ) {
			e.preventDefault();
			refreshAll();
			return;
		}
		if ( plain && ( el = closest( t, 'a[data-om-ins-nav]' ) ) ) {
			e.preventDefault();
			if ( closest( el, '[data-om-ins-drawer-root]' ) ) {
				closeDrawer( true );
				go( el.href, { push: true, focus: 'view' } );
				return;
			}
			go( el.href, { push: true } );
			return;
		}
		if ( closest( t, '[data-om-ins-picker-btn]' ) ) {
			var p = picker();
			if ( p && p.pop.hidden ) {
				openPicker();
			} else {
				closePicker();
			}
			return;
		}
		if ( closest( t, '[data-om-ins-report-btn]' ) ) {
			var rep = report();
			if ( rep && rep.pop.hidden ) {
				openReport();
			} else {
				closeReport();
			}
			return;
		}
		if ( plain && ( el = closest( t, 'a[data-om-ins-report-dl]' ) ) ) {
			e.preventDefault();
			downloadReport( report() );
			return;
		}
		if ( ( el = closest( t, '[data-om-ins-metric]' ) ) ) {
			pickMetric( el.getAttribute( 'data-om-ins-metric' ) );
			return;
		}
		if ( ( el = closest( t, '.om-ins-subtabs [role="tab"]' ) ) ) {
			selectSub( el, true );
			return;
		}
		if ( ( el = closest( t, '.om-ins-sort' ) ) ) {
			sortBy( el );
			return;
		}
		if ( ( el = closest( t, '[data-om-ins-showall]' ) ) ) {
			showAll( el );
			return;
		}
		if ( closest( t, '[data-om-ins-close]' ) ) {
			closeDrawer();
			return;
		}
		if ( ( el = closest( t, '[data-om-ins-copy]' ) ) ) {
			copyText( el );
		}
	} );

	app.addEventListener( 'change', function ( e ) {
		var t = e.target;
		if ( t.matches( '[data-om-ins-compare]' ) ) {
			compare = t.checked;
			keep( 'local', 'omInsCompare', compare ? '1' : '0' );
			applyCompare();
			sparks();
			draw( false );
			return;
		}
		if ( t.matches( '[data-om-ins-report-names]' ) ) {
			namesChoice( true );
			return;
		}
		if ( t.matches( '[data-om-ins-metric-select]' ) ) {
			pickMetric( t.value );
			return;
		}
		if ( t.matches( '[data-om-ins-opt]' ) ) {
			saveSetting( t );
		}
	} );

	app.addEventListener( 'input', function ( e ) {
		var input = closest( e.target, '[data-om-ins-filter]' );
		if ( ! input ) {
			return;
		}
		var card = closest( input, '.om-ins-card' );
		var table = card && $( 'table', card );
		if ( table ) {
			tableState( table ).q = input.value.trim().toLowerCase();
			refreshRows( table );
		}
	} );

	app.addEventListener( 'submit', function ( e ) {
		var form = e.target;
		if ( form.matches( '[data-om-ins-custom]' ) ) {
			e.preventDefault();
			var u = new URL( form.getAttribute( 'action' ), window.location.href );
			new FormData( form ).forEach( function ( value, key ) {
				u.searchParams.append( key, value );
			} );
			go( u.href, { push: true } );
			return;
		}
		if ( form.matches( '[data-om-ins-settings]' ) ) {
			e.preventDefault(); // Each change is saved already.
			return;
		}
		if ( form.matches( '[data-om-ins-wipe]' ) ) {
			if ( openWipe() ) {
				e.preventDefault();
			} else if ( ! window.confirm( ( $( '#om-ins-wipe-title' ) || {} ).textContent || '' ) ) {
				e.preventDefault();
			}
		}
	} );

	// Tabs (headline numbers, panel tabs): arrow keys move along, Home and End jump.
	app.addEventListener( 'keydown', function ( e ) {
		var tabEl = closest( e.target, '[role="tab"]' );
		if ( tabEl && /^(ArrowLeft|ArrowRight|Home|End)$/.test( e.key ) ) {
			var tabs = $$( '[role="tab"]', tabEl.parentNode );
			var i = tabs.indexOf( tabEl );
			var j = 'Home' === e.key ? 0 : 'End' === e.key ? tabs.length - 1 : ( i + ( 'ArrowRight' === e.key ? 1 : -1 ) + tabs.length ) % tabs.length;
			e.preventDefault();
			tabs[ j ].focus();
			tabs[ j ].click();
			return;
		}
		// Up and down through the period presets; down on the button opens them.
		if ( 'ArrowDown' === e.key || 'ArrowUp' === e.key ) {
			if ( closest( e.target, '[data-om-ins-picker-btn]' ) && 'ArrowDown' === e.key ) {
				e.preventDefault();
				openPicker();
				return;
			}
			if ( closest( e.target, '[data-om-ins-report-btn]' ) && 'ArrowDown' === e.key ) {
				e.preventDefault();
				openReport();
				return;
			}
			var item = closest( e.target, '.om-ins-presets a' );
			if ( item ) {
				var links = $$( '.om-ins-presets a', closest( item, '[data-om-ins-pop]' ) );
				var k = links.indexOf( item );
				e.preventDefault();
				links[ ( k + ( 'ArrowDown' === e.key ? 1 : -1 ) + links.length ) % links.length ].focus();
			}
		}
	} );

	document.addEventListener( 'keydown', function ( e ) {
		if ( 'Escape' === e.key ) {
			hideTip();
			var p = picker();
			if ( p && ! p.pop.hidden ) {
				e.preventDefault();
				closePicker( true );
				return;
			}
			var rep = report();
			if ( rep && ! rep.pop.hidden ) {
				e.preventDefault();
				closeReport( true );
				return;
			}
			if ( drawer && ! drawer.hidden ) {
				e.preventDefault();
				closeDrawer();
			}
			return;
		}
		// One-letter periods (T today, Y yesterday, W, M, Q, L), as shown in the period menu.
		if ( e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.repeat ) {
			return;
		}
		var t = e.target;
		if ( t && ( /^(INPUT|TEXTAREA|SELECT)$/.test( t.tagName ) || t.isContentEditable ) ) {
			return;
		}
		if ( ( drawer && ! drawer.hidden ) || ( wipeDialog && wipeDialog.open ) ) {
			return;
		}
		var controls = $( '[data-om-ins-controls]' );
		var range = ( cfg.keys || {} )[ String( e.key || '' ).toLowerCase() ];
		if ( ! range || ! controls || controls.hidden || ! /^[a-z0-9]+$/.test( range ) ) {
			return;
		}
		var link = $( '[data-om-ins-range="' + range + '"]' );
		if ( link && 'true' !== link.getAttribute( 'aria-current' ) ) {
			e.preventDefault();
			go( link.href, { push: true } );
		}
	} );

	// Sections are asked for while the pointer rests on their link.
	var hoverTimer = 0;
	app.addEventListener( 'mouseover', function ( e ) {
		var a = closest( e.target, '.om-ins-nav a[data-om-ins-nav]' );
		window.clearTimeout( hoverTimer );
		if ( ! a || 'page' === a.getAttribute( 'aria-current' ) || 'live' === a.getAttribute( 'data-om-ins-tab' ) ) {
			return;
		}
		hoverTimer = window.setTimeout( function () {
			fetchView( a.href ).catch( function () {} );
		}, 150 );
	} );

	/* ---------- Each time a view arrives ---------- */

	function initView() {
		initChart();
		$$( '[data-om-ins-panel]', view ).forEach( function ( panel ) {
			var tabs = $$( '.om-ins-subtabs [role="tab"]', panel );
			var i = parseInt( keep( 'session', 'omInsSub:' + panel.getAttribute( 'data-om-ins-panel' ) ) || '0', 10 );
			if ( i > 0 && tabs[ i ] ) {
				selectSub( tabs[ i ], false );
			}
		} );
		$$( 'table[data-om-ins-cap]', view ).forEach( refreshRows );
		$$( 'input[type="radio"][data-om-ins-opt]:checked, input[type="number"][data-om-ins-opt]', view ).forEach( function ( r ) {
			savedRadio[ r.name ] = r.value;
		} );
		var name = sectionName();
		document.title = name ? name + ' ‹ ' + baseTitle : baseTitle;
		liveSchedule();
	}

	if ( 'scrollRestoration' in window.history ) {
		window.history.scrollRestoration = 'manual';
	}
	window.history.replaceState( { omIns: 1, y: window.pageYOffset }, '', clean( window.location.href ) );
	namesChoice();
	navIntoView();
	initView();
}() );
