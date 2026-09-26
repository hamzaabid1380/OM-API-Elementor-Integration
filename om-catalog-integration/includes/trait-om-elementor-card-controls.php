<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;

/**
 * Quick view and video-badge controls shared by the widgets that show
 * product cards (OM Product Catalog, OM Related Products): turning each on
 * or off, what they say and show, and how they look.
 */
trait OM_Elementor_Card_Controls {

	/** Content tab: Quick View section. */
	protected function register_quick_view_content( $default_on = 'yes' ) {
		$this->start_controls_section(
			'section_quick_view',
			array( 'label' => __( 'Quick View & Compare', 'om-catalog' ) )
		);

		$this->add_control(
			'compare',
			array(
				'label'       => __( 'Compare toggle on cards', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes' === $default_on ? 'yes' : '',
				'description' => __( 'Visitors tick up to 4 designs; a tray opens a side-by-side table (carat, stones, metals, price…). The picks follow them across pages.', 'om-catalog' ),
				'separator'   => 'after',
			)
		);

		$this->add_control(
			'quick_view',
			array(
				'label'       => __( 'Quick view button', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => $default_on,
				'description' => __( 'Opens photos, price and options in a pop-up without leaving the page.', 'om-catalog' ),
			)
		);

		$cond = array( 'quick_view' => 'yes' );

		$this->add_control(
			'qv_text',
			array(
				'label'       => __( 'Button text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Quick view', 'om-catalog' ),
				'condition'   => $cond,
			)
		);

		$this->add_control(
			'qv_style',
			array(
				'label'     => __( 'Button look', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'bar',
				'options'   => array(
					'bar'    => __( 'Bar across the photo', 'om-catalog' ),
					'button' => __( 'Centred button', 'om-catalog' ),
					'icon'   => __( 'Eye icon (corner)', 'om-catalog' ),
				),
				'condition' => $cond,
			)
		);

		$this->add_control(
			'qv_mobile',
			array(
				'label'       => __( 'Show on phones & tablets', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => __( 'Touch screens have no hover, so the button then stays visible on every card.', 'om-catalog' ),
				'condition'   => $cond,
			)
		);

		$this->add_control(
			'qv_parts',
			array(
				'label'       => __( 'Pop-up shows', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT2,
				'multiple'    => true,
				'label_block' => true,
				'default'     => array( 'price', 'options', 'description', 'meta', 'builder' ),
				'options'     => array(
					'price'       => __( 'Price', 'om-catalog' ),
					'options'     => __( 'Options (metal, colour, carat…)', 'om-catalog' ),
					'description' => __( 'Description', 'om-catalog' ),
					'meta'        => __( 'Carat & style number', 'om-catalog' ),
					'builder'     => __( 'Ring builder button', 'om-catalog' ),
				),
				'condition'   => $cond,
			)
		);

		$this->add_control(
			'qv_video',
			array(
				'label'     => __( 'Pop-up opens on', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'first',
				'options'   => array(
					'first' => __( 'The video (when there is one)', 'om-catalog' ),
					'thumb' => __( 'The photo', 'om-catalog' ),
				),
				'condition' => $cond,
			)
		);

		$this->add_control(
			'qv_link_text',
			array(
				'label'       => __( '"Full details" link text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'View full details', 'om-catalog' ),
				'condition'   => $cond,
			)
		);

		$this->end_controls_section();
	}

	/** Content tab: Videos on Cards section. */
	protected function register_card_video_content() {
		$this->start_controls_section(
			'section_card_video',
			array( 'label' => __( 'Videos on Cards', 'om-catalog' ) )
		);

		$this->add_control(
			'video_badge',
			array(
				'label'       => __( 'Video badge', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'icon',
				'options'     => array(
					'icon'  => __( 'Play icon', 'om-catalog' ),
					'label' => __( 'Play icon + text', 'om-catalog' ),
					'none'  => __( 'None', 'om-catalog' ),
				),
				'description' => __( 'Marks the designs that have a video.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'video_badge_text',
			array(
				'label'       => __( 'Badge text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Video', 'om-catalog' ),
				'condition'   => array( 'video_badge' => 'label' ),
			)
		);

		$this->add_control(
			'video_badge_pos',
			array(
				'label'     => __( 'Badge corner', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'tr',
				'options'   => array(
					'tr' => __( 'Top right', 'om-catalog' ),
					'tl' => __( 'Top left', 'om-catalog' ),
					'br' => __( 'Bottom right', 'om-catalog' ),
					'bl' => __( 'Bottom left', 'om-catalog' ),
				),
				'condition' => array( 'video_badge!' => 'none' ),
			)
		);

		$this->add_control(
			'card_video',
			array(
				'label'       => __( 'Play video previews', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'The video plays over the photo on hover (desktop) or when the card is centred on screen (phones). Needs video files (.mp4/.webm); YouTube/Vimeo links only get the badge.', 'om-catalog' ),
			)
		);

		$this->end_controls_section();
	}

	/** Style tab: Quick View button + pop-up, and the video badge. */
	protected function register_card_extras_style() {
		/* ---------- Quick view button ---------- */
		$this->start_controls_section(
			'section_style_qv',
			array(
				'label'     => __( 'Quick View Button', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'quick_view' => 'yes' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'qv_typography',
				'selector'  => '{{WRAPPER}} .om-qv-btn',
				'condition' => array( 'qv_style!' => 'icon' ),
			)
		);

		$this->start_controls_tabs( 'qv_tabs' );
		foreach ( array( 'normal' => __( 'Normal', 'om-catalog' ), 'hover' => __( 'Hover', 'om-catalog' ) ) as $state => $state_label ) {
			$this->start_controls_tab( 'qv_tab_' . $state, array( 'label' => $state_label ) );
			$sel = '{{WRAPPER}} .om-qv-btn' . ( 'hover' === $state ? ':hover' : '' );
			$this->add_control(
				'normal' === $state ? 'qv_bg' : 'qv_hover_bg',
				array(
					'label'     => __( 'Background', 'om-catalog' ),
					'type'      => Controls_Manager::COLOR,
					'selectors' => array( $sel => 'background-color: {{VALUE}};' ),
				)
			);
			$this->add_control(
				'normal' === $state ? 'qv_color' : 'qv_hover_color',
				array(
					'label'     => __( 'Text / icon', 'om-catalog' ),
					'type'      => Controls_Manager::COLOR,
					'selectors' => array( $sel => 'color: {{VALUE}};' ),
				)
			);
			$this->add_control(
				'normal' === $state ? 'qv_border_color' : 'qv_hover_border_color',
				array(
					'label'     => __( 'Border', 'om-catalog' ),
					'type'      => Controls_Manager::COLOR,
					'selectors' => array( $sel => 'border-color: {{VALUE}};' ),
				)
			);
			$this->end_controls_tab();
		}
		$this->end_controls_tabs();

		$this->add_control(
			'qv_border_width',
			array(
				'label'      => __( 'Border width', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'separator'  => 'before',
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 6 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-qv-btn' => 'border-style: solid; border-width: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'qv_radius',
			array(
				'label'      => __( 'Corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', '%' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 50 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-qv-btn' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_responsive_control(
			'qv_padding',
			array(
				'label'      => __( 'Padding', 'om-catalog' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em' ),
				'selectors'  => array( '{{WRAPPER}} .om-qv-btn' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
				'condition'  => array( 'qv_style!' => 'icon' ),
			)
		);

		$this->add_control(
			'qv_icon_size',
			array(
				'label'      => __( 'Icon button size', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 28, 'max' => 72 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-qv-btn--icon' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};' ),
				'condition'  => array( 'qv_style' => 'icon' ),
			)
		);

		$this->add_control(
			'qv_offset',
			array(
				'label'      => __( 'Distance from photo edge', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-qv-slot' => 'padding: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Quick view pop-up ---------- */
		$this->start_controls_section(
			'section_style_qv_modal',
			array(
				'label'     => __( 'Quick View Pop-up', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'quick_view' => 'yes' ),
			)
		);

		$this->add_control(
			'qv_modal_bg',
			array(
				'label'     => __( 'Background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}}' => '--om-qv-modal-bg: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'qv_backdrop',
			array(
				'label'     => __( 'Page overlay', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}}' => '--om-qv-backdrop: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'qv_close_color',
			array(
				'label'     => __( 'Close button', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}}' => '--om-qv-close: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'qv_modal_width',
			array(
				'label'      => __( 'Max width', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 480, 'max' => 1400 ) ),
				'selectors'  => array( '{{WRAPPER}}' => '--om-qv-width: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'qv_modal_radius',
			array(
				'label'      => __( 'Corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}}' => '--om-qv-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'qv_modal_padding',
			array(
				'label'      => __( 'Inner spacing', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 12, 'max' => 80 ) ),
				'selectors'  => array( '{{WRAPPER}}' => '--om-qv-pad: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Video badge ---------- */
		$this->start_controls_section(
			'section_style_video_badge',
			array(
				'label'     => __( 'Video Badge', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'video_badge!' => 'none' ),
			)
		);

		$this->add_control(
			'vbadge_bg',
			array(
				'label'     => __( 'Background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}}' => '--om-vbadge-bg: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'vbadge_color',
			array(
				'label'     => __( 'Icon / text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}}' => '--om-vbadge-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'vbadge_size',
			array(
				'label'      => __( 'Icon badge size', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 18, 'max' => 56 ) ),
				'selectors'  => array( '{{WRAPPER}}' => '--om-vbadge-size: {{SIZE}}{{UNIT}};' ),
				'condition'  => array( 'video_badge' => 'icon' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'vbadge_typography',
				'selector'  => '{{WRAPPER}} .om-card-play-text',
				'condition' => array( 'video_badge' => 'label' ),
			)
		);

		$this->add_control(
			'vbadge_radius',
			array(
				'label'      => __( 'Corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', '%' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 30 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-card-play' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'vbadge_offset',
			array(
				'label'      => __( 'Distance from edge', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-card-play--tr' => 'top: {{SIZE}}{{UNIT}}; right: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .om-card-play--tl' => 'top: {{SIZE}}{{UNIT}}; left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .om-card-play--br' => 'bottom: {{SIZE}}{{UNIT}}; right: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .om-card-play--bl' => 'bottom: {{SIZE}}{{UNIT}}; left: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Style tab: card hover (lift / zoom / none, lift distance, photo
	 * shadow) and this widget's corners and spacing. Empty = the site
	 * defaults from Settings > OM Catalog.
	 */
	protected function register_card_look_style() {
		$this->start_controls_section(
			'section_style_card_look',
			array(
				'label' => __( 'Card Hover, Corners & Spacing', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'btn_shape',
			array(
				'label'                => __( 'Button shape (Refined)', 'om-catalog' ),
				'type'                 => Controls_Manager::SELECT,
				'default'              => '',
				'options'              => array(
					''       => __( 'Site default', 'om-catalog' ),
					'pill'   => __( 'Pill', 'om-catalog' ),
					'soft'   => __( 'Soft', 'om-catalog' ),
					'square' => __( 'Square', 'om-catalog' ),
				),
				'selectors_dictionary' => array( 'pill' => '999px', 'soft' => '10px', 'square' => '0px' ),
				'selectors'            => array( '{{WRAPPER}}' => '--om-btn-radius: {{VALUE}};' ),
			)
		);

		$this->add_control( 'gold_light', array( 'label' => __( 'Gold (fills)', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}}' => '--om-gold-light: {{VALUE}};' ) ) );
		$this->add_control( 'gold_deep', array( 'label' => __( 'Gold (lines & rings)', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}}' => '--om-gold: {{VALUE}};' ) ) );
		$this->add_control( 'photo_tone', array( 'label' => __( 'Photo background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}}' => '--om-photo-tone: {{VALUE}};' ) ) );
		$this->add_control(
			'photo_blend',
			array(
				'label'                => __( 'Blend photo backgrounds into it', 'om-catalog' ),
				'type'                 => Controls_Manager::SELECT,
				'default'              => '',
				'options'              => array( '' => __( 'Site default', 'om-catalog' ), 'on' => __( 'On', 'om-catalog' ), 'off' => __( 'Off', 'om-catalog' ) ),
				'selectors_dictionary' => array( 'on' => 'multiply', 'off' => 'normal' ),
				'selectors'            => array( '{{WRAPPER}}' => '--om-photo-blend: {{VALUE}};' ),
				'separator'            => 'after',
			)
		);

		$this->add_control(
			'card_hover',
			array(
				'label'   => __( 'Hover effect', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => '',
				'options' => array(
					''     => __( 'Site default', 'om-catalog' ),
					'lift' => __( 'Lift (card rises, name underlines)', 'om-catalog' ),
					'zoom' => __( 'Zoom (photo zooms slowly)', 'om-catalog' ),
					'none' => __( 'None', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'card_lift',
			array(
				'label'      => __( 'Lift distance', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 16 ) ),
				'selectors'  => array( '{{WRAPPER}}' => '--om-card-lift: {{SIZE}}{{UNIT}};' ),
				'condition'  => array( 'card_hover!' => array( 'zoom', 'none' ) ),
			)
		);

		$this->add_control(
			'card_shadow',
			array(
				'label'                => __( 'Photo shadow on hover', 'om-catalog' ),
				'type'                 => Controls_Manager::SELECT,
				'default'              => '',
				'options'              => array(
					''       => __( 'Soft (default)', 'om-catalog' ),
					'strong' => __( 'Stronger', 'om-catalog' ),
					'none'   => __( 'None', 'om-catalog' ),
				),
				'selectors_dictionary' => array(
					''       => '',
					'strong' => '--om-card-shadow: 0 22px 44px -18px rgba(0, 17, 28, 0.45);',
					'none'   => '--om-card-shadow: none;',
				),
				'selectors'            => array( '{{WRAPPER}}' => '{{VALUE}}' ),
				'condition'            => array( 'card_hover!' => array( 'zoom', 'none' ) ),
			)
		);

		$this->add_control(
			'look_radius',
			array(
				'label'      => __( 'Corner radius: buttons & pills', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'separator'  => 'before',
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}}' => '--om-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'look_radius_lg',
			array(
				'label'      => __( 'Corner radius: photos & cards', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}}' => '--om-radius-lg: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'look_space',
			array(
				'label'     => __( 'Spacing', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => '',
				'options'   => array(
					''     => __( 'Site default', 'om-catalog' ),
					'0.8'  => __( 'Compact', 'om-catalog' ),
					'1'    => __( 'Comfortable', 'om-catalog' ),
					'1.3'  => __( 'Airy', 'om-catalog' ),
				),
				'selectors' => array( '{{WRAPPER}}' => '--om-space: {{VALUE}};' ),
			)
		);

		$this->end_controls_section();
	}

	/** The card attributes these controls produce, for the renderers. */
	protected function card_extras_atts( $s ) {
		$parts = $s['qv_parts'] ?? array( 'price', 'options', 'description', 'meta', 'builder' );
		return array(
			'quick_view'       => (string) ( $s['quick_view'] ?? '' ),
			'qv_text'          => (string) ( $s['qv_text'] ?? '' ),
			'qv_style'         => (string) ( $s['qv_style'] ?? 'bar' ),
			'qv_mobile'        => (string) ( $s['qv_mobile'] ?? '' ),
			'qv_parts'         => implode( ',', is_array( $parts ) ? $parts : array() ),
			'qv_video'         => (string) ( $s['qv_video'] ?? 'first' ),
			'qv_link_text'     => (string) ( $s['qv_link_text'] ?? '' ),
			'card_video'       => 'yes' === ( $s['card_video'] ?? 'yes' ) ? 'yes' : 'no',
			'video_badge'      => (string) ( $s['video_badge'] ?? 'icon' ),
			'video_badge_text' => (string) ( $s['video_badge_text'] ?? '' ),
			'video_badge_pos'  => (string) ( $s['video_badge_pos'] ?? 'tr' ),
			'card_hover'       => (string) ( $s['card_hover'] ?? '' ),
			'compare'          => 'yes' === ( $s['compare'] ?? '' ) ? 'yes' : '',
		);
	}
}
