# Projeto E-commerce 🛍️

Bem-vindo ao meu projeto de e-commerce, uma aplicação completa desenvolvida como parte de um teste técnico para a posição de Frontend Pleno. Este projeto utiliza uma variedade de tecnologias e segue uma arquitetura de Clean Architecture, proporcionando uma experiência robusta e organizada.

## Funcionalidades 🚀
- **CRUD de Produtos**: A aplicação permite a realização de operações CRUD (Criar, Ler, Atualizar, Deletar) para gerenciar produtos de forma eficiente.
- **Listagem de Produtos**: Exibe uma lista de produtos com detalhes importantes, proporcionando uma visão completa do catálogo disponível.
- **Filtros Avançados**: Implementei filtros para facilitar a busca, incluindo filtragem por data de criação do produto, busca por nome e opção de ordenar pelo menor preço.
- **Contexto Global**: Utilizei um contexto global que pode ser acessado em toda a aplicação, proporcionando uma gestão centralizada de estados.
- **LocalStorage para Carrinho**: A aplicação salva o carrinho do usuário no `localStorage`, garantindo a persistência dos itens mesmo ao recarregar a página.

## Tecnologias Utilizadas 🛠️
- **Frontend:**
  - React Hook Form e Yup para formulários eficientes e validações robustas.
  - React Router DOM para navegação na aplicação.
  - Tailwind CSS para estilos modernos e responsivos.
  - TypeScript para garantir tipagem estática e facilitar o desenvolvimento.
  - Axios para comunicação eficiente com a API.
- **Backend:**
  - NestJS para construir a API, seguindo uma arquitetura de Clean Architecture.
  - Banco de dados PostgreSQL para armazenamento de dados.
  - AWS RDS para hospedar o banco de dados.
  - AWS EC2 para realizar o build e hospedar a API.

## Como Instalar e Executar 🚀
1. Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.
2. Clone este repositório: `git clone https://github.com/leandrosuy/teste-frontend`
3. Navegue até o diretório do projeto: `cd teste-frontend`
4. Instale as dependências: `npm install` ou `yarn`
5. Execute o projeto: `npm run dev` ou `yarn dev`

O projeto estará rodando em [http://localhost:5173/](http://localhost:5173/). Divirta-se explorando a loja virtual! 🎉

## Autor 👨‍💻
Desenvolvido por [Leandro Dantas](https://github.com/leandrosuy/).