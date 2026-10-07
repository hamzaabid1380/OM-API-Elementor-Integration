<?php
/**
 * Spotlight: one ring, large, turning in 360°, with metal buttons that switch it live
 * (and an optional choice of up to four rings). A single "wow" moment for a calm page.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Spotlight_Widget extends WK_Widget {

	protected $key = 'spotlight';

	public function get_title() {
		return __( 'Wulf · Spotlight', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-video-camera';
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'spotlight', 'tone' => 'ivory' ) );
		$this->head_controls( array( 'eyebrow' => __( 'In the spotlight', 'wulf-kit' ), 'title' => __( 'Brilliance you have to see *in person*.', 'wulf-kit' ), 'lead' => __( 'Watch it turn, try it in another metal, then come and hold it. Every ring here is one we can make for you.', 'wulf-kit' ), 'align' => 'center' ) );

		$this->start_controls_section( 'c_items', array( 'label' => __( 'Rings', 'wulf-kit' ) ) );
		$r = new Repeater();
		$this->product_fields( $r );
		$this->add_control( 'items', array(
			'label'       => __( 'Rings (first one shows first; up to 4)', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ name }}}',
			'default'     => array(
				self::demo_product( '51157-E', 'Oval Hidden Halo Engagement Ring', '$1,350', 'engagement-rings/51157-E-6X4/', 'yellow', array( 'white', 'yellow' ) ),
				self::demo_product( '51162-E', 'Oval Hidden Halo Ring, Diamond Band', '$2,383', 'engagement-rings/51162-E-8X6/', 'rose', array( 'white', 'rose' ) ),
				self::demo_product( '85121', 'Round 4-Prong Solitaire Engagement Ring', '$1,561', 'engagement-rings/85121-2/', 'white', array( 'white' ) ),
			),
		) );
		$this->add_control( 'show_price', array( 'label' => __( 'Show price', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'link_text', array( 'label' => __( 'Link text under the ring', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'View this ring', 'wulf-kit' ) ) );
		$this->button_fields( 'b1', __( 'Button', 'wulf-kit' ), __( 'Book a visit to see it', 'wulf-kit' ), '#visit', 'Engagement ring' );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->start_controls_section( 's_stage', array( 'label' => __( 'Ring stage', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'stage_w', array(
			'label'      => __( 'Size', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( 'px', '%' ),
			'range'      => array( 'px' => array( 'min' => 240, 'max' => 1000 ), '%' => array( 'min' => 30, 'max' => 100 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk .spot-ring' => 'width: {{SIZE}}{{UNIT}};' ),
		) );
		$this->color( 'stage_bg', __( 'Stage background', 'wulf-kit' ), '.spot-ring', 'background-color' );
		$this->color( 'glow', __( 'Glow behind the stage', 'wulf-kit' ), '.spot-stage::before', 'background-color' );
		$this->add_control( 'scale_in', array( 'label' => __( 'Grow into view while scrolling', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->end_controls_section();
		$this->start_controls_section( 's_metals', array( 'label' => __( 'Metal buttons', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'm_c', __( 'Text', 'wulf-kit' ), '.spot-metals button' );
		$this->color( 'm_bg', __( 'Background', 'wulf-kit' ), '.spot-metals button', 'background-color' );
		$this->color( 'm_bd', __( 'Border', 'wulf-kit' ), '.spot-metals button', 'border-color' );
		$this->color( 'm_hbd', __( 'Border on hover', 'wulf-kit' ), '.spot-metals button:hover', 'border-color' );
		$this->color( 'm_on_c', __( 'Chosen text', 'wulf-kit' ), '.spot-metals button[aria-checked="true"]' );
		$this->color( 'm_on_bg', __( 'Chosen background', 'wulf-kit' ), '.spot-metals button[aria-checked="true"]', 'background-color' );
		$this->end_controls_section();
		$this->start_controls_section( 's_pick', array( 'label' => __( 'Ring choices', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'p_bd', __( 'Circle border', 'wulf-kit' ), '.spot-pick button', 'border-color' );
		$this->color( 'p_hbd', __( 'Circle border on hover', 'wulf-kit' ), '.spot-pick button:hover', 'border-color' );
		$this->color( 'p_on', __( 'Chosen circle border', 'wulf-kit' ), '.spot-pick button[aria-pressed="true"]', 'border-color' );
		$this->end_controls_section();
		$this->text_style( 'name', __( 'Ring name', 'wulf-kit' ), '.spot-cap b' );
		$this->text_style( 'meta', __( 'Price line', 'wulf-kit' ), '.spot-cap' );
		$this->text_style( 'lk', __( 'Link', 'wulf-kit' ), '.spot-cap a', true );
		$this->button_style( 'b1', __( 'Button', 'wulf-kit' ), '.spot-cta .btn' );
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$items = array();
		foreach ( array_slice( (array) $s['items'], 0, 4 ) as $it ) {
			$d = $this->product_data( $it );
			if ( $d['media'] ) {
				$items[] = $d;
			}
		}
		if ( ! $items ) {
			return;
		}
		$f     = $items[0];
		$m     = $f['m'];
		$names = array( 'white' => __( 'White gold', 'wulf-kit' ), 'yellow' => __( 'Yellow gold', 'wulf-kit' ), 'rose' => __( 'Rose gold', 'wulf-kit' ) );
		$this->open( $s, '', array( 'items' => $items, 'names' => $names, 'price' => 'yes' === $s['show_price'], 'link' => $s['link_text'] ) );
		echo '<section class="' . esc_attr( $this->sec_class( $s, 'sec spot' ) . ( 'yes' === $s['scale_in'] ? ' scale-in' : '' ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		$med = $f['media'][ $m ];
		echo '<div class="spot-stage"><div class="spot-ring swap pv" data-spot-ring>';
		if ( $med['v'] ) {
			echo '<video muted loop playsinline autoplay preload="metadata" poster="' . esc_url( $med['poster'] ) . '" src="' . esc_url( $med['v'] ) . '" aria-label="' . esc_attr( $f['n'] ) . '"></video>';
		} else {
			echo '<img src="' . esc_url( $med['poster'] ) . '" alt="' . esc_attr( $f['n'] ) . '">';
		}
		echo '</div>';
		echo '<div class="spot-metals" role="radiogroup" aria-label="' . esc_attr__( 'Metal', 'wulf-kit' ) . '" data-spot-metals>';
		foreach ( array_keys( $f['media'] ) as $mm ) {
			$on = $mm === $m;
			echo '<button type="button" role="radio" aria-checked="' . ( $on ? 'true' : 'false' ) . '" data-m="' . esc_attr( $mm ) . '"><i class="sw sw-' . esc_attr( $mm ) . '"></i>' . esc_html( $names[ $mm ] ) . '</button>';
		}
		echo '</div>';
		$price = 'yes' === $s['show_price'] && $f['p'] ? ' · ' . esc_html__( 'From', 'wulf-kit' ) . ' ' . esc_html( $f['p'] ) : '';
		$link  = $s['link_text'] && $f['u'] ? ' <a href="' . esc_url( $f['u'] ) . '"' . ( $f['ext'] ? ' target="_blank" rel="noopener"' : '' ) . '>' . esc_html( $s['link_text'] ) . ' ' . WK_Icons::svg( 'arr' ) . '</a>' : '';
		echo '<p class="spot-cap" data-spot-cap><b>' . esc_html( $f['n'] ) . '</b>' . $price . $link . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( count( $items ) > 1 ) {
			echo '<div class="spot-pick" data-spot-pick>';
			foreach ( $items as $i => $it ) {
				echo '<button type="button" aria-pressed="' . ( 0 === $i ? 'true' : 'false' ) . '" data-i="' . (int) $i . '" aria-label="' . esc_attr( $it['n'] ) . '"><img src="' . esc_url( $it['img'] ) . '" alt="" loading="lazy"></button>';
			}
			echo '</div>';
		}
		echo '</div>';
		$b = $this->button( $s, 'b1', 'btn ' . ( 'dark' === ( $s['tone'] ?? '' ) ? 'btn-gold' : 'btn-ink' ), true );
		if ( $b ) {
			echo '<div class="spot-cta">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div></section>';
		$this->close();
	}
}
