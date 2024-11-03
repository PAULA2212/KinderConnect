import { useState } from "react";
import { toast } from "react-toastify";
import { addImage } from "../../services/GalleryService";

/**
 * Hook personalizado `useModalGallery`
 * 
 * Este hook gestiona la lógica de subida de imágenes en un modal, incluyendo:
 * - Estado de visibilidad del modal.
 * - Manejo de carga de imágenes.
 * - Funcionalidad para subir imágenes con mensajes de éxito/error.
 * 
 * @param {Object} kid - Datos del niño, incluyendo su ID.
 * @param {Function} onAddImage - Función de callback para actualizar la galería tras la subida de una imagen.
 * 
 * @returns {Object} - Estados y funciones necesarias para manejar el modal de galería.
 */
export const useModalGallery = (kid, onAddImage) => {
    const [showModal, setShowModal] = useState(false);   // Estado para la visibilidad del modal
    const [image, setImage] = useState(null);            // Estado para almacenar la imagen seleccionada
    const [loading, setLoading] = useState(false);       // Estado de carga durante la subida de imagen

    /**
     * Muestra el modal estableciendo el estado `showModal` en `true`.
     */
    const handleShow = () => setShowModal(true);

    /**
     * Cierra el modal y limpia la imagen seleccionada.
     */
    const handleClose = () => {
        setShowModal(false);
        setImage(null); // Limpia la imagen seleccionada al cerrar
    };

    /**
     * Maneja la subida de imagen y los mensajes de éxito/error.
     * 
     * @param {Event} event - Evento de envío del formulario.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifica si se ha seleccionado una imagen antes de continuar
        if (!image) {
            toast.error("Por favor, selecciona una imagen.", { autoClose: 3000 });
            return;
        }

        setLoading(true); // Activa el estado de carga durante el proceso

        // FormData para enviar la imagen y el ID del niño
        const formData = new FormData();
        formData.append("imagen", image);
        formData.append("kid_id", kid.id_niño);

        try {
            // Intenta subir la imagen a través del servicio
            await addImage(formData);
            toast.success("Imagen subida correctamente.", { autoClose: 3000 });

            // Ejecuta la función de callback para actualizar la galería
            onAddImage();
            handleClose(); // Cierra el modal tras la subida exitosa
        } catch (error) {
            // Muestra un mensaje de error en caso de fallo
            toast.error("Hubo un error al subir la imagen.", { autoClose: 3000 });
            console.error("Error al subir la imagen:", error);
        } finally {
            setLoading(false); // Desactiva el estado de carga al finalizar
        }
    };

    return {
        showModal,
        image,
        loading,
        handleShow,
        handleClose,
        handleSubmit,
        setImage
    };
};
