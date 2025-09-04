# Agenda Bank frontend
Esta aplicação é um frontend para gestão de transferências bancárias, permitindo ao usuário visualizar, cadastrar e acompanhar transações entre contas. A interface apresenta uma listagem paginada das transferências, integração com backend via API REST, e modal para cadastro de novas operações, com validação e feedback de erros.

## Decisões Arquiteturais

- **Angular Standalone Components**: Utilização de componentes standalone para modularidade e simplicidade, aproveitando recursos do Angular 16+.
- **Signals**: Uso de signals para gerenciamento reativo de estado, garantindo melhor performance e integração com o Angular moderno.
- **Serviço de Transferências**: Separação da lógica de comunicação com a API em um serviço dedicado (TransferService), facilitando manutenção e testes.
- **Estilização**: CSS modular por componente, fonte global Inter, e tabela responsiva com paginação.
- **Modal**: Implementação de modal para cadastro de transferências, com feedback de erro dinâmico.

## Versões Utilizadas
- **Node.js**: 18+
- **Angular**: 20.x
- **TypeScript**: 5.x

## Ferramentas e Bibliotecas
- Angular CLI
- RxJS
- Zone.js
- Google Fonts - Inter

### Instruções para Subida do Projeto
1. Instale as dependências:
    ```bash
    npm install
    ```

2. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
    O frontend estará disponível em `http://localhost:4200`.

3. API Backend:
    - Certifique-se que a API de transferências está rodando em `http://localhost/api/transfers`.
    - O frontend consome os endpoints GET e POST conforme especificado.

## Estrutura Principal
- `src/app/transfer/transfer-list.*` - Tela principal, listagem, modal e paginação
- [transfer.service.ts](/src/app/transfer/transfer.service.ts) - Serviço de integração com API
- [styles.css](/src/styles.css) - Estilos globais
- [index.html](/src/index.html) - Fonte Inter e configurações globais

## Observações
- O projeto utiliza Angular Signals, recomendando Angular 16+.
```bash
npm install -g @angular/cli
```
