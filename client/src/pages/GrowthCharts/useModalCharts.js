import { useState } from 'react';
import { toast } from 'react-toastify';
import { addData } from '../../services/GrowthChartsService';

/**
 * Hook personalizado para manejar la lógica de un modal de entrada de datos.
 * 
 * @param {string} type - Tipo de medida ('peso' o 'altura').
 * @param {Object} kid - Objeto que representa al niño.
 * @param {Function} onAddData - Función callback para actualizar los datos tras añadir una medida.
 * 
 * @returns {Object} - Devuelve el estado del modal y las funciones para gestionarlo.
 */
export default function useModalChart(type, kid, onAddData) {
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    // Función para mostrar el modal
    const handleShow = () => { setShowModal(true); };

    // Función para cerrar el modal
    const handleClose = () => { setShowModal(false); };

    /**
     * Maneja el envío del formulario para añadir un nuevo dato.
     * Realiza validaciones y envía la información a la API correspondiente.
     * 
     * @param {Event} event - Evento del formulario.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validación para asegurarse de que el valor ingresado sea numérico y no esté vacío
        if (!value || isNaN(value)) {
            toast.error('Por favor, ingresa un valor válido.', { autoClose: 3000 });
            return;
        }

        // Establece la URL de la API según el tipo de medida
        const apiURL = type === 'peso' ? '/addWeight' : '/addHeight';

        // Prepara los datos que se enviarán a la API
        const data = {
            idKid: kid.id_niño,
            value: parseFloat(value).toFixed(2), // Convierte el valor a número y asegura dos decimales
            fecha: new Date().toISOString() // Obtiene la fecha actual en formato ISO
        };

        setLoading(true); // Activa el estado de carga
        try {
            // Envía la solicitud POST a la API
            await addData(apiURL, data);
            toast.success('El nuevo dato se ha añadido correctamente', { autoClose: 3000 });
            onAddData(); // Llama a la función para actualizar los datos en el componente padre
            handleClose(); // Cierra el modal
            setValue(''); // Resetea el valor ingresado
        } catch (error) {
            toast.error('No se ha podido añadir el nuevo dato. Inténtalo de nuevo.', { autoClose: 3000 });
            console.log('Error al guardar el dato:', error); // Muestra el error en la consola
        } finally {
            setLoading(false); // Desactiva el estado de carga
        }
    };

    return {
        showModal,
        handleShow,
        handleClose,
        handleSubmit,
        value,
        setValue,
        loading
    };
}
