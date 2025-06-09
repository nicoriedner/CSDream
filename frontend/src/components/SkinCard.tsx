import React from 'react';
import '../css/SkinCard.css';

interface SkinCatalog {
    name: string;
    collectionOrCase: string;
    rarity: string;
    floatMin: number;
    floatMax: number;
}

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

interface Props {
    skin: UserSkin;
    onClick: () => void;
}

const SkinCard: React.FC<Props> = ({ skin, onClick }) => {
    const imageName = skin.skin.name.replace(/[^a-zA-Z0-9]/g, '_');

    return (
        <div className="skin-card" onClick={onClick}>
            <img
                src={`/images/skins/${imageName}.png`}
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
    );
};

export default SkinCard;
