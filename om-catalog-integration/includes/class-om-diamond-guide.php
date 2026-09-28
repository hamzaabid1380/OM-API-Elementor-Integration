<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * "Help me choose": three questions (size or budget, what matters most,
 * lab or natural) and the three best real diamonds for the answers, each
 * with a plain-words reason. Used as a step of the ring builder.
 *
 * Budget mode needs visible diamond prices; otherwise the guide asks for a
 * size instead and shows "Price on request".
 */
class OM_Diamond_Guide {

	const PARAMS = array( 'g_ct', 'g_budget', 'g_pri', 'g_origin', 'g_shape' );

	/**
	 * What each priority looks for, from strict to relaxed. Each attempt is
	 * one API search; the first that finds a stone wins.
	 */
	private static function profiles() {
		return array(
			'value'   => array(
				array( 'color' => 'H,I,J', 'clarity' => 'VS2,SI1', 'cut' => 'Ideal,Excellent,Very Good' ),
				array( 'color' => 'G,H,I,J,K', 'clarity' => 'VS1,VS2,SI1,SI2' ),
				array(),
			),
			'balance' => array(
				array( 'color' => 'F,G,H', 'clarity' => 'VS1,VS2', 'cut' => 'Ideal,Excellent' ),
				array( 'color' => 'E,F,G,H,I', 'clarity' => 'VVS2,VS1,VS2', 'cut' => 'Ideal,Excellent,Very Good' ),
				array( 'color' => 'D,E,F,G,H,I,J', 'clarity' => 'VVS1,VVS2,VS1,VS2,SI1' ),
			),
			'sparkle' => array(
				array( 'color' => 'D,E,F', 'clarity' => 'FL,IF,VVS1,VVS2', 'cut' => 'Ideal,Excellent' ),
				array( 'color' => 'D,E,F,G', 'clarity' => 'FL,IF,VVS1,VVS2,VS1', 'cut' => 'Ideal,Excellent' ),
				array( 'color' => 'D,E,F,G,H', 'clarity' => 'FL,IF,VVS1,VVS2,VS1,VS2' ),
			),
		);
	}

	/** Are diamond prices shown on this site? (Budget mode needs them.) */
	public static function prices_visible() {
		return null !== om_diamond_retail( 1 );
	}

	/**
	 * The three picks: [ key, diamond ] — the chosen priority first.
	 *
	 * @param array $q shape, origin (lab|natural|''), pri, and either ct
	 *                 (size mode, with ct_min/ct_max limits) or budget.
	 */
	public static function picks( $q ) {
		$order = array_values( array_unique( array_merge( array( $q['pri'] ), array( 'balance', 'value', 'sparkle' ) ) ) );
		$base  = array_filter(
			array(
				'shape'  => $q['shape'],
				'origin' => $q['origin'],
				// A few, so a stone already picked for another priority can be skipped.
				'limit'  => 3,
			),
			'strlen'
		);
		if ( isset( $q['budget'] ) ) {
			// Budget: the biggest stone within it (the API filters on its own,
			// pre-markup price).
			$mult            = om_diamond_markup_multiplier();
			$base['cost']    = '0-' . (int) floor( $q['budget'] / max( 0.01, $mult ) );
			$base['sort_by'] = 'carat';
			$base['order']   = 'desc';
			// A chosen setting still limits the size.
			if ( isset( $q['ct_min'], $q['ct_max'] ) ) {
				$base['carat'] = round( (float) $q['ct_min'], 2 ) . '-' . round( (float) $q['ct_max'], 2 );
			}
		} else {
			// Size: the best price near that carat.
			$lo              = max( (float) ( $q['ct_min'] ?? 0.1 ), $q['ct'] * 0.95 );
			$hi              = min( (float) ( $q['ct_max'] ?? 30 ), $q['ct'] * 1.1 );
			$base['carat']   = round( $lo, 2 ) . '-' . round( max( $hi, $lo + 0.02 ), 2 );
			$base['sort_by'] = 'price';
			$base['order']   = 'asc';
		}

		$profiles = self::profiles();
		$out      = array();
		$seen     = array();
		foreach ( $order as $key ) {
			foreach ( $profiles[ $key ] as $attempt ) {
				$data = OM_API_Client::search_diamonds( array_filter( $attempt + $base, 'strlen' ) );
				if ( is_wp_error( $data ) ) {
					return $data;
				}
				$found = null;
				foreach ( (array) ( $data['diamonds'] ?? array() ) as $d ) {
					$lot = (string) ( $d['lot_number'] ?? '' );
					if ( '' !== $lot && ! isset( $seen[ $lot ] ) ) {
						$found = $d;
						break;
					}
				}
				if ( $found ) {
					$seen[ (string) $found['lot_number'] ] = true;
					$out[] = array( $key, $found );
					break;
				}
			}
		}
		return $out;
	}

	/** Plain words for a stone's colour, clarity and cut. */
	public static function reason( $d ) {
		$color   = strtoupper( (string) ( $d['color'] ?? '' ) );
		$clarity = strtoupper( (string) ( $d['clarity'] ?? '' ) );
		$cut     = strtolower( (string) ( $d['cut'] ?? '' ) );
		$parts   = array();
		if ( in_array( $color, array( 'D', 'E', 'F' ), true ) ) {
			/* translators: %s: colour grade. */
			$parts[] = sprintf( __( 'Colourless (%s) — the whitest there is.', 'om-catalog' ), $color );
		} elseif ( in_array( $color, array( 'G', 'H' ), true ) ) {
			/* translators: %s: colour grade. */
			$parts[] = sprintf( __( 'Near-colourless (%s) — looks white in a ring.', 'om-catalog' ), $color );
		} elseif ( in_array( $color, array( 'I', 'J' ), true ) ) {
			/* translators: %s: colour grade. */
			$parts[] = sprintf( __( 'A faint warmth (%s) that is hard to see once set — great value.', 'om-catalog' ), $color );
		} elseif ( '' !== $color ) {
			/* translators: %s: colour grade. */
			$parts[] = sprintf( __( 'A warm tone (%s) — lovely in yellow or rose gold.', 'om-catalog' ), $color );
		}
		if ( in_array( $clarity, array( 'FL', 'IF' ), true ) ) {
			$parts[] = __( 'Flawless inside.', 'om-catalog' );
		} elseif ( in_array( $clarity, array( 'VVS1', 'VVS2' ), true ) ) {
			/* translators: %s: clarity grade. */
			$parts[] = sprintf( __( '%s: clean even under a jeweller’s loupe.', 'om-catalog' ), $clarity );
		} elseif ( in_array( $clarity, array( 'VS1', 'VS2' ), true ) ) {
			/* translators: %s: clarity grade. */
			$parts[] = sprintf( __( '%s: eye-clean, no marks you can see.', 'om-catalog' ), $clarity );
		} elseif ( 'SI1' === $clarity ) {
			$parts[] = __( 'SI1: usually eye-clean, at a gentler price.', 'om-catalog' );
		} elseif ( '' !== $clarity ) {
			/* translators: %s: clarity grade. */
			$parts[] = sprintf( __( '%s: small marks may show; the most affordable.', 'om-catalog' ), $clarity );
		}
		if ( in_array( $cut, array( 'ideal', 'excellent' ), true ) ) {
			$parts[] = __( 'Top cut grade for the most sparkle.', 'om-catalog' );
		}
		return implode( ' ', $parts );
	}

	/** Tag for each priority's pick. */
	public static function tags( $budget ) {
		return array(
			'value'   => $budget ? __( 'Biggest look', 'om-catalog' ) : __( 'Best value', 'om-catalog' ),
			'balance' => __( 'Best balance', 'om-catalog' ),
			'sparkle' => __( 'Top sparkle', 'om-catalog' ),
		);
	}
}
