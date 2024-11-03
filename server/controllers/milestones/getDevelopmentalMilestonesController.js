const promisePool = require('../../services/database'); // Importa el pool de conexiones a la base de datos

/**
 * Obtiene todos los hitos de desarrollo desde la base de datos.
 *
 * @param {Object} req - Objeto de solicitud que representa la solicitud HTTP.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const getDevelopmentalMilestones = async (req, res) => {
    try {
        // Ejecuta la consulta para seleccionar todos los hitos de desarrollo,
        // ordenándolos por la edad esperada
        const [rows] = await promisePool.query('SELECT * FROM hitos_desarrollo ORDER BY edad_esperada');

        // Envía la respuesta JSON con los hitos de desarrollo
        res.status(200).json(rows); // Establece el código de estado 200 OK para la respuesta
    } catch (error) {
        // Registra el error en la consola para la depuración
        console.error('Error al recuperar los hitos de desarrollo:', error);

        // Responde con un código de estado 500 en caso de error interno del servidor
        res.status(500).json({ message: 'Error retrieving milestones' });
    }
};

module.exports = getDevelopmentalMilestones; // Exporta la función para su uso en otras partes de la aplicación
