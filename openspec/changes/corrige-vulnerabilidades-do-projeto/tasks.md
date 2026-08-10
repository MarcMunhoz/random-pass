## 1. Preparação e linha de base

- [ ] 1.1 Solicitar autorização explícita antes de qualquer instalação ou download necessário à implementação no container.
- [ ] 1.2 Registrar no trabalho da change os nove alertas abertos do Dependabot e o resumo reproduzível do `yarn audit` atual com 25 ocorrências.
- [ ] 1.3 Confirmar que Yarn Classic, `app/yarn.lock` e Node.js 22 permanecem como restrições da atualização.

## 2. Geração criptograficamente segura

- [ ] 2.1 Criar testes de regressão que falhem quando a geração ou o embaralhamento dependerem de `Math.random()`.
- [ ] 2.2 Criar testes para aceitação e descarte de valores na amostragem uniforme, incluindo limites do intervalo.
- [ ] 2.3 Implementar a seleção de índices com Web Crypto e amostragem por rejeição, sem fallback para fonte não criptográfica.
- [ ] 2.4 Aplicar a seleção segura aos caracteres obrigatórios, ao preenchimento e ao embaralhamento Fisher–Yates.
- [ ] 2.5 Validar que comprimento, classes habilitadas e quantidades mínimas continuam atendidos.

## 3. Saneamento das dependências

- [ ] 3.1 Atualizar incrementalmente os pacotes pais compatíveis e registrar qualquer atualização major que se mostre indispensável antes de aplicá-la.
- [ ] 3.2 Corrigir as linhas transitivas de `brace-expansion` para versões que cubram todos os advisories das linhas 1.x e 2.x.
- [ ] 3.3 Corrigir `postcss`, `js-yaml` e `nanoid` para versões que cubram todos os advisories identificados.
- [ ] 3.4 Converter o bloco de estilo de `app/src/App.vue` para CSS comum e remover `less`, eliminando `image-size` da árvore instalada.
- [ ] 3.5 Remover dependências diretas que existam apenas para fixar transitivas e reclassificar ferramentas de desenvolvimento e build em `devDependencies`.
- [ ] 3.6 Remover `resolutions` redundantes ou conflitantes e manter somente as restrições específicas ainda necessárias.
- [ ] 3.7 Regenerar exclusivamente `app/yarn.lock` com Yarn no container e confirmar ausência de lockfiles concorrentes.

## 4. Alinhamento do ambiente Docker

- [ ] 4.1 Remover a instalação global do Vite no `Dockerfile` e usar a versão local resolvida pelo lockfile.
- [ ] 4.2 Reconstruir a imagem no container e confirmar as versões efetivas de Node.js, Yarn e Vite.
- [ ] 4.3 Confirmar que os serviços de aplicação e Cypress continuam usando o fluxo Docker Compose documentado.

## 5. Validação de segurança e regressão

- [ ] 5.1 Executar os testes automatizados da geração segura no container e registrar o resultado.
- [ ] 5.2 Executar `yarn audit` no container e confirmar zero vulnerabilidades moderadas, altas ou críticas, salvo exceção tecnicamente documentada.
- [ ] 5.3 Inspecionar a árvore instalada e confirmar ausência das versões vulneráveis de `brace-expansion`, `postcss`, `js-yaml`, `nanoid` e `image-size`.
- [ ] 5.4 Executar lint sem correção automática e tratar erros relacionados à mudança.
- [ ] 5.5 Executar `yarn build` no container e confirmar conclusão sem erros.
- [ ] 5.6 Inicializar a aplicação via Docker Compose e inspecionar os logs para ausência de exceções ou erros de inicialização.
- [ ] 5.7 Executar a suíte Cypress completa contra a aplicação servida e confirmar todos os cenários aprovados.
- [ ] 5.8 Consultar via `gh` o reprocessamento dos alertas do Dependabot e registrar eventuais alertas ainda abertos sem alterá-los remotamente.

## 6. Documentação e encerramento

- [ ] 6.1 Atualizar `CHANGELOG.md` com as correções de segurança, atualizações de dependências e mudança da fonte de aleatoriedade.
- [ ] 6.2 Revisar o diff para remover dados sensíveis, caminhos locais e artefatos gerados indevidamente.
- [ ] 6.3 Consolidar as versões corrigidas, resultados dos testes, resultado do audit e pendências justificadas para a entrega.
