import React, { useState } from 'react';
import api from '../services/api';

// Este componente recibe el ID del compromiso al que pertenece
// y una función para ejecutar cuando la gestión se crea con éxito.
const GestionForm = ({ compromisoId, onSuccess }) => {
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validación del archivo en el frontend para mejor UX
        if (archivo) {
            const allowedTypes = ['application/pdf', 'image/jpeg'];
            if (!allowedTypes.includes(archivo.type)) {
                setError('Formato de archivo no válido. Solo se permiten .pdf y .jpg.'); // [cite: 38]
                return;
            }
            if (archivo.size > 5 * 1024 * 1024) { // 5MB
                setError('El archivo es demasiado grande. El máximo es 5MB.'); // [cite: 39]
                return;
            }
        }

        // FormData es NECESARIO para enviar archivos
        const formData = new FormData();
        formData.append('descripcion', descripcion);
        formData.append('compromiso', compromisoId);
        if (archivo) {
            formData.append('archivo_adjunto', archivo);
        }

        try {
            await api.post('/gestiones/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('¡Gestión creada con éxito!');
            onSuccess(); // Llama a la función onSuccess para refrescar o cerrar el form.
        } catch (err) {
            setError('Hubo un error al crear la gestión.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '15px', padding: '10px', border: '1px solid #ccc' }}>
            <h4>Nueva Gestión</h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción de la gestión"
                required
                style={{ width: '95%', minHeight: '60px' }}
            />
            <br/>
            <input
                type="file"
                onChange={(e) => setArchivo(e.target.files[0])}
                accept=".pdf,.jpg" // Limita los archivos que se pueden seleccionar
            />
            <br/>
            <button type="submit" style={{ marginTop: '10px' }}>Guardar Gestión</button>
        </form>
    );
};

export default GestionForm;