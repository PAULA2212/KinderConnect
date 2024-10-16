const uploadImage = require('../../services/uploadImageService');
const promisePool = require('../../services/database');

const addBook = async (req, res) => {
  try {
    const { titulo, comentario, id_usuario } = req.body;
    let imagen_url = null; // Valor por defecto si no se proporciona imagen

    if (req.file && req.file.path) {
      // Si se proporciona un archivo, subir la imagen a Cloudinary
      imagen_url = await uploadImage(req.file.path);
    }

    // Guardar los datos del libro en la base de datos
    const query = 'INSERT INTO libros (id_usuario, titulo, comentario, imagen_url) VALUES (?, ?, ?, ?)';
    await promisePool.query(query, [id_usuario, titulo, comentario, imagen_url]);

    res.status(201).json({ message: 'Libro añadido correctamente' });
  } catch (error) {
    console.error('Error al añadir el libro:', error);
    res.status(500).json({ message: 'Error al añadir el libro' });
  }
};

module.exports = addBook;
