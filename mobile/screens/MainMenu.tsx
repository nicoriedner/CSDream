import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MainMenu = ({ navigation, route }: any) => {
    const { id, username } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Willkommen, <Text style={styles.username}>{username}</Text></Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('BalanceChange', { id, username })}
            >
                <Text style={styles.buttonText}>Kontostand ändern</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('InventoryManagement', { id, username })}
            >
                <Text style={styles.buttonText}>Inventar verwalten</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AvailableCases', { id, username })}
            >
                <Text style={styles.buttonText}>Cases</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1a39',
        padding: 20,
    },
    heading: {
        fontSize: 22,
        color: '#e2e2f2',
        marginBottom: 40,
        textAlign: 'center',
    },
    username: {
        color: '#5c4bc5',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#5c4bc5',
        padding: 14,
        borderRadius: 12,
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#5c4bc5',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold' },
});

export default MainMenu;