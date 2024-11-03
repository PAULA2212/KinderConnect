const promisePool = require('../../services/database');

/**
 * Handler para guardar un nuevo objetivo asociado a un niño.
 * @param {Object} req - La solicitud del cliente que contiene los datos del objetivo.
 * @param {Object} res - La respuesta del servidor que se enviará al cliente.
 */
const saveGoal = async (req, res) => {
    // Se extraen los datos necesarios del cuerpo de la solicitud
    const { idKid, idTeacher, content, state } = req.body;

    try {
        // Inserción del nuevo objetivo en la base de datos
        await promisePool.query(
            'INSERT INTO objetivos (id_educador, id_niño, contenido, estado) VALUES (?, ?, ?, ?)',
            [idTeacher, idKid, content, state]
        );

        // Respuesta exitosa con el estado 201, indicando que el recurso se ha creado
        res.status(201).json({ message: 'Objetivo guardado exitosamente' });
    } catch (error) {
        // Manejo de errores en caso de que falle la inserción
        console.error('Error al guardar el objetivo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = saveGoal;
