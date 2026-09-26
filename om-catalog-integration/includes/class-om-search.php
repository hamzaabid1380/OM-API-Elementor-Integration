<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Keyword search for the catalog.
 *
 * Overnight Mountings' API has no text search (only exact style numbers),
 * so each product line gets a small local index: style number, title,
 * carat/variant name and first image of every design, built by walking the
 * listing 500 products per call and cached for 12 hours. Searches and
 * as-you-type suggestions then run against that index without API calls.
 */
class OM_Search {

	/** Safety cap on how much of a line is indexed (API calls = cap / 500). */
	const MAX_INDEXED = 6000;

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_ajax_om_suggest', array( $this, 'handle_suggest' ) );
		add_shortcode( 'om_search', array( $this, 'shortcode' ) );
		add_action( 'wp_ajax_nopriv_om_suggest', array( $this, 'handle_suggest' ) );
	}

	/**
	 * The line's search index: a list of [ s => style, t => title,
	 * v => variant, i => image URL ].
	 *
	 * @return array|WP_Error
	 */
	public static function get_index( $line ) {
		$key    = 'om_index_' . md5( $line );
		$cached = get_transient( $key );
		if ( is_array( $cached ) ) {
			return $cached;
		}

		// Another request is already building this index: don't start a
		// second walk of the catalog, just report "not ready" briefly.
		if ( get_transient( $key . '_lock' ) ) {
			return new WP_Error( 'om_index_building', __( 'Search is warming up, please try again in a moment.', 'om-catalog' ) );
		}
		set_transient( $key . '_lock', 1, MINUTE_IN_SECONDS );

		$index  = array();
		$offset = 0;
		$limit  = 500;
		do {
			$page = OM_API_Client::get_products( $line, array( 'limit' => $limit, 'offset' => $offset ) );
			if ( is_wp_error( $page ) ) {
				delete_transient( $key . '_lock' );
				return $page;
			}
			foreach ( (array) ( $page['products'] ?? array() ) as $product ) {
				if ( empty( $product['style_number'] ) ) {
					continue;
				}
				$index[] = array(
					's' => (string) $product['style_number'],
					't' => (string) ( $product['title'] ?? '' ),
					'v' => (string) ( $product['variant_name'] ?? '' ),
					// The photo a card shows (the default metal colour's).
					'i' => function_exists( 'om_card_images' ) ? (string) om_card_images( $product )[0] : ( ! empty( $product['images'][0] ) ? om_image_url( $product['images'][0] ) : '' ),
				);
			}
			$total   = (int) ( $page['total_count'] ?? 0 );
			$offset += $limit;
		} while ( $offset < $total && $offset < self::MAX_INDEXED );

		set_transient( $key, $index, 12 * HOUR_IN_SECONDS );
		delete_transient( $key . '_lock' );
		return $index;
	}

	/** Lower-case, accent-free, single-spaced text for matching. */
	private static function normalize( $text ) {
		$text = strtolower( remove_accents( (string) $text ) );
		return trim( preg_replace( '/\s+/', ' ', $text ) );
	}

	/**
	 * Search a line. Every word must appear in the title, style number or
	 * variant; exact and leading style-number matches rank first, then
	 * title-start matches.
	 *
	 * @return array|WP_Error Products shaped like API listing items.
	 */
	public static function search( $line, $query ) {
		$query = self::normalize( $query );
		if ( '' === $query ) {
			return array();
		}
		$index = self::get_index( $line );
		if ( is_wp_error( $index ) ) {
			return $index;
		}

		$words   = explode( ' ', $query );
		$results = array();
		foreach ( $index as $row ) {
			$style = self::normalize( $row['s'] );
			$title = self::normalize( $row['t'] );
			$hay   = $title . ' ' . $style . ' ' . self::normalize( $row['v'] );
			foreach ( $words as $word ) {
				if ( false === strpos( $hay, $word ) ) {
					continue 2;
				}
			}
			if ( $style === $query ) {
				$score = 0;
			} elseif ( 0 === strpos( $style, $query ) ) {
				$score = 1;
			} elseif ( 0 === strpos( $title, $query ) ) {
				$score = 2;
			} else {
				$score = 3;
			}
			$results[] = array( $score, $row );
		}

		usort(
			$results,
			static function ( $a, $b ) {
				return $a[0] <=> $b[0] ?: strnatcasecmp( $a[1]['t'], $b[1]['t'] );
			}
		);

		return array_map(
			static function ( $hit ) {
				$row = $hit[1];
				return array(
					'style_number' => $row['s'],
					'title'        => $row['t'],
					'variant_name' => $row['v'],
					'images'       => $row['i'] ? array( $row['i'] ) : array(),
				);
			},
			$results
		);
	}

	/**
	 * As-you-type suggestions for a catalog block. The block's signed
	 * attributes decide which lines may be searched.
	 */
	public function handle_suggest() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint.
		$json = isset( $_POST['atts'] ) ? (string) wp_unslash( $_POST['atts'] ) : '';
		$sig  = isset( $_POST['sig'] ) ? (string) wp_unslash( $_POST['sig'] ) : '';
		$line = isset( $_POST['line'] ) ? sanitize_title( wp_unslash( $_POST['line'] ) ) : '';
		$q    = isset( $_POST['q'] ) ? sanitize_text_field( wp_unslash( $_POST['q'] ) ) : '';
		// phpcs:enable

		if ( '' === $json || ! hash_equals( OM_Shortcodes::sign_atts( $json ), $sig ) ) {
			wp_send_json_error( array( 'message' => 'Invalid catalog block.' ), 400 );
		}
		$atts   = json_decode( $json, true );
		$atts   = is_array( $atts ) ? $atts : array();
		$prices = 'no' !== ( $atts['suggest_prices'] ?? 'yes' ) && om_markup_is_configured();
		$block  = array_values( array_filter( array_map( 'sanitize_title', explode( ',', (string) ( ! empty( $atts['lines'] ) ? $atts['lines'] : ( $atts['line'] ?? '' ) ) ) ) ) );
		$scope  = (string) ( $atts['search_scope'] ?? 'line' );
		if ( mb_strlen( $q ) < 2 ) {
			wp_send_json_success( array( 'items' => array() ) );
		}

		// One line (the one being browsed), as before.
		if ( 'line' === $scope ) {
			if ( ! in_array( $line, $block, true ) ) {
				wp_send_json_success( array( 'items' => array() ) );
			}
			$hits = self::search( $line, $q );
			if ( is_wp_error( $hits ) ) {
				wp_send_json_success( array( 'items' => array(), 'message' => $hits->get_error_message() ) );
			}
			$items = array();
			foreach ( array_slice( $hits, 0, 6 ) as $product ) {
				$items[] = self::item( $line, $product );
			}
			wp_send_json_success(
				array(
					'items'  => $items,
					'total'  => count( $hits ),
					// "From $X" is filled in right after, from the same
					// cached starting prices the listing cards use.
					'prices' => $prices,
				)
			);
		}

		// Several lines, grouped: this block's lines ("block") or every
		// product line Overnight Mountings has ("all").
		$lines  = 'all' === $scope ? array_keys( OM_Shortcodes::line_labels() ) : $block;
		$labels = OM_Shortcodes::line_labels();
		$result = self::search_lines( $lines, $q, 'all' === $scope && count( $lines ) > 4 ? 3 : 4 );
		$groups = array();
		foreach ( $result['groups'] as $group ) {
			$groups[] = array(
				'line'    => $group['line'],
				'label'   => $labels[ $group['line'] ] ?? ucwords( str_replace( '-', ' ', $group['line'] ) ),
				'total'   => $group['total'],
				'inBlock' => in_array( $group['line'], $block, true ),
				'items'   => array_map(
					static function ( $product ) use ( $group ) {
						return self::item( $group['line'], $product );
					},
					$group['items']
				),
			);
		}
		$results_page = ! empty( $atts['results_page'] ) ? get_permalink( (int) $atts['results_page'] ) : '';
		wp_send_json_success(
			array(
				'groups'     => $groups,
				'total'      => $result['total'],
				'prices'     => $prices,
				'warming'    => $result['pending'] > 0,
				'resultsUrl' => $results_page ? $results_page : '',
			)
		);
	}

	/** One suggestion, as the script shows it. */
	private static function item( $line, $product ) {
		return array(
			'title'   => $product['title'],
			'variant' => $product['variant_name'],
			'style'   => $product['style_number'],
			'image'   => $product['images'][0] ?? '',
			'url'     => om_product_url( $line, $product['style_number'] ),
			'line'    => $line,
		);
	}

	/**
	 * Search several lines and group the hits by line: best match first,
	 * then the lines with most results. Uses the cached indexes; a line
	 * whose index isn't built yet is built (at most one per request, so a
	 * cold site stays responsive) and reported as pending otherwise.
	 *
	 * @return array [ groups => [ line, total, items ], total, pending ]
	 */
	public static function search_lines( $lines, $query, $per_group = 4 ) {
		$groups  = array();
		$total   = 0;
		$pending = 0;
		$built   = 0;
		foreach ( array_unique( array_filter( (array) $lines ) ) as $line ) {
			if ( ! is_array( get_transient( 'om_index_' . md5( $line ) ) ) ) {
				if ( $built >= 1 ) {
					$pending++;
					continue;
				}
				$built++;
			}
			$hits = self::search( $line, $query );
			if ( is_wp_error( $hits ) ) {
				$pending++;
				continue;
			}
			if ( ! $hits ) {
				continue;
			}
			$exact    = 0 === strcasecmp( (string) $hits[0]['style_number'], trim( (string) $query ) );
			$groups[] = array(
				'line'  => $line,
				'total' => count( $hits ),
				'items' => array_slice( $hits, 0, $per_group ),
				'rank'  => $exact ? 0 : 1,
			);
			$total += count( $hits );
		}
		usort(
			$groups,
			static function ( $a, $b ) {
				return $a['rank'] <=> $b['rank'] ?: $b['total'] <=> $a['total'];
			}
		);
		return array(
			'groups'  => $groups,
			'total'   => $total,
			'pending' => $pending,
		);
	}

	/**
	 * [om_search] — a search box on its own (e.g. in the header) that
	 * searches every product line, or the lines given, with suggestions
	 * grouped by line. "See all" and Enter go to the results page: a page
	 * with an OM Product Catalog widget showing those lines.
	 *
	 * @param array $atts lines (comma list; empty = all), results_page (page
	 *                    ID; empty = Settings > Search), placeholder,
	 *                    suggest_prices (yes|no), button (yes|no),
	 *                    suggest_viewed (0-8).
	 */
	public function shortcode( $atts ) {
		return self::render_box( (array) $atts );
	}

	public static function render_box( $atts ) {
		$atts = shortcode_atts(
			array(
				'lines'          => '',
				'results_page'   => '',
				'placeholder'    => '',
				'suggest_prices' => 'yes',
				'button'         => 'yes',
				// Recently viewed designs shown when the box is empty (0 = off).
				'suggest_viewed' => 4,
			),
			$atts,
			'om_search'
		);
		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );

		$results = (int) ( '' !== (string) $atts['results_page'] ? $atts['results_page'] : get_option( 'om_search_results_page', 0 ) );
		$signed  = array(
			'lines'          => implode( ',', array_filter( array_map( 'sanitize_title', explode( ',', (string) $atts['lines'] ) ) ) ),
			'search_scope'   => '' === trim( (string) $atts['lines'] ) ? 'all' : 'block',
			'results_page'   => $results,
			'suggest_prices' => 'no' === $atts['suggest_prices'] ? 'no' : 'yes',
		);
		$json        = wp_json_encode( $signed );
		$action      = $results ? get_permalink( $results ) : '';
		$placeholder = '' !== trim( (string) $atts['placeholder'] ) ? $atts['placeholder'] : __( 'Search rings, bands, style numbers…', 'om-catalog' );
		$input_id    = 'om-q-' . wp_rand( 1000, 9999 );

		ob_start();
		?>
		<div class="om-catalog-wrap om-search-standalone<?php echo esc_attr( om_refined_class() ); ?>" data-om-atts="<?php echo esc_attr( $json ); ?>" data-om-sig="<?php echo esc_attr( OM_Shortcodes::sign_atts( $json ) ); ?>">
			<form class="om-search<?php echo 'no' === $atts['button'] ? ' om-search--no-button' : ''; ?>" role="search" action="<?php echo esc_url( $action ); ?>" method="get" data-om-line="" data-om-scope="<?php echo esc_attr( $signed['search_scope'] ); ?>" data-om-viewed="<?php echo esc_attr( (string) max( 0, min( 8, (int) $atts['suggest_viewed'] ) ) ); ?>"<?php echo 'no' !== $signed['suggest_prices'] && om_markup_is_configured() ? ' data-om-priced="1"' : ''; ?>>
				<input type="hidden" name="om_line" value="" class="om-search-line" disabled />
				<label class="screen-reader-text" for="<?php echo esc_attr( $input_id ); ?>"><?php esc_html_e( 'Search the catalog', 'om-catalog' ); ?></label>
				<span class="om-search-icon" aria-hidden="true"></span>
				<input id="<?php echo esc_attr( $input_id ); ?>" class="om-search-input" type="search" name="om_q" placeholder="<?php echo esc_attr( $placeholder ); ?>" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="<?php echo esc_attr( $input_id ); ?>-list" enterkeyhint="search" />
				<?php if ( 'no' !== $atts['button'] ) : ?>
					<button class="om-search-submit" type="submit"><?php esc_html_e( 'Search', 'om-catalog' ); ?></button>
				<?php endif; ?>
				<ul class="om-suggest" id="<?php echo esc_attr( $input_id ); ?>-list" role="listbox" hidden></ul>
			</form>
		</div>
		<?php
		return ob_get_clean();
	}
}
