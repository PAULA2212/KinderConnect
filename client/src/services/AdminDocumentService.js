import axiosInstance from "../utils/axiosInstance"; // Importa la instancia de axios para realizar solicitudes HTTP

/**
 * Función para eliminar un documento.
 * 
 * @param {string} id - El ID del documento a eliminar.
 * @param {string} type - El tipo de documento que se va a eliminar.
 * @returns {Promise<object>} - Devuelve la respuesta de la API.
 * @throws {Error} - Lanza un error si la eliminación falla.
 */
export const deleteDocument = async (id, type) => {
    try {
        // Realiza una solicitud DELETE a la API para eliminar el documento
        const response = await axiosInstance.delete(`/deleteDocument/${id}/${type}`);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error on delete document:", error.message); // Log de error
        throw new Error("Error delete document"); // Lanza el error para que el componente pueda manejarlo
    }
}

/**
 * Función para obtener un documento por su ID.
 * 
 * @param {string} id - El ID del documento a obtener.
 * @param {string} type - El tipo de documento que se va a obtener.
 * @returns {Promise<object>} - Devuelve la respuesta de la API.
 * @throws {Error} - Lanza un error si la obtención falla.
 */
export const getDocumentById = async (id, type) => {
    try {
        // Realiza una solicitud GET a la API para obtener el documento por su ID
        const response = await axiosInstance.get(`/getDocumentById/${id}/${type}`);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error getting document:", error.message); // Log de error
        throw new Error("Error getting document"); // Lanza el error para que el componente pueda manejarlo
    }
}

/**
 * Función para obtener un documento por su enlace.
 * 
 * @param {string} id - El ID del documento a obtener.
 * @param {string} type - El tipo de documento que se va a obtener.
 * @returns {Promise<object>} - Devuelve la respuesta de la API.
 * @throws {Error} - Lanza un error si la obtención falla.
 */
export const getDocumentByLink = async (id, type) => {
    try {
        // Realiza una solicitud GET a la API para obtener el documento por su enlace
        const response = await axiosInstance.get(`/getDocumentByLink/${id}/${type}`);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error getting document:", error.message); // Log de error
        throw new Error("Error getting document"); // Lanza el error para que el componente pueda manejarlo
    }
}

/**
 * Función para añadir un documento.
 * 
 * @param {FormData} formData - Los datos del formulario que contienen el documento a añadir.
 * @param {string} profileType - El tipo de perfil del usuario que añade el documento.
 * @returns {Promise<object>} - Devuelve la respuesta de la API.
 * @throws {Error} - Lanza un error si la adición falla.
 */
export const addDocument = async (formData, profileType) => {
    // Determina la URL de la API según el tipo de perfil
    const apiURL = profileType === "educador" ? "/addDocument" : "/addDocumentForKid";
    try {
        // Realiza una solicitud POST a la API para añadir el documento
        const response = await axiosInstance.post(apiURL, formData);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error adding document:", error.message); // Log de error
        throw new Error("Error adding document"); // Lanza el error para que el componente pueda manejarlo
    }
}
