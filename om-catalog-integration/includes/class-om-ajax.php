<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once OM_CATALOG_DIR . 'includes/functions-pricing.php';

/**
 * Public, read-only endpoints for the catalog: re-rendering a grid for a
 * clicked filter/page link, and re-quoting a product configuration.
 *
 * Neither checks a nonce. Both only read public catalog data, and a nonce
 * baked into a page that a cache serves for more than 12-24 hours would
 * expire and break filtering/pricing for every visitor. Abuse is limited
 * instead by what the endpoints accept: the grid endpoint only renders
 * attribute sets signed by this site, visitor filter values are checked
 * against the offered options, and quotes are cached per configuration.
 */
class OM_Ajax {

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_ajax_om_get_quote', array( $this, 'handle_get_quote' ) );
		add_action( 'wp_ajax_nopriv_om_get_quote', array( $this, 'handle_get_quote' ) );
		add_action( 'wp_ajax_om_filter_grid', array( $this, 'handle_filter_grid' ) );
		add_action( 'wp_ajax_nopriv_om_filter_grid', array( $this, 'handle_filter_grid' ) );
		add_action( 'wp_ajax_om_quick_view', array( $this, 'handle_quick_view' ) );
		add_action( 'wp_ajax_nopriv_om_quick_view', array( $this, 'handle_quick_view' ) );
		add_action( 'wp_ajax_om_card_prices', array( $this, 'handle_card_prices' ) );
		add_action( 'wp_ajax_nopriv_om_card_prices', array( $this, 'handle_card_prices' ) );
	}

	/**
	 * Quick view: a compact product block (gallery, price, options,
	 * buttons, description) for the listing's pop-up. The product lookup
	 * is the same cached call a product page makes.
	 */
	public function handle_quick_view() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint, see class doc.
		$line  = isset( $_POST['line'] ) ? sanitize_title( wp_unslash( $_POST['line'] ) ) : '';
		$style = isset( $_POST['style'] ) ? sanitize_text_field( wp_unslash( $_POST['style'] ) ) : '';
		// What the pop-up shows (the widget's Quick view settings). Plain
		// display switches, so there is nothing to sign.
		$parts = isset( $_POST['parts'] ) ? array_map( 'trim', explode( ',', sanitize_text_field( wp_unslash( $_POST['parts'] ) ) ) ) : array( 'price', 'options', 'description', 'meta', 'builder' );
		$video = isset( $_POST['video'] ) && 'thumb' === $_POST['video'] ? 'thumb' : 'first';
		$thumbs = isset( $_POST['thumbs'] ) && in_array( $_POST['thumbs'], array( 'bottom', 'none' ), true ) ? sanitize_key( $_POST['thumbs'] ) : 'left';
		$link  = isset( $_POST['link'] ) ? mb_substr( sanitize_text_field( wp_unslash( $_POST['link'] ) ), 0, 60 ) : '';
		// phpcs:enable
		if ( '' === $line || '' === $style ) {
			wp_send_json_error( array( 'message' => 'Missing product.' ), 400 );
		}
		$product = OM_API_Client::get_product_by_style( $line, $style );
		if ( is_wp_error( $product ) ) {
			wp_send_json_error( array( 'message' => om_public_error_message( $product ) ) );
		}
		require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
		$has = static function ( $part ) use ( $parts ) {
			return in_array( $part, $parts, true );
		};

		// The product page's own price text and buttons (its "OM Single
		// Product" widget), so the pop-up offers exactly the same.
		$page      = self::product_page_widget();
		$page_args = array();
		if ( $page ) {
			$page_args = OM_Elementor_Product_Widget::price_args( $page['settings'] );
			if ( in_array( $page['settings']['options_style'] ?? '', array( 'swatches', 'pills', 'dropdowns' ), true ) ) {
				$page_args['options_style'] = $page['settings']['options_style'];
			}
			if ( in_array( $page['settings']['design'] ?? '', array( 'refined', 'modern', 'classic' ), true ) ) {
				$page_args['design'] = $page['settings']['design'];
			}
			$full_url  = om_product_url( $line, $style );
			foreach ( $page_args['buttons'] as $i => $button ) {
				// No inquiry form in the pop-up: open the one on the page.
				if ( 0 === strpos( (string) $button['url'], '#om-inquiry' ) ) {
					$page_args['buttons'][ $i ]['url'] = $full_url . $button['url'];
				}
			}
		}

		$html = om_render_product_detail(
			$product,
			$line,
			$style,
			array_merge(
				array(
					'compact'          => true,
					'show_meta'        => $has( 'meta' ),
					'show_price'       => $has( 'price' ),
					'show_options'     => $has( 'options' ),
					'show_variants'    => $has( 'options' ),
					'show_description' => $has( 'description' ),
					'show_builder'     => $has( 'builder' ),
					'show_stones'      => false,
					'show_specs'       => false,
					'show_inquiry'     => false,
					'sticky_bar'       => false,
					'sticky_gallery'   => false,
					'show_size'        => false,
					'read_selection'   => false,
					'options_style'    => (string) get_option( 'om_options_style', 'swatches' ),
					'video_mode'       => $video,
					'full_link_text'   => $link,
					'gallery'          => array(
						'follow' => '0' !== get_option( 'om_media_follow', '1' ),
						'thumbs' => $thumbs,
					),
				),
				$page_args
			)
		);
		$html = '<div class="om-single-product om-single-product--widget om-single-product--qv om-qv-thumbs-' . $thumbs . '">' . $html . '</div>';
		$data = array();
		if ( $page ) {
			// Wrapped like the widget on that page, so its Style-tab
			// button colours (and the rest) apply here too.
			$html = sprintf( '<div class="elementor-%d om-qv-page-style"><div class="elementor-element elementor-element-%s">%s</div></div>', $page['layout'], esc_attr( $page['id'] ), $html );
			$data = self::layout_css( $page['layout'] );
		}
		wp_send_json_success( array( 'html' => $html ) + $data );
	}

	/**
	 * The "OM Single Product" widget on the product layout page (Settings >
	 * OM Catalog), or null when product pages use the plugin's template.
	 *
	 * @return array|null [ layout, id, settings ].
	 */
	private static function product_page_widget() {
		$layout = (int) get_option( 'om_product_layout_page', 0 );
		if ( ! $layout || ! did_action( 'elementor/loaded' ) || 'publish' !== get_post_status( $layout ) ) {
			return null;
		}
		// Widgets (and their classes) load when Elementor first lists them.
		\Elementor\Plugin::$instance->widgets_manager->get_widget_types();
		if ( ! class_exists( 'OM_Elementor_Product_Widget' ) ) {
			return null;
		}
		$data = json_decode( (string) get_post_meta( $layout, '_elementor_data', true ), true );
		$find = static function ( $elements ) use ( &$find ) {
			foreach ( (array) $elements as $element ) {
				if ( 'widget' === ( $element['elType'] ?? '' ) && 'om_product_widget' === ( $element['widgetType'] ?? '' ) ) {
					return $element;
				}
				$inner = $find( $element['elements'] ?? array() );
				if ( $inner ) {
					return $inner;
				}
			}
			return null;
		};
		$element = is_array( $data ) ? $find( $data ) : null;
		if ( ! $element ) {
			return null;
		}
		// Through Elementor, so unset controls read as their defaults.
		$settings = (array) ( $element['settings'] ?? array() );
		try {
			$widget = \Elementor\Plugin::$instance->elements_manager->create_element_instance( $element );
			if ( $widget ) {
				$settings = $widget->get_settings_for_display();
			}
		} catch ( \Throwable $e ) { // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedCatch -- raw settings are fine.
		}
		return array(
			'layout'   => $layout,
			'id'       => (string) $element['id'],
			'settings' => $settings,
		);
	}

	/**
	 * The layout page's Elementor CSS for the pop-up: a file URL, or the
	 * CSS itself when Elementor prints styles inline.
	 */
	private static function layout_css( $layout ) {
		if ( ! class_exists( '\Elementor\Core\Files\CSS\Post' ) ) {
			return array();
		}
		$css  = \Elementor\Core\Files\CSS\Post::create( $layout );
		$meta = $css->get_meta();
		if ( empty( $meta['status'] ) ) {
			$css->update();
			$meta = $css->get_meta();
		}
		$out = array( 'css_id' => 'elementor-post-' . (int) $layout . '-css' );
		if ( 'file' === ( $meta['status'] ?? '' ) ) {
			$out['css_url'] = $css->get_url();
		} elseif ( 'inline' === ( $meta['status'] ?? '' ) && ! empty( $meta['css'] ) ) {
			$out['css'] = (string) $meta['css'];
		}
		return $out;
	}

	/**
	 * "From $X" prices for listing cards, loaded after the page so the grid
	 * never waits on quotes. The script asks for a few cards per request
	 * and sends several requests at once. Each price is cached 12 hours.
	 */
	public function handle_card_prices() {
		if ( ! om_markup_is_configured() ) {
			wp_send_json_error( array( 'message' => 'Pricing is not enabled.' ) );
		}
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint, see class doc.
		$line   = isset( $_POST['line'] ) ? sanitize_title( wp_unslash( $_POST['line'] ) ) : '';
		$styles = isset( $_POST['styles'] ) && is_array( $_POST['styles'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['styles'] ) ) : array();
		// phpcs:enable
		$styles = array_slice( array_unique( array_filter( $styles, 'strlen' ) ), 0, 8 );
		if ( '' === $line || ! $styles ) {
			wp_send_json_error( array( 'message' => 'Nothing to price.' ) );
		}

		// "Complete the set": also price each design together with this
		// one ("line|style"), e.g. the ring being viewed plus each band.
		$with = isset( $_POST['with'] ) ? sanitize_text_field( wp_unslash( $_POST['with'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$base = null;
		if ( false !== strpos( $with, '|' ) ) {
			list( $with_line, $with_style ) = explode( '|', $with, 2 );
			$base = OM_API_Client::get_card_price( sanitize_title( $with_line ), $with_style );
		}

		$prices = array();
		$sets   = array();
		foreach ( $styles as $style ) {
			$wholesale = OM_API_Client::get_card_price( $line, $style );
			if ( null !== $wholesale ) {
				/* translators: %s: price. */
				$prices[ $style ] = sprintf( __( 'From %s', 'om-catalog' ), om_format_price_short( om_apply_markup( $wholesale ) ) );
				if ( null !== $base ) {
					/* translators: %s: price of both pieces together. */
					$sets[ $style ] = sprintf( __( 'Set from %s', 'om-catalog' ), om_format_price_short( om_apply_markup( $base ) + om_apply_markup( $wholesale ) ) );
				}
			}
		}
		wp_send_json_success( array( 'prices' => $prices, 'sets' => $sets ) );
	}

	/**
	 * Re-render a catalog block for a clicked filter/pagination link, so the
	 * grid updates without a page reload. The client sends the block's own
	 * attributes and their signature (from data-om-atts / data-om-sig) plus
	 * the clicked link's URL; the visitor state is parsed out of that URL,
	 * exactly as a full page load would read it from the query string.
	 */
	public function handle_filter_grid() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint, see class doc.
		$json = isset( $_POST['atts'] ) ? (string) wp_unslash( $_POST['atts'] ) : '';
		$sig  = isset( $_POST['sig'] ) ? (string) wp_unslash( $_POST['sig'] ) : '';
		$url  = isset( $_POST['url'] ) ? esc_url_raw( wp_unslash( $_POST['url'] ) ) : '';
		// phpcs:enable

		if ( '' === $json || ! hash_equals( OM_Shortcodes::sign_atts( $json ), $sig ) ) {
			wp_send_json_error( array( 'message' => 'Invalid catalog block.' ), 400 );
		}
		$atts = json_decode( $json, true );
		if ( ! is_array( $atts ) || '' === $url ) {
			wp_send_json_error( array( 'message' => 'Invalid request.' ), 400 );
		}

		$query = array();
		parse_str( (string) wp_parse_url( $url, PHP_URL_QUERY ), $query );

		$request = OM_Shortcodes::request_from_query(
			$query,
			remove_query_arg( OM_Shortcodes::STATE_PARAMS, $url )
		);

		wp_send_json_success(
			array(
				'html' => OM_Shortcodes::instance()->render_grid( $atts, $request ),
			)
		);
	}

	public function handle_get_quote() {
		// No markup configured: never expose wholesale pricing. Don't even
		// call the quotation endpoint.
		if ( ! om_markup_is_configured() ) {
			wp_send_json_error( array( 'message' => 'Pricing is not enabled.' ) );
		}

		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint, see class doc.
		$field = function ( $key ) {
			return isset( $_POST[ $key ] ) && is_scalar( $_POST[ $key ] ) ? sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) : '';
		};
		$line         = sanitize_title( $field( 'line' ) );
		$style_number = $field( 'styleNumber' );
		// phpcs:enable

		if ( '' === $line || '' === $style_number ) {
			wp_send_json_error( array( 'message' => 'Missing product reference.' ) );
		}

		$quote = OM_API_Client::get_quotation(
			$line,
			array_filter(
				array(
					'styleNumber' => $style_number,
					'metal'       => $field( 'metal' ),
					'color'       => $field( 'color' ),
					'level'       => $field( 'level' ),
					'quality'     => $field( 'quality' ),
					// Ring size, when the customer picked one (OM prices
					// the stock size otherwise).
					'fingerSize'  => is_numeric( $field( 'fingerSize' ) ) ? (string) max( 0, min( 15, (float) $field( 'fingerSize' ) ) ) : '',
				)
			)
		);

		if ( is_wp_error( $quote ) || ! isset( $quote['price'] ) ) {
			wp_send_json_error( array( 'message' => is_wp_error( $quote ) ? $quote->get_error_message() : 'No price returned.' ) );
		}

		$retail = om_apply_markup( floatval( $quote['price'] ) );

		wp_send_json_success(
			array(
				'price_formatted' => om_format_price( $retail ),
				'price_raw'       => $retail,
				// The configuration OM actually priced (e.g. Platinum forces
				// White), so the dropdowns can be synced to match.
				'config'          => array(
					'metal'   => (string) ( $quote['metal'] ?? '' ),
					'color'   => (string) ( $quote['color'] ?? '' ),
					'level'   => (string) ( $quote['level'] ?? '' ),
					'quality' => (string) ( $quote['quality'] ?? '' ),
				),
			)
		);
	}
}
