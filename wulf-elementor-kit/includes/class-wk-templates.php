<?php
/**
 * One-click setup: builds the homepage, a site header and footer (Elementor templates used
 * site-wide) and the main menu, all made of Wulf widgets you can edit in Elementor.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Templates {

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ), 20 );
		add_action( 'admin_post_wk_setup', array( __CLASS__, 'handle' ) );
	}

	public static function menu() {
		add_submenu_page( 'wulf-kit', __( 'Templates & setup', 'wulf-kit' ), __( 'Templates & setup', 'wulf-kit' ), 'manage_options', 'wulf-kit-setup', array( __CLASS__, 'page' ) );
	}

	/** Homepage sections, top to bottom. */
	public static function homepage_widgets() {
		return array( 'hero', 'help', 'tiles', 'products', 'craft', 'studio', 'values', 'reviews', 'story', 'fourcs', 'services', 'posts', 'visit' );
	}

	private static function eid() {
		return substr( md5( uniqid( '', true ) . wp_rand() ), 0, 7 );
	}

	/** A full-width, gap-free container holding one widget. */
	public static function block( $widget, $settings = array() ) {
		return array(
			'id'       => self::eid(),
			'elType'   => 'container',
			'isInner'  => false,
			'settings' => array(
				'content_width' => 'full',
				'flex_gap'      => array( 'unit' => 'px', 'size' => 0, 'column' => '0', 'row' => '0', 'isLinked' => true ),
				'padding'       => array( 'unit' => 'px', 'top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0', 'isLinked' => true ),
			),
			'elements' => array(
				array(
					'id'         => self::eid(),
					'elType'     => 'widget',
					'widgetType' => 'wk-' . $widget,
					'settings'   => $settings ? $settings : new stdClass(),
					'elements'   => array(),
				),
			),
		);
	}

	private static function save_elementor( $post_id, $data, $type ) {
		update_post_meta( $post_id, '_elementor_edit_mode', 'builder' );
		update_post_meta( $post_id, '_elementor_template_type', $type );
		update_post_meta( $post_id, '_elementor_version', defined( 'ELEMENTOR_VERSION' ) ? ELEMENTOR_VERSION : '3.20.0' );
		update_post_meta( $post_id, '_elementor_data', wp_slash( wp_json_encode( $data ) ) );
		if ( class_exists( '\Elementor\Plugin' ) ) {
			\Elementor\Plugin::$instance->files_manager->clear_cache();
		}
	}

	/** The main menu as a real WordPress menu (Appearance › Menus), built from the default tree. */
	public static function create_menu() {
		require_once WK_DIR . 'includes/class-wk-widget.php';
		require_once WK_DIR . 'widgets/class-wk-header.php';
		$name = 'Wulf main menu';
		$menu = wp_get_nav_menu_object( $name );
		if ( $menu ) {
			return (int) $menu->term_id;
		}
		$id  = wp_create_nav_menu( $name );
		if ( is_wp_error( $id ) ) {
			return 0;
		}
		$add = static function ( $items, $parent ) use ( &$add, $id ) {
			foreach ( $items as $pos => $it ) {
				$item_id = wp_update_nav_menu_item(
					$id,
					0,
					array(
						'menu-item-title'       => $it['title'],
						'menu-item-url'         => $it['url'] ? $it['url'] : '#',
						'menu-item-description' => $it['desc'],
						'menu-item-classes'     => $it['classes'],
						'menu-item-parent-id'   => $parent,
						'menu-item-position'    => $pos + 1,
						'menu-item-status'      => 'publish',
						'menu-item-type'        => 'custom',
					)
				);
				if ( ! is_wp_error( $item_id ) && $it['children'] ) {
					$add( $it['children'], $item_id );
				}
			}
		};
		$add( WK_Header_Widget::default_menu(), 0 );
		return (int) $id;
	}

	private static function library( $title, $data ) {
		$id = wp_insert_post( array( 'post_type' => 'elementor_library', 'post_status' => 'publish', 'post_title' => $title ) );
		if ( ! $id || is_wp_error( $id ) ) {
			return 0;
		}
		wp_set_object_terms( $id, 'section', 'elementor_library_type' );
		self::save_elementor( $id, $data, 'section' );
		return (int) $id;
	}

	/**
	 * Build everything.
	 *
	 * @return array ids
	 */
	public static function run( $front = true, $sitewide = true ) {
		$menu   = self::create_menu();
		$header = self::library( 'Wulf · Header', array( self::block( 'announce' ), self::block( 'header', array( 'menu' => (string) $menu ) ) ) );
		$footer = self::library( 'Wulf · Footer', array( self::block( 'footer' ) ) );
		$page   = wp_insert_post( array( 'post_type' => 'page', 'post_status' => 'publish', 'post_title' => __( 'Home', 'wulf-kit' ), 'post_name' => 'home-wulf' ) );
		if ( $page && ! is_wp_error( $page ) ) {
			$blocks = array();
			$preset = array( 'products' => array( 'join' => 'yes' ) );
			foreach ( self::homepage_widgets() as $w ) {
				$blocks[] = self::block( $w, $preset[ $w ] ?? array() );
			}
			self::save_elementor( $page, $blocks, 'wp-page' );
			update_post_meta( $page, '_wp_page_template', 'elementor_header_footer' );
			if ( $front ) {
				update_option( 'show_on_front', 'page' );
				update_option( 'page_on_front', (int) $page );
			}
		}
		if ( $sitewide ) {
			$opt               = get_option( WK_Settings::OPTION, array() );
			$opt               = is_array( $opt ) ? $opt : array();
			$opt['header_tpl'] = (string) $header;
			$opt['footer_tpl'] = (string) $footer;
			update_option( WK_Settings::OPTION, wp_parse_args( $opt, WK_Settings::defaults() ) );
		}
		return array( 'page' => (int) $page, 'header' => $header, 'footer' => $footer, 'menu' => $menu );
	}

	public static function handle() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'wk_setup' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'wulf-kit' ) );
		}
		$ids = self::run( ! empty( $_POST['front'] ), ! empty( $_POST['sitewide'] ) );
		wp_safe_redirect( add_query_arg( array( 'page' => 'wulf-kit-setup', 'done' => $ids['page'] ), admin_url( 'admin.php' ) ) );
		exit;
	}

	public static function page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$done = isset( $_GET['done'] ) ? (int) $_GET['done'] : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'Templates & setup', 'wulf-kit' ); ?></h1>
			<?php if ( $done ) : ?>
				<div class="notice notice-success"><p>
					<?php esc_html_e( 'Done. Your new homepage, header, footer and menu are ready.', 'wulf-kit' ); ?>
					<a href="<?php echo esc_url( get_permalink( $done ) ); ?>" target="_blank"><?php esc_html_e( 'View the homepage', 'wulf-kit' ); ?></a> ·
					<a href="<?php echo esc_url( admin_url( 'post.php?post=' . $done . '&action=elementor' ) ); ?>"><?php esc_html_e( 'Edit it with Elementor', 'wulf-kit' ); ?></a>
				</p></div>
			<?php endif; ?>
			<div class="card" style="max-width:760px">
				<h2><?php esc_html_e( 'Create the Wulf homepage', 'wulf-kit' ); ?></h2>
				<p><?php esc_html_e( 'Builds a new page from the Wulf widgets with your real products, photos and wording already in place, plus:', 'wulf-kit' ); ?></p>
				<ul style="list-style:disc;margin-left:20px">
					<li><?php esc_html_e( '"Wulf · Header" and "Wulf · Footer" templates (Templates › Saved Templates), shown on every page.', 'wulf-kit' ); ?></li>
					<li><?php esc_html_e( '"Wulf main menu" in Appearance › Menus, used by the header.', 'wulf-kit' ); ?></li>
				</ul>
				<p><?php esc_html_e( 'Nothing existing is deleted. Running it again makes fresh copies.', 'wulf-kit' ); ?></p>
				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
					<?php wp_nonce_field( 'wk_setup' ); ?>
					<input type="hidden" name="action" value="wk_setup">
					<p><label><input type="checkbox" name="front" value="1"> <?php esc_html_e( 'Make it the site\'s homepage now', 'wulf-kit' ); ?></label></p>
					<p><label><input type="checkbox" name="sitewide" value="1" checked> <?php esc_html_e( 'Use the Wulf header and footer on every page', 'wulf-kit' ); ?></label></p>
					<?php submit_button( __( 'Create homepage, header, footer & menu', 'wulf-kit' ), 'primary', 'submit', false ); ?>
				</form>
			</div>
			<div class="card" style="max-width:760px">
				<h2><?php esc_html_e( 'Building other pages', 'wulf-kit' ); ?></h2>
				<p><?php esc_html_e( 'Every section is its own widget under "Wulf Diamond Jewelers" in the Elementor panel. Drag them onto any page; each has full Content and Style settings (colors, hover colors, fonts, spacing, borders). For edge-to-edge sections, put each widget in a container set to Full width with no padding.', 'wulf-kit' ); ?></p>
			</div>
		</div>
		<?php
	}
}
