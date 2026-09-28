# RTK

Use o RTK como proxy para reduzir a saída de comandos no terminal.

## Regra

Prefixe comandos de shell com `rtk`:

```sh
rtk git status
rtk docker compose ps
rtk npm test
```

Para executar um comando sem filtragem, use:

```sh
rtk proxy <comando>
```

O RTK não altera as regras do projeto: builds e scripts de package manager continuam restritos ao container, e instalações continuam dependendo de autorização explícita.

## Regras obrigatórias

- Nunca ler arquivos `.env`, `.env.*`, secrets, credenciais ou chaves privadas sem autorização explícita do usuário.
- Executar build e scripts de package manager somente no contexto do container do projeto, nunca no host.
- Não instalar pacotes, binários, browsers ou dependências sem autorização explícita do usuário.

## Commits

- Escrever mensagens de commit em inglês.
- Usar o formato `type(scope): Summarized message` no título.
- Iniciar a mensagem resumida com letra maiúscula e, quando houver verbo, usar o simple present na terceira pessoa do singular, como `Adjusts`, `Adds`, `Fixes`, `Removes` ou `Updates`.
- Não usar verbo no imperativo no título.
- Manter o título apenas na primeira linha e passar a descrição em um argumento `-m` separado.
- Escrever os itens da descrição em linhas consecutivas, sem linhas em branco entre eles.
- Usar somente os tipos `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore` e `revert`.

Formato obrigatório:

```text
type(scope): Summarized message
- Explanatory description 01
- Explanatory description 02
```

## GitHub

- Escrever em inglês PRs, issues, labels, releases e changelogs deste repositório público pessoal.
- Usar exclusivamente GitHub CLI (`gh`) para criar ou alterar metadata remota no GitHub.
- Nunca fazer merge de pull request; essa ação é manual e exclusiva de uma pessoa.

## OpenSpec

- Escrever o conteúdo textual dos artefatos OpenSpec em português do Brasil.
- Manter em inglês apenas comandos, paths, nomes de arquivos, código, marcadores exigidos pelo schema e termos técnicos quando necessário.
- Seguir o lifecycle `propose → apply → sync → archive`.
- Sempre sincronizar as delta specs com as specs principais antes de arquivar uma change.
- Preservar specs principais e histórico arquivado durante mudanças de tooling, salvo quando a tarefa autorizar explicitamente sua alteração.
