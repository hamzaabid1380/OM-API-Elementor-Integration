<?php
/**
 * Business details for Google: JewelryStore structured data on the homepage, built from Wulf Kit ›
 * Settings (name, address, phone, opening hours, directions link) and a few optional extras (map pin,
 * price range, profiles elsewhere, a store photo). Google uses it to match the site to the shop in
 * search and on Maps; visitors don't see it. Left out when an SEO plugin already publishes local
 * business details, so Google never gets two versions.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Schema {

	const DAYS = array( 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' );

	public static function init() {
		add_action( 'wp_head', array( __CLASS__, 'print_store' ), 30 );
	}

	public static function print_store() {
		if ( ! is_front_page() || ! self::on() ) {
			return;
		}
		echo '<script type="application/ld+json">' . wp_json_encode( self::store(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
	}

	/** Switched on in Settings, and no SEO plugin publishes local business details already. */
	public static function on() {
		return (bool) apply_filters( 'wk_store_schema', '1' === WK_Settings::get( 'schema' ) && '' === self::other() );
	}

	/** The SEO plugin that already publishes local business details, if any. */
	public static function other() {
		if ( class_exists( 'WPSEO_Local_Core' ) ) {
			return 'Yoast Local SEO';
		}
		if ( class_exists( '\RankMath\Helper' ) && method_exists( '\RankMath\Helper', 'is_module_active' ) && \RankMath\Helper::is_module_active( 'local-seo' ) ) {
			return 'Rank Math (Local SEO)';
		}
		return '';
	}

	/** The JewelryStore entry. The "visit requests" email stays private, so it is never included. */
	public static function store() {
		$s    = WK_Settings::all();
		$data = array(
			'@context' => 'https://schema.org',
			'@type'    => 'JewelryStore',
			'@id'      => home_url( '/#store' ),
			'name'     => $s['name'],
			'url'      => home_url( '/' ),
		);
		$tel = preg_replace( '/^tel:/', '', WK_Settings::tel() );
		if ( $tel ) {
			$data['telephone'] = $tel;
		}
		$address = self::address( $s['address'] );
		if ( $address ) {
			$data['address'] = $address;
		}
		$geo = self::geo( $s['geo'] );
		if ( $geo ) {
			$data['geo'] = $geo;
		}
		if ( $s['maps_url'] ) {
			$data['hasMap'] = $s['maps_url'];
		}
		$hours = self::hours( $s['hours'] );
		if ( $hours ) {
			$data['openingHoursSpecification'] = $hours;
		}
		$data['image'] = $s['store_img'] ? $s['store_img'] : WK_URL . 'assets/media/showroom.webp';
		$logo          = get_site_icon_url( 512 );
		if ( ! $logo && has_custom_logo() ) {
			$logo = wp_get_attachment_image_url( (int) get_theme_mod( 'custom_logo' ), 'full' );
		}
		if ( $logo ) {
			$data['logo'] = $logo;
		}
		if ( $s['price_range'] ) {
			$data['priceRange'] = $s['price_range'];
		}
		$same = self::profiles( $s['profiles'] );
		if ( $same ) {
			$data['sameAs'] = $same;
		}
		return apply_filters( 'wk_store_schema_data', $data );
	}

	/** "10460 Broadway, Crown Point, IN 46307" in its parts (a US address); otherwise the whole line. */
	public static function address( $line ) {
		$line = trim( (string) $line );
		if ( '' === $line ) {
			return null;
		}
		if ( preg_match( '/^(.+?),\s*([^,]+?),\s*([A-Za-z]{2})\.?\s+(\d{5}(?:-\d{4})?)(?:\s*,\s*(?:USA?|United States))?$/', $line, $m ) ) {
			return array(
				'@type'           => 'PostalAddress',
				'streetAddress'   => $m[1],
				'addressLocality' => $m[2],
				'addressRegion'   => strtoupper( $m[3] ),
				'postalCode'      => $m[4],
				'addressCountry'  => 'US',
			);
		}
		return array( '@type' => 'PostalAddress', 'streetAddress' => $line );
	}

	/** "41.41672, -87.36543" (a pin copied from Google Maps) as coordinates. */
	public static function geo( $pin ) {
		if ( ! preg_match( '/^\s*(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/', (string) $pin, $m ) ) {
			return null;
		}
		$lat = (float) $m[1];
		$lng = (float) $m[2];
		if ( abs( $lat ) > 90 || abs( $lng ) > 180 ) {
			return null;
		}
		return array( '@type' => 'GeoCoordinates', 'latitude' => $lat, 'longitude' => $lng );
	}

	/** Opening hours, the days with the same times grouped; closed days are left out. */
	public static function hours( $h ) {
		$groups = array();
		foreach ( array( 1, 2, 3, 4, 5, 6, 0 ) as $d ) {
			$row = isset( $h[ $d ] ) ? (array) $h[ $d ] : array();
			if ( ! empty( $row['closed'] ) || empty( $row['open'] ) || empty( $row['close'] ) ) {
				continue;
			}
			$open  = self::hm( $row['open'] );
			$close = self::hm( $row['close'] );
			$k     = $open . '-' . $close;
			if ( ! isset( $groups[ $k ] ) ) {
				$groups[ $k ] = array( '@type' => 'OpeningHoursSpecification', 'dayOfWeek' => array(), 'opens' => $open, 'closes' => $close );
			}
			$groups[ $k ]['dayOfWeek'][] = self::DAYS[ $d ];
		}
		return array_values( $groups );
	}

	/** Profile links, one per line; anything that isn't a web address is dropped. */
	public static function profiles( $text ) {
		$out = array();
		foreach ( preg_split( '/\s*[\r\n]+\s*/', trim( (string) $text ) ) as $url ) {
			if ( preg_match( '#^[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:[/?\#]\S*)?$#i', $url ) ) {
				$url = 'https://' . $url; // "www.yelp.com/biz/…" without its https://
			}
			if ( ! preg_match( '#^https?://[^\s/?\#]+\.[a-z]{2,}(?:[/?\#]\S*)?$#i', $url ) ) {
				continue;
			}
			$url = esc_url_raw( $url, array( 'http', 'https' ) );
			if ( $url ) {
				$out[] = $url;
			}
		}
		return array_values( array_unique( $out ) );
	}

	private static function hm( $t ) {
		$p = array_map( 'intval', explode( ':', (string) $t ) ) + array( 0, 0 );
		return sprintf( '%02d:%02d', $p[0], $p[1] );
	}
}
