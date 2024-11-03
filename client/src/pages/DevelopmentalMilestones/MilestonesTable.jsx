import { Table, Form, Alert, Button, Row } from 'react-bootstrap';
import useMilestonesTable from './useMilestonesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

/**
 * Componente que muestra una tabla de hitos para un niño específico.
 * Permite al usuario observar hitos y generar un informe en PDF de los mismos.
 *
 * @param {Array} milestones - Lista de hitos a mostrar en la tabla.
 */
export default function MilestonesTable({ milestones }) {
    const {
        observedMilestones,
        error,
        handleCheckboxChange,
        generateReport,
    } = useMilestonesTable(); // Usar el hook para manejar la lógica de hitos

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>} {/* Mostrar mensaje de error si existe */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Observación</th>
                    </tr>
                </thead>
                <tbody>
                    {milestones.map((milestone) => {
                        const observed = observedMilestones.find((m) => m.id_hito === milestone.id_hito);
                        return (
                            <tr key={milestone.id_hito}>
                                <td>{milestone.descripcion}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{milestone.tipo}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {observed ? (
                                        <span>{observed.edad_observado} meses</span> // Mostrar edad observada si existe
                                    ) : (
                                        <Form.Check
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(milestone.id_hito)} // Manejar cambio de checkbox
                                        />
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {/* Botón para generar el informe */}
            <Row className="justify-content-center">
                <Button onClick={() => generateReport(milestones)} className="mt-3 kinder-button">
                    <FontAwesomeIcon icon={faFilePdf} /> Generar Informe
                </Button>
            </Row>
        </>
    );
}
