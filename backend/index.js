require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// Middleware de autenticação com JWT atualizado
const verificarToken = (req, res, next) => {
    const tokenHeader = req.header('Authorization');

    if (!tokenHeader) {
        return res.status(401).send({ error: 'Acesso negado. Token não fornecido!' });
    }

    // Garantindo que o formato seja "Bearer <token>"
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


// Conectar ao MongoDB
if (!mongoose.connection.readyState) { 
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gestaoobras')
        .then(() => console.log('Conectado ao MongoDB Atlas!'))
        .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
}

// Importar modelos
const Obra = require('./models/Obra');
const User = require('./models/User');

// Rota para cadastrar uma nova obra protegida
app.post('/obras', verificarToken, async (req, res) => {
    try {
        const { nome, descricao, dataInicio, orcamentoTotal } = req.body;
        if (!nome || !descricao || !dataInicio || !orcamentoTotal) {
            return res.status(400).send({ error: 'Todos os campos são obrigatórios!' });
        }
        const novaObra = new Obra(req.body);
        const obraSalva = await novaObra.save();
        res.status(201).send(obraSalva);
    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar obra', detalhes: error.message });
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

// Rota para atualizar uma obra
app.put('/obras/:id', verificarToken, async (req, res) => {
    try {
        const obraAtualizada = await Obra.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!obraAtualizada) {
            return res.status(404).send({ error: 'Obra não encontrada' });
        }
        res.status(200).send(obraAtualizada);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao atualizar a obra', detalhes: error.message });
    }
});

// Rota para excluir uma obra
app.delete('/obras/:id', verificarToken, async (req, res) => {
    try {
        const obraDeletada = await Obra.findByIdAndDelete(req.params.id);
        if (!obraDeletada) {
            return res.status(404).send({ error: 'Obra não encontrada' });
        }
        res.status(200).send({ message: 'Obra deletada com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao deletar a obra', detalhes: error.message });
    }
});

// Rota de registro de usuário com validação e debug
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
        console.log('Senha original:', senha);
        console.log('Senha hash gerada:', senhaCriptografada);
        const novoUsuario = new User({ nome, email: email.trim(), senha: senhaCriptografada });
        await novoUsuario.save();
        res.status(201).send({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(400).send({ error: 'Erro ao registrar usuário', detalhes: error.message });
    }
});

// Rota de login com validação usando método do schema
app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await User.findOne({ email: email.trim() });
        if (!usuario) {
            return res.status(404).send({ error: 'Usuário não encontrado!' });
        }

        const senhaCorreta = await usuario.isValidPassword(senha.trim());
        if (!senhaCorreta) {
            return res.status(401).send({ error: 'Senha incorreta!' });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao fazer login', detalhes: error.message });
    }
});

// Rota principal de teste
app.get('/', (req, res) => {
    res.send('API de Gestão de Obras está funcionando!');
});

// Definir a porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
