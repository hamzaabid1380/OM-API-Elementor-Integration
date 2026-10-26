<?php
/**
 * Live Google rating and reviews, cached: free through Featurable (which
 * reads them from the shop's Google Business Profile), or from Google's
 * Places API (New) with the shop's own key. When a check fails, the last
 * reviews received keep showing. Or another reviews plugin's widget, by its
 * shortcode (plugin_shortcode()).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Reviews {

	/** The last reviews received, the time and why the last check failed (if it did). */
	const LAST = 'wk_greviews_last';

	/**
	 * The Featurable widget ID in whatever was pasted (the ID, a link or the
	 * embed code); '' when there is none.
	 */
	public static function featurable_id( $raw = null ) {
		$raw = null === $raw ? (string) WK_Settings::get( 'featurable_id' ) : (string) $raw;
		if ( preg_match( '/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i', $raw, $m ) ) {
			return strtolower( $m[0] );
		}
		$raw = trim( $raw );
		return preg_match( '/^[A-Za-z0-9_-]{1,64}$/', $raw ) ? $raw : '';
	}

	/**
	 * A reviews plugin's shortcode from Settings (e.g. [trustindex no-registration=google] from Widgets
	 * for Google Reviews by Trustindex), which every Reviews section then shows; '' when there is none
	 * or its plugin isn't active.
	 */
	public static function plugin_shortcode() {
		$code = (string) WK_Settings::get( 'reviews_shortcode' );
		return self::shortcode_ready( $code ) ? $code : '';
	}

	/** Is the plugin behind this shortcode active? */
	public static function shortcode_ready( $code ) {
		$tag = self::shortcode_tag( $code );
		return '' !== $tag && shortcode_exists( $tag );
	}

	/** "trustindex" from "[trustindex no-registration=google]"; '' when it isn't one shortcode. */
	public static function shortcode_tag( $code ) {
		return preg_match( '/^\[([^\s\[\]\/<>&="\']+)[^\[\]]*\]$/', trim( (string) $code ), $m ) ? $m[1] : '';
	}

	/** One shortcode from what was pasted (its brackets may be missing); '' when it isn't one. */
	public static function clean_shortcode( $raw ) {
		$raw = trim( (string) preg_replace( '/[\s\x{00A0}]+/u', ' ', wp_strip_all_tags( (string) $raw ) ) );
		if ( '' === $raw ) {
			return '';
		}
		$raw = ( '[' === $raw[0] ? '' : '[' ) . $raw . ( ']' === substr( $raw, -1 ) ? '' : ']' );
		return '' !== self::shortcode_tag( $raw ) ? $raw : '';
	}

	/** Where reviews come from: [ 'featurable', widget ID ], [ 'places', Place ID ] or null. */
	private static function source( $s = null ) {
		$s   = is_array( $s ) ? $s : WK_Settings::all();
		$fid = self::featurable_id( $s['featurable_id'] ?? '' );
		if ( '' !== $fid ) {
			return array( 'featurable', $fid );
		}
		if ( ! empty( $s['google_key'] ) && ! empty( $s['google_place'] ) ) {
			return array( 'places', (string) $s['google_place'] );
		}
		return null;
	}

	private static function cache_key( $src ) {
		return 'wk_greviews_' . md5( implode( ':', $src ) );
	}

	/**
	 * Rating, count, link and reviews, or null when not set up or nothing has
	 * been received yet.
	 *
	 * @return array|null { rating, count, url, reviews: [ { author, text, rating, ts, when } ], src, at }
	 */
	public static function google() {
		$src = self::source();
		if ( ! $src ) {
			return null;
		}
		$key    = self::cache_key( $src );
		$cached = get_transient( $key );
		if ( is_array( $cached ) ) {
			return $cached ? $cached : self::last( $key );
		}
		$out = 'featurable' === $src[0] ? self::from_featurable( $src[1] ) : self::from_places( (string) WK_Settings::get( 'google_key' ), $src[1] );
		$was = get_option( self::LAST );
		$was = is_array( $was ) && ( $was['key'] ?? '' ) === $key ? $was : array( 'key' => $key );
		if ( is_string( $out ) ) {
			// Try again in 30 minutes; meanwhile the last reviews received stay up.
			set_transient( $key, array(), 30 * MINUTE_IN_SECONDS );
			update_option( self::LAST, array_merge( $was, array( 'failed' => time(), 'why' => $out ) ), false );
			return self::last( $key );
		}
		$out['src'] = $src[0];
		$out['at']  = time();
		set_transient( $key, $out, max( 1, (int) WK_Settings::get( 'reviews_hours', 12 ) ) * HOUR_IN_SECONDS );
		update_option( self::LAST, array( 'key' => $key, 'data' => $out ), false );
		return $out;
	}

	private static function last( $key ) {
		$last = get_option( self::LAST );
		return is_array( $last ) && ( $last['key'] ?? '' ) === $key && ! empty( $last['data'] ) ? $last['data'] : null;
	}

	/** Ask again on the next page view (after the settings change). */
	public static function forget( $settings = null ) {
		$src = self::source( $settings );
		if ( $src ) {
			delete_transient( self::cache_key( $src ) );
		}
	}

	/**
	 * Featurable's free API: the reviews it keeps from the Business Profile
	 * (it checks Google about every two days). Its own link may be the "write a
	 * review" page, so the widgets keep their own links to Google.
	 *
	 * @return array|string The reviews, or why there are none.
	 */
	private static function from_featurable( $id ) {
		$res = wp_remote_get(
			'https://api.featurable.com/v1/widgets/' . rawurlencode( $id ),
			array(
				'timeout' => 8,
				'headers' => array( 'Accept' => 'application/json' ),
			)
		);
		if ( is_wp_error( $res ) ) {
			return __( 'the site couldn\'t reach Featurable', 'wulf-kit' );
		}
		$code = (int) wp_remote_retrieve_response_code( $res );
		$data = json_decode( (string) wp_remote_retrieve_body( $res ), true );
		if ( in_array( $code, array( 400, 401, 403, 404 ), true ) ) {
			return __( 'Featurable doesn\'t recognise that widget ID', 'wulf-kit' );
		}
		if ( 429 === $code ) {
			return __( 'Featurable asked the site to wait a little', 'wulf-kit' );
		}
		if ( 200 !== $code || ! is_array( $data ) || empty( $data['success'] ) ) {
			return __( 'Featurable didn\'t send any reviews', 'wulf-kit' );
		}
		if ( isset( $data['widget'] ) && is_array( $data['widget'] ) ) {
			// Newer answer shape: { widget: { gbpLocationSummary: {...}, reviews: [...] } }.
			$sum    = (array) ( $data['widget']['gbpLocationSummary'] ?? array() );
			$rating = (float) ( $sum['rating'] ?? 0 );
			$count  = (int) ( $sum['reviewsCount'] ?? 0 );
			$list   = (array) ( $data['widget']['reviews'] ?? array() );
		} else {
			$rating = (float) ( $data['averageRating'] ?? 0 );
			$count  = (int) ( $data['totalReviewCount'] ?? 0 );
			$list   = (array) ( $data['reviews'] ?? array() );
		}
		if ( $rating <= 0 ) {
			return __( 'Featurable hasn\'t sent your rating yet', 'wulf-kit' );
		}
		$out = array(
			'rating'  => $rating,
			'count'   => $count,
			'url'     => '',
			'reviews' => array(),
		);
		foreach ( $list as $r ) {
			if ( ! is_array( $r ) ) {
				continue;
			}
			$text = self::clean( $r['comment'] ?? ( $r['text'] ?? '' ) );
			if ( '' === $text ) {
				continue; // Stars only, nothing to quote.
			}
			$name = $r['reviewer']['displayName'] ?? ( $r['author']['name'] ?? '' );
			$time = strtotime( (string) ( $r['createTime'] ?? ( $r['createdAt'] ?? '' ) ) );
			$out['reviews'][] = array(
				'author' => '' !== trim( (string) $name ) ? (string) $name : __( 'A Google reviewer', 'wulf-kit' ),
				'text'   => $text,
				'rating' => self::stars( $r['starRating'] ?? ( $r['rating']['value'] ?? ( $r['rating'] ?? 0 ) ) ),
				'ts'     => $time ? $time : 0,
				'when'   => '',
			);
		}
		return $out;
	}

	/**
	 * Google's Places API (New) with the shop's own key: rating, count and
	 * up to 5 reviews (Google picks them).
	 *
	 * @return array|string The reviews, or why there are none.
	 */
	private static function from_places( $key, $place ) {
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
		if ( is_wp_error( $res ) ) {
			return __( 'the site couldn\'t reach Google', 'wulf-kit' );
		}
		$code = (int) wp_remote_retrieve_response_code( $res );
		$data = json_decode( (string) wp_remote_retrieve_body( $res ), true );
		if ( in_array( $code, array( 400, 401, 403, 404 ), true ) ) {
			return __( 'Google refused the API key or Place ID', 'wulf-kit' );
		}
		if ( ! is_array( $data ) || empty( $data['rating'] ) ) {
			return __( 'Google didn\'t send a rating', 'wulf-kit' );
		}
		$out = array(
			'rating'  => (float) $data['rating'],
			'count'   => (int) ( $data['userRatingCount'] ?? 0 ),
			'url'     => (string) ( $data['googleMapsUri'] ?? '' ),
			'reviews' => array(),
		);
		foreach ( (array) ( $data['reviews'] ?? array() ) as $r ) {
			$text = self::clean( $r['originalText']['text'] ?? ( $r['text']['text'] ?? '' ) );
			if ( '' === $text ) {
				continue;
			}
			$time = strtotime( (string) ( $r['publishTime'] ?? '' ) );
			$out['reviews'][] = array(
				'author' => (string) ( $r['authorAttribution']['displayName'] ?? '' ),
				'text'   => $text,
				'rating' => self::stars( $r['rating'] ?? 5 ),
				'ts'     => $time ? $time : 0,
				'when'   => (string) ( $r['relativePublishTimeDescription'] ?? '' ),
			);
		}
		return $out;
	}

	/** The reviewer's own words (not Google's translation), on one line. */
	private static function clean( $text ) {
		$text = is_scalar( $text ) ? (string) $text : '';
		if ( false !== strpos( $text, '(Original)' ) ) {
			$text = explode( '(Original)', $text, 2 )[1];
		}
		$text = str_replace( '(Translated by Google)', '', $text );
		return trim( (string) preg_replace( '/\s+/u', ' ', wp_strip_all_tags( $text ) ) );
	}

	/** 1 to 5 from a number or Google's words (FIVE); 0 when unknown. */
	private static function stars( $v ) {
		if ( is_numeric( $v ) ) {
			return max( 0, min( 5, (int) round( (float) $v ) ) );
		}
		$words = array( 'ONE' => 1, 'TWO' => 2, 'THREE' => 3, 'FOUR' => 4, 'FIVE' => 5 );
		return is_string( $v ) && isset( $words[ strtoupper( $v ) ] ) ? $words[ strtoupper( $v ) ] : 0;
	}

	/** "3 weeks ago" for a review (from its date when known). */
	public static function when( $r ) {
		if ( ! empty( $r['ts'] ) ) {
			/* translators: %s: time, e.g. 3 weeks */
			return sprintf( __( '%s ago', 'wulf-kit' ), human_time_diff( (int) $r['ts'] ) );
		}
		return (string) ( $r['when'] ?? '' );
	}

	/**
	 * For the settings page: what shows on the site now, or why nothing does.
	 *
	 * @return array|null { state: ok | stale | none, text } or null when not set up.
	 */
	public static function status() {
		$src = self::source();
		if ( ! $src ) {
			return null;
		}
		$data = self::google();
		$last = get_option( self::LAST );
		$why  = is_array( $last ) && ( $last['key'] ?? '' ) === self::cache_key( $src ) && ! empty( $last['failed'] ) ? (string) ( $last['why'] ?? '' ) : '';
		$from = 'featurable' === $src[0] ? 'Featurable' : 'Google';
		if ( ! $data ) {
			return array(
				'state' => 'none',
				/* translators: %s: reason, e.g. "Featurable doesn't recognise that widget ID" */
				'text'  => sprintf( __( 'Not showing yet: %s. The Reviews widget shows its typed-in reviews meanwhile, and the site tries again every 30 minutes.', 'wulf-kit' ), '' !== $why ? $why : __( 'no answer yet', 'wulf-kit' ) ),
			);
		}
		/* translators: 1: rating, 2: number of reviews, 3: reviews with text, 4: Featurable or Google, 5: time ago */
		$text = sprintf( __( 'Showing your %1$s ★ rating from %2$s Google reviews, with %3$s written reviews to choose from (via %4$s, checked %5$s ago).', 'wulf-kit' ), number_format_i18n( (float) $data['rating'], 1 ), number_format_i18n( (int) $data['count'] ), number_format_i18n( count( $data['reviews'] ) ), $from, human_time_diff( (int) ( $data['at'] ?? time() ) ) );
		if ( '' !== $why ) {
			/* translators: %s: reason */
			$text .= ' ' . sprintf( __( 'The latest check didn\'t work (%s), so these are the last reviews received.', 'wulf-kit' ), $why );
		}
		return array(
			'state' => '' !== $why ? 'stale' : 'ok',
			'text'  => $text,
		);
	}
}
