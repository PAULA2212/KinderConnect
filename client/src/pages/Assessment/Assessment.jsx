import { useContext } from 'react'; // Importa las dependencias necesarias
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el icono de FontAwesome
import { faEye } from '@fortawesome/free-solid-svg-icons'; // Importa el icono específico (ojo)
import ModalAssessment from './ModalAssessment'; // Importa el componente ModalAssessment
import ListAssessment from './ListAssessment'; // Importa el componente ListAssessment
import { KidContext } from '../../Context/KidContext'; // Importa el contexto de niños
import { UserContext } from '../../Context/UserContext'; // Importa el contexto de usuarios
import { useAssessment } from './useAssessment'; // Importa el custom hook

export default function Assessment() {
    const { kid } = useContext(KidContext); // Obtiene el niño seleccionado del contexto
    const { user, profileType } = useContext(UserContext); // Obtiene el usuario y el tipo de perfil del contexto

    // Usa el custom hook y pasa el id del niño
    const { assessments, loading, fetchAssessments } = useAssessment(kid ? kid.id_niño : null);

    // Función para manejar la actualización de evaluaciones
    const handleAssessmentUpdate = () => {
        fetchAssessments(); // Refresca la lista cuando se agregan nuevas evaluaciones
    };

    // Si no hay un niño seleccionado, muestra un mensaje
    if (!kid) {
        return (
            <>
                <h3 className='kinder-title'>
                    <FontAwesomeIcon icon={faEye} /> Evaluaciones
                </h3>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="kinder-title">
                <FontAwesomeIcon icon={faEye} /> Evaluaciones de {kid.nombre}
            </h1>
            {/* Si el usuario es un educador mostramos el modal para añadir evaluación */}
            {profileType === 'educador' && (
                <ModalAssessment kid={kid} user={user} onAssessmentUpdate={handleAssessmentUpdate} />
            )}
            
            {/* Muestra un mensaje de carga si se están recuperando los datos */}
            {loading ? (
                <div className="text-center">
                    <p>Cargando evaluaciones...</p> {/* Mensaje que se muestra durante la carga */}
                </div>
            ) : (
                <ListAssessment assessments={assessments} /> // Lista de evaluaciones cuando los datos están listos
            )}
        </>
    );
}
