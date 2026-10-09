<?php
/**
 * Spotlight: one ring, large, turning in 360°, with metal buttons that switch it live
 * (and an optional choice of up to four rings). A single "wow" moment for a calm page.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Spotlight_Widget extends WK_Widget {

	protected $key = 'spotlight';

	public function get_title() {
		return __( 'Wulf · Spotlight', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-video-camera';
	}

	/** Eight favorites for the "row of ring cards" look (the page library's homepage uses them). */
	public static function favorites() {
		return array(
			self::demo_product( '83364', '3-Stone Single Row Engagement Ring', '$4,540', 'engagement-rings/83364-25/', 'rose', array( 'white', 'yellow', 'rose' ) ),
			self::demo_product( '51156-E', 'Emerald Cut Hidden Halo Engagement Ring', '$1,645', 'engagement-rings/51156-E-7.5X5.5/', 'yellow', array( 'white', 'yellow', 'rose' ) ),
			self::demo_product( '85275', 'Nature Inspired Engagement Ring', '$1,510', 'engagement-rings/85275-1/', 'white', array( 'white', 'yellow', 'rose' ) ),
			self::demo_product( '51157-E', 'Oval Hidden Halo Engagement Ring', '$1,350', 'engagement-rings/51157-E-6X4/', 'white', array( 'white', 'yellow' ) ),
			self::demo_product( '84842', 'Single Row Diamond Engagement Ring', '$2,650', 'engagement-rings/84842-2/', 'white', array( 'white' ) ),
			self::demo_product( '85158', 'Accented Round Engagement Ring', '$2,317', 'engagement-rings/85158-2/', 'white', array( 'white' ) ),
			self::demo_product( '85121', 'Round 4-Prong Solitaire Engagement Ring', '$1,561', 'engagement-rings/85121-2/', 'white', array( 'white' ) ),
			self::demo_product( '85264', 'Tulip Solitaire Engagement Ring', '$1,144', 'engagement-rings/85264-1/', 'white', array( 'white' ) ),
		);
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'spotlight', 'tone' => 'ivory' ) );
		$this->head_controls( array( 'eyebrow' => __( 'In the spotlight', 'wulf-kit' ), 'title' => __( 'Brilliance you have to see *in person*.', 'wulf-kit' ), 'lead' => __( 'Watch it turn, try it in another metal, then come and hold it. Every ring here is one we can make for you.', 'wulf-kit' ), 'align' => 'center' ) );

		$this->start_controls_section( 'c_items', array( 'label' => __( 'Rings', 'wulf-kit' ) ) );
		$r = new Repeater();
		$this->product_fields( $r );
		$this->add_control( 'items', array(
			'label'       => __( 'Rings (first one shows first; up to 8)', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ name }}}',
			'default'     => array(
				self::demo_product( '83364', '3-Stone Single Row Engagement Ring', '$4,540', 'engagement-rings/83364-25/', 'rose', array( 'white', 'yellow', 'rose' ) ),
				self::demo_product( '51156-E', 'Emerald Cut Hidden Halo Engagement Ring', '$1,645', 'engagement-rings/51156-E-7.5X5.5/', 'yellow', array( 'white', 'yellow', 'rose' ) ),
				self::demo_product( '85275', 'Nature Inspired Engagement Ring', '$1,510', 'engagement-rings/85275-1/', 'white', array( 'white', 'yellow', 'rose' ) ),
			),
		) );
		$this->add_control( 'picks', array(
			'label'       => __( 'Ring choices look', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'circles',
			'options'     => array( 'circles' => __( 'Small round photos', 'wulf-kit' ), 'cards' => __( 'A row of ring cards with names and prices (favorites)', 'wulf-kit' ) ),
			'description' => __( 'Cards turn this into your favorites row: tap a ring to see it turn in the large frame.', 'wulf-kit' ),
		) );
		$this->add_control( 'save_on', array( 'label' => __( 'Heart to save the ring on screen', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes', 'description' => __( 'Saves it to the visitor\'s tray for their visit.', 'wulf-kit' ) ) );
		$this->add_control( 'show_price', array( 'label' => __( 'Show price', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'link_text', array( 'label' => __( 'Link text under the ring', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'View this ring', 'wulf-kit' ) ) );
		$this->button_fields( 'b1', __( 'Button', 'wulf-kit' ), __( 'Book to see it in person', 'wulf-kit' ), '#visit', 'Engagement ring' );
		$this->button_fields( 'more', __( '"See all" link beside the button', 'wulf-kit' ), '', WK_Pages::url( 'engagement-rings' ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_layout', array( 'label' => __( 'Layout & video background', 'wulf-kit' ) ) );
		$this->add_control( 'layout', array(
			'label'   => __( 'Layout', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'center',
			'options' => array(
				'center'  => __( 'Centered: title, ring, then the choices', 'wulf-kit' ),
				'split'   => __( 'Side by side: words left, ring right', 'wulf-kit' ),
				'split-r' => __( 'Side by side: ring left, words right', 'wulf-kit' ),
				'wide'    => __( 'Wide: the ring fills the screen width', 'wulf-kit' ),
			),
		) );
		$this->add_control( 'shape', array(
			'label'   => __( 'Frame around the ring', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'card',
			'options' => array( 'card' => __( 'Rounded card', 'wulf-kit' ), 'circle' => __( 'Circle', 'wulf-kit' ), 'none' => __( 'No frame (the ring floats)', 'wulf-kit' ) ),
		) );
		$this->add_control( 'video_bg', array(
			'label'       => __( 'Video background', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => 'white',
			'options'     => array( 'white' => __( 'White, as filmed', 'wulf-kit' ), 'section' => __( 'Blend into the section background', 'wulf-kit' ), 'custom' => __( 'A color I choose', 'wulf-kit' ) ),
			'description' => __( 'The ring videos are filmed on white. "Blend" and "A color I choose" turn that white into the color behind it. Light colors look best (ivory, champagne, blush, pale grey); on a dark section the ring stays on white so it stays bright.', 'wulf-kit' ),
		) );
		$this->add_control( 'video_color', array(
			'label'     => __( 'Video background color', 'wulf-kit' ),
			'type'      => Controls_Manager::COLOR,
			'default'   => '#f3ede4',
			'selectors' => array( '{{WRAPPER}} .wk .spot.vb-custom .spot-ring' => 'background-color: {{VALUE}};' ),
			'condition' => array( 'video_bg' => 'custom' ),
		) );
		$this->add_control( 'glow_on', array( 'label' => __( 'Soft glow behind the ring', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->start_controls_section( 's_stage', array( 'label' => __( 'Ring stage', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'stage_w', array(
			'label'      => __( 'Size', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( 'px', '%' ),
			'range'      => array( 'px' => array( 'min' => 240, 'max' => 1000 ), '%' => array( 'min' => 30, 'max' => 100 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk .spot-ring' => 'width: {{SIZE}}{{UNIT}};' ),
		) );
		$this->color( 'stage_bg', __( 'Frame color (with a white video background)', 'wulf-kit' ), '.spot.vb-white .spot-ring', 'background-color' );
		$this->color( 'glow', __( 'Glow color', 'wulf-kit' ), '.spot-media::before', 'background-color' );
		$this->add_responsive_control( 'stage_r', array(
			'label'     => __( 'Card corners', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .spot.st-card .spot-ring' => 'border-radius: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_responsive_control( 'split_w', array(
			'label'      => __( 'Words column width, side by side (%)', 'wulf-kit' ),
			'type'       => Controls_Manager::SLIDER,
			'size_units' => array( '%' ),
			'range'      => array( '%' => array( 'min' => 25, 'max' => 60 ) ),
			'selectors'  => array( '{{WRAPPER}} .wk .spot' => '--spot-split: {{SIZE}}%;' ),
		) );
		$this->add_control( 'scale_in', array( 'label' => __( 'Grow into view while scrolling', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->end_controls_section();
		$this->start_controls_section( 's_metals', array( 'label' => __( 'Metal buttons', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'm_c', __( 'Text', 'wulf-kit' ), '.spot-metals button' );
		$this->color( 'm_bg', __( 'Background', 'wulf-kit' ), '.spot-metals button', 'background-color' );
		$this->color( 'm_bd', __( 'Border', 'wulf-kit' ), '.spot-metals button', 'border-color' );
		$this->color( 'm_hbd', __( 'Border on hover', 'wulf-kit' ), '.spot-metals button:hover', 'border-color' );
		$this->color( 'm_on_c', __( 'Chosen text', 'wulf-kit' ), '.spot-metals button[aria-checked="true"]' );
		$this->color( 'm_on_bg', __( 'Chosen background', 'wulf-kit' ), '.spot-metals button[aria-checked="true"]', 'background-color' );
		$this->end_controls_section();
		$this->start_controls_section( 's_pick', array( 'label' => __( 'Ring choices', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'p_bd', __( 'Circle border', 'wulf-kit' ), '.spot-pick button', 'border-color' );
		$this->color( 'p_hbd', __( 'Circle border on hover', 'wulf-kit' ), '.spot-pick button:hover', 'border-color' );
		$this->color( 'p_on', __( 'Chosen circle border', 'wulf-kit' ), '.spot-pick button[aria-pressed="true"]', 'border-color' );
		$this->end_controls_section();
		$this->text_style( 'name', __( 'Ring name', 'wulf-kit' ), '.spot-cap b' );
		$this->text_style( 'meta', __( 'Price line', 'wulf-kit' ), '.spot-cap' );
		$this->text_style( 'lk', __( 'Link', 'wulf-kit' ), '.spot-cap a', true );
		$this->button_style( 'b1', __( 'Button', 'wulf-kit' ), '.spot-cta .btn' );
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$items = array();
		foreach ( array_slice( (array) $s['items'], 0, 8 ) as $it ) {
			$d = $this->product_data( $it );
			if ( $d['media'] ) {
				$items[] = $d;
			}
		}
		if ( ! $items ) {
			return;
		}
		$f     = $items[0];
		$m     = $f['m'];
		$names = array( 'white' => __( 'White gold', 'wulf-kit' ), 'yellow' => __( 'Yellow gold', 'wulf-kit' ), 'rose' => __( 'Rose gold', 'wulf-kit' ) );
		$this->open( $s, '', array( 'items' => $items, 'names' => $names, 'price' => 'yes' === $s['show_price'], 'link' => $s['link_text'] ) );
		$lay   = in_array( $s['layout'] ?? 'center', array( 'center', 'split', 'split-r', 'wide' ), true ) ? $s['layout'] : 'center';
		$shape = in_array( $s['shape'] ?? 'card', array( 'card', 'circle', 'none' ), true ) ? $s['shape'] : 'card';
		$vbg   = in_array( $s['video_bg'] ?? 'white', array( 'white', 'section', 'custom' ), true ) ? $s['video_bg'] : 'white';
		$cls   = $this->sec_class( $s, 'sec spot' ) . ' lay-' . $lay . ' st-' . $shape . ' vb-' . $vbg . ( 'yes' === ( $s['glow_on'] ?? 'yes' ) ? '' : ' glow-off' ) . ( 'yes' === $s['scale_in'] ? ' scale-in' : '' );
		echo '<section class="' . esc_attr( $cls ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap spot-grid"><div class="spot-head">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo '</div>';
		$med = $f['media'][ $m ];
		$cards = 'cards' === ( $s['picks'] ?? 'circles' );
		echo '<div class="spot-media"><div class="spot-ring swap pv" data-spot-ring>';
		if ( 'yes' === ( $s['save_on'] ?? '' ) && WK_Settings::get( 'tray' ) ) {
			// Inside the frame, before the film: changing ring or metal swaps only the film.
			/* translators: %s: ring name */
			echo '<button class="spot-save" type="button" aria-pressed="false" data-spot-save aria-label="' . esc_attr( sprintf( __( 'Save %s to my tray', 'wulf-kit' ), $f['n'] ) ) . '">' . WK_Icons::svg( 'heart' ) . '</button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( $med['v'] ) {
			echo '<video muted loop playsinline preload="none" poster="' . esc_url( $med['poster'] ) . '" data-src="' . esc_url( $med['v'] ) . '" aria-label="' . esc_attr( $f['n'] ) . '"></video>';
		} else {
			echo '<img src="' . esc_url( $med['poster'] ) . '" alt="' . esc_attr( $f['n'] ) . '">';
		}
		echo '</div></div><div class="spot-ctl">';
		echo '<div class="spot-metals" role="radiogroup" aria-label="' . esc_attr__( 'Metal', 'wulf-kit' ) . '" data-spot-metals>';
		foreach ( array_keys( $f['media'] ) as $mm ) {
			$on = $mm === $m;
			echo '<button type="button" role="radio" aria-checked="' . ( $on ? 'true' : 'false' ) . '" data-m="' . esc_attr( $mm ) . '"><i class="sw sw-' . esc_attr( $mm ) . '"></i>' . esc_html( $names[ $mm ] ) . '</button>';
		}
		echo '</div>';
		$price = 'yes' === $s['show_price'] && $f['p'] ? ' · ' . esc_html__( 'From', 'wulf-kit' ) . ' ' . esc_html( $f['p'] ) : '';
		$link  = $s['link_text'] && $f['u'] ? ' <a href="' . esc_url( $f['u'] ) . '"' . ( $f['ext'] ? ' target="_blank" rel="noopener"' : '' ) . '>' . esc_html( $s['link_text'] ) . ' ' . WK_Icons::svg( 'arr' ) . '</a>' : '';
		echo '<p class="spot-cap" data-spot-cap><b>' . esc_html( $f['n'] ) . '</b>' . $price . $link . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( count( $items ) > 1 && $cards ) {
			// Favorites row: each card loads its ring into the large frame.
			echo '<div class="spot-cards" data-spot-pick role="group" aria-label="' . esc_attr( wp_strip_all_tags( (string) ( $s['title'] ?? '' ) ) ) . '">';
			foreach ( $items as $i => $it ) {
				echo '<button type="button" aria-pressed="' . ( 0 === $i ? 'true' : 'false' ) . '" data-i="' . (int) $i . '"><span class="spc-img"><img src="' . esc_url( $it['img'] ) . '" alt="" loading="lazy" decoding="async"></span><span class="spc-n">' . esc_html( $it['n'] ) . '</span>' . ( 'yes' === $s['show_price'] && $it['p'] ? '<span class="spc-p">' . esc_html__( 'From', 'wulf-kit' ) . ' ' . esc_html( $it['p'] ) . '</span>' : '' ) . '</button>';
			}
			echo '</div>';
		} elseif ( count( $items ) > 1 ) {
			echo '<div class="spot-pick" data-spot-pick>';
			foreach ( $items as $i => $it ) {
				echo '<button type="button" aria-pressed="' . ( 0 === $i ? 'true' : 'false' ) . '" data-i="' . (int) $i . '" aria-label="' . esc_attr( $it['n'] ) . '"><img src="' . esc_url( $it['img'] ) . '" alt="" loading="lazy"></button>';
			}
			echo '</div>';
		}
		$b = $this->button( $s, 'b1', 'btn btn-main ' . ( 'dark' === ( $s['tone'] ?? '' ) ? 'btn-gold' : 'btn-ink' ), true ) . $this->button( $s, 'more', 'link', true );
		if ( $b ) {
			echo '<div class="spot-cta">' . $b . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div>';
		echo '</div></section>';
		$this->close();
	}
}
