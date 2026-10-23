<?php
/**
 * The private page a "Drop a hint" email links to (/?om_hint=…). Copy it to
 * {your theme}/om-catalog/hint.php to change the frame around it.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
echo om_main_landmark(); // phpcs:ignore WordPress.Security.EscapeOutput -- fixed markup.
echo OM_Hint::instance()->render_page(); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
echo om_main_landmark( false ); // phpcs:ignore WordPress.Security.EscapeOutput -- fixed markup.
get_footer();
