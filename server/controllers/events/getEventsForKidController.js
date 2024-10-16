const promisePool = require('../../services/database');

const getEventsForKid = async (req, res) => {
    const idNino = parseInt(req.params.idNino);

    if (isNaN(idNino)) {
        return res.status(400).json({ error: 'ID de niño inválido' });
    }

    try {
        const [rows] = await promisePool.query(
            `SELECT e.*
             FROM eventos e
             INNER JOIN eventos_niños en ON e.id_evento = en.id_evento
             WHERE en.id_niño = ?`,
            [idNino]
        );

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los eventos del niño:', error);
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
};

module.exports = getEventsForKid