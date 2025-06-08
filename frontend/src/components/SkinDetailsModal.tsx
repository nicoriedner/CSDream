import React from 'react';
import '../css/SkinDetailsModal.css';

interface SkinCatalog {
    name: string;
    collectionOrCase: string;
    rarity: number;
    floatMin: number;
    floatMax: number;
}

interface UserSkin {
    id: number;
    floatValue: number;
    exterior: number;
    rarity: number;
    isStattrak: boolean;
    price: number;
    dropDate: string;
    renamedTo?: string;
    skin: SkinCatalog;
}

interface Props {
    skin: UserSkin;
    onClose: () => void;
}

const SkinDetailsModal: React.FC<Props> = ({ skin, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{skin.renamedTo || skin.skin.name}</h2>
                <img
                    src={`/images/skins/${skin.skin.name.replace(/ /g, "_")}.png`}
                    alt={skin.skin.name}
                    onError={(e) => (e.currentTarget.src = "/profile_pics/avatar1.jpg")}
                />
                <p>Collection: {skin.skin.collectionOrCase}</p>
                <p>Rarity: {skin.skin.rarity}</p>
                <p>Float: {skin.floatValue}</p>
                <p>Stattrak: {skin.isStattrak ? "Ja" : "Nein"}</p>
                <p>Preis: {skin.price} Coins</p>
                <button onClick={onClose}>Schließen</button>
            </div>
        </div>
    );
};

export default SkinDetailsModal;