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
			// Metal colour dots in the player (where a design has photos or
			// videos per colour).
			'colors'      => 'yes',
			// After the last story: "More like this" (4 designs), Watch
			// again and Browse all (browse_url; empty = the search results
			// page for the line, when one is set).
			'end_screen'  => 'yes',
			'more_title'  => '',
			'browse_text' => '',
			'browse_url'  => '',
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
		$set   = $this->items( $atts, $line, $count );
		$items = $set['items'];
		$more  = 'yes' === $atts['end_screen'] ? $set['more'] : array();
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
			'more'   => $more,
			'end'    => ! empty( $more ),
			'moreTitle'  => '' !== trim( (string) $atts['more_title'] ) ? (string) $atts['more_title'] : __( 'More like this', 'om-catalog' ),
			'browse'     => $this->browse_url( $atts, $line ),
			'browseText' => '' !== trim( (string) $atts['browse_text'] ) ? (string) $atts['browse_text'] : __( 'Browse all', 'om-catalog' ),
			'again'      => __( 'Watch again', 'om-catalog' ),
			'metal'      => __( 'Metal colour', 'om-catalog' ),
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

	/** Where "Browse all" goes: the widget's link, else the search results page for the line. */
	private function browse_url( $atts, $line ) {
		if ( '' !== trim( (string) $atts['browse_url'] ) ) {
			return esc_url_raw( (string) $atts['browse_url'] );
		}
		$page = (int) get_option( 'om_search_results_page', 0 );
		return $page ? add_query_arg( 'om_line', $line, get_permalink( $page ) ) : '';
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
	 * @return array { items: { l line, s style, t title, v variant, sh shape,
	 *               u url, i image, src video, k file|embed|photo,
	 *               c colours [ { n, sw, k, src, i } ] }[], more: { l, s, t,
	 *               u, i }[] (designs for "More like this") }
	 */
	private function items( $atts, $line, $count ) {
		$key    = 'om_reels2_' . md5( wp_json_encode( array( $atts['source'], $line, $atts['style'], $atts['shape'], $atts['styles'], $count, $atts['colors'] ) ) );
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
			$item = array(
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
			if ( 'yes' === $atts['colors'] ) {
				$colours = $this->colours( $product, $line, $item );
				if ( $colours ) {
					$item['c'] = $colours;
				}
			}
			$items[] = $item;
			if ( count( $items ) >= $count ) {
				break;
			}
		}

		// "More like this": designs from the same pool that aren't stories.
		$more = array();
		$pool = $products;
		if ( count( $pool ) - count( $items ) < 4 ) {
			$data = OM_Shortcodes::fetch_listing( $line, array( 'limit' => 24 ) );
			$pool = array_merge( $pool, is_wp_error( $data ) ? array() : (array) ( $data['products'] ?? array() ) );
		}
		foreach ( $pool as $product ) {
			$sn = (string) ( $product['style_number'] ?? '' );
			if ( '' === $sn || isset( $seen[ strtoupper( $sn ) ] ) ) {
				continue;
			}
			$seen[ strtoupper( $sn ) ] = true;
			$more[]                    = array(
				'l' => $line,
				's' => $sn,
				't' => (string) ( $product['title'] ?? $sn ),
				'u' => om_product_url( $line, $sn ),
				'i' => (string) om_card_images( $product )[0],
			);
			if ( count( $more ) >= 4 ) {
				break;
			}
		}

		$set = array( 'items' => $items, 'more' => $more );
		set_transient( $key, $set, 30 * MINUTE_IN_SECONDS );
		return $set;
	}

	/**
	 * A story's metal colours: each with its own video when there is one,
	 * else its first photo; the default colour keeps the story's video.
	 * Empty when fewer than two colours have their own media.
	 */
	private function colours( $product, $line, $item ) {
		$default = (string) ( $product['default_color'] ?? '' );
		$media   = om_product_media( $product, om_colour_variant_images( $product, $line ) );
		$out     = array();
		$own     = 0;
		foreach ( (array) ( $product['colors'] ?? array() ) as $colour ) {
			$colour = (string) $colour;
			$entry  = null;
			foreach ( $media['videos'] as $video ) {
				if ( 0 === strcasecmp( $video['color'], $colour ) ) {
					$pick  = $this->video_from( array( $video['url'] ) );
					$entry = $pick ? array( 'k' => $pick[1], 'src' => $pick[0], 'i' => $item['i'] ) : null;
					break;
				}
			}
			if ( ! $entry && $media['by_color'] ) {
				foreach ( $media['images'] as $image ) {
					if ( 0 === strcasecmp( $image['color'], $colour ) ) {
						$entry = 0 === strcasecmp( $colour, $default ) ? array( 'k' => $item['k'], 'src' => $item['src'], 'i' => $image['url'] ) : array( 'k' => 'photo', 'src' => '', 'i' => $image['url'] );
						break;
					}
				}
			}
			if ( ! $entry && 0 === strcasecmp( $colour, $default ) ) {
				$entry = array( 'k' => $item['k'], 'src' => $item['src'], 'i' => $item['i'] );
			}
			if ( $entry ) {
				$own++;
				$out[] = array( 'n' => $colour, 'sw' => om_swatch_class( $colour ), 'd' => 0 === strcasecmp( $colour, $default ) ) + $entry;
			}
		}
		return $own >= 2 ? $out : array();
	}

	/**
	 * A product's best video for a story: a file first (it can be timed
	 * and preloaded), else an embed player URL set to autoplay muted.
	 *
	 * @return array|null [ src, file|embed ]
	 */
	private function video( $product ) {
		return $this->video_from( om_product_videos( $product ) );
	}

	/** The best of a list of video URLs (see video()). */
	private function video_from( $videos ) {
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
