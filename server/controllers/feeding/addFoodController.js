const promisePool = require('../../services/database');


const addFood = async (req, res) => {

    const {idKid, food} = req.body;

    try{
        await promisePool.query('INSERT INTO alimentos (id_niño, alimento) VALUES (?,?)',[idKid, food])
        res.status(201).json({ message: 'Alimento agregada con éxito' })
    }catch (error){
        console.error('Error al insertar el alimento:', error.message);

        // Respuesta de error
        res.status(500).json({ message: 'Error al agregar la condicion', error: error.message });
    }
}
module.exports = addFood