import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el icono FontAwesome
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de suma
import { Modal, Form, Button } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import { useAllergiesModal } from './useAllergiesModal'; // Importa el hook personalizado que maneja la lógica del modal

// Componente AllergiesModal que recibe un niño y una función callback como props
export default function AllergiesModal({ kid, onAddAllergy }) {
    // Desestructura el hook para obtener el estado y las funciones necesarias
    const {
        showModal,
        loading,
        handleShow,
        handleClose,
        handleSubmit,
        setAllergen,
        setGrade
    } = useAllergiesModal(kid, onAddAllergy); // Pasa kid y onAddAllergy al hook

    return (
        <>
            {/* Botón para abrir el modal, activa la función handleShow */}
            <button className='kinder-button' onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Añadir alergia
            </button>
            {/* Modal que se muestra al hacer clic en el botón */}
            <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir una alergia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario para agregar una nueva alergia */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='allergen'>
                            <Form.Label>Alergeno</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Soja, pescado, cacahuetes.."
                                onChange={(e) => setAllergen(e.target.value)} // Establece el alérgeno
                                required // Campo requerido
                            />
                        </Form.Group>
                        <Form.Group controlId='grade'>
                            <Form.Label>Grado</Form.Label>
                            <Form.Control
                                as='select'
                                onChange={(e) => setGrade(e.target.value)} // Establece el grado
                                required // Campo requerido
                            >
                                <option value=''>Seleccione...</option>
                                <option value='leve'>Leve</option>
                                <option value='moderado'>Moderado</option>
                                <option value='grave'>Grave</option>
                            </Form.Control>
                        </Form.Group>
                        <Modal.Footer>
                            {/* Botón para enviar el formulario, deshabilitado mientras se carga */}
                            <Button type='submit' disabled={loading}>
                                {loading ? 'Enviando' : 'Enviar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
