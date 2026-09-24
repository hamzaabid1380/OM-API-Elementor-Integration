(function ($) {
	'use strict';

	$(document).on('change', '.om-option', function () {
		var $form = $(this).closest('.om-product-wrap');
		var line = $form.data('line');
		var styleNumber = $form.data('style');

		// No markup configured yet: prices are suppressed server-side,
		// so skip the AJAX round-trip entirely.
		if (String($form.data('priced')) === '0') {
			return;
		}

		var data = {
			action: 'om_get_quote',
			nonce: omCatalog.nonce,
			line: line,
			styleNumber: styleNumber,
			metal: $form.find('[name="metal"]').val() || '',
			color: $form.find('[name="color"]').val() || '',
			level: $form.find('[name="level"]').val() || '',
			quality: $form.find('[name="quality"]').val() || ''
		};

		var $price = $('#om-price');
		$price.addClass('om-price-loading').text('Updating price...');

		$.post(omCatalog.ajaxUrl, data, function (response) {
			$price.removeClass('om-price-loading');
			if (response.success) {
				$price.text(response.data.price_formatted);
			} else {
				$price.text('Price unavailable');
			}
		}).fail(function () {
			$price.removeClass('om-price-loading');
			$price.text('Price unavailable');
		});
	});

	// Filter pills, the line switcher and pagination update the grid via
	// AJAX; the links stay real URLs, so everything still works without JS
	// and filtered views remain shareable.
	var omPushed = false;

	$(document).on('click', '.om-catalog-wrap .om-filter-pill, .om-catalog-wrap .om-pagination a', function (e) {
		var $wrap = $(this).closest('.om-catalog-wrap');
		var href = this.href;

		if (!$wrap.length || !href || typeof omCatalog === 'undefined') {
			return; // fall back to normal navigation
		}
		e.preventDefault();

		var isPagination = $(this).closest('.om-pagination').length > 0;
		$wrap.addClass('om-loading');

		$.post(omCatalog.ajaxUrl, {
			action: 'om_filter_grid',
			nonce: omCatalog.nonce,
			atts: $wrap.attr('data-om-atts'),
			url: href
		}, function (response) {
			if (response && response.success && response.data.html) {
				var $fresh = $(response.data.html);
				$wrap.replaceWith($fresh);
				if (window.history && window.history.pushState) {
					window.history.pushState({ omCatalog: true }, '', href);
					omPushed = true;
				}
				if (isPagination && $fresh[0] && $fresh[0].scrollIntoView) {
					$fresh[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			} else {
				window.location.href = href;
			}
		}).fail(function () {
			window.location.href = href;
		});
	});

	// Back/forward after an AJAX swap: reload so the server renders the
	// state the URL describes.
	window.addEventListener('popstate', function () {
		if (omPushed) {
			window.location.reload();
		}
	});

	$(document).on('click', '.om-thumb', function () {
		var src = $(this).attr('src');
		var $main = $('.om-main-image');

		$('.om-thumb').removeClass('is-active');
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

})(jQuery);
