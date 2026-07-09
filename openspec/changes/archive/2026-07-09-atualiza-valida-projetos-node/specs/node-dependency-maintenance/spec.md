## ADDED Requirements

### Requirement: Identificação do ambiente nativo
O processo SHALL identificar o ambiente nativo do projeto antes de executar instalação, auditoria, atualização, build ou testes.

#### Scenario: Projeto com Docker Compose
- **WHEN** o repositório contém `Dockerfile` e `docker-compose.yaml`
- **THEN** comandos de package manager, build e validação SHALL ser planejados para execução no container do projeto

#### Scenario: Gerenciador de pacotes existente
- **WHEN** o repositório contém `app/yarn.lock` e não contém lockfile ativo de outro gerenciador
- **THEN** o processo SHALL preservar Yarn como gerenciador de pacotes e `app/yarn.lock` como lockfile único

### Requirement: Restrição de major do Node.js
O processo SHALL manter o runtime Node.js dentro da major vigente do projeto.

#### Scenario: Atualização permitida de Node.js
- **WHEN** a imagem Docker usa Node.js 22
- **THEN** o processo SHALL permitir apenas atualizações patch ou minor dentro da major 22

#### Scenario: Atualização major fora do escopo
- **WHEN** uma correção exigir mudança para outra major de Node.js
- **THEN** o processo SHALL registrar a limitação e SHALL NOT aplicar a mudança major

### Requirement: Saneamento de dependências
O processo SHALL atualizar dependências diretas e transitivas de forma incremental para corrigir vulnerabilidades conhecidas sem trocar o gerenciador de pacotes.

#### Scenario: Vulnerabilidade corrigível em dependência direta
- **WHEN** uma dependência direta possui versão compatível que corrige vulnerabilidade conhecida
- **THEN** o processo SHALL atualizar a dependência e regenerar apenas o lockfile Yarn correspondente

#### Scenario: Vulnerabilidade corrigível em subdependência
- **WHEN** uma subdependência vulnerável possui versão compatível sem upgrade major disruptivo
- **THEN** o processo SHALL usar mecanismo compatível com Yarn, como `resolutions`, para fixar a versão corrigida

#### Scenario: Vulnerabilidade não corrigível dentro do escopo
- **WHEN** uma vulnerabilidade depende de mudança major de runtime, framework ou pacote incompatível com o escopo
- **THEN** o processo SHALL manter a estabilidade do projeto e registrar a pendência com justificativa técnica

### Requirement: Integridade de lockfile
O processo SHALL preservar a integridade dos artefatos de instalação.

#### Scenario: Instalação após atualização
- **WHEN** dependências são atualizadas
- **THEN** o repositório SHALL conter apenas o lockfile Yarn original atualizado e SHALL NOT conter `package-lock.json` ou `pnpm-lock.yaml`

#### Scenario: Lockfile corrompido ou instalação inconsistente
- **WHEN** a instalação falha por inconsistência física de cache ou artefatos instalados
- **THEN** o processo SHALL limpar artefatos reproduzíveis e reinstalar pelo Yarn no container, preservando `package.json` e `yarn.lock`
