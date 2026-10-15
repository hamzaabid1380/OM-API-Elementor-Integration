<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The Insights report as a branded PDF: a cover with the headline numbers,
 * what stood out and the contents, then every part of the dashboard for the
 * period (and filters) chosen, each compared with the period before. Drawn
 * with tFPDF in the brand's own fonts (Fraunces, Manrope) and colours (from
 * the Wulf Elementor Kit when it is active).
 */
class OM_Insights_Pdf {

	const W      = 612; // US Letter, in points.
	const H      = 792;
	const X      = 54;  // Side margins.
	const TOP    = 80;  // Where content starts under the running header.
	const BOTTOM = 738; // Where content stops above the footer.
	const KEEP   = 300; // Tables up to this tall are never split between two pages.
	const GAP    = 22;  // Between lists side by side.

	/** @var OM_Insights_Pdf_Doc */
	private $pdf;

	/** @var OM_Insights_Report */
	private $r;

	private $d     = array();
	private $c     = array();
	private $y     = 0;
	private $no    = 0;
	private $names = true;
	private $site  = '';
	private $made  = 0;

	/** @var array The parts drawn so far: number => [ title, page ]. */
	private $toc = array();

	/** @var array The parts and their pages from the first drawing, for the contents on the cover. */
	private $first = array();

	/** @var array Links from the contents to each part: number => link. */
	private $links = array();

	/** Build the report for a request (period, filters, names) and send it as a download. */
	public static function send( $req ) {
		if ( ! function_exists( 'mb_convert_encoding' ) ) {
			wp_die( esc_html__( 'The report needs PHP\'s mbstring extension, which this server doesn\'t have. Your host can switch it on.', 'om-catalog' ), esc_html__( 'Insights report', 'om-catalog' ), array( 'response' => 500, 'back_link' => true ) );
		}
		if ( function_exists( 'set_time_limit' ) ) {
			@set_time_limit( 120 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged -- Not allowed on some hosts.
		}
		$r     = new OM_Insights_Report( $req );
		$names = ! isset( $req['names'] ) || '0' !== (string) $req['names'];
		try {
			$doc = new self( $r, $names );
			$pdf = $doc->build();
		} catch ( Exception $e ) {
			wp_die( esc_html__( 'The report couldn\'t be made. Please try again, or choose a shorter period.', 'om-catalog' ), esc_html__( 'Insights report', 'om-catalog' ), array( 'response' => 500, 'back_link' => true ) );
		}
		nocache_headers();
		header( 'Content-Type: application/pdf' );
		header( 'Content-Disposition: attachment; filename="' . $doc->filename() . '"' );
		header( 'Content-Length: ' . strlen( $pdf ) );
		header( 'X-Content-Type-Options: nosniff' );
		echo $pdf; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- A PDF file.
		exit;
	}

	public function __construct( OM_Insights_Report $r, $names = true ) {
		$this->r     = $r;
		$this->names = (bool) $names;
		$this->c     = self::palette();
		$this->site  = self::site_name();
		$this->made  = time();
	}

	private static function load() {
		if ( ! class_exists( 'tFPDF', false ) ) {
			require_once OM_CATALOG_DIR . 'lib/tfpdf/tfpdf.php';
		}
		if ( ! class_exists( 'TTFontFile', false ) ) {
			require_once OM_CATALOG_DIR . 'lib/tfpdf/font/unifont/ttfonts.php';
		}
		require_once OM_CATALOG_DIR . 'includes/class-om-insights-pdf-doc.php';
	}

	/** "wulf-diamond-jewelers-insights-2026-09-13-to-2026-10-12.pdf". */
	public function filename() {
		$slug = sanitize_title( $this->site );
		return ( '' !== $slug ? $slug . '-' : '' ) . 'insights-' . $this->r->from . ( $this->r->from !== $this->r->to ? '-to-' . $this->r->to : '' ) . '.pdf';
	}

	/** The PDF, as a string. */
	public function build() {
		self::load();
		$this->d = $this->r->report_data();
		// Drawn twice: the first time finds the page each part starts on, for the contents on the cover.
		$this->render();
		$this->first = $this->toc;
		return $this->render()->Output( 'S' );
	}

	/** Draw the whole report. */
	private function render() {
		$this->no    = 0;
		$this->toc   = array();
		$this->links = array();
		$pdf         = new OM_Insights_Pdf_Doc( 'P', 'pt', 'Letter' );
		$pdf->AliasNbPages();
		$dir = OM_CATALOG_DIR . 'lib/fonts/';
		$pdf->add_ttf( 'sans', $dir . 'Manrope-Regular.ttf' );
		$pdf->add_ttf( 'sans6', $dir . 'Manrope-SemiBold.ttf' );
		$pdf->add_ttf( 'sans7', $dir . 'Manrope-Bold.ttf' );
		$pdf->add_ttf( 'serif', $dir . 'Fraunces72pt-Regular.ttf' );
		$pdf->add_ttf( 'serif5', $dir . 'Fraunces72pt-Medium.ttf' );
		$pdf->SetMargins( self::X, self::TOP, self::X );
		$pdf->SetAutoPageBreak( false );
		/* translators: 1: site name, 2: period. */
		$pdf->SetTitle( sprintf( __( '%1$s: website insights, %2$s', 'om-catalog' ), $this->site, $this->period() ), true );
		$pdf->SetAuthor( $this->site, true );
		$pdf->SetSubject( __( 'Website insights report', 'om-catalog' ), true );
		$pdf->SetCreator( 'OM Catalog Insights ' . OM_CATALOG_VERSION, true );
		$pdf->head = array( $this, 'running_head' );
		$pdf->foot = array( $this, 'running_foot' );
		$this->pdf = $pdf;

		$this->cover();
		if ( $this->d['now']['visits'] || $this->d['before']['visits'] ) {
			// Results first: what stood out and what to do, then the leads; then where the visits came from and what they did.
			$this->findings_part();
			$this->leads_part();
			$this->over_time();
			$this->sources();
			$this->audience();
			if ( $this->r->span() >= 7 ) {
				$this->busy_times();
			}
			$this->designs();
			$this->pages_part();
			$this->searches();
			$this->doing();
			$this->funnels();
			// The long lists, for reference.
			$this->lead_list();
			$this->by_day();
		}
		$this->about();
		return $pdf;
	}

	/* ---------------------------------------------------------------
	 * Brand
	 * ------------------------------------------------------------- */

	private static function site_name() {
		$name = class_exists( 'WK_Settings' ) ? (string) WK_Settings::get( 'name' ) : '';
		$name = '' !== trim( $name ) ? $name : wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		return '' !== trim( $name ) ? trim( $name ) : __( 'Your website', 'om-catalog' );
	}

	/** The kit's brand colours (or its defaults), and tints made from them. */
	private static function palette() {
		$c = array(
			'ink'       => '#0f1217',
			'text'      => '#262a31',
			'sub'       => '#5a5f67',
			'line'      => '#e7e4de',
			'ivory'     => '#f7f5f1',
			'night'     => '#0b0e14',
			'gold'      => '#d6b97f',
			'gold_deep' => '#b8955a',
			'gold_ink'  => '#7a5b24',
		);
		if ( class_exists( 'WK_Settings' ) ) {
			foreach ( array_keys( $c ) as $key ) {
				$v = (string) WK_Settings::get( 'c_' . $key );
				if ( preg_match( '/^#[0-9a-f]{6}$/i', $v ) ) {
					$c[ $key ] = $v;
				}
			}
		}
		$c['hair']   = self::mix( $c['line'], '#ffffff', 0.45 );
		$c['tint']   = self::mix( $c['gold'], '#ffffff', 0.78 );
		$c['tint2']  = self::mix( $c['gold'], '#ffffff', 0.55 );
		$c['area']   = self::mix( $c['gold'], '#ffffff', 0.72 );
		$c['series'] = self::mix( $c['gold_deep'], $c['gold_ink'], 0.35 );
		$c['prev']   = '#a7abb1';
		$c['muted']  = self::mix( $c['sub'], '#ffffff', 0.3 );
		$c['up']     = '#1f7a3d';
		$c['down']   = '#b4321e';
		// Busy hours: one gold, light to dark.
		$c['ramp'] = array(
			self::mix( $c['line'], '#ffffff', 0.55 ),
			self::mix( $c['gold'], '#ffffff', 0.72 ),
			self::mix( $c['gold'], '#ffffff', 0.4 ),
			$c['gold'],
			$c['gold_deep'],
			$c['gold_ink'],
		);
		return $c;
	}

	private static function mix( $a, $b, $t ) {
		$x = OM_Insights_Pdf_Doc_Colors::rgb( $a );
		$y = OM_Insights_Pdf_Doc_Colors::rgb( $b );
		return sprintf( '#%02x%02x%02x', round( $x[0] + ( $y[0] - $x[0] ) * $t ), round( $x[1] + ( $y[1] - $x[1] ) * $t ), round( $x[2] + ( $y[2] - $x[2] ) * $t ) );
	}

	/** The gem with a W inside (the site's monogram), $s points wide. */
	private function mark( $x, $y, $s, $color ) {
		$p = $this->pdf;
		$k = $s / 32;
		$p->stroke( $color, max( 0.7, 1.4 * $k ) );
		$p->round_lines( true );
		$pts = static function ( $list ) use ( $x, $y, $k ) {
			return array_map(
				static function ( $pt ) use ( $x, $y, $k ) {
					return array( $x + $pt[0] * $k, $y + $pt[1] * $k );
				},
				$list
			);
		};
		$p->poly( $pts( array( array( 3, 11 ), array( 9.5, 4 ), array( 22.5, 4 ), array( 29, 11 ), array( 16, 29 ) ) ), 'S', true );
		$p->poly( $pts( array( array( 3, 11 ), array( 29, 11 ) ) ) );
		$initial = strtoupper( substr( remove_accents( $this->site ), 0, 1 ) );
		if ( 'W' === $initial ) {
			$p->poly( $pts( array( array( 10, 14 ), array( 13, 22 ), array( 16, 16 ), array( 19, 22 ), array( 22, 14 ) ) ) );
		} else {
			$p->font( 'serif5', 9 * $k * 1.6 );
			$p->ink( $color );
			$p->put( $x + 16 * $k, $y + 21 * $k, $initial, 'C' );
		}
		$p->round_lines( false );
	}

	/** "WULF" and "DIAMOND JEWELERS" from the site name. */
	private function wordmark() {
		$parts = preg_split( '/\s+/', $this->site, 2 );
		return array( self::upper( $parts[0] ), isset( $parts[1] ) ? self::upper( $parts[1] ) : '' );
	}

	private static function upper( $s ) {
		return function_exists( 'mb_strtoupper' ) ? mb_strtoupper( (string) $s, 'UTF-8' ) : strtoupper( (string) $s );
	}

	/* ---------------------------------------------------------------
	 * Words and numbers
	 * ------------------------------------------------------------- */

	private static function day( $ymd, $format ) {
		return wp_date( $format, strtotime( $ymd . ' 12:00:00' ) );
	}

	/** "Sep 13 – Oct 12, 2026". */
	private function period() {
		return $this->r->period_text();
	}

	/** "September 13 – October 12, 2026" (or one day, written out). */
	private static function long_period( $from, $to ) {
		if ( $from === $to ) {
			return self::day( $from, 'l, F j, Y' );
		}
		$same = substr( $from, 0, 4 ) === substr( $to, 0, 4 );
		return self::day( $from, $same ? 'F j' : 'F j, Y' ) . ' – ' . self::day( $to, 'F j, Y' );
	}

	private static function n( $v, $digits = 0 ) {
		return number_format_i18n( (float) $v, $digits );
	}

	private static function pct( $n, $of, $digits = 1 ) {
		return OM_Insights_Report::pct( $n, $of, $digits );
	}

	private static function dur( $seconds ) {
		return OM_Insights_Report::duration( $seconds );
	}

	private static function metric( $key, $v ) {
		return OM_Insights_Report::format_metric( $key, $v );
	}

	/** Change against the period before in whole percent; null when there was nothing before, '' when there is nothing either time. */
	private static function change( $now, $before ) {
		if ( (float) $before > 0 ) {
			return (int) round( 100 * ( (float) $now - (float) $before ) / (float) $before );
		}
		return (float) $now > 0 ? null : '';
	}

	private static function domain() {
		return (string) wp_parse_url( home_url(), PHP_URL_HOST );
	}

	/** The filters in use, in words. */
	private function filter_words() {
		$out = array();
		foreach ( $this->r->filters as $key => $value ) {
			$out[] = OM_Insights_Report::filter_names()[ $key ] . ': ' . $this->r->filter_text( $key, $value );
		}
		return $out;
	}

	/** "hour", "day", "week" or "month". */
	private static function unit_word( $unit ) {
		$words = array(
			'hour'  => __( 'hour', 'om-catalog' ),
			'day'   => __( 'day', 'om-catalog' ),
			'week'  => __( 'week', 'om-catalog' ),
			'month' => __( 'month', 'om-catalog' ),
		);
		return $words[ $unit ] ?? $words['day'];
	}

	/** A source's name inside a sentence: "search engines", "AI assistants". */
	private static function source_words( $key ) {
		$words = array(
			'search'   => __( 'search engines', 'om-catalog' ),
			'maps'     => __( 'Google Maps and your Business Profile', 'om-catalog' ),
			'direct'   => __( 'people typing the address or using a bookmark', 'om-catalog' ),
			'social'   => __( 'social media', 'om-catalog' ),
			'ads'      => __( 'paid ads', 'om-catalog' ),
			'email'    => __( 'emails', 'om-catalog' ),
			'ai'       => __( 'AI assistants', 'om-catalog' ),
			'referral' => __( 'other websites', 'om-catalog' ),
			'campaign' => __( 'tagged links', 'om-catalog' ),
		);
		return $words[ $key ] ?? OM_Insights_Report::channel_name( $key );
	}

	/** A source's name where room is short: "Direct", "Google Maps". */
	private static function source_short( $key ) {
		$short = array(
			'maps'   => __( 'Google Maps', 'om-catalog' ),
			'direct' => __( 'Direct', 'om-catalog' ),
		);
		return $short[ $key ] ?? OM_Insights_Report::channel_name( $key );
	}

	/* ---------------------------------------------------------------
	 * Layout
	 * ------------------------------------------------------------- */

	private function cw() {
		return self::W - 2 * self::X;
	}

	private function new_page() {
		$this->pdf->AddPage();
		$this->y = self::TOP;
	}

	private function ensure( $h ) {
		if ( $this->y + $h > self::BOTTOM ) {
			$this->new_page();
		}
	}

	/** Runs at the top of every page after the cover. */
	public function running_head( $page ) {
		if ( $page < 2 ) {
			return;
		}
		$p = $this->pdf;
		$c = $this->c;
		$this->mark( self::X, 28, 15, $c['gold_deep'] );
		list( $big, $small ) = $this->wordmark();
		$p->font( 'sans7', 6.6 );
		$p->ink( $c['ink'] );
		$p->put( self::X + 21, 40, trim( $big . ' ' . $small ), 'L', 1.4 );
		$p->font( 'sans', 7 );
		$p->ink( $c['sub'] );
		/* translators: %s: period. */
		$p->put( self::W - self::X, 40, sprintf( __( 'Website insights · %s', 'om-catalog' ), $this->period() ), 'R' );
		$p->stroke( $c['line'], 0.6 );
		$p->Line( self::X, 52, self::W - self::X, 52 );
	}

	/** Runs at the bottom of every page. */
	public function running_foot( $page ) {
		$p = $this->pdf;
		$c = $this->c;
		$p->stroke( $c['line'], 0.6 );
		$p->Line( self::X, 752, self::W - self::X, 752 );
		$p->font( 'sans', 6.8 );
		$p->ink( $c['sub'] );
		/* translators: 1: date and time, 2: web address. */
		$p->put( self::X, 768, sprintf( __( 'Prepared %1$s for %2$s', 'om-catalog' ), wp_date( 'M j, Y \a\t g:i a', $this->made ), self::domain() ) );
		$p->font( 'sans6', 6.8 );
		/* translators: 1: page number, 2: number of pages. */
		$label = sprintf( __( 'Page %1$s of %2$s', 'om-catalog' ), $page, '{nb}' );
		$p->put( self::W - self::X - 52, 768, $label );
	}

	/**
	 * A numbered part: "03" and a gold rule, its title and what it shows.
	 * Starts a page when the heading and the $need points after it don't fit.
	 */
	private function section( $title, $desc = '', $need = 170 ) {
		++$this->no;
		$p = $this->pdf;
		$c = $this->c;
		$p->font( 'sans', 9 );
		$head = 56 + ( '' !== $desc ? 13.5 * count( $this->wrap( $desc, $this->cw() ) ) : 0 );
		if ( 1 === $p->PageNo() || $this->y + 22 + $head + $need > self::BOTTOM ) {
			$this->new_page();
		} else {
			$this->y += 22;
		}
		$this->toc[ $this->no ] = array( $title, $p->PageNo() );
		$p->bookmark( $title, $this->y );
		if ( isset( $this->links[ $this->no ] ) ) {
			$p->SetLink( $this->links[ $this->no ], $this->y, $p->PageNo() );
		}
		$p->font( 'sans7', 7.5 );
		$p->ink( $c['gold_ink'] );
		$p->put( self::X, $this->y + 8, sprintf( '%02d', $this->no ), 'L', 1 );
		$p->stroke( $c['gold'], 0.6 );
		$p->Line( self::X + 22, $this->y + 5.2, self::W - self::X, $this->y + 5.2 );
		$p->font( 'serif', 21 );
		$p->ink( $c['ink'] );
		$p->put( self::X, $this->y + 36, $title );
		$this->y += 46;
		if ( '' !== $desc ) {
			$this->para( $desc, 9, $c['sub'], 13.5 );
		}
		$this->y += 10;
	}

	/**
	 * A heading inside a part, kept on one page with the $need points that
	 * follow it (0: don't check). Returns its baseline.
	 */
	private function sub( $title, $note = '', $need = 0, $x = null, $w = null ) {
		$x = null === $x ? self::X : $x;
		$w = null === $w ? $this->cw() : $w;
		$p = $this->pdf;
		if ( $need > 0 ) {
			$p->font( 'sans', 8 );
			$this->ensure( 22 + ( '' !== $note ? 11.5 * count( $this->wrap( $note, $w ) ) : 0 ) + $need );
		}
		$p->font( 'sans7', 10 );
		$p->ink( $this->c['ink'] );
		$base = $this->y + 10;
		$p->put( $x, $base, $title );
		$this->y += 16;
		if ( '' !== $note ) {
			$this->para( $note, 8, $this->c['sub'], 11.5, $x, $w );
		}
		$this->y += 6;
		return $base;
	}

	/** Wrapped text; returns the lines used. */
	private function para( $text, $size, $color, $lh, $x = null, $w = null, $font = 'sans' ) {
		$x = null === $x ? self::X : $x;
		$w = null === $w ? $this->cw() : $w;
		$p = $this->pdf;
		$p->font( $font, $size );
		$p->ink( $color );
		$lines = $this->wrap( $text, $w );
		foreach ( $lines as $line ) {
			$p->put( $x, $this->y + $size, $line );
			$this->y += $lh;
		}
		return count( $lines );
	}

	/** Lines of at most $w points (with the current font). */
	private function wrap( $text, $w ) {
		$p     = $this->pdf;
		$out   = array();
		$line  = '';
		$words = preg_split( '/\s+/u', trim( (string) $text ) );
		foreach ( $words as $word ) {
			$try = '' === $line ? $word : $line . ' ' . $word;
			if ( '' === $line || $p->GetStringWidth( $try ) <= $w ) {
				$line = $try;
			} else {
				$out[] = $line;
				$line  = $word;
			}
		}
		if ( '' !== $line ) {
			$out[] = $line;
		}
		return $out;
	}

	/** Text cut to a width with "…" (with the current font). */
	private function fit( $text, $w ) {
		$p    = $this->pdf;
		$text = (string) $text;
		if ( $p->GetStringWidth( $text ) <= $w ) {
			return $text;
		}
		$lo = 0;
		$hi = mb_strlen( $text, 'UTF-8' );
		while ( $lo < $hi ) {
			$mid = (int) ceil( ( $lo + $hi ) / 2 );
			if ( $p->GetStringWidth( rtrim( mb_substr( $text, 0, $mid, 'UTF-8' ) ) . '…' ) <= $w ) {
				$lo = $mid;
			} else {
				$hi = $mid - 1;
			}
		}
		return rtrim( mb_substr( $text, 0, $lo, 'UTF-8' ) ) . '…';
	}

	/** A short grey line where a list would be. */
	private function none( $text = '', $x = null ) {
		$p = $this->pdf;
		$p->font( 'sans', 8.5 );
		$p->ink( $this->c['muted'] );
		$p->put( null === $x ? self::X : $x, $this->y + 9, '' !== $text ? $text : __( 'Nothing recorded in this period.', 'om-catalog' ) );
		$this->y += 22;
	}

	/** A small gold label over a block ("AT A GLANCE"). */
	private function label( $text ) {
		$p = $this->pdf;
		$p->font( 'sans7', 7 );
		$p->ink( $this->c['gold_ink'] );
		$p->put( self::X, $this->y + 8, self::upper( $text ), 'L', 1.3 );
		$this->y += 18;
	}

	/** ▲ 12% (green) / ▼ 8% (red) / 0%; returns the width drawn. $dark: on the night colour. */
	private function delta( $x, $y, $pct, $size = 7.5, $up_is_good = true, $dark = false ) {
		$p = $this->pdf;
		$c = $this->c;
		if ( null === $pct || '' === $pct ) {
			$p->font( 'sans6', $size );
			$p->ink( $dark ? '#cfcac0' : $c['muted'] );
			$label = null === $pct ? __( 'New', 'om-catalog' ) : '–';
			$p->put( $x, $y, $label );
			return $p->width( $label );
		}
		$good  = 0 === $pct ? null : ( $pct > 0 ) === $up_is_good;
		$up    = $dark ? '#8fe0a8' : $c['up'];
		$down  = $dark ? '#ffb4a3' : $c['down'];
		$color = null === $good ? ( $dark ? '#cfcac0' : $c['sub'] ) : ( $good ? $up : $down );
		$t     = $size * 0.62;
		$p->fill( $color );
		if ( $pct > 0 ) {
			$p->poly( array( array( $x, $y - 0.6 ), array( $x + $t, $y - 0.6 ), array( $x + $t / 2, $y - 0.6 - $t * 0.9 ) ), 'f', true );
		} elseif ( $pct < 0 ) {
			$p->poly( array( array( $x, $y - $t * 0.9 - 0.6 ), array( $x + $t, $y - $t * 0.9 - 0.6 ), array( $x + $t / 2, $y - 0.6 ) ), 'f', true );
		}
		$tx = $pct ? $x + $t + 2.5 : $x;
		$p->font( 'sans7', $size );
		$p->ink( $color );
		$label = self::n( abs( $pct ) ) . '%';
		$p->put( $tx, $y, $label );
		return $tx - $x + $p->width( $label );
	}

	/** How wide delta() will draw. */
	private function delta_width( $pct, $size = 7.5 ) {
		$p = $this->pdf;
		if ( null === $pct || '' === $pct ) {
			$p->font( 'sans6', $size );
			return $p->width( null === $pct ? __( 'New', 'om-catalog' ) : '–' );
		}
		$p->font( 'sans7', $size );
		return ( $pct ? $size * 0.62 + 2.5 : 0 ) + $p->width( self::n( abs( $pct ) ) . '%' );
	}

	/** A headline number in a box: label, number, change and the number before. */
	private function tile( $x, $y, $w, $h, $label, $value, $change, $before, $size = 22 ) {
		$p = $this->pdf;
		$c = $this->c;
		$p->fill( $c['ivory'] );
		$p->rrect( $x, $y, $w, $h, 7 );
		$p->font( 'sans6', 6.6 );
		$p->ink( $c['sub'] );
		$p->put( $x + 11, $y + 16, $this->fit( self::upper( $label ), $w - 22 ), 'L', 0.5 );
		$p->font( 'serif', $size );
		$p->ink( $c['ink'] );
		$p->put( $x + 11, $y + 22 + $size * 0.85, $value );
		$dy = $y + 22 + $size * 0.85 + 13;
		$dw = $this->delta( $x + 11, $dy, $change );
		$p->font( 'sans', 6.8 );
		$p->ink( $c['sub'] );
		/* translators: %s: the number in the period before. */
		$p->put( $x + 11 + $dw + 5, $dy, $this->fit( sprintf( __( 'from %s', 'om-catalog' ), $before ), $w - $dw - 26 ) );
		return $dy;
	}

	/**
	 * A table. $cols: [ [ head, width, align L|R ] ]. A cell is text, or
	 * [ 't' => text, 's' => smaller second line, 'bar' => 0..1, 'b' => bold, 'c' => colour ].
	 * Short tables stay on one page; long ones repeat their heads on the next.
	 */
	private function table( $cols, $rows, $o = array() ) {
		$p     = $this->pdf;
		$c     = $this->c;
		$x0    = $o['x'] ?? self::X;
		$tw    = array_sum( wp_list_pluck( $cols, 1 ) );
		$rh    = $o['rh'] ?? self::row_h( $rows );
		$break = empty( $o['nobreak'] );
		if ( ! $rows ) {
			if ( $break ) {
				$this->ensure( 22 );
			}
			$this->none( $o['empty'] ?? '', $x0 );
			return;
		}
		$head = $this->head_lines( $cols );
		$n    = count( $rows );
		if ( $break ) {
			$all = $head[1] + $n * $rh;
			$this->ensure( $all <= self::KEEP ? $all : $head[1] + 4 * $rh );
		}
		$this->thead( $cols, $x0, $tw, $head );
		$here = 0;
		foreach ( $rows as $ri => $row ) {
			$left = $n - $ri;
			// A new page when the row doesn't fit, or one row early so the last two stay together.
			if ( $break && $here && ( $this->y + $rh > self::BOTTOM || ( 2 === $left && $here >= 3 && $this->y + 2 * $rh > self::BOTTOM ) ) ) {
				$this->new_page();
				$this->thead( $cols, $x0, $tw, $head );
				$here = 0;
			}
			$x    = $x0;
			$last = ! empty( $o['total'] ) && 1 === $left;
			if ( $last ) {
				$p->fill( $c['ivory'] );
				$p->Rect( $x0, $this->y, $tw, $rh, 'F' );
			}
			foreach ( $cols as $i => $col ) {
				$cell = $row[ $i ] ?? '';
				$cell = is_array( $cell ) ? $cell : array( 't' => (string) $cell );
				$w    = $col[1];
				$al   = $col[2] ?? 'L';
				if ( isset( $cell['bar'] ) && $cell['bar'] > 0 ) {
					$p->fill( $c['tint'] );
					$p->rrect( $x, $this->y + 3, max( 3, ( $w - 2 ) * min( 1, (float) $cell['bar'] ) ), $rh - 6, 2.5, 'F' );
				}
				$p->font( ! empty( $cell['b'] ) || $last ? 'sans6' : 'sans', 8.6 );
				$p->ink( $cell['c'] ?? ( 'R' === $al ? $c['ink'] : $c['text'] ) );
				$pad  = 5;
				$tx   = 'R' === $al ? $x + $w - $pad : $x + $pad;
				$base = ! empty( $cell['s'] ) ? $this->y + 11.5 : $this->y + $rh / 2 + 3.1;
				$p->put( $tx, $base, $this->fit( (string) ( $cell['t'] ?? '' ), $w - 2 * $pad ), 'R' === $al ? 'R' : 'L' );
				if ( ! empty( $cell['s'] ) ) {
					$p->font( 'sans', 7 );
					$p->ink( $c['sub'] );
					$p->put( $tx, $this->y + 21, $this->fit( (string) $cell['s'], $w - 2 * $pad ), 'R' === $al ? 'R' : 'L' );
				}
				$x += $w;
			}
			$p->stroke( $c['hair'], 0.5 );
			$p->Line( $x0, $this->y + $rh, $x0 + $tw, $this->y + $rh );
			$this->y += $rh;
			++$here;
		}
		$this->y += $o['after'] ?? 12;
	}

	/** Column heads in capitals, on two lines where one is too wide; and the height they take. */
	private function head_lines( $cols ) {
		$p = $this->pdf;
		$p->font( 'sans6', 6.6 );
		$out = array();
		$two = false;
		foreach ( $cols as $col ) {
			$label = self::upper( $col[0] );
			$words = explode( ' ', $label );
			$lines = array( $label );
			if ( count( $words ) > 1 && $p->width( $label, 0.45 ) > $col[1] - 9 ) {
				$best = null;
				for ( $k = 1, $m = count( $words ); $k < $m; $k++ ) {
					$a    = implode( ' ', array_slice( $words, 0, $k ) );
					$b    = implode( ' ', array_slice( $words, $k ) );
					$wide = max( $p->width( $a, 0.45 ), $p->width( $b, 0.45 ) );
					if ( null === $best || $wide < $best[0] ) {
						$best = array( $wide, array( $a, $b ) );
					}
				}
				$lines = $best[1];
				$two   = true;
			}
			$out[] = $lines;
		}
		return array( $out, $two ? 26 : 17 );
	}

	private function thead( $cols, $x0, $tw, $head ) {
		$p = $this->pdf;
		$c = $this->c;
		$x = $x0;
		list( $sets, $hh ) = $head;
		$p->font( 'sans6', 6.6 );
		$p->ink( $c['sub'] );
		foreach ( $cols as $i => $col ) {
			$ly = $this->y + $hh - 6 - 8.4 * ( count( $sets[ $i ] ) - 1 );
			foreach ( $sets[ $i ] as $line ) {
				if ( 'R' === ( $col[2] ?? 'L' ) ) {
					$p->put( $x + $col[1] - 5, $ly, $line, 'R', 0.45 );
				} else {
					$p->put( $x + 5, $ly, $line, 'L', 0.45 );
				}
				$ly += 8.4;
			}
			$x += $col[1];
		}
		$p->stroke( $c['line'], 0.8 );
		$p->Line( $x0, $this->y + $hh, $x0 + $tw, $this->y + $hh );
		$this->y += $hh;
	}

	/** Row height: taller when a cell has a second line. */
	private static function row_h( $rows ) {
		foreach ( $rows as $row ) {
			foreach ( $row as $cell ) {
				if ( is_array( $cell ) && ! empty( $cell['s'] ) ) {
					return 27;
				}
			}
		}
		return 19;
	}

	/** Height a whole table takes, with the space after it. */
	private static function table_h( $rows ) {
		return $rows ? 17 + count( $rows ) * self::row_h( $rows ) + 12 : 22;
	}

	/** What has to fit under a heading for its table to start with it: all of a short table, the first rows of a long one. */
	private static function table_need( $rows ) {
		$all = self::table_h( $rows );
		return $all - 12 <= self::KEEP ? $all : 17 + 4 * self::row_h( $rows );
	}

	/**
	 * A list for columns(): its title, what draws it at ( x, width ) and its
	 * height. The first column takes the width the others leave.
	 */
	private function part( $title, $cols, $rows, $empty = '' ) {
		return array(
			$title,
			function ( $x, $w ) use ( $cols, $rows, $empty ) {
				$cols[0][1] = $w - array_sum( wp_list_pluck( array_slice( $cols, 1 ), 1 ) );
				$this->table(
					$cols,
					$rows,
					array(
						'x'       => $x,
						'nobreak' => true,
						'empty'   => $empty,
					)
				);
			},
			self::table_h( $rows ),
		);
	}

	/**
	 * Lists side by side, $per to a row (all of them by default), each row
	 * kept on one page and going on below its tallest list. $small: the lists
	 * belong to a heading above them, so their names are set smaller.
	 */
	private function columns( $parts, $per = 0, $small = false ) {
		$per = $per ? $per : count( $parts );
		$w   = ( $this->cw() - self::GAP * ( $per - 1 ) ) / $per;
		foreach ( array_chunk( $parts, $per ) as $row ) {
			$this->ensure( ( $small ? 15 : 22 ) + max( wp_list_pluck( $row, 2 ) ) );
			$top  = $this->y;
			$most = $top;
			foreach ( $row as $i => $part ) {
				$this->y = $top;
				$x       = self::X + $i * ( $w + self::GAP );
				if ( $small ) {
					$this->pdf->font( 'sans6', 8.6 );
					$this->pdf->ink( $this->c['text'] );
					$this->pdf->put( $x, $this->y + 9, $part[0] );
					$this->y += 15;
				} else {
					$this->sub( $part[0], '', 0, $x, $w );
				}
				call_user_func( $part[1], $x, $w );
				$most = max( $most, $this->y );
			}
			$this->y = $most;
		}
	}

	/** Ranked list rows: name with a bar for its share, number, share. */
	private static function ranked_rows( $list, $name, $total, $value = 'visits' ) {
		$rows = array();
		$max  = 0;
		foreach ( $list as $r ) {
			$max = max( $max, (float) $r[ $value ] );
		}
		foreach ( $list as $r ) {
			$v      = (float) $r[ $value ];
			$rows[] = array(
				array(
					't'   => call_user_func( $name, $r ),
					'bar' => $max ? $v / $max : 0,
				),
				self::n( $v ),
				$total ? self::pct( $v, $total, 0 ) : '',
			);
		}
		return $rows;
	}

	/** Choices and how often each was picked, with its share: [ value => times ]. */
	private static function choice_rows( $counts, $limit, $name = null ) {
		$all  = array_sum( $counts );
		$rows = array();
		foreach ( array_slice( $counts, 0, $limit, true ) as $value => $n ) {
			$rows[] = array( $name ? call_user_func( $name, (string) $value ) : (string) $value, self::n( $n ), self::pct( $n, $all, 0 ) );
		}
		return $rows;
	}

	/* ---------------------------------------------------------------
	 * Charts
	 * ------------------------------------------------------------- */

	/** Round steps for an axis (4 or fewer lines): 1, 2, 2.5, 5 × 10ⁿ; time in 15 s, 30 s, minutes. */
	private static function scale( $max, $kind ) {
		if ( $max <= 0 ) {
			$step = 't' === $kind ? 15 : 1;
		} elseif ( 't' === $kind ) {
			$raw  = $max / 4;
			$step = 0;
			foreach ( array( 5, 10, 15, 20, 30, 60, 120, 180, 300, 600, 900, 1200, 1800, 3600, 7200 ) as $s ) {
				if ( $s >= $raw ) {
					$step = $s;
					break;
				}
			}
			$step = $step ? $step : ceil( $raw / 3600 ) * 3600;
		} else {
			$raw     = $max / 4;
			$mag     = pow( 10, floor( log10( $raw ) ) );
			$norm    = $raw / $mag;
			$quarter = $norm <= 2.5 && ( 'p' === $kind ? $mag >= 1 : $mag >= 10 );
			$step    = ( $norm <= 1 ? 1 : ( $norm <= 2 ? 2 : ( $quarter ? 2.5 : ( $norm <= 5 ? 5 : 10 ) ) ) ) * $mag;
			if ( 'n' === $kind ) {
				$step = max( 1, round( $step ) );
			}
		}
		$count = $max <= 0 ? 4 : max( 1, (int) ceil( $max / $step - 1e-9 ) );
		$ticks = array();
		for ( $i = 0; $i <= $count; $i++ ) {
			$ticks[] = round( $i * $step, 3 );
		}
		return array( $count * $step, $ticks );
	}

	private static function axis( $kind, $v ) {
		if ( 't' === $kind ) {
			return self::dur( $v );
		}
		if ( 'p' === $kind ) {
			return self::n( $v, fmod( $v, 1 ) ? 1 : 0 ) . '%';
		}
		return OM_Insights_Report::compact( $v );
	}

	/**
	 * Hairline grid with the amounts on the left; returns the plot's left
	 * edge, width and height, and a function from amount to height.
	 */
	private function grid( $ticks, $top, $kind, $x, $y, $w, $h ) {
		$p = $this->pdf;
		$c = $this->c;
		$p->font( 'sans', 6.6 );
		$left = 8;
		foreach ( $ticks as $t ) {
			$left = max( $left, $p->width( self::axis( $kind, $t ) ) + 8 );
		}
		$px = $x + $left;
		$pw = $w - $left - 4;
		$ph = $h - 18;
		$ys = static function ( $v ) use ( $y, $ph, $top ) {
			return $y + $ph - $ph * ( (float) $v ) / $top;
		};
		foreach ( $ticks as $i => $t ) {
			$gy = $ys( $t );
			$p->stroke( $i ? $c['hair'] : $c['line'], $i ? 0.5 : 0.8 );
			$p->Line( $px, $gy, $px + $pw, $gy );
			$p->ink( $c['sub'] );
			$p->put( $px - 6, $gy + 2.3, self::axis( $kind, $t ), 'R' );
		}
		return array( $px, $pw, $ph, $ys );
	}

	/** Dates along the bottom of a chart, spaced so they never touch; $at( i ) is each one's centre. */
	private function x_labels( $labels, $at, $px, $pw, $base ) {
		$p = $this->pdf;
		$p->font( 'sans', 6.6 );
		$p->ink( $this->c['sub'] );
		$n      = count( $labels );
		$wide   = 0;
		foreach ( $labels as $label ) {
			$wide = max( $wide, $p->width( (string) $label ) );
		}
		$stride = max( 1, (int) ceil( $n / max( 2, floor( $pw / ( $wide + 18 ) ) ) ) );
		for ( $i = 0; $i < $n; $i += $stride ) {
			$label = (string) $labels[ $i ];
			$lw    = $p->width( $label );
			$lx    = max( $px - 2, min( $px + $pw + 4 - $lw, $at( $i ) - $lw / 2 ) );
			$p->put( $lx, $base, $label );
		}
	}

	/**
	 * This period (gold, filled) and the period compared with (grey), on one scale.
	 * Today, and weeks or months cut short by the period's ends, are hollow dots
	 * apart from the line (they would look like a fall).
	 */
	private function line_chart( $chart, $key, $x, $y, $w, $h ) {
		$p      = $this->pdf;
		$c      = $this->c;
		$kind   = OM_Insights_Report::metrics()[ $key ][1] ?? 'n';
		$labels = $chart['labels'];
		$n      = count( $labels );
		$cut    = max( 0, min( $n, (int) $chart['cut'] ) );
		$cur    = array_slice( $chart['m'][ $key ]['c'], 0, $cut );
		$prevs  = $chart['m'][ $key ]['p'];
		$prev   = array_values( array_filter( $prevs, static function ( $v ) { return null !== $v; } ) );
		list( $top, $ticks )       = self::scale( max( array_merge( array( 0 ), $cur, $prev ) ), $kind );
		list( $px, $pw, $ph, $ys ) = $this->grid( $ticks, $top, $kind, $x, $y, $w, $h );
		$xs = static function ( $i ) use ( $px, $pw, $n ) {
			return $n > 1 ? $px + $pw * $i / ( $n - 1 ) : $px + $pw / 2;
		};
		$this->x_labels( $labels, $xs, $px, $pw, $y + $ph + 12 );
		$short_c = static function ( $i ) use ( $chart, $cut ) {
			return ! empty( $chart['short'][ $i ] ) || ( ! empty( $chart['partial'] ) && $i === $cut - 1 );
		};
		$short_p = static function ( $i ) use ( $chart ) {
			return ! empty( $chart['pshort'][ $i ] );
		};
		$runs = static function ( $values, $count, $short ) use ( $xs, $ys ) {
			$out   = array();
			$loose = array();
			$run   = array();
			for ( $i = 0; $i < $count; $i++ ) {
				$has = isset( $values[ $i ] ) && null !== $values[ $i ];
				if ( ! $has || $short( $i ) ) {
					if ( $run ) {
						$out[] = $run;
						$run   = array();
					}
					if ( $has ) {
						$loose[] = array( $xs( $i ), $ys( $values[ $i ] ) );
					}
					continue;
				}
				$run[] = array( $xs( $i ), $ys( $values[ $i ] ) );
			}
			if ( $run ) {
				$out[] = $run;
			}
			return array( $out, $loose );
		};
		list( $cur_runs, $cur_loose )   = $runs( $cur, $cut, $short_c );
		list( $prev_runs, $prev_loose ) = $runs( $prevs, $n, $short_p );
		$p->round_lines( true );
		// The fill first, so the grey line of the period compared with shows on top of it.
		$p->fill( $c['area'] );
		foreach ( $cur_runs as $run ) {
			if ( count( $run ) > 1 ) {
				$p->smooth( $run, 'f', $ys( 0 ) );
			}
		}
		foreach ( $prev_runs as $run ) {
			if ( count( $run ) > 1 ) {
				$p->stroke( $c['prev'], 1 );
				$p->smooth( $run, 'S' );
			}
		}
		foreach ( $prev_loose as $pt ) {
			$p->fill( '#ffffff' );
			$p->stroke( $c['prev'], 0.9 );
			$p->circle( $pt[0], $pt[1], 2, 'DF' );
		}
		foreach ( $cur_runs as $run ) {
			if ( count( $run ) > 1 ) {
				$p->stroke( $c['series'], 1.7 );
				$p->smooth( $run, 'S' );
			} else {
				$p->fill( $c['series'] );
				$p->circle( $run[0][0], $run[0][1], 2.4 );
			}
		}
		foreach ( $cur_loose as $pt ) {
			$p->fill( '#ffffff' );
			$p->stroke( $c['series'], 1.3 );
			$p->circle( $pt[0], $pt[1], 2.6, 'DF' );
		}
		$p->round_lines( false );
	}

	/** A column standing on $base, with rounded top corners. */
	private function bar( $x, $base, $w, $h, $color ) {
		if ( $h < 0.3 ) {
			return;
		}
		$p = $this->pdf;
		$r = min( 1.8, $w / 2, $h );
		$p->fill( $color );
		$p->rrect( $x, $base - $h, $w, $h, $r );
		if ( $h > $r ) {
			$p->Rect( $x, $base - $r, $w, $r, 'F' );
		}
	}

	/** Legend for the two periods, ending at $x: lines, or squares for columns. */
	private function legend( $x, $y, $prev_text, $bars = false ) {
		$p = $this->pdf;
		$c = $this->c;
		$p->font( 'sans', 7.2 );
		$items = array( array( $c['series'], __( 'This period', 'om-catalog' ) ), array( $c['prev'], $prev_text ) );
		$w     = 0;
		foreach ( $items as $it ) {
			$w += 16 + $p->width( $it[1] ) + 12;
		}
		$cx = $x - $w + 12;
		foreach ( $items as $it ) {
			if ( $bars ) {
				$p->fill( $it[0] );
				$p->rrect( $cx + 3, $y - 6.6, 7, 7, 1.5 );
			} else {
				$p->stroke( $it[0], 1.7 );
				$p->Line( $cx, $y - 2.5, $cx + 11, $y - 2.5 );
			}
			$p->ink( $c['sub'] );
			$p->put( $cx + 15, $y, $it[1] );
			$cx += 16 + $p->width( $it[1] ) + 12;
		}
	}

	/** A small line for a headline number (this period only). */
	private function spark( $values, $x, $y, $w, $h, $color = null ) {
		$values = array_values( $values );
		$n      = count( $values );
		if ( $n < 2 ) {
			return;
		}
		$max = max( $values );
		$max = $max > 0 ? $max : 1;
		$pts = array();
		foreach ( $values as $i => $v ) {
			$pts[] = array( $x + $w * $i / ( $n - 1 ), $y + $h - $h * (float) $v / $max );
		}
		$p = $this->pdf;
		$p->round_lines( true );
		$p->stroke( null !== $color ? $color : $this->c['gold_deep'], 0.9 );
		$p->poly( $pts );
		$p->round_lines( false );
	}

	/* ---------------------------------------------------------------
	 * The cover
	 * ------------------------------------------------------------- */

	private function cover() {
		$p   = $this->pdf;
		$c   = $this->c;
		$r   = $this->r;
		$now = $this->d['now'];
		$bef = $this->d['before'];
		$p->AddPage();
		$p->bookmark( __( 'At a glance', 'om-catalog' ), 0 );

		$p->fill( $c['night'] );
		$p->Rect( 0, 0, self::W, 216, 'F' );
		$this->mark( self::X, 42, 28, $c['gold'] );
		list( $big, $small ) = $this->wordmark();
		$p->font( 'serif', 17 );
		$p->ink( '#ffffff' );
		$p->put( self::X + 38, 58, $big, 'L', 3.4 );
		if ( '' !== $small ) {
			$p->font( 'sans6', 6.2 );
			$p->ink( $c['gold'] );
			$p->put( self::X + 39, 69.5, $small, 'L', 2.1 );
		}
		$p->font( 'sans6', 6.6 );
		$p->ink( $c['gold'] );
		$p->put( self::W - self::X, 58, self::upper( __( 'Insights report', 'om-catalog' ) ), 'R', 1.8 );
		$p->font( 'sans', 7.2 );
		$p->ink( '#a9a59c' );
		$p->put( self::W - self::X, 70, self::domain(), 'R' );

		$p->font( 'serif', 36 );
		$p->ink( '#ffffff' );
		$p->put( self::X, 138, __( 'Website insights', 'om-catalog' ) );
		$p->font( 'sans6', 12.5 );
		$p->ink( self::mix( $c['gold'], '#ffffff', 0.5 ) );
		$today = wp_date( 'Y-m-d', $this->made );
		$p->put( self::X, 164, self::long_period( $r->from, $r->to ) . ( $r->to === $today ? ' (' . __( 'so far', 'om-catalog' ) . ')' : '' ) );
		$days = $r->span();
		$p->font( 'sans', 9 );
		$p->ink( '#b3afa6' );
		/* translators: 1: number of days, 2: "compared with ..." */
		$p->put( self::X, 182, sprintf( _n( '%1$s day, %2$s', '%1$s days, %2$s', $days, 'om-catalog' ), self::n( $days ), $this->compared_words() ) );
		$p->fill( $c['gold_deep'] );
		$p->Rect( 0, 216, self::W, 1.4, 'F' );
		$this->y = 238;

		$filters = $this->filter_words();
		if ( $filters ) {
			/* translators: %s: the filters, e.g. "Source: Search engines". */
			$text = sprintf( __( 'Only visits with %s. Every number in this report counts only these visits.', 'om-catalog' ), implode( ', ', $filters ) );
			$p->font( 'sans6', 8.4 );
			$lines = $this->wrap( $text, $this->cw() - 24 );
			$h     = 12 + 12 * count( $lines );
			$p->fill( $c['ivory'] );
			$p->rrect( self::X, $this->y, $this->cw(), $h, 6 );
			$p->fill( $c['gold_deep'] );
			$p->Rect( self::X, $this->y + 6, 2, $h - 12, 'F' );
			$p->ink( $c['gold_ink'] );
			$ly = $this->y + 6;
			foreach ( $lines as $line ) {
				$p->put( self::X + 14, $ly + 9, $line );
				$ly += 12;
			}
			$this->y += $h + 12;
		}

		$this->label( __( 'Results', 'om-catalog' ) );
		if ( ! $now['visits'] && ! $bef['visits'] ) {
			$this->para( __( 'No visits were recorded in this period. Visits show up a few seconds after they happen; logged-in staff are left out.', 'om-catalog' ), 10, $c['text'], 15 );
			$this->y += 6;
			$this->para( __( 'Try a longer period, or check that collecting is switched on under Insights > Settings.', 'om-catalog' ), 9, $c['sub'], 13.5 );
			return;
		}
		$chart = $this->d['chart'];
		$tw    = ( $this->cw() - 3 * 10 ) / 4;
		$th    = 86;
		$names = OM_Insights_Report::metrics();
		/* translators: %s: number of leads. */
		$sub   = $now['valued'] ? sprintf( _n( '%s lead named a design', '%s leads named a design', $now['valued'], 'om-catalog' ), self::n( $now['valued'] ) ) : '';
		$tiles = array(
			array( 'leads', '' ),
			array( 'bookings', '' ),
			array( 'conv', '' ),
			array( 'value', $sub ),
		);
		foreach ( $tiles as $i => $t ) {
			$key = $t[0];
			$x   = self::X + $i * ( $tw + 10 );
			$dy  = $this->result_tile( $x, $this->y, $tw, $th, $names[ $key ][0], self::metric( $key, $now[ $key ] ), self::change( $now[ $key ], $bef[ $key ] ), self::metric( $key, $bef[ $key ] ), 0 === $i, $t[1] );
			if ( '' === $t[1] ) {
				$this->spark( self::whole( $chart, $key ), $x + 11, $dy + 6, $tw - 22, 11, 0 === $i ? $c['gold'] : null );
			}
		}
		$this->y += $th + 14;
		if ( $now['leads'] ) {
			$p->font( 'sans6', 6.6 );
			$p->ink( $c['sub'] );
			/* translators: %s: number of leads. */
			$p->put( self::X, $this->y + 6, self::upper( sprintf( _n( 'What the %s lead was', 'What the %s leads were', $now['leads'], 'om-catalog' ), self::n( $now['leads'] ) ) ), 'L', 0.5 );
			$this->y += 12;
			$this->y += $this->mix_bar( $now['groups'], self::X, $this->y, $this->cw() ) + 10;
		}
		$gh = $this->goals( $this->y );
		$this->y += $gh ? $gh + 10 : 0;

		$this->label( __( 'Visits and interest', 'om-catalog' ) );
		$small = array(
			'visitors' => __( 'Visitors', 'om-catalog' ),
			'visits'   => __( 'Visits', 'om-catalog' ),
			'engaged'  => __( 'Engaged visits', 'om-catalog' ),
			'designs'  => __( 'Designs viewed', 'om-catalog' ),
			'saves'    => __( 'Saved (hearts)', 'om-catalog' ),
			'contacts' => __( 'Contact taps', 'om-catalog' ),
		);
		$sw = ( $this->cw() - 5 * 8 ) / 6;
		$i  = 0;
		foreach ( $small as $key => $label ) {
			$this->mini_tile( self::X + $i * ( $sw + 8 ), $this->y, $sw, 52, $label, self::metric( $key, $now[ $key ] ), self::change( $now[ $key ], $bef[ $key ] ), self::metric( $key, $bef[ $key ] ) );
			++$i;
		}
		$this->y += 52 + 16;

		// The first findings, two to a row, as many rows as fit above the contents (the goals are drawn above already).
		$list = array_values(
			array_filter(
				$this->d['findings'] ?? array(),
				static function ( $f ) use ( $gh ) {
					return ! $gh || 'goal' !== ( $f['kind'] ?? '' );
				}
			)
		);
		if ( $list ) {
			$parts = count( $this->first );
			$stop  = $parts >= 3 ? self::BOTTOM - 12 - 18 - (int) ceil( $parts / 3 ) * 16 - 14 : self::BOTTOM;
			$this->label( __( 'What stood out', 'om-catalog' ) );
			$cw    = ( $this->cw() - self::GAP ) / 2;
			$shown = 0;
			foreach ( array_chunk( $list, 2 ) as $pair ) {
				$sets = array();
				$h    = 0;
				foreach ( $pair as $f ) {
					$p->font( 'sans', 8.2 );
					$all    = $this->wrap( $f['text'], $cw - 14 );
					$lines  = array_slice( $all, 0, 2 );
					if ( count( $all ) > 2 ) {
						$lines[1] = $this->fit( $lines[1] . ' ' . $all[2], $cw - 14 );
					}
					$sets[] = $lines;
					$h      = max( $h, 13 + 11 * count( $lines ) + 9 );
				}
				if ( $this->y + $h > $stop ) {
					break;
				}
				foreach ( $pair as $k => $f ) {
					$x    = self::X + $k * ( $cw + self::GAP );
					$tone = self::tones()[ $f['tone'] ] ?? self::tones()['info'];
					$cx   = $x + 3;
					$cy   = $this->y + 6;
					$p->fill( $tone[1] );
					$p->poly( array( array( $cx, $cy - 3 ), array( $cx + 3, $cy ), array( $cx, $cy + 3 ), array( $cx - 3, $cy ) ), 'f', true );
					$p->font( 'sans6', 8.8 );
					$p->ink( $c['ink'] );
					$p->put( $x + 14, $this->y + 9, $this->fit( $f['title'], $cw - 14 ) );
					$p->font( 'sans', 8.2 );
					$p->ink( $c['sub'] );
					foreach ( $sets[ $k ] as $j => $line ) {
						$p->put( $x + 14, $this->y + 22 + 11 * $j, $line );
					}
					++$shown;
				}
				$this->y += $h;
			}
			if ( $shown < count( $this->d['findings'] ) ) {
				$p->font( 'sans6', 7.6 );
				$p->ink( $c['gold_ink'] );
				/* translators: %s: number of findings. */
				$p->put( self::X + 14, $this->y + 4, sprintf( __( 'All %s, each with a next step, on the next page.', 'om-catalog' ), self::n( count( $this->d['findings'] ) ) ) );
				$this->y += 10;
			}
		}
		$this->contents();
	}

	/** "In this report": each part, its page and a link to it, at the foot of the cover (pages from the first drawing). */
	private function contents() {
		$list = $this->first;
		if ( count( $list ) < 3 ) {
			return;
		}
		$p   = $this->pdf;
		$c   = $this->c;
		$per = (int) ceil( count( $list ) / 3 );
		$lh  = 16;
		$top = self::BOTTOM - 12 - 18 - $per * $lh;
		if ( $top < $this->y + 10 ) {
			return; // No room left on the cover; the bookmarks still list the parts.
		}
		$p->stroke( $c['line'], 0.6 );
		$p->Line( self::X, $top, self::W - self::X, $top );
		$this->y = $top + 12;
		$this->label( __( 'In this report', 'om-catalog' ) );
		$w = ( $this->cw() - 2 * self::GAP ) / 3;
		$i = 0;
		foreach ( $list as $no => $part ) {
			$x = self::X + intdiv( $i, $per ) * ( $w + self::GAP );
			$y = $this->y + ( $i % $per ) * $lh;
			$p->font( 'sans7', 7.2 );
			$p->ink( $c['gold_ink'] );
			$p->put( $x, $y + 9, sprintf( '%02d', $no ), 'L', 0.6 );
			$p->font( 'sans6', 8 );
			$p->ink( $c['sub'] );
			$p->put( $x + $w, $y + 9, (string) $part[1], 'R' );
			$p->font( 'sans', 8.8 );
			$p->ink( $c['text'] );
			$p->put( $x + 19, $y + 9, $this->fit( $part[0], $w - 40 ) );
			$this->links[ $no ] = $p->AddLink();
			$p->Link( $x, $y - 2, $w, $lh, $this->links[ $no ] );
			++$i;
		}
		$this->y += $per * $lh;
	}

	/** Plain sentences about the period, from the numbers. */
	private function highlights() {
		$d   = $this->d;
		$now = $d['now'];
		$bef = $d['before'];
		$out = array();

		$ch = self::change( $now['visitors'], $bef['visitors'] );
		if ( ! is_int( $ch ) ) {
			/* translators: %s: number of visitors. */
			$out[] = sprintf( __( '%s visitors in this period.', 'om-catalog' ), self::n( $now['visitors'] ) );
		} elseif ( abs( $ch ) < 3 ) {
			/* translators: %s: number of visitors. */
			$out[] = sprintf( __( '%s visitors, about the same as the period before.', 'om-catalog' ), self::n( $now['visitors'] ) );
		} else {
			/* translators: 1: number of visitors, 2: percent. */
			$out[] = $ch > 0 ? sprintf( __( '%1$s visitors, %2$s more than the period before.', 'om-catalog' ), self::n( $now['visitors'] ), self::n( $ch ) . '%' ) : sprintf( __( '%1$s visitors, %2$s fewer than the period before.', 'om-catalog' ), self::n( $now['visitors'] ), self::n( abs( $ch ) ) . '%' );
		}

		if ( $now['leads'] ) {
			$lc = self::change( $now['leads'], $bef['leads'] );
			/* translators: 1: number of leads, 2: share of visits. */
			$line = sprintf( _n( '%1$s lead (visit requests, inquiries, hints and emails sent from the site); %2$s of visits ended in one.', '%1$s leads (visit requests, inquiries, hints and emails sent from the site); %2$s of visits ended in one.', $now['leads'], 'om-catalog' ), self::n( $now['leads'] ), self::n( $now['conv'], 1 ) . '%' );
			if ( is_int( $lc ) && abs( $lc ) >= 3 ) {
				/* translators: %s: percent. */
				$line .= ' ' . ( $lc > 0 ? sprintf( __( 'That is %s more leads than the period before.', 'om-catalog' ), self::n( $lc ) . '%' ) : sprintf( __( 'That is %s fewer leads than the period before.', 'om-catalog' ), self::n( abs( $lc ) ) . '%' ) );
			}
			$out[] = $line;
		} else {
			$out[] = __( 'No leads were recorded in this period.', 'om-catalog' );
		}

		$ch = $d['channels'];
		if ( $now['visits'] && count( $ch ) > 1 ) {
			/* translators: 1: source, 2: share of visits. */
			$line = sprintf( __( 'Most visits came from %1$s (%2$s)', 'om-catalog' ), self::source_words( $ch[0]['k'] ), self::pct( $ch[0]['visits'], $now['visits'], 0 ) );
			if ( isset( $ch[1] ) ) {
				/* translators: 1: source, 2: share of visits. */
				$line .= sprintf( __( ', then from %1$s (%2$s)', 'om-catalog' ), self::source_words( $ch[1]['k'] ), self::pct( $ch[1]['visits'], $now['visits'], 0 ) );
			}
			$out[] = $line . '.';
			$best  = null;
			foreach ( $ch as $row ) {
				if ( (int) $row['visits'] >= 20 && (int) $row['converted'] > 0 && ( ! $best || $row['converted'] / $row['visits'] > $best['converted'] / $best['visits'] ) ) {
					$best = $row;
				}
			}
			if ( $best && $now['converted'] && $best['converted'] / $best['visits'] > 1.15 * $now['converted'] / $now['visits'] ) {
				/* translators: 1: source, 2: lead rate, 3: lead rate overall. */
				$out[] = sprintf( __( 'Visits from %1$s were the most likely to become leads: %2$s of them, against %3$s overall.', 'om-catalog' ), self::source_words( $best['k'] ), self::pct( $best['converted'], $best['visits'] ), self::n( $now['conv'], 1 ) . '%' );
			}
		}

		$top = $d['products'][0] ?? null;
		if ( $top && (int) $top['views'] ) {
			$design = OM_Insights_Report::design( $top['item'], $top['title'] );
			/* translators: 1: design, 2: views. */
			$line = sprintf( _n( 'The most viewed design was %1$s, with %2$s view', 'The most viewed design was %1$s, with %2$s views', (int) $top['views'], 'om-catalog' ), $design['title'] . ( '' !== $design['style'] && $design['style'] !== $design['title'] ? ' (' . $design['style'] . ')' : '' ), self::n( $top['views'] ) );
			if ( (int) $top['saves'] ) {
				/* translators: %s: times saved. */
				$line .= sprintf( _n( ' and %s save', ' and %s saves', (int) $top['saves'], 'om-catalog' ), self::n( $top['saves'] ) );
			}
			$out[] = $line . '.';
		}

		foreach ( $d['devices'] as $row ) {
			if ( 'phone' === $row['k'] && $now['visits'] ) {
				/* translators: %s: share of visits. */
				$out[] = sprintf( __( '%s of visits were on phones.', 'om-catalog' ), self::pct( $row['visits'], $now['visits'], 0 ) );
			}
		}

		list( $dow, $hour, $n ) = $this->busiest();
		if ( $n && $this->r->span() >= 7 ) {
			/* translators: 1: day of the week, 2: hour range. */
			$out[] = sprintf( __( 'The busiest day was %1$s, and the busiest hour %2$s.', 'om-catalog' ), $dow, $hour );
		} elseif ( $n ) {
			/* translators: %s: hour range. */
			$out[] = sprintf( __( 'The busiest hour was %s.', 'om-catalog' ), $hour );
		}

		$zero = $d['search']['zero'];
		if ( $zero ) {
			$times = array_sum( wp_list_pluck( $zero, 'n' ) );
			/* translators: 1: number of searches, 2: the most common one. */
			$out[] = sprintf( _n( '%1$s search found nothing; the most common was "%2$s".', '%1$s searches found nothing; the most common was "%2$s".', $times, 'om-catalog' ), self::n( $times ), $zero[0]['q'] );
		}
		return array_slice( $out, 0, 8 );
	}

	/** [ busiest day name, busiest hour as "2 pm to 3 pm", visits in that hour slot ]. */
	private function busiest() {
		$days  = array( __( 'Sunday', 'om-catalog' ), __( 'Monday', 'om-catalog' ), __( 'Tuesday', 'om-catalog' ), __( 'Wednesday', 'om-catalog' ), __( 'Thursday', 'om-catalog' ), __( 'Friday', 'om-catalog' ), __( 'Saturday', 'om-catalog' ) );
		$per_d = array_fill( 0, 7, 0 );
		$per_h = array_fill( 0, 24, 0 );
		foreach ( $this->d['heat'] as $dw => $hours ) {
			foreach ( $hours as $h => $v ) {
				$per_d[ (int) $dw ] += $v;
				$per_h[ (int) $h ]  += $v;
			}
		}
		$max = max( $per_h );
		if ( ! $max ) {
			return array( '', '', 0 );
		}
		$utc  = new DateTimeZone( 'UTC' );
		$h    = array_search( $max, $per_h, true );
		$hour = sprintf( /* translators: 1: hour, 2: next hour. */ __( '%1$s to %2$s', 'om-catalog' ), wp_date( 'g a', $h * HOUR_IN_SECONDS, $utc ), wp_date( 'g a', ( ( $h + 1 ) % 24 ) * HOUR_IN_SECONDS, $utc ) );
		return array( $days[ array_search( max( $per_d ), $per_d, true ) ], $hour, $max );
	}

	/* ---------------------------------------------------------------
	 * The parts
	 * ------------------------------------------------------------- */

	private function over_time() {
		$chart = $this->d['chart'];
		/* translators: 1: hour, day, week or month, 2: "the period before" or "the same time last year". */
		$desc = sprintf( __( 'Visitors each %1$s in this period, with %2$s in grey.', 'om-catalog' ), self::unit_word( $chart['unit'] ), $this->r->compare_name() );
		if ( ! empty( $chart['partial'] ) || in_array( true, (array) ( $chart['short'] ?? array() ), true ) ) {
			$desc .= ' ' . __( 'A hollow dot stands for a stretch that isn\'t over yet, or that the period cuts short, so it would look like a fall in the line.', 'om-catalog' );
		}
		$this->section( __( 'Visits over time', 'om-catalog' ), $desc, 262 );
		$this->legend( self::W - self::X, $this->y + 4, $this->r->compare_name( true ) );
		$this->y += 14;
		$this->line_chart( $chart, 'visitors', self::X, $this->y, $this->cw(), 230 );
		$this->y += 248;
	}

	/** Leads by how close they are to a sale: one gold each, darkest for visit requests. */
	private static function group_colors() {
		return array( '#4e3a16', '#7c5f27', '#a8853f', '#c9a865' );
	}

	/** What a finding is: [ name, colour ]. */
	private static function tones() {
		return array(
			'good'  => array( __( 'Going well', 'om-catalog' ), '#1f7a3d' ),
			'watch' => array( __( 'Worth a look', 'om-catalog' ), '#9a5b00' ),
			'idea'  => array( __( 'Idea', 'om-catalog' ), '#7a5b24' ),
			'info'  => array( __( 'Good to know', 'om-catalog' ), '#5a5f67' ),
		);
	}

	/**
	 * A results tile on the cover: bigger, the first one on the night colour.
	 * The number shrinks to fit rather than being cut.
	 */
	private function result_tile( $x, $y, $w, $h, $label, $value, $change, $before, $dark = false, $sub = '' ) {
		$p = $this->pdf;
		$c = $this->c;
		$p->fill( $dark ? $c['night'] : $c['ivory'] );
		$p->rrect( $x, $y, $w, $h, 7 );
		$p->font( 'sans6', 6.6 );
		$p->ink( $dark ? $c['gold'] : $c['sub'] );
		$p->put( $x + 11, $y + 16, $this->fit( self::upper( $label ), $w - 22 ), 'L', 0.5 );
		$size = 25;
		$p->font( 'serif', $size );
		while ( $size > 15 && $p->width( $value ) > $w - 22 ) {
			--$size;
			$p->font( 'serif', $size );
		}
		$p->ink( $dark ? $c['gold'] : $c['ink'] );
		$p->put( $x + 11, $y + 44, $value );
		$dy = $y + 58;
		$dw = $this->delta( $x + 11, $dy, $change, 7.5, true, $dark );
		$p->font( 'sans', 6.8 );
		$p->ink( $dark ? '#b3afa6' : $c['sub'] );
		/* translators: %s: the number in the period compared with. */
		$p->put( $x + 11 + $dw + 5, $dy, $this->fit( sprintf( __( 'from %s', 'om-catalog' ), $before ), $w - $dw - 26 ) );
		if ( '' !== $sub ) {
			$p->put( $x + 11, $dy + 11, $this->fit( $sub, $w - 22 ) );
		}
		return $dy;
	}

	/** Leads by kind: one bar in four golds and a key with each count; returns the height used. */
	private function mix_bar( $groups, $x, $y, $w ) {
		$p      = $this->pdf;
		$c      = $this->c;
		$colors = self::group_colors();
		$total  = array_sum( array_map( 'intval', (array) $groups ) );
		if ( ! $total ) {
			return 0;
		}
		$keys = array_keys( OM_Insights_Report::lead_groups() );
		$live = array_values(
			array_filter(
				$keys,
				static function ( $g ) use ( $groups ) {
					return (int) ( $groups[ $g ] ?? 0 ) > 0;
				}
			)
		);
		$gap  = 1.5;
		$room = $w - $gap * max( 0, count( $live ) - 1 );
		$bx   = $x;
		foreach ( $keys as $i => $g ) {
			$n = (int) ( $groups[ $g ] ?? 0 );
			if ( ! $n ) {
				continue;
			}
			$bw = max( 2, $room * $n / $total );
			$p->fill( $colors[ $i ] );
			$p->rrect( $bx, $y, $bw, 7, 2 );
			$bx += $bw + $gap;
		}
		$kx = $x;
		$ky = $y + 20;
		foreach ( OM_Insights_Report::lead_groups() as $g => $def ) {
			$i    = array_search( $g, $keys, true );
			$n    = (int) ( $groups[ $g ] ?? 0 );
			$name = $def[0];
			$num  = self::n( $n );
			$sh   = self::pct( $n, $total, 0 );
			$p->font( 'sans', 7.6 );
			$nw = $p->width( $name );
			$p->font( 'sans7', 7.6 );
			$cw = $p->width( $num );
			$p->font( 'sans', 7 );
			$sw   = $p->width( $sh );
			$item = 10 + $nw + 5 + $cw + 4 + $sw;
			if ( $kx > $x && $kx + $item > $x + $w ) {
				$kx  = $x;
				$ky += 13;
			}
			$p->fill( $colors[ $i ] );
			$p->rrect( $kx, $ky - 6.4, 6.6, 6.6, 1.5 );
			$p->font( 'sans', 7.6 );
			$p->ink( $c['text'] );
			$p->put( $kx + 10, $ky, $name );
			$p->font( 'sans7', 7.6 );
			$p->ink( $c['ink'] );
			$p->put( $kx + 10 + $nw + 5, $ky, $num );
			$p->font( 'sans', 7 );
			$p->ink( $c['sub'] );
			$p->put( $kx + 10 + $nw + 5 + $cw + 4, $ky, $sh );
			$kx += $item + 16;
		}
		return $ky - $y + 6;
	}

	/** This month against its goals (whole site), side by side; returns the height used (0 without goals). */
	private function goals( $y ) {
		$pace = $this->d['pace'] ?? array();
		if ( ! $pace ) {
			return 0;
		}
		$p    = $this->pdf;
		$c    = $this->c;
		$list = array();
		foreach ( array( 'leads' => __( 'leads', 'om-catalog' ), 'visits' => __( 'visit requests', 'om-catalog' ) ) as $key => $word ) {
			if ( $pace[ $key ]['goal'] ) {
				$list[] = array( $word, $pace[ $key ] );
			}
		}
		if ( ! $list ) {
			return 0;
		}
		$w = ( $this->cw() - self::GAP ) / 2;
		foreach ( $list as $i => $it ) {
			list( $word, $g ) = $it;
			$x = self::X + $i * ( $w + self::GAP );
			$p->font( 'sans6', 8 );
			$p->ink( $c['text'] );
			/* translators: 1: month, 2: "leads" or "visit requests". */
			$p->put( $x, $y + 8, sprintf( __( '%1$s goal: %2$s', 'om-catalog' ), $pace['month'], $word ) );
			$p->font( 'sans7', 9 );
			$p->ink( $c['ink'] );
			$p->put( $x + $w, $y + 8, self::n( $g['n'] ) . ' / ' . self::n( $g['goal'] ), 'R' );
			$p->fill( $c['hair'] );
			$p->rrect( $x, $y + 14, $w, 5, 2.5 );
			$p->fill( $c['gold_deep'] );
			$p->rrect( $x, $y + 14, max( 3, $w * min( 1, $g['n'] / $g['goal'] ) ), 5, 2.5 );
			if ( null !== $g['pace'] ) {
				$mx = $x + $w * min( 1, $g['pace'] / $g['goal'] );
				$ok = $g['pace'] >= $g['goal'];
				$p->fill( $ok ? $c['up'] : ( $g['pace'] < 0.85 * $g['goal'] ? $c['down'] : $c['ink'] ) );
				$p->Rect( $mx - 0.7, $y + 11.5, 1.4, 10, 'F' );
				$p->font( 'sans', 7 );
				$p->ink( $c['sub'] );
				/* translators: 1: projected number, 2: day of the month, 3: days in the month. */
				$p->put( $x, $y + 31, sprintf( __( 'On pace for %1$s by the end of the month · day %2$s of %3$s', 'om-catalog' ), self::n( $g['pace'] ), self::n( $pace['day'] ), self::n( $pace['days'] ) ) );
			}
		}
		return 38;
	}

	/** The words for "compared with ...", after the dates. */
	private function compared_words() {
		list( $pf, $pt ) = $this->r->previous();
		if ( 'year' === $this->r->cmp ) {
			/* translators: %s: the same dates last year. */
			return sprintf( __( 'compared with the same time last year (%s)', 'om-catalog' ), self::long_period( $pf, $pt ) );
		}
		/* translators: %s: the period before. */
		return sprintf( __( 'compared with %s', 'om-catalog' ), self::long_period( $pf, $pt ) );
	}

	/** A small headline number for the cover's second row: label, number, then the change and the number before. */
	private function mini_tile( $x, $y, $w, $h, $label, $value, $change, $before ) {
		$p = $this->pdf;
		$c = $this->c;
		$p->fill( $c['ivory'] );
		$p->rrect( $x, $y, $w, $h, 6 );
		$p->font( 'sans6', 6.2 );
		$p->ink( $c['sub'] );
		$p->put( $x + 9, $y + 14, $this->fit( self::upper( $label ), $w - 18 ), 'L', 0.4 );
		$p->font( 'serif', 16 );
		$p->ink( $c['ink'] );
		$p->put( $x + 9, $y + 32, $this->fit( $value, $w - 18 ) );
		$dw = $this->delta( $x + 9, $y + 44, $change, 6.8 );
		$p->font( 'sans', 6.3 );
		$p->ink( $c['sub'] );
		/* translators: %s: the number in the period compared with. */
		$p->put( $x + 9 + $dw + 4, $y + 44, $this->fit( sprintf( __( 'from %s', 'om-catalog' ), $before ), $w - $dw - 22 ) );
	}

	/** One measure's numbers for whole days, weeks and months (today and short ends left out). */
	private static function whole( $chart, $key ) {
		$out = array();
		$cut = max( 0, (int) $chart['cut'] );
		foreach ( array_slice( $chart['m'][ $key ]['c'], 0, $cut ) as $i => $v ) {
			if ( empty( $chart['short'][ $i ] ) && ! ( ! empty( $chart['partial'] ) && $i === $cut - 1 ) ) {
				$out[] = $v;
			}
		}
		return $out;
	}

	/** Everything that stood out, most important first, each with a next step. */
	private function findings_part() {
		$list = $this->d['findings'] ?? array();
		if ( ! $list ) {
			return;
		}
		$p    = $this->pdf;
		$c    = $this->c;
		$w    = $this->cw() - 28;
		$size = function ( $f ) use ( $p, $w ) {
			$p->font( 'sans7', 10.4 );
			$t = count( $this->wrap( $f['title'], $w ) );
			$p->font( 'sans', 8.8 );
			$x = count( $this->wrap( $f['text'], $w ) );
			$d = 0;
			if ( '' !== $f['do'] ) {
				// As drawn: the first line after "Next step:", the rest at the margin.
				$p->font( 'sans7', 8.8 );
				$lw = $p->width( __( 'Next step:', 'om-catalog' ) . ' ' );
				$p->font( 'sans', 8.8 );
				$words = $this->wrap( $f['do'], $w - $lw );
				array_shift( $words );
				$d = 1 + ( $words ? count( $this->wrap( implode( ' ', $words ), $w ) ) : 0 );
			}
			return array( $t, $x, $d, 18 + 14 * $t + 12.8 * $x + ( $d ? 4 + 12.8 * $d : 0 ) + 10 );
		};
		/* translators: %s: "the period before" or "the same time last year". */
		$this->section( __( 'What stood out', 'om-catalog' ), sprintf( __( 'The most important first, each against %s, with a next step. The same list is on the overview of Insights in wp-admin, with a link to the numbers behind each one.', 'om-catalog' ), $this->r->compare_name() ), $size( $list[0] )[3] );
		foreach ( $list as $i => $f ) {
			list( $tl, $xl, $dl, $h ) = $size( $f );
			$this->ensure( $h + 8 );
			$tone = self::tones()[ $f['tone'] ] ?? self::tones()['info'];
			$top  = $this->y;
			$p->fill( $c['ivory'] );
			$p->rrect( self::X, $top, $this->cw(), $h, 6 );
			$p->fill( $tone[1] );
			$p->rrect( self::X, $top, 3, $h, 1.5 );
			$p->font( 'sans7', 6.6 );
			$p->ink( $tone[1] );
			$p->put( self::X + 16, $top + 15, self::upper( $tone[0] ), 'L', 0.9 );
			$p->font( 'sans7', 7 );
			$p->ink( $c['muted'] );
			$p->put( self::W - self::X - 12, $top + 15, sprintf( '%02d', $i + 1 ), 'R' );
			$this->y = $top + 18;
			$this->para( $f['title'], 10.4, $c['ink'], 14, self::X + 16, $w, 'sans7' );
			$this->para( $f['text'], 8.8, $c['text'], 12.8, self::X + 16, $w );
			if ( '' !== $f['do'] ) {
				$this->y += 4;
				$p->font( 'sans7', 8.8 );
				$lead = __( 'Next step:', 'om-catalog' ) . ' ';
				$lw   = $p->width( $lead );
				$p->ink( $c['gold_ink'] );
				$p->put( self::X + 16, $this->y + 8.8, $lead );
				// The first line follows the words "Next step:", the rest start at the margin.
				$p->font( 'sans', 8.8 );
				$words = $this->wrap( $f['do'], $w - $lw );
				$first = array_shift( $words );
				$p->ink( $c['ink'] );
				$p->put( self::X + 16 + $lw, $this->y + 8.8, (string) $first );
				$this->y += 12.8;
				if ( $words ) {
					$this->para( implode( ' ', $words ), 8.8, $c['ink'], 12.8, self::X + 16, $w );
				}
			}
			$this->y = $top + $h + 8;
		}
	}

	/** Leads each day (week, month), stacked by kind: visit requests at the bottom, in the darkest gold. */
	private function stacked_columns( $chart, $x, $y, $w, $h ) {
		$p      = $this->pdf;
		$colors = self::group_colors();
		$keys   = array_keys( OM_Insights_Report::lead_groups() );
		$labels = $chart['labels'];
		$n      = max( 1, count( $labels ) );
		$cut    = max( 0, min( $n, (int) $chart['cut'] ) );
		$totals = array();
		for ( $i = 0; $i < $cut; $i++ ) {
			$t = 0;
			foreach ( $keys as $g ) {
				$t += (int) ( $chart['g'][ $g ][ $i ] ?? 0 );
			}
			$totals[] = $t;
		}
		list( $top, $ticks )       = self::scale( max( array_merge( array( 0 ), $totals ) ), 'n' );
		list( $px, $pw, $ph, $ys ) = $this->grid( $ticks, $top, 'n', $x, $y, $w, $h );
		$slot = $pw / $n;
		$bw   = max( 1, min( 16, $slot * 0.62 ) );
		$this->x_labels(
			$labels,
			static function ( $i ) use ( $px, $slot ) {
				return $px + ( $i + 0.5 ) * $slot;
			},
			$px,
			$pw,
			$y + $ph + 12
		);
		$base = $ys( 0 );
		for ( $i = 0; $i < $cut; $i++ ) {
			$bx   = $px + $i * $slot + ( $slot - $bw ) / 2;
			$sum  = 0;
			$last = -1;
			foreach ( $keys as $j => $g ) {
				if ( (int) ( $chart['g'][ $g ][ $i ] ?? 0 ) ) {
					$last = $j;
				}
			}
			foreach ( $keys as $j => $g ) {
				$v = (int) ( $chart['g'][ $g ][ $i ] ?? 0 );
				if ( ! $v ) {
					continue;
				}
				$y0 = $ys( $sum );
				$y1 = $ys( $sum + $v );
				$sh = max( 0.4, $y0 - $y1 - ( $sum ? 0.8 : 0 ) );
				if ( $j === $last ) {
					$this->bar( $bx, $y0 - ( $sum ? 0.8 : 0 ), $bw, $sh, $colors[ $j ] );
				} else {
					$p->fill( $colors[ $j ] );
					$p->Rect( $bx, $y0 - ( $sum ? 0.8 : 0 ) - $sh, $bw, $sh, 'F' );
				}
				$sum += $v;
			}
		}
	}

	/** The key for the stacked columns: each kind's colour, name and count; returns its height. */
	private function group_key( $counts, $x, $y ) {
		$p      = $this->pdf;
		$c      = $this->c;
		$colors = self::group_colors();
		$i      = 0;
		$kx     = $x;
		foreach ( OM_Insights_Report::lead_groups() as $g => $def ) {
			$label = $def[0] . ' ' . self::n( (int) ( $counts[ $g ] ?? 0 ) );
			$p->fill( $colors[ $i ] );
			$p->rrect( $kx, $y - 6.4, 6.6, 6.6, 1.5 );
			$p->font( 'sans', 7.4 );
			$p->ink( $c['text'] );
			$p->put( $kx + 10, $y, $label );
			$kx += 10 + $p->width( $label ) + 16;
			++$i;
		}
		return 14;
	}

	/** Page speed: four boxes, each the value 3 in 4 page views beat, its rating, and good / needs work / poor. */
	private function speed() {
		$sp = $this->d['speed'];
		$p  = $this->pdf;
		$c  = $this->c;
		/* translators: %s: number of page views. */
		$note = $sp['n'] ? sprintf( _n( 'From %s page view. Each number is the one 3 in 4 page views beat, the way Google judges speed. Safari and some other browsers report only some of these.', 'From %s page views. Each number is the one 3 in 4 page views beat, the way Google judges speed. Safari and some other browsers report only some of these.', $sp['n'], 'om-catalog' ), self::n( $sp['n'] ) ) : __( 'Nothing measured in this period yet: speed is measured from version 1.44 on (Insights > Settings > Measure page speed).', 'om-catalog' );
		$this->sub( __( 'Page speed', 'om-catalog' ), $note, $sp['n'] ? 110 : 0 );
		if ( ! $sp['n'] ) {
			return;
		}
		$states = array(
			'good' => array( __( 'Good', 'om-catalog' ), '#2f8a50' ),
			'slow' => array( __( 'Needs work', 'om-catalog' ), '#c98a14' ),
			'poor' => array( __( 'Poor', 'om-catalog' ), '#c2412b' ),
		);
		$text   = array(
			'good' => '#1f7a3d',
			'slow' => '#8a5a00',
			'poor' => '#b4321e',
		);
		$bw = ( $this->cw() - 3 * 10 ) / 4;
		$bh = 110;
		$i  = 0;
		foreach ( OM_Insights_Report::vitals() as $key => $v ) {
			$m = $sp['m'][ $key ];
			$x = self::X + $i * ( $bw + 10 );
			$y = $this->y;
			$p->fill( $c['ivory'] );
			$p->rrect( $x, $y, $bw, $bh, 7 );
			$p->font( 'sans6', 7.2 );
			$p->ink( $c['text'] );
			$lines = $this->wrap( $v[0], $bw - 20 );
			foreach ( array_slice( $lines, 0, 2 ) as $k => $line ) {
				$p->put( $x + 10, $y + 15 + 9 * $k, $line );
			}
			if ( ! $m['n'] ) {
				$p->font( 'sans', 8 );
				$p->ink( $c['muted'] );
				$p->put( $x + 10, $y + 48, __( 'Not measured yet', 'om-catalog' ) );
				++$i;
				continue;
			}
			$rating = OM_Insights_Report::vital_rating( $key, $m['p75'] );
			$p->font( 'serif', 19 );
			$p->ink( $c['ink'] );
			$val = OM_Insights_Report::vital_text( $key, $m['p75'] );
			$p->put( $x + 10, $y + 50, $val );
			$p->font( 'sans7', 7 );
			$p->ink( $text[ $rating ] );
			$p->put( $x + 10, $y + 62, self::upper( $states[ $rating ][0] ), 'L', 0.5 );
			// Good, needs work and poor, as one bar.
			$room = $bw - 20 - 3;
			$bx   = $x + 10;
			foreach ( $states as $s => $def ) {
				if ( ! $m[ $s ] ) {
					continue;
				}
				$sw = max( 1.5, $room * $m[ $s ] / $m['n'] );
				$p->fill( $def[1] );
				$p->rrect( $bx, $y + 69, $sw, 5, 1.2 );
				$bx += $sw + 1.5;
			}
			$p->font( 'sans', 6.4 );
			$p->ink( $c['sub'] );
			/* translators: 1: share good, 2: share poor. */
			$p->put( $x + 10, $y + 83, $this->fit( sprintf( __( 'Good %1$s · Poor %2$s', 'om-catalog' ), self::pct( $m['good'], $m['n'], 0 ), self::pct( $m['poor'], $m['n'], 0 ) ), $bw - 20 ) );
			$dy = $y + 95;
			foreach ( array( 'phone' => __( 'Phones', 'om-catalog' ), 'desktop' => __( 'Computers', 'om-catalog' ) ) as $dk => $dn ) {
				if ( ! empty( $m['dev'][ $dk ]['n'] ) ) {
					$p->font( 'sans', 6.6 );
					$p->ink( $c['sub'] );
					$p->put( $x + 10, $dy, $dn );
					$p->font( 'sans6', 6.6 );
					$p->ink( $text[ OM_Insights_Report::vital_rating( $key, $m['dev'][ $dk ]['p75'] ) ] );
					$p->put( $x + $bw - 10, $dy, OM_Insights_Report::vital_text( $key, $m['dev'][ $dk ]['p75'] ), 'R' );
					$dy += 9;
				}
			}
			++$i;
		}
		$this->y += $bh + 10;
		$p->font( 'sans', 7.2 );
		$p->ink( $c['sub'] );
		$parts = array();
		foreach ( OM_Insights_Report::vitals() as $key => $v ) {
			/* translators: 1: measure, 2: good up to, 3: poor above. */
			$parts[] = sprintf( __( '%1$s: good %2$s or less, poor over %3$s', 'om-catalog' ), $v[0], OM_Insights_Report::vital_text( $key, $v[1] ), OM_Insights_Report::vital_text( $key, $v[2] ) );
		}
		$this->para( implode( '. ', $parts ) . '.', 7.2, $c['sub'], 10.5 );
		$this->y += 12;
	}

	/** Every lead, newest first (the list behind the Leads part). */
	private function lead_list() {
		$d     = $this->d;
		$total = (int) $d['now']['leads'];
		$rows  = array();
		foreach ( $d['leads'] as $r ) {
			$kind  = OM_Insights::lead_types()[ $r['kind'] ] ?? (string) $r['kind'];
			$about = '' !== (string) $r['item'] ? OM_Insights_Report::design( $r['item'] )['title'] : '';
			$about = trim( $about . ( '' !== (string) $r['meta'] && $r['meta'] !== $about ? ( '' !== $about ? ' · ' : '' ) . $r['meta'] : '' ) );
			$days  = $r['first'] ? max( 0, (int) floor( ( (int) $r['ts'] - (int) $r['first'] ) / DAY_IN_SECONDS ) ) : null;
			$known = (int) $r['visits'] > 0;
			$price = '' !== (string) $r['item'] ? (float) ( $d['prices'][ $r['item'] ] ?? 0 ) : 0;
			$row   = array( wp_date( 'M j, g:i a', (int) $r['ts'] ) );
			if ( $this->names ) {
				$row[] = '' !== (string) $r['sid'] ? OM_Insights_Report::visitor_label( (string) $r['vid'], (string) $r['lead_name'] ) : __( 'Not linked to a visit', 'om-catalog' );
			}
			$row[]  = array(
				't' => $kind,
				's' => $about,
			);
			$row[]  = $price > 0 ? OM_Insights_Report::money( $price ) : '–';
			$row[]  = '' !== (string) $r['sid'] ? self::source_short( (string) $r['channel'] ) : '–';
			$row[]  = $known ? self::n( $r['visits'] ) : '–';
			$row[]  = ! $known || null === $days ? '–' : ( 0 === $days ? __( 'Same day', 'om-catalog' ) : sprintf( /* translators: %s: days. */ _n( '%s day', '%s days', $days, 'om-catalog' ), self::n( $days ) ) );
			$rows[] = $row;
		}
		$cols = array( array( __( 'When', 'om-catalog' ), 80 ) );
		if ( $this->names ) {
			$cols[] = array( __( 'Who', 'om-catalog' ), 82 );
		}
		$cols[] = array( __( 'What', 'om-catalog' ), $this->names ? 114 : 188 );
		$cols[] = array( __( 'Price', 'om-catalog' ), 52, 'R' );
		$cols[] = array( __( 'Came from', 'om-catalog' ), $this->names ? 84 : 92 );
		$cols[] = array( __( 'Visits', 'om-catalog' ), 38, 'R' );
		$cols[] = array( __( 'Took', 'om-catalog' ), 54, 'R' );
		$more   = max( 0, $total - count( $rows ) );
		$desc   = __( 'Newest first. Price: the listed price of the design they asked about. Visits: how many times they came before getting in touch. Took: days from their first visit.', 'om-catalog' );
		if ( $more ) {
			/* translators: %s: number of further leads. */
			$desc .= ' ' . sprintf( __( 'The %s earlier leads are in Insights > Leads.', 'om-catalog' ), self::n( $more ) );
		}
		$this->section( __( 'Every lead', 'om-catalog' ), $desc, self::table_need( $rows ) );
		$this->table( $cols, $rows, array( 'empty' => __( 'No leads in this period.', 'om-catalog' ) ) );
	}

	private function sources() {
		$d     = $this->d;
		$total = $d['now']['visits'];
		$first = $d['attr']['by'];
		$max   = 0;
		$rows  = array();
		foreach ( $d['channels'] as $r ) {
			$max = max( $max, (int) $r['visits'] );
		}
		foreach ( $d['channels'] as $r ) {
			$v      = (int) $r['visits'];
			$few    = $v < 30;
			$rows[] = array(
				array(
					't'   => OM_Insights_Report::channel_name( $r['k'] ),
					'bar' => $max ? $v / $max : 0,
				),
				self::n( $v ),
				self::pct( $v, $total, 0 ),
				self::pct( $v - (int) $r['quick'], $v, 0 ),
				self::n( $r['converted'] ),
				array(
					't' => self::pct( (int) $r['converted'], $v ) . ( $few ? '*' : '' ),
					'c' => $few ? $this->c['muted'] : null,
				),
				self::n( (int) ( $first[ $r['k'] ]['first'] ?? 0 ) ),
			);
		}
		$this->section( __( 'Where visitors came from', 'om-catalog' ), __( 'How each visit arrived and which sources bring leads. Engaged: visits that did more than glance. With a lead: visits that ended in one. Leads began here: leads whose first visit came this way. * Fewer than 30 visits, so the rate can swing a lot.', 'om-catalog' ), self::table_need( $rows ) );
		$this->table(
			array(
				array( __( 'Source', 'om-catalog' ), 168 ),
				array( __( 'Visits', 'om-catalog' ), 46, 'R' ),
				array( __( 'Share', 'om-catalog' ), 42, 'R' ),
				array( __( 'Engaged', 'om-catalog' ), 52, 'R' ),
				array( __( 'With a lead', 'om-catalog' ), 58, 'R' ),
				array( __( 'Lead rate', 'om-catalog' ), 58, 'R' ),
				array( __( 'Leads began here', 'om-catalog' ), 80, 'R' ),
			),
			$rows
		);

		$refs = self::ranked_rows(
			$d['webs'],
			static function ( $r ) {
				return (string) $r['k'];
			},
			$total
		);
		$camps = array();
		foreach ( array_slice( $d['camps'], 0, 10 ) as $r ) {
			$camps[] = array(
				array(
					't' => '' !== $r['camp'] ? $r['camp'] : '–',
					's' => trim( $r['src'] . ( '' !== $r['med'] ? ' / ' . $r['med'] : '' ) ),
				),
				self::n( $r['visits'] ),
				self::n( $r['converted'] ),
			);
		}
		$this->columns(
			array(
				$this->part( __( 'Websites that sent visitors', 'om-catalog' ), array( array( __( 'Website', 'om-catalog' ), 0 ), array( __( 'Visits', 'om-catalog' ), 48, 'R' ), array( __( 'Share', 'om-catalog' ), 44, 'R' ) ), $refs, __( 'Every visit came direct or from search so far.', 'om-catalog' ) ),
				$this->part( __( 'Campaigns', 'om-catalog' ), array( array( __( 'Campaign', 'om-catalog' ), 0 ), array( __( 'Visits', 'om-catalog' ), 46, 'R' ), array( __( 'With a lead', 'om-catalog' ), 56, 'R' ) ), $camps, __( 'No tagged links (utm_campaign) were used.', 'om-catalog' ) ),
			)
		);

		$rows = array();
		foreach ( $d['landing'] as $r ) {
			$path   = (string) $r['k'];
			$rows[] = array(
				array(
					't' => OM_Insights_Report::title( $d['titles'][ $path ] ?? '', $path ),
					's' => $path,
				),
				self::n( $r['visits'] ),
				self::pct( (int) $r['quick'], (int) $r['visits'], 0 ),
				self::n( $r['pages'], 1 ),
				self::n( $r['converted'] ),
				self::pct( (int) $r['converted'], (int) $r['visits'] ),
			);
		}
		$this->sub( __( 'First page of a visit', 'om-catalog' ), __( 'Where visits start. Quick exits: left after one page in under 10 seconds.', 'om-catalog' ), self::table_need( $rows ) );
		$this->table(
			array(
				array( __( 'Page', 'om-catalog' ), 220 ),
				array( __( 'Visits', 'om-catalog' ), 50, 'R' ),
				array( __( 'Quick exits', 'om-catalog' ), 66, 'R' ),
				array( __( 'Pages', 'om-catalog' ), 46, 'R' ),
				array( __( 'With a lead', 'om-catalog' ), 58, 'R' ),
				array( __( 'Lead rate', 'om-catalog' ), 64, 'R' ),
			),
			$rows
		);
	}

	private function audience() {
		$d     = $this->d;
		$now   = $d['now'];
		$total = $now['visits'];
		$aud   = $d['audience'];
		$this->section( __( 'Who visited', 'om-catalog' ), __( 'First-time and returning visitors and how each did, how often people came, their devices, where they are and the languages their browsers are set to.', 'om-catalog' ), 150 );

		$cell = static function ( $kind, $what ) use ( $aud, $total ) {
			$r = $aud['kinds'][ $kind ] ?? null;
			if ( ! $r || ! (int) $r['visits'] ) {
				return '–';
			}
			$v = (int) $r['visits'];
			switch ( $what ) {
				case 'visits':
					return self::n( $v );
				case 'share':
					return self::pct( $v, $total, 0 );
				case 'conv':
					return self::pct( (int) $r['converted'], $v );
				case 'engaged':
					return self::pct( $v - (int) $r['quick'], $v, 0 );
				case 'pages':
					return self::n( $r['pages'], 1 );
				default:
					return self::dur( $r['engaged'] );
			}
		};
		$compare = array();
		foreach ( array( 'visits' => __( 'Visits', 'om-catalog' ), 'share' => __( 'Share of visits', 'om-catalog' ), 'conv' => __( 'Lead rate', 'om-catalog' ), 'engaged' => __( 'Engaged', 'om-catalog' ), 'pages' => __( 'Pages per visit', 'om-catalog' ), 'time' => __( 'Time per visit', 'om-catalog' ) ) as $what => $label ) {
			$compare[] = array(
				array(
					't' => $label,
					'b' => true,
				),
				$cell( 'new', $what ),
				$cell( 'returning', $what ),
			);
		}
		$all  = max( 1, array_sum( $aud['freq'] ) );
		$most = max( 1, max( $aud['freq'] ) );
		$freq = array();
		foreach ( array( '1' => __( 'Once', 'om-catalog' ), '2' => __( 'Twice', 'om-catalog' ), '3' => __( '3 or 4 times', 'om-catalog' ), '5' => __( '5 times or more', 'om-catalog' ) ) as $key => $label ) {
			$freq[] = array(
				array(
					't'   => $label,
					'bar' => $aud['freq'][ $key ] / $most,
				),
				self::n( $aud['freq'][ $key ] ),
				self::pct( $aud['freq'][ $key ], $all, 0 ),
			);
		}
		$this->columns(
			array(
				$this->part( __( 'First visit and came back', 'om-catalog' ), array( array( '', 0 ), array( __( 'First visit', 'om-catalog' ), 62, 'R' ), array( __( 'Came back', 'om-catalog' ), 62, 'R' ) ), $compare ),
				$this->part( __( 'How often people came', 'om-catalog' ), array( array( __( 'Came', 'om-catalog' ), 0 ), array( __( 'Visitors', 'om-catalog' ), 52, 'R' ), array( __( 'Share', 'om-catalog' ), 40, 'R' ) ), $freq ),
			)
		);

		$devices = array();
		foreach ( $d['devices'] as $r ) {
			$v         = (int) $r['visits'];
			$devices[] = array( OM_Insights_Report::device_one( $r['k'] ), self::n( $v ), self::pct( $v, $total, 0 ), self::pct( $v - (int) $r['quick'], $v, 0 ), self::pct( (int) $r['converted'], $v ) );
		}
		$this->sub( __( 'Devices', 'om-catalog' ), '', self::table_need( $devices ) );
		$this->table(
			array(
				array( __( 'Device', 'om-catalog' ), 200 ),
				array( __( 'Visits', 'om-catalog' ), 70, 'R' ),
				array( __( 'Share', 'om-catalog' ), 70, 'R' ),
				array( __( 'Engaged', 'om-catalog' ), 82, 'R' ),
				array( __( 'Lead rate', 'om-catalog' ), 82, 'R' ),
			),
			$devices
		);

		$name  = array( array( __( 'Name', 'om-catalog' ), 0 ), array( __( 'Visits', 'om-catalog' ), 42, 'R' ), array( __( 'Share', 'om-catalog' ), 36, 'R' ) );
		$plain = static function ( $r ) {
			return '' !== (string) $r['k'] ? (string) $r['k'] : __( 'Unknown', 'om-catalog' );
		};
		$langs = self::ranked_rows(
			array_slice( $aud['langs'], 0, 8 ),
			static function ( $r ) {
				return OM_Insights_Report::language( $r['k'] );
			},
			$total
		);
		$this->columns(
			array(
				$this->part( __( 'Browsers', 'om-catalog' ), $name, self::ranked_rows( $d['browsers'], $plain, $total ) ),
				$this->part( __( 'Systems', 'om-catalog' ), $name, self::ranked_rows( $d['os'], $plain, $total ) ),
				$this->part( __( 'Languages', 'om-catalog' ), $name, $langs, __( 'None recorded yet.', 'om-catalog' ) ),
			)
		);

		$loc = $d['loc'];
		if ( isset( $loc['tz'] ) ) {
			$rows = self::ranked_rows(
				$loc['tz'],
				static function ( $r ) {
					return str_replace( '_', ' ', (string) $r['k'] );
				},
				$total
			);
			$this->sub( __( 'Where visitors are', 'om-catalog' ), __( 'From each visitor\'s time zone. For towns and states, switch on Cloudflare\'s visitor location headers.', 'om-catalog' ), self::table_need( $rows ) );
			$this->table( array( array( __( 'Time zone', 'om-catalog' ), $this->cw() - 120 ), array( __( 'Visits', 'om-catalog' ), 60, 'R' ), array( __( 'Share', 'om-catalog' ), 60, 'R' ) ), $rows );
			return;
		}
		$place = array( array( __( 'Place', 'om-catalog' ), 0 ), array( __( 'Visits', 'om-catalog' ), 42, 'R' ), array( __( 'Share', 'om-catalog' ), 36, 'R' ) );
		$this->y += 4;
		$this->columns(
			array(
				$this->part( __( 'Cities', 'om-catalog' ), $place, self::ranked_rows( array_slice( $loc['city'], 0, 8 ), $plain, $total ) ),
				$this->part( __( 'States', 'om-catalog' ), $place, self::ranked_rows( array_slice( $loc['region'], 0, 8 ), $plain, $total ) ),
				$this->part( __( 'Countries', 'om-catalog' ), $place, self::ranked_rows( array_slice( $loc['country'], 0, 8 ), $plain, $total ) ),
			)
		);
	}

	private function busy_times() {
		$heat = $this->d['heat'];
		$this->section( __( 'When people visit', 'om-catalog' ), __( 'Visits by day of the week and hour, in your site\'s time zone. Darker is busier; the number is the visits in that hour.', 'om-catalog' ), 176 );
		$p   = $this->pdf;
		$c   = $this->c;
		$max = 0;
		foreach ( $heat as $hours ) {
			$max = max( $max, max( $hours ) );
		}
		if ( ! $max ) {
			$this->none();
			return;
		}
		$start = (int) get_option( 'start_of_week', 0 );
		$names = array( __( 'Sun', 'om-catalog' ), __( 'Mon', 'om-catalog' ), __( 'Tue', 'om-catalog' ), __( 'Wed', 'om-catalog' ), __( 'Thu', 'om-catalog' ), __( 'Fri', 'om-catalog' ), __( 'Sat', 'om-catalog' ) );
		$lw    = 30;
		$cw    = ( $this->cw() - $lw ) / 24;
		$ch    = 19;
		$utc   = new DateTimeZone( 'UTC' );
		$p->font( 'sans', 6.4 );
		$p->ink( $c['sub'] );
		for ( $h = 0; $h < 24; $h += 3 ) {
			$p->put( self::X + $lw + $h * $cw + 1, $this->y + 8, wp_date( 'ga', $h * HOUR_IN_SECONDS, $utc ) );
		}
		$this->y += 13;
		for ( $i = 0; $i < 7; $i++ ) {
			$dw = ( $start + $i ) % 7;
			$p->font( 'sans6', 7 );
			$p->ink( $c['sub'] );
			$p->put( self::X, $this->y + $ch / 2 + 2.5, $names[ $dw ] );
			for ( $h = 0; $h < 24; $h++ ) {
				$v    = (int) ( $heat[ $dw ][ $h ] ?? 0 );
				$step = $v ? min( 5, (int) ceil( 5 * $v / $max ) ) : 0;
				$x    = self::X + $lw + $h * $cw;
				$p->fill( $c['ramp'][ $step ] );
				$p->rrect( $x + 0.8, $this->y + 0.8, $cw - 1.6, $ch - 1.6, 2.2 );
				if ( $v ) {
					$p->font( 'sans6', 5.6 );
					$p->ink( $step >= 4 ? '#ffffff' : $c['ink'] );
					$p->put( $x + $cw / 2, $this->y + $ch / 2 + 2, self::n( $v ), 'C' );
				}
			}
			$this->y += $ch;
		}
		$this->y += 8;
		$p->font( 'sans', 6.8 );
		$p->ink( $c['sub'] );
		$p->put( self::X + $lw, $this->y + 8, __( 'Fewer', 'om-catalog' ) );
		$x = self::X + $lw + 26;
		foreach ( $c['ramp'] as $col ) {
			$p->fill( $col );
			$p->rrect( $x, $this->y + 2, 14, 8, 2 );
			$x += 16;
		}
		$p->put( $x + 4, $this->y + 8, __( 'More visits', 'om-catalog' ) );
		list( $day, $hour ) = $this->busiest();
		/* translators: 1: day, 2: hour range. */
		$p->put( self::W - self::X, $this->y + 8, sprintf( __( 'Busiest: %1$s · %2$s', 'om-catalog' ), $day, $hour ), 'R' );
		$this->y += 20;
	}

	private function pages_part() {
		$rows = array();
		foreach ( $this->d['pages'] as $r ) {
			$rows[] = array(
				array(
					't' => OM_Insights_Report::title( $r['title'], $r['page'] ),
					's' => (string) $r['page'],
				),
				self::n( $r['views'] ),
				self::n( $r['visits'] ),
				self::dur( $r['dur'] ),
				self::n( $r['scroll'] ) . '%',
				self::n( $r['entries'] ),
				self::n( $r['exits'] ),
				$r['entries'] ? self::pct( $r['quick'], $r['entries'], 0 ) : '–',
			);
		}
		$this->section( __( 'Pages and speed', 'om-catalog' ), __( 'How fast pages showed in visitors\' own browsers, the slowest pages, addresses that showed "page not found", and the 20 most viewed pages.', 'om-catalog' ), 150 );
		$this->speed();

		$slow = array();
		foreach ( $this->d['speed']['slow'] as $r ) {
			$slow[] = array(
				array(
					't' => OM_Insights_Report::title( $r['title'], $r['page'] ),
					's' => (string) $r['page'],
				),
				OM_Insights_Report::vital_text( 'lcp', $r['p75'] ),
			);
		}
		$missing = array();
		foreach ( array_slice( $this->d['missing'], 0, 8 ) as $r ) {
			$from = array();
			foreach ( array_slice( $r['from'], 0, 2, true ) as $where => $n ) {
				$from[] = $where . ' (' . self::n( $n ) . ')';
			}
			$missing[] = array(
				array(
					't' => (string) $r['page'],
					's' => implode( ', ', $from ),
				),
				self::n( $r['n'] ),
			);
		}
		$this->columns(
			array(
				$this->part( __( 'Slowest pages', 'om-catalog' ), array( array( __( 'Page', 'om-catalog' ), 0 ), array( __( 'Showed within', 'om-catalog' ), 70, 'R' ) ), $slow, __( 'Not enough measured views yet (10 per page).', 'om-catalog' ) ),
				$this->part( __( 'Missing pages', 'om-catalog' ), array( array( __( 'Address and where from', 'om-catalog' ), 0 ), array( __( 'Times', 'om-catalog' ), 44, 'R' ) ), $missing, __( 'Nobody reached a missing page.', 'om-catalog' ) ),
			)
		);
		if ( $missing ) {
			$this->para( __( 'Missing pages: a redirect to the right page fixes each one (the free Redirection plugin does it). "Typed or bookmarked": an old bookmark or a mistyped address.', 'om-catalog' ), 7.6, $this->c['sub'], 11 );
			$this->y += 10;
		}

		$this->sub( __( 'The 20 most viewed pages', 'om-catalog' ), __( 'Time: how long the page was on screen and in use. Scrolled: how far down people got on average. Entries and exits: visits that started or ended there. Quick: entries that left within 10 seconds.', 'om-catalog' ), self::table_need( $rows ) );
		$this->table(
			array(
				array( __( 'Page', 'om-catalog' ), 182 ),
				array( __( 'Views', 'om-catalog' ), 44, 'R' ),
				array( __( 'Visits', 'om-catalog' ), 44, 'R' ),
				array( __( 'Time', 'om-catalog' ), 48, 'R' ),
				array( __( 'Scrolled', 'om-catalog' ), 50, 'R' ),
				array( __( 'Entries', 'om-catalog' ), 44, 'R' ),
				array( __( 'Exits', 'om-catalog' ), 40, 'R' ),
				array( __( 'Quick', 'om-catalog' ), 52, 'R' ),
			),
			$rows
		);
	}

	/** "Style 80285-01 · Engagement Rings". */
	private static function design_line( $design ) {
		$line = ucwords( str_replace( '-', ' ', (string) $design['line'] ) );
		if ( '' === (string) $design['style'] ) {
			return $line;
		}
		/* translators: 1: style number, 2: product line. */
		return '' !== $line ? sprintf( __( 'Style %1$s · %2$s', 'om-catalog' ), $design['style'], $line ) : sprintf( /* translators: %s: style number. */ __( 'Style %s', 'om-catalog' ), $design['style'] );
	}

	private function designs() {
		$d    = $this->d;
		$list = $d['products'];
		$rows = array();
		foreach ( array_slice( $list, 0, 25 ) as $r ) {
			$design = OM_Insights_Report::design( $r['item'], $r['title'] );
			$rows[] = array(
				array(
					't' => $design['title'],
					's' => self::design_line( $design ),
				),
				(float) $r['price'] > 0 ? OM_Insights_Report::money( $r['price'] ) : '–',
				self::n( $r['views'] ),
				self::n( $r['viewers'] ),
				self::dur( $r['dur'] ),
				self::n( $r['saves'] ),
				self::n( $r['compares'] ),
				self::n( $r['shares'] ),
				self::n( $r['hints'] ),
				self::n( $r['leads'] ),
				self::pct( (int) $r['leads'], (int) $r['viewers'] ),
			);
		}
		$this->section( __( 'Designs', 'om-catalog' ), __( 'The designs looked at most, at their listed price. Views: product pages and quick views. People: different visitors. Comp.: put in the compare table. Leads: inquiries and requests about the design. Hints: "Drop a hint" emails sent with it. Rate: leads for every 100 people.', 'om-catalog' ), self::table_need( $rows ) );
		$this->table(
			array(
				array( __( 'Design', 'om-catalog' ), 136 ),
				array( __( 'Price', 'om-catalog' ), 48, 'R' ),
				array( __( 'Views', 'om-catalog' ), 36, 'R' ),
				array( __( 'People', 'om-catalog' ), 38, 'R' ),
				array( __( 'Time', 'om-catalog' ), 40, 'R' ),
				array( __( 'Saved', 'om-catalog' ), 34, 'R' ),
				array( __( 'Comp.', 'om-catalog' ), 34, 'R' ),
				array( __( 'Shared', 'om-catalog' ), 36, 'R' ),
				array( __( 'Hints', 'om-catalog' ), 30, 'R' ),
				array( __( 'Leads', 'om-catalog' ), 34, 'R' ),
				array( __( 'Rate', 'om-catalog' ), 38, 'R' ),
			),
			$rows,
			array( 'empty' => __( 'No designs were looked at in this period.', 'om-catalog' ) )
		);
		if ( ! $list ) {
			return;
		}

		// Interest by price.
		$views = max( 1, array_sum( wp_list_pluck( $d['bands'], 'views' ) ) );
		$leads = max( 1, array_sum( wp_list_pluck( $d['bands'], 'leads' ) ) );
		$rows  = array();
		foreach ( $d['bands'] as $i => $band ) {
			if ( ! $band['views'] && ! $band['leads'] ) {
				continue;
			}
			$rows[] = array(
				array(
					't' => OM_Insights_Report::band_name( $i ),
					'b' => true,
				),
				self::n( $band['designs'] ),
				array(
					't'   => self::pct( $band['views'], $views, 0 ),
					'bar' => $band['views'] / $views,
				),
				self::n( $band['saves'] ),
				array(
					't'   => self::pct( $band['leads'], $leads, 0 ),
					'bar' => $band['leads'] / $leads,
				),
			);
		}
		if ( $rows ) {
			$this->sub( __( 'Interest by price', 'om-catalog' ), __( 'Where people look and where they get in touch. A price range with a bigger share of the leads than of the views converts well.', 'om-catalog' ), self::table_need( $rows ) );
			$this->table(
				array(
					array( __( 'Listed price', 'om-catalog' ), 140 ),
					array( __( 'Designs seen', 'om-catalog' ), 70, 'R' ),
					array( __( 'Share of views', 'om-catalog' ), 112, 'R' ),
					array( __( 'Saved', 'om-catalog' ), 70, 'R' ),
					array( __( 'Share of leads', 'om-catalog' ), 112, 'R' ),
				),
				$rows
			);
		}

		$move = static function ( $list, $up ) {
			$rows = array();
			foreach ( $list as $r ) {
				$design = OM_Insights_Report::design( $r['item'], $r['title'] );
				$rows[] = array(
					array(
						't' => $design['title'],
						/* translators: 1: views now, 2: views before. */
						's' => sprintf( __( '%1$s views, from %2$s', 'om-catalog' ), self::n( $r['now'] ), self::n( $r['before'] ) ),
					),
					( $up ? '+' : '−' ) . self::n( abs( (int) $r['diff'] ) ),
				);
			}
			return $rows;
		};
		$this->columns(
			array(
				$this->part( __( 'Rising', 'om-catalog' ), array( array( __( 'Design', 'om-catalog' ), 0 ), array( __( 'Views', 'om-catalog' ), 50, 'R' ) ), $move( $d['movers'][0], true ), __( 'No design gained many views.', 'om-catalog' ) ),
				$this->part( __( 'Cooling', 'om-catalog' ), array( array( __( 'Design', 'om-catalog' ), 0 ), array( __( 'Views', 'om-catalog' ), 50, 'R' ) ), $move( $d['movers'][1], false ), __( 'No design lost many views.', 'om-catalog' ) ),
			)
		);

		$quiet = array();
		foreach ( $list as $r ) {
			if ( (int) $r['viewers'] >= 3 && 0 === (int) $r['leads'] && count( $quiet ) < 8 ) {
				$design  = OM_Insights_Report::design( $r['item'], $r['title'] );
				$quiet[] = array(
					array(
						't' => $design['title'],
						's' => self::design_line( $design ),
					),
					self::n( $r['viewers'] ),
					self::n( $r['saves'] ),
				);
			}
		}
		$pairs = array();
		foreach ( $d['together'] as $r ) {
			$pairs[] = array( OM_Insights_Report::design( $r['a'] )['title'] . ' + ' . OM_Insights_Report::design( $r['b'] )['title'], self::n( $r['visits'] ) );
		}
		$this->columns(
			array(
				$this->part( __( 'Viewed in the same visit', 'om-catalog' ), array( array( __( 'Designs', 'om-catalog' ), 0 ), array( __( 'Visits', 'om-catalog' ), 46, 'R' ) ), $pairs, __( 'No two designs looked at together yet.', 'om-catalog' ) ),
				$this->part( __( 'Looked at often, never asked about', 'om-catalog' ), array( array( __( 'Design', 'om-catalog' ), 0 ), array( __( 'People', 'om-catalog' ), 46, 'R' ), array( __( 'Saved', 'om-catalog' ), 46, 'R' ) ), $quiet, __( 'Every popular design had a lead.', 'om-catalog' ) ),
			)
		);

		$this->columns(
			array(
				$this->part( __( 'Product lines', 'om-catalog' ), array( array( __( 'Line', 'om-catalog' ), 0 ), array( __( 'Views', 'om-catalog' ), 46, 'R' ), array( __( 'Visits', 'om-catalog' ), 46, 'R' ) ), self::line_rows( $d['lines'] ) ),
			),
			2
		);

		$titles = array(
			'metal'       => __( 'Metal', 'om-catalog' ),
			'color'       => __( 'Gold colour', 'om-catalog' ),
			'finger_size' => __( 'Ring size', 'om-catalog' ),
			'level'       => __( 'Setting', 'om-catalog' ),
			'quality'     => __( 'Diamond quality', 'om-catalog' ),
		);
		$parts  = array();
		$choice = array( array( __( 'Choice', 'om-catalog' ), 0 ), array( __( 'Times', 'om-catalog' ), 38, 'R' ), array( __( 'Share', 'om-catalog' ), 34, 'R' ) );
		foreach ( $titles as $key => $title ) {
			if ( ! empty( $d['options'][ $key ] ) ) {
				$parts[] = $this->part( $title, $choice, self::choice_rows( $d['options'][ $key ], 6 ) );
			}
		}
		if ( $parts ) {
			$this->sub( __( 'Options people pick', 'om-catalog' ), __( 'Metals, gold colours, ring sizes and diamond qualities chosen on product pages.', 'om-catalog' ), 15 + max( wp_list_pluck( array_slice( $parts, 0, 3 ), 2 ) ) );
			$this->columns( $parts, 3, true );
		}

		$rows = array();
		foreach ( array_slice( $d['pairs'], 0, 8 ) as $r ) {
			$names = array();
			foreach ( explode( ' + ', (string) $r['grp'] ) as $key ) {
				$names[] = OM_Insights_Report::design( $key )['title'];
			}
			$rows[] = array( implode( ' + ', $names ), self::n( $r['visits'] ) );
		}
		if ( $rows ) {
			$this->sub( __( 'Compared side by side', 'om-catalog' ), __( 'Designs people put in the compare table together: they were deciding between them.', 'om-catalog' ), self::table_need( $rows ) );
			$this->table( array( array( __( 'Designs', 'om-catalog' ), $this->cw() - 70 ), array( __( 'Visits', 'om-catalog' ), 70, 'R' ) ), $rows );
		}
	}

	private static function line_rows( $lines ) {
		$rows = array();
		$max  = 0;
		foreach ( $lines as $r ) {
			$max = max( $max, (int) $r['views'] );
		}
		foreach ( $lines as $r ) {
			$rows[] = array(
				array(
					't'   => ucwords( str_replace( '-', ' ', (string) $r['line'] ) ),
					'bar' => $max ? $r['views'] / $max : 0,
				),
				self::n( $r['views'] ),
				self::n( $r['visits'] ),
			);
		}
		return $rows;
	}

	private function searches() {
		$s   = $this->d['search'];
		$top = array();
		$max = 0;
		foreach ( $s['top'] as $r ) {
			$max = max( $max, (int) $r['n'] );
		}
		foreach ( $s['top'] as $r ) {
			$top[] = array(
				array(
					't'   => (string) $r['q'],
					'bar' => $max ? $r['n'] / $max : 0,
				),
				self::n( $r['n'] ),
				self::pct( (int) $r['converted'], (int) $r['visits'], 0 ),
			);
		}
		$zero = array();
		foreach ( $s['zero'] as $r ) {
			$zero[] = array( (string) $r['q'], self::n( $r['n'] ) );
		}
		$lists = array(
			$this->part( __( 'Searched for', 'om-catalog' ), array( array( __( 'Search', 'om-catalog' ), 0 ), array( __( 'Times', 'om-catalog' ), 46, 'R' ), array( __( 'Lead rate', 'om-catalog' ), 58, 'R' ) ), $top, __( 'No searches in this period.', 'om-catalog' ) ),
			$this->part( __( 'Found nothing', 'om-catalog' ), array( array( __( 'Search', 'om-catalog' ), 0 ), array( __( 'Times', 'om-catalog' ), 50, 'R' ) ), $zero, __( 'Every search found something.', 'om-catalog' ) ),
		);
		$this->section( __( 'Searches', 'om-catalog' ), __( 'What people typed into the site\'s search, and what they couldn\'t find: ideas for designs to add or words to use in titles.', 'om-catalog' ), 22 + max( wp_list_pluck( $lists, 2 ) ) );
		$this->columns( $lists );

		$titles = array(
			'shape' => __( 'Diamond shape', 'om-catalog' ),
			'style' => __( 'Style', 'om-catalog' ),
			'metal' => __( 'Metal', 'om-catalog' ),
			'color' => __( 'Gold colour', 'om-catalog' ),
			'upto'  => __( 'Price up to', 'om-catalog' ),
			'line'  => __( 'Product line', 'om-catalog' ),
			'sort'  => __( 'Sorted by', 'om-catalog' ),
			'size'  => __( 'Ring size', 'om-catalog' ),
		);
		$parts  = array();
		$choice = array( array( __( 'Choice', 'om-catalog' ), 0 ), array( __( 'Times', 'om-catalog' ), 38, 'R' ), array( __( 'Share', 'om-catalog' ), 34, 'R' ) );
		foreach ( $titles as $key => $title ) {
			if ( ! empty( $s['filters'][ $key ] ) ) {
				$parts[] = $this->part(
					$title,
					$choice,
					self::choice_rows(
						$s['filters'][ $key ],
						5,
						static function ( $value ) use ( $key ) {
							return OM_Insights_Report::filter_value( $key, $value );
						}
					)
				);
			}
		}
		if ( $parts ) {
			$this->sub( __( 'Catalog filters used', 'om-catalog' ), __( 'The choices people made in the catalog\'s filters and sorting.', 'om-catalog' ), 15 + max( wp_list_pluck( array_slice( $parts, 0, 3 ), 2 ) ) );
			$this->columns( $parts, 3, true );
		}
	}

	private function doing() {
		$d   = $this->d;
		$all = $d['actions'];
		$sum = static function ( $type, $label = null ) use ( $all ) {
			$n = 0;
			$v = 0;
			foreach ( $all[ $type ] ?? array() as $l => $pair ) {
				if ( null === $label || (string) $l === (string) $label ) {
					$n += $pair[0];
					$v += $pair[1];
				}
			}
			return array( $n, $v );
		};
		$areas = array(
			__( 'Shopping', 'om-catalog' )         => array(
				array( __( 'Designs viewed', 'om-catalog' ), $sum( 'view' ) ),
				array( __( 'Saved with the heart', 'om-catalog' ), $sum( 'save' ) ),
				array( __( 'Designs compared', 'om-catalog' ), $sum( 'compare' ) ),
				array( __( 'Shared', 'om-catalog' ), $sum( 'share' ) ),
				array( __( 'Options changed', 'om-catalog' ), $sum( 'option' ) ),
				array( __( 'Searches', 'om-catalog' ), $sum( 'search' ) ),
				array( __( 'Filters changed', 'om-catalog' ), $sum( 'filter' ) ),
			),
			__( 'Getting in touch', 'om-catalog' ) => array(
				array( __( 'Booking window opened', 'om-catalog' ), $sum( 'booking', 'open' ) ),
				array( __( 'Visit requests sent', 'om-catalog' ), $sum( 'booking', 'request' ) ),
				array( __( 'Tapped to call', 'om-catalog' ), $sum( 'call' ) ),
				array( __( 'Opened directions', 'om-catalog' ), $sum( 'directions' ) ),
				array( __( 'Tapped an email address', 'om-catalog' ), $sum( 'email' ) ),
				array( __( 'Button clicks', 'om-catalog' ), $sum( 'cta' ) ),
			),
			__( 'Tools and extras', 'om-catalog' ) => array(
				array( __( 'Assistant opened', 'om-catalog' ), $sum( 'assistant', 'open' ) ),
				array( __( 'Questions to the assistant', 'om-catalog' ), $sum( 'assistant', 'message' ) ),
				array( __( 'Ring builder steps', 'om-catalog' ), $sum( 'builder' ) ),
				array( __( 'Ring designer opened', 'om-catalog' ), $sum( 'designer' ) ),
				array( __( 'Quiz started', 'om-catalog' ), $sum( 'quiz', 'start' ) ),
				array( __( 'Quiz finished', 'om-catalog' ), $sum( 'quiz', 'complete' ) ),
				array( __( '"Drop a hint" opened', 'om-catalog' ), $sum( 'hint', 'open' ) ),
				array( __( 'Hint pages opened', 'om-catalog' ), $sum( 'hint', 'page_view' ) ),
				array( __( 'Diamond help used', 'om-catalog' ), $sum( 'diamond', 'guide' ) ),
			),
		);
		$act   = array( array( __( 'Action', 'om-catalog' ), 0 ), array( __( 'Times', 'om-catalog' ), 52, 'R' ), array( __( 'Visits', 'om-catalog' ), 52, 'R' ) );
		$parts = array();
		foreach ( $areas as $title => $items ) {
			$rows = array();
			foreach ( $items as $it ) {
				if ( $it[1][0] ) {
					$rows[] = array( $it[0], self::n( $it[1][0] ), self::n( $it[1][1] ) );
				}
			}
			$parts[] = $this->part( $title, $act, $rows, __( 'Nothing yet.', 'om-catalog' ) );
		}

		// Calls and directions by where on the site they were tapped, and calls by number.
		$where = array();
		foreach ( array( 'call' => 0, 'directions' => 1 ) as $type => $col ) {
			foreach ( $d[ $type ] as $r ) {
				$k                   = OM_Insights_Report::place_name( $r['meta'] );
				$where[ $k ]         = $where[ $k ] ?? array( 0, 0 );
				$where[ $k ][ $col ] += (int) $r['n'];
			}
		}
		uasort(
			$where,
			static function ( $a, $b ) {
				return ( $b[0] + $b[1] ) <=> ( $a[0] + $a[1] );
			}
		);
		$spots = array();
		foreach ( $where as $k => $n ) {
			$spots[] = array( (string) $k, self::n( $n[0] ), self::n( $n[1] ) );
		}
		$numbers = array();
		foreach ( $d['call'] as $r ) {
			$k             = OM_Insights_Report::phone( (string) $r['label'] );
			$numbers[ $k ] = ( $numbers[ $k ] ?? 0 ) + (int) $r['n'];
		}
		arsort( $numbers );
		$by_number = array();
		foreach ( $numbers as $k => $n ) {
			$by_number[] = array( (string) $k, self::n( $n ) );
		}
		$parts[] = array(
			__( 'Calls and directions, by place', 'om-catalog' ),
			function ( $x, $w ) use ( $spots, $by_number ) {
				$this->table(
					array( array( __( 'Where', 'om-catalog' ), $w - 104 ), array( __( 'Calls', 'om-catalog' ), 52, 'R' ), array( __( 'Directions', 'om-catalog' ), 52, 'R' ) ),
					$spots,
					array(
						'x'       => $x,
						'nobreak' => true,
						'empty'   => __( 'No calls or directions tapped.', 'om-catalog' ),
					)
				);
				if ( $by_number ) {
					$this->sub( __( 'Calls, by number', 'om-catalog' ), '', 0, $x, $w );
					$this->table(
						array( array( __( 'Number', 'om-catalog' ), $w - 52 ), array( __( 'Taps', 'om-catalog' ), 52, 'R' ) ),
						$by_number,
						array(
							'x'       => $x,
							'nobreak' => true,
						)
					);
				}
			},
			self::table_h( $spots ) + ( $by_number ? 22 + self::table_h( $by_number ) : 0 ),
		);
		$this->section( __( 'What visitors did', 'om-catalog' ), __( 'Everything people did on the site, from saving a design to tapping a phone number. Times: how often it happened. Visits: in how many visits.', 'om-catalog' ), 22 + max( $parts[0][2], $parts[1][2] ) );
		$this->columns( $parts, 2 );

		$rows = array();
		foreach ( $d['cta'] as $r ) {
			$rows[] = array( '' !== (string) $r['label'] ? (string) $r['label'] : '–', OM_Insights_Report::place_name( $r['meta'] ), self::n( $r['n'] ), self::n( $r['visits'] ) );
		}
		$this->sub( __( 'Buttons clicked', 'om-catalog' ), __( 'Which buttons get used, and where on the site they are.', 'om-catalog' ), self::table_need( $rows ) );
		$this->table(
			array( array( __( 'Button', 'om-catalog' ), 200 ), array( __( 'Where', 'om-catalog' ), 164 ), array( __( 'Clicks', 'om-catalog' ), 70, 'R' ), array( __( 'Visits', 'om-catalog' ), 70, 'R' ) ),
			$rows,
			array( 'empty' => __( 'No button clicks in this period.', 'om-catalog' ) )
		);

		$sites = array();
		foreach ( $d['outbound'] as $r ) {
			$k           = (string) $r['label'];
			$sites[ $k ] = ( $sites[ $k ] ?? 0 ) + (int) $r['n'];
		}
		arsort( $sites );
		$rows = array();
		foreach ( $sites as $k => $n ) {
			$rows[] = array( (string) $k, self::n( $n ) );
		}
		if ( $rows ) {
			$this->sub( __( 'Links to other sites', 'om-catalog' ), '', self::table_need( $rows ) );
			$this->table( array( array( __( 'Site', 'om-catalog' ), $this->cw() - 70 ), array( __( 'Clicks', 'om-catalog' ), 70, 'R' ) ), $rows );
		}
	}

	private function funnels() {
		$f    = $this->d['funnels'];
		$b    = $this->d['funnels_b'] ?? array();
		$list = array(
			array( __( 'From visit to lead', 'om-catalog' ), 'shop' ),
			array( __( 'Booking window', 'om-catalog' ), 'booking' ),
			array( __( 'Ring builder', 'om-catalog' ), 'builder' ),
			array( __( 'Ring style quiz', 'om-catalog' ), 'quiz' ),
			array( __( 'Drop a hint (counted in hints)', 'om-catalog' ), 'hint' ),
		);
		/* translators: %s: "Period before" or "Last year". */
		$this->section( __( 'Step by step', 'om-catalog' ), sprintf( __( 'How far people get. Each bar is the visits that reached that step, as a share of the first step; the small line says how many carried on from the step before. Grey numbers: %s. The Leads part counts every form sent; here a visit counts once.', 'om-catalog' ), $this->r->compare_name() ), self::funnel_h( $f['shop'] ) );
		foreach ( $list as $one ) {
			$this->funnel( $one[0], $f[ $one[1] ], $b[ $one[1] ] ?? array() );
		}
	}

	/** Height of a funnel's steps (without its heading). */
	private static function funnel_h( $steps ) {
		return (int) ( $steps[0][1] ?? 0 ) ? 8 + 20 * count( $steps ) + 8 * max( 0, count( $steps ) - 1 ) : 22;
	}

	private function funnel( $title, $steps, $before = array() ) {
		$p     = $this->pdf;
		$c     = $this->c;
		$first = max( 1, (int) ( $steps[0][1] ?? 0 ) );
		$base  = max( 1, (int) ( $before[0][1] ?? 0 ) );
		$this->sub( $title, '', self::funnel_h( $steps ) );
		if ( ! (int) ( $steps[0][1] ?? 0 ) ) {
			$this->none();
			return;
		}
		$nw   = 170;
		$bw   = $this->cw() - $nw - 130;
		$prev = 0;
		if ( $before ) {
			$p->font( 'sans6', 6 );
			$p->ink( $c['sub'] );
			$p->put( self::W - self::X - 88, $this->y - 6, self::upper( $this->r->compare_name( true ) ), 'R', 0.4 );
			$p->put( self::W - self::X - 40, $this->y - 6, self::upper( __( 'Now', 'om-catalog' ) ), 'R', 0.4 );
		}
		foreach ( $steps as $i => $s ) {
			$n = (int) $s[1];
			$p->font( 'sans', 8.6 );
			$p->ink( $c['text'] );
			$p->put( self::X, $this->y + 12, $this->fit( ( $i + 1 ) . '.  ' . $s[0], $nw - 8 ) );
			$p->fill( $c['ivory'] );
			$p->rrect( self::X + $nw, $this->y + 4, $bw, 11, 3 );
			$p->fill( $i ? $c['gold'] : $c['gold_deep'] );
			$p->rrect( self::X + $nw, $this->y + 4, max( 3, $bw * min( 1, $n / $first ) ), 11, 3 );
			if ( isset( $before[ $i ][1] ) ) {
				$mx = self::X + $nw + $bw * min( 1, (int) $before[ $i ][1] / $base );
				$p->fill( $c['ink'] );
				$p->Rect( $mx - 0.6, $this->y + 2, 1.2, 15, 'F' );
				$p->font( 'sans', 7.2 );
				$p->ink( $c['muted'] );
				$p->put( self::W - self::X - 88, $this->y + 12.5, self::n( $before[ $i ][1] ), 'R' );
			}
			$p->font( 'sans6', 8.6 );
			$p->ink( $c['ink'] );
			$p->put( self::W - self::X - 40, $this->y + 12.5, self::n( $n ), 'R' );
			$p->font( 'sans', 7.4 );
			$p->ink( $c['sub'] );
			$p->put( self::W - self::X, $this->y + 12.5, $i ? self::pct( $n, $first, 0 ) : '100%', 'R' );
			if ( $i && $prev ) {
				$p->font( 'sans', 6.8 );
				$p->ink( $c['sub'] );
				/* translators: %s: percent. */
				$p->put( self::X + 14, $this->y + 22, sprintf( __( '%s carried on from the step before', 'om-catalog' ), self::pct( $n, $prev, 0 ) ) );
				$this->y += 8;
			}
			$prev     = $n;
			$this->y += 20;
		}
		$this->y += 8;
	}

	private function leads_part() {
		$d     = $this->d;
		$now   = $d['now'];
		$bef   = $d['before'];
		$names = OM_Insights_Report::lead_groups();
		$this->section( __( 'Leads', 'om-catalog' ), __( 'Everyone who got in touch through the site, by how close they are to a sale: visit requests, then inquiries and hints, designs emailed, and newsletter sign-ups. Value asked about: the listed prices of the designs they named.', 'om-catalog' ), 2 * 62 + 10 + 30 );
		$tiles = array(
			array( __( 'Leads', 'om-catalog' ), $now['leads'], $bef['leads'], 'leads' ),
			array( $names['visit'][0], $now['groups']['visit'], $bef['groups']['visit'], 'leads' ),
			array( $names['ask'][0], $now['groups']['ask'], $bef['groups']['ask'], 'leads' ),
			array( $names['emails'][0], $now['groups']['emails'], $bef['groups']['emails'], 'leads' ),
			array( __( 'Lead rate', 'om-catalog' ), $now['conv'], $bef['conv'], 'conv' ),
			array( __( 'Value asked about', 'om-catalog' ), $now['value'], $bef['value'], 'value' ),
		);
		$tw = ( $this->cw() - 2 * 10 ) / 3;
		foreach ( $tiles as $i => $t ) {
			$x  = self::X + ( $i % 3 ) * ( $tw + 10 );
			$ty = $this->y + (int) floor( $i / 3 ) * 72;
			$this->tile( $x, $ty, $tw, 62, $t[0], self::metric( $t[3], $t[1] ), self::change( $t[1], $t[2] ), self::metric( $t[3], $t[2] ), 19 );
		}
		$this->y += 2 * 72 + 8;
		$gh = $this->goals( $this->y );
		$this->y += $gh ? $gh + 12 : 0;

		$bars = $d['bars'];
		/* translators: %s: day, week or month. */
		$note = sprintf( __( 'Leads each %s, split by kind, visit requests at the bottom.', 'om-catalog' ), self::unit_word( $bars['unit'] ) );
		if ( ! empty( $bars['partial'] ) ) {
			/* translators: %s: day, week or month. */
			$note .= ' ' . sprintf( __( 'The last column is this %s so far.', 'om-catalog' ), self::unit_word( $bars['unit'] ) );
		}
		$this->sub( __( 'Leads over time', 'om-catalog' ), $note, 176 );
		$this->y += $this->group_key( $now['groups'], self::X, $this->y + 6 );
		$this->stacked_columns( $bars, self::X, $this->y + 2, $this->cw(), 150 );
		$this->y += 166;

		$total = (int) $now['leads'];
		$kinds = array();
		$max   = 0;
		foreach ( $d['lead_kinds'] as $r ) {
			$max = max( $max, (int) $r['n'] );
		}
		foreach ( $d['lead_kinds'] as $r ) {
			$group   = $names[ OM_Insights_Report::lead_group( $r['k'] ) ];
			$kinds[] = array(
				array(
					't'   => OM_Insights::lead_types()[ $r['k'] ] ?? (string) $r['k'],
					's'   => count( $group[1] ) > 1 ? $group[0] : '',
					'bar' => $max ? $r['n'] / $max : 0,
				),
				self::n( $r['n'] ),
				self::pct( $r['n'], $total, 0 ),
			);
		}
		$began = array();
		foreach ( $d['attr']['by'] as $channel => $row ) {
			$began[] = array( self::source_short( $channel ), self::n( $row['first'] ), self::n( $row['last'] ), self::n( $row['helped'] ) );
		}
		$this->columns(
			array(
				$this->part( __( 'Kinds of lead', 'om-catalog' ), array( array( __( 'Kind', 'om-catalog' ), 0 ), array( __( 'Leads', 'om-catalog' ), 40, 'R' ), array( __( 'Share', 'om-catalog' ), 40, 'R' ) ), $kinds ),
				$this->part( __( 'Where leads began', 'om-catalog' ), array( array( __( 'Source', 'om-catalog' ), 0 ), array( __( 'First visit', 'om-catalog' ), 44, 'R' ), array( __( 'Got in touch', 'om-catalog' ), 48, 'R' ), array( __( 'Helped', 'om-catalog' ), 40, 'R' ) ), $began ),
			)
		);
		$this->para( __( 'First visit: how each lead first found you. Got in touch: where the visit they got in touch on came from. Helped: other visits on the way. Recognised only in the same browser.', 'om-catalog' ), 7.6, $this->c['sub'], 11 );
		$this->y += 10;

		$a     = $d['attr'];
		$tot   = max( 1, (int) $a['total'] );
		$took  = array();
		$words = array(
			'visit' => __( 'On their first visit', 'om-catalog' ),
			'day'   => __( 'Came back the same day', 'om-catalog' ),
			'week'  => __( 'Within a week', 'om-catalog' ),
			'month' => __( 'Within a month', 'om-catalog' ),
			'more'  => __( 'After more than a month', 'om-catalog' ),
		);
		$most  = max( 1, max( $a['days'] ) );
		foreach ( $words as $key => $label ) {
			$took[] = array(
				array(
					't'   => $label,
					'bar' => $a['days'][ $key ] / $most,
				),
				self::n( $a['days'][ $key ] ),
				self::pct( $a['days'][ $key ], $tot, 0 ),
			);
		}
		$visits = array();
		$most   = max( 1, max( $a['visits'] ) );
		foreach ( array( '1' => __( '1 visit', 'om-catalog' ), '2' => __( '2 visits', 'om-catalog' ), '3' => __( '3 or 4 visits', 'om-catalog' ), '5' => __( '5 visits or more', 'om-catalog' ) ) as $key => $label ) {
			$visits[] = array(
				array(
					't'   => $label,
					'bar' => $a['visits'][ $key ] / $most,
				),
				self::n( $a['visits'][ $key ] ),
				self::pct( $a['visits'][ $key ], $tot, 0 ),
			);
		}
		$lead = array( array( '', 0 ), array( __( 'Leads', 'om-catalog' ), 40, 'R' ), array( __( 'Share', 'om-catalog' ), 40, 'R' ) );
		$this->columns(
			array(
				$this->part( __( 'How long they took', 'om-catalog' ), $lead, $took ),
				$this->part( __( 'Visits before getting in touch', 'om-catalog' ), $lead, $visits ),
			)
		);
		if ( $a['back'] ) {
			/* translators: 1: typical days, 2: typical visits. */
			$this->para( sprintf( __( 'Leads who came back first took %1$s days and %2$s visits, typically.', 'om-catalog' ), self::n( max( 1, round( $a['dmed'] ) ) ), self::n( $a['vmed'] ) ), 7.6, $this->c['sub'], 11 );
			$this->y += 6;
		}
	}

	private function by_day() {
		$t     = $this->d['table'];
		$now   = $this->d['now'];
		$names = array(
			'hour'  => __( 'Hour by hour', 'om-catalog' ),
			'day'   => __( 'Day by day', 'om-catalog' ),
			'week'  => __( 'Week by week', 'om-catalog' ),
			'month' => __( 'Month by month', 'om-catalog' ),
		);
		$keys  = array(
			'visitors'  => __( 'Visitors', 'om-catalog' ),
			'visits'    => __( 'Visits', 'om-catalog' ),
			'pageviews' => __( 'Page views', 'om-catalog' ),
			'designs'   => __( 'Designs viewed', 'om-catalog' ),
			'saves'     => __( 'Saved', 'om-catalog' ),
			'leads'     => __( 'Leads', 'om-catalog' ),
			'conv'      => __( 'Lead rate', 'om-catalog' ),
		);
		$rows  = array();
		$n     = min( count( $t['labels'] ), (int) $t['cut'] );
		for ( $i = 0; $i < $n; $i++ ) {
			$row = array( (string) $t['tips'][ $i ] );
			foreach ( array_keys( $keys ) as $key ) {
				$row[] = self::metric( $key, $t['m'][ $key ]['c'][ $i ] );
			}
			$rows[] = $row;
		}
		$total = array(
			array(
				't' => __( 'Whole period', 'om-catalog' ),
				'b' => true,
			),
		);
		foreach ( array_keys( $keys ) as $key ) {
			$total[] = self::metric( $key, $now[ $key ] );
		}
		$rows[] = $total;
		$heads  = array( array( __( 'Period', 'om-catalog' ), 112 ) );
		foreach ( $keys as $label ) {
			$heads[] = array( $label, 56, 'R' );
		}
		$this->section( $names[ $t['unit'] ] ?? $names['day'], __( 'The headline numbers for each part of the period. The last row is the whole period (people who came on several days count once there).', 'om-catalog' ), self::table_need( $rows ) );
		$this->table( $heads, $rows, array( 'total' => true ) );
	}

	private function about() {
		$c     = $this->c;
		$p     = $this->pdf;
		$items = array(
			array( __( 'Leads', 'om-catalog' ), __( 'Visit requests, inquiries, "Drop a hint" emails, saved lists, ring designs and quiz matches emailed, and newsletter sign-ups sent from the site, in four groups by how close they are to a sale. Phone calls happen off the site, so taps on a number are counted separately (contact taps).', 'om-catalog' ) ),
			array( __( 'Lead rate', 'om-catalog' ), __( 'The share of visits that ended in at least one lead.', 'om-catalog' ) ),
			array( __( 'Value asked about', 'om-catalog' ), __( 'The listed prices of the designs named in leads (inquiries, visit requests, designs emailed). A guide to the interest, not a sale.', 'om-catalog' ) ),
			array( __( 'First visit', 'om-catalog' ), __( 'Where a lead first found you: the source of the first visit this site knows from the same browser. Many people visit several times before getting in touch.', 'om-catalog' ) ),
			array( __( 'Visitors', 'om-catalog' ), __( 'Different people: each browser counts once, even over several visits.', 'om-catalog' ) ),
			array( __( 'Visits', 'om-catalog' ), __( 'A visit ends after 30 minutes without any activity.', 'om-catalog' ) ),
			array( __( 'Engaged visits', 'om-catalog' ), __( 'Visits that did more than glance: more than one page, more than 10 seconds, a design opened or a lead.', 'om-catalog' ) ),
			array( __( 'Contact taps', 'om-catalog' ), __( 'Taps on the phone number, the email address or directions.', 'om-catalog' ) ),
			array( __( 'Designs viewed', 'om-catalog' ), __( 'Product pages and quick views opened.', 'om-catalog' ) ),
			array( __( 'Saved (hearts)', 'om-catalog' ), __( 'Designs added to a visitor\'s saved list.', 'om-catalog' ) ),
			array( __( 'Page speed', 'om-catalog' ), __( 'Measured in visitors\' own browsers (Google\'s Core Web Vitals). Each number is the one 3 in 4 page views beat.', 'om-catalog' ) ),
			array( __( 'Compared with', 'om-catalog' ), 'year' === $this->r->cmp ? __( 'The same dates last year. Changes are shown against them.', 'om-catalog' ) : __( 'The same number of days just before this period. Changes are shown against it.', 'om-catalog' ) ),
			array( __( 'Where the numbers come from', 'om-catalog' ), __( 'The website records them itself, in its own database: nothing is shared with other companies. Logged-in staff and bots are left out, and so are browsers that ask not to be tracked when that setting is on.', 'om-catalog' ) ),
		);
		$lw   = 150;
		$need = 0;
		foreach ( $items as $it ) {
			$p->font( 'sans', 8.6 );
			$need += 12.6 * count( $this->wrap( $it[1], $this->cw() - $lw ) ) + 6;
		}
		$this->section( __( 'About these numbers', 'om-catalog' ), '', $need );
		foreach ( $items as $it ) {
			$top = $this->y;
			$this->para( $it[0], 8.6, $c['ink'], 12.6, self::X, $lw - 14, 'sans7' );
			$left    = $this->y;
			$this->y = $top;
			$this->para( $it[1], 8.6, $c['text'], 12.6, self::X + $lw, $this->cw() - $lw );
			$this->y = max( $this->y, $left ) + 6;
		}
		$filters = $this->filter_words();
		if ( $filters ) {
			$this->y += 4;
			/* translators: %s: filters. */
			$this->para( sprintf( __( 'This report counts only visits with %s.', 'om-catalog' ), implode( ', ', $filters ) ), 8.6, $c['gold_ink'], 12.6 );
		}
		if ( ! $this->names ) {
			$this->y += 4;
			$this->para( __( 'The names of people who got in touch are left out of this copy.', 'om-catalog' ), 8.6, $c['sub'], 12.6 );
		}
	}
}

/** Colour helpers usable before tFPDF is loaded. */
class OM_Insights_Pdf_Doc_Colors {
	public static function rgb( $hex ) {
		$hex = ltrim( (string) $hex, '#' );
		return array( hexdec( substr( $hex, 0, 2 ) ), hexdec( substr( $hex, 2, 2 ) ), hexdec( substr( $hex, 4, 2 ) ) );
	}
}
