<?php
/**
 * Hero: headline, buttons, trust line, and a showcase of real pieces turning on white
 * (or a single image / video).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Hero_Widget extends WK_Widget {

	protected $key = 'hero';

	public function get_title() {
		return __( 'Wulf · Hero', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-slider-video';
	}

	protected function register_controls() {
		$this->start_controls_section( 'c_text', array( 'label' => __( 'Text', 'wulf-kit' ) ) );
		$this->add_control( 'anchor', array( 'label' => __( 'Anchor', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'hero' ) );
		$this->add_control( 'kicker', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Visit our new Crown Point showroom', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'title', array( 'label' => __( 'Headline', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'Diamonds, cut to *your* story.', 'wulf-kit' ), 'description' => __( 'Wrap words in *stars* for gold italics.', 'wulf-kit' ) ) );
		$this->add_control( 'lead', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'Engagement rings, certified diamonds, custom design and repair, compared in person with a GIA-certified jeweler at your side. Independent diamond experts since 1971.', 'wulf-kit' ) ) );
		$this->button_fields( 'b1', __( 'Main button', 'wulf-kit' ), __( 'Design your ring', 'wulf-kit' ), '#studio' );
		$this->button_fields( 'b2', __( 'Second button', 'wulf-kit' ), __( 'Book a visit', 'wulf-kit' ), '#visit' );
		$this->add_control( 'call_line', array( 'label' => __( '"Or call…" line with open status', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'separator' => 'before' ) );
		$this->add_control( 'call_text', array( 'label' => __( 'Starts with', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Or call', 'wulf-kit' ), 'condition' => array( 'call_line' => 'yes' ) ) );
		$r = new Repeater();
		$r->add_control( 'icon', array( 'label' => __( 'Icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'clock', 'options' => WK_Icons::options() ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$this->add_control( 'trust', array(
			'label'       => __( 'Trust points', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ text }}}',
			'separator'   => 'before',
			'default'     => array(
				array( 'icon' => 'clock', 'text' => __( 'Since 1971', 'wulf-kit' ) ),
				array( 'icon' => 'cert', 'text' => __( 'GIA-certified jewelers', 'wulf-kit' ) ),
				array( 'icon' => 'cash', 'text' => __( '12 months same as cash*', 'wulf-kit' ) ),
			),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_media', array( 'label' => __( 'Showcase', 'wulf-kit' ) ) );
		$this->add_control( 'media', array(
			'label'   => __( 'Right side shows', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'products',
			'options' => array( 'products' => __( 'Pieces turning (360° videos)', 'wulf-kit' ), 'image' => __( 'One image', 'wulf-kit' ), 'video' => __( 'One video', 'wulf-kit' ) ),
		) );
		$r = new Repeater();
		$this->product_fields( $r );
		$r->add_control( 'cta', array( 'label' => __( 'Link text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'View this ring', 'wulf-kit' ) ) );
		$this->add_control( 'products', array(
			'label'       => __( 'Pieces', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ name }}}',
			'condition'   => array( 'media' => 'products' ),
			'default'     => array(
				self::demo_product( '51157-E', 'Oval Hidden Halo Engagement Ring', '$1,350', 'engagement-rings/51157-E-6X4/', 'yellow', array( 'white', 'yellow' ) ) + array( 'cta' => __( 'View this ring', 'wulf-kit' ) ),
				self::demo_product( '85121', 'Round 4-Prong Solitaire Engagement Ring', '$1,561', 'engagement-rings/85121-2/', 'white', array( 'white' ) ) + array( 'cta' => __( 'View this ring', 'wulf-kit' ) ),
				self::demo_product( '51162-E', 'Oval Hidden Halo Ring, Diamond Band', '$2,383', 'engagement-rings/51162-E-8X6/', 'rose', array( 'white', 'rose' ) ) + array( 'cta' => __( 'View this ring', 'wulf-kit' ) ),
				self::demo_product( '41101', 'Floral Halo Stud Earrings', '$2,496', 'earrings/41101-1/', 'white', array( 'white' ) ) + array( 'cta' => __( 'View these earrings', 'wulf-kit' ), 'metals' => array( 'white' ) ),
			),
		) );
		$this->add_control( 'interval', array( 'label' => __( 'Next piece every (seconds)', 'wulf-kit' ), 'type' => Controls_Manager::NUMBER, 'default' => 8, 'min' => 0, 'max' => 60, 'description' => __( '0 = only when a round button is clicked.', 'wulf-kit' ), 'condition' => array( 'media' => 'products' ) ) );
		$this->add_control( 'show_price', array( 'label' => __( 'Show metal and price', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'condition' => array( 'media' => 'products' ) ) );
		$this->add_control( 'image', array( 'label' => __( 'Image', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'condition' => array( 'media' => 'image' ) ) );
		$this->add_control( 'video', array( 'label' => __( 'Video', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'media_types' => array( 'video' ), 'condition' => array( 'media' => 'video' ) ) );
		$this->add_control( 'fit', array(
			'label'     => __( 'Fit', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => 'contain',
			'options'   => array( 'contain' => __( 'Whole picture (white around it)', 'wulf-kit' ), 'cover' => __( 'Fill the panel', 'wulf-kit' ) ),
			'selectors' => array( '{{WRAPPER}} .wk .sc-item video, {{WRAPPER}} .wk .sc-item img' => 'object-fit: {{VALUE}};' ),
		) );
		$this->add_control( 'sweep', array( 'label' => __( 'Light sweep on change', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'tilt', array( 'label' => __( 'Gentle tilt with the mouse', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		/* Style */
		$this->start_controls_section( 's_layout', array( 'label' => __( 'Layout & colors', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'bg', __( 'Text side background', 'wulf-kit' ), '.hero', 'background-color' );
		$this->color( 'media_bg', __( 'Showcase background', 'wulf-kit' ), '.hero-media', 'background-color' );
		$this->add_responsive_control( 'min_h', array(
			'label'      => __( 'Minimum height', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( 'px', 'vh' ),
			'range'      => array( 'px' => array( 'min' => 300, 'max' => 1000 ), 'vh' => array( 'min' => 30, 'max' => 100 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk .hero-grid' => 'min-height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'split', array(
			'label'     => __( 'Text side width (%)', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( '%' => array( 'min' => 30, 'max' => 70 ) ),
			'size_units' => array( '%' ),
			'selectors' => array( '{{WRAPPER}} .wk .hero-grid' => 'grid-template-columns: minmax(0, {{SIZE}}%) minmax(0, 1fr);' ),
		) );
		$this->add_control( 'tok_gold', array( 'label' => __( 'Gold (accent)', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk' => '--gold: {{VALUE}};' ), 'separator' => 'before' ) );
		$this->add_control( 'tok_night', array( 'label' => __( 'Dark background', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk' => '--night: {{VALUE}};' ) ) );
		$this->end_controls_section();

		$this->text_style( 'kicker', __( 'Small label', 'wulf-kit' ), '.kicker' );
		$this->text_style( 'title', __( 'Headline', 'wulf-kit' ), '.hero .h1', false, true, array(
			'em' => array( 'label' => __( 'Gold words color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .hero .gold-em' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'lead', __( 'Text', 'wulf-kit' ), '.hero .lead' );
		$this->button_style( 'b1', __( 'Main button', 'wulf-kit' ), '.hero-cta .btn-gold' );
		$this->button_style( 'b2', __( 'Second button', 'wulf-kit' ), '.hero-cta .btn-ghost' );
		$this->text_style( 'call', __( '"Or call" line', 'wulf-kit' ), '.hero-call', false, true, array(
			'link' => array( 'label' => __( 'Phone color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .hero-call a' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'trust', __( 'Trust points', 'wulf-kit' ), '.trust li', false, true, array(
			'ic' => array( 'label' => __( 'Icon color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .trust svg' => 'color: {{VALUE}};' ) ),
			'line' => array( 'label' => __( 'Line above', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .trust' => 'border-top-color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'cap', __( 'Showcase caption', 'wulf-kit' ), '.sc-cap', false, true, array(
			'name' => array( 'label' => __( 'Name color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .sc-cap b' => 'color: {{VALUE}};' ) ),
			'link' => array( 'label' => __( 'Link color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .sc-cap a' => 'color: {{VALUE}};' ) ),
			'linkh' => array( 'label' => __( 'Link hover color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .sc-cap a:hover' => 'color: {{VALUE}};' ) ),
		) );
		$this->start_controls_section( 's_thumbs', array( 'label' => __( 'Round buttons', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'th_border', __( 'Border', 'wulf-kit' ), '.sc-thumbs button', 'border-color' );
		$this->color( 'th_hborder', __( 'Border on hover', 'wulf-kit' ), '.sc-thumbs button:hover', 'border-color' );
		$this->color( 'th_aborder', __( 'Border when selected', 'wulf-kit' ), '.sc-thumbs button[aria-pressed="true"]', 'border-color' );
		$this->color( 'th_bg', __( 'Background', 'wulf-kit' ), '.sc-thumbs button', 'background-color' );
		$this->add_responsive_control( 'th_size', array(
			'label'     => __( 'Size', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 32, 'max' => 90 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .sc-thumbs button' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$phone = WK_Settings::get( 'phone' );
		$items = array();
		if ( 'products' === $s['media'] ) {
			foreach ( (array) $s['products'] as $it ) {
				$p = $this->product_data( $it );
				if ( $p['media'] ) {
					$p['cta'] = (string) ( $it['cta'] ?? '' );
					$items[]  = $p;
				}
			}
		}
		$cfg = array(
			'interval' => max( 0, (int) $s['interval'] ),
			'sweep'    => 'yes' === $s['sweep'],
			'tilt'     => 'yes' === $s['tilt'],
			'price'    => 'yes' === $s['show_price'],
			'items'    => $items,
		);
		$this->open( $s, '', $cfg );
		echo '<section class="hero"' . $this->anchor_attr( $s ) . '><div class="hero-grid"><div class="hero-copy">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<h1 class="h1">' . ( $s['kicker'] ? '<span class="kicker">' . esc_html( $s['kicker'] ) . '</span>' : '' ) . self::rich( $s['title'] ) . '</h1>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $s['lead'] ) {
			echo '<p class="lead">' . esc_html( $s['lead'] ) . '</p>';
		}
		$b = $this->button( $s, 'b1', 'btn btn-gold', true ) . $this->button( $s, 'b2', 'btn btn-ghost' );
		if ( $b ) {
			echo '<div class="hero-cta">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( 'yes' === $s['call_line'] && $phone ) {
			echo '<p class="hero-call">' . esc_html( $s['call_text'] ) . ' <a href="' . esc_attr( WK_Settings::tel() ) . '">' . esc_html( $phone ) . '</a> · <span data-status-text></span></p>';
		}
		if ( $s['trust'] ) {
			echo '<ul class="trust">';
			foreach ( $s['trust'] as $t ) {
				echo '<li>' . WK_Icons::svg( $t['icon'] ) . esc_html( $t['text'] ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</ul>';
		}
		echo '</div>';

		echo '<div class="hero-media slot">';
		if ( 'products' === $s['media'] && $items ) {
			echo '<div class="sc-stage">';
			foreach ( $items as $i => $p ) {
				$m   = $p['media'][ $p['m'] ];
				$alt = $p['n'];
				if ( $m['v'] ) {
					$src = 0 === $i ? ' src="' . esc_url( $m['v'] ) . '" autoplay preload="auto"' : ' data-src="' . esc_url( $m['v'] ) . '" preload="none"';
					echo '<figure class="sc-item' . ( $i ? '' : ' is-on' ) . '"' . ( $i ? ' aria-hidden="true"' : '' ) . '><video muted loop playsinline' . $src . ( $m['poster'] ? ' poster="' . esc_url( $m['poster'] ) . '"' : '' ) . ' aria-label="' . esc_attr( $alt ) . '"></video></figure>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				} else {
					echo '<figure class="sc-item' . ( $i ? '' : ' is-on' ) . '"' . ( $i ? ' aria-hidden="true"' : '' ) . '><img src="' . esc_url( $m['poster'] ? $m['poster'] : $p['img'] ) . '" alt="' . esc_attr( $alt ) . '"></figure>';
				}
			}
			echo '</div><span class="glow" aria-hidden="true"></span>' . ( 'yes' === $s['sweep'] ? '<span class="sweep" aria-hidden="true"></span>' : '' );
			$f = $items[0];
			echo '<div class="sc-foot"><p class="sc-cap" aria-live="polite">' . self::caption( $f, 'yes' === $s['show_price'] ) . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			if ( count( $items ) > 1 ) {
				echo '<div class="sc-thumbs" role="group" aria-label="' . esc_attr__( 'Featured pieces', 'wulf-kit' ) . '">';
				foreach ( $items as $i => $p ) {
					$th = $p['media'][ $p['m'] ]['poster'] ? $p['media'][ $p['m'] ]['poster'] : $p['img'];
					/* translators: %s: piece name */
					echo '<button type="button" aria-pressed="' . ( $i ? 'false' : 'true' ) . '" aria-label="' . esc_attr( sprintf( __( 'Show the %s', 'wulf-kit' ), $p['n'] ) ) . '"><img src="' . esc_url( $th ) . '" alt=""></button>';
				}
				echo '</div>';
			}
			echo '</div>';
		} elseif ( 'video' === $s['media'] && ! empty( $s['video']['url'] ) ) {
			echo '<div class="sc-stage"><figure class="sc-item is-on"><video muted loop playsinline autoplay src="' . esc_url( $s['video']['url'] ) . '"></video></figure></div>';
		} elseif ( ! empty( $s['image']['url'] ) ) {
			echo '<div class="sc-stage"><figure class="sc-item is-on"><img src="' . esc_url( $this->img_url( $s['image'] ) ) . '" alt=""></figure></div>';
		}
		echo '</div></div></section>';
		$this->close();
	}

	/** Caption under the showcase (also rebuilt by the script when the piece changes). */
	public static function caption( $p, $price ) {
		$names = array( 'white' => __( '14K white gold', 'wulf-kit' ), 'yellow' => __( '14K yellow gold', 'wulf-kit' ), 'rose' => __( '14K rose gold', 'wulf-kit' ) );
		$out   = '<span><b>' . esc_html( $p['n'] ) . '</b>';
		if ( $price ) {
			$out .= ' · ' . esc_html( $names[ $p['m'] ] ?? '' ) . ( $p['p'] ? ' · ' . esc_html__( 'From', 'wulf-kit' ) . ' ' . esc_html( $p['p'] ) : '' );
		}
		$out .= '</span>';
		if ( $p['u'] && $p['cta'] ) {
			$out .= '<a href="' . esc_url( $p['u'] ) . '"' . ( $p['ext'] ? ' target="_blank" rel="noopener"' : '' ) . '>' . esc_html( $p['cta'] ) . ' ' . WK_Icons::svg( 'arr' ) . '</a>';
		}
		return $out;
	}
}
