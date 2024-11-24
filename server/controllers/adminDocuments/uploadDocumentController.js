// Importa el servicio de conexión a la base de datos
const promisePool = require('../../services/database'); 
// Importa el servicio para subir imágenes a Cloudinary
const uploadImage = require('../../services/uploadImageService'); 

// Controlador para subir archivos
const uploadFile = async (req, res) => {
    // Extrae el nombre del archivo y el ID del educador del cuerpo de la solicitud
    const { nombre, id_educador } = req.body; 
    const fecha_subida = new Date(); // Obtiene la fecha y hora actuales
    let file_url = null; // Variable para almacenar la URL del archivo subido

    try {
        // Verifica si hay un archivo en la solicitud y si su ruta es válida
        if (req.file && req.file.path) {
            // Llama al servicio de subida de imagen para subir el archivo a Cloudinary
            file_url = await uploadImage(req.file.path);

            // Verifica si la URL devuelta es válida
            if (!file_url) {
                // Si no se obtiene una URL válida, lanza un error
                throw new Error('Error al subir el archivo a Cloudinary.');
            }

            // Guarda la URL del archivo subido en la base de datos
            await promisePool.query("INSERT INTO documentos (nombre, url, fecha_subida, id_educador) VALUES (?, ?, ?, ?)", [nombre, file_url, fecha_subida, id_educador]);

            // Si la inserción es exitosa, envía una respuesta positiva
            res.status(201).json({
                success: true,
                message: 'Archivo subido y registrado correctamente.',
                file_url: file_url // Devuelve la URL del archivo subido
            });
        } else {
            // Si no se proporciona un archivo, devuelve un error con estado 400 (Bad Request)
            return res.status(400).json({
                success: false,
                message: 'No se proporcionó ningún documento.'
            });
        }
    } catch (error) {
        // Si ocurre algún error, lo registra en la consola y devuelve una respuesta con el mensaje de error
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al subir el archivo o registrar los datos.',
            error: error.message // Incluye el mensaje de error para mayor claridad
        });
    }
};

// Exporta la función uploadFile para su uso en otras partes de la aplicación
module.exports = uploadFile;
