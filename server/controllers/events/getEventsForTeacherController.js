const promisePool = require('../../services/database'); // Importa el módulo que maneja la conexión a la base de datos

// Controlador para obtener eventos asociados a un educador específico
const getEventsForTeacher = async (req, res) => {
    // Obtiene el ID del educador desde los parámetros de la solicitud
    const { id_educador } = req.params;

    try {
        // Log para indicar que se inicia la búsqueda de eventos para el educador
        console.log(`Buscando eventos para el educador con ID: ${id_educador}`);

        // Consulta a la base de datos para obtener eventos del educador especificado
        const [events] = await promisePool.query(
            `SELECT * FROM eventos WHERE id_educador = ?`, // Consulta SQL para seleccionar eventos por ID de educador
            [id_educador] // Se pasa el ID del educador como parámetro
        );

        // Log de los eventos encontrados
        console.log('Eventos encontrados:', events);

        // Responde con un código de estado 200 y los eventos encontrados en formato JSON
        res.status(200).json(events);
    } catch (error) {
        // Manejo de errores: si ocurre un error durante la consulta
        console.error('Error al obtener los eventos del educador:', error);
        // Se responde con un error 500 (Internal Server Error)
        res.status(500).json({ error: 'Error al obtener los eventos del educador' });
    }
};

module.exports = getEventsForTeacher; // Exporta el controlador para su uso en otras partes de la aplicación
