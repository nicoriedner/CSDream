import React, { useState } from 'react';
import { UserSkin } from '../types/UserSkin';
import api from "../api.ts";
import '../css/SkinDetailsModal.css';

interface Props {
    skin: UserSkin;
    onClose: () => void;
}

const SkinDetailsModal: React.FC<Props> = ({ skin, onClose }) => {
    const [newName, setNewName] = useState('');
    const [sold, setSold] = useState(false);

    const imageName = skin.skin.name.replace(/[^a-zA-Z0-9]/g, '_');

    const renameSkin = () => {
        if (!newName.trim()) return;
        skin.renamedTo = newName;
    };

    const sellSkin = async () => {
        try {
            await api.post(`/userskin/sell/${skin.id}`);
            setSold(true);
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

                <p className="stattrak">
                    {skin.isStattrak && <strong style={{ color: 'orange' }}>★ | STATTRACK</strong>}
                </p>

                <p>Preis: {skin.price} Coins</p>

                <div className="rename-section">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Neuer Name"
                    />
                    <button onClick={renameSkin}>Umbenennen</button>
                </div>

                <button className="sell-button" onClick={sellSkin} disabled={sold}>
                    {sold ? 'Verkauft' : `Verkaufen für ${skin.price} Coins`}
                </button>

                <button className="close-btn" onClick={onClose}>Schließen</button>
            </div>
        </div>
    );
};

export default SkinDetailsModal;