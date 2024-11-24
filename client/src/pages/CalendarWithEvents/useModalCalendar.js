//useModalCalendar.js
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { addEvent, addEventForKids, getKidsForTeacher } from '../../services/CalendarService';

/**
 * Custom hook para manejar la lógica del modal de eventos.
 * Permite agregar nuevos eventos y gestionar la selección de niños.
 *
 * @param {Function} fetchEvents - Función para volver a obtener los eventos después de agregar uno nuevo.
 * @param {Object} user - Objeto del usuario actual que incluye información del educador.
 * @param {string} profileType - Tipo de perfil del usuario (educador).
 *
 * @returns {Array} - Estado y funciones necesarias para manejar el modal y los eventos.
 */
const useModalCalendar = (fetchEvents, user, profileType) => {
    // Estados para manejar la selección de niños, visibilidad del modal, lista de niños y los datos del nuevo evento
    const [selectedKids, setSelectedKids] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [kids, setKids] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', time: '' });
    const [loading, setLoading] = useState(false);

    /**
     * Función para abrir el modal.
     */
    const handleModalOpen = () => setShowModal(true);

    /**
     * Función para cerrar el modal.
     */
    const handleModalClose = () => setShowModal(false);

    /**
     * Maneja los cambios en los campos de entrada del nuevo evento.
     *
     * @param {Object} e - Evento de cambio del campo de formulario.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Maneja la selección de niños.
     *
     * @param {Object} e - Evento de cambio del campo de selección.
     */
    const handleKidSelectionChange = (e) => {
        const { options } = e.target;
        const selected = [];
        for (const option of options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        setSelectedKids(selected);
    };

    /**
     * Función para enviar el nuevo evento a la API.
     */
    const handleSubmitEvent = async (e) => {
        e.preventDefault()
        try {
            // Crear un objeto de fecha con la fecha y hora seleccionadas
            const [hours, minutes] = newEvent.time.split(':');
            const eventDate = new Date(`${newEvent.date}T${newEvent.time}`);
            eventDate.setHours(hours);
            eventDate.setMinutes(minutes);

            // Preparar el evento para enviarlo
            const eventToAdd = { ...newEvent, date: eventDate, id_educador: user.id_educador };
            const eventResponse = await addEvent(eventToAdd);

            // Verificar si la respuesta tiene el campo esperado
            const { id_evento } = eventResponse.data;
            if (!id_evento) {
                throw new Error('ID del evento no recibido');
            }
            setLoading(true)
            await Promise.all(
                selectedKids.map((id_niño) => {
                    console.log(`Vinculando niño ${id_niño} al evento ${id_evento}`); // Agregar log para depuración
                    return addEventForKids(id_evento, id_niño);
                })
            );

            // Volver a obtener todos los eventos después de añadir uno nuevo
            await fetchEvents();

            toast.success('¡Evento añadido con éxito!'); // Notificar al usuario
            handleModalClose(); // Cerrar el modal
        } catch (error) {
            toast.error(`Error al añadir el evento: ${error.message}`); // Notificar al usuario del error
            console.error('Error al añadir el evento:', error);
        }finally{
            setLoading(false)
        }
    };

    /**
     * Efecto para obtener la lista de niños del educador al montar el componente.
     */
    useEffect(() => {
        const fetchKids = async () => {
            try {
                if (user && profileType === 'educador') {
                    const response = await getKidsForTeacher(user.id_educador);
                    setKids(response.data.kids); // Establecer la lista de niños en el estado
                    console.log(response)
                }
            } catch (error) {
                console.error('Error al obtener los niños:', error);
            }
        };
        fetchKids(); // Llamar a la función para obtener los niños
    }, [user, profileType]); // Dependencias del efecto

    // Retornar el estado y las funciones del hook
    return {
        selectedKids,
        showModal,
        kids,
        newEvent,
        handleModalOpen,
        handleModalClose,
        handleInputChange,
        handleKidSelectionChange,
        handleSubmitEvent,
        loading
    };
};

export default useModalCalendar; // Exportar el hook para su uso en otros componentes
