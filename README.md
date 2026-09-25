# BIAM (PIAM) — Documentação

Documentação da **Estratégia de Autorização e Autenticação** para
aplicações parceiras (Portais de Parceiros / Multi-Tenant, White Label).

O processo combina a identificação dinâmica de tenant, a federação de identidade via IDP
externo e o **Token Exchange no Axway API Gateway** para emissão do token de aplicação.
O microsserviço BIAM atua como **policy de validação**: valida se o IDP subject é válido e
se o e-mail existe, retornando tenant, canais e escopos. A emissão do token é feita pelo
Axway, não pelo código.

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Introdução: visão geral, camadas da aplicação e conceitos-chave. |
| `autorizacao.html` | Processo de autorização de parceiro: fluxo E2E, diagrama de sequência, escopos/perfis por canal e referências RFC. |
| `endpoints.html` | Endpoints REST: identificação de tenant, módulos por tenant, validação de autorização e CRUDs. |
| `arquitetura.html` | Persistência e controle de acesso (OLTP): DDL, seeds e queries de apoio. |
| `implementacao.html` | Implementação ilustrativa em Spring Boot + Spring Data JPA com arquitetura hexagonal. |




