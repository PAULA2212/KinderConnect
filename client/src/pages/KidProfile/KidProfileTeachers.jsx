import { useContext, useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../Context/UserContext';
import { faBaby, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../App.css';

export default function KidProfileTeachers() {
    const { user } = useContext(UserContext);
    const [niños, setNiños] = useState([]);
    const [formData, setFormData] = useState({
        id_niño: '',
    });
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddClick = () => {
        setFormData({
            id_niño: ''
        });
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    const fetchNiños = async () => {
        try {
            const response = await axiosInstance.get(`/ninos_educadores/${user.id_educador}`);
            const formattedNiños = response.data.map(niño => ({
                ...niño,
                fecha_nac: niño.fecha_nac.split('T')[0] // Extraer solo la parte de la fecha
            }));
            setNiños(formattedNiños);
        } catch (error) {
            console.log('Error al obtener los datos de los niños para los educadores', error);
        }
    };

    const handleAddKids = async () => {
        try {
            const data = {
                id_educador: user.id_educador,
                id_niño: Number(formData.id_niño) // Convertir a número
            };
            console.log('Datos enviados:', data);
            await axiosInstance.post('/linkednino_educador', data); // Enviar datos
            fetchNiños();
            setFormData({
                id_niño: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error al añadir un niño al educador:', error);
        }
    };

    useEffect(() => {
        if (user && user.id_educador) {
            fetchNiños();
        }
    }, [user]);

    return (
        <>
            <h1 className='kinder-title'><FontAwesomeIcon icon={faBaby}/>Perfil de los niños</h1>
            <Button onClick={handleAddClick} className='kinder-button'>
                <FontAwesomeIcon icon={faPlus} /> Añadir nuevo niño
            </Button>
            
            {/* Mostrar los niños */}
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
                            </Card.Title>
                            <Card.Text className="kinder-text">
                                <strong>Primer apellido: </strong> {niño.apellido_1} <br />
                                <strong>Segundo apellido: </strong> {niño.apellido_2} <br />
                                <strong>Fecha nacimiento: </strong> {niño.fecha_nac} <br />
                                <strong>Centro educativo: </strong> {niño.centro_educativo} <br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
            
            {/* Modal para añadir un nuevo niño */}
            <Modal show={showForm} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Niño</Modal.Title>
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
                    <Button variant="primary" onClick={handleAddKids}>
                        <FontAwesomeIcon icon={faPlus} /> Añadir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
