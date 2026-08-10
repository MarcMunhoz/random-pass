## 1. Preparação e linha de base

- [x] 1.1 Solicitar autorização explícita antes de qualquer instalação ou download necessário à implementação no container.
- [x] 1.2 Registrar no trabalho da change os nove alertas abertos do Dependabot e o resumo reproduzível do `yarn audit` atual com 25 ocorrências.
- [x] 1.3 Confirmar que Yarn Classic, `app/yarn.lock` e Node.js 22 permanecem como restrições da atualização.

## 2. Geração criptograficamente segura

- [x] 2.1 Criar testes de regressão que falhem quando a geração ou o embaralhamento dependerem de `Math.random()`.
- [x] 2.2 Criar testes para aceitação e descarte de valores na amostragem uniforme, incluindo limites do intervalo.
- [x] 2.3 Implementar a seleção de índices com Web Crypto e amostragem por rejeição, sem fallback para fonte não criptográfica.
- [x] 2.4 Aplicar a seleção segura aos caracteres obrigatórios, ao preenchimento e ao embaralhamento Fisher–Yates.
- [x] 2.5 Validar que comprimento, classes habilitadas e quantidades mínimas continuam atendidos.

## 3. Saneamento das dependências

- [x] 3.1 Atualizar incrementalmente os pacotes pais compatíveis e registrar qualquer atualização major que se mostre indispensável antes de aplicá-la.
- [x] 3.2 Corrigir as linhas transitivas de `brace-expansion` para versões que cubram todos os advisories das linhas 1.x e 2.x.
- [x] 3.3 Corrigir `postcss`, `js-yaml` e `nanoid` para versões que cubram todos os advisories identificados.
- [x] 3.4 Converter o bloco de estilo de `app/src/App.vue` para CSS comum e remover `less`, eliminando `image-size` da árvore instalada.
- [x] 3.5 Remover dependências diretas que existam apenas para fixar transitivas e reclassificar ferramentas de desenvolvimento e build em `devDependencies`.
- [x] 3.6 Remover `resolutions` redundantes ou conflitantes e manter somente as restrições específicas ainda necessárias.
- [x] 3.7 Regenerar exclusivamente `app/yarn.lock` com Yarn no container e confirmar ausência de lockfiles concorrentes.

## 4. Alinhamento do ambiente Docker

- [x] 4.1 Remover a instalação global do Vite no `Dockerfile` e usar a versão local resolvida pelo lockfile.
- [x] 4.2 Reconstruir a imagem no container e confirmar as versões efetivas de Node.js, Yarn e Vite.
- [x] 4.3 Confirmar que os serviços de aplicação e Cypress continuam usando o fluxo Docker Compose documentado.
- [x] 4.4 Preservar o `node_modules` instalado na imagem quando o diretório `app` for montado pelo Docker Compose, sem restaurar o Vite global.

## 5. Validação de segurança e regressão

- [x] 5.1 Executar os testes automatizados da geração segura no container e registrar o resultado.
- [x] 5.2 Executar `yarn audit` no container e confirmar zero vulnerabilidades moderadas, altas ou críticas, salvo exceção tecnicamente documentada.
- [x] 5.3 Inspecionar a árvore instalada e confirmar ausência das versões vulneráveis de `brace-expansion`, `postcss`, `js-yaml`, `nanoid` e `image-size`.
- [x] 5.4 Executar lint sem correção automática e tratar erros relacionados à mudança.
- [x] 5.5 Executar `yarn build` no container e confirmar conclusão sem erros.
- [x] 5.6 Inicializar a aplicação via Docker Compose e inspecionar os logs para ausência de exceções ou erros de inicialização.
- [x] 5.7 Executar a suíte Cypress completa contra a aplicação servida e confirmar todos os cenários aprovados.
- [x] 5.8 Consultar via `gh` o reprocessamento dos alertas do Dependabot e registrar eventuais alertas ainda abertos sem alterá-los remotamente.
- [x] 5.9 Reproduzir e corrigir a regressão de `make dev`, confirmando o serviço da aplicação ativo e o Vite local acessível após a inicialização.
- [x] 5.10 Reexecutar testes, lint e o `yarn build` definido em `app/package.json` no container após a correção do ambiente.

  Regressão reproduzida com `vite: not found` e saída 127. Após mover o `WORKDIR` antes da instalação no `Dockerfile` e preservar `/app/node_modules` no Compose, `make dev` manteve a aplicação ativa com Vite 6.4.3, resposta HTTP 200 e Cypress aprovado. Os sete testes unitários, lint e `yarn build` foram reexecutados com sucesso no mesmo container.

  Estado remoto em 2026-08-10: os nove alertas originais permanecem abertos (`image-size` 132/133, `postcss` 124/125/131 e `brace-expansion` 122/126/127/130), pois as correções locais ainda não foram publicadas para reprocessamento pelo Dependabot.

## 6. Documentação e encerramento

- [x] 6.1 Atualizar `CHANGELOG.md` com as correções de segurança, atualizações de dependências e mudança da fonte de aleatoriedade.
- [x] 6.2 Revisar o diff para remover dados sensíveis, caminhos locais e artefatos gerados indevidamente.
- [x] 6.3 Consolidar as versões corrigidas, resultados dos testes, resultado do audit e pendências justificadas para a entrega.

  Evidência final em 2026-08-10: Node.js 22.23.1, Yarn 1.22.22, Vite 6.4.3 e Cypress 15.20.1; sete testes unitários e seis cenários Cypress aprovados; lint e build aprovados; `yarn audit` com zero vulnerabilidades; árvore corrigida com `brace-expansion` 1.1.18, `js-yaml` 4.3.1, `nanoid` 3.3.18 e `postcss` 8.5.26, sem `image-size`. A única pendência externa é o reprocessamento dos nove alertas após uma futura publicação autorizada das alterações.
