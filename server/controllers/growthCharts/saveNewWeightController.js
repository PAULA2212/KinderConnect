const promisePool = require('../../services/database'); // Importa el pool de conexiones para realizar consultas a la base de datos

/**
 * Guarda el peso de un niño en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud que contiene los datos del cuerpo de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const saveWeight = async (req, res) => {
    const { idKid, value, fecha } = req.body; // Desestructura los datos necesarios del cuerpo de la solicitud

    try {
        // Inserta los datos de peso en la tabla `crecimiento_peso`
        await promisePool.query(
            'INSERT INTO crecimiento_peso (id_niño, fecha, valor) VALUES (?, ?, ?)',
            [idKid, fecha, value]
        );

        // Respuesta exitosa con código de estado 201
        res.status(201).json('Se insertaron los datos con éxito');
    } catch (error) {
        // Log del error para el diagnóstico
        console.error('Error al insertar datos en crecimiento_peso:', error);
        // Respuesta de error en caso de fallo
        res.status(500).json({ error: 'No se han podido insertar los datos' });
    }
};

// Exporta la función para su uso en otras partes de la aplicación
module.exports = saveWeight;
