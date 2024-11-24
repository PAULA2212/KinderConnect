import { useState } from "react";
import { Button, Form, Modal, ToastContainer } from 'react-bootstrap';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUpdateProfileModal from './useUpdateProfileModal';

/**
 * Componente `UpdateProfileModal` que permite a los educadores actualizar el perfil de un niño.
 * 
 * @param {Object} kid - Información del niño cuyo perfil se va a actualizar.
 * @param {Function} fetchNiños - Función para refrescar la lista de niños después de una actualización.
 * @returns {JSX.Element} Modal para actualizar el perfil del niño.
 */
export default function UpdateProfileModal({ kid, fetchNiños }) {
    // Usar el custom hook para gestionar la lógica del modal
    const [showForm, handleShow, handleChange, formData, centros, handleUpdateNiño, setShowForm, loading] = useUpdateProfileModal(kid, fetchNiños);

    return (
        <>
            <button onClick={handleShow} className="edit-icon">
                <FontAwesomeIcon icon={faPencil} />
            </button>
            {/* Modal para actualizar el perfil del niño */}
            <Modal show={showForm} onHide={() => setShowForm(false)} centered className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Niño</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateNiño}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Primer Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_1"
                                value={formData.apellido_1}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Segundo Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_2"
                                value={formData.apellido_2}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha_nacimiento"
                                value={formData.fecha_nacimiento}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Centro Educativo</Form.Label>
                            <Form.Control
                                as="select"
                                name="centro_educativo"
                                value={formData.centro_educativo}
                                onChange={handleChange}
                                className="form-input"
                                required
                            >
                                <option value="">Seleccionar centro</option>
                                {centros.map((centro) => (
                                    <option key={centro.id_centro} value={centro.nombre}>
                                        {centro.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Modal.Footer>
                            {/* Botón para guardar el objetivo, deshabilitado mientras se está guardando */}
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? 'Guardando...' : 'Guardar'}  {/* Cambia el texto del botón según el estado de carga */}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
