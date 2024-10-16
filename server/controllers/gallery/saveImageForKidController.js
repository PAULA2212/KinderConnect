const promisePool = require('../../services/database'); // Para ejecutar consultas a la base de datos
const uploadImage = require('../../services/uploadImageService'); // Servicio para subir la imagen a Cloudinary

const addImageForKid = async (req, res) => {
    const { kid_id } = req.body;  // El id del niño
    const uploadDate = new Date();
    let imagen_url = null;  // Inicializamos la URL de la imagen como null

    try {
        // Verificamos si hay un archivo en la solicitud
        if (req.file && req.file.path) {
            // Subimos la imagen a Cloudinary
            imagen_url = await uploadImage(req.file.path);
            
            if (!imagen_url) {
                // Si no se obtiene una URL válida después de subir la imagen, lanzamos un error
                throw new Error('Error al subir la imagen a Cloudinary.');
            }

            // Si la imagen se subió correctamente, realizamos la inserción en la base de datos
            const [result] = await promisePool.query(`
                INSERT INTO multimedia (id_niño, URL, fecha_subida)
                VALUES (?, ?, ?)
            `, [kid_id, imagen_url, uploadDate]);

            // Si la inserción es exitosa, enviamos una respuesta positiva
            res.status(200).json({ 
                success: true, 
                message: 'Imagen subida y registrada correctamente.',
                imagen_url: imagen_url 
            });
        } else {
            // Si no se proporciona un archivo, devolvemos un error
            return res.status(400).json({ 
                success: false, 
                message: 'No se proporcionó ninguna imagen.' 
            });
        }
    } catch (error) {
        // Si ocurre algún error, devolvemos una respuesta con el mensaje de error
        console.error('Error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Ocurrió un error al subir la imagen o registrar los datos.',
            error: error.message
        });
    }
};

module.exports = addImageForKid;
