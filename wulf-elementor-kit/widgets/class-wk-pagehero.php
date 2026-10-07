<?php
/**
 * Page banner for inner pages: breadcrumb, headline, intro, buttons, and a picture
 * (your photo, or an OM product on white by style number).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Pagehero_Widget extends WK_Widget {

	protected $key = 'pagehero';

	public function get_title() {
		return __( 'Wulf · Page banner', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-banner';
	}

	protected function register_controls() {
		$this->section_controls( array( 'tone' => 'dark' ) );

		$this->start_controls_section( 'c_text', array( 'label' => __( 'Text & buttons', 'wulf-kit' ) ) );
		$this->add_control( 'crumbs', array( 'label' => __( 'Breadcrumb (Home / …)', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'crumb_mid', array( 'label' => __( 'Middle step (optional)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'e.g. Services', 'wulf-kit' ), 'condition' => array( 'crumbs' => 'yes' ) ) );
		$this->add_control( 'crumb_mid_link', array( 'label' => __( 'Middle step link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'condition' => array( 'crumbs' => 'yes' ) ) );
		$this->add_control( 'crumb_last', array( 'label' => __( 'Last step', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'Empty uses the page title.', 'wulf-kit' ), 'condition' => array( 'crumbs' => 'yes' ) ) );
		$this->add_control( 'eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Wulf Diamond Jewelers · Crown Point', 'wulf-kit' ), 'label_block' => true, 'separator' => 'before' ) );
		$this->add_control( 'title', array( 'label' => __( 'Headline', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'A page *title* goes here.', 'wulf-kit' ), 'description' => __( 'Wrap words in *stars* for gold italics.', 'wulf-kit' ) ) );
		$this->add_control( 'title_tag', array( 'label' => __( 'Headline tag', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'h1', 'options' => array( 'h1' => 'H1', 'h2' => 'H2', 'div' => 'div' ) ) );
		$this->add_control( 'lead', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => '' ) );
		$this->button_fields( 'b1', __( 'Main button', 'wulf-kit' ), __( 'Book a visit', 'wulf-kit' ), '#visit', true );
		$this->button_fields( 'b2', __( 'Second button', 'wulf-kit' ), '', '' );
		$this->add_control( 'call_line', array( 'label' => __( '"Or call…" line with open status', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'separator' => 'before' ) );
		$this->add_control( 'call_text', array( 'label' => __( 'Starts with', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Or call', 'wulf-kit' ), 'condition' => array( 'call_line' => 'yes' ) ) );
		$r = new Repeater();
		$r->add_control( 'icon', array( 'label' => __( 'Icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'check', 'options' => WK_Icons::options() ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$this->add_control( 'trust', array(
			'label'       => __( 'Short points', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ text }}}',
			'separator'   => 'before',
			'default'     => array(),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_media', array( 'label' => __( 'Picture', 'wulf-kit' ) ) );
		$this->add_control( 'media', array(
			'label'   => __( 'Show', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'image',
			'options' => array( 'none' => __( 'No picture (text only)', 'wulf-kit' ), 'image' => __( 'My picture', 'wulf-kit' ), 'om' => __( 'OM product by style number', 'wulf-kit' ) ),
		) );
		$this->add_control( 'image', array( 'label' => __( 'Picture', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'condition' => array( 'media' => 'image' ) ) );
		$this->add_control( 'style_no', array( 'label' => __( 'Style number', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'condition' => array( 'media' => 'om' ), 'description' => __( 'e.g. 85121. The OM photo on white is used.', 'wulf-kit' ) ) );
		$this->add_control( 'fit', array(
			'label'     => __( 'Picture fit', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => 'contain',
			'options'   => array( 'contain' => __( 'Product on white', 'wulf-kit' ), 'cover' => __( 'Fill the frame', 'wulf-kit' ) ),
			'condition' => array( 'media' => 'image' ),
		) );
		$this->add_control( 'cap', array( 'label' => __( 'Caption (optional)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'condition' => array( 'media!' => 'none' ) ) );
		$this->add_control( 'cap_link', array( 'label' => __( 'Caption link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'condition' => array( 'media!' => 'none' ) ) );
		$this->end_controls_section();

		$this->style_section( '.pgh' );
		$this->start_controls_section( 's_layout', array( 'label' => __( 'Layout', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'split', array(
			'label'      => __( 'Text column width (%)', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'range'      => array( '%' => array( 'min' => 30, 'max' => 75 ) ),
			'size_units' => array( '%' ),
			'selectors'  => array( '{{WRAPPER}} .wk .pgh.has-media .pgh-grid' => 'grid-template-columns: {{SIZE}}% 1fr;' ),
		) );
		$this->add_responsive_control( 'min_h', array(
			'label'     => __( 'Minimum height', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 900 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .pgh-grid' => 'min-height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_control( 'align', array(
			'label'   => __( 'Text alignment (no picture)', 'wulf-kit' ),
			'type'    => Controls_Manager::CHOOSE,
			'default' => 'left',
			'options' => array(
				'left'   => array( 'title' => __( 'Left', 'wulf-kit' ), 'icon' => 'eicon-text-align-left' ),
				'center' => array( 'title' => __( 'Center', 'wulf-kit' ), 'icon' => 'eicon-text-align-center' ),
			),
		) );
		$this->color( 'media_bg', __( 'Picture background', 'wulf-kit' ), '.pgh-media', 'background-color' );
		$this->add_responsive_control( 'media_r', array(
			'label'     => __( 'Picture corners', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .pgh-media' => 'border-radius: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
		$this->text_style( 'crumb', __( 'Breadcrumb', 'wulf-kit' ), '.crumbs', '.crumbs a:hover' );
		$this->text_style( 'kicker', __( 'Small label', 'wulf-kit' ), '.pgh .eyebrow' );
		$this->text_style( 'title', __( 'Headline', 'wulf-kit' ), '.pgh-title', false, true, array(
			'em' => array( 'label' => __( 'Gold words color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .pgh-title .gold-em' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'lead', __( 'Text', 'wulf-kit' ), '.pgh .lead' );
		$this->button_style( 'b1', __( 'Main button', 'wulf-kit' ), '.pgh-cta .btn-main' );
		$this->button_style( 'b2', __( 'Second button', 'wulf-kit' ), '.pgh-cta .btn-second' );
		$this->text_style( 'call', __( '"Or call" line', 'wulf-kit' ), '.pgh-call', false, true, array(
			'link' => array( 'label' => __( 'Phone color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .pgh-call a' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'trust', __( 'Short points', 'wulf-kit' ), '.pgh .trust li', false, true, array(
			'ic'   => array( 'label' => __( 'Icon color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .pgh .trust svg' => 'color: {{VALUE}};' ) ),
			'line' => array( 'label' => __( 'Line above', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .pgh .trust' => 'border-top-color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'cap', __( 'Caption', 'wulf-kit' ), '.pgh-cap', '.pgh-cap a:hover' );
	}

	protected function render() {
		$s   = $this->get_settings_for_display();
		$img = '';
		if ( 'image' === $s['media'] ) {
			$img = $this->img_url( $s['image'] );
		} elseif ( 'om' === $s['media'] && trim( (string) $s['style_no'] ) ) {
			$img = trailingslashit( WK_Settings::get( 'om_media' ) ) . rawurlencode( trim( $s['style_no'] ) ) . '.jpg';
		}
		$dark  = 'dark' === ( $s['tone'] ?? '' );
		$class = $this->sec_class( $s, 'pgh' ) . ( $img ? ' has-media' : ' no-media' ) . ( ! $img && 'center' === $s['align'] ? ' center' : '' );
		$this->open( $s );
		echo '<section class="' . esc_attr( $class ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap pgh-grid"><div class="pgh-copy">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( 'yes' === $s['crumbs'] ) {
			$last = $s['crumb_last'] ? $s['crumb_last'] : get_the_title();
			echo '<nav class="crumbs" aria-label="' . esc_attr__( 'Breadcrumb', 'wulf-kit' ) . '"><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'wulf-kit' ) . '</a>';
			if ( $s['crumb_mid'] ) {
				echo '<span aria-hidden="true">/</span>' . ( ! empty( $s['crumb_mid_link']['url'] ) ? '<a' . self::link_attrs( $s['crumb_mid_link'] ) . '>' . esc_html( $s['crumb_mid'] ) . '</a>' : '<span>' . esc_html( $s['crumb_mid'] ) . '</span>' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			if ( $last ) {
				echo '<span aria-hidden="true">/</span><span aria-current="page">' . esc_html( $last ) . '</span>';
			}
			echo '</nav>';
		}
		if ( $s['eyebrow'] ) {
			echo '<p class="eyebrow">' . esc_html( $s['eyebrow'] ) . '</p>';
		}
		$tag = in_array( $s['title_tag'], array( 'h1', 'h2', 'div' ), true ) ? $s['title_tag'] : 'h1';
		echo '<' . $tag . ' class="h1 pgh-title">' . self::rich( $s['title'] ) . '</' . $tag . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $s['lead'] ) {
			echo '<p class="lead">' . esc_html( $s['lead'] ) . '</p>';
		}
		$b = $this->button( $s, 'b1', 'btn btn-main ' . ( $dark ? 'btn-gold' : 'btn-ink' ), true ) . $this->button( $s, 'b2', 'btn btn-second ' . ( $dark ? 'btn-ghost' : 'btn-line' ) );
		if ( $b ) {
			echo '<div class="pgh-cta">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		$phone = WK_Settings::get( 'phone' );
		if ( 'yes' === $s['call_line'] && $phone ) {
			echo '<p class="pgh-call">' . esc_html( $s['call_text'] ) . ' <a href="' . esc_attr( WK_Settings::tel() ) . '">' . esc_html( $phone ) . '</a> · <span data-status-text></span></p>';
		}
		if ( $s['trust'] ) {
			echo '<ul class="trust">';
			foreach ( $s['trust'] as $t ) {
				echo '<li>' . WK_Icons::svg( $t['icon'] ) . esc_html( $t['text'] ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</ul>';
		}
		echo '</div>';
		if ( $img ) {
			$fit = 'image' === $s['media'] && 'cover' === $s['fit'] ? ' fit-cover' : '';
			echo '<figure class="pgh-media' . esc_attr( $fit ) . '"><img src="' . esc_url( $img ) . '" alt="' . esc_attr( wp_strip_all_tags( $s['cap'] ? $s['cap'] : str_replace( '*', '', $s['title'] ) ) ) . '" decoding="async" fetchpriority="high">';
			if ( $s['cap'] ) {
				$cap = esc_html( $s['cap'] );
				echo '<figcaption class="pgh-cap">' . ( ! empty( $s['cap_link']['url'] ) ? '<a' . self::link_attrs( $s['cap_link'] ) . '>' . $cap . ' ' . WK_Icons::svg( 'arr' ) . '</a>' : $cap ) . '</figcaption>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</figure>';
		}
		echo '</div></section>';
		$this->close();
	}
}
