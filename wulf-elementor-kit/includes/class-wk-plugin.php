<?php
/**
 * Boots the kit: Elementor category and widgets, assets, brand variables, site header/footer.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Plugin {

	/** @var WK_Plugin|null */
	private static $instance = null;

	/** Widget file => class. */
	const WIDGETS = array(
		'announce' => 'WK_Announce_Widget',
		'header'   => 'WK_Header_Widget',
		'hero'     => 'WK_Hero_Widget',
		'help'     => 'WK_Help_Widget',
		'tiles'    => 'WK_Tiles_Widget',
		'products' => 'WK_Products_Widget',
		'craft'    => 'WK_Craft_Widget',
		'studio'   => 'WK_Studio_Widget',
		'values'   => 'WK_Values_Widget',
		'reviews'  => 'WK_Reviews_Widget',
		'story'    => 'WK_Story_Widget',
		'fourcs'   => 'WK_Fourcs_Widget',
		'services' => 'WK_Services_Widget',
		'posts'    => 'WK_Posts_Widget',
		'visit'    => 'WK_Visit_Widget',
		'footer'   => 'WK_Footer_Widget',
	);

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		WK_Settings::init();
		WK_Booking::init();
		WK_Templates::init();
		add_action( 'plugins_loaded', array( $this, 'boot' ), 20 );
	}

	public function boot() {
		if ( ! did_action( 'elementor/loaded' ) ) {
			add_action( 'admin_notices', array( $this, 'need_elementor' ) );
			return;
		}
		add_action( 'elementor/elements/categories_registered', array( $this, 'category' ) );
		add_action( 'elementor/widgets/register', array( $this, 'widgets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ), 5 );
		add_action( 'wp_enqueue_scripts', array( $this, 'load_after_theme' ), 999 );
		add_action( 'elementor/editor/after_enqueue_styles', array( $this, 'editor_styles' ) );
		add_action( 'wp_body_open', array( $this, 'site_header' ), 5 );
		add_action( 'wp_footer', array( $this, 'site_footer' ), 5 );
		add_filter( 'hello_elementor_header_footer', array( $this, 'hide_theme_parts' ) );
		add_filter( 'body_class', array( $this, 'body_class' ) );
	}

	public function need_elementor() {
		echo '<div class="notice notice-warning"><p>' . esc_html__( 'Wulf Elementor Kit needs the Elementor plugin. Please install and activate Elementor.', 'wulf-kit' ) . '</p></div>';
	}

	public function category( $manager ) {
		$manager->add_category( 'wulf-kit', array( 'title' => __( 'Wulf Diamond Jewelers', 'wulf-kit' ), 'icon' => 'eicon-star' ) );
	}

	public function widgets( $manager ) {
		require_once WK_DIR . 'includes/class-wk-widget.php';
		foreach ( self::WIDGETS as $file => $class ) {
			require_once WK_DIR . 'widgets/class-wk-' . $file . '.php';
			$manager->register( new $class() );
		}
	}

	public function register_assets() {
		$s = WK_Settings::all();
		$deps = array();
		if ( $s['google_fonts'] ) {
			$fam = array();
			if ( $s['font_serif'] ) {
				$fam[] = 'family=' . rawurlencode( $s['font_serif'] ) . ( 'Fraunces' === $s['font_serif'] ? ':ital,opsz,wght@0,9..144,400..600;1,9..144,400' : ':ital,wght@0,400;0,500;1,400' );
			}
			if ( $s['font_sans'] ) {
				$fam[] = 'family=' . rawurlencode( $s['font_sans'] ) . ':wght@400;500;600;700';
			}
			wp_register_style( 'wulf-kit-fonts', 'https://fonts.googleapis.com/css2?' . implode( '&', $fam ) . '&display=swap', array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
			$deps[] = 'wulf-kit-fonts';
		}
		wp_register_style( 'wulf-kit', WK_URL . 'assets/css/wulf-kit.css', $deps, WK_VERSION );
		wp_add_inline_style( 'wulf-kit', self::brand_css() );
		wp_register_script( 'wulf-kit', WK_URL . 'assets/js/wulf-kit.js', array(), WK_VERSION, true );
		wp_localize_script( 'wulf-kit', 'wkConfig', self::js_config() );
		if ( $s['header_tpl'] || $s['footer_tpl'] || $s['actbar'] ) {
			// Site-wide pieces need the kit on every page.
			wp_enqueue_style( 'wulf-kit' );
			wp_enqueue_script( 'wulf-kit' );
		}
	}

	/**
	 * Print the kit's stylesheet after the theme's and Elementor's global styles, so theme link
	 * and button colours can't leak into the Wulf sections.
	 */
	public function load_after_theme() {
		$styles = wp_styles();
		if ( empty( $styles->registered['wulf-kit'] ) ) {
			return;
		}
		$themes = array( get_template_directory_uri(), get_stylesheet_directory_uri() );
		// Only the site-wide Elementor kit; page CSS (which holds your widget settings) must stay after us.
		$kit = 'elementor-post-' . (int) get_option( 'elementor_active_kit' );
		foreach ( $styles->queue as $h ) {
			if ( 'wulf-kit' === $h || empty( $styles->registered[ $h ] ) || in_array( 'wulf-kit', (array) $styles->registered[ $h ]->deps, true ) ) {
				continue;
			}
			$src = (string) $styles->registered[ $h ]->src;
			$is_theme = false;
			foreach ( $themes as $t ) {
				$is_theme = $is_theme || ( $t && 0 === strpos( $src, $t ) );
			}
			if ( $is_theme || 'elementor-frontend' === $h || $kit === $h ) {
				$styles->registered['wulf-kit']->deps[] = $h;
			}
		}
	}

	public function editor_styles() {
		wp_add_inline_style( 'elementor-editor', '.elementor-element .icon .wk-eicon{font-size:28px}' );
	}

	/** Brand settings as CSS variables on every kit wrapper. */
	public static function brand_css() {
		$s   = WK_Settings::all();
		$map = array( 'bg' => 'c_bg', 'ivory' => 'c_ivory', 'line' => 'c_line', 'ink' => 'c_ink', 'text' => 'c_text', 'sub' => 'c_sub', 'night' => 'c_night', 'gold' => 'c_gold', 'gold-deep' => 'c_gold_deep', 'gold-ink' => 'c_gold_ink' );
		$css = '';
		foreach ( $map as $var => $key ) {
			$css .= '--' . $var . ':' . $s[ $key ] . ';';
		}
		if ( $s['font_serif'] ) {
			$css .= '--serif:"' . str_replace( '"', '', $s['font_serif'] ) . '",Georgia,"Times New Roman",serif;';
		}
		if ( $s['font_sans'] ) {
			$css .= '--sans:"' . str_replace( '"', '', $s['font_sans'] ) . '",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;';
		}
		$css .= '--r:' . max( 0, (int) $s['radius'] ) . 'px;';
		$css .= '--max:' . max( 600, (int) $s['max_width'] ) . 'px;';
		return '.wk{' . $css . '}';
	}

	public static function js_config() {
		$s = WK_Settings::all();
		return array(
			'ajax'     => admin_url( 'admin-ajax.php' ),
			'nonce'    => wp_create_nonce( 'wk_front' ),
			'hours'    => WK_Settings::hours_for_js(),
			'tz'       => $s['timezone'] ? $s['timezone'] : wp_timezone_string(),
			'phone'    => $s['phone'],
			'tel'      => WK_Settings::tel(),
			'maps'     => $s['maps_url'],
			'book'     => $s['book_url'] ? $s['book_url'] : '#visit',
			'tray'     => (bool) $s['tray'],
			'actbar'   => (bool) $s['actbar'],
			'act'      => array( $s['act_call'], $s['act_book'], $s['act_dir'] ),
			'icons'    => WK_Icons::for_js(),
			'i18n'     => array(
				'openUntil'  => __( 'Open today until %s', 'wulf-kit' ),
				'opensToday' => __( 'Closed now · opens today at %s', 'wulf-kit' ),
				'opensOn'    => __( 'Closed now · opens %1$s at %2$s', 'wulf-kit' ),
				'tomorrow'   => __( 'tomorrow', 'wulf-kit' ),
				'today'      => __( 'today', 'wulf-kit' ),
				'closed'     => __( 'Closed', 'wulf-kit' ),
				'days'       => array( __( 'Sunday', 'wulf-kit' ), __( 'Monday', 'wulf-kit' ), __( 'Tuesday', 'wulf-kit' ), __( 'Wednesday', 'wulf-kit' ), __( 'Thursday', 'wulf-kit' ), __( 'Friday', 'wulf-kit' ), __( 'Saturday', 'wulf-kit' ) ),
				'saved'      => __( 'Saved to your tray. We’ll have it out for your visit.', 'wulf-kit' ),
				'removed'    => __( 'Removed from your tray.', 'wulf-kit' ),
				'trayTitle'  => __( 'Your tray', 'wulf-kit' ),
				'traySub'    => __( 'Save pieces as you browse. We\'ll set them out on a tray for your visit, so you can see and try them in person.', 'wulf-kit' ),
				'trayEmpty'  => __( 'Your tray is empty. Tap the heart on any piece to add it here.', 'wulf-kit' ),
				'trayBook'   => __( 'Book a visit to see them', 'wulf-kit' ),
				'trayKeep'   => __( 'Keep browsing', 'wulf-kit' ),
				'trayNote'   => __( 'We\'ll bring them in for your visit, usually within a few business days.', 'wulf-kit' ),
				'remove'     => __( 'Remove', 'wulf-kit' ),
				'close'      => __( 'Close', 'wulf-kit' ),
				'pieces'     => __( 'Your tray · %d piece', 'wulf-kit' ),
				'piecesN'    => __( 'Your tray · %d pieces', 'wulf-kit' ),
				'onTray'     => __( 'On your tray', 'wulf-kit' ),
				'addTray'    => __( 'Add to my tray', 'wulf-kit' ),
				'sending'    => __( 'Sending…', 'wulf-kit' ),
				'error'      => __( 'Sorry, that didn\'t send. Please call us instead.', 'wulf-kit' ),
				'badEmail'   => __( 'Please enter a valid email address.', 'wulf-kit' ),
				'subscribed' => __( 'Subscribed', 'wulf-kit' ),
			),
		);
	}

	/* ---------- Site header / footer from Elementor templates ---------- */

	private function template_on( $key ) {
		$id = (int) WK_Settings::get( $key );
		if ( ! $id || is_page_template( 'elementor_canvas' ) || 'publish' !== get_post_status( $id ) ) {
			return 0;
		}
		return $id;
	}

	public function hide_theme_parts( $show ) {
		return ( $this->template_on( 'header_tpl' ) || $this->template_on( 'footer_tpl' ) ) ? false : $show;
	}

	public function body_class( $classes ) {
		if ( $this->template_on( 'header_tpl' ) ) {
			$classes[] = 'wk-has-header';
		}
		if ( WK_Settings::get( 'actbar' ) ) {
			$classes[] = 'wk-has-actbar';
		}
		return $classes;
	}

	public function site_header() {
		$id = $this->template_on( 'header_tpl' );
		if ( $id && class_exists( '\Elementor\Plugin' ) ) {
			echo '<div class="wk-site-header">' . \Elementor\Plugin::$instance->frontend->get_builder_content_for_display( $id ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}

	public function site_footer() {
		$id = $this->template_on( 'footer_tpl' );
		if ( $id && class_exists( '\Elementor\Plugin' ) ) {
			echo '<div class="wk-site-footer">' . \Elementor\Plugin::$instance->frontend->get_builder_content_for_display( $id ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}
}
