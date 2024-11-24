// Importaciones necesarias de componentes y librerías
import { Button, Form, Modal } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAddProfileModal } from './useAddProfileModal';

/**
 * Componente AddProfileModal
 * 
 * Este componente permite a los usuarios (progenitores) añadir un perfil de niño 
 * ingresando datos como el nombre, apellidos, fecha de nacimiento y centro educativo.
 * 
 * @param {Function} fetchNiños - Función para actualizar la lista de niños en el componente padre.
 * @param {Object} user - Objeto que contiene los detalles del usuario actual (progenitor).
 */
export default function AddProfileModal({ fetchNiños, user }) {
    // Desestructuración de estados y funciones del hook personalizado useAddProfileModal
    const {
        showForm,          // Estado para controlar si el modal se muestra o no
        setShowForm,       // Función para actualizar el estado de visibilidad del modal
        centros,           // Lista de centros educativos obtenida del servicio
        formData,          // Datos del formulario (nombre, apellidos, fecha, centro)
        handleChange,      // Manejador para actualizar datos de formData
        handleAddClick,    // Manejador para abrir el modal al hacer clic en "Añadir perfil"
        handleAddNiño,   // Función para procesar y enviar los datos del formulario
        loadingCentros //Estado de carga de los centros
    } = useAddProfileModal(fetchNiños, user);

    return (
        <>
            {/* Sección de botón para abrir el formulario de añadir perfil */}
            <div className='button-p'>
                <p>¿Tu hij@ no tiene todavía un perfil?</p>
                <Button onClick={handleAddClick} className='kinder-button'>
                    <FontAwesomeIcon icon={faPlus} /> Añadir perfil
                </Button>
            </div>

            {/* Modal que contiene el formulario para añadir o editar un niño */}
            <Modal
                show={showForm}                  // Controla la visibilidad del modal
                onHide={() => setShowForm(false)} // Cierra el modal al hacer clic fuera o en el botón de cierre
                centered
                className='kinder-modal'
            >
                {/* Encabezado del modal */}
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Niño</Modal.Title>
                </Modal.Header>

                {/* Cuerpo del modal con el formulario de datos */}
                <Modal.Body>
                    <Form onSubmit={handleAddNiño} >
                        {/* Campo de entrada para el nombre del niño */}
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"                  // Asigna el nombre de propiedad en formData
                                value={formData.nombre}        // Enlaza con el valor de formData para el nombre
                                onChange={handleChange}        // Actualiza formData en cada cambio
                                className="form-input"
                                required
                            />
                        </Form.Group>

                        {/* Campo de entrada para el primer apellido */}
                        <Form.Group>
                            <Form.Label>Primer Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_1"               // Asigna el nombre de propiedad en formData
                                value={formData.apellido_1}     // Enlaza con el valor de formData para el primer apellido
                                onChange={handleChange}         // Actualiza formData en cada cambio
                                className="form-input"
                                required
                            />
                        </Form.Group>

                        {/* Campo de entrada para el segundo apellido */}
                        <Form.Group>
                            <Form.Label>Segundo Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_2"               // Asigna el nombre de propiedad en formData
                                value={formData.apellido_2}     // Enlaza con el valor de formData para el segundo apellido
                                onChange={handleChange}         // Actualiza formData en cada cambio
                                className="form-input"
                            />
                        </Form.Group>

                        {/* Campo de entrada para la fecha de nacimiento */}
                        <Form.Group>
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha_nacimiento"         // Asigna el nombre de propiedad en formData
                                value={formData.fecha_nacimiento} // Enlaza con el valor de formData para la fecha de nacimiento
                                onChange={handleChange}           // Actualiza formData en cada cambio
                                className="form-input"
                                required
                            />
                        </Form.Group>

                        {/* Campo de selección para el centro educativo */}
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
                                {loadingCentros ? (
                                    <option>Cargando centros...</option>
                                ) : (
                                    centros.map((centro) => (
                                        <option key={centro.id_centro} value={centro.nombre}>
                                            {centro.nombre}
                                        </option>
                                    ))
                                )}
                            </Form.Control>
                        </Form.Group>
                        {/* Pie del modal con el botón para añadir el niño */}
                        <Modal.Footer>
                            <Button
                                type="submit"         // Llama a handleAddNiño para procesar el formulario
                                className='kinder-button'
                            >
                                Añadir
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>


            </Modal>
        </>
    );
}
