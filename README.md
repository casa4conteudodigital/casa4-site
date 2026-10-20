# Casa4 — nova versão em Next.js

Site institucional da **Casa4 Conteúdo Digital**, inspirado no site atual e construído com Next.js 16.3.8, React 19.3 e TypeScript.

## O que está incluído

- Duas páginas: **Home** e **Portfólio**.
- Português, inglês e espanhol, com textos próprios para cada idioma.
- Botões PT / EN / ES que mantêm a página atual ao trocar de idioma.
- Preferência de idioma salva no navegador; português como padrão.
- Paleta original: preto, azul profundo, azul-ciano e amarelo.
- Imagens originais fornecidas, incluindo os quatro projetos e a equipe.
- Animações de entrada, faixa animada, selo em rotação e efeitos de interação.
- Respeito à preferência do sistema por movimentos reduzidos.
- Serviços em acordeão; portfólio com filtros e detalhes em uma janela acessível.
- Navegação por teclado, foco visível, menu para celular e fechamento por Escape.
- Contato pelo WhatsApp do site original: **+55 (11) 2887-7172**.
- Títulos e descrições por idioma, links canônicos, hreflang, robots e sitemap.
- Fontes locais Manrope e Space Grotesk, com licenças incluídas.

## Atualização de acessibilidade e equipe

O selo da Home permanece amarelo e giratório, agora com **CASA4** no centro e sem a estrela de fundo.

O botão com o símbolo de acessibilidade no cabeçalho abre um painel próprio do site, sem widgets de terceiros. Nele é possível:

- Escolher o tema **escuro**, **claro** ou **automático**, que acompanha a preferência do sistema.
- Ajustar o tamanho do texto de **100% a 200%**.
- Alternar entre as fontes **originais**, **Arial** e **Verdana**.
- Reduzir as animações, além do respeito às preferências do sistema.
- Ativar ou desativar os atalhos de teclado.
- Restaurar as preferências iniciais.

As escolhas ficam salvas no próprio navegador e são mantidas ao trocar de página ou idioma. Se o navegador bloquear o armazenamento, os controles continuam funcionando durante a visita. O tema inicial permanece escuro, como na versão aprovada.

| Atalho | Ação |
|---|---|
| `Alt + Shift + A` | Abrir o painel de acessibilidade |
| `Alt + Shift + M` | Ir para o conteúdo principal |
| `Alt + Shift + N` | Ir para a navegação; abrir o menu no celular |
| `Alt + Shift + P` | Abrir o Portfólio no idioma atual |
| `Alt + Shift + C` | Ir para o contato |
| `Alt + Shift + T` | Alternar entre claro e escuro |
| `Escape` | Fechar o painel ou os detalhes de um projeto |

Os atalhos não atuam em campos de edição nem retiram o foco de outro diálogo. O painel também pode ser aberto com o mouse, toque ou navegação por Tab, e informa os atalhos disponíveis.

A equipe agora identifica **Vinicius Puttini — Creative Director** e **Ultra Logic — IT Director**, com os cargos e as descrições nos três idiomas. A segunda foto foi substituída pelo logotipo original da Ultra Logic fornecido para esta atualização. O logo é exibido inteiro, em cinza por padrão, e recebe as cores originais ao passar o mouse, com o mesmo filtro e a mesma transição suave da foto de Vinicius Puttini.

## Estrutura do ZIP

```text
Casa4-Nextjs/
  src/                  Código-fonte do site
  public/               Imagens, fontes e favicon
  scripts/              Comandos portáveis de desenvolvimento e exportação
  out/                  Versão estática já compilada
  package.json          Dependências e comandos
  package-lock.json     Versões exatas das dependências
  next.config.ts        Configuração do Next.js
  README.md             Estas instruções
  VALIDACAO.md          Verificações realizadas e seu alcance
```

`node_modules` e a pasta de trabalho `.next` não estão no ZIP. Eles são recriados pelos comandos abaixo.

## Executar o projeto

Requisito: **Node.js 20.9 ou superior**. A entrega foi compilada com Node.js 24.

Extraia o ZIP, abra um terminal dentro de `Casa4-Nextjs` e execute:

```bash
npm ci
npm run dev
```

Abra **http://localhost:3000**. Para escolher outra porta:

```bash
npm run dev -- --port 3001
```

A instalação precisa de acesso à internet para baixar as dependências. As imagens e fontes do site são locais.

## Produção com Next.js

Em uma hospedagem com suporte a Node.js / Next.js:

```bash
npm ci
npm run build
npm run start
```

Em serviços que detectam Next.js, use `npm run build` como comando de compilação e mantenha o diretório raiz do projeto como `Casa4-Nextjs`.

## Hospedagem estática

A pasta **out/** já contém uma versão pronta para servir em uma hospedagem de arquivos estáticos. Publique **o conteúdo de out/** na raiz do domínio, preservando as subpastas, inclusive `_next`.

Para gerar novamente essa versão após editar o site:

```bash
npm ci
npm run build:static
```

Esse comando funciona também no Windows e recria `out/`. Nessa modalidade, as imagens usam os arquivos locais, sem um servidor de otimização do Next.js.

Para visualizar a versão estática localmente, sirva a pasta por HTTP. Caso tenha Python instalado:

```bash
python -m http.server 8080 --directory out
```

Abra **http://localhost:8080**. Evite abrir `index.html` diretamente com `file://`, pois os caminhos do site partem da raiz do domínio.

Depois de usar `build:static`, execute novamente `npm run build` antes de usar `npm run start`, pois são modalidades diferentes.

## Páginas e idiomas

| Idioma | Home | Portfólio |
|---|---|---|
| Português | `/pt/` | `/pt/portfolio/` |
| Inglês | `/en/` | `/en/portfolio/` |
| Espanhol | `/es/` | `/es/portfolio/` |

Os endereços `/` e `/portfolio/` encaminham no navegador para o idioma escolhido. Sem JavaScript, exibem o conteúdo em português, com os links de idioma disponíveis.

É possível abrir um projeto diretamente no Portfólio:

- `/pt/portfolio/#basirly`
- `/pt/portfolio/#batidas-rimas`
- `/pt/portfolio/#show-english`
- `/pt/portfolio/#arca-lux`

## Personalizar

| O que alterar | Arquivo |
|---|---|
| Textos dos três idiomas | `src/lib/i18n.ts` |
| Projetos, categorias, imagens e descrições | `src/lib/projects.ts` |
| Domínio, telefone e mensagens do WhatsApp | `src/lib/site.ts` |
| Paleta, medidas, animações e regras responsivas | `src/app/globals.css` |
| Conteúdo e estrutura da Home | `src/components/home.tsx` |
| Conteúdo e estrutura do Portfólio | `src/components/portfolio.tsx` |
| Filtros e janela de detalhes | `src/components/portfolio-gallery.tsx` |
| Cabeçalho e troca de idioma | `src/components/header.tsx` |
| Painel de acessibilidade | `src/components/accessibility.tsx` |
| Preferências, temas e atalhos | `src/lib/accessibility-preferences.ts` |
| Textos do painel nos três idiomas | `src/lib/accessibility-i18n.ts` |
| Imagens originais | `public/images/` |

A paleta escura está concentrada nas variáveis no início de `globals.css`. O seletor `html[data-theme='light']`, no mesmo arquivo, define o tema claro:

```css
--background: #080d12;
--navy: #070a23;
--blue: #27b0e1;
--yellow: #f4c53e;
```

O nome do livro e os nomes das marcas permanecem no original nos três idiomas. As descrições foram reescritas com base nos serviços e projetos apresentados no site atual, sem métricas, depoimentos ou resultados inventados. Os nomes, cargos e descrições da equipe foram fornecidos pelo cliente nesta atualização; a versão em inglês mantém a redação solicitada. O logotipo da Ultra Logic foi incluído sem modificar a imagem original.

O contato é um link direto para o WhatsApp. Não há um formulário que dependa de servidor, cadastro ou serviço externo de envio de mensagens.

## Verificar após editar

```bash
npm run typecheck
npm run build
```

Antes de substituir o site do domínio, confira os textos, o número do WhatsApp e a apresentação visual em um navegador de desktop e em um celular. Veja também `VALIDACAO.md`.
