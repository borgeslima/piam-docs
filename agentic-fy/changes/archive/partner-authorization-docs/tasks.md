# Tasks — partner-authorization-docs

Plano incremental. Escopo: apenas documentação (site estático em `docs/`).

- [x] 1. Tema Dark/Light no CSS
  - Reorganizar `assets/style.css`: paleta base + `[data-theme="dark"]` (default) e
    `[data-theme="light"]` com variáveis equivalentes e bom contraste.
  - Adicionar transições suaves de cor em `body`, `.sidebar`, `.card`, `.endpoint`.

- [x] 2. Toggle de tema (JS mínimo)
  - Criar `assets/theme.js`: aplica tema de `localStorage` ou `prefers-color-scheme`;
    função de alternância que persiste a escolha.
  - Adicionar script inline curto no `<head>` das páginas para evitar flash.
  - Incluir botão de toggle (sol/lua) na sidebar.

- [x] 3. Componentes de layout reutilizáveis
  - CSS para `.rfc`/`.rfc-badge` (referências normativas), `.seq` (sequência textual) e
    `.tree` (árvore de pacotes).
  - Ajustes finos de tipografia/espaçamento em `.content`, `pre`, tabelas e callouts.

- [x] 4. Página de autorização de parceiro (`autorizacao.html`)
  - Visão geral + fluxo E2E em etapas (`.flow`) + diagrama de sequência (`.seq`).
  - Tabela de escopos/perfis por canal coerente com o OLTP.
  - Links cruzados para endpoints e persistência.

- [x] 5. Seção de referências RFC
  - Blocos `.rfc` para RFC 6749, 6750, 7519, 8693, 7636 e OIDC Core, com link oficial e
    explicação de aplicação ao PIAM (sem reproduzir texto das RFCs).

- [x] 6. Área de implementação (`implementacao.html`)
  - Estrutura hexagonal em `.tree` (domain / application / adapters in/out).
  - Exemplos ilustrativos Spring Boot + Spring Data JPA: entidades a partir do DDL, port de
    entrada/saída, adaptador JPA e controller do Token Exchange.
  - Callout deixando claro que é conteúdo ilustrativo (documentação).

- [x] 7. Navegação e consistência
  - Atualizar a sidebar de todas as páginas com os novos links (Autorização, Referências,
    Implementação) e o toggle de tema.
  - Revisão final: consistência da marca PIAM, links internos, contraste em ambos os temas.
