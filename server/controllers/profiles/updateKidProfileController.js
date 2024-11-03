const promisePool = require('../../services/database'); // Importa el pool de conexiones a la base de datos

/**
 * Actualiza el perfil de un niño en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud que representa la solicitud HTTP.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const updateKidProfile = async (req, res) => {
    const {
        nombre,
        apellido_1,
        apellido_2,
        fecha_nacimiento,
        centro_educativo
    } = req.body; // Desestructura los datos del cuerpo de la solicitud

    const { id } = req.params; // Extrae el ID del niño de los parámetros de la solicitud

    console.log('Datos recibidos:', req.body); // Log para verificar los datos recibidos

    // Validación básica
    if (!nombre || !apellido_1 || !apellido_2 || !fecha_nacimiento || !centro_educativo) {
        console.log('Error: Faltan campos obligatorios'); // Log de error
        return res.status(400).json({ message: 'Todos los campos son obligatorios' }); // Responde con error 400 si faltan campos
    }

    try {
        // Realiza la consulta de actualización en la base de datos
        const [result] = await promisePool.query(
            `UPDATE niños
             SET nombre = ?, apellido_1 = ?, apellido_2 = ?, fecha_nac = ?, centro_educativo = ?
             WHERE id_niño = ?`,
            [nombre, apellido_1, apellido_2, fecha_nacimiento, centro_educativo, id]
        );

        // Verifica si se actualizó algún registro
        if (result.affectedRows === 0) {
            console.log('Error: No se encontró ningún niño con el ID proporcionado.'); // Log de error
            return res.status(404).json({ message: 'No se encontró ningún niño con el ID proporcionado' }); // Responde con error 404 si no se actualizó
        }

        res.status(200).json({ message: 'Operación realizada exitosamente' }); // Responde con éxito
    } catch (error) {
        console.error('Error al procesar la solicitud:', error); // Log del error
        res.status(500).json({ message: 'Error interno del servidor' }); // Responde con error 500 para problemas de servidor
    }
};

module.exports = updateKidProfile; // Exporta la función para su uso en otras partes de la aplicación
