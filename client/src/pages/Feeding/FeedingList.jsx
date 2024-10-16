import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import './FeedingList.css'; // Archivo CSS para estilos personalizados

export default function FeedingList({ foods }) {
    if (!Array.isArray(foods) || foods.length === 0) {
        return <p>No hay alimentos disponibles.</p>; // Mensaje para el usuario si la lista está vacía
    }

    // Agrupar los alimentos en filas de cuatro
    const groupedFoods = [];
    for (let i = 0; i < foods.length; i += 4) {
        groupedFoods.push(foods.slice(i, i + 4)); // Cada grupo tendrá hasta 4 alimentos
    }

    return (
        <ListGroup>
            {groupedFoods.map((group, index) => (
                <Row key={index} className="mb-2 no-gutters"> {/* Añadí no-gutters para eliminar espacio innecesario */}
                    {group.map((food) => (
                        <Col key={food.id_registro} xs={12} sm={6} md={3} className="feeding-col"> {/* xs={12} sm={6} md={3} adapta columnas */}
                            <ListGroupItem className="feeding-item">
                                {food.alimento ? food.alimento : 'Alimento no disponible'}
                            </ListGroupItem>
                        </Col>
                    ))}
                </Row>
            ))}
        </ListGroup>
    );
}
