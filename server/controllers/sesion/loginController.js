const promisePool = require('../../services/database');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { userName, password } = req.body;

    console.log('Inicio de sesión:', { userName, password });

    if (!userName || !password) {
        console.log('Error: Falta nombre de usuario o contraseña');
        return res.status(400).json({ message: 'Nombre de usuario y contraseña son obligatorios' });
    }

    try {
        // Buscar el usuario
        const [rows] = await promisePool.query('SELECT * FROM usuarios WHERE username = ?', [userName]);
        console.log('Resultado de la búsqueda del usuario:', rows);

        if (rows.length === 0) {
            console.log('Error: Usuario no encontrado');
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = rows[0];
        console.log('Usuario encontrado:', user);

        // Comparar la contraseña hasheada con la proporcionada
        const match = await bcrypt.compare(password, user.contraseña);
        console.log('Comparación de contraseñas:', match);

        if (match) {
            res.status(200).json({
                id: user.id_usuario,
                perfil: user.perfil
            });
        } else {
            console.log('Error: Contraseña incorrecta');
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = login