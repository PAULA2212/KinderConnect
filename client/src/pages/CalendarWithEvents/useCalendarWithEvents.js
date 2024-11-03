// hooks/useCalendarWithEvents.js
import { useState, useEffect, useContext } from 'react';
import { getEventsForKid, getEventsForTeacher } from '../../services/CalendarService';
import { KidContext } from '../../Context/KidContext';
import { UserContext } from "../../Context/UserContext";

/**
 * Hook para manejar la lógica de eventos en el calendario.
 * Este hook se encarga de obtener los eventos basados en el tipo de perfil del usuario
 * (progenitor o educador) y el niño seleccionado. 
 * 
 * @returns {Array} - Un array de eventos obtenidos desde la API.
 */
const useCalendarWithEvents = () => {
    const [events, setEvents] = useState([]);
    const { user, profileType } = useContext(UserContext);
    const { kid } = useContext(KidContext);

    // Función para obtener eventos desde el servicio
    const fetchEvents = async () => {
        try {
            // Si el perfil es de progenitor y hay un niño seleccionado
            if (profileType === 'progenitor' && kid && kid.id_niño) {
                const response = await getEventsForKid(kid.id_niño);
                setEvents(response.data || []); // Asegúrate de que sea un array
            } 
            // Si el perfil es de educador
            else if (profileType === 'educador' && user) {
                const response = await getEventsForTeacher(user.id_educador);
                setEvents(response.data || []); // Asegúrate de que sea un array
            }
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    };

    // useEffect para ejecutar fetchEvents al cambiar perfil o niño
    useEffect(() => {
        fetchEvents(); // Llamar a la función para obtener eventos
    }, [profileType, kid, user]); // Dependencias para el useEffect

    return { events, fetchEvents, user, profileType, kid }; // Retornar los eventos obtenidos
};

export default useCalendarWithEvents; // Exportar el hook para su uso en otros componentes
