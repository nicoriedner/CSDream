import "../css/SkinCard.css";
import { Skin } from "../screens/Inventory";

interface SkinCardProps {
    skin: Skin;
    onSelect: (skin: Skin) => void;
}

export default function SkinCard({ skin, onSelect }: SkinCardProps) {
    return (
        <div className="skin-card" onClick={() => onSelect(skin)}>
    {/* ⬇️ Hier später Pfad anpassen, wenn du echte Bilder vom Backend bekommst */}
    <img src={`/images/skins/${skin.name}.webp`} alt={skin.name} />

    <div className="skin-info">
        <h4>{skin.name}</h4>
    {skin.nametag && <p className="nametag">({skin.nametag})</p>}
        <p className="float">Float: {skin.float_value.toFixed(2)}</p>
    </div>

    <button className="details-btn">Details</button>
        </div>
    );
    }