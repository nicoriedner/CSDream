import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Auth.css';

function Register() {
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password || !firstname || !lastname) {
            setError('Bitte füllen Sie alle Pflichtfelder aus.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/user', {
                firstname,
                lastname,
                email,
                password,
                phone,
                address,
                administrator: 0,
            });

            setSuccess('Registrierung erfolgreich!');
            setError('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: unknown) {
            setSuccess('');
            if (axios.isAxiosError(err)) {
                setError('Fehler bei der Registrierung. ' + (err.response?.data?.message || err.message));
            } else {
                setError('Fehler bei der Registrierung. Ein unbekannter Fehler ist aufgetreten.');
            }
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Registrieren</h2>

                <input type="text" placeholder="Vorname*" value={firstname} onChange={e => setFirstname(e.target.value)} />
                <input type="text" placeholder="Nachname*" value={lastname} onChange={e => setLastname(e.target.value)} />
                <input type="email" placeholder="E-Mail*" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Passwort*" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="tel" placeholder="Telefonnummer" value={phone} onChange={e => setPhone(e.target.value)} />
                <input type="text" placeholder="Adresse" value={address} onChange={e => setAddress(e.target.value)} />

                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}

                <button type="submit">Registrieren</button>

                <p className="auth-switch">
                    Schon ein Konto bei uns?{' '}
                    <Link to="/login">Einfach hier anmelden!</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;