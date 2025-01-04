# gestaodeobras
Este projeto é uma aplicação web para gestão de obras voltada para pessoas físicas em processo de construção. A aplicação tem o objetivo de auxiliar no controle de tarefas, materiais, custos e progresso de uma obra de forma simples e eficiente.
# Gestão de Obras
Este repositório contém a aplicação backend para a gestão de obras, desenvolvida utilizando Node.js, Express, MongoDB, JWT para autenticação e bcrypt para criptografia de senhas.


gestaodeobra/
├── backend/
│   ├── index.js
│   ├── models/
│   │   ├── Obra.js
│   │   └── User.js
│   ├── tests/
│   │   └── auth.test.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── database/
    ├── scripts/
    └── migrations/

Funcionalidades do Backend
Registro de usuários
Login com geração de token JWT
CRUD de obras (criação, listagem, atualização e exclusão)
Proteção de rotas com autenticação JWT
Configuração e Execução
Pré-requisitos
Node.js e npm instalados
MongoDB Atlas ou MongoDB local configurado
Configuração
Clone o repositório:
bash
Copiar código
git clone https://github.com/seuusuario/gestaodeobra.git
Navegue até a pasta do backend:
bash
Copiar código
cd gestaodeobra/backend
Instale as dependências:
bash
Copiar código
npm install
Crie um arquivo .env com as seguintes variáveis:
env
Copiar código
MONGO_URI=sua-conexao-com-mongodb
JWT_SECRET=sua-chave-secreta
PORT=3000
Execução
Para iniciar o servidor:

bash
Copiar código
npm start
Testes
Para rodar os testes automatizados:

bash
Copiar código
npm test
Endpoints da API
Autenticação
POST /register - Registrar um novo usuário
POST /login - Realizar login
Obras
POST /obras - Criar uma nova obra (autenticado)
GET /obras - Listar todas as obras (autenticado)
PUT /obras/:id - Atualizar uma obra existente (autenticado)
DELETE /obras/:id - Excluir uma obra existente (autenticado)
Tecnologias Utilizadas
Backend: Node.js, Express
Banco de Dados: MongoDB
Autenticação: JWT
Criptografia: bcrypt
Testes: Jest, Supertest