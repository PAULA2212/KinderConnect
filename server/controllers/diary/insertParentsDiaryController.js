const promisePool = require('../../services/database');

const insertParentsDiary = async (req, res) => {
    const { id_niño, fecha, medicacion, comentarios } = req.body;

    if (!id_niño || !fecha || !comentarios) {
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    try {
        const [result] = await promisePool.query(
            'INSERT INTO diario_progenitores (id_niño, fecha, medicacion, comentarios) VALUES (?, ?, ?, ?)',
            [id_niño, fecha, medicacion || null, comentarios]  // Maneja medicacion como NULL si no se proporciona
        );
        res.status(201).json({ message: 'Registro guardado correctamente', id_registro: result.insertId });
    } catch (error) {
        console.error('Error al guardar el registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = insertParentsDiary