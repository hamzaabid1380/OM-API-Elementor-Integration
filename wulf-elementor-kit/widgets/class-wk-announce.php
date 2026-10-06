<?php
/**
 * Announcement bar: live open/closed status, phone, a short message.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;

class WK_Announce_Widget extends WK_Widget {

	protected $key = 'announce';

	public function get_title() {
		return __( 'Wulf · Announcement bar', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-alert';
	}

	protected function register_controls() {
		$this->start_controls_section( 'c', array( 'label' => __( 'Content', 'wulf-kit' ) ) );
		$this->add_control( 'show_status', array( 'label' => __( 'Show "Open today until…"', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'description' => __( 'Worked out from your hours in Wulf Kit › Settings.', 'wulf-kit' ) ) );
		$this->add_control( 'show_phone', array( 'label' => __( 'Show phone', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'phone', array( 'label' => __( 'Phone (empty = from settings)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'condition' => array( 'show_phone' => 'yes' ) ) );
		$this->add_control( 'message', array( 'label' => __( 'Message', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Free jewelry cleaning & inspection, any time', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'message_link', array( 'label' => __( 'Message link (optional)', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'dynamic' => array( 'active' => true ) ) );
		$this->add_control( 'hide_msg_sm', array( 'label' => __( 'Hide the message on phones', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		$this->start_controls_section( 's', array( 'label' => __( 'Bar', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'bar_bg', __( 'Background', 'wulf-kit' ), '.announce', 'background-color' );
		$this->color( 'bar_color', __( 'Text color', 'wulf-kit' ), '.announce' );
		$this->color( 'bar_link', __( 'Phone / link color', 'wulf-kit' ), '.announce a' );
		$this->color( 'bar_link_h', __( 'Phone / link hover color', 'wulf-kit' ), '.announce a:hover' );
		$this->color( 'bar_line', __( 'Bottom line', 'wulf-kit' ), '.announce', 'border-bottom-color' );
		$this->color( 'dot_open', __( 'Open dot', 'wulf-kit' ), '.announce .dot', 'background' );
		$this->color( 'dot_closed', __( 'Closed dot', 'wulf-kit' ), '.announce .closed .dot', 'background' );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'bar_typo', 'selector' => '{{WRAPPER}} .wk .announce' ) );
		$this->add_responsive_control( 'bar_pad', array(
			'label'      => __( 'Padding', 'wulf-kit' ),
			'type'       => Controls_Manager::DIMENSIONS,
			'size_units' => array( 'px', 'em' ),
			'selectors'  => array( '{{WRAPPER}} .wk .announce' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'bar_gap', array(
			'label'     => __( 'Space between items', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 80 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .announce' => 'column-gap: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$phone = $s['phone'] ? $s['phone'] : WK_Settings::get( 'phone' );
		$this->open( $s );
		echo '<div class="announce">';
		if ( 'yes' === $s['show_status'] ) {
			echo '<span class="ann-status" data-wk-status="dot"><span class="dot"></span><span data-status-text></span></span>';
		}
		if ( 'yes' === $s['show_phone'] && $phone ) {
			echo '<a href="' . esc_attr( WK_Settings::tel( $phone ) ) . '">' . esc_html( $phone ) . '</a>';
		}
		if ( $s['message'] ) {
			$cls = 'yes' === $s['hide_msg_sm'] ? ' class="hide-sm"' : '';
			if ( ! empty( $s['message_link']['url'] ) ) {
				echo '<a' . $cls . self::link_attrs( $s['message_link'] ) . '>' . esc_html( $s['message'] ) . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			} else {
				echo '<span' . $cls . '>' . esc_html( $s['message'] ) . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}
		echo '</div>';
		$this->close();
	}
}
