## ADDED Requirements

### Requirement: Conciliação das fontes de avisos de segurança

A remediação SHALL conciliar os alertas do Dependabot e os avisos do Yarn por identificador e cadeia de dependências, considerando todas as severidades.

#### Scenario: Avisos compartilhados ou exclusivos de uma fonte

- **WHEN** os alertas do Dependabot são comparados com os resultados de `yarn audit` no container do projeto
- **THEN** a linha de base SHALL registrar cada aviso distinto, suas fontes, cadeias afetadas, versões instaladas e versões corrigidas disponíveis
- **AND** ocorrências em cadeias diferentes SHALL permanecer rastreáveis mesmo quando compartilham o mesmo aviso

#### Scenario: Verificação depois da atualização

- **WHEN** o lockfile atualizado é instalado de forma reproduzível e auditado no container
- **THEN** a verificação SHALL comparar o resultado com a linha de base e confirmar no lockfile, para cada cadeia corrigida, uma versão fora do intervalo vulnerável
- **AND** cada aviso remanescente SHALL ser registrado com impacto, motivo técnico e mitigação

### Requirement: Verificação das dependências da distribuição do Cypress

O processo SHALL verificar as dependências transitivas da distribuição do Cypress executada no Docker Compose e no gate de release separadamente das dependências do lockfile da aplicação.

#### Scenario: Dependência vulnerável na distribuição executada

- **WHEN** uma dependência afetada pelo levantamento está presente na distribuição do Cypress usada para executar os testes
- **THEN** a verificação SHALL identificar a versão efetivamente instalada nessa distribuição e confirmar a correção ou registrar o risco remanescente com justificativa e mitigação
