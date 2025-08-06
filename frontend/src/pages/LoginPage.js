import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { register, handleSubmit } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate('/actas'); 
        } catch (error) {
            console.error("Error en el login", error);
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div>
            <h2>Login</h2> {}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="Email (ej: admin@test.com)" {...register('email')} required />
                <input type="password" placeholder="Contraseña (ej: adminpass)" {...register('password')} required />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginPage;