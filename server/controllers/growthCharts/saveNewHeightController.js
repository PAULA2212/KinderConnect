const promisePool = require('../../services/database');

const saveHeight = async (req, res) => {
    const { idKid, value, fecha } = req.body;

    try {
        // Cambiado el orden de `value` y `fecha` en la inserción
        await promisePool.query('INSERT INTO crecimiento_altura (id_niño, fecha, valor) VALUES (?, ?, ?)', [idKid, fecha, value]);
        res.status(200).json('Se insertaron los datos con éxito');
    } catch (error) {
        console.error('Error al insertar datos en crecimiento_altura:', error); // Log para más detalles
        res.status(500).json({ error: 'No se han podido insertar los datos' });
    }
}

// Corrección de `module.exports`
module.exports = saveHeight
