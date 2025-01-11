// src/tests/CadastroObra.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CadastroObra from '../components/CadastroObra';
import '@testing-library/jest-dom';

describe('Testes do Componente Cadastro de Obras', () => {
    test('Renderiza o formulário de cadastro corretamente', () => {
        render(<CadastroObra onObraCadastrada={() => {}} />);
        expect(screen.getByText(/Cadastro de Obras/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nome da Obra/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    });

    test('Permite preencher o formulário e clicar em Cadastrar', () => {
        render(<CadastroObra onObraCadastrada={() => {}} />);
        const nomeInput = screen.getByLabelText(/Nome da Obra/i);
        const descricaoInput = screen.getByLabelText(/Descrição/i);
        const cadastrarButton = screen.getByText(/Cadastrar/i);

        fireEvent.change(nomeInput, { target: { value: 'Nova Obra' } });
        fireEvent.change(descricaoInput, { target: { value: 'Descrição de Teste' } });
        fireEvent.click(cadastrarButton);

        expect(nomeInput.value).toBe('Nova Obra');
        expect(descricaoInput.value).toBe('Descrição de Teste');
    });
});
