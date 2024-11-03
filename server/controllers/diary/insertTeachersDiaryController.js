const promisePool = require('../../services/database'); // Importa la conexión a la base de datos

// Controlador para insertar un registro en el diario de educadores
const insertTeachersDiary = async (req, res) => {
    // Extrae los datos del cuerpo de la solicitud
    const { id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer, comentarios } = req.body;

    // Log de los datos recibidos para auditoría
    console.log('Datos recibidos:', req.body);

    // Validación básica ajustada para permitir 0 en micciones y deposiciones
    if (!id_niño || !fecha || !desayuno || !comida || !merienda || !siesta_mañana || !siesta_tarde || micciones === undefined || deposiciones === undefined) {
        // Log de error si faltan datos
        console.error('Faltan datos necesarios. Datos recibidos:', req.body);
        // Responde con un estado 400 (Bad Request) si faltan datos obligatorios
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    // Validación del formato de la fecha (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        // Log de error si el formato de la fecha es incorrecto
        console.error('Fecha en formato incorrecto. Fecha recibida:', fecha);
        // Responde con un estado 400 (Bad Request) si la fecha no tiene el formato correcto
        return res.status(400).json({ message: 'Fecha en formato incorrecto' });
    }

    try {
        // Log de la consulta que se va a ejecutar para auditoría
        console.log('Consulta SQL:', 
            `INSERT INTO diario_educadores (
                id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer, comentarios
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer || null, comentarios || null]
        );

        // Ejecuta la consulta para insertar el nuevo registro en la base de datos
        const [result] = await promisePool.query(
            `INSERT INTO diario_educadores (
                id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer, comentarios
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer || null, comentarios || null]
        );

        // Log de éxito si la inserción se realiza correctamente
        console.log('Registro guardado correctamente:', result);
        // Responde con un estado 201 (Created) y el ID del registro insertado
        res.status(201).json({ message: 'Registro guardado correctamente', id_registro: result.insertId });
    } catch (error) {
        // Log de error si ocurre un problema al guardar el registro
        console.error('Error al guardar el registro:', error);
        // Responde con un estado 500 (Internal Server Error) si hay un problema en el servidor
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = insertTeachersDiary; // Exporta el controlador para su uso en otras partes de la aplicación
