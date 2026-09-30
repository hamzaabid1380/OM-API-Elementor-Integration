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
			$pair  = get_post_meta( $post_id, '_om_pair', true );
			$extra = is_array( $pair ) && ! empty( $pair['url'] ) ? '<br /><small>+ <a href="' . esc_url( $pair['url'] ) . '" target="_blank" rel="noopener">' . esc_html( $pair['title'] . ' · ' . $pair['style'] ) . '</a></small>' : '';
			$guide = (string) get_post_meta( $post_id, '_om_guide', true );
			if ( '' !== $guide ) {
				$extra .= '<br /><small>' . esc_html__( 'Help me choose:', 'om-catalog' ) . ' ' . esc_html( $guide ) . '</small>';
			}
			echo '<span>' . ( $url ? '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener">' . esc_html( $label ? $label : $url ) . '</a>' : esc_html( $label ) ) . $extra . '</span></div>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
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

	/**
	 * The subject setup for a form: choices, whether the visitor picks one,
	 * and the email subject template. Context values win over Settings.
	 *
	 * @return array [ list => string[], show => bool, tpl => string ]
	 */
	public static function subject_config( $context = array() ) {
		$list = $context['subjects'] ?? null;
		if ( null === $list ) {
			$list = (string) get_option( 'om_inquiry_subjects', "General question\nPrice request\nBook a viewing\nBridal set\nCustom design\nRing sizing" );
		}
		if ( is_string( $list ) ) {
			$list = preg_split( '/\r\n|\r|\n|,/', $list );
		}
		$list = array_values( array_unique( array_filter( array_map( static function ( $item ) { return mb_substr( sanitize_text_field( (string) $item ), 0, 80 ); }, (array) $list ), 'strlen' ) ) );
		$show = $context['subject_field'] ?? null;
		$show = null === $show ? '0' !== get_option( 'om_inquiry_subject_field', '1' ) : (bool) $show;
		$tpl  = $context['subject_tpl'] ?? null;
		$tpl  = null === $tpl || '' === trim( (string) $tpl ) ? (string) get_option( 'om_inquiry_subject_tpl', '' ) : (string) $tpl;
		return array(
			'list' => array_slice( $list, 0, 12 ),
			'show' => $show,
			'tpl'  => mb_substr( sanitize_text_field( $tpl ), 0, 200 ),
		);
	}

	/**
	 * The email subject from a template: {subject} {piece} {title} {style}
	 * {pair} {name} {email} {phone} {price} {site}. {piece} includes a
	 * paired design ("Complete the set"). Empty parts and the separators
	 * they leave behind are tidied away.
	 */
	public static function subject_line( $tpl, $data ) {
		if ( '' === trim( (string) $tpl ) ) {
			$tpl = '' !== ( $data['subject'] ?? '' ) ? '{subject}: {piece} — {name}' : __( 'New inquiry', 'om-catalog' ) . ': {piece} — {name}';
		}
		// No piece (e.g. from a listing page): "Custom design — Sam" rather
		// than naming a piece that isn't there.
		$piece = '' !== $data['title'] ? $data['title'] . ( '' !== $data['style'] ? ' (' . sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $data['style'] ) . ')' : '' ) : ( '' !== ( $data['subject'] ?? '' ) ? '' : __( 'General question', 'om-catalog' ) );
		$pair  = ! empty( $data['pair'] ) ? $data['pair']['title'] . ' (' . sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $data['pair']['style'] ) . ')' : '';
		if ( '' !== $pair && false === strpos( $tpl, '{pair}' ) ) {
			$piece .= ' + ' . $pair;
		}
		$line  = strtr(
			$tpl,
			array(
				'{subject}' => (string) ( $data['subject'] ?? '' ),
				'{piece}'   => $piece,
				'{title}'   => (string) $data['title'],
				'{style}'   => (string) $data['style'],
				'{name}'    => (string) $data['name'],
				'{email}'   => (string) $data['email'],
				'{phone}'   => (string) $data['phone'],
				'{price}'   => (string) $data['price'],
				'{pair}'    => $pair,
				'{site}'    => (string) get_bloginfo( 'name' ),
			)
		);
		$line = preg_replace( array( '/\s*[:|·]\s*(?=[—–-]\s)/u', '/^\s*[:\-—–|·]+\s*/u', '/\s*[:\-—–|·]+\s*$/u', '/\(\s*\)/', '/\s{2,}/' ), array( ' ', '', '', '', ' ' ), $line );
		return trim( (string) $line );
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
				// Ring builder "Help me choose" answers, in words.
				'guide'       => '',
				// The AI assistant chat so far (filled by the script).
				'chat'        => '',
				// A small line above the send button.
				'note'        => '',
				// A reassuring line under the send button.
				'reassure'    => '',
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
				// Subject: the choices (null = Settings list), whether the
				// visitor picks one (null = Settings), which is preselected,
				// and the email subject template (null = Settings).
				'subjects'       => null,
				'subject_field'  => null,
				'subject'        => '',
				'subject_tpl'    => null,
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
			echo '<div class="om-inquiry om-inquiry--open">' . ( '' !== trim( (string) $context['heading'] ) ? '<h3 class="om-inquiry-heading">' . esc_html( $context['heading'] ) . '</h3>' : '' );
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
				<div class="om-inquiry-custom" data-om-product="<?php echo esc_attr( wp_json_encode( array( 'product' => $context['title'], 'style' => $context['style'], 'price' => $context['price'], 'url' => $context['url'], 'diamond' => $context['diamond'], 'summary' => $context['summary'], 'guide' => $context['guide'] ) ) ); ?>">
					<?php echo do_shortcode( $context['custom_form'] ); // phpcs:ignore WordPress.Security.EscapeOutput -- the site's own form plugin output. ?>
				</div>
			<?php else : ?>
			<form class="om-inquiry-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" novalidate>
				<input type="hidden" name="action" value="om_inquiry" />
				<input type="hidden" name="om_t" value="<?php echo esc_attr( self::stamp() ); ?>" />
				<?php foreach ( array( 'title', 'style', 'line', 'url', 'price', 'diamond', 'summary', 'guide', 'chat', 'link', 'color' ) as $field ) : ?>
					<input type="hidden" name="om_ctx_<?php echo esc_attr( $field ); ?>" value="<?php echo esc_attr( $context[ $field ] ); ?>" />
				<?php endforeach; ?>
				<input type="hidden" name="om_config" value="" class="om-inquiry-config" />
				<?php // "Ask about this set": the design paired with this one (line|style), set by the script. ?>
				<input type="hidden" name="om_pair" value="" class="om-inquiry-pair" />
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
				<?php
				$subj = self::subject_config( $context );
				if ( $subj['list'] || '' !== $subj['tpl'] ) {
					// The subject setup is signed so the server can trust it.
					$subj_json = wp_json_encode( $subj );
					echo '<input type="hidden" name="om_subj_cfg" value="' . esc_attr( $subj_json ) . '" />';
					echo '<input type="hidden" name="om_subj_sig" value="' . esc_attr( self::sign_fields( 'subject|' . $subj_json ) ) . '" />';
				}
				$preselect = '' !== trim( (string) $context['subject'] ) && in_array( trim( (string) $context['subject'] ), $subj['list'], true ) ? trim( (string) $context['subject'] ) : ( $subj['list'][0] ?? '' );
				if ( $subj['list'] && ! $subj['show'] ) {
					echo '<input type="hidden" name="om_subject" value="' . esc_attr( $preselect ) . '" class="om-subject-hidden" />';
				}
				?>
				<p class="om-pair-chip" hidden><span class="om-pair-chip-label"><?php esc_html_e( 'Together with', 'om-catalog' ); ?></span> <span class="om-pair-chip-name"></span><button type="button" class="om-pair-remove" aria-label="<?php esc_attr_e( 'Remove the paired design', 'om-catalog' ); ?>">&times;</button></p>
				<div class="om-fields">
					<?php if ( $subj['list'] && $subj['show'] ) : ?>
						<fieldset class="om-field om-field--full om-field--subject">
							<legend class="om-field-label"><?php esc_html_e( 'What is it about?', 'om-catalog' ); ?></legend>
							<div class="om-subject-choices">
								<?php foreach ( $subj['list'] as $choice ) : ?>
									<label class="om-subject-choice"><input type="radio" name="om_subject" value="<?php echo esc_attr( $choice ); ?>" <?php checked( $choice, $preselect ); ?> /><span><?php echo esc_html( $choice ); ?></span></label>
								<?php endforeach; ?>
							</div>
						</fieldset>
					<?php endif; ?>
					<?php
					foreach ( $fields as $field ) {
						self::render_field( $field, $id );
					}
					?>
				</div>
				<?php if ( '' !== trim( (string) $context['note'] ) ) : ?>
					<p class="om-inquiry-note"><?php echo esc_html( $context['note'] ); ?></p>
				<?php endif; ?>
				<p class="om-inquiry-status" role="status" aria-live="polite" hidden></p>
				<button type="submit" class="om-inquiry-submit"><?php echo esc_html( $context['button'] ); ?></button>
				<?php if ( '' !== trim( (string) $context['reassure'] ) ) : ?>
					<p class="om-inquiry-reassure"><?php echo esc_html( $context['reassure'] ); ?></p>
				<?php endif; ?>
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

		// The subject: one of the signed choices (or the form's default).
		$subject     = '';
		$subject_tpl = (string) get_option( 'om_inquiry_subject_tpl', '' );
		$subj_json   = isset( $_POST['om_subj_cfg'] ) && is_scalar( $_POST['om_subj_cfg'] ) ? (string) wp_unslash( $_POST['om_subj_cfg'] ) : '';
		$subj_sig    = isset( $_POST['om_subj_sig'] ) && is_scalar( $_POST['om_subj_sig'] ) ? (string) wp_unslash( $_POST['om_subj_sig'] ) : '';
		if ( '' !== $subj_json && hash_equals( self::sign_fields( 'subject|' . $subj_json ), $subj_sig ) ) {
			$cfg         = json_decode( $subj_json, true );
			$choices     = is_array( $cfg['list'] ?? null ) ? $cfg['list'] : array();
			$subject_tpl = (string) ( $cfg['tpl'] ?? '' );
			$wanted      = $f( 'om_subject' );
			$subject     = in_array( $wanted, $choices, true ) ? $wanted : ( $choices[0] ?? '' );
		}

		$data = array(
			'subject' => $subject,
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
			'guide'   => mb_substr( $f( 'om_ctx_guide' ), 0, 300 ),
			'chat'    => mb_substr( $f( 'om_ctx_chat', true ), 0, 4000 ),
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
		// "Ask about this set": the paired design, looked up the same way.
		$data['pair'] = array();
		$pair_raw     = $f( 'om_pair' );
		if ( false !== strpos( $pair_raw, '|' ) ) {
			list( $pair_line, $pair_style ) = explode( '|', $pair_raw, 2 );
			$pair_line  = sanitize_title( $pair_line );
			$pair_style = mb_substr( trim( $pair_style ), 0, 60 );
			$paired     = '' !== $pair_line && '' !== $pair_style ? OM_API_Client::get_product_by_style( $pair_line, $pair_style ) : null;
			if ( is_array( $paired ) && ! is_wp_error( $paired ) ) {
				require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
				$data['pair'] = array(
					'title' => mb_substr( (string) ( $paired['title'] ?? $pair_style ), 0, 200 ),
					'style' => (string) ( $paired['style_number'] ?? $pair_style ),
					'url'   => om_product_url( $pair_line, (string) ( $paired['style_number'] ?? $pair_style ) ),
					'image' => om_card_images( $paired, mb_substr( $f( 'om_ctx_color' ), 0, 30 ) )[0],
				);
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
				__( 'Subject', 'om-catalog' )        => $data['subject'],
				__( 'Piece', 'om-catalog' )          => $data['title'],
				__( 'Style number', 'om-catalog' )   => $data['style'],
				__( 'Options chosen', 'om-catalog' ) => $data['config'],
				__( 'Price shown', 'om-catalog' )    => $data['price'],
				__( 'Diamond', 'om-catalog' )        => $data['diamond'],
				__( 'Ring builder', 'om-catalog' )   => $data['summary'],
				__( 'Help me choose', 'om-catalog' ) => $data['guide'],
				__( 'Assistant chat', 'om-catalog' ) => '' !== $data['chat'] ? "\n" . $data['chat'] : '',
				__( 'Page', 'om-catalog' )          => $data['link'],
				__( 'Together with', 'om-catalog' )  => $data['pair'] ? $data['pair']['title'] . ' (' . sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $data['pair']['style'] ) . ') ' . $data['pair']['url'] : '',
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

		$subject = self::subject_line( $subject_tpl, $data );
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
			foreach ( array( 'email', 'phone', 'style', 'url', 'link', 'image', 'title', 'diamond', 'subject', 'guide' ) as $key ) {
				update_post_meta( $post_id, '_om_' . $key, $data[ $key ] );
			}
			if ( $data['pair'] ) {
				update_post_meta( $post_id, '_om_pair', $data['pair'] );
			}
			if ( class_exists( 'OM_Stats' ) ) {
				OM_Stats::add( 'inquiry', '' !== $data['line'] && '' !== $data['style'] ? $data['line'] . '|' . strtoupper( $data['style'] ) : '(general)' );
				if ( '' !== $data['subject'] ) {
					OM_Stats::add( 'inquiry_subject', $data['subject'] );
				}
			}
		}

		$headers = array();
		if ( is_email( $data['email'] ) ) {
			$headers[] = 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', ',', '"' ), '', $data['name'] ) . ' <' . $data['email'] . '>';
		}
		$vars = self::email_vars( $data, $subject );
		// To the shop (Settings › Emails › New inquiry).
		OM_Emails::send( 'inquiry_shop', OM_Emails::shop_address(), $vars, self::email_details( $data, $values, false ), (string) $data['link'], $headers );
		// The customer's confirmation, when switched on.
		if ( is_email( $data['email'] ) ) {
			OM_Emails::send( 'inquiry_customer', $data['email'], $vars, self::email_details( $data, array(), true ), (string) $data['link'], array( 'Reply-To: ' . OM_Emails::shop_address() ) );
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

	/** Placeholder values for the inquiry emails (see OM_Emails). */
	public static function email_vars( $data, $subject_line = '' ) {
		return array(
			'customer_name'   => (string) ( $data['name'] ?? '' ),
			'customer_email'  => (string) ( $data['email'] ?? '' ),
			'customer_phone'  => (string) ( $data['phone'] ?? '' ),
			'inquiry_subject' => '' !== (string) ( $data['subject'] ?? '' ) ? (string) $data['subject'] : __( 'New inquiry', 'om-catalog' ),
			'subject_line'    => wp_specialchars_decode( (string) $subject_line, ENT_QUOTES ),
			'piece'           => (string) ( $data['title'] ?? '' ),
			'style'           => (string) ( $data['style'] ?? '' ),
			'price'           => (string) ( $data['price'] ?? '' ),
		);
	}

	/**
	 * The inquiry's automatic block for its emails: the piece (photo,
	 * title, style number, options, price, link), a paired design and — for
	 * the shop — the customer's answers. Tables and inline styles.
	 *
	 * @param array $data     See handle_submit().
	 * @param array $values   Form answers: key => [ label, value ].
	 * @param bool  $customer Copy for the customer (no answers, no notes).
	 */
	public static function email_details( $data, $values, $customer = false ) {
		$primary = class_exists( 'OM_Emails' ) ? OM_Emails::design()['brand'] : '#00111C';
		$serif   = 'font-family:Georgia,"Times New Roman",serif;';
		$font    = 'font-family:Helvetica,Arial,sans-serif;';
		$muted   = $font . 'color:#6e6e6e;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;';
		$details = array_filter(
			array(
				__( 'Options', 'om-catalog' )        => $data['config'] ?? '',
				__( 'Price shown', 'om-catalog' )    => $data['price'] ?? '',
				__( 'Diamond', 'om-catalog' )        => $data['diamond'] ?? '',
				__( 'Ring builder', 'om-catalog' )   => $data['summary'] ?? '',
				// For the shop only.
				__( 'Help me choose', 'om-catalog' ) => $customer ? '' : ( $data['guide'] ?? '' ),
				__( 'Assistant chat', 'om-catalog' ) => $customer ? '' : ( $data['chat'] ?? '' ),
			),
			'strlen'
		);
		$html = '';
		if ( '' !== (string) ( $data['title'] ?? '' ) ) {
			$html .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee;border-radius:10px;">';
			if ( '' !== (string) ( $data['image'] ?? '' ) ) {
				$html .= '<tr><td align="center" style="padding:20px;background:#fafafa;"><a href="' . esc_url( $data['link'] ) . '"><img src="' . esc_url( $data['image'] ) . '" width="240" alt="' . esc_attr( $data['title'] ) . '" style="display:block;width:100%;max-width:240px;height:auto;border:0;"></a></td></tr>';
			}
			$html .= '<tr><td valign="top" style="padding:18px 20px;' . $font . '">';
			if ( '' !== (string) ( $data['style'] ?? '' ) ) {
				/* translators: %s: style number. */
				$html .= '<div style="' . $muted . '">' . esc_html( sprintf( __( 'Style %s', 'om-catalog' ), $data['style'] ) ) . '</div>';
			}
			$html .= '<div style="' . $serif . 'font-size:20px;line-height:1.3;color:' . esc_attr( $primary ) . ';margin:6px 0 10px;">' . esc_html( $data['title'] ) . '</div>';
			foreach ( $details as $label => $value ) {
				$html .= '<div style="font-size:13px;line-height:1.5;margin:0 0 4px;color:#464646;"><span style="color:#6e6e6e;">' . esc_html( $label ) . ':</span> ' . nl2br( esc_html( $value ) ) . '</div>';
			}
			if ( '' !== (string) ( $data['link'] ?? '' ) ) {
				$html .= '<div style="font-size:11px;color:#6e6e6e;margin-top:10px;word-break:break-all;"><a href="' . esc_url( $data['link'] ) . '" style="color:#6e6e6e;">' . esc_html( $data['link'] ) . '</a></div>';
			}
			$html .= '</td></tr></table>';
		} elseif ( $details ) {
			foreach ( $details as $label => $value ) {
				$html .= '<div style="' . $font . 'font-size:13px;line-height:1.5;margin:0 0 6px;color:#464646;"><span style="color:#6e6e6e;">' . esc_html( $label ) . ':</span> ' . nl2br( esc_html( $value ) ) . '</div>';
			}
		}
		if ( ! empty( $data['pair'] ) ) {
			$html .= '<div style="' . $muted . 'margin:18px 0 8px;">' . esc_html__( 'Together with', 'om-catalog' ) . '</div>'
				. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee;border-radius:10px;"><tr>'
				. ( '' !== $data['pair']['image'] ? '<td width="110" valign="middle" style="padding:12px;background:#fafafa;"><a href="' . esc_url( $data['pair']['url'] ) . '"><img src="' . esc_url( $data['pair']['image'] ) . '" width="86" alt="' . esc_attr( $data['pair']['title'] ) . '" style="display:block;width:86px;height:auto;border:0;"></a></td>' : '' )
				/* translators: %s: style number. */
				. '<td valign="middle" style="padding:12px 18px;' . $font . '"><div style="' . $muted . '">' . esc_html( sprintf( __( 'Style %s', 'om-catalog' ), $data['pair']['style'] ) ) . '</div>'
				. '<div style="' . $serif . 'font-size:17px;line-height:1.3;margin:4px 0 0;"><a href="' . esc_url( $data['pair']['url'] ) . '" style="color:' . esc_attr( $primary ) . ';text-decoration:none;">' . esc_html( $data['pair']['title'] ) . '</a></div></td>'
				. '</tr></table>';
		}
		if ( ! $customer && $values ) {
			$rows = '';
			foreach ( $values as $pair ) {
				if ( '' === $pair[1] ) {
					continue;
				}
				$rows .= '<tr><td valign="top" style="padding:8px 12px 8px 0;border-top:1px solid #f0f0f0;color:#6e6e6e;width:34%;' . $font . 'font-size:14px;">' . esc_html( $pair[0] ) . '</td><td valign="top" style="padding:8px 0;border-top:1px solid #f0f0f0;color:#222222;' . $font . 'font-size:14px;line-height:1.5;">' . nl2br( esc_html( $pair[1] ) ) . '</td></tr>';
			}
			if ( '' !== $rows ) {
				$html .= '<div style="' . $muted . 'margin:18px 0 8px;">' . esc_html__( 'Their message', 'om-catalog' ) . '</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $rows . '</table>';
			}
		}
		return $html;
	}

	/**
	 * The inquiry as a whole email (kept for anything that called it).
	 *
	 * @param array $data     See handle_submit().
	 * @param array $values   Form answers.
	 * @param bool  $customer The customer's confirmation instead of the shop's email.
	 */
	public static function email_html( $data, $values, $customer = false, $message = '' ) {
		unset( $message );
		return OM_Emails::render( $customer ? 'inquiry_customer' : 'inquiry_shop', self::email_vars( $data ), self::email_details( $data, $values, $customer ), (string) ( $data['link'] ?? '' ) )['html'];
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
