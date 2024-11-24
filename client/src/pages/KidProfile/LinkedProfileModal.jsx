import { Button, Form, Modal } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLinkedProfileModal from './useLinkedProfileModal';

/**
 * Componente `LinkedProfileModal` que permite a los usuarios (progenitores o educadores) vincular perfiles de niños
 * a sus cuentas, ingresando un código de vinculación.
 * 
 * @param {Object} user - Información del usuario actual, contiene ID y tipo de usuario.
 * @param {Function} fetchNiños - Función para refrescar la lista de niños vinculados después de un cambio.
 * @param {string} profileType - Indica el tipo de perfil del usuario actual (ej., "progenitor" o "educador").
 * @returns {JSX.Element} Modal para vincular perfiles de niños mediante código único.
 */
export default function LinkedProfileModal({ user, fetchNiños, profileType }) {
    // Usar el custom hook para gestionar la lógica del modal
    const [showModal, handleClose, handleShow, handleAddKids, uniqueCode, setUniqueCode, loading] = useLinkedProfileModal(fetchNiños, user, profileType);

    return (
        <>
            {/* Condicional que muestra un mensaje diferente si el usuario es progenitor */}
            {profileType === "progenitor" ? (
                <div className='button-p'>
                    <p>¿Tu hij@ ya tiene un perfil creado por otro progenitor?</p>
                    <Button onClick={handleShow} className='kinder-button'>
                        <FontAwesomeIcon icon={faPlus} /> Vincular con perfil
                    </Button>
                </div>
            ) : (
                <Button onClick={handleShow} className='kinder-button'>
                    <FontAwesomeIcon icon={faPlus} /> Añadir nuevo niño
                </Button>
            )}

            {/* Modal para que el usuario ingrese el código único del niño */}
            <Modal show={showModal} onHide={handleClose} centered className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Vincular Niño</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddKids}>
                        <Form.Group>
                            <Form.Label><strong>Código del niño:</strong></Form.Label>
                            <Form.Control
                                type="text"
                                name="unique_code"
                                value={uniqueCode}
                                onChange={(e) => setUniqueCode(e.target.value)}
                                className="form-input"
                                required
                            />
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
