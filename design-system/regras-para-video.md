# Regras para vídeo — Reels 9:16 (1080×1920, 30 fps)

Este documento traduz a marca extraída do site para motion graphics vertical. Valores marcados como **extraído** vêm do site (ver `tokens.json`). Valores marcados como **proposta** são adaptações para vídeo, porque o site não define nada para esse formato. Este documento também respeita as regras do estúdio (`/CLAUDE.md` na raiz do repositório): contrato de render, contact sheet e sem rótulos fixos de canto.

## 1. Quadro e safe zone

| Medida | Valor | Token | Status |
|---|---|---|---|
| Quadro | 1080 × 1920 px, 30 fps | `--tn-video-largura`, `--tn-video-altura`, `--tn-video-fps` | briefing |
| Safe zone superior | **150 px** | `--tn-video-safe-topo` | briefing |
| Safe zone inferior | **250 px** | `--tn-video-safe-base` | briefing |
| Margem lateral | 60 px | `--tn-video-safe-lateral` | proposta |
| Área útil de texto e logo | x 60–1020, y 150–1670 | – | derivado |

Nada legível (texto, logo, CTA) fica fora da área útil. Fotos e fundos podem sangrar até a borda.

## 2. Cores no vídeo

| Função | Cor | Token | Status |
|---|---|---|---|
| Fundo padrão (cenas de impacto) | #000000 ou hero escuro (foto com preto à esquerda, ~#0E0E0E) | `--tn-cor-preto`, `--tn-cor-fundo-hero-escuro` | extraído |
| Fundo de marca (cena cheia) | #981517 sólido | `--tn-cor-vermelho-marca` | extraído |
| Fundo de marca com profundidade | `linear-gradient(180deg, #A91411 0%, #FF0000 100%)` ou `linear-gradient(111deg, #FF0000 0%, #640200 100%)` | `--tn-gradiente-secao-vermelha`, `--tn-gradiente-faixa-vermelha-diagonal` | extraído |
| Overlay sobre foto | `linear-gradient(180deg, #000000 0%, #981517 100%)` a 0.9 | `--tn-gradiente-overlay-foto-secao` | extraído |
| Fundo claro (respiro, cenas informativas) | #FFFFFF | `--tn-cor-branco` | extraído |
| Texto sobre escuro ou vermelho | #FFFFFF | `--tn-cor-branco` | extraído |
| Texto sobre branco | #000000 (títulos), #981517 (títulos de marca), #181818 (apoio) | `--tn-cor-preto`, `--tn-cor-vermelho-marca`, `--tn-cor-texto-escuro` | extraído |
| **Destaque** (1 ou 2 palavras por título) | #CD1F43 sobre escuro · #A91411 sobre branco | `--tn-cor-carmim-destaque`, `--tn-cor-vermelho-escuro` | extraído |
| Linhas, molduras, colchetes | #FF0000, 2 px na escala do site (6 px no vídeo, proposta) | `--tn-cor-vermelho-vivo` | extraído / espessura proposta |
| CTA | `linear-gradient(96deg, #FF0000 0%, #CE002B 100%)` + moldura #FF0000 | `--tn-gradiente-botao-principal` | extraído |

**Uma família de acento:** a regra do estúdio pede um acento só, e aqui ele é a família vermelha da marca. Verde (WhatsApp) só aparece se o vídeo pedir contato por WhatsApp. Amarelo (#FFD200) só em vídeos do TN Kids.

## 3. Hierarquia tipográfica

Escala **proposta**: os tamanhos do site em 390 px (mobile) multiplicados por 1080/390 ≈ 2.77, arredondados. As famílias, pesos, caixa, itálico, line-height e letter-spacing são **extraídos**.

Pela regra do estúdio (“uma face display, uma face UI”): **display = Poppins 800 itálico** (a assinatura do site) e **UI = Montserrat** (botões, datas, dados de contato, como no site).

| Elemento do vídeo | Família / peso / estilo | Tamanho (proposta) | Line-height | Letter-spacing | Caixa | Cor |
|---|---|---|---|---|---|---|
| **Título (gancho)** | Poppins 800 itálico | 64 px base (23 px × 2.77); até 128 px no gancho de 0–2 s | 1.0 | −0.02em | caixa alta | #FFFFFF + destaque #CD1F43 |
| **Subtítulo** | Poppins 500 normal | 44 px (16 px × 2.77) | 1.6 (pode cair para 1.3 em 2 linhas) | normal | frase normal | #FFFFFF / #181818 |
| **Data / horário** | Montserrat 700 | 53 px (19 px × 2.77) | 1.0 | normal | caixa alta | #FFFFFF sobre faixa #981517 |
| Rótulo de modalidade | Poppins 800 itálico | 64 px | 1.0 | −0.02em | caixa alta | #FFFFFF ou #981517 |
| Título de card / item de lista | Poppins 700 itálico | 58 px (21 px × 2.77) | 1.1 | −0.02em | caixa alta | #FF0000 sobre branco (só a partir de 24 px, contraste 4.0) ou #FFFFFF sobre escuro |
| CTA | Montserrat 700 + seta → | 53 px | 1.0 | normal | caixa alta | #FFFFFF no gradiente do botão |
| Contato / endereço | Montserrat 700 (rótulo) e Poppins 500 (texto) | 44 px | 1.3 | normal | – | #FFFFFF |

Mínimo absoluto de texto no vídeo: **40 px** (proposta; equivale a ~14 px num celular de 390 px).

## 4. Logo

| Regra | Valor | Status |
|---|---|---|
| Versão em fundo escuro ou vermelho | `assets/logo/LOGO-VERMELHO-E-BRANCO.png` (símbolo) ou `assets/logo/Arte-Banner-1.png` (lockup com “TEAM NOGUEIRA”) | extraído |
| Versão em fundo claro | `assets/logo/LOGO-VERMELHO-E-PRETO.png` | extraído |
| **Nunca** | o lockup `Arte-Banner-1.png` sobre branco (“NOGUEIRA” é branco e some); JPGs CMYK no vídeo | extraído (consequência do arquivo) |
| Onde aparece | **abertura** (dentro dos 2 primeiros segundos, junto do gancho) e **cartela final**. Sem “bug” fixo no canto durante o vídeo (regra do estúdio: sem rótulos de canto) | proposta |
| Posição na cartela final | centralizado horizontalmente, no terço superior da área útil (centro em y ≈ 600) | proposta |
| Tamanho mínimo | símbolo com **160 px** de diâmetro; lockup com **400 px** de largura | proposta |
| Tamanho na cartela final | símbolo com 320–400 px; lockup com 640–760 px | proposta |
| Área de respiro | no mínimo **25% do diâmetro do símbolo** livres em volta (ex.: 40 px para 160 px). Nada de texto, borda ou foto com detalhe dentro dessa área | proposta |
| Fundo atrás do logo | **somente** preto / área escura de foto (versão vermelho + branco) ou branco (versão vermelho + preto), como no site. **Nunca sobre vermelho**: o anel #981517 tem contraste 1.0 com #981517, 1.14 com #A91411, 1.49 com #CE002B e 2.14 com #FF0000, e some. Em cena vermelha, coloque o logo numa área preta antes | derivado do contraste medido |
| Animação | escala uniforme (1.1 → 1.0) e/ou corte. Sem rotação, sem distorcer, sem recolorir o anel | proposta |

O site só tem logo raster (o maior é 958 px). Para cartelas com o símbolo acima de ~900 px, peça o vetor (ver `pendencias.md`).

## 5. Elementos gráficos permitidos (todos vêm do site)

- Faixa cheia #981517 com texto `titulo-faixa` (Poppins 800 itálico, branco).
- Divisor em V (chevron) como borda de cena vermelha.
- Moldura de 2 px #FF0000 em volta do CTA (6 px na escala do vídeo).
- Colchete vermelho em “L” e padrão de “x” vermelhos, como nos cards de modalidade.
- Anéis concêntricos finos #981517, cortados pela borda (padrão `Arte-Banner-11.png`).
- Textura “NEVER QUIT.” (`Team-Nogueira-never-quit-bg-1920x300-1.png`) como fundo de cartela.
- Fotos reais da academia escurecidas com overlay preto→vermelho.

## 6. Proibições

1. **Cores fora da paleta** de `cores.md` (nada de azul, roxo, laranja, dourado, neon), inclusive as cores padrão do Elementor (#6EC1E4, #61CE70).
2. **Distorcer o logo** (esticar, inclinar, girar, recortar o anel), recolori-lo, aplicar sombra, glow ou contorno, ou trocar o símbolo por um desenho parecido.
3. **Fontes substitutas**: nada de Roboto, Helvetica, Bebas, Anton etc. Só Poppins e Montserrat, de `assets/fonts/`. A fonte condensada dos cards não foi identificada e não pode ser “imitada”.
4. Título em caixa baixa, em peso abaixo de 700 ou com letter-spacing positivo.
5. #FF0000 como fundo chapado de cena inteira sem gradiente (no site ele nunca aparece assim).
6. Texto vermelho #FF0000 ou #CD1F43 abaixo de 64 px (contraste insuficiente: 4.0 e 3.56).
7. Os padrões genéricos proibidos pelo estúdio: título centralizado sobre gradiente como única ideia, fade-in em tudo, rótulos de canto, molduras de quadro, glow em UI e explosões de partículas.
8. Copiar os erros de digitação do site (“SPARRYNG”, “octogono” etc.).
9. Usar fotos de alunos de galerias de evento sem autorização (só as imagens de marca de `assets/imagens/`).
10. Logo de parceiros (Gympass, TotalPass) com o mesmo peso do logo da marca.

## 7. Tabela “elemento do vídeo → token”

| Elemento do vídeo | Token(s) |
|---|---|
| Fundo de cena escura | `--tn-cor-preto` / `--tn-cor-fundo-hero-escuro` |
| Fundo de cena de marca | `--tn-cor-vermelho-marca` |
| Fundo vermelho com profundidade | `--tn-gradiente-secao-vermelha` |
| Faixa diagonal / barra de transição | `--tn-gradiente-faixa-vermelha-diagonal`, `--tn-movimento-proposta-deslocamento-diagonal` |
| Overlay sobre foto | `--tn-gradiente-overlay-foto-secao` + `--tn-gradiente-overlay-foto-secao-opacidade` |
| Título / gancho | `--tn-tipo-titulo-secao-familia`, `-peso`, `-estilo`, `-caixa`, `-espacamento-letras`, `-altura-linha` |
| Palavra de destaque (escuro) | `--tn-cor-carmim-destaque` |
| Palavra de destaque (claro) | `--tn-cor-vermelho-escuro` |
| Título com hero (frase longa) | `--tn-tipo-hero-titulo-*` (Montserrat 800). Use só se a peça imitar o hero do site |
| Subtítulo | `--tn-tipo-corpo-familia`, `--tn-tipo-corpo-peso`, `--tn-tipo-corpo-altura-linha` |
| Data / horário | `--tn-tipo-botao-familia`, `--tn-tipo-botao-peso` sobre `--tn-cor-vermelho-marca` |
| Item de lista / benefício | `--tn-tipo-titulo-card-*`, `--tn-cor-vermelho-vivo` |
| CTA (botão) | `--tn-gradiente-botao-principal`, `--tn-borda-moldura-cta`, `--tn-espaco-moldura-botao-padding`, `--tn-raio-nenhum`, `--tn-tipo-botao-*` |
| CTA de WhatsApp | `--tn-gradiente-botao-whatsapp`, `--tn-raio-pilula` |
| Linhas e colchetes | `--tn-cor-vermelho-vivo`, `--tn-borda-moldura-cta` |
| Título entre linhas | `--tn-tipo-titulo-divisor-*`, `--tn-borda-divisor` |
| Card branco sobre vermelho | `--tn-cor-branco`, `--tn-raio-moldura`, `--tn-sombra-card` |
| Logo (escuro) | `assets/logo/LOGO-VERMELHO-E-BRANCO.png`, `assets/logo/Arte-Banner-1.png` |
| Logo (claro) | `assets/logo/LOGO-VERMELHO-E-PRETO.png` |
| Duração de entrada | `--tn-movimento-proposta-entrada-rapida` (300ms), `--tn-movimento-proposta-entrada-impacto` (200ms) |
| Easing | `--tn-movimento-proposta-easing-saida`, `--tn-movimento-proposta-easing-entrada` |
| Punch-in | `--tn-movimento-proposta-escala-impacto` (1.1) |
| Safe zones | `--tn-video-safe-topo`, `--tn-video-safe-base`, `--tn-video-safe-lateral` |

## 8. Checklist antes de publicar (10 itens)

1. [ ] **Gancho em 0–2 s:** título Poppins 800 itálico com palavra de destaque e logo (símbolo ou lockup) já na tela.
2. [ ] **Safe zone:** nenhum texto, logo ou CTA acima de y=150 ou abaixo de y=1670, nem a menos de 60 px das laterais.
3. [ ] **Paleta:** todas as cores existem em `tokens.css` (`--tn-cor-*` / `--tn-gradiente-*`). Nenhuma cor do Elementor e nenhum #FF0004.
4. [ ] **Fontes:** só Poppins e Montserrat, carregadas de `assets/fonts/`. Nenhum fallback (Helvetica/Arial) aparece em frame algum.
5. [ ] **Títulos** em caixa alta, peso ≥ 700, letter-spacing −0.02em, line-height 1.0, e destaque em 1 ou 2 palavras no máximo.
6. [ ] **Logo:** versão certa para o fundo (nunca sobre vermelho), sem distorção, com respiro ≥ 25% do diâmetro, tamanho ≥ 160 px (símbolo) ou 400 px (lockup), e sem bug fixo de canto.
7. [ ] **Legibilidade:** contact sheet com tiles de 360 px lido de verdade. Nenhum texto abaixo de 40 px e nenhum vermelho puro abaixo de 64 px.
8. [ ] **Ritmo:** algo novo a cada 2–4 s, cortes no grid do `beats.json`, sem fade genérico.
9. [ ] **Texto revisado:** português correto, nomes certos (Rodrigo Minotauro, Rogério Minotouro, Team Nogueira), CTA literal “AGENDAR AULA GRATUITA →” e contato conferido com `voz-da-marca.md`.
10. [ ] **Contrato de render:** `node render.mjs films/<nome> --check` passou, áudio a −14 LUFS e export H.264 yuv420p CRF 16.
