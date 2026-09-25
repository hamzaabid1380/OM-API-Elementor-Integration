<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once OM_CATALOG_DIR . 'includes/functions-pricing.php';

class OM_Shortcodes {

	/** Pages shown at once by the current grid ("load more" restore). */
	private $window = 1;

	/**
	 * The API hard-rejects (400) any limit over 500 on product routes rather
	 * than capping it silently.
	 */
	const MAX_PER_PAGE = 500;

	/** Where the visitor filters render. */
	const FILTER_POSITIONS = array( 'top', 'dropdown', 'left', 'right' );

	/** Center-stone shapes offered by the visitor "Shape" filter. */
	const DEFAULT_SHAPES = array( 'Round', 'Oval', 'Cushion', 'Princess', 'Emerald', 'Pear', 'Marquise', 'Radiant', 'Asscher', 'Heart' );

	/**
	 * Visitor sort options => API sortBy/order. '' is OM's own curated
	 * order (sortOrder).
	 */
	const SORTS = array(
		''       => array(),
		'newest' => array( 'sortBy' => 'new', 'order' => 'desc' ),
		'style'  => array( 'sortBy' => 'styleNumber', 'order' => 'asc' ),
		// Most viewed first (views counted on this site), then OM's order.
		'popular' => array(),
	);

	/** Query-string parameters that carry visitor state. */
	const STATE_PARAMS = array( 'om_style', 'om_page', 'om_line', 'om_shape', 'om_metal', 'om_q', 'om_sort', 'om_upto' );

	/** Metal colours offered by the visitor "Metal" filter. */
	const DEFAULT_METAL_COLORS = array( 'White', 'Yellow', 'Rose' );

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

	/**
	 * Display names of the product lines. Uses OM's own list when it has
	 * been cached (by wp-admin or the Elementor editor), otherwise a built-in
	 * fallback. Never calls the API itself unless $fetch is true.
	 */
	public static function line_labels( $fetch = false ) {
		$from_api = OM_API_Client::get_product_lines_map( $fetch );
		if ( ! empty( $from_api ) ) {
			return $from_api;
		}
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

	/** Split a comma-separated list into trimmed, non-empty values. */
	private static function csv( $list ) {
		return array_values( array_filter( array_map( 'trim', explode( ',', (string) $list ) ), 'strlen' ) );
	}

	/**
	 * Visitor state (active line, filter picks, page, base URL) from the
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
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only view state.
		return self::request_from_query(
			wp_unslash( $_GET ),
			remove_query_arg( self::STATE_PARAMS )
		);
		// phpcs:enable
	}

	/** Build visitor state from a parsed query-string array. */
	public static function request_from_query( $query, $base_url ) {
		$get = function ( $key ) use ( $query ) {
			return isset( $query[ $key ] ) && is_scalar( $query[ $key ] ) ? (string) $query[ $key ] : '';
		};
		return array(
			'page'     => '' !== $get( 'om_page' ) ? max( 1, absint( $get( 'om_page' ) ) ) : 1,
			'style'    => sanitize_text_field( $get( 'om_style' ) ),
			'line'     => sanitize_title( $get( 'om_line' ) ),
			'shape'    => sanitize_text_field( $get( 'om_shape' ) ),
			'metal'    => sanitize_text_field( $get( 'om_metal' ) ),
			'q'        => mb_substr( sanitize_text_field( $get( 'om_q' ) ), 0, 80 ),
			'sort'     => sanitize_key( $get( 'om_sort' ) ),
			// "Load more": pages 1..upto shown at once (coming back to a
			// longer list restores it).
			'upto'     => '' !== $get( 'om_upto' ) ? min( 20, max( 1, absint( $get( 'om_upto' ) ) ) ) : 0,
			'base_url' => $base_url,
		);
	}

	/**
	 * Sign a grid's attributes. The AJAX endpoint only re-renders attribute
	 * sets this site produced itself, so a visitor can't make the site query
	 * OM with settings no page on the site uses. Stateless, so it keeps
	 * working on pages served from a full-page cache.
	 */
	public static function sign_atts( $json ) {
		return hash_hmac( 'sha256', (string) $json, wp_salt( 'nonce' ) . '|om_catalog_grid' );
	}

	public function render_catalog_grid( $atts ) {
		return $this->render_grid( (array) $atts, self::request_from_globals() );
	}

	/**
	 * Parse "line:val|val;line2:val" (shortcode form) or an array
	 * (Elementor widget form) into [ line => [ values ] ].
	 */
	private static function parse_line_styles( $raw ) {
		$out = array();
		if ( is_array( $raw ) ) {
			foreach ( $raw as $code => $values ) {
				$code   = sanitize_title( $code );
				$values = array_values( array_filter( array_map( 'trim', (array) $values ), 'strlen' ) );
				if ( $code && $values ) {
					$out[ $code ] = $values;
				}
			}
			return $out;
		}
		foreach ( array_filter( explode( ';', (string) $raw ) ) as $chunk ) {
			$pair = explode( ':', $chunk, 2 );
			if ( 2 === count( $pair ) ) {
				$code   = sanitize_title( $pair[0] );
				$values = array_values( array_filter( array_map( 'trim', explode( '|', $pair[1] ) ), 'strlen' ) );
				if ( $code && $values ) {
					$out[ $code ] = $values;
				}
			}
		}
		return $out;
	}

	/**
	 * Render the full catalog block (filters + grid + pagination) for a set
	 * of shortcode attributes and a visitor request. Shared by the
	 * shortcode, the Elementor widget and the om_filter_grid AJAX endpoint.
	 */
	public function render_grid( $atts, $request ) {
		$atts = shortcode_atts(
			array(
				'line'            => 'engagement-rings',
				// Multi-line mode: comma-separated line codes (overrides
				// "line"), shown one at a time behind a line switcher.
				'lines'           => '',
				// Admin's per-line collection picks: "line:val|val;line2:val"
				// in a shortcode, or an array from the Elementor widget.
				'line_styles'     => '',
				'columns'         => 3,
				'per_page'        => 12,
				'style'           => '',
				'set'             => '',
				'shape'           => '',
				'in_stock'        => '',
				// Comma-separated style numbers: "include" shows ONLY those
				// products (API-side); "exclude" hides them (filtered here —
				// the API has no exclusion parameter).
				'include'         => '',
				'exclude'         => '',
				// "no" when the Elementor widget renders this: its responsive
				// Columns control owns the column count via CSS, which an
				// inline --om-columns would override.
				'inline_columns'  => 'yes',
				// Card layout: classic, editorial, boxed, overlay.
				'layout'          => 'classic',
				// Visitor filters: collections ("show_filters"), shape and
				// metal colour, and where they render.
				'show_filters'    => '',
				'filter_shapes'   => '',
				'shape_options'   => '',
				'filter_metals'   => '',
				'filter_position' => 'top',
				// Top-bar design: pills, underline, buttons, minimal.
				'filter_style'    => 'pills',
				'filters_title'   => '',
				'show_count'      => 'yes',
				// Keyword search box with as-you-type suggestions.
				'show_search'     => 'yes',
				'search_placeholder' => '',
				// "From $X" beside each search suggestion (once a markup is set).
				'suggest_prices'  => 'yes',
				// What suggestions search: line (the line being browsed),
				// block (all of this block's lines, grouped) or all (every
				// product line, grouped).
				'search_scope'    => 'line',
				// Page design: modern (framed panels, soft corners, motion,
				// bottom-sheet filters on phones) or classic.
				'design'          => 'modern',
				// numbers, loadmore (a "Show more" button) or infinite
				// (loads as the visitor nears the end).
				'pagination_style' => 'numbers',
				// "Compare" toggle under each card (tray + side-by-side table).
				'compare'          => 'yes',
				// "Popular" badge on the most viewed designs.
				'badge_popular'    => 'yes',
				// Badges double as quick filters (shape, New, Popular).
				'badge_links'      => 'yes',
				// Visitor sort dropdown, and the default order.
				'show_sort'       => 'yes',
				'sort'            => '',
				// "yes" shows a "From $X" starting price on each card (loaded
				// after the page, only when a markup is configured).
				'show_prices'     => '',
				// Extra query args appended to product links (the ring
				// builder uses this to carry its state).
				'card_query'      => '',
				// "yes" adds a Quick view button to each card.
				'quick_view'      => 'yes',
				// Card badges: "STYLE: Label" lines, and "New" for designs
				// added within this many days (0 = off).
				'badges'          => '',
				'badge_new_days'  => 0,
				'badge_shape'     => '',
				// "yes": cards with a video show a play badge and preview it
				// on hover (desktop) / when centred on screen (phones).
				'card_video'      => 'yes',
				// Video badge on cards: icon, label (play icon + text) or
				// none; its text and corner (tr, tl, br, bl).
				'video_badge'      => 'icon',
				'video_badge_text' => '',
				'video_badge_pos'  => 'tr',
				// Card hover: lift, zoom, none; '' = Settings default.
				'card_hover'       => '',
				// Quick view button: text, look (bar, button, icon), shown
				// on phones/tablets too, and what the pop-up includes.
				'qv_text'         => '',
				'qv_style'        => 'bar',
				'qv_mobile'       => '',
				'qv_parts'        => 'price,options,description,meta,builder',
				'qv_video'        => 'first',
				'qv_link_text'    => '',
			),
			$atts,
			'om_catalog'
		);

		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );

		$layout          = in_array( $atts['layout'], array( 'classic', 'editorial', 'boxed', 'overlay' ), true ) ? $atts['layout'] : 'classic';
		$filter_style    = in_array( $atts['filter_style'], array( 'pills', 'underline', 'buttons', 'minimal' ), true ) ? $atts['filter_style'] : 'pills';
		$filter_position = in_array( $atts['filter_position'], self::FILTER_POSITIONS, true ) ? $atts['filter_position'] : 'top';

		// Which product lines does this block cover, and which is active?
		$lines_raw = '' !== trim( (string) $atts['lines'] ) ? $atts['lines'] : $atts['line'];
		$lines     = array_values( array_unique( array_filter( array_map( 'sanitize_title', explode( ',', (string) $lines_raw ) ) ) ) );
		if ( empty( $lines ) ) {
			$lines = array( 'engagement-rings' );
		}
		$active_line = ( '' !== $request['line'] && in_array( $request['line'], $lines, true ) ) ? $request['line'] : $lines[0];

		$line_styles = self::parse_line_styles( $atts['line_styles'] );

		// The default ("All") collection filter for the active line: the
		// admin's picks for that line plus the free-text filter, if any.
		$admin_base = isset( $line_styles[ $active_line ] ) ? implode( ',', $line_styles[ $active_line ] ) : '';
		if ( '' !== trim( (string) $atts['style'] ) ) {
			$admin_base = trim( $admin_base . ',' . trim( $atts['style'] ), ',' );
		}

		// ---- Visitor facets. Each has a whitelist of values; anything else
		// in the URL is ignored, so visitors can only pick what's offered. ----

		$collection_groups = 'yes' === $atts['show_filters'] ? $this->collection_groups( $active_line, $line_styles ) : array();
		$allowed_styles    = array();
		foreach ( $collection_groups as $group ) {
			$allowed_styles += $group['options'];
		}

		$shape_options = array();
		if ( 'yes' === $atts['filter_shapes'] ) {
			$list          = self::csv( '' !== trim( (string) $atts['shape_options'] ) ? $atts['shape_options'] : ( '' !== trim( (string) $atts['shape'] ) ? $atts['shape'] : implode( ',', self::DEFAULT_SHAPES ) ) );
			$shape_options = array_combine( $list, $list );
		}

		$metal_options = array();
		if ( 'yes' === $atts['filter_metals'] ) {
			$metal_options = array_combine( self::DEFAULT_METAL_COLORS, self::DEFAULT_METAL_COLORS );
		}

		$state = array(
			'line'  => $active_line,
			'style' => isset( $allowed_styles[ $request['style'] ] ) ? $request['style'] : '',
			'shape' => isset( $shape_options[ $request['shape'] ] ) ? $request['shape'] : '',
			'metal' => isset( $metal_options[ $request['metal'] ] ) ? $request['metal'] : '',
			'sort'  => 'featured' === $request['sort'] ? '' : ( ( '' !== $request['sort'] && isset( self::SORTS[ $request['sort'] ] ) ) ? $request['sort'] : ( isset( self::SORTS[ $atts['sort'] ] ) ? (string) $atts['sort'] : '' ) ),
			'q'     => 'yes' === $atts['show_search'] ? trim( (string) ( $request['q'] ?? '' ) ) : '',
		);
		$default_sort = isset( self::SORTS[ $atts['sort'] ] ) ? (string) $atts['sort'] : '';



		$style_filter = '' !== $state['style'] ? $state['style'] : $admin_base;
		$shape_filter = '' !== $state['shape'] ? $state['shape'] : self::normalize_style_list( $atts['shape'] );

		$columns  = max( 1, min( 5, (int) $atts['columns'] ) );
		$per_page = max( 1, min( self::MAX_PER_PAGE, (int) $atts['per_page'] ) );
		$paged    = max( 1, (int) $request['page'] );
		$base_url = $request['base_url'];
		$multi    = count( $lines ) > 1;

		// Links drop the search unless asked to keep it (pagination and
		// sorting do): picking a filter starts a fresh browse.
		$url = function ( $changes = array() ) use ( $state, $base_url, $multi, $default_sort ) {
			$s    = array_merge( $state, array( 'page' => 1, 'q' => '' ), $changes );
			$args = array();
			if ( $multi ) {
				$args['om_line'] = $s['line'];
			}
			if ( '' !== $s['q'] ) {
				$args['om_q'] = rawurlencode( $s['q'] );
			}
			if ( $s['sort'] !== $default_sort ) {
				$args['om_sort'] = '' === $s['sort'] ? 'featured' : $s['sort'];
			}
			foreach ( array( 'style' => 'om_style', 'shape' => 'om_shape', 'metal' => 'om_metal' ) as $key => $param ) {
				if ( '' !== (string) $s[ $key ] ) {
					$args[ $param ] = rawurlencode( $s[ $key ] );
				}
			}
			if ( (int) $s['page'] > 1 ) {
				$args['om_page'] = (int) $s['page'];
			}
			return $args ? add_query_arg( $args, $base_url ) : $base_url;
		};

		// ---- Fetch ----

		$include = self::normalize_style_list( $atts['include'] );
		$args    = array_filter(
			array(
				'style'       => $style_filter,
				'set'         => $atts['set'],
				'shape'       => $shape_filter,
				'color'       => $state['metal'],
				'inStock'     => 'yes' === $atts['in_stock'] ? 'true' : '',
				'styleNumber' => $include,
				// Listings hide carat/size variants by default; a hand-picked
				// include list should show whatever was named, variant style
				// numbers included.
				'parentsOnly' => '' !== $include ? 'false' : '',
				'limit'       => $per_page,
			) + self::SORTS[ $state['sort'] ]
		);

		// Remember each query's total so out-of-range pages (or anyone
		// walking om_page upwards) don't cost an API call each.
		$total_key     = 'om_total_' . md5( $active_line . '|' . wp_json_encode( $args ) );
		$known_total   = get_transient( $total_key );
		$cache_minutes = max( 1, (int) get_option( 'om_listing_cache_minutes', 15 ) );
		$out_of_range  = false !== $known_total && $paged > max( 1, (int) ceil( (int) $known_total / $per_page ) );

		// "Load more" / infinite: coming back with om_upto=N shows pages
		// 1..N at once (the browser then restores the scroll position).
		$more_mode = in_array( $atts['pagination_style'], array( 'loadmore', 'infinite' ), true );
		$window    = 1;
		if ( $more_mode && (int) ( $request['upto'] ?? 0 ) > $paged ) {
			$window = min( (int) $request['upto'], (int) floor( 480 / $per_page ) );
			$paged  = max( 1, $window );
		}
		$w_offset = $window > 1 ? 0 : ( $paged - 1 ) * $per_page;
		$w_length = $per_page * $window;

		if ( '' !== $state['q'] ) {
			// Keyword search runs against the line's local index.
			$hits = OM_Search::search( $active_line, $state['q'] );
			$data = is_wp_error( $hits ) ? $hits : array(
				'products'    => array_slice( $hits, $w_offset, $w_length ),
				'total_count' => count( $hits ),
			);
		} elseif ( 'popular' === $state['sort'] ) {
			// Most viewed: order built locally from this site's view counts.
			$order = OM_Engage::popular_order( $active_line, $args );
			if ( is_wp_error( $order ) ) {
				$data = $order;
			} else {
				$slice    = array_slice( $order, $w_offset, $w_length );
				$products = OM_Engage::products_in_order( $active_line, $slice );
				$data     = is_wp_error( $products ) ? $products : array(
					'products'    => $products,
					'total_count' => count( $order ),
				);
			}
		} elseif ( $window > 1 ) {
			$args['limit']  = $w_length;
			$args['offset'] = 0;
			$data           = self::fetch_listing( $active_line, $args );
			$args['limit']  = $per_page;
		} elseif ( $out_of_range ) {
			$data = array(
				'products'    => array(),
				'total_count' => (int) $known_total,
			);
		} else {
			$args['offset'] = ( $paged - 1 ) * $per_page;
			$data           = self::fetch_listing( $active_line, $args );
		}

		// Hide list: drop excluded style numbers after the fetch. Totals stay
		// API-side, so a page can show slightly fewer cards than per_page.
		if ( ! is_wp_error( $data ) && '' !== trim( (string) $atts['exclude'] ) && ! empty( $data['products'] ) ) {
			$excluded         = array_map( 'strtoupper', self::csv( $atts['exclude'] ) );
			$data['products'] = array_values(
				array_filter(
					$data['products'],
					static function ( $product ) use ( $excluded ) {
						return ! in_array( strtoupper( (string) ( $product['style_number'] ?? '' ) ), $excluded, true );
					}
				)
			);
		}

		// ---- Facets for display ----

		$facets = array();
		if ( $multi ) {
			$labels = self::line_labels();
			$items  = array();
			foreach ( $lines as $code ) {
				$items[] = array(
					'label'  => isset( $labels[ $code ] ) ? $labels[ $code ] : ucwords( str_replace( '-', ' ', $code ) ),
					// Collections differ per line, so switching line resets them.
					'url'    => $url( array( 'line' => $code, 'style' => '' ) ),
					'active' => $code === $active_line,
				);
			}
			$facets[] = array( 'key' => 'line', 'title' => __( 'Product Type', 'om-catalog' ), 'items' => $items, 'all' => null );
		}
		$first_group = true;
		foreach ( $collection_groups as $group ) {
			$items = array();
			foreach ( $group['options'] as $value => $label ) {
				$items[] = array(
					'label'  => $label,
					'url'    => $url( array( 'style' => $value ) ),
					'active' => $state['style'] === (string) $value,
					'depth'  => isset( $group['depth'][ $value ] ) ? $group['depth'][ $value ] : 0,
				);
			}
			$facets[] = array(
				'key'   => 'style',
				'title' => $group['title'],
				'items' => $items,
				// One "All" for collections, in the first group only.
				'all'   => $first_group ? array( 'label' => __( 'All', 'om-catalog' ), 'url' => $url( array( 'style' => '' ) ), 'active' => '' === $state['style'] ) : null,
			);
			$first_group = false;
		}
		if ( $shape_options ) {
			$items = array();
			foreach ( $shape_options as $value ) {
				$items[] = array( 'label' => $value, 'url' => $url( array( 'shape' => $value ) ), 'active' => $state['shape'] === $value );
			}
			$facets[] = array(
				'key'   => 'shape',
				'title' => __( 'Shape', 'om-catalog' ),
				'items' => $items,
				'all'   => array( 'label' => __( 'All shapes', 'om-catalog' ), 'url' => $url( array( 'shape' => '' ) ), 'active' => '' === $state['shape'] ),
			);
		}
		if ( $metal_options ) {
			$items = array();
			foreach ( $metal_options as $value ) {
				$items[] = array( 'label' => $value, 'url' => $url( array( 'metal' => $value ) ), 'active' => $state['metal'] === $value, 'swatch' => strtolower( $value ) );
			}
			$facets[] = array(
				'key'   => 'metal',
				'title' => __( 'Metal', 'om-catalog' ),
				'items' => $items,
				'all'   => array( 'label' => __( 'All metals', 'om-catalog' ), 'url' => $url( array( 'metal' => '' ) ), 'active' => '' === $state['metal'] ),
			);
		}

		// Active filter chips (each removes one pick) + "Clear all".
		$chips = array();
		if ( '' !== $state['q'] ) {
			/* translators: %s: search words. */
			$chips[] = array( 'label' => sprintf( __( '"%s"', 'om-catalog' ), $state['q'] ), 'url' => $url( array( 'q' => '' ) ) );
		}
		if ( '' !== $state['style'] ) {
			$chips[] = array( 'label' => $allowed_styles[ $state['style'] ], 'url' => $url( array( 'style' => '' ) ) );
		}
		if ( '' !== $state['shape'] ) {
			$chips[] = array( 'label' => $state['shape'], 'url' => $url( array( 'shape' => '' ) ) );
		}
		if ( '' !== $state['metal'] ) {
			$chips[] = array( 'label' => $state['metal'], 'url' => $url( array( 'metal' => '' ) ) );
		}
		$clear_url = $url( array( 'style' => '', 'shape' => '', 'metal' => '' ) );

		// ---- Output ----

		$atts_json = wp_json_encode( $atts );
		$has_side  = in_array( $filter_position, array( 'left', 'right' ), true ) && ! empty( $facets );

		$classes = array( 'om-catalog-wrap', 'om-filterpos-' . $filter_position, 'om-cdesign-' . ( 'classic' === $atts['design'] ? 'classic' : 'modern' ) );
		if ( $has_side ) {
			$classes[] = 'om-has-sidebar';
		}

		ob_start();
		printf(
			'<div class="%s" data-om-atts="%s" data-om-sig="%s">',
			esc_attr( implode( ' ', $classes ) ),
			esc_attr( $atts_json ),
			esc_attr( self::sign_atts( $atts_json ) )
		);

		if ( $has_side ) {
			echo '<div class="om-catalog-layout">';
			$this->render_sidebar( $facets, $chips, $clear_url, $atts['filters_title'] );
			echo '<div class="om-catalog-main">';
		} elseif ( 'dropdown' === $filter_position ) {
			$this->render_dropdowns( $facets );
		} else {
			$this->render_top_bars( $facets, $filter_style );
		}

		$this->window = $window;
		$this->render_results( $data, $atts, $paged, $per_page, $columns, $layout, $active_line, $chips, $clear_url, $state, $url, $base_url, $multi );

		if ( $has_side ) {
			echo '</div></div>';
		}
		echo '</div>';

		return ob_get_clean();
	}

	/**
	 * The active line's collections, as display groups:
	 * [ [ 'title' => ..., 'options' => [ value => label ], 'depth' => [ value => 0|1 ] ], ... ]
	 * When the admin curated collections for the line, visitors filter
	 * within exactly that set.
	 */
	private function collection_groups( $line, $line_styles ) {
		$groups = OM_API_Client::get_line_collections( $line );

		if ( ! empty( $line_styles[ $line ] ) ) {
			$labels = array();
			foreach ( $groups as $group ) {
				$labels += $group['options'];
			}
			$options = array();
			foreach ( $line_styles[ $line ] as $value ) {
				$options[ $value ] = isset( $labels[ $value ] ) ? $labels[ $value ] : $value;
			}
			return array(
				array(
					'title'   => __( 'Collection', 'om-catalog' ),
					'options' => $options,
					'depth'   => array(),
				),
			);
		}

		$out = array();
		foreach ( $groups as $group ) {
			$options = array();
			$depth   = array();
			foreach ( $group['options'] as $value => $label ) {
				// Subcategories carry "Category / Sub" labels: nest them.
				$pos = strpos( $label, ' / ' );
				if ( false !== $pos ) {
					$options[ $value ] = substr( $label, $pos + 3 );
					$depth[ $value ]   = 1;
				} else {
					$options[ $value ] = $label;
				}
			}
			$out[] = array(
				'title'   => '' !== $group['label'] ? $group['label'] : __( 'Collection', 'om-catalog' ),
				'options' => $options,
				'depth'   => $depth,
			);
		}
		return $out;
	}

	/**
	 * For the one-row layouts (top bar, dropdowns) all collection groups
	 * become one facet. Two groups can share a category name ("Hidden Halo"
	 * exists in Bridal Rings and Peg Heads), so duplicates are qualified.
	 */
	private function merge_collection_facets( $facets ) {
		$out    = array();
		$merged = null;
		foreach ( $facets as $facet ) {
			if ( 'style' !== $facet['key'] ) {
				$out[] = $facet;
				continue;
			}
			if ( null === $merged ) {
				$merged          = $facet;
				$merged['title'] = __( 'Collection', 'om-catalog' );
				$merged['items'] = array();
				$out[]           = &$merged;
			}
			$seen = wp_list_pluck( $merged['items'], 'label' );
			foreach ( $facet['items'] as $item ) {
				if ( in_array( $item['label'], $seen, true ) ) {
					$item['label'] .= ' (' . $facet['title'] . ')';
				}
				$merged['items'][] = $item;
			}
		}
		unset( $merged );
		return $out;
	}

	/** Filters as rows of pills/tabs above the grid. */
	private function render_top_bars( $facets, $filter_style ) {
		foreach ( $this->merge_collection_facets( $facets ) as $facet ) {
			$items = $facet['items'];
			if ( 'style' === $facet['key'] ) {
				// Keep the top bar short: top-level categories only.
				$items = array_values(
					array_filter(
						$items,
						static function ( $item ) {
							return empty( $item['depth'] ) || $item['active'];
						}
					)
				);
			}
			printf(
				'<nav class="om-filter-bar om-%s-bar om-filters-%s" aria-label="%s">',
				esc_attr( 'line' === $facet['key'] ? 'line' : ( 'style' === $facet['key'] ? 'collection' : $facet['key'] ) ),
				esc_attr( $filter_style ),
				esc_attr( $facet['title'] )
			);
			if ( $facet['all'] ) {
				$this->pill( $facet['all'] );
			}
			foreach ( $items as $item ) {
				$this->pill( $item );
			}
			echo '</nav>';
		}
	}

	private function pill( $item ) {
		printf(
			'<a class="om-filter-pill%s" href="%s"%s>%s</a>',
			$item['active'] ? ' is-active' : '',
			esc_url( $item['url'] ),
			$item['active'] ? ' aria-current="true"' : '',
			esc_html( $item['label'] )
		);
	}

	/** Filters as a row of compact dropdowns above the grid. */
	private function render_dropdowns( $facets ) {
		echo '<div class="om-filter-dropdowns">';
		foreach ( $this->merge_collection_facets( $facets ) as $i => $facet ) {
			$id = 'om-dd-' . $facet['key'] . '-' . $i . '-' . wp_rand( 100, 999 );
			echo '<label class="om-filter-select" for="' . esc_attr( $id ) . '">';
			echo '<span class="om-filter-select-label">' . esc_html( $facet['title'] ) . '</span>';
			echo '<select id="' . esc_attr( $id ) . '" class="om-filter-nav">';
			if ( $facet['all'] ) {
				printf( '<option value="%s"%s>%s</option>', esc_url( $facet['all']['url'] ), selected( $facet['all']['active'], true, false ), esc_html( $facet['all']['label'] ) );
			}
			foreach ( $facet['items'] as $item ) {
				printf(
					'<option value="%s"%s>%s%s</option>',
					esc_url( $item['url'] ),
					selected( $item['active'], true, false ),
					! empty( $item['depth'] ) ? '&nbsp;&nbsp;&ndash; ' : '',
					esc_html( $item['label'] )
				);
			}
			echo '</select></label>';
		}
		echo '</div>';
	}

	/**
	 * Filters as a sidebar. A <details> element holds them so that on small
	 * screens they collapse behind a "Filters" button (the script opens it
	 * on wide screens); without JavaScript it simply stays open.
	 */
	private function render_sidebar( $facets, $chips, $clear_url, $title ) {
		$title = '' !== trim( (string) $title ) ? $title : __( 'Filters', 'om-catalog' );
		echo '<aside class="om-filter-sidebar">';
		echo '<details class="om-filter-panel" open>';
		echo '<summary class="om-filter-toggle"><span class="om-filter-toggle-icon" aria-hidden="true"></span>' . esc_html( $title );
		if ( $chips ) {
			echo ' <span class="om-filter-count">' . esc_html( count( $chips ) ) . '</span>';
		}
		echo '</summary><div class="om-filter-panel-body">';
		echo '<div class="om-filter-panel-head"><span class="om-filter-panel-title">' . esc_html( $title ) . '</span>';
		if ( $chips ) {
			echo '<a class="om-clear-filters" href="' . esc_url( $clear_url ) . '">' . esc_html__( 'Clear all', 'om-catalog' ) . '</a>';
		}
		// Phones (modern design): the panel is a bottom sheet with a close
		// button; the head row carries it.
		echo '<button type="button" class="om-filter-close" aria-label="' . esc_attr__( 'Close filters', 'om-catalog' ) . '">&times;</button>';
		echo '</div>';

		foreach ( $facets as $facet ) {
			echo '<div class="om-filter-group om-filter-group--' . esc_attr( $facet['key'] ) . '">';
			// Long lists show the first few options plus "Show all".
			$collapsible = count( $facet['items'] ) > 8;
			echo '<p class="om-filter-heading">' . esc_html( $facet['title'] ) . '</p><ul class="om-filter-list' . ( $collapsible ? ' om-filter-list--collapsible' : '' ) . '">';
			if ( $facet['all'] ) {
				$this->sidebar_link( $facet['all'] );
			}
			foreach ( $facet['items'] as $i => $item ) {
				$this->sidebar_link( $item, $collapsible && $i >= 6 && ! $item['active'] );
			}
			if ( $collapsible ) {
				/* translators: %d: number of options. */
				echo '<li class="om-filter-more"><button type="button" class="om-filter-more-btn">' . esc_html( sprintf( __( 'Show all (%d)', 'om-catalog' ), count( $facet['items'] ) ) ) . '</button></li>';
			}
			echo '</ul></div>';
		}
		echo '<div class="om-filter-sheet-foot"><button type="button" class="om-filter-done">' . esc_html__( 'Show results', 'om-catalog' ) . '</button></div>';
		echo '</div></details></aside>';
	}

	private function sidebar_link( $item, $extra = false ) {
		$classes = 'om-filter-link' . ( $item['active'] ? ' is-active' : '' ) . ( ! empty( $item['depth'] ) ? ' is-sub' : '' ) . ( ! empty( $item['swatch'] ) ? ' has-swatch' : '' );
		$swatch  = ! empty( $item['swatch'] ) ? '<span class="om-swatch om-swatch--' . esc_attr( $item['swatch'] ) . '" aria-hidden="true"></span>' : '';
		printf(
			'<li%s><a class="%s" href="%s"%s>%s<span class="om-filter-link-text">%s</span></a></li>',
			$extra ? ' class="om-more-item"' : '',
			esc_attr( $classes ),
			esc_url( $item['url'] ),
			$item['active'] ? ' aria-current="true"' : '',
			$swatch, // phpcs:ignore WordPress.Security.EscapeOutput -- built from esc_attr above.
			esc_html( $item['label'] )
		);
	}

	/**
	 * Search box: a real GET form (works without JavaScript) that the
	 * script upgrades with as-you-type suggestions and in-place results.
	 * Submitting a search starts fresh: filters are cleared, the line and
	 * sort order are kept.
	 */
	private function render_search( $atts, $state, $base_url, $multi, $active_line ) {
		$action = strtok( $base_url, '?' );
		$query  = array();
		parse_str( (string) wp_parse_url( $base_url, PHP_URL_QUERY ), $query );
		$placeholder = '' !== trim( (string) $atts['search_placeholder'] ) ? $atts['search_placeholder'] : __( 'Search by name or style number', 'om-catalog' );
		$input_id    = 'om-q-' . wp_rand( 1000, 9999 );
		?>
		<form class="om-search" role="search" action="<?php echo esc_url( $action ); ?>" method="get" data-om-line="<?php echo esc_attr( $active_line ); ?>">
			<?php foreach ( $query as $key => $value ) : ?>
				<?php if ( is_scalar( $value ) ) : ?>
					<input type="hidden" name="<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $value ); ?>" />
				<?php endif; ?>
			<?php endforeach; ?>
			<?php if ( $multi ) : ?>
				<input type="hidden" name="om_line" value="<?php echo esc_attr( $active_line ); ?>" />
			<?php endif; ?>
			<?php if ( '' !== $state['sort'] ) : ?>
				<input type="hidden" name="om_sort" value="<?php echo esc_attr( $state['sort'] ); ?>" />
			<?php endif; ?>
			<label class="screen-reader-text" for="<?php echo esc_attr( $input_id ); ?>"><?php esc_html_e( 'Search the catalog', 'om-catalog' ); ?></label>
			<span class="om-search-icon" aria-hidden="true"></span>
			<input id="<?php echo esc_attr( $input_id ); ?>" class="om-search-input" type="search" name="om_q" value="<?php echo esc_attr( $state['q'] ); ?>" placeholder="<?php echo esc_attr( $placeholder ); ?>" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="<?php echo esc_attr( $input_id ); ?>-list" enterkeyhint="search" />
			<button class="om-search-submit" type="submit"><?php esc_html_e( 'Search', 'om-catalog' ); ?></button>
			<ul class="om-suggest" id="<?php echo esc_attr( $input_id ); ?>-list" role="listbox" hidden></ul>
		</form>
		<?php
	}

	/**
	 * A card's badges: the admin's own, "Popular" (most viewed here),
	 * "New" and the centre shape. With badge links on, the ones that match
	 * a filter or sort this grid offers link to it (Oval -> shape filter,
	 * Popular -> Most viewed, New -> Newest).
	 *
	 * @return array[] [ label, url ] ('' url = plain badge).
	 */
	private function card_badges( $product, $atts, $state, $url, $line ) {
		$labels = om_card_badges( $product, (string) $atts['badges'], (int) $atts['badge_new_days'], 'yes' === $atts['badge_shape'] );
		$links  = 'yes' === $atts['badge_links'];
		$style  = strtoupper( (string) ( $product['style_number'] ?? '' ) );
		$out    = array();
		if ( 'yes' === $atts['badge_popular'] && in_array( $style, OM_Engage::popular( $line ), true ) ) {
			$out[] = array( __( 'Popular', 'om-catalog' ), $links && 'popular' !== $state['sort'] ? $url( array( 'sort' => 'popular', 'q' => $state['q'] ) ) : '' );
		}
		$shape = '';
		foreach ( (array) ( $product['stone_breakdown'] ?? array() ) as $stone ) {
			if ( ! empty( $stone['shape'] ) && 1 === (int) ( $stone['quantity'] ?? 0 ) ) {
				$shape = (string) $stone['shape'];
				break;
			}
		}
		foreach ( $labels as $label ) {
			$link = '';
			if ( $links && '' !== $shape && $label === $shape && 'yes' === $atts['filter_shapes'] && $state['shape'] !== $shape ) {
				$link = $url( array( 'shape' => $shape ) );
			} elseif ( $links && __( 'New', 'om-catalog' ) === $label && 'newest' !== $state['sort'] ) {
				$link = $url( array( 'sort' => 'newest', 'q' => $state['q'] ) );
			}
			$out[] = array( $label, $link );
		}
		return array_slice( $out, 0, 3 );
	}

	/**
	 * Nothing matches: a designed empty state — what happened, one-click
	 * ways out (clear everything, or drop a single filter) and popular
	 * searches to try instead.
	 */
	private function render_empty( $atts, $state, $chips, $clear_url, $url ) {
		$searching = '' !== $state['q'];
		echo '<div class="om-empty-state om-empty" role="status">';
		echo '<span class="om-empty-icon" aria-hidden="true"></span>';
		echo '<h3 class="om-empty-title">' . esc_html(
			$searching
				/* translators: %s: search words. */
				? sprintf( __( 'Nothing found for "%s"', 'om-catalog' ), $state['q'] )
				: __( 'No designs match these filters', 'om-catalog' )
		) . '</h3>';
		echo '<p class="om-empty-text">' . esc_html(
			$searching
				? __( 'Check the spelling, try fewer words, or search by style number.', 'om-catalog' )
				: __( 'Try removing a filter, or start again with everything.', 'om-catalog' )
		) . '</p>';

		// A multi-line block: the search may match in another line.
		$others = array();
		if ( $searching ) {
			$block = array_filter( array_map( 'sanitize_title', explode( ',', (string) ( ! empty( $atts['lines'] ) ? $atts['lines'] : ( $atts['line'] ?? '' ) ) ) ) );
			$block = array_values( array_diff( $block, array( $state['line'] ) ) );
			if ( $block ) {
				$found  = OM_Search::search_lines( $block, $state['q'], 0 );
				$labels = self::line_labels();
				foreach ( $found['groups'] as $group ) {
					$others[] = array(
						'label' => ( $labels[ $group['line'] ] ?? ucwords( str_replace( '-', ' ', $group['line'] ) ) ) . ' (' . number_format_i18n( $group['total'] ) . ')',
						'url'   => $url( array( 'line' => $group['line'], 'q' => $state['q'], 'style' => '', 'shape' => '', 'metal' => '' ) ),
					);
				}
			}
		}
		if ( $others ) {
			echo '<div class="om-empty-popular om-empty-elsewhere"><span class="om-empty-popular-label">' . esc_html__( 'Found in', 'om-catalog' ) . '</span>';
			foreach ( $others as $other ) {
				echo '<a class="om-chip om-chip--ghost" href="' . esc_url( $other['url'] ) . '">' . esc_html( $other['label'] ) . '</a>';
			}
			echo '</div>';
		}

		echo '<div class="om-empty-actions">';
		if ( $chips || $searching ) {
			echo '<a class="om-btn om-btn--solid om-clear-filters-btn" href="' . esc_url( $clear_url ) . '">' . esc_html( $searching && count( $chips ) <= 1 ? __( 'Clear search', 'om-catalog' ) : __( 'Clear all filters', 'om-catalog' ) ) . '</a>';
		}
		// With several filters, dropping just one is often enough.
		if ( count( $chips ) > 1 ) {
			foreach ( $chips as $chip ) {
				/* translators: %s: filter name. */
				printf( '<a class="om-chip" href="%s">%s<span aria-hidden="true">&times;</span></a>', esc_url( $chip['url'] ), esc_html( sprintf( __( 'Without %s', 'om-catalog' ), $chip['label'] ) ) );
			}
		}
		echo '</div>';

		$popular = 'yes' === $atts['show_search'] ? om_popular_searches() : array();
		$popular = array_values( array_filter( $popular, static function ( $term ) use ( $state ) { return 0 !== strcasecmp( $term, $state['q'] ); } ) );
		if ( $popular ) {
			echo '<div class="om-empty-popular"><span class="om-empty-popular-label">' . esc_html__( 'Popular searches', 'om-catalog' ) . '</span>';
			foreach ( array_slice( $popular, 0, 6 ) as $term ) {
				echo '<a class="om-chip om-chip--ghost" href="' . esc_url( $url( array( 'q' => $term, 'style' => '', 'shape' => '', 'metal' => '' ) ) ) . '">' . esc_html( $term ) . '</a>';
			}
			echo '</div>';
		}
		echo '</div>';
	}

	/** Result toolbar, grid and pagination (or an empty/error state). */
	private function render_results( $data, $atts, $paged, $per_page, $columns, $layout, $active_line, $chips, $clear_url, $state, $url, $base_url, $multi ) {
		if ( 'yes' === $atts['show_search'] ) {
			$this->render_search( $atts, $state, $base_url, $multi, $active_line );
		}

		if ( is_wp_error( $data ) ) {
			// Designed error state with a retry (re-renders just this block).
			echo '<div class="om-empty-state om-error" role="alert">';
			echo '<span class="om-empty-icon om-empty-icon--error" aria-hidden="true"></span>';
			echo '<h3 class="om-empty-title">' . esc_html__( 'The catalog didn\'t load', 'om-catalog' ) . '</h3>';
			echo '<p class="om-empty-text">' . esc_html( om_public_error_message( $data ) ) . '</p>';
			echo '<div class="om-empty-actions"><a class="om-btn om-btn--solid om-retry" href="' . esc_url( $url( array( 'q' => $state['q'], 'page' => $paged ) ) ) . '">' . esc_html__( 'Try again', 'om-catalog' ) . '</a></div>';
			echo '</div>';
			return;
		}

		$total    = isset( $data['total_count'] ) ? (int) $data['total_count'] : count( (array) ( $data['products'] ?? array() ) );
		$products = ! empty( $data['products'] ) ? $data['products'] : array();

		// Toolbar: result count + active-filter chips on the left, sort on
		// the right.
		$show_count = 'yes' === $atts['show_count'] && $total > 0 && $products;
		$show_sort  = 'yes' === $atts['show_sort'] && '' === $state['q'] && $products;
		if ( $show_count || $chips || $show_sort ) {
			echo '<div class="om-catalog-toolbar"><div class="om-toolbar-start">';
			if ( $show_count ) {
				$first = $this->window > 1 || in_array( $atts['pagination_style'], array( 'loadmore', 'infinite' ), true ) ? 1 : ( $paged - 1 ) * $per_page + 1;
				$last  = 1 === $first && $paged > 1 ? min( $total, $paged * $per_page ) : min( $total, $first + count( $products ) - 1 );
				if ( '' !== $state['q'] ) {
					/* translators: 1: number of results, 2: search words. */
					$count_text = sprintf( _n( '%1$s result for "%2$s"', '%1$s results for "%2$s"', $total, 'om-catalog' ), number_format_i18n( $total ), $state['q'] );
				} elseif ( $total > $per_page ) {
					/* translators: 1: first item, 2: last item, 3: total. */
					$count_text = sprintf( __( 'Showing %1$s–%2$s of %3$s', 'om-catalog' ), number_format_i18n( $first ), number_format_i18n( $last ), number_format_i18n( $total ) );
				} else {
					/* translators: %s: number of designs. */
					$count_text = sprintf( _n( '%s design', '%s designs', $total, 'om-catalog' ), number_format_i18n( $total ) );
				}
				echo '<p class="om-result-count" aria-live="polite">' . esc_html( $count_text ) . '</p>';
			}
			if ( $chips ) {
				echo '<div class="om-active-filters">';
				foreach ( $chips as $chip ) {
					/* translators: %s: filter name. */
					printf( '<a class="om-chip" href="%s" aria-label="%s">%s<span aria-hidden="true">&times;</span></a>', esc_url( $chip['url'] ), esc_attr( sprintf( __( 'Remove filter: %s', 'om-catalog' ), $chip['label'] ) ), esc_html( $chip['label'] ) );
				}
				if ( count( $chips ) > 1 ) {
					echo '<a class="om-clear-filters" href="' . esc_url( $clear_url ) . '">' . esc_html__( 'Clear all', 'om-catalog' ) . '</a>';
				}
				echo '</div>';
			}
			echo '</div>';
			if ( $show_sort ) {
				$labels = array(
					''       => __( 'Featured', 'om-catalog' ),
					'newest' => __( 'Newest', 'om-catalog' ),
					'popular' => __( 'Most viewed', 'om-catalog' ),
					'style'  => __( 'Style number', 'om-catalog' ),
				);
				$sort_id = 'om-sort-' . wp_rand( 1000, 9999 );
				echo '<label class="om-sort" for="' . esc_attr( $sort_id ) . '"><span>' . esc_html__( 'Sort by', 'om-catalog' ) . '</span>';
				echo '<select id="' . esc_attr( $sort_id ) . '" class="om-filter-nav om-sort-select">';
				foreach ( $labels as $key => $label ) {
					printf( '<option value="%s"%s>%s</option>', esc_url( $url( array( 'sort' => $key ) ) ), selected( $state['sort'], $key, false ), esc_html( $label ) );
				}
				echo '</select></label>';
			}
			echo '</div>';
		}

		if ( empty( $products ) ) {
			$this->render_empty( $atts, $state, $chips, $clear_url, $url );
			return;
		}

		// Count visitor searches that found something, for "Popular
		// searches" (first page only, never the background refresh).
		if ( '' !== $state['q'] && 1 === (int) $paged && ! wp_doing_cron() && ( wp_doing_ajax() || ! is_admin() ) ) {
			om_record_search( $state['q'] );
		}

		$card_query = is_array( $atts['card_query'] ) ? $atts['card_query'] : wp_parse_args( (string) $atts['card_query'] );
		$card_query = array_map( 'rawurlencode', array_filter( array_map( 'strval', $card_query ), 'strlen' ) );
		$prices     = 'yes' === $atts['show_prices'] && om_markup_is_configured();

		$style_attr = 'no' === $atts['inline_columns'] ? '' : ' style="--om-columns: ' . esc_attr( $columns ) . ';"';
		echo '<div class="om-catalog-grid om-layout-' . esc_attr( $layout ) . '"' . $style_attr . ( $prices ? ' data-om-prices="' . esc_attr( $active_line ) . '"' : '' ) . ( 'yes' === $atts['quick_view'] ? om_quick_view_attr( $atts ) : '' ) . '>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built from an int / escaped in om_quick_view_attr().
		$card_opts = om_card_options( $atts );
		foreach ( $products as $product ) {
			$style_number = (string) ( $product['style_number'] ?? '' );
			if ( '' === $style_number ) {
				continue;
			}
			$link = om_product_url( $active_line, $style_number );
			if ( $card_query ) {
				$link = add_query_arg( $card_query, $link );
			}
			// Filtered to one metal colour: open the product in it too.
			if ( '' !== (string) $state['metal'] && false === strpos( (string) $state['metal'], ',' ) ) {
				$link = add_query_arg( 'om_color', rawurlencode( (string) $state['metal'] ), $link );
			}
			echo om_render_card( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
				$product,
				$active_line,
				array(
					'link'   => $link,
					'prices' => $prices,
					'badges' => $this->card_badges( $product, $atts, $state, $url, $active_line ),
					// Filtered by metal colour: show photos in that colour.
					'color'  => (string) $state['metal'],
				) + $card_opts
			);
		}
		echo '</div>';

		$total_pages = (int) ceil( $total / $per_page );
		if ( $total_pages > 1 && 'classic' !== $atts['design'] ) {
			// "You've viewed 9 of 40" with a progress bar.
			$seen = min( $total, $paged * $per_page );
			printf(
				'<div class="om-progress"><p class="om-progress-text">%s</p><span class="om-progress-bar" aria-hidden="true"><span style="width:%s%%"></span></span></div>',
				/* translators: 1: designs seen so far, 2: total. */
				esc_html( sprintf( __( "You've viewed %1\$s of %2\$s designs", 'om-catalog' ), number_format_i18n( $seen ), number_format_i18n( $total ) ) ),
				esc_attr( round( 100 * $seen / max( 1, $total ), 1 ) )
			);
		}
		if ( in_array( $atts['pagination_style'], array( 'loadmore', 'infinite' ), true ) ) {
			// A real link, so it works without JavaScript too; the script
			// appends the next page instead of navigating.
			if ( $paged < $total_pages ) {
				printf(
					'<div class="om-load-more%s"><a class="om-load-more-btn" href="%s" data-om-upto="%s">%s</a></div>',
					'infinite' === $atts['pagination_style'] ? ' is-infinite' : '',
					esc_url( $url( array( 'page' => $paged + 1, 'q' => $state['q'] ) ) ),
					esc_url( add_query_arg( 'om_upto', $paged + 1, $url( array( 'page' => 1, 'q' => $state['q'] ) ) ) ),
					/* translators: %s: number of designs. */
					esc_html( sprintf( __( 'Show %s more', 'om-catalog' ), number_format_i18n( min( $per_page, $total - $paged * $per_page ) ) ) )
				);
			}
			return;
		}
		if ( $total_pages > 1 ) {
			echo '<nav class="om-pagination" aria-label="' . esc_attr__( 'Pages', 'om-catalog' ) . '">';
			echo paginate_links( // phpcs:ignore WordPress.Security.EscapeOutput -- core function, escaped internally.
				array(
					'base'      => str_replace( '999999999', '%#%', $url( array( 'page' => 999999999, 'q' => $state['q'] ) ) ),
					'format'    => '',
					'total'     => $total_pages,
					'current'   => min( $paged, $total_pages ),
					'mid_size'  => 1,
					'prev_text' => '&lsaquo;',
					'next_text' => '&rsaquo;',
				)
			);
			echo '</nav>';
		}
	}

	/**
	 * One listing page, from cache or the API. Shared with the background
	 * refresh (OM_Warmer), which re-fetches the pages visitors actually
	 * use before they expire, so the cache keys must match exactly.
	 *
	 * @param string $line  Product line.
	 * @param array  $args  API query incl. limit/offset (empty values allowed).
	 * @param bool   $fresh Skip the cache (background refresh).
	 * @return array|WP_Error
	 */
	public static function fetch_listing( $line, $args, $fresh = false ) {
		$cache_key = 'om_listing_' . md5( $line . '|' . wp_json_encode( $args ) );
		$data      = $fresh ? false : get_transient( $cache_key );
		if ( false === $data ) {
			$data = OM_API_Client::get_products( $line, array_filter( $args ) );
			if ( ! is_wp_error( $data ) ) {
				$ttl = OM_Warmer::listing_ttl();
				set_transient( $cache_key, $data, $ttl );
				if ( isset( $data['total_count'] ) ) {
					$without_offset = $args;
					unset( $without_offset['offset'] );
					set_transient( 'om_total_' . md5( $line . '|' . wp_json_encode( $without_offset ) ), (int) $data['total_count'], $ttl );
				}
			}
		}
		if ( ! $fresh ) {
			OM_Warmer::remember( $line, $args );
		}
		return $data;
	}
}
