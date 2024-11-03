import axiosInstance from "../utils/axiosInstance";

/**
 * Obtiene el historial de peso de un niño según su ID.
 * 
 * @param {number} idKid - ID único del niño.
 * @returns {Promise<object>} - Devuelve los datos de peso si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getWeights = async(idKid) => {
    try {
        const response = await axiosInstance.get(`/getWeightsForKid/${idKid}`);
        return response; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error("Error al obtener pesos:", error.message);
        throw new Error("Error al obtener pesos"); // Lanza el error para ser manejado en el componente
    }
};

/**
 * Obtiene el historial de altura de un niño según su ID.
 * 
 * @param {number} idKid - ID único del niño.
 * @returns {Promise<object>} - Devuelve los datos de altura si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getHeights = async(idKid) => {
    try {
        const response = await axiosInstance.get(`/getHeightsForKid/${idKid}`);
        return response;
    } catch (error) {
        console.error("Error al obtener alturas:", error.message);
        throw new Error("Error al obtener alturas");
    }
};

/**
 * Agrega datos a la API usando una URL específica y un objeto de datos.
 * 
 * @param {string} apiURL - URL específica para la solicitud POST.
 * @param {object} data - Datos a enviar en el cuerpo de la solicitud.
 * @returns {Promise<object>} - Devuelve los datos de la respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const addData = async (apiURL, data) => {
    try {
        const response = await axiosInstance.post(apiURL, data);
        return response.data;
    } catch (error) {
        console.error("Error al agregar datos:", error.message);
        throw new Error("Error al agregar datos");
    }
};

/**
 * Elimina datos de la API usando una URL específica.
 * 
 * @param {string} apiURL - URL específica para la solicitud DELETE.
 * @returns {Promise<object>} - Devuelve los datos de la respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const deleteData = async (apiURL) => {
    try {
        const response = await axiosInstance.delete(apiURL);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar datos:", error.message);
        throw new Error("Error al eliminar datos");
    }
};
