import { useEffect, useState } from "react";
import api from "../api";
import "../css/Cases.css";

interface Case {
    id: number;
    name: string;
    price: number;
}

interface SkinCatalog {
    id: number;
    name: string;
    imgUrl: string;
}

interface UserSkin {
    id: number;
    price: number;
    skin: SkinCatalog;
}

const CasesPage = () => {
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [opening, setOpening] = useState(false);
    const [unboxedSkin, setUnboxedSkin] = useState<UserSkin | null>(null);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) setCurrentUserId(parseInt(userId));

        api.get("/cases/allCases")
            .then((res) => setCases(res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const openCase = async (caseId: number) => {
        if (!currentUserId) return;

        setOpening(true);
        setUnboxedSkin(null);

        try {
            const res = await api.post("/cases/caseunboxing/openCase", null, {
                params: {
                    caseId,
                    userId: currentUserId,
                },
            });

            setTimeout(() => {
                setUnboxedSkin(res.data);
                setOpening(false);
            }, 1000);
        } catch (err) {
            setOpening(false);
        }
    };

    const getImagePath = (imgUrl: string | null) => {
        if (!imgUrl) return "/images/placeholder.png";
        if (imgUrl.startsWith("/images/")) return imgUrl;
        return `/images/${imgUrl}`;
    };

    return (
        <div className="cases-container">
            <h2>Cases</h2>
            {loading ? (
                <p>Lade Cases...</p>
            ) : (
                <div className="case-list">
                    {cases.map((c) => (
                        <div key={c.id} className="case-card">
                            <img src="/images/case.png" alt="Case" />
                            <h3>{c.name}</h3>
                            <p>Preis: {c.price} Coins</p>
                            <button disabled={opening} onClick={() => openCase(c.id)}>
                                Öffnen
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {opening && (
                <div className="spin-animation">
                    <div className="spinner">🎁 Öffne Case...</div>
                </div>
            )}

            {unboxedSkin && unboxedSkin.skin && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Du hast gezogen:</h3>
                        <img
                            src={getImagePath(unboxedSkin.skin.imgUrl)}
                            alt={unboxedSkin.skin.name}
                            onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                        />
                        <p>
                            <strong>{unboxedSkin.skin.name}</strong>
                        </p>
                        <p>Wert: {unboxedSkin.price} Coins</p>
                        <button onClick={() => setUnboxedSkin(null)}>Schließen</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CasesPage;