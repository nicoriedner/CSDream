import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from "../assets/CSDream_Logo.png";
import upgraderImage from "../assets/upgrader.jpg";
import rouletteImage from "../assets/roulette.png";
import "../css/Homepage.css";

/* Spiele-Infos als Array mit Bild, Name, Link und Beschreibung */
const games = [
    { name: 'Upgrader', image: upgraderImage, link: '/upgrader', description: 'Steigere den Wert deiner Skins!' },
    { name: 'Cases', image: rouletteImage, link: '/cases', description: 'Öffne Kisten und gewinne coole Skins!' },
];

function Homepage() {
    const location = useLocation(); // React Router Hook: aktuelle URL + optionaler Zustand
    const [showSuccess, setShowSuccess] = useState(false); // Zustand für Login/Registrierungs-Banner

    // Effekt: Zeige Erfolgsmeldung nach Login/Registrierung
    useEffect(() => {
        if (location.state?.loginSuccess || location.state?.registerSuccess) {
            setShowSuccess(true);
            const timeout = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [location.state]);

    return (
        <div className="homepage-container">
            {/* Erfolgsmeldung (z. B. nach Login) */}
            {showSuccess && (
                <div className="login-success-banner">
                    ✅ {location.state?.loginSuccess ? "Login" : "Registrierung"} erfolgreich!
                </div>
            )}

            {/* Begrüßungsbereich mit Logo und Text */}
            <section className="hero-section">
                <img src={logo} alt="CSDream Logo" className="homepage-logo" />
                <h1>Willkommen bei CSDream</h1>
                <p>Spiele. Gewinne. Handle mit Skins und mehr.</p>
            </section>

            {/* Bereich mit Spielkarten (Upgrader, Cases...) */}
            <section className="carousel-container">
                <div className="carousel-track">
                    {games.map((game, index) => (
                        <Link to={game.link} key={index} className="game-card">
                            <div className="game-card-inner">
                                <img src={game.image} alt={game.name} className="game-image" />
                                <div className="game-info">
                                    <div className="game-name">{game.name}</div>
                                    <p className="game-description">{game.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Homepage;