import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../Context/UserContext';

/**
 * Hook personalizado para gestionar la lógica de inicio de sesión.
 * Realiza el manejo del estado del usuario y realiza la llamada a la API para autenticación.
 */
export default function useLogin() {
    const [dataUser, setDataUser] = useState({ userName: '', password: '' });
    const [error, setError] = useState(''); // Estado para el mensaje de error
    const navigate = useNavigate();
    const { reloadUser } = useContext(UserContext);

    // Maneja los cambios en los campos de entrada del formulario
    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setDataUser({
            ...dataUser,
            [name]: value
        });
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();
    
        // Validación previa: verificar si faltan usuario o contraseña
        if (!dataUser.userName || !dataUser.password) {
            setError('Por favor, complete ambos campos: usuario y contraseña.');
            return; // Detener la ejecución si faltan datos
        } 
    
        try {
            const response = await axiosInstance.post('/login', dataUser);
    
            // Imprimir la respuesta completa para revisar su estructura
            console.log("Respuesta de la API:", response);
    
            // Verificar si `response.data` y `response.data.token` existen
            if (response.data && response.data.token) {
                // Almacenar el token y los datos del usuario en sessionStorage
                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('user', JSON.stringify(response.data));
    
                // Recargar el contexto del usuario y navegar a la página principal
                reloadUser();
                navigate('/layout');
            } else {
                // Lanzar un error si `token` no está presente
                throw new Error('Respuesta inválida del servidor. Token no encontrado.');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
    
            // Actualiza el mensaje de error según el código de respuesta de la API
            if (error.response?.status === 401) {
                setError('Credenciales incorrectas');
            } else {
                setError('Error al iniciar sesión. Intente de nuevo más tarde.');
            }
        }
    };
    

    return {
        dataUser,
        error,
        handleInputChange,
        onLoginSubmit
    };
}
