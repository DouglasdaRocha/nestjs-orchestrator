 Projeto NestJS com TypeORM e PostgreSQL

Este projeto é uma aplicação desenvolvida com NestJS, TypeORM e PostgreSQL. O objetivo é gerenciar entidades de invoice de maneira eficiente, utilizando filas para processamento assíncrono.

## Funcionalidades

- **Controller de Invoice**: Um controller que recebe requisições `POST` para inserir 10 entidades de invoice no banco de dados. Cada invoice é criada com o status "Processing".
  
- **Agendador de Tarefas (Cron)**: Uma tarefa cron, utilizando o módulo `@nestjs/schedule`, que busca periodicamente no banco de dados por invoices com status "Processing". Os invoices encontrados são enviados para uma fila no BullMQ.

- **Processamento em Fila**: O BullMQ processa cada invoice na fila separadamente. Após o processamento, o status de cada invoice é atualizado para "Paid".

## Estrutura do Projeto

- **NestJS**: Framework para construção de aplicações Node.js.
- **TypeORM**: ORM que facilita a interação com o banco de dados PostgreSQL.
- **BullMQ**: Biblioteca para gerenciamento de filas e tarefas em segundo plano.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.

## Instruções de Uso

1. **Instalação**: Certifique-se de ter o Node.js e o PostgreSQL instalados. Em seguida, clone o repositório e execute `npm install` para instalar as dependências.

2. **Configuração do Banco de Dados**: Configure suas credenciais de banco de dados no arquivo de configuração do TypeORM.

3. **Executar a Aplicação**: Inicie a aplicação com o comando `npm run start:dev`.

4. **Adicionar Invoices**: Faça uma requisição `POST` para o endpoint de invoices para inserir 10 novas entidades com status "Processing".

  **Exemplo de Payload**:
   
  POST http://localhost:3000/invoice


```json
{
    "state": "Active",
    "owner": {
        "id": 58,
        "name": "Breno Rezende"
    },
    "kind": "Subscription",
    "name": "Enterprise",
    "date": "2024-01-31T12:17:45",
    "status": "Processing",
    "salesChannel": "Website",
    "plan": {
        "id": 5,
        "name": "Enterprise"
    },
    "paymentDetails": {
        "amount": 782.37,
        "discount": 27.88,
        "tax": 25.05,
        "total": 779.54,
        "kind": "Yearly",
        "date": "2024-01-31T12:17:45",
        "bank": "Banco do Brasil",
        "country": "Brasil",
        "IBAN": "RUCT39186154961725",
        "codigo": "VSIQ91593792822799"
    },
    "paymentMethod": {
        "kind": "CreditCard"
    },
    "billingDetails": {
        "documentNumber": "215.683.947-64",
        "legalName": "Martins Cavalcanti S.A.",
        "address": {
            "street": "Alameda Emanuel Vieira",
            "number": "4486",
            "postalCode": "59162577",
            "state": "MT",
            "city": "Silveira de Goiás",
            "neighborhood": "Candelaria",
            "country": "Brasil"
        }
    }
}
```
5. **Monitorar Processamento**: Acesse a fila do BullMQ para acompanhar o processamento das invoices e verificar a atualização do status.

## Contribuição

Sinta-se à vontade para contribuir com o projeto. Crie um fork do repositório, faça suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License.
