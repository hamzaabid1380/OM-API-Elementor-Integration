<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Loose diamond search: [om_diamonds] shortcode, the "OM Diamond Search"
 * Elementor widget, and the diamond step of the ring builder.
 *
 * Visitor filters live in the query string (od_*), so every search is a
 * shareable URL and works without JavaScript; the script re-renders the
 * block in place. As with the catalog grid, the block's attributes are
 * signed and every filter value is checked against a fixed list.
 */
class OM_Diamonds {

	const SHAPES   = array( 'Round', 'Oval', 'Cushion', 'Princess', 'Emerald', 'Pear', 'Marquise', 'Radiant', 'Asscher', 'Heart' );
	const COLORS   = array( 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K' );
	const CLARITY  = array( 'FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2' );
	const CUTS     = array( 'Ideal', 'Excellent', 'Very Good', 'Good' );
	const SORTS    = array(
		'price-asc'   => array( 'price', 'asc' ),
		'price-desc'  => array( 'price', 'desc' ),
		'carat-asc'   => array( 'carat', 'asc' ),
		'carat-desc'  => array( 'carat', 'desc' ),
		'color-asc'   => array( 'color', 'asc' ),
		'clarity-asc' => array( 'clarity', 'asc' ),
		'new'         => array( 'new', 'desc' ),
	);
	const PARAMS   = array( 'od_shape', 'od_cmin', 'od_cmax', 'od_pmin', 'od_pmax', 'od_color', 'od_clarity', 'od_cut', 'od_origin', 'od_sort', 'od_page' );

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_shortcode( 'om_diamonds', array( $this, 'shortcode' ) );
		add_action( 'wp_ajax_om_diamonds', array( $this, 'handle_ajax' ) );
		add_action( 'wp_ajax_nopriv_om_diamonds', array( $this, 'handle_ajax' ) );
	}

	public function shortcode( $atts ) {
		return $this->render( (array) $atts, self::request_from_globals() );
	}

	/** Visitor state from the current URL (also used by the ring builder). */
	public static function request_from_globals() {
		return self::request_from_query( wp_unslash( $_GET ), remove_query_arg( self::PARAMS ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only view state.
	}

	public static function request_from_query( $query, $base_url ) {
		// Checkbox groups arrive as arrays (od_shape[]=Round&od_shape[]=Oval).
		foreach ( (array) $query as $key => $value ) {
			if ( is_array( $value ) ) {
				$query[ $key ] = implode( ',', array_filter( $value, 'is_scalar' ) );
			}
		}
		$get = function ( $key ) use ( $query ) {
			return isset( $query[ $key ] ) && is_scalar( $query[ $key ] ) ? sanitize_text_field( (string) $query[ $key ] ) : '';
		};
		$out = array( 'base_url' => $base_url );
		foreach ( self::PARAMS as $param ) {
			$out[ substr( $param, 3 ) ] = $get( $param );
		}
		return $out;
	}

	/** Keep only the listed values of a comma-separated pick, in list order. */
	private static function pick( $raw, $allowed ) {
		$wanted = array_map( 'strtolower', array_map( 'trim', explode( ',', (string) $raw ) ) );
		return array_values(
			array_filter(
				$allowed,
				static function ( $v ) use ( $wanted ) {
					return in_array( strtolower( $v ), $wanted, true );
				}
			)
		);
	}

	private static function num( $raw, $min, $max ) {
		if ( '' === $raw || ! is_numeric( $raw ) ) {
			return null;
		}
		return max( $min, min( $max, (float) $raw ) );
	}

	/**
	 * @param array $atts    origin (''|lab|natural), shapes, per_page,
	 *                       show_origin, show_price, default_shape,
	 *                       select_state (array: builder state for the
	 *                       "Select this diamond" link), heading.
	 * @param array $request From request_from_query().
	 */
	public function render( $atts, $request ) {
		$atts = shortcode_atts(
			array(
				'origin'        => '',
				'shapes'        => '',
				'per_page'      => 20,
				'show_origin'   => 'yes',
				'default_shape' => '',
				'default_sort'  => 'price-asc',
				'select_state'  => '',
				'show_select'   => 'yes',
				'show_inquiry'  => 'yes',
			),
			$atts,
			'om_diamonds'
		);

		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );

		$shapes_offered = self::pick( '' !== trim( (string) $atts['shapes'] ) ? $atts['shapes'] : implode( ',', self::SHAPES ), self::SHAPES );
		if ( ! $shapes_offered ) {
			$shapes_offered = self::SHAPES;
		}
		$fixed_origin = in_array( $atts['origin'], array( 'lab', 'natural' ), true ) ? $atts['origin'] : '';
		$multiplier   = om_diamond_markup_multiplier();
		$per_page     = max( 5, min( 100, (int) $atts['per_page'] ) );

		// Visitor state, validated.
		$f = array(
			'shape'   => self::pick( '' !== $request['shape'] ? $request['shape'] : $atts['default_shape'], $shapes_offered ),
			'cmin'    => self::num( $request['cmin'], 0.1, 30 ),
			'cmax'    => self::num( $request['cmax'], 0.1, 30 ),
			'pmin'    => $multiplier > 0 ? self::num( $request['pmin'], 0, 10000000 ) : null,
			'pmax'    => $multiplier > 0 ? self::num( $request['pmax'], 0, 10000000 ) : null,
			'color'   => self::pick( $request['color'], self::COLORS ),
			'clarity' => self::pick( $request['clarity'], self::CLARITY ),
			'cut'     => self::pick( $request['cut'], self::CUTS ),
			'origin'  => $fixed_origin ? $fixed_origin : ( in_array( $request['origin'], array( 'lab', 'natural' ), true ) ? $request['origin'] : '' ),
			'sort'    => isset( self::SORTS[ $request['sort'] ] ) ? $request['sort'] : ( isset( self::SORTS[ $atts['default_sort'] ] ) ? $atts['default_sort'] : 'price-asc' ),
			'page'    => max( 1, min( 500, absint( $request['page'] ) ) ),
		);

		$args = array_filter(
			array(
				'origin'  => $f['origin'],
				'shape'   => implode( ',', $f['shape'] ),
				'color'   => implode( ',', $f['color'] ),
				'clarity' => implode( ',', $f['clarity'] ),
				'cut'     => implode( ',', $f['cut'] ),
				'carat'   => ( null !== $f['cmin'] || null !== $f['cmax'] ) ? ( null !== $f['cmin'] ? $f['cmin'] : 0.1 ) . '-' . ( null !== $f['cmax'] ? $f['cmax'] : 30 ) : '',
				// Visitors filter by the price they see; the API filters on
				// its own (pre-markup) terms.
				'cost'    => ( null !== $f['pmin'] || null !== $f['pmax'] ) ? round( ( null !== $f['pmin'] ? $f['pmin'] : 0 ) / $multiplier ) . '-' . round( ( null !== $f['pmax'] ? $f['pmax'] : 10000000 ) / $multiplier ) : '',
				'sort_by' => self::SORTS[ $f['sort'] ][0],
				'order'   => self::SORTS[ $f['sort'] ][1],
				'limit'   => $per_page,
				'offset'  => ( $f['page'] - 1 ) * $per_page,
			),
			'strlen'
		);
		$data = OM_API_Client::search_diamonds( $args );

		$base_url  = $request['base_url'];
		$url_state = function ( $changes = array() ) use ( $f, $base_url ) {
			$s   = array_merge( $f, array( 'page' => 1 ), $changes );
			$qa  = array();
			$map = array( 'shape' => 'od_shape', 'color' => 'od_color', 'clarity' => 'od_clarity', 'cut' => 'od_cut' );
			foreach ( $map as $key => $param ) {
				if ( ! empty( $s[ $key ] ) ) {
					$qa[ $param ] = rawurlencode( implode( ',', (array) $s[ $key ] ) );
				}
			}
			foreach ( array( 'cmin' => 'od_cmin', 'cmax' => 'od_cmax', 'pmin' => 'od_pmin', 'pmax' => 'od_pmax' ) as $key => $param ) {
				if ( null !== $s[ $key ] ) {
					$qa[ $param ] = $s[ $key ];
				}
			}
			if ( '' !== $s['origin'] ) {
				$qa['od_origin'] = $s['origin'];
			}
			if ( 'price-asc' !== $s['sort'] ) {
				$qa['od_sort'] = $s['sort'];
			}
			if ( $s['page'] > 1 ) {
				$qa['od_page'] = (int) $s['page'];
			}
			return $qa ? add_query_arg( $qa, $base_url ) : $base_url;
		};

		$atts_json = wp_json_encode( $atts );
		$atts['_page_url'] = om_absolute_url( $base_url );
		ob_start();
		printf( '<div class="om-diamonds" data-om-atts="%s" data-om-sig="%s">', esc_attr( $atts_json ), esc_attr( OM_Shortcodes::sign_atts( $atts_json ) ) );
		$this->render_filters( $f, $shapes_offered, $fixed_origin, $multiplier > 0, $base_url, 'yes' === $atts['show_origin'] );
		$this->render_results( $data, $f, $per_page, $url_state, $atts );
		echo '</div>';
		return ob_get_clean();
	}

	/** Outline icons for the shape picker. */
	public static function shape_icon( $shape ) {
		$paths = array(
			'Round'    => '<circle cx="12" cy="12" r="9"/>',
			'Oval'     => '<ellipse cx="12" cy="12" rx="6.5" ry="9.5"/>',
			'Cushion'  => '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/>',
			'Princess' => '<rect x="4" y="4" width="16" height="16"/>',
			'Emerald'  => '<path d="M8 2.5h8l3.5 3.5v12L16 21.5H8L4.5 18V6z"/>',
			'Pear'     => '<path d="M12 2.5c3.5 5 6.5 8.5 6.5 12.5a6.5 6.5 0 0 1-13 0c0-4 3-7.5 6.5-12.5z"/>',
			'Marquise' => '<path d="M12 2c4 3.5 6 6.8 6 10s-2 6.5-6 10c-4-3.5-6-6.8-6-10s2-6.5 6-10z"/>',
			'Radiant'  => '<path d="M7.5 3h9L20 6.5v11L16.5 21h-9L4 17.5v-11z"/>',
			'Asscher'  => '<path d="M8 3.5h8L20.5 8v8L16 20.5H8L3.5 16V8z"/>',
			'Heart'    => '<path d="M12 20.5S3.5 15 3.5 8.8A4.3 4.3 0 0 1 12 6.6a4.3 4.3 0 0 1 8.5 2.2C20.5 15 12 20.5 12 20.5z"/>',
		);
		return '<svg class="om-shape-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.2">' . ( $paths[ $shape ] ?? $paths['Round'] ) . '</svg>';
	}

	private function render_filters( $f, $shapes, $fixed_origin, $priced, $base_url, $show_origin ) {
		$action = strtok( $base_url, '?' );
		$query  = array();
		parse_str( (string) wp_parse_url( $base_url, PHP_URL_QUERY ), $query );
		$uid = wp_rand( 1000, 9999 );
		?>
		<form class="om-diamond-filters" action="<?php echo esc_url( $action ); ?>" method="get">
			<?php foreach ( $query as $key => $value ) : ?>
				<?php if ( is_scalar( $value ) ) : ?>
					<input type="hidden" name="<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $value ); ?>" />
				<?php endif; ?>
			<?php endforeach; ?>
			<input type="hidden" name="od_sort" value="<?php echo esc_attr( $f['sort'] ); ?>" />

			<fieldset class="om-df-group om-df-shapes">
				<legend><?php esc_html_e( 'Shape', 'om-catalog' ); ?></legend>
				<div class="om-df-shape-list">
					<?php foreach ( $shapes as $shape ) : ?>
						<label class="om-df-shape<?php echo in_array( $shape, $f['shape'], true ) ? ' is-checked' : ''; ?>">
							<input type="checkbox" name="od_shape[]" value="<?php echo esc_attr( $shape ); ?>" <?php checked( in_array( $shape, $f['shape'], true ) ); ?> />
							<?php echo self::shape_icon( $shape ); // phpcs:ignore WordPress.Security.EscapeOutput -- static SVG. ?>
							<span><?php echo esc_html( $shape ); ?></span>
						</label>
					<?php endforeach; ?>
				</div>
			</fieldset>

			<div class="om-df-row">
				<fieldset class="om-df-group om-df-range">
					<legend><?php esc_html_e( 'Carat', 'om-catalog' ); ?></legend>
					<div class="om-df-range-inputs">
						<label><span class="screen-reader-text"><?php esc_html_e( 'Minimum carat', 'om-catalog' ); ?></span><input type="number" name="od_cmin" min="0.1" max="30" step="0.01" inputmode="decimal" placeholder="<?php esc_attr_e( 'Min', 'om-catalog' ); ?>" value="<?php echo esc_attr( null !== $f['cmin'] ? $f['cmin'] : '' ); ?>" /></label>
						<span aria-hidden="true">–</span>
						<label><span class="screen-reader-text"><?php esc_html_e( 'Maximum carat', 'om-catalog' ); ?></span><input type="number" name="od_cmax" min="0.1" max="30" step="0.01" inputmode="decimal" placeholder="<?php esc_attr_e( 'Max', 'om-catalog' ); ?>" value="<?php echo esc_attr( null !== $f['cmax'] ? $f['cmax'] : '' ); ?>" /></label>
					</div>
				</fieldset>
				<?php if ( $priced ) : ?>
					<fieldset class="om-df-group om-df-range">
						<legend><?php esc_html_e( 'Price ($)', 'om-catalog' ); ?></legend>
						<div class="om-df-range-inputs">
							<label><span class="screen-reader-text"><?php esc_html_e( 'Minimum price', 'om-catalog' ); ?></span><input type="number" name="od_pmin" min="0" step="100" inputmode="numeric" placeholder="<?php esc_attr_e( 'Min', 'om-catalog' ); ?>" value="<?php echo esc_attr( null !== $f['pmin'] ? $f['pmin'] : '' ); ?>" /></label>
							<span aria-hidden="true">–</span>
							<label><span class="screen-reader-text"><?php esc_html_e( 'Maximum price', 'om-catalog' ); ?></span><input type="number" name="od_pmax" min="0" step="100" inputmode="numeric" placeholder="<?php esc_attr_e( 'Max', 'om-catalog' ); ?>" value="<?php echo esc_attr( null !== $f['pmax'] ? $f['pmax'] : '' ); ?>" /></label>
						</div>
					</fieldset>
				<?php endif; ?>
				<?php if ( ! $fixed_origin && $show_origin ) : ?>
					<fieldset class="om-df-group om-df-origin">
						<legend><?php esc_html_e( 'Origin', 'om-catalog' ); ?></legend>
						<div class="om-df-segmented">
							<?php foreach ( array( '' => __( 'All', 'om-catalog' ), 'lab' => __( 'Lab-grown', 'om-catalog' ), 'natural' => __( 'Natural', 'om-catalog' ) ) as $value => $label ) : ?>
								<label class="<?php echo $f['origin'] === $value ? 'is-checked' : ''; ?>"><input type="radio" name="od_origin" value="<?php echo esc_attr( $value ); ?>" <?php checked( $f['origin'], $value ); ?> /><span><?php echo esc_html( $label ); ?></span></label>
							<?php endforeach; ?>
						</div>
					</fieldset>
				<?php endif; ?>
			</div>

			<?php $open = $f['color'] || $f['clarity'] || $f['cut']; ?>
			<details class="om-df-more"<?php echo $open ? ' open' : ''; ?>>
				<summary><?php esc_html_e( 'Color, clarity & cut', 'om-catalog' ); ?></summary>
				<div class="om-df-row">
					<?php
					foreach (
						array(
							'color'   => array( __( 'Color', 'om-catalog' ), self::COLORS ),
							'clarity' => array( __( 'Clarity', 'om-catalog' ), self::CLARITY ),
							'cut'     => array( __( 'Cut', 'om-catalog' ), self::CUTS ),
						) as $key => $def
					) :
						?>
						<fieldset class="om-df-group om-df-chips">
							<legend><?php echo esc_html( $def[0] ); ?></legend>
							<div class="om-df-chip-list">
								<?php foreach ( $def[1] as $value ) : ?>
									<label class="om-df-chip<?php echo in_array( $value, $f[ $key ], true ) ? ' is-checked' : ''; ?>"><input type="checkbox" name="od_<?php echo esc_attr( $key ); ?>[]" value="<?php echo esc_attr( $value ); ?>" <?php checked( in_array( $value, $f[ $key ], true ) ); ?> /><span><?php echo esc_html( $value ); ?></span></label>
								<?php endforeach; ?>
							</div>
						</fieldset>
					<?php endforeach; ?>
				</div>
			</details>

			<div class="om-df-actions">
				<button type="submit" class="om-df-apply"><?php esc_html_e( 'Show diamonds', 'om-catalog' ); ?></button>
				<a class="om-df-reset" href="<?php echo esc_url( $base_url ); ?>"><?php esc_html_e( 'Reset', 'om-catalog' ); ?></a>
			</div>
		</form>
		<?php
	}

	private function render_results( $data, $f, $per_page, $url_state, $atts ) {
		echo '<div class="om-diamond-results">';
		if ( is_wp_error( $data ) ) {
			echo '<div class="om-error"><p>' . esc_html( om_public_error_message( $data ) ) . '</p></div></div>';
			return;
		}
		$diamonds = (array) ( $data['diamonds'] ?? array() );
		$total    = (int) ( $data['total_count'] ?? count( $diamonds ) );

		echo '<div class="om-catalog-toolbar"><div class="om-toolbar-start"><p class="om-result-count" aria-live="polite">';
		/* translators: %s: number of diamonds. */
		echo esc_html( sprintf( _n( '%s diamond', '%s diamonds', $total, 'om-catalog' ), number_format_i18n( $total ) ) );
		echo '</p></div>';
		$labels  = array(
			'price-asc'   => __( 'Price: low to high', 'om-catalog' ),
			'price-desc'  => __( 'Price: high to low', 'om-catalog' ),
			'carat-asc'   => __( 'Carat: small to large', 'om-catalog' ),
			'carat-desc'  => __( 'Carat: large to small', 'om-catalog' ),
			'color-asc'   => __( 'Color: best first', 'om-catalog' ),
			'clarity-asc' => __( 'Clarity: best first', 'om-catalog' ),
			'new'         => __( 'Newest', 'om-catalog' ),
		);
		$sort_id = 'om-dsort-' . wp_rand( 1000, 9999 );
		echo '<label class="om-sort" for="' . esc_attr( $sort_id ) . '"><span>' . esc_html__( 'Sort by', 'om-catalog' ) . '</span><select id="' . esc_attr( $sort_id ) . '" class="om-filter-nav om-sort-select">';
		foreach ( $labels as $key => $label ) {
			printf( '<option value="%s"%s>%s</option>', esc_url( $url_state( array( 'sort' => $key ) ) ), selected( $f['sort'], $key, false ), esc_html( $label ) );
		}
		echo '</select></label></div>';

		if ( ! $diamonds ) {
			echo '<div class="om-empty"><p>' . esc_html__( 'No diamonds match these filters. Try widening the carat or price range.', 'om-catalog' ) . '</p></div></div>';
			return;
		}

		echo '<div class="om-diamond-table" role="list">';
		echo '<div class="om-dt-head" aria-hidden="true"><span>' . esc_html__( 'Shape', 'om-catalog' ) . '</span><span>' . esc_html__( 'Carat', 'om-catalog' ) . '</span><span>' . esc_html__( 'Color', 'om-catalog' ) . '</span><span>' . esc_html__( 'Clarity', 'om-catalog' ) . '</span><span>' . esc_html__( 'Cut', 'om-catalog' ) . '</span><span>' . esc_html__( 'Report', 'om-catalog' ) . '</span><span>' . esc_html__( 'Price', 'om-catalog' ) . '</span><span></span></div>';
		foreach ( $diamonds as $d ) {
			$this->render_row( $d, $atts );
		}
		echo '</div>';

		$pages = (int) ceil( $total / $per_page );
		if ( $pages > 1 ) {
			echo '<nav class="om-pagination" aria-label="' . esc_attr__( 'Pages', 'om-catalog' ) . '">';
			echo paginate_links( // phpcs:ignore WordPress.Security.EscapeOutput -- core function.
				array(
					'base'      => str_replace( '999999999', '%#%', $url_state( array( 'page' => 999999999 ) ) ),
					'format'    => '',
					'total'     => min( $pages, 500 ),
					'current'   => min( $f['page'], $pages ),
					'mid_size'  => 1,
					'prev_text' => '&lsaquo;',
					'next_text' => '&rsaquo;',
				)
			);
			echo '</nav>';
		}
		echo '</div>';
	}

	/** One-line description, e.g. "1.50 ct Round · E · VS1 · Ideal · Lab-grown". */
	public static function describe( $d ) {
		return implode(
			' · ',
			array_filter(
				array(
					isset( $d['carat'] ) ? number_format( (float) $d['carat'], 2 ) . ' ct ' . ( $d['shape'] ?? '' ) : ( $d['shape'] ?? '' ),
					$d['color'] ?? '',
					$d['clarity'] ?? '',
					$d['cut'] ?? '',
					! empty( $d['is_lab'] ) ? __( 'Lab-grown', 'om-catalog' ) : __( 'Natural', 'om-catalog' ),
				)
			)
		);
	}

	private function render_row( $d, $atts ) {
		$retail = isset( $d['price'] ) ? om_diamond_retail( $d['price'] ) : null;
		$price  = null !== $retail ? om_format_price_short( $retail ) : __( 'On request', 'om-catalog' );
		$lot    = (string) ( $d['lot_number'] ?? '' );
		$state  = is_array( $atts['select_state'] ) ? $atts['select_state'] : wp_parse_args( (string) $atts['select_state'] );
		$select = 'yes' === $atts['show_select'] ? om_builder_url( $state + array( 'rb_diamond' => $lot ) ) : '';
		$media  = array_filter(
			array(
				'image' => $d['image_url'] ?? '',
				'video' => $d['video_url'] ?? '',
				'v360'  => $d['vision360_url'] ?? '',
			)
		);
		?>
		<details class="om-diamond" role="listitem">
			<summary class="om-dt-row">
				<span class="om-dt-shape"><?php echo self::shape_icon( (string) ( $d['shape'] ?? 'Round' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- static SVG. ?><?php echo esc_html( $d['shape'] ?? '' ); ?></span>
				<span class="om-dt-carat" data-label="<?php esc_attr_e( 'Carat', 'om-catalog' ); ?>"><?php echo esc_html( isset( $d['carat'] ) ? number_format( (float) $d['carat'], 2 ) : '' ); ?></span>
				<span data-label="<?php esc_attr_e( 'Color', 'om-catalog' ); ?>"><?php echo esc_html( $d['color'] ?? '' ); ?></span>
				<span data-label="<?php esc_attr_e( 'Clarity', 'om-catalog' ); ?>"><?php echo esc_html( $d['clarity'] ?? '' ); ?></span>
				<span data-label="<?php esc_attr_e( 'Cut', 'om-catalog' ); ?>"><?php echo esc_html( $d['cut'] ?? '—' ); ?></span>
				<span data-label="<?php esc_attr_e( 'Report', 'om-catalog' ); ?>"><?php echo esc_html( trim( ( $d['lab'] ?? '' ) . ( ! empty( $d['is_lab'] ) ? ' · ' . __( 'Lab', 'om-catalog' ) : '' ) ) ); ?></span>
				<span class="om-dt-price"><?php echo esc_html( $price ); ?></span>
				<span class="om-dt-more" aria-hidden="true"></span>
			</summary>
			<div class="om-diamond-detail">
				<div class="om-dd-media">
					<?php if ( ! empty( $media['v360'] ) ) : ?>
						<iframe class="om-lazy-frame" data-src="<?php echo esc_url( $media['v360'] ); ?>" title="<?php esc_attr_e( '360° view', 'om-catalog' ); ?>" allowfullscreen></iframe>
					<?php elseif ( ! empty( $media['image'] ) ) : ?>
						<img src="<?php echo esc_url( $media['image'] ); ?>" alt="<?php echo esc_attr( self::describe( $d ) ); ?>" loading="lazy" decoding="async" />
					<?php else : ?>
						<div class="om-dd-placeholder"><?php echo self::shape_icon( (string) ( $d['shape'] ?? 'Round' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- static SVG. ?></div>
					<?php endif; ?>
					<?php if ( ! empty( $media['video'] ) && empty( $media['v360'] ) ) : ?>
						<a class="om-dd-video-link" href="<?php echo esc_url( $media['video'] ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Watch video', 'om-catalog' ); ?></a>
					<?php endif; ?>
				</div>
				<div class="om-dd-info">
					<p class="om-dd-title"><?php echo esc_html( self::describe( $d ) ); ?></p>
					<p class="om-dd-price"><?php echo esc_html( $price ); ?></p>
					<dl class="om-dd-specs">
						<?php
						$specs = array(
							__( 'Measurements', 'om-catalog' ) => $d['measurement'] ?? '',
							__( 'Depth', 'om-catalog' )        => isset( $d['depth_percent'] ) ? $d['depth_percent'] . '%' : '',
							__( 'Table', 'om-catalog' )        => isset( $d['table_percent'] ) ? $d['table_percent'] . '%' : '',
							__( 'Polish', 'om-catalog' )       => $d['polish'] ?? '',
							__( 'Symmetry', 'om-catalog' )     => $d['symmetry'] ?? '',
							__( 'Fluorescence', 'om-catalog' ) => $d['fluorescence'] ?? '',
							__( 'L/W ratio', 'om-catalog' )    => $d['ratio'] ?? '',
							__( 'Certificate', 'om-catalog' )  => trim( ( $d['lab'] ?? '' ) . ' ' . ( $d['certificate_number'] ?? '' ) ),
						);
						foreach ( $specs as $label => $value ) :
							if ( '' === (string) $value ) {
								continue;
							}
							?>
							<div><dt><?php echo esc_html( $label ); ?></dt><dd><?php echo esc_html( $value ); ?></dd></div>
						<?php endforeach; ?>
					</dl>
					<div class="om-dd-actions">
						<?php if ( $select ) : ?>
							<a class="om-btn om-btn--solid" href="<?php echo esc_url( $select ); ?>"><?php esc_html_e( 'Select this diamond', 'om-catalog' ); ?></a>
						<?php endif; ?>
						<?php if ( ! empty( $d['certificate_url'] ) ) : ?>
							<a class="om-btn om-btn--outline" href="<?php echo esc_url( $d['certificate_url'] ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'View certificate', 'om-catalog' ); ?></a>
						<?php endif; ?>
					</div>
					<?php
					if ( 'yes' === $atts['show_inquiry'] ) {
						echo OM_Inquiry::render_form( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
							array(
								'title'   => self::describe( $d ),
								'diamond' => $lot . ( ! empty( $d['certificate_number'] ) ? ' / cert ' . $d['certificate_number'] : '' ),
								'price'   => null !== $retail ? $price : '',
								'url'     => $atts['_page_url'] ?? '',
								'heading' => __( 'Ask about this diamond', 'om-catalog' ),
								'intro'   => '',
							)
						);
					}
					?>
				</div>
			</div>
		</details>
		<?php
	}

	public function handle_ajax() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint.
		$json = isset( $_POST['atts'] ) ? (string) wp_unslash( $_POST['atts'] ) : '';
		$sig  = isset( $_POST['sig'] ) ? (string) wp_unslash( $_POST['sig'] ) : '';
		$url  = isset( $_POST['url'] ) ? esc_url_raw( wp_unslash( $_POST['url'] ) ) : '';
		// phpcs:enable
		if ( '' === $json || ! hash_equals( OM_Shortcodes::sign_atts( $json ), $sig ) || '' === $url ) {
			wp_send_json_error( array( 'message' => 'Invalid request.' ), 400 );
		}
		$atts  = json_decode( $json, true );
		$query = array();
		parse_str( (string) wp_parse_url( $url, PHP_URL_QUERY ), $query );
		wp_send_json_success(
			array(
				'html' => $this->render( is_array( $atts ) ? $atts : array(), self::request_from_query( $query, remove_query_arg( self::PARAMS, $url ) ) ),
			)
		);
	}
}
