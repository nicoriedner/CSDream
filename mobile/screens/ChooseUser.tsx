import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    birthdate: string;
    avatar: string;
    balance: number;
}

const url = '10.153.1.242';

const ChooseUser = ({ navigation }: any) => {
    const [users, setUsers] = useState<User[]>([]);
    const [pressedId, setPressedId] = useState<number | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetch(`http://${url}:8080/api/users/all`);
                const data: User[] = await response.json();
                setUsers(data);
            } catch (err) {
                console.log("Fehler beim Laden der Benutzer");
            }
        };

        loadUsers();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Wähle deinen Benutzer</Text>
            <ScrollView contentContainerStyle={styles.scroll}>
                {users.map(user => (
                    <TouchableOpacity
                        key={user.id}
                        style={[styles.card, pressedId === user.id && styles.cardPressed]}
                        onPressIn={() => setPressedId(user.id)}
                        onPressOut={() => setPressedId(null)}
                        onPress={() => navigation.navigate('MainMenu', {
                            id: user.id,
                            username: user.username
                        })}
                        activeOpacity={0.85}
                    >
                        <Image source={{ uri: `http://${url}:8080${'/images' + user.avatar}` }} style={styles.avatar} />
                        <Text style={styles.username}>{user.username}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1a39',
        alignItems: 'center',
        paddingTop: 40,
    },
    heading: {
        color: '#e2e2f2',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    card: {
        alignItems: 'center',
        backgroundColor: '#322e5c',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        width: 250,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    cardPressed: {
        backgroundColor: '#5c4bc5',
        transform: [{ scale: 0.95 }],
        shadowColor: '#fff',
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#5c4bc5',
    },
    username: {
        color: '#e2e2f2',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ChooseUser;