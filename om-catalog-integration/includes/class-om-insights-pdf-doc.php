<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * tFPDF with what the Insights report draws: the plugin's own fonts (read
 * each time, so tFPDF never writes font caches into the plugin folder),
 * colours by hex, letter spacing, dashes, rounded boxes and filled shapes,
 * and bookmarks for the viewer's side panel. Units are points on a US
 * Letter page; y grows downwards as in tFPDF.
 */
class OM_Insights_Pdf_Doc extends tFPDF {

	/** @var callable|null Draws the running header; gets the page number. */
	public $head = null;

	/** @var callable|null Draws the running footer; gets the page number. */
	public $foot = null;

	public function Header() {
		if ( $this->head ) {
			call_user_func( $this->head, $this->PageNo() );
		}
	}

	public function Footer() {
		if ( $this->foot ) {
			call_user_func( $this->foot, $this->PageNo() );
		}
	}

	/**
	 * A TrueType font as a family of its own (one weight each). Same as
	 * tFPDF's AddFont( ..., true ) without its metric caches, whose paths
	 * would point at this server's folders and be written next to the fonts.
	 */
	public function add_ttf( $family, $file ) {
		$family = strtolower( $family );
		if ( isset( $this->fonts[ $family ] ) ) {
			return;
		}
		$ttf = new TTFontFile();
		$ttf->getMetrics( $file );
		$this->fonts[ $family ] = array(
			'i'           => count( $this->fonts ) + 1,
			'type'        => 'TTF',
			'name'        => preg_replace( '/[ ()]/', '', $ttf->fullName ),
			'desc'        => array(
				'Ascent'       => round( $ttf->ascent ),
				'Descent'      => round( $ttf->descent ),
				'CapHeight'    => round( $ttf->capHeight ),
				'Flags'        => $ttf->flags,
				'FontBBox'     => '[' . round( $ttf->bbox[0] ) . ' ' . round( $ttf->bbox[1] ) . ' ' . round( $ttf->bbox[2] ) . ' ' . round( $ttf->bbox[3] ) . ']',
				'ItalicAngle'  => $ttf->italicAngle,
				'StemV'        => round( $ttf->stemV ),
				'MissingWidth' => round( $ttf->defaultWidth ),
			),
			'up'          => round( $ttf->underlinePosition ),
			'ut'          => round( $ttf->underlineThickness ),
			'cw'          => $ttf->charWidths,
			'ttffile'     => $file,
			'fontkey'     => $family,
			'subset'      => empty( $this->AliasNbPages ) ? range( 0, 32 ) : range( 0, 57 ),
			// A folder that never exists, so the width cache is neither read nor written.
			'unifilename' => dirname( $file ) . '/no-cache/' . $family,
		);
		$this->FontFiles[ $family ]           = array(
			'length1' => filesize( $file ),
			'type'    => 'TTF',
			'ttffile' => $file,
		);
		$this->FontFiles[ basename( $file ) ] = array( 'type' => 'TTF' );
		$this->fontpath                       = dirname( $file ) . '/no-cache/';
	}

	public function font( $family, $size ) {
		$this->SetFont( $family, '', $size );
	}

	public static function rgb( $hex ) {
		$hex = ltrim( (string) $hex, '#' );
		return array( hexdec( substr( $hex, 0, 2 ) ), hexdec( substr( $hex, 2, 2 ) ), hexdec( substr( $hex, 4, 2 ) ) );
	}

	public function ink( $hex ) {
		list( $r, $g, $b ) = self::rgb( $hex );
		$this->SetTextColor( $r, $g, $b );
	}

	public function fill( $hex ) {
		list( $r, $g, $b ) = self::rgb( $hex );
		$this->SetFillColor( $r, $g, $b );
	}

	public function stroke( $hex, $width = null ) {
		list( $r, $g, $b ) = self::rgb( $hex );
		$this->SetDrawColor( $r, $g, $b );
		if ( null !== $width ) {
			$this->SetLineWidth( $width );
		}
	}

	/** Letter spacing for what is written next (0 to stop). */
	public function tracking( $points ) {
		$this->_out( sprintf( '%.3F Tc', $points * $this->k ) );
	}

	/** Width of a string with letter spacing. */
	public function width( $text, $tracking = 0 ) {
		$text = (string) $text;
		$n    = function_exists( 'mb_strlen' ) ? mb_strlen( $text, 'UTF-8' ) : strlen( $text );
		return $this->GetStringWidth( $text ) + $n * $tracking;
	}

	/** Write at a baseline: align L, R (x is the right edge) or C (x is the centre). */
	public function put( $x, $y, $text, $align = 'L', $tracking = 0 ) {
		$text = (string) $text;
		if ( '' === $text ) {
			return;
		}
		$w = $this->width( $text, $tracking );
		if ( 'R' === $align ) {
			$x -= $w;
		} elseif ( 'C' === $align ) {
			$x -= $w / 2;
		}
		if ( $tracking ) {
			$this->tracking( $tracking );
		}
		$this->Text( $x, $y, $text );
		if ( $tracking ) {
			$this->tracking( 0 );
		}
	}

	/** Dashed lines from now on ($on = 0 for solid). */
	public function dash( $on = 0, $off = 0 ) {
		$this->_out( $on ? sprintf( '[%.2F %.2F] 0 d', $on * $this->k, $off * $this->k ) : '[] 0 d' );
	}

	private function pt( $x, $y ) {
		return sprintf( '%.2F %.2F', $x * $this->k, ( $this->h - $y ) * $this->k );
	}

	/** Straight segments through points; $op: S stroke, f fill, B both; $close joins the ends. */
	public function poly( $points, $op = 'S', $close = false ) {
		if ( count( $points ) < 2 ) {
			return;
		}
		$s = $this->pt( $points[0][0], $points[0][1] ) . ' m';
		for ( $i = 1, $n = count( $points ); $i < $n; $i++ ) {
			$s .= ' ' . $this->pt( $points[ $i ][0], $points[ $i ][1] ) . ' l';
		}
		$this->_out( $s . ( $close ? ' h' : '' ) . ' ' . $op );
	}

	/**
	 * A smooth line through the points that never overshoots them (monotone
	 * cubic). With $base, the shape is closed down to that y and filled.
	 */
	public function smooth( $points, $op = 'S', $base = null ) {
		$n = count( $points );
		if ( $n < 2 ) {
			return;
		}
		$s = array();
		$t = array();
		for ( $i = 0; $i < $n - 1; $i++ ) {
			$dx    = $points[ $i + 1 ][0] - $points[ $i ][0];
			$s[ $i ] = $dx ? ( $points[ $i + 1 ][1] - $points[ $i ][1] ) / $dx : 0;
		}
		$t[0]       = $s[0];
		$t[ $n - 1 ] = $s[ $n - 2 ];
		for ( $i = 1; $i < $n - 1; $i++ ) {
			$t[ $i ] = $s[ $i - 1 ] * $s[ $i ] <= 0 ? 0 : 2 / ( 1 / $s[ $i - 1 ] + 1 / $s[ $i ] );
		}
		$out = $this->pt( $points[0][0], $points[0][1] ) . ' m';
		for ( $i = 0; $i < $n - 1; $i++ ) {
			$d    = ( $points[ $i + 1 ][0] - $points[ $i ][0] ) / 3;
			$out .= ' ' . $this->pt( $points[ $i ][0] + $d, $points[ $i ][1] + $d * $t[ $i ] )
				. ' ' . $this->pt( $points[ $i + 1 ][0] - $d, $points[ $i + 1 ][1] - $d * $t[ $i + 1 ] )
				. ' ' . $this->pt( $points[ $i + 1 ][0], $points[ $i + 1 ][1] ) . ' c';
		}
		if ( null !== $base ) {
			$out .= ' ' . $this->pt( $points[ $n - 1 ][0], $base ) . ' l ' . $this->pt( $points[0][0], $base ) . ' l h';
		}
		$this->_out( $out . ' ' . $op );
	}

	/** A box with rounded corners; $op as in Rect (F, D, DF). */
	public function rrect( $x, $y, $w, $h, $r, $op = 'F' ) {
		$r   = max( 0, min( $r, $w / 2, $h / 2 ) );
		$k   = 0.5523 * $r;
		$ops = array( 'F' => 'f', 'D' => 'S', 'DF' => 'B', 'FD' => 'B' );
		$s   = $this->pt( $x + $r, $y ) . ' m'
			. ' ' . $this->pt( $x + $w - $r, $y ) . ' l'
			. ' ' . $this->pt( $x + $w - $r + $k, $y ) . ' ' . $this->pt( $x + $w, $y + $r - $k ) . ' ' . $this->pt( $x + $w, $y + $r ) . ' c'
			. ' ' . $this->pt( $x + $w, $y + $h - $r ) . ' l'
			. ' ' . $this->pt( $x + $w, $y + $h - $r + $k ) . ' ' . $this->pt( $x + $w - $r + $k, $y + $h ) . ' ' . $this->pt( $x + $w - $r, $y + $h ) . ' c'
			. ' ' . $this->pt( $x + $r, $y + $h ) . ' l'
			. ' ' . $this->pt( $x + $r - $k, $y + $h ) . ' ' . $this->pt( $x, $y + $h - $r + $k ) . ' ' . $this->pt( $x, $y + $h - $r ) . ' c'
			. ' ' . $this->pt( $x, $y + $r ) . ' l'
			. ' ' . $this->pt( $x, $y + $r - $k ) . ' ' . $this->pt( $x + $r - $k, $y ) . ' ' . $this->pt( $x + $r, $y ) . ' c h';
		$this->_out( $s . ' ' . ( $ops[ $op ] ?? 'f' ) );
	}

	public function circle( $x, $y, $r, $op = 'F' ) {
		$this->rrect( $x - $r, $y - $r, 2 * $r, 2 * $r, $r, $op );
	}

	/** Round line ends and joins (for chart lines and the logo). */
	public function round_lines( $on = true ) {
		$this->_out( $on ? '1 J 1 j' : '0 J 0 j' );
	}

	/** @var array Bookmarks for the viewer's side panel: [ t: title, p: page, y: height in PDF units ]. */
	private $marks = array();

	/** @var int The object holding the bookmarks. */
	private $marks_root = 0;

	/** A bookmark (in the viewer's side panel) to this page, at $y. */
	public function bookmark( $title, $y ) {
		$this->marks[] = array(
			't' => (string) $title,
			'p' => $this->PageNo(),
			'y' => ( $this->h - $y ) * $this->k,
		);
	}

	protected function _putresources() {
		parent::_putresources();
		$count = count( $this->marks );
		if ( ! $count ) {
			return;
		}
		$first = $this->n + 1;
		foreach ( $this->marks as $i => $m ) {
			$this->_newobj();
			$this->_put( '<</Title ' . $this->_textstring( $m['t'] ) );
			$this->_put( '/Parent ' . ( $first + $count ) . ' 0 R' );
			if ( $i > 0 ) {
				$this->_put( '/Prev ' . ( $first + $i - 1 ) . ' 0 R' );
			}
			if ( $i < $count - 1 ) {
				$this->_put( '/Next ' . ( $first + $i + 1 ) . ' 0 R' );
			}
			$this->_put( sprintf( '/Dest [%d 0 R /XYZ 0 %.2F null]>>', $this->PageInfo[ $m['p'] ]['n'], $m['y'] ) );
			$this->_put( 'endobj' );
		}
		$this->_newobj();
		$this->marks_root = $this->n;
		$this->_put( '<</Type /Outlines /First ' . $first . ' 0 R /Last ' . ( $first + $count - 1 ) . ' 0 R /Count ' . $count . '>>' );
		$this->_put( 'endobj' );
	}

	protected function _putcatalog() {
		parent::_putcatalog();
		if ( $this->marks_root ) {
			$this->_put( '/Outlines ' . $this->marks_root . ' 0 R' );
			$this->_put( '/PageMode /UseOutlines' );
		}
		// Viewers show the report's title rather than its file name.
		$this->_put( '/ViewerPreferences <</DisplayDocTitle true>>' );
	}
}
