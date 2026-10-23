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
		'pagehero' => 'WK_Pagehero_Widget',
		'split'    => 'WK_Split_Widget',
		'steps'    => 'WK_Steps_Widget',
		'lists'    => 'WK_Lists_Widget',
		'faq'      => 'WK_Faq_Widget',
		'cta'      => 'WK_Cta_Widget',
		'prose'    => 'WK_Prose_Widget',
		'spotlight' => 'WK_Spotlight_Widget',
		'paths'    => 'WK_Paths_Widget',
		'bookbar'  => 'WK_Bookbar_Widget',
		'quiz'     => 'WK_Quiz_Widget',
		'film'     => 'WK_Film_Widget',
		'reel'     => 'WK_Reel_Widget',
		'filmtabs' => 'WK_Filmtabs_Widget',
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
		WK_Schema::init();
		WK_Templates::init();
		WK_Sets::init();
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
		add_action( 'wp_footer', array( $this, 'om_saved_css' ), 6 );
		add_filter( 'hello_elementor_header_footer', array( $this, 'hide_theme_parts' ) );
		add_filter( 'hello_elementor_enable_skip_link', array( $this, 'theme_skip_link' ), 20 );
		add_filter( 'body_class', array( $this, 'body_class' ) );
		// Elementor › page settings (the cog): a page's own look and corners.
		add_action( 'elementor/documents/register_controls', array( $this, 'page_look_controls' ) );
		// "Ask our jeweller" (OM Catalog plugin) on the homepage and its library versions.
		add_filter( 'om_assistant_is_home', array( $this, 'assistant_is_home' ) );
		add_filter( 'om_assistant_show_here', array( $this, 'assistant_show_here' ) );
		// The OM Catalog plugin (its pages, pop-ups and hint page) wears the kit's ink and fonts.
		add_filter( 'om_catalog_style_tokens', array( $this, 'om_brand' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'om_fonts' ), 30 );
		// A "main" landmark around the content of Elementor full-width and canvas pages: screen readers
		// jump to it, and Hello Elementor's "Skip to content" link lands on it.
		foreach ( array( 'header-footer', 'canvas' ) as $tpl ) {
			add_action( 'elementor/page_templates/' . $tpl . '/before_content', array( $this, 'main_open' ) );
			add_action( 'elementor/page_templates/' . $tpl . '/after_content', array( $this, 'main_close' ) );
		}
		// After an update, Elementor rebuilds its saved CSS once, so changed widget styles apply at once.
		add_action( 'init', array( $this, 'after_update' ) );
	}

	/** @var bool */
	private $main = false;

	public function main_open() {
		if ( $this->main || ! apply_filters( 'wk_main_landmark', true ) ) {
			return;
		}
		$this->main = true;
		echo '<main' . ( 'hello-elementor' === get_template() ? ' id="content"' : '' ) . ' class="wk-main">';
	}

	public function main_close() {
		if ( $this->main ) {
			$this->main = false;
			echo '</main>';
		}
	}

	public function after_update() {
		if ( WK_VERSION === get_option( 'wk_css_version' ) ) {
			return;
		}
		update_option( 'wk_css_version', WK_VERSION );
		\Elementor\Plugin::$instance->files_manager->clear_cache();
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
		// The SimplyBook calendar in the booking panel (OM Catalog's loader and styles).
		$cal = self::booking_calendar();
		wp_register_style( 'wulf-kit', WK_URL . 'assets/css/wulf-kit.css', $cal ? array_merge( $deps, array( 'om-booking-css' ) ) : $deps, WK_VERSION );
		wp_add_inline_style( 'wulf-kit', self::brand_css() );
		// Saves go to OM Catalog's list, so its script (the list and its Saved panel) comes first.
		$js_deps = array_merge( $cal ? array( 'om-booking' ) : array(), self::om_saved() ? array( 'om-catalog-js' ) : array() );
		wp_register_script( 'wulf-kit', WK_URL . 'assets/js/wulf-kit.js', $js_deps, WK_VERSION, true );
		wp_localize_script( 'wulf-kit', 'wkConfig', self::js_config() );
		// The cinematic film (3D): only loaded on pages that use its widget. Deferred, so it never holds up the page.
		wp_register_style( 'wulf-kit-film', WK_URL . 'assets/css/wulf-film.css', array( 'wulf-kit' ), WK_VERSION );
		wp_register_script( 'wulf-kit-film', WK_URL . 'assets/js/wulf-film.js', array(), WK_VERSION, array( 'in_footer' => true, 'strategy' => 'defer' ) );
		// Contact shadows: a small add-on the film fetches itself, only on computers that run its best quality.
		wp_add_inline_script( 'wulf-kit-film', 'window.wkFilm=' . wp_json_encode( array( 'ao' => add_query_arg( 'ver', WK_VERSION, WK_URL . 'assets/js/wulf-film-ao.js' ), 'v' => WK_VERSION ) ) . ';', 'before' );
		// The brand films (video): only on pages that use their widgets.
		wp_register_style( 'wulf-kit-reel', WK_URL . 'assets/css/wulf-reel.css', array( 'wulf-kit' ), WK_VERSION );
		if ( $s['header_tpl'] || $s['footer_tpl'] || $s['actbar'] || $s['book_pill'] ) {
			// Site-wide pieces need the kit on every page.
			wp_enqueue_style( 'wulf-kit' );
			wp_enqueue_script( 'wulf-kit' );
		}
	}

	/**
	 * One saved list for the whole site: with the OM Catalog plugin's "Saved designs" on, the kit's
	 * hearts save into its list and the header button opens its Saved panel (catalog pages included).
	 * Otherwise the kit keeps its own tray.
	 */
	public static function om_saved() {
		return (bool) WK_Settings::get( 'tray' ) && class_exists( 'OM_Saved' ) && OM_Saved::enabled();
	}

	/**
	 * OM Catalog's styles for its Saved panel and messages, on kit pages that don't load them already.
	 * In the footer: nothing needs them until a visitor saves a piece or opens the list.
	 */
	public function om_saved_css() {
		if ( self::om_saved() && wp_script_is( 'wulf-kit', 'enqueued' ) && ! wp_style_is( 'om-catalog-css', 'enqueued' ) ) {
			wp_enqueue_style( 'om-catalog-css' );
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
		// The hallmark stamp (Daylight look) as a CSS string.
		$mark = trim( (string) ( $s['mark'] ?? '' ) );
		$css .= '' === $mark ? '--mark-d:none;' : '--mark:"' . addcslashes( str_replace( array( "\n", "\r" ), ' ', $mark ), '"\\' ) . '";';
		return '.wk{' . $css . '}';
	}

	/**
	 * The SimplyBook calendar for "Book" buttons and the visit form, when the
	 * OM Catalog plugin has one (Settings > OM Catalog > Inquiries) and the
	 * kit's place there isn't set to the form: mode (booking = the calendar
	 * only, both = calendar and booking form as two tabs), the calendar's
	 * markup, the tab names and which opens first. False otherwise.
	 *
	 * @param string $override A widget's own choice ('' = OM Catalog's settings).
	 * @return array|false
	 */
	public static function booking_calendar( $override = '' ) {
		if ( ! class_exists( 'OM_Booking' ) || ! method_exists( 'OM_Booking', 'mode' ) ) {
			return false;
		}
		$mode = OM_Booking::mode( 'kit', $override );
		if ( 'form' === $mode ) {
			return false;
		}
		return array(
			'mode'  => $mode,
			'html'  => OM_Booking::calendar( array(), false ),
			'book'  => OM_Booking::label( 'book' ),
			'form'  => __( 'Request a visit', 'wulf-kit' ),
			'first' => OM_Booking::first(),
		);
	}

	public static function js_config() {
		$s = WK_Settings::all();
		return array(
			'ajax'     => admin_url( 'admin-ajax.php' ),
			'nonce'    => wp_create_nonce( 'wk_front' ),
			'hours'    => WK_Settings::hours_for_js(),
			'tz'       => $s['timezone'] ? $s['timezone'] : wp_timezone_string(),
			'phone'    => $s['phone'],
			'turn'     => (float) ( $s['turn_speed'] ? $s['turn_speed'] : 0.6 ),
			'tel'      => WK_Settings::tel(),
			'maps'     => $s['maps_url'],
			'book'     => $s['book_url'] ? $s['book_url'] : '#visit',
			'tray'     => (bool) $s['tray'],
			// Saves go to OM Catalog's list (see om_saved()); otherwise the kit's own tray.
			'omSaved'  => self::om_saved(),
			// The kit's own tray can email itself as OM Catalog's saved-designs email, following that switch (Settings > OM Catalog > Look & feel).
			'trayMail' => (bool) $s['tray'] && ! self::om_saved() && class_exists( 'OM_Saved' ) && '0' !== get_option( 'om_saved_email', '1' ),
			'actbar'   => (bool) $s['actbar'],
			'pill'     => (bool) $s['book_pill'],
			'act'      => array( $s['act_call'], $s['act_book'], $s['act_dir'] ),
			'panel'    => (bool) $s['book_panel'] && ( '' === (string) $s['book_url'] || '#' === substr( (string) $s['book_url'], 0, 1 ) ),
			'track'    => (bool) $s['track'],
			'bk'       => array(
				'title'  => $s['book_title'],
				'sub'    => $s['book_sub'],
				'topics' => WK_Settings::book_topics(),
				'done'   => $s['book_done'],
				'name'   => $s['name'],
				'addr'   => $s['address'],
				'style'  => $s['book_style'],
				'img'    => $s['book_img'] ? $s['book_img'] : WK_URL . 'assets/media/showroom-tall.webp',
				'points' => array_values( array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) $s['book_points'] ) ) ) ),
				'cal'    => self::booking_calendar(),
			),
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
				'trayBook'   => __( 'Book to see them in person', 'wulf-kit' ),
				'trayKeep'   => __( 'Keep browsing', 'wulf-kit' ),
				'trayNote'   => __( 'We\'ll bring them in for your visit, usually within a few business days.', 'wulf-kit' ),
				'trayMail'   => __( 'Email me my tray', 'wulf-kit' ),
				'mailSub'    => __( 'Photos and links to every piece, in your inbox.', 'wulf-kit' ),
				'mailEmail'  => __( 'Your email', 'wulf-kit' ),
				'mailSend'   => __( 'Send', 'wulf-kit' ),
				/* translators: %s: the visitor's email address. */
				'mailSent'   => __( 'Sent to %s. Check your inbox.', 'wulf-kit' ),
				'remove'     => __( 'Remove', 'wulf-kit' ),
				'close'      => __( 'Close', 'wulf-kit' ),
				'pieces'     => __( 'Your tray · %d piece', 'wulf-kit' ),
				'piecesN'    => __( 'Your tray · %d pieces', 'wulf-kit' ),
				'onTray'     => __( 'On your tray', 'wulf-kit' ),
				'addTray'    => __( 'Add to my tray', 'wulf-kit' ),
				// Saving into OM Catalog's list.
				'savedOne'   => __( 'Your saved designs · %d design', 'wulf-kit' ),
				'savedMany'  => __( 'Your saved designs · %d designs', 'wulf-kit' ),
				/* translators: %s: design name. */
				'saveOne'    => __( 'Save %s', 'wulf-kit' ),
				/* translators: %s: design name. */
				'unsaveOne'  => __( 'Remove %s from saved', 'wulf-kit' ),
				'savedIt'    => __( 'Saved', 'wulf-kit' ),
				/* translators: %s: style number. */
				'styleN'     => __( 'style %s', 'wulf-kit' ),
				'sending'    => __( 'Sending…', 'wulf-kit' ),
				'error'      => __( 'Sorry, that didn\'t send. Please call us instead.', 'wulf-kit' ),
				'badEmail'   => __( 'Please enter a valid email address.', 'wulf-kit' ),
				'subscribed' => __( 'Subscribed', 'wulf-kit' ),
				'bkEyebrow'  => __( 'Free consultation', 'wulf-kit' ),
				'bkStep'     => __( 'Step %1$d of %2$d', 'wulf-kit' ),
				'bkQ1'       => __( 'What would you like to talk about?', 'wulf-kit' ),
				'bkQ1s'      => __( 'Choose any. Not sure yet? Just continue.', 'wulf-kit' ),
				'bkQ2'       => __( 'When suits you?', 'wulf-kit' ),
				'bkQ2s'      => __( 'Pick a day. We\'ll confirm the exact time with you.', 'wulf-kit' ),
				'bkQ3'       => __( 'Where can we reach you?', 'wulf-kit' ),
				'bkQ3s'      => __( 'So we can confirm your visit.', 'wulf-kit' ),
				'bkNext'     => __( 'Continue', 'wulf-kit' ),
				'bkBack'     => __( 'Back', 'wulf-kit' ),
				'bkSend'     => __( 'Request my visit', 'wulf-kit' ),
				'bkFlex'     => __( 'I\'m flexible', 'wulf-kit' ),
				'bkAny'      => __( 'Any time', 'wulf-kit' ),
				'bkMorning'  => __( 'Morning', 'wulf-kit' ),
				'bkMidday'   => __( 'Midday', 'wulf-kit' ),
				'bkAfter'    => __( 'Afternoon', 'wulf-kit' ),
				'bkTime'     => __( 'Time of day', 'wulf-kit' ),
				'bkDay'      => __( 'Day', 'wulf-kit' ),
				'bkName'     => __( 'Name', 'wulf-kit' ),
				'bkPhone'    => __( 'Mobile', 'wulf-kit' ),
				'bkEmail'    => __( 'Email', 'wulf-kit' ),
				'bkOpt'      => __( '(optional)', 'wulf-kit' ),
				'bkPref'     => __( 'Best way to reach you', 'wulf-kit' ),
				'bkCall'     => __( 'Call', 'wulf-kit' ),
				'bkText'     => __( 'Text', 'wulf-kit' ),
				'bkNeedName' => __( 'Please add your name.', 'wulf-kit' ),
				'bkNeedTel'  => __( 'Please add a 10-digit number.', 'wulf-kit' ),
				'bkNeedDay'  => __( 'Please pick a day, or "I\'m flexible".', 'wulf-kit' ),
				'bkLooking'  => __( 'You\'re asking about', 'wulf-kit' ),
				'bkYour'     => __( 'Your visit', 'wulf-kit' ),
				'hoursMore'  => __( 'See all hours', 'wulf-kit' ),
				'hide'       => __( 'Hide', 'wulf-kit' ),
				'hoursLess'  => __( 'Show today only', 'wulf-kit' ),
				'bkChange'   => __( 'Change', 'wulf-kit' ),
				'bkOrCall'   => __( 'Prefer to talk? Call %s', 'wulf-kit' ),
				'bkThanks'   => __( 'Thank you, %s.', 'wulf-kit' ),
				'bkBring'    => __( 'What to bring', 'wulf-kit' ),
				'bkCal'      => __( 'Add to my calendar', 'wulf-kit' ),
				'bkDir'      => __( 'Get directions', 'wulf-kit' ),
				'bkDone'     => __( 'Done', 'wulf-kit' ),
				'bkCalTitle' => __( 'Visit to %s (we\'ll confirm the time)', 'wulf-kit' ),
				'bkFlexDay'  => __( 'a day that suits you', 'wulf-kit' ),
				'filmParts'  => __( 'Parts of the film', 'wulf-kit' ),
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

	/** @var bool */
	private $skip = false;

	/**
	 * Hello Elementor prints "Skip to content" after wp_body_open, so after the kit's header and its whole
	 * menu. With the kit's header on, the kit prints that link first instead (site_header()).
	 */
	public function theme_skip_link( $show ) {
		if ( $show && 'hello-elementor' === get_template() && $this->template_on( 'header_tpl' ) && apply_filters( 'wk_skip_link_first', true ) ) {
			$this->skip = true;
			return false;
		}
		return $show;
	}

	public function assistant_is_home( $is ) {
		return $is || ( class_exists( 'WK_Pages' ) && WK_Pages::current_is_home() );
	}

	public function assistant_show_here( $show ) {
		return $show || ( WK_Settings::get( 'assistant_home' ) && class_exists( 'WK_Pages' ) && WK_Pages::current_is_home() );
	}

	/**
	 * The OM Catalog plugin follows the Elementor kit's global colours and fonts. Whatever that kit
	 * doesn't set (or still has at Elementor's starting blue and Roboto) comes from this kit instead,
	 * so product pages, the catalog's pop-ups and the "Drop a hint" page match the rest of the site.
	 * When Settings > OM Catalog uses its own colours, those stay.
	 */
	public function om_brand( $t ) {
		if ( ! is_array( $t ) || 'kit' !== ( $t['source'] ?? '' ) ) {
			return $t;
		}
		$s     = WK_Settings::all();
		$from  = (array) ( $t['elementor'] ?? array() );
		$clean = static function ( $font ) {
			return str_replace( array( '"', ';', '{', '}', '<', '>' ), '', (string) $font );
		};
		foreach ( array( 'primary' => 'c_ink', 'text' => 'c_text' ) as $key => $opt ) {
			$color = sanitize_hex_color( (string) ( $s[ $opt ] ?? '' ) );
			if ( empty( $from[ $key ] ) && $color ) {
				$t[ $key ] = $color;
			}
		}
		if ( empty( $from['heading_font'] ) && '' !== $clean( $s['font_serif'] ?? '' ) ) {
			$t['heading_font'] = '"' . $clean( $s['font_serif'] ) . '", Georgia, "Times New Roman", serif';
		}
		if ( empty( $from['body_font'] ) && '' !== $clean( $s['font_sans'] ?? '' ) ) {
			$t['body_font'] = '"' . $clean( $s['font_sans'] ) . '", system-ui, -apple-system, "Segoe UI", Arial, sans-serif';
		}
		return $t;
	}

	/** Catalog pages without any kit section still load the kit's fonts. */
	public function om_fonts() {
		if ( wp_style_is( 'om-catalog-css', 'enqueued' ) && wp_style_is( 'wulf-kit-fonts', 'registered' ) ) {
			wp_enqueue_style( 'wulf-kit-fonts' );
		}
	}

	public function body_class( $classes ) {
		if ( $this->template_on( 'header_tpl' ) ) {
			$classes[] = 'wk-has-header';
		}
		if ( WK_Settings::get( 'actbar' ) ) {
			$classes[] = 'wk-has-actbar';
		}
		if ( WK_Settings::get( 'calm_all' ) || ( is_singular() && 'calm' === get_post_meta( get_queried_object_id(), '_wk_style', true ) ) ) {
			$classes[] = 'wk-calm';
		}
		$l = self::look( is_singular() ? (int) get_queried_object_id() : 0 );
		if ( 'day' === $l['look'] ) {
			$classes[] = 'wk-day';
		}
		if ( 'round' !== $l['corners'] ) {
			$classes[] = 'wk-' . $l['corners'];
		}
		return $classes;
	}

	/**
	 * A page's look (night or day) and corner shape (round, square or cut): its own choice in Elementor's
	 * page settings, else Wulf Kit › Settings (or the design set an admin is previewing). "Automatic"
	 * corners: rounded at night, square by day.
	 *
	 * @param int $id Page ID, 0 for the site settings alone.
	 * @return array look, corners
	 */
	public static function look( $id = 0 ) {
		$ps      = $id ? get_post_meta( $id, '_elementor_page_settings', true ) : array();
		$ps      = is_array( $ps ) ? $ps : array();
		$site    = WK_Sets::site_look();
		$look    = ! empty( $ps['wk_look'] ) ? (string) $ps['wk_look'] : $site['look'];
		$look    = 'day' === $look ? 'day' : 'night';
		$corners = ! empty( $ps['wk_corners'] ) ? (string) $ps['wk_corners'] : $site['corners'];
		if ( ! in_array( $corners, array( 'round', 'square', 'cut' ), true ) ) {
			$corners = 'day' === $look ? 'square' : 'round';
		}
		if ( 'cut' === $corners && 'day' !== $look ) {
			$corners = 'square'; // Cut corners go with Daylight's cards without outlines; Night's outlines would break at the cuts.
		}
		return array( 'look' => $look, 'corners' => $corners );
	}

	/**
	 * Is the page being shown (or edited) in the Daylight look? Sections designed dark then print as
	 * "designed dark, on a light background".
	 */
	public static function is_day() {
		static $day = array();
		$id = did_action( 'wp' ) ? ( is_singular() ? (int) get_queried_object_id() : 0 ) : (int) get_the_ID();
		if ( ! isset( $day[ $id ] ) ) {
			$l          = self::look( $id );
			$day[ $id ] = 'day' === $l['look'];
		}
		return $day[ $id ];
	}

	/** Elementor › page settings: this page's own look and corners (the rest of the site keeps the kit's settings). */
	public function page_look_controls( $document ) {
		if ( ! $document instanceof \Elementor\Core\DocumentTypes\PageBase ) {
			return;
		}
		$document->start_controls_section( 'wk_look_section', array( 'label' => __( 'Wulf look', 'wulf-kit' ), 'tab' => \Elementor\Controls_Manager::TAB_SETTINGS ) );
		$document->add_control( 'wk_look', array(
			'label'   => __( 'Look', 'wulf-kit' ),
			'type'    => \Elementor\Controls_Manager::SELECT,
			'default' => '',
			'options' => array( '' => __( 'As in Wulf Kit settings', 'wulf-kit' ), 'night' => __( 'Night', 'wulf-kit' ), 'day' => __( 'Daylight', 'wulf-kit' ) ),
		) );
		$document->add_control( 'wk_corners', array(
			'label'       => __( 'Corners', 'wulf-kit' ),
			'type'        => \Elementor\Controls_Manager::SELECT,
			'default'     => '',
			'options'     => array( '' => __( 'As in Wulf Kit settings', 'wulf-kit' ), 'round' => __( 'Rounded', 'wulf-kit' ), 'square' => __( 'Square', 'wulf-kit' ), 'cut' => __( 'Cut, like a step-cut diamond', 'wulf-kit' ) ),
			'description' => __( 'For this page only, header and footer included. Cut corners go with the Daylight look; on a Night page they show square. Save, then reload the page to see a change.', 'wulf-kit' ),
		) );
		$document->end_controls_section();
	}

	public function site_header() {
		$id = $this->template_on( 'header_tpl' );
		if ( $id && class_exists( '\Elementor\Plugin' ) ) {
			if ( $this->skip ) {
				echo '<a class="skip-link screen-reader-text" href="' . esc_url( apply_filters( 'hello_elementor_skip_link_url', '#content' ) ) . '">' . esc_html__( 'Skip to content', 'wulf-kit' ) . '</a>';
			}
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
