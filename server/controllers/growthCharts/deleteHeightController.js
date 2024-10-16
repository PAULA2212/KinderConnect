const promisePool = require('../../services/database');

const deleteHeight = async (req, res) => {
    const { id } = req.params;
    console.log('intentando borrar el registro', id)

    try {
        await promisePool.query('DELETE FROM crecimiento_altura WHERE id_registro = ?', [id]);
        res.status(200).json('Registro eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar la altura:', error);
        res.status(500).json({ message: 'Error al eliminar la altura' });
    }
};

module.exports = deleteHeight;