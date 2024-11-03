import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { faBook, faPills, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Diary.css'; 
import { useTeachersDiaryData } from './useTeachersDiaryData';

/**
 * Componente `TeachersDiaryData` que presenta un registro de datos del diario de un niño,
 * proporcionando detalles sobre medicación y comentarios diarios para su consulta por educadores.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.kid - Objeto con los datos del niño seleccionado.
 * @returns {JSX.Element} UI renderizada para mostrar datos diarios de educadores.
 */
export default function TeachersDiaryData({ kid }) {
    // Desestructuración de datos, estado de carga y error obtenidos del hook `useTeachersDiaryData`
    const {
        formatDate,
        loading,
        error,
        dataKid
    } = useTeachersDiaryData({ kid });

    return (
        <Container>
            {/* Muestra un mensaje de carga mientras los datos están siendo recuperados */}
            {loading && <p>Cargando...</p>}
            
            {/* Muestra un mensaje de alerta en caso de error en la carga de datos */}
            {error && <Alert variant="warning">{error}</Alert>}
            
            <Row>
                {/* Renderiza las tarjetas con información del niño si `dataKid` contiene registros */}
                {dataKid.length > 0 && dataKid.map((entry) => (
                    <Col md={4} key={entry.id_registro} className="mb-3">
                        <Card className="diarycard">
                            {/* Encabezado de la tarjeta que muestra la fecha del registro */}
                            <Card.Header>
                                <FontAwesomeIcon icon={faBook} /> {formatDate(entry.fecha)}
                            </Card.Header>
                            
                            <Card.Body>
                                {/* Sección de medicación */}
                                <Card.Title><FontAwesomeIcon icon={faPills} /> Medicaciones</Card.Title>
                                <Card.Text>
                                    {entry.medicacion || 'No hay medicaciones para el día de hoy'}
                                </Card.Text>
                                
                                {/* Sección de comentarios */}
                                <Card.Title><FontAwesomeIcon icon={faComment} /> Comentarios</Card.Title>
                                <Card.Text>
                                    {entry.comentarios || 'No hay comentarios para el día de hoy'}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
