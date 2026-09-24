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
		register_setting( 'om_catalog_settings', 'om_show_related', array( 'sanitize_callback' => array( $this, 'sanitize_flag' ) ) );
		register_setting( 'om_catalog_settings', 'om_show_recent', array( 'sanitize_callback' => array( $this, 'sanitize_flag' ) ) );
		register_setting( 'om_catalog_settings', 'om_options_style', array( 'sanitize_callback' => array( $this, 'sanitize_options_style' ) ) );
		register_setting( 'om_catalog_settings', 'om_details_style', array( 'sanitize_callback' => array( $this, 'sanitize_details_style' ) ) );
		register_setting( 'om_catalog_settings', 'om_video_mode', array( 'sanitize_callback' => array( $this, 'sanitize_video_mode' ) ) );
		register_setting( 'om_catalog_settings', 'om_media_follow', array( 'sanitize_callback' => array( $this, 'sanitize_flag' ) ) );
		register_setting( 'om_catalog_settings', 'om_size_lines', array( 'sanitize_callback' => array( $this, 'sanitize_lines' ) ) );
		register_setting( 'om_catalog_settings', 'om_size_guide_note', array( 'sanitize_callback' => 'sanitize_textarea_field' ) );
		register_setting( 'om_catalog_settings', 'om_warm_cache', array( 'sanitize_callback' => array( $this, 'sanitize_flag' ) ) );

		// Loose diamonds: own markup (falls back to the jewelry markup).
		register_setting( 'om_catalog_settings', 'om_diamond_markup_type', array( 'sanitize_callback' => 'sanitize_key' ) );
		register_setting( 'om_catalog_settings', 'om_diamond_markup_value', array( 'sanitize_callback' => array( $this, 'sanitize_float' ) ) );

		// Ring builder.
		register_setting( 'om_catalog_settings', 'om_builder_page', array( 'sanitize_callback' => 'absint' ) );
		register_setting( 'om_catalog_settings', 'om_builder_lines', array( 'sanitize_callback' => array( $this, 'sanitize_lines' ) ) );

		// Inquiries.
		register_setting( 'om_catalog_settings', 'om_inquiry_email', array( 'sanitize_callback' => 'sanitize_email' ) );
		register_setting( 'om_catalog_settings', 'om_inquiry_success', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_inquiry_fields', array( 'sanitize_callback' => array( 'OM_Inquiry', 'normalize_fields' ) ) );
		register_setting( 'om_catalog_settings', 'om_inquiry_autoreply', array( 'sanitize_callback' => array( $this, 'sanitize_flag' ) ) );
		register_setting( 'om_catalog_settings', 'om_inquiry_autoreply_text', array( 'sanitize_callback' => 'sanitize_textarea_field' ) );

		// Brand colors / fonts.
		register_setting( 'om_catalog_settings', 'om_style_source', array( 'sanitize_callback' => array( $this, 'sanitize_style_source' ) ) );
		register_setting( 'om_catalog_settings', 'om_color_primary', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_color_accent', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_color_background', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_color_text', array( 'sanitize_callback' => 'sanitize_hex_color' ) );
		register_setting( 'om_catalog_settings', 'om_font_heading', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_font_body', array( 'sanitize_callback' => 'sanitize_text_field' ) );

		// Look & feel (1.11): one set of corners, spacing, hover and phone
		// type sizes for every widget.
		foreach ( array( 'om_radius', 'om_radius_lg', 'om_m_title', 'om_m_card_title', 'om_m_body' ) as $opt ) {
			register_setting( 'om_catalog_settings', $opt, array( 'sanitize_callback' => array( $this, 'sanitize_px' ) ) );
		}
		register_setting( 'om_catalog_settings', 'om_spacing', array( 'sanitize_callback' => array( $this, 'sanitize_spacing' ) ) );
		register_setting( 'om_catalog_settings', 'om_card_hover', array( 'sanitize_callback' => array( $this, 'sanitize_card_hover' ) ) );
		register_setting( 'om_catalog_settings', 'om_trust_line', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_popular_searches', array( 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( 'om_catalog_settings', 'om_track_searches', array( 'sanitize_callback' => array( $this, 'sanitize_flag' ) ) );
		register_setting( 'om_catalog_settings', 'om_search_results_page', array( 'sanitize_callback' => 'absint' ) );
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

	public function sanitize_options_style( $value ) {
		return in_array( $value, array( 'swatches', 'pills', 'dropdowns' ), true ) ? $value : 'swatches';
	}

	/** A pixel size 0–60, or '' for the default. */
	public function sanitize_px( $value ) {
		return '' === trim( (string) $value ) ? '' : (string) max( 0, min( 60, (int) $value ) );
	}

	public function sanitize_spacing( $value ) {
		return in_array( $value, array( 'compact', 'comfortable', 'airy' ), true ) ? $value : 'comfortable';
	}

	public function sanitize_card_hover( $value ) {
		return in_array( $value, array( 'lift', 'zoom', 'none' ), true ) ? $value : 'lift';
	}

	public function sanitize_video_mode( $value ) {
		return 'thumb' === $value ? 'thumb' : 'first';
	}

	public function sanitize_details_style( $value ) {
		return 'open' === $value ? 'open' : 'accordion';
	}

	public function sanitize_flag( $value ) {
		return $value ? '1' : '0';
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

				<h2>Inquiry form fields</h2>
				<p class="description">The built-in inquiry form used on product pages, the diamond search and the ring builder. Add, remove and reorder fields; the first email field is used to reply to the customer. An OM Single Product widget can also use its own field list.</p>
				<?php $this->render_field_editor(); ?>
				<table class="form-table">
					<tr>
						<th>Confirmation email</th>
						<td>
							<input type="hidden" name="om_inquiry_autoreply" value="0" />
							<label><input type="checkbox" name="om_inquiry_autoreply" value="1" <?php checked( get_option( 'om_inquiry_autoreply', '0' ), '1' ); ?> /> Send the customer a confirmation email with the piece they asked about</label>
							<textarea name="om_inquiry_autoreply_text" rows="3" class="large-text" placeholder="Thank you for your inquiry. We have received your message and will be in touch shortly."><?php echo esc_textarea( get_option( 'om_inquiry_autoreply_text', '' ) ); ?></textarea>
						</td>
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
						<th>Background refresh</th>
						<td>
							<input type="hidden" name="om_warm_cache" value="0" />
							<label><input type="checkbox" name="om_warm_cache" value="1" <?php checked( get_option( 'om_warm_cache', '1' ), '1' ); ?> /> Keep catalog pages, search and filters refreshed in the background, so visitors never wait on Overnight Mountings' API</label>
							<p class="description"><?php echo esc_html( OM_Warmer::status_text() ); ?></p>
						</td>
					</tr>
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

				<h2>Product page</h2>
				<p class="description">Defaults for the built-in product page and the quick view. An OM Single Product widget has its own settings.</p>
				<table class="form-table">
					<tr>
						<th><label for="om_options_style">Options display</label></th>
						<td><select id="om_options_style" name="om_options_style">
							<?php $ostyle = get_option( 'om_options_style', 'swatches' ); ?>
							<option value="swatches" <?php selected( $ostyle, 'swatches' ); ?>>Swatches (colour circles) + pills</option>
							<option value="pills" <?php selected( $ostyle, 'pills' ); ?>>Pills</option>
							<option value="dropdowns" <?php selected( $ostyle, 'dropdowns' ); ?>>Dropdowns</option>
						</select></td>
					</tr>
					<tr>
						<th><label for="om_video_mode">Product videos</label></th>
						<td><select id="om_video_mode" name="om_video_mode">
							<?php $vmode = get_option( 'om_video_mode', 'first' ); ?>
							<option value="first" <?php selected( $vmode, 'first' ); ?>>Video first: plays silently on a loop as the main view</option>
							<option value="thumb" <?php selected( $vmode, 'thumb' ); ?>>Photos first, with a "Watch video" button</option>
						</select></td>
					</tr>
					<tr>
						<th>Photos follow metal colour</th>
						<td><input type="hidden" name="om_media_follow" value="0" /><label><input type="checkbox" name="om_media_follow" value="1" <?php checked( get_option( 'om_media_follow', '1' ), '1' ); ?> /> When a visitor picks a metal colour, show that colour's photos and videos</label>
						<p class="description">Works when Overnight Mountings' photos are told apart by colour (a colour on the image, or file names like …-YG-1.jpg). Settings &gt; OM Catalog &gt; Tools &gt; Test connection shows whether they are. Otherwise the gallery simply stays as it is.</p></td>
					</tr>
					<tr>
						<th><label for="om_details_style">Description &amp; details</label></th>
						<td><select id="om_details_style" name="om_details_style">
							<?php $dstyle = get_option( 'om_details_style', 'accordion' ); ?>
							<option value="accordion" <?php selected( $dstyle, 'accordion' ); ?>>Collapsible sections</option>
							<option value="open" <?php selected( $dstyle, 'open' ); ?>>Always open</option>
						</select></td>
					</tr>
					<tr>
						<th><label for="om_size_lines">Ring size picker on</label></th>
						<td><input type="text" id="om_size_lines" name="om_size_lines" value="<?php echo esc_attr( get_option( 'om_size_lines', 'engagement-rings,wedding-bands,fashion-rings' ) ); ?>" class="regular-text" />
						<p class="description">Comma-separated product lines that get a ring size picker (with size guide); the chosen size is priced and sent with inquiries.</p></td>
					</tr>
					<tr>
						<th><label for="om_size_guide_note">Size guide note</label></th>
						<td><textarea id="om_size_guide_note" name="om_size_guide_note" rows="2" class="large-text" placeholder="Not sure? We offer free resizing within 60 days, or visit us for a free professional sizing."><?php echo esc_textarea( get_option( 'om_size_guide_note', '' ) ); ?></textarea></td>
					</tr>
				</table>

				<h2>Built-in product page rows</h2>
				<p class="description">Rows shown below the product on the built-in product page. With an Elementor product layout, add the <strong>OM Related Products</strong> widget where you want them instead.</p>
				<table class="form-table">
					<tr>
						<th>Show</th>
						<td>
							<input type="hidden" name="om_show_related" value="0" />
							<label><input type="checkbox" name="om_show_related" value="1" <?php checked( get_option( 'om_show_related', '1' ), '1' ); ?> /> "You might also like"</label><br />
							<input type="hidden" name="om_show_recent" value="0" />
							<label><input type="checkbox" name="om_show_recent" value="1" <?php checked( get_option( 'om_show_recent', '1' ), '1' ); ?> /> "Recently viewed"</label>
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

				<h2>Look &amp; feel</h2>
				<p class="description">One set of corners, spacing and hover behaviour for every OM widget and page, so they stay consistent. A widget's own Style settings still override these.</p>
				<table class="form-table">
					<tr>
						<th><label for="om_radius">Corner radius: buttons, pills, fields</label></th>
						<td><input type="number" min="0" max="60" id="om_radius" name="om_radius" value="<?php echo esc_attr( get_option( 'om_radius', '' ) ); ?>" class="small-text" /> px <span class="description">0 = square (default). 4–8 = soft. 30+ = fully rounded pills.</span></td>
					</tr>
					<tr>
						<th><label for="om_radius_lg">Corner radius: photos, cards, pop-ups</label></th>
						<td><input type="number" min="0" max="60" id="om_radius_lg" name="om_radius_lg" value="<?php echo esc_attr( get_option( 'om_radius_lg', '' ) ); ?>" class="small-text" /> px</td>
					</tr>
					<tr>
						<th><label for="om_spacing">Spacing</label></th>
						<td><select id="om_spacing" name="om_spacing">
							<?php $spacing = get_option( 'om_spacing', 'comfortable' ); ?>
							<option value="compact" <?php selected( $spacing, 'compact' ); ?>>Compact</option>
							<option value="comfortable" <?php selected( $spacing, 'comfortable' ); ?>>Comfortable (default)</option>
							<option value="airy" <?php selected( $spacing, 'airy' ); ?>>Airy</option>
						</select> <span class="description">Space between groups on the product page, filters and sections.</span></td>
					</tr>
					<tr>
						<th><label for="om_card_hover">Card hover</label></th>
						<td><select id="om_card_hover" name="om_card_hover">
							<?php $hover = get_option( 'om_card_hover', 'lift' ); ?>
							<option value="lift" <?php selected( $hover, 'lift' ); ?>>Lift: card rises with a soft shadow, name underlined (default)</option>
							<option value="zoom" <?php selected( $hover, 'zoom' ); ?>>Zoom: photo zooms slowly</option>
							<option value="none" <?php selected( $hover, 'none' ); ?>>None</option>
						</select></td>
					</tr>
					<tr>
						<th><label for="om_trust_line">Trust line under the price</label></th>
						<td><input type="text" id="om_trust_line" name="om_trust_line" value="<?php echo esc_attr( get_option( 'om_trust_line', '' ) ); ?>" class="large-text" placeholder="Free resizing | Certified diamonds | Made to order" />
						<p class="description">Short promises, separated by <code>|</code>. Shown under the price on product pages and in quick view. Leave empty to hide. Only list what you really offer.</p></td>
					</tr>
					<tr>
						<th>Text sizes on phones</th>
						<td>
							<label>Product name <input type="number" min="0" max="60" name="om_m_title" value="<?php echo esc_attr( get_option( 'om_m_title', '' ) ); ?>" class="small-text" placeholder="26" /> px</label> &nbsp;
							<label>Card names <input type="number" min="0" max="60" name="om_m_card_title" value="<?php echo esc_attr( get_option( 'om_m_card_title', '' ) ); ?>" class="small-text" placeholder="15" /> px</label> &nbsp;
							<label>Body text <input type="number" min="0" max="60" name="om_m_body" value="<?php echo esc_attr( get_option( 'om_m_body', '' ) ); ?>" class="small-text" placeholder="14" /> px</label>
							<p class="description">Screens up to 600px wide. Leave empty for the defaults shown. Long names are balanced over two lines instead of leaving one word alone.</p>
						</td>
					</tr>
				</table>

				<h2>Search</h2>
				<table class="form-table">
					<tr>
						<th><label for="om_search_results_page">Search results page</label></th>
						<td><?php
						wp_dropdown_pages(
							array(
								'name'              => 'om_search_results_page',
								'id'                => 'om_search_results_page',
								'selected'          => (int) get_option( 'om_search_results_page', 0 ),
								'show_option_none'  => '— None —',
								'option_none_value' => '0',
							)
						);
						?>
						<p class="description">For the stand-alone search box (<code>[om_search]</code> / OM Search widget, e.g. in your header): "See all" and Enter open this page. Use a page with an OM Product Catalog widget that includes the lines you search.</p></td>
					</tr>
					<tr>
						<th><label for="om_popular_searches">Popular searches</label></th>
						<td><input type="text" id="om_popular_searches" name="om_popular_searches" value="<?php echo esc_attr( get_option( 'om_popular_searches', '' ) ); ?>" class="large-text" placeholder="Oval halo, Solitaire, Men's bands, Yellow gold" />
						<p class="description">Comma-separated. Shown when a visitor clicks into an empty search box (with their own recent searches), and as suggestions when filters find nothing.</p></td>
					</tr>
					<tr>
						<th>Learn from visitors</th>
						<td><input type="hidden" name="om_track_searches" value="0" /><label><input type="checkbox" name="om_track_searches" value="1" <?php checked( get_option( 'om_track_searches', '1' ), '1' ); ?> /> Fill "Popular searches" with what visitors search most (when the list above is empty or short)</label>
						<?php $top = get_option( 'om_search_counts', array() ); ?>
						<?php if ( is_array( $top ) && $top ) : arsort( $top ); ?>
							<p class="description">Most searched: <?php echo esc_html( implode( ', ', array_map( function ( $q, $n ) { return $q . ' (' . $n . ')'; }, array_keys( array_slice( $top, 0, 10, true ) ), array_slice( $top, 0, 10, true ) ) ) ); ?></p>
						<?php endif; ?></td>
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
		$rows[] = array( true, 'Logged in to Overnight Mountings (access token received). Plugin version ' . OM_CATALOG_VERSION . '.' );

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

		// Videos: the API guide lists a videos field on every product. Report
		// what the data actually holds, never skip silently.
		$sample = OM_API_Client::get_products( $line, array( 'limit' => 100 ) );
		if ( is_wp_error( $sample ) ) {
			$rows[] = array( false, 'Videos: could not check (' . $sample->get_error_message() . ').' );
		} elseif ( empty( $sample['products'] ) ) {
			$rows[] = array( false, 'Videos: could not check (the sample listing came back empty).' );
		} else {
			$items   = (array) $sample['products'];
			$with    = 0;
			$has_key = 0;
			$first   = '';
			foreach ( $items as $item ) {
				foreach ( om_video_keys() as $key ) {
					if ( array_key_exists( $key, (array) $item ) ) {
						$has_key++;
						break;
					}
				}
				$videos = om_product_videos( $item );
				if ( $videos ) {
					$with++;
					$first = $first ? $first : $videos[0];
				}
			}
			if ( $with ) {
				$rows[] = array( true, sprintf( 'Videos: %d of the first %d products have a video (played in the gallery and as card previews). Example: %s', $with, count( $items ), $first ) );
			} elseif ( $has_key ) {
				$raw    = null;
				foreach ( $items as $item ) {
					foreach ( om_video_keys() as $key ) {
						if ( ! empty( $item[ $key ] ) ) {
							$raw = $item[ $key ];
							break 2;
						}
					}
				}
				$rows[] = null === $raw
					? array( false, sprintf( 'Videos: the video field is present but empty on all of the first %d products — Overnight Mountings has no videos for these designs yet.', count( $items ) ) )
					: array( false, 'Videos: the field has data in a format the plugin does not recognise yet: ' . mb_substr( wp_json_encode( $raw ), 0, 300 ) );
			} else {
				$rows[] = array( false, sprintf( 'Videos: the products have no video field at all (checked the first %d).', count( $items ) ) );
			}
		}

		// Photos per metal colour: can the gallery switch with the colour?
		if ( ! is_wp_error( $sample ) && ! empty( $sample['products'] ) ) {
			require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';
			$by_color = 0;
			$example  = '';
			foreach ( (array) $sample['products'] as $item ) {
				$media = om_product_media( $item );
				if ( $media['by_color'] ) {
					$by_color++;
					if ( '' === $example ) {
						$counts = array_count_values( array_filter( wp_list_pluck( $media['images'], 'color' ) ) );
						$parts  = array();
						foreach ( $counts as $color => $n ) {
							$parts[] = $color . ' ' . $n;
						}
						$example = sprintf( '%s: %s', $item['style_number'] ?? '?', implode( ', ', $parts ) );
					}
				}
			}
			$first_images = array_slice( (array) ( $product['images'] ?? array() ), 0, 3 );
			$names        = array();
			foreach ( $first_images as $img ) {
				$names[] = is_array( $img ) ? wp_json_encode( $img ) : basename( (string) wp_parse_url( (string) $img, PHP_URL_PATH ) );
			}
			$rows[] = $by_color
				? array( true, sprintf( 'Photos by metal colour: %d of the first %d products have photos told apart by colour, so the gallery switches with the colour picked (e.g. %s).', $by_color, count( $sample['products'] ), $example ) )
				: array( false, sprintf( 'Photos by metal colour: not detected on the first %d products — the gallery keeps the same photos whatever colour is picked. Image names look like: %s', count( $sample['products'] ), implode( ' | ', $names ) ) );
			if ( ! empty( $product['product_variants'][0] ) && is_array( $product['product_variants'][0] ) ) {
				$rows[] = array( true, 'Variant fields from OM: ' . implode( ', ', array_keys( $product['product_variants'][0] ) ) );
			}
		}

		// The fields each product actually carries, to diagnose data questions.
		$rows[] = array( true, 'Product fields from OM: ' . implode( ', ', array_keys( (array) $product ) ) );

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

	/**
	 * Inquiry form field editor: a table of rows the admin can add, remove
	 * and reorder. Saved as the om_inquiry_fields option (the form's field
	 * list, in row order).
	 */
	private function render_field_editor() {
		$fields = OM_Inquiry::global_fields();
		$types  = array(
			'text'       => 'Text',
			'email'      => 'Email',
			'tel'        => 'Phone',
			'textarea'   => 'Paragraph',
			'select'     => 'Dropdown',
			'radio'      => 'Radio buttons',
			'checkboxes' => 'Checkboxes (several)',
			'checkbox'   => 'Single checkbox',
			'date'       => 'Date',
			'number'     => 'Number',
		);
		$row = function ( $i, $field ) use ( $types ) {
			$n = 'om_inquiry_fields[' . $i . ']';
			ob_start();
			?>
			<tr class="om-fe-row">
				<td class="om-fe-move"><button type="button" class="button-link om-fe-up" aria-label="Move up">&#9650;</button><button type="button" class="button-link om-fe-down" aria-label="Move down">&#9660;</button></td>
				<td><input type="text" name="<?php echo esc_attr( $n ); ?>[label]" value="<?php echo esc_attr( $field['label'] ?? '' ); ?>" placeholder="Label" class="regular-text" style="width:100%" />
					<input type="hidden" name="<?php echo esc_attr( $n ); ?>[key]" value="<?php echo esc_attr( $field['key'] ?? '' ); ?>" /></td>
				<td><select name="<?php echo esc_attr( $n ); ?>[type]" class="om-fe-type">
					<?php foreach ( $types as $value => $label ) : ?>
						<option value="<?php echo esc_attr( $value ); ?>" <?php selected( $field['type'] ?? 'text', $value ); ?>><?php echo esc_html( $label ); ?></option>
					<?php endforeach; ?>
				</select></td>
				<td><input type="text" name="<?php echo esc_attr( $n ); ?>[placeholder]" value="<?php echo esc_attr( $field['placeholder'] ?? '' ); ?>" placeholder="Placeholder" style="width:100%" /></td>
				<td><textarea name="<?php echo esc_attr( $n ); ?>[options]" rows="2" placeholder="Choices, one per line" style="width:100%"><?php echo esc_textarea( implode( "\n", (array) ( $field['options'] ?? array() ) ) ); ?></textarea></td>
				<td><select name="<?php echo esc_attr( $n ); ?>[width]">
					<option value="full" <?php selected( $field['width'] ?? 'full', 'full' ); ?>>Full</option>
					<option value="half" <?php selected( $field['width'] ?? 'full', 'half' ); ?>>Half</option>
				</select></td>
				<td style="text-align:center"><input type="checkbox" name="<?php echo esc_attr( $n ); ?>[required]" value="1" <?php checked( ! empty( $field['required'] ) ); ?> /></td>
				<td><button type="button" class="button-link-delete om-fe-remove">Remove</button></td>
			</tr>
			<?php
			return ob_get_clean();
		};
		?>
		<table class="widefat striped om-field-editor" style="max-width:1100px">
			<thead><tr><th style="width:44px"></th><th>Label</th><th>Type</th><th>Placeholder</th><th>Choices <span class="description">(dropdown, radio, checkboxes)</span></th><th>Width</th><th>Required</th><th></th></tr></thead>
			<tbody>
				<?php
				foreach ( $fields as $i => $field ) {
					echo $row( $i, $field ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the row template.
				}
				?>
			</tbody>
		</table>
		<p>
			<button type="button" class="button om-fe-add">+ Add field</button>
			<button type="button" class="button-link om-fe-reset" style="margin-left:12px">Restore default fields</button>
		</p>
		<script type="text/template" id="om-fe-template"><?php echo $row( '__i__', array( 'label' => '', 'type' => 'text', 'width' => 'full' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the row template. ?></script>
		<script>
		( function () {
			var table = document.querySelector( '.om-field-editor tbody' );
			var tpl = document.getElementById( 'om-fe-template' ).innerHTML;
			var n = Date.now();
			document.querySelector( '.om-fe-add' ).addEventListener( 'click', function () {
				table.insertAdjacentHTML( 'beforeend', tpl.split( '__i__' ).join( 'n' + ( n++ ) ) );
				table.lastElementChild.querySelector( 'input[type=text]' ).focus();
			} );
			document.querySelector( '.om-fe-reset' ).addEventListener( 'click', function () {
				if ( window.confirm( 'Replace the fields with the default form (Name, Email, Phone, Preferred contact, Message)? Save to apply.' ) ) {
					table.innerHTML = '';
					var input = document.createElement( 'input' );
					input.type = 'hidden'; input.name = 'om_inquiry_fields'; input.value = '';
					table.closest( 'form' ).appendChild( input );
				}
			} );
			table.addEventListener( 'click', function ( e ) {
				var row = e.target.closest( '.om-fe-row' );
				if ( ! row ) { return; }
				if ( e.target.classList.contains( 'om-fe-remove' ) ) { row.remove(); }
				if ( e.target.classList.contains( 'om-fe-up' ) && row.previousElementSibling ) { row.parentNode.insertBefore( row, row.previousElementSibling ); }
				if ( e.target.classList.contains( 'om-fe-down' ) && row.nextElementSibling ) { row.parentNode.insertBefore( row.nextElementSibling, row ); }
			} );
		} )();
		</script>
		<?php
	}
}
