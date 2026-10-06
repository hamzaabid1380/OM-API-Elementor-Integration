<?php
/**
 * The 4Cs, in plain words: tabs for color, clarity, cut and carat, a slider through the
 * grades, and a live drawing (tinted diamond, 10× loupe, light rays, size on a finger).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;

class WK_Fourcs_Widget extends WK_Widget {

	protected $key = 'fourcs';

	public function get_title() {
		return __( 'Wulf · The 4Cs', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-tabs';
	}

	private static function defaults() {
		return array(
			'color'   => array(
				'tab'   => __( 'Color', 'wulf-kit' ),
				'label' => __( 'Color grade', 'wulf-kit' ),
				'tip'   => __( 'For white gold or platinum, G–H looks bright white. In yellow gold, I–J looks just as lovely and costs less.', 'wulf-kit' ),
				'go'    => __( 'See {grade} color diamonds', 'wulf-kit' ),
				'texts' => "Colorless. Icy white, the rarest and most expensive grades.\nColorless. Icy white, the rarest and most expensive grades.\nColorless. Icy white, the rarest and most expensive grades.\nNear colorless. Looks white in almost any setting, and our favorite for value.\nNear colorless. Looks white in almost any setting, and our favorite for value.\nNear colorless with a faint warmth. Beautiful in yellow or rose gold.\nNear colorless with a faint warmth. Beautiful in yellow or rose gold.\nFaint yellow. A warm, vintage look at a gentler price.",
			),
			'clarity' => array(
				'tab'   => __( 'Clarity', 'wulf-kit' ),
				'label' => __( 'Clarity grade', 'wulf-kit' ),
				'tip'   => __( 'Aim for eye-clean, not flawless. VS2 to SI1 is often the best value you can buy.', 'wulf-kit' ),
				'go'    => __( 'See {grade} diamonds', 'wulf-kit' ),
				'texts' => "Flawless. Nothing visible even under 10× magnification. Extremely rare.\nFlawless. Nothing visible even under 10× magnification. Extremely rare.\nVery, very slightly included. Tiny details only an expert finds under magnification.\nVery, very slightly included. Tiny details only an expert finds under magnification.\nVery slightly included. Eye-clean, and the sweet spot for most people.\nVery slightly included. Eye-clean, and the sweet spot for most people.\nSlightly included. Often still eye-clean. We check every stone with you.\nInclusions may be visible to the eye and can affect sparkle.\nInclusions may be visible to the eye and can affect sparkle.",
			),
			'cut'     => array(
				'tab'   => __( 'Cut', 'wulf-kit' ),
				'label' => __( 'Cut proportions', 'wulf-kit' ),
				'tip'   => __( 'Never compromise on cut. It affects sparkle more than any other C.', 'wulf-kit' ),
				'go'    => __( 'See excellent-cut diamonds', 'wulf-kit' ),
				'texts' => "Too shallow: light slips out through the bottom, so the diamond looks glassy and dull.\nIdeal: light bounces between the facets and comes back up to your eye. This is the sparkle.\nToo deep: light escapes through the sides, and the center of the diamond looks dark.",
			),
			'carat'   => array(
				'tab'   => __( 'Carat', 'wulf-kit' ),
				'label' => __( 'Carat weight', 'wulf-kit' ),
				'tip'   => __( 'Buying just under a round number, like 0.90 instead of 1.00, can save a lot with no visible difference.', 'wulf-kit' ),
				'go'    => __( 'See {grade} ct diamonds', 'wulf-kit' ),
				'texts' => '',
			),
		);
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'learn', 'tone' => 'dark' ) );
		$this->head_controls( array( 'eyebrow' => __( 'The 4Cs, in plain words', 'wulf-kit' ), 'title' => __( 'Know exactly what you\'re looking at.', 'wulf-kit' ) ) );
		foreach ( self::defaults() as $c => $d ) {
			$this->start_controls_section( 'c_' . $c, array( 'label' => $d['tab'] ) );
			$this->add_control( $c . '_tab', array( 'label' => __( 'Tab name', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => $d['tab'] ) );
			$this->add_control( $c . '_label', array( 'label' => __( 'Slider label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => $d['label'] ) );
			if ( 'carat' !== $c ) {
				$this->add_control( $c . '_texts', array( 'label' => __( 'Explanation per grade (one line each)', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 6, 'default' => $d['texts'] ) );
			} else {
				$this->add_control( 'carat_text', array( 'label' => __( 'Explanation', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'A {ct} ct round is about {mm} mm across. Carat is weight, not size: cut and shape change how big it looks.', 'wulf-kit' ), 'description' => __( '{ct} and {mm} are filled in.', 'wulf-kit' ) ) );
			}
			$this->add_control( $c . '_tip', array( 'label' => __( 'Tip', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => $d['tip'] ) );
			$this->add_control( $c . '_go', array( 'label' => __( 'Button text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => $d['go'], 'description' => __( '{grade} is filled in.', 'wulf-kit' ) ) );
			$this->add_control( $c . '_url', array( 'label' => __( 'Button goes to', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'placeholder' => home_url( '/diamonds/?' . $c . '={grade}' ), 'description' => __( 'Your diamond search; {grade} is filled in. Empty hides the button.', 'wulf-kit' ) ) );
			$this->end_controls_section();
		}
		$this->start_controls_section( 'c_more', array( 'label' => __( 'More', 'wulf-kit' ) ) );
		$this->add_control( 'start', array( 'label' => __( 'Open on', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'color', 'options' => array( 'color' => 'Color', 'clarity' => 'Clarity', 'cut' => 'Cut', 'carat' => 'Carat' ) ) );
		$this->button_fields( 'b2', __( 'Second button', 'wulf-kit' ), __( 'Compare them in person', 'wulf-kit' ), '#visit', 'Engagement ring' );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head( '.cs-grid' );
		$this->start_controls_section( 's_tabs', array( 'label' => __( 'Tabs & slider', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'seg_bg', __( 'Tabs background', 'wulf-kit' ), '.seg', 'background-color' );
		$this->color( 'seg_c', __( 'Tab text', 'wulf-kit' ), '.seg button' );
		$this->color( 'seg_h', __( 'Tab text on hover', 'wulf-kit' ), '.seg button:hover' );
		$this->color( 'seg_on_bg', __( 'Chosen tab background', 'wulf-kit' ), '.seg button[aria-selected="true"]', 'background-color' );
		$this->color( 'seg_on_c', __( 'Chosen tab text', 'wulf-kit' ), '.seg button[aria-selected="true"]' );
		$this->color( 'val_c', __( 'Grade (big letter)', 'wulf-kit' ), '.cs-value b' );
		$this->color( 'rng_c', __( 'Slider fill', 'wulf-kit' ), '.cs-panel input[type=range]', '--fill' );
		$this->end_controls_section();
		$this->text_style( 'txt', __( 'Explanation', 'wulf-kit' ), '.cs-text' );
		$this->text_style( 'tip', __( 'Tip box', 'wulf-kit' ), '.tip', false, true, array(
			'bg' => array( 'label' => __( 'Background', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .tip' => 'background-color: {{VALUE}};' ) ),
			'bd' => array( 'label' => __( 'Border', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .tip' => 'border-color: {{VALUE}};' ) ),
		) );
		$this->box_style( 'viz', __( 'Drawing panel', 'wulf-kit' ), '.viz', false );
		$this->button_style( 'go', __( 'Main button', 'wulf-kit' ), '.cs-next .btn-gold' );
		$this->button_style( 'b2', __( 'Second button', 'wulf-kit' ), '.cs-next .btn-ghost' );
	}

	protected function render() {
		$s   = $this->get_settings_for_display();
		$cfg = array( 'start' => $s['start'], 'c' => array() );
		foreach ( array_keys( self::defaults() ) as $c ) {
			$cfg['c'][ $c ] = array(
				'tab'   => $s[ $c . '_tab' ],
				'label' => $s[ $c . '_label' ],
				'texts' => 'carat' === $c ? array( $s['carat_text'] ) : array_values( array_filter( array_map( 'trim', explode( "\n", (string) $s[ $c . '_texts' ] ) ) ) ),
				'tip'   => $s[ $c . '_tip' ],
				'go'    => $s[ $c . '_go' ],
				'url'   => $s[ $c . '_url' ],
			);
		}
		$uid = 'wk-cs-' . $this->get_id();
		$this->open( $s, '', $cfg );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap cs-grid"><div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $s['eyebrow'] ) {
			echo '<p class="eyebrow">' . esc_html( $s['eyebrow'] ) . '</p>';
		}
		if ( $s['title'] ) {
			$tag = in_array( $s['title_tag'], array( 'h1', 'h2', 'h3', 'div' ), true ) ? $s['title_tag'] : 'h2';
			echo '<' . $tag . ' class="h2" style="margin-top:14px">' . self::rich( $s['title'] ) . '</' . $tag . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '<div class="seg" role="tablist" aria-label="' . esc_attr__( 'The 4Cs', 'wulf-kit' ) . '">';
		foreach ( $cfg['c'] as $c => $d ) {
			$on = $c === $s['start'];
			echo '<button type="button" role="tab" id="' . esc_attr( $uid . '-' . $c ) . '" aria-controls="' . esc_attr( $uid . '-p' ) . '" aria-selected="' . ( $on ? 'true' : 'false' ) . '"' . ( $on ? '' : ' tabindex="-1"' ) . ' data-c="' . esc_attr( $c ) . '">' . esc_html( $d['tab'] ) . '</button>';
		}
		echo '</div><div class="cs-panel" id="' . esc_attr( $uid . '-p' ) . '" role="tabpanel" aria-labelledby="' . esc_attr( $uid . '-' . $s['start'] ) . '">';
		echo '<div class="cs-value"><small data-cs-label></small><b data-cs-val></b></div><input type="range" min="0" max="7" step="1" value="3" aria-label="' . esc_attr__( 'Grade', 'wulf-kit' ) . '" data-cs-range><div class="ticks" aria-hidden="true" data-cs-ticks></div>';
		echo '<p class="cs-text" aria-live="polite" data-cs-text></p><p class="tip">' . WK_Icons::svg( 'bulb' ) . '<span data-cs-tip></span></p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<div class="cs-next"><a class="btn btn-gold" href="#" data-cs-go><span></span> ' . WK_Icons::svg( 'arr', 'arr' ) . '</a>' . $this->button( $s, 'b2', 'btn btn-ghost' ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '</div></div><div class="viz"><span class="viz-cap" data-viz-cap></span><div class="swap" data-viz></div></div></div></section>';
		$this->close();
	}
}
