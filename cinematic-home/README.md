# Wulf cinematic homepage (prototype)

A homepage that plays like a short film as you scroll. A diamond lights up on
black, a ring draws itself around it, the stone changes shape, the metal
changes colour, the camera dives in for the hidden details, and then the page
hands over to the usual sections: shapes, reviews and the visit block.

Nothing in the 3D is a video or a downloaded 3D model. The ring, the diamond
and the studio lights are all built in code when the page opens. The diamond
is ray traced: every pixel follows the light through the real facets of a
57-facet brilliant cut, which is where the sparkle and the coloured fire come
from.

**To look at it:** open `dist/wulf-cinematic-home.html` in Chrome, Safari,
Edge or Firefox. It is one self-contained file. It only needs the internet
for the brand fonts.

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

- The 3D code is about **200 KB compressed** (three.js, GSAP, the rest is small). About the size of one or two product photos.
- A still picture of the first frame shows straight away. The 3D takes over once it is ready, so the page never waits on it.
- Three quality levels (picked from the device, then stepped down automatically if frames run slow). Drawing stops whenever the 3D is covered or the tab is hidden.
- No 3D: when WebGL is missing or the visitor uses Data Saver, the still picture stays and the words still play.
- Reduce Motion: chapters appear as composed still frames, no camera moves.

## Technical notes

| File | What it does |
| --- | --- |
| `src/cut.js` | The brilliant cut from real proportions (table 56%, crown 34.5°, pavilion 40.8°). Fancy shapes reuse the same facets on their own outline, so one shape morphs into the next facet by facet. |
| `src/diamond.js` | The stone's shader: refraction in, total internal reflection inside (BVH ray tracing with three-mesh-bvh), Fresnel at every exit, red/green/blue bending by different amounts (fire). |
| `src/studio.js` | Two photo studios built from light and baked to cube maps once: a dark one with hard lights for the stone, a bright light tent with black cards for the metal. Turning the lights is a rotation, so light sweeps are free. |
| `src/ring.js`, `src/tube.js`, `src/stones.js` | The band (a swept squircle that draws itself), six prongs that follow the stone's outline, the basket rail, the hidden halo and graduated pavé with beads. |
| `src/glints.js` | Star glints only where a facet really mirrors one of the studio lights. |
| `src/engine.js` | Renderer, lens shift (subject off-centre without bending perspective), quality tiers, post-processing: bloom, tone mapping, vignette, grain, macro depth of field. |
| `src/film.js` | The director: one GSAP timeline holds camera, ring, light and words, and scrolling scrubs it (ScrollTrigger, SplitText, Lenis). |
| `src/page.html` | The page itself: real HTML text (readable by Google and screen readers), brand tokens from the kit. |
| `build.mjs` | Bundles everything into `dist/wulf-cinematic-home.html`, with the poster and card pictures inline. |

Libraries: three 0.183.2, postprocessing 6.39.5, three-mesh-bvh 0.9.16,
gsap 3.15.0 (all plugins free for commercial use), lenis 1.3.26.

### Commands

```
npm ci
npm run build          # dist/wulf-cinematic-home.html
npm run pictures       # re-render the poster and the four card pictures, then build
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

## Going live on WordPress (plan)

- Becomes a **"Home (cinematic)"** page in the Wulf Elementor Kit, with the
  script bundled in the plugin (no CDN) and loaded only on that page.
- Words, links and buttons editable in Elementor. Camera moves and timing live in code.
- Speed plugins: exclude the film script from "delay JavaScript" features
  (WP Rocket, LiteSpeed, Perfmatters) and from Cloudflare Rocket Loader, or the
  film waits for the first tap.
- Launch it next to the current homepage first and compare the two in Insights.
