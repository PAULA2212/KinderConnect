const promisePool = require('../../services/database'); // Importa el pool de conexiones para realizar consultas a la base de datos

/**
 * Agrega un nuevo mensaje a la base de datos.
 *
 * @param {Object} req - Objeto de solicitud que contiene los datos del mensaje.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
 */
const addMessage = async (req, res) => {
    // Desestructuración de los datos del cuerpo de la solicitud
    const { recipient, sender, subject, message } = req.body;
    console.log(recipient, sender, subject, message); // Log de los datos recibidos para depuración

    try {
        // Inserta el nuevo mensaje en la tabla 'mensajes'
        await promisePool.query(
            'INSERT INTO mensajes (id_emisor, id_receptor, contenido, asunto) VALUES (?, ?, ?, ?)',
            [sender, recipient, message, subject]
        );

        // Envía una respuesta exitosa al cliente
        res.status(201).json({ message: 'Mensaje agregado con éxito' });
    } catch (error) {
        // Registro del error en la consola para fines de depuración
        console.error('Error al insertar el mensaje:', error.message);

        // Respuesta de error en caso de que ocurra un problema con la inserción
        res.status(500).json({ message: 'Error al agregar el mensaje', error: error.message });
    }
};

// Exporta la función para su uso en otras partes de la aplicación
module.exports = addMessage;
