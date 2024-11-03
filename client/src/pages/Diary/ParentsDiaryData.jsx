import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { faUtensils, faBed, faCommentDots, faListAlt, faPoo, faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Diary.css';
import { useParentsDiaryData } from './useParentsDiaryData';

/**
 * Componente que muestra los datos del diario de un niño seleccionado en un formato de tarjeta.
 * Utiliza `useParentsDiaryData` para gestionar el estado de datos, carga y errores.
 *
 * @param {Object} props - Props del componente.
 * @param {Object} props.kid - El objeto que representa al niño seleccionado.
 * @returns {JSX.Element} Componente de UI que renderiza los datos del diario o mensajes de error/carga.
 */
export default function ParentsDiaryData({ kid }) {
    // Desestructuración de datos, estado de carga y errores desde el hook personalizado.
    const {
        loading,
        error,
        dataKid,
        formatDate
    } = useParentsDiaryData({ kid });

    return (
        <Container>
            {/* Indica que los datos están en proceso de carga */}
            {loading && <p>Cargando...</p>}
            
            {/* Muestra un mensaje de alerta si hay un error */}
            {error && <Alert variant="warning" className="m-1">{error}</Alert>}

            <Row>
                {/* Renderiza las tarjetas si `dataKid` contiene datos, de lo contrario no muestra nada */}
                {dataKid.length > 0 && dataKid.map((entry) => (
                    <Col md={6} key={entry.id_registro} className="mb-3">
                        <Card className="diarycard">
                            <Card.Header className="text-center">
                                <FontAwesomeIcon icon={faListAlt} /> {formatDate(entry.fecha)}
                            </Card.Header>
                            <Card.Body>
                                {/* Primer bloque: información de comidas */}
                                <Row>
                                    <Col className="d-flex flex-column align-items-center text-center">
                                        <Card.Title><FontAwesomeIcon icon={faUtensils} /> Desayuno</Card.Title>
                                        <Card.Text>{entry.desayuno || 'No hay información'}</Card.Text>
                                    </Col>
                                    <Col className="d-flex flex-column align-items-center text-center">
                                        <Card.Title><FontAwesomeIcon icon={faUtensils} /> Comida</Card.Title>
                                        <Card.Text>{entry.comida || 'No hay información'}</Card.Text>
                                    </Col>
                                    <Col className="d-flex flex-column align-items-center text-center">
                                        <Card.Title><FontAwesomeIcon icon={faUtensils} /> Merienda</Card.Title>
                                        <Card.Text>{entry.merienda || 'No hay información'}</Card.Text>
                                    </Col>
                                </Row>
                                
                                {/* Segundo bloque: información de siestas */}
                                <Row>
                                    <Col className="d-flex flex-column align-items-center text-center">
                                        <Card.Title><FontAwesomeIcon icon={faBed} /> Siesta Mañana</Card.Title>
                                        <Card.Text>{entry.siesta_mañana || 'No hay información'}</Card.Text>
                                    </Col>
                                    <Col className="d-flex flex-column align-items-center text-center">
                                        <Card.Title><FontAwesomeIcon icon={faBed} /> Siesta Tarde</Card.Title>
                                        <Card.Text>{entry.siesta_tarde || 'No hay información'}</Card.Text>
                                    </Col>
                                </Row>

                                {/* Tercer bloque: información de deposiciones y micciones */}
                                <Row>
                                    <Col className="d-flex flex-column align-items-center text-center">
                                        <Card.Title><FontAwesomeIcon icon={faPoo} /> Deposiciones</Card.Title>
                                        <Card.Text>{entry.deposiciones || 'No hay información'}</Card.Text>
                                    </Col>
                                    <Col className="d-flex flex-column align-items-center text-center">
                                        <Card.Title><FontAwesomeIcon icon={faTint} /> Micciones</Card.Title>
                                        <Card.Text>{entry.micciones || 'No hay información'}</Card.Text>
                                    </Col>
                                </Row>

                                {/* Cuarto bloque: artículos a traer y comentarios */}
                                <Row>
                                    <Col className="d-flex flex-column align-items-center text-center">
                                        <Card.Title><FontAwesomeIcon icon={faListAlt} /> Qué traer</Card.Title>
                                        <Card.Text>{entry.traer || 'No hay información'}</Card.Text>
                                    </Col>
                                    <Col className="d-flex flex-column align-items-center text-center">
                                        <Card.Title><FontAwesomeIcon icon={faCommentDots} /> Comentarios</Card.Title>
                                        <Card.Text>{entry.comentarios || 'No hay comentarios'}</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
