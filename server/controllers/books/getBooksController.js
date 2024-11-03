// Importamos el pool de conexión a la base de datos
const promisePool = require('../../services/database');

// Controlador para obtener la lista de libros
const getBooks = async (req, res) => {
    try {
        // Realizamos una consulta a la base de datos para obtener todos los libros,
        // ordenados por el ID de registro en orden descendente
        const [books] = await promisePool.query('SELECT * FROM libros ORDER BY id_registro DESC');

        // Enviamos una respuesta exitosa con el estado 200 y los libros obtenidos
        res.status(200).json(books);
    } catch (error) {
        // Manejo de errores: si ocurre un error en la consulta, lo registramos y enviamos una respuesta de error
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
};

// Exportamos el controlador para que pueda ser utilizado en otras partes de la aplicación
module.exports = getBooks;
