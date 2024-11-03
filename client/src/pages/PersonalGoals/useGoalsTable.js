import { useState, useEffect } from 'react';
import { getTeachersName, setGoalState } from '../../services/GoalsServices';

/**
 * Hook personalizado `useGoalsTable`
 *
 * Este hook maneja la lógica de obtención de nombres de educadores y el cambio de estado de objetivos
 * en un componente de tabla. Utiliza los servicios `getTeachersName` y `setGoalState` para
 * interactuar con la API, proporcionando datos actualizados y permitiendo que el componente principal
 * gestione cambios en el estado de los objetivos.
 *
 * @param {Array} goals - Array de objetivos que incluye cada objetivo con el ID de educador.
 * @param {Function} onGoalUpdate - Función de callback para notificar cuando se actualiza un objetivo.
 */
export const useGoalsTable = ({goals, onGoalUpdate}) => {
    
    // Estado para almacenar nombres de educadores con el formato { id_educador: 'nombre apellido' }
    const [teacherNames, setTeacherNames] = useState({});

    // Efecto para cargar los nombres de los educadores al montar el componente o actualizar objetivos
    useEffect(() => {
        const fetchTeacherNames = async () => {
            // Obtener los IDs únicos de los educadores presentes en los objetivos
            const uniqueEducators = [...new Set(goals.map(goal => goal.id_educador))];
            const names = {};

            for (const id of uniqueEducators) {
                try {
                    // Solicitar el nombre del educador según su ID y almacenarlo en el objeto `names`
                    const response = await getTeachersName(id);
                    names[id] = `${response.data.nombre} ${response.data.apellido_1}`;
                } catch (error) {
                    // En caso de error, asignar un valor por defecto y registrar el error en consola
                    console.error(`Error fetching teacher with ID ${id}:`, error);
                    names[id] = 'Nombre no disponible';
                }
            }

            // Actualizar el estado con los nombres obtenidos
            setTeacherNames(names);
        };

        // Ejecutar la obtención de nombres si existen objetivos
        if (goals.length > 0) {
            fetchTeacherNames();
        }
    }, [goals]); // Dependencia: se ejecuta cada vez que cambia la lista de objetivos

    /**
     * Función `changeGoalState`
     *
     * Cambia el estado de un objetivo específico mediante su ID y el nuevo estado.
     * En caso de éxito, invoca el callback `onGoalUpdate` para notificar al componente padre.
     *
     * @param {number} goalId - ID del objetivo a actualizar
     * @param {string} newState - Nuevo estado del objetivo
     */
    const changeGoalState = async (goalId, newState) => {
        try {
            await setGoalState(goalId, newState);

            // Si `onGoalUpdate` está definido, invocar para refrescar los objetivos en el componente padre
            if (onGoalUpdate) onGoalUpdate();
        } catch (error) {
            console.error('Error updating goal state:', error);
        }
    };

    /**
     * Función `handleCheckboxChange`
     *
     * Cambia el estado de un objetivo a 'conseguido' cuando el estado actual es 'pendiente'.
     * Utiliza `changeGoalState` para realizar la actualización.
     *
     * @param {number} goalId - ID del objetivo cuyo estado va a cambiar
     */
    const handleCheckboxChange = async (goalId) => {
        const goal = goals.find(g => g.id_registro === goalId);
        
        // Solo cambia el estado si el objetivo está en estado 'pendiente'
        if (goal.estado === 'pendiente') {
            const newState = 'conseguido';
            await changeGoalState(goalId, newState);
        }
    };

    return {
        handleCheckboxChange,
        teacherNames
    }
}
