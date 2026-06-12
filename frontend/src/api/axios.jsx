import axios from 'axios';

const clienteAxios = axios.create({
  // Si está en producción usa la API de Render, sino usa localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export default clienteAxios;