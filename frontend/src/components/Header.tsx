import { Link } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaDice, FaUser, FaCaretDown, FaCoins } from 'react-icons/fa';
import '../css/Header.css';
import { useAuth } from '../context/AuthContext';
import avatar1 from '../assets/profile_pics/avatar1.jpg';
import avatar2 from '../assets/profile_pics/avatar2.jpg';
import { useState, useEffect, useRef } from 'react';
import api from '../api';

// Map zur Auswahl des Avatars anhand des Dateinamens
const avatarMap: Record<string, string> = {
    "avatar1.jpg": avatar1,
    "avatar2.jpg": avatar2,
};

const Header = () => {
    const { username, avatar, logout } = useAuth(); // Login-Infos aus dem Auth-Context
    const avatarSrc = avatar && avatarMap[avatar] ? avatarMap[avatar] : avatar1; // Standardbild
    const [dropdownOpen, setDropdownOpen] = useState(false); // Steuerung für Menü
    const dropdownRef = useRef<HTMLDivElement>(null); // Für Klick-Outside-Erkennung
    const [balance, setBalance] = useState<number>(0); // Coins-Anzeige

    // Holt das aktuelle Guthaben vom Backend
    const fetchBalance = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            api.get(`/users/balance/${userId}`).then((res) => {
                setBalance(Math.max(0, res.data.balance)); // Kein negativer Wert
            }).catch(() => {
                setBalance(0); // Fallback bei Fehler
            });
        }
    };

    // Intervall für regelmäßige Aktualisierung der Coins
    useEffect(() => {
        fetchBalance();
        const interval = setInterval(fetchBalance, 5000); // alle 5 Sekunden
        return () => clearInterval(interval);
    }, []);

    // Logout-Funktion
    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
    };

    // Klick außerhalb des Dropdowns schließt das Menü
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="csdream-header">
            {/* Linke Seite: Navigation */}
            <nav className="csdream-nav">
                <Link to="/" className="nav-link"><FaHome className="nav-icon" /> Home</Link>
                <Link to="/inventory" className="nav-link"><FaBoxOpen className="nav-icon" /> Inventory</Link>
                <Link to="/freebies" className="nav-link"><FaDice className="nav-icon" /> Freebies</Link>
            </nav>

            {/* Rechte Seite: Coins, Avatar, Dropdown */}
            <nav className="csdream-nav" ref={dropdownRef}>
                {username ? (
                    <>
                        {/* Coins-Anzeige */}
                        <div className="balance-display">
                            <FaCoins className="nav-icon" /> {balance.toFixed(2)} C
                        </div>

                        {/* Benutzerinfo mit Avatar und Menü */}
                        <div className="user-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img src={avatarSrc} alt="avatar" className="avatar-small" />
                            <span>{username}</span>
                            <FaCaretDown className="dropdown-icon" />

                            {/* Dropdown-Menü */}
                            <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                                <button className="dropdown-item" onClick={handleLogout}>Abmelden</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="nav-link">
                        <FaUser className="nav-icon" /> Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;