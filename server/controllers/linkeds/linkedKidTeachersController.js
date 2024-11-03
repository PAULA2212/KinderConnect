const promisePool = require('../../services/database'); // Importa el pool de conexiones para realizar consultas a la base de datos

/**
 * Vincula un niño con un educador en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const linkedKidTeachers = async (req, res) => {
    // Log para verificar que la solicitud ha sido recibida
    console.log('Solicitud POST recibida en /api/linkednino_educador');

    // Registro de los datos recibidos en el cuerpo de la solicitud
    console.log('Datos recibidos:', req.body);

    // Desestructurar los datos del cuerpo de la solicitud
    const { id, unique_code } = req.body;

    // Log de los identificadores proporcionados
    console.log('id_educador:', id);
    console.log('unique_code:', unique_code);

    try {
        // Obtener el ID del niño usando el unique_code proporcionado
        const [rows] = await promisePool.query("SELECT id_niño FROM niños WHERE unique_code = ?", [unique_code]);
        
        // Verificar si la consulta devolvió resultados
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró un niño con el unique_code proporcionado' }); // Respuesta de error si no se encuentra el niño
        }

        // Extraer el id_niño de la primera fila del resultado
        const id_niño = rows[0].id_niño;
        console.log('Extracción del id del niño:', id_niño);
        
        // Verificar si ya existe una vinculación entre el educador y el niño
        const [existingLink] = await promisePool.query(
            `SELECT * FROM educadores_niños WHERE id_educador = ? AND id_niño = ?`,
            [id, id_niño]
        );

        console.log('Resultado de la verificación de vinculación:', existingLink);

        // Si no existe una vinculación, se procede a crearla
        if (existingLink.length === 0) {
            // Vincular el niño con el educador
            console.log('Vinculando el niño con el educador');
            await promisePool.query(
                `INSERT INTO educadores_niños (id_educador, id_niño) VALUES (?, ?)`,
                [id, id_niño]
            );
            res.status(201).json({ message: 'Niño vinculado con el educador exitosamente' }); // Respuesta de éxito con código 201
        } else {
            // Respuesta si el niño ya está vinculado
            console.log('El niño ya está vinculado con el educador');
            res.status(400).json({ message: 'El niño ya está vinculado con el educador' });
        }
    } catch (error) {
        // Captura y muestra cualquier error que ocurra
        console.error('Error en la operación de vinculación:', error);
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta de error en caso de excepción
    }
};

// Exporta la función para su uso en otras partes de la aplicación
module.exports = linkedKidTeachers;

