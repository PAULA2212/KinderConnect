// useMedicalModal.js
import { useState } from "react";
import { toast } from "react-toastify";
import { addMedicalCondition } from "../../services/MedicalConditionsService";

/**
 * useMedicalModal:
 * Custom hook para manejar la lógica de estado, apertura/cierre del modal,
 * y envío de formulario para agregar una nueva condición médica.
 *
 * @param {Object} kid - Objeto del niño seleccionado, que contiene el ID.
 * @param {Function} onAddCondition - Función de callback que se llama al agregar una condición.
 * @returns {Object} - Estado y funciones para gestionar el modal y el formulario.
 */
export function useMedicalModal(kid, onAddCondition) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [loading, setLoading] = useState(false);

    // Función para abrir el modal
    const openModal = () => setShowModal(true);

    // Función para cerrar el modal y restablecer los campos
    const closeModal = () => {
        setShowModal(false);
        setTitle("");
        setDetails("");
    };

    // Función que maneja el envío del formulario para agregar una nueva condición médica
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            kidId: kid.id_niño,
            title: title,
            details: details,
        };
        setLoading(true);
        try {
            await addMedicalCondition(data);
            toast.success("Se ha guardado la nueva condición médica", { autoClose: 3000 });
            onAddCondition(); // Actualiza las condiciones en el componente padre
            closeModal();
        } catch (error) {
            console.error("Error al guardar la condición médica:", error);
            toast.error("No se ha podido guardar la nueva condición médica", { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return {
        showModal,
        openModal,
        closeModal,
        handleSubmit,
        title,
        setTitle,
        details,
        setDetails,
        loading,
    };
}
