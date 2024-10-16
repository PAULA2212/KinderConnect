const promisePool = require('../../services/database')

const getAllergies = async (req, res) => {
    const {id} = req.params

    try{
        const [rows] = await promisePool.query('SELECT * FROM alergias WHERE id_niño = ?', [id])
        res.status(200).json(rows)
    }catch (error){
        console.error('Error en la consulta a la base de datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = getAllergies