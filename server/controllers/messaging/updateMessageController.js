const promisePool = require('../../services/database'); // Importa el pool de conexiones a la base de datos

/**
 * Actualiza el estado de un mensaje, marcándolo como leído.
 *
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
 */
const updateMessage = async (req, res) => {
    const { id } = req.params; // Desestructuración del ID del mensaje desde los parámetros de la solicitud

    try {
        // Ejecuta la consulta para actualizar el estado del mensaje
        const [result] = await promisePool.query('UPDATE mensajes SET leido = 1 WHERE id_mensaje = ?', [id]);

        // Verifica si se ha actualizado algún registro
        if (result.affectedRows === 0) {
            // Si no se actualizó ningún registro, significa que el mensaje no existe
            return res.status(404).json({ message: 'Mensaje no encontrado' });
        }

        // Responde con un mensaje de éxito si la actualización fue exitosa
        res.status(200).json({ message: 'Mensaje actualizado con éxito' });
    } catch (error) {
        // Log para el error que ocurre durante la operación
        console.error('Error al actualizar el mensaje:', error.message);
        
        // Respuesta de error en caso de que ocurra un problema con la actualización
        res.status(500).json({ message: 'Error al actualizar el mensaje', error: error.message });
    }
};

module.exports = updateMessage; // Exporta la función para su uso en otras partes de la aplicación
