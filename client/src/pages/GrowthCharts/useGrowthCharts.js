import { useState, useEffect } from "react";
import { getHeights, getWeights } from "../../services/GrowthChartsService";

/**
 * Hook personalizado para gestionar la obtención y el estado de los datos de crecimiento del niño (peso y altura).
 * 
 * @param {Object} kid - El objeto niño seleccionado, necesario para obtener su ID.
 * 
 * @returns {Object} - Contiene los estados y métodos relacionados con el crecimiento del niño.
 */
const useGrowthCharts = (kid) => {
    const [valuesWeight, setValuesWeight] = useState([]); // Estado para almacenar datos de peso
    const [valuesHeight, setValuesHeight] = useState([]); // Estado para almacenar datos de altura

    // Función para obtener datos de peso del niño
    const getWeightsforKid = async () => {
        const idKid = kid?.id_niño;
        try {
            const response = await getWeights(idKid)
            if (Array.isArray(response.data)) {
                setValuesWeight(response.data); // Actualiza el estado con datos de peso
            }
        } catch (error) {
            console.log('No se han podido obtener los datos del niño');
        }
    };

    // Función para obtener datos de altura del niño
    const getHeightsforKid = async () => {
        const idKid = kid?.id_niño;
        try {
            const response = await getHeights(idKid);
            if (Array.isArray(response.data)) {
                setValuesHeight(response.data); // Actualiza el estado con datos de altura
            } else {
                console.error('Los datos recibidos no son un array:', response.data);
            }
        } catch (error) {
            console.log('No se han podido obtener los datos del niño');
        }
    };

    // Llama a las funciones de obtención de peso y altura cada vez que el niño cambia
    useEffect(() => {
        if (kid && kid.id_niño) {
            getWeightsforKid();
            getHeightsforKid();
        }
    }, [kid]);

    return {
        valuesWeight,
        setValuesWeight,
        valuesHeight,
        setValuesHeight,
        getWeightsforKid,
        getHeightsforKid,
    };
};

export default useGrowthCharts;
