const promisePool = require('../../services/database'); // Importa el pool de conexiones para realizar consultas a la base de datos

/**
 * Agrega una condición médica para un niño en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const addCondition = async (req, res) => {
    // Desestructuración de los datos del cuerpo de la solicitud
    const { kidId, title, details } = req.body;

    try {
        // Inserta la nueva condición médica en la base de datos
        await promisePool.query('INSERT INTO condiciones_medicas (id_niño, titulo, descripcion) VALUES (?, ?, ?)', [kidId, title, details]);
        
        // Respuesta exitosa con código 201 Created
        res.status(201).json({ message: 'Condición médica agregada con éxito' });
    } catch (error) {
        // Registro del error en la consola para fines de depuración
        console.error('Error al insertar la condición:', error.message);
        
        // Respuesta de error en caso de falla en la operación
        res.status(500).json({ message: 'Error al agregar la condición', error: error.message });
    }
};

// Exporta la función para su uso en otras partes de la aplicación
module.exports = addCondition;
