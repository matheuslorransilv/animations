#!/usr/bin/env node
// Verificações automáticas do teaser de 15 s contra design-system/regras-para-video.md §8, em todos os frames:
// safe zone, tamanho efetivo (com zoom e câmera), vermelho só a partir de 64 px, paleta só dos tokens,
// fontes sem fallback, logo sobre fundo escuro com respiro livre (medido em pixels), lockup sem passar
// do tamanho nativo e centralização do grupo ativo nos momentos de repouso.
//   node films/mma-teaser-15s/qa.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const pasta = path.dirname(fileURLToPath(import.meta.url));
const filme = path.join(pasta, 'index.html');
const CORES = [...new Set(fs.readFileSync(path.join(pasta, '../../design-system/tokens.css'), 'utf8')
  .match(/--tn-cor-[\w-]+(?=:)/g))];
// texto: cada palavra, cada nome do contador, cada dígito e o botão
const TEXTOS = '.palavra, #contador .lista > div > span, #digitos .coluna, #botao';
const LOGOS = { 'simbolo-a': 160, 'simbolo-b': 240, lockup: 0.37 * 560 }; // diâmetro do símbolo (no lockup, ~37% da largura)
// momentos de repouso de cada bloco, para medir a centralização
const REPOUSO = { 'frase 1': 1.42, 'frase 2': 2.85, 'cartão 1': 4.1, 'cartão 2': 5.1, 'cartão 3': 6.3, contador: 7.45,
  'frase 5': 8.45, 'frase 6': 9.2, 'frase 7': 10.75, 'frase 8': 12.0, 'frase 8 + data': 13.1, final: 14.8 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const decodificador = await browser.newPage();
await page.goto(pathToFileURL(filme).href);
await page.waitForFunction(() => typeof window.seek === 'function');
await page.evaluate(() => window.seek(0));
const { duration, fps } = await page.evaluate(() => window.film);

const problemas = new Map();
const anota = (msg, f) => problemas.set(msg, [...(problemas.get(msg) ?? []), f]);

// Luminância relativa máxima (WCAG) dos pixels na margem em volta do logo, fora da caixa dele. Os 3 px colados
// à caixa ficam de fora: ali está o antisserrilhado do próprio anel, que encosta na borda da imagem.
async function margemDoLogo(caixa, margem) {
  const clip = { x: caixa.left - margem, y: caixa.top - margem, width: caixa.width + 2 * margem, height: caixa.height + 2 * margem };
  const png = await page.screenshot({ clip, type: 'png' });
  return decodificador.evaluate(async ({ dados, margem, w, h }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${dados}`;
    await img.decode();
    const c = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height });
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const px = ctx.getImageData(0, 0, img.width, img.height).data;
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    const k = img.width / (w + 2 * margem);
    let max = 0;
    for (let y = 0; y < img.height; y++) for (let x = 0; x < img.width; x++) {
      const dentro = x >= (margem - 3) * k && x < (margem + w + 3) * k && y >= (margem - 3) * k && y < (margem + h + 3) * k;
      if (dentro) continue;
      const i = (y * img.width + x) * 4;
      max = Math.max(max, 0.2126 * lin(px[i]) + 0.7152 * lin(px[i + 1]) + 0.0722 * lin(px[i + 2]));
    }
    return max;
  }, { dados: png.toString('base64'), margem, w: caixa.width, h: caixa.height });
}
// Contraste mínimo aceito entre o anel do logo (#981517) e o fundo em volta: 2.0 (preto puro dá 2.46).
const L_ANEL = await page.evaluate(() => {
  const s = document.createElement('i');
  s.style.color = getComputedStyle(document.documentElement).getPropertyValue('--tn-cor-vermelho-marca');
  document.body.append(s);
  const [r, g, b] = getComputedStyle(s).color.match(/\d+/g).map(Number);
  s.remove();
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
});
const L_FUNDO_MAX = (L_ANEL + 0.05) / 2.0 - 0.05;

const centros = {};
for (let f = 0; f < Math.round(duration * fps); f++) {
  const t = f / fps;
  const r = await page.evaluate(async ({ t, TEXTOS, LOGOS, CORES, repouso }) => {
    await window.seek(t);
    const raiz = getComputedStyle(document.documentElement);
    const sonda = document.createElement('i');
    document.body.append(sonda);
    const rgb = (cor) => { sonda.style.color = cor; return getComputedStyle(sonda).color; };
    const permitidas = new Set(CORES.map((n) => rgb(raiz.getPropertyValue(n).trim())));
    const vermelhoTexto = new Set(['--tn-cor-vermelho-vivo', '--tn-cor-carmim-destaque'].map((n) => rgb(raiz.getPropertyValue(n))));
    const sombra = raiz.getPropertyValue('--tn-sombra-card');
    const assinatura = (x) => [...(x.match(/rgba?\([^)]*\)/g) ?? []), ...(x.match(/-?[\d.]+px/g) ?? [])].sort().join(' ');
    sonda.remove();
    const px = (n) => parseFloat(raiz.getPropertyValue(n));
    const zona = { x0: px('--tn-video-safe-lateral'), x1: 1080 - px('--tn-video-safe-lateral'),
      y0: px('--tn-video-safe-topo'), y1: 1920 - px('--tn-video-safe-base') };

    const opacidade = (el) => { let o = 1; for (let e = el; e && e !== document.body; e = e.parentElement) o *= Number(getComputedStyle(e).opacity); return o; };
    const visivel = (el) => getComputedStyle(el).visibility === 'visible' && opacidade(el) >= 0.5;
    const fora = (r) => r.left < zona.x0 - 0.5 || r.right > zona.x1 + 0.5 || r.top < zona.y0 - 0.5 || r.bottom > zona.y1 + 0.5;
    const caixa = (r) => `x ${Math.round(r.left)}–${Math.round(r.right)}, y ${Math.round(r.top)}–${Math.round(r.bottom)}`;
    const nome = (el) => (el.id ? `#${el.id}` : `"${el.textContent.trim()}"`);
    const out = [];
    const uniao = { l: Infinity, r: -Infinity, t: Infinity, b: -Infinity };
    const soma = (r) => { uniao.l = Math.min(uniao.l, r.left); uniao.r = Math.max(uniao.r, r.right); uniao.t = Math.min(uniao.t, r.top); uniao.b = Math.max(uniao.b, r.bottom); };

    for (const el of document.querySelectorAll(TEXTOS)) {
      if (!visivel(el)) continue;
      const janela = el.closest('.janela, .coluna');
      const r = el.getBoundingClientRect();
      if (janela) { // só o que aparece pela janela do contador ou da coluna do dígito
        const j = janela.getBoundingClientRect();
        if (Math.min(r.bottom, j.bottom) - Math.max(r.top, j.top) < r.height / 2) continue;
      }
      if (fora(r)) out.push(`texto ${nome(el)} fora da safe zone (${caixa(r)})`);
      const cs = getComputedStyle(el);
      const efetivo = parseFloat(cs.fontSize) * (el.offsetHeight ? r.height / el.offsetHeight : 1);
      if (efetivo < 40 - 0.5) out.push(`texto ${nome(el)} abaixo de 40 px (${efetivo.toFixed(1)} px)`);
      if (vermelhoTexto.has(cs.color) && efetivo < 64 - 0.5) out.push(`texto vermelho ${nome(el)} abaixo de 64 px`);
      soma(r);
    }
    const logos = [];
    for (const [id, diam] of Object.entries(LOGOS)) {
      const el = document.getElementById(id);
      if (!visivel(el)) continue;
      const r = el.getBoundingClientRect();
      if (fora(r)) out.push(`logo #${id} fora da safe zone (${caixa(r)})`);
      if (id === 'lockup' && r.width > el.naturalWidth + 0.5) out.push(`#lockup ampliado além do nativo (${r.width.toFixed(1)} px)`);
      const repousa = Number(getComputedStyle(el).opacity) === 1 && getComputedStyle(el).filter === 'none';
      if (repousa) logos.push({ id, caixa: { left: r.left, top: r.top, width: r.width, height: r.height }, margem: Math.round(0.25 * diam * r.width / el.offsetWidth) });
      soma(r);
    }
    for (const el of document.querySelectorAll('.forma, #moldura')) if (visivel(el)) soma(el.getBoundingClientRect());

    for (const el of document.querySelectorAll('body *')) {
      if (el.tagName === 'SCRIPT' || getComputedStyle(el).visibility !== 'visible') continue;
      const cs = getComputedStyle(el);
      const cores = [cs.color, cs.backgroundColor, cs.borderTopColor, cs.fill, cs.stroke, cs.backgroundImage]
        .join(' ').match(/rgba?\([^)]*\)/g) ?? [];
      if (cs.boxShadow !== 'none' && assinatura(cs.boxShadow) !== assinatura(sombra)) out.push(`sombra fora do token em ${nome(el)}`);
      for (const c of cores) {
        if (c === 'rgba(0, 0, 0, 0)' || permitidas.has(c)) continue;
        out.push(`cor fora dos tokens em ${nome(el)}: ${c}`);
      }
    }
    const centro = repouso ? { x: (uniao.l + uniao.r) / 2, y: (uniao.t + uniao.b) / 2, w: uniao.r - uniao.l } : null;
    return { out, logos, centro };
  }, { t, TEXTOS, LOGOS, CORES, repouso: Object.values(REPOUSO).some((x) => Math.round(x * fps) === f) });
  for (const a of r.out) anota(a, f);
  for (const l of r.logos) {
    const lum = await margemDoLogo(l.caixa, l.margem);
    if (lum > L_FUNDO_MAX) anota(`margem de respiro do #${l.id} com algo além de fundo escuro (luminância ${lum.toFixed(3)})`, f);
  }
  if (r.centro) centros[Object.keys(REPOUSO).find((k) => Math.round(REPOUSO[k] * fps) === f)] = r.centro;
}

// Fonte efetivamente usada pelo Chromium em cada bloco de texto (pega qualquer fallback).
const cdp = await page.context().newCDPSession(page);
await cdp.send('DOM.enable');
await cdp.send('CSS.enable');
const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: `${TEXTOS}, .coluna .rolo > span` });
const familias = new Map();
for (const nodeId of nodeIds) {
  const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
  for (const x of fonts) {
    const chave = `${x.familyName}${x.isCustomFont ? '' : ' (SISTEMA)'}`;
    familias.set(chave, (familias.get(chave) ?? 0) + x.glyphCount);
    if (!x.isCustomFont || !/^(Poppins|Montserrat)/.test(x.familyName)) anota(`fallback de fonte: ${x.familyName}`, -1);
  }
}
await browser.close();

console.log('fontes renderizadas: ' + [...familias].map(([k, n]) => `${k} (${n} glifos)`).join(', '));
console.log('centralização nos repousos (centro do grupo ativo; meta x = 540, y ≈ 910):');
for (const [k, c] of Object.entries(centros)) console.log(`  ${k.padEnd(15)} x ${c.x.toFixed(0)}  y ${c.y.toFixed(0)}  largura ${c.w.toFixed(0)}`);
const faixa = (fs) => (fs[0] < 0 ? 'todos' : `frames ${fs[0]}–${fs.at(-1)} (${fs.length})`);
console.log(problemas.size ? `\nPROBLEMAS (${problemas.size}):` : '\nnenhum problema em nenhum frame');
for (const [msg, fs] of problemas) console.log(`  x ${msg}: ${faixa(fs)}`);
process.exitCode = problemas.size ? 1 : 0;
