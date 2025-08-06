import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CompromisoForm = ({ actaId, onSuccess }) => {
    const [descripcion, setDescripcion] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [responsable, setResponsable] = useState('');

    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState('');

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

        if (!responsable) {
            setError('Debe seleccionar un responsable.');
            return;
        }

        const data = {
            descripcion,
            fecha_limite: fechaLimite,
            responsable_id: responsable, 
            acta: actaId    
        };

        try {
            await api.post('/compromisos/', data);
            alert('¡Compromiso creado con éxito!');
            onSuccess();
        } catch (err) {
            setError('Hubo un error al crear el compromiso.');
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', marginTop: '20px' }}>
            <h3>Agregar Nuevo Compromiso</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Descripción:</label><br/>
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required style={{ width: '95%', minHeight: '60px' }} />
                </div>
                <div>
                    <label>Fecha Límite:</label><br/>
                    <input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} required />
                </div>
                <div>
                    <label>Responsable:</label><br/>
                    <select value={responsable} onChange={(e) => setResponsable(e.target.value)} required>
                        <option value="">-- Seleccione un usuario --</option>
                        {allUsers.map(user => (
                            <option key={user.id} value={user.id}>{user.email}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>Guardar Compromiso</button>
            </form>
        </div>
    );
};

export default CompromisoForm;