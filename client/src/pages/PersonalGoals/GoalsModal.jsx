// GoalsModal.js

import { Modal, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function GoalsModal({ onAddGoal, kid, user }) {
  const [showModal, setShowModal] = useState(false);
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newGoal = {
      idKid: kid.id_niño, // Replace with actual kid id
      idTeacher: user.id_educador, // Replace with actual teacher id
      content: goal,
      state: 'pendiente',
    };

    try {
      await onAddGoal(newGoal); // Call the prop function to add the goal
      toast.success('Objetivo guardado exitosamente.', { autoClose: 3000 });
      setGoal('');
      setShowModal(false);
    } catch (error) {
      console.log('Error al guardar el objetivo:', error);
      toast.error('Ha habido un error al guardar el objetivo. Inténtalo de nuevo.', {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="kinder-button">
        <FontAwesomeIcon icon={faPlus} /> Añadir objetivo
      </button>
      <Modal show={showModal} onHide={handleClose} centered className="kinder-modal">
        <Modal.Header closeButton>
          <Modal.Title>Introduce el nuevo objetivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="kinder-form" onSubmit={handleSave}>
            <Form.Group controlId="goal">
              <Form.Label>Objetivo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el objetivo"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                maxLength={200}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button type="submit" variant="primary" disabled={loading}>
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
