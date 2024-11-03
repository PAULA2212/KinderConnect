// useModalMessaging.js
import { useEffect, useState } from "react";
import { getPotentialRecipients, saveMessage } from "../../services/messagingService";
import { toast } from "react-toastify";

/**
 * useModalMessaging:
 * Custom hook para gestionar la lógica del modal de mensajería, incluyendo la carga
 * de destinatarios y el envío de mensajes.
 *
 * @param {Object} user - Información del usuario.
 * @param {string} profileType - Tipo de perfil del usuario.
 * @returns {Object} - Estado y funciones para gestionar el modal de mensajería.
 */
export function useModalMessaging(user, profileType, onAddMessage) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [potentialRecipients, setPotentialRecipients] = useState([]);

    const id = profileType === "progenitor" ? user?.id_progenitor : user?.id_educador;

    const fetchPotentialRecipients = async () => {
        try {
            setDataLoading(true);
            const response = await getPotentialRecipients(id, profileType);
            setPotentialRecipients(response);
        } catch (error) {
            console.log('No se han podido obtener los datos de los posibles receptores');
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        if (user && id) {
            fetchPotentialRecipients();
        }
    }, [user, id, profileType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            recipient: recipient,
            sender: id,
            subject: subject,
            message: message
        };
        setLoading(true);
        try {
            await saveMessage(data);
            toast.success('El mensaje ha sido enviado correctamente', { autoClose: 3000 });
            onAddMessage();
            setShowModal(false);
        } catch (error) {
            console.log(error);
            toast.error('Ha habido un error al intentar enviar el mensaje', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return {
        showModal,
        setShowModal,
        loading,
        dataLoading,
        message,
        setMessage,
        recipient,
        setRecipient,
        subject,
        setSubject,
        potentialRecipients,
        handleSubmit,
    };
}
