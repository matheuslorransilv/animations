#!/usr/bin/env node
// Render a film: an HTML page whose window.seek(t) paints frame t (see CLAUDE.md).
//
//   node render.mjs films/intro                full render -> out/intro.mp4
//   node render.mjs films/intro --sheet        one frame per beat -> out/intro-sheet-01.png ...
//   node render.mjs films/intro --check        render-contract check only
//
// Options: --audio score.wav  --beats beats.json  --at 0,1.5,3  --out path
//          --fps 30  --width 1920  --height 1080  --duration 12  --crf 16  --skip-check
// The page may declare window.film = { duration, fps, width, height }; flags override it.
// A beats.json next to the film is picked up automatically for --sheet.

import { chromium } from 'playwright';
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const LUFS = -14;
const LIMIT = 0.841; // -1.5 dBFS sample peak, leaving headroom for -1 dBTP after AAC
const TILE_W = 360; // contact-sheet tiles at phone width, so readability is judged honestly

const { values: opt, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: 'string' },
    audio: { type: 'string' },
    beats: { type: 'string' },
    at: { type: 'string' },
    fps: { type: 'string' },
    width: { type: 'string' },
    height: { type: 'string' },
    duration: { type: 'string' },
    crf: { type: 'string', default: '16' },
    sheet: { type: 'boolean', default: false },
    check: { type: 'boolean', default: false },
    'skip-check': { type: 'boolean', default: false },
  },
});

if (positionals.length !== 1) {
  console.error('usage: node render.mjs <film.html | film-dir> [--sheet | --check] [options]');
  process.exit(2);
}
let entry = path.resolve(positionals[0]);
if (fs.statSync(entry, { throwIfNoEntry: false })?.isDirectory()) entry = path.join(entry, 'index.html');
const filmDir = path.dirname(entry);
for (const f of [entry, opt.audio, opt.beats]) {
  if (f && !fs.existsSync(f)) {
    console.error(`not found: ${f}`);
    process.exit(2);
  }
}
const name = path.basename(entry) === 'index.html' ? path.basename(filmDir) : path.basename(entry, '.html');

// Runs in the page before any film script. Timers and rAF never fire, Math.random is seeded,
// and every call made while seek(t) runs is counted as a contract violation.
function renderGuard() {
  window.__RENDER__ = true;
  const v = (window.__violations = { seeking: false, raf: 0, timer: 0, random: 0, randomAt: '' });
  const note = (k) => { if (v.seeking) v[k]++; };
  window.requestAnimationFrame = () => (note('raf'), 0);
  window.setTimeout = window.setInterval = () => (note('timer'), 0);
  let s = 0x9e3779b9; // mulberry32
  Math.random = () => {
    if (v.seeking && !v.random++) v.randomAt = (new Error().stack.split('\n')[2] || '').trim();
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', (e) => console.error(`[film] ${e.message}`));
  await page.addInitScript(renderGuard);
  await page.goto(pathToFileURL(entry).href);
  await page.waitForFunction(() => typeof window.seek === 'function', null, { timeout: 30_000 })
    .catch(() => { throw new Error(`${entry} never defined window.seek(t)`); });
  await page.evaluate(() => document.fonts.ready);

  const film = await page.evaluate(() => window.film || {});
  const num = (flag, fallback) => Number(opt[flag] ?? film[flag] ?? fallback);
  const fps = num('fps', 30);
  const width = num('width', 1920);
  const height = num('height', 1080);
  const duration = num('duration', NaN);
  if (!(duration > 0)) throw new Error('unknown duration: set window.film.duration or pass --duration');
  await page.setViewportSize({ width, height });

  const outDir = path.resolve('out');
  fs.mkdirSync(outDir, { recursive: true });

  // Paints frame t; returns how many CSS transitions/animations are running on the wall clock.
  const seek = (t) => page.evaluate(async (t) => {
    window.__violations.seeking = true;
    try { await window.seek(t); } finally { window.__violations.seeking = false; }
    return document.getAnimations().filter((a) => a.playState === 'running').length;
  }, t);
  const shot = (type = 'png') => page.screenshot({ type, ...(type === 'jpeg' && { quality: 90 }) });

  const sampleTimes = () => {
    if (opt.at) return opt.at.split(',').map(Number);
    const beatsFile = opt.beats ?? path.join(filmDir, 'beats.json');
    if (fs.existsSync(beatsFile)) return JSON.parse(fs.readFileSync(beatsFile, 'utf8')).beats;
    if (opt.sheet) console.error('no beats.json: sampling every 1s');
    return Array.from({ length: Math.ceil(duration) }, (_, i) => i);
  };
  const times = sampleTimes().filter((t) => t >= 0 && t < duration);

  // Seek the samples forward, then in reverse: a pure function of time paints identical frames.
  async function check() {
    const probe = times.length > 12 ? times.filter((_, i) => i % Math.ceil(times.length / 12) === 0) : times;
    const problems = [];
    const forward = new Map();
    for (const t of probe) {
      const running = await seek(t);
      if (running) problems.push(`t=${t.toFixed(3)}s: ${running} CSS transition/animation running on the wall clock`);
      forward.set(t, createHash('sha1').update(await shot()).digest('hex'));
    }
    for (const t of [...probe].reverse()) {
      await seek(t);
      if (createHash('sha1').update(await shot()).digest('hex') !== forward.get(t))
        problems.push(`t=${t.toFixed(3)}s: frame differs when reached from a later time (state carried between frames)`);
    }
    const v = await page.evaluate(() => window.__violations);
    if (v.raf) problems.push(`seek() called requestAnimationFrame ${v.raf}x (ignored in render mode)`);
    if (v.timer) problems.push(`seek() called setTimeout/setInterval ${v.timer}x (ignored in render mode)`);
    if (v.random) problems.push(`seek() called Math.random ${v.random}x, first ${v.randomAt}; use seeded mulberry32`);
    console.log(`check: ${probe.length} frames, ${problems.length ? 'FAIL' : 'pass'}`);
    for (const p of problems) console.log(`  x ${p}`);
    return problems.length === 0;
  }

  async function sheet() {
    const portrait = height > width;
    const cols = 4;
    const perSheet = cols * (portrait ? 2 : 6);
    const tiles = [];
    for (const [i, t] of times.entries()) {
      await seek(t);
      tiles.push({ i: i + 1, t, src: `data:image/jpeg;base64,${(await shot('jpeg')).toString('base64')}` });
    }
    const sheetPage = await browser.newPage({ viewport: { width: cols * (TILE_W + 12) + 12, height: 400 } });
    const written = [];
    for (let n = 0; n * perSheet < tiles.length; n++) {
      const cells = tiles.slice(n * perSheet, (n + 1) * perSheet).map((c) =>
        `<figure><img src="${c.src}"><figcaption>#${c.i} &middot; ${c.t.toFixed(2)}s</figcaption></figure>`).join('');
      await sheetPage.setContent(`<style>
        body{margin:0;padding:12px;background:#222;display:grid;grid-template-columns:repeat(${cols},${TILE_W}px);gap:12px}
        figure{margin:0} img{display:block;width:${TILE_W}px}
        figcaption{font:13px/1.6 system-ui,sans-serif;color:#bbb}</style>${cells}`);
      const file = path.join(outDir, `${name}-sheet-${String(n + 1).padStart(2, '0')}.png`);
      await sheetPage.screenshot({ path: file, fullPage: true });
      written.push(file);
    }
    console.log(`sheet: ${tiles.length} frames -> ${written.map((f) => path.relative('.', f)).join(', ')}`);
  }

  async function render() {
    const out = path.resolve(opt.out ?? path.join(outDir, `${name}.mp4`));
    const frames = Math.round(duration * fps);
    const args = ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'png', '-framerate', String(fps), '-i', '-'];
    if (opt.audio) {
      args.push('-i', opt.audio, '-map', '0:v', '-map', '1:a', '-af', `${loudness(opt.audio, duration)},apad`,
        '-c:a', 'aac', '-b:a', '256k', '-ar', '48000');
    }
    args.push('-c:v', 'libx264', '-crf', opt.crf, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-t', String(duration), out);
    const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = once(ff, 'close');
    ff.stdin.on('error', () => {}); // an early ffmpeg exit is reported through its exit code
    for (let i = 0; i < frames && ff.exitCode === null; i++) {
      await seek(i / fps);
      if (!ff.stdin.write(await shot())) await Promise.race([once(ff.stdin, 'drain'), done]);
      if (i % fps === 0 || i === frames - 1) process.stderr.write(`\rrender: frame ${i + 1}/${frames}`);
    }
    ff.stdin.end();
    const [code] = await done;
    process.stderr.write('\n');
    if (code !== 0) throw new Error(`ffmpeg exited with ${code}`);
    console.log(`render: ${path.relative('.', out)} (${width}x${height} @ ${fps}fps, ${duration}s, crf ${opt.crf})`);
    if (opt.audio) {
      const { i, tp } = measureLoudness(out);
      console.log(`loudness: ${i.toFixed(1)} LUFS integrated, ${tp.toFixed(1)} dBTP true peak (target ${LUFS} LUFS, -1 dBTP)`);
    }
  }

  if (opt.check) process.exitCode = (await check()) ? 0 : 1;
  else if (opt.sheet) await sheet();
  else if (opt['skip-check'] || (await check())) await render();
  else {
    console.error('render aborted: fix the render contract violations above, or pass --skip-check');
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}

// Hit the loudness target exactly: gain, then a peak limiter so transients stay under -1 dBTP,
// re-measured until it lands within 0.1 LU. (loudnorm's linear mode gives up on peaky synth scores.)
function loudness(audio, duration) {
  const measured = measureLoudness(audio, 'anull', duration).i;
  if (Number.isNaN(measured)) throw new Error(`ffmpeg could not read ${audio}`);
  if (measured <= -60) {
    console.error(`loudness: ${audio} is silent, skipping normalisation`);
    return 'anull';
  }
  let gain = LUFS - measured;
  const chain = () => `volume=${gain.toFixed(2)}dB,alimiter=limit=${LIMIT}:level=0:latency=1`;
  for (let pass = 0; pass < 4; pass++) {
    const off = LUFS - measureLoudness(audio, chain(), duration).i;
    if (Math.abs(off) < 0.1) break;
    gain += off;
  }
  return chain();
}

function measureLoudness(file, filter = 'anull', duration) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', ...(duration ? ['-t', String(duration)] : []), '-i', file,
    '-map', '0:a', '-af', `${filter},ebur128=framelog=quiet:peak=true`, '-f', 'null', '-'], { encoding: 'utf8' });
  const last = (re) => Number([...r.stderr.matchAll(re)].at(-1)?.[1]);
  return { i: last(/I:\s+(-?[\d.]+) LUFS/g), tp: last(/Peak:\s+(-?[\d.]+) dBFS/g) };
}
