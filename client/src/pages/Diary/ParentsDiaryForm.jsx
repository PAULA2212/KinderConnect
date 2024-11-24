import { Button, Form, Modal } from "react-bootstrap";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Diary.css';
import { useParentsDiaryForm } from "./useParentsDiaryForm";

/**
 * ParentsDiaryForm Component
 * Este componente representa un formulario modal para que los padres ingresen información diaria relevante,
 * como medicación y comentarios generales.
 * Utiliza un custom hook `useParentsDiaryForm` para manejar la lógica del formulario, incluyendo mostrar
 * y ocultar el modal, y guardar la información ingresada.
 *
 * @returns {JSX.Element} JSX que representa el formulario de diario para los padres.
 */
export default function ParentsDiaryForm({kid}) {
    // Destructuración del custom hook para obtener métodos y estados necesarios
    const {
        handleSave,      // Función para guardar los cambios ingresados en el formulario
        handleShow,      // Función para mostrar el modal
        handleClose,     // Función para cerrar el modal
        showModal,       // Estado booleano que determina si el modal está visible o no
        medicacion,      // Estado para almacenar el valor de medicación
        comentarios,     // Estado para almacenar el valor de comentarios
        setMedicacion,   // Setter para actualizar el valor de medicación
        setComentarios,   // Setter para actualizar el valor de comentarios
        loading           //estado de carga
    } = useParentsDiaryForm({kid});

    return (
        <>
            {/* Botón que abre el modal. Al hacer clic, se llama a handleShow para mostrar el modal */}
            <button onClick={handleShow} className="edit-icon">
                <FontAwesomeIcon icon={faPencil} />
            </button>

            {/* Modal de formulario para ingreso de datos de medicación y comentarios */}
            <Modal show={showModal} onHide={handleClose} centered className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Introduce los datos del día</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Form className="kinder-form form-ParentsDiary" onSubmit={handleSave}>
                        {/* Campo de entrada para la medicación */}
                        <Form.Group controlId="diaryMedication">
                            <Form.Label>Medicación</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la medicación, la dosis y la hora de la toma"
                                value={medicacion}
                                onChange={(e) => setMedicacion(e.target.value)}
                                maxLength={50}
                                className="form-input"
                                required
                            />
                        </Form.Group>
                        
                        {/* Campo de entrada para comentarios generales */}
                        <Form.Group controlId="diaryComments">
                            <Form.Label>Comentarios</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Escriba aquí..."
                                value={comentarios}
                                onChange={(e) => setComentarios(e.target.value)}
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
