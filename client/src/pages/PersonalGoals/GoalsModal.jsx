import { Modal, Form, Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGoalsModal } from './useGoalsModal';

/**
 * Componente GoalsModal
 * 
 * Este componente representa un modal que permite a los usuarios añadir un nuevo objetivo para un niño específico.
 * Utiliza el hook `useGoalsModal` para manejar la lógica de estado y la funcionalidad del modal.
 *
 * @param {function} onAddGoal - Función para añadir un nuevo objetivo, que se invoca al guardar el objetivo.
 * @param {object} kid - Objeto que representa al niño seleccionado, utilizado para asociar el objetivo con el niño.
 * @param {object} user - Objeto que representa al usuario actual (educador), que crea el objetivo.
 */
export default function GoalsModal({ onAddGoal, kid, user }) {
    // Desestructura los valores y funciones del hook `useGoalsModal`
    const {
        loading,         // Estado que indica si se está guardando el objetivo
        showModal,       // Controla la visibilidad del modal
        handleClose,     // Función para cerrar el modal
        handleShow,      // Función para abrir el modal
        handleSave,      // Función para guardar el objetivo
        goal,            // Contenido del objetivo introducido por el usuario
        setGoal,         // Función para actualizar el contenido del objetivo
    } = useGoalsModal(onAddGoal, kid, user);  // Se pasa `onAddGoal`, `kid`, y `user` al hook

    return (
        <>
            {/* Botón que abre el modal para añadir un nuevo objetivo */}
            <button onClick={handleShow} className="kinder-button">
                <FontAwesomeIcon icon={faPlus} /> Añadir objetivo
            </button>

            {/* Modal que se muestra al abrir el formulario de nuevo objetivo */}
            <Modal show={showModal} onHide={handleClose} centered className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Introduce el nuevo objetivo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario para ingresar el nuevo objetivo */}
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="goal">
                            <Form.Label>Objetivo</Form.Label>
                            <Form.Control
                                type="text"                // Campo de texto para el objetivo
                                placeholder="Ingrese el objetivo" // Texto de placeholder
                                value={goal}               // Valor del campo de texto
                                onChange={(e) => setGoal(e.target.value)} // Actualiza el estado del objetivo al cambiar
                                maxLength={200}            // Limita la longitud del texto a 200 caracteres
                                required                   // Campo requerido
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
