<?php
/**
 * Visit requests and newsletter sign-ups from the kit's forms.
 * Each one is emailed to the shop and, when the OM Catalog plugin is active, handed to its
 * lead sending (GoHighLevel / webhook) through the om_lead action.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Booking {

	public static function init() {
		foreach ( array( 'wk_book', 'wk_news' ) as $a ) {
			add_action( 'wp_ajax_' . $a, array( __CLASS__, $a ) );
			add_action( 'wp_ajax_nopriv_' . $a, array( __CLASS__, $a ) );
		}
	}

	/** Basic guard: nonce, honeypot, a few requests per minute per visitor. */
	private static function guard() {
		if ( ! check_ajax_referer( 'wk_front', 'nonce', false ) ) {
			wp_send_json_error( array( 'msg' => __( 'Please refresh the page and try again.', 'wulf-kit' ) ), 403 );
		}
		if ( ! empty( $_POST['website'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			wp_send_json_success( array( 'ok' => 1 ) );
		}
		$ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		$key = 'wk_rl_' . md5( $ip );
		$n   = (int) get_transient( $key );
		if ( $n >= 6 ) {
			wp_send_json_error( array( 'msg' => __( 'Too many requests. Please call us instead.', 'wulf-kit' ) ), 429 );
		}
		set_transient( $key, $n + 1, MINUTE_IN_SECONDS );
	}

	private static function post( $k ) {
		return isset( $_POST[ $k ] ) ? sanitize_text_field( wp_unslash( $_POST[ $k ] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	}

	private static function shop_email() {
		$e = WK_Settings::get( 'email' );
		return is_email( $e ) ? $e : get_option( 'admin_email' );
	}

	public static function wk_book() {
		self::guard();
		$d = array(
			'name'   => self::post( 'name' ),
			'phone'  => self::post( 'phone' ),
			'email'  => sanitize_email( self::post( 'email' ) ),
			'pref'   => self::post( 'pref' ),
			'day'    => self::post( 'day' ),
			'time'   => self::post( 'time' ),
			'note'   => isset( $_POST['note'] ) ? sanitize_textarea_field( wp_unslash( $_POST['note'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'topics' => array_filter( array_map( 'sanitize_text_field', (array) wp_unslash( $_POST['topics'] ?? array() ) ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'tray'   => array_filter( array_map( 'sanitize_text_field', (array) wp_unslash( $_POST['tray'] ?? array() ) ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'page'   => esc_url_raw( self::post( 'page' ) ),
		);
		if ( strlen( $d['name'] ) < 2 || strlen( preg_replace( '/\D/', '', $d['phone'] ) ) < 10 ) {
			wp_send_json_error( array( 'msg' => __( 'Please add your name and a 10-digit phone number.', 'wulf-kit' ) ), 400 );
		}

		$rows = array(
			__( 'Name', 'wulf-kit' )             => $d['name'],
			__( 'Phone', 'wulf-kit' )            => $d['phone'],
			__( 'Email', 'wulf-kit' )            => $d['email'],
			__( 'Best way to reach', 'wulf-kit' ) => $d['pref'],
			__( 'Preferred day', 'wulf-kit' )    => trim( $d['day'] . ( $d['time'] ? ' (' . $d['time'] . ')' : '' ) ),
			__( 'Talk about', 'wulf-kit' )       => implode( ', ', $d['topics'] ),
			__( 'Pieces on their tray', 'wulf-kit' ) => implode( '; ', $d['tray'] ),
			__( 'Notes', 'wulf-kit' )            => $d['note'],
			__( 'Page', 'wulf-kit' )             => $d['page'],
		);
		/* translators: %s: visitor name */
		$subject = sprintf( __( 'Visit request from %s', 'wulf-kit' ), $d['name'] );
		self::mail( $subject, $rows, $d['email'], $d['name'] );

		$message = '';
		foreach ( $rows as $k => $v ) {
			if ( '' !== $v && __( 'Name', 'wulf-kit' ) !== $k && __( 'Phone', 'wulf-kit' ) !== $k && __( 'Email', 'wulf-kit' ) !== $k ) {
				$message .= $k . ': ' . $v . "\n";
			}
		}
		self::to_crm( array(
			'event'   => 'inquiry',
			'name'    => $d['name'],
			'email'   => $d['email'],
			'phone'   => $d['phone'],
			'subject' => __( 'Visit request', 'wulf-kit' ),
			'message' => trim( $message ),
			'piece'   => implode( '; ', $d['tray'] ),
			'page'    => $d['page'],
		) );
		do_action( 'wk_booking', $d );
		wp_send_json_success( array( 'ok' => 1 ) );
	}

	public static function wk_news() {
		self::guard();
		$email = sanitize_email( self::post( 'email' ) );
		if ( ! is_email( $email ) ) {
			wp_send_json_error( array( 'msg' => __( 'Please enter a valid email address.', 'wulf-kit' ) ), 400 );
		}
		self::mail( __( 'New newsletter sign-up', 'wulf-kit' ), array( __( 'Email', 'wulf-kit' ) => $email, __( 'Page', 'wulf-kit' ) => esc_url_raw( self::post( 'page' ) ) ), $email, '' );
		self::to_crm( array( 'event' => 'inquiry', 'name' => '', 'email' => $email, 'phone' => '', 'subject' => __( 'Newsletter sign-up', 'wulf-kit' ), 'message' => __( 'Signed up for the newsletter.', 'wulf-kit' ), 'page' => esc_url_raw( self::post( 'page' ) ) ) );
		do_action( 'wk_newsletter', $email );
		wp_send_json_success( array( 'ok' => 1 ) );
	}

	private static function mail( $subject, $rows, $reply_email, $reply_name ) {
		$html = '<table cellpadding="6" style="border-collapse:collapse;font:15px/1.5 Arial,sans-serif">';
		foreach ( $rows as $k => $v ) {
			if ( '' === (string) $v ) {
				continue;
			}
			$html .= '<tr><td style="color:#5a5f67;vertical-align:top"><b>' . esc_html( $k ) . '</b></td><td>' . nl2br( esc_html( $v ) ) . '</td></tr>';
		}
		$html   .= '</table>';
		$headers = array( 'Content-Type: text/html; charset=UTF-8' );
		if ( is_email( $reply_email ) ) {
			$headers[] = 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', ',', '"' ), '', $reply_name ) . ' <' . $reply_email . '>';
		}
		wp_mail( self::shop_email(), '[' . wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ) . '] ' . $subject, $html, $headers );
	}

	private static function to_crm( $lead ) {
		if ( WK_Settings::get( 'to_om_leads' ) && has_action( 'om_lead' ) ) {
			do_action( 'om_lead', $lead );
		}
	}
}
