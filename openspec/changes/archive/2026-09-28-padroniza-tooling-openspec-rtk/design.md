## Context

O repositório possui uma regra local em `.agents/rules/mandatory-rules.md`, cinco skills OpenSpec em `.codex/skills/` e nenhum `AGENTS.md` ou `RTK.md` na raiz. O acervo OpenSpec contém três specs principais e duas changes arquivadas, que não devem ser reescritas por esta migração. Consulte `proposal.md` para a motivação e `specs/repository-agent-tooling/spec.md` para o contrato observável.

## Goals / Non-Goals

**Goals:**

- Estabelecer uma cadeia de autoridade na qual `AGENTS.md` contém somente `@RTK.md` e `RTK.md` concentra toda a orientação.
- Tornar `.agents/skills/` a única localização das cinco skills OpenSpec do projeto.
- Preservar o conteúdo funcional das skills durante a migração.
- Tornar explícita e obrigatória a sincronização antes do arquivamento.
- Permitir validação estrutural, sem executar ou modificar a aplicação.

**Non-Goals:**

- Alterar código, configuração de runtime, dependências ou ativos gerados da aplicação.
- Reescrever specs principais ou changes arquivadas.
- Adicionar novas ferramentas, skills ou dependências.
- Generalizar as instruções para outros repositórios.

## Decisions

### Centralizar autoridade em arquivos da raiz

`AGENTS.md` conterá exclusivamente `@RTK.md`, sem título, seções ou regras adicionais. `RTK.md` reunirá as regras aplicáveis ao projeto, a sequência OpenSpec e as instruções de execução com RTK. Essa indireção mantém compatibilidade com a descoberta por `AGENTS.md` sem replicar orientação local nesse arquivo.

Alternativa considerada: manter `.agents/rules/mandatory-rules.md` e apenas criar um índice na raiz. Essa opção foi rejeitada porque preservaria duas fontes com possibilidade de divergência e não atenderia à remoção da estrutura legada.

### Migrar as skills por movimentação preservadora

Cada diretório `.codex/skills/openspec-*` será movido para `.agents/skills/openspec-*`, mantendo nomes, metadados e conteúdo funcional. Ajustes só serão feitos quando necessários para eliminar uma referência legada ou reforçar a sincronização obrigatória no workflow de arquivamento.

Alternativa considerada: copiar as skills e manter aliases no local antigo. Essa opção foi rejeitada porque criaria duplicatas e tornaria ambígua a versão canônica.

### Expressar a sincronização em política e workflow

O lifecycle completo será documentado em `RTK.md`, e a skill de arquivamento não oferecerá um caminho que ignore a sincronização quando houver delta specs. A redundância intencional entre regra e workflow reduz o risco de um arquivamento incompleto.

Alternativa considerada: documentar a sequência apenas fora da skill de arquivamento. Essa opção foi rejeitada porque o workflow executável ainda permitiria uma escolha incompatível com a política.

### Validar por invariantes de repositório

A verificação contará as cinco skills no destino, confirmará a ausência das fontes legadas, validará a change com OpenSpec e inspecionará o diff para assegurar que aplicação, dependências, specs principais e histórico arquivado não foram alterados. Uma busca direcionada verificará dados sensíveis ou específicos da máquina sem acessar arquivos `.env` ou equivalentes.

Alternativa considerada: executar build e testes da aplicação. Essa opção foi rejeitada porque nenhum arquivo de runtime será alterado e esses gates não aumentariam a confiança na migração documental.

## Risks / Trade-offs

- [Ferramentas que procuram exclusivamente `.codex/skills/` deixam de descobrir os workflows] → Manter os metadados das skills e validar a descoberta pela estrutura `.agents/skills/` definida para o repositório.
- [Consolidação omite uma regra ainda aplicável] → Comparar cada regra legada com `RTK.md` antes de remover `.agents/rules/`.
- [Movimentação é registrada como exclusão e recriação] → Revisar o diff com detecção de renomes e comparar o conteúdo funcional das cinco skills.
- [Arquivamento futuro ignora a sincronização] → Remover da skill a alternativa de arquivar delta specs sem sync e documentar a ordem obrigatória na raiz.

## Migration Plan

1. Registrar o inventário das regras, skills, specs principais e changes arquivadas.
2. Criar `AGENTS.md` somente com `@RTK.md` e consolidar em `RTK.md` as orientações aplicáveis.
3. Mover as cinco skills para `.agents/skills/` e ajustar somente referências necessárias.
4. Remover as estruturas legadas que ficarem vazias.
5. Validar estrutura, conteúdo, lifecycle, sanitização e preservação do acervo OpenSpec.

Se a validação falhar antes do commit, a migração pode ser revertida restaurando os arquivos movidos e removendo apenas os novos pontos de entrada; specs principais, histórico e aplicação permanecem fora do escopo de edição.
