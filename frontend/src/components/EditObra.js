import React, { useState, useEffect } from 'react';

function EditObra({ obra, onUpdate }) {
    const [formData, setFormData] = useState({
        nome: obra.nome,
        descricao: obra.descricao,
        orcamentoTotal: obra.orcamentoTotal
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`http://localhost:3000/obras/${obra._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar obra');
            }

            const data = await response.json();
            alert('Obra atualizada com sucesso!');
            onUpdate(data);
        } catch (error) {
            alert('Erro ao atualizar a obra!');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Obra</h2>
            <label>Nome:</label>
            <input 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
            />
            <label>Descrição:</label>
            <input 
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
            />
            <label>Orçamento Total:</label>
            <input 
                type="number"
                name="orcamentoTotal"
                value={formData.orcamentoTotal}
                onChange={handleChange}
                required
            />
            <button type="submit">Salvar Alterações</button>
        </form>
    );
}

export default EditObra;
