<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Ring builder: [om_ring_builder] shortcode / "OM Ring Builder" widget.
 *
 * Three steps — setting, diamond, review — in either order. All state is in
 * the page URL (rb_setting=line:style, rb_metal, rb_color, rb_diamond=lot),
 * so a design can be bookmarked or sent to someone, the page can be cached,
 * and nothing is stored per visitor. Choose the builder page under Settings
 * > OM Catalog; product pages of the builder's product lines then show a
 * "Select this setting" button and the diamond search a "Select this
 * diamond" button that lead back here.
 */
class OM_Ring_Builder {

	const PARAMS = array( 'rb_setting', 'rb_metal', 'rb_color', 'rb_diamond', 'rb_step', 'rb' );

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_shortcode( 'om_ring_builder', array( $this, 'shortcode' ) );
	}

	public function shortcode( $atts ) {
		return $this->render( (array) $atts );
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
			'step'    => in_array( $get( 'rb_step' ), array( 'setting', 'diamond', 'review' ), true ) ? $get( 'rb_step' ) : '',
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

	public function render( $atts ) {
		$atts = shortcode_atts(
			array(
				'per_page'       => 12,
				'diamond_origin' => '',
				'heading'        => '',
			),
			$atts,
			'om_ring_builder'
		);

		wp_enqueue_style( 'om-catalog-css' );
		wp_enqueue_script( 'om-catalog-js' );

		$state   = self::state();
		$setting = ( $state['line'] && $state['style'] ) ? OM_API_Client::get_product_by_style( $state['line'], $state['style'] ) : null;
		$diamond = '' !== $state['diamond'] ? OM_API_Client::get_diamond( $state['diamond'] ) : null;

		$has_setting = $setting && ! is_wp_error( $setting );
		$has_diamond = $diamond && ! is_wp_error( $diamond );

		// Which step to show.
		$step = $state['step'];
		if ( '' === $step ) {
			if ( $has_setting && $has_diamond ) {
				$step = 'review';
			} elseif ( $has_setting ) {
				$step = 'diamond';
			} elseif ( $has_diamond ) {
				$step = 'setting';
			} else {
				$step = 'start';
			}
		}
		if ( 'review' === $step && ! ( $has_setting && $has_diamond ) ) {
			$step = $has_setting ? 'diamond' : 'setting';
		}

		$page_url = om_builder_url();
		if ( '' === $page_url ) {
			$page_url = remove_query_arg( array_merge( self::PARAMS, OM_Shortcodes::STATE_PARAMS, OM_Diamonds::PARAMS ) );
		}
		$link = function ( $changes = array() ) use ( $state, $page_url ) {
			return add_query_arg( array_map( 'rawurlencode', self::state_args( $state, $changes ) ), $page_url );
		};

		ob_start();
		echo '<div class="om-builder om-builder--' . esc_attr( $step ) . '">';
		if ( '' !== trim( (string) $atts['heading'] ) ) {
			echo '<h2 class="om-builder-heading">' . esc_html( $atts['heading'] ) . '</h2>';
		}
		$this->render_steps( $step, $state, $setting, $diamond, $link );

		if ( $state['diamond'] && ! $has_diamond ) {
			echo '<p class="om-builder-notice">' . esc_html__( 'The diamond you picked is no longer available. Please choose another.', 'om-catalog' ) . '</p>';
		}
		if ( $state['style'] && ! $has_setting ) {
			echo '<p class="om-builder-notice">' . esc_html__( 'The setting you picked is no longer available. Please choose another.', 'om-catalog' ) . '</p>';
		}

		switch ( $step ) {
			case 'start':
				$this->render_start( $link );
				break;
			case 'setting':
				$card_query = array( 'rb' => '1' );
				if ( $has_diamond ) {
					$card_query['rb_diamond'] = $state['diamond'];
				}
				echo OM_Shortcodes::instance()->render_grid( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
					array(
						'lines'           => implode( ',', om_builder_lines() ),
						'per_page'        => (int) $atts['per_page'],
						'show_filters'    => 'yes',
						'filter_shapes'   => 'yes',
						'filter_metals'   => 'yes',
						'filter_position' => 'left',
						'filters_title'   => __( 'Settings', 'om-catalog' ),
						'show_prices'     => 'yes',
						// A chosen diamond pre-selects matching settings.
						'shape'           => $has_diamond ? (string) ( $diamond['shape'] ?? '' ) : '',
						'card_query'      => $card_query,
					),
					OM_Shortcodes::request_from_globals()
				);
				break;
			case 'diamond':
				$select_state = self::state_args( $state, array( 'step' => '' ) );
				unset( $select_state['rb_diamond'] );
				echo OM_Diamonds::instance()->render( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
					array(
						'origin'        => $atts['diamond_origin'],
						'default_shape' => $has_setting ? self::setting_shape( $setting ) : '',
						'select_state'  => $select_state,
					),
					OM_Diamonds::request_from_globals()
				);
				break;
			case 'review':
				$this->render_review( $state, $setting, $diamond, $link );
				break;
		}
		echo '</div>';
		return ob_get_clean();
	}

	private function render_steps( $step, $state, $setting, $diamond, $link ) {
		$has_setting = $setting && ! is_wp_error( $setting );
		$has_diamond = $diamond && ! is_wp_error( $diamond );
		$steps       = array(
			'setting' => array(
				'label'   => __( 'Choose a setting', 'om-catalog' ),
				'summary' => $has_setting ? (string) ( $setting['title'] ?? $state['style'] ) : '',
			),
			'diamond' => array(
				'label'   => __( 'Choose a diamond', 'om-catalog' ),
				'summary' => $has_diamond ? OM_Diamonds::describe( $diamond ) : '',
			),
			'review'  => array(
				'label'   => __( 'Review your ring', 'om-catalog' ),
				'summary' => '',
			),
		);
		echo '<ol class="om-builder-steps">';
		$n = 0;
		foreach ( $steps as $key => $def ) {
			$n++;
			$done    = ( 'setting' === $key && $has_setting ) || ( 'diamond' === $key && $has_diamond );
			$current = $key === $step;
			$can     = 'review' !== $key || ( $has_setting && $has_diamond );
			$classes = 'om-builder-step' . ( $current ? ' is-current' : '' ) . ( $done ? ' is-done' : '' );
			echo '<li class="' . esc_attr( $classes ) . '"' . ( $current ? ' aria-current="step"' : '' ) . '>';
			$inner = '<span class="om-step-num">' . ( $done && ! $current ? '&#10003;' : (int) $n ) . '</span><span class="om-step-text"><span class="om-step-label">' . esc_html( $def['label'] ) . '</span>' . ( '' !== $def['summary'] ? '<span class="om-step-summary">' . esc_html( $def['summary'] ) . '</span>' : '' ) . '</span>';
			if ( $can && ! $current ) {
				echo '<a href="' . esc_url( $link( array( 'step' => $key ) ) ) . '">' . $inner . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
			} else {
				echo '<span>' . $inner . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
			}
			echo '</li>';
		}
		echo '</ol>';
	}

	private function render_start( $link ) {
		?>
		<div class="om-builder-start">
			<a class="om-builder-choice" href="<?php echo esc_url( $link( array( 'step' => 'setting' ) ) ); ?>">
				<span class="om-builder-choice-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="24" cy="30" r="12"/><path d="M18 14l6-8 6 8-6 6z"/></svg></span>
				<span class="om-builder-choice-title"><?php esc_html_e( 'Start with a setting', 'om-catalog' ); ?></span>
				<span class="om-builder-choice-text"><?php esc_html_e( 'Find the ring design you love, then pair it with the perfect diamond.', 'om-catalog' ); ?></span>
			</a>
			<a class="om-builder-choice" href="<?php echo esc_url( $link( array( 'step' => 'diamond' ) ) ); ?>">
				<span class="om-builder-choice-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M10 18l7-9h14l7 9-14 21z"/><path d="M10 18h28M17 9l7 9 7-9M24 18v21"/></svg></span>
				<span class="om-builder-choice-title"><?php esc_html_e( 'Start with a diamond', 'om-catalog' ); ?></span>
				<span class="om-builder-choice-text"><?php esc_html_e( 'Choose your centre stone by shape, carat, colour and clarity first.', 'om-catalog' ); ?></span>
			</a>
		</div>
		<?php
	}

	private function render_review( $state, $setting, $diamond, $link ) {
		// Price the setting as a semi-mount (no centre stone) when OM offers
		// that level, in the metal/colour the customer picked.
		$levels = (array) ( $setting['levels'] ?? array() );
		$level  = in_array( 'Semi-Mount', $levels, true ) ? 'Semi-Mount' : (string) ( $setting['default_level'] ?? '' );
		$metal  = in_array( $state['metal'], (array) ( $setting['metals'] ?? array() ), true ) ? $state['metal'] : (string) ( $setting['default_metal'] ?? '' );
		$color  = in_array( $state['color'], (array) ( $setting['colors'] ?? array() ), true ) ? $state['color'] : (string) ( $setting['default_color'] ?? '' );

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
		$diamond_price = isset( $diamond['price'] ) ? om_diamond_retail( $diamond['price'] ) : null;
		$total         = ( null !== $setting_price && null !== $diamond_price ) ? $setting_price + $diamond_price : null;

		$setting_img = ! empty( $setting['images'][0] ) ? om_image_url( $setting['images'][0] ) : '';
		$diamond_img = (string) ( $diamond['image_url'] ?? '' );
		$setting_url = om_product_url( $state['line'], $state['style'] );

		$summary = sprintf(
			/* translators: 1: setting, 2: style, 3: metal/colour, 4: diamond, 5: lot. */
			__( 'Setting: %1$s (style %2$s, %3$s). Diamond: %4$s (lot %5$s).', 'om-catalog' ),
			(string) ( $setting['title'] ?? '' ),
			$state['style'],
			trim( $metal . ' ' . $color ),
			OM_Diamonds::describe( $diamond ),
			(string) ( $diamond['lot_number'] ?? '' )
		);
		?>
		<div class="om-builder-review">
			<div class="om-review-items">
				<div class="om-review-item">
					<div class="om-review-media"><?php if ( $setting_img ) : ?><img src="<?php echo esc_url( $setting_img ); ?>" alt="<?php echo esc_attr( $setting['title'] ?? '' ); ?>" /><?php endif; ?></div>
					<div class="om-review-info">
						<p class="om-review-kicker"><?php esc_html_e( 'Setting', 'om-catalog' ); ?></p>
						<p class="om-review-title"><a href="<?php echo esc_url( $setting_url ); ?>"><?php echo esc_html( $setting['title'] ?? $state['style'] ); ?></a></p>
						<p class="om-review-meta"><?php echo esc_html( implode( ' · ', array_filter( array( 'Style ' . $state['style'], trim( $metal . ' ' . $color ) ) ) ) ); ?></p>
						<p class="om-review-price"><?php echo esc_html( null !== $setting_price ? om_format_price( $setting_price ) : __( 'Price on request', 'om-catalog' ) ); ?></p>
						<a class="om-review-change" href="<?php echo esc_url( $link( array( 'step' => 'setting' ) ) ); ?>"><?php esc_html_e( 'Change setting', 'om-catalog' ); ?></a>
					</div>
				</div>
				<div class="om-review-item">
					<div class="om-review-media">
						<?php if ( $diamond_img ) : ?>
							<img src="<?php echo esc_url( $diamond_img ); ?>" alt="<?php echo esc_attr( OM_Diamonds::describe( $diamond ) ); ?>" />
						<?php else : ?>
							<div class="om-dd-placeholder"><?php echo OM_Diamonds::shape_icon( (string) ( $diamond['shape'] ?? 'Round' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- static SVG. ?></div>
						<?php endif; ?>
					</div>
					<div class="om-review-info">
						<p class="om-review-kicker"><?php esc_html_e( 'Diamond', 'om-catalog' ); ?></p>
						<p class="om-review-title"><?php echo esc_html( OM_Diamonds::describe( $diamond ) ); ?></p>
						<p class="om-review-meta"><?php echo esc_html( trim( ( $diamond['lab'] ?? '' ) . ' ' . ( $diamond['certificate_number'] ?? '' ) ) ); ?></p>
						<p class="om-review-price"><?php echo esc_html( null !== $diamond_price ? om_format_price( $diamond_price ) : __( 'Price on request', 'om-catalog' ) ); ?></p>
						<a class="om-review-change" href="<?php echo esc_url( $link( array( 'step' => 'diamond' ) ) ); ?>"><?php esc_html_e( 'Change diamond', 'om-catalog' ); ?></a>
					</div>
				</div>
			</div>
			<aside class="om-review-summary">
				<p class="om-review-total-label"><?php esc_html_e( 'Your ring', 'om-catalog' ); ?></p>
				<p class="om-review-total"><?php echo esc_html( null !== $total ? om_format_price( $total ) : __( 'Price on request', 'om-catalog' ) ); ?></p>
				<?php if ( null !== $total ) : ?>
					<p class="om-review-note"><?php esc_html_e( 'Setting and diamond. Final price confirmed with your order; ring size included.', 'om-catalog' ); ?></p>
				<?php endif; ?>
				<?php
				echo OM_Inquiry::render_form( // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
					array(
						'title'       => (string) ( $setting['title'] ?? '' ) . ' + ' . OM_Diamonds::describe( $diamond ),
						'style'       => $state['style'],
						'line'        => $state['line'],
						'url'         => om_absolute_url( $link() ),
						'price'       => null !== $total ? om_format_price( $total ) : '',
						'diamond'     => (string) ( $diamond['lot_number'] ?? '' ),
						'summary'     => $summary,
						'heading'     => __( 'Request this ring', 'om-catalog' ),
						'intro'       => __( 'Send us your design and we will confirm availability, ring size and timing.', 'om-catalog' ),
						'button'      => __( 'Send request', 'om-catalog' ),
						'collapsible' => false,
					)
				);
				?>
				<a class="om-review-restart" href="<?php echo esc_url( om_builder_url() ? om_builder_url() : $link( array( 'line' => '', 'style' => '', 'metal' => '', 'color' => '', 'diamond' => '' ) ) ); ?>"><?php esc_html_e( 'Start over', 'om-catalog' ); ?></a>
			</aside>
		</div>
		<?php
	}
}
