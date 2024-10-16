const promisePool = require('../../services/database');

const getKidTeachers = async (req, res) => {
    const idEducador = parseInt(req.params.idEducador);

    // Validar que el idEducador sea un número
    if (isNaN(idEducador)) {
        return res.status(400).json({ error: 'ID de educador inválido' });
    }

    try {
        // Consulta SQL para obtener los niños vinculados
        const [rows] = await promisePool.query(
            `SELECT n.id_niño, n.nombre, n.apellido_1, n.apellido_2, n.fecha_nac, n.centro_educativo
             FROM niños n
             INNER JOIN educadores_niños en ON n.id_niño = en.id_niño
             WHERE en.id_educador = ?`,
            [idEducador]
        );

        // Devolver los resultados en formato JSON
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los niños:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

module.exports = getKidTeachers