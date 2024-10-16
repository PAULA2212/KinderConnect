const promisePool = require('../../services/database');

const userDetails = async (req, res) => {

    console.log('Datos recibidos en req.params:', req.params);
    const { userId, perfil } = req.params;
    console.log()
    // Validar que userId sea un número y perfil sea uno de los valores permitidos
    if (isNaN(userId) || !['progenitor', 'educador'].includes(perfil)) {
        console.log('Error: Parámetros inválidos');
        return res.status(400).json({ message: 'Parámetros inválidos' });
    }

    let query;
    if (perfil === 'progenitor') {
        query = 'SELECT * FROM progenitores WHERE id_progenitor = ?';
    } else if (perfil === 'educador') {
        query = 'SELECT * FROM educadores WHERE id_educador = ?';
    }

    try {
        const [rows] = await promisePool.query(query, [userId]);
        console.log('Resultado de la búsqueda del usuario para detalles:', rows);
        if (rows.length > 0) {
            res.json(rows[0]); // Devolver el primer resultado
        } else {
            console.log('Error: Usuario no encontrado');
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = userDetails