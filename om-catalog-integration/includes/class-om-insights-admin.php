<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Insights in wp-admin: one page with a date range on top and tabs below
 * (overview, visitors, pages, products, searches, actions, funnels, visitor
 * journeys, leads, live, settings). Everything is read from the two Insights
 * tables (see OM_Insights) with prepared queries, cached for a few minutes.
 *
 * Charts follow one quiet language: a single blue for amounts, a five-step
 * blue ramp for the busy-hours grid, thin marks with rounded ends, hairline
 * grids, a tooltip on every mark and the same numbers as a table.
 */
class OM_Insights_Admin {

	const SLUG  = 'om-insights';
	const CACHE = 180;

	private static $instance = null;

	/** The period being shown. */
	private $from = '';
	private $to   = '';
	private $range = '30d';

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'admin_menu', array( $this, 'menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'assets' ) );
		add_action( 'admin_post_om_ins_settings', array( $this, 'save_settings' ) );
		add_action( 'admin_post_om_ins_wipe', array( $this, 'wipe' ) );
		add_action( 'admin_post_om_ins_csv', array( $this, 'csv' ) );
		add_action( 'wp_ajax_om_ins_live', array( $this, 'live_json' ) );
		add_action( 'wp_dashboard_setup', array( $this, 'dashboard_widget' ) );
		// The visit behind each inquiry (OM_Inquiry posts).
		add_action( 'add_meta_boxes_om_inquiry', array( $this, 'inquiry_box' ) );
		add_filter( 'manage_om_inquiry_posts_columns', array( $this, 'inquiry_columns' ), 20 );
		add_action( 'manage_om_inquiry_posts_custom_column', array( $this, 'inquiry_column' ), 10, 2 );
	}

	public function menu() {
		add_menu_page( __( 'Insights', 'om-catalog' ), __( 'Insights', 'om-catalog' ), 'manage_options', self::SLUG, array( $this, 'page' ), 'dashicons-chart-area', 3 );
	}

	public function assets( $hook ) {
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( $screen && 'om_inquiry' === $screen->post_type && in_array( $hook, array( 'post.php', 'edit.php' ), true ) ) {
			wp_enqueue_style( 'om-insights-admin', OM_CATALOG_URL . 'assets/css/om-insights-admin.css', array(), OM_CATALOG_VERSION );
			return;
		}
		if ( 'toplevel_page_' . self::SLUG !== $hook ) {
			return;
		}
		wp_enqueue_style( 'om-insights-admin', OM_CATALOG_URL . 'assets/css/om-insights-admin.css', array(), OM_CATALOG_VERSION );
		wp_enqueue_script( 'om-insights-admin', OM_CATALOG_URL . 'assets/js/om-insights-admin.js', array(), OM_CATALOG_VERSION, true );
		wp_localize_script(
			'om-insights-admin',
			'omIns',
			array(
				'ajax'  => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'om_ins_live' ),
				'i18n'  => array(
					'now'     => __( 'right now', 'om-catalog' ),
					'none'    => __( 'Nobody on the site at the moment.', 'om-catalog' ),
					'updated' => __( 'Updated %s', 'om-catalog' ),
				),
			)
		);
	}

	/* ---------------------------------------------------------------
	 * Period
	 * ------------------------------------------------------------- */

	public static function presets() {
		return array(
			'today'     => __( 'Today', 'om-catalog' ),
			'yesterday' => __( 'Yesterday', 'om-catalog' ),
			'7d'        => __( 'Last 7 days', 'om-catalog' ),
			'30d'       => __( 'Last 30 days', 'om-catalog' ),
			'90d'       => __( 'Last 90 days', 'om-catalog' ),
			'month'     => __( 'This month', 'om-catalog' ),
			'lastmonth' => __( 'Last month', 'om-catalog' ),
			'12m'       => __( 'Last 12 months', 'om-catalog' ),
		);
	}

	private static function valid_day( $value ) {
		$value = is_string( $value ) ? $value : '';
		if ( ! preg_match( '/^(\d{4})-(\d{2})-(\d{2})$/', $value, $m ) || ! checkdate( (int) $m[2], (int) $m[3], (int) $m[1] ) ) {
			return '';
		}
		return $value;
	}

	/** Reads ?range= (or ?from=&to=) into $this->from / $this->to (site dates). */
	private function read_range() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only view settings.
		$range = isset( $_GET['range'] ) ? sanitize_key( wp_unslash( $_GET['range'] ) ) : '30d';
		$from  = isset( $_GET['from'] ) ? self::valid_day( sanitize_text_field( wp_unslash( $_GET['from'] ) ) ) : '';
		$to    = isset( $_GET['to'] ) ? self::valid_day( sanitize_text_field( wp_unslash( $_GET['to'] ) ) ) : '';
		// phpcs:enable
		$today = wp_date( 'Y-m-d' );
		$day   = static function ( $offset ) {
			return wp_date( 'Y-m-d', time() - $offset * DAY_IN_SECONDS );
		};
		if ( 'custom' === $range && $from && $to ) {
			if ( $from > $to ) {
				list( $from, $to ) = array( $to, $from );
			}
			$this->from = $from;
			$this->to   = min( $to, $today );
		} else {
			$range = isset( self::presets()[ $range ] ) ? $range : '30d';
			switch ( $range ) {
				case 'today':
					$this->from = $today;
					$this->to   = $today;
					break;
				case 'yesterday':
					$this->from = $day( 1 );
					$this->to   = $day( 1 );
					break;
				case '7d':
					$this->from = $day( 6 );
					$this->to   = $today;
					break;
				case '90d':
					$this->from = $day( 89 );
					$this->to   = $today;
					break;
				case 'month':
					$this->from = wp_date( 'Y-m-01' );
					$this->to   = $today;
					break;
				case 'lastmonth':
					$first      = strtotime( wp_date( 'Y-m-01' ) . ' 12:00:00 -1 month' );
					$this->from = gmdate( 'Y-m-01', $first );
					$this->to   = gmdate( 'Y-m-t', $first );
					break;
				case '12m':
					$this->from = $day( 364 );
					$this->to   = $today;
					break;
				default:
					$this->from = $day( 29 );
					$this->to   = $today;
			}
		}
		$this->range = 'custom' === $range && $from && $to ? 'custom' : $range;
	}

	/** Days in the period. */
	private function span() {
		return (int) round( ( strtotime( $this->to . ' 12:00:00' ) - strtotime( $this->from . ' 12:00:00' ) ) / DAY_IN_SECONDS ) + 1;
	}

	/** The period just before, as long. */
	private function previous() {
		$n = $this->span();
		return array( gmdate( 'Y-m-d', strtotime( $this->from . ' 12:00:00' ) - $n * DAY_IN_SECONDS ), gmdate( 'Y-m-d', strtotime( $this->from . ' 12:00:00' ) - DAY_IN_SECONDS ) );
	}

	private function url( $args = array() ) {
		$base = array( 'page' => self::SLUG, 'range' => $this->range );
		if ( 'custom' === $this->range ) {
			$base['from'] = $this->from;
			$base['to']   = $this->to;
		}
		return add_query_arg( array_merge( $base, $args ), admin_url( 'admin.php' ) );
	}

	/* ---------------------------------------------------------------
	 * Data
	 * ------------------------------------------------------------- */

	/** A result kept for a few minutes (the "Refresh" link skips it). */
	private function cached( $key, $fn ) {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only.
		$fresh = isset( $_GET['refresh'] );
		$tkey  = 'om_ins_c_' . md5( $key . '|' . $this->from . '|' . $this->to . '|' . OM_CATALOG_VERSION );
		if ( ! $fresh ) {
			$hit = get_transient( $tkey );
			if ( false !== $hit ) {
				return $hit;
			}
		}
		$value = $fn();
		set_transient( $tkey, $value, self::CACHE );
		return $value;
	}

	private static function rows( $sql, $args ) {
		global $wpdb;
		return (array) $wpdb->get_results( $wpdb->prepare( $sql, $args ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
	}

	private static function row( $sql, $args ) {
		global $wpdb;
		return (array) $wpdb->get_row( $wpdb->prepare( $sql, $args ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
	}

	/** Headline numbers for a period. */
	private function kpis( $from, $to ) {
		$s = OM_Insights::sessions_table();
		$e = OM_Insights::events_table();
		$v = self::row(
			"SELECT COUNT(*) AS visits, COUNT(DISTINCT vid) AS visitors, COALESCE(SUM(pages), 0) AS pages, COALESCE(AVG(engaged), 0) AS engaged,
				COALESCE(SUM(products), 0) AS products, COALESCE(SUM(saves), 0) AS saves,
				SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted, SUM(is_new) AS new_visitors,
				SUM(CASE WHEN pages <= 1 AND engaged < 10 AND leads = 0 AND products = 0 THEN 1 ELSE 0 END) AS quick
			FROM {$s} WHERE day BETWEEN %s AND %s",
			array( $from, $to )
		);
		$a = array();
		foreach ( self::rows( "SELECT type, COUNT(*) AS n FROM {$e} WHERE day BETWEEN %s AND %s AND type IN ('lead','compare','search','call','directions','share') GROUP BY type", array( $from, $to ) ) as $r ) {
			$a[ $r['type'] ] = (int) $r['n'];
		}
		$visits = (int) ( $v['visits'] ?? 0 );
		return array(
			'visitors'  => (int) ( $v['visitors'] ?? 0 ),
			'visits'    => $visits,
			'pages'     => (int) ( $v['pages'] ?? 0 ),
			'engaged'   => (float) ( $v['engaged'] ?? 0 ),
			'products'  => (int) ( $v['products'] ?? 0 ),
			'saves'     => (int) ( $v['saves'] ?? 0 ),
			'leads'     => $a['lead'] ?? 0,
			'conv'      => $visits ? 100 * (int) $v['converted'] / $visits : 0,
			'new'       => (int) ( $v['new_visitors'] ?? 0 ),
			'quick'     => $visits ? 100 * (int) $v['quick'] / $visits : 0,
			'compares'  => $a['compare'] ?? 0,
			'searches'  => $a['search'] ?? 0,
			'calls'     => $a['call'] ?? 0,
			'directions' => $a['directions'] ?? 0,
			'shares'    => $a['share'] ?? 0,
		);
	}

	/** Visits, visitors, page views and leads per day (or week / month for long periods). */
	private function series() {
		$s     = OM_Insights::sessions_table();
		$e     = OM_Insights::events_table();
		$daily = array();
		foreach ( self::rows( "SELECT day, COUNT(*) AS visits, COUNT(DISTINCT vid) AS visitors, COALESCE(SUM(pages), 0) AS pages FROM {$s} WHERE day BETWEEN %s AND %s GROUP BY day", array( $this->from, $this->to ) ) as $r ) {
			$daily[ $r['day'] ] = array( 'visits' => (int) $r['visits'], 'visitors' => (int) $r['visitors'], 'pages' => (int) $r['pages'], 'leads' => 0 );
		}
		foreach ( self::rows( "SELECT day, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND day BETWEEN %s AND %s GROUP BY day", array( $this->from, $this->to ) ) as $r ) {
			$daily[ $r['day'] ]          = ( $daily[ $r['day'] ] ?? array( 'visits' => 0, 'visitors' => 0, 'pages' => 0, 'leads' => 0 ) );
			$daily[ $r['day'] ]['leads'] = (int) $r['n'];
		}
		$span = $this->span();
		$unit = $span > 400 ? 'month' : ( $span > 92 ? 'week' : 'day' );
		$out  = array();
		for ( $t = strtotime( $this->from . ' 12:00:00' ); $t <= strtotime( $this->to . ' 12:00:00' ); $t += DAY_IN_SECONDS ) {
			$day = gmdate( 'Y-m-d', $t );
			if ( 'week' === $unit ) {
				$key = gmdate( 'Y-m-d', $t - ( (int) gmdate( 'N', $t ) - 1 ) * DAY_IN_SECONDS );
			} elseif ( 'month' === $unit ) {
				$key = gmdate( 'Y-m-01', $t );
			} else {
				$key = $day;
			}
			if ( ! isset( $out[ $key ] ) ) {
				$out[ $key ] = array( 'visits' => 0, 'visitors' => 0, 'pages' => 0, 'leads' => 0 );
			}
			foreach ( $daily[ $day ] ?? array() as $k => $n ) {
				$out[ $key ][ $k ] += $n;
			}
		}
		return array( 'unit' => $unit, 'points' => $out );
	}

	/** One column of the visits table, ranked. */
	private function by_visit( $column, $limit = 12, $where = '' ) {
		$allowed = array( 'channel', 'ref_host', 'landing', 'exit_page', 'device', 'browser', 'os', 'country', 'region', 'city', 'tz', 'lang', 'utm_source', 'utm_campaign' );
		if ( ! in_array( $column, $allowed, true ) ) {
			return array();
		}
		$s = OM_Insights::sessions_table();
		return self::rows(
			"SELECT {$column} AS k, COUNT(*) AS visits, COUNT(DISTINCT vid) AS visitors, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted,
				COALESCE(AVG(pages), 0) AS pages, COALESCE(AVG(engaged), 0) AS engaged,
				SUM(CASE WHEN pages <= 1 AND engaged < 10 AND leads = 0 AND products = 0 THEN 1 ELSE 0 END) AS quick
			FROM {$s} WHERE day BETWEEN %s AND %s {$where} GROUP BY {$column} ORDER BY visits DESC LIMIT %d",
			array( $this->from, $this->to, $limit )
		);
	}

	private function campaigns() {
		$s = OM_Insights::sessions_table();
		return self::rows(
			"SELECT utm_source AS src, utm_medium AS med, utm_campaign AS camp, COUNT(*) AS visits, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted, COALESCE(AVG(pages), 0) AS pages
			FROM {$s} WHERE day BETWEEN %s AND %s AND (utm_source <> '' OR utm_campaign <> '') GROUP BY utm_source, utm_medium, utm_campaign ORDER BY visits DESC LIMIT 30",
			array( $this->from, $this->to )
		);
	}

	private function heat() {
		$s    = OM_Insights::sessions_table();
		$grid = array();
		foreach ( self::rows( "SELECT dow, hr, COUNT(*) AS n FROM {$s} WHERE day BETWEEN %s AND %s GROUP BY dow, hr", array( $this->from, $this->to ) ) as $r ) {
			$grid[ (int) $r['dow'] ][ (int) $r['hr'] ] = (int) $r['n'];
		}
		return $grid;
	}

	private function pages( $limit = 300 ) {
		$e     = OM_Insights::events_table();
		$s     = OM_Insights::sessions_table();
		$rows  = self::rows(
			"SELECT page, COUNT(*) AS views, COUNT(DISTINCT sid) AS visits, COALESCE(AVG(dur), 0) AS dur, COALESCE(AVG(scroll), 0) AS scroll, MAX(label) AS title
			FROM {$e} WHERE type = 'pageview' AND day BETWEEN %s AND %s GROUP BY page ORDER BY views DESC LIMIT %d",
			array( $this->from, $this->to, $limit )
		);
		$entries = array();
		foreach ( self::rows( "SELECT landing AS k, COUNT(*) AS n, SUM(CASE WHEN pages <= 1 AND engaged < 10 AND leads = 0 AND products = 0 THEN 1 ELSE 0 END) AS quick, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted FROM {$s} WHERE day BETWEEN %s AND %s GROUP BY landing", array( $this->from, $this->to ) ) as $r ) {
			$entries[ $r['k'] ] = $r;
		}
		$exits = array();
		foreach ( self::rows( "SELECT exit_page AS k, COUNT(*) AS n FROM {$s} WHERE day BETWEEN %s AND %s GROUP BY exit_page", array( $this->from, $this->to ) ) as $r ) {
			$exits[ $r['k'] ] = (int) $r['n'];
		}
		foreach ( $rows as &$r ) {
			$r['entries']   = (int) ( $entries[ $r['page'] ]['n'] ?? 0 );
			$r['quick']     = (int) ( $entries[ $r['page'] ]['quick'] ?? 0 );
			$r['converted'] = (int) ( $entries[ $r['page'] ]['converted'] ?? 0 );
			$r['exits']     = (int) ( $exits[ $r['page'] ] ?? 0 );
		}
		unset( $r );
		return $rows;
	}

	private function products( $limit = 300 ) {
		$e    = OM_Insights::events_table();
		$rows = self::rows(
			"SELECT item,
				SUM(CASE WHEN type = 'view' THEN 1 ELSE 0 END) AS views,
				COUNT(DISTINCT CASE WHEN type = 'view' THEN sid END) AS viewers,
				SUM(CASE WHEN type = 'save' THEN 1 ELSE 0 END) AS saves,
				SUM(CASE WHEN type = 'compare' THEN 1 ELSE 0 END) AS compares,
				SUM(CASE WHEN type = 'share' THEN 1 ELSE 0 END) AS shares,
				SUM(CASE WHEN type = 'option' THEN 1 ELSE 0 END) AS options,
				SUM(CASE WHEN type = 'lead' AND label = 'hint' THEN 1 ELSE 0 END) AS hints,
				SUM(CASE WHEN type = 'lead' AND label <> 'hint' THEN 1 ELSE 0 END) AS leads,
				MAX(CASE WHEN type = 'view' THEN label END) AS title,
				MAX(CASE WHEN type = 'view' THEN val END) AS price
			FROM {$e} WHERE day BETWEEN %s AND %s AND item <> '' AND type IN ('view','save','compare','share','option','lead')
			GROUP BY item ORDER BY views DESC, saves DESC LIMIT %d",
			array( $this->from, $this->to, $limit )
		);
		$time = array();
		foreach ( self::rows( "SELECT item, COALESCE(AVG(dur), 0) AS dur FROM {$e} WHERE type = 'pageview' AND item <> '' AND day BETWEEN %s AND %s GROUP BY item", array( $this->from, $this->to ) ) as $r ) {
			$time[ $r['item'] ] = (float) $r['dur'];
		}
		foreach ( $rows as &$r ) {
			$r['dur'] = $time[ $r['item'] ] ?? 0;
		}
		unset( $r );
		return $rows;
	}

	private function lines() {
		$e = OM_Insights::events_table();
		return self::rows(
			"SELECT SUBSTR(item, 1, INSTR(item, '|') - 1) AS line, COUNT(*) AS views, COUNT(DISTINCT sid) AS visits
			FROM {$e} WHERE type = 'view' AND item <> '' AND day BETWEEN %s AND %s GROUP BY line ORDER BY views DESC LIMIT 12",
			array( $this->from, $this->to )
		);
	}

	private function options() {
		$e   = OM_Insights::events_table();
		$out = array();
		foreach ( self::rows( "SELECT label, meta, COUNT(*) AS n FROM {$e} WHERE type = 'option' AND day BETWEEN %s AND %s GROUP BY label, meta ORDER BY n DESC LIMIT 200", array( $this->from, $this->to ) ) as $r ) {
			$out[ $r['label'] ][ $r['meta'] ] = (int) $r['n'];
		}
		return $out;
	}

	private function compare_groups() {
		$e = OM_Insights::events_table();
		// Each compare is one row per design with the same "group"; count each group once.
		return self::rows(
			"SELECT meta AS grp, COUNT(DISTINCT sid) AS visits FROM {$e} WHERE type = 'compare' AND meta <> '' AND day BETWEEN %s AND %s GROUP BY meta ORDER BY visits DESC LIMIT 12",
			array( $this->from, $this->to )
		);
	}

	private function reels() {
		$e = OM_Insights::events_table();
		return self::rows(
			"SELECT item, SUM(CASE WHEN label = 'view' THEN 1 ELSE 0 END) AS views, SUM(CASE WHEN label = 'tap' THEN 1 ELSE 0 END) AS taps FROM {$e} WHERE type = 'reel' AND day BETWEEN %s AND %s GROUP BY item ORDER BY views DESC LIMIT 15",
			array( $this->from, $this->to )
		);
	}

	private function searches() {
		$e = OM_Insights::events_table();
		$s = OM_Insights::sessions_table();
		$top = self::rows(
			"SELECT LOWER(e.label) AS q, COUNT(*) AS n, COUNT(DISTINCT e.sid) AS visits, COUNT(DISTINCT CASE WHEN v.leads > 0 THEN e.sid END) AS converted
			FROM {$e} e LEFT JOIN {$s} v ON v.sid = e.sid WHERE e.type = 'search' AND e.label <> '' AND e.day BETWEEN %s AND %s GROUP BY q ORDER BY n DESC LIMIT 60",
			array( $this->from, $this->to )
		);
		$zero = self::rows(
			"SELECT LOWER(label) AS q, COUNT(*) AS n FROM {$e} WHERE type = 'search_zero' AND label <> '' AND day BETWEEN %s AND %s GROUP BY q ORDER BY n DESC LIMIT 40",
			array( $this->from, $this->to )
		);
		$filters = array();
		foreach ( self::rows( "SELECT meta, COUNT(*) AS n FROM {$e} WHERE type IN ('pageview','filter') AND meta <> '' AND day BETWEEN %s AND %s GROUP BY meta ORDER BY n DESC LIMIT 500", array( $this->from, $this->to ) ) as $r ) {
			foreach ( explode( '&', (string) $r['meta'] ) as $pair ) {
				$kv = explode( '=', $pair, 2 );
				if ( 2 === count( $kv ) && '' !== $kv[1] && 'q' !== $kv[0] ) {
					$filters[ $kv[0] ][ $kv[1] ] = ( $filters[ $kv[0] ][ $kv[1] ] ?? 0 ) + (int) $r['n'];
				}
			}
		}
		foreach ( $filters as &$values ) {
			arsort( $values );
		}
		unset( $values );
		return array( 'top' => $top, 'zero' => $zero, 'filters' => $filters );
	}

	/** Every action, by type and label. */
	private function actions() {
		$e   = OM_Insights::events_table();
		$out = array();
		foreach ( self::rows(
			"SELECT type, label, COUNT(*) AS n, COUNT(DISTINCT sid) AS visits FROM {$e}
			WHERE day BETWEEN %s AND %s AND type IN ('save','compare','share','option','builder','diamond','designer','hint','assistant','quiz','booking','call','email','directions','outbound','cta','search','filter','view')
			GROUP BY type, label",
			array( $this->from, $this->to )
		) as $r ) {
			$out[ $r['type'] ][ $r['label'] ] = array( (int) $r['n'], (int) $r['visits'] );
		}
		return $out;
	}

	private function clicks( $type, $limit = 20 ) {
		$e = OM_Insights::events_table();
		return self::rows(
			"SELECT label, meta, COUNT(*) AS n, COUNT(DISTINCT sid) AS visits FROM {$e} WHERE type = %s AND day BETWEEN %s AND %s GROUP BY label, meta ORDER BY n DESC LIMIT %d",
			array( $type, $this->from, $this->to, $limit )
		);
	}

	/**
	 * Visits that reached each step. Steps are counted so each is part of the
	 * one before: "reached at least this far" for step-by-step tools (someone
	 * at step 3 of the booking window got past step 2), "and then" for the
	 * shopping path.
	 */
	private function funnels() {
		$e    = OM_Insights::events_table();
		$s    = OM_Insights::sessions_table();
		$args = array( $this->from, $this->to );
		$n    = static function ( $sql ) use ( $args ) {
			return (int) ( self::row( $sql, $args )['n'] ?? 0 );
		};
		// The visits (sid => true) matching a condition on their actions.
		$set = static function ( $where ) use ( $e, $args ) {
			$out = array();
			foreach ( self::rows( "SELECT DISTINCT sid FROM {$e} WHERE day BETWEEN %s AND %s AND {$where}", $args ) as $r ) {
				$out[ $r['sid'] ] = true;
			}
			return $out;
		};
		// Each step keeps only the visits of the step before. The first $tool
		// steps are one tool's own screens: reaching a later screen counts as
		// having passed the earlier ones.
		$chain = static function ( $steps, $tool = 0 ) {
			for ( $i = min( $tool, count( $steps ) ) - 2; $i >= 0; $i-- ) {
				$steps[ $i ][1] = $steps[ $i ][1] + $steps[ $i + 1 ][1];
			}
			$out  = array();
			$prev = null;
			foreach ( $steps as $step ) {
				$visits = null === $prev ? $step[1] : array_intersect_key( $step[1], $prev );
				$out[]  = array( $step[0], count( $visits ) );
				$prev   = $visits;
			}
			return $out;
		};
		$looked = array();
		foreach ( self::rows( "SELECT sid FROM {$s} WHERE day BETWEEN %s AND %s AND products > 0", $args ) as $r ) {
			$looked[ $r['sid'] ] = true;
		}
		$shop = $chain(
			array(
				array( __( 'Looked at a design', 'om-catalog' ), $looked ),
				array( __( '...and saved or compared one', 'om-catalog' ), $set( "type IN ('save','compare')" ) ),
				array( __( '...and got in touch', 'om-catalog' ), $set( "type = 'lead'" ) ),
			)
		);
		array_unshift( $shop, array( __( 'Visits', 'om-catalog' ), $n( "SELECT COUNT(*) AS n FROM {$s} WHERE day BETWEEN %s AND %s" ) ) );
		return array(
			'shop'    => $shop,
			'booking' => $chain(
				array(
					array( __( 'Opened the booking window', 'om-catalog' ), $set( "type = 'booking' AND label = 'open'" ) ),
					array( __( 'Picked a day', 'om-catalog' ), $set( "type = 'booking' AND label = 'step' AND val >= 2" ) ),
					array( __( 'Reached name and number', 'om-catalog' ), $set( "type = 'booking' AND label = 'step' AND val >= 3" ) ),
					array( __( 'Sent the request', 'om-catalog' ), $set( "type = 'booking' AND label = 'request'" ) ),
				),
				4
			),
			'builder' => $chain(
				array(
					array( __( 'Step 1: setting', 'om-catalog' ), $set( "type = 'builder' AND val = 1" ) ),
					array( __( 'Step 2: diamond', 'om-catalog' ), $set( "type = 'builder' AND val = 2" ) ),
					array( __( 'Step 3: review', 'om-catalog' ), $set( "type = 'builder' AND val >= 3" ) ),
					array( __( 'Asked about or emailed the ring', 'om-catalog' ), $set( "type = 'lead' AND label IN ('ring_design','inquiry','booking')" ) ),
				),
				3
			),
			'quiz'    => $chain(
				array(
					array( __( 'Started the quiz', 'om-catalog' ), $set( "type = 'quiz' AND label = 'start'" ) ),
					array( __( 'Answered all four', 'om-catalog' ), $set( "type = 'quiz' AND label = 'complete'" ) ),
					array( __( 'Emailed their matches or booked', 'om-catalog' ), $set( "type = 'lead' AND label IN ('quiz_email','booking')" ) ),
				),
				2
			),
			// Two people: the sender's visit, then the partner's. Counted as hints, not visits.
			'hint'    => array(
				array( __( 'Opened the hint form', 'om-catalog' ), $n( "SELECT COUNT(DISTINCT sid) AS n FROM {$e} WHERE day BETWEEN %s AND %s AND type = 'hint' AND label = 'open'" ) ),
				array( __( 'Sent a hint', 'om-catalog' ), $n( "SELECT COUNT(*) AS n FROM {$e} WHERE day BETWEEN %s AND %s AND type = 'lead' AND label = 'hint'" ) ),
				array( __( 'Partner opened the hint page', 'om-catalog' ), $n( "SELECT COUNT(DISTINCT sid) AS n FROM {$e} WHERE day BETWEEN %s AND %s AND type = 'hint' AND label = 'page_view' AND meta = 'recipient'" ) ),
				array( __( 'Partner booked or asked', 'om-catalog' ), $n( "SELECT COUNT(DISTINCT sid) AS n FROM {$e} WHERE day BETWEEN %s AND %s AND type = 'hint' AND label IN ('page_book','page_ask') AND meta = 'recipient'" ) ),
			),
		);
	}

	private function leads( $limit = 200 ) {
		$e = OM_Insights::events_table();
		$s = OM_Insights::sessions_table();
		$rows = self::rows(
			"SELECT e.ts, e.label AS kind, e.item, e.meta, e.val, e.sid, e.vid, e.page, v.channel, v.ref_host, v.landing, v.visit_no, v.pages, v.engaged, v.lead_name, v.device, v.utm_campaign
			FROM {$e} e LEFT JOIN {$s} v ON v.sid = e.sid WHERE e.type = 'lead' AND e.day BETWEEN %s AND %s ORDER BY e.ts DESC LIMIT %d",
			array( $this->from, $this->to, $limit )
		);
		// First visit of each lead's visitor (for "days to decide").
		$vids = array_values( array_unique( array_filter( wp_list_pluck( $rows, 'vid' ) ) ) );
		$first = array();
		foreach ( array_chunk( $vids, 200 ) as $chunk ) {
			$place = implode( ',', array_fill( 0, count( $chunk ), '%s' ) );
			foreach ( self::rows( 'SELECT vid, MIN(started) AS first, COUNT(*) AS visits FROM ' . $s . " WHERE vid IN ({$place}) GROUP BY vid", $chunk ) as $r ) {
				$first[ $r['vid'] ] = $r;
			}
		}
		$titles = $this->page_titles( wp_list_pluck( $rows, 'landing' ), gmdate( 'Y-m-d', strtotime( $this->from . ' 12:00:00' ) - DAY_IN_SECONDS ), $this->to );
		foreach ( $rows as &$r ) {
			$r['first']         = (int) ( $first[ $r['vid'] ]['first'] ?? 0 );
			$r['visits']        = (int) ( $first[ $r['vid'] ]['visits'] ?? 0 );
			$r['landing_title'] = $titles[ (string) $r['landing'] ] ?? '';
		}
		unset( $r );
		return $rows;
	}

	/* ---------------------------------------------------------------
	 * Words for what's stored
	 * ------------------------------------------------------------- */

	private static function channel_name( $key ) {
		return OM_Insights::channels()[ $key ] ?? ( '' === $key ? __( 'Unknown', 'om-catalog' ) : $key );
	}

	private static function device_name( $key ) {
		$names = array( 'phone' => __( 'Phones', 'om-catalog' ), 'tablet' => __( 'Tablets', 'om-catalog' ), 'desktop' => __( 'Computers', 'om-catalog' ) );
		return $names[ $key ] ?? __( 'Unknown', 'om-catalog' );
	}

	private static function device_one( $key ) {
		$names = array( 'phone' => __( 'Phone', 'om-catalog' ), 'tablet' => __( 'Tablet', 'om-catalog' ), 'desktop' => __( 'Computer', 'om-catalog' ) );
		return $names[ $key ] ?? __( 'Unknown', 'om-catalog' );
	}

	/** A page title without the site's name after it. */
	private static function title( $title, $path ) {
		return OM_Insights::page_name( $title, $path );
	}

	private static function duration( $seconds ) {
		return OM_Insights::duration( $seconds );
	}

	private static function pct( $n, $of, $digits = 1 ) {
		return $of > 0 ? number_format_i18n( 100 * $n / $of, $digits ) . '%' : '–';
	}

	private static function visitor_label( $vid, $name = '' ) {
		if ( '' !== trim( (string) $name ) ) {
			return $name;
		}
		/* translators: %s: short anonymous visitor code. */
		return sprintf( __( 'Visitor %s', 'om-catalog' ), strtoupper( substr( (string) $vid, 0, 4 ) ) );
	}

	/** Name, photo and link of a design ("line|STYLE"). */
	private static function design( $key, $title = '' ) {
		return OM_Insights::design( $key, $title );
	}

	private static function design_cell( $key, $title = '' ) {
		$d = self::design( $key, $title );
		return '<a class="om-ins-design" href="' . esc_url( $d['url'] ) . '" target="_blank" rel="noopener">'
			. ( $d['image'] ? '<img src="' . esc_url( $d['image'] ) . '" alt="" loading="lazy" width="40" height="40" />' : '<span class="om-ins-noimg" aria-hidden="true"></span>' )
			. '<span>' . esc_html( $d['title'] ) . '<small>' . esc_html( sprintf( /* translators: 1: style number, 2: product line. */ __( 'Style %1$s · %2$s', 'om-catalog' ), $d['style'], ucwords( str_replace( '-', ' ', $d['line'] ) ) ) ) . '</small></span></a>';
	}

	/** Page titles for addresses (lists that keep only the address), seen in the period. */
	private function page_titles( $paths, $from = '', $to = '' ) {
		$paths = array_values( array_unique( array_filter( array_map( 'strval', (array) $paths ) ) ) );
		$out   = array();
		$e     = OM_Insights::events_table();
		foreach ( array_chunk( $paths, 100 ) as $chunk ) {
			$place = implode( ',', array_fill( 0, count( $chunk ), '%s' ) );
			$args  = array_merge( array( $from ? $from : $this->from, $to ? $to : $this->to ), $chunk );
			foreach ( self::rows( 'SELECT page, MAX(label) AS title FROM ' . $e . " WHERE type = 'pageview' AND day BETWEEN %s AND %s AND label <> '' AND page IN ({$place}) GROUP BY page", $args ) as $r ) {
				$out[ $r['page'] ] = (string) $r['title'];
			}
		}
		return $out;
	}

	private static function page_cell( $path, $title ) {
		$label = self::title( $title, $path );
		$link  = '/om-hint/' === $path || '' === (string) $path ? '' : home_url( $path );
		return ( $link ? '<a href="' . esc_url( $link ) . '" target="_blank" rel="noopener">' . esc_html( $label ) . '</a>' : esc_html( $label ) ) . ( $label !== $path ? '<small class="om-ins-path">' . esc_html( $path ) . '</small>' : '' );
	}

	/** What one action was, in words (journeys and the actions tab). */
	public static function action_words( $type, $label, $meta = '', $val = 0 ) {
		$label = (string) $label;
		$names = array(
			'assistant'  => array( 'open' => __( 'Opened the jeweller assistant', 'om-catalog' ), 'message' => __( 'Asked the assistant a question', 'om-catalog' ), 'starter' => __( 'Saw the assistant\'s starter question', 'om-catalog' ) ),
			'hint'       => array( 'open' => __( 'Opened the "Drop a hint" form', 'om-catalog' ), 'sent' => __( 'Sent a hint', 'om-catalog' ), 'page_view' => __( 'Opened a hint page', 'om-catalog' ), 'page_book' => __( 'Tapped Book a viewing on a hint page', 'om-catalog' ), 'page_ask' => __( 'Tapped Ask about it on a hint page', 'om-catalog' ) ),
			'quiz'       => array( 'start' => __( 'Started the ring style quiz', 'om-catalog' ), 'step' => __( 'Answered a quiz question', 'om-catalog' ), 'complete' => __( 'Finished the quiz', 'om-catalog' ), 'email_open' => __( 'Opened "Email me my matches"', 'om-catalog' ) ),
			'booking'    => array( 'open' => __( 'Opened the booking window', 'om-catalog' ), 'step' => __( 'Went on in the booking window', 'om-catalog' ), 'request' => __( 'Sent a visit request', 'om-catalog' ) ),
			'diamond'    => array( 'guide' => __( 'Used "Help me choose" (diamonds)', 'om-catalog' ), 'guide_pick' => __( 'Picked a suggested diamond', 'om-catalog' ), 'compare_add' => __( 'Added a diamond to compare', 'om-catalog' ), 'compare_view' => __( 'Opened the diamond comparison', 'om-catalog' ), 'true_size' => __( 'Opened the true size viewer', 'om-catalog' ) ),
			'designer'   => array( 'open' => __( 'Opened the ring designer', 'om-catalog' ) ),
		);
		if ( isset( $names[ $type ][ $label ] ) ) {
			return $names[ $type ][ $label ];
		}
		switch ( $type ) {
			case 'builder':
				/* translators: %d: ring builder step. */
				return sprintf( __( 'Ring builder step %d', 'om-catalog' ), (int) $val );
			case 'save':
				return __( 'Saved a design', 'om-catalog' );
			case 'compare':
				return __( 'Compared designs', 'om-catalog' );
			case 'share':
				return __( 'Shared', 'om-catalog' );
			case 'option':
				return OM_Insights::option_name( $label );
			case 'call':
				return __( 'Tapped to call', 'om-catalog' );
			case 'email':
				return __( 'Tapped an email address', 'om-catalog' );
			case 'directions':
				return __( 'Opened directions', 'om-catalog' );
			case 'outbound':
				return __( 'Left for another site', 'om-catalog' );
			case 'cta':
				return __( 'Clicked a button', 'om-catalog' );
			case 'search':
				return __( 'Searched', 'om-catalog' );
			case 'search_zero':
				return __( 'Search found nothing', 'om-catalog' );
			case 'filter':
				return __( 'Filtered the catalog', 'om-catalog' );
			case 'reel':
				return 'tap' === $label ? __( 'Tapped a story reel', 'om-catalog' ) : __( 'Watched a story reel', 'om-catalog' );
		}
		return OM_Insights::types()[ $type ] ?? $type;
	}

	/* ---------------------------------------------------------------
	 * Drawing (inline SVG and HTML; numbers also as tables)
	 * ------------------------------------------------------------- */

	/** A clean top for a scale. */
	private static function nice_top( $max ) {
		$max = max( 1, $max );
		$mag = pow( 10, floor( log10( $max ) ) );
		foreach ( array( 1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10 ) as $f ) {
			if ( $f * $mag >= $max ) {
				return max( 4, $f * $mag );
			}
		}
		return max( 4, 10 * $mag );
	}

	private static function compact( $n ) {
		$n = (float) $n;
		if ( $n >= 1000000 ) {
			return number_format_i18n( $n / 1000000, 1 ) . 'M';
		}
		if ( $n >= 10000 ) {
			return number_format_i18n( $n / 1000, 0 ) . 'K';
		}
		if ( $n >= 1000 ) {
			return number_format_i18n( $n / 1000, 1 ) . 'K';
		}
		return number_format_i18n( $n );
	}

	/**
	 * Columns over time: one measure as thin bars (rounded at the data end,
	 * square at the baseline), the day's other numbers in its tooltip.
	 */
	private function columns( $series, $measure, $title, $desc ) {
		$points = $series['points'];
		$unit   = $series['unit'];
		$values = array();
		foreach ( $points as $k => $p ) {
			$values[ $k ] = (int) $p[ $measure ];
		}
		$top   = self::nice_top( $values ? max( $values ) : 0 );
		$w     = 1000;
		$h     = 240;
		$left  = 44;
		$right = 8;
		$bot   = 26;
		$ph    = $h - $bot - 10;
		$n     = max( 1, count( $values ) );
		$slot  = ( $w - $left - $right ) / $n;
		$bw    = min( 24, max( 2, $slot - 2 ) );
		$fmt   = 'day' === $unit ? 'M j' : ( 'week' === $unit ? 'M j' : 'M Y' );
		$today = wp_date( 'Y-m-d' );
		$label = static function ( $key ) use ( $unit, $fmt, $today ) {
			$t = strtotime( $key . ' 12:00:00' );
			/* translators: %s: first day of a week. */
			$name = 'week' === $unit ? sprintf( __( 'Week of %s', 'om-catalog' ), wp_date( 'M j', $t ) ) : wp_date( 'day' === $unit ? 'D, M j' : $fmt, $t );
			$open = 'day' === $unit ? $key === $today : ( 'week' === $unit ? $key <= $today && $today <= gmdate( 'Y-m-d', $t + 6 * DAY_IN_SECONDS ) : substr( $key, 0, 7 ) === substr( $today, 0, 7 ) );
			/* translators: %s: day, week or month still going on. */
			return $open ? sprintf( __( '%s (so far)', 'om-catalog' ), $name ) : $name;
		};
		ob_start();
		echo '<figure class="om-ins-figure"><figcaption><h2>' . esc_html( $title ) . '</h2><p>' . esc_html( $desc ) . '</p></figcaption>';
		echo '<div class="om-ins-chart"><svg viewBox="0 0 ' . (int) $w . ' ' . (int) $h . '" role="img" aria-label="' . esc_attr( $title . ': ' . number_format_i18n( array_sum( $values ) ) ) . '">';
		foreach ( array( 0, 0.5, 1 ) as $f ) {
			$y = 10 + $ph * ( 1 - $f );
			echo '<line class="' . ( $f ? 'grid' : 'axis' ) . '" x1="' . (int) $left . '" x2="' . (int) ( $w - $right ) . '" y1="' . esc_attr( $y ) . '" y2="' . esc_attr( $y ) . '"/>';
			echo '<text class="tick" x="' . (int) ( $left - 8 ) . '" y="' . esc_attr( $y + 4 ) . '" text-anchor="end">' . esc_html( self::compact( $top * $f ) ) . '</text>';
		}
		$i     = 0;
		$marks = array( 0, (int) floor( ( $n - 1 ) / 2 ), $n - 1 );
		foreach ( $values as $key => $v ) {
			$p   = $points[ $key ];
			$x   = $left + $i * $slot + ( $slot - $bw ) / 2;
			$bh  = $v ? max( 2, $ph * $v / $top ) : 0;
			$r   = min( 4, $bw / 2, $bh );
			$tip = $label( $key ) . "\n" . sprintf(
				/* translators: 1: visits, 2: visitors, 3: page views, 4: leads. */
				__( '%1$s visits · %2$s visitors · %3$s page views · %4$s leads', 'om-catalog' ),
				number_format_i18n( $p['visits'] ),
				number_format_i18n( $p['visitors'] ),
				number_format_i18n( $p['pages'] ),
				number_format_i18n( $p['leads'] )
			);
			echo '<g class="col" tabindex="0" data-tip="' . esc_attr( $tip ) . '"><rect class="hit" x="' . esc_attr( round( $left + $i * $slot, 2 ) ) . '" y="10" width="' . esc_attr( round( $slot, 2 ) ) . '" height="' . esc_attr( $ph ) . '"/>';
			if ( $bh > 0 ) {
				printf(
					'<path class="bar" d="M%1$s,%2$s v%3$s a%4$s,%4$s 0 0 1 %4$s,-%4$s h%5$s a%4$s,%4$s 0 0 1 %4$s,%4$s v%6$s z"/>',
					esc_attr( round( $x, 2 ) ),
					esc_attr( round( 10 + $ph, 2 ) ),
					esc_attr( -round( $bh - $r, 2 ) ),
					esc_attr( round( $r, 2 ) ),
					esc_attr( round( $bw - 2 * $r, 2 ) ),
					esc_attr( round( $bh - $r, 2 ) )
				);
			}
			echo '</g>';
			if ( in_array( $i, $marks, true ) ) {
				$anchor = 0 === $i ? 'start' : ( $n - 1 === $i ? 'end' : 'middle' );
				$tx     = 0 === $i ? $x : ( $n - 1 === $i ? $x + $bw : $x + $bw / 2 );
				echo '<text class="tick" x="' . esc_attr( round( $tx, 2 ) ) . '" y="' . (int) ( $h - 6 ) . '" text-anchor="' . esc_attr( $anchor ) . '">' . esc_html( wp_date( 'month' === $unit ? 'M Y' : 'M j', strtotime( $key . ' 12:00:00' ) ) ) . '</text>';
			}
			$i++;
		}
		echo '</svg></div>';
		echo '<details class="om-ins-data"><summary>' . esc_html__( 'Show as table', 'om-catalog' ) . '</summary><table class="om-ins-table"><thead><tr><th scope="col">' . esc_html( 'day' === $unit ? __( 'Day', 'om-catalog' ) : ( 'week' === $unit ? __( 'Week', 'om-catalog' ) : __( 'Month', 'om-catalog' ) ) ) . '</th><th scope="col" class="num">' . esc_html__( 'Visits', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'Visitors', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'Page views', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'Leads', 'om-catalog' ) . '</th></tr></thead><tbody>';
		foreach ( array_reverse( $points, true ) as $key => $p ) {
			echo '<tr><td>' . esc_html( $label( $key ) ) . '</td><td class="num">' . esc_html( number_format_i18n( $p['visits'] ) ) . '</td><td class="num">' . esc_html( number_format_i18n( $p['visitors'] ) ) . '</td><td class="num">' . esc_html( number_format_i18n( $p['pages'] ) ) . '</td><td class="num">' . esc_html( number_format_i18n( $p['leads'] ) ) . '</td></tr>';
		}
		echo '</tbody></table></details></figure>';
		return ob_get_clean();
	}

	/**
	 * Ranked horizontal bars: name, a thin bar in one colour, the number at
	 * its end (and a second, quieter figure when given).
	 *
	 * @param array $rows [ [ name-html, value, extra-text, tooltip ] ].
	 */
	private static function hbars( $rows, $empty, $total = 0 ) {
		if ( ! $rows ) {
			return '<p class="om-ins-empty">' . esc_html( $empty ) . '</p>';
		}
		$max = max( 1, max( array_map( static function ( $r ) { return (float) $r[1]; }, $rows ) ) );
		$out = '<ul class="om-ins-hbars" role="list">';
		foreach ( $rows as $r ) {
			$share = $total > 0 ? ' <span class="om-ins-share">' . esc_html( self::pct( $r[1], $total, 0 ) ) . '</span>' : '';
			$tip   = $r[3] ?? '';
			$out  .= '<li' . ( $tip ? ' tabindex="0" data-tip="' . esc_attr( $tip ) . '"' : '' ) . '><span class="om-ins-hname">' . $r[0] . '</span><span class="om-ins-htrack">' . ( (float) $r[1] > 0 ? '<span class="om-ins-hbar" style="width:' . esc_attr( round( 100 * (float) $r[1] / $max, 2 ) ) . '%"></span>' : '' ) . '<span class="om-ins-hval">' . esc_html( number_format_i18n( (float) $r[1] ) ) . $share . ( ! empty( $r[2] ) ? ' <small>' . esc_html( $r[2] ) . '</small>' : '' ) . '</span></span></li>'; // phpcs:ignore WordPress.Security.EscapeOutput -- name cell pre-escaped by callers.
		}
		return $out . '</ul>';
	}

	/**
	 * A sortable table; cells are pre-escaped HTML, numbers (data-v) align
	 * right. Past $cap rows the rest wait behind a "Show all" button.
	 */
	private static function table( $heads, $rows, $empty, $class = '', $cap = 0 ) {
		if ( ! $rows ) {
			return '<p class="om-ins-empty">' . esc_html( $empty ) . '</p>';
		}
		// A column holding numbers anywhere is a number column (right aligned).
		$numeric = array();
		foreach ( $rows as $row ) {
			foreach ( $row as $i => $cell ) {
				$numeric[ $i ] = ! empty( $numeric[ $i ] ) || is_array( $cell );
			}
		}
		$cap = $cap > 0 && count( $rows ) > $cap + 5 ? (int) $cap : 0;
		$out = '<div class="om-ins-scroll"><table class="om-ins-table om-ins-sortable ' . esc_attr( $class ) . '"' . ( $cap ? ' data-om-ins-cap="' . $cap . '"' : '' ) . '><thead><tr>';
		foreach ( $heads as $i => $head ) {
			$out .= '<th scope="col"' . ( ! empty( $numeric[ $i ] ) ? ' class="num"' : '' ) . '>' . ( '' !== $head ? '<button type="button" class="om-ins-sort">' . esc_html( $head ) . '</button>' : '' ) . '</th>';
		}
		$out .= '</tr></thead><tbody>';
		foreach ( $rows as $row ) {
			$out .= '<tr>';
			foreach ( $row as $i => $cell ) {
				if ( is_array( $cell ) ) {
					// [ display, sort value ].
					$out .= '<td class="num" data-v="' . esc_attr( $cell[1] ) . '">' . $cell[0] . '</td>';
				} else {
					$out .= '<td' . ( ! empty( $numeric[ $i ] ) ? ' class="num"' : '' ) . '>' . $cell . '</td>';
				}
			}
			$out .= '</tr>';
		}
		$out .= '</tbody></table></div>';
		if ( $cap ) {
			/* translators: %s: number of rows. */
			$out .= '<p class="om-ins-showall" hidden><button type="button" class="button" data-om-ins-showall>' . esc_html( sprintf( __( 'Show all %s', 'om-catalog' ), number_format_i18n( count( $rows ) ) ) ) . '</button></p>';
		}
		return $out;
	}

	/** A number cell: shown formatted, sorted by value. */
	private static function n( $value, $display = null ) {
		return array( esc_html( null === $display ? number_format_i18n( (float) $value ) : $display ), (float) $value );
	}

	/** Busy hours: days down, hours across, five blue steps (darker is busier) plus empty. */
	private static function heatmap( $grid ) {
		$max = 0;
		foreach ( $grid as $hours ) {
			$max = max( $max, max( $hours ) );
		}
		if ( ! $max ) {
			return '<p class="om-ins-empty">' . esc_html__( 'No visits in this period yet.', 'om-catalog' ) . '</p>';
		}
		$start = (int) get_option( 'start_of_week', 0 );
		$days  = array();
		for ( $i = 0; $i < 7; $i++ ) {
			$days[] = ( $start + $i ) % 7;
		}
		$names = array( __( 'Sun', 'om-catalog' ), __( 'Mon', 'om-catalog' ), __( 'Tue', 'om-catalog' ), __( 'Wed', 'om-catalog' ), __( 'Thu', 'om-catalog' ), __( 'Fri', 'om-catalog' ), __( 'Sat', 'om-catalog' ) );
		$full  = array( __( 'Sunday', 'om-catalog' ), __( 'Monday', 'om-catalog' ), __( 'Tuesday', 'om-catalog' ), __( 'Wednesday', 'om-catalog' ), __( 'Thursday', 'om-catalog' ), __( 'Friday', 'om-catalog' ), __( 'Saturday', 'om-catalog' ) );
		$hour  = static function ( $h ) {
			// The hour itself, in the site's own clock (no time zone shift).
			return wp_date( 'ga', $h * HOUR_IN_SECONDS, new DateTimeZone( 'UTC' ) );
		};
		$out = '<div class="om-ins-heat" role="img" aria-label="' . esc_attr__( 'Visits by day of week and hour', 'om-catalog' ) . '"><div class="om-ins-heat-grid">';
		$out .= '<span></span>';
		for ( $h = 0; $h < 24; $h++ ) {
			$out .= '<span class="om-ins-heat-h">' . ( 0 === $h % 3 ? esc_html( $hour( $h ) ) : '' ) . '</span>';
		}
		foreach ( $days as $d ) {
			$out .= '<span class="om-ins-heat-d">' . esc_html( $names[ $d ] ) . '</span>';
			for ( $h = 0; $h < 24; $h++ ) {
				$v     = (int) ( $grid[ $d ][ $h ] ?? 0 );
				$step  = $v ? min( 5, (int) ceil( 5 * $v / $max ) ) : 0;
				$out  .= '<span class="om-ins-cell s' . (int) $step . '" tabindex="0" data-tip="' . esc_attr( $full[ $d ] . ' ' . $hour( $h ) . '–' . $hour( ( $h + 1 ) % 24 ) . ': ' . sprintf( /* translators: %s: number of visits. */ _n( '%s visit', '%s visits', $v, 'om-catalog' ), number_format_i18n( $v ) ) ) . '"></span>';
			}
		}
		$out .= '</div><div class="om-ins-scale" aria-hidden="true"><span>' . esc_html__( 'Fewer', 'om-catalog' ) . '</span>';
		for ( $s = 0; $s <= 5; $s++ ) {
			$out .= '<i class="om-ins-cell s' . (int) $s . '"></i>';
		}
		$out .= '<span>' . esc_html__( 'More visits', 'om-catalog' ) . '</span></div></div>';
		// The same numbers as a table.
		$out .= '<details class="om-ins-data"><summary>' . esc_html__( 'Show as table', 'om-catalog' ) . '</summary><div class="om-ins-scroll"><table class="om-ins-table"><thead><tr><th scope="col">' . esc_html__( 'Day', 'om-catalog' ) . '</th>';
		for ( $h = 0; $h < 24; $h++ ) {
			$out .= '<th scope="col" class="num">' . esc_html( $hour( $h ) ) . '</th>';
		}
		$out .= '</tr></thead><tbody>';
		foreach ( $days as $d ) {
			$out .= '<tr><th scope="row">' . esc_html( $full[ $d ] ) . '</th>';
			for ( $h = 0; $h < 24; $h++ ) {
				$out .= '<td class="num">' . esc_html( number_format_i18n( (int) ( $grid[ $d ][ $h ] ?? 0 ) ) ) . '</td>';
			}
			$out .= '</tr>';
		}
		return $out . '</tbody></table></div></details>';
	}

	/** Steps as bars against the first, with the share kept at each step. */
	private static function funnel( $title, $desc, $steps ) {
		$first = max( 1, (int) ( $steps[0][1] ?? 0 ) );
		$out   = '<figure class="om-ins-card om-ins-funnel"><figcaption><h2>' . esc_html( $title ) . '</h2><p>' . esc_html( $desc ) . '</p></figcaption><ol>';
		$prev  = 0;
		foreach ( $steps as $i => $s ) {
			$n    = (int) $s[1];
			$keep = $i && $prev ? sprintf( /* translators: %s: percent of the step before. */ __( '%s of the step before', 'om-catalog' ), self::pct( $n, $prev, 0 ) ) : '';
			$out .= '<li tabindex="0" data-tip="' . esc_attr( $s[0] . ': ' . number_format_i18n( $n ) . ( $keep ? ' (' . $keep . ')' : '' ) ) . '"><span class="om-ins-fname">' . esc_html( $s[0] ) . '</span><span class="om-ins-htrack">' . ( $n > 0 ? '<span class="om-ins-hbar" style="width:' . esc_attr( min( 100, round( 100 * $n / $first, 2 ) ) ) . '%"></span>' : '' ) . '<span class="om-ins-hval">' . esc_html( number_format_i18n( $n ) ) . ( $i ? ' <span class="om-ins-share">' . esc_html( self::pct( $n, (int) $steps[0][1], 0 ) ) . '</span>' : '' ) . '</span></span>' . ( $keep ? '<small>' . esc_html( $keep ) . '</small>' : '' ) . '</li>';
			$prev = $n;
		}
		return $out . '</ol></figure>';
	}

	/** One headline number with its change against the period before. */
	private static function tile( $label, $value, $now, $before, $up_is_good = true, $hint = '' ) {
		$delta = '';
		if ( null !== $before ) {
			if ( $before > 0 ) {
				$pct   = round( 100 * ( $now - $before ) / $before );
				$good  = 0 === (int) $pct ? null : ( ( $pct > 0 ) === $up_is_good );
				$delta = '<small class="om-ins-delta' . ( null === $good ? '' : ( $good ? ' up' : ' down' ) ) . '">' . ( $pct > 0 ? '▲ +' : ( $pct < 0 ? '▼ ' : '' ) ) . esc_html( $pct . '%' ) . ' <span>' . esc_html__( 'vs the period before', 'om-catalog' ) . '</span></small>';
			} elseif ( $now > 0 ) {
				$delta = '<small class="om-ins-delta">' . esc_html__( 'New: none in the period before', 'om-catalog' ) . '</small>';
			}
		}
		return '<div class="om-ins-tile"' . ( $hint ? ' title="' . esc_attr( $hint ) . '"' : '' ) . '><span class="om-ins-tile-l">' . esc_html( $label ) . '</span><b>' . esc_html( $value ) . '</b>' . $delta . '</div>';
	}

	/* ---------------------------------------------------------------
	 * The page
	 * ------------------------------------------------------------- */

	public static function tabs() {
		return array(
			'overview' => __( 'Overview', 'om-catalog' ),
			'visitors' => __( 'Visitors & sources', 'om-catalog' ),
			'pages'    => __( 'Pages', 'om-catalog' ),
			'products' => __( 'Designs', 'om-catalog' ),
			'searches' => __( 'Searches', 'om-catalog' ),
			'actions'  => __( 'Actions', 'om-catalog' ),
			'funnels'  => __( 'Funnels', 'om-catalog' ),
			'journeys' => __( 'Visitor journeys', 'om-catalog' ),
			'leads'    => __( 'Leads', 'om-catalog' ),
			'live'     => __( 'Live', 'om-catalog' ),
			'settings' => __( 'Settings', 'om-catalog' ),
		);
	}

	public function page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$this->read_range();
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only view switches.
		$tab   = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : 'overview';
		$tab   = isset( self::tabs()[ $tab ] ) ? $tab : 'overview';
		$visit = isset( $_GET['visit'] ) ? OM_Insights::id( sanitize_text_field( wp_unslash( $_GET['visit'] ) ), 12 ) : '';
		$who   = isset( $_GET['visitor'] ) ? OM_Insights::id( sanitize_text_field( wp_unslash( $_GET['visitor'] ) ), 12 ) : '';
		$saved = isset( $_GET['saved'] );
		// phpcs:enable
		$live = $this->live_count();
		echo '<div class="wrap om-ins">';
		echo '<header class="om-ins-head"><div><h1>' . esc_html__( 'Insights', 'om-catalog' ) . '</h1><p>' . esc_html__( 'What visitors do on your website: where they come from, what they look at, save and compare, and what turns into a visit to the store. Collected by your own site, for you only.', 'om-catalog' ) . '</p></div>';
		echo '<a class="om-ins-livechip" href="' . esc_url( $this->url( array( 'tab' => 'live' ) ) ) . '"><span class="om-ins-dot' . ( $live ? ' on' : '' ) . '" aria-hidden="true"></span><span data-om-ins-livecount>' . esc_html( sprintf( /* translators: %s: number of people. */ _n( '%s on the site right now', '%s on the site right now', $live, 'om-catalog' ), number_format_i18n( $live ) ) ) . '</span></a></header><hr class="wp-header-end" />';
		if ( ! OM_Insights::enabled() ) {
			echo '<div class="notice notice-warning inline"><p>' . esc_html__( 'Collecting is switched off. Turn it on under Settings.', 'om-catalog' ) . '</p></div>';
		}
		if ( $saved ) {
			echo '<div class="notice notice-success inline is-dismissible"><p>' . esc_html__( 'Settings saved.', 'om-catalog' ) . '</p></div>';
		}
		echo '<nav class="om-ins-tabs" aria-label="' . esc_attr__( 'Insights sections', 'om-catalog' ) . '">';
		foreach ( self::tabs() as $key => $name ) {
			echo '<a href="' . esc_url( $this->url( array( 'tab' => $key ) ) ) . '"' . ( $key === $tab && ! $visit && ! $who ? ' aria-current="page"' : '' ) . '>' . esc_html( $name ) . '</a>';
		}
		echo '</nav>';
		if ( ! in_array( $tab, array( 'live', 'settings' ), true ) || $visit || $who ) {
			$this->range_bar( $tab );
		}
		echo '<main class="om-ins-main">';
		if ( $visit ) {
			$this->view_visit( $visit );
		} elseif ( $who ) {
			$this->view_visitor( $who );
		} else {
			$method = 'tab_' . $tab;
			$this->$method();
		}
		echo '</main></div>';
	}

	/** The one filter row above everything: the period. */
	private function range_bar( $tab ) {
		echo '<form class="om-ins-range" method="get" action="' . esc_url( admin_url( 'admin.php' ) ) . '">';
		echo '<input type="hidden" name="page" value="' . esc_attr( self::SLUG ) . '" /><input type="hidden" name="tab" value="' . esc_attr( $tab ) . '" /><input type="hidden" name="range" value="custom" />';
		echo '<div class="om-ins-presets" role="group" aria-label="' . esc_attr__( 'Period', 'om-catalog' ) . '">';
		foreach ( self::presets() as $key => $name ) {
			echo '<a href="' . esc_url( add_query_arg( array( 'page' => self::SLUG, 'tab' => $tab, 'range' => $key ), admin_url( 'admin.php' ) ) ) . '"' . ( $key === $this->range ? ' aria-current="true"' : '' ) . '>' . esc_html( $name ) . '</a>';
		}
		echo '</div><div class="om-ins-custom"><label>' . esc_html__( 'From', 'om-catalog' ) . ' <input type="date" name="from" value="' . esc_attr( $this->from ) . '" max="' . esc_attr( wp_date( 'Y-m-d' ) ) . '" /></label><label>' . esc_html__( 'to', 'om-catalog' ) . ' <input type="date" name="to" value="' . esc_attr( $this->to ) . '" max="' . esc_attr( wp_date( 'Y-m-d' ) ) . '" /></label><button class="button" type="submit">' . esc_html__( 'Show', 'om-catalog' ) . '</button></div>';
		echo '<p class="om-ins-period">' . esc_html( wp_date( 'M j, Y', strtotime( $this->from . ' 12:00:00' ) ) . ( $this->from !== $this->to ? ' – ' . wp_date( 'M j, Y', strtotime( $this->to . ' 12:00:00' ) ) : '' ) ) . ' · <a href="' . esc_url( add_query_arg( 'refresh', 1 ) ) . '">' . esc_html__( 'Refresh', 'om-catalog' ) . '</a></p>';
		echo '</form>';
	}

	private function grid_open( $class = '' ) {
		echo '<div class="om-ins-grid ' . esc_attr( $class ) . '">';
	}

	private function card( $title, $desc, $body, $class = '' ) {
		echo '<section class="om-ins-card ' . esc_attr( $class ) . '"><h2>' . esc_html( $title ) . '</h2>' . ( $desc ? '<p class="om-ins-desc">' . esc_html( $desc ) . '</p>' : '' ) . $body . '</section>'; // phpcs:ignore WordPress.Security.EscapeOutput -- body built escaped.
	}

	/* ---------- Overview ---------- */

	private function tab_overview() {
		list( $pf, $pt ) = $this->previous();
		$data = $this->cached(
			'overview',
			function () use ( $pf, $pt ) {
				return array(
					'now'      => $this->kpis( $this->from, $this->to ),
					'before'   => $this->kpis( $pf, $pt ),
					'series'   => $this->series(),
					'channels' => $this->by_visit( 'channel', 9 ),
					'devices'  => $this->by_visit( 'device', 3 ),
					'pages'    => $this->pages( 8 ),
					'products' => $this->products( 8 ),
					'leads'    => $this->leads( 6 ),
				);
			}
		);
		$k = $data['now'];
		$b = $data['before'];
		if ( ! $k['visits'] && ! $b['visits'] ) {
			$this->empty_state();
			return;
		}
		echo '<div class="om-ins-tiles">';
		echo self::tile( __( 'Visitors', 'om-catalog' ), number_format_i18n( $k['visitors'] ), $k['visitors'], $b['visitors'], true, __( 'Different people (each browser counts once).', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Visits', 'om-catalog' ), number_format_i18n( $k['visits'] ), $k['visits'], $b['visits'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Pages viewed', 'om-catalog' ), number_format_i18n( $k['pages'] ), $k['pages'], $b['pages'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Time per visit', 'om-catalog' ), self::duration( $k['engaged'] ), $k['engaged'], $b['engaged'], true, __( 'Average time actively on the site (screen on and in use).', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Designs viewed', 'om-catalog' ), number_format_i18n( $k['products'] ), $k['products'], $b['products'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Saved (hearts)', 'om-catalog' ), number_format_i18n( $k['saves'] ), $k['saves'], $b['saves'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Leads', 'om-catalog' ), number_format_i18n( $k['leads'] ), $k['leads'], $b['leads'], true, __( 'Visit requests, inquiries, hints and emails sent from the site.', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Visits that became leads', 'om-catalog' ), number_format_i18n( $k['conv'], 1 ) . '%', $k['conv'], $b['conv'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo '</div>';

		echo '<section class="om-ins-card">' . $this->columns( $data['series'], 'visits', __( 'Visits', 'om-catalog' ), __( 'Hover a bar for that day\'s visitors, pages and leads.', 'om-catalog' ) ) . '</section>'; // phpcs:ignore WordPress.Security.EscapeOutput

		$this->grid_open();
		$rows = array();
		foreach ( $data['channels'] as $r ) {
			/* translators: 1: leads, 2: conversion rate. */
			$rows[] = array( esc_html( self::channel_name( $r['k'] ) ), (int) $r['visits'], sprintf( _n( '%1$s lead (%2$s)', '%1$s leads (%2$s)', (int) $r['converted'], 'om-catalog' ), number_format_i18n( (int) $r['converted'] ), self::pct( (int) $r['converted'], (int) $r['visits'] ) ) );
		}
		$this->card( __( 'Where visitors come from', 'om-catalog' ), __( 'Visits by source, with how many became leads.', 'om-catalog' ), self::hbars( $rows, __( 'No visits yet.', 'om-catalog' ), $k['visits'] ) );
		$rows = array();
		foreach ( $data['devices'] as $r ) {
			$rows[] = array( esc_html( self::device_name( $r['k'] ) ), (int) $r['visits'], sprintf( /* translators: %s: conversion rate. */ __( '%s became leads', 'om-catalog' ), self::pct( (int) $r['converted'], (int) $r['visits'] ) ) );
		}
		$body  = self::hbars( $rows, __( 'No visits yet.', 'om-catalog' ), $k['visits'] );
		$body .= '<p class="om-ins-foot-note">' . esc_html( sprintf( /* translators: 1: new visitors share, 2: returning share. */ __( 'New visitors %1$s · returning %2$s · quick exits (one page, under 10 seconds) %3$s', 'om-catalog' ), self::pct( $k['new'], $k['visits'], 0 ), self::pct( $k['visits'] - $k['new'], $k['visits'], 0 ), number_format_i18n( $k['quick'], 0 ) . '%' ) ) . '</p>';
		$this->card( __( 'Phones and computers', 'om-catalog' ), __( 'Visits by device.', 'om-catalog' ), $body );
		$rows = array();
		foreach ( $data['pages'] as $r ) {
			$rows[] = array( self::page_cell( $r['page'], $r['title'] ), (int) $r['views'], sprintf( /* translators: %s: average time. */ __( 'avg %s', 'om-catalog' ), self::duration( $r['dur'] ) ) );
		}
		$this->card( __( 'Most viewed pages', 'om-catalog' ), '', self::hbars( $rows, __( 'No page views yet.', 'om-catalog' ) ) . '<p class="om-ins-more"><a href="' . esc_url( $this->url( array( 'tab' => 'pages' ) ) ) . '">' . esc_html__( 'All pages', 'om-catalog' ) . ' →</a></p>' );
		$rows = array();
		foreach ( $data['products'] as $r ) {
			/* translators: 1: saves, 2: leads. */
			$rows[] = array( self::design_cell( $r['item'], $r['title'] ), (int) $r['views'], sprintf( _n( '%1$s saved · %2$s lead', '%1$s saved · %2$s leads', (int) $r['leads'], 'om-catalog' ), number_format_i18n( (int) $r['saves'] ), number_format_i18n( (int) $r['leads'] ) ) );
		}
		$this->card( __( 'Most viewed designs', 'om-catalog' ), '', self::hbars( $rows, __( 'No designs viewed yet.', 'om-catalog' ) ) . '<p class="om-ins-more"><a href="' . esc_url( $this->url( array( 'tab' => 'products' ) ) ) . '">' . esc_html__( 'All designs', 'om-catalog' ) . ' →</a></p>', 'om-ins-designs' );
		echo '</div>';

		$this->card( __( 'Latest leads', 'om-catalog' ), __( 'Who got in touch, and the visit behind it.', 'om-catalog' ), $this->leads_table( $data['leads'], true ) . '<p class="om-ins-more"><a href="' . esc_url( $this->url( array( 'tab' => 'leads' ) ) ) . '">' . esc_html__( 'All leads', 'om-catalog' ) . ' →</a></p>' );
	}

	private function empty_state() {
		echo '<section class="om-ins-card om-ins-welcome"><h2>' . esc_html__( 'Collecting has started', 'om-catalog' ) . '</h2><p>' . esc_html__( 'Nothing in this period yet. Visits show up here a few seconds after they happen (staff who are logged in are left out, so open the site in a private window to see your own visit).', 'om-catalog' ) . '</p></section>';
	}

	/* ---------- Visitors & sources ---------- */

	private function tab_visitors() {
		$data = $this->cached(
			'visitors',
			function () {
				$landing = $this->by_visit( 'landing', 25 );
				$loc     = $this->by_visit( 'country', 1, "AND country <> ''" ) ? array(
					'country' => $this->by_visit( 'country', 15 ),
					'region'  => $this->by_visit( 'region', 15, "AND region <> ''" ),
					'city'    => $this->by_visit( 'city', 15, "AND city <> ''" ),
				) : array( 'tz' => $this->by_visit( 'tz', 15, "AND tz <> ''" ) );
				return array(
					'kpi'      => $this->kpis( $this->from, $this->to ),
					'channels' => $this->by_visit( 'channel', 12 ),
					'refs'     => $this->by_visit( 'ref_host', 25, "AND ref_host <> ''" ),
					'camps'    => $this->campaigns(),
					'landing'  => $landing,
					'titles'   => $this->page_titles( wp_list_pluck( $landing, 'k' ) ),
					'devices'  => $this->by_visit( 'device', 3 ),
					'browsers' => $this->by_visit( 'browser', 8 ),
					'os'       => $this->by_visit( 'os', 8 ),
					'loc'      => $loc,
					'heat'     => $this->heat(),
				);
			}
		);
		$k = $data['kpi'];
		if ( ! $k['visits'] ) {
			$this->empty_state();
			return;
		}
		$rows = array();
		foreach ( $data['channels'] as $r ) {
			$rows[] = array( esc_html( self::channel_name( $r['k'] ) ), self::n( $r['visits'] ), self::n( $r['visitors'] ), self::n( $r['pages'], number_format_i18n( (float) $r['pages'], 1 ) ), self::n( $r['engaged'], self::duration( $r['engaged'] ) ), self::n( $r['converted'] ), self::n( (int) $r['visits'] ? $r['converted'] / $r['visits'] : 0, self::pct( (int) $r['converted'], (int) $r['visits'] ) ) );
		}
		$this->card( __( 'Sources', 'om-catalog' ), __( 'How each kind of visit behaves, and how often it ends in a lead. Paid ads are visits with an ad click ID or a paid campaign tag; Google Maps & Business Profile needs links tagged utm_source=gbp (or similar) on your profile.', 'om-catalog' ), self::table( array( __( 'Source', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Visitors', 'om-catalog' ), __( 'Pages / visit', 'om-catalog' ), __( 'Time / visit', 'om-catalog' ), __( 'Leads', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No visits yet.', 'om-catalog' ) ) );
		$this->grid_open();
		$rows = array();
		foreach ( $data['refs'] as $r ) {
			$rows[] = array( esc_html( $r['k'] ), (int) $r['visits'], sprintf( /* translators: %s: number of leads. */ _n( '%s lead', '%s leads', (int) $r['converted'], 'om-catalog' ), number_format_i18n( (int) $r['converted'] ) ) );
		}
		$this->card( __( 'Websites that sent visitors', 'om-catalog' ), __( 'Search engines, social networks and other sites, by name.', 'om-catalog' ), self::hbars( $rows, __( 'Every visit was direct so far.', 'om-catalog' ) ) );
		$rows = array();
		foreach ( $data['camps'] as $r ) {
			$rows[] = array( esc_html( '' !== $r['camp'] ? $r['camp'] : '–' ), esc_html( trim( $r['src'] . ( '' !== $r['med'] ? ' / ' . $r['med'] : '' ) ) ), self::n( $r['visits'] ), self::n( $r['converted'] ), self::n( (int) $r['visits'] ? $r['converted'] / $r['visits'] : 0, self::pct( (int) $r['converted'], (int) $r['visits'] ) ) );
		}
		$this->card( __( 'Campaigns', 'om-catalog' ), __( 'Links tagged with utm_campaign (ads, emails, social posts).', 'om-catalog' ), self::table( array( __( 'Campaign', 'om-catalog' ), __( 'Source / medium', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Leads', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No tagged links used yet.', 'om-catalog' ), '', 12 ) );
		echo '</div>';
		$rows = array();
		foreach ( $data['landing'] as $r ) {
			$rows[] = array( self::page_cell( $r['k'], $data['titles'][ $r['k'] ] ?? '' ), self::n( $r['visits'] ), self::n( (int) $r['visits'] ? $r['quick'] / $r['visits'] : 0, self::pct( (int) $r['quick'], (int) $r['visits'], 0 ) ), self::n( $r['pages'], number_format_i18n( (float) $r['pages'], 1 ) ), self::n( $r['converted'] ), self::n( (int) $r['visits'] ? $r['converted'] / $r['visits'] : 0, self::pct( (int) $r['converted'], (int) $r['visits'] ) ) );
		}
		$this->card( __( 'First page of a visit', 'om-catalog' ), __( 'Where visits start. Quick exits: left after one page in under 10 seconds.', 'om-catalog' ), self::table( array( __( 'Page', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Quick exits', 'om-catalog' ), __( 'Pages / visit', 'om-catalog' ), __( 'Leads', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No visits yet.', 'om-catalog' ), '', 12 ) );
		$this->grid_open( 'om-ins-grid-3' );
		foreach ( array( 'devices' => __( 'Devices', 'om-catalog' ), 'browsers' => __( 'Browsers', 'om-catalog' ), 'os' => __( 'Systems', 'om-catalog' ) ) as $key => $title ) {
			$rows = array();
			foreach ( $data[ $key ] as $r ) {
				$rows[] = array( esc_html( 'devices' === $key ? self::device_name( $r['k'] ) : $r['k'] ), (int) $r['visits'] );
			}
			$this->card( $title, '', self::hbars( $rows, __( 'No visits yet.', 'om-catalog' ), $k['visits'] ) );
		}
		echo '</div>';
		$this->grid_open();
		$this->card( __( 'New and returning', 'om-catalog' ), __( 'A returning visitor has been on the site before, in this browser.', 'om-catalog' ), self::hbars( array( array( esc_html__( 'First visit', 'om-catalog' ), $k['new'] ), array( esc_html__( 'Came back', 'om-catalog' ), $k['visits'] - $k['new'] ) ), __( 'No visits yet.', 'om-catalog' ), $k['visits'] ) );
		$loc   = $data['loc'];
		$parts = '';
		if ( isset( $loc['tz'] ) ) {
			$rows = array();
			foreach ( $loc['tz'] as $r ) {
				$rows[] = array( esc_html( str_replace( '_', ' ', $r['k'] ) ), (int) $r['visits'] );
			}
			$parts = self::hbars( $rows, __( 'No visits yet.', 'om-catalog' ), $k['visits'] ) . '<p class="om-ins-foot-note">' . esc_html__( 'From each visitor\'s time zone. For countries, states and cities, switch on Cloudflare\'s "Add visitor location headers" (Rules > Managed Transforms) if your site uses Cloudflare.', 'om-catalog' ) . '</p>';
			$title = __( 'Time zones', 'om-catalog' );
		} else {
			foreach ( array( 'country' => __( 'Countries', 'om-catalog' ), 'region' => __( 'States and regions', 'om-catalog' ), 'city' => __( 'Cities', 'om-catalog' ) ) as $key => $name ) {
				$rows = array();
				foreach ( $loc[ $key ] as $r ) {
					$rows[] = array( esc_html( '' !== $r['k'] ? $r['k'] : __( 'Unknown', 'om-catalog' ) ), (int) $r['visits'] );
				}
				if ( $rows ) {
					$parts .= '<h3>' . esc_html( $name ) . '</h3>' . self::hbars( $rows, '', $k['visits'] );
				}
			}
			$title = __( 'Where visitors are', 'om-catalog' );
		}
		$this->card( $title, '', $parts );
		echo '</div>';
		$this->card( __( 'When people visit', 'om-catalog' ), __( 'Visits by day of the week and hour (your site\'s time zone). Darker is busier; hover a square for the number.', 'om-catalog' ), self::heatmap( $data['heat'] ) );
	}

	/* ---------- Pages ---------- */

	private function tab_pages() {
		$rows_data = $this->cached( 'pages', function () { return $this->pages( 400 ); } );
		if ( ! $rows_data ) {
			$this->empty_state();
			return;
		}
		$rows = array();
		foreach ( $rows_data as $r ) {
			$rows[] = array( self::page_cell( $r['page'], $r['title'] ), self::n( $r['views'] ), self::n( $r['visits'] ), self::n( $r['dur'], self::duration( $r['dur'] ) ), self::n( $r['scroll'], number_format_i18n( (float) $r['scroll'], 0 ) . '%' ), self::n( $r['entries'] ), self::n( $r['exits'] ), self::n( $r['entries'] ? $r['quick'] / $r['entries'] : 0, self::pct( $r['quick'], $r['entries'], 0 ) ) );
		}
		echo '<section class="om-ins-card"><div class="om-ins-cardhead"><h2>' . esc_html__( 'Every page', 'om-catalog' ) . '</h2><label class="om-ins-filter">' . esc_html__( 'Find', 'om-catalog' ) . ' <input type="search" data-om-ins-filter placeholder="' . esc_attr__( 'Page name or address', 'om-catalog' ) . '" /></label></div>';
		echo '<p class="om-ins-desc">' . esc_html__( 'Time is how long the page was on screen and in use. Scrolled is how far down people got, on average. Entries: visits that started here; exits: visits that ended here. Click a heading to sort.', 'om-catalog' ) . '</p>';
		echo self::table( array( __( 'Page', 'om-catalog' ), __( 'Views', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Avg. time', 'om-catalog' ), __( 'Scrolled', 'om-catalog' ), __( 'Entries', 'om-catalog' ), __( 'Exits', 'om-catalog' ), __( 'Quick exits', 'om-catalog' ) ), $rows, __( 'No page views yet.', 'om-catalog' ), 'om-ins-pages', 25 ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo '</section>';
	}

	/* ---------- Designs ---------- */

	private function tab_products() {
		$data = $this->cached(
			'products',
			function () {
				return array(
					'products' => $this->products( 400 ),
					'lines'    => $this->lines(),
					'options'  => $this->options(),
					'pairs'    => $this->compare_groups(),
					'reels'    => $this->reels(),
				);
			}
		);
		if ( ! $data['products'] ) {
			$this->empty_state();
			return;
		}
		$rows = array();
		foreach ( $data['products'] as $r ) {
			$views  = (int) $r['views'];
			$rows[] = array( self::design_cell( $r['item'], $r['title'] ), self::n( $views ), self::n( $r['viewers'] ), self::n( $r['dur'], self::duration( $r['dur'] ) ), self::n( $r['saves'] ), self::n( $r['compares'] ), self::n( $r['shares'] ), self::n( $r['hints'] ), self::n( $r['leads'] ), self::n( (int) $r['viewers'] ? $r['leads'] / $r['viewers'] : 0, self::pct( (int) $r['leads'], (int) $r['viewers'] ) ) );
		}
		echo '<section class="om-ins-card"><div class="om-ins-cardhead"><h2>' . esc_html__( 'Every design looked at', 'om-catalog' ) . '</h2><label class="om-ins-filter">' . esc_html__( 'Find', 'om-catalog' ) . ' <input type="search" data-om-ins-filter placeholder="' . esc_attr__( 'Name or style number', 'om-catalog' ) . '" /></label></div>';
		echo '<p class="om-ins-desc">' . esc_html__( 'Views count product pages and quick views; viewers are visits that looked. Leads are inquiries and requests about the design; hints are "Drop a hint" emails sent with it.', 'om-catalog' ) . '</p>';
		echo self::table( array( __( 'Design', 'om-catalog' ), __( 'Views', 'om-catalog' ), __( 'Viewers', 'om-catalog' ), __( 'Avg. time', 'om-catalog' ), __( 'Saved', 'om-catalog' ), __( 'Compared', 'om-catalog' ), __( 'Shared', 'om-catalog' ), __( 'Hints', 'om-catalog' ), __( 'Leads', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, '', 'om-ins-products', 25 ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo '</section>';

		$this->grid_open();
		$rows = array();
		foreach ( $data['lines'] as $r ) {
			$rows[] = array( esc_html( ucwords( str_replace( '-', ' ', (string) $r['line'] ) ) ), (int) $r['views'], sprintf( /* translators: %s: number of visits. */ __( 'in %s visits', 'om-catalog' ), number_format_i18n( (int) $r['visits'] ) ) );
		}
		$this->card( __( 'Product lines', 'om-catalog' ), __( 'Design views by line.', 'om-catalog' ), self::hbars( $rows, __( 'No designs viewed yet.', 'om-catalog' ) ) );
		// Viewed a lot, never asked about: the ones to look at (price, photos, wording).
		$quiet = array();
		foreach ( $data['products'] as $r ) {
			if ( (int) $r['viewers'] >= 3 && 0 === (int) $r['leads'] ) {
				$quiet[] = array( self::design_cell( $r['item'], $r['title'] ), (int) $r['viewers'], sprintf( /* translators: %s: saves. */ __( '%s saved, no leads', 'om-catalog' ), number_format_i18n( (int) $r['saves'] ) ) );
			}
		}
		$this->card( __( 'Looked at often, never asked about', 'om-catalog' ), __( 'Popular designs with no inquiries yet: worth a look at their photos, price or wording.', 'om-catalog' ), self::hbars( array_slice( $quiet, 0, 8 ), __( 'Every popular design has had a lead.', 'om-catalog' ) ), 'om-ins-designs' );
		echo '</div>';

		$this->grid_open( 'om-ins-grid-3' );
		$names = array( 'metal' => __( 'Metal chosen', 'om-catalog' ), 'color' => __( 'Gold colour chosen', 'om-catalog' ), 'finger_size' => __( 'Ring sizes chosen', 'om-catalog' ), 'level' => __( 'Setting level chosen', 'om-catalog' ), 'quality' => __( 'Diamond quality chosen', 'om-catalog' ) );
		$shown = 0;
		foreach ( $names as $key => $title ) {
			if ( empty( $data['options'][ $key ] ) ) {
				continue;
			}
			$rows = array();
			foreach ( array_slice( $data['options'][ $key ], 0, 10, true ) as $value => $n ) {
				$rows[] = array( esc_html( (string) $value ), (int) $n );
			}
			$this->card( $title, '', self::hbars( $rows, '', array_sum( $data['options'][ $key ] ) ) );
			$shown++;
		}
		if ( ! $shown ) {
			$this->card( __( 'Options chosen', 'om-catalog' ), '', '<p class="om-ins-empty">' . esc_html__( 'Nobody has changed a metal, colour or size on a product page yet.', 'om-catalog' ) . '</p>' );
		}
		echo '</div>';

		$this->grid_open();
		$rows = array();
		foreach ( $data['pairs'] as $r ) {
			$names_list = array();
			foreach ( explode( ' + ', (string) $r['grp'] ) as $key ) {
				$names_list[] = self::design( $key )['title'] . ' (' . self::design( $key )['style'] . ')';
			}
			$rows[] = array( esc_html( implode( '  +  ', $names_list ) ), (int) $r['visits'] );
		}
		$this->card( __( 'Compared side by side', 'om-catalog' ), __( 'Designs people put in the compare table together: they are deciding between them.', 'om-catalog' ), self::hbars( $rows, __( 'Nothing compared yet.', 'om-catalog' ) ) );
		$rows = array();
		foreach ( $data['reels'] as $r ) {
			$rows[] = array( self::design_cell( $r['item'] ), (int) $r['views'], sprintf( /* translators: 1: taps, 2: tap rate. */ __( '%1$s taps (%2$s)', 'om-catalog' ), number_format_i18n( (int) $r['taps'] ), self::pct( (int) $r['taps'], (int) $r['views'] ) ) );
		}
		$this->card( __( 'Story reels', 'om-catalog' ), __( 'Stories watched, and taps through to the design.', 'om-catalog' ), self::hbars( $rows, __( 'No stories watched yet.', 'om-catalog' ) ), 'om-ins-designs' );
		echo '</div>';
	}

	/* ---------- Searches ---------- */

	private function tab_searches() {
		$data = $this->cached( 'searches', function () { return $this->searches(); } );
		$results_page = (int) get_option( 'om_search_results_page', 0 );
		$results_url  = $results_page ? get_permalink( $results_page ) : '';
		$this->grid_open();
		$rows = array();
		foreach ( $data['top'] as $r ) {
			$rows[] = array( '<strong>' . esc_html( $r['q'] ) . '</strong>', self::n( $r['n'] ), self::n( $r['visits'] ), self::n( (int) $r['visits'] ? $r['converted'] / $r['visits'] : 0, self::pct( (int) $r['converted'], (int) $r['visits'] ) ) );
		}
		$this->card( __( 'What people search for', 'om-catalog' ), __( 'Lead rate: visits with this search that ended in a lead.', 'om-catalog' ), self::table( array( __( 'Search', 'om-catalog' ), __( 'Times', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No searches yet.', 'om-catalog' ), '', 20 ) );
		$rows = array();
		foreach ( $data['zero'] as $r ) {
			$try    = $results_url ? '<a href="' . esc_url( add_query_arg( 'om_q', rawurlencode( $r['q'] ), $results_url ) ) . '" target="_blank" rel="noopener">' . esc_html__( 'Try it', 'om-catalog' ) . '</a>' : '';
			$rows[] = array( '<strong>' . esc_html( $r['q'] ) . '</strong>', self::n( $r['n'] ), $try );
		}
		$this->card( __( 'Searches that found nothing', 'om-catalog' ), __( 'What visitors wanted and didn\'t find: ideas for designs to add or words to use in titles.', 'om-catalog' ), self::table( array( __( 'Search', 'om-catalog' ), __( 'Times', 'om-catalog' ), '' ), $rows, __( 'Every search found something.', 'om-catalog' ) ) );
		echo '</div>';
		$names = array( 'shape' => __( 'Diamond shape', 'om-catalog' ), 'metal' => __( 'Metal', 'om-catalog' ), 'color' => __( 'Gold colour', 'om-catalog' ), 'style' => __( 'Style', 'om-catalog' ), 'line' => __( 'Product line', 'om-catalog' ), 'upto' => __( 'Price up to', 'om-catalog' ), 'sort' => __( 'Sorted by', 'om-catalog' ), 'size' => __( 'Ring size', 'om-catalog' ) );
		$this->grid_open( 'om-ins-grid-3' );
		$shown = 0;
		foreach ( $names as $key => $title ) {
			if ( empty( $data['filters'][ $key ] ) ) {
				continue;
			}
			$rows = array();
			foreach ( array_slice( $data['filters'][ $key ], 0, 10, true ) as $value => $n ) {
				$rows[] = array( esc_html( self::filter_value( $key, (string) $value ) ), (int) $n );
			}
			$this->card( sprintf( /* translators: %s: filter name. */ __( 'Filter: %s', 'om-catalog' ), $title ), '', self::hbars( $rows, '' ) );
			$shown++;
		}
		if ( ! $shown ) {
			$this->card( __( 'Filters used', 'om-catalog' ), '', '<p class="om-ins-empty">' . esc_html__( 'No catalog filters used yet.', 'om-catalog' ) . '</p>' );
		}
		echo '</div>';
	}

	/* ---------- Actions ---------- */

	private function tab_actions() {
		$data = $this->cached(
			'actions',
			function () {
				return array(
					'all'        => $this->actions(),
					'cta'        => $this->clicks( 'cta', 25 ),
					'call'       => $this->clicks( 'call', 10 ),
					'directions' => $this->clicks( 'directions', 10 ),
					'email'      => $this->clicks( 'email', 10 ),
					'outbound'   => $this->clicks( 'outbound', 15 ),
					'share'      => $this->clicks( 'share', 10 ),
				);
			}
		);
		$all = $data['all'];
		if ( ! $all ) {
			$this->empty_state();
			return;
		}
		$sum   = static function ( $type, $label = null ) use ( $all ) {
			$n = 0;
			$v = 0;
			foreach ( $all[ $type ] ?? array() as $l => $pair ) {
				if ( null === $label || (string) $l === (string) $label ) {
					$n += $pair[0];
					$v += $pair[1];
				}
			}
			return array( $n, $v );
		};
		$areas = array(
			__( 'Shopping', 'om-catalog' )            => array(
				array( __( 'Designs viewed', 'om-catalog' ), $sum( 'view' ) ),
				array( __( 'Saved with the heart', 'om-catalog' ), $sum( 'save' ) ),
				array( __( 'Designs compared', 'om-catalog' ), $sum( 'compare' ) ),
				array( __( 'Shared', 'om-catalog' ), $sum( 'share' ) ),
				array( __( 'Options changed (metal, colour, size)', 'om-catalog' ), $sum( 'option' ) ),
				array( __( 'Searches', 'om-catalog' ), $sum( 'search' ) ),
				array( __( 'Filters changed', 'om-catalog' ), $sum( 'filter' ) ),
			),
			__( 'Getting in touch', 'om-catalog' )    => array(
				array( __( 'Booking window opened', 'om-catalog' ), $sum( 'booking', 'open' ) ),
				array( __( 'Visit requests sent', 'om-catalog' ), $sum( 'booking', 'request' ) ),
				array( __( 'Tapped to call', 'om-catalog' ), $sum( 'call' ) ),
				array( __( 'Opened directions', 'om-catalog' ), $sum( 'directions' ) ),
				array( __( 'Tapped an email address', 'om-catalog' ), $sum( 'email' ) ),
				array( __( 'Button clicks', 'om-catalog' ), $sum( 'cta' ) ),
			),
			__( 'Tools and extras', 'om-catalog' )    => array(
				array( __( 'Jeweller assistant opened', 'om-catalog' ), $sum( 'assistant', 'open' ) ),
				array( __( 'Questions asked to the assistant', 'om-catalog' ), $sum( 'assistant', 'message' ) ),
				array( __( 'Ring builder steps', 'om-catalog' ), $sum( 'builder' ) ),
				array( __( 'Ring designer opened', 'om-catalog' ), $sum( 'designer' ) ),
				array( __( 'Quiz started', 'om-catalog' ), $sum( 'quiz', 'start' ) ),
				array( __( 'Quiz finished', 'om-catalog' ), $sum( 'quiz', 'complete' ) ),
				array( __( '"Drop a hint" opened', 'om-catalog' ), $sum( 'hint', 'open' ) ),
				array( __( 'Hint pages opened', 'om-catalog' ), $sum( 'hint', 'page_view' ) ),
				array( __( 'Diamond help used', 'om-catalog' ), $sum( 'diamond', 'guide' ) ),
				array( __( 'Diamonds compared', 'om-catalog' ), $sum( 'diamond', 'compare_view' ) ),
				array( __( 'True size viewer', 'om-catalog' ), $sum( 'diamond', 'true_size' ) ),
			),
		);
		$this->grid_open( 'om-ins-grid-3' );
		foreach ( $areas as $title => $items ) {
			$rows = array();
			foreach ( $items as $it ) {
				if ( $it[1][0] ) {
					$rows[] = array( esc_html( $it[0] ), $it[1][0], sprintf( /* translators: %s: number of visits. */ _n( 'in %s visit', 'in %s visits', $it[1][1], 'om-catalog' ), number_format_i18n( $it[1][1] ) ) );
				}
			}
			$this->card( $title, '', self::hbars( $rows, __( 'Nothing yet.', 'om-catalog' ) ) );
		}
		echo '</div>';
		$place = array( __CLASS__, 'place_name' );
		$rows = array();
		foreach ( $data['cta'] as $r ) {
			$rows[] = array( '<strong>' . esc_html( '' !== $r['label'] ? $r['label'] : '–' ) . '</strong>', esc_html( $place( $r['meta'] ) ), self::n( $r['n'] ), self::n( $r['visits'] ) );
		}
		$this->card( __( 'Buttons clicked', 'om-catalog' ), __( 'Which buttons get used, and where on the site they are.', 'om-catalog' ), self::table( array( __( 'Button', 'om-catalog' ), __( 'Where', 'om-catalog' ), __( 'Clicks', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), $rows, __( 'No button clicks yet.', 'om-catalog' ), '', 12 ) );
		$ranked = static function ( $list, $name ) {
			$agg = array();
			foreach ( $list as $r ) {
				$key         = $name( $r );
				$agg[ $key ] = ( $agg[ $key ] ?? 0 ) + (int) $r['n'];
			}
			arsort( $agg );
			$rows = array();
			foreach ( $agg as $key => $n ) {
				$rows[] = array( esc_html( $key ), $n );
			}
			return $rows;
		};
		$this->grid_open( 'om-ins-grid-3' );
		$numbers = $ranked( $data['call'], static function ( $r ) { return self::phone( (string) $r['label'] ); } );
		$this->card(
			__( 'Calls tapped', 'om-catalog' ),
			__( 'Taps on a phone number (the call itself happens off the site).', 'om-catalog' ),
			$numbers ? '<h3>' . esc_html__( 'Which number', 'om-catalog' ) . '</h3>' . self::hbars( $numbers, '' ) . '<h3>' . esc_html__( 'Where they tapped', 'om-catalog' ) . '</h3>' . self::hbars( $ranked( $data['call'], static function ( $r ) use ( $place ) { return $place( $r['meta'] ); } ), '' ) : '<p class="om-ins-empty">' . esc_html__( 'None yet.', 'om-catalog' ) . '</p>'
		);
		$this->card( __( 'Directions, by where they tapped', 'om-catalog' ), '', self::hbars( $ranked( $data['directions'], static function ( $r ) use ( $place ) { return $place( $r['meta'] ); } ), __( 'None yet.', 'om-catalog' ) ) );
		$this->card( __( 'Links to other sites', 'om-catalog' ), __( 'Social pages, reviews and other sites people went to from yours.', 'om-catalog' ), self::hbars( $ranked( $data['outbound'], static function ( $r ) { return (string) $r['label']; } ), __( 'None yet.', 'om-catalog' ) ) );
		echo '</div>';
	}

	/** A page's search and filters ("q=oval&shape=pear") in words. */
	private static function meta_words( $meta ) {
		$names = array( 'q' => __( 'Search', 'om-catalog' ), 'shape' => __( 'Shape', 'om-catalog' ), 'metal' => __( 'Metal', 'om-catalog' ), 'color' => __( 'Gold colour', 'om-catalog' ), 'style' => __( 'Style', 'om-catalog' ), 'line' => __( 'Line', 'om-catalog' ), 'upto' => __( 'Price', 'om-catalog' ), 'sort' => __( 'Sorted by', 'om-catalog' ), 'size' => __( 'Ring size', 'om-catalog' ) );
		$out   = array();
		foreach ( explode( '&', $meta ) as $pair ) {
			$kv = explode( '=', $pair, 2 );
			if ( 2 !== count( $kv ) || '' === $kv[1] ) {
				continue;
			}
			$out[] = ( $names[ $kv[0] ] ?? $kv[0] ) . ': ' . ( 'q' === $kv[0] ? '"' . $kv[1] . '"' : self::filter_value( $kv[0], $kv[1] ) );
		}
		return implode( ' · ', $out );
	}

	/** A catalog filter value in words ("popular" sort, "hidden-halo" style, "3000" price). */
	private static function filter_value( $key, $value ) {
		if ( 'upto' === $key && is_numeric( $value ) ) {
			/* translators: %s: price. */
			return sprintf( __( 'Up to $%s', 'om-catalog' ), number_format_i18n( (float) $value ) );
		}
		if ( 'sort' === $key ) {
			$sorts = array( 'featured' => __( 'Featured', 'om-catalog' ), 'newest' => __( 'Newest', 'om-catalog' ), 'popular' => __( 'Most viewed', 'om-catalog' ), 'style' => __( 'Style number', 'om-catalog' ) );
			if ( isset( $sorts[ $value ] ) ) {
				return $sorts[ $value ];
			}
		}
		return ucwords( str_replace( array( '-', '_' ), ' ', $value ) );
	}

	/** Where on the site a button or link was (as the kit and catalog name their spots). */
	public static function place_name( $key ) {
		$where = array(
			'hero'                => __( 'Top of the home page', 'om-catalog' ),
			'header'              => __( 'Header', 'om-catalog' ),
			'footer'              => __( 'Footer', 'om-catalog' ),
			'phone_bar'           => __( 'Phone bar', 'om-catalog' ),
			'booking_bar_desktop' => __( 'Booking bar (computers)', 'om-catalog' ),
			'tray'                => __( 'Saved tray', 'om-catalog' ),
			'page'                => __( 'In the page', 'om-catalog' ),
			'product'             => __( 'Product page', 'om-catalog' ),
			'visit'               => __( 'Visit section', 'om-catalog' ),
			'quiz'                => __( 'Ring style quiz', 'om-catalog' ),
			'hint'                => __( 'Hint page', 'om-catalog' ),
		);
		if ( '' === (string) $key ) {
			return __( 'Not recorded', 'om-catalog' );
		}
		return $where[ $key ] ?? ucwords( str_replace( array( '_', '-' ), ' ', (string) $key ) );
	}

	/** A US phone number as people write it; anything else as recorded. */
	private static function phone( $raw ) {
		$digits = preg_replace( '/\D/', '', (string) $raw );
		if ( 11 === strlen( $digits ) && '1' === $digits[0] ) {
			$digits = substr( $digits, 1 );
		}
		if ( 10 === strlen( $digits ) ) {
			return '(' . substr( $digits, 0, 3 ) . ') ' . substr( $digits, 3, 3 ) . '-' . substr( $digits, 6 );
		}
		return '' !== trim( (string) $raw ) ? (string) $raw : __( 'Not recorded', 'om-catalog' );
	}

	/* ---------- Funnels ---------- */

	private function tab_funnels() {
		$f = $this->cached( 'funnels', function () { return $this->funnels(); } );
		echo '<div class="om-ins-grid">';
		echo self::funnel( __( 'From visit to lead', 'om-catalog' ), __( 'Of all visits: how many looked at a design, then saved or compared one, then got in touch. Leads that skipped a step are in the Leads tab.', 'om-catalog' ), $f['shop'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::funnel( __( 'Booking window', 'om-catalog' ), __( 'Where people stop between opening it and sending the request.', 'om-catalog' ), $f['booking'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::funnel( __( 'Ring builder', 'om-catalog' ), __( 'Visits reaching each step.', 'om-catalog' ), $f['builder'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::funnel( __( 'Ring style quiz', 'om-catalog' ), __( 'From the first question to a booking or email.', 'om-catalog' ), $f['quiz'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::funnel( __( 'Drop a hint', 'om-catalog' ), __( 'From the form to the partner getting in touch (the last two steps happen on the partner\'s phone or computer).', 'om-catalog' ), $f['hint'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo '</div>';
	}

	/* ---------- Visitor journeys ---------- */

	private function tab_journeys() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only filters.
		$show = isset( $_GET['show'] ) ? sanitize_key( wp_unslash( $_GET['show'] ) ) : 'all';
		$pg   = isset( $_GET['p'] ) ? max( 1, (int) $_GET['p'] ) : 1;
		// phpcs:enable
		$filters = array(
			'all'       => array( __( 'All visits', 'om-catalog' ), '' ),
			'leads'     => array( __( 'Became leads', 'om-catalog' ), 'AND leads > 0' ),
			'saved'     => array( __( 'Saved something', 'om-catalog' ), 'AND saves > 0' ),
			'returning' => array( __( 'Returning visitors', 'om-catalog' ), 'AND visit_no > 1' ),
			'long'      => array( __( 'Over 3 minutes', 'om-catalog' ), 'AND engaged >= 180' ),
			'ads'       => array( __( 'From ads', 'om-catalog' ), "AND channel = 'ads'" ),
			'phone'     => array( __( 'On phones', 'om-catalog' ), "AND device = 'phone'" ),
		);
		$show  = isset( $filters[ $show ] ) ? $show : 'all';
		$per   = 50;
		$s     = OM_Insights::sessions_table();
		$where = $filters[ $show ][1];
		$total = (int) ( self::row( "SELECT COUNT(*) AS n FROM {$s} WHERE day BETWEEN %s AND %s {$where}", array( $this->from, $this->to ) )['n'] ?? 0 );
		$rows  = self::rows( "SELECT * FROM {$s} WHERE day BETWEEN %s AND %s {$where} ORDER BY started DESC LIMIT %d OFFSET %d", array( $this->from, $this->to, $per, ( $pg - 1 ) * $per ) );
		echo '<section class="om-ins-card"><div class="om-ins-cardhead"><h2>' . esc_html__( 'Visits, newest first', 'om-catalog' ) . '</h2><div class="om-ins-chips" role="group" aria-label="' . esc_attr__( 'Show', 'om-catalog' ) . '">';
		foreach ( $filters as $key => $f ) {
			echo '<a href="' . esc_url( $this->url( array( 'tab' => 'journeys', 'show' => $key ) ) ) . '"' . ( $key === $show ? ' aria-current="true"' : '' ) . '>' . esc_html( $f[0] ) . '</a>';
		}
		echo '</div></div><p class="om-ins-desc">' . esc_html__( 'Each visit is anonymous unless the person sent a form; then their name shows. Open a visit to see everything they did, step by step.', 'om-catalog' ) . '</p>';
		if ( ! $rows ) {
			echo '<p class="om-ins-empty">' . esc_html__( 'No visits match in this period.', 'om-catalog' ) . '</p></section>';
			return;
		}
		$this->visits_table( $rows );
		$pages = (int) ceil( $total / $per );
		if ( $pages > 1 ) {
			echo '<p class="om-ins-pager">';
			if ( $pg > 1 ) {
				echo '<a class="button" href="' . esc_url( $this->url( array( 'tab' => 'journeys', 'show' => $show, 'p' => $pg - 1 ) ) ) . '">← ' . esc_html__( 'Newer', 'om-catalog' ) . '</a> ';
			}
			echo '<span>' . esc_html( sprintf( /* translators: 1: page, 2: pages, 3: visits. */ __( 'Page %1$s of %2$s (%3$s visits)', 'om-catalog' ), number_format_i18n( $pg ), number_format_i18n( $pages ), number_format_i18n( $total ) ) ) . '</span>';
			if ( $pg < $pages ) {
				echo ' <a class="button" href="' . esc_url( $this->url( array( 'tab' => 'journeys', 'show' => $show, 'p' => $pg + 1 ) ) ) . '">' . esc_html__( 'Older', 'om-catalog' ) . ' →</a>';
			}
			echo '</p>';
		}
		echo '</section>';
	}

	/** A list of visits (journeys, one visitor). */
	private function visits_table( $rows ) {
		$days   = wp_list_pluck( $rows, 'day' );
		$titles = $this->page_titles( wp_list_pluck( $rows, 'landing' ), min( $days ), max( $days ) );
		echo '<div class="om-ins-scroll"><table class="om-ins-table om-ins-visits"><thead><tr><th scope="col">' . esc_html__( 'When', 'om-catalog' ) . '</th><th scope="col">' . esc_html__( 'Visitor', 'om-catalog' ) . '</th><th scope="col">' . esc_html__( 'Came from', 'om-catalog' ) . '</th><th scope="col">' . esc_html__( 'First page', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'Pages', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'Designs', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'Saved', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'Time', 'om-catalog' ) . '</th><th scope="col">' . esc_html__( 'Outcome', 'om-catalog' ) . '</th></tr></thead><tbody>';
		foreach ( $rows as $r ) {
			$r['landing_title'] = $titles[ $r['landing'] ] ?? '';
			$this->visit_row( $r );
		}
		echo '</tbody></table></div>';
	}

	private function visit_row( $r ) {
		$where = self::channel_name( $r['channel'] ) . ( '' !== $r['ref_host'] ? ' · ' . $r['ref_host'] : '' ) . ( '' !== $r['utm_campaign'] ? ' · ' . $r['utm_campaign'] : '' );
		$place = trim( implode( ', ', array_filter( array( $r['city'], $r['region'], $r['country'] ) ) ) );
		$lead  = (int) $r['leads'] > 0 ? '<span class="om-ins-badge lead">' . esc_html( OM_Insights::lead_types()[ $r['lead_type'] ] ?? __( 'Lead', 'om-catalog' ) ) . '</span>' : ( (int) $r['saves'] > 0 ? '<span class="om-ins-badge">' . esc_html__( 'Saved designs', 'om-catalog' ) . '</span>' : '' );
		echo '<tr><td><a href="' . esc_url( $this->url( array( 'visit' => $r['sid'] ) ) ) . '">' . esc_html( wp_date( 'M j, g:i a', (int) $r['started'] ) ) . '</a></td>';
		echo '<td><a href="' . esc_url( $this->url( array( 'visitor' => $r['vid'] ) ) ) . '">' . esc_html( self::visitor_label( $r['vid'], $r['lead_name'] ) ) . '</a><small>' . esc_html( self::device_name( $r['device'] ) . ( (int) $r['visit_no'] > 1 ? ' · ' . sprintf( /* translators: %s: visit number. */ __( 'visit %s', 'om-catalog' ), number_format_i18n( (int) $r['visit_no'] ) ) : ' · ' . __( 'first visit', 'om-catalog' ) ) . ( '' !== $place ? ' · ' . $place : '' ) ) . '</small></td>';
		echo '<td>' . esc_html( $where ) . '</td><td>' . ( '' !== (string) $r['landing'] ? self::page_cell( (string) $r['landing'], (string) ( $r['landing_title'] ?? '' ) ) : '–' ) . '</td><td class="num">' . esc_html( number_format_i18n( (int) $r['pages'] ) ) . '</td><td class="num">' . esc_html( number_format_i18n( (int) $r['products'] ) ) . '</td><td class="num">' . esc_html( number_format_i18n( (int) $r['saves'] ) ) . '</td><td class="num">' . esc_html( self::duration( (int) $r['engaged'] ) ) . '</td><td>' . $lead . '</td></tr>'; // phpcs:ignore WordPress.Security.EscapeOutput -- badge escaped above.
	}

	/** One visit, step by step. */
	private function view_visit( $sid ) {
		$s = OM_Insights::sessions_table();
		$e = OM_Insights::events_table();
		$v = self::row( "SELECT * FROM {$s} WHERE sid = %s", array( $sid ) );
		echo '<p><a href="' . esc_url( $this->url( array( 'tab' => 'journeys' ) ) ) . '">← ' . esc_html__( 'All visits', 'om-catalog' ) . '</a></p>';
		if ( ! $v ) {
			echo '<p class="om-ins-empty">' . esc_html__( 'That visit is no longer kept.', 'om-catalog' ) . '</p>';
			return;
		}
		$events = self::rows( "SELECT ts, type, page, item, label, meta, val, dur, scroll FROM {$e} WHERE sid = %s ORDER BY ts, id LIMIT 1000", array( $sid ) );
		$this->visit_header( $v );
		echo '<section class="om-ins-card"><h2>' . esc_html__( 'What they did', 'om-catalog' ) . '</h2>' . $this->timeline( $events, (int) $v['started'] ) . '</section>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped.
	}

	private function visit_header( $v ) {
		$place = trim( implode( ', ', array_filter( array( $v['city'], $v['region'], $v['country'] ) ) ) );
		$facts = array(
			__( 'When', 'om-catalog' )       => wp_date( 'l, M j, Y \a\t g:i a', (int) $v['started'] ),
			__( 'Came from', 'om-catalog' )  => self::channel_name( $v['channel'] ) . ( '' !== $v['ref_host'] ? ' (' . $v['ref_host'] . ')' : '' ),
			__( 'Campaign', 'om-catalog' )   => trim( $v['utm_campaign'] . ( '' !== $v['utm_source'] ? ' · ' . $v['utm_source'] . ( '' !== $v['utm_medium'] ? ' / ' . $v['utm_medium'] : '' ) : '' ) ),
			__( 'Device', 'om-catalog' )     => self::device_one( $v['device'] ) . ' · ' . $v['browser'] . ' · ' . $v['os'],
			__( 'Where', 'om-catalog' )      => '' !== $place ? $place : str_replace( '_', ' ', (string) $v['tz'] ),
			__( 'Visit', 'om-catalog' )      => (int) $v['visit_no'] > 1 ? sprintf( /* translators: %s: visit number. */ __( 'Visit number %s from this browser', 'om-catalog' ), number_format_i18n( (int) $v['visit_no'] ) ) : __( 'First visit', 'om-catalog' ),
			__( 'Time on site', 'om-catalog' ) => self::duration( (int) $v['engaged'] ) . ' · ' . sprintf( /* translators: %s: pages. */ _n( '%s page', '%s pages', (int) $v['pages'], 'om-catalog' ), number_format_i18n( (int) $v['pages'] ) ),
		);
		echo '<section class="om-ins-card om-ins-visithead"><div class="om-ins-cardhead"><h2>' . esc_html( self::visitor_label( $v['vid'], $v['lead_name'] ) ) . '</h2>';
		if ( (int) $v['leads'] > 0 ) {
			echo '<span class="om-ins-badge lead">' . esc_html( OM_Insights::lead_types()[ $v['lead_type'] ] ?? __( 'Lead', 'om-catalog' ) ) . '</span>';
		}
		echo '</div><dl class="om-ins-facts">';
		foreach ( $facts as $k => $val ) {
			if ( '' !== trim( (string) $val ) ) {
				echo '<div><dt>' . esc_html( $k ) . '</dt><dd>' . esc_html( $val ) . '</dd></div>';
			}
		}
		echo '</dl><p class="om-ins-more"><a href="' . esc_url( $this->url( array( 'visitor' => $v['vid'] ) ) ) . '">' . esc_html__( 'Every visit from this visitor', 'om-catalog' ) . ' →</a></p></section>';
	}

	/** Events as a readable list: pages with their time, and what happened on each. */
	public function timeline( $events, $start ) {
		if ( ! $events ) {
			return '<p class="om-ins-empty">' . esc_html__( 'Nothing recorded.', 'om-catalog' ) . '</p>';
		}
		$out  = '<ol class="om-ins-timeline">';
		$last = '';
		foreach ( $events as $ev ) {
			$at   = '<time>' . esc_html( wp_date( 'g:i:s a', (int) $ev['ts'] ) ) . '</time>';
			$type = $ev['type'];
			if ( 'pageview' === $type ) {
				$extra = array();
				if ( (int) $ev['dur'] ) {
					/* translators: %s: time. */
					$extra[] = sprintf( __( '%s on the page', 'om-catalog' ), self::duration( (int) $ev['dur'] ) );
				}
				if ( (int) $ev['scroll'] ) {
					/* translators: %s: percent scrolled. */
					$extra[] = sprintf( __( 'scrolled %s', 'om-catalog' ), (int) $ev['scroll'] . '%' );
				}
				if ( '' !== $ev['meta'] ) {
					$extra[] = self::meta_words( (string) $ev['meta'] );
				}
				$out .= '<li class="pv">' . $at . '<span><strong>' . ( '' !== $ev['item'] ? self::design_cell( $ev['item'], self::title( $ev['label'], $ev['page'] ) ) : self::page_cell( $ev['page'], $ev['label'] ) ) . '</strong>' . ( $extra ? '<small>' . esc_html( implode( ' · ', $extra ) ) . '</small>' : '' ) . '</span></li>';
				$last = $ev['page'];
				continue;
			}
			if ( 'view' === $type && '' !== $ev['item'] ) {
				if ( 'quick_view' !== $ev['meta'] ) {
					continue; // The page itself is already listed.
				}
				$out .= '<li class="act">' . $at . '<span>' . esc_html__( 'Quick view:', 'om-catalog' ) . ' ' . self::design_cell( $ev['item'], $ev['label'] ) . '</span></li>';
				continue;
			}
			$what = self::action_words( $type, $ev['label'], $ev['meta'], $ev['val'] );
			$info = '';
			switch ( $type ) {
				case 'lead':
					$what = sprintf( /* translators: %s: kind of lead. */ __( 'Became a lead: %s', 'om-catalog' ), OM_Insights::lead_types()[ $ev['label'] ] ?? $ev['label'] );
					if ( '' !== $ev['item'] ) {
						$what .= ' · ' . self::design( $ev['item'] )['title'];
					}
					$info = esc_html( (string) $ev['meta'] );
					if ( (int) $ev['val'] > 0 && get_post( (int) $ev['val'] ) ) {
						$info .= ( '' !== $info ? ' · ' : '' ) . '<a href="' . esc_url( (string) get_edit_post_link( (int) $ev['val'] ) ) . '">' . esc_html__( 'Open the inquiry', 'om-catalog' ) . '</a>';
					}
					$out .= '<li class="lead">' . $at . '<span><strong>' . esc_html( $what ) . '</strong>' . ( '' !== $info ? ' <small>' . $info . '</small>' : '' ) . '</span></li>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
					continue 2;
				case 'option':
					/* translators: 1: option (metal, ring size...), 2: what was chosen. */
					$what = sprintf( __( 'Chose %1$s: %2$s', 'om-catalog' ), function_exists( 'mb_strtolower' ) ? mb_strtolower( $what ) : strtolower( $what ), $ev['meta'] );
					$info = '';
					break;
				case 'cta':
					/* translators: %s: button wording. */
					$what = '' !== $ev['label'] ? sprintf( __( 'Clicked "%s"', 'om-catalog' ), $ev['label'] ) : $what;
					$info = self::place_name( $ev['meta'] );
					break;
				case 'call':
					$what .= ' ' . self::phone( $ev['label'] );
					$info  = self::place_name( $ev['meta'] );
					break;
				case 'directions':
				case 'email':
					$info = self::place_name( $ev['meta'] );
					break;
				case 'search':
				case 'search_zero':
				case 'outbound':
					$info = $ev['label'];
					break;
				case 'filter':
					$info = self::meta_words( (string) $ev['meta'] );
					break;
				case 'quiz':
					$info = $ev['meta'];
					break;
				case 'booking':
					$info = 'step' === $ev['label'] ? sprintf( /* translators: %d: step. */ __( 'step %d', 'om-catalog' ), (int) $ev['val'] ) : ( 'open' === $ev['label'] && '' !== $ev['meta'] ? self::place_name( $ev['meta'] ) : $ev['meta'] );
					break;
				default:
					$info = '' !== $ev['meta'] ? $ev['meta'] : '';
			}
			$design = '';
			if ( '' !== $ev['item'] && in_array( $type, array( 'save', 'compare', 'share' ), true ) ) {
				$words  = array( 'save' => __( 'Saved', 'om-catalog' ), 'compare' => __( 'Compared', 'om-catalog' ), 'share' => __( 'Shared', 'om-catalog' ) );
				$what   = $words[ $type ];
				$design = ' ' . self::design( $ev['item'] )['title'];
				$info   = 'compare' === $type ? '' : $info;
			}
			$out   .= '<li class="' . ( 'lead' === $type ? 'lead' : 'act' ) . '">' . $at . '<span>' . esc_html( $what . $design ) . ( '' !== (string) $info ? ' <small>' . esc_html( $info ) . '</small>' : '' ) . '</span></li>';
		}
		return $out . '</ol>';
	}

	/** Every visit from one visitor (as far as this browser goes). */
	private function view_visitor( $vid ) {
		$s    = OM_Insights::sessions_table();
		$rows = self::rows( "SELECT * FROM {$s} WHERE vid = %s ORDER BY started DESC LIMIT 100", array( $vid ) );
		echo '<p><a href="' . esc_url( $this->url( array( 'tab' => 'journeys' ) ) ) . '">← ' . esc_html__( 'All visits', 'om-catalog' ) . '</a></p>';
		if ( ! $rows ) {
			echo '<p class="om-ins-empty">' . esc_html__( 'No visits kept for this visitor.', 'om-catalog' ) . '</p>';
			return;
		}
		$name = '';
		foreach ( $rows as $r ) {
			$name = '' !== $r['lead_name'] ? $r['lead_name'] : $name;
		}
		$first = end( $rows );
		echo '<section class="om-ins-card"><h2>' . esc_html( self::visitor_label( $vid, $name ) ) . '</h2><p class="om-ins-desc">' . esc_html( sprintf( /* translators: 1: number of visits, 2: first visit date. */ _n( '%1$s visit since %2$s, newest first.', '%1$s visits since %2$s, newest first.', count( $rows ), 'om-catalog' ), number_format_i18n( count( $rows ) ), wp_date( 'M j, Y', (int) $first['started'] ) ) ) . '</p>';
		$this->visits_table( $rows );
		echo '</section>';
	}

	/* ---------- Leads ---------- */

	private function leads_table( $leads, $compact = false ) {
		if ( ! $leads ) {
			return '<p class="om-ins-empty">' . esc_html__( 'No leads in this period yet.', 'om-catalog' ) . '</p>';
		}
		$rows = array();
		foreach ( $leads as $r ) {
			$kind  = OM_Insights::lead_types()[ $r['kind'] ] ?? $r['kind'];
			$what  = '' !== $r['item'] ? self::design( $r['item'] )['title'] : '';
			$what  = trim( $what . ( '' !== $r['meta'] && $r['meta'] !== $what ? ( '' !== $what ? ' · ' : '' ) . $r['meta'] : '' ) );
			$who   = '' !== (string) $r['sid'] ? '<a href="' . esc_url( $this->url( array( 'visit' => $r['sid'] ) ) ) . '">' . esc_html( self::visitor_label( (string) $r['vid'], (string) $r['lead_name'] ) ) . '</a>' : esc_html__( 'Not linked to a visit', 'om-catalog' );
			$days  = $r['first'] ? max( 0, (int) floor( ( (int) $r['ts'] - (int) $r['first'] ) / DAY_IN_SECONDS ) ) : null;
			$story = '' !== (string) $r['sid'] ? self::channel_name( (string) $r['channel'] ) : '';
			$row   = array(
				esc_html( wp_date( 'M j, g:i a', (int) $r['ts'] ) ),
				$who . '<small>' . esc_html( $kind ) . '</small>',
				esc_html( $what ),
				esc_html( $story ),
			);
			if ( ! $compact ) {
				$known = (int) $r['visits'] > 0;
				$row[] = $known ? self::n( (int) $r['visits'] ) : '–';
				$row[] = ! $known || null === $days ? '–' : self::n( $days, 0 === $days ? __( 'same day', 'om-catalog' ) : sprintf( /* translators: %s: days. */ _n( '%s day', '%s days', $days, 'om-catalog' ), number_format_i18n( $days ) ) );
				$row[] = '' !== (string) $r['sid'] ? self::n( (int) $r['pages'] ) : '–';
				$row[] = '' !== (string) $r['sid'] ? self::n( (int) $r['engaged'], self::duration( (int) $r['engaged'] ) ) : '–';
				$row[] = '' !== (string) $r['landing'] ? self::page_cell( (string) $r['landing'], (string) $r['landing_title'] ) : '–';
			}
			$rows[] = $row;
		}
		$heads = array( __( 'When', 'om-catalog' ), __( 'Who', 'om-catalog' ), __( 'About', 'om-catalog' ), __( 'Came from', 'om-catalog' ) );
		if ( ! $compact ) {
			$heads = array_merge( $heads, array( __( 'Visits', 'om-catalog' ), __( 'Took', 'om-catalog' ), __( 'Pages (this visit)', 'om-catalog' ), __( 'Time (this visit)', 'om-catalog' ), __( 'First page', 'om-catalog' ) ) );
		}
		return self::table( $heads, $rows, '', 'om-ins-leads', $compact ? 0 : 25 );
	}

	private function tab_leads() {
		list( $pf, $pt ) = $this->previous();
		$data = $this->cached(
			'leads',
			function () use ( $pf, $pt ) {
				$e = OM_Insights::events_table();
				return array(
					'list'     => $this->leads( 300 ),
					'now'      => $this->kpis( $this->from, $this->to ),
					'before'   => $this->kpis( $pf, $pt ),
					'types'    => self::rows( "SELECT label AS k, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND day BETWEEN %s AND %s GROUP BY label ORDER BY n DESC", array( $this->from, $this->to ) ),
					'channels' => $this->by_visit( 'channel', 12 ),
					'landing'  => $this->by_visit( 'landing', 12, 'AND leads > 0' ),
				);
			}
		);
		$k = $data['now'];
		$b = $data['before'];
		echo '<div class="om-ins-tiles">';
		echo self::tile( __( 'Leads', 'om-catalog' ), number_format_i18n( $k['leads'] ), $k['leads'], $b['leads'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Visits that became leads', 'om-catalog' ), number_format_i18n( $k['conv'], 1 ) . '%', $k['conv'], $b['conv'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Calls tapped', 'om-catalog' ), number_format_i18n( $k['calls'] ), $k['calls'], $b['calls'], true, __( 'Taps on a phone number. The call itself happens off the site.', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo self::tile( __( 'Directions opened', 'om-catalog' ), number_format_i18n( $k['directions'] ), $k['directions'], $b['directions'] ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo '</div>';
		$this->grid_open();
		$rows = array();
		foreach ( $data['types'] as $r ) {
			$rows[] = array( esc_html( OM_Insights::lead_types()[ $r['k'] ] ?? $r['k'] ), (int) $r['n'] );
		}
		$this->card( __( 'Kinds of lead', 'om-catalog' ), '', self::hbars( $rows, __( 'No leads in this period yet.', 'om-catalog' ), $k['leads'] ) );
		$rows = array();
		foreach ( $data['channels'] as $r ) {
			if ( (int) $r['converted'] ) {
				$rows[] = array( esc_html( self::channel_name( $r['k'] ) ), (int) $r['converted'], sprintf( /* translators: 1: rate, 2: visits. */ __( '%1$s of %2$s visits', 'om-catalog' ), self::pct( (int) $r['converted'], (int) $r['visits'] ), number_format_i18n( (int) $r['visits'] ) ) );
			}
		}
		$this->card( __( 'Leads by source', 'om-catalog' ), __( 'Visits that ended in a lead, by where they came from.', 'om-catalog' ), self::hbars( $rows, __( 'No leads in this period yet.', 'om-catalog' ) ) );
		echo '</div>';
		$this->card( __( 'Every lead', 'om-catalog' ), __( 'Visits: how many times this visitor came before getting in touch. Took: days from their first visit. Open a name to see the visit step by step.', 'om-catalog' ), $this->leads_table( $data['list'] ) );
	}

	/* ---------- Live ---------- */

	private function live_rows() {
		$s = OM_Insights::sessions_table();
		return self::rows( "SELECT sid, vid, started, last, exit_page, channel, ref_host, device, city, region, pages, products, saves, leads, lead_name, lead_type FROM {$s} WHERE last >= %d ORDER BY last DESC LIMIT 60", array( time() - 5 * MINUTE_IN_SECONDS ) );
	}

	private function live_count() {
		$s = OM_Insights::sessions_table();
		return (int) ( self::row( "SELECT COUNT(*) AS n FROM {$s} WHERE last >= %d", array( time() - 5 * MINUTE_IN_SECONDS ) )['n'] ?? 0 );
	}

	private function live_html() {
		$rows = $this->live_rows();
		if ( ! $rows ) {
			return '<p class="om-ins-empty">' . esc_html__( 'Nobody on the site at the moment.', 'om-catalog' ) . '</p>';
		}
		$titles = $this->page_titles( wp_list_pluck( $rows, 'exit_page' ), wp_date( 'Y-m-d', time() - DAY_IN_SECONDS ), wp_date( 'Y-m-d' ) );
		$out    = '<div class="om-ins-scroll"><table class="om-ins-table"><thead><tr><th scope="col">' . esc_html__( 'Visitor', 'om-catalog' ) . '</th><th scope="col">' . esc_html__( 'Now on', 'om-catalog' ) . '</th><th scope="col">' . esc_html__( 'Came from', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'Pages', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'Designs', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html__( 'On site for', 'om-catalog' ) . '</th></tr></thead><tbody>';
		foreach ( $rows as $r ) {
			$out .= '<tr><td><a href="' . esc_url( $this->url( array( 'visit' => $r['sid'] ) ) ) . '">' . esc_html( self::visitor_label( $r['vid'], $r['lead_name'] ) ) . '</a><small>' . esc_html( self::device_name( $r['device'] ) . ( '' !== $r['city'] ? ' · ' . $r['city'] : '' ) ) . '</small></td><td>' . ( '' !== (string) $r['exit_page'] ? self::page_cell( (string) $r['exit_page'], $titles[ $r['exit_page'] ] ?? '' ) : '–' ) . '</td><td>' . esc_html( self::channel_name( $r['channel'] ) . ( '' !== $r['ref_host'] ? ' · ' . $r['ref_host'] : '' ) ) . '</td><td class="num">' . esc_html( number_format_i18n( (int) $r['pages'] ) ) . '</td><td class="num">' . esc_html( number_format_i18n( (int) $r['products'] ) ) . '</td><td class="num">' . esc_html( self::duration( max( 0, (int) $r['last'] - (int) $r['started'] ) ) ) . '</td></tr>';
		}
		return $out . '</tbody></table></div>';
	}

	private function tab_live() {
		echo '<section class="om-ins-card" data-om-ins-live><div class="om-ins-cardhead"><h2>' . esc_html__( 'On the site in the last 5 minutes', 'om-catalog' ) . '</h2><small class="om-ins-updated" data-om-ins-updated></small></div><div data-om-ins-livebody>' . $this->live_html() . '</div><p class="om-ins-desc">' . esc_html__( 'Updates by itself every 20 seconds while this page is open.', 'om-catalog' ) . '</p></section>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped.
	}

	public function live_json() {
		check_ajax_referer( 'om_ins_live', 'nonce' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( null, 403 );
		}
		$this->range = '30d';
		wp_send_json_success(
			array(
				'count' => $this->live_count(),
				'html'  => $this->live_html(),
				/* translators: %s: number of people. */
				'label' => sprintf( _n( '%s on the site right now', '%s on the site right now', $this->live_count(), 'om-catalog' ), number_format_i18n( $this->live_count() ) ),
				'time'  => wp_date( 'g:i:s a' ),
			)
		);
	}

	/* ---------- Settings ---------- */

	private function tab_settings() {
		global $wpdb;
		$e      = OM_Insights::events_table();
		$s      = OM_Insights::sessions_table();
		$counts = array(
			'events' => (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$e}" ), // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
			'visits' => (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$s}" ), // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
			'first'  => (string) $wpdb->get_var( "SELECT MIN(day) FROM {$s}" ), // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
		);
		$check = static function ( $name, $label, $help = '' ) {
			return '<p><label><input type="checkbox" name="' . esc_attr( $name ) . '" value="1"' . checked( '0' !== OM_Insights::opt( $name ), true, false ) . ' /> ' . esc_html( $label ) . '</label>' . ( $help ? '<br /><span class="description">' . esc_html( $help ) . '</span>' : '' ) . '</p>';
		};
		echo '<section class="om-ins-card"><h2>' . esc_html__( 'Settings', 'om-catalog' ) . '</h2>';
		echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '"><input type="hidden" name="action" value="om_ins_settings" />';
		wp_nonce_field( 'om_ins_settings' );
		echo $check( 'om_ins', __( 'Collect insights', 'om-catalog' ), __( 'A small script on every page reports what visitors do to this site (nowhere else).', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo $check( 'om_ins_staff', __( 'Leave out logged-in staff', 'om-catalog' ), __( 'Your own browsing (and your team\'s) isn\'t counted while logged in.', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo $check( 'om_ins_vid', __( 'Recognise returning visitors', 'om-catalog' ), __( 'Keeps an anonymous ID in the visitor\'s browser for up to 400 days, so a second visit is linked to the first. Off: every visit stands alone.', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo $check( 'om_ins_dnt', __( 'Respect "Do Not Track" and Global Privacy Control', 'om-catalog' ), __( 'Browsers set to ask sites not to track them are not counted at all.', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo $check( 'om_ins_journey', __( 'Show the visit behind each inquiry', 'om-catalog' ), __( 'Adds "Their visit" (where they came from, what they looked at and saved) to inquiries in wp-admin and to the inquiry and visit request emails you get.', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
		echo '<p><label>' . esc_html__( 'Keep data for', 'om-catalog' ) . ' <select name="om_ins_months">';
		foreach ( array( 3, 6, 13, 25, 37 ) as $m ) {
			echo '<option value="' . (int) $m . '"' . selected( OM_Insights::months(), $m, false ) . '>' . esc_html( sprintf( /* translators: %d: months. */ _n( '%d month', '%d months', $m, 'om-catalog' ), $m ) ) . '</option>';
		}
		echo '</select></label><br /><span class="description">' . esc_html__( 'Older visits are deleted every night. 13 months lets you compare with the same month last year.', 'om-catalog' ) . '</span></p>';
		submit_button( __( 'Save settings', 'om-catalog' ) );
		echo '</form></section>';

		echo '<section class="om-ins-card"><h2>' . esc_html__( 'Your data', 'om-catalog' ) . '</h2><p>' . esc_html( sprintf( /* translators: 1: visits, 2: actions, 3: date. */ __( '%1$s visits and %2$s recorded actions, since %3$s. Stored in your own database only.', 'om-catalog' ), number_format_i18n( $counts['visits'] ), number_format_i18n( $counts['events'] ), $counts['first'] ? wp_date( 'M j, Y', strtotime( $counts['first'] . ' 12:00:00' ) ) : '–' ) ) . '</p>';
		echo '<p class="om-ins-actions"><a class="button" href="' . esc_url( wp_nonce_url( add_query_arg( array( 'action' => 'om_ins_csv', 'what' => 'visits', 'from' => wp_date( 'Y-m-d', time() - 89 * DAY_IN_SECONDS ), 'to' => wp_date( 'Y-m-d' ) ), admin_url( 'admin-post.php' ) ), 'om_ins_csv' ) ) . '">' . esc_html__( 'Download visits, last 90 days (CSV)', 'om-catalog' ) . '</a> <a class="button" href="' . esc_url( wp_nonce_url( add_query_arg( array( 'action' => 'om_ins_csv', 'what' => 'events', 'from' => wp_date( 'Y-m-d', time() - 89 * DAY_IN_SECONDS ), 'to' => wp_date( 'Y-m-d' ) ), admin_url( 'admin-post.php' ) ), 'om_ins_csv' ) ) . '">' . esc_html__( 'Download actions, last 90 days (CSV)', 'om-catalog' ) . '</a></p>';
		if ( class_exists( 'OM_Stats' ) && OM_Stats::has_history() ) {
			echo '<p><a href="' . esc_url( admin_url( 'admin.php?page=' . OM_Stats::PAGE ) ) . '">' . esc_html__( 'Earlier catalog counts (kept before Insights)', 'om-catalog' ) . ' &rarr;</a></p>';
		}
		echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '" onsubmit="return confirm(\'' . esc_js( __( 'Delete every visit and action recorded so far? This cannot be undone.', 'om-catalog' ) ) . '\');"><input type="hidden" name="action" value="om_ins_wipe" />';
		wp_nonce_field( 'om_ins_wipe' );
		echo '<button class="button om-ins-delete" type="submit">' . esc_html__( 'Delete all insights data', 'om-catalog' ) . '</button></form></section>';

		echo '<section class="om-ins-card"><h2>' . esc_html__( 'Privacy', 'om-catalog' ) . '</h2><p>' . esc_html__( 'Insights uses two first-party cookies (om_sid for the visit, 30 minutes; om_vid for a returning visitor, up to 400 days) holding random IDs. No IP address is stored and nothing is sent to other companies. A name or email is kept only when a visitor sends a form, with that lead. Consider adding a line to your privacy policy, for example:', 'om-catalog' ) . '</p><blockquote class="om-ins-quote">' . esc_html( sprintf( /* translators: %d: months the data is kept. */ _n( 'We use our own website analytics to understand how visitors use our site. It stores anonymous IDs in two cookies and records the pages and designs viewed. This information stays on our website, is not shared or sold, and is deleted after %d month.', 'We use our own website analytics to understand how visitors use our site. It stores anonymous IDs in two cookies and records the pages and designs viewed. This information stays on our website, is not shared or sold, and is deleted after %d months.', OM_Insights::months(), 'om-catalog' ), OM_Insights::months() ) ) . '</blockquote></section>';
	}

	public function save_settings() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'om_ins_settings' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'om-catalog' ) );
		}
		foreach ( array( 'om_ins', 'om_ins_staff', 'om_ins_vid', 'om_ins_dnt', 'om_ins_journey' ) as $name ) {
			update_option( $name, empty( $_POST[ $name ] ) ? '0' : '1' );
		}
		$months = isset( $_POST['om_ins_months'] ) ? (int) $_POST['om_ins_months'] : 13;
		update_option( 'om_ins_months', (string) ( in_array( $months, array( 3, 6, 13, 25, 37 ), true ) ? $months : 13 ) );
		wp_safe_redirect( add_query_arg( array( 'page' => self::SLUG, 'tab' => 'settings', 'saved' => 1 ), admin_url( 'admin.php' ) ) );
		exit;
	}

	public function wipe() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'om_ins_wipe' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'om-catalog' ) );
		}
		OM_Insights::wipe();
		wp_safe_redirect( add_query_arg( array( 'page' => self::SLUG, 'tab' => 'settings' ), admin_url( 'admin.php' ) ) );
		exit;
	}

	/** Visits or actions for a period, as CSV (for a spreadsheet). */
	public function csv() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'om_ins_csv' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'om-catalog' ) );
		}
		$what = isset( $_GET['what'] ) && 'events' === $_GET['what'] ? 'events' : 'visits';
		$from = isset( $_GET['from'] ) ? self::valid_day( sanitize_text_field( wp_unslash( $_GET['from'] ) ) ) : '';
		$to   = isset( $_GET['to'] ) ? self::valid_day( sanitize_text_field( wp_unslash( $_GET['to'] ) ) ) : '';
		$from = $from ? $from : wp_date( 'Y-m-d', time() - 29 * DAY_IN_SECONDS );
		$to   = $to ? $to : wp_date( 'Y-m-d' );
		nocache_headers();
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=insights-' . $what . '-' . $from . '-to-' . $to . '.csv' );
		$out  = fopen( 'php://output', 'w' );
		$cell = static function ( $v ) {
			$v = (string) $v;
			return preg_match( '/^[=+\-@\t\r]/', $v ) ? "'" . $v : $v; // No spreadsheet formulas.
		};
		if ( 'events' === $what ) {
			$cols = array( 'ts', 'day', 'sid', 'vid', 'type', 'page', 'item', 'label', 'meta', 'val', 'dur', 'scroll' );
			fputcsv( $out, array_merge( array( 'time' ), array_slice( $cols, 1 ) ), ',', '"', '' );
			$table = OM_Insights::events_table();
		} else {
			$cols = array( 'started', 'day', 'sid', 'vid', 'visit_no', 'is_new', 'channel', 'ref_host', 'utm_source', 'utm_medium', 'utm_campaign', 'landing', 'exit_page', 'device', 'browser', 'os', 'country', 'region', 'city', 'tz', 'pages', 'products', 'saves', 'engaged', 'leads', 'lead_type', 'lead_name' );
			fputcsv( $out, array_merge( array( 'time' ), array_slice( $cols, 1 ) ), ',', '"', '' );
			$table = OM_Insights::sessions_table();
		}
		$order = 'events' === $what ? 'ts, id' : 'started';
		for ( $offset = 0; $offset < 2000000; $offset += 5000 ) {
			$rows = self::rows( 'SELECT ' . implode( ', ', $cols ) . " FROM {$table} WHERE day BETWEEN %s AND %s ORDER BY {$order} LIMIT 5000 OFFSET %d", array( $from, $to, $offset ) );
			foreach ( $rows as $r ) {
				$line    = array_map( $cell, array_values( $r ) );
				$line[0] = wp_date( 'Y-m-d H:i:s', (int) $r[ $cols[0] ] );
				fputcsv( $out, $line, ',', '"', '' );
			}
			if ( count( $rows ) < 5000 ) {
				break;
			}
		}
		fclose( $out ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose
		exit;
	}

	/* ---------- The visit behind an inquiry ---------- */

	public function inquiry_box() {
		if ( ! OM_Insights::journey_on() || ! current_user_can( 'manage_options' ) ) {
			return;
		}
		add_meta_box( 'om-ins-visit', __( 'Their visit', 'om-catalog' ), array( $this, 'inquiry_box_html' ), null, 'normal', 'default' );
	}

	public function inquiry_box_html( $post ) {
		$sid = OM_Insights::inquiry_sid( $post->ID );
		$j   = '' !== $sid ? OM_Insights::journey( $sid ) : null;
		echo '<div class="om-ins om-ins-box">';
		if ( ! $j ) {
			echo '<p class="om-ins-empty">' . esc_html__( 'No visit recorded for this inquiry. It may have been sent before Insights was switched on, from a browser that blocks cookies or asks not to be tracked, or while logged in.', 'om-catalog' ) . '</p></div>';
			return;
		}
		echo '<dl class="om-ins-facts">';
		foreach ( OM_Insights::journey_lines( $j ) as $line ) {
			$value = esc_html( $line[1] );
			if ( $line[2] ) {
				$names = array();
				foreach ( array_slice( $line[2], 0, 8 ) as $key ) {
					$d       = self::design( $key );
					$names[] = '' !== $d['url'] ? '<a href="' . esc_url( $d['url'] ) . '" target="_blank" rel="noopener">' . esc_html( $d['title'] ) . '</a>' : esc_html( $d['title'] );
				}
				$more   = count( $line[2] ) - 8;
				/* translators: %s: number of further designs. */
				$value .= ( '' !== $value ? '<br />' : '' ) . implode( ', ', $names ) . ( $more > 0 ? ' ' . esc_html( sprintf( __( 'and %s more', 'om-catalog' ), number_format_i18n( $more ) ) ) : '' );
			}
			echo '<div><dt>' . esc_html( $line[0] ) . '</dt><dd>' . $value . '</dd></div>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
		}
		echo '</dl>';
		echo '<details class="om-ins-steps"><summary>' . esc_html__( 'Everything they did on this visit, step by step', 'om-catalog' ) . '</summary>' . $this->timeline( $j['events'], (int) $j['visit']['started'] ) . '</details>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped.
		echo '<p class="om-ins-more"><a href="' . esc_url( add_query_arg( array( 'page' => self::SLUG, 'visit' => $sid ), admin_url( 'admin.php' ) ) ) . '">' . esc_html__( 'Open the visit in Insights', 'om-catalog' ) . ' &rarr;</a>';
		if ( $j['visits'] > 1 ) {
			echo ' &nbsp;&middot;&nbsp; <a href="' . esc_url( add_query_arg( array( 'page' => self::SLUG, 'visitor' => $j['visit']['vid'] ), admin_url( 'admin.php' ) ) ) . '">' . esc_html( sprintf( /* translators: %s: number of visits. */ __( 'All %s visits from this visitor', 'om-catalog' ), number_format_i18n( $j['visits'] ) ) ) . ' &rarr;</a>';
		}
		echo '</p></div>';
	}

	public function inquiry_columns( $columns ) {
		if ( ! OM_Insights::journey_on() ) {
			return $columns;
		}
		$out = array();
		foreach ( $columns as $key => $label ) {
			if ( 'date' === $key ) {
				$out['om_ins_from'] = __( 'Came from', 'om-catalog' );
			}
			$out[ $key ] = $label;
		}
		return isset( $out['om_ins_from'] ) ? $out : $out + array( 'om_ins_from' => __( 'Came from', 'om-catalog' ) );
	}

	public function inquiry_column( $column, $post_id ) {
		if ( 'om_ins_from' !== $column ) {
			return;
		}
		$sid = OM_Insights::inquiry_sid( $post_id );
		$v   = '' !== $sid ? self::row( 'SELECT sid, vid, channel, ref_host, visit_no, device FROM ' . OM_Insights::sessions_table() . ' WHERE sid = %s', array( $sid ) ) : array();
		if ( ! $v ) {
			echo '<span aria-hidden="true">&ndash;</span>';
			return;
		}
		echo '<a href="' . esc_url( add_query_arg( array( 'page' => self::SLUG, 'visit' => $sid ), admin_url( 'admin.php' ) ) ) . '">' . esc_html( self::channel_name( $v['channel'] ) ) . '</a>';
		$bits = array( self::device_one( $v['device'] ) );
		if ( (int) $v['visit_no'] > 1 ) {
			/* translators: %s: visit number. */
			$bits[] = sprintf( __( 'visit %s', 'om-catalog' ), number_format_i18n( (int) $v['visit_no'] ) );
		}
		echo '<br /><small>' . esc_html( implode( ' · ', $bits ) ) . '</small>';
	}

	/* ---------- WordPress dashboard box ---------- */

	public function dashboard_widget() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		wp_add_dashboard_widget(
			'om_ins_widget',
			__( 'Insights: last 7 days', 'om-catalog' ),
			function () {
				$this->from = wp_date( 'Y-m-d', time() - 6 * DAY_IN_SECONDS );
				$this->to   = wp_date( 'Y-m-d' );
				$k          = $this->cached( 'widget', function () { return $this->kpis( $this->from, $this->to ); } );
				echo '<ul class="om-ins-wtiles" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:0;">';
				foreach ( array( array( __( 'Visitors', 'om-catalog' ), number_format_i18n( $k['visitors'] ) ), array( __( 'Designs viewed', 'om-catalog' ), number_format_i18n( $k['products'] ) ), array( __( 'Saved', 'om-catalog' ), number_format_i18n( $k['saves'] ) ), array( __( 'Leads', 'om-catalog' ), number_format_i18n( $k['leads'] ) ) ) as $t ) {
					echo '<li style="margin:0;padding:10px;border:1px solid #dcdcde;border-radius:6px;"><span style="display:block;font-size:20px;font-weight:600;color:#1d2327;">' . esc_html( $t[1] ) . '</span><span style="color:#50575e;">' . esc_html( $t[0] ) . '</span></li>';
				}
				echo '</ul><p><a href="' . esc_url( admin_url( 'admin.php?page=' . self::SLUG ) ) . '">' . esc_html__( 'Open Insights', 'om-catalog' ) . ' →</a></p>';
			}
		);
	}
}
