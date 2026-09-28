<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Saved designs: a heart on cards, product pages and the quick view keeps a
 * list in the visitor's browser (no account). A "Saved" panel lists them,
 * with Compare, Share list and "Email me my list" — which also saves the
 * visitor as an inquiry, so the shop has the lead.
 *
 * The list itself lives in localStorage (om_saved); the server only looks
 * designs up (for shared links), counts saves for Insights and sends the
 * email.
 */
class OM_Saved {

	/** Most designs a list holds, and an email sends. */
	const MAX = 24;

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		foreach ( array( 'om_saved_items' => 'handle_items', 'om_saved_email' => 'handle_email', 'om_saved_stat' => 'handle_stat' ) as $action => $method ) {
			add_action( 'wp_ajax_' . $action, array( $this, $method ) );
			add_action( 'wp_ajax_nopriv_' . $action, array( $this, $method ) );
		}
		add_shortcode( 'om_saved_button', array( __CLASS__, 'shortcode' ) );
	}

	/** Is the feature on (Settings > OM Catalog > Saved designs)? */
	public static function enabled() {
		return '0' !== get_option( 'om_saved', '1' );
	}

	/**
	 * The heart button for one design.
	 *
	 * @param string $line  Line code.
	 * @param string $style Style number.
	 * @param string $title Design name.
	 * @param string $image Photo URL.
	 * @param string $url   Product page.
	 * @param string $class Extra class: om-save-toggle--card / --page.
	 */
	public static function button( $line, $style, $title, $image, $url, $class = '' ) {
		if ( ! self::enabled() || '' === $line || '' === $style ) {
			return '';
		}
		$page = false !== strpos( $class, '--page' );
		return sprintf(
			'<button type="button" class="om-save-toggle %1$s" aria-pressed="false" aria-label="%2$s" data-om-save="%3$s"><span class="om-save-icon" aria-hidden="true"></span>%4$s</button>',
			esc_attr( $class ),
			/* translators: %s: design name. */
			esc_attr( sprintf( __( 'Save %s', 'om-catalog' ), $title ) ),
			esc_attr( wp_json_encode( array( 'l' => $line, 's' => $style, 't' => $title, 'i' => $image, 'u' => $url ) ) ),
			$page ? '<span class="om-save-text" aria-hidden="true" data-on="' . esc_attr__( 'Saved', 'om-catalog' ) . '" data-off="' . esc_attr__( 'Save', 'om-catalog' ) . '">' . esc_html__( 'Save', 'om-catalog' ) . '</span>' : ''
		);
	}

	/**
	 * "Saved" button for a header: heart, optional text and the count.
	 * Opens the saved panel. Any link to #om-saved does the same.
	 *
	 * @param array $atts text, show_text (yes/no), show_count (yes/no).
	 */
	public static function render_button( $atts = array() ) {
		if ( ! self::enabled() ) {
			return '';
		}
		$atts = shortcode_atts(
			array(
				'text'       => __( 'Saved', 'om-catalog' ),
				'show_text'  => 'yes',
				'show_count' => 'yes',
			),
			$atts,
			'om_saved_button'
		);
		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );
		$text = trim( (string) $atts['text'] );
		return sprintf(
			'<button type="button" class="om-saved-open%1$s" data-om-saved-open aria-haspopup="dialog" aria-label="%2$s"><span class="om-save-icon" aria-hidden="true"></span>%3$s%4$s</button>',
			om_refined_class(),
			esc_attr( '' !== $text ? $text : __( 'Saved', 'om-catalog' ) ),
			'no' !== $atts['show_text'] && '' !== $text ? '<span class="om-saved-open-text" aria-hidden="true">' . esc_html( $text ) . '</span>' : '',
			'no' !== $atts['show_count'] ? '<span class="om-saved-count" aria-hidden="true" hidden>0</span>' : ''
		);
	}

	public static function shortcode( $atts ) {
		return self::render_button( (array) $atts );
	}

	/**
	 * Designs from the request (items[] of line/style), looked up at
	 * Overnight Mountings: [ l, s, t, i, u ] each, at most MAX.
	 */
	private static function lookup( $raw ) {
		require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
		$out  = array();
		$seen = array();
		foreach ( array_slice( is_array( $raw ) ? $raw : array(), 0, self::MAX ) as $item ) {
			$line  = sanitize_title( (string) ( $item['line'] ?? '' ) );
			$style = sanitize_text_field( (string) ( $item['style'] ?? '' ) );
			$key   = $line . '|' . strtoupper( $style );
			if ( '' === $line || '' === $style || isset( $seen[ $key ] ) ) {
				continue;
			}
			$product = OM_API_Client::get_product_by_style( $line, $style );
			if ( ! is_array( $product ) || is_wp_error( $product ) ) {
				continue;
			}
			$seen[ $key ] = true;
			$number       = (string) ( $product['style_number'] ?? $style );
			$out[]        = array(
				'l' => $line,
				's' => $number,
				't' => (string) ( $product['title'] ?? $number ),
				'i' => (string) om_card_images( $product )[0],
				'u' => om_product_url( $line, $number ),
				'v' => (string) ( $product['variant_name'] ?? '' ),
			);
		}
		return $out;
	}

	/** Photo, name and link for designs from a shared list. */
	public function handle_items() {
		// phpcs:ignore WordPress.Security.NonceVerification.Missing -- public read-only lookup.
		$raw = isset( $_POST['items'] ) && is_array( $_POST['items'] ) ? wp_unslash( $_POST['items'] ) : array();
		wp_send_json_success( array( 'items' => self::lookup( $raw ) ) );
	}

	/** Count a save, for Insights ("Most saved"). */
	public function handle_stat() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- anonymous counter.
		$line  = isset( $_POST['line'] ) ? sanitize_title( wp_unslash( $_POST['line'] ) ) : '';
		$style = isset( $_POST['style'] ) ? strtoupper( sanitize_text_field( wp_unslash( $_POST['style'] ) ) ) : '';
		// phpcs:enable
		if ( '' === $line || '' === $style || strlen( $style ) > 40 || ! preg_match( '/^[A-Z0-9][A-Z0-9.\/_-]*$/', $style ) ) {
			wp_send_json_error( null, 400 );
		}
		$ip   = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		$rate = 'om_save_rate_' . md5( $ip );
		$n    = (int) get_transient( $rate );
		if ( $n < 40 ) {
			set_transient( $rate, $n + 1, HOUR_IN_SECONDS );
			if ( class_exists( 'OM_Stats' ) ) {
				OM_Stats::add( 'saved', $line . '|' . $style );
			}
		}
		wp_send_json_success();
	}

	/**
	 * "Email me my list": the visitor gets their designs (photos and links,
	 * plus a link that reopens the list); the shop gets a copy, saved under
	 * Inquiries.
	 */
	public function handle_email() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public, rate-limited, sends only to the address given.
		$email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
		$name  = isset( $_POST['name'] ) ? mb_substr( sanitize_text_field( wp_unslash( $_POST['name'] ) ), 0, 80 ) : '';
		$trap  = isset( $_POST['website'] ) ? (string) wp_unslash( $_POST['website'] ) : '';
		$raw   = isset( $_POST['items'] ) && is_array( $_POST['items'] ) ? wp_unslash( $_POST['items'] ) : array();
		// phpcs:enable
		$ok = __( 'Sent — check your inbox.', 'om-catalog' );
		if ( '' !== $trap ) {
			wp_send_json_success( array( 'message' => $ok ) );
		}
		if ( '0' === get_option( 'om_saved_email', '1' ) ) {
			wp_send_json_error( array( 'message' => __( 'Something went wrong. Please try again.', 'om-catalog' ) ) );
		}
		if ( ! is_email( $email ) ) {
			wp_send_json_error( array( 'message' => __( 'Please enter a valid email address.', 'om-catalog' ) ) );
		}
		$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		foreach ( array( 'om_savedmail_ip_' . md5( $ip ) => 6, 'om_savedmail_to_' . md5( strtolower( $email ) ) => 3 ) as $key => $limit ) {
			$count = (int) get_transient( $key );
			if ( $count >= $limit ) {
				wp_send_json_error( array( 'message' => __( 'Please try again a little later.', 'om-catalog' ) ) );
			}
			set_transient( $key, $count + 1, HOUR_IN_SECONDS );
		}
		// The designs as Overnight Mountings has them, not as the browser sent.
		$items = self::lookup( $raw );
		if ( ! $items ) {
			wp_send_json_error( array( 'message' => __( 'Your saved list is empty.', 'om-catalog' ) ) );
		}

		$site   = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		$store  = sanitize_email( (string) get_option( 'om_inquiry_email', '' ) );
		$store  = is_email( $store ) ? $store : get_option( 'admin_email' );
		// Reopens on the first design's page (which always has the panel).
		$reopen = add_query_arg(
			'om_saved',
			implode( ',', array_map( static function ( $x ) { return $x['l'] . '/' . $x['s']; }, $items ) ),
			$items[0]['u']
		);
		$reopen = str_replace( array( '%2F', '%2C' ), array( '/', ',' ), $reopen );

		$sent = wp_mail(
			$email,
			/* translators: %s: site name. */
			sprintf( __( 'Your saved designs from %s', 'om-catalog' ), $site ),
			self::email_html( $items, $reopen, '' ),
			array( 'Content-Type: text/html; charset=UTF-8', 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', ',', '"' ), '', $site ) . ' <' . $store . '>' )
		);
		if ( ! $sent ) {
			wp_send_json_error( array( 'message' => __( 'The email could not be sent. Please try again.', 'om-catalog' ) ) );
		}

		// The shop's copy, kept under Inquiries too.
		$who     = '' !== $name ? $name . ' (' . $email . ')' : $email;
		/* translators: 1: number of designs, 2: visitor. */
		$subject = sprintf( _n( 'Saved designs: %1$d design — %2$s', 'Saved designs: %1$d designs — %2$s', count( $items ), 'om-catalog' ), count( $items ), $who );
		$lines   = array_map(
			static function ( $x ) {
				return '- ' . $x['t'] . ' (' . sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $x['s'] ) . ') ' . $x['u'];
			},
			$items
		);
		$post_id = wp_insert_post(
			array(
				'post_type'    => OM_Inquiry::POST_TYPE,
				'post_status'  => 'private',
				'post_title'   => $subject,
				'post_content' => __( 'Subject', 'om-catalog' ) . ': ' . __( 'Saved designs', 'om-catalog' ) . "\n" . __( 'Page', 'om-catalog' ) . ': ' . $reopen . "\n\n" . implode( "\n", $lines ) . "\n\n" . __( 'Name', 'om-catalog' ) . ': ' . $name . "\n" . __( 'Email', 'om-catalog' ) . ': ' . $email . "\n",
			)
		);
		if ( $post_id && ! is_wp_error( $post_id ) ) {
			update_post_meta( $post_id, '_om_email', $email );
			update_post_meta( $post_id, '_om_subject', __( 'Saved designs', 'om-catalog' ) );
			/* translators: %d: number of designs. */
			update_post_meta( $post_id, '_om_title', sprintf( _n( '%d saved design', '%d saved designs', count( $items ), 'om-catalog' ), count( $items ) ) );
			update_post_meta( $post_id, '_om_link', $reopen );
			update_post_meta( $post_id, '_om_image', $items[0]['i'] );
			if ( class_exists( 'OM_Stats' ) ) {
				OM_Stats::add( 'inquiry_subject', __( 'Saved designs', 'om-catalog' ) );
			}
		}
		wp_mail(
			$store,
			wp_specialchars_decode( $subject, ENT_QUOTES ),
			/* translators: %s: visitor. */
			self::email_html( $items, $reopen, sprintf( __( '%s asked for their saved designs by email. Reply to this email to reach them.', 'om-catalog' ), $who ) ),
			array( 'Content-Type: text/html; charset=UTF-8', 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', ',', '"' ), '', $name ) . ' <' . $email . '>' )
		);
		wp_send_json_success( array( 'message' => $ok ) );
	}

	/**
	 * The list as an email: a photo, name and link per design, and a button
	 * that reopens the whole list on the site. Tables and inline styles.
	 *
	 * @param array  $items  See lookup().
	 * @param string $reopen Link that reopens the list.
	 * @param string $note   Line for the shop's copy ('' = the visitor's).
	 */
	private static function email_html( $items, $reopen, $note ) {
		$primary = sanitize_hex_color( (string) get_option( 'om_color_primary', '' ) );
		$primary = $primary ? $primary : '#00111C';
		$font    = 'font-family:Helvetica,Arial,sans-serif;';
		$serif   = 'font-family:Georgia,"Times New Roman",serif;';
		$rows    = '';
		foreach ( array_chunk( $items, 2 ) as $pair ) {
			$rows .= '<tr>';
			foreach ( $pair as $x ) {
				$rows .= '<td width="50%" valign="top" style="padding:8px;">'
					. '<a href="' . esc_url( $x['u'] ) . '" style="text-decoration:none;color:' . esc_attr( $primary ) . ';">'
					. ( '' !== $x['i'] ? '<img src="' . esc_url( $x['i'] ) . '" width="250" alt="' . esc_attr( $x['t'] ) . '" style="display:block;width:100%;max-width:250px;height:auto;border:0;background:#fafafa;">' : '' )
					. '<span style="display:block;' . $serif . 'font-size:16px;line-height:1.3;margin:10px 0 2px;">' . esc_html( $x['t'] ) . '</span></a>'
					. '<span style="display:block;' . $font . 'font-size:12px;color:#6e6e6e;">' . esc_html( trim( $x['v'] . ( '' !== $x['v'] ? ' · ' : '' ) . sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $x['s'] ) ) ) . '</span></td>';
			}
			if ( 1 === count( $pair ) ) {
				$rows .= '<td width="50%"></td>';
			}
			$rows .= '</tr>';
		}
		$intro = '' !== $note ? $note : __( 'Here are the designs you saved. Open any of them, or reply to this email with questions — we are happy to help.', 'om-catalog' );
		return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head><body style="margin:0;padding:0;background:#f4f3f1;">'
			. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f1;"><tr><td align="center" style="padding:32px 12px;">'
			. '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;' . $font . 'color:#464646;">'
			. '<tr><td style="padding:28px 32px 8px;"><div style="color:#6e6e6e;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">' . esc_html( get_bloginfo( 'name' ) ) . '</div>'
			. '<div style="' . $serif . 'font-size:24px;color:' . esc_attr( $primary ) . ';margin-top:6px;">' . esc_html__( 'Your saved designs', 'om-catalog' ) . '</div>'
			. '<p style="font-size:14px;line-height:1.6;margin:10px 0 0;">' . esc_html( $intro ) . '</p></td></tr>'
			. '<tr><td style="padding:12px 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $rows . '</table></td></tr>'
			. '<tr><td style="padding:8px 32px 30px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:' . esc_attr( $primary ) . ';border-radius:999px;">'
			. '<a href="' . esc_url( $reopen ) . '" style="display:inline-block;padding:13px 24px;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">' . esc_html__( 'Open my list', 'om-catalog' ) . '</a>'
			. '</td></tr></table></td></tr></table></td></tr></table></body></html>';
	}
}
