const promisePool = require('../../services/database'); // Importa el pool de conexiones para realizar consultas a la base de datos

/**
 * Elimina un registro de peso específico.
 * 
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const deleteWeight = async (req, res) => {
    const { id } = req.params; // Obtiene el ID del registro de peso a eliminar de los parámetros de la solicitud

    try {
        // Ejecuta la consulta para eliminar el registro de peso de la base de datos
        await promisePool.query('DELETE FROM crecimiento_peso WHERE id_registro = ?', [id]);
        
        // Respuesta exitosa sin contenido, indicando que el registro se eliminó correctamente
        res.status(204).send(); 
    } catch (error) {
        console.error('Error al eliminar el peso:', error); // Log de error en caso de fallo
        res.status(500).json({ message: 'Error al eliminar el peso' }); // Respuesta de error en caso de fallo en la consulta
    }
};

module.exports = deleteWeight; // Exporta la función para su uso en otras partes de la aplicación
