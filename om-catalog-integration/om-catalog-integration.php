<?php
/**
 * Plugin Name: Overnight Mountings Catalog Integration
 * Description: Pulls live product & diamond data from the Overnight Mountings Product Catalog API and displays it on the WordPress site via shortcodes and Elementor widgets. Includes an admin settings page for credentials, pricing markup, and brand colors/fonts.
 * Version: 1.2.0
 * Author: Wulf Diamond Jewelers / Carpe Diem
 * Text Domain: om-catalog
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

define( 'OM_CATALOG_VERSION', '1.2.0' );
define( 'OM_CATALOG_DIR', plugin_dir_path( __FILE__ ) );
define( 'OM_CATALOG_URL', plugin_dir_url( __FILE__ ) );

require_once OM_CATALOG_DIR . 'includes/functions-pricing.php';
require_once OM_CATALOG_DIR . 'includes/class-om-api-client.php';
require_once OM_CATALOG_DIR . 'includes/class-om-settings.php';
require_once OM_CATALOG_DIR . 'includes/class-om-rewrites.php';
require_once OM_CATALOG_DIR . 'includes/class-om-shortcodes.php';
require_once OM_CATALOG_DIR . 'includes/class-om-ajax.php';
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
	wp_register_style(
		'om-catalog-fonts',
		'https://fonts.googleapis.com/css?family=Arapey:400,400italic,500,600|Inter:300,400,500,600&display=swap',
		array(),
		null
	);
	wp_register_script( 'om-catalog-js', OM_CATALOG_URL . 'assets/js/om-product.js', array( 'jquery' ), OM_CATALOG_VERSION, true );

	wp_localize_script(
		'om-catalog-js',
		'omCatalog',
		array(
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
		)
	);

	// Inline CSS variables driven by the admin settings (brand colors/fonts).
	// Defaults match the live site's Elementor kit: Arapey headings, Inter body,
	// near-black navy primary (#00111C), monochrome accent.
	$primary      = get_option( 'om_color_primary', '#00111C' );
	$accent       = get_option( 'om_color_accent', '#000000' );
	$background   = get_option( 'om_color_background', '#ffffff' );
	$text         = get_option( 'om_color_text', '#464646' );
	$heading_font = get_option( 'om_font_heading', 'Arapey, Georgia, serif' );
	$body_font    = get_option( 'om_font_body', 'Inter, Helvetica, Arial, sans-serif' );

	// Colors are sanitized as hex on save; strip characters that could break
	// out of the declaration in case a font value was saved before validation.
	$heading_font = str_replace( array( ';', '{', '}', '<', '>' ), '', $heading_font );
	$body_font    = str_replace( array( ';', '{', '}', '<', '>' ), '', $body_font );

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
	}
}
add_action( 'wp_enqueue_scripts', 'om_catalog_enqueue_assets' );

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
			if ( has_shortcode( (string) $post->post_content, 'om_catalog' ) ) {
				return true;
			}
			// Elementor stores widget data in post meta, not post_content.
			$elementor_data = get_post_meta( $post->ID, '_elementor_data', true );
			if ( is_string( $elementor_data ) && ( false !== strpos( $elementor_data, 'om_catalog' ) || false !== strpos( $elementor_data, 'om_product_widget' ) ) ) {
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
	flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'om_catalog_deactivate' );
