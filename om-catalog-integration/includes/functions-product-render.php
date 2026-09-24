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
			// Ring builder: "Select this setting" on builder product lines.
			'show_builder'        => true,
			'builder_text'        => '',
			// "Inquire about this piece" form at the end of the details.
			'show_inquiry'        => true,
			'inquiry_heading'     => '',
			'inquiry_open'        => false,
			// Extra OM_Inquiry::render_form() options (intro, button, field
			// toggles, labels, custom_form...).
			'inquiry_options'     => array(),
			// How metal / colour / level / quality are chosen:
			// swatches (colour circles + pills), pills, dropdowns.
			'options_style'       => 'swatches',
			// Description, stone details and specifications as collapsible
			// sections (accordion) or always open (open).
			'details_style'       => 'accordion',
			'show_specs'          => true,
			// Ring size picker + size guide, on the lines in Settings.
			'show_size'           => true,
			'show_size_guide'     => true,
			// Phones: price + main button stay pinned to the bottom.
			'sticky_bar'          => true,
			// Wide screens: the gallery stays in view while details scroll.
			'sticky_gallery'      => true,
			// Quick view: compact version (no inquiry, links to the page).
			'compact'             => false,
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

	// Ring builder button: only for the builder's product lines, when a
	// builder page is set. Carries a diamond the customer already chose.
	$builder_url = '';
	if ( $args['show_builder'] && in_array( $product_line, om_builder_lines(), true ) ) {
		$rb_diamond  = isset( $_GET['rb_diamond'] ) ? sanitize_text_field( wp_unslash( $_GET['rb_diamond'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display only.
		$builder_url = om_builder_url(
			array(
				'rb_setting' => $product_line . ':' . $style_number,
				'rb_diamond' => $rb_diamond,
			)
		);
	}
	$builder_html = '';
	if ( $builder_url ) {
		$builder_html = sprintf(
			'<div class="om-actions om-actions--builder"><a class="om-btn om-btn--solid om-builder-btn" href="%s" data-om-builder="%s">%s</a></div>',
			esc_url( $builder_url ),
			esc_url( $builder_url ),
			esc_html( '' !== trim( (string) $args['builder_text'] ) ? $args['builder_text'] : __( 'Select this setting', 'om-catalog' ) )
		);
	}

	ob_start();
	?>
	<div class="om-product-wrap<?php echo $args['sticky_gallery'] ? ' om-sticky-gallery' : ''; ?><?php echo $args['compact'] ? ' om-product-wrap--compact' : ''; ?>"
		data-line="<?php echo esc_attr( $product_line ); ?>"
		data-style="<?php echo esc_attr( $style_number ); ?>"
		data-priced="<?php echo $can_requote ? '1' : '0'; ?>"
		data-om-recent-item="<?php echo esc_attr( wp_json_encode( array( 'u' => om_product_url( $product_line, $style_number ), 't' => $title, 'v' => (string) ( $product['variant_name'] ?? '' ), 's' => $style_number, 'i' => ! empty( $product['images'][0] ) ? om_image_url( $product['images'][0] ) : '' ) ) ); ?>">

		<?php
		if ( $args['show_gallery'] ) {
			echo om_render_gallery( $product, $title ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
		}
		?>

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

			<?php
			// ---- Options: metal, colour, level, quality, carat, ring size ----
			$size_lines = array_filter( array_map( 'trim', explode( ',', (string) get_option( 'om_size_lines', 'engagement-rings,wedding-bands,fashion-rings' ) ) ) );
			$show_size  = $args['show_size'] && in_array( $product_line, $size_lines, true );
			$variants   = ( $args['show_variants'] && ! empty( $product['product_variants'] ) && count( $product['product_variants'] ) > 1 ) ? $product['product_variants'] : array();
			?>
			<?php if ( $args['show_options'] || $variants || $show_size ) : ?>
				<div class="om-options-form om-options--<?php echo esc_attr( $args['options_style'] ); ?>" data-om-options>
					<?php
					if ( $args['show_options'] ) {
						$groups = array(
							'metal'   => array( __( 'Metal', 'om-catalog' ), (array) ( $product['metals'] ?? array() ), $default_metal ),
							'color'   => array( __( 'Color', 'om-catalog' ), (array) ( $product['colors'] ?? array() ), $default_color ),
							'level'   => array( __( 'Setting', 'om-catalog' ), (array) ( $product['levels'] ?? array() ), $default_level ),
							'quality' => array( __( 'Diamond quality', 'om-catalog' ), (array) ( $product['qualities'] ?? array() ), $default_quality ),
						);
						foreach ( $groups as $name => $def ) {
							if ( $def[1] ) {
								echo om_render_option_group( $name, $def[0], $def[1], $def[2], $args['options_style'] ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
							}
						}
					}
					?>
					<?php if ( $variants ) : ?>
						<div class="om-opt om-opt--variants">
							<p class="om-opt-label"><?php esc_html_e( 'Carat', 'om-catalog' ); ?></p>
							<div class="om-variants">
								<?php foreach ( $variants as $variant ) :
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
						</div>
					<?php endif; ?>
					<?php if ( $show_size ) : ?>
						<div class="om-opt om-opt--size" data-om-opt="finger_size" data-om-label="<?php esc_attr_e( 'Ring size', 'om-catalog' ); ?>">
							<div class="om-opt-head">
								<label class="om-opt-label" for="om-size-<?php echo esc_attr( sanitize_title( $style_number ) ); ?>"><?php esc_html_e( 'Ring size', 'om-catalog' ); ?></label>
								<?php if ( $args['show_size_guide'] ) : ?>
									<button type="button" class="om-size-guide-link" data-om-size-guide><?php esc_html_e( 'Size guide', 'om-catalog' ); ?></button>
								<?php endif; ?>
							</div>
							<select id="om-size-<?php echo esc_attr( sanitize_title( $style_number ) ); ?>" name="finger_size" class="om-option">
								<option value=""><?php esc_html_e( 'Select your size', 'om-catalog' ); ?></option>
								<?php for ( $size = 3; $size <= 13; $size += 0.5 ) : ?>
									<option value="<?php echo esc_attr( $size ); ?>"><?php echo esc_html( $size ); ?></option>
								<?php endfor; ?>
								<option value="unsure"><?php esc_html_e( 'Not sure — help me find it', 'om-catalog' ); ?></option>
							</select>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<?php
			echo $builder_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
			if ( 'after_options' === $buttons_position ) {
				echo $buttons_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in om_render_action_buttons().
			}
			?>

			<?php
			// ---- Details: description, stone details, specifications ----
			$sections = array();
			if ( $args['show_description'] && ! empty( $product['description'] ) ) {
				$sections['description'] = array( __( 'Description', 'om-catalog' ), '<div class="om-description">' . wp_kses_post( wpautop( $product['description'] ) ) . '</div>' );
			}
			if ( $args['show_stones'] && ! empty( $product['stone_breakdown'] ) ) {
				$rows = '';
				foreach ( $product['stone_breakdown'] as $stone ) {
					$rows .= '<tr><td>' . esc_html( trim( ( $stone['quantity'] ?? '' ) . ' × ' . ( $stone['shape'] ?? '' ) . ' ' . ( $stone['type'] ?? '' ) ) ) . '</td><td>' . esc_html( isset( $stone['carat'] ) ? $stone['carat'] . ' ct' : '' ) . '</td><td>' . esc_html( $stone['dimension'] ?? '' ) . '</td></tr>';
				}
				$sections['stones'] = array( __( 'Stone details', 'om-catalog' ), '<table class="om-stone-table">' . $rows . '</table>' );
			}
			if ( $args['show_specs'] ) {
				$specs = array_filter(
					array(
						__( 'Style number', 'om-catalog' )     => $style_number,
						__( 'Collection', 'om-catalog' )       => ucwords( str_replace( '-', ' ', $product_line ) ),
						__( 'Carat', 'om-catalog' )            => (string) ( $product['variant_name'] ?? '' ),
						__( 'Available metals', 'om-catalog' ) => implode( ', ', (array) ( $product['metals'] ?? array() ) ),
						__( 'Metal colours', 'om-catalog' )    => implode( ', ', (array) ( $product['colors'] ?? array() ) ),
					),
					'strlen'
				);
				$list = '';
				foreach ( $specs as $label => $value ) {
					$list .= '<div><dt>' . esc_html( $label ) . '</dt><dd>' . esc_html( $value ) . '</dd></div>';
				}
				$sections['specs'] = array( __( 'Specifications', 'om-catalog' ), '<dl class="om-specs">' . $list . '</dl>' );
			}
			if ( $args['compact'] ) {
				$sections = array_intersect_key( $sections, array( 'description' => 1 ) );
			}
			?>
			<?php if ( $sections ) : ?>
				<div class="om-details om-details--<?php echo esc_attr( $args['details_style'] ); ?>">
					<?php
					$first = true;
					foreach ( $sections as $key => $section ) {
						if ( 'accordion' === $args['details_style'] ) {
							// The description starts open; the rest folded.
							printf(
								'<details class="om-acc om-acc--%1$s"%2$s><summary class="om-acc-title">%3$s</summary><div class="om-acc-body">%4$s</div></details>',
								esc_attr( $key ),
								( $first && 'description' === $key ) ? ' open' : '',
								esc_html( $section[0] ),
								$section[1] // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
							);
						} else {
							printf( '<section class="om-acc om-acc--%1$s is-static"><h3 class="om-acc-title">%2$s</h3><div class="om-acc-body">%3$s</div></section>', esc_attr( $key ), esc_html( $section[0] ), $section[1] ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
						}
						$first = false;
					}
					?>
				</div>
			<?php endif; ?>

			<?php
			if ( 'after_description' === $buttons_position ) {
				echo $buttons_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in om_render_action_buttons().
			}
			?>

			<?php if ( $args['compact'] ) : ?>
				<a class="om-qv-full" href="<?php echo esc_url( om_product_url( $product_line, $style_number ) ); ?>"><?php esc_html_e( 'View full details', 'om-catalog' ); ?> &rarr;</a>
			<?php endif; ?>

			<?php
			if ( $args['show_inquiry'] && ! $args['compact'] ) {
				echo '<div id="om-inquiry" class="om-product-inquiry">';
				echo OM_Inquiry::render_form( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
					(array) $args['inquiry_options'] + array(
						'title'   => $title,
						'style'   => $style_number,
						'line'    => $product_line,
						'url'     => om_product_url( $product_line, $style_number ),
						'price'   => $price_text,
						'heading' => '' !== trim( (string) $args['inquiry_heading'] ) ? $args['inquiry_heading'] : __( 'Inquire about this piece', 'om-catalog' ),
						'open'    => (bool) $args['inquiry_open'],
					)
				);
				echo '</div>';
			}
			?>

			<?php if ( $args['sticky_bar'] && ! $args['compact'] ) : ?>
				<div class="om-sticky-bar" hidden aria-hidden="true">
					<div class="om-sticky-info">
						<span class="om-sticky-title"><?php echo esc_html( $title ); ?></span>
						<span class="om-sticky-price"><?php echo esc_html( $has_price ? $price_text : '' ); ?></span>
					</div>
					<button type="button" class="om-sticky-cta"><?php echo esc_html( $builder_url ? ( '' !== trim( (string) $args['builder_text'] ) ? $args['builder_text'] : __( 'Select this setting', 'om-catalog' ) ) : __( 'Inquire', 'om-catalog' ) ); ?></button>
				</div>
			<?php endif; ?>

			<?php
			if ( $show_size && $args['show_size_guide'] ) {
				om_print_size_guide();
			}
			?>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

/**
 * Resolve an entry of a product's videos[] to a URL (string or
 * {url|video_url|src|href}).
 */
function om_video_url( $video ) {
	if ( is_string( $video ) ) {
		return $video;
	}
	if ( is_array( $video ) ) {
		foreach ( array( 'url', 'video_url', 'src', 'href' ) as $key ) {
			if ( ! empty( $video[ $key ] ) && is_string( $video[ $key ] ) ) {
				return $video[ $key ];
			}
		}
	}
	return '';
}

/**
 * Product gallery: large image (click to open the lightbox, hover to zoom
 * on desktop), a filmstrip of angles and any videos. Videos play in place:
 * files (mp4/webm/mov) in a <video>, anything else (YouTube, Vimeo, a
 * 360° viewer) in an iframe.
 */
function om_render_gallery( $product, $title ) {
	$images = array_values( array_filter( array_map( 'om_image_url', array_slice( (array) ( $product['images'] ?? array() ), 0, 12 ) ) ) );
	$videos = array_values( array_filter( array_map( 'om_video_url', array_slice( (array) ( $product['videos'] ?? array() ), 0, 4 ) ) ) );
	if ( ! $images && ! $videos ) {
		return '';
	}

	ob_start();
	?>
	<div class="om-product-gallery" data-om-gallery>
		<div class="om-main-media">
			<?php if ( $images ) : ?>
				<button type="button" class="om-zoom" aria-label="<?php esc_attr_e( 'Enlarge image', 'om-catalog' ); ?>">
					<img class="om-main-image" src="<?php echo esc_url( $images[0] ); ?>" alt="<?php echo esc_attr( $title ); ?>" fetchpriority="high" />
				</button>
			<?php endif; ?>
			<div class="om-main-video"<?php echo $images ? ' hidden' : ''; ?>>
				<?php if ( ! $images ) : ?>
					<?php echo om_video_embed( $videos[0], $title ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer. ?>
				<?php endif; ?>
			</div>
		</div>
		<?php if ( count( $images ) + count( $videos ) > 1 ) : ?>
			<div class="om-thumbs" role="list">
				<?php foreach ( $images as $i => $url ) : ?>
					<button type="button" role="listitem" class="om-thumb-btn<?php echo 0 === $i ? ' is-active' : ''; ?>" data-full="<?php echo esc_url( $url ); ?>" aria-label="<?php echo esc_attr( sprintf( /* translators: %d: image number. */ __( 'View image %d', 'om-catalog' ), $i + 1 ) ); ?>">
						<img class="om-thumb" src="<?php echo esc_url( $url ); ?>" alt="" loading="lazy" decoding="async" />
					</button>
				<?php endforeach; ?>
				<?php foreach ( $videos as $i => $url ) : ?>
					<button type="button" role="listitem" class="om-thumb-btn om-thumb--video<?php echo ( ! $images && 0 === $i ) ? ' is-active' : ''; ?>" data-video="<?php echo esc_attr( om_video_embed( $url, $title ) ); ?>" aria-label="<?php esc_attr_e( 'Play video', 'om-catalog' ); ?>">
						<?php if ( $images ) : ?><img class="om-thumb" src="<?php echo esc_url( $images[0] ); ?>" alt="" loading="lazy" decoding="async" /><?php endif; ?>
						<span class="om-play" aria-hidden="true"></span>
					</button>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
	<?php
	return ob_get_clean();
}

/** Player markup for one video URL. */
function om_video_embed( $url, $title = '' ) {
	$path = strtolower( (string) wp_parse_url( $url, PHP_URL_PATH ) );
	if ( preg_match( '/\.(mp4|webm|mov|m4v)$/', $path ) ) {
		return '<video class="om-video" src="' . esc_url( $url ) . '" controls playsinline muted loop autoplay preload="metadata"></video>';
	}
	// YouTube / Vimeo page links become their embed players.
	if ( preg_match( '#(?:youtube\.com/watch\?v=|youtu\.be/)([\w-]{6,})#', $url, $m ) ) {
		$url = 'https://www.youtube-nocookie.com/embed/' . $m[1];
	} elseif ( preg_match( '#vimeo\.com/(\d+)#', $url, $m ) ) {
		$url = 'https://player.vimeo.com/video/' . $m[1];
	}
	return '<iframe class="om-video" src="' . esc_url( $url ) . '" title="' . esc_attr( $title ) . '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
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


/** Colour names we can draw as a swatch. */
function om_swatch_class( $value ) {
	$v = strtolower( (string) $value );
	foreach ( array( 'rose', 'yellow', 'white', 'platinum', 'black', 'two', 'tri' ) as $known ) {
		if ( false !== strpos( $v, $known ) ) {
			return 'om-swatch--' . ( 'two' === $known || 'tri' === $known ? 'multi' : $known );
		}
	}
	return 'om-swatch--other';
}

/**
 * One product option (metal, colour, level, quality) as swatches, pills
 * or a dropdown. Swatch/pill styles are radio buttons, so they stay
 * keyboard- and screen-reader-friendly.
 */
function om_render_option_group( $name, $label, $values, $default, $style ) {
	$values = array_values( array_filter( array_map( 'strval', (array) $values ), 'strlen' ) );
	if ( ! $values ) {
		return '';
	}
	if ( ! in_array( $default, $values, true ) ) {
		$default = $values[0];
	}
	$uid = 'om-opt-' . $name . '-' . wp_rand( 1000, 9999 );

	if ( 'dropdowns' === $style ) {
		$html = '<div class="om-opt om-opt--select" data-om-opt="' . esc_attr( $name ) . '" data-om-label="' . esc_attr( $label ) . '"><label class="om-opt-label" for="' . esc_attr( $uid ) . '">' . esc_html( $label ) . '</label><select id="' . esc_attr( $uid ) . '" name="' . esc_attr( $name ) . '" class="om-option">';
		foreach ( $values as $value ) {
			$html .= '<option value="' . esc_attr( $value ) . '"' . selected( $value, $default, false ) . '>' . esc_html( $value ) . '</option>';
		}
		return $html . '</select></div>';
	}

	$as_swatch = 'swatches' === $style && 'color' === $name;
	$html      = '<fieldset class="om-opt om-opt--' . ( $as_swatch ? 'swatches' : 'pills' ) . '" data-om-opt="' . esc_attr( $name ) . '" data-om-label="' . esc_attr( $label ) . '"><legend class="om-opt-label">' . esc_html( $label ) . ': <span class="om-opt-current">' . esc_html( $default ) . '</span></legend><div class="om-opt-choices">';
	foreach ( $values as $value ) {
		$inner = $as_swatch
			? '<span class="om-swatch ' . esc_attr( om_swatch_class( $value ) ) . '" aria-hidden="true"></span><span class="om-visually-hidden">' . esc_html( $value ) . '</span>'
			: '<span class="om-pill-text">' . esc_html( $value ) . '</span>';
		$html .= '<label class="om-choice-' . ( $as_swatch ? 'swatch' : 'pill' ) . '"' . ( $as_swatch ? ' title="' . esc_attr( $value ) . '"' : '' ) . '><input type="radio" class="om-option" name="' . esc_attr( $name ) . '" value="' . esc_attr( $value ) . '"' . checked( $value, $default, false ) . ' />' . $inner . '</label>';
	}
	return $html . '</div></fieldset>';
}

/**
 * Ring size guide dialog, printed once per page: how to measure, a size
 * chart, and a printable sizer drawn at true size in millimetres.
 */
function om_print_size_guide() {
	static $done = false;
	if ( $done ) {
		return;
	}
	$done = true;

	$sizes = array();
	for ( $us = 3; $us <= 13; $us += 0.5 ) {
		// US ring size to inside diameter: 11.63 mm + 0.8128 mm per size.
		$diameter = 11.63 + 0.8128 * $us;
		$sizes[]  = array( $us, $diameter, $diameter * M_PI );
	}
	$custom = trim( (string) get_option( 'om_size_guide_note', '' ) );
	?>
	<dialog class="om-size-guide" aria-labelledby="om-size-guide-title">
		<div class="om-sg-inner">
			<button type="button" class="om-sg-close" aria-label="<?php esc_attr_e( 'Close', 'om-catalog' ); ?>">&times;</button>
			<h2 id="om-size-guide-title" class="om-sg-title"><?php esc_html_e( 'Find your ring size', 'om-catalog' ); ?></h2>
			<?php if ( '' !== $custom ) : ?>
				<p class="om-sg-note"><?php echo esc_html( $custom ); ?></p>
			<?php endif; ?>
			<div class="om-sg-methods">
				<div>
					<h3><?php esc_html_e( 'Measure a ring you own', 'om-catalog' ); ?></h3>
					<p><?php esc_html_e( 'Place a ring that fits the right finger on the circles below (print at 100%, no scaling) and pick the circle that matches its inside edge. Or measure the inside diameter in millimetres and find it in the chart.', 'om-catalog' ); ?></p>
				</div>
				<div>
					<h3><?php esc_html_e( 'Measure your finger', 'om-catalog' ); ?></h3>
					<p><?php esc_html_e( 'Wrap a strip of paper around the base of your finger, mark where it overlaps and measure the length in millimetres: that is the circumference. Measure at the end of the day, when fingers are largest.', 'om-catalog' ); ?></p>
				</div>
			</div>
			<div class="om-sg-grid">
				<table class="om-sg-table">
					<thead><tr><th><?php esc_html_e( 'US size', 'om-catalog' ); ?></th><th><?php esc_html_e( 'Diameter', 'om-catalog' ); ?></th><th><?php esc_html_e( 'Circumference', 'om-catalog' ); ?></th></tr></thead>
					<tbody>
						<?php foreach ( $sizes as $row ) : ?>
							<tr><td><?php echo esc_html( $row[0] ); ?></td><td><?php echo esc_html( number_format( $row[1], 1 ) ); ?> mm</td><td><?php echo esc_html( number_format( $row[2], 1 ) ); ?> mm</td></tr>
						<?php endforeach; ?>
					</tbody>
				</table>
				<div class="om-sg-sizer">
					<p class="om-sg-sizer-title"><?php esc_html_e( 'Printable sizer', 'om-catalog' ); ?></p>
					<div class="om-sg-circles">
						<?php foreach ( $sizes as $row ) : ?>
							<?php if ( floor( $row[0] ) == $row[0] ) : // phpcs:ignore Universal.Operators.StrictComparisons -- whole sizes only. ?>
								<div class="om-sg-circle"><span style="width:<?php echo esc_attr( number_format( $row[1], 2, '.', '' ) ); ?>mm;height:<?php echo esc_attr( number_format( $row[1], 2, '.', '' ) ); ?>mm"></span><em><?php echo esc_html( $row[0] ); ?></em></div>
							<?php endif; ?>
						<?php endforeach; ?>
					</div>
					<button type="button" class="om-sg-print"><?php esc_html_e( 'Print the sizer', 'om-catalog' ); ?></button>
					<p class="om-sg-small"><?php esc_html_e( 'Check the print: the ruler below should measure exactly 50 mm.', 'om-catalog' ); ?></p>
					<div class="om-sg-ruler" aria-hidden="true"></div>
				</div>
			</div>
		</div>
	</dialog>
	<?php
}
