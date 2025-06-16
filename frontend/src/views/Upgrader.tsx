import React, { useState, useEffect } from 'react';
import api from '../api';
import '../css/Upgrader.css';

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

    const skinImages = import.meta.glob('../assets/images/*.png', { eager: true, as: 'url' });

    const getImageByName = (filename: string | undefined): string => {
        if (!filename) return skinImages['../assets/images/placeholder.png'];
        const path = `../assets${filename}`;
        return skinImages[path];
    };

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

    const handleSkinSelection = (skin: UserSkin) => {
        setSelectedSkins(prev => {
            const isSelected = prev.some(s => s.id === skin.id);
            if (isSelected) {
                return prev.filter(s => s.id !== skin.id);
            } else {
                return [...prev, skin];
            }
        });
    };

    const handleAddAllSkins = () => {
        setSelectedSkins(userSkins);
        setShowSkinList(false);
        setResultMessage('Alle Skins wurden ausgewählt.');
        setTimeout(() => setResultMessage(''), 3000);
    };

    const handleClearSelection = () => {
        setSelectedSkins([]);
        setResultMessage('Auswahl geleert.');
        setTimeout(() => setResultMessage(''), 3000);
    };

    const handleCloseSkinList = () => {
        setShowSkinList(false);
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
            setShowSkinList(false);

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

                <div className="balance-display">
                    <h3>Aktuelles Guthaben: {balance?.toFixed(2)} Coins</h3>
                </div>

                <div className="skin-selection">
                    <h4>Ausgewählte Skins ({selectedSkins.length}):</h4>

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
                        {selectedSkins.map((skin) => (
                            <div key={skin.id} className="selected-skin-preview" onClick={() => handleSkinSelection(skin)}>
                                <img
                                    src={getImageByName(skin.skin?.imgUrl)}
                                    alt={skin.skin.name || "Unbekannt"}
                                    className="skin-image"
                                /> <span className="selected-skin-name">{skin.skin.name}</span>
                            </div>
                        ))}
                        <div className="plus-skin" onClick={() => setShowSkinList(!showSkinList)}>
                            {showSkinList ? '-' : '+'}
                        </div>
                    </div>

                    {showSkinList && (
                        <div className="skin-selection-list">
                            <button onClick={handleCloseSkinList} className="close-skinlist-button">X</button>

                            {userSkins.length === 0 ? (
                                <p>Keine Skins im Inventar.</p>
                            ) : (
                                userSkins.map((skin) => (
                                    <div
                                        key={skin.id}
                                        className={`skin-option ${selectedSkins.some(s => s.id === skin.id) ? 'selected' : ''}`}
                                        onClick={() => handleSkinSelection(skin)}
                                    >
                                        <img
                                            src={getImageByName(skin.skin?.imgUrl)}
                                            alt={skin.skin.name || "Unbekannt"}
                                            className="skin-image"
                                        />
                                        <div>{skin.skin.name}</div>
                                    </div>
                                ))
                            )}
                        </div>
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

                <button
                    onClick={handleUpgrade}
                    className="upgrade-button"
                    disabled={selectedSkins.length === 0 || isOpening}
                >
                    {isOpening ? 'Upgraden...' : 'Upgrade Skins'}
                </button>

                {resultMessage && <div className="result-message">{resultMessage}</div>}
            </div>
        </div>
    );
};

export default UpgraderPage;