import axiosInstance from "../utils/axiosInstance";

/**
 * Registra un nuevo perfil de usuario.
 *
 * @param {object} formData - Los datos del perfil a registrar.
 * @returns {Promise<object>} - Devuelve la respuesta del servidor.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const registerProfile = async (formData) => {
    try {
        const response = await axiosInstance.post('/register', formData);
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error("Error registering profile:", error.message); // Registra el error en la consola
        throw new Error("Error registering profile"); // Lanza un error personalizado
    }
};
