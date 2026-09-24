<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once OM_CATALOG_DIR . 'includes/functions-pricing.php';

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
	 * attributes (from its data-om-atts) and the clicked link's URL; the
	 * visitor state is parsed out of that URL, exactly as a full page load
	 * would read it from the query string.
	 */
	public function handle_filter_grid() {
		check_ajax_referer( 'om_catalog_nonce', 'nonce' );

		$atts = json_decode( isset( $_POST['atts'] ) ? wp_unslash( $_POST['atts'] ) : '', true );
		if ( ! is_array( $atts ) ) {
			$atts = array();
		}
		$atts = array_map( 'sanitize_text_field', array_filter( $atts, 'is_scalar' ) );

		$url = isset( $_POST['url'] ) ? esc_url_raw( wp_unslash( $_POST['url'] ) ) : '';
		if ( '' === $url ) {
			wp_send_json_error( array( 'message' => 'Missing target URL.' ) );
		}

		$query = array();
		parse_str( (string) wp_parse_url( $url, PHP_URL_QUERY ), $query );

		$request = array(
			'page'     => isset( $query['om_page'] ) ? max( 1, absint( $query['om_page'] ) ) : 1,
			'style'    => isset( $query['om_style'] ) ? sanitize_text_field( $query['om_style'] ) : '',
			'line'     => isset( $query['om_line'] ) ? sanitize_title( $query['om_line'] ) : '',
			'base_url' => remove_query_arg( array( 'om_style', 'om_page', 'om_line' ), $url ),
		);

		wp_send_json_success(
			array(
				'html' => OM_Shortcodes::instance()->render_grid( $atts, $request ),
			)
		);
	}

	public function handle_get_quote() {
		check_ajax_referer( 'om_catalog_nonce', 'nonce' );

		// No markup configured: never expose wholesale pricing. Don't even
		// call the quotation endpoint.
		if ( ! om_markup_is_configured() ) {
			wp_send_json_success(
				array(
					'price_formatted' => om_price_placeholder(),
					'price_raw'       => null,
				)
			);
		}

		$line          = isset( $_POST['line'] ) ? sanitize_title( wp_unslash( $_POST['line'] ) ) : '';
		$style_number  = isset( $_POST['styleNumber'] ) ? sanitize_text_field( wp_unslash( $_POST['styleNumber'] ) ) : '';
		$metal         = isset( $_POST['metal'] ) ? sanitize_text_field( wp_unslash( $_POST['metal'] ) ) : '';
		$color         = isset( $_POST['color'] ) ? sanitize_text_field( wp_unslash( $_POST['color'] ) ) : '';
		$level         = isset( $_POST['level'] ) ? sanitize_text_field( wp_unslash( $_POST['level'] ) ) : '';
		$quality       = isset( $_POST['quality'] ) ? sanitize_text_field( wp_unslash( $_POST['quality'] ) ) : '';

		if ( empty( $line ) || empty( $style_number ) ) {
			wp_send_json_error( array( 'message' => 'Missing product reference.' ) );
		}

		$quote = OM_API_Client::get_quotation(
			$line,
			array_filter(
				array(
					'styleNumber' => $style_number,
					'metal'       => $metal,
					'color'       => $color,
					'level'       => $level,
					'quality'     => $quality,
				)
			)
		);

		if ( is_wp_error( $quote ) || ! isset( $quote['price'] ) ) {
			$message = is_wp_error( $quote ) ? $quote->get_error_message() : 'No price returned.';
			wp_send_json_error( array( 'message' => $message ) );
		}

		$retail = om_apply_markup( floatval( $quote['price'] ) );

		wp_send_json_success(
			array(
				'price_formatted' => om_format_price( $retail ),
				'price_raw'       => $retail,
			)
		);
	}
}
