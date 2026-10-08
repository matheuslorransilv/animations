# Tipografia — TEAM NOGUEIRA

Fonte: estilos computados (Playwright/Chromium, 1440 px e 390 px) e CSS do Elementor em https://teamnogueiraabc.com.br/, extraído em 08/10/2026.
Tokens: `tokens.json → tipografia` · variáveis `--tn-fonte-*` e `--tn-tipo-*` em `tokens.css`.

## Famílias

| Papel | Família | Pesos usados | Origem do arquivo | Licença | Confiança |
|---|---|---|---|---|---|
| **Título** | **Poppins** | 800 itálico (seções), 700 itálico (cards) | Google Fonts, servida localmente pelo Elementor (`/wp-content/uploads/elementor/google-fonts/css/poppins.css`) | OFL 1.1, baixada em `assets/fonts/` | alto |
| **Corpo** | **Poppins** | 300, 400, 500, 600 itálico (menu), 700 | idem | OFL 1.1 | alto |
| **Destaque** (hero, botões, rodapé) | **Montserrat** | 500, 600, 700, 800 | Google Fonts (variável), local (`.../google-fonts/css/montserrat.css`) | OFL 1.1, baixada | alto |
| Fallback do tema | 'Helvetica Neue', helvetica, arial | 300–700 | tema Futurio (`style.css`) | sistema | alto (mas **não é marca**) |
| Rótulo dos cards de modalidade e arte “NEVER QUIT.” | **NÃO ENCONTRADO** | – | texto rasterizado nas imagens | – | baixo |

Frequência nos nós de texto computados: Poppins 576 · Montserrat 281 · Helvetica Neue (fallback) 127.

Também são carregadas, mas **não aparecem** em nenhum texto renderizado: **Roboto** e **Roboto Slab** (tipografia global padrão do kit do Elementor, `post-5.css`). Não usar.

Nenhuma fonte Adobe ou comercial foi encontrada.

## A assinatura tipográfica

O que identifica a marca é **Poppins ExtraBold (800) itálico, em caixa alta, com entreletra −2% e linha 1.0**. Esse estilo aparece em quase todo título de seção, faixa e chamada. O itálico dá sensação de velocidade e golpe.

O título do hero é a exceção: **Montserrat 800 reto (não itálico)**, branco, com uma ou duas palavras em #CD1F43.

## Escala real (desktop 1440 px → mobile 390 px)

| Estilo (token) | Família | Peso / estilo | Tamanho desktop | Tamanho mobile | Line-height | Letter-spacing | Caixa | Cor | Elemento no site |
|---|---|---|---|---|---|---|---|---|---|
| `hero-titulo` | Montserrat | 800 normal | 40px (32–40 conforme a página) | 22px | 1 | −0.02em (−0.8px) | caixa alta | #FFFFFF + destaque #CD1F43 | `h2` do hero |
| `corpo-hero` | Poppins | 500 normal | 14px | 16px | 1.6 | normal | normal | #FFFFFF | `p` do hero |
| `titulo-secao` | Poppins | 800 **itálico** | 30px (41px nos títulos grandes da home) | 23px (31px na home) | 1 | −0.02em | uppercase | #981517 / #FFFFFF / #000000 + destaque #A91411 | `h2` de seção |
| `titulo-faixa` | Poppins | 800 itálico | 30px (23–30) | 22px (17–30) | 1 | −0.02em | uppercase | #FFFFFF | `h2` em faixa #981517 |
| `titulo-divisor` | Poppins | 800 itálico | 30px | 23px | 1 | −0.02em | uppercase | #790F0F | `h5`/`h1` com linhas de 1px |
| `titulo-card` | Poppins | 700 itálico | 21px | 21px | 1.1 | −0.02em | uppercase | #FF0000 | `h3` dos cards de benefício |
| `corpo` | Poppins | 500 normal | 19px | 16px | 1.6 | normal | normal | #54595F (modalidades) / #181818 (home, peso 400, 18px) | `p` |
| `descricao-card` | Montserrat | 500 normal | 16px | 16px | 1.6 | normal | normal | #A91411 | `p` dos cards |
| `botao` | Montserrat | 700 normal | 19px | 19px | 1 | normal | maiúsculas digitadas | #FFFFFF | `.elementor-button` |
| `botao-secundario` | Montserrat | 600 normal | 15px | 15px | 1 | normal | maiúsculas digitadas | #FFFFFF | “VER CANAL” |
| `menu` | Poppins | 600 itálico | 15px | 15px | 24px | normal | uppercase | #FFFFFF (ícone #FF0000) | itens do cabeçalho |
| `rodape-rotulo` | Montserrat | 700 normal | 16px | 16px | 1 / 1.6 | normal | maiúsculas digitadas | #FFFFFF | `strong` do rodapé |
| `copyright` | Poppins | 300 normal | 22px | 24px | 1 | −0.02em | normal | #FFFFFF | linha © |
| Legenda | NÃO ENCONTRADO | – | – | – | – | – | – | – | o site não usa `figcaption` |

**h1, h4, h6:** o site praticamente não usa. Só há um `h1`, no título com divisor do TN Kids (Poppins 800 itálico, 30px/23px, #790F0F). `h4` e `h6`: NÃO ENCONTRADO. A hierarquia real fica nos estilos acima, não nas tags.

## Regras de uso

1. **Só duas famílias:** Poppins (títulos e corpo) e Montserrat (título do hero, botões, dados de contato). Nada de Helvetica, Roboto ou outras.
2. **Títulos de seção e chamadas:** Poppins 800 itálico, caixa alta, letter-spacing −0.02em, line-height 1.0. Nunca em peso menor que 700.
3. **Título de hero:** Montserrat 800 reto, caixa alta, com uma ou duas palavras em #CD1F43 (fundo escuro) ou #A91411 (fundo claro).
4. **Corpo:** Poppins 500, line-height 1.6, em caixa baixa (frases normais). Nunca em itálico.
5. **Botões:** Montserrat 700, texto em maiúsculas, seguido de seta → (ícone Font Awesome `fa-arrow-right`).
6. **Letter-spacing:** −0.02em em todo título; `normal` no corpo e nos botões. Não existe tracking positivo (letras abertas) no site.
7. **Fonte condensada dos cards de modalidade:** não foi identificada. Não substitua por uma “parecida” sem decisão humana (ver `pendencias.md`). Até lá, rótulos de modalidade usam o estilo `titulo-secao`.
