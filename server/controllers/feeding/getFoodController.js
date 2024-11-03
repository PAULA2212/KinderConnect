const promisePool = require('../../services/database'); // Importa el módulo de conexión a la base de datos

// Controlador para obtener los alimentos de un niño específico
const getFoods = async (req, res) => {
    // Extrae el ID del niño de los parámetros de la solicitud
    const { id } = req.params;

    try {
        // Realiza la consulta a la base de datos para obtener los alimentos del niño especificado
        const [rows] = await promisePool.query('SELECT * FROM alimentos WHERE id_niño = ?', [id]);

        // Responde con un código de estado 200 y los alimentos encontrados
        res.status(200).json(rows);
    } catch (error) {
        // Registra el error en la consola para fines de depuración
        console.error('Error en la consulta a la base de datos:', error);

        // Responde con un código de estado 500 y un mensaje de error
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getFoods; // Exporta el controlador para su uso en otras partes de la aplicación
