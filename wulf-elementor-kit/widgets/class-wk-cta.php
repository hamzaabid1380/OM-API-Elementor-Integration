<?php
/**
 * Call-to-action band: title, text, buttons, phone line, optional picture.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;

class WK_Cta_Widget extends WK_Widget {

	protected $key = 'cta';

	public function get_title() {
		return __( 'Wulf · Call to action', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-call-to-action';
	}

	protected function register_controls() {
		$this->section_controls( array( 'tone' => 'dark' ) );
		$this->start_controls_section( 'c_text', array( 'label' => __( 'Text & buttons', 'wulf-kit' ) ) );
		$this->add_control( 'eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Free consultation', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'Come and see it *in person*.', 'wulf-kit' ), 'description' => __( 'Wrap words in *stars* to show them in gold italics.', 'wulf-kit' ) ) );
		$this->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'Walk-ins are always welcome. Book ahead and we\'ll have a private table ready.', 'wulf-kit' ) ) );
		$this->button_fields( 'b1', __( 'Main button', 'wulf-kit' ), __( 'Book a free consultation', 'wulf-kit' ), '#visit', true );
		$this->button_fields( 'b2', __( 'Second button', 'wulf-kit' ), __( 'Get directions', 'wulf-kit' ), '' );
		$this->add_control( 'b2_maps', array( 'label' => __( 'Second button opens Google Maps', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'description' => __( 'Uses the directions link from Wulf Kit settings.', 'wulf-kit' ) ) );
		$this->add_control( 'call_line', array( 'label' => __( 'Phone line with open status', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'separator' => 'before' ) );
		$this->add_control( 'phone', array( 'label' => __( 'Phone (optional)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'Empty uses the main phone from settings.', 'wulf-kit' ), 'condition' => array( 'call_line' => 'yes' ) ) );
		$this->add_control( 'layout', array(
			'label'     => __( 'Layout', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => 'stage',
			'separator' => 'before',
			'options'   => array( 'stage' => __( 'Showcase: a piece in a pool of light', 'wulf-kit' ), 'band' => __( 'Full band', 'wulf-kit' ), 'card' => __( 'Card inside the page width', 'wulf-kit' ), 'center' => __( 'Centered', 'wulf-kit' ) ),
		) );
		$this->add_control( 'image', array( 'label' => __( 'Picture', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'description' => __( 'Showcase: a product photo on white works best (the white becomes the light). Empty shows a ring from the kit. Other layouts: optional.', 'wulf-kit' ) ) );
		$this->add_control( 'video', array( 'label' => __( '360° video (Showcase, optional)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'media_types' => array( 'video' ), 'condition' => array( 'layout' => 'stage' ), 'description' => __( 'A video on a white background, played while the section is on screen.', 'wulf-kit' ) ) );
		$this->end_controls_section();

		$this->style_section();
		$this->start_controls_section( 's_card', array( 'label' => __( 'Card', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'card_bg', __( 'Card background', 'wulf-kit' ), '.cta-box', 'background-color' );
		$this->color( 'card_bd', __( 'Card border', 'wulf-kit' ), '.cta-box', 'border-color' );
		$this->add_responsive_control( 'card_r', array(
			'label'     => __( 'Card corners', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .cta-box' => 'border-radius: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'card_pad', array(
			'label'      => __( 'Card padding', 'wulf-kit' ),
			'type'       => Controls_Manager::DIMENSIONS,
			'size_units' => array( 'px', 'em' ),
			'selectors'  => array( '{{WRAPPER}} .wk .cta-box' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
		$this->start_controls_section( 's_stage', array( 'label' => __( 'Pool of light (Showcase)', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE, 'condition' => array( 'layout' => 'stage' ) ) );
		$this->color( 'pool', __( 'Light color', 'wulf-kit' ), '.cta-pool', '--pool' );
		$this->color( 'orbit', __( 'Thin ring and its spark', 'wulf-kit' ), '.cta-pool', '--orbit' );
		$this->end_controls_section();
		$this->text_style( 'kicker', __( 'Small label', 'wulf-kit' ), '.cta-box .eyebrow' );
		$this->text_style( 'title', __( 'Title', 'wulf-kit' ), '.cta-box .h2', false, true, array(
			'em' => array( 'label' => __( 'Gold words color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .cta-box .h2 .gold-em' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'body', __( 'Text', 'wulf-kit' ), '.cta-box .lead' );
		$this->button_style( 'b1', __( 'Main button', 'wulf-kit' ), '.cta-box .btn-main' );
		$this->button_style( 'b2', __( 'Second button', 'wulf-kit' ), '.cta-box .btn-second' );
		$this->text_style( 'call', __( 'Phone line', 'wulf-kit' ), '.cta-call', false, true, array(
			'link' => array( 'label' => __( 'Phone color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .cta-call a' => 'color: {{VALUE}};' ) ),
		) );
	}

	protected function render() {
		$s    = $this->get_settings_for_display();
		$dark = 'dark' === ( $s['tone'] ?? '' );
		if ( 'yes' === $s['b2_maps'] && WK_Settings::get( 'maps_url' ) ) {
			$s['b2_link'] = array( 'url' => WK_Settings::get( 'maps_url' ), 'is_external' => 'on' );
		}
		$stage = 'stage' === ( $s['layout'] ?? '' );
		$img   = $this->img_url( $s['image'] );
		$vid   = $stage ? (string) ( $s['video']['url'] ?? '' ) : '';
		if ( $stage && ! $img ) {
			$img = WK_URL . 'assets/media/85275.webp';
			$vid = $vid ? $vid : WK_URL . 'assets/media/85275.mp4';
		}
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s, 'sec cta cta-' . $s['layout'] ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap"><div class="cta-box' . ( $img ? ' has-media' : '' ) . '"><div class="cta-copy">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $s['eyebrow'] ) {
			echo '<p class="eyebrow">' . esc_html( $s['eyebrow'] ) . '</p>';
		}
		if ( $s['title'] ) {
			echo '<h2 class="h2">' . self::rich( $s['title'] ) . '</h2>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( $s['text'] ) {
			echo '<p class="lead">' . esc_html( $s['text'] ) . '</p>';
		}
		$b = $this->button( $s, 'b1', 'btn btn-main ' . ( $dark ? 'btn-gold' : 'btn-ink' ), true ) . $this->button( $s, 'b2', 'btn btn-second ' . ( $dark ? 'btn-ghost' : 'btn-line' ) );
		if ( $b ) {
			echo '<div class="cta-btns">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		$phone = trim( (string) $s['phone'] ) ? trim( $s['phone'] ) : WK_Settings::get( 'phone' );
		if ( 'yes' === $s['call_line'] && $phone ) {
			echo '<p class="cta-call">' . WK_Icons::svg( 'phone' ) . '<a href="' . esc_attr( WK_Settings::tel( $phone ) ) . '">' . esc_html( $phone ) . '</a> · <span data-status-text></span></p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div>';
		if ( $stage ) {
			// The piece sits in a soft pool of light, with a thin ring and a spark circling it.
			echo '<div class="cta-media"><div class="cta-pool"><span class="cta-orbit" aria-hidden="true"></span><span class="cta-piece' . ( $vid ? ' pv" data-autoplay' : '"' ) . '><img src="' . esc_url( $img ) . '" alt="" loading="lazy" decoding="async">';
			if ( $vid ) {
				echo '<video muted loop playsinline preload="none" data-src="' . esc_url( $vid ) . '" aria-hidden="true"></video>';
			}
			echo '</span></div></div>';
		} elseif ( $img ) {
			echo '<div class="cta-media"><img src="' . esc_url( $img ) . '" alt="" loading="lazy" decoding="async"></div>';
		}
		echo '</div></div></section>';
		$this->close();
	}
}
