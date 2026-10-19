/**
 * OM Catalog: the SimplyBook.me booking calendar and the "Book / Message"
 * tabs (Settings > OM Catalog > Inquiries).
 *
 * Each .om-booking box is filled with SimplyBook's calendar when it first
 * comes into view, so SimplyBook's script only loads for visitors who reach
 * a calendar. Boxes added later (pop-ups, the assistant, results loaded in
 * place, the Wulf kit's booking panel) are picked up as they appear.
 *
 * To open faster, the connections to SimplyBook are made early and its
 * script is fetched once the page has loaded (or as soon as a visitor
 * reaches for a "Book" button), so opening a calendar only waits for
 * SimplyBook's own page.
 *
 * window.omBooking.show(el, 'book' | 'form') switches the tabs in or
 * around el; omBooking.scan(root) looks for new calendars in root.
 * A calendar that has loaded fires "om-booking:shown" (it bubbles).
 */
(function () {
	'use strict';

	var scripts = {};
	var hinted = {};
	// One calendar at a time: SimplyBook's script keeps some state of its own.
	var queue = Promise.resolve();

	function settings(box) {
		try { return JSON.parse(box.getAttribute('data-om-booking') || 'null'); } catch (err) { return null; }
	}

	/* ---------- Getting ready before a calendar opens ---------- */

	// Open a connection to SimplyBook ahead of time (once per address).
	function preconnect(url) {
		var origin = '';
		try { origin = new URL(url, window.location.href).origin; } catch (err) { return; }
		if (!origin || origin === 'null' || origin === window.location.origin || hinted[origin]) { return; }
		hinted[origin] = true;
		if (document.querySelector('link[rel="preconnect"][href="' + origin + '"]')) { return; } // The page has it.
		var link = document.createElement('link');
		link.rel = 'preconnect';
		link.href = origin;
		document.head.appendChild(link);
	}

	function warm(box) {
		var config = settings(box);
		preconnect(box.getAttribute('data-om-booking-src'));
		if (config && config.url) { preconnect(config.url); }
	}

	// Fetch SimplyBook's script now, so opening the calendar doesn't wait for it.
	function preload(box) {
		var src = box && box.getAttribute('data-om-booking-src');
		if (!src) { return; }
		warm(box);
		load(src).catch(function () { /* Tried again when a calendar opens. */ });
	}

	// The Wulf kit's booking panel builds its calendar when it opens; its
	// settings are in the kit's page data until then.
	function kitBox() {
		var cal = window.wkConfig && window.wkConfig.bk && window.wkConfig.bk.cal;
		var t = document.createElement('template');
		if (!cal || !cal.html || !t.content) { return null; }
		t.innerHTML = cal.html; // Inert: nothing in a template loads or runs.
		return t.content.querySelector('.om-booking');
	}

	// Once per page, for the page's calendar or the kit panel's.
	var preloaded = false;
	function preloadPage() {
		if (preloaded) { return; }
		var box = document.querySelector('.om-booking') || kitBox();
		if (box) {
			preloaded = true;
			preload(box);
		}
	}

	// A visitor heading for a calendar: a "Book" toggle, tab or link.
	var INTENT = 'summary, [data-om-ask-tab="book"], .om-sticky-cta, a[href*="#om-inquiry"], [data-om-hint-book], a[href*="#visit"], a[href$="#book"], [data-wk-book]';
	function intent(e) {
		if (preloaded) { return; }
		var el = e.target && e.target.closest ? e.target.closest(INTENT) : null;
		if (!el || (el.matches('summary') && !el.parentNode.querySelector('.om-booking'))) { return; }
		preloadPage();
	}

	function load(src) {
		if (!scripts[src]) {
			scripts[src] = new Promise(function (resolve, reject) {
				if (typeof window.SimplybookWidget === 'function') { resolve(); return; }
				var s = document.createElement('script');
				s.src = src;
				s.async = true;
				s.onload = function () {
					if (typeof window.SimplybookWidget === 'function') { resolve(); } else { reject(new Error('No SimplybookWidget in ' + src)); }
				};
				s.onerror = function () { reject(new Error('Could not load ' + src)); };
				document.head.appendChild(s);
			}).catch(function (err) {
				delete scripts[src]; // A later calendar may try again.
				throw err;
			});
		}
		return scripts[src];
	}

	function mount(box) {
		if (box.omBookingState) { return; }
		box.omBookingState = 'loading';
		queue = queue.then(function () { return fill(box); }, function () { return fill(box); });
	}

	function fill(box) {
		var frame = box.querySelector('.om-booking-frame');
		var config = settings(box);
		if (!frame || !config || !config.url) { failed(box); return null; }
		if (!frame.id) { frame.id = 'om-sb-' + Math.random().toString(36).slice(2, 9); }
		return load(box.getAttribute('data-om-booking-src')).then(function () {
			config.container_id = frame.id;
			var host = '';
			try { host = new URL(config.url).host; } catch (err) { host = ''; }
			var before = [].slice.call(document.querySelectorAll('iframe'));
			// Older versions of SimplyBook's script write the calendar where
			// their script tag would be; after the page has loaded that
			// would wipe the page, so the writing goes into the box instead.
			var write = document.write;
			var writeln = document.writeln;
			document.write = document.writeln = function () {
				frame.insertAdjacentHTML('beforeend', [].join.call(arguments, ''));
			};
			try {
				box.omBookingWidget = new window.SimplybookWidget(config);
			} catch (err) {
				failed(box);
				return null;
			} finally {
				document.write = write;
				document.writeln = writeln;
			}
			return found(box, frame, host, before);
		}).catch(function () { failed(box); });
	}

	// Wait for SimplyBook's calendar to appear in the box (or anywhere new on
	// the page, then it is moved into the box).
	function found(box, frame, host, before) {
		return new Promise(function (resolve) {
			var start = Date.now();
			(function check() {
				var iframe = frame.querySelector('iframe');
				if (!iframe && host) {
					[].some.call(document.querySelectorAll('iframe'), function (f) {
						if (before.indexOf(f) === -1 && !f.closest('.om-booking-frame') && String(f.src || '').indexOf(host) !== -1) {
							frame.appendChild(f);
							iframe = f;
						}
						return !!iframe;
					});
				}
				if (iframe) { ready(box, iframe); resolve(); return; }
				if (Date.now() - start > 15000) { failed(box); resolve(); return; }
				window.setTimeout(check, 200);
			})();
		});
	}

	function ready(box, iframe) {
		if (!iframe.getAttribute('title')) {
			iframe.setAttribute('title', box.getAttribute('data-om-booking-title') || 'Booking calendar');
		}
		box.classList.add('has-frame');
		var done = false;
		var finish = function () {
			if (done) { return; }
			done = true;
			box.omBookingState = 'ready';
			box.classList.add('is-ready');
			var wait = box.querySelector('.om-booking-wait');
			if (wait && wait.parentNode) { wait.parentNode.removeChild(wait); }
			try { box.dispatchEvent(new CustomEvent('om-booking:shown', { bubbles: true })); } catch (err) { /* old browser */ }
		};
		iframe.addEventListener('load', finish);
		// A slow connection: show what there is after a while.
		window.setTimeout(finish, 12000);
	}

	function failed(box) {
		if (box.omBookingState === 'failed' || box.omBookingState === 'ready') { return; }
		box.omBookingState = 'failed';
		box.classList.add('is-failed');
		var wait = box.querySelector('.om-booking-wait');
		if (wait) { wait.hidden = true; }
		var note = box.querySelector('.om-booking-failed');
		if (note) { note.hidden = false; }
	}

	/* ---------- Finding calendars ---------- */

	var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			// Inside a closed section, tab or pop-up a box has no size, so
			// it only "comes into view" once that opens.
			if (entry.isIntersecting) {
				io.unobserve(entry.target);
				mount(entry.target);
			}
		});
	}, { rootMargin: '300px 0px' }) : null;

	function scan(root) {
		var scope = root && root.querySelectorAll ? root : document;
		var boxes = [].slice.call(scope.querySelectorAll('.om-booking'));
		if (scope.matches && scope.matches('.om-booking')) { boxes.push(scope); }
		boxes.forEach(function (box) {
			if (box.omBookingSeen) { return; }
			box.omBookingSeen = true;
			warm(box);
			if (io) { io.observe(box); } else { mount(box); }
		});
	}

	var mo = window.MutationObserver ? new MutationObserver(function (records) {
		for (var i = 0; i < records.length; i++) {
			for (var j = 0; j < records[i].addedNodes.length; j++) {
				var node = records[i].addedNodes[j];
				if (node.nodeType === 1 && (node.matches('.om-booking') || node.querySelector('.om-booking'))) { scan(node); }
			}
		}
	}) : null;

	/* ---------- Tabs: the calendar and the form ---------- */

	function select(tab) {
		var ask = tab.closest('[data-om-ask]');
		if (!ask) { return; }
		[].forEach.call(ask.querySelectorAll('[data-om-ask-tab]'), function (t) {
			if (t.closest('[data-om-ask]') !== ask) { return; }
			var on = t === tab;
			t.setAttribute('aria-selected', on ? 'true' : 'false');
			t.tabIndex = on ? 0 : -1;
			var panel = document.getElementById(t.getAttribute('aria-controls'));
			if (panel) { panel.hidden = !on; }
		});
		try { ask.dispatchEvent(new CustomEvent('om-ask:change', { bubbles: true, detail: { tab: tab.getAttribute('data-om-ask-tab') } })); } catch (err) { /* old browser */ }
	}

	function show(el, which) {
		if (!el) { return false; }
		var ask = el.matches && el.matches('[data-om-ask]') ? el : (el.querySelector && el.querySelector('[data-om-ask]')) || (el.closest && el.closest('[data-om-ask]'));
		var tab = ask && ask.querySelector('[data-om-ask-tab="' + which + '"]');
		if (!tab) { return false; }
		select(tab);
		return true;
	}

	document.addEventListener('click', function (e) {
		var tab = e.target && e.target.closest ? e.target.closest('[data-om-ask-tab]') : null;
		if (tab) { select(tab); }
	});

	// Arrow keys move between the tabs (and open the one reached).
	document.addEventListener('keydown', function (e) {
		var tab = e.target && e.target.closest ? e.target.closest('[data-om-ask-tab]') : null;
		if (!tab) { return; }
		var tabs = [].slice.call(tab.parentNode.querySelectorAll('[data-om-ask-tab]'));
		var i = tabs.indexOf(tab);
		var next = null;
		if (e.key === 'ArrowRight') { next = tabs[(i + 1) % tabs.length]; }
		else if (e.key === 'ArrowLeft') { next = tabs[(i - 1 + tabs.length) % tabs.length]; }
		else if (e.key === 'Home') { next = tabs[0]; }
		else if (e.key === 'End') { next = tabs[tabs.length - 1]; }
		if (next) {
			e.preventDefault();
			select(next);
			next.focus();
		}
	});

	['pointerover', 'touchstart', 'focusin'].forEach(function (type) {
		document.addEventListener(type, intent, { capture: true, passive: true });
	});

	// Once the page itself has loaded: SimplyBook's script, when the page
	// has a calendar (open or not) or the kit's booking panel has one.
	function idle() {
		if ('requestIdleCallback' in window) { window.requestIdleCallback(preloadPage, { timeout: 4000 }); } else { window.setTimeout(preloadPage, 1500); }
	}

	function start() {
		scan(document);
		if (mo && document.body) { mo.observe(document.body, { childList: true, subtree: true }); }
		var kit = !document.querySelector('.om-booking') && kitBox();
		if (kit) { warm(kit); }
		if (document.readyState === 'complete') { idle(); } else { window.addEventListener('load', idle); }
	}
	if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }

	window.omBooking = { scan: scan, show: show, mount: mount };
})();
