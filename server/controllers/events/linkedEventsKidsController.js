const promisePool = require('../../services/database');

const linkedEventsKids = async (req, res) => {
    const { id_evento, id_niño } = req.body;

    try {
        await promisePool.query(
            `INSERT INTO eventos_niños (id_evento, id_niño)
             VALUES (?, ?)`,
            [id_evento, id_niño]
        );

        res.status(201).json({ message: 'Niño vinculado al evento con éxito' });
    } catch (error) {
        console.error('Error al vincular niño al evento:', error);
        res.status(500).json({ error: 'Error al vincular niño al evento' });
    }
};

module.exports = linkedEventsKids