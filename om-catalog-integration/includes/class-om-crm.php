<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sends every lead (inquiries from any form, the AI chat's "talk to our
 * team", emailed saved lists and ring designs) to a CRM: GoHighLevel
 * directly (contact upsert, tags, a note with every detail, optionally an
 * opportunity) and/or any webhook (a GHL inbound-webhook workflow,
 * Zapier, Make…). Settings › OM Catalog › CRM.
 *
 * Leads are sent after the visitor's page has its answer, retried on
 * failure, and logged.
 */
class OM_CRM {

	const GHL_BASE    = 'https://services.leadconnectorhq.com/';
	const GHL_VERSION = '2021-07-28';
	const LOG_OPTION  = 'om_crm_log';
	const SRC_COOKIE  = 'om_src';

	private static $instance = null;

	/** Leads collected during this request, sent at its end. */
	private $pending = array();

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

	/* ---------------------------------------------------------------
	 * Leads in
	 * ------------------------------------------------------------- */

	/**
	 * A lead from the site. Keys: event (inquiry|saved|design|hint), name, email,
	 * phone, subject, message, piece, style, line, price, diamond, summary,
	 * guide, chat, page, image, fields [ label => value ], items [].
	 */
	public function queue( $lead ) {
		if ( 'off' === self::mode() || ! is_array( $lead ) ) {
			return;
		}
		$lead = self::normalize( $lead );
		if ( ! self::event_on( $lead['event'] ) || ( '' === $lead['email'] && '' === $lead['phone'] ) ) {
			return;
		}
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
		self::deliver( $lead, (int) $attempt, isset( $lead['_only'] ) ? (array) $lead['_only'] : null );
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

	/** The note in the CRM: every detail of the lead, readable. */
	public static function note_text( $lead ) {
		$labels = array(
			'subject' => __( 'Subject', 'om-catalog' ),
			'piece'   => __( 'Piece', 'om-catalog' ),
			'style'   => __( 'Style number', 'om-catalog' ),
			'price'   => __( 'Price shown', 'om-catalog' ),
			'options' => __( 'Options chosen', 'om-catalog' ),
			'diamond' => __( 'Diamond', 'om-catalog' ),
			'summary' => __( 'Ring builder', 'om-catalog' ),
			'guide'   => __( 'Help me choose', 'om-catalog' ),
			'message' => __( 'Message', 'om-catalog' ),
			'page'    => __( 'Page', 'om-catalog' ),
		);
		$out = '[' . wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ) . '] ' . ( array( 'inquiry' => 'Website inquiry', 'saved' => 'Saved designs (emailed to themselves)', 'design' => 'Ring design (emailed to themselves)', 'hint' => 'Dropped a hint (sent a design to someone special)' )[ $lead['event'] ] ?? 'Website lead' ) . "\n\n";
		foreach ( $labels as $key => $label ) {
			if ( '' !== (string) $lead[ $key ] ) {
				$out .= $label . ': ' . $lead[ $key ] . "\n";
			}
		}
		foreach ( (array) $lead['fields'] as $label => $value ) {
			if ( '' !== trim( (string) $value ) && ! in_array( strtolower( (string) $label ), array( 'name', 'email', 'phone', 'message' ), true ) ) {
				$out .= $label . ': ' . $value . "\n";
			}
		}
		if ( $lead['items'] ) {
			$out .= "\n" . __( 'Designs', 'om-catalog' ) . ":\n";
			foreach ( (array) $lead['items'] as $item ) {
				$out .= '- ' . ( $item['t'] ?? '' ) . ( ! empty( $item['s'] ) ? ' (Style ' . $item['s'] . ')' : '' ) . ( ! empty( $item['u'] ) ? ' ' . $item['u'] : '' ) . "\n";
			}
		}
		if ( '' !== $lead['chat'] ) {
			$out .= "\n" . __( 'AI assistant chat', 'om-catalog' ) . ":\n" . $lead['chat'] . "\n";
		}
		if ( $lead['source'] ) {
			$out .= "\n" . __( 'Came from', 'om-catalog' ) . ': ';
			$bits = array();
			foreach ( $lead['source'] as $key => $value ) {
				$bits[] = $key . '=' . $value;
			}
			$out .= implode( ', ', $bits ) . "\n";
		}
		return mb_substr( $out, 0, 60000 );
	}

	/** GoHighLevel: upsert the contact, add tags, add the note, open an opportunity. */
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
		$res = self::ghl( 'POST', 'contacts/upsert', $contact, $token );
		if ( is_wp_error( $res ) ) {
			return 'contact: ' . $res->get_error_message();
		}
		$id = (string) ( $res['contact']['id'] ?? $res['id'] ?? '' );
		if ( '' === $id ) {
			return 'contact: no contact id returned';
		}
		$problems = array();
		if ( $lead['tags'] ) {
			$t = self::ghl( 'POST', 'contacts/' . rawurlencode( $id ) . '/tags', array( 'tags' => $lead['tags'] ), $token );
			if ( is_wp_error( $t ) ) {
				$problems[] = 'tags: ' . $t->get_error_message();
			}
		}
		$n = self::ghl( 'POST', 'contacts/' . rawurlencode( $id ) . '/notes', array( 'body' => self::note_text( $lead ) ), $token );
		if ( is_wp_error( $n ) ) {
			$problems[] = 'note: ' . $n->get_error_message();
		}
		$pipeline = trim( (string) get_option( 'om_crm_ghl_pipeline', '' ) );
		$stage    = trim( (string) get_option( 'om_crm_ghl_stage', '' ) );
		if ( 'inquiry' === $lead['event'] && '' !== $pipeline && '' !== $stage ) {
			$value = (float) preg_replace( '/[^\d.]/', '', (string) $lead['price'] );
			$opp   = array_filter(
				array(
					'pipelineId'      => $pipeline,
					'pipelineStageId' => $stage,
					'locationId'      => $location,
					'contactId'       => $id,
					'name'            => mb_substr( trim( ( '' !== $lead['piece'] ? $lead['piece'] : ( '' !== $lead['subject'] ? $lead['subject'] : 'Website inquiry' ) ) . ' — ' . ( '' !== $lead['name'] ? $lead['name'] : $lead['email'] ) ), 0, 250 ),
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

	/** One GoHighLevel API call. */
	private static function ghl( $method, $path, $body, $token ) {
		$response = wp_remote_request(
			self::GHL_BASE . $path,
			array(
				'method'  => $method,
				'timeout' => 15,
				'headers' => array(
					'Authorization' => 'Bearer ' . $token,
					'Version'       => self::GHL_VERSION,
					'Content-Type'  => 'application/json',
					'Accept'        => 'application/json',
				),
				'body'    => wp_json_encode( $body ),
			)
		);
		if ( is_wp_error( $response ) ) {
			return $response;
		}
		$code = (int) wp_remote_retrieve_response_code( $response );
		$data = json_decode( (string) wp_remote_retrieve_body( $response ), true );
		if ( $code < 200 || $code >= 300 ) {
			$msg = is_array( $data ) ? ( is_string( $data['message'] ?? null ) ? $data['message'] : ( is_array( $data['message'] ?? null ) ? implode( ', ', array_map( 'strval', $data['message'] ) ) : (string) ( $data['error'] ?? '' ) ) ) : '';
			return new WP_Error( 'om_crm_ghl', 'HTTP ' . $code . ( '' !== $msg ? ' — ' . $msg : '' ) );
		}
		return is_array( $data ) ? $data : array();
	}

	/** Any webhook: the whole lead as JSON (signed when a secret is set). */
	private static function send_webhook( $lead ) {
		$url     = trim( (string) get_option( 'om_crm_webhook', '' ) );
		$payload = $lead;
		unset( $payload['_test'], $payload['_only'] );
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
				'piece'   => 'Hidden Halo Oval Engagement Ring',
				'style'   => '80285-01',
				'price'   => '$3,136',
				'page'    => home_url( '/' ),
				'fields'  => array( 'Ring size' => '6.5' ),
			)
		);
		$lead['_test'] = true;
		$results       = self::deliver( $lead );
		$lines         = array();
		foreach ( $results as $target => $res ) {
			$lines[] = ( 'ghl' === $target ? 'GoHighLevel' : 'Webhook' ) . ': ' . ( true === $res ? 'sent ✓' : $res );
		}
		$ok = ! in_array( false, array_map( static function ( $r ) { return true === $r || 0 === strpos( (string) $r, 'contact saved' ); }, $results ), true );
		if ( $ok ) {
			wp_send_json_success( array( 'message' => implode( ' · ', $lines ) ) );
		}
		wp_send_json_error( array( 'message' => $lines ? implode( ' · ', $lines ) : 'Nothing is set up to send to.' ) );
	}
}
