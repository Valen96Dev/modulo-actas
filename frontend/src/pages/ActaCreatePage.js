import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ActaCreatePage = () => {
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [participantes, setParticipantes] = useState([]);
    const [archivo, setArchivo] = useState(null);

    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Al cargar el componente, obtenemos la lista de todos los usuarios
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users/');
                setAllUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('fecha', fecha);
        formData.append('archivo_pdf', archivo);
        // Los IDs de los participantes se deben enviar uno por uno
        participantes.forEach(id => formData.append('participantes', id));

        try {
            await api.post('/actas/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Acta creada con éxito');
            navigate('/actas'); // Vuelve al panel principal
        } catch (err) {
            setError('Hubo un error al crear el acta.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Crear Nueva Acta</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <div>
                    <label>Participantes:</label>
                    <select
                        multiple
                        value={participantes}
                        onChange={(e) => setParticipantes(Array.from(e.target.selectedOptions, option => option.value))}
                        required
                    >
                        {allUsers.map(user => (
                            <option key={user.id} value={user.id}>{user.email}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Archivo PDF del Acta:</label>
                    <input type="file" onChange={(e) => setArchivo(e.target.files[0])} accept=".pdf" required />
                </div>
                <button type="submit">Guardar Acta</button>
            </form>
        </div>
    );
};

export default ActaCreatePage;