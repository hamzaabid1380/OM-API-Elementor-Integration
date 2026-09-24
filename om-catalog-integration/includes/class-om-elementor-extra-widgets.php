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
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		echo OM_Diamonds::instance()->render( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
			array(
				'origin'       => (string) $s['origin'],
				'shapes'       => implode( ',', (array) $s['shapes'] ),
				'per_page'     => (int) $s['per_page'],
				'default_sort' => (string) $s['default_sort'],
				'show_select'  => (string) $s['show_select'],
				'show_inquiry' => (string) $s['show_inquiry'],
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

	protected function register_controls() {
		$this->start_controls_section( 'section_content', array( 'label' => __( 'Products', 'om-catalog' ) ) );

		$this->add_control(
			'source',
			array(
				'label'   => __( 'Show', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'related',
				'options' => array(
					'related' => __( 'You might also like (related designs)', 'om-catalog' ),
					'recent'  => __( 'Recently viewed by this visitor', 'om-catalog' ),
					'picked'  => __( 'Hand-picked style numbers', 'om-catalog' ),
				),
				'description' => __( 'On a product page, "related" follows the product being viewed. Recently viewed stays hidden until the visitor has looked at other pieces.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'title',
			array(
				'label'       => __( 'Title', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'You might also like', 'om-catalog' ),
			)
		);

		$this->add_control(
			'line',
			array(
				'label'       => __( 'Product line', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'engagement-rings',
				'options'     => OM_Shortcodes::line_labels( is_admin() ),
				'description' => __( 'Used for hand-picked products, and for related products outside a product page.', 'om-catalog' ),
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

		$this->add_control(
			'layout',
			array(
				'label'   => __( 'Layout', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'grid',
				'options' => array(
					'grid'     => __( 'Grid', 'om-catalog' ),
					'carousel' => __( 'Carousel (swipe / arrows)', 'om-catalog' ),
				),
			)
		);

		$this->add_responsive_control(
			'columns',
			array(
				'label'           => __( 'Columns', 'om-catalog' ),
				'type'            => Controls_Manager::SELECT,
				'default'         => '4',
				'tablet_default'  => '3',
				'mobile_default'  => '2',
				'options'         => array( '1' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5', '6' => '6' ),
				'selectors'       => array(
					'{{WRAPPER}} .om-related' => '--om-related-columns: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'show_prices',
			array(
				'label'     => __( '"From $X" prices', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => '',
				'condition' => array( 'source!' => 'recent' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style',
			array(
				'label' => __( 'Style', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => __( 'Title color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-related-title' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'title_typography',
				'label'    => __( 'Title typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-related-title',
			)
		);

		$this->add_responsive_control(
			'title_align',
			array(
				'label'     => __( 'Title alignment', 'om-catalog' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'flex-start' => array( 'title' => __( 'Left', 'om-catalog' ), 'icon' => 'eicon-text-align-left' ),
					'center'     => array( 'title' => __( 'Center', 'om-catalog' ), 'icon' => 'eicon-text-align-center' ),
				),
				'selectors' => array( '{{WRAPPER}} .om-related-head' => 'justify-content: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'card_title_color',
			array(
				'label'     => __( 'Product name color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => array( '{{WRAPPER}} .om-card-title' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'card_title_typography',
				'label'    => __( 'Product name typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-card-title',
			)
		);

		$this->add_responsive_control(
			'gap',
			array(
				'label'      => __( 'Gap', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-related' => '--om-related-gap: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'image_bg',
			array(
				'label'     => __( 'Image background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-card-image' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->end_controls_section();
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		echo OM_Related::instance()->render( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
			array(
				'source'      => (string) $s['source'],
				'title'       => (string) $s['title'],
				'line'        => (string) ( $s['line'] ?? '' ),
				'styles'      => (string) ( $s['styles'] ?? '' ),
				'count'       => (int) $s['count'],
				'layout'      => (string) $s['layout'],
				'show_prices' => (string) ( $s['show_prices'] ?? '' ),
			)
		);
	}
}
