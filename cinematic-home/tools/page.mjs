// Stills of the real page in capture mode: film moments plus the sections after it.
import { launch, PAGE } from './browser.mjs';
import fs from 'fs';
import path from 'path';
import { routeFonts } from './fonts.mjs';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [w, h, outDir, timesArg, extra] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4], process.argv[5], process.argv[6] || ''];
fs.mkdirSync(outDir, { recursive: true });
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 600 ? 2 : 1, isMobile: w < 600, hasTouch: w < 600 });
await routeFonts(ctx, root + '/fontcache');
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (['error', 'warning'].includes(m.type())) errors.push(m.text()); });
page.on('pageerror', e => errors.push('PAGEERROR ' + String(e)));
await page.goto('file://' + root + '/' + PAGE + '?capture' + extra);
await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 120000 });
await page.waitForTimeout(400);
const times = JSON.parse(timesArg);
for (const t of times) {
  const name = typeof t === 'number' ? 'f' + String(t).replace('.', '_') : t;
  if (typeof t === 'number') {
    await page.evaluate(([t]) => window.__film.filmTime(t, 1.0 + t * 0.3), [t]);
  } else {
    await page.evaluate(([sel]) => { const y = window.__film.top(sel); return window.__film.frame(y, 2.0); }, [t]);
  }
  if (typeof t !== 'number') {
    // Let lazy pictures decode and the header finish its colour change.
    await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(600);
  } else {
    await page.waitForTimeout(80);
  }
  fs.writeFileSync(`${outDir}/${name.replace(/[#.]/g, '')}.png`, await page.screenshot({ type: 'png', timeout: 600000 }));
  console.log(name);
}
console.log('tier', await page.evaluate(() => window.__film.tier()));
if (errors.length) console.log('ERRORS:\n' + [...new Set(errors)].slice(0, 20).join('\n'));
await browser.close();
