<?php
/**
 * Brand film: one part of Wulf's films (or your own video) playing silently on a loop, as the first
 * screen of a page or beside a heading and text. Under it, the film's moments (the shapes, the steps,
 * the years) light up as they play and jump to that moment when chosen. "Watch the film" plays the
 * whole film with sound in a window on the page.
 *
 * The films are black with bright lines; their black melts into the section's dark background.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Reel_Widget extends WK_Widget {

	protected $key = 'reel';

	/** Its heading sits in a column, not across the section. */
	protected $head_wide = false;

	public function get_title() {
		return __( 'Wulf · Brand film', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-play';
	}

	public function get_keywords() {
		return array( 'wulf', 'film', 'video', 'brand', 'story', 'shapes', 'custom', 'suitcase', 'reel' );
	}

	public function get_style_depends() {
		return array( 'wulf-kit', 'wulf-kit-reel' );
	}

	protected function register_controls() {
		$this->start_controls_section( 'c_film', array( 'label' => __( 'Film', 'wulf-kit' ) ) );
		$this->add_control( 'clip', array(
			'label'       => __( 'Which part', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'shapes',
			'options'     => WK_Films::clip_options(),
			'description' => __( 'Parts of "Wulf Diamond Jewelers" (1:15) and "The Suitcase" (0:39). They play silently, on a loop.', 'wulf-kit' ),
		) );
		$this->add_control( 'video', array(
			'label'       => __( 'Your video', 'wulf-kit' ),
			'type'        => Controls_Manager::MEDIA,
			'media_types' => array( 'video' ),
			'condition'   => array( 'clip' => 'upload' ),
			'description' => __( 'An MP4 of 10 to 40 seconds on a black background works best. It plays silently, on a loop.', 'wulf-kit' ),
		) );
		$this->add_control( 'poster', array(
			'label'       => __( 'Still picture', 'wulf-kit' ),
			'type'        => Controls_Manager::MEDIA,
			'default'     => array( 'url' => '' ),
			'description' => __( 'Shown until the film plays, and instead of it for visitors whose device asks for less motion. Empty uses a frame of the film.', 'wulf-kit' ),
		) );
		$this->add_control( 'autoplay', array(
			'label'        => __( 'Play on its own (silently)', 'wulf-kit' ),
			'type'         => Controls_Manager::SWITCHER,
			'default'      => 'yes',
			'return_value' => 'yes',
			'description'  => __( 'Plays while on screen and rests when scrolled away. Visitors who ask for less motion, or who save mobile data, see the still picture and a play button.', 'wulf-kit' ),
		) );
		$this->add_control( 'layout', array(
			'label'     => __( 'Layout', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => 'split',
			'separator' => 'before',
			'options'   => array(
				'split' => __( 'Beside the text', 'wulf-kit' ),
				'hero'  => __( 'First screen of the page (with the main heading)', 'wulf-kit' ),
			),
		) );
		$this->add_control( 'side', array(
			'label'     => __( 'Film on the', 'wulf-kit' ),
			'type'      => Controls_Manager::CHOOSE,
			'default'   => 'right',
			'options'   => array(
				'left'  => array( 'title' => __( 'Left', 'wulf-kit' ), 'icon' => 'eicon-h-align-left' ),
				'right' => array( 'title' => __( 'Right', 'wulf-kit' ), 'icon' => 'eicon-h-align-right' ),
			),
			'condition' => array( 'layout' => 'split' ),
		) );
		$this->add_control( 'fit', array(
			'label'       => __( 'Picture', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'auto',
			'options'     => array(
				'auto'  => __( 'Automatic', 'wulf-kit' ),
				'whole' => __( 'Whole picture', 'wulf-kit' ),
				'fill'  => __( 'Fill the space (trims the empty sides)', 'wulf-kit' ),
			),
			'description' => __( 'Automatic fills the first screen and shows the whole picture beside text. Words in the film are never cut off.', 'wulf-kit' ),
		) );
		$this->end_controls_section();

		$this->head_controls(
			array(
				'eyebrow' => __( 'The shape', 'wulf-kit' ),
				'title'   => __( 'Eight shapes. *One that\'s yours.*', 'wulf-kit' ),
				'lead'    => __( 'Each shape returns light in its own way, so we compare them side by side, under the loupe, before you decide.', 'wulf-kit' ),
			)
		);

		$this->start_controls_section( 'c_text', array( 'label' => __( 'Text & buttons', 'wulf-kit' ) ) );
		$this->add_control( 'text', array( 'label' => __( 'More text (optional)', 'wulf-kit' ), 'type' => Controls_Manager::WYSIWYG, 'default' => '' ) );
		$this->add_control( 'promise', array(
			'label'       => __( 'A promise, in large italics (optional)', 'wulf-kit' ),
			'type'        => Controls_Manager::TEXTAREA,
			'rows'        => 2,
			'default'     => '',
			'condition'   => array( 'layout' => 'split' ),
			'description' => __( 'e.g. Honest advice, and never a rushed decision. Shown in quotation marks.', 'wulf-kit' ),
		) );
		$this->add_control( 'sig_on', array( 'label' => __( 'Signed under the promise', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes', 'condition' => array( 'layout' => 'split' ) ) );
		$this->add_control( 'sig_face', array( 'label' => __( 'Photo', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'default' => array( 'url' => WK_URL . 'assets/media/cullen-face.webp' ), 'condition' => array( 'layout' => 'split', 'sig_on' => 'yes' ) ) );
		$this->add_control( 'sig_name', array( 'label' => __( 'Name', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'Cullen Wulf', 'condition' => array( 'layout' => 'split', 'sig_on' => 'yes' ) ) );
		$this->add_control( 'sig_role', array( 'label' => __( 'Role', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Owner · GIA-certified jeweler', 'wulf-kit' ), 'condition' => array( 'layout' => 'split', 'sig_on' => 'yes' ) ) );
		$this->add_control( 'lead_m', array(
			'label'       => __( 'Shorter intro for phones', 'wulf-kit' ),
			'type'        => Controls_Manager::TEXTAREA,
			'rows'        => 2,
			'default'     => '',
			'condition'   => array( 'layout' => 'hero' ),
			'description' => __( 'Phones show this instead, so the buttons fit on the first screen. Empty uses the intro.', 'wulf-kit' ),
		) );
		$this->button_fields( 'b1', __( 'Main button', 'wulf-kit' ), __( 'Book a free consultation', 'wulf-kit' ), '#visit', true );
		$this->button_fields( 'b2', __( 'Second button', 'wulf-kit' ), '', '' );
		$this->add_control( 'note', array( 'label' => __( 'Reassurance under the buttons', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true, 'separator' => 'before', 'condition' => array( 'layout' => 'hero' ), 'description' => __( 'Separate points with |', 'wulf-kit' ) ) );
		$this->add_control( 'call', array( 'label' => __( '"Or call…" line with open status', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'condition' => array( 'layout' => 'hero' ) ) );
		$this->add_control( 'call_text', array( 'label' => __( 'Starts with', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Or call', 'wulf-kit' ), 'condition' => array( 'layout' => 'hero', 'call' => 'yes' ) ) );
		$this->add_control( 'rating', array( 'label' => __( 'Live Google rating in the trust line', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'condition' => array( 'layout' => 'hero' ), 'description' => __( 'Shows once Google reviews are set up in Wulf Kit › Settings.', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'icon', array( 'label' => __( 'Icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'clock', 'options' => WK_Icons::options() ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$this->add_control( 'trust', array(
			'label'       => __( 'Trust points', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ text }}}',
			'condition'   => array( 'layout' => 'hero' ),
			'default'     => array(
				array( 'icon' => 'clock', 'text' => __( 'Since 1971', 'wulf-kit' ) ),
				array( 'icon' => 'cert', 'text' => __( 'GIA-certified jewelers', 'wulf-kit' ) ),
				array( 'icon' => 'cash', 'text' => __( '12 months same as cash*', 'wulf-kit' ) ),
			),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_cues', array( 'label' => __( 'Moments under the film', 'wulf-kit' ) ) );
		$this->add_control( 'cues_src', array(
			'label'       => __( 'Show', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'film',
			'options'     => array(
				'film' => __( 'The film\'s own (shapes, steps or years)', 'wulf-kit' ),
				'mine' => __( 'My own list', 'wulf-kit' ),
				'none' => __( 'None', 'wulf-kit' ),
			),
			'description' => __( 'Each one lights up while it plays, and plays from there when chosen.', 'wulf-kit' ),
		) );
		$this->add_control( 'cue_style', array(
			'label'   => __( 'Look', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'auto',
			'options' => array(
				'auto'     => __( 'The film\'s own', 'wulf-kit' ),
				'chips'    => __( 'Small buttons', 'wulf-kit' ),
				'steps'    => __( 'Numbered steps', 'wulf-kit' ),
				'timeline' => __( 'Years on a line', 'wulf-kit' ),
			),
			'condition' => array( 'cues_src!' => 'none' ),
		) );
		$c = new Repeater();
		$c->add_control( 't', array( 'label' => __( 'Starts at (seconds)', 'wulf-kit' ), 'type' => Controls_Manager::NUMBER, 'min' => 0, 'step' => 0.1, 'default' => 0 ) );
		$c->add_control( 'label', array( 'label' => __( 'Name', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$c->add_control( 'text', array( 'label' => __( 'Short text (steps and years)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true ) );
		$this->add_control( 'cues', array(
			'label'       => __( 'Moments', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $c->get_controls(),
			'title_field' => '{{{ t }}}s · {{{ label }}}',
			'default'     => array(),
			'condition'   => array( 'cues_src' => 'mine' ),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_watch', array( 'label' => __( 'Watch the film (with sound)', 'wulf-kit' ) ) );
		$this->add_control( 'watch', array( 'label' => __( '"Watch the film" button', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'description' => __( 'Plays the whole film with sound in a window on the page.', 'wulf-kit' ) ) );
		$this->add_control( 'watch_text', array( 'label' => __( 'Button words', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Watch the film', 'wulf-kit' ), 'condition' => array( 'watch' => 'yes' ) ) );
		$this->add_control( 'watch_film', array(
			'label'     => __( 'Film', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => 'auto',
			'options'   => array(
				'auto'     => __( 'The one this part comes from', 'wulf-kit' ),
				'motion'   => __( 'Wulf Diamond Jewelers (1:15)', 'wulf-kit' ),
				'suitcase' => __( 'The Suitcase (0:39)', 'wulf-kit' ),
				'upload'   => __( 'My own video', 'wulf-kit' ),
			),
			'condition' => array( 'watch' => 'yes' ),
		) );
		$this->add_control( 'watch_video', array( 'label' => __( 'Your film with sound', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'media_types' => array( 'video' ), 'condition' => array( 'watch' => 'yes', 'watch_film' => 'upload' ) ) );
		$this->add_control( 'watch_title', array( 'label' => __( 'Title in the window', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'condition' => array( 'watch' => 'yes' ), 'description' => __( 'Empty uses the film\'s name.', 'wulf-kit' ) ) );
		$this->end_controls_section();

		$this->start_controls_section( 'wk_section', array( 'label' => __( 'Section', 'wulf-kit' ) ) );
		$this->add_control( 'anchor', array( 'label' => __( 'Anchor (for menu links)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'Links to #this-name jump here. Letters, numbers and dashes only.', 'wulf-kit' ) ) );
		$this->add_control( 'join', array( 'label' => __( 'Tuck under the section above', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes', 'description' => __( 'Removes the space on top, for a dark section above.', 'wulf-kit' ) ) );
		$this->add_control( 'day_tone', array(
			'label'       => __( 'In the Daylight look', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'paper',
			'options'     => array(
				'paper' => __( 'Words on paper, the film in a dark case', 'wulf-kit' ),
				'dark'  => __( 'A dark chapter (stays dark)', 'wulf-kit' ),
			),
			'condition'   => array( 'layout' => 'split' ),
			'description' => __( 'A dark chapter is the one night-coloured moment on a light page, like stepping into the jewel box: gold words and buttons, the film\'s moments under the film, fine lines in the background (a grid with square corners, step-cut lines with cut corners).', 'wulf-kit' ),
		) );
		$this->end_controls_section();

		// Style.
		$this->start_controls_section( 's_sec', array( 'label' => __( 'Section', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_control( 'bg', array(
			'label'       => __( 'Background', 'wulf-kit' ),
			'type'        => Controls_Manager::COLOR,
			'selectors'   => array( '{{WRAPPER}} .wk' => '--reel-bg: {{VALUE}};' ),
			'description' => __( 'Keep it dark: the film\'s black melts into it. Empty uses the dark color from Wulf Kit › Settings.', 'wulf-kit' ),
		) );
		$this->add_responsive_control( 'pad', array(
			'label'      => __( 'Padding', 'wulf-kit' ),
			'type'       => Controls_Manager::DIMENSIONS,
			'size_units' => array( 'px', 'em', 'vw' ),
			'selectors'  => array( '{{WRAPPER}} .wk .reel.l-split' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
			'condition'  => array( 'layout' => 'split' ),
		) );
		$this->add_responsive_control( 'max', array(
			'label'      => __( 'Content width', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( 'px' ),
			'range'      => array( 'px' => array( 'min' => 600, 'max' => 1800 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk' => '--max: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'film_w', array(
			'label'      => __( 'Film share of the width (%)', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'range'      => array( 'px' => array( 'min' => 40, 'max' => 70 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk' => '--reel-fw: {{SIZE}};' ),
			'description' => __( 'Computers and tablets. Default 58.', 'wulf-kit' ),
		) );
		$this->add_control( 'edge', array(
			'label'       => __( 'Soft edges (%)', 'wulf-kit' ),
			'type'        => Controls_Manager::SLIDER,
			'range'       => array( 'px' => array( 'min' => 0, 'max' => 20 ) ),
			'selectors'   => array( '{{WRAPPER}} .wk' => '--reel-edge: {{SIZE}}%;' ),
			'description' => __( 'How gently the film fades into the background at its edges. Default 8.', 'wulf-kit' ),
		) );
		$this->end_controls_section();
		$this->start_controls_section( 'wk_s_head', array( 'label' => __( 'Heading', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->text_style( 'eyebrow', __( 'Small label', 'wulf-kit' ), '.reel-copy .eyebrow', false, false );
		$this->text_style( 'title', __( 'Title', 'wulf-kit' ), '.reel-copy .h1, {{WRAPPER}} .wk .reel-copy .h2', false, false );
		$this->add_control( 'title_em_color', array(
			'label'     => __( 'Gold words color', 'wulf-kit' ),
			'type'      => Controls_Manager::COLOR,
			'selectors' => array( '{{WRAPPER}} .wk .reel-copy .gold-em' => 'color: {{VALUE}};' ),
		) );
		$this->text_style( 'lead', __( 'Intro text', 'wulf-kit' ), '.reel-copy .lead', false, false );
		$this->end_controls_section();
		$this->text_style( 'body', __( 'More text', 'wulf-kit' ), '.reel-text' );
		$this->start_controls_section( 's_cues', array( 'label' => __( 'Moments under the film', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'cue_c', __( 'Text', 'wulf-kit' ), '.rc' );
		$this->color( 'cue_on', __( 'Text, current', 'wulf-kit' ), '.rc[aria-current]' );
		$this->color( 'cue_bar', __( 'Progress line', 'wulf-kit' ), '.rc-p', 'background-color' );
		$this->end_controls_section();
		$this->button_style( 'b1', __( 'Main button', 'wulf-kit' ), '.reel-cta .btn-gold' );
		$this->button_style( 'b2', __( 'Second button', 'wulf-kit' ), '.reel-cta .btn-ghost:not(.reel-watch)' );
		$this->text_style( 'wl', __( '"Watch the film"', 'wulf-kit' ), '.reel-watch', true );
	}

	/** The "Or call…" line, the reassurance points and the trust points, as on the other first screens. */
	private function hero_extras( $s ) {
		$out    = '';
		$points = array_filter( array_map( 'trim', explode( '|', (string) ( $s['note'] ?? '' ) ) ) );
		if ( $points ) {
			$out .= '<ul class="hero-note">';
			foreach ( $points as $p ) {
				$out .= '<li>' . WK_Icons::svg( 'check' ) . esc_html( $p ) . '</li>';
			}
			$out .= '</ul>';
		}
		$phone = WK_Settings::get( 'phone' );
		if ( 'yes' === ( $s['call'] ?? '' ) && $phone ) {
			$out .= '<p class="hero-call">' . esc_html( $s['call_text'] ?? '' ) . ' <a href="' . esc_attr( WK_Settings::tel() ) . '">' . esc_html( $phone ) . '</a> · <span data-status-text></span></p>';
		}
		$trust = '';
		$g     = 'yes' === ( $s['rating'] ?? '' ) && class_exists( 'WK_Reviews' ) ? WK_Reviews::google() : null;
		if ( $g && ! empty( $g['count'] ) ) {
			/* translators: 1: rating like 4.9, 2: number of reviews */
			$txt   = sprintf( _n( '%1$s · %2$s Google review', '%1$s · %2$s Google reviews', $g['count'], 'wulf-kit' ), number_format_i18n( $g['rating'], 1 ), number_format_i18n( $g['count'] ) );
			$url   = $g['url'] ? $g['url'] : (string) WK_Settings::get( 'maps_url' );
			$trust .= '<li class="t-rating">' . ( $url ? '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener">' : '' ) . WK_Icons::svg( 'star' ) . esc_html( $txt ) . ( $url ? '</a>' : '' ) . '</li>';
		}
		foreach ( (array) ( $s['trust'] ?? array() ) as $t ) {
			if ( '' !== trim( (string) ( $t['text'] ?? '' ) ) ) {
				$trust .= '<li>' . WK_Icons::svg( $t['icon'] ?? 'check' ) . esc_html( $t['text'] ) . '</li>';
			}
		}
		if ( '' !== $trust ) {
			$out .= '<ul class="trust">' . $trust . '</ul>';
		}
		return $out;
	}

	/** The promise in large italics, signed with a photo, the signature and a name. */
	private function promise( $s ) {
		$q = trim( (string) ( $s['promise'] ?? '' ) );
		if ( '' === $q ) {
			return '';
		}
		$out = '<figure class="reel-promise"><blockquote>' . esc_html( $q ) . '</blockquote>';
		if ( 'yes' === ( $s['sig_on'] ?? '' ) ) {
			$face = $this->img_url( (array) ( $s['sig_face'] ?? array() ) );
			$svg  = file_get_contents( WK_DIR . 'assets/media/cullen-signature.svg' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			$name = trim( (string) ( $s['sig_name'] ?? '' ) );
			$out .= '<figcaption>' . ( $face ? '<img class="rp-face" src="' . esc_url( $face ) . '" alt="" loading="lazy" decoding="async">' : '' )
				. ( $svg && 'Cullen Wulf' === $name ? $svg : '' )
				. '<span><b>' . esc_html( $name ) . '</b>' . esc_html( (string) ( $s['sig_role'] ?? '' ) ) . '</span></figcaption>';
		}
		return $out . '</figure>';
	}

	/** The moments to list: the film's own, the editor's, or none. */
	private function moments( $s, $d ) {
		$src = $s['cues_src'] ?? 'film';
		if ( 'none' === $src ) {
			return array();
		}
		if ( 'mine' !== $src ) {
			return $d['cues'];
		}
		$out = array();
		foreach ( (array) ( $s['cues'] ?? array() ) as $c ) {
			if ( '' !== trim( (string) ( $c['label'] ?? '' ) ) && is_numeric( $c['t'] ?? '' ) ) {
				$out[] = array( max( 0, (float) $c['t'] ), (string) $c['label'], (string) ( $c['text'] ?? '' ) );
			}
		}
		usort( $out, static function ( $a, $b ) {
			return $a[0] <=> $b[0];
		} );
		return $out;
	}

	protected function render() {
		$s      = $this->get_settings_for_display();
		$d      = WK_Films::loop_data( (string) ( $s['clip'] ?? 'shapes' ), (array) ( $s['video'] ?? array() ), (array) ( $s['poster'] ?? array() ) );
		$hero   = 'hero' === ( $s['layout'] ?? '' );
		$side   = 'left' === ( $s['side'] ?? '' ) ? 'left' : 'right';
		$fit    = in_array( $s['fit'] ?? '', array( 'whole', 'fill' ), true ) ? $s['fit'] : ( $hero ? 'fill' : 'whole' );
		$cues   = $this->moments( $s, $d );
		$style  = 'auto' === ( $s['cue_style'] ?? 'auto' ) ? $d['style'] : $s['cue_style'];
		$wkey   = 'auto' === ( $s['watch_film'] ?? 'auto' ) ? $d['film'] : (string) $s['watch_film'];
		$win    = 'yes' === ( $s['watch'] ?? '' ) && '' !== $wkey ? WK_Films::window_data( $wkey, (array) ( $s['watch_video'] ?? array() ), trim( (string) ( $s['watch_title'] ?? '' ) ) ) : null;
		$hid    = 'reel-h-' . $this->get_id();
		$editor = class_exists( '\Elementor\Plugin' ) && \Elementor\Plugin::$instance->editor->is_edit_mode();

		if ( '' === $d['src'] && '' === $d['poster'] ) {
			if ( $editor ) {
				echo '<div class="wk wk-reel"><p class="reel-empty">' . esc_html__( 'Choose a video in Film › Your video.', 'wulf-kit' ) . '</p></div>';
			}
			return;
		}

		$this->open( $s, '', array( 'auto' => 'yes' === ( $s['autoplay'] ?? '' ), 'hero' => $hero, 'safe' => $d['safe'], 'film' => $win ) );
		// A dark chapter in the Daylight look: night colours, the moments under the film, "Watch" on the film.
		$chapter = ! $hero && WK_Plugin::is_day() && 'dark' === ( $s['day_tone'] ?? 'paper' );
		$cls     = 'reel l-' . ( $hero ? 'hero' : 'split side-' . $side ) . ' fit-' . $fit . ( WK_Plugin::is_day() && ! $chapter ? ' is-light txt-dark' : ' dark txt-light' ) . ( $chapter ? ' reel-chapter' : '' ) . ( 'yes' === ( $s['join'] ?? '' ) ? ' join' : '' ) . ( $cues ? ' has-cues' : '' );
		echo '<section class="' . esc_attr( $cls ) . '"' . $this->anchor_attr( $s ) . ( '' !== trim( (string) $s['title'] ) ? ' aria-labelledby="' . esc_attr( $hid ) . '"' : '' ) . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<div class="' . ( $hero ? '' : 'wrap ' ) . 'reel-grid">';

		// The words.
		echo '<div class="reel-copy">';
		if ( $hero ) {
			$tag = in_array( $s['title_tag'] ?? 'h1', array( 'h1', 'h2', 'div' ), true ) ? $s['title_tag'] : 'h1';
			if ( '' !== trim( (string) $s['eyebrow'] ) ) {
				echo '<p class="eyebrow">' . esc_html( $s['eyebrow'] ) . '</p>';
			}
			if ( '' !== trim( (string) $s['title'] ) ) {
				echo '<' . $tag . ' class="h1" id="' . esc_attr( $hid ) . '">' . self::rich( $s['title'] ) . '</' . $tag . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			$lead   = trim( (string) ( $s['lead'] ?? '' ) );
			$lead_m = trim( (string) ( $s['lead_m'] ?? '' ) );
			if ( '' !== $lead && '' !== $lead_m && $lead !== $lead_m ) {
				echo '<p class="lead reel-lead-d">' . esc_html( $lead ) . '</p><p class="lead reel-lead-m">' . esc_html( $lead_m ) . '</p>';
			} elseif ( '' !== $lead . $lead_m ) {
				echo '<p class="lead">' . esc_html( '' !== $lead ? $lead : $lead_m ) . '</p>';
			}
		} else {
			echo '<div class="reel-head">';
			$this->head( $s, '', $hid );
			echo '</div>';
		}
		if ( '' !== trim( wp_strip_all_tags( (string) ( $s['text'] ?? '' ) ) ) ) {
			echo '<div class="reel-text">' . wp_kses_post( wpautop( $s['text'] ) ) . '</div>';
		}
		if ( ! $hero ) {
			echo $this->promise( $s ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built from escaped parts.
		}
		if ( ! $hero && ! $chapter ) {
			echo WK_Films::cues( $cues, $style ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
		}
		$btns = $this->button( $s, 'b1', 'btn btn-gold', true ) . $this->button( $s, 'b2', $chapter ? 'link reel-more' : 'btn btn-ghost', $chapter );
		$wtxt = (string) ( $s['watch_text'] ?? '' );
		// First screen and dark chapter: "Watch the film" sits on the film itself; beside text, it follows the buttons.
		$link = $hero || $chapter ? '' : WK_Films::watch( $win, $wtxt, 'reel-watch-link' );
		$link .= WK_Films::watch_note( 'yes' === ( $s['watch'] ?? '' ) && '' !== $wkey && ! $win );
		if ( '' !== $btns . $link ) {
			echo '<div class="reel-cta' . ( $hero ? ' hero-cta' : '' ) . '">' . $btns . $link . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built from escaped parts.
		}
		if ( $hero ) {
			echo $this->hero_extras( $s ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built from escaped parts.
		}
		echo '</div>';

		// The film (in a dark chapter: in a column with its moments under it).
		if ( $chapter ) {
			echo '<div class="reel-col">';
		}
		echo '<figure class="reel-stage">';
		echo WK_Films::media( $d, array( 'eager' => $hero, 'sizes' => $hero ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 100vw, 56vw' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
		echo WK_Films::pause_button(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
		if ( $hero || $chapter ) {
			echo WK_Films::watch( $win, $wtxt, 'reel-watch-stage' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
		}
		if ( '' !== $d['alt'] ) {
			echo '<figcaption class="sr">' . esc_html( $d['alt'] ) . '</figcaption>';
		}
		echo '</figure>';
		if ( $chapter ) {
			echo WK_Films::cues( $cues, $style ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
		}
		if ( $hero && $cues ) {
			echo '<div class="reel-hero-cues">' . WK_Films::cues( $cues, $style ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
		}

		echo '</div></section>';
		$this->close();
	}
}
