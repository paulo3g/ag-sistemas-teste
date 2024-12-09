# Ag Sistemas - Front

Este é o repositório do projeto Ag Sistemas, uma aplicação web para gerenciamento de produtos, usuários e autenticação.


## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida para projetos front-end.
- **React Query**: Biblioteca para gerenciamento de estado assíncrono.
- **Axios**: Cliente HTTP baseado em Promises.
- **Tailwind CSS**: Framework de CSS utilitário.
- **Zod**: Biblioteca de validação e parsing de esquemas.
- **Radix UI**: Componentes acessíveis e descomplicados para React.
- **Lucide React**: Ícones SVG para React.
- **Sonner**: Biblioteca de notificações.

## Funcionalidades

### Autenticação

- **Login**: Autenticação de usuários com email e senha.
- **Registro**: Criação de novos usuários.
- **Logout**: Encerramento de sessão do usuário.

### Gerenciamento de Produtos

- **Listagem de Produtos**: Exibição de produtos com paginação.
- **Criação e Edição de Produtos**: Formulário para adicionar ou editar produtos.
- **Exclusão de Produtos**: Remoção de produtos com confirmação.

### Temas

- **Alternância de Tema**: Alternância entre temas claro, escuro e sistema.

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ag-sistemas.git
cd ag-sistemas/front
```

2. Instale as dependências:
```bash
npm install
# OR
yarn
```

3. Configure as variáveis de ambiente: Copie o arquivo .env.example para .env.local e ajuste as variáveis conforme necessário.

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# OR
yarn dev
```

Scripts Disponíveis
- `npm run dev:` Inicia o servidor de desenvolvimento.
- `npm run build:` Compila o projeto para produção.
- `npm run lint:` Executa o linter para verificar problemas no código.

## Estrutura de Diretórios
`src/api` <br/>
Contém as funções de API para autenticação, produtos e usuários.

`src/components` <br/>
Contém os componentes reutilizáveis da aplicação, incluindo o menu de conta, cabeçalho, entrada de dinheiro, navegação, paginação, temas e componentes de UI.

`src/lib` <br/>
Contém utilitários e configurações, como a configuração do Axios e React Query.

`src/pages` <br/>
Contém as páginas da aplicação, organizadas por funcionalidades.

`src/styles` <br/>
Contém os arquivos de estilo, incluindo a configuração do Tailwind CSS.

`src` <br/>
Contém os arquivos principais da aplicação, como app.tsx, main.tsx e routes.tsx.