const promisePool = require('../../services/database'); // Importa la conexión a la base de datos

// Controlador para insertar un registro en el diario de progenitores
const insertParentsDiarys = async (req, res) => {
    // Extrae los datos del cuerpo de la solicitud
    const { id_niño, fecha, medicacion, comentarios } = req.body;

    try {
        // Inserta los datos en la base de datos
        const [result] = await promisePool.query(
            'INSERT INTO diario_progenitores (id_niño, fecha, medicacion, comentarios) VALUES (?, ?, ?, ?)',
            [id_niño, fecha, medicacion || null, comentarios] // Si medicacion no se proporciona, se almacena como NULL
        );
        
        // Responde con un estado 201 (Created) y el ID del registro insertado
        res.status(201).json({ message: 'Registro guardado correctamente', id_registro: result.insertId }); // 201: Registro creado exitosamente
    } catch (error) {
        // Manejo de errores en caso de que la consulta falle
        console.error('Error al guardar el registro:', error);
        // Responde con un estado 500 (Internal Server Error) si hay un problema en el servidor
        res.status(500).json({ message: 'Error interno del servidor' }); // 500: Error inesperado en el servidor
    }
};

module.exports = insertParentsDiarys; // Exporta el controlador para su uso en otras partes de la aplicación
