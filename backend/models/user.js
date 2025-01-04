// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: String,
    email: { type: String, unique: true },
    senha: String
});

// Método para comparar senhas
UserSchema.methods.isValidPassword = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
