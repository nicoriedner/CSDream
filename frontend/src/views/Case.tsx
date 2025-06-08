import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/CasePage.css';

const CasePage = () => {
    const [cases, setCases] = useState([]);
    const [selectedCase, setSelectedCase] = useState(null);
    const [unboxing, setUnboxing] = useState(false);
    const [dropSkin, setDropSkin] = useState(null);

    useEffect(() => {
        axios.get('/api/cases')
            .then(res => setCases(res.data))
            .catch(err => console.error("Fehler beim Laden der Cases", err));
    }, []);

    const openCase = async (caseName) => {
        setUnboxing(true);
        setDropSkin(null);
        try {
            const res = await axios.post(`/api/caseunboxing/open?caseName=${caseName}`);
            setTimeout(() => {
                setDropSkin(res.data);
            }, 4000); // Simuliere Dauer des Unbox-Scrollings
        } catch (err) {
            console.error("Fehler beim Öffnen der Case", err);
        }
    };

    const closeOverlay = () => {
        setUnboxing(false);
        setDropSkin(null);
    };

    return (
        <div className="case-page">
            <h1>Cases</h1>
            <div className="case-grid">
                {cases.map((c, index) => (
                    <div
                        key={index}
                        className="case-card"
                        onClick={() => setSelectedCase(c)}>
                        <img src={c.imageUrl || '/placeholder-case.png'} alt={c.name} />
                        <div className="case-name">{c.name}</div>
                        <button className="open-btn" onClick={(e) => {
                            e.stopPropagation();
                            openCase(c.name);
                        }}>
                            Öffnen ({c.price} Coins)
                        </button>
                    </div>
                ))}
            </div>

            {unboxing && (
                <div className="unbox-overlay">
                    <div className="unbox-strip">
                        {/* Placeholder-Animation mit Skins */}
                        <div className="scrolling-skins">
                            {/* Skins laufen durch */}
                            {[...Array(30)].map((_, i) => (
                                <img
                                    key={i}
                                    src="/placeholder-skin.png"
                                    alt="skin"
                                    className="scroll-item"
                                />
                            ))}
                        </div>
                        <div className="indicator">▼</div>
                    </div>
                    {dropSkin && (
                        <div className="unbox-result">
                            <div className="result-card">
                                <img src={dropSkin.imageUrl || '/placeholder-skin.png'} alt={dropSkin.name} />
                                <h2>{dropSkin.name}</h2>
                                <p>{dropSkin.rarity}</p>
                                <p>Wert: {dropSkin.price} Coins</p>
                                <button onClick={closeOverlay}>Schließen</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CasePage;