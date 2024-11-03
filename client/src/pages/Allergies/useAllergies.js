import { useState, useEffect } from "react";  // Importamos los hooks que utilizaremos  // Importamos el contexto del niño
import { getAllergensForKid } from "../../services/AllergiesService";  // Importamos el servicio que obtiene las alergias del niño

// Definimos nuestro custom hook useAllergies
const useAllergies = (kid) => {
    const [allergies, setAllergies] = useState([]);  // Estado para almacenar la lista de alergias del niño
    const [loading, setLoading] = useState(true);    // Estado para manejar si estamos cargando los datos
    const [error, setError] = useState(null);        // Estado para manejar posibles errores en la carga de datos

    // Función para obtener las alergias del niño usando el servicio `getAllergensForKid`
    const fetchAllergies = async () => {
        if (kid && kid.id_niño) {  // Verificamos que haya un niño seleccionado y que tenga un id válido
            try {
                setLoading(true);  // Establecemos que estamos en estado de carga
                const data = await getAllergensForKid(kid.id_niño);  // Hacemos la petición al servicio para obtener las alergias
                setAllergies(data);  // Guardamos los datos de las alergias en el estado
            } catch (err) {
                console.error('Error al obtener alergias:', err);  // Si ocurre un error, lo mostramos en consola
                setError('Hubo un error al cargar las alergias');  // Establecemos el error en el estado
            } finally {
                setLoading(false);  // Independientemente del resultado, quitamos el estado de carga
            }
        }
    };

    // Hook useEffect que ejecuta `fetchAllergies` cada vez que cambie el niño seleccionado
    useEffect(() => {
        if (kid) {  // Si hay un niño seleccionado
            fetchAllergies();  // Llamamos a la función para obtener las alergias
        }
    }, [kid]);  // Este efecto se ejecuta siempre que cambie el valor de `kid`

    // Función que permite refrescar las alergias después de realizar algún cambio (como agregar una nueva alergia)
    const refreshAllergies = async () => {
        await fetchAllergies();  // Llamamos nuevamente a `fetchAllergies` para actualizar la lista de alergias
    };

    // Filtramos las alergias según su grado de severidad
    const graveAllergies = allergies.filter(allergy => allergy.grado === 'grave');  // Filtramos las alergias graves
    const moderateAllergies = allergies.filter(allergy => allergy.grado === 'moderado');  // Filtramos las moderadas
    const mildAllergies = allergies.filter(allergy => allergy.grado === 'leve');  // Filtramos las leves

    // Retornamos los datos necesarios desde el hook
    return {
        allergies,          // Lista completa de alergias
        graveAllergies,     // Alergias graves
        moderateAllergies,  // Alergias moderadas
        mildAllergies,      // Alergias leves
        loading,            // Estado de carga
        error,              // Estado de error
        refreshAllergies,   // Función para refrescar las alergias
    };
};

export default useAllergies;  // Exportamos el hook para poder usarlo en otros componentes
