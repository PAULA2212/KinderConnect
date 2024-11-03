const promisePool = require('../../services/database'); // Importa el pool de conexiones para la base de datos

/**
 * Obtiene los mensajes de la bandeja de entrada del receptor especificado.
 *
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
 */
const getInbox = async (req, res) => {
    const { id } = req.params; // Desestructuración del ID del receptor de los parámetros de la solicitud

    try {
        // Realiza la consulta para obtener los mensajes donde el receptor es el ID proporcionado, ordenados por fecha y hora de manera descendente
        const [rows] = await promisePool.query("SELECT * FROM mensajes WHERE id_receptor = ? ORDER BY fecha_hora DESC", id);
        
        // Envía la lista de mensajes como respuesta con el estado 200
        res.status(200).json(rows);
        console.log(rows); // Log para depuración de los resultados obtenidos
    } catch (error) {
        // Registro del error en la consola para facilitar la depuración
        console.error('Error al obtener los registros:', error);
        
        // Respuesta de error en caso de que ocurra un problema con la consulta
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exporta la función para su uso en otras partes de la aplicación
module.exports = getInbox;