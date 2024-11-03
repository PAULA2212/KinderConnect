import axiosInstance from "../utils/axiosInstance";

/**
 * Envía un mensaje al asistente virtual y obtiene la respuesta.
 *
 * @param {string} userMessage - El mensaje que el usuario desea enviar al asistente.
 * @returns {Promise<string>} - Devuelve la respuesta del asistente.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const sendMessageToAssistant = async (userMessage) => {
    try {
        // Hacer la solicitud POST al backend utilizando axiosInstance
        const response = await axiosInstance.post('/virtualAssistant', {
            message: userMessage,
        });

        // Devuelve la respuesta del asistente
        return response.data.reply;
    } catch (error) {
        console.error('Error al enviar el mensaje al asistente:', error.message); // Registra el error en la consola
        throw new Error('No se pudo comunicar con el asistente.'); // Lanza un error personalizado
    }
};
