const promisePool = require('../../services/database'); // Importa la conexión a la base de datos

// Controlador para obtener la lista de centros educativos
const center = async (req, res) => {
    try {
        // Realiza la consulta a la base de datos para obtener todos los centros educativos
        const [rows] = await promisePool.query('SELECT * FROM centros_educativos');

        // Si la consulta es exitosa, se devuelve la lista de centros educativos con un estado 200 (OK)
        res.status(200).json(rows); // 200: La solicitud fue exitosa y se devolvió la información
    } catch (error) {
        // Manejo de errores en caso de que la consulta falle
        console.error('Error al obtener los centros educativos:', error); // Registro del error en la consola

        // Si ocurre un error, se devuelve un estado 500 (Internal Server Error)
        // Esto indica que hubo un problema en el servidor al procesar la solicitud
        res.status(500).json({ message: 'Error interno del servidor' }); // 500: Error inesperado en el servidor
    }
};

module.exports = center; // Exporta el controlador para su uso en otras partes de la aplicación
