## ADDED Requirements

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
