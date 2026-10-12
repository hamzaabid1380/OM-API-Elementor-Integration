// The page as a visitor gets it: intro, wheel scrolling through Lenis, plus the
// reduced-motion and no-3D variants. Prints errors and what each state shows.
import { launch, PAGE } from './browser.mjs';
import fs from 'fs';
import path from 'path';
import { routeFonts } from './fonts.mjs';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = process.argv[2];
const variant = process.argv[3] || 'normal';
fs.mkdirSync(out, { recursive: true });
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: variant === 'reduced' ? 'reduce' : 'no-preference' });
await routeFonts(ctx, root + '/fontcache');
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (['error', 'warning'].includes(m.type())) errors.push(m.text()); });
page.on('pageerror', e => errors.push('PAGEERROR ' + String(e)));
await page.goto('file://' + root + '/' + PAGE + '' + (variant === 'no3d' ? '?no3d' : '?tier=low'));
await page.waitForTimeout(4500);
const info = async (label) => {
  const s = await page.evaluate(() => ({
    y: Math.round(scrollY),
    poster: getComputedStyle(document.getElementById('poster')).opacity,
    no3d: document.documentElement.classList.contains('no-3d'),
    c1: getComputedStyle(document.querySelector('.c1')).opacity,
    visible: [...document.querySelectorAll('.chap')].filter(c => +getComputedStyle(c).opacity > 0.5).map(c => c.dataset.chap).join(','),
    rail: (document.querySelector('.rail li.on') || {}).dataset?.k,
    bar: document.querySelector('.bar').style.transform,
    hd: document.getElementById('hd').className,
  }));
  console.log(label.padEnd(10), JSON.stringify(s));
  fs.writeFileSync(`${out}/${label}.png`, await page.screenshot());
};
await info('start');
await page.mouse.move(640, 400);
for (const [label, steps] of [['s1', 6], ['s2', 10], ['s3', 14], ['s4', 14], ['s5', 30]]) {
  for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, 240); await page.waitForTimeout(90); }
  await page.waitForTimeout(1500);
  await info(label);
}
// Anchor: the header button should glide to the visit section.
await page.click('#hd .btn');
await page.waitForTimeout(3000);
await info('anchor');
if (errors.length) console.log('ERRORS:\n' + [...new Set(errors)].slice(0, 15).join('\n'));
await browser.close();
