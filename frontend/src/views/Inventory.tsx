/*
import React, { useState, useEffect } from 'react';
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
    skin: SkinCatalog; // Ensure this is populated correctly
    userReferenceId: number;
}

const Inventory: React.FC = () => {
    const [skins, setSkins] = useState<UserSkin[]>([]);
    const [selectedSkin, setSelectedSkin] = useState<UserSkin | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.warn('Kein userId im localStorage gefunden.');
            return;
        }

        // Skins des Nutzers laden
        fetch(`/api/userSkin/allByUserId/${userId}`)
            .then((res) => res.json())
            .then((data) => setSkins(data))
            .catch((err) => console.error("Fehler beim Laden der User Skins:", err));
    }, []);

    // Skin verkaufen
    const sellSkin = (skin: UserSkin) => {
        const userId = localStorage.getItem('userId');
        if (!userId || !skin) return;

        // An die Backend-Route senden, um den Skin zu verkaufen
        fetch(`/api/userSkin/sell/${userId}/${skin.id}`, { method: 'DELETE' })
            .then((res) => res.json())
            .then((data) => {
                // Balance nach Verkauf aktualisieren
                alert(`Erfolgreich verkauft! Dein neues Guthaben ist ${data.newBalance} Coins`);
                // Skin aus der Liste entfernen
                setSkins(skins.filter((item) => item.id !== skin.id));
            })
            .catch((err) => console.error("Fehler beim Verkaufen des Skins:", err));
    };

    return (
        <div className="inventory-container">
            <h1>Inventar</h1>

            {/!* Gitteranzeige für Skins *!/}
            <div className="inventory-grid">
                {skins.map((item) => (
                    <div key={item.id} className="skin-card">
                        <img
                            src={item.skin?.imgUrl || '/images/placeholder.png'}
                            alt={item.skin?.name || 'Unbekannt'}
                            className="skin-image"
                        />
                        <div className="skin-info">
                            <h3>{item.skin?.name || "Unbekannt"}</h3>
                            <p>Rarity: {item.skin?.rarity}</p>
                            <p>Float: {item.floatValue.toFixed(2)}</p>
                            <p>Price: {item.price} Coins</p>
                            <button onClick={() => setSelectedSkin(item)}>Details</button>
                            <button className="sell-button" onClick={() => sellSkin(item)}>
                                Verkaufen
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/!* Skin Details Modal *!/}
            {selectedSkin && (
                <div className="skin-details-modal">
                    <h3>{selectedSkin.skin.name}</h3>
                    <p><strong>Collection:</strong> {selectedSkin.skin.collectionOrCase}</p>
                    <p><strong>Rarity:</strong> {selectedSkin.skin.rarity}</p>
                    <p><strong>Float Range:</strong> {selectedSkin.skin.floatMin} - {selectedSkin.skin.floatMax}</p>
                    <p><strong>Float Value:</strong> {selectedSkin.floatValue}</p>
                    <p><strong>Stattrak:</strong> {selectedSkin.stattrak ? 'Yes' : 'No'}</p>
                    <p><strong>Price:</strong> {selectedSkin.price} Coins</p>
                    <button onClick={() => setSelectedSkin(null)}>Schließen</button>
                    <button onClick={() => sellSkin(selectedSkin)}>Verkaufen</button>
                </div>
            )}
        </div>
    );
};

export default Inventory;*/

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

const Inventory: React.FC = () => {
    const [skins, setSkins] = useState<UserSkin[]>([]); // Alle Skins des Users
    const [skinCatalog, setSkinCatalog] = useState<SkinCatalog[]>([]); // Skin Catalog
    const [selectedSkin, setSelectedSkin] = useState<UserSkin | null>(null); // Für das Detail-Fenster

    // Lade Skins und Skin Catalog
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.warn('Kein userId im localStorage gefunden.');
            return;
        }

        // User Skins laden
        const loadUserSkins = async () => {
            try {
                const response = await fetch(`/api/userSkin/allByUserId/${userId}`);  // Lokale URL
                const data = await response.json();
                setSkins(data);
            } catch (err) {
                console.error("Fehler beim Laden der User Skins:", err);
            }
        };

        // Skin Catalog laden
        const loadSkinCatalog = async () => {
            try {
                const response = await fetch(`/api/skinCatalog/all`);  // Lokale URL
                const data = await response.json();
                setSkinCatalog(data);
            } catch (err) {
                console.error("Fehler beim Laden des Skin Catalogs:", err);
            }
        };

        loadUserSkins();
        loadSkinCatalog();
    }, []);

    // Mische die User Skins mit den entsprechenden Skin Catalog-Daten
    const mergedSkins = skins.map((userSkin) => {
        const catalog = skinCatalog.find((skin) => skin.id === userSkin.skinCatalogId);
        if (catalog) {
            return { ...userSkin, skin: catalog };
        }
        return userSkin;
    });

    // Skin anzeigen
    const renderSkin = ({ item }: { item: UserSkin }) => (
        <div className="skin-card" onClick={() => setSelectedSkin(item)}>
            <img
                src={item.skin?.imgUrl || '/images/placeholder.png'}
                alt={item.skin?.name}
                onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
                className="skin-image"
            />
            <div className="skin-info">
                <h3>{item.skin?.name || "Unbekannt"}</h3>
                <p>Rarity: {item.skin?.rarity}</p>
                <p>Float: {item.floatValue?.toFixed(4)}</p>
                {item.stattrak && <p>StatTrak™</p>}
                <p>Price: {item.price} Coins</p>
            </div>
        </div>
    );

    return (
        <div className="inventory-container">
            <h1>Inventory</h1>
            <div className="skin-list">
                {mergedSkins.map((item) => (
                    <div key={item.id}>
                        {renderSkin({ item })}
                    </div>
                ))}
            </div>

            {/* Modal für Skin-Details anzeigen */}
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
                        <button onClick={() => setSelectedSkin(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;