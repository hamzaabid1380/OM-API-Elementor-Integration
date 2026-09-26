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
			'design',
			array(
				'label'   => __( 'Page design', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'modern',
				'options' => array(
					'modern'  => __( 'Modern: framed panels, soft corners, motion', 'om-catalog' ),
					'classic' => __( 'Classic: open, lines only', 'om-catalog' ),
				),
				'description' => __( 'Modern also turns the phone filters into a bottom sheet.', 'om-catalog' ),
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
			'suggest_viewed',
			array(
				'label'       => __( 'Recently viewed in search', 'om-catalog' ),
				'type'        => Controls_Manager::NUMBER,
				'default'     => 4,
				'min'         => 0,
				'max'         => 8,
				'description' => __( 'When the box is clicked (and when a search finds nothing), show the last designs this visitor looked at. 0 = off.', 'om-catalog' ),
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
			'badge_popular',
			array(
				'label'       => __( '"Popular" badge', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'On the most viewed designs of the line (views counted on this site).', 'om-catalog' ),
			)
		);

		$this->add_control(
			'badge_links',
			array(
				'label'       => __( 'Badges filter the grid', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Tap "Oval" to show oval designs, "New" for newest, "Popular" for most viewed.', 'om-catalog' ),
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
					'{{WRAPPER}} .om-pagination, {{WRAPPER}} .om-load-more, {{WRAPPER}} .om-progress' => 'display: {{VALUE}};',
				),
				'selectors_dictionary' => array(
					'yes' => 'flex',
					''    => 'none',
				),
			)
		);

		$this->add_control(
			'pagination_style',
			array(
				'label'     => __( 'More designs', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'numbers',
				'options'   => array(
					'numbers'  => __( 'Page numbers', 'om-catalog' ),
					'loadmore' => __( '"Show more" button', 'om-catalog' ),
					'infinite' => __( 'Infinite scroll', 'om-catalog' ),
				),
				'description' => __( '"Show more" and infinite scroll add designs below; coming back to the page restores the longer list.', 'om-catalog' ),
				'condition' => array( 'show_pagination' => 'yes' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Content: heading ---------- */

		$this->start_controls_section( 'section_head', array( 'label' => __( 'Heading', 'om-catalog' ) ) );

		$this->add_control(
			'head',
			array(
				'label'       => __( 'Show a heading above the catalog', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => __( 'Eyebrow, title, a thin rule and a short text. Takes part in the page intro. Leave off if the page already has its own heading.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'head_eyebrow',
			array(
				'label'       => __( 'Eyebrow', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'The bridal collection', 'om-catalog' ),
				'condition'   => array( 'head' => 'yes' ),
			)
		);

		$this->add_control(
			'head_title',
			array(
				'label'       => __( 'Title', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => '{line}',
				'description' => __( '{line} = the product line being shown, e.g. Engagement Rings.', 'om-catalog' ),
				'condition'   => array( 'head' => 'yes' ),
			)
		);

		$this->add_control(
			'head_tag',
			array(
				'label'     => __( 'Title HTML tag', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'h2',
				'options'   => array( 'h1' => 'H1', 'h2' => 'H2', 'h3' => 'H3', 'p' => 'p' ),
				'condition' => array( 'head' => 'yes' ),
			)
		);

		$this->add_control(
			'head_rule',
			array(
				'label'     => __( 'Thin rule under the title', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'condition' => array( 'head' => 'yes' ),
			)
		);

		$this->add_control(
			'head_text',
			array(
				'label'       => __( 'Text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 3,
				'placeholder' => __( 'Hand-finished settings, made to order for your diamond.', 'om-catalog' ),
				'condition'   => array( 'head' => 'yes' ),
			)
		);

		$this->add_responsive_control(
			'head_align',
			array(
				'label'     => __( 'Alignment', 'om-catalog' ),
				'type'      => Controls_Manager::CHOOSE,
				'default'   => 'center',
				'options'   => array(
					'left'   => array( 'title' => __( 'Left', 'om-catalog' ), 'icon' => 'eicon-text-align-left' ),
					'center' => array( 'title' => __( 'Center', 'om-catalog' ), 'icon' => 'eicon-text-align-center' ),
					'right'  => array( 'title' => __( 'Right', 'om-catalog' ), 'icon' => 'eicon-text-align-right' ),
				),
				'selectors_dictionary' => array(
					'left'   => 'align-items: flex-start; text-align: left; --om-rule-origin: left;',
					'center' => 'align-items: center; text-align: center; --om-rule-origin: center;',
					'right'  => 'align-items: flex-end; text-align: right; --om-rule-origin: right;',
				),
				'selectors' => array( '{{WRAPPER}} .om-intro-head' => '{{VALUE}}' ),
				'condition' => array( 'head' => 'yes' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Content: page intro ---------- */

		$this->start_controls_section( 'section_intro', array( 'label' => __( 'Page intro', 'om-catalog' ) ) );

		$this->add_control(
			'intro',
			array(
				'label'       => __( 'Quiet page intro', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'The heading, filters and first cards ease in one after another. Never shown to visitors who prefer reduced motion; filtering afterwards is instant. Always replays here in the editor.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'intro_when',
			array(
				'label'     => __( 'Play', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'first',
				'options'   => array(
					'first'   => __( 'On a visitor\'s first visit to this page', 'om-catalog' ),
					'session' => __( 'Once per visit', 'om-catalog' ),
					'always'  => __( 'Every time the page loads', 'om-catalog' ),
				),
				'condition' => array( 'intro' => 'yes' ),
			)
		);

		$this->add_control(
			'intro_style',
			array(
				'label'     => __( 'Motion', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'rise',
				'options'   => array(
					'rise' => __( 'Rise (gentle lift)', 'om-catalog' ),
					'fade' => __( 'Fade', 'om-catalog' ),
					'blur' => __( 'Blur to sharp', 'om-catalog' ),
					'zoom' => __( 'Settle (slight zoom)', 'om-catalog' ),
				),
				'condition' => array( 'intro' => 'yes' ),
			)
		);

		$this->add_control(
			'intro_speed',
			array(
				'label'     => __( 'Duration (ms)', 'om-catalog' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => array( 'size' => 700 ),
				'range'     => array( 'px' => array( 'min' => 200, 'max' => 2000, 'step' => 50 ) ),
				'condition' => array( 'intro' => 'yes' ),
			)
		);

		$this->add_control(
			'intro_stagger',
			array(
				'label'       => __( 'Delay between cards (ms)', 'om-catalog' ),
				'type'        => Controls_Manager::SLIDER,
				'default'     => array( 'size' => 70 ),
				'range'       => array( 'px' => array( 'min' => 0, 'max' => 400, 'step' => 10 ) ),
				'condition'   => array( 'intro' => 'yes' ),
			)
		);

		$this->add_control(
			'intro_distance',
			array(
				'label'      => __( 'Rise distance', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'default'    => array( 'size' => 18, 'unit' => 'px' ),
				'range'      => array( 'px' => array( 'min' => 4, 'max' => 60 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-catalog-wrap' => '--om-intro-dist: {{SIZE}}{{UNIT}};' ),
				'condition'  => array( 'intro' => 'yes', 'intro_style' => 'rise' ),
			)
		);

		$this->add_control(
			'intro_cards',
			array(
				'label'       => __( 'Cards in the sequence', 'om-catalog' ),
				'type'        => Controls_Manager::NUMBER,
				'default'     => 8,
				'min'         => 0,
				'max'         => 24,
				'description' => __( 'The rest appear together with the last one. 0 = cards don\'t take part.', 'om-catalog' ),
				'condition'   => array( 'intro' => 'yes' ),
			)
		);

		$this->add_control(
			'intro_toolbar',
			array(
				'label'     => __( 'Filters & toolbar take part', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'condition' => array( 'intro' => 'yes' ),
			)
		);

		$this->add_control(
			'intro_page_title',
			array(
				'label'       => __( 'Include the page\'s own title', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => __( 'Also eases in the page\'s main heading (H1), e.g. an Elementor Heading above this widget. The site header and logo are left alone.', 'om-catalog' ),
				'condition'   => array( 'intro' => 'yes' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Content: sticky toolbar ---------- */

		$this->start_controls_section( 'section_sticky_tools', array( 'label' => __( 'Sticky toolbar', 'om-catalog' ) ) );

		$this->add_control(
			'sticky_tools',
			array(
				'label'       => __( 'Slim toolbar while scrolling', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Once the visitor scrolls past the search and sort, a thin bar stays at the top of the screen with filters, search, the result count, active filters and sort.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'sticky_on',
			array(
				'label'     => __( 'Show on', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'all',
				'options'   => array(
					'all'     => __( 'All devices', 'om-catalog' ),
					'mobile'  => __( 'Phones only', 'om-catalog' ),
					'desktop' => __( 'Tablets & desktops only', 'om-catalog' ),
				),
				'condition' => array( 'sticky_tools' => 'yes' ),
			)
		);

		$this->add_control(
			'sticky_parts',
			array(
				'label'       => __( 'In the bar', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT2,
				'multiple'    => true,
				'label_block' => true,
				'default'     => array( 'filters', 'search', 'count', 'chips', 'sort', 'top' ),
				'options'     => array(
					'filters' => __( 'Filters button', 'om-catalog' ),
					'search'  => __( 'Search button', 'om-catalog' ),
					'count'   => __( 'Result count', 'om-catalog' ),
					'chips'   => __( 'Active filters', 'om-catalog' ),
					'sort'    => __( 'Sort', 'om-catalog' ),
					'top'     => __( 'Back to top', 'om-catalog' ),
				),
				'condition'   => array( 'sticky_tools' => 'yes' ),
			)
		);

		$this->add_responsive_control(
			'sticky_top',
			array(
				'label'       => __( 'Distance from the top', 'om-catalog' ),
				'type'        => Controls_Manager::SLIDER,
				'size_units'  => array( 'px' ),
				'range'       => array( 'px' => array( 'min' => 0, 'max' => 200 ) ),
				'description' => __( 'If your site header stays on screen, set its height here so the bar sits just below it.', 'om-catalog' ),
				'selectors'   => array( '{{WRAPPER}} .om-sticky-tools' => '--om-st-top: {{SIZE}}px;' ),
				'condition'   => array( 'sticky_tools' => 'yes' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Content: end of results ---------- */

		$this->start_controls_section( 'section_end', array( 'label' => __( 'End of results', 'om-catalog' ) ) );

		$this->add_control(
			'end_card',
			array(
				'label'       => __( 'Card after the last design', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Shown once the visitor reaches the end of the results (last page, or when "Show more" / infinite scroll runs out), with a next step.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'end_layout',
			array(
				'label'     => __( 'Layout', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'cell',
				'options'   => array(
					'cell'   => __( 'A card in the grid', 'om-catalog' ),
					'banner' => __( 'Full-width banner', 'om-catalog' ),
				),
				'condition' => array( 'end_card' => 'yes' ),
			)
		);

		$this->add_control(
			'end_theme',
			array(
				'label'     => __( 'Look', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'soft',
				'options'   => array(
					'soft'    => __( 'Soft tint', 'om-catalog' ),
					'outline' => __( 'Outline (dashed frame)', 'om-catalog' ),
					'dark'    => __( 'Dark (brand colour)', 'om-catalog' ),
					'image'   => __( 'Photo background', 'om-catalog' ),
				),
				'condition' => array( 'end_card' => 'yes' ),
			)
		);

		$this->add_control(
			'end_image',
			array(
				'label'     => __( 'Background photo', 'om-catalog' ),
				'type'      => Controls_Manager::MEDIA,
				'condition' => array( 'end_card' => 'yes', 'end_theme' => 'image' ),
			)
		);

		$this->add_control(
			'end_eyebrow',
			array(
				'label'       => __( 'Eyebrow', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( "You've seen them all", 'om-catalog' ),
				'separator'   => 'before',
				'condition'   => array( 'end_card' => 'yes' ),
			)
		);

		$this->add_control(
			'end_title',
			array(
				'label'       => __( 'Title', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( "Haven't found the one?", 'om-catalog' ),
				'condition'   => array( 'end_card' => 'yes' ),
			)
		);

		$this->add_control(
			'end_text',
			array(
				'label'       => __( 'Text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 3,
				'placeholder' => __( 'Tell us what you have in mind and we will design it with you, or show you more in person.', 'om-catalog' ),
				'description' => __( '{count} = number of designs, {line} = the product line.', 'om-catalog' ),
				'condition'   => array( 'end_card' => 'yes' ),
			)
		);

		$this->add_control(
			'end_primary',
			array(
				'label'     => __( 'Main button', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'inquiry',
				'separator' => 'before',
				'options'   => array(
					'inquiry' => __( 'Opens the inquiry form (pop-up)', 'om-catalog' ),
					'link'    => __( 'Goes to a link', 'om-catalog' ),
					'none'    => __( 'None', 'om-catalog' ),
				),
				'condition' => array( 'end_card' => 'yes' ),
			)
		);

		$this->add_control(
			'end_primary_text',
			array(
				'label'       => __( 'Main button text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Ask us to make it', 'om-catalog' ),
				'condition'   => array( 'end_card' => 'yes', 'end_primary!' => 'none' ),
			)
		);

		$this->add_control(
			'end_primary_url',
			array(
				'label'       => __( 'Main button link', 'om-catalog' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => home_url( '/book-a-viewing/' ),
				'condition'   => array( 'end_card' => 'yes', 'end_primary' => 'link' ),
			)
		);

		$this->add_control(
			'end_subject',
			array(
				'label'       => __( 'Inquiry subject', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => 'Custom design',
				'description' => __( 'Preselected in the form; must be one of the inquiry subjects (Settings > OM Catalog > Inquiries).', 'om-catalog' ),
				'condition'   => array( 'end_card' => 'yes', 'end_primary' => 'inquiry' ),
			)
		);

		$this->add_control(
			'end_secondary',
			array(
				'label'     => __( 'Second button', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'auto',
				'separator' => 'before',
				'options'   => array(
					'auto' => __( 'Smart: "See all designs" when filtered, else "Back to top"', 'om-catalog' ),
					'top'  => __( 'Back to top', 'om-catalog' ),
					'link' => __( 'Goes to a link', 'om-catalog' ),
					'none' => __( 'None', 'om-catalog' ),
				),
				'condition' => array( 'end_card' => 'yes' ),
			)
		);

		$this->add_control(
			'end_secondary_text',
			array(
				'label'       => __( 'Second button text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'description' => __( 'Leave empty for the default wording.', 'om-catalog' ),
				'condition'   => array( 'end_card' => 'yes', 'end_secondary!' => 'none' ),
			)
		);

		$this->add_control(
			'end_secondary_url',
			array(
				'label'     => __( 'Second button link', 'om-catalog' ),
				'type'      => Controls_Manager::URL,
				'condition' => array( 'end_card' => 'yes', 'end_secondary' => 'link' ),
			)
		);

		$this->end_controls_section();

		$this->register_quick_view_content();
		$this->register_card_video_content();

		/* ---------- Style: heading ---------- */

		$this->start_controls_section(
			'section_style_head',
			array(
				'label'     => __( 'Heading', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'head' => 'yes' ),
			)
		);

		$this->add_control( 'head_eyebrow_color', array( 'label' => __( 'Eyebrow colour', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-intro-eyebrow' => 'color: {{VALUE}};' ) ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'head_eyebrow_typo', 'label' => __( 'Eyebrow typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-intro-eyebrow' ) );
		$this->add_control( 'head_title_color', array( 'label' => __( 'Title colour', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'separator' => 'before', 'selectors' => array( '{{WRAPPER}} .om-catalog-wrap .om-intro-title' => 'color: {{VALUE}};' ) ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'head_title_typo', 'label' => __( 'Title typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-catalog-wrap .om-intro-title' ) );
		$this->add_control( 'head_text_color', array( 'label' => __( 'Text colour', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'separator' => 'before', 'selectors' => array( '{{WRAPPER}} .om-intro-text' => 'color: {{VALUE}};' ) ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'head_text_typo', 'label' => __( 'Text typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-intro-text' ) );
		$this->add_responsive_control(
			'head_text_width',
			array(
				'label'      => __( 'Text max width', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', 'ch', '%' ),
				'range'      => array( 'px' => array( 'min' => 200, 'max' => 1200 ), 'ch' => array( 'min' => 20, 'max' => 120 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-intro-text' => 'max-width: {{SIZE}}{{UNIT}};' ),
			)
		);
		$this->add_control( 'head_rule_color', array( 'label' => __( 'Rule colour', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'separator' => 'before', 'selectors' => array( '{{WRAPPER}} .om-intro-rule' => '--om-head-rule-c: {{VALUE}}; opacity: 1;' ), 'condition' => array( 'head_rule' => 'yes' ) ) );
		$this->add_control(
			'head_rule_width',
			array(
				'label'      => __( 'Rule width', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', '%' ),
				'range'      => array( 'px' => array( 'min' => 10, 'max' => 400 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-intro-rule' => '--om-head-rule-w: {{SIZE}}{{UNIT}};' ),
				'condition'  => array( 'head_rule' => 'yes' ),
			)
		);
		$this->add_control(
			'head_rule_height',
			array(
				'label'      => __( 'Rule thickness', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 1, 'max' => 6 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-intro-rule' => '--om-head-rule-h: {{SIZE}}{{UNIT}};' ),
				'condition'  => array( 'head_rule' => 'yes' ),
			)
		);
		$this->add_responsive_control(
			'head_gap',
			array(
				'label'      => __( 'Space below the heading', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 120 ) ),
				'separator'  => 'before',
				'selectors'  => array( '{{WRAPPER}} .om-intro-head' => '--om-head-gap: {{SIZE}}px;' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: sticky toolbar ---------- */

		$this->start_controls_section(
			'section_style_sticky_tools',
			array(
				'label'     => __( 'Sticky toolbar', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'sticky_tools' => 'yes' ),
			)
		);
		$this->add_control( 'st_bg', array( 'label' => __( 'Background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-sticky-tools' => '--om-st-bg: {{VALUE}};' ), 'description' => __( 'A little transparency keeps the frosted-glass look.', 'om-catalog' ) ) );
		$this->add_control( 'st_fg', array( 'label' => __( 'Text & buttons', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-sticky-tools' => '--om-st-fg: {{VALUE}};' ) ) );
		$this->add_control( 'st_fg_on', array( 'label' => __( 'Button text on hover', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-sticky-tools' => '--om-st-bg-solid: {{VALUE}};' ) ) );
		$this->add_control( 'st_line', array( 'label' => __( 'Lines & borders', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-sticky-tools' => '--om-st-line: {{VALUE}};' ) ) );
		$this->add_control(
			'st_h',
			array(
				'label'      => __( 'Height', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 40, 'max' => 90 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-sticky-tools' => '--om-st-h: {{SIZE}}px; --om-st-h-m: {{SIZE}}px;' ),
			)
		);
		$this->add_control(
			'st_max',
			array(
				'label'      => __( 'Content width', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 600, 'max' => 1920 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-sticky-tools' => '--om-st-max: {{SIZE}}px;' ),
			)
		);
		$this->add_control(
			'st_shadow',
			array(
				'label'                => __( 'Shadow', 'om-catalog' ),
				'type'                 => Controls_Manager::SWITCHER,
				'default'              => 'yes',
				'selectors_dictionary' => array( '' => 'box-shadow: none;' ),
				'selectors'            => array( '{{WRAPPER}} .om-sticky-tools' => '{{VALUE}}' ),
			)
		);
		$this->end_controls_section();

		/* ---------- Style: end of results ---------- */

		$this->start_controls_section(
			'section_style_end',
			array(
				'label'     => __( 'End of results', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'end_card' => 'yes' ),
			)
		);

		$this->add_control( 'end_bg', array( 'label' => __( 'Background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-end-card' => '--om-end-bg: {{VALUE}}; --om-end-bg-solid: {{VALUE}};' ), 'condition' => array( 'end_theme!' => 'image' ) ) );
		$this->add_control( 'end_overlay', array( 'label' => __( 'Photo overlay', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-end-card' => '--om-end-overlay: {{VALUE}};' ), 'condition' => array( 'end_theme' => 'image' ) ) );
		$this->add_control( 'end_fg', array( 'label' => __( 'Title & button colour', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-end-card' => '--om-end-fg: {{VALUE}};' ) ) );
		$this->add_control( 'end_muted', array( 'label' => __( 'Eyebrow & text colour', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-end-card' => '--om-end-muted: {{VALUE}};' ) ) );
		$this->add_control( 'end_border', array( 'label' => __( 'Border colour', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-end-card' => '--om-end-line: {{VALUE}};' ) ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'end_eyebrow_typo', 'label' => __( 'Eyebrow typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-end-eyebrow', 'separator' => 'before' ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'end_title_typo', 'label' => __( 'Title typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-end-title' ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'end_text_typo', 'label' => __( 'Text typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-end-text' ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'end_btn_typo', 'label' => __( 'Button typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-end-card .om-end-btn.om-end-btn' ) );
		$this->add_responsive_control(
			'end_align',
			array(
				'label'     => __( 'Alignment', 'om-catalog' ),
				'type'      => Controls_Manager::CHOOSE,
				'separator' => 'before',
				'options'   => array(
					'left'   => array( 'title' => __( 'Left', 'om-catalog' ), 'icon' => 'eicon-text-align-left' ),
					'center' => array( 'title' => __( 'Center', 'om-catalog' ), 'icon' => 'eicon-text-align-center' ),
				),
				'selectors_dictionary' => array(
					'left'   => '--om-end-align: left; --om-end-items: flex-start; justify-content: flex-start;',
					'center' => '--om-end-align: center; --om-end-items: center; justify-content: center;',
				),
				'selectors' => array( '{{WRAPPER}} .om-end-card' => '{{VALUE}}' ),
			)
		);
		$this->add_responsive_control(
			'end_padding',
			array(
				'label'      => __( 'Padding', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 12, 'max' => 120 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-end-card' => '--om-end-pad: {{SIZE}}px;' ),
			)
		);
		$this->add_responsive_control(
			'end_min_h',
			array(
				'label'      => __( 'Minimum height', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 700 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-end-card' => '--om-end-min-h: {{SIZE}}px;' ),
			)
		);
		$this->add_control(
			'end_radius',
			array(
				'label'      => __( 'Corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-end-card' => 'border-radius: {{SIZE}}px;' ),
			)
		);
		$this->add_control(
			'end_btn_radius',
			array(
				'label'      => __( 'Button corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-end-card' => '--om-end-btn-radius: {{SIZE}}px;' ),
			)
		);

		$this->end_controls_section();

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
			'suggest_viewed'  => max( 0, min( 8, (int) ( $settings['suggest_viewed'] ?? 4 ) ) ),
			'design'          => 'classic' === ( $settings['design'] ?? 'modern' ) ? 'classic' : 'modern',
			'pagination_style' => in_array( $settings['pagination_style'] ?? 'numbers', array( 'numbers', 'loadmore', 'infinite' ), true ) ? $settings['pagination_style'] : 'numbers',
			'badge_popular'   => 'yes' === ( $settings['badge_popular'] ?? 'yes' ) ? 'yes' : '',
			'badge_links'     => 'yes' === ( $settings['badge_links'] ?? 'yes' ) ? 'yes' : '',
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
			'intro'           => 'yes' === ( $settings['intro'] ?? 'yes' ) ? 'yes' : '',
			'intro_when'      => (string) ( $settings['intro_when'] ?? 'first' ),
			'intro_style'     => (string) ( $settings['intro_style'] ?? 'rise' ),
			'intro_speed'     => (int) ( $settings['intro_speed']['size'] ?? 700 ),
			'intro_stagger'   => (int) ( $settings['intro_stagger']['size'] ?? 70 ),
			'intro_cards'     => (int) ( $settings['intro_cards'] ?? 8 ),
			'intro_toolbar'   => 'yes' === ( $settings['intro_toolbar'] ?? 'yes' ) ? 'yes' : '',
			'intro_page_title' => 'yes' === ( $settings['intro_page_title'] ?? '' ) ? 'yes' : '',
			'head'            => 'yes' === ( $settings['head'] ?? '' ) ? 'yes' : '',
			'head_eyebrow'    => (string) ( $settings['head_eyebrow'] ?? '' ),
			'head_title'      => (string) ( $settings['head_title'] ?? '{line}' ),
			'head_text'       => (string) ( $settings['head_text'] ?? '' ),
			'head_rule'       => 'yes' === ( $settings['head_rule'] ?? 'yes' ) ? 'yes' : '',
			'head_tag'        => (string) ( $settings['head_tag'] ?? 'h2' ),
			'head_align'      => (string) ( $settings['head_align'] ?? 'center' ),
			'sticky_tools'       => 'yes' === ( $settings['sticky_tools'] ?? 'yes' ) ? 'yes' : '',
			'sticky_on'          => (string) ( $settings['sticky_on'] ?? 'all' ),
			'sticky_parts'       => implode( ',', (array) ( $settings['sticky_parts'] ?? array( 'filters', 'search', 'count', 'chips', 'sort', 'top' ) ) ),
			'end_card'           => 'yes' === ( $settings['end_card'] ?? 'yes' ) ? 'yes' : '',
			'end_layout'         => (string) ( $settings['end_layout'] ?? 'cell' ),
			'end_theme'          => (string) ( $settings['end_theme'] ?? 'soft' ),
			'end_image'          => (string) ( $settings['end_image']['url'] ?? '' ),
			'end_eyebrow'        => (string) ( $settings['end_eyebrow'] ?? '' ),
			'end_title'          => (string) ( $settings['end_title'] ?? '' ),
			'end_text'           => (string) ( $settings['end_text'] ?? '' ),
			'end_primary'        => (string) ( $settings['end_primary'] ?? 'inquiry' ),
			'end_primary_text'   => (string) ( $settings['end_primary_text'] ?? '' ),
			'end_primary_url'    => (string) ( $settings['end_primary_url']['url'] ?? '' ),
			'end_subject'        => (string) ( $settings['end_subject'] ?? 'Custom design' ),
			'end_secondary'      => (string) ( $settings['end_secondary'] ?? 'auto' ),
			'end_secondary_text' => (string) ( $settings['end_secondary_text'] ?? '' ),
			'end_secondary_url'  => (string) ( $settings['end_secondary_url']['url'] ?? '' ),
			// The responsive Columns control owns the column count via CSS.
			'inline_columns'  => 'no',
		) + $this->card_extras_atts( $settings );

		echo OM_Shortcodes::instance()->render_grid( $atts, OM_Shortcodes::request_from_globals() ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
	}
}
