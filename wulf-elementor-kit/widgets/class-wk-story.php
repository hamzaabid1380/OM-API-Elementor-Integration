<?php
/**
 * Our story: chapters on the right; the big year and the photo on the left follow the
 * chapter being read. Ends with a signature.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Story_Widget extends WK_Widget {

	protected $key = 'story';

	public function get_title() {
		return __( 'Wulf · Our story', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-history';
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'story', 'rule' => 'yes' ) );
		$this->head_controls( array( 'eyebrow' => __( 'Our story · Independent since 1971', 'wulf-kit' ), 'title' => __( 'It started with a suitcase of gems.', 'wulf-kit' ), 'lead' => __( 'Five decades later it\'s a showroom on Broadway, with the same promise: transparent, honest advice, and never a rushed decision.', 'wulf-kit' ) ) );

		$m = WK_URL . 'assets/media/';
		$this->start_controls_section( 'c_ch', array( 'label' => __( 'Chapters', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'year', array( 'label' => __( 'Year label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'big', array( 'label' => __( 'Big year (left)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'Short: 1971, 1990s, Today.', 'wulf-kit' ) ) );
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::WYSIWYG, 'default' => '' ) );
		$r->add_control( 'image', array( 'label' => __( 'Photo', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA ) );
		$r->add_control( 'cap', array( 'label' => __( 'Photo caption', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$this->add_control( 'chapters', array(
			'label'       => __( 'Chapters', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ year }}} · {{{ title }}}',
			'default'     => array(
				array( 'year' => '1971', 'big' => '1971', 'title' => 'A suitcase of fine gems', 'text' => '<strong>Tom &amp; Virginia Moriarty</strong> start Aaland Diamond Company. Tom, a former electrician and gem enthusiast, travels the Midwest selling fine gems to jewelers.', 'image' => array( 'url' => $m . 'tile-loose.webp' ), 'cap' => 'Fine gems: where it all began' ),
				array( 'year' => 'Mid-1990s', 'big' => '1990s', 'title' => 'Doors open to the public', 'text' => 'The business starts welcoming customers directly, from the Twin Towers next to the Star Plaza Theatre in Merrillville.', 'image' => array( 'url' => $m . 'hero-solitaire.webp' ), 'cap' => 'Engagement rings for generations of couples' ),
				array( 'year' => '2008', 'big' => '2008', 'title' => 'Cullen Wulf joins', 'text' => '<strong>Cullen Wulf</strong> joins the team as a Valparaiso University student, later earns his GIA certification and takes over the annual buying trips.', 'image' => array( 'url' => $m . 'cullen.webp' ), 'cap' => 'Cullen Wulf' ),
				array( 'year' => '2011', 'big' => '2011', 'title' => 'A bigger store', 'text' => 'A larger showroom on U.S. 30, by the I-65 interchange in Merrillville.', 'image' => array( 'url' => $m . 'svc-repair.webp' ), 'cap' => 'Our own bench for repairs and sizing' ),
				array( 'year' => '2015', 'big' => '2015', 'title' => 'AaLand becomes Wulf', 'text' => 'Cullen takes over ownership, and the store becomes <strong>Wulf Diamond Jewelers</strong>.', 'image' => array( 'url' => $m . 'sign.webp' ), 'cap' => 'The Wulf name' ),
				array( 'year' => 'Today', 'big' => 'Today', 'title' => 'A new showroom on Broadway', 'text' => 'A newly built showroom at <strong>10460 Broadway, Crown Point</strong>, in the Crown Village development. Come and say hello.', 'image' => array( 'url' => $m . 'showroom.webp' ), 'cap' => 'Our showroom at 10460 Broadway, Crown Point' ),
			),
		) );
		$this->add_control( 'show_year', array( 'label' => __( 'Big year on the left', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_sig', array( 'label' => __( 'Signature', 'wulf-kit' ) ) );
		$this->add_control( 'sig_on', array( 'label' => __( 'Show the signature', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'sig_face', array( 'label' => __( 'Small photo', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'default' => array( 'url' => $m . 'cullen-face.webp' ) ) );
		$this->add_control( 'sig_img', array( 'label' => __( 'Signature image', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'description' => __( 'Leave empty to use Cullen\'s signature (it takes the gold color below).', 'wulf-kit' ) ) );
		$this->add_control( 'sig_name', array( 'label' => __( 'Name', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'Cullen Wulf' ) );
		$this->add_control( 'sig_role', array( 'label' => __( 'Role', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Owner · GIA-certified jeweler', 'wulf-kit' ) ) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head( '.st-main' );
		$this->text_style( 'year', __( 'Big year', 'wulf-kit' ), '.st-year' );
		$this->start_controls_section( 's_photo', array( 'label' => __( 'Photo', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'ph_ratio', array(
			'label'     => __( 'Shape', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => '',
			'options'   => array( '' => __( 'Default (4:3)', 'wulf-kit' ), '1 / 1' => '1:1', '3 / 4' => '3:4', '16 / 10' => '16:10' ),
			'selectors' => array( '{{WRAPPER}} .wk .st-photo' => 'aspect-ratio: {{VALUE}};' ),
		) );
		$this->add_responsive_control( 'ph_radius', array(
			'label'     => __( 'Corner radius', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .st-photo' => 'border-radius: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
		$this->text_style( 'cap', __( 'Photo caption', 'wulf-kit' ), '.st-cap' );
		$this->start_controls_section( 's_ch', array( 'label' => __( 'Chapters', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_control( 'ch_line', array( 'label' => __( 'Line & dots', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .ch' => 'border-left-color: {{VALUE}};', '{{WRAPPER}} .wk .ch::before' => 'border-color: {{VALUE}};' ) ) );
		$this->add_control( 'ch_on', array( 'label' => __( 'Line & dot, current chapter', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .ch.is-active' => 'border-left-color: {{VALUE}};', '{{WRAPPER}} .wk .ch.is-active::before' => 'border-color: {{VALUE}}; background: {{VALUE}};' ) ) );
		$this->add_control( 'ch_dot_bg', array( 'label' => __( 'Dot fill', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .ch:not(.is-active)::before' => 'background: {{VALUE}};' ) ) );
		$this->end_controls_section();
		$this->text_style( 'chy', __( 'Chapter years', 'wulf-kit' ), '.ch-year' );
		$this->text_style( 'cht', __( 'Chapter titles', 'wulf-kit' ), '.ch .h3' );
		$this->text_style( 'chx', __( 'Chapter text', 'wulf-kit' ), '.ch .ch-text p' );
		$this->text_style( 'sig', __( 'Signature', 'wulf-kit' ), '.sign p', false, true, array(
			'ink' => array( 'label' => __( 'Signature color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .sig-svg' => 'color: {{VALUE}};' ) ),
		) );
	}

	protected function render() {
		$s   = $this->get_settings_for_display();
		$chs = array_values( (array) $s['chapters'] );
		if ( ! $chs ) {
			return;
		}
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap st-grid"><div class="st-side">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( 'yes' === $s['show_year'] ) {
			echo '<p class="st-year" aria-hidden="true"><span>' . esc_html( $chs[0]['big'] ) . '</span></p>';
		}
		echo '<div class="st-photo slot" aria-hidden="true">';
		foreach ( $chs as $i => $c ) {
			$src = $this->img_url( $c['image'] );
			echo '<div class="st-layer ph' . ( $i ? '' : ' is-on' ) . '">' . ( $src ? '<img src="' . esc_url( $src ) . '" alt="" loading="lazy" decoding="async">' : '' ) . '</div>';
		}
		echo '</div><p class="st-cap">' . esc_html( $chs[0]['cap'] ) . '</p></div><div class="st-main">';
		$this->head( $s );
		echo '<ol class="chapters">';
		foreach ( $chs as $i => $c ) {
			echo '<li class="ch' . ( $i ? '' : ' is-active' ) . '" data-year="' . esc_attr( $c['big'] ) . '" data-cap="' . esc_attr( $c['cap'] ) . '"><p class="ch-year">' . esc_html( $c['year'] ) . '</p><h3 class="h3">' . esc_html( $c['title'] ) . '</h3><div class="ch-text">' . wp_kses_post( wpautop( $c['text'] ) ) . '</div></li>';
		}
		echo '</ol>';
		if ( 'yes' === $s['sig_on'] ) {
			echo '<div class="sign">';
			if ( ! empty( $s['sig_face']['url'] ) ) {
				echo '<img class="sig-face" src="' . esc_url( $this->img_url( $s['sig_face'] ) ) . '" alt="" loading="lazy" decoding="async">';
			}
			if ( ! empty( $s['sig_img']['url'] ) ) {
				echo '<img class="sig-svg" src="' . esc_url( $s['sig_img']['url'] ) . '" alt="' . esc_attr( $s['sig_name'] ) . '">';
			} else {
				$svg = file_get_contents( WK_DIR . 'assets/media/cullen-signature.svg' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
				echo $svg ? $svg : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '<p><b>' . esc_html( $s['sig_name'] ) . '</b>' . esc_html( $s['sig_role'] ) . '</p></div>';
		}
		echo '</div></div></section>';
		$this->close();
	}
}
