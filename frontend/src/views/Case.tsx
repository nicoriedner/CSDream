import { useEffect, useState } from 'react';
import '../css/Cases.css';
import api from '../../api';

interface CaseDTO {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}

interface SkinDTO {
    name: string;
    imageUrl: string;
    rarity: string;
    price: number;
    stattrak: boolean;
}

const CasesPage = () => {
    const [cases, setCases] = useState<CaseDTO[]>([]);
    const [selectedSkins, setSelectedSkins] = useState<SkinDTO[]>([]);
    const [isOpening, setIsOpening] = useState(false);
    const [highlightedSkin, setHighlightedSkin] = useState<SkinDTO | null>(null);

    useEffect(() => {
        api.get('/cases/all').then((res) => {
            setCases(res.data);
        });
    }, []);

    const openCase = async (caseId: number) => {
        setIsOpening(true);
        setHighlightedSkin(null);

        const res = await api.post(`/caseunboxing/openCase?caseId=${caseId}&userId=${localStorage.getItem('userId')}`);
        const finalSkin: SkinDTO = res.data;

        const fakeSkins: SkinDTO[] = Array(30).fill(finalSkin).map((s, i) => ({
            ...s,
            name: s.name + ' ' + i,
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
                    setIsOpening(false);
                    alert(`${finalSkin.name} zum Inventar hinzugefügt!`);
                }, 500);
            }
        }, 100);
    };

    return (
        <div className="cases-container">
            {cases.map((cs) => (
                <div className="case-card" key={cs.id}>
                    <img
                        className="case-image"
                        src={cs.imageUrl || '/avatar1.png'}
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
        </div>
    );
};

export default CasesPage;