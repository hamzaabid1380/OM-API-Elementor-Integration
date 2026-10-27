/*
 * Insights (OM Catalog): what visitors do on this site, sent to this site
 * only. Page views, time on page (while the page is on screen and in use),
 * how far down people scroll, and what they do: the catalog's and the Wulf
 * Kit's own events (om:track / wk:track), options chosen on product pages,
 * filters, and calls, texts, emails, directions and links to other sites.
 *
 * An anonymous random ID for the visit (cookie om_sid, 30 minutes) and one
 * for a returning visitor (om_vid), unless switched off. Nothing runs for
 * browsers asking not to be tracked (when that setting is on), for robots
 * and automated browsers, or inside the Elementor editor.
 */
(function () {
	'use strict';

	var C = window.omVisit || {};
	var nav = window.navigator || {};
	if (!C.u || !window.JSON || !document.addEventListener) { return; }
	if (nav.webdriver) { return; }
	if (C.dnt && (nav.doNotTrack === '1' || window.doNotTrack === '1' || nav.globalPrivacyControl === true)) { return; }
	if (document.body && /\belementor-editor-active\b/.test(document.body.className)) { return; }

	var GAP = 1800; // A visit ends after 30 minutes without activity.
	var crypto = window.crypto || window.msCrypto;

	function rid(n) {
		var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', out = '', i;
		var r = new Uint8Array(n);
		if (crypto && crypto.getRandomValues) { crypto.getRandomValues(r); } else { for (i = 0; i < n; i++) { r[i] = Math.floor(Math.random() * 256); } }
		for (i = 0; i < n; i++) { out += abc.charAt(r[i] % 62); }
		return out;
	}
	function cookie(name) {
		var m = new RegExp('(?:^|;\\s*)' + name + '=([A-Za-z0-9]{12})(?:;|$)').exec(document.cookie);
		return m ? m[1] : '';
	}
	function setCookie(name, value, age) {
		document.cookie = name + '=' + value + '; path=/; max-age=' + age + '; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
	}
	function host(url) {
		try { return new URL(url).hostname.replace(/^www\./, '').toLowerCase(); } catch (e) { return ''; }
	}
	var OWN = location.hostname.replace(/^www\./, '').toLowerCase();

	/* ---------- The visit and the visitor ---------- */

	var vid = C.vid ? cookie('om_vid') : '';
	var fresh = false;
	if (C.vid && !vid) { vid = rid(12); fresh = true; }
	var sid = cookie('om_sid');
	var refHost = document.referrer ? host(document.referrer) : '';
	var external = refHost && refHost !== OWN;
	// A new campaign (an ad, an email) starts a new visit.
	if (sid && external && /[?&](utm_source|gclid|gbraid|wbraid|fbclid|msclkid)=/.test(location.search)) { sid = ''; }
	var newVisit = !sid;
	if (!sid) { sid = rid(12); }
	function keep() {
		setCookie('om_sid', sid, GAP);
		if (C.vid) { setCookie('om_vid', vid, 400 * 86400); }
	}
	keep();

	function context() {
		var keepQ = [];
		try {
			new URLSearchParams(location.search).forEach(function (v, k) {
				if (/^(utm_(source|medium|campaign|term|content)|gclid|gbraid|wbraid|fbclid|msclkid|ttclid)$/.test(k)) { keepQ.push(k + '=' + encodeURIComponent(String(v).slice(0, 100))); }
			});
		} catch (e) { /* old browser */ }
		var tz = '';
		try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* none */ }
		return { r: external ? refHost : '', q: keepQ.join('&'), w: (window.screen && screen.width) || 0, t: nav.maxTouchPoints || 0, z: tz, g: String(nav.language || '').slice(0, 12) };
	}

	/* ---------- Sending: small batches, on a timer and when the page goes away ---------- */

	var Q = [];
	var timer = 0;
	var ctxSent = !newVisit;

	function push(ev) {
		ev.a = Date.now();
		Q.push(ev);
		if (Q.length >= 25) { flush(); } else if (!timer) { timer = setTimeout(flush, 5000); }
	}
	function flush() {
		clearTimeout(timer);
		timer = 0;
		while (Q.length) {
			var now = Date.now();
			var batch = Q.splice(0, 40).map(function (e) {
				var o = {}, k;
				for (k in e) { if (Object.prototype.hasOwnProperty.call(e, k)) { o[k] = e[k]; } }
				o.a = Math.max(0, now - e.a);
				return o;
			});
			var body = { s: sid, v: vid || sid, e: batch };
			if (!ctxSent) { body.n = 1; body.f = fresh ? 1 : 0; body.c = context(); ctxSent = true; }
			keep();
			send(JSON.stringify(body));
		}
	}
	function send(data) {
		var fd = new FormData();
		fd.append('d', data);
		var sent = false;
		try { sent = nav.sendBeacon ? nav.sendBeacon(C.u, fd) : false; } catch (e) { sent = false; }
		if (!sent && window.fetch) {
			try { window.fetch(C.u, { method: 'POST', body: fd, keepalive: true, credentials: 'same-origin' }).catch(function () {}); } catch (e) { /* offline */ }
		}
	}

	/* ---------- Speed: how fast the first page showed and answered (Core Web Vitals) ---------- */

	// Largest paint and first byte (ms), slowest response to a tap, click or key (ms), and how
	// much the layout jumped (x1000, plus 1 so "no jump at all" isn't read as "not measured").
	// Only for the page the browser loaded; Safari doesn't report most of them.
	var VITALS = { l: 0, n: 0, c: 0, b: 0 };
	var vitalsPV = '';
	(function measure() {
		var P = window.PerformanceObserver;
		if (!C.cwv || !P || !window.performance) { return; }
		var start = 0;
		try {
			var navEntry = performance.getEntriesByType('navigation')[0];
			if (navEntry) {
				start = navEntry.activationStart || 0;
				if (navEntry.responseStart > 0) { VITALS.b = Math.max(1, Math.round(navEntry.responseStart - start)); }
			}
		} catch (e) { /* not supported */ }
		var types = (P.supportedEntryTypes || []);
		function watch(type, fn, opts) {
			if (types.indexOf(type) < 0) { return; }
			try {
				var o = new P(function (list) { list.getEntries().forEach(fn); });
				var args = { type: type, buffered: true };
				for (var k in (opts || {})) { if (Object.prototype.hasOwnProperty.call(opts, k)) { args[k] = opts[k]; } }
				o.observe(args);
			} catch (e) { /* not supported */ }
		}
		// The largest paint until the visitor first does something.
		var lcpDone = false;
		['keydown', 'pointerdown'].forEach(function (name) {
			window.addEventListener(name, function () { lcpDone = true; }, { once: true, capture: true, passive: true });
		});
		watch('largest-contentful-paint', function (e) {
			if (!lcpDone) { VITALS.l = Math.max(1, Math.round((e.renderTime || e.startTime) - start)); }
		});
		// Layout shifts in session windows (1 s apart, 5 s at most); the worst window counts.
		var win = 0, winFirst = 0, winLast = 0, worst = 0;
		if (types.indexOf('layout-shift') >= 0) { VITALS.c = 1; }
		watch('layout-shift', function (e) {
			if (e.hadRecentInput) { return; }
			if (win && e.startTime - winLast < 1000 && e.startTime - winFirst < 5000) {
				win += e.value;
			} else {
				win = e.value;
				winFirst = e.startTime;
			}
			winLast = e.startTime;
			worst = Math.max(worst, win);
			VITALS.c = Math.min(65000, Math.round(worst * 1000) + 1);
		});
		// The slowest interaction (taps, clicks, keys).
		watch('event', function (e) {
			if (e.interactionId) { VITALS.n = Math.max(VITALS.n, Math.round(e.duration)); }
		}, { durationThreshold: 40 });
		watch('first-input', function (e) {
			VITALS.n = Math.max(VITALS.n, Math.round(e.duration));
		});
	})();

	/* ---------- Pages: views, time on screen, scroll ---------- */

	var PV = '';
	var ticks = 0;
	var maxScroll = 0;
	var lastInput = Date.now();
	var lastReport = '';
	var lastParams = '';
	// A page that doesn't exist (the theme's "not found" page): flagged on its view.
	var NF = !!C.nf;
	var firstPath = '';

	// A private hint page lives at the home address with a token: kept apart, without the token.
	var HINT = !!document.querySelector('[data-om-hint-page]');
	function path() { return HINT ? '/om-hint/' : (location.pathname || '/').slice(0, 180); }
	// The catalog's search and filters, from the address (nothing else is kept).
	function params() {
		var out = [];
		try {
			new URLSearchParams(location.search).forEach(function (v, k) {
				if (v && /^om_(q|style|line|shape|metal|color|sort|upto|size)$/.test(k)) { out.push(k.slice(3) + '=' + String(v).slice(0, 60)); }
			});
		} catch (e) { /* old browser */ }
		return out.join('&').slice(0, 180);
	}
	// The design on a product page (not in a quick view).
	function productOn(root) {
		var el = (root || document).querySelector('.om-product-wrap[data-om-recent-item]');
		if (!el || (!root && el.closest('.om-quick-view'))) { return null; }
		try {
			var x = JSON.parse(el.getAttribute('data-om-recent-item'));
			return x && x.l && x.s ? { i: x.l + '|' + String(x.s).toUpperCase(), t: x.t || '' } : null;
		} catch (e) { return null; }
	}
	function scrollPct() {
		var d = document.documentElement, b = document.body;
		var top = window.pageYOffset || d.scrollTop || 0;
		var room = Math.max(d.scrollHeight, b ? b.scrollHeight : 0) - (window.innerHeight || d.clientHeight || 0);
		return room > 0 ? Math.min(100, Math.round(100 * (top + 1) / room)) : 100;
	}
	function report() {
		if (!PV) { return; }
		var speed = PV === vitalsPV ? VITALS : null;
		var mark = PV + ':' + ticks + ':' + maxScroll + (speed ? ':' + speed.l + ':' + speed.n + ':' + speed.c + ':' + speed.b : '');
		if (mark === lastReport) { return; }
		lastReport = mark;
		var ev = { t: 'engage', x: PV, d: Math.min(ticks * 5, 10800), y: maxScroll };
		if (speed) { ev.l = speed.l; ev.n = speed.n; ev.c = speed.c; ev.b = speed.b; }
		push(ev);
	}
	var pvAt = 0;
	function pageview() {
		report();
		pvAt = Date.now();
		PV = rid(8);
		ticks = 0;
		maxScroll = scrollPct();
		lastParams = params();
		var p = productOn();
		var here = path();
		// The page the browser loaded gets its speed; pages changed in place (catalog filters) don't.
		if (!vitalsPV) { vitalsPV = PV; firstPath = here; }
		// A hint page's title carries a name: not kept.
		push({ t: 'pageview', x: PV, p: here, l: HINT ? 'Drop a hint page' : String(document.title || '').slice(0, 150), m: HINT ? '' : (NF && here === firstPath ? '404' : lastParams), i: p ? p.i : '' });
	}

	// Engaged time: 5-second steps while the page is on screen and in use (input in the last minute).
	setInterval(function () {
		if (document.visibilityState === 'visible' && Date.now() - lastInput < 60000) { ticks++; }
	}, 5000);
	['scroll', 'mousemove', 'keydown', 'touchstart', 'pointerdown', 'wheel'].forEach(function (name) {
		window.addEventListener(name, function () { lastInput = Date.now(); }, { passive: true, capture: true });
	});
	var scrollWait = 0;
	window.addEventListener('scroll', function () {
		if (scrollWait) { return; }
		scrollWait = setTimeout(function () { scrollWait = 0; maxScroll = Math.max(maxScroll, scrollPct()); }, 250);
	}, { passive: true });

	document.addEventListener('visibilitychange', function () {
		if (document.visibilityState === 'hidden') {
			report();
			flush();
			return;
		}
		// Back after the visit ran out: a new visit on the same page.
		if (!cookie('om_sid') && sid) {
			sid = rid(12);
			newVisit = true;
			ctxSent = false;
			external = false;
			PV = '';
			keep();
			pageview();
		} else {
			keep();
		}
		lastInput = Date.now();
	});
	window.addEventListener('pagehide', function () { report(); flush(); });
	// Back or Forward to a page the browser kept in memory: it doesn't load again, so its view is counted here
	// (once, if the visibility change above has just counted it).
	window.addEventListener('pageshow', function (e) {
		if (!e.persisted || Date.now() - pvAt < 1000) { return; }
		if (!cookie('om_sid') && sid) {
			sid = rid(12);
			newVisit = true;
			ctxSent = false;
			external = false;
			PV = '';
		}
		keep();
		lastInput = Date.now();
		pageview();
	});
	// A form going out (inquiry, visit request, hint...): send what's waiting first,
	// so the shop's email about it can tell the whole visit.
	document.addEventListener('submit', function () { report(); flush(); }, true);
	document.addEventListener('click', function (e) {
		if (e.target && e.target.closest && e.target.closest('button[type="submit"], input[type="submit"]')) { report(); flush(); }
	}, true);

	// The catalog changes its address in place for filters and pages of results.
	function onAddress() {
		var p = path();
		if (p !== (onAddress.last || '')) {
			onAddress.last = p;
			pageview();
			return;
		}
		var now = params();
		if (now !== lastParams) {
			lastParams = now;
			if (now) { push({ t: 'filter', p: p, m: now }); }
		}
	}
	['pushState', 'replaceState'].forEach(function (fn) {
		var orig = window.history && window.history[fn];
		if (typeof orig !== 'function') { return; }
		window.history[fn] = function () {
			var out = orig.apply(this, arguments);
			try { onAddress(); } catch (e) { /* never break the page */ }
			return out;
		};
	});
	window.addEventListener('popstate', function () { try { onAddress(); } catch (e) { /* never break the page */ } });

	/* ---------- What people do ---------- */

	function key(it) {
		if (!it || !it.item_id) { return ''; }
		return (it.item_category ? String(it.item_category).replace(/ /g, '-') : '') + '|' + String(it.item_id).toUpperCase();
	}
	function first(p) { return (p && p.items && p.items[0]) || {}; }
	function short(v, n) { return v === undefined || v === null ? '' : String(v).slice(0, n || 150); }

	// The plugins' own events, as Insights records them (leads are recorded on the server).
	var MAP = {
		view_item: function (p) { var it = first(p); return { t: 'view', i: key(it), l: it.item_name, v: p.value || it.price || 0, m: p.view_method }; },
		add_to_wishlist: function (p) { var it = first(p); return { t: 'save', i: key(it), l: it.item_name }; },
		compare_designs: function (p, ctx) {
			var items = (ctx && ctx.items) || [];
			var group = items.slice().sort().join(' + ');
			return items.length ? items.map(function (k) { return { t: 'compare', i: k, m: group, v: items.length }; }) : { t: 'compare', l: short(p.item_ids), v: p.designs || 0 };
		},
		share: function (p) { var here = productOn(); return { t: 'share', l: p.method, m: p.content_type, i: here ? here.i : '' }; },
		search: function (p) { return { t: 'search', l: p.search_term }; },
		ring_builder_step: function (p) { return { t: 'builder', v: parseInt(p.step, 10) || 0, l: p.start_with }; },
		diamond_guide: function () { return { t: 'diamond', l: 'guide' }; },
		diamond_guide_choose: function (p) { return { t: 'diamond', l: 'guide_pick', m: p.suggestion }; },
		diamond_compare_add: function () { return { t: 'diamond', l: 'compare_add' }; },
		diamond_compare_view: function (p) { return { t: 'diamond', l: 'compare_view', v: p.count || 0 }; },
		true_size: function (p) { return { t: 'diamond', l: 'true_size', m: short(p.shape, 30) + (p.carat ? ' ' + p.carat + ' ct' : '') }; },
		book_viewing_click: function (p) { return { t: 'cta', l: 'Book a viewing', m: p.location }; },
		hint_open: function (p) { return { t: 'hint', l: 'open', m: p.cta_location, v: p.designs || 0 }; },
		hint_sent: function (p) { return { t: 'hint', l: 'sent', m: p.cta_location, v: p.designs || 0 }; },
		hint_view: function (p) { return { t: 'hint', l: 'page_view', m: p.viewer }; },
		hint_cta: function (p) { return { t: 'hint', l: 'page_' + short(p.cta, 10), m: p.viewer }; },
		assistant_open: function (p) { return { t: 'assistant', l: 'open', m: p.page_type }; },
		assistant_message: function () { return { t: 'assistant', l: 'message' }; },
		assistant_starter_shown: function () { return { t: 'assistant', l: 'starter' }; },
		cta_click: function (p) { return { t: 'cta', l: p.cta_text, m: p.cta_location }; },
		booking_open: function (p) { return { t: 'booking', l: 'open', m: p.topic || p.cta_location }; },
		booking_step: function (p) { return { t: 'booking', l: 'step', v: parseInt(p.step, 10) || 0, m: p.cta_location }; },
		booking_request: function (p) { return { t: 'booking', l: 'request', m: p.topic || p.cta_location }; },
		quiz_start: function () { return { t: 'quiz', l: 'start' }; },
		quiz_step: function (p) { return { t: 'quiz', l: 'step', v: parseInt(p.step, 10) || 0, m: short(p.question, 30) + ': ' + short(p.answer, 60) }; },
		quiz_complete: function (p) { return { t: 'quiz', l: 'complete', m: [p.shape, p.style, p.metal, p.budget].join(' · ').slice(0, 150), i: '' }; },
		quiz_email_open: function () { return { t: 'quiz', l: 'email_open' }; },
		studio_open: function () { return { t: 'designer', l: 'open' }; },
		// The booking calendar (SimplyBook) showing, from the kit's booking window or a product page.
		booking_calendar_view: function (p) { return { t: 'booking', l: 'calendar', m: p.cta_location || p.form_location || '' }; },
		// The Wulf Kit's "Welcome back" bar (its buttons count as button clicks).
		welcome_back: function (p) { return { t: 'welcome', l: 'shown', v: p.designs || 0 }; },
		// The kit's brand films.
		film_play: function (p) { return { t: 'film', l: 'play', m: short(p.film, 60) }; },
		film_complete: function (p) { return { t: 'film', l: 'complete', m: short(p.film, 60) }; },
		film_moment: function (p) { return { t: 'film', l: 'moment', m: short(p.moment, 60) }; },
		film_chapter: function (p) { return { t: 'film', l: 'chapter', m: short(p.chapter, 60) }; }
	};
	function onEvent(e) {
		var d = e && e.detail;
		if (!d || !d.name || !MAP[d.name]) { return; }
		var out;
		try { out = MAP[d.name](d.params || {}, d.ctx || null); } catch (err) { return; }
		(Array.isArray(out) ? out : [out]).forEach(function (ev) {
			if (!ev) { return; }
			ev.p = path();
			if (ev.l !== undefined) { ev.l = short(ev.l); }
			if (ev.m !== undefined) { ev.m = short(ev.m); }
			push(ev);
		});
	}
	document.addEventListener('om:track', onEvent);
	document.addEventListener('wk:track', onEvent);

	// Options chosen on a product page: metal, colour, ring size, level, quality.
	document.addEventListener('change', function (e) {
		var el = e.target;
		if (!el || !el.name || !el.closest || !/^(metal|color|finger_size|level|quality)$/.test(el.name)) { return; }
		var wrap = el.closest('.om-product-wrap');
		if (!wrap || (el.type === 'radio' && !el.checked)) { return; }
		var x = null;
		try { x = JSON.parse(wrap.getAttribute('data-om-recent-item') || 'null'); } catch (err) { x = null; }
		push({ t: 'option', p: path(), i: x && x.l && x.s ? x.l + '|' + String(x.s).toUpperCase() : '', l: el.name, m: short(el.value, 60) });
	}, true);

	// Calls, texts, emails, directions and other sites.
	function where(el) {
		var w = el.closest('[data-wk]');
		if (w) { return w.getAttribute('data-wk'); }
		// The Wulf Kit's bars and windows, which sit outside its sections.
		var kit = el.closest('.wk-portal');
		if (kit) {
			if (el.closest('.actbar')) { return 'phone_bar'; }
			if (el.closest('.bkpill')) { return 'booking_bar'; }
			if (el.closest('.wb')) { return 'welcome_back'; }
			if (el.closest('.bk')) { return 'booking_window'; }
			if (el.closest('.drawer')) { return 'tray'; }
			return 'kit';
		}
		if (el.closest('.om-product-wrap')) { return 'product'; }
		if (el.closest('header, .site-header')) { return 'header'; }
		if (el.closest('footer, .site-footer')) { return 'footer'; }
		return 'page';
	}
	document.addEventListener('click', function (e) {
		var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
		if (!a) { return; }
		var href = a.getAttribute('href') || '';
		var text = short((a.textContent || '').replace(/\s+/g, ' ').trim(), 80);
		// Which of the shop's numbers / addresses, not the link wording.
		var to = '';
		try { to = decodeURIComponent(href.replace(/^(tel|mailto|sms):/i, '')).split(/[?;]/)[0]; } catch (err) { to = ''; }
		if (/^tel:/i.test(href)) { push({ t: 'call', p: path(), l: short(to.replace(/[^\d+]/g, ''), 20) || text, m: where(a) }); return; }
		if (/^sms:/i.test(href)) { push({ t: 'text', p: path(), l: short(to.replace(/[^\d+]/g, ''), 20) || text, m: where(a) }); return; }
		if (/^mailto:/i.test(href)) { push({ t: 'email', p: path(), l: short(to.trim().toLowerCase(), 80) || text, m: where(a) }); return; }
		if (!/^https?:/i.test(href)) { return; }
		var h = host(href);
		if (!h || h === OWN) { return; }
		if (/^(maps\.google\.|maps\.app\.goo\.gl|goo\.gl$|maps\.apple\.com)/.test(h) || /google\.[a-z.]+\/maps/.test(href)) {
			// A star rating can link to the shop on Google Maps (its reviews): that isn't asking the way.
			var said = text + ' ' + (a.getAttribute('aria-label') || '') + ' ' + (a.getAttribute('title') || '');
			if (/review|rating|★/i.test(said) || a.closest('.as-rate, [data-wk-rating]')) { push({ t: 'outbound', p: path(), l: 'Google reviews', m: where(a) }); return; }
			push({ t: 'directions', p: path(), l: text, m: where(a) });
			return;
		}
		push({ t: 'outbound', p: path(), l: h, m: where(a) });
	}, true);

	/* ---------- Go ---------- */

	onAddress.last = path();
	if (document.prerendering) {
		document.addEventListener('prerenderingchange', pageview, { once: true });
	} else {
		pageview();
	}
})();
