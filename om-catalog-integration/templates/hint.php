<?php
/**
 * The private page a "Drop a hint" email links to (/?om_hint=…). Copy it to
 * {your theme}/om-catalog/hint.php to change the frame around it.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
echo OM_Hint::instance()->render_page(); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
get_footer();
