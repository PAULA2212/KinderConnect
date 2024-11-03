// useAdminDocuments.js

// Importamos los hooks useEffect, useState y useContext de React para manejar el ciclo de vida del componente,
// los estados locales y el acceso a contextos.
import { useEffect, useState, useContext } from 'react';
import { KidContext } from '../../Context/KidContext'; // Contexto para obtener información del niño
import { UserContext } from "../../Context/UserContext"; // Contexto para obtener información del usuario
import { getDocumentById, getDocumentByLink } from "../../services/AdminDocumentService"; // Servicios para obtener documentos

// Hook personalizado para manejar la obtención de documentos en función del perfil (educador o progenitor)
const useAdminDocuments = () => {
    
    // Obtenemos el estado del niño y del usuario desde los contextos
    const { kid } = useContext(KidContext);
    const { user, profileType } = useContext(UserContext);

    // Estados para almacenar los documentos obtenidos
    const [kidDocs, setKidDocs] = useState([]); // Documentos asociados al niño
    const [teacherDocs, setTeacherDocs] = useState([]); // Documentos asociados al educador
    const [teacherDocsByLink, setTeacherDocsByLink] = useState([]); // Documentos del profesor por link
    const [kidDocsByLink, setKidDocsByLink] = useState([]); // Documentos del niño por link
    const [loading, setLoading] = useState(true); // Estado de carga para indicar si los datos están siendo obtenidos

    // Función para obtener documentos del niño por su ID
    const fetchKidDocById = async () => {
        if (kid && kid.id_niño) { // Verificamos que haya un niño y que tenga un ID válido
            try {
                const data = await getDocumentById(kid.id_niño, "kid"); // Llamada al servicio que obtiene los documentos
                setKidDocs(data); // Actualizamos el estado con los documentos obtenidos
            } catch (error) {
                console.error('Error al obtener documentos del niño:', error); // Manejamos el error
            }
        }
    };

    // Función para obtener documentos del educador por su ID
    const fetchTeacherDocById = async () => {
        if (user && user.id_educador) { // Verificamos que el usuario sea un educador y que tenga un ID válido
            try {
                const data = await getDocumentById(user.id_educador, "educador"); // Llamada al servicio que obtiene los documentos
                setTeacherDocs(data); // Actualizamos el estado con los documentos obtenidos
            } catch (error) {
                console.error('Error al obtener documentos del profesor:', error); // Manejamos el error
            }
        }
    };

    // Función para obtener documentos de los niños por el link del educador
    const fetchKidDocByTeacherLink = async () => {
        if (user && user.id_educador) { // Verificamos que el usuario sea un educador con ID válido
            try {
                const data = await getDocumentByLink(user.id_educador, "educador"); // Obtenemos los documentos usando el link
                setKidDocsByLink(data); // Actualizamos el estado con los documentos obtenidos por link
            } catch (error) {
                console.error('Error al obtener documentos por link del profesor:', error); // Manejamos el error
            }
        }
    };

    // Función para obtener documentos de los educadores por el link del niño
    const fetchTeacherDocByKidLink = async () => {
        if (kid && kid.id_niño) { // Verificamos que el niño tenga un ID válido
            try {
                const data = await getDocumentByLink(kid.id_niño, "kid"); // Obtenemos los documentos usando el link del niño
                setTeacherDocsByLink(data); // Actualizamos el estado con los documentos obtenidos por link
            } catch (error) {
                console.error('Error al obtener documentos por link del niño:', error); // Manejamos el error
            }
        }
    };

    // Función que obtiene los documentos relacionados con el educador
    const fetchDataForEducator = async () => {
        await Promise.all([fetchTeacherDocById(), fetchKidDocByTeacherLink()]); // Ejecutamos ambas funciones simultáneamente
    };

    // Función que obtiene los documentos relacionados con el progenitor (documentos del niño y del profesor)
    const fetchDataForParent = async () => {
        await Promise.all([fetchKidDocById(), fetchTeacherDocByKidLink()]); // Ejecutamos ambas funciones simultáneamente
    };

    // useEffect para obtener los documentos cuando cambien ciertos estados (profileType, user o kid)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Activamos el estado de carga
            try {
                // Si el perfil es de educador, llamamos a la función correspondiente
                if (profileType === 'educador') {
                    await fetchDataForEducator();
                } 
                // Si el perfil es de progenitor y hay un niño, llamamos a la función correspondiente
                else if (profileType === 'progenitor' && kid) {
                    await fetchDataForParent();
                }
            } catch (error) {
                console.error("Error fetching documents:", error); // Manejamos los errores
            } finally {
                setLoading(false); // Desactivamos el estado de carga
            }
        };

        // Llamamos a la función fetchData cuando el perfil es educador o progenitor y hay datos del usuario o del niño
        if ((profileType === 'educador' && user) || (profileType === 'progenitor' && kid)) {
            fetchData();
        }
    }, [kid, profileType, user]); // El efecto se ejecutará cada vez que cambien kid, profileType o user

    return {
        user,
        kid,
        profileType,
        kidDocs,            // Documentos del niño
        teacherDocs,        // Documentos del educador
        teacherDocsByLink,  // Documentos del educador por link del niño
        kidDocsByLink,      // Documentos del niño por link del educador
        loading,            // Estado de carga
        handleAddorDelDocsForEducator: fetchDataForEducator,  // Función para recargar documentos de educadores
        handleAddorDelDocsForParent: fetchDataForParent       // Función para recargar documentos de padres
    };
};

export default useAdminDocuments;
