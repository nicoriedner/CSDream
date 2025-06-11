import React, { createContext, useContext, useState } from 'react';

/* Typdefinition für den Authentifizierungs-Kontext */
interface AuthContextType {
    username: string | null;
    avatar: string | null;
    userId: string | null;
    login: (username: string, avatar: string, id: string) => void;
    logout: () => void;
}

/* Erstelle den Kontext mit Standardwerten */
const AuthContext = createContext<AuthContextType>({
    username: null,
    avatar: null,
    userId: null,
    login: () => {},
    logout: () => {}
});

/* Provider-Komponente, die den Zustand global verfügbar macht */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Hole gespeicherte Daten aus dem localStorage (z.B. nach Seiten-Neuladen)
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [avatar, setAvatar] = useState<string | null>(localStorage.getItem("avatar"));
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));

    // Login-Funktion speichert Daten im localStorage und Zustand
    const login = (uname: string, avat: string, id: string) => {
        localStorage.setItem("username", uname);
        localStorage.setItem("avatar", avat);
        localStorage.setItem("userId", id);
        setUsername(uname);
        setAvatar(avat);
        setUserId(id)
    };

    // Logout-Funktion entfernt Daten und setzt Zustand zurück
    const logout = () => {
        localStorage.clear();
        setUsername(null);
        setAvatar(null);
        setUserId(null);
    };

    // Gib die Daten und Funktionen an alle Kinderkomponenten weiter
    return (
        <AuthContext.Provider value={{ username, avatar, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/* Eigener Hook zum einfachen Zugriff auf Auth-Daten */
export const useAuth = () => useContext(AuthContext);