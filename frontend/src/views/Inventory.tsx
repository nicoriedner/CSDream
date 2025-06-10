import { useEffect, useState } from 'react';
import api from '../api';
import '../css/Inventory.css';

/* --------- Interfaces zur Beschreibung der Datenstruktur --------- */

// Einzelne Skin-Infos aus dem Katalog (Name, Seltenheit, usw.)
interface SkinCatalog {
    name: string;
    collectionOrCase: string;
    rarity: string;
    floatMin: number;
    floatMax: number;
}

// Ein Skin, den der Benutzer besitzt (mit Preis, Stattrak, usw.)
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

/* --------------------- Hauptkomponente --------------------- */

const Inventory: React.FC = () => {
    const [skins, setSkins] = useState<UserSkin[]>([]); // Liste aller Skins des Nutzers
    const [selectedSkin, setSelectedSkin] = useState<UserSkin | null>(null); // Für das Detail-Popup

    // Lädt die Skins einmal beim ersten Laden der Seite
    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Holt Nutzer-ID aus dem Browser
        if (!userId) {
            console.warn('Kein userId im localStorage gefunden.');
            return;
        }

        // API-Aufruf: Alle Skins für diesen Nutzer laden
        api.get(`/userskin/allByUserId/${userId}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [];
                setSkins(data);
            })
            .catch((err) => console.error('Fehler beim Laden des Inventars:', err));
    }, []);

    return (
        <div className="inventory-page">
            <h1>Inventar</h1>

            {/* Skin-Gitter mit allen Skins */}
            <div className="inventory-grid">
                {skins.map((skin) => (
                    <div className="skin-card" key={skin.id} onClick={() => setSelectedSkin(skin)}>
                        <img
                            src={`/images/skins/${skin.skin.name.replace(/[^a-zA-Z0-9]/g, "_")}.png`}
                            alt={skin.skin.name}
                            onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
                        />
                        <div className="skin-name">
                            {skin.renamedTo && <small className="renamed">{skin.renamedTo}</small>}
                            {skin.skin.name}
                        </div>
                        <div className="float-value">Float: {skin.floatValue.toFixed(2)}</div>
                        <button className="details-button">Details</button>
                    </div>
                ))}
            </div>

            {/* Detail-Popup für den aktuell ausgewählten Skin */}
            {selectedSkin && (
                <div className="skin-details-modal">
                    <h3>{selectedSkin.renamedTo || selectedSkin.skin.name}</h3>
                    <img
                        src={`/images/skins/${selectedSkin.skin.name.replace(/[^a-zA-Z0-9]/g, "_")}.png`}
                        alt={selectedSkin.skin.name}
                        onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
                    />
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