import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/Auth.css";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validatePassword = (pwd: string): boolean => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;
        return regex.test(pwd);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setError("Passwort muss mindestens 10 Zeichen, 1 Groß-, 1 Kleinbuchstaben, 1 Zahl und 1 Sonderzeichen enthalten.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/register", { username, password });
            setError("");
            navigate("/login");
        } catch (err) {
            setError("Registrierung fehlgeschlagen.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Registrieren</h2>
            <form onSubmit={handleRegister} className="auth-form">
                <input type="text" placeholder="Benutzername" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Registrieren</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p className="switch-link">
                Schon ein Konto bei uns?{" "}
                <Link to="/login" className="link">Einfach hier anmelden!</Link>
            </p>
        </div>
    );
}

export default Register;