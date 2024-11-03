const promisePool = require('../../services/database'); // Importamos el pool de conexiones a la base de datos para realizar consultas

// Controlador para obtener evaluaciones de un niño específico
const getAssessmentForKid = async (req, res) => {
    const { idKid } = req.params; // Extraemos el ID del niño de los parámetros de la solicitud

    // Log para verificar el ID recibido
    console.log('Recibiendo petición para obtener evaluaciones de niño con ID:', idKid);

    try {
        // Log antes de realizar la consulta a la base de datos
        console.log('Realizando consulta a la base de datos para obtener evaluaciones...');

        // Realizamos la consulta SQL para obtener las evaluaciones del niño, ordenadas por ID de evaluación en orden descendente
        const [rows] = await promisePool.query('SELECT * FROM evaluaciones WHERE id_niño = ? ORDER BY id_evaluacion DESC', [idKid]);

        // Log después de obtener resultados de la consulta
        console.log('Resultados obtenidos de la base de datos:', rows);

        // Devolvemos la lista de evaluaciones con un estado 200 OK
        res.status(200).json(rows);
    } catch (error) {
        // Log en caso de error en la consulta
        console.error('Error en la consulta a la base de datos:', error);
        
        // En caso de error, respondemos con un estado 500 y un mensaje genérico
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportamos el controlador para que pueda ser utilizado en otras partes de la aplicación
module.exports = getAssessmentForKid;
