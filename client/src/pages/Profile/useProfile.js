import { UserContext } from '../../Context/UserContext';
import { useContext, useState, useEffect } from 'react';

/**
 * Hook personalizado `useProfile` que facilita la obtención y gestión de la información del perfil de usuario.
 * Este hook proporciona datos del usuario, configuración de tipo de perfil, y funcionalidades para manipular
 * los datos del formulario de perfil, manteniendo el estado de sesión.
 *
 * @returns {Object} - Devuelve el usuario, tipo de perfil, función para recargar el usuario,
 * el ID del usuario, los datos de formulario del perfil y la función para actualizar el formulario.
 */
export const useProfile = () => {

    // Acceso al contexto del usuario que incluye `user`, el `profileType`, y `reloadUser`
    // para facilitar la sincronización del perfil en toda la aplicación.
    const { user, profileType, reloadUser } = useContext(UserContext);

    // Estado local para almacenar el `userId`, necesario para identificar al usuario en las actualizaciones del perfil.
    const [userId, setUserId] = useState(null);

    // Estado `formData` que gestiona los campos del perfil de usuario en el formulario, con valores iniciales en blanco.
    const [formData, setFormData] = useState({
        nombre: '',
        apellido_1: '',
        apellido_2: '',
        telefono: '',
        direccion: '',
        ocupacion: '',
        especialidad: '',
        centro_educativo: ''
    });
    
    /**
     * Efecto para inicializar el ID del usuario y sincronizar los datos de `formData` con los de `user`.
     * Se ejecuta en el montaje del componente y en cualquier cambio de `user` o `profileType`.
     */
    useEffect(() => {
        // Obtiene el usuario almacenado en `sessionStorage` para persistencia entre recargas de página.
        const storedUser = sessionStorage.getItem('user');
        
        if (storedUser) {
            // Analiza el JSON del usuario almacenado y extrae el `id` para configurar el estado `userId`.
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser.id); // Establece el ID del usuario en `userId`.

            // Si `user` está disponible, configura `formData` con los valores actuales del perfil.
            if (user) {
                setFormData({
                    nombre: user?.nombre || '',          // Se asignan valores del usuario o quedan en blanco.
                    apellido_1: user?.apellido_1 || '',
                    apellido_2: user?.apellido_2 || '',
                    telefono: user?.telefono || '',
                    direccion: user?.direccion || '',
                    ocupacion: user?.ocupacion || '',
                    especialidad: user?.especialidad || '',
                    centro_educativo: user?.centro_educativo || ''
                });
            }
        }
    }, [user, profileType]); // El efecto depende de cambios en `user` o `profileType`.

    // Retorna todas las propiedades y métodos necesarios para gestionar el perfil en otros componentes,
    // proporcionando datos clave del perfil y métodos para recargar y actualizar el formulario.
    return {
        user,
        profileType,
        reloadUser,
        userId,
        formData,
        setFormData
    };
}
