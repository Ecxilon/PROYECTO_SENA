import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Asegúrate de que esta URL coincida con la configuración de tu servidor

// Obtener todos los paquetes
export const getPaquetes = async () => {
    try {
        const response = await axios.get(`${API_URL}/paquete`);
        return response.data;
    } catch (error) {
        console.error('Error fetching paquete:', error);
        throw error;
    }
};

// Obtener un paquete por ID
export const getPaquete = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/paquete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching paquete:', error);
        throw error;
    }
};

// Crear un nuevo paquete
export const createPaquete = async (paquete) => {
    try {
        const response = await axios.post(`${API_URL}/paquete`, paquete);
        return response.data;
    } catch (error) {
        console.error('Error creating paquete:', error);
        throw error;
    }
};

// Actualizar un paquete por ID
export const updatePaquete = async (id, paquete) => {
    try {
        const response = await axios.put(`${API_URL}/paquete/${id}`, paquete);
        return response.data;
    } catch (error) {
        console.error('Error updating paquete:', error);
        throw error;
    }
};

// Eliminar un paquete por ID
export const deletePaquete = async (id) => {
    try {
        await axios.delete(`${API_URL}/paquete/${id}`);
    } catch (error) {
        console.error('Error deleting paquete:', error);
        throw error;
    }
};
