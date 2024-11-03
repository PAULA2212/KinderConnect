// Importar la configuración de Cloudinary, que incluye la instancia de Cloudinary configurada con credenciales
const { cloudinary } = require('../config/cloudinaryConfig');

/**
 * Función para subir una imagen a Cloudinary.
 * @param {string} filePath - La ruta del archivo de imagen que se desea subir.
 * @returns {Promise<string>} - Devuelve una promesa que se resuelve con la URL segura de la imagen subida.
 * @throws {Error} - Lanza un error si ocurre algún problema durante la subida.
 */
const uploadImage = async (filePath) => {
  try {
    // Realiza la subida de la imagen utilizando la función de Cloudinary
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url; // Retorna la URL segura de la imagen en Cloudinary
  } catch (error) {
    // Manejo de errores en caso de que la subida falle
    console.error('Error al subir la imagen a Cloudinary:', error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Exportar la función para que pueda ser utilizada en otras partes de la aplicación
module.exports = uploadImage;
