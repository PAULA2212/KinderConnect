import axiosInstance from "../utils/axiosInstance"; // Importa la instancia de Axios configurada

/**
 * Sube una nueva imagen al servidor.
 * 
 * @param {object} data - Objeto que contiene los datos de la imagen que se va a agregar, 
 *                        puede incluir un archivo y otros metadatos.
 * @returns {Promise<object>} - Devuelve los datos de la respuesta de la API si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud para agregar la imagen falla.
 */
export const addImage = async (data) => {
    try {
        // Realiza la solicitud POST para subir una imagen
        const response = await axiosInstance.post('/addImage', data);
        return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error("Error adding image:", error.message); // Log del error en caso de fallo
        throw new Error("Error adding image"); // Lanza el error para manejo en el componente
    }
};

/**
 * Obtiene una lista de imágenes asociadas a un niño específico.
 * 
 * @param {number} idKid - ID único del niño para el cual se solicitan las imágenes.
 * @returns {Promise<object>} - Devuelve la lista de imágenes asociadas al niño.
 * @throws {Error} - Lanza un error si la solicitud para obtener las imágenes falla.
 */
export const getImagesForKid = async (idKid) => {
    try {
        // Realiza una solicitud GET para obtener las imágenes de un niño específico
        const response = await axiosInstance.get(`/getImages/${idKid}`);
        
        // Logs de depuración para ver el ID y la respuesta completa
        console.log("ID del niño:", idKid);
        console.log('Respuesta completa de la API:', response); // Revisión completa de la respuesta
        console.log('Datos devueltos:', response.data); // Datos específicos devueltos por la API
        
        return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error("Error obteniendo las imágenes:", error.message); // Log del error
        throw new Error("Error obteniendo las imágenes"); // Lanza el error para manejo en el componente
    }
};
