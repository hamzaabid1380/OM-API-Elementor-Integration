<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sends every lead (inquiries from any form, the AI chat's "talk to our
 * team", emailed saved lists and ring designs, hints, and the Wulf Kit's
 * visit requests, quiz and sign-ups) to a CRM:
 *
 * - GoHighLevel directly: the contact (created or updated) with the lead's
 *   details in contact fields of its own (Website design, Website price
 *   shown, Website page…, made in GoHighLevel the first time), tags, a note
 *   with every detail and the visit behind the lead, and optionally an
 *   opportunity;
 * - and/or any webhook (a GHL inbound-webhook workflow, Zapier, Make…):
 *   the whole lead as JSON, with the same details as simple top-level keys.
 *
 * Settings › OM Catalog › CRM. Leads are sent after the visitor's page has
 * its answer, retried on failure, and logged.
 */
class OM_CRM {

	const GHL_BASE      = 'https://services.leadconnectorhq.com/';
	const GHL_VERSION   = '2021-07-28';
	const LOG_OPTION    = 'om_crm_log';
	const FIELDS_OPTION = 'om_crm_ghl_fields';
	const SRC_COOKIE    = 'om_src';

	private static $instance = null;

	/** Leads collected during this request, sent at its end. */
	private $pending = array();

	/** How many contact fields the last GoHighLevel delivery filled in. */
	private static $filled = 0;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'om_lead', array( $this, 'queue' ) );
		add_action( 'om_crm_retry', array( $this, 'retry' ), 10, 2 );
		add_action( 'wp_ajax_om_crm_test', array( $this, 'handle_test' ) );
		add_action( 'wp_ajax_om_crm_fields', array( $this, 'handle_fields' ) );
	}

	/* ---------------------------------------------------------------
	 * Settings
	 * ------------------------------------------------------------- */

	public static function mode() {
		$mode = (string) get_option( 'om_crm_mode', 'off' );
		return in_array( $mode, array( 'off', 'ghl', 'webhook', 'both' ), true ) ? $mode : 'off';
	}

	private static function ghl_ready() {
		return in_array( self::mode(), array( 'ghl', 'both' ), true ) && '' !== trim( (string) get_option( 'om_crm_ghl_token', '' ) ) && '' !== trim( (string) get_option( 'om_crm_ghl_location', '' ) );
	}

	private static function webhook_ready() {
		return in_array( self::mode(), array( 'webhook', 'both' ), true ) && '' !== trim( (string) get_option( 'om_crm_webhook', '' ) );
	}

	/** Which kinds of lead go to the CRM. */
	private static function event_on( $event ) {
		return '0' !== get_option( 'om_crm_ev_' . $event, '1' );
	}

	/** Whether leads fill in the contact fields in GoHighLevel (on unless switched off). */
	public static function fields_on() {
		return '0' !== get_option( 'om_crm_ghl_fields_on', '1' );
	}

	/* ---------------------------------------------------------------
	 * Leads in
	 * ------------------------------------------------------------- */

	/**
	 * A lead from the site. Keys: event (inquiry|saved|design|hint), name, email,
	 * phone, subject, message, piece, style, line, price, diamond, summary,
	 * guide, chat, page, image, options, fields [ label => value ], items [],
	 * and kind (the Wulf Kit's booking|quiz|newsletter).
	 */
	public function queue( $lead ) {
		if ( 'off' === self::mode() || ! is_array( $lead ) ) {
			return;
		}
		$lead = self::normalize( $lead );
		if ( ! self::event_on( $lead['event'] ) || ( '' === $lead['email'] && '' === $lead['phone'] ) ) {
			return;
		}
		// The visit behind it is read after the visitor has their answer (see flush()).
		$lead['_sid'] = class_exists( 'OM_Insights' ) && OM_Insights::journey_on() ? OM_Insights::current_sid() : '';
		if ( ! $this->pending ) {
			// After the visitor has their answer (PHP-FPM), else at the end.
			add_action( 'shutdown', array( $this, 'flush' ), 20 );
		}
		$this->pending[] = $lead;
	}

	/** Every field present, trimmed; first/last name; where the visitor came from. */
	private static function normalize( $lead ) {
		$lead = wp_parse_args(
			$lead,
			array(
				'event'   => 'inquiry',
				'name'    => '',
				'email'   => '',
				'phone'   => '',
				'subject' => '',
				'message' => '',
				'piece'   => '',
				'style'   => '',
				'line'    => '',
				'price'   => '',
				'diamond' => '',
				'summary' => '',
				'guide'   => '',
				'chat'    => '',
				'page'    => '',
				'image'   => '',
				'options' => '',
				'fields'  => array(),
				'items'   => array(),
				'visit'   => array(),
				'kind'    => '',
			)
		);
		foreach ( $lead as $key => $value ) {
			if ( is_string( $value ) ) {
				$lead[ $key ] = trim( $value );
			}
		}
		$lead['email'] = is_email( $lead['email'] ) ? strtolower( $lead['email'] ) : '';
		$parts         = preg_split( '/\s+/', $lead['name'], 2 );
		$lead['first_name'] = (string) ( $parts[0] ?? '' );
		$lead['last_name']  = (string) ( $parts[1] ?? '' );
		$lead['site']       = home_url( '/' );
		$lead['time']       = gmdate( 'c' );
		$lead['source']     = self::visitor_source();
		$lead['tags']       = self::tags_for( $lead );
		$lead['id']         = wp_generate_uuid4();
		return $lead;
	}

	/** First-touch source kept by the site's script (UTM tags, ads click IDs, referrer). */
	private static function visitor_source() {
		$raw = isset( $_COOKIE[ self::SRC_COOKIE ] ) ? json_decode( wp_unslash( (string) $_COOKIE[ self::SRC_COOKIE ] ), true ) : null; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- each value sanitized below.
		$out = array();
		if ( is_array( $raw ) ) {
			foreach ( array( 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'msclkid', 'ref', 'landing' ) as $key ) {
				if ( isset( $raw[ $key ] ) && is_scalar( $raw[ $key ] ) && '' !== (string) $raw[ $key ] ) {
					$out[ $key ] = mb_substr( sanitize_text_field( (string) $raw[ $key ] ), 0, 200 );
				}
			}
		}
		return $out;
	}

	/** Tags: your base tags + the kind of lead + what it's about. */
	private static function tags_for( $lead ) {
		$tags = array_filter( array_map( 'trim', explode( ',', (string) get_option( 'om_crm_tags', 'website lead' ) ) ) );
		$map  = array(
			'inquiry' => 'website inquiry',
			'saved'   => 'saved designs',
			'design'  => 'ring design saved',
			'hint'    => 'drop a hint',
		);
		$tags[] = $map[ $lead['event'] ] ?? 'website lead';
		$kinds  = array(
			'booking'    => 'visit request',
			'quiz'       => 'ring style quiz',
			'newsletter' => 'newsletter sign-up',
		);
		if ( isset( $kinds[ $lead['kind'] ] ) ) {
			$tags[] = $kinds[ $lead['kind'] ];
		}
		if ( '' !== $lead['summary'] ) {
			$tags[] = 'ring builder';
		}
		if ( '' !== $lead['chat'] ) {
			$tags[] = 'ai assistant';
		}
		if ( '' !== $lead['diamond'] && '' === $lead['summary'] ) {
			$tags[] = 'diamond inquiry';
		}
		if ( preg_match( '/viewing|appointment/i', $lead['subject'] ) ) {
			$tags[] = 'book a viewing';
		}
		/** Filters the CRM tags of a lead. */
		return array_values( array_unique( (array) apply_filters( 'om_crm_tags', array_map( 'strtolower', $tags ), $lead ) ) );
	}

	/* ---------------------------------------------------------------
	 * The details, in words and in fields
	 * ------------------------------------------------------------- */

	/** What the lead is: its subject ("Book a viewing", "Visit request") or its kind. */
	private static function request_name( $lead ) {
		if ( '' !== $lead['subject'] ) {
			return $lead['subject'];
		}
		$kinds = array(
			'inquiry' => __( 'Inquiry', 'om-catalog' ),
			'saved'   => __( 'Saved designs', 'om-catalog' ),
			'design'  => __( 'Ring design', 'om-catalog' ),
			'hint'    => __( 'Drop a hint', 'om-catalog' ),
		);
		return $kinds[ $lead['event'] ] ?? __( 'Website lead', 'om-catalog' );
	}

	/** "Engagement Rings" from "engagement-rings". */
	private static function line_name( $line ) {
		return '' !== (string) $line ? ucwords( str_replace( array( '-', '_' ), ' ', (string) $line ) ) : '';
	}

	/** The designs of a saved list or hint, one a line: name (style) and link. */
	private static function item_lines( $lead ) {
		$out = array();
		foreach ( (array) $lead['items'] as $item ) {
			$t = trim( (string) ( $item['t'] ?? '' ) );
			$s = trim( (string) ( $item['s'] ?? '' ) );
			if ( '' === $t && '' === $s ) {
				continue;
			}
			$out[] = ( '' !== $t ? $t : $s ) . ( '' !== $s && $s !== $t ? ' (' . $s . ')' : '' ) . ( ! empty( $item['u'] ) ? ' ' . $item['u'] : '' );
		}
		return $out;
	}

	/** Where the visitor came from by their first visit's link tags (when Insights has no visit to tell). */
	private static function source_text( $src ) {
		$src  = (array) $src;
		$bits = array();
		if ( ! empty( $src['utm_source'] ) ) {
			$bits[] = $src['utm_source'] . ( ! empty( $src['utm_medium'] ) ? ' / ' . $src['utm_medium'] : '' );
		}
		if ( ! empty( $src['utm_campaign'] ) ) {
			/* translators: %s: campaign name from the link. */
			$bits[] = sprintf( __( 'campaign "%s"', 'om-catalog' ), $src['utm_campaign'] );
		}
		if ( ! empty( $src['gclid'] ) ) {
			$bits[] = __( 'Google Ads click', 'om-catalog' );
		}
		if ( ! empty( $src['msclkid'] ) ) {
			$bits[] = __( 'Microsoft Ads click', 'om-catalog' );
		}
		if ( ! empty( $src['fbclid'] ) ) {
			$bits[] = __( 'Facebook or Instagram link', 'om-catalog' );
		}
		if ( ! $bits && ! empty( $src['ref'] ) ) {
			$bits[] = $src['ref'];
		}
		return implode( ' · ', $bits );
	}

	/**
	 * The contact fields leads fill in GoHighLevel: key => [ name, type,
	 * placeholder ]. Made there the first time (or found by name).
	 */
	public static function field_defs() {
		return array(
			'request'   => array( 'Website request', 'TEXT', 'What they asked for, e.g. Book a viewing' ),
			'design'    => array( 'Website design', 'TEXT', 'The design they asked about' ),
			'style'     => array( 'Website style number', 'TEXT', 'Style number' ),
			'line'      => array( 'Website product line', 'TEXT', 'Engagement Rings, Wedding Bands' ),
			'price'     => array( 'Website price shown', 'TEXT', 'The price the website showed' ),
			'page'      => array( 'Website page', 'TEXT', 'Link to the design or page' ),
			'photo'     => array( 'Website photo', 'TEXT', 'Link to the design photo' ),
			'options'   => array( 'Website options chosen', 'LARGE_TEXT', 'Metal, ring size, diamond quality' ),
			'diamond'   => array( 'Website diamond', 'LARGE_TEXT', 'The diamond they chose' ),
			'builder'   => array( 'Website ring builder', 'LARGE_TEXT', 'Setting and diamond from the ring builder' ),
			'message'   => array( 'Website message', 'LARGE_TEXT', 'Their message' ),
			'details'   => array( 'Website details', 'LARGE_TEXT', 'Everything else they filled in' ),
			'came_from' => array( 'Website came from', 'TEXT', 'Google, Maps, Facebook, an ad…' ),
			'visits'    => array( 'Website visits', 'TEXT', 'Visits before getting in touch' ),
			'viewed'    => array( 'Website designs viewed', 'LARGE_TEXT', 'Designs they looked at' ),
		);
	}

	/** A field's key as GoHighLevel makes it from the name, and as the webhook sends it: "website_style_number". */
	public static function field_key( $key ) {
		$defs = self::field_defs();
		return isset( $defs[ $key ] ) ? str_replace( ' ', '_', strtolower( $defs[ $key ][0] ) ) : 'website_' . $key;
	}

	/**
	 * What a lead puts in those fields: key => text. The design's details
	 * only when the lead is about a design (a later newsletter sign-up
	 * doesn't wipe them); the visit only when there is one to tell. Inside
	 * each group an empty value clears what an earlier lead left.
	 */
	public static function field_values( $lead ) {
		$items   = self::item_lines( $lead );
		$details = array();
		foreach ( (array) $lead['fields'] as $label => $value ) {
			if ( '' !== trim( (string) $value ) && ! in_array( strtolower( (string) $label ), array( 'name', 'email', 'phone', 'message' ), true ) ) {
				$details[] = $label . ': ' . $value;
			}
		}
		if ( '' !== $lead['guide'] ) {
			$details[] = __( 'Help me choose', 'om-catalog' ) . ': ' . $lead['guide'];
		}
		if ( $items ) {
			$details[] = __( 'Designs', 'om-catalog' ) . ":\n" . implode( "\n", $items );
		}
		$out = array(
			'request' => self::request_name( $lead ),
			'page'    => $lead['page'],
			'message' => $lead['message'],
			'details' => implode( "\n", $details ),
		);
		$design = $lead['piece'];
		if ( 'saved' === $lead['event'] && $lead['items'] ) {
			$design = implode( ', ', array_filter( array_map( static function ( $i ) { return trim( (string) ( $i['t'] ?? '' ) ); }, (array) $lead['items'] ) ) );
		}
		if ( '' !== $design || '' !== $lead['style'] || '' !== $lead['summary'] || '' !== $lead['diamond'] ) {
			$out += array(
				'design'  => $design,
				'style'   => $lead['style'],
				'line'    => self::line_name( $lead['line'] ),
				'price'   => $lead['price'],
				'photo'   => $lead['image'],
				'options' => $lead['options'],
				'diamond' => $lead['diamond'],
				'builder' => $lead['summary'],
			);
		}
		$visit = (array) $lead['visit'];
		$came  = ! empty( $visit['came_from'] ) ? (string) $visit['came_from'] : self::source_text( $lead['source'] );
		if ( $visit || '' !== $came ) {
			$out += array(
				'came_from' => $came,
				'visits'    => (string) ( $visit['visits'] ?? '' ),
				'viewed'    => implode( "\n", (array) ( $visit['viewed'] ?? array() ) ),
			);
		}
		/** Filters what a lead puts in the GoHighLevel contact fields (keys of OM_CRM::field_defs()). */
		return (array) apply_filters( 'om_crm_field_values', $out, $lead );
	}

	/** The note's title in the CRM: "Website inquiry: Hidden Halo Oval Ring". */
	public static function note_title( $lead ) {
		$what  = self::request_name( $lead );
		$about = '' !== $lead['piece'] ? $lead['piece'] : '';
		return mb_substr( $what . ( '' !== $about && false === stripos( $what, $about ) ? ': ' . $about : '' ), 0, 200 );
	}

	/** The note in the CRM: every detail of the lead and the visit behind it, readable. */
	public static function note_text( $lead ) {
		$labels = array(
			'subject' => __( 'Subject', 'om-catalog' ),
			'piece'   => __( 'Piece', 'om-catalog' ),
			'style'   => __( 'Style number', 'om-catalog' ),
			'line'    => __( 'Product line', 'om-catalog' ),
			'price'   => __( 'Price shown', 'om-catalog' ),
			'options' => __( 'Options chosen', 'om-catalog' ),
			'diamond' => __( 'Diamond', 'om-catalog' ),
			'summary' => __( 'Ring builder', 'om-catalog' ),
			'guide'   => __( 'Help me choose', 'om-catalog' ),
			'message' => __( 'Message', 'om-catalog' ),
			'page'    => __( 'Page', 'om-catalog' ),
			'image'   => __( 'Photo', 'om-catalog' ),
		);
		$kinds = array(
			'inquiry' => 'Website inquiry',
			'saved'   => 'Saved designs (emailed to themselves)',
			'design'  => 'Ring design (emailed to themselves)',
			'hint'    => 'Dropped a hint (sent a design to someone special)',
		);
		$out = '[' . wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ) . '] ' . ( $kinds[ $lead['event'] ] ?? 'Website lead' ) . "\n\n";
		foreach ( $labels as $key => $label ) {
			$value = 'line' === $key ? self::line_name( $lead['line'] ) : (string) $lead[ $key ];
			if ( '' !== $value ) {
				$out .= $label . ': ' . $value . "\n";
			}
		}
		foreach ( (array) $lead['fields'] as $label => $value ) {
			if ( '' !== trim( (string) $value ) && ! in_array( strtolower( (string) $label ), array( 'name', 'email', 'phone', 'message' ), true ) ) {
				$out .= $label . ': ' . $value . "\n";
			}
		}
		$items = self::item_lines( $lead );
		if ( $items ) {
			$out .= "\n" . __( 'Designs', 'om-catalog' ) . ":\n- " . implode( "\n- ", $items ) . "\n";
		}
		if ( '' !== $lead['chat'] ) {
			$out .= "\n" . __( 'AI assistant chat', 'om-catalog' ) . ":\n" . $lead['chat'] . "\n";
		}
		$visit = (array) $lead['visit'];
		if ( ! empty( $visit['lines'] ) ) {
			$out .= "\n" . __( 'Their visit', 'om-catalog' ) . ":\n";
			foreach ( (array) $visit['lines'] as $line ) {
				$out .= $line[0] . ': ' . $line[1] . "\n";
			}
			if ( ! empty( $visit['url'] ) ) {
				$out .= __( 'Step by step in Insights', 'om-catalog' ) . ': ' . $visit['url'] . "\n";
			}
		}
		if ( $lead['source'] ) {
			$bits = array();
			foreach ( $lead['source'] as $key => $value ) {
				$bits[] = $key . '=' . $value;
			}
			$out .= "\n" . __( 'Link tags', 'om-catalog' ) . ': ' . implode( ', ', $bits ) . "\n";
		}
		return mb_substr( $out, 0, 60000 );
	}

	/* ---------------------------------------------------------------
	 * Sending
	 * ------------------------------------------------------------- */

	public function flush() {
		if ( ! $this->pending ) {
			return;
		}
		if ( function_exists( 'fastcgi_finish_request' ) ) {
			// Nothing more for the browser: it gets its answer now.
			fastcgi_finish_request();
		}
		$pending       = $this->pending;
		$this->pending = array();
		foreach ( $pending as $lead ) {
			if ( ! empty( $lead['_sid'] ) && class_exists( 'OM_Insights' ) ) {
				$lead['visit'] = OM_Insights::crm_visit( $lead['_sid'] );
			}
			unset( $lead['_sid'] );
			self::deliver( $lead, 1 );
		}
	}

	/** Cron: try a failed lead again. */
	public function retry( $key, $attempt ) {
		$lead = get_transient( $key );
		if ( ! is_array( $lead ) ) {
			return;
		}
		delete_transient( $key );
		self::deliver( $lead + array( 'visit' => array(), 'kind' => '' ), (int) $attempt, isset( $lead['_only'] ) ? (array) $lead['_only'] : null );
	}

	/**
	 * Send to each target that is set up; on failure retry later (up to 5
	 * attempts: 5 min, 30 min, 2 h, 6 h).
	 *
	 * @param array $lead
	 * @param int   $attempt
	 * @param array $only    Targets to send to (retries skip ones that worked).
	 * @return array [ target => true|error message ]
	 */
	public static function deliver( $lead, $attempt = 1, $only = null ) {
		$results = array();
		$targets = $only ? $only : array_keys( array_filter( array( 'ghl' => self::ghl_ready(), 'webhook' => self::webhook_ready() ) ) );
		foreach ( $targets as $target ) {
			$res               = 'ghl' === $target ? self::send_ghl( $lead ) : self::send_webhook( $lead );
			$results[ $target ] = $res;
			self::log( $lead, $target, $res, $attempt );
		}
		// (A contact saved with a missing note/tag isn't sent again: no duplicates.)
		$failed = array_keys( array_filter( $results, static function ( $r ) { return true !== $r && 0 !== strpos( (string) $r, 'contact saved' ); } ) );
		$delays = array( 1 => 5 * MINUTE_IN_SECONDS, 2 => 30 * MINUTE_IN_SECONDS, 3 => 2 * HOUR_IN_SECONDS, 4 => 6 * HOUR_IN_SECONDS );
		if ( $failed && isset( $delays[ $attempt ] ) && empty( $lead['_test'] ) ) {
			$key = 'om_crm_q_' . md5( $lead['id'] . $attempt );
			set_transient( $key, $lead + array( '_only' => $failed ), DAY_IN_SECONDS * 2 );
			wp_schedule_single_event( time() + $delays[ $attempt ], 'om_crm_retry', array( $key, $attempt + 1 ) );
		}
		return $results;
	}

	/** A field's text as GoHighLevel takes it (one line kept short, long text capped). */
	private static function field_text( $key, $value ) {
		$defs  = self::field_defs();
		$value = (string) $value;
		if ( 'TEXT' === ( $defs[ $key ][1] ?? 'TEXT' ) ) {
			return mb_substr( trim( (string) preg_replace( '/\s*\n\s*/', ' · ', $value ) ), 0, 1000 );
		}
		return mb_substr( $value, 0, 10000 );
	}

	/** GoHighLevel: upsert the contact with its fields, add tags, add the note, open an opportunity. */
	private static function send_ghl( $lead ) {
		$token    = trim( (string) get_option( 'om_crm_ghl_token', '' ) );
		$location = trim( (string) get_option( 'om_crm_ghl_location', '' ) );
		$contact  = array_filter(
			array(
				'locationId' => $location,
				'firstName'  => $lead['first_name'],
				'lastName'   => $lead['last_name'],
				'name'       => $lead['name'],
				'email'      => $lead['email'],
				'phone'      => $lead['phone'],
				'source'     => (string) get_option( 'om_crm_source', 'Website' ),
			),
			'strlen'
		);
		$problems     = array();
		$fields       = array();
		self::$filled = 0;
		if ( self::fields_on() ) {
			$state = self::ghl_fields();
			foreach ( self::field_values( $lead ) as $key => $value ) {
				if ( ! empty( $state['ids'][ $key ] ) ) {
					$fields[] = array(
						'id'          => (string) $state['ids'][ $key ],
						'field_value' => self::field_text( $key, $value ),
					);
				}
			}
			if ( '' !== $state['error'] && count( $fields ) < count( self::field_defs() ) ) {
				$problems[] = 'fields: ' . $state['error'];
			}
		}
		$res = self::ghl( 'POST', 'contacts/upsert', $fields ? $contact + array( 'customFields' => $fields ) : $contact, $token );
		if ( $fields && is_wp_error( $res ) && in_array( self::status( $res ), array( 400, 422 ), true ) ) {
			// A field GoHighLevel wouldn't take (deleted there, or changed): save the contact without them and look the fields up again next time.
			$problems[] = 'fields not filled: ' . $res->get_error_message();
			self::forget_fields();
			$fields = array();
			$res    = self::ghl( 'POST', 'contacts/upsert', $contact, $token );
		}
		if ( is_wp_error( $res ) ) {
			return 'contact: ' . $res->get_error_message();
		}
		$id = (string) ( $res['contact']['id'] ?? $res['id'] ?? '' );
		if ( '' === $id ) {
			return 'contact: no contact id returned';
		}
		self::$filled = count(
			array_filter(
				$fields,
				static function ( $f ) {
					return '' !== $f['field_value'];
				}
			)
		);
		if ( $lead['tags'] ) {
			$t = self::ghl( 'POST', 'contacts/' . rawurlencode( $id ) . '/tags', array( 'tags' => $lead['tags'] ), $token );
			if ( is_wp_error( $t ) ) {
				$problems[] = 'tags: ' . $t->get_error_message();
			}
		}
		$note = array(
			'title' => self::note_title( $lead ),
			'body'  => self::note_text( $lead ),
		);
		$n    = self::ghl( 'POST', 'contacts/' . rawurlencode( $id ) . '/notes', $note, $token );
		if ( is_wp_error( $n ) && in_array( self::status( $n ), array( 400, 422 ), true ) ) {
			unset( $note['title'] ); // In case this account's API doesn't take note titles.
			$n = self::ghl( 'POST', 'contacts/' . rawurlencode( $id ) . '/notes', $note, $token );
		}
		if ( is_wp_error( $n ) ) {
			$problems[] = 'note: ' . $n->get_error_message();
		}
		$pipeline = trim( (string) get_option( 'om_crm_ghl_pipeline', '' ) );
		$stage    = trim( (string) get_option( 'om_crm_ghl_stage', '' ) );
		// Inquiries open an opportunity; newsletter sign-ups don't (nothing to sell yet).
		if ( 'inquiry' === $lead['event'] && 'newsletter' !== $lead['kind'] && '' !== $pipeline && '' !== $stage ) {
			$value = (float) preg_replace( '/[^\d.]/', '', (string) $lead['price'] );
			$opp   = array_filter(
				array(
					'pipelineId'      => $pipeline,
					'pipelineStageId' => $stage,
					'locationId'      => $location,
					'contactId'       => $id,
					'name'            => mb_substr( trim( ( '' !== $lead['piece'] ? $lead['piece'] : ( '' !== $lead['subject'] ? $lead['subject'] : 'Website inquiry' ) ) . ' · ' . ( '' !== $lead['name'] ? $lead['name'] : ( '' !== $lead['email'] ? $lead['email'] : $lead['phone'] ) ) ), 0, 250 ),
					'status'          => 'open',
					'source'          => (string) get_option( 'om_crm_source', 'Website' ),
					'monetaryValue'   => $value > 0 ? $value : null,
				),
				static function ( $v ) { return null !== $v && '' !== $v; }
			);
			$o = self::ghl( 'POST', 'opportunities/', $opp, $token );
			if ( is_wp_error( $o ) ) {
				$problems[] = 'opportunity: ' . $o->get_error_message();
			}
		}
		// The contact is in: other problems are reported, not retried.
		return $problems ? 'contact saved; ' . implode( '; ', $problems ) : true;
	}

	/** The HTTP status behind a GoHighLevel error (0 when it never answered). */
	private static function status( $error ) {
		$data = is_wp_error( $error ) ? $error->get_error_data() : null;
		return is_array( $data ) ? (int) ( $data['status'] ?? 0 ) : 0;
	}

	/** One GoHighLevel API call. */
	private static function ghl( $method, $path, $body, $token ) {
		$args = array(
			'method'  => $method,
			'timeout' => 15,
			'headers' => array(
				'Authorization' => 'Bearer ' . $token,
				'Version'       => self::GHL_VERSION,
				'Accept'        => 'application/json',
			),
		);
		if ( 'GET' !== $method ) {
			$args['headers']['Content-Type'] = 'application/json';
			$args['body']                    = wp_json_encode( $body );
		}
		$response = wp_remote_request( self::GHL_BASE . $path, $args );
		if ( is_wp_error( $response ) ) {
			return $response;
		}
		$code = (int) wp_remote_retrieve_response_code( $response );
		$data = json_decode( (string) wp_remote_retrieve_body( $response ), true );
		if ( $code < 200 || $code >= 300 ) {
			$msg = is_array( $data ) ? ( is_string( $data['message'] ?? null ) ? $data['message'] : ( is_array( $data['message'] ?? null ) ? implode( ', ', array_map( 'strval', $data['message'] ) ) : (string) ( $data['error'] ?? '' ) ) ) : '';
			return new WP_Error( 'om_crm_ghl', 'HTTP ' . $code . ( '' !== $msg ? ': ' . $msg : '' ), array( 'status' => $code ) );
		}
		return is_array( $data ) ? $data : array();
	}

	/* ---------------------------------------------------------------
	 * GoHighLevel contact fields
	 * ------------------------------------------------------------- */

	/** What is kept about the fields, for this token and location. */
	private static function fields_state() {
		$sig   = md5( trim( (string) get_option( 'om_crm_ghl_token', '' ) ) . '|' . trim( (string) get_option( 'om_crm_ghl_location', '' ) ) );
		$saved = get_option( self::FIELDS_OPTION );
		$base  = array(
			'sig'   => $sig,
			'ids'   => array(),
			'error' => '',
			'at'    => 0,
		);
		return is_array( $saved ) && ( $saved['sig'] ?? '' ) === $sig ? array_merge( $base, $saved ) : $base;
	}

	/** Look the fields up again with the next lead. */
	private static function forget_fields() {
		$state        = self::fields_state();
		$state['ids'] = array();
		$state['at']  = 0;
		update_option( self::FIELDS_OPTION, $state, false );
	}

	/**
	 * The ids of field_defs() in GoHighLevel: found by name, made when
	 * missing, then kept. Asked again when the token or location changes,
	 * when one is missing (at most once an hour after a problem), or now
	 * with $force (the "Set up the fields" button).
	 *
	 * @return array { ids: key => id, error: '' or what went wrong, at }
	 */
	public static function ghl_fields( $force = false ) {
		$token    = trim( (string) get_option( 'om_crm_ghl_token', '' ) );
		$location = trim( (string) get_option( 'om_crm_ghl_location', '' ) );
		$state    = self::fields_state();
		$defs     = self::field_defs();
		if ( '' === $token || '' === $location ) {
			return $state;
		}
		$missing = array_diff_key( $defs, array_filter( (array) $state['ids'] ) );
		if ( ! $force && ( ! $missing || time() - (int) $state['at'] < HOUR_IN_SECONDS ) ) {
			return $state;
		}
		// One at a time, so two leads arriving together don't both make the fields.
		if ( ! $force && get_transient( 'om_crm_fields_busy' ) ) {
			return $state;
		}
		set_transient( 'om_crm_fields_busy', 1, MINUTE_IN_SECONDS );
		$state['at']    = time();
		$state['error'] = '';
		$list           = self::ghl( 'GET', 'locations/' . rawurlencode( $location ) . '/customFields?model=contact', null, $token );
		if ( is_wp_error( $list ) ) {
			$state['error'] = self::fields_error( $list, false );
			update_option( self::FIELDS_OPTION, $state, false );
			delete_transient( 'om_crm_fields_busy' );
			return $state;
		}
		$by_name = array();
		$exists  = array();
		foreach ( (array) ( $list['customFields'] ?? array() ) as $f ) {
			if ( is_array( $f ) && ! empty( $f['id'] ) ) {
				$exists[ (string) $f['id'] ] = true;
				$by_name[ strtolower( trim( (string) ( $f['name'] ?? '' ) ) ) ] = (string) $f['id'];
			}
		}
		$ids  = array();
		$make = true;
		foreach ( $defs as $key => $def ) {
			$id = (string) ( $state['ids'][ $key ] ?? '' );
			if ( '' === $id || ! isset( $exists[ $id ] ) ) {
				$id = $by_name[ strtolower( $def[0] ) ] ?? '';
			}
			if ( '' === $id && $make ) {
				$made = self::ghl(
					'POST',
					'locations/' . rawurlencode( $location ) . '/customFields',
					array(
						'name'        => $def[0],
						'dataType'    => $def[1],
						'placeholder' => $def[2],
						'model'       => 'contact',
					),
					$token
				);
				if ( is_wp_error( $made ) ) {
					$state['error'] = self::fields_error( $made, true );
					$make           = false; // The rest would fail the same way; the ones found are still used.
				} else {
					$id = (string) ( $made['customField']['id'] ?? ( $made['id'] ?? '' ) );
				}
			}
			if ( '' !== $id ) {
				$ids[ $key ] = $id;
			}
		}
		$state['ids'] = $ids;
		update_option( self::FIELDS_OPTION, $state, false );
		delete_transient( 'om_crm_fields_busy' );
		return $state;
	}

	/** Why the fields couldn't be read or made, in words (with the fix). */
	private static function fields_error( $error, $making ) {
		$code = self::status( $error );
		if ( 401 === $code || 403 === $code ) {
			return $making
				? __( 'your GoHighLevel token isn\'t allowed to make custom fields. In GoHighLevel, open Settings > Private Integrations, edit this integration, tick "Edit Custom Fields" (locations/customFields.write) and save, then click "Set up the fields now" under Settings > OM Catalog > CRM.', 'om-catalog' )
				: __( 'your GoHighLevel token isn\'t allowed to see custom fields. In GoHighLevel, open Settings > Private Integrations, edit this integration, tick "View Custom Fields" and "Edit Custom Fields" (locations/customFields.readonly and .write) and save, then click "Set up the fields now" under Settings > OM Catalog > CRM.', 'om-catalog' );
		}
		return $error->get_error_message();
	}

	/**
	 * For Settings › CRM: are the fields ready in GoHighLevel?
	 *
	 * @return array { state: ok | partial | waiting | error | off, text }
	 */
	public static function fields_status() {
		if ( ! self::fields_on() ) {
			return array(
				'state' => 'off',
				'text'  => __( 'Off: the details go in the note only.', 'om-catalog' ),
			);
		}
		if ( '' === trim( (string) get_option( 'om_crm_ghl_token', '' ) ) || '' === trim( (string) get_option( 'om_crm_ghl_location', '' ) ) ) {
			return array(
				'state' => 'waiting',
				'text'  => __( 'Add your token and Location ID first.', 'om-catalog' ),
			);
		}
		$state = self::fields_state();
		$all   = count( self::field_defs() );
		$ready = count( array_intersect_key( array_filter( (array) $state['ids'] ), self::field_defs() ) );
		if ( '' !== $state['error'] && $ready === $all ) {
			// The fields kept from before still work; only checking them again didn't.
			return array(
				'state' => 'partial',
				/* translators: 1: number of fields, 2: what went wrong. */
				'text'  => sprintf( __( 'All %1$s fields are ready, but checking them again didn\'t work: %2$s', 'om-catalog' ), number_format_i18n( $all ), $state['error'] ),
			);
		}
		if ( '' !== $state['error'] ) {
			return array(
				'state' => 'error',
				/* translators: 1: number of fields ready, 2: number of fields, 3: what went wrong. */
				'text'  => sprintf( __( '%1$s of %2$s fields ready: %3$s', 'om-catalog' ), number_format_i18n( $ready ), number_format_i18n( $all ), $state['error'] ),
			);
		}
		if ( $ready === $all ) {
			return array(
				'state' => 'ok',
				/* translators: %s: number of fields. */
				'text'  => sprintf( __( 'All %s fields are ready in GoHighLevel.', 'om-catalog' ), number_format_i18n( $all ) ),
			);
		}
		return array(
			'state' => $ready ? 'partial' : 'waiting',
			'text'  => __( 'Not set up yet: they are made with the next lead, or now with the button.', 'om-catalog' ),
		);
	}

	/** Settings › CRM › "Set up the fields now". */
	public function handle_fields() {
		check_ajax_referer( 'om_crm_fields', 'nonce' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => 'Not allowed.' ), 403 );
		}
		if ( ! self::fields_on() || '' === trim( (string) get_option( 'om_crm_ghl_token', '' ) ) || '' === trim( (string) get_option( 'om_crm_ghl_location', '' ) ) ) {
			wp_send_json_error( array( 'message' => self::fields_status()['text'] ) );
		}
		self::ghl_fields( true );
		$status = self::fields_status();
		if ( 'ok' === $status['state'] ) {
			wp_send_json_success( array( 'message' => $status['text'] ) );
		}
		wp_send_json_error( array( 'message' => $status['text'] ) );
	}

	/* ---------------------------------------------------------------
	 * Webhook and log
	 * ------------------------------------------------------------- */

	/**
	 * Any webhook: the whole lead as JSON (signed when a secret is set), with
	 * the details also as simple top-level keys named like the contact fields
	 * (website_design, website_price_shown, website_page…) that a GoHighLevel
	 * workflow can map straight to fields.
	 */
	private static function send_webhook( $lead ) {
		$url     = trim( (string) get_option( 'om_crm_webhook', '' ) );
		$payload = $lead;
		unset( $payload['_test'], $payload['_only'], $payload['_sid'] );
		foreach ( array_keys( self::field_defs() ) as $key ) {
			$payload[ self::field_key( $key ) ] = '';
		}
		foreach ( self::field_values( $lead ) as $key => $value ) {
			$payload[ self::field_key( $key ) ] = (string) $value;
		}
		$payload['note'] = self::note_text( $lead );
		$json            = wp_json_encode( $payload );
		$headers         = array( 'Content-Type' => 'application/json' );
		$secret          = (string) get_option( 'om_crm_webhook_secret', '' );
		if ( '' !== $secret ) {
			$headers['X-OM-Signature'] = 'sha256=' . hash_hmac( 'sha256', $json, $secret );
		}
		$response = wp_remote_post( $url, array( 'timeout' => 15, 'headers' => $headers, 'body' => $json ) );
		if ( is_wp_error( $response ) ) {
			return $response->get_error_message();
		}
		$code = (int) wp_remote_retrieve_response_code( $response );
		return $code >= 200 && $code < 300 ? true : 'HTTP ' . $code;
	}

	/** The last 40 deliveries (Settings › CRM). */
	private static function log( $lead, $target, $result, $attempt ) {
		$log   = get_option( self::LOG_OPTION, array() );
		$log   = is_array( $log ) ? $log : array();
		$log[] = array(
			't'  => time(),
			'e'  => $lead['event'],
			'w'  => '' !== $lead['email'] ? $lead['email'] : $lead['phone'],
			'to' => $target,
			'ok' => true === $result,
			'm'  => true === $result ? '' : mb_substr( (string) $result, 0, 300 ),
			'a'  => (int) $attempt,
			'x'  => ! empty( $lead['_test'] ),
		);
		update_option( self::LOG_OPTION, array_slice( $log, -40 ), false );
	}

	/* ---------------------------------------------------------------
	 * Settings › CRM › "Send a test lead"
	 * ------------------------------------------------------------- */

	public function handle_test() {
		check_ajax_referer( 'om_crm_test', 'nonce' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => 'Not allowed.' ), 403 );
		}
		if ( 'off' === self::mode() ) {
			wp_send_json_error( array( 'message' => 'Choose where to send leads and save first.' ) );
		}
		$user = wp_get_current_user();
		$lead = self::normalize(
			array(
				'event'   => 'inquiry',
				'name'    => 'Test Lead',
				'email'   => is_email( $user->user_email ) ? $user->user_email : 'test@example.com',
				'phone'   => '',
				'subject' => 'Test from OM Catalog',
				'message' => 'This is a test lead sent from Settings › OM Catalog › CRM. You can delete it.',
				'piece'   => 'Hidden Halo Oval Engagement Ring (sample)',
				'style'   => '80285-01',
				'line'    => 'engagement-rings',
				'price'   => '$3,136',
				'options' => 'Metal: 14K White Gold · Ring size: 6.5',
				'page'    => home_url( '/' ),
				'fields'  => array( 'Ring size' => '6.5' ),
			)
		);
		$lead['_test'] = true;
		$results       = self::deliver( $lead );
		$lines         = array();
		foreach ( $results as $target => $res ) {
			if ( 'ghl' === $target ) {
				/* translators: %s: number of contact fields filled in. */
				$filled  = self::$filled ? ' ' . sprintf( _n( '(%s contact field filled in)', '(%s contact fields filled in)', self::$filled, 'om-catalog' ), number_format_i18n( self::$filled ) ) : '';
				$lines[] = 'GoHighLevel: ' . ( true === $res ? 'sent ✓' . $filled : $res );
			} else {
				$lines[] = 'Webhook: ' . ( true === $res ? 'sent ✓' : $res );
			}
		}
		$ok = ! in_array( false, array_map( static function ( $r ) { return true === $r || 0 === strpos( (string) $r, 'contact saved' ); }, $results ), true );
		if ( $ok ) {
			wp_send_json_success( array( 'message' => implode( ' · ', $lines ) ) );
		}
		wp_send_json_error( array( 'message' => $lines ? implode( ' · ', $lines ) : 'Nothing is set up to send to.' ) );
	}
}
