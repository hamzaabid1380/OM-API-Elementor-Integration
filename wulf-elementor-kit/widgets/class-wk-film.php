<?php
/**
 * Cinematic film (3D): one act of the scroll-directed ring film. A page can hold up to three acts
 * between its other sections (opening, shape and metal, details and story); each act plays its
 * part of the same story as it scrolls past. The ring and the diamond are drawn live in the
 * browser (no video or 3D files); a still picture shows first, and stays when 3D cannot run.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Film_Widget extends WK_Widget {

	protected $key = 'film';

	public function get_title() {
		return __( 'Wulf · Cinematic film (3D)', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-video-camera';
	}

	public function get_keywords() {
		return array( 'wulf', 'film', '3d', 'cinematic', 'diamond', 'ring', 'scroll' );
	}

	public function get_style_depends() {
		return array( 'wulf-kit', 'wulf-kit-film' );
	}

	public function get_script_depends() {
		return array( 'wulf-kit', 'wulf-kit-film' );
	}

	/** Defaults per act: scroll length in screens, poster file, skip link. */
	private static function acts() {
		return array(
			'opening' => array( 'label' => __( 'Opening: first light, then the setting', 'wulf-kit' ), 'len' => 2.8, 'poster' => 'film-opening', 'skip' => '#book-now' ),
			'shapes'  => array( 'label' => __( 'Shape and metal (tap a shape or metal to see it)', 'wulf-kit' ), 'len' => 3.8, 'poster' => 'film-shapes', 'skip' => '#spotlight' ),
			'details' => array( 'label' => __( 'Details and story', 'wulf-kit' ), 'len' => 3.2, 'poster' => 'film-details', 'skip' => '' ),
		);
	}

	protected function register_controls() {
		$this->start_controls_section( 'c_act', array( 'label' => __( 'Act', 'wulf-kit' ) ) );
		$opts = array();
		foreach ( self::acts() as $k => $a ) {
			$opts[ $k ] = $a['label'];
		}
		$this->add_control( 'act', array(
			'label'       => __( 'Which part of the film', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'opening',
			'options'     => $opts,
			'description' => __( 'Use each part once per page, in this order, with other sections between them. The 3D only loads on pages that use this widget.', 'wulf-kit' ),
		) );
		$this->add_control( 'len', array(
			'label'       => __( 'Scroll length (screens)', 'wulf-kit' ),
			'type'        => Controls_Manager::NUMBER,
			'min'         => 2,
			'max'         => 8,
			'step'        => 0.1,
			'default'     => '',
			'placeholder' => '2.8',
			'description' => __( 'How far visitors scroll while this part plays. Empty uses the recommended length.', 'wulf-kit' ),
		) );
		$this->add_control( 'anchor', array( 'label' => __( 'Anchor (for menu links)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$this->add_control( 'skip_text', array( 'label' => __( '"Skip" link', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Skip the film', 'wulf-kit' ), 'description' => __( 'Leave empty to hide.', 'wulf-kit' ) ) );
		$this->add_control( 'skip_link', array( 'label' => __( 'Skips to', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'placeholder' => '#book-now', 'description' => __( 'The anchor of the section after this part. Empty uses the usual one.', 'wulf-kit' ) ) );
		$this->add_control( 'poster', array( 'label' => __( 'Still picture (wide screens)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'default' => array( 'url' => '' ), 'description' => __( 'Shown until the 3D starts, and instead of it where 3D cannot run. Empty uses the built-in one.', 'wulf-kit' ) ) );
		$this->add_control( 'poster_tall', array( 'label' => __( 'Still picture (phones)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'default' => array( 'url' => '' ) ) );
		$this->end_controls_section();

		// Opening.
		$this->start_controls_section( 'c_open', array( 'label' => __( 'Opening words', 'wulf-kit' ), 'condition' => array( 'act' => 'opening' ) ) );
		$this->add_control( 'o_eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Crown Point, Indiana', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'o_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'Independent since *1971.*', 'wulf-kit' ), 'description' => __( 'Wrap words in *stars* to show them in gold italics. This is the page\'s main heading.', 'wulf-kit' ) ) );
		$this->add_control( 'o_lead', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'Engagement rings, certified diamonds and custom design, compared in person with a GIA-certified jeweler at your side.', 'wulf-kit' ) ) );
		$this->add_control( 'o_lead_m', array( 'label' => __( 'Shorter text for phones', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'Engagement rings, certified diamonds and custom design, with a GIA-certified jeweler.', 'wulf-kit' ), 'description' => __( 'Phones show this instead, so the diamond and the buttons fit on the first screen. Empty uses the text above.', 'wulf-kit' ) ) );
		$this->button_fields( 'b1', __( 'Main button', 'wulf-kit' ), __( 'Book a free consultation', 'wulf-kit' ), '#visit', true );
		$this->button_fields( 'b2', __( 'Second button', 'wulf-kit' ), __( 'Design your ring', 'wulf-kit' ), '#studio' );
		$this->add_control( 'o_note', array( 'label' => __( 'Reassurance under the buttons', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Free, no obligation | We confirm by call or text', 'wulf-kit' ), 'label_block' => true, 'description' => __( 'Separate points with |', 'wulf-kit' ), 'separator' => 'before' ) );
		// The same call line and trust points as the conversion page's hero.
		$this->add_control( 'o_call', array( 'label' => __( '"Or call…" line with open status', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'separator' => 'before', 'description' => __( 'Computers and tablets; phones already show the number and open status in the bar above.', 'wulf-kit' ) ) );
		$this->add_control( 'o_call_text', array( 'label' => __( 'Starts with', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Or call', 'wulf-kit' ), 'condition' => array( 'o_call' => 'yes' ) ) );
		$this->add_control( 'o_rating', array( 'label' => __( 'Live Google rating in the trust line', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'description' => __( 'Shows "4.9 · 120 Google reviews" first, once Google reviews are set up in Wulf Kit › Settings. Nothing shows until then.', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'icon', array( 'label' => __( 'Icon', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'clock', 'options' => WK_Icons::options() ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$this->add_control( 'o_trust', array(
			'label'       => __( 'Trust points', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ text }}}',
			'default'     => array(
				array( 'icon' => 'clock', 'text' => __( 'Since 1971', 'wulf-kit' ) ),
				array( 'icon' => 'cert', 'text' => __( 'GIA-certified jewelers', 'wulf-kit' ) ),
				array( 'icon' => 'cash', 'text' => __( '12 months same as cash*', 'wulf-kit' ) ),
			),
		) );
		$this->add_control( 'o2_heading', array( 'label' => __( 'Second chapter: the setting', 'wulf-kit' ), 'type' => Controls_Manager::HEADING, 'separator' => 'before' ) );
		$this->add_control( 'o2_eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'The setting', 'wulf-kit' ) ) );
		$this->add_control( 'o2_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'Built around the stone.', 'wulf-kit' ) ) );
		$this->add_control( 'o2_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'Every ring starts with the diamond. The band rises to meet it, and the prongs close over it to hold it in the light.', 'wulf-kit' ) ) );
		$this->end_controls_section();

		// Shape and metal.
		$this->start_controls_section( 'c_shapes', array( 'label' => __( 'Shape and metal words', 'wulf-kit' ), 'condition' => array( 'act' => 'shapes' ) ) );
		$this->add_control( 's_eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'The shape', 'wulf-kit' ) ) );
		$this->add_control( 's_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'Find your shape.', 'wulf-kit' ) ) );
		$this->add_control( 's_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'Round, emerald, pear or oval. Each returns light in its own way, so we compare them side by side before you decide.', 'wulf-kit' ), 'description' => __( 'The film shows these four, in this order.', 'wulf-kit' ) ) );
		$this->button_fields( 's_lk', __( 'Link under the shapes', 'wulf-kit' ), __( 'Try each one in the ring designer', 'wulf-kit' ), '#studio' );
		$this->add_control( 'm_heading', array( 'label' => __( 'Second chapter: the metal', 'wulf-kit' ), 'type' => Controls_Manager::HEADING, 'separator' => 'before' ) );
		$this->add_control( 'm_eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'The metal', 'wulf-kit' ) ) );
		$this->add_control( 'm_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'White, yellow or *rose.*', 'wulf-kit' ) ) );
		$this->add_control( 'm_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'The same design takes on a different character in each metal. See all three in person before you choose.', 'wulf-kit' ) ) );
		$this->button_fields( 'b3', __( 'Button', 'wulf-kit' ), __( 'Book to see them in person', 'wulf-kit' ), '#visit', true );
		$this->end_controls_section();

		// Details and story.
		$this->start_controls_section( 'c_details', array( 'label' => __( 'Details and story words', 'wulf-kit' ), 'condition' => array( 'act' => 'details' ) ) );
		$this->add_control( 'd_eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'The details', 'wulf-kit' ) ) );
		$this->add_control( 'd_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'The details only you will know.', 'wulf-kit' ) ) );
		$this->add_control( 'd_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'A hidden halo under the center stone. Pavé along the band. Small things that catch the light from the side.', 'wulf-kit' ) ) );
		$this->add_control( 'y_heading', array( 'label' => __( 'Second chapter: the story', 'wulf-kit' ), 'type' => Controls_Manager::HEADING, 'separator' => 'before' ) );
		$this->add_control( 'y_year', array( 'label' => __( 'Big year behind', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '1971', 'description' => __( 'Leave empty to hide.', 'wulf-kit' ) ) );
		$this->add_control( 'y_eyebrow', array( 'label' => __( 'Small label above', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Our story · Independent since 1971', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'y_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( 'It started with a suitcase of gems.', 'wulf-kit' ) ) );
		$this->add_control( 'y_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 4, 'default' => __( 'In 1971 Tom Moriarty traded his tool belt for a suitcase of fine gems. Today Cullen Wulf, a GIA-certified jeweler, carries on the same promise from a newly built showroom on Broadway in Crown Point: honest advice, and never a rushed decision.', 'wulf-kit' ) ) );
		$this->button_fields( 'y_lk', __( 'Link', 'wulf-kit' ), __( 'Read our story', 'wulf-kit' ), class_exists( 'WK_Pages' ) ? WK_Pages::url( 'about-us' ) : '/about-us/' );
		$this->add_control( 'shown_heading', array( 'label' => __( 'The ring on screen', 'wulf-kit' ), 'type' => Controls_Manager::HEADING, 'separator' => 'before' ) );
		$this->add_control( 'shown', array(
			'label'       => __( 'Caption', 'wulf-kit' ),
			'type'        => Controls_Manager::TEXT,
			'default'     => __( 'On screen: Oval Hidden Halo Engagement Ring, Diamond Band', 'wulf-kit' ),
			'label_block' => true,
			'description' => __( 'The film ends on one of our rings (style 51162-E); this small line under it says which. Leave empty to hide.', 'wulf-kit' ),
		) );
		$this->button_fields( 'shown_lk', __( 'Link to the ring', 'wulf-kit' ), __( 'View this ring', 'wulf-kit' ), home_url( '/catalog/engagement-rings/51162-E-8X6/' ) );
		$this->end_controls_section();
	}

	/** One chapter of words. */
	private function chapter( $i, $eyebrow, $title, $text, $extra = '', $tag = 'h2', $side = '' ) {
		echo '<div class="film-chap' . ( $side ? ' ' . esc_attr( $side ) : '' ) . '" data-chapter="' . (int) $i . '">';
		if ( '' !== trim( (string) $eyebrow ) ) {
			echo '<p class="film-eyebrow">' . esc_html( $eyebrow ) . '</p>';
		}
		if ( '' !== trim( (string) $title ) ) {
			echo '<' . $tag . ' class="film-h" data-split>' . self::rich( $title ) . '</' . $tag . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( '' !== trim( (string) $text ) ) {
			echo '<p>' . esc_html( $text ) . '</p>';
		}
		echo $extra; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '</div>';
	}

	/** A full-screen picture: an uploaded one at full size, else the built-in one. */
	private function poster_url( $media, $fallback ) {
		if ( ! empty( $media['id'] ) ) {
			$src = wp_get_attachment_image_url( (int) $media['id'], 'full' );
			if ( $src ) {
				return $src;
			}
		}
		return ! empty( $media['url'] ) ? $media['url'] : $fallback;
	}

	/** A text link from a text + link pair, with an arrow. */
	private function text_link( $s, $id ) {
		$text = trim( (string) ( $s[ $id . '_text' ] ?? '' ) );
		return '' === $text ? '' : '<a class="film-link"' . self::link_attrs( $s[ $id . '_link' ] ?? '' ) . '>' . esc_html( $text ) . ' ' . WK_Icons::svg( 'arr', 'arr' ) . '</a>';
	}

	protected function render() {
		$s    = $this->get_settings_for_display();
		$acts = self::acts();
		$act  = isset( $acts[ $s['act'] ?? '' ] ) ? $s['act'] : 'opening';
		$def  = $acts[ $act ];
		$len  = is_numeric( $s['len'] ?? '' ) && (float) $s['len'] >= 2 ? min( 8, (float) $s['len'] ) : $def['len'];
		$media = WK_URL . 'assets/media/';
		$wide  = $this->poster_url( $s['poster'] ?? array(), $media . $def['poster'] . '.webp' );
		$tall  = $this->poster_url( $s['poster_tall'] ?? array(), $media . $def['poster'] . '-tall.webp' );
		$names = array(
			'opening' => __( 'How a Wulf ring comes together', 'wulf-kit' ),
			'shapes'  => __( 'Shapes and metals', 'wulf-kit' ),
			'details' => __( 'The details, and our story', 'wulf-kit' ),
		);

		$this->open( $s );
		echo '<section class="film-act dark txt-light' . ( 'opening' === $act ? ' film-hero' : '' ) . '" data-act="' . esc_attr( $act ) . '" style="--film-len:' . esc_attr( (string) round( $len * 100 ) ) . '" aria-label="' . esc_attr( $names[ $act ] ) . '"' . $this->anchor_attr( $s ) . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<div class="film-stage">';
		// The opening's picture is the first thing on the page: fetched first, never lazy.
		echo '<picture class="film-poster" aria-hidden="true"><source media="(max-aspect-ratio: 20/21)" srcset="' . esc_url( $tall ) . '"><img src="' . esc_url( $wide ) . '" alt="" width="1920" height="1038"' . ( 'opening' === $act ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"' ) . '></picture>';
		echo '<div class="film-scrim l" aria-hidden="true"></div><div class="film-scrim r" aria-hidden="true"></div><div class="film-bar" aria-hidden="true"></div>';

		if ( 'opening' === $act ) {
			$note = '';
			$points = array_filter( array_map( 'trim', explode( '|', (string) ( $s['o_note'] ?? '' ) ) ) );
			if ( $points ) {
				$note = '<ul class="film-note">';
				foreach ( $points as $p ) {
					$note .= '<li>' . WK_Icons::svg( 'check' ) . esc_html( $p ) . '</li>';
				}
				$note .= '</ul>';
			}
			$btns = $this->button( $s, 'b1', 'btn btn-gold', true ) . $this->button( $s, 'b2', 'btn btn-ghost' );
			// The text, and a shorter one for phones when there is one.
			$lead   = trim( (string) ( $s['o_lead'] ?? '' ) );
			$lead_m = trim( (string) ( $s['o_lead_m'] ?? '' ) );
			$leads  = '';
			if ( '' !== $lead && '' !== $lead_m && $lead_m !== $lead ) {
				$leads = '<p class="film-lead-d">' . esc_html( $lead ) . '</p><p class="film-lead-m">' . esc_html( $lead_m ) . '</p>';
			} elseif ( '' !== $lead || '' !== $lead_m ) {
				$leads = '<p>' . esc_html( '' !== $lead ? $lead : $lead_m ) . '</p>';
			}
			// The call line with the live open status, and the trust points (with the live Google rating), as on the conversion hero.
			$more  = '';
			$phone = WK_Settings::get( 'phone' );
			if ( 'yes' === ( $s['o_call'] ?? '' ) && $phone ) {
				$more .= '<p class="hero-call">' . esc_html( $s['o_call_text'] ?? '' ) . ' <a href="' . esc_attr( WK_Settings::tel() ) . '">' . esc_html( $phone ) . '</a> · <span data-status-text></span></p>';
			}
			$g     = 'yes' === ( $s['o_rating'] ?? '' ) && class_exists( 'WK_Reviews' ) ? WK_Reviews::google() : null;
			$trust = '';
			if ( $g && ! empty( $g['count'] ) ) {
				/* translators: 1: rating like 4.9, 2: number of reviews */
				$txt   = sprintf( _n( '%1$s · %2$s Google review', '%1$s · %2$s Google reviews', $g['count'], 'wulf-kit' ), number_format_i18n( $g['rating'], 1 ), number_format_i18n( $g['count'] ) );
				$url   = $g['url'] ? $g['url'] : (string) WK_Settings::get( 'maps_url' );
				$trust .= '<li class="t-rating">' . ( $url ? '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener">' : '' ) . WK_Icons::svg( 'star' ) . esc_html( $txt ) . ( $url ? '</a>' : '' ) . '</li>';
			}
			foreach ( (array) ( $s['o_trust'] ?? array() ) as $t ) {
				if ( '' !== trim( (string) ( $t['text'] ?? '' ) ) ) {
					$trust .= '<li>' . WK_Icons::svg( $t['icon'] ?? 'check' ) . esc_html( $t['text'] ) . '</li>';
				}
			}
			if ( '' !== $trust ) {
				$more .= '<ul class="trust">' . $trust . '</ul>';
			}
			$this->chapter( 0, $s['o_eyebrow'], $s['o_title'], '', $leads . ( $btns ? '<div class="film-acts">' . $btns . '</div>' : '' ) . $note . $more, 'h1' );
			$this->chapter( 1, $s['o2_eyebrow'], $s['o2_title'], $s['o2_text'] );
			echo '<div class="film-cue" aria-hidden="true"><span>' . esc_html__( 'Scroll', 'wulf-kit' ) . '</span><i></i></div>';
		} elseif ( 'shapes' === $act ) {
			// In the order the film shows them (it ends on the oval).
			$shapes = array(
				array( __( 'Round', 'wulf-kit' ), '<circle cx="8" cy="8" r="6.5"/>' ),
				array( __( 'Emerald', 'wulf-kit' ), '<path d="M5.4 1.4h5.2l2.4 2.4v8.4l-2.4 2.4H5.4L3 12.2V3.8Z"/>' ),
				array( __( 'Pear', 'wulf-kit' ), '<path d="M8 1.2C6 4.6 3.4 7.6 3.4 10.4a4.6 4.6 0 0 0 9.2 0C12.6 7.6 10 4.6 8 1.2Z"/>' ),
				array( __( 'Oval', 'wulf-kit' ), '<ellipse cx="8" cy="8" rx="4.6" ry="6.8"/>' ),
			);
			$chips = '<div class="film-chips" role="group" aria-label="' . esc_attr__( 'Diamond shapes', 'wulf-kit' ) . '">';
			foreach ( $shapes as $i => $sh ) {
				$chips .= '<button type="button" data-film-shape="' . (int) $i . '" aria-pressed="' . ( 0 === $i ? 'true' : 'false' ) . '"><svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5">' . $sh[1] . '</svg>' . esc_html( $sh[0] ) . '</button>';
			}
			$chips .= '</div>';
			$this->chapter( 2, $s['s_eyebrow'], $s['s_title'], $s['s_text'], $chips . $this->text_link( $s, 's_lk' ) );
			$metals = array( __( 'White gold', 'wulf-kit' ), __( 'Yellow gold', 'wulf-kit' ), __( 'Rose gold', 'wulf-kit' ) );
			$mchips = '<div class="film-chips" role="group" aria-label="' . esc_attr__( 'Metals', 'wulf-kit' ) . '">';
			foreach ( $metals as $i => $m ) {
				$mchips .= '<button type="button" data-film-metal="' . (int) $i . '" aria-pressed="' . ( 0 === $i ? 'true' : 'false' ) . '"><i aria-hidden="true"></i>' . esc_html( $m ) . '</button>';
			}
			$mchips .= '</div>';
			$b3 = $this->button( $s, 'b3', 'btn btn-gold', true );
			$this->chapter( 3, $s['m_eyebrow'], $s['m_title'], $s['m_text'], $mchips . ( $b3 ? '<div class="film-acts">' . $b3 . '</div>' : '' ), 'h2', 'r' );
		} else {
			if ( '' !== trim( (string) ( $s['y_year'] ?? '' ) ) ) {
				echo '<div class="film-year" aria-hidden="true">' . esc_html( $s['y_year'] ) . '</div>';
			}
			$this->chapter( 4, $s['d_eyebrow'], $s['d_title'], $s['d_text'], '', 'h2', 'r' );
			$this->chapter( 5, $s['y_eyebrow'], $s['y_title'], $s['y_text'], $this->text_link( $s, 'y_lk' ) );
			// Which of our rings the film ends on, under it.
			$shown = trim( (string) ( $s['shown'] ?? '' ) );
			if ( '' !== $shown ) {
				echo '<p class="film-shown">' . esc_html( $shown ) . ' ' . $this->text_link( $s, 'shown_lk' ) . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}

		$skip_text = trim( (string) ( $s['skip_text'] ?? '' ) );
		$skip      = trim( (string) ( $s['skip_link'] ?? '' ) );
		$skip      = '' === $skip ? $def['skip'] : $skip;
		if ( '' !== $skip_text && '' !== $skip ) {
			echo '<a class="film-skip" href="' . esc_url( $skip ) . '">' . esc_html( $skip_text ) . ' <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
		}
		echo '</div></section>';
		$this->close();
	}
}
