const promisePool = require('../../services/database'); // Importa el pool de conexiones para realizar consultas a la base de datos

/**
 * Obtiene los registros de peso para un niño específico.
 *
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const getWeight = async (req, res) => {
    const { idKid } = req.params; // Obtiene el ID del niño de los parámetros de la solicitud

    try {
        // Ejecuta la consulta para obtener los registros de peso de la base de datos
        const [rows] = await promisePool.query('SELECT * FROM crecimiento_peso WHERE id_niño = ?', [idKid]);
        
        // Envía los registros de peso como respuesta en formato JSON
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los valores de peso:', error); // Log del error en caso de fallo
        res.status(500).json({ message: 'Error al obtener los valores de peso' }); // Respuesta de error en caso de fallo en la consulta
    }
};

module.exports = getWeight; // Exporta la función para su uso en otras partes de la aplicación
