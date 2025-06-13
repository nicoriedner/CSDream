import { useState, useEffect } from 'react';
import api from '../api'; // API-Import
import '../css/Upgrader.css';

// Interface für die Skins
interface SkinCatalog {
    id: number;
    name: string;
    imgUrl: string;
}

interface UserSkin {
    id: number;
    skinCatalogId: number;
    floatValue: number;
    exterior: string;
    rarity: string;
    isStattrak: boolean;
    price: number;
    dropDate: string;
    skin: SkinCatalog;
    userReferenceId: number;
}

const Upgrader = () => {
    const [userSkins, setUserSkins] = useState<UserSkin[]>([]); // Alle Skins des Users
    const [selectedSkins, setSelectedSkins] = useState<UserSkin[]>([]); // Auswahl für Upgrade
    const [chance, setChance] = useState<number>(50); // Prozent-Chance für Erfolg
    const [resultMessage, setResultMessage] = useState<string>(''); // Nachricht
    const [balance, setBalance] = useState<number>(0); // Coins
    const [showSkinList, setShowSkinList] = useState<boolean>(false); // Skinliste ein-/ausblenden

    // Lade Skins und Kontostand beim Start
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        api.get(`/userskin/allByUserId/${userId}`).then((res) => {
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

            setBalance(res.data); // Balance aktualisieren
            setResultMessage(`Erfolg! Neues Guthaben: ${res.data} Coins.`); // Ergebnis anzeigen
            setSelectedSkins([]); // Auswahl zurücksetzen

            // Lade Skins neu (verlorene werden entfernt)
            const updatedSkins = await api.get(`/userskin/allByUserId/${userId}`);
            setUserSkins(updatedSkins.data);

        } catch (error) {
            setResultMessage('Upgrade fehlgeschlagen. Versuche es erneut.' + error);
        }
    };

    return (
        <div className="upgrader-wrapper">
            <div className="upgrader-container">
                <h2>Skin Upgrader</h2>

                {/* Coins Anzeige */}
                <div className="balance-display">
                    <h3>Aktuelles Guthaben: {balance?.toFixed(2)} Coins</h3>
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

                {/* Start Upgrade Button */}
                <button onClick={handleUpgrade} className="upgrade-button">Upgrade Skins</button>

                {/* Ergebnis anzeigen */}
                {resultMessage && <div className="result-message">{resultMessage}</div>}
            </div>
        </div>
    );
};

export default Upgrader;