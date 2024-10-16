const bcrypt = require('bcrypt');
const promisePool = require('../../services/database');

const register = async (req, res) => {
    const { userName, password, perfil } = req.body;

    console.log('Registro de usuario:', { userName, password, perfil });

    if (!userName || !password || !perfil) {
        console.log('Error: Falta nombre de usuario, contraseña o perfil');
        return res.status(400).json({ message: 'Nombre de usuario, contraseña y perfil son obligatorios' });
    }

    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Contraseña hasheada:', hashedPassword);

        const sql = 'INSERT INTO usuarios (username, contraseña, perfil) VALUES (?, ?, ?)';
        const [result] = await promisePool.query(sql, [userName, hashedPassword, perfil]);

        console.log('Usuario registrado con éxito:', result);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = register