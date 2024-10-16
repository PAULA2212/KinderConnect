const promisePool = require('../../services/database')

const addAssessmentForKid = async (req, res) => {
    const {idTeacher, idKid, date, content} = req.body

    try{
        await promisePool.query(
            'INSERT INTO evaluaciones (id_educador, id_niño, contenido, fecha) VALUES (?,?,?,?)',
            [idTeacher, idKid, content, date])
        res.status(200).json('Se ha insertado la evaluacion exitosamente')
    }catch (error){
        console.log('no se ha podido insertar la evaluacion:', error)
        res.status(500).json({'no se ha podido insertar la evaluacion:': error})
    }
}
module.exports = addAssessmentForKid