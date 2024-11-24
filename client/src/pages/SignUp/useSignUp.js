import { useState } from 'react';
import { useNavigate } from 'react-router';
import { registerProfile } from '../../services/SignUpService';
import { toast } from 'react-toastify';

/**
 * Custom hook `useSignUp` que encapsula la lógica necesaria para manejar el proceso de registro de usuarios.
 * Este hook gestiona el estado del formulario, la validación de los campos, y la interacción con el servicio de registro.
 *
 * @returns {Object} - Retorna funciones y datos necesarios para el formulario de registro.
 */
export const useSignUp = () => {
    const navigate = useNavigate(); // Hook para manejar la navegación programática
    const [formData, setFormData] = useState({
        userName: '',         // Almacena el nombre de usuario
        password: '',         // Almacena la contraseña
        confirmPassword: '',  // Almacena la confirmación de la contraseña
        perfil: ''            // Almacena el perfil del usuario (educador o progenitor)
    });
    const [errors, setErrors] = useState({}); // Almacena los mensajes de error de validación

    /**
     * Maneja los cambios en los campos de entrada del formulario.
     * Actualiza el estado de `formData` en función de la entrada del usuario.
     *
     * @param {Event} e - Evento de cambio en el campo de entrada
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Desestructuración del nombre y valor del campo
        setFormData({
            ...formData,
            [name]: value // Actualiza el campo correspondiente en `formData`
        });
    };

    /**
     * Maneja el cambio de selección del perfil del usuario.
     * Actualiza el estado de `formData` para reflejar el perfil seleccionado.
     *
     * @param {Event} e - Evento de cambio en la selección del perfil
     */
    const handlePerfilChange = (e) => {
        setFormData({
            ...formData,
            perfil: e.target.value // Actualiza el perfil en `formData`
        });
    };

    /**
     * Valida los campos del formulario y establece mensajes de error en caso de que las validaciones fallen.
     * 
     * @returns {boolean} - Retorna `true` si el formulario es válido, `false` en caso contrario.
     */
    const validateForm = () => {
        const { userName, password, confirmPassword, perfil } = formData; // Extrae los valores del formulario
        const newErrors = {}; // Objeto para almacenar errores de validación
        
        // Validar nombre de usuario
        if (!userName) {
            newErrors.userName = 'Nombre de usuario es obligatorio';
        }
        
        // Validar contraseñas
        if (!password) {
            newErrors.password = 'Contraseña es obligatoria';
        }
        
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        
        // Validar perfil
        if (!perfil) {
            newErrors.perfil = 'Selecciona un perfil';
        }
        
        setErrors(newErrors); // Actualiza el estado de errores
        return Object.keys(newErrors).length === 0; // Devuelve `true` si no hay errores
    };

    /**
     * Maneja el envío del formulario de registro.
     * Previene el comportamiento predeterminado y valida el formulario antes de proceder con el registro.
     *
     * @param {Event} e - Evento de envío del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await registerProfile(formData);
                toast.success("Usuario registrado exitosamente");
                navigate('/');
            } catch (error) {
                console.error("Error completo en el registro:", error);
                toast.error(error.message);  // Muestra el mensaje de error detallado
            }
        }
    };

    // Retorna las funciones y datos relevantes para el formulario de registro
    return {
        handleInputChange, // Función para manejar cambios en campos de entrada
        handlePerfilChange, // Función para manejar cambios en la selección de perfil
        handleSubmit, // Función para manejar el envío del formulario
        errors, // Objeto de errores de validación
        formData // Datos del formulario
    };
}
