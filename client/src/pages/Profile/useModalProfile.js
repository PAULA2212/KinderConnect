import { updateProfile } from '../../services/ProfileService';
import { toast } from 'react-toastify';
import { getCentros } from '../../services/KidProfileService';
import { useState, useEffect } from 'react';

/**
 * Custom Hook: useModalProfile
 * Este hook gestiona la lógica para el modal de perfil, incluida la obtención y actualización de datos
 * de perfil de usuario, así como el manejo de la visibilidad del modal y la gestión de la entrada del formulario.
 * 
 * @param {Function} reloadUser - Función para recargar la información del usuario después de actualizar el perfil.
 * @param {Function} setFormData - Función que actualiza el estado del formulario con los datos de perfil.
 * @param {Object} formData - Objeto que contiene los datos actuales del perfil del usuario.
 * @param {String} profileType - Tipo de perfil, que puede afectar la estructura de los datos a actualizar.
 * @param {String} userId - ID único del usuario para identificar el perfil que se está editando.
 */
export const useModalProfile = ({ reloadUser, setFormData, formData, profileType, userId }) => {
    
    // Estado que controla la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    
    // Estado que contiene los centros educativos disponibles
    const [centrosEducativos, setCentrosEducativos] = useState([]);
    
    // Hook de efecto para cargar los centros educativos cuando el hook se inicializa
    useEffect(() => {
        // Función asincrónica que obtiene la lista de centros educativos desde un servicio externo
        const fetchCentrosEducativos = async () => {
            try {
                const response = await getCentros(); // Asegúrate de que la ruta es correcta
                setCentrosEducativos(response.data); // Guarda los centros en el estado local
            } catch (error) {
                console.error('Error al obtener centros educativos:', error); // Manejo de errores en consola
            }
        };

        // Llamada inicial a la función de obtención de centros educativos
        fetchCentrosEducativos();
    }, []); // Dependencia vacía para ejecutar solo en montaje

    /**
     * Maneja cambios en los campos del formulario actualizando el estado del formulario (formData)
     * @param {Event} e - Evento que contiene el campo y valor actualizados
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // Actualiza el campo correspondiente en formData
        });
    };

    /**
     * Abre el modal estableciendo showModal en true
     */
    const handleEditClick = () => {
        setShowModal(true);
    };

    /**
     * Cierra el modal estableciendo showModal en false
     */
    const handleModalClose = () => {
        setShowModal(false);
    };

    /**
     * Maneja la lógica al enviar el formulario de edición de perfil.
     * Verifica el ID de usuario, construye los datos a enviar y llama a la función de actualización.
     * @param {Event} e - Evento submit del formulario
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento de recarga de la página

        // Determina el nombre del campo de ID correcto basado en el tipo de perfil
        const idField = profileType === 'progenitor' ? 'id_progenitor' : 'id_educador';

        // Verifica si el ID del usuario está disponible
        if (!userId) {
            console.error('Error: ID de perfil no disponible'); // Consola para facilitar el debug
            return;
        }

        // Construye el objeto de datos a actualizar, usando el ID y el tipo de perfil adecuado
        const data = {
            [idField]: userId, // Asigna el ID dinámicamente según el tipo de perfil
            profileType: profileType,
            nombre: formData.nombre,
            apellido_1: formData.apellido_1,
            apellido_2: formData.apellido_2,
            telefono: formData.telefono,
            direccion: formData.direccion,
            ocupacion: formData.ocupacion,
            especialidad: formData.especialidad,
            centro_educativo: formData.centro_educativo
        };

        try {
            // Llama al servicio para actualizar el perfil y muestra una notificación de éxito
            await updateProfile(data);
            toast.success("Perfil actualizado exitosamente");

            // Recarga la información del usuario en la interfaz y cierra el modal
            reloadUser();
            handleModalClose();
        } catch (error) {
            // Muestra una notificación de error si la actualización falla
            toast.error('Error al actualizar el perfil');
        }
    };

    // Retorna funciones y estados para controlar el modal y gestionar el formulario
    return {
        showModal,
        centrosEducativos,
        handleEditClick,
        handleFormSubmit,
        handleInputChange,
        handleModalClose
    };
}
