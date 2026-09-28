## Context

Conforme descrito em `proposal.md`, o projeto combina vulnerabilidades transitivas em ferramentas de desenvolvimento e build com uma falha própria na fonte de aleatoriedade das senhas. O ambiente nativo é Docker Compose, com Yarn Classic, lockfile único e Node.js restrito à major 22 pelas especificações existentes.

O `yarn audit` atual registra 25 ocorrências: `brace-expansion`, `postcss`, `js-yaml`, `nanoid` e `image-size`. As quatro primeiras famílias possuem versões corrigidas; `image-size` não apresenta versão corrigida no advisory e chega ao projeto pela dependência opcional de Less. O bloco de estilo atual usa sintaxe CSS comum, embora esteja marcado como Less.

## Goals / Non-Goals

**Goals:**

- Eliminar os nove alertas do Dependabot e os advisories adicionais encontrados localmente.
- Fazer com que toda decisão aleatória da senha use entropia criptográfica com distribuição uniforme.
- Simplificar a árvore de dependências e tornar reproduzível a auditoria no container.
- Preservar comportamento visual, regras de composição, Yarn Classic e Node.js 22.

**Non-Goals:**

- Migrar para outro gerenciador de pacotes.
- Atualizar Node.js, Vite, ESLint ou outras ferramentas para uma nova major sem necessidade comprovada para a correção.
- Redesenhar a interface ou alterar as regras funcionais de composição das senhas.
- Corrigir advisories por edição manual de código dentro de `node_modules`.

## Decisions

### Usar Web Crypto com amostragem por rejeição

A geração obterá valores inteiros da Web Crypto e descartará valores que produziriam viés ao serem mapeados para um conjunto cujo tamanho não divide a faixa da fonte. O mesmo mecanismo fornecerá índices ao embaralhamento Fisher–Yates. Se a fonte segura não existir, a geração falhará explicitamente.

Alternativas consideradas:

- Manter `Math.random()` foi rejeitado por não oferecer segurança criptográfica.
- Usar diretamente o resto da divisão de um valor criptográfico foi rejeitado por introduzir viés de módulo.
- Adicionar uma biblioteca externa foi rejeitado porque a plataforma já oferece a primitiva necessária e uma nova dependência aumentaria a superfície de supply chain.

### Remover Less para eliminar `image-size`

O bloco `lang="less"` será convertido para CSS comum e a dependência `less` será removida. Isso elimina a cadeia `less > image-size` sem esperar uma correção inexistente e sem alterar a aparência, pois o estilo atual não usa recursos exclusivos de Less.

Alternativas consideradas:

- Forçar outra versão de `image-size` foi rejeitado porque o advisory não indica versão segura.
- Manter a dependência com uma mitigação documental foi rejeitado porque a cadeia é dispensável.

### Corrigir transitivas por atualização dos pais e resoluções específicas

Primeiro serão aplicadas atualizações compatíveis dos pacotes pais. Quando uma cadeia continuar vulnerável, serão usadas `resolutions` específicas para as linhas compatíveis necessárias: `brace-expansion` 1.x e 2.x, `postcss`, `js-yaml` e `nanoid`. Resoluções antigas, redundantes ou conflitantes serão removidas após comparação com o lockfile regenerado.

Atualizações major somente serão adotadas se não houver solução compatível e após validação explícita do impacto. A abordagem preferida é incremental porque reduz o risco de misturar migrações de ferramenta com correções de segurança.

Alternativas consideradas:

- Atualizar todas as dependências para as majors mais recentes foi rejeitado por ampliar desnecessariamente o escopo e o risco de regressão.
- Manter pacotes transitivos como dependências diretas foi rejeitado por ocultar a origem real das cadeias e dificultar manutenção futura.

### Usar somente ferramentas locais do projeto no Docker

A instalação global do Vite será removida do `Dockerfile`. A instalação Yarn produzirá as ferramentas locais resolvidas pelo lockfile, e scripts como `yarn dev` e `yarn build` usarão essas versões.

### Validar segurança e comportamento no mesmo ambiente

Após regenerar o lockfile, a verificação ocorrerá no container em camadas: instalação reproduzível, `yarn audit`, testes unitários do gerador, build, inicialização com inspeção de logs e Cypress. A consulta final aos alertas do Dependabot será somente leitura e servirá como confirmação externa após o GitHub reprocessar o lockfile.

## Risks / Trade-offs

- [Resoluções transitivas incompatíveis com pacotes pais] → Preferir atualização do pai, limitar cada resolução à linha necessária e executar build e testes completos.
- [Rejection sampling incorreto ou loop sem progresso] → Isolar a seleção de índice, testar limites e simular valores descartados e aceitos.
- [Remoção de Less alterar o CSS compilado] → Comparar o build e executar a suíte funcional existente após remover `lang="less"`.
- [Novos advisories surgirem entre proposta e implementação] → Registrar o resultado datado da auditoria e incorporar advisories novos que pertençam às mesmas cadeias e não exijam expansão material de escopo.
- [Dependabot permanecer aberto após a correção local] → Confirmar que `app/yarn.lock` contém versões seguras e aguardar o reprocessamento do GitHub antes de concluir que a correção falhou.

## Migration Plan

1. Criar testes de regressão para a geração criptográfica antes de alterar o gerador.
2. Implementar a fonte segura e validar que as regras funcionais permanecem atendidas.
3. Atualizar pacotes pais e resoluções de forma incremental, regenerando somente `app/yarn.lock` no container.
4. Converter o estilo para CSS e remover Less e `image-size` da árvore instalada.
5. Remover o Vite global do container e reconstruir a imagem.
6. Executar auditoria, testes, build, inicialização, logs e Cypress no Docker Compose.
7. Verificar os alertas do Dependabot via `gh` após o reprocessamento.

Em caso de regressão, cada grupo de alteração poderá ser revertido separadamente, restaurando o par consistente `app/package.json` e `app/yarn.lock`. A mudança do gerador poderá ser revertida independentemente das dependências, embora a versão com `Math.random()` não deva ser publicada como correção de segurança.
