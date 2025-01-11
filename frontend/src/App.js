// src/App.js
import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Login from './components/Login';
import ObraList from './components/ObraList';
import Register from './components/Register';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Gestão de Obras</Typography>
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button color="inherit" onClick={() => setShowRegister(!showRegister)}>
                            {showRegister ? "Ir para Login" : "Cadastrar-se"}
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                {isAuthenticated ? (
                    <ObraList />
                ) : showRegister ? (
                    <Register />
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </Container>
        </>
    );
}

export default App;
