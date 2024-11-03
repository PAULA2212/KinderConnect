import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useModalProfile } from './useModalProfile';

/**
 * Componente ModalProfile
 * 
 * Este componente proporciona una interfaz modal para editar la información de perfil de un usuario,
 * adaptándose según el tipo de perfil ('progenitor' o 'educador') y permite actualizar campos específicos.
 * Integra el hook personalizado `useModalProfile` para manejar la lógica de edición, carga de centros educativos
 * y el control de visibilidad del modal.
 * 
 * @param {string} profileType - Tipo de perfil del usuario (e.g., 'progenitor' o 'educador').
 * @param {Function} reloadUser - Función para recargar los datos de usuario una vez se actualicen.
 * @param {string} userId - ID único del usuario que se está editando.
 * @param {Function} setFormData - Función para actualizar el estado del formulario.
 * @param {Object} formData - Estado del formulario que contiene los datos actuales del usuario.
 */
export default function ModalProfile({ profileType, reloadUser, userId, setFormData, formData }) {
    // Extrae valores y funciones de `useModalProfile` para manejar el estado y las acciones del modal
    const {
        showModal,
        centrosEducativos,
        handleEditClick,
        handleFormSubmit,
        handleInputChange,
        handleModalClose
    } = useModalProfile({ profileType, reloadUser, userId, setFormData, formData });
    
    return (
        <>
            {/* Botón de edición con ícono */}
            <Button onClick={handleEditClick} className="edit-icon" variant="link">
                <FontAwesomeIcon icon={faPencil} />
            </Button>

            {/* Modal para editar el perfil */}
            <Modal show={showModal} onHide={handleModalClose} className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        {/* Campos de formulario comunes para todos los tipos de perfil */}
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre || ''}
                                onChange={handleInputChange}
                                placeholder="Ingrese el nombre"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Primer apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_1"
                                value={formData.apellido_1 || ''}
                                onChange={handleInputChange}
                                placeholder="Ingrese el primer apellido"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Segundo apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_2"
                                value={formData.apellido_2 || ''}
                                onChange={handleInputChange}
                                placeholder="Ingrese el segundo apellido"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                value={formData.telefono || ''}
                                onChange={handleInputChange}
                                placeholder="Ingrese el número de teléfono"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={formData.direccion || ''}
                                onChange={handleInputChange}
                                placeholder="Ingrese la dirección"
                            />
                        </Form.Group>

                        {/* Campos adicionales para 'progenitor' */}
                        {profileType === 'progenitor' && (
                            <Form.Group>
                                <Form.Label>Ocupación</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ocupacion"
                                    value={formData.ocupacion || ''}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese la ocupación"
                                />
                            </Form.Group>
                        )}

                        {/* Campos adicionales para 'educador' */}
                        {profileType === 'educador' && (
                            <>
                                <Form.Group>
                                    <Form.Label>Especialidad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="especialidad"
                                        value={formData.especialidad || ''}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese la especialidad"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Centro educativo</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="centro_educativo"
                                        value={formData.centro_educativo || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona un centro educativo</option>
                                        {centrosEducativos.map((centro) => (
                                            <option key={centro.id} value={centro.nombre}>
                                                {centro.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
