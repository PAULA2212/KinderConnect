// hooks/useMilestonesTable.js
import { useContext, useEffect, useState } from 'react';
import { KidContext } from '../../Context/KidContext';
import { calculateAgeAtMilestone } from '../../utils/calculateAge';
import { triggerConfetti } from '../../utils/confetti';
import jsPDF from 'jspdf';
import { fetchMilestonesForKid, saveMilestone } from '../../services/MilestonesService';

/**
 * Custom hook para manejar la lógica relacionada con los hitos observados
 * de un niño específico, incluyendo la obtención de hitos, el guardado
 * de hitos alcanzados y la generación de informes en PDF.
 *
 * @returns {Object} - Contiene hitos observados, error, loading, 
 *                     función para guardar hitos, manejar el cambio de checkbox,
 *                     y generar informes.
 */
const useMilestonesTable = () => {
    const { kid } = useContext(KidContext); // Obtener el contexto del niño
    const [observedMilestones, setObservedMilestones] = useState([]); // Estado para los hitos observados
    const [error, setError] = useState(null); // Estado para manejar errores
    const [loading, setLoading] = useState(false); // Estado de carga

    const idKid = kid?.id_niño; // ID del niño


    /**
     * Guarda un hito alcanzado para un niño específico.
     *
     * @param {number} idKid - ID del niño.
     * @param {number} id_hito - ID del hito a guardar.
     */
    const saveMilestoneForKid = async (idKid, id_hito) => {
        if (!kid?.fecha_nac) return; // Retornar si no hay fecha de nacimiento

        const ageAchieved = calculateAgeAtMilestone(kid.fecha_nac); // Calcular edad al alcanzar el hito
        try {
            await saveMilestone(idKid, id_hito, ageAchieved);
            triggerConfetti(); // Activar confetti al guardar con éxito
            return ageAchieved; // Retornar la edad alcanzada
        } catch (error) {
            console.error('Error saving milestone for kid:', error);
            setError('Failed to save milestone. Please try again later.'); // Manejo de errores
        }
    };

    /**
     * Maneja el cambio de estado de la casilla de verificación para un hito.
     *
     * @param {number} milestoneId - ID del hito que se está observando.
     */
    const handleCheckboxChange = async (milestoneId) => {
        if (!idKid) return; // Retornar si no hay ID del niño
        const ageAchieved = await saveMilestoneForKid(idKid, milestoneId); // Guardar el hito y obtener la edad alcanzada
        setObservedMilestones((prevObservedMilestones) => [
            ...prevObservedMilestones.filter((m) => m.id_hito !== milestoneId),
            { id_hito: milestoneId, edad_observado: ageAchieved } // Actualizar la lista de hitos observados
        ]);
    };

    /**
     * Genera un informe en PDF de los hitos observados del niño.
     *
     * @param {Array} milestones - Lista de hitos para incluir en el informe.
     */
    const generateReport = (milestones) => {
        const doc = new jsPDF(); // Crear una nueva instancia de jsPDF

        // Título del documento
        doc.setFontSize(18);
        doc.text('Informe de Hitos del Niño', 10, 10);

        // Información del niño
        doc.setFontSize(12);
        doc.text(`Nombre: ${kid?.nombre} ${kid?.apellido_1} ${kid?.apellido_2}`, 10, 20);
        doc.text(`Fecha de Nacimiento: ${new Date(kid?.fecha_nac).toLocaleDateString()}`, 10, 30);

        // Tabla de hitos observados y pendientes
        let yPosition = 40;
        doc.setFontSize(10);
        doc.text('Hitos:', 10, yPosition);

        // Agregar hitos al documento
        milestones.forEach((milestone, index) => {
            yPosition += 10; // Incrementar la posición Y para la próxima línea
            const observed = observedMilestones.find(m => m.id_hito === milestone.id_hito);

            if (observed) {
                doc.text(
                    `${index + 1}. ${milestone.descripcion} - Observado a los ${observed.edad_observado} meses`,
                    10,
                    yPosition
                );
            } else {
                doc.text(`${index + 1}. ${milestone.descripcion} - Pendiente de observar`, 10, yPosition);
            }
        });

        // Guardar el PDF
        doc.save(`informe_hitos_${kid?.nombre}.pdf`);
    };

    // Efecto para cargar los hitos observados al montar el componente
    useEffect(() => {
        const loadObservedMilestones = async () => {
            if (idKid && !loading) {
                setLoading(true); // Indicar que se está cargando
                try {
                    const data = await fetchMilestonesForKid(idKid);
                    setObservedMilestones(data); // Establecer los hitos observados en el estado
                } catch (error) {
                    console.error('Error fetching milestones for kid:', error);
                } finally {
                    setLoading(false); // Finalizar la carga
                }
            }
        };

        loadObservedMilestones(); // Llamar a la función de carga
    }, [kid]);

    return {
        observedMilestones,
        error,
        handleCheckboxChange, // Devolver la función de manejo de cambios
        generateReport,
    };
};

export default useMilestonesTable; // Exportar el hook para su uso en otros componentes
