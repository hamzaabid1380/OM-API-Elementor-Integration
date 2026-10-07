<?php
/**
 * "How your ring comes together": the picture stays put while the steps scroll past,
 * changing from a self-drawing sketch to the finished ring.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Craft_Widget extends WK_Widget {

	protected $key = 'craft';

	public function get_title() {
		return __( 'Wulf · Ring builds itself', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-time-line';
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'craft', 'rule' => 'yes' ) );
		$this->head_controls( array( 'eyebrow' => __( 'How your ring comes together', 'wulf-kit' ), 'title' => __( 'Every Wulf ring is built around you.', 'wulf-kit' ), 'lead' => __( 'Four decisions, one relaxed conversation. You choose each step, with a GIA-certified jeweler beside you for all of them.', 'wulf-kit' ), 'align' => 'center' ) );

		$this->start_controls_section( 'c_steps', array( 'label' => __( 'Steps', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'k', array( 'label' => __( 'Small label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'name', array( 'label' => __( 'Short name (under the picture)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => '' ) );
		$r->add_control( 'visual', array(
			'label'   => __( 'Picture', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'image',
			'options' => array(
				'sketch' => __( 'Drawing: sketch that draws itself', 'wulf-kit' ),
				'metal'  => __( 'Drawing: the setting in metal', 'wulf-kit' ),
				'stone'  => __( 'Drawing: setting with the diamond', 'wulf-kit' ),
				'image'  => __( 'My image', 'wulf-kit' ),
				'video'  => __( 'My video', 'wulf-kit' ),
			),
		) );
		$r->add_control( 'metal', array(
			'label'     => __( 'Drawing metal', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => 'white',
			'options'   => array( 'white' => __( 'White gold', 'wulf-kit' ), 'yellow' => __( 'Yellow gold', 'wulf-kit' ), 'rose' => __( 'Rose gold', 'wulf-kit' ) ),
			'condition' => array( 'visual' => array( 'metal', 'stone' ) ),
		) );
		$r->add_control( 'image', array( 'label' => __( 'Image', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'condition' => array( 'visual' => 'image' ) ) );
		$r->add_control( 'video', array( 'label' => __( 'Video', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'media_types' => array( 'video' ), 'condition' => array( 'visual' => 'video' ) ) );
		$this->add_control( 'steps', array(
			'label'       => __( 'Steps', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'default'     => array(
				array( 'k' => __( 'Step 1', 'wulf-kit' ), 'name' => __( 'Setting', 'wulf-kit' ), 'title' => __( 'Choose your setting', 'wulf-kit' ), 'text' => __( 'Solitaire, halo, hidden halo, three stone, pavé or vintage. Start from a sketch, or from real designs we can make for you.', 'wulf-kit' ), 'visual' => 'sketch' ),
				array( 'k' => __( 'Step 2', 'wulf-kit' ), 'name' => __( 'Metal', 'wulf-kit' ), 'title' => __( 'Pick your metal', 'wulf-kit' ), 'text' => __( 'Yellow, white or rose gold, or platinum. Each one changes how the diamond looks, so we\'ll show you side by side.', 'wulf-kit' ), 'visual' => 'metal', 'metal' => 'white' ),
				array( 'k' => __( 'Step 3', 'wulf-kit' ), 'name' => __( 'Diamond', 'wulf-kit' ), 'title' => __( 'Choose your diamond', 'wulf-kit' ), 'text' => __( 'Natural or lab-grown, graded and documented. Compare them under the loupe with a GIA-certified jeweler before you decide.', 'wulf-kit' ), 'visual' => 'stone', 'metal' => 'white' ),
				array( 'k' => __( 'Step 4', 'wulf-kit' ), 'name' => __( 'Ready to wear', 'wulf-kit' ), 'title' => __( 'Set, checked, ready to wear', 'wulf-kit' ), 'text' => __( 'Your diamond is set and the ring is checked before it\'s yours. After that, bring it back any time for free cleaning and inspection.', 'wulf-kit' ), 'visual' => 'image', 'image' => array( 'url' => WK_URL . 'assets/media/51162-E.webp' ) ),
			),
		) );
		$this->add_control( 'layout', array(
			'label'       => __( 'Layout', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'scroll',
			'options'     => array( 'scroll' => __( 'Scroll story (steps change as you scroll)', 'wulf-kit' ), 'compact' => __( 'Compact (one screen, steps play in turn)', 'wulf-kit' ) ),
			'description' => __( 'Compact keeps the section to one screen: the steps play one after another, and visitors can click any step.', 'wulf-kit' ),
		) );
		$this->add_control( 'interval', array( 'label' => __( 'Seconds per step (compact)', 'wulf-kit' ), 'type' => Controls_Manager::NUMBER, 'default' => 4, 'min' => 2, 'max' => 15, 'condition' => array( 'layout' => 'compact' ) ) );
		$this->add_control( 'step_word', array( 'label' => __( 'Counter wording', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Step %1$s of %2$s', 'wulf-kit' ), 'description' => __( '%1$s is the step, %2$s the total.', 'wulf-kit' ) ) );
		$this->add_control( 'sweep', array( 'label' => __( 'Light sweep on the last step', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->button_fields( 'b1', __( 'Button 1', 'wulf-kit' ), __( 'Start designing yours', 'wulf-kit' ), '#studio' );
		$this->button_fields( 'b2', __( 'Button 2', 'wulf-kit' ), __( 'Book a visit', 'wulf-kit' ), '#visit', 'Engagement ring' );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->box_style( 'frame', __( 'Picture frame', 'wulf-kit' ), '.cr-frame', false );
		$this->start_controls_section( 's_steps', array( 'label' => __( 'Steps', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'line', __( 'Line', 'wulf-kit' ), '.cr-step', 'border-left-color' );
		$this->color( 'line_on', __( 'Line, current step', 'wulf-kit' ), '.cr-step.is-active', 'border-left-color' );
		$this->color( 'dots', __( 'Progress dashes', 'wulf-kit' ), '.cr-dots li', 'background' );
		$this->color( 'dots_on', __( 'Progress dashes, done', 'wulf-kit' ), '.cr-dots li.on', 'background' );
		$this->add_responsive_control( 'step_h', array(
			'label'      => __( 'Scroll length per step', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( 'vh', 'px' ),
			'range'      => array( 'vh' => array( 'min' => 20, 'max' => 100 ), 'px' => array( 'min' => 200, 'max' => 900 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk .cr-step' => 'min-height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->color( 'prog', __( 'Step timer bar (compact)', 'wulf-kit' ), '.craft-compact .cr-step.is-active::after', 'background-color' );
		$this->color( 'step_hbg', __( 'Step background on hover (compact)', 'wulf-kit' ), '.craft-compact .cr-step:hover', 'background-color' );
		$this->color( 'step_abg', __( 'Current step background (compact)', 'wulf-kit' ), '.craft-compact .cr-step.is-active', 'background-color' );
		$this->end_controls_section();
		$this->text_style( 'k', __( 'Step labels', 'wulf-kit' ), '.cr-step .k' );
		$this->text_style( 'st', __( 'Step titles', 'wulf-kit' ), '.cr-step .h3' );
		$this->text_style( 'sx', __( 'Step text', 'wulf-kit' ), '.cr-step p:last-child' );
		$this->text_style( 'lab', __( 'Counter under the picture', 'wulf-kit' ), '.cr-label' );
		$this->button_style( 'b1', __( 'Button 1', 'wulf-kit' ), '.craft-cta .btn-ink' );
		$this->button_style( 'b2', __( 'Button 2', 'wulf-kit' ), '.craft-cta .btn-line' );
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$steps = array_values( (array) $s['steps'] );
		$n     = count( $steps );
		if ( ! $n ) {
			return;
		}
		$names = array_map( static function ( $x ) { return (string) $x['name']; }, $steps );
		$compact = 'compact' === ( $s['layout'] ?? 'scroll' );
		$this->open( $s, '', array( 'names' => $names, 'word' => $s['step_word'], 'sweep' => 'yes' === $s['sweep'], 'compact' => $compact, 'interval' => max( 2, (int) ( $s['interval'] ?? 4 ) ) ) );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo '<div class="craft-grid' . ( $compact ? ' craft-compact' : '' ) . '"><div class="craft-stage"><div class="cr-frame slot" aria-hidden="true">';
		foreach ( $steps as $i => $st ) {
			$on  = $i === $n - 1 ? ' is-on' : '';
			$art = '';
			$in  = '';
			switch ( $st['visual'] ) {
				case 'sketch':
					$art = ' data-art="sketch"';
					break;
				case 'metal':
					$art = ' data-art="metal" data-metal="' . esc_attr( $st['metal'] ) . '"';
					break;
				case 'stone':
					$art = ' data-art="stone" data-metal="' . esc_attr( $st['metal'] ) . '"';
					break;
				case 'video':
					$in = ! empty( $st['video']['url'] ) ? '<video class="cr-photo" muted loop playsinline autoplay src="' . esc_url( $st['video']['url'] ) . '"></video>' : '';
					break;
				default:
					$in = ! empty( $st['image']['url'] ) ? '<img class="cr-photo" src="' . esc_url( $this->img_url( $st['image'] ) ) . '" alt="">' : '';
			}
			echo '<div class="cr-layer' . esc_attr( $on ) . '" data-stage="' . (int) ( $i + 1 ) . '"' . $art . '>' . $in . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( 'yes' === $s['sweep'] ) {
			echo '<span class="sweep"></span>';
		}
		$last = sprintf( $s['step_word'], $n, $n );
		echo '<div class="cr-meta"><p class="cr-label">' . esc_html( $last ) . ' · <b>' . esc_html( $names[ $n - 1 ] ) . '</b></p><ol class="cr-dots">' . str_repeat( '<li class="on"></li>', $n ) . '</ol></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '</div></div><ol class="craft-steps">';
		foreach ( $steps as $i => $st ) {
			echo '<li class="cr-step" data-stage="' . (int) ( $i + 1 ) . '"' . ( $compact ? ' tabindex="0" role="button" aria-pressed="false"' : '' ) . '>' . ( $st['k'] ? '<p class="k">' . esc_html( $st['k'] ) . '</p>' : '' ) . '<h3 class="h3">' . esc_html( $st['title'] ) . '</h3><p>' . esc_html( $st['text'] ) . '</p></li>';
		}
		echo '</ol></div>';
		$b = $this->button( $s, 'b1', 'btn btn-ink', true ) . $this->button( $s, 'b2', 'btn btn-line' );
		if ( $b ) {
			echo '<div class="craft-cta">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div></section>';
		$this->close();
	}
}
