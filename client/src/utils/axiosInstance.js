import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api', // URL base para la API
    timeout: 20000, // Tiempo de espera opcional
});

export default axiosInstance;