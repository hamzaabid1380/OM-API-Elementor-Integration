<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Every email the plugin sends, set up in Settings > OM Catalog > Emails:
 * on/off, recipients, subject, heading, a rich body (the WordPress visual
 * editor, images included), button text — with {placeholders} — in one
 * branded layout (logo, colours, footer, sender). Each email also carries
 * its automatic "details" (the piece, the saved designs, the answers),
 * placed where {details} is written, else after the text.
 */
class OM_Emails {

	const DESIGN = 'om_email_design';

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_ajax_om_email_preview', array( $this, 'handle_preview' ) );
		add_action( 'wp_ajax_om_email_test', array( $this, 'handle_test' ) );
	}

	/* ---------------------------------------------------------------
	 * The emails
	 * ------------------------------------------------------------- */

	/**
	 * id => label, when (description), audience (shop|customer), toggle
	 * (can be switched off), tokens, defaults.
	 */
	public static function notifications() {
		$old_reply = trim( (string) get_option( 'om_inquiry_autoreply_text', '' ) );
		return array(
			'inquiry_shop'     => array(
				'label'    => __( 'New inquiry', 'om-catalog' ),
				'when'     => __( 'To you, when someone sends an inquiry (product pages, diamonds, ring builder, the AI assistant). Reply straight to it to answer them.', 'om-catalog' ),
				'audience' => 'shop',
				'toggle'   => false,
				'tokens'   => array( 'customer_name', 'customer_email', 'customer_phone', 'inquiry_subject', 'piece', 'style', 'price', 'link', 'subject_line', 'details' ),
				'defaults' => array(
					'enabled' => '1',
					'subject' => '{subject_line}',
					'heading' => '{inquiry_subject}',
					'body'    => '<p>New inquiry from <strong>{customer_name}</strong> · {customer_email} · {customer_phone}</p><p>{details}</p><p>Reply to this email to answer them directly. It is also saved under Inquiries in your dashboard.</p>',
					'button'  => __( 'View this piece', 'om-catalog' ),
				),
			),
			'inquiry_customer' => array(
				'label'    => __( 'Inquiry confirmation', 'om-catalog' ),
				'when'     => __( 'To the customer, right after they send an inquiry, with the piece they asked about.', 'om-catalog' ),
				'audience' => 'customer',
				'toggle'   => true,
				'tokens'   => array( 'customer_name', 'inquiry_subject', 'piece', 'style', 'price', 'link', 'details' ),
				'defaults' => array(
					'enabled' => get_option( 'om_inquiry_autoreply', '' ) ? '1' : '0',
					'subject' => __( 'We received your inquiry — {site_name}', 'om-catalog' ),
					'heading' => __( 'Thank you, {customer_name}', 'om-catalog' ),
					'body'    => '' !== $old_reply ? wpautop( esc_html( $old_reply ) ) . '<p>{details}</p>' : '<p>' . __( 'Thank you for your inquiry. We have received your message and will be in touch shortly.', 'om-catalog' ) . '</p><p>{details}</p><p>' . __( 'Warm regards,', 'om-catalog' ) . '<br>{site_name}</p>',
					'button'  => __( 'View this piece', 'om-catalog' ),
				),
			),
			'saved_customer'   => array(
				'label'    => __( 'Saved designs', 'om-catalog' ),
				'when'     => __( 'To a visitor who asks for their saved list by email ("Email me my list"). Sent whenever they ask — switch the whole feature off under Look & feel.', 'om-catalog' ),
				'audience' => 'customer',
				'toggle'   => false,
				'tokens'   => array( 'customer_name', 'count', 'link', 'details' ),
				'defaults' => array(
					'enabled' => '1',
					'subject' => __( 'Your saved designs from {site_name}', 'om-catalog' ),
					'heading' => __( 'Your saved designs', 'om-catalog' ),
					'body'    => '<p>' . __( 'Here are the designs you saved. Open any of them, or reply to this email with questions — we are happy to help.', 'om-catalog' ) . '</p><p>{details}</p>',
					'button'  => __( 'Open my list', 'om-catalog' ),
				),
			),
			'saved_shop'       => array(
				'label'    => __( 'Saved designs — your copy', 'om-catalog' ),
				'when'     => __( 'To you, when a visitor emails themselves their saved list (a warm lead; also saved under Inquiries).', 'om-catalog' ),
				'audience' => 'shop',
				'toggle'   => true,
				'tokens'   => array( 'customer_name', 'customer_email', 'count', 'link', 'details' ),
				'defaults' => array(
					'enabled' => '1',
					'subject' => __( 'Saved designs: {count} — {customer_name}', 'om-catalog' ),
					'heading' => __( 'Someone saved {count} designs', 'om-catalog' ),
					'body'    => '<p>' . __( '{customer_name} ({customer_email}) asked for their saved designs by email. Reply to this email to reach them.', 'om-catalog' ) . '</p><p>{details}</p>',
					'button'  => __( 'Open their list', 'om-catalog' ),
				),
			),
			'design_customer'  => array(
				'label'    => __( 'Ring design', 'om-catalog' ),
				'when'     => __( 'To a visitor who emails themselves their ring builder design ("Email it to me").', 'om-catalog' ),
				'audience' => 'customer',
				'toggle'   => false,
				'tokens'   => array( 'customer_email', 'design', 'link' ),
				'defaults' => array(
					'enabled' => '1',
					'subject' => __( 'Your ring design from {site_name}', 'om-catalog' ),
					'heading' => __( 'Your ring design', 'om-catalog' ),
					'body'    => '<p><strong>{design}</strong></p><p>' . __( 'Open it any time to pick up where you left off. Questions? Just reply to this email.', 'om-catalog' ) . '</p>',
					'button'  => __( 'Open my design', 'om-catalog' ),
				),
			),
			'design_shop'      => array(
				'label'    => __( 'Ring design — your copy', 'om-catalog' ),
				'when'     => __( 'To you, when a visitor emails themselves a ring builder design.', 'om-catalog' ),
				'audience' => 'shop',
				'toggle'   => true,
				'tokens'   => array( 'customer_email', 'design', 'link' ),
				'defaults' => array(
					'enabled' => '1',
					'subject' => __( 'Ring builder: a visitor saved "{design}"', 'om-catalog' ),
					'heading' => __( 'A visitor saved a ring design', 'om-catalog' ),
					'body'    => '<p>' . __( '{customer_email} saved <strong>{design}</strong> and asked for it by email. Reply to this email to reach them.', 'om-catalog' ) . '</p>',
					'button'  => __( 'Open the design', 'om-catalog' ),
				),
			),
			'hint_partner'     => array(
				'label'    => __( 'Drop a hint', 'om-catalog' ),
				'when'     => __( 'To the person a visitor sends a hint to ("Drop a hint"): the designs, the note and ring size, and a button to their private page. Sent whenever someone drops a hint; switch the feature off under Look & feel.', 'om-catalog' ),
				'audience' => 'partner',
				'toggle'   => false,
				'tokens'   => array( 'from_name', 'to_name', 'note', 'ring_size', 'count', 'piece', 'link', 'details' ),
				'defaults' => array(
					'enabled' => '1',
					'subject' => __( '{from_name} has dropped you a hint', 'om-catalog' ),
					'heading' => __( 'A little hint from {from_name}', 'om-catalog' ),
					'body'    => '<p>' . __( 'Hi {to_name},', 'om-catalog' ) . '</p><p>' . __( '{from_name} has been admiring something at {site_name} and thought you should know.', 'om-catalog' ) . '</p><p>{details}</p><p>' . __( 'Come and see it in person, with no pressure. We will be happy to help.', 'om-catalog' ) . '</p>',
					'button'  => __( 'See it and book a viewing', 'om-catalog' ),
				),
			),
			'hint_copy'        => array(
				'label'    => __( 'Drop a hint: their copy', 'om-catalog' ),
				'when'     => __( 'To the visitor who sent a hint, when they tick "Send me a copy".', 'om-catalog' ),
				'audience' => 'customer',
				'toggle'   => false,
				'tokens'   => array( 'from_name', 'to_name', 'note', 'ring_size', 'count', 'piece', 'link', 'details' ),
				'defaults' => array(
					'enabled' => '1',
					'subject' => __( 'Your hint is on its way to {to_name}', 'om-catalog' ),
					'heading' => __( 'Hint sent', 'om-catalog' ),
					'body'    => '<p>' . __( 'We have sent {to_name} your hint. Here is what they will see.', 'om-catalog' ) . '</p><p>{details}</p>',
					'button'  => __( 'See their page', 'om-catalog' ),
				),
			),
			'hint_shop'        => array(
				'label'    => __( 'Drop a hint: your copy', 'om-catalog' ),
				'when'     => __( 'To you, when a visitor drops a hint (also saved under Inquiries). The person they sent it to is not added anywhere.', 'om-catalog' ),
				'audience' => 'shop',
				'toggle'   => true,
				'tokens'   => array( 'from_name', 'to_name', 'customer_email', 'note', 'ring_size', 'count', 'piece', 'link', 'details' ),
				'defaults' => array(
					'enabled' => '1',
					'subject' => __( 'Drop a hint: {from_name} to {to_name}', 'om-catalog' ),
					'heading' => __( '{from_name} dropped a hint', 'om-catalog' ),
					'body'    => '<p>' . __( '{from_name} ({customer_email}) sent a hint to {to_name}. Reply to this email to reach {from_name}.', 'om-catalog' ) . '</p><p>{details}</p>',
					'button'  => __( 'Open the hint page', 'om-catalog' ),
				),
			),
			'hint_opened'      => array(
				'label'    => __( 'Drop a hint: opened', 'om-catalog' ),
				'when'     => __( 'To you, the first time someone opens the page of a hint they were sent. A good moment to be ready for their call.', 'om-catalog' ),
				'audience' => 'shop',
				'toggle'   => true,
				'tokens'   => array( 'from_name', 'to_name', 'note', 'ring_size', 'count', 'piece', 'link', 'details' ),
				'defaults' => array(
					'enabled' => '1',
					'subject' => __( '{to_name} opened the hint from {from_name}', 'om-catalog' ),
					'heading' => __( 'A hint was just opened', 'om-catalog' ),
					'body'    => '<p>' . __( '{to_name} has just looked at the hint {from_name} sent. They may be in touch soon.', 'om-catalog' ) . '</p><p>{details}</p>',
					'button'  => __( 'Open the hint page', 'om-catalog' ),
				),
			),
			'design_followup'  => array(
				'label'    => __( 'Ring design — gentle follow-up', 'om-catalog' ),
				'when'     => __( 'To a visitor who emailed themselves a ring design but has not sent a request since — once, a few days later. Off until you switch it on.', 'om-catalog' ),
				'audience' => 'customer',
				'toggle'   => true,
				// Days after "Email it to me".
				'days'     => true,
				'tokens'   => array( 'customer_email', 'design', 'link' ),
				'defaults' => array(
					'enabled' => '0',
					'days'    => '3',
					'subject' => __( 'Still thinking about your ring?', 'om-catalog' ),
					'heading' => __( 'Your ring design is waiting', 'om-catalog' ),
					'body'    => '<p><strong>{design}</strong></p><p>' . __( 'If you have questions about the diamond, the setting, sizing or timing, just reply to this email — we are happy to help, with no obligation. You can also come and see it in person.', 'om-catalog' ) . '</p>',
					'button'  => __( 'Open my design', 'om-catalog' ),
				),
			),
		);
	}

	/** What each {placeholder} means (for the settings screen). */
	public static function token_help() {
		return array(
			'site_name'       => __( 'Your site name', 'om-catalog' ),
			'site_url'        => __( 'Your site address', 'om-catalog' ),
			'customer_name'   => __( 'Their name', 'om-catalog' ),
			'customer_email'  => __( 'Their email', 'om-catalog' ),
			'customer_phone'  => __( 'Their phone', 'om-catalog' ),
			'inquiry_subject' => __( 'What it’s about (e.g. Book a viewing)', 'om-catalog' ),
			'subject_line'    => __( 'The inquiry subject line (Settings › Inquiries)', 'om-catalog' ),
			'piece'           => __( 'The piece’s name', 'om-catalog' ),
			'style'           => __( 'Its style number', 'om-catalog' ),
			'price'           => __( 'The price shown', 'om-catalog' ),
			'link'            => __( 'The link (the piece, the list or the design)', 'om-catalog' ),
			'count'           => __( 'How many designs', 'om-catalog' ),
			'design'          => __( 'The ring design', 'om-catalog' ),
			'details'         => __( 'The automatic block: piece, designs, their answers', 'om-catalog' ),
			'from_name'       => __( 'Who sent the hint', 'om-catalog' ),
			'to_name'         => __( 'Who the hint is for', 'om-catalog' ),
			'note'            => __( 'Their note', 'om-catalog' ),
			'ring_size'       => __( 'The ring size they gave', 'om-catalog' ),
		);
	}

	/** Saved settings for one email, on top of its defaults. */
	public static function get( $id, $override = null ) {
		$list = self::notifications();
		if ( ! isset( $list[ $id ] ) ) {
			return array();
		}
		$saved = is_array( $override ) ? $override : get_option( 'om_email_' . $id, array() );
		$saved = is_array( $saved ) ? $saved : array();
		$out   = $list[ $id ]['defaults'] + array( 'to' => '', 'cc' => '', 'bcc' => '' );
		foreach ( $out as $key => $value ) {
			if ( isset( $saved[ $key ] ) && ( '' !== $saved[ $key ] || in_array( $key, array( 'to', 'cc', 'bcc', 'button' ), true ) ) ) {
				$out[ $key ] = $saved[ $key ];
			}
		}
		if ( ! $list[ $id ]['toggle'] ) {
			$out['enabled'] = '1';
		}
		return $out;
	}

	public static function design( $override = null ) {
		$saved   = is_array( $override ) ? $override : get_option( self::DESIGN, array() );
		$saved   = is_array( $saved ) ? $saved : array();
		$primary = sanitize_hex_color( (string) get_option( 'om_color_primary', '' ) );
		$d       = array(
			'logo'       => '',
			'logo_width' => 160,
			'brand'      => $primary ? $primary : '#00111C',
			'accent'     => '#B8925A',
			'background' => '#F4F3F1',
			'from_name'  => '',
			'from_email' => '',
			'footer'     => '',
		);
		foreach ( $d as $key => $value ) {
			if ( isset( $saved[ $key ] ) && '' !== $saved[ $key ] ) {
				$d[ $key ] = $saved[ $key ];
			}
		}
		foreach ( array( 'brand', 'accent', 'background' ) as $c ) {
			$d[ $c ] = sanitize_hex_color( (string) $d[ $c ] ) ?: '#00111C';
		}
		$d['logo_width'] = max( 60, min( 400, (int) $d['logo_width'] ) );
		return $d;
	}

	/* ---------------------------------------------------------------
	 * Sanitizing (Settings API)
	 * ------------------------------------------------------------- */

	public static function sanitize_email_settings( $value ) {
		$value = is_array( $value ) ? $value : array();
		$list  = static function ( $raw ) {
			$emails = array_filter( array_map( 'sanitize_email', preg_split( '/[\s,;]+/', (string) $raw ) ), 'is_email' );
			return implode( ', ', array_slice( array_unique( $emails ), 0, 10 ) );
		};
		return array(
			'enabled' => empty( $value['enabled'] ) ? '0' : '1',
			'to'      => $list( $value['to'] ?? '' ),
			'cc'      => $list( $value['cc'] ?? '' ),
			'bcc'     => $list( $value['bcc'] ?? '' ),
			'subject' => sanitize_text_field( (string) ( $value['subject'] ?? '' ) ),
			'heading' => sanitize_text_field( (string) ( $value['heading'] ?? '' ) ),
			'body'    => wp_kses_post( (string) ( $value['body'] ?? '' ) ),
			'button'  => sanitize_text_field( (string) ( $value['button'] ?? '' ) ),
			'days'    => (string) max( 1, min( 30, absint( $value['days'] ?? 3 ) ) ),
		);
	}

	public static function sanitize_design( $value ) {
		$value = is_array( $value ) ? $value : array();
		return array(
			'logo'       => esc_url_raw( (string) ( $value['logo'] ?? '' ) ),
			'logo_width' => absint( $value['logo_width'] ?? 160 ),
			'brand'      => sanitize_hex_color( (string) ( $value['brand'] ?? '' ) ) ?: '',
			'accent'     => sanitize_hex_color( (string) ( $value['accent'] ?? '' ) ) ?: '',
			'background' => sanitize_hex_color( (string) ( $value['background'] ?? '' ) ) ?: '',
			'from_name'  => sanitize_text_field( (string) ( $value['from_name'] ?? '' ) ),
			'from_email' => is_email( $value['from_email'] ?? '' ) ? sanitize_email( $value['from_email'] ) : '',
			'footer'     => wp_kses_post( (string) ( $value['footer'] ?? '' ) ),
		);
	}

	/* ---------------------------------------------------------------
	 * Rendering
	 * ------------------------------------------------------------- */

	/** {placeholders} → values; empty ones leave no stray separators. */
	private static function fill( $text, $vars, $html ) {
		$pairs = array();
		foreach ( $vars as $key => $value ) {
			if ( 'details' === $key ) {
				continue;
			}
			$pairs[ '{' . $key . '}' ] = $html ? esc_html( (string) $value ) : (string) $value;
		}
		$out = strtr( (string) $text, $pairs );
		// "Name ·  · " and "Subject: " left by empty values.
		$out = preg_replace( array( '/(\s*·\s*)+(?=<\/|$)/u', '/\s*·\s*(?=\s*·)/u', '/[\s:—–-]+$/u' ), array( '', '', '' ), $out );
		return trim( $out );
	}

	/** Email-safe inline styles on the editor's HTML. */
	private static function inline( $html, $d ) {
		$font   = 'font-family:Helvetica,Arial,sans-serif;';
		$styles = array(
			'p'          => $font . 'margin:0 0 14px;font-size:15px;line-height:1.6;color:#464646;',
			'h1'         => 'font-family:Georgia,serif;margin:0 0 12px;font-size:24px;font-weight:normal;color:' . $d['brand'] . ';',
			'h2'         => 'font-family:Georgia,serif;margin:0 0 10px;font-size:20px;font-weight:normal;color:' . $d['brand'] . ';',
			'h3'         => $font . 'margin:0 0 8px;font-size:16px;color:' . $d['brand'] . ';',
			'a'          => 'color:' . $d['brand'] . ';',
			'ul'         => $font . 'margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.6;color:#464646;',
			'ol'         => $font . 'margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.6;color:#464646;',
			'blockquote' => $font . 'margin:0 0 14px;padding:10px 16px;border-left:3px solid ' . $d['accent'] . ';color:#555555;',
			'img'        => 'max-width:100%;height:auto;border:0;',
			'hr'         => 'border:0;border-top:1px solid #eeeeee;margin:18px 0;',
		);
		return preg_replace_callback(
			'/<(p|h1|h2|h3|a|ul|ol|blockquote|img|hr)(\s[^>]*)?>/i',
			static function ( $m ) use ( $styles ) {
				$tag   = strtolower( $m[1] );
				$attrs = $m[2] ?? '';
				if ( preg_match( '/\sstyle=("|\')(.*?)\1/i', $attrs, $s ) ) {
					$attrs = str_replace( $s[0], ' style="' . $styles[ $tag ] . esc_attr( $s[2] ) . '"', $attrs );
				} else {
					$attrs .= ' style="' . $styles[ $tag ] . '"';
				}
				return '<' . $m[1] . $attrs . '>';
			},
			$html
		);
	}

	/**
	 * @param string $id       Email id.
	 * @param array  $vars     Placeholder values (site_* are added).
	 * @param string $details  The automatic block (HTML).
	 * @param string $link     The button's link ('' = no button).
	 * @param array  $settings Unsaved settings (preview), else saved ones.
	 * @param array  $design   Unsaved design (preview), else saved.
	 * @return array [ subject, html, text ]
	 */
	public static function render( $id, $vars, $details = '', $link = '', $settings = null, $design = null ) {
		$s    = self::get( $id, $settings );
		$d    = self::design( $design );
		$site = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		$vars = array_merge(
			array(
				'site_name' => $site,
				'site_url'  => home_url( '/' ),
				'link'      => $link,
			),
			$vars
		);

		$subject = self::fill( $s['subject'], $vars, false );
		$heading = self::fill( $s['heading'], $vars, false );
		$body    = self::fill( wpautop( (string) $s['body'] ), $vars, true );
		$body    = self::inline( $body, $d );
		// The automatic block where {details} is (its own paragraph or not).
		if ( false !== strpos( $body, '{details}' ) ) {
			$body = preg_replace( '/<p[^>]*>\s*\{details\}\s*<\/p>/i', '{details}', $body );
			$body = str_replace( '{details}', '' !== $details ? '<div style="margin:6px 0 18px;">' . $details . '</div>' : '', $body );
		} elseif ( '' !== $details ) {
			$body .= '<div style="margin:6px 0 18px;">' . $details . '</div>';
		}
		$button = trim( self::fill( (string) $s['button'], $vars, false ) );

		$logo = '' !== $d['logo']
			? '<img src="' . esc_url( $d['logo'] ) . '" width="' . (int) $d['logo_width'] . '" alt="' . esc_attr( $site ) . '" style="display:block;width:' . (int) $d['logo_width'] . 'px;max-width:100%;height:auto;border:0;">'
			: '<div style="font-family:Georgia,serif;font-size:22px;letter-spacing:0.04em;color:' . esc_attr( $d['brand'] ) . ';">' . esc_html( $site ) . '</div>';
		$footer = '' !== trim( wp_strip_all_tags( (string) $d['footer'] ) ) || false !== strpos( (string) $d['footer'], '<img' )
			? self::inline( wpautop( self::fill( (string) $d['footer'], $vars, true ) ), $d )
			: '<p style="margin:0;">' . esc_html( $site ) . ' · <a href="' . esc_url( home_url( '/' ) ) . '" style="color:#6e6e6e;">' . esc_html( wp_parse_url( home_url(), PHP_URL_HOST ) ) . '</a></p>';
		$footer = str_replace( array( 'font-size:15px', 'color:#464646' ), array( 'font-size:12px', 'color:#6e6e6e' ), $footer );

		$html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>' . esc_html( $subject ) . '</title></head>'
			. '<body style="margin:0;padding:0;background:' . esc_attr( $d['background'] ) . ';">'
			. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' . esc_attr( $d['background'] ) . ';"><tr><td align="center" style="padding:32px 12px;">'
			. '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;color:#464646;">'
			. '<tr><td style="height:4px;background:' . esc_attr( $d['accent'] ) . ';font-size:0;line-height:0;">&nbsp;</td></tr>'
			. '<tr><td align="center" style="padding:26px 32px 18px;border-bottom:1px solid #eeeeee;">' . $logo . '</td></tr>'
			. '<tr><td style="padding:28px 32px 10px;">'
			. ( '' !== $heading ? '<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:26px;line-height:1.25;font-weight:normal;color:' . esc_attr( $d['brand'] ) . ';">' . esc_html( $heading ) . '</h1>' : '' )
			. $body
			. '</td></tr>'
			. ( '' !== $link && '' !== $button
				? '<tr><td style="padding:0 32px 28px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:' . esc_attr( $d['brand'] ) . ';border-radius:999px;"><a href="' . esc_url( $link ) . '" style="display:inline-block;padding:13px 26px;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-family:Helvetica,Arial,sans-serif;">' . esc_html( $button ) . '</a></td></tr></table></td></tr>'
				: '' )
			. '<tr><td style="padding:18px 32px 24px;border-top:1px solid #eeeeee;font-size:12px;line-height:1.5;color:#6e6e6e;">' . $footer . '</td></tr>'
			. '</table></td></tr></table></body></html>';

		$text = trim( $heading . "\n\n" . wp_strip_all_tags( preg_replace( array( '/<br\s*\/?>/i', '/<\/(p|div|tr|h\d|li)>/i' ), array( "\n", "\n" ), $body ) ) . ( '' !== $link ? "\n\n" . ( '' !== $button ? $button . ': ' : '' ) . $link : '' ) );
		$text = preg_replace( "/\n{3,}/", "\n\n", html_entity_decode( $text, ENT_QUOTES, 'UTF-8' ) );

		return array( 'subject' => $subject, 'html' => $html, 'text' => $text );
	}

	/* ---------------------------------------------------------------
	 * Sending
	 * ------------------------------------------------------------- */

	/** Is this email switched on? */
	public static function enabled( $id ) {
		return '1' === ( self::get( $id )['enabled'] ?? '1' );
	}

	/**
	 * Send one of the emails. For emails to the shop, $to is the default
	 * (Settings › Inquiries) unless the email has its own recipients.
	 *
	 * @return bool
	 */
	public static function send( $id, $to, $vars, $details = '', $link = '', $headers = array(), $settings = null, $design = null ) {
		$list = self::notifications();
		if ( ! isset( $list[ $id ] ) || ( null === $settings && ! self::enabled( $id ) ) ) {
			return false;
		}
		$s = self::get( $id, $settings );
		$d = self::design( $design );
		if ( 'shop' === $list[ $id ]['audience'] && '' !== trim( (string) $s['to'] ) && null === $settings ) {
			$to = $s['to'];
		}
		if ( '' === trim( (string) $to ) ) {
			return false;
		}
		$mail = self::render( $id, $vars, $details, $link, $settings, $design );
		$headers = array_merge( array( 'Content-Type: text/html; charset=UTF-8' ), (array) $headers );
		if ( null === $settings ) {
			foreach ( array( 'cc' => 'Cc', 'bcc' => 'Bcc' ) as $key => $label ) {
				if ( '' !== trim( (string) $s[ $key ] ) ) {
					$headers[] = $label . ': ' . $s[ $key ];
				}
			}
		}
		$text      = $mail['text'];
		$alt       = static function ( $mailer ) use ( $text ) {
			$mailer->AltBody = $text; // phpcs:ignore WordPress.NamingConventions.ValidVariableName -- PHPMailer property.
		};
		$from      = static function ( $email ) use ( $d ) {
			return '' !== $d['from_email'] ? $d['from_email'] : $email;
		};
		$from_name = static function ( $name ) use ( $d ) {
			return '' !== $d['from_name'] ? $d['from_name'] : $name;
		};
		add_action( 'phpmailer_init', $alt );
		add_filter( 'wp_mail_from', $from, 99 );
		add_filter( 'wp_mail_from_name', $from_name, 99 );
		$sent = wp_mail( $to, wp_specialchars_decode( $mail['subject'], ENT_QUOTES ), $mail['html'], $headers );
		remove_action( 'phpmailer_init', $alt );
		remove_filter( 'wp_mail_from', $from, 99 );
		remove_filter( 'wp_mail_from_name', $from_name, 99 );
		return $sent;
	}

	/** The shop's address: Settings › Inquiries, else the site admin. */
	public static function shop_address() {
		$to = sanitize_email( (string) get_option( 'om_inquiry_email', '' ) );
		return is_email( $to ) ? $to : (string) get_option( 'admin_email' );
	}

	/* ---------------------------------------------------------------
	 * Preview and test (settings screen)
	 * ------------------------------------------------------------- */

	/** Example values and details for previews. */
	private static function sample( $id ) {
		$site = get_bloginfo( 'name' );
		$vars = array(
			'customer_name'   => 'Emma Collins',
			'customer_email'  => 'emma@example.com',
			'customer_phone'  => '(219) 555-0142',
			'inquiry_subject' => __( 'Book a viewing', 'om-catalog' ),
			'subject_line'    => __( 'Book a viewing: Oval Hidden Halo Engagement Ring (Style 85121-2) — Emma Collins', 'om-catalog' ),
			'piece'           => 'Oval Hidden Halo Engagement Ring',
			'style'           => '85121-2',
			'price'           => '$3,450.00',
			'count'           => '3',
			'design'          => 'Oval Hidden Halo Engagement Ring + 1.51 ct Oval · F · VS1 · Lab-grown',
		);
		$box  = static function ( $title, $meta, $lines ) {
			$html = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee;border-radius:10px;"><tr><td style="padding:18px 20px;font-family:Helvetica,Arial,sans-serif;">'
				. '<div style="color:#6e6e6e;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">' . esc_html( $meta ) . '</div>'
				. '<div style="font-family:Georgia,serif;font-size:20px;color:#00111C;margin:6px 0 10px;">' . esc_html( $title ) . '</div>';
			foreach ( $lines as $label => $value ) {
				$html .= '<div style="font-size:13px;line-height:1.5;margin:0 0 4px;"><span style="color:#6e6e6e;">' . esc_html( $label ) . ':</span> ' . esc_html( $value ) . '</div>';
			}
			return $html . '</td></tr></table>';
		};
		$details = '';
		if ( 0 === strpos( $id, 'inquiry' ) ) {
			$details = $box( $vars['piece'], 'Style ' . $vars['style'], array( 'Options' => '14 KT · White · Complete', 'Price shown' => $vars['price'] ) );
			if ( 'inquiry_shop' === $id ) {
				$details .= '<p style="font-family:Helvetica,Arial,sans-serif;color:#6e6e6e;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;margin:18px 0 6px;">' . esc_html__( 'Their message', 'om-catalog' ) . '</p><p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;">' . esc_html__( 'Could I see this in rose gold on Saturday?', 'om-catalog' ) . '</p>';
			}
		} elseif ( 0 === strpos( $id, 'hint' ) ) {
			$vars    = array_merge(
				$vars,
				array(
					'from_name' => 'Emma',
					'to_name'   => 'James',
					'note'      => __( 'I keep coming back to this one.', 'om-catalog' ),
					'ring_size' => '6.5',
					'count'     => '1',
				)
			);
			$details = OM_Hint::email_block(
				array(
					'from'    => 'Emma',
					'to'      => 'James',
					'note'    => $vars['note'],
					'size'    => '6.5',
					'noprice' => false,
					'items'   => array( array( 'l' => 'engagement-rings', 's' => '85121-2', 't' => 'Oval Hidden Halo Engagement Ring', 'i' => '', 'u' => home_url( '/' ), 'o' => __( 'Yellow gold, 14 KT', 'om-catalog' ), 'c' => 'Yellow', 'm' => '14 KT', 'p' => 'From $3,450' ) ),
				),
				'hint_partner' === $id ? 'partner' : ( 'hint_copy' === $id ? 'sender' : 'shop' ),
				home_url( '/' ),
				'james@example.com'
			);
		} elseif ( 0 === strpos( $id, 'saved' ) ) {
			$details = $box( 'Oval Hidden Halo Engagement Ring', 'Style 85121-2', array() ) . '<div style="height:10px"></div>' . $box( 'Round Solitaire Engagement Ring', 'Style 80285-01', array() );
		}
		$link = home_url( '/' );
		unset( $site );
		return array( $vars, $details, $link );
	}

	private static function posted( $id ) {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- checked by the callers.
		$settings = isset( $_POST[ 'om_email_' . $id ] ) && is_array( $_POST[ 'om_email_' . $id ] ) ? self::sanitize_email_settings( wp_unslash( $_POST[ 'om_email_' . $id ] ) ) : null;
		$design   = isset( $_POST[ self::DESIGN ] ) && is_array( $_POST[ self::DESIGN ] ) ? self::sanitize_design( wp_unslash( $_POST[ self::DESIGN ] ) ) : null;
		// phpcs:enable
		if ( is_array( $settings ) ) {
			$settings['enabled'] = '1';
		}
		return array( $settings, $design );
	}

	public function handle_preview() {
		check_ajax_referer( 'om_email_admin', 'nonce' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => 'Not allowed.' ), 403 );
		}
		$id = isset( $_POST['id'] ) ? sanitize_key( wp_unslash( $_POST['id'] ) ) : '';
		if ( ! isset( self::notifications()[ $id ] ) ) {
			wp_send_json_error( array( 'message' => 'Unknown email.' ), 400 );
		}
		list( $settings, $design ) = self::posted( $id );
		list( $vars, $details, $link ) = self::sample( $id );
		$mail = self::render( $id, $vars, $details, $link, $settings, $design );
		wp_send_json_success( array( 'subject' => $mail['subject'], 'html' => $mail['html'] ) );
	}

	public function handle_test() {
		check_ajax_referer( 'om_email_admin', 'nonce' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => 'Not allowed.' ), 403 );
		}
		$id = isset( $_POST['id'] ) ? sanitize_key( wp_unslash( $_POST['id'] ) ) : '';
		if ( ! isset( self::notifications()[ $id ] ) ) {
			wp_send_json_error( array( 'message' => 'Unknown email.' ), 400 );
		}
		list( $settings, $design ) = self::posted( $id );
		list( $vars, $details, $link ) = self::sample( $id );
		$to   = wp_get_current_user()->user_email;
		$sent = self::send( $id, $to, $vars, $details, $link, array(), is_array( $settings ) ? $settings : self::get( $id ), $design );
		if ( ! $sent ) {
			wp_send_json_error( array( 'message' => __( 'The email could not be sent. Check that your site can send email (an SMTP plugin helps).', 'om-catalog' ) ) );
		}
		/* translators: %s: email address. */
		wp_send_json_success( array( 'message' => sprintf( __( 'Test sent to %s (with example details).', 'om-catalog' ), $to ) ) );
	}
}
