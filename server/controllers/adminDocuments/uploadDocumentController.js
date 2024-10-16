const promisePool = require('../../services/database'); // Conexión con tu base de datos
const uploadImage = require('../../services/uploadImageService'); // Servicio para subir la imagen a Cloudinary

// Controlador para subir archivos
const uploadFile = async (req, res) => {
    const { nombre, id_educador } = req.body; // ID del niño relacionado con el archivo subido
    const fecha_subida = new Date();
    let file_url = null;

    try {
        if (req.file && req.file.path) {
            // Subimos el archivo a Cloudinary
            file_url = await uploadImage(req.file.path);

            if (!file_url) {
                // Si no se obtiene una URL válida después de subir la imagen, lanzamos un error
                throw new Error('Error al subir el archivo a Cloudinary.');
            }


        // Guardar la URL del archivo subido en la base de datos
        await promisePool.query("INSERT INTO documentos (nombre,url,fecha_subida,id_educador) VALUES (?,?,?,?)", [nombre, file_url, fecha_subida, id_educador]);

        // Si la inserción es exitosa, enviamos una respuesta positiva
        res.status(200).json({
            success: true,
            message: 'Archivo subido y registrada correctamente.',
            file_url: file_url
        });
        } else {
        // Si no se proporciona un archivo, devolvemos un error
        return res.status(400).json({
            success: false,
            message: 'No se proporcionó ninguna documento.'
            });
         }
    } catch (error) {
    // Si ocurre algún error, devolvemos una respuesta con el mensaje de error
    console.error('Error:', error);
    return res.status(500).json({
        success: false,
        message: 'Ocurrió un error al subir el archivo o registrar los datos.',
        error: error.message
    });
}
};
module.exports = uploadFile;
