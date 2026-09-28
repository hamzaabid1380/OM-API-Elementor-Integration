<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Borrowing another page's widget settings, so one widget can look exactly
 * like one designed elsewhere (the quick view like the product page, the
 * ring builder's settings grid like the catalog page).
 */

/**
 * The first widget of a type on a page, with its settings as Elementor
 * resolves them (unset controls read as their defaults).
 *
 * @return array|null [ page, id, settings, widget ].
 */
function om_elementor_page_widget( $page_id, $type ) {
	$page_id = (int) $page_id;
	if ( ! $page_id || ! did_action( 'elementor/loaded' ) || 'publish' !== get_post_status( $page_id ) ) {
		return null;
	}
	$data = json_decode( (string) get_post_meta( $page_id, '_elementor_data', true ), true );
	$find = static function ( $elements ) use ( &$find, $type ) {
		foreach ( (array) $elements as $element ) {
			if ( 'widget' === ( $element['elType'] ?? '' ) && $type === ( $element['widgetType'] ?? '' ) ) {
				return $element;
			}
			$inner = $find( $element['elements'] ?? array() );
			if ( $inner ) {
				return $inner;
			}
		}
		return null;
	};
	$element = is_array( $data ) ? $find( $data ) : null;
	if ( ! $element ) {
		return null;
	}
	// Widgets (and their classes) load when Elementor first lists them.
	\Elementor\Plugin::$instance->widgets_manager->get_widget_types();
	$settings = (array) ( $element['settings'] ?? array() );
	$widget   = null;
	try {
		$widget = \Elementor\Plugin::$instance->elements_manager->create_element_instance( $element );
		if ( $widget ) {
			$settings = $widget->get_settings_for_display();
		}
	} catch ( \Throwable $e ) { // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedCatch -- raw settings are fine.
	}
	return array(
		'page'     => $page_id,
		'id'       => (string) $element['id'],
		'settings' => $settings,
		'widget'   => $widget,
	);
}

/** Published pages holding a widget type, newest first: [ id => title ]. */
function om_elementor_pages_with( $type, $limit = 40 ) {
	global $wpdb;
	// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- admin-only lookup for a control's options.
	$ids = $wpdb->get_col(
		$wpdb->prepare(
			"SELECT p.ID FROM {$wpdb->posts} p INNER JOIN {$wpdb->postmeta} m ON m.post_id = p.ID AND m.meta_key = '_elementor_data'
			WHERE p.post_status = 'publish' AND p.post_type IN ('page','post','elementor_library') AND m.meta_value LIKE %s
			ORDER BY p.post_modified DESC LIMIT %d",
			'%' . $wpdb->esc_like( '"widgetType":"' . $type . '"' ) . '%',
			(int) $limit
		)
	);
	$out = array();
	foreach ( (array) $ids as $id ) {
		$out[ (int) $id ] = get_the_title( $id ) ? get_the_title( $id ) : '#' . $id;
	}
	return $out;
}

/** Wrap HTML so a page's widget styles ({{WRAPPER}} …) apply to it. */
function om_elementor_wrap( $html, $page_id, $widget_id, $extra_class = '' ) {
	return sprintf(
		'<div class="elementor-%1$d %3$s"><div class="elementor-element elementor-element-%2$s">%4$s</div></div>',
		(int) $page_id,
		esc_attr( $widget_id ),
		esc_attr( $extra_class ),
		$html
	);
}

/** Load a page's Elementor CSS on the current page. */
function om_elementor_enqueue_page_css( $page_id ) {
	if ( class_exists( '\Elementor\Core\Files\CSS\Post' ) ) {
		\Elementor\Core\Files\CSS\Post::create( (int) $page_id )->enqueue();
	}
}
