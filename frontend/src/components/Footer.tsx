import "../css/Footer.css"
import { Link } from 'react-router-dom';
import logo from '../assets/CSDream_Logo.png';
import { FaHome, FaStore, FaBoxOpen, FaDice } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="csdream-footer">
            <div className="footer-left">
                <img src={logo} alt="CSDream Logo" />
            </div>
            <div>
                <h2>Tägliche Belohnungen</h2>
                <p>Melde dich täglich an und sichere dir Skins und Coins!</p>
                <Link to="/rewards" className="cta-button">Belohnungen ansehen</Link>
                <div className="footer-links">
                    <Link to="/terms">AGB</Link> |
                    <Link to="/privacy"> Datenschutz</Link> |
                    <Link to="/support"> Support</Link>
                </div>
                <p>© {new Date().getFullYear()} CSDream. Alle Rechte vorbehalten.</p>
            </div>
            <div className="footer-right">
                <Link to="/" className="footer-link"><FaHome /> Home</Link>
                <Link to="/marketplace" className="footer-link"><FaStore /> Marketplace</Link>
                <Link to="/inventory" className="footer-link"><FaBoxOpen /> Inventory</Link>
                <Link to="/games" className="footer-link"><FaDice /> Games</Link>
                <Link to="/impressum" className="footer-link">Impressum</Link>
            </div>
        </footer>
    );
};

export default Footer;