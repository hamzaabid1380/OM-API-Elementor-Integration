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
