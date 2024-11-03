import axiosInstance from '../utils/axiosInstance';

/**
 * Obtiene el nombre del educador usando su ID.
 * 
 * @param {number} id - ID único del educador.
 * @returns {Promise<object>} - Devuelve la respuesta de la API si es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getTeachersName = async(id) => {
    try {
        const response = await axiosInstance.get(`/detalleUsuario/${id}/educador`);
        return response; 
    } catch (error) {
        console.error("Error al obtener nombres:", error.message);
        throw new Error("Error al obtener nombres del educador");
    }
};

/**
 * Actualiza el estado de una meta específica.
 * 
 * @param {number} goalId - ID único de la meta.
 * @param {string} newState - Nuevo estado de la meta.
 * @returns {Promise<object>} - Devuelve la respuesta de la API si es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const setGoalState = async(goalId, newState) => {
    try {
        const response = await axiosInstance.put(`/updateGoal/${goalId}`, { estado: newState });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el estado de la meta:", error.message);
        throw new Error("Error al actualizar el estado de la meta");
    }
};

/**
 * Obtiene las metas asociadas a un niño específico.
 * 
 * @param {number} id - ID único del niño.
 * @returns {Promise<object>} - Devuelve las metas del niño si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getGoals = async(id) => {
    try {
        const response = await axiosInstance.get(`/getGoals/${id}`);
        return response; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error("Error al obtener metas:", error.message);
        throw new Error("Error al obtener metas");
    }
};

/**
 * Guarda una nueva meta en el sistema.
 * 
 * @param {object} goal - Objeto que contiene los datos de la meta.
 * @returns {Promise<object>} - Devuelve la respuesta de la API si es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const saveGoal = async(goal) => {
    try {
        const response = await axiosInstance.post('/saveGoal', goal);
        return response.data;
    } catch (error) {
        console.error("Error al guardar la meta:", error.message);
        throw new Error("Error al guardar la meta");
    }
};
