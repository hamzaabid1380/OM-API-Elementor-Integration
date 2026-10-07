=== Wulf Elementor Kit ===
Requires at least: 6.2
Requires PHP: 7.4
Requires Plugins: elementor
Stable tag: 1.4.1

The Wulf Diamond Jewelers website as Elementor widgets: every section, the site header and footer,
and every page of wulfdiamondjewelers.com as a ready-made template you can pick and build.

== What you get ==

24 widgets under "Wulf Diamond Jewelers" in the Elementor panel:

* Announcement bar (live "Open now / Closed now" from your hours)
* Header (logo, menu with drop-down panels, search, phone, tray, "Book a visit", phone menu)
* Hero (rotating real products with 360° video, or a photo / video)
* "How can we help?" circles
* Category tiles
* Product row (real OM settings, metal dots that switch the video, save-to-tray heart)
* "How your ring comes together" (four steps that draw themselves)
* Ring studio (style, metal, shape and carat; shows the matching real setting)
* Why Wulf (values)
* Reviews (typed in, or live from Google with an API key)
* Our story (timeline with photos and signature)
* The 4Cs explained
* Services (custom design, repair, appraisal, gold buying, financing)
* Journal (latest blog posts or hand-picked)
* Visit (photo, map, hours, contact and a "Book a visit" form)
* Footer (newsletter, links, hours, legal line)
* Page banner (breadcrumb, headline, buttons, picture) for inner pages
* Text & picture (with a tick list and buttons)
* Steps ("How it works")
* Lists (e.g. services, brands we repair, coins we buy)
* Questions (open/close answers, with FAQ markup for Google)
* Call to action band or card
* Text (long text: headings, lists, quotes)
* Spotlight (one ring, large, in 360°, with live metal buttons and a choice of rings)

28 page templates: one for every page on the live site, plus "Home (simpler)", with the wording from that page and the
same web address:

* Main: Home, Home (simpler), About, Free Consultation, Blog, Thank You, Page not found
* Shop (with the OM Catalog plugin): Engagement Rings, Ring Builder, Wedding Bands, Fashion Rings,
  Earrings, Necklaces, Pendants, Bracelets, Catalogue, Single Product layout
* Diamonds & gems: Diamond Jewelry, Where to Buy Engagement Rings, Gems
* Services: Jewelry Services & Repairs, Custom Jewelry, Jewelry Appraisals
* We buy: Gold, Silver & Platinum, Diamond Buyer, Coins & Currency, Sterling Silver, Fine Jewelry

Every widget has a Content tab (text, links, pictures, products) and a Style tab: background, spacing,
colors and hover colors, fonts, borders, corners and shadows for each part.

== Getting started ==

1. Install and activate Elementor, then this plugin.
2. Go to Wulf Kit > Settings and check your phone numbers, address, hours and brand colors.
   These feed every widget, so you only type them once.
3. Go to Wulf Kit > Pages & templates. Tick the pages you want (or "Select all") and click
   "Build selected pages". They're saved as drafts first, so your live site doesn't change.
4. Open any of them with "Edit in Elementor" and change anything you like.
5. When a page is ready, click "Go live" next to it. If your current site already has a page at
   that address, it moves to Pages > Trash (restorable for 30 days) and the new page takes its
   place, so links and Google keep working. For Home, "Go live" makes it the site's homepage.

Rebuilding a page that's already built makes a fresh copy; your edited copy is never overwritten.

The Single Product layout page is the design for every product page: after building it, choose it
in Settings > OM Catalog > Product Page Layout.

The header and footer are saved under Templates > Saved Templates as "Wulf · Header" and
"Wulf · Footer", and appear on every page. Change which templates are used (or turn them off)
in Wulf Kit > Settings. The menu is a normal WordPress menu under Appearance > Menus.

== Products ==

In the Hero, Product row and Ring studio widgets each product can be:

* "From the OM catalog": type the style number and the photos and 360° videos for each metal
  come straight from Overnight Mountings.
* "My own": upload your own picture and video.

== Visit requests and newsletter ==

The "Book a visit" form and the footer sign-up email you (Wulf Kit > Settings > "Visit requests
go to"; empty uses the site admin email). If the OM Catalog plugin is active and "Send to your CRM"
is ticked, they are also passed to its lead sending (GoHighLevel / webhook).

== Changelog ==

= 1.4.1 =
* Fix: "Edit with Elementor" stopped with "WK_Craft_Widget … Cannot add a control outside of a
  section". Three color settings added in 1.3.0 were outside their settings group; they're now under
  Style › Steps. All 24 widgets checked the way the Elementor editor loads them.

= 1.4.0 =
* 360° ring videos turn at a relaxed pace (Wulf Kit > Settings > "360° videos turn": slow, relaxed,
  a little slower, or as filmed). Works for videos from OM too.
* Demo videos re-made from the original OM films, uncropped, so pieces sit in their frame with
  breathing room instead of looking zoomed in. Hero pieces get a little extra space around them.
* Spotlight shows different rings from the hero (three stone, emerald hidden halo, nature inspired),
  each in white, yellow and rose gold. The favorites row starts with rings the hero doesn't show.
* Ring designer, cleaner: the ring turns on a soft glow that changes with the chosen metal, other
  designs as small circles, lighter option buttons, only the shapes you have, no divider lines,
  "See it in person" button (and it now opens the consultation form from any page).

= 1.3.0 =
* "Home (simpler)" gets its wow moments back, kept clean: a new Spotlight (one ring, large, turning
  in 360°, with live metal buttons), the ring that builds itself in a compact one-screen layout,
  the ring designer and the 4Cs.
* New Spotlight widget.
* "How your ring comes together": new Compact layout. Steps play in turn while the section is on
  screen; visitors can click any step.
* Calmer look: sections ease in gently as they scroll into view (off for visitors who prefer less motion).

= 1.2.0 =
* New "Home (simpler)" template: 8 sections instead of 13 (hero, collection and favorites, ring designer,
  why Wulf with the Google rating, a short story, services, visit, footer), in a calmer style.
  Build it next to Home, compare, and "Go live" with the one you prefer.
* Calmer look: fewer boxes and small labels, gold italics only in the hero, slightly larger text.
  Used by "Home (simpler)", or on every page via Wulf Kit > Settings > Calmer look everywhere.
* Visit widget: "Short form" option (name, mobile, topics, day and time).
* Values widget: optional Google rating line beside the title (live with a Google API key).

= 1.1.1 =
* 4Cs tabs (and every other button) keep their text centered when the theme's button styles are neutralised.

= 1.1.0 =
* Every page of the live site as a template, with a pick-and-choose builder and "Go live".
* Seven new widgets for inner pages: page banner, text & picture, steps, lists, questions (FAQ),
  call to action, text.
* Menu, footer and section links now point to the real pages.
* "Book a visit" buttons open the Free Consultation form when a page has no visit form of its own.
* Photos from the live site bundled for the new pages.

= 1.0.0 =
* First release.
