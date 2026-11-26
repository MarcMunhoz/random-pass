# Inventário de dependências da issue #54

O Dependabot apresentou 14 alertas. O Yarn apresentou 18 avisos distintos em 28 ocorrências (15 altas, 11 moderadas e 2 baixas).

| Aviso | Pacote | Severidade | Cadeias e versões | Versão corrigida | Dependabot |
| --- | --- | --- | --- | --- | --- |
| [GHSA-g2v6-rqmx-r4w6](https://github.com/advisories/GHSA-g2v6-rqmx-r4w6) | `@vue/server-renderer` | Alta | `vue → @vue/server-renderer` (3.5.39) | `>=3.5.42` | #149 |
| [CVE-2026-102276](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p) | `brace-expansion` | Alta | `eslint → minimatch → brace-expansion` (1.1.18)<br>`eslint → @eslint/eslintrc → minimatch → brace-expansion` (1.1.18)<br>`eslint → file-entry-cache → flat-cache → rimraf → glob → minimatch → brace-expansion` (1.1.18) | `>=1.1.19` | Apenas Yarn |
| [CVE-2026-102277](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr) | `brace-expansion` | Moderada | `eslint → minimatch → brace-expansion` (1.1.18)<br>`eslint → @eslint/eslintrc → minimatch → brace-expansion` (1.1.18)<br>`eslint → file-entry-cache → flat-cache → rimraf → glob → minimatch → brace-expansion` (1.1.18) | `>=1.1.21` | #138 |
| [CVE-2026-102278](https://github.com/advisories/GHSA-qhr7-859c-m2p7) | `brace-expansion` | Alta | `eslint → minimatch → brace-expansion` (1.1.18)<br>`eslint → @eslint/eslintrc → minimatch → brace-expansion` (1.1.18)<br>`eslint → file-entry-cache → flat-cache → rimraf → glob → minimatch → brace-expansion` (1.1.18) | `>=1.1.20` | Apenas Yarn |
| [CVE-2026-84375](https://github.com/advisories/GHSA-2883-xcg3-v3hh) | `js-yaml` | Alta | `eslint → js-yaml` (4.3.1)<br>`eslint → @eslint/eslintrc → js-yaml` (4.3.1) | `>=4.3.2` | #136 |
| [CVE-2026-104844](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) | `postcss-selector-parser` | Moderada | `eslint-plugin-vue → postcss-selector-parser` (6.1.4) | `>=6.1.5` | #153 |
| [CVE-2026-82417](https://github.com/advisories/GHSA-4mjr-xmp4-gh2g) | `qs` | Moderada | `cypress → @cypress/request → qs` (6.15.3) | `>=6.16.0` | Apenas Yarn |
| [CVE-2026-110816](https://github.com/advisories/GHSA-6pq8-jhm2-2vcw) | `qs` | Moderada | `cypress → @cypress/request → qs` (6.15.3) | `>=6.16.1` | #154 |
| [CVE-2026-82562](https://github.com/advisories/GHSA-x5fp-wj9c-mxmx) | `qs` | Moderada | `cypress → @cypress/request → qs` (6.15.3) | `>=6.16.0` | Apenas Yarn |
| [CVE-2026-93749](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | `source-map-js` | Alta | `vite → postcss → source-map-js` (1.2.1)<br>`vue → @vue/compiler-sfc → postcss → source-map-js` (1.2.1)<br>`vue → @vue/compiler-sfc → @vue/compiler-dom → @vue/compiler-core → source-map-js` (1.2.1)<br>`vue → @vue/compiler-sfc → @vue/compiler-ssr → @vue/compiler-dom → @vue/compiler-core → source-map-js` (1.2.1) | `>=1.2.2` | #137 |
| [CVE-2026-116576](https://github.com/advisories/GHSA-3f7j-7jwc-fxfj) | `systeminformation` | Alta | `cypress → systeminformation` (5.31.15) | `>=5.33.16` | #146 |
| [CVE-2026-116673](https://github.com/advisories/GHSA-4vjg-vx72-qq4g) | `systeminformation` | Baixa | `cypress → systeminformation` (5.31.15) | `>=5.33.14` | #142 |
| [CVE-2026-116674](https://github.com/advisories/GHSA-7648-jmwf-vw7j) | `systeminformation` | Moderada | `cypress → systeminformation` (5.31.15) | `>=5.33.13` | #143 |
| [CVE-2026-112942](https://github.com/advisories/GHSA-587h-7wmj-h5pm) | `vite` | Alta | `vite` (6.4.3) | `>=6.4.4` | #150 |
| [CVE-2026-112943](https://github.com/advisories/GHSA-698v-4r3x-3vcv) | `vite` | Moderada | `vite` (6.4.3) | `>=6.4.4` | #141 |
| [CVE-2026-112945](https://github.com/advisories/GHSA-9jrq-w75r-8gcw) | `vite` | Baixa | `vite` (6.4.3) | `>=6.4.4` | #152 |
| [CVE-2026-112944](https://github.com/advisories/GHSA-r825-w8mm-5pxw) | `vite` | Moderada | `vite` (6.4.3) | `>=6.4.4` | #151 |
| [CVE-2026-112946](https://github.com/advisories/GHSA-rq7h-c2jc-7f22) | `vite` | Moderada | `vite` (6.4.3) | `>=6.4.4` | #145 |

## Cypress executado em container

A imagem `cypress/included:15.20.1` continha `qs 6.15.3` e `systeminformation 5.33.1` na CLI global. A imagem `15.21.2` traz `qs 6.17.1` e `systeminformation 5.33.20` na CLI global. Compose e o gate executam a CLI local da mesma versão, com `qs 6.17.1` e `systeminformation 5.33.26` resolvidos pelo lockfile.

O binário do Cypress 15.21.2 ainda empacota `qs 6.14.2` via `@cypress/request 4.0.0`. O audit da aplicação não inclui essa cópia. Ela permanece nas faixas dos três avisos de `qs` da tabela. Os efeitos reportados incluem consumo excessivo de recursos no processamento de parâmetros. A linha 15 verificada não oferece um binário com essa cadeia corrigida, e atualizar a CLI não substitui a cópia embutida. O teste roda em container descartável, com a aplicação acessada por loopback e fixtures controladas. A correção definitiva depende de uma distribuição suportada que atualize o pacote embutido.

## Atualização do Vite durante a validação

O primeiro audit após a atualização apontou o aviso moderado [GHSA-8g5g-mxqh-grgj](https://github.com/advisories/GHSA-8g5g-mxqh-grgj) no Vite 6.4.4. O manifesto e o lockfile foram atualizados para 6.4.5.

## Resultado da instalação final

O audit do Yarn após a instalação com `--frozen-lockfile` em Node.js 22 examinou 351 dependências e retornou código 0, sem ocorrências em nenhuma severidade. Os 18 avisos da linha de base e o aviso adicional do Vite estão fora da faixa vulnerável nas cadeias do lockfile.

| Pacote | Versão efetiva |
| --- | --- |
| Vite | `6.4.5` |
| Vue e `@vue/server-renderer` | `3.5.46` |
| `brace-expansion` | `1.1.22` |
| `js-yaml` | `4.3.2` |
| `postcss-selector-parser` | `6.1.6` |
| `qs` | `6.17.1` |
| `source-map-js` | `1.2.4` |
| `systeminformation` | `5.33.26` |

## Validação funcional

O lint, o build de produção, os 7 testes unitários e os 6 cenários do Cypress passaram em containers com o lockfile final. No Chrome headless, o build servido por loopback passou na conferência de controles, layout e ausência de rolagem horizontal em 1440 × 900 e 390 × 844. Nos dois tamanhos, o botão exibiu o feedback de cópia e a senha colada pela área de transferência real correspondeu à senha exibida.
