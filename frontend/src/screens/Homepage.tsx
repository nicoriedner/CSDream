import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from "../assets/CSDream_Logo.png";
import upgraderImage from "../assets/upgrader.jpg";
import rouletteImage from "../assets/roulette.png";
import towerImage from "../assets/tower.jpeg";
import slotImage from "../assets/slot.jpeg";
import "../css/Homepage.css";

const games = [
    { name: 'Upgrader', image: upgraderImage, link: '/upgrader' },
    { name: 'Roulette', image: rouletteImage, link: '/roulette' },
    { name: 'Tower', image: towerImage, link: '/tower' },
    { name: 'Slotmaschine', image: slotImage, link: '/slot' },
];

function Homepage() {
    const location = useLocation();
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

            <div className="logo-container">
                <img src={logo} alt="CSDream Logo" className="homepage-logo" />
            </div>

            <div className="carousel-container">
                <div className="carousel-track">
                    {games.map((game, index) => (
                        <Link to={game.link} key={index} className="game-card">
                            <img src={game.image} alt={game.name} className="game-image" />
                            <div className="game-name">{game.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;