<?php
/**
 * Site header: logo, menu with dropdown panels (built from a WordPress menu), phone, tray,
 * "Book a visit" button and a full-screen phone menu. Dark over the hero, white once scrolled.
 *
 * WordPress menu → header:
 *  - a top item with sub-items opens a panel;
 *  - a sub-item that has its own sub-items becomes a column with a heading;
 *  - a sub-item with the CSS class "wk-shapes" becomes the eight diamond-shape icons;
 *  - a sub-item with the CSS class "wk-feature" becomes a highlighted card;
 *  - a menu item's Description shows as the small grey line under it.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;

class WK_Header_Widget extends WK_Widget {

	protected $key = 'header';

	public function get_title() {
		return __( 'Wulf · Header', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-header';
	}

	private function menus() {
		$out = array( '' => __( 'Built-in Wulf menu', 'wulf-kit' ) );
		foreach ( wp_get_nav_menus() as $m ) {
			$out[ (string) $m->term_id ] = $m->name;
		}
		return $out;
	}

	protected function register_controls() {
		$this->start_controls_section( 'c_logo', array( 'label' => __( 'Logo', 'wulf-kit' ) ) );
		$this->add_control( 'logo_type', array(
			'label'   => __( 'Logo', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'mark',
			'options' => array( 'mark' => __( 'Monogram + name', 'wulf-kit' ), 'image' => __( 'Image', 'wulf-kit' ) ),
		) );
		$this->add_control( 'logo_word', array( 'label' => __( 'Name', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'WULF', 'condition' => array( 'logo_type' => 'mark' ) ) );
		$this->add_control( 'logo_sub', array( 'label' => __( 'Second line', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'DIAMOND JEWELERS', 'condition' => array( 'logo_type' => 'mark' ) ) );
		$this->add_control( 'logo_img', array( 'label' => __( 'Logo for the dark header', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'condition' => array( 'logo_type' => 'image' ) ) );
		$this->add_control( 'logo_img2', array( 'label' => __( 'Logo for the white header (optional)', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'condition' => array( 'logo_type' => 'image' ) ) );
		$this->add_responsive_control( 'logo_h', array(
			'label'     => __( 'Logo height', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 16, 'max' => 90 ) ),
			'default'   => array( 'unit' => 'px', 'size' => 40 ),
			'selectors' => array( '{{WRAPPER}} .wk .logo img' => 'height: {{SIZE}}{{UNIT}}; width: auto;' ),
			'condition' => array( 'logo_type' => 'image' ),
		) );
		$this->add_control( 'logo_link', array( 'label' => __( 'Logo link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'default' => array( 'url' => home_url( '/' ) ) ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_menu', array( 'label' => __( 'Menu', 'wulf-kit' ) ) );
		$this->add_control( 'menu', array(
			'label'       => __( 'Menu', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => '',
			'options'     => $this->menus(),
			'description' => __( 'Edit menus in Appearance › Menus. Sub-items open a panel; give a sub-item the CSS class wk-shapes for diamond-shape icons or wk-feature for a highlighted card.', 'wulf-kit' ),
		) );
		$this->add_control( 'collapse', array(
			'label'       => __( 'Switch to the phone menu below (px)', 'wulf-kit' ),
			'type'        => Controls_Manager::NUMBER,
			'default'     => 1240,
			'min'         => 600,
			'max'         => 2000,
			'description' => __( 'Below this screen width the menu folds into the ☰ button.', 'wulf-kit' ),
		) );
		$this->add_control( 'sheet_search', array( 'label' => __( 'Search box in the phone menu', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_actions', array( 'label' => __( 'Right side', 'wulf-kit' ) ) );
		$this->add_control( 'show_phone', array( 'label' => __( 'Phone number', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'description' => __( 'On smaller screens it becomes a phone icon.', 'wulf-kit' ) ) );
		$this->add_control( 'show_search', array( 'label' => __( 'Search button', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'search_url', array( 'label' => __( 'Search goes to', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'placeholder' => home_url( '/?s=' ), 'condition' => array( 'show_search' => 'yes' ), 'description' => __( 'The search words are added to the end.', 'wulf-kit' ) ) );
		$this->add_control( 'show_tray', array( 'label' => __( 'Saved pieces (tray) button', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->button_fields( 'cta', __( 'Button', 'wulf-kit' ), __( 'Book a visit', 'wulf-kit' ), '#visit' );
		$this->end_controls_section();

		$this->start_controls_section( 'c_behave', array( 'label' => __( 'Behavior', 'wulf-kit' ) ) );
		$this->add_control( 'sticky', array( 'label' => __( 'Stay at the top while scrolling', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'mode', array(
			'label'   => __( 'Look', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'scroll',
			'options' => array(
				'scroll' => __( 'Dark at the top, white once scrolled', 'wulf-kit' ),
				'light'  => __( 'Always white', 'wulf-kit' ),
				'dark'   => __( 'Always dark', 'wulf-kit' ),
			),
		) );
		$this->end_controls_section();

		/* ---------- Style ---------- */
		$this->start_controls_section( 's_bar', array( 'label' => __( 'Header bar', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'hd_h', array(
			'label'     => __( 'Height', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 50, 'max' => 130 ) ),
			'selectors' => array( '{{WRAPPER}} .wk' => '--hd: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_control( 'h_top', array( 'label' => __( 'At the top (dark)', 'wulf-kit' ), 'type' => Controls_Manager::HEADING, 'separator' => 'before' ) );
		$this->color( 'top_bg', __( 'Background', 'wulf-kit' ), '.hd:not(.solid):not(.mega-on)', 'background-color' );
		$this->color( 'top_color', __( 'Text & icons', 'wulf-kit' ), '.hd:not(.solid):not(.mega-on)' );
		$this->color( 'top_hover', __( 'Link hover color', 'wulf-kit' ), '.hd:not(.solid):not(.mega-on) .nav-a:hover, {{WRAPPER}} .wk .hd:not(.solid):not(.mega-on) .tel:hover' );
		$this->color( 'top_logo', __( 'Monogram color', 'wulf-kit' ), '.hd:not(.solid):not(.mega-on) .logo svg' );
		$this->add_control( 'h_solid', array( 'label' => __( 'Scrolled (white)', 'wulf-kit' ), 'type' => Controls_Manager::HEADING, 'separator' => 'before' ) );
		$this->color( 'solid_bg', __( 'Background', 'wulf-kit' ), '.hd.solid, {{WRAPPER}} .wk .hd.mega-on', 'background-color' );
		$this->color( 'solid_color', __( 'Text & icons', 'wulf-kit' ), '.hd.solid, {{WRAPPER}} .wk .hd.mega-on' );
		$this->color( 'solid_hover', __( 'Link hover color', 'wulf-kit' ), '.hd.solid .nav-a:hover, {{WRAPPER}} .wk .hd.mega-on .nav-a:hover, {{WRAPPER}} .wk .hd.solid .tel:hover' );
		$this->color( 'solid_logo', __( 'Monogram color', 'wulf-kit' ), '.hd.solid .logo svg, {{WRAPPER}} .wk .hd.mega-on .logo svg' );
		$this->add_control( 'solid_line', array( 'label' => __( 'Bottom line', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .hd.solid, {{WRAPPER}} .wk .hd.mega-on' => 'box-shadow: 0 1px 0 {{VALUE}};' ) ) );
		$this->color( 'underline', __( 'Menu underline', 'wulf-kit' ), '.nav-a::after', 'background' );
		$this->end_controls_section();

		$this->start_controls_section( 's_logo', array( 'label' => __( 'Logo text', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE, 'condition' => array( 'logo_type' => 'mark' ) ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'logo_w_typo', 'label' => __( 'Name', 'wulf-kit' ), 'selector' => '{{WRAPPER}} .wk .logo .w' ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'logo_d_typo', 'label' => __( 'Second line', 'wulf-kit' ), 'selector' => '{{WRAPPER}} .wk .logo .d' ) );
		$this->add_responsive_control( 'mono_size', array(
			'label'     => __( 'Monogram size', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 16, 'max' => 70 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .logo svg' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};' ),
		) );
		$this->end_controls_section();

		$this->start_controls_section( 's_nav', array( 'label' => __( 'Menu links', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'nav_typo', 'selector' => '{{WRAPPER}} .wk .nav-a' ) );
		$this->add_responsive_control( 'nav_gap', array(
			'label'     => __( 'Space between links', 'wulf-kit' ),
			'type'      => Controls_Manager::SLIDER,
			'range'     => array( 'px' => array( 'min' => 4, 'max' => 70 ) ),
			'selectors' => array( '{{WRAPPER}} .wk .nav > ul' => 'gap: {{SIZE}}{{UNIT}};' ),
		) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'tel_typo', 'label' => __( 'Phone number', 'wulf-kit' ), 'selector' => '{{WRAPPER}} .wk .tel' ) );
		$this->end_controls_section();

		$this->start_controls_section( 's_mega', array( 'label' => __( 'Dropdown panels', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'mega_bg', __( 'Background', 'wulf-kit' ), '.mega', 'background-color' );
		$this->color( 'mega_head', __( 'Column headings', 'wulf-kit' ), '.mega h4' );
		$this->color( 'mega_link', __( 'Links', 'wulf-kit' ), '.mega-list a, {{WRAPPER}} .wk .mega-shapes a' );
		$this->color( 'mega_link_h', __( 'Links on hover', 'wulf-kit' ), '.mega-list a:hover, {{WRAPPER}} .wk .mega-shapes a:hover' );
		$this->color( 'mega_small', __( 'Small descriptions', 'wulf-kit' ), '.mega-list a small' );
		$this->color( 'mega_shape_bg', __( 'Shape tile hover background', 'wulf-kit' ), '.mega-shapes a:hover', 'background-color' );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'mega_typo', 'selector' => '{{WRAPPER}} .wk .mega-list a' ) );
		$this->end_controls_section();

		$this->button_style( 'cta', __( 'Button', 'wulf-kit' ), '.btn-book' );

		$this->start_controls_section( 's_cta_solid', array( 'label' => __( 'Button once scrolled', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'cta_s_color', __( 'Text color', 'wulf-kit' ), '.hd.solid .btn-book, {{WRAPPER}} .wk .hd.mega-on .btn-book' );
		$this->color( 'cta_s_bg', __( 'Background', 'wulf-kit' ), '.hd.solid .btn-book, {{WRAPPER}} .wk .hd.mega-on .btn-book', 'background-color' );
		$this->color( 'cta_s_hcolor', __( 'Hover text color', 'wulf-kit' ), '.hd.solid .btn-book:hover, {{WRAPPER}} .wk .hd.mega-on .btn-book:hover' );
		$this->color( 'cta_s_hbg', __( 'Hover background', 'wulf-kit' ), '.hd.solid .btn-book:hover, {{WRAPPER}} .wk .hd.mega-on .btn-book:hover', 'background-color' );
		$this->end_controls_section();

		$this->start_controls_section( 's_icons', array( 'label' => __( 'Icon buttons & badge', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'ib_hbg', __( 'Icon hover background', 'wulf-kit' ), '.icon-btn:hover', 'background-color' );
		$this->color( 'badge_bg', __( 'Tray count background', 'wulf-kit' ), '.count', 'background-color' );
		$this->color( 'badge_color', __( 'Tray count text', 'wulf-kit' ), '.count' );
		$this->end_controls_section();

		$this->start_controls_section( 's_sheet', array( 'label' => __( 'Phone menu', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'sheet_bg', __( 'Background', 'wulf-kit' ), '.sheet', 'background-color' );
		$this->color( 'sheet_color', __( 'Main links', 'wulf-kit' ), '.sheet summary, {{WRAPPER}} .wk .sheet nav > a' );
		$this->color( 'sheet_sub', __( 'Sub links', 'wulf-kit' ), '.sheet details a' );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'sheet_typo', 'label' => __( 'Main links', 'wulf-kit' ), 'selector' => '{{WRAPPER}} .wk .sheet summary, {{WRAPPER}} .wk .sheet nav > a' ) );
		$this->end_controls_section();
	}

	/** The built-in menu, the same shape as a WordPress menu tree. */
	public static function default_menu() {
		$h   = home_url( '/' );
		$l   = static function ( $title, $url, $desc = '', $kids = array(), $cls = '' ) {
			return array( 'title' => $title, 'url' => $url, 'desc' => $desc, 'children' => $kids, 'classes' => $cls );
		};
		return array(
			$l( 'Engagement', $h . '#studio', '', array(
				$l( 'Shop by shape', $h . '#studio', '', array(), 'wk-shapes' ),
				$l( 'Shop by style', '', '', array( $l( 'Solitaire', $h . '#studio' ), $l( 'Hidden halo', $h . '#studio' ), $l( 'Diamond band', $h . '#studio' ), $l( 'Three stone', $h . '#studio' ), $l( 'Accented', $h . '#studio' ) ) ),
				$l( 'Shop by metal', '', '', array( $l( 'Yellow gold', $h . '#studio' ), $l( 'White gold & platinum', $h . '#studio' ), $l( 'Rose gold', $h . '#studio' ) ) ),
				$l( 'Design your ring', $h . '#studio', 'Pick a style, metal and shape, then choose your diamond.', array(), 'wk-feature' ),
			) ),
			$l( 'Diamonds', $h . '#learn', '', array(
				$l( 'Loose diamonds by shape', $h . '#learn', '', array(), 'wk-shapes' ),
				$l( 'Search diamonds', '', '', array( $l( 'Natural diamonds', $h . '#learn' ), $l( 'Lab-grown diamonds', $h . '#learn' ), $l( 'Compare diamonds', $h . '#learn' ) ) ),
				$l( 'Learn', '', '', array( $l( 'The 4Cs, in plain words', $h . '#learn' ), $l( 'Lab-grown or natural?', $h . '#journal' ), $l( 'Help me choose', $h . '#learn' ) ) ),
				$l( 'Compare them in person', $h . '#visit', 'Sit down with Cullen and see diamonds side by side.', array(), 'wk-feature' ),
			) ),
			$l( 'Wedding bands', $h . '#collection' ),
			$l( 'Jewelry', $h . '#collection' ),
			$l( 'Services', $h . '#services', '', array(
				$l( 'We make', '', '', array( $l( 'Custom design', $h . '#services', 'One of one, designed with you' ), $l( 'Engagement & bridal', $h . '#services', 'Settings and certified diamonds' ) ) ),
				$l( 'We look after', '', '', array( $l( 'Repair & ring sizing', $h . '#services', 'Done in-house, free estimates' ), $l( 'Cleaning & inspection', $h . '#services', 'Free, any time' ), $l( 'Appraisals', $h . '#services', 'For insurance or replacement' ) ) ),
				$l( 'We buy & finance', '', '', array( $l( 'Sell gold, silver & diamonds', $h . '#services', 'Fair offers, explained' ), $l( 'Financing', $h . '#services', '12 months same as cash*' ) ) ),
			) ),
			$l( 'Visit', $h . '#visit' ),
		);
	}

	/** A WordPress menu as the same tree. */
	private function menu_tree( $menu_id ) {
		$items = $menu_id ? wp_get_nav_menu_items( (int) $menu_id ) : false;
		if ( ! $items ) {
			return self::default_menu();
		}
		$by = array();
		foreach ( $items as $it ) {
			$by[ (int) $it->menu_item_parent ][] = $it;
		}
		$build = static function ( $parent ) use ( &$build, $by ) {
			$out = array();
			foreach ( $by[ $parent ] ?? array() as $it ) {
				$out[] = array(
					'title'    => $it->title,
					'url'      => $it->url,
					'desc'     => $it->description,
					'classes'  => implode( ' ', array_filter( (array) $it->classes ) ),
					'children' => $build( (int) $it->ID ),
				);
			}
			return $out;
		};
		return $build( 0 );
	}

	private function link( $i, $class = '' ) {
		$cls = $class ? ' class="' . esc_attr( $class ) . '"' : '';
		return '<a' . $cls . ' href="' . esc_url( $i['url'] ? $i['url'] : '#' ) . '">' . esc_html( $i['title'] ) . ( $i['desc'] ? '<small>' . esc_html( $i['desc'] ) . '</small>' : '' ) . '</a>';
	}

	private function panel( $top, $n ) {
		$cols  = '';
		$loose = '';
		$count = 0;
		foreach ( $top['children'] as $c ) {
			if ( false !== strpos( $c['classes'], 'wk-shapes' ) ) {
				$cols .= '<div><h4>' . esc_html( $c['title'] ) . '</h4><div class="mega-shapes" data-shapes="link" data-base="' . esc_url( $c['url'] ) . '"></div></div>';
				$count++;
			} elseif ( false !== strpos( $c['classes'], 'wk-feature' ) ) {
				$cols .= '<a class="mega-feature" href="' . esc_url( $c['url'] ) . '"><div class="slot" data-art="mega-ring"></div><div class="c"><span class="h3">' . esc_html( $c['title'] ) . '</span>' . ( $c['desc'] ? '<p>' . esc_html( $c['desc'] ) . '</p>' : '' ) . '</div></a>';
				$count++;
			} elseif ( $c['children'] ) {
				$cols .= '<div><h4>' . esc_html( $c['title'] ) . '</h4><div class="mega-list">';
				foreach ( $c['children'] as $g ) {
					$cols .= $this->link( $g );
				}
				$cols .= '</div></div>';
				$count++;
			} else {
				$loose .= $this->link( $c );
			}
		}
		if ( $loose ) {
			$cols .= '<div><div class="mega-list">' . $loose . '</div></div>';
			$count++;
		}
		return '<div class="mega" id="' . esc_attr( 'wk-mega-' . $this->get_id() . '-' . $n ) . '"><div class="wrap mega-grid" style="--cols:' . (int) max( 1, $count ) . '">' . $cols . '</div></div>';
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$tree  = $this->menu_tree( $s['menu'] );
		$phone = WK_Settings::get( 'phone' );
		$tel   = WK_Settings::tel();
		$name  = WK_Settings::get( 'name' );
		$coll  = max( 600, (int) $s['collapse'] );
		$this->open( $s, 'wk-hd-' . $s['mode'], array( 'mode' => $s['mode'], 'sticky' => 'yes' === $s['sticky'], 'collapse' => $coll, 'search' => $s['search_url'] ? $s['search_url'] : home_url( '/?s=' ) ) );

		// Logo.
		$logo_href = self::link_attrs( $s['logo_link'], home_url( '/' ) );
		if ( 'image' === $s['logo_type'] && ! empty( $s['logo_img']['url'] ) ) {
			$logo = '<img class="lg-top" src="' . esc_url( $s['logo_img']['url'] ) . '" alt="' . esc_attr( $name ) . '">';
			if ( ! empty( $s['logo_img2']['url'] ) ) {
				$logo .= '<img class="lg-solid" src="' . esc_url( $s['logo_img2']['url'] ) . '" alt="">';
			}
		} else {
			$logo = WK_Icons::svg( 'mono' ) . '<span class="t"><span class="w">' . esc_html( $s['logo_word'] ) . '</span><span class="d">' . esc_html( $s['logo_sub'] ) . '</span></span>';
		}

		// Collapse breakpoint as a scoped rule.
		$wid = '.elementor-element.elementor-element-' . $this->get_id() . ' .wk.wk';
		echo '<style>@media (max-width:' . (int) ( $coll - 1 ) . 'px){' . $wid . ' .nav,' . $wid . ' .hd .icon-btn.s{display:none}' . $wid . ' .menu-btn{display:grid}}@media (min-width:' . (int) $coll . 'px){' . $wid . ' .nav{display:flex}' . $wid . ' .menu-btn{display:none}}</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		echo '<header class="hd' . ( 'light' === $s['mode'] ? ' solid' : '' ) . '"><div class="wrap">';
		echo '<a class="logo"' . $logo_href . ' aria-label="' . esc_attr( $name . ', ' . __( 'home', 'wulf-kit' ) ) . '">' . $logo . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		echo '<nav class="nav" aria-label="' . esc_attr__( 'Main', 'wulf-kit' ) . '"><ul>';
		foreach ( $tree as $n => $top ) {
			if ( $top['children'] ) {
				$pid = 'wk-mega-' . $this->get_id() . '-' . $n;
				echo '<li class="has-mega"><button class="nav-a" type="button" aria-expanded="false" aria-controls="' . esc_attr( $pid ) . '">' . esc_html( $top['title'] ) . ' ' . WK_Icons::svg( 'chev', 'chev' ) . '</button>' . $this->panel( $top, $n ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			} else {
				echo '<li><a class="nav-a" href="' . esc_url( $top['url'] ) . '">' . esc_html( $top['title'] ) . '</a></li>';
			}
		}
		echo '</ul></nav>';

		echo '<div class="actions">';
		if ( 'yes' === $s['show_phone'] && $phone ) {
			echo '<a class="tel" href="' . esc_attr( $tel ) . '">' . esc_html( $phone ) . '</a>';
		}
		if ( 'yes' === $s['show_search'] ) {
			echo '<button class="icon-btn s" type="button" data-wk-search aria-label="' . esc_attr__( 'Search', 'wulf-kit' ) . '">' . WK_Icons::svg( 'search' ) . '</button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( 'yes' === $s['show_tray'] && WK_Settings::get( 'tray' ) ) {
			echo '<button class="icon-btn h" type="button" data-wk-tray aria-label="' . esc_attr__( 'Your tray', 'wulf-kit' ) . '" aria-haspopup="dialog" aria-expanded="false">' . WK_Icons::svg( 'tray' ) . '<span class="count" data-count hidden>0</span></button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( 'yes' === $s['show_phone'] && $phone ) {
			/* translators: %s: phone */
			echo '<a class="icon-btn tel-icon" href="' . esc_attr( $tel ) . '" aria-label="' . esc_attr( sprintf( __( 'Call %s', 'wulf-kit' ), $phone ) ) . '">' . WK_Icons::svg( 'phone' ) . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo $this->button( $s, 'cta', 'btn btn-sm btn-book' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<button class="icon-btn menu-btn" type="button" aria-label="' . esc_attr__( 'Open menu', 'wulf-kit' ) . '" aria-expanded="false">' . WK_Icons::svg( 'menu' ) . '</button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '</div></div></header>';

		// Phone menu.
		echo '<div class="sheet" role="dialog" aria-modal="true" aria-label="' . esc_attr__( 'Menu', 'wulf-kit' ) . '" hidden>';
		echo '<div class="sheet-top"><a class="logo"' . $logo_href . '>' . ( 'image' === $s['logo_type'] && ! empty( $s['logo_img2']['url'] ) ? '<img src="' . esc_url( $s['logo_img2']['url'] ) . '" alt="' . esc_attr( $name ) . '">' : WK_Icons::svg( 'mono' ) . '<span class="t"><span class="w">' . esc_html( $s['logo_word'] ) . '</span><span class="d">' . esc_html( $s['logo_sub'] ) . '</span></span>' ) . '</a><button class="icon-btn" type="button" data-close aria-label="' . esc_attr__( 'Close menu', 'wulf-kit' ) . '">' . WK_Icons::svg( 'close' ) . '</button></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( 'yes' === $s['sheet_search'] ) {
			echo '<form class="sheet-search" role="search" data-wk-searchform><input type="search" name="q" placeholder="' . esc_attr__( 'Search rings, diamonds, jewelry', 'wulf-kit' ) . '" aria-label="' . esc_attr__( 'Search', 'wulf-kit' ) . '"></form>';
		}
		echo '<nav aria-label="' . esc_attr__( 'Mobile', 'wulf-kit' ) . '">';
		foreach ( $tree as $top ) {
			if ( $top['children'] ) {
				echo '<details><summary>' . esc_html( $top['title'] ) . ' ' . WK_Icons::svg( 'chev' ) . '</summary><div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				foreach ( $top['children'] as $c ) {
					if ( $c['children'] ) {
						foreach ( $c['children'] as $g ) {
							echo '<a href="' . esc_url( $g['url'] ) . '">' . esc_html( $g['title'] ) . '</a>';
						}
					} elseif ( $c['url'] ) {
						echo '<a href="' . esc_url( $c['url'] ) . '">' . esc_html( $c['title'] ) . '</a>';
					}
				}
				echo '</div></details>';
			} else {
				echo '<a href="' . esc_url( $top['url'] ) . '">' . esc_html( $top['title'] ) . ' ' . WK_Icons::svg( 'arr' ) . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}
		echo '</nav><div class="sheet-foot"><p data-status-text></p>';
		echo $this->button( $s, 'cta', 'btn btn-ink' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $phone ) {
			/* translators: %s: phone */
			echo '<a class="btn btn-line" href="' . esc_attr( $tel ) . '">' . esc_html( sprintf( __( 'Call %s', 'wulf-kit' ), $phone ) ) . '</a>';
		}
		echo '</div></div>';
		$this->close();
	}
}
