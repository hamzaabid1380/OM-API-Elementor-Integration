<?php
/**
 * "What brings you in?": a few large choices near the top of the page. Each one starts a short
 * path: a page or section to look at, or the booking panel with its topic already chosen.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Paths_Widget extends WK_Widget {

	protected $key = 'paths';

	public function get_title() {
		return __( 'Wulf · What brings you in?', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-apps';
	}

	/** The six default choices; the page library reuses them with its own links. */
	public static function default_items( $design = '' ) {
		$m = WK_URL . 'assets/media/';
		return array(
			array(
				'image'  => array( 'url' => $m . '51162-E.webp', 'id' => '' ),
				'icon'   => 'ring',
				'title'  => __( 'Engagement rings', 'wulf-kit' ),
				'text'   => $design ? __( 'Design yours in a minute, then see it in person.', 'wulf-kit' ) : __( 'Real settings in 360°, and a GIA-certified jeweler to guide you.', 'wulf-kit' ),
				'go'     => $design ? __( 'Design your ring', 'wulf-kit' ) : __( 'Find your ring', 'wulf-kit' ),
				'action' => 'link',
				'link'   => array( 'url' => $design ? $design : WK_Pages::url( 'engagement-rings' ) ),
				'topic'  => '',
			),
			array(
				'image'  => array( 'url' => '', 'id' => '' ),
				'om_line' => 'wedding-bands',
				'icon'   => 'bands',
				'title'  => __( 'Wedding bands', 'wulf-kit' ),
				'text'   => __( 'Classic and diamond bands, matched to your engagement ring.', 'wulf-kit' ),
				'go'     => __( 'Shop wedding bands', 'wulf-kit' ),
				'action' => 'link',
				'link'   => array( 'url' => WK_Pages::url( 'wedding-bands' ) ),
				'topic'  => '',
			),
			array(
				'image'  => array( 'url' => $m . 'card-custom.webp', 'id' => '' ),
				'icon'   => 'pencil',
				'title'  => __( 'Custom design', 'wulf-kit' ),
				'text'   => __( 'Bring a sketch, a photo or a family stone.', 'wulf-kit' ),
				'go'     => __( 'Start a design', 'wulf-kit' ),
				'action' => 'book',
				'link'   => array( 'url' => '' ),
				'topic'  => 'Custom design',
			),
			array(
				'image'  => array( 'url' => $m . '32623.webp', 'id' => '' ),
				'icon'   => 'tool',
				'title'  => __( 'Repairs & cleaning', 'wulf-kit' ),
				'text'   => __( 'Done in-house by our own goldsmiths. Free cleaning and inspection, any time.', 'wulf-kit' ),
				'go'     => __( 'Plan a repair', 'wulf-kit' ),
				'action' => 'book',
				'link'   => array( 'url' => '' ),
				'topic'  => 'Repair',
			),
			array(
				'image'  => array( 'url' => $m . 'F754.webp', 'id' => '' ),
				'icon'   => 'cert',
				'title'  => __( 'Appraisals', 'wulf-kit' ),
				'text'   => __( 'For insurance or replacement, by GIA-certified professionals.', 'wulf-kit' ),
				'go'     => __( 'Book an appraisal', 'wulf-kit' ),
				'action' => 'book',
				'link'   => array( 'url' => '' ),
				'topic'  => 'Appraisal',
			),
			array(
				'image'  => array( 'url' => $m . 'card-sell.webp', 'id' => '' ),
				'icon'   => 'cash',
				'title'  => __( 'Sell gold & diamonds', 'wulf-kit' ),
				'text'   => __( 'Evaluated in front of you, with no pressure to accept.', 'wulf-kit' ),
				'go'     => __( 'Get an offer', 'wulf-kit' ),
				'action' => 'book',
				'link'   => array( 'url' => '' ),
				'topic'  => 'Selling',
			),
		);
	}

	protected function register_controls() {
		$this->section_controls( array( 'anchor' => 'start', 'tone' => 'white' ) );
		$this->head_controls( array(
			'eyebrow' => __( 'Start here', 'wulf-kit' ),
			'title'   => __( 'What brings you in?', 'wulf-kit' ),
			'lead'    => __( 'Pick one and we\'ll take it from there.', 'wulf-kit' ),
			'align'   => 'center',
		) );

		$this->start_controls_section( 'c_paths', array( 'label' => __( 'Choices', 'wulf-kit' ) ) );
		$this->add_control( 'look', array(
			'label'   => __( 'Look', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'product',
			'options' => array( 'product' => __( 'Product photos on white', 'wulf-kit' ), 'photo' => __( 'Photos that fill the card', 'wulf-kit' ), 'icon' => __( 'Icon cards (no photos)', 'wulf-kit' ), 'list' => __( 'Compact rows', 'wulf-kit' ) ),
		) );
		$r = new Repeater();
		$r->add_control( 'image', array( 'label' => __( 'Photo', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA ) );
		$r->add_control( 'om_style', array( 'label' => __( 'Or an OM style number', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'description' => __( 'Shows that design\'s photo from Overnight Mountings, e.g. 85121.', 'wulf-kit' ) ) );
		$r->add_control( 'om_line', array(
			'label'       => __( 'Or a design from an OM product line', 'wulf-kit' ),
			'type'        => Controls_Manager::SELECT,
			'default'     => '',
			'options'     => array( '' => __( 'None', 'wulf-kit' ), 'engagement-rings' => __( 'Engagement rings', 'wulf-kit' ), 'wedding-bands' => __( 'Wedding bands', 'wulf-kit' ), 'fashion-rings' => __( 'Fashion rings', 'wulf-kit' ), 'earrings' => __( 'Earrings', 'wulf-kit' ), 'necklaces' => __( 'Necklaces', 'wulf-kit' ), 'pendants' => __( 'Pendants', 'wulf-kit' ), 'bracelets' => __( 'Bracelets', 'wulf-kit' ) ),
			'description' => __( 'Used when no photo or style number is set: the first design of that line, live from the OM Catalog plugin.', 'wulf-kit' ),
		) );
		$r->add_control( 'icon', array( 'label' => __( 'Icon (for icon cards and rows)', 'wulf-kit' ), 'type' => Controls_Manager::SELECT, 'default' => 'ring', 'options' => WK_Icons::options() ) );
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => '' ) );
		$r->add_control( 'go', array( 'label' => __( 'Link text', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'action', array(
			'label'   => __( 'When clicked', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'link',
			'options' => array( 'link' => __( 'Open a page or section', 'wulf-kit' ), 'book' => __( 'Open the booking panel', 'wulf-kit' ) ),
		) );
		$r->add_control( 'link', array( 'label' => __( 'Link', 'wulf-kit' ), 'type' => Controls_Manager::URL, 'dynamic' => array( 'active' => true ), 'condition' => array( 'action' => 'link' ), 'description' => __( 'A page, or #studio for the ring designer on the same page.', 'wulf-kit' ) ) );
		$r->add_control( 'topic', array( 'label' => __( 'Topic chosen in the booking panel', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'condition' => array( 'action' => 'book' ), 'description' => __( 'One of the topics in Wulf Kit › Settings › Booking, e.g. Repair.', 'wulf-kit' ) ) );
		$this->add_control( 'items', array(
			'label'       => __( 'Choices', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'default'     => self::default_items(),
		) );
		$this->add_responsive_control( 'cols', array(
			'label'          => __( 'Per row', 'wulf-kit' ),
			'type'           => Controls_Manager::SELECT,
			'default'        => '3',
			'tablet_default' => '3',
			'mobile_default' => '2',
			'options'        => array( '1' => '1', '2' => '2', '3' => '3', '4' => '4', '6' => '6' ),
			'selectors'      => array( '{{WRAPPER}} .wk .paths' => '--cols: {{VALUE}};' ),
		) );
		$this->button_fields( 'b1', __( 'Line under the choices', 'wulf-kit' ), __( 'Not sure yet? Talk to a jeweler', 'wulf-kit' ), '#visit' );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->box_style( 'card', __( 'Cards', 'wulf-kit' ), '.path' );
		$this->start_controls_section( 's_media', array( 'label' => __( 'Photos & icons', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->add_responsive_control( 'ratio', array(
			'label'     => __( 'Photo shape', 'wulf-kit' ),
			'type'      => Controls_Manager::SELECT,
			'default'   => '4 / 3',
			'options'   => array( '1 / 1' => __( 'Square', 'wulf-kit' ), '4 / 3' => __( 'Landscape', 'wulf-kit' ), '3 / 4' => __( 'Portrait', 'wulf-kit' ), '16 / 9' => __( 'Wide', 'wulf-kit' ) ),
			'selectors' => array( '{{WRAPPER}} .wk .path-media' => 'aspect-ratio: {{VALUE}};' ),
		) );
		$this->color( 'ic', __( 'Icon', 'wulf-kit' ), '.path-ic' );
		$this->color( 'ic_bg', __( 'Icon background', 'wulf-kit' ), '.path-ic', 'background-color' );
		$this->color( 'shade', __( 'Photo tint on hover', 'wulf-kit' ), '.path-media::after', 'background-color' );
		$this->end_controls_section();
		$this->text_style( 'pt', __( 'Choice titles', 'wulf-kit' ), '.path-t', true );
		$this->text_style( 'px', __( 'Choice text', 'wulf-kit' ), '.path-x' );
		$this->text_style( 'pg', __( 'Choice links', 'wulf-kit' ), '.path-go', true );
		$this->text_style( 'more', __( 'Line under the choices', 'wulf-kit' ), '.paths-more a', true );
	}

	/** A card's picture: an OM style number, an uploaded photo, or the first design of an OM line. */
	private function card_img( $it, $look ) {
		if ( ! in_array( $look, array( 'product', 'photo' ), true ) ) {
			return '';
		}
		$style = trim( (string) ( $it['om_style'] ?? '' ) );
		if ( '' !== $style ) {
			return trailingslashit( WK_Settings::get( 'om_media' ) ) . rawurlencode( $style ) . '.jpg';
		}
		$img = $this->img_url( $it['image'] ?? array() );
		return $img ? $img : self::om_line_image( (string) ( $it['om_line'] ?? '' ) );
	}

	/** First photo of an OM product line, through the OM Catalog plugin (kept for 12 hours). */
	private static function om_line_image( $line ) {
		if ( '' === $line || ! class_exists( 'OM_API_Client' ) || ! function_exists( 'om_image_url' ) ) {
			return '';
		}
		$key = 'wk_path_img_' . md5( $line );
		$hit = get_transient( $key );
		if ( false !== $hit ) {
			return (string) $hit;
		}
		$url = '';
		$res = OM_API_Client::get_products( $line, array( 'limit' => 6 ) );
		if ( ! is_wp_error( $res ) && ! empty( $res['products'] ) ) {
			foreach ( (array) $res['products'] as $p ) {
				if ( ! empty( $p['images'][0] ) ) {
					$url = (string) om_image_url( $p['images'][0] );
					break;
				}
			}
		}
		set_transient( $key, $url, $url ? 12 * HOUR_IN_SECONDS : 30 * MINUTE_IN_SECONDS );
		return $url;
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$items = array_filter( (array) $s['items'], static function ( $it ) {
			return '' !== trim( (string) ( $it['title'] ?? '' ) );
		} );
		if ( ! $items ) {
			return;
		}
		$look = in_array( $s['look'] ?? 'product', array( 'product', 'photo', 'icon', 'list' ), true ) ? $s['look'] : 'product';
		$this->open( $s );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . ' paths-sec look-' . esc_attr( $look ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo '<ul class="paths" role="list" style="--n:' . (int) count( $items ) . '">';
		foreach ( $items as $it ) {
			$book  = 'book' === ( $it['action'] ?? 'link' );
			$attrs = $book ? self::link_attrs( array( 'url' => '#visit' ) ) . ( $it['topic'] ? ' data-topic="' . esc_attr( $it['topic'] ) . '"' : '' ) : self::link_attrs( $it['link'] ?? '' );
			$img   = $this->card_img( $it, $look );
			$ic    = '<span class="path-ic">' . WK_Icons::svg( $it['icon'] ? $it['icon'] : 'spark' ) . '</span>';
			echo '<li><a class="path"' . $attrs . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			if ( $img ) {
				echo '<span class="path-media"><img src="' . esc_url( $img ) . '" alt="" loading="lazy" decoding="async"></span>';
			} elseif ( in_array( $look, array( 'product', 'photo' ), true ) ) {
				echo '<span class="path-media no-img">' . $ic . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			} else {
				echo $ic; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '<span class="path-body"><span class="path-t">' . esc_html( $it['title'] ) . '</span>';
			if ( $it['text'] ) {
				echo '<span class="path-x">' . esc_html( $it['text'] ) . '</span>';
			}
			if ( $it['go'] ) {
				echo '<span class="path-go">' . esc_html( $it['go'] ) . ' ' . WK_Icons::svg( 'arr', 'arr' ) . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</span></a></li>';
		}
		echo '</ul>';
		if ( '' !== trim( (string) ( $s['b1_text'] ?? '' ) ) ) {
			echo '<p class="paths-more"><a' . self::link_attrs( $s['b1_link'] ?? '' ) . '>' . esc_html( $s['b1_text'] ) . ' ' . WK_Icons::svg( 'arr', 'arr' ) . '</a></p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div></section>';
		$this->close();
	}
}
