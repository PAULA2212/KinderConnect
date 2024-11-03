import axiosInstance from "../utils/axiosInstance";

/**
 * Vincula un niño con un progenitor o un educador, dependiendo del tipo especificado.
 * 
 * @param {string} type - Tipo de vinculación ("progenitor" o "educador").
 * @param {object} data - Datos necesarios para la vinculación.
 * @returns {Promise<object>} - Devuelve los datos de la respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const linkingKid = async (type, data) => {
    const apiURL = type === "progenitor" ? '/linkednino_progenitor' : '/linkednino_educador';
    try {
        console.log("Datos a vincular:", data);
        const response = await axiosInstance.post(apiURL, data);
        return response.data;
    } catch (error) {
        console.error("Error al vincular niño:", error.message);
        throw new Error("Error al vincular niño");
    }
};

/**
 * Agrega un nuevo perfil de niño.
 * 
 * @param {object} data - Datos del perfil del niño.
 * @returns {Promise<object>} - Devuelve los datos de la respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const addKidProfile = async (data) => {
    try {
        const response = await axiosInstance.post('/addProfileKid', data);
        return response.data;
    } catch (error) {
        console.error("Error al agregar perfil de niño:", error.message);
        throw new Error("Error al agregar perfil de niño");
    }
};

/**
 * Actualiza un perfil de niño existente.
 * 
 * @param {number} id - ID del perfil del niño a actualizar.
 * @param {object} data - Datos actualizados del perfil del niño.
 * @returns {Promise<object>} - Devuelve los datos de la respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const updateKidProfile = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/updateProfileKid/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar perfil de niño:", error.message);
        throw new Error("Error al actualizar perfil de niño");
    }
};

/**
 * Obtiene una lista de centros disponibles.
 * 
 * @returns {Promise<object>} - Devuelve los datos de la respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getCentros = async () => {
    try {
        const response = await axiosInstance.get('/centros');
        return response;
    } catch (error) {
        console.error("Error al obtener centros:", error.message);
        throw new Error("Error al obtener centros");
    }
};

/**
 * Obtiene una lista de niños asociados a un progenitor.
 * 
 * @param {number} id - ID del progenitor.
 * @returns {Promise<object>} - Devuelve los datos de la respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getKidsForParents = async (id) => {
    try {
        const response = await axiosInstance.get(`/ninos_padres/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener niños para padres:", error.message);
        throw new Error("Error al obtener niños para padres");
    }
};

/**
 * Obtiene una lista de niños asociados a un educador.
 * 
 * @param {number} id - ID del educador.
 * @returns {Promise<object>} - Devuelve los datos de la respuesta si la solicitud es exitosa.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getKidsForTeachers = async (id) => {
    try {
        const response = await axiosInstance.get(`/ninos_educadores/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener niños para educadores:", error.message);
        throw new Error("Error al obtener niños para educadores");
    }
};
