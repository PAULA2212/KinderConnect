const promisePool = require('../../services/database')

const getMilestonesForKid = async (req, res) => {
    const { idKid } = req.params;
    console.log('Received idKid:', idKid); // Añadir log para verificar el valor de idKid
    if (isNaN(idKid)) {
        return res.status(400).json({ error: 'ID de niño inválido' });
    }

    try {
        const [rows] = await promisePool.query('SELECT * FROM hitos_niños WHERE id_niño = ?', [idKid]);
        console.log('Milestones fetched:', rows); // Añadir log para verificar los datos obtenidos
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching milestones for kid' });
    }
};
module.exports = getMilestonesForKid