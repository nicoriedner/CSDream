import { Link } from 'react-router-dom';
import { FaHome, FaStore, FaBoxOpen, FaDice, FaUser, FaCaretDown, FaCoins } from 'react-icons/fa';
import '../css/Header.css';
import { useAuth } from '../context/AuthContext';
import avatar1 from '../assets/profile_pics/avatar1.jpg';
import avatar2 from '../assets/profile_pics/avatar2.jpg';
import { useState, useEffect, useRef } from 'react';
import api from '../api';

const avatarMap: Record<string, string> = {
    "avatar1.jpg": avatar1,
    "avatar2.jpg": avatar2,
};

const Header = () => {
    const { username, avatar, logout } = useAuth();
    const avatarSrc = avatar && avatarMap[avatar] ? avatarMap[avatar] : avatar1;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [balance, setBalance] = useState<number>(0);

    const fetchBalance = () => {
        if (username) {
            api.get(`/users/balance/${username}`).then((res) => {
                setBalance(Math.max(0, res.data.balance));
            });
        }
    };

    useEffect(() => {
        fetchBalance();
        const interval = setInterval(() => fetchBalance(), 5000);
        return () => clearInterval(interval);
    }, [username]);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="csdream-header">
            <nav className="csdream-nav">
                <Link to="/" className="nav-link"><FaHome className="nav-icon" /> Home</Link>
                <Link to="/marketplace" className="nav-link"><FaStore className="nav-icon" /> Marketplace</Link>
                <Link to="/inventory" className="nav-link"><FaBoxOpen className="nav-icon" /> Inventory</Link>
                <Link to="/freebies" className="nav-link"><FaDice className="nav-icon" /> Freebies</Link>
            </nav>
            <nav className="csdream-nav" ref={dropdownRef}>
                {username ? (
                    <>
                        <div className="balance-display">
                            <FaCoins className="nav-icon" /> {balance.toFixed(2)} C
                        </div>
                        <div className="user-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img src={avatarSrc} alt="avatar" className="avatar-small" />
                            <span>{username}</span>
                            <FaCaretDown className="dropdown-icon" />
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
