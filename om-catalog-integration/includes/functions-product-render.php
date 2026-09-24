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
			'show_gallery'     => true,
			'show_line_label'  => true,
			'show_title'       => true,
			'show_meta'        => true,
			'show_price'       => true,
			'show_description' => true,
			'show_options'     => true,
			'show_stones'      => true,
			'show_variants'    => true,
			// Text shown in place of a price while no markup is configured
			// ('' = the default "Call for pricing"), optionally linked.
			'price_placeholder'   => '',
			'price_link'          => '',
			'price_link_external' => false,
			'price_link_nofollow' => false,
			// Inline action buttons under the price:
			// [ ['text','url','style' (solid|outline|text),'external','nofollow'], ... ]
			'buttons'             => array(),
		)
	);

	$default_metal   = $product['default_metal'] ?? '';
	$default_color   = $product['default_color'] ?? '';
	$default_level   = $product['default_level'] ?? '';
	$default_quality = $product['default_quality'] ?? '';

	$price_text     = null;
	$is_placeholder = false;
	if ( $args['show_price'] ) {
		if ( om_markup_is_configured() ) {
			$quote = OM_API_Client::get_quotation(
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
			}
		} else {
			// No markup configured yet: never show wholesale prices.
			$is_placeholder = true;
			$price_text     = '' !== trim( (string) $args['price_placeholder'] ) ? $args['price_placeholder'] : om_price_placeholder();
		}
	}

	$main_image = ! empty( $product['images'][0] ) ? om_image_url( $product['images'][0] ) : '';

	ob_start();
	?>
	<div class="om-product-wrap"
		data-line="<?php echo esc_attr( $product_line ); ?>"
		data-style="<?php echo esc_attr( $style_number ); ?>"
		data-priced="<?php echo om_markup_is_configured() ? '1' : '0'; ?>">

		<?php if ( $args['show_gallery'] ) : ?>
			<div class="om-product-gallery">
				<?php if ( $main_image ) : ?>
					<img class="om-main-image" src="<?php echo esc_url( $main_image ); ?>" alt="<?php echo esc_attr( $product['title'] ); ?>" />
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
				<h1 class="om-product-title"><?php echo esc_html( $product['title'] ); ?></h1>
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
				<div class="om-price" id="om-price">
					<?php if ( $is_placeholder && '' !== $args['price_link'] ) : ?>
						<a href="<?php echo esc_url( $args['price_link'] ); ?>"
							<?php echo $args['price_link_external'] ? 'target="_blank"' : ''; ?>
							rel="<?php echo esc_attr( trim( ( $args['price_link_external'] ? 'noopener ' : '' ) . ( $args['price_link_nofollow'] ? 'nofollow' : '' ) ) ); ?>">
							<?php echo esc_html( $price_text ); ?>
						</a>
					<?php else : ?>
						<?php echo $price_text ? esc_html( $price_text ) : esc_html__( 'Price unavailable', 'om-catalog' ); ?>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<?php if ( ! empty( $args['buttons'] ) ) : ?>
				<div class="om-actions">
					<?php foreach ( $args['buttons'] as $btn ) :
						if ( empty( $btn['text'] ) ) {
							continue;
						}
						$btn_style = in_array( $btn['style'] ?? 'solid', array( 'solid', 'outline', 'text' ), true ) ? $btn['style'] : 'solid';
						$btn_rel   = trim( ( ! empty( $btn['external'] ) ? 'noopener ' : '' ) . ( ! empty( $btn['nofollow'] ) ? 'nofollow' : '' ) );
						?>
						<a class="om-btn om-btn--<?php echo esc_attr( $btn_style ); ?>"
							href="<?php echo esc_url( ! empty( $btn['url'] ) ? $btn['url'] : '#' ); ?>"
							<?php echo ! empty( $btn['external'] ) ? 'target="_blank"' : ''; ?>
							<?php echo $btn_rel ? 'rel="' . esc_attr( $btn_rel ) . '"' : ''; ?>>
							<?php echo esc_html( $btn['text'] ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

			<?php if ( $args['show_description'] && ! empty( $product['description'] ) ) : ?>
				<div class="om-description"><?php echo wp_kses_post( wpautop( $product['description'] ) ); ?></div>
			<?php endif; ?>

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
