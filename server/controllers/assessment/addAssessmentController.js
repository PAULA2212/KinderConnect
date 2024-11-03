const promisePool = require('../../services/database'); // Conexión con tu base de datos

// Controlador para agregar una evaluación para un niño
const addAssessmentForKid = async (req, res) => {
    // Desestructuración de datos de la solicitud
    const { idTeacher, idKid, date, content } = req.body;

    try {
        // Ejecuta la consulta para insertar una nueva evaluación en la base de datos
        await promisePool.query(
            'INSERT INTO evaluaciones (id_educador, id_niño, contenido, fecha) VALUES (?, ?, ?, ?)',
            [idTeacher, idKid, content, date]
        );

        // Respuesta exitosa con código 201 (Created)
        res.status(201).json({
            message: 'Se ha insertado la evaluación exitosamente',
            assessment: { idTeacher, idKid, date, content } // Puedes incluir más detalles aquí si es necesario
        });
    } catch (error) {
        // Manejo de errores en caso de que la inserción falle
        console.log('No se ha podido insertar la evaluación:', error);
        
        // Se devuelve un error 500 (Internal Server Error) con un mensaje descriptivo
        res.status(500).json({
            error: 'No se ha podido insertar la evaluación',
            details: error.message
        });
    }
};

// Exporta el controlador para que pueda ser utilizado en otras partes de la aplicación
module.exports = addAssessmentForKid;
