import { toast } from 'react-toastify';
import { saveDiaryEntry } from "../../services/DiaryService";
import { useState } from "react";

/**
 * Hook personalizado `useTeachersDiaryForm` para gestionar la lógica del formulario
 * de registro diario de un niño. Este formulario permite a los educadores registrar
 * y guardar la información diaria de cada niño.
 *
 * @param {Object} props - Parámetros del hook.
 * @param {Object} props.kid - Objeto que contiene los datos del niño seleccionado.
 * @returns {Object} - Métodos y estados para mostrar el modal, manejar cambios de 
 *                     formulario y guardar la entrada en el diario.
 */
export const useTeachersDiaryForm = ({ kid }) => {
    // Estado para controlar la visibilidad del modal de formulario
    const [showModal, setShowModal] = useState(false);

    // Estado para almacenar los datos de entrada del formulario, representando 
    // los diferentes campos que serán completados por el educador
    const [formData, setFormData] = useState({
        desayuno: '',
        comida: '',
        merienda: '',
        siesta_mañana: '',
        siesta_tarde: '',
        micciones: '',
        deposiciones: '',
        traer: '',
        comentarios: ''
    });

    // Muestra el modal del formulario
    const handleShow = () => setShowModal(true);
    
    // Oculta y cierra el modal, limpiando si es necesario
    const handleClose = () => {
        setShowModal(false);
    };
    const [loading, setLoading] = useState(false);
    /**
     * Maneja los cambios en los campos del formulario, actualizando `formData`
     * para reflejar los valores actuales de los campos en tiempo real.
     *
     * @param {Object} e - Evento de cambio en el campo del formulario.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    /**
     * Maneja la lógica de guardado del formulario al enviarlo, validando los
     * datos y mostrando mensajes de notificación según el resultado de la operación.
     */
    const handleSave = async (e) => {
        e.preventDefault()
        // Verifica si se ha seleccionado un niño antes de guardar
        if (!kid || !kid.id_niño) {
            console.error("No se ha seleccionado un niño.");
            return;
        }

        // Configura el objeto `data` a enviar, asignando valores o null según el campo
        const data = {
            id_niño: kid.id_niño,
            fecha: new Date().toISOString().slice(0, 10),  // Genera la fecha actual en formato YYYY-MM-DD
            desayuno: formData.desayuno || null,
            comida: formData.comida || null,
            merienda: formData.merienda || null,
            siesta_mañana: formData.siesta_mañana || null,
            siesta_tarde: formData.siesta_tarde || null,
            micciones: formData.micciones !== '' ? parseInt(formData.micciones, 10) : null,
            deposiciones: formData.deposiciones !== '' ? parseInt(formData.deposiciones, 10) : null,
            traer: formData.traer || null,
            comentarios: formData.comentarios || null
        };

        console.log('Datos a enviar:', data); // Para fines de depuración

        try {
            setLoading(true)
            // Envía los datos al servicio para guardarlos
            await saveDiaryEntry(data);
            toast.success(`Tu registro del día ${data.fecha} se ha guardado correctamente.`); // Muestra éxito
            handleClose(); // Cierra el modal después de guardar
        } catch (error) {
            // Muestra error en caso de fallo en el guardado y lo registra en la consola
            toast.error('Error al guardar los datos.');
            console.error('Error al guardar los datos:', error);
        }finally{
            setLoading(false)
        }
    };

    // Retorna funciones y estados clave para gestionar el formulario y su visibilidad
    return {
        handleShow,   // Función para abrir el modal
        handleChange, // Función para manejar los cambios de formulario
        handleClose,  // Función para cerrar el modal
        handleSave,   // Función para guardar el registro diario
        showModal,    // Estado que controla la visibilidad del modal
        formData,     // Estado con los datos del formulario
        setFormData,   // Función para actualizar los datos del formulario
        loading
    }
}
