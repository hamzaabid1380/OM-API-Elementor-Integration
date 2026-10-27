<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Watches the emails this site sends. When WordPress can't send one (no mail server on the host,
 * a wrong SMTP password), admins see it in wp-admin: how many failed, the last error, a way to send
 * a test, and the usual fix. Every request from the site is also kept under Inquiries, so nothing
 * is lost meanwhile; an inquiry whose email to the shop didn't go is marked "Not emailed".
 *
 * Only failures WordPress itself reports are seen. An email the host accepts and then drops, or one
 * that lands in spam, looks sent from here.
 */
class OM_Mail_Watch {

	/** The last 20 failures: when, subject and error (no addresses). */
	const LOG = 'om_mail_fails';

	/** When an email last went. */
	const OK = 'om_mail_ok';

	/** The notice was dismissed up to this failure. */
	const SEEN = 'om_mail_seen';

	/** On an inquiry: why its email to the shop didn't go. */
	const META = '_om_mail_failed';

	private static $instance = null;

	/** The inquiry the email being sent is about (0: none). */
	private static $about = 0;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_mail_failed', array( $this, 'failed' ) );
		add_action( 'wp_mail_succeeded', array( $this, 'succeeded' ) );
		add_action( 'admin_notices', array( $this, 'notice' ) );
		add_action( 'admin_post_om_mail_seen', array( $this, 'dismiss' ) );
		add_action( 'admin_post_om_mail_test', array( $this, 'test' ) );
		// The Wulf kit's email about a request kept under Inquiries.
		add_action( 'wk_request_mailed', array( $this, 'kit_mailed' ), 10, 2 );
	}

	/** The emails sent from now on are about this inquiry (0: none). */
	public static function about( $id ) {
		self::$about = (int) $id;
	}

	/** WordPress couldn't send an email. */
	public function failed( $error ) {
		if ( ! is_wp_error( $error ) ) {
			return;
		}
		$data  = (array) $error->get_error_data();
		$log   = get_option( self::LOG, array() );
		$log   = is_array( $log ) ? $log : array();
		$why   = mb_substr( trim( wp_strip_all_tags( $error->get_error_message() ) ), 0, 300 );
		$log[] = array(
			't'       => time(),
			'subject' => mb_substr( wp_strip_all_tags( (string) ( $data['subject'] ?? '' ) ), 0, 200 ),
			'error'   => '' !== $why ? $why : __( 'No reason given.', 'om-catalog' ),
		);
		update_option( self::LOG, array_slice( $log, -20 ), false );
		if ( self::$about ) {
			update_post_meta( self::$about, self::META, $why );
		}
	}

	public function succeeded() {
		update_option( self::OK, time(), false );
	}

	/** The kit's email about a request it kept here (see the wk_save_request filter). */
	public function kit_mailed( $id, $sent ) {
		self::$about = 0;
		if ( $id && ! $sent && '' === (string) get_post_meta( (int) $id, self::META, true ) ) {
			update_post_meta( (int) $id, self::META, __( 'The email didn\'t send.', 'om-catalog' ) );
		}
	}

	/** Failures in the last 7 days, oldest first. */
	public static function recent() {
		$log  = get_option( self::LOG, array() );
		$from = time() - 7 * DAY_IN_SECONDS;
		return array_values(
			array_filter(
				is_array( $log ) ? $log : array(),
				static function ( $f ) use ( $from ) {
					return is_array( $f ) && (int) ( $f['t'] ?? 0 ) >= $from;
				}
			)
		);
	}

	private static function when( $t ) {
		/* translators: 1: date, 2: time. */
		return sprintf( __( '%1$s at %2$s', 'om-catalog' ), wp_date( 'M j', $t ), wp_date( 'g:i a', $t ) );
	}

	private static function button( $action, $label, $primary = false ) {
		$url = wp_nonce_url( add_query_arg( 'action', $action, admin_url( 'admin-post.php' ) ), $action );
		return '<a class="button' . ( $primary ? ' button-primary' : '' ) . '" href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a>';
	}

	public function notice() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- display only.
		$test = isset( $_GET['om_mail_test'] ) ? sanitize_key( wp_unslash( $_GET['om_mail_test'] ) ) : '';
		// phpcs:enable
		if ( 'sent' === $test ) {
			/* translators: %s: email address. */
			echo '<div class="notice notice-success is-dismissible"><p>' . esc_html( sprintf( __( 'A test email went to %s. Check that it arrived, and that it isn\'t in spam.', 'om-catalog' ), OM_Emails::shop_address() ) ) . '</p></div>';
		} elseif ( 'failed' === $test ) {
			$fails = self::recent();
			$last  = $fails ? end( $fails ) : null;
			/* translators: %s: the error. */
			echo '<div class="notice notice-error"><p>' . esc_html( sprintf( __( 'The test email didn\'t send: %s', 'om-catalog' ), $last ? $last['error'] : __( 'No reason given.', 'om-catalog' ) ) ) . '</p></div>';
		}

		// An inquiry whose email to the shop didn't go.
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( $screen && 'post' === $screen->base && OM_Inquiry::POST_TYPE === $screen->post_type ) {
			$post_id = isset( $_GET['post'] ) ? absint( $_GET['post'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display only.
			$why     = $post_id ? (string) get_post_meta( $post_id, self::META, true ) : '';
			if ( '' !== $why ) {
				/* translators: %s: the error. */
				echo '<div class="notice notice-warning"><p>' . esc_html( sprintf( __( 'This inquiry wasn\'t emailed to the shop: %s It is kept here, so reply from the details below.', 'om-catalog' ), rtrim( $why, '.' ) . '.' ) ) . '</p></div>';
			}
		}

		$fails = self::recent();
		if ( ! $fails || 'sent' === $test ) {
			return;
		}
		$last = end( $fails );
		if ( (int) $last['t'] <= (int) get_option( self::SEEN, 0 ) ) {
			return;
		}
		$count   = count( $fails );
		$fixed   = (int) get_option( self::OK, 0 ) > (int) $last['t'];
		$what    = '' !== $last['subject'] ? sprintf( '"%s"', $last['subject'] ) : __( 'an email', 'om-catalog' );
		$inq     = '<a class="button button-primary" href="' . esc_url( admin_url( 'edit.php?post_type=' . OM_Inquiry::POST_TYPE ) ) . '">' . esc_html__( 'See inquiries', 'om-catalog' ) . '</a>';
		$dismiss = self::button( 'om_mail_seen', __( 'Dismiss', 'om-catalog' ) );
		echo '<div class="notice ' . ( $fixed ? 'notice-warning' : 'notice-error' ) . ' om-mail-watch">';
		if ( $fixed ) {
			/* translators: %s: number of emails. */
			echo '<p><strong>' . esc_html( sprintf( _n( '%s email from this site didn\'t send in the last 7 days.', '%s emails from this site didn\'t send in the last 7 days.', $count, 'om-catalog' ), number_format_i18n( $count ) ) ) . '</strong> ';
			/* translators: 1: date and time, 2: email subject. */
			echo esc_html( sprintf( __( 'The last was on %1$s (%2$s). Emails have gone since, so it may be fixed. Inquiries that weren\'t emailed are marked "Not emailed".', 'om-catalog' ), self::when( (int) $last['t'] ), $what ) ) . '</p>';
		} else {
			echo '<p><strong>' . esc_html__( 'Emails from this site aren\'t sending.', 'om-catalog' ) . '</strong> ';
			/* translators: 1: number of emails, 2: date and time, 3: email subject, 4: the error. */
			echo esc_html( sprintf( _n( '%1$s failed in the last 7 days, on %2$s (%3$s): %4$s', '%1$s failed in the last 7 days, most recently on %2$s (%3$s): %4$s', $count, 'om-catalog' ), number_format_i18n( $count ), self::when( (int) $last['t'] ), $what, rtrim( $last['error'], '.' ) . '.' ) ) . '</p>';
			echo '<p>' . esc_html__( 'Requests from the website are still kept under Inquiries, so none are lost, but you won\'t get them by email until this is fixed. The usual fix is an SMTP plugin, such as WP Mail SMTP, connected to the shop\'s Google or Microsoft email account. Then send a test.', 'om-catalog' ) . '</p>';
		}
		echo '<p style="display:flex;gap:8px;flex-wrap:wrap">' . $inq . self::button( 'om_mail_test', __( 'Send a test email', 'om-catalog' ) ) . $dismiss . '</p></div>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped.
	}

	private static function back( $args = array() ) {
		$to = wp_get_referer();
		$to = $to ? remove_query_arg( 'om_mail_test', $to ) : admin_url();
		wp_safe_redirect( add_query_arg( $args, $to ) );
		exit;
	}

	public function dismiss() {
		check_admin_referer( 'om_mail_seen' );
		if ( current_user_can( 'manage_options' ) ) {
			$fails = self::recent();
			update_option( self::SEEN, $fails ? (int) end( $fails )['t'] : time(), false );
		}
		self::back();
	}

	/** A plain test email to the shop's address (Settings › Inquiries). */
	public function test() {
		check_admin_referer( 'om_mail_test' );
		if ( ! current_user_can( 'manage_options' ) ) {
			self::back();
		}
		$site = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		/* translators: %s: site name. */
		$sent = wp_mail( OM_Emails::shop_address(), sprintf( __( 'Test email from %s', 'om-catalog' ), $site ), __( 'If you can read this, the website\'s emails are reaching you. Inquiries and visit requests are emailed to this address.', 'om-catalog' ) );
		self::back( array( 'om_mail_test' => $sent ? 'sent' : 'failed' ) );
	}
}
