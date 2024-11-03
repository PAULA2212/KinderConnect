const promisePool = require('../../services/database'); // Importa la conexión a la base de datos

// Controlador para obtener eventos asociados a un niño específico
const getEventsForKid = async (req, res) => {
    // Obtiene el ID del niño desde los parámetros de la solicitud y lo convierte a entero
    const idNino = parseInt(req.params.idNino);

    // Validación para asegurar que el ID de niño es un número válido
    if (isNaN(idNino)) {
        // Si no es un número, se responde con un error 400 (Bad Request)
        return res.status(400).json({ error: 'ID de niño inválido' });
    }

    try {
        // Consulta a la base de datos para obtener eventos relacionados con el niño
        const [rows] = await promisePool.query(
            `SELECT e.*
             FROM eventos e
             INNER JOIN eventos_niños en ON e.id_evento = en.id_evento
             WHERE en.id_niño = ?`,
            [idNino] // El ID del niño se pasa como parámetro a la consulta
        );

        // Responde con los eventos encontrados
        res.status(200).json(rows);
    } catch (error) {
        // Manejo de errores: si ocurre un error durante la consulta
        console.error('Error al obtener los eventos del niño:', error);
        // Se responde con un error 500 (Internal Server Error)
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
};

module.exports = getEventsForKid; // Exporta el controlador para su uso en otras partes de la aplicación
