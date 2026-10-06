<?php
/**
 * The kit's line icons, inlined wherever they are used (so they also work inside the Elementor editor).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Icons {

	/** name => [viewBox, inner markup] */
	const ICONS = array(
		'mono'   => array( '0 0 32 32', '<g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M3 11 9.5 4h13L29 11 16 29Z"/><path d="M3 11h26"/><path d="m10 14 3 8 3-6 3 6 3-8"/></g>' ),
		'arr'    => array( '0 0 24 24', '<path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' ),
		'left'   => array( '0 0 24 24', '<path d="M20 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' ),
		'chev'   => array( '0 0 24 24', '<path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' ),
		'search' => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></g>' ),
		'heart'  => array( '0 0 24 24', '<path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>' ),
		'tray'   => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M3 14h5l1.5 2.5h5L16 14h5"/><path d="M3 14 5.5 6h13L21 14v5H3Z"/></g>' ),
		'menu'   => array( '0 0 24 24', '<path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' ),
		'close'  => array( '0 0 24 24', '<path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' ),
		'gem'    => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3 9 7 4h10l4 5-9 11Z"/><path d="M3 9h18M9 4 8 9l4 11 4-11-1-5"/></g>' ),
		'ring'   => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><circle cx="12" cy="15" r="6"/><path d="m9.5 6 1.2-2.5h2.6L14.5 6 12 8.8Z"/></g>' ),
		'bands'  => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="9" cy="13" rx="6" ry="6.5"/><ellipse cx="15.5" cy="12" rx="5.5" ry="6"/></g>' ),
		'ear'    => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M8 3v4"/><path d="M5 10.5 8 7l3 3.5L8 20Z"/><path d="M16 3v4"/><circle cx="16" cy="10" r="3"/></g>' ),
		'gift'   => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="3.5" y="9" width="17" height="11.5" rx="1.5"/><path d="M2.5 9h19M12 9v11.5M12 9c-1.5-4-6-5-6-2s4 2 6 2Zm0 0c1.5-4 6-5 6-2s-4 2-6 2Z"/></g>' ),
		'pencil' => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/></g>' ),
		'tool'   => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3Z"/><path d="m14.5 6.5 2-2a4 4 0 0 1 3 3l-2 2"/></g>' ),
		'cash'   => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/></g>' ),
		'cert'   => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M8 7h8M8 10.5h5"/><path d="m9.5 16-1.5 5 4-2 4 2-1.5-5"/></g>' ),
		'clock'  => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></g>' ),
		'spark'  => array( '0 0 24 24', '<path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' ),
		'pin'    => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.4"/></g>' ),
		'phone'  => array( '0 0 24 24', '<path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' ),
		'check'  => array( '0 0 24 24', '<path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' ),
		'bulb'   => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17h6M10 20.5h4M12 3a6 6 0 0 0-3.5 10.9c.4.3.5.7.5 1.1v2h6v-2c0-.4.2-.8.5-1.1A6 6 0 0 0 12 3Z"/></g>' ),
		'star'   => array( '0 0 24 24', '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" fill="currentColor"/>' ),
		'dir'    => array( '0 0 24 24', '<path d="M12 2.5 21.5 12 12 21.5 2.5 12Zm-2.5 12V11h5V9l3 3-3 3v-2h-3v1.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' ),
		'mail'   => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/></g>' ),
		'calendar' => array( '0 0 24 24', '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></g>' ),
		'shield' => array( '0 0 24 24', '<path d="M12 3 5 6v5c0 4.5 3 8.4 7 10 4-1.6 7-5.5 7-10V6Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' ),
		'none'   => array( '0 0 24 24', '' ),
	);

	/** Choices for icon selects in widgets. */
	public static function options() {
		$labels = array(
			'ring' => __( 'Ring', 'wulf-kit' ), 'bands' => __( 'Wedding bands', 'wulf-kit' ), 'ear' => __( 'Earrings', 'wulf-kit' ),
			'gem' => __( 'Diamond', 'wulf-kit' ), 'gift' => __( 'Gift', 'wulf-kit' ), 'pencil' => __( 'Pencil', 'wulf-kit' ),
			'tool' => __( 'Repair tool', 'wulf-kit' ), 'cash' => __( 'Cash', 'wulf-kit' ), 'cert' => __( 'Certificate', 'wulf-kit' ),
			'clock' => __( 'Clock', 'wulf-kit' ), 'spark' => __( 'Sparkle', 'wulf-kit' ), 'heart' => __( 'Heart', 'wulf-kit' ),
			'pin' => __( 'Map pin', 'wulf-kit' ), 'phone' => __( 'Phone', 'wulf-kit' ), 'mail' => __( 'Email', 'wulf-kit' ),
			'calendar' => __( 'Calendar', 'wulf-kit' ), 'shield' => __( 'Shield', 'wulf-kit' ), 'star' => __( 'Star', 'wulf-kit' ),
			'check' => __( 'Check', 'wulf-kit' ), 'bulb' => __( 'Light bulb', 'wulf-kit' ), 'search' => __( 'Search', 'wulf-kit' ),
			'mono' => __( 'Wulf monogram', 'wulf-kit' ), 'none' => __( 'No icon', 'wulf-kit' ),
		);
		return $labels;
	}

	/**
	 * Inline SVG for an icon.
	 *
	 * @param string $name
	 * @param string $class
	 * @param array  $attrs Extra attributes.
	 */
	public static function svg( $name, $class = '', $attrs = array() ) {
		if ( ! isset( self::ICONS[ $name ] ) || 'none' === $name ) {
			return '';
		}
		list( $vb, $inner ) = self::ICONS[ $name ];
		$a = '';
		foreach ( $attrs as $k => $v ) {
			$a .= ' ' . esc_attr( $k ) . '="' . esc_attr( $v ) . '"';
		}
		if ( ! isset( $attrs['role'] ) ) {
			$a .= ' aria-hidden="true"';
		}
		return '<svg viewBox="' . $vb . '"' . ( $class ? ' class="' . esc_attr( $class ) . '"' : '' ) . $a . ' focusable="false">' . $inner . '</svg>';
	}

	/** All icons for the script (it builds some markup itself). */
	public static function for_js() {
		$out = array();
		foreach ( self::ICONS as $k => $v ) {
			$out[ $k ] = array( $v[0], $v[1] );
		}
		return $out;
	}
}
