<?php
/**
 * Design sets: the whole site in one look, switched in one go. A set is a homepage from the page
 * library plus the look and corners that every other page, the header and the footer follow:
 * Night (Home (conversion), rounded corners), Daylight (Home (daylight), square corners) and
 * Daylight with cut corners. Admins can preview a set on the real site first (only they see it),
 * then make it live, keeping the homepage it replaces as a draft or moving it to the trash.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Sets {

	const COOKIE = 'wk_set_preview';
	const NOTICE = 'wk_set_report';

	/** @var string|null The set being previewed, once known. */
	private static $preview = null;

	/** @var int|null The previewed set's homepage, once looked up. */
	private static $home = null;

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ), 15 );
		add_action( 'admin_post_wk_set_live', array( __CLASS__, 'handle' ) );
		add_action( 'init', array( __CLASS__, 'preview_switch' ), 20 );
		add_action( 'template_redirect', array( __CLASS__, 'preview_headers' ) );
		add_filter( 'pre_option_show_on_front', array( __CLASS__, 'preview_show_on_front' ) );
		add_filter( 'pre_option_page_on_front', array( __CLASS__, 'preview_front' ) );
		add_action( 'wp_footer', array( __CLASS__, 'preview_bar' ), 50 );
		add_action( 'admin_bar_menu', array( __CLASS__, 'admin_bar' ), 90 );
	}

	public static function menu() {
		add_submenu_page( 'wulf-kit', __( 'Design sets', 'wulf-kit' ), __( 'Design sets', 'wulf-kit' ), 'manage_options', 'wulf-kit-sets', array( __CLASS__, 'page' ) );
	}

	/** The sets: key => title, homepage (page library key), look, corners, short name, what it is. */
	public static function all() {
		return array(
			'night'   => array(
				'title'   => __( 'Night', 'wulf-kit' ),
				'short'   => __( 'Night', 'wulf-kit' ),
				'home'    => 'home-conversion',
				'look'    => 'night',
				'corners' => 'auto',
				'desc'    => __( 'The look the site was designed in: a dark header, hero and footer, gold buttons and rounded corners. Home (conversion) is the homepage, and every other page keeps its own design.', 'wulf-kit' ),
			),
			'day'     => array(
				'title'   => __( 'Daylight', 'wulf-kit' ),
				'short'   => __( 'Daylight', 'wulf-kit' ),
				'home'    => 'home-daylight',
				'look'    => 'day',
				'corners' => 'auto',
				'desc'    => __( 'Warm paper and white instead of the dark header, hero and footer, ink buttons, gold kept for small accents, and square corners. Home (daylight) is the homepage, its headline centred above a display case, and every other page follows in Daylight.', 'wulf-kit' ),
			),
			'day-cut' => array(
				'title'   => __( 'Daylight, cut corners', 'wulf-kit' ),
				'short'   => __( 'Cut corners', 'wulf-kit' ),
				'home'    => 'home-daylight',
				'look'    => 'day',
				'corners' => 'cut',
				'desc'    => __( 'Daylight with the corners of buttons, cards, fields and photos cut away like a step-cut diamond. Home (daylight) is the homepage, and every other page follows.', 'wulf-kit' ),
			),
		);
	}

	/** Which set a look and corners make ('' for a mix that isn't one of the sets). */
	public static function set_for( $look, $corners ) {
		$corners = in_array( $corners, array( 'round', 'square', 'cut' ), true ) ? $corners : 'auto';
		if ( 'day' !== $look ) {
			return in_array( $corners, array( 'auto', 'round' ), true ) ? 'night' : '';
		}
		if ( 'cut' === $corners ) {
			return 'day-cut';
		}
		return in_array( $corners, array( 'auto', 'square' ), true ) ? 'day' : '';
	}

	/** The set visitors see now, from Wulf Kit › Settings ('' when its look and corners were mixed by hand). */
	public static function live() {
		return self::set_for( (string) WK_Settings::get( 'look' ), (string) WK_Settings::get( 'corners' ) );
	}

	/** The site's look and corners: the settings, or the set this admin is previewing. */
	public static function site_look() {
		$set = self::preview();
		if ( $set ) {
			$s = self::all()[ $set ];
			return array( 'look' => $s['look'], 'corners' => $s['corners'] );
		}
		return array( 'look' => (string) WK_Settings::get( 'look' ), 'corners' => (string) WK_Settings::get( 'corners' ) );
	}

	/* ================================================================
	 * Preview: an admin sees a set on the real site, visitors don't
	 * ============================================================== */

	/** The set this admin is previewing ('' when none). Only people who can make a set live can preview one. */
	public static function preview() {
		if ( null !== self::$preview ) {
			return self::$preview;
		}
		if ( ! did_action( 'init' ) ) {
			return ''; // Who's looking isn't known yet.
		}
		self::$preview = '';
		$key           = isset( $_COOKIE[ self::COOKIE ] ) ? sanitize_key( wp_unslash( $_COOKIE[ self::COOKIE ] ) ) : '';
		if ( $key && isset( self::all()[ $key ] ) && ! is_admin() && current_user_can( 'manage_options' ) ) {
			self::$preview = $key;
		}
		return self::$preview;
	}

	/** "?wk_set=day" starts previewing a set, "?wk_set=off" stops. */
	public static function preview_switch() {
		if ( ! isset( $_GET['wk_set'] ) || is_admin() || ! current_user_can( 'manage_options' ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return;
		}
		$key = sanitize_key( wp_unslash( $_GET['wk_set'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( isset( self::all()[ $key ] ) ) {
			self::cookie( $key );
		} else {
			self::cookie( '' );
		}
	}

	private static function cookie( $key ) {
		if ( ! headers_sent() ) {
			setcookie(
				self::COOKIE,
				$key,
				array(
					'expires'  => $key ? 0 : time() - YEAR_IN_SECONDS,
					'path'     => COOKIEPATH ? COOKIEPATH : '/',
					'domain'   => COOKIE_DOMAIN ? COOKIE_DOMAIN : '',
					'secure'   => is_ssl(),
					'httponly' => true,
					'samesite' => 'Lax',
				)
			);
		}
		if ( $key ) {
			$_COOKIE[ self::COOKIE ] = $key;
		} else {
			unset( $_COOKIE[ self::COOKIE ] );
		}
		self::$preview = null;
		self::$home    = null;
	}

	/** A previewed page is never stored by a page cache. */
	public static function preview_headers() {
		if ( self::preview() ) {
			nocache_headers();
		}
	}

	/** The previewed set's homepage, when it's built (drafts too: only an admin sees the preview). */
	private static function preview_home() {
		if ( null !== self::$home ) {
			return self::$home;
		}
		$set = self::preview();
		if ( ! $set ) {
			return 0;
		}
		if ( wp_doing_ajax() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || isset( $_GET['elementor-preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return 0;
		}
		self::$home = 0; // Looking the pages up reads these options too: they read as saved meanwhile.
		$built      = WK_Pages::built();
		self::$home = (int) ( $built[ self::all()[ $set ]['home'] ] ?? 0 );
		return self::$home;
	}

	public static function preview_show_on_front( $pre ) {
		return self::preview_home() ? 'page' : $pre;
	}

	public static function preview_front( $pre ) {
		$home = self::preview_home();
		return $home ? $home : $pre;
	}

	/** Address of this page with a preview choice ("off" stops previewing). */
	private static function here( $key ) {
		return add_query_arg( 'wk_set', $key, remove_query_arg( 'wk_set' ) );
	}

	/** The Design sets screen, with a set already chosen. */
	private static function screen_url( $set = '' ) {
		$url = add_query_arg( array( 'page' => 'wulf-kit-sets' ), admin_url( 'admin.php' ) );
		return $set ? add_query_arg( 'set', $set, $url ) . '#wk-sets-go' : $url;
	}

	/** The small bar on the site while previewing: switch sets, make it live, or stop. */
	public static function preview_bar() {
		$set = self::preview();
		if ( ! $set || isset( $_GET['elementor-preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return;
		}
		$sets = self::all();
		$live = self::live();
		?>
		<div id="wk-pvbar" role="region" aria-label="<?php esc_attr_e( 'Design set preview', 'wulf-kit' ); ?>">
			<span class="wk-pv-k"><?php esc_html_e( 'Preview', 'wulf-kit' ); ?></span>
			<span class="wk-pv-sets">
				<?php foreach ( $sets as $key => $s ) : ?>
					<a href="<?php echo esc_url( self::here( $key ) ); ?>"<?php echo $key === $set ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $s['short'] ); ?></a>
				<?php endforeach; ?>
			</span>
			<span class="wk-pv-note">
				<?php
				if ( $set === $live ) {
					esc_html_e( 'This set is live.', 'wulf-kit' );
				} else {
					/* translators: %s: name of the live design set */
					echo esc_html( $live ? sprintf( __( 'Only you see this. Visitors see %s.', 'wulf-kit' ), $sets[ $live ]['title'] ) : __( 'Only you see this.', 'wulf-kit' ) );
				}
				?>
			</span>
			<?php if ( $set !== $live ) : ?>
				<a class="wk-pv-go" href="<?php echo esc_url( self::screen_url( $set ) ); ?>"><?php esc_html_e( 'Make it live', 'wulf-kit' ); ?></a>
			<?php endif; ?>
			<a class="wk-pv-x" href="<?php echo esc_url( self::here( 'off' ) ); ?>" title="<?php esc_attr_e( 'Stop previewing', 'wulf-kit' ); ?>" aria-label="<?php esc_attr_e( 'Stop previewing', 'wulf-kit' ); ?>">&times;</a>
		</div>
		<style>
			#wk-pvbar { position: fixed; z-index: 99999; left: 16px; bottom: 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; max-width: calc(100vw - 32px); padding: 8px 8px 8px 14px; border-radius: 10px; background: #0d1320; color: #e9ecf0; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, .5); font: 500 13px/1.3 system-ui, -apple-system, "Segoe UI", sans-serif; }
			#wk-pvbar a { color: inherit; text-decoration: none; }
			#wk-pvbar .wk-pv-k { font-weight: 700; font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; color: #d6b97f; }
			#wk-pvbar .wk-pv-sets { display: inline-flex; padding: 2px; border-radius: 7px; background: rgba(255, 255, 255, .08); }
			#wk-pvbar .wk-pv-sets a { padding: 5px 10px; border-radius: 5px; }
			#wk-pvbar .wk-pv-sets a:hover { background: rgba(255, 255, 255, .1); }
			#wk-pvbar .wk-pv-sets a[aria-current] { background: #fff; color: #0d1320; font-weight: 650; }
			#wk-pvbar .wk-pv-note { color: #aab1bb; }
			#wk-pvbar .wk-pv-go { padding: 6px 12px; border-radius: 6px; background: #d6b97f; color: #0d1320; font-weight: 650; }
			#wk-pvbar .wk-pv-go:hover { background: #e4cb98; }
			#wk-pvbar .wk-pv-x { width: 28px; height: 28px; border-radius: 6px; font-size: 20px; line-height: 27px; text-align: center; color: #aab1bb; }
			#wk-pvbar .wk-pv-x:hover { background: rgba(255, 255, 255, .1); color: #fff; }
			#wk-pvbar a:focus-visible { outline: 2px solid #d6b97f; outline-offset: 2px; }
			@media (max-width: 1200px) { #wk-pvbar .wk-pv-note { display: none; } }
			@media (max-width: 860px) { body.wk-has-actbar #wk-pvbar { bottom: 84px; } }
			@media print { #wk-pvbar { display: none; } }
		</style>
		<?php
	}

	/** Admin bar (on the site): preview any set, or open Design sets. */
	public static function admin_bar( $bar ) {
		if ( is_admin() || ! current_user_can( 'manage_options' ) || ! is_object( $bar ) ) {
			return;
		}
		$sets = self::all();
		$live = self::live();
		$set  = self::preview();
		$bar->add_node(
			array(
				'id'    => 'wk-sets',
				/* translators: %s: name of a design set */
				'title' => $set ? sprintf( __( 'Previewing: %s', 'wulf-kit' ), $sets[ $set ]['title'] ) : sprintf( __( 'Design: %s', 'wulf-kit' ), $live ? $sets[ $live ]['title'] : __( 'your own mix', 'wulf-kit' ) ),
				'href'  => self::screen_url(),
			)
		);
		foreach ( $sets as $key => $s ) {
			$bar->add_node(
				array(
					'parent' => 'wk-sets',
					'id'     => 'wk-sets-' . $key,
					/* translators: %s: name of a design set */
					'title'  => sprintf( $key === $live ? __( 'Preview %s (live)', 'wulf-kit' ) : __( 'Preview %s', 'wulf-kit' ), $s['title'] ),
					'href'   => self::here( $key ),
				)
			);
		}
		if ( $set ) {
			$bar->add_node( array( 'parent' => 'wk-sets', 'id' => 'wk-sets-off', 'title' => __( 'Stop previewing', 'wulf-kit' ), 'href' => self::here( 'off' ) ) );
		}
		$bar->add_node( array( 'parent' => 'wk-sets', 'id' => 'wk-sets-admin', 'title' => __( 'Design sets…', 'wulf-kit' ), 'href' => self::screen_url() ) );
	}

	/* ================================================================
	 * Making a set live
	 * ============================================================== */

	/**
	 * Put a set live: its homepage becomes the site's homepage (built first if needed), the other
	 * homepage versions are unpublished, trashed or left alone, and Wulf Kit › Settings › Look and
	 * Corners change, so every page, the header and the footer follow.
	 *
	 * @param string $set Set key.
	 * @param array  $o   pages: keep (as they are) | missing (build what's missing, put every page live) | fresh (rebuild all);
	 *                    others: draft | trash | keep (the other homepage versions).
	 * @return array|false Report.
	 */
	public static function make_live( $set, $o = array() ) {
		$sets = self::all();
		if ( ! isset( $sets[ $set ] ) ) {
			return false;
		}
		$s   = $sets[ $set ];
		$o   = wp_parse_args( $o, array( 'pages' => 'keep', 'others' => 'draft' ) );
		$r   = array( 'set' => $set, 'prev' => self::live(), 'built' => array(), 'fresh' => array(), 'live' => array(), 'others' => array(), 'others_to' => $o['others'], 'home' => 0 );
		$was = 'page' === get_option( 'show_on_front' ) ? (int) get_option( 'page_on_front' ) : 0;
		if ( function_exists( 'set_time_limit' ) ) {
			@set_time_limit( 300 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged -- Building every page takes a while on slow hosts.
		}

		// 1. Pages: the set's homepage, and every other library page when asked.
		$keys = array( $s['home'] );
		if ( 'keep' !== $o['pages'] ) {
			foreach ( array_keys( WK_Pages::catalog() ) as $key ) {
				if ( ! WK_Pages::is_home( $key ) ) {
					$keys[] = $key;
				}
			}
		}
		foreach ( $keys as $key ) {
			$have = WK_Pages::built( true )[ $key ] ?? 0;
			if ( $have && 'fresh' === $o['pages'] ) {
				if ( ! WK_Templates::build_page( $key, 'draft' ) ) {
					continue;
				}
				if ( WK_Pages::is_home( $key ) ) {
					wp_trash_post( $have ); // A homepage going live leaves other pages at its address alone, so the old copy goes first.
				}
				$r['fresh'][] = $key;
			} elseif ( ! $have ) {
				if ( ! WK_Templates::build_page( $key, 'draft' ) ) {
					continue;
				}
				$r['built'][] = $key;
			}
			$id = WK_Pages::built( true )[ $key ] ?? 0;
			if ( $id && ( $key === $s['home'] || 'publish' !== get_post_status( $id ) ) && WK_Templates::go_live( $key ) && $key !== $s['home'] ) {
				$r['live'][] = $key; // Any old page at the same address is in the trash now.
			}
		}
		$home      = (int) ( WK_Pages::built( true )[ $s['home'] ] ?? 0 );
		$r['home'] = $home;

		// 2. The other homepage versions: the one being replaced, and any other published one from the library.
		$others = array();
		if ( $was && $was !== $home ) {
			$others[] = $was;
		}
		foreach ( WK_Pages::built() as $key => $id ) {
			if ( WK_Pages::is_home( $key ) && $id !== $home && 'publish' === get_post_status( $id ) ) {
				$others[] = $id;
			}
		}
		foreach ( array_unique( $others ) as $id ) {
			$st = get_post_status( $id );
			if ( 'trash' === $o['others'] && $st && 'trash' !== $st ) {
				wp_trash_post( $id );
			} elseif ( 'draft' === $o['others'] && 'publish' === $st ) {
				wp_update_post( array( 'ID' => $id, 'post_status' => 'draft' ) );
			} else {
				continue;
			}
			$r['others'][] = get_the_title( $id );
		}

		// 3. The Wulf header and footer on every page, when they aren't set up yet.
		WK_Templates::run_selected( array( 'keys' => array(), 'sitewide' => true, 'menu' => false ) );

		// 4. The look and corners every page follows.
		$opt            = get_option( WK_Settings::OPTION, array() );
		$opt            = wp_parse_args( is_array( $opt ) ? $opt : array(), WK_Settings::defaults() );
		$opt['look']    = $s['look'];
		$opt['corners'] = $s['corners'];
		update_option( WK_Settings::OPTION, $opt );
		WK_Settings::flush();
		WK_Pages::built( true );

		self::purge_caches();
		return $r;
	}

	/** Page caches we know of, so visitors see the new set straight away. */
	private static function purge_caches() {
		if ( function_exists( 'rocket_clean_domain' ) ) {
			rocket_clean_domain();
		}
		if ( function_exists( 'w3tc_flush_all' ) ) {
			w3tc_flush_all();
		}
		if ( function_exists( 'wp_cache_clear_cache' ) ) {
			wp_cache_clear_cache();
		}
		if ( function_exists( 'sg_cachepress_purge_cache' ) ) {
			sg_cachepress_purge_cache();
		}
		if ( class_exists( 'WpFastestCache' ) && method_exists( 'WpFastestCache', 'deleteCache' ) ) {
			( new WpFastestCache() )->deleteCache( true );
		}
		do_action( 'litespeed_purge_all' );
		do_action( 'breeze_clear_all_cache' );
		do_action( 'wk_set_live' );
	}

	public static function handle() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'wk_set_live' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'wulf-kit' ) );
		}
		$set    = sanitize_key( wp_unslash( $_POST['set'] ?? '' ) );
		$pages  = sanitize_key( wp_unslash( $_POST['pages'] ?? '' ) );
		$others = sanitize_key( wp_unslash( $_POST['others'] ?? '' ) );
		$r      = self::make_live(
			$set,
			array(
				'pages'  => in_array( $pages, array( 'keep', 'missing', 'fresh' ), true ) ? $pages : 'keep',
				'others' => in_array( $others, array( 'draft', 'trash', 'keep' ), true ) ? $others : 'draft',
			)
		);
		if ( $r ) {
			set_transient( self::NOTICE . '_' . get_current_user_id(), $r, 300 );
			self::cookie( '' ); // The preview has done its job.
		}
		wp_safe_redirect( add_query_arg( array( 'page' => 'wulf-kit-sets', 'done' => $r ? 1 : 0 ), admin_url( 'admin.php' ) ) );
		exit;
	}

	/* ================================================================
	 * Admin screen
	 * ============================================================== */

	public static function page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$sets   = self::all();
		$live   = self::live();
		$cat    = WK_Pages::catalog();
		$built  = WK_Pages::built( true );
		$front  = 'page' === get_option( 'show_on_front' ) ? (int) get_option( 'page_on_front' ) : 0;
		$asked  = isset( $_GET['set'] ) ? sanitize_key( wp_unslash( $_GET['set'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$pick   = isset( $sets[ $asked ] ) ? $asked : ( $live ? $live : 'night' );
		$report = isset( $_GET['done'] ) ? get_transient( self::NOTICE . '_' . get_current_user_id() ) : false; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( $report ) {
			delete_transient( self::NOTICE . '_' . get_current_user_id() );
		}

		// Library pages (homepages aside) not built yet, and built but not live.
		$missing = 0;
		$notlive = 0;
		foreach ( $cat as $key => $p ) {
			if ( WK_Pages::is_home( $key ) ) {
				continue;
			}
			if ( empty( $built[ $key ] ) ) {
				++$missing;
			} elseif ( 'publish' !== get_post_status( $built[ $key ] ) ) {
				++$notlive;
			}
		}
		// Per set: the homepage versions that would be unpublished or trashed.
		$others = array();
		foreach ( $sets as $key => $s ) {
			$home           = (int) ( $built[ $s['home'] ] ?? 0 );
			$ids            = $front && $front !== $home ? array( $front ) : array();
			foreach ( $built as $k => $id ) {
				if ( WK_Pages::is_home( $k ) && $id !== $home && 'publish' === get_post_status( $id ) ) {
					$ids[] = $id;
				}
			}
			$others[ $key ] = array_map(
				static function ( $id ) use ( $front ) {
					/* translators: %s: page title */
					return $id === $front ? sprintf( __( '%s (your homepage now)', 'wulf-kit' ), get_the_title( $id ) ) : get_the_title( $id );
				},
				array_values( array_unique( $ids ) )
			);
		}
		$thumbs = WK_URL . 'assets/media/sets/';
		?>
		<div class="wrap wk-sets">
			<h1><?php esc_html_e( 'Design sets', 'wulf-kit' ); ?></h1>
			<p class="wk-intro"><?php esc_html_e( 'Your whole site in one look, switched in one go. Each set is a homepage plus the look that every other page, the header and the footer follow. Preview a set on your real site first: only you see it, and visitors keep the live set until you make another one live.', 'wulf-kit' ); ?></p>

			<?php if ( $report && isset( $sets[ $report['set'] ] ) ) : ?>
				<div class="notice notice-success"><p>
					<?php
					/* translators: %s: name of a design set */
					echo esc_html( sprintf( __( '%s is live.', 'wulf-kit' ), $sets[ $report['set'] ]['title'] ) ) . ' ';
					if ( $report['home'] ) {
						/* translators: %s: page title */
						echo esc_html( sprintf( __( 'Your homepage is now %s.', 'wulf-kit' ), get_the_title( $report['home'] ) ) ) . ' ';
					}
					if ( $report['built'] ) {
						/* translators: %d: number of pages */
						echo esc_html( sprintf( _n( 'Built %d new page.', 'Built %d new pages.', count( $report['built'] ), 'wulf-kit' ), count( $report['built'] ) ) ) . ' ';
					}
					if ( $report['fresh'] ) {
						/* translators: %d: number of pages */
						echo esc_html( sprintf( _n( 'Rebuilt %d page fresh; the old copy is in Pages › Trash.', 'Rebuilt %d pages fresh; the old copies are in Pages › Trash.', count( $report['fresh'] ), 'wulf-kit' ), count( $report['fresh'] ) ) ) . ' ';
					}
					if ( $report['others'] ) {
						$list = implode( ', ', $report['others'] );
						/* translators: %s: list of page titles */
						echo esc_html( sprintf( 'trash' === $report['others_to'] ? __( 'Moved to the trash (restorable for 30 days): %s.', 'wulf-kit' ) : __( 'Unpublished and kept as drafts: %s.', 'wulf-kit' ), $list ) ) . ' ';
					}
					?>
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" target="_blank"><?php esc_html_e( 'View your site', 'wulf-kit' ); ?></a>
					<?php if ( $report['prev'] && $report['prev'] !== $report['set'] && isset( $sets[ $report['prev'] ] ) ) : ?>
						· <a href="<?php echo esc_url( self::screen_url( $report['prev'] ) ); ?>">
							<?php
							/* translators: %s: name of a design set */
							echo esc_html( sprintf( __( 'Changed your mind? Switch back to %s', 'wulf-kit' ), $sets[ $report['prev'] ]['title'] ) );
							?>
						</a>
					<?php endif; ?>
				</p></div>
			<?php elseif ( isset( $_GET['done'] ) && ! $report ) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended ?>
				<div class="notice notice-error"><p><?php esc_html_e( 'That set couldn\'t be made live. Please try again.', 'wulf-kit' ); ?></p></div>
			<?php endif; ?>

			<p class="wk-now">
				<?php
				if ( $live ) {
					/* translators: %s: name of a design set */
					echo wp_kses( sprintf( __( 'Live now: <strong>%s</strong>', 'wulf-kit' ), esc_html( $sets[ $live ]['title'] ) ), array( 'strong' => array() ) );
				} else {
					$l       = WK_Plugin::look();
					$corners = array( 'round' => __( 'rounded', 'wulf-kit' ), 'square' => __( 'square', 'wulf-kit' ), 'cut' => __( 'cut', 'wulf-kit' ) );
					/* translators: 1: Night or Daylight, 2: rounded, square or cut */
					echo esc_html( sprintf( __( 'Live now: your own mix (%1$s look, %2$s corners), set in Wulf Kit › Settings.', 'wulf-kit' ), 'day' === $l['look'] ? __( 'Daylight', 'wulf-kit' ) : __( 'Night', 'wulf-kit' ), $corners[ $l['corners'] ] ?? $l['corners'] ) );
				}
				if ( $front ) {
					echo ' · ';
					/* translators: %s: page title */
					printf( esc_html__( 'homepage: %s', 'wulf-kit' ), '<a href="' . esc_url( home_url( '/' ) ) . '" target="_blank">' . esc_html( get_the_title( $front ) ) . '</a>' );
				}
				?>
			</p>

			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" class="wk-sets-form">
				<?php wp_nonce_field( 'wk_set_live' ); ?>
				<input type="hidden" name="action" value="wk_set_live">

				<div class="wk-cards" role="radiogroup" aria-label="<?php esc_attr_e( 'Design sets', 'wulf-kit' ); ?>">
					<?php
					foreach ( $sets as $key => $s ) :
						$home_id = (int) ( $built[ $s['home'] ] ?? 0 );
						$is_live = $key === $live && $home_id && $home_id === $front;
						$file    = WK_DIR . 'assets/media/sets/' . $key . '.webp';
						?>
						<div class="wk-card<?php echo $key === $pick ? ' is-picked' : ''; ?>" data-set="<?php echo esc_attr( $key ); ?>" data-others="<?php echo esc_attr( wp_json_encode( $others[ $key ] ) ); ?>" data-title="<?php echo esc_attr( $s['title'] ); ?>">
							<?php if ( file_exists( $file ) ) : ?>
								<img class="wk-shot" src="<?php echo esc_url( $thumbs . $key . '.webp?v=' . WK_VERSION ); ?>" alt="" width="600" height="375" loading="lazy">
							<?php endif; ?>
							<label class="wk-pick">
								<input type="radio" name="set" value="<?php echo esc_attr( $key ); ?>" <?php checked( $key, $pick ); ?>>
								<span class="wk-title"><?php echo esc_html( $s['title'] ); ?></span>
								<?php if ( $is_live ) : ?>
									<span class="wk-pill on"><?php esc_html_e( 'Live now', 'wulf-kit' ); ?></span>
								<?php elseif ( $key === $live ) : ?>
									<span class="wk-pill part"><?php esc_html_e( 'Look is live', 'wulf-kit' ); ?></span>
								<?php endif; ?>
							</label>
							<p class="wk-desc"><?php echo esc_html( $s['desc'] ); ?></p>
							<p class="wk-facts">
								<?php
								/* translators: %s: page title */
								echo esc_html( sprintf( __( 'Homepage: %s', 'wulf-kit' ), $cat[ $s['home'] ][0] ) ) . ' · ';
								if ( ! $home_id ) {
									esc_html_e( 'built when you make the set live', 'wulf-kit' );
								} elseif ( $home_id === $front ) {
									esc_html_e( 'your homepage now', 'wulf-kit' );
								} else {
									echo 'publish' === get_post_status( $home_id ) ? esc_html__( 'built', 'wulf-kit' ) : esc_html__( 'built, not published', 'wulf-kit' );
								}
								if ( $key === $live && $home_id !== $front && $front ) {
									echo '<br><span class="wk-warn">' . esc_html__( 'The look is live, but your homepage is another page. Make this set live to use its homepage.', 'wulf-kit' ) . '</span>';
								}
								?>
							</p>
							<p class="wk-links">
								<a href="<?php echo esc_url( add_query_arg( 'wk_set', $key, home_url( '/' ) ) ); ?>" target="_blank"><?php esc_html_e( 'Preview on your site', 'wulf-kit' ); ?></a>
								<?php if ( $home_id ) : ?>
									· <a href="<?php echo esc_url( admin_url( 'post.php?post=' . $home_id . '&action=elementor' ) ); ?>"><?php esc_html_e( 'Edit its homepage', 'wulf-kit' ); ?></a>
								<?php endif; ?>
							</p>
						</div>
					<?php endforeach; ?>
				</div>

				<div class="card wk-go" id="wk-sets-go">
					<h2><?php esc_html_e( 'Make the chosen set live', 'wulf-kit' ); ?></h2>
					<p><strong><?php esc_html_e( 'Pages', 'wulf-kit' ); ?></strong><br>
						<label><input type="radio" name="pages" value="keep" checked> <?php esc_html_e( 'Keep every page as it is. They change to the new look by themselves, and your edits stay (recommended).', 'wulf-kit' ); ?></label><br>
						<label><input type="radio" name="pages" value="missing">
							<?php
							/* translators: 1: number of pages not built yet, 2: number of pages built but not live */
							echo esc_html( sprintf( __( 'Also build the pages that aren\'t built yet and put every library page live (%1$d not built yet, %2$d built but not live). A page from your old site at the same address moves to the trash.', 'wulf-kit' ), $missing, $notlive ) );
							?>
						</label><br>
						<label><input type="radio" name="pages" value="fresh"> <?php esc_html_e( 'Rebuild every page fresh from the library and put them live, to start over. Your current copies move to the trash.', 'wulf-kit' ); ?></label>
					</p>
					<p><strong><?php esc_html_e( 'Your other homepage versions', 'wulf-kit' ); ?></strong> <span class="wk-others"><?php echo esc_html( $others[ $pick ] ? implode( ', ', $others[ $pick ] ) : __( 'none', 'wulf-kit' ) ); ?></span><br>
						<label><input type="radio" name="others" value="draft" checked> <?php esc_html_e( 'Unpublish them and keep them as drafts, so you can switch back any time (recommended)', 'wulf-kit' ); ?></label><br>
						<label><input type="radio" name="others" value="trash"> <?php esc_html_e( 'Move them to the trash', 'wulf-kit' ); ?></label><br>
						<label><input type="radio" name="others" value="keep"> <?php esc_html_e( 'Leave them as they are', 'wulf-kit' ); ?></label>
					</p>
					<p class="wk-submit">
						<button type="submit" class="button button-primary button-hero"><?php esc_html_e( 'Make this set live', 'wulf-kit' ); ?></button>
					</p>
					<p class="description"><?php esc_html_e( 'Visitors see the change straight away. Nothing is deleted for good: pages in the trash can be restored for 30 days (Pages › Trash). Page caches we know of (WP Rocket, LiteSpeed, W3 Total Cache, WP Super Cache, SiteGround, WP Fastest Cache, Breeze) are cleared for you; clear any other cache yourself.', 'wulf-kit' ); ?></p>
				</div>
			</form>
		</div>
		<style>
			.wk-sets .wk-intro { max-width: 860px; font-size: 14px; }
			.wk-sets .wk-now { margin: 14px 0 18px; font-size: 14px; }
			.wk-sets .wk-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px; max-width: 1180px; }
			.wk-sets .wk-card { position: relative; display: flex; flex-direction: column; padding: 0 0 14px; border: 1px solid #dcdcde; border-radius: 6px; background: #fff; cursor: pointer; overflow: hidden; }
			.wk-sets .wk-card:hover { border-color: #8c8f94; }
			.wk-sets .wk-card.is-picked { border-color: #2271b1; box-shadow: 0 0 0 1px #2271b1; }
			.wk-sets .wk-shot { display: block; width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; border-bottom: 1px solid #f0f0f1; background: #f6f7f7; }
			.wk-sets .wk-pick { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 14px 16px 4px; cursor: pointer; }
			.wk-sets .wk-pick input { margin: 0; }
			.wk-sets .wk-title { font-size: 16px; font-weight: 600; }
			.wk-sets .wk-pill { padding: 0 9px; border-radius: 99px; font-size: 12px; line-height: 22px; }
			.wk-sets .wk-pill.on { background: #d1f0d8; color: #0a5b1f; }
			.wk-sets .wk-pill.part { background: #fcf0d4; color: #6b4a00; }
			.wk-sets .wk-desc { margin: 4px 16px 8px; color: #50575e; }
			.wk-sets .wk-facts { margin: 0 16px 8px; font-size: 12.5px; color: #3c434a; }
			.wk-sets .wk-warn { color: #8a5a00; }
			.wk-sets .wk-links { margin: auto 16px 0; padding-top: 4px; }
			.wk-sets .wk-go { max-width: 860px; margin-top: 26px; padding: 6px 22px 18px; }
			.wk-sets .wk-go label { display: inline-block; padding-left: 24px; text-indent: -24px; line-height: 1.6; margin: 3px 0; }
			.wk-sets .wk-others { color: #50575e; }
			.wk-sets .wk-submit { margin: 18px 0 8px; }
		</style>
		<script>
		( function () {
			var form = document.querySelector( '.wk-sets-form' ), cards = [].slice.call( form.querySelectorAll( '.wk-card' ) );
			var btn = form.querySelector( '.wk-submit button' ), others = form.querySelector( '.wk-others' );
			function pick( card ) {
				cards.forEach( function ( c ) { c.classList.toggle( 'is-picked', c === card ); } );
				card.querySelector( 'input[name="set"]' ).checked = true;
				var list = JSON.parse( card.dataset.others || '[]' );
				others.textContent = list.length ? list.join( ', ' ) : '<?php echo esc_js( __( 'none', 'wulf-kit' ) ); ?>';
				btn.textContent = '<?php echo esc_js( __( 'Make %s live', 'wulf-kit' ) ); ?>'.replace( '%s', card.dataset.title );
			}
			cards.forEach( function ( c ) {
				c.addEventListener( 'click', function ( e ) { if ( ! e.target.closest( 'a' ) ) pick( c ); } );
			} );
			pick( form.querySelector( '.wk-card.is-picked' ) || cards[0] );
			form.addEventListener( 'submit', function ( e ) {
				var card = form.querySelector( '.wk-card.is-picked' ), trash = form.querySelector( 'input[name="others"][value="trash"]' ).checked;
				var fresh = form.querySelector( 'input[name="pages"][value="fresh"]' ).checked;
				var msg = '<?php echo esc_js( __( 'Make %s live now? Visitors will see it straight away.', 'wulf-kit' ) ); ?>'.replace( '%s', card.dataset.title );
				if ( fresh ) msg += '\n\n<?php echo esc_js( __( 'Every page is rebuilt fresh: your current copies, and your edits in them, move to the trash.', 'wulf-kit' ) ); ?>';
				if ( trash ) msg += '\n\n<?php echo esc_js( __( 'Your other homepage versions move to the trash.', 'wulf-kit' ) ); ?>';
				if ( ! window.confirm( msg ) ) e.preventDefault();
			} );
		} )();
		</script>
		<?php
	}
}
