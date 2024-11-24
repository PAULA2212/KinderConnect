import { useState } from "react";
import { addDiaryEntry, saveDiaryEntry } from "../../services/DiaryService";
import { toast } from 'react-toastify';

/**
 * Custom Hook `useParentsDiaryForm`
 * Este hook encapsula la lógica y el estado necesarios para manejar el formulario del diario de los padres.
 * Proporciona funcionalidades para mostrar/ocultar el modal, capturar los datos de medicación y comentarios,
 * y guardar la entrada en el diario mediante un servicio de API.
 *
 * @returns {Object} Métodos y estados para controlar el formulario de diario.
 */
export const useParentsDiaryForm = ({kid}) => {
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);

    // Estado para almacenar el valor del campo de medicación
    const [medicacion, setMedicacion] = useState('');

    // Estado para almacenar el valor del campo de comentarios
    const [comentarios, setComentarios] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Función `handleShow`
     * Muestra el modal estableciendo el estado `showModal` a `true`.
     */
    const handleShow = () => setShowModal(true);

    /**
     * Función `handleClose`
     * Cierra el modal estableciendo el estado `showModal` a `false`.
     */
    const handleClose = () => {
        setShowModal(false);
    };

    /**
     * Función `handleSave`
     * Guarda la entrada del diario en la base de datos si hay un niño seleccionado.
     * En caso de éxito, muestra una notificación y cierra el modal.
     */
    const handleSave = async (e) => {
        e.preventDefault();
        // Validación: Comprueba que haya un niño seleccionado antes de proceder
        if (!kid || !kid.id_niño) {
            console.error("No se ha seleccionado un niño.");
            return;
        }

        // Construcción del objeto de datos del diario
        const data = {
            id_niño: kid.id_niño,
            fecha: new Date().toISOString().slice(0, 10), // Fecha actual en formato ISO (YYYY-MM-DD)
            medicacion,
            comentarios
        };

        try {
            setLoading(true)
            // Llama a `saveDiaryEntry` para guardar los datos en el backend
            await addDiaryEntry(data);
            
            // Obtiene la fecha en formato legible para el mensaje de éxito
            const formattedDate = new Date().toLocaleDateString();
            toast.success(`Tu registro del día ${formattedDate} se ha guardado correctamente.`, { autoClose: 3000 });
            
            // Cierra el modal tras el guardado exitoso
            handleClose();
        } catch (error) {
            // Muestra un mensaje de error si el guardado falla
            toast.error('Error al guardar el registro. Por favor, intente nuevamente.', { autoClose: 3000 });
        } finally{
            setLoading(false)
        }
    };

    // Retorna todos los métodos y estados necesarios para controlar el formulario desde el componente
    return {
        handleSave,
        handleShow,
        handleClose,
        showModal,
        medicacion,
        comentarios,
        setMedicacion,
        setComentarios,
        loading
    };
};
