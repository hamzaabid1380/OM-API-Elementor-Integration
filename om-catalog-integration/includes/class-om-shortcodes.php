<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once OM_CATALOG_DIR . 'includes/functions-pricing.php';

class OM_Shortcodes {

	/**
	 * The API hard-rejects (400) any limit over 500 on product routes rather
	 * than capping it silently.
	 */
	const MAX_PER_PAGE = 500;

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_shortcode( 'om_catalog', array( $this, 'render_catalog_grid' ) );
	}

	/** Display names of the product lines, for the visitor line switcher. */
	public static function line_labels() {
		return array(
			'engagement-rings' => __( 'Engagement Rings', 'om-catalog' ),
			'wedding-bands'    => __( 'Wedding Bands', 'om-catalog' ),
			'bracelets'        => __( 'Bracelets', 'om-catalog' ),
			'earrings'         => __( 'Earrings', 'om-catalog' ),
			'fashion-rings'    => __( 'Fashion Rings', 'om-catalog' ),
			'necklaces'        => __( 'Necklaces', 'om-catalog' ),
			'pendants'         => __( 'Pendants', 'om-catalog' ),
			'in-stock'         => __( 'In Stock', 'om-catalog' ),
		);
	}

	/**
	 * Tidy a comma-separated style-number list ("85121-2, 84842-2" ->
	 * "85121-2,84842-2") for the API's exact-match styleNumber filter.
	 */
	private static function normalize_style_list( $list ) {
		return implode( ',', array_filter( array_map( 'trim', explode( ',', (string) $list ) ) ) );
	}

	/**
	 * Visitor state (active line, collection pick, page, base URL) from the
	 * current request. The AJAX endpoint builds the same array from the
	 * clicked link instead, so filtering works identically with and without
	 * JavaScript.
	 *
	 * A dedicated om_page parameter is used rather than WordPress's
	 * paged/page vars: on a static page (which is what the Elementor listing
	 * pages are), /page/2/ URLs get bounced by redirect_canonical and
	 * get_query_var('paged') stays 0, so pretty pagination silently breaks.
	 */
	public static function request_from_globals() {
		return array(
			'page'     => isset( $_GET['om_page'] ) ? max( 1, absint( $_GET['om_page'] ) ) : 1,
			'style'    => isset( $_GET['om_style'] ) ? sanitize_text_field( wp_unslash( $_GET['om_style'] ) ) : '',
			'line'     => isset( $_GET['om_line'] ) ? sanitize_title( wp_unslash( $_GET['om_line'] ) ) : '',
			'base_url' => remove_query_arg( array( 'om_style', 'om_page', 'om_line' ) ),
		);
	}

	public function render_catalog_grid( $atts ) {
		return $this->render_grid( (array) $atts, self::request_from_globals() );
	}

	/**
	 * Render the full catalog block (filter bars + grid + pagination) for a
	 * set of shortcode attributes and a visitor request. Shared by the
	 * shortcode and the om_filter_grid AJAX endpoint.
	 */
	public function render_grid( $atts, $request ) {
		$atts = shortcode_atts(
			array(
				'line'           => 'engagement-rings',
				// Multi-line mode: comma-separated line codes (overrides
				// "line"), shown one at a time behind a line switcher.
				'lines'          => '',
				// Admin's per-line collection picks, encoded as
				// "line:val|val;line2:val" (values may contain commas).
				'line_styles'    => '',
				'columns'        => 3,
				'per_page'       => 12,
				'style'          => '',
				'set'            => '',
				'shape'          => '',
				'in_stock'       => '',
				// Comma-separated style numbers: "include" shows ONLY those
				// products (API-side); "exclude" hides them (filtered here —
				// the API has no exclusion parameter).
				'include'        => '',
				'exclude'        => '',
				// "no" when the Elementor widget renders this shortcode: its
				// responsive Columns control owns the column count via CSS,
				// which an inline --om-columns would override.
				'inline_columns' => 'yes',
				// Card layout: classic (centered under image), editorial
				// (left-aligned), boxed (framed card), overlay (title over image).
				'layout'         => 'classic',
				// "yes" shows the collection pill bar above the grid.
				'show_filters'   => '',
				// Filter bar design: pills, underline, buttons, minimal.
				'filter_style'   => 'pills',
			),
			$atts,
			'om_catalog'
		);

		$layouts = array( 'classic', 'editorial', 'boxed', 'overlay' );
		$layout  = in_array( $atts['layout'], $layouts, true ) ? $atts['layout'] : 'classic';

		$filter_styles = array( 'pills', 'underline', 'buttons', 'minimal' );
		$filter_style  = in_array( $atts['filter_style'], $filter_styles, true ) ? $atts['filter_style'] : 'pills';

		// Which product lines does this block cover, and which is active?
		$lines_raw = '' !== trim( $atts['lines'] ) ? $atts['lines'] : $atts['line'];
		$lines     = array_values( array_unique( array_filter( array_map( 'sanitize_title', explode( ',', $lines_raw ) ) ) ) );
		if ( empty( $lines ) ) {
			$lines = array( 'engagement-rings' );
		}
		$active_line = ( '' !== $request['line'] && in_array( $request['line'], $lines, true ) ) ? $request['line'] : $lines[0];

		// Admin's collection picks per line.
		$line_styles = array();
		foreach ( array_filter( explode( ';', $atts['line_styles'] ) ) as $chunk ) {
			$pair = explode( ':', $chunk, 2 );
			if ( 2 === count( $pair ) ) {
				$code   = sanitize_title( $pair[0] );
				$values = array_filter( array_map( 'trim', explode( '|', $pair[1] ) ) );
				if ( $code && $values ) {
					$line_styles[ $code ] = $values;
				}
			}
		}

		// The default ("All") style filter for the active line: the admin's
		// picks for that line plus the free-text filter, if any.
		$admin_base = isset( $line_styles[ $active_line ] ) ? implode( ',', $line_styles[ $active_line ] ) : '';
		if ( '' !== trim( $atts['style'] ) ) {
			$admin_base = trim( $admin_base . ',' . trim( $atts['style'] ), ',' );
		}

		// A visitor's pick from the filter bar overrides the admin default
		// (still within the active product line).
		$show_filters  = 'yes' === $atts['show_filters'];
		$visitor_style = $request['style'];
		$style_filter  = ( $show_filters && '' !== $visitor_style ) ? $visitor_style : $admin_base;

		$columns  = max( 1, min( 5, (int) $atts['columns'] ) );
		$per_page = max( 1, min( self::MAX_PER_PAGE, (int) $atts['per_page'] ) );
		$paged    = max( 1, (int) $request['page'] );
		$base_url = $request['base_url'];

		// URL of the active line's unfiltered view; collection pills and
		// pagination build on it so the line selection is preserved.
		$line_base = count( $lines ) > 1 ? add_query_arg( 'om_line', $active_line, $base_url ) : $base_url;

		$cache_key     = 'om_listing_' . md5( wp_json_encode( $atts ) . '|' . $active_line . '|' . $style_filter . '|' . $paged );
		$cache_minutes = max( 1, (int) get_option( 'om_listing_cache_minutes', 15 ) );

		$data = get_transient( $cache_key );
		if ( false === $data ) {
			$include = self::normalize_style_list( $atts['include'] );

			$args = array_filter(
				array(
					'style'       => $style_filter,
					'set'         => $atts['set'],
					'shape'       => $atts['shape'],
					'inStock'     => 'yes' === $atts['in_stock'] ? 'true' : '',
					'styleNumber' => $include,
					// Listings hide carat/size variants by default; a
					// hand-picked include list should show whatever was named,
					// variant style numbers included.
					'parentsOnly' => '' !== $include ? 'false' : '',
					'limit'       => $per_page,
					'offset'      => ( $paged - 1 ) * $per_page,
				)
			);
			$data = OM_API_Client::get_products( $active_line, $args );
			if ( ! is_wp_error( $data ) ) {
				set_transient( $cache_key, $data, $cache_minutes * MINUTE_IN_SECONDS );
			}
		}

		// ---- Filter bars (always rendered, even on error/empty results, so
		// a visitor whose pick matched nothing can still click back out). ----

		$bars = '';

		if ( count( $lines ) > 1 ) {
			$labels = self::line_labels();
			$bars  .= '<nav class="om-filter-bar om-line-bar om-filters-' . esc_attr( $filter_style ) . '" aria-label="' . esc_attr__( 'Product lines', 'om-catalog' ) . '">';
			foreach ( $lines as $code ) {
				$label = isset( $labels[ $code ] ) ? $labels[ $code ] : ucwords( str_replace( '-', ' ', $code ) );
				$href  = add_query_arg( 'om_line', $code, $base_url );
				$bars .= '<a class="om-filter-pill' . ( $code === $active_line ? ' is-active' : '' ) . '" href="' . esc_url( $href ) . '">' . esc_html( $label ) . '</a>';
			}
			$bars .= '</nav>';
		}

		if ( $show_filters ) {
			$options = OM_API_Client::get_line_filter_options( $active_line );

			// When the admin picked specific collections for this line, the
			// visitor filters within that curated set instead of the whole line.
			if ( ! empty( $line_styles[ $active_line ] ) ) {
				$all_labels = array();
				foreach ( OM_API_Client::get_line_collections( $active_line ) as $group ) {
					foreach ( $group['options'] as $value => $label ) {
						$all_labels[ $value ] = $label;
					}
				}
				$options = array();
				foreach ( $line_styles[ $active_line ] as $value ) {
					$options[ $value ] = isset( $all_labels[ $value ] ) ? $all_labels[ $value ] : $value;
				}
			}

			if ( ! empty( $options ) ) {
				$bars .= '<nav class="om-filter-bar om-collection-bar om-filters-' . esc_attr( $filter_style ) . '" aria-label="' . esc_attr__( 'Filter by category', 'om-catalog' ) . '">';
				$bars .= '<a class="om-filter-pill' . ( '' === $visitor_style ? ' is-active' : '' ) . '" href="' . esc_url( $line_base ) . '">' . esc_html__( 'All', 'om-catalog' ) . '</a>';
				foreach ( $options as $value => $label ) {
					$href  = add_query_arg( 'om_style', rawurlencode( $value ), $line_base );
					$bars .= '<a class="om-filter-pill' . ( $visitor_style === $value ? ' is-active' : '' ) . '" href="' . esc_url( $href ) . '">' . esc_html( $label ) . '</a>';
				}
				$bars .= '</nav>';
			}
		}

		// ---- Wrapper: carries the attributes so the AJAX endpoint can
		// re-render this exact block for a clicked filter/pagination link. ----

		$open = '<div class="om-catalog-wrap" data-om-atts="' . esc_attr( wp_json_encode( $atts ) ) . '">';

		if ( is_wp_error( $data ) ) {
			return $open . $bars . '<p class="om-error">' . esc_html( $data->get_error_message() ) . '</p></div>';
		}

		// Hide list: drop excluded style numbers after the fetch. Totals stay
		// API-side, so a page can show slightly fewer cards than per_page —
		// acceptable for a curation tool meant for a handful of exclusions.
		if ( '' !== trim( (string) $atts['exclude'] ) ) {
			$excluded = array_map( 'strtoupper', array_filter( array_map( 'trim', explode( ',', $atts['exclude'] ) ) ) );
			if ( ! empty( $data['products'] ) ) {
				$data['products'] = array_values(
					array_filter(
						$data['products'],
						static function ( $product ) use ( $excluded ) {
							return ! in_array( strtoupper( (string) ( $product['style_number'] ?? '' ) ), $excluded, true );
						}
					)
				);
			}
		}

		if ( empty( $data['products'] ) ) {
			return $open . $bars . '<p class="om-empty">' . esc_html__( 'No products found in this category.', 'om-catalog' ) . '</p></div>';
		}

		$style_attr = 'no' === $atts['inline_columns'] ? '' : ' style="--om-columns: ' . esc_attr( $columns ) . ';"';

		ob_start();
		echo $open . $bars; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped piecewise above.
		?>
		<div class="om-catalog-grid om-layout-<?php echo esc_attr( $layout ); ?>"<?php echo $style_attr; // phpcs:ignore WordPress.Security.EscapeOutput -- built above from an int. ?>>
			<?php foreach ( $data['products'] as $product ) :
				$image = ! empty( $product['images'][0] ) ? om_image_url( $product['images'][0] ) : '';
				$link  = om_product_url( $active_line, $product['style_number'] );
				?>
				<a class="om-card" href="<?php echo esc_url( $link ); ?>">
					<?php if ( $image ) : ?>
						<div class="om-card-image">
							<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $product['title'] ); ?>" loading="lazy" />
						</div>
					<?php endif; ?>
					<div class="om-card-body">
						<h3 class="om-card-title"><?php echo esc_html( $product['title'] ); ?></h3>
						<?php if ( ! empty( $product['variant_name'] ) ) : ?>
							<p class="om-card-variant"><?php echo esc_html( $product['variant_name'] ); ?></p>
						<?php endif; ?>
					</div>
				</a>
			<?php endforeach; ?>
		</div>

		<?php
		$total_pages = isset( $data['total_count'] ) ? (int) ceil( $data['total_count'] / $per_page ) : 1;
		if ( $total_pages > 1 ) :
			$paging_url = '' !== $visitor_style ? add_query_arg( 'om_style', rawurlencode( $visitor_style ), $line_base ) : $line_base;
			?>
			<div class="om-pagination">
				<?php
				echo paginate_links(
					array(
						'base'    => add_query_arg( 'om_page', '%#%', $paging_url ),
						'format'  => '',
						'total'   => $total_pages,
						'current' => $paged,
					)
				);
				?>
			</div>
		<?php endif; ?>
		</div>
		<?php
		return ob_get_clean();
	}
}
