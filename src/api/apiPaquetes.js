import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Asegúrate de que esta URL coincida con la configuración de tu servidor

// Obtener todos los paquetes
export const getPaquetes = async () => {
    try {
        const response = await axios.get(`${API_URL}/paquetes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching paquetes:', error);
        throw error;
    }
};

// Obtener un paquete por ID
export const getPaquete = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/paquetes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching paquete:', error);
        throw error;
    }
};

// Crear un nuevo paquete
export const createPaquete = async (paquete) => {
    try {
        const response = await axios.post(`${API_URL}/paquetes`, paquete);
        return response.data;
    } catch (error) {
        console.error('Error creating paquete:', error);
        throw error;
    }
};

// Actualizar un paquete por ID
export const updatePaquete = async (id, paquete) => {
    try {
        const response = await axios.put(`${API_URL}/paquetes/${id}`, paquete);
        return response.data;
    } catch (error) {
        console.error('Error updating paquete:', error);
        throw error;
    }
};

// Eliminar un paquete por ID
export const deletePaquete = async (id) => {
    try {
        await axios.delete(`${API_URL}/paquetes/${id}`);
    } catch (error) {
        console.error('Error deleting paquete:', error);
        throw error;
    }
};
