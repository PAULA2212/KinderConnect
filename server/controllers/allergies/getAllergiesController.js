// Importa el servicio de conexión a la base de datos
const promisePool = require('../../services/database');

// Controlador para obtener las alergias de un niño
const getAllergies = async (req, res) => {
    // Desestructuración del ID del niño a partir de los parámetros de la solicitud
    const { id } = req.params;

    try {
        // Ejecuta la consulta para obtener todas las alergias relacionadas con el niño específico
        const [rows] = await promisePool.query('SELECT * FROM alergias WHERE id_niño = ?', [id]);
        
        // Devuelve los resultados de la consulta con código 200 (OK)
        res.status(200).json(rows);
    } catch (error) {
        // Manejo de errores en caso de que la consulta falle
        console.error('Error en la consulta a la base de datos:', error);
        
        // Se devuelve un error 500 (Internal Server Error) con un mensaje descriptivo
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exporta el controlador para que pueda ser utilizado en otras partes de la aplicación
module.exports = getAllergies;
