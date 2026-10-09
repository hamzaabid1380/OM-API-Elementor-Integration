<?php
/**
 * Booking bar: a slim "what for + which day" bar, usually right under the hero. Continue opens the
 * booking panel at its last step (name and phone), with the topic and day already chosen.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;

class WK_Bookbar_Widget extends WK_Widget {

	protected $key = 'bookbar';

	public function get_title() {
		return __( 'Wulf · Booking bar', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-form-horizontal';
	}

	protected function register_controls() {
		$this->start_controls_section( 'c_bar', array( 'label' => __( 'Booking bar', 'wulf-kit' ) ) );
		$this->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Book a free consultation', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'sub', array( 'label' => __( 'Under the title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Two quick choices, then your name and number.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'topic_label', array( 'label' => __( 'First choice label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'I\'d like to talk about', 'wulf-kit' ) ) );
		$this->add_control( 'topic_ph', array( 'label' => __( 'First choice placeholder', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Choose a topic', 'wulf-kit' ) ) );
		$this->add_control( 'day_label', array( 'label' => __( 'Second choice label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Preferred day', 'wulf-kit' ) ) );
		$this->add_control( 'day_ph', array( 'label' => __( 'Second choice placeholder', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Choose a day', 'wulf-kit' ) ) );
		$this->add_control( 'btn', array( 'label' => __( 'Button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Continue', 'wulf-kit' ) ) );
		$this->add_control( 'note', array( 'label' => __( 'Small print', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Free, no obligation. We confirm by call or text.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'topics_note', array( 'type' => Controls_Manager::RAW_HTML, 'raw' => __( 'Topics and opening days come from Wulf Kit › Settings.', 'wulf-kit' ), 'content_classes' => 'elementor-descriptor' ) );
		$this->add_control( 'anchor', array( 'label' => __( 'Anchor (for menu links)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'book-now', 'separator' => 'before' ) );
		$this->end_controls_section();

		$this->start_controls_section( 's_sec', array( 'label' => __( 'Section', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'sec_bg', __( 'Background around the bar', 'wulf-kit' ), '.bkbar-sec', 'background-color' );
		$this->end_controls_section();
		$this->box_style( 'bar', __( 'Bar', 'wulf-kit' ), '.bkbar', false );
		$this->text_style( 't', __( 'Title', 'wulf-kit' ), '.bkbar-t' );
		$this->text_style( 'st', __( 'Under the title', 'wulf-kit' ), '.bkbar-s' );
		$this->text_style( 'lb', __( 'Labels', 'wulf-kit' ), '.bkbar-f > span' );
		$this->start_controls_section( 's_fields', array( 'label' => __( 'Choices', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'f_bg', __( 'Background', 'wulf-kit' ), '.bkbar select', 'background-color' );
		$this->color( 'f_c', __( 'Text', 'wulf-kit' ), '.bkbar select' );
		$this->color( 'f_bd', __( 'Border', 'wulf-kit' ), '.bkbar select', 'border-color' );
		$this->color( 'f_hbd', __( 'Border on hover and focus', 'wulf-kit' ), '.bkbar select:hover, {{WRAPPER}} .wk .bkbar select:focus', 'border-color' );
		$this->end_controls_section();
		$this->button_style( 'b', __( 'Button', 'wulf-kit' ), '.bkbar .btn' );
		$this->text_style( 'n', __( 'Small print', 'wulf-kit' ), '.bkbar-n' );
	}

	protected function render() {
		$s      = $this->get_settings_for_display();
		$uid    = 'wk-bb-' . $this->get_id();
		$anchor = preg_replace( '/[^A-Za-z0-9_-]/', '', (string) ( $s['anchor'] ?? '' ) );
		$this->open( $s, '', array( 'flex' => __( 'I\'m flexible', 'wulf-kit' ) ) );
		echo '<section class="sec bkbar-sec"' . ( $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '' ) . '><div class="wrap">';
		$back = WK_Settings::get( 'book_url', '#visit' );
		if ( '#visit' === $back && class_exists( 'WK_Pages' ) ) {
			$back = WK_Pages::url( 'contact-us', '#visit' );
		}
		echo '<form class="bkbar" data-bkbar novalidate data-fallback="' . esc_url( $back ) . '">';
		echo '<div class="bkbar-head"><p class="bkbar-t">' . esc_html( $s['title'] ) . '</p>' . ( $s['sub'] ? '<p class="bkbar-s">' . esc_html( $s['sub'] ) . '</p>' : '' ) . '</div>';
		echo '<label class="bkbar-f" for="' . esc_attr( $uid ) . '-t"><span>' . esc_html( $s['topic_label'] ) . '</span><select id="' . esc_attr( $uid ) . '-t" name="topic"><option value="">' . esc_html( $s['topic_ph'] ) . '</option>';
		foreach ( WK_Settings::book_topics() as $t ) {
			echo '<option value="' . esc_attr( $t[0] ) . '">' . esc_html( $t[0] ) . '</option>';
		}
		echo '</select></label>';
		echo '<label class="bkbar-f" for="' . esc_attr( $uid ) . '-d"><span>' . esc_html( $s['day_label'] ) . '</span><select id="' . esc_attr( $uid ) . '-d" name="day" data-bkbar-days><option value="">' . esc_html( $s['day_ph'] ) . '</option></select></label>';
		echo '<button class="btn btn-gold" type="submit">' . esc_html( $s['btn'] ) . ' ' . WK_Icons::svg( 'arr', 'arr' ) . '</button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $s['note'] ) {
			echo '<p class="bkbar-n">' . WK_Icons::svg( 'check' ) . esc_html( $s['note'] ) . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</form></div></section>';
		$this->close();
	}
}
