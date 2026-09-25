<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;

/**
 * Shared style controls for the diamond search and ring builder widgets:
 * the accent colour of selected chips/steps/buttons and the heading font.
 */
trait OM_Elementor_Common_Style {

	protected function register_common_style( $selector_accent, $selector_heading ) {
		$this->start_controls_section(
			'section_style_common',
			array(
				'label' => __( 'Colors & Fonts', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'accent_color',
			array(
				'label'       => __( 'Accent', 'om-catalog' ),
				'type'        => Controls_Manager::COLOR,
				'description' => __( 'Selected filters, steps and main buttons. Defaults to the site colours.', 'om-catalog' ),
				'selectors'   => array(
					'{{WRAPPER}}' => '--om-color-primary: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'text_color',
			array(
				'label'     => __( 'Text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}}' => '--om-color-text: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'heading_typography',
				'label'    => __( 'Headings', 'om-catalog' ),
				'selector' => $selector_heading,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'body_typography',
				'label'    => __( 'Body text', 'om-catalog' ),
				'selector' => $selector_accent,
			)
		);

		$this->end_controls_section();
	}
}

/** "OM Diamond Search" widget: loose-diamond search with filters. */
class OM_Elementor_Diamond_Widget extends Widget_Base {
	use OM_Elementor_Common_Style;

	public function get_name() {
		return 'om_diamond_widget';
	}

	public function get_title() {
		return __( 'OM Diamond Search', 'om-catalog' );
	}

	public function get_icon() {
		return 'eicon-search';
	}

	public function get_categories() {
		return array( 'general' );
	}

	public function get_keywords() {
		return array( 'diamond', 'loose', 'search', 'overnight', 'mountings' );
	}

	public function get_style_depends() {
		return array( 'om-catalog-css', 'om-catalog-fonts' );
	}

	public function get_script_depends() {
		return array( 'om-catalog-js' );
	}

	protected function register_controls() {
		$this->start_controls_section( 'section_content', array( 'label' => __( 'Diamond Search', 'om-catalog' ) ) );

		$this->add_control(
			'origin',
			array(
				'label'   => __( 'Diamonds', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => '',
				'options' => array(
					''        => __( 'Lab-grown and natural (visitor chooses)', 'om-catalog' ),
					'lab'     => __( 'Lab-grown only', 'om-catalog' ),
					'natural' => __( 'Natural only', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'shapes',
			array(
				'label'       => __( 'Shapes offered', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT2,
				'multiple'    => true,
				'options'     => array_combine( OM_Diamonds::SHAPES, OM_Diamonds::SHAPES ),
				'default'     => array(),
				'label_block' => true,
				'description' => __( 'Leave empty for all shapes.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'per_page',
			array(
				'label'   => __( 'Diamonds per page', 'om-catalog' ),
				'type'    => Controls_Manager::NUMBER,
				'default' => 20,
				'min'     => 5,
				'max'     => 100,
			)
		);

		$this->add_control(
			'default_sort',
			array(
				'label'   => __( 'Default order', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'price-asc',
				'options' => array(
					'price-asc'  => __( 'Price: low to high', 'om-catalog' ),
					'price-desc' => __( 'Price: high to low', 'om-catalog' ),
					'carat-desc' => __( 'Carat: large to small', 'om-catalog' ),
					'new'        => __( 'Newest', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'show_origin',
			array(
				'label'     => __( 'Lab-grown / natural switch', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'condition' => array( 'origin' => '' ),
			)
		);

		$this->add_control(
			'default_shape',
			array(
				'label'   => __( 'Shape selected at first', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => '',
				'options' => array( '' => __( 'None (all shapes)', 'om-catalog' ) ) + array_combine( OM_Diamonds::SHAPES, OM_Diamonds::SHAPES ),
			)
		);

		$this->add_control(
			'show_select',
			array(
				'label'       => __( '"Select this diamond" (ring builder)', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Needs a ring builder page under Settings > OM Catalog.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'show_inquiry',
			array(
				'label'   => __( '"Ask about this diamond" form', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->end_controls_section();

		$this->register_common_style( '{{WRAPPER}} .om-diamonds', '{{WRAPPER}} .om-dd-title, {{WRAPPER}} .om-dd-price' );

		$this->start_controls_section( 'section_style_dfilters', array( 'label' => __( 'Filters', 'om-catalog' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_control( 'df_bg', array( 'label' => __( 'Panel background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-diamond-filters' => 'background-color: {{VALUE}};' ) ) );
		$this->add_control( 'df_label', array( 'label' => __( 'Group labels', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-df-group legend, {{WRAPPER}} .om-df-group > p, {{WRAPPER}} .om-df-group label' => 'color: {{VALUE}};' ) ) );
		$this->add_control( 'df_chip_border', array( 'label' => __( 'Shape & grade buttons border', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-df-chip, {{WRAPPER}} .om-df-shape' => 'border-color: {{VALUE}};' ) ) );
		$this->add_control( 'df_chip_active_bg', array( 'label' => __( 'Selected background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-df-chip.is-checked, {{WRAPPER}} .om-df-shape.is-checked' => 'background-color: {{VALUE}}; border-color: {{VALUE}};' ) ) );
		$this->add_control( 'df_chip_active_text', array( 'label' => __( 'Selected text', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-df-chip.is-checked, {{WRAPPER}} .om-df-shape.is-checked' => 'color: {{VALUE}};' ) ) );
		$this->add_control(
			'df_chip_radius',
			array(
				'label'      => __( 'Button corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 30 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-df-chip, {{WRAPPER}} .om-df-shape' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);
		$this->end_controls_section();

		$this->start_controls_section( 'section_style_dresults', array( 'label' => __( 'Results', 'om-catalog' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_control( 'dt_head_color', array( 'label' => __( 'Column headings', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-dt-head' => 'color: {{VALUE}};' ) ) );
		$this->add_control( 'dt_row_color', array( 'label' => __( 'Row text', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-dt-row' => 'color: {{VALUE}};' ) ) );
		$this->add_control( 'dt_row_border', array( 'label' => __( 'Row dividers', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-diamond, {{WRAPPER}} .om-dt-head' => 'border-color: {{VALUE}};' ) ) );
		$this->add_control( 'dt_row_hover', array( 'label' => __( 'Row hover / open background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-dt-row:hover, {{WRAPPER}} .om-diamond[open] > .om-dt-row' => 'background-color: {{VALUE}};' ) ) );
		$this->add_control( 'dt_price_color', array( 'label' => __( 'Price', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-dt-price, {{WRAPPER}} .om-dd-price' => 'color: {{VALUE}};' ) ) );
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'dt_row_typography',
				'label'    => __( 'Row text', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-dt-row',
			)
		);
		$this->add_control( 'dd_btn_bg', array( 'label' => __( 'Main button background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'separator' => 'before', 'selectors' => array( '{{WRAPPER}} .om-diamonds .om-btn--solid' => 'background-color: {{VALUE}}; border-color: {{VALUE}};' ) ) );
		$this->add_control( 'dd_btn_text', array( 'label' => __( 'Main button text', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-diamonds .om-btn--solid' => 'color: {{VALUE}};' ) ) );
		$this->add_control(
			'dd_btn_radius',
			array(
				'label'      => __( 'Button corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-diamonds .om-btn' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);
		$this->end_controls_section();
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		echo OM_Diamonds::instance()->render( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
			array(
				'origin'       => (string) $s['origin'],
				'shapes'       => implode( ',', (array) $s['shapes'] ),
				'per_page'     => (int) $s['per_page'],
				'default_sort' => (string) $s['default_sort'],
				'show_select'   => (string) $s['show_select'],
				'show_inquiry'  => (string) $s['show_inquiry'],
				'show_origin'   => 'yes' === ( $s['show_origin'] ?? 'yes' ) ? 'yes' : 'no',
				'default_shape' => (string) ( $s['default_shape'] ?? '' ),
			),
			OM_Diamonds::request_from_globals()
		);
	}
}

/** "OM Ring Builder" widget: setting + diamond + review. */
class OM_Elementor_Builder_Widget extends Widget_Base {
	use OM_Elementor_Common_Style;

	public function get_name() {
		return 'om_builder_widget';
	}

	public function get_title() {
		return __( 'OM Ring Builder', 'om-catalog' );
	}

	public function get_icon() {
		return 'eicon-product-related';
	}

	public function get_categories() {
		return array( 'general' );
	}

	public function get_keywords() {
		return array( 'ring', 'builder', 'diamond', 'setting', 'engagement' );
	}

	public function get_style_depends() {
		return array( 'om-catalog-css', 'om-catalog-fonts' );
	}

	public function get_script_depends() {
		return array( 'om-catalog-js' );
	}

	protected function register_controls() {
		$this->start_controls_section( 'section_content', array( 'label' => __( 'Ring Builder', 'om-catalog' ) ) );

		$this->add_control(
			'note',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => __( 'Choose this page as the builder page under Settings > OM Catalog > Ring Builder, so product pages and the diamond search link here.', 'om-catalog' ),
				'content_classes' => 'elementor-descriptor',
			)
		);

		$this->add_control(
			'heading',
			array(
				'label'       => __( 'Heading (optional)', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Design your engagement ring', 'om-catalog' ),
			)
		);

		$this->add_control(
			'per_page',
			array(
				'label'   => __( 'Settings per page', 'om-catalog' ),
				'type'    => Controls_Manager::NUMBER,
				'default' => 12,
				'min'     => 3,
				'max'     => 60,
			)
		);

		$this->add_control(
			'diamond_origin',
			array(
				'label'   => __( 'Diamonds', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => '',
				'options' => array(
					''        => __( 'Lab-grown and natural', 'om-catalog' ),
					'lab'     => __( 'Lab-grown only', 'om-catalog' ),
					'natural' => __( 'Natural only', 'om-catalog' ),
				),
			)
		);

		$this->end_controls_section();

		$this->register_common_style( '{{WRAPPER}} .om-builder', '{{WRAPPER}} .om-builder-heading, {{WRAPPER}} .om-review-title, {{WRAPPER}} .om-builder-choice-title' );
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		echo OM_Ring_Builder::instance()->render( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
			array(
				'heading'        => (string) $s['heading'],
				'per_page'       => (int) $s['per_page'],
				'diamond_origin' => (string) $s['diamond_origin'],
			)
		);
	}
}

/** "OM Related Products" widget: related / recently viewed / hand-picked. */
class OM_Elementor_Related_Widget extends Widget_Base {
	use OM_Elementor_Card_Controls;

	public function get_name() {
		return 'om_related_widget';
	}

	public function get_title() {
		return __( 'OM Related Products', 'om-catalog' );
	}

	public function get_icon() {
		return 'eicon-posts-carousel';
	}

	public function get_categories() {
		return array( 'general' );
	}

	public function get_keywords() {
		return array( 'related', 'recently viewed', 'also like', 'upsell', 'products', 'carousel' );
	}

	public function get_style_depends() {
		return array( 'om-catalog-css', 'om-catalog-fonts' );
	}

	public function get_script_depends() {
		return array( 'om-catalog-js' );
	}

	/** Color control helper. */
	private function color( $id, $label, $selectors, $extra = array() ) {
		$this->add_control( $id, array( 'label' => $label, 'type' => Controls_Manager::COLOR, 'selectors' => $selectors ) + $extra );
	}

	/** Slider control helper (px, optional other units). */
	private function slider( $id, $label, $selectors, $max = 100, $units = array( 'px' ), $responsive = true, $extra = array() ) {
		$args = array(
			'label'      => $label,
			'type'       => Controls_Manager::SLIDER,
			'size_units' => $units,
			'range'      => array(
				'px' => array( 'min' => 0, 'max' => $max ),
				'%'  => array( 'min' => 0, 'max' => 100 ),
				'em' => array( 'min' => 0, 'max' => 10, 'step' => 0.1 ),
			),
			'selectors'  => $selectors,
		) + $extra;
		$responsive ? $this->add_responsive_control( $id, $args ) : $this->add_control( $id, $args );
	}

	private function dimensions( $id, $label, $selector, $property ) {
		$this->add_responsive_control(
			$id,
			array(
				'label'      => $label,
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'selectors'  => array( $selector => $property . ': {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
			)
		);
	}

	protected function register_controls() {

		/* ---------- Content: products ---------- */

		$this->start_controls_section( 'section_content', array( 'label' => __( 'Products', 'om-catalog' ) ) );

		$this->add_control(
			'source',
			array(
				'label'       => __( 'Show', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'related',
				'options'     => array(
					'related' => __( 'You might also like (related designs)', 'om-catalog' ),
					'recent'  => __( 'Recently viewed by this visitor', 'om-catalog' ),
					'picked'  => __( 'Hand-picked style numbers', 'om-catalog' ),
					'set'     => __( 'Complete the set (matching bands / rings)', 'om-catalog' ),
				),
				'description' => __( 'On a product page, "related" follows the product being viewed. "Recently viewed" stays hidden until the visitor has looked at other pieces. "Complete the set" shows matching wedding bands on a ring page (and rings on a band page); exact pairs can be listed in Settings > OM Catalog.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'set_line',
			array(
				'label'       => __( 'Pair with line', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => '',
				'options'     => array( '' => __( 'Automatic (bands for rings, rings for bands)', 'om-catalog' ) ) + OM_Shortcodes::line_labels( is_admin() ),
				'condition'   => array( 'source' => 'set' ),
			)
		);

		$this->add_control(
			'subtitle',
			array(
				'label'       => __( 'Line under the title', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 2,
				'placeholder' => __( 'Wedding bands chosen to sit beautifully with this ring. They follow the metal you pick.', 'om-catalog' ),
				'description' => __( 'Leave empty for the default; type a single space to hide it.', 'om-catalog' ),
				'condition'   => array( 'source' => 'set' ),
			)
		);

		$this->add_control(
			'set_price',
			array(
				'label'       => __( '"Set from" price', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Both pieces together, under each card (needs card prices on).', 'om-catalog' ),
				'condition'   => array( 'source' => 'set' ),
			)
		);

		$this->add_control(
			'set_inquiry',
			array(
				'label'       => __( '"Ask about this set" link', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Opens the page\'s inquiry form with the subject "Bridal set" and both pieces in the email.', 'om-catalog' ),
				'condition'   => array( 'source' => 'set' ),
			)
		);

		$this->add_control(
			'line',
			array(
				'label'       => __( 'Product line', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'engagement-rings',
				'options'     => OM_Shortcodes::line_labels( is_admin() ),
				'description' => __( 'For hand-picked products, and for related products outside a product page.', 'om-catalog' ),
				'condition'   => array( 'source!' => 'recent' ),
			)
		);

		$this->add_control(
			'styles',
			array(
				'label'       => __( 'Style numbers', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 2,
				'placeholder' => '85121-2, 84842-2',
				'condition'   => array( 'source' => 'picked' ),
			)
		);

		$this->add_control(
			'count',
			array(
				'label'   => __( 'Number of products', 'om-catalog' ),
				'type'    => Controls_Manager::NUMBER,
				'default' => 4,
				'min'     => 1,
				'max'     => 12,
			)
		);

		$this->end_controls_section();

		/* ---------- Content: layout ---------- */

		$this->start_controls_section( 'section_layout', array( 'label' => __( 'Layout', 'om-catalog' ) ) );

		$this->add_control(
			'title',
			array(
				'label'       => __( 'Title', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'You might also like', 'om-catalog' ),
				'description' => __( 'Leave empty for the default; type a single space to hide the title.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'title_tag',
			array(
				'label'   => __( 'Title HTML tag', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'h2',
				'options' => array( 'h2' => 'H2', 'h3' => 'H3', 'h4' => 'H4', 'p' => 'p' ),
			)
		);

		$this->add_control(
			'layout',
			array(
				'label'   => __( 'Display', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'grid',
				'options' => array(
					'grid'     => __( 'Grid', 'om-catalog' ),
					'carousel' => __( 'Carousel (swipe / arrows)', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'card_layout',
			array(
				'label'   => __( 'Card design', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'classic',
				'options' => array(
					'classic'   => __( 'Classic (centered under image)', 'om-catalog' ),
					'editorial' => __( 'Editorial (left-aligned)', 'om-catalog' ),
					'boxed'     => __( 'Boxed (framed card)', 'om-catalog' ),
					'overlay'   => __( 'Overlay (title on image)', 'om-catalog' ),
				),
			)
		);

		$this->add_responsive_control(
			'columns',
			array(
				'label'          => __( 'Columns / cards in view', 'om-catalog' ),
				'type'           => Controls_Manager::SELECT,
				'default'        => '4',
				'tablet_default' => '3',
				'mobile_default' => '2',
				'options'        => array( '1' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5', '6' => '6' ),
				'selectors'      => array( '{{WRAPPER}} .om-related' => '--om-related-columns: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'show_arrows',
			array(
				'label'     => __( 'Arrows', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'condition' => array( 'layout' => 'carousel' ),
			)
		);

		$this->add_control(
			'autoplay',
			array(
				'label'       => __( 'Autoplay every (seconds)', 'om-catalog' ),
				'type'        => Controls_Manager::NUMBER,
				'default'     => 0,
				'min'         => 0,
				'max'         => 30,
				'description' => __( '0 = off. Pauses while hovered or touched, and for visitors who prefer reduced motion.', 'om-catalog' ),
				'condition'   => array( 'layout' => 'carousel' ),
			)
		);

		$this->add_control(
			'show_variant',
			array(
				'label'     => __( 'Carat / variant line', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'separator' => 'before',
			)
		);

		$this->add_control(
			'show_prices',
			array(
				'label'       => __( '"From $X" prices', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => __( 'Only once a markup is set.', 'om-catalog' ),
				'condition'   => array( 'source!' => 'recent' ),
			)
		);

		$this->add_control(
			'hover_image',
			array(
				'label'                => __( 'Second photo on hover', 'om-catalog' ),
				'type'                 => Controls_Manager::SWITCHER,
				'default'              => 'yes',
				'selectors_dictionary' => array( 'yes' => '', '' => 'display: none;' ),
				'selectors'            => array( '{{WRAPPER}} .om-card-hover' => '{{VALUE}}' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: section & title ---------- */

		$this->register_quick_view_content( '' );
		$this->register_card_video_content();

		$this->start_controls_section( 'section_style_head', array( 'label' => __( 'Section & Title', 'om-catalog' ), 'tab' => Controls_Manager::TAB_STYLE ) );

		$this->dimensions( 'section_margin', __( 'Section margin', 'om-catalog' ), '{{WRAPPER}} .om-related', 'margin' );
		$this->dimensions( 'section_padding', __( 'Section padding', 'om-catalog' ), '{{WRAPPER}} .om-related', 'padding' );
		$this->color( 'section_bg', __( 'Section background', 'om-catalog' ), array( '{{WRAPPER}} .om-related' => 'background-color: {{VALUE}};' ) );

		$this->color( 'title_color', __( 'Title color', 'om-catalog' ), array( '{{WRAPPER}} .om-related-title' => 'color: {{VALUE}};' ), array( 'separator' => 'before' ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'title_typography', 'label' => __( 'Title typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-related-title' ) );
		$this->add_responsive_control(
			'title_align',
			array(
				'label'     => __( 'Title alignment', 'om-catalog' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'left'   => array( 'title' => __( 'Left', 'om-catalog' ), 'icon' => 'eicon-text-align-left' ),
					'center' => array( 'title' => __( 'Center', 'om-catalog' ), 'icon' => 'eicon-text-align-center' ),
					'right'  => array( 'title' => __( 'Right', 'om-catalog' ), 'icon' => 'eicon-text-align-right' ),
				),
				'selectors_dictionary' => array(
					'left'   => 'justify-content: space-between; text-align: left;',
					'center' => 'justify-content: center; text-align: center;',
					'right'  => 'justify-content: flex-end; text-align: right;',
				),
				'selectors' => array( '{{WRAPPER}} .om-related-head' => '{{VALUE}}' ),
			)
		);
		$this->slider( 'title_spacing', __( 'Space below title', 'om-catalog' ), array( '{{WRAPPER}} .om-related-head' => 'margin-bottom: {{SIZE}}{{UNIT}};' ), 100 );

		$this->end_controls_section();

		/* ---------- Style: grid / carousel ---------- */

		$this->start_controls_section( 'section_style_grid', array( 'label' => __( 'Grid & Carousel', 'om-catalog' ), 'tab' => Controls_Manager::TAB_STYLE ) );

		$this->slider( 'gap', __( 'Gap between cards', 'om-catalog' ), array( '{{WRAPPER}} .om-related' => '--om-related-gap: {{SIZE}}{{UNIT}};' ), 80 );
		$this->slider( 'row_gap', __( 'Row gap (grid)', 'om-catalog' ), array( '{{WRAPPER}} .om-related-track' => 'row-gap: {{SIZE}}{{UNIT}};' ), 120, array( 'px' ), true, array( 'condition' => array( 'layout' => 'grid' ) ) );
		$this->add_control(
			'peek',
			array(
				'label'       => __( 'Peek of next card (carousel)', 'om-catalog' ),
				'type'        => Controls_Manager::SLIDER,
				'size_units'  => array( '%' ),
				'range'       => array( '%' => array( 'min' => 0, 'max' => 40 ) ),
				'description' => __( 'Shows part of the next card so visitors see the row scrolls.', 'om-catalog' ),
				'selectors'   => array( '{{WRAPPER}} .om-related--carousel .om-related-track' => 'padding-right: {{SIZE}}%; scroll-padding-right: {{SIZE}}%;' ),
				'condition'   => array( 'layout' => 'carousel' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: cards ---------- */

		$this->start_controls_section( 'section_style_card', array( 'label' => __( 'Cards', 'om-catalog' ), 'tab' => Controls_Manager::TAB_STYLE ) );

		$this->color( 'card_bg', __( 'Background', 'om-catalog' ), array( '{{WRAPPER}} .om-card' => 'background-color: {{VALUE}};' ) );
		$this->add_group_control( \Elementor\Group_Control_Border::get_type(), array( 'name' => 'card_border', 'selector' => '{{WRAPPER}} .om-card' ) );
		$this->slider( 'card_radius', __( 'Corner radius', 'om-catalog' ), array( '{{WRAPPER}} .om-card, {{WRAPPER}} .om-card-image' => 'border-radius: {{SIZE}}{{UNIT}};' ), 40 );
		$this->dimensions( 'card_padding', __( 'Padding', 'om-catalog' ), '{{WRAPPER}} .om-card', 'padding' );
		$this->add_group_control( \Elementor\Group_Control_Box_Shadow::get_type(), array( 'name' => 'card_shadow', 'selector' => '{{WRAPPER}} .om-card' ) );
		$this->add_group_control( \Elementor\Group_Control_Box_Shadow::get_type(), array( 'name' => 'card_shadow_hover', 'label' => __( 'Hover shadow', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-card:hover' ) );
		$this->add_responsive_control(
			'card_align',
			array(
				'label'     => __( 'Text alignment', 'om-catalog' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'left'   => array( 'title' => __( 'Left', 'om-catalog' ), 'icon' => 'eicon-text-align-left' ),
					'center' => array( 'title' => __( 'Center', 'om-catalog' ), 'icon' => 'eicon-text-align-center' ),
					'right'  => array( 'title' => __( 'Right', 'om-catalog' ), 'icon' => 'eicon-text-align-right' ),
				),
				'selectors' => array( '{{WRAPPER}} .om-card-body' => 'text-align: {{VALUE}};' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: image ---------- */

		$this->start_controls_section( 'section_style_image', array( 'label' => __( 'Image', 'om-catalog' ), 'tab' => Controls_Manager::TAB_STYLE ) );

		$this->add_control(
			'image_ratio',
			array(
				'label'     => __( 'Aspect ratio', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => '',
				'options'   => array(
					''    => __( 'Square (default)', 'om-catalog' ),
					'4/5' => __( 'Portrait 4:5', 'om-catalog' ),
					'3/4' => __( 'Portrait 3:4', 'om-catalog' ),
					'4/3' => __( 'Landscape 4:3', 'om-catalog' ),
				),
				'selectors' => array( '{{WRAPPER}} .om-card-image' => 'aspect-ratio: {{VALUE}};' ),
			)
		);
		$this->add_control(
			'image_fit',
			array(
				'label'     => __( 'Image fit', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => '',
				'options'   => array(
					''        => __( 'Fill (crop)', 'om-catalog' ),
					'contain' => __( 'Fit whole image', 'om-catalog' ),
				),
				'selectors' => array( '{{WRAPPER}} .om-card-image img' => 'object-fit: {{VALUE}};' ),
			)
		);
		$this->color( 'image_bg', __( 'Background', 'om-catalog' ), array( '{{WRAPPER}} .om-card-image' => 'background-color: {{VALUE}};' ) );
		$this->slider( 'image_spacing', __( 'Space below image', 'om-catalog' ), array( '{{WRAPPER}} .om-card-image' => 'margin-bottom: {{SIZE}}{{UNIT}};' ), 60 );
		$this->add_control(
			'image_zoom',
			array(
				'label'     => __( 'Hover zoom', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => '',
				'options'   => array(
					''      => __( 'Subtle (default)', 'om-catalog' ),
					'1'     => __( 'None', 'om-catalog' ),
					'1.08'  => __( 'Medium', 'om-catalog' ),
					'1.15'  => __( 'Strong', 'om-catalog' ),
				),
				'selectors' => array( '{{WRAPPER}} .om-card:hover .om-card-image img' => 'transform: scale({{VALUE}});' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: text ---------- */

		$this->start_controls_section( 'section_style_text', array( 'label' => __( 'Product Name, Carat & Price', 'om-catalog' ), 'tab' => Controls_Manager::TAB_STYLE ) );

		$this->color( 'card_title_color', __( 'Name color', 'om-catalog' ), array( '{{WRAPPER}} .om-card-title' => 'color: {{VALUE}};' ) );
		$this->color( 'card_title_hover', __( 'Name hover color', 'om-catalog' ), array( '{{WRAPPER}} .om-card:hover .om-card-title' => 'color: {{VALUE}};' ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'card_title_typography', 'label' => __( 'Name typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-card-title' ) );
		$this->slider( 'card_title_spacing', __( 'Space below name', 'om-catalog' ), array( '{{WRAPPER}} .om-card-title' => 'margin-bottom: {{SIZE}}{{UNIT}};' ), 40 );

		$this->color( 'variant_color', __( 'Carat line color', 'om-catalog' ), array( '{{WRAPPER}} .om-card-variant' => 'color: {{VALUE}};' ), array( 'separator' => 'before' ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'variant_typography', 'label' => __( 'Carat line typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-card-variant' ) );

		$this->color( 'price_color', __( 'Price color', 'om-catalog' ), array( '{{WRAPPER}} .om-card-price' => 'color: {{VALUE}};' ), array( 'separator' => 'before' ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'price_typography', 'label' => __( 'Price typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-card-price' ) );

		$this->end_controls_section();

		/* ---------- Style: arrows ---------- */

		$this->register_card_extras_style();
		$this->register_card_look_style();

		$this->start_controls_section(
			'section_style_arrows',
			array(
				'label'     => __( 'Arrows', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'layout' => 'carousel', 'show_arrows' => 'yes' ),
			)
		);

		$this->slider( 'arrow_size', __( 'Button size', 'om-catalog' ), array( '{{WRAPPER}} .om-related-nav button' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};' ), 80 );
		$this->slider( 'arrow_icon_size', __( 'Icon size', 'om-catalog' ), array( '{{WRAPPER}} .om-related-nav button' => 'font-size: {{SIZE}}{{UNIT}};' ), 48 );
		$this->slider( 'arrow_radius', __( 'Corner radius', 'om-catalog' ), array( '{{WRAPPER}} .om-related-nav button' => 'border-radius: {{SIZE}}{{UNIT}};' ), 50, array( 'px', '%' ) );

		$this->start_controls_tabs( 'arrow_tabs' );
		foreach ( array( 'normal' => __( 'Normal', 'om-catalog' ), 'hover' => __( 'Hover', 'om-catalog' ) ) as $state => $state_label ) {
			$this->start_controls_tab( 'arrow_tab_' . $state, array( 'label' => $state_label ) );
			$sel = '{{WRAPPER}} .om-related-nav button' . ( 'hover' === $state ? ':hover' : '' );
			$this->color( 'arrow_color_' . $state, __( 'Icon', 'om-catalog' ), array( $sel => 'color: {{VALUE}};' ) );
			$this->color( 'arrow_bg_' . $state, __( 'Background', 'om-catalog' ), array( $sel => 'background-color: {{VALUE}};' ) );
			$this->color( 'arrow_border_' . $state, __( 'Border', 'om-catalog' ), array( $sel => 'border-color: {{VALUE}};' ) );
			$this->end_controls_tab();
		}
		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$title = (string) $s['title'];
		$html  = OM_Related::instance()->render(
			array(
				'source'       => (string) $s['source'],
				'title'        => ( '' !== $title && '' === trim( $title ) ) ? ' ' : $title,
				'line'         => (string) ( $s['line'] ?? '' ),
				'styles'       => (string) ( $s['styles'] ?? '' ),
				'count'        => (int) $s['count'],
				'layout'       => (string) $s['layout'],
				'card_layout'  => (string) ( $s['card_layout'] ?? 'classic' ),
				'show_variant' => (string) ( $s['show_variant'] ?? 'yes' ),
				'show_arrows'  => (string) ( $s['show_arrows'] ?? 'yes' ),
				'autoplay'     => (int) ( $s['autoplay'] ?? 0 ),
				'show_prices'  => (string) ( $s['show_prices'] ?? '' ),
				'set_line'     => (string) ( $s['set_line'] ?? '' ),
				'subtitle'     => ( '' !== (string) ( $s['subtitle'] ?? '' ) && '' === trim( (string) $s['subtitle'] ) ) ? ' ' : (string) ( $s['subtitle'] ?? '' ),
				'set_price'    => 'yes' === ( $s['set_price'] ?? 'yes' ) ? 'yes' : '',
				'set_inquiry'  => 'yes' === ( $s['set_inquiry'] ?? 'yes' ) ? 'yes' : '',
			) + $this->card_extras_atts( $s )
		);
		// Title tag.
		$tag = in_array( $s['title_tag'] ?? 'h2', array( 'h2', 'h3', 'h4', 'p' ), true ) ? $s['title_tag'] : 'h2';
		if ( 'h2' !== $tag ) {
			$html = preg_replace( '#<h2 class="om-related-title">(.*?)</h2>#s', '<' . $tag . ' class="om-related-title">$1</' . $tag . '>', $html, 1 );
		}
		echo $html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
	}
}

/** "OM Search" widget: one search box for every product line, e.g. in a header. */
class OM_Elementor_Search_Widget extends Widget_Base {

	public function get_name() {
		return 'om_search_widget';
	}

	public function get_title() {
		return __( 'OM Search', 'om-catalog' );
	}

	public function get_icon() {
		return 'eicon-search';
	}

	public function get_categories() {
		return array( 'general' );
	}

	public function get_keywords() {
		return array( 'search', 'jewelry', 'rings', 'overnight', 'catalog' );
	}

	public function get_style_depends() {
		return array( 'om-catalog-css' );
	}

	public function get_script_depends() {
		return array( 'om-catalog-js' );
	}

	protected function register_controls() {
		$this->start_controls_section( 'section_content', array( 'label' => __( 'Search', 'om-catalog' ) ) );

		$this->add_control(
			'lines',
			array(
				'label'       => __( 'Search these lines', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT2,
				'multiple'    => true,
				'label_block' => true,
				'options'     => OM_Shortcodes::line_labels( is_admin() ),
				'default'     => array(),
				'description' => __( 'Leave empty to search every product line. Suggestions are grouped by line.', 'om-catalog' ),
			)
		);

		$pages = array( '' => __( 'From Settings > OM Catalog > Search', 'om-catalog' ) );
		if ( is_admin() ) {
			foreach ( get_pages( array( 'number' => 200 ) ) as $page ) {
				$pages[ (string) $page->ID ] = $page->post_title;
			}
		}
		$this->add_control(
			'results_page',
			array(
				'label'       => __( 'Results page', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => '',
				'options'     => $pages,
				'description' => __( 'A page with an OM Product Catalog widget showing these lines. "See all" and Enter go there.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'placeholder',
			array(
				'label'       => __( 'Placeholder', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Search rings, bands, style numbers…', 'om-catalog' ),
			)
		);

		$this->add_control(
			'button',
			array(
				'label'   => __( 'Search button', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'suggest_prices',
			array(
				'label'       => __( 'Prices in suggestions', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Once a markup is set.', 'om-catalog' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section( 'section_style_box', array( 'label' => __( 'Search Box', 'om-catalog' ), 'tab' => Controls_Manager::TAB_STYLE ) );

		$this->add_responsive_control(
			'box_width',
			array(
				'label'      => __( 'Width', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', '%' ),
				'range'      => array( 'px' => array( 'min' => 180, 'max' => 900 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-search-standalone' => 'max-width: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_responsive_control(
			'box_height',
			array(
				'label'      => __( 'Height', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 32, 'max' => 72 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-search-input, {{WRAPPER}} .om-search-submit' => 'height: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'box_typography',
				'selector' => '{{WRAPPER}} .om-search-input',
			)
		);

		$this->add_control( 'box_bg', array( 'label' => __( 'Background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-search-input' => 'background-color: {{VALUE}};' ) ) );
		$this->add_control( 'box_text', array( 'label' => __( 'Text', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-search-input, {{WRAPPER}} .om-search-icon' => 'color: {{VALUE}};' ) ) );
		$this->add_control( 'box_border', array( 'label' => __( 'Border', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-search-input' => 'border-color: {{VALUE}};' ) ) );
		$this->add_control(
			'box_radius',
			array(
				'label'      => __( 'Corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-search-input'                => 'border-radius: {{SIZE}}{{UNIT}} 0 0 {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .om-search--no-button .om-search-input' => 'border-radius: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .om-search-submit'               => 'border-radius: 0 {{SIZE}}{{UNIT}} {{SIZE}}{{UNIT}} 0;',
				),
			)
		);
		$this->add_control( 'btn_bg', array( 'label' => __( 'Button background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'separator' => 'before', 'selectors' => array( '{{WRAPPER}} .om-search-submit' => 'background-color: {{VALUE}}; border-color: {{VALUE}};' ) ) );
		$this->add_control( 'btn_text', array( 'label' => __( 'Button text', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-search-submit' => 'color: {{VALUE}};' ) ) );

		$this->end_controls_section();
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		echo OM_Search::render_box( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
			array(
				'lines'          => implode( ',', (array) ( $s['lines'] ?? array() ) ),
				'results_page'   => (string) ( $s['results_page'] ?? '' ),
				'placeholder'    => (string) ( $s['placeholder'] ?? '' ),
				'suggest_prices' => 'yes' === ( $s['suggest_prices'] ?? 'yes' ) ? 'yes' : 'no',
				'button'         => 'yes' === ( $s['button'] ?? 'yes' ) ? 'yes' : 'no',
			)
		);
	}
}
