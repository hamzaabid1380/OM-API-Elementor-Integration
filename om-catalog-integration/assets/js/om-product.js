(function ($) {
	'use strict';

	var cfg = window.omCatalog || {};
	document.documentElement.classList.add('om-js');
	var i18n = cfg.i18n || {};

	function t(key, fallback) {
		return i18n[key] || fallback;
	}

	/* =========================================================
	   Analytics: what visitors do, sent to the site's own GA4 (gtag),
	   Google Tag Manager and Meta pixel — only those already on the page;
	   nothing is loaded or sent elsewhere. Every event is also a
	   document "om:track" event ({ name, params }) for other tools.
	   ========================================================= */

	// Not while designing the page in Elementor.
	function trackOff() { return !!(document.body && document.body.classList.contains('elementor-editor-active')); }

	/**
	 * @param {string} name   GA4 event name (recommended names where one fits).
	 * @param {Object} params GA4 parameters; "items" makes it an ecommerce event.
	 * @param {Array}  meta   [ 'track' | 'trackCustom', name, data ] for the Meta pixel.
	 */
	function track(name, params, meta) {
		if (trackOff()) { return; }
		params = params || {};
		try { document.dispatchEvent(new CustomEvent('om:track', { detail: { name: name, params: params } })); } catch (err) { /* old browser */ }
		if (!cfg.track) { return; }
		var sent = [];
		try {
			if (typeof window.gtag === 'function') {
				window.gtag('event', name, params);
				sent.push('GA4');
			}
			if (window.google_tag_manager && window.dataLayer && window.dataLayer.push) {
				if (params.items) {
					window.dataLayer.push({ ecommerce: null });
					window.dataLayer.push({ event: name, ecommerce: params });
				} else {
					window.dataLayer.push($.extend({ event: name }, params));
				}
				sent.push('GTM');
			}
			if (meta && cfg.trackMeta && typeof window.fbq === 'function') {
				window.fbq(meta[0], meta[1], meta[2] || {});
				sent.push('Meta ' + meta[1]);
			}
		} catch (err) { /* never break the page for analytics */ }
		if (cfg.trackDebug && window.console) {
			window.console.info('[OM event] ' + name + (sent.length ? ' → ' + sent.join(', ') : ' (no GA4 / GTM / Meta pixel on this page)'), params);
		}
	}

	// One design as a GA4 item.
	function trackItem(x) {
		var item = { item_id: String(x.s || ''), item_name: x.t || String(x.s || '') };
		if (x.l) { item.item_category = String(x.l).replace(/-/g, ' '); }
		if (x.v) { item.item_variant = x.v; }
		if (x.price) { item.price = x.price; }
		return item;
	}

	// A shown price ("$1,188.00") as a number, or 0.
	function priceNumber(text) {
		var n = parseFloat(String(text || '').replace(/[^0-9.]/g, ''));
		return isFinite(n) ? n : 0;
	}

	// A design viewed (product page or quick view).
	function trackView($root, how) {
		var el = $root.find('.om-product-wrap[data-om-recent-item]').addBack('.om-product-wrap[data-om-recent-item]')[0];
		if (!el) { return; }
		var x;
		try { x = JSON.parse(el.getAttribute('data-om-recent-item')); } catch (err) { return; }
		var price = priceNumber($(el).find('.om-price-amount:not([hidden])').first().text());
		x.price = price;
		var params = { currency: cfg.currency || 'USD', items: [trackItem(x)], view_method: how };
		if (price) { params.value = price; }
		track('view_item', params, ['track', 'ViewContent', $.extend({ content_ids: [String(x.s)], content_name: x.t, content_type: 'product', content_category: x.l }, price ? { value: price, currency: cfg.currency || 'USD' } : {})]);
	}

	var lastSearch = null;
	function trackSearch(href) {
		var q = '';
		try { q = new URL(href, window.location.href).searchParams.get('om_q') || ''; } catch (err) { return; }
		q = $.trim(q);
		if (!q || q === lastSearch) { return; }
		lastSearch = q;
		track('search', { search_term: q }, ['track', 'Search', { search_string: q }]);
	}

	/* =========================================================
	   Product page: live re-quote
	   ========================================================= */

	var quoteSeq = 0;

	// Show the price, or fall back (text / buttons) when there isn't one,
	// and flip buttons whose visibility depends on that.
	function setPriceState($wrap, priceText) {
		var hasPrice = !!priceText;
		var $price = $wrap.find('.om-price');
		$price.toggleClass('is-fallback', !hasPrice);
		var $amount = $price.find('.om-price-amount');
		var changed = hasPrice && $amount.text() !== priceText && !$amount.prop('hidden');
		$amount.prop('hidden', !hasPrice).text(priceText || '');
		// A new price settles in gently so the change is noticed.
		if (changed && $amount[0]) {
			$amount.removeClass('is-updated');
			void $amount[0].offsetWidth;
			$amount.addClass('is-updated');
		}
		$price.find('.om-price-fallback').prop('hidden', hasPrice);
		$wrap.find('.om-btn[data-om-show="no_price"]').prop('hidden', hasPrice);
		$wrap.find('.om-btn[data-om-show="with_price"]').prop('hidden', !hasPrice);
		$wrap.find('.om-sticky-price').text(priceText || '');
	}

	// Product options can be dropdowns or radio groups (swatches/pills).
	function optVal($wrap, name) {
		var $radio = $wrap.find('input[name="' + name + '"]:checked');
		if ($radio.length) { return $radio.val(); }
		return $wrap.find('select[name="' + name + '"]').val() || '';
	}

	function setOpt($wrap, name, value) {
		var $radio = $wrap.find('input[name="' + name + '"]').filter(function () { return this.value === value; });
		if ($radio.length) {
			$radio.prop('checked', true);
			$radio.closest('[data-om-opt]').find('.om-opt-current').text(value);
			return;
		}
		var $select = $wrap.find('select[name="' + name + '"]');
		if ($select.find('option').filter(function () { return this.value === value; }).length) {
			$select.val(value);
		}
	}

	// "Metal: 14 KT, Color: White, Ring size: 6" for inquiries.
	function optionsSummary($wrap) {
		return $wrap.find('[data-om-opt]').map(function () {
			var name = $(this).attr('data-om-opt');
			var value = optVal($wrap, name);
			return value ? $(this).attr('data-om-label') + ': ' + (value === 'unsure' ? t('sizeUnsure', 'not sure') : value) : null;
		}).get().join(', ');
	}

	$(document).on('change', '.om-option', function () {
		var $wrap = $(this).closest('.om-product-wrap');
		var $group = $(this).closest('[data-om-opt]');
		$group.find('.om-opt-current').text(this.value);

		// "Not sure" of the ring size: open the size guide.
		if (this.name === 'finger_size' && this.value === 'unsure') {
			openSizeGuide(this);
		}

		// Prices are off (no markup, or the layout never shows them).
		if (String($wrap.data('priced')) !== '1' || !cfg.ajaxUrl) {
			return;
		}

		var seq = ++quoteSeq;
		var $price = $wrap.find('.om-price');
		$price.addClass('om-price-loading');

		$.post(cfg.ajaxUrl, {
			action: 'om_get_quote',
			line: $wrap.data('line'),
			styleNumber: $wrap.data('style'),
			metal: optVal($wrap, 'metal'),
			color: optVal($wrap, 'color'),
			level: optVal($wrap, 'level'),
			quality: optVal($wrap, 'quality'),
			fingerSize: /^[\d.]+$/.test(optVal($wrap, 'finger_size')) ? optVal($wrap, 'finger_size') : ''
		}).done(function (response) {
			if (seq !== quoteSeq) {
				return; // A newer change is in flight; ignore this answer.
			}
			if (response && response.success) {
				setPriceState($wrap, response.data.price_formatted);
				// Sync the dropdowns to the configuration OM actually priced
				// (e.g. a single-colour metal forces its colour).
				$.each(response.data.config || {}, function (name, value) {
					if (value) { setOpt($wrap, name, value); }
				});
				applyMediaColor($wrap);
				applySetColor($wrap);
			} else {
				setPriceState($wrap, '');
			}
		}).fail(function () {
			if (seq === quoteSeq) {
				setPriceState($wrap, '');
			}
		}).always(function () {
			if (seq === quoteSeq) {
				$price.removeClass('om-price-loading');
			}
		});
	});

	// Ring builder: carry the chosen metal/colour into the builder.
	$(document).on('click', '.om-builder-btn', function () {
		var $wrap = $(this).closest('.om-product-wrap');
		var href = $(this).attr('data-om-builder');
		if (!href) {
			return;
		}
		try {
			var url = new URL(href, window.location.href);
			var metal = optVal($wrap, 'metal');
			var color = optVal($wrap, 'color');
			if (metal) { url.searchParams.set('rb_metal', metal); }
			if (color) { url.searchParams.set('rb_color', color); }
			this.href = url.toString();
		} catch (err) { /* keep the plain link */ }
	});

	/* =========================================================
	   Product page: gallery, hover zoom, videos, lightbox
	   ========================================================= */

	function showImage($gallery, src) {
		var $main = $gallery.find('.om-main-image');
		$gallery.find('.om-main-video').prop('hidden', true).empty();
		$gallery.find('.om-zoom').prop('hidden', false);
		$main.css('opacity', 0);
		$main.one('load', function () { $main.css('opacity', 1); });
		$main.attr('src', src);
		if ($main[0] && $main[0].complete) {
			$main.css('opacity', 1);
		}
	}

	/* ---------- Product video ---------- */

	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var saveData = !!(navigator.connection && navigator.connection.saveData);

	// Autoplaying product videos run muted (browsers require it); give
	// them a sound toggle, and respect reduced-motion / data-saver
	// visitors by starting paused with controls instead.
	function decorateMainVideo($gallery) {
		var $box = $gallery.find('.om-main-video');
		var video = $box.find('video')[0];
		$box.find('.om-sound').remove();
		if (!video) { return; }
		// A file the browser can't play: fall back to the photos.
		video.addEventListener('error', function () { videoFailed($gallery); });
		if (video.error) { videoFailed($gallery); return; }
		var initial = !$gallery.data('omDecorated');
		$gallery.data('omDecorated', true);
		// "Autoplay" off in the widget: the first video waits for a click
		// (later ones start because the visitor clicked their thumbnail).
		if (reduceMotion || saveData || (initial && $gallery.is('[data-om-no-autoplay]'))) {
			video.removeAttribute('autoplay');
			video.pause();
			video.controls = true;
			return;
		}
		var play = video.play && video.play();
		if (play && play.catch) { play.catch(function () { video.controls = true; }); }
		// Sound toggle (unless the widget turns it off).
		if (!$gallery.is('[data-om-no-sound]')) {
			$('<button type="button" class="om-sound" aria-pressed="false"></button>')
				.attr('aria-label', t('unmute', 'Turn sound on'))
				.on('click', function () {
					video.muted = !video.muted;
					$(this).toggleClass('is-on', !video.muted).attr('aria-pressed', String(!video.muted))
						.attr('aria-label', video.muted ? t('unmute', 'Turn sound on') : t('mute', 'Turn sound off'));
				})
				.appendTo($box);
		}
		// Pause while scrolled out of view.
		if (window.IntersectionObserver) {
			new IntersectionObserver(function (entries) {
				if (!video.isConnected) { return; }
				if (entries[0].isIntersecting) { video.play && video.play().catch(function () {}); } else { video.pause(); }
			}, { threshold: 0.2 }).observe(video);
		}
	}

	function videoFailed($gallery) {
		var $photo = $gallery.find('.om-thumb-btn:not(.om-thumb--video):not([hidden])').first();
		$gallery.find('.om-thumb--video, .om-watch-video, .om-media-expand').remove();
		$gallery.removeClass('has-video is-video-first');
		$gallery.find('.om-main-video').prop('hidden', true).empty();
		if ($photo.length) {
			$photo.addClass('is-active');
			showImage($gallery, $photo.attr('data-full'));
		} else {
			$gallery.find('.om-zoom').prop('hidden', false);
		}
		if ($gallery.find('.om-thumb-btn').length < 2) { $gallery.find('.om-thumbs').remove(); }
	}

	function showVideo($gallery, html) {
		$gallery.find('.om-zoom').prop('hidden', true);
		$gallery.find('.om-watch-video').prop('hidden', true);
		$gallery.find('.om-media-expand').prop('hidden', false);
		$gallery.find('.om-main-video').html(html).prop('hidden', false);
		decorateMainVideo($gallery);
	}

	$(document).on('click', '.om-thumb-btn', function () {
		var $btn = $(this);
		var $gallery = $btn.closest('.om-product-gallery');
		$gallery.find('.om-thumb-btn').removeClass('is-active');
		$btn.addClass('is-active');
		if ($btn.attr('data-video')) {
			showVideo($gallery, $btn.attr('data-video'));
		} else {
			$gallery.find('.om-media-expand').prop('hidden', true);
			$gallery.find('.om-watch-video').prop('hidden', false);
			showImage($gallery, $btn.attr('data-full'));
		}
		updateMediaCount($gallery);
	});

	// "2 / 5" on the photo: position among the thumbnails shown.
	function updateMediaCount($gallery) {
		var $visible = $gallery.find('.om-thumb-btn:not([hidden])');
		var index = $visible.index($visible.filter('.is-active'));
		$gallery.find('.om-media-index').text(Math.max(0, index) + 1);
		$gallery.find('.om-media-total').text($visible.length || 1);
	}

	// Phones: swipe the main photo to move through the gallery.
	var swipeStart = null;
	$(document).on('touchstart', '.om-main-media', function (e) {
		var t = e.originalEvent.touches && e.originalEvent.touches[0];
		swipeStart = t ? { x: t.clientX, y: t.clientY } : null;
	});
	$(document).on('touchend', '.om-main-media', function (e) {
		var t = e.originalEvent.changedTouches && e.originalEvent.changedTouches[0];
		if (!swipeStart || !t) { return; }
		var dx = t.clientX - swipeStart.x;
		var dy = t.clientY - swipeStart.y;
		swipeStart = null;
		if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.4) { return; }
		var $gallery = $(this).closest('.om-product-gallery');
		var $visible = $gallery.find('.om-thumb-btn:not([hidden])');
		if ($visible.length < 2) { return; }
		var index = $visible.index($visible.filter('.is-active'));
		var next = (Math.max(0, index) + (dx < 0 ? 1 : -1) + $visible.length) % $visible.length;
		$visible.eq(next).trigger('click');
	});

	// Copy the style number (handy when calling or emailing the store).
	$(document).on('click', '.om-copy-style', function () {
		var btn = this;
		var text = btn.getAttribute('data-om-copy') || '';
		var done = function () {
			$(btn).find('.om-copy-done').text(t('copied', 'Copied'));
			clearTimeout(btn._omCopy);
			btn._omCopy = setTimeout(function () { $(btn).find('.om-copy-done').text(''); }, 1600);
		};
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text).then(done, function () {});
		} else {
			var area = document.createElement('textarea');
			area.value = text; document.body.appendChild(area); area.select();
			try { document.execCommand('copy'); done(); } catch (err) { /* nothing */ }
			area.remove();
		}
	});

	// Modern design: sections below the fold fade up as they come into view.
	var revealBound = false;
	function initReveal(root) {
		if (reduceMotion || !window.IntersectionObserver) { return; }
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
			});
		}, { threshold: 0.12 });
		// Anything already scrolled past (a jump to the form, a fast
		// fling) is shown too, so nothing can stay invisible.
		if (!revealBound) {
			revealBound = true;
			var ticking = false;
			$(window).on('scroll.omReveal', function () {
				if (ticking) { return; }
				ticking = true;
				window.requestAnimationFrame(function () {
					ticking = false;
					$('.om-reveal:not(.is-in)').each(function () {
						if (this.getBoundingClientRect().top < window.innerHeight * 0.95) { this.classList.add('is-in'); }
					});
				});
			});
		}
		$(root).find('.om-design-modern').not('.om-quick-view .om-design-modern').each(function () {
			$(this).find('.om-options-form, .om-product-details > .om-actions, .om-details, .om-product-inquiry').each(function () {
				if (this.getBoundingClientRect().top < window.innerHeight * 0.92) { return; } // Already on screen: no effect.
				this.classList.add('om-reveal');
				io.observe(this);
			});
		});
	}

	// Photos follow the metal colour: show the picked colour's photos and
	// videos (plus the ones that aren't colour-specific), and bring its
	// first one up in the main view.
	function applyMediaColor($wrap) {
		var $gallery = $wrap.find('.om-product-gallery[data-om-follow]').first();
		if (!$gallery.length) { return; }
		var color = optVal($wrap, 'color');
		if (!color && /platinum/i.test(optVal($wrap, 'metal'))) { color = 'White'; }
		var $thumbs = $gallery.find('.om-thumb-btn');
		var same = function (el) { return (el.getAttribute('data-om-color') || '').toLowerCase() === color.toLowerCase(); };
		var $own = $thumbs.filter(function () { return same(this); });
		if (!color || !$own.length) { return; } // Nothing for this colour: leave the gallery be.
		$thumbs.each(function () {
			this.hidden = !!this.getAttribute('data-om-color') && !same(this);
		});
		// Video thumbnails show the colour's first photo as their cover.
		var cover = $own.filter(':not(.om-thumb--video)').first().attr('data-full');
		if (cover) { $gallery.find('.om-thumb--video .om-thumb').attr('src', cover); }
		var $active = $thumbs.filter('.is-active');
		updateMediaCount($gallery);
		if ($active.length && same($active[0])) { return; }
		// Same kind as what was showing: a video for a video, else a photo.
		var wantVideo = $active.hasClass('om-thumb--video') || (!$active.length && $gallery.hasClass('is-video-first'));
		var $next = $own.filter(wantVideo ? '.om-thumb--video' : ':not(.om-thumb--video)').first();
		if (!$next.length) { $next = $own.first(); }
		$next.trigger('click');
	}

	$(document).on('change', '.om-option[name="color"], .om-option[name="metal"]', function () {
		applyMediaColor($(this).closest('.om-product-wrap'));
		applySetColor($(this).closest('.om-product-wrap'));
	});

	// "Complete the set" follows the metal picked: each design's photos in
	// that colour, and its link opens in the same metal and colour.
	function applySetColor($wrap) {
		var metal = optVal($wrap, 'metal');
		var color = optVal($wrap, 'color');
		if (!color && /platinum/i.test(metal)) { color = 'White'; }
		$('.om-related--set .om-card-cell').each(function () {
			var $cell = $(this);
			var map = {};
			try { map = JSON.parse($cell.attr('data-om-imgs') || '{}') || {}; } catch (err) { map = {}; }
			var key = Object.keys(map).filter(function (k) { return k.toLowerCase() === (color || '').toLowerCase(); })[0];
			if (key) {
				var $imgs = $cell.find('.om-card-image img');
				$imgs.filter(':not(.om-card-hover)').attr('src', map[key][0]);
				if (map[key][1]) { $imgs.filter('.om-card-hover').attr('src', map[key][1]); }
			}
			$cell.find('a.om-card').each(function () {
				try {
					var url = new URL(this.href, window.location.href);
					if (color) { url.searchParams.set('om_color', color); } else { url.searchParams.delete('om_color'); }
					if (metal) { url.searchParams.set('om_metal', metal); } else { url.searchParams.delete('om_metal'); }
					this.href = url.toString();
				} catch (err) { /* keep the link */ }
			});
		});
	}

	// The product page URL with the chosen options, so a link reopens the
	// exact configuration (used by inquiries and carat switches).
	function configuredUrl($wrap, href) {
		try {
			var url = new URL(href || window.location.href, window.location.href);
			['metal', 'color', 'level', 'quality'].forEach(function (name) {
				var value = optVal($wrap, name);
				if (value) { url.searchParams.set('om_' + name, value); } else { url.searchParams.delete('om_' + name); }
			});
			var size = optVal($wrap, 'finger_size');
			if (/^[\d.]+$/.test(size)) { url.searchParams.set('om_size', size); } else { url.searchParams.delete('om_size'); }
			return url.toString();
		} catch (err) { return href || ''; }
	}

	// Switching carat (another style number) or opening the full page from
	// quick view keeps the metal, colour, setting, quality and size chosen.
	$(document).on('click', '[data-om-keep-options]', function () {
		this.href = configuredUrl($(this).closest('.om-product-wrap'), this.href);
	});

	/* ---------- Carat switch in place (each carat is its own style) ----------
	   The other carat's page is fetched in the background (already on hover
	   or touch) and its product section swapped in, with a cross-fade, the
	   address and tab title updated — no page reload. In quick view, the
	   pop-up loads that carat. Anything unexpected falls back to the link. */

	var variantCache = {};
	function fetchVariant(href) {
		var key = href.split('#')[0];
		if (!variantCache[key]) {
			variantCache[key] = $.ajax({ url: key, dataType: 'html', timeout: 15000 });
			variantCache[key].fail(function () { delete variantCache[key]; });
		}
		return variantCache[key];
	}

	$(document).on('mouseenter touchstart focusin', '.om-product-wrap .om-variant-link:not(.is-current)', function () {
		if ($(this).closest('.om-quick-view').length || !window.history.pushState) { return; }
		fetchVariant(configuredUrl($(this).closest('.om-product-wrap'), this.href));
	});

	$(document).on('click', '.om-variant-link', function (e) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) { return; }
		if ($(this).hasClass('is-current')) { e.preventDefault(); return; }
		var line = this.getAttribute('data-om-line');
		var style = this.getAttribute('data-om-style');
		if ($(this).closest('.om-quick-view').length) {
			if (line && style) { e.preventDefault(); openQuickView(line, style, this); }
			return;
		}
		if (!window.history.pushState || !window.DOMParser) { return; }
		e.preventDefault();
		switchVariant($(this).closest('.om-product-wrap'), this.href, $.trim($(this).text()), style);
	});

	function switchVariant($wrap, href, label, style) {
		// The page layout this product sits in (its Elementor page, else the
		// product section itself), so every widget on it follows.
		var root = $wrap.closest('[data-elementor-id]')[0] || $wrap[0];
		var rootId = root.getAttribute('data-elementor-id');
		$wrap.addClass('is-switching').attr('aria-busy', 'true');
		var $current = $wrap.find('.om-variant-link').removeClass('is-current').removeAttr('aria-current');
		$current.filter('[data-om-style="' + style + '"]').addClass('is-current is-pending');
		fetchVariant(href).done(function (html) {
			var doc = new window.DOMParser().parseFromString(html, 'text/html');
			var fresh = rootId ? doc.querySelector('[data-elementor-id="' + rootId + '"]') : doc.querySelector('.om-product-wrap');
			if (!fresh || !fresh.querySelector('.om-product-wrap')) { window.location.href = href; return; }
			var swap = function () {
				var node = document.importNode(fresh, true);
				root.parentNode.replaceChild(node, root);
				afterVariantSwap(node, doc, style);
			};
			window.history.pushState({ omVariant: true }, '', href);
			omPushed = true;
			if (document.startViewTransition && !reduceMotion) {
				document.startViewTransition(swap);
			} else {
				swap();
			}
			announce(label);
		}).fail(function () { window.location.href = href; });
	}

	function afterVariantSwap(node, doc, style) {
		var $node = $(node);
		if (doc.title) { document.title = doc.title; }
		['link[rel="canonical"]', 'meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:url"]', 'meta[property="og:image"]'].forEach(function (sel) {
			var from = doc.querySelector(sel);
			var to = document.querySelector(sel);
			if (from && to) {
				var attr = from.hasAttribute('href') ? 'href' : 'content';
				to.setAttribute(attr, from.getAttribute(attr));
			}
		});
		initBlock(node);
		rememberProduct();
		fillCustomForms(node);
		initAutoplay(node);
		initStickyBar();
		initBackLink();
		$node.find('.om-product-gallery.is-video-first').each(function () { decorateMainVideo($(this)); });
		$node.find('.om-product-gallery').each(function () { updateMediaCount($(this)); });
		initReveal(node);
		$node.find('.om-reveal').addClass('is-in');
		// Elementor's own widgets on the page (tabs, sliders…).
		try {
			if (window.elementorFrontend && window.elementorFrontend.elementsHandler) {
				$node.find('.elementor-element').each(function () { window.elementorFrontend.elementsHandler.runReadyTrigger(this); });
			}
		} catch (err) { /* the swapped content still works without */ }
		var focusTo = $node.find('.om-variant-link[data-om-style="' + style + '"]')[0];
		if (focusTo && document.activeElement && (document.activeElement === document.body || !document.activeElement.isConnected)) { focusTo.focus({ preventScroll: true }); }
	}

	$(document).on('click', '.om-watch-video', function () {
		var $gallery = $(this).closest('.om-product-gallery');
		var $thumb = $gallery.find('.om-thumb--video').first();
		if ($thumb.length) { $thumb.trigger('click'); }
	});

	$(document).on('click', '.om-media-expand', function () {
		if ($(this).closest('.om-quick-view').length) { return; }
		var $gallery = $(this).closest('.om-product-gallery');
		var slides = lightboxSlides($gallery);
		var $active = $gallery.find('.om-thumb-btn.is-active');
		var index = $active.length ? $gallery.find('.om-thumb-btn:not([hidden])').index($active) : 0;
		// Stop the inline copy; the lightbox plays its own.
		$gallery.find('.om-main-video video').each(function () { this.pause(); });
		openLightbox(slides, Math.max(0, index), this);
	});

	// Hover zoom on devices with a precise pointer.
	var fineHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	if (fineHover) {
		$(document).on('mousemove', '.om-product-gallery:not(.om-no-zoom) .om-zoom', function (e) {
			var rect = this.getBoundingClientRect();
			var x = ((e.clientX - rect.left) / rect.width) * 100;
			var y = ((e.clientY - rect.top) / rect.height) * 100;
			$(this).addClass('is-zooming').find('.om-main-image').css('transform-origin', x + '% ' + y + '%');
		}).on('mouseleave', '.om-zoom', function () {
			$(this).removeClass('is-zooming');
		});
	}

	var lb = null;

	// Every photo and video of a gallery, in thumbnail order.
	function lightboxSlides($gallery) {
		var list = $gallery.find('.om-thumb-btn:not([hidden])').map(function () {
			return $(this).attr('data-video') ? { video: $(this).attr('data-video') } : { img: $(this).attr('data-full') };
		}).get();
		if (!list.length) {
			var $video = $gallery.find('.om-main-video');
			list = $video.children().length ? [{ video: $video.html() }] : [{ img: $gallery.find('.om-main-image').attr('src') }];
		}
		return list;
	}

	function openLightbox(images, index, returnFocus) {
		if (!lb) {
			lb = $(
				'<div class="om-lightbox" role="dialog" aria-modal="true" aria-label="' + t('gallery', 'Image gallery') + '" hidden>' +
					'<button type="button" class="om-lb-close" aria-label="' + t('close', 'Close') + '">&times;</button>' +
					'<button type="button" class="om-lb-prev" aria-label="' + t('prev', 'Previous image') + '">&lsaquo;</button>' +
					'<figure class="om-lb-stage"><img class="om-lb-img" alt="" /><div class="om-lb-video" hidden></div></figure>' +
					'<button type="button" class="om-lb-next" aria-label="' + t('next', 'Next image') + '">&rsaquo;</button>' +
					'<p class="om-lb-count" aria-live="polite"></p>' +
					'<div class="om-lb-zoom" role="group" aria-label="' + t('zoom', 'Zoom') + '">' +
						'<button type="button" class="om-lb-zoom-out" aria-label="' + t('zoomOut', 'Zoom out') + '">&minus;</button>' +
						'<button type="button" class="om-lb-zoom-in" aria-label="' + t('zoomIn', 'Zoom in') + '">+</button>' +
					'</div>' +
				'</div>'
			).appendTo(document.body);

			lb.on('click', function (e) {
				if (e.target === lb[0] || $(e.target).is('.om-lb-stage')) { closeLightbox(); }
			});
			lb.find('.om-lb-close').on('click', closeLightbox);
			lb.find('.om-lb-prev').on('click', function () { stepLightbox(-1); });
			lb.find('.om-lb-next').on('click', function () { stepLightbox(1); });

			// Swipe on touch screens (not while zoomed or pinching).
			var startX = null;
			lb.on('touchstart', function (e) { startX = e.originalEvent.touches.length === 1 && zoom.s === 1 ? e.originalEvent.touches[0].clientX : null; });
			lb.on('touchend', function (e) {
				if (startX === null || zoom.s !== 1 || zoom.pinched) { startX = null; return; }
				var dx = e.originalEvent.changedTouches[0].clientX - startX;
				if (Math.abs(dx) > 40) { stepLightbox(dx < 0 ? 1 : -1); }
				startX = null;
			});
			initZoom();
		}
		lb.data({ images: images, index: index, returnFocus: returnFocus });
		lb.toggleClass('is-single', images.length < 2);
		renderLightbox();
		lb.prop('hidden', false);
		$('html').addClass('om-lb-open');
		lb.find('.om-lb-close').trigger('focus');
	}

	function renderLightbox() {
		var images = lb.data('images');
		var index = lb.data('index');
		var slide = images[index];
		if (typeof slide === 'string') { slide = { img: slide }; }
		var $video = lb.find('.om-lb-video').empty();
		if (slide.video) {
			// Full screen: with sound controls available.
			var $player = $($.parseHTML(slide.video));
			$player.filter('video').add($player.find('video')).attr('controls', 'controls');
			$video.append($player).prop('hidden', false);
			lb.find('.om-lb-img').prop('hidden', true).removeAttr('src');
		} else {
			$video.prop('hidden', true);
			lb.find('.om-lb-img').prop('hidden', false).attr('src', slide.img);
		}
		resetZoom();
		lb.toggleClass('is-video', !!slide.video);
		lb.find('.om-lb-count').text(images.length > 1 ? (index + 1) + ' / ' + images.length : '');
	}

	function stepLightbox(dir) {
		var images = lb.data('images');
		lb.data('index', (lb.data('index') + dir + images.length) % images.length);
		renderLightbox();
	}

	/* ---------- Lightbox zoom: double-click / double-tap, wheel, pinch,
	   drag to pan, +/- buttons and keys ---------- */

	var zoom = { s: 1, x: 0, y: 0, pinched: false };

	function zoomImg() { return lb ? lb.find('.om-lb-img')[0] : null; }

	function applyZoom(animate) {
		var img = zoomImg();
		if (!img) { return; }
		img.style.transition = animate ? 'transform 0.25s ease' : 'none';
		img.style.transform = zoom.s === 1 ? '' : 'translate(' + zoom.x + 'px,' + zoom.y + 'px) scale(' + zoom.s + ')';
		lb.toggleClass('is-zoomed', zoom.s > 1);
		lb.find('.om-lb-zoom-out').prop('disabled', zoom.s <= 1);
		lb.find('.om-lb-zoom-in').prop('disabled', zoom.s >= 4);
	}

	function resetZoom() {
		zoom.s = 1; zoom.x = 0; zoom.y = 0;
		applyZoom(false);
	}

	// Keep the zoomed photo covering its box: no empty edges when panning.
	function clampZoom() {
		var img = zoomImg();
		if (!img) { return; }
		var w = img.offsetWidth, h = img.offsetHeight;
		var mx = Math.max(0, (zoom.s - 1) * w / 2), my = Math.max(0, (zoom.s - 1) * h / 2);
		zoom.x = Math.max(-mx, Math.min(mx, zoom.x));
		zoom.y = Math.max(-my, Math.min(my, zoom.y));
	}

	// Zoom to scale s keeping the point under (cx, cy) in place.
	function zoomAt(s, cx, cy, animate) {
		var img = zoomImg();
		if (!img || img.hidden) { return; }
		s = Math.max(1, Math.min(4, s));
		var r = img.getBoundingClientRect();
		var centreX = r.left + r.width / 2 - zoom.x, centreY = r.top + r.height / 2 - zoom.y;
		if (cx === undefined) { cx = r.left + r.width / 2; cy = r.top + r.height / 2; }
		var px = cx - centreX, py = cy - centreY;
		zoom.x = px - s * (px - zoom.x) / zoom.s;
		zoom.y = py - s * (py - zoom.y) / zoom.s;
		zoom.s = s;
		if (s === 1) { zoom.x = 0; zoom.y = 0; }
		clampZoom();
		applyZoom(animate);
	}

	function initZoom() {
		var img = zoomImg();
		var pointers = {};
		var pinch = null, drag = null, lastTap = 0;
		lb.find('.om-lb-zoom-in').on('click', function () { zoomAt(zoom.s * 1.6, undefined, undefined, true); });
		lb.find('.om-lb-zoom-out').on('click', function () { zoomAt(zoom.s / 1.6, undefined, undefined, true); });
		img.addEventListener('dblclick', function (e) {
			if (zoom.s > 1) { zoomAt(1, 0, 0, true); } else { zoomAt(2.5, e.clientX, e.clientY, true); }
		});
		lb[0].addEventListener('wheel', function (e) {
			if (img.hidden || lb.prop('hidden')) { return; }
			e.preventDefault();
			zoomAt(zoom.s * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY, false);
		}, { passive: false });
		img.addEventListener('pointerdown', function (e) {
			pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
			var ids = Object.keys(pointers);
			if (ids.length === 2) {
				var a = pointers[ids[0]], b = pointers[ids[1]];
				pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: zoom.s };
				zoom.pinched = true;
				drag = null;
			} else if (ids.length === 1) {
				// Double-tap on touch screens.
				if (e.pointerType !== 'mouse') {
					var now = Date.now();
					if (now - lastTap < 300) {
						if (zoom.s > 1) { zoomAt(1, 0, 0, true); } else { zoomAt(2.5, e.clientX, e.clientY, true); }
						lastTap = 0;
						return;
					}
					lastTap = now;
				}
				zoom.pinched = false;
				if (zoom.s > 1) {
					drag = { x: e.clientX, y: e.clientY, ox: zoom.x, oy: zoom.y };
					img.setPointerCapture && img.setPointerCapture(e.pointerId);
				}
			}
		});
		img.addEventListener('pointermove', function (e) {
			if (!pointers[e.pointerId]) { return; }
			pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
			var ids = Object.keys(pointers);
			if (pinch && ids.length === 2) {
				var a = pointers[ids[0]], b = pointers[ids[1]];
				zoomAt(pinch.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch.d, (a.x + b.x) / 2, (a.y + b.y) / 2, false);
			} else if (drag) {
				zoom.x = drag.ox + e.clientX - drag.x;
				zoom.y = drag.oy + e.clientY - drag.y;
				clampZoom();
				applyZoom(false);
			}
		});
		var end = function (e) {
			delete pointers[e.pointerId];
			if (Object.keys(pointers).length < 2) { pinch = null; }
			if (!Object.keys(pointers).length) { drag = null; }
		};
		img.addEventListener('pointerup', end);
		img.addEventListener('pointercancel', end);
		// A click on a zoomed photo shouldn't close the lightbox.
		img.addEventListener('click', function (e) { e.stopPropagation(); });
	}

	function closeLightbox() {
		if (!lb || lb.prop('hidden')) { return; }
		resetZoom();
		lb.find('.om-lb-video').empty();
		lb.prop('hidden', true);
		$('html').removeClass('om-lb-open');
		var back = lb.data('returnFocus');
		if (back) { back.focus(); }
	}

	$(document).on('keydown', function (e) {
		if (!lb || lb.prop('hidden')) { return; }
		if (e.key === 'Escape') { closeLightbox(); }
		if (e.key === 'ArrowRight' && zoom.s === 1) { stepLightbox(1); }
		if (e.key === 'ArrowLeft' && zoom.s === 1) { stepLightbox(-1); }
		if (e.key === '+' || e.key === '=') { zoomAt(zoom.s * 1.6, undefined, undefined, true); }
		if (e.key === '-') { zoomAt(zoom.s / 1.6, undefined, undefined, true); }
		if (e.key === '0') { zoomAt(1, 0, 0, true); }
		if (e.key === 'Tab') {
			// Keep focus inside the dialog.
			var $f = lb.find('button:visible');
			var first = $f[0], last = $f[$f.length - 1];
			if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
			else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
		}
	});

	$(document).on('click', '.om-zoom', function () {
		// Inside the quick view (a modal dialog) a lightbox would open
		// underneath it; the hover zoom is enough there.
		if ($(this).closest('.om-quick-view').length) { return; }
		var $gallery = $(this).closest('.om-product-gallery');
		if ($gallery.is('[data-om-no-lightbox]')) { return; }
		var slides = lightboxSlides($gallery);
		var current = $(this).find('.om-main-image').attr('src');
		var index = 0;
		slides.forEach(function (slide, i) { if (slide.img === current) { index = i; } });
		openLightbox(slides, index, this);
	});

	/* =========================================================
	   Inquiry form
	   ========================================================= */

	// Any link to "#om-inquiry" (optionally "#om-inquiry?subject=Book a
	// viewing") opens the page's inquiry form with that subject chosen.
	$(document).on('click', 'a[href*="#om-inquiry"]', function (e) {
		var href = this.getAttribute('href') || '';
		// A link to another page's form (the quick view's buttons): go there.
		if (href.charAt(0) !== '#') {
			try { if (new URL(href, window.location.href).pathname !== window.location.pathname) { return; } } catch (err) { return; }
		}
		if (openInquiry(href.slice(href.indexOf('#om-inquiry')), $(this).closest('.om-product-wrap'), $(this).attr('data-om-pair-title') || '')) {
			e.preventDefault();
		}
	});

	// Arriving with #om-inquiry?subject=… (e.g. from a quick view button).
	$(function () {
		if (window.location.hash.indexOf('#om-inquiry') === 0) {
			var hash = window.location.hash;
			window.setTimeout(function () { openInquiry(hash, $(), ''); }, 300);
		}
	});

	function openInquiry(hash, $scope, pairTitle) {
		var $box = ($scope.length ? $scope : $(document)).find('.om-product-inquiry, .om-inquiry').not('.om-end-dialog .om-inquiry').first();
		if (!$box.length) { return false; } // Nothing here: let the link work as usual.
		var match = /[?&]subject=([^&]*)/.exec(hash);
		var subject = match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
		// "Ask about this set": carry the paired design into the form.
		var pair = /[?&]pair=([^&]*)/.exec(hash);
		if (pair) {
			setPair($box, decodeURIComponent(pair[1]), pairTitle);
		}
		var details = $box.is('details') ? $box[0] : $box.find('details.om-inquiry')[0];
		if (details) { details.open = true; }
		if (subject) {
			var $radio = $box.find('input[name="om_subject"]').filter(function () { return this.value.toLowerCase() === subject.toLowerCase(); });
			if ($radio.length) { $radio.prop('checked', true); } else {
				var $hidden = $box.find('.om-subject-hidden');
				if ($hidden.length) { $hidden.val(subject); }
			}
		}
		$box[0].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
		var first = $box.find('.om-fields input:not([type=hidden]):not([type=radio]), .om-fields textarea').first()[0];
		if (first) { setTimeout(function () { first.focus({ preventScroll: true }); }, 450); }
		return true;
	}

	function setPair($box, value, title) {
		var $input = $box.find('.om-inquiry-pair');
		var $chip = $box.find('.om-pair-chip');
		if (!$input.length) { return; }
		$input.val(value || '');
		$chip.find('.om-pair-chip-name').text(title || (value || '').split('|').pop());
		$chip.prop('hidden', !value);
	}

	$(document).on('click', '.om-pair-remove', function () {
		var $form = $(this).closest('.om-inquiry-form');
		setPair($form, '', '');
		$form.find('.om-fields input:not([type=hidden]), .om-fields textarea').first().trigger('focus');
	});

	/* ---------- End-of-results card ---------- */

	// "Ask us to make it": the built-in inquiry form in a dialog.
	$(document).on('click', '[data-om-end-dialog]', function () {
		var dlg = document.getElementById(this.getAttribute('data-om-end-dialog'));
		if (!dlg) { return; }
		// Out of the grid (and any transformed card) so it layers above all.
		if (dlg.parentNode !== document.body) {
			$('body > .om-end-dialog').not(dlg).remove(); // Left over from an earlier results page.
			document.body.appendChild(dlg);
		}
		dlg.omOpener = this;
		if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
		$('html').addClass('om-dialog-open');
		var first = $(dlg).find('.om-fields input:not([type=hidden]):not([type=radio]), .om-fields textarea').first()[0];
		if (first) { setTimeout(function () { first.focus(); }, 60); }
	});

	function closeEndDialog(dlg) {
		if (dlg.close) { dlg.close(); } else { dlg.removeAttribute('open'); }
	}

	$(document).on('click', '.om-end-dialog-close', function () {
		closeEndDialog($(this).closest('dialog')[0]);
	});

	// A click on the backdrop (outside the panel) closes it.
	$(document).on('click', '.om-end-dialog', function (e) {
		if (e.target === this) { closeEndDialog(this); }
	});

	$(document).on('close', '.om-end-dialog', function () {
		$('html').removeClass('om-dialog-open');
		if (this.omOpener && document.contains(this.omOpener)) { this.omOpener.focus(); }
	});

	// "Back to top": the start of the results.
	$(document).on('click', '.om-end-top', function () {
		var $wrap = $(this).closest('.om-catalog-wrap');
		var top = $wrap.offset().top - 24;
		window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' });
		var target = $wrap.find('.om-search-input, a.om-card').first()[0];
		if (target) { setTimeout(function () { target.focus({ preventScroll: true }); }, reduceMotion ? 0 : 500); }
	});

	$(document).on('submit', '.om-inquiry-form', function (e) {
		if (!cfg.ajaxUrl || !window.FormData) {
			return; // Normal form post.
		}
		e.preventDefault();
		var form = this;
		var $form = $(form);
		var $status = $form.find('.om-inquiry-status');
		var $btn = $form.find('.om-inquiry-submit');

		if (form.checkValidity && !form.checkValidity()) {
			form.reportValidity && form.reportValidity();
			return;
		}

		// Record the options the customer had selected.
		var $wrap = $form.closest('.om-product-wrap');
		if ($wrap.length) {
			$form.find('.om-inquiry-config').val(optionsSummary($wrap));
			$form.find('[name="om_ctx_link"]').val(configuredUrl($wrap, $form.find('[name="om_ctx_url"]').val()));
			$form.find('[name="om_ctx_color"]').val(optVal($wrap, 'color'));
		}

		var data = new FormData(form);
		$btn.prop('disabled', true).addClass('is-busy');
		$status.prop('hidden', true).removeClass('is-success is-error');

		$.ajax({ url: cfg.ajaxUrl, method: 'POST', data: data, processData: false, contentType: false })
			.done(function (response) {
				var ok = response && response.success;
				$status.text((response && response.data && response.data.message) || (ok ? '' : t('error', 'Something went wrong. Please try again.')))
					.addClass(ok ? 'is-success' : 'is-error').prop('hidden', false);
				if (ok) {
					var subject = $.trim($form.find('[name="om_subject"]:checked, input.om-subject-hidden').first().val() || '');
					var leadItem = $form.find('[name="om_ctx_style"]').val();
					var from = $form.closest('.om-ai').length ? 'assistant' : $form.closest('.om-builder').length ? 'ring_builder' : ($form.closest('.om-quick-view').length ? 'quick_view' : ($form.closest('.om-diamonds').length ? 'diamond' : ($form.closest('.om-product-wrap').length ? 'product_page' : 'page')));
					var leadPrice = priceNumber($form.find('[name="om_ctx_price"]').val());
					track('generate_lead', $.extend({ form_type: 'inquiry', form_location: from, subject: subject, item_id: leadItem || '' }, leadPrice ? { value: leadPrice, currency: cfg.currency || 'USD' } : {}), ['track', 'Lead', { content_name: $form.find('[name="om_ctx_title"]').val() || subject, content_category: from }]);
					if (/viewing|appointment/i.test(subject) && cfg.track && cfg.trackMeta && typeof window.fbq === 'function' && !trackOff()) { try { window.fbq('track', 'Schedule'); } catch (err) { /* ignore */ } }
					form.reset();
					setPair($form, '', '');
					$form.find('.om-field, .om-field-row, .om-inquiry-submit, .om-inquiry-reassure').prop('hidden', true);
					// Ring builder: a thank-you panel with the ring and what
					// happens next, in place of the choices and the form.
					var $aside = $form.closest('.om-rb-review').find('.om-review-summary');
					var $done = $aside.find('.om-rb-done');
					if ($done.length) {
						$aside.children().not('.om-rb-done, .om-rb-keep, .om-review-restart').prop('hidden', true);
						$done.prop('hidden', false);
						$done[0].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
						$done.trigger('focus');
					}
				}
			})
			.fail(function () {
				$status.text(t('error', 'Something went wrong. Please try again.')).addClass('is-error').prop('hidden', false);
			})
			.always(function () {
				$btn.prop('disabled', false).removeClass('is-busy');
			});
	});

	/* =========================================================
	   Catalog grid & diamond search: in-place updates
	   ========================================================= */

	var mobileQuery = window.matchMedia ? window.matchMedia('(max-width: 900px)') : null;

	// Sidebar filters sit in a <details>: open on wide screens, collapsed
	// behind a "Filters" button on small ones.
	function syncPanels(root) {
		var small = mobileQuery && mobileQuery.matches;
		$(root || document).find('.om-filter-panel').each(function () {
			this.open = !small;
		});
		// Long filter lists start collapsed (only once the script runs, so
		// without JavaScript every option stays visible).
		$(root || document).find('.om-filter-list--collapsible').addClass('is-collapsed is-js');
		restoreGroups(root);
	}

	// Filter groups the visitor opened, closed or expanded are remembered
	// for the visit (in-place updates re-render the sidebar).
	var GROUPS_KEY = 'om_filter_groups';
	function readGroups() {
		try { return JSON.parse(window.sessionStorage.getItem(GROUPS_KEY) || '{}') || {}; } catch (err) { return {}; }
	}
	function saveGroup(name, field, value) {
		var all = readGroups();
		all[name] = all[name] || {};
		all[name][field] = value;
		try { window.sessionStorage.setItem(GROUPS_KEY, JSON.stringify(all)); } catch (err) { /* ignore */ }
	}
	function restoreGroups(root) {
		var all = readGroups();
		$(root || document).find('.om-filter-group[data-om-group]').each(function () {
			var state = all[this.getAttribute('data-om-group')];
			if (!state) { return; }
			var acc = $(this).children('.om-filter-acc')[0];
			if (acc && typeof state.open === 'boolean') { acc.open = state.open; }
			if (state.more) { setMore($(this).find('.om-filter-list--collapsible'), true); }
		});
	}
	function setMore($list, open) {
		var $btn = $list.find('.om-filter-more-btn');
		if (!$btn.length) { return; }
		if (!$btn.attr('data-om-more')) { $btn.attr('data-om-more', $btn.text()); }
		$list.toggleClass('is-collapsed', !open);
		$btn.attr('aria-expanded', open ? 'true' : 'false').text(open ? $btn.attr('data-om-less') : $btn.attr('data-om-more'));
	}

	// Modern design on phones: the filters are a bottom sheet.
	function isSheet($wrap) {
		return !!(mobileQuery && mobileQuery.matches && $wrap.hasClass('om-cdesign-modern'));
	}

	function lockSheet(on) {
		$('html').toggleClass('om-sheet-open', !!on);
	}

	// "toggle" doesn't bubble, so listen in the capture phase.
	document.addEventListener('toggle', function (e) {
		var panel = e.target;
		if (panel && panel.classList && panel.classList.contains('om-filter-panel')) {
			var $wrap = $(panel).closest('.om-catalog-wrap');
			if (isSheet($wrap)) { lockSheet(panel.open); }
		}
	}, true);

	$(document).on('keydown', function (e) {
		if (e.key !== 'Escape' || !$('html').hasClass('om-sheet-open')) { return; }
		$('.om-cdesign-modern .om-filter-panel[open]').each(function () { this.open = false; $(this).find('.om-filter-toggle').trigger('focus'); });
		lockSheet(false);
	});

	$(document).on('click', '.om-filter-close, .om-filter-done', function () {
		var panel = $(this).closest('.om-filter-panel')[0];
		if (panel) { panel.open = false; }
		lockSheet(false);
	});

	// A tap on the dimmed page behind the sheet closes it.
	$(document).on('click', function (e) {
		if (!$('html').hasClass('om-sheet-open')) { return; }
		if ($(e.target).closest('.om-filter-panel-body, .om-filter-toggle, .om-st-filters').length) { return; }
		$('.om-cdesign-modern .om-filter-panel[open]').each(function () { this.open = false; });
		lockSheet(false);
	});

	// Saved on the visitor's own clicks only: a <details> rendered open
	// also fires "toggle" as the page loads.
	$(document).on('click', '.om-filter-acc > summary', function () {
		var acc = this.parentNode;
		var group = $(acc).closest('.om-filter-group').attr('data-om-group');
		if (group) { window.setTimeout(function () { saveGroup(group, 'open', acc.open); }, 0); }
	});

	$(document).on('click', '.om-filter-more-btn', function () {
		var $list = $(this).closest('.om-filter-list');
		var open = $list.hasClass('is-collapsed');
		setMore($list, open);
		var group = $(this).closest('.om-filter-group').attr('data-om-group');
		if (group) { saveGroup(group, 'more', open); }
	});

	var omPushed = false;
	var blockSeq = 0;

	// Re-render a catalog grid (.om-catalog-wrap) or diamond search
	// (.om-diamonds) for a URL, falling back to normal navigation.
	function loadBlock($wrap, href, opts) {
		opts = opts || {};
		if (!$wrap.length || !href || !cfg.ajaxUrl) {
			window.location.href = href;
			return;
		}
		var seq = ++blockSeq;
		var isDiamonds = $wrap.hasClass('om-diamonds');
		var focusSearch = $wrap.find('.om-search-input').is(':focus');
		// The phone filter sheet stays open while filters are tapped.
		var sheetOpen = isSheet($wrap) && $wrap.find('.om-filter-panel').prop('open');
		var sheetScroll = sheetOpen ? $wrap.find('.om-filter-panel-body').scrollTop() : 0;
		$wrap.addClass('om-loading').attr('aria-busy', 'true');
		if (!isDiamonds) { showSkeleton($wrap); }

		$.post(cfg.ajaxUrl, {
			action: isDiamonds ? 'om_diamonds' : 'om_filter_grid',
			atts: $wrap.attr('data-om-atts'),
			sig: $wrap.attr('data-om-sig'),
			url: href
		}).done(function (response) {
			if (seq !== blockSeq) { return; }
			if (!(response && response.success && response.data.html)) {
				window.location.href = href;
				return;
			}
			var $fresh = $($.parseHTML($.trim(response.data.html)));
			$wrap.replaceWith($fresh);
			initBlock($fresh);
			announce($fresh.find('.om-result-count').first().text() || $fresh.find('.om-empty-title').first().text());
			if (sheetOpen) {
				$fresh.find('.om-filter-panel').prop('open', true);
				$fresh.find('.om-filter-panel-body').scrollTop(sheetScroll);
				lockSheet(true);
			}
			if (window.history && window.history.pushState) {
				window.history.pushState({ omCatalog: true }, '', href);
				omPushed = true;
				if (!isDiamonds) { trackSearch(href); }
			}
			if (focusSearch) {
				var input = $fresh.find('.om-search-input')[0];
				if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
			}
			if (opts.undo) {
				var back = opts.undoHref;
				showToast(opts.undo, function () {
					var $now = $fresh[0] && document.contains($fresh[0]) ? $fresh : $();
					if ($now.length) { loadBlock($now, back); } else { window.location.href = back; }
				});
			}
			if (opts.scroll && $fresh[0] && $fresh[0].getBoundingClientRect().top < 0 && $fresh[0].scrollIntoView) {
				$fresh[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}).fail(function () {
			if (seq === blockSeq) { window.location.href = href; }
		});
	}

	/* ---------- Toast with "Undo" ---------- */

	var toast = null;
	var toastTimer = null;
	// A short message; with undo, a button (labelled "Undo" unless label says otherwise).
	function showToast(text, undo, label) {
		if (!toast) {
			toast = $('<div class="om-toast' + (cfg.refined ? ' om-refined' : '') + '" role="status" aria-live="polite" hidden><span class="om-toast-text"></span><button type="button" class="om-toast-undo"></button></div>').appendTo(document.body);
			// Stays while the pointer or focus is on it.
			toast.on('mouseenter focusin', function () { clearTimeout(toastTimer); })
				.on('mouseleave focusout', armToast);
		}
		// Inside an open pop-up, so it shows above it (top layer) and can be used.
		var host = $('dialog[open]').last()[0] || document.body;
		if (toast.parent()[0] !== host) { toast.appendTo(host); }
		var $undo = toast.find('.om-toast-undo').off('click').text(label || t('undo', 'Undo')).prop('hidden', !undo);
		if (undo) { $undo.on('click', function () { hideToast(); undo(); }); }
		toast.find('.om-toast-text').text('');
		toast.prop('hidden', false);
		// Filled once visible, so screen readers announce it.
		setTimeout(function () { toast.find('.om-toast-text').text(text); toast.addClass('is-in'); }, 30);
		armToast();
	}
	function armToast() {
		clearTimeout(toastTimer);
		toastTimer = setTimeout(hideToast, 6000);
	}
	function hideToast() {
		if (!toast) { return; }
		clearTimeout(toastTimer);
		toast.removeClass('is-in');
		setTimeout(function () { if (!toast.hasClass('is-in')) { toast.prop('hidden', true); } }, 260);
	}

	// Share a link: the phone's share sheet where there is one, else copy.
	function shareLink(url, title, type) {
		var native = !!(navigator.share && window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
		track('share', { method: native ? 'share_sheet' : 'copy_link', content_type: type || 'page' }, ['trackCustom', 'Share', { content_type: type || 'page' }]);
		if (navigator.share && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
			navigator.share({ title: title || document.title, url: url }).catch(function () {});
			return;
		}
		var done = function () { showToast(t('linkCopied', 'Link copied')); };
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(url).then(done, function () { window.prompt('', url); });
		} else {
			window.prompt('', url);
		}
	}

	// The page URL with one query parameter set (or removed with '').
	function urlWith(name, value) {
		var url = new URL(window.location.href);
		if (value) { url.searchParams.set(name, value); } else { url.searchParams.delete(name); }
		// Readable in a message: engagement-rings/85121-2, not %2F.
		return url.toString().replace(/%2F/gi, '/').replace(/%2C/gi, ',');
	}
	function replaceUrl(url) {
		if (window.history && window.history.replaceState && url !== window.location.href) {
			window.history.replaceState(window.history.state, '', url);
		}
	}

	var blockLinks = [
		'.om-catalog-wrap .om-filter-pill', '.om-catalog-wrap .om-filter-link', '.om-catalog-wrap .om-chip',
		'.om-catalog-wrap .om-clear-filters', '.om-catalog-wrap .om-end-clear', '.om-catalog-wrap .om-clear-filters-btn', '.om-catalog-wrap .om-pagination a',
		'.om-diamonds .om-pagination a', '.om-diamonds .om-df-reset'
	].join(', ');

	$(document).on('click', blockLinks, function (e) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
			return; // Let "open in new tab" work.
		}
		e.preventDefault();
		var isPagination = $(this).closest('.om-pagination').length > 0;
		var opts = { scroll: isPagination };
		// Taking filters away offers "Undo" for a few seconds.
		var $link = $(this);
		if ($link.is('.om-chip:not(.om-chip--ghost)')) {
			opts.undo = t('filterRemoved', 'Removed %s').replace('%s', $.trim($link.clone().children().remove().end().text()));
		} else if ($link.is('.om-clear-filters, .om-end-clear, .om-clear-filters-btn')) {
			opts.undo = t('filtersCleared', 'Filters cleared');
		}
		if (opts.undo) { opts.undoHref = window.location.href; }
		loadBlock($link.closest('.om-catalog-wrap, .om-diamonds'), this.href, opts);
	});

	$(document).on('change', '.om-catalog-wrap .om-filter-nav, .om-diamonds .om-sort-select', function () {
		loadBlock($(this).closest('.om-catalog-wrap, .om-diamonds'), this.value);
	});

	// A GET form's target URL, as the browser would build it.
	function formUrl(form) {
		var url = new URL(form.getAttribute('action') || window.location.href, window.location.href);
		url.search = '';
		var params = new URLSearchParams();
		var multi = {};
		$(form).serializeArray().forEach(function (field) {
			if (field.value === '') { return; }
			if (/\[\]$/.test(field.name)) {
				var key = field.name.slice(0, -2);
				(multi[key] = multi[key] || []).push(field.value);
			} else {
				params.set(field.name, field.value);
			}
		});
		$.each(multi, function (key, values) { params.set(key, values.join(',')); });
		url.search = params.toString();
		return url.toString();
	}

	// Error state: "Try again" re-renders just this block.
	$(document).on('click', '.om-catalog-wrap .om-retry', function (e) {
		if (!window.URL) { return; }
		e.preventDefault();
		loadBlock($(this).closest('.om-catalog-wrap'), this.href);
	});

	/* ---------- Search with suggestions ---------- */

	var suggestTimer = null;
	var suggestSeq = 0;
	var suggestPrices = {}; // line|style => "From $X" ('' = none)
	var RECENT_SEARCH_KEY = 'om_recent_searches';

	// The typed words in bold inside a suggestion's text.
	function highlight(text, q) {
		var $out = $('<span></span>');
		var words = q.toLowerCase().split(/\s+/).filter(function (w) { return w.length > 1; });
		if (!words.length) { return $out.text(text); }
		var re = new RegExp('(' + words.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'ig');
		String(text).split(re).forEach(function (part, i) {
			$out.append(i % 2 ? $('<mark></mark>').text(part) : document.createTextNode(part));
		});
		return $out;
	}

	// Starting prices for the suggestions shown: one request per line,
	// remembered for the rest of the visit.
	function fillSuggestPrices($list) {
		var need = {};
		$list.find('.om-suggest-price[data-om-style]').each(function () {
			var line = $(this).attr('data-om-line');
			var key = line + '|' + $(this).attr('data-om-style');
			if (key in suggestPrices) { setSuggestPrice($(this), suggestPrices[key]); } else { (need[line] = need[line] || []).push($(this).attr('data-om-style')); }
		});
		$.each(need, function (line, styles) {
			$.post(cfg.ajaxUrl, { action: 'om_card_prices', line: line, styles: styles.slice(0, 8) }).done(function (response) {
				var prices = (response && response.success && response.data.prices) || {};
				styles.forEach(function (style) { suggestPrices[line + '|' + style] = prices[style] || ''; });
				$list.find('.om-suggest-price[data-om-line="' + line + '"]').each(function () {
					var key = line + '|' + $(this).attr('data-om-style');
					if (key in suggestPrices) { setSuggestPrice($(this), suggestPrices[key]); }
				});
			}).fail(function () {
				$list.find('.om-suggest-price.is-loading[data-om-line="' + line + '"]').remove();
			});
		});
	}

	function setSuggestPrice($el, text) {
		if (text) { $el.removeClass('is-loading').text(text); } else { $el.remove(); }
	}

	// Recent searches live in the visitor's own browser.
	function readRecentSearches() {
		try { return JSON.parse(window.localStorage.getItem(RECENT_SEARCH_KEY) || '[]').filter(function (x) { return typeof x === 'string'; }); } catch (err) { return []; }
	}

	function writeRecentSearches(list) {
		try { window.localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(list.slice(0, 6))); } catch (err) { /* storage unavailable */ }
	}

	function rememberSearch(q) {
		q = $.trim(q || '');
		if (q.length < 2) { return; }
		writeRecentSearches([q].concat(readRecentSearches().filter(function (x) { return x.toLowerCase() !== q.toLowerCase(); })));
	}

	function isStandalone($form) {
		return $form.closest('.om-search-standalone').length > 0;
	}

	// "See all" for one line: in place for this block's lines, or the
	// results page for the stand-alone search box.
	function lineResultsUrl($form, line, q, resultsUrl) {
		try {
			var url;
			if (isStandalone($form)) {
				if (!resultsUrl) { return ''; }
				url = new URL(resultsUrl, window.location.href);
			} else {
				url = new URL(formUrl($form[0]), window.location.href);
			}
			url.searchParams.set('om_q', q);
			if (line && (isStandalone($form) || $form.find('[name="om_line"]').length)) { url.searchParams.set('om_line', line); }
			url.searchParams.delete('om_page');
			return url.toString();
		} catch (err) { return ''; }
	}

	function suggestItem($list, item, q, i, priced) {
		var $a = $('<a class="om-suggest-item" role="option"></a>').attr({ href: item.url, id: $list.attr('id') + '-' + i });
		var $img = $('<span class="om-suggest-img"></span>');
		if (item.image) { $img.append($('<img alt="" loading="lazy" decoding="async" />').attr('src', item.image)); }
		$a.append($img);
		var $meta = $('<span class="om-suggest-meta"></span>');
		if (item.variant) { $meta.append($('<span class="om-suggest-variant"></span>').text(item.variant)); }
		$meta.append($('<span class="om-suggest-style"></span>').append(t('style', 'Style') + ' ', highlight(item.style, q)));
		$a.append($('<span class="om-suggest-text"></span>')
			.append($('<span class="om-suggest-title"></span>').append(highlight(item.title, q)))
			.append($meta));
		if (priced) {
			$a.append($('<span class="om-suggest-price is-loading"></span>').attr({ 'data-om-style': item.style, 'data-om-line': item.line || '' }));
		}
		return $('<li role="presentation"></li>').append($a);
	}

	// The designs this visitor looked at last (newest first), without the
	// one on screen, up to the box's data-om-viewed count.
	function viewedFor($form) {
		var max = parseInt($form.attr('data-om-viewed'), 10);
		if (isNaN(max)) { max = 4; }
		if (max <= 0) { return []; }
		var current = $('.om-product-wrap[data-style]').not('.om-quick-view .om-product-wrap').first().attr('data-style') || '';
		return readRecent().filter(function (x) { return x && x.u && x.s && x.s !== current; }).slice(0, max);
	}

	// "Recently viewed": a strip of photo cards, each a suggestion option
	// (arrow keys reach them like any other).
	function viewedSection($list, $form, items) {
		var priced = $form.attr('data-om-priced') === '1';
		var $strip = $('<div class="om-suggest-viewed" role="listbox"></div>').attr('aria-label', t('viewed', 'Recently viewed'));
		items.forEach(function (x, i) {
			var $a = $('<a class="om-suggest-item om-suggest-card" role="option" aria-selected="false"></a>')
				.attr({ href: x.u, id: $list.attr('id') + '-v' + i });
			var $img = $('<span class="om-suggest-card-img"></span>');
			if (x.i) { $img.append($('<img alt="" loading="lazy" decoding="async" />').attr('src', x.i)); }
			var $text = $('<span class="om-suggest-card-text"></span>')
				.append($('<span class="om-suggest-card-title"></span>').text(x.t || x.s))
				.append($('<span class="om-suggest-card-style"></span>').text(t('style', 'Style') + ' ' + x.s));
			if (priced && x.l) {
				$text.append($('<span class="om-suggest-price is-loading"></span>').attr({ 'data-om-style': x.s, 'data-om-line': x.l }));
			}
			$strip.append($a.append($img, $text));
		});
		return $('<li class="om-suggest-section om-suggest-section--viewed" role="presentation"></li>')
			.append($('<div class="om-suggest-head"></div>')
				.append($('<span></span>').text(t('viewed', 'Recently viewed')))
				.append($('<button type="button" class="om-suggest-clear-viewed"></button>').text(t('clearRecent', 'Clear'))))
			.append($strip);
	}

	// The panel is a listbox of suggestions, or (with buttons in it: the
	// starters, recently viewed) a small dialog holding its own listbox.
	function panelRole($form, dialog) {
		$form.find('.om-suggest').attr('role', dialog ? 'dialog' : 'listbox').attr('aria-label', dialog ? t('searchHelp', 'Search suggestions') : null);
		$form.find('.om-search-input').attr('aria-haspopup', dialog ? 'dialog' : 'listbox');
	}

	// Empty box focused: recently viewed designs, recent searches (this
	// visitor) and popular ones.
	function showSearchStarters($form) {
		var $list = $form.find('.om-suggest').empty();
		var viewed = viewedFor($form);
		var recent = readRecentSearches();
		var popular = (cfg.popular || []).filter(function (p) { return recent.map(function (r) { return r.toLowerCase(); }).indexOf(String(p).toLowerCase()) === -1; });
		if (!viewed.length && !recent.length && !popular.length) { closeSuggest($form); return; }
		if (viewed.length) {
			$list.append(viewedSection($list, $form, viewed));
		}
		if (recent.length) {
			var $chips = $('<div class="om-suggest-chips"></div>');
			recent.forEach(function (q) {
				$chips.append($('<span class="om-suggest-chip om-suggest-chip--recent"></span>')
					.append($('<button type="button" class="om-suggest-q"></button>').attr('data-q', q).text(q))
					.append($('<button type="button" class="om-suggest-forget">&times;</button>').attr({ 'data-q': q, 'aria-label': t('removeSearch', 'Remove') + ': ' + q })));
			});
			$list.append($('<li class="om-suggest-section" role="presentation"></li>')
				.append($('<div class="om-suggest-head"></div>')
					.append($('<span></span>').text(t('recent', 'Recent searches')))
					.append($('<button type="button" class="om-suggest-clear"></button>').text(t('clearRecent', 'Clear'))))
				.append($chips));
		}
		if (popular.length) {
			var $pop = $('<div class="om-suggest-chips"></div>');
			popular.forEach(function (q) {
				$pop.append($('<button type="button" class="om-suggest-chip om-suggest-q"></button>').attr('data-q', q).text(q));
			});
			$list.append($('<li class="om-suggest-section" role="presentation"></li>')
				.append($('<div class="om-suggest-head"></div>').append($('<span></span>').text(t('popular', 'Popular searches'))))
				.append($pop));
		}
		panelRole($form, true);
		$list.addClass('is-starters').prop('hidden', false);
		$form.find('.om-search-input').attr('aria-expanded', 'true');
		if (viewed.length) { fillSuggestPrices($list); }
	}

	$(document).on('click', '.om-suggest .om-suggest-clear-viewed', function (e) {
		e.stopPropagation();
		try { window.localStorage.removeItem(RECENT_KEY); } catch (err) { /* storage unavailable */ }
		var $form = $(this).closest('.om-search');
		showSearchStarters($form);
		$form.find('.om-search-input').trigger('focus');
		renderRecent();
	});

	// Pick a recent/popular search: run it.
	$(document).on('click', '.om-suggest .om-suggest-q', function () {
		var $form = $(this).closest('.om-search');
		var q = $(this).attr('data-q');
		$form.find('.om-search-input').val(q);
		if (isStandalone($form) && !$form.attr('action')) {
			$form.find('.om-search-input').trigger('input').trigger('focus');
			return;
		}
		$form.trigger('submit');
	});

	$(document).on('click', '.om-suggest .om-suggest-forget', function (e) {
		e.stopPropagation();
		var q = $(this).attr('data-q');
		writeRecentSearches(readRecentSearches().filter(function (x) { return x !== q; }));
		showSearchStarters($(this).closest('.om-search'));
	});

	$(document).on('click', '.om-suggest .om-suggest-clear', function (e) {
		e.stopPropagation();
		writeRecentSearches([]);
		showSearchStarters($(this).closest('.om-search'));
	});

	$(document).on('focus click', '.om-catalog-wrap .om-search-input', function () {
		if ($.trim(this.value) === '') { showSearchStarters($(this).closest('.om-search')); }
	});

	$(document).on('submit', '.om-catalog-wrap .om-search', function (e) {
		var $form = $(this);
		var q = $.trim($form.find('.om-search-input').val());
		rememberSearch(q);
		if (isStandalone($form)) {
			var $line = $form.find('.om-search-line');
			var top = $form.data('omTopLine') || '';
			$line.val(top).prop('disabled', !top);
			if (!$form.attr('action')) {
				// No results page: open the highlighted (or first) match.
				e.preventDefault();
				var $pick = $form.find('.om-suggest-item.is-active').first();
				$pick = $pick.length ? $pick : $form.find('.om-suggest-item').first();
				if ($pick.length) { window.location.href = $pick.attr('href'); }
			}
			return; // Otherwise the browser opens the results page.
		}
		if (!window.URL || !window.URLSearchParams) { return; }
		e.preventDefault();
		closeSuggest($form);
		loadBlock($form.closest('.om-catalog-wrap'), formUrl(this));
	});

	function closeSuggest($form) {
		$form.find('.om-suggest').prop('hidden', true).removeClass('is-starters').empty();
		$form.find('.om-search-input').attr('aria-expanded', 'false').removeAttr('aria-activedescendant');
	}

	$(document).on('input', '.om-catalog-wrap .om-search-input', function () {
		var input = this;
		var $form = $(input).closest('.om-search');
		var $wrap = $form.closest('.om-catalog-wrap');
		var q = $.trim(input.value);
		clearTimeout(suggestTimer);
		if (q.length < 2) {
			if (q === '') { showSearchStarters($form); } else { closeSuggest($form); }
			// Cleared the box: show the full catalog again.
			if (q === '' && !isStandalone($form) && /[?&]om_q=/.test(window.location.search)) {
				loadBlock($wrap, formUrl($form[0]));
			}
			return;
		}
		suggestTimer = setTimeout(function () {
			var seq = ++suggestSeq;
			$.post(cfg.ajaxUrl, {
				action: 'om_suggest',
				atts: $wrap.attr('data-om-atts'),
				sig: $wrap.attr('data-om-sig'),
				line: $form.attr('data-om-line'),
				q: q
			}).done(function (response) {
				if (seq !== suggestSeq || !response || !response.success) { return; }
				var data = response.data;
				var $list = $form.find('.om-suggest').removeClass('is-starters').empty();
				var n = 0;
				if (data.groups) {
					// Several lines: a heading, best matches and "see all" per line.
					$form.data('omTopLine', data.groups.length ? data.groups[0].line : '');
					data.groups.forEach(function (group) {
						$list.append($('<li class="om-suggest-group" role="presentation"></li>')
							.append($('<span class="om-suggest-group-name"></span>').text(group.label))
							.append($('<span class="om-suggest-group-count"></span>').text(group.total)));
						group.items.forEach(function (item) { $list.append(suggestItem($list, item, q, n++, data.prices)); });
						var more = group.total > group.items.length && (group.inBlock || isStandalone($form)) ? lineResultsUrl($form, group.line, q, data.resultsUrl) : '';
						if (more) {
							$list.append($('<li role="presentation"></li>').append(
								$('<a class="om-suggest-group-all"></a>').attr({ href: more, 'data-om-line': group.line })
									.text(t('seeAll', 'See all results') + ' (' + group.total + ') ' + t('inLine', 'in %s').replace('%s', group.label) + ' →')
							));
						}
					});
				} else {
					(data.items || []).forEach(function (item) { $list.append(suggestItem($list, item, q, n++, data.prices)); });
					if (data.total > n) {
						$list.append($('<li role="presentation"></li>').append(
							$('<button type="submit" class="om-suggest-all"></button>').text(t('seeAll', 'See all results') + ' (' + data.total + ')')
						));
					}
				}
				var viewedShown = false;
				if (!n) {
					$list.append($('<li class="om-suggest-empty" role="presentation"></li>').text(data.message || t('noMatches', 'No matching designs')));
					// Nothing found: offer the way back to what they looked at.
					var viewed = viewedFor($form);
					if (viewed.length) { $list.append(viewedSection($list, $form, viewed)); viewedShown = true; }
				}
				panelRole($form, viewedShown);
				$list.prop('hidden', false);
				$(input).attr('aria-expanded', 'true');
				if (data.prices || viewedShown) { fillSuggestPrices($list); }
			});
		}, 220);
	});

	// A suggestion or "see all" chosen: remember what was typed.
	$(document).on('click', '.om-suggest-item, .om-suggest-group-all', function () {
		rememberSearch($(this).closest('.om-search').find('.om-search-input').val());
	});

	// "See all in <line>" within a catalog block: load it in place.
	$(document).on('click', '.om-catalog-wrap:not(.om-search-standalone) .om-suggest-group-all', function (e) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || !window.URL) { return; }
		e.preventDefault();
		var $form = $(this).closest('.om-search');
		closeSuggest($form);
		loadBlock($form.closest('.om-catalog-wrap'), this.href);
	});

	$(document).on('keydown', '.om-catalog-wrap .om-search-input', function (e) {
		var $form = $(this).closest('.om-search');
		var $items = $form.find('.om-suggest-item');
		if (e.key === 'Escape') { closeSuggest($form); return; }
		if (!$items.length || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter')) { return; }
		var $active = $items.filter('.is-active');
		var index = $items.index($active);
		if (e.key === 'Enter') {
			if ($active.length) { e.preventDefault(); rememberSearch(this.value); window.location.href = $active.attr('href'); }
			return;
		}
		e.preventDefault();
		index = e.key === 'ArrowDown' ? Math.min($items.length - 1, index + 1) : Math.max(0, index - 1);
		$items.removeClass('is-active').attr('aria-selected', 'false').eq(index).addClass('is-active').attr('aria-selected', 'true');
		$(this).attr('aria-activedescendant', $items.eq(index).attr('id'));
	});

	$(document).on('click', function (e) {
		if (!$(e.target).closest('.om-search').length) {
			$('.om-search').each(function () { closeSuggest($(this)); });
		}
	});

	/* ---------- Diamond search ---------- */

	var diamondTimer = null;

	$(document).on('change', '.om-diamond-filters input', function () {
		var $input = $(this);
		if ($input.is(':checkbox, :radio')) {
			$input.closest('form').find('input[name="' + this.name + '"]').each(function () {
				$(this).closest('label').toggleClass('is-checked', this.checked);
			});
		}
		var form = $input.closest('form')[0];
		clearTimeout(diamondTimer);
		// Typed ranges wait a moment; clicks apply straight away.
		diamondTimer = setTimeout(function () {
			if (window.URL && window.URLSearchParams) {
				loadBlock($(form).closest('.om-diamonds'), formUrl(form));
			}
		}, $input.is('[type="number"]') ? 600 : 50);
	});

	$(document).on('submit', '.om-diamond-filters', function (e) {
		if (!window.URL || !window.URLSearchParams) { return; }
		e.preventDefault();
		clearTimeout(diamondTimer);
		loadBlock($(this).closest('.om-diamonds'), formUrl(this));
	});

	// 360° viewers load only when a diamond is opened.
	$(document).on('toggle', '.om-diamond', function () {
		if (this.open) {
			$(this).find('iframe[data-src]').each(function () {
				this.src = this.getAttribute('data-src');
				this.removeAttribute('data-src');
			});
		}
	});
	// "toggle" doesn't bubble in every browser; catch the summary click too.
	$(document).on('click', '.om-diamond > summary', function () {
		var details = this.parentNode;
		setTimeout(function () { $(details).trigger('toggle'); }, 0);
	});

	/* ---------- "From $X" card prices ---------- */

	function loadCardPrices(root) {
		$(root || document).find('.om-catalog-grid[data-om-prices]').each(function () {
			var line = $(this).attr('data-om-prices');
			// "Complete the set": also price each design with this one.
			var withPiece = $(this).attr('data-om-set-with') || '';
			var $sets = $(this).find('.om-card-set-price[data-om-style]');
			var $cells = $(this).find('.om-card-price[data-om-style]').not('.is-loaded');
			var styles = $cells.map(function () { return $(this).attr('data-om-style'); }).get();
			// A few cards per request, several requests at once.
			for (var i = 0; i < styles.length; i += 4) {
				(function (chunk) {
					$.post(cfg.ajaxUrl, { action: 'om_card_prices', line: line, styles: chunk, 'with': withPiece }).done(function (response) {
						var prices = (response && response.success && response.data.prices) || {};
						var sets = (response && response.success && response.data.sets) || {};
						chunk.forEach(function (style) {
							var $cell = $cells.filter(function () { return $(this).attr('data-om-style') === style; });
							$cell.addClass('is-loaded').text(prices[style] || '');
							$sets.filter(function () { return $(this).attr('data-om-style') === style; }).text(sets[style] || '').toggleClass('is-loaded', !!sets[style]);
						});
					}).fail(function () {
						$cells.filter(function () { return chunk.indexOf($(this).attr('data-om-style')) > -1; }).addClass('is-loaded').empty();
					});
				})(styles.slice(i, i + 4));
			}
		});
	}

	/* ---------- Recently viewed ---------- */

	var RECENT_KEY = 'omRecentlyViewed';

	function readRecent() {
		try {
			var list = JSON.parse(window.localStorage.getItem(RECENT_KEY) || '[]');
			return Array.isArray(list) ? list : [];
		} catch (err) {
			return [];
		}
	}

	function rememberProduct() {
		var el = document.querySelector('.om-product-wrap[data-om-recent-item]');
		if (!el || document.body.classList.contains('elementor-editor-active')) { return; }
		try {
			var item = JSON.parse(el.getAttribute('data-om-recent-item'));
			if (!item || !item.s) { return; }
			var list = readRecent().filter(function (x) { return x && x.s !== item.s; });
			list.unshift(item);
			window.localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 20)));
		} catch (err) { /* storage unavailable: nothing to remember */ }
		countView(el);
		trackView($(el), 'product_page');
	}

	// One counted view per design per visit, for "Most viewed" and the
	// "Popular" badge. Sent after load so it never slows the page.
	function countView(el) {
		var line = el.getAttribute('data-line'), style = el.getAttribute('data-style');
		if (!line || !style || !cfg.ajaxUrl) { return; }
		var key = 'om_viewed_' + line + '|' + style;
		try { if (window.sessionStorage.getItem(key)) { return; } window.sessionStorage.setItem(key, '1'); } catch (err) { /* count anyway */ }
		var send = function () {
			var data = new FormData();
			data.append('action', 'om_track_view'); data.append('line', line); data.append('style', style);
			if (navigator.sendBeacon) { navigator.sendBeacon(cfg.ajaxUrl, data); } else { $.post(cfg.ajaxUrl, { action: 'om_track_view', line: line, style: style }); }
		};
		if (window.requestIdleCallback) { window.requestIdleCallback(send, { timeout: 4000 }); } else { setTimeout(send, 1500); }
	}

	function renderRecent(root) {
		var list = readRecent();
		$(root || document).find('[data-om-recent]').each(function () {
			var $box = $(this);
			var max = parseInt($box.attr('data-om-recent'), 10) || 4;
			var exclude = $box.attr('data-om-exclude') || '';
			var items = list.filter(function (x) { return x && x.u && x.s !== exclude; }).slice(0, max);
			var $track = $box.find('.om-related-track').empty();
			items.forEach(function (x) {
				var $cell = $('<div class="om-card-cell"></div>').addClass('om-hover-' + (cfg.cardHover || 'lift'));
				var $card = $('<a class="om-card"></a>').attr('href', x.u);
				var $img = $('<div class="om-card-image"></div>');
				if (x.i) { $img.append($('<img loading="lazy" decoding="async" />').attr({ src: x.i, alt: x.t || '' })); }
				var $body = $('<div class="om-card-body"></div>').append($('<h3 class="om-card-title"></h3>').text(x.t || x.s));
				if (x.v) { $body.append($('<p class="om-card-variant"></p>').text(x.v)); }
				$track.append($cell.append($card.append($img, $body)));
			});
			$box.prop('hidden', items.length === 0);
		});
	}

	/* ---------- Carousel arrows ---------- */

	$(document).on('click', '.om-related-prev, .om-related-next', function () {
		var track = $(this).closest('.om-related').find('.om-related-track')[0];
		if (!track) { return; }
		var dir = $(this).hasClass('om-related-next') ? 1 : -1;
		track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: 'smooth' });
	});

	// Optional autoplay: advance one card every N seconds, wrap to the
	// start, pause while hovered/touched/focused or off screen, and never
	// for visitors who prefer reduced motion.
	function initAutoplay(root) {
		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) { return; }
		$(root || document).find('.om-related--carousel[data-om-autoplay]').each(function () {
			if (this._omAuto) { return; }
			var box = this;
			var track = box.querySelector('.om-related-track');
			var seconds = parseInt(box.getAttribute('data-om-autoplay'), 10);
			if (!track || !seconds) { return; }
			var paused = false;
			var visible = true;
			$(box).on('mouseenter focusin touchstart', function () { paused = true; })
				.on('mouseleave focusout touchend', function () { paused = false; });
			if (window.IntersectionObserver) {
				new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(box);
			}
			box._omAuto = setInterval(function () {
				if (paused || !visible || document.hidden) { return; }
				var card = track.querySelector('.om-card');
				var step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth;
				var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
				track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: 'smooth' });
			}, seconds * 1000);
		});
	}

	/* ---------- Custom inquiry forms: pass the product along ---------- */

	// A site's own form (Elementor Pro, Contact Form 7, Gravity Forms...)
	// gets the piece's details in hidden fields named om_product, om_style,
	// om_price, om_options, om_url (with the options chosen), om_image,
	// om_diamond or om_summary.
	function fillCustomForms(root) {
		$(root || document).find('.om-inquiry-custom[data-om-product]').each(function () {
			var $box = $(this);
			var data = {};
			try { data = JSON.parse($box.attr('data-om-product')) || {}; } catch (err) { return; }
			var $wrap = $box.closest('.om-product-wrap');
			var options = $wrap.length ? optionsSummary($wrap) : '';
			var price = $.trim($wrap.find('.om-price-amount:not([hidden])').text()) || data.price || '';
			var url = data.url || window.location.href;
			var values = {
				product: data.product, style: data.style, price: price, options: options,
				url: $wrap.length ? configuredUrl($wrap, url) : url,
				image: $wrap.find('.om-main-image').attr('src') || '',
				diamond: data.diamond, summary: data.summary, guide: data.guide
			};
			$.each(values, function (key, value) {
				// Matches name="om_product" as well as Elementor's
				// name="form_fields[om_product]".
				$box.find('input[name="om_' + key + '"], input[name="form_fields[om_' + key + ']"], input[name$="[om_' + key + ']"]').val(value || '');
			});
		});
	}

	// Keep the chosen options current right before a custom form submits.
	$(document).on('submit', '.om-inquiry-custom form', function () {
		fillCustomForms($(this).closest('.om-product-wrap').length ? $(this).closest('.om-product-wrap') : document);
	});
	$(document).on('change', '.om-option', function () {
		setTimeout(function () { fillCustomForms(document); }, 800);
	});

	/* ---------- Ring size guide ---------- */

	var sgReturn = null;

	function openSizeGuide(from) {
		var dialog = document.querySelector('.om-size-guide');
		if (!dialog) { return; }
		sgReturn = from || null;
		if (dialog.showModal) {
			if (!dialog.open) { dialog.showModal(); }
		} else {
			dialog.setAttribute('open', '');
		}
		$('html').addClass('om-lb-open');
	}

	function closeSizeGuide() {
		var dialog = document.querySelector('.om-size-guide');
		if (!dialog) { return; }
		if (dialog.close) { dialog.close(); } else { dialog.removeAttribute('open'); }
	}

	$(document).on('click', '[data-om-size-guide]', function () { openSizeGuide(this); });
	$(document).on('click', '.om-sg-close', closeSizeGuide);
	$(document).on('click', '.om-size-guide', function (e) {
		if (e.target === this) { closeSizeGuide(); } // backdrop click
	});
	$(document).on('close', '.om-size-guide', function () {
		$('html').removeClass('om-lb-open');
		if (sgReturn && sgReturn.focus) { sgReturn.focus(); }
	});
	// "close" doesn't bubble: listen on the element itself too.
	$(function () {
		var dialog = document.querySelector('.om-size-guide');
		if (dialog) {
			dialog.addEventListener('close', function () {
				$('html').removeClass('om-lb-open');
				if (sgReturn && sgReturn.focus) { sgReturn.focus(); }
			});
		}
	});
	$(document).on('click', '.om-sg-print', function () {
		$('html').addClass('om-printing-sizer');
		window.print();
		setTimeout(function () { $('html').removeClass('om-printing-sizer'); }, 500);
	});

	/* ---------- Sticky price bar (phones) ---------- */

	function initStickyBar() {
		var bar = document.querySelector('.om-sticky-bar');
		var wrap = bar && bar.closest('.om-product-wrap');
		if (!bar || !wrap) { return; }
		// Show the bar once the price and main buttons have scrolled away;
		// hide it while the customer is filling in the open inquiry form.
		var anchor = wrap.querySelector('.om-actions--builder') || wrap.querySelector('.om-price') || wrap.querySelector('.om-product-title');
		var inquiry = wrap.querySelector('.om-product-inquiry');
		var pastAnchor = false;
		var atInquiry = false;
		var update = function () {
			// Replaced (another carat loaded in place): the new bar takes over.
			if (!bar.isConnected) { return; }
			var formOpen = inquiry && (inquiry.querySelector('details[open]') || inquiry.querySelector('.om-inquiry--open'));
			var show = pastAnchor && !(atInquiry && formOpen);
			bar.hidden = !show;
			bar.setAttribute('aria-hidden', show ? 'false' : 'true');
			document.documentElement.classList.toggle('om-has-sticky-bar', show);
		};
		if (anchor) {
			// A scroll check (throttled to one per frame) rather than an
			// IntersectionObserver: a jump past the anchor (restored scroll
			// position, a #link) never "crosses" it, so no observer event.
			var ticking = false;
			var onScroll = function () {
				if (!ticking) {
					ticking = true;
					window.requestAnimationFrame(check);
				}
			};
			var check = function () {
				ticking = false;
				if (!bar.isConnected) { window.removeEventListener('scroll', onScroll); return; }
				var past = anchor.getBoundingClientRect().bottom < 0;
				if (past !== pastAnchor) {
					pastAnchor = past;
					update();
				}
			};
			window.addEventListener('scroll', onScroll, { passive: true });
			check();
		}
		if (inquiry && window.IntersectionObserver) {
			new IntersectionObserver(function (entries) {
				atInquiry = entries[0].isIntersecting;
				update();
			}).observe(inquiry);
			inquiry.addEventListener('toggle', update, true);
		}
	}

	$(document).on('click', '.om-sticky-cta', function () {
		var $wrap = $(this).closest('.om-product-wrap');
		var $builder = $wrap.find('.om-builder-btn');
		if ($builder.length) { $builder[0].click(); return; }
		var $visibleBtn = $wrap.find('.om-actions .om-btn:not([hidden])').first();
		var inquiry = $wrap.find('.om-product-inquiry')[0];
		if (inquiry) {
			var details = inquiry.querySelector('details');
			if (details) { details.open = true; }
			inquiry.scrollIntoView({ behavior: 'smooth', block: 'start' });
			var first = inquiry.querySelector('input:not([type=hidden]), textarea, select');
			if (first) { setTimeout(function () { first.focus({ preventScroll: true }); }, 450); }
		} else if ($visibleBtn.length) {
			$visibleBtn[0].click();
		}
	});

	/* ---------- Quick view ---------- */

	var qv = null;
	var qvReturn = null;

	// Pop-up look set on the widget (CSS variables on the grid), carried
	// over to the dialog, which lives at the end of the page.
	var QV_VARS = ['--om-qv-modal-bg', '--om-qv-backdrop', '--om-qv-width', '--om-qv-radius', '--om-qv-pad', '--om-qv-close', '--om-radius', '--om-radius-lg', '--om-space', '--om-qv-media'];

	function openQuickView(line, style, trigger) {
		if (!qv) {
			qv = $('<dialog class="om-quick-view' + (cfg.refined ? ' om-refined' : '') + '" aria-label="' + t('quickView', 'Quick view') + '"><div class="om-qv-inner"><div class="om-qv-bar"><div class="om-qv-nav"><button type="button" class="om-qv-step om-qv-prev"></button><span class="om-qv-pos"></span><button type="button" class="om-qv-step om-qv-next"></button></div><button type="button" class="om-qv-share"></button><button type="button" class="om-qv-close" autofocus aria-label="' + t('close', 'Close') + '">&times;</button></div><div class="om-qv-body"></div></div></dialog>').appendTo(document.body);
			qv.find('.om-qv-prev').attr('aria-label', t('prevDesign', 'Previous design')).on('click', function () { stepQuickView(-1); });
			qv.find('.om-qv-next').attr('aria-label', t('nextDesign', 'Next design')).on('click', function () { stepQuickView(1); });
			qv.find('.om-qv-share').attr('aria-label', t('shareLink', 'Share link')).append('<span class="om-qv-share-icon" aria-hidden="true"></span>', $('<span class="om-qv-share-text"></span>').text(t('share', 'Share'))).on('click', function () {
				shareLink(window.location.href, qv.find('.om-product-title').first().text(), 'product');
			});
			qv.on('click', function (e) { if (e.target === qv[0]) { closeQuickView(); } });
			qv.find('.om-qv-close').on('click', closeQuickView);
			qv[0].addEventListener('close', function () {
				$('html').removeClass('om-lb-open');
				replaceUrl(urlWith('om_qv', ''));
				if (qvReturn && qvReturn.focus && document.contains(qvReturn)) { qvReturn.focus(); }
			});
			// Left/right arrow keys step through the designs (not while
			// typing, or inside the photo gallery, which has its own).
			qv.on('keydown', function (e) {
				if ((e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') || e.altKey || e.metaKey || e.ctrlKey) { return; }
				if ($(e.target).is('input, select, textarea') || $(e.target).closest('.om-product-gallery, .om-options, [role="radiogroup"]').length) { return; }
				if (lb && !lb.prop('hidden')) { return; }
				e.preventDefault();
				stepQuickView(e.key === 'ArrowRight' ? 1 : -1);
			});
			// Phones: swipe sideways on the details (the photos swipe on their own).
			var sx = null;
			var sy = null;
			qv[0].addEventListener('touchstart', function (e) {
				sx = null;
				if (e.touches.length !== 1 || $(e.target).closest('.om-product-gallery, .om-options, select, input').length) { return; }
				sx = e.touches[0].clientX;
				sy = e.touches[0].clientY;
			}, { passive: true });
			qv[0].addEventListener('touchend', function (e) {
				if (sx === null) { return; }
				var dx = e.changedTouches[0].clientX - sx;
				var dy = e.changedTouches[0].clientY - sy;
				sx = null;
				if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { stepQuickView(dx < 0 ? 1 : -1); }
			}, { passive: true });
		}
		qvReturn = trigger;
		qvList = qvSiblings(trigger);
		qvAt = -1;
		qvList.forEach(function (btn, i) { if (btn === trigger) { qvAt = i; } });
		qv.find('.om-qv-nav').prop('hidden', qvList.length < 2 || qvAt === -1);
		if (qvAt !== -1) {
			qv.find('.om-qv-pos').text(t('designOf', '%1$s of %2$s').replace('%1$s', qvAt + 1).replace('%2$s', qvList.length));
			qv.find('.om-qv-prev').prop('disabled', qvAt === 0);
			qv.find('.om-qv-next').prop('disabled', qvAt === qvList.length - 1);
		}
		// A link to exactly this pop-up.
		replaceUrl(urlWith('om_qv', line + '/' + style));
		var computed = trigger && window.getComputedStyle ? window.getComputedStyle(trigger) : null;
		QV_VARS.forEach(function (name) {
			var value = computed ? computed.getPropertyValue(name).trim() : '';
			if (value) { qv[0].style.setProperty(name, value); } else { qv[0].style.removeProperty(name); }
		});
		var opts = {};
		try { opts = JSON.parse($(trigger).closest('[data-om-qv-opts]').attr('data-om-qv-opts') || '{}') || {}; } catch (err) { opts = {}; }
		var $body = qv.find('.om-qv-body');
		var seq = ++qvSeq;
		if (qv[0].open && $body.children('.om-single-product').length) {
			// Stepping: keep the current design until the next one arrives.
			qv.addClass('is-stepping');
		} else {
			$body.html('<div class="om-qv-loading"><span class="om-qv-skel om-qv-skel--img"></span><span class="om-qv-skel"></span><span class="om-qv-skel om-qv-skel--short"></span></div>');
		}
		if (!qv[0].open) {
			if (qv[0].showModal) { qv[0].showModal(); } else { qv.attr('open', ''); }
		}
		$('html').addClass('om-lb-open');
		var data = { action: 'om_quick_view', line: line, style: style };
		if (typeof opts.parts === 'string') { data.parts = opts.parts; }
		if (opts.video) { data.video = opts.video; }
		if (opts.thumbs) { data.thumbs = opts.thumbs; }
		if (opts.link) { data.link = opts.link; }
		$.post(cfg.ajaxUrl, data).done(function (response) {
			if (seq !== qvSeq) { return; }
			qv.removeClass('is-stepping');
			if (response && response.success && response.data.html) {
				loadPageStyles(response.data);
				$body.html(response.data.html);
				$body.scrollTop(0);
				qv.find('.om-qv-inner').scrollTop(0);
				qv.scrollTop(0);
				rememberFrom($body);
				syncSaved();
				trackView($body, 'quick_view');
				$body.find('.om-product-gallery.is-video-first').each(function () { decorateMainVideo($(this)); });
			} else {
				$body.html($('<p class="om-error"></p>').text((response && response.data && response.data.message) || t('error', 'Something went wrong. Please try again.')));
			}
		}).fail(function () {
			if (seq !== qvSeq) { return; }
			qv.removeClass('is-stepping');
			$body.html($('<p class="om-error"></p>').text(t('error', 'Something went wrong. Please try again.')));
		});
	}

	var qvList = [];
	var qvAt = -1;
	var qvSeq = 0;

	// The other Quick view buttons in the same grid or row, in page order
	// (one per design).
	function qvSiblings(trigger) {
		if (!trigger || !$(trigger).is('.om-qv-btn')) { return []; }
		var $scope = $(trigger).closest('.om-catalog-wrap, .om-related, .om-reels, [data-om-qv-opts]');
		var seen = {};
		return $scope.find('.om-qv-btn').filter(function () {
			if ($(this).closest('.is-skeleton').length) { return false; }
			var key = this.getAttribute('data-om-qv-line') + '|' + this.getAttribute('data-om-qv-style');
			if (seen[key]) { return false; }
			seen[key] = true;
			return true;
		}).get();
	}

	function stepQuickView(dir) {
		var next = qvList[qvAt + dir];
		if (!next) { return; }
		openQuickView(next.getAttribute('data-om-qv-line'), next.getAttribute('data-om-qv-style'), next);
		announce(qv.find('.om-qv-pos').text());
	}

	// Arriving with ?om_qv=line/style (a shared link) opens that pop-up.
	$(function () {
		var wanted = new URLSearchParams(window.location.search).get('om_qv');
		var m = wanted ? /^([a-z0-9-]+)\/([A-Za-z0-9._\-\/]+)$/.exec(wanted) : null;
		if (!m || !cfg.ajaxUrl) { return; }
		var btn = $('.om-qv-btn').filter(function () {
			return this.getAttribute('data-om-qv-line') === m[1] && this.getAttribute('data-om-qv-style').toLowerCase() === m[2].toLowerCase();
		})[0];
		openQuickView(m[1], m[2], btn || $('.om-qv-btn')[0] || null);
	});

	// The product page's Elementor styles, so the pop-up's buttons look
	// like the page's. Loaded once; skipped when the page already has them.
	function loadPageStyles(data) {
		var id = data.css_id;
		if (!id || document.getElementById(id) || document.getElementById(id + '-qv')) { return; }
		var el;
		if (data.css_url) {
			el = document.createElement('link');
			el.rel = 'stylesheet';
			el.href = data.css_url;
		} else if (data.css) {
			el = document.createElement('style');
			el.textContent = data.css;
		} else { return; }
		el.id = id + '-qv';
		document.head.appendChild(el);
	}

	function closeQuickView() {
		if (!qv) { return; }
		qv.find('video').each(function () { this.pause(); });
		if (qv[0].close) { qv[0].close(); } else { qv.removeAttr('open'); $('html').removeClass('om-lb-open'); }
	}

	$(document).on('click', '.om-qv-btn', function (e) {
		e.preventDefault();
		openQuickView($(this).attr('data-om-qv-line'), $(this).attr('data-om-qv-style'), this);
	});

	/* ---------- Loading states: skeleton cards, image fade-in ---------- */

	// While a grid re-renders, its cards turn into shimmering placeholders
	// of the same size, so the page doesn't jump.
	function showSkeleton($wrap) {
		$wrap.find('.om-card-cell, .om-catalog-grid > .om-card').each(function () {
			$(this).addClass('is-skeleton');
		});
	}

	// Card photos fade in once loaded instead of popping in.
	function markLoaded(img) {
		var box = img.closest && img.closest('.om-card-image');
		if (box) { box.classList.add('is-loaded'); }
	}
	document.addEventListener('load', function (e) {
		if (e.target && e.target.tagName === 'IMG') { markLoaded(e.target); }
	}, true);
	function markCachedImages(root) {
		$(root || document).find('.om-card-image img').each(function () {
			if (this.complete && this.naturalWidth) { markLoaded(this); }
		});
	}

	/* ---------- Card video previews ---------- */

	// Desktop: the card's video plays while hovered. Phones: the card
	// nearest the middle of the screen plays, one at a time. Nothing loads
	// until needed; skipped for reduced-motion and data-saver visitors.
	function startPreview(box) {
		if (box._omVideo || !box.getAttribute('data-om-video')) { return; }
		var video = document.createElement('video');
		video.className = 'om-card-video';
		video.muted = true;
		video.loop = true;
		video.playsInline = true;
		video.setAttribute('playsinline', '');
		video.setAttribute('muted', '');
		video.preload = 'auto';
		video.src = box.getAttribute('data-om-video');
		video.addEventListener('playing', function () { box.classList.add('is-playing'); });
		video.addEventListener('error', function () {
			// Unplayable here: drop the preview (and its badge) for good.
			stopPreview(box);
			box.removeAttribute('data-om-video');
			box.classList.remove('has-video');
			$(box).find('.om-card-play').remove();
		});
		box.appendChild(video);
		box._omVideo = video;
		var p = video.play();
		if (p && p.catch) { p.catch(function () {}); }
	}

	function stopPreview(box) {
		if (!box._omVideo) { return; }
		box._omVideo.pause();
		box._omVideo.remove();
		box._omVideo = null;
		box.classList.remove('is-playing');
	}

	var canPreview = !reduceMotion && !saveData;
	if (canPreview && fineHover) {
		$(document).on('mouseenter', '.om-card-image[data-om-video]', function () { startPreview(this); });
		$(document).on('mouseleave', '.om-card-image[data-om-video]', function () { stopPreview(this); });
	}

	var centreObserver = null;
	var centreBoxes = [];
	function initTouchPreviews(root) {
		if (!canPreview || fineHover || !window.IntersectionObserver) { return; }
		if (!centreObserver) {
			var visible = new Set();
			centreObserver = new IntersectionObserver(function (entries) {
				entries.forEach(function (e) { if (e.isIntersecting) { visible.add(e.target); } else { visible.delete(e.target); stopPreview(e.target); } });
				// Play only the visible card closest to the screen's middle.
				var mid = window.innerHeight / 2;
				var best = null;
				var bestDist = Infinity;
				visible.forEach(function (box) {
					var r = box.getBoundingClientRect();
					var d = Math.abs(r.top + r.height / 2 - mid);
					if (d < bestDist) { bestDist = d; best = box; }
				});
				visible.forEach(function (box) { if (box !== best) { stopPreview(box); } });
				if (best) { startPreview(best); }
			}, { threshold: [0.6, 0.9] });
		}
		$(root || document).find('.om-card-image[data-om-video]').each(function () {
			if (centreBoxes.indexOf(this) === -1) {
				centreBoxes.push(this);
				centreObserver.observe(this);
			}
		});
	}

	/* ---------- "Show more" / infinite scroll ---------- */

	// Screen readers hear what changed (results after filtering, more
	// designs added), from one polite live region.
	var liveRegion = null;
	function announce(text) {
		if (!text) { return; }
		if (!liveRegion) {
			liveRegion = $('<div class="om-visually-hidden" role="status" aria-live="polite"></div>').appendTo(document.body);
		}
		liveRegion.text('');
		setTimeout(function () { liveRegion.text(text); }, 60);
	}

	function loadMore(btn) {
		var $btn = $(btn);
		if ($btn.hasClass('is-loading')) { return; }
		var $wrap = $btn.closest('.om-catalog-wrap');
		var $grid = $wrap.find('.om-catalog-grid').first();
		$btn.addClass('is-loading').attr('aria-busy', 'true');
		$.post(cfg.ajaxUrl, {
			action: 'om_filter_grid',
			atts: $wrap.attr('data-om-atts'),
			sig: $wrap.attr('data-om-sig'),
			url: btn.href
		}).done(function (response) {
			if (!(response && response.success && response.data.html)) { window.location.href = btn.href; return; }
			var $fresh = $('<div></div>').append($.parseHTML($.trim(response.data.html)));
			var $cells = $fresh.find('.om-catalog-grid').first().children();
			var firstNew = $cells.first();
			$grid.append($cells);
			$cells.addClass('om-card-new');
			// Toolbar count, progress and the next button from the new page.
			$wrap.find('.om-result-count').first().text($fresh.find('.om-result-count').first().text());
			$wrap.find('.om-progress').first().replaceWith($fresh.find('.om-progress').first());
			var $next = $fresh.find('.om-load-more').first();
			$btn.closest('.om-load-more').replaceWith($next);
			if (window.history && window.history.replaceState && btn.getAttribute('data-om-upto')) {
				window.history.replaceState({ omCatalog: true }, '', btn.getAttribute('data-om-upto'));
			}
			initBlock($wrap);
			observeInfinite($wrap);
			announce($wrap.find('.om-result-count').first().text());
			// Keyboard users continue from the first new design.
			if (document.activeElement === btn || !$next.length) {
				var link = firstNew.find('a.om-card')[0];
				if (link) { link.focus({ preventScroll: true }); }
			}
		}).fail(function () {
			$btn.removeClass('is-loading').removeAttr('aria-busy');
		});
	}

	$(document).on('click', '.om-catalog-wrap .om-load-more-btn', function (e) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || !cfg.ajaxUrl) { return; }
		e.preventDefault();
		loadMore(this);
	});

	// Infinite: load the next page shortly before the visitor reaches it.
	function observeInfinite(root) {
		if (!window.IntersectionObserver) { return; }
		$(root).find('.om-load-more.is-infinite .om-load-more-btn').each(function () {
			var btn = this;
			if (btn._omIO) { return; }
			btn._omIO = new IntersectionObserver(function (entries) {
				if (entries[0].isIntersecting) { btn._omIO.disconnect(); loadMore(btn); }
			}, { rootMargin: '600px 0px' });
			btn._omIO.observe(btn);
		});
	}

	/* ---------- Compare (up to 4 designs, across pages) ---------- */

	var COMPARE_KEY = 'om_compare';
	var compareTray = null;
	var compareDialog = null;

	function readCompare() {
		try { return JSON.parse(window.localStorage.getItem(COMPARE_KEY) || '[]').filter(function (x) { return x && x.l && x.s; }).slice(0, 4); } catch (err) { return []; }
	}

	function writeCompare(list) {
		try { window.localStorage.setItem(COMPARE_KEY, JSON.stringify(list.slice(0, 4))); } catch (err) { /* storage unavailable */ }
		syncCompare();
	}

	function syncCompare() {
		var list = readCompare();
		var keys = list.map(function (x) { return x.l + '|' + x.s; });
		$('.om-compare-toggle').each(function () {
			var item = {};
			try { item = JSON.parse(this.getAttribute('data-om-compare')); } catch (err) { return; }
			var on = keys.indexOf(item.l + '|' + item.s) !== -1;
			$(this).toggleClass('is-on', on).attr('aria-pressed', String(on));
		});
		renderTray(list);
	}

	function renderTray(list) {
		if (!list.length) {
			if (compareTray) { compareTray.prop('hidden', true); }
			$('html').removeClass('om-has-compare');
			return;
		}
		if (!compareTray) {
			compareTray = $('<div class="om-compare-tray' + (cfg.refined ? ' om-refined' : '') + '" role="region"></div>').attr('aria-label', t('compare', 'Compare')).appendTo(document.body);
		}
		var $items = $('<ul class="om-compare-items"></ul>');
		list.forEach(function (x) {
			$items.append($('<li class="om-compare-item"></li>')
				.append(x.i ? $('<img alt="" />').attr('src', x.i) : $('<span class="om-compare-noimg"></span>'))
				.append($('<button type="button" class="om-compare-drop">&times;</button>').attr({ 'data-om-key': x.l + '|' + x.s, 'aria-label': t('removeSearch', 'Remove') + ': ' + (x.t || x.s) })));
		});
		for (var i = list.length; i < 4; i++) { $items.append('<li class="om-compare-item is-empty" aria-hidden="true"></li>'); }
		compareTray.empty().append(
			$('<p class="om-compare-label"></p>').text(t('compare', 'Compare') + ' ' + list.length + '/4'),
			$items,
			$('<div class="om-compare-actions"></div>').append(
				$('<button type="button" class="om-compare-open"></button>').text(list.length < 2 ? t('compareMore', 'Add one more') : t('compareNow', 'Compare now')).prop('disabled', list.length < 2),
				$('<button type="button" class="om-compare-clear"></button>').text(t('clearRecent', 'Clear'))
			)
		).prop('hidden', false);
		$('html').addClass('om-has-compare');
	}

	$(document).on('click', '.om-compare-toggle', function () {
		var item;
		try { item = JSON.parse(this.getAttribute('data-om-compare')); } catch (err) { return; }
		var list = readCompare();
		var key = item.l + '|' + item.s;
		var at = list.map(function (x) { return x.l + '|' + x.s; }).indexOf(key);
		if (at !== -1) {
			list.splice(at, 1);
		} else {
			if (list.length >= 4) { announce(t('compareFull', 'You can compare up to 4 designs.')); $(this).addClass('is-shake'); var el = this; setTimeout(function () { $(el).removeClass('is-shake'); }, 500); return; }
			list.push(item);
		}
		var sourceImg = at === -1 ? $(this).closest('.om-card-cell').find('.om-card-image img').not('.om-card-hover')[0] : null;
		writeCompare(list);
		if (sourceImg) { flyToTray(sourceImg, list.length - 1); }
		announce((at !== -1 ? t('compareRemoved', 'Removed from compare') : t('compareAdded', 'Added to compare')) + ' (' + list.length + '/4)');
	});

	// The card's photo flies into its slot in the tray, so the visitor sees
	// where it went; the slot "catches" it with a small pop.
	function flyToTray(img, index) {
		if (reduceMotion || !compareTray || !img.animate) { return; }
		var target = compareTray.find('.om-compare-item').eq(index).find('img')[0];
		var from = img.getBoundingClientRect();
		if (!target || !from.width || from.bottom < 0 || from.top > window.innerHeight) { return; }
		var to = target.getBoundingClientRect();
		var clone = img.cloneNode();
		clone.removeAttribute('loading');
		clone.className = 'om-compare-fly';
		clone.setAttribute('aria-hidden', 'true');
		$(clone).css({ left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px' });
		document.body.appendChild(clone);
		target.style.opacity = '0';
		var dx = to.left + to.width / 2 - (from.left + from.width / 2);
		var dy = to.top + to.height / 2 - (from.top + from.height / 2);
		var scale = Math.max(to.width / from.width, 0.05);
		var anim = clone.animate([
			{ transform: 'translate(0, 0) scale(1)', borderRadius: '12px', opacity: 1 },
			{ transform: 'translate(' + dx * 0.5 + 'px, ' + (dy * 0.5 - 60) + 'px) scale(' + (1 + scale) / 2 + ')', borderRadius: '30%', opacity: 1, offset: 0.55 },
			{ transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')', borderRadius: '50%', opacity: 0.9 }
		], { duration: 650, easing: 'cubic-bezier(0.5, 0, 0.2, 1)' });
		var done = function () {
			clone.remove();
			target.style.opacity = '';
			$(target).closest('.om-compare-item').removeClass('is-caught').each(function () { void this.offsetWidth; }).addClass('is-caught');
		};
		anim.onfinish = done;
		anim.oncancel = done;
	}

	$(document).on('click', '.om-compare-drop', function () {
		var key = this.getAttribute('data-om-key');
		writeCompare(readCompare().filter(function (x) { return x.l + '|' + x.s !== key; }));
	});

	$(document).on('click', '.om-compare-clear', function () { writeCompare([]); });

	function openCompare() {
		if (!compareDialog) {
			compareDialog = $('<dialog class="om-compare-dialog' + (cfg.refined ? ' om-refined' : '') + '" aria-labelledby="om-compare-title"><div class="om-compare-inner"><div class="om-compare-head"><div class="om-compare-heading"><p class="om-compare-eyebrow"></p><h2 class="om-compare-title" id="om-compare-title"></h2></div><div class="om-compare-tools"><label class="om-compare-diff"><input type="checkbox" /><span></span></label><button type="button" class="om-compare-share"><span class="om-qv-share-icon" aria-hidden="true"></span><span class="om-compare-share-text"></span></button><button type="button" class="om-compare-clear-all"></button><button type="button" class="om-compare-close">&times;</button></div></div><div class="om-compare-body"></div></div></dialog>').appendTo(document.body);
			compareDialog.find('.om-compare-eyebrow').text(t('compare', 'Compare'));
			compareDialog.find('.om-compare-diff span').text(t('compareDiff', 'Highlight differences'));
			compareDialog.find('.om-compare-share-text').text(t('shareLink', 'Share link'));
			compareDialog.find('.om-compare-share').attr('aria-label', t('shareLink', 'Share link')).on('click', function () {
				var list = readCompare();
				shareLink(urlWith('om_compare', list.map(function (x) { return x.l + '/' + x.s; }).join(',')), t('compare', 'Compare'), 'compare');
			});
			compareDialog.find('.om-compare-clear-all').text(t('clearAll', 'Clear all')).on('click', function () {
				var before = readCompare();
				writeCompare([]);
				compareDialog[0].close();
				showToast(t('compareCleared', 'Compare list cleared'), function () { writeCompare(before); });
			});
			var diffOn = false;
			try { diffOn = window.localStorage.getItem('om_compare_diff') === '1'; } catch (err) { diffOn = false; }
			compareDialog.find('.om-compare-diff input').prop('checked', diffOn).on('change', function () {
				compareDialog.toggleClass('is-diff', this.checked);
				try { window.localStorage.setItem('om_compare_diff', this.checked ? '1' : '0'); } catch (err) { /* nothing */ }
			});
			compareDialog.toggleClass('is-diff', diffOn);
			compareDialog.find('.om-compare-close').attr('aria-label', t('close', 'Close')).on('click', function () { compareDialog[0].close(); });
			compareDialog.on('click', function (e) { if (e.target === compareDialog[0]) { compareDialog[0].close(); } });
			compareDialog[0].addEventListener('close', function () { $('html').removeClass('om-lb-open'); });
		}
		var list = readCompare();
		track('compare_designs', { designs: list.length, item_ids: list.map(function (x) { return x.s; }).join(',') }, ['trackCustom', 'CompareDesigns', { content_ids: list.map(function (x) { return String(x.s); }) }]);
		compareDialog.find('.om-compare-title').text(list.length === 1 ? t('compareOne', '1 design') : t('compareMany', '%d designs side by side').replace('%d', list.length));
		compareDialog.find('.om-compare-diff').prop('hidden', list.length < 2);
		var $body = compareDialog.find('.om-compare-body').html('<div class="om-qv-loading"><span class="om-qv-skel om-qv-skel--img"></span><span class="om-qv-skel"></span></div>');
		if (compareDialog[0].showModal && !compareDialog[0].open) { compareDialog[0].showModal(); }
		$('html').addClass('om-lb-open');
		$.post(cfg.ajaxUrl, { action: 'om_compare', items: list.map(function (x) { return { line: x.l, style: x.s }; }) }).done(function (response) {
			$body.html(response && response.success ? response.data.html : $('<p class="om-error"></p>').text((response && response.data && response.data.message) || t('error', 'Something went wrong. Please try again.')));
			markCompareDiffs($body);
			// Designs from a shared link arrive without photo and name.
			if (response && response.success && response.data.items) {
				var info = {};
				response.data.items.forEach(function (x) { info[x.l + '|' + String(x.s).toLowerCase()] = x; });
				var changed = false;
				var filled = readCompare().map(function (x) {
					var got = info[x.l + '|' + String(x.s).toLowerCase()];
					if (got && (!x.i || !x.t)) { changed = true; return $.extend({}, got, x, { t: x.t || got.t, i: x.i || got.i, u: x.u || got.u }); }
					return x;
				});
				if (changed) { writeCompare(filled); }
			}
		}).fail(function () {
			$body.html($('<p class="om-error"></p>').text(t('error', 'Something went wrong. Please try again.')));
		});
	}

	// Rows where every design says the same are marked, so "Highlight
	// differences" can quiet them.
	function markCompareDiffs($body) {
		$body.find('.om-compare-row').each(function () {
			if (/om-compare-row--(photo|name|link)/.test(this.className)) { return; }
			var values = $(this).children('td').map(function () { return $.trim($(this).text()); }).get();
			var same = values.length > 1 && values.every(function (v) { return v === values[0]; });
			$(this).toggleClass('is-same', same).toggleClass('is-different', !same && values.length > 1);
		});
	}

	$(document).on('click', '.om-compare-open', openCompare);

	// Arriving with ?om_compare=line/style,line/style (a shared link):
	// those designs become the compare list and the table opens.
	$(function () {
		var wanted = new URLSearchParams(window.location.search).get('om_compare');
		if (!wanted || !cfg.ajaxUrl) { return; }
		var list = [];
		wanted.split(',').forEach(function (pair) {
			var m = /^([a-z0-9-]+)\/([A-Za-z0-9._\-\/]+)$/.exec($.trim(pair));
			if (m && list.length < 4 && !list.some(function (x) { return x.l === m[1] && x.s === m[2]; })) { list.push({ l: m[1], s: m[2] }); }
		});
		replaceUrl(urlWith('om_compare', ''));
		if (!list.length) { return; }
		writeCompare(list);
		openCompare();
	});
	$(document).on('click', '.om-compare-remove', function () {
		var key = this.getAttribute('data-om-line') + '|' + this.getAttribute('data-om-style');
		var list = readCompare().filter(function (x) { return x.l + '|' + x.s !== key; });
		writeCompare(list);
		if (list.length) { openCompare(); } else if (compareDialog) { compareDialog[0].close(); }
	});

	// Another tab changed the picks.
	window.addEventListener('storage', function (e) { if (e.key === COMPARE_KEY) { syncCompare(); } });

	/* ---------- Saved designs (hearts; kept on this device) ---------- */

	var SAVED_KEY = 'om_saved';
	var SAVED_MAX = 24;
	var savedDialog = null;

	function readSaved() {
		try { return JSON.parse(window.localStorage.getItem(SAVED_KEY) || '[]').filter(function (x) { return x && x.l && x.s; }).slice(0, SAVED_MAX); } catch (err) { return []; }
	}

	function writeSaved(list) {
		try { window.localStorage.setItem(SAVED_KEY, JSON.stringify(list.slice(0, SAVED_MAX))); } catch (err) { /* storage unavailable */ }
		syncSaved();
		backupSaved();
	}

	/* Backup: the server keeps the style numbers in a cookie (up to a year).
	   Safari and iPhone browsers wipe the page's own storage after 7 days
	   without a visit, but not cookies the site's server sets — so a list
	   that vanished is restored from it. */
	var backupTimer = null;
	function savedCode(list) { return list.map(function (x) { return x.l + '/' + x.s; }).join(','); }
	function readSavedCookie() {
		var m = /(?:^|;\s*)om_saved=([^;]*)/.exec(document.cookie);
		if (!m) { return ''; }
		try { return decodeURIComponent(m[1].replace(/\+/g, ' ')); } catch (err) { return ''; }
	}
	function backupSaved() {
		if (!cfg.ajaxUrl) { return; }
		clearTimeout(backupTimer);
		backupTimer = setTimeout(function () {
			var code = savedCode(readSaved());
			if (code === readSavedCookie()) { return; }
			$.post(cfg.ajaxUrl, { action: 'om_saved_sync', list: code });
		}, 400);
	}
	function restoreSaved() {
		var stored = null;
		try { stored = window.localStorage.getItem(SAVED_KEY); } catch (err) { return; }
		var code = readSavedCookie();
		if (!code) { if (readSaved().length) { backupSaved(); } return; }
		// Storage wiped (or empty) but the backup has designs: bring them back.
		if (stored === null) {
			var list = [];
			code.split(',').forEach(function (pair) {
				var m = /^([a-z0-9-]+)\/([A-Za-z0-9._\-\/]+)$/.exec($.trim(pair));
				if (m && list.length < SAVED_MAX) { list.push({ l: m[1], s: m[2] }); }
			});
			if (list.length) {
				try { window.localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch (err) { return; }
				fillSaved();
			}
		} else if (code !== savedCode(readSaved())) {
			backupSaved();
		}
	}

	function savedKey(x) { return x.l + '|' + String(x.s).toLowerCase(); }

	// Hearts, header counts and the open panel follow the list.
	function syncSaved() {
		if (!cfg.saved) { return; }
		var list = readSaved();
		var keys = list.map(savedKey);
		$('.om-save-toggle').each(function () {
			var item;
			try { item = JSON.parse(this.getAttribute('data-om-save')); } catch (err) { return; }
			var on = keys.indexOf(savedKey(item)) !== -1;
			if ($(this).hasClass('is-on') === on && this.hasAttribute('data-om-synced')) { return; }
			this.setAttribute('data-om-synced', '1');
			$(this).toggleClass('is-on', on).attr({
				'aria-pressed': String(on),
				'aria-label': (on ? t('unsaveThis', 'Remove %s from saved') : t('saveThis', 'Save %s')).replace('%s', item.t || item.s)
			});
			var $text = $(this).find('.om-save-text');
			if ($text.length) { $text.text(on ? $text.attr('data-on') : $text.attr('data-off')); }
		});
		$('.om-saved-count').text(list.length).prop('hidden', !list.length);
		$('.om-st-saved').prop('hidden', !list.length).attr('aria-label', t('savedTitle', 'Saved designs') + (list.length ? ' (' + list.length + ')' : ''));
		syncSavedFloat(list);
		$('.om-saved-open').toggleClass('has-items', list.length > 0).each(function () {
			var base = $(this).find('.om-saved-open-text').text() || t('saved', 'Saved');
			$(this).attr('aria-label', base + (list.length ? ' (' + list.length + ')' : ''));
		});
		if (savedDialog && savedDialog[0].open) { renderSaved(); }
	}

	// A floating "Saved" button, only while something is saved and the page
	// has no Saved button of its own (header widget, shortcode or a
	// #om-saved menu link that is visible).
	var savedFloat = null;
	function syncSavedFloat(list) {
		if (!cfg.savedFloat) { return; }
		var own = $('.om-saved-open, a[href$="#om-saved"]').filter(function () { return this.getClientRects().length > 0; }).length > 0;
		// The ring builder's bar holds the bottom of the screen: no float there.
		if (!list.length || own || $('.om-rb-bar').length) {
			if (savedFloat) { savedFloat.prop('hidden', true); }
			return;
		}
		if (!savedFloat) {
			savedFloat = $('<button type="button" class="om-saved-float' + (cfg.refined ? ' om-refined' : '') + '" data-om-saved-open aria-haspopup="dialog"><span class="om-save-icon" aria-hidden="true"></span><span class="om-saved-float-text" aria-hidden="true"></span><span class="om-saved-float-n" aria-hidden="true"></span></button>').appendTo(document.body);
			savedFloat.find('.om-saved-float-text').text(t('saved', 'Saved'));
		}
		savedFloat.find('.om-saved-float-n').text(list.length);
		savedFloat.attr('aria-label', t('savedTitle', 'Saved designs') + ' (' + list.length + ')').prop('hidden', false);
	}

	$(document).on('click', '.om-save-toggle', function (e) {
		e.preventDefault();
		var item;
		try { item = JSON.parse(this.getAttribute('data-om-save')); } catch (err) { return; }
		var before = readSaved();
		var list = before.slice();
		var at = list.map(savedKey).indexOf(savedKey(item));
		if (at !== -1) {
			list.splice(at, 1);
			writeSaved(list);
			showToast(t('savedRemoved', 'Removed from saved'), function () { writeSaved(before); });
			return;
		}
		if (list.length >= SAVED_MAX) { showToast(t('savedFull', 'Your list is full (24). Remove one to save another.')); return; }
		list.unshift(item);
		writeSaved(list);
		var btn = this;
		$(btn).removeClass('is-pop');
		void btn.offsetWidth;
		$(btn).addClass('is-pop');
		showToast(t('savedAdded', 'Saved') + ' (' + list.length + ')', openSaved, t('savedView', 'View saved'));
		if (cfg.ajaxUrl) { $.post(cfg.ajaxUrl, { action: 'om_saved_stat', line: item.l, style: item.s }); }
		track('add_to_wishlist', { currency: cfg.currency || 'USD', items: [trackItem(item)] }, ['track', 'AddToWishlist', { content_ids: [String(item.s)], content_name: item.t, content_type: 'product' }]);
	});

	function openSaved() {
		if (!cfg.saved) { return; }
		if (!savedDialog) {
			savedDialog = $('<dialog class="om-saved-dialog' + (cfg.refined ? ' om-refined' : '') + '" aria-labelledby="om-saved-title"><div class="om-saved-inner"><div class="om-saved-head"><h2 class="om-saved-title" id="om-saved-title"></h2><button type="button" class="om-saved-close">&times;</button></div><div class="om-saved-body"></div><div class="om-saved-foot"></div></div></dialog>').appendTo(document.body);
			savedDialog.find('.om-saved-close').attr('aria-label', t('close', 'Close')).on('click', function () { savedDialog[0].close(); });
			savedDialog.on('click', function (e) { if (e.target === savedDialog[0]) { savedDialog[0].close(); } });
			savedDialog[0].addEventListener('close', function () { $('html').removeClass('om-lb-open'); });
		}
		renderSaved();
		if (savedDialog[0].showModal && !savedDialog[0].open) { savedDialog[0].showModal(); }
		$('html').addClass('om-lb-open');
	}

	function renderSaved() {
		var list = readSaved();
		var $d = savedDialog;
		$d.find('.om-saved-title').empty().append(document.createTextNode(t('savedTitle', 'Saved designs') + ' '), $('<span class="om-saved-title-n"></span>').text(list.length ? '(' + list.length + ')' : ''));
		var $body = $d.find('.om-saved-body').empty();
		var $foot = $d.find('.om-saved-foot').empty();
		if (!list.length) {
			$body.append($('<p class="om-saved-empty"></p>').text(t('savedEmpty', 'Nothing saved yet.')));
			return;
		}
		var $ul = $('<ul class="om-saved-list"></ul>');
		list.forEach(function (x) {
			var url = x.u || '#';
			$ul.append($('<li class="om-saved-item"></li>').append(
				$('<a class="om-saved-photo" tabindex="-1" aria-hidden="true"></a>').attr('href', url).append(x.i ? $('<img alt="" loading="lazy" />').attr('src', x.i) : $('<span class="om-compare-noimg"></span>')),
				$('<div class="om-saved-info"></div>').append(
					$('<a class="om-saved-name"></a>').attr('href', url).text(x.t || x.s),
					$('<span class="om-saved-style"></span>').text((x.v ? x.v + ' · ' : '') + t('styleN', 'Style %s').replace('%s', x.s))
				),
				$('<button type="button" class="om-saved-drop">&times;</button>').attr({ 'data-om-key': savedKey(x), 'aria-label': t('savedRemove', 'Remove %s').replace('%s', x.t || x.s) })
			));
		});
		$body.append($ul);

		var $actions = $('<div class="om-saved-actions"></div>');
		if (list.length > 1) {
			$actions.append($('<button type="button" class="om-saved-btn om-saved-btn--line om-saved-compare"></button>').text(list.length > 4 ? t('savedCompareHint', 'Compare the first 4') : t('savedCompare', 'Compare')));
		}
		$actions.append(
			$('<button type="button" class="om-saved-share"><span class="om-qv-share-icon" aria-hidden="true"></span></button>').append(document.createTextNode(t('savedShare', 'Share list'))),
			$('<button type="button" class="om-saved-clear"></button>').text(t('savedClear', 'Clear list'))
		);
		$foot.append($actions);
		if (cfg.savedEmail) {
			var $form = $('<form class="om-saved-email" novalidate></form>').append(
				$('<p class="om-saved-email-title"></p>').text(t('savedEmailMe', 'Email me my list')),
				$('<p class="om-saved-email-intro"></p>').text(t('savedEmailIntro', 'We will send the photos and links to your inbox.')),
				$('<div class="om-saved-email-row"></div>').append(
					$('<label class="om-visually-hidden" for="om-saved-email-input"></label>').text(t('savedYourEmail', 'Your email')),
					$('<input type="email" id="om-saved-email-input" name="email" autocomplete="email" inputmode="email" required />').attr('placeholder', t('savedYourEmail', 'Your email')),
					$('<button type="submit" class="om-saved-btn om-saved-send"></button>').text(t('savedSend', 'Send'))
				),
				$('<label class="om-visually-hidden" for="om-saved-name-input"></label>').text(t('savedYourName', 'Your name (optional)')),
				$('<input type="text" id="om-saved-name-input" name="name" autocomplete="name" class="om-saved-name-input" />').attr('placeholder', t('savedYourName', 'Your name (optional)')),
				$('<input type="text" name="website" value="" tabindex="-1" autocomplete="off" class="om-hp" aria-hidden="true" />'),
				$('<p class="om-saved-email-status" role="status" aria-live="polite"></p>')
			);
			$foot.append($form);
		}
	}

	$(document).on('click', '[data-om-saved-open], a[href$="#om-saved"]', function (e) {
		if (!cfg.saved) { return; }
		e.preventDefault();
		openSaved();
	});

	$(document).on('click', '.om-saved-drop', function () {
		var key = this.getAttribute('data-om-key');
		var before = readSaved();
		writeSaved(before.filter(function (x) { return savedKey(x) !== key; }));
		showToast(t('savedRemoved', 'Removed from saved'), function () { writeSaved(before); });
		var $next = savedDialog && savedDialog.find('.om-saved-drop').first();
		if ($next && $next.length) { $next.trigger('focus'); } else if (savedDialog) { savedDialog.find('.om-saved-close').trigger('focus'); }
	});

	$(document).on('click', '.om-saved-clear', function () {
		var before = readSaved();
		writeSaved([]);
		showToast(t('savedCleared', 'Saved list cleared'), function () { writeSaved(before); });
		if (savedDialog) { savedDialog.find('.om-saved-close').trigger('focus'); }
	});

	$(document).on('click', '.om-saved-share', function () {
		shareLink(urlWith('om_saved', readSaved().map(function (x) { return x.l + '/' + x.s; }).join(',')), t('savedTitle', 'Saved designs'), 'saved_list');
	});

	$(document).on('click', '.om-saved-compare', function () {
		writeCompare(readSaved().slice(0, 4).map(function (x) { return { l: x.l, s: x.s, t: x.t, i: x.i, u: x.u }; }));
		if (savedDialog) { savedDialog[0].close(); }
		openCompare();
	});

	$(document).on('submit', '.om-saved-email', function (e) {
		e.preventDefault();
		var $form = $(this);
		var $status = $form.find('.om-saved-email-status').removeClass('is-error');
		var email = $.trim($form.find('[name=email]').val());
		if (!/^\S+@\S+\.\S+$/.test(email)) {
			$status.addClass('is-error').text(t('rbEmailBad', 'Please enter a valid email address.'));
			$form.find('[name=email]').attr('aria-invalid', 'true').trigger('focus');
			return;
		}
		$form.find('[name=email]').removeAttr('aria-invalid');
		var $btn = $form.find('button[type=submit]').prop('disabled', true);
		$status.text(t('sending', 'Sending…'));
		$.post(cfg.ajaxUrl, {
			action: 'om_saved_email',
			email: email,
			name: $.trim($form.find('[name=name]').val()),
			website: $form.find('[name=website]').val(),
			items: readSaved().map(function (x) { return { line: x.l, style: x.s }; })
		}).done(function (r) {
			var msg = (r && r.data && r.data.message) || t('error', 'Something went wrong. Please try again.');
			$status.toggleClass('is-error', !(r && r.success)).text(msg);
			if (r && r.success) { track('generate_lead', { form_type: 'saved_list_email', designs: readSaved().length }, ['track', 'Lead', { content_name: 'Saved designs', content_category: 'saved_list_email' }]); }
		}).fail(function () {
			$status.addClass('is-error').text(t('error', 'Something went wrong. Please try again.'));
		}).always(function () { $btn.prop('disabled', false); });
	});

	// Designs without photo or name (a shared link) are looked up.
	function fillSaved() {
		var missing = readSaved().filter(function (x) { return !x.t || !x.i; });
		if (!missing.length || !cfg.ajaxUrl) { return; }
		$.post(cfg.ajaxUrl, { action: 'om_saved_items', items: missing.map(function (x) { return { line: x.l, style: x.s }; }) }).done(function (r) {
			if (!(r && r.success && r.data.items)) { return; }
			var info = {};
			r.data.items.forEach(function (x) { info[savedKey(x)] = x; });
			var found = {};
			writeSaved(readSaved().map(function (x) {
				var got = info[savedKey(x)];
				if (got) { found[savedKey(x)] = true; return $.extend({}, got, { t: x.t || got.t, i: x.i || got.i, u: x.u || got.u }); }
				return x;
			}).filter(function (x) { return x.t || found[savedKey(x)]; }));
		});
	}

	// Arriving with ?om_saved=line/style,... (a shared list or the email's
	// "Open my list"): those designs join the visitor's list and it opens.
	$(function () {
		if (!cfg.saved) { return; }
		restoreSaved();
		syncSaved();
		var wanted = new URLSearchParams(window.location.search).get('om_saved');
		if (wanted) {
			replaceUrl(urlWith('om_saved', ''));
			var before = readSaved();
			var list = before.slice();
			var keys = list.map(savedKey);
			var added = 0;
			wanted.split(',').forEach(function (pair) {
				var m = /^([a-z0-9-]+)\/([A-Za-z0-9._\-\/]+)$/.exec($.trim(pair));
				if (m && list.length < SAVED_MAX && keys.indexOf(m[1] + '|' + m[2].toLowerCase()) === -1) {
					list.push({ l: m[1], s: m[2] });
					keys.push(m[1] + '|' + m[2].toLowerCase());
					added++;
				}
			});
			if (added) {
				writeSaved(list);
				fillSaved();
				showToast(t('savedShared', '%d shared designs added to your saved list').replace('%d', added), function () { writeSaved(before); });
			}
			openSaved();
		} else if (window.location.hash === '#om-saved') {
			openSaved();
		}
	});

	window.addEventListener('storage', function (e) { if (e.key === SAVED_KEY) { syncSaved(); } });

	/* ---------- Ring builder ---------- */

	// The visitor's latest design, so the start screen can offer it back.
	var RB_KEY = 'om_rb_last';
	$(function () {
		var el = document.querySelector('.om-builder[data-om-rb-save]');
		if (el) {
			try { window.localStorage.setItem(RB_KEY, el.getAttribute('data-om-rb-save')); } catch (err) { /* storage unavailable */ }
		}
		var $cont = $('.om-rb-continue');
		if (!$cont.length) { return; }
		var last = null;
		try { last = JSON.parse(window.localStorage.getItem(RB_KEY) || 'null'); } catch (err) { last = null; }
		if (!last || !last.u || !last.t || !/^https?:\/\//.test(last.u) || new URL(last.u).host !== window.location.host) { return; }
		$cont.attr('href', last.u).prop('hidden', false);
		$cont.find('.om-rb-continue-text').empty().append(
			document.createTextNode(t('rbWelcome', 'Welcome back — continue') + ' '),
			$('<strong></strong>').text(last.t)
		);
		if (last.i) { $cont.find('.om-rb-continue-img').append($('<img alt="" />').attr('src', last.i)); }
	});

	// "Help me choose": answers update the suggestions in place.
	var guideSeq = 0;
	function updateGuide(form) {
		var url = formUrl(form);
		var seq = ++guideSeq;
		var $res = $(form).closest('.om-rb-guide-wrap').find('.om-rb-guide-results');
		$res.addClass('is-loading').attr('aria-busy', 'true');
		$.get(url).done(function (html) {
			if (seq !== guideSeq) { return; }
			var $page = $($.parseHTML(html));
			var $fresh = $page.find('.om-rb-guide-results').first();
			if (!$fresh.length) { window.location.href = url; return; }
			$res.replaceWith($fresh);
			// The bar too: its links and "Ask us" form carry the new answers.
			var $bar = $(form).closest('.om-builder').find('.om-rb-bar').first();
			var $freshBar = $page.find('.om-rb-bar').first();
			if ($bar.length && $freshBar.length && !$bar.find('dialog[open]').length) { $bar.replaceWith($freshBar); }
			$fresh.find('.om-rb-pick').addClass('om-fade-in');
			replaceUrl(url);
			trackGuide(form, $fresh.find('.om-rb-pick').length);
		}).fail(function () {
			if (seq === guideSeq) { window.location.href = url; }
		});
	}
	// "Help me choose" answers (the chosen budget or size, not more).
	function trackGuide(form, picks) {
		var get = function (n) { var $f = $(form).find('[name="' + n + '"]'); return $f.is(':radio') ? $f.filter(':checked').val() || '' : $f.val() || ''; };
		var params = { priority: get('g_pri'), origin: get('g_origin') || 'fixed', shape: get('g_shape') || 'setting', suggestions: picks };
		if (get('g_budget')) { params.budget = parseInt(get('g_budget'), 10) || 0; params.currency = cfg.currency || 'USD'; }
		if (get('g_ct')) { params.carat = parseFloat(get('g_ct')) || 0; }
		track('diamond_guide', params, ['trackCustom', 'DiamondGuide', params]);
	}
	$(document).on('click', '.om-rb-pick-choose', function () {
		var $pick = $(this).closest('.om-rb-pick');
		track('diamond_guide_choose', { suggestion: $.trim($pick.find('.om-rb-pick-tag').text()), diamond: $.trim($pick.find('.om-rb-pick-title').text()) }, ['trackCustom', 'DiamondGuideChoose', {}]);
	});
	$(document).on('click', '.om-rb-book', function () {
		track('book_viewing_click', { location: 'ring_builder' }, ['trackCustom', 'BookViewingClick', {}]);
	});
	$(document).on('change', '.om-rb-guide-form', function () { updateGuide(this); });
	$(document).on('submit', '.om-rb-guide-form', function (e) { e.preventDefault(); updateGuide(this); });
	$(document).on('input', '.om-rb-guide-form input[type=range]', function () {
		var $out = $(this).closest('.om-rb-q').find('.om-rb-q-value');
		var v = parseFloat(this.value);
		if ($out.attr('data-om-ct')) {
			$out.text((Math.round(v * 100) / 100) + ' ct');
		} else {
			var prefix = ($out.text().match(/^[^\d]*/) || [''])[0];
			$out.text(prefix + Math.round(v).toLocaleString('en-US'));
		}
	});

	$(document).on('click', '.om-rb-share', function () {
		shareLink(this.getAttribute('data-om-url') || window.location.href, this.getAttribute('data-om-title') || document.title, 'ring_design');
	});

	$(document).on('submit', '.om-rb-email-form', function (e) {
		e.preventDefault();
		var form = this;
		var $status = $(form).find('.om-rb-email-status');
		var $btn = $(form).find('button[type=submit]');
		var email = $.trim($(form).find('input[name=email]').val());
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			$status.text(t('rbEmailBad', 'Please enter a valid email address.'));
			$(form).find('input[name=email]').trigger('focus');
			return;
		}
		$btn.prop('disabled', true);
		$status.text('');
		$.post(cfg.ajaxUrl, {
			action: 'om_builder_email',
			email: email,
			url: form.getAttribute('data-om-url'),
			title: form.getAttribute('data-om-title'),
			website: $(form).find('input[name=website]').val()
		}).done(function (r) {
			$status.text((r && r.data && r.data.message) || '');
			if (r && r.success) {
				$(form).find('input[name=email]').val('');
				track('generate_lead', { form_type: 'ring_design_email' }, ['track', 'Lead', { content_name: form.getAttribute('data-om-title') || '', content_category: 'ring_design_email' }]);
			}
		}).fail(function () {
			$status.text(t('error', 'Something went wrong. Please try again.'));
		}).always(function () { $btn.prop('disabled', false); });
	});

	/* ---------- True size: a diamond at its real size on a finger ---------- */

	var TS_KEY = 'om_px_mm';
	// Face-up area of each shape as a share of its length x width, and its
	// usual length/width ratio (for the "compare carats" stones).
	var TS_SHAPES = {
		round: [0.785, 1], oval: [0.785, 1.4], pear: [0.66, 1.55], marquise: [0.55, 2],
		emerald: [0.92, 1.4], radiant: [0.93, 1.25], cushion: [0.9, 1.1], princess: [1, 1],
		asscher: [0.9, 1], heart: [0.75, 1]
	};
	// Round diameters in mm by carat.
	var TS_ROUND = [[0.25, 4.1], [0.5, 5.1], [0.75, 5.8], [1, 6.4], [1.25, 6.9], [1.5, 7.4], [2, 8.1], [2.5, 8.7], [3, 9.3], [4, 10.2], [5, 11]];
	var tsState = null;
	var tsDialog = null;

	function tsShapeKey(shape) {
		var k = String(shape || '').toLowerCase().replace(/[^a-z]/g, '');
		return TS_SHAPES[k] ? k : 'round';
	}

	function tsRoundDiameter(ct) {
		for (var i = 1; i < TS_ROUND.length; i++) {
			if (ct <= TS_ROUND[i][0]) {
				var a = TS_ROUND[i - 1], b = TS_ROUND[i];
				return a[1] + (b[1] - a[1]) * (ct - a[0]) / (b[0] - a[0]);
			}
		}
		return TS_ROUND[TS_ROUND.length - 1][1] * Math.cbrt(ct / 5);
	}

	// Typical length x width for a carat weight in a shape.
	function tsTypical(shape, ct) {
		var k = tsShapeKey(shape), d = tsRoundDiameter(ct), f = TS_SHAPES[k];
		var w = Math.sqrt(0.785 * d * d / (f[0] * f[1]));
		return { l: w * f[1], w: w };
	}

	// CSS pixels per millimetre: the visitor's screen check, else a guess
	// from the kind of screen (labelled "approximate").
	function tsPxPerMm() {
		var saved = 0;
		try { saved = parseFloat(window.localStorage.getItem(TS_KEY)) || 0; } catch (err) { saved = 0; }
		if (saved > 1 && saved < 15) { return { v: saved, exact: true }; }
		var short = Math.min(window.screen.width || 1280, window.screen.height || 800);
		var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
		var v = coarse ? (short < 600 ? short / 64 : short / 150) : ((window.screen.width || 1440) <= 1600 ? 4.8 : 3.8);
		return { v: v, exact: false };
	}

	function tsRingDiameter(size) { return 11.63 + 0.8128 * size; }

	// SVG path for a stone: centred on cx,cy, length along the finger.
	function tsPath(shape, cx, cy, w, l) {
		var k = tsShapeKey(shape), x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - l / 2, y1 = cy + l / 2, c;
		switch (k) {
			case 'pear':
				return 'M' + cx + ' ' + y0 + ' Q' + x1 + ' ' + (y0 + l * 0.42) + ' ' + x1 + ' ' + (y1 - w / 2) + ' A' + (w / 2) + ' ' + (w / 2) + ' 0 0 1 ' + x0 + ' ' + (y1 - w / 2) + ' Q' + x0 + ' ' + (y0 + l * 0.42) + ' ' + cx + ' ' + y0 + 'Z';
			case 'marquise':
				return 'M' + cx + ' ' + y0 + ' Q' + (cx + w) + ' ' + cy + ' ' + cx + ' ' + y1 + ' Q' + (cx - w) + ' ' + cy + ' ' + cx + ' ' + y0 + 'Z';
			case 'emerald': case 'asscher': case 'radiant':
				c = Math.min(w, l) * (k === 'asscher' ? 0.24 : k === 'radiant' ? 0.14 : 0.18);
				return 'M' + (x0 + c) + ' ' + y0 + 'H' + (x1 - c) + 'L' + x1 + ' ' + (y0 + c) + 'V' + (y1 - c) + 'L' + (x1 - c) + ' ' + y1 + 'H' + (x0 + c) + 'L' + x0 + ' ' + (y1 - c) + 'V' + (y0 + c) + 'Z';
			case 'princess':
				return 'M' + x0 + ' ' + y0 + 'H' + x1 + 'V' + y1 + 'H' + x0 + 'Z';
			case 'cushion':
				c = Math.min(w, l) * 0.28;
				return 'M' + (x0 + c) + ' ' + y0 + 'H' + (x1 - c) + 'Q' + x1 + ' ' + y0 + ' ' + x1 + ' ' + (y0 + c) + 'V' + (y1 - c) + 'Q' + x1 + ' ' + y1 + ' ' + (x1 - c) + ' ' + y1 + 'H' + (x0 + c) + 'Q' + x0 + ' ' + y1 + ' ' + x0 + ' ' + (y1 - c) + 'V' + (y0 + c) + 'Q' + x0 + ' ' + y0 + ' ' + (x0 + c) + ' ' + y0 + 'Z';
			case 'heart':
				return 'M' + cx + ' ' + y1 + ' C' + (x0 - w * 0.05) + ' ' + (cy + l * 0.1) + ' ' + x0 + ' ' + y0 + ' ' + (cx - w * 0.25) + ' ' + y0 + ' C' + (cx - w * 0.08) + ' ' + y0 + ' ' + cx + ' ' + (y0 + l * 0.12) + ' ' + cx + ' ' + (y0 + l * 0.2) + ' C' + cx + ' ' + (y0 + l * 0.12) + ' ' + (cx + w * 0.08) + ' ' + y0 + ' ' + (cx + w * 0.25) + ' ' + y0 + ' C' + x1 + ' ' + y0 + ' ' + (x1 + w * 0.05) + ' ' + (cy + l * 0.1) + ' ' + cx + ' ' + y1 + 'Z';
			default:
				return 'M' + x0 + ' ' + cy + ' A' + (w / 2) + ' ' + (l / 2) + ' 0 1 1 ' + x1 + ' ' + cy + ' A' + (w / 2) + ' ' + (l / 2) + ' 0 1 1 ' + x0 + ' ' + cy + 'Z';
		}
	}

	function tsFmt(n) { return (Math.round(n * 10) / 10).toFixed(1); }
	function tsCt(n) { return String(Math.round(n * 100) / 100); }

	function openTrueSize(data, trigger) {
		track('true_size', { shape: (data && data.s) || '', carat: (data && data.c) || 0 }, ['trackCustom', 'TrueSize', {}]);
		var shape = data.s || 'Round';
		var mine = { c: parseFloat(data.c) || 0, l: parseFloat(data.l) || 0, w: parseFloat(data.w) || 0 };
		if ((!mine.l || !mine.w) && mine.c) { var ty = tsTypical(shape, mine.c); mine.l = ty.l; mine.w = ty.w; }
		if (!mine.c) { mine.c = 1; }
		var picks = [0.5, 1, 1.5, 2].filter(function (c) { return Math.abs(c - mine.c) > 0.08; }).map(function (c) { var t = tsTypical(shape, c); return { c: c, l: t.l, w: t.w, mine: false }; });
		picks.push({ c: mine.c, l: mine.l, w: mine.w, mine: true });
		picks.sort(function (a, b) { return a.c - b.c; });
		tsState = { shape: shape, title: data.t || '', picks: picks, at: picks.findIndex(function (p) { return p.mine; }), close: false, size: 6, trigger: trigger };
		if (!tsDialog) { tsDialog = buildTrueSize(); }
		tsDialog.find('.om-ts-check').prop('open', false);
		if (!tsDialog[0].open) {
			if (tsDialog[0].showModal) { tsDialog[0].showModal(); } else { tsDialog.attr('open', ''); }
		}
		$('html').addClass('om-lb-open');
		// Drawn once open, so the stage has its size.
		renderTrueSize();
	}

	function buildTrueSize() {
		var $d = $('<dialog class="om-ts' + (cfg.refined ? ' om-refined' : '') + '" aria-labelledby="om-ts-title"></dialog>');
		var sizes = '';
		for (var s = 4; s <= 10; s += 0.5) { sizes += '<option value="' + s + '">' + s + '</option>'; }
		$d.html(
			'<div class="om-ts-inner">' +
			'<div class="om-ts-stage"><svg class="om-ts-svg" role="img"></svg><span class="om-ts-scale"></span></div>' +
			'<div class="om-ts-side">' +
			'<div class="om-ts-top"><div><p class="om-ts-eyebrow"></p><h2 class="om-ts-title" id="om-ts-title"></h2><p class="om-ts-sub"></p></div><button type="button" class="om-ts-close">&times;</button></div>' +
			'<p class="om-ts-label om-ts-label--compare"></p><div class="om-ts-picks" role="group"></div>' +
			'<div class="om-ts-row" aria-hidden="true"></div>' +
			'<div class="om-ts-controls"><span class="om-ts-toggle" role="group"><button type="button" class="om-ts-true"></button><button type="button" class="om-ts-zoom"></button></span>' +
			'<label class="om-ts-size"><span class="om-ts-size-label"></span> <select>' + sizes + '</select></label></div>' +
			'<details class="om-ts-check"><summary></summary><p class="om-ts-check-text"></p><div class="om-ts-card-wrap"><span class="om-ts-card"></span></div>' +
			'<label class="om-ts-check-range"><span class="om-visually-hidden"></span><input type="range" min="2.5" max="9" step="0.01" /></label><button type="button" class="om-ts-check-done"></button></details>' +
			'</div></div>'
		);
		$d.find('.om-ts-eyebrow').text(t('tsEyebrow', 'True size'));
		$d.find('.om-ts-close').attr('aria-label', t('close', 'Close')).on('click', function () { $d[0].close(); });
		$d.find('.om-ts-label--compare').text(t('tsCompare', 'Compare carats'));
		$d.find('.om-ts-picks').attr('aria-label', t('tsCompare', 'Compare carats'));
		$d.find('.om-ts-true').text(t('tsTrue', 'True size')).on('click', function () { tsState.close = false; renderTrueSize(); });
		$d.find('.om-ts-zoom').text(t('tsZoom', 'Close-up ×3')).on('click', function () { tsState.close = true; renderTrueSize(); });
		$d.find('.om-ts-size-label').text(t('tsFinger', 'Ring size'));
		$d.find('.om-ts-size select').on('change', function () { tsState.size = parseFloat(this.value) || 6; renderTrueSize(); });
		$d.find('.om-ts-check summary').text(t('tsCheck', 'Screen check (once)'));
		$d.find('.om-ts-check-text').text(t('tsCheckText', 'Hold any bank card against the screen and drag the slider until the outline matches it. Sizes are then exact on this device.'));
		$d.find('.om-ts-check-range .om-visually-hidden').text(t('tsCheckRange', 'Card outline size'));
		$d.find('.om-ts-check-range input').on('input', function () { tsState.px = parseFloat(this.value); renderTrueSize(true); });
		$d.find('.om-ts-check-done').text(t('tsCheckDone', 'Done — save for this device')).on('click', function () {
			try { window.localStorage.setItem(TS_KEY, String(tsState.px)); } catch (err) { /* storage unavailable */ }
			$d.find('.om-ts-check').prop('open', false);
			renderTrueSize();
			announce(t('tsSaved', 'Saved. Sizes are exact on this screen.'));
		});
		$d.on('click', function (e) { if (e.target === $d[0]) { $d[0].close(); } });
		$d[0].addEventListener('close', function () {
			$('html').removeClass('om-lb-open');
			if (tsState && tsState.trigger && tsState.trigger.focus) { tsState.trigger.focus(); }
		});
		return $d.appendTo(document.body);
	}

	function renderTrueSize(checking) {
		var $d = tsDialog, st = tsState;
		var px = tsPxPerMm();
		if (checking && st.px) { px = { v: st.px, exact: true }; } else { st.px = px.v; }
		var sel = st.picks[st.at];
		var s = px.v * (st.close ? 3 : 1);
		var stage = $d.find('.om-ts-stage')[0];
		var W = stage.clientWidth || 520, H = stage.clientHeight || 520;
		var cx = W / 2, fw = tsRingDiameter(st.size) * s, top = H * 0.08;
		var bandY = Math.min(H * 0.62, top + fw * 2.2 + sel.l * s / 2);
		var svgNS = 'http://www.w3.org/2000/svg';
		var svg = $d.find('.om-ts-svg')[0];
		svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
		svg.setAttribute('width', W);
		svg.setAttribute('height', H);
		while (svg.firstChild) { svg.removeChild(svg.firstChild); }
		var add = function (name, attrs) { var el = document.createElementNS(svgNS, name); Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); }); svg.appendChild(el); return el; };
		var r = fw / 2;
		add('path', { d: 'M' + (cx - r) + ' ' + H + ' V' + (top + r) + ' A' + r + ' ' + r + ' 0 0 1 ' + (cx + r) + ' ' + (top + r) + ' V' + H, 'class': 'om-ts-finger' });
		var nw = fw * 0.5;
		add('rect', { x: cx - nw / 2, y: top + fw * 0.18, width: nw, height: fw * 0.62, rx: nw / 2, 'class': 'om-ts-nail' });
		var bh = 2 * s;
		add('rect', { x: cx - r - 2, y: bandY - bh / 2, width: fw + 4, height: bh, rx: bh / 2, 'class': 'om-ts-band' });
		add('path', { d: tsPath(st.shape, cx, bandY, sel.w * s, sel.l * s), 'class': 'om-ts-stone' });
		add('path', { d: tsPath(st.shape, cx, bandY, sel.w * s * 0.56, sel.l * s * 0.56), 'class': 'om-ts-table' });

		var name = st.shape.charAt(0).toUpperCase() + st.shape.slice(1).toLowerCase();
		var dims = tsFmt(sel.l) + ' × ' + tsFmt(sel.w) + ' mm';
		svg.setAttribute('aria-label', tsCt(sel.c) + ' ct ' + name + ', ' + dims + ', ' + t('tsOnFinger', 'on a size %s finger').replace('%s', st.size));
		$d.find('.om-ts-title').text(tsCt(sel.c) + ' ct ' + name + ' · ' + dims);
		$d.find('.om-ts-sub').text(sel.mine ? (st.title || '') : t('tsTypical', 'Typical size for this carat'));
		var note = st.close ? t('tsScaleZoom', 'Close-up — 3× real size') : (px.exact ? t('tsScaleExact', 'Real size on this screen') : (cfg.tsCheck === false ? '' : t('tsScaleApprox', 'About real size — do the screen check for exact')));
		$d.find('.om-ts-scale').text(note).prop('hidden', !note);
		// Screen check switched off in Settings: no note, no check.
		$d.find('.om-ts-check').prop('hidden', cfg.tsCheck === false);

		var $picks = $d.find('.om-ts-picks').empty();
		st.picks.forEach(function (p, i) {
			$('<button type="button" class="om-ts-pick"></button>')
				.toggleClass('is-on', i === st.at).toggleClass('is-mine', !!p.mine)
				.attr('aria-pressed', i === st.at ? 'true' : 'false')
				.append($('<span class="om-ts-pick-ct"></span>').text((p.mine ? t('tsThis', 'This one') + ' · ' : '') + tsCt(p.c) + ' ct'), $('<span class="om-ts-pick-mm"></span>').text(tsFmt(p.l) + ' × ' + tsFmt(p.w) + ' mm'))
				.on('click', function () { st.at = i; renderTrueSize(); })
				.appendTo($picks);
		});
		var $row = $d.find('.om-ts-row').empty();
		st.picks.forEach(function (p, i) {
			var k = Math.min(px.v * 1.6, 60 / Math.max(p.l, 1));
			var sw = p.w * k, sl = p.l * k;
			var mini = document.createElementNS(svgNS, 'svg');
			mini.setAttribute('width', Math.ceil(sw + 4)); mini.setAttribute('height', Math.ceil(sl + 4));
			var path = document.createElementNS(svgNS, 'path');
			path.setAttribute('d', tsPath(st.shape, sw / 2 + 2, sl / 2 + 2, sw, sl));
			path.setAttribute('class', 'om-ts-stone' + (i === st.at ? ' is-on' : '') + (p.mine ? ' is-mine' : ''));
			mini.appendChild(path);
			$('<span class="om-ts-mini"></span>').append(mini, $('<span></span>').text(tsCt(p.c) + ' ct')).appendTo($row);
		});
		$d.find('.om-ts-true').attr('aria-pressed', st.close ? 'false' : 'true').toggleClass('is-on', !st.close);
		$d.find('.om-ts-zoom').attr('aria-pressed', st.close ? 'true' : 'false').toggleClass('is-on', st.close);
		$d.find('.om-ts-size select').val(String(st.size));
		// Screen check: a bank card (85.6 × 54 mm) at the current scale.
		$d.find('.om-ts-card').css({ width: 85.6 * px.v + 'px', height: 53.98 * px.v + 'px' });
		$d.find('.om-ts-check-range input').val(px.v);
	}

	$(document).on('click', '.om-ts-open', function (e) {
		e.preventDefault();
		var data;
		try { data = JSON.parse(this.getAttribute('data-om-ts')); } catch (err) { return; }
		openTrueSize(data, this);
	});

	$(window).on('resize', function () { if (tsDialog && tsDialog[0].open) { renderTrueSize(); } });

	/* ---------- Page transitions (listing <-> product) ---------- */

	// The clicked card's photo morphs into the product photo (browsers with
	// cross-document view transitions; others simply navigate).
	var VT_KEY = 'om_vt_style';
	$(document).on('click', 'a.om-card', function () {
		if (!cfg.pageTransitions) { return; }
		var box = this.querySelector('.om-card-image');
		var cell = $(this).closest('.om-card-cell').find('.om-compare-toggle')[0];
		var style = '';
		try { style = cell ? JSON.parse(cell.getAttribute('data-om-compare')).s : ''; } catch (err) { style = ''; }
		if (!style) { style = (this.getAttribute('href') || '').split('/').filter(Boolean).pop() || ''; }
		$('.om-card-image').each(function () { this.style.viewTransitionName = ''; });
		if (box) { box.style.viewTransitionName = 'om-hero'; }
		try { window.sessionStorage.setItem(VT_KEY, String(style).toLowerCase()); } catch (err) { /* nothing */ }
	});

	window.addEventListener('pagereveal', function (e) {
		if (!e.viewTransition) { return; }
		var style = '';
		try { style = window.sessionStorage.getItem(VT_KEY) || ''; } catch (err) { style = ''; }
		if (!style) { return; }
		var target = null;
		var wrap = document.querySelector('.om-product-wrap:not(.om-product-wrap--compact)');
		if (wrap && String(wrap.getAttribute('data-style')).toLowerCase() === style) {
			target = wrap.querySelector('.om-main-media');
		} else {
			// Back on the listing: the card we came from.
			$('a.om-card').each(function () {
				if (!target && (this.getAttribute('href') || '').toLowerCase().indexOf('/' + style + '/') !== -1) { target = this.querySelector('.om-card-image'); }
			});
		}
		if (target) {
			target.style.viewTransitionName = 'om-hero';
			e.viewTransition.finished.finally(function () { target.style.viewTransitionName = ''; });
		}
	});

	/* =========================================================
	   Story reels
	   ========================================================= */

	var REELS_SEEN_KEY = 'om_reels_seen';
	var reel = null; // The open player's state.
	var reelPrices = {}; // line|style => "From $X" ('' = none)

	function readReelsSeen() {
		try { var v = JSON.parse(window.localStorage.getItem(REELS_SEEN_KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (err) { return []; }
	}

	function markReelSeen(id) {
		var seen = readReelsSeen().filter(function (x) { return x !== id; });
		seen.unshift(id);
		try { window.localStorage.setItem(REELS_SEEN_KEY, JSON.stringify(seen.slice(0, 200))); } catch (err) { /* storage unavailable */ }
		syncReelsSeen();
		initBackLink();
		restoreListingScroll();
	}

	// Watched stories get a quiet grey ring, like on social apps.
	function syncReelsSeen() {
		var seen = readReelsSeen();
		$('.om-reel-bubble').each(function () {
			$(this).toggleClass('is-seen', seen.indexOf(this.getAttribute('data-om-reel-id')) > -1);
		});
	}

	function reelButton(cls, label, text) {
		return $('<button type="button"></button>').addClass(cls).attr('aria-label', label).html(text || '');
	}

	function openReels($section, index, opener) {
		var conf;
		try { conf = JSON.parse($section.attr('data-om-reels') || '{}'); } catch (err) { return; }
		if (!conf.items || !conf.items.length) { return; }
		closeReels(true);
		var $v = $('<div class="om-reels-viewer" role="dialog" aria-modal="true"></div>').toggleClass('om-refined', !!cfg.refined).attr('aria-label', t('stories', 'Video stories'));
		var $panel = $('<div class="om-rv-panel"></div>');
		var $bars = $('<div class="om-rv-bars" aria-hidden="true"></div>');
		conf.items.forEach(function () { $bars.append('<span class="om-rv-bar"><span class="om-rv-fill"></span></span>'); });
		var $top = $('<div class="om-rv-top"></div>')
			.append($('<span class="om-rv-who"></span>').append('<span class="om-rv-avatar"></span>', '<span class="om-rv-name"></span>'))
			.append($('<span class="om-rv-tools"></span>').append(
				reelButton('om-rv-pause', t('pause', 'Pause')),
				reelButton('om-rv-sound', t('soundOn', 'Turn sound on')),
				reelButton('om-rv-close', t('close', 'Close'), '&times;')
			));
		var $stage = $('<div class="om-rv-stage"></div>')
			.append('<div class="om-rv-media"></div>')
			.append(reelButton('om-rv-nav om-rv-prev', t('prevStory', 'Previous')), reelButton('om-rv-nav om-rv-next', t('nextStory', 'Next')));
		var $foot = $('<div class="om-rv-foot"></div>')
			.append($('<div class="om-rv-colors" role="group" hidden></div>').attr('aria-label', conf.metal || 'Metal colour'))
			.append('<p class="om-rv-style"></p><p class="om-rv-title"></p><p class="om-rv-price"></p>')
			.append($('<a class="om-rv-cta"></a>').text(conf.button || 'View this design'));
		$panel.append($bars, $top, $stage, $foot, '<p class="om-visually-hidden om-rv-live" aria-live="polite"></p>');
		// The widget's player colours travel with it (it lives on <body>).
		var cs = window.getComputedStyle($section[0]);
		['--om-rv-backdrop', '--om-rv-cta-bg', '--om-rv-cta-bg-hover', '--om-rv-cta-fg', '--om-rv-cta-radius'].forEach(function (name) {
			var value = cs.getPropertyValue(name);
			if (value && $.trim(value)) { $v[0].style.setProperty(name, $.trim(value)); }
		});
		$v.append($panel).appendTo(document.body);
		$('html').addClass('om-dialog-open');
		reel = { $v: $v, conf: conf, i: -1, opener: opener, muted: !conf.sound, paused: false, elapsed: 0, last: 0, raf: 0, held: false, color: '' };
		showReel(index);
		setTimeout(function () { $v.find('.om-rv-close').trigger('focus'); }, 30);
		requestAnimationFrame(function () { $v.addClass('is-open'); });
	}

	function reelMedia() {
		return reel ? reel.$v.find('.om-rv-media video')[0] : null;
	}

	// The media for a story in the metal colour picked (when it has one).
	function reelEntry(item) {
		if (reel.color && item.c) {
			for (var n = 0; n < item.c.length; n++) {
				if (item.c[n].n.toLowerCase() === reel.color.toLowerCase()) { return item.c[n]; }
			}
		}
		return { k: item.k, src: item.src, i: item.i };
	}

	function reelLink(item) {
		var entry = item.c && reel.color ? reelEntry(item) : null;
		if (!entry || !entry.n) { return item.u; }
		try { var url = new URL(item.u, window.location.href); url.searchParams.set('om_color', entry.n); return url.toString(); } catch (err) { return item.u; }
	}

	// Anonymous counts for Catalog insights: a story seen (once per visit)
	// or its button tapped.
	function trackReel(item, kind) {
		if (!cfg.ajaxUrl) { return; }
		var key = 'om_reel_' + kind + '_' + item.l + '|' + item.s;
		try { if (kind === 'view') { if (window.sessionStorage.getItem(key)) { return; } window.sessionStorage.setItem(key, '1'); } } catch (err) { /* count anyway */ }
		var data = new FormData();
		data.append('action', 'om_track_reel'); data.append('line', item.l); data.append('style', item.s); data.append('kind', kind);
		if (navigator.sendBeacon) { navigator.sendBeacon(cfg.ajaxUrl, data); } else { $.post(cfg.ajaxUrl, { action: 'om_track_reel', line: item.l, style: item.s, kind: kind }); }
	}

	function showReel(i) {
		if (!reel) { return; }
		var items = reel.conf.items;
		if (i < 0) { i = 0; }
		if (i >= items.length) {
			if (reel.conf.end) { showReelEnd(); } else { closeReels(); }
			return;
		}
		reel.$v.removeClass('is-end').find('.om-rv-end').remove();
		reel.i = i;
		reel.elapsed = 0;
		reel.last = 0;
		reel.paused = false;
		var item = items[i];
		var $v = reel.$v;
		$v.find('.om-rv-bar').each(function (n) {
			$(this).toggleClass('is-done', n < i).toggleClass('is-active', n === i).find('.om-rv-fill').css('transform', 'scaleX(' + (n < i ? 1 : 0) + ')');
		});
		$v.find('.om-rv-avatar').css('background-image', item.i ? 'url("' + item.i + '")' : '');
		$v.find('.om-rv-name').text(item.t);
		$v.find('.om-rv-title').text(item.t);
		$v.find('.om-rv-style').text(reel.conf.style ? t('style', 'Style') + ' ' + item.s : '').prop('hidden', !reel.conf.style);
		$v.find('.om-rv-cta').attr('href', reelLink(item));
		// Metal colour dots.
		var $colors = $v.find('.om-rv-colors').empty().prop('hidden', !item.c);
		if (item.c) {
			var current = reelEntry(item).n || (item.c.filter(function (c) { return c.d; })[0] || item.c[0]).n;
			item.c.forEach(function (c) {
				$colors.append($('<button type="button" class="om-rv-color"></button>').addClass(c.sw).attr({ 'data-om-color': c.n, 'aria-label': c.n, title: c.n, 'aria-pressed': c.n === current ? 'true' : 'false' }));
			});
		}
		$v.find('.om-rv-live').text(t('storyOf', 'Story %1$s of %2$s').replace('%1$s', i + 1).replace('%2$s', items.length) + ': ' + item.t);
		$v.find('.om-rv-prev').prop('disabled', i === 0);
		syncReelTools();

		// The media: a file plays in <video> (timed by its own length), an
		// embed in an iframe (timed by the story duration).
		var entry = reelEntry(item);
		var $media = $v.find('.om-rv-media').empty();
		if (entry.k === 'file') {
			var video = document.createElement('video');
			video.className = 'om-rv-video';
			video.playsInline = true;
			video.setAttribute('playsinline', '');
			video.muted = reel.muted;
			video.preload = 'auto';
			if (entry.i) { video.poster = entry.i; }
			video.src = entry.src;
			video.addEventListener('ended', function () { if (reel && reel.conf.next) { showReel(reel.i + 1); } else if (reel) { video.currentTime = 0; video.play(); } });
			video.addEventListener('error', function () { if (entry === item || !item.c) { item.k = 'photo'; } else { entry.k = 'photo'; } showReel(reel ? reel.i : 0); });
			$media.append(video);
			var p = video.play();
			if (p && p.catch) { p.catch(function () { /* autoplay refused: the poster shows, tap to play */ }); }
		} else if (entry.k === 'embed') {
			var src = entry.src;
			if (!reel.muted) { src = src.replace('mute=1', 'mute=0').replace('muted=1', 'muted=0'); }
			$media.append($('<iframe class="om-rv-embed" allow="autoplay; fullscreen; picture-in-picture" tabindex="-1"></iframe>').attr({ src: src, title: item.t }));
		} else {
			$media.append($('<img class="om-rv-photo" alt="" />').attr('src', entry.i || item.i));
		}

		// Price, once per design.
		var $price = $v.find('.om-rv-price').text('').prop('hidden', true);
		if (reel.conf.price && cfg.ajaxUrl) {
			var key = item.l + '|' + item.s;
			var put = function (text) { if (reel && reel.conf.items[reel.i] === item) { $price.text(text || '').prop('hidden', !text); } };
			if (key in reelPrices) { put(reelPrices[key]); } else {
				$.post(cfg.ajaxUrl, { action: 'om_card_prices', line: item.l, styles: [item.s] }).done(function (r) {
					reelPrices[key] = (r && r.success && r.data.prices && r.data.prices[item.s]) || '';
					put(reelPrices[key]);
				});
			}
		}

		// Warm up the next story.
		var nextItem = items[i + 1];
		if (nextItem && nextItem.k === 'file' && !nextItem.warm) {
			nextItem.warm = document.createElement('video');
			nextItem.warm.preload = 'auto';
			nextItem.warm.muted = true;
			nextItem.warm.src = nextItem.src;
		}

		markReelSeen(item.l + '|' + item.s);
		trackReel(item, 'view');
		cancelAnimationFrame(reel.raf);
		reel.raf = requestAnimationFrame(tickReel);
	}

	// Progress: a video's own time (capped at the longest a story may run),
	// else a clock that stops while paused.
	function tickReel(now) {
		if (!reel) { return; }
		var item = reel.conf.items[reel.i];
		if (!item) { return; }
		var pct = 0;
		var video = reelMedia();
		if (reelEntry(item).k === 'file' && video) {
			var length = Math.min(video.duration || reel.conf.max, reel.conf.max);
			pct = length ? video.currentTime / length : 0;
			if (video.currentTime >= reel.conf.max && reel.conf.next) { showReel(reel.i + 1); return; }
		} else {
			if (!reel.paused && reel.last) { reel.elapsed += now - reel.last; }
			reel.last = now;
			pct = reel.elapsed / (reel.conf.dur * 1000);
			if (pct >= 1) {
				if (reel.conf.next) { showReel(reel.i + 1); return; }
				reel.elapsed = 0;
			}
		}
		reel.$v.find('.om-rv-bar').eq(reel.i).find('.om-rv-fill').css('transform', 'scaleX(' + Math.min(1, Math.max(0, pct)) + ')');
		reel.raf = requestAnimationFrame(tickReel);
	}

	function pauseReel(on) {
		if (!reel) { return; }
		reel.paused = on;
		var video = reelMedia();
		if (video) { if (on) { video.pause(); } else { var p = video.play(); if (p && p.catch) { p.catch(function () {}); } } }
		reel.$v.toggleClass('is-paused', on);
		syncReelTools();
	}

	function syncReelTools() {
		if (!reel) { return; }
		reel.$v.find('.om-rv-pause').attr({ 'aria-label': reel.paused ? t('play', 'Play') : t('pause', 'Pause'), 'aria-pressed': reel.paused ? 'true' : 'false' });
		reel.$v.find('.om-rv-sound').attr({ 'aria-label': reel.muted ? t('soundOn', 'Turn sound on') : t('soundOff', 'Turn sound off') }).toggleClass('is-on', !reel.muted);
	}

	function closeReels(silent) {
		if (!reel) { return; }
		var r = reel;
		reel = null;
		cancelAnimationFrame(r.raf);
		var video = r.$v.find('video')[0];
		if (video) { video.pause(); }
		r.$v.remove();
		$('html').removeClass('om-dialog-open');
		if (!silent && r.opener && document.contains(r.opener)) { r.opener.focus(); }
	}

	$(document).on('click', '.om-reel-bubble', function () {
		openReels($(this).closest('.om-reels'), parseInt(this.getAttribute('data-om-reel'), 10) || 0, this);
	});

	$(document).on('click', '.om-rv-close', function () { closeReels(); });

	// Metal colour: this story (and the next ones) in that colour.
	$(document).on('click', '.om-rv-color', function () {
		if (!reel) { return; }
		reel.color = this.getAttribute('data-om-color') || '';
		showReel(reel.i);
		reel.$v.find('.om-rv-color[data-om-color="' + reel.color + '"]').trigger('focus');
	});

	$(document).on('click', '.om-rv-cta', function () {
		if (reel && reel.conf.items[reel.i]) { trackReel(reel.conf.items[reel.i], 'tap'); }
	});

	$(document).on('click', '.om-rv-again', function () { showReel(0); });

	// After the last story: "More like this", Watch again, Browse all.
	function showReelEnd() {
		var conf = reel.conf;
		var $v = reel.$v;
		cancelAnimationFrame(reel.raf);
		var video = reelMedia();
		if (video) { video.pause(); }
		reel.i = conf.items.length;
		$v.find('.om-rv-media').empty();
		$v.find('.om-rv-bar').addClass('is-done').removeClass('is-active').find('.om-rv-fill').css('transform', 'scaleX(1)');
		$v.addClass('is-end').removeClass('is-paused').find('.om-rv-end').remove();
		var $grid = $('<div class="om-rv-more-grid"></div>');
		conf.more.forEach(function (m) {
			$grid.append($('<a class="om-rv-more"></a>').attr('href', m.u)
				.append($('<span class="om-rv-more-img"></span>').append(m.i ? $('<img alt="" loading="lazy" />').attr('src', m.i) : null))
				.append($('<span class="om-rv-more-title"></span>').text(m.t))
				.append(conf.price ? $('<span class="om-rv-more-price"></span>').attr({ 'data-om-line': m.l, 'data-om-style': m.s }) : null));
		});
		var $actions = $('<div class="om-rv-end-actions"></div>').append($('<button type="button" class="om-rv-again"></button>').text(conf.again || 'Watch again'));
		if (conf.browse) { $actions.append($('<a class="om-rv-browse"></a>').attr('href', conf.browse).text(conf.browseText || 'Browse all')); }
		var $end = $('<div class="om-rv-end" role="group"></div>').attr('aria-labelledby', 'om-rv-end-title')
			.append($('<p class="om-rv-end-title" id="om-rv-end-title"></p>').text(conf.moreTitle || 'More like this'), $grid, $actions);
		$v.find('.om-rv-panel').append($end);
		$v.find('.om-rv-live').text(conf.moreTitle || 'More like this');
		setTimeout(function () { $end.find('a, button').first().trigger('focus'); }, 30);
		if (conf.price && cfg.ajaxUrl) {
			var byLine = {};
			conf.more.forEach(function (m) { (byLine[m.l] = byLine[m.l] || []).push(m.s); });
			$.each(byLine, function (line, styles) {
				$.post(cfg.ajaxUrl, { action: 'om_card_prices', line: line, styles: styles }).done(function (r) {
					var prices = (r && r.success && r.data.prices) || {};
					$end.find('.om-rv-more-price[data-om-line="' + line + '"]').each(function () { $(this).text(prices[$(this).attr('data-om-style')] || ''); });
				});
			});
		}
	}
	$(document).on('click', '.om-rv-pause', function () { pauseReel(!(reel && reel.paused)); });
	$(document).on('click', '.om-rv-sound', function () {
		if (!reel) { return; }
		reel.muted = !reel.muted;
		var video = reelMedia();
		if (video) { video.muted = reel.muted; } else if (reel.conf.items[reel.i] && reelEntry(reel.conf.items[reel.i]).k === 'embed') { showReel(reel.i); }
		syncReelTools();
	});
	$(document).on('click', '.om-rv-prev, .om-rv-next', function () {
		if (!reel || reel.held) { return; }
		showReel(reel.i + ($(this).hasClass('om-rv-next') ? 1 : -1));
	});
	// Backdrop click (desktop) closes.
	$(document).on('click', '.om-reels-viewer', function (e) { if (e.target === this) { closeReels(); } });

	// Hold to pause; swipe sideways for the next story, down to close.
	$(document).on('pointerdown', '.om-rv-stage', function (e) {
		if (!reel) { return; }
		var start = { x: e.clientX, y: e.clientY, t: Date.now() };
		reel.held = false;
		var holdTimer = setTimeout(function () { if (reel) { reel.held = true; pauseReel(true); } }, 220);
		var up = function (ev) {
			clearTimeout(holdTimer);
			$(document).off('pointerup.omrv pointercancel.omrv');
			if (!reel) { return; }
			var dx = ev.clientX - start.x, dy = ev.clientY - start.y;
			if (reel.held) {
				pauseReel(false);
				setTimeout(function () { if (reel) { reel.held = false; } }, 0);
				return;
			}
			if (dy > 90 && Math.abs(dy) > Math.abs(dx)) { reel.held = true; closeReels(); return; }
			if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
				reel.held = true;
				showReel(reel.i + (dx < 0 ? 1 : -1));
				setTimeout(function () { if (reel) { reel.held = false; } }, 0);
			}
		};
		$(document).on('pointerup.omrv pointercancel.omrv', up);
	});

	$(document).on('keydown', function (e) {
		if (!reel) { return; }
		if (e.key === 'Escape') { e.preventDefault(); closeReels(); return; }
		if (e.key === 'ArrowRight') { e.preventDefault(); if (reel.i < reel.conf.items.length) { showReel(reel.i + 1); } return; }
		if (e.key === 'ArrowLeft') { e.preventDefault(); showReel(reel.i - 1); return; }
		if (e.key === ' ' && !$(e.target).is('a, button')) { e.preventDefault(); pauseReel(!reel.paused); return; }
		if (e.key === 'Tab') {
			// Keep focus inside the player.
			var $f = reel.$v.find('button:not(:disabled), a[href]').filter(':visible');
			var idx = $f.index(document.activeElement);
			if (e.shiftKey && idx <= 0) { e.preventDefault(); $f.last().trigger('focus'); } else if (!e.shiftKey && idx === $f.length - 1) { e.preventDefault(); $f.first().trigger('focus'); }
		}
	});

	document.addEventListener('visibilitychange', function () {
		if (reel && document.hidden) { pauseReel(true); }
	});

	/* =========================================================
	   Back to results
	   ========================================================= */

	var BACK_KEY = 'om_back';
	var BACK_RESTORE_KEY = 'om_back_restore';

	function sessionGet(key) {
		try { return JSON.parse(window.sessionStorage.getItem(key) || 'null'); } catch (err) { return null; }
	}

	function sessionSet(key, value) {
		try { if (value === null) { window.sessionStorage.removeItem(key); } else { window.sessionStorage.setItem(key, JSON.stringify(value)); } } catch (err) { /* storage unavailable */ }
	}

	// The listing's name: its heading, else the page title's first part.
	function listingLabel($wrap) {
		var heading = $.trim($wrap.find('.om-intro-title').first().text());
		if (heading) { return heading; }
		var h1 = $.trim($('h1').first().text());
		if (h1 && h1.length < 60) { return h1; }
		return $.trim(String(document.title).split(/\s[–—|-]\s/)[0]);
	}

	// Opening a design from a listing: remember where the visitor was.
	function rememberListing($wrap) {
		if (!$wrap.length || $wrap.hasClass('om-search-standalone')) { return; }
		sessionSet(BACK_KEY, {
			u: window.location.href,
			y: Math.round(window.scrollY || window.pageYOffset || 0),
			t: listingLabel($wrap),
			f: $wrap.find('.om-active-filters .om-chip').map(function () { return $.trim($(this).clone().children().remove().end().text()); }).get().slice(0, 3),
			at: Date.now()
		});
	}

	$(document).on('click', '.om-catalog-wrap a.om-card', function (e) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) { return; }
		rememberListing($(this).closest('.om-catalog-wrap'));
	});

	// "View full details" from a quick view opened on a listing.
	$(document).on('click', '.om-qv-full', function () {
		rememberListing($('.om-catalog-wrap').not('.om-search-standalone').first());
	});

	function initBackLink() {
		var $nav = $('.om-back').first();
		if (!$nav.length) { return; }
		var back = sessionGet(BACK_KEY);
		// Only this visit's listing, and not older than a few hours.
		if (!back || !back.u || Date.now() - (back.at || 0) > 6 * 3600 * 1000 || back.u === window.location.href) { return; }
		var own = $nav.attr('data-om-back-text') || '';
		var label = own || (back.t ? t('backTo', 'Back to %s').replace('%s', back.t) : t('backResults', 'Back to results'));
		$nav.find('.om-back-link').attr('href', back.u);
		$nav.find('.om-back-label').text(label);
		$nav.find('.om-back-filters').text(back.f && back.f.length ? back.f.join(' · ') : '').prop('hidden', !(back.f && back.f.length));
		$nav.prop('hidden', false);
	}

	$(document).on('click', '.om-back-link', function (e) {
		var back = sessionGet(BACK_KEY);
		if (!back || e.metaKey || e.ctrlKey || e.shiftKey) { return; }
		// Straight from the listing: the browser's own Back restores it
		// exactly as it was (scroll, loaded cards, open panels).
		if (document.referrer === back.u && window.history.length > 1) {
			e.preventDefault();
			window.history.back();
			return;
		}
		sessionSet(BACK_RESTORE_KEY, { u: back.u, y: back.y });
	});

	// Arriving back on the listing through the link: return to the spot.
	function restoreListingScroll() {
		var r = sessionGet(BACK_RESTORE_KEY);
		if (!r) { return; }
		sessionSet(BACK_RESTORE_KEY, null);
		if (r.u !== window.location.href || !r.y) { return; }
		var go = function () { window.scrollTo(0, r.y); };
		go();
		// Once late images have laid out, settle there again.
		$(window).one('load', function () { setTimeout(go, 50); });
	}

	/* =========================================================
	   Slim sticky toolbar (catalog)
	   ========================================================= */

	var stickyToolsTick = false;

	// Show the slim bar once the block's own toolbar (or search) has
	// scrolled away, while the results are still on screen.
	/* A site header that stays on screen (sticky/fixed, e.g. Elementor
	   Pro's sticky header): its height becomes --om-header-h, so the slim
	   toolbar, the sticky sidebar and the sticky gallery sit below it
	   instead of under it. Measured while scrolling, so headers that
	   shrink, appear or hide on scroll are followed. The WordPress admin
	   bar is left out (the CSS adds it). */
	var headerH = -1;
	var OWN_LAYERS = '.om-sticky-tools, .om-saved-float, .om-compare-tray, .om-toast, .om-sticky-bar, .om-rb-bar, dialog';

	function measureHeader() {
		var start = 0;
		var bar = document.getElementById('wpadminbar');
		if (bar && window.getComputedStyle(bar).position === 'fixed') { start = Math.max(0, bar.getBoundingClientRect().bottom); }
		var y = start;
		var vw = window.innerWidth;
		var vh = window.innerHeight;
		for (var guard = 0; guard < 4 && document.elementsFromPoint; guard++) {
			var found = 0;
			[vw / 2, 24, vw - 24].forEach(function (x) {
				document.elementsFromPoint(x, y + 2).forEach(function (el) {
					if (found || el === document.documentElement || el === document.body || el === bar || (bar && bar.contains(el)) || el.closest(OWN_LAYERS)) { return; }
					var pos = window.getComputedStyle(el).position;
					if (pos !== 'fixed' && pos !== 'sticky') { return; }
					var r = el.getBoundingClientRect();
					if (r.top <= y + 2 && r.bottom > y + 2 && r.height < vh * 0.45 && r.width > vw * 0.5) { found = r.bottom; }
				});
			});
			if (!found || found <= y) { break; }
			y = found;
		}
		var h = Math.max(0, Math.round(y - start));
		if (h !== headerH) {
			headerH = h;
			document.documentElement.style.setProperty('--om-header-h', h + 'px');
			document.documentElement.classList.toggle('om-fixed-header', h > 0);
		}
		// The sticky sidebar: below the header and the slim toolbar.
		$('.om-catalog-wrap').each(function () {
			var tools = this.querySelector('.om-sticky-tools');
			var th = tools && vw >= 768 && !tools.hidden && window.getComputedStyle(tools).display !== 'none' ? tools.offsetHeight : 0;
			var offset = h || th ? (h + th + 16) + 'px' : '';
			if (this._omStickyOffset !== offset) {
				this._omStickyOffset = offset;
				if (offset) { this.style.setProperty('--om-sticky-offset', offset); } else { this.style.removeProperty('--om-sticky-offset'); }
			}
		});
	}

	function updateStickyTools() {
		stickyToolsTick = false;
		measureHeader();
		updateStickyToolsShown();
		// Again, now the toolbar's state is known (the sidebar sits below it).
		measureHeader();
	}

	function updateStickyToolsShown() {
		$('.om-sticky-tools').each(function () {
			var bar = this;
			var $wrap = $(bar).closest('.om-catalog-wrap');
			var anchor = $wrap.find('.om-catalog-toolbar, .om-search').not('.om-sticky-tools *').last()[0] || $wrap.find('.om-catalog-grid')[0];
			if (!anchor) { return; }
			var top = parseFloat(window.getComputedStyle(bar).top) || 0;
			var a = anchor.getBoundingClientRect();
			var w = $wrap[0].getBoundingClientRect();
			var show = a.bottom < top && w.bottom > top + 160 && !$('html').hasClass('om-sheet-open');
			if (show === bar.classList.contains('is-shown')) { return; }
			bar.hidden = false;
			bar.classList.toggle('is-shown', show);
			if (show) { bar.removeAttribute('inert'); bar.removeAttribute('aria-hidden'); } else { bar.setAttribute('inert', ''); bar.setAttribute('aria-hidden', 'true'); }
		});
	}

	function queueStickyTools() {
		if (!stickyToolsTick) { stickyToolsTick = true; window.requestAnimationFrame(updateStickyTools); }
	}

	window.addEventListener('scroll', queueStickyTools, { passive: true });
	window.addEventListener('resize', queueStickyTools);

	/* ---------- The site's own menu: our floating pieces step aside ---------- */

	// Open-menu signals from Elementor (nav menu, pop-ups) and common themes.
	var MENU_OPEN = [
		'.elementor-menu-toggle.elementor-active',
		'.elementor-popup-modal',
		'body.menu-open', 'body.mobile-menu-open', 'body.nav-open', 'body.navigation-open',
		'body.off-canvas-open', 'body.offcanvas-open', 'body.is-menu-open', 'body.showing-menu',
		'body.ast-main-header-nav-open', 'body.ast-mobile-popup-open', 'body.hfe-nav-menu-open',
		'html.menu-open', 'html.has-menu-open', 'html.nav-open'
	].join(',');
	var MENU_MINE = '.om-catalog-wrap, .om-product-wrap, .om-builder, .om-diamonds, .om-ai, .om-quick-view, ' + OWN_LAYERS;
	var menuTick = false;

	function siteMenuOpen() {
		var open = false;
		$(MENU_OPEN).each(function () {
			if (!this.closest(MENU_MINE) && (this === document.body || this === document.documentElement || this.getClientRects().length)) { open = true; return false; }
		});
		if (!open) {
			// Any menu button in the header that says it is expanded.
			$('[aria-expanded="true"]').each(function () {
				if (this.closest(MENU_MINE) || !this.closest('header, nav, .elementor-location-header, [class*="header"], [class*="navigation"], [class*="menu"]')) { return; }
				// (A header button: near the top of the screen, not a footer menu.)
				var r = this.getClientRects().length ? this.getBoundingClientRect() : null;
				if (r && r.top < window.innerHeight * 0.5) { open = true; return false; }
			});
		}
		if (!open && cfg.menuSelector) {
			try {
				$(cfg.menuSelector).each(function () {
					if (this.getClientRects().length) { open = true; return false; }
				});
			} catch (err) { /* not a valid selector */ }
		}
		return open;
	}

	function syncSiteMenu() {
		menuTick = false;
		var open = siteMenuOpen();
		if (open !== document.documentElement.classList.contains('om-site-menu-open')) {
			document.documentElement.classList.toggle('om-site-menu-open', open);
		}
	}

	function queueSiteMenu() {
		if (!menuTick) { menuTick = true; window.requestAnimationFrame(syncSiteMenu); }
	}

	// Menus open on a tap or a key, sometimes after an animation.
	document.addEventListener('click', function () { queueSiteMenu(); setTimeout(queueSiteMenu, 350); }, true);
	document.addEventListener('keyup', queueSiteMenu, true);
	$(function () {
		if (window.MutationObserver && document.body) {
			new MutationObserver(queueSiteMenu).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'aria-expanded'] });
			new MutationObserver(queueSiteMenu).observe(document.body, { attributes: true, attributeFilter: ['class'] });
		}
		queueSiteMenu();
	});

	function scrollToWrap($wrap, then) {
		var bar = $wrap.find('.om-sticky-tools')[0];
		var offset = bar ? parseFloat(window.getComputedStyle(bar).top) || 0 : 0;
		window.scrollTo({ top: Math.max(0, $wrap.offset().top - offset - 16), behavior: reduceMotion ? 'auto' : 'smooth' });
		if (then) { setTimeout(then, reduceMotion ? 0 : 450); }
	}

	$(document).on('click', '.om-st-filters', function () {
		var $wrap = $(this).closest('.om-catalog-wrap');
		var panel = $wrap.find('.om-filter-panel')[0];
		// Phones: the filters are a bottom sheet — open it right here.
		if (panel && isSheet($wrap)) { panel.open = true; return; }
		scrollToWrap($wrap, function () {
			var first = $wrap.find('.om-filter-sidebar a, .om-filter-bar a, .om-filter-dropdowns select').first()[0];
			if (first) { first.focus({ preventScroll: true }); }
		});
	});

	$(document).on('click', '.om-st-search', function () {
		var $wrap = $(this).closest('.om-catalog-wrap');
		scrollToWrap($wrap, function () { $wrap.find('.om-search-input').first().trigger('focus'); });
	});

	$(document).on('click', '.om-st-top', function () {
		var $wrap = $(this).closest('.om-catalog-wrap');
		scrollToWrap($wrap, function () { var c = $wrap.find('a.om-card')[0]; if (c) { c.focus({ preventScroll: true }); } });
	});

	/* ---------- Grid size on phones (Refined) ---------- */

	var GRID_KEY = 'om_grid_size';

	function applyGridSize(root) {
		var pref = '';
		try { pref = window.localStorage.getItem(GRID_KEY) || ''; } catch (err) { pref = ''; }
		$(root || document).find('.om-grid-size').each(function () {
			var $wrap = $(this).closest('.om-catalog-wrap');
			var $grid = $wrap.find('.om-catalog-grid').first();
			if (pref) { $grid.toggleClass('is-one-per-row', pref === '1').toggleClass('is-two-per-row', pref === '2'); }
			// Which is showing now (the widget's phone columns, or the choice).
			var cols = pref || (($grid[0] && window.getComputedStyle($grid[0]).gridTemplateColumns.split(' ').length === 1) ? '1' : '2');
			$(this).find('.om-grid-size-btn').each(function () {
				this.setAttribute('aria-pressed', this.getAttribute('data-om-grid') === cols ? 'true' : 'false');
			});
		});
	}

	$(document).on('click', '.om-grid-size-btn', function () {
		var value = this.getAttribute('data-om-grid');
		try { window.localStorage.setItem(GRID_KEY, value); } catch (err) { /* this page only */ }
		var $grid = $(this).closest('.om-catalog-wrap').find('.om-catalog-grid').first();
		$grid.toggleClass('is-one-per-row', value === '1').toggleClass('is-two-per-row', value === '2');
		applyGridSize($(this).closest('.om-catalog-wrap'));
	});

	/* ---------- "Ask our jeweller": the AI assistant chat ----------
	   The conversation lives in sessionStorage, so it follows the visitor
	   from page to page. The server finds real designs and the AI writes
	   the reply; "Talk to our team" is the site's inquiry form, with the
	   chat attached. */

	var AI = cfg.assistant;
	var AI_KEY = 'om_ai_chat';
	var ai = null;

	function aiRead() {
		try { var st = JSON.parse(window.sessionStorage.getItem(AI_KEY) || 'null'); if (st && Array.isArray(st.msgs)) { return st; } } catch (err) { /* fresh */ }
		return { open: false, msgs: [] };
	}
	function aiWrite(st) {
		try { window.sessionStorage.setItem(AI_KEY, JSON.stringify({ open: !!st.open, msgs: st.msgs.slice(-30) })); } catch (err) { /* this page only */ }
	}

	// Safe, light formatting: paragraphs, **bold**, simple lists.
	function aiFormat(text) {
		var esc = function (s) { return $('<div></div>').text(s).html(); };
		var html = '';
		var list = null;
		String(text || '').split(/\n+/).forEach(function (line) {
			var item = /^\s*(?:[-*•]|\d+[.)])\s+(.*)$/.exec(line);
			var body = esc(item ? item[1] : line).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
			if (item) {
				if (!list) { list = []; }
				list.push('<li>' + body + '</li>');
				return;
			}
			if (list) { html += '<ul>' + list.join('') + '</ul>'; list = null; }
			if ($.trim(line)) { html += '<p>' + body + '</p>'; }
		});
		if (list) { html += '<ul>' + list.join('') + '</ul>'; }
		return html;
	}

	function aiCard(d) {
		var $card = $('<div class="om-ai-card"></div>');
		var $a = $('<a class="om-ai-card-link"></a>').attr('href', d.u);
		$a.append($('<span class="om-ai-card-img"></span>').append(d.i ? $('<img alt="" loading="lazy" />').attr('src', d.i) : ''));
		$a.append($('<span class="om-ai-card-title"></span>').text(d.t), $('<span class="om-ai-card-meta"></span>').text(d.v ? d.v : t('styleN', 'Style %s').replace('%s', d.s)));
		$card.append($a);
		// A live diamond: opens the ring builder with it; not a "saved" design.
		if (d.k === 'd') {
			$card.addClass('om-ai-card--diamond');
			if (!d.i) { $a.find('.om-ai-card-img').addClass('is-stone'); }
			return $card;
		}
		if (cfg.saved) {
			$card.append($('<button type="button" class="om-save-toggle om-save-toggle--ai" aria-pressed="false"><span class="om-save-icon" aria-hidden="true"></span></button>')
				.attr({ 'data-om-save': JSON.stringify({ l: d.l, s: d.s, t: d.t, i: d.i, u: d.u }), 'aria-label': t('saveThis', 'Save %s').replace('%s', d.t) }));
		}
		return $card;
	}

	function aiRenderMsg(m) {
		var $row = $('<div class="om-ai-msg"></div>').addClass(m.r === 'u' ? 'is-user' : 'is-ai');
		if (m.e) { $row.addClass('is-error'); }
		var $bubble = $('<div class="om-ai-bubble"></div>');
		if (m.r === 'u') { $bubble.text(m.t); } else { $bubble.html(aiFormat(m.t)); }
		$row.append($('<span class="om-visually-hidden"></span>').text((m.r === 'u' ? t('aiYou', 'You') : AI.name) + ': '), $bubble);
		if (m.d && m.d.length) {
			var $cards = $('<div class="om-ai-cards"></div>');
			m.d.forEach(function (d) { $cards.append(aiCard(d)); });
			$row.append($cards);
		}
		// Pages of the shop's own website it answered from.
		if (m.p && m.p.length) {
			var $pages = $('<div class="om-ai-pages"></div>');
			m.p.forEach(function (pg) {
				if (!pg || !pg.u) { return; }
				$pages.append($('<a class="om-ai-page"></a>').attr('href', pg.u).append($('<span class="om-ai-page-icon" aria-hidden="true"></span>'), $('<span class="om-ai-page-text"></span>').text(pg.t)));
			});
			$row.append($pages);
		}
		if (m.dbg) { $row.append($('<p class="om-ai-debug"></p>').text(m.dbg)); }
		if (m.team) {
			$row.append($('<button type="button" class="om-ai-team-btn"></button>').text(t('aiTeam', 'Talk to our team')));
		}
		return $row;
	}

	function aiRender(scroll) {
		var st = aiRead();
		var $log = ai.find('.om-ai-log').empty();
		$log.append(aiRenderMsg({ r: 'a', t: AI.greeting }));
		st.msgs.forEach(function (m) { $log.append(aiRenderMsg(m)); });
		ai.find('.om-ai-chips').prop('hidden', st.msgs.length > 0);
		syncSaved();
		if (scroll !== false) { aiScroll(); }
	}

	function aiScroll() {
		var el = ai.find('.om-ai-log')[0];
		if (el) { el.scrollTop = el.scrollHeight; }
	}

	// The button's place: the chosen corner, lifted only while a bar
	// (compare tray, phone filter pill, sticky product bar, ring builder
	// bar, saved button) actually sits under it.
	var aiPlaceTick = false;
	function aiPlace() {
		aiPlaceTick = false;
		if (!ai) { return; }
		var base = +AI.y || 20;
		var btn = ai.find('.om-ai-launch')[0];
		var lift = 0;
		// (offsetParent is always null for a fixed element, so check its box.)
		if (btn && btn.getClientRects().length) {
			var r = btn.getBoundingClientRect();
			var vh = window.innerHeight;
			$('.om-compare-tray:not([hidden]), .om-sticky-bar:not([hidden]), .om-rb-bar, .om-sticky-tools.is-shown, .om-saved-float:not([hidden]), .om-toast.is-in').each(function () {
				var b = this.getBoundingClientRect();
				if (!b.width || !b.height || b.top >= vh || b.bottom < vh - 220) { return; }
				if (b.right <= r.left || b.left >= r.right) { return; }
				lift = Math.max(lift, vh - b.top + 12 - base);
			});
		}
		ai[0].style.setProperty('--om-ai-y', (base + Math.max(0, Math.round(lift))) + 'px');
	}
	function aiQueuePlace() {
		if (!aiPlaceTick) { aiPlaceTick = true; window.requestAnimationFrame(aiPlace); }
	}
	window.addEventListener('scroll', aiQueuePlace, { passive: true });
	window.addEventListener('resize', aiQueuePlace);

	function aiBuild() {
		ai = $('<div class="om-ai' + (cfg.refined ? ' om-refined' : '') + (AI.side === 'left' ? ' om-ai--left' : '') + '"></div>');
		var $launch = $('<button type="button" class="om-ai-launch" aria-haspopup="dialog" aria-expanded="false"><span class="om-ai-spark" aria-hidden="true"></span><span class="om-ai-launch-text"></span></button>');
		$launch.find('.om-ai-launch-text').text(AI.launcher);
		var $panel = $('<div class="om-ai-panel" role="dialog" aria-modal="false" aria-labelledby="om-ai-title" hidden>'
			+ '<div class="om-ai-head"><span class="om-ai-avatar" aria-hidden="true"><span class="om-ai-spark"></span></span><div class="om-ai-head-text"><h2 class="om-ai-title" id="om-ai-title"></h2><p class="om-ai-sub"></p></div>'
			+ '<button type="button" class="om-ai-icon-btn om-ai-restart"><span aria-hidden="true">&#8635;</span></button><button type="button" class="om-ai-icon-btn om-ai-close"><span aria-hidden="true">&times;</span></button></div>'
			+ '<div class="om-ai-log" role="log" aria-live="polite"></div>'
			+ '<div class="om-ai-chips"></div>'
			+ '<div class="om-ai-team" hidden><button type="button" class="om-ai-back"></button><div class="om-ai-team-form"></div></div>'
			+ '<form class="om-ai-input" novalidate><label class="om-visually-hidden" for="om-ai-text"></label><textarea id="om-ai-text" rows="1" maxlength="600"></textarea><button type="submit" class="om-ai-send"><span class="om-ai-send-icon" aria-hidden="true"></span></button></form>'
			+ '<p class="om-ai-note"></p></div>');
		$panel.find('.om-ai-title').text(AI.name);
		$panel.find('.om-ai-sub').text(AI.sub || t('aiSubtitle', 'Usually replies in seconds'));
		// Branding: the shop's logo (round) in the header and, if chosen, the button.
		if (AI.logo) {
			$panel.find('.om-ai-avatar').addClass('has-logo').empty().append($('<img alt="" />').attr('src', AI.logo));
			if (AI.icon === 'logo') {
				$launch.addClass('has-logo').find('.om-ai-spark').replaceWith($('<span class="om-ai-launch-logo" aria-hidden="true"></span>').append($('<img alt="" />').attr('src', AI.logo)));
			}
		}
		$panel.find('.om-ai-restart').attr({ 'aria-label': t('aiRestart', 'New chat'), title: t('aiRestart', 'New chat') });
		$panel.find('.om-ai-close').attr('aria-label', t('aiClose', 'Close chat'));
		$panel.find('.om-ai-back').text('← ' + t('aiBack', 'Back to chat'));
		$panel.find('label[for="om-ai-text"]').text(t('aiPlaceholder', 'Ask about rings, diamonds, sizes…'));
		$panel.find('#om-ai-text').attr('placeholder', t('aiPlaceholder', 'Ask about rings, diamonds, sizes…'));
		$panel.find('.om-ai-send').attr('aria-label', t('aiSend', 'Send'));
		$panel.find('.om-ai-note').text(AI.note);
		(AI.chips || []).forEach(function (c) { $panel.find('.om-ai-chips').append($('<button type="button" class="om-ai-chip"></button>').text(c)); });
		var tpl = document.getElementById('om-ai-team-form');
		if (tpl && tpl.content) { $panel.find('.om-ai-team-form').append(document.importNode(tpl.content, true)); }
		ai.append($launch, $panel).appendTo(document.body);
		ai[0].style.setProperty('--om-ai-x', (AI.x === undefined ? 20 : +AI.x) + 'px');
		if (/^#[0-9a-f]{3,6}$/i.test(AI.color || '')) { ai[0].style.setProperty('--om-ai-ink', AI.color); }
		if (/^#[0-9a-f]{3,6}$/i.test(AI.accent || '')) { ai[0].style.setProperty('--om-ai-accent', AI.accent); }
		aiPlace();
		// Bars come and go (compare tray, toasts): follow them.
		if (window.MutationObserver) {
			new MutationObserver(aiQueuePlace).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
			new MutationObserver(aiQueuePlace).observe(document.body, { childList: true });
		}
		setInterval(aiQueuePlace, 1500);
	}

	function aiOpen(focus) {
		if (!ai) { return; }
		var st = aiRead();
		aiRender();
		ai.addClass('is-open');
		ai.find('.om-ai-panel').prop('hidden', false);
		ai.find('.om-ai-launch').attr('aria-expanded', 'true');
		if (!st.open) { track('assistant_open', { page_type: $('.om-product-wrap').length ? 'product' : ($('.om-builder').length ? 'ring_builder' : 'catalog') }, ['trackCustom', 'AssistantOpen', {}]); }
		st.open = true;
		aiWrite(st);
		if (focus !== false) { setTimeout(function () { ai.find('#om-ai-text').trigger('focus'); }, 30); }
	}

	function aiClose() {
		var st = aiRead();
		st.open = false;
		aiWrite(st);
		ai.removeClass('is-open');
		ai.find('.om-ai-panel').prop('hidden', true);
		ai.find('.om-ai-launch').attr('aria-expanded', 'false');
		if (aiOpener && document.contains(aiOpener) && aiOpener.getClientRects().length) { aiOpener.focus(); } else { ai.find('.om-ai-launch').trigger('focus'); }
	}

	// Docked: the page has its own button for the chat (ring builder bar or
	// review), so the floating one stays out of the way.
	function aiDock() {
		if (!ai) { return; }
		var $own = $('[data-om-ai-open]');
		$own.prop('hidden', false);
		ai.toggleClass('om-ai--docked', $own.length > 0);
	}

	// Scrolled down the page: the floating button shrinks to its icon so it
	// covers less (it opens up again on hover / focus).
	var aiMiniTick = false;
	function aiMini() {
		aiMiniTick = false;
		if (!ai || !AI.mini) { return; }
		ai.toggleClass('is-mini', (window.scrollY || window.pageYOffset || 0) > 240);
	}
	window.addEventListener('scroll', function () {
		if (!aiMiniTick) { aiMiniTick = true; window.requestAnimationFrame(aiMini); }
	}, { passive: true });

	function aiTeamView(show) {
		ai.find('.om-ai-team').prop('hidden', !show);
		ai.find('.om-ai-log, .om-ai-chips, .om-ai-input').toggleClass('is-away', !!show);
		if (show) {
			var lines = [];
			aiRead().msgs.forEach(function (m) { if (!m.e) { lines.push((m.r === 'u' ? 'Visitor' : 'Assistant') + ': ' + m.t + (m.d && m.d.length ? ' [' + m.d.map(function (d) { return d.t + ' (' + d.s + ')'; }).join('; ') + ']' : '')); } });
			var chat = lines.join('\n');
			if (chat.length > 3800) { chat = '…' + chat.slice(-3800); }
			var $form = ai.find('.om-ai-team .om-inquiry-form');
			$form.find('[name="om_ctx_chat"]').val(chat);
			$form.find('[name="om_ctx_url"]').val(window.location.href);
			var first = $form.find('input:not([type=hidden]), textarea, select').filter(function () { return !$(this).closest('.om-hp').length && $(this).is(':visible'); }).first();
			setTimeout(function () { (first[0] || ai.find('.om-ai-back')[0]).focus(); }, 30);
		} else {
			ai.find('#om-ai-text').trigger('focus');
		}
	}

	function aiSend(text) {
		text = $.trim(text || '');
		if (!text || ai.hasClass('is-busy')) { return; }
		var st = aiRead();
		var history = st.msgs.filter(function (m) { return !m.e; }).slice(-10).map(function (m) { return { r: m.r, t: m.t }; });
		st.msgs.push({ r: 'u', t: text });
		aiWrite(st);
		aiRender();
		ai.find('#om-ai-text').val('').css('height', '');
		ai.addClass('is-busy');
		var $typing = $('<div class="om-ai-msg is-ai is-typing"><div class="om-ai-bubble"><span class="om-ai-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="om-visually-hidden"></span></div></div>');
		$typing.find('.om-visually-hidden').text(t('aiThinking', 'Thinking…'));
		ai.find('.om-ai-log').append($typing);
		aiScroll();
		var wrap = $('.om-product-wrap').not('.om-quick-view .om-product-wrap').first();
		var qvWrap = $('.om-quick-view[open] .om-product-wrap').first();
		var here = qvWrap.length ? qvWrap : wrap;
		track('assistant_message', { length: text.length }, ['trackCustom', 'AssistantMessage', {}]);
		$.ajax({
			url: cfg.ajaxUrl, method: 'POST', timeout: 70000,
			data: { action: 'om_assistant', message: text, history: JSON.stringify(history), line: here.attr('data-line') || '', style: here.attr('data-style') || '' }
		}).done(function (r) {
			var st2 = aiRead();
			if (r && r.success) {
				st2.msgs.push({ r: 'a', t: r.data.reply, d: r.data.designs || [], p: r.data.pages || [], team: !!r.data.team, dbg: r.data.debug || '' });
			} else {
				st2.msgs.push({ r: 'a', t: (r && r.data && r.data.message) || t('aiError', 'Sorry — that didn’t go through. Please try again.'), e: true, team: true });
			}
			aiWrite(st2);
		}).fail(function () {
			var st2 = aiRead();
			st2.msgs.push({ r: 'a', t: t('aiError', 'Sorry — that didn’t go through. Please try again.'), e: true, team: true });
			aiWrite(st2);
		}).always(function () {
			ai.removeClass('is-busy');
			aiRender();
		});
	}

	$(document).on('click', '.om-ai-launch', function () { aiOpener = null; aiOpen(); });
	// The ring builder's own "Ask our jeweller" button (in its bar/review).
	var aiOpener = null;
	$(document).on('click', '[data-om-ai-open]', function () {
		if (!ai) { return; }
		aiOpener = this;
		aiOpen();
	});
	$(document).on('click', '.om-ai-close', aiClose);
	$(document).on('click', '.om-ai-restart', function () {
		var st = aiRead();
		st.msgs = [];
		aiWrite(st);
		aiTeamView(false);
		aiRender();
	});
	$(document).on('click', '.om-ai-chip', function () { aiSend($(this).text()); });
	$(document).on('click', '.om-ai-team-btn', function () { aiTeamView(true); });
	$(document).on('click', '.om-ai-back', function () { aiTeamView(false); });
	$(document).on('submit', '.om-ai-input', function (e) { e.preventDefault(); aiSend($(this).find('textarea').val()); });
	$(document).on('keydown', '#om-ai-text', function (e) {
		if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); aiSend(this.value); }
	});
	$(document).on('input', '#om-ai-text', function () {
		this.style.height = '';
		this.style.height = Math.min(this.scrollHeight, 120) + 'px';
	});
	// Escape closes the chat (unless another pop-up is on top of it).
	$(document).on('keydown', function (e) {
		if (e.key !== 'Escape' || !ai || !ai.hasClass('is-open') || $('dialog[open]').length) { return; }
		var inChat = $(e.target).closest('.om-ai-panel').length;
		if (inChat || e.target === document.body || !e.target.isConnected) { aiClose(); }
	});
	// Any link to #om-ai (e.g. a menu item or a button) opens the chat.
	$(document).on('click', 'a[href$="#om-ai"]', function (e) {
		if (!ai) { return; }
		e.preventDefault();
		aiOpen();
	});

	$(function () {
		if (!AI || !cfg.ajaxUrl || trackOff() || !document.body) { return; }
		aiBuild();
		aiDock();
		aiMini();
		if (aiRead().open || window.location.hash === '#om-ai') { aiOpen(false); }
	});

	/* ---------- Where the visitor came from (for the CRM) ---------- */

	// First touch: campaign tags and ad click IDs when the visit came from
	// one, else the referring site. Kept 90 days in a first-party cookie;
	// sent with leads only (Settings › CRM), never elsewhere.
	(function rememberSource() {
		if (!cfg.crm) { return; }
		try {
			var has = /(?:^|;\s*)om_src=/.test(document.cookie);
			var q = new URLSearchParams(window.location.search);
			var src = {};
			['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'msclkid'].forEach(function (k) {
				var v = q.get(k);
				if (v) { src[k] = v.slice(0, 120); }
			});
			var tagged = Object.keys(src).length > 0;
			var ref = document.referrer && document.referrer.indexOf(window.location.host) === -1 ? document.referrer.slice(0, 200) : '';
			// A campaign visit always wins; otherwise only the first visit counts.
			if (!tagged && (has || !ref)) { return; }
			if (ref) { src.ref = ref; }
			src.landing = window.location.pathname.slice(0, 120);
			document.cookie = 'om_src=' + encodeURIComponent(JSON.stringify(src)) + '; path=/; max-age=' + (90 * 86400) + '; SameSite=Lax' + (window.location.protocol === 'https:' ? '; Secure' : '');
		} catch (err) { /* old browser */ }
	})();

	/* ---------- Diamonds: compare side by side ---------- */

	var DCMP_KEY = 'om_dcmp';
	var DCMP_MAX = 4;
	function readDcmp() {
		try { var v = JSON.parse(window.sessionStorage.getItem(DCMP_KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (err) { return []; }
	}
	function writeDcmp(list) {
		try { window.sessionStorage.setItem(DCMP_KEY, JSON.stringify(list.slice(0, DCMP_MAX))); } catch (err) { /* private mode */ }
	}

	// Buttons pressed for the diamonds picked; a strip over the results.
	function syncDcmp() {
		var list = readDcmp();
		var lots = list.map(function (d) { return d.lot; });
		$('.om-dcmp-toggle').each(function () {
			var d;
			try { d = JSON.parse(this.getAttribute('data-om-dcmp')); } catch (err) { return; }
			$(this).attr('aria-pressed', lots.indexOf(d.lot) > -1 ? 'true' : 'false');
		});
		$('.om-diamonds').each(function () {
			var $wrap = $(this);
			if (!$wrap.find('.om-dcmp-toggle').length && !list.length) { return; }
			var $strip = $wrap.find('.om-dcmp-strip');
			if (!$strip.length) {
				$strip = $('<div class="om-dcmp-strip" role="region"><span class="om-dcmp-count" aria-live="polite"></span><button type="button" class="om-dcmp-open"></button><button type="button" class="om-dcmp-clear"></button></div>');
				$strip.attr('aria-label', t('dcmpTitle', 'Compare diamonds'));
				$strip.find('.om-dcmp-open').text(t('dcmpOpen', 'Compare side by side'));
				$strip.find('.om-dcmp-clear').text(t('dcmpClear', 'Clear'));
				var $results = $wrap.find('.om-diamond-results');
				if ($results.length) { $results.prepend($strip); } else { return; }
			}
			$strip.prop('hidden', !list.length);
			$strip.find('.om-dcmp-count').text(list.length === 1 ? t('dcmpOne', '1 diamond picked — pick another to compare') : t('dcmpN', '%d diamonds to compare').replace('%d', list.length));
			$strip.find('.om-dcmp-open').prop('disabled', list.length < 2);
		});
	}

	$(document).on('click', '.om-dcmp-toggle', function () {
		var d;
		try { d = JSON.parse(this.getAttribute('data-om-dcmp')); } catch (err) { return; }
		var list = readDcmp().filter(function (x) { return x && x.lot !== d.lot; });
		var adding = $(this).attr('aria-pressed') !== 'true';
		if (adding) {
			if (list.length >= DCMP_MAX) {
				showToast(t('dcmpFull', 'You can compare up to 4 diamonds. Remove one first.'));
				return;
			}
			list.push(d);
			track('diamond_compare_add', { item_id: d.lot }, null);
		}
		writeDcmp(list);
		syncDcmp();
	});

	$(document).on('click', '.om-dcmp-clear', function () {
		writeDcmp([]);
		syncDcmp();
	});

	var dcmpDialog = null;
	function renderDcmp() {
		var list = readDcmp();
		var $table = dcmpDialog.find('.om-dcmp-table').empty();
		var labels = [];
		list.forEach(function (d) { Object.keys(d.rows || {}).forEach(function (k) { if (labels.indexOf(k) < 0) { labels.push(k); } }); });
		var $head = $('<tr><th scope="col"><span class="om-visually-hidden"></span></th></tr>');
		$head.find('.om-visually-hidden').text(t('dcmpDiamond', 'Diamond'));
		list.forEach(function (d) {
			var $th = $('<th scope="col"><div class="om-dcmp-media"></div><p class="om-dcmp-name"></p><button type="button" class="om-dcmp-remove"></button></th>');
			if (d.img) { $th.find('.om-dcmp-media').append($('<img alt="">').attr('src', d.img)); }
			else {
				var $icon = $('.om-dt-shape').filter(function () { return $.trim($(this).text()) === d.shape; }).first().find('svg').first().clone();
				$th.find('.om-dcmp-media').append($icon);
			}
			$th.find('.om-dcmp-name').text(d.title);
			$th.find('.om-dcmp-remove').attr('data-lot', d.lot).text(t('dcmpRemove', 'Remove'));
			$head.append($th);
		});
		$table.append($('<thead></thead>').append($head));
		var $body = $('<tbody></tbody>');
		labels.forEach(function (label) {
			var $tr = $('<tr><th scope="row"></th></tr>');
			$tr.find('th').text(label);
			var values = list.map(function (d) { return (d.rows || {})[label] || '—'; });
			var same = values.every(function (v) { return v === values[0]; });
			values.forEach(function (v) { $tr.append($('<td></td>').text(v)); });
			$tr.toggleClass('is-same', same && list.length > 1);
			$body.append($tr);
		});
		var $act = $('<tr class="om-dcmp-actions"><th scope="row"><span class="om-visually-hidden"></span></th></tr>');
		$act.find('.om-visually-hidden').text(t('dcmpChoose', 'Choose'));
		list.forEach(function (d) {
			var $td = $('<td></td>');
			if (d.select) { $td.append($('<a class="om-dcmp-select"></a>').attr('href', d.select).text(t('dcmpSelect', 'Select this diamond'))); }
			$act.append($td);
		});
		$body.append($act);
		$table.append($body);
		dcmpDialog.find('.om-dcmp-diff').prop('hidden', list.length < 2);
	}

	$(document).on('click', '.om-dcmp-open', function () {
		if (!dcmpDialog) {
			dcmpDialog = $('<dialog class="om-dcmp-dialog" aria-labelledby="om-dcmp-title"><div class="om-dcmp-inner"><div class="om-dcmp-top"><h2 class="om-dcmp-title" id="om-dcmp-title"></h2><label class="om-dcmp-diff"><input type="checkbox" /> <span></span></label><button type="button" class="om-dcmp-close">&times;</button></div><div class="om-dcmp-scroll"><table class="om-dcmp-table"></table></div></div></dialog>').appendTo(document.body);
			dcmpDialog.find('.om-dcmp-title').text(t('dcmpTitle', 'Compare diamonds'));
			dcmpDialog.find('.om-dcmp-diff span').text(t('dcmpDiff', 'Only show differences'));
			dcmpDialog.find('.om-dcmp-close').attr('aria-label', t('aiClose', 'Close'));
			dcmpDialog.on('click', function (e) { if (e.target === this) { this.close(); } });
			dcmpDialog.on('click', '.om-dcmp-close', function () { dcmpDialog[0].close(); });
			dcmpDialog.on('close', function () { $('html').removeClass('om-dialog-open'); if (this.omOpener && document.contains(this.omOpener)) { this.omOpener.focus(); } });
			dcmpDialog.on('change', '.om-dcmp-diff input', function () { dcmpDialog.toggleClass('is-diff', this.checked); });
		}
		dcmpDialog[0].omOpener = this;
		renderDcmp();
		if (dcmpDialog[0].showModal) { dcmpDialog[0].showModal(); } else { dcmpDialog.attr('open', ''); }
		$('html').addClass('om-dialog-open');
		track('diamond_compare_view', { count: readDcmp().length }, null);
	});

	$(document).on('click', '.om-dcmp-remove', function () {
		var lot = $(this).attr('data-lot');
		writeDcmp(readDcmp().filter(function (d) { return d.lot !== lot; }));
		syncDcmp();
		if (readDcmp().length) { renderDcmp(); } else { dcmpDialog[0].close(); }
	});

	/* ---------- Boot ---------- */

	function initBlock(root) {
		initTouchPreviews(root);
		syncPanels(root);
		loadCardPrices(root);
		markCachedImages(root);
		$(root).find('.om-catalog-grid').addClass('om-fade-in');
		observeInfinite(root);
		syncCompare();
		syncDcmp();
		syncSaved();
		queueStickyTools();
		applyGridSize(root);
	}

	// Record a product shown in the quick view as recently viewed too.
	function rememberFrom($root) {
		var el = $root.find('.om-product-wrap[data-om-recent-item]')[0];
		if (!el) { return; }
		try {
			var item = JSON.parse(el.getAttribute('data-om-recent-item'));
			var list = readRecent().filter(function (x) { return x && x.s !== item.s; });
			list.unshift(item);
			window.localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 20)));
		} catch (err) { /* ignore */ }
	}

	// Back/forward after an in-place update: reload so the server renders
	// the state the URL describes.
	window.addEventListener('popstate', function () {
		if (omPushed) {
			window.location.reload();
		}
	});

	$(function () {
		initBlock(document);
		if ($('.om-catalog-wrap').length) { trackSearch(window.location.href); }
		$('.om-builder').each(function () {
			var m = /om-builder--([a-z]+)/.exec(this.className);
			if (m) { track('ring_builder_step', { step: m[1], start_with: $(this).hasClass('om-builder--diamond-first') ? 'diamond' : 'setting' }, ['trackCustom', 'RingBuilderStep', { step: m[1] }]); }
		});
		rememberProduct();
		renderRecent(document);
		fillCustomForms(document);
		initAutoplay(document);
		initStickyBar();
		syncReelsSeen();
		initBackLink();
		restoreListingScroll();
		$('.om-product-gallery.is-video-first').each(function () { decorateMainVideo($(this)); });
		$('.om-product-gallery').each(function () { updateMediaCount($(this)); });
		initReveal(document);
		initTouchPreviews(document);
		if (mobileQuery) {
			var onChange = function () { syncPanels(document); };
			if (mobileQuery.addEventListener) {
				mobileQuery.addEventListener('change', onChange);
			} else if (mobileQuery.addListener) {
				mobileQuery.addListener(onChange);
			}
		}
	});

	// Elementor editor preview: widgets render after page load.
	$(window).on('elementor/frontend/init', function () {
		if (window.elementorFrontend && window.elementorFrontend.hooks) {
			window.elementorFrontend.hooks.addAction('frontend/element_ready/om_catalog_widget.default', function ($scope) {
				initBlock($scope);
			});
		}
	});

})(jQuery);
