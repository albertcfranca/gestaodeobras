require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const Joi = require('joi');

const app = express();
app.use(cors());
app.use(express.json());

// Middleware de autenticação com JWT
const verificarToken = (req, res, next) => {
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader) {
        return res.status(401).send({ error: 'Acesso negado. Token não fornecido!' });
    }

    const token = tokenHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Formato de token inválido!' });
    }

    try {
        const tokenVerificado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenVerificado;
        next();
    } catch (error) {
        res.status(400).send({ error: 'Token inválido!' });
    }
};

// Esquema de validação de obras usando Joi
const obraSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().min(10).required(),
    dataInicio: Joi.date().iso().required(),
    orcamentoTotal: Joi.number().positive().required()
});

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gestaoobras')
    .then(() => console.log('Conectado ao MongoDB Atlas!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importar modelos
const Obra = require('./models/Obra');
const User = require('./models/User');

// Exportar app para testes automatizados
module.exports = app;

// Rota de criação de obra com validação e tratamento de erros refinados
app.post('/obras', verificarToken, async (req, res) => {
    try {
        const { error } = obraSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }

        const novaObra = new Obra({
            ...req.body,
            usuarioId: req.user.id
        });
        const obraSalva = await novaObra.save();
        res.status(201).send(obraSalva);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao criar obra.', detalhes: error.message });
    }
});

// Rota de listagem de obras do usuário logado
app.get('/obras', verificarToken, async (req, res) => {
    try {
        const obras = await Obra.find({ usuarioId: req.user.id });
        res.status(200).send(obras);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar obras.', detalhes: error.message });
    }
});

// Rota de atualização de uma obra
app.put('/obras/:id', verificarToken, async (req, res) => {
    try {
        const obraAtualizada = await Obra.findOneAndUpdate(
            { _id: req.params.id, usuarioId: req.user.id },
            req.body,
            { new: true }
        );

        if (!obraAtualizada) {
            return res.status(404).send({ error: 'Obra não encontrada ou sem permissão.' });
        }
        res.status(200).send(obraAtualizada);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao atualizar a obra', detalhes: error.message });
    }
});

// Rota de exclusão de uma obra
app.delete('/obras/:id', verificarToken, async (req, res) => {
    try {
        const obraDeletada = await Obra.findOneAndDelete({ _id: req.params.id, usuarioId: req.user.id });
        if (!obraDeletada) {
            return res.status(404).send({ error: 'Obra não encontrada ou sem permissão.' });
        }
        res.status(200).send({ message: 'Obra deletada com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao deletar a obra', detalhes: error.message });
    }
});

// Rota de registro de usuário com validação e tratamento aprimorado
app.post('/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).send({ error: 'Todos os campos são obrigatórios!' });
        }
        
        const usuarioExistente = await User.findOne({ email: email.trim() });
        if (usuarioExistente) {
            return res.status(400).send({ error: 'E-mail já cadastrado!' });
        }

        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha.trim(), salt);
        const novoUsuario = new User({ nome, email: email.trim(), senha: senhaCriptografada });
        await novoUsuario.save();
        res.status(201).send({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao registrar usuário.', detalhes: error.message });
    }
});

// Rota de login com validação aprimorada
app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await User.findOne({ email: email.trim() });
        
        // Melhorando a segurança com mensagem unificada
        if (!usuario || !(await bcrypt.compare(senha.trim(), usuario.senha))) {
            return res.status(401).send({ error: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao fazer login.', detalhes: error.message });
    }
});

// Rota principal de teste
app.get('/', (req, res) => {
    res.send('API de Gestão de Obras está funcionando!');
});

// Definir a porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Fechamento correto para testes Jest
process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    process.exit(0);
});
