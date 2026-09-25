(function ($) {
	'use strict';

	var cfg = window.omCatalog || {};
	document.documentElement.classList.add('om-js');
	var i18n = cfg.i18n || {};

	function t(key, fallback) {
		return i18n[key] || fallback;
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
		var hash = href.slice(href.indexOf('#om-inquiry'));
		var $scope = $(this).closest('.om-product-wrap');
		var $box = ($scope.length ? $scope : $(document)).find('.om-product-inquiry, .om-inquiry').not('.om-end-dialog .om-inquiry').first();
		if (!$box.length) { return; } // Nothing here: let the link work as usual.
		e.preventDefault();
		var match = /[?&]subject=([^&]*)/.exec(hash);
		var subject = match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
		// "Ask about this set": carry the paired design into the form.
		var pair = /[?&]pair=([^&]*)/.exec(hash);
		if (pair) {
			setPair($box, decodeURIComponent(pair[1]), $(this).attr('data-om-pair-title') || '');
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
	});

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
					form.reset();
					setPair($form, '', '');
					$form.find('.om-field, .om-field-row, .om-inquiry-submit').prop('hidden', true);
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
		$(root || document).find('.om-filter-list--collapsible').addClass('is-collapsed');
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
		if ($(e.target).closest('.om-filter-panel-body, .om-filter-toggle').length) { return; }
		$('.om-cdesign-modern .om-filter-panel[open]').each(function () { this.open = false; });
		lockSheet(false);
	});

	$(document).on('click', '.om-filter-more-btn', function () {
		$(this).closest('.om-filter-list').removeClass('is-collapsed');
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
			}
			if (focusSearch) {
				var input = $fresh.find('.om-search-input')[0];
				if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
			}
			if (opts.scroll && $fresh[0] && $fresh[0].getBoundingClientRect().top < 0 && $fresh[0].scrollIntoView) {
				$fresh[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}).fail(function () {
			if (seq === blockSeq) { window.location.href = href; }
		});
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
		loadBlock($(this).closest('.om-catalog-wrap, .om-diamonds'), this.href, { scroll: isPagination });
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
				diamond: data.diamond, summary: data.summary
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
			var check = function () {
				ticking = false;
				var past = anchor.getBoundingClientRect().bottom < 0;
				if (past !== pastAnchor) {
					pastAnchor = past;
					update();
				}
			};
			window.addEventListener('scroll', function () {
				if (!ticking) {
					ticking = true;
					window.requestAnimationFrame(check);
				}
			}, { passive: true });
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
	var QV_VARS = ['--om-qv-modal-bg', '--om-qv-backdrop', '--om-qv-width', '--om-qv-radius', '--om-qv-pad', '--om-qv-close', '--om-radius', '--om-radius-lg', '--om-space'];

	function openQuickView(line, style, trigger) {
		if (!qv) {
			qv = $('<dialog class="om-quick-view" aria-label="' + t('quickView', 'Quick view') + '"><div class="om-qv-inner"><button type="button" class="om-qv-close" aria-label="' + t('close', 'Close') + '">&times;</button><div class="om-qv-body"></div></div></dialog>').appendTo(document.body);
			qv.on('click', function (e) { if (e.target === qv[0]) { closeQuickView(); } });
			qv.find('.om-qv-close').on('click', closeQuickView);
			qv[0].addEventListener('close', function () {
				$('html').removeClass('om-lb-open');
				if (qvReturn && qvReturn.focus) { qvReturn.focus(); }
			});
		}
		qvReturn = trigger;
		var computed = trigger && window.getComputedStyle ? window.getComputedStyle(trigger) : null;
		QV_VARS.forEach(function (name) {
			var value = computed ? computed.getPropertyValue(name).trim() : '';
			if (value) { qv[0].style.setProperty(name, value); } else { qv[0].style.removeProperty(name); }
		});
		var opts = {};
		try { opts = JSON.parse($(trigger).closest('[data-om-qv-opts]').attr('data-om-qv-opts') || '{}') || {}; } catch (err) { opts = {}; }
		var $body = qv.find('.om-qv-body').html('<div class="om-qv-loading"><span class="om-qv-skel om-qv-skel--img"></span><span class="om-qv-skel"></span><span class="om-qv-skel om-qv-skel--short"></span></div>');
		if (qv[0].showModal) { qv[0].showModal(); } else { qv.attr('open', ''); }
		$('html').addClass('om-lb-open');
		var data = { action: 'om_quick_view', line: line, style: style };
		if (typeof opts.parts === 'string') { data.parts = opts.parts; }
		if (opts.video) { data.video = opts.video; }
		if (opts.link) { data.link = opts.link; }
		$.post(cfg.ajaxUrl, data).done(function (response) {
			if (response && response.success && response.data.html) {
				$body.html(response.data.html);
				rememberFrom($body);
				$body.find('.om-product-gallery.is-video-first').each(function () { decorateMainVideo($(this)); });
			} else {
				$body.html($('<p class="om-error"></p>').text((response && response.data && response.data.message) || t('error', 'Something went wrong. Please try again.')));
			}
		}).fail(function () {
			$body.html($('<p class="om-error"></p>').text(t('error', 'Something went wrong. Please try again.')));
		});
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
			compareTray = $('<div class="om-compare-tray" role="region"></div>').attr('aria-label', t('compare', 'Compare')).appendTo(document.body);
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
		writeCompare(list);
		announce((at !== -1 ? t('compareRemoved', 'Removed from compare') : t('compareAdded', 'Added to compare')) + ' (' + list.length + '/4)');
	});

	$(document).on('click', '.om-compare-drop', function () {
		var key = this.getAttribute('data-om-key');
		writeCompare(readCompare().filter(function (x) { return x.l + '|' + x.s !== key; }));
	});

	$(document).on('click', '.om-compare-clear', function () { writeCompare([]); });

	function openCompare() {
		if (!compareDialog) {
			compareDialog = $('<dialog class="om-compare-dialog" aria-labelledby="om-compare-title"><div class="om-compare-inner"><div class="om-compare-head"><h2 class="om-compare-title" id="om-compare-title"></h2><button type="button" class="om-compare-close">&times;</button></div><div class="om-compare-body"></div></div></dialog>').appendTo(document.body);
			compareDialog.find('.om-compare-title').text(t('compare', 'Compare'));
			compareDialog.find('.om-compare-close').attr('aria-label', t('close', 'Close')).on('click', function () { compareDialog[0].close(); });
			compareDialog.on('click', function (e) { if (e.target === compareDialog[0]) { compareDialog[0].close(); } });
			compareDialog[0].addEventListener('close', function () { $('html').removeClass('om-lb-open'); });
		}
		var list = readCompare();
		var $body = compareDialog.find('.om-compare-body').html('<div class="om-qv-loading"><span class="om-qv-skel om-qv-skel--img"></span><span class="om-qv-skel"></span></div>');
		if (compareDialog[0].showModal && !compareDialog[0].open) { compareDialog[0].showModal(); }
		$('html').addClass('om-lb-open');
		$.post(cfg.ajaxUrl, { action: 'om_compare', items: list.map(function (x) { return { line: x.l, style: x.s }; }) }).done(function (response) {
			$body.html(response && response.success ? response.data.html : $('<p class="om-error"></p>').text((response && response.data && response.data.message) || t('error', 'Something went wrong. Please try again.')));
		}).fail(function () {
			$body.html($('<p class="om-error"></p>').text(t('error', 'Something went wrong. Please try again.')));
		});
	}

	$(document).on('click', '.om-compare-open', openCompare);
	$(document).on('click', '.om-compare-remove', function () {
		var key = this.getAttribute('data-om-line') + '|' + this.getAttribute('data-om-style');
		var list = readCompare().filter(function (x) { return x.l + '|' + x.s !== key; });
		writeCompare(list);
		if (list.length) { openCompare(); } else if (compareDialog) { compareDialog[0].close(); }
	});

	// Another tab changed the picks.
	window.addEventListener('storage', function (e) { if (e.key === COMPARE_KEY) { syncCompare(); } });

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

	/* ---------- Boot ---------- */

	function initBlock(root) {
		initTouchPreviews(root);
		syncPanels(root);
		loadCardPrices(root);
		markCachedImages(root);
		$(root).find('.om-catalog-grid').addClass('om-fade-in');
		observeInfinite(root);
		syncCompare();
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
		rememberProduct();
		renderRecent(document);
		fillCustomForms(document);
		initAutoplay(document);
		initStickyBar();
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
