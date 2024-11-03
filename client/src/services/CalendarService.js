import axiosInstance from "../utils/axiosInstance"; // Importa la instancia configurada de Axios

/**
 * Obtiene los eventos asociados a un niño específico.
 * 
 * @param {number} id - ID único del niño para el que se solicitan los eventos.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los detalles de los eventos del niño.
 * @throws {Error} - Lanza un error si la solicitud para obtener los eventos falla.
 */
export const getEventsForKid = async (id) => {
    try {
        // Realiza la solicitud GET para obtener eventos relacionados con el niño con el ID dado
        const response = await axiosInstance.get(`/eventos_nino/${id}`);
        return response; // Devuelve la respuesta completa
    } catch (error) {
        console.error("Error get events for kid:", error.message); // Log del error
        throw new Error("Error get events for kid"); // Lanza el error para manejo en el componente
    }
};

/**
 * Obtiene los eventos asociados a un educador específico.
 * 
 * @param {number} id - ID único del educador para el que se solicitan los eventos.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los detalles de los eventos del educador.
 * @throws {Error} - Lanza un error si la solicitud para obtener los eventos falla.
 */
export const getEventsForTeacher = async (id) => {
    try {
        // Realiza la solicitud GET para obtener eventos relacionados con el educador con el ID dado
        const response = await axiosInstance.get(`/eventos_educador/${id}`);
        return response;
    } catch (error) {
        console.error("Error get events for teacher:", error.message); // Log del error
        throw new Error("Error get events for teacher"); // Lanza el error para manejo en el componente
    }
};

/**
 * Agrega un nuevo evento al sistema.
 * 
 * @param {object} eventToAdd - Objeto con los detalles del evento a agregar.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los detalles del evento agregado.
 * @throws {Error} - Lanza un error si la solicitud para agregar el evento falla.
 */
export const addEvent = async (eventToAdd) => {
    try {
        // Realiza la solicitud POST para agregar un nuevo evento
        const response = await axiosInstance.post('/events', eventToAdd);
        return response;
    } catch (error) {
        console.error("Error add event:", error.message); // Log del error
        throw new Error("Error add event"); // Lanza el error para manejo en el componente
    }
};

/**
 * Asocia un evento específico a uno o más niños.
 * 
 * @param {number} id_evento - ID del evento a asociar.
 * @param {number} id_niño - ID del niño al que se asociará el evento.
 * @returns {Promise<object>} - Devuelve la respuesta de la API tras asociar el evento.
 * @throws {Error} - Lanza un error si la solicitud para asociar el evento falla.
 */
export const addEventForKids = async (id_evento, id_niño) => {
    try {
        // Realiza la solicitud POST para asociar un evento con el niño indicado
        const response = await axiosInstance.post('/eventos_nino', { id_evento, id_niño });
        return response;
    } catch (error) {
        console.error("Error add event for kids:", error.message); // Log del error
        throw new Error("Error add event for kids"); // Lanza el error para manejo en el componente
    }
};

/**
 * Obtiene la lista de niños asociados a un educador específico.
 * 
 * @param {number} id - ID único del educador.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los detalles de los niños asociados al educador.
 * @throws {Error} - Lanza un error si la solicitud para obtener los niños falla.
 */
export const getKidsForTeacher = async (id) => {
    try {
        // Realiza la solicitud GET para obtener los niños relacionados con el educador
        const response = await axiosInstance.get(`/ninos_educadores/${id}`);
        return response;
    } catch (error) {
        console.error("Error get kids for teacher:", error.message); // Log del error
        throw new Error("Error get kids for teacher"); // Lanza el error para manejo en el componente
    }
};
