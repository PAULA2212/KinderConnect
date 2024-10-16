const promisePool = require('../../services/database');

const linkedKidTeachers = async (req, res) => {
    // Agrega un log para verificar que la solicitud está siendo recibida
    console.log('Solicitud POST recibida en /api/linkednino_educador');

    // Asegúrate de que `req.body` contiene los datos esperados
    console.log('Datos recibidos:', req.body);

    // Desestructurar los datos del cuerpo de la solicitud
    const { id_educador, id_niño } = req.body;

    // Verificar que `id_educador` y `id_niño` existen y tienen el tipo correcto
    console.log('id_educador:', id_educador);
    console.log('id_niño:', id_niño);

    try {
        // Verificar si ya existe una vinculación entre el educador y el niño
        const [existingLink] = await promisePool.query(
            `SELECT * FROM educadores_niños WHERE id_educador = ? AND id_niño = ?`,
            [id_educador, id_niño]
        );

        console.log('Resultado de la verificación de vinculación:', existingLink);

        if (existingLink.length === 0) {
            // Vincular el niño con el educador si no está vinculado
            console.log('Vinculando el niño con el educador');
            await promisePool.query(
                `INSERT INTO educadores_niños (id_educador, id_niño)
                 VALUES (?, ?)`,
                [id_educador, id_niño] // Corrige el nombre de la variable aquí
            );
            res.status(200).json({ message: 'Niño vinculado con el educador exitosamente' });
        } else {
            console.log('El niño ya está vinculado con el educador');
            res.status(400).json({ message: 'El niño ya está vinculado con el educador' });
        }
    } catch (error) {
        // Captura y muestra cualquier error que ocurra
        console.error('Error en la operación de vinculación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = linkedKidTeachers