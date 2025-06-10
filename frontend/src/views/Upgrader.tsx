import { useState, useEffect } from 'react';
import api from '../api';
import '../css/Upgrader.css';
import { UserSkin } from '../types';

const UpgraderPage = () => {
    // Zustand für alle Skins des Benutzers und Auswahl
    const [userSkins, setUserSkins] = useState<UserSkin[]>([]);
    const [selectedSkins, setSelectedSkins] = useState<UserSkin[]>([]);

    // Upgrade-Chance (Prozent), Erfolg/Fehler-Nachricht, Kontostand
    const [chance, setChance] = useState<number>(50);
    const [resultMessage, setResultMessage] = useState<string>('');
    const [balance, setBalance] = useState<number>(0);

    // Steuerung, ob die Skin-Auswahlliste sichtbar ist
    const [showSkinList, setShowSkinList] = useState<boolean>(false);

    /* Lädt beim ersten Laden der Seite:
       - alle User-Skins
       - aktuellen Kontostand */
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        api.get(`/userskin/allByUserId/${userId}`).then((res) => {
            setUserSkins(res.data);
        });

        api.get(`/users/balance/${userId}`).then(res => {
            setBalance(res.data.balance);
        });
    }, []);

    /* Fügt einen Skin zur Auswahl hinzu oder entfernt ihn wieder,
       falls er schon ausgewählt war */
    const handleSkinSelection = (skin: UserSkin) => {
        setSelectedSkins(prev =>
            prev.includes(skin)
                ? prev.filter(s => s !== skin)
                : [...prev, skin]
        );
        setShowSkinList(false);
    };

    /* Sendet die ausgewählten Skins ans Backend mit Upgrade-Chance.
       Antwort enthält neues Guthaben oder Fehler. */
    const handleUpgrade = async () => {
        if (selectedSkins.length === 0) {
            setResultMessage('Bitte wähle mindestens einen Skin aus.');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const res = await api.post(`/upgrader/upgradeSkin`, {
                userSkins: selectedSkins,
                chanceInPercentage: chance,
                userId
            });

            setBalance(res.data.newBalance);
            setResultMessage(`Erfolg! Dein neues Guthaben beträgt ${res.data.newBalance} Coins.`);
        } catch {
            setResultMessage('Upgrade fehlgeschlagen. Versuche es noch einmal.');
        }
    };

    return (
        <div className="upgrader-wrapper">
            <div className="upgrader-container">
                <h2>Skin Upgrader</h2>

                <div className="balance-display">
                    <h3>Aktuelles Guthaben: {balance.toFixed(2)} Coins</h3>
                </div>

                <div className="skin-selection">
                    <h4>Wähle Skins zum Upgraden:</h4>
                    <div className="skin-list">
                        {selectedSkins.map((skin, index) => (
                            <div key={index} className="selected-skin">
                                <img src={skin.skin.imgUrl} alt={skin.skin.name} className="selected-skin-img" />
                            </div>
                        ))}
                        {selectedSkins.length < 5 && (
                            <div className="plus-skin" onClick={() => setShowSkinList(!showSkinList)}>
                                +
                            </div>
                        )}
                    </div>

                    {/* Skin-Auswahlliste wird als Modal angezeigt */}
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

                <button onClick={handleUpgrade} className="upgrade-button">Upgrade Skins</button>

                {resultMessage && <div className="result-message">{resultMessage}</div>}
            </div>
        </div>
    );
};

export default UpgraderPage;