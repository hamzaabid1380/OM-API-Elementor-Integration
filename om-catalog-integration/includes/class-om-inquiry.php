<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * "Inquire about this piece" form for product pages and the ring builder.
 *
 * Every inquiry is saved as a private "OM Inquiry" post (visible under
 * wp-admin > Inquiries) and emailed to the address in Settings > OM
 * Catalog, so a lead is never lost to a mail problem. The form carries the
 * product's details (style number, chosen metal/colour/level/quality,
 * the price shown, a selected diamond) so the store knows exactly what the
 * customer was looking at.
 *
 * Spam protection needs no nonce (which would break on cached pages): a
 * hidden honeypot field, a minimum fill time checked against a signed
 * timestamp, and a per-visitor rate limit.
 */
class OM_Inquiry {

	const POST_TYPE = 'om_inquiry';

	/** Most inquiries one visitor (IP) can send per hour. */
	const RATE_LIMIT = 6;

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'wp_ajax_om_inquiry', array( $this, 'handle_submit' ) );
		add_action( 'wp_ajax_nopriv_om_inquiry', array( $this, 'handle_submit' ) );
		// Without JavaScript the form posts here and redirects back.
		add_action( 'admin_post_om_inquiry', array( $this, 'handle_submit' ) );
		add_action( 'admin_post_nopriv_om_inquiry', array( $this, 'handle_submit' ) );
		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( $this, 'admin_columns' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( $this, 'admin_column' ), 10, 2 );
	}

	public function register_post_type() {
		register_post_type(
			self::POST_TYPE,
			array(
				'labels'          => array(
					'name'          => __( 'Inquiries', 'om-catalog' ),
					'singular_name' => __( 'Inquiry', 'om-catalog' ),
					'all_items'     => __( 'All inquiries', 'om-catalog' ),
				),
				'public'          => false,
				'show_ui'         => true,
				'show_in_menu'    => true,
				'menu_icon'       => 'dashicons-email-alt',
				'menu_position'   => 26,
				'supports'        => array( 'title', 'editor' ),
				'capability_type' => 'post',
				'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
				'map_meta_cap'    => true,
			)
		);
	}

	public function admin_columns( $columns ) {
		return array(
			'cb'         => $columns['cb'] ?? '',
			'title'      => __( 'Inquiry', 'om-catalog' ),
			'om_contact' => __( 'Contact', 'om-catalog' ),
			'om_product' => __( 'Piece', 'om-catalog' ),
			'date'       => __( 'Date', 'om-catalog' ),
		);
	}

	public function admin_column( $column, $post_id ) {
		if ( 'om_contact' === $column ) {
			echo esc_html( trim( get_post_meta( $post_id, '_om_email', true ) . ' ' . get_post_meta( $post_id, '_om_phone', true ) ) );
		} elseif ( 'om_product' === $column ) {
			$url = get_post_meta( $post_id, '_om_url', true );
			$sku = get_post_meta( $post_id, '_om_style', true );
			echo $url ? '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener">' . esc_html( $sku ? $sku : $url ) . '</a>' : esc_html( $sku );
		}
	}

	/** A timestamp the form carries, signed so it can't be faked. */
	private static function stamp() {
		$t = (string) time();
		return $t . '.' . substr( hash_hmac( 'sha256', $t, wp_salt( 'nonce' ) . '|om_inquiry' ), 0, 16 );
	}

	private static function stamp_age( $stamp ) {
		$parts = explode( '.', (string) $stamp );
		if ( 2 !== count( $parts ) || ! hash_equals( substr( hash_hmac( 'sha256', $parts[0], wp_salt( 'nonce' ) . '|om_inquiry' ), 0, 16 ), $parts[1] ) ) {
			return -1;
		}
		return time() - (int) $parts[0];
	}

	/**
	 * Render the form.
	 *
	 * @param array $context title, style, line, url, price, diamond (lot),
	 *                       summary (free text), heading, button, open (bool),
	 *                       collapsible (bool).
	 */
	public static function render_form( $context = array() ) {
		$context = wp_parse_args(
			$context,
			array(
				'title'       => '',
				'style'       => '',
				'line'        => '',
				'url'         => '',
				'price'       => '',
				'diamond'     => '',
				'summary'     => '',
				'heading'     => __( 'Inquire about this piece', 'om-catalog' ),
				'intro'       => __( 'Questions about sizing, timing or pricing? Send us a note and we will get back to you shortly.', 'om-catalog' ),
				'button'      => __( 'Send inquiry', 'om-catalog' ),
				'collapsible' => true,
				'open'        => false,
			)
		);

		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );

		$id   = 'om-inq-' . wp_rand( 1000, 9999 );
		$sent = isset( $_GET['om_inquiry'] ) && 'sent' === $_GET['om_inquiry']; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display only.

		ob_start();
		if ( $context['collapsible'] ) {
			echo '<details class="om-inquiry"' . ( $context['open'] || $sent ? ' open' : '' ) . '><summary class="om-inquiry-toggle">' . esc_html( $context['heading'] ) . '</summary>';
		} else {
			echo '<div class="om-inquiry om-inquiry--open"><h3 class="om-inquiry-heading">' . esc_html( $context['heading'] ) . '</h3>';
		}
		?>
		<div class="om-inquiry-body">
			<?php if ( $sent ) : ?>
				<p class="om-inquiry-status is-success" role="status"><?php echo esc_html( self::success_message() ); ?></p>
			<?php endif; ?>
			<?php if ( '' !== $context['intro'] ) : ?>
				<p class="om-inquiry-intro"><?php echo esc_html( $context['intro'] ); ?></p>
			<?php endif; ?>
			<form class="om-inquiry-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" novalidate>
				<input type="hidden" name="action" value="om_inquiry" />
				<input type="hidden" name="om_t" value="<?php echo esc_attr( self::stamp() ); ?>" />
				<?php foreach ( array( 'title', 'style', 'line', 'url', 'price', 'diamond', 'summary' ) as $field ) : ?>
					<input type="hidden" name="om_ctx_<?php echo esc_attr( $field ); ?>" value="<?php echo esc_attr( $context[ $field ] ); ?>" />
				<?php endforeach; ?>
				<input type="hidden" name="om_config" value="" class="om-inquiry-config" />
				<div class="om-hp" aria-hidden="true">
					<label><?php esc_html_e( 'Leave this empty', 'om-catalog' ); ?><input type="text" name="om_website" value="" tabindex="-1" autocomplete="off" /></label>
				</div>
				<div class="om-field-row">
					<p class="om-field">
						<label for="<?php echo esc_attr( $id ); ?>-name"><?php esc_html_e( 'Name', 'om-catalog' ); ?> <span aria-hidden="true">*</span></label>
						<input id="<?php echo esc_attr( $id ); ?>-name" type="text" name="om_name" required autocomplete="name" />
					</p>
					<p class="om-field">
						<label for="<?php echo esc_attr( $id ); ?>-email"><?php esc_html_e( 'Email', 'om-catalog' ); ?> <span aria-hidden="true">*</span></label>
						<input id="<?php echo esc_attr( $id ); ?>-email" type="email" name="om_email" required autocomplete="email" inputmode="email" />
					</p>
				</div>
				<div class="om-field-row">
					<p class="om-field">
						<label for="<?php echo esc_attr( $id ); ?>-phone"><?php esc_html_e( 'Phone', 'om-catalog' ); ?></label>
						<input id="<?php echo esc_attr( $id ); ?>-phone" type="tel" name="om_phone" autocomplete="tel" inputmode="tel" />
					</p>
					<p class="om-field">
						<label for="<?php echo esc_attr( $id ); ?>-contact"><?php esc_html_e( 'Preferred contact', 'om-catalog' ); ?></label>
						<select id="<?php echo esc_attr( $id ); ?>-contact" name="om_contact">
							<option value="email"><?php esc_html_e( 'Email', 'om-catalog' ); ?></option>
							<option value="phone"><?php esc_html_e( 'Phone call', 'om-catalog' ); ?></option>
							<option value="text"><?php esc_html_e( 'Text message', 'om-catalog' ); ?></option>
						</select>
					</p>
				</div>
				<p class="om-field">
					<label for="<?php echo esc_attr( $id ); ?>-msg"><?php esc_html_e( 'Message', 'om-catalog' ); ?></label>
					<textarea id="<?php echo esc_attr( $id ); ?>-msg" name="om_message" rows="4"></textarea>
				</p>
				<p class="om-inquiry-status" role="status" aria-live="polite" hidden></p>
				<button type="submit" class="om-inquiry-submit"><?php echo esc_html( $context['button'] ); ?></button>
			</form>
		</div>
		<?php
		echo $context['collapsible'] ? '</details>' : '</div>';
		return ob_get_clean();
	}

	private static function success_message() {
		$custom = trim( (string) get_option( 'om_inquiry_success', '' ) );
		return '' !== $custom ? $custom : __( 'Thank you! Your inquiry has been sent. We will be in touch soon.', 'om-catalog' );
	}

	private function fail( $message, $ajax ) {
		if ( $ajax ) {
			wp_send_json_error( array( 'message' => $message ) );
		}
		wp_die( esc_html( $message ), esc_html__( 'Inquiry not sent', 'om-catalog' ), array( 'response' => 400, 'back_link' => true ) );
	}

	public function handle_submit() {
		$ajax = wp_doing_ajax();
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public form, see class doc.
		$f = function ( $key, $textarea = false ) {
			if ( ! isset( $_POST[ $key ] ) || ! is_scalar( $_POST[ $key ] ) ) {
				return '';
			}
			$value = wp_unslash( $_POST[ $key ] );
			return $textarea ? sanitize_textarea_field( $value ) : sanitize_text_field( $value );
		};

		// Honeypot filled or submitted faster than a person could: quietly
		// pretend success so bots learn nothing.
		$age = self::stamp_age( $f( 'om_t' ) );
		if ( '' !== $f( 'om_website' ) || $age < 3 ) {
			$this->done( $ajax, isset( $_POST['om_ctx_url'] ) && is_scalar( $_POST['om_ctx_url'] ) ? esc_url_raw( wp_unslash( $_POST['om_ctx_url'] ) ) : '' );
		}
		if ( $age > DAY_IN_SECONDS * 2 ) {
			$this->fail( __( 'This form has expired. Please reload the page and try again.', 'om-catalog' ), $ajax );
		}

		$name  = mb_substr( $f( 'om_name' ), 0, 120 );
		$email = sanitize_email( $f( 'om_email' ) );
		if ( '' === $name || ! is_email( $email ) ) {
			$this->fail( __( 'Please enter your name and a valid email address.', 'om-catalog' ), $ajax );
		}

		$ip       = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		$rate_key = 'om_inq_rate_' . md5( $ip );
		$count    = (int) get_transient( $rate_key );
		if ( $count >= self::RATE_LIMIT ) {
			$this->fail( __( 'Too many inquiries from this connection. Please call us instead, or try again later.', 'om-catalog' ), $ajax );
		}
		set_transient( $rate_key, $count + 1, HOUR_IN_SECONDS );

		$data = array(
			'name'    => $name,
			'email'   => $email,
			'phone'   => mb_substr( $f( 'om_phone' ), 0, 40 ),
			'contact' => in_array( $f( 'om_contact' ), array( 'email', 'phone', 'text' ), true ) ? $f( 'om_contact' ) : 'email',
			'message' => mb_substr( $f( 'om_message', true ), 0, 4000 ),
			'title'   => mb_substr( $f( 'om_ctx_title' ), 0, 200 ),
			'style'   => mb_substr( $f( 'om_ctx_style' ), 0, 60 ),
			'line'    => sanitize_title( $f( 'om_ctx_line' ) ),
			// Read raw: sanitize_text_field() would strip the URL's %xx escapes.
			'url'     => isset( $_POST['om_ctx_url'] ) && is_scalar( $_POST['om_ctx_url'] ) ? esc_url_raw( wp_unslash( $_POST['om_ctx_url'] ) ) : '',
			'price'   => mb_substr( $f( 'om_ctx_price' ), 0, 60 ),
			'diamond' => mb_substr( $f( 'om_ctx_diamond' ), 0, 80 ),
			'summary' => mb_substr( $f( 'om_ctx_summary', true ), 0, 1000 ),
			'config'  => mb_substr( $f( 'om_config' ), 0, 300 ),
		);
		// phpcs:enable

		$lines = array_filter(
			array(
				__( 'Piece', 'om-catalog' )             => trim( $data['title'] . ( $data['style'] ? ' (style ' . $data['style'] . ')' : '' ) ),
				__( 'Options chosen', 'om-catalog' )    => $data['config'],
				__( 'Price shown', 'om-catalog' )       => $data['price'],
				__( 'Diamond', 'om-catalog' )           => $data['diamond'],
				__( 'Ring builder', 'om-catalog' )      => $data['summary'],
				__( 'Page', 'om-catalog' )              => $data['url'],
				__( 'Name', 'om-catalog' )              => $data['name'],
				__( 'Email', 'om-catalog' )             => $data['email'],
				__( 'Phone', 'om-catalog' )             => $data['phone'],
				__( 'Preferred contact', 'om-catalog' ) => $data['contact'],
			),
			'strlen'
		);
		$body = '';
		foreach ( $lines as $label => $value ) {
			$body .= $label . ': ' . $value . "\n";
		}
		$body .= "\n" . __( 'Message', 'om-catalog' ) . ":\n" . ( '' !== $data['message'] ? $data['message'] : '—' ) . "\n";

		/* translators: 1: customer name, 2: piece. */
		$subject = sprintf( __( 'Inquiry from %1$s: %2$s', 'om-catalog' ), $data['name'], '' !== $data['title'] ? $data['title'] : __( 'general', 'om-catalog' ) );

		$post_id = wp_insert_post(
			array(
				'post_type'    => self::POST_TYPE,
				'post_status'  => 'private',
				'post_title'   => $subject,
				'post_content' => $body,
			)
		);
		if ( $post_id && ! is_wp_error( $post_id ) ) {
			foreach ( array( 'email', 'phone', 'style', 'url', 'diamond' ) as $key ) {
				update_post_meta( $post_id, '_om_' . $key, $data[ $key ] );
			}
		}

		$to = sanitize_email( (string) get_option( 'om_inquiry_email', '' ) );
		wp_mail(
			is_email( $to ) ? $to : get_option( 'admin_email' ),
			wp_specialchars_decode( $subject, ENT_QUOTES ),
			$body,
			array( 'Reply-To: ' . str_replace( array( "\r", "\n" ), '', $data['name'] ) . ' <' . $data['email'] . '>' )
		);

		$this->done( $ajax, $data['url'] );
	}

	private function done( $ajax, $return_url ) {
		if ( $ajax ) {
			wp_send_json_success( array( 'message' => self::success_message() ) );
		}
		$target = wp_validate_redirect( $return_url, home_url( '/' ) );
		wp_safe_redirect( add_query_arg( 'om_inquiry', 'sent', $target ) . '#om-inquiry' );
		exit;
	}
}
