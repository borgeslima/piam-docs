# partner-authorization-docs

## Purpose
Documentação estática (HTML/CSS) do processo de autorização de parceiro do PIAM (Partner IAM), incluindo tema claro/escuro, referências normativas (RFCs) e uma área ilustrativa de implementação em Spring Boot com arquitetura hexagonal. Escopo restrito a documentação; nenhum backend executável.

## Requirements

### Requirement: Página do processo de autorização de parceiro {#partner-authorization-flow-page}
A documentação SHALL apresentar uma página descrevendo o processo de autorização de parceiro de ponta a ponta (identificação de tenant, autenticação via IDP, Token Exchange e emissão do token de aplicação com scopes e canais).

#### Scenario:
- WHEN o leitor abre a página de autorização de parceiro
- THEN vê o fluxo E2E em etapas e um diagrama de sequência das trocas entre ator e sistema

#### Scenario:
- WHEN o leitor consulta os escopos e perfis
- THEN vê uma tabela de scopes por canal coerente com o modelo OLTP documentado

### Requirement: Alternância de tema claro/escuro {#dark-light-theme}
O site de documentação SHALL oferecer temas claro e escuro com alternância manual, respeitando a preferência do sistema por padrão e persistindo a escolha do usuário.

#### Scenario:
- WHEN o usuário visita o site sem preferência salva
- THEN o tema segue a preferência do sistema operacional (prefers-color-scheme)

#### Scenario:
- WHEN o usuário aciona o botão de alternância de tema
- THEN o tema muda imediatamente e a escolha é lembanka nas próximas visitas

#### Scenario:
- WHEN uma página carrega com um tema salvo
- THEN o tema é aplicado sem flash de cor incorreta

### Requirement: Referências normativas (RFCs) {#rfc-references}
A documentação SHALL incluir referências às RFCs relevantes ao fluxo de autorização, com link oficial e explicação de como cada uma se aplica ao PIAM, sem reproduzir o texto das RFCs.

#### Scenario:
- WHEN o leitor consulta a seção de referências
- THEN encontra ao menos RFC 6749, 6750, 7519 e 8693 com links oficiais e nota de aplicação

### Requirement: Área de implementação Spring Boot hexagonal (ilustrativa) {#hexagonal-implementation-area}
A documentação SHALL apresentar uma área ilustrativa mostrando a implementação do processo em Spring Boot com Spring Data JPA e arquitetura hexagonal (portas e adaptadores), deixando claro que o conteúdo é ilustrativo e não um projeto compilável.

#### Scenario:
- WHEN o leitor abre a área de implementação
- THEN vê a estrutura de pacotes hexagonal e exemplos de domínio, casos de uso, ports e adaptadores JPA

#### Scenario:
- WHEN o leitor visualiza os exemplos de código
- THEN há um aviso explícito de que o código é ilustrativo para fins de documentação

### Requirement: Restrição de escopo somente documentação {#docs-only-constraint}
Este change SHALL alterar apenas artefatos de documentação (HTML, CSS, JS de UI do site) e NÃO SHALL introduzir backend executável, build Java/Maven, banco de dados ou dependências de tooling de site.

#### Scenario:
- WHEN os arquivos do change são revisados
- THEN apenas arquivos sob docs/ (páginas, estilos e script de tema) foram criados ou modificados
