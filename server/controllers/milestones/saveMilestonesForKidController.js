const promisePool = require('../../services/database'); // Importa el pool de conexiones a la base de datos

/**
 * Guarda un nuevo hito de desarrollo para un niño específico.
 *
 * @param {Object} req - Objeto de solicitud que representa la solicitud HTTP.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const saveMilestonesForKid = async (req, res) => {
    const { idKid, id_hito, edad_conseguida } = req.body; // Desestructura los datos del cuerpo de la solicitud

    // Log para verificar la solicitud recibida
    console.log(`Received request to save milestone: idKid=${idKid}, id_hito=${id_hito}, edad_conseguida=${edad_conseguida}`);

    try {
        // Log de la consulta SQL y los valores a insertar
        console.log('Executing query:', 'INSERT INTO hitos_niños (id_niño, id_hito, edad_observado) VALUES (?, ?, ?)', [idKid, id_hito, edad_conseguida]);
        
        // Realiza la consulta a la base de datos para insertar el nuevo hito
        const [result] = await promisePool.query(
            'INSERT INTO hitos_niños (id_niño, id_hito, edad_observado) VALUES (?, ?, ?)',
            [idKid, id_hito, edad_conseguida]
        );

        // Log de éxito
        console.log(`Milestone saved successfully: insertId=${result.insertId}`);

        // Responde con un código de estado 201 y el ID del nuevo registro insertado
        res.status(201).json({ message: 'Milestone saved successfully', insertId: result.insertId });
    } catch (error) {
        // Log del error en caso de que falle la inserción
        console.error('Error saving milestone for kid:', error);

        // Responde con un código de estado 500 en caso de error interno del servidor
        res.status(500).json({ error: 'Error saving milestone for kid' });
    }
};

module.exports = saveMilestonesForKid; // Exporta la función para su uso en otras partes de la aplicación

