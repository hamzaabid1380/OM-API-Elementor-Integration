<?php
/**
 * Live Google rating and reviews (Places API, New), cached.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Reviews {

	/**
	 * Rating, count, link and up to 5 reviews, or null when not set up / unavailable.
	 *
	 * @return array|null
	 */
	public static function google() {
		$key   = WK_Settings::get( 'google_key' );
		$place = WK_Settings::get( 'google_place' );
		if ( ! $key || ! $place ) {
			return null;
		}
		$tkey   = 'wk_greviews_' . md5( $place );
		$cached = get_transient( $tkey );
		if ( is_array( $cached ) ) {
			return $cached ? $cached : null;
		}
		$res = wp_remote_get(
			'https://places.googleapis.com/v1/places/' . rawurlencode( $place ),
			array(
				'timeout' => 8,
				'headers' => array(
					'X-Goog-Api-Key'   => $key,
					'X-Goog-FieldMask' => 'rating,userRatingCount,googleMapsUri,reviews',
				),
			)
		);
		$data = is_wp_error( $res ) ? null : json_decode( wp_remote_retrieve_body( $res ), true );
		if ( ! is_array( $data ) || ! isset( $data['rating'] ) ) {
			set_transient( $tkey, array(), 30 * MINUTE_IN_SECONDS );
			return null;
		}
		$out = array(
			'rating'  => (float) $data['rating'],
			'count'   => (int) ( $data['userRatingCount'] ?? 0 ),
			'url'     => (string) ( $data['googleMapsUri'] ?? '' ),
			'reviews' => array(),
		);
		foreach ( (array) ( $data['reviews'] ?? array() ) as $r ) {
			$text = $r['originalText']['text'] ?? ( $r['text']['text'] ?? '' );
			if ( '' === trim( $text ) ) {
				continue;
			}
			$out['reviews'][] = array(
				'author' => (string) ( $r['authorAttribution']['displayName'] ?? '' ),
				'text'   => (string) $text,
				'rating' => (int) ( $r['rating'] ?? 5 ),
				'when'   => (string) ( $r['relativePublishTimeDescription'] ?? '' ),
			);
		}
		set_transient( $tkey, $out, max( 1, (int) WK_Settings::get( 'reviews_hours', 12 ) ) * HOUR_IN_SECONDS );
		return $out;
	}
}
