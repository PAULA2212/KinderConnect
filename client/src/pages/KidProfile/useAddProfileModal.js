import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCentros, addKidProfile } from '../../services/KidProfileService';

/**
 * Hook personalizado para gestionar la lógica del componente AddProfileModal.
 *
 * @param {Function} fetchNiños - Función para refrescar la lista de niños en el componente padre.
 * @param {Object} user - Objeto que contiene la información del usuario actual.
 * @returns {Object} - Estados y funciones que maneja el formulario de vinculación de perfil de niño.
 */
export function useAddProfileModal(fetchNiños, user) {
    const [showForm, setShowForm] = useState(false);  // Estado para controlar la visibilidad del modal
    const [centros, setCentros] = useState([]);// Estado para almacenar los centros educativos
    const [loadingCentros, setLoadingCentros] = useState(true);      
    const [formData, setFormData] = useState({        // Estado para los datos del formulario
        nombre: '',
        apellido_1: '',
        apellido_2: '',
        fecha_nacimiento: '',
        centro_educativo: ''
    });

    /**
     * Maneja los cambios en los inputs del formulario y actualiza el estado correspondiente.
     * @param {Object} e - Evento de cambio del input.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /**
     * Muestra el formulario al hacer clic en el botón de añadir perfil.
     */
    const handleAddClick = () => {
        setShowForm(true);
    };

    /**
     * Realiza una solicitud para obtener los centros educativos disponibles y actualiza el estado.
     */

    const fetchCentros = async () => {
        try {
            const response = await getCentros();
            setCentros(response.data || []);
        } catch (error) {
            console.error('Error al obtener los centros educativos:', error);
            setCentros([]); 
        } finally {
            setLoadingCentros(false); // Finaliza el estado de carga
        }
    };


    /**
     * Envía los datos del formulario para añadir un nuevo perfil de niño.
     * Muestra un mensaje de éxito o error según el resultado y refresca la lista de niños.
     */
    const handleAddNiño = async (e) => {
        e.preventDefault()
        try {
            const data = {
                id_progenitor: user.id_progenitor,
                ...formData
            };
            await addKidProfile(data);
            toast.success('Perfil del niño añadido correctamente', { autoClose: 3000 });
            fetchNiños();
            setFormData({
                nombre: '',
                apellido_1: '',
                apellido_2: '',
                fecha_nacimiento: '',
                centro_educativo: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error al añadir o actualizar el niño:', error);
            toast.error('No se ha podido añadir el perfil del niño', { autoClose: 3000 });
        }
    };

    // Cargar centros educativos al montar el componente
    useEffect(() => {
        fetchCentros();
    }, []);

    // Retorna los estados y funciones al componente principal
    return {
        showForm,
        setShowForm,
        centros,
        formData,
        handleChange,
        handleAddClick,
        handleAddNiño,
        loadingCentros
    };
}
