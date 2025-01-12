Obrafácil
Obrafácil é uma aplicação web desenvolvida para auxiliar pessoas físicas no gerenciamento de obras e reformas. A plataforma oferece ferramentas para controle de tarefas, materiais, custos e progresso das obras de forma simples e eficiente.

Funcionalidades
Registro de Usuários: Permite o cadastro de novos usuários com autenticação segura.
Login: Autenticação de usuários com geração de token JWT para acesso seguro.
Gestão de Obras:
Criação de Obras: Adicione novas obras com detalhes como nome, descrição, data de início e orçamento total.
Listagem de Obras: Visualize todas as obras cadastradas associadas ao usuário logado.
Atualização de Obras: Edite informações das obras existentes.
Exclusão de Obras: Remova obras que não são mais necessárias.
Proteção de Rotas: Acesso às funcionalidades principais apenas para usuários autenticados.
Tecnologias Utilizadas
Backend:
Node.js
Express
MongoDB
JWT para autenticação
Bcrypt para criptografia de senhas
Frontend:
React.js
Axios para requisições HTTP
Bootstrap para estilização
Testes:
Jest
Supertest
Estrutura do Projeto
O projeto está organizado da seguinte forma:


gestaodeobra/
├── backend/
│   ├── models/               # Modelos de dados (Mongoose)
│   ├── node_modules/         # Dependências do backend
│   ├── tests/                # Testes automatizados (Jest e Supertest)
│   ├── .env                  # Configurações de variáveis de ambiente
│   ├── index.js              # Arquivo principal do servidor Express
│   ├── jest.config.js        # Configurações do Jest
│   ├── package-lock.json     # Lock de dependências do backend
│   └── package.json          # Configurações e dependências do backend
│
├── frontend/
│   ├── node_modules/         # Dependências do frontend
│   ├── public/               # Arquivos públicos (index.html, favicon, etc.)
│   ├── src/                  # Código-fonte React
│   ├── .gitignore            # Ignorar arquivos desnecessários no git
│   ├── package-lock.json     # Lock de dependências do frontend
│   ├── package.json          # Configurações e dependências do frontend
│   └── README.md             # Instruções para o frontend
│
├── docker-compose.yml        # Arquivo para subir serviços com Docker
├── LICENSE                   # Licença do projeto
├── .gitignore                # Ignorar arquivos no repositório
└── README.md                 # Instruções gerais do projeto


Pré-requisitos
Node.js e npm instalados.
MongoDB Atlas ou instância local do MongoDB configurada.
Configuração e Execução
Clone o repositório:


git clone https://github.com/seuusuario/obrafacil.git
Backend:

Navegue até a pasta do backend:


cd obrafacil/backend
Instale as dependências:


npm install
Crie um arquivo .env com as seguintes variáveis:

env
MONGO_URI=sua-conexao-com-mongodb
JWT_SECRET=sua-chave-secreta
PORT=3000
Inicie o servidor:


npm start
Frontend:

Navegue até a pasta do frontend:


cd ../frontend
Instale as dependências:


Copir código
npm install
Inicie o aplicativo:


npm start
Testes
Para rodar os testes automatizados no backend:


cd backend
npm test
Endpoints da API
Autenticação:
POST /register - Registrar um novo usuário.
POST /login - Realizar login.
Obras:
POST /obras - Criar uma nova obra (requer autenticação).
GET /obras - Listar todas as obras do usuário autenticado.
PUT /obras/:id - Atualizar uma obra existente (requer autenticação).
DELETE /obras/:id - Excluir uma obra existente (requer autenticação).
Licença
Este projeto está licenciado sob a Licença Apache 2.0. Consulte o arquivo LICENSE para obter mais informações.