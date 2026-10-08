# Manifesto de assets — TEAM NOGUEIRA

Todos os arquivos foram baixados em 08/10/2026 do domínio `teamnogueiraabc.com.br`, sem alteração de conteúdo (mesmos bytes do servidor). Os nomes originais foram mantidos para facilitar o rastreio. Nenhum arquivo veio de outro domínio.

Base das URLs: `https://teamnogueiraabc.com.br/wp-content/uploads/`

## logo/

O site **não publica nenhum logo em SVG**: todas as versões abaixo são raster. Ver `pendencias.md`.

| Arquivo | URL de origem (após a base) | Formato | Dimensões | Onde aparece no site | Uso sugerido |
|---|---|---|---|---|---|
| `LOGO-VERMELHO-E-BRANCO.png` | `2021/05/LOGO-VERMELHO-E-BRANCO.png` | PNG RGBA (fundo transparente) | 957×957 | Cabeçalho de todas as páginas (exibido a 71×71 px) | **Símbolo para fundo escuro** (anel #981517 + símbolo branco). Versão principal para vídeo. Não usar sobre fundo vermelho: o anel some. |
| `LOGO-VERMELHO-E-PRETO.png` | `2023/07/LOGO-VERMELHO-E-PRETO.png` | PNG RGBA (fundo transparente) | 958×958 | Arquivo-fonte do ícone do site (mídia nº 12300 na API do WordPress) | **Símbolo para fundo claro** (anel #981517 + símbolo #0C090C). |
| `cropped-LOGO-VERMELHO-E-PRETO.png` | `2023/07/cropped-LOGO-VERMELHO-E-PRETO.png` | PNG RGBA | 957×957 | Logo configurado no tema (`site_logo` = mídia 12301 em `/wp-json/`) | Igual ao anterior, recortado; para fundo claro. |
| `LOGO-VERMELHO-E-PRETO.jpg` | `2023/07/LOGO-VERMELHO-E-PRETO.jpg` | JPEG **CMYK**, fundo branco | 958×958 | Mídia nº 12305 (original do favicon) | Só referência. O vermelho do anel sai como ~#BE0000, diferente do PNG. Não usar em vídeo. |
| `cropped-LOGO-VERMELHO-E-PRETO.jpg` | `2023/07/cropped-LOGO-VERMELHO-E-PRETO.jpg` | JPEG CMYK | 512×512 | Ícone do site (`site_icon` = mídia 12306) | Avatar e ícone quadrado sobre fundo branco. |
| `cropped-LOGO-VERMELHO-E-PRETO-32x32.jpg` | `2023/07/cropped-LOGO-VERMELHO-E-PRETO-32x32.jpg` | JPEG CMYK | 32×32 | `<link rel="icon" sizes="32x32">` (favicon) | Favicon. |
| `cropped-LOGO-VERMELHO-E-PRETO-180x180.jpg` | `2023/07/cropped-LOGO-VERMELHO-E-PRETO-180x180.jpg` | JPEG CMYK | 180×180 | `<link rel="apple-touch-icon">` | Ícone iOS. |
| `cropped-LOGO-VERMELHO-E-PRETO-192x192.jpg` | `2023/07/cropped-LOGO-VERMELHO-E-PRETO-192x192.jpg` | JPEG CMYK | 192×192 | `<link rel="icon" sizes="192x192">` | Ícone Android. |
| `Arte-Banner-1.png` | `2024/04/Arte-Banner-1.png` | PNG RGBA (transparente) | 678×377 (área útil 656×351) | Hero da home, acima do título (exibido a 143×80 px) | **Lockup completo para fundo escuro**: símbolo + “TEAM” vermelho (~#D31B41) + “NOGUEIRA” branco. Assinatura de abertura/fechamento de vídeo. |

**og:image:** NÃO ENCONTRADO (nenhuma página analisada declara `og:image`).
**Logo do rodapé:** NÃO ENCONTRADO (o rodapé não exibe logo).
**Não baixados:** `2023/07/cropped-cropped-LOGO-VERMELHO-E-PRETO.png` (512×512, duplicata recortada do mesmo símbolo) e `2018/12/physical-training-logo.png` (logo de demonstração do tema, não é da marca).

## fonts/

Licença: **SIL Open Font License 1.1** (Poppins e Montserrat são distribuídas pelo Google Fonts sob OFL). O site serve cópias locais geradas pelo Elementor; os arquivos abaixo são exatamente esses. Subconjunto `latin` (cobre todos os acentos do português).

| Arquivo | URL de origem (após `.../uploads/elementor/google-fonts/fonts/`) | Família / peso / estilo | Uso no site |
|---|---|---|---|
| `Poppins-Light-latin.woff2` | `poppins-pxibyp8kv8jhgfvrldz8z1xlfq.woff2` | Poppins 300 normal | copyright |
| `Poppins-Regular-latin.woff2` | `poppins-pxieyp8kv8jhgfvrjjfecg.woff2` | Poppins 400 normal | texto da home |
| `Poppins-Medium-latin.woff2` | `poppins-pxibyp8kv8jhgfvrlgt9z1xlfq.woff2` | Poppins 500 normal | corpo de texto |
| `Poppins-SemiBold-latin.woff2` | `poppins-pxibyp8kv8jhgfvrlej6z1xlfq.woff2` | Poppins 600 normal | — (carregada) |
| `Poppins-Bold-latin.woff2` | `poppins-pxibyp8kv8jhgfvrlcz7z1xlfq.woff2` | Poppins 700 normal | negritos |
| `Poppins-ExtraBold-latin.woff2` | `poppins-pxibyp8kv8jhgfvrldd4z1xlfq.woff2` | Poppins 800 normal | — (carregada) |
| `Poppins-SemiBoldItalic-latin.woff2` | `poppins-pxidyp8kv8jhgfvrjjlmr19vf9eo.woff2` | Poppins 600 itálico | menu |
| `Poppins-BoldItalic-latin.woff2` | `poppins-pxidyp8kv8jhgfvrjjlmy15vf9eo.woff2` | Poppins 700 itálico | títulos de card |
| `Poppins-ExtraBoldItalic-latin.woff2` | `poppins-pxidyp8kv8jhgfvrjjlm111vf9eo.woff2` | Poppins 800 itálico | **títulos de seção (assinatura tipográfica)** |
| `Montserrat-VariableFont-latin.woff2` | `montserrat-jtusjig1_i6t8kchkm459wlhyw.woff2` | Montserrat variável 100–900 normal | título do hero, botões, rodapé |
| `Montserrat-Italic-VariableFont-latin.woff2` | `montserrat-jtuqjig1_i6t8kchkm459wxrys7m.woff2` | Montserrat variável 100–900 itálico | — (carregada) |

O texto integral da OFL 1.1 não está no site e não foi baixado de outro domínio; ver `pendencias.md`.

## imagens/

Fotos com pessoas: só foram salvas as que o site usa como **identidade da marca** (heroes e cards de modalidade, com os fundadores e atletas da equipe). Fotos de alunos em eventos (galerias de graduação, Sparring Day) **não** foram salvas.

| Arquivo | URL de origem (após a base) | Formato | Dimensões | Onde aparece | Uso sugerido |
|---|---|---|---|---|---|
| `team-nogueira-abc-hero-bg.png` | `2026/01/team-nogueira-abc-hero-bg.png` | PNG indexado | 1920×796 | Fundo do hero da home | Referência do tratamento de hero: preto à esquerda, bokeh vermelho à direita, filete vermelho na base. Contém pessoas. |
| `mma.png` | `2024/04/mma.png` | PNG RGBA | 2420×1004 | Fundo do hero de `/mma/` | Referência de hero de modalidade. Contém pessoas. |
| `Arte-Banner-15.png` | `2024/04/Arte-Banner-15.png` | PNG RGBA (recorte) | 1172×1004 | Seção dos fundadores (home) | Recorte dos fundadores Rodrigo Minotauro e Rogério Minotouro sobre fundo transparente. |
| `8.png` | `2024/04/8.png` | PNG RGBA | 640×960 (2:3) | Card “JIU-JITSU” | Referência do card de modalidade: foto escurecida, colchete vermelho em L, padrão de “x” vermelho, rótulo condensado branco. |
| `9.png` | `2024/04/9.png` | PNG RGBA | 640×960 (2:3) | Card “JIU-JITSU KIDS” | Idem. |
| `11.png` | `2024/04/11.png` | PNG RGBA | 640×960 (2:3) | Card “MMA” | Idem (versão MMA). |
| `Team-Nogueira-never-quit-bg-1920x300-1.png` | `2026/01/Team-Nogueira-never-quit-bg-1920x300-1.png` | PNG indexado | 1920×298 | Faixa “NEVER QUIT.” antes do rodapé (home) | Textura vermelha granulada + assinatura “NEVERQUIT.”. Fundo de cartela final. |
| `Arte-Banner-11.png` | `2024/04/Arte-Banner-11.png` | PNG RGBA (opaco) | 2420×1004 | Fundo das seções “Modalidades” e “Conheça nosso espaço” | Padrão gráfico: dois anéis concêntricos finos vermelhos sobre branco, cortados pela borda. |
| `icones-beneficios/ansiedade.png` | `2024/04/ansiedade.png` | PNG RGBA | 512×512 | Card “CURE-SE DA ANSIEDADE” | Ícone de traço preto, estilo linha grossa. |
| `icones-beneficios/solidao.png` | `2024/04/solidao.png` | PNG RGBA | 512×512 | Card “VENÇA A DEPRESSÃO” | Idem. |
| `icones-beneficios/batimento-cardiaco.png` | `2024/04/batimento-cardiaco.png` | PNG RGBA | 512×512 | Card “MELHORA CARDIÁCA” | Idem. |
| `icones-beneficios/cerebro.png` | `2024/04/cerebro.png` | PNG RGBA | 512×512 | Card “REDUÇÃO DE ESTRESSE” | Idem. |
| `icones-beneficios/perda-de-peso.png` | `2024/04/perda-de-peso.png` | PNG RGBA | 512×512 | Card “EMAGRECIMENTO” | Idem. |
| `icones-beneficios/dormir.png` | `2024/04/dormir.png` | PNG RGBA | 512×512 | Card “SONO DE QUALIDADE” | Idem. |
| `icones-beneficios/teste-de-sangue.png` | `2024/04/teste-de-sangue.png` | PNG RGBA | 512×512 | Card “REDUZ O RISCO DE DOENÇAS CRÔNICAS” | Idem. |
| `icones-beneficios/punho.png` | `2024/04/punho.png` | PNG RGBA | 512×512 | Card “AUTODEFESA” | Idem. |

Logos de parceiros vistos no site (Gympass, TotalPass) **não** fazem parte da marca e não foram salvos.
