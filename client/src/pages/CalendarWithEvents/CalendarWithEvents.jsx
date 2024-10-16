import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { Modal, Button, Form, OverlayTrigger, Tooltip, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import './CalendarWithEvents.css';
import { UserContext } from '../../Context/UserContext';
import { KidContext } from '../../Context/KidContext';
import axiosInstance from '../../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export default function CalendarWithEvents() {
    const { user, profileType } = useContext(UserContext);
    const { kid } = useContext(KidContext);
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [kids, setKids] = useState([]);
    const [selectedKids, setSelectedKids] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', time: '' });

    const fetchEvents = async () => {
        try {
            if (profileType === 'progenitor' && kid && kid.id_niño) {
                const response = await axiosInstance.get(`/eventos_nino/${kid.id_niño}`);
                setEvents(response.data);
            } else if (profileType === 'educador' && user) {
                const response = await axiosInstance.get(`/eventos_educador/${user.id_educador}`);
                setEvents(response.data);
            }
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [profileType, kid, user]);

    useEffect(() => {
        const fetchKids = async () => {
            try {
                if (user && profileType === 'educador') {
                    const response = await axiosInstance.get(`/ninos_educadores/${user.id_educador}`);
                    setKids(response.data);
                }
            } catch (error) {
                console.error('Error al obtener los niños:', error);
            }
        };
        fetchKids();
    }, [user, profileType]);

    const handleModalClose = () => setShowModal(false);
    const handleModalOpen = () => setShowModal(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleKidSelectionChange = (e) => {
        const { options } = e.target;
        const selected = [];
        for (const option of options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        setSelectedKids(selected);
    };

    const handleSubmitEvent = async () => {
        try {
            const [hours, minutes] = newEvent.time.split(':');
            const eventDate = new Date(`${newEvent.date}T${newEvent.time}`);
            eventDate.setHours(hours);
            eventDate.setMinutes(minutes);

            const eventToAdd = { ...newEvent, date: eventDate, id_educador: user.id_educador };
            const eventResponse = await axiosInstance.post('/events', eventToAdd);

            // Verifica si la respuesta tiene el campo esperado
            const { id_evento } = eventResponse.data;
            if (!id_evento) {
                throw new Error('ID del evento no recibido');
            }

            await Promise.all(
                selectedKids.map((id_niño) =>
                    axiosInstance.post('/eventos_nino', { id_evento, id_niño })
                )
            );

            // Vuelve a obtener todos los eventos después de añadir uno nuevo
            await fetchEvents();

            toast.success('¡Evento añadido con éxito!');
            handleModalClose();
        } catch (error) {
            toast.error(`Error al añadir el evento: ${error.message}`);
            console.error('Error al añadir el evento:', error);
        }
    };

    return profileType === 'progenitor' && !kid ? (
        <div>
            <h1 className='kinder-title cal'><FontAwesomeIcon icon={faCalendarDays} /> Calendario de eventos</h1>
            <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
            <Link to="/layout/elegirniño">Seleccionar niño</Link>
        </div>
    ) : (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} className="text-center">
                    <h1 className='kinder-title cal'>
                        <FontAwesomeIcon icon={faCalendarDays} />
                        {profileType === 'progenitor' ? `Calendario de eventos para ${kid.nombre}` : 'Calendario de eventos'}
                    </h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileClassName={({ date: calendarDate }) => {
                            return calendarDate.toDateString() === date.toDateString() ? 'selected-day' : null;
                        }}
                        tileContent={({ date, view }) => {
                            const dayEvents = events.filter(
                                (event) => new Date(event.fecha).toDateString() === date.toDateString()
                            );
                            return dayEvents.length > 0 && view === 'month' && (
                                <div className="calendar-events">
                                    {dayEvents.map((event, index) => (
                                        <OverlayTrigger
                                            key={index}
                                            placement="top"
                                            overlay={<Tooltip id={`tooltip-${index}`}>{event.nombre}</Tooltip>}
                                        >
                                            <div className="calendar-event-dot"></div>
                                        </OverlayTrigger>
                                    ))}
                                </div>
                            );
                        }}
                    />
                </Col>
            </Row>

            <Row className="mt-4 justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <strong className='kinder-title'>Eventos para el {date.toLocaleDateString()}</strong>
                    <ul>
                        {events
                            .filter((event) => new Date(event.fecha).toDateString() === date.toDateString())
                            .map((event, index) => (
                                <li key={index}>
                                    <strong>{event.nombre} - {event.hora.slice(0, 5)}:</strong>
                                    <p>{event.descripcion}</p>
                                </li>
                            ))}
                    </ul>
                </Col>
            </Row>
            <Row className="mt-4 justify-content-center">
                <Col xs={12} className="text-center">
                    {profileType === 'educador' && (
                        <Button variant="primary" onClick={handleModalOpen} className="kinder-button">
                            Añadir Evento
                        </Button>
                    )}
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleModalClose} className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Nuevo Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newEvent.title}
                                onChange={handleInputChange}
                                placeholder="Ingrese el título del evento"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={newEvent.description}
                                onChange={handleInputChange}
                                placeholder="Ingrese la descripción del evento"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newEvent.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hora</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={newEvent.time}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Invitar a Niños</Form.Label>
                            <Form.Control as="select" multiple onChange={handleKidSelectionChange}>
                                {kids.map((kid) => (
                                    <option key={kid.id_niño} value={kid.id_niño}>
                                        {kid.nombre} {kid.apellido_1} {kid.apellido_2}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmitEvent}>
                        Guardar Evento
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </Container>
    );
}
