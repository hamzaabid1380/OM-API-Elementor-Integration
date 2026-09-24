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

	/** Field types the form builder offers. */
	const FIELD_TYPES = array( 'text', 'email', 'tel', 'textarea', 'select', 'radio', 'checkboxes', 'checkbox', 'date', 'number' );

	/** The form a fresh install starts with. */
	public static function default_fields() {
		return array(
			array( 'key' => 'name', 'label' => __( 'Name', 'om-catalog' ), 'type' => 'text', 'required' => true, 'width' => 'half' ),
			array( 'key' => 'email', 'label' => __( 'Email', 'om-catalog' ), 'type' => 'email', 'required' => true, 'width' => 'half' ),
			array( 'key' => 'phone', 'label' => __( 'Phone', 'om-catalog' ), 'type' => 'tel', 'required' => false, 'width' => 'half' ),
			array( 'key' => 'contact', 'label' => __( 'Preferred contact', 'om-catalog' ), 'type' => 'select', 'required' => false, 'width' => 'half', 'options' => array( __( 'Email', 'om-catalog' ), __( 'Phone call', 'om-catalog' ), __( 'Text message', 'om-catalog' ) ) ),
			array( 'key' => 'message', 'label' => __( 'Message', 'om-catalog' ), 'type' => 'textarea', 'required' => false, 'width' => 'full' ),
		);
	}

	/**
	 * Clean a field list from the settings page or the Elementor widget:
	 * known types only, unique keys (derived from the label when empty),
	 * choices as a list.
	 */
	public static function normalize_fields( $raw ) {
		$out  = array();
		$seen = array();
		foreach ( (array) $raw as $field ) {
			if ( ! is_array( $field ) ) {
				continue;
			}
			$label = sanitize_text_field( (string) ( $field['label'] ?? '' ) );
			if ( '' === $label ) {
				continue;
			}
			$type = in_array( $field['type'] ?? 'text', self::FIELD_TYPES, true ) ? $field['type'] : 'text';
			$key  = sanitize_key( str_replace( array( ' ', '-' ), '_', (string) ( $field['key'] ?? '' ) ) );
			if ( '' === $key ) {
				$key = sanitize_key( str_replace( array( ' ', '-' ), '_', strtolower( remove_accents( $label ) ) ) );
			}
			$key  = '' === $key ? 'field' : substr( $key, 0, 40 );
			$base = $key;
			for ( $n = 2; isset( $seen[ $key ] ); $n++ ) {
				$key = $base . '_' . $n;
			}
			$seen[ $key ] = true;

			$options = $field['options'] ?? array();
			if ( is_string( $options ) ) {
				$options = preg_split( '/\r\n|\r|\n/', $options );
			}
			$options = array_values( array_filter( array_map( 'sanitize_text_field', (array) $options ), 'strlen' ) );

			$out[] = array(
				'key'         => $key,
				'label'       => $label,
				'type'        => $type,
				'required'    => ! empty( $field['required'] ) && 'no' !== $field['required'],
				'width'       => 'half' === ( $field['width'] ?? 'full' ) ? 'half' : 'full',
				'placeholder' => sanitize_text_field( (string) ( $field['placeholder'] ?? '' ) ),
				'options'     => $options,
			);
		}
		return $out;
	}

	/** The site-wide form (Settings > OM Catalog > Inquiry form fields). */
	public static function global_fields() {
		$saved = get_option( 'om_inquiry_fields', null );
		$list  = is_array( $saved ) ? self::normalize_fields( $saved ) : array();
		return $list ? $list : self::default_fields();
	}

	private static function sign_fields( $json ) {
		return hash_hmac( 'sha256', (string) $json, wp_salt( 'nonce' ) . '|om_inquiry_fields' );
	}

	/** One field's markup. */
	private static function render_field( $field, $prefix ) {
		$id       = $prefix . '-' . $field['key'];
		$name     = 'om_f[' . $field['key'] . ']';
		$required = $field['required'] ? ' required' : '';
		$star     = $field['required'] ? ' <span class="om-req" aria-hidden="true">*</span>' : '';
		$ph       = '' !== $field['placeholder'] ? ' placeholder="' . esc_attr( $field['placeholder'] ) . '"' : '';
		$classes  = 'om-field om-field--' . $field['type'] . ' om-field--' . $field['width'];

		if ( in_array( $field['type'], array( 'radio', 'checkboxes' ), true ) ) {
			echo '<fieldset class="' . esc_attr( $classes ) . '"' . ( $field['required'] ? ' data-om-required="1"' : '' ) . '><legend>' . esc_html( $field['label'] ) . $star . '</legend><div class="om-choice-list">'; // phpcs:ignore WordPress.Security.EscapeOutput -- $star is static markup.
			foreach ( $field['options'] as $i => $option ) {
				$input_type = 'radio' === $field['type'] ? 'radio' : 'checkbox';
				$input_name = 'radio' === $field['type'] ? $name : $name . '[]';
				printf(
					'<label class="om-choice"><input type="%s" name="%s" value="%s"%s /><span>%s</span></label>',
					esc_attr( $input_type ),
					esc_attr( $input_name ),
					esc_attr( $option ),
					( 'radio' === $field['type'] && $field['required'] && 0 === $i ) ? ' required' : '',
					esc_html( $option )
				);
			}
			echo '</div></fieldset>';
			return;
		}

		if ( 'checkbox' === $field['type'] ) {
			printf(
				'<p class="%s"><label class="om-choice"><input type="checkbox" id="%s" name="%s" value="%s"%s /><span>%s%s</span></label></p>',
				esc_attr( $classes ),
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr__( 'Yes', 'om-catalog' ),
				$required, // phpcs:ignore WordPress.Security.EscapeOutput -- static.
				esc_html( $field['label'] ),
				$star // phpcs:ignore WordPress.Security.EscapeOutput -- static.
			);
			return;
		}

		echo '<p class="' . esc_attr( $classes ) . '"><label for="' . esc_attr( $id ) . '">' . esc_html( $field['label'] ) . $star . '</label>'; // phpcs:ignore WordPress.Security.EscapeOutput -- $star is static markup.
		switch ( $field['type'] ) {
			case 'textarea':
				echo '<textarea id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '" rows="4"' . $ph . $required . '></textarea>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
				break;
			case 'select':
				echo '<select id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '"' . $required . '>'; // phpcs:ignore WordPress.Security.EscapeOutput -- static.
				if ( '' !== $field['placeholder'] || $field['required'] ) {
					echo '<option value="">' . esc_html( '' !== $field['placeholder'] ? $field['placeholder'] : __( 'Choose…', 'om-catalog' ) ) . '</option>';
				}
				foreach ( $field['options'] as $option ) {
					echo '<option value="' . esc_attr( $option ) . '">' . esc_html( $option ) . '</option>';
				}
				echo '</select>';
				break;
			default:
				$attrs = array(
					'email'  => ' type="email" autocomplete="email" inputmode="email"',
					'tel'    => ' type="tel" autocomplete="tel" inputmode="tel"',
					'date'   => ' type="date"',
					'number' => ' type="number" inputmode="decimal"',
				);
				$auto  = 'name' === $field['key'] ? ' autocomplete="name"' : '';
				echo '<input id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '"' . ( $attrs[ $field['type'] ] ?? ' type="text"' . $auto ) . $ph . $required . ' />'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
		}
		echo '</p>';
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
				// Custom field list for this form (see normalize_fields());
				// empty = the site-wide form from Settings.
				'fields'         => array(),
				// Any form shortcode (Elementor Pro Form template, Contact
				// Form 7, Gravity Forms, WPForms...) to use instead of the
				// built-in form. The script copies the product details into
				// that form's hidden fields named om_product, om_style,
				// om_price, om_options, om_url, om_diamond or om_summary.
				'custom_form'    => '',
			)
		);
		$custom_fields = self::normalize_fields( $context['fields'] );
		$fields        = $custom_fields ? $custom_fields : self::global_fields();

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
			<?php if ( '' !== trim( (string) $context['custom_form'] ) ) : ?>
				<div class="om-inquiry-custom" data-om-product="<?php echo esc_attr( wp_json_encode( array( 'product' => $context['title'], 'style' => $context['style'], 'price' => $context['price'], 'url' => $context['url'], 'diamond' => $context['diamond'], 'summary' => $context['summary'] ) ) ); ?>">
					<?php echo do_shortcode( $context['custom_form'] ); // phpcs:ignore WordPress.Security.EscapeOutput -- the site's own form plugin output. ?>
				</div>
			<?php else : ?>
			<form class="om-inquiry-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" novalidate>
				<input type="hidden" name="action" value="om_inquiry" />
				<input type="hidden" name="om_t" value="<?php echo esc_attr( self::stamp() ); ?>" />
				<?php foreach ( array( 'title', 'style', 'line', 'url', 'price', 'diamond', 'summary' ) as $field ) : ?>
					<input type="hidden" name="om_ctx_<?php echo esc_attr( $field ); ?>" value="<?php echo esc_attr( $context[ $field ] ); ?>" />
				<?php endforeach; ?>
				<input type="hidden" name="om_config" value="" class="om-inquiry-config" />
				<?php
				if ( $custom_fields ) {
					// This form's own field list, signed so the server can trust it.
					$fields_json = wp_json_encode( $custom_fields );
					echo '<input type="hidden" name="om_fields" value="' . esc_attr( $fields_json ) . '" />';
					echo '<input type="hidden" name="om_fields_sig" value="' . esc_attr( self::sign_fields( $fields_json ) ) . '" />';
				}
				?>
				<div class="om-hp" aria-hidden="true">
					<label><?php esc_html_e( 'Leave this empty', 'om-catalog' ); ?><input type="text" name="om_website" value="" tabindex="-1" autocomplete="off" /></label>
				</div>
				<div class="om-fields">
					<?php
					foreach ( $fields as $field ) {
						self::render_field( $field, $id );
					}
					?>
				</div>
				<p class="om-inquiry-status" role="status" aria-live="polite" hidden></p>
				<button type="submit" class="om-inquiry-submit"><?php echo esc_html( $context['button'] ); ?></button>
			</form>
			<?php endif; ?>
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

		// Which fields this form had: its own signed list, or the site-wide one.
		$fields = self::global_fields();
		$json   = isset( $_POST['om_fields'] ) && is_scalar( $_POST['om_fields'] ) ? (string) wp_unslash( $_POST['om_fields'] ) : '';
		$sig    = isset( $_POST['om_fields_sig'] ) && is_scalar( $_POST['om_fields_sig'] ) ? (string) wp_unslash( $_POST['om_fields_sig'] ) : '';
		if ( '' !== $json && hash_equals( self::sign_fields( $json ), $sig ) ) {
			$custom = self::normalize_fields( json_decode( $json, true ) );
			if ( $custom ) {
				$fields = $custom;
			}
		}

		$posted = isset( $_POST['om_f'] ) && is_array( $_POST['om_f'] ) ? wp_unslash( $_POST['om_f'] ) : array();
		$values = array();
		$name   = '';
		$email  = '';
		$phone  = '';
		foreach ( $fields as $field ) {
			$raw = $posted[ $field['key'] ] ?? '';
			switch ( $field['type'] ) {
				case 'checkboxes':
					$value = implode( ', ', array_intersect( array_map( 'sanitize_text_field', (array) $raw ), $field['options'] ) );
					break;
				case 'select':
				case 'radio':
					$value = in_array( sanitize_text_field( (string) $raw ), $field['options'], true ) ? sanitize_text_field( (string) $raw ) : '';
					break;
				case 'checkbox':
					$value = '' !== (string) $raw && ! is_array( $raw ) ? __( 'Yes', 'om-catalog' ) : '';
					break;
				case 'textarea':
					$value = is_scalar( $raw ) ? mb_substr( sanitize_textarea_field( (string) $raw ), 0, 4000 ) : '';
					break;
				case 'email':
					$value = is_scalar( $raw ) ? sanitize_email( (string) $raw ) : '';
					if ( '' !== trim( (string) ( is_scalar( $raw ) ? $raw : '' ) ) && ! is_email( $value ) ) {
						/* translators: %s: field label. */
						$this->fail( sprintf( __( 'Please enter a valid email address for "%s".', 'om-catalog' ), $field['label'] ), $ajax );
					}
					break;
				default:
					$value = is_scalar( $raw ) ? mb_substr( sanitize_text_field( (string) $raw ), 0, 300 ) : '';
			}
			if ( $field['required'] && '' === $value ) {
				/* translators: %s: field label. */
				$this->fail( sprintf( __( 'Please fill in "%s".', 'om-catalog' ), $field['label'] ), $ajax );
			}
			$values[ $field['key'] ] = array( $field['label'], $value );

			// Who the inquiry is from: the first email field, the "name"
			// field (or first text field) and the first phone field.
			if ( 'email' === $field['type'] && '' === $email ) {
				$email = $value;
			} elseif ( 'tel' === $field['type'] && '' === $phone ) {
				$phone = $value;
			} elseif ( 'text' === $field['type'] && ( '' === $name || 'name' === $field['key'] ) && '' !== $value ) {
				$name = 'name' === $field['key'] || '' === $name ? $value : $name;
			}
		}
		if ( '' === $name ) {
			$name = '' !== $email ? $email : __( 'Website visitor', 'om-catalog' );
		}

		$ip       = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		$rate_key = 'om_inq_rate_' . md5( $ip );
		$count    = (int) get_transient( $rate_key );
		if ( $count >= self::RATE_LIMIT ) {
			$this->fail( __( 'Too many inquiries from this connection. Please call us instead, or try again later.', 'om-catalog' ), $ajax );
		}
		set_transient( $rate_key, $count + 1, HOUR_IN_SECONDS );

		$data = array(
			'name'    => mb_substr( $name, 0, 120 ),
			'email'   => $email,
			'phone'   => $phone,
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
				__( 'Piece', 'om-catalog' )          => trim( $data['title'] . ( $data['style'] ? ' (style ' . $data['style'] . ')' : '' ) ),
				__( 'Options chosen', 'om-catalog' ) => $data['config'],
				__( 'Price shown', 'om-catalog' )    => $data['price'],
				__( 'Diamond', 'om-catalog' )        => $data['diamond'],
				__( 'Ring builder', 'om-catalog' )   => $data['summary'],
				__( 'Page', 'om-catalog' )           => $data['url'],
			),
			'strlen'
		);
		$body = '';
		foreach ( $lines as $label => $value ) {
			$body .= $label . ': ' . $value . "\n";
		}
		$body .= "\n";
		foreach ( $values as $pair ) {
			if ( '' === $pair[1] ) {
				continue;
			}
			$body .= false !== strpos( $pair[1], "\n" ) ? $pair[0] . ":\n" . $pair[1] . "\n" : $pair[0] . ': ' . $pair[1] . "\n";
		}

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
			is_email( $data['email'] ) ? array( 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>' ), '', $data['name'] ) . ' <' . $data['email'] . '>' ) : array()
		);

		// Optional confirmation to the customer.
		if ( is_email( $data['email'] ) && get_option( 'om_inquiry_autoreply', '' ) ) {
			$reply = trim( (string) get_option( 'om_inquiry_autoreply_text', '' ) );
			if ( '' === $reply ) {
				/* translators: %s: site name. */
				$reply = sprintf( __( "Thank you for your inquiry. We have received your message and will be in touch shortly.\n\n%s", 'om-catalog' ), get_bloginfo( 'name' ) );
			}
			$reply .= "\n\n---\n" . implode( "\n", array_map( function ( $label, $value ) { return $label . ': ' . $value; }, array_keys( $lines ), $lines ) );
			/* translators: %s: site name. */
			wp_mail( $data['email'], wp_specialchars_decode( sprintf( __( 'We received your inquiry — %s', 'om-catalog' ), get_bloginfo( 'name' ) ), ENT_QUOTES ), $reply );
		}

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
