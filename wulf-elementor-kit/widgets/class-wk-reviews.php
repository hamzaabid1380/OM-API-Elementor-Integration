<?php
/**
 * Reviews: rating summary and review cards, typed in or live from Google.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Reviews_Widget extends WK_Widget {

	protected $key = 'reviews';

	public function get_title() {
		return __( 'Wulf · Reviews', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-testimonial-carousel';
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'reviews' ) );
		$this->start_controls_section( 'c_sum', array( 'label' => __( 'Rating', 'wulf-kit' ) ) );
		$this->add_control( 'source', array(
			'label'       => __( 'Reviews come from', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'manual',
			'options'     => array( 'manual' => __( 'Typed in below', 'wulf-kit' ), 'google' => __( 'Google, live', 'wulf-kit' ) ),
			'description' => __( 'Google needs an API key and Place ID in Wulf Kit › Settings. If Google can\'t be reached, the typed-in reviews show instead.', 'wulf-kit' ),
		) );
		$this->add_control( 'eyebrow', array( 'label' => __( 'Small label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Reviews', 'wulf-kit' ) ) );
		$this->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'What our customers say.', 'wulf-kit' ) ) );
		$this->add_control( 'title_tag', array( 'type' => Controls_Manager::HIDDEN, 'default' => 'h2' ) );
		$this->add_control( 'rating', array( 'label' => __( 'Rating', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '[4.9]', 'description' => __( 'Your real Google rating, e.g. 4.9.', 'wulf-kit' ) ) );
		$this->add_control( 'count', array( 'label' => __( 'Under the rating', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Google rating · [N] reviews', 'wulf-kit' ) ) );
		$this->add_control( 'g_text', array( 'label' => __( 'Link text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Read all reviews on Google', 'wulf-kit' ) ) );
		$this->add_control( 'g_link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'default' => array( 'url' => 'https://share.google/ZIKvRTnr9JcbLdgex', 'is_external' => 'on' ) ) );
		$this->add_control( 'max', array( 'label' => __( 'Most reviews to show', 'wulf-kit' ), 'type' => Controls_Manager::NUMBER, 'default' => 3, 'min' => 1, 'max' => 10 ) );
		$this->add_control( 'min_stars', array( 'label' => __( 'Only Google reviews with at least', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => '4', 'options' => array( '1' => '1 ★', '3' => '3 ★', '4' => '4 ★', '5' => '5 ★' ), 'condition' => array( 'source' => 'google' ) ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_list', array( 'label' => __( 'Reviews (typed in)', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'quote', array( 'label' => __( 'Review', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 4, 'default' => '' ) );
		$r->add_control( 'name', array( 'label' => __( 'Name', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'what', array( 'label' => __( 'What for', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'stars', array( 'label' => __( 'Stars', 'wulf-kit' ), 'type' => Controls_Manager::NUMBER, 'default' => 5, 'min' => 1, 'max' => 5 ) );
		$this->add_control( 'items', array(
			'label'       => __( 'Reviews', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ name }}}',
			'default'     => array(
				array( 'quote' => __( '[A real Google review from an engagement-ring customer goes here, two or three sentences long.]', 'wulf-kit' ), 'name' => __( 'First name · Town', 'wulf-kit' ), 'what' => __( 'Engagement ring', 'wulf-kit' ), 'stars' => 5 ),
				array( 'quote' => __( '[A real review from a repair or sizing customer goes here, ideally mentioning speed and care.]', 'wulf-kit' ), 'name' => __( 'First name · Town', 'wulf-kit' ), 'what' => __( 'Ring repair', 'wulf-kit' ), 'stars' => 5 ),
				array( 'quote' => __( '[A real review from someone who sold gold or diamonds goes here, ideally mentioning a fair offer.]', 'wulf-kit' ), 'name' => __( 'First name · Town', 'wulf-kit' ), 'what' => __( 'Sold gold', 'wulf-kit' ), 'stars' => 5 ),
			),
		) );
		$this->end_controls_section();

		$this->style_section();
		$this->text_style( 'eyebrow', __( 'Small label', 'wulf-kit' ), '.rating .eyebrow' );
		$this->text_style( 'title', __( 'Title', 'wulf-kit' ), '.rating .h2' );
		$this->text_style( 'big', __( 'Rating number', 'wulf-kit' ), '.rating .big', false, true, array(
			'small' => array( 'label' => __( 'Small text color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .rating .big small' => 'color: {{VALUE}};' ) ),
			'stars' => array( 'label' => __( 'Stars color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .stars' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'link', __( 'Link', 'wulf-kit' ), '.rating .link', true );
		$this->box_style( 'card', __( 'Review cards', 'wulf-kit' ), '.rev' );
		$this->text_style( 'q', __( 'Review text', 'wulf-kit' ), '.rev blockquote', false, true, array(
			'qm' => array( 'label' => __( 'Quote mark color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .rev .qm' => 'color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'who', __( 'Name', 'wulf-kit' ), '.rev figcaption' );
	}

	private static function stars( $n ) {
		return str_repeat( WK_Icons::svg( 'star' ), max( 0, min( 5, (int) $n ) ) );
	}

	protected function render() {
		$s      = $this->get_settings_for_display();
		$rating = $s['rating'];
		$count  = $s['count'];
		$link   = $s['g_link'];
		$items  = array();
		$g      = 'google' === $s['source'] ? WK_Reviews::google() : null;
		if ( $g ) {
			$rating = number_format( $g['rating'], 1 );
			/* translators: %s: number of reviews */
			$count = sprintf( __( 'Google rating · %s reviews', 'wulf-kit' ), number_format_i18n( $g['count'] ) );
			if ( $g['url'] ) {
				$link = array( 'url' => $g['url'], 'is_external' => 'on' );
			}
			foreach ( $g['reviews'] as $r ) {
				if ( $r['rating'] >= (int) $s['min_stars'] ) {
					$items[] = array( 'quote' => $r['text'], 'name' => $r['author'], 'what' => $r['when'], 'stars' => $r['rating'] );
				}
			}
		}
		if ( ! $items ) {
			$items = (array) $s['items'];
		}
		$items = array_slice( $items, 0, max( 1, (int) $s['max'] ) );
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap reviews"><div class="rating">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $s['eyebrow'] ) {
			echo '<p class="eyebrow">' . esc_html( $s['eyebrow'] ) . '</p>';
		}
		if ( $s['title'] ) {
			echo '<h2 class="h2">' . self::rich( $s['title'] ) . '</h2>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '<div class="stars" aria-hidden="true">' . self::stars( 5 ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $rating ) {
			echo '<p class="big">' . esc_html( $rating ) . '<small>' . esc_html( $count ) . '</small></p>';
		}
		if ( $s['g_text'] && ! empty( $link['url'] ) ) {
			echo '<a class="link"' . self::link_attrs( $link ) . '>' . esc_html( $s['g_text'] ) . ' ' . WK_Icons::svg( 'arr' ) . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div><div class="rev-list">';
		foreach ( $items as $r ) {
			/* translators: %d: stars */
			echo '<figure class="rev"><span class="qm" aria-hidden="true">“</span><blockquote>' . esc_html( $r['quote'] ) . '</blockquote><figcaption><b>' . esc_html( $r['name'] ) . '</b>' . esc_html( $r['what'] ) . '</figcaption><div class="stars" aria-label="' . esc_attr( sprintf( __( '%d out of 5 stars', 'wulf-kit' ), (int) $r['stars'] ) ) . '">' . self::stars( $r['stars'] ) . '</div></figure>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div></div></section>';
		$this->close();
	}
}
