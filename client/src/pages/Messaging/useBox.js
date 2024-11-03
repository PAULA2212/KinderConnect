import { useEffect, useState } from "react";
import { getPotentialRecipients, markMessageAsRead } from "../../services/messagingService";

/**
 * Hook personalizado para manejar la lógica del componente Box.
 * 
 * @param {Array} messages - Lista de mensajes a mostrar.
 * @param {string} type - Tipo de bandeja ("entrada" o "salida").
 * @param {Object} user - Información del usuario actual.
 * @param {string} profileType - Tipo de perfil del usuario ("progenitor" o "educador").
 * @returns {Object} - Contiene la lógica y el estado necesario para el componente Box.
 */
const useBox = (messages, type, user, profileType) => {
    // Estado para almacenar los posibles remitentes
    const [potentialSenders, setPotentialSenders] = useState([]);
    // Estado para indicar si los datos están siendo cargados
    const [dataLoading, setDataLoading] = useState(false);
    // Estado para el mensaje seleccionado
    const [selectedMessage, setSelectedMessage] = useState(null);
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);

    // Determinar el ID del usuario según el tipo de perfil
    const id = profileType === "progenitor" ? user?.id_progenitor : user?.id_educador;

    /**
     * Función para obtener los posibles remitentes desde la API.
     */
    const fetchPotentialSenders = async () => {
        try {
            setDataLoading(true); // Iniciar estado de carga
            const response = await getPotentialRecipients(id, profileType); // Llamar a la API
            setPotentialSenders(response); // Establecer los remitentes obtenidos
        } catch (error) {
            console.error("Error al obtener los posibles remitentes:", error); // Manejar errores
        } finally {
            setDataLoading(false); // Finalizar estado de carga
        }
    };

    /**
     * Función para encontrar el nombre del remitente según su ID.
     * 
     * @param {number} id_emisor - ID del remitente.
     * @returns {string} - Nombre completo del remitente o "Desconocido".
     */
    const findSenderName = (id_emisor) => {
        const sender = potentialSenders.find(sender =>
            profileType === "progenitor" ? sender.id_educador === id_emisor : sender.id_progenitor === id_emisor
        );
        return sender ? `${sender.nombre} ${sender.apellido_1} ${sender.apellido_2}` : "Desconocido";
    };

    /**
     * Función para encontrar el nombre del receptor según su ID.
     * 
     * @param {number} id_receptor - ID del receptor.
     * @returns {string} - Nombre completo del receptor o "Desconocido".
     */
    const findRecipientName = (id_receptor) => {
        const recipient = potentialSenders.find(sender =>
            profileType === "progenitor" ? sender.id_educador === id_receptor : sender.id_progenitor === id_receptor
        );
        return recipient ? `${recipient.nombre} ${recipient.apellido_1} ${recipient.apellido_2}` : "Desconocido";
    };

    /**
     * Función para manejar la actualización del mensaje y marcarlo como leído.
     * 
     * @param {number} messageId - ID del mensaje a actualizar.
     */
    const handleUpdate = async (messageId) => {
        const message = messages.find(msg => msg.id_mensaje === messageId);
        setSelectedMessage(message); // Almacenar el mensaje seleccionado
        setShowModal(true); // Mostrar el modal

        // Marcar el mensaje como leído si es un mensaje de entrada
        if (type === "entrada" && !message.leido) {
            try {
                await markMessageAsRead(messageId); // Llamar a la API para marcar como leído
                message.leido = true; // Actualizar el estado del mensaje en el frontend
            } catch (error) {
                console.error("Error al actualizar el mensaje como leído:", error); // Manejar errores
            }
        }
    };

    // Efecto para obtener los posibles remitentes cuando se monta el componente
    useEffect(() => {
        if (id) {
            fetchPotentialSenders(); // Llamar a la función para obtener remitentes
        }
    }, [id, profileType]);

    // Retornar los estados y funciones necesarias para el componente
    return {
        potentialSenders,
        dataLoading,
        selectedMessage,
        showModal,
        setShowModal,
        findSenderName,
        findRecipientName,
        handleUpdate,
    };
};

export default useBox;
