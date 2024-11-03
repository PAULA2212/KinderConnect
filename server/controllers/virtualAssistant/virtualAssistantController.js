const { CohereClientV2 } = require('cohere-ai'); // Importa el cliente de Cohere AI

// Inicializar el cliente con tu API Key
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY, // Usa tu variable de entorno para la clave API
});

/**
 * Controlador para manejar las solicitudes al asistente virtual.
 * Este controlador recibe un mensaje del usuario, lo envía a la API de Cohere
 * y devuelve la respuesta generada por el asistente.
 *
 * @param {Object} req - Objeto de solicitud HTTP que contiene el mensaje del usuario.
 * @param {Object} res - Objeto de respuesta HTTP para enviar la respuesta del asistente al cliente.
 */
const virtualAssistant = async (req, res) => {
    const userMessage = req.body.message; // Extrae el mensaje del usuario del cuerpo de la solicitud

    try {
        // Llama a la API de Cohere para generar una respuesta al mensaje del usuario
        const response = await cohere.chat({
            model: 'command-r-plus', // Especifica el modelo a utilizar
            messages: [
                {
                    role: 'user', // Define el rol del mensaje como 'user'
                    content: userMessage, // Contenido del mensaje del usuario
                },
            ],
        });

        // Extrae la respuesta generada por el asistente; proporciona un mensaje por defecto si no se genera respuesta
        const assistantReply = response?.message?.content[0]?.text || 'Lo siento, no pude generar una respuesta.';
        res.json({ reply: assistantReply }); // Envía la respuesta al cliente en formato JSON

    } catch (error) {
        console.error('Error en la solicitud a Cohere:', error); // Log de error si ocurre un problema con la API
        res.status(500).json({ error: 'Error al comunicarse con la API de Cohere' }); // Respuesta de error al cliente
    }
};

module.exports = virtualAssistant; // Exporta la función para su uso en otras partes de la aplicación
