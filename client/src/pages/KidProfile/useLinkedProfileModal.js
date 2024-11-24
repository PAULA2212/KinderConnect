import { useState } from 'react';
import { linkingKid } from '../../services/KidProfileService';
import { toast } from 'react-toastify';

/**
 * Custom Hook para gestionar la lógica de vinculación de perfiles de niños.
 * 
 * Proporciona funcionalidades para mostrar el modal de vinculación, gestionar el código único
 * y realizar la vinculación del perfil del niño al perfil del usuario (progenitor o educador).
 * 
 * @param {Function} fetchNiños - Función para refrescar la lista de niños vinculados después de un cambio.
 * @param {Object} user - Información del usuario actual, contiene ID y tipo de usuario.
 * @param {string} profileType - Indica el tipo de perfil del usuario actual (ej., "progenitor" o "educador").
 * @returns {Array} Un arreglo que contiene el estado del modal, la función para mostrar el modal y la función para vincular niños.
 */
export default function useLinkedProfileModal(fetchNiños, user, profileType) {
    const [showModal, setShowModal] = useState(false); // Estado que controla la visibilidad del modal
    const [uniqueCode, setUniqueCode] = useState(""); // Estado que almacena el código único ingresado
    const [loading, setLoading] = useState(false);

    /**
     * Muestra el modal de vinculación.
     * 
     * @returns {void}
     */
    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
    };

    /**
     * Envía la solicitud de vinculación del niño al perfil del usuario, usando el código de vinculación ingresado.
     * Llama a `fetchNiños` para actualizar la lista de niños tras una vinculación exitosa.
     * 
     * @async
     * @returns {Promise<void>}
     * @throws {Error} Si ocurre un error durante la vinculación.
     */
    const handleAddKids = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            // Construye los datos de solicitud basados en el tipo de usuario (progenitor o educador)
            const data = {
                id: profileType === "progenitor" ? user.id_progenitor : user.id_educador,
                unique_code: uniqueCode
            };

            // Realiza la vinculación llamando al servicio correspondiente
            await linkingKid(profileType, data);
            toast.success('Perfil del niño vinculado correctamente', { autoClose: 3000 });

            // Actualiza la lista de niños y resetea el formulario después de la vinculación
            fetchNiños();
            setShowModal(false); // Oculta el modal
        } catch (error) {
            console.error('Error al añadir un niño al progenitor:', error);
            toast.error('No se ha podido vincular el perfil del niño', { autoClose: 3000 });
        }finally{
            setLoading(false)
        }
    };

    return [showModal, handleClose, handleShow, handleAddKids, uniqueCode, setUniqueCode, loading]; // Retorna el estado y funciones necesarias
}
