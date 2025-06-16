import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from "../assets/CSDream_Logo.png";
import upgraderImage from "../assets/upgrader.jpg";
import rouletteImage from "../assets/roulette.png";
import "../css/Homepage.css";

const games = [
    { name: 'Upgrader', image: upgraderImage, link: '/upgrader', description: 'Steigere den Wert deiner Skins!' },
    { name: 'Cases', image: rouletteImage, link: '/cases', description: 'Öffne Kisten und gewinne coole Skins!' },
];

function Homepage() {
    const location = useLocation()
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (location.state?.loginSuccess || location.state?.registerSuccess) {
            setShowSuccess(true);
            const timeout = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [location.state]);

    return (
        <div className="homepage-container">
            {showSuccess && (
                <div className="login-success-banner">
                    ✅ {location.state?.loginSuccess ? "Login" : "Registrierung"} erfolgreich!
                </div>
            )}

            <section className="hero-section">
                <img src={logo} alt="CSDream Logo" className="homepage-logo" />
                <h1>Willkommen bei CSDream</h1>
                <p>Spiele. Gewinne. Handle mit Skins und mehr.</p>
            </section>

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