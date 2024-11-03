import { useState } from 'react';
import { toast } from 'react-toastify';
import { addFood } from '../../services/FeedingService';

/**
 * Custom Hook `useFeedingModal`
 * Gestiona el estado del modal y las operaciones de agregar alimentos.
 *
 * @param {Object} kid - El niño seleccionado, necesario para el envío de datos.
 * @param {Function} onAddFood - Función de callback para actualizar la lista de alimentos al añadir uno nuevo.
 * @returns {Object} - Estados y métodos para manejar el modal de alimentación.
 */
export const useFeedingModal = ({ kid, onAddFood }) => {
    const [food, setFood] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Maneja la apertura y cierre del modal
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Captura y actualiza el valor del campo "food" en el formulario
    const handleChange = (event) => {
        setFood(event.target.value);
    };

    // Controla la lógica de envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            idKid: kid.id_niño,
            food: food,
        };

        setLoading(true);
        try {
            await addFood(data); // Llama a la API para añadir el alimento
            onAddFood(); // Actualiza la lista de alimentos en el componente padre
            toast.success('El nuevo alimento se ha agregado a la lista.', { autoClose: 3000 });
            setShowModal(false); // Cierra el modal tras el éxito
        } catch (error) {
            console.log('Error:', error);
            toast.error('Ha habido un error al intentar agregar el alimento', { autoClose: 3000 });
        } finally {
            setLoading(false); // Detiene la carga
        }
    };

    return {
        food,
        loading,
        showModal,
        openModal,
        closeModal,
        handleSubmit,
        handleChange,
    };
};
