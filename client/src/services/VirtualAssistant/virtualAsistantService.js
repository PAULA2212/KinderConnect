// src/services/chatService.js
import axiosInstance from "../../utils/axiosInstance";

// Función para enviar un mensaje al asistente
export const sendMessageToAssistant = async (userMessage) => {
    try {
        // Usar axiosInstance para hacer la solicitud POST al back-end
        const response = await axiosInstance.post('/virtualAssistant', {
            message: userMessage,
        });

        // Devuelve la respuesta del asistente
        return response.data.reply;
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw new Error('No se pudo comunicar con el asistente.');
    }
};