<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Product rows for below the product page: [om_related] shortcode and the
 * "OM Related Products" Elementor widget.
 *
 * Sources:
 * - related: designs like the one being viewed — same product line, the
 *   same collection/centre-stone shape where the product says, never the
 *   product itself or its own size variants.
 * - recent:  what this visitor looked at before. Kept in the visitor's own
 *   browser (localStorage), so it works on cached pages and nothing is
 *   stored on the server; the row fills in with JavaScript.
 * - picked:  a hand-picked list of style numbers.
 */
class OM_Related {

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_shortcode( 'om_related', array( $this, 'shortcode' ) );
	}

	public function shortcode( $atts ) {
		return $this->render( (array) $atts );
	}

	/**
	 * @param array $atts source (related|recent|picked), title, count,
	 *                    columns, layout (grid|carousel), line, styles,
	 *                    show_prices.
	 */
	public function render( $atts ) {
		$atts = shortcode_atts(
			array(
				'source'      => 'related',
				'title'       => '',
				'count'       => 4,
				// Shortcode only; the Elementor widget sets columns per device.
				'columns'     => '',
				'layout'      => 'grid',
				'line'        => '',
				'styles'      => '',
				'show_prices' => '',
				// Card design: classic, editorial, boxed, overlay (as the grid).
				'card_layout' => 'classic',
				'show_variant' => 'yes',
				'show_arrows' => 'yes',
				// Carousel autoplay interval in seconds (0 = off).
				'autoplay'    => 0,
				// Card extras, as on the listing grid (see om_card_options()).
				'quick_view'       => '',
				'qv_text'          => '',
				'qv_style'         => 'bar',
				'qv_mobile'        => '',
				'qv_parts'         => 'price,options,description,meta,builder',
				'qv_video'         => 'first',
				'qv_link_text'     => '',
				'card_video'       => 'yes',
				'video_badge'      => 'icon',
				'video_badge_text' => '',
				'video_badge_pos'  => 'tr',
			),
			$atts,
			'om_related'
		);

		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );

		$source  = in_array( $atts['source'], array( 'related', 'recent', 'picked' ), true ) ? $atts['source'] : 'related';
		$count   = max( 1, min( 12, (int) $atts['count'] ) );
		$columns = '' !== (string) $atts['columns'] ? max( 1, min( 6, (int) $atts['columns'] ) ) : 0;
		$layout  = 'carousel' === $atts['layout'] ? 'carousel' : 'grid';
		$titles  = array(
			'related' => __( 'You might also like', 'om-catalog' ),
			'recent'  => __( 'Recently viewed', 'om-catalog' ),
			'picked'  => __( 'Featured designs', 'om-catalog' ),
		);
		// Empty = default title; whitespace only = no title.
		$title = '' === (string) $atts['title'] ? $titles[ $source ] : trim( (string) $atts['title'] );

		// The product being viewed, if this is a product page.
		$rewrites = OM_Rewrites::instance();
		$current  = $rewrites->is_product_request() ? $rewrites->get_current_product() : null;
		$line     = $current && ! is_wp_error( $current ) ? $rewrites->get_current_line() : sanitize_title( (string) $atts['line'] );
		$style    = $current && ! is_wp_error( $current ) ? $rewrites->get_current_style() : '';
		if ( '' === $line ) {
			$line = 'engagement-rings';
		}

		$card_layout = in_array( $atts['card_layout'], array( 'classic', 'editorial', 'boxed', 'overlay' ), true ) ? $atts['card_layout'] : 'classic';
		$arrows      = 'carousel' === $layout && 'yes' === $atts['show_arrows'];
		$autoplay    = 'carousel' === $layout ? max( 0, min( 30, (int) $atts['autoplay'] ) ) : 0;

		$classes = 'om-related om-related--' . $source . ' om-related--' . $layout . ( 'yes' === $atts['show_variant'] ? '' : ' om-related--no-variant' );
		$attrs   = ( $columns ? ' style="--om-related-columns:' . (int) $columns . ';"' : '' ) . ( $autoplay ? ' data-om-autoplay="' . (int) $autoplay . '"' : '' );

		if ( 'recent' === $source ) {
			// Filled in by the script from this visitor's history; stays
			// hidden when there's nothing to show.
			return sprintf(
				'<section class="%s"%s data-om-recent="%d" data-om-exclude="%s" hidden>%s<div class="om-related-track om-catalog-grid om-layout-%s"></div>%s</section>',
				esc_attr( $classes ),
				$attrs,
				$count,
				esc_attr( $style ),
				$this->heading( $title, $arrows ),
				esc_attr( $card_layout ),
				'' // Carousel arrows are part of the heading.
			);
		}

		$products = 'picked' === $source
			? $this->picked( $line, (string) $atts['styles'], $count )
			: $this->related( $line, $style, $current && ! is_wp_error( $current ) ? $current : array(), $count );

		if ( ! $products ) {
			return '';
		}

		$prices = 'yes' === $atts['show_prices'] && om_markup_is_configured();

		ob_start();
		printf( '<section class="%s"%s>', esc_attr( $classes ), $attrs ); // phpcs:ignore WordPress.Security.EscapeOutput -- built from ints.
		echo $this->heading( $title, $arrows ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in heading().
		$card_opts = om_card_options( $atts );
		echo '<div class="om-related-track om-catalog-grid om-layout-' . esc_attr( $card_layout ) . '"' . ( $prices ? ' data-om-prices="' . esc_attr( $line ) . '"' : '' ) . ( $card_opts['quick_view'] ? om_quick_view_attr( $atts ) : '' ) . '>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped here / in om_quick_view_attr().
		foreach ( $products as $product ) {
			echo om_render_card( $product, $line, array( 'prices' => $prices ) + $card_opts ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
		}
		echo '</div></section>';
		return ob_get_clean();
	}

	private function heading( $title, $arrows ) {
		$html = '<div class="om-related-head">' . ( '' !== trim( $title ) ? '<h2 class="om-related-title">' . esc_html( $title ) . '</h2>' : '<span></span>' );
		if ( $arrows ) {
			$html .= '<div class="om-related-nav"><button type="button" class="om-related-prev" aria-label="' . esc_attr__( 'Previous', 'om-catalog' ) . '">&lsaquo;</button><button type="button" class="om-related-next" aria-label="' . esc_attr__( 'Next', 'om-catalog' ) . '">&rsaquo;</button></div>';
		}
		return $html . '</div>';
	}

	/** Cached product listing call. */
	private function listing( $line, $args ) {
		ksort( $args );
		$key    = 'om_rel_' . md5( $line . '|' . wp_json_encode( $args ) );
		$cached = get_transient( $key );
		if ( is_array( $cached ) ) {
			return $cached;
		}
		$result = OM_API_Client::get_products( $line, $args );
		$list   = is_wp_error( $result ) ? array() : (array) ( $result['products'] ?? array() );
		set_transient( $key, $list, ( is_wp_error( $result ) ? 10 : 12 * 60 ) * MINUTE_IN_SECONDS );
		return $list;
	}

	private function related( $line, $style, $product, $count ) {
		// Never suggest the product itself or its own carat/size variants.
		$skip = array( strtoupper( $style ) );
		foreach ( (array) ( $product['product_variants'] ?? array() ) as $variant ) {
			if ( ! empty( $variant['style_number'] ) ) {
				$skip[] = strtoupper( (string) $variant['style_number'] );
			}
		}

		// Most specific first: the product's collection, then its centre
		// shape, then simply the same line.
		$queries = array();
		foreach ( array( 'collection', 'style', 'category' ) as $key ) {
			if ( ! empty( $product[ $key ] ) && is_string( $product[ $key ] ) ) {
				$queries[] = array( 'style' => $product[ $key ] );
				break;
			}
		}
		foreach ( (array) ( $product['stone_breakdown'] ?? array() ) as $stone ) {
			if ( ! empty( $stone['shape'] ) && 1 === (int) ( $stone['quantity'] ?? 0 ) ) {
				$queries[] = array( 'shape' => (string) $stone['shape'] );
				break;
			}
		}
		$queries[] = array();

		$out = array();
		foreach ( $queries as $query ) {
			foreach ( $this->listing( $line, $query + array( 'limit' => $count * 3 ) ) as $candidate ) {
				$sn = strtoupper( (string) ( $candidate['style_number'] ?? '' ) );
				if ( '' === $sn || in_array( $sn, $skip, true ) ) {
					continue;
				}
				$skip[] = $sn;
				$out[]  = $candidate;
				if ( count( $out ) >= $count ) {
					return $out;
				}
			}
		}
		return $out;
	}

	private function picked( $line, $styles, $count ) {
		$styles = implode( ',', array_filter( array_map( 'trim', explode( ',', $styles ) ), 'strlen' ) );
		if ( '' === $styles ) {
			return array();
		}
		return array_slice( $this->listing( $line, array( 'styleNumber' => $styles, 'parentsOnly' => 'false', 'limit' => 50 ) ), 0, $count );
	}
}
