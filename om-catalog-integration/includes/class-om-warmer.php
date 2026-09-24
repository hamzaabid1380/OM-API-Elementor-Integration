<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Background refresh ("cache warming").
 *
 * Every listing page a visitor loads is remembered (line + query). A
 * WP-Cron job runs every 10 minutes and re-fetches the remembered pages
 * that are about to go stale, plus the product-line list, each line's
 * collections and its search index. Cached entries are kept a little
 * longer than the refresh interval, so visitors are served from cache and
 * never wait on Overnight Mountings' API.
 *
 * WP-Cron runs on site traffic; for exact timing, point a real server
 * cron at wp-cron.php (most hosts offer this).
 */
class OM_Warmer {

	const HOOK       = 'om_catalog_warm';
	const OPTION     = 'om_warm_queries';
	const STATUS     = 'om_warm_status';
	const MAX_QUERIES = 60;
	/** Most API calls one run may make. */
	const BUDGET     = 25;

	private static $instance = null;
	private static $queries  = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_filter( 'cron_schedules', array( $this, 'schedule' ) );
		add_action( self::HOOK, array( $this, 'run' ) );
		add_action( 'init', array( $this, 'ensure_scheduled' ) );
	}

	public static function enabled() {
		return '1' === (string) get_option( 'om_warm_cache', '1' );
	}

	public function schedule( $schedules ) {
		$schedules['om_ten_minutes'] = array(
			'interval' => 10 * MINUTE_IN_SECONDS,
			'display'  => __( 'Every 10 minutes (OM Catalog)', 'om-catalog' ),
		);
		return $schedules;
	}

	public function ensure_scheduled() {
		$next = wp_next_scheduled( self::HOOK );
		if ( self::enabled() && ! $next ) {
			wp_schedule_event( time() + MINUTE_IN_SECONDS, 'om_ten_minutes', self::HOOK );
		} elseif ( ! self::enabled() && $next ) {
			wp_clear_scheduled_hook( self::HOOK );
		}
	}

	public static function unschedule() {
		wp_clear_scheduled_hook( self::HOOK );
	}

	/**
	 * How long a listing page stays cached: the admin's setting, plus a
	 * margin when the background refresh keeps it fresh anyway.
	 */
	public static function listing_ttl() {
		$minutes = max( 1, (int) get_option( 'om_listing_cache_minutes', 15 ) );
		return ( $minutes + ( self::enabled() ? 30 : 0 ) ) * MINUTE_IN_SECONDS;
	}

	private static function load() {
		if ( null === self::$queries ) {
			$saved         = get_option( self::OPTION, array() );
			self::$queries = is_array( $saved ) ? $saved : array();
		}
		return self::$queries;
	}

	/**
	 * Note that a listing page was used. Written at most every few hours
	 * per page, so this costs nothing on a normal page view.
	 */
	public static function remember( $line, $args ) {
		if ( ! self::enabled() ) {
			return;
		}
		$queries = self::load();
		$key     = md5( $line . '|' . wp_json_encode( $args ) );
		$now     = time();
		if ( isset( $queries[ $key ] ) && $now - (int) $queries[ $key ]['used'] < 3 * HOUR_IN_SECONDS ) {
			return;
		}
		$queries[ $key ] = array(
			'line'    => $line,
			'args'    => $args,
			'used'    => $now,
			'fetched' => isset( $queries[ $key ] ) ? (int) $queries[ $key ]['fetched'] : $now,
		);
		// Keep the most recently used pages.
		uasort(
			$queries,
			static function ( $a, $b ) {
				return (int) $b['used'] <=> (int) $a['used'];
			}
		);
		self::$queries = array_slice( $queries, 0, self::MAX_QUERIES, true );
		update_option( self::OPTION, self::$queries, false );
	}

	/** One refresh run. */
	public function run() {
		if ( ! self::enabled() ) {
			return;
		}
		$budget  = self::BUDGET;
		$done    = 0;
		$now     = time();
		$stale   = max( 5, (int) get_option( 'om_listing_cache_minutes', 15 ) - 5 ) * MINUTE_IN_SECONDS;
		$queries = self::load();
		$lines   = array();

		// Listing pages used in the last two days, oldest refresh first.
		uasort(
			$queries,
			static function ( $a, $b ) {
				return (int) $a['fetched'] <=> (int) $b['fetched'];
			}
		);
		foreach ( $queries as $key => $query ) {
			if ( $now - (int) $query['used'] > 2 * DAY_IN_SECONDS ) {
				unset( $queries[ $key ] );
				continue;
			}
			$lines[ $query['line'] ] = true;
			if ( $budget <= 0 || $now - (int) $query['fetched'] < $stale ) {
				continue;
			}
			$result = OM_Shortcodes::fetch_listing( $query['line'], (array) $query['args'], true );
			$budget--;
			if ( ! is_wp_error( $result ) ) {
				$queries[ $key ]['fetched'] = $now;
				$done++;
			}
		}
		self::$queries = $queries;
		update_option( self::OPTION, $queries, false );

		// Product lines, then per-line collections and search index, each
		// rebuilt every 6 hours (they are cached for 12).
		$built = get_option( 'om_warm_built', array() );
		$built = is_array( $built ) ? $built : array();
		if ( $budget > 0 && $now - (int) ( $built['lines'] ?? 0 ) > 6 * HOUR_IN_SECONDS ) {
			delete_transient( OM_API_Client::LINES_TRANSIENT );
			OM_API_Client::get_product_lines_map( true );
			$built['lines'] = $now;
			$budget--;
		}
		foreach ( array_keys( $lines ) as $line ) {
			if ( $budget <= 0 ) {
				break;
			}
			if ( $now - (int) ( $built[ 'col_' . $line ] ?? 0 ) > 6 * HOUR_IN_SECONDS ) {
				delete_transient( 'om_line_collections_' . md5( $line ) );
				OM_API_Client::get_line_collections( $line, true );
				$built[ 'col_' . $line ] = $now;
				$budget--;
			}
			if ( $budget > 3 && $now - (int) ( $built[ 'idx_' . $line ] ?? 0 ) > 6 * HOUR_IN_SECONDS ) {
				// Build the new index before dropping the old one isn't
				// possible with a single key, so rebuild in place: the old
				// index stays served until this request finishes.
				$key = 'om_index_' . md5( $line );
				$old = get_transient( $key );
				delete_transient( $key );
				$index = OM_Search::get_index( $line );
				if ( is_wp_error( $index ) && is_array( $old ) ) {
					set_transient( $key, $old, 12 * HOUR_IN_SECONDS );
				}
				$built[ 'idx_' . $line ] = $now;
				$budget -= 4;
			}
		}
		update_option( 'om_warm_built', $built, false );
		update_option(
			self::STATUS,
			array(
				'time'    => $now,
				'pages'   => $done,
				'tracked' => count( $queries ),
			),
			false
		);
	}

	/** One line for the settings page. */
	public static function status_text() {
		if ( ! self::enabled() ) {
			return __( 'Off: pages are fetched from the API when their cache expires.', 'om-catalog' );
		}
		$status = get_option( self::STATUS, array() );
		if ( empty( $status['time'] ) ) {
			return __( 'On. The first refresh runs within a few minutes of site traffic.', 'om-catalog' );
		}
		/* translators: 1: time ago, 2: pages refreshed, 3: pages tracked. */
		return sprintf( __( 'On. Last run %1$s ago: refreshed %2$d of %3$d tracked catalog pages.', 'om-catalog' ), human_time_diff( (int) $status['time'] ), (int) $status['pages'], (int) $status['tracked'] );
	}
}
