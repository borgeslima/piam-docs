# Proposal — partner-authorization-docs

## Why
A documentação BIAM (Partner IAM) hoje cobre endpoints e persistência (OLTP), mas
falta uma página que descreva de ponta a ponta o **processo de autorização de parceiro**
(identificação de tenant → autenticação SSO/IDP → Token Exchange → emissão do token de
aplicação com scopes/canais). Além disso, o site é apenas dark, o layout pode ser mais
polido, não há referências normativas (RFCs) e não existe uma área mostrando como o
processo se traduz em código (Spring Boot + Spring Data JPA em arquitetura hexagonal).

Este change é **exclusivamente de documentação** (site estático HTML/CSS). Não há
implementação de backend real; os trechos de código Spring Boot são ilustrativos, dentro
das páginas de documentação.

## What
Evoluir o site de documentação estático (`docs/`) com:

1. **Página de processo de autorização de parceiro** (`autorizacao.html`): fluxo E2E em
   etapas, diagrama de sequência textual, escopos/perfis por canal, e mapeamento para o
   modelo OLTP e endpoints já documentados.
2. **Tema Dark/Light** com alternância persistida (toggle na sidebar, `data-theme` +
   `localStorage`, respeitando `prefers-color-scheme`).
3. **Refinamento de layout**: tipografia, espaçamentos, tabela de conteúdo, componentes
   visuais (badges de RFC, blocos de referência), transições suaves.
4. **Referências RFC**: seção citando as RFCs relevantes (OAuth 2.0 Token Exchange
   RFC 8693, OAuth 2.0 RFC 6749, Bearer Token RFC 6750, JWT RFC 7519, PKCE RFC 7636,
   OIDC) com links oficiais e como cada uma se aplica ao fluxo.
5. **Área de implementação (Spring Boot / JPA / Hexagonal)** (`implementacao.html`):
   estrutura de pacotes hexagonal (domain / application / adapters), portas e adaptadores,
   entidades JPA a partir do DDL existente, e um exemplo do caso de uso de autorização.

## Scope
- In scope:
  - Novas páginas HTML de documentação: `autorizacao.html`, `implementacao.html`.
  - Página de referências RFC (seção dedicada, dentro de `autorizacao.html` ou página
    própria `referencias.html`).
  - Suporte a tema claro/escuro no `assets/style.css` + pequeno JS de toggle.
  - Ajustes de layout/estilo compartilhados e atualização da navegação (sidebar) em todas
    as páginas.
- Out of scope:
  - Qualquer backend executável, build Java/Maven, banco de dados real ou testes de código.
  - Alterar o contrato dos endpoints ou o modelo de dados já documentado (apenas referenciar).
  - Frameworks de site (Docusaurus, MkDocs) — mantém-se HTML/CSS estático já existente.
