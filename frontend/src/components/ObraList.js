// src/components/ObraList.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Box, Alert } from '@mui/material';
import EditObra from './EditObra';
import CadastroObra from './CadastroObra';

const ObraList = () => {
    const [obras, setObras] = useState([]);
    const [obraSelecionada, setObraSelecionada] = useState(null);
    const [showCadastro, setShowCadastro] = useState(false); // Novo estado para exibir o formulário

    const fetchObras = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3000/obras', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setObras(data);
        } catch (error) {
            alert('Erro ao carregar as obras');
        }
    };

    useEffect(() => {
        fetchObras();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (window.confirm('Deseja realmente excluir esta obra?')) {
            try {
                const response = await fetch(`http://localhost:3000/obras/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) fetchObras();
            } catch (error) {
                alert('Erro ao excluir a obra');
            }
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => setShowCadastro(!showCadastro)}
            >
                {showCadastro ? 'Voltar para Lista' : 'Cadastrar Nova Obra'}
            </Button>

            {showCadastro ? (
                <CadastroObra onObraCadastrada={fetchObras} />
            ) : (
                <>
                    {obras.length === 0 ? (
                        <Alert severity="info">Nenhuma obra cadastrada ainda.</Alert>
                    ) : (
                        <Grid container spacing={2}>
                            {obras.map((obra) => (
                                <Grid item xs={12} sm={6} md={4} key={obra._id}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">{obra.nome}</Typography>
                                            <Typography>Descrição: {obra.descricao}</Typography>
                                            <Typography>Orçamento: R${obra.orcamentoTotal}</Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ mt: 2 }}
                                                onClick={() => setObraSelecionada(obra)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{ mt: 2, ml: 1 }}
                                                onClick={() => handleDelete(obra._id)}
                                            >
                                                Deletar
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </>
            )}
        </Box>
    );
};

export default ObraList;
