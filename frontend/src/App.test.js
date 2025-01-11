// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Corrigido o caminho
import '@testing-library/jest-dom';

test('Renderiza corretamente a tela de login ou lista de obras', () => {
    render(<App />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
});
