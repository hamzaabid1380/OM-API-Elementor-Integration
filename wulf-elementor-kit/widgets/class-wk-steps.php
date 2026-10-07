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
		$this->add_control( 'marker', array(
			'label'   => __( 'Marker', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'number',
			'options' => array( 'number' => __( 'Numbers', 'wulf-kit' ), 'icon' => __( 'Icons', 'wulf-kit' ) ),
		) );
		$r = new Repeater();
		$r->add_control( 'icon', array( 'label' => __( 'Icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'spark', 'options' => WK_Icons::options() ) );
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
		echo '<ol class="steps" style="--n:' . (int) max( 1, min( 4, count( $items ) ) ) . '">';
		foreach ( $items as $i => $it ) {
			$mk = 'icon' === $s['marker'] ? WK_Icons::svg( $it['icon'] ) : (string) ( $i + 1 );
			echo '<li><span class="st-mk" aria-hidden="true">' . $mk . '</span><h3 class="h3">' . esc_html( $it['title'] ) . '</h3>' . ( $it['text'] ? '<p>' . esc_html( $it['text'] ) . '</p>' : '' ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</ol>';
		$b = $this->button( $s, 'b1', 'btn ' . ( 'dark' === ( $s['tone'] ?? '' ) ? 'btn-gold' : 'btn-ink' ), true );
		if ( $b ) {
			echo '<div class="steps-cta">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div></section>';
		$this->close();
	}
}
