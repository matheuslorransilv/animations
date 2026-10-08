# Cores — TEAM NOGUEIRA

Fonte: https://teamnogueiraabc.com.br/ (8 páginas, 1440 px e 390 px), extraído em 08/10/2026.
Valores exatos, origens e frequências completas: `tokens.json` → `cor`, `gradiente`, `contraste`. Variáveis CSS: `tokens.css` (`--tn-cor-*`).

**Resumo:** é uma marca **vermelho + preto + branco**. O vermelho “da marca” é o **#981517** do anel do logo. O site usa uma família de vermelhos em volta dele: um mais claro para gradientes e acentos (#FF0000 → #CE002B), um tom quase igual para ícones e destaques (#A91411) e dois vinhos para profundidade (#790F0F, #640200). Fora da família vermelha só aparecem o verde do WhatsApp e o amarelo da página infantil.

## Paleta da marca

Frequência = declarações nos CSS de página do Elementor / nós de texto computados / elementos com fundo computados, somando as 8 páginas nos 2 tamanhos de tela.

| Token | HEX | RGB | HSL | Papel | Frequência (CSS / texto / fundo) | Confiança |
|---|---|---|---|---|---|---|
| `vermelho-marca` | **#981517** | rgb(152, 21, 23) | hsl(359, 76%, 34%) | **Primária**: anel do logo, títulos de seção, faixas | 156 / 98 / 32 | alto |
| `vermelho-escuro` | **#A91411** | rgb(169, 20, 17) | hsl(1, 82%, 36%) | **Secundária**: ícones sociais, bordas de card, destaques | 87 / 62 / 95 | alto |
| `vermelho-vivo` | **#FF0000** | rgb(255, 0, 0) | hsl(0, 100%, 50%) | **Acento**: início do gradiente do CTA, títulos de card, ícones do menu, molduras | 76 / 16 / 2 | alto |
| `carmim` | **#CE002B** | rgb(206, 0, 43) | hsl(347, 100%, 40%) | Acento, par do gradiente do CTA | 21 / – / – | alto |
| `carmim-destaque` | **#CD1F43** | rgb(205, 31, 67) | hsl(348, 74%, 46%) | Palavra de destaque no título do hero | 7 inline / 14 / – | alto |
| `vinho` | **#790F0F** | rgb(121, 15, 15) | hsl(0, 78%, 27%) | Secundária escura: títulos com divisor e linhas | 23 / 26 / – | alto |
| `vinho-profundo` | **#640200** | rgb(100, 2, 0) | hsl(1, 100%, 20%) | Fim de gradiente escuro | 10 / – / 18 | alto |
| `vermelho-hover-link` | **#DA1011** | rgb(218, 16, 17) | hsl(0, 86%, 46%) | Estado hover de link (global) | 1 (kit global) | alto |
| `preto` | **#000000** | rgb(0, 0, 0) | hsl(0, 0%, 0%) | Neutra / fundo do rodapé / títulos | 43 / 96 / 16 | alto |
| `preto-logo` | **#0C090C** | rgb(12, 9, 12) | hsl(300, 14%, 4%) | Preto do símbolo (logo para fundo claro) | amostrado do PNG | médio |
| `fundo-hero-escuro` | **#0E0E0E** | rgb(14, 14, 14) | hsl(0, 0%, 5%) | Tom da área escura do hero, atrás do texto | amostrado da imagem | médio |
| `texto-escuro` | **#181818** | rgb(24, 24, 24) | hsl(0, 0%, 9%) | Texto na home | 4 / 10 / – | alto |
| `texto-corpo` | **#54595F** | rgb(84, 89, 95) | hsl(213, 6%, 35%) | Corpo de texto das páginas de modalidade | 1 / 144 / – | alto (ver nota) |
| `cinza-tema` | **#424242** | rgb(66, 66, 66) | hsl(0, 0%, 26%) | Barra de copyright da home (fundo do tema) | estilo do tema | médio |
| `cinza-borda-galeria` | **#CFCFCF** | rgb(207, 207, 207) | hsl(0, 0%, 81%) | Borda das miniaturas da galeria | 262 bordas | alto |
| `branco` | **#FFFFFF** | rgb(255, 255, 255) | hsl(0, 0%, 100%) | Fundo das seções de conteúdo; texto sobre escuro/vermelho | 255 / 516 / 120 | alto |

### Cores de função (fora da família vermelha)

| Token | HEX | RGB | HSL | Papel | Confiança |
|---|---|---|---|---|---|
| `verde-whatsapp-inicio` | **#00B317** | rgb(0, 179, 23) | hsl(128, 100%, 35%) | Sucesso / WhatsApp (botão flutuante) | alto |
| `verde-whatsapp-fim` | **#008A2E** | rgb(0, 138, 46) | hsl(140, 100%, 27%) | Sucesso / WhatsApp | alto |
| `verde-botao-galeria` | **#5CB85C** | rgb(92, 184, 92) | hsl(120, 39%, 54%) | Botão único do Sparring Day (padrão do tema) | médio |
| `amarelo-kids` | **#FFD200** | rgb(255, 210, 0) | hsl(49, 100%, 50%) | Ícones da página TN Kids (só lá) | alto |
| Erro / alerta | NÃO ENCONTRADO | – | – | O site não tem estados de erro visíveis (nenhum formulário nas páginas analisadas) | – |

### Classificação por papel

- **Primária:** #981517
- **Secundária:** #A91411 (e #790F0F como variação escura)
- **Acento:** #FF0000 com #CE002B (sempre em gradiente) · #CD1F43 para a palavra de destaque no hero
- **Neutras:** #000000, #181818, #54595F, #424242, #CFCFCF
- **Fundos:** #FFFFFF (conteúdo), #000000 (rodapé), hero escuro (imagem, ~#0E0E0E), faixas #981517, seção em gradiente vermelho
- **Texto:** #FFFFFF sobre escuro/vermelho · #000000 / #181818 / #54595F sobre branco · #981517 / #790F0F para títulos sobre branco
- **Sucesso:** verdes do WhatsApp · **Erro:** NÃO ENCONTRADO

## Gradientes, overlays e opacidades

| Token | Valor | Opacidade | Onde | Confiança |
|---|---|---|---|---|
| `botao-principal` | `linear-gradient(96deg, #FF0000 0%, #CE002B 100%)` | 1 | Botões CTA | alto |
| `botao-principal-hover` | `linear-gradient(93deg, #CE002B 0%, #FF0000 100%)` | 1 | Hover do CTA (páginas de modalidade) | alto |
| `secao-vermelha` | `linear-gradient(180deg, #A91411 0%, #FF0000 100%)` | 1 | Seção “BENEFÍCIOS DOS TREINOS”, com divisor em V de 136 px | alto |
| `faixa-vermelha-diagonal` | `linear-gradient(111deg, #FF0000 0%, #640200 100%)` | 1 | Barra de copyright das modalidades | alto |
| `overlay-fundadores` | `linear-gradient(89deg, #FF0000 0%, #640200 100%)` | 0.85 | Sobre a foto da seção dos fundadores | alto |
| `overlay-foto-secao` | `linear-gradient(180deg, #000000 0%, #981517 100%)` | 0.9 | Sobre fotos de fundo de seção | alto |
| `overlay-hero-evento` | `linear-gradient(100deg, #000000 63%, #790F0F 100%)` | 0.8 | Hero do Sparring Day sobre foto | alto |
| `botao-whatsapp` | `linear-gradient(100deg, #00B317 0%, #008A2E 100%)` | 1 | Botão flutuante de WhatsApp | alto |

**Padrão:** os gradientes da marca vão sempre de um vermelho para outro vermelho, ou de preto para vermelho, em ângulo levemente diagonal (89°–111°) ou vertical (180°). Não há gradientes com outras cores, salvo o verde do WhatsApp.

Nos heroes, o escurecimento faz parte da própria imagem: preto à esquerda, onde fica o texto, com bokeh vermelho à direita e um filete vermelho-laranja na base (`assets/imagens/team-nogueira-abc-hero-bg.png`). Nenhum `text-shadow` foi encontrado. A única sombra é a dos cards: `0px 11px 27px -11px rgba(0, 0, 0, 0.5)`.

## Contraste WCAG (pares reais do site)

| Texto | Fundo | Onde | Razão | WCAG 2.x |
|---|---|---|---|---|
| #FFFFFF | #000000 | rodapé | 21.0 | AAA |
| #54595F | #FFFFFF | corpo das modalidades | 7.07 | AAA |
| #981517 | #FFFFFF | títulos de seção | 8.55 | AAA |
| #FFFFFF | #981517 | faixas de chamada | 8.55 | AAA |
| #A91411 | #FFFFFF | destaques e descrições | 7.51 | AAA |
| #FFFFFF | #A91411 | ícones sociais | 7.51 | AAA |
| #790F0F | #FFFFFF | títulos com divisor | 11.12 | AAA |
| #000000 | #FFFFFF | títulos e corpo | 21.0 | AAA |
| #181818 | #FFFFFF | texto da home | 17.76 | AAA |
| #FFFFFF | #424242 | copyright da home | 10.05 | AAA |
| #FFFFFF | #0E0E0E | texto do hero | 19.3 | AAA |
| #FFFFFF | #CE002B | botão (fim do gradiente) | 5.74 | AA |
| #FF0000 | #FFFFFF | títulos H3 de card | 4.0 | só AA para texto grande |
| #FFFFFF | #FF0000 | botão (início do gradiente) | 4.0 | só AA para texto grande |
| #CD1F43 | #0E0E0E | destaque no hero | 3.56 | só AA para texto grande |
| #FFFFFF | #00B317 | botão WhatsApp | 2.81 | reprovado |
| #FFFFFF | #5CB85C | botão da galeria | 2.48 | reprovado |
| #DA1011 | #A91411 | ícone social em hover | 1.45 | reprovado (o ícone some no hover) |

“Texto grande” no WCAG = a partir de 24 px, ou a partir de 18,66 px em negrito.

## Regras de uso

1. **Vermelho de marca = #981517.** Use-o em títulos sobre branco, faixas cheias e qualquer elemento que represente a marca. É o vermelho do logo.
2. **#FF0000 nunca aparece sozinho em área grande.** No site ele está em gradiente (com #CE002B, #A91411 ou #640200), em linhas de 2 px, em ícones pequenos e em títulos curtos de card. Em texto, só a partir de 24 px (contraste 4.0).
3. **Destaque de palavra:** sobre fundo escuro, #CD1F43; sobre branco, #A91411. É sempre uma ou duas palavras do título, nunca a frase toda.
4. **Fundos válidos:** branco, preto, hero escuro (imagem com preto à esquerda), #981517 sólido em faixa, gradiente `secao-vermelha` ou overlays da tabela acima. Não existe fundo cinza claro, bege ou colorido.
5. **Verde só para WhatsApp/conversão**, sempre com o gradiente `botao-whatsapp`. Atenção: texto branco sobre esse verde reprova no WCAG. Use 19 px em negrito ou mais.
6. **Amarelo #FFD200 só em peças do TN Kids.**
7. **Não usar:** as cores padrão do Elementor (#6EC1E4, #61CE70, #7A7A7A), o #D21E44 (declarado mas invisível), o #FF0004 (variação acidental de #FF0000) nem o #686868 do tema. Lista completa em `tokens.json → cor-nao-usar`.
