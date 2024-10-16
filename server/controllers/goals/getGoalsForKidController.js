const promisePool = require('../../services/database')

const getGoalsForKid = async (req, res) => {
    const {idKid} = req.params // Asegúrate de que 'idKid' esté en 'req.body'
    console.log('ID del niño recibido:', idKid);

    try {
        console.log('Iniciando la consulta a la base de datos...');
        const [rows] = await promisePool.query('SELECT * FROM objetivos WHERE id_niño = ?', [idKid]);

        console.log('Consulta exitosa. Filas obtenidas:', rows.length);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los objetivos:', error);
        res.status(500).json({ 'Error interno del servidor': error.message });
    }
}

module.exports = getGoalsForKid;