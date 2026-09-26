<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Story reels: a row of round (or tall) bubbles, each one a design with a
 * video. Tapping one opens a full-screen player, Instagram-stories style:
 * progress bars, tap left/right, hold to pause, swipe down to close, and a
 * "View this ring" button. [om_reels] shortcode and the "OM Story Reels"
 * Elementor widget.
 *
 * The row is plain server-rendered buttons; the player is built by the
 * script on first open.
 */
class OM_Reels {

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_shortcode( 'om_reels', array( $this, 'shortcode' ) );
	}

	public function shortcode( $atts ) {
		return $this->render( (array) $atts );
	}

	/** Default attributes (shared with the Elementor widget). */
	public static function defaults() {
		return array(
			// Which designs: line (the line's own order, optionally one
			// collection/style and shape), popular (most viewed), picked
			// (style numbers).
			'source'      => 'line',
			'line'        => 'engagement-rings',
			'style'       => '',
			'shape'       => '',
			'styles'      => '',
			'count'       => 8,
			// Row: circle bubbles or tall "card" thumbnails; label under
			// each (title, shape, variant, none); devices (all, mobile,
			// desktop); optional heading.
			'bubble'      => 'circle',
			'label'       => 'title',
			'show_on'     => 'all',
			'heading'     => '',
			// Player.
			'show_price'  => 'yes',
			'show_style'  => 'yes',
			'button_text' => '',
			'duration'    => 8,
			'max_length'  => 15,
			'sound'       => '',
			'auto_next'   => 'yes',
		);
	}

	public function render( $atts ) {
		$atts = shortcode_atts( self::defaults(), $atts, 'om_reels' );
		require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );

		$line  = sanitize_title( (string) $atts['line'] );
		$line  = '' !== $line ? $line : 'engagement-rings';
		$count = max( 1, min( 16, (int) $atts['count'] ) );
		$items = $this->items( $atts, $line, $count );
		if ( ! $items ) {
			// Nothing with a video: the editor says so, visitors see nothing.
			return class_exists( '\Elementor\Plugin' ) && \Elementor\Plugin::$instance->editor && \Elementor\Plugin::$instance->editor->is_edit_mode()
				? '<p class="om-reels-empty">' . esc_html__( 'No designs with a video match these settings.', 'om-catalog' ) . '</p>'
				: '';
		}

		$bubble  = 'card' === $atts['bubble'] ? 'card' : 'circle';
		$show_on = in_array( $atts['show_on'], array( 'all', 'mobile', 'desktop' ), true ) ? $atts['show_on'] : 'all';
		$config  = array(
			'items'  => $items,
			'price'  => 'yes' === $atts['show_price'] && om_markup_is_configured(),
			'style'  => 'yes' === $atts['show_style'],
			'button' => '' !== trim( (string) $atts['button_text'] ) ? (string) $atts['button_text'] : __( 'View this design', 'om-catalog' ),
			'dur'    => max( 3, min( 30, (int) $atts['duration'] ) ),
			'max'    => max( 5, min( 60, (int) $atts['max_length'] ) ),
			'sound'  => 'yes' === $atts['sound'],
			'next'   => 'yes' === $atts['auto_next'],
		);

		ob_start();
		printf(
			'<section class="om-reels om-reels--%s om-reels--on-%s" data-om-reels="%s" aria-label="%s">',
			esc_attr( $bubble ),
			esc_attr( $show_on ),
			esc_attr( wp_json_encode( $config ) ),
			esc_attr__( 'Video stories', 'om-catalog' )
		);
		if ( '' !== trim( (string) $atts['heading'] ) ) {
			echo '<h2 class="om-reels-heading">' . esc_html( $atts['heading'] ) . '</h2>';
		}
		echo '<ul class="om-reels-row" role="list">';
		foreach ( $items as $i => $item ) {
			$label = $this->label( $item, (string) $atts['label'] );
			printf(
				'<li class="om-reel"><button type="button" class="om-reel-bubble" data-om-reel="%1$d" data-om-reel-id="%2$s" aria-label="%3$s"><span class="om-reel-ring"><span class="om-reel-thumb">%4$s</span></span>%5$s</button></li>',
				(int) $i,
				esc_attr( $item['l'] . '|' . $item['s'] ),
				/* translators: %s: design name. */
				esc_attr( sprintf( __( 'Play video story: %s', 'om-catalog' ), $item['t'] ) ),
				$item['i'] ? '<img src="' . esc_url( $item['i'] ) . '" alt="" loading="lazy" decoding="async" />' : '',
				'' !== $label ? '<span class="om-reel-label">' . esc_html( $label ) . '</span>' : ''
			);
		}
		echo '</ul></section>';
		return ob_get_clean();
	}

	/** The words under a bubble. */
	private function label( $item, $mode ) {
		switch ( $mode ) {
			case 'none':
				return '';
			case 'shape':
				return '' !== $item['sh'] ? $item['sh'] : $item['t'];
			case 'variant':
				return '' !== $item['v'] ? $item['v'] : $item['t'];
			default:
				// A short form of the title: the first few words.
				$words = preg_split( '/\s+/', trim( (string) $item['t'] ) );
				return implode( ' ', array_slice( $words, 0, 3 ) );
		}
	}

	/**
	 * The designs for the row, each with a playable video.
	 *
	 * @return array[] { l line, s style, t title, v variant, sh shape,
	 *                 u url, i image, src video, k file|embed }
	 */
	private function items( $atts, $line, $count ) {
		$key    = 'om_reels_' . md5( wp_json_encode( array( $atts['source'], $line, $atts['style'], $atts['shape'], $atts['styles'], $count ) ) );
		$cached = get_transient( $key );
		if ( is_array( $cached ) ) {
			return $cached;
		}

		$products = array();
		if ( 'picked' === $atts['source'] ) {
			$styles = implode( ',', array_filter( array_map( 'trim', explode( ',', (string) $atts['styles'] ) ), 'strlen' ) );
			if ( '' !== $styles ) {
				$data     = OM_Shortcodes::fetch_listing( $line, array( 'styleNumber' => $styles, 'parentsOnly' => 'false', 'limit' => 50 ) );
				$by       = array();
				foreach ( is_wp_error( $data ) ? array() : (array) ( $data['products'] ?? array() ) as $p ) {
					$by[ strtoupper( (string) ( $p['style_number'] ?? '' ) ) ] = $p;
				}
				foreach ( array_map( 'trim', explode( ',', $styles ) ) as $sn ) {
					if ( isset( $by[ strtoupper( $sn ) ] ) ) {
						$products[] = $by[ strtoupper( $sn ) ];
					}
				}
			}
		} else {
			if ( 'popular' === $atts['source'] && class_exists( 'OM_Engage' ) ) {
				$popular = array_slice( OM_Engage::popular( $line, 1 ), 0, $count * 2 );
				if ( $popular ) {
					$products = OM_Engage::products_in_order( $line, $popular );
					$products = is_wp_error( $products ) ? array() : $products;
				}
			}
			if ( count( $products ) < $count ) {
				$args = array_filter(
					array(
						'style' => trim( (string) $atts['style'] ),
						'shape' => trim( (string) $atts['shape'] ),
						'limit' => min( 100, $count * 4 ),
					)
				);
				$data     = OM_Shortcodes::fetch_listing( $line, $args );
				$products = array_merge( $products, is_wp_error( $data ) ? array() : (array) ( $data['products'] ?? array() ) );
			}
		}

		$items = array();
		$seen  = array();
		foreach ( $products as $product ) {
			$sn = (string) ( $product['style_number'] ?? '' );
			if ( '' === $sn || isset( $seen[ strtoupper( $sn ) ] ) ) {
				continue;
			}
			$video = $this->video( $product );
			if ( ! $video ) {
				continue;
			}
			$seen[ strtoupper( $sn ) ] = true;
			$shape                     = '';
			foreach ( (array) ( $product['stone_breakdown'] ?? array() ) as $stone ) {
				if ( 1 === (int) ( $stone['quantity'] ?? 0 ) && ! empty( $stone['shape'] ) ) {
					$shape = (string) $stone['shape'];
					break;
				}
			}
			$items[] = array(
				'l'   => $line,
				's'   => $sn,
				't'   => (string) ( $product['title'] ?? $sn ),
				'v'   => (string) ( $product['variant_name'] ?? '' ),
				'sh'  => $shape,
				'u'   => om_product_url( $line, $sn ),
				'i'   => (string) om_card_images( $product )[0],
				'src' => $video[0],
				'k'   => $video[1],
			);
			if ( count( $items ) >= $count ) {
				break;
			}
		}
		set_transient( $key, $items, 30 * MINUTE_IN_SECONDS );
		return $items;
	}

	/**
	 * A product's best video for a story: a file first (it can be timed
	 * and preloaded), else an embed player URL set to autoplay muted.
	 *
	 * @return array|null [ src, file|embed ]
	 */
	private function video( $product ) {
		$videos = om_product_videos( $product );
		foreach ( $videos as $url ) {
			if ( om_is_video_file( $url ) ) {
				return array( $url, 'file' );
			}
		}
		foreach ( $videos as $url ) {
			if ( preg_match( '#(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([\w-]{6,})#', $url, $m ) ) {
				return array( 'https://www.youtube-nocookie.com/embed/' . $m[1] . '?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0', 'embed' );
			}
			if ( preg_match( '#vimeo\.com/(?:video/)?(\d+)#', $url, $m ) ) {
				return array( 'https://player.vimeo.com/video/' . $m[1] . '?autoplay=1&muted=1&background=1', 'embed' );
			}
			return array( $url, 'embed' );
		}
		return null;
	}
}
