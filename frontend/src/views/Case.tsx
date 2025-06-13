import React, { useEffect, useState } from 'react';
import api from '../api';
import '../css/Cases.css';

export interface SkinCatalog {
    id: number;
    name: string;
    collectionOrCase: string;
    rarity: string;
    floatMin: number;
    floatMax: number;
    imgUrl: string | null;
}

export interface Case {
    id: number;
    name: string;
    price: number;
    possibleSkins: SkinCatalog[];
}

const CasesPage: React.FC = () => {
    const [cases, setCases] = useState<Case[]>([]);
    const [isOpening, setIsOpening] = useState(false);
    const [claimedSkin, setClaimedSkin] = useState<SkinCatalog | null>(null);

    useEffect(() => {
        api.get('/api/cases/allCases')
            .then((res) => setCases(res.data))
            .catch((err) => console.error('Fehler beim Laden der Cases:', err));
    }, []);

    const openCase = async (caseId: number) => {
        setIsOpening(true);
        setClaimedSkin(null);

        const res = await api.post(`/caseunboxing/openCase?caseId=${caseId}&userId=${localStorage.getItem('userId')}`);
        const finalSkin: SkinCatalog = res.data;

        // Speicher den Skin im Inventar des Benutzers
        await api.post(`/api/userSkin/add/${localStorage.getItem('userId')}`, finalSkin);

        setClaimedSkin(finalSkin);
        setIsOpening(false);
    };

    return (
        <div className="cases-container">
            <h2>Case Öffnen</h2>

            <div className="cases-grid">
                {cases.map((cs) => (
                    <div className="case-card" key={cs.id}>
                        <img
                            className="case-image"
                            src={cs.possibleSkins[0]?.imgUrl || '/images/case.png'}
                            alt={cs.name}
                        />
                        <div className="case-content">
                            <div className="case-name">{cs.name}</div>
                            <button
                                className="open-button"
                                onClick={() => openCase(cs.id)}
                                disabled={isOpening}
                            >
                                {isOpening ? 'Öffnet...' : `Öffnen (${cs.price}C)`}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {claimedSkin && (
                <div className="claimed-skin">
                    <h3>Gratulation! Du hast einen neuen Skin gewonnen:</h3>
                    <div className="skin-card">
                        <img
                            src={claimedSkin.imgUrl || '/images/placeholder.png'}
                            alt={claimedSkin.name}
                            className="skin-image"
                        />
                        <div className="skin-info">
                            <h3>{claimedSkin.name}</h3>
                            <p>Rarity: {claimedSkin.rarity}</p>
                            <p>Float: {claimedSkin.floatMin} - {claimedSkin.floatMax}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CasesPage;