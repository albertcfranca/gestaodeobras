// models/Obra.js
const mongoose = require('mongoose');

const obraSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    dataInicio: { type: Date, required: true },
    orcamentoTotal: { type: Number, required: true },
    status: { type: String, default: 'planejamento' },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // Adicionado
});

module.exports = mongoose.model('Obra', obraSchema);

