import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";

const url = '10.0.0.35';

const BalanceChange = ({ route }: any) => {
    const { id, username } = route.params;
    const [balance, setBalance] = useState(0);
    const [newBalance, setNewBalance] = useState("");

    useEffect(() => {
        const loadBalance = async () => {
            try {
                const response = await fetch(`http://${url}:8080/api/users/balance/${id}`);
                const data = await response.json();
                setBalance(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadBalance();
    }, []);

    const changeBalance = async () => {
        try {
            const variable = Number(newBalance);
            await axios.patch(`http://${url}:8080/api/users/${id}/balanceChange?newBalance=${variable}`);
            setBalance(variable);
            setNewBalance("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
            <Text style={styles.heading}>Balance von <Text style={styles.username}>{username}</Text></Text>
            <Text style={styles.currentBalance}>Aktueller Kontostand: <Text style={styles.amount}>{balance} Coins</Text></Text>

            <Text style={styles.label}>Neuer Balance-Wert:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={newBalance}
                onChangeText={setNewBalance}
                placeholder="z. B. 150"
                placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={changeBalance}>
                <Text style={styles.buttonText}>Balance aktualisieren</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1d1a39',
        padding: 20
    },
    heading: {
        fontSize: 20,
        color: '#e2e2f2',
        marginBottom: 20
    },
    username: {
        color: '#5c4bc5',
        fontWeight: 'bold'
    },
    currentBalance: {
        fontSize: 18,
        color: '#e2e2f2',
        marginBottom: 30
    },
    amount: {
        color: '#5c4bc5',
        fontWeight: 'bold'
    },
    label: {
        color: '#e2e2f2',
        alignSelf: 'flex-start',
        marginBottom: 6
    },
    input: {
        borderWidth: 1,
        borderColor: '#5c4bc5',
        borderRadius: 12,
        color: '#e2e2f2',
        padding: 10,
        width: '100%',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#5c4bc5',
        padding: 12,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#5c4bc5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 6
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default BalanceChange;