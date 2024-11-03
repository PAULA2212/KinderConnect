const promisePool = require('../../services/database'); // Importa el pool de conexiones para ejecutar consultas a la base de datos

/**
 * Actualiza el estado de un objetivo específico.
 * 
 * @param {Object} req - Objeto de solicitud que contiene los parámetros y el cuerpo.
 * @param {Object} res - Objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 */
const updateGoalState = async (req, res) => {
    const { goalId } = req.params; // Obtiene el ID del objetivo de los parámetros de la solicitud
    const { estado } = req.body; // Obtiene el nuevo estado del objetivo del cuerpo de la solicitud

    // Verifica que los parámetros requeridos estén presentes
    if (!goalId || !estado) {
        console.log('Missing required parameters');
        return res.status(400).json({ message: 'Faltan parámetros requeridos.' }); // Respuesta de error si faltan parámetros
    }
  
    try {
        // Actualiza el estado del objetivo en la base de datos
        const [result] = await promisePool.query(
            'UPDATE objetivos SET estado = ? WHERE id_registro = ?',
            [estado, goalId] // Reemplaza los marcadores de posición con el estado y el ID del objetivo
        );

        console.log('Database update result:', result);

        // Verifica si se actualizó algún registro
        if (result.affectedRows === 0) {
            console.log('Goal not found');
            return res.status(404).json({ message: 'Objetivo no encontrado.' }); // Respuesta de error si no se encontró el objetivo
        }
  
        console.log('Goal state updated successfully');
        res.status(201).json({ message: 'Estado del objetivo actualizado con éxito.' }); // Respuesta exitosa con estado 201
    } catch (error) {
        console.error('Error al actualizar el estado del objetivo:', error);
        res.status(500).json({ message: 'Error en el servidor.' }); // Respuesta de error en caso de fallo en la consulta
    }
};

module.exports = updateGoalState; // Exporta la función para su uso en otras partes de la aplicación
