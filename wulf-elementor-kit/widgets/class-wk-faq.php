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

		$this->start_controls_section( 'c_help', array( 'label' => __( 'Help card', 'wulf-kit' ) ) );
		$this->add_control( 'help_on', array( 'label' => __( 'Show a "Still have a question?" card', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'description' => __( 'A card beside the questions with a photo, a booking button, the phone number and today\'s hours. It replaces the link under the heading.', 'wulf-kit' ) ) );
		$this->add_control( 'help_img', array( 'label' => __( 'Photo', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'default' => array( 'url' => WK_URL . 'assets/media/cullen-face.webp' ), 'condition' => array( 'help_on' => 'yes' ) ) );
		$this->add_control( 'help_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Still have a question?', 'wulf-kit' ), 'label_block' => true, 'condition' => array( 'help_on' => 'yes' ) ) );
		$this->add_control( 'help_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'Talk it through with one of our jewelers, in person or by phone. Free, and no pressure.', 'wulf-kit' ), 'condition' => array( 'help_on' => 'yes' ) ) );
		$this->button_fields( 'hb', __( 'Card button', 'wulf-kit' ), __( 'Book a free consultation', 'wulf-kit' ), '#visit', true );
		$this->add_control( 'help_call', array( 'label' => __( 'Call button with the main phone', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'condition' => array( 'help_on' => 'yes' ) ) );
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
		$this->box_style( 'help', __( 'Help card', 'wulf-kit' ), '.faq-help', false );
		$this->button_style( 'hb', __( 'Help card button', 'wulf-kit' ), '.faq-help .btn-main' );
	}

	/** "Still have a question?": photo, a booking button, the phone and today's hours. */
	private function help_card( $s ) {
		$img   = $this->img_url( $s['help_img'] ?? array() );
		$phone = WK_Settings::get( 'phone' );
		$out   = '<div class="faq-help">' . ( $img ? '<img class="fh-img" src="' . esc_url( $img ) . '" alt="" loading="lazy" decoding="async">' : '' );
		$out  .= '<div class="fh-copy">' . ( $s['help_title'] ? '<p class="fh-t">' . esc_html( $s['help_title'] ) . '</p>' : '' ) . ( $s['help_text'] ? '<p class="fh-x">' . esc_html( $s['help_text'] ) . '</p>' : '' ) . '</div>';
		$btns  = $this->button( $s, 'hb', 'btn btn-main ' . ( 'dark' === ( $s['tone'] ?? '' ) ? 'btn-gold' : 'btn-ink' ), true );
		if ( 'yes' === ( $s['help_call'] ?? '' ) && $phone ) {
			$btns .= '<a class="btn btn-line" href="' . esc_attr( WK_Settings::tel( $phone ) ) . '">' . WK_Icons::svg( 'phone' ) . esc_html( $phone ) . '</a>';
		}
		$out .= $btns ? '<div class="fh-btns">' . $btns . '</div>' : '';
		$out .= '<p class="fh-s" data-wk-status><i></i><span data-status-text></span></p></div>';
		return $out;
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$items = array_filter( (array) $s['items'], static function ( $it ) {
			return '' !== trim( (string) $it['q'] );
		} );
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap faq' . ( 'stack' === $s['layout'] ? ' stack' : '' ) . '"><div class="faq-side">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		$help = 'yes' === ( $s['help_on'] ?? '' );
		echo $help ? $this->help_card( $s ) : $this->button( $s, 'b1', 'link', true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
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
