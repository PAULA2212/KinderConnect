import { createContext, useState, useEffect, useContext } from "react"; // Importa los hooks y el contexto de React
import axiosInstance from "../utils/axiosInstance"; // Importa la instancia de axios para realizar solicitudes HTTP
import { UserContext } from "./UserContext"; // Importa el contexto de usuario para obtener información sobre el usuario actual

// Crea el contexto para el estado de los niños
export const KidContext = createContext();

/**
 * KidProvider Component
 * 
 * Este componente proporciona el contexto para la información relacionada con los niños
 * en la aplicación. Utiliza el contexto de usuario para determinar el tipo de perfil 
 * del usuario y carga los datos de los niños desde el servidor. Ofrece funciones para 
 * cargar y recargar los datos del niño, y mantiene el estado del niño en la aplicación.
 */
export const KidProvider = ({ children }) => {
    console.log('KidProvider: Component render start'); // Log para monitorear el renderizado del componente
    
    // Obtiene el usuario y el tipo de perfil del contexto de usuario
    const { user, profileType } = useContext(UserContext);
    const idUser = user ? (profileType === 'progenitor' ? user.id_progenitor : user.id_educador) : null; // Determina el ID del usuario según el tipo de perfil

    // Estado para almacenar los datos del niño
    const [kid, setKid] = useState(null);
    const [sessionCleared, setSessionCleared] = useState(false); // Nuevo estado para manejar la limpieza de sesión

    // Función para obtener los datos del niño desde el servidor
    const fetchKidData = async (kidId) => {
        console.log('KidProvider: Fetching kid details for:', kidId); // Log para indicar la búsqueda de datos
        try {
            const response = await axiosInstance.get(`/contextokid/${kidId}`); // Solicitud GET para obtener datos del niño
            console.log('KidProvider: Kid details fetched:', response.data); // Log de los datos obtenidos
            return response.data; // Retorna los datos obtenidos
        } catch (error) {
            console.error('KidProvider: Error fetching kid details:', error); // Log de error
            return null; // Retorna null si ocurre un error
        }
    };

    // Función para cargar los datos del niño desde el almacenamiento de sesión
    const loadKid = async () => {
        console.log('KidProvider: Checking session storage...'); // Log para verificar el almacenamiento de sesión
        const storeKid = Number(sessionStorage.getItem(`idKid_${idUser}`)); // Obtiene el ID del niño almacenado en sesión

        if (storeKid) { // Verifica si hay un ID de niño en el almacenamiento de sesión
            console.log('KidProvider: Kid found in session storage:', storeKid); // Log para indicar que se encontró un niño
            const kidId = Number(storeKid); // Asegura que el ID sea un número
            const kidData = await fetchKidData(kidId); // Obtiene los datos del niño
            if (kidData) {
                setKid(kidData); // Actualiza el estado con los datos obtenidos
                console.log('KidProvider: Setting kid state and scheduling sessionStorage cleanup'); // Log para indicar que se está actualizando el estado

                // Demorar la eliminación del idKid para permitir que se renderice el mensaje
                /* setTimeout(() => {
                    sessionStorage.removeItem(`idKid_${idUser}`);
                    console.log('KidProvider: idKid removed from sessionStorage');
                    setSessionCleared(true); // Actualizar estado indicando que se limpió el sessionStorage
                }, 3000); // 3 segundos de demora */
            }
        } else {
            console.log('KidProvider: No kid found in session storage'); // Log si no se encontró un niño
            setKid(null); // Establece el estado del niño a null
        }
    };

    // Función para recargar los datos del niño
    const reloadKid = () => {
        console.log('KidProvider: Reloading kid data'); // Log para indicar que se está recargando los datos
        loadKid(); // Llama a loadKid para obtener los datos del niño nuevamente
    }

    // Efecto que carga los datos del niño cuando el proveedor se monta o cuando cambia el usuario
    useEffect(() => {
        if (user) {
            console.log('KidProvider: User or profileType updated, loading kid data...'); // Log para indicar que se están cargando los datos del niño
            loadKid(); // Llama a la función para cargar los datos del niño
        }
    }, [user]); // Dependencia del efecto: se ejecuta cada vez que cambia 'user'

    return (
        <KidContext.Provider value={{ kid, reloadKid }}> {/* Provee el contexto con los datos del niño y la función de recarga */}
            {children} {/* Renderiza los hijos del proveedor */}
        </KidContext.Provider>
    );
};
