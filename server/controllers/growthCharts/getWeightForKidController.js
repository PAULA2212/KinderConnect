const promisePool = require('../../services/database')

const getWeight = async (req, res) => {
    const {idKid} = req.params

    try{
        const [rows] = await promisePool.query('SELECT * FROM crecimiento_peso WHERE id_niño = ?', [idKid])
        res.status(200).json(rows)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los valores de peso' });
    }
}

module.exports = getWeight