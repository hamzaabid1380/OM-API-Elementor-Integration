/* OM Catalog settings screen: tabs, cards, settings search and a save bar.
   The page works without this script (one long form); it only arranges it. */
(function () {
	'use strict';

	var wrap = document.querySelector('.om-admin');
	var form = wrap && wrap.querySelector('.om-admin-form');
	if (!wrap || !form) { return; }

	var ICON = {
		overview: '<path d="M4 13h6V4H4zm10 7h6V11h-6zM4 20h6v-4H4zM14 4v4h6V4z"/>',
		connection: '<path d="M9 7H7a5 5 0 0 0 0 10h2m6-10h2a5 5 0 0 1 0 10h-2M8 12h8"/>',
		pricing: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01"/>',
		product: '<path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 3h7m-7 3h5"/>',
		look: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.9 1.4-1.9-.4-1.1.4-2.1 1.5-2.1H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10zM7.5 11.5h.01M10 7.5h.01M15 7.5h.01"/>',
		builder: '<path d="M12 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM9 3h6l2 4-5 3-5-3z"/>',
		inquiries: '<path d="M4 5h16v11H8l-4 4z"/>',
		emails: '<path d="M3 6h18v12H3zM3 7l9 6 9-6"/>',
		assistant: '<path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z"/>',
		search: '<path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm5-2 5 5M8 13v-2m3 2V9m3 4v-3"/>',
		tools: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1z"/>'
	};
	var TABS = [
		['overview', 'Overview'],
		['connection', 'Connection & cache'],
		['pricing', 'Pricing'],
		['product', 'Product pages'],
		['look', 'Look & feel'],
		['builder', 'Ring builder & diamonds'],
		['inquiries', 'Inquiries'],
		['emails', 'Emails'],
		['assistant', 'AI assistant'],
		['search', 'Search & analytics'],
		['tools', 'Tools']
	];
	var SAVELESS = { overview: true, tools: true };

	/* ---- Layout: menu + main column ---- */
	var layout = document.createElement('div');
	layout.className = 'om-admin-layout';
	var nav = document.createElement('nav');
	nav.className = 'om-admin-nav';
	nav.setAttribute('aria-label', 'Settings sections');
	var main = document.createElement('div');
	main.className = 'om-admin-main';
	form.parentNode.insertBefore(layout, form);
	layout.appendChild(nav);
	layout.appendChild(main);

	// Everything after the form (Tools, Shortcuts) joins the main column.
	var outside = document.createElement('div');
	outside.className = 'om-admin-outside';
	while (layout.nextSibling) { outside.appendChild(layout.nextSibling); }
	main.appendChild(form);
	main.appendChild(outside);

	// Each heading and what follows it (up to the next heading) becomes a card.
	function cardify(container) {
		var heads = Array.prototype.filter.call(container.children, function (el) { return el.matches('h2.om-sec'); });
		heads.forEach(function (h) {
			var card = document.createElement('section');
			card.className = 'om-card';
			card.setAttribute('data-om-tab', h.getAttribute('data-om-tab'));
			h.parentNode.insertBefore(card, h);
			var el = h;
			while (el && !(el !== h && el.matches && el.matches('h2.om-sec, .om-admin-savebar'))) {
				var next = el.nextElementSibling;
				card.appendChild(el);
				el = next;
			}
		});
	}
	cardify(form);
	cardify(outside);

	// Overview: the status as cards, then shortcuts.
	var status = wrap.querySelector('.om-admin-status');
	if (status) {
		var ov = document.createElement('section');
		ov.className = 'om-card om-card--overview';
		ov.setAttribute('data-om-tab', 'overview');
		ov.innerHTML = '<h2>Welcome</h2><p class="description">Everything the plugin does, one section at a time. Pick a section on the left, or search for a setting.</p>';
		ov.appendChild(status);
		outside.insertBefore(ov, outside.firstChild);
	}

	/* ---- Menu ---- */
	var search = document.createElement('div');
	search.className = 'om-admin-search';
	search.innerHTML = '<label class="screen-reader-text" for="om-admin-q">Search settings</label><input type="search" id="om-admin-q" placeholder="Search settings…" autocomplete="off" />';
	nav.appendChild(search);
	var list = document.createElement('ul');
	nav.appendChild(list);
	TABS.forEach(function (tab) {
		if (!main.querySelector('.om-card[data-om-tab="' + tab[0] + '"]')) { return; }
		var li = document.createElement('li');
		li.innerHTML = '<a href="#' + tab[0] + '" data-om-go="' + tab[0] + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[tab[0]] + '</svg><span></span></a>';
		li.querySelector('span').textContent = tab[1];
		list.appendChild(li);
	});

	var savebar = form.querySelector('.om-admin-savebar');
	var current = '';

	function show(tab, focus) {
		if (!main.querySelector('.om-card[data-om-tab="' + tab + '"]')) { tab = 'overview'; }
		current = tab;
		wrap.classList.remove('is-searching');
		main.querySelectorAll('.om-card').forEach(function (card) {
			card.hidden = card.getAttribute('data-om-tab') !== tab;
			card.querySelectorAll('tr').forEach(function (tr) { tr.hidden = false; });
		});
		list.querySelectorAll('a').forEach(function (a) {
			if (a.getAttribute('data-om-go') === tab) { a.setAttribute('aria-current', 'page'); } else { a.removeAttribute('aria-current'); }
		});
		if (savebar) { savebar.classList.toggle('is-away', !!SAVELESS[tab] && !dirty); }
		// Visual editors that were hidden size themselves once shown.
		setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 30);
		if (window.history.replaceState) { window.history.replaceState(null, '', '#' + tab); }
		if (focus) {
			var first = main.querySelector('.om-card:not([hidden]) h2');
			if (first) { first.setAttribute('tabindex', '-1'); first.focus({ preventScroll: true }); }
			window.scrollTo({ top: 0 });
		}
	}

	// A field the browser won't accept blocks the whole save. When it sits
	// on another tab the browser can't point at it, so the save just seems
	// to do nothing: open its tab and show the message instead.
	var invalidShown = false;
	form.addEventListener('invalid', function (e) {
		if (invalidShown) { return; }
		invalidShown = true;
		var field = e.target;
		var card = field.closest('.om-card');
		if (card && card.hidden) { show(card.getAttribute('data-om-tab')); }
		setTimeout(function () {
			invalidShown = false;
			field.scrollIntoView({ block: 'center' });
			field.focus({ preventScroll: true });
			if (field.reportValidity) { field.reportValidity(); }
		}, 60);
	}, true);

	wrap.addEventListener('click', function (e) {
		var a = e.target.closest('[data-om-go]');
		if (!a) { return; }
		e.preventDefault();
		var q = document.getElementById('om-admin-q');
		if (q) { q.value = ''; }
		show(a.getAttribute('data-om-go'), true);
	});

	/* ---- Search: rows that mention the words, across all sections ---- */
	document.getElementById('om-admin-q').addEventListener('input', function () {
		var q = this.value.trim().toLowerCase();
		if (!q) { show(current || 'overview'); return; }
		wrap.classList.add('is-searching');
		main.querySelectorAll('.om-card').forEach(function (card) {
			if (card.classList.contains('om-card--overview')) { card.hidden = true; return; }
			var rows = card.querySelectorAll('.form-table > tbody > tr, .form-table > tr');
			var head = (card.querySelector('h2') || {}).textContent || '';
			var headHit = head.toLowerCase().indexOf(q) !== -1;
			var any = headHit;
			rows.forEach(function (tr) {
				var hit = headHit || tr.textContent.toLowerCase().indexOf(q) !== -1;
				tr.hidden = !hit;
				any = any || hit;
			});
			if (!rows.length) { any = any || card.textContent.toLowerCase().indexOf(q) !== -1; }
			card.hidden = !any;
		});
		list.querySelectorAll('a').forEach(function (a) { a.removeAttribute('aria-current'); });
	});

	/* ---- AI assistant: only the chosen provider's rows; the test button ---- */
	var providerSel = form.querySelector('[data-om-ai-provider]');
	function syncProvider() {
		form.querySelectorAll('[data-om-ai-for]').forEach(function (row) {
			row.classList.toggle('om-ai-other', row.getAttribute('data-om-ai-for') !== providerSel.value);
		});
	}
	if (providerSel) { providerSel.addEventListener('change', syncProvider); syncProvider(); }
	var testBtn = form.querySelector('[data-om-ai-test]');
	if (testBtn && window.fetch) {
		testBtn.addEventListener('click', function () {
			var out = form.querySelector('.om-ai-test-result');
			testBtn.disabled = true;
			out.className = 'om-ai-test-result';
			out.textContent = 'Asking…';
			var body = new URLSearchParams({ action: 'om_assistant_test', nonce: testBtn.getAttribute('data-nonce') });
			fetch(window.ajaxurl, { method: 'POST', credentials: 'same-origin', body: body }).then(function (r) { return r.json(); }).then(function (r) {
				out.textContent = '';
				if (r && r.success) {
					out.classList.add('is-ok');
					var d = r.data;
					[['Question', d.question], ['Reply', d.reply], ['Designs shown', (d.designs || []).join(', ') || '—'], ['Answered by', d.via + ' in ' + (d.ms / 1000).toFixed(1) + ' s']].forEach(function (row) {
						var p = document.createElement('p');
						var b = document.createElement('strong');
						b.textContent = row[0] + ': ';
						p.appendChild(b);
						p.appendChild(document.createTextNode(row[1]));
						out.appendChild(p);
					});
				} else {
					out.classList.add('is-error');
					out.textContent = 'No answer: ' + ((r && r.data && r.data.message) || 'unknown error') + '. Check the key and model, and that you saved.';
				}
			}).catch(function () {
				out.classList.add('is-error');
				out.textContent = 'The request failed. Please try again.';
			}).then(function () { testBtn.disabled = false; });
		});
	}

	/* ---- Emails: logo picker, placeholders, preview and test ---- */
	document.querySelectorAll('[data-om-media]').forEach(function (btn) {
		btn.addEventListener('click', function () {
			if (!window.wp || !window.wp.media) { return; }
			var input = document.querySelector(btn.getAttribute('data-om-media'));
			var frame = window.wp.media({ title: 'Choose your logo', library: { type: 'image' }, multiple: false });
			frame.on('select', function () {
				var img = frame.state().get('selection').first().toJSON();
				input.value = img.url;
				input.dispatchEvent(new Event('input', { bubbles: true }));
			});
			frame.open();
		});
	});

	// The field the placeholders go into: the last one used in that email.
	var lastField = {};
	function emailOf(el) { var t = el.closest('[data-om-email]'); return t ? t.getAttribute('data-om-email') : ''; }
	form.addEventListener('focusin', function (e) {
		if (e.target.matches('[data-om-token-target]')) { lastField[emailOf(e.target)] = e.target; }
	});
	function hookEditor(ed) {
		ed.on('change keyup input undo redo', function () { markDirty(); });
		ed.on('focus', function () {
			var area = document.getElementById(ed.id);
			if (area) { lastField[emailOf(area)] = ed; }
		});
	}
	if (window.tinymce) {
		window.tinymce.on('AddEditor', function (e) { hookEditor(e.editor); });
		(window.tinymce.editors || []).forEach(hookEditor);
	}
	form.addEventListener('click', function (e) {
		var chip = e.target.closest('[data-om-token]');
		if (!chip) { return; }
		var id = emailOf(chip);
		var token = chip.getAttribute('data-om-token');
		var target = lastField[id];
		if (!target) {
			var area = chip.closest('td').querySelector('textarea.wp-editor-area');
			target = area && window.tinymce && window.tinymce.get(area.id) && !window.tinymce.get(area.id).isHidden() ? window.tinymce.get(area.id) : area;
		}
		if (target && target.insertContent) {
			target.focus();
			target.insertContent(token);
		} else if (target) {
			var start = target.selectionStart || target.value.length;
			if (start && !/\s/.test(target.value.charAt(start - 1))) { token = ' ' + token; }
			target.value = target.value.slice(0, start) + token + target.value.slice(target.selectionEnd || start);
			target.focus();
			target.selectionStart = target.selectionEnd = start + token.length;
		}
		markDirty();
	});

	var previewDialog = null;
	function emailPayload(id, action) {
		if (window.tinymce) { window.tinymce.triggerSave(); }
		var data = new FormData();
		data.append('action', action);
		data.append('id', id);
		data.append('nonce', (document.getElementById('om-email-nonce') || {}).value || '');
		new FormData(form).forEach(function (value, key) {
			if (key.indexOf('om_email_' + id + '[') === 0 || key.indexOf('om_email_design[') === 0) { data.append(key, value); }
		});
		return data;
	}
	form.addEventListener('click', function (e) {
		var prev = e.target.closest('[data-om-email-preview]');
		var test = e.target.closest('[data-om-email-test]');
		if (!prev && !test) { return; }
		var btn = prev || test;
		var id = btn.getAttribute(prev ? 'data-om-email-preview' : 'data-om-email-test');
		var status = btn.parentNode.querySelector('.om-email-status');
		btn.disabled = true;
		status.className = 'om-email-status';
		status.textContent = prev ? 'Preparing…' : 'Sending…';
		fetch(window.ajaxurl, { method: 'POST', credentials: 'same-origin', body: emailPayload(id, prev ? 'om_email_preview' : 'om_email_test') })
			.then(function (r) { return r.json(); })
			.then(function (r) {
				if (!(r && r.success)) { throw new Error((r && r.data && r.data.message) || 'error'); }
				if (test) { status.classList.add('is-ok'); status.textContent = r.data.message; return; }
				status.textContent = '';
				if (!previewDialog) {
					previewDialog = document.createElement('dialog');
					previewDialog.className = 'om-email-preview';
					previewDialog.innerHTML = '<div class="om-email-preview-head"><p class="om-email-preview-subject"></p><button type="button" class="button">Close</button></div><iframe title="Email preview"></iframe>';
					document.body.appendChild(previewDialog);
					previewDialog.querySelector('button').addEventListener('click', function () { previewDialog.close(); });
					previewDialog.addEventListener('click', function (ev) { if (ev.target === previewDialog) { previewDialog.close(); } });
				}
				previewDialog.querySelector('.om-email-preview-subject').textContent = 'Subject: ' + r.data.subject;
				previewDialog.querySelector('iframe').srcdoc = r.data.html;
				if (previewDialog.showModal) { previewDialog.showModal(); }
			})
			.catch(function (err) {
				status.classList.add('is-error');
				status.textContent = err.message === 'error' ? 'That didn’t work. Please try again.' : err.message;
			})
			.then(function () { btn.disabled = false; });
	});

	/* ---- Colour fields: a live swatch beside the hex value ---- */
	form.querySelectorAll('input.om-color-field').forEach(function (input) {
		var box = document.createElement('span');
		box.className = 'om-admin-color';
		input.parentNode.insertBefore(box, input);
		box.appendChild(input);
		var sw = document.createElement('span');
		sw.className = 'om-admin-swatch';
		sw.setAttribute('aria-hidden', 'true');
		box.appendChild(sw);
		var paint = function () {
			var v = input.value.trim() || input.getAttribute('placeholder') || '';
			sw.style.background = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v) ? v : 'transparent';
		};
		input.addEventListener('input', paint);
		paint();
	});

	/* ---- Unsaved changes ---- */
	var dirty = false;
	var text = savebar && savebar.querySelector('.om-admin-savebar-text');
	function markDirty() {
		if (dirty) { return; }
		dirty = true;
		if (savebar) { savebar.classList.add('is-dirty'); savebar.classList.remove('is-away'); }
		if (text) { text.textContent = 'You have unsaved changes'; }
	}
	form.addEventListener('input', markDirty);
	form.addEventListener('change', markDirty);
	form.addEventListener('submit', function () {
		dirty = false;
		try { window.sessionStorage.setItem('om_admin_after_save', current); } catch (err) { /* fine */ }
	});
	window.addEventListener('beforeunload', function (e) {
		if (dirty) { e.preventDefault(); e.returnValue = ''; }
	});

	/* ---- Start: #tab, the tab saved before "Save", Tools after a test ---- */
	var start = '';
	try {
		start = window.sessionStorage.getItem('om_admin_after_save') || '';
		window.sessionStorage.removeItem('om_admin_after_save');
	} catch (err) { start = ''; }
	if (!start) { start = (window.location.hash || '').slice(1); }
	if (!start && /[?&]om_tool=/.test(window.location.search)) { start = 'tools'; }
	show(start || 'overview');
	wrap.classList.add('is-ready');
}());
