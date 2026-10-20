# Verificações da atualização

Data: 19/10/2026.

## Concluídas

- Compilação de produção com Next.js: aprovada.
- Verificação TypeScript incluída na compilação: aprovada.
- Exportação estática atualizada: aprovada.
- Seis páginas localizadas conferidas, com `pt-BR`, `en` e `es` no HTML.
- Painel nativo `<dialog>` presente no cabeçalho de todas as versões.
- Controles de tema escuro, claro e automático presentes.
- Seletor de fonte original, Arial e Verdana presente.
- Lógica dos tamanhos de texto e limites de 100% a 200% verificada.
- Gravação e leitura das preferências verificadas, incluindo armazenamento bloqueado e dados inválidos.
- Resolução dos temas claro, escuro e automático verificada.
- Script de reaplicação das preferências antes da hidratação verificado.
- Mapeamento dos atalhos verificado; atalhos desativados, campos de edição e eventos já tratados são respeitados.
- Nomes, cargos e descrições da equipe presentes nos três idiomas.
- Logotipo original da Ultra Logic íntegro no código-fonte e na versão estática, confirmado por hash SHA-256.
- Foto anterior da segunda pessoa removida do pacote atualizado.
- Selo com CASA4, sem estrela ou imagem no centro; regra de rotação preservada.
- Logo da Ultra Logic usa as mesmas regras CSS da foto: cinza por padrão, cores originais e leve ampliação ao passar o mouse, com transição de 0,5 segundo.
- Referências locais de imagens, scripts e estilos conferidas.
- URLs canônicas e alternativas de idioma preservadas.
- Respostas HTTP conferidas para páginas e arquivos principais, incluindo o logo completo; um endereço inexistente retornou 404.
- Contrastes dos principais pares de texto e fundo calculados nos dois temas: todos os pares conferidos ficaram acima de 4,5:1. Isso não representa uma auditoria completa de conformidade.

## Alcance

Os controles foram conferidos no HTML gerado e a lógica de preferências e atalhos foi testada diretamente. A compilação, os arquivos e as respostas HTTP foram verificados como descrito acima.

A revisão visual e os testes de interação em navegador real não foram executados neste ambiente. Antes de publicar no domínio, confira em desktop e celular:

1. Abertura e fechamento do painel, inclusive por Escape e pelo fundo da janela.
2. Temas claro, escuro e automático.
3. Arial, Verdana e fontes originais, com tamanhos até 200%.
4. Persistência após recarregar e trocar de página ou idioma.
5. Atalhos, navegação por Tab, foco dos diálogos e menu do celular.
6. Redução de movimentos e funcionamento do selo giratório.
7. Nomes, cargos, descrições e apresentação integral do logo na equipe.
8. Filtros e detalhes do Portfólio e contato pelo WhatsApp.
