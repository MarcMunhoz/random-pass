## Why

As orientações para agentes e os workflows OpenSpec estão distribuídos em estruturas legadas, sem pontos de entrada na raiz, o que dificulta descobrir a autoridade das regras e manter um lifecycle consistente. A padronização é necessária para tornar o repositório autossuficiente, eliminar duplicidade de skills e assegurar a sincronização das especificações antes de qualquer arquivamento.

## What Changes

- Criar `AGENTS.md` na raiz contendo somente a referência `@RTK.md`, sem regras locais adicionais.
- Criar `RTK.md` na raiz como fonte autoritativa das orientações locais e do uso do RTK.
- Consolidar em `RTK.md` as regras ainda aplicáveis de `.agents/rules/mandatory-rules.md` e remover a estrutura legada após a consolidação.
- Migrar as cinco skills OpenSpec de `.codex/skills/` para `.agents/skills/`, sem manter cópias duplicadas.
- Documentar o lifecycle obrigatório `propose → apply → sync → archive`, impedindo arquivamento sem sincronização prévia.
- Preservar as especificações principais e todo o histórico arquivado do OpenSpec.
- Revisar os artefatos migrados para impedir dados sensíveis ou identificadores específicos da máquina.

## Capabilities

### New Capabilities

- `repository-agent-tooling`: Define os pontos de entrada das instruções, a localização canônica das skills OpenSpec, o lifecycle obrigatório e as garantias de preservação e sanitização dos artefatos.

### Modified Capabilities

- Nenhuma.

## Impact

- Arquivos de orientação na raiz: `AGENTS.md` e `RTK.md`.
- Estruturas de agentes: `.agents/rules/`, `.agents/skills/` e `.codex/skills/`.
- Fluxo operacional OpenSpec, sem alteração nas specs funcionais existentes ou no histórico arquivado.
- Nenhuma mudança em código da aplicação, comportamento de runtime, dependências ou ativos gerados.
