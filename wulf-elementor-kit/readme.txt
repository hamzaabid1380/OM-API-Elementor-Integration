=== Wulf Elementor Kit ===
Requires at least: 6.2
Requires PHP: 7.4
Requires Plugins: elementor
Stable tag: 1.9.2

The Wulf Diamond Jewelers website as Elementor widgets: every section, the site header and footer,
and every page of wulfdiamondjewelers.com as a ready-made template you can pick and build.

== What you get ==

27 widgets under "Wulf Diamond Jewelers" in the Elementor panel:

* Announcement bar (live "Open now / Closed now" from your hours)
* Header (logo, menu with drop-down panels, search, phone, tray, "Book a free consultation", phone menu)
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
* Visit (photo, map, hours, contact and a booking form)
* Footer (newsletter, links, hours, legal line)
* Page banner (breadcrumb, headline, buttons, picture) for inner pages
* Text & picture (with a tick list and buttons)
* Steps ("How it works")
* Lists (e.g. services, brands we repair, coins we buy)
* Questions (open/close answers, with FAQ markup for Google)
* Call to action band or card
* Text (long text: headings, lists, quotes)
* Spotlight (one ring, large, in 360°, with live metal buttons and a choice of rings; four layouts,
  three frames and a video background you can change)
* What brings you in? (six choices with real product photos on white; each opens a page, the ring
  designer, or the booking panel with its topic chosen)
* Booking bar (what it's about + preferred day, then the booking panel opens at name and number)
* Ring style quiz (four picture questions: diamond shape, setting, metal and budget; then three
  matching rings, the top one turning in the chosen gold, with "Book to try these on" and
  "Email me my matches")

29 page templates: one for every page on the live site, plus "Home (simpler)" and "Home (conversion)", with the
wording from that page and the same web address:

* Main: Home, Home (simpler), Home (conversion), About, Free Consultation, Blog, Thank You, Page not found
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

== Booking panel and conversions ==

Every "Book" button on the site (header, hero, phone bar, tray, Spotlight, ring designer, any button
linked to #visit) opens one short booking panel instead of jumping to a form: what it's about, a day
and time of day, then name and mobile. It shows the piece the visitor was looking at (the Spotlight
ring in its metal, the ring designer's design, the pieces on their tray), and the request email says
which piece and which button it came from. The thank-you screen offers "Add to my calendar" and
directions. Set the title, topics (with what to bring) and thank-you message in Wulf Kit > Settings >
Booking & conversions; untick "Booking panel" to go back to jumping to the visit form.

Links can open it too: add ?book=1 (and &topic=Repair) to any page address, e.g. in an ad or email.

On computers a slim booking bar stays at the bottom of the screen after the first screen (open now,
"Book a free consultation", the phone number). It steps aside near the booking form and the footer,
and a visitor can close it. Turn it off in Settings > "Booking button on computers".

== Ring style quiz ==

Four picture questions (diamond shape, setting, metal, budget), then three rings from the catalog
that match, the top one turning in the chosen gold. Every answer has a "Not sure yet". Matching uses
the shape, the setting and the metal; the budget is passed on with the booking or the email and never
hides a ring (setting prices alone would mislead). When a ring is shown with a different diamond shape
or metal than chosen, a short line says so.

"Book to try these on" opens the booking popup with the three rings (they also go on the visitor's
tray) and the answers in the request email. "Email me my matches" sends the visitor their three rings
with photos, prices, catalog links and a booking button, sends you a copy, and passes the lead to the
CRM when that is on. The email only ever contains the quiz as saved on the page, and one address gets
it at most three times a day.

Edit the questions, shapes, setting styles (photo, short line, drawing), budget choices and the rings
to match in the widget. Rings earlier in the list win a tie, so put favorites first.

"Measure clicks and bookings" sends cta_click, click_to_call, get_directions, booking_open,
booking_step, booking_request, generate_lead, quiz_start, quiz_step, quiz_complete and
quiz_email_open to the Google Analytics, Tag Manager or Meta pixel
already on the site (nothing is added). Mark generate_lead as a key event in GA4 to count bookings as
conversions. Add ?wk_debug_events=1 to a page address to watch them in the browser console.

== Drop a hint ==

With the OM Catalog plugin 1.39.0 or later, the Spotlight (beside its buttons) and the ring style quiz
results (beside "Start over") show a small "Drop a hint" link. It opens the OM Catalog's hint form with
the ring on screen in the gold showing (the quiz sends its three matches), so a visitor can email it to
a partner with a note and their ring size. The partner's private page has "Book a viewing", which opens
this kit's booking popup with the ring filled in and "From a hint" in the request email.

Each widget has a "Drop a hint" link switch (Spotlight: Rings; quiz: Results). The link text, and
turning the feature off everywhere, are in Settings > OM Catalog > Look & feel > Drop a hint.

== Visit requests and newsletter ==

The "Book a visit" form and the footer sign-up email you (Wulf Kit > Settings > "Visit requests
go to"; empty uses the site admin email). If the OM Catalog plugin is active and "Send to your CRM"
is ticked, they are also passed to its lead sending (GoHighLevel / webhook).

== Changelog ==

= 1.9.2 =
* Ring photos and 360° videos sit on plain white everywhere: no metal-coloured glow behind the ring
  in the ring designer and the quiz results, a white circle behind the ring in the call-to-action
  showcase and the phone hero, and white "What brings you in?" cards (no tint on hover).
* "What brings you in?": the Wedding bands card shows a real diamond band photo. A card set to an OM
  product line uses a built-in photo for engagement rings, wedding bands, earrings, necklaces and
  pendants, and reads the catalog's photos correctly for the other lines.
* The large card's 360° video, the call-to-action ring and the phone hero ring now turn at the same
  relaxed pace as the others (Settings > "360° videos turn").
* Booking bar: sits just under the section above it, with one normal gap before the next section
  (it had double spacing on calm pages).
* The OM Catalog plugin (product pages, its pop-ups and the "Drop a hint" page) uses this kit's ink
  and fonts when the site's Elementor kit still has Elementor's starting blue and Roboto (needs OM
  Catalog 1.39.1 or later).

= 1.9.1 =
* "Drop a hint" link on the Spotlight and on the ring style quiz results (needs OM Catalog 1.39.0 or
  later): visitors email the ring on screen, or their three matches, to someone special. Each widget
  has a switch for it.
* Booking popup: a booking that starts from a hint page says "From a hint" in the request email.

= 1.9.0 =
* Ring style quiz (new widget, on "Home (conversion)" after "What brings you in?"): four picture
  questions (diamond shape, setting, metal, budget), a drawing of the ring that changes with each
  answer, then three matching rings from the catalog with the top one turning in the chosen gold.
  It ends with "Book to try these on" (the booking popup, with the rings and answers) or "Email me my
  matches" (to the visitor, with a copy to you and the CRM). Answers stay while the visitor browses.
* The same button words everywhere: "Book a free consultation" in the header, the phone bar, the
  buttons and the page library. A phone bar still saying "Book a visit" is updated once, automatically.
* Computers: a slim booking bar appears after the first screen and stays until the booking form or
  footer comes into view. Settings > "Booking button on computers".
* Phones, first screen: a shorter intro and a small turning ring beside the headline, so the title
  and both buttons fit on the first screen.
* Phones, shorter homepage (about a sixth shorter, quiz included): the 360° spotlight and the
  favorites are now one section (tap a ring card to see it turn; the heart saves it), the ring
  designer folds into a short card that opens in place, "How a visit works" drops its photos, and
  the visit section shows today's hours with "See all hours".
* Videos wait until their section comes near (spotlight, ring designer, "How your ring comes
  together"), so a phone's first screen loads one small video instead of three.
* "Ask our jeweller" (OM Catalog 1.38.0 or later) on the homepage, with a starter question after a
  few seconds. Settings > "Jeweller assistant on the homepage". It steps aside while the booking popup
  or the tray is open, and moves up above the phone bar and the booking bar.
* Phone bar: round Call and Directions icons either side of the full "Book a free consultation".
* Header: room for the longer button beside six menu items at every computer width.

= 1.8.1 =
* Page library: no photo appears twice on the same page. About uses a couple's hands for "We build
  relationships", the Custom design banner shows a finished ring and its last step a jeweler at work,
  and the Free Consultation banner shows Cullen in the showroom.

= 1.8.0 =
* Booking popup: "Book" buttons now open a popup in the middle of the screen instead of a panel
  sliding in from the side. On wide screens a showroom photo sits beside the form with the address,
  today's hours and three short promises; on phones it is a card near the bottom, where the thumb is.
  The booking bar's Continue opens it straight on the details form, with the chosen topic and day
  shown on top and a "Change" link. Topics are tiles with small pictures; name and mobile sit side by
  side. Settings › Booking: choose popup or side panel, the photo and the promises.
* "What brings you in?" Showcase look (new default): engagement rings shown large with a 360° view,
  the other choices around it, the last one across the full width, numbered cards, a soft gold light
  that follows the mouse over the photos, and a clear button on every card. "Not sure yet? Talk to
  a jeweler" moves beside the title.
* Values Showcase look (new default): a photo with an "Independent since 1971" badge beside the four
  promises, numbered, with "Book a free consultation" and "Our story".
* Steps Showcase look (new default): a gold line that draws itself through numbered dots, optional
  photos for each step, and the button with "Or call" and today's hours under it. Vertical on phones.
* Favorites Showcase look (new default): a large title, "See all" and "Book to try them on" beside the
  turning pieces.
* Questions: a "Still have a question?" card beside the answers with a photo, a booking button, the
  phone number and today's hours (after the questions on phones).
* Call to action Showcase layout (new default): the piece sits in a pool of light with a thin gold
  ring and a spark circling it; it can play a 360° video. The page library picks a fitting piece for
  each page (rings, a necklace, earrings, a halo ring).
* Page library: the custom-design steps and "How a visit works" now have photos; "Home (conversion)"
  uses every showcase look. Every older look is still one click away in each widget's Look setting.
* Readability: on mid-tone light backgrounds (for example a gold section) small gold text turns dark
  so it stays readable (WCAG AA).
* Fixed a thin green line along the top of the yellow halo ring photo.

= 1.7.0 =
* "What brings you in?" cards now show real product photos on white (the same look as the rest of
  the site). Each card can also take an Overnight Mountings style number, or show the first design of
  an OM product line (Wedding bands does this by default, live from the OM Catalog plugin).
* New Booking bar under the hero of "Home (conversion)": "I'd like to talk about" and "Preferred day",
  then Continue opens the booking panel straight at the last step (name and number).
* Hero: your live Google rating leads the trust line once Google is connected in Settings (it never
  shows placeholder numbers).
* "Home (conversion)": "See all engagement rings" beside the favorites, and "Before you visit"
  questions (appointment, free consultation, pieces bought elsewhere, selling) before the booking section.
* Style numbers on product cards are darker, to meet the WCAG AA contrast standard.

= 1.6.0 =
* New "Home (conversion)" template, built to turn visitors into booked visits: one clear promise with
  "Book a free consultation" and "Design your ring", a reassurance line, "What brings you in?" choices,
  the 360° Spotlight and favorites, why Wulf with the Google rating, "How a visit works" in three steps,
  the ring designer with a gold "Book to see it in person", and booking. On phones the words and
  buttons come first, so the main button is on the first screen.
* Booking panel: every "Book" button opens a three-step panel (what for, when, how to reach you) with a
  progress line, the piece the visitor was looking at, and a thank-you screen with "Add to my calendar"
  and directions. Works on every page; requests go to the same email and CRM hand-off as before.
* New widget "What brings you in?": six photo choices (engagement rings, wedding bands, custom design,
  repairs, appraisals, selling), each leading to its own next step, plus "Not sure yet? Talk to a jeweler".
* Measuring: button clicks, calls, directions, booking steps and booking requests are sent to the
  Google Analytics, Tag Manager or Meta pixel already on the site.
* Hero: optional reassurance line under the buttons, and "words first on phones".
* Ring designer: the booking button can be the main (gold) button.

= 1.5.0 =
* Text stays readable on any section background. Pick any color or gradient in Style › Section and the
  words switch to dark or light on their own; white cards inside a dark section keep dark text. To
  choose yourself, use Content › Text colors (Automatic, Dark text, Light text). Sections built dark
  (4Cs, call to action) get dark text and dark buttons when placed on a light color.
* Spotlight: four layouts (centered; side by side with the words left or right; wide, edge to edge),
  three frames (rounded card, circle, no frame) and a video background you can change: white as
  filmed, blended into the section color, or a color you choose. Glow can be turned off.
* Header: with six menu items the written phone number gave way to the phone icon, so "About" no
  longer runs into the number on wide screens.

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
