// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <div>
            {isAuthenticated ? (
                <h1>Bem-vindo ao Sistema de Gestão de Obras!</h1>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
