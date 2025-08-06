import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const ProtectedLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet /> {/* Aquí se renderizará el contenido de la página actual */}
            </main>
        </div>
    );
};

export default ProtectedLayout;