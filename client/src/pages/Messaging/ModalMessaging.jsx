// ModalMessaging.js
import { useContext } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { UserContext } from '../../Context/UserContext';
import { useModalMessaging } from "./useModalMessaging"; // Importar el custom hook

/**
 * ModalMessaging:
 * Componente para mostrar un modal que permite enviar mensajes a otros usuarios.
 *
 * @param {Object} props - Propiedades del componente.
 * @returns {JSX.Element} - Componente del modal de mensajería.
 */
export default function ModalMessaging({ onAddMessage }) {
    const { user, profileType } = useContext(UserContext);
    const {
        showModal,
        setShowModal,
        loading,
        dataLoading,
        message,
        setMessage,
        recipient,
        setRecipient,
        subject,
        setSubject,
        potentialRecipients,
        handleSubmit,
    } = useModalMessaging(user, profileType, onAddMessage);

    // Condicional: Mostrar cargando si los datos no están disponibles aún
    if (!user || dataLoading) {
        return <Spinner animation="border" role="status"><span className="sr-only">Cargando...</span></Spinner>;
    }

    return (
        <>
            <button className='kinder-button' onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPlus} /> Nuevo mensaje
            </button>

            <Modal show={showModal} onHide={() => setShowModal(false)} className='kinder-modal' size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Enviar un mensaje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} method='post'>

                        {/* Selección de destinatario */}
                        <Form.Group as={Row} controlId='recipient' className="mb-3">
                            <Form.Label column sm={2}>Para</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    as='select'
                                    name="recipient"
                                    onChange={(e) => setRecipient(e.target.value)}
                                    required>
                                    <option value=''>Seleccione...</option>
                                    {potentialRecipients.map((recipient, index) => (
                                        <option key={index} value={profileType === "educador" ? recipient.id_progenitor : recipient.id_educador}>
                                            {recipient.nombre} {recipient.apellido_1} {recipient.apellido_2}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        {/* Campo de asunto */}
                        <Form.Group as={Row} controlId='subject' className="mb-3">
                            <Form.Label column sm={2}>Asunto</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="subject"
                                    placeholder="Asunto del mensaje"
                                    onChange={(e) => setSubject(e.target.value)}
                                    required />
                            </Col>
                        </Form.Group>

                        {/* Campo de mensaje (Textarea grande) */}
                        <Form.Group as={Row} controlId='message' className="mb-4">
                            <Form.Label column sm={2}>Mensaje</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    as="textarea"
                                    name="message"
                                    rows={8}  // Hacemos el textarea más grande
                                    onChange={(e) => setMessage(e.target.value)}
                                    required />
                            </Col>
                        </Form.Group>

                        {/* Pie del modal con botón de envío */}
                        <Modal.Footer>
                            <Button type='submit' variant="primary" disabled={loading}>
                                {loading ? 'Enviando...' : 'Enviar'}
                            </Button>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
