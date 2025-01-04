const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

describe('Testes de Autenticação e CRUD de Obras', () => {
    let token;
    let obraId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Registrar um novo usuário com sucesso', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                nome: 'Teste User',
                email: `teste${Date.now()}@email.com`, // E-mail dinâmico para evitar duplicação
                senha: 'senha123'
            });
        console.log("Resposta de Registro:", res.body); // Adicionado para debug
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Usuário registrado com sucesso!');
    });

    test('Login com usuário registrado', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'testeuser@email.com',
                senha: 'senha123'
            });
        expect(res.statusCode).toBe(200);
        token = res.body.token;
    });
});
