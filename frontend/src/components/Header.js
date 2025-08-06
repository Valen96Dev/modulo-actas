import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
            {user ? (
                <span>Hola, {user.email} (Rol: {user.rol})</span>
            ) : (
                <span></span>
            )}
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </header>
    );
};

export default Header;