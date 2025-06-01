import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const profilePictures = [
    '../assets/profile_pics/Avatar_1.avif',
    '../assets/profile_pics/Avatar_2.jpg',
    '../assets/profile_pics/Avatar_3.avif',
    '../assets/profile_pics/Avatar_4.webp',
];

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [profilePic, setProfilePic] = useState(profilePictures[0]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const isPasswordStrong = (password: string) => {
        return /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length >= 10;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !email || !password || !birthdate || !gender) {
            setError('Bitte füllen Sie alle Felder aus.');
            return;
        }

        if (!isPasswordStrong(password)) {
            setError('Passwort muss mindestens 10 Zeichen lang sein, 1 Großbuchstaben, 1 Kleinbuchstaben, 1 Zahl und 1 Sonderzeichen enthalten.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                email,
                password,
                birthdate,
                gender,
                profilePic
            });
            setSuccess('Registrierung erfolgreich!');
            setError('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setSuccess('');
            setError('Fehler bei der Registrierung.');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Registrieren</h2>
                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}

                <input type="text" placeholder="Benutzername" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />

                <div className="gender-select">
                    <label>
                        <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={e => setGender(e.target.value)} /> Männlich
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={e => setGender(e.target.value)} /> Weiblich
                    </label>
                </div>

                <div className="profile-pic-select">
                    <p>Profilbild auswählen:</p>
                    <div className="profile-pics">
                        {profilePictures.map((pic, idx) => (
                            <img
                                key={idx}
                                src={pic}
                                alt={`Avatar ${idx}`}
                                className={`avatar ${profilePic === pic ? 'selected' : ''}`}
                                onClick={() => setProfilePic(pic)}
                            />
                        ))}
                    </div>
                </div>

                <button type="submit">Registrieren</button>
                <p className="auth-toggle">Schon ein Konto bei uns? <a href="/login">Einfach hier anmelden!</a></p>
            </form>
        </div>
    );
};

export default Register;
