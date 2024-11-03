// MedicalModal.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Form, Button } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMedicalModal } from "./useMedicalModal";

/**
 * MedicalModal:
 * Componente de presentación para agregar una condición médica a un niño seleccionado.
 * Utiliza el custom hook useMedicalModal para manejar la lógica de estado y el envío del formulario.
 *
 * @param {Object} props.kid - Objeto del niño que incluye el ID necesario para asociar la condición.
 * @param {Function} props.onAddCondition - Función que se llama para actualizar las condiciones tras una adición exitosa.
 * @returns {JSX.Element} - Componente del modal de condiciones médicas
 */
export default function MedicalModal({ kid, onAddCondition }) {
    // Usa el custom hook para obtener el estado y las funciones necesarias
    const {
        showModal,
        openModal,
        closeModal,
        handleSubmit,
        title,
        setTitle,
        details,
        setDetails,
        loading,
    } = useMedicalModal(kid, onAddCondition);

    return (
        <>
            {/* Botón para abrir el modal */}
            <button className="kinder-button" onClick={openModal}>
                <FontAwesomeIcon icon={faPlus} /> Añadir
            </button>

            {/* Modal de formulario para agregar condición médica */}
            <Modal show={showModal} onHide={closeModal} className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Añadir una condición médica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Condición médica</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={title}
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="details">
                            <Form.Label>Detalles</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder="Proporcione detalles adicionales sobre la condición médica..."
                                name="details"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button type="submit" disabled={loading} className="kinder-button">
                                {loading ? "Guardando..." : "Guardar"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
