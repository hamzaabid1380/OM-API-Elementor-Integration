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

	/** Where the visitor filters render. */
	const FILTER_POSITIONS = array( 'top', 'dropdown', 'left', 'right' );

	/** Center-stone shapes offered by the visitor "Shape" filter. */
	const DEFAULT_SHAPES = array( 'Round', 'Oval', 'Cushion', 'Princess', 'Emerald', 'Pear', 'Marquise', 'Radiant', 'Asscher', 'Heart' );

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
			remove_query_arg( array( 'om_style', 'om_page', 'om_line', 'om_shape', 'om_metal' ) )
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
		);

		$style_filter = '' !== $state['style'] ? $state['style'] : $admin_base;
		$shape_filter = '' !== $state['shape'] ? $state['shape'] : self::normalize_style_list( $atts['shape'] );

		$columns  = max( 1, min( 5, (int) $atts['columns'] ) );
		$per_page = max( 1, min( self::MAX_PER_PAGE, (int) $atts['per_page'] ) );
		$paged    = max( 1, (int) $request['page'] );
		$base_url = $request['base_url'];
		$multi    = count( $lines ) > 1;

		$url = function ( $changes = array() ) use ( $state, $base_url, $multi ) {
			$s    = array_merge( $state, array( 'page' => 1 ), $changes );
			$args = array();
			if ( $multi ) {
				$args['om_line'] = $s['line'];
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
			)
		);

		// Remember each query's total so out-of-range pages (or anyone
		// walking om_page upwards) don't cost an API call each.
		$total_key     = 'om_total_' . md5( $active_line . '|' . wp_json_encode( $args ) );
		$known_total   = get_transient( $total_key );
		$cache_minutes = max( 1, (int) get_option( 'om_listing_cache_minutes', 15 ) );
		$out_of_range  = false !== $known_total && $paged > max( 1, (int) ceil( (int) $known_total / $per_page ) );

		if ( $out_of_range ) {
			$data = array(
				'products'    => array(),
				'total_count' => (int) $known_total,
			);
		} else {
			$args['offset'] = ( $paged - 1 ) * $per_page;
			$cache_key      = 'om_listing_' . md5( $active_line . '|' . wp_json_encode( $args ) );
			$data           = get_transient( $cache_key );
			if ( false === $data ) {
				$data = OM_API_Client::get_products( $active_line, array_filter( $args ) );
				if ( ! is_wp_error( $data ) ) {
					set_transient( $cache_key, $data, $cache_minutes * MINUTE_IN_SECONDS );
					if ( isset( $data['total_count'] ) ) {
						set_transient( $total_key, (int) $data['total_count'], $cache_minutes * MINUTE_IN_SECONDS );
					}
				}
			}
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

		$classes = array( 'om-catalog-wrap', 'om-filterpos-' . $filter_position );
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

		$this->render_results( $data, $atts, $paged, $per_page, $columns, $layout, $active_line, $chips, $clear_url, $has_side, $url );

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

	/** Result toolbar, grid and pagination (or an empty/error state). */
	private function render_results( $data, $atts, $paged, $per_page, $columns, $layout, $active_line, $chips, $clear_url, $has_side, $url ) {
		if ( is_wp_error( $data ) ) {
			echo '<div class="om-error"><p>' . esc_html( om_public_error_message( $data ) ) . '</p></div>';
			return;
		}

		$total    = isset( $data['total_count'] ) ? (int) $data['total_count'] : count( (array) ( $data['products'] ?? array() ) );
		$products = ! empty( $data['products'] ) ? $data['products'] : array();

		// Toolbar: result count, plus active-filter chips when there's no
		// sidebar to show them.
		$show_count = 'yes' === $atts['show_count'] && $total > 0 && $products;
		if ( $show_count || ( $chips && ! $has_side ) ) {
			echo '<div class="om-catalog-toolbar">';
			if ( $show_count ) {
				$first = ( $paged - 1 ) * $per_page + 1;
				$last  = min( $total, $first + count( $products ) - 1 );
				echo '<p class="om-result-count">' . esc_html(
					$total > $per_page
						/* translators: 1: first item, 2: last item, 3: total. */
						? sprintf( __( 'Showing %1$s–%2$s of %3$s', 'om-catalog' ), number_format_i18n( $first ), number_format_i18n( $last ), number_format_i18n( $total ) )
						/* translators: %s: number of designs. */
						: sprintf( _n( '%s design', '%s designs', $total, 'om-catalog' ), number_format_i18n( $total ) )
				) . '</p>';
			}
			if ( $chips && ! $has_side ) {
				echo '<div class="om-active-filters">';
				foreach ( $chips as $chip ) {
					/* translators: %s: filter name. */
					printf( '<a class="om-chip" href="%s" aria-label="%s">%s<span aria-hidden="true">&times;</span></a>', esc_url( $chip['url'] ), esc_attr( sprintf( __( 'Remove filter: %s', 'om-catalog' ), $chip['label'] ) ), esc_html( $chip['label'] ) );
				}
				echo '<a class="om-clear-filters" href="' . esc_url( $clear_url ) . '">' . esc_html__( 'Clear all', 'om-catalog' ) . '</a>';
				echo '</div>';
			}
			echo '</div>';
		}

		if ( empty( $products ) ) {
			echo '<div class="om-empty"><p>' . esc_html__( 'No designs match these filters.', 'om-catalog' ) . '</p>';
			if ( $chips ) {
				echo '<a class="om-clear-filters" href="' . esc_url( $clear_url ) . '">' . esc_html__( 'Clear all filters', 'om-catalog' ) . '</a>';
			}
			echo '</div>';
			return;
		}

		$style_attr = 'no' === $atts['inline_columns'] ? '' : ' style="--om-columns: ' . esc_attr( $columns ) . ';"';
		echo '<div class="om-catalog-grid om-layout-' . esc_attr( $layout ) . '"' . $style_attr . '>'; // phpcs:ignore WordPress.Security.EscapeOutput -- built from an int.
		foreach ( $products as $product ) {
			$style_number = (string) ( $product['style_number'] ?? '' );
			if ( '' === $style_number ) {
				continue;
			}
			$title = (string) ( $product['title'] ?? $style_number );
			$image = ! empty( $product['images'][0] ) ? om_image_url( $product['images'][0] ) : '';
			?>
			<a class="om-card" href="<?php echo esc_url( om_product_url( $active_line, $style_number ) ); ?>">
				<div class="om-card-image">
					<?php if ( $image ) : ?>
						<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $title ); ?>" loading="lazy" decoding="async" />
					<?php endif; ?>
				</div>
				<div class="om-card-body">
					<h3 class="om-card-title"><?php echo esc_html( $title ); ?></h3>
					<?php if ( ! empty( $product['variant_name'] ) ) : ?>
						<p class="om-card-variant"><?php echo esc_html( $product['variant_name'] ); ?></p>
					<?php endif; ?>
				</div>
			</a>
			<?php
		}
		echo '</div>';

		$total_pages = (int) ceil( $total / $per_page );
		if ( $total_pages > 1 ) {
			echo '<nav class="om-pagination" aria-label="' . esc_attr__( 'Pages', 'om-catalog' ) . '">';
			echo paginate_links( // phpcs:ignore WordPress.Security.EscapeOutput -- core function, escaped internally.
				array(
					'base'      => str_replace( '999999999', '%#%', $url( array( 'page' => 999999999 ) ) ),
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
}
