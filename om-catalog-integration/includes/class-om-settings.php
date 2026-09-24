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
		register_setting( 'om_catalog_settings', 'om_client_secret', array( 'sanitize_callback' => 'sanitize_text_field' ) );

		// Pricing markup.
		register_setting( 'om_catalog_settings', 'om_markup_type', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_markup_value', array( 'sanitize_callback' => array( $this, 'sanitize_float' ) ) );

		// Caching.
		register_setting( 'om_catalog_settings', 'om_listing_cache_minutes', array( 'sanitize_callback' => 'absint' ) );

		// Product page layout (0 = built-in template, else an Elementor page ID).
		register_setting( 'om_catalog_settings', 'om_product_layout_page', array( 'sanitize_callback' => 'absint' ) );

		// Brand colors / fonts.
		register_setting( 'om_catalog_settings', 'om_color_primary', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_color_accent', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_color_background', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_color_text', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_font_heading', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_font_body', array( 'sanitize_callback' => 'sanitize_text_field' ) );
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
						<td><input type="password" id="om_client_secret" name="om_client_secret" value="<?php echo esc_attr( get_option( 'om_client_secret' ) ); ?>" class="regular-text" autocomplete="off" />
						<p class="description">Provided by Overnight Mountings. Only admins can view this page.</p></td>
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

			<h2>Shortcuts</h2>
			<p>Catalog grid shortcode: <code>[om_catalog line="engagement-rings" columns="3" per_page="12"]</code></p>
			<p>Product lines: engagement-rings, wedding-bands, bracelets, earrings, fashion-rings, necklaces, pendants, in-stock.</p>
			<p>Single product pages are generated automatically at: <code><?php echo esc_html( home_url( '/catalog/{product-line}/{style-number}/' ) ); ?></code></p>
		</div>
		<?php
	}
}
