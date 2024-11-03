const promisePool = require('../../services/database'); // Importa el pool de conexiones para ejecutar consultas a la base de datos

/**
 * Elimina un registro de altura específico.
 * 
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const deleteHeight = async (req, res) => {
    const { id } = req.params; // Obtiene el ID del registro de altura a eliminar de los parámetros de la solicitud
    console.log('Intentando borrar el registro:', id); // Log de información para seguimiento

    try {
        // Ejecuta la consulta para eliminar el registro de altura de la base de datos
        await promisePool.query('DELETE FROM crecimiento_altura WHERE id_registro = ?', [id]);
        
        // Respuesta exitosa sin contenido, indicando que el registro se eliminó correctamente
        res.status(204).send(); 
    } catch (error) {
        console.error('Error al eliminar la altura:', error); // Log de error en caso de fallo
        res.status(500).json({ message: 'Error al eliminar la altura' }); // Respuesta de error en caso de fallo en la consulta
    }
};

module.exports = deleteHeight; // Exporta la función para su uso en otras partes de la aplicación
