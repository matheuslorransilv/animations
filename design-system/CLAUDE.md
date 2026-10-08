# Instruções para sessões futuras — marca TEAM NOGUEIRA

**Antes de gerar qualquer vídeo, post ou arte da TEAM NOGUEIRA, leia esta pasta e use SOMENTE os tokens daqui.**

## Ordem de leitura obrigatória
1. `README.md`: visão geral.
2. `regras-para-video.md`: para qualquer vídeo, sobretudo Reels 1080×1920.
3. `tokens.json` / `tokens.css`: valores. **Única fonte** de cor, fonte, espaçamento, raio, sombra e movimento.
4. `voz-da-marca.md`: antes de escrever qualquer texto.
5. `pendencias.md`: o que ainda não está decidido.
6. `assets/MANIFESTO.md`: antes de escolher um logo ou uma imagem.

## Regras
- **Cores:** só `--tn-cor-*` e `--tn-gradiente-*`. Nenhum HEX escrito à mão que não esteja em `tokens.json → cor`. Nunca use o que está em `cor-nao-usar`.
- **Fontes:** só Poppins e Montserrat, carregadas de `assets/fonts/` (o `tokens.css` já tem os `@font-face`). Não use fontes do sistema, Google Fonts remoto nem fontes “parecidas”. Antes do primeiro frame, espere `document.fonts.ready`.
- **Logo:** só os arquivos de `assets/logo/`, na versão certa para o fundo (ver `MANIFESTO.md`). Nunca redesenhe, vetorize por conta própria, distorça, recolora ou aplique efeitos.
- **Textos:** siga `voz-da-marca.md`: títulos em caixa alta, uma ou duas palavras de destaque, CTA literal “AGENDAR AULA GRATUITA →”. Não invente slogans novos como se fossem oficiais.
- **Tokens “proposta”** (movimento, escala de vídeo, regras do logo em vídeo) podem ser usados, mas **não** devem ser apresentados como valores do site.
- **Se faltar algo** (cor, fonte, ícone, versão de logo), **não preencha com um valor provável**: pare, registre em `pendencias.md` e pergunte.
- **Valide** cada peça com a checklist de 10 itens em `regras-para-video.md` §8, além do loop de contact sheet do `CLAUDE.md` da raiz.
- Esta pasta é a referência da marca: **não altere tokens** sem nova extração do site (com origem e data) ou sem decisão humana registrada em `pendencias.md`.

## Uso rápido em um filme (`films/<nome>/index.html`)
```html
<link rel="stylesheet" href="../../design-system/tokens.css">
<style>
  .titulo { font-family: var(--tn-tipo-titulo-secao-familia); font-weight: var(--tn-tipo-titulo-secao-peso);
            font-style: var(--tn-tipo-titulo-secao-estilo); text-transform: var(--tn-tipo-titulo-secao-caixa);
            letter-spacing: var(--tn-tipo-titulo-secao-espacamento-letras); line-height: var(--tn-tipo-titulo-secao-altura-linha);
            color: var(--tn-cor-branco); }
  .titulo em { font-style: inherit; color: var(--tn-cor-carmim-destaque); }
  .cena-marca { background: var(--tn-cor-vermelho-marca); }
</style>
```
Logo: `../../design-system/assets/logo/LOGO-VERMELHO-E-BRANCO.png` (fundo escuro).
