const promisePool = require('../../services/database'); // Importa el pool de conexiones para la base de datos

/**
 * Obtiene los destinatarios potenciales de mensajes según el tipo especificado (progenitor o educador).
 *
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
 */
const getPotentialRecipients = async (req, res) => {
    const { id, type } = req.params; // Desestructuración del ID y tipo de destinatario de los parámetros de la solicitud
    let query; // Variable para almacenar la consulta SQL

    // Selecciona la consulta adecuada según el tipo de destinatario
    if (type === "progenitor") {
        query = `
            SELECT DISTINCT e.id_educador, e.nombre, e.apellido_1, e.apellido_2
            FROM educadores e
            JOIN educadores_niños en ON e.id_educador = en.id_educador
            JOIN progenitores_niños pn ON en.id_niño = pn.id_niño
            WHERE pn.id_progenitor = ?;
        `;
    } else if (type === "educador") {
        query = `
            SELECT DISTINCT p.id_progenitor, p.nombre, p.apellido_1, p.apellido_2
            FROM progenitores p
            JOIN progenitores_niños pn ON p.id_progenitor = pn.id_progenitor
            JOIN educadores_niños en ON pn.id_niño = en.id_niño
            WHERE en.id_educador = ?; 
        `;
    } else {
        // Si el tipo no es válido, se devuelve un error
        return res.status(400).json({ message: 'Tipo de destinatario inválido' });
    }

    try {
        // Ejecuta la consulta en la base de datos
        const [rows] = await promisePool.query(query, id); 
        res.status(200).json(rows); // Responde con los resultados encontrados
        console.log(rows); // Log para depuración de los resultados obtenidos
    } catch (error) {
        // Registro del error en la consola para facilitar la depuración
        console.error('Error al obtener los registros:', error);
        
        // Respuesta de error en caso de que ocurra un problema con la consulta
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exporta la función para su uso en otras partes de la aplicación
module.exports = getPotentialRecipients;
