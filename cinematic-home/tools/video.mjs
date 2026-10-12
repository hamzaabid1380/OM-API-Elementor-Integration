// Walkthrough video: the page exactly as a visitor sees it, frame by frame
// (capture mode), streamed straight into ffmpeg as JPEGs.
import { launch, PAGE } from './browser.mjs';
import { spawn } from 'child_process';
import path from 'path';
import { routeFonts } from './fonts.mjs';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [out, W, H, FPS, limit] = [process.argv[2], Number(process.argv[3] || 1280), Number(process.argv[4] || 720), Number(process.argv[5] || 30), Number(process.argv[6] || 0)];
const FF = process.env.FFMPEG;

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// Film chapters on the film clock, and how many seconds of video each one gets.
const CH = [0, 1.4, 4.6, 8.6, 11.8, 15, 18];
const DUR = [2.4, 5.4, 6.4, 5.2, 5.4, 3.8];

const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await routeFonts(ctx, root + '/fontcache');
const page = await ctx.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR', String(e)));
await page.goto('file://' + root + '/' + PAGE + '?capture&tier=high');
await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 120000 });
await page.evaluate(() => document.fonts.ready);
const Y = await page.evaluate(() => ({ col: window.__film.top('#collection'), rev: window.__film.top('#reviews'), visit: window.__film.top('#visit'), max: window.__film.height() }));

// The shot list: [seconds, (t) => what to show at local time t].
const shots = [];
const add = (sec, fn) => shots.push([sec, fn]);
add(3.8, (t) => ({ y: 0, intro: t }));
add(1.2, () => ({ y: 0, intro: 99 }));
for (let c = 0; c < 6; c++) {
  add(DUR[c], (t, d) => ({ film: CH[c] + (CH[c + 1] - CH[c]) * (t / d) }));
}
let filmEnd = null;
add(1.3, (t, d) => ({ y: [filmEnd, Y.col, ease(t / d)] }));
add(2.8, () => ({ y: Y.col }));
add(1.1, (t, d) => ({ y: [Y.col, Y.rev, ease(t / d)] }));
add(1.6, () => ({ y: Y.rev }));
add(1.4, (t, d) => ({ y: [Y.rev, Math.min(Y.visit, Y.max), ease(t / d)] }));
add(4.2, () => ({ y: Math.min(Y.visit, Y.max) }));

const total = shots.reduce((a, s) => a + s[0], 0);
const frames = limit || Math.round(total * FPS);
console.log(`video ${total.toFixed(1)}s, ${frames} frames at ${W}x${H}`);
const ff = spawn(FF, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', '-tune', 'film', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
const write = (buf) => new Promise((r) => (ff.stdin.write(buf) ? r() : ff.stdin.once('drain', r)));
const t0 = Date.now();
for (let i = 0; i < frames; i++) {
  const time = i / FPS;
  let acc = 0;
  let k = 0;
  while (k < shots.length - 1 && time >= acc + shots[k][0]) { acc += shots[k][0]; k++; }
  const local = Math.min(shots[k][0], time - acc);
  const s = shots[k][1](local, shots[k][0]);
  if (s.film !== undefined) {
    const r = await page.evaluate(([f, tm]) => { const o = window.__film.filmTime(f, tm); return scrollY; }, [s.film, time]);
    filmEnd = r;
  } else {
    let y = s.y;
    if (Array.isArray(y)) y = y[0] + (y[1] - y[0]) * y[2];
    await page.evaluate(([y, tm, intro]) => { if (intro !== undefined) window.__film.introAt(intro); window.__film.frame(y, tm); }, [y, time, s.intro]);
  }
  await write(await page.screenshot({ type: 'jpeg', quality: 93 }));
  if (i % 30 === 0) {
    const el = (Date.now() - t0) / 1000;
    console.log(`frame ${i}/${frames} · ${el.toFixed(0)}s elapsed · ~${((el / (i + 1)) * (frames - i - 1) / 60).toFixed(1)} min left`);
  }
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await browser.close();
console.log('done', out);
