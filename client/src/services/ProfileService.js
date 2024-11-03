import axiosInstance from "../utils/axiosInstance";

/**
 * Actualiza el perfil del usuario.
 *
 * @param {object} data - Los datos del perfil a actualizar.
 * @returns {Promise<object>} - Devuelve la respuesta del servidor.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const updateProfile = async (data) => {
    try {
        const response = await axiosInstance.post('/updateProfile', data);
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error("Error updating profile:", error.message); // Loguear el error
        throw new Error("Error updating profile"); // Lanza un error personalizado
    }
};
