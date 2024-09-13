import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPaquetes, deletePaquete } from '../api/apiPaquetes'; // Asegúrate de que estas funciones existan en tu API
import GenericTable from './GenericTable';
import { Button, Box, TextField } from '@mui/material';

const PaqueteList = () => {
    const [paquetes, setPaquetes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPaquetes();
    }, []);

    const fetchPaquetes = async () => {
        try {
            const response = await getPaquetes();
            setPaquetes(response);
        } catch (error) {
            console.error('Error fetching paquetes:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePaquete(id);
            fetchPaquetes(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting paquete:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/paquetes/edit/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'tipo_paquete_id', headerName: 'Tipo de Paquete', width: 180, renderCell: (params) => {
            // Assuming tipo_paquete_id is a reference ID; replace this with actual lookup or data
            return <span>{params.row.tipo_paquete_id}</span>;
        }},
        { field: 'residentes_cedula', headerName: 'Cédula del Residente', width: 180 },
        { field: 'fecha_registro', headerName: 'Fecha de Registro', width: 200 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Button variant="contained" color="primary" onClick={() => handleEdit(params.row.id)}>
                        Editar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}>
                        Eliminar
                    </Button>
                </Box>
            )
        }
    ];

    const filteredPaquetes = paquetes.filter((pkg) => 
        Object.values(pkg).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div>
            <TextField
                label="Buscar"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <GenericTable rows={filteredPaquetes} columns={columns} title="Paquetes" addLink="/paquetes/add" />
        </div>
    );
};

export default PaqueteList;
