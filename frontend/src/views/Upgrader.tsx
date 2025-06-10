import { useState, useEffect } from 'react';
import api from '../api';
import '../css/Upgrader.css';

// Struktur eines Skins im Katalog (inkl. Bild)
interface SkinCatalog {
    name: string;
    imgUrl: string;
}

// Struktur eines Skins, den der Nutzer besitzt
interface UserSkin {
    id: number;
    floatValue: number;
    exterior: string;
    rarity: string;
    isStattrak: boolean;
    price: number;
    dropDate: string;
    renamedTo?: string;
    skin: SkinCatalog;
}

const UpgraderPage = () => {
    const [userSkins, setUserSkins] = useState<UserSkin[]>([]); // Alle Skins
    const [selectedSkins, setSelectedSkins] = useState<UserSkin[]>([]); // Auswahl für Upgrade
    const [chance, setChance] = useState<number>(50); // Prozent-Chance für Erfolg
    const [resultMessage, setResultMessage] = useState<string>(''); // Nachricht
    const [balance, setBalance] = useState<number>(0); // Coins
    const [showSkinList, setShowSkinList] = useState<boolean>(false); // Skinliste ein-/ausblenden

    // Lade Skins & Kontostand beim Start
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        api.get(`/api/userskin/allByUserId/${userId}`).then((res) => {
            setUserSkins(res.data);
        });

        api.get(`/users/balance/${userId}`).then((res) => {
            setBalance(res.data.balance);
        });
    }, []);

    // Wählt Skin aus oder entfernt ihn
    const handleSkinSelection = (skin: UserSkin) => {
        setSelectedSkins(prev =>
            prev.includes(skin) ? prev.filter(s => s !== skin) : [...prev, skin]
        );
        setShowSkinList(false);
    };

    // Sende Upgrade-Request ans Backend
    const handleUpgrade = async () => {
        if (selectedSkins.length === 0) {
            setResultMessage('Bitte wähle mindestens einen Skin aus.');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const res = await api.post('/upgrader/upgradeSkin', {
                userSkins: selectedSkins,
                chanceInPercentage: chance,
                userId
            });

            setBalance(res.data.newBalance);
            setResultMessage(`Erfolg! Neues Guthaben: ${res.data.newBalance} Coins.`);
            setSelectedSkins([]);

            // Lade Skins neu (verlorene werden entfernt)
            const updatedSkins = await api.get(`/api/userskin/allByUserId/${userId}`);
            setUserSkins(updatedSkins.data);

        } catch {
            setResultMessage('Upgrade fehlgeschlagen. Versuche es erneut.');
        }
    };

    return (
        <div className="upgrader-wrapper">
            <div className="upgrader-container">
                <h2>Skin Upgrader</h2>

                {/* Coins */}
                <div className="balance-display">
                    <h3>Aktuelles Guthaben: {balance.toFixed(2)} Coins</h3>
                </div>

                {/* Skin-Auswahl */}
                <div className="skin-selection">
                    <h4>Wähle Skins zum Upgraden:</h4>
                    <div className="skin-list">
                        {selectedSkins.map((skin, index) => (
                            <div key={index} className="selected-skin">
                                <img src={skin.skin.imgUrl} alt={skin.skin.name} className="selected-skin-img" />
                            </div>
                        ))}
                        {selectedSkins.length < 5 && (
                            <div className="plus-skin" onClick={() => setShowSkinList(!showSkinList)}>+</div>
                        )}
                    </div>

                    {/* Skinliste als Overlay */}
                    {showSkinList && (
                        <>
                            <div className="skin-list-overlay" onClick={() => setShowSkinList(false)}></div>
                            <div className="skin-selection-list">
                                {userSkins.map((skin) => (
                                    <div
                                        key={skin.id}
                                        className="skin-option"
                                        onClick={() => handleSkinSelection(skin)}
                                    >
                                        <img src={skin.skin.imgUrl} alt={skin.skin.name} />
                                        <div>{skin.skin.name}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Eingabefeld für Erfolgswahrscheinlichkeit */}
                <div className="chance-input">
                    <label>Chance für Upgrade:</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={chance}
                        onChange={(e) => setChance(Number(e.target.value))}
                    />
                    <span>%</span>
                </div>

                {/* Start Upgrade */}
                <button onClick={handleUpgrade} className="upgrade-button">Upgrade Skins</button>

                {/* Ergebnis anzeigen */}
                {resultMessage && <div className="result-message">{resultMessage}</div>}
            </div>
        </div>
    );
};

export default UpgraderPage;