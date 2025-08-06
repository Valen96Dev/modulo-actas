import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Aqui es para leer tanto el token como el objeto de usuario desde localStorage
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (email, password) => {
        const response = await api.post('/login/', { username: email, password });
        const { access, user: userData } = response.data;

        // Para guardar el token y el objeto de usuario completo
        localStorage.setItem('authToken', access);
        localStorage.setItem('user', JSON.stringify(userData)); 

        setToken(access);
        setUser(userData);
    };

    const logout = () => {
        
        localStorage.removeItem('authToken');
        localStorage.removeItem('user'); 

        setToken(null);
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);