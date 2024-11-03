import { KidContext } from "../../Context/KidContext";
import { UserContext } from "../../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { getFoods } from "../../services/FeedingService";

/**
 * Hook personalizado `useFeeding` para manejar el estado y la lógica relacionados
 * con la visualización y filtrado de alimentos de un niño.
 *
 * Este hook se encarga de recuperar los datos de alimentación para un niño específico,
 * y proporciona métodos para agregar, filtrar y buscar alimentos basados en términos de búsqueda.
 *
 * @returns {Object} - Propiedades y funciones para manejar el estado y acciones de alimentos.
 */
export const useFeeding = () => {
    // Acceso al contexto de `KidContext` para obtener el niño seleccionado
    const { kid } = useContext(KidContext);

    // Acceso al contexto de `UserContext` para determinar el tipo de usuario
    const { profileType } = useContext(UserContext);

    // Estado para almacenar la lista de alimentos del niño seleccionado
    const [foods, setFoods] = useState([]);

    // Estado para almacenar la lista de alimentos filtrada según el término de búsqueda
    const [filteredFoods, setFilteredFoods] = useState([]);

    // Estado que almacena el término de búsqueda ingresado por el usuario
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Función asíncrona para recuperar los alimentos del niño actual.
     * Si se selecciona un niño, la función llama al servicio `getFoods`
     * para obtener los alimentos y los almacena en `foods`.
     */
    const fetchFoods = async () => {
        if (kid && kid.id_niño) {
            try {
                const response = await getFoods(kid.id_niño);
                setFoods(response);
            } catch (error) {
                console.log('Error al obtener los alimentos:', error);
            }
        }
    };

    /**
     * Función `handleAddFood` que fuerza una actualización de los alimentos
     * llamando a `fetchFoods`. Esto es útil cuando se añade un nuevo alimento
     * y es necesario refrescar la lista de alimentos actual.
     */
    const handleAddFood = async () => {
        await fetchFoods();
    };

    /**
     * Hook `useEffect` que se ejecuta cuando cambia el valor de `kid`.
     * Llama a `fetchFoods` para actualizar la lista de alimentos al
     * cambiar de niño seleccionado.
     */
    useEffect(() => {
        fetchFoods();
    }, [kid]);

    /**
     * Hook `useEffect` que filtra la lista de alimentos según el término de búsqueda.
     * Cuando `searchTerm` o `foods` cambia, se actualiza `filteredFoods` para que
     * contenga solo los alimentos cuyo nombre coincida parcialmente con el término de búsqueda.
     */
    useEffect(() => {
        const filtered = foods.filter(food =>
            food?.alimento?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFoods(filtered);
    }, [searchTerm, foods]);

    // Devuelve los datos y métodos necesarios para manejar el componente de alimentos
    return {
        kid,
        profileType,
        handleAddFood,
        filteredFoods,
        setSearchTerm,
        searchTerm
    };
};
