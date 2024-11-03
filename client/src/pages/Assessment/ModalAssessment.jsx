import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el componente de icono de FontAwesome
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de suma
import { Modal, Form, Button } from 'react-bootstrap'; // Importa componentes de react-bootstrap para crear un modal
import { useAssessmentModal } from './useModalAssessment'; // Importa el custom hook que maneja la lógica del modal

// Componente ModalAssessment que recibe el niño, el usuario y una función de actualización de evaluaciones
export default function ModalAssessment({ kid, user, onAssessmentUpdate }) {
    // Utiliza el custom hook para manejar la lógica del modal y los datos de la evaluación
    const {
        showModal,
        handleShow,
        handleClose,
        content,
        setContent,
        loading,
        handleSubmit
    } = useAssessmentModal(kid, user, onAssessmentUpdate); // Desestructura los valores retornados del hook

    return (
        <>
            {/* Botón que abre el modal, activa la función handleShow */}
            <button className='kinder-button' onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Añadir evaluación
            </button>

            {/* Modal que se muestra al hacer clic en el botón */}
            <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Evaluación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario para agregar una nueva evaluación */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBookTitle">
                            <Form.Label>Contenido</Form.Label>
                            <Form.Control
                                as="textarea" // Especifica que el control es un área de texto
                                rows={8} // Número de filas visibles
                                placeholder="Escribe aquí los datos de la evaluación" // Texto de ayuda
                                name="contenido"
                                value={content} // Vincula el contenido del área de texto con el estado
                                onChange={(e) => setContent(e.target.value)} // Actualiza el contenido a medida que el usuario escribe
                                required // Campo requerido
                            />
                        </Form.Group>

                        <Modal.Footer>
                            {/* Botón para enviar el formulario, deshabilitado mientras se carga */}
                            <Button
                                variant="primary" // Estilo del botón
                                type="submit" // Tipo de botón
                                disabled={loading} // Deshabilita el botón si loading es true
                            >
                                {loading ? 'Guardando...' : 'Guardar'} {/* Texto dinámico según el estado de carga */}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
