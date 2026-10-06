<?php
/**
 * Site-wide kit settings: business details, opening hours, brand colors and fonts, site header/footer, reviews.
 * Widgets read these as their defaults, so a phone number or an hour changes everywhere at once.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Settings {

	const OPTION = 'wk_settings';

	/** @var array|null */
	private static $cache = null;

	public static function defaults() {
		return array(
			'name'          => 'Wulf Diamond Jewelers',
			'phone'         => '(219) 247-7082',
			'phone2'        => '(219) 400-7817',
			'email'         => '',
			'address'       => '10460 Broadway, Crown Point, IN 46307',
			'address_note'  => 'Crown Village · serving all of Lake County',
			'maps_url'      => 'https://www.google.com/maps/search/?api=1&query=Wulf+Diamond+Jewelers+10460+Broadway+Crown+Point+IN+46307',
			'timezone'      => 'America/Chicago',
			'hours'         => array(
				0 => array( 'closed' => '1', 'open' => '10:00', 'close' => '16:00' ),
				1 => array( 'closed' => '', 'open' => '10:00', 'close' => '18:00' ),
				2 => array( 'closed' => '', 'open' => '10:00', 'close' => '18:00' ),
				3 => array( 'closed' => '', 'open' => '10:00', 'close' => '18:00' ),
				4 => array( 'closed' => '', 'open' => '10:00', 'close' => '18:00' ),
				5 => array( 'closed' => '', 'open' => '10:00', 'close' => '18:00' ),
				6 => array( 'closed' => '', 'open' => '10:00', 'close' => '17:00' ),
			),
			'c_bg'          => '#ffffff',
			'c_ivory'       => '#f7f5f1',
			'c_line'        => '#e7e4de',
			'c_ink'         => '#0f1217',
			'c_text'        => '#262a31',
			'c_sub'         => '#5a5f67',
			'c_night'       => '#0b0e14',
			'c_gold'        => '#d6b97f',
			'c_gold_deep'   => '#b8955a',
			'c_gold_ink'    => '#7a5b24',
			'font_serif'    => 'Fraunces',
			'font_sans'     => 'Manrope',
			'google_fonts'  => '1',
			'radius'        => '10',
			'max_width'     => '1240',
			'tray'          => '1',
			'actbar'        => '1',
			'act_call'      => 'Call',
			'act_book'      => 'Book a visit',
			'act_dir'       => 'Directions',
			'book_url'      => '#visit',
			'to_om_leads'   => '1',
			'header_tpl'    => '',
			'footer_tpl'    => '',
			'google_key'    => '',
			'google_place'  => '',
			'reviews_hours' => '12',
			'om_media'      => 'https://overnightmountings.s3.amazonaws.com/',
		);
	}

	public static function all() {
		if ( null === self::$cache ) {
			$saved       = get_option( self::OPTION, array() );
			self::$cache = self::merge( self::defaults(), is_array( $saved ) ? $saved : array() );
		}
		return self::$cache;
	}

	public static function get( $key, $fallback = '' ) {
		$all = self::all();
		return isset( $all[ $key ] ) && '' !== $all[ $key ] ? $all[ $key ] : $fallback;
	}

	private static function merge( $def, $saved ) {
		foreach ( $saved as $k => $v ) {
			if ( isset( $def[ $k ] ) && is_array( $def[ $k ] ) && is_array( $v ) ) {
				$def[ $k ] = self::merge( $def[ $k ], $v );
			} elseif ( array_key_exists( $k, $def ) ) {
				$def[ $k ] = $v;
			}
		}
		return $def;
	}

	/** "(219) 247-7082" -> "tel:+12192477082". */
	public static function tel( $phone = null ) {
		$d = preg_replace( '/\D+/', '', null === $phone ? self::get( 'phone' ) : $phone );
		if ( 10 === strlen( $d ) ) {
			$d = '1' . $d;
		}
		return $d ? 'tel:+' . $d : '';
	}

	/** Hours as [day => [openHour, closeHour]] (null when closed), for the script. */
	public static function hours_for_js() {
		$out = array();
		foreach ( self::get( 'hours' ) as $d => $h ) {
			if ( ! empty( $h['closed'] ) ) {
				$out[ (int) $d ] = null;
				continue;
			}
			$out[ (int) $d ] = array( self::to_hour( $h['open'] ), self::to_hour( $h['close'] ) );
		}
		ksort( $out );
		return array_values( $out + array_fill( 0, 7, null ) );
	}

	private static function to_hour( $hm ) {
		$p = explode( ':', (string) $hm );
		return round( (int) $p[0] + ( isset( $p[1] ) ? (int) $p[1] / 60 : 0 ), 3 );
	}

	/** "10 am", "5:30 pm". */
	public static function hfmt( $hm ) {
		$p = explode( ':', (string) $hm );
		$h = (int) $p[0];
		$m = isset( $p[1] ) ? (int) $p[1] : 0;
		$s = ( $h % 12 ? $h % 12 : 12 ) . ( $m ? ':' . str_pad( (string) $m, 2, '0', STR_PAD_LEFT ) : '' );
		return $s . ( $h >= 12 ? ' pm' : ' am' );
	}

	/** One-line summary like "Mon–Fri 10–6 · Sat 10–5". */
	public static function hours_summary() {
		$days  = array( 1 => 'Mon', 2 => 'Tue', 3 => 'Wed', 4 => 'Thu', 5 => 'Fri', 6 => 'Sat', 0 => 'Sun' );
		$h     = self::get( 'hours' );
		$short = static function ( $hm ) {
			$p = explode( ':', (string) $hm );
			$x = (int) $p[0] % 12 ? (int) $p[0] % 12 : 12;
			return $x . ( ! empty( $p[1] ) && '00' !== $p[1] ? ':' . $p[1] : '' );
		};
		$groups = array();
		foreach ( $days as $d => $label ) {
			$key = empty( $h[ $d ]['closed'] ) ? $short( $h[ $d ]['open'] ) . '–' . $short( $h[ $d ]['close'] ) : '';
			if ( '' === $key ) {
				continue;
			}
			$last = count( $groups ) - 1;
			if ( $last >= 0 && $groups[ $last ]['key'] === $key && $groups[ $last ]['to'] === self::prev( $d ) ) {
				$groups[ $last ]['to'] = $d;
				$groups[ $last ]['to_l'] = $label;
			} else {
				$groups[] = array( 'key' => $key, 'from_l' => $label, 'to' => $d, 'to_l' => $label );
			}
		}
		$parts = array();
		foreach ( $groups as $g ) {
			$parts[] = ( $g['from_l'] === $g['to_l'] ? $g['from_l'] : $g['from_l'] . '–' . $g['to_l'] ) . ' ' . $g['key'];
		}
		return implode( ' · ', $parts );
	}

	private static function prev( $d ) {
		return 1 === $d ? -1 : ( 0 === $d ? 6 : $d - 1 );
	}

	/* ---------- Admin page ---------- */

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
		add_action( 'admin_init', array( __CLASS__, 'register' ) );
	}

	public static function menu() {
		add_menu_page( __( 'Wulf Kit', 'wulf-kit' ), __( 'Wulf Kit', 'wulf-kit' ), 'manage_options', 'wulf-kit', array( __CLASS__, 'page' ), 'dashicons-star-filled', 58 );
		add_submenu_page( 'wulf-kit', __( 'Kit settings', 'wulf-kit' ), __( 'Settings', 'wulf-kit' ), 'manage_options', 'wulf-kit', array( __CLASS__, 'page' ) );
	}

	public static function register() {
		register_setting( 'wk_settings', self::OPTION, array( 'sanitize_callback' => array( __CLASS__, 'sanitize' ) ) );
	}

	public static function sanitize( $in ) {
		$def = self::defaults();
		$out = array();
		foreach ( $def as $k => $v ) {
			if ( 'hours' === $k ) {
				$out['hours'] = array();
				for ( $d = 0; $d < 7; $d++ ) {
					$row               = isset( $in['hours'][ $d ] ) ? (array) $in['hours'][ $d ] : array();
					$out['hours'][ $d ] = array(
						'closed' => empty( $row['closed'] ) ? '' : '1',
						'open'   => preg_match( '/^\d{1,2}:\d{2}$/', $row['open'] ?? '' ) ? $row['open'] : $v[ $d ]['open'],
						'close'  => preg_match( '/^\d{1,2}:\d{2}$/', $row['close'] ?? '' ) ? $row['close'] : $v[ $d ]['close'],
					);
				}
				continue;
			}
			$val = $in[ $k ] ?? '';
			if ( 0 === strpos( $k, 'c_' ) ) {
				$out[ $k ] = sanitize_hex_color( $val ) ? sanitize_hex_color( $val ) : $v;
			} elseif ( in_array( $k, array( 'maps_url', 'om_media' ), true ) ) {
				$out[ $k ] = esc_url_raw( $val );
			} elseif ( 'email' === $k ) {
				$out[ $k ] = sanitize_email( $val );
			} elseif ( in_array( $k, array( 'google_fonts', 'tray', 'actbar', 'to_om_leads' ), true ) ) {
				$out[ $k ] = empty( $val ) ? '' : '1';
			} else {
				$out[ $k ] = sanitize_text_field( $val );
			}
		}
		self::$cache = null;
		return $out;
	}

	private static function field( $key, $label, $type = 'text', $help = '' ) {
		$v    = self::get( $key );
		$name = self::OPTION . '[' . $key . ']';
		echo '<tr><th scope="row"><label for="wk-' . esc_attr( $key ) . '">' . esc_html( $label ) . '</label></th><td>';
		if ( 'check' === $type ) {
			echo '<label><input type="checkbox" id="wk-' . esc_attr( $key ) . '" name="' . esc_attr( $name ) . '" value="1"' . checked( '1', self::all()[ $key ], false ) . '> ' . esc_html( $help ) . '</label>';
			$help = '';
		} elseif ( 'color' === $type ) {
			echo '<input type="text" class="wk-color" id="wk-' . esc_attr( $key ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( $v ) . '" data-default-color="' . esc_attr( self::defaults()[ $key ] ) . '">';
		} elseif ( 'template' === $type ) {
			$posts = get_posts( array( 'post_type' => 'elementor_library', 'numberposts' => 100, 'post_status' => 'publish' ) );
			echo '<select id="wk-' . esc_attr( $key ) . '" name="' . esc_attr( $name ) . '"><option value="">' . esc_html__( '— Use the theme\'s own —', 'wulf-kit' ) . '</option>';
			foreach ( $posts as $p ) {
				echo '<option value="' . (int) $p->ID . '"' . selected( (string) $p->ID, (string) self::all()[ $key ], false ) . '>' . esc_html( $p->post_title ) . '</option>';
			}
			echo '</select>';
		} else {
			echo '<input type="' . esc_attr( $type ) . '" class="regular-text" id="wk-' . esc_attr( $key ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( self::all()[ $key ] ) . '">';
		}
		if ( $help ) {
			echo '<p class="description">' . wp_kses_post( $help ) . '</p>';
		}
		echo '</td></tr>';
	}

	public static function page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker' );
		$days = array( 1 => __( 'Monday', 'wulf-kit' ), 2 => __( 'Tuesday', 'wulf-kit' ), 3 => __( 'Wednesday', 'wulf-kit' ), 4 => __( 'Thursday', 'wulf-kit' ), 5 => __( 'Friday', 'wulf-kit' ), 6 => __( 'Saturday', 'wulf-kit' ), 0 => __( 'Sunday', 'wulf-kit' ) );
		$h    = self::get( 'hours' );
		?>
		<div class="wrap wk-admin">
			<h1><?php esc_html_e( 'Wulf Kit settings', 'wulf-kit' ); ?></h1>
			<p><?php esc_html_e( 'These are used by every Wulf widget, so a change here updates the whole site. Each widget can still override colors and text in Elementor.', 'wulf-kit' ); ?></p>
			<form method="post" action="options.php">
				<?php settings_fields( 'wk_settings' ); ?>
				<h2><?php esc_html_e( 'Your business', 'wulf-kit' ); ?></h2>
				<table class="form-table" role="presentation">
					<?php
					self::field( 'name', __( 'Business name', 'wulf-kit' ) );
					self::field( 'phone', __( 'Main phone', 'wulf-kit' ) );
					self::field( 'phone2', __( 'Second phone', 'wulf-kit' ), 'text', __( 'Shown in the footer. Leave empty to hide.', 'wulf-kit' ) );
					self::field( 'address', __( 'Address', 'wulf-kit' ) );
					self::field( 'address_note', __( 'Under the address', 'wulf-kit' ) );
					self::field( 'maps_url', __( 'Directions link', 'wulf-kit' ), 'url' );
					self::field( 'email', __( 'Visit requests go to', 'wulf-kit' ), 'email', __( 'Empty uses the site admin email.', 'wulf-kit' ) );
					self::field( 'to_om_leads', __( 'Send to your CRM', 'wulf-kit' ), 'check', __( 'Also pass visit requests and sign-ups to the OM Catalog plugin\'s lead sending (GoHighLevel / webhook), when that plugin is active.', 'wulf-kit' ) );
					?>
				</table>

				<h2><?php esc_html_e( 'Opening hours', 'wulf-kit' ); ?></h2>
				<p><?php esc_html_e( 'Drives "Open today until 6 pm", the day bar and the hours list.', 'wulf-kit' ); ?></p>
				<table class="form-table" role="presentation">
					<?php foreach ( $days as $d => $label ) : ?>
						<tr><th scope="row"><?php echo esc_html( $label ); ?></th><td>
							<label><input type="checkbox" name="<?php echo esc_attr( self::OPTION ); ?>[hours][<?php echo (int) $d; ?>][closed]" value="1" <?php checked( '1', $h[ $d ]['closed'] ); ?>> <?php esc_html_e( 'Closed', 'wulf-kit' ); ?></label>
							&nbsp; <input type="time" name="<?php echo esc_attr( self::OPTION ); ?>[hours][<?php echo (int) $d; ?>][open]" value="<?php echo esc_attr( $h[ $d ]['open'] ); ?>" aria-label="<?php echo esc_attr( $label . ' opens' ); ?>">
							– <input type="time" name="<?php echo esc_attr( self::OPTION ); ?>[hours][<?php echo (int) $d; ?>][close]" value="<?php echo esc_attr( $h[ $d ]['close'] ); ?>" aria-label="<?php echo esc_attr( $label . ' closes' ); ?>">
						</td></tr>
					<?php endforeach; ?>
					<?php self::field( 'timezone', __( 'Time zone', 'wulf-kit' ), 'text', __( 'For example America/Chicago.', 'wulf-kit' ) ); ?>
				</table>

				<h2><?php esc_html_e( 'Brand colors and fonts', 'wulf-kit' ); ?></h2>
				<table class="form-table" role="presentation">
					<?php
					self::field( 'c_gold', __( 'Gold (accent)', 'wulf-kit' ), 'color' );
					self::field( 'c_gold_deep', __( 'Deep gold (lines, active)', 'wulf-kit' ), 'color' );
					self::field( 'c_gold_ink', __( 'Gold text on light', 'wulf-kit' ), 'color' );
					self::field( 'c_ink', __( 'Ink (headings, dark buttons)', 'wulf-kit' ), 'color' );
					self::field( 'c_text', __( 'Body text', 'wulf-kit' ), 'color' );
					self::field( 'c_sub', __( 'Secondary text', 'wulf-kit' ), 'color' );
					self::field( 'c_night', __( 'Dark sections', 'wulf-kit' ), 'color' );
					self::field( 'c_ivory', __( 'Ivory sections', 'wulf-kit' ), 'color' );
					self::field( 'c_line', __( 'Lines and borders', 'wulf-kit' ), 'color' );
					self::field( 'c_bg', __( 'Page background', 'wulf-kit' ), 'color' );
					self::field( 'font_serif', __( 'Heading font', 'wulf-kit' ) );
					self::field( 'font_sans', __( 'Body font', 'wulf-kit' ) );
					self::field( 'google_fonts', __( 'Load from Google Fonts', 'wulf-kit' ), 'check', __( 'Turn off if your theme or Elementor already loads these fonts.', 'wulf-kit' ) );
					self::field( 'radius', __( 'Corner radius (px)', 'wulf-kit' ), 'number' );
					self::field( 'max_width', __( 'Content width (px)', 'wulf-kit' ), 'number' );
					?>
				</table>

				<h2><?php esc_html_e( 'Site-wide pieces', 'wulf-kit' ); ?></h2>
				<table class="form-table" role="presentation">
					<?php
					self::field( 'header_tpl', __( 'Site header', 'wulf-kit' ), 'template', __( 'An Elementor template (Templates › Saved Templates) shown at the top of every page instead of the theme header. The importer creates "Wulf · Header" for you.', 'wulf-kit' ) );
					self::field( 'footer_tpl', __( 'Site footer', 'wulf-kit' ), 'template', __( 'Shown at the bottom of every page instead of the theme footer.', 'wulf-kit' ) );
					self::field( 'tray', __( 'Saved pieces tray', 'wulf-kit' ), 'check', __( 'Visitors can save pieces with the heart and bring them to their visit.', 'wulf-kit' ) );
					self::field( 'actbar', __( 'Phone action bar', 'wulf-kit' ), 'check', __( 'Call / Book / Directions bar at the bottom of the screen on phones.', 'wulf-kit' ) );
					self::field( 'act_call', __( 'Action bar: call label', 'wulf-kit' ) );
					self::field( 'act_book', __( 'Action bar: book label', 'wulf-kit' ) );
					self::field( 'act_dir', __( 'Action bar: directions label', 'wulf-kit' ) );
					self::field( 'book_url', __( 'Book a visit link', 'wulf-kit' ), 'text', __( 'Where "Book a visit" buttons go. #visit jumps to the Visit widget on the same page; use a full link for a separate page.', 'wulf-kit' ) );
					?>
				</table>

				<h2><?php esc_html_e( 'Google reviews', 'wulf-kit' ); ?></h2>
				<p><?php esc_html_e( 'Optional. With these filled in, the Reviews widget can show your live Google rating and reviews (Google shares up to 5 reviews).', 'wulf-kit' ); ?></p>
				<table class="form-table" role="presentation">
					<?php
					self::field( 'google_key', __( 'Google Places API key', 'wulf-kit' ), 'password' );
					self::field( 'google_place', __( 'Google Place ID', 'wulf-kit' ), 'text', __( 'Find it with Google\'s Place ID Finder.', 'wulf-kit' ) );
					self::field( 'reviews_hours', __( 'Refresh every (hours)', 'wulf-kit' ), 'number' );
					?>
				</table>

				<h2><?php esc_html_e( 'OM catalog media', 'wulf-kit' ); ?></h2>
				<table class="form-table" role="presentation">
					<?php self::field( 'om_media', __( 'OM media address', 'wulf-kit' ), 'url', __( 'Product widgets set to "OM style number" load photos and 360° videos from here.', 'wulf-kit' ) ); ?>
				</table>
				<?php submit_button(); ?>
			</form>
		</div>
		<script>jQuery(function($){ $('.wk-color').wpColorPicker(); });</script>
		<?php
	}
}
