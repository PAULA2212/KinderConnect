import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Form, Button } from 'react-bootstrap';
import { addDocument } from "../../services/AdminDocuments/uploadDocumentsService";



export default function ModalDocuments({profileType, user, kid, onAddDocument}) {

    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null); // Cambié a null para los archivos
    const [documentName, setDocumentName] = useState("")
    const [loading, setLoading] = useState(false);

    const handleShow = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            toast.error("Por favor, selecciona un documento PDF.", { autoClose: 3000 });
            return;
        }

        if (file.type !== "application/pdf") {
            toast.error("Solo se permiten documentos PDF.", { autoClose: 3000 });
            return;
        }

        setLoading(true);

        // Aquí puedes manejar el envío del archivo
        const formData = new FormData();
        formData.append("documento", file); // Agrega el archivo PDF
        formData.append("nombre", documentName); // Agrega el nombre del documento
        formData.append("kid_id", profileType === "progenitor" ? kid.id_niño : null);
        formData.append("id_educador", profileType === "progenitor" ? null : user.id_educador)
        try {
            // Llama a la función que maneja la subida
            await addDocument(formData, profileType);
            // Suponiendo que se ha subido el documento con éxito
            toast.success("Documento subido correctamente.", { autoClose: 3000 });
            onAddDocument(); // Función para refrescar la lista de documentos
            setShowModal(false);
            setFile(null); // Reinicia el archivo
        } catch (error) {
            toast.error("Hubo un error al subir el documento.", { autoClose: 3000 });
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    return (
        <>
            <button className='kinder-button' onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Subir documento
            </button>
            <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir documento PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Form.Group controlId="nombreDocumento">
                            <Form.Label>Nombre del documento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese un nombre para el documento"
                                value={documentName} // Estado para el nombre del documento
                                onChange={(e) => setDocumentName(e.target.value)} // Actualiza el estado
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="documento">
                            <Form.Label>Subir documento PDF</Form.Label>
                            <Form.Control
                                type="file" // Tipo de archivo
                                accept=".pdf" // Acepta solo archivos PDF
                                onChange={(e) => setFile(e.target.files[0])} // Guarda el archivo seleccionado
                                name="documento" // Nombre del campo del archivo
                                required
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>

    );
}