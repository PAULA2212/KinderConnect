const promisePool = require('../../services/database'); // Importa la conexión a la base de datos

// Controlador para obtener el diario de educadores para un niño específico
const getDiaryForParents = async (req, res) => {
    const { idKid } = req.params; // Obtiene el ID del niño de los parámetros de la solicitud
    console.log(`[INFO] Solicitud recibida para obtener datos del diario de educadores para el ID de niño: ${idKid}`);

    try {
        // Inicia la consulta a la base de datos
        console.log('[INFO] Iniciando consulta a la base de datos...');
        const [rows] = await promisePool.query(
            'SELECT * FROM diario_educadores WHERE id_niño = ? ORDER BY fecha DESC', // Consulta para obtener los datos del diario del niño
            [idKid] // Parámetro de la consulta
        );
        console.log('[INFO] Consulta a la base de datos completada.');

        // Verifica si se encontraron resultados
        if (rows.length === 0) {
            console.log(`[WARN] No se encontraron datos para el ID de niño: ${idKid}`);
            // Si no se encuentran resultados, devuelve un estado 404 (Not Found)
            return res.status(404).json({ message: 'No se encontraron datos para el ID proporcionado' }); // 404: No se encontraron registros
        }

        console.log(`[INFO] Se encontraron ${rows.length} registros para el ID de niño: ${idKid}`);
        
        // Enviar los datos como respuesta con estado 200 (OK)
        console.log('[INFO] Enviando respuesta con los datos obtenidos.');
        res.status(200).json(rows); // 200: La solicitud fue exitosa y se devuelven los datos
    } catch (error) {
        // Manejo de errores en caso de que la consulta falle
        console.error('[ERROR] Error al obtener los datos del diario:', error);
        // Devuelve un estado 500 (Internal Server Error) si hay un problema en el servidor
        res.status(500).json({ message: 'Error interno del servidor' }); // 500: Error inesperado en el servidor
    }
};

module.exports = getDiaryForParents; // Exporta el controlador para su uso en otras partes de la aplicación
