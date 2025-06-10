import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/Auth.css";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/login", { username, password }, { withCredentials: true });
            const avatar = response.data.avatar || "avatar1.jpg";
            login(username, avatar);
            setError("");
            setTimeout(() => {
                navigate("/", { state: { loginSuccess: true } });
            }, 1000);
        } catch (err) {
            setError("Login fehlgeschlagen. Bitte überprüfe deine Eingaben.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="auth-form">
                <input type="text" placeholder="Benutzername" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Anmelden</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p className="switch-link">
                Noch kein Konto bei uns? <Link to="/register" className="link">Hier registrieren</Link>
            </p>
        </div>
    );
}

export default Login;
