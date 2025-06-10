import { useEffect, useState } from 'react';
import '../css/Cases.css';
import api from '../api';

// Interface beschreibt ein Case (eine Kiste)
interface CaseDTO {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}

// Interface beschreibt einen Skin (Inhalt der Kiste)
interface SkinDTO {
    name: string;
    imageUrl: string;
    rarity: string;
    price: number;
    stattrak: boolean;
}

const CasesPage = () => {
    // Zustand für die Liste aller Cases
    const [cases, setCases] = useState<CaseDTO[]>([]);

    // Zustand für die Skins, die im Öffnungsstreifen angezeigt werden
    const [selectedSkins, setSelectedSkins] = useState<SkinDTO[]>([]);

    // Wird gerade eine Kiste geöffnet?
    const [isOpening, setIsOpening] = useState(false);

    // Welcher Skin wird im Strip gerade hervorgehoben?
    const [highlightedSkin, setHighlightedSkin] = useState<SkinDTO | null>(null);

    // Welcher Skin wurde final gezogen?
    const [claimedSkin, setClaimedSkin] = useState<SkinDTO | null>(null);

    // Beim ersten Laden: Alle Cases vom Server holen
    useEffect(() => {
        api.get('/cases/all').then((res) => {
            setCases(res.data);
        });
    }, []);

    // Funktion zum Öffnen einer Case
    const openCase = async (caseId: number) => {
        setIsOpening(true); // Öffnung beginnt
        setHighlightedSkin(null); // Noch kein Skin hervorgehoben

        // Anfrage an Backend: Skin öffnen und Ergebnis bekommen
        const res = await api.post(`/caseunboxing/openCase?caseId=${caseId}&userId=${localStorage.getItem('userId')}`);
        const finalSkin: SkinDTO = res.data;

        // Erstelle eine Liste mit "Fake"-Skins für die Animation
        const fakeSkins: SkinDTO[] = Array(30).fill(finalSkin).map((s, i) => ({
            ...s,
            name: s.name + ' ' + i, // Name leicht ändern für Unterschied
        }));

        setSelectedSkins(fakeSkins);

        // Animation: Skins nacheinander anzeigen
        let counter = 0;
        const interval = setInterval(() => {
            setHighlightedSkin(fakeSkins[counter]);
            counter++;

            // Am Ende der Liste: Animation stoppen
            if (counter >= fakeSkins.length) {
                clearInterval(interval);

                // Nach kleiner Pause: Finalen Skin anzeigen
                setTimeout(() => {
                    setHighlightedSkin(finalSkin);
                    setClaimedSkin(finalSkin);
                    setIsOpening(false);
                    alert(`${finalSkin.name} zum Inventar hinzugefügt!`);
                }, 500);
            }
        }, 100); // 100ms zwischen jedem Skin
    };

    return (
        <div className="cases-container">
            <h2>Case Öffnen</h2>

            {/* Anzeige aller verfügbaren Cases */}
            <div className="cases-grid">
                {cases.map((cs) => (
                    <div className="case-card" key={cs.id}>
                        <img className="case-image" src={cs.imageUrl || '/avatar1.png'} alt={cs.name} />
                        <div className="case-content">
                            <div className="case-name">{cs.name}</div>
                            <button className="open-button" onClick={() => openCase(cs.id)} disabled={isOpening}>
                                {isOpening ? 'Öffnet...' : `Öffnen (${cs.price}C)`}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Animation: horizontale Skin-Scroll-Leiste */}
            {isOpening && (
                <div className="case-overlay">
                    <div className="scroll-strip">
                        {selectedSkins.map((skin, index) => (
                            <div
                                className={`skin-tile ${skin.name === highlightedSkin?.name ? 'highlighted' : ''}`}
                                key={index}
                            >
                                <img src={skin.imageUrl || '/placeholder_skin.png'} alt={skin.name} />
                                <div>{skin.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Zeige final gewonnenen Skin nach Abschluss */}
            {claimedSkin && (
                <div className="claimed-skin">
                    <h3>Du hast gewonnen!</h3>
                    <img src={claimedSkin.imageUrl || '/placeholder_skin.png'} alt={claimedSkin.name} />
                    <p>{claimedSkin.name}</p>
                </div>
            )}
        </div>
    );
};

export default CasesPage;