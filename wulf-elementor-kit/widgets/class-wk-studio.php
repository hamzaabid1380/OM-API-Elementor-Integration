<?php
/**
 * Ring studio: pick a style, metal, diamond shape and size; the matching real setting turns
 * in the chosen gold, the diamond outline is drawn to scale, and the visitor can save it,
 * book a visit or go on to choose a diamond.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Studio_Widget extends WK_Widget {

	protected $key = 'studio';

	const SHAPES = array( 'round', 'oval', 'cushion', 'emerald', 'princess', 'pear', 'marquise', 'radiant' );

	public function get_title() {
		return __( 'Wulf · Ring studio', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-product-images';
	}

	private static function shape_names() {
		return array(
			'round' => __( 'Round', 'wulf-kit' ), 'oval' => __( 'Oval', 'wulf-kit' ), 'cushion' => __( 'Cushion', 'wulf-kit' ), 'emerald' => __( 'Emerald', 'wulf-kit' ),
			'princess' => __( 'Princess', 'wulf-kit' ), 'pear' => __( 'Pear', 'wulf-kit' ), 'marquise' => __( 'Marquise', 'wulf-kit' ), 'radiant' => __( 'Radiant', 'wulf-kit' ),
		);
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'studio', 'tone' => 'ivory' ) );
		$this->head_controls( array( 'eyebrow' => __( 'Design your ring', 'wulf-kit' ), 'title' => __( 'Now, make it yours.', 'wulf-kit' ), 'lead' => __( 'Pick a style and diamond shape to see real settings from our catalog, turning. Then choose your diamond, here or at the counter.', 'wulf-kit' ) ) );

		$this->start_controls_section( 'c_rings', array( 'label' => __( 'Settings to show', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'style', array( 'label' => __( 'Style group', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'Solitaire', 'description' => __( 'Rings with the same group share a style button, e.g. Hidden halo.', 'wulf-kit' ) ) );
		$r->add_control( 'shape', array( 'label' => __( 'Center diamond shape', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'round', 'options' => self::shape_names() ) );
		$this->product_fields( $r );
		$rings = array(
			array( '51157-E', 'Oval Hidden Halo Engagement Ring', '$1,350', 'engagement-rings/51157-E-6X4/', 'Hidden halo', 'oval', array( 'white', 'yellow' ) ),
			array( '51162-E', 'Oval Hidden Halo Engagement Ring, Diamond Band', '$2,383', 'engagement-rings/51162-E-8X6/', 'Hidden halo', 'oval', array( 'white', 'rose' ) ),
			array( '51156-E', 'Emerald Cut Hidden Halo Engagement Ring', '$1,645', 'engagement-rings/51156-E-7.5X5.5/', 'Hidden halo', 'emerald', array( 'white', 'yellow', 'rose' ) ),
			array( '51163-E', 'Hidden Halo Emerald Cut Engagement Ring', '$2,282', 'engagement-rings/51163-E-7.5X5.5/', 'Hidden halo', 'emerald', array() ),
			array( '85121', 'Round 4-Prong Solitaire Engagement Ring', '$1,561', 'engagement-rings/85121-2/', 'Solitaire', 'round', array( 'white' ) ),
			array( '85264', 'Tulip Solitaire Engagement Ring', '$1,144', 'engagement-rings/85264-1/', 'Solitaire', 'round', array( 'white' ) ),
			array( '84842', 'Single Row Diamond Engagement Ring', '$2,650', 'engagement-rings/84842-2/', 'Diamond band', 'round', array( 'white' ) ),
			array( '85158', 'Accented Round Engagement Ring', '$2,317', 'engagement-rings/85158-2/', 'Diamond band', 'round', array( 'white' ) ),
			array( '83438', 'Single Row Trellis Prong Set Engagement Ring', '$1,921', 'engagement-rings/83438-5X3/', 'Diamond band', 'emerald', array() ),
			array( '83364', '3-Stone Single Row Engagement Ring', '$4,540', 'engagement-rings/83364-25/', 'Three stone', 'emerald', array( 'white', 'yellow', 'rose' ) ),
			array( '85275', 'Nature Inspired Engagement Ring', '$1,510', 'engagement-rings/85275-1/', 'Accented', 'round', array( 'white', 'yellow', 'rose' ) ),
			array( '85255', 'Scattered Diamond Engagement Ring', '$17,521', 'engagement-rings/85255-1/', 'Accented', 'round', array() ),
		);
		$def = array();
		foreach ( $rings as $x ) {
			$it = self::demo_product( $x[0], $x[1], $x[2], $x[3], 'white', $x[6] ) + array( 'style' => $x[4], 'shape' => $x[5] );
			if ( ! $x[6] ) {
				$it['has_video'] = '';
				$it['om_fill']   = '';
				$it['metals']    = array( 'white' );
			}
			$def[] = $it;
		}
		$this->add_control( 'rings', array(
			'label'       => __( 'Settings', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ style }}} · {{{ name }}}',
			'default'     => $def,
		) );
		$this->add_control( 'start', array( 'label' => __( 'Start with setting number', 'wulf-kit' ), 'type' => Controls_Manager::NUMBER, 'default' => 1, 'min' => 1 ) );
		$this->add_control( 'start_metal', array( 'label' => __( 'Start with metal', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'white', 'options' => array( 'white' => __( 'White gold', 'wulf-kit' ), 'yellow' => __( 'Yellow gold', 'wulf-kit' ), 'rose' => __( 'Rose gold', 'wulf-kit' ) ) ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_steps', array( 'label' => __( 'Steps & wording', 'wulf-kit' ) ) );
		$this->add_control( 'l_style', array( 'label' => __( 'Step 1', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Style', 'wulf-kit' ) ) );
		$this->add_control( 'l_metal', array( 'label' => __( 'Step 2', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Metal', 'wulf-kit' ) ) );
		$this->add_control( 'l_shape', array( 'label' => __( 'Step 3', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Diamond shape', 'wulf-kit' ) ) );
		$this->add_control( 'l_size', array( 'label' => __( 'Step 4', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Diamond size', 'wulf-kit' ) ) );
		$this->add_control( 'carats', array( 'label' => __( 'Carat stops', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '0.5, 0.75, 1, 1.5, 2, 3' ) );
		$this->add_control( 'carat_start', array( 'label' => __( 'Start at (carat)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '1.5' ) );
		$this->add_control( 'size_note', array( 'label' => __( 'Under the size outline', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Drawn in proportion. You\'ll pick the exact diamond next.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'see_link', array( 'label' => __( '"See it" link text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'See it in the catalog', 'wulf-kit' ) ) );
		$this->add_control( 'go_text', array( 'label' => __( 'Main button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Choose a diamond for this setting', 'wulf-kit' ), 'separator' => 'before' ) );
		$this->add_control( 'go_url', array(
			'label'       => __( 'Main button goes to', 'wulf-kit' ),
			'type'        => Controls_Manager::TEXT,
			'default'     => '',
			'placeholder' => home_url( '/ring-builder/?setting={style}&metal={metal}&shape={shape}&carat={carat}' ),
			'description' => __( 'Your ring builder. {style}, {metal}, {shape} and {carat} are filled in. Empty: the setting\'s own link.', 'wulf-kit' ),
		) );
		$this->add_control( 'save_text', array( 'label' => __( 'Save button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Add to my tray', 'wulf-kit' ) ) );
		$this->add_control( 'book_text', array( 'label' => __( 'Book button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'See it in person', 'wulf-kit' ) ) );
		$this->add_control( 'note', array( 'label' => __( 'Small note', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => __( '*Every ring includes free cleaning & inspection*, whenever you stop by.', 'wulf-kit' ), 'description' => __( '*Stars* make words bold.', 'wulf-kit' ) ) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->box_style( 'card', __( 'Studio card', 'wulf-kit' ), '.studio-card', false );
		$this->start_controls_section( 's_opts', array( 'label' => __( 'Option buttons', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->start_controls_tabs( 'o_tabs' );
		foreach ( array( 'n' => array( __( 'Normal', 'wulf-kit' ), '.opt' ), 'h' => array( __( 'Hover', 'wulf-kit' ), '.opt:hover' ), 'a' => array( __( 'Chosen', 'wulf-kit' ), '.opt[aria-checked="true"]' ) ) as $k => $v ) {
			$this->start_controls_tab( 'o_' . $k, array( 'label' => $v[0] ) );
			$this->color( 'o_' . $k . '_c', __( 'Text', 'wulf-kit' ), '.controls ' . $v[1] );
			$this->color( 'o_' . $k . '_bg', __( 'Background', 'wulf-kit' ), '.controls ' . $v[1], 'background-color' );
			$this->color( 'o_' . $k . '_b', __( 'Border', 'wulf-kit' ), '.controls ' . $v[1], 'border-color' );
			$this->end_controls_tab();
		}
		$this->end_controls_tabs();
		$this->add_responsive_control( 'o_radius', array(
			'label'     => __( 'Corner radius', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'separator' => 'before',
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .controls .opt' => 'border-radius: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
		$this->text_style( 'step', __( 'Step headings', 'wulf-kit' ), '.ctl-head b', false, true, array(
			'num' => array( 'label' => __( 'Number circle', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .ctl-head b span' => 'border-color: {{VALUE}}; color: {{VALUE}};' ) ),
		) );
		$this->text_style( 'shown', __( '"Shown" line', 'wulf-kit' ), '.shown' );
		$this->start_controls_section( 's_size', array( 'label' => __( 'Size slider & outline', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'rng', __( 'Slider fill', 'wulf-kit' ), '.controls input[type=range]', '--fill' );
		$this->color( 'size_bg', __( 'Outline circle', 'wulf-kit' ), '.size-svg circle', 'fill' );
		$this->color( 'size_line', __( 'Outline', 'wulf-kit' ), '.size-svg polygon', 'stroke' );
		$this->end_controls_section();
		$this->button_style( 'go', __( 'Main button', 'wulf-kit' ), '.studio-go .btn-ink' );
		$this->button_style( 'sbtn', __( 'Save & book buttons', 'wulf-kit' ), '.studio-go .btn-line' );
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$rings = array();
		foreach ( (array) $s['rings'] as $it ) {
			$p = $this->product_data( $it );
			if ( ! $p['media'] && ! $p['img'] ) {
				continue;
			}
			$p['style'] = trim( (string) $it['style'] );
			$p['shape'] = in_array( $it['shape'], self::SHAPES, true ) ? $it['shape'] : 'round';
			$rings[]    = $p;
		}
		if ( ! $rings ) {
			return;
		}
		$styles  = array_values( array_unique( array_map( static function ( $r ) { return $r['style']; }, $rings ) ) );
		$carats  = array_values( array_filter( array_map( 'floatval', explode( ',', (string) $s['carats'] ) ) ) );
		$carats  = $carats ? $carats : array( .5, .75, 1, 1.5, 2, 3 );
		$c0      = array_search( (float) $s['carat_start'], $carats, true );
		$cfg     = array(
			'rings'  => $rings,
			'start'  => max( 0, min( count( $rings ) - 1, (int) $s['start'] - 1 ) ),
			'metal'  => $s['start_metal'],
			'carats' => $carats,
			'carat'  => false === $c0 ? (int) floor( count( $carats ) / 2 ) : (int) $c0,
			'note'   => $s['size_note'],
			'see'    => $s['see_link'],
			'go'     => $s['go_url'],
			'save'   => $s['save_text'],
		);
		$names   = self::shape_names();
		$this->open( $s, '', $cfg );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo '<div class="studio-card"><div class="preview"><div class="main slot swap" data-ring-main></div><div class="alts" data-alts aria-label="' . esc_attr__( 'Other matching designs', 'wulf-kit' ) . '"></div><p class="shown" data-shown></p></div><div class="controls">';

		echo '<fieldset class="ctl"><legend><span class="ctl-head"><b><span>1</span>' . esc_html( $s['l_style'] ) . '</b><output data-o="setting"></output></span></legend><div class="grid3" role="radiogroup" aria-label="' . esc_attr( $s['l_style'] ) . '" data-ctl="setting">';
		foreach ( $styles as $st ) {
			echo '<button class="opt" type="button" role="radio" data-v="' . esc_attr( $st ) . '">' . esc_html( $st ) . '</button>';
		}
		echo '</div></fieldset>';

		echo '<fieldset class="ctl"><legend><span class="ctl-head"><b><span>2</span>' . esc_html( $s['l_metal'] ) . '</b><output data-o="metal"></output></span></legend><div class="grid3" role="radiogroup" aria-label="' . esc_attr( $s['l_metal'] ) . '" data-ctl="metal">';
		foreach ( array( 'yellow' => __( 'Yellow', 'wulf-kit' ), 'white' => __( 'White', 'wulf-kit' ), 'rose' => __( 'Rose', 'wulf-kit' ) ) as $m => $ml ) {
			echo '<button class="opt" type="button" role="radio" data-v="' . esc_attr( $m ) . '"><i class="sw sw-' . esc_attr( $m ) . '"></i>' . esc_html( $ml ) . '</button>';
		}
		echo '</div></fieldset>';

		echo '<fieldset class="ctl"><legend><span class="ctl-head"><b><span>3</span>' . esc_html( $s['l_shape'] ) . '</b><output data-o="shape"></output></span></legend><div class="shape-opts" role="radiogroup" aria-label="' . esc_attr( $s['l_shape'] ) . '" data-ctl="shape">';
		foreach ( self::SHAPES as $sh ) {
			echo '<button class="opt" type="button" role="radio" data-v="' . esc_attr( $sh ) . '"><span data-shape-icon="' . esc_attr( $sh ) . '"></span>' . esc_html( $names[ $sh ] ) . '</button>';
		}
		echo '</div><p class="hint" data-hint aria-live="polite"></p></fieldset>';

		echo '<fieldset class="ctl"><legend><span class="ctl-head"><b><span>4</span>' . esc_html( $s['l_size'] ) . '</b><output data-o="carat"></output></span></legend>';
		echo '<input type="range" min="0" max="' . (int) ( count( $carats ) - 1 ) . '" step="1" value="' . (int) $cfg['carat'] . '" aria-label="' . esc_attr( $s['l_size'] ) . '" data-carat>';
		echo '<div class="ticks" aria-hidden="true">';
		foreach ( $carats as $c ) {
			echo '<span>' . esc_html( rtrim( rtrim( number_format( $c, 2 ), '0' ), '.' ) ) . '</span>';
		}
		echo '</div><div class="size-line"><svg class="size-svg" width="90" height="90" viewBox="0 0 90 90" aria-hidden="true"><circle cx="45" cy="45" r="44" fill="#f7f5f1"/><polygon fill="#fff" stroke="#0f1217" stroke-width="1.3" stroke-linejoin="round" points="45,45" data-size-poly/></svg><p data-size-txt></p></div></fieldset>';

		echo '<div class="studio-go">';
		if ( $s['go_text'] ) {
			echo '<a class="btn btn-ink" href="#" data-go>' . esc_html( $s['go_text'] ) . ' ' . WK_Icons::svg( 'arr', 'arr' ) . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '<div class="row2">';
		if ( $s['save_text'] && WK_Settings::get( 'tray' ) ) {
			echo '<button class="btn btn-line studio-save" type="button" data-save aria-pressed="false">' . esc_html( $s['save_text'] ) . '</button>';
		}
		if ( $s['book_text'] ) {
			echo '<a class="btn btn-line"' . self::link_attrs( array( 'url' => '#visit' ) ) . ' data-book data-topic="Engagement ring">' . esc_html( $s['book_text'] ) . '</a>';
		}
		echo '</div>';
		if ( $s['note'] ) {
			echo '<p>' . preg_replace( '/\*([^*]+)\*/', '<b>$1</b>', esc_html( $s['note'] ) ) . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div></div></div></div></section>';
		$this->close();
	}
}
