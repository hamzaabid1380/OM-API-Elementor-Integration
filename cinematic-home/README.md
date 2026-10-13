# Wulf cinematic homepage

A homepage that plays like a short film as you scroll. A diamond lights up on
black, a ring draws itself around it, the stone changes shape, the metal
changes colour, the camera dives in for the hidden details, and then the page
hands over to the usual sections: shapes, reviews and the visit block.

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

1. **First light**: the stone alone. "Independent since 1971."
2. **The setting**: the band draws itself up to the stone, the prongs close over it.
3. **The shape**: straight down onto the table: round, oval, cushion, pear.
4. **The metal**: white, yellow, rose, each change riding a sweep of light.
5. **The details**: a macro dive under the stone (hidden halo), then along the pavé.
6. **Since 1971**: the story, in warm light.

Then: the shapes row, reviews, and the visit section with the ring on a slow turntable.

## Weight and speed

- On WordPress the 3D code is about **235 KB compressed** (three.js, GSAP, the rest is small), loaded only on pages with the film, after the page has shown. Computers on the best quality also fetch an 80 KB add-on for contact shadows.
- A still picture of the first frame shows straight away. The 3D takes over once it is ready (its shaders compile in the background), so the page never waits on it.
- Three quality levels (picked from the device, then stepped down automatically if frames run slow). Drawing stops whenever the 3D is covered or the tab is hidden.
- No 3D: when WebGL is missing or the visitor uses Data Saver, the still picture stays and the words still play.
- Reduce Motion: chapters appear as composed still frames, no camera moves.

## Technical notes

| File | What it does |
| --- | --- |
| `src/cut.js` | A true 57-facet round brilliant (table 56%, crown 34.5°, pavilion 40.8°, depth 61.3%): every facet a flat plane, meeting a round, slightly scalloped girdle. Fancy shapes reuse the same facets on their own outline, so one shape morphs into the next facet by facet. |
| `src/diamond.js` | The stones' shader: refraction in, total internal reflection inside (BVH ray tracing with three-mesh-bvh), Fresnel at every exit, and dispersion from diamond's measured refractive index at 7 wavelengths (3 on the lightest quality level), so the fire is the soft, pastel kind seen in photos. The camera and photographer are a dark patch in front of the stone, which draws the crisp grey and black facet pattern of real diamond photos. For sharp close-ups the studio lights are evaluated exactly for every ray (no blurry baked map), the best quality traces 4 rays per pixel, and rays inside the centre stone also see the setting's own prongs and rails. The same shader, instanced, draws every pavé and halo stone. |
| `src/studio.js` | Two studios built from light: a product-photo studio for the stones (bright softboxes, darker horizon, black cards), evaluated light by light in the shader or baked to a cube map on the lightest level, and a bright light tent for the metal, baked once. Turning the lights is a rotation, so light sweeps are free. |
| `src/ring.js`, `src/tube.js` | The band (a swept squircle that draws itself), six prongs that follow the stone's outline, the basket rail, the hidden halo, and pavé set the real way: stones across most of the band, nearly touching, held by shared beads. |
| `src/glints.js` | The soft glow on the band's ends while it draws itself. (Star glints are available but off: real product photos do not have them.) |
| `src/engine.js` | Renderer, lens shift (subject off-centre without bending perspective), quality tiers, post-processing: contact shadows (N8AO, best quality), bloom, tone mapping, vignette, grain, macro depth of field. Shaders compile in the background before the first frame. |
| `src/story.js` | The story on one clock (0 to 18): what the camera, the ring and the light do in each chapter, when the words come and go, and how the quality level is picked. Shared by both versions. |
| `src/film.js` | The stand-alone director: one GSAP timeline holds camera, ring, light and words, and scrolling scrubs it (ScrollTrigger, SplitText, Lenis). |
| `src/wp.js` | The WordPress director: up to three acts between other sections, each scrubbing its part of the story. One canvas moves into the act on screen; nothing draws while none is. |
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

- `?tier=high|medium|low` forces a quality level.
- `?no3d` shows the still-picture version.
- `?capture` turns off smooth scrolling and exposes `window.__film` for exact frames (stills, video).

## On WordPress

- **"Home (cinematic)"** in Wulf Kit > Pages & templates: the conversion
  homepage with the film in three parts. The opening is the first screen
  (headline, "Book a free consultation", "Design your ring"), then the booking
  bar and "What brings you in?"; shapes and metals come before the ring style
  quiz; the details and the 1971 story come before "Why Wulf".
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
