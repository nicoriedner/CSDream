import { Link } from 'react-router-dom';
import {FaHome, FaStore, FaBoxOpen, FaDice, FaUser} from 'react-icons/fa';
import '../css/Header.css';

const Header = () => {
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");

    return (
        <header className="csdream-header">
            <nav className="csdream-nav">
                <Link to="/" className="nav-link"><FaHome className="nav-icon" /> Home</Link>
                <Link to="/marketplace" className="nav-link"><FaStore className="nav-icon" /> Marketplace</Link>
                <Link to="/inventory" className="nav-link"><FaBoxOpen className="nav-icon" /> Inventory</Link>
                <Link to="/games" className="nav-link"><FaDice className="nav-icon" /> Games</Link>
            </nav>
            <nav className="csdream-nav">
                {username ? (
                    <div className="user-info">
                        <img src={`/images/${avatar}`} alt="avatar" className="avatar-small" />
                        <span>{username}</span>
                    </div>
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