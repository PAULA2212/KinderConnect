const promisePool = require('../../services/database')

const getDiaryForParents = async (req, res) => {
    const { idKid } = req.params;
    console.log(`[INFO] Solicitud recibida para obtener datos del diario de educadores para el ID de niño: ${idKid}`);

    try {
        // Consulta a la base de datos para obtener los datos del niño
        console.log('[INFO] Iniciando consulta a la base de datos...');
        const [rows] = await promisePool.query(
            'SELECT * FROM diario_educadores WHERE id_niño = ? ORDER BY fecha DESC',
            [idKid]
        );
        console.log('[INFO] Consulta a la base de datos completada.');

        // Verificar si se encontraron resultados
        if (rows.length === 0) {
            console.log(`[WARN] No se encontraron datos para el ID de niño: ${idKid}`);
            return res.status(404).json({ message: 'No se encontraron datos para el ID proporcionado' });
        }

        console.log(`[INFO] Se encontraron ${rows.length} registros para el ID de niño: ${idKid}`);
        
        // Enviar los datos como respuesta
        console.log('[INFO] Enviando respuesta con los datos obtenidos.');
        res.json(rows);
    } catch (error) {
        console.error('[ERROR] Error al obtener los datos del diario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getDiaryForParents