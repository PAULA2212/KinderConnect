import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';

export default function ModalAssessment({ kid, user, onAssessmentUpdate }) {
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const data = {
            idTeacher: user.id_educador,
            idKid: kid.id_niño,
            date: new Date(),
            content: content
        };

        try {
            await axiosInstance.post('/addAssessment', data);
            toast.success('La evaluación se guardó correctamente', { autoClose: 3000 });
            setContent('');
            setShowModal(false);
            if (onAssessmentUpdate) onAssessmentUpdate();  // Llama a la función para actualizar la lista
        } catch (error) {
            console.log('Error al guardar la evaluación:', error);
            toast.error('Ha habido un error al guardar la evaluación.', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button className='kinder-button' onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Añadir evaluación
            </button>

            <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Evaluación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBookTitle">
                            <Form.Label>Contenido</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                placeholder="Escribe aquí los datos de la evaluación"
                                name="contenido"
                                onChange={(e) => setContent(e.target.value)}
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
