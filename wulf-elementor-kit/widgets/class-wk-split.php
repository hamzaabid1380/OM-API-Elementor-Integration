<?php
/**
 * Text beside a picture: heading, rich text, tick list, buttons. Picture left or right.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Split_Widget extends WK_Widget {

	protected $key = 'split';

	public function get_title() {
		return __( 'Wulf · Text & picture', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-image-box';
	}

	protected function register_controls() {
		$this->section_controls();
		$this->start_controls_section( 'c_text', array( 'label' => __( 'Text', 'wulf-kit' ) ) );
		$this->add_control( 'eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Small label', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'A short, clear *title*.', 'wulf-kit' ), 'description' => __( 'Wrap words in *stars* to show them in gold italics.', 'wulf-kit' ) ) );
		$this->add_control( 'title_tag', array( 'label' => __( 'Title tag', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'h2', 'options' => array( 'h1' => 'H1', 'h2' => 'H2', 'h3' => 'H3', 'div' => 'div' ) ) );
		$this->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::WYSIWYG, 'default' => '<p>' . __( 'Write a few friendly sentences here.', 'wulf-kit' ) . '</p>' ) );
		$r = new Repeater();
		$r->add_control( 'text', array( 'label' => __( 'Point', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true ) );
		$this->add_control( 'points', array(
			'label'       => __( 'Tick list', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ text }}}',
			'default'     => array(),
		) );
		$this->add_control( 'icon', array( 'label' => __( 'List icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'check', 'options' => WK_Icons::options() ) );
		$this->button_fields( 'b1', __( 'Main button', 'wulf-kit' ), __( 'Book a free consultation', 'wulf-kit' ), '#visit', true );
		$this->button_fields( 'b2', __( 'Second link', 'wulf-kit' ), '', '' );
		$this->end_controls_section();

		$this->start_controls_section( 'c_media', array( 'label' => __( 'Picture', 'wulf-kit' ) ) );
		$this->add_control( 'image', array( 'label' => __( 'Picture', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA ) );
		$this->add_control( 'style_no', array( 'label' => __( 'Or an OM style number', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'Used when no picture is chosen. Shows the OM photo on white.', 'wulf-kit' ) ) );
		$this->add_control( 'side', array(
			'label'   => __( 'Picture side', 'wulf-kit' ),
			'type'    => Controls_Manager::CHOOSE,
			'default' => 'right',
			'options' => array(
				'left'  => array( 'title' => __( 'Left', 'wulf-kit' ), 'icon' => 'eicon-h-align-left' ),
				'right' => array( 'title' => __( 'Right', 'wulf-kit' ), 'icon' => 'eicon-h-align-right' ),
			),
		) );
		$this->add_control( 'fit', array(
			'label'   => __( 'Picture fit', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'cover',
			'options' => array( 'contain' => __( 'Product on white', 'wulf-kit' ), 'cover' => __( 'Fill the frame', 'wulf-kit' ) ),
		) );
		$this->add_control( 'cap', array( 'label' => __( 'Caption (optional)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$this->end_controls_section();

		$this->style_section();
		$this->start_controls_section( 's_layout', array( 'label' => __( 'Layout', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'split', array(
			'label'      => __( 'Text column width (%)', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( '%' ),
			'range'      => array( '%' => array( 'min' => 30, 'max' => 70 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk .split.has-media' => '--split: {{SIZE}}%;' ),
		) );
		$this->add_responsive_control( 'ratio', array(
			'label'     => __( 'Picture shape (height ÷ width)', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => .4, 'max' => 1.6, 'step' => .05 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .split-media' => 'aspect-ratio: 1 / {{SIZE}};' ),
		) );
		$this->color( 'media_bg', __( 'Picture background', 'wulf-kit' ), '.split-media', 'background-color' );
		$this->color( 'media_bd', __( 'Picture border', 'wulf-kit' ), '.split-media', 'border-color' );
		$this->add_responsive_control( 'media_r', array(
			'label'     => __( 'Picture corners', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .split-media' => 'border-radius: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
		$this->text_style( 'kicker', __( 'Small label', 'wulf-kit' ), '.split .eyebrow' );
		$this->text_style( 'title', __( 'Title', 'wulf-kit' ), '.split .h2', false, true, array(
			'em' => array( 'label' => __( 'Gold words color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .split .h2 .gold-em' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'body', __( 'Text', 'wulf-kit' ), '.split-text', false, true, array(
			'a'  => array( 'label' => __( 'Link color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .split-text a' => 'color: {{VALUE}};' ) ),
			'ah' => array( 'label' => __( 'Link hover color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .split-text a:hover' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'pts', __( 'Tick list', 'wulf-kit' ), '.tick-list li', false, true, array(
			'ic' => array( 'label' => __( 'Icon color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .tick-list svg' => 'color: {{VALUE}};' ) ),
		) );
		$this->button_style( 'b1', __( 'Main button', 'wulf-kit' ), '.split .btn-main' );
		$this->text_style( 'b2', __( 'Second link', 'wulf-kit' ), '.split .link', true );
		$this->text_style( 'cap', __( 'Caption', 'wulf-kit' ), '.split-cap' );
	}

	protected function render() {
		$s   = $this->get_settings_for_display();
		$img = $this->img_url( $s['image'] );
		if ( ! $img && trim( (string) $s['style_no'] ) ) {
			$img = trailingslashit( WK_Settings::get( 'om_media' ) ) . rawurlencode( trim( $s['style_no'] ) ) . '.jpg';
		}
		$dark = 'dark' === ( $s['tone'] ?? '' );
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap split' . ( $img ? ' has-media' : '' ) . ( 'left' === $s['side'] ? ' media-left' : '' ) . '"><div class="split-copy">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $s['eyebrow'] ) {
			echo '<p class="eyebrow">' . esc_html( $s['eyebrow'] ) . '</p>';
		}
		if ( $s['title'] ) {
			$tag = in_array( $s['title_tag'], array( 'h1', 'h2', 'h3', 'div' ), true ) ? $s['title_tag'] : 'h2';
			echo '<' . $tag . ' class="h2">' . self::rich( $s['title'] ) . '</' . $tag . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( trim( wp_strip_all_tags( (string) $s['text'] ) ) ) {
			echo '<div class="split-text">' . wp_kses_post( $this->parse_text_editor( $s['text'] ) ) . '</div>';
		}
		if ( $s['points'] ) {
			echo '<ul class="tick-list">';
			foreach ( $s['points'] as $p ) {
				echo '<li>' . WK_Icons::svg( $s['icon'] ) . '<span>' . esc_html( $p['text'] ) . '</span></li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</ul>';
		}
		$b = $this->button( $s, 'b1', 'btn btn-main ' . ( $dark ? 'btn-gold' : 'btn-ink' ), true ) . $this->button( $s, 'b2', 'link', true );
		if ( $b ) {
			echo '<div class="split-cta">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div>';
		if ( $img ) {
			echo '<figure class="split-fig"><div class="split-media' . ( 'cover' === $s['fit'] ? ' fit-cover' : '' ) . '"><img src="' . esc_url( $img ) . '" alt="' . esc_attr( $s['cap'] ? $s['cap'] : wp_strip_all_tags( str_replace( '*', '', $s['title'] ) ) ) . '" loading="lazy" decoding="async"></div>';
			if ( $s['cap'] ) {
				echo '<figcaption class="split-cap">' . esc_html( $s['cap'] ) . '</figcaption>';
			}
			echo '</figure>';
		}
		echo '</div></section>';
		$this->close();
	}
}
