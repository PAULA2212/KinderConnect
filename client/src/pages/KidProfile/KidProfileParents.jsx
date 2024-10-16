import { useContext, useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../Context/UserContext';
import { faBaby, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../App.css';

export default function KidProfileParents() {
    const { user } = useContext(UserContext);
    const [niños, setNiños] = useState([]);
    const [centros, setCentros] = useState([]);
    const [formData, setFormData] = useState({
        id_niño: '',
        nombre: '',
        apellido_1: '',
        apellido_2: '',
        fecha_nacimiento: '',
        centro_educativo: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [LinkingForm, setLinkingForm] = useState(false);

    // Fetch niños del progenitor
    const fetchNiños = async () => {
        try {
            const response = await axiosInstance.get(`/ninos_padres/${user.id_progenitor}`);
            const formattedNiños = response.data.map(niño => ({
                ...niño,
                fecha_nac: niño.fecha_nac.split('T')[0] // Extraer solo la parte de la fecha
            }));
            setNiños(formattedNiños);
        } catch (error) {
            console.error('Error al obtener los niños:', error);
        }
    };

    // Fetch centros educativos
    const fetchCentros = async () => {
        try {
            const response = await axiosInstance.get('/centros');
            setCentros(response.data);
        } catch (error) {
            console.error('Error al obtener los centros educativos:', error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle add or update niño
    const handleAddOrUpdateNiño = async () => {
        try {
            const id_progenitor = user.id_progenitor;
            const data = {
                id_niño: formData.id_niño,
                id_progenitor: id_progenitor,
                nombre: formData.nombre,
                apellido_1: formData.apellido_1,
                apellido_2: formData.apellido_2,
                fecha_nacimiento: formData.fecha_nacimiento,
                centro_educativo: formData.centro_educativo
            };

            console.log('Datos enviados:', data); // Verifica los datos en la consola

            if (isEditing) {
                // Actualizar el niño existente
                await axiosInstance.post('/datosninos', data);
            } else {
                // Añadir un nuevo niño
                await axiosInstance.post('/datosninos', data);
            }

            fetchNiños();
            setIsEditing(false);
            setFormData({
                id_niño: '',
                nombre: '',
                apellido_1: '',
                apellido_2: '',
                fecha_nacimiento: '',
                centro_educativo: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error al añadir o actualizar el niño:', error);
        }
    };

    const handleLinkClick = () => {
        setLinkingForm(true);
    };

    const handleAddKids = async () => {
        try {
            const data = {
                id_progenitor: user.id_progenitor,
                id_niño: Number(formData.id_niño)
            };
            console.log('Datos enviados:', data);
            await axiosInstance.post('/linkednino_progenitor', data);
            fetchNiños();
            setFormData({
                id_niño: ''
            });
            setLinkingForm(false);
        } catch (error) {
            console.error('Error al añadir un niño al educador:', error);
        }
    };

    // Handle edit button click
    const handleEditClick = (niño) => {
        setFormData({
            id_niño: niño.id_niño,
            nombre: niño.nombre,
            apellido_1: niño.apellido_1,
            apellido_2: niño.apellido_2,
            fecha_nacimiento: niño.fecha_nac,
            centro_educativo: niño.centro_educativo
        });
        setIsEditing(true);
        setShowForm(true);
    };

    const handleAddClick = () => {
        setFormData({
            id_niño: '',
            nombre: '',
            apellido_1: '',
            apellido_2: '',
            fecha_nacimiento: '',
            centro_educativo: ''
        });
        setIsEditing(false);
        setShowForm(true);
    };

    useEffect(() => {
        if (user && user.id_progenitor) {
            fetchNiños();
        }
        fetchCentros();
    }, [user]);

    return (
        <>
            <h1 className='kinder-title'><FontAwesomeIcon icon={faBaby} /> Perfil de los niños</h1>
            <div className="buttons-container">
                <div className='button-p'>
                    <p>¿Tu hij@ no tiene todavia un perfil?</p>
                    <Button onClick={handleAddClick} className='kinder-button'>
                        <FontAwesomeIcon icon={faPlus} /> Añadir perfil
                    </Button>
                </div>
                <div className='button-p'>
                    <p>¿Tu hij@ ya tiene un perfil creado por otro progenitor?</p>
                    <Button onClick={handleLinkClick} className='kinder-button'>
                        <FontAwesomeIcon icon={faPlus} /> Vincular con perfil
                    </Button>
                </div>
            </div>

            {niños.length === 0 ? (
                <Card className="kinder-card mb-3">
                    <Card.Body>
                        <Card.Title className="kinder-title">
                            <div><FontAwesomeIcon icon={faBaby} /> Aún no hay niños</div>
                        </Card.Title>
                    </Card.Body>
                </Card>
            ) : (
                niños.map((niño) => (
                    <Card key={niño.id_niño} className="kinder-card mb-3">
                        <Card.Body>
                            <Card.Title className="kinder-title">
                                <div><FontAwesomeIcon icon={faBaby} /> {niño.nombre}</div>
                                <button
                                    onClick={() => handleEditClick(niño)}
                                    className="edit-icon"
                                >
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                            </Card.Title>
                            <Card.Text className="kinder-text">
                                <strong>ID: {niño.id_niño}</strong> (comparte este dato con los educadores o progenitores que quieras que accedan a los datos de tu hij@)<br />
                                <strong>Primer apellido: </strong> {niño.apellido_1} <br />
                                <strong>Segundo apellido: </strong> {niño.apellido_2} <br />
                                <strong>Fecha nacimiento: </strong> {niño.fecha_nac} <br />
                                <strong>Centro educativo: </strong> {niño.centro_educativo} <br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}

            {/* Modal para añadir o editar un niño */}
            <Modal show={showForm} onHide={() => setShowForm(false)} centered className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Actualizar Niño' : 'Añadir Niño'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Primer Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_1"
                                value={formData.apellido_1}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Segundo Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_2"
                                value={formData.apellido_2}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha_nacimiento"
                                value={formData.fecha_nacimiento}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Centro Educativo</Form.Label>
                            <Form.Control
                                as="select"
                                name="centro_educativo"
                                value={formData.centro_educativo}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="">Seleccionar centro</option>
                                {centros.map((centro) => (
                                    <option key={centro.id_centro} value={centro.nombre}>
                                        {centro.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAddOrUpdateNiño} className='kinder-button'>
                        {isEditing ? 'Actualizar Niño' : 'Añadir Niño'}
                    </Button>

                </Modal.Footer>
            </Modal>

            {/* Modal para vincular un niño */}
            <Modal show={LinkingForm} onHide={() => setLinkingForm(false)} centered className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Vincular Niño</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label><strong>Id del niño:</strong></Form.Label>
                            <Form.Control
                                type="number"
                                name="id_niño"
                                value={formData.id_niño}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAddKids} className='kinder-button'>
                        <FontAwesomeIcon icon={faPlus} /> Vincular
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
