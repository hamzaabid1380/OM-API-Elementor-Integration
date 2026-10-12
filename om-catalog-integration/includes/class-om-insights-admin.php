<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Insights in wp-admin: the page, its in-place updates and the bits of
 * Insights elsewhere in wp-admin (the inquiry screen, the Dashboard box).
 *
 * The page is a small app: the first load is rendered here in full (so it
 * also works without JavaScript); after that, sections, periods, filters,
 * visits and settings load in place through admin-ajax (om_ins_view,
 * om_ins_chart, om_ins_live, om_ins_save, om_ins_wipe), all behind the
 * om_ins nonce and the manage_options capability. OM_Insights_Report does
 * the reading and the HTML; OM_Insights_Pdf makes the PDF report
 * (admin-post om_ins_report, behind its own nonce).
 */
class OM_Insights_Admin {

	const SLUG = 'om-insights';

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'admin_menu', array( $this, 'menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'assets' ) );
		// Forms (used without JavaScript) and the downloads.
		add_action( 'admin_post_om_ins_settings', array( $this, 'save_settings' ) );
		add_action( 'admin_post_om_ins_wipe', array( $this, 'wipe' ) );
		add_action( 'admin_post_om_ins_csv', array( $this, 'csv' ) );
		add_action( 'admin_post_om_ins_report', array( $this, 'report' ) );
		// In-place updates.
		add_action( 'wp_ajax_om_ins_view', array( $this, 'ajax_view' ) );
		add_action( 'wp_ajax_om_ins_chart', array( $this, 'ajax_chart' ) );
		add_action( 'wp_ajax_om_ins_live', array( $this, 'ajax_live' ) );
		add_action( 'wp_ajax_om_ins_save', array( $this, 'ajax_save' ) );
		add_action( 'wp_ajax_om_ins_wipe', array( $this, 'ajax_wipe' ) );
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
		$keys = array();
		foreach ( OM_Insights_Report::preset_keys() as $range => $key ) {
			$keys[ strtolower( $key ) ] = $range;
		}
		wp_localize_script(
			'om-insights-admin',
			'omIns',
			array(
				'ajax'  => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'om_ins' ),
				'keys'  => $keys,
				'i18n'  => array(
					'saved'      => __( 'Saved', 'om-catalog' ),
					'notSaved'   => __( 'That didn\'t save. Please try again.', 'om-catalog' ),
					'failed'     => __( 'Couldn\'t load that. Please try again.', 'om-catalog' ),
					'copied'     => __( 'Copied', 'om-catalog' ),
					'deleted'    => __( 'All insights data deleted', 'om-catalog' ),
					/* translators: %s: time. */
					'updated'    => __( 'Updated %s', 'om-catalog' ),
					'previous'   => __( 'Period before', 'om-catalog' ),
					'thisPeriod' => __( 'This period', 'om-catalog' ),
					'soFar'      => __( 'so far', 'om-catalog' ),
					'noData'     => __( 'No data for this period.', 'om-catalog' ),
					'period'     => __( 'Period', 'om-catalog' ),
					/* translators: %s: percent. */
					'more'       => __( '%s more than the period before', 'om-catalog' ),
					/* translators: %s: percent. */
					'less'       => __( '%s less than the period before', 'om-catalog' ),
					'same'       => __( 'Same as the period before', 'om-catalog' ),
					'chartKeys'  => __( 'Use the left and right arrow keys to read each point.', 'om-catalog' ),
					'loading'    => __( 'Loading', 'om-catalog' ),
					'copyFailed' => __( 'Couldn\'t copy. Select the text and copy it yourself.', 'om-catalog' ),
					'typeDelete' => __( 'DELETE', 'om-catalog' ),
					/* translators: %d: seconds. */
					'dS'         => __( '%ds', 'om-catalog' ),
					/* translators: 1: minutes, 2: seconds. */
					'dM'         => __( '%1$dm %2$02ds', 'om-catalog' ),
					/* translators: 1: hours, 2: minutes. */
					'dH'         => __( '%1$dh %2$02dm', 'om-catalog' ),
					'making'     => __( 'Making your report…', 'om-catalog' ),
					'reportDone' => __( 'Report downloaded', 'om-catalog' ),
					'reportFail' => __( 'The report couldn\'t be made. Please try again.', 'om-catalog' ),
					'reportOld'  => __( 'This page has been open a long time. Reload it, then download the report again.', 'om-catalog' ),
				),
			)
		);
	}

	/* ---------------------------------------------------------------
	 * The page
	 * ------------------------------------------------------------- */

	private static function live_label( $n ) {
		/* translators: %s: number of people. */
		return sprintf( _n( '%s on the site now', '%s on the site now', $n, 'om-catalog' ), number_format_i18n( $n ) );
	}

	public function page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$r    = new OM_Insights_Report( $_GET ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only view; values are validated by the report.
		$live = $r->live_count();
		$tab  = $r->visit || $r->visitor ? 'journeys' : $r->tab;
		// phpcs:disable WordPress.Security.EscapeOutput -- icons are fixed markup; the rest is built escaped by the report.
		echo '<div class="wrap om-ins" data-om-ins-app data-om-ins-tab="' . esc_attr( $tab ) . '">';
		echo '<hr class="wp-header-end" />';
		echo '<header class="om-ins-top">';
		echo '<div class="om-ins-brand"><span class="om-ins-logo" aria-hidden="true">' . OM_Insights_Report::icon( 'logo' ) . '</span><h1>' . esc_html__( 'Insights', 'om-catalog' ) . '</h1>';
		echo '<a class="om-ins-livechip" href="' . esc_url( $r->url( array( 'tab' => 'live', 'visit' => null, 'visitor' => null, 'f' => null ) ) ) . '" data-om-ins-nav><span class="om-ins-dot' . ( $live ? ' on' : '' ) . '" aria-hidden="true"></span><span data-om-ins-livecount>' . esc_html( self::live_label( $live ) ) . '</span></a></div>';
		echo '<div class="om-ins-controls" data-om-ins-controls' . ( $r->scoped() ? '' : ' hidden' ) . '>';
		echo '<label class="om-ins-toggle" data-om-ins-comparewrap' . ( 'overview' === $tab && ! $r->visit && ! $r->visitor ? '' : ' hidden' ) . '><input type="checkbox" data-om-ins-compare checked /><span class="om-ins-toggle-ui" aria-hidden="true"></span><span>' . esc_html__( 'Compare', 'om-catalog' ) . '</span></label>';
		echo '<div class="om-ins-pickerwrap" data-om-ins-pickerwrap>' . $r->picker() . '</div>';
		echo '<div class="om-ins-reportwrap" data-om-ins-reportwrap>' . $r->report_button() . '</div>';
		echo '<a class="om-ins-iconbtn" href="' . esc_url( $r->url( array( 'refresh' => 1 ) ) ) . '" data-om-ins-refresh title="' . esc_attr__( 'Refresh the numbers', 'om-catalog' ) . '"><span class="screen-reader-text">' . esc_html__( 'Refresh the numbers', 'om-catalog' ) . '</span>' . OM_Insights_Report::icon( 'refresh' ) . '</a>';
		echo '</div></header>';
		echo '<div data-om-ins-navwrap>' . $r->nav() . '</div>';
		echo '<div class="om-ins-filterbar" data-om-ins-chips>' . ( $r->scoped() ? $r->chips() : '' ) . '</div>';
		echo '<div class="om-ins-banner" data-om-ins-offbanner' . ( OM_Insights::enabled() ? ' hidden' : '' ) . '>' . OM_Insights_Report::icon( 'info' ) . '<span>' . esc_html__( 'Collecting is switched off, so nothing new is recorded. Turn it on under Settings.', 'om-catalog' ) . '</span></div>';
		if ( isset( $_GET['saved'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display only.
			echo '<div class="om-ins-banner ok">' . OM_Insights_Report::icon( 'check' ) . '<span>' . esc_html__( 'Settings saved.', 'om-catalog' ) . '</span></div>';
		}
		echo '<main class="om-ins-view" data-om-ins-view>' . $r->render() . '</main>';
		// Side panel for one visit, the delete confirmation and messages.
		echo '<div class="om-ins-drawer" data-om-ins-drawer-root hidden><div class="om-ins-scrim" data-om-ins-close></div><div class="om-ins-sheet" role="dialog" aria-modal="true" aria-labelledby="om-ins-drawer-title" tabindex="-1"><button type="button" class="om-ins-iconbtn om-ins-sheet-x" data-om-ins-close><span class="screen-reader-text">' . esc_html__( 'Close', 'om-catalog' ) . '</span>' . OM_Insights_Report::icon( 'x' ) . '</button><div class="om-ins-sheet-body" data-om-ins-drawer-body></div></div></div>';
		echo '<dialog class="om-ins-modal" data-om-ins-wipe-dialog aria-labelledby="om-ins-wipe-title"><form method="dialog"><h2 id="om-ins-wipe-title">' . esc_html__( 'Delete all insights data?', 'om-catalog' ) . '</h2><p>' . esc_html__( 'Every visit and action recorded so far will be deleted. Inquiries and emails are not affected. This can\'t be undone.', 'om-catalog' ) . '</p><label>' . esc_html__( 'Type DELETE to confirm', 'om-catalog' ) . '<input type="text" autocomplete="off" data-om-ins-wipe-word /></label><div class="om-ins-modal-btns"><button value="cancel" class="om-ins-btn">' . esc_html__( 'Cancel', 'om-catalog' ) . '</button><button value="ok" class="om-ins-btn danger" data-om-ins-wipe-ok disabled>' . esc_html__( 'Delete everything', 'om-catalog' ) . '</button></div></form></dialog>';
		echo '<div class="om-ins-toasts" role="status" aria-live="polite" data-om-ins-toasts></div>';
		echo '</div>';
		// phpcs:enable
	}

	/* ---------------------------------------------------------------
	 * In-place updates
	 * ------------------------------------------------------------- */

	private function guard() {
		if ( ! check_ajax_referer( 'om_ins', 'nonce', false ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( null, 403 );
		}
	}

	/** A section, one visit (for the side panel) or the next page of journeys. */
	public function ajax_view() {
		$this->guard();
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- checked in guard(); values are validated by the report.
		$r    = new OM_Insights_Report( $_POST );
		$frag = isset( $_POST['frag'] ) ? sanitize_key( wp_unslash( $_POST['frag'] ) ) : '';
		// phpcs:enable
		if ( 'drawer' === $frag ) {
			$html = $r->visit ? $r->visit_view( $r->visit, true ) : ( $r->visitor ? $r->visitor_view( $r->visitor, true ) : '' );
			wp_send_json_success( array( 'html' => $html ) );
		}
		if ( 'rows' === $frag ) {
			list( $rows, $next ) = $r->journey_page();
			wp_send_json_success( array( 'html' => $rows, 'next' => $next ) );
		}
		$tab = $r->visit || $r->visitor ? 'journeys' : $r->tab;
		wp_send_json_success(
			array(
				'html'    => $r->render(),
				'nav'     => $r->nav(),
				'picker'  => $r->picker(),
				'report'  => $r->report_button(),
				'chips'   => $r->scoped() ? $r->chips() : '',
				'scoped'  => $r->scoped(),
				'tab'     => $tab,
				'compare' => 'overview' === $tab && ! $r->visit && ! $r->visitor,
			)
		);
	}

	/** The chart again, by another interval. */
	public function ajax_chart() {
		$this->guard();
		$r = new OM_Insights_Report( $_POST ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- checked in guard().
		wp_send_json_success( $r->chart_data() );
	}

	/** Who is on the site (the count in the header; the whole live view on the Live tab). */
	public function ajax_live() {
		$this->guard();
		$r     = new OM_Insights_Report( array() );
		$count = $r->live_count();
		$out   = array(
			'count' => $count,
			'label' => self::live_label( $count ),
		);
		if ( ! empty( $_POST['body'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing -- checked in guard().
			$out['html'] = $r->live_body();
		}
		wp_send_json_success( $out );
	}

	/** One setting, saved as soon as it changes. */
	public function ajax_save() {
		$this->guard();
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- checked in guard().
		$name  = isset( $_POST['name'] ) ? sanitize_key( wp_unslash( $_POST['name'] ) ) : '';
		$value = isset( $_POST['value'] ) ? sanitize_text_field( wp_unslash( $_POST['value'] ) ) : '';
		// phpcs:enable
		if ( in_array( $name, array( 'om_ins', 'om_ins_staff', 'om_ins_vid', 'om_ins_dnt', 'om_ins_journey' ), true ) ) {
			update_option( $name, '1' === $value ? '1' : '0' );
		} elseif ( 'om_ins_months' === $name && in_array( (int) $value, array( 3, 6, 13, 25, 37 ), true ) ) {
			update_option( 'om_ins_months', (string) (int) $value );
		} else {
			wp_send_json_error( null, 400 );
		}
		wp_send_json_success(
			array(
				'name'   => $name,
				'value'  => (string) get_option( $name ),
				'policy' => OM_Insights_Report::policy_text(),
			)
		);
	}

	public function ajax_wipe() {
		$this->guard();
		OM_Insights::wipe();
		self::forget_cache();
		wp_send_json_success();
	}

	/** Drop the dashboard's kept results (after deleting the data). */
	private static function forget_cache() {
		global $wpdb;
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '\\_transient\\_om\\_ins\\_c\\_%' OR option_name LIKE '\\_transient\\_timeout\\_om\\_ins\\_c\\_%'" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
	}

	/* ---------------------------------------------------------------
	 * Forms (without JavaScript) and downloads
	 * ------------------------------------------------------------- */

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
		self::forget_cache();
		wp_safe_redirect( add_query_arg( array( 'page' => self::SLUG, 'tab' => 'settings' ), admin_url( 'admin.php' ) ) );
		exit;
	}

	/** The PDF report for a period and its filters (see OM_Insights_Report::report_url()). */
	public function report() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'om_ins_report' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'om-catalog' ) );
		}
		require_once OM_CATALOG_DIR . 'includes/class-om-insights-pdf.php';
		OM_Insights_Pdf::send( $_GET ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- validated by the report.
	}

	/** Visits or actions for a period, as CSV (for a spreadsheet). */
	public function csv() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'om_ins_csv' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'om-catalog' ) );
		}
		$day  = static function ( $value ) {
			$value = sanitize_text_field( wp_unslash( (string) $value ) );
			return preg_match( '/^(\d{4})-(\d{2})-(\d{2})$/', $value, $m ) && checkdate( (int) $m[2], (int) $m[3], (int) $m[1] ) ? $value : '';
		};
		$what = isset( $_GET['what'] ) && 'events' === $_GET['what'] ? 'events' : 'visits';
		$from = isset( $_GET['from'] ) ? $day( $_GET['from'] ) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- validated by $day.
		$to   = isset( $_GET['to'] ) ? $day( $_GET['to'] ) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- validated by $day.
		$from = $from ? $from : wp_date( 'Y-m-d', time() - 29 * DAY_IN_SECONDS );
		$to   = $to ? $to : wp_date( 'Y-m-d' );
		nocache_headers();
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=insights-' . $what . '-' . $from . '-to-' . $to . '.csv' );
		$out  = fopen( 'php://output', 'w' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen
		$cell = static function ( $v ) {
			$v = (string) $v;
			return preg_match( '/^[=+\-@\t\r]/', $v ) ? "'" . $v : $v; // No spreadsheet formulas.
		};
		if ( 'events' === $what ) {
			$cols  = array( 'ts', 'day', 'sid', 'vid', 'type', 'page', 'item', 'label', 'meta', 'val', 'dur', 'scroll' );
			$table = OM_Insights::events_table();
		} else {
			$cols  = array( 'started', 'day', 'sid', 'vid', 'visit_no', 'is_new', 'channel', 'ref_host', 'utm_source', 'utm_medium', 'utm_campaign', 'landing', 'exit_page', 'device', 'browser', 'os', 'country', 'region', 'city', 'tz', 'pages', 'products', 'saves', 'engaged', 'leads', 'lead_type', 'lead_name' );
			$table = OM_Insights::sessions_table();
		}
		fputcsv( $out, array_merge( array( 'time' ), array_slice( $cols, 1 ) ), ',', '"', '' );
		$order = 'events' === $what ? 'ts, id' : 'started';
		global $wpdb;
		for ( $offset = 0; $offset < 2000000; $offset += 5000 ) {
			$rows = (array) $wpdb->get_results( $wpdb->prepare( 'SELECT ' . implode( ', ', $cols ) . " FROM {$table} WHERE day BETWEEN %s AND %s ORDER BY {$order} LIMIT 5000 OFFSET %d", $from, $to, $offset ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
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

	/* ---------------------------------------------------------------
	 * The visit behind an inquiry
	 * ------------------------------------------------------------- */

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
					$d       = OM_Insights::design( $key );
					$names[] = '' !== $d['url'] ? '<a href="' . esc_url( $d['url'] ) . '" target="_blank" rel="noopener">' . esc_html( $d['title'] ) . '</a>' : esc_html( $d['title'] );
				}
				$more   = count( $line[2] ) - 8;
				/* translators: %s: number of further designs. */
				$value .= ( '' !== $value ? '<br />' : '' ) . implode( ', ', $names ) . ( $more > 0 ? ' ' . esc_html( sprintf( __( 'and %s more', 'om-catalog' ), number_format_i18n( $more ) ) ) : '' );
			}
			echo '<div><dt>' . esc_html( $line[0] ) . '</dt><dd>' . $value . '</dd></div>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
		}
		echo '</dl>';
		echo '<details class="om-ins-steps"><summary>' . esc_html__( 'Everything they did on this visit, step by step', 'om-catalog' ) . '</summary>' . OM_Insights_Report::timeline( $j['events'] ) . '</details>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped.
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
		$v   = '' !== $sid ? OM_Insights_Report::visit_row_by_sid( $sid ) : array();
		if ( ! $v ) {
			echo '<span aria-hidden="true">&ndash;</span>';
			return;
		}
		echo '<a href="' . esc_url( add_query_arg( array( 'page' => self::SLUG, 'visit' => $sid ), admin_url( 'admin.php' ) ) ) . '">' . esc_html( OM_Insights_Report::channel_name( $v['channel'] ) ) . '</a>';
		$bits = array( OM_Insights_Report::device_one( $v['device'] ) );
		if ( (int) $v['visit_no'] > 1 ) {
			/* translators: %s: visit number. */
			$bits[] = sprintf( __( 'visit %s', 'om-catalog' ), number_format_i18n( (int) $v['visit_no'] ) );
		}
		echo '<br /><small>' . esc_html( implode( ' · ', $bits ) ) . '</small>';
	}

	/* ---------------------------------------------------------------
	 * WordPress Dashboard box
	 * ------------------------------------------------------------- */

	public function dashboard_widget() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		wp_add_dashboard_widget( 'om_ins_widget', __( 'Insights: last 7 days', 'om-catalog' ), array( $this, 'dashboard_widget_html' ) );
	}

	public function dashboard_widget_html() {
		$r = new OM_Insights_Report( array( 'range' => '7d' ) );
		list( $k, $b ) = $r->week_numbers();
		$tiles = array(
			array( __( 'Visitors', 'om-catalog' ), $k['visitors'], $b['visitors'] ),
			array( __( 'Designs viewed', 'om-catalog' ), $k['designs'], $b['designs'] ),
			array( __( 'Saved', 'om-catalog' ), $k['saves'], $b['saves'] ),
			array( __( 'Leads', 'om-catalog' ), $k['leads'], $b['leads'] ),
		);
		echo '<ul style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:0;">';
		foreach ( $tiles as $t ) {
			$delta = '';
			if ( $t[2] > 0 ) {
				$pct   = (int) round( 100 * ( $t[1] - $t[2] ) / $t[2] );
				$color = 0 === $pct ? '#646970' : ( $pct > 0 ? '#006300' : '#d03b3b' );
				$delta = '<span style="font-size:12px;font-weight:600;color:' . esc_attr( $color ) . ';">' . ( 0 === $pct ? '0%' : ( $pct > 0 ? '&#9650; ' : '&#9660; ' ) . esc_html( abs( $pct ) . '%' ) ) . '</span>';
			}
			echo '<li style="margin:0;padding:12px 14px;border:1px solid #e4e7ec;border-radius:10px;background:#fff;"><span style="display:block;color:#475467;font-size:12px;">' . esc_html( $t[0] ) . '</span><span style="display:flex;align-items:baseline;gap:8px;"><b style="font-size:22px;font-weight:600;color:#101828;">' . esc_html( number_format_i18n( $t[1] ) ) . '</b>' . $delta . '</span></li>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped.
		}
		echo '</ul><p style="margin:12px 0 0;"><a href="' . esc_url( admin_url( 'admin.php?page=' . self::SLUG ) ) . '">' . esc_html__( 'Open Insights', 'om-catalog' ) . ' &rarr;</a></p>';
	}
}
