import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    username: string | null;
    avatar: string | null;
    userId: string | null;
    login: (username: string, avatar: string, id: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    username: null,
    avatar: null,
    userId: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [avatar, setAvatar] = useState<string | null>(localStorage.getItem("avatar"));
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));

    const login = (uname: string, avat: string, id: string) => {
        localStorage.setItem("username", uname);
        localStorage.setItem("avatar", avat);
        localStorage.setItem("userId", id);
        setUsername(uname);
        setAvatar(avat);
        setUserId(id)
    };

    const logout = () => {
        localStorage.clear();
        setUsername(null);
        setAvatar(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ username, avatar, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);