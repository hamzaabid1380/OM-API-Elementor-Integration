<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class OM_Settings {

	private static $instance = null;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'admin_menu', array( $this, 'add_settings_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'admin_notices', array( $this, 'maybe_show_markup_notice' ) );

		// New credentials take effect immediately: drop the cached token and
		// any remembered login failure.
		foreach ( array( 'om_client_id', 'om_client_secret' ) as $option ) {
			add_action( 'add_option_' . $option, array( 'OM_API_Client', 'clear_auth_cache' ) );
			add_action( 'update_option_' . $option, array( 'OM_API_Client', 'clear_auth_cache' ) );
		}
	}

	public function add_settings_page() {
		add_options_page(
			'OM Catalog Settings',
			'OM Catalog',
			'manage_options',
			'om-catalog-settings',
			array( $this, 'render_settings_page' )
		);
	}

	public function register_settings() {
		// Credentials.
		register_setting( 'om_catalog_settings', 'om_client_id', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_client_secret', array( 'sanitize_callback' => array( $this, 'sanitize_secret' ) ) );

		// Pricing markup.
		register_setting( 'om_catalog_settings', 'om_markup_type', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_markup_value', array( 'sanitize_callback' => array( $this, 'sanitize_float' ) ) );

		// What shows instead of a price (built-in template, and the widget's default).
		register_setting( 'om_catalog_settings', 'om_price_placeholder', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_price_link', array( 'sanitize_callback' => array( $this, 'sanitize_link' ) ) );

		// Caching.
		register_setting( 'om_catalog_settings', 'om_listing_cache_minutes', array( 'sanitize_callback' => 'absint' ) );

		// Product page layout (0 = built-in template, else an Elementor page ID).
		register_setting( 'om_catalog_settings', 'om_product_layout_page', array( 'sanitize_callback' => 'absint' ) );

		// Loose diamonds: own markup (falls back to the jewelry markup).
		register_setting( 'om_catalog_settings', 'om_diamond_markup_type', array( 'sanitize_callback' => 'sanitize_key' ) );
		register_setting( 'om_catalog_settings', 'om_diamond_markup_value', array( 'sanitize_callback' => array( $this, 'sanitize_float' ) ) );

		// Ring builder.
		register_setting( 'om_catalog_settings', 'om_builder_page', array( 'sanitize_callback' => 'absint' ) );
		register_setting( 'om_catalog_settings', 'om_builder_lines', array( 'sanitize_callback' => array( $this, 'sanitize_lines' ) ) );

		// Inquiries.
		register_setting( 'om_catalog_settings', 'om_inquiry_email', array( 'sanitize_callback' => 'sanitize_email' ) );
		register_setting( 'om_catalog_settings', 'om_inquiry_success', array( 'sanitize_callback' => 'sanitize_text_field' ) );

		// Brand colors / fonts.
		register_setting( 'om_catalog_settings', 'om_style_source', array( 'sanitize_callback' => array( $this, 'sanitize_style_source' ) ) );
		register_setting( 'om_catalog_settings', 'om_color_primary', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_color_accent', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_color_background', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_color_text', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_font_heading', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_font_body', array( 'sanitize_callback' => 'sanitize_text_field' ) );
	}

	/**
	 * The secret is stored exactly as entered (only surrounding whitespace
	 * trimmed): sanitize_text_field() would silently drop "%xx" sequences
	 * and anything between < and >, corrupting a valid secret. It is never
	 * printed back into the page, so an empty submission means "keep the
	 * saved one".
	 */
	public function sanitize_secret( $value ) {
		$value = trim( (string) $value );
		if ( '' === $value ) {
			return (string) get_option( 'om_client_secret', '' );
		}
		return $value;
	}

	/** Allow tel:, mailto: and normal URLs (esc_url_raw keeps those protocols). */
	public function sanitize_link( $value ) {
		return esc_url_raw( trim( (string) $value ) );
	}

	public function sanitize_lines( $value ) {
		return implode( ',', array_filter( array_map( 'sanitize_title', explode( ',', (string) $value ) ) ) );
	}

	public function sanitize_style_source( $value ) {
		return 'custom' === $value ? 'custom' : 'kit';
	}

	/** Published pages, for the page pickers. */
	private function page_options( $name, $selected, $only_elementor = false ) {
		$args = array(
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => 200,
			'orderby'        => 'title',
			'order'          => 'ASC',
		);
		if ( $only_elementor ) {
			$args['meta_key']   = '_elementor_edit_mode'; // phpcs:ignore WordPress.DB.SlowDBQuery
			$args['meta_value'] = 'builder'; // phpcs:ignore WordPress.DB.SlowDBQuery
		}
		foreach ( get_posts( $args ) as $page ) {
			printf( '<option value="%d" %s>%s</option>', (int) $page->ID, selected( (int) $selected, (int) $page->ID, false ), esc_html( $page->post_title ) );
		}
	}

	public function sanitize_float( $value ) {
		return is_numeric( $value ) ? floatval( $value ) : 0;
	}

	/** Warn admins in wp-admin if no markup has been configured yet (price would show as raw wholesale). */
	public function maybe_show_markup_notice() {
		$value = get_option( 'om_markup_value', null );
		if ( null === $value || '' === $value || 0 == $value ) {
			echo '<div class="notice notice-warning"><p><strong>OM Catalog:</strong> No pricing markup is configured yet. Prices from the API are wholesale — go to <a href="' . esc_url( admin_url( 'options-general.php?page=om-catalog-settings' ) ) . '">Settings &gt; OM Catalog</a> and set a markup before showing prices to customers.</p></div>';
		}
	}

	public function render_settings_page() {
		?>
		<div class="wrap">
			<h1>Overnight Mountings Catalog Settings</h1>
			<form method="post" action="options.php">
				<?php settings_fields( 'om_catalog_settings' ); ?>

				<h2>API Credentials</h2>
				<table class="form-table">
					<tr>
						<th><label for="om_client_id">Client ID (account number)</label></th>
						<td><input type="text" id="om_client_id" name="om_client_id" value="<?php echo esc_attr( get_option( 'om_client_id' ) ); ?>" class="regular-text" placeholder="e.g. R01203" /></td>
					</tr>
					<tr>
						<th><label for="om_client_secret">Client Secret</label></th>
						<td><input type="password" id="om_client_secret" name="om_client_secret" value="" class="regular-text" autocomplete="new-password" placeholder="<?php echo get_option( 'om_client_secret' ) ? esc_attr__( 'Saved — leave blank to keep it', 'om-catalog' ) : ''; ?>" />
						<p class="description">Provided by Overnight Mountings. For security the saved secret is never shown here; type a new one only to replace it.</p></td>
					</tr>
				</table>

				<h2>Pricing Markup</h2>
				<p class="description">The API returns <strong>wholesale</strong> prices. This markup is applied before any price is shown on the site.</p>
				<table class="form-table">
					<tr>
						<th><label for="om_markup_type">Markup Type</label></th>
						<td>
							<select id="om_markup_type" name="om_markup_type">
								<?php $type = get_option( 'om_markup_type', 'percentage' ); ?>
								<option value="percentage" <?php selected( $type, 'percentage' ); ?>>Percentage on top of wholesale</option>
								<option value="multiplier" <?php selected( $type, 'multiplier' ); ?>>Multiplier (e.g. 2.2x wholesale)</option>
							</select>
						</td>
					</tr>
					<tr>
						<th><label for="om_markup_value">Markup Value</label></th>
						<td>
							<input type="number" step="0.01" id="om_markup_value" name="om_markup_value" value="<?php echo esc_attr( get_option( 'om_markup_value', '' ) ); ?>" class="small-text" />
							<p class="description">Percentage example: <code>120</code> means retail = wholesale &times; 2.2. Multiplier example: <code>2.2</code> means the same thing directly.</p>
						</td>
					</tr>
				</table>

				<h2>Loose Diamonds</h2>
				<p class="description">Markup for loose diamonds (diamond search and ring builder). Leave the value empty to use the jewelry markup above.</p>
				<table class="form-table">
					<tr>
						<th><label for="om_diamond_markup_type">Markup type</label></th>
						<td>
							<?php $dtype = get_option( 'om_diamond_markup_type', 'multiplier' ); ?>
							<select id="om_diamond_markup_type" name="om_diamond_markup_type">
								<option value="percentage" <?php selected( $dtype, 'percentage' ); ?>>Percentage on top of wholesale</option>
								<option value="multiplier" <?php selected( $dtype, 'multiplier' ); ?>>Multiplier</option>
							</select>
						</td>
					</tr>
					<tr>
						<th><label for="om_diamond_markup_value">Markup value</label></th>
						<td><input type="number" step="0.01" id="om_diamond_markup_value" name="om_diamond_markup_value" value="<?php echo esc_attr( get_option( 'om_diamond_markup_value', '' ) ); ?>" class="small-text" /></td>
					</tr>
				</table>

				<h2>Ring Builder</h2>
				<table class="form-table">
					<tr>
						<th><label for="om_builder_page">Builder page</label></th>
						<td>
							<select id="om_builder_page" name="om_builder_page">
								<option value="0">&mdash; None (builder off) &mdash;</option>
								<?php $this->page_options( 'om_builder_page', get_option( 'om_builder_page', 0 ) ); ?>
							</select>
							<p class="description">A page containing the <strong>OM Ring Builder</strong> widget or <code>[om_ring_builder]</code>. Once set, product pages of the lines below show a "Select this setting" button and the diamond search a "Select this diamond" button.</p>
						</td>
					</tr>
					<tr>
						<th><label for="om_builder_lines">Setting product lines</label></th>
						<td><input type="text" id="om_builder_lines" name="om_builder_lines" value="<?php echo esc_attr( get_option( 'om_builder_lines', 'engagement-rings' ) ); ?>" class="regular-text" />
						<p class="description">Comma-separated line codes whose products can be chosen as the setting.</p></td>
					</tr>
				</table>

				<h2>Inquiries</h2>
				<table class="form-table">
					<tr>
						<th><label for="om_inquiry_email">Send inquiries to</label></th>
						<td><input type="email" id="om_inquiry_email" name="om_inquiry_email" value="<?php echo esc_attr( get_option( 'om_inquiry_email', '' ) ); ?>" class="regular-text" placeholder="<?php echo esc_attr( get_option( 'admin_email' ) ); ?>" />
						<p class="description">Every inquiry is also saved under <a href="<?php echo esc_url( admin_url( 'edit.php?post_type=om_inquiry' ) ); ?>">Inquiries</a>, so none are lost if email fails.</p></td>
					</tr>
					<tr>
						<th><label for="om_inquiry_success">Thank-you message</label></th>
						<td><input type="text" id="om_inquiry_success" name="om_inquiry_success" value="<?php echo esc_attr( get_option( 'om_inquiry_success', '' ) ); ?>" class="large-text" placeholder="Thank you! Your inquiry has been sent. We will be in touch soon." /></td>
					</tr>
				</table>

				<h2>When no price is shown</h2>
				<p class="description">Used by the built-in product page, and by the OM Single Product widget unless its own text/link is set. The widget can also show fully custom buttons instead.</p>
				<table class="form-table">
					<tr>
						<th><label for="om_price_placeholder">Text</label></th>
						<td><input type="text" id="om_price_placeholder" name="om_price_placeholder" value="<?php echo esc_attr( get_option( 'om_price_placeholder', '' ) ); ?>" class="regular-text" placeholder="Call for pricing" /></td>
					</tr>
					<tr>
						<th><label for="om_price_link">Link (optional)</label></th>
						<td><input type="text" id="om_price_link" name="om_price_link" value="<?php echo esc_attr( get_option( 'om_price_link', '' ) ); ?>" class="regular-text" placeholder="tel:+12195550100 or /contact/" /></td>
					</tr>
				</table>

				<h2>Caching</h2>
				<table class="form-table">
					<tr>
						<th><label for="om_listing_cache_minutes">Listing cache (minutes)</label></th>
						<td><input type="number" id="om_listing_cache_minutes" name="om_listing_cache_minutes" value="<?php echo esc_attr( get_option( 'om_listing_cache_minutes', 15 ) ); ?>" class="small-text" />
						<p class="description">How long to cache product listing pages before re-fetching from the API. Live price quotes are never cached.</p></td>
					</tr>
				</table>

				<h2>Product Page Layout</h2>
				<table class="form-table">
					<tr>
						<th><label for="om_product_layout_page">Layout</label></th>
						<td>
							<select id="om_product_layout_page" name="om_product_layout_page">
								<option value="0" <?php selected( (int) get_option( 'om_product_layout_page', 0 ), 0 ); ?>>Built-in template (default)</option>
								<?php
								$elementor_pages = get_posts(
									array(
										'post_type'      => 'page',
										'post_status'    => 'publish',
										'posts_per_page' => 100,
										'orderby'        => 'title',
										'order'          => 'ASC',
										'meta_key'       => '_elementor_edit_mode',
										'meta_value'     => 'builder',
									)
								);
								foreach ( $elementor_pages as $layout_page ) :
									?>
									<option value="<?php echo esc_attr( $layout_page->ID ); ?>" <?php selected( (int) get_option( 'om_product_layout_page', 0 ), $layout_page->ID ); ?>><?php echo esc_html( $layout_page->post_title ); ?></option>
								<?php endforeach; ?>
							</select>
							<p class="description">To design product pages visually: create a page in Elementor, drop in the <strong>OM Single Product</strong> widget (plus anything else you want around it), then pick that page here. Every <code>/catalog/...</code> product URL renders through it. The layout page itself is never linked publicly.</p>
						</td>
					</tr>
				</table>

				<h2>Brand Colors &amp; Fonts</h2>
				<table class="form-table">
					<tr>
						<th><label for="om_style_source">Style source</label></th>
						<td>
							<?php $source = get_option( 'om_style_source', 'kit' ); ?>
							<select id="om_style_source" name="om_style_source">
								<option value="kit" <?php selected( $source, 'kit' ); ?>>Follow the Elementor kit (Site Settings &gt; Global Colors &amp; Fonts)</option>
								<option value="custom" <?php selected( $source, 'custom' ); ?>>Use the values below</option>
							</select>
							<p class="description">With the kit, the catalog uses its Primary, Accent and Text colours and its Primary (headings) and Text (body) fonts, and changes whenever the site's kit does. Anything the kit doesn't set uses the values below.</p>
						</td>
					</tr>
				</table>
				<p class="description">Used to style the catalog grid and single product pages. Defaults match the live wulfdiamondjewelers.com Elementor kit (Arapey headings, Inter body, #00111C primary). Adjust here if the site's branding changes.</p>
				<table class="form-table">
					<tr>
						<th><label for="om_color_primary">Primary color</label></th>
						<td><input type="text" id="om_color_primary" name="om_color_primary" value="<?php echo esc_attr( get_option( 'om_color_primary', '#00111C' ) ); ?>" class="regular-text om-color-field" /></td>
					</tr>
					<tr>
						<th><label for="om_color_accent">Accent color (buttons, price)</label></th>
						<td><input type="text" id="om_color_accent" name="om_color_accent" value="<?php echo esc_attr( get_option( 'om_color_accent', '#000000' ) ); ?>" class="regular-text om-color-field" /></td>
					</tr>
					<tr>
						<th><label for="om_color_background">Background color</label></th>
						<td><input type="text" id="om_color_background" name="om_color_background" value="<?php echo esc_attr( get_option( 'om_color_background', '#ffffff' ) ); ?>" class="regular-text om-color-field" /></td>
					</tr>
					<tr>
						<th><label for="om_color_text">Body text color</label></th>
						<td><input type="text" id="om_color_text" name="om_color_text" value="<?php echo esc_attr( get_option( 'om_color_text', '#464646' ) ); ?>" class="regular-text om-color-field" /></td>
					</tr>
					<tr>
						<th><label for="om_font_heading">Heading font (CSS font-family)</label></th>
						<td><input type="text" id="om_font_heading" name="om_font_heading" value="<?php echo esc_attr( get_option( 'om_font_heading', 'Arapey, Georgia, serif' ) ); ?>" class="regular-text" /></td>
					</tr>
					<tr>
						<th><label for="om_font_body">Body font (CSS font-family)</label></th>
						<td><input type="text" id="om_font_body" name="om_font_body" value="<?php echo esc_attr( get_option( 'om_font_body', 'Inter, Helvetica, Arial, sans-serif' ) ); ?>" class="regular-text" /></td>
					</tr>
				</table>

				<?php submit_button( 'Save Settings' ); ?>
			</form>

			<?php $this->render_tools(); ?>

			<h2>Shortcuts</h2>
			<p>Catalog grid shortcode: <code>[om_catalog line="engagement-rings" columns="3" per_page="12"]</code> &mdash; add <code>show_filters="yes" filter_position="left"</code> for a filter sidebar.</p>
			<p>Product lines: <?php echo esc_html( implode( ', ', array_keys( OM_Shortcodes::line_labels( true ) ) ) ); ?>.</p>
			<p>Single product pages are generated automatically at: <code><?php echo esc_html( home_url( '/catalog/{product-line}/{style-number}/' ) ); ?></code></p>
		</div>
		<?php
	}

	/**
	 * "Test connection" and "Clear cache" tools. The test walks the same
	 * path a product page does (token, product lines, one product, one
	 * quote) and reports each step, so pricing problems can be diagnosed
	 * without reading logs. Wholesale figures are shown to admins only.
	 */
	private function render_tools() {
		$tool   = isset( $_GET['om_tool'] ) ? sanitize_key( wp_unslash( $_GET['om_tool'] ) ) : '';
		$line   = isset( $_GET['om_test_line'] ) ? sanitize_title( wp_unslash( $_GET['om_test_line'] ) ) : 'engagement-rings';
		$lines  = OM_Shortcodes::line_labels();
		$result = array();

		if ( $tool && check_admin_referer( 'om_catalog_tools' ) ) {
			if ( 'clear' === $tool ) {
				$count    = OM_API_Client::clear_all_caches();
				$result[] = array( true, sprintf( 'Cleared %d cached entries. The next page view fetches fresh data.', $count ) );
			} elseif ( 'test' === $tool ) {
				$result = $this->run_connection_test( $line );
				$lines  = OM_Shortcodes::line_labels();
			}
		}
		?>
		<h2>Tools</h2>
		<form method="get" action="<?php echo esc_url( admin_url( 'options-general.php' ) ); ?>" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
			<input type="hidden" name="page" value="om-catalog-settings" />
			<?php wp_nonce_field( 'om_catalog_tools', '_wpnonce', false ); ?>
			<label for="om_test_line">Product line</label>
			<select id="om_test_line" name="om_test_line">
				<?php foreach ( $lines as $code => $label ) : ?>
					<option value="<?php echo esc_attr( $code ); ?>" <?php selected( $code, $line ); ?>><?php echo esc_html( $label ); ?></option>
				<?php endforeach; ?>
			</select>
			<button class="button button-primary" name="om_tool" value="test">Test connection &amp; pricing</button>
			<button class="button" name="om_tool" value="clear">Clear cache</button>
		</form>
		<?php if ( $result ) : ?>
			<table class="widefat striped" style="max-width:900px;margin-top:12px">
				<tbody>
				<?php foreach ( $result as $row ) : ?>
					<tr>
						<td style="width:28px"><?php echo $row[0] ? '<span style="color:#008a20">&#10004;</span>' : '<span style="color:#d63638">&#10008;</span>'; ?></td>
						<td><?php echo esc_html( $row[1] ); ?></td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>
		<?php endif; ?>
		<?php
	}

	/** @return array[] Rows of [ ok (bool), message ]. */
	private function run_connection_test( $line ) {
		$rows = array();

		OM_API_Client::clear_auth_cache();
		$token = OM_API_Client::get_token();
		if ( is_wp_error( $token ) ) {
			$rows[] = array( false, 'Login to Overnight Mountings failed: ' . $token->get_error_message() );
			return $rows;
		}
		$rows[] = array( true, 'Logged in to Overnight Mountings (access token received).' );

		delete_transient( OM_API_Client::LINES_TRANSIENT );
		$lines = OM_API_Client::get_product_lines_map( true );
		$rows[] = $lines
			? array( true, 'Product lines from OM: ' . implode( ', ', array_keys( $lines ) ) )
			: array( false, 'Could not read the product-line list (GET /products/metadata).' );
		if ( $lines && ! isset( $lines[ $line ] ) ) {
			$rows[] = array( false, sprintf( '"%s" is not one of OM\'s product lines, so a widget set to it will show nothing.', $line ) );
		}

		$list = OM_API_Client::get_products( $line, array( 'limit' => 1 ) );
		if ( is_wp_error( $list ) || empty( $list['products'][0] ) ) {
			$rows[] = array( false, 'Listing "' . $line . '" failed: ' . ( is_wp_error( $list ) ? $list->get_error_message() : 'no products returned.' ) );
			return $rows;
		}
		$product = $list['products'][0];
		$rows[]  = array( true, sprintf( 'Listing "%s": %s products. First: %s (style %s).', $line, number_format_i18n( (int) ( $list['total_count'] ?? 0 ) ), $product['title'] ?? '?', $product['style_number'] ?? '?' ) );

		$quote = OM_API_Client::get_quotation(
			$line,
			array_filter(
				array(
					'styleNumber' => $product['style_number'] ?? '',
					'metal'       => $product['default_metal'] ?? '',
					'color'       => $product['default_color'] ?? '',
					'level'       => $product['default_level'] ?? '',
					'quality'     => $product['default_quality'] ?? '',
				)
			)
		);
		if ( is_wp_error( $quote ) || ! isset( $quote['price'] ) ) {
			$rows[] = array( false, 'Quote failed: ' . ( is_wp_error( $quote ) ? $quote->get_error_message() : 'no price in the response.' ) );
			return $rows;
		}
		$wholesale = floatval( $quote['price'] );
		$rows[]    = array( true, sprintf( 'Quote OK: wholesale %s (%s %s, %s).', om_format_price( $wholesale ), $quote['metal'] ?? '', $quote['color'] ?? '', $quote['level'] ?? '' ) );
		$rows[]    = om_markup_is_configured()
			? array( true, sprintf( 'Visitors see %s (markup applied). Prices are live on the site.', om_format_price( om_apply_markup( $wholesale ) ) ) )
			: array( false, 'No markup is set, so visitors see the "no price" text/buttons instead of prices. Set a markup above to show prices.' );

		return $rows;
	}
}
