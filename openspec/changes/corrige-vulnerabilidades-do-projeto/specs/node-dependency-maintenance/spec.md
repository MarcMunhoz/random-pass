## ADDED Requirements

### Requirement: Verificação local de vulnerabilidades
O processo SHALL executar a auditoria de dependências no container do projeto e SHALL tratar todos os advisories conhecidos de severidade moderada, alta ou crítica antes da conclusão da atualização.

#### Scenario: Advisory com versão corrigida
- **WHEN** a auditoria identifica uma vulnerabilidade moderada, alta ou crítica com versão corrigida compatível
- **THEN** o processo SHALL atualizar a dependência direta, a dependência transitiva ou a resolução correspondente e regenerar o lockfile Yarn

#### Scenario: Advisory sem versão corrigida
- **WHEN** a auditoria identifica uma vulnerabilidade sem versão corrigida publicada
- **THEN** o processo SHALL remover a cadeia vulnerável quando sua funcionalidade puder ser atendida sem ela ou SHALL registrar tecnicamente a impossibilidade e a mitigação aplicável

#### Scenario: Auditoria após o saneamento
- **WHEN** as atualizações e remoções planejadas forem concluídas
- **THEN** uma nova auditoria no container SHALL confirmar ausência de vulnerabilidades conhecidas de severidade moderada, alta ou crítica no conjunto instalado, salvo exceção explicitamente documentada

### Requirement: Dependências mínimas e classificadas
O projeto SHALL declarar como dependências diretas somente pacotes consumidos diretamente e SHALL classificar ferramentas exclusivas de desenvolvimento e build separadamente das dependências necessárias em runtime.

#### Scenario: Pacote usado apenas para fixar subdependência
- **WHEN** um pacote não é importado nem executado diretamente pela aplicação
- **THEN** ele SHALL ser removido das dependências diretas e, se ainda necessário, SHALL ser controlado por uma resolução Yarn específica e documentada

#### Scenario: Ferramenta exclusiva do ciclo de desenvolvimento
- **WHEN** um pacote é usado somente em lint, teste, build ou servidor de desenvolvimento
- **THEN** ele SHALL ser declarado como dependência de desenvolvimento

### Requirement: Alinhamento das ferramentas no container
O container SHALL usar as versões de ferramentas declaradas pelo projeto e SHALL NOT instalar globalmente uma segunda versão concorrente da mesma ferramenta.

#### Scenario: Execução do Vite
- **WHEN** o container inicia o servidor ou executa o build
- **THEN** ele SHALL usar a versão do Vite resolvida pelo lockfile Yarn
