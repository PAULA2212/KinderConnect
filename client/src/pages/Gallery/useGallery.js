import { useContext, useEffect, useState } from "react";
import { KidContext } from "../../Context/KidContext";
import { UserContext } from "../../Context/UserContext";
import { getImagesForKid } from "../../services/GalleryService";

/**
 * Hook personalizado `useGallery`
 * 
 * Este hook encapsula toda la lógica necesaria para gestionar la galería de imágenes de un niño,
 * incluyendo la obtención de imágenes, el filtrado por fecha y el manejo de estados.
 * 
 * @returns {Object} - Estados y funciones para la galería de imágenes
 */
export const useGallery = () => {
    const { kid } = useContext(KidContext);               // Accede al niño seleccionado en el contexto
    const { profileType } = useContext(UserContext);      // Accede al perfil del usuario en el contexto
    const [images, setImages] = useState([]);             // Estado para almacenar todas las imágenes del niño
    const [filteredImages, setFilteredImages] = useState([]); // Estado para almacenar imágenes filtradas por fecha
    const [searchTerm, setSearchTerm] = useState("");     // Estado para el término de búsqueda de fecha

    /**
     * `fetchImages` - Función para obtener las imágenes asociadas al niño actual.
     * 
     * Llama a `getImagesForKid` para obtener las imágenes desde el servicio y 
     * las almacena en el estado. Solo se ejecuta si existe un niño seleccionado.
     */
    const fetchImages = async () => {
        if (kid && kid.id_niño) {
            try {
                const data = await getImagesForKid(kid.id_niño);
                setImages(data); // Establece las imágenes en el estado
            } catch (error) {
                console.error('Error al obtener imágenes:', error);
            }
        }
    };

    /**
     * `handleAddImage` - Función para actualizar la lista de imágenes.
     * 
     * Se llama tras añadir una imagen nueva para asegurar que la lista esté actualizada.
     */
    const handleAddImage = async () => {
        await fetchImages(); // Vuelve a obtener las imágenes para actualizar la lista
    };

    /**
     * Filtra las imágenes por la fecha proporcionada en el campo de búsqueda.
     * Cuando `searchTerm` es una fecha válida, las imágenes se filtran y se 
     * establecen en `filteredImages`.
     */
    useEffect(() => {
        if (searchTerm) {
            const filtered = images.filter(image => 
                new Date(image.fecha_subida).toISOString().slice(0, 10) === searchTerm
            );
            setFilteredImages(filtered);
        } else {
            setFilteredImages([]); // Si no hay filtro, no muestra imágenes en el carrusel
        }
    }, [searchTerm, images]);

    /**
     * Obtiene las imágenes cuando el componente se monta o cambia el niño seleccionado.
     */
    useEffect(() => {
        fetchImages();
    }, [kid]);

    return {
        kid,
        profileType,
        images,
        filteredImages,
        searchTerm,
        setSearchTerm,
        handleAddImage,
    };
};
