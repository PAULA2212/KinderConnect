import { useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from "../../utils/axiosInstance";
import { KidContext } from '../../Context/KidContext';
import './Diary.css';

export default function TeachersDiaryForm() {
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Estado para los campos del formulario
    const [formData, setFormData] = useState({
        desayuno: '',
        comida: '',
        merienda: '',
        siesta_mañana: '',
        siesta_tarde: '',
        micciones: '',
        deposiciones: '',
        traer: '',
        comentarios: ''
    });

    const { kid } = useContext(KidContext);

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setSuccessMessage(''); // Limpiar mensaje de éxito al cerrar el modal
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        if (!kid || !kid.id_niño) {
            console.error("No se ha seleccionado un niño.");
            return;
        }

        // Evitar enviar campos vacíos
        const data = {
            id_niño: kid.id_niño,
            fecha: new Date().toISOString().slice(0, 10),  // Fecha actual en formato YYYY-MM-DD
            desayuno: formData.desayuno || null,
            comida: formData.comida || null,
            merienda: formData.merienda || null,
            siesta_mañana: formData.siesta_mañana || null,
            siesta_tarde: formData.siesta_tarde || null,
            micciones: formData.micciones !== '' ? parseInt(formData.micciones, 10) : null,
            deposiciones: formData.deposiciones !== '' ? parseInt(formData.deposiciones, 10) : null,
            traer: formData.traer || null,
            comentarios: formData.comentarios || null
        };

        console.log('Datos a enviar:', data); // Depurar datos a enviar

        try {
            await saveDiaryEntry(data);
            setSuccessMessage(`Tu registro del día ${data.fecha} se ha guardado correctamente.`);
            handleClose();
        } catch (error) {
            setSuccessMessage('Error al guardar los datos.');
            console.error('Error al guardar los datos:', error);
        }
    };

    // Función para enviar los datos al backend
    const saveDiaryEntry = async (data) => {
        try {
            const response = await axiosInstance.post('/diario_educadores/insertar', data);
            return response.data;
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            throw error;
        }
    };

    return (
        <>
            <button onClick={handleShow} className="edit-icon">
                <FontAwesomeIcon icon={faPencil} />
            </button>

            <Modal show={showModal} onHide={handleClose} centered className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Introduce los datos del dia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="kinder-form form-TeachersDiary">
                        <section>
                            <Form.Group className="form-group" controlId="diaryDesayuno">
                                <Form.Label>Desayuno</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="desayuno"
                                    value={formData.desayuno}
                                    onChange={handleChange}
                                    className="form-input t"
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="bien">Bien</option>
                                    <option value="mal">Mal</option>
                                    <option value="regular">Regular</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="diaryComida">
                                <Form.Label>Comida</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="comida"
                                    value={formData.comida}
                                    onChange={handleChange}
                                    className="form-input t"
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="bien">Bien</option>
                                    <option value="mal">Mal</option>
                                    <option value="regular">Regular</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="diaryMerienda">
                                <Form.Label>Merienda</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="merienda"
                                    value={formData.merienda}
                                    onChange={handleChange}
                                    className="form-input t"
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="bien">Bien</option>
                                    <option value="mal">Mal</option>
                                    <option value="regular">Regular</option>
                                </Form.Control>
                            </Form.Group>
                        </section>
                        <section>
                            <Form.Group className="form-group" controlId="diarySiestaMañana">
                                <Form.Label>Siesta Mañana</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="siesta_mañana"
                                    value={formData.siesta_mañana}
                                    onChange={handleChange}
                                    className="form-input t"
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
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="bien">Bien</option>
                                    <option value="mal">Mal</option>
                                    <option value="regular">Regular</option>
                                </Form.Control>
                            </Form.Group>
                        </section>
                        <section>
                            <Form.Group className="form-group" controlId="diaryMicciones">
                                <Form.Label>Micciones</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="micciones"
                                    value={formData.micciones}
                                    onChange={handleChange}
                                    className="form-input t"
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
                                />
                            </Form.Group>
                        </section>
                        <section>
                            <Form.Group className="form-group" controlId="diaryTraer">
                                <Form.Label>Ahi que traer a clase:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="traer"
                                    value={formData.traer}
                                    onChange={handleChange}
                                    className="form-input t"
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
                        {/* Mostrar el mensaje de éxito o error */}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
