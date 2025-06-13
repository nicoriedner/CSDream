import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";

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

const url = '10.153.1.242';

const InventoryManagement = ({ route }: any) => {
    const { id, username } = route.params;
    const [skins, setSkins] = useState<UserSkin[]>([]);
    const [skinCatalog, setSkinCatalog] = useState<SkinCatalog[]>([]);

    useEffect(() => {
        const loadInventory = async () => {
            try {
                const response = await fetch(`http://${url}:8080/api/userSkin/allByUserId/${id}`);
                const data = await response.json();
                setSkins(data);
            } catch (err) {
                console.error("Fehler beim Laden des Inventars:", err);
            }
        };

        const loadSkinCatalog = async () => {
            try {
                const response = await fetch(`http://${url}:8080/api/skinCatalog/all`);
                const data = await response.json();
                setSkinCatalog(data);
            } catch (err) {
                console.error("Fehler beim Laden des SkinCatalogs:", err);
            }
        };

        loadInventory();
        loadSkinCatalog();
    }, [id]);

    // Merge user skin data with the corresponding skin catalog data
    const mergedSkins = skins.map((userSkin) => {
        const catalog = skinCatalog.find((skin) => skin.id === userSkin.skinCatalogId);
        if (catalog) {
            return { ...userSkin, skin: catalog };
        }
        return userSkin;
    });

    const renderSkin = ({ item }: { item: UserSkin }) => (
        <View style={styles.skinCard}>
            <Text style={styles.skinName}>{item.skin?.name || "Unbekannt"}</Text>
            <Text style={styles.skinRarity}>{item.skin?.rarity}</Text>
            <Text style={styles.skinExterior}>{item.exterior}</Text>
            <Text style={styles.skinFloat}>Float: {item.floatValue?.toFixed(4)}</Text>
            {item.stattrak && <Text style={styles.stattrakLabel}>StatTrak™</Text>}
            <Text style={styles.skinPrice}>Preis: {item.price} Coins</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{username}'s Inventar</Text>
            <FlatList
                data={mergedSkins}
                renderItem={renderSkin}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1a39',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e2e2f2',
        textAlign: 'center',
        marginBottom: 16,
    },
    listContainer: {
        paddingBottom: 20,
    },
    skinCard: {
        backgroundColor: '#322e5c',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    skinName: {
        fontSize: 16,
        color: '#e2e2f2',
        fontWeight: 'bold',
    },
    skinRarity: {
        fontSize: 14,
        color: '#5c4bc5',
    },
    skinExterior: {
        fontSize: 12,
        color: '#e2e2f2',
        marginBottom: 8,
    },
    skinFloat: {
        fontSize: 12,
        color: '#e2e2f2',
        marginBottom: 8,
    },
    stattrakLabel: {
        fontSize: 12,
        color: '#ff6600',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    skinPrice: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default InventoryManagement;