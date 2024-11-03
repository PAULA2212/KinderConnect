import { createContext, useState, useEffect } from 'react'; // Importa los hooks y el contexto de React
import axiosInstance from '../utils/axiosInstance'; // Importa la instancia de axios para realizar solicitudes HTTP

// Crea el contexto para el estado del usuario
export const UserContext = createContext();

/**
 * UserProvider Component
 * 
 * Este componente proporciona el contexto para la información del usuario en la aplicación. 
 * Carga los detalles del usuario desde el almacenamiento de sesión y desde el servidor, 
 * y ofrece funciones para limpiar y recargar la información del usuario. 
 */
export const UserProvider = ({ children }) => {
    console.log('UserProvider: Component render start'); // Log para monitorear el inicio del renderizado del componente

    // Estado para almacenar el usuario, el tipo de perfil y el estado de carga
    const [user, setUser] = useState(null);
    const [profileType, setProfileType] = useState(''); // Inicialmente vacío, se establecerá desde parsedUser
    const [loading, setLoading] = useState(true); // Indica si se está cargando la información

    // Función para obtener los detalles del usuario desde el servidor
    const fetchUserDetails = async (userId, perfil) => {
        console.log('UserProvider: Fetching user details for:', userId, perfil); // Log para indicar la búsqueda de detalles del usuario
        try {
            const response = await axiosInstance.get(`/detalleUsuario/${userId}/${perfil}`); // Solicitud GET para obtener detalles del usuario
            console.log('UserProvider: User details fetched:', response.data); // Log de los datos obtenidos
            return response.data; // Retorna los datos obtenidos
        } catch (error) {
            console.error('UserProvider: Error fetching user details:', error); // Log de error
            return null; // Retorna null si hay un error
        }
    };

    // Función para cargar los datos del usuario desde el almacenamiento de sesión
    const loadUser = async () => {
        console.log('UserProvider: Checking session storage...'); // Log para verificar el almacenamiento de sesión
        const storedUser = sessionStorage.getItem('user'); // Obtiene el usuario almacenado en sesión

        if (storedUser) { // Verifica si hay un usuario almacenado
            console.log('UserProvider: User found in session storage:', storedUser); // Log para indicar que se encontró un usuario
            const parsedUser = JSON.parse(storedUser); // Parsea el usuario almacenado
            const userId = parsedUser.id; // Obtiene el ID del usuario
            const userProfile = parsedUser.perfil; // Extrae el perfil del usuario

            setProfileType(userProfile); // Establece el tipo de perfil

            const userData = await fetchUserDetails(userId, userProfile); // Obtiene los datos del usuario
            if (userData) {
                console.log('UserProvider: Setting user details:', userData); // Log para indicar que se están estableciendo los detalles del usuario
                setUser(userData); // Actualiza el estado con los datos obtenidos
            } else {
                setUser(null); // Si no se obtienen datos, establece user como null
            }
        } else {
            console.log('UserProvider: No user found in session storage.'); // Log si no se encontró un usuario
            setUser(null); // Establece el estado del usuario a null
            setProfileType(''); // Configura profileType como vacío si no se encuentra el usuario
        }
        setLoading(false); // Establece el estado de carga como falso
    };

    // Efecto que carga los datos del usuario cuando se monta el componente
    useEffect(() => {
        loadUser(); // Llama a la función para cargar los datos del usuario
    }, []); // Se ejecuta solo una vez al montar el componente

    // Función para limpiar los datos del usuario del estado y del almacenamiento de sesión
    const clearUser = () => {
        console.log('UserProvider: Clearing user data'); // Log para indicar que se están limpiando los datos del usuario
        setUser(null); // Limpia el estado del usuario
        setProfileType(''); // Limpia el tipo de perfil
        sessionStorage.removeItem('user'); // Elimina el usuario del almacenamiento de sesión
    };

    // Función para recargar la información del usuario
    const reloadUser = () => {
        console.log('UserProvider: Reloading user data'); // Log para indicar que se está recargando la información
        loadUser(); // Llama a la función para cargar los datos del usuario nuevamente
    };

    return (
        <UserContext.Provider value={{ user, profileType, clearUser, loading, reloadUser }}> {/* Provee el contexto con los datos del usuario */}
            {children} {/* Renderiza los hijos del proveedor */}
        </UserContext.Provider>
    );
};
