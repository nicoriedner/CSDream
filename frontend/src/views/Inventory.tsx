import React, { useEffect, useState } from 'react';
import '../css/Inventory.css';

export interface SkinCatalog {
    id: number;
    name: string;
    collectionOrCase: string;
    rarity: string;
    floatMin: number;
    floatMax: number;
    imgUrl: string | null;
}

export interface UserSkin {
    id: number;
    skinCatalogId: number;
    floatValue: number;
    exterior: string;
    rarity: string;
    stattrak: boolean;
    price: number;
    dropDate: string;
    skin: SkinCatalog;
    userReferenceId: number;
}

const skinImages = import.meta.glob('../assets/images/*.png', { eager: true, as: 'url' });

const getImageByName = (filename: string | undefined): string => {
    if (!filename) return skinImages['../assets/images/placeholder.png'];
    const path = `../assets${filename}`;
    return skinImages[path];
};

const Inventory: React.FC = () => {
    const [skins, setSkins] = useState<UserSkin[]>([]);
    const [skinCatalog, setSkinCatalog] = useState<SkinCatalog[]>([]);
    const [selectedSkin, setSelectedSkin] = useState<UserSkin | null>(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) return;

        const loadUserSkins = async () => {
            const response = await fetch(`/api/userSkin/allByUserId/${userId}`);
            const data = await response.json();
            setSkins(data);
        };

        const loadSkinCatalog = async () => {
            const response = await fetch(`/api/skinCatalog/all`);
            const data = await response.json();
            setSkinCatalog(data);
        };

        loadUserSkins();
        loadSkinCatalog();
    }, [userId]);

    const mergedSkins = skins.map((userSkin) => {
        const catalog = skinCatalog.find((s) => s.id === userSkin.skinCatalogId);
        return catalog ? { ...userSkin, skin: catalog } : userSkin;
    });

    const sellSkin = async () => {
        if (!selectedSkin || !userId) return;
        try {
            await fetch(`/api/userSkin/sellItem?userId=${userId}&skinId=${selectedSkin.id}`, {
                method: 'POST',
            });
            setSkins((prev) => prev.filter((s) => s.id !== selectedSkin.id));
            setSelectedSkin(null);
        } catch (err) {
            console.error("Fehler beim Verkaufen:", err);
        }
    };

    return (
        <div className="inventory-container">
            <h1>Inventory</h1>
            <div className="skin-list">
                {mergedSkins.map((skin) => (
                    <div className="skin-card" key={skin.id} onClick={() => setSelectedSkin(skin)}>
                        <img
                            src={getImageByName(skin.skin?.imgUrl)}
                            alt={skin.skin.name || "Unbekannt"}
                            className="skin-image"
                        />
                        <div className="skin-info">
                            <h3>{skin.skin?.name || "Unbekannt"}</h3>
                            <p>Rarity: {skin.skin?.rarity}</p>
                            <p>Float: {skin.floatValue.toFixed(4)}</p>
                            {skin.stattrak && <p>StatTrak™</p>}
                            <p>Price: {skin.price} Coins</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedSkin && (
                <div className="skin-details-modal">
                    <h3>{selectedSkin.skin.name}</h3>
                    <div className="modal-details">
                        <p><strong>Collection:</strong> {selectedSkin.skin.collectionOrCase}</p>
                        <p><strong>Rarity:</strong> {selectedSkin.skin.rarity}</p>
                        <p><strong>Float Range:</strong> {selectedSkin.skin.floatMin} - {selectedSkin.skin.floatMax}</p>
                        <p><strong>Float Value:</strong> {selectedSkin.floatValue}</p>
                        <p><strong>Stattrak:</strong> {selectedSkin.stattrak ? 'Yes' : 'No'}</p>
                        <p><strong>Price:</strong> {selectedSkin.price} Coins</p>

                        <button onClick={sellSkin}>Verkaufen</button>
                        <button onClick={() => setSelectedSkin(null)}>Schließen</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;