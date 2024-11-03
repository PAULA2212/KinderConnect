import { useState, useEffect } from 'react'; // Importa los hooks necesarios
import { getAssessment } from '../../services/AssessmentService'; // Importa el servicio para obtener evaluaciones

// Define el custom hook
export const useAssessment = (kidId) => {
    const [assessments, setAssessments] = useState([]); // Estado para almacenar las evaluaciones
    const [loading, setLoading] = useState(false); // Estado para manejar la carga

    // Función para obtener las evaluaciones del niño
    const fetchAssessments = async () => {
        setLoading(true); // Inicia la carga
        try {
            const response = await getAssessment(kidId); // Llama al servicio para obtener evaluaciones
            setAssessments(response.data); // Actualiza el estado con los datos recibidos
        } catch (error) {
            console.error('No se han podido obtener las evaluaciones', error); // Manejo de errores
            setAssessments([]); // Si hay un error, establece evaluaciones como vacío
        } finally {
            setLoading(false); // Finaliza la carga
        }
    };

    // Llama a la función cuando el id del niño cambia
    useEffect(() => {
        if (kidId) { // Solo obtiene evaluaciones si hay un id de niño
            fetchAssessments();
        }
    }, [kidId]);

    return { assessments, loading, fetchAssessments }; // Retorna las evaluaciones, estado de carga y función de actualización
};
