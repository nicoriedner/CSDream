import { useEffect, useState } from "react";
import SkinCard from "../components/SkinCard";
import SkinDetailsModal from "../components/SkinDetailsModal";
import "../css/Inventory.css"

export interface Skin {
    id: number;
    name: string;
    collection_or_case?: string;
    rarity: string;
    float_value: number;
    exterior: string;
    is_stattrak: boolean;
    price: number;
    drop_date?: string;
    user_id: number;
    origin?: string;
    nametag?: string;
}

export default function Inventory() {
    const [skins, setSkins] = useState<Skin[]>([]);
    const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/userskin")
            .then((res) => res.json())
            .then((data) => setSkins(data))
            .catch((err) => console.error("Fehler beim Laden der Skins", err));
    }, []);

    return (
        <div className="inventory-page">
            <h1>Dein Inventar</h1>
            <div className="skins-grid">
                {skins.map((skin) => (
                    <SkinCard key={skin.id} skin={skin} onSelect={setSelectedSkin} />
                ))}
            </div>

            {selectedSkin && (
                <SkinDetailsModal skin={selectedSkin} onClose={() => setSelectedSkin(null)} />
            )}
        </div>
    );
}