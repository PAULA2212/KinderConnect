const promisePool = require('../../services/database'); // Importa el pool de conexiones a la base de datos

/**
 * Obtiene los datos de un niño específico por su ID.
 *
 * @param {Object} req - Objeto de solicitud que representa la solicitud HTTP.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const getKid = async (req, res) => {
    const idKid = parseInt(req.params.kidId); // Convierte el ID de niño a un número entero

    // Verifica si el ID es un número válido
    if (isNaN(idKid)) {
        return res.status(400).json({ error: 'ID de niño inválido' }); // Responde con error 400 si el ID no es válido
    }

    try {
        // Realiza la consulta a la base de datos para obtener los datos del niño
        const [rows] = await promisePool.query(`SELECT * FROM niños WHERE id_niño = ?`, [idKid]);

        // Verifica si se encontró un niño con el ID proporcionado
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No se encontró ningún niño con el ID proporcionado' }); // Responde con error 404 si no se encuentra
        }

        // Responde con los datos del niño encontrado
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener los datos del niño:', error); // Log del error en la consola
        res.status(500).json({ error: 'Error interno del servidor' }); // Responde con error 500 para problemas de servidor
    }
};

module.exports = getKid; // Exporta la función para su uso en otras partes de la aplicación
