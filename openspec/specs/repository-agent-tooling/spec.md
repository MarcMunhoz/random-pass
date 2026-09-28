# Especificação do tooling de agentes do repositório

## Purpose

Define como agentes descobrem e aplicam as instruções, os workflows OpenSpec e o uso do RTK no repositório, com autoridade única, lifecycle verificável e proteção do acervo existente.

## Requirements

### Requirement: Orientação autoritativa na raiz
O repositório SHALL manter `AGENTS.md` como ponto de entrada contendo somente `@RTK.md` e SHALL manter em `RTK.md` todas as orientações locais e de execução com RTK.

#### Scenario: Descoberta das instruções do repositório
- **WHEN** um agente inicia trabalho a partir da raiz do repositório
- **THEN** ele SHALL encontrar em `AGENTS.md` somente a referência direta a `RTK.md` e SHALL obter deste arquivo as regras aplicáveis

#### Scenario: Consolidação das regras legadas
- **WHEN** as regras aplicáveis forem incorporadas a `RTK.md`
- **THEN** o repositório SHALL NOT manter `.agents/rules/` como segunda fonte de orientação

### Requirement: Skills OpenSpec em localização canônica
O repositório SHALL disponibilizar em `.agents/skills/` os cinco workflows OpenSpec de exploração, proposta, aplicação, sincronização e arquivamento, preservando seu comportamento funcional e sem cópias legadas.

#### Scenario: Descoberta dos workflows OpenSpec
- **WHEN** um agente inspeciona as skills específicas do repositório
- **THEN** ele SHALL encontrar exatamente os cinco workflows OpenSpec sob `.agents/skills/`

#### Scenario: Ausência de duplicatas legadas
- **WHEN** a migração das skills estiver concluída
- **THEN** o repositório SHALL NOT manter cópias equivalentes sob `.codex/skills/`

### Requirement: Lifecycle OpenSpec com sincronização obrigatória
As orientações do repositório SHALL documentar o lifecycle `propose → apply → sync → archive` e SHALL exigir que as delta specs sejam sincronizadas com as specs principais antes do arquivamento de uma change.

#### Scenario: Change com delta specs pronta para arquivamento
- **WHEN** uma change concluída contém delta specs
- **THEN** o workflow SHALL sincronizar as alterações aplicáveis nas specs principais antes de mover a change para o histórico

#### Scenario: Documentação do fluxo completo
- **WHEN** um agente consulta as instruções para trabalhar com OpenSpec
- **THEN** ele SHALL encontrar a sequência completa desde a proposta até o arquivamento

### Requirement: Preservação do acervo e do runtime
A migração do tooling SHALL preservar as specs principais, o histórico arquivado e o comportamento da aplicação, sem alterar dependências ou ativos gerados.

#### Scenario: Verificação do acervo após a migração
- **WHEN** a nova estrutura de agentes estiver pronta
- **THEN** as specs principais e as changes arquivadas existentes SHALL permanecer semanticamente inalteradas

#### Scenario: Limite do escopo de implementação
- **WHEN** a change for aplicada
- **THEN** nenhum arquivo de runtime da aplicação, dependência ou ativo gerado SHALL ser modificado

### Requirement: Artefatos livres de dados específicos da máquina
Os pontos de entrada, as skills migradas e os artefatos da change SHALL NOT conter caminhos locais absolutos, credenciais, segredos ou identificadores específicos da máquina.

#### Scenario: Revisão de conteúdo antes da conclusão
- **WHEN** os arquivos novos e migrados forem verificados
- **THEN** a inspeção SHALL confirmar a ausência de dados sensíveis e referências específicas do ambiente local
