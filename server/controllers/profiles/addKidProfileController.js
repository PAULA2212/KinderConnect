const promisePool = require('../../services/database'); // Importa el pool de conexiones a la base de datos

/**
 * Agrega un nuevo perfil de niño y lo vincula con su progenitor.
 *
 * @param {Object} req - Objeto de solicitud que representa la solicitud HTTP.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const addKidProfile = async (req, res) => {
    const {
        id_progenitor, // ID del progenitor
        nombre,
        apellido_1,
        apellido_2,
        fecha_nacimiento,
        centro_educativo
    } = req.body;

    console.log('Datos recibidos:', req.body); // Log para verificar los datos recibidos

    // Validación básica de los campos obligatorios
    if (!id_progenitor || !nombre || !apellido_1 || !apellido_2 || !fecha_nacimiento || !centro_educativo) {
        console.log('Error: Faltan campos obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Inserta el nuevo niño en la base de datos
        const [insertResult] = await promisePool.query(
            `INSERT INTO niños (nombre, apellido_1, apellido_2, fecha_nac, centro_educativo)
             VALUES (?, ?, ?, ?, ?)`,
            [nombre, apellido_1, apellido_2, fecha_nacimiento, centro_educativo]
        );

        const newIdNiño = insertResult.insertId; // Obtiene el ID del nuevo niño insertado

        // Vincula el nuevo niño con su progenitor
        await promisePool.query(
            `INSERT INTO progenitores_niños (id_progenitor, id_niño)
             VALUES (?, ?)`,
            [id_progenitor, newIdNiño]
        );

        // Responde al cliente con un mensaje de éxito
        res.status(201).json({ message: 'Operación realizada exitosamente' });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error); // Log de error
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta de error
    }
};

module.exports = addKidProfile; // Exporta la función para su uso en otras partes de la aplicación
