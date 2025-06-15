import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from "react-native";
import { SkinCatalog } from './InventoryManagement';

export interface Case {
    id: number;
    name: string;
    possibleSkins: SkinCatalog[];
}

const url1 = '10.0.0.35';
const url = '10.153.1.242';

const AvailableCases = ({ route }: any) => {
    const { id, username } = route.params;
    const [cases, setCases] = useState<Case[]>([]);

    useEffect(() => {
        const loadCases = async () => {
            try {
                const response = await fetch(`http://${url1}:8080/api/cases/allCases`);
                const data = await response.json();
                setCases(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadCases();
    }, []);

    const renderCases = ({ item }: { item: Case }) => {
        return (
            <View style={styles.caseCard}>
                <Text style={styles.caseName}>{item.name}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{username}'s Available Cases</Text>
            <FlatList
                data={cases}
                renderItem={renderCases}
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
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e2e2f2',
        textAlign: 'center',
        marginBottom: 16,
    },
    listContainer: {
        paddingBottom: 20,
    },
    caseCard: {
        backgroundColor: '#322e5c',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    caseName: {
        fontSize: 18,
        color: '#e2e2f2',
        marginBottom: 8,
    },
});

export default AvailableCases;