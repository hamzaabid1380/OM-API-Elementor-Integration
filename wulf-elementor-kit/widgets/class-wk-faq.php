<?php
/**
 * Questions & answers that open and close, with FAQ markup for Google.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Faq_Widget extends WK_Widget {

	protected $key = 'faq';

	public function get_title() {
		return __( 'Wulf · Questions (FAQ)', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-accordion';
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'faq', 'rule' => 'yes' ) );
		$this->head_controls( array( 'eyebrow' => __( 'Questions', 'wulf-kit' ), 'title' => __( 'Good questions, straight answers.', 'wulf-kit' ) ) );
		$this->start_controls_section( 'c_items', array( 'label' => __( 'Questions', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'q', array( 'label' => __( 'Question', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true ) );
		$r->add_control( 'a', array( 'label' => __( 'Answer', 'wulf-kit' ), 'type' => Controls_Manager::WYSIWYG, 'default' => '' ) );
		$this->add_control( 'items', array(
			'label'       => __( 'Questions', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ q }}}',
			'default'     => array(
				array( 'q' => __( 'Do I need an appointment?', 'wulf-kit' ), 'a' => '<p>' . __( 'Walk-ins are always welcome. If you book ahead we\'ll have a private table and the pieces you\'re interested in ready for you.', 'wulf-kit' ) . '</p>' ),
				array( 'q' => __( 'Do you offer free cleaning?', 'wulf-kit' ), 'a' => '<p>' . __( 'Yes. Bring your jewelry in any time for a free cleaning and inspection.', 'wulf-kit' ) . '</p>' ),
			),
		) );
		$this->add_control( 'open_first', array( 'label' => __( 'First question open', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes' ) );
		$this->add_control( 'schema', array( 'label' => __( 'Add FAQ markup for Google', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'description' => __( 'Helps Google show these answers in search. Use it on one FAQ section per page.', 'wulf-kit' ) ) );
		$this->add_control( 'layout', array(
			'label'   => __( 'Layout', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'side',
			'options' => array( 'side' => __( 'Heading beside the questions', 'wulf-kit' ), 'stack' => __( 'Heading above the questions', 'wulf-kit' ) ),
		) );
		$this->button_fields( 'b1', __( 'Link under the heading', 'wulf-kit' ), __( 'Ask us anything', 'wulf-kit' ), '#visit' );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->start_controls_section( 's_list', array( 'label' => __( 'Questions', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'div', __( 'Divider lines', 'wulf-kit' ), '.faq-list details', 'border-color' );
		$this->color( 'q_bg', __( 'Row background', 'wulf-kit' ), '.faq-list details', 'background-color' );
		$this->color( 'q_hbg', __( 'Row background on hover', 'wulf-kit' ), '.faq-list details:hover', 'background-color' );
		$this->color( 'q_obg', __( 'Open row background', 'wulf-kit' ), '.faq-list details[open]', 'background-color' );
		$this->color( 'ic', __( 'Plus / minus', 'wulf-kit' ), '.faq-list summary .pm' );
		$this->color( 'ic_bg', __( 'Plus / minus circle', 'wulf-kit' ), '.faq-list summary .pm', 'background-color' );
		$this->end_controls_section();
		$this->text_style( 'q', __( 'Question text', 'wulf-kit' ), '.faq-list summary', '.faq-list summary:hover' );
		$this->text_style( 'a', __( 'Answer text', 'wulf-kit' ), '.faq-a', false, true, array(
			'link' => array( 'label' => __( 'Link color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .faq-a a' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'b1', __( 'Link', 'wulf-kit' ), '.faq-side .link', true );
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$items = array_filter( (array) $s['items'], static function ( $it ) {
			return '' !== trim( (string) $it['q'] );
		} );
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap faq' . ( 'stack' === $s['layout'] ? ' stack' : '' ) . '"><div class="faq-side">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo $this->button( $s, 'b1', 'link', true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '</div><div class="faq-list">';
		$ld = array();
		foreach ( array_values( $items ) as $i => $it ) {
			$answer = $this->parse_text_editor( (string) $it['a'] );
			echo '<details' . ( 0 === $i && 'yes' === $s['open_first'] ? ' open' : '' ) . '><summary><span>' . esc_html( $it['q'] ) . '</span><span class="pm" aria-hidden="true"></span></summary><div class="faq-a">' . wp_kses_post( $answer ) . '</div></details>';
			$ld[] = array(
				'@type'          => 'Question',
				'name'           => wp_strip_all_tags( $it['q'] ),
				'acceptedAnswer' => array( '@type' => 'Answer', 'text' => trim( wp_strip_all_tags( $answer ) ) ),
			);
		}
		echo '</div></div></section>';
		if ( 'yes' === $s['schema'] && $ld && ! \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
			echo '<script type="application/ld+json">' . wp_json_encode( array( '@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $ld ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG ) . '</script>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		$this->close();
	}
}
