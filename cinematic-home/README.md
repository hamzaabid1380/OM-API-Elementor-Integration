# Wulf cinematic homepage

A homepage that plays like a short film as you scroll. A diamond turns under
the spotlights of a jewelry case, the first scroll brings it close, a ring
draws itself around it, the stone changes shape, the metal changes colour, the
camera moves in on the hidden details, and then the page hands over to the
usual sections: shapes, reviews and the visit block.

Nothing in the 3D is a video or a downloaded 3D model. The ring, the diamond
and the studio lights are all built in code when the page opens. The diamond
is ray traced: every pixel follows the light through the real facets of a
57-facet brilliant cut, which is where the sparkle and the coloured fire come
from. It is lit the way the catalog photos are (a bright product studio, with
the dark camera in front of the stone), so it reads like the diamonds on the
website rather than like computer graphics.

It comes two ways from the same code:

- **On the website:** the Wulf Elementor Kit's "Home (cinematic)" page (the
  conversion homepage with the film woven through it, in three parts) and its
  "Cinematic film (3D)" widget. `npm run build` writes the widget's script into
  the kit (`wulf-elementor-kit/assets/js/wulf-film.js`). See "On WordPress" below.
- **As a stand-alone page:** open `dist/wulf-cinematic-home.html` in Chrome,
  Safari, Edge or Firefox. It is one self-contained file and only needs the
  internet for the brand fonts.

## What is real and what is a placeholder

| On the page | Status |
| --- | --- |
| Address, hours, phone numbers, Cullen Wulf (GIA-certified jeweler), the 1971 story, "Book a free consultation" | Real, taken from the Wulf Elementor Kit |
| The four "Start with a shape" pictures | Renders of the ring in the film. On the live site this row shows real rings from the catalog |
| Reviews | Placeholders in [brackets] on purpose. On the live site: the real Google reviews |
| Links | `/engagement-rings/`, `/wedding-bands/`, `/about-us/`, `#visit` |

## The chapters

The ring is one of Wulf's: the Round 4-Prong Solitaire (85121) while it builds, the same head on
each shape, and at the end the Oval Hidden Halo Engagement Ring with a diamond band (51162-E).

1. **First light**: the stone face-up, turning slowly under a jewelry case's
   spotlights: fire, star glints, fine motes drifting through a soft beam, a pool
   of light behind it, and every few seconds a strip of light crossing it.
   "Independent since 1971." The first scroll brings it close, face-up, as a light
   sweeps across the crown.
2. **The setting**: one long pull-back: the band is cast under the stone, seen side-on,
   glowing where it forms and cooling to polish; the four claws close over the stone
   one after another (opposite pairs, as a jeweler sets them), each with a glint, and
   the ring turns to a three-quarter view.
3. **The shape**: from above, the stone large: round, emerald (a true step cut), pear,
   oval, each change riding a sweep of light while the claws slide to their places
   (the pear gets a fifth claw at its tip). It stays an oval. (The shank upright on
   computers, across the screen on phones; the pear points away from the words.)
4. **The metal**: a low three-quarter view while the ring turns: each new metal flows
   around the ring from the head down, a seam of light at its edge: white, yellow, rose.
5. **The details**: close on the head while the hidden halo's stones drop into their
   collar, then along the shoulder as the pavé is set from the head down.
6. **Since 1971**: the story, in warm light, the finished ring from above as the catalog
   photographs it, with a caption naming it.

Then: the shapes row, reviews, and the visit section with the ring on a slow turntable.

## Weight and speed

- On WordPress the 3D code is about **245 KB compressed** (three.js, GSAP, the rest is small), loaded only on pages with the film, after the page has shown. Computers on the best quality also fetch an 80 KB add-on for contact shadows.
- A still picture of the first frame shows straight away. The 3D takes over once it is ready: every shader it will need, including the depth of field and the contact shadows that only switch on later, is built during that warm-up, so nothing is compiled mid-film. The page never waits on it.
- Four quality levels (the lightest follows three light paths inside the stones and dims what is left, so the facet pattern holds) and a resolution scale, fitted to each device (`src/fit.js`). The starting level comes from the graphics chip (built-in laptop graphics start light, dedicated graphics on the best); while the still picture shows, a small copy of the heaviest frame (the stone filling the screen, an eighth of the pixels) is timed first, so a weak chip is never handed a full-size frame long enough for Windows to reset its driver, and the film settles on the best rung that draws the full frame in about 26 ms. The scale is fitted to that close-up, so wherever the stone is smaller on screen the WordPress film draws sharper (up to full resolution, a step more while the visitor pauses), dropping back as the stone grows. While it plays, a governor catches slowdowns during scrolling within a second or two (resolution first, then quality). The rung is remembered for the visit. Drawing stops whenever the 3D is covered or the tab is hidden.
- No 3D: when WebGL is missing, the visitor uses Data Saver, the browser draws in software (no graphics chip), even the lightest rung can't keep up, or the graphics driver or browser fails mid-film, the still pictures take over and the words still play. The film never sits frozen.
- Reduce Motion: chapters appear as composed still frames, no camera moves.

## Technical notes

| File | What it does |
| --- | --- |
| `src/cut.js` | A true 57-facet round brilliant (table 56%, crown 34.5°, pavilion 40.8°, depth 61.3%): every facet a flat plane, meeting a round, slightly scalloped girdle; oval and pear use the same facets on their own outline. The emerald is a real step cut (7.5 x 5.5 mm, three steps on the crown, three down to a keel, cut corners). All of them sit on one shared layout of facet rings (a brilliant puts the rings it doesn't need on its own facet edges), so a brilliant flows into the step cut facet by facet. A shape at rest is traced against its own lean set of triangles. |
| `src/diamond.js` | The stones' shader: refraction in, total internal reflection inside (BVH ray tracing with three-mesh-bvh), Fresnel at every exit, and dispersion from diamond's measured refractive index at 7 wavelengths (3 on the lightest quality level), so the fire is the soft, pastel kind seen in photos. The camera and photographer are a dark patch in front of the stone, which draws the crisp grey and black facet pattern of real diamond photos. For sharp close-ups the studio lights are evaluated exactly for every ray (no blurry baked map), the best quality traces 4 rays per pixel, and rays inside the centre stone also see the setting's own prongs and rails. The same shader, instanced, draws every pavé and halo stone. |
| `src/studio.js` | Two studios built from light: a product-photo studio for the stones (bright softboxes, darker horizon, black cards), evaluated light by light in the shader or baked to a cube map on the lightest level, and a bright light tent for the metal, baked once. The stone studio has a "mood" that blends it into a jewelry case (small, bright spotlights, a darker dome) for the opening. Turning the lights is a rotation, so light sweeps are free. |
| `src/atmos.js` | The air in the case: a faint beam of light from above and fine motes drifting through it. Additive, a few hundred points, almost free. |
| `src/ring.js`, `src/tube.js` | The catalog ring: a slim, rounded polished band that draws itself (glowing where it is cast), four claw prongs that meet the band in a V and move with the stone's shape (five on the pear), a slim basket rail, the hidden halo in its collar under the girdle (stones spaced evenly by length), and French pavé along the shoulders: stones as wide as the band, nearly touching, held by shared beads. Every metal part shares one shader addition: the light sweep, the metal that flows from the head down when it changes, and the casting glow. Softer 14k golds matched to the catalog photos. |
| `src/glints.js` | Star glints where a facet really catches one of the case's spotlights (they flash in step with the turning stone), used in the opening and faded for the product-photo shots; flashes as each claw closes and each small stone lands; and the soft glow on the band's ends while it draws itself. |
| `src/fit.js` | Fitting the film to the device: the ladder of rungs (quality level and resolution scale), the warm-up measurement that picks a rung, the governor that steps down while playing, and the visit's memory of both. |
| `src/engine.js` | Renderer, the light sweep (a tall strip of light crossing behind the camera, so its reflection runs across the stones and along the metal; its position is part of the story's state), lens shift (subject off-centre without bending perspective), framing for every screen shape (tall screens widen the lens; squarer landscape screens such as 4:3 laptops pull back a little and move the subject further from the words), quality tiers, post-processing: contact shadows (N8AO, best quality), bloom, tone mapping, vignette, grain, macro depth of field. Shaders compile in the background before the first frame. |
| `src/story.js` | The story on one clock (0 to 18): what the camera, the ring and the light do in each chapter, when the words come and go, and how the quality level is picked. Shared by both versions. |
| `src/film.js` | The stand-alone director: one GSAP timeline holds camera, ring, light and words, and scrolling scrubs it (ScrollTrigger, SplitText, Lenis). |
| `src/wp.js` | The WordPress director: up to three acts between other sections, each scrubbing its part of the story. One canvas moves into the act on screen; nothing draws while none is. Each act's stage stays on screen with CSS sticky; wrappers that hide their overflow (which silently turns sticky off) are switched to `overflow: clip`, and if a stage still drifts the director pins it by hand. |
| `src/ao.js`, `src/ao-lib.js` | The contact-shadow add-on for WordPress (`wulf-film-ao.js`), which borrows three.js and postprocessing from the main script instead of carrying its own. |
| `src/page.html` | The page itself: real HTML text (readable by Google and screen readers), brand tokens from the kit. |
| `build.mjs` | Bundles everything into `dist/wulf-cinematic-home.html`, with the poster and card pictures inline, and builds the kit's `wulf-film.js` and `wulf-film-ao.js`. |

Libraries: three 0.183.2, postprocessing 6.39.5, three-mesh-bvh 0.9.16,
n8ao 2.0.1, gsap 3.15.0 (all plugins free for commercial use), lenis 1.3.26
(stand-alone page only).

### Commands

```
npm ci
npm run build          # dist/wulf-cinematic-home.html and the kit's wulf-film.js
npm run pictures       # re-render the poster and the four card pictures, then build
WP_URL=http://localhost:8089/home-cinematic/ node tools/wp-posters.mjs   # the kit's six act pictures
node tools/page.mjs 1440 900 out/desktop '[0, 2.6, 6.3, 10.2, 13.3, 16.8, "#collection", "#visit"]' '&tier=high'
node tools/live.mjs out/live normal      # real wheel scrolling (also: reduced, no3d)
node tools/axe.mjs path/to/axe.min.js    # accessibility check
FFMPEG=/path/to/ffmpeg node tools/video.mjs out/walkthrough.mp4 1280 720 30
```

The tools drive headless Chromium (Playwright). `CHROMIUM_PATH` picks the
browser and `PLAYWRIGHT_MODULE` points at a global Playwright when the project
has none. In sandboxes whose browser cannot reach Google Fonts, put a local
copy in `fontcache/` (see `tools/fonts.mjs`).

### Page switches

- `?tier=high|medium|low` starts at that quality level without measuring (checks); the governor may still step down but never turns the 3D off.
- `?fit` measures the device even with a pinned level or software graphics; `?fit=ms` sets the bar for the heaviest frame (checks).
- `?filmcheck` shows a small box: the kit version, the graphics chip, whether the stage stays on screen by itself, the quality level and resolution, frames a second, or why the 3D is off.
- `?pinjs` pins the stages by hand even where CSS sticky works (checks).
- `?no3d` shows the still-picture version.
- `?capture` turns off smooth scrolling and exposes `window.__film` for exact frames (stills, video).

## On WordPress

- **"Home (cinematic)"** in Wulf Kit > Pages & templates: the conversion
  homepage with the film in three parts, and shorter. The opening is the first
  screen (headline, "Book a free consultation", "Design your ring", the call line
  and trust points), then the booking bar resting on its last frame and "What
  brings you in?"; shapes and metals come before the favorites; the details and
  the 1971 story come before "Why Wulf". The ring style quiz and "How a visit
  works" are left out: the film's shapes and metals do the quiz's job, and the
  booking bar and form already say how a visit works.
- **"Wulf · Cinematic film (3D)"** widget: pick the part, edit its words,
  buttons and links. Camera moves and timing live in code. Each part shows a
  still picture of its first frame (`assets/media/film-*.webp`, rendered with
  `tools/wp-posters.mjs`) until the 3D is ready, and keeps it where 3D cannot run.
- The script is bundled in the plugin (no CDN), deferred, and loaded only on
  pages with the widget. In the Elementor editor the parts show as a still,
  readable stack.
- The site header turns the film's black over the film, and the desktop booking
  button and phone action bar appear once the opening words have scrolled away.
- Speed plugins: exclude the film script from "delay JavaScript" features
  (WP Rocket, LiteSpeed, Perfmatters) and from Cloudflare Rocket Loader, or the
  film waits for the first tap.
- Launch it next to the current homepage first and compare the two in Insights.
