<?php
/**
 * Collection tiles: one big tile and smaller ones, each a product on white (photo or turning video).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Tiles_Widget extends WK_Widget {

	protected $key = 'tiles';

	public function get_title() {
		return __( 'Wulf · Collection tiles', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-gallery-grid';
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'collection' ) );
		$this->head_controls( array( 'eyebrow' => __( 'The collection', 'wulf-kit' ), 'title' => __( 'Find the piece that feels like you.', 'wulf-kit' ), 'align' => 'center' ) );

		$this->start_controls_section( 'c_tiles', array( 'label' => __( 'Tiles', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => '' ) );
		$r->add_control( 'link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'dynamic' => array( 'active' => true ) ) );
		$r->add_control( 'image', array( 'label' => __( 'Photo', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA ) );
		$r->add_control( 'video', array( 'label' => __( 'Turning video (optional)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'media_types' => array( 'video' ), 'description' => __( 'Plays while the tile is on screen.', 'wulf-kit' ) ) );
		$r->add_control( 'big', array( 'label' => __( 'Big tile', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes' ) );
		$r->add_control( 'fit', array(
			'label'   => __( 'Photo fit', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'contain',
			'options' => array( 'contain' => __( 'Product on white', 'wulf-kit' ), 'cover' => __( 'Fill the tile', 'wulf-kit' ) ),
		) );
		$m = WK_URL . 'assets/media/';
		$h = home_url( '/' );
		$this->add_control( 'tiles', array(
			'label'       => __( 'Tiles', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'default'     => array(
				array( 'title' => __( 'Engagement rings', 'wulf-kit' ), 'text' => __( 'Solitaire, hidden halo, three stone and more. From $1,144.', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'engagement-rings' ) ), 'image' => array( 'url' => $m . '51162-E.webp' ), 'video' => array( 'url' => $m . '51162-E.mp4' ), 'big' => 'yes' ),
				array( 'title' => __( 'Earrings', 'wulf-kit' ), 'text' => __( 'Studs, halos, hoops and huggies.', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'earrings' ) ), 'image' => array( 'url' => $m . '40927.webp' ) ),
				array( 'title' => __( 'Bracelets', 'wulf-kit' ), 'text' => __( 'Nameplate, monogram and polished.', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'bracelets' ) ), 'image' => array( 'url' => $m . 'PBR0026.webp' ) ),
				array( 'title' => __( 'Necklaces', 'wulf-kit' ), 'text' => __( 'Tennis, station and paperclip.', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'necklaces' ) ), 'image' => array( 'url' => $m . '60023.webp' ) ),
				array( 'title' => __( 'Pendants', 'wulf-kit' ), 'text' => __( 'Solitaires, circles, crosses and initials.', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'pendants' ) ), 'image' => array( 'url' => $m . '31483.webp' ) ),
			),
		) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->start_controls_section( 's_grid', array( 'label' => __( 'Grid', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'gap', array(
			'label'     => __( 'Gap', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .cats' => 'gap: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'big_h', array(
			'label'     => __( 'Big tile picture height', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 200, 'max' => 900 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .tile.big .slot' => 'min-height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'img_pad', array(
			'label'     => __( 'Space around the product (%)', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( '%' => array( 'min' => 0, 'max' => 25 ) ),
			'size_units' => array( '%' ),
			'selectors' => array( '{{WRAPPER}} .wk .slot.pv > img, {{WRAPPER}} .wk .slot.pv > video' => 'inset: {{SIZE}}%; width: calc(100% - 2 * {{SIZE}}%); height: calc(100% - 2 * {{SIZE}}%);' ),
		) );
		$this->color( 'img_bg', __( 'Picture background', 'wulf-kit' ), '.tile .slot', 'background-color' );
		$this->add_control( 'zoom', array(
			'label'     => __( 'Zoom on hover', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 1, 'max' => 1.2, 'step' => .01 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .tile:hover .slot > img' => 'transform: scale({{SIZE}});' ),
		) );
		$this->end_controls_section();
		$this->box_style( 'tile', __( 'Tile', 'wulf-kit' ), '.tile' );
		$this->text_style( 't', __( 'Tile titles', 'wulf-kit' ), '.tile .h3 a', true );
		$this->text_style( 'x', __( 'Tile text', 'wulf-kit' ), '.tile .meta p' );
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo '<div class="cats">';
		foreach ( (array) $s['tiles'] as $t ) {
			$img   = $this->img_url( $t['image'] );
			$vid   = $t['video']['url'] ?? '';
			$cover = 'cover' === ( $t['fit'] ?? '' ) ? ' fit-cover' : '';
			echo '<article class="tile' . ( 'yes' === $t['big'] ? ' big' : '' ) . '"><div class="slot pv' . esc_attr( $cover ) . '"' . ( $vid ? ' data-autoplay' : '' ) . '>';
			if ( $img ) {
				echo '<img src="' . esc_url( $img ) . '" alt="' . esc_attr( $t['title'] ) . '" loading="lazy" decoding="async">';
			}
			if ( $vid ) {
				echo '<video muted loop playsinline preload="none" data-src="' . esc_url( $vid ) . '" aria-hidden="true"></video>';
			}
			echo '</div><div class="meta"><h3 class="h3"><a' . self::link_attrs( $t['link'] ) . '>' . esc_html( $t['title'] ) . '</a></h3>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			if ( $t['text'] ) {
				echo '<p>' . esc_html( $t['text'] ) . '</p>';
			}
			echo '</div></article>';
		}
		echo '</div></div></section>';
		$this->close();
	}
}
