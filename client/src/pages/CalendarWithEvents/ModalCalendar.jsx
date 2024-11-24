// components/ModalCalendar.js
import { Button, Form, Modal } from "react-bootstrap";
import useModalCalendar from './useModalCalendar'; // Importar el custom hook

/**
 * Componente que muestra un modal para añadir nuevos eventos.
 * Permite al educador agregar eventos y seleccionar a los niños.
 *
 * @param {Function} fetchEvents - Función para volver a obtener los eventos después de agregar uno nuevo.
 * @param {Object} user - Objeto del usuario actual que incluye información del educador.
 * @param {string} profileType - Tipo de perfil del usuario (educador).
 */
export default function ModalCalendar({ fetchEvents, user, profileType }) {
    // Usar el custom hook para manejar la lógica del modal
    const {
        selectedKids,
        showModal,
        kids,
        newEvent,
        handleModalOpen,
        handleModalClose,
        handleInputChange,
        handleKidSelectionChange,
        handleSubmitEvent,
        loading
    } = useModalCalendar(fetchEvents, user, profileType); // Desestructurar el hook

    return (
        <>
            <Button variant="primary" onClick={handleModalOpen} className="kinder-button">
                Añadir Evento
            </Button>
            <Modal show={showModal} onHide={handleModalClose} className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Nuevo Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitEvent}>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newEvent.title}
                                onChange={handleInputChange}
                                placeholder="Ingrese el título del evento"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={newEvent.description}
                                onChange={handleInputChange}
                                placeholder="Ingrese la descripción del evento"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newEvent.date}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hora</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={newEvent.time}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Invitar a Niños</Form.Label>
                            <Form.Control as="select" multiple onChange={handleKidSelectionChange} >
                                {kids.map((kid) => (
                                    <option key={kid.id_niño} value={kid.id_niño}>
                                        {kid.nombre} {kid.apellido_1} {kid.apellido_2}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Modal.Footer>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}>
                                {loading ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}
