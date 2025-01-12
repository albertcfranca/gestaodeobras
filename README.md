
# Gestão de Obras

**Obrafacil** é uma aplicação web full stack para gestão de obras e reformas, focada em pessoas físicas que desejam controlar suas obras de forma simples e eficiente. A aplicação permite o gerenciamento de tarefas, custos, progresso da obra e controle de acesso através de autenticação segura.

## Funcionalidades
- ✅ **Cadastro e Login de Usuários com Autenticação JWT**
- ✅ **CRUD de Obras (Criar, Ler, Atualizar e Deletar)**
- ✅ **Proteção de Rotas com Autenticação JWT**
- ✅ **Validação de Formulários com Joi**
- ✅ **Criptografia de Senhas usando Bcrypt**
- ✅ **Testes Automatizados com Jest e Supertest**
- ✅ **Arquitetura Full Stack Separando Frontend e Backend**
- ✅ **Conexão com MongoDB Atlas**

---

## 📦 Estrutura do Projeto

```plaintext
gestaodeobras/
├── backend/
│   ├── index.js
│   ├── models/
│   │   ├── Obra.js
│   │   └── User.js
│   ├── tests/
│   │   └── auth.test.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   └── components/
│   │       ├── Login.js
│   │       ├── CadastroObra.js
│   │       └── EditObra.js
│   └── package.json
│
├── database/
│   └── scripts/
│
├── docker-compose.yml
├── .gitignore
├── README.md
├── LICENSE
└── package-lock.json

📡 Configuração e Execução
📋 Pré-requisitos
Node.js e npm/yarn instalados
MongoDB Atlas ou MongoDB Local

🛠️ Configuração
Clone o repositório: git clone https://github.com/seuusuario/gestaodeobra.git
Navegue até o diretório do backend: cd gestaodeobra/backend
Instale as dependências: npm install
Crie um arquivo .env com as seguintes variáveis: MONGO_URI=sua-conexao-com-mongodb
JWT_SECRET=sua-chave-secreta
PORT=3000

▶️ Executar o Backend
npm start

▶️ Executar o Frontend
cd ../frontend
npm install
npm start

📡 Documentação da API - Backend
Autenticação
Registrar Usuário
POST /register

Body JSON:
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}

Parâmetro	Tipo	Obrigatório	Descrição
nome	string	Sim	Nome do usuário
email	string	Sim	Email do usuário
senha	string	Sim	Senha para autenticação

Resposta de Sucesso (201 Created):
{
  "message": "Usuário registrado com sucesso!"
}

Login de Usuário
POST /login

Body JSON:
{
  "email": "joao@email.com",
  "senha": "123456"
}

Parâmetro	Tipo	Obrigatório	Descrição
email	string	Sim	Email do usuário
senha	string	Sim	Senha de acesso

Resposta de Sucesso (200 OK):

{
  "token": "jwt_token_gerado"
}

Obras
Criar Obra (Requer Autenticação)
POST /obras

Body JSON:
{
  "nome": "Reforma Cozinha",
  "descricao": "Reforma completa da cozinha.",
  "dataInicio": "2024-01-01",
  "orcamentoTotal": 10000
}

Parâmetro	Tipo	Obrigatório	Descrição
nome	string	Sim	Nome da obra
descricao	string	Sim	Descrição detalhada da obra
dataInicio	date	Sim	Data de início da obra
orcamentoTotal	number	Sim	Orçamento total da obra (R$)

Resposta de Sucesso (201 Created):
{
  "message": "Obra criada com sucesso!"
}

Listar Todas as Obras do Usuário
GET /obras

Cabeçalho Requerido:
Authorization: Bearer <token>

Resposta de Sucesso (200 OK):
[
  {
    "_id": "65d1234abcde5678",
    "nome": "Reforma Cozinha",
    "descricao": "Reforma completa da cozinha.",
    "dataInicio": "2024-01-01",
    "orcamentoTotal": 10000
  }
]

🧪 Testes Automatizados
Para rodar os testes automatizados, utilize o comando:
npm test

📦 Tecnologias Utilizadas
Frontend: React.js, Material UI
Backend: Node.js, Express.js
Banco de Dados: MongoDB (Atlas e Local)
Autenticação: JWT (JSON Web Token)
Criptografia: Bcrypt.js
Validação: Joi
Testes: Jest, Supertest
Gerenciamento de Pacotes: npm
Controle de Versão: Git e GitHub

📜 Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

✨ Contribuições
Contribuições são bem-vindas! Para contribuir:

1 Fork o projeto.
2 Crie uma nova branch: git checkout -b feature/nova-feature.
3 Commit suas mudanças: git commit -m 'Adiciona nova feature'.
4 Envie para o repositório remoto: git push origin feature/nova-feature.
5 Abra um Pull Request.

📧 Contato
Autor: Albert christian frança
E-mail: albertcfranca@gmail.com
