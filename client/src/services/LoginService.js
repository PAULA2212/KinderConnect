import axiosInstance from '../utils/axiosInstance';

/**
 * Inicia sesión del usuario.
 * 
 * @param {object} dataUser - Datos del usuario necesarios para el inicio de sesión (ej. email y contraseña).
 * @returns {Promise<object>} - Devuelve los datos de respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const Login = async (dataUser) => {
    try {
        const response = await axiosInstance.post('/login', dataUser);
        return response.data; // Devuelve los datos de respuesta (tokens, info de usuario, etc.)
    } catch (error) {
        console.error("Error al iniciar sesión del usuario:", error.message); // Muestra el error en la consola
        throw new Error("Error al iniciar sesión del usuario"); // Lanza el error para que el componente lo maneje
    }
};
