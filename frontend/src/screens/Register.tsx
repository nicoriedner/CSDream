import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Auth.css";
import avatar1 from '../assets/profile_pics/avatar1.jpg';
import avatar2 from '../assets/profile_pics/avatar2.jpg';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState<Date | null>(null);
    const [gender, setGender] = useState<"m" | "f" | "">("");
    const [avatar, setAvatar] = useState<"avatar1.jpg" | "avatar2.jpg" | "">("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validatePassword = (pwd: string): boolean => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;
        return regex.test(pwd);
    };

    const validateEmail = (email: string): boolean => {
        return email.includes("@");
    };

    const formatDateForBackend = (date: Date): string => {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setError("Passwort muss mindestens 10 Zeichen, 1 Groß-, 1 Kleinbuchstaben, 1 Zahl und 1 Sonderzeichen enthalten.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Bitte eine gültige E-Mail-Adresse angeben.");
            return;
        }

        if (!gender) {
            setError("Bitte ein Geschlecht auswählen.");
            return;
        }

        if (!avatar) {
            setError("Bitte ein Profilbild auswählen.");
            return;
        }

        if (!birthdate) {
            setError("Bitte ein Geburtsdatum auswählen.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/register", {
                username,
                password,
                email,
                birthdate: formatDateForBackend(birthdate!),
                gender,
                avatar: `/profile_pics/${avatar}`
            }, { withCredentials: true });
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
                <input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <DatePicker
                    selected={birthdate}
                    onChange={(date) => setBirthdate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Geburtsdatum auswählen"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    required
                />

                <div className="gender-selection">
                    <label className={`gender-option ${gender === "m" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="gender"
                            value="m"
                            checked={gender === "m"}
                            onChange={() => setGender("m")}
                        />
                        Männlich
                    </label>
                    <label className={`gender-option ${gender === "f" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="gender"
                            value="f"
                            checked={gender === "f"}
                            onChange={() => setGender("f")}
                        />
                        Weiblich
                    </label>
                </div>

                <div className="avatar-selection">
                    <img
                        src={avatar1}
                        alt="Avatar 1"
                        className={avatar === "avatar1.jpg" ? "selected" : ""}
                        onClick={() => setAvatar("avatar1.jpg")}
                    />
                    <img
                        src={avatar2}
                        alt="Avatar 2"
                        className={avatar === "avatar2.jpg" ? "selected" : ""}
                        onClick={() => setAvatar("avatar2.jpg")}
                    />
                </div>

                <button type="submit">Registrieren</button>
                {error && <p className="error">{error}</p>}
            </form>

            <p className="switch-link">
                Schon ein Konto bei uns? <Link to="/login" className="link">Einfach hier anmelden!</Link>
            </p>
        </div>
    );
}

export default Register;