const promisePool = require('../../services/database');

const getAssessmentForKid = async (req, res) => {
    const { idKid } = req.params;

    // Log para verificar el parámetro recibido
    console.log('Recibiendo petición para obtener evaluaciones de niño con ID:', idKid);

    try {
        // Log antes de realizar la consulta a la base de datos
        console.log('Realizando consulta a la base de datos para obtener evaluaciones...');

        const [rows] = await promisePool.query('SELECT * FROM evaluaciones WHERE id_niño = ? ORDER BY id_evaluacion DESC', [idKid]);

        // Log después de obtener resultados de la consulta
        console.log('Resultados obtenidos de la base de datos:', rows);

        res.status(200).json(rows);
    } catch (error) {
        // Log en caso de error en la consulta
        console.error('Error en la consulta a la base de datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getAssessmentForKid;
