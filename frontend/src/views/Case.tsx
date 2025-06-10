import { useEffect, useState } from 'react';
import '../css/Cases.css';
import api from '../api';

// Struktur eines Cases aus dem Backend
interface Case {
    id: number;
    name: string;
    price: number;
}

// SkinCatalog + UserSkin vom Backend
interface SkinCatalog {
    name: string;
    imageUrl: string;
}

interface UserSkin {
    id: number;
    skin: SkinCatalog;
    floatValue: number;
    exterior: string;
    rarity: string;
    stattrak: boolean;
    price: number;
    dropDate: string;
}

const CasesPage = () => {
    const [cases, setCases] = useState<Case[]>([]);
    const [selectedSkins, setSelectedSkins] = useState<UserSkin[]>([]);
    const [isOpening, setIsOpening] = useState(false);
    const [highlightedSkin, setHighlightedSkin] = useState<UserSkin | null>(null);
    const [claimedSkin, setClaimedSkin] = useState<UserSkin | null>(null);

    useEffect(() => {
        api.get('/cases').then((res) => {
            setCases(res.data);
        });
    }, []);

    const openCase = async (caseId: number) => {
        setIsOpening(true);
        setHighlightedSkin(null);

        const res = await api.post(`/caseunboxing/openCase?caseId=${caseId}&userId=${localStorage.getItem('userId')}`);
        const finalSkin: UserSkin = res.data;

        const fakeSkins: UserSkin[] = Array(30).fill(finalSkin).map((s, i) => ({
            ...s,
            skin: {
                ...s.skin,
                name: `${s.skin.name} ${i}`
            }
        }));

        setSelectedSkins(fakeSkins);

        let counter = 0;
        const interval = setInterval(() => {
            setHighlightedSkin(fakeSkins[counter]);
            counter++;
            if (counter >= fakeSkins.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setHighlightedSkin(finalSkin);
                    setClaimedSkin(finalSkin);
                    setIsOpening(false);
                    alert(`${finalSkin.skin.name} zum Inventar hinzugefügt!`);
                }, 500);
            }
        }, 100);
    };

    return (
        <div className="cases-container">
            <h2>Case Öffnen</h2>

            <div className="cases-grid">
                {cases.map((cs) => (
                    <div className="case-card" key={cs.id}>
                        {/* Verwende überall das gleiche Case-Bild */}
                        <img
                            className="case-image"
                            src="/images/case.png"
                            alt={cs.name}
                        />
                        <div className="case-content">
                            <div className="case-name">{cs.name}</div>
                            <button className="open-button" onClick={() => openCase(cs.id)} disabled={isOpening}>
                                {isOpening ? 'Öffnet...' : `Öffnen (${cs.price}C)`}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isOpening && (
                <div className="case-overlay">
                    <div className="scroll-strip">
                        {selectedSkins.map((skin, index) => (
                            <div
                                className={`skin-tile ${skin.skin.name === highlightedSkin?.skin.name ? 'highlighted' : ''}`}
                                key={index}
                            >
                                <img src={skin.skin.imageUrl || '/placeholder_skin.png'} alt={skin.skin.name} />
                                <div>{skin.skin.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {claimedSkin && (
                <div className="claimed-skin">
                    <h3>Du hast gewonnen!</h3>
                    <img src={claimedSkin.skin.imageUrl || '/placeholder_skin.png'} alt={claimedSkin.skin.name} />
                    <p>{claimedSkin.skin.name}</p>
                    <p>Rarity: {claimedSkin.rarity}</p>
                    <p>Float: {claimedSkin.floatValue.toFixed(4)}</p>
                    <p>Stattrak: {claimedSkin.stattrak ? 'Ja' : 'Nein'}</p>
                </div>
            )}
        </div>
    );
};

export default CasesPage;