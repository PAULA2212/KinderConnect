const promisePool = require('../../services/database');

const addOrUpdateKidProfile = async (req, res) => {
    const {
        id_niño, // ID del niño (solo para actualización)
        id_progenitor, // ID del progenitor
        nombre,
        apellido_1,
        apellido_2,
        fecha_nacimiento,
        centro_educativo
    } = req.body;

    console.log('Datos recibidos:', req.body);

    // Validación básica
    if (!id_progenitor || !nombre || !apellido_1 || !apellido_2 || !fecha_nacimiento || !centro_educativo) {
        console.log('Error: Faltan campos obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        if (id_niño) {
            // Si existe id_niño, actualiza el niño
            console.log('Actualizando niño con id:', id_niño);
            const [updateResult] = await promisePool.query(
                `UPDATE niños
                 SET nombre = ?, apellido_1 = ?, apellido_2 = ?, fecha_nac = ?, centro_educativo = ?
                 WHERE id_niño = ?`,
                [nombre, apellido_1, apellido_2, fecha_nacimiento, centro_educativo, id_niño]
            );
            
            console.log('Resultado de la actualización del niño:', updateResult);

            // Verificar y actualizar la vinculación del niño con el progenitor
            const [existingLink] = await promisePool.query(
                `SELECT * FROM progenitores_niños WHERE id_progenitor = ? AND id_niño = ?`,
                [id_progenitor, id_niño]
            );

            console.log('Resultado de la verificación de vinculación:', existingLink);

            if (existingLink.length === 0) {
                // Vincular el niño con el progenitor si no está vinculado
                console.log('Vinculando el niño con el progenitor');
                await promisePool.query(
                    `INSERT INTO progenitores_niños (id_progenitor, id_niño)
                     VALUES (?, ?)`,
                    [id_progenitor, id_niño]
                );
            } else {
                console.log('El niño ya está vinculado con el progenitor');
            }

        } else {
            // Si no existe id_niño, inserta un nuevo niño
            console.log('Insertando nuevo niño');
            const [insertResult] = await promisePool.query(
                `INSERT INTO niños (nombre, apellido_1, apellido_2, fecha_nac, centro_educativo)
                 VALUES (?, ?, ?, ?, ?)`,
                [nombre, apellido_1, apellido_2, fecha_nacimiento, centro_educativo]
            );

            console.log('Resultado de la inserción del nuevo niño:', insertResult);

            const newIdNiño = insertResult.insertId;
            console.log('Nuevo ID de niño:', newIdNiño);

            // Vincular el niño recién creado con el progenitor
            console.log('Vinculando el nuevo niño con el progenitor');
            await promisePool.query(
                `INSERT INTO progenitores_niños (id_progenitor, id_niño)
                 VALUES (?, ?)`,
                [id_progenitor, newIdNiño]
            );
        }

        res.status(200).json({ message: 'Operación realizada exitosamente' });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = addOrUpdateKidProfile