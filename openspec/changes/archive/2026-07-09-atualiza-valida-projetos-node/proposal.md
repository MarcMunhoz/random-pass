## Why

O projeto precisa de um processo estruturado para atualizar dependências Node.js, corrigir vulnerabilidades conhecidas e validar que a aplicação continua estável após as mudanças. Como o repositório já define execução em Docker com Node.js 22 e Yarn, a mudança deve preservar esse ambiente nativo e reduzir riscos por meio de validação automatizada.

## What Changes

- Introduz um fluxo operacional para detectar e respeitar o ambiente nativo do projeto antes de instalar, auditar, atualizar ou validar dependências.
- Define regras para atualizar Node.js apenas dentro da versão major vigente e preservar o gerenciador de pacotes e lockfile originais.
- Estabelece saneamento incremental de dependências diretas e transitivas, incluindo uso controlado de `resolutions` quando necessário para corrigir vulnerabilidades sem troca arbitrária de gerenciador.
- Adiciona Cypress como camada mandatória de validação funcional, cobrindo fluxos principais e cenários de regressão da aplicação.
- Exige validação final por build, execução real da aplicação no ambiente Docker e análise ativa de logs de inicialização.

## Capabilities

### New Capabilities

- `node-dependency-maintenance`: cobre identificação do ambiente Node.js, preservação de Yarn, atualização segura de runtime dentro da major atual e saneamento de dependências diretas e transitivas.
- `cypress-runtime-validation`: cobre instalação/configuração de Cypress, criação de testes funcionais extensivos e validação final por build, execução da aplicação e inspeção de logs.

### Modified Capabilities

Nenhuma.

## Impact

- Afeta `Dockerfile`, `docker-compose.yaml`, `app/package.json`, `app/yarn.lock` e possíveis arquivos de configuração de Cypress.
- Pode adicionar diretórios e arquivos de teste end-to-end dentro de `app/`.
- Pode alterar scripts de package manager para suportar auditoria, build e execução de testes, mantendo Yarn como fonte da verdade.
- Não altera arquitetura, framework, experiência visual, infraestrutura de deploy ou versão major do Node.js.
