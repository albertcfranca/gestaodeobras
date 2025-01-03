require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

// Conectando ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB Atlas!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Importando o modelo de Obra
const Obra = require('./models/Obra');

// Rota para cadastrar uma nova obra
app.post('/obras', async (req, res) => {
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

// Rota principal de teste
app.get('/', (req, res) => {
    res.send('API de Gestão de Obras está funcionando!');
});

// Definir a porta e iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
