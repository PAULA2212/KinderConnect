import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFeedingModal } from './useFeedingModal';

/**
 * Componente `FeedingModal`
 * 
 * Este componente representa un modal que permite a los usuarios agregar un nuevo alimento
 * para el niño seleccionado. Proporciona un formulario de entrada con validación, 
 * feedback visual de carga y notificaciones.
 * 
 * @param {Object} kid - Objeto que representa al niño seleccionado, incluye un id necesario para el envío.
 * @param {Function} onAddFood - Función de callback para actualizar la lista de alimentos tras la adición exitosa.
 */
export default function FeedingModal({ kid, onAddFood }) {
    // Desestructura el hook `useFeedingModal`, que contiene toda la lógica de estado y funciones para este modal
    const {
        food,
        loading,
        showModal,
        openModal,
        closeModal,
        handleSubmit,
        handleChange,
    } = useFeedingModal({ kid, onAddFood });

    return (
        <>
            {/* Botón principal que abre el modal de alimentación cuando el usuario desea agregar un alimento nuevo */}
            <button className='kinder-button' onClick={openModal}>
                <FontAwesomeIcon icon={faPlus} /> Añadir
            </button>

            {/* Modal de alimentación */}
            <Modal show={showModal} onHide={closeModal} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir un nuevo alimento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario para ingresar el alimento */}
                    <Form onSubmit={handleSubmit}>
                        {/* Grupo de formulario para el campo de entrada del nombre del alimento */}
                        <Form.Group controlId='food'>
                            <Form.Label>Alimento</Form.Label>
                            {/* Campo de entrada de texto donde el usuario escribe el nombre del alimento */}
                            <Form.Control
                                type='text'
                                required
                                placeholder='zanahoria, lechuga, pavo, tomate..'
                                name='food'
                                value={food}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {/* Botón de envío en el pie del modal, desactivado mientras el alimento se guarda */}
                        <Modal.Footer>
                            <Button type='submit' disabled={loading}>
                                {loading ? 'Guardando..' : 'Guardar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
