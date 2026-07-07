## 1. Inspeção do ambiente

- [ ] 1.1 Confirmar Docker como ambiente canônico por `Dockerfile`, `docker-compose.yaml`, README e Makefile.
- [ ] 1.2 Confirmar Node.js 22 como major vigente e registrar a versão efetiva usada pela imagem Docker.
- [ ] 1.3 Confirmar Yarn como gerenciador ativo por `app/yarn.lock` e ausência de lockfiles concorrentes.
- [ ] 1.4 Levantar scripts existentes em `app/package.json` e mapear comandos equivalentes para execução no container.

## 2. Manutenção de runtime e dependências

- [ ] 2.1 Atualizar a imagem Node.js apenas dentro da major 22 quando houver patch ou minor aplicável.
- [ ] 2.2 Executar instalação Yarn no container e validar que `app/yarn.lock` permanece íntegro.
- [ ] 2.3 Levantar dependências desatualizadas e vulnerabilidades conhecidas com comandos compatíveis com Yarn.
- [ ] 2.4 Atualizar dependências diretas corrigíveis de forma incremental, preservando compatibilidade com Vue 3 e Vite.
- [ ] 2.5 Corrigir subdependências vulneráveis com `resolutions` quando houver versão compatível dentro do escopo.
- [ ] 2.6 Registrar vulnerabilidades remanescentes que exijam mudança major de Node.js, framework ou pacote fora do escopo.
- [ ] 2.7 Confirmar que nenhum `package-lock.json` ou `pnpm-lock.yaml` foi criado.

## 3. Cypress e testes funcionais

- [ ] 3.1 Adicionar Cypress como dependência de desenvolvimento usando Yarn no container.
- [ ] 3.2 Configurar Cypress para executar contra a aplicação servida na porta `1234`.
- [ ] 3.3 Adicionar scripts Yarn para execução headless e abertura interativa do Cypress.
- [ ] 3.4 Criar teste de geração inicial de senha com configuração padrão válida.
- [ ] 3.5 Criar teste de alteração de comprimento da senha.
- [ ] 3.6 Criar teste de seleção de classes de caracteres.
- [ ] 3.7 Criar teste de quantidades mínimas de números e caracteres especiais.
- [ ] 3.8 Criar teste de regeneração de senha.
- [ ] 3.9 Criar teste de cópia para área de transferência com feedback visual.

## 4. Validação final

- [ ] 4.1 Executar lint existente no container, se continuar compatível após as atualizações.
- [ ] 4.2 Executar `yarn build` no container e confirmar conclusão com zero erros.
- [ ] 4.3 Executar a suíte Cypress no container contra a aplicação servida.
- [ ] 4.4 Inicializar a aplicação via Docker Compose e confirmar disponibilidade em `http://localhost:1234`.
- [ ] 4.5 Inspecionar logs de `stdout` e `stderr` para ausência de exceções, stack traces, falhas de bind e erros de inicialização.
- [ ] 4.6 Consolidar relatório final com ambiente detectado, alterações aplicadas, vulnerabilidades corrigidas ou remanescentes e resultados de validação.
