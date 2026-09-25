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
 * - set:     "Complete the set" — for a ring, matching wedding bands (and
 *   for a band, engagement rings it pairs with). Overnight Mountings has no
 *   "matching band" field, so pairs come from, in order: the pairs listed
 *   in Settings, the same design family (style number root), the same
 *   style (Halo, Solitaire...) in the metal colour picked, then the most
 *   viewed designs of the other line.
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
				// Card hover: lift, zoom, none; '' = Settings default.
				'card_hover'       => '',
				'compare'          => '',
				// "Complete the set": the line to pair with ('' = automatic),
				// a line under the title (' ' = none), and an "Ask about
				// this set" link on each card.
				'set_line'         => '',
				'subtitle'         => '',
				'set_inquiry'      => 'yes',
				'set_price'        => 'yes',
			),
			$atts,
			'om_related'
		);

		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );

		$source  = in_array( $atts['source'], array( 'related', 'recent', 'picked', 'set' ), true ) ? $atts['source'] : 'related';
		$count   = max( 1, min( 12, (int) $atts['count'] ) );
		$columns = '' !== (string) $atts['columns'] ? max( 1, min( 6, (int) $atts['columns'] ) ) : 0;
		$layout  = 'carousel' === $atts['layout'] ? 'carousel' : 'grid';
		$titles  = array(
			'related' => __( 'You might also like', 'om-catalog' ),
			'recent'  => __( 'Recently viewed', 'om-catalog' ),
			'picked'  => __( 'Featured designs', 'om-catalog' ),
			'set'     => __( 'Complete the set', 'om-catalog' ),
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

		if ( 'set' === $source ) {
			return $this->render_set( $atts, $line, $style, $current && ! is_wp_error( $current ) ? $current : array(), $count, $title, $classes, $attrs, $card_layout, $arrows );
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

	/* ---------- Complete the set ---------- */

	/** Whether a line holds bands (wedding bands, anniversary bands...). */
	public static function is_band_line( $line ) {
		return (bool) preg_match( '/band|wedding/i', (string) $line );
	}

	/**
	 * The line to pair a product with: bands for rings, rings for bands.
	 *
	 * @return string '' when there isn't one.
	 */
	public static function set_target_line( $line, $wanted = '' ) {
		$wanted = sanitize_title( (string) $wanted );
		if ( '' !== $wanted && $wanted !== $line ) {
			return $wanted;
		}
		$lines = array_keys( OM_API_Client::get_product_lines_map() );
		if ( ! $lines ) {
			$lines = array( 'engagement-rings', 'wedding-bands' );
		}
		$band = self::is_band_line( $line );
		foreach ( $lines as $code ) {
			if ( $code === $line ) {
				continue;
			}
			if ( $band ? preg_match( '/engagement|bridal|semi|mounting/i', $code ) : self::is_band_line( $code ) ) {
				return $code;
			}
		}
		return '';
	}

	/**
	 * Pairs from Settings > Complete the set, one per line:
	 * "80285-04 = 12345-01, 12345-02". Works both ways.
	 *
	 * @return string[] Upper-case style numbers paired with $style.
	 */
	public static function listed_pairs( $style ) {
		$style = strtoupper( trim( (string) $style ) );
		$out   = array();
		foreach ( preg_split( '/\r\n|\r|\n/', (string) get_option( 'om_set_pairs', '' ) ) as $row ) {
			if ( false === strpos( $row, '=' ) ) {
				continue;
			}
			list( $left, $right ) = array_map( 'trim', explode( '=', $row, 2 ) );
			$left  = array_filter( array_map( 'strtoupper', array_map( 'trim', explode( ',', $left ) ) ), 'strlen' );
			$right = array_filter( array_map( 'strtoupper', array_map( 'trim', explode( ',', $right ) ) ), 'strlen' );
			if ( in_array( $style, $left, true ) ) {
				$out = array_merge( $out, $right );
			} elseif ( in_array( $style, $right, true ) ) {
				$out = array_merge( $out, $left );
			}
		}
		return array_values( array_unique( $out ) );
	}

	/**
	 * A style number's design-family root: "ER-80285-04Y" → "80285",
	 * "80285B-2" → "80285". Empty when there's no number to go on.
	 */
	public static function style_root( $style ) {
		return preg_match( '/(\d{3,})/', (string) $style, $m ) ? $m[1] : '';
	}

	/** The metal colour on the page: ?om_color, else Platinum → White. */
	private static function requested_color() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- display only.
		$color = isset( $_GET['om_color'] ) ? sanitize_text_field( wp_unslash( $_GET['om_color'] ) ) : '';
		$metal = isset( $_GET['om_metal'] ) ? sanitize_text_field( wp_unslash( $_GET['om_metal'] ) ) : '';
		// phpcs:enable
		if ( '' === $color && false !== stripos( $metal, 'platinum' ) ) {
			$color = 'White';
		}
		return array( mb_substr( $color, 0, 30 ), mb_substr( $metal, 0, 30 ) );
	}

	/**
	 * Designs from $target to complete the set with $product.
	 *
	 * @return array Products.
	 */
	public function set_products( $line, $style, $product, $target, $count, $color = '' ) {
		$out  = array();
		$seen = array();
		$add  = function ( $list ) use ( &$out, &$seen, $count ) {
			foreach ( (array) $list as $candidate ) {
				$sn = strtoupper( (string) ( $candidate['style_number'] ?? '' ) );
				if ( '' === $sn || isset( $seen[ $sn ] ) || count( $out ) >= $count ) {
					continue;
				}
				$seen[ $sn ] = true;
				$out[]       = $candidate;
			}
		};

		// 1. Pairs the jeweller listed.
		$listed = self::listed_pairs( $style );
		if ( $listed ) {
			$add( $this->picked( $target, implode( ',', $listed ), $count ) );
		}

		// 2. The same design family, from the other line's search index
		// (only when it is already built; the warmer keeps it fresh).
		$root = self::style_root( $style );
		if ( count( $out ) < $count && '' !== $root ) {
			$index  = get_transient( 'om_index_' . md5( $target ) );
			$family = array();
			foreach ( is_array( $index ) ? $index : array() as $item ) {
				if ( self::style_root( $item['s'] ?? '' ) === $root ) {
					$family[] = (string) $item['s'];
				}
				if ( count( $family ) >= $count ) {
					break;
				}
			}
			if ( $family ) {
				$add( $this->picked( $target, implode( ',', $family ), $count ) );
			}
		}

		// 3. The same style (Halo, Solitaire...), in the colour picked.
		if ( count( $out ) < $count ) {
			foreach ( array( 'collection', 'style', 'category' ) as $key ) {
				if ( ! empty( $product[ $key ] ) && is_string( $product[ $key ] ) ) {
					if ( '' !== $color ) {
						$add( $this->listing( $target, array( 'style' => $product[ $key ], 'color' => $color, 'limit' => $count * 2 ) ) );
					}
					$add( $this->listing( $target, array( 'style' => $product[ $key ], 'limit' => $count * 2 ) ) );
					break;
				}
			}
		}

		// 4. The other line's most viewed, then its own order.
		if ( count( $out ) < $count ) {
			$popular = class_exists( 'OM_Engage' ) ? OM_Engage::popular( $target, 1 ) : array();
			if ( $popular ) {
				$add( $this->picked( $target, implode( ',', array_slice( $popular, 0, $count * 2 ) ), $count * 2 ) );
			}
		}
		if ( count( $out ) < $count ) {
			$add( $this->listing( $target, '' !== $color ? array( 'color' => $color, 'limit' => $count * 2 ) : array( 'limit' => $count * 2 ) ) );
		}
		if ( count( $out ) < $count ) {
			$add( $this->listing( $target, array( 'limit' => $count * 2 ) ) );
		}
		return $out;
	}

	/** The "Complete the set" row. */
	private function render_set( $atts, $line, $style, $product, $count, $title, $classes, $attrs, $card_layout, $arrows ) {
		$target = self::set_target_line( $line, $atts['set_line'] );
		if ( '' === $target ) {
			return '';
		}
		list( $color, $metal ) = self::requested_color();
		$products = $this->set_products( $line, $style, $product, $target, $count, $color );
		if ( ! $products ) {
			return '';
		}

		$band     = self::is_band_line( $target );
		$subtitle = '' === (string) $atts['subtitle']
			? ( $band ? __( 'Wedding bands chosen to sit beautifully with this ring. They follow the metal you pick.', 'om-catalog' ) : __( 'Engagement rings this band pairs with. They follow the metal you pick.', 'om-catalog' ) )
			: trim( (string) $atts['subtitle'] );
		$prices   = 'yes' === $atts['show_prices'] && om_markup_is_configured();
		$with     = $prices && 'yes' === $atts['set_price'] && '' !== $style ? $line . '|' . $style : '';

		$card_opts = om_card_options( $atts );
		ob_start();
		printf( '<section class="%s"%s data-om-set-line="%s">', esc_attr( $classes ), $attrs, esc_attr( $target ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- built from ints.
		echo $this->heading( $title, $arrows ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in heading().
		if ( '' !== $subtitle ) {
			echo '<p class="om-set-sub">' . esc_html( $subtitle ) . '</p>';
		}
		echo '<div class="om-related-track om-catalog-grid om-layout-' . esc_attr( $card_layout ) . '"' . ( $prices ? ' data-om-prices="' . esc_attr( $target ) . '"' : '' ) . ( '' !== $with ? ' data-om-set-with="' . esc_attr( $with ) . '"' : '' ) . ( $card_opts['quick_view'] ? om_quick_view_attr( $atts ) : '' ) . '>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped here / in om_quick_view_attr().
		foreach ( $products as $item ) {
			$sn   = (string) ( $item['style_number'] ?? '' );
			$link = om_product_url( $target, $sn );
			if ( '' !== $color ) {
				$link = add_query_arg( 'om_color', rawurlencode( $color ), $link );
			}
			if ( '' !== $metal ) {
				$link = add_query_arg( 'om_metal', rawurlencode( $metal ), $link );
			}
			$extra = array();
			if ( '' !== $with ) {
				$extra[] = '<p class="om-card-set-price" data-om-style="' . esc_attr( $sn ) . '" aria-live="polite"></p>';
			}
			if ( 'yes' === $atts['set_inquiry'] && '' !== $style ) {
				$extra[] = '<a class="om-set-ask" href="' . esc_attr( '#om-inquiry?subject=' . rawurlencode( __( 'Bridal set', 'om-catalog' ) ) . '&pair=' . rawurlencode( $target . '|' . $sn ) ) . '" data-om-pair-title="' . esc_attr( (string) ( $item['title'] ?? $sn ) ) . '">' . esc_html__( 'Ask about this set', 'om-catalog' ) . '</a>';
			}
			echo om_render_card( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
				$item,
				$target,
				array(
					'link'         => $link,
					'prices'       => $prices,
					'color'        => $color,
					'color_images' => true,
					'after'        => implode( '', $extra ),
				) + $card_opts
			);
		}
		echo '</div></section>';
		return ob_get_clean();
	}
}
