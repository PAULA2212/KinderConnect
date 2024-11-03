import { fetchDiaryParentsData } from "../../services/DiaryService";
import { useState, useEffect } from "react";

/**
 * Hook personalizado `useTeachersDiaryData` para obtener y gestionar los datos
 * diarios de un niño seleccionados para la consulta de educadores.
 *
 * @param {Object} props - Parámetros del hook.
 * @param {Object} props.kid - Objeto que contiene los datos del niño seleccionado.
 * @returns {Object} Objeto con el estado de carga, error, datos y una función para formatear fechas.
 */
export const useTeachersDiaryData = ({ kid }) => {
    // Estado para almacenar los datos de diario del niño, el estado de carga y los errores
    const [dataKid, setDataKid] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Ejecuta `useEffect` al cargar el componente o al cambiar el valor de `kid`
    useEffect(() => {
        const loadData = async () => {
            // Limpiar los datos al seleccionar un nuevo niño
            setDataKid([]); 
            if (kid && kid.id_niño) {
                setLoading(true); // Activa estado de carga
                setError(''); // Limpia mensajes de error previos
                try {
                    // Llama a la API para obtener los datos del diario del niño
                    const data = await fetchDiaryParentsData(kid.id_niño);
                    setDataKid(data); // Actualiza el estado con los datos obtenidos
                } catch (error) {
                    setError('Todavía no hay registro de datos para este niño.');
                } finally {
                    setLoading(false); // Desactiva el estado de carga
                }
            } else {
                setError('No se ha seleccionado un niño.'); // Notifica si no se ha seleccionado un niño
            }
        };

        loadData();
    }, [kid]); // Dependencia en `kid`, ejecuta el hook cuando cambia el valor de `kid`

    /**
     * Formatea una cadena de fecha a un formato `DD/MM/AAAA` en español.
     *
     * @param {string} dateString - Fecha en formato de cadena.
     * @returns {string} Fecha formateada en español.
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Retorna el estado de carga, datos, errores y la función para formatear fechas
    return {
        formatDate,
        dataKid,
        loading,
        error
    };
}
