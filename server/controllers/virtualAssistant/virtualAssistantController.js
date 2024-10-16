const { CohereClientV2 } = require('cohere-ai');

// Inicializar el cliente con tu API Key
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY, // Usa tu variable de entorno para la clave API
});

const virtualAssistant = async (req, res) => {
    const userMessage = req.body.message;
  
    try {
      const response = await cohere.chat({
        model: 'command-r-plus',
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      });
  
      const assistantReply = response?.message?.content[0]?.text || 'Lo siento, no pude generar una respuesta.';
      res.json({ reply: assistantReply });
  
    } catch (error) {
      console.error('Error en la solicitud a Cohere:', error);
      res.status(500).json({ error: 'Error al comunicarse con la API de Cohere' });
    }
  };

module.exports = virtualAssistant;
