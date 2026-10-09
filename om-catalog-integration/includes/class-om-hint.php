<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * "Drop a hint": from a product page, the quick view or the Saved panel, a
 * visitor sends a design (or a few) to a partner or friend. The partner gets
 * a branded email with the photos, the visitor's note and ring size, and a
 * private page (/?om_hint=…) to see the designs and book a viewing. The shop
 * gets a copy (kept under Inquiries) and a short note when the hint is first
 * opened. Only the sender goes to the CRM; the partner's address is used
 * for this one email and not kept.
 *
 * Everything in the emails comes from the catalog (the browser only says
 * which designs) and notes can't carry links, so the form can't be used to
 * send strangers anything else. Spam checks as for inquiries: a signed time
 * stamp (fetched when the form opens, so cached pages are fine), a honeypot
 * and rate limits per connection, sender and recipient.
 */
class OM_Hint {

	/** Most designs one hint carries. */
	const MAX_ITEMS = 6;

	/** Longest note, in characters. */
	const NOTE_MAX = 300;

	/** How long a hint's page works, in days. */
	const DAYS = 365;

	/** Inquiry meta: sha256 of the page token, and the hint itself. */
	const KEY_META  = '_om_hint_key';
	const DATA_META = '_om_hint';

	private static $instance = null;

	/** The hint for this request: false = not looked up yet. */
	private $current = false;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		foreach ( array( 'om_hint_stamp' => 'handle_stamp', 'om_hint_send' => 'handle_send', 'om_hint_seen' => 'handle_seen' ) as $action => $method ) {
			add_action( 'wp_ajax_' . $action, array( $this, $method ) );
			add_action( 'wp_ajax_nopriv_' . $action, array( $this, $method ) );
		}
		// The private page.
		add_filter( 'query_vars', array( $this, 'query_vars' ) );
		add_action( 'parse_query', array( $this, 'mark_query' ) );
		add_filter( 'posts_pre_query', array( $this, 'skip_posts_query' ), 10, 2 );
		add_filter( 'pre_handle_404', array( $this, 'handle_status' ), 10, 2 );
		add_filter( 'pre_get_document_title', array( $this, 'document_title' ), 99 );
		add_filter( 'wp_robots', array( $this, 'robots' ) );
		add_action( 'template_redirect', array( $this, 'no_cache' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ), 20 );
		add_filter( 'template_include', array( $this, 'template' ), 99 );
	}

	/** Settings › OM Catalog › Look & feel: "Drop a hint". */
	public static function enabled() {
		return '0' !== get_option( 'om_hint', '1' );
	}

	public static function label() {
		$label = trim( (string) get_option( 'om_hint_label', '' ) );
		return '' !== $label ? $label : __( 'Drop a hint', 'om-catalog' );
	}

	/** The line under the buttons on the hint page. */
	public static function promise() {
		$line = get_option( 'om_hint_promise', null );
		return null === $line ? __( 'Free, no obligation, and we will keep it between us.', 'om-catalog' ) : trim( (string) $line );
	}

	/** Ring sizes offered (as on product pages): 3 to 13 in half sizes. */
	public static function sizes() {
		$out = array();
		for ( $size = 3; $size <= 13; $size += 0.5 ) {
			$out[] = (string) $size;
		}
		return $out;
	}

	/** Note ideas the visitor can tap. */
	public static function chips() {
		return array(
			__( 'I keep coming back to this one.', 'om-catalog' ),
			__( 'Just in case you were wondering what I would love.', 'om-catalog' ),
			__( 'No pressure, but this is the one.', 'om-catalog' ),
		);
	}

	/**
	 * The "Drop a hint" line for one design (product pages and the quick
	 * view). The script adds the metal, colour and ring size chosen on the
	 * page when it is clicked.
	 */
	public static function button( $line, $style, $title = '', $image = '' ) {
		if ( ! self::enabled() || '' === (string) $line || '' === (string) $style ) {
			return '';
		}
		$item = array( 'l' => (string) $line, 's' => (string) $style, 't' => (string) $title, 'i' => (string) $image );
		return '<p class="om-hint-line"><button type="button" class="om-hint-btn" data-om-hint="' . esc_attr( wp_json_encode( array( 'items' => array( $item ) ) ) ) . '" aria-haspopup="dialog"><span class="om-hint-icon" aria-hidden="true"></span><span class="om-hint-btn-text">' . esc_html( self::label() ) . '</span></button><span class="om-hint-sub">' . esc_html__( 'Send it to someone special', 'om-catalog' ) . '</span></p>';
	}

	/* ---------------------------------------------------------------
	 * Sending
	 * ------------------------------------------------------------- */

	private static function stamp() {
		$t = (string) time();
		return $t . '.' . substr( hash_hmac( 'sha256', $t, wp_salt( 'nonce' ) . '|om_hint' ), 0, 16 );
	}

	private static function stamp_age( $stamp ) {
		$parts = explode( '.', (string) $stamp );
		if ( 2 !== count( $parts ) || ! ctype_digit( $parts[0] ) || ! hash_equals( substr( hash_hmac( 'sha256', $parts[0], wp_salt( 'nonce' ) . '|om_hint' ), 0, 16 ), $parts[1] ) ) {
			return -1;
		}
		return time() - (int) $parts[0];
	}

	/** A fresh time stamp when the form opens (pages may be cached). */
	public function handle_stamp() {
		nocache_headers();
		wp_send_json_success( array( 't' => self::stamp() ) );
	}

	/** Web addresses, in any common form. */
	private static function has_link( $text ) {
		return (bool) preg_match( '~(https?:|www\.|\b[a-z0-9-]{2,}\.(?:com|net|org|info|biz|io|co|us|uk|ca|ru|cn|xyz|top|site|online|shop|store|link|click|live|app|me|ly|gl)\b)~i', (string) $text );
	}

	private static function fail( $message, $code = 400 ) {
		wp_send_json_error( array( 'message' => $message ), $code );
	}

	public function handle_send() {
		nocache_headers();
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public form; see the class doc for its spam checks.
		$text = static function ( $key, $max ) {
			return isset( $_POST[ $key ] ) && is_scalar( $_POST[ $key ] ) ? trim( mb_substr( sanitize_text_field( wp_unslash( $_POST[ $key ] ) ), 0, $max ) ) : '';
		};
		$sent_ok = __( 'Your hint is on its way.', 'om-catalog' );
		if ( ! self::enabled() ) {
			self::fail( __( 'Something went wrong. Please try again.', 'om-catalog' ) );
		}
		// Honeypot filled or sent faster than a person could: pretend it worked.
		$age = self::stamp_age( $text( 't', 80 ) );
		if ( '' !== $text( 'website', 200 ) || ( $age >= 0 && $age < 3 ) ) {
			wp_send_json_success( array( 'message' => $sent_ok ) );
		}
		if ( $age < 0 || $age > 2 * HOUR_IN_SECONDS ) {
			self::fail( __( 'This form has expired. Please close it and try again.', 'om-catalog' ) );
		}

		$to_name    = $text( 'to_name', 40 );
		$from_name  = $text( 'from_name', 40 );
		$to_email   = sanitize_email( $text( 'to_email', 120 ) );
		$from_email = sanitize_email( $text( 'from_email', 120 ) );
		$note       = isset( $_POST['note'] ) && is_scalar( $_POST['note'] ) ? trim( mb_substr( sanitize_textarea_field( wp_unslash( $_POST['note'] ) ), 0, self::NOTE_MAX ) ) : '';
		$size       = $text( 'size', 6 );
		$size       = in_array( $size, self::sizes(), true ) ? $size : '';
		$noprice    = ! empty( $_POST['noprice'] );
		$copy       = ! empty( $_POST['copy'] );
		$source     = sanitize_key( $text( 'from', 20 ) );
		$page       = isset( $_POST['page'] ) && is_scalar( $_POST['page'] ) ? esc_url_raw( wp_unslash( $_POST['page'] ) ) : '';
		$raw        = isset( $_POST['items'] ) && is_array( $_POST['items'] ) ? wp_unslash( $_POST['items'] ) : array();
		// phpcs:enable

		if ( '' === $to_name || '' === $from_name ) {
			self::fail( __( 'Please add both names.', 'om-catalog' ) );
		}
		if ( ! is_email( $to_email ) ) {
			self::fail( __( 'Please check their email address.', 'om-catalog' ) );
		}
		if ( ! is_email( $from_email ) ) {
			self::fail( __( 'Please check your email address.', 'om-catalog' ) );
		}
		if ( self::has_link( $note ) || self::has_link( $to_name ) || self::has_link( $from_name ) ) {
			self::fail( __( 'Please leave web links out of the names and the note.', 'om-catalog' ) );
		}
		$note = preg_replace( "/\n{3,}/", "\n\n", str_replace( "\r", '', $note ) );

		// A few hints per connection an hour; one address gets at most two a
		// day, and one sender can send six.
		$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		$limits = array(
			'om_hint_ip_' . md5( $ip )                        => array( 5, HOUR_IN_SECONDS ),
			'om_hint_to_' . md5( strtolower( $to_email ) )     => array( 2, DAY_IN_SECONDS ),
			'om_hint_from_' . md5( strtolower( $from_email ) ) => array( 6, DAY_IN_SECONDS ),
		);
		foreach ( $limits as $key => $limit ) {
			if ( (int) get_transient( $key ) >= $limit[0] ) {
				self::fail( __( 'That is a few hints already. Please try again a little later.', 'om-catalog' ), 429 );
			}
		}

		// The designs as Overnight Mountings has them, not as the browser sent.
		$items = self::lookup( $raw, ! $noprice );
		if ( ! $items ) {
			self::fail( __( 'We could not find that design. Please refresh the page and try again.', 'om-catalog' ) );
		}
		foreach ( $limits as $key => $limit ) {
			set_transient( $key, (int) get_transient( $key ) + 1, $limit[1] );
		}

		// The private page: a long random key; only its hash is stored.
		$token = wp_generate_password( 32, false, false );
		$hint  = array(
			'from'    => $from_name,
			'to'      => $to_name,
			'note'    => $note,
			'size'    => $size,
			'noprice' => $noprice,
			'items'   => $items,
			'source'  => $source,
			'sent'    => time(),
			'opened'  => 0,
			'views'   => 0,
		);
		$url   = self::page_url( $token );
		$first = $items[0];
		$more  = count( $items ) - 1;
		$piece = $first['t'] . ( $more ? ' ' . sprintf( /* translators: %d: number of other designs. */ _n( '(and %d more)', '(and %d more)', $more, 'om-catalog' ), $more ) : '' );

		// Kept under Inquiries, like every other lead.
		$lines = array(
			__( 'Subject', 'om-catalog' )   => __( 'Drop a hint', 'om-catalog' ),
			__( 'From', 'om-catalog' )      => $from_name . ' (' . $from_email . ')',
			__( 'To', 'om-catalog' )        => $to_name,
			__( 'Note', 'om-catalog' )      => $note,
			__( 'Ring size', 'om-catalog' ) => $size,
			__( 'Prices', 'om-catalog' )    => $noprice ? __( 'left out', 'om-catalog' ) : __( 'shown', 'om-catalog' ),
			__( 'Sent from', 'om-catalog' ) => $source,
			__( 'Page', 'om-catalog' )      => $page,
		);
		$body = '';
		foreach ( $lines as $label => $value ) {
			if ( '' !== (string) $value ) {
				$body .= $label . ': ' . $value . "\n";
			}
		}
		$body .= "\n" . __( 'Designs', 'om-catalog' ) . ":\n";
		foreach ( $items as $x ) {
			$body .= '- ' . $x['t'] . ' (' . sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $x['s'] ) . ')' . ( '' !== $x['o'] ? ', ' . $x['o'] : '' ) . ' ' . $x['u'] . "\n";
		}
		$post_id = wp_insert_post(
			array(
				'post_type'    => OM_Inquiry::POST_TYPE,
				'post_status'  => 'private',
				/* translators: 1: design, 2: sender, 3: recipient. */
				'post_title'   => sprintf( __( 'Drop a hint: %1$s, from %2$s to %3$s', 'om-catalog' ), $piece, $from_name, $to_name ),
				'post_content' => $body,
			)
		);
		if ( ! $post_id || is_wp_error( $post_id ) ) {
			self::fail( __( 'Something went wrong. Please try again.', 'om-catalog' ), 500 );
		}
		update_post_meta( $post_id, self::KEY_META, hash( 'sha256', $token ) );
		update_post_meta( $post_id, self::DATA_META, $hint );
		update_post_meta( $post_id, '_om_email', $from_email );
		update_post_meta( $post_id, '_om_subject', __( 'Drop a hint', 'om-catalog' ) );
		update_post_meta( $post_id, '_om_title', $piece );
		update_post_meta( $post_id, '_om_style', $first['s'] );
		update_post_meta( $post_id, '_om_link', $first['u'] );
		update_post_meta( $post_id, '_om_image', $first['i'] );

		$vars = array(
			'from_name'      => $from_name,
			'to_name'        => $to_name,
			'customer_name'  => $from_name,
			'customer_email' => $from_email,
			'note'           => $note,
			'ring_size'      => $size,
			'count'          => (string) count( $items ),
			'piece'          => $piece,
		);
		$shop = OM_Emails::shop_address();
		$site = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		$safe = static function ( $name ) {
			return str_replace( array( "\r", "\n", '<', '>', ',', '"' ), '', $name );
		};
		// To the partner: replies come to the shop.
		$sent = OM_Emails::send( 'hint_partner', $to_email, $vars, self::email_block( $hint, 'partner', $url ), $url, array( 'Reply-To: ' . $safe( $site ) . ' <' . $shop . '>' ) );
		if ( ! $sent ) {
			wp_delete_post( $post_id, true );
			self::fail( __( 'The email could not be sent. Please try again.', 'om-catalog' ), 500 );
		}
		if ( $copy ) {
			OM_Emails::send( 'hint_copy', $from_email, $vars, self::email_block( $hint, 'sender', $url ), add_query_arg( 'om_hint_view', 'sender', $url ), array( 'Reply-To: ' . $safe( $site ) . ' <' . $shop . '>' ) );
		}
		OM_Emails::send( 'hint_shop', $shop, $vars, self::email_block( $hint, 'shop', $url, $to_email ), add_query_arg( 'om_hint_view', 'shop', $url ), array( 'Reply-To: ' . $safe( $from_name ) . ' <' . $from_email . '>' ) );

		do_action(
			'om_lead',
			array(
				'event'   => 'hint',
				'name'    => $from_name,
				'email'   => $from_email,
				'subject' => __( 'Drop a hint', 'om-catalog' ),
				'piece'   => $piece,
				'style'   => $first['s'],
				'line'    => $first['l'],
				/* translators: %s: recipient's first name. */
				'message' => trim( sprintf( __( 'Sent a hint to %s.', 'om-catalog' ), $to_name ) . ( '' !== $size ? ' ' . sprintf( /* translators: %s: ring size. */ __( 'Ring size %s.', 'om-catalog' ), $size ) : '' ) . ( '' !== $note ? "\n" . $note : '' ) ),
				'page'    => $page,
				'image'   => $first['i'],
				'items'   => $items,
			)
		);
		if ( class_exists( 'OM_Stats' ) ) {
			foreach ( $items as $x ) {
				OM_Stats::add( 'hint', $x['l'] . '|' . $x['s'] );
			}
			OM_Stats::add( 'inquiry_subject', __( 'Drop a hint', 'om-catalog' ) );
		}
		/** After a hint is sent: post ID, the hint, the sender's email. */
		do_action( 'om_hint_sent', $post_id, $hint, $from_email );

		wp_send_json_success(
			array(
				/* translators: %s: recipient's name. */
				'message' => sprintf( __( 'Hint sent to %s.', 'om-catalog' ), $to_name ),
				'token'   => $token,
				'url'     => add_query_arg( 'om_hint_view', 'sender', $url ),
			)
		);
	}

	/**
	 * Designs from the request (items[] of line, style, color, metal),
	 * looked up at Overnight Mountings. Colour and metal must be the
	 * design's own options. Each: l, s, t, i (photo in that colour), u (its
	 * page with those options), o (options in words), c, m, p (price).
	 */
	private static function lookup( $raw, $with_price ) {
		require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
		$out  = array();
		$seen = array();
		foreach ( array_slice( is_array( $raw ) ? $raw : array(), 0, self::MAX_ITEMS ) as $item ) {
			if ( ! is_array( $item ) ) {
				continue;
			}
			$line  = sanitize_title( (string) ( $item['line'] ?? '' ) );
			$style = trim( sanitize_text_field( (string) ( $item['style'] ?? '' ) ) );
			$key   = $line . '|' . strtoupper( $style );
			if ( '' === $line || '' === $style || strlen( $style ) > 40 || ! preg_match( '#^[A-Za-z0-9][A-Za-z0-9._/~-]*$#', $style ) || isset( $seen[ $key ] ) ) {
				continue;
			}
			$product = OM_API_Client::get_product_by_style( $line, str_replace( '~', '/', $style ) );
			if ( ! is_array( $product ) || is_wp_error( $product ) ) {
				continue;
			}
			$seen[ $key ] = true;
			$number = (string) ( $product['style_number'] ?? $style );
			$color  = sanitize_text_field( (string) ( $item['color'] ?? '' ) );
			$color  = in_array( $color, array_map( 'strval', (array) ( $product['colors'] ?? array() ) ), true ) ? $color : '';
			$metal  = sanitize_text_field( (string) ( $item['metal'] ?? '' ) );
			$metal  = in_array( $metal, array_map( 'strval', (array) ( $product['metals'] ?? array() ) ), true ) ? $metal : '';
			$words  = array();
			if ( '' !== $metal && false !== stripos( $metal, 'platinum' ) ) {
				$words[] = $metal;
			} else {
				if ( '' !== $color ) {
					/* translators: %s: gold colour, e.g. Yellow. */
					$words[] = sprintf( __( '%s gold', 'om-catalog' ), $color );
				}
				if ( '' !== $metal ) {
					$words[] = $metal;
				}
			}
			$price = '';
			if ( $with_price && function_exists( 'om_markup_is_configured' ) && om_markup_is_configured() && method_exists( 'OM_API_Client', 'get_card_price' ) ) {
				$wholesale = OM_API_Client::get_card_price( $line, $number );
				if ( null !== $wholesale ) {
					/* translators: %s: price. */
					$price = sprintf( __( 'From %s', 'om-catalog' ), om_format_price_short( om_apply_markup( $wholesale ) ) );
				}
			}
			$out[] = array(
				'l' => $line,
				's' => $number,
				't' => (string) ( $product['title'] ?? $number ),
				'i' => (string) om_card_images( $product, $color )[0],
				'u' => add_query_arg( array_map( 'rawurlencode', array_filter( array( 'om_metal' => $metal, 'om_color' => $color ) ) ), om_product_url( $line, $number ) ),
				'o' => implode( ', ', $words ),
				'c' => $color,
				'm' => $metal,
				'p' => $price,
			);
		}
		return $out;
	}

	/**
	 * The automatic {details} block of the hint emails: the note, the
	 * designs (one large, or two per row), the ring size, and for the
	 * partner a line saying why they got it. Tables and inline styles.
	 *
	 * @param array  $hint     The hint (see handle_send()).
	 * @param string $audience partner, sender or shop.
	 * @param string $url      The hint page.
	 * @param string $to_email The partner's address (the shop's copy only).
	 */
	public static function email_block( $hint, $audience, $url = '', $to_email = '' ) {
		$d     = OM_Emails::design();
		$items = (array) ( $hint['items'] ?? array() );
		$out   = '';
		$font  = 'font-family:Helvetica,Arial,sans-serif;';
		if ( '' !== (string) ( $hint['note'] ?? '' ) ) {
			$out .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;"><tr><td style="padding:16px 20px;background:#faf8f4;border-left:3px solid ' . esc_attr( $d['accent'] ) . ';border-radius:8px;">'
				. '<div style="font-family:Georgia,serif;font-size:18px;line-height:1.5;color:#2b2b2b;">&ldquo;' . nl2br( esc_html( $hint['note'] ) ) . '&rdquo;</div>'
				/* translators: %s: sender's name. */
				. '<div style="' . $font . 'margin-top:8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6e6e6e;">' . esc_html( sprintf( __( 'From %s', 'om-catalog' ), $hint['from'] ) ) . '</div></td></tr></table>';
		}
		$link_for = static function ( $x ) use ( $audience, $url ) {
			return 'partner' === $audience && '' !== $url ? $url : $x['u'];
		};
		$meta = static function ( $x ) use ( $hint ) {
			$bits = array_filter( array( $x['o'], empty( $hint['noprice'] ) ? $x['p'] : '' ) );
			return implode( ' · ', $bits );
		};
		if ( 1 === count( $items ) ) {
			$x    = $items[0];
			$out .= '<a href="' . esc_url( $link_for( $x ) ) . '" style="display:block;text-decoration:none;color:' . esc_attr( $d['brand'] ) . ';">'
				. ( '' !== $x['i'] ? '<img src="' . esc_url( $x['i'] ) . '" width="520" alt="' . esc_attr( $x['t'] ) . '" style="display:block;width:100%;max-width:520px;height:auto;border:1px solid #eeeeee;border-radius:10px;background:#ffffff;">' : '' )
				. '<span style="display:block;font-family:Georgia,serif;font-size:20px;line-height:1.3;margin:14px 0 4px;">' . esc_html( $x['t'] ) . '</span></a>'
				. ( '' !== $meta( $x ) ? '<span style="display:block;' . $font . 'font-size:14px;color:#6e6e6e;">' . esc_html( $meta( $x ) ) . '</span>' : '' );
		} else {
			$rows = '';
			foreach ( array_chunk( $items, 2 ) as $pair ) {
				$rows .= '<tr>';
				foreach ( $pair as $x ) {
					$rows .= '<td width="50%" valign="top" style="padding:8px;"><a href="' . esc_url( $link_for( $x ) ) . '" style="text-decoration:none;color:' . esc_attr( $d['brand'] ) . ';">'
						. ( '' !== $x['i'] ? '<img src="' . esc_url( $x['i'] ) . '" width="250" alt="' . esc_attr( $x['t'] ) . '" style="display:block;width:100%;max-width:250px;height:auto;border:1px solid #eeeeee;border-radius:8px;background:#ffffff;">' : '' )
						. '<span style="display:block;font-family:Georgia,serif;font-size:16px;line-height:1.3;margin:10px 0 2px;">' . esc_html( $x['t'] ) . '</span></a>'
						. ( '' !== $meta( $x ) ? '<span style="display:block;' . $font . 'font-size:12px;color:#6e6e6e;">' . esc_html( $meta( $x ) ) . '</span>' : '' ) . '</td>';
				}
				if ( 1 === count( $pair ) ) {
					$rows .= '<td width="50%"></td>';
				}
				$rows .= '</tr>';
			}
			$out .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 -8px;">' . $rows . '</table>';
		}
		if ( '' !== (string) ( $hint['size'] ?? '' ) ) {
			/* translators: %s: ring size. */
			$out .= '<p style="' . $font . 'margin:16px 0 0;font-size:14px;color:#464646;">' . esc_html__( 'Ring size', 'om-catalog' ) . ': <strong>' . esc_html( $hint['size'] ) . '</strong></p>';
		}
		if ( 'shop' === $audience ) {
			$out .= '<p style="' . $font . 'margin:16px 0 0;font-size:13px;color:#6e6e6e;">' . esc_html__( 'Sent to', 'om-catalog' ) . ': ' . esc_html( $hint['to'] . ( '' !== $to_email ? ' (' . $to_email . ')' : '' ) ) . ( ! empty( $hint['noprice'] ) ? ' · ' . esc_html__( 'prices left out', 'om-catalog' ) : '' ) . '</p>';
		}
		if ( 'partner' === $audience ) {
			/* translators: %s: sender's name. */
			$out .= '<p style="' . $font . 'margin:18px 0 0;font-size:12px;line-height:1.5;color:#6e6e6e;">' . esc_html( sprintf( __( '%s asked us to send you this. We will not email you again unless you get in touch.', 'om-catalog' ), $hint['from'] ) ) . '</p>';
		}
		return $out;
	}

	/* ---------------------------------------------------------------
	 * The private page
	 * ------------------------------------------------------------- */

	public static function page_url( $token ) {
		return add_query_arg( 'om_hint', $token, home_url( '/' ) );
	}

	public function query_vars( $vars ) {
		$vars[] = 'om_hint';
		return $vars;
	}

	private static function request_token() {
		$token = (string) get_query_var( 'om_hint' );
		return preg_match( '/^[A-Za-z0-9]{20,64}$/', $token ) ? $token : '';
	}

	public function is_hint_request() {
		return '' !== (string) get_query_var( 'om_hint' );
	}

	/** The hint for this page: [ id, hint ] or null (unknown or expired). */
	public function current() {
		if ( false !== $this->current ) {
			return $this->current;
		}
		$this->current = null;
		$token         = self::request_token();
		if ( '' === $token ) {
			return null;
		}
		$found = get_posts(
			array(
				'post_type'      => OM_Inquiry::POST_TYPE,
				'post_status'    => 'private',
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'meta_key'       => self::KEY_META, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key -- one indexed lookup.
				'meta_value'     => hash( 'sha256', $token ), // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
				'no_found_rows'  => true,
			)
		);
		$hint = $found ? get_post_meta( $found[0], self::DATA_META, true ) : null;
		if ( ! is_array( $hint ) || empty( $hint['items'] ) || ( (int) $hint['sent'] + self::DAYS * DAY_IN_SECONDS ) < time() ) {
			return null;
		}
		$this->current = array( (int) $found[0], $hint, $token );
		return $this->current;
	}

	/** Not the blog, not the home page: our own page. */
	public function mark_query( $query ) {
		if ( $query->is_main_query() && '' !== (string) $query->get( 'om_hint' ) ) {
			$query->is_home       = false;
			$query->is_front_page = false;
			$query->is_page       = false;
			$query->is_singular   = false;
		}
	}

	public function skip_posts_query( $posts, $query ) {
		if ( $query->is_main_query() && '' !== (string) $query->get( 'om_hint' ) ) {
			$query->found_posts   = 0;
			$query->max_num_pages = 0;
			return array();
		}
		return $posts;
	}

	public function handle_status( $preempt, $wp_query ) {
		if ( ! $this->is_hint_request() ) {
			return $preempt;
		}
		$wp_query->is_404 = false;
		status_header( $this->current() ? 200 : 404 );
		return true;
	}

	public function document_title( $title ) {
		if ( ! $this->is_hint_request() ) {
			return $title;
		}
		$current = $this->current();
		/* translators: %s: sender's name. */
		$name = $current ? sprintf( __( 'A hint from %s', 'om-catalog' ), $current[1]['from'] ) : __( 'Hint not found', 'om-catalog' );
		return $name . ' | ' . wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
	}

	/** Private: never in search results, links not followed. */
	public function robots( $robots ) {
		if ( $this->is_hint_request() ) {
			$robots['noindex']  = true;
			$robots['nofollow'] = true;
			unset( $robots['max-image-preview'] );
		}
		return $robots;
	}

	/** Each hint page is personal: keep it out of page caches. */
	public function no_cache() {
		if ( ! $this->is_hint_request() ) {
			return;
		}
		if ( ! defined( 'DONOTCACHEPAGE' ) ) {
			define( 'DONOTCACHEPAGE', true );
		}
		nocache_headers();
		header( 'Referrer-Policy: no-referrer' );
	}

	public function enqueue() {
		if ( $this->is_hint_request() ) {
			wp_enqueue_style( 'om-catalog-css' );
			wp_enqueue_script( 'om-catalog-js' );
		}
	}

	public function template( $template ) {
		if ( ! $this->is_hint_request() ) {
			return $template;
		}
		$theme = locate_template( 'om-catalog/hint.php' );
		return $theme ? $theme : OM_CATALOG_DIR . 'templates/hint.php';
	}

	/** The page itself (the template prints it between header and footer). */
	public function render_page() {
		$current = $this->current();
		$refined = function_exists( 'om_refined_class' ) ? om_refined_class() : '';
		ob_start();
		if ( ! $current ) {
			echo '<div class="om-hint-page om-hint-page--gone' . esc_attr( $refined ) . '"><div class="om-hp-wrap"><p class="om-hp-eyebrow"><span class="om-hint-icon" aria-hidden="true"></span>' . esc_html( self::label() ) . '</p><h1 class="om-hp-title">' . esc_html__( 'This hint is no longer here', 'om-catalog' ) . '</h1><p class="om-hp-lead">' . esc_html__( 'The link may have expired, or a part of it is missing. Our designs are all still here.', 'om-catalog' ) . '</p><p><a class="om-btn om-btn--solid" href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Visit our home page', 'om-catalog' ) . '</a></p></div></div>';
			return ob_get_clean();
		}
		list( $post_id, $hint, $token ) = $current;
		unset( $post_id );
		$items = (array) $hint['items'];
		$one   = 1 === count( $items );
		$first = $items[0];
		$view  = isset( $_GET['om_hint_view'] ) ? sanitize_key( wp_unslash( $_GET['om_hint_view'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display only.
		$ctx   = array(
			'line'  => $first['l'],
			'piece' => $first['t'],
			'sub'   => $first['o'],
			'img'   => $first['i'],
			'from'  => $hint['from'],
			'size'  => $hint['size'],
		);
		echo '<div class="om-hint-page' . esc_attr( $refined ) . '" data-om-hint-page="' . esc_attr( $token ) . '" data-om-hint-view="' . esc_attr( $view ) . '" data-om-hint-ctx="' . esc_attr( wp_json_encode( $ctx ) ) . '"><div class="om-hp-wrap">';

		echo '<header class="om-hp-head"><p class="om-hp-eyebrow"><span class="om-hint-icon" aria-hidden="true"></span>' . esc_html__( 'A little hint', 'om-catalog' ) . '</p>';
		/* translators: %s: sender's name. */
		echo '<h1 class="om-hp-title">' . esc_html( sprintf( __( '%s has dropped you a hint', 'om-catalog' ), $hint['from'] ) ) . '</h1>';
		/* translators: %d: number of designs. */
		echo '<p class="om-hp-lead">' . esc_html( $one ? __( 'They have been admiring this design, and thought you should know.', 'om-catalog' ) : sprintf( _n( 'They have been admiring %d design, and thought you should know.', 'They have been admiring these %d designs, and thought you should know.', count( $items ), 'om-catalog' ), count( $items ) ) ) . '</p></header>';

		if ( '' !== (string) $hint['note'] || '' !== (string) $hint['size'] ) {
			echo '<div class="om-hp-notes">';
			if ( '' !== (string) $hint['note'] ) {
				/* translators: %s: sender's name. */
				echo '<figure class="om-hp-note"><blockquote>' . nl2br( esc_html( $hint['note'] ) ) . '</blockquote><figcaption>' . esc_html( sprintf( __( 'From %s', 'om-catalog' ), $hint['from'] ) ) . '</figcaption></figure>';
			}
			if ( '' !== (string) $hint['size'] ) {
				/* translators: %s: ring size. */
				echo '<p class="om-hp-size"><span class="om-hp-size-ic" aria-hidden="true"></span><span>' . esc_html__( 'Their ring size', 'om-catalog' ) . ' <strong>' . esc_html( $hint['size'] ) . '</strong></span></p>';
			}
			echo '</div>';
		}

		$book = '<a class="om-btn om-btn--solid om-hp-book" href="#om-inquiry?subject=' . rawurlencode( __( 'Book a viewing', 'om-catalog' ) ) . '" data-om-hint-book>' . esc_html__( 'Book a viewing', 'om-catalog' ) . '</a>';
		$ask  = '<a class="om-btn om-btn--outline om-hp-ask" href="#om-inquiry" data-om-hint-ask>' . esc_html__( 'Ask us about it', 'om-catalog' ) . '</a>';
		$ctas = '<div class="om-hp-ctas">' . $book . $ask . '</div>' . ( '' !== self::promise() ? '<p class="om-hp-promise">' . esc_html( self::promise() ) . '</p>' : '' );

		echo '<div class="om-hp-designs om-hp-designs--' . ( $one ? 'one' : 'many' ) . '">';
		foreach ( $items as $x ) {
			$meta = implode( ' · ', array_filter( array( $x['o'], empty( $hint['noprice'] ) ? $x['p'] : '', sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $x['s'] ) ) ) );
			$url  = '' !== (string) $hint['size'] ? add_query_arg( 'om_size', $hint['size'], $x['u'] ) : $x['u'];
			echo '<article class="om-hp-design"><a class="om-hp-photo" href="' . esc_url( $url ) . '" tabindex="-1" aria-hidden="true">' . ( '' !== $x['i'] ? '<img src="' . esc_url( $x['i'] ) . '" alt="" decoding="async">' : '' ) . '</a><div class="om-hp-info">';
			echo '<h2 class="om-hp-name"><a href="' . esc_url( $url ) . '">' . esc_html( $x['t'] ) . '</a></h2><p class="om-hp-meta">' . esc_html( $meta ) . '</p>';
			if ( $one ) {
				echo $ctas; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
				echo '<a class="om-hp-see" href="' . esc_url( $url ) . '">' . esc_html__( 'See every photo and detail', 'om-catalog' ) . ' <span aria-hidden="true">&rarr;</span></a>';
			} else {
				echo '<a class="om-hp-see" href="' . esc_url( $url ) . '">' . esc_html__( 'See it', 'om-catalog' ) . ' <span aria-hidden="true">&rarr;</span></a>';
			}
			echo '</div></article>';
		}
		echo '</div>';
		if ( ! $one ) {
			echo '<div class="om-hp-after">' . $ctas . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
		}

		// The inquiry form, with the hint attached so the shop knows the story.
		echo '<div id="om-inquiry" class="om-product-inquiry om-hp-inquiry">';
		echo OM_Inquiry::render_form( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
			array(
				'title'       => $first['t'],
				'style'       => $first['s'],
				'line'        => $first['l'],
				'url'         => $first['u'],
				'color'       => $first['c'],
				'hint'        => $token,
				'heading'     => __( 'Ask us about it', 'om-catalog' ),
				'intro'       => __( 'Questions, a viewing, or a quiet word about the size? Send us a note. We will keep it between us.', 'om-catalog' ),
				'collapsible' => true,
				'open'        => false,
				'subject'     => __( 'Book a viewing', 'om-catalog' ),
			)
		);
		echo '</div>';
		echo '</div></div>';
		return ob_get_clean();
	}

	/**
	 * The page was opened: count it and, the first time, tell the shop. Sent
	 * by the page's script once it is on screen, so link scanners in mail
	 * systems don't count. The sender's own views (and the shop's) don't.
	 */
	public function handle_seen() {
		nocache_headers();
		// phpcs:ignore WordPress.Security.NonceVerification.Missing -- anonymous counter, rate-limited.
		$token = isset( $_POST['token'] ) && is_scalar( $_POST['token'] ) ? (string) wp_unslash( $_POST['token'] ) : '';
		if ( ! preg_match( '/^[A-Za-z0-9]{20,64}$/', $token ) || current_user_can( 'edit_posts' ) ) {
			wp_send_json_success();
		}
		$ip   = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		$rate = 'om_hint_seen_' . md5( $ip );
		$n    = (int) get_transient( $rate );
		if ( $n >= 30 ) {
			wp_send_json_success();
		}
		set_transient( $rate, $n + 1, HOUR_IN_SECONDS );
		$found = get_posts(
			array(
				'post_type'      => OM_Inquiry::POST_TYPE,
				'post_status'    => 'private',
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'meta_key'       => self::KEY_META, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
				'meta_value'     => hash( 'sha256', $token ), // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
				'no_found_rows'  => true,
			)
		);
		$hint = $found ? get_post_meta( $found[0], self::DATA_META, true ) : null;
		if ( ! is_array( $hint ) ) {
			wp_send_json_success();
		}
		$first_time    = empty( $hint['opened'] );
		$hint['views'] = (int) ( $hint['views'] ?? 0 ) + 1;
		if ( $first_time ) {
			$hint['opened'] = time();
		}
		update_post_meta( $found[0], self::DATA_META, $hint );
		if ( $first_time ) {
			$url  = self::page_url( $token );
			$vars = array(
				'from_name' => $hint['from'],
				'to_name'   => $hint['to'],
				'note'      => $hint['note'],
				'ring_size' => $hint['size'],
				'count'     => (string) count( (array) $hint['items'] ),
				'piece'     => (string) get_post_meta( $found[0], '_om_title', true ),
			);
			OM_Emails::send( 'hint_opened', OM_Emails::shop_address(), $vars, self::email_block( $hint, 'shop', $url ), add_query_arg( 'om_hint_view', 'shop', $url ) );
			if ( class_exists( 'OM_Stats' ) ) {
				foreach ( (array) $hint['items'] as $x ) {
					OM_Stats::add( 'hint_opened', $x['l'] . '|' . $x['s'] );
				}
			}
		}
		wp_send_json_success();
	}

	/**
	 * For an inquiry sent from a hint page: the hint's story, in words, for
	 * the shop's email and the Inquiries entry (and marks the hint answered).
	 */
	public static function inquiry_context( $token ) {
		if ( ! preg_match( '/^[A-Za-z0-9]{20,64}$/', (string) $token ) ) {
			return '';
		}
		$found = get_posts(
			array(
				'post_type'      => OM_Inquiry::POST_TYPE,
				'post_status'    => 'private',
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'meta_key'       => self::KEY_META, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
				'meta_value'     => hash( 'sha256', $token ), // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
				'no_found_rows'  => true,
			)
		);
		$hint = $found ? get_post_meta( $found[0], self::DATA_META, true ) : null;
		if ( ! is_array( $hint ) ) {
			return '';
		}
		$hint['answered'] = time();
		update_post_meta( $found[0], self::DATA_META, $hint );
		/* translators: 1: sender, 2: date. */
		$out = sprintf( __( '%1$s sent them a hint on %2$s', 'om-catalog' ), $hint['from'], wp_date( get_option( 'date_format' ), (int) $hint['sent'] ) );
		if ( '' !== (string) $hint['size'] ) {
			/* translators: %s: ring size. */
			$out .= ', ' . sprintf( __( 'ring size %s', 'om-catalog' ), $hint['size'] );
		}
		$titles = array_map( static function ( $x ) { return $x['t'] . ' (' . $x['s'] . ')'; }, (array) $hint['items'] );
		return $out . ': ' . implode( '; ', $titles );
	}
}
