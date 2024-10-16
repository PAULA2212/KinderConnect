const promisePool = require('../../services/database')

const getHeight = async (req, res) => {
    const {idKid} = req.params

    try{
        const [rows] = await promisePool.query('SELECT * FROM crecimiento_altura WHERE id_niño = ?', [idKid])
        res.status(200).json(rows)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los valores de altura' });
    }
}

module.exports = getHeight