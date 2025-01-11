// src/tests/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import '@testing-library/jest-dom';

describe('Testes do Componente Login', () => {
    test('Renderiza o formulário de login corretamente', () => {
        render(<Login onLogin={() => {}} />);
        expect(screen.getByText(/login/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
        expect(screen.getByText(/entrar/i)).toBeInTheDocument();
    });

    test('Permite preencher o formulário e clicar em Entrar', () => {
        render(<Login onLogin={() => {}} />);
        const emailInput = screen.getByLabelText(/Email/i);
        const senhaInput = screen.getByLabelText(/Senha/i);
        const loginButton = screen.getByText(/Entrar/i);

        fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
        fireEvent.change(senhaInput, { target: { value: 'senha123' } });
        fireEvent.click(loginButton);

        expect(emailInput.value).toBe('teste@email.com');
        expect(senhaInput.value).toBe('senha123');
    });
});
