# Ag Sistemas - API

## Descrição

Esta é uma API construída com [NestJS](https://nestjs.com/) e [Prisma](https://www.prisma.io/) para gerenciar usuários e produtos. A aplicação utiliza autenticação JWT e validação de dados com [Zod](https://zod.dev/).

## Estrutura do Projeto

## Configuração

### Variáveis de Ambiente

A aplicação utiliza as seguintes variáveis de ambiente, definidas no arquivo `.env`:

- `DATABASE_URL`: URL de conexão com o banco de dados MySQL.
- `JWT_SECRET`: Segredo utilizado para assinar os tokens JWT.
- `PORT`: Porta em que a aplicação será executada (padrão: 3333).

### Docker

A aplicação pode ser executada utilizando Docker. O arquivo `docker-compose.yml` define um serviço MySQL:

```yml
version: "3.9"

services:
  mysql:
    image: mysql:8.0
    container_name: ag-sistemas-sql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: ag-sistemas
    ports:
      - "3306:3306"
    volumes:
      - ./data/sql:/data/mysql
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ag-sistemas.git
cd ag-sistemas/api
```

2. Instale as dependências:
```bash
npm install
# OR
yarn
```

3. Configure as variáveis de ambiente no arquivo `.env`: Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.

4. Execute as migrações do Prisma:


5. Inicie a aplicação:
```bash
npm run start:dev
# OR
yarn start:dev
```

## Endpoints

#Autenticação
- `POST /login`: Autentica um usuário e retorna um token JWT.
- `POST /register`: Registra um novo usuário.

#Usuários
- `GET /me`: Retorna o perfil do usuário autenticado.
- `POST /logout`: Faz logout do usuário autenticado.

#Produtos
- `POST /products`: Cria um novo produto.
- `GET /products`: Retorna uma lista de produtos.
- `GET /products/:id`: Retorna um produto específico.
- `PUT /products/:id`: Atualiza um produto.
- `DELETE /products/:id`: Deleta um produto.

## Tecnologias Utilizadas
- NestJS
- Prisma
- Zod
- MySQL
- Docker