<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Product-page shell for an Elementor-designed layout: renders the layout
 * page chosen in Settings > OM Catalog between the theme's header and
 * footer. The "OM Single Product" widget inside that layout picks up the
 * current product automatically.
 */

$rewrites  = OM_Rewrites::instance();
$product   = $rewrites->get_current_product();
$layout_id = (int) get_option( 'om_product_layout_page', 0 );

get_header();
?>

<div class="om-single-product om-single-product--layout">

	<?php if ( ! $product || is_wp_error( $product ) ) : ?>

		<div class="om-error">
			<p><?php echo esc_html( ( is_wp_error( $product ) && 'om_not_found' !== $product->get_error_code() ) ? om_public_error_message( $product ) : __( 'Sorry, this design is no longer available.', 'om-catalog' ) ); ?></p>
			<p><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back to the home page', 'om-catalog' ); ?></a></p>
		</div>

	<?php else : ?>

		<?php echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display( $layout_id ); // phpcs:ignore WordPress.Security.EscapeOutput -- Elementor renders its own content. ?>

	<?php endif; ?>

</div>

<?php get_footer(); ?>
