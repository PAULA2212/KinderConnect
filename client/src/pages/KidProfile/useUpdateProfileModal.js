import { useState, useEffect } from "react";
import { getCentros, updateKidProfile } from "../../services/KidProfileService";
import { toast } from 'react-toastify';

/**
 * Custom Hook para gestionar la lógica de actualización del perfil de un niño.
 * 
 * Proporciona funcionalidades para mostrar el modal de actualización, obtener centros educativos
 * y manejar el formulario de actualización de perfil del niño.
 * 
 * @param {Object} kid - Información del niño cuyo perfil se va a actualizar.
 * @param {Function} fetchNiños - Función para refrescar la lista de niños después de una actualización.
 * @returns {Array} Un arreglo que contiene el estado del modal, el formulario de datos, la función para mostrar el modal,
 *                  y la función para manejar la actualización del niño.
 */
export default function useUpdateProfileModal(kid, fetchNiños) {
    const [showForm, setShowForm] = useState(false); // Estado que controla la visibilidad del modal
    const [centros, setCentros] = useState([]); // Estado que almacena los centros educativos
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ // Estado que almacena los datos del formulario
        nombre: kid.nombre,
        apellido_1: kid.apellido_1,
        apellido_2: kid.apellido_2,
        fecha_nacimiento: kid.fecha_nac,
        centro_educativo: kid.centro_educativo
    });

    /**
     * Muestra el formulario de actualización.
     * 
     * @returns {void}
     */
    const handleShow = () => {
        setShowForm(true); // Cambia el estado para mostrar el modal
    };

    /**
     * Maneja los cambios en los campos del formulario.
     * 
     * @param {Object} e - Evento del cambio en el formulario.
     * @returns {void}
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value // Actualiza el estado del formulario con el nuevo valor
        }));
    };

    /**
     * Obtiene la lista de centros educativos.
     * 
     * @async
     * @returns {Promise<void>}
     * @throws {Error} Si ocurre un error al obtener los centros.
     */
    const fetchCentros = async () => {
        try {
            const response = await getCentros();
            setCentros(response.data); // Actualiza el estado con los centros obtenidos
        } catch (error) {
            console.error('Error al obtener los centros educativos:', error);
        }
    };

    useEffect(() => {
        fetchCentros(); // Llama a la función para obtener los centros cuando se monta el componente
    }, []);

    /**
     * Maneja la actualización del perfil del niño.
     * 
     * @async
     * @returns {Promise<void>}
     * @throws {Error} Si ocurre un error al actualizar el perfil del niño.
     */
    const handleUpdateNiño = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const data = {
                nombre: formData.nombre,
                apellido_1: formData.apellido_1,
                apellido_2: formData.apellido_2,
                fecha_nacimiento: formData.fecha_nacimiento,
                centro_educativo: formData.centro_educativo
            };
            await updateKidProfile(kid.id_niño, data); // Llama al servicio para actualizar el perfil
            toast.success('Perfil del niño actualizado correctamente', { autoClose: 3000 });
            fetchNiños(); // Refresca la lista de niños
            setFormData({ // Resetea el formulario
                nombre: '',
                apellido_1: '',
                apellido_2: '',
                fecha_nacimiento: '',
                centro_educativo: ''
            });
            setShowForm(false); // Oculta el modal
        } catch (error) {
            console.error('Error al actualizar el niño:', error);
            toast.error('No se ha podido actualizar el perfil del niño', { autoClose: 3000 });
        }finally{
            setLoading(false)
        }
    };

    return [showForm, handleShow, handleChange, formData, centros, handleUpdateNiño, setShowForm, loading]; // Retorna los estados y funciones necesarias
}
