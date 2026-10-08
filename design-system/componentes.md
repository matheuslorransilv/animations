# Componentes — TEAM NOGUEIRA

Valores reais lidos dos estilos computados e dos CSS do Elementor (`post-14937.css` = home, `post-15329.css` = MMA, `post-21225.css` = Sparring Day, `post-5.css` = kit global), em 08/10/2026. Screenshots de referência: `referencias/screenshots/`.

## Cabeçalho

| Propriedade | Desktop (1440 px) | Mobile (390 px) | Origem |
|---|---|---|---|
| Posição | Dentro do hero, sobre a imagem; não é fixo nem sticky | **Não existe**: logo e menu ficam ocultos e não há menu hambúrguer | medido no navegador |
| Logo | `LOGO-VERMELHO-E-BRANCO.png`, 71×71 px, em x=206 e y=30 | – (o hero mostra o lockup `Arte-Banner-1.png`) | medido |
| Itens de menu | “A TEAM NOGUEIRA”, “GRADE AULAS”, “MODALIDADES”, “EVENTOS E FOTOS” | – | computado |
| Tipografia do menu | Poppins 600 itálico, 15px, line-height 24px, caixa alta, #FFFFFF | – | computado |
| Ícone de cada item | Font Awesome em #FF0000 (fa-star, fa-clock, fa-running, fa-smile-beam), 5px antes do texto; no hover o ícone vai a #FFFFFF e o texto a #FF0000 (transição de cor 0.3s) | – | `post-14937.css`, `post-15329.css` |
| Ícones sociais | Facebook, Instagram e WhatsApp em círculo de 40×40 px, fundo #A91411, ícone #FFFFFF de 18px, `--icon-padding: 0.6em` | iguais, abaixo do botão do hero | computado / `post-14937.css` |
| Hover do ícone social | ícone vai a #DA1011 e opacidade a 0.9 (o ícone quase some: contraste 1.45) | – | hover medido |

## Hero

- Altura mínima de **713px** (o mesmo em todas as páginas). Imagem de fundo `cover`, centralizada.
- Imagem: preto à esquerda, pessoas recortadas à direita com bokeh vermelho e um filete vermelho-laranja na base (`assets/imagens/team-nogueira-abc-hero-bg.png`, `mma.png`). Na página de evento, foto real com overlay `linear-gradient(100deg, #000000 63%, #790F0F 100%)` a 0.8.
- Ordem do conteúdo, alinhado à esquerda: lockup (só na home) → título Montserrat 800 com destaque #CD1F43 → parágrafo Poppins 500, 14px, branco → botão principal com moldura.

## Botões

| Variante | Fundo | Texto | Raio | Padding | Borda / moldura | Hover | Origem |
|---|---|---|---|---|---|---|---|
| **Principal (CTA)** “AGENDAR AULA GRATUITA →” | `linear-gradient(96deg, #FF0000 0%, #CE002B 100%)` | Montserrat 700, 19px, #FFFFFF, seta à direita (`flex-direction: row-reverse` + fa-arrow-right) | 0px | 12px 24px | **moldura externa** de 2px sólida #FF0000, com 5px de respiro e raio 1px | Páginas de modalidade: gradiente invertido `linear-gradient(93deg, #CE002B 0%, #FF0000 100%)`. Na home o visual não muda. No `/crossfit/` o texto vai a #DA1011 (herdado do link global) | `post-14937.css` `.elementor-element-c04f1cc` |
| Largura do CTA no hero | 516 px (desktop), 336 px com quebra em 2 linhas (mobile) | | | | | | medido |
| **Secundário** “VER CANAL →” | mesmo gradiente | Montserrat 600, 15px | 0px | 12px 24px | moldura #FF0000 2px | – | computado |
| **Flutuante “Voltar ao topo”** | mesmo gradiente | Montserrat 700, 19px + ícone fa-arrow-alt-circle-up | **20px** (pílula) | 12px 24px | – | – | `post-14937.css` `.elementor-element-8f0ed1e`; fixo em 20px da esquerda/base, só no desktop |
| **Flutuante WhatsApp** “Faça sua aula gratuita” | `linear-gradient(100deg, #00B317 0%, #008A2E 100%)` | Montserrat 700, 19px + fa-phone-alt | 20px | 12px 24px | – | – | `.elementor-element-12bf85d`; fixo em 20px da direita/base |
| Botão da galeria (Sparring Day) | #5CB85C | Helvetica Neue 300, 15px | 3px | 12px 24px | – | `scale(1.1)` em 0.3s (`elementor-animation-grow`) | computado |

Todos os botões têm `transition: all 0.3s ease` (padrão do Elementor).

## Cards

### Card de benefício (home, seção vermelha)
- Fundo #FFFFFF, raio 1px, sem sombra, em grade de 4 colunas (desktop) ou 1 coluna (mobile), sobre o gradiente `secao-vermelha`.
- Ícone PNG de traço preto (512×512) ocupando 65% da largura, 15px acima do título.
- Título: Poppins 700 itálico, 21px, line-height 1.1, caixa alta, #FF0000, centralizado.
- Descrição: Montserrat 500, 16px, line-height 1.6, #A91411, centralizada.

### Card de evento/foto (home)
- Fundo #FFFFFF, borda **2px sólida #A91411**, sombra `0px 11px 27px -11px rgba(0, 0, 0, 0.5)`, padding 15px nas laterais e no topo e 50px na base.
- Miniatura no topo e título Poppins 800 itálico em caixa alta, #A91411, centralizado.

### Card de modalidade (home)
- Arte raster 640×960 (2:3): foto escurecida, **colchete vermelho em “L”** saindo do canto inferior esquerdo, **padrão de “x” vermelhos** em degradê no canto superior direito, rótulo em fonte condensada branca, centralizado (`assets/imagens/8.png`, `9.png`, `11.png`). É tudo imagem, não CSS.

### Bloco de passos (páginas de modalidade)
- Três colunas, cada uma com ícone Font Awesome em #981517 (ex.: fa-smile-beam, fa-heart, fa-child; `post-15329.css` `.elementor-element-57225c2`), título `titulo-secao` em #981517 e parágrafo `corpo`.

## Faixas e divisores

| Componente | Estilo | Origem |
|---|---|---|
| **Faixa de chamada** | Largura total, fundo #981517, padding 20px, `titulo-faixa` branco centralizado (ex.: “ESCOLHER PRATICAR MMA É DEFINIR SUA CAPACIDADE DE TER MULTICAPACIDADES.”) | computado |
| **Título com divisor** | Texto `titulo-divisor` (#790F0F) entre duas linhas de 1px sólidas #790F0F, padding vertical de 10px | `post-15329.css` `.elementor-element-2ab6f2b` |
| **Divisor em V** | Seção com gradiente vermelho e borda superior em chevron: SVG `M500,98.9L0,6.1V0h1000v6.1L500,98.9z`, 136px de altura; borda inferior com o V invertido | `post-14937.css` `.elementor-element-46cb816` |
| **Faixa “NEVER QUIT.”** | Imagem 1920×298 com textura vermelha granulada e a assinatura, 250px de altura, `cover` | `assets/imagens/Team-Nogueira-never-quit-bg-1920x300-1.png` |
| **Separador branco** | Linha de 5px sólida #FFFFFF, sob a foto dos fundadores | computado |
| **Padrão de anéis** | Dois círculos concêntricos de traço fino #981517, cortados pela borda da seção | `assets/imagens/Arte-Banner-11.png` |

## Seção com foto de fundo
- Foto em `cover`, posicionada em 50% 0%, com overlay `linear-gradient(180deg, #000000 0%, #981517 100%)` a 0.9.
- Padding de 80px 50px. Duas colunas: texto branco à esquerda e foto/vídeo à direita dentro de uma moldura de 2px sólida #FF0004 (variação de #FF0000), padding 5px e raio 5px (`post-15329.css` `.elementor-element-4622e04`).

## Rodapé

| Parte | Estilo | Origem |
|---|---|---|
| Bloco principal | Fundo #000000, 386px de altura, padding lateral 20px, 3 colunas: “FALE CONOSCO.” (texto), “ENDEREÇO UNIDADE”, telefone e WhatsApp + ícones sociais quadrados (raio 10%, fundo #A91411) | computado |
| Tipografia | Rótulos e telefones em Montserrat 700, 16px, #FFFFFF | computado |
| Barra de copyright | 42px de altura, “© 2026 Team Nogueira ABC. All Rights Reserved” em Poppins 300, 22px, branco. Fundo: gradiente `linear-gradient(111deg, #FF0000 0%, #640200 100%)` nas modalidades; **#424242 (fundo do tema) na home** | computado |

## Badges / selos
NÃO ENCONTRADO. O site não tem badges nem etiquetas. O mais próximo são os `<span>` de destaque com `border-radius: 12px; padding: 4px 10px`, mas eles não têm fundo, então o efeito visual é só a cor do texto.

## Banners
Os “banners” do site são imagens prontas (hero, “NEVER QUIT.”, grade de aulas `Academia-de-Lutas-Santo-Andre--724x1024.png`), não componentes CSS. A grade de aulas usa fundo cinza texturizado, cabeçalho “TRAINING TEAM NOGUEIRA”, células escuras arredondadas e fotos recortadas. É uma peça gráfica à parte (não baixada; ver `pendencias.md`).

## Breakpoints e grid
- Container máximo de **1140px** no desktop, 1024px no tablet e 767px no mobile (`post-5.css`).
- Breakpoints: `max-width: 767px` (mobile) e `max-width: 1024px` (tablet).
- Espaço entre widgets: 20px. Padding de seção: 80px 50px no desktop e 20px nas laterais no mobile.
