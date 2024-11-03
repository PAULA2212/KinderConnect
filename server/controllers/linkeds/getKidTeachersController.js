const promisePool = require('../../services/database'); // Importa el pool de conexiones para realizar consultas a la base de datos

/**
 * Obtiene los niños vinculados a un educador específico.
 *
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const getKidTeachers = async (req, res) => {
    const idEducador = parseInt(req.params.idEducador); // Extrae y convierte el ID del educador a un número

    // Validar que el idEducador sea un número
    if (isNaN(idEducador)) {
        return res.status(400).json({ error: 'ID de educador inválido' }); // Respuesta de error si el ID no es válido
    }

    try {
        // Consulta SQL para obtener los niños vinculados al educador especificado
        const [rows] = await promisePool.query(
            `SELECT n.id_niño, n.nombre, n.apellido_1, n.apellido_2, n.fecha_nac, n.centro_educativo
             FROM niños n
             INNER JOIN educadores_niños en ON n.id_niño = en.id_niño
             WHERE en.id_educador = ?`,
            [idEducador] // Se pasa el ID del educador como parámetro
        );

        // Devolver los resultados en formato JSON con estado 200 (OK)
        res.status(200).json({ kids: rows });
    } catch (error) {
        // Manejo de errores al realizar la consulta
        console.error('Error al obtener los niños:', error);
        // Respuesta de error en caso de fallo en la consulta
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

// Exporta la función para su uso en otras partes de la aplicación
module.exports = getKidTeachers;
