<?php
/**
 * Footer: newsletter sign-up, logo and about line, link columns, contact column and legal line.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Footer_Widget extends WK_Widget {

	protected $key = 'footer';

	public function get_title() {
		return __( 'Wulf · Footer', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-footer';
	}

	protected function register_controls() {
		$h = home_url( '/' );
		$this->start_controls_section( 'c_news', array( 'label' => __( 'Newsletter', 'wulf-kit' ) ) );
		$this->add_control( 'news_on', array( 'label' => __( 'Show', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'news_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'New arrivals, events and care tips.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'news_text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'A short email now and then. No spam.', 'wulf-kit' ), 'label_block' => true ) );
		$this->add_control( 'news_ph', array( 'label' => __( 'Box placeholder', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Your email address', 'wulf-kit' ) ) );
		$this->add_control( 'news_btn', array( 'label' => __( 'Button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Subscribe', 'wulf-kit' ) ) );
		$this->add_control( 'news_note', array( 'type' => Controls_Manager::RAW_HTML, 'raw' => __( 'Sign-ups are emailed to you and sent to your CRM (if switched on in Wulf Kit › Settings).', 'wulf-kit' ), 'content_classes' => 'elementor-descriptor' ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_brand', array( 'label' => __( 'Logo & about', 'wulf-kit' ) ) );
		$this->add_control( 'logo_type', array( 'label' => __( 'Logo', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'mark', 'options' => array( 'mark' => __( 'Monogram + name', 'wulf-kit' ), 'image' => __( 'Image', 'wulf-kit' ) ) ) );
		$this->add_control( 'logo_word', array( 'label' => __( 'Name', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'WULF', 'condition' => array( 'logo_type' => 'mark' ) ) );
		$this->add_control( 'logo_sub', array( 'label' => __( 'Second line', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'DIAMOND JEWELERS', 'condition' => array( 'logo_type' => 'mark' ) ) );
		$this->add_control( 'logo_img', array( 'label' => __( 'Logo image', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'condition' => array( 'logo_type' => 'image' ) ) );
		$this->add_control( 'about', array( 'label' => __( 'About line', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'Independent jewelers since 1971. Formerly AaLand Diamond Jewelers, now in Crown Point.', 'wulf-kit' ) ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_cols', array( 'label' => __( 'Link columns', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'title', array( 'label' => __( 'Heading', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'links', array( 'label' => __( 'Links: one per line, "Label | link"', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 6, 'default' => '' ) );
		$this->add_control( 'cols', array(
			'label'       => __( 'Columns', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'default'     => array(
				array( 'title' => 'Shop', 'links' => "Engagement rings | {$h}#studio\nLoose diamonds | {$h}#learn\nWedding bands | {$h}#collection\nFine jewelry | {$h}#collection\nGift cards | https://www.giftly.com/gift-card/wulf-diamond-jewelers-crown-point" ),
				array( 'title' => 'Services', 'links' => "Custom design | {$h}#services\nRepair & sizing | {$h}#services\nAppraisals | {$h}#services\nSell gold & diamonds | {$h}#services\nFinancing | {$h}#services" ),
				array( 'title' => 'About', 'links' => "Our story | {$h}#story\nReviews | {$h}#reviews\nJournal | {$h}#journal\nFacebook | https://www.facebook.com/WulfDiamondJewelers/" ),
			),
		) );
		$this->add_control( 'visit_on', array( 'label' => __( 'Visit column (address, phones, hours)', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes', 'separator' => 'before' ) );
		$this->add_control( 'visit_title', array( 'label' => __( 'Visit heading', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'Visit', 'condition' => array( 'visit_on' => 'yes' ) ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_legal', array( 'label' => __( 'Bottom line', 'wulf-kit' ) ) );
		$this->add_control( 'copy', array( 'label' => __( 'Copyright', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '© {year} Wulf Diamond Jewelers · Since 1971', 'label_block' => true, 'description' => __( '{year} becomes the current year.', 'wulf-kit' ) ) );
		$this->add_control( 'legal', array( 'label' => __( 'Links: one per line, "Label | link"', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => 'Privacy | ' . ( get_privacy_policy_url() ? get_privacy_policy_url() : $h . 'privacy-policy/' ) . "\nAccessibility | {$h}accessibility/\nTerms | {$h}terms/" ) );
		$this->end_controls_section();

		$this->start_controls_section( 's_ft', array( 'label' => __( 'Footer', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'bg', __( 'Background', 'wulf-kit' ), '.ft', 'background-color' );
		$this->color( 'c', __( 'Text', 'wulf-kit' ), '.ft' );
		$this->color( 'head', __( 'Column headings', 'wulf-kit' ), '.ft h4' );
		$this->color( 'link', __( 'Links', 'wulf-kit' ), '.ft .cols a' );
		$this->color( 'link_h', __( 'Links on hover', 'wulf-kit' ), '.ft .cols a:hover, {{WRAPPER}} .wk .ft .legal a:hover' );
		$this->color( 'line', __( 'Divider lines', 'wulf-kit' ), '.ft .news, {{WRAPPER}} .wk .ft .legal', 'border-color' );
		$this->color( 'logo_c', __( 'Monogram color', 'wulf-kit' ), '.ft .logo svg' );
		$this->add_responsive_control( 'pad', array(
			'label'      => __( 'Padding', 'wulf-kit' ),
			'type'       => Controls_Manager::DIMENSIONS,
			'size_units' => array( 'px', 'em' ),
			'selectors'  => array( '{{WRAPPER}} .wk .ft' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
		) );
		$this->end_controls_section();
		$this->text_style( 'nt', __( 'Newsletter title', 'wulf-kit' ), '.news .h3' );
		$this->start_controls_section( 's_in', array( 'label' => __( 'Newsletter box', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'in_bd', __( 'Border', 'wulf-kit' ), '.news input', 'border-color' );
		$this->color( 'in_focus', __( 'Border when typing', 'wulf-kit' ), '.news input:focus', 'border-color' );
		$this->color( 'in_c', __( 'Text', 'wulf-kit' ), '.news input' );
		$this->end_controls_section();
		$this->button_style( 'nb', __( 'Subscribe button', 'wulf-kit' ), '.news .btn' );
		$this->text_style( 'cols', __( 'Column links', 'wulf-kit' ), '.ft .cols a' );
		$this->text_style( 'legal', __( 'Bottom line', 'wulf-kit' ), '.ft .legal' );
	}

	private static function links( $text ) {
		$out = array();
		foreach ( preg_split( '/\r?\n/', (string) $text ) as $line ) {
			$p = array_map( 'trim', explode( '|', $line, 2 ) );
			if ( '' !== $p[0] ) {
				$out[] = array( $p[0], $p[1] ?? '#' );
			}
		}
		return $out;
	}

	private static function a( $label, $url ) {
		$ext = preg_match( '#^https?://#', $url ) && false === strpos( $url, wp_parse_url( home_url(), PHP_URL_HOST ) );
		return '<a href="' . esc_url( $url ) . '"' . ( $ext ? ' target="_blank" rel="noopener"' : '' ) . '>' . esc_html( $label ) . '</a>';
	}

	protected function render() {
		$s   = $this->get_settings_for_display();
		$set = WK_Settings::all();
		$this->open( $s );
		echo '<footer class="ft"><div class="wrap">';
		if ( 'yes' === $s['news_on'] ) {
			$id = 'wk-n-' . $this->get_id();
			echo '<div class="news"><div><h2 class="h3">' . esc_html( $s['news_title'] ) . '</h2>' . ( $s['news_text'] ? '<p>' . esc_html( $s['news_text'] ) . '</p>' : '' ) . '</div>';
			echo '<form novalidate data-news><label class="sr" for="' . esc_attr( $id ) . '">' . esc_html__( 'Email address', 'wulf-kit' ) . '</label><input id="' . esc_attr( $id ) . '" type="email" name="email" placeholder="' . esc_attr( $s['news_ph'] ) . '" autocomplete="email"><input type="text" name="website" tabindex="-1" autocomplete="off" class="sr" aria-hidden="true"><button class="btn btn-gold" type="submit">' . esc_html( $s['news_btn'] ) . '</button></form></div>';
		}
		echo '<div class="cols"><div>';
		if ( 'image' === $s['logo_type'] && ! empty( $s['logo_img']['url'] ) ) {
			echo '<a class="logo" href="' . esc_url( home_url( '/' ) ) . '"><img src="' . esc_url( $s['logo_img']['url'] ) . '" alt="' . esc_attr( $set['name'] ) . '" style="height:44px;width:auto"></a>';
		} else {
			echo '<a class="logo" href="' . esc_url( home_url( '/' ) ) . '">' . WK_Icons::svg( 'mono' ) . '<span class="t"><span class="w">' . esc_html( $s['logo_word'] ) . '</span><span class="d">' . esc_html( $s['logo_sub'] ) . '</span></span></a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		if ( $s['about'] ) {
			echo '<p class="about">' . esc_html( $s['about'] ) . '</p>';
		}
		echo '</div>';
		foreach ( (array) $s['cols'] as $c ) {
			echo '<div><h4>' . esc_html( $c['title'] ) . '</h4><ul>';
			foreach ( self::links( $c['links'] ) as $l ) {
				echo '<li>' . self::a( $l[0], $l[1] ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</ul></div>';
		}
		if ( 'yes' === $s['visit_on'] ) {
			$parts = array_map( 'trim', explode( ',', $set['address'], 2 ) );
			echo '<div><h4>' . esc_html( $s['visit_title'] ) . '</h4><ul>';
			foreach ( $parts as $p ) {
				echo '<li><a href="' . esc_url( $set['maps_url'] ) . '" target="_blank" rel="noopener">' . esc_html( $p ) . '</a></li>';
			}
			foreach ( array( $set['phone'], $set['phone2'] ) as $ph ) {
				if ( $ph ) {
					echo '<li><a href="' . esc_attr( WK_Settings::tel( $ph ) ) . '">' . esc_html( $ph ) . '</a></li>';
				}
			}
			echo '<li><span>' . esc_html( WK_Settings::hours_summary() ) . '</span></li></ul></div>';
		}
		echo '</div><div class="legal"><span>' . esc_html( str_replace( '{year}', gmdate( 'Y' ), $s['copy'] ) ) . '</span><span>';
		$ls = array();
		foreach ( self::links( $s['legal'] ) as $l ) {
			$ls[] = self::a( $l[0], $l[1] );
		}
		echo implode( ' · ', $ls ) . '</span></div></div></footer>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->close();
	}
}
