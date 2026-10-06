<?php
/**
 * Journal: your latest blog posts, or hand-picked articles.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Posts_Widget extends WK_Widget {

	protected $key = 'posts';

	public function get_title() {
		return __( 'Wulf · Journal', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-posts-grid';
	}

	protected function register_controls() {
		$m = WK_URL . 'assets/media/';
		$this->section_controls( array( 'anchor' => 'journal', 'rule' => 'yes' ) );
		$this->head_controls( array( 'eyebrow' => __( 'The journal', 'wulf-kit' ), 'title' => __( 'Good to know, before you buy.', 'wulf-kit' ) ) );
		$this->start_controls_section( 'c_src', array( 'label' => __( 'Articles', 'wulf-kit' ) ) );
		$this->add_control( 'source', array(
			'label'   => __( 'Show', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'manual',
			'options' => array( 'latest' => __( 'My latest blog posts', 'wulf-kit' ), 'manual' => __( 'Hand-picked below', 'wulf-kit' ) ),
		) );
		$cats = array( '' => __( 'All categories', 'wulf-kit' ) );
		foreach ( get_categories( array( 'hide_empty' => false ) ) as $c ) {
			$cats[ (string) $c->term_id ] = $c->name;
		}
		$this->add_control( 'cat', array( 'label' => __( 'Category', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => '', 'options' => $cats, 'condition' => array( 'source' => 'latest' ) ) );
		$this->add_control( 'count', array( 'label' => __( 'How many', 'wulf-kit' ), 'type' => Controls_Manager::NUMBER, 'default' => 3, 'min' => 1, 'max' => 12, 'condition' => array( 'source' => 'latest' ) ) );
		$r = new Repeater();
		$r->add_control( 'image', array( 'label' => __( 'Picture', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA ) );
		$r->add_control( 'kicker', array( 'label' => __( 'Small label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => '' ) );
		$r->add_control( 'link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'dynamic' => array( 'active' => true ) ) );
		$this->add_control( 'items', array(
			'label'       => __( 'Articles', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'condition'   => array( 'source' => 'manual' ),
			'default'     => array(
				array( 'image' => array( 'url' => $m . '85121.webp' ), 'kicker' => 'Care · 5 min read', 'title' => 'The 5 most common jewelry repair issues, and how to fix them', 'text' => 'Loose prongs, thin shanks, broken clasps and more.' ),
				array( 'image' => array( 'url' => $m . '40664.webp' ), 'kicker' => 'Care · 4 min read', 'title' => 'How to tell when your jewelry needs repair', 'text' => 'The small signs worth a free inspection.' ),
				array( 'image' => array( 'url' => $m . 'LG-Studs-1cttw.webp' ), 'kicker' => 'Guide · 6 min read', 'title' => 'Lab-grown or natural? An honest side-by-side', 'text' => 'What\'s actually different, and how to choose.' ),
			),
		) );
		$this->add_control( 'fit', array(
			'label'     => __( 'Picture fit', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => 'contain',
			'options'   => array( 'contain' => __( 'Product on white', 'wulf-kit' ), 'cover' => __( 'Fill the frame', 'wulf-kit' ) ),
		) );
		$this->add_control( 'all_text', array( 'label' => __( '"All articles" text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'All articles', 'wulf-kit' ), 'separator' => 'before' ) );
		$this->add_control( 'all_link', array( 'label' => __( '"All articles" link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'default' => array( 'url' => get_option( 'page_for_posts' ) ? get_permalink( (int) get_option( 'page_for_posts' ) ) : home_url( '/blog/' ) ) ) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->start_controls_section( 's_grid', array( 'label' => __( 'Grid', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->grid_controls( 'g', '.posts', null, 4 );
		$this->color( 'img_bg', __( 'Picture background', 'wulf-kit' ), '.post .slot', 'background-color' );
		$this->color( 'img_bd', __( 'Picture border', 'wulf-kit' ), '.post .slot', 'border-color' );
		$this->end_controls_section();
		$this->text_style( 'k', __( 'Small labels', 'wulf-kit' ), '.post small' );
		$this->text_style( 't', __( 'Titles', 'wulf-kit' ), '.post .h3 a', true );
		$this->text_style( 'x', __( 'Text', 'wulf-kit' ), '.post p' );
		$this->text_style( 'all', __( '"All articles" link', 'wulf-kit' ), '.shead .link', true );
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$items = array();
		if ( 'latest' === $s['source'] ) {
			$q = get_posts( array( 'numberposts' => max( 1, (int) $s['count'] ), 'post_status' => 'publish', 'category' => $s['cat'] ? (int) $s['cat'] : 0 ) );
			foreach ( $q as $p ) {
				$cats    = get_the_category( $p->ID );
				$words   = str_word_count( wp_strip_all_tags( $p->post_content ) );
				$items[] = array(
					'img'    => get_the_post_thumbnail_url( $p, 'large' ),
					/* translators: %d: minutes */
					'kicker' => ( $cats ? $cats[0]->name . ' · ' : '' ) . sprintf( __( '%d min read', 'wulf-kit' ), max( 1, (int) round( $words / 220 ) ) ),
					'title'  => get_the_title( $p ),
					'text'   => wp_trim_words( get_the_excerpt( $p ), 14 ),
					'link'   => array( 'url' => get_permalink( $p ) ),
				);
			}
		} else {
			foreach ( (array) $s['items'] as $it ) {
				$items[] = array( 'img' => $this->img_url( $it['image'] ), 'kicker' => $it['kicker'], 'title' => $it['title'], 'text' => $it['text'], 'link' => $it['link'] );
			}
		}
		$all = $s['all_text'] && ! empty( $s['all_link']['url'] ) ? '<a class="link"' . self::link_attrs( $s['all_link'] ) . '>' . esc_html( $s['all_text'] ) . ' ' . WK_Icons::svg( 'arr' ) . '</a>' : '';
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s, $all );
		echo '<div class="posts">';
		foreach ( $items as $p ) {
			echo '<article class="post"><div class="slot pv' . ( 'cover' === $s['fit'] ? ' fit-cover' : '' ) . '">' . ( $p['img'] ? '<img src="' . esc_url( $p['img'] ) . '" alt="" loading="lazy" decoding="async">' : '' ) . '</div>';
			if ( $p['kicker'] ) {
				echo '<small>' . esc_html( $p['kicker'] ) . '</small>';
			}
			echo '<h3 class="h3"><a' . self::link_attrs( $p['link'] ) . '>' . esc_html( $p['title'] ) . '</a></h3>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			if ( $p['text'] ) {
				echo '<p>' . esc_html( $p['text'] ) . '</p>';
			}
			echo '</article>';
		}
		echo '</div></div></section>';
		$this->close();
	}
}
