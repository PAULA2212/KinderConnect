const promisePool = require('../../services/database');

const getKidParents = async (req, res) => {
    const idProgenitor = parseInt(req.params.idProgenitor);
    console.log(idProgenitor);
    
    // Validar que el idProgenitor sea un número
    if (isNaN(idProgenitor)) {
        return res.status(400).json({ error: 'ID de progenitor inválido' });
    }

    try {
        // Consulta SQL para obtener los niños vinculados
        const [rows] = await promisePool.query(
            `SELECT n.id_niño, n.nombre, n.apellido_1, n.apellido_2, n.fecha_nac, n.centro_educativo, n.unique_code
             FROM niños n
             INNER JOIN progenitores_niños pn ON n.id_niño = pn.id_niño
             WHERE pn.id_progenitor = ?`,
            [idProgenitor]
        );

        // Comprobar si se encontraron resultados
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron niños vinculados a este progenitor.' });
        }

        // Devolver los resultados en formato JSON
        res.status(200).json({ kids: rows });
        console.log(rows);
    } catch (error) {
        console.error('Error al obtener los niños:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

module.exports = getKidParents;
