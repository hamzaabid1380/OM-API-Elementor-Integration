import { launch, PAGE } from './browser.mjs';
import fs from 'fs';
import path from 'path';
const dir = path.dirname(new URL(import.meta.url).pathname);
const shots = JSON.parse(process.argv[2]);
const out = process.argv[3] || dir + '/out';
const w = Number(process.argv[4] || 1280), h = Number(process.argv[5] || 800);
fs.mkdirSync(out, { recursive: true });
const browser = await launch();
const page = await browser.newPage({ viewport: { width: w, height: h } });
const errors = [];
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()); });
page.on('pageerror', e => errors.push(String(e)));
await page.goto('file://' + dir + `/lab.html?w=${w}&h=${h}${process.env.LAB_QS || ''}`);
await page.waitForFunction(() => window.__ready, null, { timeout: 120000 }).catch(() => {});
for (const [name, state, time] of shots) {
  const ms = await page.evaluate(([s, t]) => window.__lab.render(s, t), [state, time || 0]);
  const buf = await page.screenshot({ type: 'png', timeout: 600000 });
  fs.writeFileSync(`${out}/${name}.png`, buf);
  console.log(name, Math.round(ms) + 'ms');
}
if (errors.length) console.log('ERRORS:\n' + errors.slice(0, 20).join('\n'));
await browser.close();
