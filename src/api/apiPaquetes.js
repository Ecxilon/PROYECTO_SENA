import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Paquetes';

export const getPaquetes = () => axios.get(API_URL);
export const getPaquete = (id) => axios.get(`${API_URL}/${id}`);
export const createPaquete = (data) => axios.post(API_URL, data);
export const updatePaquete = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePaquete = (id) => axios.delete(`${API_URL}/${id}`);
