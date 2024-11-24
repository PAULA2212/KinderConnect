import { getGoals, saveGoal } from "../../services/GoalsServices";
import { useState, useEffect, useContext } from "react";
import { KidContext } from "../../Context/KidContext";
import { UserContext } from '../../Context/UserContext';

/**
 * Hook personalizado `usePersonalGoals`
 *
 * Este hook gestiona la lógica y el estado relacionados con los objetivos personales de un niño.
 * Se conecta con los contextos `KidContext` y `UserContext` para obtener datos del usuario y el niño,
 * y utiliza los servicios `getGoals` y `saveGoal` para interactuar con la API de objetivos.
 */
export const usePersonalGoals = () => {
    // Obtiene la información del usuario y el tipo de perfil desde el contexto `UserContext`
    const { user, profileType } = useContext(UserContext);
    // Obtiene la información del niño seleccionado desde el contexto `KidContext`
    const { kid } = useContext(KidContext);
    
    // Estado local para almacenar los objetivos del niño y la bandera de carga
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);

    //Boleeano para manejar la visibilidad del checkbox de la tabla
    const isEducator = user && profileType === 'educador';

    /**
     * Función para obtener los objetivos de la API en función del ID del niño.
     * Actualiza el estado `goals` con los datos recibidos y gestiona el estado `loading`
     * para indicar el progreso de la carga.
     */
    const fetchGoals = async () => {
        setLoading(true);
        try {
            setGoals([]);
            const response = await getGoals(kid.id_niño);
            setGoals(response.data);
        } catch (error) {
            console.error('Error fetching goals:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Hook de efecto que se activa al montar el componente y cada vez que cambia el niño seleccionado.
     * Si un niño está disponible en `kid`, llama a `fetchGoals` para cargar sus objetivos.
     */
    useEffect(() => {
        if (kid) {
            fetchGoals();
        }
    }, [kid]);

    /**
     * `handleAddGoal` gestiona la adición de nuevos objetivos.
     * Realiza una solicitud para guardar el nuevo objetivo, y recarga los objetivos actuales
     * llamando a `fetchGoals` para asegurar que la lista esté actualizada.
     */
    const handleAddGoal = async (goal) => {
        setLoading(true);
        try {
            await saveGoal(goal);
            fetchGoals(); // Actualiza la lista tras añadir un nuevo objetivo
        } catch (error) {
            console.error('Error saving goal:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * `handleGoalUpdate` permite actualizar la lista de objetivos desde un componente externo.
     * Llama a `fetchGoals` para recargar los objetivos y reflejar cualquier cambio en la lista.
     */
    const handleGoalUpdate = () => {
        fetchGoals(); // Refresca la lista de objetivos tras una actualización
    };

    return {
        handleAddGoal,
        handleGoalUpdate,
        user,
        profileType,
        goals,
        kid,
        isEducator
    }
}
