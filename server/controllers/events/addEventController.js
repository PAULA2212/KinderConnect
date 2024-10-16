const promisePool = require('../../services/database');

const addEvent = async (req, res) => {
    // Log inicial para verificar que la ruta ha sido alcanzada.
    console.log('POST /api/events - Iniciando creación de evento');

    // Log de los datos recibidos en el cuerpo de la solicitud.
    console.log('Datos recibidos:', req.body);

    const { title, description, date, time, id_educador } = req.body;

    // Validar que los datos requeridos están presentes.
    if (!title || !description || !date || !time || !id_educador) {
        console.error('Faltan datos requeridos:', { title, description, date, time, id_educador });
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        // Log previo a la consulta para insertar el evento.
        console.log('Ejecutando consulta para insertar evento:', { title, description, date, time, id_educador });

        const [result] = await promisePool.query(
            `INSERT INTO eventos (nombre, descripcion, fecha, hora, id_educador)
             VALUES (?, ?, ?, ?, ?)`,
            [title, description, date, time, id_educador]
        );

        // Log de éxito con el ID del nuevo evento.
        console.log('Evento creado con éxito, ID del evento:', result.insertId);

        const newEvent = {
            id_evento: result.insertId,
            title,
            description,
            date,
            time,
            id_educador
        };

        // Log del objeto que se enviará en la respuesta.
        console.log('Nuevo evento:', newEvent);

        res.status(201).json(newEvent);
    } catch (error) {
        // Log del error detallado.
        console.error('Error al crear el evento:', error);
        res.status(500).json({ error: 'Error al crear el evento' });
    }
};


module.exports = addEvent