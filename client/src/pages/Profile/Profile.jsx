import { useContext, useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPencil } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../utils/axiosInstance'; // Importa la instancia de Axios personalizada
import '../../App.css'; // Asegúrate de tener este archivo CSS

export default function Profile() {
    const { user, profileType, reloadUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido_1: '',
        apellido_2: '',
        telefono: '',
        direccion: '',
        ocupacion: '',
        especialidad: '',
        centro_educativo: ''
    });
    const [centrosEducativos, setCentrosEducativos] = useState([]);
    const [userId, setUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Función para obtener los centros educativos
        const fetchCentrosEducativos = async () => {
            try {
                const response = await axiosInstance.get('/centros'); // Asegúrate de que la ruta es correcta
                setCentrosEducativos(response.data);
            } catch (error) {
                console.error('Error al obtener centros educativos:', error);
            }
        };

        fetchCentrosEducativos();
    }, []);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser.id); // Obtén el ID directamente del `sessionStorage`

            if (user) {
                setFormData({
                    nombre: user.nombre || '',
                    apellido_1: user.apellido_1 || '',
                    apellido_2: user.apellido_2 || '',
                    telefono: user.telefono || '',
                    direccion: user.direccion || '',
                    ocupacion: user.ocupacion || '',
                    especialidad: user.especialidad || '',
                    centro_educativo: user.centro_educativo || ''
                });
            }
        }
    }, [user, profileType]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // Determinar el campo de ID correcto basado en el tipo de perfil
        const idField = profileType === 'progenitor' ? 'id_progenitor' : 'id_educador';
    
        // Verificar que el ID esté presente
        if (!userId) {
            console.error('Error: ID de perfil no disponible');
            return;
        }
    
        try {
            await axiosInstance.post('/updateProfile', {
                [idField]: userId, // Usa el nombre del campo de ID correcto
                profileType: profileType,
                nombre: formData.nombre,
                apellido_1: formData.apellido_1,
                apellido_2: formData.apellido_2,
                telefono: formData.telefono,
                direccion: formData.direccion,
                ocupacion: formData.ocupacion,
                especialidad: formData.especialidad,
                centro_educativo: formData.centro_educativo
            });
            console.log('Perfil actualizado exitosamente');
            reloadUser();
            handleModalClose();
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    const defaultText = 'Aún no hay datos';

    return (
        <>
            <Card className="kinder-card">
                <Card.Body>
                    <Card.Title className="kinder-title">
                        <div><FontAwesomeIcon icon={faUser} /> Datos de tu perfil</div>
                        <Button
                            onClick={handleEditClick}
                            className="edit-icon"
                            variant="link"
                        >
                            <FontAwesomeIcon icon={faPencil} />
                        </Button>
                    </Card.Title>
                    <Card.Text className="kinder-text">
                        <strong>Nombre: </strong> {user?.nombre || defaultText} <br />
                        <strong>Primer apellido: </strong> {user?.apellido_1 || defaultText} <br />
                        <strong>Segundo apellido: </strong> {user?.apellido_2 || defaultText} <br />
                        <strong>Teléfono: </strong> {user?.telefono || defaultText} <br />
                        <strong>Dirección: </strong> {user?.direccion || defaultText} <br />
                        {profileType === 'progenitor' && (
                            <>
                                <strong>Ocupación: </strong> {user?.ocupacion || defaultText} <br />
                            </>
                        )}
                        {profileType === 'educador' && (
                            <>
                                <strong>Especialidad: </strong> {user?.especialidad || defaultText} <br />
                                <strong>Centro educativo: </strong> {user?.centro_educativo || defaultText} <br />
                            </>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleModalClose} className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Primer apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_1"
                                value={formData.apellido_1}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Segundo apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido_2"
                                value={formData.apellido_2}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {profileType === 'progenitor' && (
                            <Form.Group>
                                <Form.Label>Ocupación</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ocupacion"
                                    value={formData.ocupacion}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        )}
                        {profileType === 'educador' && (
                            <>
                                <Form.Group>
                                    <Form.Label>Especialidad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="especialidad"
                                        value={formData.especialidad}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Centro educativo</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="centro_educativo"
                                        value={formData.centro_educativo}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona un centro educativo</option>
                                        {centrosEducativos.map((centro) => (
                                            <option key={centro.id} value={centro.nombre}>
                                                {centro.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
