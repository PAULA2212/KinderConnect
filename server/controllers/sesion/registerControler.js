const bcrypt = require('bcrypt'); // Importa bcrypt para el hashing de contraseñas
const promisePool = require('../../services/database'); // Importa el pool de conexiones a la base de datos

/**
 * Controlador de registro de usuario.
 * Este controlador maneja el registro de nuevos usuarios, valida la entrada,
 * hashea la contraseña y almacena los datos en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud HTTP que contiene la información del usuario.
 * @param {Object} res - Objeto de respuesta HTTP para enviar respuestas al cliente.
 */
const register = async (req, res) => {
    const { userName, password, perfil } = req.body; // Desestructura el nombre de usuario, contraseña y perfil del cuerpo de la solicitud

    console.log('Registro de usuario:', { userName, password, perfil }); // Log para depuración

    // Validación de datos requeridos
    if (!userName || !password || !perfil) {
        console.log('Error: Falta nombre de usuario, contraseña o perfil'); // Log de error si faltan campos
        return res.status(400).json({ message: 'Nombre de usuario, contraseña y perfil son obligatorios' }); // Respuesta de error al cliente
    }

    // Verificar si el nombre de usuario ya existe en la base de datos
    const sqlCheckUser = 'SELECT * FROM usuarios WHERE username = ?';
    const [existingUser] = await promisePool.query(sqlCheckUser, [userName]);

    if (existingUser.length > 0) {
        console.log('Error: El nombre de usuario ya existe'); // Log si el usuario ya existe
        return res.status(409).json({message: "El nombre de usuario ya existe"});
    }

    try {
        
        // Hash de la contraseña utilizando bcrypt con un factor de costo de 10
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Contraseña hasheada:', hashedPassword); // Log de la contraseña hasheada para verificación

        // Consulta SQL para insertar un nuevo usuario en la base de datos
        const sqlInsertUser = 'INSERT INTO usuarios (username, contraseña, perfil) VALUES (?, ?, ?)';
        const [result] = await promisePool.query(sqlInsertUser, [userName, hashedPassword, perfil]); // Ejecución de la consulta

        console.log('Usuario registrado con éxito:', result); // Log del resultado de la inserción
        res.status(201).json({ message: 'Usuario registrado exitosamente' }); // Respuesta exitosa al cliente
    } catch (error) {
        console.error('Error al registrar el usuario:', error); // Log de error si ocurre una excepción
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta de error al cliente
    }
};

module.exports = register; // Exporta la función de registro para su uso en otras partes de la aplicación
