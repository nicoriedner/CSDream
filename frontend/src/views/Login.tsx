// React Hooks und Router-Funktionen importieren
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/Auth.css";

// Authentifizierungs-Kontext (für globales Login-Verhalten)
import { useAuth } from "../context/AuthContext";

function Login() {
    // Eingabefelder + Fehler-Status
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // React Router: Navigation nach erfolgreichem Login
    const navigate = useNavigate();

    // Login-Funktion aus dem globalen Kontext
    const { login } = useAuth();

    // Funktion wird beim Absenden des Formulars ausgeführt
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // verhindert Seite neu laden

        try {
            // Anfrage an das Backend mit Nutzerdaten
            const response = await axios.post("http://localhost:8080/api/login", {
                username, password
            }, { withCredentials: true });

            // Avatar zurücksetzen oder Fallback verwenden
            const avatar = response.data.avatar || "avatar1.jpg";

            // Nutzer global einloggen (z.B. für Navbar/Balance)
            login(username, avatar, response.data.id);
            setError("");

            // Nach kurzem Timeout weiterleiten zur Startseite
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
                {/* Benutzername-Eingabe */}
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                {/* Passwort-Eingabe */}
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Button zum Absenden */}
                <button type="submit">Anmelden</button>

                {/* Fehlermeldung anzeigen */}
                {error && <p className="error">{error}</p>}
            </form>

            {/* Link zur Registrierung */}
            <p className="switch-link">
                Noch kein Konto bei uns? <Link to="/register" className="link">Hier registrieren</Link>
            </p>
        </div>
    );
}

export default Login;