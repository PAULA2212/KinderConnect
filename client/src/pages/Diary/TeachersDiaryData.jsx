import { useState, useContext, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { KidContext } from "../../Context/KidContext";
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { faBook, faPills, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Diary.css'; // Asegúrate de que tu CSS esté en la ruta correcta

// Función para obtener los datos del diario del niño
const fetchDiaryParentsData = async (kidId) => {
    try {
        const response = await axiosInstance.get(`/diario_para_educadores/${kidId}`);
        console.log('Se han obtenido los siguientes datos fetch:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos del diario del niño:', error);
        throw error;
    }
};

export default function TeachersDiaryData() {
    const { kid } = useContext(KidContext);
    const [dataKid, setDataKid] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Llamar a la función fetchDiaryParentsData si kid y kid.id_niño están definidos
        const loadData = async () => {
            if (kid && kid.id_niño) {
                setLoading(true);
                setError('');
                try {
                    const data = await fetchDiaryParentsData(kid.id_niño);
                    setDataKid(data); // Actualiza el estado con los datos obtenidos
                } catch (error) {
                    setError('Todavia no hay datos para este niño.');
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
            {error && <Alert variant="warning">{error}</Alert>}
            
            <Row>
                {dataKid.map((entry) => (
                    <Col md={4} key={entry.id_registro} className="mb-3">
                        <Card className="diarycard">
                            <Card.Header>
                                <FontAwesomeIcon icon={faBook} /> {formatDate(entry.fecha)}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon icon={faPills} /> Medicaciones</Card.Title>
                                <Card.Text>
                                    {entry.medicacion || 'No hay medicaciones para el día de hoy'}
                                </Card.Text>
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
