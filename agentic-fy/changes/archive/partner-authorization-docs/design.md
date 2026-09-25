# Design — partner-authorization-docs

## Context
- Site de documentação estático em `docs/`: `index.html` (introdução), `endpoints.html`,
  `arquitetura.html` (OLTP), com `assets/style.css` compartilhado. Marca atual:
  **BIAM (PIAM)**.
- O CSS já centraliza cores em `:root` (variáveis CSS), o que facilita adicionar um tema
  claro via seletor de atributo sem reescrever regras.
- Restrição do usuário: **apenas documentação**. Os exemplos Spring Boot são conteúdo
  ilustrativo renderizado em blocos `<pre><code>`, não um projeto compilável.
- Nenhuma dependência ou tooling novo deve ser introduzido (sem Node/bundler). JS mínimo,
  vanilla, inline ou em `assets/theme.js`.

## Architecture

### 1. Tema Dark/Light
- Mover as cores atuais para um bloco base e definir dois conjuntos de variáveis:
  - `:root` / `[data-theme="dark"]`: paleta escura atual (default).
  - `[data-theme="light"]`: paleta clara equivalente (bg claro, texto escuro, mantendo o
    vermelho de destaque `--accent`).
- `assets/theme.js`: lê `localStorage.theme`; se ausente, usa `prefers-color-scheme`.
  Aplica `document.documentElement.dataset.theme`. Botão de toggle na sidebar (ícone
  sol/lua) alterna e persiste. Script pequeno e carregado no `<head>` para evitar flash.
- Transições suaves de cor em `body`, cards, sidebar (`transition: background/color`).

### 2. Refinamento de layout
- Ajustes tipográficos e de espaçamento no `.content`; melhorar `pre`/tabelas/callouts.
- Novos componentes CSS reutilizáveis:
  - `.rfc` / `.rfc-badge`: bloco de referência normativa com número da RFC e link.
  - `.seq`: diagrama de sequência textual (lista de trocas ator → sistema).
  - `.tree`: árvore de pacotes para a estrutura hexagonal.
  - `.tabs` opcional (CSS puro) para alternar linguagens/camadas — só se necessário.
- Sidebar ganha o toggle de tema e um agrupamento de navegação atualizado.

### 3. Página de autorização de parceiro (`autorizacao.html`)
Seções:
- Visão geral (Portais de Parceiros / Multi-Tenant, IDP, Token Exchange).
- Fluxo E2E em etapas (`.flow` já existe): Identificação de tenant → SSO (Cognito + Entra
  ID) → Token Exchange → Token de aplicação com scopes/canais.
- Diagrama de sequência textual (`.seq`).
- Escopos e perfis por canal (tabela), coerente com `perfil.scope` do OLTP
  (`baas:portal-whitelabel:*`, `baas:portal-developer:*`).
- Links cruzados para `endpoints.html` e `arquitetura.html`.

### 4. Referências RFC
- Seção "Referências normativas" com blocos `.rfc` citando e explicando a aplicação:
  - RFC 6749 (OAuth 2.0), RFC 6750 (Bearer), RFC 7519 (JWT), RFC 8693 (Token Exchange),
    RFC 7636 (PKCE), OIDC Core.
- Cada bloco: número, título, link oficial (ietf.org / openid.net) e 1–2 linhas de como se
  aplica ao BIAM. Atribuição por link, sem reproduzir texto das RFCs.

### 5. Área de implementação (`implementacao.html`)
- Estrutura hexagonal (ports & adapters) em `.tree`:
  - `domain` (modelo + regras), `application` (casos de uso + ports), `adapters/in`
    (REST controllers), `adapters/out` (JPA repositories, IDP client).
- Exemplos ilustrativos em Java (Spring Boot + Spring Data JPA):
  - Entidades JPA derivadas do DDL: `Pessoa`, `PessoaIdp`, `Usuario`, `Canal`, `Perfil`,
    `UsuarioPerfilAcesso`, `Tenant`, `ProdutoContratado`.
  - Port de entrada `AutorizarParceiroUseCase`, port de saída
    `AutorizacaoRepositoryPort`, adaptador JPA e controller do Token Exchange.
- Nota explícita de que é ilustrativo (documentação, não código compilável).

## Alternatives considered
- Option A — Adotar um gerador de site (MkDocs/Docusaurus): melhor DX de longo prazo, mas
  introduz tooling/build fora do escopo "apenas documentação" e reescreve o que já existe.
  **Rejeitado.**
- Option B — Evoluir o HTML/CSS estático atual (escolhida): baixo atrito, consistente com o
  que já está no repositório, sem dependências novas. **Escolhido.**
- Tema: classe `.light` no body vs `data-theme` no `<html>`. Escolhido `data-theme` no
  `<html>` por evitar flash e ser padrão comum.

## Risks
- Flash de tema errado no carregamento / mitigação: script de tema inline no `<head>`,
  antes do CSS pintar o conteúdo.
- Contraste insuficiente no tema claro / mitigação: revisar cores de texto, bordas e
  callouts para contraste adequado (alvo WCAG AA); validação completa de acessibilidade
  exige teste manual, fora do escopo automatizado.
- Exemplos de código serem confundidos com projeto real / mitigação: callout de aviso e
  seção introdutória deixando claro que é ilustrativo.
- Duplicação de sidebar em várias páginas / mitigação: manter o markup de navegação
  idêntico entre páginas e alterar todas ao adicionar links.
