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
