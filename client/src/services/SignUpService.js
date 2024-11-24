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
        console.error("Error registering profile:", error); // Muestra detalles completos del error

        // Verifica si el error tiene respuesta y maneja el error de manera apropiada
        if (error.response) {
            // Si la respuesta del servidor contiene un código de estado 409
            if (error.response.status === 409) {
                // Lanzar un error con el mensaje específico del servidor
                throw new Error(error.response.data.message || "Nombre de usuario ya registrado");
            }
            // Para otros códigos de estado, puedes agregar más condiciones o manejar errores genéricos
            throw new Error(error.response.data.message || "Ocurrió un error al registrar el perfil.");
        } else if (error.request) {
            // Si no hay respuesta del servidor, maneja el caso cuando la solicitud no recibe respuesta
            throw new Error("No se recibió respuesta del servidor.");
        } else {
            // Si el error ocurrió por otro motivo, como problemas de configuración
            throw new Error(`Error desconocido: ${error.message}`);
        }
    }
};
