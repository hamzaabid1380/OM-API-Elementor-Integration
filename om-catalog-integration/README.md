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

**Edit the fields** under **Settings > OM Catalog > Inquiry form fields**:
add, remove and reorder fields (text, email, phone, paragraph, dropdown,
radio buttons, checkboxes, single checkbox, date, number), each with its own
label, placeholder, choices, width (half/full) and required flag. That form
is used everywhere; an OM Single Product widget can instead use its own field
list (**Ring Builder & Inquiry > Form fields > Custom fields for this
widget**). Optionally the customer gets a confirmation email.

The widget also sets the title, intro and button text, and its Style tab has
an **Inquiry Form** section. Or choose **My own form
(shortcode)** to use an Elementor Pro form (via `[elementor-template id=".."]`),
Contact Form 7, Gravity Forms or WPForms: give the form hidden fields with
the IDs/names `om_product`, `om_style`, `om_price`, `om_options`, `om_url`
(the page with the chosen options), `om_image` (and `om_diamond`) and they
are filled with the piece being viewed. Those
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

## Product page layout (1.6)

The product page is organised as: title and price, options, the main
button(s), then collapsible **Description**, **Stone details** and
**Specifications** sections and the inquiry form. In the OM Single Product
widget (**Layout & Options**), or under Settings > OM Catalog > Product page
for the built-in page:

- **Options display** — Swatches (colour circles for metal colour, pills for
  the rest), Pills, or Dropdowns. Style them under **Options (Swatches &
  Pills)**.
- **Description & details** — collapsible sections or always open.
- **Ring size picker** + **size guide** pop-up (how to measure, US size chart,
  printable true-size sizer). Shown on the product lines listed in Settings;
  the chosen size is priced (OM's fingerSize) and included in inquiries.
- **Gallery stays in view** while the details scroll (desktop/tablet).
- **Sticky price bar on phones** — price + main button pinned to the bottom
  once the visitor scrolls past them.

Listing grids add **Quick view** (photos, price and options in a pop-up),
**badges** (your own per style number, automatic "New", centre shape) and
shimmering **placeholder cards** while filters load.

**Background refresh** (Settings > OM Catalog > Caching) re-fetches the
catalog pages visitors use, the product lines, collections and search index
every 10 minutes via WP-Cron, so visitors are served from cache. For exact
timing, set a real server cron to call wp-cron.php.

## Product videos (1.7)

Most OM products carry a video, and the plugin makes it the centrepiece:

- **Video first** (default) — the product page opens on the video, playing
  silently on a loop like a live showcase, with a sound toggle and a full
  screen button. Photos follow in the thumbnails; the first thumbnail is the
  labelled **Video** tile. Switching to a photo shows a **Watch video**
  button to come back.
- **Photos first** — the photo leads, with the **Watch video** button on it.
  Pick either under Settings > OM Catalog > Product page (built-in page) or
  the OM Single Product widget's **Product videos** control.
- **Full screen** — the lightbox mixes videos and photos, with player
  controls and sound.
- **Listing cards** — a small play badge marks products with a video. On
  desktop the video plays over the photo while the card is hovered; on
  phones, the card nearest the middle of the screen plays as the visitor
  scrolls (one at a time). Turn off with the catalog widget's **Video previews on
  cards** switch or `card_video="no"`.
- **Quick view** opens on the video too.
- Considerate by default: autoplay is always muted (browsers require it),
  videos pause when scrolled away, nothing loads for card previews until
  needed, and visitors with *reduced motion* or *data saver* get a paused
  player with controls instead. A file a browser can't play falls back to
  the photos. Card previews need direct video files (.mp4/.webm/.mov);
  YouTube/Vimeo links play on the product page only.

Settings > OM Catalog > Tools > Test connection reports how many products in
a line have videos.

## Widget controls for quick view, videos and the gallery (1.8)

**OM Product Catalog** and **OM Related Products** widgets:

- **Content › Quick View** — on/off, button text, look (bar across the
  photo, centred button, or eye icon), show on phones & tablets, what the
  pop-up shows (price, options, description, carat & style number, ring
  builder button), whether it opens on the video or the photo, and the
  "full details" link text.
- **Content › Videos on Cards** — video badge (play icon, play icon + text,
  or none), its text and corner, and video previews on/off.
- **Style › Quick View Button / Quick View Pop-up / Video Badge** — colours
  (normal + hover), borders, radius, padding, sizes; pop-up background,
  page overlay, width, radius, spacing and close button.
- Catalog widget also gets **Style › Card Price** and **Style › Search &
  Sort**.

**OM Single Product** widget, **Content › Gallery & Video**: video first or
photos first, autoplay, sound button, full screen button, "Watch video"
button and its text, video thumbnail label, thumbnails left / under / hidden,
zoom on hover, click to open full screen, and photos following the metal
colour. **Style › Gallery** (photo background and radius, thumbnail size,
spacing, radius, borders) and **Style › Video Buttons**.

**OM Diamond Search** widget: lab-grown/natural switch, shape selected at
first, and **Style › Filters / Results** (chips, selected state, table
headings, rows, hover, price, buttons).

Shortcode equivalents on `[om_catalog]` and `[om_related]`: `quick_view`,
`qv_text`, `qv_style` (bar|button|icon), `qv_mobile`, `qv_parts`
(price,options,description,meta,builder), `qv_video` (first|thumb),
`qv_link_text`, `video_badge` (icon|label|none), `video_badge_text`,
`video_badge_pos` (tr|tl|br|bl), `card_video` (yes|no).

## Photos that follow the selected options (1.8)

- **Metal colour:** picking a colour switches the gallery to that colour's
  photos (and video, when videos are per colour) and brings the first one
  up; Platinum shows the white photos. Photos that aren't colour-specific
  stay in every colour. This works when Overnight Mountings' data tells the
  photos apart: a colour on each image, images grouped by colour, or file
  names such as `…-YG-1.jpg` / `…_rose_…`. Settings › OM Catalog › Tools ›
  Test connection reports whether your catalog does. Turn it off under
  Settings › OM Catalog › Product page or in the widget.
- **Listings filtered by a metal colour** show each card in that colour and
  open the product in it.
- **Carat sizes** are separate designs (their own style numbers and photos)
  in OM's catalog, so choosing one opens that design's page — now keeping
  the metal, colour, setting, quality and ring size already picked. The same
  goes for "View full details" in quick view. Links can do this too:
  `?om_metal=18 KT&om_color=Rose&om_size=7`.

## Inquiry emails (1.9)

The built-in form sends an HTML email (with a plain-text copy for mail apps
that prefer it):

- **Subject:** `New inquiry: {title} (Style {style number}) — {name}`
  (change it with the `om_inquiry_subject` filter).
- **Product card:** photo (in the metal colour chosen), title, style number,
  options, price shown, a **View this piece** button and the page URL. The
  link reopens the exact configuration (`?om_metal=…&om_color=…`).
- **Their answers** from the form, and a footer reminding you that
  replying goes straight to the customer (Reply-To).
- The title, style number, photo and page come from Overnight Mountings'
  own data (a cached lookup), not from the browser, so spam can't inject
  its own text or links.
- The optional customer auto-reply shows the same product card.
- **Inquiries** in wp-admin lists each lead with the photo, title, style
  number and a link to the configured piece.

## Consistent hover states (1.9)

Themes such as Hello Elementor, and Elementor's global kit, restyle every
button and link (a pink or kit-coloured hover background, purple link hover,
16px text, 3px corners). Every plugin button and link now sets its own
colours for rest, hover and focus, and its own size and shape, strongly
enough to beat the theme but not the widgets' style controls. One hover
language throughout: solid buttons invert, outline buttons fill, text links
fade, icon buttons tint, and keyboard focus shows a ring in your brand
colour.

## Look & feel (1.11)

Settings > OM Catalog > **Look & feel** keeps every OM widget and page
consistent:

- **Corner radius** for buttons, pills and fields, and a second one for
  photos, cards and pop-ups (0 = square, the default).
- **Spacing**: compact, comfortable or airy — the rhythm of the product
  page, toolbar and rows.
- **Card hover**: lift (card rises with a soft shadow, name underlined —
  default), zoom (slow photo zoom) or none. Second photos fade in slowly.
- **Trust line** under the price, e.g. `Free resizing | Certified diamonds
  | Made to order` (empty = hidden). The Single Product widget can use it,
  set its own, or hide it, and style it under Style > Price.
- **Text sizes on phones** for product names, card names and body text.
  Long names are balanced over two lines.

## Search (1.11)

- **Grouped search across lines.** The catalog widget's *Suggestions
  search* setting: the line being browsed, all lines in the widget, or
  every product line — each line gets a heading, its best matches and "See
  all (n) in {line}".
- **Stand-alone search box** for a header: the **OM Search** widget or
  `[om_search]` (`lines="engagement-rings,wedding-bands"`, empty = all;
  `results_page="ID"`; `placeholder`; `button="no"`). "See all" and Enter
  open the **Search results page** (Settings > OM Catalog > Search) — a page
  with an OM Product Catalog widget showing those lines.
- **Recent and popular searches** appear when a visitor clicks into an
  empty search box. Recent ones stay in the visitor's browser; popular ones
  are your list (Settings > Search), topped up with what visitors search
  most (can be turned off).
- **Empty and error states**: "Nothing found for …" with *Clear search* /
  *Clear all filters*, one-click "Without {filter}" chips, lines where the
  search does match ("Found in"), and popular searches; errors get a *Try
  again* button that reloads just the grid.

## Diamond results (1.11)

Colour, clarity and cut appear as small badges (top grades — D–F, FL–VVS2,
Ideal/Excellent — highlighted), the report shows the lab and Lab-grown /
Natural, and the column headings stay in view while scrolling.

## Inquiry subjects (1.13)

Settings > OM Catalog > Inquiries:

- **Subjects** — one per line (default: General question, Price request,
  Book a viewing, Custom design, Ring sizing). Visitors pick one as pills
  at the top of the form; it heads the email and its subject line.
- **Email subject line** template with `{subject}` `{piece}` `{title}`
  `{style}` `{name}` `{email}` `{phone}` `{price}` `{site}` — default
  `{subject}: {piece} — {name}`, e.g. "Book a viewing: Halo Ring (Style
  80285-04) — Jane". The customer's copy says "We received your inquiry:
  Book a viewing".
- **Preselect from any button**: link it to `#om-inquiry?subject=Book a
  viewing` — the form opens, scrolls into view with that subject chosen.
- The OM Single Product widget can show/hide the choice, use its own list,
  preselect one and use its own subject template (Inquiry section).
- Only listed subjects are accepted (the list is signed); anything else
  falls back to the first.

## Browsing extras (1.14)

- **Zoom** — on product pages open the photo viewer, then double-click /
  double-tap, scroll-wheel or pinch to zoom, drag to pan; the + / − / 0 keys
  and the on-screen buttons work too.
- **Quick filters from badges** — shape and "Popular" badges on cards are
  links: tapping "Oval" filters the listing to ovals, "Popular" sorts by most
  viewed (widget > Cards: Clickable badges).
- **Show more / infinite scroll** — widget > Pagination style: Page numbers,
  "Show more" button, or Infinite scroll. The address remembers how far the
  visitor got (`om_upto`), so Back from a product returns to the same spot.
- **Compare** — a "Compare" toggle on each card collects up to 4 designs
  (from any line) in a tray at the bottom of the page; "Compare now" opens a
  side-by-side table (photo, starting price, carat, centre stone, stones,
  metals, colours, settings, video). The tray persists across pages.
  Shortcode `compare="no"` or the widget switch turns it off.
- **Most viewed** — a sort option ordered by real product page views
  (counted once per visitor session; rate-limited). The 12 most viewed
  designs per line (5+ views) get a "Popular" badge; "New" badges still
  come from the API.
- **Smooth page transitions** — the clicked card photo glides into the
  product page (Chrome, Edge, Safari 18+). Settings > OM Catalog > Look &
  feel to turn off.
- **Accessibility** — keyboard support throughout (Escape closes the filter
  sheet, dialogs trap and return focus), results changes are announced to
  screen readers, suggestion lists expose the active item, and small grey
  text was darkened to meet WCAG AA contrast (checked with axe: 0 issues).

## Complete the set (1.15)

A "Complete the set" row pairs a ring with matching wedding bands (and a
band with the engagement rings it suits).

- **Where** — on the built-in product page it sits above "You might also
  like" (Settings > OM Catalog > Built-in product page rows). In an
  Elementor product layout add **OM Related Products** and set
  *Show: Complete the set*. Shortcode: `[om_related source="set"]`.
- **Which designs** — Overnight Mountings has no "matching band" field, so
  the row takes, in order:
  1. pairs listed in Settings > OM Catalog > Complete the set, one per
     line: `80285-04 = 12345-01, 12345-02` (works both ways);
  2. designs of the same family (same style-number root) in the other line;
  3. the same style (Halo, Solitaire…) in the metal colour picked;
  4. the other line's most viewed designs, then its own order.
- **Follows the metal** — pick Yellow on the ring and the bands' photos
  switch to yellow, and their links open in the same metal and colour.
- **Set price** — each card shows the band's "From" price and "Set from"
  (ring + band), when card prices are on.
- **Ask about this set** — opens the page's inquiry form with the subject
  "Bridal set" and the band attached ("Together with…", removable). The
  email shows both pieces with photos and links, and the subject reads
  "Bridal set: Halo Ring (Style 80285-04) + Band (Style 12345-01) — Jane".
  The `{pair}` token is available in the subject template.
- **Widget options** — Pair with line (automatic or a specific line), line
  under the title, "Set from" price and "Ask about this set" switches, plus
  all the usual card, quick view and style controls.

## Recently viewed in search (1.16)

Clicking into an empty search box opens a "Recently viewed" strip above
the recent and popular searches: the last designs this visitor looked at
(newest first, the one on screen left out), each with its photo, name,
style number and "From" price. The same strip appears when a search finds
nothing, so the visitor can go straight back to a piece they liked.

- Arrow keys move through the cards like any suggestion; Enter opens one.
- "Clear" forgets the history (it's kept only in the visitor's browser —
  the same list as the "Recently viewed" product row).
- How many cards: **OM Catalog** widget > Search > *Recently viewed in
  search*, **OM Search** widget > *Recently viewed in search* (0 = off,
  up to 8; default 4). Shortcodes: `suggest_viewed="4"` on `[om_catalog]`
  and `[om_search]`.
- Prices follow the *Prices in suggestions* switch.

## Quiet page intro & catalog heading (1.17)

The first time a visitor lands on a listing, the page settles in: the
heading eases into place (its letter spacing gently tightens, the rule
draws in), then the filters and toolbar, then the cards one after another.
Filtering or paging afterwards is instant, and visitors who prefer reduced
motion never see it.

Everything is in the **OM Catalog** widget:

- **Content > Page intro** — on/off; *Play*: first visit to the page,
  once per visit, or every load; *Motion*: rise, fade, blur to sharp,
  settle (zoom); duration; delay between cards; rise distance; how many
  cards take part (0 = none); whether the filters & toolbar take part;
  whether the page's own H1 (e.g. an Elementor Heading) joins in — the site
  header and logo are never touched. In the editor it always replays so
  changes can be previewed.
- **Content > Heading** — an optional heading above the catalog: eyebrow,
  title (`{line}` = the product line shown), HTML tag, thin rule, text,
  responsive alignment.
- **Style > Heading** — colours and typography for eyebrow, title and
  text, text width, rule colour/width/thickness, space below.

Shortcode: `[om_catalog intro="yes" intro_when="first" intro_style="rise"
intro_speed="700" intro_stagger="70" intro_cards="8" intro_toolbar="yes"
intro_page_title="" head="yes" head_eyebrow="" head_title="{line}"
head_text="" head_rule="yes" head_tag="h2" head_align="center"]`
(the intro is off by default in shortcodes, on by default in the widget).

## End-of-results card (1.18)

When a visitor reaches the last design (last page, or when "Show more" /
infinite scroll runs out), a closing card offers a next step instead of a
dead end: "You've seen them all — Haven't found the one?".

- **Main button** — opens the built-in inquiry form in a pop-up (subject
  "Custom design" preselected; the email notes the listing they were on),
  or goes to a link (e.g. a booking page), or none.
- **Second button** — *Smart*: "See all designs" (clears the filters, in
  place) when the listing is filtered, otherwise "Back to top"; or a link,
  or none.
- **Layout** — a card in the grid, or a full-width banner. **Look** — soft
  tint, outline, dark (brand colour) or a photo background with overlay.
- Eyebrow, title and text are editable; `{count}` and `{line}` fill in,
  e.g. "All {count} {line}, seen."

All of it is in the **OM Catalog** widget (Content > End of results, Style
> End of results: colours, typography, alignment, padding, minimum height,
corner radii). Shortcode: `end_card="yes|no" end_layout="cell|banner"
end_theme="soft|outline|dark|image" end_image="" end_eyebrow="" end_title=""
end_text="" end_primary="inquiry|link|none" end_primary_text=""
end_primary_url="" end_subject="Custom design"
end_secondary="auto|top|link|none" end_secondary_text=""
end_secondary_url=""`.

## Changelog

### 1.18.0
- End-of-results card after the last design (numbers, Show more,
  infinite scroll): inquiry pop-up or link, smart "See all designs" /
  "Back to top", grid card or banner, four looks, full widget controls.
- Inquiries without a piece get a clean subject ("Custom design — Sam")
  and record the listing page they came from.
- Inquiry form without a heading no longer prints an empty heading.

### 1.17.0
- Quiet page intro for catalog pages: heading, filters/toolbar and cards
  ease in one after another (rise, fade, blur, zoom); first visit / once
  per visit / always; optional page H1; never for reduced motion; no
  flash (starts before first paint); filtering never replays it.
- Optional catalog heading (eyebrow, {line} title, rule, text) with full
  style controls.
- All intro and heading settings live in the OM Catalog widget.

### 1.16.0
- "Recently viewed" photo strip in the search panel (empty box and
  no-results), with prices, keyboard support and a Clear link; count set
  per widget / shortcode (suggest_viewed).
- Search panel semantics: a dialog holding its listbox whenever it
  contains buttons (starters, recently viewed), so screen readers get a
  valid structure.

### 1.15.0
- "Complete the set" row: matching bands on ring pages (rings on band
  pages) from listed pairs, design family, style and colour, then most
  viewed; photos and links follow the metal picked; "Set from" price.
- "Ask about this set": the paired design travels into the inquiry form
  and the email (both pieces, photos, links; {pair} subject token);
  shown in the Inquiries list.
- "Bridal set" added to the default inquiry subjects.

### 1.14.0
- Photo viewer zoom: double-click/tap, wheel, pinch, drag to pan, keys and
  buttons.
- Card badges are quick-filter links (shape → filter, Popular → Most
  viewed).
- Pagination styles: Show more button and infinite scroll, with position
  remembered in the URL.
- Compare tray (up to 4 designs, persists across pages) and comparison
  table.
- "Most viewed" sort with privacy-light view counting; automatic Popular
  badges.
- Cross-page view transitions (photo carries over into the product page).
- Accessibility pass: live announcements, Escape for the filter sheet,
  aria-selected suggestions, labelled dialogs, darker secondary text
  (#6e6e6e), readable photo labels, larger copy-style button.

### 1.13.0
- Catalog pages "Modern" design (default; widget > Page design): framed
  filter sidebar with tinted rows, sentence-case pills that scroll on
  phones, tidy toolbar, framed card photos with glassy badges, staggered
  card entrance, "You've viewed 9 of 40" progress with pill pagination,
  and on phones a bottom-sheet filter panel (stays open while filtering,
  Show results button, tap outside to close).
- Inquiry subjects: predefined choices, subject-line template, button
  preselect via #om-inquiry?subject=…, widget overrides.
- Corner defaults per design: Modern uses soft corners unless a radius is
  set in the widget or Settings.

### 1.12.0
- Photos follow the metal colour for designs whose colours are separate
  style numbers at Overnight Mountings (colour variants are looked up once
  and cached); more file-name patterns recognised (14KY, W1, 2Y…). Admins
  see a note under the gallery when a design's photos can't be matched,
  with the image and variant names OM sends. Carat links no longer repeat.
- Related carousel: hovered cards are no longer cut off at the top.
- Card hover, lift distance, photo shadow (soft / stronger / none), corner
  radii and spacing are now set per widget (Style > Card Hover, Corners &
  Spacing; Single Product > Corners & Spacing). Settings > OM Catalog only
  holds the site defaults.
- Product page "Modern" design (default; Page design control): framed
  gallery with a photo counter and swipe on phones, price row that animates
  on change, options panel with values on the right, full-width buttons
  with a sliding arrow, card-style details and inquiry, copy-style-number
  button, sections that fade in on scroll. "Classic" keeps the old look.
- Popular searches only learn from searches that found something.
- Overlay cards: price readable on the dark scrim.

### 1.11.0
- Look & feel settings: shared corner radii, spacing scale, card hover
  (lift / zoom / none), trust line under the price, phone text sizes.
- Designed empty and error states with one-click ways out, "Found in"
  other lines and popular searches; retry reloads just the grid.
- Grouped search across a widget's lines or every line; new OM Search
  widget / `[om_search]` for headers with a results page.
- Recent (per visitor) and popular searches on an empty search box;
  optional learning of popular searches.
- Diamond table: 4C badges, lab/origin tags, sticky column headings.
- Fix: listing cards' fade-in no longer blocks hover transforms.

### 1.10.0
- Search suggestions: product photo (default metal colour), carat and style
  number, and a "From $X" starting price that loads right after the list
  (cached, remembered while the visitor keeps typing). Typed words are
  highlighted; a two-line layout on phones. Catalog widget switch:
  "Prices in search suggestions" (shortcode `suggest_prices="no"`).
- The search box's clear button uses the brand colour.

### 1.9.0
- Buttons, links, pills and icon buttons keep their own colours and shape
  on hover and focus under any theme or Elementor kit (no more pink/purple
  flashes on quick view, gallery, thumbnails, close buttons, arrows,
  pagination, filters); unified hover language and focus ring.
- Inquiry emails: HTML with the product photo, title, style number,
  options, price and a link to the exact configuration; style number in
  the subject; details verified against OM's data; customer auto-reply
  with the same card; admin list shows photo, title and style.
- Custom forms also receive `om_image` and a configured `om_url`.

### 1.8.0
- Every quick view and video-badge option is now a widget control, with
  full styling (catalog and related widgets); related rows get quick view.
- Single Product widget: Gallery & Video section (autoplay, sound, full
  screen, watch button text, thumbnail position, zoom, lightbox) and
  Gallery / Video Buttons style sections.
- Photos follow the selected metal colour; colour-filtered listings show
  cards in that colour; carat switches keep the chosen options.
- Catalog widget: Card Price and Search & Sort styles. Diamond widget:
  origin switch, default shape, Filters and Results styles.
- Test connection reports whether photos are told apart by colour.

### 1.7.0
- Product video experience: video-first gallery that autoplays muted on a
  loop, sound toggle, full screen button, "Watch video" button over photos,
  labelled video thumbnail.
- Lightbox plays videos alongside photos.
- Listing and related cards: play badge, hover preview on desktop,
  centre-of-screen preview on phones.
- Quick view opens on the video.
- Reduced-motion / data-saver support; unplayable files fall back to photos.
- New settings: Product videos (video first / photos first); catalog
  widget "Video previews" switch.

### 1.6.1
- Test connection always reports video status (present / empty / no field /
  unrecognised format), shows the plugin version and the product's fields.
- Videos are read from any of videos, video, video_url(s).

### 1.6.0
- Cleaner product page: options as swatches/pills/dropdowns, collapsible
  description / stone details / specifications, sticky gallery.
- Ring size picker (priced via fingerSize) with a size guide pop-up and
  printable sizer.
- Sticky price + CTA bar on phones.
- Quick view pop-up on listing cards; card badges (custom, New, shape).
- Skeleton placeholder cards while filtering; card photos fade in.
- Background cache refresh via WP-Cron.
- Test connection reports product video coverage.

### 1.5.0
- Inquiry form builder: add/remove/reorder fields of ten types, globally in
  Settings or per Single Product widget; server-side validation of required
  fields; optional customer confirmation email.
- OM Related Products widget: card designs, title tag, hover second photo,
  carousel arrows and autoplay, peek, and full styling for section, title,
  cards, image, texts and arrows.

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
