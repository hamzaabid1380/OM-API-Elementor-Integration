import { launch, PAGE } from './browser.mjs';
import fs from 'fs';
import path from 'path';
import { routeFonts } from './fonts.mjs';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const axe = fs.readFileSync(process.argv[2], 'utf8');
const browser = await launch();
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  await routeFonts(ctx, root + '/fontcache');
  const page = await ctx.newPage();
  await page.goto('file://' + root + '/' + PAGE + '?capture&tier=low');
  await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 120000 });
  await page.addScriptTag({ content: axe });
  for (const where of [0, 'film:9.9', '#collection', '#reviews', '#visit']) {
    await page.evaluate((wh) => {
      if (wh === 0) return window.__film.frame(0, 1);
      if (String(wh).startsWith('film:')) return window.__film.filmTime(Number(wh.slice(5)), 1);
      return window.__film.frame(window.__film.top(wh), 1);
    }, where);
    await page.waitForTimeout(300);
    const r = await page.evaluate(async () => {
      const res = await window.axe.run(document, { resultTypes: ['violations'] });
      return res.violations.map(v => `${v.id} (${v.impact}): ${v.nodes.length} × ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}${v.nodes[0] && v.nodes[0].any[0] ? ' :: ' + v.nodes[0].any[0].message.slice(0, 140) : ''}`);
    });
    console.log(`${w}px @ ${where}:`, r.length ? '\n  ' + r.join('\n  ') : 'no violations');
  }
  await ctx.close();
}
await browser.close();
