const promisePool = require('../../services/database'); // Importa el módulo de conexión a la base de datos

// Controlador para agregar un alimento para un niño
const addFood = async (req, res) => {
    // Extrae el ID del niño y el nombre del alimento del cuerpo de la solicitud
    const { idKid, food } = req.body;

    try {
        // Ejecuta la consulta SQL para insertar el alimento en la base de datos
        await promisePool.query('INSERT INTO alimentos (id_niño, alimento) VALUES (?, ?)', [idKid, food]);

        // Responde con un código de estado 201 (Created) indicando que el alimento se ha agregado con éxito
        res.status(201).json({ message: 'Alimento agregada con éxito' });
    } catch (error) {
        // Registra el error en la consola para fines de depuración
        console.error('Error al insertar el alimento:', error.message);

        // Respuesta de error en caso de que la consulta falle
        res.status(500).json({ message: 'Error al agregar la condición', error: error.message });
    }
};

module.exports = addFood; // Exporta el controlador para su uso en otras partes de la aplicación
