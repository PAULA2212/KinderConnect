const promisePool = require('../../services/database');

const center = async (req, res) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM centros_educativos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los centros educativos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = center