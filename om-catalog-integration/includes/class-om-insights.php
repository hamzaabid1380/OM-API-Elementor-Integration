<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Insights: the site's own visitor analytics.
 *
 * A small script on every page (assets/js/om-visit.js) reports page views,
 * time on each page, how far people scroll and what they do: designs viewed,
 * saved, compared and shared, searches and filters, options chosen, the ring
 * builder and diamond tools, the quiz, booking window, calls and directions.
 * Leads are added here on the server, from every form of this plugin and of
 * the Wulf Elementor Kit, so each one can be tied to the visit behind it.
 *
 * Each visit gets an anonymous random ID, and a returning visitor another
 * (two first-party cookies, om_sid and om_vid). No IP address is stored; a
 * name or email only when a visitor sends a form, with that lead. Everything
 * stays in two tables of this site's database and is deleted after the
 * months set in Insights > Settings. Staff, bots and (by default) browsers
 * asking not to be tracked are left out.
 */
class OM_Insights {

	const DB_VERSION   = '3'; // 2: page speed columns (1.44.0); 3: the same, checked before use (1.44.1).
	const SID_COOKIE   = 'om_sid';
	const VID_COOKIE   = 'om_vid';
	const MAX_BATCH    = 40;
	const MAX_PER_VISIT = 2500;
	const CRON         = 'om_ins_cleanup';

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'maybe_install' ), 5 );
		add_action( 'init', array( $this, 'ensure_cron' ) );
		add_action( self::CRON, array( $this, 'cleanup' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ), 5 );
		add_action( 'wp_ajax_om_v', array( $this, 'collect' ) );
		add_action( 'wp_ajax_nopriv_om_v', array( $this, 'collect' ) );
		// Leads: this plugin's forms (inquiries, saved lists, ring designs, hints)...
		add_action( 'om_lead', array( $this, 'on_lead' ), 5 );
		// ...and the Wulf Elementor Kit's (booking, quiz email, newsletter).
		add_action( 'wk_booking', array( $this, 'on_booking' ) );
		add_action( 'wk_quiz', array( $this, 'on_quiz' ) );
		add_action( 'wk_newsletter', array( $this, 'on_newsletter' ) );
		// "Their visit" in the shop's emails: this plugin's and the kit's.
		add_filter( 'om_email_details', array( $this, 'email_details' ), 10, 2 );
		add_filter( 'wk_mail_after_rows', array( $this, 'kit_mail' ) );
	}

	/* ---------------------------------------------------------------
	 * Settings
	 * ------------------------------------------------------------- */

	/** Option name => default. */
	public static function defaults() {
		return array(
			'om_ins'         => '1',  // Collect at all.
			'om_ins_staff'   => '1',  // Leave out logged-in staff.
			'om_ins_dnt'     => '1',  // Respect Do Not Track / Global Privacy Control.
			'om_ins_vid'     => '1',  // Recognise returning visitors.
			'om_ins_months'  => '13', // Keep data this many months.
			'om_ins_journey' => '1',  // Their visit with inquiries and in the shop's emails.
			'om_ins_speed'   => '1',  // Measure how fast pages load (Core Web Vitals).
			'om_ins_goal'    => '0',  // Leads a month to aim for (0: no goal).
			'om_ins_goal_v'  => '0',  // Visit requests a month to aim for (0: no goal).
		);
	}

	public static function opt( $name ) {
		$defaults = self::defaults();
		return (string) get_option( $name, $defaults[ $name ] ?? '' );
	}

	public static function enabled() {
		return '0' !== self::opt( 'om_ins' );
	}

	public static function months() {
		return max( 1, min( 60, (int) self::opt( 'om_ins_months' ) ) );
	}

	public static function events_table() {
		global $wpdb;
		return $wpdb->prefix . 'om_ins_events';
	}

	public static function sessions_table() {
		global $wpdb;
		return $wpdb->prefix . 'om_ins_sessions';
	}

	/* ---------------------------------------------------------------
	 * Vocabulary (the dashboard uses these labels)
	 * ------------------------------------------------------------- */

	/** What the browser may report. */
	public static function client_types() {
		return array(
			'pageview'   => __( 'Page views', 'om-catalog' ),
			'filter'     => __( 'Filters used', 'om-catalog' ),
			'view'       => __( 'Product views', 'om-catalog' ),
			'save'       => __( 'Saves', 'om-catalog' ),
			'compare'    => __( 'Compares', 'om-catalog' ),
			'share'      => __( 'Shares', 'om-catalog' ),
			'search'     => __( 'Searches', 'om-catalog' ),
			'option'     => __( 'Options chosen', 'om-catalog' ),
			'builder'    => __( 'Ring builder steps', 'om-catalog' ),
			'diamond'    => __( 'Diamond tools', 'om-catalog' ),
			'designer'   => __( 'Ring designer', 'om-catalog' ),
			'hint'       => __( 'Drop a hint', 'om-catalog' ),
			'assistant'  => __( 'Jeweller assistant', 'om-catalog' ),
			'quiz'       => __( 'Ring style quiz', 'om-catalog' ),
			'booking'    => __( 'Booking window', 'om-catalog' ),
			'cta'        => __( 'Button clicks', 'om-catalog' ),
			'call'       => __( 'Call clicks', 'om-catalog' ),
			'email'      => __( 'Email clicks', 'om-catalog' ),
			'directions' => __( 'Directions clicks', 'om-catalog' ),
			'outbound'   => __( 'Links to other sites', 'om-catalog' ),
		);
	}

	/** Every event type, including what only the server records. */
	public static function types() {
		return self::client_types() + array(
			'lead'        => __( 'Leads', 'om-catalog' ),
			'search_zero' => __( 'Searches with no results', 'om-catalog' ),
			'reel'        => __( 'Story reels', 'om-catalog' ),
		);
	}

	public static function lead_types() {
		return array(
			'booking'     => __( 'Visit request', 'om-catalog' ),
			'inquiry'     => __( 'Inquiry', 'om-catalog' ),
			'hint'        => __( 'Drop a hint', 'om-catalog' ),
			'saved_list'  => __( 'Saved list emailed', 'om-catalog' ),
			'ring_design' => __( 'Ring design emailed', 'om-catalog' ),
			'quiz_email'  => __( 'Quiz matches emailed', 'om-catalog' ),
			'newsletter'  => __( 'Newsletter sign-up', 'om-catalog' ),
		);
	}

	public static function channels() {
		return array(
			'search'   => __( 'Search engines', 'om-catalog' ),
			'maps'     => __( 'Google Maps & Business Profile', 'om-catalog' ),
			'direct'   => __( 'Direct (typed or bookmarked)', 'om-catalog' ),
			'social'   => __( 'Social media', 'om-catalog' ),
			'ads'      => __( 'Paid ads', 'om-catalog' ),
			'email'    => __( 'Email', 'om-catalog' ),
			'ai'       => __( 'AI assistants', 'om-catalog' ),
			'referral' => __( 'Other websites', 'om-catalog' ),
			'campaign' => __( 'Tagged links', 'om-catalog' ),
		);
	}

	/* ---------------------------------------------------------------
	 * Tables
	 * ------------------------------------------------------------- */

	/**
	 * Brings the tables up to date after an update (new columns are added,
	 * nothing is removed or rewritten). One request does it while the others
	 * carry on; if the database refuses, collecting goes on without page
	 * speed and the update is tried again an hour later.
	 */
	public function maybe_install() {
		if ( self::DB_VERSION === get_option( 'om_ins_db' ) || get_transient( 'om_ins_db_wait' ) ) {
			return;
		}
		if ( ! add_option( 'om_ins_db_lock', (string) time(), '', 'no' ) ) {
			if ( time() - (int) get_option( 'om_ins_db_lock' ) < 10 * MINUTE_IN_SECONDS ) {
				return;
			}
			update_option( 'om_ins_db_lock', (string) time(), false );
		}
		if ( ! self::install() ) {
			set_transient( 'om_ins_db_wait', 1, HOUR_IN_SECONDS );
		}
		delete_option( 'om_ins_db_lock' );
	}

	/** Page speed can be kept: the tables have its columns (1.44). */
	public static function has_speed() {
		return self::DB_VERSION === get_option( 'om_ins_db' );
	}

	/** Whether the actions table has the page speed columns. */
	private static function speed_columns() {
		global $wpdb;
		$quiet = $wpdb->suppress_errors( true );
		$wpdb->get_var( 'SELECT lcp + inp + cls + ttfb FROM ' . self::events_table() . ' LIMIT 1' ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
		$ok = '' === (string) $wpdb->last_error;
		$wpdb->suppress_errors( $quiet );
		return $ok;
	}

	/**
	 * Creates the two tables, or adds what an update brings to them. dbDelta()
	 * only adds tables, columns and keys: visits and actions already kept stay
	 * as they are. Returns whether the tables are complete.
	 */
	public static function install() {
		global $wpdb;
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		$charset = $wpdb->get_charset_collate();
		$events  = self::events_table();
		$visits  = self::sessions_table();
		dbDelta(
			"CREATE TABLE {$events} (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  ts int(10) unsigned NOT NULL DEFAULT 0,
  day date NOT NULL,
  hr tinyint(3) unsigned NOT NULL DEFAULT 0,
  sid char(12) NOT NULL DEFAULT '',
  vid char(12) NOT NULL DEFAULT '',
  type varchar(16) NOT NULL DEFAULT '',
  page varchar(190) NOT NULL DEFAULT '',
  item varchar(90) NOT NULL DEFAULT '',
  label varchar(190) NOT NULL DEFAULT '',
  meta varchar(190) NOT NULL DEFAULT '',
  val decimal(12,2) NOT NULL DEFAULT 0,
  pv char(8) NOT NULL DEFAULT '',
  dur smallint(5) unsigned NOT NULL DEFAULT 0,
  scroll tinyint(3) unsigned NOT NULL DEFAULT 0,
  lcp smallint(5) unsigned NOT NULL DEFAULT 0,
  inp smallint(5) unsigned NOT NULL DEFAULT 0,
  cls smallint(5) unsigned NOT NULL DEFAULT 0,
  ttfb smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY  (id),
  KEY day_type (day,type),
  KEY sid (sid),
  KEY item_type (item,type),
  KEY vid (vid)
) {$charset};"
		);
		dbDelta(
			"CREATE TABLE {$visits} (
  sid char(12) NOT NULL,
  vid char(12) NOT NULL DEFAULT '',
  day date NOT NULL,
  hr tinyint(3) unsigned NOT NULL DEFAULT 0,
  dow tinyint(3) unsigned NOT NULL DEFAULT 0,
  started int(10) unsigned NOT NULL DEFAULT 0,
  last int(10) unsigned NOT NULL DEFAULT 0,
  landing varchar(190) NOT NULL DEFAULT '',
  exit_page varchar(190) NOT NULL DEFAULT '',
  channel varchar(12) NOT NULL DEFAULT '',
  ref_host varchar(100) NOT NULL DEFAULT '',
  utm_source varchar(80) NOT NULL DEFAULT '',
  utm_medium varchar(80) NOT NULL DEFAULT '',
  utm_campaign varchar(120) NOT NULL DEFAULT '',
  device varchar(8) NOT NULL DEFAULT '',
  browser varchar(20) NOT NULL DEFAULT '',
  os varchar(12) NOT NULL DEFAULT '',
  country char(2) NOT NULL DEFAULT '',
  region varchar(60) NOT NULL DEFAULT '',
  city varchar(60) NOT NULL DEFAULT '',
  tz varchar(40) NOT NULL DEFAULT '',
  lang varchar(12) NOT NULL DEFAULT '',
  is_new tinyint(1) unsigned NOT NULL DEFAULT 0,
  visit_no smallint(5) unsigned NOT NULL DEFAULT 1,
  pages smallint(5) unsigned NOT NULL DEFAULT 0,
  events smallint(5) unsigned NOT NULL DEFAULT 0,
  engaged int(10) unsigned NOT NULL DEFAULT 0,
  products smallint(5) unsigned NOT NULL DEFAULT 0,
  saves smallint(5) unsigned NOT NULL DEFAULT 0,
  leads tinyint(3) unsigned NOT NULL DEFAULT 0,
  lead_type varchar(16) NOT NULL DEFAULT '',
  lead_name varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY  (sid),
  KEY day (day),
  KEY last (last),
  KEY vid (vid)
) {$charset};"
		);
		// The version moves on only once the new columns are really there.
		if ( ! self::speed_columns() ) {
			return false;
		}
		update_option( 'om_ins_db', self::DB_VERSION );
		return true;
	}

	/* ---------------------------------------------------------------
	 * The script on every page
	 * ------------------------------------------------------------- */

	/** Logged-in staff (when they are left out). */
	public static function excluded_user() {
		return '0' !== self::opt( 'om_ins_staff' ) && is_user_logged_in() && current_user_can( 'edit_posts' );
	}

	public function enqueue() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only checks.
		$builder = isset( $_GET['elementor-preview'] ) || isset( $_GET['preview'] ) || isset( $_GET['et_fb'] );
		if ( ! self::enabled() || is_admin() || is_customize_preview() || is_preview() || $builder || is_feed() || is_robots() || self::excluded_user() ) {
			return;
		}
		wp_enqueue_script( 'om-visit', OM_CATALOG_URL . 'assets/js/om-visit.js', array(), OM_CATALOG_VERSION, true );
		wp_add_inline_script(
			'om-visit',
			'window.omVisit=' . wp_json_encode(
				array(
					'u'   => admin_url( 'admin-ajax.php' ) . '?action=om_v',
					'dnt' => '0' !== self::opt( 'om_ins_dnt' ) ? 1 : 0,
					'vid' => '0' !== self::opt( 'om_ins_vid' ) ? 1 : 0,
					// How fast the page showed and answered (Core Web Vitals), and pages that don't exist.
					'cwv' => '0' !== self::opt( 'om_ins_speed' ) && self::has_speed() ? 1 : 0,
					'nf'  => is_404() ? 1 : 0,
				)
			) . ';',
			'before'
		);
	}

	/* ---------------------------------------------------------------
	 * Collecting
	 * ------------------------------------------------------------- */

	/** Answer at once with nothing: the visitor's browser doesn't wait for it anyway. */
	private static function done() {
		status_header( 204 );
		exit;
	}

	public function collect() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- anonymous, write-only, rate-limited; see the class doc.
		$raw = isset( $_POST['d'] ) && is_string( $_POST['d'] ) ? wp_unslash( $_POST['d'] ) : '';
		// phpcs:enable
		if ( ! self::enabled() || '' === $raw || strlen( $raw ) > 48000 || self::is_bot() || self::excluded_user() ) {
			self::done();
		}
		$in = json_decode( $raw, true );
		if ( ! is_array( $in ) ) {
			self::done();
		}
		$sid = self::id( $in['s'] ?? '', 12 );
		$vid = '0' !== self::opt( 'om_ins_vid' ) ? self::id( $in['v'] ?? '', 12 ) : '';
		if ( '' === $sid || ! self::rate_ok() ) {
			self::done();
		}
		if ( '' === $vid ) {
			$vid = $sid;
		}
		self::store( $sid, $vid, $in );
		self::done();
	}

	/** Validate and save one report: its events, the visit, time and scroll. */
	public static function store( $sid, $vid, $in ) {
		global $wpdb;
		$now     = time();
		$types   = self::client_types();
		$rows    = array();
		$engage  = array();
		$counts  = array( 'pages' => 0, 'products' => 0, 'saves' => 0 );
		$exit    = '';
		$landing = '';
		foreach ( array_slice( (array) ( $in['e'] ?? array() ), 0, self::MAX_BATCH ) as $e ) {
			if ( ! is_array( $e ) ) {
				continue;
			}
			$type = isset( $e['t'] ) && is_string( $e['t'] ) ? $e['t'] : '';
			if ( 'engage' === $type ) {
				$pv = self::id( $e['x'] ?? '', 8 );
				if ( '' !== $pv ) {
					// Time and scroll, then the page's speed when the browser measured it: largest
					// paint, slowest response to a tap or key (ms), layout shift (x1000), first byte (ms).
					$ms = static function ( $v ) {
						return min( 65000, max( 0, (int) round( (float) $v ) ) );
					};
					$engage[ $pv ] = array( min( 10800, max( 0, (int) ( $e['d'] ?? 0 ) ) ), min( 100, max( 0, (int) ( $e['y'] ?? 0 ) ) ), $ms( $e['l'] ?? 0 ), $ms( $e['n'] ?? 0 ), $ms( $e['c'] ?? 0 ), $ms( $e['b'] ?? 0 ) );
				}
				continue;
			}
			if ( ! isset( $types[ $type ] ) ) {
				continue;
			}
			// When it happened: the browser says how long ago (its own clock can't be trusted).
			$ts  = $now - (int) floor( min( DAY_IN_SECONDS * 1000, max( 0, (float) ( $e['a'] ?? 0 ) ) ) / 1000 );
			$row = array(
				'ts'    => $ts,
				'day'   => wp_date( 'Y-m-d', $ts ),
				'hr'    => (int) wp_date( 'G', $ts ),
				'sid'   => $sid,
				'vid'   => $vid,
				'type'  => $type,
				'page'  => self::path( $e['p'] ?? '' ),
				'item'  => self::item( $e['i'] ?? '' ),
				'label' => self::text( $e['l'] ?? '' ),
				'meta'  => self::text( $e['m'] ?? '' ),
				'val'   => self::num( $e['v'] ?? 0 ),
				'pv'    => 'pageview' === $type ? self::id( $e['x'] ?? '', 8 ) : '',
			);
			if ( 'pageview' === $type ) {
				++$counts['pages'];
				$exit    = $row['page'];
				$landing = '' !== $landing ? $landing : $row['page'];
			} elseif ( 'view' === $type ) {
				++$counts['products'];
			} elseif ( 'save' === $type ) {
				++$counts['saves'];
			}
			$rows[] = $row;
		}
		if ( ! $rows && ! $engage ) {
			return;
		}

		$visits = self::sessions_table();
		$visit  = $wpdb->get_row( $wpdb->prepare( "SELECT sid, events FROM {$visits} WHERE sid = %s", $sid ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- table name.
		if ( ! $visit ) {
			if ( ! $rows ) {
				return;
			}
			self::open_visit( $sid, $vid, $rows[0]['ts'], '' !== $landing ? $landing : $rows[0]['page'], (array) ( $in['c'] ?? array() ), ! empty( $in['f'] ) );
		} elseif ( (int) $visit['events'] >= self::MAX_PER_VISIT ) {
			return;
		}

		if ( $rows ) {
			self::insert( $rows );
			$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				$wpdb->prepare(
					"UPDATE {$visits} SET last = CASE WHEN last < %d THEN %d ELSE last END, pages = pages + %d, events = events + %d, products = products + %d, saves = saves + %d, exit_page = CASE WHEN %s = '' THEN exit_page ELSE %s END WHERE sid = %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
					$now,
					$now,
					$counts['pages'],
					count( $rows ),
					$counts['products'],
					$counts['saves'],
					$exit,
					$exit,
					$sid
				)
			);
		}
		if ( $engage ) {
			$events = self::events_table();
			$speed  = self::has_speed();
			foreach ( $engage as $pv => $pair ) {
				if ( $speed ) {
					// Speed: the browser's latest reading wins (largest paint and layout shift settle as the page loads).
					$wpdb->query( $wpdb->prepare( "UPDATE {$events} SET dur = CASE WHEN dur < %d THEN %d ELSE dur END, scroll = CASE WHEN scroll < %d THEN %d ELSE scroll END, lcp = CASE WHEN %d > 0 THEN %d ELSE lcp END, inp = CASE WHEN %d > 0 THEN %d ELSE inp END, cls = CASE WHEN %d > 0 THEN %d ELSE cls END, ttfb = CASE WHEN %d > 0 THEN %d ELSE ttfb END WHERE sid = %s AND pv = %s AND type = 'pageview'", $pair[0], $pair[0], $pair[1], $pair[1], $pair[2], $pair[2], $pair[3], $pair[3], $pair[4], $pair[4], $pair[5], $pair[5], $sid, $pv ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
				} else {
					// The tables aren't updated yet: time and scroll as before.
					$wpdb->query( $wpdb->prepare( "UPDATE {$events} SET dur = CASE WHEN dur < %d THEN %d ELSE dur END, scroll = CASE WHEN scroll < %d THEN %d ELSE scroll END WHERE sid = %s AND pv = %s AND type = 'pageview'", $pair[0], $pair[0], $pair[1], $pair[1], $sid, $pv ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
				}
			}
			$wpdb->query( $wpdb->prepare( "UPDATE {$visits} SET engaged = (SELECT COALESCE(SUM(dur), 0) FROM {$events} WHERE sid = %s AND type = 'pageview'), last = CASE WHEN last < %d THEN %d ELSE last END WHERE sid = %s", $sid, $now, $now, $sid ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
		}
	}

	/** A new visit: where from, on what, and the how-many-th for this visitor. */
	private static function open_visit( $sid, $vid, $ts, $landing, $ctx, $fresh ) {
		global $wpdb;
		$visits = self::sessions_table();
		$utm    = array();
		wp_parse_str( is_string( $ctx['q'] ?? null ) ? substr( $ctx['q'], 0, 600 ) : '', $utm );
		$keep = array();
		foreach ( array( 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid' ) as $key ) {
			if ( isset( $utm[ $key ] ) && is_string( $utm[ $key ] ) && '' !== $utm[ $key ] ) {
				$keep[ $key ] = self::text( $utm[ $key ], 120 );
			}
		}
		$ref = strtolower( preg_replace( '/[^a-z0-9.\-]/i', '', is_string( $ctx['r'] ?? null ) ? $ctx['r'] : '' ) );
		$ref = substr( preg_replace( '/^www\./', '', $ref ), 0, 100 );
		$own = strtolower( preg_replace( '/^www\./', '', (string) wp_parse_url( home_url(), PHP_URL_HOST ) ) );
		if ( $ref === $own ) {
			$ref = '';
		}
		$ua     = isset( $_SERVER['HTTP_USER_AGENT'] ) ? substr( sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ), 0, 400 ) : '';
		$prior  = $vid !== $sid ? (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM {$visits} WHERE vid = %s", $vid ) ) : 0; // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
		$header = static function ( $name, $len ) {
			return isset( $_SERVER[ $name ] ) ? substr( sanitize_text_field( wp_unslash( $_SERVER[ $name ] ) ), 0, $len ) : '';
		};
		$country = strtoupper( $header( 'HTTP_CF_IPCOUNTRY', 2 ) );
		$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
			$wpdb->prepare(
				"INSERT IGNORE INTO {$visits} (sid, vid, day, hr, dow, started, last, landing, exit_page, channel, ref_host, utm_source, utm_medium, utm_campaign, device, browser, os, country, region, city, tz, lang, is_new, visit_no) VALUES (%s, %s, %s, %d, %d, %d, %d, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %d, %d)", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
				$sid,
				$vid,
				wp_date( 'Y-m-d', $ts ),
				(int) wp_date( 'G', $ts ),
				(int) wp_date( 'w', $ts ),
				$ts,
				$ts,
				$landing,
				$landing,
				self::channel( $ref, $keep ),
				$ref,
				$keep['utm_source'] ?? '',
				$keep['utm_medium'] ?? '',
				$keep['utm_campaign'] ?? '',
				self::device( $ua, (int) ( $ctx['w'] ?? 0 ), (int) ( $ctx['t'] ?? 0 ) ),
				self::browser( $ua ),
				self::os( $ua ),
				preg_match( '/^[A-Z]{2}$/', $country ) && 'XX' !== $country ? $country : '',
				$header( 'HTTP_CF_REGION', 60 ),
				$header( 'HTTP_CF_IPCITY', 60 ),
				self::text( $ctx['z'] ?? '', 40 ),
				self::text( $ctx['g'] ?? '', 12 ),
				$fresh || 0 === $prior ? 1 : 0,
				min( 65000, $prior + 1 )
			)
		);
	}

	/** Several events in one query. */
	private static function insert( $rows ) {
		global $wpdb;
		$place  = array();
		$values = array();
		foreach ( $rows as $r ) {
			$place[] = '(%d, %s, %d, %s, %s, %s, %s, %s, %s, %s, %f, %s)';
			array_push( $values, $r['ts'], $r['day'], $r['hr'], $r['sid'], $r['vid'], $r['type'], $r['page'], $r['item'], $r['label'], $r['meta'], $r['val'], $r['pv'] );
		}
		$events = self::events_table();
		$wpdb->query( $wpdb->prepare( "INSERT INTO {$events} (ts, day, hr, sid, vid, type, page, item, label, meta, val, pv) VALUES " . implode( ', ', $place ), $values ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQLPlaceholders.UnfinishedPrepare, WordPress.DB.DirectDatabaseQuery
	}

	/**
	 * Something the server knows (a lead, a search that found nothing, a
	 * story reel), tied to the visit through its cookie when there is one.
	 */
	public static function server_event( $type, $args = array() ) {
		if ( ! self::enabled() || ! isset( self::types()[ $type ] ) || self::is_bot() || self::excluded_user() ) {
			return '';
		}
		$sid = self::cookie_id( self::SID_COOKIE );
		$vid = '0' !== self::opt( 'om_ins_vid' ) ? self::cookie_id( self::VID_COOKIE ) : '';
		$vid = '' !== $vid ? $vid : $sid;
		$ts  = time();
		self::insert(
			array(
				array(
					'ts'    => $ts,
					'day'   => wp_date( 'Y-m-d', $ts ),
					'hr'    => (int) wp_date( 'G', $ts ),
					'sid'   => $sid,
					'vid'   => $vid,
					'type'  => $type,
					'page'  => self::path( $args['page'] ?? '' ),
					'item'  => self::item( $args['item'] ?? '' ),
					'label' => self::text( $args['label'] ?? '' ),
					'meta'  => self::text( $args['meta'] ?? '' ),
					'val'   => self::num( $args['val'] ?? 0 ),
					'pv'    => '',
				),
			)
		);
		return $sid;
	}

	/* ---------------------------------------------------------------
	 * Leads
	 * ------------------------------------------------------------- */

	/**
	 * A lead, tied to the visit behind it.
	 *
	 * @param string $type  booking, inquiry, hint, saved_list, ring_design, quiz_email, newsletter.
	 * @param array  $args  item (line|style), subject, page, id (inquiry post), name.
	 */
	public static function lead( $type, $args = array() ) {
		global $wpdb;
		$type = isset( self::lead_types()[ $type ] ) ? $type : 'inquiry';
		$sid  = self::server_event(
			'lead',
			array(
				'label' => $type,
				'item'  => $args['item'] ?? '',
				'meta'  => $args['subject'] ?? '',
				'page'  => $args['page'] ?? '',
				'val'   => (int) ( $args['id'] ?? 0 ),
			)
		);
		if ( '' === $sid ) {
			return;
		}
		$name = self::text( $args['name'] ?? '', 80 );
		if ( ! empty( $args['id'] ) ) {
			update_post_meta( (int) $args['id'], '_om_ins_sid', $sid );
		}
		$wpdb->query( $wpdb->prepare( 'UPDATE ' . self::sessions_table() . " SET leads = CASE WHEN leads < 255 THEN leads + 1 ELSE 255 END, lead_type = CASE WHEN lead_type = '' THEN %s ELSE lead_type END, lead_name = CASE WHEN lead_name = '' THEN %s ELSE lead_name END WHERE sid = %s", $type, $name, $sid ) ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
	}

	/** This plugin's leads (the kit's come through its own hooks below). */
	public function on_lead( $lead ) {
		// phpcs:ignore WordPress.Security.NonceVerification -- reading which request this is.
		$action = isset( $_REQUEST['action'] ) && is_string( $_REQUEST['action'] ) ? sanitize_key( wp_unslash( $_REQUEST['action'] ) ) : '';
		if ( ! is_array( $lead ) || in_array( $action, array( 'wk_book', 'wk_news', 'wk_quiz' ), true ) ) {
			return;
		}
		$map  = array( 'inquiry' => 'inquiry', 'saved' => 'saved_list', 'design' => 'ring_design', 'hint' => 'hint' );
		$line = sanitize_title( (string) ( $lead['line'] ?? '' ) );
		$sty  = (string) ( $lead['style'] ?? '' );
		self::lead(
			$map[ (string) ( $lead['event'] ?? '' ) ] ?? 'inquiry',
			array(
				'item'    => '' !== $line && '' !== $sty ? $line . '|' . $sty : '',
				'subject' => (string) ( $lead['subject'] ?? '' ),
				'page'    => (string) ( $lead['page'] ?? '' ),
				'id'      => (int) ( $lead['inquiry_id'] ?? 0 ),
				'name'    => '' !== trim( (string) ( $lead['name'] ?? '' ) ) ? (string) $lead['name'] : (string) ( $lead['email'] ?? '' ),
			)
		);
	}

	public function on_booking( $d ) {
		$d = (array) $d;
		self::lead(
			'booking',
			array(
				'subject' => implode( ', ', array_map( 'strval', (array) ( $d['topics'] ?? array() ) ) ),
				'page'    => (string) ( $d['page'] ?? '' ),
				'name'    => (string) ( $d['name'] ?? '' ),
			)
		);
	}

	public function on_quiz( $d ) {
		$d = (array) $d;
		self::lead( 'quiz_email', array( 'page' => (string) ( $d['page'] ?? '' ), 'name' => (string) ( $d['email'] ?? '' ) ) );
	}

	public function on_newsletter( $email ) {
		self::lead( 'newsletter', array( 'name' => (string) $email ) );
	}

	/* ---------------------------------------------------------------
	 * The visit behind a lead: the shop's emails, the inquiry screen
	 * ------------------------------------------------------------- */

	public static function journey_on() {
		return self::enabled() && '0' !== self::opt( 'om_ins_journey' );
	}

	/** The visit of whoever is making this request, when one was recorded. */
	public static function current_sid() {
		return self::is_bot() || self::excluded_user() ? '' : self::cookie_id( self::SID_COOKIE );
	}

	/** The visit an inquiry was sent from. */
	public static function inquiry_sid( $post_id ) {
		global $wpdb;
		$sid  = self::id( (string) get_post_meta( (int) $post_id, '_om_ins_sid', true ), 12 );
		$post = '' === $sid ? get_post( (int) $post_id ) : null;
		if ( $post ) {
			$t   = (int) get_post_time( 'U', true, $post );
			$sid = self::id(
				(string) $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
					$wpdb->prepare(
						'SELECT sid FROM ' . self::events_table() . " WHERE day BETWEEN %s AND %s AND type = 'lead' AND val = %d LIMIT 1", // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
						wp_date( 'Y-m-d', $t - DAY_IN_SECONDS ),
						wp_date( 'Y-m-d', $t + DAY_IN_SECONDS ),
						(int) $post_id
					)
				),
				12
			);
		}
		return $sid;
	}

	/**
	 * One visit, ready to tell: the visit, its actions in order, and the
	 * visitor's history up to it (how many visits since when, what they
	 * looked at and saved before).
	 *
	 * @return array|null
	 */
	public static function journey( $sid ) {
		global $wpdb;
		$sid = self::id( (string) $sid, 12 );
		if ( '' === $sid ) {
			return null;
		}
		$visits = self::sessions_table();
		$events = self::events_table();
		// phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
		$v = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$visits} WHERE sid = %s", $sid ), ARRAY_A );
		if ( ! $v ) {
			return null;
		}
		$out = array(
			'visit'  => $v,
			'events' => (array) $wpdb->get_results( $wpdb->prepare( "SELECT ts, type, page, item, label, meta, val, dur, scroll FROM {$events} WHERE sid = %s ORDER BY ts, id LIMIT 1000", $sid ), ARRAY_A ),
			'visits' => 1,
			'first'  => (int) $v['started'],
			'before' => array( 'views' => array(), 'saves' => array() ),
		);
		if ( '' !== $v['vid'] && $v['vid'] !== $sid ) {
			$h             = $wpdb->get_row( $wpdb->prepare( "SELECT COUNT(*) AS n, MIN(started) AS first FROM {$visits} WHERE vid = %s AND started <= %d", $v['vid'], (int) $v['started'] ), ARRAY_A );
			$out['visits'] = max( 1, (int) ( $h['n'] ?? 1 ) );
			$out['first']  = min( (int) $v['started'], (int) ( $h['first'] ?? $v['started'] ) );
			if ( $out['visits'] > 1 ) {
				foreach ( (array) $wpdb->get_results( $wpdb->prepare( "SELECT type, item FROM {$events} WHERE vid = %s AND sid <> %s AND ts < %d AND type IN ('view','save') AND item <> '' ORDER BY ts DESC LIMIT 500", $v['vid'], $sid, (int) $v['started'] ), ARRAY_A ) as $r ) {
					$out['before'][ 'save' === $r['type'] ? 'saves' : 'views' ][ $r['item'] ] = true;
				}
			}
		}
		// phpcs:enable
		return $out;
	}

	/**
	 * The visit in a few lines for people: [ label, text, design keys ].
	 * Design keys ("line|STYLE") are shown as names (links in emails).
	 */
	public static function journey_lines( $j ) {
		$v     = $j['visit'];
		$lines = array();
		$from  = self::channels()[ $v['channel'] ] ?? __( 'Unknown', 'om-catalog' );
		if ( '' !== $v['ref_host'] ) {
			$from .= ' (' . $v['ref_host'] . ')';
		}
		if ( '' !== $v['utm_campaign'] ) {
			/* translators: %s: campaign name from the link. */
			$from .= ' · ' . sprintf( __( 'campaign "%s"', 'om-catalog' ), $v['utm_campaign'] );
		}
		$lines[] = array( __( 'Came from', 'om-catalog' ), $from, array() );
		if ( $j['visits'] > 1 ) {
			/* translators: 1: number of visits, 2: date of the first, 3: time between (e.g. "3 weeks"). */
			$lines[] = array( __( 'Visits', 'om-catalog' ), sprintf( _n( '%1$s visit so far · the first on %2$s, %3$s before', '%1$s visits so far · the first on %2$s, %3$s before', $j['visits'], 'om-catalog' ), number_format_i18n( $j['visits'] ), wp_date( 'M j', $j['first'] ), human_time_diff( $j['first'], (int) $v['started'] ) ), array() );
		} else {
			$lines[] = array( __( 'Visits', 'om-catalog' ), __( 'First visit to the site', 'om-catalog' ), array() );
		}
		$devices = array( 'phone' => __( 'on a phone', 'om-catalog' ), 'tablet' => __( 'on a tablet', 'om-catalog' ), 'desktop' => __( 'on a computer', 'om-catalog' ) );
		/* translators: %s: number of pages. */
		$bits = array( sprintf( _n( '%s page', '%s pages', (int) $v['pages'], 'om-catalog' ), number_format_i18n( (int) $v['pages'] ) ) );
		if ( (int) $v['engaged'] > 0 ) {
			/* translators: %s: time, e.g. 3m 20s. */
			$bits[] = sprintf( __( '%s on the site', 'om-catalog' ), self::duration( (int) $v['engaged'] ) );
		}
		if ( isset( $devices[ $v['device'] ] ) ) {
			$bits[] = $devices[ $v['device'] ];
		}
		$place = trim( implode( ', ', array_filter( array( $v['city'], $v['region'] ) ) ) );
		if ( '' !== $place ) {
			/* translators: %s: town and state. */
			$bits[] = sprintf( __( 'near %s', 'om-catalog' ), $place );
		}
		$lines[] = array( __( 'This visit', 'om-catalog' ), implode( ' · ', $bits ), array() );

		$first   = '';
		$views   = array();
		$saves   = array();
		$groups  = array();
		$search  = array();
		$chosen  = array();
		$also    = array();
		$builder = 0;
		$quiz    = 0;
		$asked   = 0;
		foreach ( $j['events'] as $e ) {
			$item = (string) $e['item'];
			switch ( $e['type'] ) {
				case 'pageview':
					if ( '' === $first ) {
						$first = self::page_name( (string) $e['label'], (string) $e['page'] );
					}
					break;
				case 'view':
					if ( '' !== $item ) {
						$views[ $item ] = true;
					}
					break;
				case 'save':
					if ( '' !== $item ) {
						$saves[ $item ] = true;
					}
					break;
				case 'compare':
					if ( '' !== $e['meta'] ) {
						$groups[ $e['meta'] ] = true;
					}
					break;
				case 'search':
					if ( '' !== $e['label'] ) {
						$search[ '"' . strtolower( $e['label'] ) . '"' ] = true;
					}
					break;
				case 'option':
					$chosen[ self::option_name( (string) $e['label'] ) ] = (string) $e['meta'];
					break;
				case 'builder':
					$builder = max( $builder, (int) $e['val'] );
					break;
				case 'quiz':
					$quiz = max( $quiz, 'complete' === $e['label'] ? 2 : 1 );
					break;
				case 'assistant':
					if ( 'message' === $e['label'] ) {
						$asked++;
					} elseif ( 'open' === $e['label'] ) {
						$also['assistant'] = __( 'opened the jeweller assistant', 'om-catalog' );
					}
					break;
				case 'diamond':
					$also['diamond'] = __( 'used the diamond tools', 'om-catalog' );
					break;
				case 'designer':
					$also['designer'] = __( 'opened the ring designer', 'om-catalog' );
					break;
				case 'reel':
					$also['reel'] = __( 'watched story reels', 'om-catalog' );
					break;
				case 'call':
					$also['call'] = __( 'tapped to call', 'om-catalog' );
					break;
				case 'directions':
					$also['directions'] = __( 'opened directions', 'om-catalog' );
					break;
				case 'hint':
					if ( 'open' === $e['label'] ) {
						$also['hint'] = __( 'opened "Drop a hint"', 'om-catalog' );
					}
					break;
			}
		}
		if ( $builder ) {
			/* translators: %d: step reached. */
			$also = array( 'builder' => sprintf( __( 'used the ring builder (reached step %d)', 'om-catalog' ), $builder ) ) + $also;
		}
		if ( $quiz ) {
			$also = array( 'quiz' => 2 === $quiz ? __( 'finished the ring style quiz', 'om-catalog' ) : __( 'started the ring style quiz', 'om-catalog' ) ) + $also;
		}
		if ( $asked ) {
			/* translators: %s: number of questions. */
			$also['assistant'] = sprintf( _n( 'asked the jeweller assistant %s question', 'asked the jeweller assistant %s questions', $asked, 'om-catalog' ), number_format_i18n( $asked ) );
		}
		if ( '' !== $first ) {
			$lines[] = array( __( 'First page', 'om-catalog' ), $first, array() );
		}
		if ( $views ) {
			$lines[] = array( __( 'Looked at', 'om-catalog' ), '', array_keys( $views ) );
		}
		if ( $saves ) {
			$lines[] = array( __( 'Saved', 'om-catalog' ), '', array_keys( $saves ) );
		}
		if ( $groups ) {
			$names = array();
			foreach ( array_slice( array_keys( $groups ), 0, 3 ) as $group ) {
				$names[] = implode( ' + ', array_map( static function ( $key ) { return self::design( $key )['title']; }, explode( ' + ', $group ) ) );
			}
			$lines[] = array( __( 'Compared', 'om-catalog' ), implode( '; ', $names ), array() );
		}
		if ( $chosen ) {
			$parts = array();
			foreach ( $chosen as $name => $value ) {
				$parts[] = $name . ': ' . $value;
			}
			$lines[] = array( __( 'Chose', 'om-catalog' ), implode( ' · ', $parts ), array() );
		}
		if ( $search ) {
			$lines[] = array( __( 'Searched for', 'om-catalog' ), implode( ', ', array_slice( array_keys( $search ), 0, 6 ) ), array() );
		}
		if ( $also ) {
			$lines[] = array( __( 'Also', 'om-catalog' ), ucfirst( implode( ', ', $also ) ), array() );
		}
		$before = $j['before'];
		if ( $before['views'] || $before['saves'] ) {
			/* translators: 1: designs looked at, 2: designs saved. */
			$lines[] = array( __( 'On earlier visits', 'om-catalog' ), sprintf( __( 'Looked at %1$s designs, saved %2$s', 'om-catalog' ), number_format_i18n( count( $before['views'] ) ), number_format_i18n( count( $before['saves'] ) ) ), array_keys( $before['saves'] ) );
		}
		return $lines;
	}

	/** "Their visit" for an email to the shop (tables and inline styles). */
	public static function journey_email( $sid ) {
		$j = self::journey( $sid );
		if ( ! $j ) {
			return '';
		}
		$font  = 'font-family:Helvetica,Arial,sans-serif;';
		$muted = $font . 'color:#6e6e6e;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;';
		$rows  = '';
		foreach ( self::journey_lines( $j ) as $line ) {
			$value = esc_html( $line[1] );
			if ( $line[2] ) {
				$links = array();
				foreach ( array_slice( $line[2], 0, 6 ) as $key ) {
					$d       = self::design( $key );
					$name    = esc_html( $d['title'] ) . ( '' !== $d['style'] ? ' <span style="color:#6e6e6e;">(' . esc_html( $d['style'] ) . ')</span>' : '' );
					$links[] = '' !== $d['url'] ? '<a href="' . esc_url( $d['url'] ) . '" style="color:#222222;">' . $name . '</a>' : $name;
				}
				$more = count( $line[2] ) - 6;
				/* translators: %s: number of further designs. */
				$value .= ( '' !== $value ? '<br>' : '' ) . implode( '<br>', $links ) . ( $more > 0 ? '<br><span style="color:#6e6e6e;">' . esc_html( sprintf( __( 'and %s more', 'om-catalog' ), number_format_i18n( $more ) ) ) . '</span>' : '' );
			}
			$rows .= '<tr><td valign="top" style="padding:8px 12px 8px 0;border-top:1px solid #f0f0f0;color:#6e6e6e;width:34%;' . $font . 'font-size:14px;">' . esc_html( $line[0] ) . '</td><td valign="top" style="padding:8px 0;border-top:1px solid #f0f0f0;color:#222222;' . $font . 'font-size:14px;line-height:1.5;">' . $value . '</td></tr>';
		}
		$link = add_query_arg( array( 'page' => 'om-insights', 'visit' => $j['visit']['sid'] ), admin_url( 'admin.php' ) );
		return '<div style="' . $muted . 'margin:22px 0 8px;">' . esc_html__( 'Their visit', 'om-catalog' ) . '</div>'
			. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $rows . '</table>'
			. '<div style="' . $font . 'font-size:13px;margin:10px 0 0;"><a href="' . esc_url( $link ) . '" style="color:#222222;">' . esc_html__( 'See their visit step by step in Insights', 'om-catalog' ) . '</a></div>';
	}

	/**
	 * The visit behind a lead for the CRM, as plain text: every line of
	 * "Their visit", where they came from, their visits so far, the designs
	 * they looked at and a link to the visit in Insights.
	 *
	 * @return array { lines: [ [ label, text ] ], came_from, visits, viewed: [ "Name (style)" ], url } or empty.
	 */
	public static function crm_visit( $sid ) {
		$j = self::journey( $sid );
		if ( ! $j ) {
			return array();
		}
		$name  = static function ( $key ) {
			$d = self::design( $key );
			return $d['title'] . ( '' !== $d['style'] && $d['style'] !== $d['title'] ? ' (' . $d['style'] . ')' : '' );
		};
		$lines = array();
		foreach ( self::journey_lines( $j ) as $line ) {
			$text = (string) $line[1];
			if ( $line[2] ) {
				$names = array_map( $name, array_slice( $line[2], 0, 8 ) );
				$more  = count( $line[2] ) - 8;
				/* translators: %s: number of further designs. */
				$text .= ( '' !== $text ? ': ' : '' ) . implode( ', ', $names ) . ( $more > 0 ? ' ' . sprintf( __( 'and %s more', 'om-catalog' ), number_format_i18n( $more ) ) : '' );
			}
			$lines[] = array( (string) $line[0], $text );
		}
		$viewed = array();
		foreach ( $j['events'] as $e ) {
			if ( 'view' === $e['type'] && '' !== (string) $e['item'] ) {
				$viewed[ (string) $e['item'] ] = true;
			}
		}
		return array(
			'lines'     => $lines,
			'came_from' => $lines[0][1] ?? '',
			'visits'    => $lines[1][1] ?? '',
			'viewed'    => array_map( $name, array_slice( array_keys( $viewed ), 0, 15 ) ),
			'url'       => add_query_arg( array( 'page' => 'om-insights', 'visit' => $j['visit']['sid'] ), admin_url( 'admin.php' ) ),
		);
	}

	/** OM_Emails: "Their visit" under the shop's copy of an inquiry, hint, saved list or ring design. */
	public function email_details( $details, $id ) {
		if ( ! in_array( $id, array( 'inquiry_shop', 'hint_shop', 'saved_shop', 'design_shop' ), true ) || ! self::journey_on() ) {
			return $details;
		}
		return $details . self::journey_email( self::current_sid() );
	}

	/** Wulf Elementor Kit: the same under its visit request, quiz and newsletter emails to the shop. */
	public function kit_mail( $html ) {
		return self::journey_on() ? $html . self::journey_email( self::current_sid() ) : $html;
	}

	/** A design ("line|STYLE"): name, style, line, photo and link, from the catalog's search index. */
	public static function design( $key, $title = '' ) {
		static $index = array();
		list( $line, $style ) = array_pad( explode( '|', (string) $key, 2 ), 2, '' );
		if ( ! isset( $index[ $line ] ) ) {
			$index[ $line ] = array();
			$cached         = '' !== $line ? get_transient( 'om_index_' . md5( $line ) ) : array();
			foreach ( is_array( $cached ) ? $cached : array() as $item ) {
				$index[ $line ][ strtoupper( (string) ( $item['s'] ?? '' ) ) ] = $item;
			}
		}
		$item = $index[ $line ][ strtoupper( $style ) ] ?? array();
		return array(
			'title' => '' !== (string) $title ? (string) $title : ( '' !== (string) ( $item['t'] ?? '' ) ? (string) $item['t'] : $style ),
			'style' => $style,
			'line'  => $line,
			'image' => (string) ( $item['i'] ?? '' ),
			'url'   => function_exists( 'om_product_url' ) && '' !== $style && '' !== $line ? om_product_url( $line, $style ) : '',
		);
	}

	/** A page title without the site's name after it (the home page and hint pages by name). */
	public static function page_name( $title, $path ) {
		if ( '/om-hint/' === $path ) {
			return __( 'Drop a hint pages (private)', 'om-catalog' );
		}
		if ( '/' === $path ) {
			return __( 'Home page', 'om-catalog' );
		}
		$site  = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		$title = trim( (string) $title );
		if ( '' !== $site ) {
			$title = (string) preg_replace( '/\s*[|\x{2013}\x{2014}\-:\x{00B7}]\s*' . preg_quote( $site, '/' ) . '\s*$/u', '', $title );
		}
		return '' !== $title ? $title : $path;
	}

	/** The name of a product page option. */
	public static function option_name( $key ) {
		$names = array( 'metal' => __( 'Metal', 'om-catalog' ), 'color' => __( 'Gold colour', 'om-catalog' ), 'finger_size' => __( 'Ring size', 'om-catalog' ), 'level' => __( 'Setting level', 'om-catalog' ), 'quality' => __( 'Diamond quality', 'om-catalog' ) );
		return $names[ $key ] ?? ucfirst( str_replace( '_', ' ', (string) $key ) );
	}

	/** 45s, 3m 20s, 1h 05m. */
	public static function duration( $seconds ) {
		$seconds = (int) round( $seconds );
		if ( $seconds < 60 ) {
			/* translators: %d: seconds. */
			return sprintf( __( '%ds', 'om-catalog' ), $seconds );
		}
		if ( $seconds < 3600 ) {
			/* translators: 1: minutes, 2: seconds. */
			return sprintf( __( '%1$dm %2$02ds', 'om-catalog' ), floor( $seconds / 60 ), $seconds % 60 );
		}
		/* translators: 1: hours, 2: minutes. */
		return sprintf( __( '%1$dh %2$02dm', 'om-catalog' ), floor( $seconds / 3600 ), floor( ( $seconds % 3600 ) / 60 ) );
	}

	/* ---------------------------------------------------------------
	 * Who and where
	 * ------------------------------------------------------------- */

	public static function is_bot() {
		$ua = isset( $_SERVER['HTTP_USER_AGENT'] ) ? (string) wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- only matched.
		return '' === $ua || (bool) preg_match( '~bot\b|bot/|crawl|spider|slurp|archiver|facebookexternalhit|facebookcatalog|embedly|quora link|outbrain|pinterest/|vkshare|w3c_validator|whatsapp|telegram|skypeuripreview|preview|headless|phantomjs|puppeteer|playwright|selenium|lighthouse|pagespeed|gtmetrix|pingdom|uptime|monitor|statuscake|python|curl/|wget|httpclient|go-http|java/|node-fetch|axios|okhttp|scrapy|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|anthropic|perplexity|ccbot|amazonbot|applebot|yandex|baiduspider|duckduckbot|bingpreview~i', $ua );
	}

	/** Search, social, ads, email, AI assistants, Maps / Business Profile, other sites or direct. */
	public static function channel( $ref, $utm ) {
		$src  = strtolower( (string) ( $utm['utm_source'] ?? '' ) );
		$med  = strtolower( (string) ( $utm['utm_medium'] ?? '' ) );
		$camp = strtolower( (string) ( $utm['utm_campaign'] ?? '' ) );
		if ( isset( $utm['gclid'] ) || isset( $utm['gbraid'] ) || isset( $utm['wbraid'] ) || isset( $utm['msclkid'] ) || isset( $utm['ttclid'] ) || preg_match( '/^(cpc|ppc|cpm|cpv|paid|paid[_ -]?(search|social|media)|display|banner|ads?|retargeting)$/', $med ) ) {
			return 'ads';
		}
		if ( preg_match( '/\b(gbp|gmb)\b|google[_ -]?(business|my[_ -]?business|maps)|business[_ -]?profile|maps/', $src . ' ' . $med . ' ' . $camp ) ) {
			return 'maps';
		}
		if ( preg_match( '/e-?mail|newsletter|klaviyo|mailchimp/', $med . ' ' . $src ) ) {
			return 'email';
		}
		if ( preg_match( '/^(chatgpt\.com|chat\.openai\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com|phind\.com|meta\.ai)$/', $ref ) || preg_match( '/^(chatgpt|openai|perplexity|claude|gemini|copilot)/', $src ) ) {
			return 'ai';
		}
		if ( preg_match( '/^(maps\.google\.|google\.[a-z.]+\/maps|maps\.apple\.com)/', $ref ) ) {
			return 'maps';
		}
		if ( preg_match( '/(^|\.)(mail\.google|outlook\.live|outlook\.office|mail\.yahoo|mail\.aol)\./', $ref ) ) {
			return 'email';
		}
		if ( preg_match( '/(^|\.)(google|bing|yahoo|duckduckgo|ecosia|yandex|baidu|aol|ask|startpage|qwant|search\.brave)\.[a-z.]+$/', $ref ) || 'search.brave.com' === $ref ) {
			return 'search';
		}
		if ( preg_match( '/(^|\.)(facebook\.com|fb\.com|fb\.me|messenger\.com|instagram\.com|t\.co|twitter\.com|x\.com|pinterest\.[a-z.]+|pin\.it|tiktok\.com|linkedin\.com|lnkd\.in|youtube\.com|youtu\.be|reddit\.com|threads\.net|snapchat\.com|nextdoor\.com|whatsapp\.com)$/', $ref ) || preg_match( '/^(facebook|fb|instagram|ig|twitter|x|pinterest|tiktok|linkedin|youtube|reddit|threads|nextdoor|social)$/', $src ) ) {
			return 'social';
		}
		if ( '' !== $ref ) {
			return 'referral';
		}
		return '' !== $src ? 'campaign' : 'direct';
	}

	public static function device( $ua, $width, $touch ) {
		if ( preg_match( '/iPad|Tablet|PlayBook|Silk|Kindle|Nexus (7|9|10)/i', $ua ) || ( preg_match( '/Android/i', $ua ) && ! preg_match( '/Mobile/i', $ua ) ) ) {
			return 'tablet';
		}
		if ( preg_match( '/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|Opera Mini/i', $ua ) ) {
			return 'phone';
		}
		// iPads ask for the desktop site and say "Macintosh": a touch screen gives them away.
		if ( $touch > 1 && preg_match( '/Macintosh/i', $ua ) ) {
			return 'tablet';
		}
		if ( $width > 0 && $width < 600 && $touch > 0 ) {
			return 'phone';
		}
		return 'desktop';
	}

	public static function browser( $ua ) {
		$list = array(
			'/FBAN|FBAV|FB_IAB/'       => 'Facebook app',
			'/Instagram/'              => 'Instagram app',
			'/Edg(e|A|iOS)?\//'        => 'Edge',
			'/OPR\/|Opera/'            => 'Opera',
			'/SamsungBrowser/'         => 'Samsung Internet',
			'/CriOS|Chrome\//'         => 'Chrome',
			'/FxiOS|Firefox\//'        => 'Firefox',
			'/Version\/[\d.]+.*Safari/' => 'Safari',
		);
		foreach ( $list as $re => $name ) {
			if ( preg_match( $re, $ua ) ) {
				return $name;
			}
		}
		return 'Other';
	}

	public static function os( $ua ) {
		$list = array(
			'/iPhone|iPod/'  => 'iOS',
			'/iPad/'         => 'iPadOS',
			'/Android/'      => 'Android',
			'/Windows NT/'   => 'Windows',
			'/CrOS/'         => 'ChromeOS',
			'/Mac OS X|Macintosh/' => 'macOS',
			'/Linux/'        => 'Linux',
		);
		foreach ( $list as $re => $name ) {
			if ( preg_match( $re, $ua ) ) {
				return $name;
			}
		}
		return 'Other';
	}

	/* ---------------------------------------------------------------
	 * Guards and cleaners
	 * ------------------------------------------------------------- */

	/** At most 120 reports a minute from one connection (filter: om_insights_rate_limit). */
	private static function rate_ok() {
		$ip  = isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ) : ( isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '' );
		$key = 'om_ins_rl_' . substr( md5( $ip . '|' . gmdate( 'YmdHi' ) . '|' . wp_salt( 'nonce' ) ), 0, 16 );
		$n   = (int) get_transient( $key );
		if ( $n >= (int) apply_filters( 'om_insights_rate_limit', 120 ) ) {
			return false;
		}
		set_transient( $key, $n + 1, 2 * MINUTE_IN_SECONDS );
		return true;
	}

	public static function id( $value, $len ) {
		$value = is_string( $value ) ? $value : '';
		return preg_match( '/^[A-Za-z0-9]{' . (int) $len . '}$/', $value ) ? $value : '';
	}

	public static function cookie_id( $name ) {
		return isset( $_COOKIE[ $name ] ) ? self::id( (string) wp_unslash( $_COOKIE[ $name ] ), 12 ) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- validated by id().
	}

	/** A page as its path only: no address of another site, no query string. */
	public static function path( $value ) {
		$value = is_string( $value ) ? trim( $value ) : '';
		if ( preg_match( '#^https?://#i', $value ) ) {
			$host  = (string) wp_parse_url( $value, PHP_URL_HOST );
			$own   = (string) wp_parse_url( home_url(), PHP_URL_HOST );
			$value = 0 === strcasecmp( preg_replace( '/^www\./i', '', $host ), preg_replace( '/^www\./i', '', $own ) ) ? (string) wp_parse_url( $value, PHP_URL_PATH ) : '';
		}
		$value = preg_replace( '/[?#].*$/', '', $value );
		if ( '' === $value || '/' !== $value[0] ) {
			return '' === $value ? '' : '/' . substr( self::text( $value, 180 ), 0, 180 );
		}
		$value = preg_replace( '#/{2,}#', '/', $value );
		return substr( preg_replace( '/[\x00-\x1F\x7F<>"\'\s]/', '', $value ), 0, 190 );
	}

	/** A design: line|STYLE as the catalog names it. */
	public static function item( $value ) {
		$value = is_string( $value ) ? trim( $value ) : '';
		if ( ! preg_match( '#^([a-z0-9-]{1,40})\|([A-Za-z0-9][A-Za-z0-9./_~-]{0,44})$#', $value, $m ) ) {
			return '';
		}
		return $m[1] . '|' . strtoupper( $m[2] );
	}

	public static function text( $value, $len = 180 ) {
		$value = is_scalar( $value ) ? sanitize_text_field( (string) $value ) : '';
		return function_exists( 'mb_substr' ) ? mb_substr( $value, 0, $len ) : substr( $value, 0, $len );
	}

	public static function num( $value ) {
		$value = is_numeric( $value ) ? (float) $value : 0.0;
		return max( -999999999, min( 999999999, round( $value, 2 ) ) );
	}

	/* ---------------------------------------------------------------
	 * Housekeeping
	 * ------------------------------------------------------------- */

	public function ensure_cron() {
		if ( ! wp_next_scheduled( self::CRON ) ) {
			wp_schedule_event( strtotime( 'tomorrow 03:17' ), 'daily', self::CRON );
		}
	}

	public static function unschedule() {
		wp_clear_scheduled_hook( self::CRON );
	}

	/** Data older than the months kept goes, a few thousand rows at a time. */
	public function cleanup() {
		global $wpdb;
		$cutoff = wp_date( 'Y-m-d', strtotime( '-' . self::months() . ' months' ) );
		foreach ( array( self::events_table(), self::sessions_table() ) as $table ) {
			for ( $i = 0; $i < 50; $i++ ) {
				$n = $wpdb->query( $wpdb->prepare( "DELETE FROM {$table} WHERE day < %s LIMIT 5000", $cutoff ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
				if ( ! $n ) {
					break;
				}
			}
		}
	}

	/** Everything, gone (Insights > Settings). */
	public static function wipe() {
		global $wpdb;
		$wpdb->query( 'TRUNCATE TABLE ' . self::events_table() ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
		$wpdb->query( 'TRUNCATE TABLE ' . self::sessions_table() ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
	}
}
