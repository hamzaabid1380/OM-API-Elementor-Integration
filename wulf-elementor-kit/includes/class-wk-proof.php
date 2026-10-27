<?php
/**
 * Proof where visitors decide: the Google rating, one short review that matches what they are about
 * to book, and the shop's promises. Shown next to the Book buttons (page banners, call-to-action
 * sections, the visit form, the booking window) and on product pages (OM Catalog 1.47 or later).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Proof {

	/** What a booking topic, a kind of jewelry or a review is about, from its words (first match wins). */
	const KEYS = array(
		'engagement' => '/engag|propos|fianc/i',
		'wedding'    => '/wedding|\bbands?\b/i',
		'custom'     => '/custom|design|sketch/i',
		'repair'     => '/repair|resiz|\bsizing|solder|prong|clean|\bfix/i',
		'appraisal'  => '/apprais|insur/i',
		'financing'  => '/financ|same.as.cash|credit|payment/i',
		'selling'    => '/\bsell|\bsold\b|\boffer|scrap|\bcoins?\b|\bcash\b/i',
	);

	public static function init() {
		add_filter( 'om_product_assurance', array( __CLASS__, 'product' ), 10, 3 );
	}

	/** Switched on in Wulf Kit › Settings. */
	public static function on() {
		return (bool) WK_Settings::get( 'assure' );
	}

	/** A topic's key ('engagement', 'repair'…) from its words; '' when they don't say. */
	public static function key( $words ) {
		foreach ( self::KEYS as $k => $re ) {
			if ( preg_match( $re, (string) $words ) ) {
				return $k;
			}
		}
		return '';
	}

	/**
	 * Short reviews to quote: the ones typed into Settings (what it's about | the words | the name),
	 * then short cuts of the 5-star reviews from Google or Trustindex.
	 *
	 * @return array [ { k: topic key, t: words, a: name } ]
	 */
	public static function quotes() {
		static $out = null;
		if ( null !== $out ) {
			return $out;
		}
		$out = array();
		foreach ( preg_split( '/\r\n|\r|\n/', (string) WK_Settings::get( 'g_quotes' ) ) as $line ) {
			$p = array_map( 'trim', explode( '|', $line ) );
			if ( count( $p ) >= 3 ) {
				$topic = array_shift( $p );
				$name  = array_pop( $p );
				$text  = implode( ' | ', $p );
			} elseif ( 2 === count( $p ) ) {
				list( $topic, $text, $name ) = array( '', $p[0], $p[1] );
			} else {
				list( $topic, $text, $name ) = array( '', $p[0], '' );
			}
			$text = (string) preg_replace( '/^[\s"\'“”‘’]+|[\s"\'“”‘’]+$/u', '', $text );
			if ( '' !== $text ) {
				$out[] = array( 'k' => self::key( $topic ), 't' => $text, 'a' => $name );
			}
		}
		if ( WK_Settings::get( 'g_live_quotes' ) ) {
			$n = 0;
			foreach ( WK_Reviews::quotable() as $r ) {
				$t = self::short( $r['text'] );
				if ( '' === $t ) {
					continue;
				}
				$out[] = array( 'k' => self::key( $r['text'] ), 't' => $t, 'a' => self::name( $r['author'] ) );
				if ( ++$n >= 12 ) {
					break;
				}
			}
		}
		return $out;
	}

	/**
	 * The quote for a topic (a booking topic, a product line like engagement-rings, or a key): one about
	 * it, else one about nothing in particular; with no topic and no such quote, the first.
	 *
	 * @return array|null
	 */
	public static function quote_for( $topic = '' ) {
		$key = isset( self::KEYS[ $topic ] ) ? $topic : self::key( $topic );
		$all = self::quotes();
		foreach ( $all as $q ) {
			if ( '' !== $key && $q['k'] === $key ) {
				return $q;
			}
		}
		foreach ( $all as $q ) {
			if ( '' === $q['k'] ) {
				return $q;
			}
		}
		return '' === $key && $all ? $all[0] : null;
	}

	/** A review cut to its first sentence or two (about 140 letters); '' when it is too short to say much. */
	public static function short( $text, $max = 140 ) {
		$text = trim( (string) preg_replace( '/\s+/u', ' ', wp_strip_all_tags( (string) $text ) ) );
		if ( mb_strlen( $text ) < 30 ) {
			return '';
		}
		$out = '';
		foreach ( preg_split( '/(?<=[.!?])\s+/u', $text ) as $sentence ) {
			if ( '' === $out ) {
				$out = $sentence;
				continue;
			}
			if ( mb_strlen( $out . ' ' . $sentence ) > $max ) {
				break;
			}
			$out .= ' ' . $sentence;
		}
		if ( mb_strlen( $out ) > $max ) {
			$out = preg_replace( '/[\s,;:]+\S*$/u', '', mb_substr( $out, 0, $max ) ) . '…';
		}
		return $out;
	}

	/** "Sarah Miller" becomes "Sarah M.". */
	public static function name( $name ) {
		$name = trim( (string) $name );
		$p    = preg_split( '/\s+/u', $name );
		if ( count( $p ) < 2 || count( $p ) > 3 || __( 'A Google reviewer', 'wulf-kit' ) === $name ) {
			return $name;
		}
		return $p[0] . ' ' . mb_strtoupper( mb_substr( (string) end( $p ), 0, 1 ) ) . '.';
	}

	/** The promises from Settings: [ [ icon, words ] ]. */
	public static function promises() {
		$out = array();
		foreach ( preg_split( '/\r\n|\r|\n/', (string) WK_Settings::get( 'promises' ) ) as $line ) {
			$line = trim( $line );
			if ( '' !== $line ) {
				$out[] = array( self::icon( $line ), $line );
			}
		}
		return $out;
	}

	/** A small icon for a promise, from its words. */
	public static function icon( $words ) {
		$map = array(
			'cert'   => '/certif|\bgia\b|\bigi\b|grading/i',
			'spark'  => '/clean|inspect|polish/i',
			'tool'   => '/repair|resiz|goldsmith|in-house|in house/i',
			'shield' => '/warrant|guarantee|protect/i',
			'gem'    => '/upgrade|trade.?in/i',
			'cash'   => '/financ|same as cash|buy.?back|we buy|credit/i',
			'clock'  => '/since|\b(19|20)\d\d\b|famil|independent/i',
		);
		foreach ( $map as $icon => $re ) {
			if ( preg_match( $re, (string) $words ) ) {
				return $icon;
			}
		}
		return 'check';
	}

	/** Where "Our promises" links: Settings, else the Our Promises page from the page library once it's published. */
	public static function page_url() {
		$url = trim( (string) WK_Settings::get( 'promises_url' ) );
		if ( '' !== $url ) {
			return $url;
		}
		$built = class_exists( 'WK_Pages' ) ? WK_Pages::built() : array();
		return ! empty( $built['our-promises'] ) && 'publish' === get_post_status( $built['our-promises'] ) ? (string) get_permalink( $built['our-promises'] ) : '';
	}

	/* ---------- Markup ---------- */

	/** Five stars, filled to the rating (4.9 fills 98%). */
	private static function stars( $pct ) {
		$paths = '';
		for ( $i = 0; $i < 5; $i++ ) {
			$paths .= '<path transform="translate(' . ( $i * 24 ) . ' 0)" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>';
		}
		$svg = '<svg viewBox="0 0 120 24" focusable="false">' . $paths . '</svg>';
		return '<span class="as-stars" aria-hidden="true" style="--r:' . (int) $pct . '%"><span>' . $svg . '</span><span>' . $svg . '</span></span>';
	}

	/** "★★★★★ 4.9 from 712 Google reviews", linked to the reviews; '' without a rating. */
	public static function rating_html() {
		$r = WK_Reviews::summary();
		if ( ! $r ) {
			return '';
		}
		/* translators: 1: rating like 4.9, 2: number of reviews */
		$txt = sprintf( _n( '%1$s from %2$s Google review', '%1$s from %2$s Google reviews', $r['count'], 'wulf-kit' ), '<b>' . esc_html( number_format_i18n( $r['rating'], 1 ) ) . '</b>', esc_html( number_format_i18n( $r['count'] ) ) );
		$in  = self::stars( round( $r['rating'] / 5 * 100 ) ) . '<span>' . $txt . '</span>';
		return '<p class="as-rate">' . ( '' !== $r['url'] ? '<a href="' . esc_url( $r['url'] ) . '" target="_blank" rel="noopener">' . $in . '</a>' : $in ) . '</p>';
	}

	/** One short review with the customer's name. */
	public static function quote_html( $q ) {
		if ( ! $q ) {
			return '';
		}
		return '<figure class="as-quote"><blockquote><p>' . esc_html( $q['t'] ) . '</p></blockquote>' . ( '' !== $q['a'] ? '<figcaption>' . esc_html( $q['a'] ) . '</figcaption>' : '' ) . '</figure>';
	}

	/** The promises as a row of small badges, with "Our promises" once that page is up. */
	public static function promises_html() {
		$list = self::promises();
		if ( ! $list ) {
			return '';
		}
		$out = '<ul class="as-prom">';
		foreach ( $list as $p ) {
			$out .= '<li>' . WK_Icons::svg( $p[0] ) . '<span>' . esc_html( $p[1] ) . '</span></li>';
		}
		$url = self::page_url();
		if ( '' !== $url ) {
			$out .= '<li class="as-more"><a href="' . esc_url( $url ) . '">' . esc_html__( 'Our promises', 'wulf-kit' ) . WK_Icons::svg( 'arr' ) . '</a></li>';
		}
		return $out . '</ul>';
	}

	/**
	 * The block: rating, then (optionally) a quote matching the topic, then the promises.
	 *
	 * @param array $o topic, quote (bool), promises (bool), rating (bool), cls.
	 */
	public static function html( $o = array() ) {
		if ( ! self::on() ) {
			return '';
		}
		$o  = wp_parse_args( $o, array( 'topic' => '', 'quote' => false, 'promises' => true, 'rating' => true, 'cls' => '' ) );
		$in = ( $o['rating'] ? self::rating_html() : '' ) . ( $o['quote'] ? self::quote_html( self::quote_for( (string) $o['topic'] ) ) : '' ) . ( $o['promises'] ? self::promises_html() : '' );
		return '' === $in ? '' : '<div class="assure' . ( $o['cls'] ? ' ' . esc_attr( $o['cls'] ) : '' ) . '">' . $in . '</div>';
	}

	/**
	 * Product pages (OM Catalog): under the Book buttons, with a review about that kind of jewelry. The
	 * promises stay out when OM Catalog's own trust line under the price already says them.
	 */
	public static function product( $html, $line = '', $style = '' ) {
		$own = '' !== trim( (string) get_option( 'om_trust_line', '' ) );
		$box = self::html( array( 'topic' => (string) $line, 'quote' => true, 'promises' => ! $own ) );
		return '' === $box ? $html : $html . '<div class="wk wk-assure">' . $box . '</div>';
	}

	/** For the booking window: the rating and promises as ready markup, and the quotes to match. */
	public static function for_js() {
		if ( ! self::on() ) {
			return null;
		}
		$rate = self::rating_html();
		$prom = self::promises_html();
		$q    = array_slice( self::quotes(), 0, 24 );
		return '' === $rate && '' === $prom && ! $q ? null : array( 'rate' => $rate, 'prom' => $prom, 'q' => $q );
	}

	/** For the settings page: what shows now. */
	public static function status() {
		$r    = WK_Reviews::summary();
		$from = array(
			'typed'      => __( 'as typed in below', 'wulf-kit' ),
			'featurable' => __( 'live from Featurable', 'wulf-kit' ),
			'places'     => __( 'live from Google', 'wulf-kit' ),
			'trustindex' => __( 'from Widgets for Google Reviews by Trustindex', 'wulf-kit' ),
		);
		$q    = self::quotes();
		if ( $r ) {
			/* translators: 1: rating, 2: number of reviews, 3: where the numbers come from */
			$text = sprintf( __( 'Showing %1$s from %2$s Google reviews (%3$s).', 'wulf-kit' ), number_format_i18n( $r['rating'], 1 ), number_format_i18n( $r['count'] ), $from[ $r['from'] ] ?? $r['from'] );
		} else {
			$text = __( 'No rating to show yet: type it in below, or set up live reviews under Google reviews. Until then only the promises show.', 'wulf-kit' );
		}
		/* translators: %d: number of short reviews */
		$text .= ' ' . ( $q ? sprintf( _n( '%d short review to quote.', '%d short reviews to quote.', count( $q ), 'wulf-kit' ), count( $q ) ) : __( 'No short reviews to quote yet.', 'wulf-kit' ) );
		return array( 'state' => $r ? 'ok' : 'none', 'text' => $text );
	}
}
