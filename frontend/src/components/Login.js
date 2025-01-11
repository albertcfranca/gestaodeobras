// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);  // Salvando o token corretamente
                alert('Login realizado com sucesso!');
                onLogin();
            } else {
                alert('Erro ao fazer login: ' + data.error);
            }
        } catch (error) {
            alert('Erro de conexão com o servidor.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h5" textAlign="center">Login</Typography>
            <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
            />
            <TextField
                label="Senha"
                type="password"
                fullWidth
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Entrar</Button>
        </Box>
    );
};

export default Login;
