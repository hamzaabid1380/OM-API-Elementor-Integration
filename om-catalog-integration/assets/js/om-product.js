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
		$price.find('.om-price-amount').prop('hidden', !hasPrice).text(priceText || '');
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
		if (reduceMotion || saveData) {
			video.removeAttribute('autoplay');
			video.pause();
			video.controls = true;
			return;
		}
		var play = video.play && video.play();
		if (play && play.catch) { play.catch(function () { video.controls = true; }); }
		$('<button type="button" class="om-sound" aria-pressed="false"></button>')
			.attr('aria-label', t('unmute', 'Turn sound on'))
			.on('click', function () {
				video.muted = !video.muted;
				$(this).toggleClass('is-on', !video.muted).attr('aria-pressed', String(!video.muted))
					.attr('aria-label', video.muted ? t('unmute', 'Turn sound on') : t('mute', 'Turn sound off'));
			})
			.appendTo($box);
		// Pause while scrolled out of view.
		if (window.IntersectionObserver) {
			new IntersectionObserver(function (entries) {
				if (!video.isConnected) { return; }
				if (entries[0].isIntersecting) { video.play && video.play().catch(function () {}); } else { video.pause(); }
			}, { threshold: 0.2 }).observe(video);
		}
	}

	function videoFailed($gallery) {
		var $photo = $gallery.find('.om-thumb-btn:not(.om-thumb--video)').first();
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
		var index = $active.length ? $gallery.find('.om-thumb-btn').index($active) : 0;
		// Stop the inline copy; the lightbox plays its own.
		$gallery.find('.om-main-video video').each(function () { this.pause(); });
		openLightbox(slides, Math.max(0, index), this);
	});

	// Hover zoom on devices with a precise pointer.
	var fineHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	if (fineHover) {
		$(document).on('mousemove', '.om-zoom', function (e) {
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
		var list = $gallery.find('.om-thumb-btn').map(function () {
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
				'</div>'
			).appendTo(document.body);

			lb.on('click', function (e) {
				if (e.target === lb[0] || $(e.target).is('.om-lb-stage')) { closeLightbox(); }
			});
			lb.find('.om-lb-close').on('click', closeLightbox);
			lb.find('.om-lb-prev').on('click', function () { stepLightbox(-1); });
			lb.find('.om-lb-next').on('click', function () { stepLightbox(1); });

			// Swipe on touch screens.
			var startX = null;
			lb.on('touchstart', function (e) { startX = e.originalEvent.touches[0].clientX; });
			lb.on('touchend', function (e) {
				if (startX === null) { return; }
				var dx = e.originalEvent.changedTouches[0].clientX - startX;
				if (Math.abs(dx) > 40) { stepLightbox(dx < 0 ? 1 : -1); }
				startX = null;
			});
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
		lb.find('.om-lb-count').text(images.length > 1 ? (index + 1) + ' / ' + images.length : '');
	}

	function stepLightbox(dir) {
		var images = lb.data('images');
		lb.data('index', (lb.data('index') + dir + images.length) % images.length);
		renderLightbox();
	}

	function closeLightbox() {
		if (!lb || lb.prop('hidden')) { return; }
		lb.find('.om-lb-video').empty();
		lb.prop('hidden', true);
		$('html').removeClass('om-lb-open');
		var back = lb.data('returnFocus');
		if (back) { back.focus(); }
	}

	$(document).on('keydown', function (e) {
		if (!lb || lb.prop('hidden')) { return; }
		if (e.key === 'Escape') { closeLightbox(); }
		if (e.key === 'ArrowRight') { stepLightbox(1); }
		if (e.key === 'ArrowLeft') { stepLightbox(-1); }
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
		var slides = lightboxSlides($gallery);
		var current = $(this).find('.om-main-image').attr('src');
		var index = 0;
		slides.forEach(function (slide, i) { if (slide.img === current) { index = i; } });
		openLightbox(slides, index, this);
	});

	/* =========================================================
	   Inquiry form
	   ========================================================= */

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
		'.om-catalog-wrap .om-clear-filters', '.om-catalog-wrap .om-pagination a',
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

	/* ---------- Search with suggestions ---------- */

	var suggestTimer = null;
	var suggestSeq = 0;

	$(document).on('submit', '.om-catalog-wrap .om-search', function (e) {
		if (!window.URL || !window.URLSearchParams) { return; }
		e.preventDefault();
		closeSuggest($(this));
		loadBlock($(this).closest('.om-catalog-wrap'), formUrl(this));
	});

	function closeSuggest($form) {
		$form.find('.om-suggest').prop('hidden', true).empty();
		$form.find('.om-search-input').attr('aria-expanded', 'false').removeAttr('aria-activedescendant');
	}

	$(document).on('input', '.om-catalog-wrap .om-search-input', function () {
		var input = this;
		var $form = $(input).closest('.om-search');
		var $wrap = $form.closest('.om-catalog-wrap');
		var q = $.trim(input.value);
		clearTimeout(suggestTimer);
		if (q.length < 2) {
			closeSuggest($form);
			// Cleared the box: show the full catalog again.
			if (q === '' && /[?&]om_q=/.test(window.location.search)) {
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
				var items = response.data.items || [];
				var $list = $form.find('.om-suggest').empty();
				if (!items.length) {
					$list.append($('<li class="om-suggest-empty" role="presentation"></li>').text(response.data.message || t('noMatches', 'No matching designs')));
				}
				items.forEach(function (item, i) {
					var $a = $('<a class="om-suggest-item" role="option"></a>').attr({ href: item.url, id: $list.attr('id') + '-' + i });
					var $img = $('<span class="om-suggest-img"></span>');
					if (item.image) { $img.append($('<img alt="" loading="lazy" />').attr('src', item.image)); }
					$a.append($img);
					$a.append($('<span class="om-suggest-text"></span>')
						.append($('<span class="om-suggest-title"></span>').text(item.title))
						.append($('<span class="om-suggest-meta"></span>').text([item.variant, 'Style ' + item.style].filter(Boolean).join(' · '))));
					$list.append($('<li role="presentation"></li>').append($a));
				});
				if (response.data.total > items.length) {
					$list.append($('<li role="presentation"></li>').append(
						$('<button type="submit" class="om-suggest-all"></button>').text(t('seeAll', 'See all results') + ' (' + response.data.total + ')')
					));
				}
				$list.prop('hidden', false);
				$(input).attr('aria-expanded', 'true');
			});
		}, 220);
	});

	$(document).on('keydown', '.om-catalog-wrap .om-search-input', function (e) {
		var $form = $(this).closest('.om-search');
		var $items = $form.find('.om-suggest-item');
		if (e.key === 'Escape') { closeSuggest($form); return; }
		if (!$items.length || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter')) { return; }
		var $active = $items.filter('.is-active');
		var index = $items.index($active);
		if (e.key === 'Enter') {
			if ($active.length) { e.preventDefault(); window.location.href = $active.attr('href'); }
			return;
		}
		e.preventDefault();
		index = e.key === 'ArrowDown' ? Math.min($items.length - 1, index + 1) : Math.max(0, index - 1);
		$items.removeClass('is-active').eq(index).addClass('is-active');
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
			var $cells = $(this).find('.om-card-price[data-om-style]').not('.is-loaded');
			var styles = $cells.map(function () { return $(this).attr('data-om-style'); }).get();
			// A few cards per request, several requests at once.
			for (var i = 0; i < styles.length; i += 4) {
				(function (chunk) {
					$.post(cfg.ajaxUrl, { action: 'om_card_prices', line: line, styles: chunk }).done(function (response) {
						var prices = (response && response.success && response.data.prices) || {};
						chunk.forEach(function (style) {
							var $cell = $cells.filter(function () { return $(this).attr('data-om-style') === style; });
							$cell.addClass('is-loaded').text(prices[style] || '');
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
				var $card = $('<a class="om-card"></a>').attr('href', x.u);
				var $img = $('<div class="om-card-image"></div>');
				if (x.i) { $img.append($('<img loading="lazy" decoding="async" />').attr({ src: x.i, alt: x.t || '' })); }
				var $body = $('<div class="om-card-body"></div>').append($('<h3 class="om-card-title"></h3>').text(x.t || x.s));
				if (x.v) { $body.append($('<p class="om-card-variant"></p>').text(x.v)); }
				$track.append($card.append($img, $body));
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
	// om_price, om_options, om_url, om_diamond or om_summary.
	function fillCustomForms(root) {
		$(root || document).find('.om-inquiry-custom[data-om-product]').each(function () {
			var $box = $(this);
			var data = {};
			try { data = JSON.parse($box.attr('data-om-product')) || {}; } catch (err) { return; }
			var $wrap = $box.closest('.om-product-wrap');
			var options = $wrap.length ? optionsSummary($wrap) : '';
			var price = $.trim($wrap.find('.om-price-amount:not([hidden])').text()) || data.price || '';
			var values = { product: data.product, style: data.style, price: price, options: options, url: data.url || window.location.href, diamond: data.diamond, summary: data.summary };
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
		var $body = qv.find('.om-qv-body').html('<div class="om-qv-loading"><span class="om-qv-skel om-qv-skel--img"></span><span class="om-qv-skel"></span><span class="om-qv-skel om-qv-skel--short"></span></div>');
		if (qv[0].showModal) { qv[0].showModal(); } else { qv.attr('open', ''); }
		$('html').addClass('om-lb-open');
		$.post(cfg.ajaxUrl, { action: 'om_quick_view', line: line, style: style }).done(function (response) {
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

	/* ---------- Boot ---------- */

	function initBlock(root) {
		initTouchPreviews(root);
		syncPanels(root);
		loadCardPrices(root);
		markCachedImages(root);
		$(root).find('.om-catalog-grid').addClass('om-fade-in');
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
