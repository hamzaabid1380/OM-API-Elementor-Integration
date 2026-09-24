<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once OM_CATALOG_DIR . 'includes/functions-pricing.php';

/**
 * Render the product-detail block (gallery + details) for one product.
 * Shared by the built-in single-product template and the "OM Single
 * Product" Elementor widget, so the markup — and the JavaScript hooks for
 * live price re-quoting and the gallery — stays identical everywhere.
 *
 * @param array  $product      Product record from the API.
 * @param string $product_line Line code, e.g. engagement-rings.
 * @param string $style_number The product's style number.
 * @param array  $args         show_* booleans to hide sections.
 * @return string HTML.
 */
function om_render_product_detail( $product, $product_line, $style_number, $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'show_gallery'        => true,
			'show_line_label'     => true,
			'show_title'          => true,
			'show_meta'           => true,
			'show_price'          => true,
			'show_description'    => true,
			'show_options'        => true,
			'show_stones'         => true,
			'show_variants'       => true,
			// auto = live price when a markup is set and OM returns one;
			// never = always show the fallback instead (no quote call).
			'price_display'       => 'auto',
			// What stands in for the price when none is shown:
			// text (e.g. "Call for pricing"), buttons (the buttons move
			// into the price spot) or none.
			'price_fallback'      => 'text',
			'price_placeholder'   => '',
			'price_link'          => '',
			'price_link_external' => false,
			'price_link_nofollow' => false,
			// Buttons: [ 'text', 'url', 'style' (solid|outline|text),
			// 'external', 'nofollow', 'show' (always|no_price|with_price),
			// 'icon_html', 'icon_position' (before|after), 'class' ]
			'buttons'             => array(),
			// Where the buttons sit: price (right under it),
			// after_options, after_description.
			'buttons_position'    => 'price',
			'buttons_layout'      => 'inline',
		)
	);

	$default_metal   = $product['default_metal'] ?? '';
	$default_color   = $product['default_color'] ?? '';
	$default_level   = $product['default_level'] ?? '';
	$default_quality = $product['default_quality'] ?? '';
	$title           = (string) ( $product['title'] ?? $style_number );

	// ---- Price ----
	$price_text   = '';
	$price_reason = ''; // Why no price is shown (admins only).
	$can_requote  = false;

	if ( $args['show_price'] && 'never' !== $args['price_display'] ) {
		if ( ! om_markup_is_configured() ) {
			$price_reason = __( 'no pricing markup is set yet. Add one under Settings > OM Catalog > Pricing Markup.', 'om-catalog' );
		} else {
			$can_requote = true;
			$quote       = OM_API_Client::get_quotation(
				$product_line,
				array_filter(
					array(
						'styleNumber' => $style_number,
						'metal'       => $default_metal,
						'color'       => $default_color,
						'level'       => $default_level,
						'quality'     => $default_quality,
					)
				)
			);
			if ( ! is_wp_error( $quote ) && isset( $quote['price'] ) ) {
				$price_text = om_format_price( om_apply_markup( floatval( $quote['price'] ) ) );
			} else {
				$price_reason = is_wp_error( $quote )
					/* translators: %s: API error message. */
					? sprintf( __( 'Overnight Mountings returned an error for the default configuration: %s', 'om-catalog' ), $quote->get_error_message() )
					: __( 'Overnight Mountings returned no price for the default configuration.', 'om-catalog' );
			}
		}
	}
	$has_price = '' !== $price_text;

	$placeholder = '' !== trim( (string) $args['price_placeholder'] ) ? $args['price_placeholder'] : om_price_placeholder();
	$price_link  = '' !== trim( (string) $args['price_link'] ) ? $args['price_link'] : (string) get_option( 'om_price_link', '' );

	// Buttons that should currently be visible, and where they go.
	$buttons           = array_values( array_filter( (array) $args['buttons'], static function ( $b ) { return ! empty( $b['text'] ); } ) );
	$buttons_in_price  = $buttons && ! $has_price && 'buttons' === $args['price_fallback'];
	$buttons_position  = $buttons_in_price ? 'price' : $args['buttons_position'];
	$buttons_html      = $buttons ? om_render_action_buttons( $buttons, $has_price, $args['buttons_layout'] ) : '';

	$main_image = ! empty( $product['images'][0] ) ? om_image_url( $product['images'][0] ) : '';

	ob_start();
	?>
	<div class="om-product-wrap"
		data-line="<?php echo esc_attr( $product_line ); ?>"
		data-style="<?php echo esc_attr( $style_number ); ?>"
		data-priced="<?php echo $can_requote ? '1' : '0'; ?>">

		<?php if ( $args['show_gallery'] ) : ?>
			<div class="om-product-gallery">
				<?php if ( $main_image ) : ?>
					<img class="om-main-image" src="<?php echo esc_url( $main_image ); ?>" alt="<?php echo esc_attr( $title ); ?>" />
				<?php endif; ?>

				<?php if ( ! empty( $product['images'] ) && count( $product['images'] ) > 1 ) : ?>
					<div class="om-thumbs">
						<?php foreach ( array_slice( $product['images'], 0, 8 ) as $i => $img ) :
							$thumb_url = om_image_url( $img );
							if ( ! $thumb_url ) {
								continue;
							}
							?>
							<img class="om-thumb<?php echo 0 === $i ? ' is-active' : ''; ?>" src="<?php echo esc_url( $thumb_url ); ?>" alt="" />
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<div class="om-product-details">
			<?php if ( $args['show_line_label'] ) : ?>
				<p class="om-line-label"><?php echo esc_html( ucwords( str_replace( '-', ' ', $product_line ) ) ); ?></p>
			<?php endif; ?>

			<?php if ( $args['show_title'] ) : ?>
				<h1 class="om-product-title"><?php echo esc_html( $title ); ?></h1>
			<?php endif; ?>

			<?php if ( $args['show_meta'] ) : ?>
				<p class="om-style-meta">
					<?php if ( ! empty( $product['variant_name'] ) ) : ?>
						<span class="om-variant-name"><?php echo esc_html( $product['variant_name'] ); ?></span>
						<span class="om-meta-sep">&middot;</span>
					<?php endif; ?>
					<span class="om-style-number"><?php echo esc_html( 'Style ' . $style_number ); ?></span>
				</p>
			<?php endif; ?>

			<?php if ( $args['show_price'] ) : ?>
				<?php
				// The fallback is always rendered (hidden while a price shows)
				// so the script can swap to it if a re-quote fails.
				$fallback_html = '';
				if ( 'text' === $args['price_fallback'] ) {
					$fallback_html = '' !== $price_link
						? sprintf(
							'<a class="om-price-link" href="%s"%s%s>%s</a>',
							esc_url( $price_link ),
							$args['price_link_external'] ? ' target="_blank"' : '',
							( $args['price_link_external'] || $args['price_link_nofollow'] ) ? ' rel="' . esc_attr( trim( ( $args['price_link_external'] ? 'noopener ' : '' ) . ( $args['price_link_nofollow'] ? 'nofollow' : '' ) ) ) . '"' : '',
							esc_html( $placeholder )
						)
						: '<span class="om-price-text">' . esc_html( $placeholder ) . '</span>';
				}
				$show_slot = $has_price || '' !== $fallback_html || $buttons_in_price;
				?>
				<?php if ( $show_slot ) : ?>
					<div class="om-price<?php echo $has_price ? '' : ' is-fallback'; ?>" aria-live="polite">
						<?php if ( $can_requote ) : ?>
							<span class="om-price-amount"<?php echo $has_price ? '' : ' hidden'; ?>><?php echo esc_html( $price_text ); ?></span>
						<?php endif; ?>
						<?php if ( '' !== $fallback_html ) : ?>
							<span class="om-price-fallback"<?php echo $has_price ? ' hidden' : ''; ?>><?php echo $fallback_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above. ?></span>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<?php if ( ! $has_price && '' !== $price_reason && 'never' !== $args['price_display'] && current_user_can( 'manage_options' ) ) : ?>
					<p class="om-admin-note"><strong><?php esc_html_e( 'Only admins see this:', 'om-catalog' ); ?></strong> <?php echo esc_html( sprintf( /* translators: %s: reason. */ __( 'no price is shown because %s', 'om-catalog' ), lcfirst( $price_reason ) ) ); ?></p>
				<?php endif; ?>
			<?php endif; ?>

			<?php
			if ( 'price' === $buttons_position ) {
				echo $buttons_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in om_render_action_buttons().
			}
			?>

			<?php if ( $args['show_description'] && ! empty( $product['description'] ) ) : ?>
				<div class="om-description"><?php echo wp_kses_post( wpautop( $product['description'] ) ); ?></div>
			<?php endif; ?>

			<?php
			if ( 'after_description' === $buttons_position ) {
				echo $buttons_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in om_render_action_buttons().
			}
			?>

			<?php if ( $args['show_options'] ) : ?>
				<form class="om-options-form">
					<?php if ( ! empty( $product['metals'] ) ) : ?>
						<label>Metal
							<select name="metal" class="om-option">
								<?php foreach ( $product['metals'] as $metal ) : ?>
									<option value="<?php echo esc_attr( $metal ); ?>" <?php selected( $metal, $default_metal ); ?>><?php echo esc_html( $metal ); ?></option>
								<?php endforeach; ?>
							</select>
						</label>
					<?php endif; ?>

					<?php if ( ! empty( $product['colors'] ) ) : ?>
						<label>Color
							<select name="color" class="om-option">
								<?php foreach ( $product['colors'] as $color ) : ?>
									<option value="<?php echo esc_attr( $color ); ?>" <?php selected( $color, $default_color ); ?>><?php echo esc_html( $color ); ?></option>
								<?php endforeach; ?>
							</select>
						</label>
					<?php endif; ?>

					<?php if ( ! empty( $product['levels'] ) ) : ?>
						<label>Level
							<select name="level" class="om-option">
								<?php foreach ( $product['levels'] as $level ) : ?>
									<option value="<?php echo esc_attr( $level ); ?>" <?php selected( $level, $default_level ); ?>><?php echo esc_html( $level ); ?></option>
								<?php endforeach; ?>
							</select>
						</label>
					<?php endif; ?>

					<?php if ( ! empty( $product['qualities'] ) ) : ?>
						<label>Quality
							<select name="quality" class="om-option">
								<?php foreach ( $product['qualities'] as $quality ) : ?>
									<option value="<?php echo esc_attr( $quality ); ?>" <?php selected( $quality, $default_quality ); ?>><?php echo esc_html( $quality ); ?></option>
								<?php endforeach; ?>
							</select>
						</label>
					<?php endif; ?>
				</form>
			<?php endif; ?>

			<?php
			if ( 'after_options' === $buttons_position ) {
				echo $buttons_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in om_render_action_buttons().
			}
			?>

			<?php if ( $args['show_stones'] && ! empty( $product['stone_breakdown'] ) ) : ?>
				<h3><?php esc_html_e( 'Stone Details', 'om-catalog' ); ?></h3>
				<table class="om-stone-table">
					<?php foreach ( $product['stone_breakdown'] as $stone ) : ?>
						<tr>
							<td><?php echo esc_html( $stone['quantity'] ?? '' ); ?> x <?php echo esc_html( $stone['shape'] ?? '' ); ?> <?php echo esc_html( $stone['type'] ?? '' ); ?></td>
							<td><?php echo esc_html( $stone['carat'] ?? '' ); ?> ct</td>
							<td><?php echo esc_html( $stone['dimension'] ?? '' ); ?></td>
						</tr>
					<?php endforeach; ?>
				</table>
			<?php endif; ?>

			<?php if ( $args['show_variants'] && ! empty( $product['product_variants'] ) && count( $product['product_variants'] ) > 1 ) : ?>
				<h3><?php esc_html_e( 'Other Sizes / Carats', 'om-catalog' ); ?></h3>
				<div class="om-variants">
					<?php foreach ( $product['product_variants'] as $variant ) :
						if ( empty( $variant['style_number'] ) ) {
							continue;
						}
						$is_current = ( $variant['style_number'] === $style_number );
						?>
						<a class="om-variant-link<?php echo $is_current ? ' is-current' : ''; ?>"
							<?php echo $is_current ? 'aria-current="page"' : ''; ?>
							href="<?php echo esc_url( om_product_url( $product_line, $variant['style_number'] ) ); ?>">
							<?php echo esc_html( ! empty( $variant['variant_name'] ) ? $variant['variant_name'] : $variant['style_number'] ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

		</div>
	</div>
	<?php
	return ob_get_clean();
}

/**
 * Render the product-page buttons. Every button is printed; ones whose
 * "show" rule doesn't match the current price state start hidden, so the
 * script can flip them if a re-quote succeeds or fails.
 *
 * @param array  $buttons   See om_render_product_detail().
 * @param bool   $has_price Is a price currently shown?
 * @param string $layout    inline|stacked.
 * @return string HTML.
 */
function om_render_action_buttons( $buttons, $has_price, $layout = 'inline' ) {
	$html = '';
	foreach ( $buttons as $btn ) {
		$style = in_array( $btn['style'] ?? 'solid', array( 'solid', 'outline', 'text' ), true ) ? $btn['style'] : 'solid';
		$show  = in_array( $btn['show'] ?? 'always', array( 'always', 'no_price', 'with_price' ), true ) ? $btn['show'] : 'always';
		$rel   = trim( ( ! empty( $btn['external'] ) ? 'noopener ' : '' ) . ( ! empty( $btn['nofollow'] ) ? 'nofollow' : '' ) );
		$hide  = ( 'no_price' === $show && $has_price ) || ( 'with_price' === $show && ! $has_price );

		$icon      = ! empty( $btn['icon_html'] ) ? '<span class="om-btn-icon" aria-hidden="true">' . $btn['icon_html'] . '</span>' : '';
		$icon_last = 'after' === ( $btn['icon_position'] ?? 'before' );

		$html .= sprintf(
			'<a class="om-btn om-btn--%1$s%2$s" href="%3$s" data-om-show="%4$s"%5$s%6$s%7$s>%8$s<span class="om-btn-text">%9$s</span>%10$s</a>',
			esc_attr( $style ),
			! empty( $btn['class'] ) ? ' ' . esc_attr( $btn['class'] ) : '',
			esc_url( ! empty( $btn['url'] ) ? $btn['url'] : '#' ),
			esc_attr( $show ),
			! empty( $btn['external'] ) ? ' target="_blank"' : '',
			$rel ? ' rel="' . esc_attr( $rel ) . '"' : '',
			$hide ? ' hidden' : '',
			$icon_last ? '' : $icon, // Icon markup comes from Elementor's icon renderer.
			esc_html( $btn['text'] ),
			$icon_last ? $icon : ''
		);
	}
	if ( '' === $html ) {
		return '';
	}
	return '<div class="om-actions om-actions--' . esc_attr( 'stacked' === $layout ? 'stacked' : 'inline' ) . '">' . $html . '</div>';
}
