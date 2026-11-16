# EcoImpacto — evidências de entrega e validação

Disciplina: Desenvolvimento Front-End  
Instituição: UNICID  
Repositório: https://github.com/nascimentogiovanna82-lab/EcoImpacto  
Publicação: https://ecoimpacto-site-production.up.railway.app/

## Funcionalidades implementadas no repositório

- 10 páginas HTML interligadas.
- Folha de estilos compartilhada com adaptação para telas menores.
- Menu móvel com atualização de `aria-expanded`.
- Preferência de tamanho de fonte persistida no LocalStorage.
- Formulário com campos obrigatórios e validação no navegador. O formulário é demonstrativo e não envia dados a um servidor.
- Página de mídia com vídeo educativo da ONU Brasil sobre o ODS 12 e narração por voz do navegador, acompanhada de transcrição.
- Navegação por teclado, link para pular ao conteúdo, foco visível e suporte à preferência por movimento reduzido.

## Testes automatizados do projeto

Execute localmente:

```bash
npm test
```

O teste verifica a existência das dez páginas, metadados básicos, landmarks, links locais, breakpoints responsivos e presença dos recursos JavaScript e multimídia. O resultado é gravado em `artifacts/site-check.json`.

## Validação HTML e Lighthouse

O workflow `.github/workflows/quality.yml` executa:
1. Testes automatizados do projeto.
2. Nu Html Checker (validador HTML Nu/W3C) nas dez páginas.
3. Lighthouse contra a versão servida localmente no runner.
4. Armazenamento dos relatórios como artefatos da execução do GitHub Actions.

Os resultados de W3C e Lighthouse só devem ser apresentados como aprovados depois que a execução correspondente terminar sem erros. Consulte a aba **Actions** do GitHub e baixe o artefato **ecoimpacto-quality-reports**.

## Evidências visuais para a apresentação

Guardar capturas reais de:
- As dez páginas abertas e a navegação entre elas.
- Menu aberto em viewport móvel.
- Preferência de fonte antes/depois e após recarregar a página.
- Formulário com validação de campos e mensagem demonstrativa.
- Vídeo e narração reproduzidos na página Mídia.
- Relatório Nu Html Checker e relatório Lighthouse baixados do GitHub Actions.
- Site publicado na URL do Railway.

## Limites que devem ser informados

- O formulário não transmite nem armazena mensagens em servidor.
- A narração usa a voz disponível no navegador e possui transcrição textual.
- O vídeo é incorporado do canal ONU Brasil; a reprodução depende da disponibilidade do YouTube e da conexão.
- Indicadores de impacto exibidos no site são demonstrativos, não resultados de ações reais.
- A tabela de custos deve refletir os valores e o plano efetivamente exibidos no painel do provedor na data da consulta.
