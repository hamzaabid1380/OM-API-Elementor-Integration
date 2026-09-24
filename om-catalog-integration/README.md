# Overnight Mountings Catalog Integration

Pulls live product and pricing data from the Overnight Mountings Product Catalog API
and displays it on the WordPress site — no WooCommerce, no cart, no ordering.
Just clean listing pages and single product pages, styled to your brand.

## Install

1. Zip the `om-catalog-integration` folder (or use the zip as provided).
2. In WordPress admin: **Plugins > Add New > Upload Plugin**, select the zip, install, activate.

## Set up credentials

Go to **Settings > OM Catalog** and enter:
- **Client ID** (your account number, e.g. `R01203`)
- **Client Secret** (from Overnight Mountings)

Nothing needs to be edited in code. The plugin handles getting and refreshing
the access token automatically behind the scenes.

## IMPORTANT: Set your pricing markup before going live

The API returns **wholesale** prices. Until you set a markup, the site would show
raw wholesale pricing — you'll see a warning banner in wp-admin as a reminder.

Go to **Settings > OM Catalog > Pricing Markup** and choose either:
- **Percentage** — e.g. `120` means retail = wholesale × 2.2
- **Multiplier** — e.g. `2.2` means the same thing, entered directly

Until a markup is set, the site shows **"Call for pricing"** (or your own
text/buttons, see below) instead of any price — wholesale numbers are never
exposed to visitors. Logged-in admins see a small note on product pages
explaining why no price is shown.

**Not seeing prices?** Go to **Settings > OM Catalog > Tools** and click
**Test connection & pricing**. It logs in, reads the product lines, loads a
product and prices it, and tells you exactly which step fails.

## Set your brand colors and fonts

Same settings page, under **Brand Colors & Fonts**. The defaults already match
the live wulfdiamondjewelers.com design (Arapey headings, Inter body,
near-black `#00111C` primary, flat square styling) — only change them if the
site's branding changes.

## Adding pages

**Listing/catalog pages** (e.g. Engagement Rings, Wedding Bands):
Create a normal WordPress page, edit with Elementor, and either:
- Drag in the **"OM Product Catalog"** widget (appears in the Elementor widget
  panel once this plugin is active), and set the product line, columns, and
  items-per-page in the widget's settings panel, OR
- Use Elementor's built-in **Shortcode** widget with:
  `[om_catalog line="engagement-rings" columns="3" per_page="12"]`

Available `line` values: `engagement-rings`, `wedding-bands`, `bracelets`,
`earrings`, `fashion-rings`, `necklaces`, `pendants`, `in-stock`.

**Single product pages** are generated automatically — no page-building needed.
Every product card links to:
`yoursite.com/catalog/{product-line}/{style-number}/`

This page uses your theme's normal header and footer, styled with the colors/fonts
from the settings page.

**Design product pages in Elementor:** create a page, edit it with Elementor,
drop in the **OM Single Product** widget (it previews a real product while you
design; Content tab picks the preview and toggles each section — gallery,
title, price, options, stone details, variants — and the Style tab holds
colors/typography). Add anything else around the widget: banners, trust
badges, a contact section. Then choose that page under
**Settings > OM Catalog > Product Page Layout** — every `/catalog/...` URL
now renders through your design, with live pricing and the gallery working
as before.

Alternatively, for a code-level custom layout, copy
`templates/single-product.php` into your (child) theme as
`om-catalog/single-product.php` — the plugin uses the theme copy when it
exists, so your edits survive plugin updates. Developers can also swap the
template via the `om_single_product_template` filter.

## Notes on scope

- No WooCommerce dependency, no cart/checkout — this is display-only, matching
  what was requested.
- Prices are fetched live (identical configurations are reused for up to 5
  minutes), since Overnight Mountings' pricing includes a daily metal-market
  snapshot.
- Product listings are cached briefly (default 15 minutes, adjustable in settings)
  to reduce API calls.
- If a product's style number changes or is discontinued on Overnight Mountings'
  side, the single product page will show a clear "not found" message rather than
  a broken page (and sends a real HTTP 404, so search engines drop it).
- Valid product pages send HTTP 200 with the product's name as the page title
  plus meta description and OpenGraph tags — safe to use as ad landing pages.
- Listing pagination uses an `?om_page=N` query parameter, which works reliably
  on Elementor-built pages (WordPress's pretty `/page/2/` URLs get redirected
  away on static pages).

## Visitor filters: top bar, dropdowns or sidebar

In the **OM Product Catalog** widget (Content tab > Visitor filters):

- **Collection filter**, **Shape filter**, **Metal colour filter** — switch on
  the ones shoppers should see.
- **Filter position** — *Top bar* (pills/tabs above the grid), *Dropdowns*
  (compact selects above the grid), *Sidebar — left* or *Sidebar — right*.
  On phones the sidebar folds into a "Filters" button.
- **Show result count** — "Showing 1–12 of 318" above the grid, with the
  active filters as removable chips.

The Style tab's **Sidebar & Dropdown Filters** section sets the sidebar
width, spacing, sticky behaviour, colours and typography. Shortcode
equivalent: `[om_catalog show_filters="yes" filter_shapes="yes"
filter_metals="yes" filter_position="left"]`.

Filtering updates the grid in place. Only the options the widget offers are
accepted, so visitors can't make the site run arbitrary catalog queries.

## Price & buttons on product pages

In the **OM Single Product** widget (Content tab > Price & Buttons):

- **Price** — show the live price when available, or never show prices.
- **When no price is shown** — show text ("Call for pricing", optionally
  linked), show the buttons in the price's place, or show nothing.
- **Buttons** — any number, each with text, link, icon, style (solid,
  outline, text link), its own colours, and a rule: show always, only when
  there's no price, or only with a price.
- **Buttons position / Arrangement / Alignment** — under the price, after
  the description or after the options; side by side or stacked; left,
  centre, right or full width.

The Style tab's **Buttons** section covers typography, padding, height,
width, corner radius, border, icon size/spacing and normal/hover colours.

## Search, sorting and card prices

Every catalog grid has a **search box** (names, style numbers and carat
names of the active line, with suggestions as you type) and a **Sort by**
dropdown (Featured, Newest, Style number). Overnight Mountings' API has no
keyword search, so the plugin keeps its own small index per product line,
rebuilt every 12 hours (a few API calls, 500 products each).

Turn on **"From $X" price on cards** to show each design's starting price.
Prices load just after the page (so it never waits on them), are cached for
12 hours, and only appear once a markup is set.

## Loose diamonds

Drop the **OM Diamond Search** widget (or `[om_diamonds]`) on a page:
shape picker, carat and price ranges, lab-grown/natural, colour, clarity and
cut, sorting, and an expandable detail panel per stone (photo or 360° view,
specs, certificate link, "Select this diamond", "Ask about this diamond").
Diamonds use their own markup (**Settings > OM Catalog > Loose Diamonds**),
falling back to the jewelry markup.

## Ring builder

1. Create a page (e.g. "Design Your Ring") with the **OM Ring Builder**
   widget or `[om_ring_builder]`.
2. Choose it under **Settings > OM Catalog > Ring Builder** (and which
   product lines count as settings — engagement rings by default).

Customers pick a setting and a diamond in either order, then see both with
the total price and a "Request this ring" form. The design lives in the page
URL, so it can be bookmarked or shared. Engagement-ring product pages get a
**Select this setting** button; the diamond search gets **Select this
diamond**.

## Inquiries

Product pages, diamonds and the builder review have an inquiry form. Each
inquiry is emailed to the address in **Settings > OM Catalog > Inquiries**
(default: the site admin email) and saved under **Inquiries** in wp-admin,
with the piece, chosen options, price shown and page link. Spam is filtered
with a hidden field, a minimum fill time and a per-visitor hourly limit.

Customise it in the OM Single Product widget (**Ring Builder & Inquiry**):
title, intro, button text, which fields show, phone required, field labels,
and a Style-tab **Inquiry Form** section. Or choose **My own form
(shortcode)** to use an Elementor Pro form (via `[elementor-template id=".."]`),
Contact Form 7, Gravity Forms or WPForms: give the form hidden fields with
the IDs/names `om_product`, `om_style`, `om_price`, `om_options`, `om_url`
(and `om_diamond`) and they are filled with the piece being viewed. Those
leads then land wherever that form sends them (e.g. Elementor > Submissions).

## Related & recently viewed products

The **OM Related Products** widget (or `[om_related source="related|recent|picked"]`)
shows a grid or swipeable carousel below the product:
- **You might also like** — same line, same collection or centre shape where
  known, never the product itself or its size variants;
- **Recently viewed** — remembered in the visitor's own browser; hidden until
  they have viewed other pieces;
- **Hand-picked** style numbers.

The built-in product page shows "You might also like" and "Recently viewed"
automatically (toggle under Settings > OM Catalog > Built-in product page rows).

## Filtering & curating what shows (Elementor or shortcode)

The widget's Content tab (and matching shortcode attributes) control what
appears:

- **Product line** — engagement rings, wedding bands, etc. (`line=`)
- **Collections dropdown** (Elementor) — a grouped multi-select of the line's
  real categories and subcategories, pulled live from Overnight Mountings'
  taxonomy (cached 12 hours). Pick one or more; leave empty for all. A
  free-text **custom collection filter** (`style=`) and independent
  **set filter** (`set=`) sit alongside it for anything unusual.
- **Center-stone shape** — e.g. "Round,Oval" (`shape=`)
- **In-stock only** toggle (`in_stock="yes"`)
- **Show ONLY these style numbers** — comma-separated list that turns the
  widget into a hand-picked showcase (`include=`)
- **Hide these style numbers** — removes specific products from the grid
  (`exclude=`). Hidden products are filtered out after fetching (the API has
  no exclusion parameter), so a page can show slightly fewer items than
  "Products per page" — fine for curating out a handful of pieces.

## Styling the catalog per page (Elementor)

The **OM Product Catalog** widget is fully editable in the Elementor editor.
The Content tab picks what to show (product line, collection/set filters,
products per page, responsive columns, show/hide the carat line and
pagination). The Style tab exposes the whole look with live preview: grid
gaps and margins, card background/border/padding/alignment, image aspect
ratio, background and hover zoom, title and carat-line colors + full
typography, and pagination colors, alignment and typography. Anything left
untouched inherits the site-wide defaults from Settings > OM Catalog, so
per-widget styling is opt-in.

## Changelog

### 1.4.0
- Inquiry form fully customisable in the Single Product widget (texts,
  fields, labels, styling), or replaced by any form shortcode with the
  product details passed into its hidden fields.
- New OM Related Products widget / [om_related]: related designs, recently
  viewed, or hand-picked, as a grid or carousel; also on the built-in
  product page.

### 1.3.0
- Search box with as-you-type suggestions on every catalog grid; Sort by
  dropdown; optional "From $X" starting prices on cards; second product
  photo on card hover.
- Product pages: click-to-open lightbox (keyboard and swipe), hover zoom,
  product videos, schema.org Product data for search engines, "Select this
  setting" (ring builder) and an inquiry form.
- New OM Diamond Search widget / [om_diamonds] and OM Ring Builder widget /
  [om_ring_builder], with a separate diamond markup.
- Inquiries saved in wp-admin and emailed.
- Catalog colours and fonts can follow the Elementor kit (Settings > OM
  Catalog > Style source).
- Responsive pass: diamond rows become cards, builder steps stack, forms
  use 16px inputs on phones (no iOS zoom), thumbnails scroll sideways,
  full-width buttons.

### 1.2.0
- New filter layouts: sidebar (left or right, collapsing to a "Filters"
  button on phones), dropdowns, or the existing top bar. New visitor filters
  for shape and metal colour, a result count and removable filter chips.
- Product page price & buttons rebuilt: buttons can replace "Call for
  pricing", with icons, per-button colours and show rules, positions,
  stacking/alignment and full styling. Buttons no longer pick up theme link
  styles.
- Fixed: collection/filter values containing an apostrophe or "&" were
  corrupted when set in the Elementor widget.
- Fixed: the catalog widget made up to 8 taxonomy API calls on a visitor's
  page view whenever its cache expired; those now only run in wp-admin.
- Fixed: anyone could make the site query OM with arbitrary settings via
  the grid's AJAX endpoint. Grid attributes are now signed, filter values
  are checked against the offered options, and out-of-range pages no longer
  call the API.
- Fixed: WordPress treated product pages as the blog home page (wrong
  signals for themes, Elementor Pro and SEO plugins). Product pages now also
  output a canonical tag, and missing products are marked noindex.
- Fixed: the product layout page was publicly viewable; visitors are now
  redirected to the home page.
- Fixed: price updates failed on pages served from a cache older than
  12–24 hours (expired nonce). The public endpoints no longer depend on one.
- Fixed: new API credentials only took effect after the cached token
  expired; saving them now takes effect immediately.
- Fixed: the client secret could be altered on save and was printed into
  the settings page source.
- Fixed: the shortcode didn't load its CSS/JS outside page content.
- Product lines come from OM's own list when available.
- Visitors see a friendly message instead of raw API/setup errors (admins
  still see the details).
- Identical price quotes are reused for 5 minutes; dropdowns sync to the
  configuration OM actually priced (e.g. Platinum forces White).
- Settings: "Test connection & pricing" and "Clear cache" tools; default
  "no price" text and link for the built-in product page.

### 1.1.0 (tenth pass — price CTA & action buttons)
- The OM Single Product widget gained a "Price & Actions" section: custom
  "Call for pricing" text with an optional link (tel:, mailto:, a page),
  and a repeater of inline action buttons (solid / outline / text-link
  styles) under the price — e.g. Call Us, Book an Appointment. A matching
  "Action Buttons" section in the Style tab covers typography, colors,
  hover, padding and gap. Once a markup is configured, real prices replace
  the placeholder automatically; the buttons stay.

### 1.1.0 (ninth pass — Elementor product page layouts)
- New "OM Single Product" Elementor widget: design the product page
  visually with a real preview product, per-section show/hide toggles and
  style controls. Pick the designed page under Settings > OM Catalog >
  Product Page Layout and all product URLs render through it — live price
  re-quoting and the gallery keep working. HTTP statuses, titles and meta
  tags are unchanged.
- Product page template is also theme-overridable at
  {theme}/om-catalog/single-product.php, and the shared renderer keeps the
  widget and template markup identical.

### 1.1.0 (eighth pass — AJAX filtering, multi-line pages, filter designs)
- Filter pills, the line switcher and pagination now update the grid in
  place via AJAX — no page reload. Links stay real URLs (shareable,
  working without JavaScript), browser back/forward is handled, and a soft
  fade shows while loading.
- Multiple product lines on one page: pick "Additional product lines" in
  the widget and visitors get a line switcher above the grid; each line
  keeps its own Collections picker in the editor. When a line's collections
  are curated, visitors filter within that curated set.
- Four filter designs (Pills, Underline, Buttons, Minimal) plus a new
  Filter Bar section in the Style tab: alignment, typography, colors for
  text/hover/border/active, gap and margins.

### 1.1.0 (seventh pass — visitor filter bar + dropdown fix)
- Fixed the Collections dropdown showing "[object Object]" (Elementor's
  select2 can't render grouped options; the list is now flat with the
  collection name folded into each label).
- New "Category filter bar for visitors" toggle: an "All" pill plus each
  category of the line above the grid, so shoppers filter it themselves.
  Selection carries through pagination, duplicate category names are
  qualified, and an empty result keeps the bar visible.

### 1.1.0 (sixth pass — layout presets)
- New Layout picker on the widget and shortcode (`layout=`): Classic
  (centered under image), Editorial (left-aligned), Boxed (framed card),
  Overlay (title over the photo on a soft scrim). Every layout remains
  fully editable via the Style tab.

### 1.1.0 (fifth pass — collections dropdown)
- The Elementor widget's collection filter is now a grouped multi-select
  populated from the live OM taxonomy per product line (categories and
  subcategories, cached 12 hours), with the free-text filter kept as an
  additive fallback. Saved selections survive API outages.

### 1.1.0 (fourth pass — filtering & curation)
- New filters on the widget and shortcode: center-stone shape, in-stock
  only, "show only these style numbers" (hand-picked showcases, variant
  style numbers supported) and "hide these style numbers".

### 1.1.0 (third pass — Elementor editability)
- The Elementor widget now has full Style-tab controls (110 controls):
  grid, card, image, title, carat line and pagination are all editable
  per widget with live preview, on top of the site-wide defaults.
- New Content options: set filter, responsive columns per device,
  show/hide carat line and pagination, per_page up to the API max of 500.
- Plugin styles and fonts load inside the Elementor editor preview.

### 1.1.0 (second pass — live-data testing + design)
- Style numbers containing "/" (carat variants like `85121-1/2`) get a
  URL-safe slug (`85121-1~2`) — encoded slashes break most servers.
- Verified end-to-end against the live API: token, 1,906-product listing,
  space/ampersand filters ("Hidden Halo", "Clip & Ship"), quotation with
  markup, variant lookups, live price re-quote, pagination (318 pages).
- Design pass matching wulfdiamondjewelers.com: vertical filmstrip gallery
  beside the hero image with active-thumbnail state and cross-fade,
  borderless centered product cards with slow image zoom on hover,
  product-line eyebrow label, style-number meta line, current-variant chip
  highlighted, refined selects with custom chevrons, uppercase letter-spaced
  section labels, Arapey/Inter loaded wherever the catalog renders.

### 1.1.0 (first pass)
- Query parameters are now URL-encoded (filter values with spaces or `&`, e.g.
  "Hidden Halo", "Clip & Ship", previously produced corrupt requests).
- `per_page` is clamped to the API's hard limit of 500.
- Single-product lookups pass `parentsOnly=false`, so variant links
  ("Other Sizes / Carats") resolve instead of showing "Product not found".
- Product pages now send correct HTTP status codes (200 found / 404 not found),
  a real page title, meta description, and OpenGraph tags.
- Pagination fixed on static/Elementor pages via `?om_page=N`.
- Prices are fully suppressed ("Call for pricing") until a markup is configured.
- Product detail responses are cached briefly; quotes remain uncached.
- Auth failures are cached for 5 minutes to avoid hammering OM's auth endpoint.
- 503s from the pricing system are retried once, per the API guide.
- Image entries tolerate both string and object shapes.
- Assets only load on pages that render catalog output.
- Default colors/fonts and CSS synced to the live site design (Arapey/Inter,
  `#00111C`, flat square surfaces).

### 1.0.0
- Initial build.

## A note on Elementor

This plugin does not attempt to generate Elementor's internal page-JSON directly —
that format changes between Elementor versions and isn't meant to be hand-generated
by a plugin; doing so reliably isn't realistic. Instead, the catalog grid is exposed
as a genuine Elementor widget you can drag, drop, and style like any other Elementor
element, which is the standard, supported way plugins integrate with Elementor.
