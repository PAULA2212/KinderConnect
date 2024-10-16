const promisePool = require('../../services/database')


const addCondition = async (req, res) => {
    const {kidId, title, details} = req.body;

    try{
        await promisePool.query('INSERT INTO condiciones_medicas (id_niño,titulo, descripcion) VALUES (?,?,?)',[kidId, title, details])
        res.status(201).json({ message: 'Condicion medica agregada con éxito' })
    }catch (error){
        console.error('Error al insertar la condicion:', error.message);

        // Respuesta de error
        res.status(500).json({ message: 'Error al agregar la condicion', error: error.message });
    }
}

module.exports = addCondition