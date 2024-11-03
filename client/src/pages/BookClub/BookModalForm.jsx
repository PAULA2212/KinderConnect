import { Modal, Button, Form } from 'react-bootstrap'; // Importa los componentes de Bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el icono de FontAwesome
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Importa el icono específico (más)
import useBookModal from './useBookModalForm'; // Importa el custom hook

export default function BookModalForm({ onBookAdded }){
  const {
    showModal,
    handleShow,
    handleClose,
    handleInputChange,
    handleSubmit,
    loading,
  } = useBookModal(onBookAdded); // Usa el custom hook

  return (
    <>
      <button className='kinder-button' onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus} /> Añadir Libro
      </button>

      <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Libro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBookTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce el título del libro"
                name="titulo"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBookComment">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Introduce un comentario sobre el libro"
                name="comentario"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBookImage">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                name="imagen_url"
                onChange={handleInputChange}
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
