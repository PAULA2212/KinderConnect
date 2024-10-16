const promisePool = require('../../services/database');

const addAllergies = async (req, res) => {
    // Destructuración de datos de la solicitud
    const { allergen, grade, idKid } = req.body;

    // Validación simple de los datos
    if (!allergen || !grade || !idKid) {
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    try {
        // Inserción en la base de datos
        await promisePool.query(
            'INSERT INTO alergias (id_niño, alergeno, grado) VALUES (?, ?, ?)',
            [idKid, allergen, grade]
        );

        // Respuesta exitosa
        res.status(201).json({ message: 'Alergia agregada con éxito' });
    } catch (error) {
        // Manejo de errores
        console.error('Error al insertar la alergia:', error.message);

        // Respuesta de error
        res.status(500).json({ message: 'Error al agregar la alergia', error: error.message });
    }
};

module.exports = addAllergies;
