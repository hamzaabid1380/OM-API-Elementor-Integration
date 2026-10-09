<?php
/**
 * Numbered steps ("How it works"): number or icon, title, text.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Steps_Widget extends WK_Widget {

	protected $key = 'steps';

	public function get_title() {
		return __( 'Wulf · Steps', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-number-field';
	}

	protected function register_controls() {
		$this->section_controls( array( 'tone' => 'ivory' ) );
		$this->head_controls( array( 'eyebrow' => __( 'How it works', 'wulf-kit' ), 'title' => __( 'Simple, from start to finish.', 'wulf-kit' ), 'align' => 'center' ) );
		$this->start_controls_section( 'c_items', array( 'label' => __( 'Steps', 'wulf-kit' ) ) );
		$this->add_control( 'look', array(
			'label'   => __( 'Look', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'timeline',
			'options' => array( 'timeline' => __( 'Showcase: a gold line that draws in, with photos', 'wulf-kit' ), 'cards' => __( 'Boxes', 'wulf-kit' ) ),
		) );
		$this->add_control( 'marker', array(
			'label'   => __( 'Marker', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'number',
			'options' => array( 'number' => __( 'Numbers', 'wulf-kit' ), 'icon' => __( 'Icons', 'wulf-kit' ) ),
		) );
		$r = new Repeater();
		$r->add_control( 'icon', array( 'label' => __( 'Icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'spark', 'options' => WK_Icons::options() ) );
		$r->add_control( 'image', array( 'label' => __( 'Photo (optional, Showcase look)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'default' => array( 'url' => '' ) ) );
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => '' ) );
		$this->add_control( 'items', array(
			'label'       => __( 'Steps', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'default'     => array(
				array( 'icon' => 'calendar', 'title' => __( 'Consult', 'wulf-kit' ), 'text' => __( 'A relaxed, free conversation about style, timing and budget.', 'wulf-kit' ) ),
				array( 'icon' => 'gem', 'title' => __( 'Compare', 'wulf-kit' ), 'text' => __( 'Diamonds side by side under the loupe, grading reports in hand.', 'wulf-kit' ) ),
				array( 'icon' => 'tool', 'title' => __( 'Craft', 'wulf-kit' ), 'text' => __( 'We set your stone, or design one from scratch with you.', 'wulf-kit' ) ),
				array( 'icon' => 'spark', 'title' => __( 'Celebrate', 'wulf-kit' ), 'text' => __( 'Pick it up, and come back for free cleaning any time.', 'wulf-kit' ) ),
			),
		) );
		$this->button_fields( 'b1', __( 'Button under the steps', 'wulf-kit' ), '', '#visit', true );
		$this->add_control( 'img_phone', array( 'label' => __( 'Step photos on phones', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'show', 'options' => array( 'show' => __( 'Show', 'wulf-kit' ), 'hide' => __( 'Hide (numbers only, shorter page)', 'wulf-kit' ) ), 'condition' => array( 'look' => 'timeline' ) ) );
		$this->add_control( 'call_line', array( 'label' => __( 'Phone line with open status under the button', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->start_controls_section( 's_grid', array( 'label' => __( 'Grid', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->grid_controls( 'g', '.steps', null, 6 );
		$this->end_controls_section();
		$this->box_style( 'card', __( 'Step boxes', 'wulf-kit' ), '.steps li' );
		$this->start_controls_section( 's_mark', array( 'label' => __( 'Numbers & icons', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'mk_bg', __( 'Circle', 'wulf-kit' ), '.st-mk', 'background-color' );
		$this->color( 'mk_bd', __( 'Circle border', 'wulf-kit' ), '.st-mk', 'border-color' );
		$this->color( 'mk_c', __( 'Number / icon', 'wulf-kit' ), '.st-mk' );
		$this->color( 'mk_hbg', __( 'Circle on hover', 'wulf-kit' ), '.steps li:hover .st-mk', 'background-color' );
		$this->color( 'mk_hc', __( 'Number / icon on hover', 'wulf-kit' ), '.steps li:hover .st-mk' );
		$this->end_controls_section();
		$this->start_controls_section( 's_line', array( 'label' => __( 'Line & photos (Showcase)', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE, 'condition' => array( 'look' => 'timeline' ) ) );
		$this->color( 'line_c', __( 'Line and dots', 'wulf-kit' ), '.steps.tl', '--tl' );
		$this->color( 'num_c', __( 'Big numbers', 'wulf-kit' ), '.tl-n' );
		$this->add_responsive_control( 'img_ratio', array(
			'label'     => __( 'Photo shape', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => '',
			'options'   => array( '' => __( 'Default', 'wulf-kit' ), '1 / 1' => __( 'Square', 'wulf-kit' ), '4 / 3' => __( 'Landscape', 'wulf-kit' ), '3 / 4' => __( 'Portrait', 'wulf-kit' ), '16 / 9' => __( 'Wide', 'wulf-kit' ) ),
			'selectors' => array( '{{WRAPPER}} .wk .tl-img' => 'aspect-ratio: {{VALUE}};' ),
		) );
		$this->end_controls_section();
		$this->text_style( 't', __( 'Step titles', 'wulf-kit' ), '.steps .h3' );
		$this->text_style( 'x', __( 'Step text', 'wulf-kit' ), '.steps p' );
		$this->button_style( 'b1', __( 'Button', 'wulf-kit' ), '.steps-cta .btn' );
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$items = (array) $s['items'];
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		$tl = 'cards' !== ( $s['look'] ?? 'timeline' );
		if ( $tl ) {
			// Showcase: a gold line through numbered dots, photo (optional), title and text.
			$imgs = array_map( function ( $it ) {
				return $this->img_url( $it['image'] ?? array() );
			}, $items );
			$has  = (bool) array_filter( $imgs );
			echo '<ol class="steps tl' . ( $has ? ' has-img' : '' ) . ( $has && 'hide' === ( $s['img_phone'] ?? 'show' ) ? ' no-img-m' : '' ) . '" style="--n:' . (int) max( 1, min( 5, count( $items ) ) ) . '">';
			foreach ( array_values( $items ) as $i => $it ) {
				$num = sprintf( '%02d', $i + 1 );
				echo '<li><span class="tl-dot" aria-hidden="true"></span>';
				if ( $has ) {
					echo '<span class="tl-img">' . ( $imgs[ $i ] ? '<img src="' . esc_url( $imgs[ $i ] ) . '" alt="" loading="lazy" decoding="async">' : '' ) . '<span class="tl-n" aria-hidden="true">' . esc_html( $num ) . '</span></span>';
				} else {
					echo '<span class="tl-n" aria-hidden="true">' . esc_html( $num ) . '</span>';
				}
				echo '<h3 class="h3">' . esc_html( $it['title'] ) . '</h3>' . ( $it['text'] ? '<p>' . esc_html( $it['text'] ) . '</p>' : '' ) . '</li>';
			}
			echo '</ol>';
		} else {
			echo '<ol class="steps" style="--n:' . (int) max( 1, min( 4, count( $items ) ) ) . '">';
			foreach ( $items as $i => $it ) {
				$mk = 'icon' === $s['marker'] ? WK_Icons::svg( $it['icon'] ) : (string) ( $i + 1 );
				echo '<li><span class="st-mk" aria-hidden="true">' . $mk . '</span><h3 class="h3">' . esc_html( $it['title'] ) . '</h3>' . ( $it['text'] ? '<p>' . esc_html( $it['text'] ) . '</p>' : '' ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</ol>';
		}
		$b     = $this->button( $s, 'b1', 'btn ' . ( 'dark' === ( $s['tone'] ?? '' ) ? 'btn-gold' : 'btn-ink' ), true );
		$phone = WK_Settings::get( 'phone' );
		$call  = 'yes' === ( $s['call_line'] ?? '' ) && $phone ? '<p class="cta-call">' . WK_Icons::svg( 'phone' ) . '<span>' . esc_html__( 'Or call', 'wulf-kit' ) . '</span> <a href="' . esc_attr( WK_Settings::tel( $phone ) ) . '">' . esc_html( $phone ) . '</a> · <span data-status-text></span></p>' : '';
		if ( $b || $call ) {
			echo '<div class="steps-cta">' . $b . $call . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div></section>';
		$this->close();
	}
}
