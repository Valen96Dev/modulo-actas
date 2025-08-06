import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';


const ActasDashboard = () => {
    const [actas, setActas] = useState([]);
    const [filters, setFilters] = useState({ titulo: '', estado: '', fecha: '' });

    useEffect(() => {
        const fetchActas = async () => {
            try {
                // Construye los parámetros de la URL para los filtros 
                const params = new URLSearchParams(filters).toString();
                const response = await api.get(`/actas/?${params}`);
                setActas(response.data); 
            } catch (error) {
                console.error("Error fetching actas:", error);
            }
        };
        fetchActas();
    }, [filters]); // Se ejecuta cada vez que los filtros cambian

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Panel de Actas</h2>
            <Link to="/actas/nueva">
            <button style={{ marginBottom: '20px' }}>Crear Nueva Acta</button>
        </Link>
            <div>
                <input name="titulo" onChange={handleFilterChange} placeholder="Filtrar por título..." />
                <select name="estado" onChange={handleFilterChange}>
                    <option value="">Todos los estados</option>
                    <option value="abierta">Abierta</option>
                    <option value="cerrada">Cerrada</option>
                </select>
                <input name="fecha" type="date" onChange={handleFilterChange} />
            </div>
            <table> {/* [cite: 26] */}
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Nº Compromisos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {actas.map(acta => (
                        <tr key={acta.id}>
                            <td>{acta.titulo}</td>
                            <td>{acta.estado}</td>
                            <td>{acta.fecha}</td>
                            <td>{acta.compromisos.length}</td>
                            <td><Link to={`/actas/${acta.id}`}>Ver Detalle</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActasDashboard;