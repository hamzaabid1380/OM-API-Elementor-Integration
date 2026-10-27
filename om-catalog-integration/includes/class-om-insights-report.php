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
	/** Compared with: the period just before (prev) or the same dates a year earlier (year). */
	public $cmp      = 'prev';

	public function __construct( $req = array() ) {
		$this->read( is_array( $req ) ? $req : array() );
	}

	/* ---------------------------------------------------------------
	 * Vocabulary
	 * ------------------------------------------------------------- */

	public static function tabs() {
		return array(
			'overview' => __( 'Overview', 'om-catalog' ),
			'leads'    => __( 'Leads', 'om-catalog' ),
			'sources'  => __( 'Sources', 'om-catalog' ),
			'audience' => __( 'Audience', 'om-catalog' ),
			'designs'  => __( 'Designs', 'om-catalog' ),
			'pages'    => __( 'Pages', 'om-catalog' ),
			'searches' => __( 'Searches', 'om-catalog' ),
			'actions'  => __( 'Actions', 'om-catalog' ),
			'funnels'  => __( 'Funnels', 'om-catalog' ),
			'journeys' => __( 'Journeys', 'om-catalog' ),
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
			'audience' => 'audience',
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

	/** The chart's measures: key => [ name, kind ] (kind: n number, t seconds, p percent, m money). */
	public static function metrics() {
		return array(
			'leads'     => array( __( 'Leads', 'om-catalog' ), 'n' ),
			'bookings'  => array( __( 'Visit requests', 'om-catalog' ), 'n' ),
			'calls'     => array( __( 'Calls and texts', 'om-catalog' ), 'n' ),
			'conv'      => array( __( 'Lead rate', 'om-catalog' ), 'p' ),
			'value'     => array( __( 'Value asked about', 'om-catalog' ), 'm' ),
			'visitors'  => array( __( 'Visitors', 'om-catalog' ), 'n' ),
			'visits'    => array( __( 'Visits', 'om-catalog' ), 'n' ),
			'engaged'   => array( __( 'Engaged visits', 'om-catalog' ), 'p' ),
			'pageviews' => array( __( 'Page views', 'om-catalog' ), 'n' ),
			'time'      => array( __( 'Time per visit', 'om-catalog' ), 't' ),
			'designs'   => array( __( 'Designs viewed', 'om-catalog' ), 'n' ),
			'saves'     => array( __( 'Saved (hearts)', 'om-catalog' ), 'n' ),
			'contacts'  => array( __( 'Directions and emails', 'om-catalog' ), 'n' ),
		);
	}

	/** The chart's measures in groups (for the menu above the chart): name => keys. */
	public static function metric_groups() {
		return array(
			__( 'Results', 'om-catalog' )  => array( 'leads', 'bookings', 'calls', 'conv', 'value' ),
			__( 'Visits', 'om-catalog' )   => array( 'visitors', 'visits', 'engaged', 'pageviews', 'time' ),
			__( 'Interest', 'om-catalog' ) => array( 'designs', 'saves', 'contacts' ),
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
		$this->cmp      = 'year' === sanitize_key( $get( 'cmp' ) ) ? 'year' : 'prev';
	}

	/** Days in the period. */
	public function span() {
		return (int) round( ( strtotime( $this->to . ' 12:00:00' ) - strtotime( $this->from . ' 12:00:00' ) ) / DAY_IN_SECONDS ) + 1;
	}

	/** The period it is compared with: just before and as long, or the same dates a year earlier. */
	public function previous() {
		if ( 'year' === $this->cmp ) {
			return array( gmdate( 'Y-m-d', strtotime( $this->from . ' 12:00:00 -1 year' ) ), gmdate( 'Y-m-d', strtotime( $this->to . ' 12:00:00 -1 year' ) ) );
		}
		$n = $this->span();
		$t = strtotime( $this->from . ' 12:00:00' );
		return array( gmdate( 'Y-m-d', $t - $n * DAY_IN_SECONDS ), gmdate( 'Y-m-d', $t - DAY_IN_SECONDS ) );
	}

	/** What the numbers are compared with, in words ("the period before", "the same time last year"). */
	public function compare_name( $short = false ) {
		if ( 'year' === $this->cmp ) {
			return $short ? __( 'Last year', 'om-catalog' ) : __( 'the same time last year', 'om-catalog' );
		}
		return $short ? __( 'Period before', 'om-catalog' ) : __( 'the period before', 'om-catalog' );
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
		if ( 'year' === $this->cmp ) {
			$q['cmp'] = 'year';
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
		$tkey = 'om_ins_c_' . md5( $key . '|' . $this->from . '|' . $this->to . '|' . $this->cmp . '|' . wp_json_encode( $this->filters ) . '|' . OM_CATALOG_VERSION );
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

	/**
	 * A visit that left at once: one page, under 10 seconds, no design opened, no lead, and (1.48) no tap to
	 * call, text, email or get directions, so a visitor who lands and taps Call is not a quick exit.
	 */
	private static function quick_sql() {
		return 'pages <= 1 AND engaged < 10 AND leads = 0 AND products = 0' . ( OM_Insights::has_contacts() ? ' AND contacts = 0' : '' );
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
			if ( 'ref' === $key ) {
				// A website and its own subdomains (facebook.com takes in l.facebook.com and m.facebook.com).
				global $wpdb;
				$sql .= ' AND (ref_host = %s OR ref_host LIKE %s)';
				array_push( $args, $value, '%.' . $wpdb->esc_like( $value ) );
			} elseif ( isset( $cols[ $key ] ) ) {
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
				SUM(CASE WHEN " . self::quick_sql() . " THEN 1 ELSE 0 END) AS quick
			FROM {$s} WHERE day BETWEEN %s AND %s{$vs}",
			array_merge( array( $from, $to ), $va )
		);
		$a = array();
		foreach ( self::rows( "SELECT type, COUNT(*) AS n FROM {$e} WHERE day BETWEEN %s AND %s AND type IN ('lead','compare','search','call','text','email','directions','share'){$es} GROUP BY type", array_merge( array( $from, $to ), $ea ) ) as $r ) {
			$a[ $r['type'] ] = (int) $r['n'];
		}
		$visits = (int) ( $v['visits'] ?? 0 );
		$kinds  = $this->lead_kinds( $from, $to );
		$groups = self::group_counts( $kinds );
		$value  = $this->lead_value( $from, $to );
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
			// Taps on the phone number or a Text button: people reaching for the phone (the call happens off the site).
			'calls'      => ( $a['call'] ?? 0 ) + ( $a['text'] ?? 0 ),
			'phone'      => $a['call'] ?? 0,
			'texts'      => $a['text'] ?? 0,
			'directions' => $a['directions'] ?? 0,
			'shares'     => $a['share'] ?? 0,
			'emails'     => $a['email'] ?? 0,
			// The other taps that reach the shop away from the site's forms: directions and emails.
			'contacts'   => ( $a['email'] ?? 0 ) + ( $a['directions'] ?? 0 ),
			// Visits that did more than glance (the opposite of a quick exit).
			'engaged'    => $visits ? 100 - 100 * (int) $v['quick'] / $visits : 0,
			'bookings'   => $kinds['booking'] ?? 0,
			'kinds'      => $kinds,
			'groups'     => $groups,
			'value'      => $value['value'],
			'valued'     => $value['leads'],
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
		$sum     = array( 'visits' => $zero, 'visitors' => $zero, 'pv' => $zero, 'eng' => $zero, 'pr' => $zero, 'sv' => $zero, 'cv' => $zero, 'qk' => $zero, 'leads' => $zero, 'book' => $zero, 'ct' => $zero, 'cl' => $zero );
		$groups  = array_fill_keys( array_keys( self::lead_groups() ), $zero );
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
				COALESCE(SUM(products), 0) AS pr, COALESCE(SUM(saves), 0) AS sv, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS cv,
				SUM(CASE WHEN " . self::quick_sql() . " THEN 1 ELSE 0 END) AS qk
			FROM {$s} WHERE day BETWEEN %s AND %s{$vs} GROUP BY b",
			array_merge( $keys, array( $from, $to ), $va )
		) as $r ) {
			$i = $index[ (string) $r['b'] ] ?? null;
			if ( null === $i ) {
				continue;
			}
			foreach ( array( 'visits', 'visitors', 'pv', 'eng', 'pr', 'sv', 'cv', 'qk' ) as $k ) {
				$sum[ $k ][ $i ] = (int) $r[ $k ];
			}
		}
		foreach ( self::rows( "SELECT {$col} AS b, label, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND day BETWEEN %s AND %s{$es} GROUP BY b, label", array_merge( $keys, array( $from, $to ), $ea ) ) as $r ) {
			$i = $index[ (string) $r['b'] ] ?? null;
			if ( null !== $i ) {
				$sum['leads'][ $i ] += (int) $r['n'];
				$groups[ self::lead_group( $r['label'] ) ][ $i ] += (int) $r['n'];
				if ( 'booking' === $r['label'] ) {
					$sum['book'][ $i ] += (int) $r['n'];
				}
			}
		}
		foreach ( self::rows( "SELECT {$col} AS b, type, COUNT(*) AS n FROM {$e} WHERE type IN ('call','text','email','directions') AND day BETWEEN %s AND %s{$es} GROUP BY b, type", array_merge( $keys, array( $from, $to ), $ea ) ) as $r ) {
			$i = $index[ (string) $r['b'] ] ?? null;
			if ( null !== $i ) {
				$sum[ in_array( $r['type'], array( 'call', 'text' ), true ) ? 'cl' : 'ct' ][ $i ] += (int) $r['n'];
			}
		}
		// What the leads were worth: the designs named, at their listed prices.
		$sum['val'] = $zero;
		$named      = self::rows( "SELECT {$col} AS b, item, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND item <> '' AND day BETWEEN %s AND %s{$es} GROUP BY b, item", array_merge( $keys, array( $from, $to ), $ea ) );
		$prices     = self::prices( wp_list_pluck( $named, 'item' ) );
		foreach ( $named as $r ) {
			$i = $index[ (string) $r['b'] ] ?? null;
			if ( null !== $i && ! empty( $prices[ $r['item'] ] ) ) {
				$sum['val'][ $i ] += $prices[ $r['item'] ] * (int) $r['n'];
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
			$m['engaged'][]   = $visits ? round( 100 * ( $visits - $sum['qk'][ $i ] ) / $visits, 1 ) : 0;
			$m['bookings'][]  = $sum['book'][ $i ];
			$m['contacts'][]  = $sum['ct'][ $i ];
			$m['calls'][]     = $sum['cl'][ $i ];
			$m['value'][]     = (int) round( $sum['val'][ $i ] );
		}
		$utc    = new DateTimeZone( 'UTC' );
		$labels = array();
		$tips   = array();
		$short  = array();
		foreach ( $buckets as $i => $b ) {
			$t0 = strtotime( $b[0] . ' 12:00:00' );
			$t1 = strtotime( $b[1] . ' 12:00:00' );
			// A week or month cut short by the period's ends: fewer days, so lower numbers.
			$days      = (int) round( ( $t1 - $t0 ) / DAY_IN_SECONDS ) + 1;
			$full      = 'week' === $unit ? 7 : ( 'month' === $unit ? (int) gmdate( 't', $t0 ) : $days );
			$short[]   = $days < $full;
			/* translators: %s: number of days. */
			$few       = $days < $full ? ' · ' . sprintf( _n( '%s day', '%s days', $days, 'om-catalog' ), number_format_i18n( $days ) ) : '';
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
				$tips[] = sprintf( __( '%1$s to %2$s', 'om-catalog' ), wp_date( 'M j', $t0 ), wp_date( 'M j, Y', $t1 ) ) . $few;
			} else {
				$labels[] = wp_date( 'M', $t0 ) . ( '01' === gmdate( 'm', $t0 ) || 0 === $i ? ' ' . gmdate( 'Y', $t0 ) : '' );
				$whole    = gmdate( 'd', $t0 ) === '01' && gmdate( 'Y-m-t', $t0 ) === $b[1];
				/* translators: 1: first day, 2: last day. */
				$tips[] = $whole ? wp_date( 'F Y', $t0 ) : sprintf( __( '%1$s to %2$s', 'om-catalog' ), wp_date( 'M j', $t0 ), wp_date( 'M j, Y', $t1 ) ) . $few;
			}
		}
		return array( 'labels' => $labels, 'tips' => $tips, 'm' => $m, 'g' => $groups, 'short' => $short );
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
		// Leads of each group, this period (for the stacked chart).
		$g = array();
		foreach ( $cur['g'] as $key => $values ) {
			$g[ $key ] = $values;
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
			// Weeks or months cut short by the period's ends (this period, the one compared with).
			'short'   => $cur['short'],
			'pshort'  => array_pad( array_slice( $prev['short'], 0, $n ), $n, false ),
			'm'       => $m,
			'g'       => $g,
			// What the dashed line is ("the period before", "the same time last year").
			'vs'      => $this->compare_name(),
			'vsShort' => $this->compare_name( true ),
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
		// Money as the site writes it ("$%s"), for the axis and the tooltip.
		$money = str_replace( '0', '%s', self::money( 0 ) );
		return $chart + array( 'names' => $names, 'kinds' => $kinds, 'money' => false !== strpos( $money, '%s' ) ? $money : '$%s' );
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

	/**
	 * Everything the downloadable report shows for this period and these
	 * filters, kept a few minutes like the sections ("Refresh" skips it).
	 */
	public function report_data() {
		$span  = $this->span();
		$unit  = $this->unit();
		$table = 1 === $span ? 'hour' : ( $span <= 62 ? 'day' : ( $span <= 400 ? 'week' : 'month' ) );
		$bars  = 1 === $span ? 'hour' : ( $span <= 35 ? 'day' : ( $span <= 250 ? 'week' : 'month' ) );
		return $this->cached(
			'report|' . $unit . '|' . $table . '|' . $bars,
			function () use ( $unit, $table, $bars ) {
				list( $pf, $pt ) = $this->previous();
				$landing         = $this->by_visit( 'landing', 12 );
				$e               = OM_Insights::events_table();
				list( $es, $ea ) = $this->escope( $this->from, $this->to );
				$leads           = $this->leads( 100 );
				$charts          = array( $unit => $this->chart( $unit ) );
				foreach ( array( $table, $bars ) as $u ) {
					if ( ! isset( $charts[ $u ] ) ) {
						$charts[ $u ] = $this->chart( $u );
					}
				}
				return array(
					'now'        => $this->kpis( $this->from, $this->to ),
					'before'     => $this->kpis( $pf, $pt ),
					'chart'      => $charts[ $unit ],
					'table'      => $charts[ $table ],
					'bars'       => $charts[ $bars ],
					'channels'   => $this->by_visit( 'channel', 12 ),
					'refs'       => $this->by_visit( 'ref_host', 10, "AND ref_host <> ''" ),
					'camps'      => $this->campaigns(),
					'landing'    => $landing,
					'titles'     => $this->page_titles( wp_list_pluck( $landing, 'k' ) ),
					'devices'    => $this->by_visit( 'device', 3 ),
					'browsers'   => $this->by_visit( 'browser', 6 ),
					'os'         => $this->by_visit( 'os', 6 ),
					'loc'        => $this->locations( 10 ),
					'heat'       => $this->heat(),
					'pages'      => $this->pages( 20 ),
					'products'   => $this->products( 400 ),
					'lines'      => $this->lines(),
					'options'    => $this->options(),
					'pairs'      => $this->compare_groups(),
					'search'     => $this->searches( 15 ),
					'actions'    => $this->actions(),
					'cta'        => $this->clicks( 'cta', 12 ),
					'call'       => $this->clicks( 'call', 20 ),
					'text'       => $this->clicks( 'text', 20 ),
					'directions' => $this->clicks( 'directions', 10 ),
					'outbound'   => $this->clicks( 'outbound', 10 ),
					'funnels'    => $this->funnels(),
					'funnels_b'  => $this->funnels( $pf, $pt ),
					'leads'      => $leads,
					'prices'     => self::prices( wp_list_pluck( $leads, 'item' ) ),
					'lead_kinds' => self::rows( "SELECT label AS k, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND day BETWEEN %s AND %s{$es} GROUP BY label ORDER BY n DESC", array_merge( array( $this->from, $this->to ), $ea ) ),
					// Insights 2.0: what stood out, where leads began, the audience, speed, missing pages, prices.
					'findings'   => $this->findings( $this->findings_data(), 10 ),
					'attr'       => $this->attribution(),
					'audience'   => $this->audience(),
					'webs'       => $this->websites( 10 ),
					'bands'      => $this->bands(),
					'movers'     => $this->movers( 6 ),
					'together'   => $this->together( 8 ),
					'speed'      => $this->speed(),
					'missing'    => $this->not_found(),
					'pace'       => self::pace(),
				);
			}
		);
	}

	/** What the one-page summary needs: the overview's numbers (much lighter than report_data()). */
	public function summary_data() {
		return $this->cached(
			'summary',
			function () {
				$f = $this->findings_data();
				return array(
					'now'      => $f['now'],
					'before'   => $f['before'],
					'chart'    => $this->chart( $this->unit() ),
					'findings' => $this->findings( $f, 12 ),
					'attr'     => $f['attr'],
					'designs'  => $f['designs'],
					'pace'     => $f['pace'],
				);
			}
		);
	}

	/** The address of the PDF report for this period and these filters ($one: the one-page summary). */
	public function report_url( $names = true, $one = false ) {
		$q = array( 'action' => 'om_ins_report', 'range' => $this->range );
		if ( 'custom' === $this->range ) {
			$q['from'] = $this->from;
			$q['to']   = $this->to;
		}
		if ( $this->filters ) {
			$q['f'] = $this->filters;
		}
		if ( 'year' === $this->cmp ) {
			$q['cmp'] = 'year';
		}
		$q['names'] = $names ? 1 : 0;
		if ( $one ) {
			$q['one'] = 1;
		}
		$q['_wpnonce'] = wp_create_nonce( 'om_ins_report' );
		return admin_url( 'admin-post.php' ) . '?' . http_build_query( $q, '', '&', PHP_QUERY_RFC3986 );
	}

	/** The "Report" button and its menu (in the bar at the top). */
	public function report_button() {
		$filters = array();
		foreach ( $this->filters as $key => $value ) {
			$filters[] = self::filter_names()[ $key ] . ': ' . $this->filter_text( $key, $value );
		}
		$out  = '<div class="om-ins-report" data-om-ins-report>';
		$out .= '<button type="button" class="om-ins-btn om-ins-report-btn" aria-haspopup="true" aria-expanded="false" data-om-ins-report-btn>' . self::icon( 'download' ) . '<span>' . esc_html__( 'Report', 'om-catalog' ) . '</span></button>';
		$out .= '<div class="om-ins-pop om-ins-report-pop" data-om-ins-report-pop hidden>';
		$out .= '<p class="om-ins-pop-t">' . esc_html__( 'PDF report', 'om-catalog' ) . '</p>';
		$out .= '<p class="om-ins-pop-sub">' . esc_html( $this->period_text() ) . ( $filters ? '<br />' . esc_html( implode( ' · ', $filters ) ) : '' ) . '</p>';
		/* translators: %s: "the period before" or "the same time last year". */
		$out .= '<p class="om-ins-pop-note">' . esc_html( sprintf( __( 'One page: the results, calls and texts, visits, and what stood out with what to do next. Full report: every section of Insights with all its numbers. Both compared with %s, in your brand.', 'om-catalog' ), $this->compare_name() ) ) . '</p>';
		$out .= '<label class="om-ins-check"><input type="checkbox" checked data-om-ins-report-names /><span>' . esc_html__( 'Include the names of people who got in touch', 'om-catalog' ) . '</span></label>';
		$out .= '<a class="om-ins-btn primary om-ins-report-dl" href="' . esc_url( $this->report_url( true, true ) ) . '" data-om-ins-report-dl>' . self::icon( 'download' ) . '<span>' . esc_html__( 'One-page summary', 'om-catalog' ) . '</span></a>';
		$out .= '<a class="om-ins-btn om-ins-report-dl is-full" href="' . esc_url( $this->report_url( true ) ) . '" data-om-ins-report-dl>' . self::icon( 'download' ) . '<span>' . esc_html__( 'Full report', 'om-catalog' ) . '</span></a>';
		return $out . '</div></div>';
	}

	/** A sentence for the site's privacy policy. */
	public static function policy_text() {
		$months = OM_Insights::months();
		/* translators: %d: months the data is kept. */
		return sprintf( _n( 'We use our own website analytics to understand how visitors use our site. It stores anonymous IDs in two cookies and records the pages and designs viewed. This information stays on our website, is not shared or sold, and is deleted after %d month.', 'We use our own website analytics to understand how visitors use our site. It stores anonymous IDs in two cookies and records the pages and designs viewed. This information stays on our website, is not shared or sold, and is deleted after %d months.', $months, 'om-catalog' ), $months );
	}

	/* ---------- Lists ---------- */

	/** One column of the visits table, ranked. */
	public function by_visit( $column, $limit = 12, $where = '', $from = '', $to = '' ) {
		$allowed = array( 'channel', 'ref_host', 'landing', 'exit_page', 'device', 'browser', 'os', 'country', 'region', 'city', 'tz', 'lang', 'utm_source', 'utm_campaign' );
		if ( ! in_array( $column, $allowed, true ) ) {
			return array();
		}
		$from = '' !== $from ? $from : $this->from;
		$to   = '' !== $to ? $to : $this->to;
		$s    = OM_Insights::sessions_table();
		list( $vs, $va ) = $this->vscope( $from, $to );
		return self::rows(
			"SELECT {$column} AS k, COUNT(*) AS visits, COUNT(DISTINCT vid) AS visitors, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted,
				COALESCE(AVG(pages), 0) AS pages, COALESCE(AVG(engaged), 0) AS engaged,
				SUM(CASE WHEN " . self::quick_sql() . " THEN 1 ELSE 0 END) AS quick
			FROM {$s} WHERE day BETWEEN %s AND %s {$where}{$vs} GROUP BY {$column} ORDER BY visits DESC LIMIT %d",
			array_merge( array( $from, $to ), $va, array( $limit ) )
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
		foreach ( self::rows( "SELECT landing AS k, COUNT(*) AS n, SUM(CASE WHEN " . self::quick_sql() . " THEN 1 ELSE 0 END) AS quick, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted FROM {$s} WHERE day BETWEEN %s AND %s{$vs} GROUP BY landing", array_merge( array( $this->from, $this->to ), $va ) ) as $r ) {
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

	/** How many different designs were seen, and how many leads named one (hints apart), however many there are. */
	public function design_counts() {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		$r = self::row(
			"SELECT COUNT(DISTINCT CASE WHEN type = 'view' THEN item END) AS seen, SUM(CASE WHEN type = 'lead' AND label <> 'hint' THEN 1 ELSE 0 END) AS asked
			FROM {$e} WHERE day BETWEEN %s AND %s AND item <> '' AND type IN ('view','lead'){$es}",
			array_merge( array( $this->from, $this->to ), $ea )
		);
		return array( 'seen' => (int) ( $r['seen'] ?? 0 ), 'asked' => (int) ( $r['asked'] ?? 0 ) );
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
			WHERE day BETWEEN %s AND %s AND type IN ('save','compare','share','option','builder','diamond','designer','hint','assistant','quiz','booking','call','text','email','directions','outbound','cta','search','filter','view','welcome','film'){$es}
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
	public function funnels( $from = '', $to = '' ) {
		$from = '' !== $from ? $from : $this->from;
		$to   = '' !== $to ? $to : $this->to;
		$e    = OM_Insights::events_table();
		$s    = OM_Insights::sessions_table();
		list( $vs, $va ) = $this->vscope( $from, $to );
		list( $es, $ea ) = $this->escope( $from, $to );
		$args = array( $from, $to );
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
		// Each lead's visitor's visits (for "days to decide" and how many visits it took, up to the lead only).
		$vids   = array_values( array_unique( array_filter( wp_list_pluck( $rows, 'vid' ) ) ) );
		$starts = array();
		foreach ( array_chunk( $vids, 200 ) as $chunk ) {
			$place = implode( ',', array_fill( 0, count( $chunk ), '%s' ) );
			foreach ( self::rows( 'SELECT vid, started FROM ' . $s . " WHERE vid IN ({$place}) ORDER BY started", $chunk ) as $r ) {
				$starts[ $r['vid'] ][] = (int) $r['started'];
			}
		}
		$titles = $this->page_titles( wp_list_pluck( $rows, 'landing' ), gmdate( 'Y-m-d', strtotime( $this->from . ' 12:00:00' ) - DAY_IN_SECONDS ), $this->to );
		foreach ( $rows as &$r ) {
			$at = (int) $r['ts'];
			$up = array_filter(
				$starts[ $r['vid'] ] ?? array(),
				static function ( $t ) use ( $at ) {
					return $t <= $at;
				}
			);
			$r['first']         = $up ? (int) min( $up ) : 0;
			$r['visits']        = count( $up );
			$r['landing_title'] = $titles[ (string) $r['landing'] ] ?? '';
		}
		unset( $r );
		return $rows;
	}

	/* ---------------------------------------------------------------
	 * Deeper measures (1.44): leads by how close they are to a sale and
	 * what they were worth, where leads really began and how long people
	 * took, price bands, designs on the move and viewed together, the
	 * audience, page speed, missing pages and the month's goals.
	 * ------------------------------------------------------------- */

	/** Leads by how close they are to a sale: key => [ name, lead kinds ]. */
	public static function lead_groups() {
		return array(
			'visit'  => array( __( 'Visit requests', 'om-catalog' ), array( 'booking' ) ),
			'ask'    => array( __( 'Inquiries and hints', 'om-catalog' ), array( 'inquiry', 'hint' ) ),
			'emails' => array( __( 'Designs emailed', 'om-catalog' ), array( 'ring_design', 'saved_list', 'quiz_email' ) ),
			'signup' => array( __( 'Newsletter sign-ups', 'om-catalog' ), array( 'newsletter' ) ),
		);
	}

	/** The group of a lead kind. */
	public static function lead_group( $kind ) {
		foreach ( self::lead_groups() as $key => $group ) {
			if ( in_array( (string) $kind, $group[1], true ) ) {
				return $key;
			}
		}
		return 'ask';
	}

	/** Leads of each kind in a period (with this view's filters): kind => n. */
	public function lead_kinds( $from, $to ) {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $from, $to );
		$out = array();
		foreach ( self::rows( "SELECT label, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND day BETWEEN %s AND %s{$es} GROUP BY label", array_merge( array( $from, $to ), $ea ) ) as $r ) {
			$out[ (string) $r['label'] ] = (int) $r['n'];
		}
		return $out;
	}

	/** Leads of each group from kind counts: group => n. */
	public static function group_counts( $kinds ) {
		$out = array_fill_keys( array_keys( self::lead_groups() ), 0 );
		foreach ( (array) $kinds as $kind => $n ) {
			$out[ self::lead_group( $kind ) ] += (int) $n;
		}
		return $out;
	}

	/** The listed price of designs ("line|STYLE" => price): the average price shown when they were viewed. */
	public static function prices( $items ) {
		$items = array_values( array_unique( array_filter( array_map( 'strval', (array) $items ) ) ) );
		$out   = array();
		$e     = OM_Insights::events_table();
		foreach ( array_chunk( $items, 150 ) as $chunk ) {
			$place = implode( ',', array_fill( 0, count( $chunk ), '%s' ) );
			foreach ( self::rows( "SELECT item, AVG(val) AS price FROM {$e} WHERE type = 'view' AND val > 0 AND item IN ({$place}) GROUP BY item", $chunk ) as $r ) {
				$out[ (string) $r['item'] ] = (float) $r['price'];
			}
		}
		return $out;
	}

	/** What the leads were worth: the designs people asked about, at their listed prices. */
	public function lead_value( $from, $to ) {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $from, $to );
		$rows   = self::rows( "SELECT item, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND item <> '' AND day BETWEEN %s AND %s{$es} GROUP BY item", array_merge( array( $from, $to ), $ea ) );
		$prices = self::prices( wp_list_pluck( $rows, 'item' ) );
		$value  = 0.0;
		$leads  = 0;
		foreach ( $rows as $r ) {
			if ( ! empty( $prices[ $r['item'] ] ) ) {
				$value += $prices[ $r['item'] ] * (int) $r['n'];
				$leads += (int) $r['n'];
			}
		}
		return array( 'value' => $value, 'leads' => $leads, 'avg' => $leads ? $value / $leads : 0 );
	}

	/** $1,250 (whole dollars). */
	public static function money( $value ) {
		return function_exists( 'om_format_price_short' ) ? om_format_price_short( $value ) : '$' . number_format_i18n( round( (float) $value ) );
	}

	/** $184K, $1.2M: big amounts in a tile. */
	public static function money_short( $value ) {
		$value = (float) $value;
		return $value >= 10000 ? '$' . self::compact( $value ) : self::money( $value );
	}

	/**
	 * Where this period's leads began: the channel of each lead's own visit (last visit),
	 * of the first visit this site knows from the same visitor (first visit), and of the
	 * visits in between (helped); plus how many days and visits it took.
	 */
	public function attribution() {
		$e = OM_Insights::events_table();
		$s = OM_Insights::sessions_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to, 'e' );
		$leads = self::rows(
			"SELECT e.label AS kind, v.sid, v.vid, v.channel, v.started FROM {$e} e JOIN {$s} v ON v.sid = e.sid WHERE e.type = 'lead' AND e.day BETWEEN %s AND %s{$es} ORDER BY e.ts DESC LIMIT 5000",
			array_merge( array( $this->from, $this->to ), $ea )
		);
		$history = array();
		$vids    = array_values( array_unique( array_filter( wp_list_pluck( $leads, 'vid' ) ) ) );
		foreach ( array_chunk( $vids, 200 ) as $chunk ) {
			$place = implode( ',', array_fill( 0, count( $chunk ), '%s' ) );
			foreach ( self::rows( "SELECT vid, started, channel FROM {$s} WHERE vid IN ({$place}) ORDER BY started", $chunk ) as $r ) {
				$history[ $r['vid'] ][] = array( (int) $r['started'], (string) $r['channel'] );
			}
		}
		$by     = array();
		$days   = array_fill_keys( array( 'visit', 'day', 'week', 'month', 'more' ), 0 );
		$visits = array_fill_keys( array( '1', '2', '3', '5' ), 0 );
		$dlist  = array();
		$vlist  = array();
		$add    = static function ( &$by, $channel, $key ) {
			if ( ! isset( $by[ $channel ] ) ) {
				$by[ $channel ] = array( 'last' => 0, 'first' => 0, 'helped' => 0 );
			}
			++$by[ $channel ][ $key ];
		};
		foreach ( $leads as $l ) {
			$at     = (int) $l['started'];
			$before = array();
			foreach ( $history[ $l['vid'] ] ?? array() as $h ) {
				if ( $h[0] < $at ) {
					$before[] = $h;
				}
			}
			$first = $before ? $before[0] : array( $at, (string) $l['channel'] );
			$add( $by, (string) $l['channel'], 'last' );
			$add( $by, $first[1], 'first' );
			$helped = array();
			foreach ( $before as $h ) {
				$helped[ $h[1] ] = true;
			}
			unset( $helped[ (string) $l['channel'] ] );
			foreach ( array_keys( $helped ) as $channel ) {
				$add( $by, $channel, 'helped' );
			}
			$n = count( $before ) + 1;
			$d = max( 0, ( $at - $first[0] ) / DAY_IN_SECONDS );
			if ( 1 === $n ) {
				++$days['visit'];
			} elseif ( $d < 1 ) {
				++$days['day'];
			} elseif ( $d <= 7 ) {
				++$days['week'];
			} elseif ( $d <= 30 ) {
				++$days['month'];
			} else {
				++$days['more'];
			}
			++$visits[ $n >= 5 ? '5' : ( $n >= 3 ? '3' : (string) $n ) ];
			// How long the ones who came back took (those who got in touch on their first visit took no time).
			if ( $n > 1 ) {
				$dlist[] = $d;
				$vlist[] = $n;
			}
		}
		uasort(
			$by,
			static function ( $a, $b ) {
				return ( $b['last'] + $b['first'] ) <=> ( $a['last'] + $a['first'] );
			}
		);
		// Leads with no visit behind them (a browser that asks not to be tracked, tracking blocked, a calendar
		// booking that couldn't be matched to its visit): a source of their own, so the sources add up to every lead.
		$unlinked = 0;
		if ( ! $this->filters ) {
			$unlinked = (int) ( self::row( "SELECT COUNT(*) AS n FROM {$e} e LEFT JOIN {$s} v ON v.sid = e.sid WHERE e.type = 'lead' AND e.day BETWEEN %s AND %s AND v.sid IS NULL", array( $this->from, $this->to ) )['n'] ?? 0 );
			if ( $unlinked ) {
				$by['none'] = array( 'last' => $unlinked, 'first' => $unlinked, 'helped' => 0 );
			}
		}
		return array(
			'unlinked' => $unlinked,
			'by'     => $by,
			'days'   => $days,
			'visits' => $visits,
			// Typical days and visits for leads that came back before getting in touch.
			'dmed'   => self::median( $dlist ),
			'vmed'   => self::median( $vlist ),
			'back'   => count( $vlist ),
			'total'  => count( $leads ),
		);
	}

	public static function median( $list ) {
		$list = array_values( (array) $list );
		$n    = count( $list );
		if ( ! $n ) {
			return 0;
		}
		sort( $list );
		return $n % 2 ? $list[ ( $n - 1 ) / 2 ] : ( $list[ $n / 2 - 1 ] + $list[ $n / 2 ] ) / 2;
	}

	/** The value at the 75th percentile (how Google judges page speed). */
	public static function p75( $list ) {
		$list = array_values( (array) $list );
		$n    = count( $list );
		if ( ! $n ) {
			return 0;
		}
		sort( $list );
		return $list[ (int) min( $n - 1, max( 0, ceil( 0.75 * $n ) - 1 ) ) ];
	}

	/** Price bands: [ from, below ] (0: no limit). */
	public static function price_bands() {
		return array( array( 0, 1000 ), array( 1000, 2500 ), array( 2500, 5000 ), array( 5000, 10000 ), array( 10000, 0 ) );
	}

	public static function band_name( $i ) {
		$b = self::price_bands()[ $i ] ?? array( 0, 0 );
		if ( ! $b[0] ) {
			/* translators: %s: amount. */
			return sprintf( __( 'Under %s', 'om-catalog' ), self::money( $b[1] ) );
		}
		if ( ! $b[1] ) {
			/* translators: %s: amount. */
			return sprintf( __( '%s and up', 'om-catalog' ), self::money( $b[0] ) );
		}
		return self::money( $b[0] ) . ' – ' . self::money( $b[1] - 1 );
	}

	private static function band_of( $price ) {
		foreach ( self::price_bands() as $i => $b ) {
			if ( $price >= $b[0] && ( ! $b[1] || $price < $b[1] ) ) {
				return $i;
			}
		}
		return 0;
	}

	/** Interest by price: views, visits, saves and leads for designs in each band. */
	public function bands() {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to );
		$out  = array_fill( 0, count( self::price_bands() ), array( 'views' => 0, 'visits' => 0, 'designs' => 0, 'saves' => 0, 'leads' => 0 ) );
		$case = 'CASE';
		foreach ( self::price_bands() as $i => $b ) {
			$case .= $b[1] ? ' WHEN val < ' . (int) $b[1] . ' THEN ' . (int) $i : '';
		}
		$case .= ' ELSE ' . ( count( self::price_bands() ) - 1 ) . ' END';
		foreach ( self::rows( "SELECT {$case} AS b, COUNT(*) AS views, COUNT(DISTINCT sid) AS visits, COUNT(DISTINCT item) AS designs FROM {$e} WHERE type = 'view' AND val > 0 AND day BETWEEN %s AND %s{$es} GROUP BY b", array_merge( array( $this->from, $this->to ), $ea ) ) as $r ) {
			$i = (int) $r['b'];
			if ( isset( $out[ $i ] ) ) {
				$out[ $i ]['views']   = (int) $r['views'];
				$out[ $i ]['visits']  = (int) $r['visits'];
				$out[ $i ]['designs'] = (int) $r['designs'];
			}
		}
		$rows   = self::rows( "SELECT item, type, COUNT(*) AS n FROM {$e} WHERE type IN ('save','lead') AND item <> '' AND day BETWEEN %s AND %s{$es} GROUP BY item, type", array_merge( array( $this->from, $this->to ), $ea ) );
		$prices = self::prices( wp_list_pluck( $rows, 'item' ) );
		foreach ( $rows as $r ) {
			if ( ! empty( $prices[ $r['item'] ] ) ) {
				$out[ self::band_of( $prices[ $r['item'] ] ) ][ 'save' === $r['type'] ? 'saves' : 'leads' ] += (int) $r['n'];
			}
		}
		return $out;
	}

	/** Views of each design in a period: item => [ views, title ]. */
	private function design_views( $from, $to ) {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $from, $to );
		$out = array();
		foreach ( self::rows( "SELECT item, COUNT(*) AS n, MAX(label) AS title FROM {$e} WHERE type = 'view' AND item <> '' AND day BETWEEN %s AND %s{$es} GROUP BY item", array_merge( array( $from, $to ), $ea ) ) as $r ) {
			$out[ (string) $r['item'] ] = array( (int) $r['n'], (string) $r['title'] );
		}
		return $out;
	}

	/** Designs on the move: [ rising, falling ], each [ item, title, now, before ]. */
	public function movers( $limit = 8 ) {
		list( $pf, $pt ) = $this->previous();
		$now  = $this->design_views( $this->from, $this->to );
		$was  = $this->design_views( $pf, $pt );
		$list = array();
		foreach ( array_keys( $now + $was ) as $item ) {
			$a = $now[ $item ][0] ?? 0;
			$b = $was[ $item ][0] ?? 0;
			// A real move, not chance (1.48): at least 5 views apart and rarely that far apart by chance.
			if ( max( $a, $b ) >= 8 && abs( $a - $b ) >= 5 && self::chance_counts( $a, $b ) < 0.05 ) {
				$list[] = array( 'item' => $item, 'title' => $now[ $item ][1] ?? ( $was[ $item ][1] ?? '' ), 'now' => $a, 'before' => $b, 'diff' => $a - $b );
			}
		}
		$up   = array_values( array_filter( $list, static function ( $r ) { return $r['diff'] > 0; } ) );
		$down = array_values( array_filter( $list, static function ( $r ) { return $r['diff'] < 0; } ) );
		usort( $up, static function ( $x, $y ) { return $y['diff'] <=> $x['diff']; } );
		usort( $down, static function ( $x, $y ) { return $x['diff'] <=> $y['diff']; } );
		return array( array_slice( $up, 0, $limit ), array_slice( $down, 0, $limit ) );
	}

	/** Designs looked at in the same visit: [ a, b, visits ]. */
	public function together( $limit = 10 ) {
		$e = OM_Insights::events_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to, 'a' );
		return self::rows(
			"SELECT a.item AS a, b.item AS b, COUNT(DISTINCT a.sid) AS visits FROM {$e} a JOIN {$e} b ON b.sid = a.sid AND b.type = 'view' AND b.item > a.item AND b.day BETWEEN %s AND %s
			WHERE a.type = 'view' AND a.item <> '' AND a.day BETWEEN %s AND %s{$es} GROUP BY a.item, b.item ORDER BY visits DESC LIMIT %d",
			array_merge( array( $this->from, $this->to, $this->from, $this->to ), $ea, array( $limit ) )
		);
	}

	/** New and returning (with how they did), how often people came, and their languages. */
	public function audience() {
		$s = OM_Insights::sessions_table();
		list( $vs, $va ) = $this->vscope( $this->from, $this->to );
		$args  = array_merge( array( $this->from, $this->to ), $va );
		$kinds = array();
		foreach ( self::rows( "SELECT is_new, COUNT(*) AS visits, COUNT(DISTINCT vid) AS visitors, SUM(CASE WHEN leads > 0 THEN 1 ELSE 0 END) AS converted, COALESCE(AVG(engaged), 0) AS engaged, COALESCE(AVG(pages), 0) AS pages, SUM(CASE WHEN " . self::quick_sql() . " THEN 1 ELSE 0 END) AS quick FROM {$s} WHERE day BETWEEN %s AND %s{$vs} GROUP BY is_new", $args ) as $r ) {
			$kinds[ (int) $r['is_new'] ? 'new' : 'returning' ] = $r;
		}
		$freq = array_fill_keys( array( '1', '2', '3', '5' ), 0 );
		foreach ( self::rows( "SELECT n, COUNT(*) AS visitors FROM (SELECT vid, COUNT(*) AS n FROM {$s} WHERE day BETWEEN %s AND %s{$vs} GROUP BY vid) t GROUP BY n", $args ) as $r ) {
			$n = (int) $r['n'];
			$freq[ $n >= 5 ? '5' : ( $n >= 3 ? '3' : (string) max( 1, $n ) ) ] += (int) $r['visitors'];
		}
		return array(
			'kinds' => $kinds,
			'freq'  => $freq,
			'langs' => $this->by_visit( 'lang', 10, "AND lang <> ''" ),
		);
	}

	/** A browser language code in words: "en-us" => "English (US)". */
	public static function language( $code ) {
		$code  = strtolower( (string) $code );
		$names = array(
			'en' => __( 'English', 'om-catalog' ),
			'es' => __( 'Spanish', 'om-catalog' ),
			'pl' => __( 'Polish', 'om-catalog' ),
			'fr' => __( 'French', 'om-catalog' ),
			'de' => __( 'German', 'om-catalog' ),
			'it' => __( 'Italian', 'om-catalog' ),
			'pt' => __( 'Portuguese', 'om-catalog' ),
			'zh' => __( 'Chinese', 'om-catalog' ),
			'ar' => __( 'Arabic', 'om-catalog' ),
			'hi' => __( 'Hindi', 'om-catalog' ),
			'ko' => __( 'Korean', 'om-catalog' ),
			'ja' => __( 'Japanese', 'om-catalog' ),
			'ru' => __( 'Russian', 'om-catalog' ),
			'uk' => __( 'Ukrainian', 'om-catalog' ),
			'tl' => __( 'Tagalog', 'om-catalog' ),
			'vi' => __( 'Vietnamese', 'om-catalog' ),
			'el' => __( 'Greek', 'om-catalog' ),
			'sr' => __( 'Serbian', 'om-catalog' ),
			'hr' => __( 'Croatian', 'om-catalog' ),
			'ro' => __( 'Romanian', 'om-catalog' ),
			'nl' => __( 'Dutch', 'om-catalog' ),
		);
		$parts = explode( '-', $code, 2 );
		$name  = $names[ $parts[0] ] ?? strtoupper( $parts[0] );
		return isset( $parts[1] ) && '' !== $parts[1] ? $name . ' (' . strtoupper( $parts[1] ) . ')' : $name;
	}

	/** Page speed measures: key => [ name, good up to, poor above, kind ] (layout shift x1000). */
	public static function vitals() {
		return array(
			'lcp'  => array( __( 'Main picture or text showed', 'om-catalog' ), 2500, 4000, 'ms' ),
			'inp'  => array( __( 'Response to taps and clicks', 'om-catalog' ), 200, 500, 'ms' ),
			'cls'  => array( __( 'Page stayed still while loading', 'om-catalog' ), 100, 250, 'cls' ),
			'ttfb' => array( __( 'Server answered', 'om-catalog' ), 800, 1800, 'ms' ),
		);
	}

	/** 1.9 s, 120 ms, 0.04. */
	public static function vital_text( $key, $value ) {
		if ( 'cls' === $key ) {
			return number_format_i18n( $value / 1000, 2 );
		}
		/* translators: %s: seconds. */
		return $value >= 1000 ? sprintf( __( '%s s', 'om-catalog' ), number_format_i18n( $value / 1000, 1 ) ) : sprintf( /* translators: %s: milliseconds. */ __( '%s ms', 'om-catalog' ), number_format_i18n( $value ) );
	}

	/** good, slow (needs work) or poor. */
	public static function vital_rating( $key, $value ) {
		$v = self::vitals()[ $key ];
		return $value <= $v[1] ? 'good' : ( $value <= $v[2] ? 'slow' : 'poor' );
	}

	/**
	 * How fast pages showed and answered, from visitors' own browsers: for each measure
	 * the value 75% of page views beat, the share good / needs work / poor, by device;
	 * and the slowest pages.
	 */
	public function speed() {
		if ( ! OM_Insights::has_speed() ) {
			// The tables haven't had their 1.44 update yet: nothing measured.
			$none = array();
			foreach ( array_keys( self::vitals() ) as $key ) {
				$none[ $key ] = array( 'n' => 0, 'p75' => 0, 'good' => 0, 'slow' => 0, 'poor' => 0, 'dev' => array() );
			}
			return array( 'n' => 0, 'm' => $none, 'slow' => array() );
		}
		$e = OM_Insights::events_table();
		$s = OM_Insights::sessions_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to, 'e' );
		$rows = self::rows(
			"SELECT e.page, e.label, e.lcp, e.inp, e.cls, e.ttfb, v.device FROM {$e} e JOIN {$s} v ON v.sid = e.sid
			WHERE e.type = 'pageview' AND e.day BETWEEN %s AND %s AND (e.lcp > 0 OR e.inp > 0 OR e.cls > 0 OR e.ttfb > 0){$es} ORDER BY e.id DESC LIMIT 20000",
			array_merge( array( $this->from, $this->to ), $ea )
		);
		$vals  = array();
		$dev   = array();
		$pages = array();
		$names = array();
		foreach ( $rows as $r ) {
			foreach ( array_keys( self::vitals() ) as $key ) {
				$v = (int) $r[ $key ];
				if ( $v > 0 ) {
					$v = 'cls' === $key ? $v - 1 : $v;
					$vals[ $key ][]                     = $v;
					$dev[ $key ][ (string) $r['device'] ][] = $v;
				}
			}
			if ( (int) $r['lcp'] > 0 ) {
				$pages[ (string) $r['page'] ][] = (int) $r['lcp'];
				$names[ (string) $r['page'] ]   = (string) $r['label'];
			}
		}
		$out = array( 'n' => count( $rows ), 'm' => array(), 'slow' => array() );
		foreach ( self::vitals() as $key => $v ) {
			$list = $vals[ $key ] ?? array();
			$m    = array( 'n' => count( $list ), 'p75' => self::p75( $list ), 'good' => 0, 'slow' => 0, 'poor' => 0, 'dev' => array() );
			foreach ( $list as $x ) {
				++$m[ self::vital_rating( $key, $x ) ];
			}
			foreach ( $dev[ $key ] ?? array() as $device => $dl ) {
				$m['dev'][ $device ] = array( 'p75' => self::p75( $dl ), 'n' => count( $dl ) );
			}
			$out['m'][ $key ] = $m;
		}
		foreach ( $pages as $page => $list ) {
			if ( count( $list ) >= 10 ) {
				$out['slow'][] = array( 'page' => $page, 'title' => $names[ $page ] ?? '', 'n' => count( $list ), 'p75' => self::p75( $list ) );
			}
		}
		usort( $out['slow'], static function ( $a, $b ) { return $b['p75'] <=> $a['p75']; } );
		$out['slow'] = array_slice( $out['slow'], 0, 10 );
		return $out;
	}

	/** Pages that don't exist that people reached, and where from: [ page, n, visits, from, last ]. */
	public function not_found() {
		$e = OM_Insights::events_table();
		$s = OM_Insights::sessions_table();
		list( $es, $ea ) = $this->escope( $this->from, $this->to, 'e' );
		$hits = self::rows(
			"SELECT e.page, e.sid, e.ts, v.ref_host, v.landing FROM {$e} e JOIN {$s} v ON v.sid = e.sid WHERE e.type = 'pageview' AND e.meta = '404' AND e.day BETWEEN %s AND %s{$es} ORDER BY e.ts DESC LIMIT 400",
			array_merge( array( $this->from, $this->to ), $ea )
		);
		if ( ! $hits ) {
			return array();
		}
		// The page before it in the same visit (a broken link on the site), else the website that sent them.
		$seen = array();
		$sids = array_values( array_unique( wp_list_pluck( $hits, 'sid' ) ) );
		foreach ( array_chunk( $sids, 150 ) as $chunk ) {
			$place = implode( ',', array_fill( 0, count( $chunk ), '%s' ) );
			foreach ( self::rows( "SELECT sid, ts, page, label FROM {$e} WHERE type = 'pageview' AND sid IN ({$place}) ORDER BY ts, id", $chunk ) as $r ) {
				$seen[ $r['sid'] ][] = $r;
			}
		}
		$out = array();
		foreach ( $hits as $h ) {
			$from = '';
			foreach ( $seen[ $h['sid'] ] ?? array() as $p ) {
				if ( (int) $p['ts'] < (int) $h['ts'] && $p['page'] !== $h['page'] ) {
					$from = OM_Insights::page_name( (string) $p['label'], (string) $p['page'] );
				}
			}
			if ( '' === $from ) {
				$from = '' !== (string) $h['ref_host'] ? self::site_root( (string) $h['ref_host'] ) : __( 'Typed or bookmarked', 'om-catalog' );
			}
			$page = (string) $h['page'];
			if ( ! isset( $out[ $page ] ) ) {
				$out[ $page ] = array( 'page' => $page, 'n' => 0, 'visits' => array(), 'from' => array(), 'last' => 0 );
			}
			++$out[ $page ]['n'];
			$out[ $page ]['visits'][ $h['sid'] ] = true;
			$out[ $page ]['from'][ $from ]       = ( $out[ $page ]['from'][ $from ] ?? 0 ) + 1;
			$out[ $page ]['last']                = max( $out[ $page ]['last'], (int) $h['ts'] );
		}
		foreach ( $out as &$r ) {
			arsort( $r['from'] );
			$r['visits'] = count( $r['visits'] );
		}
		unset( $r );
		usort( $out, static function ( $a, $b ) { return $b['n'] <=> $a['n']; } );
		return array_slice( $out, 0, 30 );
	}

	/** The month's goals (Insights > Settings): leads and visit requests (0: none). */
	public static function goals() {
		return array(
			'leads'  => max( 0, (int) OM_Insights::opt( 'om_ins_goal' ) ),
			'visits' => max( 0, (int) OM_Insights::opt( 'om_ins_goal_v' ) ),
		);
	}

	/**
	 * This month so far against the goals, for the whole site (filters don't apply):
	 * [ month, day, days, leads [ n, goal, pace ], visits [ n, goal, pace ] ] or empty without goals.
	 */
	public static function pace() {
		$goals = self::goals();
		if ( ! $goals['leads'] && ! $goals['visits'] ) {
			return array();
		}
		$e     = OM_Insights::events_table();
		$kinds = array();
		foreach ( self::rows( "SELECT label, COUNT(*) AS n FROM {$e} WHERE type = 'lead' AND day BETWEEN %s AND %s GROUP BY label", array( wp_date( 'Y-m-01' ), wp_date( 'Y-m-d' ) ) ) as $r ) {
			$kinds[ (string) $r['label'] ] = (int) $r['n'];
		}
		$days    = (int) wp_date( 't' );
		$elapsed = ( (int) wp_date( 'j' ) - 1 ) + ( (int) wp_date( 'G' ) * 60 + (int) wp_date( 'i' ) ) / 1440;
		$pace    = static function ( $n ) use ( $elapsed, $days ) {
			return $elapsed >= 1 ? (int) round( $n / $elapsed * $days ) : null;
		};
		$leads  = array_sum( $kinds );
		$visits = $kinds['booking'] ?? 0;
		return array(
			'month'  => wp_date( 'F' ),
			'day'    => (int) wp_date( 'j' ),
			'days'   => $days,
			'leads'  => array( 'n' => $leads, 'goal' => $goals['leads'], 'pace' => $pace( $leads ) ),
			'visits' => array( 'n' => $visits, 'goal' => $goals['visits'], 'pace' => $pace( $visits ) ),
		);
	}

	/** A website without the prefixes of its link services (l.facebook.com: facebook.com). */
	public static function site_root( $host ) {
		return (string) preg_replace( '/^(?:l|lm|m|mobile|web|out|www)\./', '', strtolower( (string) $host ) );
	}

	/** Websites that sent visitors, with their link-service subdomains taken in. */
	public function websites( $limit = 12 ) {
		$out = array();
		foreach ( $this->by_visit( 'ref_host', 80, "AND ref_host <> ''" ) as $r ) {
			$k = self::site_root( $r['k'] );
			if ( ! isset( $out[ $k ] ) ) {
				$out[ $k ] = array( 'k' => $k, 'visits' => 0, 'visitors' => 0, 'converted' => 0, 'quick' => 0, 'pages' => 0, 'engaged' => 0 );
			}
			$w = (int) $r['visits'];
			// Averages weighed by visits.
			$all                     = $out[ $k ]['visits'] + $w;
			$out[ $k ]['pages']      = $all ? ( $out[ $k ]['pages'] * $out[ $k ]['visits'] + (float) $r['pages'] * $w ) / $all : 0;
			$out[ $k ]['engaged']    = $all ? ( $out[ $k ]['engaged'] * $out[ $k ]['visits'] + (float) $r['engaged'] * $w ) / $all : 0;
			$out[ $k ]['visits']     = $all;
			$out[ $k ]['visitors']  += (int) $r['visitors'];
			$out[ $k ]['converted'] += (int) $r['converted'];
			$out[ $k ]['quick']     += (int) $r['quick'];
		}
		usort( $out, static function ( $a, $b ) { return $b['visits'] <=> $a['visits']; } );
		return array_slice( array_values( $out ), 0, $limit );
	}

	/* ---------------------------------------------------------------
	 * What stood out: plain sentences ranked by how much they matter,
	 * each with what to do about it (the dashboard and the report).
	 * ------------------------------------------------------------- */

	/** Everything the findings read, for this view (kept a few minutes). */
	public function findings_data() {
		return $this->cached(
			'findings',
			function () {
				list( $pf, $pt ) = $this->previous();
				$search          = $this->searches( 10 );
				return array(
					'now'      => $this->kpis( $this->from, $this->to ),
					'before'   => $this->kpis( $pf, $pt ),
					'first'    => self::first_day(),
					'chan'     => $this->by_visit( 'channel', 12 ),
					'chan_b'   => $this->by_visit( 'channel', 12, '', $pf, $pt ),
					'devices'  => $this->by_visit( 'device', 3 ),
					'touch'    => $this->touch_by_device(),
					'designs'  => $this->products( 60 ),
					'zero'     => $search['zero'],
					'landing'  => $this->by_visit( 'landing', 15 ),
					'speed'    => $this->speed(),
					'missing'  => $this->not_found(),
					'movers'   => $this->movers( 8 ),
					'attr'     => $this->attribution(),
					'audience' => $this->audience(),
					'pace'     => self::pace(),
					'heat'     => $this->heat(),
				);
			}
		);
	}

	/** The first day Insights has visits for (empty when there are none). */
	public static function first_day() {
		global $wpdb;
		return (string) $wpdb->get_var( 'SELECT MIN(day) FROM ' . OM_Insights::sessions_table() ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
	}

	/** Visits on each device, and how many got in touch: sent a form, or tapped to call or text. */
	public function touch_by_device() {
		$s = OM_Insights::sessions_table();
		$e = OM_Insights::events_table();
		list( $vs, $va ) = $this->vscope( $this->from, $this->to );
		return self::rows(
			"SELECT device AS k, COUNT(*) AS visits, SUM(CASE WHEN leads > 0 OR sid IN (SELECT sid FROM {$e} WHERE type IN ('call','text') AND day BETWEEN %s AND %s) THEN 1 ELSE 0 END) AS touched
			FROM {$s} WHERE day BETWEEN %s AND %s{$vs} GROUP BY device",
			array_merge( array( $this->from, $this->to, $this->from, $this->to ), $va )
		);
	}

	/** A change in words: "31% more", "18% fewer" (or "less" for amounts). */
	private static function more_less( $now, $before, $count = true ) {
		$pct = $before > 0 ? (int) round( 100 * abs( $now - $before ) / $before ) : 0;
		if ( $now >= $before ) {
			/* translators: %s: percent. */
			return sprintf( __( '%s more', 'om-catalog' ), $pct . '%' );
		}
		/* translators: %s: percent. */
		return sprintf( $count ? __( '%s fewer', 'om-catalog' ) : __( '%s less', 'om-catalog' ), $pct . '%' );
	}

	/** What to do when a source brings the best leads. */
	private static function channel_advice( $key ) {
		$advice = array(
			'email'    => __( 'Write to your list more often: these readers are ready to talk.', 'om-catalog' ),
			'maps'     => __( 'Keep your Google Business Profile fresh with new photos, posts and replies to reviews.', 'om-catalog' ),
			'search'   => __( 'Keep improving the pages people reach from Google: they bring buyers.', 'om-catalog' ),
			'social'   => __( 'Post more of the designs these visitors look at.', 'om-catalog' ),
			'ads'      => __( 'These ads are working: they may be worth a little more budget.', 'om-catalog' ),
			'referral' => __( 'Thank and keep in touch with the websites that send buyers.', 'om-catalog' ),
			'direct'   => __( 'People who know your name convert well: word of mouth is working.', 'om-catalog' ),
			'ai'       => __( 'AI assistants recommend you: keep your site\'s details complete and current.', 'om-catalog' ),
			'campaign' => __( 'These tagged links work: use them on more of your print and in-store material.', 'om-catalog' ),
		);
		return $advice[ $key ] ?? '';
	}

	/* ---------- Telling a real change from chance (1.48) ---------- */

	/** The standard normal distribution: the chance of a value below $z (Abramowitz and Stegun 7.1.26). */
	private static function phi( $z ) {
		$x = abs( (float) $z ) / M_SQRT2;
		$t = 1 / ( 1 + 0.3275911 * $x );
		$e = 1 - ( ( ( ( ( 1.061405429 * $t - 1.453152027 ) * $t ) + 1.421413741 ) * $t - 0.284496736 ) * $t + 0.254829592 ) * $t * exp( -$x * $x );
		return $z >= 0 ? ( 1 + $e ) / 2 : ( 1 - $e ) / 2;
	}

	/**
	 * How likely two counts from stretches of the same length would be this far apart by chance alone
	 * (two-sided): if nothing changed, each one fell in either stretch with even odds. Exact up to 400.
	 */
	public static function chance_counts( $a, $b ) {
		$a = max( 0, (int) round( (float) $a ) );
		$b = max( 0, (int) round( (float) $b ) );
		$n = $a + $b;
		if ( 0 === $n || $a === $b ) {
			return 1.0;
		}
		if ( $n <= 400 ) {
			$log = -$n * log( 2 );
			$sum = 0.0;
			for ( $i = 0; $i <= min( $a, $b ); $i++ ) {
				if ( $i > 0 ) {
					$log += log( ( $n - $i + 1 ) / $i );
				}
				$sum += exp( $log );
			}
			return min( 1.0, 2 * $sum );
		}
		return min( 1.0, 2 * ( 1 - self::phi( ( abs( $a - $b ) - 1 ) / sqrt( $n ) ) ) );
	}

	/** How likely two shares ($x1 of $n1, $x2 of $n2) would be this far apart by chance alone (two-sided). */
	public static function chance_rates( $x1, $n1, $x2, $n2 ) {
		if ( $n1 <= 0 || $n2 <= 0 ) {
			return 1.0;
		}
		$p = ( $x1 + $x2 ) / ( $n1 + $n2 );
		if ( $p <= 0 || $p >= 1 ) {
			return 1.0;
		}
		$z = abs( $x1 / $n1 - $x2 / $n2 ) / sqrt( $p * ( 1 - $p ) * ( 1 / $n1 + 1 / $n2 ) );
		return min( 1.0, 2 * ( 1 - self::phi( $z ) ) );
	}

	/** How likely as few as $x (or fewer) when $expect is usual (one-sided, Poisson). */
	public static function chance_below( $x, $expect ) {
		$x = (int) $x;
		if ( $expect <= 0 ) {
			return 1.0;
		}
		if ( $expect > 300 ) {
			return self::phi( ( $x + 0.5 - $expect ) / sqrt( $expect ) );
		}
		$term = exp( -$expect );
		$sum  = $term;
		for ( $i = 1; $i <= $x; $i++ ) {
			$term *= $expect / $i;
			$sum  += $term;
		}
		return min( 1.0, $sum );
	}

	/** How likely as many as $x (or more) when $expect is usual (one-sided, Poisson). */
	public static function chance_above( $x, $expect ) {
		return (int) $x <= 0 ? 1.0 : max( 0.0, 1 - self::chance_below( (int) $x - 1, $expect ) );
	}

	/** The line added to a change that may still be chance. */
	private static function maybe_words() {
		return __( 'With numbers this small it could still be chance: worth keeping an eye on.', 'om-catalog' );
	}

	/** What to check when a source sends fewer visitors (or none). */
	private static function drop_advice( $key, $none = false ) {
		$advice = array(
			'maps'     => __( 'Check your Google Business Profile: the website link (tagged utm_source=gbp), your hours, photos and recent posts.', 'om-catalog' ),
			'search'   => __( 'Check that your main pages still show on Google (Search Console) and that none was unpublished or renamed.', 'om-catalog' ),
			'ads'      => __( 'Check that your ads are running and the budget hasn\'t run out.', 'om-catalog' ),
			'social'   => __( 'Fewer posts, or a promotion that ended? Post the designs people look at most.', 'om-catalog' ),
			'email'    => __( 'Did an email go out this period, and do its links reach the site?', 'om-catalog' ),
			'referral' => __( 'A website that used to link to you may have moved or removed the link.', 'om-catalog' ),
			'campaign' => __( 'Check that your tagged links (QR codes, cards, flyers) still open the site.', 'om-catalog' ),
		);
		if ( isset( $advice[ $key ] ) ) {
			return $advice[ $key ];
		}
		return $none ? __( 'Check the links and posts that used to bring these visits.', 'om-catalog' ) : __( 'If nothing changed on your side (a post, an ad, your Business Profile), it may be the season.', 'om-catalog' );
	}

	/**
	 * Findings, most important first: [ tone (good, watch, idea, info), title, text, do, href, link, score, kind ('goal' for the month's goals) ].
	 * $d: the numbers from findings_data().
	 *
	 * A change is only called one when chance alone would rarely explain it (1.48): fewer than 1 in 20 times,
	 * or, for a fall in leads or visit requests, fewer than 1 in 5 (said so in the text); and only against a
	 * period Insights fully recorded.
	 */
	public function findings( $d, $max = 8 ) {
		$out  = array();
		$add  = static function ( $tone, $score, $title, $text, $do = '', $href = '', $link = '', $kind = '' ) use ( &$out ) {
			$out[] = compact( 'tone', 'score', 'title', 'text', 'do', 'href', 'link', 'kind' );
		};
		$k    = $d['now'];
		$b    = $d['before'];
		$was  = $this->compare_name();
		$n    = static function ( $v ) {
			return number_format_i18n( (float) $v );
		};
		$rate = static function ( $conv, $visits ) {
			return $visits ? self::pct( $conv, $visits ) : '0%';
		};
		$sure  = 0.05;
		$maybe = 0.2;

		// Today isn't over: against a whole day before, every count looks like a fall, so changes are left out.
		$whole = ! ( 1 === $this->span() && $this->to === wp_date( 'Y-m-d' ) );
		// Nor against a period Insights hadn't recorded yet (or has deleted): "911% more" would only mean that.
		list( $pf ) = $this->previous();
		$first      = (string) ( $d['first'] ?? '' );
		$known      = '' !== $first && $pf >= $first;
		if ( $whole && ! $known && $k['visits'] ) {
			$add(
				'info',
				60,
				__( 'Too early to compare', 'om-catalog' ),
				'' !== $first
					/* translators: 1: date, 2: "the period before" or "the same time last year". */
					? sprintf( __( 'Insights has visits from %1$s on, so %2$s isn\'t fully recorded and changes against it aren\'t shown yet.', 'om-catalog' ), wp_date( 'M j, Y', strtotime( $first . ' 12:00:00' ) ), $was )
					: __( 'There is nothing recorded to compare with yet.', 'om-catalog' ),
				__( 'Choose a shorter period, or wait until there is a full period to compare with.', 'om-catalog' )
			);
		}
		$whole = $whole && $known;

		// Leads, against the period compared with.
		if ( $whole && $b['leads'] > 0 && $k['leads'] + $b['leads'] >= 10 ) {
			$chg = ( $k['leads'] - $b['leads'] ) / $b['leads'];
			$p   = self::chance_counts( $k['leads'], $b['leads'] );
			$up  = $chg > 0;
			if ( abs( $chg ) >= 0.1 && ( $p < $sure || ( ! $up && $p < $maybe ) ) ) {
				$add(
					$up ? 'good' : 'watch',
					( $p < $sure ? 100 : 70 ) + min( 50, 50 * abs( $chg ) ),
					/* translators: %s: change, e.g. "31% more". */
					sprintf( __( 'Leads: %s', 'om-catalog' ), self::more_less( $k['leads'], $b['leads'] ) ),
					/* translators: 1: leads, 2: leads before, 3: "the period before", 4: visit requests, 5: visit requests before. */
					sprintf( __( '%1$s leads, against %2$s %3$s. Visit requests: %4$s (%5$s).', 'om-catalog' ), $n( $k['leads'] ), $n( $b['leads'] ), $was, $n( $k['bookings'] ), $n( $b['bookings'] ) ) . ( $p < $sure ? '' : ' ' . self::maybe_words() ),
					$up ? '' : __( 'Look at the sources below: which one sent fewer people, and is the booking button easy to find?', 'om-catalog' ),
					$this->url( array( 'tab' => 'leads' ) ),
					__( 'See leads', 'om-catalog' )
				);
			}
		} elseif ( $whole && $k['leads'] > 0 && ! $b['leads'] ) {
			/* translators: %s: number of leads. */
			$add( 'good', 90, __( 'First leads', 'om-catalog' ), sprintf( _n( '%s lead this period.', '%s leads this period.', $k['leads'], 'om-catalog' ), $n( $k['leads'] ) ), '', $this->url( array( 'tab' => 'leads' ) ), __( 'See leads', 'om-catalog' ) );
		}

		// Visit requests on their own: the leads closest to a sale (they can fall while sign-ups rise).
		if ( $whole && $b['bookings'] > 0 && $k['bookings'] + $b['bookings'] >= 8 ) {
			$chg = ( $k['bookings'] - $b['bookings'] ) / $b['bookings'];
			$p   = self::chance_counts( $k['bookings'], $b['bookings'] );
			$up  = $chg > 0;
			if ( abs( $chg ) >= 0.15 && ( $p < $sure || ( ! $up && $p < $maybe ) ) ) {
				$add(
					$up ? 'good' : 'watch',
					( $p < $sure ? 98 : 74 ) + min( 40, 40 * abs( $chg ) ),
					/* translators: %s: change, e.g. "31% more". */
					sprintf( __( 'Visit requests: %s', 'om-catalog' ), self::more_less( $k['bookings'], $b['bookings'] ) ),
					/* translators: 1: visit requests, 2: before, 3: "the period before". */
					sprintf( __( '%1$s requests to visit the showroom, against %2$s %3$s: the leads closest to a sale.', 'om-catalog' ), $n( $k['bookings'] ), $n( $b['bookings'] ), $was ) . ( $p < $sure ? '' : ' ' . self::maybe_words() ),
					$up ? '' : __( 'Try a "Book" button and the booking window on a phone yourself, and put "Book a visit" on the most viewed designs.', 'om-catalog' ),
					$this->url( array( 'tab' => 'leads' ) ),
					__( 'See leads', 'om-catalog' )
				);
			}
		}

		// Calls and texts: the other way people get in touch.
		if ( $whole && $b['calls'] > 0 && $k['calls'] + $b['calls'] >= 20 ) {
			$chg = ( $k['calls'] - $b['calls'] ) / $b['calls'];
			if ( abs( $chg ) >= 0.15 && self::chance_counts( $k['calls'], $b['calls'] ) < $sure ) {
				$up = $chg > 0;
				$add(
					$up ? 'good' : 'watch',
					66 + min( 20, 20 * abs( $chg ) ),
					/* translators: %s: change, e.g. "31% more". */
					sprintf( __( 'Calls and texts: %s', 'om-catalog' ), self::more_less( $k['calls'], $b['calls'] ) ),
					/* translators: 1: taps, 2: before, 3: "the period before". */
					sprintf( __( '%1$s taps to call or text, against %2$s %3$s.', 'om-catalog' ), $n( $k['calls'] ), $n( $b['calls'] ), $was ),
					$up ? '' : __( 'Check on a phone that the number and the Text button work, and that your Google Business Profile shows the right number.', 'om-catalog' ),
					$this->url( array( 'tab' => 'actions' ) ),
					__( 'See calls and texts', 'om-catalog' )
				);
			}
		}

		// The lead rate.
		if ( $whole && $k['visits'] >= 200 && $b['visits'] >= 200 && $b['conv'] > 0 && $k['converted'] + $b['converted'] >= 15 ) {
			$chg = ( $k['conv'] - $b['conv'] ) / $b['conv'];
			if ( abs( $chg ) >= 0.15 && self::chance_rates( $k['converted'], $k['visits'], $b['converted'], $b['visits'] ) < $sure / 2 ) {
				$up = $chg > 0;
				$add(
					$up ? 'good' : 'watch',
					62,
					/* translators: %s: lead rate. */
					sprintf( __( 'Lead rate %s', 'om-catalog' ), self::pct( $k['conv'], 100 ) ),
					/* translators: 1: leads per 100 visits, 2: before, 3: "the period before". */
					sprintf( __( 'Of every 100 visits, %1$s ended in a lead, against %2$s %3$s.', 'om-catalog' ), number_format_i18n( $k['conv'], 1 ), number_format_i18n( $b['conv'], 1 ), $was ),
					$up ? '' : ( $k['visits'] > $b['visits'] ? __( 'More people came but fewer got in touch: check that the busiest first pages lead somewhere.', 'om-catalog' ) : __( 'Fewer of the visits got in touch: check that the "Book" buttons and forms work on a phone, and that the busiest first pages lead somewhere.', 'om-catalog' ) )
				);
			}
		}

		// The month's goals.
		if ( $d['pace'] ) {
			foreach ( array( 'leads' => __( 'leads', 'om-catalog' ), 'visits' => __( 'visit requests', 'om-catalog' ) ) as $key => $word ) {
				$g = $d['pace'][ $key ];
				if ( ! $g['goal'] || null === $g['pace'] ) {
					continue;
				}
				$ok = $g['pace'] >= $g['goal'];
				$add(
					$ok ? 'good' : ( $g['pace'] < 0.85 * $g['goal'] ? 'watch' : 'info' ),
					'leads' === $key ? 95 : 88,
					/* translators: 1: number, 2: "leads" or "visit requests", 3: month. */
					sprintf( __( 'On pace for %1$s %2$s in %3$s', 'om-catalog' ), $n( $g['pace'] ), $word, $d['pace']['month'] ),
					/* translators: 1: so far, 2: goal, 3: day of the month, 4: days in the month. */
					sprintf( __( '%1$s so far against a goal of %2$s, on day %3$s of %4$s.', 'om-catalog' ), $n( $g['n'] ), $n( $g['goal'] ), $n( $d['pace']['day'] ), $n( $d['pace']['days'] ) ),
					$ok ? '' : ( 'leads' === $key ? __( 'A post or an email about a featured design usually brings a quick rise in leads.', 'om-catalog' ) : __( 'Put "Book a visit" on the most viewed designs and in your next post or email.', 'om-catalog' ) ),
					$this->url( array( 'tab' => 'leads' ) ),
					__( 'See leads', 'om-catalog' ),
					'goal'
				);
			}
		}

		// Sources that moved: judged by the leads they bring, not only by percent, and sources that stopped.
		$now_by = array();
		foreach ( $d['chan'] as $r ) {
			$now_by[ $r['k'] ] = $r;
		}
		$before = array();
		foreach ( $d['chan_b'] as $r ) {
			$before[ $r['k'] ] = $r;
		}
		$all   = max( (int) $k['visits'], (int) $b['visits'] );
		$base  = $k['visits'] ? (int) $k['converted'] / (int) $k['visits'] : 0;
		$keys  = $whole ? array_unique( array_merge( array_keys( $now_by ), array_keys( $before ) ) ) : array();
		// Every source is a separate test, so each must pass a stricter bar; and a busy week lifts every source
		// at once, so its share of the visits must have moved too.
		$bar   = $sure / max( 1, count( $keys ) );
		$moves = array();
		foreach ( $keys as $key ) {
			$a    = (int) ( $now_by[ $key ]['visits'] ?? 0 );
			$p    = (int) ( $before[ $key ]['visits'] ?? 0 );
			$diff = $a - $p;
			if ( max( $a, $p ) < 15 || abs( $diff ) < max( 15, 0.02 * $all ) || ( $p > 0 && abs( $diff ) / $p < 0.15 ) || self::chance_counts( $a, $p ) >= $bar || self::chance_rates( $a, max( 1, (int) $k['visits'] ), $p, max( 1, (int) $b['visits'] ) ) >= $bar ) {
				continue;
			}
			// The leads it brings: its own lead rate when it has enough visits to tell, else the site's.
			$src     = $diff < 0 ? ( $before[ $key ] ?? null ) : ( $now_by[ $key ] ?? null );
			$r8      = $src && (int) $src['visits'] >= 100 ? (int) $src['converted'] / (int) $src['visits'] : $base;
			$moves[] = array( (string) $key, $a, $p, $diff, abs( $diff ) * $r8 );
		}
		usort(
			$moves,
			static function ( $x, $y ) {
				return array( $y[4], abs( $y[3] ) ) <=> array( $x[4], abs( $x[3] ) );
			}
		);
		foreach ( array_slice( $moves, 0, 2 ) as $m ) {
			list( $key, $a, $p, $diff, $impact ) = $m;
			$name = self::channel_name( $key );
			if ( 0 === $a ) {
				$add(
					'watch',
					80 + min( 15, 3 * $impact ),
					/* translators: %s: source. */
					sprintf( __( '%s: no visits this period', 'om-catalog' ), $name ),
					/* translators: 1: visits, 2: "the period before". */
					sprintf( __( '%1$s visits came this way %2$s, none this period.', 'om-catalog' ), $n( $p ), $was ),
					self::drop_advice( $key, true ),
					$this->url( array( 'tab' => 'sources' ) ),
					__( 'See sources', 'om-catalog' )
				);
				continue;
			}
			/* translators: 1: visits, 2: visits before, 3: "the period before", 4: leads. */
			$text = sprintf( __( '%1$s visits against %2$s %3$s, and %4$s of them became leads.', 'om-catalog' ), $n( $a ), $n( $p ), $was, $n( $now_by[ $key ]['converted'] ?? 0 ) );
			$lost = (int) round( $impact );
			if ( $diff < 0 && $lost >= 1 ) {
				/* translators: %s: number of leads. */
				$text .= ' ' . sprintf( _n( 'At its usual lead rate that is about %s lead fewer.', 'At its usual lead rate that is about %s leads fewer.', $lost, 'om-catalog' ), $n( $lost ) );
			}
			$add(
				$diff > 0 ? 'good' : 'watch',
				50 + min( 15, 15 * abs( $diff ) / max( 1, $p ) ) + min( 25, 5 * $impact ),
				/* translators: 1: source, 2: change. */
				sprintf( __( '%1$s: %2$s visits', 'om-catalog' ), $name, self::more_less( $a, $p ) ),
				$text,
				$diff > 0 ? '' : self::drop_advice( $key ),
				$this->filter_url( 'channel', $key ),
				__( 'See these visits', 'om-catalog' )
			);
		}

		// The source that brings buyers, and a big one that doesn't, each against the other sources.
		$best = null;
		$weak = null;
		$bar  = $sure / max( 1, count( $d['chan'] ) );
		foreach ( $d['chan'] as $r ) {
			$v      = (int) $r['visits'];
			$x      = (int) $r['converted'];
			$others = (int) $k['visits'] - $v;
			$theirs = $others > 0 ? ( (int) $k['converted'] - $x ) / $others : 0;
			if ( ! $v || $theirs <= 0 ) {
				continue;
			}
			$expect = $v * $theirs;
			$cr     = $x / $v;
			if ( $v >= 40 && $x >= 5 && $cr >= 1.5 * $theirs && self::chance_above( $x, $expect ) < $bar && ( ! $best || $cr > $best[1] ) ) {
				$best = array( $r, $cr );
			}
			if ( $v >= 150 && $expect >= 6 && $cr <= 0.5 * $theirs && self::chance_below( $x, $expect ) < $bar && ( ! $weak || $v > (int) $weak[0]['visits'] ) ) {
				$weak = array( $r, $cr );
			}
		}
		if ( $best ) {
			$add(
				'good',
				56,
				/* translators: %s: source. */
				sprintf( __( 'Best leads come from %s', 'om-catalog' ), self::channel_name( $best[0]['k'] ) ),
				/* translators: 1: lead rate, 2: overall lead rate. */
				sprintf( __( '%1$s of these visits became leads, against %2$s overall.', 'om-catalog' ), $rate( $best[0]['converted'], $best[0]['visits'] ), $rate( $k['converted'], $k['visits'] ) ),
				self::channel_advice( $best[0]['k'] ),
				$this->filter_url( 'channel', $best[0]['k'] ),
				__( 'See these visits', 'om-catalog' )
			);
		}
		if ( $weak ) {
			$add(
				'watch',
				48,
				/* translators: %s: source. */
				sprintf( __( '%s visits rarely become leads', 'om-catalog' ), self::channel_name( $weak[0]['k'] ) ),
				/* translators: 1: visits, 2: lead rate, 3: overall lead rate. */
				sprintf( __( '%1$s visits, but only %2$s became leads (%3$s overall).', 'om-catalog' ), $n( $weak[0]['visits'] ), $rate( $weak[0]['converted'], $weak[0]['visits'] ), $rate( $k['converted'], $k['visits'] ) ),
				__( 'Send these visitors to a design or the booking page rather than the home page.', 'om-catalog' ),
				$this->filter_url( 'channel', $weak[0]['k'] ),
				__( 'See these visits', 'om-catalog' )
			);
		}

		// Phones against computers: getting in touch counts a call or a text (how phones get in touch) as well as a form.
		$dev = array();
		foreach ( (array) ( $d['touch'] ?? array() ) as $r ) {
			$dev[ $r['k'] ] = $r;
		}
		if ( isset( $dev['phone'], $dev['desktop'] ) && (int) $dev['phone']['visits'] >= 80 && (int) $dev['desktop']['visits'] >= 80 ) {
			$px = (int) $dev['phone']['touched'];
			$pv = (int) $dev['phone']['visits'];
			$cx = (int) $dev['desktop']['touched'];
			$cv = (int) $dev['desktop']['visits'];
			if ( $cx > 0 && $px + $cx >= 15 && $px / $pv < 0.65 * $cx / $cv && self::chance_rates( $px, $pv, $cx, $cv ) < $sure ) {
				$add(
					'watch',
					57,
					__( 'Phones lag behind computers', 'om-catalog' ),
					/* translators: 1: share of visits on phones, 2: phone rate, 3: computer rate. */
					sprintf( __( '%1$s of visits are on phones, but %2$s of phone visits got in touch (a form, a call or a text) against %3$s on computers.', 'om-catalog' ), self::pct( $pv, $k['visits'], 0 ), $rate( $px, $pv ), $rate( $cx, $cv ) ),
					__( 'Try booking and asking about a ring on a phone yourself; keep the call button in reach.', 'om-catalog' ),
					$this->filter_url( 'device', 'phone' ),
					__( 'See phone visits', 'om-catalog' )
				);
			}
		}

		// Speed on phones.
		$lcp = $d['speed']['m']['lcp'] ?? array();
		if ( ( $lcp['n'] ?? 0 ) >= 50 ) {
			$phone = $lcp['dev']['phone']['p75'] ?? 0;
			if ( $phone > 4000 ) {
				$add(
					'watch',
					53,
					__( 'Pages are slow on phones', 'om-catalog' ),
					/* translators: %s: seconds. */
					sprintf( __( 'On a quarter of phone visits the main picture took longer than %s to show.', 'om-catalog' ), self::vital_text( 'lcp', $phone ) ),
					__( 'Make the biggest pictures smaller (WebP, under 300 KB) and check the slowest pages under Pages.', 'om-catalog' ),
					$this->url( array( 'tab' => 'pages' ) ),
					__( 'See speed', 'om-catalog' )
				);
			} elseif ( $lcp['n'] && $lcp['good'] / $lcp['n'] >= 0.75 ) {
				/* translators: %s: share of page views. */
				$add( 'good', 18, __( 'Pages load fast', 'om-catalog' ), sprintf( __( '%s of page views showed the main picture within 2.5 seconds.', 'om-catalog' ), self::pct( $lcp['good'], $lcp['n'], 0 ) ), '', $this->url( array( 'tab' => 'pages' ) ), __( 'See speed', 'om-catalog' ) );
			}
		}

		// Popular, never asked about: only when this many visits would normally have brought a question.
		$asked = 0;
		$seen  = 0;
		foreach ( $d['designs'] as $r ) {
			$asked += (int) $r['leads'];
			$seen  += (int) $r['viewers'];
		}
		$per = $seen ? $asked / $seen : 0;
		foreach ( $d['designs'] as $r ) {
			if ( (int) $r['viewers'] >= 25 && 0 === (int) $r['leads'] && (int) $r['viewers'] * $per >= 3 ) {
				$name = self::design( $r['item'], $r['title'] )['title'];
				$add(
					'idea',
					44 + min( 16, (int) $r['viewers'] / 12 ),
					/* translators: %s: design. */
					sprintf( __( '%s: much looked at, never asked about', 'om-catalog' ), $name ),
					/* translators: 1: views, 2: visits, 3: saves. */
					sprintf( __( 'Viewed %1$s times in %2$s visits and saved %3$s times, but nobody got in touch about it.', 'om-catalog' ), $n( $r['views'] ), $n( $r['viewers'] ), $n( $r['saves'] ) ),
					__( 'Check its photos and price, and make "Book a viewing" stand out on it.', 'om-catalog' ),
					$this->filter_url( 'item', $r['item'] ),
					__( 'See who viewed it', 'om-catalog' )
				);
				break;
			}
		}

		// Searches that found nothing.
		$zero = array_sum( array_map( 'intval', wp_list_pluck( $d['zero'], 'n' ) ) );
		if ( $zero >= 5 ) {
			$words = array();
			foreach ( array_slice( $d['zero'], 0, 3 ) as $r ) {
				$words[] = '"' . $r['q'] . '" (' . $n( $r['n'] ) . ')';
			}
			$add(
				'idea',
				40 + min( 18, $zero / 4 ),
				/* translators: %s: number of searches. */
				sprintf( _n( '%s search found nothing', '%s searches found nothing', $zero, 'om-catalog' ), $n( $zero ) ),
				/* translators: %s: the searches. */
				sprintf( __( 'Most often: %s.', 'om-catalog' ), implode( ', ', $words ) ),
				__( 'Add those words to the titles of matching designs, or add the designs people ask for.', 'om-catalog' ),
				$this->url( array( 'tab' => 'searches' ) ),
				__( 'See searches', 'om-catalog' )
			);
		}

		// A first page that loses people.
		$lose = null;
		foreach ( $d['landing'] as $r ) {
			if ( (int) $r['visits'] >= 60 && (int) $r['quick'] / (int) $r['visits'] >= 0.4 && ( ! $lose || (int) $r['visits'] > (int) $lose['visits'] ) ) {
				$lose = $r;
			}
		}
		if ( $lose ) {
			$title = OM_Insights::page_name( $this->page_titles( array( $lose['k'] ) )[ $lose['k'] ] ?? '', (string) $lose['k'] );
			$add(
				'watch',
				43,
				/* translators: %s: page. */
				sprintf( __( '%s loses people at once', 'om-catalog' ), $title ),
				/* translators: 1: share, 2: visits. */
				sprintf( __( '%1$s of the %2$s visits that start there leave within 10 seconds without opening a design, sending a form or tapping to call or text.', 'om-catalog' ), self::pct( (int) $lose['quick'], (int) $lose['visits'], 0 ), $n( $lose['visits'] ) ),
				__( 'Make the top of that page say what it offers and what to do next.', 'om-catalog' ),
				$this->filter_url( 'landing', $lose['k'] ),
				__( 'See these visits', 'om-catalog' )
			);
		}

		// Pages that don't exist.
		$missing = array_sum( array_map( 'intval', wp_list_pluck( $d['missing'], 'n' ) ) );
		if ( $missing >= 5 ) {
			$top   = $d['missing'][0];
			$from  = (string) array_key_first( $top['from'] );
			$typed = __( 'Typed or bookmarked', 'om-catalog' ) === $from;
			$add(
				'watch',
				41 + min( 15, $missing / 3 ),
				/* translators: %s: times. */
				sprintf( _n( 'A missing page was opened %s time', 'Missing pages were opened %s times', $missing, 'om-catalog' ), $n( $missing ) ),
				$typed
					/* translators: 1: address, 2: times. */
					? sprintf( __( 'Most often %1$s (%2$s times, mostly from an old bookmark or a typed address).', 'om-catalog' ), $top['page'], $n( $top['n'] ) )
					/* translators: 1: address, 2: times, 3: where from. */
					: sprintf( __( 'Most often %1$s (%2$s times, mostly from %3$s).', 'om-catalog' ), $top['page'], $n( $top['n'] ), $from ),
				__( 'Point those addresses to the right page with a redirect (the Redirection plugin does it).', 'om-catalog' ),
				$this->url( array( 'tab' => 'pages' ) ),
				__( 'See missing pages', 'om-catalog' )
			);
		}

		// A design on the rise.
		$rise = $whole ? ( $d['movers'][0][0] ?? null ) : null;
		if ( $rise && $rise['now'] >= 15 && $rise['before'] > 0 && $rise['diff'] / $rise['before'] >= 0.5 && self::chance_counts( $rise['now'], $rise['before'] ) < $sure / 50 ) {
			$name = self::design( $rise['item'], $rise['title'] )['title'];
			$add(
				'info',
				34,
				/* translators: %s: design. */
				sprintf( __( '%s is rising', 'om-catalog' ), $name ),
				/* translators: 1: views, 2: views before. */
				sprintf( __( '%1$s views, up from %2$s.', 'om-catalog' ), $n( $rise['now'] ), $n( $rise['before'] ) ),
				__( 'Feature it on the home page or in your next email while interest is high.', 'om-catalog' ),
				$this->filter_url( 'item', $rise['item'] ),
				__( 'See who viewed it', 'om-catalog' )
			);
		}

		// Buyers take time; where their journeys start (from enough leads to tell).
		$a = $d['attr'];
		if ( $a['total'] >= 20 ) {
			if ( $a['back'] / $a['total'] >= 0.3 ) {
				$add(
					'info',
					31,
					__( 'Many buyers take their time', 'om-catalog' ),
					/* translators: 1: share of leads, 2: typical visits, 3: typical days. */
					sprintf( __( '%1$s of leads came back before getting in touch, typically after %2$s visits over %3$s days.', 'om-catalog' ), self::pct( $a['back'], $a['total'], 0 ), number_format_i18n( $a['vmed'], 0 ), number_format_i18n( max( 1, round( $a['dmed'] ) ), 0 ) ),
					__( 'Give them reasons to come back: saved lists, a newsletter and new designs.', 'om-catalog' ),
					$this->url( array( 'tab' => 'leads' ) ),
					__( 'See leads', 'om-catalog' )
				);
			}
			foreach ( $a['by'] as $key => $c ) {
				if ( 'none' !== $key && $c['first'] >= 5 && $c['first'] >= $c['last'] + 3 && $c['first'] >= 1.5 * max( 1, $c['last'] ) ) {
					$add(
						'info',
						33,
						/* translators: %s: source. */
						sprintf( __( '%s starts journeys that end in leads', 'om-catalog' ), self::channel_name( $key ) ),
						/* translators: 1: leads first came this way, 2: leads whose last visit came this way. */
						sprintf( __( '%1$s leads first found you this way, though only %2$s came this way on the visit they got in touch.', 'om-catalog' ), $n( $c['first'] ), $n( $c['last'] ) ),
						'',
						$this->url( array( 'tab' => 'leads' ) ),
						__( 'See where leads began', 'om-catalog' )
					);
					break;
				}
			}
		}

		// Returning visitors.
		$new = $d['audience']['kinds']['new'] ?? null;
		$ret = $d['audience']['kinds']['returning'] ?? null;
		if ( $new && $ret && (int) $ret['visits'] >= 60 && (int) $new['visits'] >= 60 && (int) $new['converted'] + (int) $ret['converted'] >= 15 ) {
			$nr = (int) $new['converted'] / (int) $new['visits'];
			$rr = (int) $ret['converted'] / (int) $ret['visits'];
			if ( $nr > 0 && $rr >= 1.5 * $nr && self::chance_rates( (int) $ret['converted'], (int) $ret['visits'], (int) $new['converted'], (int) $new['visits'] ) < $sure ) {
				$add(
					'info',
					28,
					__( 'Returning visitors are your best prospects', 'om-catalog' ),
					/* translators: 1: returning lead rate, 2: first-time lead rate. */
					sprintf( __( 'They become leads at %1$s, against %2$s on a first visit.', 'om-catalog' ), $rate( $ret['converted'], $ret['visits'] ), $rate( $new['converted'], $new['visits'] ) ),
					'',
					$this->filter_url( 'kind', 'returning' ),
					__( 'See returning visits', 'om-catalog' )
				);
			}
		}

		// The value of what people asked about.
		if ( $k['value'] > 0 ) {
			$add(
				'info',
				24,
				/* translators: %s: amount. */
				sprintf( __( '%s in designs asked about', 'om-catalog' ), self::money( $k['value'] ) ),
				/* translators: 1: leads, 2: average. */
				sprintf( __( '%1$s leads named a design; at listed prices that averages %2$s each.', 'om-catalog' ), $n( $k['valued'] ), self::money( $k['valued'] ? $k['value'] / $k['valued'] : 0 ) ),
				'',
				$this->url( array( 'tab' => 'designs' ) ),
				__( 'See designs', 'om-catalog' )
			);
		}

		// The busiest time (from enough visits to tell).
		$best = array( 0, 0, 0 );
		foreach ( (array) $d['heat'] as $dow => $hours ) {
			foreach ( (array) $hours as $hr => $v ) {
				if ( $v > $best[2] ) {
					$best = array( $dow, $hr, $v );
				}
			}
		}
		if ( $best[2] > 0 && $k['visits'] >= 200 ) {
			$utc  = new DateTimeZone( 'UTC' );
			$days = array( __( 'Sundays', 'om-catalog' ), __( 'Mondays', 'om-catalog' ), __( 'Tuesdays', 'om-catalog' ), __( 'Wednesdays', 'om-catalog' ), __( 'Thursdays', 'om-catalog' ), __( 'Fridays', 'om-catalog' ), __( 'Saturdays', 'om-catalog' ) );
			$add(
				'info',
				10,
				/* translators: 1: day, 2: hour, 3: next hour. */
				sprintf( __( 'Busiest: %1$s, %2$s to %3$s', 'om-catalog' ), $days[ (int) $best[0] ], wp_date( 'ga', (int) $best[1] * HOUR_IN_SECONDS, $utc ), wp_date( 'ga', ( ( (int) $best[1] + 1 ) % 24 ) * HOUR_IN_SECONDS, $utc ) ),
				__( 'A good time for posts and emails to land, and for someone to be ready to answer.', 'om-catalog' ),
				'',
				$this->url( array( 'tab' => 'audience' ) ),
				__( 'See busy hours', 'om-catalog' )
			);
		}

		usort( $out, static function ( $x, $y ) { return $y['score'] <=> $x['score']; } );
		return array_slice( $out, 0, $max );
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
		if ( 'none' === (string) $key ) {
			return __( 'Not linked to a visit', 'om-catalog' );
		}
		return OM_Insights::channels()[ $key ] ?? ( '' === (string) $key ? __( 'Unknown', 'om-catalog' ) : (string) $key );
	}

	/** Why a lead has no visit behind it. */
	public static function unlinked_words() {
		return __( 'Leads sent with no visit recorded: from a browser that asks not to be tracked, with tracking blocked, or a calendar booking that couldn\'t be matched to its visit.', 'om-catalog' );
	}

	public static function channel_icon( $key ) {
		$icons = array( 'search' => 'search', 'maps' => 'pin', 'direct' => 'direct', 'social' => 'social', 'ads' => 'ads', 'email' => 'mail', 'ai' => 'sparkle', 'referral' => 'link', 'campaign' => 'tag', 'none' => 'help' );
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
		if ( 'm' === $kind ) {
			return self::money( $value );
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
			'booking_bar'         => __( 'Booking bar (computers)', 'om-catalog' ),
			'booking_window'      => __( 'Booking window', 'om-catalog' ),
			'welcome_back'        => __( '"Welcome back" bar', 'om-catalog' ),
			'pagehero'            => __( 'Page banner', 'om-catalog' ),
			'kit'                 => __( 'Wulf Kit bar', 'om-catalog' ),
			'tray'                => __( 'Saved tray', 'om-catalog' ),
			'page'                => __( 'In the page', 'om-catalog' ),
			'product'             => __( 'Product page', 'om-catalog' ),
			'visit'               => __( 'Visit section', 'om-catalog' ),
			'visit_form'          => __( 'Visit section', 'om-catalog' ),
			'quiz'                => __( 'Ring style quiz', 'om-catalog' ),
			'hint'                => __( 'Hint page', 'om-catalog' ),
			'link'                => __( 'A booking link (?book=1)', 'om-catalog' ),
			// Wulf Kit widgets, by the name they have in Elementor.
			'announce'            => __( 'Announcement bar', 'om-catalog' ),
			'bookbar'             => __( 'Booking bar (in the page)', 'om-catalog' ),
			'craft'               => __( 'Ring builds itself', 'om-catalog' ),
			'cta'                 => __( 'Call to action', 'om-catalog' ),
			'faq'                 => __( 'Questions (FAQ)', 'om-catalog' ),
			'film'                => __( 'Cinematic film', 'om-catalog' ),
			'filmtabs'            => __( 'Film chapters', 'om-catalog' ),
			'fourcs'              => __( 'The 4Cs', 'om-catalog' ),
			'help'                => __( 'Help circles', 'om-catalog' ),
			'paths'               => __( '"What brings you in?"', 'om-catalog' ),
			'posts'               => __( 'Journal', 'om-catalog' ),
			'products'            => __( 'Product row', 'om-catalog' ),
			'prose'               => __( 'Text block', 'om-catalog' ),
			'reel'                => __( 'Brand film', 'om-catalog' ),
			'split'               => __( 'Text and picture', 'om-catalog' ),
			'story'               => __( 'Our story', 'om-catalog' ),
			'studio'              => __( 'Ring studio', 'om-catalog' ),
			'tiles'               => __( 'Collection tiles', 'om-catalog' ),
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
			'booking'   => array( 'open' => __( 'Opened the booking window', 'om-catalog' ), 'step' => __( 'Went on in the booking window', 'om-catalog' ), 'request' => __( 'Sent a visit request', 'om-catalog' ), 'calendar' => __( 'Opened the booking calendar', 'om-catalog' ) ),
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
			case 'text':
				return __( 'Tapped to text', 'om-catalog' );
			case 'welcome':
				return __( 'Saw the "Welcome back" bar', 'om-catalog' );
			case 'film':
				return 'complete' === $label ? __( 'Watched the brand film to the end', 'om-catalog' ) : ( 'play' === $label ? __( 'Played the brand film', 'om-catalog' ) : __( 'Watched the brand film', 'om-catalog' ) );
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
			'logo'     => '<path d="M2.3 8.3 7.1 3h9.8l4.8 5.3L12 21.8z"/><path d="M2.3 8.3h19.4M7.5 10.5l2.3 6 2.2-4.5 2.3 4.5 2.2-6"/>',
			'audience' => '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c0-3.2 2.5-5.6 5.5-5.6s5.5 2.4 5.5 5.6"/><circle cx="17" cy="9.5" r="2.4"/><path d="M16.2 14.1c2.4.2 4.3 2.4 4.3 5.4"/>',
			'bolt'     => '<path d="M13 3 5.5 13.5h6L10.5 21 18.5 10h-6z"/>',
			'bulb'     => '<path d="M9 17.5h6M10 20.5h4"/><path d="M12 3.5a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V17h5v-.6c0-.8.4-1.5 1-2A6 6 0 0 0 12 3.5z"/>',
			'up'       => '<path d="M4 16.5 9.5 11l3.5 3.5L20 7.5"/><path d="M14.5 7.5H20V13"/>',
			'down'     => '<path d="M4 7.5 9.5 13l3.5-3.5 7 7"/><path d="M14.5 16.5H20V11"/>',
			'alert'    => '<path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17.2v.1"/>',
			'target'   => '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8"/>',
			'dollar'   => '<path d="M12 3.5v17M16 7.5c-.6-1.5-2.1-2.3-4-2.3-2.4 0-4 1.3-4 3.1 0 4.4 8.3 2.6 8.3 7 0 1.9-1.8 3.3-4.3 3.3-2.1 0-3.7-.9-4.3-2.6"/>',
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
		$out .= '<button type="button" class="om-ins-btn om-ins-picker-btn" aria-haspopup="true" aria-expanded="false" data-om-ins-picker-btn>' . self::icon( 'calendar' ) . '<span>' . esc_html( $this->range_name() ) . ( 'year' === $this->cmp ? '<small>' . esc_html__( 'vs last year', 'om-catalog' ) . '</small>' : '' ) . '</span>' . self::icon( 'chevron', 'om-ins-caret' ) . '</button>';
		$out .= '<div class="om-ins-pop" data-om-ins-pop hidden><ul class="om-ins-presets" role="list">';
		$keys = self::preset_keys();
		foreach ( self::presets() as $key => $name ) {
			$out .= '<li><a href="' . esc_url( $this->url( array( 'range' => $key, 'from' => null, 'to' => null, 'p' => null, 'interval' => null ) ) ) . '" data-om-ins-nav data-om-ins-range="' . esc_attr( $key ) . '"' . ( $key === $this->range ? ' aria-current="true"' : '' ) . '>' . self::icon( 'check', 'om-ins-tick' ) . '<span>' . esc_html( $name ) . '</span>' . ( isset( $keys[ $key ] ) ? '<kbd>' . esc_html( $keys[ $key ] ) . '</kbd>' : '' ) . '</a></li>';
		}
		$out .= '</ul><div class="om-ins-cmp"><p class="om-ins-custom-t" id="om-ins-cmp-t">' . esc_html__( 'Compare with', 'om-catalog' ) . '</p><div class="om-ins-seg" role="group" aria-labelledby="om-ins-cmp-t">';
		foreach ( array( 'prev' => __( 'Period before', 'om-catalog' ), 'year' => __( 'Same time last year', 'om-catalog' ) ) as $key => $name ) {
			$out .= '<a href="' . esc_url( $this->url( array( 'cmp' => 'year' === $key ? 'year' : null, 'p' => null ) ) ) . '" data-om-ins-nav data-om-ins-cmp="' . esc_attr( $key ) . '"' . ( $key === $this->cmp ? ' aria-current="true"' : '' ) . '>' . esc_html( $name ) . '</a>';
		}
		$out .= '</div></div><form class="om-ins-custom" method="get" action="' . esc_url( admin_url( 'admin.php' ) ) . '" data-om-ins-custom>';
		$out .= '<input type="hidden" name="page" value="' . esc_attr( OM_Insights_Admin::SLUG ) . '" /><input type="hidden" name="tab" value="' . esc_attr( $this->tab ) . '" /><input type="hidden" name="range" value="custom" />';
		foreach ( $this->filters as $key => $value ) {
			$out .= '<input type="hidden" name="f[' . esc_attr( $key ) . ']" value="' . esc_attr( $value ) . '" />';
		}
		if ( 'year' === $this->cmp ) {
			$out .= '<input type="hidden" name="cmp" value="year" />';
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

	/** Change against the period compared with: ▲ 12% (good) / ▼ 8% (bad), then what it was. */
	private function delta( $now, $before, $up_is_good = true, $was = '' ) {
		$vs = $this->compare_name();
		if ( $before > 0 ) {
			$pct = (int) round( 100 * ( $now - $before ) / $before );
			if ( 0 === $pct ) {
				/* translators: %s: "the period before" or "the same time last year". */
				$out = '<span class="om-ins-delta">0%<span class="screen-reader-text"> ' . esc_html( sprintf( __( 'change from %s', 'om-catalog' ), $vs ) ) . '</span></span>';
			} else {
				$good = ( $pct > 0 ) === $up_is_good;
				/* translators: %s: "the period before" or "the same time last year". */
				$words = $pct > 0 ? sprintf( __( 'more than %s', 'om-catalog' ), $vs ) : sprintf( __( 'less than %s', 'om-catalog' ), $vs );
				$out   = '<span class="om-ins-delta ' . ( $good ? 'up' : 'down' ) . '"><span aria-hidden="true">' . ( $pct > 0 ? '&#9650;' : '&#9660;' ) . '</span> ' . esc_html( number_format_i18n( abs( $pct ) ) . '%' ) . '<span class="screen-reader-text"> ' . esc_html( $words ) . '</span></span>';
			}
			if ( '' !== $was ) {
				/* translators: %s: the number in the period compared with. */
				$out .= '<span class="om-ins-was">' . esc_html( sprintf( __( 'from %s', 'om-catalog' ), $was ) ) . '</span>';
			}
			return $out;
		}
		if ( $now > 0 ) {
			return '<span class="om-ins-delta">' . esc_html__( 'New', 'om-catalog' ) . '</span>';
		}
		return '<span class="om-ins-delta">&ndash;</span>';
	}

	/** One measure as shown in a tile: 1,761 / 4.4% / 1m 35s / $203,830. */
	private static function tile_value( $key, $value ) {
		return self::format_metric( $key, $value );
	}

	/**
	 * A headline number with its change. With $chart it is a button that shows
	 * the measure in the chart below (and draws its small line).
	 *
	 * @param array $t [ key, label, now, before, hint, good (up is good), sub ].
	 */
	private function tile( $t, $chart = true, $class = '' ) {
		$t     = array_merge( array( 'hint' => '', 'good' => true, 'sub' => '', 'value' => null, 'was' => null, 'before' => null ), $t );
		$value = null !== $t['value'] ? $t['value'] : self::tile_value( $t['key'], $t['now'] );
		$was   = null !== $t['was'] ? $t['was'] : ( null !== $t['before'] ? self::tile_value( $t['key'], $t['before'] ) : '' );
		$body  = '<span class="om-ins-tile-l">' . esc_html( $t['label'] ) . '</span>'
			. '<span class="om-ins-tile-v">' . esc_html( $value ) . '</span>'
			. ( null !== $t['before'] ? '<span class="om-ins-tile-d">' . $this->delta( $t['now'], $t['before'], $t['good'], $was ) . '</span>' : '' )
			. ( '' !== $t['sub'] ? '<span class="om-ins-tile-s">' . esc_html( $t['sub'] ) . '</span>' : '' )
			. ( $chart ? '<span class="om-ins-spark" data-om-ins-spark="' . esc_attr( $t['key'] ) . '" aria-hidden="true"></span>' : '' );
		$hint  = '' !== $t['hint'] ? ' title="' . esc_attr( $t['hint'] ) . '"' : '';
		if ( $chart ) {
			return '<button type="button" class="om-ins-tile ' . esc_attr( $class ) . '" data-om-ins-metric="' . esc_attr( $t['key'] ) . '" aria-pressed="false" aria-controls="om-ins-chart" aria-describedby="om-ins-tilehelp"' . $hint . '>' . $body . '</button>';
		}
		return '<div class="om-ins-tile is-static ' . esc_attr( $class ) . '"' . $hint . '>' . $body . '</div>';
	}

	/** Plain words for the headline numbers (shown on hover). */
	private static function hints() {
		return array(
			'leads'     => __( 'Visit requests, inquiries, hints, designs emailed and newsletter sign-ups sent from the site.', 'om-catalog' ),
			'bookings'  => __( 'Requests to visit the showroom: the leads closest to a sale.', 'om-catalog' ),
			'conv'      => __( 'Share of visits that became a lead.', 'om-catalog' ),
			'value'     => __( 'The listed prices of the designs people asked about, requested or emailed themselves.', 'om-catalog' ),
			'visitors'  => __( 'Different people (each browser counts once).', 'om-catalog' ),
			'visits'    => __( 'Times someone came to the site. A visit ends after 30 minutes without activity.', 'om-catalog' ),
			'engaged'   => __( 'Visits that did more than glance: more than one page, more than 10 seconds, a design opened, a lead, or a tap to call, text, email or get directions.', 'om-catalog' ),
			'designs'   => __( 'Product pages and quick views opened.', 'om-catalog' ),
			'saves'     => __( 'Designs saved with the heart.', 'om-catalog' ),
			'calls'     => __( 'Taps on the phone number or the Text button: people reaching for the phone. The call or text itself happens off the site.', 'om-catalog' ),
			'contacts'  => __( 'Taps to get directions or on the email address. The trip or email itself happens off the site.', 'om-catalog' ),
			'time'      => __( 'Average time actively on the site, screen on and in use.', 'om-catalog' ),
			'pageviews' => __( 'Pages opened, all visits together.', 'om-catalog' ),
		);
	}

	/** "compared with Aug 17 – Sep 15, 2026". */
	public function compare_text() {
		list( $pf, $pt ) = $this->previous();
		$a = strtotime( $pf . ' 12:00:00' );
		$b = strtotime( $pt . ' 12:00:00' );
		$dates = $pf === $pt ? wp_date( 'D, M j, Y', $a ) : wp_date( gmdate( 'Y', $a ) === gmdate( 'Y', $b ) ? 'M j' : 'M j, Y', $a ) . ' – ' . wp_date( 'M j, Y', $b );
		/* translators: 1: dates, 2: "the period before" or "the same time last year". */
		return 'year' === $this->cmp ? sprintf( __( 'compared with the same time last year (%s)', 'om-catalog' ), $dates ) : sprintf( __( 'compared with %s', 'om-catalog' ), $dates );
	}

	/**
	 * The results band at the top of the overview: leads, visit requests, calls
	 * and texts, lead rate and the value of the designs asked about; what the
	 * leads were; the month's goals.
	 */
	private function hero( $k, $b ) {
		$h     = self::hints();
		$names = self::metrics();
		$out   = '<section class="om-ins-hero2" aria-labelledby="om-ins-hero-t">';
		$out  .= '<header class="om-ins-hero2-head"><h2 id="om-ins-hero-t">' . esc_html__( 'Results', 'om-catalog' ) . '</h2><p>' . esc_html( $this->period_text() . ' · ' . $this->compare_text() ) . '</p></header>';
		$out  .= '<div class="om-ins-hero2-tiles">';
		$out  .= $this->tile( array( 'key' => 'leads', 'label' => $names['leads'][0], 'now' => $k['leads'], 'before' => $b['leads'], 'hint' => $h['leads'] ), true, 'is-hero is-lead' );
		$out  .= $this->tile( array( 'key' => 'bookings', 'label' => $names['bookings'][0], 'now' => $k['bookings'], 'before' => $b['bookings'], 'hint' => $h['bookings'] ), true, 'is-hero' );
		// Calls and texts: for a shop, the other way people get in touch (taps; the call itself happens off the site).
		/* translators: 1: calls, 2: texts. */
		$sub   = $k['calls'] ? sprintf( __( '%1$s calls · %2$s texts', 'om-catalog' ), number_format_i18n( $k['phone'] ), number_format_i18n( $k['texts'] ) ) : '';
		$out  .= $this->tile( array( 'key' => 'calls', 'label' => $names['calls'][0], 'now' => $k['calls'], 'before' => $b['calls'], 'hint' => $h['calls'], 'sub' => $sub ), true, 'is-hero' );
		$out  .= $this->tile( array( 'key' => 'conv', 'label' => $names['conv'][0], 'now' => $k['conv'], 'before' => $b['conv'], 'hint' => $h['conv'] ), true, 'is-hero' );
		/* translators: %s: number of leads. */
		$sub   = $k['valued'] ? sprintf( _n( '%s lead named a design', '%s leads named a design', $k['valued'], 'om-catalog' ), number_format_i18n( $k['valued'] ) ) : '';
		$out  .= $this->tile( array( 'key' => 'value', 'label' => $names['value'][0], 'now' => $k['value'], 'before' => $b['value'], 'hint' => $h['value'], 'sub' => $sub ), true, 'is-hero' );
		$out  .= '</div>';
		if ( $k['leads'] ) {
			/* translators: %s: number of leads. */
			$out .= '<div class="om-ins-hero2-mix"><p class="om-ins-hero2-t">' . esc_html( sprintf( _n( 'What the %s lead was', 'What the %s leads were', $k['leads'], 'om-catalog' ), number_format_i18n( $k['leads'] ) ) ) . '</p>' . self::mix( $k['groups'] ) . '</div>';
		}
		$out .= self::goals_block();
		return $out . '<span class="screen-reader-text" id="om-ins-tilehelp">' . esc_html__( 'Shows this measure in the chart below.', 'om-catalog' ) . '</span></section>';
	}

	/** Traffic and interest under the results: six tiles that also pick the chart. */
	private function strip( $k, $b ) {
		$h     = self::hints();
		$names = self::metrics();
		$out   = '<div class="om-ins-strip">';
		foreach ( array( 'visitors', 'visits', 'engaged', 'designs', 'saves', 'contacts' ) as $key ) {
			$out .= $this->tile( array( 'key' => $key, 'label' => $names[ $key ][0], 'now' => $k[ $key ], 'before' => $b[ $key ], 'hint' => $h[ $key ] ) );
		}
		return $out . '</div>';
	}

	/** Leads by how close they are to a sale: one bar in four golds (darkest: visit requests), a key with each count. */
	private static function mix( $groups ) {
		$total = array_sum( array_map( 'intval', (array) $groups ) );
		$bar   = '';
		$key   = '';
		$i     = 0;
		foreach ( self::lead_groups() as $g => $def ) {
			++$i;
			$n     = (int) ( $groups[ $g ] ?? 0 );
			$share = $total ? self::pct( $n, $total, 0 ) : '0%';
			if ( $n ) {
				$bar .= '<span class="g' . $i . '" style="flex-grow:' . $n . '" data-tip="' . esc_attr( $def[0] . ': ' . number_format_i18n( $n ) . ' (' . $share . ')' ) . '"></span>';
			}
			$key .= '<li><i class="g' . $i . '" aria-hidden="true"></i><span>' . esc_html( $def[0] ) . '</span><b>' . esc_html( number_format_i18n( $n ) ) . '</b><small>' . esc_html( $share ) . '</small></li>';
		}
		return '<div class="om-ins-mix">' . ( $total ? '<div class="om-ins-mixbar" aria-hidden="true">' . $bar . '</div>' : '' ) . '<ul class="om-ins-mixkey">' . $key . '</ul></div>';
	}

	/** This month against its goals (the whole site), when goals are set. */
	private static function goals_block() {
		$p = self::pace();
		if ( ! $p ) {
			return '';
		}
		$out = '';
		foreach ( array( 'leads' => __( 'leads', 'om-catalog' ), 'visits' => __( 'visit requests', 'om-catalog' ) ) as $key => $word ) {
			$g = $p[ $key ];
			if ( ! $g['goal'] ) {
				continue;
			}
			$state = null === $g['pace'] ? '' : ( $g['pace'] >= $g['goal'] ? 'is-ok' : ( $g['pace'] < 0.85 * $g['goal'] ? 'is-low' : 'is-near' ) );
			/* translators: 1: month, 2: "leads" or "visit requests". */
			$label = sprintf( __( '%1$s goal: %2$s', 'om-catalog' ), $p['month'], $word );
			if ( null === $g['pace'] ) {
				$line = __( 'The pace shows from the second day of the month.', 'om-catalog' );
			} else {
				/* translators: 1: projected number, 2: day of the month, 3: days in the month. */
				$line = sprintf( __( 'On pace for %1$s by the end of the month · day %2$s of %3$s', 'om-catalog' ), number_format_i18n( $g['pace'] ), number_format_i18n( $p['day'] ), number_format_i18n( $p['days'] ) );
			}
			$done = min( 100, 100 * $g['n'] / $g['goal'] );
			$mark = null !== $g['pace'] ? '<s style="left:' . esc_attr( round( min( 100, 100 * $g['pace'] / $g['goal'] ), 2 ) ) . '%"></s>' : '';
			$out .= '<div class="om-ins-goal ' . esc_attr( $state ) . '"><div class="om-ins-goal-t"><span>' . esc_html( $label ) . '</span><b>' . esc_html( number_format_i18n( $g['n'] ) ) . '<small> / ' . esc_html( number_format_i18n( $g['goal'] ) ) . '</small></b></div>'
				. '<div class="om-ins-goalbar" role="progressbar" aria-label="' . esc_attr( $label ) . '" aria-valuemin="0" aria-valuemax="' . (int) $g['goal'] . '" aria-valuenow="' . (int) min( $g['n'], $g['goal'] ) . '"><i style="width:' . esc_attr( round( $done, 2 ) ) . '%"></i>' . $mark . '</div>'
				. '<small class="om-ins-goal-s">' . esc_html( $line ) . '</small></div>';
		}
		return '' !== $out ? '<div class="om-ins-goals"><p class="om-ins-hero2-t">' . esc_html__( 'This month, whole site', 'om-catalog' ) . '</p><div class="om-ins-goals-in">' . $out . '</div></div>' : '';
	}

	/** What stood out: ranked findings, each with what to do and where to look. The first $show open, the rest folded. */
	private function findings_card( $list, $show = 4 ) {
		if ( ! $list ) {
			return '';
		}
		$tones = array(
			'good'  => array( __( 'Going well', 'om-catalog' ), 'up' ),
			'watch' => array( __( 'Worth a look', 'om-catalog' ), 'alert' ),
			'idea'  => array( __( 'Idea', 'om-catalog' ), 'bulb' ),
			'info'  => array( __( 'Good to know', 'om-catalog' ), 'info' ),
		);
		$item  = static function ( $f ) use ( $tones ) {
			$t = $tones[ $f['tone'] ] ?? $tones['info'];
			return '<li class="om-ins-fd is-' . esc_attr( $f['tone'] ) . '"><span class="om-ins-fd-i" aria-hidden="true">' . self::icon( $t[1] ) . '</span><div class="om-ins-fd-b">'
				. '<span class="om-ins-fd-tag">' . esc_html( $t[0] ) . '</span><h3>' . esc_html( $f['title'] ) . '</h3><p>' . esc_html( $f['text'] ) . '</p>'
				. ( '' !== $f['do'] ? '<p class="om-ins-fd-do"><b>' . esc_html__( 'Next step:', 'om-catalog' ) . '</b> ' . esc_html( $f['do'] ) . '</p>' : '' )
				. ( '' !== $f['href'] ? '<a class="om-ins-fd-a" href="' . esc_url( $f['href'] ) . '" data-om-ins-nav>' . esc_html( $f['link'] ) . self::icon( 'arrow' ) . '</a>' : '' )
				. '</div></li>';
		};
		$out = '<ol class="om-ins-fds">' . implode( '', array_map( $item, array_slice( $list, 0, $show ) ) ) . '</ol>';
		$more = array_slice( $list, $show );
		if ( $more ) {
			/* translators: %s: number of findings. */
			$out .= '<details class="om-ins-fds-more"><summary>' . esc_html( sprintf( _n( 'Show %s more', 'Show %s more', count( $more ), 'om-catalog' ), number_format_i18n( count( $more ) ) ) ) . '</summary><ol class="om-ins-fds" start="' . (int) ( $show + 1 ) . '">' . implode( '', array_map( $item, $more ) ) . '</ol></details>';
		}
		/* translators: %s: "the period before" or "the same time last year". */
		return self::card( __( 'What stood out', 'om-catalog' ), $out, array( 'sub' => sprintf( __( 'Most important first, against %s, with what to do next.', 'om-catalog' ), $this->compare_name() ), 'class' => 'om-ins-findcard' ) );
	}

	/** Round steps for an axis of counts (4 lines or fewer): [ max, ticks ]. */
	private static function nice_scale( $max ) {
		$max = (float) $max;
		if ( $max <= 0 ) {
			return array( 4, array( 0, 1, 2, 3, 4 ) );
		}
		$raw  = $max / 4;
		$mag  = pow( 10, floor( log10( $raw ) ) );
		$norm = $raw / $mag;
		$step = max( 1, round( ( $norm <= 1 ? 1 : ( $norm <= 2 ? 2 : ( $norm <= 2.5 && $mag >= 10 ? 2.5 : ( $norm <= 5 ? 5 : 10 ) ) ) ) * $mag ) );
		$n    = max( 1, (int) ceil( $max / $step - 1e-9 ) );
		$ticks = array();
		for ( $i = 0; $i <= $n; $i++ ) {
			$ticks[] = $i * $step;
		}
		return array( $n * $step, $ticks );
	}

	/**
	 * Leads over time: a column per day (week, month), stacked by how close the
	 * leads are to a sale, with a key; the same numbers as a table.
	 */
	private static function columns( $chart ) {
		$groups = self::lead_groups();
		$n      = min( count( $chart['labels'] ), (int) $chart['cut'] );
		$totals = array();
		for ( $i = 0; $i < $n; $i++ ) {
			$t = 0;
			foreach ( array_keys( $groups ) as $g ) {
				$t += (int) ( $chart['g'][ $g ][ $i ] ?? 0 );
			}
			$totals[] = $t;
		}
		if ( ! array_sum( $totals ) ) {
			return self::empty_note( __( 'No leads in this period yet.', 'om-catalog' ) );
		}
		list( $top, $ticks ) = self::nice_scale( max( $totals ) );
		$out = '<div class="om-ins-cols" style="--n:' . (int) $n . '"><div class="om-ins-cols-plot">';
		foreach ( $ticks as $t ) {
			$out .= '<span class="om-ins-cols-g' . ( $t ? '' : ' is-base' ) . '" style="bottom:' . esc_attr( round( 100 * $t / $top, 3 ) ) . '%" aria-hidden="true"><em>' . esc_html( number_format_i18n( $t ) ) . '</em></span>';
		}
		$out .= '<div class="om-ins-cols-in">';
		for ( $i = 0; $i < $n; $i++ ) {
			$segs  = '';
			$words = array();
			$j     = 0;
			foreach ( $groups as $g => $def ) {
				++$j;
				$v = (int) ( $chart['g'][ $g ][ $i ] ?? 0 );
				if ( $v ) {
					$segs   .= '<i class="g' . $j . '" style="height:' . esc_attr( round( 100 * $v / $top, 3 ) ) . '%"></i>';
					$words[] = $def[0] . ' ' . number_format_i18n( $v );
				}
			}
			/* translators: 1: day or week, 2: number of leads. */
			$when = $chart['tips'][ $i ] . ( ! empty( $chart['partial'] ) && $i === $n - 1 ? ' (' . __( 'so far', 'om-catalog' ) . ')' : '' );
			$tip  = sprintf( _n( '%1$s: %2$s lead', '%1$s: %2$s leads', $totals[ $i ], 'om-catalog' ), $when, number_format_i18n( $totals[ $i ] ) ) . ( $words ? ' · ' . implode( ' · ', $words ) : '' );
			$out .= '<div class="om-ins-col" data-tip="' . esc_attr( $tip ) . '">' . $segs . '</div>';
		}
		$out   .= '</div></div><div class="om-ins-cols-x" aria-hidden="true">';
		$stride = max( 1, (int) ceil( $n / 8 ) );
		for ( $i = 0; $i < $n; $i++ ) {
			$out .= '<span>' . ( 0 === $i % $stride ? esc_html( $chart['labels'][ $i ] ) : '' ) . '</span>';
		}
		$out .= '</div></div>';
		$key  = '<ul class="om-ins-mixkey om-ins-colkey">';
		$j    = 0;
		foreach ( $groups as $g => $def ) {
			++$j;
			$key .= '<li><i class="g' . $j . '" aria-hidden="true"></i><span>' . esc_html( $def[0] ) . '</span><b>' . esc_html( number_format_i18n( array_sum( array_slice( (array) ( $chart['g'][ $g ] ?? array() ), 0, $n ) ) ) ) . '</b></li>';
		}
		$key  .= '</ul>';
		$table = '<details class="om-ins-data"><summary>' . esc_html__( 'Show as table', 'om-catalog' ) . '</summary><div class="om-ins-scroll"><table class="om-ins-table"><thead><tr><th scope="col">' . esc_html__( 'Period', 'om-catalog' ) . '</th>';
		foreach ( $groups as $def ) {
			$table .= '<th scope="col" class="num">' . esc_html( $def[0] ) . '</th>';
		}
		$table .= '<th scope="col" class="num">' . esc_html__( 'All leads', 'om-catalog' ) . '</th></tr></thead><tbody>';
		for ( $i = $n - 1; $i >= 0; $i-- ) {
			$table .= '<tr><th scope="row">' . esc_html( $chart['tips'][ $i ] ) . '</th>';
			foreach ( array_keys( $groups ) as $g ) {
				$table .= '<td class="num">' . esc_html( number_format_i18n( (int) ( $chart['g'][ $g ][ $i ] ?? 0 ) ) ) . '</td>';
			}
			$table .= '<td class="num">' . esc_html( number_format_i18n( $totals[ $i ] ) ) . '</td></tr>';
		}
		$table .= '</tbody></table></div></details>';
		return $key . $out . $table;
	}

	/**
	 * A lead rate in a table: the rate with a small bar against the best row,
	 * marked when there are too few visits to trust it.
	 */
	private static function rate_cell( $conv, $visits, $best ) {
		$conv   = (int) $conv;
		$visits = (int) $visits;
		$rate   = $visits ? $conv / $visits : 0;
		$few    = $visits < 30;
		$bar    = '<span class="om-ins-ratebar" aria-hidden="true"><i style="width:' . esc_attr( $best > 0 ? round( min( 100, 100 * $rate / $best ), 1 ) : 0 ) . '%"></i></span>';
		$text   = esc_html( self::pct( $conv, $visits ) );
		if ( $few ) {
			$text .= '<sup aria-hidden="true">*</sup><span class="screen-reader-text"> ' . esc_html__( '(few visits, so this rate can swing a lot)', 'om-catalog' ) . '</span>';
		}
		return array( '<span class="om-ins-rate' . ( $few ? ' is-few' : '' ) . '"' . ( $few ? ' data-tip="' . esc_attr__( 'Fewer than 30 visits: this rate can swing a lot.', 'om-catalog' ) . '"' : '' ) . '>' . $bar . '<span>' . $text . '</span></span>', $rate );
	}

	/** The best rate among rows with enough visits (for the bars in rate cells). */
	private static function best_rate( $rows, $conv = 'converted', $visits = 'visits' ) {
		$best = 0;
		foreach ( $rows as $r ) {
			if ( (int) $r[ $visits ] > 0 ) {
				$best = max( $best, (int) $r[ $conv ] / (int) $r[ $visits ] );
			}
		}
		return $best;
	}

	/** Page speed: each measure as Google judges it (the value 3 in 4 page views beat), good / needs work / poor, phones and computers. */
	private function speed_card( $sp ) {
		if ( empty( $sp['n'] ) ) {
			$why = '0' === OM_Insights::opt( 'om_ins_speed' ) ? __( 'Measuring page speed is switched off under Settings.', 'om-catalog' ) : __( 'Nothing measured in this period yet. Speed is measured in visitors\' browsers from version 1.44 on.', 'om-catalog' );
			return self::card( __( 'Page speed', 'om-catalog' ), self::empty_note( $why ) );
		}
		$about  = array(
			'lcp'  => __( 'How long until the biggest picture or heading appeared.', 'om-catalog' ),
			'inp'  => __( 'How long the page took to react to a tap or click.', 'om-catalog' ),
			'cls'  => __( 'How much things jumped around while the page loaded.', 'om-catalog' ),
			'ttfb' => __( 'How long the server took to start sending the page.', 'om-catalog' ),
		);
		$states = array(
			'good' => array( __( 'Good', 'om-catalog' ), 'check' ),
			'slow' => array( __( 'Needs work', 'om-catalog' ), 'clock' ),
			'poor' => array( __( 'Poor', 'om-catalog' ), 'alert' ),
		);
		$out = '<div class="om-ins-vitals">';
		foreach ( self::vitals() as $key => $v ) {
			$m = $sp['m'][ $key ];
			/* translators: 1: good up to, 2: poor above. */
			$limits = sprintf( __( 'Good: %1$s or less. Poor: over %2$s.', 'om-catalog' ), self::vital_text( $key, $v[1] ), self::vital_text( $key, $v[2] ) );
			if ( ! $m['n'] ) {
				$out .= '<div class="om-ins-vital"><p class="om-ins-vital-l">' . esc_html( $v[0] ) . '</p><p class="om-ins-vital-none">' . esc_html__( 'Not measured yet', 'om-catalog' ) . '</p><p class="om-ins-vital-a">' . esc_html( $about[ $key ] ) . '</p></div>';
				continue;
			}
			$rating = self::vital_rating( $key, $m['p75'] );
			$dist   = '';
			$words  = array();
			foreach ( $states as $s => $def ) {
				if ( $m[ $s ] ) {
					$dist .= '<span class="' . esc_attr( $s ) . '" style="flex-grow:' . (int) $m[ $s ] . '" data-tip="' . esc_attr( $def[0] . ': ' . self::pct( $m[ $s ], $m['n'], 0 ) ) . '"></span>';
				}
				$words[] = '<li class="' . esc_attr( $s ) . '"><i aria-hidden="true"></i>' . esc_html( $def[0] ) . ' <b>' . esc_html( self::pct( $m[ $s ], $m['n'], 0 ) ) . '</b></li>';
			}
			$dev = array();
			foreach ( array( 'phone' => __( 'Phones', 'om-catalog' ), 'desktop' => __( 'Computers', 'om-catalog' ), 'tablet' => __( 'Tablets', 'om-catalog' ) ) as $d => $name ) {
				if ( ! empty( $m['dev'][ $d ]['n'] ) ) {
					$dev[] = '<span>' . self::icon( self::device_icon( $d ) ) . esc_html( $name ) . ' <b class="' . esc_attr( self::vital_rating( $key, $m['dev'][ $d ]['p75'] ) ) . '">' . esc_html( self::vital_text( $key, $m['dev'][ $d ]['p75'] ) ) . '</b></span>';
				}
			}
			$out .= '<div class="om-ins-vital is-' . esc_attr( $rating ) . '"><p class="om-ins-vital-l">' . esc_html( $v[0] ) . '</p>'
				. '<p class="om-ins-vital-v"><b>' . esc_html( self::vital_text( $key, $m['p75'] ) ) . '</b><span class="om-ins-vital-r">' . self::icon( $states[ $rating ][1] ) . esc_html( $states[ $rating ][0] ) . '</span></p>'
				. '<p class="om-ins-vital-a">' . esc_html( $about[ $key ] ) . ' ' . esc_html( $limits ) . '</p>'
				. '<div class="om-ins-dist" aria-hidden="true">' . $dist . '</div><ul class="om-ins-distkey">' . implode( '', $words ) . '</ul>'
				. ( $dev ? '<p class="om-ins-vital-dev">' . implode( '', $dev ) . '</p>' : '' ) . '</div>';
		}
		$out .= '</div>';
		/* translators: %s: number of page views. */
		$sub = sprintf( _n( 'From %s page view, in visitors\' own browsers. Each number is the one 3 in 4 page views beat, the way Google judges speed. Safari and some other browsers report only some of these.', 'From %s page views, in visitors\' own browsers. Each number is the one 3 in 4 page views beat, the way Google judges speed. Safari and some other browsers report only some of these.', $sp['n'], 'om-catalog' ), number_format_i18n( $sp['n'] ) );
		return self::card( __( 'Page speed', 'om-catalog' ), $out, array( 'sub' => $sub, 'class' => 'om-ins-speedcard' ) );
	}

	/**
	 * The time chart: drawn in the browser from its data, the measure picked
	 * from the menu (or a tile above); the same numbers as a table.
	 */
	private function chart_card( $chart, $metric = 'leads' ) {
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
		$menu = '<label class="om-ins-metricpick"><span class="screen-reader-text">' . esc_html__( 'Measure shown in the chart', 'om-catalog' ) . '</span><select data-om-ins-metric-select aria-controls="om-ins-chart">';
		foreach ( self::metric_groups() as $group => $keys ) {
			$menu .= '<optgroup label="' . esc_attr( $group ) . '">';
			foreach ( $keys as $key ) {
				$menu .= '<option value="' . esc_attr( $key ) . '"' . selected( $key, $metric, false ) . '>' . esc_html( $names[ $key ] ) . '</option>';
			}
			$menu .= '</optgroup>';
		}
		$menu .= '</select>' . self::icon( 'chevron', 'om-ins-caret' ) . '</label>';
		$out   = '<section class="om-ins-card om-ins-chartcard" data-om-ins-chartcard aria-labelledby="om-ins-chart-h">';
		$out  .= '<header class="om-ins-cardhead"><div class="om-ins-charthead"><h2 id="om-ins-chart-h">' . esc_html__( 'Over time', 'om-catalog' ) . '</h2>' . $menu . '</div>';
		$out  .= '<div class="om-ins-chart-tools"><div class="om-ins-legend" data-om-ins-legend><span><i class="om-ins-key cur" aria-hidden="true"></i>' . esc_html__( 'This period', 'om-catalog' ) . '</span><span data-om-ins-legend-prev><i class="om-ins-key prev" aria-hidden="true"></i>' . esc_html( $this->compare_name( true ) ) . '</span></div>' . $units . '</div></header>';
		$out  .= '<div class="om-ins-plot" id="om-ins-chart" role="img" aria-label="' . esc_attr( $names[ $metric ] ?? '' ) . '" data-om-ins-plot></div>';
		$out  .= '<details class="om-ins-data"><summary>' . esc_html__( 'Show as table', 'om-catalog' ) . '</summary><div data-om-ins-table>' . self::chart_table( $chart ) . '</div></details>';
		$out  .= '<script type="application/json" data-om-ins-json>' . wp_json_encode( $data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . '</script>';
		return $out . '</section>';
	}

	/** The chart's numbers, as a table (also built by the script when the interval changes). */
	private static function chart_table( $chart ) {
		$cols = array( 'leads', 'bookings', 'conv', 'visitors', 'visits', 'designs' );
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

	/** Steps, each part of the one before: a meter per step, what carried on, and the period compared with. */
	private static function funnel( $title, $desc, $steps, $before = array(), $vs = '' ) {
		$first = max( 1, (int) ( $steps[0][1] ?? 0 ) );
		$base  = max( 1, (int) ( $before[0][1] ?? 0 ) );
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
			$was   = isset( $before[ $i ][1] ) ? (int) $before[ $i ][1] : null;
			$tip   = $s[0] . ': ' . number_format_i18n( $n ) . ( $i ? ' (' . self::pct( $n, (int) $steps[0][1], 0 ) . ' ' . __( 'of the first step', 'om-catalog' ) . ')' : '' ) . ( null !== $was ? ' · ' . $vs . ': ' . number_format_i18n( $was ) : '' );
			$then  = '';
			$mark  = '';
			if ( null !== $was && ( $was || $n ) ) {
				/* translators: 1: "Period before" or "Last year", 2: number. */
				$then = '<small class="om-ins-funnel-was">' . esc_html( sprintf( __( '%1$s: %2$s', 'om-catalog' ), $vs, number_format_i18n( $was ) ) ) . '</small>';
				$mark = '<s style="left:' . esc_attr( round( min( 100, 100 * $was / $base ), 2 ) ) . '%"></s>';
			}
			$out  .= '<li class="om-ins-funnel-step" tabindex="0" data-tip="' . esc_attr( $tip ) . '"><span class="om-ins-funnel-n" aria-hidden="true">' . (int) ( $i + 1 ) . '</span><span class="om-ins-funnel-name">' . esc_html( $s[0] ) . $then . '</span><span class="om-ins-funnel-v"><b>' . esc_html( number_format_i18n( $n ) ) . '</b>' . ( $i ? '<small>' . esc_html( self::pct( $n, (int) $steps[0][1], 0 ) ) . '</small>' : '' ) . '</span><span class="om-ins-meter" aria-hidden="true"><i style="width:' . esc_attr( round( min( 100, $share ), 2 ) ) . '%"></i>' . $mark . '</span></li>';
			$prev  = $n;
		}
		$out .= '</ol>';
		return self::card( $title, $out, array( 'sub' => $desc, 'class' => 'om-ins-funnelcard' ) );
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

	/** A row of plain headline numbers (no chart behind them). */
	private function stats( $items, $class = '' ) {
		$out = '<div class="om-ins-strip is-stats ' . esc_attr( $class ) . '">';
		foreach ( $items as $t ) {
			$out .= $this->tile( $t, false );
		}
		return $out . '</div>';
	}

	/** Rows of a ranked list from the sources leads came through: by the visit they got in touch on, or their first. */
	private function lead_source_rows( $attr, $key ) {
		$list = $attr['by'];
		uasort(
			$list,
			static function ( $a, $b ) use ( $key ) {
				return $b[ $key ] <=> $a[ $key ];
			}
		);
		$total = max( 1, (int) $attr['total'] + (int) ( $attr['unlinked'] ?? 0 ) );
		$rows  = array();
		foreach ( $list as $channel => $c ) {
			if ( ! $c[ $key ] ) {
				continue;
			}
			$none   = 'none' === $channel;
			$rows[] = array(
				'label'  => self::channel_name( $channel ),
				'icon'   => self::channel_icon( $channel ),
				'value'  => (int) $c[ $key ],
				'show'   => self::compact( $c[ $key ] ),
				'share'  => $c[ $key ] / $total,
				/* translators: 1: leads that first came this way, 2: leads whose own visit came this way, 3: leads it helped along. */
				'tip'    => $none ? self::unlinked_words() : sprintf( __( 'First visit: %1$s · Visit they got in touch on: %2$s · Helped along: %3$s', 'om-catalog' ), number_format_i18n( $c['first'] ), number_format_i18n( $c['last'] ), number_format_i18n( $c['helped'] ) ),
				'filter' => $none ? null : array( 'channel', $channel ),
			);
		}
		return $rows;
	}

	/** Designs whose views rose (or fell) against the period compared with. */
	private static function mover_rows( $list, $up = true ) {
		$rows = array();
		foreach ( $list as $r ) {
			$d      = self::design( $r['item'], $r['title'] );
			$rows[] = array(
				'label'  => $d['title'],
				/* translators: 1: views now, 2: views before. */
				'sub'    => sprintf( __( '%1$s views, from %2$s', 'om-catalog' ), number_format_i18n( $r['now'] ), number_format_i18n( $r['before'] ) ),
				'img'    => $d['image'],
				'value'  => abs( (int) $r['diff'] ),
				'show'   => ( $up ? '+' : '−' ) . self::compact( abs( (int) $r['diff'] ) ),
				'filter' => array( 'item', $r['item'] ),
				'ext'    => $d['url'],
			);
		}
		return $rows;
	}

	private function tab_overview() {
		$unit = $this->unit();
		$f    = $this->findings_data();
		$k    = $f['now'];
		$b    = $f['before'];
		if ( ! $k['visits'] && ! $b['visits'] ) {
			return $this->empty_state();
		}
		$data  = $this->cached(
			'overview2|' . $unit,
			function () use ( $unit ) {
				$landing = $this->by_visit( 'landing', 8 );
				$exits   = $this->by_visit( 'exit_page', 8 );
				return array(
					'chart'   => $this->chart( $unit ),
					'pages'   => $this->pages( 8 ),
					'landing' => $landing,
					'exits'   => $exits,
					'titles'  => $this->page_titles( array_merge( wp_list_pluck( $landing, 'k' ), wp_list_pluck( $exits, 'k' ) ) ),
					'loc'     => $this->locations( 8 ),
					'search'  => $this->searches( 8 ),
					'leads'   => $this->leads( 6 ),
				);
			}
		);
		$total = $k['visits'];
		$out   = $this->hero( $k, $b ) . $this->strip( $k, $b );
		// The month's goals are in the results band already.
		$finds = array_values(
			array_filter(
				$this->findings( $f, 12 ),
				static function ( $x ) use ( $f ) {
					return ! $f['pace'] || 'goal' !== $x['kind'];
				}
			)
		);
		$out  .= $this->findings_card( array_slice( $finds, 0, 10 ), 4 );
		$out  .= $this->chart_card( $data['chart'], 'leads' );
		$out  .= '<div class="om-ins-grid">';
		$out  .= $this->panel(
			'lsrc',
			__( 'Where leads came from', 'om-catalog' ),
			array(
				array( 'label' => __( 'Visit they got in touch on', 'om-catalog' ), 'head' => array( __( 'Source', 'om-catalog' ), __( 'Leads', 'om-catalog' ) ), 'rows' => $this->lead_source_rows( $f['attr'], 'last' ), 'empty' => __( 'No leads in this period yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Their first visit', 'om-catalog' ), 'head' => array( __( 'Source', 'om-catalog' ), __( 'Leads', 'om-catalog' ) ), 'rows' => $this->lead_source_rows( $f['attr'], 'first' ), 'empty' => __( 'No leads in this period yet.', 'om-catalog' ) ),
			),
			array( $this->url( array( 'tab' => 'leads' ) ), __( 'All about leads', 'om-catalog' ) ),
			__( 'Many people visit more than once before getting in touch. Their first visit shows how they found you.', 'om-catalog' )
		);
		$out .= $this->panel(
			'ds',
			__( 'Designs', 'om-catalog' ),
			array(
				array( 'label' => __( 'Most viewed', 'om-catalog' ), 'head' => array( __( 'Design', 'om-catalog' ), __( 'Views', 'om-catalog' ) ), 'rows' => self::design_rows( $f['designs'], 'views', 6 ), 'empty' => __( 'No designs viewed yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Rising', 'om-catalog' ), 'head' => array( __( 'Design', 'om-catalog' ), __( 'More views', 'om-catalog' ) ), 'rows' => self::mover_rows( array_slice( $f['movers'][0], 0, 6 ) ), 'empty' => __( 'No design gained many views.', 'om-catalog' ) ),
				array( 'label' => __( 'Asked about', 'om-catalog' ), 'head' => array( __( 'Design', 'om-catalog' ), __( 'Leads', 'om-catalog' ) ), 'rows' => self::design_rows( $f['designs'], 'leads', 6 ), 'empty' => __( 'No inquiries about a design yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Saved', 'om-catalog' ), 'head' => array( __( 'Design', 'om-catalog' ), __( 'Saves', 'om-catalog' ) ), 'rows' => self::design_rows( $f['designs'], 'saves', 6 ), 'empty' => __( 'Nothing saved yet.', 'om-catalog' ) ),
			),
			array( $this->url( array( 'tab' => 'designs' ) ), __( 'All designs', 'om-catalog' ) )
		);
		$out .= $this->panel(
			'pg',
			__( 'Pages', 'om-catalog' ),
			array(
				array( 'label' => __( 'Most viewed', 'om-catalog' ), 'head' => array( __( 'Page', 'om-catalog' ), __( 'Views', 'om-catalog' ) ), 'rows' => $this->page_rows( $data['pages'] ), 'empty' => __( 'No page views yet.', 'om-catalog' ) ),
				array( 'label' => __( 'First pages', 'om-catalog' ), 'head' => array( __( 'Page', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $this->path_rows( $data['landing'], 'landing', $data['titles'], $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Last pages', 'om-catalog' ), 'head' => array( __( 'Page', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $this->path_rows( $data['exits'], 'exit', $data['titles'], $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
			),
			array( $this->url( array( 'tab' => 'pages' ) ), __( 'All pages and speed', 'om-catalog' ) )
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
		$new   = (int) $k['new'];
		$kinds = array(
			array( 'label' => __( 'First visit', 'om-catalog' ), 'icon' => 'user', 'value' => $new, 'show' => self::compact( $new ), 'share' => $total ? $new / $total : null, 'filter' => array( 'kind', 'new' ) ),
			array( 'label' => __( 'Came back', 'om-catalog' ), 'icon' => 'refresh', 'value' => $total - $new, 'show' => self::compact( $total - $new ), 'share' => $total ? ( $total - $new ) / $total : null, 'filter' => array( 'kind', 'returning' ) ),
		);
		$place = self::location_tabs( $data['loc'], $total )[0];
		$out  .= $this->panel(
			'who',
			__( 'Who visited', 'om-catalog' ),
			array(
				array( 'label' => __( 'Devices', 'om-catalog' ), 'head' => array( __( 'Device', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $f['devices'], 'device', $total, array( __CLASS__, 'device_icon' ), array( __CLASS__, 'device_one' ) ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
				array( 'label' => __( 'New and returning', 'om-catalog' ), 'head' => array( __( 'Visits', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $kinds, 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
				$place,
			),
			array( $this->url( array( 'tab' => 'audience' ) ), __( 'All about visitors', 'om-catalog' ) )
		);
		$out .= self::card( __( 'When people visit', 'om-catalog' ), self::heatmap( $f['heat'] ), array( 'sub' => __( 'Visits by day of the week and hour, in your site\'s time zone. Darker is busier.', 'om-catalog' ) ) );
		$out .= '</div>';
		$out .= self::card( __( 'Latest leads', 'om-catalog' ), $this->people( $data['leads'] ), array( 'sub' => __( 'Who got in touch. Open one to see their visit.', 'om-catalog' ), 'more' => array( $this->url( array( 'tab' => 'leads' ) ), __( 'All leads', 'om-catalog' ) ) ) );
		return $out;
	}

	private function tab_leads() {
		$f    = $this->findings_data();
		$k    = $f['now'];
		$b    = $f['before'];
		$span = $this->span();
		$unit = 1 === $span ? 'hour' : ( $span <= 45 ? 'day' : ( $span <= 400 ? 'week' : 'month' ) );
		$data = $this->cached(
			'leads2|' . $unit,
			function () use ( $unit ) {
				$list = $this->leads( 300 );
				return array(
					'list'   => $list,
					'chart'  => $this->chart( $unit ),
					'prices' => self::prices( wp_list_pluck( $list, 'item' ) ),
				);
			}
		);
		$names = self::lead_groups();
		$h     = self::hints();
		$out   = $this->stats(
			array(
				array( 'key' => 'leads', 'label' => __( 'Leads', 'om-catalog' ), 'now' => $k['leads'], 'before' => $b['leads'], 'hint' => $h['leads'] ),
				array( 'key' => 'bookings', 'label' => $names['visit'][0], 'now' => $k['groups']['visit'], 'before' => $b['groups']['visit'], 'hint' => $h['bookings'] ),
				array( 'key' => 'leads', 'label' => $names['ask'][0], 'now' => $k['groups']['ask'], 'before' => $b['groups']['ask'], 'hint' => __( 'Questions about a design or a service, and "Drop a hint" emails.', 'om-catalog' ) ),
				array( 'key' => 'leads', 'label' => $names['emails'][0], 'now' => $k['groups']['emails'], 'before' => $b['groups']['emails'], 'hint' => __( 'Ring designs, saved lists and quiz matches people emailed to themselves.', 'om-catalog' ) ),
				array( 'key' => 'conv', 'label' => __( 'Lead rate', 'om-catalog' ), 'now' => $k['conv'], 'before' => $b['conv'], 'hint' => $h['conv'] ),
				array( 'key' => 'value', 'label' => __( 'Value asked about', 'om-catalog' ), 'now' => $k['value'], 'before' => $b['value'], 'hint' => $h['value'] ),
			)
		);
		$goals = self::goals_block();
		if ( '' !== $goals ) {
			$out .= '<section class="om-ins-card om-ins-goalcard">' . $goals . '</section>';
		} else {
			$out .= '<p class="om-ins-tipline">' . self::icon( 'target' ) . '<span>' . esc_html__( 'Set a monthly goal for leads and visit requests to see each month\'s pace here and on the overview.', 'om-catalog' ) . '</span><a href="' . esc_url( $this->url( array( 'tab' => 'settings' ) ) ) . '" data-om-ins-nav>' . esc_html__( 'Set goals', 'om-catalog' ) . self::icon( 'arrow' ) . '</a></p>';
		}
		$out .= self::card( __( 'Leads over time', 'om-catalog' ), self::columns( $data['chart'] ), array( 'sub' => __( 'Each column is split by kind of lead, closest to a sale (visit requests) at the bottom.', 'om-catalog' ), 'class' => 'om-ins-colcard' ) );
		$out .= '<div class="om-ins-grid">';
		$kinds = $k['kinds'];
		arsort( $kinds );
		$rows = array();
		foreach ( $kinds as $kind => $n ) {
			$group  = $names[ self::lead_group( $kind ) ];
			$rows[] = array( 'label' => OM_Insights::lead_types()[ $kind ] ?? $kind, 'sub' => count( $group[1] ) > 1 ? $group[0] : '', 'icon' => 'leads', 'value' => (int) $n, 'show' => self::compact( $n ), 'share' => $k['leads'] ? (int) $n / $k['leads'] : null );
		}
		$out  .= $this->panel( 'lk', __( 'Kinds of lead', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Kind', 'om-catalog' ), __( 'Leads', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No leads in this period yet.', 'om-catalog' ) ) ) );
		$a     = $f['attr'];
		$rows  = array();
		foreach ( $a['by'] as $channel => $c ) {
			$name   = self::icon( self::channel_icon( $channel ), 'om-ins-cell-i' ) . esc_html( self::channel_name( $channel ) );
			$rows[] = array(
				'none' === $channel ? '<span class="om-ins-cell-link is-plain" title="' . esc_attr( self::unlinked_words() ) . '">' . $name . '</span>' : $this->filter_cell( 'channel', $channel, $name ),
				self::n( $c['first'] ),
				self::n( $c['last'] ),
				self::n( $c['helped'] ),
			);
		}
		$out .= self::card( __( 'Where leads began', 'om-catalog' ), self::table( array( __( 'Source', 'om-catalog' ), __( 'First visit', 'om-catalog' ), __( 'Visit they got in touch on', 'om-catalog' ), __( 'Helped along', 'om-catalog' ) ), $rows, __( 'No leads in this period yet.', 'om-catalog' ) ), array( 'sub' => __( 'First visit: how each lead first found you. Helped along: other visits on the way that came from this source. Recognised only in the same browser.', 'om-catalog' ) ) );
		$out .= '</div><div class="om-ins-grid">';
		$tot   = max( 1, (int) $a['total'] );
		$words = array(
			'visit' => __( 'On their first visit', 'om-catalog' ),
			'day'   => __( 'Came back the same day', 'om-catalog' ),
			'week'  => __( 'Within a week', 'om-catalog' ),
			'month' => __( 'Within a month', 'om-catalog' ),
			'more'  => __( 'After more than a month', 'om-catalog' ),
		);
		$rows = array();
		foreach ( $words as $key => $label ) {
			$rows[] = array( 'label' => $label, 'icon' => 'clock', 'value' => (int) $a['days'][ $key ], 'show' => self::compact( $a['days'][ $key ] ), 'share' => $a['days'][ $key ] / $tot );
		}
		/* translators: 1: typical days, 2: typical visits. */
		$sub  = $a['back'] ? sprintf( __( 'Those who came back first took %1$s days and %2$s visits, typically.', 'om-catalog' ), number_format_i18n( max( 1, round( $a['dmed'] ) ) ), number_format_i18n( $a['vmed'], 0 ) ) : __( 'From their first visit this site knows of.', 'om-catalog' );
		$out .= $this->panel( 'tt', __( 'How long they took', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Got in touch', 'om-catalog' ), __( 'Leads', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No leads in this period yet.', 'om-catalog' ) ) ), null, $sub );
		$words = array(
			'1' => __( '1 visit', 'om-catalog' ),
			'2' => __( '2 visits', 'om-catalog' ),
			'3' => __( '3 or 4 visits', 'om-catalog' ),
			'5' => __( '5 visits or more', 'om-catalog' ),
		);
		$rows = array();
		foreach ( $words as $key => $label ) {
			$rows[] = array( 'label' => $label, 'icon' => 'journeys', 'value' => (int) $a['visits'][ $key ], 'show' => self::compact( $a['visits'][ $key ] ), 'share' => $a['visits'][ $key ] / $tot );
		}
		$out .= $this->panel( 'tv', __( 'Visits before getting in touch', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Visits', 'om-catalog' ), __( 'Leads', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No leads in this period yet.', 'om-catalog' ) ) ), null, __( 'Counting the visit they got in touch on.', 'om-catalog' ) );
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
			$price = '' !== (string) $r['item'] ? (float) ( $data['prices'][ $r['item'] ] ?? 0 ) : 0;
			$rows[] = array(
				'<span title="' . esc_attr( wp_date( 'l, M j, Y \a\t g:i a', (int) $r['ts'] ) ) . '">' . esc_html( wp_date( 'M j, g:i a', (int) $r['ts'] ) ) . '</span>',
				$who,
				esc_html( '' !== $what ? $what : '–' ),
				$price > 0 ? self::n( $price, self::money( $price ) ) : '–',
				'' !== (string) $r['sid'] ? self::icon( self::channel_icon( (string) $r['channel'] ), 'om-ins-cell-i' ) . esc_html( self::channel_name( (string) $r['channel'] ) ) : '–',
				$known ? self::n( (int) $r['visits'] ) : '–',
				! $known || null === $days ? '–' : self::n( $days, 0 === $days ? __( 'same day', 'om-catalog' ) : sprintf( /* translators: %s: days. */ _n( '%s day', '%s days', $days, 'om-catalog' ), number_format_i18n( $days ) ) ),
				'' !== (string) $r['sid'] ? self::n( (int) $r['engaged'], self::duration( (int) $r['engaged'] ) ) : '–',
			);
		}
		$out .= self::card( __( 'Every lead', 'om-catalog' ), self::table( array( __( 'When', 'om-catalog' ), __( 'Who', 'om-catalog' ), __( 'About', 'om-catalog' ), __( 'Listed price', 'om-catalog' ), __( 'Came from', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Took', 'om-catalog' ), __( 'Time on site', 'om-catalog' ) ), $rows, __( 'No leads in this period yet.', 'om-catalog' ), 'om-ins-leads', 25 ), array( 'sub' => __( 'Listed price: of the design they asked about. Visits: how many times they came before getting in touch. Took: days from their first visit. Open a name to see the visit step by step.', 'om-catalog' ) ) );
		return $out;
	}

	private function tab_sources() {
		$f = $this->findings_data();
		$k = $f['now'];
		if ( ! $k['visits'] ) {
			return $this->empty_state();
		}
		$data  = $this->cached(
			'sources2',
			function () {
				$landing = $this->by_visit( 'landing', 25 );
				return array(
					'channels' => $this->by_visit( 'channel', 12 ),
					'webs'     => $this->websites( 20 ),
					'camps'    => $this->campaigns(),
					'landing'  => $landing,
					'titles'   => $this->page_titles( wp_list_pluck( $landing, 'k' ) ),
				);
			}
		);
		$total = $k['visits'];
		$first = $f['attr']['by'];
		$best  = self::best_rate( $data['channels'] );
		$rows  = array();
		foreach ( $data['channels'] as $r ) {
			$v      = (int) $r['visits'];
			$rows[] = array(
				$this->filter_cell( 'channel', $r['k'], self::icon( self::channel_icon( $r['k'] ), 'om-ins-cell-i' ) . esc_html( self::channel_name( $r['k'] ) ) ),
				self::n( $v ),
				self::n( $total ? $v / $total : 0, self::pct( $v, $total, 0 ) ),
				self::n( $v ? 1 - (int) $r['quick'] / $v : 0, self::pct( $v - (int) $r['quick'], $v, 0 ) ),
				self::n( $r['converted'] ),
				self::rate_cell( $r['converted'], $v, $best ),
				self::n( (int) ( $first[ $r['k'] ]['first'] ?? 0 ) ),
			);
		}
		$out = self::card(
			__( 'Where visits come from', 'om-catalog' ),
			self::table( array( __( 'Source', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Share', 'om-catalog' ), __( 'Engaged', 'om-catalog' ), __( 'Visits with a lead', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ), __( 'Leads that began here', 'om-catalog' ) ), $rows, __( 'No visits yet.', 'om-catalog' ), 'om-ins-channels' ),
			array( 'sub' => __( 'Engaged: did more than glance. Leads that began here: leads whose first visit came this way. * Fewer than 30 visits, so the rate can swing a lot. Paid ads: visits with an ad click ID or a paid campaign tag. Maps: links tagged utm_source=gbp on your Business Profile. Click a source to see only its visits.', 'om-catalog' ) )
		);
		$out .= '<div class="om-ins-grid">';
		$rows = array();
		foreach ( $data['webs'] as $r ) {
			$c      = (int) $r['converted'];
			$rows[] = array(
				'label'  => (string) $r['k'],
				'icon'   => 'globe',
				'value'  => (int) $r['visits'],
				'show'   => self::compact( $r['visits'] ),
				'share'  => $total ? (int) $r['visits'] / $total : null,
				/* translators: 1: leads, 2: lead rate. */
				'tip'    => sprintf( _n( '%1$s lead (%2$s of these visits)', '%1$s leads (%2$s of these visits)', $c, 'om-catalog' ), number_format_i18n( $c ), self::pct( $c, (int) $r['visits'] ) ),
				'filter' => array( 'ref', (string) $r['k'] ),
			);
		}
		$out .= $this->panel( 'refs', __( 'Websites that sent visitors', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Website', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'Every visit came direct so far.', 'om-catalog' ) ) ), null, __( 'Each website with its app and link addresses taken in (l.facebook.com counts as facebook.com).', 'om-catalog' ) );
		$best = self::best_rate( $data['camps'] );
		$rows = array();
		foreach ( $data['camps'] as $r ) {
			$rows[] = array(
				'' !== $r['camp'] ? $this->filter_cell( 'campaign', $r['camp'], self::icon( 'tag', 'om-ins-cell-i' ) . esc_html( $r['camp'] ) ) : '–',
				esc_html( trim( $r['src'] . ( '' !== $r['med'] ? ' / ' . $r['med'] : '' ) ) ),
				self::n( $r['visits'] ),
				self::n( $r['converted'] ),
				self::rate_cell( $r['converted'], $r['visits'], $best ),
			);
		}
		$out .= self::card( __( 'Campaigns', 'om-catalog' ), self::table( array( __( 'Campaign', 'om-catalog' ), __( 'Source / medium', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'With a lead', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No tagged links used yet.', 'om-catalog' ), '', 12 ), array( 'sub' => __( 'Links tagged with utm_campaign: ads, emails, social posts.', 'om-catalog' ) ) );
		$out .= '</div>';
		$best = self::best_rate( $data['landing'] );
		$rows = array();
		foreach ( $data['landing'] as $r ) {
			$path   = (string) $r['k'];
			$rows[] = array(
				$this->filter_cell( 'landing', $path, self::page_label( $path, $data['titles'][ $path ] ?? '' ), self::page_link( $path ) ),
				self::n( $r['visits'] ),
				self::n( (int) $r['visits'] ? $r['quick'] / $r['visits'] : 0, self::pct( (int) $r['quick'], (int) $r['visits'], 0 ) ),
				self::n( $r['pages'], number_format_i18n( (float) $r['pages'], 1 ) ),
				self::n( $r['converted'] ),
				self::rate_cell( $r['converted'], $r['visits'], $best ),
			);
		}
		$out .= self::card( __( 'First page of a visit', 'om-catalog' ), self::table( array( __( 'Page', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Quick exits', 'om-catalog' ), __( 'Pages / visit', 'om-catalog' ), __( 'With a lead', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No visits yet.', 'om-catalog' ), '', 12 ), array( 'sub' => __( 'Where visits start. Quick exits: left after one page in under 10 seconds.', 'om-catalog' ) ) );
		return $out;
	}

	private function tab_audience() {
		$f = $this->findings_data();
		$k = $f['now'];
		$b = $f['before'];
		if ( ! $k['visits'] && ! $b['visits'] ) {
			return $this->empty_state();
		}
		$data  = $this->cached(
			'audience',
			function () {
				return array(
					'browsers' => $this->by_visit( 'browser', 10 ),
					'os'       => $this->by_visit( 'os', 10 ),
					'loc'      => $this->locations( 15 ),
				);
			}
		);
		$total = $k['visits'];
		$aud   = $f['audience'];
		$per   = static function ( $x ) {
			return $x['visitors'] ? $x['visits'] / $x['visitors'] : 0;
		};
		$out   = $this->stats(
			array(
				array( 'key' => 'visitors', 'label' => __( 'Visitors', 'om-catalog' ), 'now' => $k['visitors'], 'before' => $b['visitors'], 'hint' => self::hints()['visitors'] ),
				array( 'key' => 'visits', 'label' => __( 'New visitors', 'om-catalog' ), 'now' => $k['new'], 'before' => $b['new'], 'hint' => __( 'People on their first visit (as far as their browser shows).', 'om-catalog' ) ),
				array( 'key' => 'visits', 'label' => __( 'Returning visits', 'om-catalog' ), 'now' => $k['visits'] - $k['new'], 'before' => $b['visits'] - $b['new'], 'hint' => __( 'Visits from people who had been on the site before.', 'om-catalog' ) ),
				array( 'key' => 'visits', 'label' => __( 'Visits per visitor', 'om-catalog' ), 'now' => $per( $k ), 'before' => $per( $b ), 'value' => number_format_i18n( $per( $k ), 2 ), 'was' => number_format_i18n( $per( $b ), 2 ) ),
				array( 'key' => 'engaged', 'label' => __( 'Engaged visits', 'om-catalog' ), 'now' => $k['engaged'], 'before' => $b['engaged'], 'hint' => self::hints()['engaged'] ),
			)
		);
		$out  .= '<div class="om-ins-grid">';
		$cols  = array( 'new' => __( 'First visit', 'om-catalog' ), 'returning' => __( 'Came back', 'om-catalog' ) );
		$cell  = static function ( $kind, $what ) use ( $aud, $total ) {
			$r = $aud['kinds'][ $kind ] ?? null;
			if ( ! $r || ! (int) $r['visits'] ) {
				return '–';
			}
			$v = (int) $r['visits'];
			switch ( $what ) {
				case 'visits':
					return self::n( $v );
				case 'share':
					return self::n( $total ? $v / $total : 0, self::pct( $v, $total, 0 ) );
				case 'conv':
					return self::n( (int) $r['converted'] / $v, self::pct( (int) $r['converted'], $v ) );
				case 'engaged':
					return self::n( 1 - (int) $r['quick'] / $v, self::pct( $v - (int) $r['quick'], $v, 0 ) );
				case 'pages':
					return self::n( $r['pages'], number_format_i18n( (float) $r['pages'], 1 ) );
				default:
					return self::n( $r['engaged'], self::duration( $r['engaged'] ) );
			}
		};
		$rows = array();
		foreach ( array( 'visits' => __( 'Visits', 'om-catalog' ), 'share' => __( 'Share of visits', 'om-catalog' ), 'conv' => __( 'Lead rate', 'om-catalog' ), 'engaged' => __( 'Engaged', 'om-catalog' ), 'pages' => __( 'Pages per visit', 'om-catalog' ), 'time' => __( 'Time per visit', 'om-catalog' ) ) as $what => $label ) {
			$rows[] = array( '<strong>' . esc_html( $label ) . '</strong>', $cell( 'new', $what ), $cell( 'returning', $what ) );
		}
		$out .= self::card( __( 'New and returning', 'om-catalog' ), self::table( array( '', $cols['new'], $cols['returning'] ), $rows, __( 'No visits yet.', 'om-catalog' ), 'om-ins-compare' ), array( 'sub' => __( 'A returning visitor has been on the site before, in the same browser.', 'om-catalog' ), 'aside' => '<div class="om-ins-btns"><a class="om-ins-btn ghost" href="' . esc_url( $this->filter_url( 'kind', 'returning' ) ) . '" data-om-ins-nav>' . esc_html__( 'Only returning', 'om-catalog' ) . '</a></div>' ) );
		$names = array( '1' => __( 'Once', 'om-catalog' ), '2' => __( 'Twice', 'om-catalog' ), '3' => __( '3 or 4 times', 'om-catalog' ), '5' => __( '5 times or more', 'om-catalog' ) );
		$all   = max( 1, array_sum( $aud['freq'] ) );
		$rows  = array();
		foreach ( $names as $key => $label ) {
			$rows[] = array( 'label' => $label, 'icon' => 'refresh', 'value' => (int) $aud['freq'][ $key ], 'show' => self::compact( $aud['freq'][ $key ] ), 'share' => $aud['freq'][ $key ] / $all );
		}
		$out .= $this->panel( 'fq', __( 'How often people came', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Came', 'om-catalog' ), __( 'Visitors', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No visits yet.', 'om-catalog' ) ) ), null, __( 'Visitors by their number of visits in this period.', 'om-catalog' ) );
		$out .= '</div>';
		$best = self::best_rate( $f['devices'] );
		$rows = array();
		foreach ( $f['devices'] as $r ) {
			$v      = (int) $r['visits'];
			$rows[] = array(
				$this->filter_cell( 'device', $r['k'], self::icon( self::device_icon( $r['k'] ), 'om-ins-cell-i' ) . esc_html( self::device_one( $r['k'] ) ) ),
				self::n( $v ),
				self::n( $total ? $v / $total : 0, self::pct( $v, $total, 0 ) ),
				self::n( $v ? 1 - (int) $r['quick'] / $v : 0, self::pct( $v - (int) $r['quick'], $v, 0 ) ),
				self::n( $r['pages'], number_format_i18n( (float) $r['pages'], 1 ) ),
				self::rate_cell( $r['converted'], $v, $best ),
			);
		}
		$out .= '<div class="om-ins-grid">';
		$out .= self::card( __( 'Devices', 'om-catalog' ), self::table( array( __( 'Device', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Share', 'om-catalog' ), __( 'Engaged', 'om-catalog' ), __( 'Pages / visit', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, __( 'No visits yet.', 'om-catalog' ) ) );
		$out .= $this->panel(
			'bs',
			__( 'Browsers and systems', 'om-catalog' ),
			array(
				array( 'label' => __( 'Browsers', 'om-catalog' ), 'head' => array( __( 'Browser', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['browsers'], 'browser', $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
				array( 'label' => __( 'Systems', 'om-catalog' ), 'head' => array( __( 'System', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => self::simple_rows( $data['os'], 'os', $total ), 'empty' => __( 'No visits yet.', 'om-catalog' ) ),
			)
		);
		$loc_note = isset( $data['loc']['tz'] ) ? __( 'From each visitor\'s time zone. For towns and states, switch on Cloudflare\'s "Add visitor location headers" (Rules > Managed Transforms).', 'om-catalog' ) : '';
		$out     .= $this->panel( 'lc', __( 'Where visitors are', 'om-catalog' ), self::location_tabs( $data['loc'], $total ), null, $loc_note );
		$rows     = array();
		foreach ( $aud['langs'] as $r ) {
			$c      = (int) $r['converted'];
			$rows[] = array(
				'label' => self::language( $r['k'] ),
				'icon'  => 'globe',
				'value' => (int) $r['visits'],
				'show'  => self::compact( $r['visits'] ),
				'share' => $total ? (int) $r['visits'] / $total : null,
				/* translators: 1: leads, 2: lead rate. */
				'tip'   => sprintf( _n( '%1$s lead (%2$s of these visits)', '%1$s leads (%2$s of these visits)', $c, 'om-catalog' ), number_format_i18n( $c ), self::pct( $c, (int) $r['visits'] ) ),
			);
		}
		$out .= $this->panel( 'lg', __( 'Languages', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Browser language', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No languages recorded yet.', 'om-catalog' ) ) ), null, __( 'The language each visitor\'s browser is set to.', 'om-catalog' ) );
		$out .= '</div>';
		$out .= self::card( __( 'When people visit', 'om-catalog' ), self::heatmap( $f['heat'] ), array( 'sub' => __( 'Visits by day of the week and hour, in your site\'s time zone. Darker is busier.', 'om-catalog' ) ) );
		return $out;
	}

	private function tab_pages() {
		$data = $this->cached(
			'pages2',
			function () {
				return array(
					'list'    => $this->pages( 400 ),
					'speed'   => $this->speed(),
					'missing' => $this->not_found(),
				);
			}
		);
		$list = $data['list'];
		if ( ! $list ) {
			return $this->empty_state();
		}
		$out  = $this->speed_card( $data['speed'] );
		$out .= '<div class="om-ins-grid">';
		$rows = array();
		foreach ( $data['speed']['slow'] as $r ) {
			$rows[] = array(
				'label'  => self::title( $r['title'], $r['page'] ),
				'sub'    => $r['page'],
				'value'  => (int) $r['p75'],
				'show'   => self::vital_text( 'lcp', $r['p75'] ),
				/* translators: %s: number of page views. */
				'tip'    => sprintf( _n( 'Main picture or text showed within this time on 3 in 4 of %s page view', 'Main picture or text showed within this time on 3 in 4 of %s page views', $r['n'], 'om-catalog' ), number_format_i18n( $r['n'] ) ),
				'filter' => array( 'page', $r['page'] ),
				'ext'    => self::page_link( $r['page'] ),
			);
		}
		$out .= $this->panel( 'sl', __( 'Slowest pages', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Page', 'om-catalog' ), __( 'Showed within', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'Not enough measured page views yet (10 per page).', 'om-catalog' ) ) ), null, __( 'Pages with 10 or more measured views, by how long the main picture or text took to show.', 'om-catalog' ) );
		$rows = array();
		foreach ( $data['missing'] as $r ) {
			$from = array();
			foreach ( array_slice( $r['from'], 0, 2, true ) as $where => $n ) {
				$from[] = $where . ' (' . number_format_i18n( $n ) . ')';
			}
			$rows[] = array(
				'<code class="om-ins-path">' . esc_html( $r['page'] ) . '</code>',
				self::n( $r['n'] ),
				esc_html( implode( ', ', $from ) ),
				'<span class="om-ins-nowrap" title="' . esc_attr( wp_date( 'l, M j, Y \a\t g:i a', (int) $r['last'] ) ) . '">' . esc_html( self::when( $r['last'] ) ) . '</span>',
			);
		}
		$out .= self::card( __( 'Missing pages', 'om-catalog' ), self::table( array( __( 'Address', 'om-catalog' ), __( 'Times', 'om-catalog' ), __( 'Came from', 'om-catalog' ), __( 'Last', 'om-catalog' ) ), $rows, __( 'Nobody reached a missing page. Well done.', 'om-catalog' ), '', 10 ), array( 'sub' => __( 'Addresses that showed "page not found". Came from: the page before it on your site (a broken link), the website that sent them, or typed and bookmarked. A redirect fixes each one.', 'om-catalog' ) ) );
		$out .= '</div>';
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
		$out .= self::card(
			__( 'Every page', 'om-catalog' ),
			self::table( array( __( 'Page', 'om-catalog' ), __( 'Views', 'om-catalog' ), __( 'Visits', 'om-catalog' ), __( 'Avg. time', 'om-catalog' ), __( 'Scrolled', 'om-catalog' ), __( 'Entries', 'om-catalog' ), __( 'Exits', 'om-catalog' ), __( 'Quick exits', 'om-catalog' ) ), $rows, __( 'No page views yet.', 'om-catalog' ), 'om-ins-pages', 25 ),
			array( 'sub' => __( 'Time: how long the page was on screen and in use. Scrolled: how far down people got. Entries and exits: visits that started or ended here. Click a page to see only visits that viewed it.', 'om-catalog' ), 'aside' => $find )
		);
		return $out;
	}

	private function tab_designs() {
		$f    = $this->findings_data();
		$data = $this->cached(
			'designs2',
			function () {
				return array(
					'products' => $this->products( 400 ),
					'counts'   => $this->design_counts(),
					'lines'    => $this->lines(),
					'options'  => $this->options(),
					'pairs'    => $this->compare_groups(),
					'reels'    => $this->reels(),
					'bands'    => $this->bands(),
					'movers'   => $this->movers( 8 ),
					'together' => $this->together( 10 ),
				);
			}
		);
		if ( ! $data['products'] ) {
			return $this->empty_state();
		}
		$k     = $f['now'];
		$b     = $f['before'];
		// Counted over every design (the list above stops at 400).
		$asked = (int) ( $data['counts']['asked'] ?? 0 );
		$kinds = (int) ( $data['counts']['seen'] ?? 0 );
		$out  = $this->stats(
			array(
				array( 'key' => 'designs', 'label' => __( 'Designs viewed', 'om-catalog' ), 'now' => $k['designs'], 'before' => $b['designs'], 'hint' => self::hints()['designs'] ),
				array( 'key' => 'saves', 'label' => __( 'Saved (hearts)', 'om-catalog' ), 'now' => $k['saves'], 'before' => $b['saves'], 'hint' => self::hints()['saves'] ),
				array( 'key' => 'leads', 'label' => __( 'Different designs seen', 'om-catalog' ), 'now' => $kinds, 'before' => null, 'hint' => __( 'How many of your designs were looked at at least once.', 'om-catalog' ) ),
				array( 'key' => 'leads', 'label' => __( 'Leads about a design', 'om-catalog' ), 'now' => $asked, 'before' => null, 'hint' => __( 'Inquiries, visit requests and emails that named a design (hints not counted).', 'om-catalog' ) ),
				array( 'key' => 'value', 'label' => __( 'Value asked about', 'om-catalog' ), 'now' => $k['value'], 'before' => $b['value'], 'hint' => self::hints()['value'] ),
			)
		);
		// Interest by price.
		$views = max( 1, array_sum( wp_list_pluck( $data['bands'], 'views' ) ) );
		$leads = max( 1, array_sum( wp_list_pluck( $data['bands'], 'leads' ) ) );
		$rows  = array();
		foreach ( $data['bands'] as $i => $band ) {
			if ( ! $band['views'] && ! $band['leads'] ) {
				continue;
			}
			$rows[] = array(
				'<strong>' . esc_html( self::band_name( $i ) ) . '</strong>',
				self::n( $band['designs'] ),
				self::share_cell( $band['views'], $views, 'views' ),
				self::n( $band['saves'] ),
				self::share_cell( $band['leads'], $leads, 'leads' ),
			);
		}
		$out .= self::card( __( 'Interest by price', 'om-catalog' ), self::table( array( __( 'Listed price', 'om-catalog' ), __( 'Designs seen', 'om-catalog' ), __( 'Share of views', 'om-catalog' ), __( 'Saved', 'om-catalog' ), __( 'Share of leads', 'om-catalog' ) ), $rows, __( 'No prices seen yet.', 'om-catalog' ), 'om-ins-bands' ), array( 'sub' => __( 'Where people look and where they get in touch. A price range with more of the leads than of the views converts well.', 'om-catalog' ) ) );
		$out .= '<div class="om-ins-grid">';
		/* translators: %s: "the period before" or "the same time last year". */
		$vs   = sprintf( __( 'Views against %s (designs with 8 or more views).', 'om-catalog' ), $this->compare_name() );
		$out .= $this->panel( 'up', __( 'Rising', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Design', 'om-catalog' ), __( 'More views', 'om-catalog' ) ), 'rows' => self::mover_rows( $data['movers'][0] ), 'empty' => __( 'No design gained many views.', 'om-catalog' ) ) ), null, $vs );
		$out .= $this->panel( 'dn', __( 'Cooling', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Design', 'om-catalog' ), __( 'Fewer views', 'om-catalog' ) ), 'rows' => self::mover_rows( $data['movers'][1], false ), 'empty' => __( 'No design lost many views.', 'om-catalog' ) ) ), null, $vs );
		$out .= '</div>';
		$rows = array();
		foreach ( $data['products'] as $r ) {
			$d      = self::design( $r['item'], $r['title'] );
			$price  = (float) $r['price'];
			$rows[] = array(
				$this->filter_cell( 'item', $r['item'], self::design_label( $r['item'], $r['title'] ), $d['url'] ),
				$price > 0 ? self::n( $price, self::money( $price ) ) : '–',
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
		$out .= self::card(
			__( 'Every design looked at', 'om-catalog' ),
			self::table( array( __( 'Design', 'om-catalog' ), __( 'Price', 'om-catalog' ), __( 'Views', 'om-catalog' ), __( 'Viewers', 'om-catalog' ), __( 'Avg. time', 'om-catalog' ), __( 'Saved', 'om-catalog' ), __( 'Compared', 'om-catalog' ), __( 'Shared', 'om-catalog' ), __( 'Hints', 'om-catalog' ), __( 'Leads', 'om-catalog' ), __( 'Lead rate', 'om-catalog' ) ), $rows, '', 'om-ins-products', 25 ),
			array( 'sub' => __( 'Price: as listed when viewed. Views: product pages and quick views. Leads: inquiries and requests about the design. Hints: "Drop a hint" emails sent with it. Click a design to see only visits that viewed it.', 'om-catalog' ), 'aside' => $find )
		);
		$out .= '<div class="om-ins-grid">';
		$rows = array();
		foreach ( $data['together'] as $r ) {
			$one    = self::design( $r['a'] );
			$two    = self::design( $r['b'] );
			$rows[] = array( 'label' => $one['title'] . ' + ' . $two['title'], 'img' => $one['image'], 'value' => (int) $r['visits'], 'show' => self::compact( $r['visits'] ) );
		}
		$out  .= $this->panel( 'tg', __( 'Viewed in the same visit', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Designs', 'om-catalog' ), __( 'Visits', 'om-catalog' ) ), 'rows' => $rows, 'empty' => __( 'No two designs looked at together yet.', 'om-catalog' ) ) ), null, __( 'Pairs people look at on one visit: show them side by side, or suggest one on the other\'s page.', 'om-catalog' ) );
		$quiet = array_values(
			array_filter(
				$data['products'],
				static function ( $r ) {
					return (int) $r['viewers'] >= 3 && 0 === (int) $r['leads'];
				}
			)
		);
		$out  .= $this->panel( 'qt', __( 'Looked at often, never asked about', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Design', 'om-catalog' ), __( 'Viewers', 'om-catalog' ) ), 'rows' => self::design_rows( $quiet, 'viewers' ), 'empty' => __( 'Every popular design has had a lead.', 'om-catalog' ) ) ), null, __( 'Worth a look at their photos, price or wording.', 'om-catalog' ) );
		$lrows = array();
		foreach ( $data['lines'] as $r ) {
			/* translators: %s: number of visits. */
			$lrows[] = array( 'label' => ucwords( str_replace( '-', ' ', (string) $r['line'] ) ), 'icon' => 'designs', 'value' => (int) $r['views'], 'show' => self::compact( $r['views'] ), 'tip' => sprintf( __( 'In %s visits', 'om-catalog' ), number_format_i18n( (int) $r['visits'] ) ) );
		}
		$out  .= $this->panel( 'ln', __( 'Product lines', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Line', 'om-catalog' ), __( 'Views', 'om-catalog' ) ), 'rows' => $lrows, 'empty' => __( 'No designs viewed yet.', 'om-catalog' ) ) ) );
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

	/** A share in a table: a bar and the percent (and the count on hover). */
	private static function share_cell( $n, $of, $what ) {
		$share = $of ? $n / $of : 0;
		/* translators: %s: number. */
		$tip = 'views' === $what ? sprintf( _n( '%s view', '%s views', (int) $n, 'om-catalog' ), number_format_i18n( $n ) ) : sprintf( _n( '%s lead', '%s leads', (int) $n, 'om-catalog' ), number_format_i18n( $n ) );
		return array( '<span class="om-ins-rate is-' . esc_attr( $what ) . '" data-tip="' . esc_attr( $tip ) . '"><span class="om-ins-ratebar" aria-hidden="true"><i style="width:' . esc_attr( round( 100 * $share, 1 ) ) . '%"></i></span><span>' . esc_html( self::pct( $n, $of, 0 ) ) . '</span></span>', $share );
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
					'text'       => $this->clicks( 'text', 20 ),
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
					array( __( 'Tapped to text', 'om-catalog' ), $sum( 'text' ), 'mail' ),
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
					array( __( '"Welcome back" bar shown', 'om-catalog' ), $sum( 'welcome', 'shown' ), 'refresh' ),
					array( __( 'Brand film played', 'om-catalog' ), $sum( 'film', 'play' ), 'eye' ),
					array( __( 'Brand film watched to the end', 'om-catalog' ), $sum( 'film', 'complete' ), 'check' ),
					array( __( 'Booking calendar opened', 'om-catalog' ), $sum( 'booking', 'calendar' ), 'calendar' ),
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
		$out   .= $this->panel( 'tx', __( 'Texts tapped', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Where they tapped', 'om-catalog' ), __( 'Taps', 'om-catalog' ) ), 'rows' => $ranked( $data['text'], $where, 'pin' ), 'empty' => __( 'None yet.', 'om-catalog' ) ) ), null, __( 'The text itself is written in the phone\'s own app.', 'om-catalog' ) );
		$out   .= $this->panel( 'di', __( 'Directions opened', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Where they tapped', 'om-catalog' ), __( 'Taps', 'om-catalog' ) ), 'rows' => $ranked( $data['directions'], $where, 'pin' ), 'empty' => __( 'None yet.', 'om-catalog' ) ) ) );
		$out   .= $this->panel( 'ob', __( 'Links to other sites', 'om-catalog' ), array( array( 'label' => '', 'head' => array( __( 'Site', 'om-catalog' ), __( 'Clicks', 'om-catalog' ) ), 'rows' => $ranked( $data['outbound'], static function ( $r ) { return (string) $r['label']; }, 'globe' ), 'empty' => __( 'None yet.', 'om-catalog' ) ) ) );
		return $out . '</div>';
	}

	private function tab_funnels() {
		list( $pf, $pt ) = $this->previous();
		$f = $this->cached(
			'funnels2',
			function () use ( $pf, $pt ) {
				return array( $this->funnels(), $this->funnels( $pf, $pt ) );
			}
		);
		list( $now, $was ) = $f;
		$vs   = $this->compare_name( true );
		/* translators: %s: "the period before" or "the same time last year". */
		$note = '<p class="om-ins-tipline">' . self::icon( 'info' ) . '<span>' . esc_html( sprintf( __( 'Each step counts visits, so a visit that sent two forms counts once, and leads that skipped a step (a visit request from the home page, say) are not in "From visit to lead". The Leads tab counts every form sent. Grey numbers: %s.', 'om-catalog' ), $this->compare_name() ) ) . '</span></p>';
		$out  = $note . '<div class="om-ins-grid">';
		$out .= self::funnel( __( 'From visit to lead', 'om-catalog' ), __( 'Of all visits: how many looked at a design, then saved or compared one, then got in touch.', 'om-catalog' ), $now['shop'], $was['shop'], $vs );
		$out .= self::funnel( __( 'Booking window', 'om-catalog' ), __( 'Where people stop between opening it and sending the request.', 'om-catalog' ), $now['booking'], $was['booking'], $vs );
		$out .= self::funnel( __( 'Ring builder', 'om-catalog' ), __( 'Visits reaching each step.', 'om-catalog' ), $now['builder'], $was['builder'], $vs );
		$out .= self::funnel( __( 'Ring style quiz', 'om-catalog' ), __( 'From the first question to a booking or an email.', 'om-catalog' ), $now['quiz'], $was['quiz'], $vs );
		$out .= self::funnel( __( 'Drop a hint', 'om-catalog' ), __( 'From the form to the partner getting in touch (the last two steps happen on the partner\'s phone or computer).', 'om-catalog' ), $now['hint'], $was['hint'], $vs );
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
		$form  = '<form class="om-ins-settings-form" id="om-ins-settings-form" method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '" data-om-ins-settings><input type="hidden" name="action" value="om_ins_settings" />' . wp_nonce_field( 'om_ins_settings', '_wpnonce', true, false );
		$form .= $switch( 'om_ins', __( 'Collect insights', 'om-catalog' ), __( 'A small script on every page reports what visitors do to this site, and nowhere else.', 'om-catalog' ) );
		$form .= $switch( 'om_ins_staff', __( 'Leave out logged-in staff', 'om-catalog' ), __( 'Your own browsing, and your team\'s, isn\'t counted while logged in.', 'om-catalog' ) );
		$form .= $switch( 'om_ins_vid', __( 'Recognise returning visitors', 'om-catalog' ), __( 'Keeps an anonymous ID in the visitor\'s browser for up to 400 days, so a second visit is linked to the first. Off: every visit stands alone.', 'om-catalog' ) );
		$form .= $switch( 'om_ins_dnt', __( 'Respect "Do Not Track" and Global Privacy Control', 'om-catalog' ), __( 'Browsers set to ask sites not to track them are not counted at all.', 'om-catalog' ) );
		$form .= $switch( 'om_ins_journey', __( 'Show the visit behind each inquiry', 'om-catalog' ), __( 'Adds "Their visit" (where they came from, what they looked at and saved) to inquiries in wp-admin and to the emails you get.', 'om-catalog' ) );
		$form .= $switch( 'om_ins_speed', __( 'Measure page speed', 'om-catalog' ), __( 'Visitors\' browsers report how fast each page showed and answered (Google\'s Core Web Vitals), shown under Pages. Adds nothing to the page\'s weight.', 'om-catalog' ) );
		$form .= '<div class="om-ins-setting"><div class="om-ins-setting-t"><span class="om-ins-setting-l" id="om-ins-keep">' . esc_html__( 'Keep data for', 'om-catalog' ) . '</span><p>' . esc_html__( 'Older visits are deleted every night. 13 months lets you compare with the same month last year.', 'om-catalog' ) . '</p></div><div class="om-ins-seg om-ins-seg-radio" role="radiogroup" aria-labelledby="om-ins-keep">';
		foreach ( array( 3, 6, 13, 25, 37 ) as $m ) {
			/* translators: %d: months. */
			$form .= '<label><input type="radio" name="om_ins_months" value="' . (int) $m . '" data-om-ins-opt' . checked( OM_Insights::months(), $m, false ) . ' /><span>' . esc_html( sprintf( _n( '%d month', '%d months', $m, 'om-catalog' ), $m ) ) . '</span></label>';
		}
		$form .= '</div><span class="om-ins-saved" data-om-ins-saved aria-hidden="true">' . self::icon( 'check' ) . '</span></div>';
		$form .= '<p class="om-ins-nojs-save"><button type="submit" class="om-ins-btn primary">' . esc_html__( 'Save settings', 'om-catalog' ) . '</button></p></form>';
		$out   = self::card( __( 'Collecting', 'om-catalog' ), $form, array( 'sub' => __( 'Changes are saved as soon as you make them.', 'om-catalog' ) ) );

		$goals = self::goals();
		$field = static function ( $name, $label, $help, $value ) {
			$id = 'om-ins-opt-' . $name;
			return '<div class="om-ins-setting"><div class="om-ins-setting-t"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label><p id="' . esc_attr( $id ) . '-d">' . esc_html( $help ) . '</p></div>'
				. '<span class="om-ins-num"><input type="number" min="0" max="100000" step="1" inputmode="numeric" id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( (string) $value ) . '" aria-describedby="' . esc_attr( $id ) . '-d" data-om-ins-opt form="om-ins-settings-form" /><span>' . esc_html__( 'a month', 'om-catalog' ) . '</span></span>'
				. '<span class="om-ins-saved" data-om-ins-saved aria-hidden="true">' . self::icon( 'check' ) . '</span></div>';
		};
		$gform  = $field( 'om_ins_goal', __( 'Leads', 'om-catalog' ), __( 'Every form sent: visit requests, inquiries, hints, emails and sign-ups. 0: no goal.', 'om-catalog' ), $goals['leads'] );
		$gform .= $field( 'om_ins_goal_v', __( 'Visit requests', 'om-catalog' ), __( 'Requests to visit the showroom. 0: no goal.', 'om-catalog' ), $goals['visits'] );
		$out   .= self::card( __( 'Monthly goals', 'om-catalog' ), $gform, array( 'sub' => __( 'The overview and the Leads tab show how this month is pacing against them.', 'om-catalog' ) ) );

		// Bookings made in the SimplyBook calendar (when one is set up): SimplyBook tells the site about each.
		if ( class_exists( 'OM_Booking' ) && OM_Booking::setup() ) {
			$last = (int) get_option( 'om_ins_cal_last', 0 );
			$cal  = '<p class="om-ins-lead">' . esc_html__( 'The calendar runs on SimplyBook\'s own site, so the page can\'t see a booking finish. To count each booking as a visit request, paste this address in SimplyBook: Custom features › API (turn it on) › Settings › Callback URL, and switch on the trigger for new bookings. SimplyBook sends only the booking\'s number, so these requests have no name; one is tied to its visit when just one visit had the calendar open in the half hour before.', 'om-catalog' ) . '</p>';
			$cal .= '<figure class="om-ins-quote"><blockquote data-om-ins-copytext>' . esc_html( OM_Insights::calendar_url() ) . '</blockquote><figcaption><span>' . esc_html( $last ? sprintf( /* translators: %s: date and time. */ __( 'Last booking received %s', 'om-catalog' ), wp_date( 'M j, Y \a\t g:i a', $last ) ) : __( 'No booking received yet', 'om-catalog' ) ) . '</span><button type="button" class="om-ins-btn" data-om-ins-copy>' . self::icon( 'copy' ) . esc_html__( 'Copy address', 'om-catalog' ) . '</button></figcaption></figure>';
			$out .= self::card( __( 'Bookings in the calendar', 'om-catalog' ), $cal, array( 'sub' => __( 'SimplyBook bookings counted as visit requests.', 'om-catalog' ) ) );
		}

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
				case 'text':
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
