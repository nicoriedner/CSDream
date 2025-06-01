import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Auth.css';
import { FaUserAlt } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Bitte Benutzername und Passwort eingeben.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password,
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err: any) {
            setError('Login fehlgeschlagen. Benutzername oder Passwort falsch.');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title"><FaUserAlt /> Login</h2>

                {error && <div className="auth-error">{error}</div>}

                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Einloggen</button>
                <p className="auth-switch">Noch kein Konto bei uns? <a href="/register">Hier registrieren</a></p>
            </form>
        </div>
    );
};

export default Login;