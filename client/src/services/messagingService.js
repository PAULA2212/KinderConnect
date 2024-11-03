import axiosInstance from "../utils/axiosInstance";

/**
 * Obtiene los destinatarios potenciales para un mensaje basado en el ID y el tipo especificado.
 *
 * @param {string} id - El ID del remitente o del contexto.
 * @param {string} type - El tipo de destinatario (por ejemplo, 'educador' o 'progenitor').
 * @returns {Promise<object>} - Devuelve la lista de destinatarios potenciales.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getPotentialRecipients = async (id, type) => {
    try {
        const response = await axiosInstance.get(`/getPotentialRecipients/${id}/${type}`);
        return response.data; // Devuelve los datos de los destinatarios
    } catch (error) {
        console.error("Error al obtener los destinatarios:", error.message); // Loguea el error
        throw new Error("Error al obtener los destinatarios"); // Lanza un error personalizado
    }
}

/**
 * Guarda un nuevo mensaje en el sistema.
 *
 * @param {object} data - Datos del mensaje que se va a guardar.
 * @returns {Promise<object>} - Devuelve los datos de respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const saveMessage = async (data) => {
    try {
        const response = await axiosInstance.post(`/saveMessage`, data);
        return response.data; // Devuelve los datos de respuesta del mensaje guardado
    } catch (error) {
        console.error("Error al agregar el mensaje:", error.message); // Loguea el error
        throw new Error("Error al agregar el mensaje"); // Lanza un error personalizado
    }
}

/**
 * Obtiene los mensajes en la bandeja de entrada del usuario.
 *
 * @param {string} id - El ID del usuario cuyo inbox se desea obtener.
 * @returns {Promise<object>} - Devuelve los mensajes de la bandeja de entrada.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getInbox = async (id) => {
    try {
        const response = await axiosInstance.get(`/getInbox/${id}`);
        console.log(response)
        return response; // Devuelve los mensajes en la bandeja de entrada
    } catch (error) {
        console.error("Error al obtener los mensajes de la bandeja de entrada:", error.message); // Loguea el error
        throw new Error("Error al obtener los mensajes de la bandeja de entrada"); // Lanza un error personalizado
    }
}

/**
 * Obtiene los mensajes en la bandeja de salida del usuario.
 *
 * @param {string} id - El ID del usuario cuyo outbox se desea obtener.
 * @returns {Promise<object>} - Devuelve los mensajes de la bandeja de salida.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getOutbox = async (id) => {
    try {
        const response = await axiosInstance.get(`/getOutbox/${id}`);
        return response; // Devuelve los mensajes en la bandeja de salida
    } catch (error) {
        console.error("Error al obtener los mensajes de la bandeja de salida:", error.message); // Loguea el error
        throw new Error("Error al obtener los mensajes de la bandeja de salida"); // Lanza un error personalizado
    }
}

/**
 * Marca un mensaje específico como leído.
 *
 * @param {string} id - El ID del mensaje que se desea marcar como leído.
 * @returns {Promise<object>} - Devuelve la respuesta del servidor.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const markMessageAsRead = async (id) => {
    try {
        const response = await axiosInstance.put(`/markMessageAsRead/${id}`);
        return response; // Devuelve la respuesta tras marcar el mensaje
    } catch (error) {
        console.error("Error al marcar el mensaje como leído:", error.message); // Loguea el error
        throw new Error("Error al marcar el mensaje como leído"); // Lanza un error personalizado
    }
}
