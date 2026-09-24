<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';

// Product, line and style number were resolved (and status/title/meta set)
// by OM_Rewrites before the template loads; one API call, shared everywhere.
$rewrites     = OM_Rewrites::instance();
$product      = $rewrites->get_current_product();
$product_line = $rewrites->get_current_line();
$style_number = $rewrites->get_current_style();

get_header();
?>

<div class="om-single-product">

	<?php if ( ! $product || is_wp_error( $product ) ) : ?>

		<div class="om-error">
			<p><?php echo esc_html( is_wp_error( $product ) ? $product->get_error_message() : __( 'Product not found.', 'om-catalog' ) ); ?></p>
			<p><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back to home', 'om-catalog' ); ?></a></p>
		</div>

	<?php else : ?>

		<?php echo om_render_product_detail( $product, $product_line, $style_number ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer. ?>

	<?php endif; ?>

</div>

<?php get_footer(); ?>
