const promisePool = require('../../services/database'); // Importa el módulo que gestiona la conexión a la base de datos

// Controlador para vincular un niño a un evento
const linkedEventsKids = async (req, res) => {
    // Extrae el ID del evento y el ID del niño del cuerpo de la solicitud
    const { id_evento, id_niño } = req.body;

    // Agregar logs para ver los valores recibidos
    console.log('Valores recibidos:', { id_evento, id_niño });

    // Validación básica de entrada para asegurarse de que se han proporcionado ambos IDs
    if (!id_evento || !id_niño) {
        console.error('Error: Faltan datos necesarios.');
        // Responde con un error 400 (Bad Request) si faltan datos
        return res.status(400).json({ error: 'Faltan datos necesarios: id_evento e id_niño.' });
    }

    try {
        // Inserción en la base de datos para vincular el niño al evento
        const [result] = await promisePool.query(
            `INSERT INTO eventos_niños (id_evento, id_niño)
             VALUES (?, ?)`, // Consulta SQL para insertar la relación entre el evento y el niño
            [id_evento, id_niño] // Se pasan los valores de los IDs como parámetros
        );

        // Devolver respuesta exitosa con el ID del vínculo creado
        res.status(201).json({ 
            message: 'Niño vinculado al evento con éxito', 
            linkedEventId: result.insertId // ID del nuevo vínculo creado en la base de datos
        });
    } catch (error) {
        // Manejo de errores: si ocurre un error durante la inserción
        console.error('Error al vincular niño al evento:', error);
        // Responde con un error 500 (Internal Server Error) si hay un problema
        res.status(500).json({ error: 'Error al vincular niño al evento' });
    }
};

module.exports = linkedEventsKids; // Exporta el controlador para su uso en otras partes de la aplicación
