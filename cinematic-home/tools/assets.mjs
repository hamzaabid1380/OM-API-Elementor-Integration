// Render the pictures the page carries inline: the poster (first frame, shown
// before the 3D starts and when it cannot run) and the four catalogue cards.
import { launch, PAGE } from './browser.mjs';
import fs from 'fs';
import path from 'path';
import { routeFonts } from './fonts.mjs';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = root + '/assets';
fs.mkdirSync(out, { recursive: true });
const browser = await launch();
const save = (name, dataUrl) => { fs.writeFileSync(`${out}/${name}`, Buffer.from(dataUrl.split(',')[1], 'base64')); console.log(name, Math.round(fs.statSync(`${out}/${name}`).size / 1024) + ' KB'); };
async function open(w, h, dpr) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  await routeFonts(ctx, root + '/fontcache');
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR', String(e)));
  await page.goto('file://' + root + '/' + PAGE + '?capture&tier=high');
  await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 120000 });
  return page;
}
const what = process.argv[2] || 'all';
if (what === 'all' || what === 'cards') {
  const page = await open(1440, 900, 1);
  const cards = await page.evaluate(() => window.__film.cards([
    { morph: 0, metal: 0, az: 1.0, env: 0.0 },
    { morph: 1, metal: 1, az: 1.05, env: 0.35 },
    { morph: 2, metal: 2, az: 0.95, env: -0.3 },
    { morph: 3, metal: 0, az: 1.1, env: 0.6 },
  ].map(c => Object.assign({ dist: 6.5, ty: 0.98, el: 0.78 }, c)), 800, 1000));
  cards.forEach((d, i) => save(`card-${i}.webp`, d));
}
if (what === 'all' || what === 'poster') {
  for (const [name, w, h, dpr] of [['poster-wide.webp', 1440, 900, 1], ['poster-tall.webp', 390, 844, 2]]) {
    const page = await open(w, h, dpr);
    const url = await page.evaluate(() => { window.__film.frame(0, 1.0); return document.getElementById('film-canvas').toDataURL('image/webp', 0.82); });
    save(name, url);
  }
}
await browser.close();
