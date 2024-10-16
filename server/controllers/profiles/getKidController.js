const promisePool = require('../../services/database');

const getKid = async (req, res) => {
    const idKid = parseInt(req.params.kidId);

    if(isNaN(idKid)){
        return res.status(400).json({error: 'Id niño invalido'});
    }

    try{
        const [rows] = await promisePool.query(`SELECT * FROM niños WHERE id_niño = ?`, [idKid])
        res.json(rows[0])
    }catch (error) {
        console.error('Error al obtener los niños:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

module.exports = getKid