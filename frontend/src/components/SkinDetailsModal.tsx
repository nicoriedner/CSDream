import React, { useState } from 'react';
import '../css/SkinDetailsModal.css';
import api from "../api.ts";

// Struktur eines Skins aus dem Katalog
interface SkinCatalog {
    name: string;
    collectionOrCase: string;
    rarity: string;
    floatMin: number;
    floatMax: number;
}

// Struktur eines Skins, der dem Nutzer gehört
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

// Requisiten für die Modal-Komponente
interface Props {
    skin: UserSkin;
    onClose: () => void; // Funktion zum Schließen des Modals
}

const SkinDetailsModal: React.FC<Props> = ({ skin, onClose }) => {
    const [newName, setNewName] = useState('');
    const [sold, setSold] = useState(false);

    // Skin-Bildname wird aus dem originalen Namen erzeugt
    const imageName = skin.skin.name.replace(/[^a-zA-Z0-9]/g, '_');

    // Funktion zum lokalen Umbenennen des Skins (frontend-only)
    const renameSkin = () => {
        if (!newName.trim()) return;
        skin.renamedTo = newName; // Kein Backend-Call – nur optisch
    };

    // Funktion zum Verkauf des Skins an das Backend
    const sellSkin = async () => {
        try {
            await api.post(`/userskin/sell/${skin.id}`);
            setSold(true); // Verkauf erfolgreich – Button deaktivieren
        } catch (err) {
            console.error('Fehler beim Verkaufen:', err);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{skin.renamedTo || skin.skin.name}</h2>
                <img
                    src={`/images/skins/${imageName}.png`}
                    alt={skin.skin.name}
                    onError={(e) => (e.currentTarget.src = '/profile_pics/avatar1.jpg')}
                />
                <p>Collection: {skin.skin.collectionOrCase}</p>
                <p>Rarity: {skin.skin.rarity}</p>
                <p>Float: {skin.floatValue}</p>

                {/* Zeige Stattrak-Info nur wenn aktiv */}
                <p className="stattrak">
                    {skin.isStattrak && <strong style={{ color: 'orange' }}>★ | STATTRACK</strong>}
                </p>

                <p>Preis: {skin.price} Coins</p>

                {/* Eingabefeld zum Umbenennen */}
                <div className="rename-section">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Neuer Name"
                    />
                    <button onClick={renameSkin}>Umbenennen</button>
                </div>

                {/* Verkaufsknopf (einmalig nutzbar) */}
                <button className="sell-button" onClick={sellSkin} disabled={sold}>
                    {sold ? 'Verkauft' : `Verkaufen für ${skin.price} Coins`}
                </button>

                <button className="close-btn" onClick={onClose}>Schließen</button>
            </div>
        </div>
    );
};

export default SkinDetailsModal;