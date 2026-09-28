## 1. Registrar invariantes da migração

- [x] 1.1 Inventariar a regra legada, as cinco skills OpenSpec, as specs principais e as changes arquivadas antes das alterações.
- [x] 1.2 Registrar uma referência comparável do conteúdo das skills e do acervo OpenSpec para validar sua preservação após a migração.

## 2. Criar os pontos de entrada autoritativos

- [x] 2.1 Criar `AGENTS.md` na raiz contendo somente `@RTK.md`, sem regras locais adicionais.
- [x] 2.2 Criar `RTK.md` na raiz com as regras aplicáveis consolidadas, orientações de RTK e o lifecycle `propose → apply → sync → archive`.
- [x] 2.3 Comparar `RTK.md` com `.agents/rules/mandatory-rules.md` e confirmar que nenhuma regra aplicável foi omitida.

## 3. Migrar as skills OpenSpec

- [x] 3.1 Mover as cinco skills `openspec-*` de `.codex/skills/` para `.agents/skills/`, preservando nomes, metadados e conteúdo funcional.
- [x] 3.2 Atualizar a skill de arquivamento para tornar obrigatória a sincronização das delta specs antes do arquivamento.
- [x] 3.3 Confirmar que `.agents/skills/` contém exatamente os cinco workflows esperados e que não restaram cópias sob `.codex/skills/`.

## 4. Remover estruturas legadas

- [x] 4.1 Remover `.agents/rules/mandatory-rules.md` após confirmar a consolidação das regras.
- [x] 4.2 Remover diretórios legados vazios de `.agents/rules/` e `.codex/skills/` sem afetar outras configurações.

## 5. Validar escopo e integridade

- [x] 5.1 Validar a change e a nova capability com o OpenSpec.
- [x] 5.2 Comparar o conteúdo migrado das cinco skills com a referência inicial, aceitando somente o ajuste planejado no workflow de arquivamento.
- [x] 5.3 Confirmar que specs principais, changes arquivadas, aplicação, dependências e ativos gerados não foram modificados.
- [x] 5.4 Inspecionar os pontos de entrada, as skills e os artefatos da change sem ler arquivos `.env` para confirmar ausência de segredos, caminhos absolutos e identificadores específicos da máquina.
- [x] 5.5 Revisar o diff final para confirmar que a raiz é autoritativa, não existem duplicatas e o lifecycle exige sincronização antes do arquivamento.
