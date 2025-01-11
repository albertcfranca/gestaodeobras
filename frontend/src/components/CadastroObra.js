// src/components/CadastroObra.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function CadastroObra({ onObraCadastrada }) {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        dataInicio: '',
        orcamentoTotal: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.nome) newErrors.nome = "O nome é obrigatório";
        if (!formData.descricao) newErrors.descricao = "A descrição é obrigatória";
        if (!formData.dataInicio) newErrors.dataInicio = "A data de início é obrigatória";
        if (formData.orcamentoTotal <= 0) newErrors.orcamentoTotal = "Orçamento deve ser maior que zero";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3000/obras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Obra cadastrada com sucesso!');
                setFormData({ nome: '', descricao: '', dataInicio: '', orcamentoTotal: '' });
                onObraCadastrada();
            } else {
                alert('Erro ao cadastrar obra.');
            }
        } catch (error) {
            alert('Erro de conexão com o servidor.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '400px', margin: 'auto' }}>
            <Typography variant="h5" textAlign="center" mb={2}>Cadastro de Obras</Typography>
            <TextField
                name="nome"
                label="Nome da Obra"
                value={formData.nome}
                onChange={handleChange}
                error={!!errors.nome}
                helperText={errors.nome}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                name="descricao"
                label="Descrição"
                value={formData.descricao}
                onChange={handleChange}
                error={!!errors.descricao}
                helperText={errors.descricao}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                name="dataInicio"
                label="Data de Início"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dataInicio}
                onChange={handleChange}
                error={!!errors.dataInicio}
                helperText={errors.dataInicio}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                name="orcamentoTotal"
                label="Orçamento Total (R$)"
                type="number"
                value={formData.orcamentoTotal}
                onChange={handleChange}
                error={!!errors.orcamentoTotal}
                helperText={errors.orcamentoTotal}
                fullWidth
                margin="normal"
                required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Cadastrar Obra
            </Button>
        </Box>
    );
}

export default CadastroObra;
