const promisePool = require('../../services/database');

const updateGoalState = async (req, res) => {
    const { goalId } = req.params;
    const { estado } = req.body;
  
    // Agregar logs para depuración
    console.log('Request received to update goal state');
    console.log('Goal ID:', goalId);
    console.log('New State:', estado);
  
    if (!goalId || !estado) {
        console.log('Missing required parameters');
        return res.status(400).json({ message: 'Faltan parámetros requeridos.' });
    }
  
    try {
        // Actualizar el estado del objetivo en la base de datos
        const [result] = await promisePool.query(
            'UPDATE objetivos SET estado = ? WHERE id_registro = ?',
            [estado, goalId]
        );
  
        console.log('Database update result:', result);
  
        if (result.affectedRows === 0) {
            console.log('Goal not found');
            return res.status(404).json({ message: 'Objetivo no encontrado.' });
        }
  
        console.log('Goal state updated successfully');
        res.status(200).json({ message: 'Estado del objetivo actualizado con éxito.' });
    } catch (error) {
        console.error('Error al actualizar el estado del objetivo:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

module.exports = updateGoalState;
