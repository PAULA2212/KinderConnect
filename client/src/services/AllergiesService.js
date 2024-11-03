import axiosInstance from "../utils/axiosInstance"; // Importa la instancia de axios para realizar solicitudes HTTP

/**
 * Función para añadir un alérgeno.
 * 
 * @param {Object} data - Los datos del alérgeno a añadir.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los datos del alérgeno añadido.
 * @throws {Error} - Lanza un error si la adición del alérgeno falla.
 */
export const addAllergen = async (data) => {
    try {
        // Realiza una solicitud POST a la API para añadir el alérgeno
        const response = await axiosInstance.post('/addAllergen', data);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error adding allergen:", error.message); // Log de error
        throw new Error("Error adding allergen"); // Lanza el error para que el componente pueda manejarlo
    }
}

/**
 * Función para obtener los alérgenos asociados a un niño específico.
 * 
 * @param {string} id - El ID del niño para el cual se obtienen los alérgenos.
 * @returns {Promise<object>} - Devuelve la lista de alérgenos para el niño.
 * @throws {Error} - Lanza un error si la obtención de alérgenos falla.
 */
export const getAllergensForKid = async (id) => {
    try {
        // Realiza una solicitud GET a la API para obtener los alérgenos del niño
        const response = await axiosInstance(`/getAllergens/${id}`);
        return response.data; // Devuelve la lista de alérgenos
    } catch (error) {
        console.error("Error get allergen:", error.message); // Log de error
        throw new Error("Error get allergen"); // Lanza el error para que el componente pueda manejarlo
    }
}
