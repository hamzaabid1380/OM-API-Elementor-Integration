<?php
/**
 * The page library: every page of wulfdiamondjewelers.com as a ready-made Elementor layout,
 * built from Wulf widgets (and the OM Catalog widgets for shopping pages), with the wording
 * from the live site. Same web addresses as the live site.
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

class WK_Pages {

	/** Meta key that marks a page built from the library (value = page key). */
	const META = '_wk_page';

	/** Built pages: key => post ID (published or draft). */
	private static $built = null;

	public static function groups() {
		return array(
			'main'     => __( 'Main pages', 'wulf-kit' ),
			'shop'     => __( 'Shop (uses the OM Catalog plugin)', 'wulf-kit' ),
			'learn'    => __( 'Diamonds & gems', 'wulf-kit' ),
			'services' => __( 'Services', 'wulf-kit' ),
			'sell'     => __( 'We buy', 'wulf-kit' ),
		);
	}

	/**
	 * Every page: key => title, slug, group, what's on it.
	 * Slugs match the live site so existing links, menus and Google keep working.
	 */
	public static function catalog() {
		return array(
			'home'                        => array( __( 'Home', 'wulf-kit' ), 'home', 'main', __( 'The full homepage: showcase, categories, ring studio, story, 4Cs, services, visit.', 'wulf-kit' ) ),
			'about-us'                    => array( __( 'About', 'wulf-kit' ), 'about-us', 'main', __( 'Your story since 1971, Cullen, concierge service, values, reviews, visit.', 'wulf-kit' ) ),
			'contact-us'                  => array( __( 'Free Consultation', 'wulf-kit' ), 'contact-us', 'main', __( 'Contact and booking form, map, hours, common questions.', 'wulf-kit' ) ),
			'blog'                        => array( __( 'Blog', 'wulf-kit' ), 'blog', 'main', __( 'Your latest blog posts.', 'wulf-kit' ) ),
			'thank-you'                   => array( __( 'Thank You', 'wulf-kit' ), 'thank-you', 'main', __( 'Shown after someone books an appointment.', 'wulf-kit' ) ),
			'404-2'                       => array( __( 'Page not found', 'wulf-kit' ), '404-2', 'main', __( 'A friendly "we couldn\'t find that page" with links to the main sections.', 'wulf-kit' ) ),
			'engagement-rings'            => array( __( 'Engagement Rings', 'wulf-kit' ), 'engagement-rings', 'shop', __( 'Video highlights, the full engagement ring catalog, ring studio, 4Cs, questions.', 'wulf-kit' ) ),
			'ring-builder'                => array( __( 'Ring Builder', 'wulf-kit' ), 'ring-builder', 'shop', __( 'The OM ring builder: setting, diamond, review.', 'wulf-kit' ) ),
			'wedding-bands'               => array( __( 'Wedding Bands', 'wulf-kit' ), 'wedding-bands', 'shop', __( 'Video highlights and the wedding band catalog.', 'wulf-kit' ) ),
			'rings'                       => array( __( 'Fashion Rings', 'wulf-kit' ), 'rings', 'shop', __( 'Video highlights and the fashion ring catalog.', 'wulf-kit' ) ),
			'earrings'                    => array( __( 'Earrings', 'wulf-kit' ), 'earrings', 'shop', __( 'Video highlights and the earring catalog.', 'wulf-kit' ) ),
			'necklaces'                   => array( __( 'Necklaces', 'wulf-kit' ), 'necklaces', 'shop', __( 'The necklace catalog.', 'wulf-kit' ) ),
			'pendants'                    => array( __( 'Pendants', 'wulf-kit' ), 'pendants', 'shop', __( 'Video highlights and the pendant catalog.', 'wulf-kit' ) ),
			'bracelets'                   => array( __( 'Bracelets', 'wulf-kit' ), 'bracelets', 'shop', __( 'The bracelet catalog.', 'wulf-kit' ) ),
			'catalogue'                   => array( __( 'Catalogue', 'wulf-kit' ), 'catalogue', 'shop', __( 'Every product line in one catalog with search.', 'wulf-kit' ) ),
			'single-product-layout'       => array( __( 'Single Product layout', 'wulf-kit' ), 'single-product-layout', 'shop', __( 'The design used for every product page. Choose it in Settings › OM Catalog › Product Page Layout.', 'wulf-kit' ) ),
			'best-diamonds'               => array( __( 'Diamond Jewelry', 'wulf-kit' ), 'best-diamonds', 'learn', __( 'Diamond jewelry categories, the 4Cs explained, why Wulf.', 'wulf-kit' ) ),
			'engagement-rings-2'          => array( __( 'Where to Buy Engagement Rings', 'wulf-kit' ), 'engagement-rings-2', 'learn', __( 'Why choose Wulf for an engagement ring, a customer story, questions.', 'wulf-kit' ) ),
			'gems'                        => array( __( 'Gems', 'wulf-kit' ), 'gems', 'learn', __( 'The Wulf gem vault and custom gem jewelry.', 'wulf-kit' ) ),
			'jewelry-services-and-repairs'=> array( __( 'Jewelry Services & Repairs', 'wulf-kit' ), 'jewelry-services-and-repairs', 'services', __( 'In-house repairs, what we fix, brands we repair, prices guide, questions.', 'wulf-kit' ) ),
			'custom-jewelry'              => array( __( 'Custom Jewelry', 'wulf-kit' ), 'custom-jewelry', 'services', __( 'The four-step custom process: inspiration, CAD, wax, cast.', 'wulf-kit' ) ),
			'jewelry-appraisals'          => array( __( 'Jewelry Appraisals', 'wulf-kit' ), 'jewelry-appraisals', 'services', __( 'Why and how appraisals work, choosing an appraiser, how often.', 'wulf-kit' ) ),
			'gold-silver-platinum'        => array( __( 'Gold, Silver, and Platinum', 'wulf-kit' ), 'gold-silver-platinum', 'sell', __( 'Sell gold, silver and platinum: why Wulf, what we buy.', 'wulf-kit' ) ),
			'diamond-buyers'              => array( __( 'Diamond Buyer', 'wulf-kit' ), 'diamond-buyers', 'sell', __( 'Sell diamonds: how pricing works, cash offers, what to bring.', 'wulf-kit' ) ),
			'coins-currency'              => array( __( 'Coins Currency', 'wulf-kit' ), 'coins-currency', 'sell', __( 'Coins and paper currency we buy, collector questions.', 'wulf-kit' ) ),
			'sterling-silver'             => array( __( 'Sterling Silver', 'wulf-kit' ), 'sterling-silver', 'sell', __( 'Sell sterling flatware, tableware and silver pieces.', 'wulf-kit' ) ),
			'fine-jewelry'                => array( __( 'Fine Jewelry', 'wulf-kit' ), 'fine-jewelry', 'sell', __( 'Sell estate, designer and broken jewelry.', 'wulf-kit' ) ),
		);
	}

	/** Which library pages already exist on this site: key => post ID. */
	public static function built( $refresh = false ) {
		if ( null === self::$built || $refresh ) {
			self::$built = array();
			$posts       = get_posts( array( 'post_type' => 'page', 'post_status' => array( 'publish', 'draft', 'pending', 'private', 'future' ), 'numberposts' => 200, 'meta_key' => self::META, 'orderby' => 'ID', 'order' => 'ASC', 'suppress_filters' => true ) ); // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			foreach ( $posts as $p ) {
				self::$built[ (string) get_post_meta( $p->ID, self::META, true ) ] = (int) $p->ID;
			}
		}
		return self::$built;
	}

	/** Address of a page: the built one once it's published, otherwise the live site's address. */
	public static function url( $key, $hash = '' ) {
		if ( 'home' === $key ) {
			return home_url( '/' ) . $hash;
		}
		$b = self::built();
		if ( ! empty( $b[ $key ] ) && 'publish' === get_post_status( $b[ $key ] ) ) {
			return get_permalink( $b[ $key ] ) . $hash;
		}
		$c    = self::catalog();
		$slug = isset( $c[ $key ] ) ? $c[ $key ][1] : $key;
		return home_url( '/' . $slug . '/' ) . $hash;
	}

	/* ================================================================
	 * Little builders, so each page reads like a list of sections
	 * ============================================================== */

	private static function img( $file ) {
		return array( 'url' => WK_URL . 'assets/media/' . $file, 'id' => '' );
	}

	private static function link( $key, $hash = '' ) {
		return array( 'url' => self::url( $key, $hash ) );
	}

	private static function maps() {
		return array( 'url' => WK_Settings::get( 'maps_url' ), 'is_external' => 'on' );
	}

	/** Page banner. */
	private static function banner( $eyebrow, $title, $lead, $o = array() ) {
		return array( 'pagehero', array_merge( array(
			'eyebrow' => $eyebrow,
			'title'   => $title,
			'lead'    => $lead,
			'b1_text' => __( 'Book a free consultation', 'wulf-kit' ),
			'b1_link' => array( 'url' => '#visit' ),
			'b2_text' => '',
		), $o ) );
	}

	private static function split( $eyebrow, $title, $html, $o = array() ) {
		return array( 'split', array_merge( array(
			'eyebrow' => $eyebrow,
			'title'   => $title,
			'text'    => $html,
			'b1_text' => '',
			'b2_text' => '',
			'points'  => array(),
		), $o ) );
	}

	private static function points( $list ) {
		return array_map( static function ( $t ) {
			return array( 'text' => $t );
		}, $list );
	}

	private static function faq( $title, $items, $o = array() ) {
		$qa = array();
		foreach ( $items as $q => $a ) {
			$qa[] = array( 'q' => $q, 'a' => $a );
		}
		return array( 'faq', array_merge( array(
			'eyebrow' => __( 'Questions', 'wulf-kit' ),
			'title'   => $title,
			'items'   => $qa,
			'b1_text' => __( 'Ask us anything', 'wulf-kit' ),
			'b1_link' => array( 'url' => '#visit' ),
		), $o ) );
	}

	private static function cta( $eyebrow, $title, $text, $o = array() ) {
		return array( 'cta', array_merge( array(
			'eyebrow' => $eyebrow,
			'title'   => $title,
			'text'    => $text,
		), $o ) );
	}

	private static function lists( $eyebrow, $title, $groups, $o = array() ) {
		return array( 'lists', array_merge( array(
			'eyebrow' => $eyebrow,
			'title'   => $title,
			'groups'  => $groups,
		), $o ) );
	}

	private static function group( $title, $items = '', $text = '', $icon = 'none', $more = array() ) {
		return array_merge( array( 'icon' => $icon, 'title' => $title, 'text' => $text, 'items' => $items, 'link_text' => '' ), $more );
	}

	private static function steps( $eyebrow, $title, $items, $o = array() ) {
		$st = array();
		foreach ( $items as $it ) {
			$st[] = array( 'icon' => $it[2] ?? 'spark', 'title' => $it[0], 'text' => $it[1] );
		}
		return array( 'steps', array_merge( array( 'eyebrow' => $eyebrow, 'title' => $title, 'items' => $st ), $o ) );
	}

	private static function reviews( $o = array() ) {
		return array( 'reviews', array_merge( array( 'tone' => 'ivory' ), $o ) );
	}

	/** An OM Catalog widget, or a clear note when that plugin isn't active. */
	private static function om( $widget, $settings, $label ) {
		if ( class_exists( 'OM_Elementor_Catalog_Widget' ) || defined( 'OM_CATALOG_VERSION' ) || class_exists( 'OM_Shortcodes' ) ) {
			return array( 'om:' . $widget, $settings );
		}
		return array( 'prose', array(
			'title' => '',
			'text'  => '<p><strong>' . esc_html( $label ) . '</strong> — ' . esc_html__( 'this spot is for the OM Catalog plugin. Activate it, then drag its widget here (or rebuild this page).', 'wulf-kit' ) . '</p>',
		) );
	}

	private static function shop_page( $line, $title, $lead, $reels = true ) {
		$b = array(
			self::banner( __( 'Shop · Crown Point showroom', 'wulf-kit' ), $title, $lead, array(
				'tone'      => 'white',
				'media'     => 'none',
				'call_line' => '',
				'b1_text'   => __( 'Book a visit to try them on', 'wulf-kit' ),
				'b1_topic'  => '',
				'b2_text'   => __( 'Custom design', 'wulf-kit' ),
				'b2_link'   => self::link( 'custom-jewelry' ),
			) ),
		);
		if ( $reels ) {
			$b[] = self::om( 'om_reels_widget', array( 'source' => 'line', 'line' => $line ), __( 'Video highlights', 'wulf-kit' ) );
		}
		$b[] = self::om( 'om_catalog_widget', array( 'product_line' => $line ), __( 'Product catalog', 'wulf-kit' ) );
		$b[] = self::cta( __( 'See it in person', 'wulf-kit' ), __( 'Love something? Try it on in *Crown Point*.', 'wulf-kit' ), __( 'Save the pieces you like with the heart, and we\'ll have them ready for your visit. Can\'t find it? We can design it with you.', 'wulf-kit' ) );
		return $b;
	}

	/* ================================================================
	 * The pages
	 * ============================================================== */

	/**
	 * Sections for one page, top to bottom: list of [widget key, settings].
	 * Widget keys are Wulf widgets ("hero"), or "om:<name>" for OM Catalog widgets.
	 */
	public static function blocks( $key ) {
		$p2 = WK_Settings::get( 'phone2' );
		switch ( $key ) {

			case 'home':
				$b = array();
				foreach ( array( 'hero', 'help', 'tiles', 'products', 'craft', 'studio', 'values', 'reviews', 'story', 'fourcs', 'services', 'posts', 'visit' ) as $w ) {
					$b[] = array( $w, 'products' === $w ? array( 'join' => 'yes' ) : array() );
				}
				return $b;

			case 'about-us':
				return array(
					self::banner( __( 'About us · Crown Point jeweler', 'wulf-kit' ), __( 'Your *hometown* diamond jewelers.', 'wulf-kit' ), __( 'Independent since 1971: from a suitcase of fine gems to a newly built showroom on Broadway in Crown Point.', 'wulf-kit' ), array( 'image' => self::img( 'cullen.webp' ), 'fit' => 'cover', 'cap' => __( 'Cullen Wulf, owner · GIA-certified', 'wulf-kit' ), 'b2_text' => __( 'Our services', 'wulf-kit' ), 'b2_link' => self::link( 'jewelry-services-and-repairs' ) ) ),
					array( 'story', array() ),
					self::split( __( 'Concierge service', 'wulf-kit' ), __( 'We come to *you*.', 'wulf-kit' ), '<p>' . __( 'Our concierge service lets our jewelers come out to see you in person and make the most of your valuable time.', 'wulf-kit' ) . '</p><p>' . __( 'Whether you\'re celebrating an engagement, anniversary or birthday, or you just want the convenience of browsing quality jewelry from home, let us take care of you.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'cullen-desk.webp' ), 'tone' => 'ivory', 'b1_text' => __( 'Ask about concierge service', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ) ) ),
					array( 'values', array() ),
					self::split( __( 'Indiana gold & diamond buyer', 'wulf-kit' ), __( 'Fair, honest offers for what you no longer wear.', 'wulf-kit' ), '<p>' . __( 'Over time we have become a premium buyer of gold, silver, diamonds and more for Indiana and beyond. We give fair and honest appraisals to help you get the best deal possible on your pieces.', 'wulf-kit' ) . '</p><p>' . __( 'Whether you\'re looking to sell a diamond engagement ring or unwanted gold and silver, Wulf Diamond is Northwest Indiana\'s trusted gold and diamond buyer.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'rings-tray.webp' ), 'side' => 'left', 'rule' => 'yes', 'b1_text' => __( 'Sell gold & silver', 'wulf-kit' ), 'b1_link' => self::link( 'gold-silver-platinum' ), 'b2_text' => __( 'Sell a diamond', 'wulf-kit' ), 'b2_link' => self::link( 'diamond-buyers' ) ) ),
					self::split( __( 'Custom jewelry', 'wulf-kit' ), __( 'Inspired by *your* design.', 'wulf-kit' ), '<p>' . __( 'In addition to a robust selection of diamond engagement rings and wedding bands, we create custom jewelry inspired by your design. See our custom jewelry process, or ask about our diamond concierge service.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'custom-cad.webp' ), 'rule' => 'yes', 'b1_text' => __( 'See the custom process', 'wulf-kit' ), 'b1_link' => self::link( 'custom-jewelry' ) ) ),
					self::reviews(),
					array( 'visit', array() ),
				);

			case 'contact-us':
				return array(
					self::banner( __( 'Contact us', 'wulf-kit' ), __( 'Free *consultation*.', 'wulf-kit' ), __( 'Speak to a Wulf Diamond representative, or schedule your own appointment below. Walk-ins are always welcome.', 'wulf-kit' ), array( 'tone' => 'ivory', 'media' => 'image', 'image' => self::img( 'showroom.webp' ), 'fit' => 'cover', 'b1_text' => __( 'Schedule my appointment', 'wulf-kit' ), 'b2_text' => __( 'Get directions', 'wulf-kit' ), 'b2_link' => self::maps() ) ),
					array( 'visit', array( 'tone' => 'white' ) ),
					self::faq( __( 'Before you visit.', 'wulf-kit' ), array(
						__( 'Do I need an appointment?', 'wulf-kit' ) => '<p>' . __( 'No, walk-ins are always welcome. If you book ahead we\'ll have a private table and the pieces you\'re interested in ready for you.', 'wulf-kit' ) . '</p>',
						__( 'Is the consultation really free?', 'wulf-kit' ) => '<p>' . __( 'Yes. Consultations are free and there\'s never any pressure to buy.', 'wulf-kit' ) . '</p>',
						__( 'Will you look at jewelry I bought somewhere else?', 'wulf-kit' ) => '<p>' . __( 'Of course. Our in-house experts help with all aspects of your jewelry, including pieces purchased from another store.', 'wulf-kit' ) . '</p>',
						__( 'Can I sell jewelry, gold or coins during my visit?', 'wulf-kit' ) => '<p>' . __( 'Yes. Bring the pieces with you and we\'ll evaluate them in front of you and make you an offer, with no obligation.', 'wulf-kit' ) . '</p>',
					) ),
				);

			case 'thank-you':
				return array(
					self::banner( '', __( 'Thank you for *booking*.', 'wulf-kit' ), __( 'You will receive an email with your appointment details. We look forward to seeing you!', 'wulf-kit' ), array( 'tone' => 'ivory', 'media' => 'none', 'align' => 'center', 'crumbs' => '', 'call_line' => 'yes', 'call_text' => __( 'Questions before then? Call', 'wulf-kit' ), 'b1_text' => __( 'Back to the homepage', 'wulf-kit' ), 'b1_link' => self::link( 'home' ), 'b2_text' => __( 'Browse engagement rings', 'wulf-kit' ), 'b2_link' => self::link( 'engagement-rings' ) ) ),
					array( 'help', array() ),
				);

			case '404-2':
				return array(
					self::banner( __( 'Page not found', 'wulf-kit' ), __( 'We couldn\'t find *that page*.', 'wulf-kit' ), __( 'It may have moved. Try one of these, or give us a call and we\'ll point you in the right direction.', 'wulf-kit' ), array( 'tone' => 'ivory', 'media' => 'none', 'align' => 'center', 'crumbs' => '', 'b1_text' => __( 'Go to the homepage', 'wulf-kit' ), 'b1_link' => self::link( 'home' ), 'b2_text' => __( 'Browse the catalog', 'wulf-kit' ), 'b2_link' => self::link( 'catalogue' ) ) ),
					array( 'help', array() ),
				);

			case 'blog':
				return array(
					self::banner( __( 'The Wulf blog', 'wulf-kit' ), __( 'Never miss a Wulf Diamond Jewelers *blog*.', 'wulf-kit' ), __( 'New inventory, jewelry care, buying guides, specials and events from our Crown Point showroom.', 'wulf-kit' ), array( 'tone' => 'ivory', 'media' => 'none', 'call_line' => '', 'b1_text' => __( 'Get updates by email', 'wulf-kit' ), 'b1_link' => array( 'url' => '#subscribe' ), 'b1_topic' => '' ) ),
					array( 'posts', array( 'source' => 'latest', 'count' => 12, 'eyebrow' => __( 'Most recent posts', 'wulf-kit' ), 'title' => '', 'all_text' => '', 'fit' => 'cover', 'rule' => '' ) ),
				);

			case 'engagement-rings':
				return array(
					self::banner( __( 'Engagement rings · Crown Point', 'wulf-kit' ), __( 'Engagement *rings*.', 'wulf-kit' ), __( 'Find the ring style you or your significant other loves, and let one of our experienced team accompany you through one of life\'s most important decisions.', 'wulf-kit' ), array( 'tone' => 'white', 'media' => 'none', 'call_line' => '', 'b1_text' => __( 'Design your ring', 'wulf-kit' ), 'b1_link' => self::link( 'ring-builder' ), 'b2_text' => __( 'Book a free consultation', 'wulf-kit' ), 'b2_link' => array( 'url' => '#visit' ), 'b2_topic' => 'Engagement ring' ) ),
					self::om( 'om_reels_widget', array( 'source' => 'line', 'line' => 'engagement-rings' ), __( 'Video highlights', 'wulf-kit' ) ),
					self::om( 'om_catalog_widget', array( 'product_line' => 'engagement-rings' ), __( 'Engagement ring catalog', 'wulf-kit' ) ),
					array( 'studio', array() ),
					array( 'fourcs', array() ),
					self::faq( __( 'Engagement ring questions.', 'wulf-kit' ), self::engagement_faq() ),
					self::cta( __( 'Schedule your free consultation', 'wulf-kit' ), __( 'Nothing says "I love you" more than a *timeless piece*.', 'wulf-kit' ), __( 'Crafted with love and your own inspiration. 12 months same-as-cash financing available.', 'wulf-kit' ), array( 'b1_topic' => 'Engagement ring' ) ),
				);

			case 'ring-builder':
				return array(
					self::om( 'om_builder_widget', array(), __( 'Ring builder', 'wulf-kit' ) ),
					self::cta( __( 'Prefer to talk it through?', 'wulf-kit' ), __( 'Design it *together*, in person.', 'wulf-kit' ), __( 'Sit down with a GIA-certified jeweler and compare settings and diamonds side by side. Free, and no pressure.', 'wulf-kit' ), array( 'layout' => 'card', 'b1_topic' => 'Engagement ring' ) ),
				);

			case 'wedding-bands':
				return self::shop_page( 'wedding-bands', __( 'Wedding *bands*.', 'wulf-kit' ), __( 'Bands for both of you, from classic and eternity styles to diamond bands made to match your engagement ring.', 'wulf-kit' ) );
			case 'rings':
				return self::shop_page( 'fashion-rings', __( 'Fashion *rings*.', 'wulf-kit' ), __( 'Colored stones, stacking styles and everyday diamonds for the moments that aren\'t a proposal.', 'wulf-kit' ) );
			case 'earrings':
				return self::shop_page( 'earrings', __( '*Earrings*.', 'wulf-kit' ), __( 'Diamond studs, halos, hoops and drops, natural or lab-grown.', 'wulf-kit' ) );
			case 'necklaces':
				return self::shop_page( 'necklaces', __( '*Necklaces*.', 'wulf-kit' ), __( 'Tennis, station and statement necklaces to wear every day or for the big ones.', 'wulf-kit' ), false );
			case 'pendants':
				return self::shop_page( 'pendants', __( '*Pendants*.', 'wulf-kit' ), __( 'Solitaires, halos, circles and initials, on the chain of your choice.', 'wulf-kit' ) );
			case 'bracelets':
				return self::shop_page( 'bracelets', __( '*Bracelets*.', 'wulf-kit' ), __( 'Tennis bracelets, bangles and nameplates, in yellow, white and rose gold.', 'wulf-kit' ), false );

			case 'catalogue':
				return array(
					self::banner( __( 'The full catalog', 'wulf-kit' ), __( 'The Wulf *catalogue*.', 'wulf-kit' ), __( 'Every style we can order or make for you, from engagement rings to earrings. Search by style number, or browse by line.', 'wulf-kit' ), array( 'tone' => 'white', 'media' => 'none', 'call_line' => '', 'b1_text' => __( 'Design your ring', 'wulf-kit' ), 'b1_link' => self::link( 'ring-builder' ), 'b2_text' => __( 'Book a visit', 'wulf-kit' ), 'b2_link' => array( 'url' => '#visit' ) ) ),
					self::om( 'om_catalog_widget', array( 'product_line' => 'earrings', 'extra_lines' => array( 'engagement-rings', 'wedding-bands', 'bracelets', 'fashion-rings', 'necklaces', 'pendants' ) ), __( 'Product catalog', 'wulf-kit' ) ),
				);

			case 'single-product-layout':
				return array(
					self::om( 'om_product_widget', array(), __( 'Single product', 'wulf-kit' ) ),
					self::steps( __( 'What happens next', 'wulf-kit' ), __( 'From "I love it" to *yours*.', 'wulf-kit' ), array(
						array( __( 'Consult', 'wulf-kit' ), __( 'A relaxed, free conversation about style, timing and budget.', 'wulf-kit' ), 'calendar' ),
						array( __( 'Compare', 'wulf-kit' ), __( 'See it in person, with diamonds side by side under the loupe.', 'wulf-kit' ), 'gem' ),
						array( __( 'Craft', 'wulf-kit' ), __( 'We set your stone, or adjust the design with you.', 'wulf-kit' ), 'tool' ),
						array( __( 'Celebrate', 'wulf-kit' ), __( 'Pick it up, and come back for free cleaning any time.', 'wulf-kit' ), 'spark' ),
					), array( 'marker' => 'icon' ) ),
					self::reviews( array( 'tone' => 'white' ) ),
					self::cta( __( 'Free consultation', 'wulf-kit' ), __( 'See this piece *in person*.', 'wulf-kit' ), __( 'Book a time and we\'ll have it ready, along with similar styles to compare.', 'wulf-kit' ), array( 'layout' => 'card' ) ),
				);

			case 'best-diamonds':
				return array(
					self::banner( __( 'Diamond jewelry · Crown Point', 'wulf-kit' ), __( 'Crown Point\'s diamond *jewelry* seller.', 'wulf-kit' ), __( 'A vast selection of diamond rings, bracelets, earrings, necklaces and more. We only buy high-quality diamonds, and we only sell high-quality diamonds.', 'wulf-kit' ), array( 'image' => self::img( '41101.webp' ), 'fit' => 'contain', 'cap' => __( 'Floral halo stud earrings', 'wulf-kit' ), 'cap_link' => self::link( 'earrings' ), 'b2_text' => __( 'Browse the catalog', 'wulf-kit' ), 'b2_link' => self::link( 'catalogue' ) ) ),
					array( 'help', array( 'title' => __( 'Shop diamond jewelry', 'wulf-kit' ), 'items' => self::category_circles() ) ),
					self::split( __( 'Wulf Diamond Jewelers', 'wulf-kit' ), __( 'Know what to look for, before you buy.', 'wulf-kit' ), '<p>' . __( 'With certified gemologists and jewelry repair experts on staff, we can easily separate the wheat from the chaff. Below is a plain-words guide to what matters in a diamond. If you have questions, or you\'d like to weigh your options with a local diamond expert, just ask.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'diamond-hand.webp' ), 'rule' => 'yes' ) ),
					array( 'fourcs', array() ),
					self::lists( __( 'The 4Cs, in detail', 'wulf-kit' ), __( 'How diamonds are graded.', 'wulf-kit' ), array(
						self::group( __( 'Cut', 'wulf-kit' ), "Ideal cut (0)\nExcellent cut (1)\nVery good cut (2)\nGood cut (3–4)\nFair cut (5–7)\nPoor cut (8–10)", __( 'Cut is the angles, polish, proportions and symmetry that make a diamond sparkle. Don\'t confuse it with shape.', 'wulf-kit' ), 'spark' ),
						self::group( __( 'Color', 'wulf-kit' ), "**No color: D–F\n**Nearly colorless: G–J\nFaint color: K–M\nVery light color: N–R\nLight color: S–Z", __( 'Color is really the lack of color. GIA grades from D (colorless) to Z (light yellow or brown).', 'wulf-kit' ), 'gem' ),
						self::group( __( 'Clarity', 'wulf-kit' ), "Flawless (FL)\nInternally flawless (IF)\nVery, very slightly included (VVS1, VVS2)\nVery slightly included (VS1, VS2)\nSlightly included (SI1, SI2)\nIncluded (I1, I2, I3)", __( 'The higher the clarity, the fewer inclusions or blemishes.', 'wulf-kit' ), 'search' ),
					), array( 'tone' => 'ivory', 'rule' => '' ) ),
					self::split( __( 'Carat', 'wulf-kit' ), __( 'Carat is weight, not size.', 'wulf-kit' ), '<p>' . __( 'One carat equals 0.2 grams. Unlike the other Cs there\'s nothing subjective about it: the scale doesn\'t lie. Generally, the more a diamond weighs, the more it costs, but cut and shape change how big it looks.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'diamond-tweezers.webp' ), 'side' => 'left' ) ),
					self::split( __( 'Choose Wulf', 'wulf-kit' ), __( 'Pressure-free, professional and *polite*.', 'wulf-kit' ), '<p>' . __( 'With a concierge jewelry service and a record of custom jewelry Northwest Indiana loves, Wulf Diamond Jewelers should be your destination when that special event arrives. We\'ll put your mind at ease and make buying, and wearing, diamond jewelry all the more special.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'showroom-tall.webp' ), 'rule' => 'yes', 'b1_text' => __( 'Schedule an appointment', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ) ) ),
					self::reviews(),
					self::cta( __( 'Need help with your jewelry?', 'wulf-kit' ), __( 'Speak to a *jewelry expert* today.', 'wulf-kit' ), __( 'Our in-house experts help with all aspects of your jewelry, including pieces purchased from another store.', 'wulf-kit' ) ),
				);

			case 'engagement-rings-2':
				return array(
					self::banner( __( 'Engagement rings in Crown Point', 'wulf-kit' ), __( 'Where to buy engagement rings in *Indiana*.', 'wulf-kit' ), __( 'The right engagement ring is a lasting expression of your love. Find the diamond ring or bridal set you\'ve been dreaming of at Wulf Diamond Jewelers in Crown Point.', 'wulf-kit' ), array( 'image' => self::img( 'ring-rose.webp' ), 'fit' => 'cover', 'b1_topic' => 'Engagement ring', 'b2_text' => __( 'Explore our collection', 'wulf-kit' ), 'b2_link' => self::link( 'engagement-rings' ) ) ),
					array( 'prose', array( 'eyebrow' => __( 'People speak for us', 'wulf-kit' ), 'title' => __( '"He created a true masterpiece with my engagement ring."', 'wulf-kit' ), 'title_tag' => 'h2', 'head_align' => 'center', 'center' => 'yes', 'tone' => 'ivory', 'text' => '<blockquote><p>' . __( 'Absolutely love Cullen\'s work! He created a true masterpiece with my engagement ring, by including my grandmother\'s wedding ring into the design. I was blown away when I came to find out he was able to use her entire ring into my ring. My fiancé also loved working with Cullen; he treats you as a friend and doesn\'t make the diamond and ring shopping intimidating at all. I definitely recommend him to all.', 'wulf-kit' ) . '</p></blockquote><p>' . __( '— A Wulf customer', 'wulf-kit' ) . '</p>' ) ),
					self::split( __( 'Why choose Wulf Diamond Jewelers?', 'wulf-kit' ), __( 'Choosing a jeweler is almost as important as choosing *the one*.', 'wulf-kit' ), '<p>' . __( 'We offer top-quality, affordable, beautiful and individual jewelry, and our customers have continued to choose us for over five decades. You\'ll notice the difference with our well-trained, friendly staff.', 'wulf-kit' ) . '</p><p>' . __( 'We take the time to get to know you, and you\'ll never experience high-pressure sales from us. With 12 months same-as-cash financing, it\'s easier than ever to choose the ring you really want, and we work with all budgets.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'ring-emerald.webp' ), 'b1_text' => __( 'Schedule a free consultation', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ), 'b1_topic' => 'Engagement ring' ) ),
					self::split( __( 'Quality you can see', 'wulf-kit' ), __( 'What makes our engagement rings *stand out*.', 'wulf-kit' ), '<p>' . __( 'Our engagement rings use only the highest quality diamonds, carefully set in hand-crafted mountings. Whether you\'re shopping alone or browsing together, we\'ll help you find the piece that truly expresses your commitment to one another.', 'wulf-kit' ) . '</p><p>' . __( 'Choose the size, cut, color and shape that really wows you, and we\'ll help you compare the most popular diamond cuts to find the right one for your personality.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'ring-cushion-dark.webp' ), 'side' => 'left', 'rule' => 'yes', 'b1_text' => __( 'Design your ring', 'wulf-kit' ), 'b1_link' => self::link( 'ring-builder' ) ) ),
					self::faq( __( 'Engagement ring questions.', 'wulf-kit' ), self::engagement_faq() ),
					self::cta( __( 'Schedule your free consultation', 'wulf-kit' ), __( 'Nothing says "I love you" more than a *timeless piece*.', 'wulf-kit' ), __( 'Crafted with love and your own inspiration.', 'wulf-kit' ), array( 'b1_topic' => 'Engagement ring' ) ),
				);

			case 'gems':
				return array(
					self::banner( __( 'Wulf gem vault', 'wulf-kit' ), __( 'Custom jewelry & *gems*.', 'wulf-kit' ), __( 'Browse our gem vault, then visit our Crown Point showroom to start building your custom piece. Our experts can design any custom ring, necklace, earring or bracelet.', 'wulf-kit' ), array( 'image' => self::img( 'diamond-tweezers.webp' ), 'fit' => 'cover', 'b1_topic' => 'Custom design', 'b2_text' => __( 'The custom process', 'wulf-kit' ), 'b2_link' => self::link( 'custom-jewelry' ) ) ),
					self::split( __( 'A rainbow of colored gems', 'wulf-kit' ), __( 'Every color, and every *cut*.', 'wulf-kit' ), '<p>' . __( 'Start by choosing from the rainbow of colored gems in our vault. In addition to a vast color selection, we carry a wide variety of gem cuts, from traditional oval and round to one-of-a-kind heart and trillion cuts.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'custom-finished.webp' ), 'points' => self::points( array( __( 'Oval and round', 'wulf-kit' ), __( 'Heart and trillion', 'wulf-kit' ), __( 'Your own stone, reset in a new design', 'wulf-kit' ) ) ), 'b1_text' => __( 'Ask what\'s in the vault', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ), 'b1_topic' => 'Custom design' ) ),
					self::custom_steps(),
					self::reviews( array( 'tone' => 'white' ) ),
					self::cta( __( 'Custom jewelry inspired by your design', 'wulf-kit' ), __( 'Let\'s design something *only you* will wear.', 'wulf-kit' ), __( 'See our custom jewelry process, or ask about our diamond concierge service.', 'wulf-kit' ), array( 'b1_topic' => 'Custom design' ) ),
				);

			case 'jewelry-services-and-repairs':
				return array(
					self::banner( __( 'Jewelry repair & services', 'wulf-kit' ), __( 'Jewelry repair and services in *Crown Point*.', 'wulf-kit' ), __( 'From your engagement ring to family heirlooms, our in-house goldsmiths keep your jewelry well-maintained and sparkling for years to come.', 'wulf-kit' ), array( 'image' => self::img( 'repair-bench.webp' ), 'fit' => 'cover', 'b1_text' => __( 'Plan a repair', 'wulf-kit' ), 'b1_topic' => 'Repair', 'trust' => array( array( 'icon' => 'tool', 'text' => __( 'In-house goldsmiths', 'wulf-kit' ) ), array( 'icon' => 'spark', 'text' => __( 'Free cleaning & inspection', 'wulf-kit' ) ), array( 'icon' => 'shield', 'text' => __( 'Any brand, bought anywhere', 'wulf-kit' ) ) ) ) ),
					self::split( __( 'Jewelry services & repair', 'wulf-kit' ), __( 'We know how much your jewelry *means to you*.', 'wulf-kit' ), '<p>' . __( 'Our local, in-house professionals perform thorough jewelry services and repairs. As a top retailer of diamond jewelry, we pride ourselves on being the finest jewelry repair shop in Northwest Indiana and the greater Chicago area.', 'wulf-kit' ) . '</p><p>' . __( 'With up-to-date technology and the skill to accomplish even the most challenging requests, our goldsmiths handle your jewelry with care and repair it in a timely manner.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'repair-tools.webp' ) ) ),
					self::lists( __( 'Jewelry services we offer', 'wulf-kit' ), __( 'A full-service jewelry repair store.', 'wulf-kit' ), array(
						self::group( __( 'What we repair', 'wulf-kit' ), "Ring cleaning\nRing resizing\nReplacing gemstones\nRe-tipping or repairing prongs\nStone tightening\nEngraving rings and necklaces\nEarring posts and backs\nFixing broken necklace or bracelet chains\nReplacing broken clasps\nRestringing pearls and beaded pieces", __( 'A loose diamond, a broken chain or a ring that needs resizing: whatever it is, we can take care of it.', 'wulf-kit' ), 'tool' ),
						self::group( __( 'Brands we repair', 'wulf-kit' ), "Boucheron\nBuccellati\nBVLGARI\nCartier\nChopard\nDavid Webb\nDavid Yurman\nDior\nGeorg Jensen\nHermès\nJohn Hardy\nLagos\nMikimoto\nTiffany & Co.\nScott Kay\nVan Cleef & Arpels\nAnd more", __( 'Bought at Wulf or elsewhere, a gift or a family piece: we repair all jewelry, from antiques to high-end brands.', 'wulf-kit' ), 'gem' ),
					), array( 'tone' => 'ivory', 'rule' => '', 'item_cols' => array( 'size' => 2, 'unit' => 'px' ) ) ),
					self::split( __( 'Visit Wulf Diamond', 'wulf-kit' ), __( 'Fast and *affordable* repairs.', 'wulf-kit' ), '<p>' . __( 'Our professionals are true masters of jewelry repair, combining traditional methods with advanced technology to give you the best service possible.', 'wulf-kit' ) . '</p><p>' . __( 'Twice-a-year examinations and service can prevent bigger problems from developing, so bring your pieces in any time for a free cleaning and inspection.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'jeweler-work.webp' ), 'side' => 'left', 'b1_text' => __( 'Book a repair visit', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ), 'b1_topic' => 'Repair' ) ),
					self::faq( __( 'Repair costs and questions.', 'wulf-kit' ), array(
						__( 'How much does jewelry repair cost?', 'wulf-kit' ) => '<p>' . __( 'It depends on the piece and the work needed. The brand, type or style, and the parts and labor required all factor in. We evaluate every piece to give you the best price possible; the ranges below are rough guides only.', 'wulf-kit' ) . '</p>',
						__( 'How much does it cost to fix a broken necklace?', 'wulf-kit' ) => '<p>' . __( 'Anywhere from about $10 up to the $300 range, depending on the repair and the necklace. A simple gold or platinum chain can usually be soldered back together easily; complex chains cost more. Broken clasps are easily replaced, priced by the clasp type and material.', 'wulf-kit' ) . '</p>',
						__( 'How much does it cost to resize a ring?', 'wulf-kit' ) => '<p>' . __( 'Ring resizing ranges from about $30 to $300, depending on the width, material, style and design of the ring, and how much it needs to change.', 'wulf-kit' ) . '</p>',
						__( 'How much does it cost to reset a stone?', 'wulf-kit' ) => '<p>' . __( 'Because gemstones, sizes and settings vary so widely, resetting a stone can cost as little as $20 or as much as $300.', 'wulf-kit' ) . '</p>',
						__( 'Should I repair my jewelry myself?', 'wulf-kit' ) => '<p>' . __( 'We don\'t recommend it. Repair, cleaning and polishing need a high level of expertise. To keep your jewelry shining for years, have it professionally maintained, ideally with a check-up twice a year.', 'wulf-kit' ) . '</p>',
					) ),
					self::reviews(),
					self::cta( __( 'Need help with your jewelry?', 'wulf-kit' ), __( 'Speak to a *jewelry expert* today.', 'wulf-kit' ), __( 'Our in-house experts help with all aspects of your jewelry, including items purchased from another store.', 'wulf-kit' ), array( 'b1_topic' => 'Repair' ) ),
				);

			case 'custom-jewelry':
				return array(
					self::banner( __( 'Custom jewelry · Crown Point, Indiana', 'wulf-kit' ), __( 'Custom designed jewelry in *Crown Point*.', 'wulf-kit' ), __( 'Ever wanted a one-of-a-kind piece? Come in and our experienced designers will help you create whatever your heart desires.', 'wulf-kit' ), array( 'image' => self::img( 'custom-cad.webp' ), 'fit' => 'cover', 'cap' => __( 'Every piece starts as a 3D design you approve', 'wulf-kit' ), 'b1_topic' => 'Custom design' ) ),
					self::split( __( 'Made for you', 'wulf-kit' ), __( 'Every accessory becomes a *statement piece*.', 'wulf-kit' ), '<p>' . __( 'We believe everyone deserves to feel and look their best. Whether you need something special for your collection or want to create a family heirloom, you can trust our craftsmen.', 'wulf-kit' ) . '</p><p>' . __( 'For over five decades we\'ve helped customers with their unique jewelry needs, from engagement rings to statement necklaces.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'custom-finished.webp' ) ) ),
					self::custom_steps(),
					self::reviews( array( 'tone' => 'white' ) ),
					self::cta( __( 'Schedule your free consultation', 'wulf-kit' ), __( 'Nothing says "I love you" more than a *timeless piece*.', 'wulf-kit' ), __( 'Crafted with love and your own inspiration. Bring a sketch, a photo or a family stone.', 'wulf-kit' ), array( 'b1_topic' => 'Custom design' ) ),
				);

			case 'jewelry-appraisals':
				return array(
					self::banner( __( 'Jewelry appraisals · Crown Point', 'wulf-kit' ), __( 'How much is my *jewelry* worth?', 'wulf-kit' ), __( 'Accurate, honest jewelry appraisals from GIA-certified professionals you can trust.', 'wulf-kit' ), array( 'image' => self::img( 'appraisal-loupe.webp' ), 'fit' => 'cover', 'b1_text' => __( 'Book an appraisal', 'wulf-kit' ), 'b1_topic' => 'Appraisal', 'trust' => array( array( 'icon' => 'cert', 'text' => __( 'GIA-certified', 'wulf-kit' ) ), array( 'icon' => 'clock', 'text' => __( 'Since 1971', 'wulf-kit' ) ), array( 'icon' => 'pin', 'text' => __( 'Locals serving locals', 'wulf-kit' ) ) ) ) ),
					self::split( __( 'A local jeweler you can rely on', 'wulf-kit' ), __( 'Pre-owned, inherited, or *just engaged*.', 'wulf-kit' ), '<p>' . __( 'In addition to selling, creating and buying jewelry, Wulf offers jewelry appraisals, including pre-owned jewelry and diamond ring appraisals.', 'wulf-kit' ) . '</p><p>' . __( 'For over five decades Wulf has been one of Northwest Indiana\'s most established local jewelers. We\'re staffed with Northwest Indiana locals, and we serve locals.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'appraisal-gloves.webp' ) ) ),
					self::lists( __( 'Why do I need an appraisal?', 'wulf-kit' ), __( 'Know the value of what you wear.', 'wulf-kit' ), array(
						self::group( __( 'Insurance', 'wulf-kit' ), '', __( 'Many insurers require a current appraisal. Know your jewelry\'s replacement value in case of damage, theft or loss, for a single piece or a whole estate collection.', 'wulf-kit' ), 'shield' ),
						self::group( __( 'Appraisal updates', 'wulf-kit' ), '', __( 'Metal and gem values change over time, and so does a piece after it\'s repaired or altered. Keep your appraisal current.', 'wulf-kit' ), 'clock' ),
						self::group( __( 'Engagement rings', 'wulf-kit' ), '', __( 'In the excitement of a new engagement, don\'t forget to get the ring appraised and insured.', 'wulf-kit' ), 'ring' ),
						self::group( __( 'Selling jewelry', 'wulf-kit' ), '', __( 'An up-to-date appraisal helps you understand what your jewelry is worth before you sell.', 'wulf-kit' ), 'cash' ),
						self::group( __( 'Pre-owned jewelry', 'wulf-kit' ), '', __( 'Inherited or vintage? An appraiser can tell you what it\'s worth and the details of the piece.', 'wulf-kit' ), 'gift' ),
						self::group( __( 'How it works', 'wulf-kit' ), "Weight\nMaterials\nQuality\nRarity of the gem\nMarkings\nManufacturing", __( 'Bring your piece in. A certified appraiser evaluates it and establishes its value by looking at:', 'wulf-kit' ), 'search' ),
					), array( 'tone' => 'ivory', 'rule' => '' ) ),
					self::lists( __( 'Finding a reputable appraiser', 'wulf-kit' ), __( 'What to look for in an *appraiser*.', 'wulf-kit' ), array(
						self::group( __( 'Certified', 'wulf-kit' ), '', __( 'Look for a certified gemologist. The Gemological Institute of America (GIA) certification is a good place to start, and Wulf has GIA-certified experts on staff.', 'wulf-kit' ), 'cert' ),
						self::group( __( 'Experienced', 'wulf-kit' ), '', __( 'Certifications mean more with real-world experience on many different pieces and clients.', 'wulf-kit' ), 'star' ),
						self::group( __( 'No closed doors', 'wulf-kit' ), '', __( 'You should feel comfortable asking how a value was reached. If an appraiser isn\'t straight with you, go elsewhere.', 'wulf-kit' ), 'heart' ),
					) ),
					self::faq( __( 'Appraisal questions.', 'wulf-kit' ), array(
						__( 'How often should I get my jewelry appraised?', 'wulf-kit' ) => '<p>' . __( 'Ideally every 2–3 years, or whenever a piece is altered. An up-to-date record matters if a piece is lost, stolen or damaged, and some insurers require regular updates to keep a policy current.', 'wulf-kit' ) . '</p>',
						__( 'Which areas do you serve?', 'wulf-kit' ) => '<p>' . __( 'Crown Point, Valparaiso, Schererville, all of Northwest Indiana and nearby states.', 'wulf-kit' ) . '</p>',
					) ),
					self::cta( __( 'Looking to get paid?', 'wulf-kit' ), __( 'Turn jewelry you don\'t wear into *cash*.', 'wulf-kit' ), __( 'Unlike pawn shops and big chains, Wulf will always offer fair pricing to help you get the most for what you have.', 'wulf-kit' ), array( 'b1_text' => __( 'I\'m ready to sell', 'wulf-kit' ), 'b1_link' => self::link( 'fine-jewelry' ), 'b1_topic' => '' ) ),
				);

			case 'gold-silver-platinum':
				return array(
					self::banner( __( 'We buy gold, silver & platinum', 'wulf-kit' ), __( 'Gold, silver and *platinum* buyers.', 'wulf-kit' ), __( 'Northwest Indiana\'s trusted gold and silver buyer. Don\'t let unwanted gold sit around: sell it for cash.', 'wulf-kit' ), array( 'image' => self::img( 'rings-tray.webp' ), 'fit' => 'cover', 'b1_text' => __( 'Get an offer', 'wulf-kit' ), 'b1_topic' => 'Selling' ) ),
					self::split( __( 'Is it time to sell your valuables?', 'wulf-kit' ), __( 'Investment gold, coins, scrap or *jewelry*.', 'wulf-kit' ), '<p>' . __( 'Whether you invested in gold or inherited it as gold coins, scrap gold or jewelry, it\'s important to sell to a trusted, experienced buyer. We take every customer and every transaction seriously, because we want you to get the best deal out there.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'product-halo-yellow.webp' ), 'fit' => 'contain', 'points' => self::points( array( __( 'Gold: jewelry, coins, bars and scrap', 'wulf-kit' ), __( 'Silver: jewelry, coins and sterling', 'wulf-kit' ), __( 'Platinum: jewelry and estate pieces', 'wulf-kit' ) ) ), 'b1_text' => __( 'Bring them in', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ), 'b1_topic' => 'Selling' ) ),
					self::lists( __( 'Why choose Wulf Diamond?', 'wulf-kit' ), __( 'A jewelry store that buys gold is your *best option*.', 'wulf-kit' ), array(
						self::group( __( 'Reputation', 'wulf-kit' ), '', __( 'A trusted local jeweler since 1971. Our reputation is so strong that jewelry stores, coin dealers and even "We Buy Gold" stores sell to us.', 'wulf-kit' ), 'star' ),
						self::group( __( 'Expertise', 'wulf-kit' ), '', __( 'We understand the gold, silver and platinum markets. Pawn shops and online buyers often have fewer resources and buyers, so they may not offer top dollar.', 'wulf-kit' ), 'cert' ),
						self::group( __( 'Honesty', 'wulf-kit' ), '', __( 'Customers return to sell again and again because they know they can depend on Wulf to be honest and fair.', 'wulf-kit' ), 'heart' ),
					), array( 'tone' => 'ivory', 'rule' => '' ) ),
					self::reviews( array( 'tone' => 'white' ) ),
					self::sell_cta(),
				);

			case 'diamond-buyers':
				return array(
					self::banner( __( 'Sell your diamonds', 'wulf-kit' ), __( 'Top rated *diamond buyer*.', 'wulf-kit' ), __( 'An honest, hassle-free approach and a high cash offer for your unwanted diamonds. The evaluation is completely free.', 'wulf-kit' ), array( 'image' => self::img( 'diamond-pear.webp' ), 'fit' => 'cover', 'b1_text' => __( 'Get a cash offer', 'wulf-kit' ), 'b1_topic' => 'Selling', 'call_text' => __( 'Or call', 'wulf-kit' ) ) ),
					self::split( __( 'What should I look for in a diamond buyer?', 'wulf-kit' ), __( 'Never feel *pressured*.', 'wulf-kit' ), '<p>' . __( 'Don\'t sell your diamonds at a pawn shop or a "cash-for-diamonds" superstore; sell to a reputable, professional diamond buyer. We understand selling a diamond can be emotional, and a buyer who hassles and haggles only adds stress. That won\'t happen here.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'diamond-solitaire.webp' ) ) ),
					self::split( __( 'What kinds of diamonds does Wulf purchase?', 'wulf-kit' ), __( 'We buy *all kinds*. It\'s that simple.', 'wulf-kit' ), '<p>' . __( 'Rings, engagement rings, loose diamonds and diamond jewelry. If you\'d like to trade a diamond for another, we\'re your destination too: we sell a wide variety of diamond jewelry.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'diamond-halo-dark.webp' ), 'side' => 'left', 'rule' => 'yes', 'b2_text' => __( 'See our diamond jewelry', 'wulf-kit' ), 'b2_link' => self::link( 'best-diamonds' ) ) ),
					self::steps( __( 'How are diamonds priced?', 'wulf-kit' ), __( 'Evaluated *in front of you*.', 'wulf-kit' ), array(
						array( __( 'Evaluate', 'wulf-kit' ), __( 'Our professional appraisers evaluate your diamond in front of you, free of charge.', 'wulf-kit' ), 'search' ),
						array( __( 'Explain', 'wulf-kit' ), __( 'We explain its value in detail: the cut, how we grade it, and your options.', 'wulf-kit' ), 'bulb' ),
						array( __( 'Offer', 'wulf-kit' ), __( 'We make you a high cash offer, with no obligations or contracts.', 'wulf-kit' ), 'cash' ),
						array( __( 'Get paid', 'wulf-kit' ), __( 'If you accept, as most people do, cash is paid immediately.', 'wulf-kit' ), 'check' ),
					), array( 'b1_text' => __( 'Book a free evaluation', 'wulf-kit' ), 'b1_topic' => 'Selling' ) ),
					self::faq( __( 'Selling a diamond.', 'wulf-kit' ), array(
						__( 'Do I need to bring an appraisal or receipt?', 'wulf-kit' ) => '<p>' . __( 'No. If your diamond has a grading certificate from an independent lab such as GIA, please bring it along. Appraisals and receipts aren\'t necessary because our staff are GIA-trained, but if you have them, bring them too.', 'wulf-kit' ) . '</p>',
						__( 'Why a cash offer instead of an insurance appraisal?', 'wulf-kit' ) => '<p>' . __( 'A cash offer is the actual price you\'ll be paid on the spot. An insurance appraisal estimates the cost of replacing the piece at retail, including the jeweler\'s costs and profit, and ignores condition and marketability, so it\'s much higher than the actual cash value.', 'wulf-kit' ) . '</p>',
						__( 'Should I sell on consignment?', 'wulf-kit' ) => '<p>' . __( 'Be wary. Consignment can drag on for months or years while the jeweler sells their own stock first, and your diamond may never sell.', 'wulf-kit' ) . '</p>',
						__( 'Is the evaluation really free?', 'wulf-kit' ) => '<p>' . __( 'Yes, it\'s completely complimentary, and there\'s no obligation to sell.', 'wulf-kit' ) . '</p>',
					) ),
					self::reviews(),
					self::sell_cta( array( 'phone' => $p2 ) ),
				);

			case 'coins-currency':
				return array(
					self::banner( __( 'Coin & currency buyer', 'wulf-kit' ), __( 'Coins and *currency* buyer.', 'wulf-kit' ), __( 'Silver dollars, gold coins, proof sets, complete collections, estates and old US currency. Free in-store appraisals while you watch.', 'wulf-kit' ), array( 'image' => self::img( 'coins-silver.webp' ), 'fit' => 'cover', 'b1_text' => __( 'Get an offer', 'wulf-kit' ), 'b1_topic' => 'Selling' ) ),
					self::lists( __( 'What we buy', 'wulf-kit' ), __( 'Coins and paper currency we *accept*.', 'wulf-kit' ), array(
						self::group( __( 'Coins', 'wulf-kit' ), "All US gold coins\nRare US silver coins\nDollars: 1935 and earlier\nMorgan dollars\nHalves: 1970 and earlier\nQuarters: 1964 and earlier\nDimes: 1964 and earlier\nNickels: 1938 and earlier, and 1942–1945\nUS Mint proof and mint sets and singles\nUS gold and silver American Eagle singles and sets", __( 'Proof sets, complete collections, estates, investment holdings, hoards and all collector coins.', 'wulf-kit' ), 'cash' ),
						self::group( __( 'Paper currency', 'wulf-kit' ), "High denomination notes: $500, $1,000, $5,000 and $10,000\nUS silver certificates 1957 and earlier\nUS notes with a red or blue seal\nUS currency from 1929 and older\nOld US currency with bank names on the note\nLarge size US currency from 1923 and earlier\nUS fractional currency 1862–1876\nSmall and large size US gold certificates", __( 'US currency from 1934 and earlier, and the notes below.', 'wulf-kit' ), 'mail' ),
					), array( 'tone' => 'ivory', 'rule' => '' ) ),
					self::split( __( 'Collections and estates', 'wulf-kit' ), __( 'Appraised *while you watch*.', 'wulf-kit' ), '<p>' . __( 'We consider condition, rarity, date and circulation, and we\'re happy to answer any questions about your collection as we go.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'coins-jar.webp' ), 'side' => 'left', 'b1_text' => __( 'Book a free appraisal', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ), 'b1_topic' => 'Selling' ) ),
					self::faq( __( 'Questions about selling coins and currency.', 'wulf-kit' ), array(
						__( 'Is there a set price you will pay for coins or currency?', 'wulf-kit' ) => '<p>' . __( 'We consider several factors, including condition, rarity, date and circulation. We offer free in-store appraisals of your collection while you watch.', 'wulf-kit' ) . '</p>',
						__( 'I have a lot of dimes, quarters and half dollars. What are they worth?', 'wulf-kit' ) => '<p>' . __( 'Their value changes with the market, and they\'re typically bought and sold in bulk for their silver content. Coins from 1964 and earlier are 90% silver; half dollars from 1965–1970 are 40% silver. Some dates are worth more, so bring in your collection for a high cash offer.', 'wulf-kit' ) . '</p>',
						__( 'Will cleaning or polishing my coins bring a better price?', 'wulf-kit' ) => '<p>' . __( 'Absolutely not. Cleaning or polishing actually lowers a coin\'s value. Even a soft cloth can leave small abrasions that a professional dealer will see.', 'wulf-kit' ) . '</p>',
						__( 'What\'s the best way to store my coins?', 'wulf-kit' ) => '<p>' . __( 'Store coins individually so they don\'t touch, in approved coin containers. If you use booklets, don\'t use tape: it sticks to the coins and causes discoloration that reduces their value.', 'wulf-kit' ) . '</p>',
						__( 'My silver dollar has a "V" in the word TRUST. Is it a misprint?', 'wulf-kit' ) => '<p>' . __( 'No. Peace dollars from 1921–1935 all have the "V" in TRUST. It was done by design.', 'wulf-kit' ) . '</p>',
					) ),
					self::reviews( array( 'tone' => 'white' ) ),
					self::sell_cta(),
				);

			case 'sterling-silver':
				return array(
					self::banner( __( 'We buy sterling silver', 'wulf-kit' ), __( 'Sterling silver *buyers*.', 'wulf-kit' ), __( 'Flatware, tableware and other sterling pieces. We evaluate them in front of you and make a fair cash offer.', 'wulf-kit' ), array( 'image' => self::img( 'sterling-silver.webp' ), 'fit' => 'cover', 'b1_text' => __( 'Get an offer', 'wulf-kit' ), 'b1_topic' => 'Selling' ) ),
					self::split( __( 'Which sterling silver do we purchase?', 'wulf-kit' ), __( 'From the china cabinet to the *jewelry box*.', 'wulf-kit' ), '<p>' . __( 'In addition to gold, diamonds and fine jewelry, we buy sterling silver. Bring in what you no longer use and we\'ll explain every offer piece by piece.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'rings-tray.webp' ), 'points' => self::points( array( __( 'Flatware', 'wulf-kit' ), __( 'Tableware', 'wulf-kit' ), __( 'Silver jewelry and other sterling pieces', 'wulf-kit' ) ) ), 'b1_text' => __( 'Bring them in', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ), 'b1_topic' => 'Selling' ) ),
					self::reviews(),
					self::sell_cta(),
				);

			case 'fine-jewelry':
				return array(
					self::banner( __( 'Sell your fine jewelry', 'wulf-kit' ), __( 'Fine *jewelry* buyers.', 'wulf-kit' ), __( 'Estate, designer, diamond and silver jewelry, even broken pieces. A fair offer, explained, with no pressure to accept.', 'wulf-kit' ), array( 'image' => self::img( 'appraisal-necklaces.webp' ), 'fit' => 'cover', 'b1_text' => __( 'Get an offer', 'wulf-kit' ), 'b1_topic' => 'Selling' ) ),
					self::split( __( 'Sell estate jewelry', 'wulf-kit' ), __( 'Every era, from *Victorian* to Retro.', 'wulf-kit' ), '<p>' . __( 'We have extensive knowledge and years of experience buying estate jewelry from all periods, including Victorian, Edwardian, Art Deco, Art Nouveau and Retro.', 'wulf-kit' ) . '</p><p>' . __( 'We pay premiums for estate platinum jewelry, filigree rings, pins, bracelets, large pearls, enameled gold jewelry, brooches, lavalieres, and antique and fancy dinner rings. We love old mine and European cut diamond jewelry.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'ring-cushion-dark.webp' ), 'b1_text' => __( 'Sell your estate jewelry', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ), 'b1_topic' => 'Selling' ) ),
					self::lists( __( 'We accept fine jewelry', 'wulf-kit' ), __( 'And we\'re particularly *interested* in:', 'wulf-kit' ), array(
						self::group( __( 'Designer jewelry', 'wulf-kit' ), '', __( 'Signed and high-end brand pieces.', 'wulf-kit' ), 'star' ),
						self::group( __( 'Diamond jewelry', 'wulf-kit' ), '', __( 'Rings, earrings, necklaces, bracelets and loose stones.', 'wulf-kit' ), 'gem', array( 'link_text' => __( 'Selling a diamond', 'wulf-kit' ), 'link' => self::link( 'diamond-buyers' ) ) ),
						self::group( __( 'Silver jewelry', 'wulf-kit' ), '', __( 'Sterling jewelry and silver pieces.', 'wulf-kit' ), 'spark', array( 'link_text' => __( 'Selling sterling silver', 'wulf-kit' ), 'link' => self::link( 'sterling-silver' ) ) ),
					), array( 'tone' => 'ivory', 'rule' => '' ) ),
					self::split( __( 'Sell broken jewelry', 'wulf-kit' ), __( 'Hidden treasures in the *jewelry box*.', 'wulf-kit' ), '<p>' . __( 'Almost every home has some. We buy broken or unwanted gold, silver and platinum chains, rings, bracelets and odd earrings. We buy it all, so don\'t let it lie around: make it pay.', 'wulf-kit' ) . '</p>', array( 'image' => self::img( 'rings-tray.webp' ), 'side' => 'left', 'b1_text' => __( 'Sell your broken jewelry', 'wulf-kit' ), 'b1_link' => array( 'url' => '#visit' ), 'b1_topic' => 'Selling' ) ),
					self::reviews( array( 'tone' => 'white' ) ),
					self::sell_cta(),
				);
		}
		return array();
	}

	/* ---------- shared pieces ---------- */

	private static function engagement_faq() {
		return array(
			__( 'Why choose Wulf for your engagement ring?', 'wulf-kit' ) => '<p>' . __( 'We\'re built on the memorable moments that make up our customers\' lives. With one of the largest selections of high-quality jewelry in Crown Point and Northwest Indiana, we have something for every occasion. Not sure where to begin? Schedule a free consultation and we\'ll help you find the perfect piece, and if we can\'t find it, we\'ll design it together.', 'wulf-kit' ) . '</p>',
			__( 'What if I don\'t find a ring I like?', 'wulf-kit' ) => '<p>' . __( 'We\'ll design one you do like! Share photos or drawings of your favorite jewelry and we\'ll design the piece of your dreams. We\'re also always adding new designs.', 'wulf-kit' ) . '</p>',
			__( 'Do you offer financing?', 'wulf-kit' ) => '<p>' . __( 'Yes, 12 months same-as-cash financing, on approved credit, so you can choose the ring you really want.', 'wulf-kit' ) . '</p>',
			__( 'Can I sell my jewelry to you?', 'wulf-kit' ) => '<p>' . __( 'Yes. We buy diamonds, coins, fine jewelry, and gold and silver pieces, at a fair and competitive price, and the process is easy and hassle-free.', 'wulf-kit' ) . '</p>',
		);
	}

	private static function custom_steps() {
		return array( 'steps', array(
			'eyebrow' => __( 'The custom process', 'wulf-kit' ),
			'title'   => __( 'From an idea to a ring, in *four steps*.', 'wulf-kit' ),
			'marker'  => 'number',
			'items'   => array(
				array( 'icon' => 'bulb', 'title' => __( 'Come in with inspiration', 'wulf-kit' ), 'text' => __( 'A piece from our showroom, a photo, or a feeling you\'d like to evoke. Use your own diamonds and gemstones, or we can provide everything.', 'wulf-kit' ) ),
				array( 'icon' => 'pencil', 'title' => __( 'We design it in 3D', 'wulf-kit' ), 'text' => __( 'Our CAD designers bring your ideas to life with ArtCam or Counter Sketch. Changes are easy until it\'s exactly right.', 'wulf-kit' ) ),
				array( 'icon' => 'gem', 'title' => __( 'A wax mold is made', 'wulf-kit' ), 'text' => __( 'A wax or resin model of your piece shows every feature, detail and the overall size.', 'wulf-kit' ) ),
				array( 'icon' => 'spark', 'title' => __( 'We cast and complete it', 'wulf-kit' ), 'text' => __( 'Cast in the metal of your choice, with every diamond and gemstone set and polished to perfection.', 'wulf-kit' ) ),
			),
			'b1_text' => __( 'Start a custom design', 'wulf-kit' ),
			'b1_link' => array( 'url' => '#visit' ),
			'b1_topic' => 'Custom design',
		) );
	}

	private static function sell_cta( $o = array() ) {
		return self::cta( __( 'Ready to get paid? We also buy jewelry.', 'wulf-kit' ), __( 'Turn what you don\'t wear into *cash*.', 'wulf-kit' ), __( 'Unlike pawn shops and big chains, Wulf will always offer fair pricing to help you get the most for what you have.', 'wulf-kit' ), array_merge( array( 'b1_text' => __( 'I\'m ready to sell', 'wulf-kit' ), 'b1_topic' => 'Selling' ), $o ) );
	}

	private static function category_circles() {
		$c = array(
			array( 'ring', __( 'Engagement rings', 'wulf-kit' ), 'engagement-rings' ),
			array( 'bands', __( 'Wedding bands', 'wulf-kit' ), 'wedding-bands' ),
			array( 'gem', __( 'Fashion rings', 'wulf-kit' ), 'rings' ),
			array( 'ear', __( 'Earrings', 'wulf-kit' ), 'earrings' ),
			array( 'spark', __( 'Necklaces', 'wulf-kit' ), 'necklaces' ),
			array( 'heart', __( 'Pendants', 'wulf-kit' ), 'pendants' ),
			array( 'gift', __( 'Bracelets', 'wulf-kit' ), 'bracelets' ),
			array( 'search', __( 'Gem vault', 'wulf-kit' ), 'gems' ),
		);
		return array_map( static function ( $x ) {
			return array( 'icon' => $x[0], 'label' => $x[1], 'link' => self::link( $x[2] ) );
		}, $c );
	}
}
