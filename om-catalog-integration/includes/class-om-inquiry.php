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
			$url   = get_post_meta( $post_id, '_om_link', true );
			$url   = $url ? $url : get_post_meta( $post_id, '_om_url', true );
			$sku   = (string) get_post_meta( $post_id, '_om_style', true );
			$title = (string) get_post_meta( $post_id, '_om_title', true );
			$img   = (string) get_post_meta( $post_id, '_om_image', true );
			echo '<div style="display:flex;gap:10px;align-items:center;">';
			if ( $img ) {
				echo '<img src="' . esc_url( $img ) . '" alt="" width="44" height="44" style="object-fit:cover;border:1px solid #ddd;background:#fff;" />';
			}
			$label = trim( $title . ( $sku ? ' · ' . $sku : '' ) );
			echo '<span>' . ( $url ? '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener">' . esc_html( $label ? $label : $url ) . '</a>' : esc_html( $label ) ) . '</span></div>';
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
				// Filled by the script at send time: the page URL with the
				// options chosen, and the metal colour (for the right photo).
				'link'        => '',
				'color'       => '',
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
				<?php foreach ( array( 'title', 'style', 'line', 'url', 'price', 'diamond', 'summary', 'link', 'color' ) as $field ) : ?>
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

		// The piece as Overnight Mountings has it (cached lookup), rather
		// than what the browser sent: the real title, page and photo, which
		// a spammer can't swap for their own text or links.
		$data['image'] = '';
		$data['link']  = $data['url'];
		if ( '' !== $data['line'] && '' !== $data['style'] ) {
			$product = OM_API_Client::get_product_by_style( $data['line'], $data['style'] );
			if ( is_array( $product ) && ! is_wp_error( $product ) ) {
				require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
				$data['image'] = om_card_images( $product, mb_substr( $f( 'om_ctx_color' ), 0, 30 ) )[0];
				// A plain product inquiry: OM's title and product page. (Ring
				// builder / diamond inquiries keep their own title and link.)
				if ( '' === $data['diamond'] && '' === $data['summary'] ) {
					$data['url']  = om_product_url( $data['line'], $data['style'] );
					$data['link'] = $data['url'];
					if ( ! empty( $product['title'] ) ) {
						$data['title'] = mb_substr( (string) $product['title'], 0, 200 );
					}
				}
			}
		}
		// The page with the customer's options (?om_metal=…), when it is
		// that same page on this site.
		$link = isset( $_POST['om_ctx_link'] ) && is_scalar( $_POST['om_ctx_link'] ) ? esc_url_raw( wp_unslash( $_POST['om_ctx_link'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( '' !== $link && '' !== $data['url']
			&& wp_parse_url( $link, PHP_URL_HOST ) === wp_parse_url( home_url(), PHP_URL_HOST )
			&& untrailingslashit( (string) wp_parse_url( $link, PHP_URL_PATH ) ) === untrailingslashit( (string) wp_parse_url( $data['url'], PHP_URL_PATH ) ) ) {
			$data['link'] = $link;
		}

		$lines = array_filter(
			array(
				__( 'Piece', 'om-catalog' )          => $data['title'],
				__( 'Style number', 'om-catalog' )   => $data['style'],
				__( 'Options chosen', 'om-catalog' ) => $data['config'],
				__( 'Price shown', 'om-catalog' )    => $data['price'],
				__( 'Diamond', 'om-catalog' )        => $data['diamond'],
				__( 'Ring builder', 'om-catalog' )   => $data['summary'],
				__( 'Page', 'om-catalog' )           => $data['link'],
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

		$piece = '' !== $data['title'] ? $data['title'] . ( '' !== $data['style'] ? ' (' . sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $data['style'] ) . ')' : '' ) : __( 'General question', 'om-catalog' );
		/* translators: 1: piece and style number, 2: customer name. */
		$subject = sprintf( __( 'New inquiry: %1$s — %2$s', 'om-catalog' ), $piece, $data['name'] );
		/**
		 * Filters the inquiry email subject.
		 *
		 * @param string $subject
		 * @param array  $data    title, style, url, link, price, name, email…
		 */
		$subject = (string) apply_filters( 'om_inquiry_subject', $subject, $data );

		$post_id = wp_insert_post(
			array(
				'post_type'    => self::POST_TYPE,
				'post_status'  => 'private',
				'post_title'   => $subject,
				'post_content' => $body,
			)
		);
		if ( $post_id && ! is_wp_error( $post_id ) ) {
			foreach ( array( 'email', 'phone', 'style', 'url', 'link', 'image', 'title', 'diamond' ) as $key ) {
				update_post_meta( $post_id, '_om_' . $key, $data[ $key ] );
			}
		}

		$to      = sanitize_email( (string) get_option( 'om_inquiry_email', '' ) );
		$headers = array( 'Content-Type: text/html; charset=UTF-8' );
		if ( is_email( $data['email'] ) ) {
			$headers[] = 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', ',', '"' ), '', $data['name'] ) . ' <' . $data['email'] . '>';
		}
		self::send_html(
			is_email( $to ) ? $to : get_option( 'admin_email' ),
			wp_specialchars_decode( $subject, ENT_QUOTES ),
			self::email_html( $data, $values, false ),
			$body,
			$headers
		);

		// Optional confirmation to the customer.
		if ( is_email( $data['email'] ) && get_option( 'om_inquiry_autoreply', '' ) ) {
			$reply = trim( (string) get_option( 'om_inquiry_autoreply_text', '' ) );
			if ( '' === $reply ) {
				/* translators: %s: site name. */
				$reply = sprintf( __( "Thank you for your inquiry. We have received your message and will be in touch shortly.\n\n%s", 'om-catalog' ), get_bloginfo( 'name' ) );
			}
			$reply_text = $reply . "\n\n---\n" . implode( "\n", array_map( function ( $label, $value ) { return $label . ': ' . $value; }, array_keys( $lines ), $lines ) );
			self::send_html(
				$data['email'],
				/* translators: %s: site name. */
				wp_specialchars_decode( sprintf( __( 'We received your inquiry — %s', 'om-catalog' ), get_bloginfo( 'name' ) ), ENT_QUOTES ),
				self::email_html( $data, array(), true, $reply ),
				$reply_text,
				array( 'Content-Type: text/html; charset=UTF-8' )
			);
		}

		$this->done( $ajax, $data['url'] );
	}

	/** Send an HTML email with a plain-text alternative. */
	private static function send_html( $to, $subject, $html, $text, $headers ) {
		$alt = static function ( $mailer ) use ( $text ) {
			$mailer->AltBody = $text; // phpcs:ignore WordPress.NamingConventions.ValidVariableName -- PHPMailer property.
		};
		add_action( 'phpmailer_init', $alt );
		$sent = wp_mail( $to, $subject, $html, $headers );
		remove_action( 'phpmailer_init', $alt );
		return $sent;
	}

	/**
	 * The inquiry as an email: the piece (photo, title, style number,
	 * options, price, a button to the exact configuration) and the
	 * customer's answers. Tables and inline styles, so it looks right in
	 * Gmail, Outlook and Apple Mail alike.
	 *
	 * @param array  $data     See handle_submit().
	 * @param array  $values   Form answers: key => [ label, value ].
	 * @param bool   $customer Copy for the customer (no answers table).
	 * @param string $message  Text above the piece (customer copy).
	 */
	public static function email_html( $data, $values, $customer = false, $message = '' ) {
		$primary = sanitize_hex_color( (string) get_option( 'om_color_primary', '' ) );
		$primary = $primary ? $primary : '#00111C';
		$site    = get_bloginfo( 'name' );
		$font    = 'font-family:Helvetica,Arial,sans-serif;';
		$serif   = 'font-family:Georgia,"Times New Roman",serif;';
		$muted   = 'color:#8a8a8a;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;';

		$details = array_filter(
			array(
				__( 'Options', 'om-catalog' )      => $data['config'] ?? '',
				__( 'Price shown', 'om-catalog' )  => $data['price'] ?? '',
				__( 'Diamond', 'om-catalog' )      => $data['diamond'] ?? '',
				__( 'Ring builder', 'om-catalog' ) => $data['summary'] ?? '',
			),
			'strlen'
		);

		ob_start();
		?>
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title><?php echo esc_html( $site ); ?></title></head>
<body style="margin:0;padding:0;background:#f4f3f1;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f1;"><tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;<?php echo $font; // phpcs:ignore WordPress.Security.EscapeOutput -- fixed string. ?>color:#464646;">
	<tr><td style="padding:28px 32px 18px;border-bottom:1px solid #eeeeee;">
		<div style="<?php echo $muted; // phpcs:ignore WordPress.Security.EscapeOutput ?>"><?php echo esc_html( $site ); ?></div>
		<div style="<?php echo $serif; // phpcs:ignore WordPress.Security.EscapeOutput ?>font-size:24px;color:<?php echo esc_attr( $primary ); ?>;margin-top:6px;">
			<?php echo esc_html( $customer ? __( 'Thank you for your inquiry', 'om-catalog' ) : __( 'New inquiry', 'om-catalog' ) ); ?>
		</div>
		<?php if ( ! $customer ) : ?>
			<div style="font-size:14px;margin-top:6px;"><?php echo esc_html( sprintf( /* translators: %s: customer name. */ __( 'From %s', 'om-catalog' ), $data['name'] ) ); ?><?php echo '' !== $data['email'] ? ' &middot; <a href="mailto:' . esc_attr( $data['email'] ) . '" style="color:' . esc_attr( $primary ) . ';">' . esc_html( $data['email'] ) . '</a>' : ''; ?><?php echo '' !== $data['phone'] ? ' &middot; <a href="tel:' . esc_attr( preg_replace( '/[^0-9+]/', '', $data['phone'] ) ) . '" style="color:' . esc_attr( $primary ) . ';">' . esc_html( $data['phone'] ) . '</a>' : ''; ?></div>
		<?php endif; ?>
	</td></tr>
	<?php if ( $customer && '' !== trim( $message ) ) : ?>
		<tr><td style="padding:24px 32px 0;font-size:15px;line-height:1.6;"><?php echo nl2br( esc_html( $message ) ); ?></td></tr>
	<?php endif; ?>
	<?php if ( '' !== $data['title'] ) : ?>
	<tr><td style="padding:24px 32px;">
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee;">
			<?php if ( '' !== $data['image'] ) : ?>
				<tr><td align="center" style="padding:20px;background:#fafafa;">
					<a href="<?php echo esc_url( $data['link'] ); ?>"><img src="<?php echo esc_url( $data['image'] ); ?>" width="260" alt="<?php echo esc_attr( $data['title'] ); ?>" style="display:block;width:100%;max-width:260px;height:auto;border:0;"></a>
				</td></tr>
			<?php endif; ?>
			<tr><td valign="top" style="padding:20px 22px;">
				<?php if ( '' !== $data['style'] ) : ?>
					<div style="<?php echo $muted; // phpcs:ignore WordPress.Security.EscapeOutput ?>"><?php echo esc_html( sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $data['style'] ) ); ?></div>
				<?php endif; ?>
				<div style="<?php echo $serif; // phpcs:ignore WordPress.Security.EscapeOutput ?>font-size:20px;line-height:1.3;color:<?php echo esc_attr( $primary ); ?>;margin:6px 0 12px;"><?php echo esc_html( $data['title'] ); ?></div>
				<?php foreach ( $details as $label => $value ) : ?>
					<div style="font-size:13px;line-height:1.5;margin:0 0 4px;"><span style="color:#8a8a8a;"><?php echo esc_html( $label ); ?>:</span> <?php echo nl2br( esc_html( $value ) ); ?></div>
				<?php endforeach; ?>
				<?php if ( '' !== $data['link'] ) : ?>
					<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:14px;"><tr><td style="background:<?php echo esc_attr( $primary ); ?>;">
						<a href="<?php echo esc_url( $data['link'] ); ?>" style="display:inline-block;padding:11px 20px;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;"><?php esc_html_e( 'View this piece', 'om-catalog' ); ?></a>
					</td></tr></table>
					<div style="font-size:11px;color:#8a8a8a;margin-top:8px;word-break:break-all;"><a href="<?php echo esc_url( $data['link'] ); ?>" style="color:#8a8a8a;"><?php echo esc_html( $data['link'] ); ?></a></div>
				<?php endif; ?>
			</td></tr>
		</table>
	</td></tr>
	<?php endif; ?>
	<?php if ( ! $customer && $values ) : ?>
	<tr><td style="padding:<?php echo '' !== $data['title'] ? '0' : '24px'; ?> 32px 24px;">
		<div style="<?php echo $muted; // phpcs:ignore WordPress.Security.EscapeOutput ?>margin-bottom:8px;"><?php esc_html_e( 'Their message', 'om-catalog' ); ?></div>
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5;">
			<?php foreach ( $values as $pair ) : ?>
				<?php if ( '' === $pair[1] ) { continue; } ?>
				<tr>
					<td valign="top" style="padding:8px 12px 8px 0;border-top:1px solid #f0f0f0;color:#8a8a8a;width:34%;"><?php echo esc_html( $pair[0] ); ?></td>
					<td valign="top" style="padding:8px 0;border-top:1px solid #f0f0f0;color:#222222;"><?php echo nl2br( esc_html( $pair[1] ) ); ?></td>
				</tr>
			<?php endforeach; ?>
		</table>
	</td></tr>
	<?php endif; ?>
	<tr><td style="padding:16px 32px 26px;border-top:1px solid #eeeeee;font-size:12px;color:#8a8a8a;line-height:1.5;">
		<?php
		echo esc_html(
			$customer
				/* translators: %s: site name. */
				? sprintf( __( '%s — we will be in touch shortly.', 'om-catalog' ), $site )
				: ( '' !== $data['email']
					/* translators: %s: customer name. */
					? sprintf( __( 'Reply to this email to answer %s directly. Saved under Inquiries in your dashboard.', 'om-catalog' ), $data['name'] )
					: __( 'Saved under Inquiries in your dashboard.', 'om-catalog' ) )
		);
		?>
	</td></tr>
</table>
</td></tr></table>
</body></html>
		<?php
		return (string) ob_get_clean();
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
