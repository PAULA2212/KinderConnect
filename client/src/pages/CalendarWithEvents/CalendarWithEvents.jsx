// Importaciones necesarias para el componente
import { useState } from 'react'; // useState para manejar el estado del componente
import Calendar from 'react-calendar'; // Componente de calendario
import { OverlayTrigger, Tooltip, Container, Row, Col } from 'react-bootstrap'; // Componentes de Bootstrap para diseño
import 'react-toastify/dist/ReactToastify.css'; // Estilos para notificaciones
import 'react-calendar/dist/Calendar.css'; // Estilos para el calendario
import './CalendarWithEvents.css'; // Estilos personalizados para el componente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Para iconos de FontAwesome
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'; // Icono específico para el calendario
import ModalCalendar from './ModalCalendar'; // Componente para manejar eventos en un modal
import useCalendarWithEvents from './useCalendarWithEvents'; // Hook personalizado para manejar la lógica de eventos

// Componente principal que muestra el calendario con eventos
export default function CalendarWithEvents() {
    // Estado para manejar la fecha seleccionada en el calendario
    const [date, setDate] = useState(new Date());

    // Usar el hook personalizado para obtener eventos, el niño seleccionado y el tipo de perfil
    const { events, fetchEvents, kid, profileType, user } = useCalendarWithEvents();
    console.log(events); // Para depuración: muestra los eventos en la consola

    // Filtrar eventos basados en la fecha seleccionada
    const filteredEvents = Array.isArray(events) ? events.filter((event) => {
        return new Date(event.fecha).toDateString() === date.toDateString(); // Compara las fechas
    }) : []; // Si events no es un array, inicializa como un array vacío


    return (profileType === 'progenitor' && !kid ? (
        <div>
            <h1 className='kinder-title cal'><FontAwesomeIcon icon={faCalendarDays} /> Calendario de eventos</h1>
            <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
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
                    {filteredEvents.length > 0 && ( // Solo mostrar si hay eventos para la fecha seleccionada
                        <>
                            <strong className='kinder-title'>Eventos para el {date.toLocaleDateString()}</strong>
                            <ul>
                                {filteredEvents.map((event, index) => (
                                    <li key={index}>
                                        <strong>{event.nombre} - {event.hora.slice(0, 5)}:</strong>
                                        <p>{event.descripcion}</p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </Col>
            </Row>

            <Row className="mt-4 justify-content-center"> {/* Fila para el modal de agregar eventos */}
                <Col xs={12} className="text-center">
                    {profileType === 'educador' && ( // Solo muestra el modal si el usuario es un educador
                        <ModalCalendar user={user} fetchEvents={fetchEvents} profileType={profileType} />
                    )}
                </Col>
            </Row>
        </Container>
    ))
}
