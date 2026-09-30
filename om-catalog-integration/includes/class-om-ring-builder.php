<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Ring builder: [om_ring_builder] shortcode / "OM Ring Builder" widget.
 *
 * A guided flow in three steps — setting, diamond, review — started from
 * either end. All state is in the page URL (rb_setting=line:style,
 * rb_metal, rb_color, rb_diamond=lot, rb_first=diamond), so a design can be
 * bookmarked or sent to someone, the page can be cached, and nothing is
 * stored per visitor. Choose the builder page under Settings > OM Catalog;
 * product pages of the builder's product lines then show a "Select this
 * setting" button and the diamond search a "Select this diamond" button
 * that lead back here.
 */
class OM_Ring_Builder {

	/** rb_diamond value for "continue without a diamond". */
	const LATER = 'later';

	const PARAMS = array( 'rb_setting', 'rb_metal', 'rb_color', 'rb_diamond', 'rb_step', 'rb_first', 'rb_guide', 'rb', 'g_ct', 'g_budget', 'g_pri', 'g_origin', 'g_shape' );

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_shortcode( 'om_ring_builder', array( $this, 'shortcode' ) );
		add_action( 'wp_ajax_om_builder_email', array( $this, 'handle_email' ) );
		add_action( 'wp_ajax_nopriv_om_builder_email', array( $this, 'handle_email' ) );
		add_action( 'om_design_followup', array( $this, 'send_followup' ), 10, 4 );
	}

	public function shortcode( $atts ) {
		return $this->render( (array) $atts );
	}

	/** Every setting of the builder, with its default. */
	public static function defaults() {
		return array(
			'per_page'        => 12,
			'diamond_origin'  => '',
			'heading'         => '',
			// The "Choose a setting" grid looks like the catalog widget on
			// this page: '' = find one automatically, 'none' = own look.
			'look_page'       => '',

			// Start screen.
			'intro_eyebrow'   => __( 'Ring builder', 'om-catalog' ),
			'intro_title'     => __( 'Design your engagement ring', 'om-catalog' ),
			'intro_text'      => __( 'Three short steps. We only show diamonds that fit the setting you choose, and you can change anything before you send it to us.', 'om-catalog' ),
			'start_setting'   => 'yes',
			'setting_tag'     => __( 'Most popular', 'om-catalog' ),
			'setting_title'   => __( 'Start with a setting', 'om-catalog' ),
			'setting_text'    => __( 'Browse the ring designs you love. Next, we show only the diamonds that fit it.', 'om-catalog' ),
			'setting_cta'     => __( 'Browse settings', 'om-catalog' ),
			'start_diamond'   => 'yes',
			'diamond_tag'     => __( 'For stone lovers', 'om-catalog' ),
			'diamond_title'   => __( 'Start with a diamond', 'om-catalog' ),
			'diamond_text'    => __( 'Choose the centre stone by shape, carat, colour and clarity, then find a setting made for it.', 'om-catalog' ),
			'diamond_cta'     => __( 'Browse diamonds', 'om-catalog' ),
			'start_guide'     => 'yes',
			'guide_tag'       => __( 'Not sure?', 'om-catalog' ),
			'guide_title'     => __( 'Help me choose', 'om-catalog' ),
			'guide_text'      => __( 'Three quick questions — size or budget, what matters most, lab or natural — and we suggest the best stones for you.', 'om-catalog' ),
			'guide_cta'       => __( 'Start (1 minute)', 'om-catalog' ),
			'continue'        => 'yes',
			// "|"-separated short promises under the start options.
			'promises'        => __( 'Certified diamonds|Nothing to pay online — we confirm everything with you|Your design is saved in the link', 'om-catalog' ),

			// Steps and guidance ({setting} / {diamond} = what was chosen).
			'step_setting'    => __( 'Setting', 'om-catalog' ),
			'step_diamond'    => __( 'Diamond', 'om-catalog' ),
			'step_review'     => __( 'Review', 'om-catalog' ),
			'title_setting'   => __( 'Choose your setting', 'om-catalog' ),
			'title_diamond'   => __( 'Choose your diamond', 'om-catalog' ),
			'title_review'    => __( 'Your ring', 'om-catalog' ),
			'guide_setting'   => __( "Pick the design you love. Next, you'll choose its diamond — we only show stones that fit.", 'om-catalog' ),
			'guide_setting2'  => __( 'Only settings made for your {diamond}. We match the head size to it.', 'om-catalog' ),
			'guide_diamond'   => __( 'Every stone here fits your {setting}.', 'om-catalog' ),
			'guide_diamond1'  => __( 'Choose the centre stone first. Next, we show only settings made for it.', 'om-catalog' ),
			'guide_review'    => __( 'Check the details, choose the metal and your ring size, then send it to us.', 'om-catalog' ),
			'tip_setting'     => __( 'Not sure where to start? Filter by shape first — it decides the diamond.', 'om-catalog' ),
			'choose_text'     => __( 'Choose this setting', 'om-catalog' ),
			// Which diamonds fit a setting: strict (its carat range), loose
			// (a little either side) or off (shape only).
			'fit_rule'        => 'strict',
			// "True size" buttons on diamonds and in the review.
			'true_size'       => 'yes',
			'diamond_compare' => 'yes',
			// "Continue without a diamond": finish with the setting alone
			// (the stone chosen with the shop, or the customer's own).
			'skip_diamond'    => 'yes',
			'skip_text'       => __( 'Continue without a diamond — choose it with us, or use your own stone', 'om-catalog' ),

			// "Help me choose": auto = by budget when diamond prices show,
			// by size while they are hidden; budget; size; off.
			'guide'           => 'auto',
			'guide_eyebrow'   => __( 'Help me choose · 1 minute', 'om-catalog' ),
			'guide_heading'   => __( 'The right diamond for you', 'om-catalog' ),
			'guide_heading_b' => __( 'The best diamond for your budget', 'om-catalog' ),
			'guide_intro'     => __( 'Answer three questions. We search every stone that fits and explain the choice in plain words.', 'om-catalog' ),
			'guide_link'      => __( 'Not sure which diamond? Help me choose', 'om-catalog' ),
			'budget_min'      => 1000,
			'budget_max'      => 20000,
			// Send the answers with the visitor's request / question.
			'guide_send'      => 'yes',

			// "Your ring" bar.
			'bar'             => 'yes',
			// The bar on the review step too (the summary is already there).
			'bar_review'      => 'no',
			// The AI assistant's button inside the bar (and the review)
			// instead of floating over the page.
			'chat_in_bar'     => 'yes',
			'ask_text'        => __( 'Questions? Ask us', 'om-catalog' ),
			// Empty = a short inquiry form in a pop-up.
			'ask_url'         => '',

			// Review.
			'request_heading' => __( 'Request this ring', 'om-catalog' ),
			'request_intro'   => __( 'Send us your design and we will confirm availability, ring size and timing.', 'om-catalog' ),
			'request_button'  => __( 'Send request', 'om-catalog' ),
			// The subject requests arrive with; the "What is it about?"
			// choices are left out unless switched on.
			'request_subject' => __( 'Ring request', 'om-catalog' ),
			'review_topics'   => 'no',
			// A reassuring line under the send button ('' = none).
			'reassure'        => __( 'Nothing to pay now · We reply within one business day · No obligation', 'om-catalog' ),
			// The stone and metal named on the photo.
			'hero_tag'        => 'yes',
			// After sending: a thank-you panel in place of the form.
			'done_title'      => __( 'Thank you — your ring request is with us', 'om-catalog' ),
			'done_text'       => __( 'We’ll check the setting and the diamond and get back to you shortly. A copy of your design is below.', 'om-catalog' ),
			'done_steps'      => __( 'We check availability of the setting and the diamond|We contact you to confirm the price, ring size and timing|You come and see it — or we arrange delivery', 'om-catalog' ),
			// inquiry = the form on the page with this subject; url; off.
			'book'            => 'inquiry',
			'book_text'       => __( 'Book a viewing', 'om-catalog' ),
			'book_subject'    => __( 'Book a viewing', 'om-catalog' ),
			'book_url'        => '',
			'ring_size'       => 'yes',
			'engraving'       => 'yes',
			'engraving_max'   => 30,
			'share'           => 'yes',
			'email_me'        => 'yes',
			// "|"-separated steps; empty = the section is not shown.
			'next_steps'      => '',
			'next_title'      => __( 'What happens next', 'om-catalog' ),
		);
	}

	/** Builder state from the current URL. */
	public static function state() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only view state.
		$get = function ( $key ) {
			return isset( $_GET[ $key ] ) && is_scalar( $_GET[ $key ] ) ? sanitize_text_field( wp_unslash( $_GET[ $key ] ) ) : '';
		};
		// phpcs:enable
		$setting = $get( 'rb_setting' );
		$line    = '';
		$style   = '';
		if ( false !== strpos( $setting, ':' ) ) {
			list( $line, $style ) = explode( ':', $setting, 2 );
			$line = sanitize_title( $line );
			if ( ! in_array( $line, om_builder_lines(), true ) ) {
				$line  = '';
				$style = '';
			}
		}
		return array(
			'line'    => $line,
			'style'   => $style,
			'metal'   => $get( 'rb_metal' ),
			'color'   => $get( 'rb_color' ),
			'diamond' => $get( 'rb_diamond' ),
			'step'    => in_array( $get( 'rb_step' ), array( 'setting', 'diamond', 'review', 'guide' ), true ) ? $get( 'rb_step' ) : '',
			'first'   => 'diamond' === $get( 'rb_first' ) ? 'diamond' : '',
			// "Help me choose" answers (OM_Diamond_Guide::code()), kept so
			// they can go with the request.
			'guide'   => mb_substr( $get( 'rb_guide' ), 0, 120 ),
		);
	}

	/** Query args that carry the builder state (what's chosen so far). */
	public static function state_args( $state, $changes = array() ) {
		$s = array_merge( $state, $changes );
		return array_filter(
			array(
				'rb_setting' => ( $s['line'] && $s['style'] ) ? $s['line'] . ':' . $s['style'] : '',
				'rb_metal'   => $s['metal'],
				'rb_color'   => $s['color'],
				'rb_diamond' => $s['diamond'],
				'rb_step'    => $s['step'] ?? '',
				'rb_first'   => $s['first'] ?? '',
				'rb_guide'   => $s['guide'] ?? '',
			),
			'strlen'
		);
	}

	/** The centre-stone shape a setting is designed for, if it says. */
	private static function setting_shape( $product ) {
		foreach ( array( 'shape', 'center_shape', 'center_stone_shape' ) as $key ) {
			if ( ! empty( $product[ $key ] ) && is_string( $product[ $key ] ) ) {
				return $product[ $key ];
			}
		}
		foreach ( (array) ( $product['stone_breakdown'] ?? array() ) as $stone ) {
			if ( ! empty( $stone['shape'] ) && 1 === (int) ( $stone['quantity'] ?? 0 ) ) {
				return (string) $stone['shape'];
			}
		}
		return '';
	}

	/** "1 1/4 CT" → 1.25, ".12 CT" → 0.12; null when it isn't a carat. */
	public static function parse_carat( $text ) {
		$text = strtolower( trim( (string) $text ) );
		if ( '' === $text || false === strpos( $text, 'ct' ) ) {
			return null;
		}
		$text = trim( str_replace( array( 'ctw', 'ct', 'tw' ), '', $text ) );
		if ( preg_match( '#^(\d+)\s+(\d+)/(\d+)$#', $text, $m ) && (int) $m[3] > 0 ) {
			return (int) $m[1] + (int) $m[2] / (int) $m[3];
		}
		if ( preg_match( '#^(\d+)/(\d+)$#', $text, $m ) && (int) $m[2] > 0 ) {
			return (int) $m[1] / (int) $m[2];
		}
		if ( preg_match( '#^(\d*\.?\d+)$#', $text, $m ) ) {
			return (float) $m[1];
		}
		return null;
	}

	/**
	 * The setting's centre-stone sizes: [ carat => style number ], from its
	 * carat variants (one style number per head size) or, failing that,
	 * its own centre stone.
	 */
	private static function head_sizes( $setting, $style ) {
		$out = array();
		foreach ( (array) ( $setting['product_variants'] ?? array() ) as $variant ) {
			$ct = self::parse_carat( $variant['variant_name'] ?? '' );
			if ( null !== $ct && ! empty( $variant['style_number'] ) ) {
				$out[ (string) round( $ct, 3 ) ] = (string) $variant['style_number'];
			}
		}
		if ( ! $out ) {
			$ct = self::parse_carat( $setting['variant_name'] ?? '' );
			if ( null === $ct ) {
				foreach ( (array) ( $setting['stone_breakdown'] ?? array() ) as $stone ) {
					if ( 1 === (int) ( $stone['quantity'] ?? 0 ) && ! empty( $stone['carat'] ) ) {
						$ct = (float) $stone['carat'];
						break;
					}
				}
			}
			if ( null !== $ct && $ct > 0 ) {
				$out[ (string) round( $ct, 3 ) ] = $style;
			}
		}
		ksort( $out, SORT_NUMERIC );
		return $out;
	}

	/** Carat range of diamonds that fit a setting, or null (shape only). */
	private static function fit_range( $sizes, $rule ) {
		if ( ! $sizes || 'off' === $rule ) {
			return null;
		}
		$keys  = array_map( 'floatval', array_keys( $sizes ) );
		$slack = 'loose' === $rule ? 0.25 : 0.12;
		return array( max( 0.1, round( min( $keys ) * ( 1 - $slack ), 2 ) ), round( max( $keys ) * ( 1 + $slack ), 2 ) );
	}

	/** Fill {setting} / {diamond} in a guidance line. */
	private static function fill( $text, $setting_name, $diamond_name ) {
		return str_replace( array( '{setting}', '{diamond}' ), array( $setting_name, $diamond_name ), (string) $text );
	}

	public function render( $atts ) {
		$atts = shortcode_atts( self::defaults(), $atts, 'om_ring_builder' );

		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );

		$state   = self::state();
		$setting = ( $state['line'] && $state['style'] ) ? OM_API_Client::get_product_by_style( $state['line'], $state['style'] ) : null;
		// "later": no diamond yet — chosen with the shop, or their own stone.
		$later   = self::LATER === $state['diamond'] && 'no' !== $atts['skip_diamond'];
		$diamond = '' !== $state['diamond'] && ! $later ? OM_API_Client::get_diamond( $state['diamond'] ) : null;

		$has_setting = $setting && ! is_wp_error( $setting );
		$has_diamond = $diamond && ! is_wp_error( $diamond );
		// Ready for the review: a diamond, or "without a diamond".
		$diamond_ok = $has_diamond || $later;

		// Setting and diamond together: set the stone in the head size made
		// for it (each carat is its own style number at OM).
		$head = '';
		if ( $has_setting && $has_diamond && ! empty( $diamond['carat'] ) ) {
			$sizes = self::head_sizes( $setting, $state['style'] );
			if ( $sizes ) {
				$want = (float) $diamond['carat'];
				$best = null;
				foreach ( array_keys( $sizes ) as $ct ) {
					if ( null === $best || abs( (float) $ct - $want ) < abs( (float) $best - $want ) ) {
						$best = $ct;
					}
				}
				$head = $best;
				if ( 0 !== strcasecmp( $sizes[ $best ], $state['style'] ) ) {
					$better = OM_API_Client::get_product_by_style( $state['line'], $sizes[ $best ] );
					if ( $better && ! is_wp_error( $better ) ) {
						$setting        = $better;
						$state['style'] = $sizes[ $best ];
					}
				}
			}
		}

		$first = $state['first'];
		if ( '' === $first && $has_diamond && ! $has_setting ) {
			$first = 'diamond';
		}
		$state['first'] = $first;
		$order          = 'diamond' === $first ? array( 'diamond', 'setting', 'review' ) : array( 'setting', 'diamond', 'review' );

		// Which step to show.
		$step = $state['step'];
		if ( '' === $step ) {
			if ( $has_setting && $diamond_ok ) {
				$step = 'review';
			} elseif ( $has_setting ) {
				$step = 'diamond';
			} elseif ( $has_diamond ) {
				$step = 'setting';
			} else {
				$step = 'start';
			}
		}
		if ( 'review' === $step && ! ( $has_setting && $diamond_ok ) ) {
			$step = $has_setting ? 'diamond' : 'setting';
		}
		$guide_mode = self::guide_mode( $atts );
		if ( 'guide' === $step && '' === $guide_mode ) {
			$step = 'diamond';
		}

		$page_url = om_builder_url();
		if ( '' === $page_url ) {
			$page_url = remove_query_arg( array_merge( self::PARAMS, OM_Shortcodes::STATE_PARAMS, OM_Diamonds::PARAMS ) );
		}
		$link = function ( $changes = array() ) use ( &$state, $page_url ) {
			return add_query_arg( array_map( 'rawurlencode', self::state_args( $state, $changes ) ), $page_url );
		};

		$setting_name = $has_setting ? (string) ( $setting['title'] ?? $state['style'] ) : '';
		$diamond_name = $has_diamond ? OM_Diamonds::describe( $diamond ) : '';

		// What returning visitors can come back to.
		$save = '';
		if ( $has_setting || $has_diamond ) {
			$save = wp_json_encode(
				array(
					'u' => om_absolute_url( $link( array( 'step' => '' ) ) ),
					't' => trim( $setting_name . ( $has_setting && $has_diamond ? ' + ' : '' ) . $diamond_name ),
					'i' => $has_setting ? (string) ( om_card_images( $setting )[0] ?? '' ) : (string) ( $diamond['image_url'] ?? '' ),
				)
			);
		}

		ob_start();
		printf(
			'<div class="om-builder om-builder--%s%s"%s>',
			esc_attr( $step ),
			'diamond' === $first ? ' om-builder--diamond-first' : '',
			'' !== $save ? ' data-om-rb-save="' . esc_attr( $save ) . '"' : ''
		);
		if ( '' !== trim( (string) $atts['heading'] ) && 'start' !== $step ) {
			echo '<h2 class="om-builder-heading">' . esc_html( $atts['heading'] ) . '</h2>';
		}

		if ( $state['diamond'] && ! $has_diamond && ! $later ) {
			echo '<p class="om-builder-notice">' . esc_html__( 'The diamond you picked is no longer available. Please choose another.', 'om-catalog' ) . '</p>';
		}
		if ( $state['style'] && ! $has_setting ) {
			echo '<p class="om-builder-notice">' . esc_html__( 'The setting you picked is no longer available. Please choose another.', 'om-catalog' ) . '</p>';
		}

		if ( 'start' === $step ) {
			$this->render_start( $atts, $link, $order );
		} elseif ( 'guide' === $step ) {
			// The answers so far then travel on through the bar's links.
			$state['guide'] = $this->render_guide( $atts, $state, $has_setting ? $setting : null, $link, $order, $has_setting, $diamond_ok, $page_url, $guide_mode );
		} else {
			$guides = array(
				'setting' => $has_diamond ? self::fill( $atts['guide_setting2'], $setting_name, $diamond_name ) : $atts['guide_setting'],
				'diamond' => $has_setting ? self::fill( $atts['guide_diamond'], $setting_name, $diamond_name ) : $atts['guide_diamond1'],
				'review'  => $atts['guide_review'],
			);
			$this->render_head( $atts, $step, $order, $has_setting, $diamond_ok, $link, $guides[ $step ] );
		}

		switch ( $step ) {
			case 'setting':
				if ( ! $has_diamond && '' !== trim( (string) $atts['tip_setting'] ) ) {
					echo '<p class="om-rb-tip"><span class="om-rb-tip-icon" aria-hidden="true"></span>' . esc_html( $atts['tip_setting'] ) . '</p>';
				}
				$this->render_settings( $atts, $state, $has_diamond ? $diamond : null, $link );
				break;
			case 'diamond':
				if ( '' !== $guide_mode && '' !== trim( (string) $atts['guide_link'] ) ) {
					echo '<p class="om-rb-tip"><span class="om-rb-tip-icon" aria-hidden="true"></span><a href="' . esc_url( $link( array( 'step' => 'guide' ) ) ) . '">' . esc_html( $atts['guide_link'] ) . '</a></p>';
				}
				if ( $has_setting && 'no' !== $atts['skip_diamond'] && '' !== trim( (string) $atts['skip_text'] ) ) {
					echo '<p class="om-rb-tip om-rb-skip"><span class="om-rb-tip-icon" aria-hidden="true"></span><a href="' . esc_url( $link( array( 'diamond' => self::LATER, 'step' => '' ) ) ) . '">' . esc_html( $atts['skip_text'] ) . '</a></p>';
				}
				$select_state = self::state_args( $state, array( 'step' => '' ) );
				unset( $select_state['rb_diamond'] );
				$range = $has_setting ? self::fit_range( self::head_sizes( $setting, $state['style'] ), (string) $atts['fit_rule'] ) : null;
				echo OM_Diamonds::instance()->render( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
					array(
						'origin'        => $atts['diamond_origin'],
						'default_shape' => $has_setting ? self::setting_shape( $setting ) : '',
						'default_cmin'  => $range ? $range[0] : '',
						'default_cmax'  => $range ? $range[1] : '',
						'select_state'  => $select_state,
						'true_size'     => $atts['true_size'],
						'compare'       => 'no' === $atts['diamond_compare'] ? 'no' : 'yes',
					),
					OM_Diamonds::request_from_globals()
				);
				break;
			case 'review':
				$this->render_review( $atts, $state, $setting, $later ? null : $diamond, $link, $head );
				break;
		}

		if ( 'start' !== $step && 'no' !== $atts['bar'] && ( 'review' !== $step || 'yes' === $atts['bar_review'] ) ) {
			$this->render_bar( $atts, 'guide' === $step ? 'diamond' : $step, $order, $state, $has_setting ? $setting : null, $has_diamond ? $diamond : ( $later ? self::LATER : null ), $link );
		}
		echo '</div>';
		return ob_get_clean();
	}

	/** "Step 2 of 3", the step's title and guidance, and the progress line. */
	private function render_head( $atts, $step, $order, $has_setting, $has_diamond, $link, $guide ) {
		$n      = array_search( $step, $order, true ) + 1;
		$names  = array(
			'setting' => $atts['step_setting'],
			'diamond' => $atts['step_diamond'],
			'review'  => $atts['step_review'],
		);
		$titles = array(
			'setting' => $atts['title_setting'],
			'diamond' => $atts['title_diamond'],
			'review'  => $atts['title_review'],
		);
		echo '<div class="om-rb-head"><div class="om-rb-head-text">';
		/* translators: 1: step number, 2: number of steps. */
		echo '<p class="om-rb-eyebrow">' . esc_html( sprintf( __( 'Step %1$d of %2$d', 'om-catalog' ), $n, count( $order ) ) ) . '</p>';
		echo '<h2 class="om-rb-title">' . esc_html( $titles[ $step ] ) . '</h2>';
		if ( '' !== trim( (string) $guide ) ) {
			echo '<p class="om-rb-guide">' . esc_html( $guide ) . '</p>';
		}
		echo '</div>';
		$this->render_progress( $order, $step, $names, $has_setting, $has_diamond, $link );
		echo '</div>';
	}

	private function render_progress( $order, $step, $names, $has_setting, $has_diamond, $link ) {
		echo '<ol class="om-rb-progress" aria-label="' . esc_attr__( 'Steps', 'om-catalog' ) . '">';
		foreach ( $order as $i => $key ) {
			$done    = ( 'setting' === $key && $has_setting ) || ( 'diamond' === $key && $has_diamond );
			$current = $key === $step;
			$can     = ! $current && 'start' !== $step && ( 'review' !== $key || ( $has_setting && $has_diamond ) );
			$label   = '<span class="om-rb-progress-bar" aria-hidden="true"></span><span class="om-rb-progress-label">' . esc_html( ( $i + 1 ) . ' · ' . $names[ $key ] ) . ( $done && ! $current ? ' <span class="om-rb-tick" aria-hidden="true">&#10003;</span><span class="om-visually-hidden">' . esc_html__( '(done)', 'om-catalog' ) . '</span>' : '' ) . '</span>';
			printf(
				'<li class="om-rb-progress-step%s%s"%s>',
				$current ? ' is-current' : '',
				$done ? ' is-done' : '',
				$current ? ' aria-current="step"' : ''
			);
			if ( $can ) {
				echo '<a href="' . esc_url( $link( array( 'step' => $key ) ) ) . '">' . $label . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
			} else {
				echo '<span>' . $label . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
			}
			echo '</li>';
		}
		echo '</ol>';
	}

	/** "budget", "size" or '' (off), from the setting and whether prices show. */
	private static function guide_mode( $atts ) {
		$mode = (string) $atts['guide'];
		if ( 'off' === $mode ) {
			return '';
		}
		$priced = OM_Diamond_Guide::prices_visible();
		if ( 'budget' === $mode ) {
			return $priced ? 'budget' : 'size';
		}
		if ( 'size' === $mode ) {
			return 'size';
		}
		return $priced ? 'budget' : 'size';
	}

	/**
	 * Step: "Help me choose" — three questions, three real stones.
	 *
	 * @return string The answers (OM_Diamond_Guide::code()).
	 */
	private function render_guide( $atts, $state, $setting, $link, $order, $has_setting, $has_diamond, $page_url, $mode ) {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only view state.
		$get = static function ( $key ) {
			return isset( $_GET[ $key ] ) && is_scalar( $_GET[ $key ] ) ? sanitize_text_field( wp_unslash( $_GET[ $key ] ) ) : '';
		};
		// phpcs:enable
		$budget_mode = 'budget' === $mode;
		$shapes      = OM_Diamonds::SHAPES;
		$fixed_shape = $setting ? self::setting_shape( $setting ) : '';
		$shape       = '' !== $fixed_shape ? $fixed_shape : ( in_array( $get( 'g_shape' ), $shapes, true ) ? $get( 'g_shape' ) : 'Round' );
		$fixed_orig  = in_array( $atts['diamond_origin'], array( 'lab', 'natural' ), true ) ? $atts['diamond_origin'] : '';
		$origin      = '' !== $fixed_orig ? $fixed_orig : ( in_array( $get( 'g_origin' ), array( 'lab', 'natural', 'either' ), true ) ? $get( 'g_origin' ) : 'lab' );
		$pri         = in_array( $get( 'g_pri' ), array( 'value', 'balance', 'sparkle' ), true ) ? $get( 'g_pri' ) : 'balance';

		// Size limits: the setting's fit range, else 0.3–4 ct.
		$range  = $setting ? self::fit_range( self::head_sizes( $setting, $state['style'] ), (string) $atts['fit_rule'] ) : null;
		$ct_min = $range ? $range[0] : 0.3;
		$ct_max = $range ? $range[1] : 4;
		$ct     = is_numeric( $get( 'g_ct' ) ) ? (float) $get( 'g_ct' ) : ( $range ? round( ( $ct_min + $ct_max ) / 2, 2 ) : 1 );
		$ct     = max( $ct_min, min( $ct_max, $ct ) );
		$b_min  = max( 100, (int) $atts['budget_min'] );
		$b_max  = max( $b_min + 500, (int) $atts['budget_max'] );
		$budget = is_numeric( $get( 'g_budget' ) ) ? (int) $get( 'g_budget' ) : (int) round( ( $b_min + $b_max ) / 4, -2 );
		$budget = max( $b_min, min( $b_max, $budget ) );

		$query = array(
			'shape'  => $shape,
			'origin' => 'either' === $origin ? '' : $origin,
			'pri'    => $pri,
		);
		if ( $budget_mode ) {
			$query['budget'] = $budget;
			if ( $range ) {
				$query += array( 'ct_min' => $ct_min, 'ct_max' => $ct_max );
			}
		} else {
			$query += array( 'ct' => $ct, 'ct_min' => $ct_min, 'ct_max' => $ct_max );
		}
		$picks = OM_Diamond_Guide::picks( $query );
		$tags  = OM_Diamond_Guide::tags( $budget_mode );
		$code  = static function ( $pick = '', $lot = '' ) use ( $mode, $budget_mode, $budget, $ct, $pri, $origin, $shape ) {
			return OM_Diamond_Guide::code( $mode, $budget_mode ? $budget : $ct, $pri, $origin, $shape, $pick, $lot );
		};

		$names = array(
			'setting' => $atts['step_setting'],
			'diamond' => $atts['step_diamond'],
			'review'  => $atts['step_review'],
		);
		echo '<div class="om-rb-head"><div class="om-rb-head-text">';
		echo '<p class="om-rb-eyebrow">' . esc_html( $atts['guide_eyebrow'] ) . '</p>';
		echo '<h2 class="om-rb-title">' . esc_html( $budget_mode ? $atts['guide_heading_b'] : $atts['guide_heading'] ) . '</h2>';
		if ( '' !== trim( (string) $atts['guide_intro'] ) ) {
			echo '<p class="om-rb-guide">' . esc_html( $atts['guide_intro'] ) . '</p>';
		}
		echo '</div>';
		$this->render_progress( $order, 'diamond', $names, $has_setting, $has_diamond, $link );
		echo '</div>';

		$action = strtok( $page_url, '?' );
		$keep   = array();
		parse_str( (string) wp_parse_url( $page_url, PHP_URL_QUERY ), $keep );
		$keep  = array_merge( $keep, self::state_args( $state, array( 'step' => 'guide' ) ) );
		$money = static function ( $n ) {
			return om_format_price_short( $n );
		};
		?>
		<div class="om-rb-guide-wrap">
			<form class="om-rb-guide-form" method="get" action="<?php echo esc_url( $action ); ?>">
				<?php foreach ( $keep as $key => $value ) : ?>
					<?php if ( is_scalar( $value ) && ! in_array( $key, OM_Diamond_Guide::PARAMS, true ) ) : ?>
						<input type="hidden" name="<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $value ); ?>" />
					<?php endif; ?>
				<?php endforeach; ?>
				<?php $n = 1; ?>
				<?php if ( '' === $fixed_shape ) : ?>
					<fieldset class="om-rb-q">
						<legend><span class="om-rb-q-n"><?php echo (int) $n++; ?> ·</span> <?php esc_html_e( 'Which shape?', 'om-catalog' ); ?></legend>
						<div class="om-rb-q-shapes">
							<?php foreach ( $shapes as $one ) : ?>
								<label class="om-rb-q-shape"><input type="radio" name="g_shape" value="<?php echo esc_attr( $one ); ?>" <?php checked( $shape, $one ); ?> /><span><?php echo OM_Diamonds::shape_icon( $one ); // phpcs:ignore WordPress.Security.EscapeOutput -- static SVG. ?><?php echo esc_html( $one ); ?></span></label>
							<?php endforeach; ?>
						</div>
					</fieldset>
				<?php endif; ?>
				<?php if ( $budget_mode ) : ?>
					<div class="om-rb-q">
						<label class="om-rb-q-label" for="om-rb-budget"><span><span class="om-rb-q-n"><?php echo (int) $n++; ?> ·</span> <?php esc_html_e( 'Budget for the diamond', 'om-catalog' ); ?></span><output class="om-rb-q-value" for="om-rb-budget" data-om-money="1"><?php echo esc_html( $money( $budget ) ); ?></output></label>
						<input id="om-rb-budget" type="range" name="g_budget" min="<?php echo (int) $b_min; ?>" max="<?php echo (int) $b_max; ?>" step="250" value="<?php echo (int) $budget; ?>" />
						<span class="om-rb-q-ends"><span><?php echo esc_html( $money( $b_min ) ); ?></span><span><?php echo esc_html( $money( $b_max ) ); ?>+</span></span>
					</div>
				<?php else : ?>
					<div class="om-rb-q">
						<label class="om-rb-q-label" for="om-rb-ct"><span><span class="om-rb-q-n"><?php echo (int) $n++; ?> ·</span> <?php esc_html_e( 'How big would you like it?', 'om-catalog' ); ?></span><output class="om-rb-q-value" for="om-rb-ct" data-om-ct="1"><?php echo esc_html( rtrim( rtrim( number_format( $ct, 2 ), '0' ), '.' ) . ' ct' ); ?></output></label>
						<input id="om-rb-ct" type="range" name="g_ct" min="<?php echo esc_attr( $ct_min ); ?>" max="<?php echo esc_attr( $ct_max ); ?>" step="0.05" value="<?php echo esc_attr( $ct ); ?>" />
						<span class="om-rb-q-ends"><span><?php echo esc_html( $ct_min . ' ct' ); ?></span><span><?php echo esc_html( $ct_max . ' ct' ); ?></span></span>
					</div>
				<?php endif; ?>
				<fieldset class="om-rb-q">
					<legend><span class="om-rb-q-n"><?php echo (int) $n++; ?> ·</span> <?php esc_html_e( 'What matters most?', 'om-catalog' ); ?></legend>
					<div class="om-rb-q-cards">
						<?php
						$prios = array(
							'value'   => $budget_mode ? array( __( 'Size', 'om-catalog' ), __( 'Look bigger on the hand', 'om-catalog' ) ) : array( __( 'Value', 'om-catalog' ), __( 'Smart grades, gentler price', 'om-catalog' ) ),
							'balance' => array( __( 'Balance', 'om-catalog' ), __( 'A bit of everything', 'om-catalog' ) ),
							'sparkle' => array( __( 'Sparkle', 'om-catalog' ), __( 'Whitest, cleanest, best cut', 'om-catalog' ) ),
						);
						foreach ( $prios as $key => $label ) :
							?>
							<label class="om-rb-q-card"><input type="radio" name="g_pri" value="<?php echo esc_attr( $key ); ?>" <?php checked( $pri, $key ); ?> /><span><strong><?php echo esc_html( $label[0] ); ?></strong><?php echo esc_html( $label[1] ); ?></span></label>
						<?php endforeach; ?>
					</div>
				</fieldset>
				<?php if ( '' === $fixed_orig ) : ?>
					<fieldset class="om-rb-q">
						<legend><span class="om-rb-q-n"><?php echo (int) $n++; ?> ·</span> <?php esc_html_e( 'Lab-grown or natural?', 'om-catalog' ); ?></legend>
						<div class="om-rb-q-seg">
							<?php foreach ( array( 'lab' => __( 'Lab-grown', 'om-catalog' ), 'natural' => __( 'Natural', 'om-catalog' ), 'either' => __( 'Either', 'om-catalog' ) ) as $key => $label ) : ?>
								<label><input type="radio" name="g_origin" value="<?php echo esc_attr( $key ); ?>" <?php checked( $origin, $key ); ?> /><span><?php echo esc_html( $label ); ?></span></label>
							<?php endforeach; ?>
						</div>
						<p class="om-rb-q-note"><?php esc_html_e( 'Lab-grown diamonds are real diamonds, grown rather than mined — usually a bigger stone for the same budget.', 'om-catalog' ); ?></p>
					</fieldset>
				<?php endif; ?>
				<button type="submit" class="om-rb-guide-go"><?php esc_html_e( 'Show my best three', 'om-catalog' ); ?></button>
			</form>

			<div class="om-rb-guide-results" aria-live="polite">
				<p class="om-rb-guide-results-title"><?php esc_html_e( 'Suggested for you', 'om-catalog' ); ?></p>
				<?php if ( is_wp_error( $picks ) || ! $picks ) : ?>
					<p class="om-rb-guide-empty"><?php esc_html_e( 'No stones match those answers right now. Try a different size, budget or lab/natural — or ask us, and we will find one.', 'om-catalog' ); ?></p>
				<?php else : ?>
					<?php foreach ( $picks as $i => $pick ) : ?>
						<?php
						list( $key, $d ) = $pick;
						$retail = isset( $d['price'] ) ? om_diamond_retail( $d['price'] ) : null;
						$img    = (string) ( $d['image_url'] ?? '' );
						?>
						<div class="om-rb-pick<?php echo 0 === $i ? ' is-first' : ''; ?>">
							<div class="om-rb-pick-media">
								<?php if ( $img ) : ?>
									<img src="<?php echo esc_url( $img ); ?>" alt="" loading="lazy" />
								<?php else : ?>
									<?php echo OM_Diamonds::shape_icon( (string) ( $d['shape'] ?? 'Round' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- static SVG. ?>
								<?php endif; ?>
							</div>
							<div class="om-rb-pick-info">
								<span class="om-rb-pick-tag"><?php echo esc_html( $tags[ $key ] ); ?></span>
								<p class="om-rb-pick-title"><?php echo esc_html( OM_Diamonds::describe( $d ) ); ?></p>
								<p class="om-rb-pick-why"><?php echo esc_html( OM_Diamond_Guide::reason( $d ) ); ?></p>
								<p class="om-rb-pick-meta"><?php echo esc_html( trim( (string) ( $d['measurement'] ?? '' ) . ( ! empty( $d['lab'] ) ? ' · ' . $d['lab'] : '' ), ' ·' ) ); ?></p>
							</div>
							<div class="om-rb-pick-end">
								<span class="om-rb-pick-price"><?php echo esc_html( null !== $retail ? om_format_price_short( $retail ) : __( 'Price on request', 'om-catalog' ) ); ?></span>
								<a class="om-rb-pick-choose" href="<?php echo esc_url( $link( array( 'diamond' => (string) $d['lot_number'], 'step' => '', 'guide' => $code( $key, (string) $d['lot_number'] ) ) ) ); ?>"><?php esc_html_e( 'Choose', 'om-catalog' ); ?><span class="om-visually-hidden">: <?php echo esc_html( OM_Diamonds::describe( $d ) ); ?></span></a>
								<?php
								if ( 'no' !== $atts['true_size'] ) {
									echo om_true_size_button( $d ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the helper.
								}
								?>
							</div>
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
				<p class="om-rb-guide-all"><a href="<?php echo esc_url( $link( array( 'step' => 'diamond', 'guide' => $code() ) ) ); ?>"><?php esc_html_e( 'See all matching diamonds', 'om-catalog' ); ?></a></p>
			</div>
		</div>
		<?php
		return $code();
	}

	private function render_start( $atts, $link, $order ) {
		echo '<div class="om-rb-start">';
		echo '<div class="om-rb-start-head">';
		if ( '' !== trim( (string) $atts['intro_eyebrow'] ) ) {
			echo '<p class="om-rb-eyebrow om-rb-eyebrow--lined">' . esc_html( $atts['intro_eyebrow'] ) . '</p>';
		}
		$title = '' !== trim( (string) $atts['intro_title'] ) ? $atts['intro_title'] : $atts['heading'];
		if ( '' !== trim( (string) $title ) ) {
			echo '<h2 class="om-rb-start-title">' . esc_html( $title ) . '</h2>';
		}
		if ( '' !== trim( (string) $atts['intro_text'] ) ) {
			echo '<p class="om-rb-start-text">' . esc_html( $atts['intro_text'] ) . '</p>';
		}
		echo '</div>';

		if ( 'no' !== $atts['continue'] ) {
			// Filled by the script from the visitor's last design, if any.
			echo '<a class="om-rb-continue" href="#" hidden><span class="om-rb-continue-img" aria-hidden="true"></span><span class="om-rb-continue-text">' . esc_html__( 'Welcome back — continue your ring', 'om-catalog' ) . '</span><span class="om-rb-arrow" aria-hidden="true"></span></a>';
		}

		$names = array(
			'setting' => $atts['step_setting'],
			'diamond' => $atts['step_diamond'],
			'review'  => $atts['step_review'],
		);
		$this->render_progress( $order, 'start', $names, false, false, $link );

		$ways = array();
		if ( 'no' !== $atts['start_setting'] ) {
			$ways[] = array( 'setting', $link( array( 'step' => 'setting' ) ), $atts['setting_tag'], $atts['setting_title'], $atts['setting_text'], $atts['setting_cta'], '<circle cx="24" cy="30" r="12"/><path d="M18 14l6-8 6 8-6 6z"/>' );
		}
		if ( 'no' !== $atts['start_diamond'] ) {
			$ways[] = array( 'diamond', $link( array( 'step' => 'diamond', 'first' => 'diamond' ) ), $atts['diamond_tag'], $atts['diamond_title'], $atts['diamond_text'], $atts['diamond_cta'], '<path d="M10 18l7-9h14l7 9-14 21z"/><path d="M10 18h28M17 9l7 9 7-9M24 18v21"/>' );
		}
		if ( 'no' !== $atts['start_guide'] && '' !== self::guide_mode( $atts ) ) {
			$ways[] = array( 'guide', $link( array( 'step' => 'guide', 'first' => 'diamond' ) ), $atts['guide_tag'], $atts['guide_title'], $atts['guide_text'], $atts['guide_cta'], '<circle cx="24" cy="24" r="17"/><path d="M19 19.5a5 5 0 1 1 6.6 4.7c-1.1.4-1.6 1.2-1.6 2.6M24 31.5v.5"/>' );
		}
		echo '<div class="om-rb-ways om-rb-ways--' . count( $ways ) . '">';
		foreach ( $ways as $i => $way ) {
			list( $key, $href, $tag, $title, $text, $cta, $icon ) = $way;
			printf(
				'<a class="om-rb-way om-rb-way--%1$s%2$s" href="%3$s"><span class="om-rb-way-top"><svg class="om-rb-way-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">%4$s</svg>%5$s</span><span class="om-rb-way-title">%6$s</span><span class="om-rb-way-text">%7$s</span><span class="om-rb-way-cta">%8$s<span class="om-rb-arrow" aria-hidden="true"></span></span></a>',
				esc_attr( $key ),
				0 === $i ? ' is-featured' : '',
				esc_url( $href ),
				$icon, // phpcs:ignore WordPress.Security.EscapeOutput -- static SVG.
				'' !== trim( (string) $tag ) ? '<span class="om-rb-way-tag">' . esc_html( $tag ) . '</span>' : '',
				esc_html( $title ),
				esc_html( $text ),
				esc_html( $cta )
			);
		}
		echo '</div>';

		$promises = array_filter( array_map( 'trim', explode( '|', (string) $atts['promises'] ) ), 'strlen' );
		if ( $promises ) {
			echo '<ul class="om-rb-promises">';
			foreach ( array_slice( $promises, 0, 4 ) as $promise ) {
				echo '<li>' . esc_html( $promise ) . '</li>';
			}
			echo '</ul>';
		}
		echo '</div>';
	}

	/** Step: the settings grid, looking like a catalog widget. */
	private function render_settings( $atts, $state, $diamond, $link ) {
		$card_query = array( 'rb' => '1' );
		if ( $diamond ) {
			$card_query['rb_diamond'] = $state['diamond'];
			$card_query['rb_first']   = 'diamond';
		}
		$grid = array(
			'lines'           => implode( ',', om_builder_lines() ),
			'per_page'        => (int) $atts['per_page'],
			'show_filters'    => 'yes',
			'filter_shapes'   => 'yes',
			'filter_metals'   => 'yes',
			'filter_position' => 'left',
			'filters_title'   => __( 'Filters', 'om-catalog' ),
			'show_prices'     => 'yes',
		);
		$look = self::look_source( (string) $atts['look_page'] );
		if ( $look ) {
			// Everything as on the catalog page (design, cards, filters,
			// search, badges…), limited to the builder's lines.
			$grid                = array_merge(
				$look['widget']->grid_atts( $look['settings'] ),
				array(
					'lines'         => $grid['lines'],
					'per_page'      => $grid['per_page'],
					'show_filters'  => 'yes',
					'filter_shapes' => 'yes',
					'head'          => 'no',
					'intro'         => 'no',
					'end_card'      => 'no',
				)
			);
			$grid['line_styles'] = array_intersect_key( (array) ( $grid['line_styles'] ?? array() ), array_flip( om_builder_lines() ) );
		}
		// A chosen diamond pre-selects settings in its shape.
		$grid['shape']      = $diamond ? (string) ( $diamond['shape'] ?? '' ) : '';
		$grid['card_query'] = $card_query;
		// Each card: "Choose this setting" straight into the next step.
		$grid['card_choose_url']  = $link( array( 'line' => '{line}', 'style' => '{style}', 'step' => '' ) );
		$grid['card_choose_text'] = (string) $atts['choose_text'];

		$html = OM_Shortcodes::instance()->render_grid( $grid, OM_Shortcodes::request_from_globals() );
		if ( $look ) {
			om_elementor_enqueue_page_css( $look['page'] );
			$html = om_elementor_wrap( $html, $look['page'], $look['id'], 'om-builder-look' );
		}
		echo $html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
	}

	/**
	 * The catalog widget whose look the settings grid borrows: the chosen
	 * page, or (automatically) the newest page whose catalog shows one of
	 * the builder's lines.
	 */
	private static function look_source( $choice ) {
		if ( 'none' === $choice || ! did_action( 'elementor/loaded' ) ) {
			return null;
		}
		$pages = ctype_digit( $choice ) ? array( (int) $choice => '' ) : om_elementor_pages_with( 'om_catalog_widget', 20 );
		$first = null;
		foreach ( array_keys( $pages ) as $page ) {
			$found = om_elementor_page_widget( $page, 'om_catalog_widget' );
			if ( ! $found || ! $found['widget'] || ! method_exists( $found['widget'], 'grid_atts' ) ) {
				continue;
			}
			$lines = array_merge( array( (string) ( $found['settings']['product_line'] ?? '' ) ), (array) ( $found['settings']['extra_lines'] ?? array() ) );
			if ( array_intersect( $lines, om_builder_lines() ) ) {
				return $found;
			}
			$first = $first ? $first : $found;
		}
		return $first;
	}

	/** Prices shown for the setting ("from") and the diamond, or null. */
	private static function prices( $state, $setting, $diamond ) {
		if ( ! om_markup_is_configured() ) {
			return array( null, null );
		}
		$setting_price = null;
		if ( $setting ) {
			$wholesale     = OM_API_Client::get_card_price( $state['line'], $state['style'] );
			$setting_price = null !== $wholesale ? om_apply_markup( $wholesale ) : null;
		}
		$diamond_price = $diamond && isset( $diamond['price'] ) ? om_diamond_retail( $diamond['price'] ) : null;
		return array( $setting_price, $diamond_price );
	}

	/** The "Your ring" bar at the foot of every step. */
	private function render_bar( $atts, $step, $order, $state, $setting, $diamond, $link ) {
		// "Without a diamond": a chip that says so, and no diamond price.
		$later   = self::LATER === $diamond;
		$diamond = $later ? null : $diamond;
		list( $setting_price, $diamond_price ) = self::prices( $state, $setting, $diamond );

		$chip = static function ( $kind, $title, $meta, $img, $href, $empty_text ) {
			if ( '' === $title ) {
				return '<span class="om-rb-chip is-empty"><span class="om-rb-chip-img" aria-hidden="true"></span><span class="om-rb-chip-text">' . esc_html( $empty_text ) . '</span></span>';
			}
			return sprintf(
				'<a class="om-rb-chip om-rb-chip--%1$s" href="%2$s"><span class="om-rb-chip-img" aria-hidden="true">%3$s</span><span class="om-rb-chip-text"><span class="om-rb-chip-title">%4$s</span><span class="om-rb-chip-meta">%5$s</span></span></a>',
				esc_attr( $kind ),
				esc_url( $href ),
				'' !== $img ? '<img src="' . esc_url( $img ) . '" alt="" loading="lazy" />' : '',
				esc_html( $title ),
				esc_html( $meta )
			);
		};

		$setting_meta = $setting ? implode( ' · ', array_filter( array( trim( $state['metal'] . ' ' . $state['color'] ), null !== $setting_price ? sprintf( /* translators: %s: price. */ __( 'from %s', 'om-catalog' ), om_format_price_short( $setting_price ) ) : '' ), 'strlen' ) ) : '';
		$diamond_meta = $diamond ? implode( ' · ', array_filter( array( ! empty( $diamond['is_lab'] ) ? __( 'Lab-grown', 'om-catalog' ) : __( 'Natural', 'om-catalog' ), null !== $diamond_price ? om_format_price_short( $diamond_price ) : '' ), 'strlen' ) ) : '';

		$chips = array(
			'setting' => $chip( 'setting', $setting ? (string) ( $setting['title'] ?? $state['style'] ) : '', $setting_meta, $setting ? (string) ( om_card_images( $setting )[0] ?? '' ) : '', $link( array( 'step' => 'setting' ) ), __( 'Setting', 'om-catalog' ) ),
			'diamond' => $chip( 'diamond', $diamond ? OM_Diamonds::describe( $diamond ) : ( $later ? __( 'Diamond: to choose with us', 'om-catalog' ) : '' ), $later ? __( 'or your own stone', 'om-catalog' ) : $diamond_meta, $diamond ? (string) ( $diamond['image_url'] ?? '' ) : '', $link( array( 'step' => 'diamond' ) ), __( 'Diamond', 'om-catalog' ) ),
		);

		// The next step, once this one is done.
		$next = '';
		$at   = array_search( $step, $order, true );
		if ( 'review' !== $step ) {
			$ready = ( 'setting' === $step && $setting ) || ( 'diamond' === $step && ( $diamond || $later ) );
			$to    = $order[ $at + 1 ] ?? 'review';
			if ( 'review' === $to && ! ( $setting && ( $diamond || $later ) ) ) {
				$ready = false;
			}
			$labels = array(
				'setting' => __( 'Next: choose a setting', 'om-catalog' ),
				'diamond' => __( 'Next: choose a diamond', 'om-catalog' ),
				'review'  => __( 'Next: review your ring', 'om-catalog' ),
			);
			if ( $ready ) {
				$next = '<a class="om-rb-next" href="' . esc_url( $link( array( 'step' => $to ) ) ) . '">' . esc_html( $labels[ $to ] ) . '<span class="om-rb-arrow" aria-hidden="true"></span></a>';
			} elseif ( in_array( $step, array( 'setting', 'diamond' ), true ) ) {
				// Not done yet: say what to do here (phones see little else).
				$hints = array(
					'setting' => __( 'Pick a setting below', 'om-catalog' ),
					'diamond' => __( 'Pick a diamond below', 'om-catalog' ),
				);
				$next  = '<span class="om-rb-next-hint">' . esc_html( $hints[ $step ] ) . '</span>';
			}
		}

		$total = null !== $setting_price && null !== $diamond_price ? om_format_price( $setting_price + $diamond_price ) : '';

		echo '<div class="om-rb-bar" role="region" aria-label="' . esc_attr__( 'Your ring', 'om-catalog' ) . '"><div class="om-rb-bar-inner">';
		echo '<span class="om-rb-bar-label">' . esc_html__( 'Your ring', 'om-catalog' ) . '</span>';
		$pair = 'diamond' === $order[0] ? array( 'diamond', 'setting' ) : array( 'setting', 'diamond' );
		echo '<span class="om-rb-chips">' . $chips[ $pair[0] ] . '<span class="om-rb-plus" aria-hidden="true">+</span>' . $chips[ $pair[1] ] . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in $chip.
		echo '<span class="om-rb-bar-end">';
		if ( '' !== $total ) {
			echo '<span class="om-rb-total"><span class="om-rb-total-label">' . esc_html__( 'Total', 'om-catalog' ) . '</span> ' . esc_html( $total ) . '</span>';
		}
		echo self::chat_button( $atts ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in chat_button().
		echo $this->ask_link( $atts, $link, self::guide_text( $atts, $state ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in ask_link().
		echo $next; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
		echo '</span></div></div>';
	}

	/**
	 * The AI assistant's button for the bar / review ('' when the assistant
	 * is off). The script hides the floating one while this is on the page.
	 */
	private static function chat_button( $atts, $class = '' ) {
		if ( 'no' === $atts['chat_in_bar'] || ! class_exists( 'OM_Assistant' ) || ! OM_Assistant::enabled() ) {
			return '';
		}
		$cfg  = OM_Assistant::front_config();
		$text = is_array( $cfg ) ? (string) $cfg['launcher'] : __( 'Ask our jeweller', 'om-catalog' );
		return '<button type="button" class="om-rb-chat' . ( '' !== $class ? ' ' . esc_attr( $class ) : '' ) . '" data-om-ai-open hidden><span class="om-ai-spark" aria-hidden="true"></span><span class="om-rb-chat-text">' . esc_html( $text ) . '</span></button>';
	}

	/** The "Help me choose" answers in words, for the shop ('' = none or not sent). */
	private static function guide_text( $atts, $state ) {
		if ( 'no' === $atts['guide_send'] || '' === (string) ( $state['guide'] ?? '' ) ) {
			return '';
		}
		return OM_Diamond_Guide::describe_code( $state['guide'], (string) $state['diamond'] );
	}

	/** Tells the visitor their answers go with the form. */
	private static function guide_note( $guide ) {
		/* translators: %s: the visitor's answers. */
		return '' !== $guide ? sprintf( __( 'Sent with it, so we can help: your “Help me choose” answers (%s).', 'om-catalog' ), $guide ) : '';
	}

	/** "Questions? Ask us": a link, or a short inquiry form in a pop-up. */
	private function ask_link( $atts, $link, $guide = '' ) {
		$text = trim( (string) $atts['ask_text'] );
		if ( '' === $text ) {
			return '';
		}
		if ( '' !== trim( (string) $atts['ask_url'] ) ) {
			return '<a class="om-rb-ask" href="' . esc_url( $atts['ask_url'] ) . '">' . esc_html( $text ) . '</a>';
		}
		if ( ! class_exists( 'OM_Inquiry' ) ) {
			return '';
		}
		$id = 'om-rb-ask-' . wp_rand( 1000, 9999 );
		return '<button type="button" class="om-rb-ask" data-om-end-dialog="' . esc_attr( $id ) . '" aria-haspopup="dialog">' . esc_html( $text ) . '</button>'
			. '<dialog class="om-end-dialog" id="' . esc_attr( $id ) . '" aria-labelledby="' . esc_attr( $id ) . '-t"><div class="om-end-dialog-inner"><button type="button" class="om-end-dialog-close" aria-label="' . esc_attr__( 'Close', 'om-catalog' ) . '">&times;</button><p class="om-end-dialog-title" id="' . esc_attr( $id ) . '-t">' . esc_html( $text ) . '</p>'
			. OM_Inquiry::render_form(
				array(
					'collapsible' => false,
					'heading'     => '',
					'intro'       => __( 'Ask us anything about settings, diamonds, sizing or timing.', 'om-catalog' ),
					'subject'     => __( 'General question', 'om-catalog' ),
					'url'         => om_absolute_url( $link() ),
					'guide'       => $guide,
					'note'        => self::guide_note( $guide ),
					'button'      => __( 'Send', 'om-catalog' ),
				)
			)
			. '</div></dialog>';
	}

	private function render_review( $atts, $state, $setting, $diamond, $link, $head ) {
		// Price the setting as a semi-mount (no centre stone) when OM offers
		// that level, in the metal/colour the customer picked.
		$levels = (array) ( $setting['levels'] ?? array() );
		$level  = in_array( 'Semi-Mount', $levels, true ) ? 'Semi-Mount' : (string) ( $setting['default_level'] ?? '' );
		$metals = array_values( array_filter( array_map( 'strval', (array) ( $setting['metals'] ?? array() ) ), 'strlen' ) );
		$colors = array_values( array_filter( array_map( 'strval', (array) ( $setting['colors'] ?? array() ) ), 'strlen' ) );
		$metal  = in_array( $state['metal'], $metals, true ) ? $state['metal'] : (string) ( $setting['default_metal'] ?? '' );
		$color  = in_array( $state['color'], $colors, true ) ? $state['color'] : (string) ( $setting['default_color'] ?? '' );

		$setting_price = null;
		if ( om_markup_is_configured() ) {
			$quote = OM_API_Client::get_quotation(
				$state['line'],
				array_filter(
					array(
						'styleNumber' => $state['style'],
						'metal'       => $metal,
						'color'       => $color,
						'level'       => $level,
						'quality'     => 'Semi-Mount' === $level ? (string) ( $setting['default_quality'] ?? '' ) : '',
					)
				)
			);
			if ( ! is_wp_error( $quote ) && isset( $quote['price'] ) ) {
				$setting_price = om_apply_markup( floatval( $quote['price'] ) );
			}
		}
		$later         = ! $diamond;
		$diamond       = $later ? array() : $diamond;
		$diamond_price = isset( $diamond['price'] ) ? om_diamond_retail( $diamond['price'] ) : null;
		$total         = ( null !== $setting_price && null !== $diamond_price ) ? $setting_price + $diamond_price : null;

		$setting_img = (string) ( om_card_images( $setting, $color )[0] ?? '' );
		$diamond_img = (string) ( $diamond['image_url'] ?? '' );
		$setting_url = om_product_url( $state['line'], $state['style'] );
		/* translators: %s: carat. */
		$head_text = '' !== (string) $head ? sprintf( __( 'Head size set for a %s ct centre stone', 'om-catalog' ), rtrim( rtrim( number_format( (float) $head, 2 ), '0' ), '.' ) ) : '';

		if ( $later ) {
			$summary = sprintf(
				/* translators: 1: setting, 2: style, 3: metal/colour. */
				__( 'Setting: %1$s (style %2$s, %3$s). Diamond: not chosen yet — to choose with the shop, or the customer’s own stone.', 'om-catalog' ),
				(string) ( $setting['title'] ?? '' ),
				$state['style'],
				trim( $metal . ' ' . $color )
			);
			/* translators: %s: setting. */
			$title = sprintf( __( '%s (setting — diamond to choose)', 'om-catalog' ), (string) ( $setting['title'] ?? '' ) );
		} else {
			$summary = sprintf(
				/* translators: 1: setting, 2: style, 3: metal/colour, 4: diamond, 5: lot. */
				__( 'Setting: %1$s (style %2$s, %3$s). Diamond: %4$s (lot %5$s).', 'om-catalog' ),
				(string) ( $setting['title'] ?? '' ),
				$state['style'],
				trim( $metal . ' ' . $color ),
				OM_Diamonds::describe( $diamond ),
				(string) ( $diamond['lot_number'] ?? '' )
			);
			$title = (string) ( $setting['title'] ?? '' ) . ' + ' . OM_Diamonds::describe( $diamond );
		}
		$guide = self::guide_text( $atts, $state );
		$share = om_absolute_url( $link( array( 'step' => '' ) ) );

		// The request form: the site's fields plus ring size and engraving.
		$fields = OM_Inquiry::global_fields();
		$has    = static function ( $word ) use ( $fields ) {
			foreach ( $fields as $field ) {
				if ( false !== stripos( $field['key'] . ' ' . $field['label'], $word ) ) {
					return true;
				}
			}
			return false;
		};
		// Only when the site's form doesn't ask already.
		if ( 'no' !== $atts['ring_size'] && ! $has( 'size' ) ) {
			$sizes = array( __( 'Not sure yet', 'om-catalog' ) );
			for ( $s = 3; $s <= 10; $s += 0.5 ) {
				$sizes[] = rtrim( rtrim( number_format( $s, 1 ), '0' ), '.' );
			}
			$fields[] = array( 'key' => 'ring_size', 'label' => __( 'Ring size', 'om-catalog' ), 'type' => 'select', 'width' => 'half', 'options' => $sizes );
		}
		if ( 'no' !== $atts['engraving'] && ! $has( 'engrav' ) ) {
			/* translators: %d: characters. */
			$fields[] = array( 'key' => 'engraving', 'label' => __( 'Engraving (optional)', 'om-catalog' ), 'type' => 'text', 'width' => 'half', 'placeholder' => sprintf( __( 'Up to %d characters', 'om-catalog' ), (int) $atts['engraving_max'] ) );
		}
		// Ring size and engraving belong with the contact details, before the
		// message and any consent box.
		$extra = array_values( array_filter( $fields, static function ( $f ) { return in_array( $f['key'], array( 'ring_size', 'engraving' ), true ) && ! isset( $f['required'] ); } ) );
		if ( $extra ) {
			$rest = array_values( array_filter( $fields, static function ( $f ) use ( $extra ) { return ! in_array( $f, $extra, true ); } ) );
			$at   = count( $rest );
			foreach ( $rest as $i => $f ) {
				if ( in_array( $f['type'], array( 'textarea', 'checkbox', 'checkboxes' ), true ) ) {
					$at = $i;
					break;
				}
			}
			$fields = array_merge( array_slice( $rest, 0, $at ), $extra, array_slice( $rest, $at ) );
		}
		// Subject: "Ring request" (or "Book a viewing" from its button); the
		// visitor picks from the site's list only when switched on.
		$subject_args = 'yes' === $atts['review_topics']
			? array()
			: array(
				'subjects'      => array_values( array_unique( array_filter( array( trim( (string) $atts['request_subject'] ), trim( (string) $atts['book_subject'] ) ), 'strlen' ) ) ),
				'subject_field' => false,
				'subject'       => trim( (string) $atts['request_subject'] ),
			);

		$pill_links = static function ( $values, $current, $key, $link ) {
			$out = '';
			foreach ( $values as $value ) {
				$out .= sprintf(
					'<a class="om-rb-pill%s" href="%s"%s>%s</a>',
					$value === $current ? ' is-active' : '',
					esc_url( $link( array( $key => $value, 'step' => 'review' ) ) ),
					$value === $current ? ' aria-current="true"' : '',
					esc_html( $value )
				);
			}
			return $out;
		};
		?>
		<div class="om-builder-review om-rb-review">
			<div class="om-rb-review-main">
				<?php if ( $setting_img ) : ?>
					<div class="om-rb-hero"><img src="<?php echo esc_url( $setting_img ); ?>" alt="<?php echo esc_attr( (string) ( $setting['title'] ?? '' ) ); ?>" />
						<?php if ( 'no' !== $atts['hero_tag'] ) : ?>
							<p class="om-rb-hero-tag">
								<span class="om-rb-hero-stone" aria-hidden="true"><?php echo OM_Diamonds::shape_icon( $later ? (string) self::setting_shape( $setting ) : (string) ( $diamond['shape'] ?? 'Round' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- static SVG. ?></span>
								<span class="om-rb-hero-text">
									<span class="om-rb-hero-line"><?php echo esc_html( $later ? __( 'Centre stone: to choose with us', 'om-catalog' ) : OM_Diamonds::describe( $diamond ) ); ?></span>
									<span class="om-rb-hero-meta"><?php echo esc_html( implode( ' · ', array_filter( array( trim( $metal . ' ' . $color ), $later ? '' : ( ! empty( $diamond['is_lab'] ) ? __( 'Lab-grown', 'om-catalog' ) : __( 'Natural', 'om-catalog' ) ) ), 'strlen' ) ) ); ?></span>
								</span>
							</p>
						<?php endif; ?>
					</div>
				<?php endif; ?>
				<div class="om-review-items">
					<div class="om-review-item">
						<div class="om-review-media"><?php if ( $setting_img ) : ?><img src="<?php echo esc_url( $setting_img ); ?>" alt="" /><?php endif; ?></div>
						<div class="om-review-info">
							<p class="om-review-kicker"><?php esc_html_e( 'Setting', 'om-catalog' ); ?></p>
							<p class="om-review-title"><a href="<?php echo esc_url( $setting_url ); ?>"><?php echo esc_html( $setting['title'] ?? $state['style'] ); ?></a></p>
							<p class="om-review-meta"><?php echo esc_html( implode( ' · ', array_filter( array( 'Style ' . $state['style'], trim( $metal . ' ' . $color ) ) ) ) ); ?></p>
							<?php if ( '' !== $head_text ) : ?>
								<p class="om-review-meta om-rb-head-note"><?php echo esc_html( $head_text ); ?></p>
							<?php endif; ?>
							<?php if ( null !== $setting_price ) : ?>
								<p class="om-review-price"><?php echo esc_html( om_format_price( $setting_price ) ); ?></p>
							<?php endif; ?>
							<a class="om-review-change" href="<?php echo esc_url( $link( array( 'step' => 'setting' ) ) ); ?>"><?php esc_html_e( 'Change setting', 'om-catalog' ); ?></a>
						</div>
					</div>
					<?php if ( $later ) : ?>
						<div class="om-review-item om-rb-later">
							<div class="om-review-media"><span class="om-rb-later-mark" aria-hidden="true">&#9671;</span></div>
							<div class="om-review-info">
								<p class="om-review-kicker"><?php esc_html_e( 'Diamond', 'om-catalog' ); ?></p>
								<p class="om-review-title"><?php esc_html_e( 'To choose with us', 'om-catalog' ); ?></p>
								<p class="om-rb-later-note"><?php esc_html_e( 'We’ll help you pick the centre stone — or set one you already have. Mention it in your request.', 'om-catalog' ); ?></p>
								<a class="om-review-change" href="<?php echo esc_url( $link( array( 'diamond' => '', 'step' => 'diamond' ) ) ); ?>"><?php esc_html_e( 'Choose a diamond now', 'om-catalog' ); ?></a>
							</div>
						</div>
					<?php else : ?>
					<div class="om-review-item">
						<div class="om-review-media">
							<?php if ( $diamond_img ) : ?>
								<img src="<?php echo esc_url( $diamond_img ); ?>" alt="" />
							<?php else : ?>
								<div class="om-dd-placeholder"><?php echo OM_Diamonds::shape_icon( (string) ( $diamond['shape'] ?? 'Round' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- static SVG. ?></div>
							<?php endif; ?>
						</div>
						<div class="om-review-info">
							<p class="om-review-kicker"><?php esc_html_e( 'Diamond', 'om-catalog' ); ?></p>
							<p class="om-review-title"><?php echo esc_html( OM_Diamonds::describe( $diamond ) ); ?></p>
							<p class="om-review-meta"><?php echo esc_html( implode( ' · ', array_filter( array( ! empty( $diamond['is_lab'] ) ? __( 'Lab-grown', 'om-catalog' ) : __( 'Natural', 'om-catalog' ), trim( ( $diamond['lab'] ?? '' ) . ' ' . ( $diamond['certificate_number'] ?? '' ) ) ), 'strlen' ) ) ); ?></p>
							<?php if ( null !== $diamond_price ) : ?>
								<p class="om-review-price"><?php echo esc_html( om_format_price( $diamond_price ) ); ?></p>
							<?php endif; ?>
							<a class="om-review-change" href="<?php echo esc_url( $link( array( 'step' => 'diamond' ) ) ); ?>"><?php esc_html_e( 'Change diamond', 'om-catalog' ); ?></a>
							<?php
							if ( 'no' !== $atts['true_size'] ) {
								echo om_true_size_button( $diamond, __( 'True size on a hand', 'om-catalog' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the helper.
							}
							?>
						</div>
					</div>
					<?php endif; ?>
				</div>
			</div>
			<aside class="om-review-summary">
				<?php if ( count( $metals ) > 1 ) : ?>
					<div class="om-rb-choice">
						<p class="om-rb-choice-label"><?php esc_html_e( 'Metal', 'om-catalog' ); ?></p>
						<div class="om-rb-pills"><?php echo $pill_links( $metals, $metal, 'metal', $link ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the closure. ?></div>
					</div>
				<?php endif; ?>
				<?php if ( count( $colors ) > 1 ) : ?>
					<div class="om-rb-choice">
						<p class="om-rb-choice-label"><?php esc_html_e( 'Colour', 'om-catalog' ); ?></p>
						<div class="om-rb-pills"><?php echo $pill_links( $colors, $color, 'color', $link ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the closure. ?></div>
					</div>
				<?php endif; ?>
				<?php if ( null !== $total ) : ?>
					<div class="om-rb-sum">
						<p><span><?php esc_html_e( 'Setting', 'om-catalog' ); ?></span><span><?php echo esc_html( om_format_price( $setting_price ) ); ?></span></p>
						<p><span><?php esc_html_e( 'Diamond', 'om-catalog' ); ?></span><span><?php echo esc_html( om_format_price( $diamond_price ) ); ?></span></p>
						<p class="om-rb-sum-total"><span><?php esc_html_e( 'Total', 'om-catalog' ); ?></span><span><?php echo esc_html( om_format_price( $total ) ); ?></span></p>
						<p class="om-review-note"><?php esc_html_e( 'Final price confirmed with your order; ring size included.', 'om-catalog' ); ?></p>
					</div>
				<?php endif; ?>
				<?php if ( 'url' === $atts['book'] && '' !== trim( (string) $atts['book_url'] ) ) : ?>
					<a class="om-rb-book" href="<?php echo esc_url( $atts['book_url'] ); ?>"><?php echo esc_html( $atts['book_text'] ); ?></a>
				<?php elseif ( 'inquiry' === $atts['book'] ) : ?>
					<a class="om-rb-book" href="<?php echo esc_attr( '#om-inquiry?subject=' . rawurlencode( (string) $atts['book_subject'] ) ); ?>"><?php echo esc_html( $atts['book_text'] ); ?></a>
				<?php endif; ?>
				<?php echo self::chat_button( $atts, 'om-rb-chat--review' ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in chat_button(). ?>
				<?php
				echo OM_Inquiry::render_form( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
					array(
						'title'       => $title,
						'style'       => $state['style'],
						'line'        => $state['line'],
						'url'         => om_absolute_url( $link() ),
						'price'       => null !== $total ? om_format_price( $total ) : '',
						'diamond'     => (string) ( $diamond['lot_number'] ?? '' ),
						'summary'     => $summary,
						'guide'       => $guide,
						'note'        => self::guide_note( $guide ),
						'heading'     => (string) $atts['request_heading'],
						'intro'       => (string) $atts['request_intro'],
						'button'      => (string) $atts['request_button'],
						'reassure'    => (string) $atts['reassure'],
						'collapsible' => false,
						'fields'      => $fields,
					) + $subject_args
				);
				$this->render_done( $atts, $title, null !== $total ? om_format_price( $total ) : '', $setting_img );
				?>
				<?php if ( 'no' !== $atts['share'] || 'no' !== $atts['email_me'] ) : ?>
					<div class="om-rb-keep">
						<?php if ( 'no' !== $atts['share'] ) : ?>
							<button type="button" class="om-rb-share" data-om-url="<?php echo esc_attr( $share ); ?>" data-om-title="<?php echo esc_attr( $title ); ?>"><?php esc_html_e( 'Share this design', 'om-catalog' ); ?></button>
						<?php endif; ?>
						<?php if ( 'no' !== $atts['email_me'] ) : ?>
							<details class="om-rb-email">
								<summary><?php esc_html_e( 'Email it to me', 'om-catalog' ); ?></summary>
								<form class="om-rb-email-form" data-om-url="<?php echo esc_attr( $share ); ?>" data-om-title="<?php echo esc_attr( $title ); ?>" novalidate>
									<label class="om-visually-hidden" for="om-rb-email-input"><?php esc_html_e( 'Your email', 'om-catalog' ); ?></label>
									<input id="om-rb-email-input" type="email" name="email" required placeholder="<?php esc_attr_e( 'Your email', 'om-catalog' ); ?>" autocomplete="email" />
									<input type="text" name="website" value="" tabindex="-1" autocomplete="off" class="om-hp" aria-hidden="true" />
									<button type="submit"><?php esc_html_e( 'Send', 'om-catalog' ); ?></button>
									<p class="om-rb-email-status" role="status"></p>
								</form>
							</details>
						<?php endif; ?>
					</div>
				<?php endif; ?>
				<?php
				$next = array_filter( array_map( 'trim', explode( '|', (string) $atts['next_steps'] ) ), 'strlen' );
				if ( $next ) :
					?>
					<div class="om-rb-next-steps">
						<p class="om-rb-next-title"><?php echo esc_html( $atts['next_title'] ); ?></p>
						<ol>
							<?php foreach ( array_slice( $next, 0, 4 ) as $one ) : ?>
								<li><?php echo esc_html( $one ); ?></li>
							<?php endforeach; ?>
						</ol>
					</div>
				<?php endif; ?>
				<a class="om-review-restart" href="<?php echo esc_url( om_builder_url() ? om_builder_url() : $link( array( 'line' => '', 'style' => '', 'metal' => '', 'color' => '', 'diamond' => '', 'first' => '', 'guide' => '', 'step' => '' ) ) ); ?>"><?php esc_html_e( 'Start over', 'om-catalog' ); ?></a>
			</aside>
		</div>
		<?php
	}

	/** The thank-you panel shown in place of the form once it is sent. */
	private function render_done( $atts, $title, $total, $img ) {
		$steps = array_slice( array_filter( array_map( 'trim', explode( '|', (string) $atts['done_steps'] ) ), 'strlen' ), 0, 4 );
		?>
		<div class="om-rb-done" hidden tabindex="-1">
			<p class="om-rb-done-mark" aria-hidden="true"></p>
			<h3 class="om-rb-done-title"><?php echo esc_html( $atts['done_title'] ); ?></h3>
			<?php if ( '' !== trim( (string) $atts['done_text'] ) ) : ?>
				<p class="om-rb-done-text"><?php echo esc_html( $atts['done_text'] ); ?></p>
			<?php endif; ?>
			<div class="om-rb-done-ring">
				<?php if ( $img ) : ?><span class="om-rb-done-img"><img src="<?php echo esc_url( $img ); ?>" alt="" /></span><?php endif; ?>
				<span class="om-rb-done-name"><?php echo esc_html( $title ); ?><?php if ( '' !== $total ) : ?><span class="om-rb-done-total"><?php echo esc_html( $total ); ?></span><?php endif; ?></span>
			</div>
			<?php if ( $steps ) : ?>
				<p class="om-rb-next-title"><?php echo esc_html( $atts['next_title'] ); ?></p>
				<ol class="om-rb-done-steps">
					<?php foreach ( $steps as $one ) : ?>
						<li><?php echo esc_html( $one ); ?></li>
					<?php endforeach; ?>
				</ol>
			<?php endif; ?>
			<?php if ( 'url' === $atts['book'] && '' !== trim( (string) $atts['book_url'] ) ) : ?>
				<a class="om-rb-book om-rb-book--done" href="<?php echo esc_url( $atts['book_url'] ); ?>"><?php echo esc_html( $atts['book_text'] ); ?></a>
			<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * "Email it to me": sends the visitor a link to their design (and the
	 * store a copy, as a lead). Rate-limited per address and per IP.
	 */
	public function handle_email() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public, rate-limited, sends only to the address given.
		$email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
		$url   = isset( $_POST['url'] ) ? esc_url_raw( wp_unslash( $_POST['url'] ) ) : '';
		$title = isset( $_POST['title'] ) ? mb_substr( sanitize_text_field( wp_unslash( $_POST['title'] ) ), 0, 160 ) : '';
		$trap  = isset( $_POST['website'] ) ? (string) wp_unslash( $_POST['website'] ) : '';
		// phpcs:enable
		$ok = __( 'Sent — check your inbox.', 'om-catalog' );
		if ( '' !== $trap ) {
			wp_send_json_success( array( 'message' => $ok ) );
		}
		if ( ! is_email( $email ) ) {
			wp_send_json_error( array( 'message' => __( 'Please enter a valid email address.', 'om-catalog' ) ) );
		}
		// Only links to this site's builder.
		if ( '' === $url || wp_parse_url( $url, PHP_URL_HOST ) !== wp_parse_url( home_url(), PHP_URL_HOST ) || false === strpos( $url, 'rb_' ) ) {
			wp_send_json_error( array( 'message' => __( 'Something went wrong. Please try again.', 'om-catalog' ) ) );
		}
		$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		foreach ( array( 'om_rbmail_ip_' . md5( $ip ) => 6, 'om_rbmail_to_' . md5( strtolower( $email ) ) => 3 ) as $key => $limit ) {
			$count = (int) get_transient( $key );
			if ( $count >= $limit ) {
				wp_send_json_error( array( 'message' => __( 'Please try again a little later.', 'om-catalog' ) ) );
			}
			set_transient( $key, $count + 1, HOUR_IN_SECONDS );
		}

		$site  = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		$store = OM_Emails::shop_address();
		$vars  = array(
			'customer_email' => $email,
			'design'         => $title,
		);
		$sent = OM_Emails::send( 'design_customer', $email, $vars, '', $url, array( 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', ',', '"' ), '', $site ) . ' <' . $store . '>' ) );
		if ( ! $sent ) {
			wp_send_json_error( array( 'message' => __( 'The email could not be sent. Please try again.', 'om-catalog' ) ) );
		}
		// The store's copy: someone kept this design.
		OM_Emails::send( 'design_shop', $store, $vars, '', $url, array( 'Reply-To: ' . $email ) );
		self::schedule_followup( $email, $url, $title );
		wp_send_json_success( array( 'message' => $ok ) );
	}

	/**
	 * The gentle follow-up (Settings › Emails, off by default): once, some
	 * days later, at most once a month per address.
	 */
	private static function schedule_followup( $email, $url, $title ) {
		if ( ! OM_Emails::enabled( 'design_followup' ) ) {
			return;
		}
		$key = 'om_rbfollow_' . md5( strtolower( $email ) );
		if ( get_transient( $key ) ) {
			return;
		}
		$days = max( 1, min( 30, (int) ( OM_Emails::get( 'design_followup' )['days'] ?? 3 ) ) );
		set_transient( $key, 1, max( 30, $days + 1 ) * DAY_IN_SECONDS );
		wp_schedule_single_event( time() + $days * DAY_IN_SECONDS, 'om_design_followup', array( $email, $url, $title, time() ) );
	}

	/** Sends the follow-up unless they have written to the shop since. */
	public function send_followup( $email, $url, $title, $since = 0 ) {
		if ( ! is_email( $email ) || ! OM_Emails::enabled( 'design_followup' ) ) {
			return;
		}
		if ( class_exists( 'OM_Inquiry' ) ) {
			$asked = get_posts(
				array(
					'post_type'      => OM_Inquiry::POST_TYPE,
					'post_status'    => 'any',
					'posts_per_page' => 1,
					'fields'         => 'ids',
					'date_query'     => array( array( 'after' => gmdate( 'Y-m-d H:i:s', (int) $since - 60 ), 'column' => 'post_date_gmt' ) ),
					'meta_query'     => array( array( 'key' => '_om_email', 'value' => $email ) ), // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query -- rare, one row.
				)
			);
			if ( $asked ) {
				return;
			}
		}
		$site = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		OM_Emails::send(
			'design_followup',
			$email,
			array(
				'customer_email' => $email,
				'design'         => $title,
			),
			'',
			$url,
			array( 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', ',', '"' ), '', $site ) . ' <' . OM_Emails::shop_address() . '>' )
		);
	}
}
