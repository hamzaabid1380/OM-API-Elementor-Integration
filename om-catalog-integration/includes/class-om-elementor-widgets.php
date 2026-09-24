<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers an "OM Product Catalog" widget inside the Elementor editor,
 * only if Elementor is active. If Elementor isn't installed, this does
 * nothing and the [om_catalog] shortcode still works anywhere (including
 * Elementor's own Shortcode widget).
 */
class OM_Elementor_Widgets {

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'elementor/widgets/register', array( $this, 'register_widgets' ) );
	}

	public function register_widgets( $widgets_manager ) {
		if ( ! did_action( 'elementor/loaded' ) ) {
			return;
		}
		require_once OM_CATALOG_DIR . 'includes/class-om-elementor-catalog-widget.php';
		require_once OM_CATALOG_DIR . 'includes/class-om-elementor-product-widget.php';
		$widgets_manager->register( new OM_Elementor_Catalog_Widget() );
		$widgets_manager->register( new OM_Elementor_Product_Widget() );
		require_once OM_CATALOG_DIR . 'includes/class-om-elementor-extra-widgets.php';
		$widgets_manager->register( new OM_Elementor_Diamond_Widget() );
		$widgets_manager->register( new OM_Elementor_Builder_Widget() );
		$widgets_manager->register( new OM_Elementor_Related_Widget() );
	}
}
