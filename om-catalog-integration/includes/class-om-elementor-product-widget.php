<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Repeater;

require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';

/**
 * "OM Single Product" Elementor widget.
 *
 * Drop it into a normal Elementor page to design the product layout
 * visually. On a real /catalog/{line}/{style}/ URL it renders the current
 * product; in the editor (or anywhere without a product context) it renders
 * a preview product so there is something real to design against. Choose
 * the designed page under Settings > OM Catalog > Product page layout and
 * every product URL renders through it.
 *
 * The markup is identical to the built-in template, so the live price
 * re-quote on option changes and the gallery filmstrip keep working.
 */
class OM_Elementor_Product_Widget extends Widget_Base {

	public function get_name() {
		return 'om_product_widget';
	}

	public function get_title() {
		return __( 'OM Single Product', 'om-catalog' );
	}

	public function get_icon() {
		return 'eicon-single-product';
	}

	public function get_categories() {
		return array( 'general' );
	}

	public function get_keywords() {
		return array( 'product', 'ring', 'jewelry', 'overnight', 'mountings', 'detail' );
	}

	public function get_style_depends() {
		return array( 'om-catalog-css', 'om-catalog-fonts' );
	}

	public function get_script_depends() {
		return array( 'om-catalog-js' );
	}

	protected function register_controls() {

		$this->start_controls_section(
			'section_preview',
			array(
				'label' => __( 'Preview', 'om-catalog' ),
			)
		);

		$this->add_control(
			'preview_note',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => __( 'On a real product URL this widget shows that product. The preview below is only for designing this layout.', 'om-catalog' ),
				'content_classes' => 'elementor-descriptor',
			)
		);

		$this->add_control(
			'preview_line',
			array(
				'label'   => __( 'Preview product line', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'engagement-rings',
				'options' => OM_Shortcodes::line_labels(),
			)
		);

		$this->add_control(
			'preview_style',
			array(
				'label'       => __( 'Preview style number', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => '85121-2',
				'description' => __( 'Leave blank to preview the first product of the line.', 'om-catalog' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_sections',
			array(
				'label' => __( 'Sections', 'om-catalog' ),
			)
		);

		$toggles = array(
			'show_gallery'     => __( 'Gallery', 'om-catalog' ),
			'show_line_label'  => __( 'Product line label', 'om-catalog' ),
			'show_title'       => __( 'Title', 'om-catalog' ),
			'show_meta'        => __( 'Carat / style number line', 'om-catalog' ),
			'show_price'       => __( 'Price', 'om-catalog' ),
			'show_description' => __( 'Description', 'om-catalog' ),
			'show_options'     => __( 'Metal / color / level options', 'om-catalog' ),
			'show_stones'      => __( 'Stone details', 'om-catalog' ),
			'show_variants'    => __( 'Other sizes / carats', 'om-catalog' ),
		);
		foreach ( $toggles as $key => $label ) {
			$this->add_control(
				$key,
				array(
					'label'   => $label,
					'type'    => Controls_Manager::SWITCHER,
					'default' => 'yes',
				)
			);
		}

		$this->end_controls_section();

		$this->start_controls_section(
			'section_actions',
			array(
				'label' => __( 'Price & Actions', 'om-catalog' ),
			)
		);

		$this->add_control(
			'price_placeholder_text',
			array(
				'label'       => __( '"Call for pricing" text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Call for pricing', 'om-catalog' ),
				'description' => __( 'Shown in place of the price while no markup is configured. Once a markup is set, real prices show instead.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'price_placeholder_link',
			array(
				'label'       => __( '"Call for pricing" link (optional)', 'om-catalog' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => 'tel:+12195550100 or /contact/',
				'description' => __( 'Makes the text clickable, e.g. tel:, mailto: or a contact page.', 'om-catalog' ),
			)
		);

		$repeater = new Repeater();

		$repeater->add_control(
			'button_text',
			array(
				'label'   => __( 'Text', 'om-catalog' ),
				'type'    => Controls_Manager::TEXT,
				'default' => __( 'Call Us', 'om-catalog' ),
			)
		);

		$repeater->add_control(
			'button_link',
			array(
				'label'       => __( 'Link', 'om-catalog' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => 'tel:+12195550100 or /book-appointment/',
			)
		);

		$repeater->add_control(
			'button_style',
			array(
				'label'   => __( 'Style', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'solid',
				'options' => array(
					'solid'   => __( 'Solid', 'om-catalog' ),
					'outline' => __( 'Outline', 'om-catalog' ),
					'text'    => __( 'Text link', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'action_buttons',
			array(
				'label'       => __( 'Action buttons', 'om-catalog' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $repeater->get_controls(),
				'default'     => array(),
				'title_field' => '{{{ button_text }}}',
				'description' => __( 'Inline buttons under the price — e.g. Call Us, Book an Appointment, Ask About This Ring. Looks best with 2-3.', 'om-catalog' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style ---------- */

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
					'{{WRAPPER}} .om-product-title' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'title_typography',
				'selector' => '{{WRAPPER}} .om-product-title',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_price',
			array(
				'label' => __( 'Price', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'price_color',
			array(
				'label'     => __( 'Color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-price' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'price_typography',
				'selector' => '{{WRAPPER}} .om-price',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_buttons',
			array(
				'label' => __( 'Action Buttons', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'buttons_typography',
				'selector' => '{{WRAPPER}} .om-btn',
			)
		);

		$this->add_control(
			'btn_solid_bg',
			array(
				'label'     => __( 'Solid: background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-btn--solid' => 'background-color: {{VALUE}}; border-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'btn_solid_color',
			array(
				'label'     => __( 'Solid: text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-btn--solid' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'btn_outline_color',
			array(
				'label'     => __( 'Outline / text link: color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-btn--outline, {{WRAPPER}} .om-btn--text' => 'color: {{VALUE}}; border-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'btn_hover_bg',
			array(
				'label'     => __( 'Hover background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-btn--solid:hover, {{WRAPPER}} .om-btn--outline:hover' => 'background-color: {{VALUE}}; border-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'btn_hover_color',
			array(
				'label'     => __( 'Hover text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-btn:hover' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_padding',
			array(
				'label'      => __( 'Padding', 'om-catalog' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em' ),
				'selectors'  => array(
					'{{WRAPPER}} .om-btn' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_gap',
			array(
				'label'     => __( 'Gap', 'om-catalog' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors' => array(
					'{{WRAPPER}} .om-actions' => 'gap: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_labels',
			array(
				'label' => __( 'Labels & Meta', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'label_color',
			array(
				'label'       => __( 'Labels color', 'om-catalog' ),
				'type'        => Controls_Manager::COLOR,
				'description' => __( 'Product line label, style number line, option labels.', 'om-catalog' ),
				'selectors'   => array(
					'{{WRAPPER}} .om-line-label, {{WRAPPER}} .om-style-meta, {{WRAPPER}} .om-options-form label' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'heading_color',
			array(
				'label'       => __( 'Section headings color', 'om-catalog' ),
				'type'        => Controls_Manager::COLOR,
				'description' => __( '"Stone Details" and "Other Sizes / Carats".', 'om-catalog' ),
				'selectors'   => array(
					'{{WRAPPER}} .om-product-details h3' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'text_color',
			array(
				'label'     => __( 'Body text color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-description, {{WRAPPER}} .om-stone-table td' => 'color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_chips',
			array(
				'label' => __( 'Variant Chips', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'chip_color',
			array(
				'label'     => __( 'Text color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-variant-link' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'chip_active_bg',
			array(
				'label'     => __( 'Active background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-variant-link.is-current' => 'background-color: {{VALUE}}; border-color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();

		// Real product context first; otherwise the preview product.
		$rewrites = class_exists( 'OM_Rewrites' ) ? OM_Rewrites::instance() : null;
		$product  = null;
		$line     = '';
		$style    = '';

		if ( $rewrites && $rewrites->is_product_request() ) {
			$product = $rewrites->get_current_product();
			$line    = $rewrites->get_current_line();
			$style   = $rewrites->get_current_style();
		}

		if ( ! $product || is_wp_error( $product ) ) {
			$line  = ! empty( $settings['preview_line'] ) ? $settings['preview_line'] : 'engagement-rings';
			$style = trim( (string) $settings['preview_style'] );

			if ( '' !== $style ) {
				$product = OM_API_Client::get_product_by_style( $line, $style );
			} else {
				$list    = OM_API_Client::get_products( $line, array( 'limit' => 1 ) );
				$product = ( ! is_wp_error( $list ) && ! empty( $list['products'][0] ) ) ? $list['products'][0] : null;
				$style   = is_array( $product ) && isset( $product['style_number'] ) ? $product['style_number'] : '';
			}
		}

		if ( ! $product || is_wp_error( $product ) ) {
			echo '<div class="om-error"><p>' . esc_html(
				is_wp_error( $product ) ? $product->get_error_message() : __( 'No product to display. Check API credentials in Settings > OM Catalog.', 'om-catalog' )
			) . '</p></div>';
			return;
		}

		$args = array();
		foreach ( array( 'show_gallery', 'show_line_label', 'show_title', 'show_meta', 'show_price', 'show_description', 'show_options', 'show_stones', 'show_variants' ) as $key ) {
			$args[ $key ] = 'yes' === ( $settings[ $key ] ?? 'yes' );
		}

		$args['price_placeholder'] = (string) ( $settings['price_placeholder_text'] ?? '' );

		$price_link = is_array( $settings['price_placeholder_link'] ?? null ) ? $settings['price_placeholder_link'] : array();
		$args['price_link']          = (string) ( $price_link['url'] ?? '' );
		$args['price_link_external'] = ! empty( $price_link['is_external'] );
		$args['price_link_nofollow'] = ! empty( $price_link['nofollow'] );

		$buttons = array();
		foreach ( (array) ( $settings['action_buttons'] ?? array() ) as $item ) {
			if ( empty( $item['button_text'] ) ) {
				continue;
			}
			$item_link = is_array( $item['button_link'] ?? null ) ? $item['button_link'] : array();
			$buttons[] = array(
				'text'     => $item['button_text'],
				'url'      => (string) ( $item_link['url'] ?? '' ),
				'external' => ! empty( $item_link['is_external'] ),
				'nofollow' => ! empty( $item_link['nofollow'] ),
				'style'    => $item['button_style'] ?? 'solid',
			);
		}
		$args['buttons'] = $buttons;

		// The extra class neutralizes the container geometry of
		// .om-single-product (the Elementor section owns spacing here) while
		// keeping its typography inheritance.
		echo '<div class="om-single-product om-single-product--widget">';
		echo om_render_product_detail( $product, $line, $style, $args ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
		echo '</div>';
	}
}
