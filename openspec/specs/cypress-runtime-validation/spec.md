# cypress-runtime-validation Specification

## Purpose
TBD - created by archiving change atualiza-valida-projetos-node. Update Purpose after archive.
## Requirements
### Requirement: Configuração Cypress
O projeto SHALL incluir Cypress configurado para executar testes funcionais da aplicação no ambiente Docker.

#### Scenario: Scripts de teste end-to-end
- **WHEN** Cypress é adicionado ao projeto
- **THEN** `app/package.json` SHALL expor scripts compatíveis com Yarn para abrir ou executar a suíte end-to-end

#### Scenario: Execução contra aplicação servida
- **WHEN** os testes Cypress são executados
- **THEN** a suíte SHALL apontar para a aplicação servida na porta configurada do projeto

### Requirement: Cobertura funcional do gerador de senhas
A suíte Cypress SHALL cobrir os principais fluxos operacionais do gerador de senhas.

#### Scenario: Geração inicial de senha
- **WHEN** a aplicação é carregada
- **THEN** uma senha SHALL ser exibida com configuração padrão válida

#### Scenario: Alteração de comprimento
- **WHEN** o usuário altera o comprimento da senha
- **THEN** a senha gerada SHALL respeitar o novo comprimento

#### Scenario: Seleção de classes de caracteres
- **WHEN** o usuário habilita ou desabilita letras minúsculas, letras maiúsculas, números ou caracteres especiais
- **THEN** a senha gerada SHALL respeitar as classes selecionadas

#### Scenario: Quantidades mínimas
- **WHEN** o usuário define mínimos para números ou caracteres especiais
- **THEN** a senha gerada SHALL conter pelo menos as quantidades mínimas configuradas

#### Scenario: Regeneração de senha
- **WHEN** o usuário solicita uma nova senha
- **THEN** a aplicação SHALL atualizar o valor exibido sem erro de interface

#### Scenario: Cópia para área de transferência
- **WHEN** o usuário aciona a cópia da senha
- **THEN** a aplicação SHALL executar o fluxo de cópia e exibir feedback visual ao usuário

### Requirement: Validação de build
O processo SHALL validar que a aplicação compila com sucesso após atualizações.

#### Scenario: Build no container
- **WHEN** as dependências e testes são configurados
- **THEN** `yarn build` SHALL concluir no container com zero erros

### Requirement: Validação de inicialização e logs
O processo SHALL inicializar a aplicação no ambiente nativo e inspecionar logs de execução.

#### Scenario: Inicialização estável
- **WHEN** a aplicação é iniciada via Docker Compose
- **THEN** o processo SHALL confirmar que o servidor fica disponível na porta configurada

#### Scenario: Logs sem exceções de runtime
- **WHEN** os logs de `stdout` e `stderr` são coletados após a inicialização
- **THEN** os logs SHALL NOT conter exceções, stack traces, falhas de bind ou erros de inicialização

### Requirement: Verificação funcional do build de produção após atualização de dependências

O processo SHALL verificar o funcionamento do gerador no build de produção servido em container após atualizações de dependências.

#### Scenario: Fluxos do gerador no build de produção

- **WHEN** o build atualizado é servido em container no contexto seguro exigido pelas APIs do navegador
- **THEN** a suíte Cypress SHALL confirmar geração inicial, comprimento, seleção de classes, mínimos de caracteres, regeneração e feedback de cópia
- **AND** a verificação SHALL confirmar que os controles essenciais permanecem visíveis e utilizáveis em dimensões de desktop e mobile

#### Scenario: Cópia real pelo navegador

- **WHEN** o usuário aciona a cópia em um navegador com acesso à área de transferência
- **THEN** a senha colada em um campo de teste SHALL corresponder à senha exibida no momento da cópia
- **AND** a verificação SHALL usar a área de transferência real do navegador e confirmar o feedback visual
