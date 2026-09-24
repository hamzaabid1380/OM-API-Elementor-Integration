(function ($) {
	'use strict';

	var cfg = window.omCatalog || {};

	/* ---------- Product page: live re-quote ---------- */

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
	}

	$(document).on('change', '.om-option', function () {
		var $wrap = $(this).closest('.om-product-wrap');

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
			metal: $wrap.find('[name="metal"]').val() || '',
			color: $wrap.find('[name="color"]').val() || '',
			level: $wrap.find('[name="level"]').val() || '',
			quality: $wrap.find('[name="quality"]').val() || ''
		}).done(function (response) {
			if (seq !== quoteSeq) {
				return; // A newer change is in flight; ignore this answer.
			}
			if (response && response.success) {
				setPriceState($wrap, response.data.price_formatted);
				// Sync the dropdowns to the configuration OM actually priced
				// (e.g. a single-colour metal forces its colour).
				$.each(response.data.config || {}, function (name, value) {
					var $select = $wrap.find('[name="' + name + '"]');
					if (value && $select.length && $select.find('option').filter(function () { return this.value === value; }).length) {
						$select.val(value);
					}
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

	/* ---------- Product page: gallery ---------- */

	$(document).on('click', '.om-thumb', function () {
		var src = $(this).attr('src');
		var $gallery = $(this).closest('.om-product-gallery');
		var $main = $gallery.find('.om-main-image');

		$gallery.find('.om-thumb').removeClass('is-active');
		$(this).addClass('is-active');

		// Soft cross-fade into the new angle.
		$main.css('opacity', 0);
		$main.one('load', function () {
			$main.css('opacity', 1);
		});
		$main.attr('src', src);
		if ($main[0] && $main[0].complete) {
			$main.css('opacity', 1);
		}
	});

	/* ---------- Catalog: filters & pagination without reloads ---------- */

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

	function loadGrid($wrap, href, scroll) {
		if (!$wrap.length || !href || !cfg.ajaxUrl) {
			window.location.href = href;
			return;
		}
		$wrap.addClass('om-loading').attr('aria-busy', 'true');

		$.post(cfg.ajaxUrl, {
			action: 'om_filter_grid',
			atts: $wrap.attr('data-om-atts'),
			sig: $wrap.attr('data-om-sig'),
			url: href
		}).done(function (response) {
			if (!(response && response.success && response.data.html)) {
				window.location.href = href;
				return;
			}
			var $fresh = $($.parseHTML($.trim(response.data.html)));
			$wrap.replaceWith($fresh);
			syncPanels($fresh);
			if (window.history && window.history.pushState) {
				window.history.pushState({ omCatalog: true }, '', href);
				omPushed = true;
			}
			if (scroll && $fresh[0] && $fresh[0].getBoundingClientRect().top < 0 && $fresh[0].scrollIntoView) {
				$fresh[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}).fail(function () {
			window.location.href = href;
		});
	}

	$(document).on('click', '.om-catalog-wrap .om-filter-pill, .om-catalog-wrap .om-filter-link, .om-catalog-wrap .om-chip, .om-catalog-wrap .om-clear-filters, .om-catalog-wrap .om-pagination a', function (e) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
			return; // Let "open in new tab" work.
		}
		e.preventDefault();
		var isPagination = $(this).closest('.om-pagination').length > 0;
		loadGrid($(this).closest('.om-catalog-wrap'), this.href, isPagination);
	});

	$(document).on('change', '.om-catalog-wrap .om-filter-nav', function () {
		loadGrid($(this).closest('.om-catalog-wrap'), this.value, false);
	});

	// Back/forward after an AJAX swap: reload so the server renders the
	// state the URL describes.
	window.addEventListener('popstate', function () {
		if (omPushed) {
			window.location.reload();
		}
	});

	$(function () {
		syncPanels(document);
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
				syncPanels($scope);
			});
		}
	});

})(jQuery);
