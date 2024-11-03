const promisePool = require('../../services/database'); // Importa el pool de conexiones para realizar consultas a la base de datos

/**
 * Guarda la altura de un niño en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud que contiene los datos del cuerpo de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const saveHeight = async (req, res) => {
    const { idKid, value, fecha } = req.body; // Desestructura los datos necesarios del cuerpo de la solicitud

    try {
        // Inserta los datos de altura en la tabla `crecimiento_altura`
        await promisePool.query(
            'INSERT INTO crecimiento_altura (id_niño, fecha, valor) VALUES (?, ?, ?)',
            [idKid, fecha, value]
        );

        // Respuesta exitosa con código de estado 201
        res.status(201).json('Se insertaron los datos con éxito');
    } catch (error) {
        // Log del error para el diagnóstico
        console.error('Error al insertar datos en crecimiento_altura:', error);
        // Respuesta de error en caso de fallo
        res.status(500).json({ error: 'No se han podido insertar los datos' });
    }
};

// Exporta la función para su uso en otras partes de la aplicación
module.exports = saveHeight;

