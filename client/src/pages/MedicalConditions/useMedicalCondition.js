// useMedicalConditions.js
import { useContext, useEffect, useState } from "react";
import { KidContext } from "../../Context/KidContext";
import { getConditions } from "../../services/MedicalConditionsService";

/**
 * useMedicalConditions:
 * Custom hook que gestiona la lógica para cargar y actualizar las condiciones médicas
 * asociadas a un niño seleccionado en el contexto.
 *
 * @returns {Object} - Estado y funciones relacionados con las condiciones médicas
 */
export function useMedicalCondition() {
    const { kid } = useContext(KidContext);
    const [conditions, setConditions] = useState([]);

    /**
     * fetchConditions:
     * Función asíncrona que obtiene las condiciones médicas del niño seleccionado desde el servicio.
     */
    const fetchConditions = async () => {
        if (kid && kid.id_niño) {
            try {
                const data = await getConditions(kid.id_niño);
                console.log("Datos recibidos:", data);
                setConditions(data);
            } catch (error) {
                console.error("Error al obtener condiciones:", error);
            }
        }
    };

    // Llama a fetchConditions cuando cambia el niño seleccionado
    useEffect(() => {
        fetchConditions();
    }, [kid]);

    // Función que permite actualizar las condiciones tras añadir una nueva
    const handleAddCondition = async () => {
        await fetchConditions();
    };

    return { kid, conditions, fetchConditions, handleAddCondition };
}
