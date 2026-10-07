<?php
/**
 * Plugin Name:       Wulf Elementor Kit
 * Description:       The Wulf Diamond Jewelers website kit for Elementor: every section as an editable widget, every page of the site as a ready-made template, a visit booking form wired to your leads, and site-wide brand settings.
 * Version:           1.5.0
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Author:            Wulf Diamond Jewelers
 * Text Domain:       wulf-kit
 * Elementor tested up to: 4.0.0
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

define( 'WK_VERSION', '1.5.0' );
define( 'WK_FILE', __FILE__ );
define( 'WK_DIR', plugin_dir_path( __FILE__ ) );
define( 'WK_URL', plugin_dir_url( __FILE__ ) );

require_once WK_DIR . 'includes/class-wk-icons.php';
require_once WK_DIR . 'includes/class-wk-settings.php';
require_once WK_DIR . 'includes/class-wk-booking.php';
require_once WK_DIR . 'includes/class-wk-reviews.php';
require_once WK_DIR . 'includes/class-wk-pages.php';
require_once WK_DIR . 'includes/class-wk-templates.php';
require_once WK_DIR . 'includes/class-wk-plugin.php';

WK_Plugin::instance();
