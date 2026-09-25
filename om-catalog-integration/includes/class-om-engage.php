<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Engagement features: product view counts (for "Most viewed" sorting and
 * "Popular" badges) and the compare table.
 *
 * Views are counted by a small beacon the product page sends once per
 * visitor session (so full-page caching doesn't hide them), kept in one
 * option capped to the 3,000 most viewed designs.
 */
class OM_Engage {

	const VIEWS_OPTION = 'om_view_counts';
	const MAX_TRACKED  = 3000;

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_ajax_om_track_view', array( $this, 'handle_track_view' ) );
		add_action( 'wp_ajax_nopriv_om_track_view', array( $this, 'handle_track_view' ) );
		add_action( 'wp_ajax_om_compare', array( $this, 'handle_compare' ) );
		add_action( 'wp_ajax_nopriv_om_compare', array( $this, 'handle_compare' ) );
	}

	/* ---------- Views ---------- */

	/** Count one product view (from the product page's beacon). */
	public function handle_track_view() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- anonymous counter, see class doc.
		$line  = isset( $_POST['line'] ) ? sanitize_title( wp_unslash( $_POST['line'] ) ) : '';
		$style = isset( $_POST['style'] ) ? strtoupper( sanitize_text_field( wp_unslash( $_POST['style'] ) ) ) : '';
		// phpcs:enable
		if ( '' === $line || '' === $style || strlen( $style ) > 40 || ! preg_match( '/^[A-Z0-9][A-Z0-9.\/_-]*$/', $style ) ) {
			wp_send_json_error( null, 400 );
		}
		// A little flood protection: at most 60 counted views per IP per hour.
		$ip   = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		$rate = 'om_view_rate_' . md5( $ip );
		$n    = (int) get_transient( $rate );
		if ( $n >= 60 ) {
			wp_send_json_success();
		}
		set_transient( $rate, $n + 1, HOUR_IN_SECONDS );

		$counts = get_option( self::VIEWS_OPTION, array() );
		$counts = is_array( $counts ) ? $counts : array();
		$key    = $line . '|' . $style;
		$counts[ $key ] = ( $counts[ $key ] ?? 0 ) + 1;
		if ( count( $counts ) > self::MAX_TRACKED ) {
			arsort( $counts );
			$counts = array_slice( $counts, 0, self::MAX_TRACKED, true );
		}
		update_option( self::VIEWS_OPTION, $counts, false );
		wp_send_json_success();
	}

	/** View counts for one line: style => views. */
	public static function views( $line ) {
		static $cache = array();
		if ( isset( $cache[ $line ] ) ) {
			return $cache[ $line ];
		}
		$out    = array();
		$counts = get_option( self::VIEWS_OPTION, array() );
		foreach ( is_array( $counts ) ? $counts : array() as $key => $n ) {
			list( $l, $s ) = array_pad( explode( '|', (string) $key, 2 ), 2, '' );
			if ( $l === $line ) {
				$out[ $s ] = (int) $n;
			}
		}
		arsort( $out );
		$cache[ $line ] = $out;
		return $out;
	}

	/**
	 * The line's popular designs: the most viewed 12 with at least
	 * $min views.
	 *
	 * @return string[] Upper-case style numbers.
	 */
	public static function popular( $line, $min = 5 ) {
		return array_keys( array_slice( array_filter( self::views( $line ), static function ( $n ) use ( $min ) { return $n >= $min; } ), 0, 12, true ) );
	}

	/**
	 * Style numbers in "Most viewed" order: most viewed first, then the
	 * rest in Overnight Mountings' own order. Unfiltered, the whole line
	 * comes from the search index; with filters, the first 500 matching
	 * designs from the API. Cached 10 minutes.
	 *
	 * @param string $line
	 * @param array  $args Listing filters (no limit/offset).
	 * @return string[]|WP_Error
	 */
	public static function popular_order( $line, $args ) {
		unset( $args['limit'], $args['offset'], $args['sortBy'], $args['order'] );
		$args = array_filter( $args );
		$key  = 'om_poporder_' . md5( $line . '|' . wp_json_encode( $args ) );
		$hit  = get_transient( $key );
		if ( is_array( $hit ) ) {
			return $hit;
		}
		if ( ! $args ) {
			$index = OM_Search::get_index( $line );
			if ( is_wp_error( $index ) ) {
				return $index;
			}
			$styles = array_map( 'strval', wp_list_pluck( $index, 's' ) );
		} else {
			$data = OM_Shortcodes::fetch_listing( $line, $args + array( 'limit' => 500, 'offset' => 0 ) );
			if ( is_wp_error( $data ) ) {
				return $data;
			}
			$styles = array_map( 'strval', wp_list_pluck( (array) ( $data['products'] ?? array() ), 'style_number' ) );
		}
		$views = self::views( $line );
		$rank  = array_flip( $styles );
		usort(
			$styles,
			static function ( $a, $b ) use ( $views, $rank ) {
				$va = $views[ strtoupper( $a ) ] ?? 0;
				$vb = $views[ strtoupper( $b ) ] ?? 0;
				return $vb <=> $va ?: $rank[ $a ] <=> $rank[ $b ];
			}
		);
		set_transient( $key, $styles, 10 * MINUTE_IN_SECONDS );
		return $styles;
	}

	/**
	 * One page of products for a list of style numbers, in that order.
	 *
	 * @return array Products.
	 */
	public static function products_in_order( $line, $styles ) {
		if ( ! $styles ) {
			return array();
		}
		$data = OM_Shortcodes::fetch_listing( $line, array( 'styleNumber' => implode( ',', $styles ), 'parentsOnly' => 'false', 'limit' => min( 500, count( $styles ) ) ) );
		if ( is_wp_error( $data ) ) {
			return $data;
		}
		$by = array();
		foreach ( (array) ( $data['products'] ?? array() ) as $product ) {
			$by[ strtoupper( (string) ( $product['style_number'] ?? '' ) ) ] = $product;
		}
		$out = array();
		foreach ( $styles as $style ) {
			if ( isset( $by[ strtoupper( $style ) ] ) ) {
				$out[] = $by[ strtoupper( $style ) ];
			}
		}
		return $out;
	}

	/* ---------- Compare ---------- */

	/**
	 * The compare table for up to 4 designs (possibly from different
	 * lines): photo, name, style, carat, centre stone, stones, metals,
	 * colours, settings, starting price, video.
	 */
	public function handle_compare() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint.
		$raw = isset( $_POST['items'] ) && is_array( $_POST['items'] ) ? wp_unslash( $_POST['items'] ) : array();
		// phpcs:enable
		require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
		$items = array();
		foreach ( array_slice( $raw, 0, 4 ) as $item ) {
			$line  = sanitize_title( (string) ( $item['line'] ?? '' ) );
			$style = sanitize_text_field( (string) ( $item['style'] ?? '' ) );
			if ( '' === $line || '' === $style ) {
				continue;
			}
			$product = OM_API_Client::get_product_by_style( $line, $style );
			if ( is_array( $product ) && ! is_wp_error( $product ) ) {
				$items[] = array( $line, $style, $product );
			}
		}
		if ( ! $items ) {
			wp_send_json_error( array( 'message' => __( 'Nothing to compare yet.', 'om-catalog' ) ) );
		}

		$priced = om_markup_is_configured();
		$rows   = array(
			'photo'  => '',
			'name'   => __( 'Design', 'om-catalog' ),
			'price'  => $priced ? __( 'Starting price', 'om-catalog' ) : '',
			'carat'  => __( 'Carat', 'om-catalog' ),
			'centre' => __( 'Centre stone', 'om-catalog' ),
			'stones' => __( 'Stones', 'om-catalog' ),
			'metals' => __( 'Metals', 'om-catalog' ),
			'colors' => __( 'Metal colours', 'om-catalog' ),
			'levels' => __( 'Settings', 'om-catalog' ),
			'video'  => __( 'Video', 'om-catalog' ),
			'link'   => '',
		);
		$rows   = array_filter( $rows, static function ( $label, $key ) { return '' !== $label || in_array( $key, array( 'photo', 'link' ), true ); }, ARRAY_FILTER_USE_BOTH );

		$cells = array();
		foreach ( $items as list( $line, $style, $product ) ) {
			$centre = '';
			$count  = 0;
			foreach ( (array) ( $product['stone_breakdown'] ?? array() ) as $stone ) {
				$count += (int) ( $stone['quantity'] ?? 0 );
				if ( '' === $centre && 1 === (int) ( $stone['quantity'] ?? 0 ) ) {
					$centre = trim( ( isset( $stone['carat'] ) ? $stone['carat'] . ' ct ' : '' ) . ( $stone['shape'] ?? '' ) );
				}
			}
			$price = '';
			if ( $priced ) {
				$wholesale = OM_API_Client::get_card_price( $line, $style );
				/* translators: %s: price. */
				$price = null !== $wholesale ? sprintf( __( 'From %s', 'om-catalog' ), om_format_price_short( om_apply_markup( $wholesale ) ) ) : '—';
			}
			$url     = om_product_url( $line, $style );
			$image   = om_card_images( $product )[0];
			$title   = (string) ( $product['title'] ?? $style );
			$cells[] = array(
				'photo'  => $image ? '<a href="' . esc_url( $url ) . '" tabindex="-1"><img src="' . esc_url( $image ) . '" alt="' . esc_attr( $title ) . '" loading="lazy" /></a>' : '',
				'name'   => '<a class="om-compare-name" href="' . esc_url( $url ) . '">' . esc_html( $title ) . '</a><span class="om-compare-style">' . esc_html( sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $style ) ) . '</span>',
				'price'  => esc_html( $price ),
				'carat'  => esc_html( (string) ( $product['variant_name'] ?? '—' ) ),
				'centre' => esc_html( '' !== $centre ? $centre : '—' ),
				'stones' => esc_html( $count ? (string) $count : '—' ),
				'metals' => esc_html( implode( ', ', (array) ( $product['metals'] ?? array() ) ) ?: '—' ),
				'colors' => esc_html( implode( ', ', (array) ( $product['colors'] ?? array() ) ) ?: '—' ),
				'levels' => esc_html( implode( ', ', (array) ( $product['levels'] ?? array() ) ) ?: '—' ),
				'video'  => esc_html( om_product_videos( $product ) ? __( 'Yes', 'om-catalog' ) : '—' ),
				'link'   => '<a class="om-btn om-btn--solid om-compare-view" href="' . esc_url( $url ) . '">' . esc_html__( 'View', 'om-catalog' ) . '</a><button type="button" class="om-compare-remove" data-om-line="' . esc_attr( $line ) . '" data-om-style="' . esc_attr( $style ) . '">' . esc_html__( 'Remove', 'om-catalog' ) . '</button>',
			);
		}

		ob_start();
		echo '<div class="om-compare-scroll"><table class="om-compare-table"><caption class="om-visually-hidden">' . esc_html__( 'Designs compared side by side', 'om-catalog' ) . '</caption>';
		foreach ( $rows as $key => $label ) {
			echo '<tr class="om-compare-row om-compare-row--' . esc_attr( $key ) . '">';
			echo '' !== $label ? '<th scope="row">' . esc_html( $label ) . '</th>' : '<td class="om-compare-corner"></td>';
			foreach ( $cells as $cell ) {
				echo '<td>' . $cell[ $key ] . '</td>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
			}
			echo '</tr>';
		}
		echo '</table></div>';
		wp_send_json_success( array( 'html' => ob_get_clean() ) );
	}
}
