## 1. Inventário de avisos

- [x] 1.1 Coletar os alertas abertos do Dependabot e executar o audit inicial do Yarn no container Node.js 22 com o lockfile atual.
- [x] 1.2 Conciliar CVE ou GHSA, severidade, cadeias de dependência, versões instaladas, versões corrigidas e divergências entre fontes.

## 2. Atualização de dependências

- [x] 2.1 Atualizar Vite, Vue e demais pacotes pais afetados nas majors atuais. Aplicar resoluções transitivas específicas onde a atualização de pais deixar versões afetadas.
- [x] 2.2 Regenerar o lockfile com Yarn no container e verificar todas as cadeias afetadas.
- [x] 2.3 Verificar as dependências da distribuição do Cypress usada pelo Compose e pelo gate de release. Ajustar a distribuição e os dois fluxos caso mantenham dependências afetadas com correção compatível.

## 3. Validação de segurança e funcionamento

- [x] 3.1 Confirmar instalação reproduzível pelo lockfile, repetir o audit no container e registrar as versões efetivas, o resultado por aviso e qualquer aviso residual com justificativa e mitigação.
- [x] 3.2 Executar lint, build de produção, testes unitários e Cypress contra o build servido em contexto seguro. Conferir geração inicial, comprimento, classes, mínimos, regeneração e feedback de cópia.
- [x] 3.3 Copiar e colar a senha em navegador com acesso real à área de transferência. Conferir controles, resultado e legibilidade em desktop e mobile, registrando os resultados.
