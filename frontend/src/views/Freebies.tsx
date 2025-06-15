import { useEffect, useState } from "react";
import api from "../api";
import "../css/Freebies.css";

interface SkinCatalog {
    id: number;
    name: string;
    float_min: number;
    float_max: number;
    rarity: string;
    collection_or_case: string;
    img_url: string;
}

interface UserSkinDTO {
    floatValue: number;
    dropDate?: string;
    price: number;
    skinCatalogId: number;
    rarity: string;
    stattrak: boolean;
    userId: number;
    exterior: string;
}

interface Skin {
    id: number;
    name: string;
    price: number;
    rarity: string;
    floatValue: number;
    exterior: string;
    stattrak: boolean;
    skinCatalogId: number;
    userId: number;
    dropDate: Date;
    imgUrl: string;
    skinCatalog?: SkinCatalog;
}

const skinImages = import.meta.glob('../assets/images/*.png', { eager: true, as: 'url' });

const getImageByName = (filename: string | undefined): string => {
    if (!filename) return skinImages['../assets/images/placeholder.png'];
    const path = `../assets/images/${filename}`;
    return skinImages[path] || skinImages['../assets/images/placeholder.png'];
};

const getExterior = (floatValue: number): string => {
    if (floatValue < 0.07) return "FACTORY_NEW";
    if (floatValue < 0.15) return "MINIMAL_WEAR";
    if (floatValue < 0.38) return "FIELD_TESTED";
    if (floatValue < 0.45) return "WELL_WORN";
    return "BATTLE_SCARRED";
};

const Freebies = () => {
    const [freeSkins, setFreeSkins] = useState<Skin[]>([]);
    const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
    const [claimedIds, setClaimedIds] = useState<number[]>([]);
    const [confirmedThisSession, setConfirmedThisSession] = useState<number[]>([]);
    const [todayKey, setTodayKey] = useState("");
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const userIdStr = localStorage.getItem("userId");
        if (!userIdStr) return;
        const userId = parseInt(userIdStr, 10);
        if (isNaN(userId)) return;
        setCurrentUserId(userId);

        const key = `freebieClaimedSkins_${today}_${userId}`;
        setTodayKey(key);
        const claimed = localStorage.getItem(key);
        if (claimed) {
            const parsed = JSON.parse(claimed);
            setClaimedIds(parsed);
            setConfirmedThisSession(parsed);
        }

        api.get("/skinCatalog/all").then((res) => {
            const all = res.data.map((skin: SkinCatalog) => ({
                ...skin,
                img_url: skin.img_url?.split("/").pop() || "placeholder.png"
            }));
            const shuffled = [...all].sort(() => 0.5 - Math.random()).slice(0, 3);
            const enriched = shuffled.map((skin: SkinCatalog, idx: number) => {
                const floatVal = parseFloat((0.1 + Math.random() * 0.8).toFixed(4));
                return {
                    id: idx,
                    name: skin.name,
                    price: 10 + idx * 15,
                    rarity: skin.rarity,
                    floatValue: floatVal,
                    exterior: getExterior(floatVal),
                    stattrak: Math.random() < 0.3,
                    skinCatalogId: skin.id,
                    userId: userId,
                    imgUrl: skin.img_url,
                    dropDate: new Date(),
                    skinCatalog: skin
                };
            });
            setFreeSkins(enriched);
        });
    }, []);

    const isClaimed = (id: number) => claimedIds.includes(id);

    const openSkin = (skin: Skin) => {
        setSelectedSkin(skin);
    };

    const confirmClaim = async () => {
        if (!selectedSkin || isClaimed(selectedSkin.id) || !currentUserId) return;
        try {
            const userSkinDTO: UserSkinDTO = {
                floatValue: selectedSkin.floatValue,
                price: selectedSkin.price,
                skinCatalogId: selectedSkin.skinCatalogId,
                rarity: selectedSkin.rarity,
                stattrak: selectedSkin.stattrak,
                userId: currentUserId,
                exterior: selectedSkin.exterior,
                dropDate: new Date().toISOString().split("T")[0]
            };
            await api.post("/userSkin/freebie", userSkinDTO);
            const newClaimed = [...claimedIds, selectedSkin.id];
            setClaimedIds(newClaimed);
            setConfirmedThisSession([...confirmedThisSession, selectedSkin.id]);
            localStorage.setItem(todayKey, JSON.stringify(newClaimed));
            setSelectedSkin(null);
        } catch (err) {
            alert("Fehler beim Beanspruchen.");
        }
    };

    const closeModal = () => {
        setSelectedSkin(null);
    };

    const resetFreebies = () => {
        localStorage.removeItem(todayKey);
        setClaimedIds([]);
        setConfirmedThisSession([]);
        alert("Freebies zurückgesetzt!");
    };

    if (!currentUserId) {
        return (
            <div className="freebies-container">
                <h2>Tägliche Freebies</h2>
                <p>Fehler: Benutzer nicht gefunden. Bitte melden Sie sich an.</p>
            </div>
        );
    }

    return (
        <div className="freebies-container">
            <h2>Tägliche Freebies</h2>

            <div className="freebies-row">
                {freeSkins.map((skin, idx) => (
                    <div
                        key={idx}
                        className={`freebie-card ${isClaimed(skin.id) ? "claimed" : ""}`}
                        onClick={() => openSkin(skin)}
                    >
                        <img src={getImageByName(skin.imgUrl)} alt={skin.name} />
                        <div className="freebie-info">
                            <h4>{skin.name}</h4>
                            <p>{skin.price} Coins</p>
                            <small>{isClaimed(skin.id) ? "✔️ Geclaimt" : "Freebie"}</small>
                        </div>
                    </div>
                ))}
            </div>

            {selectedSkin && (
                <div className="freebie-modal-bg">
                    <div className="freebie-modal">
                        <img src={getImageByName(selectedSkin.imgUrl)} alt={selectedSkin.name} />
                        <h3>{selectedSkin.name}</h3>
                        <p>{selectedSkin.price} Coins</p>
                        {confirmedThisSession.includes(selectedSkin.id) ? (
                            <p className="claimed-text">✔️ Dem Inventar hinzugefügt</p>
                        ) : isClaimed(selectedSkin.id) ? (
                            <p className="claimed-text">✔️ Bereits geclaimt</p>
                        ) : (
                            <button className="claim-btn" onClick={confirmClaim}>Claim</button>
                        )}
                        <button className="close-btn" onClick={closeModal}>Schließen</button>
                    </div>
                </div>
            )}

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <button
                    onClick={resetFreebies}
                    style={{
                        backgroundColor: "#5c4bc5",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    Freebie Reset (Test)
                </button>
            </div>
        </div>
    );
};

export default Freebies;