<?php
/**
 * Values / promises: icon cards ("We build trust", "We listen"…).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Values_Widget extends WK_Widget {

	protected $key = 'values';

	public function get_title() {
		return __( 'Wulf · Values', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-info-box';
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'values', 'rule' => 'yes' ) );
		$this->head_controls( array( 'eyebrow' => __( 'A different kind of jeweler', 'wulf-kit' ), 'title' => __( 'We build relationships, not just rings.', 'wulf-kit' ), 'align' => 'center' ) );
		$this->start_controls_section( 'c_items', array( 'label' => __( 'Cards', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'icon', array( 'label' => __( 'Icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'cert', 'options' => WK_Icons::options() ) );
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => '' ) );
		$this->add_control( 'items', array(
			'label'       => __( 'Cards', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'default'     => array(
				array( 'icon' => 'cert', 'title' => __( 'We build trust', 'wulf-kit' ), 'text' => __( 'One of the most respected local jewelers in the greater Chicago area. We pride ourselves on honesty and quality.', 'wulf-kit' ) ),
				array( 'icon' => 'heart', 'title' => __( 'We listen', 'wulf-kit' ), 'text' => __( 'Jewelry purchases can be overwhelming. We ask questions to understand your style, needs and budget.', 'wulf-kit' ) ),
				array( 'icon' => 'gem', 'title' => __( 'We know jewelry', 'wulf-kit' ), 'text' => __( 'Our business is built on years of experience and knowledge of jewelry and the jewelry industry.', 'wulf-kit' ) ),
				array( 'icon' => 'spark', 'title' => __( 'We make it easy', 'wulf-kit' ), 'text' => __( 'A wide selection, custom options and concierge service, so choosing your jewelry is fun and easy.', 'wulf-kit' ) ),
			),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_rating', array( 'label' => __( 'Google rating line', 'wulf-kit' ) ) );
		$this->add_control( 'rating_on', array( 'label' => __( 'Show a rating line next to the title', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes' ) );
		$this->add_control( 'rating', array( 'label' => __( 'Rating', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '[4.9]', 'description' => __( 'Your real Google rating. Used when no Google API key is set in Wulf Kit › Settings; with a key, the live rating is shown.', 'wulf-kit' ), 'condition' => array( 'rating_on' => 'yes' ) ) );
		$this->add_control( 'rating_label', array( 'label' => __( 'Text after the rating', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'on Google · [N] reviews', 'wulf-kit' ), 'description' => __( '{count} becomes the live review count when a Google key is set.', 'wulf-kit' ), 'condition' => array( 'rating_on' => 'yes' ) ) );
		$this->add_control( 'rating_link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'default' => array( 'url' => 'https://share.google/ZIKvRTnr9JcbLdgex', 'is_external' => 'on' ), 'condition' => array( 'rating_on' => 'yes' ) ) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->start_controls_section( 's_grid', array( 'label' => __( 'Grid', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->grid_controls( 'g', '.vals', null, 6 );
		$this->end_controls_section();
		$this->box_style( 'card', __( 'Cards', 'wulf-kit' ), '.vals li' );
		$this->start_controls_section( 's_icon', array( 'label' => __( 'Icons', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'ic_bg', __( 'Circle', 'wulf-kit' ), '.v-ic', 'background-color' );
		$this->color( 'ic_c', __( 'Icon', 'wulf-kit' ), '.v-ic' );
		$this->color( 'ic_hbg', __( 'Circle on card hover', 'wulf-kit' ), '.vals li:hover .v-ic', 'background-color' );
		$this->color( 'ic_hc', __( 'Icon on card hover', 'wulf-kit' ), '.vals li:hover .v-ic' );
		$this->add_responsive_control( 'ic_size', array(
			'label'     => __( 'Circle size', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 24, 'max' => 120 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .v-ic' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
		$this->text_style( 't', __( 'Card titles', 'wulf-kit' ), '.vals .h3' );
		$this->text_style( 'x', __( 'Card text', 'wulf-kit' ), '.vals p' );
		$this->text_style( 'rt', __( 'Rating line', 'wulf-kit' ), '.v-rating', '.v-rating:hover', true, array(
			'star' => array( 'label' => __( 'Stars', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .v-rating .stars' => 'color: {{VALUE}};' ) ),
		) );
	}

	/** "★★★★★ 4.9 on Google · 650 reviews →" (live from Google when a key is set). */
	private function rating_line( $s ) {
		if ( 'yes' !== ( $s['rating_on'] ?? '' ) ) {
			return '';
		}
		$g      = class_exists( 'WK_Reviews' ) ? WK_Reviews::google() : null;
		$rating = $g ? number_format_i18n( $g['rating'], 1 ) : (string) $s['rating'];
		$label  = (string) $s['rating_label'];
		$label  = $g ? str_replace( array( '{count}', '[N]' ), number_format_i18n( $g['count'] ), $label ) : str_replace( '{count}', '[N]', $label );
		$stars  = str_repeat( WK_Icons::svg( 'star' ), 5 );
		return '<a class="v-rating"' . self::link_attrs( $s['rating_link'] ) . '><span class="stars" aria-hidden="true">' . $stars . '</span><b>' . esc_html( $rating ) . '</b> <span>' . esc_html( $label ) . '</span> ' . WK_Icons::svg( 'arr' ) . '</a>';
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s, $this->rating_line( $s ) );
		echo '<ul class="vals">';
		foreach ( (array) $s['items'] as $it ) {
			echo '<li><span class="v-ic">' . WK_Icons::svg( $it['icon'] ) . '</span><h3 class="h3">' . esc_html( $it['title'] ) . '</h3><p>' . esc_html( $it['text'] ) . '</p></li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</ul></div></section>';
		$this->close();
	}
}
