# Movimento — TEAM NOGUEIRA

Tokens: `tokens.json → movimento.extraido` e `movimento.proposta`; variáveis `--tn-movimento-extraido-*` e `--tn-movimento-proposta-*`.

> **Conclusão da extração:** o site tem **pouquíssimo movimento**. Não há animações de entrada, de scroll, parallax nem `@keyframes` próprios. Só existem transições de hover de 0.3s e um carrossel. Por isso, quase toda a linguagem de motion para vídeo abaixo é **PROPOSTA**: derivada do tom visual, **não extraída**.

## 1. EXTRAÍDO do site

| Token | Valor | Onde | Origem | Confiança |
|---|---|---|---|---|
| `duracao-padrao` | **0.3s** | background, borda, raio, sombra e cor de praticamente todos os elementos (830+ ocorrências computadas); cor dos ícones do menu; todos os botões (`transition: all 0.3s`) | computado + `post-*.css` | alto |
| `duracao-transform` | **0.4s** | `transform` dos containers flex do Elementor (sem efeito visível: nenhum transform é aplicado) | computado | alto |
| `easing-padrao` | **ease** | todas as transições | computado | alto |
| `hover-grow-escala` | **scale(1.1)** em 0.3s | botão “ENCONTRE SUA FOTO” do Sparring Day (`elementor-animation-grow`) | `e-animation-grow.min.css` | alto |
| Hover de cor | link → #DA1011; ícone do menu #FF0000 → #FFFFFF; texto do menu → #FF0000; ícone social → opacidade 0.9 | cabeçalho, links | `post-5.css`, `post-14937.css`, hover medido | alto |
| Hover do CTA | gradiente 96° #FF0000→#CE002B troca para 93° #CE002B→#FF0000 (páginas de modalidade) | botão principal | `post-15329.css` | alto |
| `carrossel-autoplay` | **5000ms** por slide, pausa no hover/interação, loop infinito, 2 slides visíveis, setas + bolinhas | “CONHEÇA NOSSO ESPAÇO” (home) | `data-settings` do widget | alto |
| `carrossel-velocidade` | **500ms** de transição entre slides (Swiper 8) | idem | `data-settings` | alto |
| `animacao-entrada` | **nenhuma** | – | sem `_animation` no HTML; `animation-name: none` em todos os elementos | alto |

**Leitura de tom:** o movimento do site é funcional e discreto. A energia da marca está na imagem estática: itálico pesado, vermelho saturado, cortes diagonais (divisor em V, gradientes de 96° a 111°), colchetes em “L” e padrões de “x”.

## 2. PROPOSTA para motion graphics (não extraído)

Diretrizes para Reels e posts animados, compatíveis com o tom de “academia de luta”: direto, agressivo e com impacto. Cada item cita de onde foi derivado.

| Token (proposta) | Valor | Uso | Derivado de |
|---|---|---|---|
| `corte-duro` | 0ms | Troca de cena seca, no beat. Padrão entre cenas. | Tom “NEVER QUIT.” / ausência de fades no site |
| `entrada-rapida` | 300ms | Entrada de título ou bloco | `duracao-padrao` 0.3s do site |
| `entrada-impacto` | 200ms | Palavra de destaque “socando” na tela | proposta |
| `escala-impacto` | 1.1 | Pico do punch-in (1.1 → 1.0) | `hover-grow-escala` do site |
| `easing-saida` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entradas com deslocamento (desaceleração forte) | proposta |
| `easing-entrada` | `cubic-bezier(0.7, 0, 0.84, 0)` | Saídas (aceleração) | proposta |
| `deslocamento-diagonal` | −12° | Wipes e barras vermelhas inclinadas | itálico dos títulos + gradientes diagonais |

### Gestos propostos (vocabulário da marca)
1. **Wipe diagonal vermelho:** barra com `gradiente.botao-principal` cruzando a tela em −12°, revelando a próxima cena. Duração de 300ms com `easing-saida`.
2. **Golpe de palavra:** a palavra de destaque (#CD1F43 no escuro) entra com escala 1.1 → 1.0 em 200ms, no beat.
3. **Colchete em L:** linha vermelha #FF0000 de 2px (como a moldura do CTA) se desenha a partir do canto inferior esquerdo, ecoando os cards de modalidade.
4. **Chevron:** o divisor em V do site entra de cima, como transição para cenas de seção vermelha.
5. **Moldura do CTA:** na cena final, a moldura de 2px #FF0000 se desenha em volta do botão em 300ms, e depois o botão em gradiente aparece dentro dela.

### Não fazer
- Fade-in genérico de tudo (o site não tem isso e a regra do estúdio proíbe).
- Rotações, bounces “fofos”, elastic easing, partículas genéricas, brilhos/glow em UI.
- Animar o logo deformando o anel ou o símbolo (escala uniforme apenas).
- Motion que dure mais que 600ms para um único elemento: o tom é golpe, não flutuação.
