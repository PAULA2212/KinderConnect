import axios from 'axios';

// Crear una instancia de Axios con configuración predeterminada
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api', // URL base para la API que se usará en todas las solicitudes
    timeout: 20000, // Tiempo máximo de espera para la respuesta (en milisegundos)
});

// Exportar la instancia de Axios para ser utilizada en otros módulos
export default axiosInstance;


