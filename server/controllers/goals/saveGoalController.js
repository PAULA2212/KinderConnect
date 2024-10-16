const promisePool = require('../../services/database')

const saveGoal = async (req, res) => {
    const {idKid, idTeacher, content, state} = req.body

    try{
        await promisePool.query('INSERT INTO objetivos (id_educador, id_niño, contenido, estado) VALUES (?,?,?,?)',
            [idTeacher, idKid, content, state])
            res.status(200).json({ message: 'Objetivo guardado exitosamente' });
    }catch (error){
        console.log('Error al guardar el objetivo', error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = saveGoal