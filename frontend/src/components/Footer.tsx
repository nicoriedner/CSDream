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