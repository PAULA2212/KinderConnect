const promisePool = require('../../services/database');

/**
 * Actualiza el perfil de un progenitor o educador en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud que representa la solicitud HTTP.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const updateProfile = async (req, res) => {
    const {
        profileType, // Tipo de perfil ('progenitor' o 'educador')
        id_progenitor, // ID del progenitor (si el perfil es 'progenitor')
        id_educador, // ID del educador (si el perfil es 'educador')
        nombre,
        apellido_1,
        apellido_2,
        telefono,
        direccion,
        ocupacion,
        especialidad,
        centro_educativo
    } = req.body;

    // Validación básica
    if (!profileType) {
        return res.status(400).json({ message: 'Tipo de perfil es obligatorio' });
    }

    // Se determina el ID a usar según el tipo de perfil
    const id = profileType === 'progenitor' ? id_progenitor : id_educador;
    
    if (!id) {
        return res.status(400).json({ message: `ID de ${profileType} es obligatorio` });
    }

    try {
        if (profileType === 'progenitor') {
            await promisePool.query(
                `INSERT INTO progenitores (id_progenitor, nombre, apellido_1, apellido_2, telefono, direccion, ocupacion) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 nombre = VALUES(nombre),
                 apellido_1 = VALUES(apellido_1),
                 apellido_2 = VALUES(apellido_2),
                 telefono = VALUES(telefono),
                 direccion = VALUES(direccion),
                 ocupacion = VALUES(ocupacion)`,
                [id, nombre, apellido_1, apellido_2, telefono, direccion, ocupacion]
            );
        } else if (profileType === 'educador') {
            await promisePool.query(
                `INSERT INTO educadores (id_educador, nombre, apellido_1, apellido_2, telefono, direccion, especialidad, centro_educativo) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 nombre = VALUES(nombre),
                 apellido_1 = VALUES(apellido_1),
                 apellido_2 = VALUES(apellido_2),
                 telefono = VALUES(telefono),
                 direccion = VALUES(direccion),
                 especialidad = VALUES(especialidad),
                 centro_educativo = VALUES(centro_educativo)`,
                [id, nombre, apellido_1, apellido_2, telefono, direccion, especialidad, centro_educativo]
            );
        } else {
            return res.status(400).json({ message: 'Tipo de perfil no válido' });
        }

        res.status(200).json({ message: 'Perfil actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
    }
};

module.exports = updateProfile;
