import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Form, Button } from 'react-bootstrap';
import { addImage } from "../../services/Gallery/addImageService";

export default function ModalGallery({ kid, onAddImage }) {
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null); // Cambié a null para los archivos
    const [loading, setLoading] = useState(false);

    const handleShow = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Verifica si se ha seleccionado una imagen
        if (!image) {
            toast.error("Por favor, selecciona una imagen.", { autoClose: 3000 });
            return; // Detiene la ejecución aquí si no hay imagen
        }
    
        setLoading(true); // Activa el estado de carga
    
        const formData = new FormData();
        formData.append("imagen", image); // Añade la imagen al FormData
        formData.append("kid_id", kid.id_niño); // Añade el ID del niño
    
        try {
            // Intenta subir la imagen
            await addImage(formData);
            
            // Si la imagen se sube correctamente, muestra el toast de éxito
            toast.success("Imagen subida correctamente.", { autoClose: 3000 });
            
            // Ejecuta la función que se pasa como prop para actualizar la galería
            onAddImage();
            setShowModal(false); // Cierra el modal
            setImage(null); // Resetea la imagen
        } catch (error) {
            // Muestra el toast de error si hay un problema
            toast.error("Hubo un error al subir la imagen.", { autoClose: 3000 });
            console.error("Error al subir la imagen:", error); // Registra el error en consola
        } finally {
            setLoading(false); // Desactiva el estado de carga al final
        }
    };
    

    return (
        <>
            <button className='kinder-button' onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Añadir imagen
            </button>
            <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Form.Group controlId="imagen">
                            <Form.Label>Subir imagen</Form.Label>
                            <Form.Control
                                type="file" // Cambiado a tipo "file"
                                accept="image/*" // Acepta solo archivos de imagen
                                onChange={(e) => setImage(e.target.files[0])}
                                name="imagen" // Guarda la imagen seleccionada
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

            <ToastContainer />
        </>
    );
}
