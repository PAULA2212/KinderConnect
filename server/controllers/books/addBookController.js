// Importamos el servicio para subir imágenes y el pool de conexión a la base de datos
const uploadImage = require('../../services/uploadImageService'); 
const promisePool = require('../../services/database');

// Controlador para añadir un libro
const addBook = async (req, res) => {
  try {
    // Desestructuramos los datos enviados en el cuerpo de la solicitud
    const { titulo, comentario, id_usuario } = req.body;
    let imagen_url = null; // Valor por defecto si no se proporciona imagen

    // Comprobamos si se ha proporcionado un archivo de imagen
    if (req.file && req.file.path) {
      // Si se proporciona un archivo, lo subimos a Cloudinary y obtenemos la URL
      imagen_url = await uploadImage(req.file.path);
    }

    // Preparar la consulta SQL para insertar un nuevo libro en la base de datos
    const query = 'INSERT INTO libros (id_usuario, titulo, comentario, imagen_url) VALUES (?, ?, ?, ?)';
    await promisePool.query(query, [id_usuario, titulo, comentario, imagen_url]);

    // Enviamos una respuesta exitosa con el estado 201 Created
    res.status(201).json({ message: 'Libro añadido correctamente' });
  } catch (error) {
    // Manejo de errores: si ocurre un error, lo registramos y enviamos una respuesta de error
    console.error('Error al añadir el libro:', error);
    res.status(500).json({ message: 'Error al añadir el libro' });
  }
};

// Exportamos el controlador para que pueda ser utilizado en otras partes de la aplicación
module.exports = addBook;
