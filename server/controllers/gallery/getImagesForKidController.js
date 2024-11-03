const promisePool = require('../../services/database'); // Importa el módulo de conexión a la base de datos

// Controlador para obtener las imágenes de un niño específico
const getImagesForKid = async (req, res) => {
    // Extrae el ID del niño de los parámetros de la solicitud
    const { idKid } = req.params;
    console.log('ID del niño recibido:', idKid); // Log para verificar el ID recibido

    try {
        // Realiza la consulta a la base de datos para obtener las imágenes asociadas al niño
        const [images] = await promisePool.query(
            'SELECT * FROM multimedia WHERE id_niño = ? ORDER BY fecha_subida DESC',
            [idKid]
        );

        // Responde con un código de estado 200 y las imágenes encontradas
        res.status(200).json(images);
    } catch (error) {
        // Registra el error en la consola para fines de depuración
        console.error('Error fetching images:', error);

        // Responde con un código de estado 500 y un mensaje de error
        res.status(500).json({ message: 'Error fetching images' });
    }
};

module.exports = getImagesForKid; // Exporta el controlador para su uso en otras partes de la aplicación
