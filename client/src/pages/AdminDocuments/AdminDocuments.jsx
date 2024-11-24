// AdminDocuments.jsx

// Importaciones necesarias para el componente. Aquí usamos FontAwesome para iconos, 
// componentes modales y tablas personalizados, y el custom hook `useAdminDocuments`.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import ModalDocuments from "./ModalDocuments";
import TablesDocForTeachers from "./TablesDocForTeachers";
import TablesDocForParents from "./TablesDocForParents";
import useAdminDocuments from "./useAdminDocuments"; // Hook personalizado para manejar la lógica de los documentos

export default function AdminDocuments() {
    // Extraemos los datos y funciones del hook `useAdminDocuments`, lo que centraliza la lógica de carga de documentos y actualizaciones.
    const {
        user,                    // Datos del usuario actual (progenitor o educador)
        kid,                     // Datos del niño (si aplica)
        profileType,             // Tipo de perfil (educador o progenitor)
        kidDocs,                 // Documentos asociados al niño
        teacherDocs,             // Documentos subidos por el educador
        teacherDocsByLink,       // Documentos de los educadores visibles para los padres
        kidDocsByLink,           // Documentos de los niños visibles para los educadores
        loading,                 // Estado de carga de los documentos
        handleAddorDelDocsForEducator, // Función para gestionar la adición/eliminación de documentos para educadores
        handleAddorDelDocsForParent    // Función para gestionar la adición/eliminación de documentos para progenitores
    } = useAdminDocuments();

    return (
        <>
            

            {/* Modal para subir documentos. La función para manejar la adición de documentos varía
                según si el perfil es de un educador o de un progenitor */}
            <ModalDocuments 
                kid={kid} // Pasamos el niño seleccionado (si aplica)
                profileType={profileType} // El tipo de perfil (educador o progenitor)
                user={user} // Información del usuario actual
                onAddDocument={profileType === 'educador' ? handleAddorDelDocsForEducator : handleAddorDelDocsForParent} // Función específica según el tipo de usuario
            />

            {/* Si el usuario es un educador, mostramos la tabla para educadores */}
            {profileType === "educador" ? (
                <TablesDocForTeachers 
                    teacherDocs={teacherDocs} // Documentos del educador
                    kidDocs={kidDocsByLink}   // Documentos de los niños que el educador puede ver
                    onAddorDelDocs={handleAddorDelDocsForEducator} // Función para refrescar los documentos al agregar/eliminar
                />
            ) : (
                // Si el usuario es un progenitor, mostramos la tabla para progenitores
                <TablesDocForParents 
                    kid={kid} // Datos del niño seleccionado
                    kidDocs={kidDocs} // Documentos del niño
                    teachersDocs={teacherDocsByLink} // Documentos subidos por los educadores visibles para los padres
                    onAddorDelDocs={handleAddorDelDocsForParent} // Función para refrescar los documentos al agregar/eliminar
                />
            )}
        </>
    );
}
