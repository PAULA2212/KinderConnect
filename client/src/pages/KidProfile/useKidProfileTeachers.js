import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import { getKidsForTeachers } from '../../services/KidProfileService';

/**
 * Custom Hook para manejar el perfil de los niños asociados a un educador.
 *
 * Este hook obtiene la lista de niños del educador actual
 * y proporciona la funcionalidad para acceder a ellos.
 *
 * @returns {Array} Un arreglo que contiene la lista de niños y la función para obtenerlos.
 */
export default function useKidProfileTeachers() {
    const { user } = useContext(UserContext); // Contexto del usuario
    const [niños, setNiños] = useState([]); // Estado para almacenar la lista de niños

    /**
     * Función para obtener los niños asociados al educador desde la API.
     *
     * @async
     * @function fetchNiños
     * @returns {Promise<void>} No retorna nada.
     */
    const fetchNiños = async () => {
        try {
            // Llama al servicio para obtener los niños del educador
            const response = await getKidsForTeachers(user.id_educador);
            // Formatea la lista de niños, extrayendo solo la parte de la fecha de nacimiento
            const formattedNiños = response.kids.map(niño => ({
                ...niño,
                fecha_nac: niño.fecha_nac.split('T')[0] // Extraer solo la parte de la fecha
            }));
            // Actualiza el estado con la lista formateada de niños
            setNiños(formattedNiños);
        } catch (error) {
            // Manejo de errores en caso de que la obtención de datos falle
            console.log('Error al obtener los datos de los niños para los educadores', error);
        }
    };

    // Hook useEffect para cargar los datos de los niños al montar el componente
    useEffect(() => {
        if (user && user.id_educador) {
            fetchNiños(); // Llama a la función para obtener los niños
        }
    }, [user]); // Dependencia del efecto: se ejecuta cada vez que cambia el objeto user

    return [niños, fetchNiños]; // Retorna la lista de niños y la función para obtenerlos
}
