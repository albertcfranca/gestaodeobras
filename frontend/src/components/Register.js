// src/components/Register.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.nome) newErrors.nome = "O nome é obrigatório";
        if (!formData.email) newErrors.email = "O email é obrigatório";
        if (!formData.senha || formData.senha.length < 6) newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Usuário registrado com sucesso!');
                setFormData({ nome: '', email: '', senha: '' });
            } else {
                alert(`Erro: ${data.error}`);
            }
        } catch (error) {
            alert('Erro de conexão com o servidor.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', padding: '20px', boxShadow: 3 }}>
            <Typography variant="h5" textAlign="center" mb={2}>Cadastro de Usuário</Typography>
            <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                error={!!errors.nome}
                helperText={errors.nome}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Senha"
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                error={!!errors.senha}
                helperText={errors.senha}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Cadastrar
            </Button>
        </Box>
    );
};

export default Register;
