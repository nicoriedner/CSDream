import { useEffect, useState } from "react";
import "../css/Freebies.css";
import api from "../api";

const imageBasePath = "/images_weapons/";

interface Skin {
    id: number;
    name: string;
    image: string;
    value: number;
    rarity: string;
    floatValue: number;
    exterior: string;
    stattrak: boolean;
    skinId: number;
    userId: number;
}

const Freebies = () => {
    const [chanceSkins, setChanceSkins] = useState<Skin[]>([]);
    const [freeCase, setFreeCase] = useState<Skin | null>(null);
    const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
    const [confirmed, setConfirmed] = useState(false);
    const [claimedToday, setClaimedToday] = useState(false);

    useEffect(() => {
        const today = new Date().toDateString();
        const lastClaim = localStorage.getItem("freebieClaimedAt");

        if (lastClaim === today) {
            setClaimedToday(true);
        }

        const allSkins = ["ak-47-redline", "usp-s-kill-confirmed", "m4a4-howl", "awp-dragon-lore"];
        const shuffle = [...allSkins].sort(() => 0.5 - Math.random());
        const userId = Number(localStorage.getItem("userId"));

        setChanceSkins(shuffle.slice(0, 2).map((id, idx) => ({
            id: idx,
            name: id.replace(/-/g, " ").toUpperCase(),
            image: imageBasePath + id + ".png",
            value: 10 + idx * 15,
            rarity: "Random",
            floatValue: 0.1 + Math.random() * 0.8,
            exterior: "Field-Tested",
            stattrak: Math.random() < 0.3,
            skinId: 1,
            userId,
        })));

        setFreeCase({
            id: 999,
            name: shuffle[2].replace(/-/g, " ").toUpperCase(),
            image: imageBasePath + shuffle[2] + ".png",
            value: 40,
            rarity: "Rare",
            floatValue: 0.05,
            exterior: "Factory New",
            stattrak: true,
            skinId: 1,
            userId,
        });
    }, []);

    const openFreeCase = () => {
        if (!freeCase || claimedToday) return;
        setSelectedSkin(freeCase);
    };

    const confirmClaim = async () => {
        if (!selectedSkin) return;
        try {
            await api.post("/userSkin/freebie", {
                userId: selectedSkin.userId,
                skinId: selectedSkin.skinId,
                floatValue: selectedSkin.floatValue,
                exterior: selectedSkin.exterior,
                rarity: selectedSkin.rarity,
                isStattrak: selectedSkin.stattrak,
                price: selectedSkin.value,
            });
            setConfirmed(true);
            setClaimedToday(true);
            localStorage.setItem("freebieClaimedAt", new Date().toDateString());
        } catch (err) {
            alert("Freebie bereits beansprucht.");
        }
    };

    const closeModal = () => {
        setSelectedSkin(null);
        setConfirmed(false);
    };

    return (
        <div className="freebies-container">
            <h2>Tägliche Freebies</h2>
            <div className="freebies-row">
                {chanceSkins.map((skin, idx) => (
                    <div className="freebie-card chance" key={idx}>
                        <img src={skin.image} alt={skin.name} />
                        <div className="freebie-info">
                            <h4>{skin.name}</h4>
                            <p>{skin.value} Coins</p>
                            <small>Chance</small>
                        </div>
                    </div>
                ))}
                {freeCase && (
                    <div
                        className={`freebie-card guaranteed ${claimedToday ? "claimed" : ""}`}
                        onClick={openFreeCase}
                    >
                        <img src={freeCase.image} alt={freeCase.name} />
                        <div className="freebie-info">
                            <h4>{freeCase.name}</h4>
                            <p>{freeCase.value} Coins</p>
                            <strong>Gratis Case</strong>
                        </div>
                    </div>
                )}
            </div>

            {selectedSkin && (
                <div className="freebie-modal-bg">
                    <div className="freebie-modal">
                        <img src={selectedSkin.image} alt={selectedSkin.name} />
                        <h3>{selectedSkin.name}</h3>
                        <p>{selectedSkin.value} Coins</p>
                        {!confirmed ? (
                            <button className="claim-btn" onClick={confirmClaim}>Claim</button>
                        ) : (
                            <p className="claimed-text">✔️ Dem Inventar hinzugefügt</p>
                        )}
                        <button className="close-btn" onClick={closeModal}>Schließen</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Freebies;
