<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Icons_Manager;
use Elementor\Repeater;

require_once OM_CATALOG_DIR . 'includes/functions-product-render.php';

/**
 * "OM Single Product" Elementor widget.
 *
 * Drop it into a normal Elementor page to design the product layout
 * visually. On a real /catalog/{line}/{style}/ URL it renders the current
 * product; in the editor (or anywhere without a product context) it renders
 * a preview product so there is something real to design against. Choose
 * the designed page under Settings > OM Catalog > Product page layout and
 * every product URL renders through it.
 *
 * The markup is identical to the built-in template, so the live price
 * re-quote on option changes and the gallery filmstrip keep working.
 */
class OM_Elementor_Product_Widget extends Widget_Base {

	public function get_name() {
		return 'om_product_widget';
	}

	public function get_title() {
		return __( 'OM Single Product', 'om-catalog' );
	}

	public function get_icon() {
		return 'eicon-single-product';
	}

	public function get_categories() {
		return array( 'general' );
	}

	public function get_keywords() {
		return array( 'product', 'ring', 'jewelry', 'overnight', 'mountings', 'detail' );
	}

	public function get_style_depends() {
		return array( 'om-catalog-css', 'om-catalog-fonts' );
	}

	public function get_script_depends() {
		return array( 'om-catalog-js' );
	}

	protected function register_controls() {

		$this->start_controls_section(
			'section_preview',
			array(
				'label' => __( 'Preview', 'om-catalog' ),
			)
		);

		$this->add_control(
			'preview_note',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => __( 'On a real product URL this widget shows that product. The preview below is only for designing this layout.', 'om-catalog' ),
				'content_classes' => 'elementor-descriptor',
			)
		);

		$this->add_control(
			'preview_line',
			array(
				'label'   => __( 'Preview product line', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'engagement-rings',
				'options' => OM_Shortcodes::line_labels( is_admin() ),
			)
		);

		$this->add_control(
			'preview_style',
			array(
				'label'       => __( 'Preview style number', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => '85121-2',
				'description' => __( 'Leave blank to preview the first product of the line.', 'om-catalog' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_sections',
			array(
				'label' => __( 'Sections', 'om-catalog' ),
			)
		);

		$toggles = array(
			'show_gallery'     => __( 'Gallery', 'om-catalog' ),
			'show_line_label'  => __( 'Product line label', 'om-catalog' ),
			'show_title'       => __( 'Title', 'om-catalog' ),
			'show_meta'        => __( 'Carat / style number line', 'om-catalog' ),
			'show_price'       => __( 'Price', 'om-catalog' ),
			'show_description' => __( 'Description', 'om-catalog' ),
			'show_options'     => __( 'Metal / color / level options', 'om-catalog' ),
			'show_stones'      => __( 'Stone details', 'om-catalog' ),
			'show_variants'    => __( 'Other sizes / carats', 'om-catalog' ),
		);
		foreach ( $toggles as $key => $label ) {
			$this->add_control(
				$key,
				array(
					'label'   => $label,
					'type'    => Controls_Manager::SWITCHER,
					'default' => 'yes',
				)
			);
		}

		$this->end_controls_section();

		$this->start_controls_section(
			'section_layout',
			array(
				'label' => __( 'Layout & Options', 'om-catalog' ),
			)
		);

		$this->add_control(
			'design',
			array(
				'label'       => __( 'Page design', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'refined',
				'options'     => array(
					'refined' => __( 'Refined: large gallery, quiet details, one button family', 'om-catalog' ),
					'modern'  => __( 'Modern: framed panels, cards, gentle motion', 'om-catalog' ),
					'classic' => __( 'Classic: open, lines only', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'options_style',
			array(
				'label'   => __( 'Options display', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'swatches',
				'options' => array(
					'swatches'  => __( 'Swatches (colour circles) + pills', 'om-catalog' ),
					'pills'     => __( 'Pills', 'om-catalog' ),
					'dropdowns' => __( 'Dropdowns', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'details_style',
			array(
				'label'   => __( 'Description & details', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'open',
				'options' => array(
					'open'      => __( 'Always open (specifications as a two-column list)', 'om-catalog' ),
					'accordion' => __( 'Collapsible sections', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'show_specs',
			array(
				'label'   => __( 'Specifications section', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'show_size',
			array(
				'label'       => __( 'Ring size picker', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'On the product lines set under Settings > OM Catalog > Product page.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'show_size_guide',
			array(
				'label'     => __( 'Size guide pop-up', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'condition' => array( 'show_size' => 'yes' ),
			)
		);

		$this->add_control(
			'sticky_gallery',
			array(
				'label'       => __( 'Keep gallery in view while scrolling', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Desktop and tablet.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'sticky_bar',
			array(
				'label'       => __( 'Sticky price bar on phones', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Price and the main button stay at the bottom of the screen once the visitor scrolls past them.', 'om-catalog' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_gallery',
			array(
				'label' => __( 'Gallery & Video', 'om-catalog' ),
			)
		);

		$this->add_control(
			'video_mode',
			array(
				'label'       => __( 'Product videos', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'first',
				'options'     => array(
					'first' => __( 'Video first (the main view)', 'om-catalog' ),
					'thumb' => __( 'Photos first + "Watch video" button', 'om-catalog' ),
				),
				'description' => __( 'For products that have a video.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'video_autoplay',
			array(
				'label'       => __( 'Autoplay (muted, looping)', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Off: the video waits for a click, with player controls.', 'om-catalog' ),
				'condition'   => array( 'video_mode' => 'first' ),
			)
		);

		$this->add_control(
			'video_sound',
			array(
				'label'   => __( 'Sound on/off button', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'video_fullscreen',
			array(
				'label'   => __( 'Full screen button', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'watch_button',
			array(
				'label'       => __( '"Watch video" button on photos', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
			)
		);

		$this->add_control(
			'watch_text',
			array(
				'label'       => __( '"Watch video" text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Watch video', 'om-catalog' ),
				'condition'   => array( 'watch_button' => 'yes' ),
			)
		);

		$this->add_control(
			'video_label',
			array(
				'label'       => __( 'Video thumbnail label', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Video', 'om-catalog' ),
			)
		);

		$this->add_control(
			'thumbs_position',
			array(
				'label'     => __( 'Thumbnails', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'left',
				'separator' => 'before',
				'options'   => array(
					'left'   => __( 'Left of the photo', 'om-catalog' ),
					'bottom' => __( 'Under the photo', 'om-catalog' ),
					'none'   => __( 'Hidden', 'om-catalog' ),
				),
				'description' => __( 'Phones always show them under the photo.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'image_zoom',
			array(
				'label'   => __( 'Zoom on hover', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'image_lightbox',
			array(
				'label'   => __( 'Click to open full screen', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'media_follow',
			array(
				'label'       => __( 'Photos follow the metal colour', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Picking a colour shows that colour\'s photos/video, when Overnight Mountings\' photos are told apart by colour (Settings > OM Catalog > Tools > Test connection says).', 'om-catalog' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_actions',
			array(
				'label' => __( 'Price & Buttons', 'om-catalog' ),
			)
		);

		$this->add_control(
			'price_display',
			array(
				'label'       => __( 'Price', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'auto',
				'options'     => array(
					'auto'  => __( 'Show the live price when available', 'om-catalog' ),
					'never' => __( 'Never show prices', 'om-catalog' ),
				),
				'description' => __( 'Live prices need a markup under Settings > OM Catalog. Until then (or if a quote fails) the option below shows instead.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'price_fallback',
			array(
				'label'   => __( 'When no price is shown', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'text',
				'options' => array(
					'text'    => __( 'Show text (e.g. "Call for pricing")', 'om-catalog' ),
					'buttons' => __( 'Show the buttons in its place', 'om-catalog' ),
					'none'    => __( 'Show nothing', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'price_placeholder_text',
			array(
				'label'       => __( 'Text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Call for pricing', 'om-catalog' ),
				'condition'   => array( 'price_fallback' => 'text' ),
			)
		);

		$this->add_control(
			'price_placeholder_link',
			array(
				'label'       => __( 'Text link (optional)', 'om-catalog' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => 'tel:+12195550100 or /contact/',
				'condition'   => array( 'price_fallback' => 'text' ),
			)
		);

		$this->add_control(
			'back_link',
			array(
				'label'       => __( '"← Back to results" link', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'separator'   => 'before',
				'description' => __( 'Above the product, when the visitor came from a listing: returns to the same spot, with the same filters.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'back_text',
			array(
				'label'       => __( 'Link text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Back to Engagement Rings (automatic)', 'om-catalog' ),
				'description' => __( 'Leave empty to name the listing they came from.', 'om-catalog' ),
				'condition'   => array( 'back_link' => 'yes' ),
			)
		);

		$this->add_control(
			'back_filters',
			array(
				'label'     => __( 'Show their filters beside it', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'selectors_dictionary' => array( '' => 'display: none;' ),
				'selectors' => array( '{{WRAPPER}} .om-back-filters' => '{{VALUE}}' ),
				'condition' => array( 'back_link' => 'yes' ),
			)
		);

		$this->add_control(
			'trust_source',
			array(
				'label'       => __( 'Trust line under the price', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'global',
				'separator'   => 'before',
				'options'     => array(
					'global' => __( 'From Settings > OM Catalog', 'om-catalog' ),
					'custom' => __( 'Custom for this page', 'om-catalog' ),
					'none'   => __( 'Hide', 'om-catalog' ),
				),
			)
		);

		$this->add_control(
			'trust_text',
			array(
				'label'       => __( 'Promises', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'label_block' => true,
				'placeholder' => 'Free resizing | Certified diamonds | Made to order',
				'description' => __( 'Separate with |', 'om-catalog' ),
				'condition'   => array( 'trust_source' => 'custom' ),
			)
		);

		$repeater = new Repeater();

		$repeater->start_controls_tabs( 'button_tabs' );
		$repeater->start_controls_tab( 'button_tab_content', array( 'label' => __( 'Content', 'om-catalog' ) ) );

		$repeater->add_control(
			'button_text',
			array(
				'label'   => __( 'Text', 'om-catalog' ),
				'type'    => Controls_Manager::TEXT,
				'default' => __( 'Call Us', 'om-catalog' ),
			)
		);

		$repeater->add_control(
			'button_link',
			array(
				'label'       => __( 'Link', 'om-catalog' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => 'tel:+12195550100 or /book-appointment/',
			)
		);

		$repeater->add_control(
			'button_style',
			array(
				'label'   => __( 'Style', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'solid',
				'options' => array(
					'solid'   => __( 'Solid', 'om-catalog' ),
					'outline' => __( 'Outline', 'om-catalog' ),
					'gold'    => __( 'Gold (your site\'s gold button)', 'om-catalog' ),
					'text'    => __( 'Text link', 'om-catalog' ),
				),
			)
		);

		$repeater->add_control(
			'button_show',
			array(
				'label'   => __( 'Show', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'always',
				'options' => array(
					'always'     => __( 'Always', 'om-catalog' ),
					'no_price'   => __( 'Only when no price is shown', 'om-catalog' ),
					'with_price' => __( 'Only when a price is shown', 'om-catalog' ),
				),
			)
		);

		$repeater->add_control(
			'button_icon',
			array(
				'label'       => __( 'Icon', 'om-catalog' ),
				'type'        => Controls_Manager::ICONS,
				'skin'        => 'inline',
				'label_block' => false,
			)
		);

		$repeater->add_control(
			'button_icon_position',
			array(
				'label'     => __( 'Icon position', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'before',
				'options'   => array(
					'before' => __( 'Before text', 'om-catalog' ),
					'after'  => __( 'After text', 'om-catalog' ),
				),
				'condition' => array( 'button_icon[value]!' => '' ),
			)
		);

		$repeater->end_controls_tab();
		$repeater->start_controls_tab( 'button_tab_colors', array( 'label' => __( 'Colors', 'om-catalog' ) ) );

		$repeater->add_control(
			'button_custom_note',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => __( 'Optional: overrides the shared button colors (Style tab) for this button only.', 'om-catalog' ),
				'content_classes' => 'elementor-descriptor',
			)
		);

		$item_colors = array(
			'item_bg'          => array( __( 'Background', 'om-catalog' ), 'background-color: {{VALUE}};', '' ),
			'item_color'       => array( __( 'Text', 'om-catalog' ), 'color: {{VALUE}};', '' ),
			'item_border'      => array( __( 'Border', 'om-catalog' ), 'border-color: {{VALUE}};', '' ),
			'item_hover_bg'    => array( __( 'Hover background', 'om-catalog' ), 'background-color: {{VALUE}};', ':hover' ),
			'item_hover_color' => array( __( 'Hover text', 'om-catalog' ), 'color: {{VALUE}};', ':hover' ),
			'item_hover_border' => array( __( 'Hover border', 'om-catalog' ), 'border-color: {{VALUE}};', ':hover' ),
		);
		foreach ( $item_colors as $key => $def ) {
			$repeater->add_control(
				$key,
				array(
					'label'     => $def[0],
					'type'      => Controls_Manager::COLOR,
					'selectors' => array(
						'{{WRAPPER}} .om-single-product .om-actions {{CURRENT_ITEM}}.om-btn' . $def[2] => $def[1],
					),
				)
			);
		}

		$repeater->end_controls_tab();
		$repeater->end_controls_tabs();

		$this->add_control(
			'action_buttons',
			array(
				'label'       => __( 'Buttons', 'om-catalog' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $repeater->get_controls(),
				'default'     => array(),
				'title_field' => '{{{ button_text }}}',
				'separator'   => 'before',
				'description' => __( 'E.g. Call Us, Book an Appointment, Ask About This Ring. Each can show always, only when there is no price, or only with a price.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'buttons_position',
			array(
				'label'   => __( 'Buttons position', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'price',
				'options' => array(
					'price'             => __( 'Under the price', 'om-catalog' ),
					'after_description' => __( 'After the description', 'om-catalog' ),
					'after_options'     => __( 'After the metal / color options', 'om-catalog' ),
				),
				'description' => __( 'When "Show the buttons in its place" applies, they sit where the price would be.', 'om-catalog' ),
			)
		);

		$this->add_control(
			'buttons_layout',
			array(
				'label'   => __( 'Arrangement', 'om-catalog' ),
				'type'    => Controls_Manager::CHOOSE,
				'default' => 'inline',
				'toggle'  => false,
				'options' => array(
					'inline'  => array( 'title' => __( 'Side by side', 'om-catalog' ), 'icon' => 'eicon-ellipsis-h' ),
					'stacked' => array( 'title' => __( 'Stacked', 'om-catalog' ), 'icon' => 'eicon-ellipsis-v' ),
				),
			)
		);

		$this->add_responsive_control(
			'buttons_align',
			array(
				'label'                => __( 'Alignment', 'om-catalog' ),
				'type'                 => Controls_Manager::CHOOSE,
				'options'              => array(
					'start'   => array( 'title' => __( 'Left', 'om-catalog' ), 'icon' => 'eicon-h-align-left' ),
					'center'  => array( 'title' => __( 'Center', 'om-catalog' ), 'icon' => 'eicon-h-align-center' ),
					'end'     => array( 'title' => __( 'Right', 'om-catalog' ), 'icon' => 'eicon-h-align-right' ),
					'stretch' => array( 'title' => __( 'Full width', 'om-catalog' ), 'icon' => 'eicon-h-align-stretch' ),
				),
				'selectors_dictionary' => array(
					'start'   => '--om-btn-justify: flex-start; --om-btn-grow: 0; --om-btn-align: flex-start;',
					'center'  => '--om-btn-justify: center; --om-btn-grow: 0; --om-btn-align: center;',
					'end'     => '--om-btn-justify: flex-end; --om-btn-grow: 0; --om-btn-align: flex-end;',
					'stretch' => '--om-btn-justify: stretch; --om-btn-grow: 1; --om-btn-align: stretch;',
				),
				'selectors'            => array(
					'{{WRAPPER}} .om-actions' => '{{VALUE}}',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_extras',
			array(
				'label' => __( 'Ring Builder & Inquiry', 'om-catalog' ),
			)
		);

		$this->add_control(
			'show_builder',
			array(
				'label'       => __( '"Select this setting" button', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'description' => __( 'Shows on the ring builder\'s product lines once a builder page is set (Settings > OM Catalog).', 'om-catalog' ),
			)
		);

		$this->add_control(
			'builder_text',
			array(
				'label'       => __( 'Button text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Select this setting', 'om-catalog' ),
				'condition'   => array( 'show_builder' => 'yes' ),
			)
		);

		$this->add_control(
			'show_inquiry',
			array(
				'label'     => __( 'Inquiry form', 'om-catalog' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'separator' => 'before',
			)
		);

		$this->add_control(
			'inquiry_heading',
			array(
				'label'       => __( 'Form title', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Inquire about this piece', 'om-catalog' ),
				'condition'   => array( 'show_inquiry' => 'yes' ),
			)
		);

		$this->add_control(
			'inquiry_open',
			array(
				'label'       => __( 'Start expanded', 'om-catalog' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'condition'   => array( 'show_inquiry' => 'yes' ),
			)
		);

		$this->add_control(
			'inquiry_source',
			array(
				'label'     => __( 'Form', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'builtin',
				'options'   => array(
					'builtin' => __( 'Built-in form (leads in wp-admin > Inquiries + email)', 'om-catalog' ),
					'custom'  => __( 'My own form (shortcode)', 'om-catalog' ),
				),
				'condition' => array( 'show_inquiry' => 'yes' ),
			)
		);

		$this->add_control(
			'inquiry_shortcode',
			array(
				'label'       => __( 'Form shortcode', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 2,
				'placeholder' => '[elementor-template id="123"]  or  [contact-form-7 id="45"]',
				'description' => __( 'Add hidden fields named om_product, om_style, om_price, om_options, om_url (and om_diamond) to your form; they are filled with the piece the customer is viewing. With an Elementor Pro form, use those as the hidden fields\' IDs — submissions then appear under Elementor > Submissions.', 'om-catalog' ),
				'condition'   => array( 'show_inquiry' => 'yes', 'inquiry_source' => 'custom' ),
			)
		);

		$this->add_control(
			'inquiry_intro',
			array(
				'label'       => __( 'Intro text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 2,
				'placeholder' => __( 'Questions about sizing, timing or pricing? Send us a note and we will get back to you shortly.', 'om-catalog' ),
				'description' => __( 'Type a single space to hide it.', 'om-catalog' ),
				'condition'   => array( 'show_inquiry' => 'yes' ),
			)
		);

		$this->add_control(
			'inquiry_button',
			array(
				'label'       => __( 'Button text', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'Send inquiry', 'om-catalog' ),
				'condition'   => array( 'show_inquiry' => 'yes', 'inquiry_source' => 'builtin' ),
			)
		);

		$this->add_control(
			'inquiry_subject_mode',
			array(
				'label'     => __( 'Subject choice', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => '',
				'separator' => 'before',
				'options'   => array(
					''     => __( 'As in Settings', 'om-catalog' ),
					'show' => __( 'Show on the form', 'om-catalog' ),
					'hide' => __( 'Hide (use the preselected one)', 'om-catalog' ),
				),
				'condition' => array( 'inquiry_source' => 'builtin' ),
			)
		);

		$this->add_control(
			'inquiry_subjects',
			array(
				'label'       => __( 'Subjects', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 4,
				'placeholder' => "Price request\nBook a viewing\nCustom design",
				'description' => __( 'One per line. Empty = the list in Settings.', 'om-catalog' ),
				'condition'   => array( 'inquiry_source' => 'builtin' ),
			)
		);

		$this->add_control(
			'inquiry_subject',
			array(
				'label'       => __( 'Preselected subject', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'description' => __( 'Must match one of the subjects. Buttons can also preselect: link to #om-inquiry?subject=Book a viewing', 'om-catalog' ),
				'condition'   => array( 'inquiry_source' => 'builtin' ),
			)
		);

		$this->add_control(
			'inquiry_subject_tpl',
			array(
				'label'       => __( 'Email subject line', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'label_block' => true,
				'placeholder' => '{subject}: {piece} — {name}',
				'description' => __( 'Tokens: {subject} {piece} {title} {style} {name} {email} {phone} {price} {site}. Empty = Settings.', 'om-catalog' ),
				'condition'   => array( 'inquiry_source' => 'builtin' ),
			)
		);

		$this->add_control(
			'inquiry_fields_source',
			array(
				'label'       => __( 'Form fields', 'om-catalog' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'global',
				'options'     => array(
					'global' => __( 'Site-wide form (Settings > OM Catalog)', 'om-catalog' ),
					'custom' => __( 'Custom fields for this widget', 'om-catalog' ),
				),
				'condition'   => array( 'show_inquiry' => 'yes', 'inquiry_source' => 'builtin' ),
			)
		);

		$fields = new Repeater();
		$fields->add_control(
			'label',
			array(
				'label'   => __( 'Label', 'om-catalog' ),
				'type'    => Controls_Manager::TEXT,
				'default' => __( 'Field', 'om-catalog' ),
			)
		);
		$fields->add_control(
			'type',
			array(
				'label'   => __( 'Type', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'text',
				'options' => array(
					'text'       => __( 'Text', 'om-catalog' ),
					'email'      => __( 'Email', 'om-catalog' ),
					'tel'        => __( 'Phone', 'om-catalog' ),
					'textarea'   => __( 'Paragraph', 'om-catalog' ),
					'select'     => __( 'Dropdown', 'om-catalog' ),
					'radio'      => __( 'Radio buttons', 'om-catalog' ),
					'checkboxes' => __( 'Checkboxes (several)', 'om-catalog' ),
					'checkbox'   => __( 'Single checkbox', 'om-catalog' ),
					'date'       => __( 'Date', 'om-catalog' ),
					'number'     => __( 'Number', 'om-catalog' ),
				),
			)
		);
		$fields->add_control(
			'options',
			array(
				'label'       => __( 'Choices (one per line)', 'om-catalog' ),
				'type'        => Controls_Manager::TEXTAREA,
				'rows'        => 3,
				'condition'   => array( 'type' => array( 'select', 'radio', 'checkboxes' ) ),
			)
		);
		$fields->add_control(
			'placeholder',
			array(
				'label'     => __( 'Placeholder', 'om-catalog' ),
				'type'      => Controls_Manager::TEXT,
				'condition' => array( 'type' => array( 'text', 'email', 'tel', 'textarea', 'select', 'number' ) ),
			)
		);
		$fields->add_control(
			'required',
			array(
				'label'   => __( 'Required', 'om-catalog' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => '',
			)
		);
		$fields->add_control(
			'width',
			array(
				'label'   => __( 'Width', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'full',
				'options' => array(
					'full' => __( 'Full', 'om-catalog' ),
					'half' => __( 'Half', 'om-catalog' ),
				),
			)
		);
		$fields->add_control(
			'key',
			array(
				'label'       => __( 'Field ID (optional)', 'om-catalog' ),
				'type'        => Controls_Manager::TEXT,
				'description' => __( 'Letters, numbers and _ only. Use "name" for the customer\'s name.', 'om-catalog' ),
			)
		);

		$defaults = array();
		foreach ( OM_Inquiry::default_fields() as $field ) {
			$defaults[] = array(
				'label'    => $field['label'],
				'type'     => $field['type'],
				'required' => $field['required'] ? 'yes' : '',
				'width'    => $field['width'],
				'key'      => $field['key'],
				'options'  => implode( "\n", $field['options'] ?? array() ),
			);
		}

		$this->add_control(
			'inquiry_fields',
			array(
				'label'       => __( 'Fields', 'om-catalog' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $fields->get_controls(),
				'default'     => $defaults,
				'title_field' => '{{{ label }}}{{{ required ? " *" : "" }}}',
				'condition'   => array( 'show_inquiry' => 'yes', 'inquiry_source' => 'builtin', 'inquiry_fields_source' => 'custom' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style ---------- */

		/* ---------- Style: back to results ---------- */

		$this->start_controls_section(
			'section_style_back',
			array(
				'label'     => __( 'Back to results', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'back_link' => 'yes' ),
			)
		);
		$this->add_control( 'back_color', array( 'label' => __( 'Colour', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-back' => '--om-back-c: {{VALUE}};' ) ) );
		$this->add_control( 'back_color_hover', array( 'label' => __( 'Hover colour', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .om-back' => '--om-back-c-hover: {{VALUE}};' ) ) );
		$this->add_group_control( Group_Control_Typography::get_type(), array( 'name' => 'back_typo', 'label' => __( 'Typography', 'om-catalog' ), 'selector' => '{{WRAPPER}} .om-back .om-back-link.om-back-link' ) );
		$this->add_responsive_control(
			'back_gap',
			array(
				'label'      => __( 'Space below', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-back' => 'margin-bottom: {{SIZE}}px;' ),
			)
		);
		$this->end_controls_section();

		/* ---------- Style: corners & spacing ---------- */
		$this->start_controls_section(
			'section_style_look',
			array(
				'label' => __( 'Corners & Spacing', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'btn_shape',
			array(
				'label'                => __( 'Button shape (Refined)', 'om-catalog' ),
				'type'                 => Controls_Manager::SELECT,
				'default'              => '',
				'options'              => array(
					''       => __( 'Site default', 'om-catalog' ),
					'pill'   => __( 'Pill', 'om-catalog' ),
					'soft'   => __( 'Soft', 'om-catalog' ),
					'square' => __( 'Square', 'om-catalog' ),
				),
				'selectors_dictionary' => array( 'pill' => '999px', 'soft' => '10px', 'square' => '0px' ),
				'selectors'            => array( '{{WRAPPER}}' => '--om-btn-radius: {{VALUE}};' ),
			)
		);

		$this->add_control( 'gold_light', array( 'label' => __( 'Gold (fills)', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}}' => '--om-gold-light: {{VALUE}};' ) ) );
		$this->add_control( 'gold_deep', array( 'label' => __( 'Gold (lines & rings)', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}}' => '--om-gold: {{VALUE}};' ) ) );
		$this->add_control( 'photo_tone', array( 'label' => __( 'Photo background', 'om-catalog' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}}' => '--om-photo-tone: {{VALUE}};' ) ) );
		$this->add_control(
			'photo_blend',
			array(
				'label'                => __( 'Blend photo backgrounds into it', 'om-catalog' ),
				'type'                 => Controls_Manager::SELECT,
				'default'              => '',
				'options'              => array( '' => __( 'Site default', 'om-catalog' ), 'on' => __( 'On', 'om-catalog' ), 'off' => __( 'Off', 'om-catalog' ) ),
				'selectors_dictionary' => array( 'on' => 'multiply', 'off' => 'normal' ),
				'selectors'            => array( '{{WRAPPER}}' => '--om-photo-blend: {{VALUE}};' ),
				'separator'            => 'after',
			)
		);

		$this->add_control(
			'look_radius',
			array(
				'label'       => __( 'Corner radius: buttons, pills, fields', 'om-catalog' ),
				'type'        => Controls_Manager::SLIDER,
				'size_units'  => array( 'px' ),
				'range'       => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'   => array( '{{WRAPPER}}' => '--om-radius: {{SIZE}}{{UNIT}};' ),
				'description' => __( 'Empty = site default (Modern design: 6px).', 'om-catalog' ),
			)
		);

		$this->add_control(
			'look_radius_lg',
			array(
				'label'       => __( 'Corner radius: photos & panels', 'om-catalog' ),
				'type'        => Controls_Manager::SLIDER,
				'size_units'  => array( 'px' ),
				'range'       => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'   => array( '{{WRAPPER}}' => '--om-radius-lg: {{SIZE}}{{UNIT}};' ),
				'description' => __( 'Empty = site default (Modern design: 14px).', 'om-catalog' ),
			)
		);

		$this->add_control(
			'look_space',
			array(
				'label'     => __( 'Spacing', 'om-catalog' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => '',
				'options'   => array(
					''    => __( 'Site default', 'om-catalog' ),
					'0.8' => __( 'Compact', 'om-catalog' ),
					'1'   => __( 'Comfortable', 'om-catalog' ),
					'1.3' => __( 'Airy', 'om-catalog' ),
				),
				'selectors' => array( '{{WRAPPER}}' => '--om-space: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'look_line',
			array(
				'label'     => __( 'Panel border colour', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-design-modern' => '--om-line: {{VALUE}};' ),
				'condition' => array( 'design' => array( 'modern', 'refined' ) ),
			)
		);

		$this->add_control(
			'look_soft',
			array(
				'label'     => __( 'Row hover tint', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-design-modern' => '--om-soft: {{VALUE}};' ),
				'condition' => array( 'design' => array( 'modern', 'refined' ) ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: gallery ---------- */
		$this->start_controls_section(
			'section_style_gallery',
			array(
				'label' => __( 'Gallery', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'gallery_bg',
			array(
				'label'     => __( 'Photo background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-product-gallery .om-zoom, {{WRAPPER}} .om-main-image, {{WRAPPER}} .om-main-video' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'gallery_radius',
			array(
				'label'      => __( 'Photo corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-product-gallery' => '--om-media-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_responsive_control(
			'thumb_size',
			array(
				'label'      => __( 'Thumbnail size', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 40, 'max' => 140 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-product-gallery'              => '--om-thumb-size: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .om-product-gallery .om-thumb-btn' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'thumb_gap',
			array(
				'label'      => __( 'Space between thumbnails', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-thumbs' => 'gap: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_responsive_control(
			'gallery_gap',
			array(
				'label'      => __( 'Space between photo and thumbnails', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 60 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-product-gallery' => 'gap: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'thumb_radius',
			array(
				'label'      => __( 'Thumbnail corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', '%' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 30 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-product-gallery' => '--om-thumb-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'thumb_border',
			array(
				'label'     => __( 'Thumbnail border', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-product-gallery .om-thumb-btn' => 'border-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'thumb_active_border',
			array(
				'label'     => __( 'Selected thumbnail border', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-product-gallery .om-thumb-btn.is-active' => 'border-color: {{VALUE}};' ),
			)
		);

		$this->end_controls_section();

		/* ---------- Style: video controls ---------- */
		$this->start_controls_section(
			'section_style_video',
			array(
				'label' => __( 'Video Buttons', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'watch_heading',
			array(
				'label' => __( '"Watch video" button', 'om-catalog' ),
				'type'  => Controls_Manager::HEADING,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'watch_typography',
				'selector' => '{{WRAPPER}} .om-watch-video',
			)
		);

		$this->add_control(
			'watch_bg',
			array(
				'label'     => __( 'Background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-product-gallery .om-watch-video' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'watch_color',
			array(
				'label'     => __( 'Text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-product-gallery .om-watch-video' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'watch_icon_bg',
			array(
				'label'     => __( 'Play circle', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-watch-icon' => 'background-color: {{VALUE}};', '{{WRAPPER}} .om-watch-icon::before' => 'border-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'watch_radius',
			array(
				'label'      => __( 'Corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-product-gallery .om-watch-video' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'round_heading',
			array(
				'label'     => __( 'Sound & full screen buttons', 'om-catalog' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'round_bg',
			array(
				'label'     => __( 'Background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-product-gallery .om-media-expand, {{WRAPPER}} .om-main-video .om-sound' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'round_color',
			array(
				'label'     => __( 'Icon', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-product-gallery .om-media-expand, {{WRAPPER}} .om-main-video .om-sound' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'round_size',
			array(
				'label'      => __( 'Size', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 28, 'max' => 64 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-product-gallery .om-media-expand, {{WRAPPER}} .om-main-video .om-sound' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'thumb_label_color',
			array(
				'label'     => __( 'Video thumbnail label', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => array( '{{WRAPPER}} .om-thumb-label' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'thumb_play_bg',
			array(
				'label'     => __( 'Video thumbnail play circle', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-play' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_title',
			array(
				'label' => __( 'Title', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => __( 'Color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-product-title' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'title_typography',
				'selector' => '{{WRAPPER}} .om-product-title',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_price',
			array(
				'label' => __( 'Price', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'price_color',
			array(
				'label'     => __( 'Color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-price' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'price_typography',
				'selector' => '{{WRAPPER}} .om-price',
			)
		);

		$this->add_control(
			'trust_heading',
			array(
				'label'     => __( 'Trust line', 'om-catalog' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'trust_color',
			array(
				'label'     => __( 'Text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-trust' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'trust_icon_color',
			array(
				'label'     => __( 'Tick', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-trust li::before' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'trust_typography',
				'selector' => '{{WRAPPER}} .om-trust',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_buttons',
			array(
				'label' => __( 'Buttons', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'buttons_typography',
				'selector' => '{{WRAPPER}} .om-single-product .om-btn',
			)
		);

		$this->add_responsive_control(
			'btn_padding',
			array(
				'label'      => __( 'Padding', 'om-catalog' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em' ),
				'selectors'  => array(
					'{{WRAPPER}} .om-single-product .om-btn' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_min_height',
			array(
				'label'      => __( 'Minimum height', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 24, 'max' => 90 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-single-product .om-btn' => 'min-height: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_min_width',
			array(
				'label'      => __( 'Minimum width', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', '%' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 400 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-single-product .om-btn' => 'min-width: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_radius',
			array(
				'label'      => __( 'Corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .om-single-product .om-btn' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_stroke_width',
			array(
				'label'      => __( 'Border width', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 6 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-single-product .om-btn--solid, {{WRAPPER}} .om-single-product .om-btn--outline' => 'border-width: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_gap',
			array(
				'label'     => __( 'Space between buttons', 'om-catalog' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors' => array(
					'{{WRAPPER}} .om-actions' => 'gap: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_group_margin',
			array(
				'label'      => __( 'Button group margin', 'om-catalog' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px' ),
				'selectors'  => array(
					'{{WRAPPER}} .om-actions' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_icon_size',
			array(
				'label'      => __( 'Icon size', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 8, 'max' => 40 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-btn-icon' => 'font-size: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .om-btn-icon svg' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'btn_icon_spacing',
			array(
				'label'      => __( 'Icon spacing', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 30 ) ),
				'selectors'  => array(
					'{{WRAPPER}} .om-single-product .om-btn' => 'gap: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->start_controls_tabs( 'btn_color_tabs', array( 'separator' => 'before' ) );

		foreach ( array( 'normal' => __( 'Normal', 'om-catalog' ), 'hover' => __( 'Hover', 'om-catalog' ) ) as $state => $state_label ) {
			$this->start_controls_tab( 'btn_tab_' . $state, array( 'label' => $state_label ) );
			$pseudo = 'hover' === $state ? ':hover' : '';
			$prefix = 'hover' === $state ? 'btn_hover_' : 'btn_';
			$defs   = array(
				// Keep the 1.1 control ids so saved designs carry over.
				( 'hover' === $state ? 'btn_hover_bg' : 'btn_solid_bg' )      => array( __( 'Solid: background', 'om-catalog' ), '.om-btn--solid', 'background-color: {{VALUE}}; border-color: {{VALUE}};' ),
				( 'hover' === $state ? 'btn_hover_color' : 'btn_solid_color' ) => array( __( 'Solid: text', 'om-catalog' ), '.om-btn--solid', 'color: {{VALUE}};' ),
				$prefix . 'outline_text'                                        => array( __( 'Outline: text', 'om-catalog' ), '.om-btn--outline', 'color: {{VALUE}};' ),
				$prefix . 'outline_border'                                      => array( __( 'Outline: border', 'om-catalog' ), '.om-btn--outline', 'border-color: {{VALUE}};' ),
				$prefix . 'outline_bg'                                          => array( __( 'Outline: background', 'om-catalog' ), '.om-btn--outline', 'background-color: {{VALUE}};' ),
				( 'hover' === $state ? 'btn_hover_link' : 'btn_outline_color' ) => array( __( 'Text link: color', 'om-catalog' ), '.om-btn--text', 'color: {{VALUE}};' ),
			);
			foreach ( $defs as $id => $def ) {
				$this->add_control(
					$id,
					array(
						'label'     => $def[0],
						'type'      => Controls_Manager::COLOR,
						'selectors' => array(
							'{{WRAPPER}} .om-single-product ' . $def[1] . $pseudo => $def[2],
						),
					)
				);
			}
			$this->end_controls_tab();
		}

		$this->end_controls_tabs();

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'      => 'btn_border',
				'label'     => __( 'Border (overrides style)', 'om-catalog' ),
				'selector'  => '{{WRAPPER}} .om-single-product .om-btn',
				'separator' => 'before',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_inquiry',
			array(
				'label' => __( 'Inquiry Form', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'inq_title_color',
			array(
				'label'     => __( 'Title color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-inquiry-toggle, {{WRAPPER}} .om-inquiry-heading' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'inq_title_typography',
				'label'    => __( 'Title typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-inquiry-toggle, {{WRAPPER}} .om-inquiry-heading',
			)
		);

		$this->add_control(
			'inq_text_color',
			array(
				'label'     => __( 'Intro & label color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-inquiry-intro, {{WRAPPER}} .om-field label' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'inq_label_typography',
				'label'    => __( 'Label typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-field label',
			)
		);

		$this->add_control(
			'inq_input_bg',
			array(
				'label'     => __( 'Field background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => array( '{{WRAPPER}} .om-inquiry .om-field input, {{WRAPPER}} .om-inquiry .om-field select, {{WRAPPER}} .om-inquiry .om-field textarea' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'inq_input_border',
			array(
				'label'     => __( 'Field border', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-inquiry .om-field input, {{WRAPPER}} .om-inquiry .om-field select, {{WRAPPER}} .om-inquiry .om-field textarea' => 'border-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'inq_input_text',
			array(
				'label'     => __( 'Field text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-inquiry .om-field input, {{WRAPPER}} .om-inquiry .om-field select, {{WRAPPER}} .om-inquiry .om-field textarea' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_responsive_control(
			'inq_input_radius',
			array(
				'label'      => __( 'Field corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 24 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-inquiry .om-field input, {{WRAPPER}} .om-inquiry .om-field select, {{WRAPPER}} .om-inquiry .om-field textarea' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'inq_btn_bg',
			array(
				'label'     => __( 'Button background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => array( '{{WRAPPER}} .om-inquiry .om-inquiry-submit' => 'background-color: {{VALUE}}; border-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'inq_btn_color',
			array(
				'label'     => __( 'Button text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-inquiry .om-inquiry-submit' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'inq_btn_hover_bg',
			array(
				'label'     => __( 'Button hover background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-inquiry .om-inquiry-submit:hover' => 'background-color: {{VALUE}}; border-color: {{VALUE}};' ),
			)
		);

		$this->add_responsive_control(
			'inq_btn_radius',
			array(
				'label'      => __( 'Button corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 40 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-inquiry .om-inquiry-submit' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_responsive_control(
			'inq_btn_width',
			array(
				'label'   => __( 'Button width', 'om-catalog' ),
				'type'    => Controls_Manager::SELECT,
				'default' => '',
				'options' => array(
					''     => __( 'Auto', 'om-catalog' ),
					'100%' => __( 'Full width', 'om-catalog' ),
				),
				'selectors' => array( '{{WRAPPER}} .om-inquiry .om-inquiry-submit' => 'width: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'inq_btn_typography',
				'label'    => __( 'Button typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-inquiry .om-inquiry-submit',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_options',
			array(
				'label' => __( 'Options (Swatches & Pills)', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'opt_label_color',
			array(
				'label'     => __( 'Label color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-opt-label' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'opt_label_typography',
				'label'    => __( 'Label typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-opt-label',
			)
		);

		$this->add_responsive_control(
			'swatch_size',
			array(
				'label'      => __( 'Swatch size', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 20, 'max' => 60 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-choice-swatch .om-swatch' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_control(
			'pill_text',
			array(
				'label'     => __( 'Pill text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => array( '{{WRAPPER}} .om-choice-pill span, {{WRAPPER}} .om-variant-link' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'pill_border',
			array(
				'label'     => __( 'Pill border', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-choice-pill span, {{WRAPPER}} .om-variant-link' => 'border-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'pill_active_bg',
			array(
				'label'     => __( 'Selected: background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-choice-pill input:checked + span, {{WRAPPER}} .om-variant-link.is-current' => 'background-color: {{VALUE}}; border-color: {{VALUE}};',
					'{{WRAPPER}} .om-choice-swatch input:checked + .om-swatch' => 'box-shadow: 0 0 0 2px #fff, 0 0 0 3px {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'pill_active_text',
			array(
				'label'     => __( 'Selected: text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-choice-pill input:checked + span, {{WRAPPER}} .om-variant-link.is-current' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'pill_typography',
				'label'    => __( 'Pill typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-choice-pill span, {{WRAPPER}} .om-variant-link',
			)
		);

		$this->add_responsive_control(
			'pill_radius',
			array(
				'label'      => __( 'Pill corner radius', 'om-catalog' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => 0, 'max' => 30 ) ),
				'selectors'  => array( '{{WRAPPER}} .om-choice-pill span, {{WRAPPER}} .om-variant-link' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_sections',
			array(
				'label' => __( 'Description & Detail Sections', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'acc_title_color',
			array(
				'label'     => __( 'Section title color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-acc-title' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'acc_title_typography',
				'label'    => __( 'Section title typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-acc-title',
			)
		);

		$this->add_control(
			'acc_divider',
			array(
				'label'     => __( 'Divider color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-acc, {{WRAPPER}} .om-details' => 'border-color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'acc_body_typography',
				'label'    => __( 'Section text typography', 'om-catalog' ),
				'selector' => '{{WRAPPER}} .om-acc-body',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_sticky',
			array(
				'label'     => __( 'Sticky Price Bar (phones)', 'om-catalog' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array( 'sticky_bar' => 'yes' ),
			)
		);

		$this->add_control(
			'sticky_bg',
			array(
				'label'     => __( 'Background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-sticky-bar' => 'background-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'sticky_text',
			array(
				'label'     => __( 'Text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-sticky-title, {{WRAPPER}} .om-sticky-price' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'sticky_btn_bg',
			array(
				'label'     => __( 'Button background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-sticky-cta' => 'background-color: {{VALUE}}; border-color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'sticky_btn_text',
			array(
				'label'     => __( 'Button text', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array( '{{WRAPPER}} .om-sticky-cta' => 'color: {{VALUE}};' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_fallback',
			array(
				'label' => __( 'No-price Text', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'fallback_color',
			array(
				'label'     => __( 'Color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-price-fallback, {{WRAPPER}} .om-price-fallback a' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'fallback_typography',
				'selector' => '{{WRAPPER}} .om-price-fallback',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_labels',
			array(
				'label' => __( 'Labels & Meta', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'label_color',
			array(
				'label'       => __( 'Labels color', 'om-catalog' ),
				'type'        => Controls_Manager::COLOR,
				'description' => __( 'Product line label, style number line, option labels.', 'om-catalog' ),
				'selectors'   => array(
					'{{WRAPPER}} .om-line-label, {{WRAPPER}} .om-style-meta, {{WRAPPER}} .om-options-form label' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'heading_color',
			array(
				'label'       => __( 'Section headings color', 'om-catalog' ),
				'type'        => Controls_Manager::COLOR,
				'description' => __( '"Stone Details" and "Other Sizes / Carats".', 'om-catalog' ),
				'selectors'   => array(
					'{{WRAPPER}} .om-product-details h3' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'text_color',
			array(
				'label'     => __( 'Body text color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-description, {{WRAPPER}} .om-stone-table td' => 'color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_chips',
			array(
				'label' => __( 'Variant Chips', 'om-catalog' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'chip_color',
			array(
				'label'     => __( 'Text color', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-variant-link' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'chip_active_bg',
			array(
				'label'     => __( 'Active background', 'om-catalog' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .om-variant-link.is-current' => 'background-color: {{VALUE}}; border-color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();

		// Real product context first; otherwise the preview product.
		$rewrites = class_exists( 'OM_Rewrites' ) ? OM_Rewrites::instance() : null;
		$product  = null;
		$line     = '';
		$style    = '';

		if ( $rewrites && $rewrites->is_product_request() ) {
			$product = $rewrites->get_current_product();
			$line    = $rewrites->get_current_line();
			$style   = $rewrites->get_current_style();
		}

		if ( ! $product || is_wp_error( $product ) ) {
			$line  = ! empty( $settings['preview_line'] ) ? $settings['preview_line'] : 'engagement-rings';
			$style = trim( (string) $settings['preview_style'] );

			if ( '' !== $style ) {
				$product = OM_API_Client::get_product_by_style( $line, $style );
			} else {
				$list    = OM_API_Client::get_products( $line, array( 'limit' => 1 ) );
				$product = ( ! is_wp_error( $list ) && ! empty( $list['products'][0] ) ) ? $list['products'][0] : null;
				$style   = is_array( $product ) && isset( $product['style_number'] ) ? $product['style_number'] : '';
			}
		}

		if ( ! $product || is_wp_error( $product ) ) {
			echo '<div class="om-error"><p>' . esc_html(
				is_wp_error( $product ) ? om_public_error_message( $product ) : __( 'No product to display. Check API credentials in Settings > OM Catalog.', 'om-catalog' )
			) . '</p></div>';
			return;
		}

		$args = array();
		foreach ( array( 'show_gallery', 'show_line_label', 'show_title', 'show_meta', 'show_price', 'show_description', 'show_options', 'show_stones', 'show_variants' ) as $key ) {
			$args[ $key ] = 'yes' === ( $settings[ $key ] ?? 'yes' );
		}

		$args['price_display']  = 'never' === ( $settings['price_display'] ?? 'auto' ) ? 'never' : 'auto';
		$args['price_fallback'] = in_array( $settings['price_fallback'] ?? 'text', array( 'text', 'buttons', 'none' ), true ) ? $settings['price_fallback'] : 'text';

		$args['price_placeholder'] = (string) ( $settings['price_placeholder_text'] ?? '' );

		$price_link = is_array( $settings['price_placeholder_link'] ?? null ) ? $settings['price_placeholder_link'] : array();
		$args['price_link']          = (string) ( $price_link['url'] ?? '' );
		$args['price_link_external'] = ! empty( $price_link['is_external'] );
		$args['price_link_nofollow'] = ! empty( $price_link['nofollow'] );

		$buttons = array();
		foreach ( (array) ( $settings['action_buttons'] ?? array() ) as $item ) {
			if ( empty( $item['button_text'] ) ) {
				continue;
			}
			$item_link = is_array( $item['button_link'] ?? null ) ? $item['button_link'] : array();

			$icon_html = '';
			if ( ! empty( $item['button_icon']['value'] ) ) {
				ob_start();
				Icons_Manager::render_icon( $item['button_icon'], array( 'aria-hidden' => 'true' ) );
				$icon_html = (string) ob_get_clean();
			}

			$buttons[] = array(
				'text'          => $item['button_text'],
				'url'           => (string) ( $item_link['url'] ?? '' ),
				'external'      => ! empty( $item_link['is_external'] ),
				'nofollow'      => ! empty( $item_link['nofollow'] ),
				'style'         => $item['button_style'] ?? 'solid',
				'show'          => $item['button_show'] ?? 'always',
				'icon_html'     => $icon_html,
				'icon_position' => $item['button_icon_position'] ?? 'before',
				'class'         => ! empty( $item['_id'] ) ? 'elementor-repeater-item-' . $item['_id'] : '',
			);
		}
		$args['buttons']          = $buttons;
		$args['buttons_position'] = in_array( $settings['buttons_position'] ?? 'price', array( 'price', 'after_description', 'after_options' ), true ) ? $settings['buttons_position'] : 'price';
		$args['buttons_layout']   = 'stacked' === ( $settings['buttons_layout'] ?? 'inline' ) ? 'stacked' : 'inline';
		$args['options_style']    = in_array( $settings['options_style'] ?? 'swatches', array( 'swatches', 'pills', 'dropdowns' ), true ) ? $settings['options_style'] : 'swatches';
		$args['details_style']    = 'accordion' === ( $settings['details_style'] ?? 'open' ) ? 'accordion' : 'open';
		$args['design']           = in_array( $settings['design'] ?? 'refined', array( 'refined', 'modern', 'classic' ), true ) ? $settings['design'] : 'refined';
		$args['video_mode']       = 'thumb' === ( $settings['video_mode'] ?? 'first' ) ? 'thumb' : 'first';
		$args['back_link']        = 'yes' === ( $settings['back_link'] ?? 'yes' );
		$args['back_text']        = (string) ( $settings['back_text'] ?? '' );
		$trust_source             = (string) ( $settings['trust_source'] ?? 'global' );
		$args['trust_line']       = 'custom' === $trust_source ? (string) ( $settings['trust_text'] ?? '' ) : ( 'none' === $trust_source ? '' : null );
		$args['gallery']          = array(
			'autoplay'     => 'yes' === ( $settings['video_autoplay'] ?? 'yes' ),
			'sound'        => 'yes' === ( $settings['video_sound'] ?? 'yes' ),
			'fullscreen'   => 'yes' === ( $settings['video_fullscreen'] ?? 'yes' ),
			'watch_button' => 'yes' === ( $settings['watch_button'] ?? 'yes' ),
			'watch_text'   => (string) ( $settings['watch_text'] ?? '' ),
			'video_label'  => (string) ( $settings['video_label'] ?? '' ),
			'thumbs'       => (string) ( $settings['thumbs_position'] ?? 'left' ),
			'zoom'         => 'yes' === ( $settings['image_zoom'] ?? 'yes' ),
			'lightbox'     => 'yes' === ( $settings['image_lightbox'] ?? 'yes' ),
			'follow'       => 'yes' === ( $settings['media_follow'] ?? 'yes' ),
		);
		foreach ( array( 'show_specs', 'show_size', 'show_size_guide', 'sticky_gallery', 'sticky_bar' ) as $flag ) {
			$args[ $flag ] = 'yes' === ( $settings[ $flag ] ?? 'yes' );
		}
		$args['show_builder']     = 'yes' === ( $settings['show_builder'] ?? 'yes' );
		$args['builder_text']     = (string) ( $settings['builder_text'] ?? '' );
		$args['show_inquiry']     = 'yes' === ( $settings['show_inquiry'] ?? 'yes' );
		$args['inquiry_heading']  = (string) ( $settings['inquiry_heading'] ?? '' );
		$args['inquiry_open']     = 'yes' === ( $settings['inquiry_open'] ?? '' );
		$inquiry                  = array();
		if ( 'custom' === ( $settings['inquiry_fields_source'] ?? 'global' ) && ! empty( $settings['inquiry_fields'] ) ) {
			$inquiry['fields'] = (array) $settings['inquiry_fields'];
		}
		if ( '' !== (string) ( $settings['inquiry_intro'] ?? '' ) ) {
			$inquiry['intro'] = trim( (string) $settings['inquiry_intro'] );
		}
		if ( '' !== trim( (string) ( $settings['inquiry_button'] ?? '' ) ) ) {
			$inquiry['button'] = (string) $settings['inquiry_button'];
		}
		$subject_mode = (string) ( $settings['inquiry_subject_mode'] ?? '' );
		if ( '' !== $subject_mode ) {
			$inquiry['subject_field'] = 'show' === $subject_mode;
		}
		if ( '' !== trim( (string) ( $settings['inquiry_subjects'] ?? '' ) ) ) {
			$inquiry['subjects'] = (string) $settings['inquiry_subjects'];
		}
		$inquiry['subject'] = (string) ( $settings['inquiry_subject'] ?? '' );
		if ( '' !== trim( (string) ( $settings['inquiry_subject_tpl'] ?? '' ) ) ) {
			$inquiry['subject_tpl'] = (string) $settings['inquiry_subject_tpl'];
		}
		if ( 'custom' === ( $settings['inquiry_source'] ?? 'builtin' ) ) {
			$inquiry['custom_form'] = (string) ( $settings['inquiry_shortcode'] ?? '' );
		}
		$args['inquiry_options'] = $inquiry;

		// The extra class neutralizes the container geometry of
		// .om-single-product (the Elementor section owns spacing here) while
		// keeping its typography inheritance.
		echo '<div class="om-single-product om-single-product--widget">';
		echo om_render_product_detail( $product, $line, $style, $args ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the renderer.
		echo '</div>';
	}
}
