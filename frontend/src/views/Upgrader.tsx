import { useState, useEffect } from 'react';
import api from '../api'; // API-Import
import '../css/Upgrader.css'; // Styles

// Interface für die Skins (unverändert)
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

const UpgraderPage: React.FC = () => {
    const [userSkins, setUserSkins] = useState<UserSkin[]>([]);
    const [selectedSkins, setSelectedSkins] = useState<UserSkin[]>([]);
    const [chance, setChance] = useState<number>(50);
    const [resultMessage, setResultMessage] = useState<string>('');
    const [balance, setBalance] = useState<number>(0);
    const [showSkinList, setShowSkinList] = useState<boolean>(false);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error("User ID not found in local storage.");
            return;
        }

        api.get(`/userSkin/allByUserId/${userId}`)
            .then((res) => {
                setUserSkins(res.data);
            })
            .catch((err) => console.error('Fehler beim Laden der Skins:', err));

        api.get(`/users/balance/${userId}`)
            .then((res) => {
                setBalance(res.data.balance);
            })
            .catch((err) => console.error('Fehler beim Laden des Kontostands:', err));
    }, []);

    // Wählt Skin aus oder entfernt ihn (kein Limit mehr)
    const handleSkinSelection = (skin: UserSkin) => {
        setSelectedSkins(prev => {
            const isSelected = prev.some(s => s.id === skin.id);
            if (isSelected) {
                return prev.filter(s => s.id !== skin.id);
            } else {
                return [...prev, skin]; // Fügt hinzu, ohne Limitprüfung
            }
        });
    };

    // Wählt alle verfügbaren Skins aus
    const handleAddAllSkins = () => {
        setSelectedSkins(userSkins); // Setzt die Auswahl auf alle Skins im Inventar
        setShowSkinList(false); // Optionale: Schließt die Liste nach der Auswahl
        setResultMessage('Alle Skins wurden ausgewählt.');
        setTimeout(() => setResultMessage(''), 3000);
    };

    // Leert die gesamte Auswahl
    const handleClearSelection = () => {
        setSelectedSkins([]);
        setResultMessage('Auswahl geleert.');
        setTimeout(() => setResultMessage(''), 3000);
    };

    const handleUpgrade = async () => {
        if (selectedSkins.length === 0) {
            setResultMessage('Bitte wähle mindestens einen Skin aus.');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
            setResultMessage('Benutzer-ID nicht gefunden. Bitte melden Sie sich an.');
            return;
        }

        setIsOpening(true);
        setResultMessage('');

        try {
            const res = await api.post('/upgrader/upgradeSkin', {
                userSkinIds: selectedSkins.map(s => s.id),
                chanceInPercentage: chance,
                userId: parseInt(userId, 10)
            });

            const wonAmount = res.data;
            const newBalance = balance + wonAmount;

            setBalance(newBalance);
            setResultMessage(`Erfolg! Du hast ${wonAmount.toFixed(2)} Coins gewonnen. Neues Guthaben: ${newBalance.toFixed(2)} Coins.`);
            setSelectedSkins([]);

            const updatedSkinsRes = await api.get(`/userSkin/allByUserId/${userId}`);
            setUserSkins(updatedSkinsRes.data);
        } catch (error) {
            console.error('Upgrade fehlgeschlagen:', error);
            setResultMessage('Upgrade fehlgeschlagen. Versuche es erneut. Details: ' + (error as Error).message);
        } finally {
            setIsOpening(false);
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
                    {/* Zähler für ausgewählte Skins (ohne Limit-Anzeige) */}
                    <h4>Ausgewählte Skins ({selectedSkins.length}):</h4>

                    {/* Neue Buttons für Auswahlsteuerung */}
                    <div className="selection-controls">
                        <button
                            onClick={handleAddAllSkins}
                            className="control-button"
                            disabled={userSkins.length === 0 || selectedSkins.length === userSkins.length}
                        >
                            Alle auswählen
                        </button>
                        <button
                            onClick={handleClearSelection}
                            className="control-button"
                            disabled={selectedSkins.length === 0}
                        >
                            Auswahl leeren
                        </button>
                    </div>

                    <div className="selected-skins-display">
                        {/* Anzeige der ausgewählten Skins als Vorschaubilder */}
                        {selectedSkins.map((skin) => (
                            <div key={skin.id} className="selected-skin-preview" onClick={() => handleSkinSelection(skin)}>
                                <img src={skin.skin.imgUrl} alt={skin.skin.name} className="selected-skin-img" />
                                <span className="selected-skin-name">{skin.skin.name}</span>
                            </div>
                        ))}
                        {/* Plus-Button zum Ein-/Ausblenden der Skinliste (ohne Limitprüfung) */}
                        <div className="plus-skin" onClick={() => setShowSkinList(!showSkinList)}>
                            {showSkinList ? '-' : '+'}
                        </div>
                    </div>

                    {/* Skinliste zum Auswählen */}
                    {showSkinList && (
                        <div className="skin-selection-list">
                            {userSkins.length === 0 ? (
                                <p>Keine Skins im Inventar.</p>
                            ) : (
                                userSkins.map((skin) => (
                                    <div
                                        key={skin.id}
                                        className={`skin-option ${selectedSkins.some(s => s.id === skin.id) ? 'selected' : ''}`}
                                        onClick={() => handleSkinSelection(skin)}
                                    >
                                        <img src={skin.skin.imgUrl} alt={skin.skin.name} />
                                        <div>{skin.skin.name} ({skin.rarity})</div>
                                    </div>
                                ))
                            )}
                        </div>
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
                <button
                    onClick={handleUpgrade}
                    className="upgrade-button"
                    disabled={selectedSkins.length === 0 || isOpening}
                >
                    {isOpening ? 'Upgraden...' : 'Upgrade Skins'}
                </button>

                {/* Ergebnis anzeigen */}
                {resultMessage && <div className="result-message">{resultMessage}</div>}
            </div>
        </div>
    );
};

export default UpgraderPage;