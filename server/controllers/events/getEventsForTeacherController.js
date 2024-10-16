const promisePool = require('../../services/database');

const getEventsForTeacher = async (req, res) => {
    const { id_educador } = req.params;

    try {
        console.log(`Buscando eventos para el educador con ID: ${id_educador}`);

        const [events] = await promisePool.query(
            `SELECT * FROM eventos WHERE id_educador = ?`,
            [id_educador]
        );

        console.log('Eventos encontrados:', events);

        res.json(events);
    } catch (error) {
        console.error('Error al obtener los eventos del educador:', error);
        res.status(500).json({ error: 'Error al obtener los eventos del educador' });
    }
};

module.exports = getEventsForTeacher