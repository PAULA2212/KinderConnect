import { Button, Form, Modal } from "react-bootstrap";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Diary.css';
import { useTeachersDiaryForm } from "./useTeachersDiaryForm";

/**
 * Componente `TeachersDiaryForm` para capturar y registrar datos diarios de un niño.
 * Este formulario, mostrado dentro de un modal, se utiliza para que los educadores
 * ingresen información detallada sobre el niño seleccionado.
 *
 * @param {Object} props - Parámetros del componente.
 * @param {Object} props.kid - Objeto con los datos del niño seleccionado.
 * @returns {JSX.Element} - Estructura del formulario de entrada de datos.
 */
export default function TeachersDiaryForm({ kid }) {
    // Desestructuración del hook personalizado `useTeachersDiaryForm`
    // para acceder a la lógica del formulario y su estado
    const {
        handleChange,   // Controlador para cambios en los campos del formulario
        handleSave,     // Función para guardar los datos del formulario
        handleClose,    // Función para cerrar el modal
        showModal,      // Estado para controlar la visibilidad del modal
        handleShow,     // Función para mostrar el modal
        formData,        // Estado que almacena los valores de los campos del formulario
        loading
    } = useTeachersDiaryForm({ kid });

    return (
        <>
            {/* Botón que abre el modal del formulario, mostrando el ícono de edición */}
            <button onClick={handleShow} className="edit-icon">
                <FontAwesomeIcon icon={faPencil} />
            </button>

            {/* Modal que contiene el formulario de entrada de datos */}
            <Modal show={showModal} onHide={handleClose} centered className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Introduce los datos del dia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario estructurado en varias secciones */}
                    <Form className="kinder-form form-TeachersDiary" onSubmit={handleSave}>
                        <section>
                            {/* Grupo de control para el campo de Desayuno */}
                            <Form.Group className="form-group" controlId="diaryDesayuno">
                                <Form.Label>Desayuno</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="desayuno"
                                    value={formData.desayuno}
                                    onChange={handleChange}
                                    className="form-input t"
                                    required
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="bien">Bien</option>
                                    <option value="mal">Mal</option>
                                    <option value="regular">Regular</option>
                                </Form.Control>
                            </Form.Group>

                            {/* Grupo de control para el campo de Comida */}
                            <Form.Group className="form-group" controlId="diaryComida">
                                <Form.Label>Comida</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="comida"
                                    value={formData.comida}
                                    onChange={handleChange}
                                    className="form-input t"
                                    required
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="bien">Bien</option>
                                    <option value="mal">Mal</option>
                                    <option value="regular">Regular</option>
                                </Form.Control>
                            </Form.Group>

                            {/* Grupo de control para el campo de Merienda */}
                            <Form.Group className="form-group" controlId="diaryMerienda">
                                <Form.Label>Merienda</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="merienda"
                                    value={formData.merienda}
                                    onChange={handleChange}
                                    className="form-input t"
                                    required
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="bien">Bien</option>
                                    <option value="mal">Mal</option>
                                    <option value="regular">Regular</option>
                                </Form.Control>
                            </Form.Group>
                        </section>

                        {/* Sección de siestas */}
                        <section>
                            <Form.Group className="form-group" controlId="diarySiestaMañana">
                                <Form.Label>Siesta Mañana</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="siesta_mañana"
                                    value={formData.siesta_mañana}
                                    onChange={handleChange}
                                    className="form-input t"
                                    required
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="bien">Bien</option>
                                    <option value="mal">Mal</option>
                                    <option value="regular">Regular</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="diarySiestaTarde">
                                <Form.Label>Siesta Tarde</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="siesta_tarde"
                                    value={formData.siesta_tarde}
                                    onChange={handleChange}
                                    className="form-input t"
                                    required
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="bien">Bien</option>
                                    <option value="mal">Mal</option>
                                    <option value="regular">Regular</option>
                                </Form.Control>
                            </Form.Group>
                        </section>

                        {/* Sección para ingresar cantidades de micciones y deposiciones */}
                        <section>
                            <Form.Group className="form-group" controlId="diaryMicciones">
                                <Form.Label>Micciones</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="micciones"
                                    value={formData.micciones}
                                    onChange={handleChange}
                                    className="form-input t"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="diaryDeposiciones">
                                <Form.Label>Deposiciones</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="deposiciones"
                                    value={formData.deposiciones}
                                    onChange={handleChange}
                                    className="form-input t"
                                    required
                                />
                            </Form.Group>
                        </section>

                        {/* Sección para indicar artículos a traer y comentarios adicionales */}
                        <section>
                            <Form.Group className="form-group" controlId="diaryTraer">
                                <Form.Label>Ahí que traer a clase:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="traer"
                                    value={formData.traer}
                                    onChange={handleChange}
                                    className="form-input t"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="diaryComentarios">
                                <Form.Label>Comentarios</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="comentarios"
                                    value={formData.comentarios}
                                    onChange={handleChange}
                                    className="form-input t"
                                />
                            </Form.Group>
                        </section>
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
