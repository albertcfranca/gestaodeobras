// tests/auth.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

describe('Testes de Autenticação e CRUD de Obras', () => {
    let token;
    let obraId;
    let testUserEmail = `teste${Date.now()}@email.com`;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Teste de Registro de Usuário
    test('Registrar um novo usuário com sucesso', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                nome: 'Teste User',
                email: testUserEmail,
                senha: 'senha123'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Usuário registrado com sucesso!');
    });

    // Teste de Login com Usuário Registrado
    test('Login com usuário registrado', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: testUserEmail,
                senha: 'senha123'
            });
        expect(res.statusCode).toBe(200);
        token = res.body.token;
        expect(token).toBeDefined();
    });

    // Teste de Criação de Obra com Token Válido
    test('Criar uma nova obra com token válido', async () => {
        const res = await request(app)
            .post('/obras')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Obra Teste',
                descricao: 'Descrição válida para teste',
                dataInicio: '2024-01-01',
                orcamentoTotal: 1000
            });
        expect(res.statusCode).toBe(201);
        obraId = res.body._id;
        expect(res.body.nome).toBe('Obra Teste');
    });

    // Teste de Listagem de Obras (Deve Listar Apenas as Obras do Usuário)
    test('Listar todas as obras do usuário autenticado', async () => {
        const res = await request(app)
            .get('/obras')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Teste de Atualização de Obra
    test('Atualizar uma obra existente', async () => {
        const res = await request(app)
            .put(`/obras/${obraId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Obra Atualizada',
                descricao: 'Descrição atualizada',
                orcamentoTotal: 2000
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.nome).toBe('Obra Atualizada');
    });

    // Teste de Exclusão de Obra
    test('Excluir uma obra existente', async () => {
        const res = await request(app)
            .delete(`/obras/${obraId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Obra deletada com sucesso!');
    });

    // Teste de Criação de Obra com Token Inválido
    test('Tentativa de criar obra com token inválido', async () => {
        const res = await request(app)
            .post('/obras')
            .set('Authorization', 'Bearer token_invalido')
            .send({
                nome: 'Obra Teste',
                descricao: 'Descrição válida para teste',
                dataInicio: '2024-01-01',
                orcamentoTotal: 1000
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Token inválido!');
    });
});
