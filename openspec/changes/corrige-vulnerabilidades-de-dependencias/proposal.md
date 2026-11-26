## Motivação

A issue #54 reúne vulnerabilidades nas dependências do random-pass. A exploração identificou 14 alertas abertos no Dependabot e 18 avisos distintos no audit do Yarn, incluindo quatro adicionais. A atualização precisa preservar o funcionamento da aplicação e do gate de release.

## Alterações

- Conciliar os avisos por identificador e cadeia de dependências, atualizar pacotes afetados e verificar o lockfile resultante.
- Verificar separadamente as dependências da imagem do Cypress usada em Compose e no gate de release.
- Confirmar o funcionamento do build de produção, incluindo geração de senhas, cópia real e interface em desktop e mobile.

## Capacidades

### Novas capacidades

Nenhuma.

### Capacidades modificadas

- `node-dependency-maintenance` — conciliação dos avisos e verificação da distribuição do Cypress.
- `cypress-runtime-validation` — validação funcional do build após atualizações de dependências.

## Impacto

`app/package.json`, `app/yarn.lock` e, se a distribuição do Cypress mudar, `docker-compose.yaml` e `.github/workflows/release-quality.yml`. O projeto mantém Yarn Classic e Node.js 22 para build e testes unitários.
