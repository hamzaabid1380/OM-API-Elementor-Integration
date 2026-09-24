<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Has a retail markup been configured yet? Until it has, no price is shown
 * anywhere on the front end — the API returns wholesale prices, and showing
 * those to customers would be worse than showing none.
 */
function om_markup_is_configured() {
	$value = floatval( get_option( 'om_markup_value', 0 ) );
	return $value > 0;
}

/**
 * Text shown in place of a price until the markup is configured.
 */
function om_price_placeholder() {
	return __( 'Call for pricing', 'om-catalog' );
}

/**
 * Apply the admin-configured markup to a wholesale price from the API.
 *
 * @param float $wholesale_price
 * @return float Retail price, rounded to 2 decimals.
 */
function om_apply_markup( $wholesale_price ) {
	$type  = get_option( 'om_markup_type', 'percentage' );
	$value = floatval( get_option( 'om_markup_value', 0 ) );

	if ( 'multiplier' === $type ) {
		$multiplier = $value > 0 ? $value : 1;
		$retail     = $wholesale_price * $multiplier;
	} else {
		// Percentage on top of wholesale, e.g. 120 => wholesale * 2.2
		$retail = $wholesale_price * ( 1 + ( $value / 100 ) );
	}

	return round( $retail, 2 );
}

/**
 * Format a price for display, e.g. $1,234.00
 */
function om_format_price( $price ) {
	return '$' . number_format_i18n( $price, 2 );
}

/**
 * Style numbers can contain "/" (carat variants like "85121-1/2"), which
 * cannot survive as a path segment — encoded slashes (%2F) are rejected or
 * mangled by most servers. Swap them for "~" (URL-safe, never seen in OM
 * style numbers) in URLs and back on read.
 */
function om_style_slug( $style_number ) {
	return rawurlencode( str_replace( '/', '~', (string) $style_number ) );
}

function om_style_from_slug( $slug ) {
	return str_replace( '~', '/', (string) $slug );
}

/**
 * Canonical URL of a product page.
 */
function om_product_url( $product_line, $style_number ) {
	return home_url( '/catalog/' . $product_line . '/' . om_style_slug( $style_number ) . '/' );
}

/**
 * Resolve an entry of a product's images[] array to a URL. Handles both a
 * plain URL string and an object shape ({url: ...} / {image_url: ...} /
 * {src: ...}), so a change in the API's image representation degrades to an
 * empty string instead of printing "Array".
 *
 * @param string|array $image
 * @return string URL or ''.
 */
function om_image_url( $image ) {
	if ( is_string( $image ) ) {
		return $image;
	}
	if ( is_array( $image ) ) {
		foreach ( array( 'url', 'image_url', 'src', 'href' ) as $key ) {
			if ( ! empty( $image[ $key ] ) && is_string( $image[ $key ] ) ) {
				return $image[ $key ];
			}
		}
	}
	return '';
}

/**
 * What a visitor sees when the catalog can't load. Admins get the real
 * reason (missing credentials, an API error message) so they can fix it;
 * visitors get a calm, generic message instead of setup details.
 *
 * @param WP_Error $error
 * @return string
 */
function om_public_error_message( $error ) {
	if ( is_wp_error( $error ) && current_user_can( 'manage_options' ) ) {
		/* translators: %s: error message from the plugin or the Overnight Mountings API. */
		return sprintf( __( 'Catalog error (only admins see this): %s', 'om-catalog' ), $error->get_error_message() );
	}
	return __( 'Our catalog is temporarily unavailable. Please check back shortly.', 'om-catalog' );
}

/**
 * Loose diamonds can carry their own markup (Settings > OM Catalog >
 * Diamond markup); when none is set they use the jewelry markup.
 */
function om_diamond_markup_multiplier() {
	$value = floatval( get_option( 'om_diamond_markup_value', 0 ) );
	$type  = get_option( 'om_diamond_markup_type', 'multiplier' );
	if ( $value <= 0 ) {
		$value = floatval( get_option( 'om_markup_value', 0 ) );
		$type  = get_option( 'om_markup_type', 'percentage' );
	}
	if ( $value <= 0 ) {
		return 0.0;
	}
	return 'multiplier' === $type ? $value : 1 + ( $value / 100 );
}

/** Retail price of a loose diamond, or null when no markup is configured. */
function om_diamond_retail( $wholesale ) {
	$m = om_diamond_markup_multiplier();
	return $m > 0 ? round( floatval( $wholesale ) * $m, 2 ) : null;
}

/**
 * The multiplier the jewelry markup applies (e.g. 120% => 2.2). Used to
 * turn a visitor's retail price range back into the API's terms.
 */
function om_markup_multiplier() {
	$value = floatval( get_option( 'om_markup_value', 0 ) );
	if ( $value <= 0 ) {
		return 0.0;
	}
	return 'multiplier' === get_option( 'om_markup_type', 'percentage' ) ? $value : 1 + ( $value / 100 );
}

/** Format a whole-dollar price for compact spots (cards, tables): $1,188. */
function om_format_price_short( $price ) {
	return '$' . number_format_i18n( round( (float) $price ) );
}

/**
 * URL of the ring builder page with builder state merged in, or '' when no
 * builder page is configured.
 *
 * @param array $state rb_setting, rb_metal, rb_color, rb_diamond, rb_start ...
 */
function om_builder_url( $state = array() ) {
	$page_id = (int) get_option( 'om_builder_page', 0 );
	if ( ! $page_id || 'publish' !== get_post_status( $page_id ) ) {
		return '';
	}
	$args = array();
	foreach ( $state as $key => $value ) {
		if ( '' !== (string) $value ) {
			$args[ $key ] = rawurlencode( (string) $value );
		}
	}
	return add_query_arg( $args, get_permalink( $page_id ) );
}

/** Product lines whose products can be chosen as ring-builder settings. */
function om_builder_lines() {
	$lines = array_filter( array_map( 'sanitize_title', explode( ',', (string) get_option( 'om_builder_lines', 'engagement-rings' ) ) ) );
	return $lines ? $lines : array( 'engagement-rings' );
}

/**
 * Badges for a listing card: the admin's own labels by style number
 * ("85121-2: Best seller", one per line) and an automatic "New" for
 * designs Overnight Mountings added in the last N days, when the product
 * carries a creation date.
 *
 * @return string[] Badge labels.
 */
function om_card_badges( $product, $rules = '', $new_days = 0, $show_shape = false ) {
	$badges = array();
	$style  = strtoupper( (string) ( $product['style_number'] ?? '' ) );
	foreach ( preg_split( '/\r\n|\r|\n|;/', (string) $rules ) as $line ) {
		$parts = explode( ':', $line, 2 );
		if ( 2 === count( $parts ) && strtoupper( trim( $parts[0] ) ) === $style && '' !== trim( $parts[1] ) ) {
			$badges[] = trim( $parts[1] );
		}
	}
	if ( (int) $new_days > 0 ) {
		foreach ( array( 'created_at', 'createdAt', 'date_created', 'created', 'new_date' ) as $key ) {
			if ( ! empty( $product[ $key ] ) && is_string( $product[ $key ] ) ) {
				$time = strtotime( $product[ $key ] );
				if ( $time && time() - $time < (int) $new_days * DAY_IN_SECONDS ) {
					$badges[] = __( 'New', 'om-catalog' );
				}
				break;
			}
		}
	}
	// Centre-stone shape, from the single-stone line of the breakdown.
	if ( $show_shape ) {
		foreach ( (array) ( $product['stone_breakdown'] ?? array() ) as $stone ) {
			if ( ! empty( $stone['shape'] ) && 1 === (int) ( $stone['quantity'] ?? 0 ) ) {
				$badges[] = (string) $stone['shape'];
				break;
			}
		}
	}
	return array_slice( array_unique( $badges ), 0, 3 );
}

/** Make a site-relative URL ("/rings/?a=b") absolute. */
function om_absolute_url( $url ) {
	$url = (string) $url;
	if ( '' === $url || preg_match( '#^https?://#i', $url ) ) {
		return $url;
	}
	$home = wp_parse_url( home_url( '/' ) );
	return ( $home['scheme'] ?? 'https' ) . '://' . ( $home['host'] ?? '' ) . ( isset( $home['port'] ) ? ':' . $home['port'] : '' ) . '/' . ltrim( $url, '/' );
}
