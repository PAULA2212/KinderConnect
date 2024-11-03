import { useState } from 'react'; // Importa useState para manejar el estado
import { toast } from 'react-toastify'; // Importa toast para mostrar notificaciones
import { addAssessment } from '../../services/AssessmentService'; // Importa el servicio para agregar evaluaciones

// Custom hook para manejar la lógica del modal de evaluación
export function useAssessmentModal(kid, user, onAssessmentUpdate) {
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    // Estado para almacenar el contenido de la evaluación
    const [content, setContent] = useState('');
    // Estado para manejar el estado de carga al enviar la evaluación
    const [loading, setLoading] = useState(false);

    // Función para mostrar el modal al hacer clic en el botón "Añadir evaluación"
    const handleShow = () => setShowModal(true);
    
    // Función para cerrar el modal
    const handleClose = () => setShowModal(false);

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        setLoading(true); // Indica que la operación de guardado está en progreso

        // Prepara los datos que se enviarán al servidor
        const data = {
            idTeacher: user.id_educador, // ID del educador
            idKid: kid.id_niño,           // ID del niño
            date: new Date(),             // Fecha actual
            content: content               // Contenido de la evaluación ingresado por el usuario
        };

        try {
            // Llama al servicio para agregar la evaluación
            await addAssessment(data);
            // Muestra un mensaje de éxito al guardar la evaluación
            toast.success('La evaluación se guardó correctamente', { autoClose: 3000 });
            // Restablece el contenido para limpiar el campo de entrada
            setContent('');
            // Cierra el modal tras guardar con éxito
            setShowModal(false);
            // Si se proporciona, llama a la función de actualización para refrescar la lista de evaluaciones
            if (onAssessmentUpdate) onAssessmentUpdate();
        } catch (error) {
            // Manejo de errores, muestra un mensaje de error en caso de fallo
            console.error('Error al guardar la evaluación:', error);
            toast.error('Ha habido un error al guardar la evaluación.', { autoClose: 3000 });
        } finally {
            // Finaliza el estado de carga, ya sea al completar con éxito o con error
            setLoading(false);
        }
    };

    // Retorna el estado y las funciones para ser utilizadas en el componente
    return {
        showModal,
        handleShow,
        handleClose,
        content,
        setContent,
        loading,
        handleSubmit
    };
}
