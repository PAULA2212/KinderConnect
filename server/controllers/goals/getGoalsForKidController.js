const promisePool = require('../../services/database');

/**
 * Handler para obtener los objetivos de un niño específico.
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta del servidor.
 */
const getGoalsForKid = async (req, res) => {
    // Se extrae el ID del niño de los parámetros de la solicitud
    const { idKid } = req.params;
    console.log('ID del niño recibido:', idKid);

    // Validación para asegurarse de que el ID del niño es un número
    if (isNaN(idKid)) {
        console.error('ID de niño inválido:', idKid);
        return res.status(400).json({ error: 'ID de niño inválido' });
    }

    try {
        console.log('Iniciando la consulta a la base de datos...');
        
        // Consulta a la base de datos para obtener los objetivos del niño
        const [rows] = await promisePool.query('SELECT * FROM objetivos WHERE id_niño = ?', [idKid]);

        console.log('Consulta exitosa. Filas obtenidas:', rows.length);

        // Manejo de la respuesta si no se encuentran objetivos
        if (rows.length === 0) {
            console.warn('No se encontraron objetivos para el ID de niño:', idKid);
            return res.status(404).json({ message: 'No se encontraron objetivos para el niño' });
        }

        // Envío de la respuesta con los objetivos encontrados
        res.status(200).json(rows);
    } catch (error) {
        // Manejo de errores en caso de que falle la consulta
        console.error('Error al obtener los objetivos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = getGoalsForKid;
