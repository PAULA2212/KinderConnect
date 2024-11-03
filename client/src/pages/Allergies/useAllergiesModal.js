import { useState } from 'react'; // Importa useState para manejar el estado
import { addAllergen } from '../../services/AllergiesService'; // Importa la función para agregar alergias
import { toast } from 'react-toastify'; // Importa toast para mostrar mensajes de éxito o error

// Definición del hook useAllergiesModal que acepta un niño y una función callback
export const useAllergiesModal = (kid, onAddAllergy) => {
    // Estado para manejar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    // Estado para manejar el estado de carga al enviar la información
    const [loading, setLoading] = useState(false);
    // Estado para almacenar el alérgeno ingresado
    const [allergen, setAllergen] = useState(null);
    // Estado para almacenar el grado de la alergia
    const [grade, setGrade] = useState(null);

    // Función para mostrar el modal al hacer clic en el botón "Añadir alergia"
    const handleShow = () => setShowModal(true);

    // Función para cerrar el modal
    const handleClose = () => setShowModal(false);

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Prepara los datos para ser enviados al servidor
        const data = {
            allergen: allergen, // El alérgeno ingresado
            grade: grade,       // El grado de la alergia
            idKid: kid.id_niño  // ID del niño relacionado con la alergia
        };

        // Indica que se está en proceso de carga
        setLoading(true);

        try {
            // Llama a la función del servicio para agregar una nueva alergia
            await addAllergen(data);
            // Muestra un mensaje de éxito
            toast.success('La nueva alergia se agregó correctamente', { autoClose: 3000 });
            // Llama a la función callback para refrescar la lista de alergias
            onAddAllergy();
            // Cierra el modal tras el éxito
            handleClose();
        } catch (error) {
            // Manejo de errores, muestra un mensaje de error
            console.error('Error al agregar la alergia:', error);
            toast.error('Ha habido un error al intentar agregar la alergia', { autoClose: 3000 });
        } finally {
            // Finaliza el estado de carga, ya sea al completar con éxito o con error
            setLoading(false);
        }
    };

    // Devuelve todos los estados y funciones que el componente principal necesitará
    return {
        showModal,
        loading,
        allergen,
        grade,
        handleShow,
        handleClose,
        handleSubmit,
        setAllergen,
        setGrade
    };
};
