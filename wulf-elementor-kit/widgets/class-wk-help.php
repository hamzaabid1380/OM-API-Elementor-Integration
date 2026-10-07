<?php
/**
 * "How can we help?" row of round icon links.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Help_Widget extends WK_Widget {

	protected $key = 'help';

	public function get_title() {
		return __( 'Wulf · Help circles', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-icon-box';
	}

	protected function register_controls() {
		$this->start_controls_section( 'c', array( 'label' => __( 'Content', 'wulf-kit' ) ) );
		$this->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'How can we help?', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'icon', array( 'label' => __( 'Icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'ring', 'options' => WK_Icons::options() ) );
		$r->add_control( 'image', array( 'label' => __( 'Or a picture instead of the icon', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA ) );
		$r->add_control( 'label', array( 'label' => __( 'Label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'dynamic' => array( 'active' => true ) ) );
		$h = home_url( '/' );
		$this->add_control( 'items', array(
			'label'       => __( 'Circles', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ label }}}',
			'default'     => array(
				array( 'icon' => 'ring', 'label' => __( 'Engagement rings', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'engagement-rings' ) ) ),
				array( 'icon' => 'bands', 'label' => __( 'Wedding bands', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'wedding-bands' ) ) ),
				array( 'icon' => 'ear', 'label' => __( 'Fine jewelry', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'best-diamonds' ) ) ),
				array( 'icon' => 'gift', 'label' => __( 'Gifts', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'catalogue' ) ) ),
				array( 'icon' => 'pencil', 'label' => __( 'Custom design', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'custom-jewelry' ) ) ),
				array( 'icon' => 'tool', 'label' => __( 'Repair & sizing', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'jewelry-services-and-repairs' ) ) ),
				array( 'icon' => 'cash', 'label' => __( 'Sell your gold', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'gold-silver-platinum' ) ) ),
			),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 's_c', array( 'label' => __( 'Circles', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'size', array(
			'label'     => __( 'Circle size', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 40, 'max' => 160 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .hc' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'isize', array(
			'label'     => __( 'Icon size', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 12, 'max' => 80 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .hc svg' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->start_controls_tabs( 'c_tabs' );
		$this->start_controls_tab( 'c_n', array( 'label' => __( 'Normal', 'wulf-kit' ) ) );
		$this->color( 'c_bg', __( 'Circle', 'wulf-kit' ), '.hc', 'background-color' );
		$this->color( 'c_ic', __( 'Icon', 'wulf-kit' ), '.hc' );
		$this->color( 'c_border', __( 'Border', 'wulf-kit' ), '.hc', 'border-color' );
		$this->color( 'c_label', __( 'Label', 'wulf-kit' ), '.help a' );
		$this->end_controls_tab();
		$this->start_controls_tab( 'c_h', array( 'label' => __( 'Hover', 'wulf-kit' ) ) );
		$this->color( 'c_hbg', __( 'Circle', 'wulf-kit' ), '.help a:hover .hc', 'background-color' );
		$this->color( 'c_hic', __( 'Icon', 'wulf-kit' ), '.help a:hover .hc' );
		$this->color( 'c_hlabel', __( 'Label', 'wulf-kit' ), '.help a:hover' );
		$this->end_controls_tab();
		$this->end_controls_tabs();
		$this->add_control( 'c_bw', array(
			'label'     => __( 'Border width', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'separator' => 'before',
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 6 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .hc' => 'border: {{SIZE}}{{UNIT}} solid;' ),
		) );
		$this->end_controls_section();
		$this->text_style( 'title', __( 'Title', 'wulf-kit' ), '.help h2' );
		$this->text_style( 'label', __( 'Labels', 'wulf-kit' ), '.help li a' );
		$this->style_section( '.help' );
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		$this->open( $s );
		echo '<section class="help"><div class="wrap">';
		if ( $s['title'] ) {
			echo '<h2>' . esc_html( $s['title'] ) . '</h2>';
		}
		echo '<ul style="--n:' . (int) count( (array) $s['items'] ) . '">';
		foreach ( (array) $s['items'] as $it ) {
			$inner = ! empty( $it['image']['url'] ) ? '<img src="' . esc_url( $this->img_url( $it['image'] ) ) . '" alt="">' : WK_Icons::svg( $it['icon'] );
			echo '<li><a' . self::link_attrs( $it['link'] ) . '><span class="hc">' . $inner . '</span>' . esc_html( $it['label'] ) . '</a></li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</ul></div></section>';
		$this->close();
	}
}
