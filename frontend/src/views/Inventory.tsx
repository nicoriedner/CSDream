import React, { useEffect, useState } from 'react';
import api from '../api.ts'
import '../css/Inventory.css';
import SkinCard from '../components/SkinCard';
import SkinDetailsModal from '../components/SkinDetailsModal';

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

const Inventory: React.FC = () => {
    const [skins, setSkins] = useState<UserSkin[]>([]);
    const [selectedSkin, setSelectedSkin] = useState<UserSkin | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.warn("Kein userId im localStorage gefunden.");
            return;
        }

        api.get(`/userskin/allByUserId/${userId}`)
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : [];
                console.log("Geladene Skins:", data);
                setSkins(data);
            })
            .catch(err => console.error("Fehler beim Laden des Inventars:", err));
    }, []);

    return (
        <div className="inventory-page">
            <h1>Inventar</h1>

            <div className="inventory-grid">
                {skins.map((skin) => (
                    <SkinCard
                        key={skin.id}
                        skin={skin}
                        onClick={() => setSelectedSkin(skin)}
                    />
                ))}
            </div>
            {selectedSkin && (
                <SkinDetailsModal
                    skin={selectedSkin}
                    onClose={() => setSelectedSkin(null)}
                />
            )}
        </div>
    );
};

export default Inventory;