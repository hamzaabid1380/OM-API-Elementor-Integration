<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once OM_CATALOG_DIR . 'includes/functions-pricing.php';

/**
 * Public, read-only endpoints for the catalog: re-rendering a grid for a
 * clicked filter/page link, and re-quoting a product configuration.
 *
 * Neither checks a nonce. Both only read public catalog data, and a nonce
 * baked into a page that a cache serves for more than 12-24 hours would
 * expire and break filtering/pricing for every visitor. Abuse is limited
 * instead by what the endpoints accept: the grid endpoint only renders
 * attribute sets signed by this site, visitor filter values are checked
 * against the offered options, and quotes are cached per configuration.
 */
class OM_Ajax {

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_ajax_om_get_quote', array( $this, 'handle_get_quote' ) );
		add_action( 'wp_ajax_nopriv_om_get_quote', array( $this, 'handle_get_quote' ) );
		add_action( 'wp_ajax_om_filter_grid', array( $this, 'handle_filter_grid' ) );
		add_action( 'wp_ajax_nopriv_om_filter_grid', array( $this, 'handle_filter_grid' ) );
	}

	/**
	 * Re-render a catalog block for a clicked filter/pagination link, so the
	 * grid updates without a page reload. The client sends the block's own
	 * attributes and their signature (from data-om-atts / data-om-sig) plus
	 * the clicked link's URL; the visitor state is parsed out of that URL,
	 * exactly as a full page load would read it from the query string.
	 */
	public function handle_filter_grid() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint, see class doc.
		$json = isset( $_POST['atts'] ) ? (string) wp_unslash( $_POST['atts'] ) : '';
		$sig  = isset( $_POST['sig'] ) ? (string) wp_unslash( $_POST['sig'] ) : '';
		$url  = isset( $_POST['url'] ) ? esc_url_raw( wp_unslash( $_POST['url'] ) ) : '';
		// phpcs:enable

		if ( '' === $json || ! hash_equals( OM_Shortcodes::sign_atts( $json ), $sig ) ) {
			wp_send_json_error( array( 'message' => 'Invalid catalog block.' ), 400 );
		}
		$atts = json_decode( $json, true );
		if ( ! is_array( $atts ) || '' === $url ) {
			wp_send_json_error( array( 'message' => 'Invalid request.' ), 400 );
		}

		$query = array();
		parse_str( (string) wp_parse_url( $url, PHP_URL_QUERY ), $query );

		$request = OM_Shortcodes::request_from_query(
			$query,
			remove_query_arg( array( 'om_style', 'om_page', 'om_line', 'om_shape', 'om_metal' ), $url )
		);

		wp_send_json_success(
			array(
				'html' => OM_Shortcodes::instance()->render_grid( $atts, $request ),
			)
		);
	}

	public function handle_get_quote() {
		// No markup configured: never expose wholesale pricing. Don't even
		// call the quotation endpoint.
		if ( ! om_markup_is_configured() ) {
			wp_send_json_error( array( 'message' => 'Pricing is not enabled.' ) );
		}

		// phpcs:disable WordPress.Security.NonceVerification.Missing -- public read-only endpoint, see class doc.
		$field = function ( $key ) {
			return isset( $_POST[ $key ] ) && is_scalar( $_POST[ $key ] ) ? sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) : '';
		};
		$line         = sanitize_title( $field( 'line' ) );
		$style_number = $field( 'styleNumber' );
		// phpcs:enable

		if ( '' === $line || '' === $style_number ) {
			wp_send_json_error( array( 'message' => 'Missing product reference.' ) );
		}

		$quote = OM_API_Client::get_quotation(
			$line,
			array_filter(
				array(
					'styleNumber' => $style_number,
					'metal'       => $field( 'metal' ),
					'color'       => $field( 'color' ),
					'level'       => $field( 'level' ),
					'quality'     => $field( 'quality' ),
				)
			)
		);

		if ( is_wp_error( $quote ) || ! isset( $quote['price'] ) ) {
			wp_send_json_error( array( 'message' => is_wp_error( $quote ) ? $quote->get_error_message() : 'No price returned.' ) );
		}

		$retail = om_apply_markup( floatval( $quote['price'] ) );

		wp_send_json_success(
			array(
				'price_formatted' => om_format_price( $retail ),
				'price_raw'       => $retail,
				// The configuration OM actually priced (e.g. Platinum forces
				// White), so the dropdowns can be synced to match.
				'config'          => array(
					'metal'   => (string) ( $quote['metal'] ?? '' ),
					'color'   => (string) ( $quote['color'] ?? '' ),
					'level'   => (string) ( $quote['level'] ?? '' ),
					'quality' => (string) ( $quote['quality'] ?? '' ),
				),
			)
		);
	}
}
