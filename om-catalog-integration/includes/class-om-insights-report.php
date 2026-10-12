<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Insights reports: one view of the dashboard for one request.
 *
 * Reads the section, period, filters and chart interval from a request (the
 * page address, or the same parameters sent by the dashboard's script),
 * queries the two Insights tables with prepared statements (cached a few
 * minutes) and renders each part as HTML, plus the chart as JSON. Used by
 * OM_Insights_Admin for the first page load and for every in-place update.
 *
 * Filters ("click a row to see only those visits") narrow every number on
 * every tab: visit details (source, device, place, first and last page) are
 * matched on the visits table; "viewed this page / design" and "searched
 * for" on the actions of the visit.
 */
class OM_Insights_Report {

	const CACHE = 180;

	/** Current view. */
	public $tab      = 'overview';
	public $range    = '30d';
	public $from     = '';
	public $to       = '';
	public $filters  = array();
	public $interval = '';
	public $show     = 'all';
	public $p        = 1;
	public $visit    = '';
	public $visitor  = '';
	public $fresh    = false;

	public function __construct( $req = array() ) {
		$this->read( is_array( $req ) ? $req : array() );
	}

	/* ---------------------------------------------------------------
	 * Vocabulary
	 * ------------------------------------------------------------- */

	public static function tabs() {
		return array(
			'overview' => __( 'Overview', 'om-catalog' ),
			'sources'  => __( 'Sources', 'om-catalog' ),
			'pages'    => __( 'Pages', 'om-catalog' ),
			'designs'  => __( 'Designs', 'om-catalog' ),
			'searches' => __( 'Searches', 'om-catalog' ),
			'actions'  => __( 'Actions', 'om-catalog' ),
			'funnels'  => __( 'Funnels', 'om-catalog' ),
			'journeys' => __( 'Journeys', 'om-catalog' ),
			'leads'    => __( 'Leads', 'om-catalog' ),
			'live'     => __( 'Live', 'om-catalog' ),
			'settings' => __( 'Settings', 'om-catalog' ),
		);
	}

	/** Icon of each section. */
	public static function tab_icons() {
		return array(
			'overview' => 'overview',
			'sources'  => 'sources',
			'pages'    => 'pages',
			'designs'  => 'designs',
			'searches' => 'search',
			'actions'  => 'actions',
			'funnels'  => 'funnel',
			'journeys' => 'journeys',
			'leads'    => 'leads',
			'live'     => 'live',
			'settings' => 'settings',
		);
	}

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

	/** Keyboard keys for the periods (shown in the period menu). */
	public static function preset_keys() {
		return array( 'today' => 'T', 'yesterday' => 'Y', '7d' => 'W', '30d' => 'M', '90d' => 'Q', '12m' => 'L' );
	}

	/** What a visit can be narrowed to (filter key => name). */
	public static function filter_names() {
		return array(
			'channel'  => __( 'Source', 'om-catalog' ),
			'ref'      => __( 'Website', 'om-catalog' ),
			'campaign' => __( 'Campaign', 'om-catalog' ),
			'landing'  => __( 'First page', 'om-catalog' ),
			'exit'     => __( 'Last page', 'om-catalog' ),
			'page'     => __( 'Viewed page', 'om-catalog' ),
			'item'     => __( 'Viewed design', 'om-catalog' ),
			'search'   => __( 'Searched for', 'om-catalog' ),
			'device'   => __( 'Device', 'om-catalog' ),
			'browser'  => __( 'Browser', 'om-catalog' ),
			'os'       => __( 'System', 'om-catalog' ),
			'country'  => __( 'Country', 'om-catalog' ),
			'region'   => __( 'State', 'om-catalog' ),
			'city'     => __( 'City', 'om-catalog' ),
			'kind'     => __( 'Visitor', 'om-catalog' ),
			'lead'     => __( 'Outcome', 'om-catalog' ),
		);
	}

	/** Visit columns behind the simple filters. */
	private static function filter_columns() {
		return array(
			'channel'  => 'channel',
			'ref'      => 'ref_host',
			'campaign' => 'utm_campaign',
			'landing'  => 'landing',
			'exit'     => 'exit_page',
			'device'   => 'device',
			'browser'  => 'browser',
			'os'       => 'os',
			'country'  => 'country',
			'region'   => 'region',
			'city'     => 'city',
		);
	}

	/** The chart's measures: key => [ name, kind ] (kind: n number, t seconds, p percent). */
	public static function metrics() {
		return array(
			'visitors'  => array( __( 'Visitors', 'om-catalog' ), 'n' ),
			'visits'    => array( __( 'Visits', 'om-catalog' ), 'n' ),
			'pageviews' => array( __( 'Page views', 'om-catalog' ), 'n' ),
			'time'      => array( __( 'Time per visit', 'om-catalog' ), 't' ),
			'designs'   => array( __( 'Designs viewed', 'om-catalog' ), 'n' ),
			'saves'     => array( __( 'Saved (hearts)', 'om-catalog' ), 'n' ),
			'leads'     => array( __( 'Leads', 'om-catalog' ), 'n' ),
			'conv'      => array( __( 'Lead rate', 'om-catalog' ), 'p' ),
		);
	}

	/* ---------------------------------------------------------------
	 * The request
	 * ------------------------------------------------------------- */

	private static function valid_day( $value ) {
		$value = is_string( $value ) ? $value : '';
		if ( ! preg_match( '/^(\d{4})-(\d{2})-(\d{2})$/', $value, $m ) || ! checkdate( (int) $m[2], (int) $m[3], (int) $m[1] ) ) {
			return '';
		}
		return $value;
	}

	private function read( $req ) {
		$get = static function ( $key ) use ( $req ) {
			return isset( $req[ $key ] ) && is_scalar( $req[ $key ] ) ? sanitize_text_field( wp_unslash( (string) $req[ $key ] ) ) : '';
		};
		$tab   = sanitize_key( $get( 'tab' ) );
		$alias = array( 'visitors' => 'sources', 'products' => 'designs' );
		$tab   = $alias[ $tab ] ?? $tab;
		$this->tab = isset( self::tabs()[ $tab ] ) ? $tab : 'overview';

		$range = sanitize_key( $get( 'range' ) );
		$from  = self::valid_day( $get( 'from' ) );
		$to    = self::valid_day( $get( 'to' ) );
		$today = wp_date( 'Y-m-d' );
		$day   = static function ( $offset ) {
			return wp_date( 'Y-m-d', time() - $offset * DAY_IN_SECONDS );
		};
		if ( 'custom' === $range && $from && $to ) {
			if ( $from > $to ) {
				list( $from, $to ) = array( $to, $from );
			}
			$this->range = 'custom';
			$this->from  = min( $from, $today );
			$this->to    = min( $to, $today );
		} else {
			$this->range = isset( self::presets()[ $range ] ) ? $range : '30d';
			switch ( $this->range ) {
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

		$f = isset( $req['f'] ) && is_array( $req['f'] ) ? $req['f'] : array();
		foreach ( $f as $key => $value ) {
			$key = sanitize_key( (string) $key );
			if ( ! isset( self::filter_names()[ $key ] ) || ! is_scalar( $value ) ) {
				continue;
			}
			$value = sanitize_text_field( wp_unslash( (string) $value ) );
			$value = function_exists( 'mb_substr' ) ? mb_substr( $value, 0, 190 ) : substr( $value, 0, 190 );
			if ( 'kind' === $key && ! in_array( $value, array( 'new', 'returning' ), true ) ) {
				continue;
			}
			if ( 'lead' === $key && 'yes' !== $value ) {
				continue;
			}
			if ( '' !== $value ) {
				$this->filters[ $key ] = $value;
			}
		}
		ksort( $this->filters );

		$interval       = sanitize_key( $get( 'interval' ) );
		$this->interval = in_array( $interval, array( 'hour', 'day', 'week', 'month' ), true ) ? $interval : '';
		$show           = sanitize_key( $get( 'show' ) );
		$this->show     = isset( self::journey_filters()[ $show ] ) ? $show : 'all';
		$this->p        = max( 1, min( 10000, (int) $get( 'p' ) ) );
		$this->visit    = OM_Insights::id( $get( 'visit' ), 12 );
		$this->visitor  = OM_Insights::id( $get( 'visitor' ), 12 );
		$this->fresh    = '' !== $get( 'refresh' );
	}

	/** Days in the period. */
	public function span() {
		return (int) round( ( strtotime( $this->to . ' 12:00:00' ) - strtotime( $this->from . ' 12:00:00' ) ) / DAY_IN_SECONDS ) + 1;
	}

	/** The period just before, as long. */
	public function previous() {
		$n = $this->span();
		$t = strtotime( $this->from . ' 12:00:00' );
		return array( gmdate( 'Y-m-d', $t - $n * DAY_IN_SECONDS ), gmdate( 'Y-m-d', $t - DAY_IN_SECONDS ) );
	}

	/** "Last 30 days", or the dates of a custom period. */
	public function range_name() {
		return 'custom' === $this->range ? $this->period_text() : self::presets()[ $this->range ];
	}

	public function period_text() {
		$a = strtotime( $this->from . ' 12:00:00' );
		$b = strtotime( $this->to . ' 12:00:00' );
		if ( $this->from === $this->to ) {
			return wp_date( 'D, M j, Y', $a );
		}
		return wp_date( gmdate( 'Y', $a ) === gmdate( 'Y', $b ) ? 'M j' : 'M j, Y', $a ) . ' – ' . wp_date( 'M j, Y', $b );
	}

	/**
	 * An address of the dashboard for this view with changes (null removes).
	 * Values are encoded here (WordPress' add_query_arg() leaves them raw).
	 */
	public function url( $args = array() ) {
		$q = array( 'page' => OM_Insights_Admin::SLUG, 'tab' => $this->tab, 'range' => $this->range );
		if ( 'custom' === $this->range ) {
			$q['from'] = $this->from;
			$q['to']   = $this->to;
		}
		if ( $this->filters ) {
			$q['f'] = $this->filters;
		}
		if ( $this->interval && 'overview' === $this->tab ) {
			$q['interval'] = $this->interval;
		}
		foreach ( $args as $key => $value ) {
			if ( null === $value ) {
				unset( $q[ $key ] );
			} else {
				$q[ $key ] = $value;
			}
		}
		if ( isset( $q['tab'] ) && 'overview' !== $q['tab'] ) {
			unset( $q['interval'] );
		}
		return admin_url( 'admin.php' ) . '?' . http_build_query( $q, '', '&', PHP_QUERY_RFC3986 );
	}

	/** The same view with one more filter (or one less, when $value is null). */
	public function filter_url( $key, $value, $args = array() ) {
		$f = $this->filters;
		if ( null === $value ) {
			unset( $f[ $key ] );
		} else {
			$f[ $key ] = (string) $value;
		}
		ksort( $f );
		$args['f'] = $f ? $f : null;
		unset( $args['p'] );
		return $this->url( array_merge( array( 'p' => null, 'visit' => null, 'visitor' => null ), $args ) );
	}

	/* ---------------------------------------------------------------
	 * Queries
	 * ------------------------------------------------------------- */

	/** A result kept for a few minutes ("Refresh" skips it). */
	private function cached( $key, $fn ) {
		$tkey = 'om_ins_c_' . md5( $key . '|' . $this->from . '|' . $this->to . '|' . wp_json_encode( $this->filters ) . '|' . OM_CATALOG_VERSION );
		if ( ! $this->fresh ) {
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
		return (array) $wpdb->get_results( $args ? $wpdb->prepare( $sql, $args ) : $sql, ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
	}

	private static function row( $sql, $args ) {
		global $wpdb;
		return (array) $wpdb->get_row( $args ? $wpdb->prepare( $sql, $args ) : $sql, ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
	}

	/**
	 * The filters as conditions on the visits table: [ " AND ...", args ].
	 * $from / $to bound the actions looked up for "viewed" and "searched".
	 */
	private function vscope( $from, $to ) {
		$sql  = '';
		$args = array();
		$cols = self::filter_columns();
		$e    = OM_Insights::events_table();
		$acts = array(
			'page'   => array( 'pageview', 'page' ),
			'item'   => array( 'view', 'item' ),
			'search' => array( 'search', 'label' ),
		);
		foreach ( $this->filters as $key => $value ) {
			if ( isset( $cols[ $key ] ) ) {
				$sql   .= " AND {$cols[ $key ]} = %s";
				$args[] = $value;
			} elseif ( 'kind' === $key ) {
				$sql .= 'new' === $value ? ' AND is_new = 1' : ' AND is_new = 0';
			} elseif ( 'lead' === $key ) {
				$sql .= ' AND leads > 0';
			} elseif ( isset( $acts[ $key ] ) ) {
				$sql .= " AND sid IN (SELECT sid FROM {$e} WHERE day BETWEEN %s AND %s AND type = '{$acts[ $key ][0]}' AND {$acts[ $key ][1]} = %s)";
				array_push( $args, $from, $to, $value );
			}
		}
		return array( $sql, $args );
	}

	/** The filters for queries on the actions table (only the matching visits' actions). */
	private function escope( $from, $to, $alias = '' ) {
		if ( ! $this->filters ) {
			return array( '', array() );
		}
		list( $sql, $args ) = $this->vscope( $from, $to );
		$col = '' !== $alias ? $alias . '.sid' : 'sid';
		return array( " AND {$col} IN (SELECT sid FROM " . OM_Insights::sessions_table() . " WHERE day BETWEEN %s AND %s{$sql})", array_merge( array( $from, $to ), $args ) );
	}

	/** Headline numbers for a period. */
	public function kpis( $from, $to ) {
		$s = OM_Insights::sessions_table();
		$e = OM_Insights::events_table();
		list( $vs, $va ) = $this->vscope( $from, $to );
		list( $es, $ea ) = $this->escope( $from, $to );
		$v = self::row(
			"SELECT COUNT(*) AS visits, COUNT(DISTINCT vid) AS visitors, COALESCE(SUM(pages), 0) AS pages, COALESCE(AVG(engaged), 0) AS engaged,
				COALESCE(SUM(products), 0) AS products, COALESCE(SUM(saves), 0) AS saves,
				SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted, SUM(is_new) AS new_visitors,
				SUM(CASE WHEN pages <= 1 AND engaged < 10 AND leads = 0 AND products = 0 THEN 1 ELSE 0 END) AS quick
			FROM {$s} WHERE day BETWEEN %s AND %s{$vs}",
			array_merge( array( $from, $to ), $va )
		);
		$a = array();
		foreach ( self::rows( "SELECT type, COUNT(*) AS n FROM {$e} WHERE day BETWEEN %s AND %s AND type IN ('lead','compare','search','call','directions','share'){$es} GROUP BY type", array_merge( array( $from, $to ), $ea ) ) as $r ) {
			$a[ $r['type'] ] = (int) $r['n'];
		}
		$visits = (int) ( $v['visits'] ?? 0 );
		return array(
			'visitors'   => (int) ( $v['visitors'] ?? 0 ),
			'visits'     => $visits,
			'pageviews'  => (int) ( $v['pages'] ?? 0 ),
			'time'       => (float) ( $v['engaged'] ?? 0 ),
			'designs'    => (int) ( $v['products'] ?? 0 ),
			'saves'      => (int) ( $v['saves'] ?? 0 ),
			'leads'      => $a['lead'] ?? 0,
			'conv'       => $visits ? 100 * (int) $v['converted'] / $visits : 0,
			'converted'  => (int) ( $v['converted'] ?? 0 ),
			'new'        => (int) ( $v['new_visitors'] ?? 0 ),
			'quick'      => $visits ? 100 * (int) $v['quick'] / $visits : 0,
			'compares'   => $a['compare'] ?? 0,
			'searches'   => $a['search'] ?? 0,
			'calls'      => $a['call'] ?? 0,
			'directions' => $a['directions'] ?? 0,
			'shares'     => $a['share'] ?? 0,
		);
	}

	/* ---------- The chart ---------- */

	/** Intervals that make sense for the period. */
	public function units() {
		$span = $this->span();
		$out  = array();
		if ( 1 === $span ) {
			$out[] = 'hour';
		}
		if ( $span >= 2 && $span <= 400 ) {
			$out[] = 'day';
		}
		if ( $span >= 14 ) {
			$out[] = 'week';
		}
		if ( $span >= 60 ) {
			$out[] = 'month';
		}
		return $out;
	}

	public function unit() {
		if ( in_array( $this->interval, $this->units(), true ) ) {
			return $this->interval;
		}
		$span = $this->span();
		return 1 === $span ? 'hour' : ( $span <= 92 ? 'day' : ( $span <= 400 ? 'week' : 'month' ) );
	}

	public static function unit_names() {
		return array( 'hour' => __( 'Hours', 'om-catalog' ), 'day' => __( 'Days', 'om-catalog' ), 'week' => __( 'Weeks', 'om-catalog' ), 'month' => __( 'Months', 'om-catalog' ) );
	}

	/** A period cut in buckets: [ first day, last day ] each (24 hours of one day for "hour"). */
	private static function buckets( $from, $to, $unit ) {
		$out = array();
		$t0  = strtotime( $from . ' 12:00:00' );
		$t1  = strtotime( $to . ' 12:00:00' );
		if ( 'hour' === $unit ) {
			for ( $h = 0; $h < 24; $h++ ) {
				$out[] = array( $from, $from );
			}
		} elseif ( 'day' === $unit ) {
			for ( $t = $t0; $t <= $t1; $t += DAY_IN_SECONDS ) {
				$d     = gmdate( 'Y-m-d', $t );
				$out[] = array( $d, $d );
			}
		} elseif ( 'week' === $unit ) {
			for ( $t = $t0; $t <= $t1; $t += 7 * DAY_IN_SECONDS ) {
				$out[] = array( gmdate( 'Y-m-d', $t ), gmdate( 'Y-m-d', min( $t1, $t + 6 * DAY_IN_SECONDS ) ) );
			}
		} else {
			$t = $t0;
			while ( $t <= $t1 && count( $out ) < 120 ) {
				$out[] = array( gmdate( 'Y-m-d', $t ), min( $to, gmdate( 'Y-m-t', $t ) ) );
				$t     = strtotime( gmdate( 'Y-m-01', $t ) . ' 12:00:00 +1 month' );
			}
		}
		return $out;
	}

	/** Every measure per bucket for one period, with names for the axis and the tooltip. */
	private function series_for( $from, $to, $unit ) {
		$s       = OM_Insights::sessions_table();
		$e       = OM_Insights::events_table();
		$buckets = self::buckets( $from, $to, $unit );
		$n       = count( $buckets );
		$zero    = array_fill( 0, $n, 0 );
		$sum     = array( 'visits' => $zero, 'visitors' => $zero, 'pv' => $zero, 'eng' => $zero, 'pr' => $zero, 'sv' => $zero, 'cv' => $zero, 'leads' => $zero );
		$keys    = array();
		$index   = array();
		if ( 'hour' === $unit ) {
			$col = 'hr';
			for ( $h = 0; $h < 24; $h++ ) {
				$index[ (string) $h ] = $h;
			}
		} elseif ( 'day' === $unit ) {
			$col = 'day';
			foreach ( $buckets as $i => $b ) {
				$index[ $b[0] ] = $i;
			}
		} else {
			$col = 'CASE';
			foreach ( $buckets as $i => $b ) {
				$col           .= ' WHEN day <= %s THEN ' . (int) $i;
				$keys[]         = $b[1];
				$index[ (string) $i ] = $i;
			}
			$col .= ' ELSE ' . (int) ( $n - 1 ) . ' END';
		}
		list( $vs, $va ) = $this->vscope( $from, $to );
		list( $es, $ea ) = $this->escope( $from, $to );
		foreach ( self::rows(
			"SELECT {$col} AS b, COUNT(*) AS visits, COUNT(DISTINCT vid) AS visitors, COALESCE(SUM(pages), 0) AS pv, COALESCE(SUM(engaged), 0) AS eng,
				COALESCE(SUM(products), 0) AS pr, COALESCE(SUM(saves), 0) AS sv, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS cv
			FROM {$s} WHERE day BETWEEN %s AND %s{$vs} GROUP BY b",
			array_merge( $keys, array( $from, $to ), $va )
		) as $r ) {
			$i = $index[ (string) $r['b'] ] ?? null;
			if ( null === $i ) {
				continue;
			}
			foreach ( array( 'visits', 'visitors', 'pv', 'eng', 'pr', 'sv', 'cv' ) as $k ) {
				$sum[ $k ][ $i ] = (int) $r[ $k ];
			}
		}
		foreach ( self::rows( "SELECT {$col} AS b, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND day BETWEEN %s AND %s{$es} GROUP BY b", array_merge( $keys, array( $from, $to ), $ea ) ) as $r ) {
			$i = $index[ (string) $r['b'] ] ?? null;
			if ( null !== $i ) {
				$sum['leads'][ $i ] = (int) $r['n'];
			}
		}
		$m = array_fill_keys( array_keys( self::metrics() ), array() );
		for ( $i = 0; $i < $n; $i++ ) {
			$visits           = $sum['visits'][ $i ];
			$m['visitors'][]  = $sum['visitors'][ $i ];
			$m['visits'][]    = $visits;
			$m['pageviews'][] = $sum['pv'][ $i ];
			$m['time'][]      = $visits ? (int) round( $sum['eng'][ $i ] / $visits ) : 0;
			$m['designs'][]   = $sum['pr'][ $i ];
			$m['saves'][]     = $sum['sv'][ $i ];
			$m['leads'][]     = $sum['leads'][ $i ];
			$m['conv'][]      = $visits ? round( 100 * $sum['cv'][ $i ] / $visits, 1 ) : 0;
		}
		$utc    = new DateTimeZone( 'UTC' );
		$labels = array();
		$tips   = array();
		foreach ( $buckets as $i => $b ) {
			$t0 = strtotime( $b[0] . ' 12:00:00' );
			$t1 = strtotime( $b[1] . ' 12:00:00' );
			if ( 'hour' === $unit ) {
				$labels[] = wp_date( 'ga', $i * HOUR_IN_SECONDS, $utc );
				/* translators: 1: day, 2: hour, 3: next hour. */
				$tips[] = sprintf( __( '%1$s, %2$s to %3$s', 'om-catalog' ), wp_date( 'D, M j', $t0 ), wp_date( 'ga', $i * HOUR_IN_SECONDS, $utc ), wp_date( 'ga', ( ( $i + 1 ) % 24 ) * HOUR_IN_SECONDS, $utc ) );
			} elseif ( 'day' === $unit ) {
				$labels[] = wp_date( 'M j', $t0 );
				$tips[]   = wp_date( 'D, M j, Y', $t0 );
			} elseif ( 'week' === $unit ) {
				$labels[] = wp_date( 'M j', $t0 );
				/* translators: 1: first day, 2: last day. */
				$tips[] = sprintf( __( '%1$s to %2$s', 'om-catalog' ), wp_date( 'M j', $t0 ), wp_date( 'M j, Y', $t1 ) );
			} else {
				$labels[] = wp_date( 'M', $t0 ) . ( '01' === gmdate( 'm', $t0 ) || 0 === $i ? ' ' . gmdate( 'Y', $t0 ) : '' );
				$whole    = gmdate( 'd', $t0 ) === '01' && gmdate( 'Y-m-t', $t0 ) === $b[1];
				/* translators: 1: first day, 2: last day. */
				$tips[] = $whole ? wp_date( 'F Y', $t0 ) : sprintf( __( '%1$s to %2$s', 'om-catalog' ), wp_date( 'M j', $t0 ), wp_date( 'M j, Y', $t1 ) );
			}
		}
		return array( 'labels' => $labels, 'tips' => $tips, 'm' => $m );
	}

	/** The chart for this view: both periods, every measure, by $unit. */
	public function chart( $unit ) {
		list( $pf, $pt ) = $this->previous();
		if ( 'hour' === $unit ) {
			$pf = $pt;
		}
		$cur  = $this->series_for( $this->from, $this->to, $unit );
		$prev = $this->series_for( $pf, $pt, $unit );
		$n    = count( $cur['labels'] );
		$m    = array();
		foreach ( $cur['m'] as $key => $values ) {
			$m[ $key ] = array(
				'c' => $values,
				'p' => array_pad( array_slice( $prev['m'][ $key ], 0, $n ), $n, null ),
			);
		}
		$today = wp_date( 'Y-m-d' );
		$cut   = $n;
		if ( 'hour' === $unit && $this->from === $today ) {
			$cut = (int) wp_date( 'G' ) + 1;
		}
		return array(
			'unit'    => $unit,
			'units'   => $this->units(),
			'labels'  => $cur['labels'],
			'tips'    => $cur['tips'],
			'ptips'   => array_pad( array_slice( $prev['tips'], 0, $n ), $n, '' ),
			'cut'     => $cut,
			'partial' => $this->to === $today,
			'm'       => $m,
		);
	}

	/** The chart with the names of its measures (for the script). */
	private static function with_names( $chart ) {
		$names = array();
		$kinds = array();
		foreach ( self::metrics() as $key => $m ) {
			$names[ $key ] = $m[0];
			$kinds[ $key ] = $m[1];
		}
		return $chart + array( 'names' => $names, 'kinds' => $kinds );
	}

	/** The chart for this view by its interval, kept a few minutes (the interval switch). */
	public function chart_data() {
		$unit = $this->unit();
		return self::with_names(
			$this->cached(
				'chart|' . $unit,
				function () use ( $unit ) {
					return $this->chart( $unit );
				}
			)
		);
	}

	/** This week and the week before (the WordPress Dashboard box). */
	public function week_numbers() {
		return $this->cached(
			'week',
			function () {
				list( $pf, $pt ) = $this->previous();
				return array( $this->kpis( $this->from, $this->to ), $this->kpis( $pf, $pt ) );
			}
		);
	}

	/** A sentence for the site's privacy policy. */
	public static function policy_text() {
		$months = OM_Insights::months();
		/* translators: %d: months the data is kept. */
		return sprintf( _n( 'We use our own website analytics to understand how visitors use our site. It stores anonymous IDs in two cookies and records the pages and designs viewed. This information stays on our website, is not shared or sold, and is deleted after %d month.', 'We use our own website analytics to understand how visitors use our site. It stores anonymous IDs in two cookies and records the pages and designs viewed. This information stays on our website, is not shared or sold, and is deleted after %d months.', $months, 'om-catalog' ), $months );
	}

	/* ---------- Lists ---------- */

	/** One column of the visits table, ranked. */
	public function by_visit( $column, $limit = 12, $where = '' ) {
		$allowed = array( 'channel', 'ref_host', 'landing', 'exit_page', 'device', 'browser', 'os', 'country', 'region', 'city', 'tz', 'lang', 'utm_source', 'utm_campaign' );
		if ( ! in_array( $column, $allowed, true ) ) {
			return array();
		}
		$s = OM_Insights::sessions_table();
		list( $vs, $va ) = $this->vscope( $this->from, $this->to );
		return self::rows(
			"SELECT {$column} AS k, COUNT(*) AS visits, COUNT(DISTINCT vid) AS visitors, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted,
				COALESCE(AVG(pages), 0) AS pages, COALESCE(AVG(engaged), 0) AS engaged,
				SUM(CASE WHEN pages <= 1 AND engaged < 10 AND leads = 0 AND products = 0 THEN 1 ELSE 0 END) AS quick
			FROM {$s} WHERE day BETWEEN %s AND %s {$where}{$vs} GROUP BY {$column} ORDER BY visits DESC LIMIT %d",
			array_merge( array( $this->from, $this->to ), $va, array( $limit ) )
		);
	}

	public function campaigns() {
		$s = OM_Insights::sessions_table();
		list( $vs, $va ) = $this->vscope( $this->from, $this->to );
		return self::rows(
			"SELECT utm_source AS src, utm_medium AS med, utm_campaign AS camp, COUNT(*) AS visits, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted, COALESCE(AVG(pages), 0) AS pages
			FROM {$s} WHERE day BETWEEN %s AND %s AND (utm_source <> '' OR utm_campaign <> ''){$vs} GROUP BY utm_source, utm_medium, utm_campaign ORDER BY visits DESC LIMIT 30",
			array_merge( array( $this->from, $this->to ), $va )
		);
	}

	public function heat() {
		$s = OM_Insights::sessions_table();
		list( $vs, $va ) = $this->vscope( $this->from, $this->to );
		$grid = array();
		foreach ( self::rows( "SELECT dow, hr, COUNT(*) AS n FROM {$s} WHERE day BETWEEN %s AND %s{$vs} GROUP BY dow, hr", array_merge( array( $this->from, $this->to ), $va ) ) as $r ) {
			$grid[ (int) $r['dow'] ][ (int) $r['hr'] ] = (int) $r['n'];
		}
		return $grid;
	}

	/** Countries, states and cities (Cloudflare), or time zones when there are none. */
	public function locations( $limit = 15 ) {
		if ( ! $this->by_visit( 'country', 1, "AND country <> ''" ) ) {
			return array( 'tz' => $this->by_visit( 'tz', $limit, "AND tz <> ''" ) );
		}
		return array(
			'city'    => $this->by_visit( 'city', $limit, "AND city <> ''" ),
			'region'  => $this->by_visit( 'region', $limit, "AND region <> ''" ),
			'country' => $this->by_visit( 'country', $limit, "AND country <> ''" ),
		);
	}

	public function pages( $limit = 300 ) {
		$e = OM_Insights::events_table();
		$s = OM_Insights::sessions_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		list( $vs, $va ) = $this->vscope( $this->from, $this->to );
		$rows    = self::rows(
			"SELECT page, COUNT(*) AS views, COUNT(DISTINCT sid) AS visits, COALESCE(AVG(dur), 0) AS dur, COALESCE(AVG(scroll), 0) AS scroll, MAX(label) AS title
			FROM {$e} WHERE type = 'pageview' AND day BETWEEN %s AND %s{$es} GROUP BY page ORDER BY views DESC LIMIT %d",
			array_merge( array( $this->from, $this->to ), $ea, array( $limit ) )
		);
		$entries = array();
		foreach ( self::rows( "SELECT landing AS k, COUNT(*) AS n, SUM(CASE WHEN pages <= 1 AND engaged < 10 AND leads = 0 AND products = 0 THEN 1 ELSE 0 END) AS quick, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted FROM {$s} WHERE day BETWEEN %s AND %s{$vs} GROUP BY landing", array_merge( array( $this->from, $this->to ), $va ) ) as $r ) {
			$entries[ $r['k'] ] = $r;
		}
		$exits = array();
		foreach ( self::rows( "SELECT exit_page AS k, COUNT(*) AS n FROM {$s} WHERE day BETWEEN %s AND %s{$vs} GROUP BY exit_page", array_merge( array( $this->from, $this->to ), $va ) ) as $r ) {
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

	/** Page titles for addresses (lists that keep only the address), seen in the period. */
	public function page_titles( $paths, $from = '', $to = '' ) {
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

	public function products( $limit = 300 ) {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
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
			FROM {$e} WHERE day BETWEEN %s AND %s AND item <> '' AND type IN ('view','save','compare','share','option','lead'){$es}
			GROUP BY item ORDER BY views DESC, saves DESC LIMIT %d",
			array_merge( array( $this->from, $this->to ), $ea, array( $limit ) )
		);
		$time = array();
		foreach ( self::rows( "SELECT item, COALESCE(AVG(dur), 0) AS dur FROM {$e} WHERE type = 'pageview' AND item <> '' AND day BETWEEN %s AND %s{$es} GROUP BY item", array_merge( array( $this->from, $this->to ), $ea ) ) as $r ) {
			$time[ $r['item'] ] = (float) $r['dur'];
		}
		foreach ( $rows as &$r ) {
			$r['dur'] = $time[ $r['item'] ] ?? 0;
		}
		unset( $r );
		return $rows;
	}

	public function lines() {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		return self::rows(
			"SELECT SUBSTR(item, 1, INSTR(item, '|') - 1) AS line, COUNT(*) AS views, COUNT(DISTINCT sid) AS visits
			FROM {$e} WHERE type = 'view' AND item <> '' AND day BETWEEN %s AND %s{$es} GROUP BY line ORDER BY views DESC LIMIT 12",
			array_merge( array( $this->from, $this->to ), $ea )
		);
	}

	public function options() {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		$out = array();
		foreach ( self::rows( "SELECT label, meta, COUNT(*) AS n FROM {$e} WHERE type = 'option' AND day BETWEEN %s AND %s{$es} GROUP BY label, meta ORDER BY n DESC LIMIT 200", array_merge( array( $this->from, $this->to ), $ea ) ) as $r ) {
			$out[ $r['label'] ][ $r['meta'] ] = (int) $r['n'];
		}
		return $out;
	}

	public function compare_groups() {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		return self::rows(
			"SELECT meta AS grp, COUNT(DISTINCT sid) AS visits FROM {$e} WHERE type = 'compare' AND meta <> '' AND day BETWEEN %s AND %s{$es} GROUP BY meta ORDER BY visits DESC LIMIT 12",
			array_merge( array( $this->from, $this->to ), $ea )
		);
	}

	public function reels() {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		return self::rows(
			"SELECT item, SUM(CASE WHEN label = 'view' THEN 1 ELSE 0 END) AS views, SUM(CASE WHEN label = 'tap' THEN 1 ELSE 0 END) AS taps FROM {$e} WHERE type = 'reel' AND day BETWEEN %s AND %s{$es} GROUP BY item ORDER BY views DESC LIMIT 15",
			array_merge( array( $this->from, $this->to ), $ea )
		);
	}

	public function searches( $limit = 60 ) {
		$e = OM_Insights::events_table();
		$s = OM_Insights::sessions_table();
		list( $es, $ea )   = $this->escope( $this->from, $this->to, 'e' );
		list( $es2, $ea2 ) = $this->escope( $this->from, $this->to );
		$top = self::rows(
			"SELECT LOWER(e.label) AS q, COUNT(*) AS n, COUNT(DISTINCT e.sid) AS visits, COUNT(DISTINCT CASE WHEN v.leads > 0 THEN e.sid END) AS converted
			FROM {$e} e LEFT JOIN {$s} v ON v.sid = e.sid WHERE e.type = 'search' AND e.label <> '' AND e.day BETWEEN %s AND %s{$es} GROUP BY q ORDER BY n DESC LIMIT %d",
			array_merge( array( $this->from, $this->to ), $ea, array( $limit ) )
		);
		$zero = self::rows(
			"SELECT LOWER(label) AS q, COUNT(*) AS n FROM {$e} WHERE type = 'search_zero' AND label <> '' AND day BETWEEN %s AND %s{$es2} GROUP BY q ORDER BY n DESC LIMIT %d",
			array_merge( array( $this->from, $this->to ), $ea2, array( max( 10, (int) ( $limit * 2 / 3 ) ) ) )
		);
		$filters = array();
		foreach ( self::rows( "SELECT meta, COUNT(*) AS n FROM {$e} WHERE type IN ('pageview','filter') AND meta <> '' AND day BETWEEN %s AND %s{$es2} GROUP BY meta ORDER BY n DESC LIMIT 500", array_merge( array( $this->from, $this->to ), $ea2 ) ) as $r ) {
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

	/** Every action, by type and label: [ type ][ label ] = [ times, visits ]. */
	public function actions() {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		$out = array();
		foreach ( self::rows(
			"SELECT type, label, COUNT(*) AS n, COUNT(DISTINCT sid) AS visits FROM {$e}
			WHERE day BETWEEN %s AND %s AND type IN ('save','compare','share','option','builder','diamond','designer','hint','assistant','quiz','booking','call','email','directions','outbound','cta','search','filter','view'){$es}
			GROUP BY type, label",
			array_merge( array( $this->from, $this->to ), $ea )
		) as $r ) {
			$out[ $r['type'] ][ $r['label'] ] = array( (int) $r['n'], (int) $r['visits'] );
		}
		return $out;
	}

	public function clicks( $type, $limit = 20 ) {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		return self::rows(
			"SELECT label, meta, COUNT(*) AS n, COUNT(DISTINCT sid) AS visits FROM {$e} WHERE type = %s AND day BETWEEN %s AND %s{$es} GROUP BY label, meta ORDER BY n DESC LIMIT %d",
			array_merge( array( $type, $this->from, $this->to ), $ea, array( $limit ) )
		);
	}

	/**
	 * Visits that reached each step. Each step is part of the one before:
	 * "reached at least this far" for a tool's own screens (someone at step
	 * 3 of the booking window got past step 2), "and then" for the rest.
	 */
	public function funnels() {
		$e    = OM_Insights::events_table();
		$s    = OM_Insights::sessions_table();
		list( $vs, $va ) = $this->vscope( $this->from, $this->to );
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		$args = array( $this->from, $this->to );
		$n    = static function ( $sql, $extra ) use ( $args ) {
			return (int) ( self::row( $sql, array_merge( $args, $extra ) )['n'] ?? 0 );
		};
		$set = static function ( $where ) use ( $e, $args, $es, $ea ) {
			$out = array();
			foreach ( self::rows( "SELECT DISTINCT sid FROM {$e} WHERE day BETWEEN %s AND %s AND {$where}{$es}", array_merge( $args, $ea ) ) as $r ) {
				$out[ $r['sid'] ] = true;
			}
			return $out;
		};
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
		foreach ( self::rows( "SELECT sid FROM {$s} WHERE day BETWEEN %s AND %s AND products > 0{$vs}", array_merge( $args, $va ) ) as $r ) {
			$looked[ $r['sid'] ] = true;
		}
		$shop = $chain(
			array(
				array( __( 'Looked at a design', 'om-catalog' ), $looked ),
				array( __( 'Saved or compared one', 'om-catalog' ), $set( "type IN ('save','compare')" ) ),
				array( __( 'Got in touch', 'om-catalog' ), $set( "type = 'lead'" ) ),
			)
		);
		array_unshift( $shop, array( __( 'Visits', 'om-catalog' ), $n( "SELECT COUNT(*) AS n FROM {$s} WHERE day BETWEEN %s AND %s{$vs}", $va ) ) );
		$count = static function ( $where, $distinct = true ) use ( $e, $n, $es, $ea ) {
			return $n( 'SELECT ' . ( $distinct ? 'COUNT(DISTINCT sid)' : 'COUNT(*)' ) . " AS n FROM {$e} WHERE day BETWEEN %s AND %s AND {$where}{$es}", $ea );
		};
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
				array( __( 'Opened the hint form', 'om-catalog' ), $count( "type = 'hint' AND label = 'open'" ) ),
				array( __( 'Sent a hint', 'om-catalog' ), $count( "type = 'lead' AND label = 'hint'", false ) ),
				array( __( 'Partner opened the hint page', 'om-catalog' ), $count( "type = 'hint' AND label = 'page_view' AND meta = 'recipient'" ) ),
				array( __( 'Partner booked or asked', 'om-catalog' ), $count( "type = 'hint' AND label IN ('page_book','page_ask') AND meta = 'recipient'" ) ),
			),
		);
	}

	public function leads( $limit = 200 ) {
		$e = OM_Insights::events_table();
		$s = OM_Insights::sessions_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to, 'e' );
		$rows = self::rows(
			"SELECT e.ts, e.label AS kind, e.item, e.meta, e.val, e.sid, e.vid, e.page, v.channel, v.ref_host, v.landing, v.visit_no, v.pages, v.engaged, v.lead_name, v.device, v.utm_campaign, v.city
			FROM {$e} e LEFT JOIN {$s} v ON v.sid = e.sid WHERE e.type = 'lead' AND e.day BETWEEN %s AND %s{$es} ORDER BY e.ts DESC LIMIT %d",
			array_merge( array( $this->from, $this->to ), $ea, array( $limit ) )
		);
		// First visit of each lead's visitor (for "days to decide").
		$vids  = array_values( array_unique( array_filter( wp_list_pluck( $rows, 'vid' ) ) ) );
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

	/** Visit filters on the journeys list: key => [ name, condition ]. */
	public static function journey_filters() {
		return array(
			'all'       => array( __( 'All visits', 'om-catalog' ), '' ),
			'leads'     => array( __( 'Became leads', 'om-catalog' ), ' AND leads > 0' ),
			'saved'     => array( __( 'Saved something', 'om-catalog' ), ' AND saves > 0' ),
			'returning' => array( __( 'Returning', 'om-catalog' ), ' AND visit_no > 1' ),
			'long'      => array( __( 'Over 3 minutes', 'om-catalog' ), ' AND engaged >= 180' ),
			'phone'     => array( __( 'On phones', 'om-catalog' ), " AND device = 'phone'" ),
		);
	}

	/** One page of visits, newest first: [ rows, total ]. */
	public function visits( $per = 40 ) {
		$s     = OM_Insights::sessions_table();
		$where = self::journey_filters()[ $this->show ][1];
		list( $vs, $va ) = $this->vscope( $this->from, $this->to );
		$args  = array_merge( array( $this->from, $this->to ), $va );
		$total = (int) ( self::row( "SELECT COUNT(*) AS n FROM {$s} WHERE day BETWEEN %s AND %s{$where}{$vs}", $args )['n'] ?? 0 );
		$rows  = self::rows( "SELECT * FROM {$s} WHERE day BETWEEN %s AND %s{$where}{$vs} ORDER BY started DESC LIMIT %d OFFSET %d", array_merge( $args, array( $per, ( $this->p - 1 ) * $per ) ) );
		return array( $rows, $total );
	}

	/* ---------- Live ---------- */

	public function live_count() {
		$s = OM_Insights::sessions_table();
		return (int) ( self::row( "SELECT COUNT(*) AS n FROM {$s} WHERE last >= %d", array( time() - 5 * MINUTE_IN_SECONDS ) )['n'] ?? 0 );
	}

	public function live_rows() {
		$s = OM_Insights::sessions_table();
		return self::rows( "SELECT sid, vid, started, last, landing, exit_page, channel, ref_host, device, city, region, pages, products, saves, leads, lead_name, lead_type, visit_no FROM {$s} WHERE last >= %d ORDER BY last DESC LIMIT 60", array( time() - 5 * MINUTE_IN_SECONDS ) );
	}

	/** Visits on the site per minute, the last 30 minutes (oldest first). */
	public function live_minutes() {
		$e    = OM_Insights::events_table();
		$now  = (int) floor( time() / 60 );
		$out  = array_fill( 0, 30, array() );
		foreach ( self::rows( "SELECT sid, ts FROM {$e} WHERE ts >= %d LIMIT 20000", array( ( $now - 29 ) * 60 ) ) as $r ) {
			$i = (int) floor( (int) $r['ts'] / 60 ) - ( $now - 29 );
			if ( $i >= 0 && $i < 30 ) {
				$out[ $i ][ $r['sid'] ] = true;
			}
		}
		return array_map( 'count', $out );
	}

	public function live_pages() {
		$e = OM_Insights::events_table();
		return self::rows( "SELECT page, MAX(label) AS title, COUNT(DISTINCT sid) AS n FROM {$e} WHERE type = 'pageview' AND ts >= %d GROUP BY page ORDER BY n DESC LIMIT 8", array( time() - 5 * MINUTE_IN_SECONDS ) );
	}

	/* ---------- One visit, one visitor ---------- */

	public static function visit_row_by_sid( $sid ) {
		return self::row( 'SELECT * FROM ' . OM_Insights::sessions_table() . ' WHERE sid = %s', array( $sid ) );
	}

	public static function visit_events( $sid ) {
		return self::rows( 'SELECT ts, type, page, item, label, meta, val, dur, scroll FROM ' . OM_Insights::events_table() . ' WHERE sid = %s ORDER BY ts, id LIMIT 1000', array( $sid ) );
	}

	public static function visitor_visits( $vid ) {
		return self::rows( 'SELECT * FROM ' . OM_Insights::sessions_table() . ' WHERE vid = %s ORDER BY started DESC LIMIT 100', array( $vid ) );
	}

	/** Totals for the settings tab. */
	public static function totals() {
		global $wpdb;
		$e = OM_Insights::events_table();
		$s = OM_Insights::sessions_table();
		// phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
		return array(
			'events' => (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$e}" ),
			'visits' => (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$s}" ),
			'first'  => (string) $wpdb->get_var( "SELECT MIN(day) FROM {$s}" ),
		);
		// phpcs:enable
	}

	/* ---------------------------------------------------------------
	 * Words and formats
	 * ------------------------------------------------------------- */

	public static function channel_name( $key ) {
		return OM_Insights::channels()[ $key ] ?? ( '' === (string) $key ? __( 'Unknown', 'om-catalog' ) : (string) $key );
	}

	public static function channel_icon( $key ) {
		$icons = array( 'search' => 'search', 'maps' => 'pin', 'direct' => 'direct', 'social' => 'social', 'ads' => 'ads', 'email' => 'mail', 'ai' => 'sparkle', 'referral' => 'link', 'campaign' => 'tag' );
		return $icons[ $key ] ?? 'globe';
	}

	public static function device_name( $key ) {
		$names = array( 'phone' => __( 'Phones', 'om-catalog' ), 'tablet' => __( 'Tablets', 'om-catalog' ), 'desktop' => __( 'Computers', 'om-catalog' ) );
		return $names[ $key ] ?? __( 'Unknown', 'om-catalog' );
	}

	public static function device_one( $key ) {
		$names = array( 'phone' => __( 'Phone', 'om-catalog' ), 'tablet' => __( 'Tablet', 'om-catalog' ), 'desktop' => __( 'Computer', 'om-catalog' ) );
		return $names[ $key ] ?? __( 'Unknown', 'om-catalog' );
	}

	public static function device_icon( $key ) {
		return in_array( $key, array( 'phone', 'tablet', 'desktop' ), true ) ? $key : 'help';
	}

	public static function title( $title, $path ) {
		return OM_Insights::page_name( $title, $path );
	}

	public static function duration( $seconds ) {
		return OM_Insights::duration( $seconds );
	}

	public static function design( $key, $title = '' ) {
		return OM_Insights::design( $key, $title );
	}

	public static function pct( $n, $of, $digits = 1 ) {
		return $of > 0 ? number_format_i18n( 100 * $n / $of, $digits ) . '%' : '–';
	}

	/** 980, 1.2K, 12K, 1.4M. */
	public static function compact( $n ) {
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

	public static function format_metric( $key, $value ) {
		$kind = self::metrics()[ $key ][1] ?? 'n';
		if ( 't' === $kind ) {
			return self::duration( $value );
		}
		if ( 'p' === $kind ) {
			return number_format_i18n( (float) $value, 1 ) . '%';
		}
		return number_format_i18n( (float) $value );
	}

	public static function visitor_label( $vid, $name = '' ) {
		if ( '' !== trim( (string) $name ) ) {
			return (string) $name;
		}
		/* translators: %s: short anonymous visitor code. */
		return sprintf( __( 'Visitor %s', 'om-catalog' ), strtoupper( substr( (string) $vid, 0, 4 ) ) );
	}

	/** Two letters for a named visitor's avatar. */
	private static function initials( $name ) {
		$name = trim( preg_replace( '/[^\p{L}\p{N}\s]/u', ' ', (string) $name ) );
		if ( '' === $name || false !== strpos( $name, '@' ) ) {
			return '';
		}
		$parts = preg_split( '/\s+/', $name );
		$first = function_exists( 'mb_substr' ) ? mb_substr( $parts[0], 0, 1 ) : substr( $parts[0], 0, 1 );
		$last  = count( $parts ) > 1 ? ( function_exists( 'mb_substr' ) ? mb_substr( end( $parts ), 0, 1 ) : substr( end( $parts ), 0, 1 ) ) : '';
		return function_exists( 'mb_strtoupper' ) ? mb_strtoupper( $first . $last ) : strtoupper( $first . $last );
	}

	private static function avatar( $vid, $name ) {
		$letters = self::initials( $name );
		return '<span class="om-ins-avatar' . ( '' !== $letters ? ' named' : '' ) . '" aria-hidden="true">' . ( '' !== $letters ? esc_html( $letters ) : self::icon( 'user' ) ) . '</span>';
	}

	/** "3 hours ago" for the last day, then the date. */
	private static function when( $ts ) {
		$ts = (int) $ts;
		if ( time() - $ts < DAY_IN_SECONDS ) {
			/* translators: %s: time, e.g. "3 hours". */
			return sprintf( __( '%s ago', 'om-catalog' ), human_time_diff( $ts, time() ) );
		}
		return wp_date( gmdate( 'Y' ) === wp_date( 'Y', $ts ) ? 'M j, g:i a' : 'M j, Y', $ts );
	}

	/** A US phone number as people write it; anything else as recorded. */
	public static function phone( $raw ) {
		$digits = preg_replace( '/\D/', '', (string) $raw );
		if ( 11 === strlen( $digits ) && '1' === $digits[0] ) {
			$digits = substr( $digits, 1 );
		}
		if ( 10 === strlen( $digits ) ) {
			return '(' . substr( $digits, 0, 3 ) . ') ' . substr( $digits, 3, 3 ) . '-' . substr( $digits, 6 );
		}
		return '' !== trim( (string) $raw ) ? (string) $raw : __( 'Not recorded', 'om-catalog' );
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

	/** A catalog filter value in words ("popular" sort, "hidden-halo" style, "3000" price). */
	public static function filter_value( $key, $value ) {
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
		return ucwords( str_replace( array( '-', '_' ), ' ', (string) $value ) );
	}

	/** A page's search and filters ("q=oval&shape=pear") in words. */
	public static function meta_words( $meta ) {
		$names = array( 'q' => __( 'Search', 'om-catalog' ), 'shape' => __( 'Shape', 'om-catalog' ), 'metal' => __( 'Metal', 'om-catalog' ), 'color' => __( 'Gold colour', 'om-catalog' ), 'style' => __( 'Style', 'om-catalog' ), 'line' => __( 'Line', 'om-catalog' ), 'upto' => __( 'Price', 'om-catalog' ), 'sort' => __( 'Sorted by', 'om-catalog' ), 'size' => __( 'Ring size', 'om-catalog' ) );
		$out   = array();
		foreach ( explode( '&', (string) $meta ) as $pair ) {
			$kv = explode( '=', $pair, 2 );
			if ( 2 !== count( $kv ) || '' === $kv[1] ) {
				continue;
			}
			$out[] = ( $names[ $kv[0] ] ?? $kv[0] ) . ': ' . ( 'q' === $kv[0] ? '"' . $kv[1] . '"' : self::filter_value( $kv[0], $kv[1] ) );
		}
		return implode( ' · ', $out );
	}

	/** What one action was, in words (journeys and the actions tab). */
	public static function action_words( $type, $label, $meta = '', $val = 0 ) {
		$label = (string) $label;
		$names = array(
			'assistant' => array( 'open' => __( 'Opened the jeweller assistant', 'om-catalog' ), 'message' => __( 'Asked the assistant a question', 'om-catalog' ), 'starter' => __( 'Saw the assistant\'s starter question', 'om-catalog' ) ),
			'hint'      => array( 'open' => __( 'Opened the "Drop a hint" form', 'om-catalog' ), 'sent' => __( 'Sent a hint', 'om-catalog' ), 'page_view' => __( 'Opened a hint page', 'om-catalog' ), 'page_book' => __( 'Tapped Book a viewing on a hint page', 'om-catalog' ), 'page_ask' => __( 'Tapped Ask about it on a hint page', 'om-catalog' ) ),
			'quiz'      => array( 'start' => __( 'Started the ring style quiz', 'om-catalog' ), 'step' => __( 'Answered a quiz question', 'om-catalog' ), 'complete' => __( 'Finished the quiz', 'om-catalog' ), 'email_open' => __( 'Opened "Email me my matches"', 'om-catalog' ) ),
			'booking'   => array( 'open' => __( 'Opened the booking window', 'om-catalog' ), 'step' => __( 'Went on in the booking window', 'om-catalog' ), 'request' => __( 'Sent a visit request', 'om-catalog' ) ),
			'diamond'   => array( 'guide' => __( 'Used "Help me choose" (diamonds)', 'om-catalog' ), 'guide_pick' => __( 'Picked a suggested diamond', 'om-catalog' ), 'compare_add' => __( 'Added a diamond to compare', 'om-catalog' ), 'compare_view' => __( 'Opened the diamond comparison', 'om-catalog' ), 'true_size' => __( 'Opened the true size viewer', 'om-catalog' ) ),
			'designer'  => array( 'open' => __( 'Opened the ring designer', 'om-catalog' ) ),
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

	/** A filter's value in words (for the chips above the dashboard). */
	public function filter_text( $key, $value ) {
		switch ( $key ) {
			case 'channel':
				return self::channel_name( $value );
			case 'device':
				return self::device_one( $value );
			case 'kind':
				return 'new' === $value ? __( 'First visit', 'om-catalog' ) : __( 'Returning', 'om-catalog' );
			case 'lead':
				return __( 'Became a lead', 'om-catalog' );
			case 'item':
				return self::design( $value )['title'];
			case 'search':
				return '"' . $value . '"';
			case 'page':
			case 'landing':
			case 'exit':
				return self::title( $this->page_titles( array( $value ), wp_date( 'Y-m-d', time() - 400 * DAY_IN_SECONDS ), wp_date( 'Y-m-d' ) )[ $value ] ?? '', $value );
		}
		return (string) $value;
	}

	/** Small line icons (24px grid, drawn with the text colour). */
	public static function icon( $name, $class = '' ) {
		$paths = array(
			'overview' => '<rect x="3.5" y="3.5" width="7" height="8" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="5" rx="1.5"/><rect x="13.5" y="11.5" width="7" height="9" rx="1.5"/><rect x="3.5" y="14.5" width="7" height="6" rx="1.5"/>',
			'sources'  => '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
			'pages'    => '<path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4M9.5 12.5h5M9.5 16h5"/>',
			'designs'  => '<path d="M7 4.5h10l3.5 5L12 20 3.5 9.5z"/><path d="M3.5 9.5h17M12 20 9 9.5l1.6-5M12 20l3-10.5-1.6-5"/>',
			'search'   => '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
			'actions'  => '<path d="m5.5 3.5 13 7.4-5.6 1.6-2.4 5.4z"/><path d="m13 12.6 4.6 5.9"/>',
			'funnel'   => '<path d="M3.5 4.5h17l-6.5 7.5v6l-4 2v-8z"/>',
			'journeys' => '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18h6.5a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
			'leads'    => '<path d="M4 13.5 6.5 5h11l2.5 8.5V19H4z"/><path d="M4 13.5h4.5l1.5 2.5h4l1.5-2.5H20"/>',
			'live'     => '<path d="M3 12h4l3-7.5 4 15 3-7.5h4"/>',
			'settings' => '<path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17" r="2"/>',
			'calendar' => '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
			'chevron'  => '<path d="m6.5 9.5 5.5 5.5 5.5-5.5"/>',
			'refresh'  => '<path d="M19.5 11.5a7.5 7.5 0 1 0-2.2 5.3"/><path d="M19.5 4.5v7h-7"/>',
			'x'        => '<path d="m6.5 6.5 11 11M17.5 6.5l-11 11"/>',
			'external' => '<path d="M14 4h6v6M20 4l-8.5 8.5"/><path d="M18 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5.5"/>',
			'direct'   => '<path d="M7 17 17 7M9 7h8v8"/>',
			'social'   => '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c0-3.2 2.5-5.6 5.5-5.6s5.5 2.4 5.5 5.6"/><path d="M15.5 5.3a3.2 3.2 0 0 1 0 6.4M17.5 14.2c1.8.7 3 2.6 3 5.3"/>',
			'pin'      => '<path d="M12 20.5s-6.5-5.8-6.5-10.8a6.5 6.5 0 0 1 13 0c0 5-6.5 10.8-6.5 10.8z"/><circle cx="12" cy="9.7" r="2.3"/>',
			'ads'      => '<path d="M4 10v4h3l7 4.5v-13L7 10z"/><path d="M17 9a4 4 0 0 1 0 6"/>',
			'mail'     => '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>',
			'sparkle'  => '<path d="m12 3.5 1.7 5 5 1.7-5 1.7-1.7 5-1.7-5-5-1.7 5-1.7z"/><path d="m18.5 15.5.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z"/>',
			'link'     => '<path d="M10 14a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-.8.8"/><path d="M14 10a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l.8-.8"/>',
			'tag'      => '<path d="M3.5 12V3.5H12l8.5 8.5-8.5 8.5z"/><circle cx="8" cy="8" r="1.4"/>',
			'globe'    => '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.6 3.6 5.4 3.6 8.5s-1.2 5.9-3.6 8.5c-2.4-2.6-3.6-5.4-3.6-8.5S9.6 6.1 12 3.5z"/>',
			'phone'    => '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.3h2"/>',
			'desktop'  => '<rect x="3" y="4.5" width="18" height="11.5" rx="1.5"/><path d="M8.5 20h7M12 16v4"/>',
			'tablet'   => '<rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M11 18h2"/>',
			'help'     => '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.5M12 16.8v.1"/>',
			'heart'    => '<path d="M12 19.5s-7-4.3-8.4-8.6C2.6 7.6 4.7 5 7.5 5c1.8 0 3.3 1 4.5 2.6C13.2 6 14.7 5 16.5 5c2.8 0 4.9 2.6 3.9 5.9C19 15.2 12 19.5 12 19.5z"/>',
			'check'    => '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
			'download' => '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15"/>',
			'trash'    => '<path d="M4.5 7h15M10 11v6M14 11v6M6.5 7l.9 12.5h9.2L17.5 7M9.5 7V4.5h5V7"/>',
			'copy'     => '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2"/><path d="M15.5 8.5V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9.5a1 1 0 0 0 1 1h3.5"/>',
			'clock'    => '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
			'user'     => '<circle cx="12" cy="8.5" r="3.7"/><path d="M4.5 20c0-4 3.4-6.8 7.5-6.8s7.5 2.8 7.5 6.8"/>',
			'arrow'    => '<path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5"/>',
			'eye'      => '<path d="M2.8 12S6.2 5.8 12 5.8 21.2 12 21.2 12 17.8 18.2 12 18.2 2.8 12 2.8 12z"/><circle cx="12" cy="12" r="2.8"/>',
			'logo'     => '<path d="M5 20v-6M10 20V8M15 20v-9M20 20V4"/>',
			'info'     => '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.1"/>',
		);
		$path = $paths[ $name ] ?? $paths['help'];
		return '<svg class="om-ins-i' . ( '' !== $class ? ' ' . esc_attr( $class ) : '' ) . '" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' . $path . '</svg>';
	}

	/* ---------------------------------------------------------------
	 * Pieces of the page
	 * ------------------------------------------------------------- */

	/** The section links. */
	public function nav() {
		$out = '<nav class="om-ins-nav" aria-label="' . esc_attr__( 'Insights sections', 'om-catalog' ) . '"><div class="om-ins-nav-in">';
		foreach ( self::tabs() as $key => $name ) {
			$here = $key === $this->tab && ! $this->visit && ! $this->visitor;
			$out .= '<a href="' . esc_url( $this->url( array( 'tab' => $key, 'p' => null, 'show' => null, 'visit' => null, 'visitor' => null ) ) ) . '" data-om-ins-nav data-om-ins-tab="' . esc_attr( $key ) . '"' . ( $here ? ' aria-current="page"' : '' ) . '>' . self::icon( self::tab_icons()[ $key ] ) . '<span>' . esc_html( $name ) . '</span></a>';
		}
		return $out . '</div></nav>';
	}

	/** The period menu: presets as rows, a custom range below. */
	public function picker() {
		$out  = '<div class="om-ins-picker" data-om-ins-picker>';
		$out .= '<button type="button" class="om-ins-btn om-ins-picker-btn" aria-haspopup="true" aria-expanded="false" data-om-ins-picker-btn>' . self::icon( 'calendar' ) . '<span>' . esc_html( $this->range_name() ) . '</span>' . self::icon( 'chevron', 'om-ins-caret' ) . '</button>';
		$out .= '<div class="om-ins-pop" data-om-ins-pop hidden><ul class="om-ins-presets" role="list">';
		$keys = self::preset_keys();
		foreach ( self::presets() as $key => $name ) {
			$out .= '<li><a href="' . esc_url( $this->url( array( 'range' => $key, 'from' => null, 'to' => null, 'p' => null, 'interval' => null ) ) ) . '" data-om-ins-nav data-om-ins-range="' . esc_attr( $key ) . '"' . ( $key === $this->range ? ' aria-current="true"' : '' ) . '>' . self::icon( 'check', 'om-ins-tick' ) . '<span>' . esc_html( $name ) . '</span>' . ( isset( $keys[ $key ] ) ? '<kbd>' . esc_html( $keys[ $key ] ) . '</kbd>' : '' ) . '</a></li>';
		}
		$out .= '</ul><form class="om-ins-custom" method="get" action="' . esc_url( admin_url( 'admin.php' ) ) . '" data-om-ins-custom>';
		$out .= '<input type="hidden" name="page" value="' . esc_attr( OM_Insights_Admin::SLUG ) . '" /><input type="hidden" name="tab" value="' . esc_attr( $this->tab ) . '" /><input type="hidden" name="range" value="custom" />';
		foreach ( $this->filters as $key => $value ) {
			$out .= '<input type="hidden" name="f[' . esc_attr( $key ) . ']" value="' . esc_attr( $value ) . '" />';
		}
		$max  = wp_date( 'Y-m-d' );
		$out .= '<p class="om-ins-custom-t">' . esc_html__( 'Custom dates', 'om-catalog' ) . '</p><div class="om-ins-custom-row"><label><span class="screen-reader-text">' . esc_html__( 'From', 'om-catalog' ) . '</span><input type="date" name="from" value="' . esc_attr( $this->from ) . '" max="' . esc_attr( $max ) . '" required /></label><span aria-hidden="true">–</span><label><span class="screen-reader-text">' . esc_html__( 'To', 'om-catalog' ) . '</span><input type="date" name="to" value="' . esc_attr( $this->to ) . '" max="' . esc_attr( $max ) . '" required /></label></div>';
		$out .= '<button type="submit" class="om-ins-btn primary">' . esc_html__( 'Show these dates', 'om-catalog' ) . '</button></form></div></div>';
		return $out;
	}

	/** The filters in use, each removable. */
	public function chips() {
		if ( ! $this->filters ) {
			return '';
		}
		$out = '<div class="om-ins-chips" role="group" aria-label="' . esc_attr__( 'Filters in use', 'om-catalog' ) . '">' . self::icon( 'funnel', 'om-ins-chips-i' );
		foreach ( $this->filters as $key => $value ) {
			$text = $this->filter_text( $key, $value );
			$out .= '<span class="om-ins-chip"><span class="om-ins-chip-k">' . esc_html( self::filter_names()[ $key ] ) . '</span><b>' . esc_html( $text ) . '</b><a href="' . esc_url( $this->filter_url( $key, null ) ) . '" data-om-ins-nav aria-label="' . esc_attr( sprintf( /* translators: %s: filter. */ __( 'Remove the filter %s', 'om-catalog' ), $text ) ) . '">' . self::icon( 'x' ) . '</a></span>';
		}
		if ( count( $this->filters ) > 1 ) {
			$out .= '<a class="om-ins-chip-clear" href="' . esc_url( $this->url( array( 'f' => null, 'p' => null ) ) ) . '" data-om-ins-nav>' . esc_html__( 'Clear all', 'om-catalog' ) . '</a>';
		}
		return $out . '</div>';
	}

	/** Whether the period and filters apply to this view. */
	public function scoped() {
		return ! in_array( $this->tab, array( 'live', 'settings' ), true ) || $this->visit || $this->visitor;
	}

	/** A card with a head (title, a line under it, something on the right) and a body. */
	private static function card( $title, $body, $args = array() ) {
		$args = array_merge( array( 'sub' => '', 'aside' => '', 'class' => '', 'more' => null ), $args );
		$out  = '<section class="om-ins-card ' . esc_attr( $args['class'] ) . '">';
		if ( '' !== $title || '' !== $args['aside'] ) {
			$out .= '<header class="om-ins-cardhead"><div><h2>' . esc_html( $title ) . '</h2>' . ( '' !== $args['sub'] ? '<p class="om-ins-sub">' . esc_html( $args['sub'] ) . '</p>' : '' ) . '</div>' . $args['aside'] . '</header>';
		}
		$out .= $body;
		if ( $args['more'] ) {
			$out .= '<footer class="om-ins-cardfoot"><a href="' . esc_url( $args['more'][0] ) . '" data-om-ins-nav>' . esc_html( $args['more'][1] ) . self::icon( 'arrow' ) . '</a></footer>';
		}
		return $out . '</section>';
	}

	private static function empty_note( $text ) {
		return '<p class="om-ins-empty">' . esc_html( $text ) . '</p>';
	}

	/** Change against the period before: ▲ 12% (good) / ▼ 8% (bad). */
	private static function delta( $now, $before, $up_is_good = true ) {
		if ( $before > 0 ) {
			$pct = (int) round( 100 * ( $now - $before ) / $before );
			if ( 0 === $pct ) {
				return '<span class="om-ins-delta">0%<span class="screen-reader-text"> ' . esc_html__( 'change from the period before', 'om-catalog' ) . '</span></span>';
			}
			$good = ( $pct > 0 ) === $up_is_good;
			return '<span class="om-ins-delta ' . ( $good ? 'up' : 'down' ) . '"><span aria-hidden="true">' . ( $pct > 0 ? '&#9650;' : '&#9660;' ) . '</span> ' . esc_html( number_format_i18n( abs( $pct ) ) . '%' ) . '<span class="screen-reader-text"> ' . esc_html( $pct > 0 ? __( 'more than the period before', 'om-catalog' ) : __( 'less than the period before', 'om-catalog' ) ) . '</span></span>';
		}
		if ( $now > 0 ) {
			return '<span class="om-ins-delta">' . esc_html__( 'New', 'om-catalog' ) . '</span>';
		}
		return '<span class="om-ins-delta">&ndash;</span>';
	}

	/** The headline numbers; each one picks what the chart shows. */
	private function kpi_row( $k, $b ) {
		$hints = array(
			'visitors' => __( 'Different people (each browser counts once).', 'om-catalog' ),
			'time'     => __( 'Average time actively on the site, screen on and in use.', 'om-catalog' ),
			'designs'  => __( 'Product pages and quick views opened.', 'om-catalog' ),
			'leads'    => __( 'Visit requests, inquiries, hints and emails sent from the site.', 'om-catalog' ),
			'conv'     => __( 'Share of visits that became a lead.', 'om-catalog' ),
		);
		$out = '<div class="om-ins-kpis" role="tablist" aria-label="' . esc_attr__( 'Choose what the chart shows', 'om-catalog' ) . '">';
		$i   = 0;
		foreach ( self::metrics() as $key => $m ) {
			$out .= '<button type="button" role="tab" class="om-ins-kpi" id="om-ins-kpi-' . esc_attr( $key ) . '" data-om-ins-metric="' . esc_attr( $key ) . '" aria-controls="om-ins-chart" aria-selected="' . ( 0 === $i ? 'true' : 'false' ) . '" tabindex="' . ( 0 === $i ? '0' : '-1' ) . '"' . ( isset( $hints[ $key ] ) ? ' title="' . esc_attr( $hints[ $key ] ) . '"' : '' ) . '>'
				. '<span class="om-ins-kpi-l">' . esc_html( $m[0] ) . '</span>'
				. '<span class="om-ins-kpi-v">' . esc_html( self::format_metric( $key, $k[ $key ] ) ) . '</span>'
				. self::delta( $k[ $key ], $b[ $key ] )
				. '<span class="om-ins-spark" data-om-ins-spark="' . esc_attr( $key ) . '" aria-hidden="true"></span>'
				. '</button>';
			$i++;
		}
		return $out . '</div>';
	}

	/** The time chart: drawn in the browser from its data; the same numbers as a table. */
	private function chart_card( $chart ) {
		$data  = self::with_names( $chart );
		$names = $data['names'];
		$units = '';
		if ( count( $chart['units'] ) > 1 ) {
			$units = '<div class="om-ins-seg" role="group" aria-label="' . esc_attr__( 'Show by', 'om-catalog' ) . '">';
			foreach ( $chart['units'] as $unit ) {
				$units .= '<a href="' . esc_url( $this->url( array( 'interval' => $unit ) ) ) . '" data-om-ins-interval="' . esc_attr( $unit ) . '"' . ( $unit === $chart['unit'] ? ' aria-current="true"' : '' ) . '>' . esc_html( self::unit_names()[ $unit ] ) . '</a>';
			}
			$units .= '</div>';
		}
		$out  = '<section class="om-ins-card om-ins-chartcard" data-om-ins-chartcard>';
		$out .= '<header class="om-ins-cardhead"><div><h2 data-om-ins-chart-title>' . esc_html( $names['visitors'] ) . '</h2><p class="om-ins-sub">' . esc_html( $this->period_text() ) . '</p></div>';
		$out .= '<div class="om-ins-chart-tools"><div class="om-ins-legend" data-om-ins-legend><span><i class="om-ins-key cur" aria-hidden="true"></i>' . esc_html__( 'This period', 'om-catalog' ) . '</span><span data-om-ins-legend-prev><i class="om-ins-key prev" aria-hidden="true"></i>' . esc_html__( 'Period before', 'om-catalog' ) . '</span></div>' . $units . '</div></header>';
		$out .= '<div class="om-ins-plot" id="om-ins-chart" role="tabpanel" data-om-ins-plot></div>';
		$out .= '<details class="om-ins-data"><summary>' . esc_html__( 'Show as table', 'om-catalog' ) . '</summary><div data-om-ins-table>' . self::chart_table( $chart ) . '</div></details>';
		$out .= '<script type="application/json" data-om-ins-json>' . wp_json_encode( $data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . '</script>';
		return $out . '</section>';
	}

	/** The chart's numbers, as a table (also built by the script when the interval changes). */
	private static function chart_table( $chart ) {
		$cols = array( 'visitors', 'visits', 'pageviews', 'leads', 'conv' );
		$out  = '<div class="om-ins-scroll"><table class="om-ins-table"><thead><tr><th scope="col">' . esc_html__( 'Period', 'om-catalog' ) . '</th>';
		foreach ( $cols as $key ) {
			$out .= '<th scope="col" class="num">' . esc_html( self::metrics()[ $key ][0] ) . '</th>';
		}
		$out .= '</tr></thead><tbody>';
		$n = min( count( $chart['labels'] ), (int) $chart['cut'] );
		for ( $i = $n - 1; $i >= 0; $i-- ) {
			$out .= '<tr><th scope="row">' . esc_html( $chart['tips'][ $i ] ) . '</th>';
			foreach ( $cols as $key ) {
				$out .= '<td class="num">' . esc_html( self::format_metric( $key, $chart['m'][ $key ]['c'][ $i ] ) ) . '</td>';
			}
			$out .= '</tr>';
		}
		return $out . '</tbody></table></div>';
	}

	/**
	 * Ranked rows, a bar behind each, value at the end. A row with a filter
	 * narrows the whole dashboard to it.
	 *
	 * @param array $rows [ label, sub, value, show, share, tip, filter [ key, value ], ext, icon, img ].
	 */
	private function rows_list( $rows, $empty ) {
		if ( ! $rows ) {
			return self::empty_note( $empty );
		}
		$max = 0;
		foreach ( $rows as $r ) {
			$max = max( $max, (float) $r['value'] );
		}
		$max = max( 1, $max );
		$out = '<ol class="om-ins-list">';
		foreach ( $rows as $r ) {
			$r      = array_merge( array( 'sub' => '', 'share' => null, 'tip' => '', 'filter' => null, 'ext' => '', 'icon' => '', 'img' => '' ), $r );
			$visual = '';
			if ( '' !== $r['img'] ) {
				$visual = '<img class="om-ins-thumb" src="' . esc_url( $r['img'] ) . '" alt="" width="26" height="26" loading="lazy" />';
			} elseif ( '' !== $r['icon'] ) {
				$visual = self::icon( $r['icon'], 'om-ins-row-ic' );
			}
			$label = $visual . '<span class="om-ins-row-t">' . esc_html( $r['label'] ) . ( '' !== $r['sub'] ? '<small>' . esc_html( $r['sub'] ) . '</small>' : '' ) . '</span>';
			if ( $r['filter'] ) {
				/* translators: 1: what (e.g. source), 2: value. */
				$name = '<a class="om-ins-row-name" href="' . esc_url( $this->filter_url( $r['filter'][0], $r['filter'][1] ) ) . '" data-om-ins-nav title="' . esc_attr( sprintf( __( 'Show only visits with %1$s: %2$s', 'om-catalog' ), strtolower( self::filter_names()[ $r['filter'][0] ] ), $r['label'] ) ) . '">' . $label . '</a>';
			} else {
				$name = '<span class="om-ins-row-name">' . $label . '</span>';
			}
			$ext   = '' !== $r['ext'] ? '<a class="om-ins-row-ext" href="' . esc_url( $r['ext'] ) . '" target="_blank" rel="noopener" title="' . esc_attr__( 'Open on the site', 'om-catalog' ) . '"><span class="screen-reader-text">' . esc_html( sprintf( /* translators: %s: page or design. */ __( 'Open %s on the site', 'om-catalog' ), $r['label'] ) ) . '</span>' . self::icon( 'external' ) . '</a>' : '';
			$share = null !== $r['share'] ? '<small>' . esc_html( self::pct( $r['share'], 1, 0 ) ) . '</small>' : '';
			$value = '<span class="om-ins-row-v"' . ( '' !== $r['tip'] ? ' tabindex="0" data-tip="' . esc_attr( $r['tip'] ) . '"' : '' ) . '>' . esc_html( $r['show'] ) . $share . '</span>';
			$out  .= '<li class="om-ins-row" style="--w:' . esc_attr( round( 100 * (float) $r['value'] / $max, 2 ) ) . '%">' . $name . $ext . $value . '</li>';
		}
		return $out . '</ol>';
	}

	/**
	 * A card of ranked lists under small tabs (switched in the browser).
	 *
	 * @param array $tabs [ [ label, head [ name, value ], rows, empty ] ].
	 */
	private function panel( $id, $title, $tabs, $more = null, $sub = '' ) {
		$out = '<section class="om-ins-card om-ins-panel" data-om-ins-panel="' . esc_attr( $id ) . '"><header class="om-ins-cardhead"><div><h2>' . esc_html( $title ) . '</h2>' . ( '' !== $sub ? '<p class="om-ins-sub">' . esc_html( $sub ) . '</p>' : '' ) . '</div>';
		if ( count( $tabs ) > 1 ) {
			$out .= '<div class="om-ins-subtabs" role="tablist" aria-label="' . esc_attr( $title ) . '">';
			foreach ( array_values( $tabs ) as $i => $t ) {
				$out .= '<button type="button" role="tab" id="' . esc_attr( "om-ins-{$id}-t{$i}" ) . '" aria-controls="' . esc_attr( "om-ins-{$id}-p{$i}" ) . '" aria-selected="' . ( 0 === $i ? 'true' : 'false' ) . '" tabindex="' . ( 0 === $i ? '0' : '-1' ) . '">' . esc_html( $t['label'] ) . '</button>';
			}
			$out .= '</div>';
		}
		$out .= '</header>';
		foreach ( array_values( $tabs ) as $i => $t ) {
			$multi = count( $tabs ) > 1;
			$out  .= '<div class="om-ins-tabpanel"' . ( $multi ? ' id="' . esc_attr( "om-ins-{$id}-p{$i}" ) . '" role="tabpanel" aria-labelledby="' . esc_attr( "om-ins-{$id}-t{$i}" ) . '"' : '' ) . ( $i ? ' hidden' : '' ) . '>';
			if ( $t['rows'] ) {
				$out .= '<div class="om-ins-colhead" aria-hidden="true"><span>' . esc_html( $t['head'][0] ) . '</span><span>' . esc_html( $t['head'][1] ) . '</span></div>';
			}
			$out .= $this->rows_list( $t['rows'], $t['empty'] ) . '</div>';
		}
		if ( $more ) {
			$out .= '<footer class="om-ins-cardfoot"><a href="' . esc_url( $more[0] ) . '" data-om-ins-nav>' . esc_html( $more[1] ) . self::icon( 'arrow' ) . '</a></footer>';
		}
		return $out . '</section>';
	}

	/**
	 * A sortable table; cells are pre-escaped HTML, number cells ( [ shown,
	 * value ] ) align right. Past $cap rows the rest wait behind "Show all".
	 */
	private static function table( $heads, $rows, $empty, $class = '', $cap = 0 ) {
		if ( ! $rows ) {
			return self::empty_note( $empty );
		}
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
			$out .= '<p class="om-ins-showall" hidden><button type="button" class="om-ins-btn" data-om-ins-showall>' . esc_html( sprintf( __( 'Show all %s', 'om-catalog' ), number_format_i18n( count( $rows ) ) ) ) . '</button></p>';
		}
		return $out;
	}

	private static function n( $value, $display = null ) {
		return array( esc_html( null === $display ? number_format_i18n( (float) $value ) : $display ), (float) $value );
	}

	/** A table cell that narrows the dashboard (and opens the page or design in a new tab). */
	private function filter_cell( $key, $value, $label_html, $ext = '' ) {
		/* translators: 1: what (e.g. page), 2: value. */
		$cell = '<a class="om-ins-cell-link" href="' . esc_url( $this->filter_url( $key, $value ) ) . '" data-om-ins-nav title="' . esc_attr( sprintf( __( 'Show only visits with %1$s: %2$s', 'om-catalog' ), strtolower( self::filter_names()[ $key ] ), wp_strip_all_tags( $label_html ) ) ) . '">' . $label_html . '</a>';
		if ( '' !== $ext ) {
			$cell .= ' <a class="om-ins-row-ext" href="' . esc_url( $ext ) . '" target="_blank" rel="noopener" title="' . esc_attr__( 'Open on the site', 'om-catalog' ) . '"><span class="screen-reader-text">' . esc_html__( 'Open on the site', 'om-catalog' ) . '</span>' . self::icon( 'external' ) . '</a>';
		}
		return $cell;
	}

	/** A design: photo (on white), name and style. */
	private static function design_label( $key, $title = '' ) {
		$d = self::design( $key, $title );
		return ( '' !== $d['image'] ? '<img class="om-ins-thumb" src="' . esc_url( $d['image'] ) . '" alt="" loading="lazy" width="32" height="32" />' : '<span class="om-ins-thumb om-ins-nothumb" aria-hidden="true"></span>' )
			. '<span class="om-ins-dname">' . esc_html( $d['title'] ) . '<small>' . esc_html( sprintf( /* translators: 1: style number, 2: product line. */ __( 'Style %1$s · %2$s', 'om-catalog' ), $d['style'], ucwords( str_replace( '-', ' ', $d['line'] ) ) ) ) . '</small></span>';
	}

	private static function page_label( $path, $title ) {
		$name = self::title( $title, $path );
		return '<span class="om-ins-dname">' . esc_html( $name ) . ( $name !== $path ? '<small>' . esc_html( $path ) . '</small>' : '' ) . '</span>';
	}

	private static function page_link( $path ) {
		return '/om-hint/' === $path || '' === (string) $path ? '' : home_url( $path );
	}

	/** Busy hours: days down, hours across, five blue steps (darker is busier) plus empty. */
	private static function heatmap( $grid ) {
		$max = 0;
		foreach ( $grid as $hours ) {
			$max = max( $max, max( $hours ) );
		}
		if ( ! $max ) {
			return self::empty_note( __( 'No visits in this period yet.', 'om-catalog' ) );
		}
		$start = (int) get_option( 'start_of_week', 0 );
		$days  = array();
		for ( $i = 0; $i < 7; $i++ ) {
			$days[] = ( $start + $i ) % 7;
		}
		$names = array( __( 'Sun', 'om-catalog' ), __( 'Mon', 'om-catalog' ), __( 'Tue', 'om-catalog' ), __( 'Wed', 'om-catalog' ), __( 'Thu', 'om-catalog' ), __( 'Fri', 'om-catalog' ), __( 'Sat', 'om-catalog' ) );
		$full  = array( __( 'Sunday', 'om-catalog' ), __( 'Monday', 'om-catalog' ), __( 'Tuesday', 'om-catalog' ), __( 'Wednesday', 'om-catalog' ), __( 'Thursday', 'om-catalog' ), __( 'Friday', 'om-catalog' ), __( 'Saturday', 'om-catalog' ) );
		$utc   = new DateTimeZone( 'UTC' );
		$hour  = static function ( $h ) use ( $utc ) {
			return wp_date( 'ga', $h * HOUR_IN_SECONDS, $utc );
		};
		$out  = '<div class="om-ins-heat" role="img" aria-label="' . esc_attr__( 'Visits by day of the week and hour', 'om-catalog' ) . '"><div class="om-ins-heat-grid"><span></span>';
		for ( $h = 0; $h < 24; $h++ ) {
			$out .= '<span class="om-ins-heat-h">' . ( 0 === $h % 3 ? esc_html( $hour( $h ) ) : '' ) . '</span>';
		}
		foreach ( $days as $d ) {
			$out .= '<span class="om-ins-heat-d">' . esc_html( $names[ $d ] ) . '</span>';
			for ( $h = 0; $h < 24; $h++ ) {
				$v    = (int) ( $grid[ $d ][ $h ] ?? 0 );
				$step = $v ? min( 5, (int) ceil( 5 * $v / $max ) ) : 0;
				/* translators: %s: number of visits. */
				$out .= '<span class="om-ins-cell s' . (int) $step . '" tabindex="0" data-tip="' . esc_attr( $full[ $d ] . ' ' . $hour( $h ) . '–' . $hour( ( $h + 1 ) % 24 ) . ': ' . sprintf( _n( '%s visit', '%s visits', $v, 'om-catalog' ), number_format_i18n( $v ) ) ) . '"></span>';
			}
		}
		$out .= '</div><div class="om-ins-scale" aria-hidden="true"><span>' . esc_html__( 'Fewer', 'om-catalog' ) . '</span>';
		for ( $s = 0; $s <= 5; $s++ ) {
			$out .= '<i class="om-ins-cell s' . (int) $s . '"></i>';
		}
		$out .= '<span>' . esc_html__( 'More visits', 'om-catalog' ) . '</span></div></div>';
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

	/** Steps, each part of the one before: a meter per step and what carried on. */
	private static function funnel( $title, $desc, $steps ) {
		$first = max( 1, (int) ( $steps[0][1] ?? 0 ) );
		$out   = '<ol class="om-ins-funnel">';
		$prev  = 0;
		foreach ( $steps as $i => $s ) {
			$n = (int) $s[1];
			if ( $i ) {
				$kept = $prev ? (int) round( 100 * $n / $prev ) : 0;
				/* translators: 1: percent that carried on, 2: percent that stopped. */
				$out .= '<li class="om-ins-funnel-gap" aria-hidden="true">' . self::icon( 'chevron' ) . '<span>' . esc_html( sprintf( __( '%1$s carried on · %2$s stopped', 'om-catalog' ), $kept . '%', ( $prev ? 100 - $kept : 0 ) . '%' ) ) . '</span></li>';
			}
			$share = 100 * $n / $first;
			$tip   = $s[0] . ': ' . number_format_i18n( $n ) . ( $i ? ' (' . self::pct( $n, (int) $steps[0][1], 0 ) . ' ' . __( 'of the first step', 'om-catalog' ) . ')' : '' );
			$out  .= '<li class="om-ins-funnel-step" tabindex="0" data-tip="' . esc_attr( $tip ) . '"><span class="om-ins-funnel-n" aria-hidden="true">' . (int) ( $i + 1 ) . '</span><span class="om-ins-funnel-name">' . esc_html( $s[0] ) . '</span><span class="om-ins-funnel-v"><b>' . esc_html( number_format_i18n( $n ) ) . '</b>' . ( $i ? '<small>' . esc_html( self::pct( $n, (int) $steps[0][1], 0 ) ) . '</small>' : '' ) . '</span><span class="om-ins-meter" aria-hidden="true"><i style="width:' . esc_attr( round( min( 100, $share ), 2 ) ) . '%"></i></span></li>';
			$prev  = $n;
		}
		$out .= '</ol>';
		return self::card( $title, $out, array( 'sub' => $desc, 'class' => 'om-ins-funnelcard' ) );
	}

	/** A plain headline number (no chart behind it). */
	private static function stat( $label, $value, $now, $before, $hint = '' ) {
		return '<div class="om-ins-kpi om-ins-stat"' . ( $hint ? ' title="' . esc_attr( $hint ) . '"' : '' ) . '><span class="om-ins-kpi-l">' . esc_html( $label ) . '</span><span class="om-ins-kpi-v">' . esc_html( $value ) . '</span>' . self::delta( $now, $before ) . '</div>';
	}

	/** Friendly "nothing yet". */
	private function empty_state() {
		if ( $this->filters ) {
			return self::card( __( 'No visits match these filters', 'om-catalog' ), '<p class="om-ins-lead">' . esc_html__( 'Try another period, or take a filter off above.', 'om-catalog' ) . '</p><p><a class="om-ins-btn" href="' . esc_url( $this->url( array( 'f' => null ) ) ) . '" data-om-ins-nav>' . esc_html__( 'Clear filters', 'om-catalog' ) . '</a></p>', array( 'class' => 'om-ins-welcome' ) );
		}
		return self::card( __( 'Collecting has started', 'om-catalog' ), '<p class="om-ins-lead">' . esc_html__( 'Nothing in this period yet. Visits show up here a few seconds after they happen. Staff who are logged in are left out, so open the site in a private window to see your own visit.', 'om-catalog' ) . '</p>', array( 'class' => 'om-ins-welcome' ) );
	}

	/* ---------------------------------------------------------------
	 * Rows for the lists
	 * ------------------------------------------------------------- */

	private function channel_rows( $list, $total ) {
		$rows = array();
		foreach ( $list as $r ) {
			$c      = (int) $r['converted'];
			$rows[] = array(
				'label'  => self::channel_name( $r['k'] ),
				'icon'   => self::channel_icon( $r['k'] ),
				'value'  => (int) $r['visits'],
				'show'   => self::compact( $r['visits'] ),
				'share'  => $total ? (int) $r['visits'] / $total : null,
				/* translators: 1: leads, 2: lead rate. */
				'tip'    => sprintf( _n( '%1$s lead (%2$s of these visits)', '%1$s leads (%2$s of these visits)', $c, 'om-catalog' ), number_format_i18n( $c ), self::pct( $c, (int) $r['visits'] ) ),
				'filter' => array( 'channel', $r['k'] ),
			);
		}
		return $rows;
	}

	/** Rows from one column of the visits table. */
	private static function simple_rows( $list, $key, $total, $icon = '', $namer = null ) {
		$rows = array();
		foreach ( $list as $r ) {
			$c      = (int) $r['converted'];
			$rows[] = array(
				'label'  => $namer ? $namer( $r['k'] ) : ( '' !== (string) $r['k'] ? (string) $r['k'] : __( 'Unknown', 'om-catalog' ) ),
				'icon'   => is_callable( $icon ) ? $icon( $r['k'] ) : $icon,
				'value'  => (int) $r['visits'],
				'show'   => self::compact( $r['visits'] ),
				'share'  => $total ? (int) $r['visits'] / $total : null,
				/* translators: 1: leads, 2: lead rate. */
				'tip'    => sprintf( _n( '%1$s lead (%2$s of these visits)', '%1$s leads (%2$s of these visits)', $c, 'om-catalog' ), number_format_i18n( $c ), self::pct( $c, (int) $r['visits'] ) ),
				'filter' => '' !== (string) $r['k'] ? array( $key, (string) $r['k'] ) : null,
			);
		}
		return $rows;
	}

	private function page_rows( $list ) {
		$rows = array();
		foreach ( $list as $r ) {
			$rows[] = array(
				'label'  => self::title( $r['title'], $r['page'] ),
				'value'  => (int) $r['views'],
				'show'   => self::compact( $r['views'] ),
				/* translators: 1: average time, 2: visits. */
				'tip'    => sprintf( __( 'Average %1$s on the page · in %2$s visits', 'om-catalog' ), self::duration( $r['dur'] ), number_format_i18n( (int) $r['visits'] ) ),
				'filter' => array( 'page', $r['page'] ),
				'ext'    => self::page_link( $r['page'] ),
			);
		}
		return $rows;
	}

	private function path_rows( $list, $key, $titles, $total ) {
		$rows = array();
		foreach ( $list as $r ) {
			$path   = (string) $r['k'];
			$rows[] = array(
				'label'  => self::title( $titles[ $path ] ?? '', $path ),
				'value'  => (int) $r['visits'],
				'show'   => self::compact( $r['visits'] ),
				'share'  => $total ? (int) $r['visits'] / $total : null,
				/* translators: %s: share of visits that left quickly. */
				'tip'    => sprintf( __( '%s left within 10 seconds', 'om-catalog' ), self::pct( (int) $r['quick'], (int) $r['visits'], 0 ) ),
				'filter' => '' !== $path ? array( $key, $path ) : null,
				'ext'    => self::page_link( $path ),
			);
		}
		return $rows;
	}

	/** Designs, ranked by views, saves or leads. */
	private static function design_rows( $list, $by, $limit = 8 ) {
		$list = array_filter(
			$list,
			static function ( $r ) use ( $by ) {
				return (int) $r[ $by ] > 0;
			}
		);
		usort(
			$list,
			static function ( $a, $b ) use ( $by ) {
				return (int) $b[ $by ] <=> (int) $a[ $by ] ?: (int) $b['views'] <=> (int) $a['views'];
			}
		);
		$rows = array();
		foreach ( array_slice( $list, 0, $limit ) as $r ) {
			$d      = self::design( $r['item'], $r['title'] );
			$rows[] = array(
				'label'  => $d['title'],
				/* translators: %s: style number. */
				'sub'    => sprintf( __( 'Style %s', 'om-catalog' ), $d['style'] ),
				'img'    => $d['image'],
				'value'  => (int) $r[ $by ],
				'show'   => self::compact( $r[ $by ] ),
				/* translators: 1: views, 2: saves, 3: leads. */
				'tip'    => sprintf( __( '%1$s views · %2$s saved · %3$s leads', 'om-catalog' ), number_format_i18n( (int) $r['views'] ), number_format_i18n( (int) $r['saves'] ), number_format_i18n( (int) $r['leads'] ) ),
				'filter' => array( 'item', $r['item'] ),
				'ext'    => $d['url'],
			);
		}
		return $rows;
	}

	private static function search_rows( $list, $total = 0 ) {
		$rows = array();
		foreach ( $list as $r ) {
			$rows[] = array(
				'label'  => (string) $r['q'],
				'icon'   => 'search',
				'value'  => (int) $r['n'],
				'show'   => self::compact( $r['n'] ),
				'filter' => array( 'search', (string) $r['q'] ),
			);
		}
		return $rows;
	}

	/** Places: cities, states, countries (or time zones). */
	private static function location_tabs( $loc, $total ) {
		if ( isset( $loc['tz'] ) ) {
			$rows = array();
			foreach ( $loc['tz'] as $r ) {
				$rows[] = array(
					'label' => str_replace( '_', ' ', (string) $r['k'] ),
					'icon'  => 'clock',
					'value' => (int) $r['visits'],
					'show'  => self::compact( $r['visits'] ),
					'share' => $total ? (int) $r['visits'] / $total : null,
				);
			}
			return array( array( 'label' => __( 'Time zones', 'om-catalog' ), 'head' => array( __( 'Time zone', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No visits yet.', 'om-catalog' ) ) );
		}
		return array(
			array( 'label' => __( 'Cities', 'om-catalog' ), 'head' => array( __( 'City', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $loc['city'], 'city', $total, 'pin' ), 'empty' => __( 'No cities yet.', 'om-catalog' ) ),
			array( 'label' => __( 'States', 'om-catalog' ), 'head' => array( __( 'State', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $loc['region'], 'region', $total, 'pin' ), 'empty' => __( 'No states yet.', 'om-catalog' ) ),
			array( 'label' => __( 'Countries', 'om-catalog' ), 'head' => array( __( 'Country', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $loc['country'], 'country', $total, 'globe' ), 'empty' => __( 'No countries yet.', 'om-catalog' ) ),
		);
	}

	/** People who got in touch, newest first; each opens their visit. */
	private function people( $leads ) {
		if ( ! $leads ) {
			return self::empty_note( __( 'No leads in this period yet.', 'om-catalog' ) );
		}
		$out = '<ul class="om-ins-people">';
		foreach ( $leads as $r ) {
			$kind  = OM_Insights::lead_types()[ $r['kind'] ] ?? $r['kind'];
			$about = '' !== (string) $r['item'] ? self::design( $r['item'] )['title'] : '';
			$about = trim( $about . ( '' !== (string) $r['meta'] && $r['meta'] !== $about ? ( '' !== $about ? ' · ' : '' ) . $r['meta'] : '' ) );
			$name  = self::visitor_label( (string) $r['vid'], (string) $r['lead_name'] );
			$inner = self::avatar( (string) $r['vid'], (string) $r['lead_name'] )
				. '<span class="om-ins-person-main"><b>' . esc_html( $name ) . '</b><small>' . esc_html( $kind . ( '' !== $about ? ' · ' . $about : '' ) ) . '</small></span>'
				. ( '' !== (string) $r['sid'] ? '<span class="om-ins-person-src">' . self::icon( self::channel_icon( (string) $r['channel'] ) ) . esc_html( self::channel_name( (string) $r['channel'] ) ) . '</span>' : '<span class="om-ins-person-src">' . esc_html__( 'Not linked to a visit', 'om-catalog' ) . '</span>' )
				. '<time datetime="' . esc_attr( gmdate( 'c', (int) $r['ts'] ) ) . '" title="' . esc_attr( wp_date( 'l, M j, Y \a\t g:i a', (int) $r['ts'] ) ) . '">' . esc_html( self::when( $r['ts'] ) ) . '</time>';
			$out  .= '<li>' . ( '' !== (string) $r['sid'] ? '<a class="om-ins-person" href="' . esc_url( $this->url( array( 'visit' => $r['sid'] ) ) ) . '" data-om-ins-drawer>' . $inner . '</a>' : '<span class="om-ins-person">' . $inner . '</span>' ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped.
		}
		return $out . '</ul>';
	}

	/** Visits as rows (journeys, a visitor's visits, live); each opens in the side panel. */
	private function visit_rows( $rows, $live = false ) {
		$days   = wp_list_pluck( $rows, 'day' );
		$titles = $rows ? $this->page_titles( array_merge( wp_list_pluck( $rows, 'landing' ), wp_list_pluck( $rows, 'exit_page' ) ), $days ? min( $days ) : wp_date( 'Y-m-d', time() - DAY_IN_SECONDS ), wp_date( 'Y-m-d' ) ) : array();
		$out    = '';
		foreach ( $rows as $r ) {
			$place = trim( implode( ', ', array_filter( array( $r['city'] ?? '', $r['region'] ?? '' ) ) ) );
			$meta  = array( self::device_one( $r['device'] ) );
			/* translators: %s: visit number. */
			$meta[] = (int) $r['visit_no'] > 1 ? sprintf( __( 'visit %s', 'om-catalog' ), number_format_i18n( (int) $r['visit_no'] ) ) : __( 'first visit', 'om-catalog' );
			if ( '' !== $place ) {
				$meta[] = $place;
			}
			$outcome = '';
			if ( (int) $r['leads'] > 0 ) {
				$outcome = '<span class="om-ins-badge lead">' . self::icon( 'check' ) . esc_html( OM_Insights::lead_types()[ $r['lead_type'] ] ?? __( 'Lead', 'om-catalog' ) ) . '</span>';
			} elseif ( (int) $r['saves'] > 0 ) {
				/* translators: %s: number of designs saved. */
				$outcome = '<span class="om-ins-badge">' . self::icon( 'heart' ) . esc_html( sprintf( _n( '%s saved', '%s saved', (int) $r['saves'], 'om-catalog' ), number_format_i18n( (int) $r['saves'] ) ) ) . '</span>';
			}
			$page  = $live ? (string) $r['exit_page'] : (string) $r['landing'];
			$stats = array(
				/* translators: %s: number of pages. */
				sprintf( _n( '%s page', '%s pages', (int) $r['pages'], 'om-catalog' ), number_format_i18n( (int) $r['pages'] ) ),
			);
			if ( (int) $r['products'] ) {
				/* translators: %s: number of designs. */
				$stats[] = sprintf( _n( '%s design', '%s designs', (int) $r['products'], 'om-catalog' ), number_format_i18n( (int) $r['products'] ) );
			}
			$time  = $live ? self::duration( max( 0, (int) $r['last'] - (int) $r['started'] ) ) : self::duration( (int) ( $r['engaged'] ?? 0 ) );
			$out  .= '<li><a class="om-ins-visit" href="' . esc_url( $this->url( array( 'visit' => $r['sid'] ) ) ) . '" data-om-ins-drawer>'
				. self::avatar( $r['vid'], $r['lead_name'] )
				. '<span class="om-ins-visit-who"><b>' . esc_html( self::visitor_label( $r['vid'], $r['lead_name'] ) ) . '</b><small>' . self::icon( self::device_icon( $r['device'] ) ) . esc_html( implode( ' · ', $meta ) ) . '</small></span>'
				. '<span class="om-ins-visit-src">' . self::icon( self::channel_icon( $r['channel'] ) ) . '<span>' . esc_html( self::channel_name( $r['channel'] ) ) . ( '' !== (string) $r['ref_host'] ? '<small>' . esc_html( $r['ref_host'] ) . '</small>' : '' ) . '</span></span>'
				. '<span class="om-ins-visit-page"><small>' . esc_html( $live ? __( 'Now on', 'om-catalog' ) : __( 'First page', 'om-catalog' ) ) . '</small>' . esc_html( '' !== $page ? self::title( $titles[ $page ] ?? '', $page ) : '–' ) . '</span>'
				. '<span class="om-ins-visit-stats">' . esc_html( implode( ' · ', $stats ) ) . '<small>' . self::icon( 'clock' ) . esc_html( $time ) . '</small></span>'
				. '<span class="om-ins-visit-out">' . $outcome . '</span>'
				. '<time datetime="' . esc_attr( gmdate( 'c', (int) $r['started'] ) ) . '" title="' . esc_attr( wp_date( 'l, M j, Y \a\t g:i a', (int) $r['started'] ) ) . '">' . esc_html( self::when( $live ? $r['last'] : $r['started'] ) ) . '</time>'
				. '</a></li>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped.
		}
		return $out;
	}

	/* ---------------------------------------------------------------
	 * The tabs
	 * ------------------------------------------------------------- */

	/** The view asked for: a tab, one visit or one visitor. */
	public function render() {
		if ( $this->visit ) {
			return $this->visit_view( $this->visit, false );
		}
		if ( $this->visitor ) {
			return $this->visitor_view( $this->visitor, false );
		}
		$method = 'tab_' . $this->tab;
		return $this->$method();
	}

	private function tab_overview() {
		$unit = $this->unit();
		$data = $this->cached(
			'overview|' . $unit,
			function () use ( $unit ) {
				list( $pf, $pt ) = $this->previous();
				$landing         = $this->by_visit( 'landing', 8 );
				$exits           = $this->by_visit( 'exit_page', 8 );
				return array(
					'now'      => $this->kpis( $this->from, $this->to ),
					'before'   => $this->kpis( $pf, $pt ),
					'chart'    => $this->chart( $unit ),
					'channels' => $this->by_visit( 'channel', 9 ),
					'refs'     => $this->by_visit( 'ref_host', 8, "AND ref_host <> ''" ),
					'camps'    => $this->by_visit( 'utm_campaign', 8, "AND utm_campaign <> ''" ),
					'pages'    => $this->pages( 8 ),
					'landing'  => $landing,
					'exits'    => $exits,
					'titles'   => $this->page_titles( array_merge( wp_list_pluck( $landing, 'k' ), wp_list_pluck( $exits, 'k' ) ) ),
					'designs'  => $this->products( 150 ),
					'loc'      => $this->locations( 8 ),
					'devices'  => $this->by_visit( 'device', 3 ),
					'browsers' => $this->by_visit( 'browser', 8 ),
					'os'       => $this->by_visit( 'os', 8 ),
					'search'   => $this->searches( 8 ),
					'leads'    => $this->leads( 6 ),
				);
			}
		);
		$k = $data['now'];
		$b = $data['before'];
		if ( ! $k['visits'] && ! $b['visits'] ) {
			return $this->empty_state();
		}
		$total = $k['visits'];
		$out   = $this->kpi_row( $k, $b ) . $this->chart_card( $data['chart'] );
		$out  .= '<div class="om-ins-grid">';
		$out  .= $this->panel(
			'src',
			__( 'Sources', 'om-catalog' ),
			array(
				array( 'label' => __( 'Channels', 'om-catalog' ), 'head' => array( __( 'Source', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $this->channel_rows( $data['channels'], $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Websites', 'om-catalog' ), 'head' => array( __( 'Website', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['refs'], 'ref', $total, 'globe' ), 'empty' => __( 'Every visit came direct so far.', 'om-catalog' ) ),
				array( 'label' => __( 'Campaigns', 'om-catalog' ), 'head' => array( __( 'Campaign', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['camps'], 'campaign', $total, 'tag' ), 'empty' => __( 'No tagged links used yet.', 'om-catalog' ) ),
			),
			array( $this->url( array( 'tab' => 'sources' ) ), __( 'All sources', 'om-catalog' ) )
		);
		$out .= $this->panel(
			'pg',
			__( 'Pages', 'om-catalog' ),
			array(
				array( 'label' => __( 'Most viewed', 'om-catalog' ), 'head' => array( __( 'Page', 'om-catalog' ), __( 'Views', 'om-catalog' ) ), 'rows' => $this->page_rows( $data['pages'] ), 'empty' => __( 'No page views yet.', 'om-catalog' ) ),
				array( 'label' => __( 'First pages', 'om-catalog' ), 'head' => array( __( 'Page', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $this->path_rows( $data['landing'], 'landing', $data['titles'], $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Last pages', 'om-catalog' ), 'head' => array( __( 'Page', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $this->path_rows( $data['exits'], 'exit', $data['titles'], $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
			),
			array( $this->url( array( 'tab' => 'pages' ) ), __( 'All pages', 'om-catalog' ) )
		);
		$out .= $this->panel(
			'ds',
			__( 'Designs', 'om-catalog' ),
			array(
				array( 'label' => __( 'Viewed', 'om-catalog' ), 'head' => array( __( 'Design', 'om-catalog' ), __( 'Views', 'om-catalog' ) ), 'rows' => self::design_rows( $data['designs'], 'views' ), 'empty' => __( 'No designs viewed yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Saved', 'om-catalog' ), 'head' => array( __( 'Design', 'om-catalog' ), __( 'Saves', 'om-catalog' ) ), 'rows' => self::design_rows( $data['designs'], 'saves' ), 'empty' => __( 'Nothing saved yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Asked about', 'om-catalog' ), 'head' => array( __( 'Design', 'om-catalog' ), __( 'Leads', 'om-catalog' ) ), 'rows' => self::design_rows( $data['designs'], 'leads' ), 'empty' => __( 'No inquiries about a design yet.', 'om-catalog' ) ),
			),
			array( $this->url( array( 'tab' => 'designs' ) ), __( 'All designs', 'om-catalog' ) )
		);
		$out .= $this->panel( 'loc', __( 'Locations', 'om-catalog' ), self::location_tabs( $data['loc'], $total ) );
		$out .= $this->panel(
			'dev',
			__( 'Devices', 'om-catalog' ),
			array(
				array( 'label' => __( 'Devices', 'om-catalog' ), 'head' => array( __( 'Device', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['devices'], 'device', $total, array( __CLASS__, 'device_icon' ), array( __CLASS__, 'device_one' ) ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Browsers', 'om-catalog' ), 'head' => array( __( 'Browser', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['browsers'], 'browser', $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Systems', 'om-catalog' ), 'head' => array( __( 'System', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['os'], 'os', $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
			)
		);
		$out .= $this->panel(
			'sr',
			__( 'Searches', 'om-catalog' ),
			array(
				array( 'label' => __( 'Searched for', 'om-catalog' ), 'head' => array( __( 'Search', 'om-catalog' ), __( 'Times', 'om-catalog' ) ), 'rows' => self::search_rows( $data['search']['top'] ), 'empty' => __( 'No searches yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Found nothing', 'om-catalog' ), 'head' => array( __( 'Search', 'om-catalog' ), __( 'Times', 'om-catalog' ) ), 'rows' => self::search_rows( $data['search']['zero'] ), 'empty' => __( 'Every search found something.', 'om-catalog' ) ),
			),
			array( $this->url( array( 'tab' => 'searches' ) ), __( 'All searches', 'om-catalog' ) )
		);
		$out .= '</div>';
		$out .= self::card( __( 'Latest leads', 'om-catalog' ), $this->people( $data['leads'] ), array( 'sub' => __( 'Who got in touch. Open one to see their visit.', 'om-catalog' ), 'more' => array( $this->url( array( 'tab' => 'leads' ) ), __( 'All leads', 'om-catalog' ) ) ) );
		return $out;
	}

	private function tab_sources() {
		$data = $this->cached(
			'sources',
			function () {
				$landing = $this->by_visit( 'landing', 25 );
				return array(
					'kpi'      => $this->kpis( $this->from, $this->to ),
					'channels' => $this->by_visit( 'channel', 12 ),
					'refs'     => $this->by_visit( 'ref_host', 25, "AND ref_host <> ''" ),
					'camps'    => $this->campaigns(),
					'landing'  => $landing,
					'titles'   => $this->page_titles( wp_list_pluck( $landing, 'k' ) ),
					'devices'  => $this->by_visit( 'device', 3 ),
					'browsers' => $this->by_visit( 'browser', 10 ),
					'os'       => $this->by_visit( 'os', 10 ),
					'loc'      => $this->locations( 15 ),
					'heat'     => $this->heat(),
				);
			}
		);
		$k = $data['kpi'];
		if ( ! $k['visits'] ) {
			return $this->empty_state();
		}
		$total = $k['visits'];
		$rows  = array();
		foreach ( $data['channels'] as $r ) {
			$rows[] = array(
				$this->filter_cell( 'channel', $r['k'], self::icon( self::channel_icon( $r['k'] ), 'om-ins-cell-i' ) . esc_html( self::channel_name( $r['k'] ) ) ),
				self::n( $r['visits'] ),
				self::n( $r['visitors'] ),
				self::n( $r['pages'], number_format_i18n( (float) $r['pages'], 1 ) ),
				self::n( $r['engaged'], self::duration( $r['engaged'] ) ),
				self::n( $r['converted'] ),
				self::n( (int) $r['visits'] ? $r['converted'] / $r['visits'] : 0, self::pct( (int) $r['converted'], (int) $r['visits'] ) ),
			);
		}
		$out = self::card(
			__( 'Where visits come from', 'om-catalog' ),
			self::table( array( __( 'Source', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Visitors', 'om-catalog' ), __( 'Pages / visit', 'om-catalog' ), __( 'Time / visit', 'om-catalog' ), __( 'Leads', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No visits yet.', 'om-catalog' ) ),
			array( 'sub' => __( 'Paid ads: visits with an ad click ID or a paid campaign tag. Maps: links tagged utm_source=gbp on your Business Profile. Click a source to see only its visits.', 'om-catalog' ) )
		);
		$out .= '<div class="om-ins-grid">';
		$out .= $this->panel( 'refs', __( 'Websites that sent visitors', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Website', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['refs'], 'ref', $total, 'globe' ), 'empty' => __( 'Every visit came direct so far.', 'om-catalog' ) ) ) );
		$rows = array();
		foreach ( $data['camps'] as $r ) {
			$rows[] = array(
				'' !== $r['camp'] ? $this->filter_cell( 'campaign', $r['camp'], self::icon( 'tag', 'om-ins-cell-i' ) . esc_html( $r['camp'] ) ) : '–',
				esc_html( trim( $r['src'] . ( '' !== $r['med'] ? ' / ' . $r['med'] : '' ) ) ),
				self::n( $r['visits'] ),
				self::n( $r['converted'] ),
				self::n( (int) $r['visits'] ? $r['converted'] / $r['visits'] : 0, self::pct( (int) $r['converted'], (int) $r['visits'] ) ),
			);
		}
		$out .= self::card( __( 'Campaigns', 'om-catalog' ), self::table( array( __( 'Campaign', 'om-catalog' ), __( 'Source / medium', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Leads', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No tagged links used yet.', 'om-catalog' ), '', 12 ), array( 'sub' => __( 'Links tagged with utm_campaign: ads, emails, social posts.', 'om-catalog' ) ) );
		$out .= '</div>';
		$rows = array();
		foreach ( $data['landing'] as $r ) {
			$path   = (string) $r['k'];
			$rows[] = array(
				$this->filter_cell( 'landing', $path, self::page_label( $path, $data['titles'][ $path ] ?? '' ), self::page_link( $path ) ),
				self::n( $r['visits'] ),
				self::n( (int) $r['visits'] ? $r['quick'] / $r['visits'] : 0, self::pct( (int) $r['quick'], (int) $r['visits'], 0 ) ),
				self::n( $r['pages'], number_format_i18n( (float) $r['pages'], 1 ) ),
				self::n( $r['converted'] ),
				self::n( (int) $r['visits'] ? $r['converted'] / $r['visits'] : 0, self::pct( (int) $r['converted'], (int) $r['visits'] ) ),
			);
		}
		$out .= self::card( __( 'First page of a visit', 'om-catalog' ), self::table( array( __( 'Page', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Quick exits', 'om-catalog' ), __( 'Pages / visit', 'om-catalog' ), __( 'Leads', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No visits yet.', 'om-catalog' ), '', 12 ), array( 'sub' => __( 'Where visits start. Quick exits: left after one page in under 10 seconds.', 'om-catalog' ) ) );
		$out .= '<div class="om-ins-grid om-ins-grid-3">';
		$out .= $this->panel( 'dv', __( 'Devices', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Device', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['devices'], 'device', $total, array( __CLASS__, 'device_icon' ), array( __CLASS__, 'device_one' ) ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ) ) );
		$out .= $this->panel( 'br', __( 'Browsers', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Browser', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['browsers'], 'browser', $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ) ) );
		$out .= $this->panel( 'sy', __( 'Systems', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'System', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['os'], 'os', $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ) ) );
		$out .= '</div><div class="om-ins-grid">';
		$kinds = array(
			array( 'label' => __( 'First visit', 'om-catalog' ), 'icon' => 'user', 'value' => $k['new'], 'show' => self::compact( $k['new'] ), 'share' => $total ? $k['new'] / $total : null, 'filter' => array( 'kind', 'new' ) ),
			array( 'label' => __( 'Came back', 'om-catalog' ), 'icon' => 'refresh', 'value' => $total - $k['new'], 'show' => self::compact( $total - $k['new'] ), 'share' => $total ? ( $total - $k['new'] ) / $total : null, 'filter' => array( 'kind', 'returning' ) ),
		);
		$out .= $this->panel( 'nr', __( 'New and returning', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Visitors', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $kinds, 'empty' => __( 'No visits yet.', 'om-catalog' ) ) ), null, __( 'A returning visitor has been on the site before, in the same browser.', 'om-catalog' ) );
		$loc_note = isset( $data['loc']['tz'] ) ? __( 'From each visitor\'s time zone. For towns and states, switch on Cloudflare\'s "Add visitor location headers" (Rules > Managed Transforms).', 'om-catalog' ) : '';
		$out     .= $this->panel( 'lc', __( 'Where visitors are', 'om-catalog' ), self::location_tabs( $data['loc'], $total ), null, $loc_note );
		$out     .= '</div>';
		$out     .= self::card( __( 'When people visit', 'om-catalog' ), self::heatmap( $data['heat'] ), array( 'sub' => __( 'Visits by day of the week and hour, in your site\'s time zone. Darker is busier.', 'om-catalog' ) ) );
		return $out;
	}

	private function tab_pages() {
		$list = $this->cached(
			'pages',
			function () {
				return $this->pages( 400 );
			}
		);
		if ( ! $list ) {
			return $this->empty_state();
		}
		$rows = array();
		foreach ( $list as $r ) {
			$rows[] = array(
				$this->filter_cell( 'page', $r['page'], self::page_label( $r['page'], $r['title'] ), self::page_link( $r['page'] ) ),
				self::n( $r['views'] ),
				self::n( $r['visits'] ),
				self::n( $r['dur'], self::duration( $r['dur'] ) ),
				self::n( $r['scroll'], number_format_i18n( (float) $r['scroll'], 0 ) . '%' ),
				self::n( $r['entries'] ),
				self::n( $r['exits'] ),
				self::n( $r['entries'] ? $r['quick'] / $r['entries'] : 0, self::pct( $r['quick'], $r['entries'], 0 ) ),
			);
		}
		$find = '<label class="om-ins-find">' . self::icon( 'search' ) . '<span class="screen-reader-text">' . esc_html__( 'Find a page', 'om-catalog' ) . '</span><input type="search" data-om-ins-filter placeholder="' . esc_attr__( 'Find a page', 'om-catalog' ) . '" /></label>';
		return self::card(
			__( 'Every page', 'om-catalog' ),
			self::table( array( __( 'Page', 'om-catalog' ), __( 'Views', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Avg. time', 'om-catalog' ), __( 'Scrolled', 'om-catalog' ), __( 'Entries', 'om-catalog' ), __( 'Exits', 'om-catalog' ), __( 'Quick exits', 'om-catalog' ) ), $rows, __( 'No page views yet.', 'om-catalog' ), 'om-ins-pages', 25 ),
			array( 'sub' => __( 'Time: how long the page was on screen and in use. Scrolled: how far down people got. Entries and exits: visits that started or ended here. Click a page to see only visits that viewed it.', 'om-catalog' ), 'aside' => $find )
		);
	}

	private function tab_designs() {
		$data = $this->cached(
			'designs',
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
			return $this->empty_state();
		}
		$rows = array();
		foreach ( $data['products'] as $r ) {
			$d      = self::design( $r['item'], $r['title'] );
			$rows[] = array(
				$this->filter_cell( 'item', $r['item'], self::design_label( $r['item'], $r['title'] ), $d['url'] ),
				self::n( $r['views'] ),
				self::n( $r['viewers'] ),
				self::n( $r['dur'], self::duration( $r['dur'] ) ),
				self::n( $r['saves'] ),
				self::n( $r['compares'] ),
				self::n( $r['shares'] ),
				self::n( $r['hints'] ),
				self::n( $r['leads'] ),
				self::n( (int) $r['viewers'] ? $r['leads'] / $r['viewers'] : 0, self::pct( (int) $r['leads'], (int) $r['viewers'] ) ),
			);
		}
		$find = '<label class="om-ins-find">' . self::icon( 'search' ) . '<span class="screen-reader-text">' . esc_html__( 'Find a design', 'om-catalog' ) . '</span><input type="search" data-om-ins-filter placeholder="' . esc_attr__( 'Name or style number', 'om-catalog' ) . '" /></label>';
		$out  = self::card(
			__( 'Every design looked at', 'om-catalog' ),
			self::table( array( __( 'Design', 'om-catalog' ), __( 'Views', 'om-catalog' ), __( 'Viewers', 'om-catalog' ), __( 'Avg. time', 'om-catalog' ), __( 'Saved', 'om-catalog' ), __( 'Compared', 'om-catalog' ), __( 'Shared', 'om-catalog' ), __( 'Hints', 'om-catalog' ), __( 'Leads', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, '', 'om-ins-products', 25 ),
			array( 'sub' => __( 'Views: product pages and quick views. Leads: inquiries and requests about the design. Hints: "Drop a hint" emails sent with it. Click a design to see only visits that viewed it.', 'om-catalog' ), 'aside' => $find )
		);
		$out .= '<div class="om-ins-grid">';
		$lrows = array();
		foreach ( $data['lines'] as $r ) {
			/* translators: %s: number of visits. */
			$lrows[] = array( 'label' => ucwords( str_replace( '-', ' ', (string) $r['line'] ) ), 'icon' => 'designs', 'value' => (int) $r['views'], 'show' => self::compact( $r['views'] ), 'tip' => sprintf( __( 'In %s visits', 'om-catalog' ), number_format_i18n( (int) $r['visits'] ) ) );
		}
		$out  .= $this->panel( 'ln', __( 'Product lines', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Line', 'om-catalog' ), __( 'Views', 'om-catalog' ) ), 'rows' => $lrows, 'empty' => __( 'No designs viewed yet.', 'om-catalog' ) ) ) );
		$quiet = array_values(
			array_filter(
				$data['products'],
				static function ( $r ) {
					return (int) $r['viewers'] >= 3 && 0 === (int) $r['leads'];
				}
			)
		);
		$out  .= $this->panel( 'qt', __( 'Looked at often, never asked about', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Design', 'om-catalog' ), __( 'Viewers', 'om-catalog' ) ), 'rows' => self::design_rows( $quiet, 'viewers' ), 'empty' => __( 'Every popular design has had a lead.', 'om-catalog' ) ) ), null, __( 'Worth a look at their photos, price or wording.', 'om-catalog' ) );
		$names = array( 'metal' => __( 'Metal', 'om-catalog' ), 'color' => __( 'Gold colour', 'om-catalog' ), 'finger_size' => __( 'Ring size', 'om-catalog' ), 'level' => __( 'Setting', 'om-catalog' ), 'quality' => __( 'Diamond quality', 'om-catalog' ) );
		$tabs  = array();
		foreach ( $names as $key => $name ) {
			if ( empty( $data['options'][ $key ] ) ) {
				continue;
			}
			$all  = array_sum( $data['options'][ $key ] );
			$rows = array();
			foreach ( array_slice( $data['options'][ $key ], 0, 10, true ) as $value => $n ) {
				$rows[] = array( 'label' => (string) $value, 'value' => (int) $n, 'show' => self::compact( $n ), 'share' => $all ? $n / $all : null );
			}
			$tabs[] = array( 'label' => $name, 'head' => array( $name, __( 'Times chosen', 'om-catalog' ) ), 'rows' => $rows, 'empty' => '' );
		}
		$out .= $tabs ? $this->panel( 'op', __( 'Options people pick', 'om-catalog' ), $tabs ) : self::card( __( 'Options people pick', 'om-catalog' ), self::empty_note( __( 'Nobody has changed a metal, colour or size on a product page yet.', 'om-catalog' ) ) );
		$rows = array();
		foreach ( $data['pairs'] as $r ) {
			$names_list = array();
			foreach ( explode( ' + ', (string) $r['grp'] ) as $key ) {
				$names_list[] = self::design( $key )['title'];
			}
			$rows[] = array( 'label' => implode( ' + ', $names_list ), 'icon' => 'designs', 'value' => (int) $r['visits'], 'show' => self::compact( $r['visits'] ) );
		}
		$out .= $this->panel( 'cp', __( 'Compared side by side', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Designs', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'Nothing compared yet.', 'om-catalog' ) ) ), null, __( 'Designs people put in the compare table together: they are deciding between them.', 'om-catalog' ) );
		$rows = array();
		foreach ( $data['reels'] as $r ) {
			$d = self::design( $r['item'] );
			/* translators: 1: taps, 2: tap rate. */
			$rows[] = array( 'label' => $d['title'], 'img' => $d['image'], 'value' => (int) $r['views'], 'show' => self::compact( $r['views'] ), 'tip' => sprintf( __( '%1$s taps through (%2$s)', 'om-catalog' ), number_format_i18n( (int) $r['taps'] ), self::pct( (int) $r['taps'], (int) $r['views'] ) ), 'filter' => array( 'item', $r['item'] ), 'ext' => $d['url'] );
		}
		$out .= $this->panel( 'rl', __( 'Story reels', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Story', 'om-catalog' ), __( 'Views', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No stories watched yet.', 'om-catalog' ) ) ) );
		return $out . '</div>';
	}

	private function tab_searches() {
		$data = $this->cached(
			'searches',
			function () {
				return $this->searches( 60 );
			}
		);
		$results_page = (int) get_option( 'om_search_results_page', 0 );
		$results_url  = $results_page ? get_permalink( $results_page ) : '';
		$rows         = array();
		foreach ( $data['top'] as $r ) {
			$rows[] = array( $this->filter_cell( 'search', $r['q'], self::icon( 'search', 'om-ins-cell-i' ) . esc_html( $r['q'] ) ), self::n( $r['n'] ), self::n( $r['visits'] ), self::n( (int) $r['visits'] ? $r['converted'] / $r['visits'] : 0, self::pct( (int) $r['converted'], (int) $r['visits'] ) ) );
		}
		$out  = '<div class="om-ins-grid">';
		$out .= self::card( __( 'What people search for', 'om-catalog' ), self::table( array( __( 'Search', 'om-catalog' ), __( 'Times', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No searches yet.', 'om-catalog' ), '', 20 ), array( 'sub' => __( 'Lead rate: visits with this search that ended in a lead.', 'om-catalog' ) ) );
		$rows = array();
		foreach ( $data['zero'] as $r ) {
			$try    = $results_url ? '<a class="om-ins-cell-link" href="' . esc_url( add_query_arg( 'om_q', rawurlencode( $r['q'] ), $results_url ) ) . '" target="_blank" rel="noopener">' . esc_html__( 'Try it', 'om-catalog' ) . self::icon( 'external' ) . '</a>' : '';
			$rows[] = array( '<strong>' . esc_html( $r['q'] ) . '</strong>', self::n( $r['n'] ), $try );
		}
		$out  .= self::card( __( 'Searches that found nothing', 'om-catalog' ), self::table( array( __( 'Search', 'om-catalog' ), __( 'Times', 'om-catalog' ), '' ), $rows, __( 'Every search found something.', 'om-catalog' ) ), array( 'sub' => __( 'What visitors wanted and didn\'t find: ideas for designs to add, or words to use in titles.', 'om-catalog' ) ) );
		$out  .= '</div>';
		$names = array( 'shape' => __( 'Diamond shape', 'om-catalog' ), 'style' => __( 'Style', 'om-catalog' ), 'metal' => __( 'Metal', 'om-catalog' ), 'color' => __( 'Gold colour', 'om-catalog' ), 'upto' => __( 'Price up to', 'om-catalog' ), 'line' => __( 'Product line', 'om-catalog' ), 'sort' => __( 'Sorted by', 'om-catalog' ), 'size' => __( 'Ring size', 'om-catalog' ) );
		$tabs  = array();
		foreach ( $names as $key => $name ) {
			if ( empty( $data['filters'][ $key ] ) ) {
				continue;
			}
			$all  = array_sum( $data['filters'][ $key ] );
			$rows = array();
			foreach ( array_slice( $data['filters'][ $key ], 0, 10, true ) as $value => $n ) {
				$rows[] = array( 'label' => self::filter_value( $key, (string) $value ), 'value' => (int) $n, 'show' => self::compact( $n ), 'share' => $all ? $n / $all : null );
			}
			$tabs[] = array( 'label' => $name, 'head' => array( $name, __( 'Times used', 'om-catalog' ) ), 'rows' => $rows, 'empty' => '' );
		}
		$out .= $tabs ? $this->panel( 'fl', __( 'Catalog filters used', 'om-catalog' ), $tabs ) : self::card( __( 'Catalog filters used', 'om-catalog' ), self::empty_note( __( 'No catalog filters used yet.', 'om-catalog' ) ) );
		return $out;
	}

	private function tab_actions() {
		$data = $this->cached(
			'actions',
			function () {
				return array(
					'all'        => $this->actions(),
					'cta'        => $this->clicks( 'cta', 25 ),
					'call'       => $this->clicks( 'call', 20 ),
					'directions' => $this->clicks( 'directions', 10 ),
					'outbound'   => $this->clicks( 'outbound', 15 ),
				);
			}
		);
		$all = $data['all'];
		if ( ! $all ) {
			return $this->empty_state();
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
			array(
				__( 'Shopping', 'om-catalog' ),
				'designs',
				array(
					array( __( 'Designs viewed', 'om-catalog' ), $sum( 'view' ), 'eye' ),
					array( __( 'Saved with the heart', 'om-catalog' ), $sum( 'save' ), 'heart' ),
					array( __( 'Designs compared', 'om-catalog' ), $sum( 'compare' ), 'designs' ),
					array( __( 'Shared', 'om-catalog' ), $sum( 'share' ), 'link' ),
					array( __( 'Options changed', 'om-catalog' ), $sum( 'option' ), 'settings' ),
					array( __( 'Searches', 'om-catalog' ), $sum( 'search' ), 'search' ),
					array( __( 'Filters changed', 'om-catalog' ), $sum( 'filter' ), 'funnel' ),
				),
			),
			array(
				__( 'Getting in touch', 'om-catalog' ),
				'leads',
				array(
					array( __( 'Booking window opened', 'om-catalog' ), $sum( 'booking', 'open' ), 'calendar' ),
					array( __( 'Visit requests sent', 'om-catalog' ), $sum( 'booking', 'request' ), 'check' ),
					array( __( 'Tapped to call', 'om-catalog' ), $sum( 'call' ), 'phone' ),
					array( __( 'Opened directions', 'om-catalog' ), $sum( 'directions' ), 'pin' ),
					array( __( 'Tapped an email address', 'om-catalog' ), $sum( 'email' ), 'mail' ),
					array( __( 'Button clicks', 'om-catalog' ), $sum( 'cta' ), 'actions' ),
				),
			),
			array(
				__( 'Tools and extras', 'om-catalog' ),
				'sparkle',
				array(
					array( __( 'Jeweller assistant opened', 'om-catalog' ), $sum( 'assistant', 'open' ), 'sparkle' ),
					array( __( 'Questions to the assistant', 'om-catalog' ), $sum( 'assistant', 'message' ), 'sparkle' ),
					array( __( 'Ring builder steps', 'om-catalog' ), $sum( 'builder' ), 'designs' ),
					array( __( 'Ring designer opened', 'om-catalog' ), $sum( 'designer' ), 'designs' ),
					array( __( 'Quiz started', 'om-catalog' ), $sum( 'quiz', 'start' ), 'help' ),
					array( __( 'Quiz finished', 'om-catalog' ), $sum( 'quiz', 'complete' ), 'check' ),
					array( __( '"Drop a hint" opened', 'om-catalog' ), $sum( 'hint', 'open' ), 'mail' ),
					array( __( 'Hint pages opened', 'om-catalog' ), $sum( 'hint', 'page_view' ), 'eye' ),
					array( __( 'Diamond help used', 'om-catalog' ), $sum( 'diamond', 'guide' ), 'designs' ),
					array( __( 'True size viewer', 'om-catalog' ), $sum( 'diamond', 'true_size' ), 'eye' ),
				),
			),
		);
		$out = '<div class="om-ins-grid om-ins-grid-3">';
		foreach ( $areas as $i => $area ) {
			$rows = array();
			foreach ( $area[2] as $it ) {
				if ( $it[1][0] ) {
					/* translators: %s: number of visits. */
					$rows[] = array( 'label' => $it[0], 'icon' => $it[2], 'value' => $it[1][0], 'show' => self::compact( $it[1][0] ), 'tip' => sprintf( _n( 'In %s visit', 'In %s visits', $it[1][1], 'om-catalog' ), number_format_i18n( $it[1][1] ) ) );
				}
			}
			$out .= $this->panel( 'ar' . $i, $area[0], array( array( 'label' => '', 'head' => array( __( 'Action', 'om-catalog' ), __( 'Times', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'Nothing yet.', 'om-catalog' ) ) ) );
		}
		$out .= '</div>';
		$rows = array();
		foreach ( $data['cta'] as $r ) {
			$rows[] = array( '<strong>' . esc_html( '' !== $r['label'] ? $r['label'] : '–' ) . '</strong>', esc_html( self::place_name( $r['meta'] ) ), self::n( $r['n'] ), self::n( $r['visits'] ) );
		}
		$out   .= self::card( __( 'Buttons clicked', 'om-catalog' ), self::table( array( __( 'Button', 'om-catalog' ), __( 'Where', 'om-catalog' ), __( 'Clicks', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), $rows, __( 'No button clicks yet.', 'om-catalog' ), '', 12 ), array( 'sub' => __( 'Which buttons get used, and where on the site they are.', 'om-catalog' ) ) );
		$ranked = static function ( $list, $name, $icon ) {
			$agg = array();
			foreach ( $list as $r ) {
				$key         = $name( $r );
				$agg[ $key ] = ( $agg[ $key ] ?? 0 ) + (int) $r['n'];
			}
			arsort( $agg );
			$rows = array();
			foreach ( $agg as $key => $n ) {
				$rows[] = array( 'label' => (string) $key, 'icon' => $icon, 'value' => $n, 'show' => self::compact( $n ) );
			}
			return $rows;
		};
		$where  = static function ( $r ) {
			return self::place_name( $r['meta'] );
		};
		$out   .= '<div class="om-ins-grid om-ins-grid-3">';
		$out   .= $this->panel(
			'cl',
			__( 'Calls tapped', 'om-catalog' ),
			array(
				array( 'label' => __( 'Number', 'om-catalog' ), 'head' => array( __( 'Number', 'om-catalog' ), __( 'Taps', 'om-catalog' ) ), 'rows' => $ranked( $data['call'], static function ( $r ) { return self::phone( (string) $r['label'] ); }, 'phone' ), 'empty' => __( 'None yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Where', 'om-catalog' ), 'head' => array( __( 'Where', 'om-catalog' ), __( 'Taps', 'om-catalog' ) ), 'rows' => $ranked( $data['call'], $where, 'pin' ), 'empty' => __( 'None yet.', 'om-catalog' ) ),
			),
			null,
			__( 'The call itself happens off the site.', 'om-catalog' )
		);
		$out   .= $this->panel( 'di', __( 'Directions opened', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Where they tapped', 'om-catalog' ), __( 'Taps', 'om-catalog' ) ), 'rows' => $ranked( $data['directions'], $where, 'pin' ), 'empty' => __( 'None yet.', 'om-catalog' ) ) ) );
		$out   .= $this->panel( 'ob', __( 'Links to other sites', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Site', 'om-catalog' ), __( 'Clicks', 'om-catalog' ) ), 'rows' => $ranked( $data['outbound'], static function ( $r ) { return (string) $r['label']; }, 'globe' ), 'empty' => __( 'None yet.', 'om-catalog' ) ) ) );
		return $out . '</div>';
	}

	private function tab_funnels() {
		$f    = $this->cached(
			'funnels',
			function () {
				return $this->funnels();
			}
		);
		$out  = '<div class="om-ins-grid">';
		$out .= self::funnel( __( 'From visit to lead', 'om-catalog' ), __( 'Of all visits: how many looked at a design, then saved or compared one, then got in touch. Leads that skipped a step are in the Leads tab.', 'om-catalog' ), $f['shop'] );
		$out .= self::funnel( __( 'Booking window', 'om-catalog' ), __( 'Where people stop between opening it and sending the request.', 'om-catalog' ), $f['booking'] );
		$out .= self::funnel( __( 'Ring builder', 'om-catalog' ), __( 'Visits reaching each step.', 'om-catalog' ), $f['builder'] );
		$out .= self::funnel( __( 'Ring style quiz', 'om-catalog' ), __( 'From the first question to a booking or an email.', 'om-catalog' ), $f['quiz'] );
		$out .= self::funnel( __( 'Drop a hint', 'om-catalog' ), __( 'From the form to the partner getting in touch (the last two steps happen on the partner\'s phone or computer).', 'om-catalog' ), $f['hint'] );
		return $out . '</div>';
	}

	private function tab_journeys() {
		list( $rows, $total ) = $this->visits();
		$per   = 40;
		$chips = '<div class="om-ins-pills" role="group" aria-label="' . esc_attr__( 'Show', 'om-catalog' ) . '">';
		foreach ( self::journey_filters() as $key => $f ) {
			$chips .= '<a href="' . esc_url( $this->url( array( 'show' => 'all' === $key ? null : $key, 'p' => null ) ) ) . '" data-om-ins-nav' . ( $key === $this->show ? ' aria-current="true"' : '' ) . '>' . esc_html( $f[0] ) . '</a>';
		}
		$chips .= '</div>';
		/* translators: %s: number of visits. */
		$sub  = sprintf( _n( '%s visit, newest first. Open one to see everything that person did, step by step.', '%s visits, newest first. Open one to see everything that person did, step by step.', $total, 'om-catalog' ), number_format_i18n( $total ) );
		$body = $rows ? '<ol class="om-ins-visits" data-om-ins-visits>' . $this->visit_rows( $rows ) . '</ol>' : self::empty_note( __( 'No visits match in this period.', 'om-catalog' ) );
		if ( $total > $this->p * $per ) {
			$body .= '<p class="om-ins-loadmore"><a class="om-ins-btn" href="' . esc_url( $this->url( array( 'p' => $this->p + 1 ) ) ) . '" data-om-ins-more>' . esc_html__( 'Show more visits', 'om-catalog' ) . '</a></p>';
		}
		return self::card( __( 'Visitor journeys', 'om-catalog' ), $body, array( 'sub' => $sub, 'aside' => $chips, 'class' => 'om-ins-journeys' ) );
	}

	/** The next page of journeys (for "Show more visits"): [ rows HTML, next address or '' ]. */
	public function journey_page() {
		list( $rows, $total ) = $this->visits();
		return array( $this->visit_rows( $rows ), $total > $this->p * 40 ? $this->url( array( 'p' => $this->p + 1 ) ) : '' );
	}

	private function tab_leads() {
		list( $pf, $pt ) = $this->previous();
		$data            = $this->cached(
			'leads',
			function () use ( $pf, $pt ) {
				$e = OM_Insights::events_table();
				list( $es, $ea ) = $this->escope( $this->from, $this->to );
				return array(
					'list'     => $this->leads( 300 ),
					'now'      => $this->kpis( $this->from, $this->to ),
					'before'   => $this->kpis( $pf, $pt ),
					'types'    => self::rows( "SELECT label AS k, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND day BETWEEN %s AND %s{$es} GROUP BY label ORDER BY n DESC", array_merge( array( $this->from, $this->to ), $ea ) ),
					'channels' => $this->by_visit( 'channel', 12 ),
				);
			}
		);
		$k   = $data['now'];
		$b   = $data['before'];
		$out = '<div class="om-ins-kpis om-ins-stats">';
		$out .= self::stat( __( 'Leads', 'om-catalog' ), number_format_i18n( $k['leads'] ), $k['leads'], $b['leads'] );
		$out .= self::stat( __( 'Lead rate', 'om-catalog' ), number_format_i18n( $k['conv'], 1 ) . '%', $k['conv'], $b['conv'], __( 'Share of visits that became a lead.', 'om-catalog' ) );
		$out .= self::stat( __( 'Calls tapped', 'om-catalog' ), number_format_i18n( $k['calls'] ), $k['calls'], $b['calls'], __( 'Taps on a phone number. The call itself happens off the site.', 'om-catalog' ) );
		$out .= self::stat( __( 'Directions opened', 'om-catalog' ), number_format_i18n( $k['directions'] ), $k['directions'], $b['directions'] );
		$out .= '</div><div class="om-ins-grid">';
		$rows = array();
		foreach ( $data['types'] as $r ) {
			$rows[] = array( 'label' => OM_Insights::lead_types()[ $r['k'] ] ?? $r['k'], 'icon' => 'leads', 'value' => (int) $r['n'], 'show' => self::compact( $r['n'] ), 'share' => $k['leads'] ? (int) $r['n'] / $k['leads'] : null );
		}
		$out .= $this->panel( 'lk', __( 'Kinds of lead', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Kind', 'om-catalog' ), __( 'Leads', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No leads in this period yet.', 'om-catalog' ) ) ) );
		$rows = array();
		foreach ( $data['channels'] as $r ) {
			if ( (int) $r['converted'] ) {
				/* translators: 1: lead rate, 2: visits. */
				$rows[] = array( 'label' => self::channel_name( $r['k'] ), 'icon' => self::channel_icon( $r['k'] ), 'value' => (int) $r['converted'], 'show' => self::compact( $r['converted'] ), 'tip' => sprintf( __( '%1$s of %2$s visits', 'om-catalog' ), self::pct( (int) $r['converted'], (int) $r['visits'] ), number_format_i18n( (int) $r['visits'] ) ), 'filter' => array( 'channel', $r['k'] ) );
			}
		}
		$out .= $this->panel( 'ls', __( 'Leads by source', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Source', 'om-catalog' ), __( 'Leads', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No leads in this period yet.', 'om-catalog' ) ) ), null, __( 'Visits that ended in a lead, by where they came from.', 'om-catalog' ) );
		$out .= '</div>';
		$rows = array();
		foreach ( $data['list'] as $r ) {
			$kind  = OM_Insights::lead_types()[ $r['kind'] ] ?? $r['kind'];
			$what  = '' !== $r['item'] ? self::design( $r['item'] )['title'] : '';
			$what  = trim( $what . ( '' !== $r['meta'] && $r['meta'] !== $what ? ( '' !== $what ? ' · ' : '' ) . $r['meta'] : '' ) );
			$name  = self::visitor_label( (string) $r['vid'], (string) $r['lead_name'] );
			$who   = '' !== (string) $r['sid'] ? '<a class="om-ins-cell-person" href="' . esc_url( $this->url( array( 'visit' => $r['sid'] ) ) ) . '" data-om-ins-drawer>' . self::avatar( (string) $r['vid'], (string) $r['lead_name'] ) . '<span>' . esc_html( $name ) . '<small>' . esc_html( $kind ) . '</small></span></a>' : '<span class="om-ins-cell-person">' . self::avatar( '', '' ) . '<span>' . esc_html__( 'Not linked to a visit', 'om-catalog' ) . '<small>' . esc_html( $kind ) . '</small></span></span>';
			$days  = $r['first'] ? max( 0, (int) floor( ( (int) $r['ts'] - (int) $r['first'] ) / DAY_IN_SECONDS ) ) : null;
			$known = (int) $r['visits'] > 0;
			$rows[] = array(
				'<span title="' . esc_attr( wp_date( 'l, M j, Y \a\t g:i a', (int) $r['ts'] ) ) . '">' . esc_html( wp_date( 'M j, g:i a', (int) $r['ts'] ) ) . '</span>',
				$who,
				esc_html( '' !== $what ? $what : '–' ),
				'' !== (string) $r['sid'] ? self::icon( self::channel_icon( (string) $r['channel'] ), 'om-ins-cell-i' ) . esc_html( self::channel_name( (string) $r['channel'] ) ) : '–',
				$known ? self::n( (int) $r['visits'] ) : '–',
				! $known || null === $days ? '–' : self::n( $days, 0 === $days ? __( 'same day', 'om-catalog' ) : sprintf( /* translators: %s: days. */ _n( '%s day', '%s days', $days, 'om-catalog' ), number_format_i18n( $days ) ) ),
				'' !== (string) $r['sid'] ? self::n( (int) $r['engaged'], self::duration( (int) $r['engaged'] ) ) : '–',
			);
		}
		$out .= self::card( __( 'Every lead', 'om-catalog' ), self::table( array( __( 'When', 'om-catalog' ), __( 'Who', 'om-catalog' ), __( 'About', 'om-catalog' ), __( 'Came from', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Took', 'om-catalog' ), __( 'Time on site', 'om-catalog' ) ), $rows, __( 'No leads in this period yet.', 'om-catalog' ), 'om-ins-leads', 25 ), array( 'sub' => __( 'Visits: how many times they came before getting in touch. Took: days from their first visit. Open a name to see the visit step by step.', 'om-catalog' ) ) );
		return $out;
	}

	private function tab_live() {
		return '<div class="om-ins-live" data-om-ins-live><div data-om-ins-livebody>' . $this->live_body() . '</div></div>';
	}

	/** What refreshes on the Live tab. */
	public function live_body() {
		$rows    = $this->live_rows();
		$minutes = $this->live_minutes();
		$pages   = $this->live_pages();
		$count   = count( $rows );
		$max     = max( 1, max( $minutes ) );
		$bars    = '<div class="om-ins-minutes" role="img" aria-label="' . esc_attr__( 'People on the site each minute, the last 30 minutes', 'om-catalog' ) . '">';
		$now     = (int) floor( time() / 60 ) * 60;
		foreach ( $minutes as $i => $n ) {
			$t = $now - ( 29 - $i ) * 60;
			/* translators: 1: time, 2: number of people. */
			$bars .= '<span tabindex="0" data-tip="' . esc_attr( sprintf( _n( '%1$s: %2$s person', '%1$s: %2$s people', $n, 'om-catalog' ), wp_date( 'g:i a', $t ), number_format_i18n( $n ) ) ) . '"><i style="height:' . esc_attr( $n ? max( 4, round( 100 * $n / $max ) ) : 0 ) . '%"></i></span>';
		}
		$bars .= '</div><div class="om-ins-minutes-axis" aria-hidden="true"><span>' . esc_html__( '30 minutes ago', 'om-catalog' ) . '</span><span>' . esc_html__( 'Now', 'om-catalog' ) . '</span></div>';
		$hero  = '<div class="om-ins-hero"><span class="om-ins-dot' . ( $count ? ' on' : '' ) . '" aria-hidden="true"></span><b>' . esc_html( number_format_i18n( $count ) ) . '</b><span>' . esc_html( _n( 'person on the site now', 'people on the site now', $count, 'om-catalog' ) ) . '</span></div>';
		$prow  = array();
		foreach ( $pages as $r ) {
			$prow[] = array( 'label' => self::title( $r['title'], $r['page'] ), 'value' => (int) $r['n'], 'show' => self::compact( $r['n'] ), 'ext' => self::page_link( $r['page'] ) );
		}
		$out  = '<div class="om-ins-grid">';
		$out .= self::card( __( 'Right now', 'om-catalog' ), $hero . $bars, array( 'sub' => __( 'Active in the last 5 minutes. Updates by itself.', 'om-catalog' ), 'aside' => '<span class="om-ins-updated" data-om-ins-updated>' . esc_html( sprintf( /* translators: %s: time. */ __( 'Updated %s', 'om-catalog' ), wp_date( 'g:i:s a' ) ) ) . '</span>' ) );
		$out .= $this->panel( 'lp', __( 'Pages being viewed', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Page', 'om-catalog' ), __( 'People', 'om-catalog' ) ), 'rows' => $prow, 'empty' => __( 'Nobody on the site at the moment.', 'om-catalog' ) ) ) );
		$out .= '</div>';
		$out .= self::card( __( 'Visitors right now', 'om-catalog' ), $rows ? '<ol class="om-ins-visits">' . $this->visit_rows( $rows, true ) . '</ol>' : self::empty_note( __( 'Nobody on the site at the moment.', 'om-catalog' ) ) );
		return $out;
	}

	private function tab_settings() {
		$t      = self::totals();
		$switch = static function ( $name, $label, $help ) {
			$id = 'om-ins-opt-' . $name;
			return '<div class="om-ins-setting"><div class="om-ins-setting-t"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label><p id="' . esc_attr( $id ) . '-d">' . esc_html( $help ) . '</p></div>'
				. '<span class="om-ins-switch"><input type="checkbox" role="switch" id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '" value="1" aria-describedby="' . esc_attr( $id ) . '-d" data-om-ins-opt' . checked( '0' !== OM_Insights::opt( $name ), true, false ) . ' /><span aria-hidden="true"></span></span>'
				. '<span class="om-ins-saved" data-om-ins-saved aria-hidden="true">' . self::icon( 'check' ) . '</span></div>';
		};
		$form  = '<form class="om-ins-settings-form" method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '" data-om-ins-settings><input type="hidden" name="action" value="om_ins_settings" />' . wp_nonce_field( 'om_ins_settings', '_wpnonce', true, false );
		$form .= $switch( 'om_ins', __( 'Collect insights', 'om-catalog' ), __( 'A small script on every page reports what visitors do to this site, and nowhere else.', 'om-catalog' ) );
		$form .= $switch( 'om_ins_staff', __( 'Leave out logged-in staff', 'om-catalog' ), __( 'Your own browsing, and your team\'s, isn\'t counted while logged in.', 'om-catalog' ) );
		$form .= $switch( 'om_ins_vid', __( 'Recognise returning visitors', 'om-catalog' ), __( 'Keeps an anonymous ID in the visitor\'s browser for up to 400 days, so a second visit is linked to the first. Off: every visit stands alone.', 'om-catalog' ) );
		$form .= $switch( 'om_ins_dnt', __( 'Respect "Do Not Track" and Global Privacy Control', 'om-catalog' ), __( 'Browsers set to ask sites not to track them are not counted at all.', 'om-catalog' ) );
		$form .= $switch( 'om_ins_journey', __( 'Show the visit behind each inquiry', 'om-catalog' ), __( 'Adds "Their visit" (where they came from, what they looked at and saved) to inquiries in wp-admin and to the emails you get.', 'om-catalog' ) );
		$form .= '<div class="om-ins-setting"><div class="om-ins-setting-t"><span class="om-ins-setting-l" id="om-ins-keep">' . esc_html__( 'Keep data for', 'om-catalog' ) . '</span><p>' . esc_html__( 'Older visits are deleted every night. 13 months lets you compare with the same month last year.', 'om-catalog' ) . '</p></div><div class="om-ins-seg om-ins-seg-radio" role="radiogroup" aria-labelledby="om-ins-keep">';
		foreach ( array( 3, 6, 13, 25, 37 ) as $m ) {
			/* translators: %d: months. */
			$form .= '<label><input type="radio" name="om_ins_months" value="' . (int) $m . '" data-om-ins-opt' . checked( OM_Insights::months(), $m, false ) . ' /><span>' . esc_html( sprintf( _n( '%d month', '%d months', $m, 'om-catalog' ), $m ) ) . '</span></label>';
		}
		$form .= '</div><span class="om-ins-saved" data-om-ins-saved aria-hidden="true">' . self::icon( 'check' ) . '</span></div>';
		$form .= '<p class="om-ins-nojs-save"><button type="submit" class="om-ins-btn primary">' . esc_html__( 'Save settings', 'om-catalog' ) . '</button></p></form>';
		$out   = self::card( __( 'Collecting', 'om-catalog' ), $form, array( 'sub' => __( 'Changes are saved as soon as you make them.', 'om-catalog' ) ) );

		$since = $t['first'] ? wp_date( 'M j, Y', strtotime( $t['first'] . ' 12:00:00' ) ) : '–';
		$data  = '<div class="om-ins-figures"><div><b>' . esc_html( number_format_i18n( $t['visits'] ) ) . '</b><span>' . esc_html__( 'visits', 'om-catalog' ) . '</span></div><div><b>' . esc_html( number_format_i18n( $t['events'] ) ) . '</b><span>' . esc_html__( 'recorded actions', 'om-catalog' ) . '</span></div><div><b>' . esc_html( $since ) . '</b><span>' . esc_html__( 'first visit kept', 'om-catalog' ) . '</span></div></div>';
		$csv   = static function ( $what, $days ) {
			return wp_nonce_url( add_query_arg( array( 'action' => 'om_ins_csv', 'what' => $what, 'from' => wp_date( 'Y-m-d', time() - ( $days - 1 ) * DAY_IN_SECONDS ), 'to' => wp_date( 'Y-m-d' ) ), admin_url( 'admin-post.php' ) ), 'om_ins_csv' );
		};
		$data .= '<div class="om-ins-setting"><div class="om-ins-setting-t"><span class="om-ins-setting-l">' . esc_html__( 'Download as a spreadsheet', 'om-catalog' ) . '</span><p>' . esc_html__( 'CSV files for Excel, Numbers or Google Sheets: the last 90 days.', 'om-catalog' ) . '</p></div><div class="om-ins-btns"><a class="om-ins-btn" href="' . esc_url( $csv( 'visits', 90 ) ) . '">' . self::icon( 'download' ) . esc_html__( 'Visits', 'om-catalog' ) . '</a><a class="om-ins-btn" href="' . esc_url( $csv( 'events', 90 ) ) . '">' . self::icon( 'download' ) . esc_html__( 'Actions', 'om-catalog' ) . '</a></div></div>';
		if ( class_exists( 'OM_Stats' ) && OM_Stats::has_history() ) {
			$data .= '<div class="om-ins-setting"><div class="om-ins-setting-t"><span class="om-ins-setting-l">' . esc_html__( 'Earlier catalog counts', 'om-catalog' ) . '</span><p>' . esc_html__( 'The simple daily counts kept before Insights.', 'om-catalog' ) . '</p></div><div class="om-ins-btns"><a class="om-ins-btn" href="' . esc_url( admin_url( 'admin.php?page=' . OM_Stats::PAGE ) ) . '">' . esc_html__( 'Open', 'om-catalog' ) . self::icon( 'arrow' ) . '</a></div></div>';
		}
		$data .= '<div class="om-ins-setting om-ins-danger"><div class="om-ins-setting-t"><span class="om-ins-setting-l">' . esc_html__( 'Delete all insights data', 'om-catalog' ) . '</span><p>' . esc_html__( 'Every visit and action recorded so far. This can\'t be undone.', 'om-catalog' ) . '</p></div><form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '" data-om-ins-wipe><input type="hidden" name="action" value="om_ins_wipe" />' . wp_nonce_field( 'om_ins_wipe', '_wpnonce', true, false ) . '<button type="submit" class="om-ins-btn danger">' . self::icon( 'trash' ) . esc_html__( 'Delete everything', 'om-catalog' ) . '</button></form></div>';
		$out  .= self::card( __( 'Your data', 'om-catalog' ), $data, array( 'sub' => __( 'Stored in your own database only.', 'om-catalog' ) ) );

		$policy = self::policy_text();
		$priv   = '<p class="om-ins-lead">' . esc_html__( 'Insights uses two first-party cookies holding random IDs: om_sid for the visit (30 minutes) and om_vid for a returning visitor (up to 400 days). No IP address is stored and nothing is sent to other companies. A name or email is kept only when a visitor sends a form, with that lead.', 'om-catalog' ) . '</p>';
		$priv  .= '<figure class="om-ins-quote"><blockquote data-om-ins-copytext>' . esc_html( $policy ) . '</blockquote><figcaption><span>' . esc_html__( 'A line for your privacy policy', 'om-catalog' ) . '</span><button type="button" class="om-ins-btn" data-om-ins-copy>' . self::icon( 'copy' ) . esc_html__( 'Copy text', 'om-catalog' ) . '</button></figcaption></figure>';
		$out   .= self::card( __( 'Privacy', 'om-catalog' ), $priv );
		return '<div class="om-ins-settings">' . $out . '</div>';
	}

	/* ---------------------------------------------------------------
	 * One visit, one visitor
	 * ------------------------------------------------------------- */

	/** One visit: who, from where, then everything they did. */
	public function visit_view( $sid, $drawer = true ) {
		$v = self::visit_row_by_sid( $sid );
		if ( ! $v ) {
			return self::empty_note( __( 'That visit is no longer kept.', 'om-catalog' ) );
		}
		$events = self::visit_events( $sid );
		$place  = trim( implode( ', ', array_filter( array( $v['city'], $v['region'], $v['country'] ) ) ) );
		$from   = self::channel_name( $v['channel'] ) . ( '' !== $v['ref_host'] ? ' (' . $v['ref_host'] . ')' : '' );
		$camp   = trim( $v['utm_campaign'] . ( '' !== $v['utm_source'] ? ' · ' . $v['utm_source'] . ( '' !== $v['utm_medium'] ? ' / ' . $v['utm_medium'] : '' ) : '' ) );
		$facts  = array(
			array( 'clock', __( 'When', 'om-catalog' ), wp_date( 'l, M j, Y \a\t g:i a', (int) $v['started'] ) ),
			array( self::channel_icon( $v['channel'] ), __( 'Came from', 'om-catalog' ), $from ),
			array( 'tag', __( 'Campaign', 'om-catalog' ), $camp ),
			array( self::device_icon( $v['device'] ), __( 'Device', 'om-catalog' ), self::device_one( $v['device'] ) . ' · ' . $v['browser'] . ' · ' . $v['os'] ),
			array( 'pin', __( 'Where', 'om-catalog' ), '' !== $place ? $place : str_replace( '_', ' ', (string) $v['tz'] ) ),
			/* translators: %s: visit number. */
			array( 'refresh', __( 'Visit', 'om-catalog' ), (int) $v['visit_no'] > 1 ? sprintf( __( 'Visit number %s from this browser', 'om-catalog' ), number_format_i18n( (int) $v['visit_no'] ) ) : __( 'First visit', 'om-catalog' ) ),
			/* translators: %s: pages. */
			array( 'eye', __( 'Time on site', 'om-catalog' ), self::duration( (int) $v['engaged'] ) . ' · ' . sprintf( _n( '%s page', '%s pages', (int) $v['pages'], 'om-catalog' ), number_format_i18n( (int) $v['pages'] ) ) ),
		);
		$badge = (int) $v['leads'] > 0 ? '<span class="om-ins-badge lead">' . self::icon( 'check' ) . esc_html( OM_Insights::lead_types()[ $v['lead_type'] ] ?? __( 'Lead', 'om-catalog' ) ) . '</span>' : '';
		$out   = '<div class="om-ins-visitview">';
		$out  .= '<header class="om-ins-vhead">' . self::avatar( $v['vid'], $v['lead_name'] ) . '<div><h2' . ( $drawer ? ' id="om-ins-drawer-title"' : '' ) . '>' . esc_html( self::visitor_label( $v['vid'], $v['lead_name'] ) ) . '</h2><p>' . esc_html( self::when( $v['started'] ) . ' · ' . $from ) . '</p></div>' . $badge . '</header>';
		$out  .= '<dl class="om-ins-facts">';
		foreach ( $facts as $f ) {
			if ( '' !== trim( (string) $f[2] ) ) {
				$out .= '<div><dt>' . self::icon( $f[0] ) . esc_html( $f[1] ) . '</dt><dd>' . esc_html( $f[2] ) . '</dd></div>';
			}
		}
		$out .= '</dl><h3 class="om-ins-h3">' . esc_html__( 'What they did', 'om-catalog' ) . '</h3>' . self::timeline( $events );
		$all  = count( self::visitor_visits( $v['vid'] ) );
		$out .= '<footer class="om-ins-vfoot">';
		if ( $all > 1 ) {
			/* translators: %s: number of visits. */
			$out .= '<a class="om-ins-btn" href="' . esc_url( $this->url( array( 'visit' => null, 'visitor' => $v['vid'] ) ) ) . '" ' . ( $drawer ? 'data-om-ins-drawer' : 'data-om-ins-nav' ) . '>' . self::icon( 'journeys' ) . esc_html( sprintf( __( 'All %s visits from this visitor', 'om-catalog' ), number_format_i18n( $all ) ) ) . '</a>';
		}
		if ( $drawer ) {
			$out .= '<a class="om-ins-btn ghost" href="' . esc_url( $this->url( array( 'visit' => $sid ) ) ) . '" data-om-ins-nav>' . esc_html__( 'Open as a page', 'om-catalog' ) . '</a>';
		}
		$out .= '</footer></div>';
		if ( ! $drawer ) {
			$out = '<p class="om-ins-back"><a href="' . esc_url( $this->url( array( 'visit' => null, 'tab' => 'journeys' ) ) ) . '" data-om-ins-nav>&larr; ' . esc_html__( 'All visits', 'om-catalog' ) . '</a></p>' . self::card( '', $out, array( 'class' => 'om-ins-visitcard' ) );
		}
		return $out;
	}

	/** Every visit from one visitor (as far as this browser goes). */
	public function visitor_view( $vid, $drawer = true ) {
		$rows = self::visitor_visits( $vid );
		if ( ! $rows ) {
			return self::empty_note( __( 'No visits kept for this visitor.', 'om-catalog' ) );
		}
		$name = '';
		foreach ( $rows as $r ) {
			$name = '' !== $r['lead_name'] ? $r['lead_name'] : $name;
		}
		$first = end( $rows );
		/* translators: 1: number of visits, 2: first visit date. */
		$sub  = sprintf( _n( '%1$s visit since %2$s, newest first.', '%1$s visits since %2$s, newest first.', count( $rows ), 'om-catalog' ), number_format_i18n( count( $rows ) ), wp_date( 'M j, Y', (int) $first['started'] ) );
		$out  = '<div class="om-ins-visitview"><header class="om-ins-vhead">' . self::avatar( $vid, $name ) . '<div><h2' . ( $drawer ? ' id="om-ins-drawer-title"' : '' ) . '>' . esc_html( self::visitor_label( $vid, $name ) ) . '</h2><p>' . esc_html( $sub ) . '</p></div></header>';
		$out .= '<ol class="om-ins-visits compact">' . $this->visit_rows( $rows ) . '</ol></div>';
		if ( ! $drawer ) {
			$out = '<p class="om-ins-back"><a href="' . esc_url( $this->url( array( 'visitor' => null, 'tab' => 'journeys' ) ) ) . '" data-om-ins-nav>&larr; ' . esc_html__( 'All visits', 'om-catalog' ) . '</a></p>' . self::card( '', $out, array( 'class' => 'om-ins-visitcard' ) );
		}
		return $out;
	}

	/** Actions as a readable list: pages with their time, and what happened on each. */
	public static function timeline( $events ) {
		if ( ! $events ) {
			return self::empty_note( __( 'Nothing recorded.', 'om-catalog' ) );
		}
		$out = '<ol class="om-ins-timeline">';
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
				if ( '' !== $ev['item'] ) {
					$d    = self::design( $ev['item'], self::title( $ev['label'], $ev['page'] ) );
					$name = '<a class="om-ins-design" href="' . esc_url( $d['url'] ) . '" target="_blank" rel="noopener">' . self::design_label( $ev['item'], $d['title'] ) . '</a>';
				} else {
					$link = self::page_link( $ev['page'] );
					$name = ( '' !== $link ? '<a href="' . esc_url( $link ) . '" target="_blank" rel="noopener">' : '<span>' ) . self::page_label( $ev['page'], $ev['label'] ) . ( '' !== $link ? '</a>' : '</span>' );
				}
				$out .= '<li class="pv">' . $at . '<div>' . $name . ( $extra ? '<small>' . esc_html( implode( ' · ', $extra ) ) . '</small>' : '' ) . '</div></li>';
				continue;
			}
			if ( 'view' === $type && '' !== $ev['item'] ) {
				if ( 'quick_view' !== $ev['meta'] ) {
					continue; // The page itself is already listed.
				}
				$d    = self::design( $ev['item'], $ev['label'] );
				$out .= '<li class="act">' . $at . '<div><span class="om-ins-act">' . esc_html__( 'Quick view', 'om-catalog' ) . '</span><a class="om-ins-design" href="' . esc_url( $d['url'] ) . '" target="_blank" rel="noopener">' . self::design_label( $ev['item'], $ev['label'] ) . '</a></div></li>';
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
					$out .= '<li class="lead">' . $at . '<div><strong>' . esc_html( $what ) . '</strong>' . ( '' !== $info ? '<small>' . $info . '</small>' : '' ) . '</div></li>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
					continue 2;
				case 'option':
					/* translators: 1: option (metal, ring size...), 2: what was chosen. */
					$what = sprintf( __( 'Chose %1$s: %2$s', 'om-catalog' ), function_exists( 'mb_strtolower' ) ? mb_strtolower( $what ) : strtolower( $what ), $ev['meta'] );
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
					$info = (string) $ev['meta'];
			}
			if ( '' !== $ev['item'] && in_array( $type, array( 'save', 'compare', 'share' ), true ) ) {
				$words = array( 'save' => __( 'Saved', 'om-catalog' ), 'compare' => __( 'Compared', 'om-catalog' ), 'share' => __( 'Shared', 'om-catalog' ) );
				$what  = $words[ $type ] . ' ' . self::design( $ev['item'] )['title'];
				$info  = 'compare' === $type ? '' : $info;
			}
			$out .= '<li class="act">' . $at . '<div><span class="om-ins-act">' . esc_html( $what ) . '</span>' . ( '' !== (string) $info ? '<small>' . esc_html( $info ) . '</small>' : '' ) . '</div></li>';
		}
		return $out . '</ol>';
	}
}
