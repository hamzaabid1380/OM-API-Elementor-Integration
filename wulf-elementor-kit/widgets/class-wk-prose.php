<?php
/**
 * Long text in the Wulf style: headings, paragraphs, lists, links, quotes.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;

class WK_Prose_Widget extends WK_Widget {

	protected $key = 'prose';

	public function get_title() {
		return __( 'Wulf · Text', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-text';
	}

	protected function register_controls() {
		$this->section_controls();
		$this->head_controls( array( 'title' => '' ) );
		$this->start_controls_section( 'c_text', array( 'label' => __( 'Text', 'wulf-kit' ) ) );
		$this->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::WYSIWYG, 'default' => '<p>' . __( 'Write here. Use the toolbar for headings, lists, links and quotes.', 'wulf-kit' ) . '</p>' ) );
		$this->button_fields( 'b1', __( 'Button under the text', 'wulf-kit' ), '', '' );
		$this->button_fields( 'b2', __( 'Second button', 'wulf-kit' ), '', '' );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->start_controls_section( 's_body', array( 'label' => __( 'Text block', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'width', array(
			'label'      => __( 'Text width', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( 'px', 'ch' ),
			'range'      => array( 'px' => array( 'min' => 320, 'max' => 1240 ), 'ch' => array( 'min' => 40, 'max' => 120 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk .prose' => 'max-width: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_control( 'center', array( 'label' => __( 'Center the text block', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes' ) );
		$this->end_controls_section();
		$this->text_style( 'p', __( 'Paragraphs', 'wulf-kit' ), '.prose' );
		$this->text_style( 'h', __( 'Headings in the text', 'wulf-kit' ), '.prose :is(h2,h3,h4)' );
		$this->text_style( 'a', __( 'Links', 'wulf-kit' ), '.prose a', true );
		$this->button_style( 'b1', __( 'Button', 'wulf-kit' ), '.prose-cta .btn-main' );
		$this->button_style( 'b2', __( 'Second button', 'wulf-kit' ), '.prose-cta .btn-second' );
	}

	protected function render() {
		$s    = $this->get_settings_for_display();
		$dark = 'dark' === ( $s['tone'] ?? '' );
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap' . ( 'yes' === $s['center'] ? ' prose-center' : '' ) . '">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo '<div class="prose">' . wp_kses_post( $this->parse_text_editor( (string) $s['text'] ) ) . '</div>';
		$b = $this->button( $s, 'b1', 'btn btn-main ' . ( $dark ? 'btn-gold' : 'btn-ink' ), true ) . $this->button( $s, 'b2', 'btn btn-second ' . ( $dark ? 'btn-ghost' : 'btn-line' ) );
		if ( $b ) {
			echo '<div class="prose-cta">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div></section>';
		$this->close();
	}
}
