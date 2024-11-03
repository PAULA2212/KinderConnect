import { Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useModalChart from './useModalCharts'; // Importa el hook personalizado

/**
 * Componente que muestra un modal para ingresar datos de peso o altura de un niño.
 * Permite al usuario añadir una nueva medida y la actualiza en el sistema.
 * 
 * @param {Object} props - Props del componente.
 * @param {string} props.type - Tipo de medida a añadir ('peso' o 'altura').
 * @param {Object} props.kid - Objeto que representa al niño.
 * @param {Function} props.onAddData - Función callback para actualizar los datos tras añadir una medida.
 */
export default function ModalChart({ type, kid, onAddData }) {
    // Utiliza el hook personalizado para manejar la lógica del modal
    const {
        showModal,
        handleShow,
        handleClose,
        handleSubmit,
        value,
        setValue,
        loading
    } = useModalChart(type, kid, onAddData); // Hook para gestionar el modal

    // Determina la unidad de medida en función del tipo de dato ('peso' o 'altura')
    const medida = type === 'peso' ? 'kg' : 'cm';

    return (
        <>
            {/* Botón para abrir el modal */}
            <button className='kinder-button' onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Ingresar {type}
            </button>

            {/* Modal para ingresar la medida */}
            <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir {type === 'peso' ? 'Peso' : 'Altura'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="number" // Tipo de entrada numérica
                                step="0.01" // Permite hasta dos decimales
                                placeholder={`Escribe aquí la nueva medida de ${type} en ${medida}`}
                                name="valor"
                                value={value} // El valor actual ingresado por el usuario
                                onChange={(e) => setValue(e.target.value)} // Actualiza el valor en el estado
                                required // Hace que el campo sea obligatorio
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button
                                variant="primary"
                                type="submit" // Tipo de botón para enviar el formulario
                                disabled={loading} // Desactiva el botón si está en estado de carga
                            >
                                {loading ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
