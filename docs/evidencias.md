# EcoImpacto — evidências de entrega e validação

Disciplina: Desenvolvimento Front-End  
Instituição: UNICID  
Repositório: https://github.com/nascimentogiovanna82-lab/EcoImpacto  
Publicação: https://ecoimpacto-site-production.up.railway.app/

## Funcionalidades implementadas
- 10 páginas HTML interligadas.
- CSS compartilhado com breakpoints para telas menores.
- Menu móvel com atualização de aria-expanded.
- Preferência de tamanho de fonte persistida no LocalStorage.
- Formulário com campos obrigatórios e validação no navegador. É demonstrativo e não envia mensagens a servidor.
- Página Mídia com vídeo educativo sobre ODS 12, narração por voz do navegador e transcrição.
- Navegação por teclado, link para pular ao conteúdo, foco visível e preferência por movimento reduzido.

## Testes efetivamente executados
Execução GitHub Actions: https://github.com/nascimentogiovanna82-lab/EcoImpacto/actions/runs/43980141842

- Workflow: concluído com sucesso.
- Testes automatizados: 10 páginas verificadas, 250 links locais, 349 verificações aprovadas e zero falhas.
- Nu Html Checker: etapa concluída com sucesso; nenhum erro reportado no modo --errors-only.
- Lighthouse (página inicial no runner do GitHub Actions): Desempenho 97, Acessibilidade 95, Boas práticas 96 e SEO 100.
- Métricas: FCP 0,8 s; LCP 1,2 s; TBT 190 ms; CLS 0; Speed Index 0,8 s.

Os arquivos completos estão no artefato ecoimpacto-quality-reports da execução acima.

## Evidências visuais ainda necessárias
As capturas do site em aparelho físico devem ser feitas no navegador: página inicial, menu móvel aberto, alteração de fonte, formulário, vídeo e narração. Os relatórios automáticos não substituem fotos de testes manuais em celular ou computador.

## Limites a informar na apresentação
- O formulário valida os dados, mas não envia nem armazena mensagens em servidor.
- A narração depende do recurso de voz do navegador e tem transcrição.
- O vídeo incorporado depende da disponibilidade do YouTube e da conexão.
- Indicadores de impacto do site são demonstrativos, não resultados de ações reais.
- Lighthouse foi executado no runner, contra a página inicial servida localmente; as pontuações não representam testes em todos os aparelhos nem em todas as páginas.
- Não há confirmação de domínio próprio contratado. O subdomínio Railway é o endereço público fornecido pela plataforma.
