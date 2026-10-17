<?php
/**
 * The brand films: "Wulf Diamond Jewelers" (1:15) and "The Suitcase" (0:39), both motion graphics on
 * black, with music. Each is cut into short silent loops for the page (one per chapter), and the full
 * films with sound play in the "Watch the film" window. Everything ships with the kit in
 * assets/media/film/, so no video service or account is needed.
 *
 * Every loop comes as an AV1 copy (smaller; Chrome, Edge, Firefox and newer Apple devices) and an
 * H.264 copy that plays everywhere; the page picks the one the browser can play.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Films {

	/**
	 * The full films, with sound. They play from the Media Library (Wulf Kit › Settings › Brand films);
	 * "file" names their still picture in the kit. Chapters: [start second, name].
	 */
	public static function films() {
		return array(
			'motion'   => array(
				'title'    => __( 'Wulf Diamond Jewelers, the film', 'wulf-kit' ),
				'file'     => 'wulf-film',
				'dur'      => 75,
				'chapters' => array(
					array( 0, __( 'Since 1971', 'wulf-kit' ) ),
					array( 13.3, __( 'Shapes', 'wulf-kit' ) ),
					array( 27, __( 'Ring styles', 'wulf-kit' ) ),
					array( 35, __( 'Fine jewelry', 'wulf-kit' ) ),
					array( 45.5, __( 'Design online', 'wulf-kit' ) ),
					array( 54.2, __( 'Custom', 'wulf-kit' ) ),
					array( 65, __( 'Wulf', 'wulf-kit' ) ),
				),
			),
			'suitcase' => array(
				'title'    => __( 'The Suitcase: our story since 1971', 'wulf-kit' ),
				'file'     => 'wulf-suitcase',
				'dur'      => 39,
				'chapters' => array(
					array( 0, '1971' ),
					array( 9.9, __( 'Buying trips', 'wulf-kit' ) ),
					array( 16.2, __( 'Open to the public', 'wulf-kit' ) ),
					array( 20.7, '2008–2015' ),
					array( 24, __( 'Today', 'wulf-kit' ) ),
					array( 25.3, __( 'We come to you', 'wulf-kit' ) ),
				),
			),
		);
	}

	/**
	 * The silent loops. Each knows which film it comes from (for "Watch the film"), where it starts in
	 * that film, its chapter list (cues: [second, name, short text]) and how the list looks.
	 * "safe" is the part of the picture (left and right edge, 0 to 1) that must stay visible when a
	 * layout crops the sides.
	 */
	public static function clips() {
		return array(
			'highlights' => array(
				'label' => __( 'Highlights: a diamond, four ring styles, then fine jewelry (17 s)', 'wulf-kit' ),
				'file'  => 'reel-highlights',
				'film'  => 'motion',
				'from'  => 0,
				'w'     => 1920,
				'dur'   => 16.6,
				'safe'  => array( 0.07, 0.93 ),
				'alt'   => __( 'Film: a diamond takes shape, then becomes a solitaire, a halo, a hidden halo and a three-stone engagement ring, with fine jewelry around it.', 'wulf-kit' ),
				'style' => 'chips',
				'cues'  => array(),
			),
			'shapes'     => array(
				'label' => __( 'The eight diamond shapes (14 s)', 'wulf-kit' ),
				'file'  => 'reel-shapes',
				'film'  => 'motion',
				'from'  => 13.3,
				'w'     => 1440,
				'dur'   => 13.7,
				'safe'  => array( 0.26, 0.88 ),
				'alt'   => __( 'Film: the eight diamond shapes, one after another: round, oval, cushion, princess, emerald, pear, marquise and heart.', 'wulf-kit' ),
				'style' => 'chips',
				'cues'  => array(
					array( 1.4, __( 'Round', 'wulf-kit' ), '' ),
					array( 2.9, __( 'Oval', 'wulf-kit' ), '' ),
					array( 4.15, __( 'Cushion', 'wulf-kit' ), '' ),
					array( 5.4, __( 'Princess', 'wulf-kit' ), '' ),
					array( 6.65, __( 'Emerald', 'wulf-kit' ), '' ),
					array( 7.9, __( 'Pear', 'wulf-kit' ), '' ),
					array( 9.15, __( 'Marquise', 'wulf-kit' ), '' ),
					array( 10.4, __( 'Heart', 'wulf-kit' ), '' ),
				),
			),
			'rings'      => array(
				'label' => __( 'Ring styles: solitaire, halo, hidden halo, three stone (8 s)', 'wulf-kit' ),
				'file'  => 'reel-rings',
				'film'  => 'motion',
				'from'  => 27,
				'w'     => 1440,
				'dur'   => 8.1,
				'safe'  => array( 0.39, 0.93 ),
				'alt'   => __( 'Film: an engagement ring builds itself as a solitaire, then a halo, a hidden halo and a three-stone ring.', 'wulf-kit' ),
				'style' => 'chips',
				'cues'  => array(
					array( 0, __( 'Solitaire', 'wulf-kit' ), '' ),
					array( 2.9, __( 'Halo', 'wulf-kit' ), '' ),
					array( 4.15, __( 'Hidden halo', 'wulf-kit' ), '' ),
					array( 5.4, __( 'Three stone', 'wulf-kit' ), '' ),
				),
			),
			'jewelry'    => array(
				'label' => __( 'Fine jewelry: band, necklace, pendant, earrings, bracelet (10 s)', 'wulf-kit' ),
				'file'  => 'reel-jewelry',
				'film'  => 'motion',
				'from'  => 35,
				'w'     => 1440,
				'dur'   => 10.45,
				'safe'  => array( 0.19, 0.96 ),
				'alt'   => __( 'Film: a wedding band, a necklace, a pendant, drop earrings and a bracelet, drawn in gold.', 'wulf-kit' ),
				'style' => 'chips',
				'cues'  => array(
					array( 0, __( 'Wedding bands', 'wulf-kit' ), '' ),
					array( 2, __( 'Necklaces', 'wulf-kit' ), '' ),
					array( 4, __( 'Pendants', 'wulf-kit' ), '' ),
					array( 5.5, __( 'Earrings', 'wulf-kit' ), '' ),
					array( 8, __( 'Bracelets', 'wulf-kit' ), '' ),
				),
			),
			'builder'    => array(
				'label' => __( 'Design it online: shape, metal, 1,906 designs (9 s)', 'wulf-kit' ),
				'file'  => 'reel-builder',
				'film'  => 'motion',
				'from'  => 45.5,
				'w'     => 1440,
				'dur'   => 8.6,
				'safe'  => array( 0.09, 0.91 ),
				'alt'   => __( 'Film: the ring builder. A shape is picked, the ring changes from platinum to yellow and rose gold, and a counter reaches 1,906 engagement ring designs.', 'wulf-kit' ),
				'style' => 'steps',
				'cues'  => array(
					array( 0.4, __( 'Pick a shape', 'wulf-kit' ), __( 'Round to heart, all eight.', 'wulf-kit' ) ),
					array( 2.5, __( 'Choose the metal', 'wulf-kit' ), __( 'Platinum, yellow or rose gold.', 'wulf-kit' ) ),
					array( 6, __( 'See every design', 'wulf-kit' ), __( '1,906 engagement ring designs.', 'wulf-kit' ) ),
				),
			),
			'custom'     => array(
				'label' => __( 'Custom: design, wax, cast, set (11 s)', 'wulf-kit' ),
				'file'  => 'reel-custom',
				'film'  => 'motion',
				'from'  => 54.2,
				'w'     => 1440,
				'dur'   => 10.8,
				'safe'  => array( 0.24, 0.86 ),
				'alt'   => __( 'Film: a custom ring is drawn in CAD, made as a wax model, cast in gold and set with a diamond.', 'wulf-kit' ),
				'style' => 'steps',
				'cues'  => array(
					array( 0.95, __( 'Design', 'wulf-kit' ), __( 'Drawn in 3D with you, until it\'s exactly right.', 'wulf-kit' ) ),
					array( 3.45, __( 'Wax', 'wulf-kit' ), __( 'A model shows every detail and the true size.', 'wulf-kit' ) ),
					array( 5.95, __( 'Cast', 'wulf-kit' ), __( 'Cast in the metal you choose.', 'wulf-kit' ) ),
					array( 7.25, __( 'Set', 'wulf-kit' ), __( 'Every stone set and polished by hand.', 'wulf-kit' ) ),
				),
			),
			'story'      => array(
				'label' => __( 'The Suitcase: our story since 1971 (35 s)', 'wulf-kit' ),
				'file'  => 'reel-story',
				'film'  => 'suitcase',
				'from'  => 0,
				'w'     => 1440,
				'dur'   => 35.2,
				'safe'  => array( 0, 1 ),
				'alt'   => __( 'Film: 1971, a suitcase full of gems, then buying trips to California, New York, Antwerp and Idar-Oberstein, a store open to the public in the mid-1990s, Cullen Wulf joining in 2008, a bigger showroom in 2011, a GIA-certified owner in 2015 and today in Crown Point, Indiana, where we also come to you.', 'wulf-kit' ),
				'style' => 'timeline',
				'cues'  => array(
					array( 0, '1971', __( 'A suitcase full of gems, across the Midwest.', 'wulf-kit' ) ),
					array( 9.9, __( 'Trips', 'wulf-kit' ), __( 'Buying trips to California, New York, Antwerp and Idar-Oberstein.', 'wulf-kit' ) ),
					array( 16.2, __( '1990s', 'wulf-kit' ), __( 'Open to the public.', 'wulf-kit' ) ),
					array( 20.7, '2008', __( 'Cullen Wulf joins.', 'wulf-kit' ) ),
					array( 21.9, '2011', __( 'A bigger showroom.', 'wulf-kit' ) ),
					array( 23.2, '2015', __( 'A GIA-certified owner.', 'wulf-kit' ) ),
					array( 24, __( 'Today', 'wulf-kit' ), __( 'Crown Point, Indiana. And we come to you.', 'wulf-kit' ) ),
				),
			),
		);
	}

	/** Options for an Elementor select: the loops, then "my own video". */
	public static function clip_options() {
		$o = array();
		foreach ( self::clips() as $k => $c ) {
			$o[ $k ] = $c['label'];
		}
		$o['upload'] = __( 'My own video', 'wulf-kit' );
		return $o;
	}

	public static function clip( $key ) {
		$c = self::clips();
		return $c[ $key ] ?? null;
	}

	public static function film( $key ) {
		$f = self::films();
		return $f[ $key ] ?? null;
	}

	/** Address of a bundled file, e.g. url( 'reel-shapes', '.mp4' ). */
	public static function url( $file, $ext ) {
		return WK_URL . 'assets/media/film/' . $file . $ext;
	}

	/** "1:15" */
	public static function clock( $seconds ) {
		$s = (int) round( (float) $seconds );
		return sprintf( '%d:%02d', intdiv( $s, 60 ), $s % 60 );
	}

	/**
	 * What the page needs to play one loop: the two copies, the still picture (and its sharper copy),
	 * its size, and its chapters. $upload / $poster are Elementor media values (used for "My own video",
	 * and to replace the still picture).
	 */
	public static function loop_data( $key, $upload = array(), $poster = array() ) {
		$own_poster = '';
		if ( ! empty( $poster['id'] ) ) {
			$own_poster = (string) wp_get_attachment_image_url( (int) $poster['id'], 'full' );
		}
		if ( '' === $own_poster && ! empty( $poster['url'] ) ) {
			$own_poster = (string) $poster['url'];
		}
		if ( 'upload' === $key ) {
			$src = (string) ( $upload['url'] ?? '' );
			return array(
				'key'    => 'upload',
				'src'    => $src,
				'av1'    => '',
				'poster' => $own_poster,
				'set'    => '',
				'w'      => 1920,
				'film'   => '',
				'from'   => 0,
				'dur'    => 0,
				'safe'   => array( 0, 1 ),
				'alt'    => '',
				'style'  => 'chips',
				'cues'   => array(),
			);
		}
		$c = self::clip( $key );
		if ( ! $c ) {
			return self::loop_data( 'highlights', array(), $poster );
		}
		$p1 = self::url( $c['file'], '.webp' );
		$p2 = self::url( $c['file'], '-2x.webp' );
		return array(
			'key'    => $key,
			'src'    => self::url( $c['file'], '.mp4' ),
			'av1'    => self::url( $c['file'], '.av1.mp4' ),
			'poster' => '' !== $own_poster ? $own_poster : $p1,
			'set'    => '' !== $own_poster ? '' : esc_url( $p1 ) . ' 960w, ' . esc_url( $p2 ) . ' ' . (int) $c['w'] . 'w', // the sharper copy is the loop's own width
			'w'      => $c['w'],
			'film'   => $c['film'],
			'from'   => $c['from'],
			'dur'    => $c['dur'],
			'safe'   => $c['safe'],
			'alt'    => $c['alt'],
			'style'  => $c['style'],
			'cues'   => $c['cues'],
		);
	}

	/* ================================================================
	 * Pieces of markup shared by the film widgets
	 * ============================================================== */

	/**
	 * A loop's still picture and video. The video has no address until the script gives it one (when it
	 * nears the screen), so nothing downloads for visitors who never get there.
	 *
	 * @param array $d    loop_data().
	 * @param array $o    eager (first screen: fetch the picture first), sizes, loop, cls (extra class).
	 */
	public static function media( $d, $o = array() ) {
		$o   = wp_parse_args( $o, array( 'eager' => false, 'sizes' => '(max-width: 900px) 100vw, 60vw', 'loop' => true ) );
		$out = '';
		if ( '' !== $d['poster'] ) {
			$out .= '<img class="reel-poster" src="' . esc_url( $d['poster'] ) . '"' . ( '' !== $d['set'] ? ' srcset="' . $d['set'] . '" sizes="' . esc_attr( $o['sizes'] ) . '"' : '' ) . ' alt="" width="1920" height="1080" decoding="async"' . ( $o['eager'] ? ' fetchpriority="high"' : ' loading="lazy"' ) . '>'; // set: built from esc_url() in loop_data().
		}
		if ( '' !== $d['src'] ) {
			$out .= '<video class="reel-v" muted playsinline' . ( $o['loop'] ? ' loop' : '' ) . ' preload="none" disablepictureinpicture disableremoteplayback aria-hidden="true" tabindex="-1" data-src="' . esc_url( $d['src'] ) . '"' . ( '' !== $d['av1'] ? ' data-av1="' . esc_url( $d['av1'] ) . '"' : '' ) . '></video>';
		}
		return $out;
	}

	/** The small pause / play button on a playing film (anything moving for more than five seconds can be stopped). */
	public static function pause_button() {
		return '<button type="button" class="reel-pp" hidden data-play="' . esc_attr__( 'Play the film', 'wulf-kit' ) . '" data-pause="' . esc_attr__( 'Pause the film', 'wulf-kit' ) . '" aria-label="' . esc_attr__( 'Play the film', 'wulf-kit' ) . '">' . WK_Icons::svg( 'pause', 'i-pause' ) . WK_Icons::svg( 'play', 'i-play' ) . '</button>';
	}

	/**
	 * "Watch the film" as a link to the film itself, so it still works without the script; the script
	 * opens the film with sound in a window on the page instead.
	 *
	 * @param array|null $win   window_data().
	 * @param string     $text  Button words.
	 * @param string     $class "btn btn-ghost" for a button, "reel-watch-link" for a quieter link.
	 */
	public static function watch( $win, $text, $class ) {
		if ( ! $win || '' === trim( (string) $text ) ) {
			return '';
		}
		$dur = ! empty( $win['dur'] ) ? '<span class="rw-dur">' . esc_html( self::clock( $win['dur'] ) ) . '</span>' : '';
		return '<a class="' . esc_attr( $class ) . ' reel-watch" href="' . esc_url( $win['src'] ) . '" data-reel-watch><span class="rw-ic" aria-hidden="true">' . WK_Icons::svg( 'play' ) . '</span><span class="rw-t">' . esc_html( $text ) . '</span>' . $dur . '</a>';
	}

	/** In the Elementor editor only: why a "Watch the film" button isn't showing yet. */
	public static function watch_note( $wanted ) {
		if ( ! $wanted || ! class_exists( '\Elementor\Plugin' ) || ! \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
			return '';
		}
		return '<p class="reel-note-ed">' . esc_html__( '"Watch the film" appears once the film is chosen in Wulf Kit › Settings › Brand films (or under Watch the film › Your film with sound). Visitors don\'t see this note.', 'wulf-kit' ) . '</p>';
	}

	/**
	 * The film's chapters, as buttons that jump to that moment; the one on screen is marked as current
	 * while the film plays. Styles: chips (short names), steps (numbered, with a line of text),
	 * timeline (years along a line, with the current year's words under it).
	 *
	 * @param array  $cues  [second, name, text].
	 * @param string $style chips|steps|timeline.
	 */
	public static function cues( $cues, $style ) {
		if ( ! $cues ) {
			return '';
		}
		$style = in_array( $style, array( 'chips', 'steps', 'timeline' ), true ) ? $style : 'chips';
		$out   = '<ol class="reel-cues cs-' . esc_attr( $style ) . '" aria-label="' . esc_attr__( 'Moments in this film (choose one to watch it)', 'wulf-kit' ) . '">';
		foreach ( array_values( $cues ) as $i => $c ) {
			$name = (string) $c[1];
			$text = (string) ( $c[2] ?? '' );
			$out .= '<li><button type="button" class="rc" data-t="' . esc_attr( (string) round( (float) $c[0], 2 ) ) . '"' . ( '' !== $text ? ' data-x="' . esc_attr( $text ) . '"' : '' ) . ( 0 === $i ? ' aria-current="true"' : '' ) . '>';
			if ( 'steps' === $style ) {
				$out .= '<span class="rc-n" aria-hidden="true">' . esc_html( sprintf( '%02d', $i + 1 ) ) . '</span>';
			}
			$out .= '<span class="rc-l">' . esc_html( $name ) . '</span>';
			if ( '' !== $text && 'chips' !== $style ) {
				$out .= '<span class="rc-x' . ( 'timeline' === $style ? ' sr' : '' ) . '">' . esc_html( $text ) . '</span>';
			}
			$out .= '<i class="rc-p" aria-hidden="true"></i></button></li>';
		}
		$out .= '</ol>';
		if ( 'timeline' === $style ) {
			$out .= '<p class="reel-tl-cap" aria-hidden="true">' . esc_html( (string) ( $cues[0][2] ?? '' ) ) . '</p>';
		}
		return $out;
	}

	/**
	 * The full film for the "Watch" window, as the script wants it. $key is a film key, or "upload"
	 * with $upload (an Elementor media value) and an optional title.
	 */
	public static function window_data( $key, $upload = array(), $title = '' ) {
		if ( 'upload' === $key ) {
			$src = (string) ( $upload['url'] ?? '' );
			return '' === $src ? null : array( 'k' => 'upload', 'src' => $src, 'av1' => '', 'title' => '' !== $title ? $title : __( 'Our film', 'wulf-kit' ), 'poster' => '', 'dur' => 0, 'ch' => array() );
		}
		$f = self::film( $key );
		$src = $f ? (string) WK_Settings::get( 'film_' . $key ) : '';
		if ( '' === $src ) {
			return null; // Not chosen yet in Wulf Kit › Settings › Brand films: no "Watch" button.
		}
		return array(
			'k'      => $key,
			'src'    => $src,
			'av1'    => '',
			'title'  => '' !== $title ? $title : $f['title'],
			'poster' => self::url( $f['file'], '-2x.webp' ),
			'dur'    => $f['dur'],
			'ch'     => $f['chapters'],
		);
	}
}
