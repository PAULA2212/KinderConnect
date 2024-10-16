/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../Context/UserContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BookModalForm = ({ onBookAdded }) => {
  const { user, profileType } = useContext(UserContext);
  const [formData, setFormData] = useState(new FormData());
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    const newFormData = new FormData();

    // Transferir los datos existentes
    formData.forEach((val, key) => newFormData.append(key, val));

    if (files && files.length > 0) {
      newFormData.set(name, files[0]);
    } else {
      newFormData.set(name, value);
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    formData.set('id_usuario', profileType === 'educador' ? user.id_educador : user.id_progenitor);

    try {
      await axiosInstance.post('/addBook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Libro añadido correctamente', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Limpiar campos del formulario
      setFormData(new FormData());
      handleClose();

      // Llamar a la función de actualización del componente padre
      if (onBookAdded) onBookAdded();
    } catch (error) {
      toast.error('Error al añadir el libro', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Error al añadir el libro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className='kinder-button' onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus}/> Añadir Libro
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

      <ToastContainer />
    </>
  );
};

export default BookModalForm;
