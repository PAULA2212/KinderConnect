// useModalDocuments.js

// Importamos el hook useState de React para manejar el estado local y el toast para mostrar notificaciones.
import { useState } from "react";
import { toast } from "react-toastify";
import { addDocument } from "../../services/AdminDocumentService"; // Servicio para agregar documentos

// Hook personalizado para manejar la lógica del modal de subida de documentos
const useModalDocuments = (profileType, user, kid, onAddDocument) => {
    // Estado para manejar la visibilidad del modal, el archivo seleccionado, el nombre del documento y el estado de carga
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [file, setFile] = useState(null); // Archivo seleccionado
    const [documentName, setDocumentName] = useState(""); // Nombre del documento
    const [loading, setLoading] = useState(false); // Estado de carga para indicar si se está subiendo un documento

    // Función para mostrar el modal
    const handleShow = () => setShowModal(true);
    
    // Función para cerrar el modal
    const handleClose = () => setShowModal(false);

    // Función que maneja el envío del formulario cuando se sube un documento
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario

        // Validación para asegurarse de que se ha seleccionado un archivo
        if (!file) {
            toast.error("Por favor, selecciona un documento PDF.", { autoClose: 3000 });
            return;
        }

        // Validación para asegurar que el archivo seleccionado es un PDF
        if (file.type !== "application/pdf") {
            toast.error("Solo se permiten documentos PDF.", { autoClose: 3000 });
            return;
        }

        // Establecemos el estado de carga en true mientras se sube el documento
        setLoading(true);

        // Creamos un objeto FormData para enviar el archivo y otros datos al servidor
        const formData = new FormData();
        formData.append("documento", file); // Añadimos el archivo seleccionado
        formData.append("nombre", documentName); // Añadimos el nombre del documento
        formData.append("kid_id", profileType === "progenitor" ? kid.id_niño : null); // Añadimos el ID del niño si el perfil es "progenitor"
        formData.append("id_educador", profileType === "progenitor" ? null : user.id_educador); // Añadimos el ID del educador si el perfil no es "progenitor"

        try {
            // Llamamos al servicio para subir el documento
            await addDocument(formData, profileType);
            
            // Mostramos una notificación de éxito
            toast.success("Documento subido correctamente.", { autoClose: 3000 });
            
            // Refrescamos la lista de documentos llamando a la función pasada como parámetro
            onAddDocument();
            
            // Cerramos el modal y restablecemos los campos
            handleClose();
            resetFields();
        } catch (error) {
            // Mostramos una notificación de error si algo sale mal
            toast.error("Hubo un error al subir el documento.", { autoClose: 3000 });
        } finally {
            // Establecemos el estado de carga en false una vez finalizado el proceso
            setLoading(false);
        }
    };

    // Función para restablecer los campos de entrada del formulario
    const resetFields = () => {
        setFile(null); // Restablecemos el archivo seleccionado
        setDocumentName(""); // Restablecemos el nombre del documento
    };

    // El hook devuelve los siguientes valores y funciones para ser usados en el componente que lo implemente
    return {
        showModal,         // Estado para controlar si el modal está visible o no
        handleShow,        // Función para mostrar el modal
        handleClose,       // Función para cerrar el modal
        handleSubmit,      // Función para manejar el envío del formulario
        loading,           // Estado de carga mientras se sube el documento
        setFile,           // Función para establecer el archivo seleccionado
        documentName,      // Nombre del documento
        setDocumentName,   // Función para establecer el nombre del documento
    };
};

export default useModalDocuments;
