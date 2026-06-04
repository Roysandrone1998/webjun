import axios from 'axios';

const clienteAxios = axios.create({
   baseURL: 'http://127.0.0.1:5000/api'
});

// Este interceptor pega el token automáticamente en cada petición si existe
clienteAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

export default clienteAxios;
