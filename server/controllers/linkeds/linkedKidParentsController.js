const promisePool = require('../../services/database');

const linkedKidParents = async (req, res) => {
    // Agrega un log para verificar que la solicitud está siendo recibida
    console.log('Solicitud POST recibida en /api/linkednino_progenitor');

    // Asegúrate de que `req.body` contiene los datos esperados
    console.log('Datos recibidos:', req.body);

    // Desestructurar los datos del cuerpo de la solicitud
    const { id_progenitor, id_niño } = req.body;

    // Verificar que `id_educador` y `id_niño` existen y tienen el tipo correcto
    console.log('id_progenitor:', id_progenitor);
    console.log('id_niño:', id_niño);

    try {
        // Verificar si ya existe una vinculación entre el educador y el niño
        const [existingLink] = await promisePool.query(
            `SELECT * FROM progenitores_niños WHERE id_progenitor = ? AND id_niño = ?`,
            [id_progenitor, id_niño]
        );

        console.log('Resultado de la verificación de vinculación:', existingLink);

        if (existingLink.length === 0) {
            // Vincular el niño con el educador si no está vinculado
            console.log('Vinculando el niño con el progenitor');
            await promisePool.query(
                `INSERT INTO progenitores_niños (id_progenitor, id_niño)
                 VALUES (?, ?)`,
                [id_progenitor, id_niño] // Corrige el nombre de la variable aquí
            );
            res.status(200).json({ message: 'Niño vinculado con el progenitor exitosamente' });
        } else {
            console.log('El niño ya está vinculado con el progenitor');
            res.status(400).json({ message: 'El niño ya está vinculado con el progenitor' });
        }
    } catch (error) {
        // Captura y muestra cualquier error que ocurra
        console.error('Error en la operación de vinculación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = linkedKidParents