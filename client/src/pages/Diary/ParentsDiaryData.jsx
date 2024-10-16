import { useState, useContext, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { KidContext } from "../../Context/KidContext";
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { faUtensils, faBed, faCommentDots, faListAlt, faPoo, faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Diary.css'; // Asegúrate de que tu CSS esté en la ruta correcta

// Función para obtener los datos del diario para padres
const fetchDiaryForParentsData = async (kidId) => {
    try {
        const response = await axiosInstance.get(`/diario_para_progenitores/${kidId}`);
        console.log('Se han obtenido los siguientes datos fetch:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos del diario para padres:', error);
        throw error;
    }
};

export default function ParentsDiaryData() {
    const { kid } = useContext(KidContext);
    const [dataKid, setDataKid] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Llamar a la función fetchDiaryForParentsData si kid y kid.id_niño están definidos
        const loadData = async () => {
            if (kid && kid.id_niño) {
                setLoading(true);
                setError('');
                try {
                    const data = await fetchDiaryForParentsData(kid.id_niño);
                    setDataKid(data); // Actualiza el estado con los datos obtenidos
                } catch (error) {
                    setError('Todavia no hay registros para el niño.');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('No se ha seleccionado un niño.');
            }
        };

        loadData();
    }, [kid]); // Dependencia en kid para que se ejecute cuando kid cambie

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <Container>
            {loading && <p>Cargando...</p>}
            {error && <Alert variant="warning" className="m-1">{error}</Alert>}

            <Row>
                {dataKid.map((entry) => (
                    <Col md={6} key={entry.id_registro} className="mb-3">
                        <Card className="diarycard">
                            <Card.Header className="text-center">
                                <FontAwesomeIcon icon={faListAlt} /> {formatDate(entry.fecha)}
                            </Card.Header>
                            <Card.Body>
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
