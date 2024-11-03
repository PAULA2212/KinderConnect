import { useState, useContext } from 'react'; // Importa los hooks necesarios de React
import { toast } from 'react-toastify'; // Importa toast para mostrar notificaciones
import { UserContext } from '../../Context/UserContext'; // Importa el contexto de usuario
import { addBook } from '../../services/BookClubService'; // Importa la función de servicio para agregar libros

/**
 * Custom hook para manejar la lógica del modal de agregar libros.
 * @param {Function} onBookAdded - Callback para ejecutar cuando un libro se añade.
 * @returns {Object} - Devuelve propiedades y funciones para el manejo del modal.
 */
export default function useBookModalForm(onBookAdded){
  const { user, profileType } = useContext(UserContext); // Obtiene el usuario y el tipo de perfil del contexto
  const [formData, setFormData] = useState(new FormData()); // Estado para almacenar los datos del formulario
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  // Maneja la apertura del modal
  const handleShow = () => setShowModal(true);
  // Maneja el cierre del modal
  const handleClose = () => setShowModal(false);

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value, files } = event.target; // Desestructura el evento
    const newFormData = new FormData(); // Crea un nuevo objeto FormData

    // Transfiere los datos existentes
    formData.forEach((val, key) => newFormData.append(key, val));

    if (files && files.length > 0) {
      newFormData.set(name, files[0]); // Agrega el archivo al FormData
    } else {
      newFormData.set(name, value); // Agrega el valor al FormData
    }

    setFormData(newFormData); // Actualiza el estado del FormData
  };

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    if (loading) return; // Previene múltiples envíos si ya está cargando
    setLoading(true); // Establece el estado de carga

    // Agrega el ID del usuario al FormData
    formData.set('id_usuario', profileType === 'educador' ? user.id_educador : user.id_progenitor);

    try {
      await addBook(formData); // Llama a la función para agregar el libro

      toast.success('Libro añadido correctamente', { autoClose: 3000 }); // Muestra mensaje de éxito

      setFormData(new FormData()); // Limpia el formulario
      handleClose(); // Cierra el modal

      // Llama a la función de actualización del componente padre
      if (onBookAdded) onBookAdded();
    } catch (error) {
      toast.error('Error al añadir el libro', { autoClose: 3000 }); // Muestra mensaje de error
      console.error('Error al añadir el libro:', error); // Muestra error en la consola
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  return {
    showModal,
    handleShow,
    handleClose,
    handleInputChange,
    handleSubmit,
    loading,
    formData,
  };
}
