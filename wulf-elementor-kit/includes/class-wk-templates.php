<?php
/**
 * Templates & setup: pick any pages from the library (every page of the live site), build them
 * as Elementor pages, plus the site-wide header, footer and main menu. "Go live" swaps a new
 * page in at the address of the old one (the old page goes to the trash, restorable).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Templates {

	const NOTICE = 'wk_setup_report';

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ), 20 );
		add_action( 'admin_post_wk_setup', array( __CLASS__, 'handle' ) );
		add_action( 'admin_post_wk_golive', array( __CLASS__, 'handle_golive' ) );
	}

	public static function menu() {
		add_submenu_page( 'wulf-kit', __( 'Pages & templates', 'wulf-kit' ), __( 'Pages & templates', 'wulf-kit' ), 'manage_options', 'wulf-kit-setup', array( __CLASS__, 'page' ) );
	}

	/** Homepage sections, top to bottom (kept for developers; the library holds the full list). */
	public static function homepage_widgets() {
		return array( 'hero', 'help', 'tiles', 'products', 'craft', 'studio', 'values', 'reviews', 'story', 'fourcs', 'services', 'posts', 'visit' );
	}

	private static function eid() {
		return substr( md5( uniqid( '', true ) . wp_rand() ), 0, 7 );
	}

	/** A full-width, gap-free container holding one widget. "om:name" uses an OM Catalog widget as is. */
	public static function block( $widget, $settings = array() ) {
		$om   = 0 === strpos( $widget, 'om:' );
		$type = $om ? substr( $widget, 3 ) : 'wk-' . $widget;
		$box  = array(
			'content_width' => 'full',
			'flex_gap'      => array( 'unit' => 'px', 'size' => 0, 'column' => '0', 'row' => '0', 'isLinked' => true ),
			'padding'       => array( 'unit' => 'px', 'top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0', 'isLinked' => true ),
		);
		if ( $om ) {
			// OM widgets don't carry their own page margins: give them the site's width and gutters.
			$box['css_classes'] = 'wk-om-box';
		}
		return array(
			'id'       => self::eid(),
			'elType'   => 'container',
			'isInner'  => false,
			'settings' => $box,
			'elements' => array(
				array(
					'id'         => self::eid(),
					'elType'     => 'widget',
					'widgetType' => $type,
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

	/** Elementor data for a library page. */
	public static function page_data( $key ) {
		$out = array();
		foreach ( WK_Pages::blocks( $key ) as $b ) {
			$out[] = self::block( $b[0], $b[1] );
		}
		return $out;
	}

	/**
	 * The main menu as a real WordPress menu (Appearance › Menus).
	 *
	 * @param bool $refresh Replace the items of an existing "Wulf main menu".
	 */
	public static function create_menu( $refresh = false ) {
		require_once WK_DIR . 'includes/class-wk-widget.php';
		require_once WK_DIR . 'widgets/class-wk-header.php';
		$name = 'Wulf main menu';
		$menu = wp_get_nav_menu_object( $name );
		if ( $menu && ! $refresh ) {
			return (int) $menu->term_id;
		}
		if ( $menu ) {
			$id = (int) $menu->term_id;
			foreach ( (array) wp_get_nav_menu_items( $id, array( 'post_status' => 'any' ) ) as $it ) {
				wp_delete_post( $it->ID, true );
			}
		} else {
			$id = wp_create_nav_menu( $name );
			if ( is_wp_error( $id ) ) {
				return 0;
			}
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

	private static function library( $title, $data, $type = 'section' ) {
		$id = wp_insert_post( array( 'post_type' => 'elementor_library', 'post_status' => 'publish', 'post_title' => $title ) );
		if ( ! $id || is_wp_error( $id ) ) {
			return 0;
		}
		wp_set_object_terms( $id, $type, 'elementor_library_type' );
		self::save_elementor( $id, $data, $type );
		return (int) $id;
	}

	private static function tpl_alive( $id ) {
		return $id && 'elementor_library' === get_post_type( (int) $id ) && 'trash' !== get_post_status( (int) $id );
	}

	/** Other pages (not this one) already using an address. */
	public static function others_at( $slug, $except = 0 ) {
		$ids = get_posts( array( 'post_type' => 'page', 'name' => $slug, 'post_status' => array( 'publish', 'private', 'future', 'draft', 'pending' ), 'numberposts' => 20, 'fields' => 'ids', 'suppress_filters' => true ) );
		return array_values( array_diff( array_map( 'intval', $ids ), array( (int) $except ) ) );
	}

	/** Is the address taken by a published page that isn't this library page? */
	private static function address_taken( $slug, $except = 0 ) {
		foreach ( self::others_at( $slug, $except ) as $id ) {
			if ( 'publish' === get_post_status( $id ) ) {
				return $id;
			}
		}
		return 0;
	}

	/** Build one library page. Returns the post ID. */
	public static function build_page( $key, $status = 'draft' ) {
		$c = WK_Pages::catalog();
		if ( ! isset( $c[ $key ] ) ) {
			return 0;
		}
		list( $title, $slug ) = $c[ $key ];
		if ( 'publish' === $status && self::address_taken( $slug ) ) {
			$status = 'draft'; // Never bump the live page to a "-2" address; "Go live" swaps it in.
		}
		$id = wp_insert_post( array( 'post_type' => 'page', 'post_status' => $status, 'post_title' => $title, 'post_name' => $slug ) );
		if ( ! $id || is_wp_error( $id ) ) {
			return 0;
		}
		update_post_meta( $id, WK_Pages::META, $key );
		foreach ( WK_Pages::meta( $key ) as $mk => $mv ) {
			update_post_meta( $id, $mk, $mv );
		}
		self::save_elementor( $id, self::page_data( $key ), 'wp-page' );
		update_post_meta( $id, '_wp_page_template', 'elementor_header_footer' );
		return (int) $id;
	}

	/**
	 * Build what was picked.
	 *
	 * @param array $o keys, status (draft|publish), fresh, sitewide, menu, front, saved.
	 * @return array report
	 */
	public static function run_selected( $o ) {
		$o = wp_parse_args( $o, array( 'keys' => array(), 'status' => 'draft', 'fresh' => false, 'sitewide' => true, 'menu' => true, 'front' => false, 'saved' => false ) );
		$r = array( 'built' => array(), 'skipped' => array(), 'drafted' => array(), 'parts' => array() );
		$c = WK_Pages::catalog();
		WK_Pages::built( true );
		foreach ( (array) $o['keys'] as $key ) {
			if ( ! isset( $c[ $key ] ) ) {
				continue;
			}
			$have = WK_Pages::built();
			if ( ! empty( $have[ $key ] ) && ! $o['fresh'] ) {
				$r['skipped'][] = $key;
				continue;
			}
			$id = self::build_page( $key, $o['status'] );
			if ( $id ) {
				$r['built'][ $key ] = $id;
				if ( 'publish' === $o['status'] && 'draft' === get_post_status( $id ) ) {
					$r['drafted'][] = $key;
				}
				if ( $o['saved'] ) {
					self::library( 'Wulf · ' . $c[ $key ][0], self::page_data( $key ), 'page' );
				}
			}
			WK_Pages::built( true );
		}
		$menu = 0;
		if ( $o['menu'] ) {
			$menu         = self::create_menu( true );
			$r['parts'][] = 'menu';
		}
		if ( $o['sitewide'] ) {
			$opt = get_option( WK_Settings::OPTION, array() );
			$opt = is_array( $opt ) ? $opt : array();
			if ( ! self::tpl_alive( $opt['header_tpl'] ?? 0 ) ) {
				$menu              = $menu ? $menu : self::create_menu( false );
				$opt['header_tpl'] = (string) self::library( 'Wulf · Header', array( self::block( 'announce' ), self::block( 'header', array( 'menu' => (string) $menu ) ) ) );
			}
			if ( ! self::tpl_alive( $opt['footer_tpl'] ?? 0 ) ) {
				$opt['footer_tpl'] = (string) self::library( 'Wulf · Footer', array( self::block( 'footer' ) ) );
			}
			update_option( WK_Settings::OPTION, wp_parse_args( $opt, WK_Settings::defaults() ) );
			$r['parts'][] = 'sitewide';
		}
		if ( $o['front'] ) {
			$have = WK_Pages::built( true );
			$home = $r['built']['home-simple'] ?? ( $r['built']['home'] ?? ( $have['home'] ?? 0 ) );
			if ( $home && 'publish' === get_post_status( $home ) ) {
				update_option( 'show_on_front', 'page' );
				update_option( 'page_on_front', (int) $home );
				$r['parts'][] = 'front';
			}
		}
		return $r;
	}

	/** Older one-click setup (homepage + header + footer + menu), kept for compatibility. */
	public static function run( $front = true, $sitewide = true ) {
		$r = self::run_selected( array( 'keys' => array( 'home' ), 'status' => 'publish', 'fresh' => true, 'sitewide' => $sitewide, 'menu' => true, 'front' => $front ) );
		$o = WK_Settings::all();
		return array( 'page' => (int) ( $r['built']['home'] ?? 0 ), 'header' => (int) $o['header_tpl'], 'footer' => (int) $o['footer_tpl'], 'menu' => (int) wp_get_nav_menu_object( 'Wulf main menu' )->term_id );
	}

	/**
	 * Put a built page live at its address: other pages using the address go to the trash
	 * (restorable for 30 days), then the new page is published there. The homepage is set as
	 * the site's front page instead.
	 */
	public static function go_live( $key ) {
		$b = WK_Pages::built( true );
		$c = WK_Pages::catalog();
		if ( empty( $b[ $key ] ) || ! isset( $c[ $key ] ) ) {
			return false;
		}
		$id   = $b[ $key ];
		$slug = $c[ $key ][1];
		if ( ! WK_Pages::is_home( $key ) ) {
			foreach ( self::others_at( $slug, $id ) as $old ) {
				if ( (int) get_option( 'page_on_front' ) === $old ) {
					continue;
				}
				wp_trash_post( $old );
			}
		}
		wp_update_post( array( 'ID' => $id, 'post_status' => 'publish', 'post_name' => $slug ) );
		if ( WK_Pages::is_home( $key ) ) {
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', (int) $id );
		}
		WK_Pages::built( true );
		return true;
	}

	/* ================================================================
	 * Admin screen
	 * ============================================================== */

	public static function handle() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'wk_setup' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'wulf-kit' ) );
		}
		$keys = array_map( 'sanitize_key', (array) wp_unslash( $_POST['pages'] ?? array() ) ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$r    = self::run_selected(
			array(
				'keys'     => array_values( array_intersect( array_keys( WK_Pages::catalog() ), $keys ) ),
				'status'   => 'publish' === ( $_POST['status'] ?? '' ) ? 'publish' : 'draft',
				'fresh'    => 'fresh' === ( $_POST['existing'] ?? '' ),
				'sitewide' => ! empty( $_POST['sitewide'] ),
				'menu'     => ! empty( $_POST['menu'] ),
				'front'    => ! empty( $_POST['front'] ),
				'saved'    => ! empty( $_POST['saved'] ),
			)
		);
		set_transient( self::NOTICE . '_' . get_current_user_id(), $r, 300 );
		wp_safe_redirect( add_query_arg( array( 'page' => 'wulf-kit-setup', 'done' => 1 ), admin_url( 'admin.php' ) ) );
		exit;
	}

	public static function handle_golive() {
		$key = sanitize_key( wp_unslash( $_GET['key'] ?? '' ) );
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'wk_golive_' . $key ) ) {
			wp_die( esc_html__( 'Not allowed.', 'wulf-kit' ) );
		}
		$ok = self::go_live( $key );
		wp_safe_redirect( add_query_arg( array( 'page' => 'wulf-kit-setup', 'live' => $ok ? $key : '0' ), admin_url( 'admin.php' ) ) . '#wk-row-' . $key );
		exit;
	}

	private static function golive_url( $key ) {
		return wp_nonce_url( add_query_arg( array( 'action' => 'wk_golive', 'key' => $key ), admin_url( 'admin-post.php' ) ), 'wk_golive_' . $key );
	}

	public static function page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$cat    = WK_Pages::catalog();
		$built  = WK_Pages::built( true );
		$report = isset( $_GET['done'] ) ? get_transient( self::NOTICE . '_' . get_current_user_id() ) : false; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$live   = isset( $_GET['live'] ) ? sanitize_key( wp_unslash( $_GET['live'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$om     = class_exists( 'OM_Shortcodes' );
		$set    = WK_Settings::all();
		$front  = (int) get_option( 'page_on_front' );
		?>
		<div class="wrap wk-setup">
			<h1><?php esc_html_e( 'Pages & templates', 'wulf-kit' ); ?></h1>
			<p class="wk-intro"><?php esc_html_e( 'Every page of wulfdiamondjewelers.com is here as a ready-made design, with your wording already in. Tick the ones you want and click Build. Each page is made of Wulf sections you can change in Elementor: text, pictures, colors, hover colors, fonts and spacing.', 'wulf-kit' ); ?></p>

			<?php if ( $report ) : ?>
				<div class="notice notice-success"><p>
					<?php
					/* translators: %d: number of pages */
					echo esc_html( sprintf( _n( 'Built %d page.', 'Built %d pages.', count( $report['built'] ), 'wulf-kit' ), count( $report['built'] ) ) );
					if ( $report['skipped'] ) {
						/* translators: %d: number of pages */
						echo ' ' . esc_html( sprintf( _n( '%d was already built and left as it is.', '%d were already built and left as they are.', count( $report['skipped'] ), 'wulf-kit' ), count( $report['skipped'] ) ) );
					}
					if ( $report['drafted'] ) {
						echo ' ' . esc_html__( 'Pages whose address is still used by your current page were saved as drafts: use "Go live" when you\'re happy with them.', 'wulf-kit' );
					}
					if ( in_array( 'menu', $report['parts'], true ) ) {
						echo ' ' . esc_html__( 'The main menu now links to these pages.', 'wulf-kit' );
					}
					?>
				</p></div>
			<?php endif; ?>
			<?php if ( $live && '0' !== $live && isset( $cat[ $live ] ) ) : ?>
				<div class="notice notice-success"><p>
					<?php
					/* translators: %s: page title */
					echo esc_html( sprintf( __( '"%s" is live. Any old page that used the same address is in Pages › Trash, where you can restore it for 30 days.', 'wulf-kit' ), $cat[ $live ][0] ) );
					?>
					<a href="<?php echo esc_url( WK_Pages::url( $live ) ); ?>" target="_blank"><?php esc_html_e( 'View it', 'wulf-kit' ); ?></a>
				</p></div>
			<?php endif; ?>
			<?php if ( ! $om ) : ?>
				<div class="notice notice-warning inline"><p><?php esc_html_e( 'The OM Catalog plugin isn\'t active. Shop pages will be built with a note where the catalog, ring builder and product widgets go.', 'wulf-kit' ); ?></p></div>
			<?php endif; ?>

			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<?php wp_nonce_field( 'wk_setup' ); ?>
				<input type="hidden" name="action" value="wk_setup">

				<div class="wk-bar">
					<button type="button" class="button" data-wk-all="1"><?php esc_html_e( 'Select all', 'wulf-kit' ); ?></button>
					<button type="button" class="button" data-wk-all="new"><?php esc_html_e( 'Select pages not built yet', 'wulf-kit' ); ?></button>
					<button type="button" class="button" data-wk-all="0"><?php esc_html_e( 'Clear', 'wulf-kit' ); ?></button>
					<span class="wk-count" aria-live="polite"></span>
				</div>

				<?php foreach ( WK_Pages::groups() as $g => $glabel ) : ?>
					<div class="wk-group">
						<h2><label><input type="checkbox" class="wk-g" data-g="<?php echo esc_attr( $g ); ?>"> <?php echo esc_html( $glabel ); ?></label></h2>
						<table class="widefat striped wk-pages">
							<tbody>
							<?php
							foreach ( $cat as $key => $p ) :
								if ( $p[2] !== $g ) {
									continue;
								}
								$id     = $built[ $key ] ?? 0;
								$st     = $id ? get_post_status( $id ) : '';
								$ishome = WK_Pages::is_home( $key );
								$taken  = $ishome ? 0 : self::address_taken( $p[1], $id );
								$addr   = $ishome ? home_url( '/' ) : home_url( '/' . $p[1] . '/' );
								$islive = $id && 'publish' === $st && ( ! $ishome || $front === $id );
								?>
								<tr id="wk-row-<?php echo esc_attr( $key ); ?>">
									<th scope="row" class="check-column"><input type="checkbox" name="pages[]" value="<?php echo esc_attr( $key ); ?>" data-g="<?php echo esc_attr( $g ); ?>" data-built="<?php echo $id ? '1' : '0'; ?>" id="wk-p-<?php echo esc_attr( $key ); ?>"></th>
									<td class="wk-name">
										<label for="wk-p-<?php echo esc_attr( $key ); ?>"><strong><?php echo esc_html( $p[0] ); ?></strong></label>
										<span class="wk-desc"><?php echo esc_html( $p[3] ); ?></span>
										<code><?php echo esc_html( wp_make_link_relative( $addr ) ); ?></code>
									</td>
									<td class="wk-status">
										<?php if ( ! $id ) : ?>
											<span class="wk-pill"><?php esc_html_e( 'Not built yet', 'wulf-kit' ); ?></span>
											<?php if ( $taken ) : ?>
												<span class="wk-note"><?php esc_html_e( 'Your current page at this address stays live until you click Go live.', 'wulf-kit' ); ?></span>
											<?php endif; ?>
										<?php else : ?>
											<span class="wk-pill <?php echo $islive ? 'on' : 'draft'; ?>"><?php echo $islive ? esc_html__( 'Live', 'wulf-kit' ) : esc_html__( 'Built · not live yet', 'wulf-kit' ); ?></span>
											<a href="<?php echo esc_url( admin_url( 'post.php?post=' . $id . '&action=elementor' ) ); ?>"><?php esc_html_e( 'Edit in Elementor', 'wulf-kit' ); ?></a> ·
											<a href="<?php echo esc_url( 'publish' === $st ? get_permalink( $id ) : get_preview_post_link( $id ) ); ?>" target="_blank"><?php echo 'publish' === $st ? esc_html__( 'View', 'wulf-kit' ) : esc_html__( 'Preview', 'wulf-kit' ); ?></a>
											<?php if ( ! $islive ) : ?>
												<?php
												$msg = $ishome
													? __( 'Make this the homepage of your site now? Your current homepage is kept (not deleted).', 'wulf-kit' )
													: ( $taken ? __( 'Put this page live now? Your current page at this address moves to the trash (you can restore it for 30 days).', 'wulf-kit' ) : __( 'Publish this page now?', 'wulf-kit' ) );
												?>
												<a class="button button-primary button-small wk-live" href="<?php echo esc_url( self::golive_url( $key ) ); ?>" data-confirm="<?php echo esc_attr( $msg ); ?>"><?php esc_html_e( 'Go live', 'wulf-kit' ); ?></a>
											<?php endif; ?>
										<?php endif; ?>
									</td>
								</tr>
							<?php endforeach; ?>
							</tbody>
						</table>
					</div>
				<?php endforeach; ?>

				<div class="wk-opts card">
					<h2><?php esc_html_e( 'How to build them', 'wulf-kit' ); ?></h2>
					<p><strong><?php esc_html_e( 'New pages', 'wulf-kit' ); ?></strong><br>
						<label><input type="radio" name="status" value="draft" checked> <?php esc_html_e( 'Save as drafts, so I can check them first (recommended)', 'wulf-kit' ); ?></label><br>
						<label><input type="radio" name="status" value="publish"> <?php esc_html_e( 'Publish right away (a page whose address your current site still uses is saved as a draft instead)', 'wulf-kit' ); ?></label>
					</p>
					<p><strong><?php esc_html_e( 'Pages already built', 'wulf-kit' ); ?></strong><br>
						<label><input type="radio" name="existing" value="skip" checked> <?php esc_html_e( 'Leave them as they are', 'wulf-kit' ); ?></label><br>
						<label><input type="radio" name="existing" value="fresh"> <?php esc_html_e( 'Build a fresh copy (your edited copy is kept too)', 'wulf-kit' ); ?></label>
					</p>
					<p><strong><?php esc_html_e( 'Also', 'wulf-kit' ); ?></strong><br>
						<label><input type="checkbox" name="sitewide" value="1" checked> <?php esc_html_e( 'Use the Wulf header and footer on every page', 'wulf-kit' ); ?>
							<?php if ( self::tpl_alive( $set['header_tpl'] ) ) : ?><em>(<?php esc_html_e( 'already set up; kept as is', 'wulf-kit' ); ?>)</em><?php endif; ?></label><br>
						<label><input type="checkbox" name="menu" value="1" checked> <?php esc_html_e( 'Create or refresh the "Wulf main menu" so it links to these pages', 'wulf-kit' ); ?></label><br>
						<label><input type="checkbox" name="saved" value="1"> <?php esc_html_e( 'Also save each page in Elementor › Saved Templates, to insert into any page later', 'wulf-kit' ); ?></label><br>
						<label><input type="checkbox" name="front" value="1"> <?php esc_html_e( 'Make the new homepage (Home or Home (simpler)) the site\'s homepage (only when it\'s published)', 'wulf-kit' ); ?></label>
					</p>
					<?php submit_button( __( 'Build selected pages', 'wulf-kit' ), 'primary large', 'submit', false ); ?>
					<p class="description"><?php esc_html_e( 'Nothing on your site is deleted when building. Pages keep the same addresses as your live site, so links and Google keep working once they go live.', 'wulf-kit' ); ?></p>
				</div>
			</form>
		</div>
		<style>
			.wk-setup .wk-intro { max-width: 820px; font-size: 14px; }
			.wk-setup .wk-bar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 18px 0 6px; }
			.wk-setup .wk-count { color: #50575e; margin-left: 6px; }
			.wk-setup .wk-group h2 { margin: 26px 0 8px; font-size: 15px; }
			.wk-setup .wk-pages { max-width: 1100px; }
			.wk-setup .wk-pages th.check-column { width: 2.2em; padding: 14px 0 0 10px; }
			.wk-setup .wk-name { padding: 12px 10px; }
			.wk-setup .wk-name strong { font-size: 14px; }
			.wk-setup .wk-desc { display: block; margin: 3px 0 5px; color: #50575e; }
			.wk-setup .wk-name code { font-size: 12px; }
			.wk-setup .wk-status { width: 40%; padding: 12px 10px; line-height: 2; }
			.wk-setup .wk-pill { display: inline-block; margin-right: 8px; padding: 0 9px; border-radius: 99px; background: #f0f0f1; font-size: 12px; line-height: 22px; }
			.wk-setup .wk-pill.on { background: #d1f0d8; color: #0a5b1f; }
			.wk-setup .wk-pill.draft { background: #fcf0d4; color: #6b4a00; }
			.wk-setup .wk-note { display: block; color: #50575e; font-size: 12px; line-height: 1.5; }
			.wk-setup .wk-live { margin-left: 6px !important; }
			.wk-setup .wk-opts { max-width: 820px; margin-top: 28px; padding: 6px 22px 18px; }
			.wk-setup .wk-opts label { line-height: 2; }
		</style>
		<script>
		( function () {
			var boxes = [].slice.call( document.querySelectorAll( '.wk-pages input[name="pages[]"]' ) ), count = document.querySelector( '.wk-count' );
			function update() {
				var n = boxes.filter( function ( b ) { return b.checked; } ).length;
				count.textContent = n ? n + ' <?php echo esc_js( __( 'selected', 'wulf-kit' ) ); ?>' : '';
				[].forEach.call( document.querySelectorAll( '.wk-g' ), function ( g ) {
					var mine = boxes.filter( function ( b ) { return b.dataset.g === g.dataset.g; } ), on = mine.filter( function ( b ) { return b.checked; } ).length;
					g.checked = on === mine.length; g.indeterminate = on > 0 && on < mine.length;
				} );
			}
			boxes.forEach( function ( b ) { b.addEventListener( 'change', update ); } );
			[].forEach.call( document.querySelectorAll( '.wk-g' ), function ( g ) {
				g.addEventListener( 'change', function () { boxes.forEach( function ( b ) { if ( b.dataset.g === g.dataset.g ) b.checked = g.checked; } ); update(); } );
			} );
			[].forEach.call( document.querySelectorAll( '[data-wk-all]' ), function ( btn ) {
				btn.addEventListener( 'click', function () { var m = btn.dataset.wkAll; boxes.forEach( function ( b ) { b.checked = m === '1' || ( m === 'new' && b.dataset.built === '0' ); } ); update(); } );
			} );
			[].forEach.call( document.querySelectorAll( '.wk-live' ), function ( a ) {
				a.addEventListener( 'click', function ( e ) { if ( ! window.confirm( a.dataset.confirm ) ) e.preventDefault(); } );
			} );
			document.querySelector( '.wk-setup form' ).addEventListener( 'submit', function ( e ) {
				if ( ! boxes.some( function ( b ) { return b.checked; } ) && ! window.confirm( '<?php echo esc_js( __( 'No pages are ticked. Only set up the header, footer and menu?', 'wulf-kit' ) ); ?>' ) ) e.preventDefault();
			} );
			update();
		} )();
		</script>
		<?php
	}
}
