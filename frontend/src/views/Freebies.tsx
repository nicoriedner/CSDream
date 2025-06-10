import { useEffect, useState } from "react";
import api from "../api";
import "../css/Freebies.css";

// Interface beschreibt den Aufbau eines Skin-Objekts aus der Datenbank
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
    imgUrl: string; // Bildpfad direkt vom Server
}

const Freebies = () => {
    // Zustände für Anzeige und Auswahl
    const [freeSkins, setFreeSkins] = useState<Skin[]>([]);
    const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
    const [confirmed, setConfirmed] = useState(false);
    const [claimedToday, setClaimedToday] = useState(false);

    // Wird beim ersten Laden ausgeführt
    useEffect(() => {
        const today = new Date().toDateString();
        const lastClaim = localStorage.getItem("freebieClaimedAt");
        if (lastClaim === today) setClaimedToday(true);

        const userId = Number(localStorage.getItem("userId"));

        // Alle Skins aus der Datenbank laden und 3 zufällige anzeigen
        api.get("/skinCatalog/all").then((res) => {
            const all = res.data;
            const shuffled = [...all].sort(() => 0.5 - Math.random()).slice(0, 3);
            const enriched = shuffled.map((skin: any, idx: number) => ({
                id: idx,
                name: skin.name,
                image: skin.imgUrl,
                value: 10 + idx * 15,
                rarity: skin.rarity,
                floatValue: 0.1 + Math.random() * 0.8,
                exterior: "Field-Tested",
                stattrak: Math.random() < 0.3,
                skinId: skin.id,
                userId,
                imgUrl: skin.imgUrl,
            }));
            setFreeSkins(enriched);
        });
    }, []);

    // Öffnet das Modal für den ausgewählten Skin
    const openSkin = (skin: Skin) => {
        if (claimedToday) return;
        setSelectedSkin(skin);
    };

    // Speichert den Skin im Inventar über die API
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
            alert("Freebie bereits beansprucht oder Fehler aufgetreten.");
        }
    };

    // Schließt das Modal
    const closeModal = () => {
        setSelectedSkin(null);
        setConfirmed(false);
    };

    return (
        <div className="freebies-container">
            <h2>Tägliche Freebies</h2>

            {/* Alle drei Freebie-Skins klickbar */}
            <div className="freebies-row">
                {freeSkins.map((skin, idx) => (
                    <div
                        key={idx}
                        className={`freebie-card ${claimedToday ? "claimed" : ""}`}
                        onClick={() => openSkin(skin)}
                    >
                        <img src={skin.imgUrl} alt={skin.name} />
                        <div className="freebie-info">
                            <h4>{skin.name}</h4>
                            <p>{skin.value} Coins</p>
                            <small>Freebie</small>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal für den ausgewählten Skin */}
            {selectedSkin && (
                <div className="freebie-modal-bg">
                    <div className="freebie-modal">
                        <img src={selectedSkin.imgUrl} alt={selectedSkin.name} />
                        <h3>{selectedSkin.name}</h3>
                        <p>{selectedSkin.value} Coins</p>

                        {/* Button oder Bestätigung je nach Zustand */}
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