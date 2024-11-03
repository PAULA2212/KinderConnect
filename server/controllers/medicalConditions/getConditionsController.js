const promisePool = require('../../services/database'); // Importa el pool de conexiones para realizar consultas a la base de datos

/**
 * Obtiene las condiciones médicas de un niño específico.
 *
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const getConditions = async (req, res) => {
    // Desestructuración del parámetro 'id' de la solicitud
    const { id } = req.params;

    try {
        // Realiza una consulta a la base de datos para obtener las condiciones médicas del niño
        const [rows] = await promisePool.query('SELECT * FROM condiciones_medicas WHERE id_niño = ?', [id]);

        // Envía la respuesta exitosa con las condiciones médicas encontradas
        res.status(200).json(rows);
    } catch (error) {
        // Registro del error en la consola para fines de depuración
        console.error('Error en la consulta a la base de datos:', error);

        // Respuesta de error en caso de que ocurra un problema con la consulta
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exporta la función para su uso en otras partes de la aplicación
module.exports = getConditions;
