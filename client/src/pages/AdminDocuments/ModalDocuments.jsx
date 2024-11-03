// Importamos los componentes necesarios para el modal. Usamos FontAwesome para los iconos,
// Bootstrap para los estilos y manejo de modales, y un hook personalizado `useModalDocuments`.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, Form, Button } from 'react-bootstrap';
import useModalDocuments from "./useModalDocuments"; // Hook personalizado que gestiona el estado del modal

// Este componente maneja la lógica de subir documentos mediante un modal.
// Recibe `profileType`, `user`, `kid`, y `onAddDocument` como props, que determinan 
// el comportamiento dependiendo del tipo de usuario y del niño seleccionado (si aplica).
export default function ModalDocuments({ profileType, user, kid, onAddDocument }) {
    // Extraemos el estado y las funciones del hook `useModalDocuments`.
    const {
        showModal,          // Estado que determina si el modal está visible
        handleShow,         // Función para mostrar el modal
        handleClose,        // Función para cerrar el modal
        handleSubmit,       // Función para manejar el submit del formulario
        loading,            // Estado de carga durante la subida del archivo
        setFile,            // Función para establecer el archivo PDF a subir
        documentName,       // Nombre del documento
        setDocumentName,    // Función para establecer el nombre del documento
    } = useModalDocuments(profileType, user, kid, onAddDocument);

    return (
        <>
            {/* Botón que abre el modal para subir un documento */}
            <button className='kinder-button' onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Subir documento
            </button>

            {/* Modal de Bootstrap para la subida de documentos */}
            <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir documento PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario para añadir un documento, el submit está manejado por handleSubmit */}
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        
                        {/* Campo para ingresar el nombre del documento */}
                        <Form.Group controlId="nombreDocumento">
                            <Form.Label>Nombre del documento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese un nombre para el documento"
                                value={documentName} // El valor es el estado actual del nombre
                                onChange={(e) => setDocumentName(e.target.value)} // Actualiza el nombre en el estado
                                required
                            />
                        </Form.Group>
                        
                        {/* Campo para subir un archivo PDF */}
                        <Form.Group controlId="documento">
                            <Form.Label>Subir documento PDF</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf" // Solo permite archivos con extensión .pdf
                                onChange={(e) => setFile(e.target.files[0])} // Actualiza el archivo en el estado
                                name="documento"
                                required
                            />
                        </Form.Group>

                        {/* Footer del modal, con un botón para enviar el formulario */}
                        <Modal.Footer>
                            {/* El botón de guardar se desactiva mientras el archivo se está subiendo */}
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading} // Deshabilita el botón si está en estado de carga
                            >
                                {/* Cambia el texto del botón según el estado de carga */}
                                {loading ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
