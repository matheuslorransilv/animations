#!/usr/bin/env node
// Verificações automáticas do teaser contra design-system/regras-para-video.md §8, em todos os frames:
// safe zone, tamanho mínimo, vermelho só a partir de 64 px, paleta só dos tokens, fontes sem fallback,
// logo nunca sobre vermelho e lockup sem passar do tamanho nativo.
//   node films/mma-teaser/qa.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const filme = path.join(path.dirname(fileURLToPath(import.meta.url)), 'index.html');
const TEXTOS = ['#exufc', '#exufc em', '#vai', '#aqui', '#mma', '#titulo-1 h2', '#titulo-2 h2', '#dia', '#horario',
  '#pergunta', '#pergunta em', '#fique p'];
const LOGOS = ['#simbolo', '#lockup'];
const CORES = [...new Set(fs.readFileSync(path.join(path.dirname(filme), '../../design-system/tokens.css'), 'utf8')
  .match(/--tn-cor-[\w-]+(?=:)/g))];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(pathToFileURL(filme).href);
await page.waitForFunction(() => typeof window.seek === 'function');
await page.evaluate(() => window.seek(0));
const { duration, fps } = await page.evaluate(() => window.film);

const problemas = new Map(); // mensagem -> frames
const anota = (msg, f) => problemas.set(msg, [...(problemas.get(msg) ?? []), f]);

for (let f = 0; f < Math.round(duration * fps); f++) {
  const achados = await page.evaluate(async ({ t, TEXTOS, LOGOS, CORES }) => {
    await window.seek(t);
    const raiz = getComputedStyle(document.documentElement);
    const sonda = document.createElement('i');
    document.body.append(sonda);
    const rgb = (cor) => { sonda.style.color = cor; return getComputedStyle(sonda).color; };
    const permitidas = new Set(CORES.map((n) => rgb(raiz.getPropertyValue(n).trim())));
    const vermelhoTexto = new Set(['--tn-cor-vermelho-vivo', '--tn-cor-carmim-destaque'].map((n) => rgb(raiz.getPropertyValue(n))));
    const preto = rgb(raiz.getPropertyValue('--tn-cor-preto'));
    const px = (n) => parseFloat(raiz.getPropertyValue(n));
    const zona = { x0: px('--tn-video-safe-lateral'), x1: 1080 - px('--tn-video-safe-lateral'),
      y0: px('--tn-video-safe-topo'), y1: 1920 - px('--tn-video-safe-base') };
    sonda.remove();

    const out = [];
    const visivel = (el) => getComputedStyle(el).visibility === 'visible';
    const fora = (r) => r.left < zona.x0 - 0.5 || r.right > zona.x1 + 0.5 || r.top < zona.y0 - 0.5 || r.bottom > zona.y1 + 0.5;
    const caixa = (r) => `x ${Math.round(r.left)}–${Math.round(r.right)}, y ${Math.round(r.top)}–${Math.round(r.bottom)}`;

    for (const sel of TEXTOS) {
      const el = document.querySelector(sel);
      if (!visivel(el)) continue;
      const faixa = document.createRange();
      faixa.selectNodeContents(el);
      const r = faixa.getBoundingClientRect();
      const recorte = el.closest('.mascara')?.getBoundingClientRect();
      const naTela = !recorte || (r.top < recorte.bottom && r.bottom > recorte.top);
      if (naTela && fora(r)) out.push(`${sel} fora da safe zone (${caixa(r)})`);
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) < 40) out.push(`${sel} abaixo de 40 px (${cs.fontSize})`);
      if (vermelhoTexto.has(cs.color) && parseFloat(cs.fontSize) < 64) out.push(`${sel} vermelho abaixo de 64 px`);
    }
    for (const sel of LOGOS) {
      const el = document.querySelector(sel);
      if (!visivel(el)) continue;
      const r = el.getBoundingClientRect();
      if (fora(r)) out.push(`${sel} fora da safe zone (${caixa(r)})`);
      if (getComputedStyle(el.closest('.cena')).backgroundColor !== preto) out.push(`${sel} fora do fundo preto`);
      if (sel === '#lockup' && r.width > el.naturalWidth + 0.5) out.push(`#lockup ampliado além do nativo (${r.width.toFixed(1)} px)`);
    }
    for (const el of document.querySelectorAll('body *')) {
      if (!visivel(el) || el.tagName === 'SCRIPT') continue;
      const cs = getComputedStyle(el);
      const cores = [cs.color, cs.backgroundColor, cs.borderTopColor, cs.fill, cs.stroke, cs.backgroundImage, cs.boxShadow]
        .join(' ').match(/rgba?\([^)]*\)/g) ?? [];
      for (const c of cores) {
        if (c === 'rgba(0, 0, 0, 0)' || permitidas.has(c)) continue;
        if (cs.boxShadow.includes(c) && raiz.getPropertyValue('--tn-sombra-card').includes(c.replace(/^rgba?/, 'rgba'))) continue;
        out.push(`cor fora dos tokens em #${el.id || el.tagName.toLowerCase()}: ${c}`);
      }
    }
    return out;
  }, { t: f / fps, TEXTOS, LOGOS, CORES });
  for (const a of achados) anota(a, f);
}

// Fonte efetivamente usada pelo Chromium em cada texto (pega qualquer fallback).
const cdp = await page.context().newCDPSession(page);
await cdp.send('DOM.enable');
await cdp.send('CSS.enable');
const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
const fontes = {};
for (const sel of TEXTOS) {
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
  const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
  fontes[sel] = fonts.map((x) => `${x.familyName}${x.isCustomFont ? '' : ' (SISTEMA)'} ×${x.glyphCount}`).join(', ');
  if (fonts.some((x) => !x.isCustomFont || !/^(Poppins|Montserrat)/.test(x.familyName))) anota(`fallback de fonte em ${sel}`, -1);
}
await browser.close();

console.log('fontes renderizadas:');
for (const [sel, f] of Object.entries(fontes)) console.log(`  ${sel.padEnd(14)} ${f}`);
const faixa = (fs) => (fs[0] < 0 ? 'todos' : `frames ${fs[0]}–${fs.at(-1)} (${fs.length})`);
console.log(problemas.size ? `\nPROBLEMAS (${problemas.size}):` : '\nnenhum problema em nenhum frame');
for (const [msg, fs] of problemas) console.log(`  x ${msg}: ${faixa(fs)}`);
process.exitCode = problemas.size ? 1 : 0;
