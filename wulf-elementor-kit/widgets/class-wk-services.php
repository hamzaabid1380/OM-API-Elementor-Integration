<?php
/**
 * Services: a custom-design feature (sketch → render → finished), service cards with photos
 * and checklists, and a financing strip.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Services_Widget extends WK_Widget {

	protected $key = 'services';

	public function get_title() {
		return __( 'Wulf · Services', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-tools';
	}

	protected function register_controls() {
		$m = WK_URL . 'assets/media/';
		$this->section_controls( array( 'anchor' => 'services' ) );
		$this->head_controls( array( 'eyebrow' => __( 'Services', 'wulf-kit' ), 'title' => __( 'Jewelry repair, appraisals & gold buying in Crown Point.', 'wulf-kit' ) ) );

		$this->start_controls_section( 'c_custom', array( 'label' => __( 'Custom design feature', 'wulf-kit' ) ) );
		$this->add_control( 'cu_on', array( 'label' => __( 'Show', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'cu_eyebrow', array( 'label' => __( 'Small label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Custom design', 'wulf-kit' ) ) );
		$this->add_control( 'cu_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'One of one, designed with you.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'cu_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'default' => __( 'Bring a sketch, a photo or a family stone. We\'ll design it together, show you a 3D render before anything is made, and craft a piece no one else will ever wear.', 'wulf-kit' ) ) );
		$this->button_fields( 'cub', __( 'Button', 'wulf-kit' ), __( 'Start a custom design', 'wulf-kit' ), WK_Pages::url( 'custom-jewelry' ), 'Custom design' );
		$frames = array( 1 => array( __( '1 · Sketch', 'wulf-kit' ), 'f-sketch' ), 2 => array( __( '2 · 3D render', 'wulf-kit' ), 'f-cad' ), 3 => array( __( '3 · Finished', 'wulf-kit' ), 'f-final' ) );
		foreach ( $frames as $i => $f ) {
			/* translators: %d: frame number */
			$this->add_control( 'fr' . $i . '_h', array( 'label' => sprintf( __( 'Picture %d', 'wulf-kit' ), $i ), 'type' => Controls_Manager::HEADING, 'separator' => 'before' ) );
			$this->add_control( 'fr' . $i . '_label', array( 'label' => __( 'Label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => $f[0] ) );
			$this->add_control( 'fr' . $i . '_img', array( 'label' => __( 'Image (empty = drawing)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA ) );
		}
		$this->end_controls_section();

		$this->start_controls_section( 'c_cards', array( 'label' => __( 'Service cards', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'image', array( 'label' => __( 'Photo', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA ) );
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'facts', array( 'label' => __( 'Checklist (one per line)', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 4, 'default' => '' ) );
		$r->add_control( 'link_text', array( 'label' => __( 'Link text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'default' => array( 'url' => '#visit' ), 'dynamic' => array( 'active' => true ) ) );
		$r->add_control( 'topic', array( 'label' => __( 'Pre-select in the visit form', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$this->add_control( 'cards', array(
			'label'       => __( 'Cards', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'default'     => array(
				array( 'image' => array( 'url' => $m . 'svc-repair.webp' ), 'title' => __( 'Repair, sizing & cleaning', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'jewelry-services-and-repairs' ) ), 'facts' => "Done in-house by our own goldsmiths\nFree cleaning & inspection, any time\nProngs, sizing, chains, clasps, pearls", 'link_text' => __( 'Plan a repair', 'wulf-kit' ), 'topic' => 'Repair' ),
				array( 'image' => array( 'url' => $m . 'svc-appraisal.webp' ), 'title' => __( 'Appraisals', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'jewelry-appraisals' ) ), 'facts' => "For insurance or replacement\nBy GIA-certified professionals\nEngagement, estate and pre-owned pieces", 'link_text' => __( 'Book an appraisal', 'wulf-kit' ), 'topic' => 'Appraisal' ),
				array( 'image' => array( 'url' => $m . 'svc-gold.webp' ), 'title' => __( 'Sell gold, silver & diamonds', 'wulf-kit' ), 'link' => array( 'url' => WK_Pages::url( 'gold-silver-platinum' ) ), 'facts' => "Evaluated in front of you\nGold, silver, platinum, diamonds & coins\nNo pressure to accept", 'link_text' => __( 'Get an offer', 'wulf-kit' ), 'topic' => 'Selling' ),
			),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_fin', array( 'label' => __( 'Financing strip', 'wulf-kit' ) ) );
		$this->add_control( 'fin_on', array( 'label' => __( 'Show', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'fin_big', array( 'label' => __( 'Big text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( '12 months', 'wulf-kit' ) ) );
		$this->add_control( 'fin_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Same as cash financing*', 'wulf-kit' ) ) );
		$this->add_control( 'fin_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'default' => __( 'Spread the cost of your ring with simple, flexible financing.', 'wulf-kit' ) ) );
		$this->add_control( 'fin_fine', array( 'label' => __( 'Fine print', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'default' => __( '*On approved credit. Terms and provider details from your financing partner go here.', 'wulf-kit' ) ) );
		$this->button_fields( 'finl', __( 'Link', 'wulf-kit' ), __( 'Ask about financing', 'wulf-kit' ), '#visit', 'Financing' );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->box_style( 'cubox', __( 'Custom design card', 'wulf-kit' ), '.svc.custom', false );
		$this->text_style( 'cut', __( 'Custom design title', 'wulf-kit' ), '.svc.custom .h3' );
		$this->button_style( 'cubtn', __( 'Custom design button', 'wulf-kit' ), '.svc.custom .btn-ink' );
		$this->box_style( 'card', __( 'Service cards', 'wulf-kit' ), '.svc:not(.custom):not(.fin-card)' );
		$this->text_style( 'ct', __( 'Card titles', 'wulf-kit' ), '.svc:not(.custom) .h3' );
		$this->text_style( 'cf', __( 'Checklist', 'wulf-kit' ), '.svc .facts li', false, true, array(
			'ic' => array( 'label' => __( 'Check color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .svc .facts svg' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'cl', __( 'Card links', 'wulf-kit' ), '.svc .link', true );
		$this->box_style( 'finbox', __( 'Financing strip', 'wulf-kit' ), '.fin-card', false );
		$this->text_style( 'finb', __( 'Financing big text', 'wulf-kit' ), '.svc .fin' );
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo '<div class="bento">';
		if ( 'yes' === $s['cu_on'] ) {
			echo '<article class="svc custom"><div class="copy">' . ( $s['cu_eyebrow'] ? '<p class="eyebrow">' . esc_html( $s['cu_eyebrow'] ) . '</p>' : '' ) . '<h3 class="h3">' . esc_html( $s['cu_title'] ) . '</h3><p>' . esc_html( $s['cu_text'] ) . '</p>';
			$b = $this->button( $s, 'cub', 'btn btn-ink', true );
			if ( $b ) {
				echo '<div class="acts">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</div><div class="frames">';
			foreach ( array( 1 => 'f-sketch', 2 => 'f-cad', 3 => 'f-final' ) as $i => $art ) {
				$img = $this->img_url( $s[ 'fr' . $i . '_img' ] );
				echo '<div class="slot">' . ( $img ? '<div><img src="' . esc_url( $img ) . '" alt=""></div>' : '<div data-art="' . esc_attr( $art ) . '"></div>' ) . '<span class="l">' . esc_html( $s[ 'fr' . $i . '_label' ] ) . '</span></div>';
			}
			echo '</div></article>';
		}
		foreach ( (array) $s['cards'] as $c ) {
			$img = $this->img_url( $c['image'] );
			echo '<article class="svc">' . ( $img ? '<div class="svc-ph"><img src="' . esc_url( $img ) . '" alt="" loading="lazy" decoding="async"></div>' : '' ) . '<h3 class="h3">' . esc_html( $c['title'] ) . '</h3>';
			$facts = array_filter( array_map( 'trim', explode( "\n", (string) $c['facts'] ) ) );
			if ( $facts ) {
				echo '<ul class="facts">';
				foreach ( $facts as $f ) {
					echo '<li>' . WK_Icons::svg( 'check' ) . esc_html( $f ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}
				echo '</ul>';
			}
			if ( $c['link_text'] ) {
				echo '<div class="acts"><a class="link"' . self::link_attrs( $c['link'] ) . ( $c['topic'] ? ' data-topic="' . esc_attr( $c['topic'] ) . '"' : '' ) . '>' . esc_html( $c['link_text'] ) . ' ' . WK_Icons::svg( 'arr' ) . '</a></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</article>';
		}
		if ( 'yes' === $s['fin_on'] ) {
			echo '<article class="svc fin-card"><p class="fin">' . esc_html( $s['fin_big'] ) . '</p><div><h3 class="h3">' . esc_html( $s['fin_title'] ) . '</h3><p>' . esc_html( $s['fin_text'] ) . '</p>' . ( $s['fin_fine'] ? '<p class="fine" style="margin-top:6px">' . esc_html( $s['fin_fine'] ) . '</p>' : '' ) . '</div>';
			if ( $s['finl_text'] ) {
				echo $this->button( $s, 'finl', 'link', true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</article>';
		}
		echo '</div></div></section>';
		$this->close();
	}
}
