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
		foreach ( array( 'wk_book', 'wk_news', 'wk_quiz' ) as $a ) {
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
			'piece'  => self::post( 'piece' ),
			'source' => self::post( 'source' ),
			'quiz'   => self::post( 'answers' ),
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
			__( 'Looking at', 'wulf-kit' )       => $d['piece'],
			__( 'Pieces on their tray', 'wulf-kit' ) => implode( '; ', $d['tray'] ),
			__( 'Ring style quiz', 'wulf-kit' )  => $d['quiz'],
			__( 'Notes', 'wulf-kit' )            => $d['note'],
			__( 'Page', 'wulf-kit' )             => $d['page'],
			__( 'Booked from', 'wulf-kit' )      => $d['source'],
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
			'piece'   => implode( '; ', array_filter( array_merge( array( $d['piece'] ), $d['tray'] ) ) ),
			'page'    => $d['page'],
		) );
		do_action( 'wk_booking', $d );
		wp_send_json_success( array( 'ok' => 1 ) );
	}

	/**
	 * "Email me my matches" from the ring style quiz. Everything in the email comes from the quiz
	 * as saved on the page (the visitor only sends their address and which answers and rings),
	 * so the form can't be used to send other text or links.
	 */
	public static function wk_quiz() {
		self::guard();
		$email = sanitize_email( self::post( 'email' ) );
		if ( ! is_email( $email ) ) {
			wp_send_json_error( array( 'msg' => __( 'Please enter a valid email address.', 'wulf-kit' ) ), 400 );
		}
		// The same address gets its matches a few times a day at most.
		$rk = 'wk_qz_' . md5( strtolower( $email ) );
		$rn = (int) get_transient( $rk );
		if ( $rn >= 3 ) {
			wp_send_json_error( array( 'msg' => __( 'We\'ve already sent your matches to this address today. Please check your inbox.', 'wulf-kit' ) ), 429 );
		}
		$w = self::quiz_widget( absint( self::post( 'doc' ) ), self::post( 'wid' ) );
		if ( ! $w ) {
			wp_send_json_error( array( 'msg' => __( 'Please refresh the page and try again.', 'wulf-kit' ) ), 400 );
		}
		$d     = $w->quiz_data();
		$picks = array();
		foreach ( (array) wp_unslash( $_POST['picks'] ?? array() ) as $i ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			$i = is_scalar( $i ) && ctype_digit( (string) $i ) ? (int) $i : -1;
			if ( $i >= 0 && isset( $d['rings'][ $i ] ) && ! in_array( $i, $picks, true ) && count( $picks ) < 3 ) {
				$picks[] = $i;
			}
		}
		if ( ! $picks ) {
			wp_send_json_error( array( 'msg' => __( 'Please refresh the page and try again.', 'wulf-kit' ) ), 400 );
		}
		// Answers, as the quiz's own words.
		$names  = WK_Quiz_Widget::metal_names();
		$shapes = WK_Quiz_Widget::shape_names();
		$shape  = self::post( 'shape' );
		$shape  = in_array( $shape, $d['shapes'], true ) ? $shape : '';
		$metal  = self::post( 'metal' );
		$metal  = isset( $names[ $metal ] ) ? $metal : '';
		$st     = self::post( 'style' );
		$style  = '' !== $st && isset( $d['styles'][ (int) $st ] ) ? $d['styles'][ (int) $st ]['n'] : '';
		$bu     = self::post( 'budget' );
		$budget = '' !== $bu && isset( $d['budgets'][ (int) $bu ] ) ? $d['budgets'][ (int) $bu ] : '';
		$answers = array(
			__( 'Diamond shape', 'wulf-kit' ) => $shape ? $shapes[ $shape ] : __( 'Not sure yet', 'wulf-kit' ),
			__( 'Setting', 'wulf-kit' )       => $style ? $style : __( 'A mix of styles', 'wulf-kit' ),
			__( 'Metal', 'wulf-kit' )         => $metal ? $names[ $metal ] : __( 'Not sure yet', 'wulf-kit' ),
			__( 'Budget', 'wulf-kit' )        => $budget ? $budget : __( 'Not sure yet', 'wulf-kit' ),
		);
		$rings = array();
		foreach ( $picks as $i ) {
			$r  = $d['rings'][ $i ];
			$m  = $metal && isset( $r['media'][ $metal ] ) ? $metal : $r['m'];
			$rings[] = array(
				'n'   => $r['n'],
				'id'  => $r['id'],
				'p'   => $r['p'],
				'u'   => $r['u'],
				'img' => ! empty( $r['media'][ $m ]['poster'] ) ? $r['media'][ $m ]['poster'] : $r['img'],
				'm'   => $names[ $m ] ?? '',
			);
		}
		$page = esc_url_raw( self::post( 'page' ) );
		$book = WK_Settings::get( 'book_url' );
		if ( ! $book || '#' === substr( $book, 0, 1 ) ) {
			$here = get_permalink( absint( self::post( 'doc' ) ) );
			$book = WK_Settings::get( 'book_panel' ) && $here ? add_query_arg( array( 'book' => 1, 'topic' => rawurlencode( 'Engagement ring' ) ), $here ) : ( class_exists( 'WK_Pages' ) ? WK_Pages::url( 'contact-us', home_url( '/' ) ) . '#visit' : home_url( '/' ) );
		}

		// To the visitor: their three rings, their answers and a way to book.
		$shop = WK_Settings::get( 'name' ) ? WK_Settings::get( 'name' ) : wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		/* translators: %s: store name */
		$subject = sprintf( __( 'Your ring style matches from %s', 'wulf-kit' ), $shop );
		$sent    = wp_mail( $email, $subject, self::quiz_mail( $rings, $answers, $book, $shop ), array( 'Content-Type: text/html; charset=UTF-8', 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', ',', '"' ), '', $shop ) . ' <' . self::shop_email() . '>' ) );
		set_transient( $rk, $rn + 1, DAY_IN_SECONDS );

		// To the shop: who asked and what they chose.
		$list = implode( '; ', array_map( static function ( $r ) { return $r['n'] . ( $r['id'] ? ' (style ' . $r['id'] . ', ' . $r['m'] . ')' : '' ); }, $rings ) );
		$rows = array( __( 'Email', 'wulf-kit' ) => $email );
		foreach ( $answers as $k => $v ) {
			$rows[ $k ] = $v;
		}
		$rows[ __( 'Their matches', 'wulf-kit' ) ] = $list;
		$rows[ __( 'Page', 'wulf-kit' ) ]          = $page;
		/* translators: %s: visitor email */
		self::mail( sprintf( __( 'Ring style quiz: matches sent to %s', 'wulf-kit' ), $email ), $rows, $email, '' );
		$message = '';
		foreach ( $answers as $k => $v ) {
			$message .= $k . ': ' . $v . "\n";
		}
		self::to_crm( array(
			'event'   => 'inquiry',
			'name'    => '',
			'email'   => $email,
			'phone'   => '',
			'subject' => __( 'Ring style quiz', 'wulf-kit' ),
			'message' => trim( $message . __( 'Their matches', 'wulf-kit' ) . ': ' . $list ),
			'piece'   => $list,
			'page'    => $page,
		) );
		do_action( 'wk_quiz', array( 'email' => $email, 'answers' => $answers, 'rings' => $rings, 'page' => $page ) );
		if ( ! $sent ) {
			wp_send_json_error( array( 'msg' => __( 'Sorry, that email didn\'t send. Please call us instead.', 'wulf-kit' ) ), 500 );
		}
		wp_send_json_success( array( 'ok' => 1 ) );
	}

	/** The quiz as saved on its page (published pages only). */
	private static function quiz_widget( $doc_id, $wid ) {
		$wid = preg_replace( '/[^a-z0-9]/i', '', (string) $wid );
		if ( ! $doc_id || ! $wid || ! class_exists( '\Elementor\Plugin' ) || 'publish' !== get_post_status( $doc_id ) || post_password_required( $doc_id ) ) {
			return null;
		}
		$doc = \Elementor\Plugin::$instance->documents->get( $doc_id );
		$el  = $doc ? self::find_element( (array) $doc->get_elements_data(), $wid ) : null;
		if ( ! $el || 'wk-quiz' !== ( $el['widgetType'] ?? '' ) ) {
			return null;
		}
		$w = \Elementor\Plugin::$instance->elements_manager->create_element_instance( $el );
		return $w instanceof WK_Quiz_Widget ? $w : null;
	}

	private static function find_element( $els, $id ) {
		foreach ( $els as $el ) {
			if ( isset( $el['id'] ) && (string) $el['id'] === $id ) {
				return $el;
			}
			if ( ! empty( $el['elements'] ) ) {
				$f = self::find_element( $el['elements'], $id );
				if ( $f ) {
					return $f;
				}
			}
		}
		return null;
	}

	/** A simple, phone-friendly email: three rings, the answers, one button. */
	private static function quiz_mail( $rings, $answers, $book, $shop ) {
		$s     = WK_Settings::all();
		$ink   = '#0f1217';
		$sub   = '#5a5f67';
		$gold  = $s['c_gold'] ? $s['c_gold'] : '#c9a96e';
		$h  = '<div style="background:#f7f5f1;padding:24px 12px;font:16px/1.5 Arial,Helvetica,sans-serif;color:' . $ink . '"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden">';
		$h .= '<div style="padding:28px 28px 8px"><p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:' . $sub . '">' . esc_html__( 'Ring style quiz', 'wulf-kit' ) . '</p>';
		$h .= '<h1 style="margin:0 0 10px;font:400 26px/1.25 Georgia,\'Times New Roman\',serif;color:' . $ink . '">' . esc_html__( 'Your three ring matches', 'wulf-kit' ) . '</h1>';
		$h .= '<p style="margin:0;color:' . $sub . '">' . esc_html( implode( ' · ', array_values( $answers ) ) ) . '</p></div>';
		foreach ( $rings as $i => $r ) {
			$h .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tr><td style="padding:16px 28px;border-top:' . ( $i ? '1px solid #eceae5' : '0' ) . '">';
			$h .= '<table role="presentation" cellpadding="0" cellspacing="0"><tr>';
			$h .= '<td width="120" valign="middle" style="padding-right:16px"><a href="' . esc_url( $r['u'] ) . '"><img src="' . esc_url( $r['img'] ) . '" width="120" height="120" alt="' . esc_attr( $r['n'] ) . '" style="display:block;border:1px solid #eceae5;border-radius:10px;background:#fff"></a></td>';
			$h .= '<td valign="middle"><p style="margin:0 0 4px;font-size:12px;color:' . $sub . '">' . esc_html( 0 === $i ? __( 'Your top match', 'wulf-kit' ) : __( 'Also a match for you', 'wulf-kit' ) ) . '</p>';
			$h .= '<p style="margin:0 0 4px;font-weight:bold;color:' . $ink . '">' . esc_html( $r['n'] ) . '</p>';
			/* translators: %s: price */
			$h .= '<p style="margin:0 0 8px;font-size:14px;color:' . $sub . '">' . esc_html( implode( ' · ', array_filter( array( $r['m'], $r['p'] ? sprintf( __( 'Setting from %s', 'wulf-kit' ), $r['p'] ) : '', $r['id'] ? sprintf( __( 'Style %s', 'wulf-kit' ), $r['id'] ) : '' ) ) ) ) . '</p>';
			$h .= $r['u'] ? '<a href="' . esc_url( $r['u'] ) . '" style="font-size:14px;font-weight:bold;color:' . $ink . '">' . esc_html__( 'See it in the catalog', 'wulf-kit' ) . '</a>' : '';
			$h .= '</td></tr></table></td></tr></table>';
		}
		$h .= '<div style="padding:12px 28px 28px;text-align:center"><a href="' . esc_url( $book ) . '" style="display:inline-block;padding:14px 26px;border-radius:999px;background:' . esc_attr( $gold ) . ';color:' . $ink . ';font-weight:bold;text-decoration:none">' . esc_html__( 'Book to try these on', 'wulf-kit' ) . '</a>';
		$h .= '<p style="margin:14px 0 0;font-size:14px;color:' . $sub . '">' . esc_html__( 'Free and no obligation. We\'ll set them out for your visit.', 'wulf-kit' ) . '</p></div>';
		$foot = array_filter( array( $shop, $s['address'], $s['phone'] ) );
		$h .= '</div><p style="max-width:560px;margin:14px auto 0;text-align:center;font-size:13px;color:' . $sub . '">' . esc_html( implode( ' · ', $foot ) ) . '</p></div>';
		return $h;
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
