const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    dataInicio: { type: Date, required: true },  // Definido como obrigatório
    orcamentoTotal: { type: Number, required: true },
    status: { type: String, enum: ['planejamento', 'execução', 'concluído'], default: 'planejamento' }
});

module.exports = mongoose.model('Obra', ObraSchema);

