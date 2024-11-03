import axiosInstance from "../utils/axiosInstance";

/**
 * Obtiene las condiciones médicas para un niño específico.
 *
 * @param {string} id - El ID del niño para el cual se quieren obtener las condiciones médicas.
 * @returns {Promise<object>} - Devuelve los datos de las condiciones médicas si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getConditions = async (id) => {
    try {
        const response = await axiosInstance.get(`/getConditions/${id}`); // Se especifica que es un GET
        return response.data; // Devuelve los datos de las condiciones
    } catch (error) {
        console.error("Error al obtener las condiciones:", error.message); // Loguea el error
        throw new Error("Error al obtener las condiciones"); // Lanza un error personalizado
    }
}

/**
 * Agrega una nueva condición médica.
 *
 * @param {object} data - Datos de la condición médica que se va a agregar.
 * @returns {Promise<object>} - Devuelve los datos de respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const addMedicalCondition = async (data) => {
    try {
        const response = await axiosInstance.post('/addMedicalCondition', data); // Se especifica que es un POST
        return response.data; // Devuelve los datos de respuesta (confirmación, nuevo objeto, etc.)
    } catch (error) {
        console.error("Error al agregar la condición:", error.message); // Loguea el error
        throw new Error("Error al agregar la condición"); // Lanza un error personalizado
    }
}
