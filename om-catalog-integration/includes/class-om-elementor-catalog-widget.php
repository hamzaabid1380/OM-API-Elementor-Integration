<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;

/**
 * "OM Product Catalog" Elementor widget.
 *
 * Content tab picks what to show (product line, filters, count); the Style
 * tab exposes every visual knob — grid, cards, image, title, meta line and
 * pagination — with live preview via {{WRAPPER}} selectors. Anything left
 * untouched falls back to the plugin's site-wide defaults from
 * Settings > OM Catalog, so per-widget styling is opt-in.
 */
class OM_Elementor_Catalog_Widget extends Widget_Base {

	use OM_Elementor_Card_Controls;

	public function get_name() {
		return 'om_catalog_widget';
	}

	public function get_title() {
		return __( 'OM Product Catalog', 'om-catalog' );
	}

	public function get_icon() {
		return 'eicon-gallery-grid';
	}

	public function get_categories() {
		return array( 'general' );
	}

	public function get_keywords() {
		return array( 'jewelry', 'rings', 'catalog', 'products', 'overnight', 'mountings' );
	}

	/** Load the plugin stylesheet/script inside the Elementor editor preview too. */
	public function get_style_depends() {
		return array( 'om-catalog-css', 'om-catalog-fonts' );
	}

	public function get_script_depends() {
		return array( 'om-catalog-js' );
	}

	/**
	 * Product line codes and labels, shared by the line select and the
	 * per-line collection dropdowns. OM's own list when available.
	 */
	private function product_lines() {
		return OM_Shortcodes::line_labels( self::is_editor_context() );
	}

	/**
	 * Elementor builds a widget's controls on the front end too, but the
	 * dropdown options are only needed in the editor. Only fetch them from
	 * the API in wp-admin (where the editor lives), so a visitor's page view
	 * never waits on taxonomy calls.
	 */
	private static function is_editor_context() {
		return is_admin();
	}

	/** Settings key of the collection dropdown belonging to one product line. */
	public static function collection_control_key( $line ) {
		return 'collections_' . str_replace( '-', '_', $line );
	}

	protected function register_controls() {

		/* ---------- Content ---------- */

		$this->start_controls_section(
			'section_content',
			array(
				'label' => __( 'Catalog', 'om-catalog' ),
			)
		);

		$this->add_control(
			'product_line',
			array(
				'label'   => __( 'Product Line', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'engagement-rings',
				'options' => $this->product_lines(),
			)
		);

		$this->add_control(
			'extra_lines',
			array(
				'label'       => __( 'Additional product lines (optional)', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT2,
				'multiple'    => true,
				'options'     => $this->product_lines(),
				// The explicit array default matters: other controls'
				// "contains" conditions check this value, and without it the
				// value is an empty STRING — older Elementor feeds that
				// straight into in_array(), fatal on PHP 8.
				'default'     => array(),
				'label_block' => true,
				'description' => __( 'Show more lines on this same page. Visitors get a line switcher above the grid; each line has its own Collections picker below.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'layout',
			array(
				'label'       => __( 'Layout', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'classic',
				'options'     => array(
					'classic'   => __( 'Classic (centered under image)', 'om-catalog' ),
					'editorial' => __( 'Editorial (left-aligned)', 'om-catalog' ),
					'boxed'     => __( 'Boxed (framed card)', 'om-catalog' ),
					'overlay'   => __( 'Overlay (title on image)', 'om-catalog' ),
				),
				'description' => __( 'The card design. Every layout stays editable via the Style tab.', 'om-catalog' ),
			)
		);

		// One collections dropdown per product line, populated from the live
		// taxonomy (cached 12h) and shown only for the selected line. Options
		// are a FLAT map — Elementor's select2 control renders grouped-option
		// arrays as "[object Object]" — with the collection name folded into
		// the label instead. Always registered, even with empty options when
		// the API is unreachable, so a saved selection is never dropped on
		// the front end.
		foreach ( $this->product_lines() as $line_code => $line_label ) {
			$groups  = OM_API_Client::get_line_collections( $line_code, self::is_editor_context() );
			$options = array();
			$prefix  = count( $groups ) > 1;
			foreach ( $groups as $group ) {
				foreach ( $group['options'] as $value => $label ) {
					$options[ $value ] = $prefix ? $group['label'] . ': ' . $label : $label;
				}
			}

			$this->add_control(
				self::collection_control_key( $line_code ),
				array(
					/* translators: %s: product line name. */
					'label'       => sprintf( __( 'Collections: %s', 'om-catalog' ), $line_label ),
					'type'        => Controls_Manager::SELECT2,
					'multiple'    => true,
					'options'     => $options,
					'default'     => array(),
					'label_block' => true,
					'conditions'  => array(
						'relation' => 'or',
						'terms'    => array(
							array(
								'name'     => 'product_line',
								'operator' => '==',
								'value'    => $line_code,
							),
							array(
								'name'     => 'extra_lines',
								'operator' => 'contains',
								'value'    => $line_code,
							),
						),
					),
					'description' => empty( $options )
						? __( 'Collection list unavailable (check API credentials in Settings > OM Catalog). The custom filter below still works.', 'om-catalog' )
						: __( 'Pick one or more to show only those collections. Leave empty to show ALL.', 'om-catalog' ),
				)
			);
		}

		$this->add_control(
			'visitor_filters_heading',
			array(
				'label'     => __( 'Visitor filters', 'om-catalog' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'show_filter_bar',
			array(
				'label'       => __( 'Collection filter', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => __( "Lets shoppers filter by the line's collections and categories. With additional product lines, the line switcher shows regardless. Filtering updates in place, no page reload.", 'om-catalog' ),
			)
		);

		$this->add_control(
			'filter_shapes',
			array(
				'label'   => __( 'Shape filter', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => '',
			)
		);

		$this->add_control(
			'shape_options',
			array(
				'label'       => __( 'Shapes offered', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => 'Round, Oval, Cushion, Princess, Emerald, Pear, Marquise, Radiant, Asscher, Heart',
				'description' => __( 'Comma-separated. Leave blank for the standard list.', 'om-catalog' ),
				'condition'   => array( 'filter_shapes' => 'yes' ),
			)
		);

		$this->add_control(
			'filter_metals',
			array(
				'label'       => __( 'Metal colour filter', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => __( 'White, Yellow and Rose.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'filter_position',
			array(
				'label'   => __( 'Filter position', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'top',
				'options' => array(
					'top'      => __( 'Top bar (above the grid)', 'om-catalog' ),
					'dropdown' => __( 'Dropdowns (compact, above the grid)', 'om-catalog' ),
					'left'     => __( 'Sidebar — left', 'om-catalog' ),
					'right'    => __( 'Sidebar — right', 'om-catalog' ),
				),
				'description' => __( 'On phones the sidebar folds into a "Filters" button above the grid.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'filter_style',
			array(
				'label'     => __( 'Top bar design', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'pills',
				'options'   => array(
					'pills'     => __( 'Pills (outlined, default)', 'om-catalog' ),
					'underline' => __( 'Underline (quiet text tabs)', 'om-catalog' ),
					'buttons'   => __( 'Buttons (soft filled)', 'om-catalog' ),
					'minimal'   => __( 'Minimal (plain text)', 'om-catalog' ),
				),
				'condition' => array( 'filter_position' => 'top' ),
			)
		);

		$this->add_control(
			'filters_title',
			array(
				'label'       => __( 'Sidebar title', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Filters', 'om-catalog' ),
				'condition'   => array( 'filter_position' => array( 'left', 'right' ) ),
			)
		);

		$this->add_control(
			'show_search',
			array(
				'label'       => __( 'Search box', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'separator'   => 'before',
				'description' => __( 'Searches names and style numbers of the active line, with suggestions as you type.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'search_placeholder',
			array(
				'label'       => __( 'Search placeholder', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Search by name or style number', 'om-catalog' ),
				'condition'   => array( 'show_search' => 'yes' ),
			)
		);

		$this->add_control(
			'search_scope',
			array(
				'label'       => __( 'Suggestions search', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'line',
				'options'     => array(
					'line'  => __( 'The line being browsed', 'om-catalog' ),
					'block' => __( 'All lines in this widget (grouped)', 'om-catalog' ),
					'all'   => __( 'Every product line (grouped)', 'om-catalog' ),
				),
				'description' => __( 'Grouped suggestions show each line with its best matches and a "see all" link.', 'om-catalog' ),
				'condition'   => array( 'show_search' => 'yes' ),
			)
		);

		$this->add_control(
			'suggest_prices',
			array(
				'label'       => __( 'Prices in search suggestions', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( '"From $X" beside each suggestion, once a markup is set.', 'om-catalog' ),
				'condition'   => array( 'show_search' => 'yes' ),
			)
		);

		$this->add_control(
			'show_sort',
			array(
				'label'   => __( 'Sort dropdown', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'default_sort',
			array(
				'label'   => __( 'Default order', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => '',
				'options' => array(
					''       => __( 'Featured (Overnight Mountings order)', 'om-catalog' ),
					'newest' => __( 'Newest first', 'om-catalog' ),
					'style'  => __( 'Style number', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'show_prices',
			array(
				'label'       => __( '"From $X" price on cards', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => __( 'Starting price in the default configuration, loaded after the page. Only shows once a markup is set.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'badges_heading',
			array(
				'label'     => __( 'Badges', 'om-catalog' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'badges',
			array(
				'label'       => __( 'Custom badges', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 3,
				'placeholder' => "85121-2: Best seller\n84842-2: Staff pick",
				'description' => __( 'One per line: style number, colon, label.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'badge_new_days',
			array(
				'label'       => __( '"New" badge for designs added in the last (days)', 'om-catalog' ),
				'type'        => Controls_Manager::NUMBER,
				'default'     => 0,
				'min'         => 0,
				'max'         => 365,
				'description' => __( '0 = off. Uses the date Overnight Mountings added the design, when it provides one.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'badge_shape',
			array(
				'label'   => __( 'Centre-shape badge (e.g. "Oval")', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => '',
			)
		);

		$this->add_control(
			'show_count',
			array(
				'label'   => __( 'Show result count', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'collection_filter',
			array(
				'label'       => __( 'Custom collection filter (optional)', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'description' => __( 'Free-text "style" values, comma-separated, added on top of the dropdown above.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'set_filter',
			array(
				'label'       => __( 'Set filter (optional)', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'description' => __( 'Second, independent collection filter, e.g. "Prong Set".', 'om-catalog' ),
			)
		);

		$this->add_control(
			'shape_filter',
			array(
				'label'       => __( 'Center-stone shape (optional)', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'description' => __( 'Comma-separated, e.g. "Round,Oval". Leave blank for all shapes.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'in_stock_only',
			array(
				'label'       => __( 'In-stock products only', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => __( 'Only show products Overnight Mountings has sellable stock for.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'curation_heading',
			array(
				'label'     => __( 'Curation', 'om-catalog' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'include_styles',
			array(
				'label'       => __( 'Show ONLY these style numbers', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 3,
				'placeholder' => '85121-2, 84842-2, 51157-E-6X4',
				'description' => __( 'Comma-separated. Turns this widget into a hand-picked showcase — other filters are ignored by the API when exact style numbers are given.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'exclude_styles',
			array(
				'label'       => __( 'Hide these style numbers', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 3,
				'placeholder' => '85121-2, 84842-2',
				'description' => __( 'Comma-separated. These products are removed from the grid after fetching, so a page may show slightly fewer items than "Products per page".', 'om-catalog' ),
			)
		);

		$this->add_control(
			'per_page',
			array(
				'label'       => __( 'Products per page', 'om-catalog' ),
				'type'        => Controls_Manager::NUMBER,
				'default'     => 12,
				'min'         => 1,
				'max'         => 500,
				'description' => __( '500 is the API maximum per page.', 'om-catalog' ),
			)
		);

		$this->add_responsive_control(
			'columns',
			array(
				'label'           => __( 'Columns', 'om-catalog' ),
				'type'            => Controls_Manager::SELECT,
				'options'         => array(
					'1' => '1',
					'2' => '2',
					'3' => '3',
					'4' => '4',
					'5' => '5',
				),
				'default'         => '3',
				'tablet_default'  => '2',
				'mobile_default'  => '2',
				'selectors'       => array(
					'{{WRAPPER}} .om-catalog-grid' => 'grid-template-columns: repeat({{VALUE}}, 1fr);',
				),
			)
		);

		$this->add_control(
			'show_variant',
			array(
				'label'     => __( 'Show carat / variant line', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'selectors' => array(
					'{{WRAPPER}} .om-card-variant' => 'display: {{VALUE}};',
				),
				'selectors_dictionary' => array(
					'yes' => 'block',
					''    => 'none',
				),
			)
		);

		$this->add_control(
			'show_pagination',
			array(
				'label'     => __( 'Show pagination', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'selectors' => array(
					'{{WRAPPER}} .om-pagination' => 'display: {{VALUE}};',
				),
				'selectors_dictionary' => array(
					'yes' => 'flex',
					''    => 'none',
				),
			)
		);

		$this->end_controls_section();

		$this->register_quick_view_content();
		$this->register_card_video_content();

		/* ---------- Style: Grid ---------- */

		$this->start_controls_section(
			'section_style_grid',
			array(
				'label' => __( 'Grid', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_responsive_control(
			'column_gap',
			array(
				'label'      => __( 'Column gap', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 100 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-catalog-grid' => 'column-gap: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'row_gap',
			array(
				'label'      => __( 'Row gap', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 120 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-catalog-grid' => 'row-gap: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'grid_margin',
			array(
				'label'      => __( 'Grid margin', 'om-catalog' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .om-catalog-grid' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: Card ---------- */

		$this->start_controls_section(
			'section_style_card',
			array(
				'label' => __( 'Card', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'card_background',
			array(
				'label'     => __( 'Card background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-card' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'     => 'card_border',
				'selector' => '{{WRAPPER}} .om-card',
			)
		);

		$this->add_responsive_control(
			'card_padding',
			array(
				'label'      => __( 'Card padding', 'om-catalog' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em' ),
				'selectors'  => array(
					'{{WRAPPER}} .om-card' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'card_text_align',
			array(
				'label'     => __( 'Text alignment', 'om-catalog' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'left'   => array( 'title' => __( 'Left', 'om-catalog' ), 'icon' => 'eicon-text-align-left' ),
					'center' => array( 'title' => __( 'Center', 'om-catalog' ), 'icon' => 'eicon-text-align-center' ),
					'right'  => array( 'title' => __( 'Right', 'om-catalog' ), 'icon' => 'eicon-text-align-right' ),
				),
				'default'   => 'center',
				'selectors' => array(
					'{{WRAPPER}} .om-card-body' => 'text-align: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: Image ---------- */

		$this->start_controls_section(
			'section_style_image',
			array(
				'label' => __( 'Image', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'image_ratio',
			array(
				'label'     => __( 'Aspect ratio', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => '',
				'options'   => array(
					''      => __( 'Square (default)', 'om-catalog' ),
					'4/5'   => __( 'Portrait 4:5', 'om-catalog' ),
					'3/4'   => __( 'Portrait 3:4', 'om-catalog' ),
					'4/3'   => __( 'Landscape 4:3', 'om-catalog' ),
				),
				'selectors' => array(
					'{{WRAPPER}} .om-card-image' => 'aspect-ratio: {{VALUE}};',
					'{{WRAPPER}} .om-catalog-grid' => '--om-card-ratio: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'image_background',
			array(
				'label'     => __( 'Image background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-card-image' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'hover_effect',
			array(
				'label'     => __( 'Hover effect', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => '1.045',
				'options'   => array(
					'1.045' => __( 'Slow zoom (default)', 'om-catalog' ),
					'1.09'  => __( 'Stronger zoom', 'om-catalog' ),
					'1'     => __( 'None', 'om-catalog' ),
				),
				'selectors' => array(
					'{{WRAPPER}} .om-card:hover .om-card-image img' => 'transform: scale({{VALUE}});',
				),
			)
		);

		$this->add_responsive_control(
			'image_spacing',
			array(
				'label'      => __( 'Space below image', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-card-image' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: Title ---------- */

		$this->start_controls_section(
			'section_style_title',
			array(
				'label' => __( 'Title', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => __( 'Color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-card-title' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'title_hover_color',
			array(
				'label'     => __( 'Hover color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-card:hover .om-card-title' => 'color: {{VALUE}}; opacity: 1;',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'title_typography',
				'selector' => '{{WRAPPER}} .om-card-title',
			)
		);

		$this->add_responsive_control(
			'title_spacing',
			array(
				'label'      => __( 'Space below title', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-card-title' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: Variant / meta line ---------- */

		$this->start_controls_section(
			'section_style_variant',
			array(
				'label'     => __( 'Carat / Variant Line', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'show_variant' => 'yes' ),
			)
		);

		$this->add_control(
			'variant_color',
			array(
				'label'     => __( 'Color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-card-variant' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'variant_typography',
				'selector' => '{{WRAPPER}} .om-card-variant',
			)
		);

		$this->end_controls_section();

		/* ---------- Style: Filter bar ---------- */

		$this->start_controls_section(
			'section_style_filters',
			array(
				'label' => __( 'Filter Bar', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_responsive_control(
			'filter_align',
			array(
				'label'     => __( 'Alignment', 'om-catalog' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'flex-start' => array( 'title' => __( 'Left', 'om-catalog' ), 'icon' => 'eicon-text-align-left' ),
					'center'     => array( 'title' => __( 'Center', 'om-catalog' ), 'icon' => 'eicon-text-align-center' ),
					'flex-end'   => array( 'title' => __( 'Right', 'om-catalog' ), 'icon' => 'eicon-text-align-right' ),
				),
				'default'   => 'center',
				'selectors' => array(
					'{{WRAPPER}} .om-filter-bar' => 'justify-content: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'filter_typography',
				'selector' => '{{WRAPPER}} .om-filter-pill',
			)
		);

		$this->add_control(
			'filter_color',
			array(
				'label'     => __( 'Text color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-filter-pill' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'filter_hover_color',
			array(
				'label'     => __( 'Hover color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-filter-pill:hover' => 'color: {{VALUE}}; border-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'filter_border_color',
			array(
				'label'     => __( 'Border color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-filter-pill' => 'border-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'filter_active_bg',
			array(
				'label'     => __( 'Active background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-filter-pill.is-active' => 'background-color: {{VALUE}}; border-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'filter_active_color',
			array(
				'label'     => __( 'Active text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-filter-pill.is-active' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'filter_gap',
			array(
				'label'     => __( 'Gap', 'om-catalog' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors' => array(
					'{{WRAPPER}} .om-filter-bar' => 'gap: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'filter_margin',
			array(
				'label'      => __( 'Bar margin', 'om-catalog' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em' ),
				'selectors'  => array(
					'{{WRAPPER}} .om-filter-bar' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: Pagination ---------- */

		/* ---------- Style: Sidebar & dropdown filters ---------- */

		$this->start_controls_section(
			'section_style_sidebar',
			array(
				'label'      => __( 'Sidebar & Dropdown Filters', 'om-catalog' ),
				'tab'        => Controls_Manager::TAB_STYLE,
				'conditions' => array(
					'terms' => array(
						array(
							'name'     => 'filter_position',
							'operator' => 'in',
							'value'    => array( 'left', 'right', 'dropdown' ),
						),
					),
				),
			)
		);

		$this->add_responsive_control(
			'sidebar_width',
			array(
				'label'      => __( 'Sidebar width', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', '%' ),
				'range'      => array(
					'px' => array( 'min' => 160, 'max' => 420 ),
					'%'  => array( 'min' => 15, 'max' => 40 ),
				),
				'selectors'  => array(
					'{{WRAPPER}} .om-catalog-wrap' => '--om-sidebar-width: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array( 'filter_position' => array( 'left', 'right' ) ),
			)
		);

		$this->add_responsive_control(
			'sidebar_gap',
			array(
				'label'      => __( 'Space between sidebar and grid', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 120 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-catalog-wrap' => '--om-sidebar-gap: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array( 'filter_position' => array( 'left', 'right' ) ),
			)
		);

		$this->add_control(
			'sidebar_sticky',
			array(
				'label'        => __( 'Sticky sidebar', 'om-catalog' ),
				'type'         => Controls_Manager::SWITCHER,
				'default'      => 'yes',
				'return_value' => 'yes',
				'selectors'    => array(
					'{{WRAPPER}} .om-filter-sidebar' => 'position: sticky; top: var(--om-sticky-offset, 24px);',
				),
				'condition'    => array( 'filter_position' => array( 'left', 'right' ) ),
			)
		);

		$this->add_control(
			'sidebar_background',
			array(
				'label'     => __( 'Panel background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-filter-panel-body' => 'background-color: {{VALUE}}; padding: 24px;',
				),
				'condition' => array( 'filter_position' => array( 'left', 'right' ) ),
			)
		);

		$this->add_control(
			'sidebar_heading_color',
			array(
				'label'     => __( 'Group heading color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => array(
					'{{WRAPPER}} .om-filter-heading, {{WRAPPER}} .om-filter-panel-title, {{WRAPPER}} .om-filter-select-label' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'sidebar_heading_typography',
				'label'    => __( 'Group heading typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-filter-heading, {{WRAPPER}} .om-filter-select-label',
			)
		);

		$this->add_control(
			'sidebar_link_color',
			array(
				'label'     => __( 'Option color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => array(
					'{{WRAPPER}} .om-filter-link, {{WRAPPER}} .om-filter-nav' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'sidebar_link_hover',
			array(
				'label'     => __( 'Option hover color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-filter-link:hover' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'sidebar_link_active',
			array(
				'label'     => __( 'Selected option color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-filter-link.is-active' => 'color: {{VALUE}};',
					'{{WRAPPER}} .om-filter-link.is-active::before' => 'border-color: {{VALUE}}; background-color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'sidebar_link_typography',
				'label'    => __( 'Option typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-filter-link, {{WRAPPER}} .om-filter-nav',
			)
		);

		$this->add_responsive_control(
			'sidebar_group_spacing',
			array(
				'label'      => __( 'Space between groups', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 80 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-filter-group + .om-filter-group' => 'margin-top: {{SIZE}}{{UNIT}}; padding-top: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array( 'filter_position' => array( 'left', 'right' ) ),
			)
		);

		$this->add_control(
			'sidebar_divider_color',
			array(
				'label'     => __( 'Divider & field border color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-filter-group + .om-filter-group, {{WRAPPER}} .om-filter-panel-head' => 'border-color: {{VALUE}};',
					'{{WRAPPER}} .om-filter-nav' => 'border-color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_badges',
			array(
				'label' => __( 'Badges', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'badge_bg',
			array(
				'label'     => __( 'Badge background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-badge' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'badge_color',
			array(
				'label'     => __( 'Badge text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-badge' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'badge_typography',
				'label'    => __( 'Badge typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-badge',
			)
		);

		$this->add_control(
			'badge_radius',
			array(
				'label'      => __( 'Badge corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 30 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-badge' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->end_controls_section();

		$this->register_card_extras_style();
		$this->register_card_look_style();

		/* ---------- Style: card price ---------- */
		$this->start_controls_section(
			'section_style_price',
			array(
				'label'     => __( 'Card Price', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'show_prices' => 'yes' ),
			)
		);

		$this->add_control(
			'card_price_color',
			array(
				'label'     => __( 'Color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-card-price' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'card_price_typography',
				'selector' => '{{WRAPPER}} .om-card-price',
			)
		);

		$this->add_responsive_control(
			'card_price_spacing',
			array(
				'label'      => __( 'Space above', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-card-price' => 'margin-top: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: search & sort ---------- */
		$this->start_controls_section(
			'section_style_search',
			array(
				'label' => __( 'Search & Sort', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'search_typography',
				'label'    => __( 'Search box text', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-search-input',
			)
		);

		$this->add_control(
			'search_bg',
			array(
				'label'     => __( 'Search box background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-search-input' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'search_text',
			array(
				'label'     => __( 'Search box text colour', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-search-input, {{WRAPPER}} .om-search-icon' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'search_border',
			array(
				'label'     => __( 'Search box border', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-search-input' => 'border-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'search_radius',
			array(
				'label'      => __( 'Search box corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-search-input' => 'border-radius: {{SIZE}}{{UNIT}};', '{{WRAPPER}} .om-search-submit' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'search_btn_bg',
			array(
				'label'     => __( 'Search button background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => array( '{{WRAPPER}} .om-search-submit' => 'background-color: {{VALUE}}; border-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'search_btn_color',
			array(
				'label'     => __( 'Search button text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-search-submit' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'sort_color',
			array(
				'label'     => __( 'Sort & result count text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => array( '{{WRAPPER}} .om-sort, {{WRAPPER}} .om-sort-select, {{WRAPPER}} .om-result-count' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'sort_border',
			array(
				'label'     => __( 'Sort dropdown border', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-sort-select' => 'border-color: {{VALUE}};' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_pagination',
			array(
				'label'     => __( 'Pagination', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'show_pagination' => 'yes' ),
			)
		);

		$this->add_responsive_control(
			'pagination_align',
			array(
				'label'     => __( 'Alignment', 'om-catalog' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'flex-start' => array( 'title' => __( 'Left', 'om-catalog' ), 'icon' => 'eicon-text-align-left' ),
					'center'     => array( 'title' => __( 'Center', 'om-catalog' ), 'icon' => 'eicon-text-align-center' ),
					'flex-end'   => array( 'title' => __( 'Right', 'om-catalog' ), 'icon' => 'eicon-text-align-right' ),
				),
				'default'   => 'center',
				'selectors' => array(
					'{{WRAPPER}} .om-pagination' => 'justify-content: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'pagination_color',
			array(
				'label'     => __( 'Link color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-pagination a' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'pagination_hover_color',
			array(
				'label'     => __( 'Link hover color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-pagination a:hover' => 'color: {{VALUE}}; border-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'pagination_active_bg',
			array(
				'label'     => __( 'Active page background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-pagination .current' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'pagination_active_color',
			array(
				'label'     => __( 'Active page text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-pagination .current' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'pagination_typography',
				'selector' => '{{WRAPPER}} .om-pagination a, {{WRAPPER}} .om-pagination span',
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Force multi-select settings to arrays before Elementor evaluates
	 * control conditions against them. A widget saved while extra_lines held
	 * '' (or by an older plugin version) would otherwise hand a string to a
	 * "contains" condition — older Elementor passes it into in_array(),
	 * fatal on PHP 8.
	 */
	protected function get_init_settings() {
		$settings = parent::get_init_settings();

		$array_keys = array( 'extra_lines' );
		foreach ( array_keys( $this->product_lines() ) as $code ) {
			$array_keys[] = self::collection_control_key( $code );
		}

		foreach ( $array_keys as $key ) {
			if ( isset( $settings[ $key ] ) && ! is_array( $settings[ $key ] ) ) {
				$settings[ $key ] = '' === $settings[ $key ] ? array() : array( (string) $settings[ $key ] );
			}
		}

		return $settings;
	}

	protected function render() {
		$settings = $this->get_settings_for_display();

		// Primary line plus any additional lines, deduplicated in order.
		$lines = array( $settings['product_line'] );
		if ( ! empty( $settings['extra_lines'] ) && is_array( $settings['extra_lines'] ) ) {
			$lines = array_values( array_unique( array_merge( $lines, $settings['extra_lines'] ) ) );
		}

		// Each line's Collections picks.
		$line_styles = array();
		foreach ( $lines as $code ) {
			$selected = $settings[ self::collection_control_key( $code ) ] ?? array();
			if ( is_array( $selected ) && ! empty( $selected ) ) {
				$line_styles[ $code ] = array_values( $selected );
			}
		}

		// Rendered directly rather than through a [om_catalog] string: values
		// escaped into shortcode attributes came back as "Men&#039;s" /
		// "Halo &amp; Pave" and broke the API filter.
		$atts = array(
			'lines'           => implode( ',', $lines ),
			'line_styles'     => $line_styles,
			'layout'          => (string) $settings['layout'],
			'filter_style'    => (string) $settings['filter_style'],
			'filter_position' => (string) ( $settings['filter_position'] ?? 'top' ),
			'show_filters'    => (string) $settings['show_filter_bar'],
			'filter_shapes'   => (string) ( $settings['filter_shapes'] ?? '' ),
			'shape_options'   => (string) ( $settings['shape_options'] ?? '' ),
			'filter_metals'   => (string) ( $settings['filter_metals'] ?? '' ),
			'filters_title'   => (string) ( $settings['filters_title'] ?? '' ),
			'show_count'      => (string) ( $settings['show_count'] ?? 'yes' ),
			'show_search'     => (string) ( $settings['show_search'] ?? 'yes' ),
			'search_placeholder' => (string) ( $settings['search_placeholder'] ?? '' ),
			'suggest_prices'  => 'yes' === ( $settings['suggest_prices'] ?? 'yes' ) ? 'yes' : 'no',
			'search_scope'    => in_array( $settings['search_scope'] ?? 'line', array( 'line', 'block', 'all' ), true ) ? $settings['search_scope'] : 'line',
			'show_sort'       => (string) ( $settings['show_sort'] ?? 'yes' ),
			'sort'            => (string) ( $settings['default_sort'] ?? '' ),
			'show_prices'     => (string) ( $settings['show_prices'] ?? '' ),
			'badges'          => (string) ( $settings['badges'] ?? '' ),
			'badge_new_days'  => (int) ( $settings['badge_new_days'] ?? 0 ),
			'badge_shape'     => (string) ( $settings['badge_shape'] ?? '' ),
			'per_page'        => '' !== (string) $settings['per_page'] ? (int) $settings['per_page'] : 12,
			'style'           => trim( preg_replace( '/\s+/', ' ', (string) $settings['collection_filter'] ) ),
			'set'             => trim( (string) $settings['set_filter'] ),
			'shape'           => trim( (string) $settings['shape_filter'] ),
			'in_stock'        => (string) $settings['in_stock_only'],
			'include'         => trim( preg_replace( '/\s+/', ' ', (string) $settings['include_styles'] ) ),
			'exclude'         => trim( preg_replace( '/\s+/', ' ', (string) $settings['exclude_styles'] ) ),
			// The responsive Columns control owns the column count via CSS.
			'inline_columns'  => 'no',
		) + $this->card_extras_atts( $settings );

		echo OM_Shortcodes::instance()->render_grid( $atts, OM_Shortcodes::request_from_globals() ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
	}
}
