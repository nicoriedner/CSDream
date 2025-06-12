import { useEffect, useState } from 'react';
import api from '../api';
import { UserSkin } from '../types/UserSkin.ts'
import '../css/Inventory.css';

// Hauptkomponente für die Inventarseite
const Inventory: React.FC = () => {
    const [skins, setSkins] = useState<UserSkin[]>([]); // Alle Skins des Users
    const [selectedSkin, setSelectedSkin] = useState<UserSkin | null>(null); // Für das Detailfenster

    // Lade Skins beim ersten Aufruf
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId == null) {
            console.warn('Kein userId im localStorage gefunden.');
            return;
        }

        api.get(`/userSkin/allByUserId/${userId}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [];
                setSkins(data);
            })
            .catch((err) => console.error('Fehler beim Laden des Inventars:', err));
    }, []);

    return (
        <div className="inventory-page">
            <h1>Inventar</h1>

            {/* Gitteranzeige für Skins */}
            <div className="inventory-grid">
                {skins.map((skin) => (
                    <div className="skin-card" key={skin.id} onClick={() => setSelectedSkin(skin)}>
                        {/*<img
                            src={skin.skin.imgUrl}
                            alt={skin.skin.name}
                            onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
                        />*/}
                        <div className="skin-name">
                            {skin.renamedTo && <small className="renamed">{skin.renamedTo}</small>}
                            {skin.skin.name}
                        </div>
                        <div className="float-value">Float: {skin.floatValue.toFixed(2)}</div>
                        <button className="details-button">Details</button>
                    </div>
                ))}
            </div>

            {/* Detailansicht im Modal */}
            {selectedSkin && (
                <div className="skin-details-modal">
                    <h3>{selectedSkin.renamedTo || selectedSkin.skin.name}</h3>
                    {/*<img
                        src={selectedSkin.skin.imgUrl}
                        alt={selectedSkin.skin.name}
                        onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
                    />*/}
                    <p>Collection: {selectedSkin.skin.collectionOrCase}</p>
                    <p>Rarity: {selectedSkin.skin.rarity}</p>
                    <p>Float: {selectedSkin.floatValue}</p>
                    <p>Stattrak: {selectedSkin.isStattrak ? 'Ja' : 'Nein'}</p>
                    <p>Preis: {selectedSkin.price} Coins</p>
                    <button onClick={() => setSelectedSkin(null)}>Schließen</button>
                </div>
            )}
        </div>
    );
};

export default Inventory;