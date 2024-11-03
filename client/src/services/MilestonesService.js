import axiosInstance from "../utils/axiosInstance";

/**
 * Obtiene los hitos de un niño específico basado en su ID.
 *
 * @param {string} idKid - El ID del niño.
 * @returns {Promise<object[]>} - Devuelve una lista de hitos o un array vacío si no hay ID.
 */
export const fetchMilestonesForKid = async (idKid) => {
    if (!idKid) return []; // Retornar vacío si no hay ID
    try {
        const response = await axiosInstance.get(`/getMilestonesForKid/${idKid}`);
        return response.data; // Retornar los datos de hitos
    } catch (error) {
        console.error('Error fetching milestones for kid:', error.message); // Loguear el error
        return []; // Retornar vacío en caso de error
    }
};

/**
 * Guarda un nuevo hito para un niño específico.
 *
 * @param {string} idKid - El ID del niño.
 * @param {string} id_hito - El ID del hito a guardar.
 * @param {number} edad_conseguida - La edad a la que se alcanzó el hito.
 * @returns {Promise<object>} - Devuelve los datos del hito guardado.
 */
export const saveMilestone = async (idKid, id_hito, edad_conseguida) => {
    try {
        const response = await axiosInstance.post('/saveMilestoneForKid', {
            idKid,
            id_hito,
            edad_conseguida
        });
        return response.data; // Retornar los datos del hito guardado
    } catch (error) {
        console.error('Error saving milestone for kid:', error.message); // Loguear el error
        throw new Error("Error saving milestone"); // Lanza un error personalizado
    }
}

/**
 * Obtiene todos los hitos disponibles en el sistema.
 *
 * @returns {Promise<object[]>} - Devuelve una lista de hitos.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const fetchMilestone = async () => {
    try {
        const response = await axiosInstance.get('/getmilestones');
        return response; // Retornar los datos de hitos
    } catch (error) {
        console.error('Error fetching milestones:', error.message); // Loguear el error
        throw new Error("Error fetching milestones"); // Lanza un error personalizado
    }
};
