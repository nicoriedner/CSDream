import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    username: string | null;
    avatar: string | null;
    login: (username: string, avatar: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    username: null,
    avatar: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [avatar, setAvatar] = useState<string | null>(localStorage.getItem("avatar"));

    const login = (uname: string, avat: string) => {
        localStorage.setItem("username", uname);
        localStorage.setItem("avatar", avat);
        setUsername(uname);
        setAvatar(avat);
    };

    const logout = () => {
        localStorage.clear();
        setUsername(null);
        setAvatar(null);
    };

    return (
        <AuthContext.Provider value={{ username, avatar, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);