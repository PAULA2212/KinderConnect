// useTablesDocForTeachers.js

// Importamos toast para las notificaciones y la función deleteDocument para eliminar documentos.
import { toast } from 'react-toastify';
import { deleteDocument } from '../../services/AdminDocumentService'; // Servicio que maneja la eliminación de documentos

// Hook personalizado para manejar la descarga y eliminación de documentos en el contexto de los profesores (educadores)
const useTablesDocForTeachers = (onAddorDelDocs) => {
    
    // Función para manejar la descarga de un documento
    const handleDownload = (url) => {
        console.log('URL del documento:', url); // Registramos la URL en la consola para depuración
        window.open(url, '_blank'); // Abre la URL del documento en una nueva pestaña del navegador
    };

    // Función para manejar la eliminación de un documento
    const handleDelete = async (id) => {
        console.log(`Borrar documento con ID: ${id}`); // Registramos el ID del documento en la consola para depuración
        try {
            // Llamamos al servicio para eliminar el documento, especificando que es un documento de educador ("educador")
            await deleteDocument(id, "educador");
            
            // Si la eliminación es exitosa, mostramos una notificación de éxito
            toast.success("Documento borrado correctamente.", { autoClose: 3000 });
            
            // Llamamos a la función onAddorDelDocs para refrescar la lista de documentos en la interfaz
            onAddorDelDocs();
        } catch (error) {
            // Si ocurre un error, mostramos una notificación de error
            toast.error("Hubo un error al borrar el documento.", { autoClose: 3000 });
        }
    };

    // Retornamos las funciones para que puedan ser usadas en los componentes que implementen este hook
    return {
        handleDownload, // Función para descargar documentos
        handleDelete,   // Función para borrar documentos
    };
};

export default useTablesDocForTeachers;
