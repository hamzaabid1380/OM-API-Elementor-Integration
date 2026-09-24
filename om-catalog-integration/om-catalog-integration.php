<?php
/**
 * Plugin Name: Overnight Mountings Catalog Integration
 * Description: Pulls live product & diamond data from the Overnight Mountings Product Catalog API and displays it on the WordPress site via shortcodes and Elementor widgets. Includes an admin settings page for credentials, pricing markup, and brand colors/fonts.
 * Version: 1.7.0
 * Author: Wulf Diamond Jewelers / Carpe Diem
 * Text Domain: om-catalog
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

define( 'OM_CATALOG_VERSION', '1.7.0' );
define( 'OM_CATALOG_DIR', plugin_dir_path( __FILE__ ) );
define( 'OM_CATALOG_URL', plugin_dir_url( __FILE__ ) );

require_once OM_CATALOG_DIR . 'includes/functions-pricing.php';
require_once OM_CATALOG_DIR . 'includes/class-om-api-client.php';
require_once OM_CATALOG_DIR . 'includes/class-om-settings.php';
require_once OM_CATALOG_DIR . 'includes/class-om-rewrites.php';
require_once OM_CATALOG_DIR . 'includes/class-om-shortcodes.php';
require_once OM_CATALOG_DIR . 'includes/class-om-ajax.php';
require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
require_once OM_CATALOG_DIR . 'includes/class-om-search.php';
require_once OM_CATALOG_DIR . 'includes/class-om-inquiry.php';
require_once OM_CATALOG_DIR . 'includes/class-om-diamonds.php';
require_once OM_CATALOG_DIR . 'includes/class-om-ring-builder.php';
require_once OM_CATALOG_DIR . 'includes/class-om-related.php';
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
	OM_Inquiry::instance();
	OM_Diamonds::instance();
	OM_Ring_Builder::instance();
	OM_Related::instance();
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
	wp_register_style( 'om-catalog-css', OM_CATALOG_URL . 'assets/css/om-catalog.css', array(), OM_CATALOG_VERSION );
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
				'quickView' => __( 'Quick view', 'om-catalog' ),
				'unmute'    => __( 'Turn sound on', 'om-catalog' ),
				'mute'      => __( 'Turn sound off', 'om-catalog' ),
				'sizeUnsure' => __( 'not sure — please help', 'om-catalog' ),
			),
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
	wp_add_inline_style( 'om-catalog-css', $css_vars );

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
 * Does the current request render catalog output?
 */
function om_catalog_page_needs_assets() {
	if ( get_query_var( 'om_style_number' ) ) {
		return true;
	}

	if ( is_singular() ) {
		$post = get_post();
		if ( $post ) {
			foreach ( array( 'om_catalog', 'om_diamonds', 'om_ring_builder', 'om_related' ) as $tag ) {
				if ( has_shortcode( (string) $post->post_content, $tag ) ) {
					return true;
				}
			}
			// Elementor stores widget data in post meta, not post_content.
			$elementor_data = get_post_meta( $post->ID, '_elementor_data', true );
			if ( is_string( $elementor_data ) && preg_match( '/"widgetType":"om_[a-z_]+"|\[om_(catalog|diamonds|ring_builder|related)/', $elementor_data ) ) {
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
