import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaquete, createPaquete, updatePaquete } from '../api/apiPaquetes'; // Asegúrate de que estas funciones existan
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';

const PaqueteForm = () => {
    const { id } = useParams(); // ID para editar; es opcional para agregar
    const navigate = useNavigate();
    const [paquete, setPaquete] = useState({
        tipo_paquete_id: '',
        residentes_cedula: '',
        processed: false,
    });

    useEffect(() => {
        if (id) {
            fetchPaquete(id);
        }
    }, [id]);

    const fetchPaquete = async (id) => {
        try {
            const data = await getPaquete(id);
            setPaquete({
                tipo_paquete_id: data.tipo_paquete_id || '',
                residentes_cedula: data.residentes_cedula || '',
                processed: data.processed === 1,
            });
        } catch (error) {
            console.error('Error fetching paquete:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPaquete(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updatePaquete(id, paquete);
            } else {
                await createPaquete(paquete);
            }
            navigate('/paquetes'); // Redirige a la lista de paquetes solo si la operación es exitosa
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error al insertar el paquete. Por favor, inténtalo de nuevo.');
        }
    };
    

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h4" gutterBottom>
                {id ? 'Editar Paquete' : 'Agregar Paquete'}
            </Typography>
            <TextField
                label="Tipo de Paquete ID"
                name="tipo_paquete_id"
                value={paquete.tipo_paquete_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
            />
            <TextField
                label="Cédula del Residente"
                name="residentes_cedula"
                value={paquete.residentes_cedula}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="processed"
                        checked={paquete.processed}
                        onChange={handleChange}
                    />
                }
                label="Procesado"
            />
            <Button type="submit" variant="contained" color="primary">
                {id ? 'Actualizar' : 'Agregar'}
            </Button>
        </Box>
    );
};

export default PaqueteForm;
