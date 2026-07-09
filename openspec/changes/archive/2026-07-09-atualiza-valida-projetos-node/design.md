## Context

O repositório é uma aplicação Vue 3 com Vite, empacotada em `app/`, executada por Docker Compose e baseada na imagem `node:22-alpine`. O gerenciador de pacotes ativo é Yarn, com `app/yarn.lock` como lockfile original. As regras locais exigem que build e scripts de package manager sejam executados no contexto do container quando necessário.

A manutenção proposta cobre atualização de dependências, correção de vulnerabilidades e criação de validação automatizada suficiente para demonstrar que o gerador de senhas continua funcional após o saneamento da árvore de pacotes.

## Goals / Non-Goals

**Goals:**

- Preservar Docker como ambiente nativo de execução e validação.
- Manter Node.js na major 22, aceitando apenas atualização de patch ou minor dentro dessa major.
- Preservar Yarn e `app/yarn.lock` como fonte da verdade do grafo de dependências.
- Corrigir vulnerabilidades conhecidas em dependências diretas e transitivas com mudanças incrementais.
- Adicionar Cypress e cobrir fluxos críticos do gerador de senhas.
- Validar build, execução real da aplicação e logs de inicialização.

**Non-Goals:**

- Não migrar para outra major de Node.js.
- Não trocar Yarn por npm ou pnpm.
- Não migrar Vue, Vite ou Bootstrap para outros frameworks.
- Não alterar arquitetura, deploy, layout visual ou comportamento funcional de produto fora do necessário para compatibilidade das atualizações.
- Não reescrever a aplicação ou substituir o fluxo Docker existente.

## Decisions

1. Docker Compose será o ambiente canônico de comandos.

   Racional: o projeto já declara Node.js 22 no `Dockerfile`, expõe a porta `1234` via `docker-compose.yaml` e documenta Docker como caminho recomendado. Executar instalação, build e testes no container evita divergência entre host e runtime real do projeto.

   Alternativa considerada: executar Yarn diretamente no host. Rejeitada porque pode usar uma versão de Node.js ou Yarn diferente da imagem do projeto.

2. A atualização de Node.js ficará restrita à imagem `node:22-alpine`.

   Racional: a proposta permite patch e minor dentro da major vigente, mas proíbe elevação major. A implementação poderá atualizar a tag para uma variante 22 mais específica ou mais recente, se isso for necessário e compatível.

   Alternativa considerada: migrar para Node.js 24 ou superior. Rejeitada por estar fora do escopo.

3. Yarn e `app/yarn.lock` serão preservados.

   Racional: o lockfile existente define a árvore reprodutível. O saneamento deve usar comandos e mecanismos compatíveis com Yarn, incluindo `resolutions` quando a correção de subdependência exigir pinagem transitiva.

   Alternativa considerada: gerar `package-lock.json` ou `pnpm-lock.yaml`. Rejeitada porque criaria artefatos duplicados e divergência de instalação.

4. Dependências serão saneadas de forma incremental.

   Racional: o projeto contém dependências de runtime e desenvolvimento com versões antigas e resoluções já existentes. Mudanças incrementais reduzem o raio de regressão e permitem validar build e Cypress após cada grupo relevante.

   Alternativa considerada: executar atualização ampla sem triagem. Rejeitada pelo risco de quebras difíceis de isolar.

5. Cypress será a camada principal de regressão funcional.

   Racional: a aplicação é uma UI de geração de senhas. Cypress permite validar fluxos reais no navegador, incluindo configuração de comprimento, seleção de classes de caracteres, mínimos de números e especiais, regeneração e cópia.

   Alternativa considerada: cobrir apenas funções utilitárias com testes unitários. Rejeitada porque a aceitação exige validação extensiva de fluxos da aplicação.

## Risks / Trade-offs

- Atualizações minor podem mudar contratos de ferramentas como Vite, ESLint ou plugins Vue -> mitigar com atualização incremental, build no container e testes Cypress.
- Cypress pode exigir dependências de sistema adicionais na imagem Alpine -> mitigar ajustando a imagem ou usando estratégia de execução compatível com Docker, sem alterar o ambiente canônico do app.
- Algumas vulnerabilidades transitivas podem não ter correção compatível sem upgrade major de pacote -> mitigar registrando vulnerabilidades não corrigíveis dentro do escopo e aplicando `resolutions` apenas quando houver versão compatível.
- A varredura de logs pode capturar warnings não bloqueantes -> mitigar diferenciando warnings aceitáveis de exceções, falhas de bind, stack traces e erros de inicialização.

## Migration Plan

1. Confirmar ambiente Docker, Node.js 22 e Yarn por inspeção de `Dockerfile`, `docker-compose.yaml`, `app/package.json` e `app/yarn.lock`.
2. Atualizar patch/minor da imagem Node.js 22 quando aplicável.
3. Atualizar dependências e subdependências com Yarn, preservando lockfile único.
4. Adicionar configuração e scripts de Cypress.
5. Criar testes Cypress para fluxos críticos do gerador.
6. Executar build e testes no container.
7. Inicializar a aplicação com Docker Compose e validar logs.

Rollback: reverter as alterações em `Dockerfile`, `app/package.json`, `app/yarn.lock`, scripts e arquivos Cypress. Como não há migração de dados nem mudança de deploy, o rollback é puramente de código.

## Open Questions

- Não há documentação interna de priorização de fluxos além do README; portanto a implementação deve inferir a cobertura a partir dos componentes e composables existentes.
- A correção completa de vulnerabilidades dependerá de conectividade externa para baixar pacotes e, se necessário, imagens Docker atualizadas.
