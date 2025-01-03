const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    dataInicio: { type: Date, required: true },
    dataConclusao: { type: Date },
    orcamentoTotal: { type: Number, required: true },
    status: {
        type: String,
        enum: ['planejamento', 'em andamento', 'concluída'],
        default: 'planejamento'
    }
});

const Obra = mongoose.model('Obra', ObraSchema);
module.exports = Obra;
