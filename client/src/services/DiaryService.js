import axiosInstance from "../utils/axiosInstance"; // Importa la instancia de Axios configurada

/**
 * Agrega una entrada al diario para progenitores.
 * 
 * @param {object} data - Objeto que contiene los datos de la entrada del diario.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los detalles de la entrada agregada.
 * @throws {Error} - Lanza un error si la solicitud para agregar la entrada falla.
 */
export const addDiaryEntry = async (data) => {
    try {
        // Realiza una solicitud POST para agregar una entrada al diario de progenitores
        const response = await axiosInstance.post('/diario_progenitores/insertar', data);
        return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error('Error add entry diary:', error); // Log del error
        throw new Error("Error add entry diary"); // Lanza el error para manejo en el componente
    }
};

/**
 * Obtiene los datos del diario destinado a los progenitores de un niño específico.
 * 
 * @param {number} kidId - ID único del niño para el cual se solicitan los datos del diario.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con las entradas del diario para progenitores.
 * @throws {Error} - Lanza un error si la solicitud para obtener los datos falla.
 */
export const fetchDiaryForParentsData = async (kidId) => {
    try {
        // Realiza una solicitud GET para obtener las entradas del diario para progenitores
        const response = await axiosInstance.get(`/diario_para_progenitores/${kidId}`);
        console.log('Se han obtenido los siguientes datos fetch:', response.data); // Log de los datos obtenidos
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos del diario para padres:', error.message); // Log del error
        throw error; // Lanza el error para manejo en el componente
    }
};

/**
 * Obtiene los datos del diario destinado a los educadores sobre un niño específico.
 * 
 * @param {number} kidId - ID único del niño para el cual se solicitan los datos del diario.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con las entradas del diario para educadores.
 * @throws {Error} - Lanza un error si la solicitud para obtener los datos falla.
 */
export const fetchDiaryParentsData = async (kidId) => {
    try {
        // Realiza una solicitud GET para obtener las entradas del diario para educadores
        const response = await axiosInstance.get(`/diario_para_educadores/${kidId}`);
        console.log('Se han obtenido los siguientes datos fetch:', response.data); // Log de los datos obtenidos
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos del diario del niño:', error.message); // Log del error
        throw error; // Lanza el error para manejo en el componente
    }
};

/**
 * Guarda una entrada en el diario para educadores.
 * 
 * @param {object} data - Objeto que contiene los datos de la entrada del diario a guardar.
 * @returns {Promise<object>} - Devuelve la respuesta de la API con los detalles de la entrada guardada.
 * @throws {Error} - Lanza un error si la solicitud para guardar la entrada falla.
 */
export const saveDiaryEntry = async (data) => {
    try {
        // Realiza una solicitud POST para guardar una entrada en el diario de educadores
        const response = await axiosInstance.post('/diario_educadores/insertar', data);
        return response.data;
    } catch (error) {
        console.error('Error al guardar los datos:', error.message); // Log del error
        throw error; // Lanza el error para manejo en el componente
    }
};
