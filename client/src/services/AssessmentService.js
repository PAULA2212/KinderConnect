import axiosInstance from "../utils/axiosInstance"; // Importa la instancia de Axios configurada

/**
 * Obtiene los detalles de una evaluación específica por su ID.
 * 
 * @param {string} id - El ID de la evaluación que se desea obtener.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los detalles de la evaluación.
 * @throws {Error} - Lanza un error si la obtención de la evaluación falla.
 */
export const getAssessment = async (id) => {
    try {
        // Realiza una solicitud GET a la API para obtener la evaluación especificada por ID
        const response = await axiosInstance.get(`/getAssessment/${id}`);
        return response; // Devuelve la respuesta completa de la solicitud (se recomienda revisar si solo se requiere response.data)
    } catch (error) {
        console.error("Error get assessment:", error.message); // Log de error en caso de fallo
        throw new Error("Error get assessment"); // Lanza el error para que el componente que llama pueda manejarlo
    }
}

/**
 * Añade una nueva evaluación utilizando los datos proporcionados.
 * 
 * @param {Object} data - Un objeto con los datos de la evaluación a añadir.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los datos de la evaluación añadida.
 * @throws {Error} - Lanza un error si la adición de la evaluación falla.
 */
export const addAssessment = async (data) => {
    try {
        // Realiza una solicitud POST a la API para añadir una nueva evaluación
        const response = await axiosInstance.post('/addAssessment', data);
        return response; // Devuelve la respuesta completa de la solicitud (se recomienda revisar si solo se requiere response.data)
    } catch (error) {
        console.error("Error add assessment:", error.message); // Log de error en caso de fallo
        throw new Error("Error add assessment"); // Lanza el error para que el componente que llama pueda manejarlo
    }
}
