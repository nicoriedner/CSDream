import { useEffect, useState } from 'react';
import '../css/Cases.css';
import api from '../api';

interface Case {
    id: number;
    name: string;
    price: number;
}

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
    const [highlightedSkin, setHighlightedSkin] = useState<UserSkin | null>(null);
    const [claimedSkin, setClaimedSkin] = useState<UserSkin | null>(null);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        api.get('/cases').then((res) => setCases(res.data));
    }, []);

    const openCase = async (caseId: number) => {
        setIsOpening(true);
        setClaimedSkin(null);
        setHighlightedSkin(null);

        const res = await api.post(`/caseunboxing/openCase?caseId=${caseId}&userId=${localStorage.getItem('userId')}`);
        const finalSkin: UserSkin = res.data;

        const fakeSkins: UserSkin[] = Array.from({ length: 60 }, (_, i) => ({
            ...finalSkin,
            skin: {
                ...finalSkin.skin,
                name: `${finalSkin.skin.name} ${i}`
            }
        }));

        setSelectedSkins(fakeSkins);

        const strip = document.getElementById('scroll-strip');
        if (!strip) return;

        let position = 0;
        let velocity = 50; // px/frame
        const friction = 0.97;
        const finalStop = 120 * 30; // center index * tile width

        const animate = () => {
            if (!strip) return;
            if (velocity < 1 || position > finalStop) {
                setTimeout(() => {
                    setClaimedSkin(finalSkin);
                    setIsOpening(false);
                }, 700);
                return;
            }

            position += velocity;
            velocity *= friction;
            strip.style.transform = `translateX(-${position}px)`;
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    return (
        <div className="cases-container">
            <h2>Case Öffnen</h2>

            <div className="cases-grid">
                {cases.map((cs) => (
                    <div className="case-card" key={cs.id}>
                        <img className="case-image" src="/images/case.png" alt={cs.name} />
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
                    <div className="spin-indicator"></div>
                    <div className="scroll-strip" id="scroll-strip">
                        {selectedSkins.map((skin, index) => (
                            <div className="skin-tile" key={index}>
                                <img src={skin.skin.imageUrl || '/placeholder_skin.png'} alt={skin.skin.name} />
                                <div>{skin.skin.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CasesPage;