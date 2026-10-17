<?php
/**
 * Film chapters: parts of the brand film as tabs. The chosen chapter plays (silently) beside its own
 * words and next step; when it ends the next chapter follows, until a visitor picks one, which then
 * repeats. "Watch the film" plays the whole film with sound in a window on the page.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Filmtabs_Widget extends WK_Widget {

	protected $key = 'filmtabs';

	public function get_title() {
		return __( 'Wulf · Film chapters', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-tabs';
	}

	public function get_keywords() {
		return array( 'wulf', 'film', 'video', 'chapters', 'tabs', 'shapes', 'custom', 'builder' );
	}

	public function get_style_depends() {
		return array( 'wulf-kit', 'wulf-kit-reel' );
	}

	/** The five chapters of the brand film, with their words and next steps. */
	public static function default_items() {
		$url = static function ( $key, $fallback ) {
			return class_exists( 'WK_Pages' ) ? WK_Pages::url( $key ) : home_url( $fallback );
		};
		return array(
			array(
				'tab'      => __( 'Shapes', 'wulf-kit' ),
				'clip'     => 'shapes',
				'title'    => __( 'Eight shapes. *One that\'s yours.*', 'wulf-kit' ),
				'text'     => __( 'Round, oval, cushion, princess, emerald, pear, marquise or heart. Each returns light in its own way, so we compare them side by side, under the loupe, before you decide.', 'wulf-kit' ),
				'b_text'   => __( 'Browse engagement rings', 'wulf-kit' ),
				'b_link'   => array( 'url' => $url( 'engagement-rings', '/engagement-rings/' ) ),
				'b_topic'  => '',
			),
			array(
				'tab'      => __( 'Ring styles', 'wulf-kit' ),
				'clip'     => 'rings',
				'title'    => __( 'Solitaire, halo, hidden halo or *three stone.*', 'wulf-kit' ),
				'text'     => __( 'The setting changes how the diamond looks and how the ring wears. Try each style on in the showroom, in white, yellow or rose gold.', 'wulf-kit' ),
				'b_text'   => __( 'Book to try them on', 'wulf-kit' ),
				'b_link'   => array( 'url' => '#visit' ),
				'b_topic'  => 'Engagement ring',
			),
			array(
				'tab'      => __( 'Design online', 'wulf-kit' ),
				'clip'     => 'builder',
				'title'    => __( 'Design your ring *at home.*', 'wulf-kit' ),
				'text'     => __( 'Pick a shape, a setting and a metal in our ring builder, from 1,906 engagement ring designs. Then bring your favorite in and see it in person.', 'wulf-kit' ),
				'b_text'   => __( 'Open the ring builder', 'wulf-kit' ),
				'b_link'   => array( 'url' => $url( 'ring-builder', '/ring-builder/' ) ),
				'b_topic'  => '',
			),
			array(
				'tab'      => __( 'Custom', 'wulf-kit' ),
				'clip'     => 'custom',
				'title'    => __( 'Design, wax, cast, *set.*', 'wulf-kit' ),
				'text'     => __( 'Have something in mind? We draw it in 3D with you, make a wax model you can hold, then cast it in your metal and set every stone.', 'wulf-kit' ),
				'b_text'   => __( 'Start a custom design', 'wulf-kit' ),
				'b_link'   => array( 'url' => $url( 'custom-jewelry', '/custom-jewelry/' ) ),
				'b_topic'  => '',
			),
			array(
				'tab'      => __( 'Fine jewelry', 'wulf-kit' ),
				'clip'     => 'jewelry',
				'title'    => __( 'Bands, necklaces, earrings *and bracelets.*', 'wulf-kit' ),
				'text'     => __( 'Wedding bands for both of you, pendants, drop earrings and tennis bracelets, in yellow, white and rose gold.', 'wulf-kit' ),
				'b_text'   => __( 'See the catalog', 'wulf-kit' ),
				'b_link'   => array( 'url' => $url( 'catalogue', '/catalogue/' ) ),
				'b_topic'  => '',
			),
		);
	}

	protected function register_controls() {
		$this->head_controls(
			array(
				'eyebrow' => __( 'Our film, in five chapters', 'wulf-kit' ),
				'title'   => __( 'Find it, design it, *or have it made.*', 'wulf-kit' ),
				'lead'    => __( 'Pick a chapter to watch it here, then take the next step.', 'wulf-kit' ),
			)
		);

		$this->start_controls_section( 'c_items', array( 'label' => __( 'Chapters', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'tab', array( 'label' => __( 'Tab name', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'clip', array( 'label' => __( 'Part of the film', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'shapes', 'options' => WK_Films::clip_options() ) );
		$r->add_control( 'video', array( 'label' => __( 'Your video', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'media_types' => array( 'video' ), 'condition' => array( 'clip' => 'upload' ) ) );
		$r->add_control( 'poster', array( 'label' => __( 'Still picture (optional)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'default' => array( 'url' => '' ) ) );
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => '', 'description' => __( 'Wrap words in *stars* to show them in gold italics.', 'wulf-kit' ) ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => '' ) );
		$r->add_control( 'b_text', array( 'label' => __( 'Button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'Leave empty to hide.', 'wulf-kit' ) ) );
		$r->add_control( 'b_link', array( 'label' => __( 'Button link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'default' => array( 'url' => '' ), 'dynamic' => array( 'active' => true ) ) );
		$r->add_control( 'b_topic', array( 'label' => __( 'Pre-select in the visit form', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'Optional, e.g. Engagement ring.', 'wulf-kit' ) ) );
		$this->add_control( 'items', array(
			'label'       => __( 'Chapters', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ tab }}}',
			'default'     => self::default_items(),
		) );
		$this->add_control( 'autoplay', array(
			'label'        => __( 'Play on its own (silently)', 'wulf-kit' ),
			'type'         => Controls_Manager::SWITCHER,
			'default'      => 'yes',
			'return_value' => 'yes',
			'separator'    => 'before',
			'description'  => __( 'Each chapter plays, then the next one follows. Once a visitor picks a chapter, it repeats. Visitors who ask for less motion, or who save mobile data, see still pictures and a play button.', 'wulf-kit' ),
		) );
		$this->add_control( 'side', array(
			'label'   => __( 'Film on the', 'wulf-kit' ),
			'type'    => Controls_Manager::CHOOSE,
			'default' => 'left',
			'options' => array(
				'left'  => array( 'title' => __( 'Left', 'wulf-kit' ), 'icon' => 'eicon-h-align-left' ),
				'right' => array( 'title' => __( 'Right', 'wulf-kit' ), 'icon' => 'eicon-h-align-right' ),
			),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_watch', array( 'label' => __( 'Watch the film (with sound)', 'wulf-kit' ) ) );
		$this->add_control( 'watch', array( 'label' => __( '"Watch the film" link', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'watch_text', array( 'label' => __( 'Link words', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Watch the whole film', 'wulf-kit' ), 'condition' => array( 'watch' => 'yes' ) ) );
		$this->add_control( 'watch_film', array(
			'label'     => __( 'Film', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => 'motion',
			'options'   => array(
				'motion'   => __( 'Wulf Diamond Jewelers (1:15)', 'wulf-kit' ),
				'suitcase' => __( 'The Suitcase (0:39)', 'wulf-kit' ),
				'upload'   => __( 'My own video', 'wulf-kit' ),
			),
			'condition' => array( 'watch' => 'yes' ),
		) );
		$this->add_control( 'watch_video', array( 'label' => __( 'Your film with sound', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'media_types' => array( 'video' ), 'condition' => array( 'watch' => 'yes', 'watch_film' => 'upload' ) ) );
		$this->end_controls_section();

		$this->start_controls_section( 'wk_section', array( 'label' => __( 'Section', 'wulf-kit' ) ) );
		$this->add_control( 'anchor', array( 'label' => __( 'Anchor (for menu links)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'film', 'description' => __( 'Links to #this-name jump here. Letters, numbers and dashes only.', 'wulf-kit' ) ) );
		$this->add_control( 'join', array( 'label' => __( 'Tuck under the section above', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		$this->start_controls_section( 's_sec', array( 'label' => __( 'Section', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_control( 'bg', array(
			'label'       => __( 'Background', 'wulf-kit' ),
			'type'        => Controls_Manager::COLOR,
			'selectors'   => array( '{{WRAPPER}} .wk' => '--reel-bg: {{VALUE}};' ),
			'description' => __( 'Keep it dark: the film\'s black melts into it.', 'wulf-kit' ),
		) );
		$this->add_responsive_control( 'pad', array(
			'label'      => __( 'Padding', 'wulf-kit' ),
			'type'       => Controls_Manager::DIMENSIONS,
			'size_units' => array( 'px', 'em', 'vw' ),
			'selectors'  => array( '{{WRAPPER}} .wk .reel' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'max', array(
			'label'      => __( 'Content width', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( 'px' ),
			'range'      => array( 'px' => array( 'min' => 600, 'max' => 1800 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk' => '--max: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_control( 'edge', array(
			'label'     => __( 'Soft edges (%)', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 20 ) ),
			'selectors' => array( '{{WRAPPER}} .wk' => '--reel-edge: {{SIZE}}%;' ),
		) );
		$this->end_controls_section();
		$this->style_head( '.reel-head' );
		$this->start_controls_section( 's_tabs', array( 'label' => __( 'Tabs', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'tab_c', __( 'Text', 'wulf-kit' ), '.ft-tab' );
		$this->color( 'tab_on', __( 'Text, chosen', 'wulf-kit' ), '.ft-tab[aria-selected="true"]' );
		$this->color( 'tab_bar', __( 'Progress line', 'wulf-kit' ), '.ft-tab .rc-p', 'background-color' );
		$this->end_controls_section();
		$this->text_style( 'ct', __( 'Chapter titles', 'wulf-kit' ), '.ft-panel .h3' );
		$this->text_style( 'cx', __( 'Chapter text', 'wulf-kit' ), '.ft-panel p' );
		$this->button_style( 'b', __( 'Chapter buttons', 'wulf-kit' ), '.ft-panel .btn' );
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$items = array_values( array_filter( (array) ( $s['items'] ?? array() ), static function ( $it ) {
			return '' !== trim( (string) ( $it['tab'] ?? '' ) );
		} ) );
		if ( ! $items ) {
			return;
		}
		$id   = 'ft-' . $this->get_id();
		$win  = 'yes' === ( $s['watch'] ?? '' ) ? WK_Films::window_data( (string) ( $s['watch_film'] ?? 'motion' ), (array) ( $s['watch_video'] ?? array() ) ) : null;
		$side = 'right' === ( $s['side'] ?? '' ) ? 'right' : 'left';

		$this->open( $s, '', array( 'auto' => 'yes' === ( $s['autoplay'] ?? '' ), 'film' => $win ) );
		echo '<section class="reel l-tabs side-' . esc_attr( $side ) . ' dark txt-light' . ( 'yes' === ( $s['join'] ?? '' ) ? ' join' : '' ) . '"' . $this->anchor_attr( $s ) . ( '' !== trim( (string) $s['title'] ) ? ' aria-labelledby="' . esc_attr( $id ) . '-h"' : '' ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<div class="reel-head">';
		$this->head( $s, WK_Films::watch( $win, (string) ( $s['watch_text'] ?? '' ), 'reel-watch-link' ) . WK_Films::watch_note( 'yes' === ( $s['watch'] ?? '' ) && ! $win ), $id . '-h' );
		echo '</div>';

		// Tabs.
		echo '<div class="ft-tabs" role="tablist" aria-label="' . esc_attr( wp_strip_all_tags( (string) ( '' !== trim( (string) $s['title'] ) ? str_replace( '*', '', $s['title'] ) : __( 'Chapters', 'wulf-kit' ) ) ) ) . '">';
		foreach ( $items as $i => $it ) {
			echo '<button type="button" role="tab" class="ft-tab" id="' . esc_attr( $id . '-t' . $i ) . '" aria-controls="' . esc_attr( $id . '-p' . $i ) . '" aria-selected="' . ( $i ? 'false' : 'true' ) . '" tabindex="' . ( $i ? '-1' : '0' ) . '"><span class="ft-n" aria-hidden="true">' . esc_html( sprintf( '%02d', $i + 1 ) ) . '</span><span class="ft-l">' . esc_html( $it['tab'] ) . '</span><i class="rc-p" aria-hidden="true"></i></button>';
		}
		echo '</div>';

		echo '<div class="ft-grid">';
		// The film: one layer per chapter; only the chosen one shows and plays.
		echo '<figure class="reel-stage ft-stage">';
		foreach ( $items as $i => $it ) {
			$d = WK_Films::loop_data( (string) ( $it['clip'] ?? 'shapes' ), (array) ( $it['video'] ?? array() ), (array) ( $it['poster'] ?? array() ) );
			echo '<div class="ft-layer' . ( $i ? '' : ' is-active' ) . '" data-safe="' . esc_attr( wp_json_encode( $d['safe'] ) ) . '">' . WK_Films::media( $d, array( 'loop' => false, 'sizes' => '(max-width: 900px) 100vw, 58vw' ) ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
		}
		echo WK_Films::pause_button(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
		echo '</figure>';

		// The words for each chapter.
		echo '<div class="ft-panels">';
		foreach ( $items as $i => $it ) {
			$d = WK_Films::clip( (string) ( $it['clip'] ?? '' ) );
			echo '<div class="ft-panel" role="tabpanel" id="' . esc_attr( $id . '-p' . $i ) . '" aria-labelledby="' . esc_attr( $id . '-t' . $i ) . '"' . ( $i ? ' hidden' : '' ) . ' tabindex="0">';
			if ( '' !== trim( (string) ( $it['title'] ?? '' ) ) ) {
				echo '<h3 class="h3">' . self::rich( $it['title'] ) . '</h3>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			if ( '' !== trim( (string) ( $it['text'] ?? '' ) ) ) {
				echo '<p>' . esc_html( $it['text'] ) . '</p>';
			}
			if ( $d && '' !== $d['alt'] ) {
				echo '<p class="sr">' . esc_html( $d['alt'] ) . '</p>';
			}
			$btn = $this->button( $it, 'b', 'btn btn-gold', true );
			if ( '' !== $btn ) {
				echo '<div class="ft-cta">' . $btn . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
			}
			echo '</div>';
		}
		echo '</div></div></div></section>';
		$this->close();
	}
}
