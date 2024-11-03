import { useContext, useEffect, useState } from 'react';
import { KidContext } from '../../Context/KidContext';
import { fetchMilestone } from '../../services/MilestonesService';

/**
 * Custom hook para manejar los hitos de desarrollo.
 * Permite obtener, filtrar y almacenar los hitos según el niño seleccionado.
 *
 * @returns {Object} - Objeto que contiene los hitos, estado de carga y funciones de filtrado.
 */
const useDevelopmentalMilestones = () => {
    const [milestones, setMilestones] = useState([]); // Estado para almacenar los hitos
    const [loading, setLoading] = useState(true); // Estado de carga
    const { kid } = useContext(KidContext); // Obtener información del niño desde el contexto

    /**
     * Función para obtener los hitos desde el servicio
     */
    const fetchMilestones = async () => {
        try {
            const response = await fetchMilestone(); // Llamada al servicio para obtener hitos
            setMilestones(response.data); // Almacenar hitos en el estado
        } catch (error) {
            console.error('Error fetching milestones:', error);
        } finally {
            setLoading(false); // Cambiar estado de carga a false al finalizar
        }
    };

    /**
     * Efecto para cargar hitos cuando el componente se monta o cuando se selecciona un niño.
     */
    useEffect(() => {
        if (kid) {
            fetchMilestones(); // Llamar a la función para obtener hitos si hay un niño seleccionado
        } else {
            setMilestones([]); // Limpiar los hitos si no hay un niño seleccionado
            setLoading(false); // Asegurarse de que el estado de carga se establezca en false
        }
    }, [kid]); // Dependencia del efecto: cambia cuando se selecciona un niño

    /**
     * Función para filtrar hitos por rango de edad.
     *
     * @param {string} ageRange - Rango de edad para filtrar los hitos.
     * @returns {Array} - Lista de hitos filtrados.
     */
    const filterMilestonesByAge = (ageRange) => {
        return milestones.filter((milestone) => milestone.edad_esperada === ageRange);
    };

    // Retornar el estado y funciones necesarias
    return { kid, loading, filterMilestonesByAge };
};

export default useDevelopmentalMilestones;
