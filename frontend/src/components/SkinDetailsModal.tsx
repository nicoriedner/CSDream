import { useState } from "react";
import { Skin } from "../screens/Inventory";
import "../css/SkinDetailsModal.css";

interface Props {
    skin: Skin;
    onClose: () => void;
}

export default function SkinDetailsModal({ skin, onClose }: Props) {
    const [renamePopup, setRenamePopup] = useState(false);
    const [newName, setNewName] = useState("");

    const handleRename = () => {
        fetch(`http://localhost:8080/api/skins/${skin.id}/rename`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nametag: newName }),
        })
            .then(() => {
                setRenamePopup(false);
                setNewName("");
                onClose(); // Optional: Reload erzwingen
            })
            .catch((err) => console.error("Rename-Fehler:", err));
    };

    const handleDeleteName = () => {
        fetch(`http://localhost:8080/api/skins/${skin.id}/rename`, {
            method: "DELETE",
        })
            .then(() => {
                onClose(); // Optional: Reload erzwingen
            })
            .catch((err) => console.error("Löschen fehlgeschlagen:", err));
    };

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <button className="close-btn" onClick={onClose}>X</button>

                    <h2>{skin.name}</h2>
                    {skin.nametag && (
                        <p className="nametag-info">Nametag: <i>{skin.nametag}</i></p>
                    )}

                    <img src={`/images/skins/${skin.name}.webp`} alt={skin.name} />

                    <p><strong>Float:</strong> {skin.float_value}</p>
                    <p><strong>Exterior:</strong> {skin.exterior}</p>
                    <p><strong>Rarity:</strong> {skin.rarity}</p>
                    <p><strong>Origin:</strong> {skin.collection_or_case || skin.origin || "Freebie"}</p>
                    <p><strong>Owner:</strong> User #{skin.user_id}</p>
                    {skin.is_stattrak && <p style={{ color: "orange" }}>★ | STATTRACK</p>}
                    <p><strong>Verkaufswert:</strong> ${skin.price}</p>

                    <button className="sell-btn" disabled>Verkaufen</button>

                    <div className="rename-controls">
                        <button className="rename-btn" onClick={() => setRenamePopup(true)}>
                            {skin.nametag ? "Umbenennen" : "Benennen"}
                        </button>
                        {skin.nametag && (
                            <button className="delete-btn" onClick={handleDeleteName}>
                                🗑️
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {renamePopup && (
                <div className="popup-overlay">
                    <div className="popup-modal">
                        <h3>Skin umbenennen</h3>
                        <input
                            type="text"
                            placeholder="Neuer Nametag"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <button onClick={handleRename}>Umbenennen</button>
                        <button onClick={() => setRenamePopup(false)} className="cancel-btn">
                            Abbrechen
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}