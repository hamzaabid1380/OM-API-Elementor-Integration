<?php
/**
 * Product row (e.g. "Engagement ring favorites"): real pieces on white that turn on hover,
 * with metal swatches that switch to the video in that gold, and a heart to save to the tray.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Products_Widget extends WK_Widget {

	protected $key = 'products';

	public function get_title() {
		return __( 'Wulf · Product row', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-products';
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'favorites' ) );
		$this->start_controls_section( 'c_head', array( 'label' => __( 'Heading', 'wulf-kit' ) ) );
		$this->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Engagement ring favorites', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'Real settings from our catalog, turning in 360°. Save the ones you like for your visit.', 'wulf-kit' ) ) );
		$this->add_control( 'arrows', array( 'label' => __( 'Arrows', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'more_text', array( 'label' => __( '"See all" link text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'Optional, e.g. "See all engagement rings". Empty hides it.', 'wulf-kit' ) ) );
		$this->add_control( 'more_link', array( 'label' => __( '"See all" link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'default' => array( 'url' => WK_Pages::url( 'engagement-rings' ) ), 'dynamic' => array( 'active' => true ) ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_items', array( 'label' => __( 'Pieces', 'wulf-kit' ) ) );
		$r = new Repeater();
		$this->product_fields( $r );
		$r->add_control( 'badge', array( 'label' => __( 'Badge (optional)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'e.g. New', 'wulf-kit' ) ) );
		$this->add_control( 'items', array(
			'label'       => __( 'Pieces', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ name }}}',
			'default'     => array(
				self::demo_product( '84842', 'Single Row Diamond Engagement Ring', '$2,650', 'engagement-rings/84842-2/', 'white', array( 'white' ) ),
				self::demo_product( '85264', 'Tulip Solitaire Engagement Ring', '$1,144', 'engagement-rings/85264-1/', 'white', array( 'white' ) ),
				self::demo_product( '85158', 'Accented Round Engagement Ring', '$2,317', 'engagement-rings/85158-2/', 'white', array( 'white' ) ),
				self::demo_product( '85121', 'Round 4-Prong Solitaire Engagement Ring', '$1,561', 'engagement-rings/85121-2/', 'white', array( 'white' ) ),
				self::demo_product( '51157-E', 'Oval Hidden Halo Engagement Ring', '$1,350', 'engagement-rings/51157-E-6X4/', 'white', array( 'white', 'yellow' ) ),
				self::demo_product( '51156-E', 'Emerald Cut Hidden Halo Engagement Ring', '$1,645', 'engagement-rings/51156-E-7.5X5.5/', 'white', array( 'white', 'yellow', 'rose' ) ),
				self::demo_product( '83364', '3-Stone Single Row Engagement Ring', '$4,540', 'engagement-rings/83364-25/', 'white', array( 'white', 'yellow', 'rose' ) ),
				self::demo_product( '85275', 'Nature Inspired Engagement Ring', '$1,510', 'engagement-rings/85275-1/', 'white', array( 'white', 'yellow', 'rose' ) ),
			),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_show', array( 'label' => __( 'Show on each card', 'wulf-kit' ) ) );
		$this->add_control( 'show_price', array( 'label' => __( 'Price', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'price_prefix', array( 'label' => __( 'Price starts with', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'From', 'wulf-kit' ), 'condition' => array( 'show_price' => 'yes' ) ) );
		$this->add_control( 'show_sku', array( 'label' => __( 'Style number', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'show_metals', array( 'label' => __( 'Metal dots', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'show_save', array( 'label' => __( 'Heart (save to tray)', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'play', array(
			'label'   => __( 'Play the 360° video', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'hover',
			'options' => array( 'hover' => __( 'On hover (phones: when in view)', 'wulf-kit' ), 'always' => __( 'Always while on screen', 'wulf-kit' ), 'never' => __( 'Never', 'wulf-kit' ) ),
		) );
		$this->add_control( 'new_tab', array( 'label' => __( 'Open product links in a new tab', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		$this->style_section();
		$this->start_controls_section( 's_row', array( 'label' => __( 'Row', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'per', array(
			'label'     => __( 'Cards visible', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 1, 'max' => 6, 'step' => .5 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .prow' => '--per: {{SIZE}};' ),
		) );
		$this->add_responsive_control( 'gap', array(
			'label'     => __( 'Gap', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .prow' => '--gap: {{SIZE}}{{UNIT}};' ),
		) );
		$this->color( 'arrow_c', __( 'Arrow color', 'wulf-kit' ), '.arrows button' );
		$this->color( 'arrow_b', __( 'Arrow border', 'wulf-kit' ), '.arrows button', 'border-color' );
		$this->color( 'arrow_hbg', __( 'Arrow hover background', 'wulf-kit' ), '.arrows button:hover', 'background-color' );
		$this->color( 'arrow_hc', __( 'Arrow hover color', 'wulf-kit' ), '.arrows button:hover' );
		$this->end_controls_section();
		$this->text_style( 'title', __( 'Title', 'wulf-kit' ), '.row-head .h3' );
		$this->text_style( 'text', __( 'Text', 'wulf-kit' ), '.row-head p' );
		$this->box_style( 'media', __( 'Picture box', 'wulf-kit' ), '.card .slot' );
		$this->text_style( 'name', __( 'Names', 'wulf-kit' ), '.card h3 a', true );
		$this->text_style( 'price', __( 'Price', 'wulf-kit' ), '.card .price', false, true, array(
			'sku' => array( 'label' => __( 'Style number color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .card .sku' => 'color: {{VALUE}};' ) ),
		) );
		$this->start_controls_section( 's_save', array( 'label' => __( 'Heart, badge & metal dots', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'save_c', __( 'Heart', 'wulf-kit' ), '.card .save' );
		$this->color( 'save_bg', __( 'Heart background', 'wulf-kit' ), '.card .save', 'background-color' );
		$this->color( 'save_on', __( 'Heart when saved', 'wulf-kit' ), '.card .save[aria-pressed="true"]' );
		$this->color( 'badge_bg', __( 'Badge background', 'wulf-kit' ), '.card .badge', 'background-color' );
		$this->color( 'badge_c', __( 'Badge text', 'wulf-kit' ), '.card .badge' );
		$this->color( 'dot_ring', __( 'Selected metal ring', 'wulf-kit' ), '.card .metals button[aria-checked="true"]', 'box-shadow: 0 0 0 1.5px {{VALUE}}; --x' );
		$this->end_controls_section();
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$items = array();
		foreach ( (array) $s['items'] as $it ) {
			$p = $this->product_data( $it );
			if ( $p['media'] || $p['img'] ) {
				$p['badge'] = (string) ( $it['badge'] ?? '' );
				$items[]    = $p;
			}
		}
		$this->open( $s, '', array( 'play' => $s['play'], 'items' => $items, 'prefix' => $s['price_prefix'] ) );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . ' prod-sec"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $s['title'] || $s['text'] || 'yes' === $s['arrows'] ) {
			echo '<div class="row-head"><div>' . ( $s['title'] ? '<h3 class="h3">' . esc_html( $s['title'] ) . '</h3>' : '' ) . ( $s['text'] ? '<p>' . esc_html( $s['text'] ) . '</p>' : '' ) . '</div>';
			$more = '' !== trim( (string) ( $s['more_text'] ?? '' ) ) ? '<a class="row-more"' . self::link_attrs( $s['more_link'] ?? '' ) . '>' . esc_html( $s['more_text'] ) . ' ' . WK_Icons::svg( 'arr' ) . '</a>' : '';
			if ( 'yes' === $s['arrows'] || $more ) {
				echo '<div class="arrows">' . $more; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				if ( 'yes' === $s['arrows'] ) {
					echo '<button type="button" data-scroll="-1" aria-label="' . esc_attr__( 'Previous', 'wulf-kit' ) . '">' . WK_Icons::svg( 'left' ) . '</button><button type="button" data-scroll="1" aria-label="' . esc_attr__( 'Next', 'wulf-kit' ) . '">' . WK_Icons::svg( 'arr' ) . '</button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}
				echo '</div>';
			}
			echo '</div>';
		}
		$names = array( 'white' => __( '14K white gold', 'wulf-kit' ), 'yellow' => __( '14K yellow gold', 'wulf-kit' ), 'rose' => __( '14K rose gold', 'wulf-kit' ) );
		echo '<div class="prow" tabindex="0" aria-label="' . esc_attr( $s['title'] ? $s['title'] : __( 'Pieces', 'wulf-kit' ) ) . '">';
		foreach ( $items as $i => $p ) {
			$m      = $p['media'][ $p['m'] ] ?? array( 'v' => '', 'poster' => $p['img'] );
			$poster = $m['poster'] ? $m['poster'] : $p['img'];
			$target = 'yes' === $s['new_tab'] || $p['ext'] ? ' target="_blank" rel="noopener"' : '';
			echo '<article class="card">';
			if ( $p['badge'] ) {
				echo '<span class="badge">' . esc_html( $p['badge'] ) . '</span>';
			}
			if ( 'yes' === $s['show_save'] && WK_Settings::get( 'tray' ) ) {
				/* translators: %s: piece */
				echo '<button class="save" type="button" aria-pressed="false" data-i="' . (int) $i . '" aria-label="' . esc_attr( sprintf( __( 'Save %s to my tray', 'wulf-kit' ), $p['n'] ) ) . '">' . WK_Icons::svg( 'heart' ) . '</button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '<div class="slot pv"><img src="' . esc_url( $poster ) . '" alt="' . esc_attr( $p['n'] . ', ' . ( $names[ $p['m'] ] ?? '' ) ) . '" loading="lazy" decoding="async">';
			if ( $m['v'] && 'never' !== $s['play'] ) {
				echo '<video muted loop playsinline preload="none" data-src="' . esc_url( $m['v'] ) . '" aria-hidden="true"></video>';
			}
			echo '</div>';
			echo '<h3>' . ( $p['u'] ? '<a href="' . esc_url( $p['u'] ) . '"' . $target . '>' . esc_html( $p['n'] ) . '</a>' : esc_html( $p['n'] ) ) . '</h3>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			if ( ( 'yes' === $s['show_price'] && $p['p'] ) || ( 'yes' === $s['show_sku'] && $p['id'] ) ) {
				echo '<p class="price">' . ( 'yes' === $s['show_price'] && $p['p'] ? esc_html( trim( $s['price_prefix'] . ' ' . $p['p'] ) ) : '' ) . ( 'yes' === $s['show_sku'] && $p['id'] ? ' <span class="sku">· ' . esc_html__( 'Style', 'wulf-kit' ) . ' ' . esc_html( $p['id'] ) . '</span>' : '' ) . '</p>';
			}
			if ( 'yes' === $s['show_metals'] && count( $p['media'] ) > 1 ) {
				/* translators: %s: piece */
				echo '<div class="metals" role="radiogroup" aria-label="' . esc_attr( sprintf( __( 'Metal for %s', 'wulf-kit' ), $p['n'] ) ) . '">';
				foreach ( array_keys( $p['media'] ) as $mm ) {
					$on = $mm === $p['m'];
					echo '<button type="button" role="radio" aria-checked="' . ( $on ? 'true' : 'false' ) . '" tabindex="' . ( $on ? '0' : '-1' ) . '" aria-label="' . esc_attr( $names[ $mm ] ) . '" data-i="' . (int) $i . '" data-m="' . esc_attr( $mm ) . '"><i class="sw-' . esc_attr( $mm ) . '"></i></button>';
				}
				echo '</div>';
			}
			echo '</article>';
		}
		echo '</div></div></section>';
		$this->close();
	}
}
