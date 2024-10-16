require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración de Multer Storage, permitiendo subir imágenes y PDFs
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'default'; // Puedes especificar carpetas según tus necesidades

    // Verifica el tipo de archivo para establecer el tipo de recurso adecuado
    if (file.mimetype === 'application/pdf') {
      return {
        folder: 'pdf_files', // Carpeta donde se guardarán los PDFs
        resource_type: 'raw', // Necesario para manejar archivos PDF
        format: 'pdf', // Asegura que solo PDF sea permitido
      };
    }

    return {
      folder: 'images', // Carpeta donde se guardarán las imágenes
      resource_type: 'image', // Se manejarán como imágenes
      allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos para imágenes
    };
  },
});

// Configuración de Multer para manejar la subida de archivos
const upload = multer({ storage });

module.exports = { cloudinary, upload };
