<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The SimplyBook.me booking calendar, instead of or beside the inquiry form.
 *
 * Settings > OM Catalog > Inquiries holds the widget code SimplyBook gives
 * (pasted as is, or just the SimplyBook address) and what visitors see in
 * each place that offers to get in touch: the inquiry form, the booking
 * calendar, or both as two tabs. Only the widget's settings are taken from
 * the pasted code (read as JSON, checked and cleaned); the pasted text is
 * never printed on the site. A calendar fills in when it first comes into
 * view; the connections to SimplyBook and its script are readied ahead,
 * once the page has loaded (assets/js/om-booking.js).
 */
class OM_Booking {

	/** What a place can show: the inquiry form, the calendar, or both. */
	const MODES = array( 'form', 'booking', 'both' );

	/** The calendar the site started with (the widget code from the old site). */
	const DEFAULT_CODE = <<<'CODE'
<script src="//widget.simplybook.me/v2/widget/widget.js"></script>
<script>var widget = new SimplybookWidget({"widget_type":"iframe","url":"https:\/\/aalanddiamond.simplybook.me","theme":"classic","theme_settings":{"timeline_hide_unavailable":"1","hide_past_days":"0","timeline_show_end_time":"0","timeline_modern_display":"as_slots","sb_base_color":"#000000","display_item_mode":"list","body_bg_color":"#FFFFFF","sb_review_image":"","sb_company_label_color":"#ffffff","hide_img_mode":"0","sb_busy":"#000000","sb_available":"#386c94"},"timeline":"modern_week","datepicker":"top_calendar","is_rtl":false,"app_config":{"allow_switch_to_ada":0,"predefined":[]}});</script>
CODE;

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_shortcode( 'om_booking_calendar', array( $this, 'shortcode' ) );
		// Without JavaScript the tabs can't switch: show both parts.
		add_action( 'wp_head', array( $this, 'noscript' ) );
	}

	/**
	 * The places that offer to get in touch, as [ key => label ].
	 *
	 * @return array
	 */
	public static function places() {
		$places = array(
			'product'   => __( 'Product pages', 'om-catalog' ),
			'builder'   => __( 'Ring builder: the last step (“Request this ring”)', 'om-catalog' ),
			'questions' => __( '“Ask us” pop-ups: the ring builder’s questions, and “Haven’t found the one?” after the last design in a listing', 'om-catalog' ),
			'diamonds'  => __( 'Diamond search (“Ask about this diamond”)', 'om-catalog' ),
			'hint'      => __( 'Hint pages (what the person who got the hint sees)', 'om-catalog' ),
			'assistant' => __( 'AI assistant (“Talk to our team”)', 'om-catalog' ),
		);
		if ( defined( 'WK_VERSION' ) ) {
			$places['kit'] = __( 'Wulf kit: the “Book a free consultation” panel and the visit form', 'om-catalog' );
		}
		return $places;
	}

	/** What every place shows unless it has its own choice. */
	public static function default_mode() {
		$mode = (string) get_option( 'om_booking_default', 'form' );
		return in_array( $mode, self::MODES, true ) ? $mode : 'form';
	}

	/**
	 * Each place's own choice ('' = the default). The assistant starts on the
	 * form, so the chat so far goes with the message.
	 *
	 * @return array
	 */
	public static function place_modes() {
		$saved = get_option( 'om_booking_places', null );
		$saved = is_array( $saved ) ? $saved : array( 'assistant' => 'form' );
		$out   = array();
		foreach ( array_keys( self::places() ) as $place ) {
			$mode          = (string) ( $saved[ $place ] ?? '' );
			$out[ $place ] = in_array( $mode, self::MODES, true ) ? $mode : '';
		}
		return $out;
	}

	/** Settings sanitizer for om_booking_places. */
	public static function sanitize_places( $value ) {
		$out = array();
		foreach ( array_keys( self::places() ) as $place ) {
			$mode          = is_array( $value ) ? (string) ( $value[ $place ] ?? '' ) : '';
			$out[ $place ] = in_array( $mode, self::MODES, true ) ? $mode : '';
		}
		return $out;
	}

	/**
	 * What a place shows: 'form', 'booking' or 'both'. A widget's own choice
	 * wins over the place's, which wins over the default. Without a working
	 * calendar it is always the form, so no place is ever left empty.
	 *
	 * @param string $place    One of places(), or '' for the default.
	 * @param string $override A widget's own choice ('' = the settings).
	 */
	public static function mode( $place = '', $override = '' ) {
		$mode = in_array( $override, self::MODES, true ) ? $override : '';
		if ( '' === $mode && '' !== $place ) {
			$mode = self::place_modes()[ $place ] ?? '';
		}
		if ( '' === $mode ) {
			$mode = self::default_mode();
		}
		return 'form' !== $mode && ! self::setup() ? 'form' : $mode;
	}

	/** True when some place shows the calendar (its script and styles are then loaded with the catalog's). */
	public static function in_use() {
		if ( ! self::setup() ) {
			return false;
		}
		if ( 'form' !== self::default_mode() ) {
			return true;
		}
		foreach ( self::place_modes() as $mode ) {
			if ( '' !== $mode && 'form' !== $mode ) {
				return true;
			}
		}
		return false;
	}

	/** Tab names: 'book' (the calendar) or 'form'. */
	public static function label( $which ) {
		$text = trim( (string) get_option( 'form' === $which ? 'om_booking_tab_form' : 'om_booking_tab_book', '' ) );
		if ( '' !== $text ) {
			return $text;
		}
		return 'form' === $which ? __( 'Send a message', 'om-catalog' ) : __( 'Book an appointment', 'om-catalog' );
	}

	/** The line above the calendar ('' = none). */
	public static function intro() {
		$text = get_option( 'om_booking_intro', null );
		return null === $text ? __( 'Pick a day and time that suits you. It only takes a minute.', 'om-catalog' ) : trim( (string) $text );
	}

	/** Which tab is open first when both show: 'booking' or 'form'. */
	public static function first() {
		return 'form' === get_option( 'om_booking_first', 'booking' ) ? 'form' : 'booking';
	}

	/**
	 * Where the form or calendar sits on product pages: 'buttons' (right
	 * under the buttons, e.g. "Call us") or 'end' (after the details).
	 *
	 * @param string $override A widget's own choice ('' = Settings).
	 */
	public static function product_position( $override = '' ) {
		$position = in_array( $override, array( 'buttons', 'end' ), true ) ? $override : (string) get_option( 'om_product_inquiry_position', 'buttons' );
		return 'end' === $position ? 'end' : 'buttons';
	}

	/* ---------------------------------------------------------------
	 * The widget code
	 * ------------------------------------------------------------- */

	/**
	 * The calendar as set up in Settings, or null when there is none or the
	 * code can't be read.
	 *
	 * @return array|null [ config => SimplybookWidget options, script => widget.js URL, page => booking page URL ]
	 */
	public static function setup() {
		static $cache = array();
		$raw = (string) get_option( 'om_booking_code', self::DEFAULT_CODE );
		if ( ! array_key_exists( $raw, $cache ) ) {
			/**
			 * Filters the booking calendar setup (null = none).
			 *
			 * @param array|null $setup config, script, page.
			 */
			$setup         = apply_filters( 'om_booking_setup', self::parse( $raw ) );
			$cache[ $raw ] = is_array( $setup ) && ! empty( $setup['config']['url'] ) ? $setup : null;
		}
		return $cache[ $raw ];
	}

	/**
	 * Read SimplyBook's widget code, or a plain SimplyBook address.
	 *
	 * @param string $raw What was pasted in Settings.
	 * @return array|null See setup().
	 */
	public static function parse( $raw ) {
		$raw = trim( html_entity_decode( (string) $raw, ENT_QUOTES, 'UTF-8' ) );
		if ( '' === $raw ) {
			return null;
		}
		$config = null;
		$json   = self::object_after( $raw, 'SimplybookWidget(' );
		if ( '' !== $json ) {
			$config = json_decode( $json, true );
		} elseif ( preg_match( '#(?:https?:)?//(?!widget\.simplybook\.)[a-z0-9.\-]+\.[a-z]{2,}(?::\d+)?#i', $raw, $m ) || preg_match( '#\b(?!widget\.)[a-z0-9\-]+\.simplybook\.[a-z]{2,10}\b#i', $raw, $m ) ) {
			// Just the address: SimplyBook's own defaults for the rest.
			$config = array(
				'widget_type' => 'iframe',
				'url'         => $m[0],
				'theme'       => 'default',
				'timeline'    => 'modern',
				'datepicker'  => 'top_calendar',
				'is_rtl'      => false,
				'app_config'  => array( 'predefined' => array() ),
			);
		}
		if ( ! is_array( $config ) ) {
			return null;
		}
		$url = self::clean_url( $config['url'] ?? '' );
		if ( '' === $url ) {
			return null;
		}

		$clean = array(
			// Always the inline calendar: the button and pop-up kinds
			// open their own windows instead of filling the box.
			'widget_type' => 'iframe',
			'url'         => $url,
		);
		foreach ( array( 'theme', 'timeline', 'datepicker' ) as $key ) {
			if ( isset( $config[ $key ] ) && is_scalar( $config[ $key ] ) ) {
				$clean[ $key ] = preg_replace( '/[^a-z0-9_\-]/i', '', (string) $config[ $key ] );
			}
		}
		$clean['is_rtl'] = ! empty( $config['is_rtl'] );
		foreach ( array( 'theme_settings', 'app_config' ) as $key ) {
			if ( isset( $config[ $key ] ) && is_array( $config[ $key ] ) ) {
				$clean[ $key ] = self::clean( $config[ $key ] );
			}
		}
		// Anything else SimplyBook adds later, when it is a plain value.
		foreach ( $config as $key => $value ) {
			$key = preg_replace( '/[^a-z0-9_]/i', '', (string) $key );
			if ( '' !== $key && ! isset( $clean[ $key ] ) && 'container_id' !== $key && is_scalar( $value ) ) {
				$clean[ $key ] = is_string( $value ) ? mb_substr( sanitize_text_field( $value ), 0, 200 ) : $value;
			}
		}

		return array(
			'config' => $clean,
			'script' => self::script_url( $raw, $url ),
			'page'   => $url,
		);
	}

	/** The {...} passed to a call (strings and nesting respected), or ''. */
	private static function object_after( $text, $marker ) {
		$at = stripos( $text, $marker );
		if ( false === $at ) {
			return '';
		}
		$start = strpos( $text, '{', $at );
		if ( false === $start ) {
			return '';
		}
		$depth = 0;
		$quote = false;
		$len   = strlen( $text );
		for ( $i = $start; $i < $len; $i++ ) {
			$ch = $text[ $i ];
			if ( $quote ) {
				if ( '\\' === $ch ) {
					$i++;
				} elseif ( '"' === $ch ) {
					$quote = false;
				}
				continue;
			}
			if ( '"' === $ch ) {
				$quote = true;
			} elseif ( '{' === $ch ) {
				$depth++;
			} elseif ( '}' === $ch ) {
				$depth--;
				if ( 0 === $depth ) {
					return substr( $text, $start, $i - $start + 1 );
				}
			}
		}
		return '';
	}

	/** Settings values: plain values cleaned, lists and groups kept (a few levels deep). */
	private static function clean( $value, $depth = 0 ) {
		if ( is_array( $value ) ) {
			if ( $depth > 3 ) {
				return array();
			}
			$out = array();
			foreach ( array_slice( $value, 0, 80, true ) as $key => $item ) {
				$key = is_int( $key ) ? $key : preg_replace( '/[^a-z0-9_\-]/i', '', (string) $key );
				if ( '' !== $key ) {
					$out[ $key ] = self::clean( $item, $depth + 1 );
				}
			}
			return $out;
		}
		if ( is_bool( $value ) || is_int( $value ) || is_float( $value ) || null === $value ) {
			return $value;
		}
		return mb_substr( sanitize_text_field( (string) $value ), 0, 300 );
	}

	/** The SimplyBook address: https, the host only. */
	private static function clean_url( $url ) {
		$url = trim( (string) $url );
		if ( 0 === strpos( $url, '//' ) ) {
			$url = 'https:' . $url;
		} elseif ( false === strpos( $url, '://' ) ) {
			$url = 'https://' . $url;
		}
		$parts = wp_parse_url( $url );
		if ( empty( $parts['host'] ) || ! in_array( strtolower( (string) ( $parts['scheme'] ?? '' ) ), array( 'http', 'https' ), true ) ) {
			return '';
		}
		$host = strtolower( preg_replace( '/[^a-z0-9.\-]/i', '', (string) $parts['host'] ) );
		return '' === $host ? '' : 'https://' . $host . ( ! empty( $parts['port'] ) ? ':' . (int) $parts['port'] : '' );
	}

	/** SimplyBook's widget script: the one in the pasted code, or the one for the account's region. */
	private static function script_url( $raw, $url ) {
		if ( preg_match( '#src\s*=\s*["\']((?:https?:)?//widget\.simplybook\.[a-z]{2,10}/[a-z0-9/_.\-]+\.js)#i', $raw, $m ) ) {
			return 'https:' . preg_replace( '#^https?:#i', '', $m[1] );
		}
		$host = (string) wp_parse_url( $url, PHP_URL_HOST );
		$tld  = preg_match( '#\.simplybook\.([a-z]{2,10})$#i', $host, $t ) ? strtolower( $t[1] ) : 'me';
		return 'https://widget.simplybook.' . $tld . '/v2/widget/widget.js';
	}

	/* ---------------------------------------------------------------
	 * Markup
	 * ------------------------------------------------------------- */

	/** Load the calendar's script and styles on this page. */
	public static function enqueue() {
		wp_enqueue_style( 'om-booking-css' );
		wp_enqueue_script( 'om-booking' );
	}

	/**
	 * The calendar: a box the script fills with SimplyBook's calendar when it
	 * comes into view, a line about the piece being looked at, and a link to
	 * the booking page for anyone the calendar can't show for.
	 *
	 * @param array $args    style, diamond (the piece, for the line about it), intro (null = Settings).
	 * @param bool  $enqueue  Load the script and styles too (false: the caller makes them dependencies).
	 * @return string '' without a calendar.
	 */
	public static function calendar( $args = array(), $enqueue = true ) {
		$setup = self::setup();
		if ( ! $setup ) {
			return '';
		}
		if ( $enqueue ) {
			self::enqueue();
		}
		$args  = wp_parse_args( $args, array( 'style' => '', 'diamond' => '', 'intro' => null ) );
		$id    = 'om-sb-' . wp_rand( 10000, 99999 );
		$intro = null === $args['intro'] ? self::intro() : trim( (string) $args['intro'] );
		$style = trim( (string) $args['style'] );
		$lot   = '' !== trim( (string) $args['diamond'] ) ? (string) strtok( trim( (string) $args['diamond'] ), ' ' ) : '';
		$ref   = '';
		if ( '' !== $style && '' !== $lot ) {
			/* translators: 1: style number, 2: diamond lot number. */
			$ref = sprintf( __( 'style %1$s with diamond %2$s', 'om-catalog' ), $style, $lot );
		} elseif ( '' !== $style ) {
			/* translators: %s: style number. */
			$ref = sprintf( __( 'style %s', 'om-catalog' ), $style );
		} elseif ( '' !== $lot ) {
			/* translators: %s: diamond lot number. */
			$ref = sprintf( __( 'diamond %s', 'om-catalog' ), $lot );
		}

		$html = '<div class="om-booking" data-om-booking="' . esc_attr( wp_json_encode( $setup['config'] ) ) . '" data-om-booking-src="' . esc_url( $setup['script'] ) . '" data-om-booking-title="' . esc_attr__( 'Booking calendar', 'om-catalog' ) . '"' . ( '' !== $style ? ' data-om-style="' . esc_attr( $style ) . '"' : '' ) . '>';
		if ( $enqueue ) {
			$html .= self::preconnect( $setup );
		}
		if ( '' !== $intro ) {
			$html .= '<p class="om-booking-intro">' . esc_html( $intro ) . '</p>';
		}
		if ( '' !== $ref ) {
			/* translators: %s: "style 85121-2" or "diamond LG1234". */
			$html .= '<p class="om-booking-note">' . esc_html( sprintf( __( 'Coming in to see this piece? Mention %s when you book.', 'om-catalog' ), $ref ) ) . '</p>';
		}
		$html .= '<div class="om-booking-frame" id="' . esc_attr( $id ) . '">'
			. '<div class="om-booking-wait" role="status"><span class="om-booking-spin" aria-hidden="true"></span><span>' . esc_html__( 'Loading the calendar…', 'om-catalog' ) . '</span></div>'
			. '<div class="om-booking-failed" hidden><p>' . esc_html__( 'The calendar could not load here.', 'om-catalog' ) . '</p><a class="om-booking-open" href="' . esc_url( $setup['page'] ) . '" target="_blank" rel="noopener">' . esc_html__( 'Open the booking page', 'om-catalog' ) . '</a></div>'
			. '</div>'
			. '<p class="om-booking-alt"><a href="' . esc_url( $setup['page'] ) . '" target="_blank" rel="noopener">' . esc_html__( 'Calendar not showing? Book on our booking page', 'om-catalog' ) . '<span class="screen-reader-text"> ' . esc_html__( '(opens in a new tab)', 'om-catalog' ) . '</span></a></p>'
			. '</div>';
		return $html;
	}

	/**
	 * Hints that open the connections to SimplyBook (its script and the
	 * booking page) while the page loads, once per page. A calendar then
	 * starts sooner when it's opened.
	 *
	 * @param array $setup See setup().
	 * @return string <link> tags ('' once printed).
	 */
	private static function preconnect( $setup ) {
		static $done = array();
		$site = strtolower( (string) wp_parse_url( home_url(), PHP_URL_HOST ) );
		$html = '';
		foreach ( array( $setup['script'], $setup['page'] ) as $url ) {
			$parts = wp_parse_url( (string) $url );
			$host  = strtolower( (string) ( $parts['host'] ?? '' ) );
			if ( '' === $host || $host === $site ) {
				continue;
			}
			$origin = ( 'http' === ( $parts['scheme'] ?? '' ) ? 'http' : 'https' ) . '://' . $host . ( ! empty( $parts['port'] ) ? ':' . (int) $parts['port'] : '' );
			if ( ! isset( $done[ $origin ] ) ) {
				$done[ $origin ] = true;
				$html           .= '<link rel="preconnect" href="' . esc_url( $origin ) . '">';
			}
		}
		return $html;
	}

	/**
	 * Two tabs, the calendar and the form, the open one first.
	 *
	 * @param string $id         Unique id base.
	 * @param string $book_html  The calendar part.
	 * @param string $form_html  The form part.
	 * @param string $form_label The form tab's name ('' = Settings).
	 * @param string $first      'booking' or 'form' ('' = Settings).
	 */
	public static function tabs( $id, $book_html, $form_html, $form_label = '', $first = '' ) {
		self::enqueue();
		$first = in_array( $first, array( 'booking', 'form' ), true ) ? $first : self::first();
		$parts = array(
			'book' => array( self::label( 'book' ), $book_html, '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>' ),
			'form' => array( '' !== trim( (string) $form_label ) ? trim( (string) $form_label ) : self::label( 'form' ), $form_html, '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z"/></svg>' ),
		);
		$order = 'form' === $first ? array( 'form', 'book' ) : array( 'book', 'form' );
		$open  = $order[0];

		$tabs   = '';
		$panels = '';
		foreach ( $order as $key ) {
			$on      = $key === $open;
			$tabs   .= '<button type="button" class="om-ask-tab" role="tab" id="' . esc_attr( $id . '-t-' . $key ) . '" aria-controls="' . esc_attr( $id . '-p-' . $key ) . '" aria-selected="' . ( $on ? 'true' : 'false' ) . '"' . ( $on ? '' : ' tabindex="-1"' ) . ' data-om-ask-tab="' . esc_attr( $key ) . '">' . $parts[ $key ][2] . '<span>' . esc_html( $parts[ $key ][0] ) . '</span></button>';
			$panels .= '<div class="om-ask-panel om-ask-panel--' . esc_attr( $key ) . '" role="tabpanel" id="' . esc_attr( $id . '-p-' . $key ) . '" aria-labelledby="' . esc_attr( $id . '-t-' . $key ) . '" data-om-ask-panel="' . esc_attr( $key ) . '"' . ( $on ? '' : ' hidden' ) . '>' . $parts[ $key ][1] . '</div>';
		}
		return '<div class="om-ask" data-om-ask><div class="om-ask-tabs" role="tablist" aria-label="' . esc_attr__( 'Book or send a message', 'om-catalog' ) . '">' . $tabs . '</div>' . $panels . '</div>';
	}

	/** [om_booking_calendar heading="" intro=""]: the calendar anywhere. */
	public function shortcode( $atts ) {
		$atts = shortcode_atts( array( 'heading' => '', 'intro' => null ), (array) $atts, 'om_booking_calendar' );
		$html = self::calendar( array( 'intro' => $atts['intro'] ) );
		if ( '' === $html ) {
			return current_user_can( 'manage_options' ) ? '<p class="om-booking-admin-note">' . esc_html__( 'The booking calendar shows here once its SimplyBook code is added under Settings > OM Catalog > Inquiries.', 'om-catalog' ) . '</p>' : '';
		}
		return '<div class="om-booking-block">' . ( '' !== trim( (string) $atts['heading'] ) ? '<h3 class="om-booking-heading">' . esc_html( $atts['heading'] ) . '</h3>' : '' ) . $html . '</div>';
	}

	/** Without JavaScript: both parts open, no tabs, and the button to the booking page where the calendar would be. */
	public function noscript() {
		if ( self::setup() ) {
			echo '<noscript><style>.om-ask-panel[hidden]{display:block!important}.om-ask-tabs,.om-booking-wait,.om-booking-alt{display:none!important}.om-booking-frame{min-height:0!important}.om-booking-failed[hidden]{display:flex!important}.om-ask-panel+.om-ask-panel{margin-top:24px}</style></noscript>' . "\n";
		}
	}
}
