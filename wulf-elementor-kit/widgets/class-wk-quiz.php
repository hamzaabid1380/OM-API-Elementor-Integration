<?php
/**
 * Ring style quiz: four picture questions (diamond shape, setting style, metal, budget), then
 * three matching rings from the catalog, the top one turning in the chosen metal. It ends with
 * "Book to try these on" or "Email me my matches". The budget answer is passed on with the
 * booking or email; it never hides rings (setting prices alone would mislead).
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Quiz_Widget extends WK_Widget {

	protected $key = 'quiz';

	const SHAPES = array( 'round', 'oval', 'cushion', 'emerald', 'princess', 'pear', 'marquise', 'radiant' );
	const ARTS   = array( 'solitaire', 'hidden', 'halo', 'pave', 'three', 'vintage' );

	public function get_title() {
		return __( 'Wulf · Ring style quiz', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-check-circle-o';
	}

	public function get_keywords() {
		return array( 'wulf', 'quiz', 'ring', 'finder', 'style', 'match' );
	}

	public static function shape_names() {
		return array(
			'round' => __( 'Round', 'wulf-kit' ), 'oval' => __( 'Oval', 'wulf-kit' ), 'cushion' => __( 'Cushion', 'wulf-kit' ), 'emerald' => __( 'Emerald', 'wulf-kit' ),
			'princess' => __( 'Princess', 'wulf-kit' ), 'pear' => __( 'Pear', 'wulf-kit' ), 'marquise' => __( 'Marquise', 'wulf-kit' ), 'radiant' => __( 'Radiant', 'wulf-kit' ),
		);
	}

	public static function metal_names() {
		return array( 'yellow' => __( 'Yellow gold', 'wulf-kit' ), 'white' => __( 'White gold', 'wulf-kit' ), 'rose' => __( 'Rose gold', 'wulf-kit' ) );
	}

	/** Catalog rings with their style group and center shape (rings without our own films show a photo). */
	public static function default_rings() {
		$rings = array(
			array( '51157-E', 'Oval Hidden Halo Engagement Ring', '$1,350', 'engagement-rings/51157-E-6X4/', 'Hidden halo', 'oval', array( 'white', 'yellow' ) ),
			array( '51156-E', 'Emerald Cut Hidden Halo Engagement Ring', '$1,645', 'engagement-rings/51156-E-7.5X5.5/', 'Hidden halo', 'emerald', array( 'white', 'yellow', 'rose' ) ),
			array( '51162-E', 'Oval Hidden Halo Engagement Ring, Diamond Band', '$2,383', 'engagement-rings/51162-E-8X6/', 'Hidden halo', 'oval', array( 'white', 'rose' ) ),
			array( '85121', 'Round 4-Prong Solitaire Engagement Ring', '$1,561', 'engagement-rings/85121-2/', 'Solitaire', 'round', array( 'white' ) ),
			array( '85264', 'Tulip Solitaire Engagement Ring', '$1,144', 'engagement-rings/85264-1/', 'Solitaire', 'round', array( 'white' ) ),
			array( '84842', 'Single Row Diamond Engagement Ring', '$2,650', 'engagement-rings/84842-2/', 'Diamond band', 'round', array( 'white' ) ),
			array( '85158', 'Accented Round Engagement Ring', '$2,317', 'engagement-rings/85158-2/', 'Diamond band', 'round', array( 'white' ) ),
			array( '83364', '3-Stone Single Row Engagement Ring', '$4,540', 'engagement-rings/83364-25/', 'Three stone', 'emerald', array( 'white', 'yellow', 'rose' ) ),
			array( '85275', 'Nature Inspired Engagement Ring', '$1,510', 'engagement-rings/85275-1/', 'Nature inspired', 'round', array( 'white', 'yellow', 'rose' ) ),
			array( '83438', 'Single Row Trellis Prong Set Engagement Ring', '$1,921', 'engagement-rings/83438-5X3/', 'Diamond band', 'emerald', array() ),
			array( '51163-E', 'Hidden Halo Emerald Cut Engagement Ring', '$2,282', 'engagement-rings/51163-E-7.5X5.5/', 'Hidden halo', 'emerald', array() ),
		);
		$out = array();
		foreach ( $rings as $x ) {
			$it = self::demo_product( $x[0], $x[1], $x[2], $x[3], 'white', $x[6] ) + array( 'style' => $x[4], 'shape' => $x[5] );
			if ( ! $x[6] ) {
				$it['has_video'] = '';
				$it['om_fill']   = '';
				$it['metals']    = array( 'white' );
			}
			$out[] = $it;
		}
		return $out;
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'quiz', 'tone' => 'dark' ) );
		$this->head_controls( array(
			'eyebrow' => __( 'Ring style quiz', 'wulf-kit' ),
			'title'   => __( 'Find your *ring style* in four taps.', 'wulf-kit' ),
			'lead'    => __( 'Four picture questions, then three rings from our catalog that suit you. Come and try them on.', 'wulf-kit' ),
			'align'   => 'center',
		) );

		$this->start_controls_section( 'c_q', array( 'label' => __( 'Questions', 'wulf-kit' ) ) );
		$this->add_control( 'points', array( 'label' => __( 'Small promises under the title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'About 30 seconds | No email needed', 'wulf-kit' ), 'label_block' => true, 'description' => __( 'Separate with |. Leave empty to hide.', 'wulf-kit' ) ) );
		$this->add_control( 'q1', array( 'label' => __( 'Question 1 (diamond shape)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Which diamond shape catches your eye?', 'wulf-kit' ), 'label_block' => true, 'separator' => 'before' ) );
		$this->add_control( 'shapes', array(
			'label'    => __( 'Shapes to offer', 'wulf-kit' ),
			'type'     => Controls_Manager::SELECT2,
			'multiple' => true,
			'default'  => array( 'round', 'oval', 'cushion', 'emerald', 'princess', 'pear' ),
			'options'  => self::shape_names(),
		) );
		$this->add_control( 'q2', array( 'label' => __( 'Question 2 (setting style)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Which setting feels like you?', 'wulf-kit' ), 'label_block' => true, 'separator' => 'before' ) );
		$this->add_control( 'mix', array( 'label' => __( '"Not sure" choice for the setting', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Show me a mix', 'wulf-kit' ) ) );
		$this->add_control( 'mix_text', array( 'label' => __( 'Its short line', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'A few different styles to compare.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'q3', array( 'label' => __( 'Question 3 (metal)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Which metal do you love?', 'wulf-kit' ), 'label_block' => true, 'separator' => 'before' ) );
		$this->add_control( 'q4', array( 'label' => __( 'Question 4 (budget)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'What budget feels comfortable?', 'wulf-kit' ), 'label_block' => true, 'separator' => 'before' ) );
		$this->add_control( 'q4_hint', array( 'label' => __( 'Line under question 4', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'For the whole ring. It only helps us get ready for your visit.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'budgets', array(
			'label'       => __( 'Budget choices', 'wulf-kit' ),
			'type'        => Controls_Manager::TEXTAREA,
			'rows'        => 4,
			'default'     => "Under \$2,500\n\$2,500 to \$5,000\n\$5,000 to \$10,000\n\$10,000 and up",
			'description' => __( 'One per line. The answer goes with the booking or email; it never hides rings.', 'wulf-kit' ),
		) );
		$this->add_control( 'not_sure', array( 'label' => __( '"Not sure" button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Not sure yet', 'wulf-kit' ), 'separator' => 'before' ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_styles', array( 'label' => __( 'Setting style choices', 'wulf-kit' ) ) );
		$st = new Repeater();
		$st->add_control( 'name', array( 'label' => __( 'Style group', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'Solitaire', 'description' => __( 'The same words as the "Style group" of the rings below.', 'wulf-kit' ) ) );
		$st->add_control( 'text', array( 'label' => __( 'Short line', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true ) );
		$st->add_control( 'art', array(
			'label'   => __( 'Drawing while answering', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'solitaire',
			'options' => array( 'solitaire' => __( 'Solitaire', 'wulf-kit' ), 'hidden' => __( 'Hidden halo', 'wulf-kit' ), 'halo' => __( 'Halo', 'wulf-kit' ), 'pave' => __( 'Diamond band', 'wulf-kit' ), 'three' => __( 'Three stone', 'wulf-kit' ), 'vintage' => __( 'Halo and diamond band', 'wulf-kit' ) ),
		) );
		$st->add_control( 'image', array( 'label' => __( 'Photo (white background)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'description' => __( 'Empty: the first ring of this style.', 'wulf-kit' ) ) );
		$this->add_control( 'styles', array(
			'label'       => __( 'Styles', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $st->get_controls(),
			'title_field' => '{{{ name }}}',
			'default'     => array(
				array( 'name' => 'Solitaire', 'text' => __( 'One diamond, nothing to distract from it.', 'wulf-kit' ), 'art' => 'solitaire' ),
				array( 'name' => 'Hidden halo', 'text' => __( 'A secret row of diamonds under the center stone.', 'wulf-kit' ), 'art' => 'hidden' ),
				array( 'name' => 'Diamond band', 'text' => __( 'Small diamonds along the band for extra sparkle.', 'wulf-kit' ), 'art' => 'pave' ),
				array( 'name' => 'Three stone', 'text' => __( 'Three diamonds for your past, present and future.', 'wulf-kit' ), 'art' => 'three' ),
				array( 'name' => 'Nature inspired', 'text' => __( 'Leaf and vine details, for something different.', 'wulf-kit' ), 'art' => 'vintage' ),
			),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_rings', array( 'label' => __( 'Rings to match', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'style', array( 'label' => __( 'Style group', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'Solitaire' ) );
		$r->add_control( 'shape', array( 'label' => __( 'Center diamond shape', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'round', 'options' => self::shape_names() ) );
		$this->product_fields( $r );
		$this->add_control( 'rings', array(
			'label'       => __( 'Rings', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ style }}} · {{{ name }}}',
			'default'     => self::default_rings(),
			'description' => __( 'Earlier rings win a tie, so put your favorites first.', 'wulf-kit' ),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_res', array( 'label' => __( 'Results', 'wulf-kit' ) ) );
		$this->add_control( 'r_top', array( 'label' => __( 'Above the first ring', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Your top match', 'wulf-kit' ) ) );
		$this->add_control( 'r_also', array( 'label' => __( 'Above the other two', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Also a match for you', 'wulf-kit' ) ) );
		$this->add_control( 'r_three', array( 'label' => __( 'Above the three cards', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Your three matches', 'wulf-kit' ) ) );
		$this->add_control( 'r_budget', array( 'label' => __( 'After their budget', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'We\'ll show you diamonds that fit it.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'r_see', array( 'label' => __( '"See it" link', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'See it in the catalog', 'wulf-kit' ) ) );
		$this->add_control( 'r_book', array( 'label' => __( 'Book button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Book to try these on', 'wulf-kit' ), 'separator' => 'before' ) );
		$this->add_control( 'r_mail', array( 'label' => __( 'Email button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Email me my matches', 'wulf-kit' ), 'description' => __( 'Leave empty to hide. Sends the three rings to the visitor and a copy to your shop email.', 'wulf-kit' ) ) );
		$this->add_control( 'r_fine', array( 'label' => __( 'Small print', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Free and no obligation. We\'ll set them out for your visit.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'r_again', array( 'label' => __( 'Start over', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Start over', 'wulf-kit' ) ) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->box_style( 'card', __( 'Quiz card', 'wulf-kit' ), '.qz-card', false );
		$this->start_controls_section( 's_opts', array( 'label' => __( 'Answer choices', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->start_controls_tabs( 'o_tabs' );
		foreach ( array( 'n' => array( __( 'Normal', 'wulf-kit' ), '.qz-opt' ), 'h' => array( __( 'Hover', 'wulf-kit' ), '.qz-opt:hover' ), 'a' => array( __( 'Chosen', 'wulf-kit' ), '.qz-opt[aria-pressed="true"]' ) ) as $k => $v ) {
			$this->start_controls_tab( 'o_' . $k, array( 'label' => $v[0] ) );
			$this->color( 'o_' . $k . '_c', __( 'Text', 'wulf-kit' ), $v[1] );
			$this->color( 'o_' . $k . '_bg', __( 'Background', 'wulf-kit' ), $v[1], 'background-color' );
			$this->color( 'o_' . $k . '_b', __( 'Border', 'wulf-kit' ), $v[1], 'border-color' );
			$this->end_controls_tab();
		}
		$this->end_controls_tabs();
		$this->color( 'prog', __( 'Progress line', 'wulf-kit' ), '.qz-prog span', 'background-color' );
		$this->end_controls_section();
		$this->text_style( 'q', __( 'Questions', 'wulf-kit' ), '.qz-q' );
		$this->button_style( 'b1', __( 'Book button', 'wulf-kit' ), '.qz-acts .btn-gold' );
	}

	/**
	 * The rings, style choices, budgets and shapes, as the page and the email sender both see them.
	 *
	 * @param array|null $s Settings (default: this widget's).
	 */
	public function quiz_data( $s = null ) {
		$s     = null === $s ? $this->get_settings_for_display() : $s;
		$rings = array();
		foreach ( (array) ( $s['rings'] ?? array() ) as $it ) {
			$p = $this->product_data( $it );
			if ( ! $p['media'] && ! $p['img'] ) {
				continue;
			}
			$p['style'] = trim( (string) ( $it['style'] ?? '' ) );
			$p['shape'] = in_array( $it['shape'] ?? '', self::SHAPES, true ) ? $it['shape'] : 'round';
			$rings[]    = $p;
		}
		$styles = array();
		foreach ( (array) ( $s['styles'] ?? array() ) as $st ) {
			$name = trim( (string) ( $st['name'] ?? '' ) );
			$own  = array_values( array_filter( $rings, static function ( $r ) use ( $name ) { return 0 === strcasecmp( $r['style'], $name ); } ) );
			if ( '' === $name || ! $own ) {
				continue; // A style with no rings would be a dead end.
			}
			$styles[] = array(
				'n'   => $name,
				'x'   => (string) ( $st['text'] ?? '' ),
				'art' => in_array( $st['art'] ?? '', self::ARTS, true ) ? $st['art'] : 'solitaire',
				'img' => $this->img_url( $st['image'] ?? array(), $own[0]['img'] ),
			);
		}
		$budgets = array_values( array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) ( $s['budgets'] ?? '' ) ) ) ) );
		$shapes  = array_values( array_intersect( self::SHAPES, (array) ( $s['shapes'] ?? array() ) ) );
		return array(
			'rings'   => $rings,
			'styles'  => $styles,
			'budgets' => array_slice( $budgets, 0, 6 ),
			'shapes'  => $shapes ? $shapes : array( 'round', 'oval', 'cushion', 'emerald', 'princess', 'pear' ),
		);
	}

	/** A ring filmed in all three golds, for the metal question (a metal shown with the white product photo doesn't count). */
	private static function metal_ring( $rings ) {
		foreach ( $rings as $r ) {
			$p = array();
			foreach ( array( 'yellow', 'white', 'rose' ) as $m ) {
				$x       = $r['media'][ $m ]['poster'] ?? '';
				$p[ $m ] = $x !== $r['img'] ? $x : '';
			}
			if ( count( array_unique( array_filter( $p ) ) ) === 3 ) {
				return $p;
			}
		}
		return null;
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		$d = $this->quiz_data( $s );
		if ( ! $d['rings'] ) {
			return;
		}
		$uid    = $this->get_id();
		$shapes = self::shape_names();
		$metals = self::metal_names();
		$cfg    = array(
			'uid'     => $uid,
			'rings'   => $d['rings'],
			'styles'  => array_map( static function ( $x ) { return array( 'n' => $x['n'], 'art' => $x['art'] ); }, $d['styles'] ),
			'budgets' => $d['budgets'],
			'names'   => $metals,
			'shapes'  => $shapes,
			't'       => array(
				'count'     => __( 'Question %1$d of %2$d', 'wulf-kit' ),
				'top'       => $s['r_top'],
				'also'      => $s['r_also'],
				'see'       => $s['r_see'],
				'budget'    => $s['r_budget'],
				'budgetIs'  => __( 'Your budget: %s.', 'wulf-kit' ),
				'from'      => __( 'Setting from %s', 'wulf-kit' ),
				'style'     => __( 'Style %s', 'wulf-kit' ),
				'diamond'   => __( '%s diamond', 'wulf-kit' ),
				'shapeNote' => __( 'Shown with %1$s diamond. Ask us about this style with %2$s diamond.', 'wulf-kit' ),
				'metalNote' => __( 'Shown in %1$s. Ask us about %2$s.', 'wulf-kit' ),
				'finding'   => __( 'Finding your matches…', 'wulf-kit' ),
				'sent'      => __( 'Sent. Your three matches are on their way to %s.', 'wulf-kit' ),
				'change'    => __( 'Change your %s answer', 'wulf-kit' ),
				'q'         => array( __( 'shape', 'wulf-kit' ), __( 'setting', 'wulf-kit' ), __( 'metal', 'wulf-kit' ), __( 'budget', 'wulf-kit' ) ),
				'any'       => array( __( 'Any shape', 'wulf-kit' ), __( 'A mix of styles', 'wulf-kit' ), __( 'Any metal', 'wulf-kit' ), __( 'Budget open', 'wulf-kit' ) ),
			),
		);
		$skip = static function ( $a ) use ( $s ) {
			return $s['not_sure'] ? '<button class="qz-skip" type="button" aria-pressed="false" data-a="' . esc_attr( $a ) . '" data-v="">' . esc_html( $s['not_sure'] ) . '</button>' : '';
		};
		$this->open( $s, '', $cfg );
		echo '<section class="' . esc_attr( $this->sec_class( $s, 'sec qz-sec' ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$pts = array_filter( array_map( 'trim', explode( '|', (string) $s['points'] ) ) );
		$this->head( $s, $pts ? '<ul class="qz-pts">' . implode( '', array_map( static function ( $p ) { return '<li>' . WK_Icons::svg( 'check' ) . esc_html( $p ) . '</li>'; }, $pts ) ) . '</ul>' : '' );
		echo '<div class="qz-card" data-qz-card>';

		// The stage: a drawing that follows the answers, then the top match turning.
		echo '<div class="qz-stage"><div class="qz-art swap" data-qz-art aria-hidden="true"></div><ul class="qz-picks" data-qz-picks></ul></div>';

		echo '<div class="qz-body"><div class="qz-top"><button class="qz-back" type="button" data-qz-back hidden>' . WK_Icons::svg( 'left' ) . '<span>' . esc_html__( 'Back', 'wulf-kit' ) . '</span></button><p class="qz-count" data-qz-count aria-live="polite">' . esc_html( sprintf( $cfg['t']['count'], 1, 4 ) ) . '</p><div class="qz-prog" aria-hidden="true"><span></span></div></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		// 1 · Shape
		echo '<fieldset class="qz-step" data-step="1"><legend class="qz-q" tabindex="-1">' . esc_html( $s['q1'] ) . '</legend><div class="qz-opts qz-shapes">';
		foreach ( $d['shapes'] as $sh ) {
			echo '<button class="qz-opt" type="button" aria-pressed="false" data-a="shape" data-v="' . esc_attr( $sh ) . '"><span class="qz-pic" data-shape-icon="' . esc_attr( $sh ) . '"></span><span class="qz-l">' . esc_html( $shapes[ $sh ] ) . '</span></button>';
		}
		echo '</div>' . $skip( 'shape' ) . '</fieldset>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		// 2 · Setting style (photos), with "Show me a mix" as the last tile
		echo '<fieldset class="qz-step" data-step="2" hidden><legend class="qz-q" tabindex="-1">' . esc_html( $s['q2'] ) . '</legend><div class="qz-opts qz-styles">';
		foreach ( $d['styles'] as $i => $st ) {
			echo '<button class="qz-opt qz-ph" type="button" aria-pressed="false" data-a="style" data-v="' . (int) $i . '"><span class="qz-pic"><img src="' . esc_url( $st['img'] ) . '" alt="" loading="lazy" decoding="async"></span><span class="qz-l">' . esc_html( $st['n'] ) . '</span>' . ( $st['x'] ? '<span class="qz-x">' . esc_html( $st['x'] ) . '</span>' : '' ) . '</button>';
		}
		if ( $s['mix'] ) {
			$trio = array_slice( wp_list_pluck( $d['styles'], 'img' ), 0, 3 );
			echo '<button class="qz-opt qz-ph qz-mix" type="button" aria-pressed="false" data-a="style" data-v=""><span class="qz-pic qz-trio">' . implode( '', array_map( static function ( $u ) { return '<img src="' . esc_url( $u ) . '" alt="" loading="lazy" decoding="async">'; }, $trio ) ) . '</span><span class="qz-l">' . esc_html( $s['mix'] ) . '</span>' . ( $s['mix_text'] ? '<span class="qz-x">' . esc_html( $s['mix_text'] ) . '</span>' : '' ) . '</button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div></fieldset>';

		// 3 · Metal: one ring in each gold when we have the photos, swatches otherwise
		$mr = self::metal_ring( $d['rings'] );
		echo '<fieldset class="qz-step" data-step="3" hidden><legend class="qz-q" tabindex="-1">' . esc_html( $s['q3'] ) . '</legend><div class="qz-opts qz-metals">';
		foreach ( $metals as $m => $ml ) {
			$pic = $mr ? '<span class="qz-pic qz-v0"><img src="' . esc_url( $mr[ $m ] ) . '" alt="" loading="lazy" decoding="async" data-qz-mimg="' . esc_attr( $m ) . '"></span>' : '<span class="qz-pic qz-sw"><i class="sw sw-' . esc_attr( $m ) . '"></i></span>';
			echo '<button class="qz-opt qz-ph" type="button" aria-pressed="false" data-a="metal" data-v="' . esc_attr( $m ) . '">' . $pic . '<span class="qz-l"><i class="sw sw-' . esc_attr( $m ) . '"></i>' . esc_html( $ml ) . '</span></button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div>' . $skip( 'metal' ) . '</fieldset>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		// 4 · Budget: the chosen shape, drawn a little larger each step up
		$nb = count( $d['budgets'] );
		echo '<fieldset class="qz-step" data-step="4" hidden><legend class="qz-q" tabindex="-1">' . esc_html( $s['q4'] ) . '</legend>' . ( $s['q4_hint'] ? '<p class="qz-hint">' . esc_html( $s['q4_hint'] ) . '</p>' : '' ) . '<div class="qz-opts qz-budgets">';
		foreach ( $d['budgets'] as $i => $b ) {
			$f = $nb > 1 ? 0.5 + 0.5 * $i / ( $nb - 1 ) : 1;
			echo '<button class="qz-opt" type="button" aria-pressed="false" data-a="budget" data-v="' . (int) $i . '"><span class="qz-pic qz-gem" style="--f:' . esc_attr( round( $f, 2 ) ) . '" data-qz-gem></span><span class="qz-l">' . esc_html( $b ) . '</span></button>';
		}
		echo '</div>' . $skip( 'budget' ) . '</fieldset>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		echo '<p class="qz-wait" data-qz-wait hidden>' . WK_Icons::svg( 'spark' ) . '<span>' . esc_html( $cfg['t']['finding'] ) . '</span></p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		// Results (filled in by the script)
		$mail_id = 'qz-mail-' . $uid;
		echo '<div class="qz-res" data-qz-res hidden><p class="qz-lbl" data-qz-lbl></p><h3 class="h3 qz-name" data-qz-name tabindex="-1"></h3><p class="qz-meta" data-qz-meta></p><ul class="qz-why" data-qz-why></ul><p class="qz-note" data-qz-note hidden></p>';
		echo '<p class="qz-alts-h">' . esc_html( $s['r_three'] ) . '</p><div class="qz-alts" data-qz-alts role="group" aria-label="' . esc_attr( $s['r_three'] ) . '"></div>';
		echo '<p class="qz-budget" data-qz-budget hidden></p>';
		echo '<div class="qz-acts"><a class="btn btn-gold"' . self::link_attrs( array( 'url' => '#visit' ) ) . ' data-topic="Engagement ring" data-qz-book>' . esc_html( $s['r_book'] ) . ' ' . WK_Icons::svg( 'arr', 'arr' ) . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $s['r_mail'] ) {
			echo '<button class="btn btn-line" type="button" data-qz-mail-open aria-expanded="false" aria-controls="' . esc_attr( $mail_id ) . '">' . WK_Icons::svg( 'mail' ) . '<span>' . esc_html( $s['r_mail'] ) . '</span></button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div>';
		if ( $s['r_mail'] ) {
			echo '<form class="qz-mail" id="' . esc_attr( $mail_id ) . '" data-qz-mail hidden novalidate><label for="' . esc_attr( $mail_id ) . '-e">' . esc_html__( 'Your email', 'wulf-kit' ) . '</label><div class="qz-mail-row"><input id="' . esc_attr( $mail_id ) . '-e" type="email" name="email" autocomplete="email" inputmode="email" required><button class="btn btn-ink" type="submit">' . esc_html__( 'Send my matches', 'wulf-kit' ) . '</button></div><input type="text" name="website" tabindex="-1" autocomplete="off" class="sr" aria-hidden="true"><p class="qz-mail-note">' . esc_html__( 'We\'ll send your three matches to this address.', 'wulf-kit' ) . '</p><p class="err" data-qz-err role="alert" hidden></p></form><p class="qz-sent" data-qz-sent role="status" hidden></p>';
		}
		echo '<p class="qz-fine">' . ( $s['r_fine'] ? esc_html( $s['r_fine'] ) . ' ' : '' ) . '<button class="qz-again" type="button" data-qz-again>' . esc_html( $s['r_again'] ) . '</button></p></div>';

		echo '</div></div></div></section>';
		$this->close();
	}
}
