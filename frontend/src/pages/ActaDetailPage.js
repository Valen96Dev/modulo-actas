import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; 
import { useAuth } from '../context/AuthContext';
import GestionForm from '../components/GestionForm';
import CompromisoForm from '../components/CompromisoForm';

const ActaDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [acta, setActa] = useState(null);
    const [showGestionFormFor, setShowGestionFormFor] = useState(null);
    const [showCompromisoForm, setShowCompromisoForm] = useState(false);

    const fetchActa = useCallback(async () => {
        try {
            const response = await api.get(`/actas/${id}/`);
            setActa(response.data);
        } catch (error) { 
            console.error("Error fetching acta details:", error); 
        }
    }, [id]);

    useEffect(() => {
        fetchActa();
    }, [fetchActa]);

    const handleSuccess = () => {
        setShowGestionFormFor(null);
        setShowCompromisoForm(false);
        fetchActa();
    };

    const handleFileDownload = async (gestionId, fileName) => {
        if (!gestionId) {
            alert("ID de la gestión no es válido o el archivo no existe.");
            return;
        }

        try {
            // Apuntamos al nuevo endpoint de la API que es seguro
            const response = await api.get(`/gestiones/${gestionId}/download/`, {
                responseType: 'blob',
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName.split('/').pop());
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Error al descargar el archivo:", error);
            alert("No se pudo descargar el archivo.");
        }
    };

    // Función separada para el PDF del Acta, que necesita su propio endpoint
    const handleActaPdfDownload = async (actaId, fileName) => {
        if (!actaId || !fileName) {
            alert("Esta acta no tiene un PDF adjunto.");
            return;
        }
        alert("Funcionalidad para descargar PDF de acta principal pendiente de implementación en el backend.");
    };

    if (!acta) return <p>Cargando...</p>;

    return (
        <div>
            <h2>{acta.titulo}</h2>
            <p><strong>Fecha:</strong> {acta.fecha} | <strong>Estado:</strong> {acta.estado}</p>
            <button onClick={() => handleActaPdfDownload(acta.id, acta.archivo_pdf)}>Ver PDF del Acta</button>

            <h3 style={{ marginTop: '20px' }}>Compromisos Asociados</h3>
            
            {user?.rol === 'admin' && (
                <button onClick={() => setShowCompromisoForm(!showCompromisoForm)} style={{ marginBottom: '10px' }}>
                    {showCompromisoForm ? 'Ocultar Formulario' : 'Agregar Compromiso'}
                </button>
            )}
            
            {showCompromisoForm && <CompromisoForm actaId={acta.id} onSuccess={handleSuccess} />}

            <ul>
                {acta.compromisos.map(compromiso => (
                    <li key={compromiso.id} style={{ marginBottom: '20px', borderLeft: '3px solid #eee', paddingLeft: '15px' }}>
                        <p><strong>Compromiso:</strong> {compromiso.descripcion}</p>
                        <p><strong>Responsable:</strong> {compromiso.responsable.username}</p>
                        <p><strong>Fecha Límite:</strong> {compromiso.fecha_limite}</p>

                        <div style={{ marginLeft: '20px' }}>
                            <strong>Gestiones realizadas:</strong>
                            {compromiso.gestiones.length > 0 ? (
                                <ul>
                                    {compromiso.gestiones.map(g => (
                                        <li key={g.id}>
                                            {g.descripcion}
                                            {g.archivo_adjunto && (
                                                <button 
                                                    onClick={() => handleFileDownload(g.id, g.archivo_adjunto)}
                                                    style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                                >
                                                    (Ver Archivo)
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>No hay gestiones para este compromiso.</p>}
                        </div>

                        {(user?.rol === 'admin' || user?.id === compromiso.responsable.id) && (
                            <button onClick={() => setShowGestionFormFor(compromiso.id)}>Agregar Gestión</button>
                        )}

                        {showGestionFormFor === compromiso.id && (
                            <GestionForm compromisoId={compromiso.id} onSuccess={handleSuccess} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActaDetailPage;