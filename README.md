# Bem-vindo ao Ag Sistemas

Este repositório contém duas aplicações principais: a API e o Frontend do Ag Sistemas. Abaixo você encontrará uma visão geral de cada aplicação e instruções sobre onde encontrar mais informações para configurar e executar cada uma delas.

## API

A API do Ag Sistemas é construída com [NestJS](https://nestjs.com/) e [Prisma](https://www.prisma.io/). Ela gerencia usuários e produtos, utilizando autenticação JWT e validação de dados com [Zod](https://zod.dev/).

### Funcionalidades Principais

- **Autenticação**: Login, registro e logout de usuários.
- **Gerenciamento de Usuários**: Perfil do usuário autenticado.
- **Gerenciamento de Produtos**: Criação, listagem, atualização e exclusão de produtos.

Para mais detalhes sobre a configuração e execução da API, consulte o [README.md](api/README.md) na pasta `api`.

## Frontend

O Frontend do Ag Sistemas é uma aplicação web construída com [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/) e [Vite](https://vitejs.dev/). Ele fornece uma interface de usuário para gerenciar produtos e usuários, com suporte a temas e notificações.

### Funcionalidades Principais

- **Autenticação**: Login, registro e logout de usuários.
- **Gerenciamento de Produtos**: Listagem, criação, edição e exclusão de produtos.
- **Temas**: Alternância entre temas claro, escuro e sistema.

Para mais detalhes sobre a configuração e execução do Frontend, consulte o [README.md](front/README.md) na pasta `front`.

## Instruções Gerais

1. **Clone o repositório**:
```bash
  git clone https://github.com/seu-usuario/ag-sistemas.git
  cd ag-sistemas
```

2. Configuração e Execução:
- Para configurar e executar a API, siga as instruções no README.md da pasta api.
- Para configurar e executar o Frontend, siga as instruções no README.md da pasta front.

Se você tiver qualquer dúvida ou problema, por favor, consulte os READMEs específicos de cada aplicação para mais detalhes.