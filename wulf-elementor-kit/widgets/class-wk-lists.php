<?php
/**
 * Grouped lists in columns ("Services we offer", "Brands we repair", "Coins we buy"…).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Lists_Widget extends WK_Widget {

	protected $key = 'lists';

	public function get_title() {
		return __( 'Wulf · Lists', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-bullet-list';
	}

	protected function register_controls() {
		$this->section_controls( array( 'rule' => 'yes' ) );
		$this->head_controls( array( 'eyebrow' => __( 'What we do', 'wulf-kit' ), 'title' => __( 'Everything, under one roof.', 'wulf-kit' ) ) );
		$this->start_controls_section( 'c_groups', array( 'label' => __( 'Lists', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'icon', array( 'label' => __( 'Icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'none', 'options' => WK_Icons::options() ) );
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true ) );
		$r->add_control( 'text', array( 'label' => __( 'Short text (optional)', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => '' ) );
		$r->add_control( 'items', array( 'label' => __( 'Items, one per line', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 8, 'default' => '', 'description' => __( 'Start a line with ** to make it bold, e.g. **Morgan dollars', 'wulf-kit' ) ) );
		$r->add_control( 'link_text', array( 'label' => __( 'Link text (optional)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'dynamic' => array( 'active' => true ) ) );
		$this->add_control( 'groups', array(
			'label'       => __( 'Lists', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'default'     => array(
				array( 'icon' => 'tool', 'title' => __( 'Repairs', 'wulf-kit' ), 'items' => "Ring resizing\nProng re-tipping\nChain repair" ),
				array( 'icon' => 'gem', 'title' => __( 'Stones', 'wulf-kit' ), 'items' => "Stone tightening\nReplacing gemstones" ),
			),
		) );
		$this->add_control( 'marker', array(
			'label'   => __( 'Item marker', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'check',
			'options' => array( 'check' => __( 'Tick', 'wulf-kit' ), 'dot' => __( 'Dot', 'wulf-kit' ), 'none' => __( 'None', 'wulf-kit' ) ),
		) );
		$this->add_control( 'boxed', array( 'label' => __( 'Show each list in a card', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->start_controls_section( 's_grid', array( 'label' => __( 'Grid', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->grid_controls( 'g', '.lists', null, 4 );
		$this->add_responsive_control( 'item_cols', array(
			'label'     => __( 'Columns inside each list', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 1, 'max' => 4 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .lists ul' => 'columns: {{SIZE}};' ),
		) );
		$this->end_controls_section();
		$this->box_style( 'card', __( 'Cards', 'wulf-kit' ), '.lists > div', false );
		$this->start_controls_section( 's_icon', array( 'label' => __( 'Icons & ticks', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'ic_bg', __( 'Title icon circle', 'wulf-kit' ), '.lists .v-ic', 'background-color' );
		$this->color( 'ic_c', __( 'Title icon', 'wulf-kit' ), '.lists .v-ic' );
		$this->color( 'tick', __( 'Ticks and dots', 'wulf-kit' ), '.lists li::before', 'background-color' );
		$this->end_controls_section();
		$this->text_style( 't', __( 'List titles', 'wulf-kit' ), '.lists .h3' );
		$this->text_style( 'x', __( 'Short text', 'wulf-kit' ), '.lists .l-text' );
		$this->text_style( 'li', __( 'Items', 'wulf-kit' ), '.lists li' );
		$this->text_style( 'lk', __( 'Links', 'wulf-kit' ), '.lists .link', true );
	}

	protected function render() {
		$s      = $this->get_settings_for_display();
		$groups = (array) $s['groups'];
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo '<div class="lists mk-' . esc_attr( $s['marker'] ) . ( 'yes' === $s['boxed'] ? ' boxed' : '' ) . '" style="--n:' . (int) max( 1, min( 3, count( $groups ) ) ) . '">';
		foreach ( $groups as $g ) {
			echo '<div>';
			if ( $g['icon'] && 'none' !== $g['icon'] ) {
				echo '<span class="v-ic">' . WK_Icons::svg( $g['icon'] ) . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			if ( $g['title'] ) {
				echo '<h3 class="h3">' . esc_html( $g['title'] ) . '</h3>';
			}
			if ( $g['text'] ) {
				echo '<p class="l-text">' . esc_html( $g['text'] ) . '</p>';
			}
			$lines = array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) $g['items'] ) ) );
			if ( $lines ) {
				echo '<ul>';
				foreach ( $lines as $l ) {
					echo 0 === strpos( $l, '**' ) ? '<li><b>' . esc_html( ltrim( substr( $l, 2 ) ) ) . '</b></li>' : '<li>' . esc_html( $l ) . '</li>';
				}
				echo '</ul>';
			}
			if ( $g['link_text'] && ! empty( $g['link']['url'] ) ) {
				echo '<a class="link"' . self::link_attrs( $g['link'] ) . '>' . esc_html( $g['link_text'] ) . ' ' . WK_Icons::svg( 'arr' ) . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</div>';
		}
		echo '</div></div></section>';
		$this->close();
	}
}
