const promisePool = require('../../services/database');

const deleteWeight = async (req, res) => {
    const { id } = req.params;

    try {
        await promisePool.query('DELETE FROM crecimiento_peso WHERE id_registro = ?', [id]);
        res.status(200).json('Registro eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar el peso:', error);
        res.status(500).json({ message: 'Error al eliminar el peso' });
    }
};

module.exports = deleteWeight;