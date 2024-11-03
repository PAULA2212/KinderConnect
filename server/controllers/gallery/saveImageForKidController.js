const promisePool = require('../../services/database'); // Para ejecutar consultas a la base de datos
const uploadImage = require('../../services/uploadImageService'); // Servicio para subir la imagen a Cloudinary

// Controlador para agregar una imagen para un niño específico
const addImageForKid = async (req, res) => {
    const { kid_id } = req.body;  // El id del niño
    const uploadDate = new Date(); // Fecha actual para la subida
    let imagen_url = null;  // Inicializamos la URL de la imagen como null

    try {
        // Verificamos si hay un archivo en la solicitud
        if (req.file && req.file.path) {
            // Subimos la imagen a Cloudinary
            imagen_url = await uploadImage(req.file.path);
            
            // Verificamos si se obtuvo una URL válida después de subir la imagen
            if (!imagen_url) {
                // Si no se obtiene una URL válida, lanzamos un error
                throw new Error('Error al subir la imagen a Cloudinary.');
            }

            // Realizamos la inserción en la base de datos con la URL de la imagen
            const [result] = await promisePool.query(`
                INSERT INTO multimedia (id_niño, URL, fecha_subida)
                VALUES (?, ?, ?)
            `, [kid_id, imagen_url, uploadDate]);

            // Si la inserción es exitosa, enviamos una respuesta positiva
            res.status(201).json({ // Cambiado a 201
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
            error: error.message // Mensaje específico del error
        });
    }
};

module.exports = addImageForKid; // Exporta el controlador para su uso en otras partes de la aplicación
