// Importación de componentes específicos para los perfiles de progenitores y educadores
import KidProfileParents from "./KidProfileParents"; // Componente para el perfil de progenitores
import KidProfileTeachers from "./KidProfileTeachers"; // Componente para el perfil de educadores

// Importación de UserContext para acceder al contexto de usuario
import { UserContext } from "../../Context/UserContext"; // Contexto que contiene datos compartidos sobre el usuario actual
import { useContext } from "react"; // Hook de React para consumir contextos

/**
 * Componente KidProfile
 * 
 * Este componente renderiza el perfil del niño específico para el tipo de usuario:
 * progenitor o educador. Utiliza el contexto `UserContext` para determinar el tipo 
 * de perfil que debe mostrarse.
 * 
 * @returns {JSX.Element} - JSX que representa el perfil específico del niño
 *                          para el usuario actual (progenitor o educador).
 */
export default function KidProfile() {
    // Extracción de `profileType` del contexto de usuario para identificar el tipo de perfil del usuario actual
    const { profileType } = useContext(UserContext);

    return (
        <>
            {/* Renderiza el componente KidProfileParents si el tipo de perfil es 'progenitor' */}
            {profileType === 'progenitor' && <KidProfileParents />}

            {/* Renderiza el componente KidProfileTeachers si el tipo de perfil es 'educador' */}
            {profileType === 'educador' && <KidProfileTeachers />}
        </>
    );
}
