import { useState, useEffect } from "react";
import { fetchDiaryForParentsData } from "../../services/DiaryService";

/**
 * Hook personalizado para gestionar los datos del diario de un niño, incluyendo
 * el estado de carga, errores y formato de fecha.
 *
 * @param {Object} props - Props del componente.
 * @param {Object} props.kid - Objeto que representa al niño seleccionado en el contexto.
 * @returns {Object} Estado y funciones del hook: datos del diario (`dataKid`), estado de carga (`loading`), errores (`error`) y función para formatear fechas (`formatDate`).
 */
export const useParentsDiaryData = ({ kid }) => {
    // Estado que contiene los datos del diario del niño seleccionado.
    const [dataKid, setDataKid] = useState([]);
    
    // Estado que indica si los datos están en proceso de carga.
    const [loading, setLoading] = useState(false);
    
    // Estado que almacena mensajes de error en caso de fallo en la carga de datos.
    const [error, setError] = useState('');

    /**
     * Efecto para cargar los datos del diario cada vez que `kid` cambie.
     * Se limpia el estado de los datos y cualquier error previo al intentar
     * cargar los datos de un nuevo niño seleccionado.
     */
    useEffect(() => {
        const loadData = async () => {
            // Limpia datos anteriores para evitar mostrar datos desactualizados al cambiar de niño.
            setDataKid([]); 
            
            // Si hay un niño seleccionado, intenta obtener los datos del diario.
            if (kid && kid.id_niño) {
                setLoading(true);      // Activa el indicador de carga.
                setError('');          // Limpia cualquier mensaje de error previo.
                
                try {
                    // Llama al servicio para obtener los datos del diario del niño.
                    const data = await fetchDiaryForParentsData(kid.id_niño);
                    
                    // Actualiza `dataKid` con los datos obtenidos del servicio.
                    setDataKid(data);
                } catch (error) {
                    // Establece un mensaje de error si no hay registros para el niño.
                    setError('Todavía no hay registros para el niño.');
                } finally {
                    // Desactiva el indicador de carga después de obtener los datos.
                    setLoading(false);
                }
            } else {
                // Muestra un mensaje de error si no se ha seleccionado un niño.
                setError('No se ha seleccionado un niño.');
            }
        };

        loadData();
    }, [kid]); // Dependencia en `kid` para ejecutar este efecto cuando cambia el niño seleccionado.

    /**
     * Función para formatear fechas en formato "dd/mm/yyyy".
     *
     * @param {string} dateString - Fecha en formato ISO (string).
     * @returns {string} Fecha en formato legible (dd/mm/yyyy).
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Devuelve el estado y las funciones útiles para el componente.
    return {
        loading,
        error,
        dataKid,
        formatDate
    };
}
