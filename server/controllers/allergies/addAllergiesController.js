// Importa el servicio de conexión a la base de datos
const promisePool = require('../../services/database');

// Controlador para agregar alergias a un niño
const addAllergies = async (req, res) => {
    // Desestructuración de los datos necesarios de la solicitud
    const { allergen, grade, idKid } = req.body;

    // Validación simple de los datos requeridos
    if (!allergen || !grade || !idKid) {
        // Si falta alguno de los datos, se devuelve un error 400 (Bad Request)
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    try {
        // Inserción de los datos en la base de datos
        await promisePool.query(
            'INSERT INTO alergias (id_niño, alergeno, grado) VALUES (?, ?, ?)',
            [idKid, allergen, grade]
        );

        // Si la inserción es exitosa, se envía una respuesta con código 201 (Created)
        res.status(201).json({ message: 'Alergia agregada con éxito' });
    } catch (error) {
        // Manejo de errores en caso de que la inserción falle
        console.error('Error al insertar la alergia:', error.message);

        // Se devuelve un error 500 (Internal Server Error) con un mensaje descriptivo
        res.status(500).json({ message: 'Error al agregar la alergia', error: error.message });
    }
};

// Exporta el controlador para que pueda ser utilizado en otras partes de la aplicación
module.exports = addAllergies;
