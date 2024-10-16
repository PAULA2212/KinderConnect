import { useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KidContext } from '../../Context/KidContext';
import axiosInstance from "../../utils/axiosInstance";
import './Diary.css';

export default function ParentsDiaryForm() {
    const [showModal, setShowModal] = useState(false);
    const [medicacion, setMedicacion] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { kid } = useContext(KidContext);

    // Función para guardar los datos del diario
    const saveDiaryEntry = async (data) => {
        try {
            const response = await axiosInstance.post('/diario_progenitores/insertar', data);
            return response.data;
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            throw error;
        }
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setSuccessMessage(''); // Limpiar mensaje de éxito al cerrar el modal
    };

    const handleSave = async () => {
        if (!kid || !kid.id_niño) {
            console.error("No se ha seleccionado un niño.");
            return;
        }

        const data = {
            id_niño: kid.id_niño,
            fecha: new Date().toISOString().slice(0, 10), // Obtiene la fecha actual en formato YYYY-MM-DD
            medicacion,
            comentarios
        };

        try {
            await saveDiaryEntry(data); // Llama a la función para guardar los datos
            const formattedDate = new Date().toLocaleDateString(); // Formatear la fecha para mostrar
            setSuccessMessage(`Tu registro del día ${formattedDate} se ha guardado correctamente.`);
            handleClose(); // Cierra el formulario después de guardar (opcional)
        } catch (error) {
            setSuccessMessage('Error al guardar el registro. Por favor, intente nuevamente.');
        }
    };

    return (
        <>
            <button onClick={handleShow} className="edit-icon">
                <FontAwesomeIcon icon={faPencil} />
            </button>

            <Modal show={showModal} onHide={handleClose} centered className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Introduce los datos del dia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="kinder-form form-ParentsDiary">
                        <Form.Group controlId="diaryMedication">
                            <Form.Label>Medicación</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la medicación, la dosis y la hora de la toma"
                                value={medicacion}
                                onChange={(e) => setMedicacion(e.target.value)}
                                maxLength={50}
                                className="form-input"
                            />
                        </Form.Group>
                        <Form.Group controlId="diaryComments">
                            <Form.Label>Comentarios</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Escriba aquí..."
                                value={comentarios}
                                onChange={(e) => setComentarios(e.target.value)}
                                className="form-input"
                            />
                        </Form.Group>
                    </Form>
                    {/* Mostrar el mensaje de éxito o error */}
                    {successMessage && (
                        <p className="success-message">{successMessage}</p>
                    )}
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={handleSave}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
