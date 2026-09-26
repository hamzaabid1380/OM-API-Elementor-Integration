<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Catalog insights: anonymous daily counts of what visitors do (product
 * views, searches, searches that found nothing, inquiries, compares, story
 * reels watched and tapped), and the Dashboard > Catalog insights page that
 * reads them.
 *
 * Only counts are kept — no visitor, IP or personal data — in one option of
 * daily buckets (the last 120 days, each type capped to its top entries).
 * Writes are batched to one per request, at shutdown.
 */
class OM_Stats {

	const OPTION   = 'om_stats_daily';
	const DAYS     = 120;
	const PER_TYPE = 400;

	/** Types and their labels (the dashboard and CSV use these). */
	public static function types() {
		return array(
			'view'           => __( 'Product views', 'om-catalog' ),
			'search'         => __( 'Searches', 'om-catalog' ),
			'search_zero'    => __( 'Searches with no results', 'om-catalog' ),
			'inquiry'        => __( 'Inquiries', 'om-catalog' ),
			'inquiry_subject' => __( 'Inquiry subjects', 'om-catalog' ),
			'compare'        => __( 'Compared designs', 'om-catalog' ),
			'compare_pair'   => __( 'Compared pairs', 'om-catalog' ),
			'reel_view'      => __( 'Reel views', 'om-catalog' ),
			'reel_tap'       => __( 'Reel taps to product', 'om-catalog' ),
		);
	}

	private static $instance = null;
	private static $pending  = array();

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_ajax_om_track_reel', array( $this, 'handle_track_reel' ) );
		add_action( 'wp_ajax_nopriv_om_track_reel', array( $this, 'handle_track_reel' ) );
		add_action( 'admin_menu', array( $this, 'menu' ) );
		add_action( 'wp_dashboard_setup', array( $this, 'dashboard_widget' ) );
		add_action( 'admin_post_om_insights_csv', array( $this, 'export_csv' ) );
		add_action( 'admin_post_om_insights_reset', array( $this, 'reset' ) );
		add_action( 'admin_post_om_insights_toggle', array( $this, 'toggle' ) );
	}

	public static function enabled() {
		return '0' !== get_option( 'om_track_stats', '1' );
	}

	/**
	 * Count one thing today. Batched: written once at the end of the
	 * request.
	 */
	public static function add( $type, $key, $n = 1 ) {
		if ( ! self::enabled() || ! array_key_exists( $type, self::types() ) ) {
			return;
		}
		$key = trim( wp_strip_all_tags( (string) $key ) );
		$key = function_exists( 'mb_substr' ) ? mb_substr( $key, 0, 120 ) : substr( $key, 0, 120 );
		if ( '' === $key ) {
			return;
		}
		if ( ! self::$pending ) {
			add_action( 'shutdown', array( __CLASS__, 'flush' ) );
		}
		self::$pending[ $type ][ $key ] = ( self::$pending[ $type ][ $key ] ?? 0 ) + (int) $n;
	}

	public static function flush() {
		if ( ! self::$pending ) {
			return;
		}
		$data  = get_option( self::OPTION, array() );
		$data  = is_array( $data ) ? $data : array();
		$today = wp_date( 'Y-m-d' );
		foreach ( self::$pending as $type => $keys ) {
			foreach ( $keys as $key => $n ) {
				$data[ $today ][ $type ][ $key ] = ( $data[ $today ][ $type ][ $key ] ?? 0 ) + $n;
			}
			if ( count( $data[ $today ][ $type ] ) > self::PER_TYPE ) {
				arsort( $data[ $today ][ $type ] );
				$data[ $today ][ $type ] = array_slice( $data[ $today ][ $type ], 0, self::PER_TYPE, true );
			}
		}
		// Keep the last DAYS days.
		$cutoff = wp_date( 'Y-m-d', time() - self::DAYS * DAY_IN_SECONDS );
		foreach ( array_keys( $data ) as $day ) {
			if ( $day < $cutoff ) {
				unset( $data[ $day ] );
			}
		}
		self::$pending = array();
		update_option( self::OPTION, $data, false );
	}

	/** Story reels: a story shown, or its button tapped (from the player). */
	public function handle_track_reel() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- anonymous counter, see class doc.
		$line  = isset( $_POST['line'] ) ? sanitize_title( wp_unslash( $_POST['line'] ) ) : '';
		$style = isset( $_POST['style'] ) ? strtoupper( sanitize_text_field( wp_unslash( $_POST['style'] ) ) ) : '';
		$kind  = isset( $_POST['kind'] ) && 'tap' === $_POST['kind'] ? 'reel_tap' : 'reel_view';
		// phpcs:enable
		if ( '' === $line || '' === $style || strlen( $style ) > 40 || ! preg_match( '/^[A-Z0-9][A-Z0-9.\/_-]*$/', $style ) ) {
			wp_send_json_error( null, 400 );
		}
		$ip   = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		$rate = 'om_reel_rate_' . md5( $ip );
		$n    = (int) get_transient( $rate );
		if ( $n < 200 ) {
			set_transient( $rate, $n + 1, HOUR_IN_SECONDS );
			self::add( $kind, $line . '|' . $style );
		}
		wp_send_json_success();
	}

	/**
	 * Totals for a window of days ending $offset days ago.
	 *
	 * @return array [ types => [ type => [ key => n ] ], daily => [ date => [ type => n ] ] ]
	 */
	public static function totals( $days, $offset = 0 ) {
		$data  = get_option( self::OPTION, array() );
		$data  = is_array( $data ) ? $data : array();
		$types = array();
		$daily = array();
		for ( $i = $days - 1 + $offset; $i >= $offset; $i-- ) {
			$day           = wp_date( 'Y-m-d', time() - $i * DAY_IN_SECONDS );
			$daily[ $day ] = array();
			foreach ( (array) ( $data[ $day ] ?? array() ) as $type => $keys ) {
				foreach ( (array) $keys as $key => $n ) {
					$types[ $type ][ $key ]  = ( $types[ $type ][ $key ] ?? 0 ) + (int) $n;
					$daily[ $day ][ $type ] = ( $daily[ $day ][ $type ] ?? 0 ) + (int) $n;
				}
			}
		}
		foreach ( $types as &$keys ) {
			arsort( $keys );
		}
		unset( $keys );
		return array( 'types' => $types, 'daily' => $daily );
	}

	/* ---------- Admin ---------- */

	public function menu() {
		add_dashboard_page(
			__( 'Catalog insights', 'om-catalog' ),
			__( 'Catalog insights', 'om-catalog' ),
			'manage_options',
			'om-insights',
			array( $this, 'page' )
		);
	}

	public function dashboard_widget() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		wp_add_dashboard_widget(
			'om_insights_widget',
			__( 'Catalog — last 7 days', 'om-catalog' ),
			function () {
				$now = self::totals( 7 );
				echo '<ul style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:0;">';
				foreach ( array( 'view', 'inquiry', 'search_zero' ) as $type ) {
					printf(
						'<li style="margin:0;padding:10px;border:1px solid #dcdcde;border-radius:6px;"><span style="display:block;font-size:22px;font-weight:600;color:#1d2327;">%s</span><span style="color:#50575e;">%s</span></li>',
						esc_html( number_format_i18n( array_sum( $now['types'][ $type ] ?? array() ) ) ),
						esc_html( self::types()[ $type ] )
					);
				}
				echo '</ul><p><a href="' . esc_url( admin_url( 'index.php?page=om-insights' ) ) . '">' . esc_html__( 'Open catalog insights →', 'om-catalog' ) . '</a></p>';
			}
		);
	}

	/** Name, photo and link of a design ("line|style"), from the search index or the API. */
	private static function design( $key, $lookup = false ) {
		static $index = array();
		list( $line, $style ) = array_pad( explode( '|', (string) $key, 2 ), 2, '' );
		if ( ! isset( $index[ $line ] ) ) {
			$index[ $line ] = array();
			$cached         = get_transient( 'om_index_' . md5( $line ) );
			foreach ( is_array( $cached ) ? $cached : array() as $item ) {
				$index[ $line ][ strtoupper( (string) ( $item['s'] ?? '' ) ) ] = $item;
			}
		}
		$item  = $index[ $line ][ strtoupper( $style ) ] ?? null;
		$title = $item['t'] ?? '';
		$image = $item['i'] ?? '';
		if ( ! $item && $lookup && '' !== $line && '' !== $style ) {
			$product = OM_API_Client::get_product_by_style( $line, $style );
			if ( is_array( $product ) && ! is_wp_error( $product ) ) {
				require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
				$title = (string) ( $product['title'] ?? '' );
				$image = (string) om_card_images( $product )[0];
			}
		}
		return array(
			'title' => '' !== $title ? $title : $style,
			'style' => $style,
			'line'  => $line,
			'image' => $image,
			'url'   => function_exists( 'om_product_url' ) && '' !== $style ? om_product_url( $line, $style ) : '',
		);
	}

	public function page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only view switch.
		$days = isset( $_GET['days'] ) ? (int) $_GET['days'] : 30;
		$days = in_array( $days, array( 7, 30, 90 ), true ) ? $days : 30;
		$now  = self::totals( $days );
		$prev = self::totals( $days, $days );
		$t    = $now['types'];
		$sum  = static function ( $set, $type ) {
			return array_sum( $set['types'][ $type ] ?? array() );
		};
		$base = admin_url( 'index.php?page=om-insights' );
		$results_page = (int) get_option( 'om_search_results_page', 0 );
		$results_url  = $results_page ? get_permalink( $results_page ) : '';
		?>
		<div class="wrap om-insights">
			<style>
				.om-insights { --ink: #1d2327; --ink-2: #50575e; --line: #dcdcde; --series-1: #2a78d6; --card: #fff; }
				.om-insights h1 { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
				.om-ins-range { display: inline-flex; margin-left: auto; border: 1px solid var(--line); border-radius: 6px; overflow: hidden; background: var(--card); }
				.om-ins-range a { padding: 6px 14px; font-size: 13px; text-decoration: none; color: var(--ink-2); }
				.om-ins-range a[aria-current="page"] { background: var(--ink); color: #fff; }
				.om-ins-note { color: var(--ink-2); max-width: 70ch; }
				.om-ins-tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin: 18px 0; }
				.om-ins-tile { padding: 16px; background: var(--card); border: 1px solid var(--line); border-radius: 8px; }
				.om-ins-tile b { display: block; font-size: 28px; line-height: 1.1; font-weight: 600; color: var(--ink); }
				.om-ins-tile span { display: block; margin-top: 4px; color: var(--ink-2); }
				.om-ins-tile small { display: block; margin-top: 8px; color: var(--ink-2); }
				.om-ins-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 16px; }
				.om-ins-card { padding: 18px 20px; background: var(--card); border: 1px solid var(--line); border-radius: 8px; min-width: 0; }
				.om-ins-card h2 { margin: 0 0 4px; font-size: 15px; }
				.om-ins-card p.desc { margin: 0 0 14px; color: var(--ink-2); }
				.om-ins-chart { position: relative; }
				.om-ins-chart svg { display: block; width: 100%; height: auto; overflow: visible; }
				.om-ins-chart .bar { fill: var(--series-1); }
				.om-ins-chart .hit { fill: transparent; cursor: default; }
				.om-ins-chart .hit:hover + .bar, .om-ins-chart g:hover .bar { fill: #1f5fae; }
				.om-ins-chart .grid { stroke: #ececec; stroke-width: 1; }
				.om-ins-chart .axis { stroke: #c3c4c7; stroke-width: 1; }
				.om-ins-chart text { font-size: 12px; fill: var(--ink-2); }
				.om-ins-tip { position: absolute; z-index: 2; padding: 6px 9px; border-radius: 4px; background: var(--ink); color: #fff; font-size: 12px; white-space: nowrap; pointer-events: none; transform: translate(-50%, -100%); }
				.om-ins-tip[hidden] { display: none; }
				.om-ins-table { width: 100%; border-collapse: collapse; }
				.om-ins-table th, .om-ins-table td { padding: 8px 6px; border-bottom: 1px solid #f0f0f1; text-align: left; vertical-align: middle; }
				.om-ins-table th { font-weight: 500; color: var(--ink-2); font-size: 12px; }
				.om-ins-table td.num, .om-ins-table th.num { text-align: right; font-variant-numeric: tabular-nums; }
				.om-ins-design { display: flex; align-items: center; gap: 10px; }
				.om-ins-design img { width: 40px; height: 40px; object-fit: cover; border: 1px solid var(--line); border-radius: 4px; background: #f6f7f7; }
				.om-ins-design small { display: block; color: var(--ink-2); }
				.om-ins-empty { color: var(--ink-2); font-style: italic; }
				.om-ins-foot { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-top: 22px; }
				.om-ins-foot form { margin: 0; }
				details.om-ins-data summary { cursor: pointer; color: var(--ink-2); margin-top: 8px; }
			</style>

			<h1>
				<?php esc_html_e( 'Catalog insights', 'om-catalog' ); ?>
				<span class="om-ins-range" role="navigation" aria-label="<?php esc_attr_e( 'Period', 'om-catalog' ); ?>">
					<?php foreach ( array( 7, 30, 90 ) as $d ) : ?>
						<a href="<?php echo esc_url( add_query_arg( 'days', $d, $base ) ); ?>"<?php echo $d === $days ? ' aria-current="page"' : ''; ?>><?php echo esc_html( sprintf( /* translators: %d: number of days. */ __( '%d days', 'om-catalog' ), $d ) ); ?></a>
					<?php endforeach; ?>
				</span>
			</h1>
			<p class="om-ins-note"><?php esc_html_e( 'What visitors do in your catalog: counts only, no personal data. Use it to see which designs to promote, what people search for and don\'t find, and what turns into inquiries.', 'om-catalog' ); ?></p>
			<?php if ( ! self::enabled() ) : ?>
				<div class="notice notice-warning inline"><p><?php esc_html_e( 'Counting is paused. Turn it back on below.', 'om-catalog' ); ?></p></div>
			<?php endif; ?>

			<div class="om-ins-tiles">
				<?php
				foreach ( array( 'view', 'search', 'search_zero', 'inquiry', 'reel_view', 'reel_tap' ) as $type ) {
					$a = $sum( $now, $type );
					$b = $sum( $prev, $type );
					if ( $b > 0 ) {
						$pct = round( 100 * ( $a - $b ) / $b );
						/* translators: 1: arrow, 2: percent change, 3: days. */
						$change = sprintf( __( '%1$s %2$s%% vs previous %3$d days', 'om-catalog' ), $pct >= 0 ? '▲' : '▼', ( $pct >= 0 ? '+' : '' ) . $pct, $days );
					} else {
						/* translators: %d: days. */
						$change = $a ? sprintf( __( 'New — nothing in the previous %d days', 'om-catalog' ), $days ) : '—';
					}
					printf( '<div class="om-ins-tile"><b>%s</b><span>%s</span><small>%s</small></div>', esc_html( number_format_i18n( $a ) ), esc_html( self::types()[ $type ] ), esc_html( $change ) );
				}
				?>
			</div>

			<div class="om-ins-grid">
				<div class="om-ins-card">
					<h2><?php esc_html_e( 'Product views per day', 'om-catalog' ); ?></h2>
					<p class="desc"><?php esc_html_e( 'Each visitor counts once per design per visit.', 'om-catalog' ); ?></p>
					<?php echo self::bars( $now['daily'], 'view', __( 'views', 'om-catalog' ), __( 'view', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped. ?>
				</div>
				<div class="om-ins-card">
					<h2><?php esc_html_e( 'Inquiries per day', 'om-catalog' ); ?></h2>
					<p class="desc"><?php esc_html_e( 'Sent through the plugin\'s inquiry forms.', 'om-catalog' ); ?></p>
					<?php echo self::bars( $now['daily'], 'inquiry', __( 'inquiries', 'om-catalog' ), __( 'inquiry', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- built escaped. ?>
				</div>

				<div class="om-ins-card">
					<h2><?php esc_html_e( 'Most viewed designs', 'om-catalog' ); ?></h2>
					<p class="desc"><?php esc_html_e( 'With how many of those views became inquiries.', 'om-catalog' ); ?></p>
					<?php
					$rows = array();
					$i    = 0;
					foreach ( array_slice( $t['view'] ?? array(), 0, 15, true ) as $key => $n ) {
						$inq    = (int) ( $t['inquiry'][ $key ] ?? 0 );
						$rows[] = array( self::design_cell( $key, $i++ < 10 ), number_format_i18n( $n ), number_format_i18n( $inq ), $n ? round( 100 * $inq / $n, 1 ) . '%' : '—' );
					}
					self::table( array( __( 'Design', 'om-catalog' ), __( 'Views', 'om-catalog' ), __( 'Inquiries', 'om-catalog' ), __( 'Rate', 'om-catalog' ) ), $rows, __( 'No product views yet.', 'om-catalog' ) );
					?>
				</div>

				<div class="om-ins-card">
					<h2><?php esc_html_e( 'Searches with no results', 'om-catalog' ); ?></h2>
					<p class="desc"><?php esc_html_e( 'What visitors look for and don\'t find — ideas for designs to add, or words to use in titles.', 'om-catalog' ); ?></p>
					<?php
					$rows = array();
					foreach ( array_slice( $t['search_zero'] ?? array(), 0, 15, true ) as $q => $n ) {
						$try    = $results_url ? '<a href="' . esc_url( add_query_arg( 'om_q', rawurlencode( $q ), $results_url ) ) . '" target="_blank" rel="noopener">' . esc_html__( 'Try it', 'om-catalog' ) . '</a>' : '';
						$rows[] = array( '<strong>' . esc_html( $q ) . '</strong>', number_format_i18n( $n ), $try );
					}
					self::table( array( __( 'Search', 'om-catalog' ), __( 'Times', 'om-catalog' ), '' ), $rows, __( 'Every search found something.', 'om-catalog' ) );
					?>
				</div>

				<div class="om-ins-card">
					<h2><?php esc_html_e( 'Top searches', 'om-catalog' ); ?></h2>
					<p class="desc"><?php esc_html_e( 'Searches that found designs.', 'om-catalog' ); ?></p>
					<?php
					$rows = array();
					foreach ( array_slice( $t['search'] ?? array(), 0, 15, true ) as $q => $n ) {
						$rows[] = array( esc_html( $q ), number_format_i18n( $n ) );
					}
					self::table( array( __( 'Search', 'om-catalog' ), __( 'Times', 'om-catalog' ) ), $rows, __( 'No searches yet.', 'om-catalog' ) );
					?>
				</div>

				<div class="om-ins-card">
					<h2><?php esc_html_e( 'Designs that get inquiries', 'om-catalog' ); ?></h2>
					<p class="desc"><?php esc_html_e( 'And what the inquiries were about.', 'om-catalog' ); ?></p>
					<?php
					$rows = array();
					foreach ( array_slice( $t['inquiry'] ?? array(), 0, 10, true ) as $key => $n ) {
						$rows[] = array( '(general)' === $key ? '<em>' . esc_html__( 'General (no design)', 'om-catalog' ) . '</em>' : self::design_cell( $key, true ), number_format_i18n( $n ) );
					}
					self::table( array( __( 'Design', 'om-catalog' ), __( 'Inquiries', 'om-catalog' ) ), $rows, __( 'No inquiries yet.', 'om-catalog' ) );
					if ( ! empty( $t['inquiry_subject'] ) ) {
						echo '<p class="desc" style="margin-top:14px;">' . esc_html(
							implode(
								' · ',
								array_map(
									static function ( $subject, $n ) {
										return $subject . ' ' . number_format_i18n( $n );
									},
									array_keys( $t['inquiry_subject'] ),
									$t['inquiry_subject']
								)
							)
						) . '</p>';
					}
					?>
				</div>

				<div class="om-ins-card">
					<h2><?php esc_html_e( 'Most compared', 'om-catalog' ); ?></h2>
					<p class="desc"><?php esc_html_e( 'Designs put side by side in the compare table — shoppers deciding between them.', 'om-catalog' ); ?></p>
					<?php
					$rows = array();
					foreach ( array_slice( $t['compare_pair'] ?? array(), 0, 10, true ) as $pair => $n ) {
						list( $a, $b ) = array_pad( explode( ' + ', $pair, 2 ), 2, '' );
						$da            = self::design( $a );
						$db            = self::design( $b );
						$rows[]        = array( esc_html( $da['title'] . ' (' . $da['style'] . ')' ) . ' <span aria-hidden="true">+</span> ' . esc_html( $db['title'] . ' (' . $db['style'] . ')' ), number_format_i18n( $n ) );
					}
					self::table( array( __( 'Pair', 'om-catalog' ), __( 'Times', 'om-catalog' ) ), $rows, __( 'Nothing compared yet.', 'om-catalog' ) );
					?>
				</div>

				<div class="om-ins-card">
					<h2><?php esc_html_e( 'Story reels', 'om-catalog' ); ?></h2>
					<p class="desc"><?php esc_html_e( 'Which stories are watched, and how often they send visitors to the design.', 'om-catalog' ); ?></p>
					<?php
					$rows = array();
					foreach ( array_slice( $t['reel_view'] ?? array(), 0, 12, true ) as $key => $n ) {
						$tap    = (int) ( $t['reel_tap'][ $key ] ?? 0 );
						$rows[] = array( self::design_cell( $key, false ), number_format_i18n( $n ), number_format_i18n( $tap ), $n ? round( 100 * $tap / $n, 1 ) . '%' : '—' );
					}
					self::table( array( __( 'Design', 'om-catalog' ), __( 'Views', 'om-catalog' ), __( 'Taps', 'om-catalog' ), __( 'Tap rate', 'om-catalog' ) ), $rows, __( 'No stories watched yet (add the OM Story Reels widget to a page).', 'om-catalog' ) );
					?>
				</div>
			</div>

			<div class="om-ins-foot">
				<a class="button button-primary" href="<?php echo esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=om_insights_csv&days=' . $days ), 'om_insights_csv' ) ); ?>"><?php esc_html_e( 'Download CSV', 'om-catalog' ); ?></a>
				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
					<input type="hidden" name="action" value="om_insights_toggle" />
					<?php wp_nonce_field( 'om_insights_toggle' ); ?>
					<button class="button" type="submit"><?php echo esc_html( self::enabled() ? __( 'Pause counting', 'om-catalog' ) : __( 'Resume counting', 'om-catalog' ) ); ?></button>
				</form>
				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" onsubmit="return confirm('<?php echo esc_js( __( 'Delete all insight counts? This cannot be undone.', 'om-catalog' ) ); ?>');">
					<input type="hidden" name="action" value="om_insights_reset" />
					<?php wp_nonce_field( 'om_insights_reset' ); ?>
					<button class="button button-link-delete" type="submit"><?php esc_html_e( 'Reset data', 'om-catalog' ); ?></button>
				</form>
			</div>
			<script>
			( function () {
				document.querySelectorAll( '.om-ins-chart' ).forEach( function ( chart ) {
					var tip = chart.querySelector( '.om-ins-tip' );
					chart.querySelectorAll( 'g[data-tip]' ).forEach( function ( g ) {
						var show = function () {
							var box = g.querySelector( '.bar' ).getBoundingClientRect(), host = chart.getBoundingClientRect();
							tip.textContent = g.getAttribute( 'data-tip' );
							tip.hidden = false;
							// Kept inside the card.
							var half = tip.offsetWidth / 2, x = box.left - host.left + box.width / 2;
							tip.style.left = Math.min( Math.max( x, half ), host.width - half ) + 'px';
							tip.style.top = ( Math.min( box.top, host.bottom - 30 ) - host.top - 6 ) + 'px';
							tip.hidden = false;
						};
						g.addEventListener( 'mouseenter', show );
						g.addEventListener( 'focus', show );
						g.addEventListener( 'mouseleave', function () { tip.hidden = true; } );
						g.addEventListener( 'blur', function () { tip.hidden = true; } );
					} );
				} );
			} )();
			</script>
		</div>
		<?php
	}

	/** A design cell: photo, name and style number, linked. */
	private static function design_cell( $key, $lookup ) {
		$d = self::design( $key, $lookup );
		return '<a class="om-ins-design" href="' . esc_url( $d['url'] ) . '" target="_blank" rel="noopener">'
			. ( $d['image'] ? '<img src="' . esc_url( $d['image'] ) . '" alt="" loading="lazy" />' : '' )
			. '<span>' . esc_html( $d['title'] ) . '<small>' . esc_html( sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $d['style'] ) ) . '</small></span></a>';
	}

	/** A simple table; cells are pre-escaped HTML. Numbers align right. */
	private static function table( $heads, $rows, $empty ) {
		if ( ! $rows ) {
			echo '<p class="om-ins-empty">' . esc_html( $empty ) . '</p>';
			return;
		}
		echo '<table class="om-ins-table"><thead><tr>';
		foreach ( $heads as $i => $head ) {
			echo '<th scope="col"' . ( $i ? ' class="num"' : '' ) . '>' . esc_html( $head ) . '</th>';
		}
		echo '</tr></thead><tbody>';
		foreach ( $rows as $row ) {
			echo '<tr>';
			foreach ( $row as $i => $cell ) {
				echo '<td' . ( $i ? ' class="num"' : '' ) . '>' . $cell . '</td>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped by the caller.
			}
			echo '</tr>';
		}
		echo '</tbody></table>';
	}

	/**
	 * A single-series daily bar chart (inline SVG): thin bars with rounded
	 * tops from one baseline, a quiet grid, date labels at the ends and
	 * middle, a tooltip per bar, and the same numbers as a table.
	 */
	private static function bars( $daily, $type, $unit, $unit_one = '' ) {
		$values = array();
		foreach ( $daily as $day => $counts ) {
			$values[ $day ] = (int) ( $counts[ $type ] ?? 0 );
		}
		$max = max( 1, max( $values ) );
		// A "nice" top for the scale.
		$mag  = pow( 10, floor( log10( $max ) ) );
		$top  = ceil( $max / $mag ) * $mag;
		$top  = $top < 4 ? 4 : $top;
		$w    = 560;
		$h    = 180;
		$left = 34;
		$bot  = 22;
		$n    = count( $values );
		$slot = ( $w - $left ) / max( 1, $n );
		$bw   = min( 24, max( 3, $slot - 2 ) );
		$ph   = $h - $bot - 8;
		ob_start();
		echo '<div class="om-ins-chart"><svg viewBox="0 0 ' . (int) $w . ' ' . (int) $h . '" role="img" aria-label="' . esc_attr( sprintf( /* translators: 1: unit, 2: total. */ __( 'Daily %1$s, %2$s in total', 'om-catalog' ), $unit, number_format_i18n( array_sum( $values ) ) ) ) . '">';
		foreach ( array( 0, 0.5, 1 ) as $f ) {
			$y = 8 + $ph * ( 1 - $f );
			echo '<line class="' . ( $f ? 'grid' : 'axis' ) . '" x1="' . (int) $left . '" x2="' . (int) $w . '" y1="' . esc_attr( $y ) . '" y2="' . esc_attr( $y ) . '"/>';
			echo '<text x="' . (int) ( $left - 6 ) . '" y="' . esc_attr( $y + 4 ) . '" text-anchor="end">' . esc_html( number_format_i18n( $top * $f ) ) . '</text>';
		}
		$i    = 0;
		foreach ( $values as $day => $v ) {
			$x   = $left + $i * $slot + ( $slot - $bw ) / 2;
			$bh  = $v ? max( 2, $ph * $v / $top ) : 0;
			$y   = 8 + $ph - $bh;
			$r   = min( 4, $bw / 2, $bh );
			$lbl = wp_date( 'M j', strtotime( $day ) );
			echo '<g tabindex="0" data-tip="' . esc_attr( $lbl . ' · ' . number_format_i18n( $v ) . ' ' . ( 1 === $v && '' !== $unit_one ? $unit_one : $unit ) ) . '">';
			echo '<rect class="hit" x="' . esc_attr( $left + $i * $slot ) . '" y="8" width="' . esc_attr( $slot ) . '" height="' . esc_attr( $ph ) . '"/>';
			if ( $bh > 0 ) {
				// Rounded at the data end, square at the baseline.
				printf(
					'<path class="bar" d="M%1$s,%2$s v%3$s a%4$s,%4$s 0 0 1 %4$s,-%4$s h%5$s a%4$s,%4$s 0 0 1 %4$s,%4$s v%6$s z"/>',
					esc_attr( round( $x, 2 ) ),
					esc_attr( round( 8 + $ph, 2 ) ),
					esc_attr( -round( $bh - $r, 2 ) ),
					esc_attr( round( $r, 2 ) ),
					esc_attr( round( $bw - 2 * $r, 2 ) ),
					esc_attr( round( $bh - $r, 2 ) )
				);
			} else {
				echo '<path class="bar" d="M' . esc_attr( round( $x, 2 ) ) . ',' . esc_attr( round( 8 + $ph, 2 ) ) . ' h' . esc_attr( round( $bw, 2 ) ) . '"/>';
			}
			echo '</g>';
			if ( 0 === $i || $n - 1 === $i || (int) floor( $n / 2 ) === $i ) {
				echo '<text x="' . esc_attr( $x + $bw / 2 ) . '" y="' . (int) ( $h - 4 ) . '" text-anchor="' . ( 0 === $i ? 'start' : ( $n - 1 === $i ? 'end' : 'middle' ) ) . '">' . esc_html( $lbl ) . '</text>';
			}
			$i++;
		}
		echo '</svg><span class="om-ins-tip" hidden></span>';
		echo '<details class="om-ins-data"><summary>' . esc_html__( 'Show as table', 'om-catalog' ) . '</summary><table class="om-ins-table"><thead><tr><th scope="col">' . esc_html__( 'Day', 'om-catalog' ) . '</th><th scope="col" class="num">' . esc_html( ucfirst( $unit ) ) . '</th></tr></thead><tbody>';
		foreach ( array_reverse( $values, true ) as $day => $v ) {
			echo '<tr><td>' . esc_html( wp_date( 'D, M j', strtotime( $day ) ) ) . '</td><td class="num">' . esc_html( number_format_i18n( $v ) ) . '</td></tr>';
		}
		echo '</tbody></table></details></div>';
		return ob_get_clean();
	}

	/* ---------- Actions ---------- */

	public function export_csv() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'om_insights_csv' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'om-catalog' ) );
		}
		$days = isset( $_GET['days'] ) ? max( 1, min( self::DAYS, (int) $_GET['days'] ) ) : 30;
		$data = self::totals( $days );
		nocache_headers();
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=catalog-insights-' . $days . 'd-' . wp_date( 'Y-m-d' ) . '.csv' );
		$out = fopen( 'php://output', 'w' );
		fputcsv( $out, array( 'type', 'item', 'design', 'count' ) );
		foreach ( self::types() as $type => $label ) {
			foreach ( $data['types'][ $type ] ?? array() as $key => $n ) {
				$design = in_array( $type, array( 'view', 'inquiry', 'compare', 'reel_view', 'reel_tap' ), true ) && false !== strpos( $key, '|' ) ? self::design( $key )['title'] : '';
				// Guard against spreadsheet formula injection.
				$item = preg_match( '/^[=+\-@]/', (string) $key ) ? "'" . $key : $key;
				fputcsv( $out, array( $label, $item, $design, $n ) );
			}
		}
		fclose( $out ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose
		exit;
	}

	public function reset() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'om_insights_reset' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'om-catalog' ) );
		}
		delete_option( self::OPTION );
		wp_safe_redirect( admin_url( 'index.php?page=om-insights' ) );
		exit;
	}

	public function toggle() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'om_insights_toggle' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'om-catalog' ) );
		}
		update_option( 'om_track_stats', self::enabled() ? '0' : '1' );
		wp_safe_redirect( admin_url( 'index.php?page=om-insights' ) );
		exit;
	}
}
