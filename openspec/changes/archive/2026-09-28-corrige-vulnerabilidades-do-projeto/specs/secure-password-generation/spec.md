## Purpose

Assegura que toda senha produzida pela aplicação derive de entropia criptograficamente segura e preserve distribuição uniforme entre os caracteres permitidos.

## ADDED Requirements

### Requirement: Fonte criptograficamente segura
O sistema SHALL usar uma fonte de aleatoriedade criptograficamente segura para todas as decisões que compõem uma senha e SHALL NOT recorrer a um gerador pseudoaleatório não criptográfico.

#### Scenario: Geração normal no navegador
- **WHEN** o usuário solicita uma senha em um navegador compatível
- **THEN** cada caractere e cada posição embaralhada SHALL derivar da fonte criptograficamente segura disponibilizada pelo ambiente

#### Scenario: Fonte segura indisponível
- **WHEN** o ambiente não disponibiliza uma fonte criptograficamente segura
- **THEN** o sistema SHALL interromper a geração com erro explícito e SHALL NOT gerar uma senha com fonte mais fraca

### Requirement: Amostragem uniforme
O sistema SHALL mapear valores aleatórios para conjuntos de caracteres e posições sem introduzir viés de módulo observável.

#### Scenario: Intervalo incompatível com a faixa aleatória
- **WHEN** o tamanho do conjunto de destino não divide exatamente a faixa de valores da fonte aleatória
- **THEN** o sistema SHALL descartar valores fora do maior intervalo divisível antes de selecionar o resultado

### Requirement: Preservação das regras de composição
O sistema SHALL preservar comprimento, classes habilitadas e quantidades mínimas configuradas ao adotar a fonte criptográfica.

#### Scenario: Senha com mínimos configurados
- **WHEN** o usuário define comprimento e quantidades mínimas de numerais ou caracteres especiais
- **THEN** a senha gerada SHALL respeitar essas regras usando somente decisões aleatórias criptograficamente seguras
