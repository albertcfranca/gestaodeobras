require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// Middleware de autenticação com JWT
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send({ error: 'Acesso negado. Token não fornecido!' });
    }

    try {
        const tokenVerificado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenVerificado;  // Adiciona os dados do usuário ao request
        next(); // Prossegue para a próxima rota
    } catch (error) {
        res.status(400).send({ error: 'Token inválido!' });
    }
};

// Conectar ao MongoDB usando a variável de ambiente
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gestaoobras')
    .then(() => console.log('Conectado ao MongoDB Atlas!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importar modelos
const Obra = require('./models/Obra');
const User = require('./models/User');

// Rota para cadastrar uma nova obra protegida
app.post('/obras', verificarToken, async (req, res) => {
    try {
        const novaObra = new Obra(req.body);
        const obraSalva = await novaObra.save();
        res.status(201).send(obraSalva);
    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar obra', detalhes: error });
    }
});

// Rota para listar todas as obras
app.get('/obras', async (req, res) => {
    try {
        const obras = await Obra.find();
        res.status(200).send(obras);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar obras' });
    }
});

// Rota para atualizar uma obra protegida
app.put('/obras/:id', verificarToken, async (req, res) => {
    try {
        const obraAtualizada = await Obra.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!obraAtualizada) {
            return res.status(404).send({ error: 'Obra não encontrada' });
        }
        res.status(200).send(obraAtualizada);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao atualizar a obra', detalhes: error });
    }
});

// Rota para excluir uma obra protegida
app.delete('/obras/:id', verificarToken, async (req, res) => {
    try {
        const obraDeletada = await Obra.findByIdAndDelete(req.params.id);
        if (!obraDeletada) {
            return res.status(404).send({ error: 'Obra não encontrada' });
        }
        res.status(200).send({ message: 'Obra deletada com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao deletar a obra', detalhes: error });
    }
});

// Rota de registro de usuário
app.post('/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);
        const novoUsuario = new User({ nome, email, senha: senhaCriptografada });
        await novoUsuario.save();
        res.status(201).send({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(400).send({ error: 'Erro ao registrar usuário', detalhes: error });
    }
});

// Rota de login e geração de token
app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).send({ error: 'Usuário não encontrado!' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).send({ error: 'Senha incorreta!' });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao fazer login' });
    }
});

// Rota principal de teste
app.get('/', (req, res) => {
    res.send('API de Gestão de Obras está funcionando!');
});

// Definir a porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));