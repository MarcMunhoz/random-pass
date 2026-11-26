## Contexto

O audit em container registrou 28 ocorrências para 18 avisos distintos. O Dependabot registrou 14 alertas no lockfile. Os quatro avisos adicionais correspondem às CVEs 2026-102276 e 2026-102278 em `brace-expansion` e 2026-82417 e 2026-82562 em `qs`. A implementação deve atualizar esse inventário antes de alterar as dependências.

## Objetivos e limites

- Corrigir as versões afetadas mantendo Yarn Classic, um único lockfile e Node.js 22 para build e testes unitários.
- Preservar geração, controles, cópia e apresentação da aplicação. Manter os fluxos de desenvolvimento e do gate de release utilizáveis.
- Manter migrações de major e mudanças de interface fora do escopo.

## Decisões

### Atualizar os pacotes pais antes de recorrer a resoluções

Usar versões compatíveis das linhas atuais. Os pisos identificados na exploração orientam a resolução, com nova consulta de avisos antes da escolha definitiva.

| Cadeia | Piso identificado |
| --- | --- |
| Vite | `6.4.4` |
| Vue e `@vue/server-renderer` | `3.5.42` |
| Cypress e `@cypress/request` | `systeminformation 5.33.16` e `qs 6.16.1` |
| ESLint, Minimatch e plugin Vue | `brace-expansion 1.1.21`, `js-yaml 4.3.2` e `postcss-selector-parser 6.1.5` |
| Vite, PostCSS e compiladores do Vue | `source-map-js 1.2.2` |

Atualizar Vue em conjunto com seus pacotes vinculados. Quando o pai compatível ainda deixar uma versão afetada, restringir a resolução aos consumidores e à major correspondente. Conferir as versões instaladas via lockfile e preservar os pares `app/package.json` e `app/yarn.lock` nas alterações e em eventual reversão.

### Verificar o Cypress efetivamente executado

Compose e o gate de release usam a CLI da imagem `cypress/included`, que tem dependências próprias. Conferir as versões efetivas em ambos os fluxos. Se um pin atualizado da imagem resolver os avisos pertinentes, manter Compose e gate alinhados. Se a imagem continuar usando dependências afetadas, avaliar a execução da CLI local resolvida pelo lockfile em container com suporte ao navegador e binário compatível. Documentar avisos residuais sem correção compatível, com a cadeia e a mitigação aplicável.

### Validar o build em navegador

Instalar pelo lockfile, comparar os audits e executar lint, build de produção, testes unitários e Cypress em containers. Servir o build resultante em contexto seguro. Cobrir geração inicial, comprimento, classes, mínimos, regeneração e confirmação de cópia. A suíte usa uma simulação de `clipboard.writeText`. Verificar também copiar e colar de verdade em navegador e conferir os controles, o resultado e a legibilidade da interface em desktop e mobile.

## Riscos e contrapartidas

- Resoluções amplas podem afetar outras cadeias. Conferir cada consumidor e limitar a intervenção à linha compatível.
- As bases de avisos e o conteúdo das imagens podem divergir. Registrar os resultados por identificador, versão e ambiente efetivamente executado.
- O clipboard e o Web Crypto dependem do contexto do navegador. Usar loopback ou HTTPS na validação e registrar o ambiente da conferência funcional.
