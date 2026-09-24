<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles authentication and all requests to the Overnight Mountings
 * Product Catalog API. Credentials come from the admin settings page,
 * never hard-coded.
 */
class OM_API_Client {

	const AUTH_URL = 'https://auth.overnightmountings.com/oauth/token';
	const API_BASE = 'https://api.overnightmountings.com/api/v1/';
	const TOKEN_TRANSIENT = 'om_catalog_access_token';
	const AUTH_FAIL_TRANSIENT = 'om_catalog_auth_failed';
	const LINES_TRANSIENT = 'om_catalog_product_lines';

	/**
	 * Quotes are a snapshot of a daily metal-market price, so identical
	 * configurations are reused for a few minutes. This keeps repeated
	 * dropdown changes (and anyone hammering the public quote endpoint)
	 * from turning into one OM API call each.
	 */
	const QUOTE_CACHE_SECONDS = 300;

	/**
	 * Forget the cached token and any cached auth failure. Called when the
	 * credentials are saved, so new credentials take effect immediately.
	 */
	public static function clear_auth_cache() {
		delete_transient( self::TOKEN_TRANSIENT );
		delete_transient( self::AUTH_FAIL_TRANSIENT );
	}

	/**
	 * Delete every transient this plugin created (token, listings, product
	 * details, quotes, taxonomy). Used by the "Clear cache" admin action.
	 *
	 * @return int Number of cache entries removed.
	 */
	public static function clear_all_caches() {
		global $wpdb;
		$names = $wpdb->get_col(
			"SELECT option_name FROM {$wpdb->options}
			WHERE option_name LIKE '\\_transient\\_om\\_%'"
		);
		$count = 0;
		foreach ( $names as $name ) {
			if ( delete_transient( substr( $name, strlen( '_transient_' ) ) ) ) {
				$count++;
			}
		}
		return $count;
	}

	/**
	 * Get a valid access token, using the cached one if still fresh.
	 *
	 * @return string|WP_Error
	 */
	public static function get_token() {
		$cached = get_transient( self::TOKEN_TRANSIENT );
		if ( $cached ) {
			return $cached;
		}

		// A recent auth failure is cached briefly so misconfigured credentials
		// don't hammer OM's auth endpoint on every page view.
		$recent_failure = get_transient( self::AUTH_FAIL_TRANSIENT );
		if ( $recent_failure ) {
			return new WP_Error( 'om_auth_failed', $recent_failure );
		}

		$client_id     = get_option( 'om_client_id' );
		$client_secret = get_option( 'om_client_secret' );

		if ( empty( $client_id ) || empty( $client_secret ) ) {
			return new WP_Error( 'om_missing_credentials', __( 'Overnight Mountings API credentials are not set. Go to Settings > OM Catalog to add them.', 'om-catalog' ) );
		}

		$response = wp_remote_post(
			self::AUTH_URL,
			array(
				'timeout' => 15,
				'headers' => array(
					'Content-Type' => 'application/x-www-form-urlencoded',
				),
				'body'    => array(
					'grant_type'    => 'client_credentials',
					'client_id'     => $client_id,
					'client_secret' => $client_secret,
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$code = wp_remote_retrieve_response_code( $response );
		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 !== (int) $code || empty( $body['access_token'] ) ) {
			$message = isset( $body['error_description'] ) ? $body['error_description'] : 'Unknown auth error.';
			set_transient( self::AUTH_FAIL_TRANSIENT, $message, 5 * MINUTE_IN_SECONDS );
			return new WP_Error( 'om_auth_failed', $message );
		}

		$expires_in = isset( $body['expires_in'] ) ? (int) $body['expires_in'] : 3600;
		// Cache for slightly less than the real expiry so we never use a stale token.
		$cache_seconds = max( 60, $expires_in - 120 );

		set_transient( self::TOKEN_TRANSIENT, $body['access_token'], $cache_seconds );

		return $body['access_token'];
	}

	/**
	 * Make an authenticated GET request to the catalog API.
	 *
	 * @param string $path        Path relative to API_BASE, e.g. 'products/metadata'.
	 * @param array  $query       Query string args.
	 * @param bool   $retry_auth  Internal flag to allow one retry after a 401.
	 * @param bool   $retry_503   Internal flag to allow one retry after a 503
	 *                            (the pricing system can be briefly unreachable).
	 * @return array|WP_Error Decoded JSON body, or WP_Error.
	 */
	public static function request( $path, $query = array(), $retry_auth = true, $retry_503 = true ) {
		$token = self::get_token();
		if ( is_wp_error( $token ) ) {
			return $token;
		}

		$url = self::API_BASE . ltrim( $path, '/' );
		if ( ! empty( $query ) ) {
			// http_build_query() URL-encodes values; real filter values contain
			// spaces and ampersands ("Hidden Halo", "Clip & Ship"), which
			// add_query_arg() would pass through raw and corrupt the request.
			// The separator is explicit: some hosts set arg_separator.output
			// to "&amp;", which http_build_query() would otherwise use.
			$url .= '?' . http_build_query( $query, '', '&' );
		}

		$response = wp_remote_get(
			$url,
			array(
				'timeout' => 15,
				'headers' => array(
					'Authorization' => 'Bearer ' . $token,
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$code = wp_remote_retrieve_response_code( $response );

		// Token expired mid-cache-life: clear it and retry once with a fresh one.
		if ( 401 === (int) $code && $retry_auth ) {
			delete_transient( self::TOKEN_TRANSIENT );
			return self::request( $path, $query, false, $retry_503 );
		}

		// Per the API guide, a 503 means the pricing system was briefly
		// unreachable and should be retried.
		if ( 503 === (int) $code && $retry_503 ) {
			return self::request( $path, $query, $retry_auth, false );
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( $code < 200 || $code >= 300 ) {
			$message = isset( $body['error']['message'] ) ? $body['error']['message'] : 'Overnight Mountings API error (' . $code . ').';
			return new WP_Error( 'om_api_error', $message, array( 'status' => $code ) );
		}

		return $body;
	}

	/** Product line codes + names, e.g. engagement-rings, wedding-bands. */
	public static function get_product_lines() {
		return self::request( 'products/metadata' );
	}

	/**
	 * Active product lines as [ code => name ], from OM's own list.
	 *
	 * Front-end callers pass $fetch = false and only ever read the cache, so
	 * a visitor's page view never waits on this call; wp-admin (the settings
	 * page, the Elementor editor) passes true and refreshes it. Returns an
	 * empty array when nothing is cached yet or the API is unavailable.
	 *
	 * @param bool $fetch Call the API when the cache is empty.
	 * @return array
	 */
	public static function get_product_lines_map( $fetch = false ) {
		$cached = get_transient( self::LINES_TRANSIENT );
		if ( is_array( $cached ) ) {
			return $cached;
		}
		if ( 'none' === $cached || ! $fetch ) {
			return array();
		}

		$result = self::get_product_lines();
		$lines  = array();
		if ( ! is_wp_error( $result ) && ! empty( $result['products'] ) && is_array( $result['products'] ) ) {
			foreach ( $result['products'] as $line ) {
				$code = sanitize_title( (string) ( $line['code'] ?? '' ) );
				if ( '' !== $code ) {
					$lines[ $code ] = (string) ( $line['name'] ?? $code );
				}
			}
		}

		if ( empty( $lines ) ) {
			set_transient( self::LINES_TRANSIENT, 'none', 10 * MINUTE_IN_SECONDS );
			return array();
		}

		set_transient( self::LINES_TRANSIENT, $lines, 12 * HOUR_IN_SECONDS );
		return $lines;
	}

	/** List/search products for one line. $args supports style, shape, color, level, styleNumber, limit, offset, etc. */
	public static function get_products( $product_line, $args = array() ) {
		return self::request( 'products/' . $product_line, $args );
	}

	/**
	 * Fetch a single product's full detail by exact style number.
	 *
	 * parentsOnly=false is required: listings hide color/size variants by
	 * default, so a variant style number (linked from "Other Sizes / Carats")
	 * would otherwise come back empty. Results are cached briefly since
	 * product detail carries no pricing.
	 */
	public static function get_product_by_style( $product_line, $style_number ) {
		$cache_key = 'om_product_' . md5( $product_line . '|' . $style_number );
		$cached    = get_transient( $cache_key );
		if ( false !== $cached ) {
			return $cached;
		}

		$result = self::request(
			'products/' . $product_line,
			array(
				'styleNumber' => $style_number,
				'parentsOnly' => 'false',
				'limit'       => 1,
			)
		);

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		if ( empty( $result['products'][0] ) ) {
			return new WP_Error( 'om_not_found', __( 'Product not found.', 'om-catalog' ) );
		}

		$cache_minutes = max( 1, (int) get_option( 'om_listing_cache_minutes', 15 ) );
		set_transient( $cache_key, $result['products'][0], $cache_minutes * MINUTE_IN_SECONDS );

		return $result['products'][0];
	}

	/**
	 * Get a live wholesale quote for a configuration. Identical
	 * configurations are reused for QUOTE_CACHE_SECONDS; errors are not
	 * cached.
	 */
	public static function get_quotation( $product_line, $args ) {
		ksort( $args );
		$cache_key = 'om_quote_' . md5( $product_line . '|' . wp_json_encode( $args ) );
		$cached    = get_transient( $cache_key );
		if ( is_array( $cached ) ) {
			return $cached;
		}

		$quote = self::request( 'products/' . $product_line . '/quotation', $args );
		if ( ! is_wp_error( $quote ) && isset( $quote['price'] ) ) {
			set_transient( $cache_key, $quote, self::QUOTE_CACHE_SECONDS );
		}
		return $quote;
	}

	/** Navigation taxonomy (collections/categories) for one product line. */
	public static function get_line_metadata( $product_line ) {
		return self::request( 'products/' . $product_line . '/metadata' );
	}

	/**
	 * The line's taxonomy flattened into Elementor grouped-select options:
	 * [ [ 'label' => collection name, 'options' => [ style-value => label ] ], ... ]
	 *
	 * The option VALUE is the category's search_values joined with commas —
	 * exactly what the products endpoint's `style` filter accepts (a category
	 * like "Multi Row and Pave" searches as "Multi Row,Pave"). Subcategories
	 * become their own options. Cached 12 hours; a failed fetch is cached
	 * briefly so a missing key doesn't hammer the API from the editor.
	 *
	 * @param string $product_line Line code.
	 * @param bool   $fetch        Call the API when the cache is empty. The
	 *                             Elementor widget passes false on the front
	 *                             end, where the dropdown options are unused.
	 */
	public static function get_line_collections( $product_line, $fetch = true ) {
		$cache_key = 'om_line_collections_' . md5( $product_line );
		$cached    = get_transient( $cache_key );
		if ( false !== $cached ) {
			return is_array( $cached ) ? $cached : array();
		}
		if ( ! $fetch ) {
			return array();
		}

		$meta = self::get_line_metadata( $product_line );

		if ( is_wp_error( $meta ) || empty( $meta['collections'] ) || ! is_array( $meta['collections'] ) ) {
			set_transient( $cache_key, 'none', 10 * MINUTE_IN_SECONDS );
			return array();
		}

		$groups = array();
		foreach ( $meta['collections'] as $collection ) {
			$options = array();
			foreach ( (array) ( $collection['categories'] ?? array() ) as $category ) {
				$cat_name  = (string) ( $category['name'] ?? '' );
				$cat_value = implode( ',', (array) ( $category['search_values'] ?? array() ) );
				if ( '' !== $cat_value && '' !== $cat_name ) {
					$options[ $cat_value ] = $cat_name;
				}
				foreach ( (array) ( $category['subcategories'] ?? array() ) as $sub ) {
					$sub_name  = (string) ( $sub['name'] ?? '' );
					$sub_value = implode( ',', (array) ( $sub['search_values'] ?? array() ) );
					if ( '' !== $sub_value && '' !== $sub_name ) {
						$options[ $sub_value ] = $cat_name . ' / ' . $sub_name;
					}
				}
			}
			if ( ! empty( $options ) ) {
				$groups[] = array(
					'label'   => (string) ( $collection['name'] ?? '' ),
					'options' => $options,
				);
			}
		}

		set_transient( $cache_key, $groups, 12 * HOUR_IN_SECONDS );

		return $groups;
	}

	/**
	 * Top-level categories of a line as a flat [ style-value => label ] map,
	 * for the visitor-facing filter bar. Subcategory options carry a " / " in
	 * their label (see get_line_collections) and are skipped to keep the bar
	 * short.
	 */
	public static function get_line_filter_options( $product_line ) {
		$out = array();
		foreach ( self::get_line_collections( $product_line ) as $group ) {
			foreach ( $group['options'] as $value => $label ) {
				if ( false !== strpos( $label, ' / ' ) ) {
					continue;
				}
				// Two collections can share a category name ("Hidden Halo"
				// exists in Bridal Rings and Peg Heads) — qualify duplicates.
				if ( in_array( $label, $out, true ) ) {
					$label .= ' (' . $group['label'] . ')';
				}
				$out[ $value ] = $label;
			}
		}
		return $out;
	}

	/**
	 * Starting price of a product in its default configuration, for listing
	 * cards ("From $1,188"). Cached for 12 hours — it is an indication, the
	 * product page always re-quotes live.
	 *
	 * @return float|null Wholesale price, or null when unavailable.
	 */
	public static function get_card_price( $product_line, $style_number ) {
		$cache_key = 'om_cardprice_' . md5( $product_line . '|' . $style_number );
		$cached    = get_transient( $cache_key );
		if ( false !== $cached ) {
			return 'none' === $cached ? null : (float) $cached;
		}
		$quote = self::request( 'products/' . $product_line . '/quotation', array( 'styleNumber' => $style_number ) );
		if ( is_wp_error( $quote ) || ! isset( $quote['price'] ) ) {
			// Remember "no price" briefly so a broken product isn't re-quoted on every view.
			set_transient( $cache_key, 'none', 30 * MINUTE_IN_SECONDS );
			return null;
		}
		set_transient( $cache_key, (float) $quote['price'], 12 * HOUR_IN_SECONDS );
		return (float) $quote['price'];
	}

	/**
	 * Search loose diamonds (GET /products/diamonds). Results are cached
	 * for 10 minutes per query; the diamond catalog changes during the day.
	 *
	 * @param array $args origin, shape, color, clarity, cut, lab, carat,
	 *                    cost, sort_by, order, limit, offset, lot_number...
	 * @return array|WP_Error
	 */
	public static function search_diamonds( $args ) {
		ksort( $args );
		$cache_key = 'om_diamonds_' . md5( wp_json_encode( $args ) );
		$cached    = get_transient( $cache_key );
		if ( is_array( $cached ) ) {
			return $cached;
		}
		$result = self::request( 'products/diamonds', $args );
		if ( ! is_wp_error( $result ) ) {
			set_transient( $cache_key, $result, 10 * MINUTE_IN_SECONDS );
		}
		return $result;
	}

	/**
	 * One diamond by its lot number. The API's lot_number filter is a
	 * partial match, so the exact stone is picked from the results.
	 *
	 * @return array|WP_Error
	 */
	public static function get_diamond( $lot_number ) {
		$lot_number = trim( (string) $lot_number );
		if ( '' === $lot_number ) {
			return new WP_Error( 'om_not_found', __( 'Diamond not found.', 'om-catalog' ) );
		}
		$result = self::search_diamonds( array( 'lot_number' => $lot_number, 'limit' => 20 ) );
		if ( is_wp_error( $result ) ) {
			return $result;
		}
		foreach ( (array) ( $result['diamonds'] ?? array() ) as $diamond ) {
			if ( isset( $diamond['lot_number'] ) && 0 === strcasecmp( (string) $diamond['lot_number'], $lot_number ) ) {
				return $diamond;
			}
		}
		return new WP_Error( 'om_not_found', __( 'This diamond is no longer available.', 'om-catalog' ) );
	}
}
