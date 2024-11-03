import axiosInstance from "../utils/axiosInstance"; // Importa la instancia de Axios configurada

/**
 * Agrega un nuevo alimento a la base de datos.
 * 
 * @param {object} data - Objeto que contiene los datos del alimento que se va a agregar.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los detalles del alimento agregado.
 * @throws {Error} - Lanza un error si la solicitud para agregar el alimento falla.
 */
export const addFood = async (data) => {
    try {
        // Realiza una solicitud POST para agregar un alimento
        const response = await axiosInstance.post('/addFood', data);
        return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error("Error adding food:", error.message); // Log del error
        throw new Error("Error adding food"); // Lanza el error para manejo en el componente
    }
};

/**
 * Obtiene una lista de alimentos para un niño específico.
 * 
 * @param {number} id - ID único del niño para el cual se solicitan los alimentos.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los alimentos asociados al niño.
 * @throws {Error} - Lanza un error si la solicitud para obtener los alimentos falla.
 */
export const getFoods = async (id) => {
    try {
        // Realiza una solicitud GET para obtener los alimentos asociados a un niño
        const response = await axiosInstance.get(`/getFoods/${id}`);
        
        // Logs para ver la respuesta completa y los datos devueltos
        console.log('Respuesta completa de la API:', response);
        console.log('Datos devueltos:', response.data);
        
        return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error("Error get foods:", error.message); // Log del error
        throw new Error("Error get foods"); // Lanza el error para manejo en el componente
    }
};
