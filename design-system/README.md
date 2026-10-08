# Design system — TEAM NOGUEIRA

Identidade visual da **Academia Team Nogueira (Santo André – SP)**, extraída do site oficial para gerar vídeos de motion graphics (Reels 9:16) e posts fiéis à marca, sem precisar adivinhar cor, fonte ou logo.

- **Fonte da verdade:** https://teamnogueiraabc.com.br/
- **Data da extração:** 08/10/2026
- **Método:** Playwright 1.56.1 + Chromium headless lendo os **estilos computados** em 1440 px e 390 px, mais a leitura dos CSS servidos pelo site (WordPress + Elementor 4.2.2, tema Futurio). Só foi acessado o domínio `teamnogueiraabc.com.br`; Google Tag Manager, Jetpack Stats e YouTube foram bloqueados durante a coleta.
- **Páginas analisadas** (de 36 URLs do `wp-sitemap.xml`): `/` (home), `/mma/`, `/jiujitsu/`, `/muay-thai/`, `/boxe/`, `/crossfit/`, `/tn-kids/` e `/sparring-day/` (evento). O site não tem páginas separadas de “sobre”, “contato” ou “planos”: esse conteúdo está na home e no rodapé.

## A marca em 30 segundos

| | |
|---|---|
| **Cores** | Vermelho da marca **#981517** (anel do logo), vermelho **#A91411**, acento **#FF0000 → #CE002B** (gradiente do CTA), destaque **#CD1F43**, vinhos **#790F0F / #640200**, preto e branco. |
| **Fontes** | **Poppins** (títulos em ExtraBold 800 **itálico, caixa alta, −2%**; corpo em 500) e **Montserrat** (título do hero, botões, contato). Ambas Google Fonts/OFL, em `assets/fonts/`. |
| **Logo** | Símbolo de chifres dentro de um anel vermelho. Versão **vermelho + branco** para fundo escuro e **vermelho + preto** para fundo claro, mais o lockup “TEAM NOGUEIRA”. Só raster (sem SVG). |
| **Visual** | Hero preto com bokeh vermelho, faixas vermelhas de largura total, divisor em V, cards brancos sobre gradiente vermelho, colchetes em “L” e padrão de “x”. |
| **Voz** | Caixa alta, direta, motivacional, fala com “você”. Slogan: **“NEVER QUIT.”** CTA: **“AGENDAR AULA GRATUITA →”**. |
| **Movimento** | O site quase não anima (hover de 0.3s ease). A linguagem de motion para vídeo é **proposta** em `movimento.md`. |

## Como usar

1. **Antes de qualquer peça**, leia `CLAUDE.md` (regras para sessões de IA) e `regras-para-video.md`.
2. Em HTML/CSS (filmes deste repositório): importe `tokens.css` e use **apenas** as variáveis `--tn-*`:
   ```html
   <link rel="stylesheet" href="../../design-system/tokens.css">
   <h1 style="font-family: var(--tn-tipo-titulo-secao-familia); font-weight: var(--tn-tipo-titulo-secao-peso);
              font-style: var(--tn-tipo-titulo-secao-estilo); color: var(--tn-cor-vermelho-marca)">TREINE SEMPRE</h1>
   ```
   O `tokens.css` já declara os `@font-face` apontando para `assets/fonts/`.
3. Em outras ferramentas (Remotion, After Effects, Figma, scripts): leia `tokens.json`. Cada token tem `valor`, `origem` e `confianca`, e as cores também têm `rgb`, `hsl` e `frequencia`.
4. Logos e imagens: escolha em `assets/MANIFESTO.md` (diz qual versão usar em qual fundo).
5. Abra `preview.html` no navegador para ver paleta, tipografia, botões e logo renderizados com os próprios tokens.
6. Se algo não estiver aqui, **não invente**: veja `pendencias.md` e registre o novo item lá.

## Conteúdo

| Arquivo | O que tem |
|---|---|
| `CLAUDE.md` | Instruções obrigatórias para sessões futuras |
| `tokens.json` | Todos os tokens com origem e confiança (fonte primária) |
| `tokens.css` | As mesmas variáveis como CSS custom properties (`--tn-*`) + `@font-face` |
| `cores.md` | Paleta, papéis, gradientes, contraste WCAG e regras |
| `tipografia.md` | Famílias, escala real desktop/mobile e regras |
| `componentes.md` | Cabeçalho, hero, botões, cards, faixas, rodapé com valores reais |
| `movimento.md` | Transições extraídas vs. diretrizes propostas para vídeo |
| `voz-da-marca.md` | Tom, slogans, chamadas literais, termos e modalidades |
| `regras-para-video.md` | Aplicação da marca em Reels 1080×1920 + checklist |
| `pendencias.md` | O que não foi encontrado ou depende de decisão humana |
| `preview.html` | Página de conferência visual dos tokens |
| `assets/` | `logo/`, `fonts/`, `imagens/` e `MANIFESTO.md` (origem de cada arquivo) |
| `referencias/screenshots/` | Páginas inteiras do site em 1440 px e 390 px (`<pagina>-desktop.png`, `<pagina>-mobile.png`) e o `preview.html` renderizado (`preview-desktop.png`, `preview-mobile.png`) para comparação |

## Níveis de confiança

- **alto:** valor declarado no CSS do site e/ou medido no navegador.
- **médio:** amostrado de pixels de imagem ou inferido de uso pontual.
- **baixo:** proposta (não extraída) ou impossível de determinar.

## Atualizar

O site muda (ex.: o ano do copyright varia entre páginas). Para reextrair, repita a coleta com Playwright nas mesmas páginas e compare com `tokens.json`. Qualquer valor alterado precisa de nova origem e nova data.
