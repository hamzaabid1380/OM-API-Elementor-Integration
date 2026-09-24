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

Until a markup is set, the site shows **"Call for pricing"** instead of any
price — wholesale numbers are never exposed to visitors.

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
- Prices are fetched live on each page view (not stored), since Overnight Mountings'
  pricing includes a daily metal-market snapshot.
- Product listings are cached briefly (default 15 minutes, adjustable in settings)
  to reduce API calls; price quotes are never cached.
- If a product's style number changes or is discontinued on Overnight Mountings'
  side, the single product page will show a clear "not found" message rather than
  a broken page (and sends a real HTTP 404, so search engines drop it).
- Valid product pages send HTTP 200 with the product's name as the page title
  plus meta description and OpenGraph tags — safe to use as ad landing pages.
- Listing pagination uses an `?om_page=N` query parameter, which works reliably
  on Elementor-built pages (WordPress's pretty `/page/2/` URLs get redirected
  away on static pages).

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
