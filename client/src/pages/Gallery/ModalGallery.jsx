import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, Form, Button } from 'react-bootstrap';
import { useModalGallery } from "./useModalGallery"; // Importa el custom hook

/**
 * Componente `ModalGallery`
 * 
 * Modal de subida de imágenes para un niño específico. Permite que los educadores
 * seleccionen una imagen y la suban a la galería del niño. El modal se activa solo
 * para perfiles autorizados.
 * 
 * @param {Object} kid - Datos del niño, incluyendo su ID.
 * @param {Function} onAddImage - Callback para actualizar la galería tras la subida.
 * 
 * @returns JSX del componente `ModalGallery`.
 */
export default function ModalGallery({ kid, onAddImage }) {
    // Usa el hook personalizado para manejar la lógica del modal
    const {
        showModal,
        image,
        loading,
        handleShow,
        handleClose,
        handleSubmit,
        setImage
    } = useModalGallery(kid, onAddImage);

    return (
        <>
            {/* Botón para abrir el modal */}
            <button className="kinder-button" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Añadir imagen
            </button>

            {/* Modal de subida de imágenes */}
            <Modal show={showModal} onHide={handleClose} className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Añadir imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario para la subida de imagen */}
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Form.Group controlId="imagen">
                            <Form.Label>Subir imagen</Form.Label>
                            <Form.Control
                                type="file"                   // Tipo archivo para seleccionar imagen
                                accept="image/*"              // Acepta solo imágenes
                                onChange={(e) => setImage(e.target.files[0])} // Almacena la imagen seleccionada
                                name="imagen"
                                required
                            />
                        </Form.Group>
                        <Modal.Footer>
                            {/* Botón de envío, muestra "Guardando..." cuando está en estado de carga */}
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
