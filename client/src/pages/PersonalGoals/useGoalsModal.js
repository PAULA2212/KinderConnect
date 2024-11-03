import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

/**
 * Hook personalizado useGoalsModal
 * @param {function} onAddGoal - Función proporcionada para manejar la creación de un nuevo objetivo.
 * @param {object} kid - Objeto que representa al niño asociado al objetivo.
 * @param {object} user - Objeto que representa al usuario (educador) que crea el objetivo.
 */
export const useGoalsModal = (onAddGoal, kid, user) => {
    const [showModal, setShowModal] = useState(false);
    const [goal, setGoal] = useState('');
    const [loading, setLoading] = useState(false);

    // Verificar si `kid` y `user` están definidos cuando se inicializa el hook
    useEffect(() => {
        if (!kid) {
            console.warn("No se ha seleccionado ningún niño.");
        }
        if (!user) {
            console.warn("El usuario no está disponible.");
        }
    }, [kid, user]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setGoal(''); // Limpiar el estado del objetivo al cerrar el modal
    };

    const handleSave = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Verificación para asegurar que `kid` y `user` están disponibles antes de guardar
        if (!kid || !kid.id_niño || !user || !user.id_educador) {
            toast.error("Debe seleccionar un niño y asegurarse de estar autenticado.");
            setLoading(false);
            return;
        }

        const newGoal = {
            idKid: kid.id_niño,
            idTeacher: user.id_educador,
            content: goal,
            state: 'pendiente',
        };

        try {
            await onAddGoal(newGoal);
            toast.success("Objetivo guardado exitosamente.");
            setGoal('');
            handleClose();
        } catch (error) {
            console.error("Error al guardar el objetivo:", error);
            toast.error("Ha habido un error al guardar el objetivo.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        showModal,
        handleClose,
        handleShow,
        handleSave,
        goal,
        setGoal,
    };
};
