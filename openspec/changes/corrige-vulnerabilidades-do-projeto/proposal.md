## Why

O repositório possui nove alertas abertos do Dependabot e a auditoria local do Yarn identifica 25 ocorrências vulneráveis, incluindo advisories adicionais em `js-yaml` e `nanoid`. Além disso, o gerador produz senhas com `Math.random()`, que não oferece aleatoriedade criptograficamente segura para credenciais.

## What Changes

- Atualizar dependências diretas e transitivas compatíveis para eliminar as vulnerabilidades corrigíveis encontradas pelo Dependabot e pelo `yarn audit`.
- Remover ou substituir a cadeia `less > image-size`, pois os advisories de `image-size` não indicam versão corrigida e o estilo atual pode ser expresso em CSS comum.
- Revisar e reduzir `resolutions` obsoletas ou conflitantes, preservando apenas as restrições transitivas necessárias e documentadas.
- Remover a instalação global redundante do Vite na imagem Docker e usar exclusivamente a versão declarada pelo projeto.
- Substituir `Math.random()` por Web Crypto com amostragem uniforme na seleção e no embaralhamento dos caracteres das senhas.
- Adicionar testes de regressão para a fonte criptográfica e validar auditoria, build, testes funcionais e inicialização no ambiente Docker.
- Manter Yarn Classic, o lockfile existente e Node.js na major 22, sem introduzir outro gerenciador ou atualização major do runtime.

## Capabilities

### New Capabilities

- `secure-password-generation`: Define a geração e o embaralhamento de senhas com fonte criptograficamente segura e amostragem sem viés.

### Modified Capabilities

- `node-dependency-maintenance`: Amplia o saneamento para exigir auditoria local verificável, tratamento explícito de advisories sem correção direta, remoção de dependências desnecessárias e alinhamento entre ferramentas do container e do projeto.

## Impact

- Código do gerador em `app/src/composables/usePasswordGenerator.js` e seus testes.
- Dependências e resoluções em `app/package.json` e `app/yarn.lock`.
- Estilos de `app/src/App.vue` e remoção da cadeia transitiva originada por Less.
- Construção e execução local definidas em `Dockerfile` e `docker-compose.yaml`.
- Validações de segurança via Dependabot e `yarn audit`, além do build e da suíte Cypress existentes.
