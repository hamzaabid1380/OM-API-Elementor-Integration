<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers /catalog/{product-line}/{style-number}/ as a clean URL
 * for a single product, without needing a WordPress post per product.
 *
 * Also owns the request-level concerns of those pages: the correct HTTP
 * status (200 for a real product, 404 otherwise — WordPress would send 404
 * for every one of these URLs by default since no post matches), the
 * document title, and basic meta/OpenGraph tags.
 */
class OM_Rewrites {

	private static $instance = null;

	/** @var array|WP_Error|null Product for the current request, fetched once. */
	private $current_product = null;

	private $product_loaded = false;

	private $current_line = '';

	private $current_style = '';

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'register_rules' ) );
		add_filter( 'query_vars', array( $this, 'register_query_vars' ) );
		add_action( 'parse_query', array( $this, 'mark_product_query' ) );
		add_filter( 'posts_pre_query', array( $this, 'skip_posts_query' ), 10, 2 );
		add_filter( 'pre_handle_404', array( $this, 'handle_status' ), 10, 2 );
		// Late, so an SEO plugin's generic title doesn't replace the product's.
		add_filter( 'pre_get_document_title', array( $this, 'product_document_title' ), 99 );
		add_filter( 'wp_robots', array( $this, 'product_robots' ) );
		add_action( 'wp_head', array( $this, 'product_meta_tags' ), 5 );
		add_action( 'template_redirect', array( $this, 'protect_layout_page' ) );
		add_filter( 'template_include', array( $this, 'maybe_load_product_template' ) );
	}

	/**
	 * A request that only carries our query vars would otherwise be flagged
	 * as the blog home page (is_home), so themes, Elementor Pro's theme
	 * builder and SEO plugins would treat every product URL as the blog —
	 * blog titles, homepage canonical/OG tags, archive templates.
	 */
	public function mark_product_query( $query ) {
		if ( $query->is_main_query() && '' !== (string) $query->get( 'om_style_number' ) ) {
			$query->is_home       = false;
			$query->is_front_page = false;
		}
	}

	/** Product URLs don't list posts; skip the pointless latest-posts query. */
	public function skip_posts_query( $posts, $query ) {
		if ( $query->is_main_query() && '' !== (string) $query->get( 'om_style_number' ) ) {
			$query->found_posts   = 0;
			$query->max_num_pages = 0;
			return array();
		}
		return $posts;
	}

	/** Keep "not found" product URLs out of search results. */
	public function product_robots( $robots ) {
		if ( $this->is_product_request() ) {
			$this->ensure_product_loaded();
			if ( ! $this->current_product || is_wp_error( $this->current_product ) ) {
				$robots['noindex'] = true;
				$robots['follow']  = true;
			}
		}
		return $robots;
	}

	/**
	 * The page chosen as the product layout is a design template, not a
	 * page for visitors: editors can open it (and Elementor can preview
	 * it), everyone else is sent to the home page.
	 */
	public function protect_layout_page() {
		$layout_id = (int) get_option( 'om_product_layout_page', 0 );
		if ( ! $layout_id || ! is_page( $layout_id ) || current_user_can( 'edit_post', $layout_id ) ) {
			return;
		}
		wp_safe_redirect( home_url( '/' ), 302 );
		exit;
	}

	public function register_rules() {
		add_rewrite_rule(
			'^catalog/([^/]+)/([^/]+)/?$',
			'index.php?om_product_line=$matches[1]&om_style_number=$matches[2]',
			'top'
		);
	}

	public function register_query_vars( $vars ) {
		$vars[] = 'om_product_line';
		$vars[] = 'om_style_number';
		return $vars;
	}

	/**
	 * Is this request a /catalog/{line}/{style}/ product URL?
	 */
	public function is_product_request() {
		return '' !== (string) get_query_var( 'om_style_number' );
	}

	/**
	 * Fetch the product once per request, lazily — the earliest consumer is
	 * the pre_handle_404 filter, which runs before the 'wp' action. The
	 * result is also transient-cached in the API client, and the template
	 * and title/meta filters all reuse it.
	 */
	private function ensure_product_loaded() {
		if ( $this->product_loaded || ! $this->is_product_request() ) {
			return;
		}
		$this->product_loaded = true;

		$this->current_line  = sanitize_title( get_query_var( 'om_product_line' ) );
		$this->current_style = om_style_from_slug( sanitize_text_field( get_query_var( 'om_style_number' ) ) );

		$this->current_product = OM_API_Client::get_product_by_style( $this->current_line, $this->current_style );
	}

	public function get_current_product() {
		$this->ensure_product_loaded();
		return $this->current_product;
	}

	public function get_current_line() {
		return $this->current_line;
	}

	public function get_current_style() {
		return $this->current_style;
	}

	/**
	 * WordPress finds no post for these URLs and would send an HTTP 404 for
	 * every product page. Claim the request: 200 when the product exists,
	 * a real 404 status when it doesn't (the template still renders a
	 * friendly message either way).
	 */
	public function handle_status( $preempt, $wp_query ) {
		if ( ! $this->is_product_request() ) {
			return $preempt;
		}

		$this->ensure_product_loaded();

		if ( $this->current_product && ! is_wp_error( $this->current_product ) ) {
			status_header( 200 );
		} else {
			status_header( 404 );
		}

		return true; // Stop WP's own 404 handling either way; status is set above.
	}

	public function product_document_title( $title ) {
		if ( ! $this->is_product_request() ) {
			return $title;
		}

		$this->ensure_product_loaded();

		if ( $this->current_product && ! is_wp_error( $this->current_product ) && ! empty( $this->current_product['title'] ) ) {
			return $this->current_product['title'] . ' | ' . get_bloginfo( 'name' );
		}

		return __( 'Product not found', 'om-catalog' ) . ' | ' . get_bloginfo( 'name' );
	}

	public function product_meta_tags() {
		if ( ! $this->is_product_request() ) {
			return;
		}
		$this->ensure_product_loaded();
		if ( ! $this->current_product || is_wp_error( $this->current_product ) ) {
			return;
		}

		$product = $this->current_product;
		$title   = isset( $product['title'] ) ? $product['title'] : '';
		$desc    = ! empty( $product['description'] )
			? wp_strip_all_tags( $product['description'] )
			/* translators: 1: product title, 2: site name, 3: style number. */
			: sprintf( __( '%1$s from %2$s. Style %3$s.', 'om-catalog' ), $title, get_bloginfo( 'name' ), $this->current_style );
		$desc    = mb_substr( $desc, 0, 160 );
		$image   = ! empty( $product['images'][0] ) ? om_image_url( $product['images'][0] ) : '';
		$url     = om_product_url( $this->current_line, $this->current_style );

		echo '<link rel="canonical" href="' . esc_url( $url ) . '" />' . "\n";
		echo '<meta name="description" content="' . esc_attr( $desc ) . '" />' . "\n";
		echo '<meta property="og:type" content="product" />' . "\n";
		echo '<meta property="og:title" content="' . esc_attr( $title ) . '" />' . "\n";
		echo '<meta property="og:description" content="' . esc_attr( $desc ) . '" />' . "\n";
		echo '<meta property="og:url" content="' . esc_url( $url ) . '" />' . "\n";
		if ( $image ) {
			echo '<meta property="og:image" content="' . esc_url( $image ) . '" />' . "\n";
		}

		$this->product_schema( $product, $title, $desc, $url );
	}

	/**
	 * schema.org Product data, so search engines can show the piece's
	 * name, images and (when prices are live) its price in results.
	 */
	private function product_schema( $product, $title, $desc, $url ) {
		$images = array_values( array_filter( array_map( 'om_image_url', array_slice( (array) ( $product['images'] ?? array() ), 0, 6 ) ) ) );
		$schema = array(
			'@context'    => 'https://schema.org',
			'@type'       => 'Product',
			'name'        => $title,
			'sku'         => $this->current_style,
			'mpn'         => $this->current_style,
			'description' => $desc,
			'url'         => $url,
			'brand'       => array(
				'@type' => 'Brand',
				'name'  => get_bloginfo( 'name' ),
			),
			'category'    => ucwords( str_replace( '-', ' ', $this->current_line ) ),
		);
		if ( $images ) {
			$schema['image'] = $images;
		}

		if ( om_markup_is_configured() ) {
			$quote = OM_API_Client::get_quotation(
				$this->current_line,
				array_filter(
					array(
						'styleNumber' => $this->current_style,
						'metal'       => $product['default_metal'] ?? '',
						'color'       => $product['default_color'] ?? '',
						'level'       => $product['default_level'] ?? '',
						'quality'     => $product['default_quality'] ?? '',
					)
				)
			);
			if ( ! is_wp_error( $quote ) && isset( $quote['price'] ) ) {
				$schema['offers'] = array(
					'@type'         => 'Offer',
					'price'         => number_format( om_apply_markup( floatval( $quote['price'] ) ), 2, '.', '' ),
					'priceCurrency' => (string) ( $quote['currency'] ?? 'USD' ),
					// Made to order by Overnight Mountings.
					'availability'  => 'https://schema.org/PreOrder',
					'url'           => $url,
					'seller'        => array(
						'@type' => 'Organization',
						'name'  => get_bloginfo( 'name' ),
					),
				);
			}
		}

		echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG ) . '</script>' . "\n";
	}

	public function maybe_load_product_template( $template ) {
		if ( ! $this->is_product_request() ) {
			return $template;
		}

		// An Elementor-designed layout (Settings > OM Catalog) wins when it
		// exists, is published, and Elementor is running.
		$layout_id = (int) get_option( 'om_product_layout_page', 0 );
		if ( $layout_id && did_action( 'elementor/loaded' ) && 'publish' === get_post_status( $layout_id ) ) {
			return apply_filters( 'om_single_product_template', OM_CATALOG_DIR . 'templates/single-product-elementor.php' );
		}

		// Otherwise a copy at {theme}/om-catalog/single-product.php overrides
		// the plugin's template, so layout edits survive plugin updates.
		$theme_template = locate_template( 'om-catalog/single-product.php' );
		$our_template   = $theme_template ? $theme_template : OM_CATALOG_DIR . 'templates/single-product.php';

		return apply_filters( 'om_single_product_template', $our_template );
	}
}
