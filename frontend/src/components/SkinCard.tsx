import React from 'react';
import '../css/SkinCard.css';

// Struktur eines Skins im Katalog
interface SkinCatalog {
    name: string;
    collectionOrCase: string;
    rarity: string;
    floatMin: number;
    floatMax: number;
}

// Struktur eines vom Benutzer erhaltenen Skins
interface UserSkin {
    id: number;
    floatValue: number;
    exterior: string;
    rarity: string;
    isStattrak: boolean;
    price: number;
    dropDate: string;
    renamedTo?: string; // Optionaler umbenannter Name
    skin: SkinCatalog;
}

// Props definieren, die an diese Komponente übergeben werden
interface Props {
    skin: UserSkin; // Der Skin, der angezeigt wird
    onClick: () => void; // Funktion, wenn die Karte angeklickt wird
}

const SkinCard: React.FC<Props> = ({ skin, onClick }) => {
    // Bildname aus Skin-Namen ableiten, Sonderzeichen ersetzen
    const imageName = skin.skin.name.replace(/[^a-zA-Z0-9]/g, '_');

    return (
        <div className="skin-card" onClick={onClick}>
            {/* Skin-Bild */}
            <img
                src={`/images/skins/${imageName}.png`}
                alt={skin.skin.name}
                onError={(e) => (e.currentTarget.src = '/images/placeholder.png')} // Fallback-Bild
            />

            {/* Name anzeigen, ggf. umbenannter Name */}
            <div className="skin-name">
                {skin.renamedTo && <small className="renamed">{skin.renamedTo}</small>}
                {skin.skin.name}
            </div>

            {/* Float-Wert des Skins */}
            <div className="float-value">Float: {skin.floatValue.toFixed(2)}</div>

            {/* Button zum Öffnen der Detailansicht */}
            <button className="details-button">Details</button>
        </div>
    );
};

export default SkinCard;