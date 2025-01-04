import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login bem-sucedido! Token: ' + data.token);
            localStorage.setItem('token', data.token); // Armazena o token para futuras requisições
        } else {
            alert('Falha no login: ' + data.error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                
                <label>Senha:</label>
                <input 
                    type="password" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    required 
                />

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
