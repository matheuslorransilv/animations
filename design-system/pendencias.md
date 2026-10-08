# Pendências — TEAM NOGUEIRA

Itens que não puderam ser determinados pelo site, que são ambíguos ou que precisam de decisão humana. Atualizado em 08/10/2026. Nenhum item abaixo foi “preenchido com valor provável”.

## A. NÃO ENCONTRADO no site

| # | Item | O que foi verificado | O que é preciso |
|---|---|---|---|
| A1 | **Logo vetorial (SVG/PDF/AI)** | Todo o HTML das 8 páginas, a API de mídia do WordPress (`/wp-json/wp/v2/media?search=logo`) e os favicons: só existem PNG/JPG (máx. 958×958). | Pedir o arquivo vetorial oficial (símbolo e lockup). Sem ele, cartelas com o símbolo acima de ~900 px vão perder nitidez. |
| A2 | **Lockup “TEAM NOGUEIRA” em alta resolução e versão para fundo claro** | Só existe `Arte-Banner-1.png` (678×377, “NOGUEIRA” em branco). | Lockup em vetor nas versões para fundo escuro e claro. |
| A3 | **Fonte condensada dos rótulos dos cards de modalidade** (“JIU-JITSU”, “MMA”…) e **fonte da arte “NEVER QUIT.”** e do wordmark “TEAMNOGUEIRA” | Esses textos estão rasterizados nas imagens. Nenhuma `@font-face` correspondente é carregada. | Nome e licença das fontes, ou confirmar que não devem ser usadas em peças novas. |
| A4 | **Cor oficial da marca em Pantone/CMYK** | Não há guia de marca no site. | Manual de marca, se existir. |
| A5 | **og:image** | Nenhuma página declara `og:image`. | – (só informativo) |
| A6 | **Logo no rodapé** | O rodapé não exibe logo. | – |
| A7 | **Cores de erro/alerta** | Nenhum formulário ou estado de erro nas páginas analisadas. | Definir, se peças futuras precisarem. |
| A8 | **Estilo de legenda (`figcaption`), `h4`, `h6`, badges** | Não são usados no site. | – |
| A9 | **Texto integral da licença OFL 1.1** das fontes | O site serve os `.woff2` sem o arquivo de licença; ele não foi baixado de outro domínio (regra desta extração). | Adicionar `assets/fonts/OFL.txt` copiado de fonte oficial (Google Fonts/SIL), com aprovação. |
| A10 | **Conteúdo dos vídeos do YouTube** (“Canal no Youtube”, “história da Carla”) | `youtube.com` ficou fora do escopo de acesso; os iframes aparecem vazios nos screenshots. | Analisar à parte, se o estilo dos vídeos existentes for referência para os Reels. |

## B. Ambiguidades e inconsistências do próprio site

| # | Item | Detalhe | Decisão sugerida (precisa de aprovação) |
|---|---|---|---|
| B1 | **Dois vermelhos no logo** | PNGs: anel **#981517**. JPG CMYK (`LOGO-VERMELHO-E-PRETO.jpg` e favicons): anel ~**#BE0000** depois da conversão para RGB. | Tratar #981517 como oficial (bate com o CSS mais frequente). Confirmar com a marca. |
| B2 | **#981517 vs #A91411** | Dois vermelhos escuros muito próximos (ΔHSL pequeno), os dois muito usados. | Mantidos os dois (primária e secundária), como no site. Avaliar unificar. |
| B3 | **Cor do corpo de texto #54595F** | É a cor global **padrão** do Elementor (`--e-global-color-secondary`), não parece escolha de marca. | Aceitar como cor de corpo ou trocar por #181818 (usada na home). |
| B4 | **#FF0004** | Variação acidental de #FF0000 em 2 molduras. | Usar #FF0000. |
| B5 | **Hover dos ícones sociais** | Ícone fica #DA1011 sobre #A91411 (contraste 1.45, quase some). | Não replicar em peças. |
| B6 | **Hover do CTA no /crossfit/** | Texto do botão vira #DA1011 sobre o gradiente vermelho (herança do link global). | Tratar como bug; não replicar. |
| B7 | **Barra de copyright** | Home: fundo #424242 (cinza do tema). Demais páginas: gradiente #FF0000→#640200. Ano: “© 2026” (home), “© 2025” (jiu-jitsu), “© 2024” (MMA, Sparring Day). | Considerar o gradiente como padrão e atualizar os anos. |
| B8 | **Título do hero em Montserrat vs títulos em Poppins** | O site usa Montserrat 800 reto no hero e Poppins 800 itálico no resto. As regras do estúdio pedem uma face display só. | Em vídeo, display = Poppins 800 itálico e Montserrat só para UI (CTA, data, contato). Confirmar. |
| B9 | **Erros de digitação no site** | “SPARRYNG”, “octogono”, “alavncas”, “QUEENSBURGY”, “japoneza”, “teinamento”, “BULLYNG”. | Não reproduzir; avisar o responsável pelo site. |
| B10 | **Roboto e Roboto Slab** carregadas mas não usadas | Tipografia global padrão do kit do Elementor. | Ignorar. |

## C. Valores PROPOSTOS (não extraídos) que precisam de aprovação

| # | Item | Proposta | Onde |
|---|---|---|---|
| C1 | Escala tipográfica do vídeo | mobile do site × 2.77 (título 64 px, subtítulo 44 px, data 53 px; gancho até 128 px); mínimo 40 px | `regras-para-video.md` §3 |
| C2 | Logo em vídeo: tamanho mínimo e respiro | símbolo ≥ 160 px, lockup ≥ 400 px, respiro ≥ 25% do diâmetro | `regras-para-video.md` §4 |
| C3 | Posição do logo | só na abertura e na cartela final, sem bug de canto | `regras-para-video.md` §4 |
| C4 | Margem lateral da safe zone | 60 px | `tokens.json → video.safe-lateral` |
| C5 | Linguagem de motion | cortes secos, entradas de 200/300 ms, easings, wipe diagonal de −12°, punch-in de 1.1 | `movimento.md` §2 |
| C6 | Espessura das linhas no vídeo | 2 px do site → 6 px no vídeo | `regras-para-video.md` §2 |

## D. Fora do escopo desta extração (pode ser útil depois)

- Páginas não visitadas: `/krav-maga/` (está no sitemap, mas não aparece no menu), as páginas “-anterior” (versões antigas das modalidades) e as demais páginas de evento/galeria do sitemap (36 URLs no total).
- A arte da **grade de aulas** (`2026/08/Academia-de-Lutas-Santo-Andre--724x1024.png`) tem estilo próprio (fundo cinza texturizado, cabeçalho “TRAINING TEAM NOGUEIRA” com serifa) e não foi baixada. Decidir se ela é referência para posts de horário.
- **Direito de imagem:** as fotos de `assets/imagens/` mostram os fundadores e atletas usados como imagem da marca no site. Confirmar se podem ser usadas em Reels e anúncios.
- Ícones de seta e de redes sociais vêm do **Font Awesome** (não foram baixados). Decidir se o vídeo usa esses ícones (licença Font Awesome Free) ou desenhos próprios.
