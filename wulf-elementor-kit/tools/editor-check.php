<?php
/**
 * Developer check: builds every Wulf widget's controls the way the Elementor editor does
 * (the editor is stricter than the live site). Run before each release:
 *   wp eval-file wp-content/plugins/wulf-elementor-kit/tools/editor-check.php --user=1
 */
// Build every Wulf widget's controls the way the Elementor editor does (no frontend shortcuts).
$r = new ReflectionProperty( '\Elementor\Core\Frontend\Performance', 'is_frontend' );
$r->setAccessible( true );
$r->setValue( null, false );
add_filter( 'wp_die_handler', function () { return function ( $m ) { throw new Exception( is_string( $m ) ? $m : 'wp_die' ); }; } );
$issues = array();
add_action( 'doing_it_wrong_run', function ( $fn, $msg ) use ( &$issues ) { $issues[] = $fn . ': ' . wp_strip_all_tags( $msg ); }, 10, 2 );
\Elementor\Plugin::$instance->widgets_manager->get_widget_types(); // loads the widget classes
$issues = array();
$ok = 0;
foreach ( WK_Plugin::WIDGETS as $key => $class ) {
	$before = count( $issues );
	try {
		$w = new $class( array(), array( 'id' => 'x' . $key, 'elType' => 'widget', 'widgetType' => 'wk-' . $key, 'settings' => array() ) );
		$stack = $w->get_stack( false );
		$n = count( $stack['controls'] ) + count( $stack['style_controls'] ?? array() );
		$cfg = wp_json_encode( $w->get_config() );
		echo str_pad( 'wk-' . $key, 16 ), ' controls=', $n, count( $issues ) > $before ? '  ISSUES: ' . implode( ' | ', array_slice( $issues, $before, 3 ) ) : '  ok', "\n";
		if ( count( $issues ) === $before ) { $ok++; }
	} catch ( Throwable $e ) {
		echo str_pad( 'wk-' . $key, 16 ), ' FAILED: ', $e->getMessage(), "\n";
	}
}
echo "\n", $ok, ' of ', count( WK_Plugin::WIDGETS ), " widgets load cleanly in the editor\n";
