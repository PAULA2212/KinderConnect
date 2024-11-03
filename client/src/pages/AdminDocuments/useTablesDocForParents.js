// useTablesDocForParents.js

// Importamos el toast para mostrar notificaciones al usuario y la función deleteDocument para eliminar documentos.
import { toast } from 'react-toastify';
import { deleteDocument } from '../../services/AdminDocumentService'; // Servicio que se encarga de borrar documentos

// Hook personalizado para manejar la lógica de descarga y eliminación de documentos en el contexto de los padres
const useTablesDocForParents = (onAddorDelDocs) => {
    
    // Función para manejar la descarga de un documento
    const handleDownload = (url) => {
        console.log('URL del documento:', url); // Registramos la URL en la consola para depuración
        window.open(url, '_blank'); // Abre la URL del documento en una nueva pestaña del navegador
    };

    // Función para manejar la eliminación de un documento
    const handleDelete = async (id) => {
        console.log(`Borrar documento con ID: ${id}`); // Registramos el ID del documento en la consola para depuración
        try {
            // Llamamos al servicio para eliminar el documento, indicando que es un documento de un niño ("kid")
            await deleteDocument(id, "kid");
            
            // Si la eliminación es exitosa, mostramos una notificación de éxito
            toast.success("Documento borrado correctamente.", { autoClose: 3000 });
            
            // Llamamos a la función onAddorDelDocs para refrescar la lista de documentos
            onAddorDelDocs();
        } catch (error) {
            // Si ocurre un error durante la eliminación, mostramos una notificación de error
            toast.error("Hubo un error al borrar el documento.", { autoClose: 3000 });
        }
    };

    // Retornamos las funciones para que puedan ser usadas en el componente que implemente este hook
    return {
        handleDownload, // Función para descargar documentos
        handleDelete,   // Función para borrar documentos
    };
};

export default useTablesDocForParents;

