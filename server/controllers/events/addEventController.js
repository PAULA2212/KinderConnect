const promisePool = require('../../services/database'); // Importa la conexión a la base de datos

// Controlador para agregar un nuevo evento
const addEvent = async (req, res) => {
    // Log inicial para verificar que la ruta ha sido alcanzada.
    console.log('POST /api/events - Iniciando creación de evento');

    // Log de los datos recibidos en el cuerpo de la solicitud.
    console.log('Datos recibidos:', req.body);

    // Desestructuración de datos requeridos del cuerpo de la solicitud
    const { title, description, date, time, id_educador } = req.body;

    // Validar que los datos requeridos están presentes.
    if (!title || !description || !date || !time || !id_educador) {
        // Log de error detallado si faltan datos
        console.error('Faltan datos requeridos:', { title, description, date, time, id_educador });
        // Responde con un estado 400 (Bad Request) si faltan datos
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        // Log previo a la consulta para insertar el evento.
        console.log('Ejecutando consulta para insertar evento:', { title, description, date, time, id_educador });

        // Ejecuta la consulta para insertar el nuevo evento en la base de datos
        const [result] = await promisePool.query(
            `INSERT INTO eventos (nombre, descripcion, fecha, hora, id_educador)
             VALUES (?, ?, ?, ?, ?)`,
            [title, description, date, time, id_educador] // Se pasan los valores a la consulta
        );

        // Log de éxito con el ID del nuevo evento.
        console.log('Evento creado con éxito, ID del evento:', result.insertId);

        // Objeto que representa el nuevo evento
        const newEvent = {
            id_evento: result.insertId, // ID del evento recién creado
            title,                       // Título del evento
            description,                 // Descripción del evento
            date,                        // Fecha del evento
            time,                        // Hora del evento
            id_educador                  // ID del educador que crea el evento
        };

        // Log del objeto que se enviará en la respuesta.
        console.log('Nuevo evento:', newEvent);

        // Responde con un estado 201 (Created) y el nuevo evento en el cuerpo de la respuesta
        res.status(201).json(newEvent);
    } catch (error) {
        // Log del error detallado.
        console.error('Error al crear el evento:', error);
        // Responde con un estado 500 (Internal Server Error) si ocurre un error en el servidor
        res.status(500).json({ error: 'Error al crear el evento' });
    }
};

module.exports = addEvent; // Exporta el controlador para su uso en otras partes de la aplicación
