import { useEffect, useState } from "react";
import { getInbox, getOutbox } from "../../services/messagingService";

/**
 * useMessaging:
 * Custom hook para gestionar la lógica de la mensajería, incluyendo la carga de mensajes de
 * la bandeja de entrada y salida, así como la actualización al agregar nuevos mensajes.
 *
 * @param {string} id - ID del usuario, utilizado para obtener los mensajes.
 * @returns {Object} - Estado y funciones para gestionar la bandeja de mensajes.
 */
export function useMessaging(id) {
    const [inbox, setInbox] = useState([]);
    const [outbox, setOutbox] = useState([]);

    const fetchInBox = async () => {
        try {
            const response = await getInbox(id);
            console.log(response)
            setInbox(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const fetchOutbox = async () => {
        try {
            const response = await getOutbox(id);
            setOutbox(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Manejador que actualizará los mensajes cuando se agregue uno nuevo
    const handleAddMessage = () => {
        fetchInBox(); // Recargar bandeja de entrada
        fetchOutbox(); // Recargar bandeja de salida
    };

    useEffect(() => {
        if (id) {
            fetchInBox();
            fetchOutbox();
        }
    }, [id]);
    return { inbox, outbox, handleAddMessage };
}
