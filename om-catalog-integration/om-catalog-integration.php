<?php
/**
 * Plugin Name: Overnight Mountings Catalog Integration
 * Description: Pulls live product & diamond data from the Overnight Mountings Product Catalog API and displays it on the WordPress site via shortcodes and Elementor widgets. Includes an admin settings page for credentials, pricing markup, and brand colors/fonts.
 * Version: 1.32.0
 * Author: Wulf Diamond Jewelers / Carpe Diem
 * Text Domain: om-catalog
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

define( 'OM_CATALOG_VERSION', '1.32.0' );
define( 'OM_CATALOG_DIR', plugin_dir_path( __FILE__ ) );
define( 'OM_CATALOG_URL', plugin_dir_url( __FILE__ ) );

require_once OM_CATALOG_DIR . 'includes/functions-pricing.php';
require_once OM_CATALOG_DIR . 'includes/class-om-api-client.php';
require_once OM_CATALOG_DIR . 'includes/class-om-settings.php';
require_once OM_CATALOG_DIR . 'includes/class-om-rewrites.php';
require_once OM_CATALOG_DIR . 'includes/class-om-shortcodes.php';
require_once OM_CATALOG_DIR . 'includes/class-om-ajax.php';
require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
require_once OM_CATALOG_DIR . 'includes/functions-elementor.php';
require_once OM_CATALOG_DIR . 'includes/class-om-search.php';
require_once OM_CATALOG_DIR . 'includes/class-om-engage.php';
require_once OM_CATALOG_DIR . 'includes/class-om-saved.php';
require_once OM_CATALOG_DIR . 'includes/class-om-assistant.php';
require_once OM_CATALOG_DIR . 'includes/class-om-emails.php';
require_once OM_CATALOG_DIR . 'includes/class-om-inquiry.php';
require_once OM_CATALOG_DIR . 'includes/class-om-diamonds.php';
require_once OM_CATALOG_DIR . 'includes/class-om-diamond-guide.php';
require_once OM_CATALOG_DIR . 'includes/class-om-ring-builder.php';
require_once OM_CATALOG_DIR . 'includes/class-om-related.php';
require_once OM_CATALOG_DIR . 'includes/class-om-reels.php';
require_once OM_CATALOG_DIR . 'includes/class-om-stats.php';
require_once OM_CATALOG_DIR . 'includes/class-om-warmer.php';
require_once OM_CATALOG_DIR . 'includes/class-om-elementor-widgets.php';

/**
 * Boot the plugin.
 */
function om_catalog_init() {
	load_plugin_textdomain( 'om-catalog', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

	OM_Settings::instance();
	OM_Rewrites::instance();
	OM_Shortcodes::instance();
	OM_Ajax::instance();
	OM_Search::instance();
	OM_Engage::instance();
	OM_Saved::instance();
	OM_Assistant::instance();
	OM_Emails::instance();
	OM_Inquiry::instance();
	OM_Diamonds::instance();
	OM_Ring_Builder::instance();
	OM_Related::instance();
	OM_Reels::instance();
	OM_Stats::instance();
	OM_Warmer::instance();
	OM_Elementor_Widgets::instance();
}
add_action( 'plugins_loaded', 'om_catalog_init' );

/**
 * Register front-end assets and enqueue them only where the catalog appears:
 * single product pages, and pages containing the shortcode or an OM Elementor
 * widget. The grid also enqueues them when it renders (in a sidebar, a theme
 * template, ...), and the Elementor widgets declare them as dependencies.
 */
function om_catalog_enqueue_assets() {
	wp_register_style( 'om-catalog-css', OM_CATALOG_URL . 'assets/css/om-catalog.build.css', array(), OM_CATALOG_VERSION );
	$tokens = om_catalog_style_tokens();
	if ( 'kit' === $tokens['source'] ) {
		// The kit's fonts load through Elementor (Google or self-hosted, as
		// the kit is configured); this handle only exists for dependencies.
		wp_register_style( 'om-catalog-fonts', false, array(), OM_CATALOG_VERSION );
	} else {
		wp_register_style(
			'om-catalog-fonts',
			'https://fonts.googleapis.com/css?family=Arapey:400,400italic,500,600|Inter:300,400,500,600&display=swap',
			array(),
			null
		);
	}
	wp_register_script( 'om-catalog-js', OM_CATALOG_URL . 'assets/js/om-product.js', array( 'jquery' ), OM_CATALOG_VERSION, true );

	wp_localize_script(
		'om-catalog-js',
		'omCatalog',
		array(
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
			'i18n'    => array(
				'gallery'   => __( 'Image gallery', 'om-catalog' ),
				'close'     => __( 'Close', 'om-catalog' ),
				'prev'      => __( 'Previous image', 'om-catalog' ),
				'next'      => __( 'Next image', 'om-catalog' ),
				'error'     => __( 'Something went wrong. Please try again.', 'om-catalog' ),
				'noMatches' => __( 'No matching designs', 'om-catalog' ),
				'seeAll'    => __( 'See all results', 'om-catalog' ),
				'style'     => __( 'Style', 'om-catalog' ),
				'quickView' => __( 'Quick view', 'om-catalog' ),
				'unmute'    => __( 'Turn sound on', 'om-catalog' ),
				'mute'      => __( 'Turn sound off', 'om-catalog' ),
				'sizeUnsure' => __( 'not sure — please help', 'om-catalog' ),
				'viewed'     => __( 'Recently viewed', 'om-catalog' ),
				'stories'    => __( 'Video stories', 'om-catalog' ),
				'storyOf'    => __( 'Story %1$s of %2$s', 'om-catalog' ),
				'pause'      => __( 'Pause', 'om-catalog' ),
				'play'       => __( 'Play', 'om-catalog' ),
				'soundOn'    => __( 'Turn sound on', 'om-catalog' ),
				'soundOff'   => __( 'Turn sound off', 'om-catalog' ),
				'prevStory'  => __( 'Previous', 'om-catalog' ),
				'nextStory'  => __( 'Next', 'om-catalog' ),
				'backTo'     => __( 'Back to %s', 'om-catalog' ),
				'backResults' => __( 'Back to results', 'om-catalog' ),
				'searchHelp' => __( 'Search suggestions', 'om-catalog' ),
				'recent'     => __( 'Recent searches', 'om-catalog' ),
				'popular'    => __( 'Popular searches', 'om-catalog' ),
				'clearRecent' => __( 'Clear', 'om-catalog' ),
				'removeSearch' => __( 'Remove', 'om-catalog' ),
				'copied'     => __( 'Copied', 'om-catalog' ),
				'zoom'       => __( 'Zoom', 'om-catalog' ),
				'zoomIn'     => __( 'Zoom in', 'om-catalog' ),
				'zoomOut'    => __( 'Zoom out', 'om-catalog' ),
				'compare'    => __( 'Compare', 'om-catalog' ),
				/* translators: %d: number of designs. */
				'compareMany' => __( '%d designs side by side', 'om-catalog' ),
				'compareOne' => __( '1 design', 'om-catalog' ),
				'compareDiff' => __( 'Highlight differences', 'om-catalog' ),
				'clearAll'   => __( 'Clear all', 'om-catalog' ),
				'prevDesign' => __( 'Previous design', 'om-catalog' ),
				'nextDesign' => __( 'Next design', 'om-catalog' ),
				/* translators: 1: position, 2: total. */
				'designOf'   => __( '%1$s of %2$s', 'om-catalog' ),
				'share'      => __( 'Share', 'om-catalog' ),
				'shareLink'  => __( 'Share link', 'om-catalog' ),
				'linkCopied' => __( 'Link copied', 'om-catalog' ),
				'undo'       => __( 'Undo', 'om-catalog' ),
				'rbWelcome'  => __( 'Welcome back — continue', 'om-catalog' ),
				'tsEyebrow'  => __( 'True size', 'om-catalog' ),
				'tsCompare'  => __( 'Compare carats', 'om-catalog' ),
				'tsTrue'     => __( 'True size', 'om-catalog' ),
				'tsZoom'     => __( 'Close-up ×3', 'om-catalog' ),
				'tsFinger'   => __( 'Ring size', 'om-catalog' ),
				'tsCheck'    => __( 'Screen check (once)', 'om-catalog' ),
				'tsCheckText' => __( 'Hold any bank card against the screen and drag the slider until the outline matches it. Sizes are then exact on this device.', 'om-catalog' ),
				'tsCheckRange' => __( 'Card outline size', 'om-catalog' ),
				'tsCheckDone' => __( 'Done — save for this device', 'om-catalog' ),
				'tsSaved'    => __( 'Saved. Sizes are exact on this screen.', 'om-catalog' ),
				/* translators: %s: ring size. */
				'tsOnFinger' => __( 'on a size %s finger', 'om-catalog' ),
				'tsTypical'  => __( 'Typical size for this carat', 'om-catalog' ),
				'tsScaleZoom' => __( 'Close-up — 3× real size', 'om-catalog' ),
				'tsScaleExact' => __( 'Real size on this screen', 'om-catalog' ),
				'tsScaleApprox' => __( 'About real size — do the screen check for exact', 'om-catalog' ),
				'tsThis'     => __( 'This one', 'om-catalog' ),
				'rbEmailBad' => __( 'Please enter a valid email address.', 'om-catalog' ),
				'filtersCleared' => __( 'Filters cleared', 'om-catalog' ),
				/* translators: %s: filter name. */
				'filterRemoved' => __( 'Removed %s', 'om-catalog' ),
				'compareCleared' => __( 'Compare list cleared', 'om-catalog' ),
				'compareNow' => __( 'Compare now', 'om-catalog' ),
				'compareMore' => __( 'Add one more', 'om-catalog' ),
				'compareFull' => __( 'You can compare up to 4 designs.', 'om-catalog' ),
				'compareAdded' => __( 'Added to compare', 'om-catalog' ),
				'compareRemoved' => __( 'Removed from compare', 'om-catalog' ),
				'inLine'     => __( 'in %s', 'om-catalog' ),
				'saved'      => __( 'Saved', 'om-catalog' ),
				'savedTitle' => __( 'Saved designs', 'om-catalog' ),
				'savedAdded' => __( 'Saved', 'om-catalog' ),
				'savedRemoved' => __( 'Removed from saved', 'om-catalog' ),
				'savedView'  => __( 'View saved', 'om-catalog' ),
				'savedEmpty' => __( 'Nothing saved yet. Tap the heart on any design to keep it here — it stays on this device, no account needed.', 'om-catalog' ),
				'savedShare' => __( 'Share list', 'om-catalog' ),
				'savedCompare' => __( 'Compare', 'om-catalog' ),
				'savedCompareHint' => __( 'Compare the first 4', 'om-catalog' ),
				'savedEmailMe' => __( 'Email me my list', 'om-catalog' ),
				'savedEmailIntro' => __( 'We will send the photos and links to your inbox.', 'om-catalog' ),
				'savedYourEmail' => __( 'Your email', 'om-catalog' ),
				'savedYourName' => __( 'Your name (optional)', 'om-catalog' ),
				'savedSend'  => __( 'Send', 'om-catalog' ),
				'savedClear' => __( 'Clear list', 'om-catalog' ),
				'savedCleared' => __( 'Saved list cleared', 'om-catalog' ),
				/* translators: %d: number of designs. */
				'savedShared' => __( '%d shared designs added to your saved list', 'om-catalog' ),
				'savedFull'  => __( 'Your list is full (24). Remove one to save another.', 'om-catalog' ),
				/* translators: %s: design name. */
				'savedRemove' => __( 'Remove %s', 'om-catalog' ),
				/* translators: %s: design name. */
				'saveThis'   => __( 'Save %s', 'om-catalog' ),
				/* translators: %s: design name. */
				'unsaveThis' => __( 'Remove %s from saved', 'om-catalog' ),
				'sending'    => __( 'Sending…', 'om-catalog' ),
				'aiPlaceholder' => __( 'Ask about rings, diamonds, sizes…', 'om-catalog' ),
				'aiSend'     => __( 'Send', 'om-catalog' ),
				'aiClose'    => __( 'Close chat', 'om-catalog' ),
				'aiTeam'     => __( 'Talk to our team', 'om-catalog' ),
				'aiBack'     => __( 'Back to chat', 'om-catalog' ),
				'aiThinking' => __( 'Thinking…', 'om-catalog' ),
				'aiRestart'  => __( 'New chat', 'om-catalog' ),
				'aiError'    => __( 'Sorry — that didn’t go through. Please try again.', 'om-catalog' ),
				'aiView'     => __( 'View', 'om-catalog' ),
				'aiSubtitle' => __( 'Usually replies in seconds', 'om-catalog' ),
				'aiYou'      => __( 'You', 'om-catalog' ),
				/* translators: %s: style number. */
				'styleN'     => __( 'Style %s', 'om-catalog' ),
			),
			'cardHover' => (string) get_option( 'om_card_hover', 'lift' ),
			'refined'   => 'refined' === om_design(),
			'pageTransitions' => '0' !== get_option( 'om_page_transitions', '1' ),
			// True size: the screen check and "About real size" note.
			'tsCheck'         => '0' !== get_option( 'om_true_size_check', '1' ),
			// Saved designs (hearts) and "Email me my list".
			'saved'           => OM_Saved::enabled(),
			'savedEmail'      => '0' !== get_option( 'om_saved_email', '1' ),
			'savedFloat'      => '0' !== get_option( 'om_saved_float', '1' ),
			// Analytics events to the site's own GA4 / GTM / Meta pixel.
			'track'           => '0' !== get_option( 'om_analytics', '1' ),
			'trackMeta'       => '0' !== get_option( 'om_analytics_meta', '1' ),
			// Admins can watch the events in the browser console: ?om_debug_events=1
			'trackDebug'      => isset( $_GET['om_debug_events'] ) && current_user_can( 'manage_options' ), // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display only.
			'currency'        => (string) apply_filters( 'om_analytics_currency', 'USD' ),
			// "Ask our jeweller" chat (false when switched off).
			'assistant'       => OM_Assistant::front_config(),
			'popular'   => om_popular_searches(),
		)
	);

	// Inline CSS variables: brand colours and fonts, from the Elementor kit
	// or the plugin's own settings (Settings > OM Catalog).
	$primary      = $tokens['primary'];
	$accent       = $tokens['accent'];
	$background   = $tokens['background'];
	$text         = $tokens['text'];
	$heading_font = $tokens['heading_font'];
	$body_font    = $tokens['body_font'];

	$css_vars = ":root{
		--om-color-primary: {$primary};
		--om-color-accent: {$accent};
		--om-color-background: {$background};
		--om-color-text: {$text};
		--om-font-heading: {$heading_font};
		--om-font-body: {$body_font};
	}";
	wp_add_inline_style( 'om-catalog-css', $css_vars . om_catalog_look_css() );

	if ( om_catalog_page_needs_assets() ) {
		wp_enqueue_style( 'om-catalog-css' );
		// The theme's Google Fonts, for pages the Elementor kit doesn't cover
		// (plugin-rendered product pages use the theme's plain header).
		wp_enqueue_style( 'om-catalog-fonts' );
		wp_enqueue_script( 'om-catalog-js' );
		// Kit mode: make sure the kit's fonts load here too (plugin-rendered
		// product pages aren't Elementor pages).
		foreach ( $tokens['kit_fonts'] as $font ) {
			\Elementor\Plugin::$instance->frontend->enqueue_font( $font );
		}
	}
}
add_action( 'wp_enqueue_scripts', 'om_catalog_enqueue_assets' );

/**
 * Brand colours and fonts for the catalog.
 *
 * "kit" (the default when Elementor is active) follows the site's Elementor
 * kit — Site Settings > Global Colors / Global Fonts — so the catalog
 * changes with the rest of the site: Primary, Accent and Text colours and
 * the Primary (headings) and Text (body) fonts. Anything the kit doesn't
 * set falls back to the plugin's own values.
 *
 * @return array
 */
function om_catalog_style_tokens() {
	static $tokens = null;
	if ( null !== $tokens ) {
		return $tokens;
	}

	$clean_font = function ( $font ) {
		return str_replace( array( ';', '{', '}', '<', '>', '"' ), '', (string) $font );
	};
	$hex = function ( $color, $fallback ) {
		$color = sanitize_hex_color( (string) $color );
		return $color ? $color : $fallback;
	};

	$tokens = array(
		'source'       => 'custom',
		'primary'      => $hex( get_option( 'om_color_primary', '#00111C' ), '#00111C' ),
		'accent'       => $hex( get_option( 'om_color_accent', '#000000' ), '#000000' ),
		'background'   => $hex( get_option( 'om_color_background', '#ffffff' ), '#ffffff' ),
		'text'         => $hex( get_option( 'om_color_text', '#464646' ), '#464646' ),
		'heading_font' => $clean_font( get_option( 'om_font_heading', 'Arapey, Georgia, serif' ) ),
		'body_font'    => $clean_font( get_option( 'om_font_body', 'Inter, Helvetica, Arial, sans-serif' ) ),
		'kit_fonts'    => array(),
	);

	$source = get_option( 'om_style_source', 'kit' );
	if ( 'kit' !== $source || ! did_action( 'elementor/loaded' ) || ! class_exists( '\\Elementor\\Plugin' ) ) {
		return $tokens;
	}
	$kits = \Elementor\Plugin::$instance->kits_manager ?? null;
	$kit  = $kits ? $kits->get_active_kit_for_frontend() : null;
	if ( ! $kit ) {
		return $tokens;
	}

	$settings = (array) $kit->get_settings();
	$colors   = array();
	foreach ( (array) ( $settings['system_colors'] ?? array() ) as $item ) {
		if ( ! empty( $item['_id'] ) && ! empty( $item['color'] ) ) {
			$colors[ $item['_id'] ] = $item['color'];
		}
	}
	$fonts = array();
	foreach ( (array) ( $settings['system_typography'] ?? array() ) as $item ) {
		if ( ! empty( $item['_id'] ) && ! empty( $item['typography_font_family'] ) ) {
			$fonts[ $item['_id'] ] = $item['typography_font_family'];
		}
	}

	$tokens['source']  = 'kit';
	$tokens['primary'] = $hex( $colors['primary'] ?? '', $tokens['primary'] );
	$tokens['accent']  = $hex( $colors['accent'] ?? '', $tokens['accent'] );
	$tokens['text']    = $hex( $colors['text'] ?? '', $tokens['text'] );
	if ( ! empty( $fonts['primary'] ) ) {
		$tokens['heading_font'] = '"' . $clean_font( $fonts['primary'] ) . '", ' . $tokens['heading_font'];
		$tokens['kit_fonts'][]  = $fonts['primary'];
	}
	if ( ! empty( $fonts['text'] ) ) {
		$tokens['body_font']   = '"' . $clean_font( $fonts['text'] ) . '", ' . $tokens['body_font'];
		$tokens['kit_fonts'][] = $fonts['text'];
	}
	$tokens['kit_fonts'] = array_unique( $tokens['kit_fonts'] );

	return $tokens;
}

/**
 * Look & feel settings as CSS variables: corner radii, spacing scale and
 * phone text sizes. Empty settings keep the stylesheet's defaults.
 */
/** The site's design (Settings > Look & feel): refined, modern or classic. */
function om_design() {
	$design = (string) get_option( 'om_design', 'refined' );
	return in_array( $design, array( 'refined', 'modern', 'classic' ), true ) ? $design : 'refined';
}

/** " om-refined" when the site uses the Refined design (for rows and pop-ups). */
function om_refined_class() {
	return 'refined' === om_design() ? ' om-refined' : '';
}

function om_catalog_look_css() {
	$px = static function ( $option ) {
		$value = get_option( $option, '' );
		return '' === (string) $value ? null : max( 0, min( 60, (int) $value ) ) . 'px';
	};
	$space = array( 'compact' => '0.8', 'comfortable' => '1', 'airy' => '1.3' );
	$vars  = array(
		'--om-radius'    => $px( 'om_radius' ),
		'--om-radius-lg' => $px( 'om_radius_lg' ),
		'--om-space'     => $space[ get_option( 'om_spacing', 'comfortable' ) ] ?? '1',
	);
	$phone = array(
		'--om-m-title'      => $px( 'om_m_title' ),
		'--om-m-card-title' => $px( 'om_m_card_title' ),
		'--om-m-body'       => $px( 'om_m_body' ),
	);
	$line = static function ( $list ) {
		$out = '';
		foreach ( $list as $name => $value ) {
			if ( null !== $value ) {
				$out .= $name . ':' . $value . ';';
			}
		}
		return $out;
	};
	// Refined design tokens (widgets can override them on their own box).
	$hex    = static function ( $option, $default ) {
		$value = sanitize_hex_color( (string) get_option( $option, $default ) );
		return $value ? $value : $default;
	};
	$shapes = array( 'pill' => '999px', 'soft' => '10px', 'square' => '0px' );
	$vars  += array(
		'--om-btn-radius'  => $shapes[ get_option( 'om_button_shape', 'pill' ) ] ?? '999px',
		'--om-gold'        => $hex( 'om_color_gold', '#B8925A' ),
		'--om-gold-light'  => $hex( 'om_color_gold_light', '#F4DC9C' ),
		'--om-photo-tone'  => $hex( 'om_photo_tone', '#F3EFE8' ),
		'--om-photo-blend' => '0' === get_option( 'om_photo_blend', '1' ) ? 'normal' : 'multiply',
	);
	$css = ':root{' . $line( $vars ) . '}';
	// Smooth page transitions between listing and product pages (browsers
	// with cross-document view transitions; others navigate as usual).
	if ( '0' !== get_option( 'om_page_transitions', '1' ) ) {
		$css .= '@view-transition{navigation:auto}::view-transition-old(root),::view-transition-new(root){animation-duration:.28s}::view-transition-group(om-hero){animation-duration:.42s;animation-timing-function:cubic-bezier(.22,1,.36,1)}@media (prefers-reduced-motion:reduce){@view-transition{navigation:none}}';
	}
	if ( '' !== $line( $phone ) ) {
		$css .= '@media (max-width:600px){:root{' . $line( $phone ) . '}}';
	}
	return $css;
}

/**
 * Popular searches: the admin's list, topped up (when enabled) with what
 * visitors search most. At most 8.
 *
 * @return string[]
 */
function om_popular_searches() {
	$list = array_filter( array_map( 'trim', explode( ',', (string) get_option( 'om_popular_searches', '' ) ) ), 'strlen' );
	if ( count( $list ) < 8 && '0' !== get_option( 'om_track_searches', '1' ) ) {
		$counts = get_option( 'om_search_counts', array() );
		if ( is_array( $counts ) ) {
			arsort( $counts );
			foreach ( $counts as $query => $n ) {
				if ( $n >= 3 && ! in_array( mb_strtolower( $query ), array_map( 'mb_strtolower', $list ), true ) ) {
					$list[] = mb_strtoupper( mb_substr( (string) $query, 0, 1 ) ) . mb_substr( (string) $query, 1 );
				}
				if ( count( $list ) >= 8 ) {
					break;
				}
			}
		}
	}
	return array_values( array_slice( $list, 0, 8 ) );
}

/**
 * Count a visitor search (for "popular searches"). Kept small: the 50
 * most frequent queries of 2–40 characters.
 */
function om_record_search( $query ) {
	$query = trim( mb_strtolower( preg_replace( '/\s+/', ' ', (string) $query ) ) );
	if ( class_exists( 'OM_Stats' ) && mb_strlen( $query ) >= 2 ) {
		OM_Stats::add( 'search', $query );
	}
	if ( '0' === get_option( 'om_track_searches', '1' ) || mb_strlen( $query ) < 2 || mb_strlen( $query ) > 40 ) {
		return;
	}
	$counts = get_option( 'om_search_counts', array() );
	$counts = is_array( $counts ) ? $counts : array();
	$counts[ $query ] = ( $counts[ $query ] ?? 0 ) + 1;
	if ( count( $counts ) > 50 ) {
		arsort( $counts );
		$counts = array_slice( $counts, 0, 50, true );
	}
	update_option( 'om_search_counts', $counts, false );
}

/**
 * Does the current request render catalog output?
 */
function om_catalog_page_needs_assets() {
	if ( get_query_var( 'om_style_number' ) ) {
		return true;
	}

	if ( is_singular() ) {
		$post = get_post();
		if ( $post ) {
			foreach ( array( 'om_catalog', 'om_diamonds', 'om_ring_builder', 'om_related', 'om_search', 'om_reels' ) as $tag ) {
				if ( has_shortcode( (string) $post->post_content, $tag ) ) {
					return true;
				}
			}
			// Elementor stores widget data in post meta, not post_content.
			$elementor_data = get_post_meta( $post->ID, '_elementor_data', true );
			if ( is_string( $elementor_data ) && preg_match( '/"widgetType":"om_[a-z_]+"|\[om_(catalog|diamonds|ring_builder|related|search|reels)/', $elementor_data ) ) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Flush rewrite rules on activation/deactivation so /catalog/... URLs work immediately.
 */
function om_catalog_activate() {
	require_once OM_CATALOG_DIR . 'includes/class-om-rewrites.php';
	OM_Rewrites::instance()->register_rules();
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'om_catalog_activate' );

function om_catalog_deactivate() {
	OM_Warmer::unschedule();
	flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'om_catalog_deactivate' );
