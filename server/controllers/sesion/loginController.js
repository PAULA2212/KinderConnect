const promisePool = require('../../services/database'); // Importa el pool de conexiones a la base de datos
const bcrypt = require('bcrypt'); // Importa bcrypt para el hashing y la comparación de contraseñas
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para la creación de tokens JWT

const SECRET_KEY = process.env.JWT_SECRET;  // Asegúrate de usar una clave secreta en las variables de entorno para mayor seguridad

/**
 * Controlador de inicio de sesión.
 * Este controlador autentica al usuario, valida las credenciales 
 * y retorna un token JWT si las credenciales son válidas.
 *
 * @param {Object} req - Objeto de solicitud HTTP que contiene la información del usuario.
 * @param {Object} res - Objeto de respuesta HTTP para enviar respuestas al cliente.
 */
const login = async (req, res) => {
    const { userName, password } = req.body; // Desestructura el nombre de usuario y la contraseña del cuerpo de la solicitud

    console.log('Inicio de sesión:', { userName, password }); // Log para depuración

    // Validación de datos requeridos
    if (!userName || !password) {
        console.log('Error: Falta nombre de usuario o contraseña'); // Log de error si faltan campos
        return res.status(400).json({ message: 'Nombre de usuario y contraseña son obligatorios' }); // Respuesta de error al cliente
    }

    try {
        // Buscar el usuario en la base de datos mediante su nombre de usuario
        const [rows] = await promisePool.query('SELECT * FROM usuarios WHERE username = ?', [userName]);
        console.log('Resultado de la búsqueda del usuario:', rows); // Log del resultado de la búsqueda

        // Verifica si se encontró al usuario
        if (rows.length === 0) {
            console.log('Error: Usuario no encontrado'); // Log de error si el usuario no existe
            return res.status(401).json({ message: 'Credenciales incorrectas' }); // Respuesta de error al cliente
        }

        const user = rows[0]; // Obtiene el primer usuario de la lista
        console.log('Usuario encontrado:', user); // Log para mostrar los detalles del usuario encontrado

        // Comparar la contraseña hasheada con la contraseña proporcionada
        const match = await bcrypt.compare(password, user.contraseña); // Compara la contraseña ingresada con la almacenada
        console.log('Comparación de contraseñas:', match); // Log del resultado de la comparación

        // Si las contraseñas coinciden, genera un token JWT
        if (match) {
            // Generar un token JWT con el id del usuario y su perfil
            const token = jwt.sign(
                {
                    id: user.id_usuario, // ID del usuario
                    perfil: user.perfil // Perfil del usuario
                },
                SECRET_KEY, // Clave secreta para firmar el token
                { expiresIn: '1h' }  // Token expirará en 1 hora
            );

            console.log('Token generado:', token); // Log para mostrar el token generado

            // Enviar respuesta exitosa con el token y datos del usuario
            res.status(200).json({
                id: user.id_usuario,
                perfil: user.perfil,
                token // Incluye el token en la respuesta
            });
        } else {
            console.log('Error: Contraseña incorrecta'); // Log de error si la contraseña no coincide
            res.status(401).json({ message: 'Credenciales incorrectas' }); // Respuesta de error al cliente
        }
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error); // Log de error si ocurre una excepción
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta de error al cliente
    }
}

module.exports = login; // Exporta la función de inicio de sesión para su uso en otras partes de la aplicación
