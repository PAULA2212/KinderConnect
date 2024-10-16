const promisePool = require('../../services/database');

const insertTeachersDiary = async (req, res) => {
    const { id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer, comentarios } = req.body;

    // Log de los datos recibidos
    console.log('Datos recibidos:', req.body);

    // Validación básica ajustada para permitir 0 en micciones y deposiciones
    if (!id_niño || !fecha || !desayuno || !comida || !merienda || !siesta_mañana || !siesta_tarde || micciones === undefined || deposiciones === undefined) {
        console.error('Faltan datos necesarios. Datos recibidos:', req.body);
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    // Validación del formato de la fecha
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        console.error('Fecha en formato incorrecto. Fecha recibida:', fecha);
        return res.status(400).json({ message: 'Fecha en formato incorrecto' });
    }

    try {
        // Log de la consulta que se va a ejecutar
        console.log('Consulta SQL:', 
            `INSERT INTO diario_educadores (
                id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer, comentarios
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer || null, comentarios || null]
        );

        const [result] = await promisePool.query(
            `INSERT INTO diario_educadores (
                id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer, comentarios
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id_niño, fecha, desayuno, comida, merienda, siesta_mañana, siesta_tarde, micciones, deposiciones, traer || null, comentarios || null]
        );

        // Log de éxito
        console.log('Registro guardado correctamente:', result);
        res.status(201).json({ message: 'Registro guardado correctamente', id_registro: result.insertId });
    } catch (error) {
        // Log de error
        console.error('Error al guardar el registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = insertTeachersDiary