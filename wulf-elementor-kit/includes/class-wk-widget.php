<?php
/**
 * Base for every Wulf widget: shared section/heading controls, reusable style controls
 * (color + hover color, typography, borders, shadows, spacing) and render helpers.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Typography;
use Elementor\Repeater;
use Elementor\Widget_Base;

abstract class WK_Widget extends Widget_Base {

	/** Short key, e.g. "hero"; the widget is "wk-hero". */
	protected $key = '';

	public function get_name() {
		return 'wk-' . $this->key;
	}

	public function get_categories() {
		return array( 'wulf-kit' );
	}

	public function get_style_depends() {
		return array( 'wulf-kit' );
	}

	public function get_script_depends() {
		return array( 'wulf-kit' );
	}

	public function get_keywords() {
		return array( 'wulf', 'jewelry', 'jeweler', $this->key );
	}

	public function has_widget_inner_wrapper(): bool {
		return false;
	}

	/* ================================================================
	 * Content controls
	 * ============================================================== */

	/** Anchor, background style, top rule. */
	protected function section_controls( $d = array() ) {
		$d = wp_parse_args( $d, array( 'anchor' => '', 'tone' => 'white', 'rule' => '', 'join' => '' ) );
		$this->start_controls_section( 'wk_section', array( 'label' => __( 'Section', 'wulf-kit' ) ) );
		$this->add_control( 'anchor', array(
			'label'       => __( 'Anchor (for menu links)', 'wulf-kit' ),
			'type'        => Controls_Manager::TEXT,
			'default'     => $d['anchor'],
			'description' => __( 'Links to #this-name jump here. Letters, numbers and dashes only.', 'wulf-kit' ),
		) );
		$this->add_control( 'tone', array(
			'label'   => __( 'Background', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => $d['tone'],
			'options' => array( 'white' => __( 'White', 'wulf-kit' ), 'ivory' => __( 'Ivory', 'wulf-kit' ), 'dark' => __( 'Dark', 'wulf-kit' ) ),
		) );
		$this->add_control( 'rule', array(
			'label'        => __( 'Line above the section', 'wulf-kit' ),
			'type'         => Controls_Manager::SWITCHER,
			'default'      => $d['rule'],
			'return_value' => 'yes',
		) );
		$this->add_control( 'text_on', array(
			'label'       => __( 'Text colors', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'auto',
			'options'     => array( 'auto' => __( 'Automatic (readable on the background)', 'wulf-kit' ), 'dark' => __( 'Dark text (for light backgrounds)', 'wulf-kit' ), 'light' => __( 'Light text (for dark backgrounds)', 'wulf-kit' ) ),
			'description' => __( 'Automatic checks the background, including a color or gradient you set in Style › Section, and picks dark or light text so it stays readable. For a background photo, choose one yourself.', 'wulf-kit' ),
		) );
		$this->add_control( 'join', array(
			'label'        => __( 'Tuck under the section above', 'wulf-kit' ),
			'type'         => Controls_Manager::SWITCHER,
			'default'      => $d['join'],
			'return_value' => 'yes',
			'description'  => __( 'Removes the space on top so this reads as part of the section above (same background).', 'wulf-kit' ),
		) );
		$this->end_controls_section();
	}

	/** Eyebrow, title, intro, alignment. */
	protected function head_controls( $d = array(), $label = '' ) {
		$d = wp_parse_args( $d, array( 'eyebrow' => '', 'title' => '', 'lead' => '', 'align' => 'left', 'tag' => 'h2' ) );
		$this->start_controls_section( 'wk_head', array( 'label' => $label ? $label : __( 'Heading', 'wulf-kit' ) ) );
		$this->add_control( 'eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => $d['eyebrow'], 'label_block' => true ) );
		$this->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => $d['title'], 'description' => __( 'Wrap words in *stars* to show them in gold italics.', 'wulf-kit' ) ) );
		$this->add_control( 'title_tag', array(
			'label'   => __( 'Title tag', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => $d['tag'],
			'options' => array( 'h1' => 'H1', 'h2' => 'H2', 'h3' => 'H3', 'div' => 'div' ),
		) );
		$this->add_control( 'lead', array( 'label' => __( 'Intro text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => $d['lead'] ) );
		$this->add_control( 'head_align', array(
			'label'   => __( 'Alignment', 'wulf-kit' ),
			'type'    => Controls_Manager::CHOOSE,
			'default' => $d['align'],
			'options' => array(
				'left'   => array( 'title' => __( 'Left', 'wulf-kit' ), 'icon' => 'eicon-text-align-left' ),
				'center' => array( 'title' => __( 'Center', 'wulf-kit' ), 'icon' => 'eicon-text-align-center' ),
			),
		) );
		$this->end_controls_section();
	}

	/** A text field + link pair inside the current section. */
	protected function button_fields( $id, $label, $text, $url, $topic = false ) {
		$this->add_control( $id . '_heading', array( 'label' => $label, 'type' => Controls_Manager::HEADING, 'separator' => 'before' ) );
		$this->add_control( $id . '_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => $text, 'description' => __( 'Leave empty to hide.', 'wulf-kit' ) ) );
		$this->add_control( $id . '_link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'default' => array( 'url' => $url ), 'dynamic' => array( 'active' => true ) ) );
		if ( $topic ) {
			$this->add_control( $id . '_topic', array(
				'label'       => __( 'Pre-select in the visit form', 'wulf-kit' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => is_string( $topic ) ? $topic : '',
				'description' => __( 'Optional. A topic from the Visit widget, e.g. Repair. Ticked when this is clicked.', 'wulf-kit' ),
			) );
		}
	}

	/* ================================================================
	 * Style controls
	 * ============================================================== */

	/** Section background, padding, width and per-section brand colors. */
	protected function style_section( $sel = '.sec' ) {
		$this->start_controls_section( 'wk_s_section', array( 'label' => __( 'Section', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_group_control( Group_Control_Background::get_type(), array(
			'name'     => 'sec_bg',
			'types'    => array( 'classic', 'gradient' ),
			'selector' => '{{WRAPPER}} .wk ' . $sel,
		) );
		$this->add_responsive_control( 'sec_pad', array(
			'label'      => __( 'Padding', 'wulf-kit' ),
			'type'       => Controls_Manager::DIMENSIONS,
			'size_units' => array( 'px', 'em', 'vw' ),
			'selectors'  => array( '{{WRAPPER}} .wk ' . $sel => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'sec_max', array(
			'label'      => __( 'Content width', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( 'px' ),
			'range'      => array( 'px' => array( 'min' => 600, 'max' => 1800 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk' => '--max: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_control( 'sec_rule_color', array(
			'label'     => __( 'Top line color', 'wulf-kit' ),
			'type'      => Controls_Manager::COLOR,
			'selectors' => array( '{{WRAPPER}} .wk .rule' => 'border-top-color: {{VALUE}};' ),
		) );
		$this->add_control( 'tokens_heading', array(
			'label'       => __( 'Brand colors for this section', 'wulf-kit' ),
			'type'        => Controls_Manager::HEADING,
			'separator'   => 'before',
		) );
		$this->add_control( 'tokens_note', array(
			'type'            => Controls_Manager::RAW_HTML,
			'raw'             => __( 'These change every place the color is used in this widget. Site-wide defaults live in Wulf Kit › Settings.', 'wulf-kit' ),
			'content_classes' => 'elementor-descriptor',
		) );
		$tokens = array(
			'gold'      => __( 'Gold (accent)', 'wulf-kit' ),
			'gold-deep' => __( 'Deep gold', 'wulf-kit' ),
			'gold-ink'  => __( 'Gold text', 'wulf-kit' ),
			'ink'       => __( 'Ink (headings, dark buttons)', 'wulf-kit' ),
			'text'      => __( 'Body text', 'wulf-kit' ),
			'sub'       => __( 'Secondary text', 'wulf-kit' ),
			'line'      => __( 'Lines', 'wulf-kit' ),
			'ivory'     => __( 'Ivory', 'wulf-kit' ),
			'night'     => __( 'Dark background', 'wulf-kit' ),
		);
		foreach ( $tokens as $t => $label ) {
			$this->add_control( 'tok_' . str_replace( '-', '_', $t ), array(
				'label'     => $label,
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .wk' => '--' . $t . ': {{VALUE}};' ),
			) );
		}
		$this->end_controls_section();
	}

	/** Eyebrow, title, intro styles. */
	protected function style_head( $base = '.shead' ) {
		$this->start_controls_section( 'wk_s_head', array( 'label' => __( 'Heading', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->text_style( 'eyebrow', __( 'Small label', 'wulf-kit' ), $base . ' .eyebrow', false, false );
		$this->text_style( 'title', __( 'Title', 'wulf-kit' ), $base . ' .h2', false, false );
		$this->add_control( 'title_em_color', array(
			'label'     => __( 'Gold words color', 'wulf-kit' ),
			'type'      => Controls_Manager::COLOR,
			'selectors' => array( '{{WRAPPER}} .wk ' . $base . ' .gold-em' => 'color: {{VALUE}};' ),
		) );
		$this->text_style( 'lead', __( 'Intro text', 'wulf-kit' ), $base . ' .lead', false, false );
		$this->add_responsive_control( 'head_gap', array(
			'label'      => __( 'Space below heading', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'separator'  => 'before',
			'range'      => array( 'px' => array( 'min' => 0, 'max' => 160 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk ' . $base => 'margin-bottom: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
	}

	/**
	 * Color (+ optional hover color) and typography for a text element.
	 *
	 * @param bool $section Wrap in its own style section.
	 */
	protected function text_style( $id, $label, $sel, $hover = false, $section = true, $extra = array() ) {
		if ( $section ) {
			$this->start_controls_section( 'wk_s_' . $id, array( 'label' => $label, 'tab' => Controls_Manager::TAB_STYLE ) );
		} else {
			$this->add_control( $id . '_h', array( 'label' => $label, 'type' => Controls_Manager::HEADING, 'separator' => 'before' ) );
		}
		$this->add_control( $id . '_color', array(
			'label'     => __( 'Color', 'wulf-kit' ),
			'type'      => Controls_Manager::COLOR,
			'selectors' => array( '{{WRAPPER}} .wk ' . $sel => 'color: {{VALUE}};' ),
		) );
		if ( $hover ) {
			$this->add_control( $id . '_hcolor', array(
				'label'     => __( 'Hover color', 'wulf-kit' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .wk ' . ( true === $hover ? $sel . ':hover' : $hover ) => 'color: {{VALUE}};' ),
			) );
		}
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => $id . '_typo', 'selector' => '{{WRAPPER}} .wk ' . $sel ) );
		foreach ( $extra as $k => $c ) {
			$this->add_control( $id . '_' . $k, $c );
		}
		if ( $section ) {
			$this->end_controls_section();
		}
	}

	/** Full button styling with normal/hover tabs. */
	protected function button_style( $id, $label, $sel ) {
		$this->start_controls_section( 'wk_s_' . $id, array( 'label' => $label, 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => $id . '_typo', 'selector' => '{{WRAPPER}} .wk ' . $sel ) );
		$this->start_controls_tabs( $id . '_tabs' );
		foreach ( array( 'n' => __( 'Normal', 'wulf-kit' ), 'h' => __( 'Hover', 'wulf-kit' ) ) as $st => $st_label ) {
			$s = 'h' === $st ? $sel . ':hover, {{WRAPPER}} .wk ' . $sel . ':focus-visible' : $sel;
			$this->start_controls_tab( $id . '_tab_' . $st, array( 'label' => $st_label ) );
			$this->add_control( $id . '_' . $st . '_color', array( 'label' => __( 'Text color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk ' . $s => 'color: {{VALUE}};' ) ) );
			$this->add_control( $id . '_' . $st . '_bg', array( 'label' => __( 'Background', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk ' . $s => 'background-color: {{VALUE}};' ) ) );
			$this->add_control( $id . '_' . $st . '_bc', array( 'label' => __( 'Border color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk ' . $s => 'border-color: {{VALUE}};' ) ) );
			$this->add_group_control( Group_Control_Box_Shadow::get_type(), array( 'name' => $id . '_' . $st . '_sh', 'selector' => '{{WRAPPER}} .wk ' . $s ) );
			$this->end_controls_tab();
		}
		$this->end_controls_tabs();
		$this->add_control( $id . '_bw', array(
			'label'      => __( 'Border width', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'separator'  => 'before',
			'range'      => array( 'px' => array( 'min' => 0, 'max' => 6, 'step' => .5 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk ' . $sel => 'border-width: {{SIZE}}{{UNIT}}; border-style: solid;' ),
		) );
		$this->add_responsive_control( $id . '_radius', array(
			'label'      => __( 'Corner radius', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'range'      => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk ' . $sel => 'border-radius: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( $id . '_pad', array(
			'label'      => __( 'Padding', 'wulf-kit' ),
			'type'       => Controls_Manager::DIMENSIONS,
			'size_units' => array( 'px', 'em' ),
			'selectors'  => array( '{{WRAPPER}} .wk ' . $sel => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( $id . '_minh', array(
			'label'      => __( 'Height', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'range'      => array( 'px' => array( 'min' => 24, 'max' => 80 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk ' . $sel => 'min-height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
	}

	/** Card / box: background, border, radius, shadow, padding, hover lift. */
	protected function box_style( $id, $label, $sel, $hover = true ) {
		$this->start_controls_section( 'wk_s_' . $id, array( 'label' => $label, 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->start_controls_tabs( $id . '_tabs' );
		foreach ( array( 'n' => __( 'Normal', 'wulf-kit' ), 'h' => __( 'Hover', 'wulf-kit' ) ) as $st => $st_label ) {
			if ( 'h' === $st && ! $hover ) {
				continue;
			}
			$s = 'h' === $st ? $sel . ':hover' : $sel;
			$this->start_controls_tab( $id . '_tab_' . $st, array( 'label' => $st_label ) );
			$this->add_control( $id . '_' . $st . '_bg', array( 'label' => __( 'Background', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk ' . $s => 'background-color: {{VALUE}};' ) ) );
			$this->add_control( $id . '_' . $st . '_bc', array( 'label' => __( 'Border color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk ' . $s => 'border-color: {{VALUE}};' ) ) );
			$this->add_group_control( Group_Control_Box_Shadow::get_type(), array( 'name' => $id . '_' . $st . '_sh', 'selector' => '{{WRAPPER}} .wk ' . $s ) );
			if ( 'h' === $st ) {
				$this->add_control( $id . '_lift', array(
					'label'     => __( 'Lift on hover (px)', 'wulf-kit' ),
					'type'      => Controls_Manager::SLIDER,
					'range'     => array( 'px' => array( 'min' => 0, 'max' => 16 ) ),
					'selectors' => array( '{{WRAPPER}} .wk ' . $s => 'transform: translateY(-{{SIZE}}px);' ),
				) );
			}
			$this->end_controls_tab();
		}
		$this->end_controls_tabs();
		$this->add_control( $id . '_bw', array(
			'label'     => __( 'Border width', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'separator' => 'before',
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 6, 'step' => .5 ) ),
			'selectors' => array( '{{WRAPPER}} .wk ' . $sel => 'border-width: {{SIZE}}{{UNIT}}; border-style: solid;' ),
		) );
		$this->add_responsive_control( $id . '_radius', array(
			'label'     => __( 'Corner radius', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
			'selectors' => array( '{{WRAPPER}} .wk ' . $sel => 'border-radius: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( $id . '_pad', array(
			'label'      => __( 'Padding', 'wulf-kit' ),
			'type'       => Controls_Manager::DIMENSIONS,
			'size_units' => array( 'px', 'em' ),
			'selectors'  => array( '{{WRAPPER}} .wk ' . $sel => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
	}

	/** A single color control in the current section. */
	protected function color( $id, $label, $sel, $prop = 'color' ) {
		$this->add_control( $id, array(
			'label'     => $label,
			'type'      => Controls_Manager::COLOR,
			'selectors' => array( '{{WRAPPER}} .wk ' . $sel => $prop . ': {{VALUE}};' ),
		) );
	}

	/** Grid columns / gap controls in the current section. */
	protected function grid_controls( $id, $sel, $cols_default = null, $max = 6 ) {
		$this->add_responsive_control( $id . '_cols', array(
			'label'     => __( 'Columns', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 1, 'max' => $max ) ),
			'selectors' => array( '{{WRAPPER}} .wk ' . $sel => 'grid-template-columns: repeat({{SIZE}}, minmax(0, 1fr));' ),
		) );
		$this->add_responsive_control( $id . '_gap', array(
			'label'     => __( 'Gap', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 80 ) ),
			'selectors' => array( '{{WRAPPER}} .wk ' . $sel => 'gap: {{SIZE}}{{UNIT}};' ),
		) );
	}

	/* ================================================================
	 * Products (OM style number or your own media)
	 * ============================================================== */

	/** Fields for one product, added to a repeater. */
	protected function product_fields( Repeater $r, $d = array() ) {
		$d = wp_parse_args( $d, array( 'id' => '', 'name' => '', 'price' => '', 'url' => '', 'metal' => 'white' ) );
		$r->add_control( 'source', array(
			'label'   => __( 'Photos & video from', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'om',
			'options' => array( 'om' => __( 'OM style number (automatic)', 'wulf-kit' ), 'custom' => __( 'My own uploads', 'wulf-kit' ) ),
		) );
		$r->add_control( 'style_no', array( 'label' => __( 'Style number', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => $d['id'], 'description' => __( 'e.g. 51157-E. With "OM style number" the photo and 360° videos load automatically.', 'wulf-kit' ) ) );
		$r->add_control( 'name', array( 'label' => __( 'Name', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => $d['name'], 'label_block' => true ) );
		$r->add_control( 'price', array( 'label' => __( 'Price text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => $d['price'], 'description' => __( 'e.g. $1,350. Shown as "From $1,350".', 'wulf-kit' ) ) );
		$r->add_control( 'link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'default' => array( 'url' => $d['url'] ), 'dynamic' => array( 'active' => true ) ) );
		$r->add_control( 'metals', array(
			'label'    => __( 'Metals to offer', 'wulf-kit' ),
			'type'     => Controls_Manager::SELECT2,
			'multiple' => true,
			'default'  => array( 'white', 'yellow', 'rose' ),
			'options'  => array( 'white' => __( 'White gold', 'wulf-kit' ), 'yellow' => __( 'Yellow gold', 'wulf-kit' ), 'rose' => __( 'Rose gold', 'wulf-kit' ) ),
		) );
		$r->add_control( 'metal', array(
			'label'   => __( 'Show first in', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => $d['metal'],
			'options' => array( 'white' => __( 'White gold', 'wulf-kit' ), 'yellow' => __( 'Yellow gold', 'wulf-kit' ), 'rose' => __( 'Rose gold', 'wulf-kit' ) ),
		) );
		$r->add_control( 'has_video', array(
			'label'        => __( 'Has 360° video', 'wulf-kit' ),
			'type'         => Controls_Manager::SWITCHER,
			'default'      => 'yes',
			'return_value' => 'yes',
			'condition'    => array( 'source' => 'om' ),
		) );
		$r->add_control( 'image', array( 'label' => __( 'Photo (white background)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'condition' => array( 'source' => 'custom' ) ) );
		$r->add_control( 'om_fill', array(
			'label'        => __( 'Missing metals from OM', 'wulf-kit' ),
			'type'         => Controls_Manager::SWITCHER,
			'default'      => 'yes',
			'return_value' => 'yes',
			'condition'    => array( 'source' => 'custom' ),
			'description'  => __( 'For a metal without your own video, play OM\'s video for this style number.', 'wulf-kit' ),
		) );
		foreach ( array( 'white' => __( 'white gold', 'wulf-kit' ), 'yellow' => __( 'yellow gold', 'wulf-kit' ), 'rose' => __( 'rose gold', 'wulf-kit' ) ) as $m => $ml ) {
			/* translators: %s: metal */
			$r->add_control( 'vid_' . $m, array( 'label' => sprintf( __( 'Video, %s', 'wulf-kit' ), $ml ), 'type' => Controls_Manager::MEDIA, 'media_types' => array( 'video' ), 'condition' => array( 'source' => 'custom' ) ) );
			/* translators: %s: metal */
			$r->add_control( 'post_' . $m, array( 'label' => sprintf( __( 'Still frame, %s', 'wulf-kit' ), $ml ), 'type' => Controls_Manager::MEDIA, 'condition' => array( 'source' => 'custom' ), 'description' => __( 'Shown before the video plays.', 'wulf-kit' ) ) );
		}
	}

	/**
	 * Everything the page needs for one product.
	 *
	 * @return array {id, n, p, u, img, m (first metal), media: {metal: {v, poster}}}
	 */
	protected function product_data( $it ) {
		$id     = trim( (string) ( $it['style_no'] ?? '' ) );
		$metals = array_values( array_intersect( array( 'white', 'yellow', 'rose' ), (array) ( $it['metals'] ?? array( 'white' ) ) ) );
		$media  = array();
		$img    = '';
		if ( 'custom' === ( $it['source'] ?? 'om' ) ) {
			$img  = $it['image']['url'] ?? '';
			$base = trailingslashit( WK_Settings::get( 'om_media' ) );
			foreach ( array( 'white', 'yellow', 'rose' ) as $m ) {
				$v = $it[ 'vid_' . $m ]['url'] ?? '';
				$p = $it[ 'post_' . $m ]['url'] ?? '';
				if ( ! $v && $id && 'yes' === ( $it['om_fill'] ?? '' ) ) {
					// Metals you didn't upload come from OM by style number.
					$v = $base . rawurlencode( $id ) . '.video.' . $m . '.mp4';
				}
				if ( $v || $p || ( 'white' === $m && $img ) ) {
					$media[ $m ] = array( 'v' => $v, 'poster' => $p ? $p : $img );
				}
			}
		} elseif ( $id ) {
			$base = trailingslashit( WK_Settings::get( 'om_media' ) );
			$img  = $base . rawurlencode( $id ) . '.jpg';
			foreach ( array( 'white', 'yellow', 'rose' ) as $m ) {
				$media[ $m ] = array( 'v' => 'yes' === ( $it['has_video'] ?? 'yes' ) ? $base . rawurlencode( $id ) . '.video.' . $m . '.mp4' : '', 'poster' => $img );
			}
		}
		$media = array_intersect_key( $media, array_flip( $metals ? $metals : array( 'white' ) ) );
		if ( ! $media && $img ) {
			$media['white'] = array( 'v' => '', 'poster' => $img );
		}
		$first = $it['metal'] ?? 'white';
		if ( ! isset( $media[ $first ] ) ) {
			$first = $media ? array_key_first( $media ) : 'white';
		}
		return array(
			'id'    => $id,
			'n'     => (string) ( $it['name'] ?? '' ),
			'p'     => (string) ( $it['price'] ?? '' ),
			'u'     => (string) ( $it['link']['url'] ?? '' ),
			'ext'   => ! empty( $it['link']['is_external'] ),
			'img'   => $img ? $img : ( $media[ $first ]['poster'] ?? '' ),
			'm'     => $first,
			'media' => $media,
		);
	}

	/** A catalog piece using the media bundled with the kit (other metals come from OM). */
	public static function demo_product( $id, $name, $price, $path, $metal = 'white', $bundled = array() ) {
		$m  = WK_URL . 'assets/media/';
		$it = array(
			'source'     => 'custom',
			'style_no'   => $id,
			'name'       => $name,
			'price'      => $price,
			'metal'      => $metal,
			'metals'     => array( 'white', 'yellow', 'rose' ),
			'om_fill'    => 'yes',
			'has_video'  => 'yes',
			'link'       => array( 'url' => home_url( '/catalog/' . $path ) ),
			'image'      => array( 'url' => $m . $id . '.webp' ),
			'vid_white'  => array( 'url' => in_array( 'white', $bundled, true ) ? $m . $id . '.mp4' : '' ),
			'post_white' => array( 'url' => in_array( 'white', $bundled, true ) ? $m . $id . '-v0.webp' : '' ),
		);
		foreach ( array( 'yellow', 'rose' ) as $mm ) {
			if ( in_array( $mm, $bundled, true ) ) {
				$it[ 'vid_' . $mm ]  = array( 'url' => $m . $id . '.' . $mm . '.mp4' );
				$it[ 'post_' . $mm ] = array( 'url' => $m . $id . '.' . $mm . '-v0.webp' );
			}
		}
		return $it;
	}

	/* ================================================================
	 * Render helpers
	 * ============================================================== */

	/** Opening wrapper; the script finds widgets by data-wk. */
	protected function open( $s, $extra_class = '', $cfg = null ) {
		$attrs = 'class="wk wk-' . esc_attr( $this->key ) . ( $extra_class ? ' ' . esc_attr( $extra_class ) : '' ) . '" data-wk="' . esc_attr( $this->key ) . '"';
		if ( null !== $cfg ) {
			$attrs .= " data-wk-cfg='" . esc_attr( wp_json_encode( $cfg ) ) . "'";
		}
		echo '<div ' . $attrs . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	protected function close() {
		echo '</div>';
	}

	/** Section classes from the Section controls. */
	protected function sec_class( $s, $base = 'sec' ) {
		$c = array( $base );
		if ( 'ivory' === ( $s['tone'] ?? '' ) ) {
			$c[] = 'ivory';
		} elseif ( 'dark' === ( $s['tone'] ?? '' ) ) {
			$c[] = 'dark';
		}
		if ( 'yes' === ( $s['rule'] ?? '' ) ) {
			$c[] = 'rule';
		}
		if ( 'yes' === ( $s['join'] ?? '' ) ) {
			$c[] = 'join';
		}
		$t = $s['text_on'] ?? 'auto';
		if ( 'light' === $t ) {
			$c[] = 'txt-light';
			if ( ! in_array( 'dark', $c, true ) ) {
				$c[] = 'dark';
			}
		} elseif ( 'dark' === $t ) {
			$c   = array_values( array_diff( $c, array( 'dark' ) ) );
			$c[] = 'txt-dark';
		}
		return implode( ' ', $c );
	}

	protected function anchor_attr( $s ) {
		$a = sanitize_title( $s['anchor'] ?? '' );
		return $a ? ' id="' . esc_attr( $a ) . '"' : '';
	}

	/** Title with *stars* turned into gold italics. */
	public static function rich( $text ) {
		$t = esc_html( (string) $text );
		$t = preg_replace( '/\*([^*]+)\*/', '<span class="gold-em">$1</span>', $t );
		return nl2br( $t );
	}

	/** Small label + title + intro, using the Heading controls. */
	protected function head( $s, $extra = '', $id = '' ) {
		if ( '' === trim( $s['eyebrow'] . $s['title'] . $s['lead'] ) && ! $extra ) {
			return;
		}
		$tag = in_array( $s['title_tag'] ?? 'h2', array( 'h1', 'h2', 'h3', 'div' ), true ) ? $s['title_tag'] : 'h2';
		echo '<div class="shead' . ( 'center' === ( $s['head_align'] ?? '' ) ? ' center' : '' ) . '"><div>';
		if ( $s['eyebrow'] ) {
			echo '<p class="eyebrow">' . esc_html( $s['eyebrow'] ) . '</p>';
		}
		if ( $s['title'] ) {
			echo '<' . $tag . ' class="h2"' . ( $id ? ' id="' . esc_attr( $id ) . '"' : '' ) . '>' . self::rich( $s['title'] ) . '</' . $tag . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( $s['lead'] ) {
			echo '<p class="lead">' . esc_html( $s['lead'] ) . '</p>';
		}
		echo '</div>' . $extra . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/** href/target/rel for a URL control value. */
	public static function link_attrs( $link, $fallback = '#' ) {
		$url = is_array( $link ) ? ( $link['url'] ?? '' ) : (string) $link;
		$url = '' === $url ? $fallback : $url;
		if ( '#visit' === $url ) {
			$url = WK_Settings::get( 'book_url', '#visit' );
			if ( '#visit' === $url && class_exists( 'WK_Pages' ) ) {
				// The script keeps visitors on this page when it has its own visit form.
				$url = WK_Pages::url( 'contact-us', '#visit' );
			}
		}
		$out = ' href="' . esc_url( $url ) . '"';
		if ( is_array( $link ) && ! empty( $link['is_external'] ) ) {
			$out .= ' target="_blank" rel="noopener' . ( ! empty( $link['nofollow'] ) ? ' nofollow' : '' ) . '"';
		} elseif ( is_array( $link ) && ! empty( $link['nofollow'] ) ) {
			$out .= ' rel="nofollow"';
		}
		return $out;
	}

	/** A styled button from a text + link pair (empty text = nothing). */
	protected function button( $s, $id, $class, $arrow = false ) {
		$text = $s[ $id . '_text' ] ?? '';
		if ( '' === trim( (string) $text ) ) {
			return '';
		}
		$topic = isset( $s[ $id . '_topic' ] ) && $s[ $id . '_topic' ] ? ' data-topic="' . esc_attr( $s[ $id . '_topic' ] ) . '"' : '';
		return '<a class="' . esc_attr( $class ) . '"' . self::link_attrs( $s[ $id . '_link' ] ?? '' ) . $topic . '>' . esc_html( $text ) . ( $arrow ? ' ' . WK_Icons::svg( 'arr', 'arr' ) : '' ) . '</a>';
	}

	protected function img_url( $media, $fallback = '' ) {
		if ( ! empty( $media['id'] ) ) {
			$src = wp_get_attachment_image_url( (int) $media['id'], 'large' );
			if ( $src ) {
				return $src;
			}
		}
		return ! empty( $media['url'] ) ? $media['url'] : $fallback;
	}
}
