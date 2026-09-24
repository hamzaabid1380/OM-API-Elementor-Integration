<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Keyword search for the catalog.
 *
 * Overnight Mountings' API has no text search (only exact style numbers),
 * so each product line gets a small local index: style number, title,
 * carat/variant name and first image of every design, built by walking the
 * listing 500 products per call and cached for 12 hours. Searches and
 * as-you-type suggestions then run against that index without API calls.
 */
class OM_Search {

	/** Safety cap on how much of a line is indexed (API calls = cap / 500). */
	const MAX_INDEXED = 6000;

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_ajax_om_suggest', array( $this, 'handle_suggest' ) );
		add_action( 'wp_ajax_nopriv_om_suggest', array( $this, 'handle_suggest' ) );
	}

	/**
	 * The line's search index: a list of [ s => style, t => title,
	 * v => variant, i => image URL ].
	 *
	 * @return array|WP_Error
	 */
	public static function get_index( $line ) {
		$key    = 'om_index_' . md5( $line );
		$cached = get_transient( $key );
		if ( is_array( $cached ) ) {
			return $cached;
		}

		// Another request is already building this index: don't start a
		// second walk of the catalog, just report "not ready" briefly.
		if ( get_transient( $key . '_lock' ) ) {
			return new WP_Error( 'om_index_building', __( 'Search is warming up, please try again in a moment.', 'om-catalog' ) );
		}
		set_transient( $key . '_lock', 1, MINUTE_IN_SECONDS );

		$index  = array();
		$offset = 0;
		$limit  = 500;
		do {
			$page = OM_API_Client::get_products( $line, array( 'limit' => $limit, 'offset' => $offset ) );
			if ( is_wp_error( $page ) ) {
				delete_transient( $key . '_lock' );
				return $page;
			}
			foreach ( (array) ( $page['products'] ?? array() ) as $product ) {
				if ( empty( $product['style_number'] ) ) {
					continue;
				}
				$index[] = array(
					's' => (string) $product['style_number'],
					't' => (string) ( $product['title'] ?? '' ),
					'v' => (string) ( $product['variant_name'] ?? '' ),
					'i' => ! empty( $product['images'][0] ) ? om_image_url( $product['images'][0] ) : '',
				);
			}
			$total   = (int) ( $page['total_count'] ?? 0 );
			$offset += $limit;
		} while ( $offset < $total && $offset < self::MAX_INDEXED );

		set_transient( $key, $index, 12 * HOUR_IN_SECONDS );
		delete_transient( $key . '_lock' );
		return $index;
	}

	/** Lower-case, accent-free, single-spaced text for matching. */
	private static function normalize( $text ) {
		$text = strtolower( remove_accents( (string) $text ) );
		return trim( preg_replace( '/\s+/', ' ', $text ) );
	}

	/**
	 * Search a line. Every word must appear in the title, style number or
	 * variant; exact and leading style-number matches rank first, then
	 * title-start matches.
	 *
	 * @return array|WP_Error Products shaped like API listing items.
	 */
	public static function search( $line, $query ) {
		$query = self::normalize( $query );
		if ( '' === $query ) {
			return array();
		}
		$index = self::get_index( $line );
		if ( is_wp_error( $index ) ) {
			return $index;
		}

		$words   = explode( ' ', $query );
		$results = array();
		foreach ( $index as $row ) {
			$style = self::normalize( $row['s'] );
			$title = self::normalize( $row['t'] );
			$hay   = $title . ' ' . $style . ' ' . self::normalize( $row['v'] );
			foreach ( $words as $word ) {
				if ( false === strpos( $hay, $word ) ) {
					continue 2;
				}
			}
			if ( $style === $query ) {
				$score = 0;
			} elseif ( 0 === strpos( $style, $query ) ) {
				$score = 1;
			} elseif ( 0 === strpos( $title, $query ) ) {
				$score = 2;
			} else {
				$score = 3;
			}
			$results[] = array( $score, $row );
		}

		usort(
			$results,
			static function ( $a, $b ) {
				return $a[0] <=> $b[0] ?: strnatcasecmp( $a[1]['t'], $b[1]['t'] );
			}
		);

		return array_map(
			static function ( $hit ) {
				$row = $hit[1];
				return array(
					'style_number' => $row['s'],
					'title'        => $row['t'],
					'variant_name' => $row['v'],
					'images'       => $row['i'] ? array( $row['i'] ) : array(),
				);
			},
			$results
		);
	}

	/**
	 * As-you-type suggestions for a catalog block. The block's signed
	 * attributes decide which lines may be searched.
	 */
	public function handle_suggest() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint.
		$json = isset( $_POST['atts'] ) ? (string) wp_unslash( $_POST['atts'] ) : '';
		$sig  = isset( $_POST['sig'] ) ? (string) wp_unslash( $_POST['sig'] ) : '';
		$line = isset( $_POST['line'] ) ? sanitize_title( wp_unslash( $_POST['line'] ) ) : '';
		$q    = isset( $_POST['q'] ) ? sanitize_text_field( wp_unslash( $_POST['q'] ) ) : '';
		// phpcs:enable

		if ( '' === $json || ! hash_equals( OM_Shortcodes::sign_atts( $json ), $sig ) ) {
			wp_send_json_error( array( 'message' => 'Invalid catalog block.' ), 400 );
		}
		$atts  = json_decode( $json, true );
		$lines = array_filter( array_map( 'sanitize_title', explode( ',', (string) ( ! empty( $atts['lines'] ) ? $atts['lines'] : ( $atts['line'] ?? '' ) ) ) ) );
		if ( ! in_array( $line, $lines, true ) || mb_strlen( $q ) < 2 ) {
			wp_send_json_success( array( 'items' => array() ) );
		}

		$hits = self::search( $line, $q );
		if ( is_wp_error( $hits ) ) {
			wp_send_json_success( array( 'items' => array(), 'message' => $hits->get_error_message() ) );
		}

		$items = array();
		foreach ( array_slice( $hits, 0, 6 ) as $product ) {
			$items[] = array(
				'title'   => $product['title'],
				'variant' => $product['variant_name'],
				'style'   => $product['style_number'],
				'image'   => $product['images'][0] ?? '',
				'url'     => om_product_url( $line, $product['style_number'] ),
			);
		}
		wp_send_json_success(
			array(
				'items' => $items,
				'total' => count( $hits ),
			)
		);
	}
}
