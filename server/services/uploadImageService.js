const {cloudinary} = require('../config/cloudinaryConfig');

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url; // URL de la imagen en Cloudinary
    console.log('Upload Result:', result);
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    throw error;
  }
};

module.exports = uploadImage;