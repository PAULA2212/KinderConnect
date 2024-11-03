const promisePool = require('../../services/database'); // Importa el pool de conexiones a la base de datos

/**
 * Obtiene los hitos de desarrollo para un niño específico.
 *
 * @param {Object} req - Objeto de solicitud que representa la solicitud HTTP.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const getMilestonesForKid = async (req, res) => {
    const { idKid } = req.params; // Extrae el ID del niño de los parámetros de la solicitud
    console.log('Received idKid:', idKid); // Añade un log para verificar el valor de idKid

    // Verifica si el idKid es un número válido
    if (isNaN(idKid)) {
        return res.status(400).json({ error: 'ID de niño inválido' }); // Responde con un error 400 si el ID es inválido
    }

    try {
        // Realiza la consulta a la base de datos para obtener los hitos del niño
        const [rows] = await promisePool.query('SELECT * FROM hitos_niños WHERE id_niño = ?', [idKid]);
        console.log('Milestones fetched:', rows); // Log para verificar los datos obtenidos

        // Responde con los hitos encontrados, establece el código de estado 200 OK
        res.status(200).json(rows);
    } catch (error) {
        // Captura y muestra el error en la consola para facilitar la depuración
        console.error('Error fetching milestones for kid:', error);

        // Responde con un código de estado 500 en caso de error interno del servidor
        res.status(500).json({ error: 'Error fetching milestones for kid' });
    }
};

module.exports = getMilestonesForKid; // Exporta la función para su uso en otras partes de la aplicación
