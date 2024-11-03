// MedicalConditions.js
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { faKitMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MedicalModal from "./MedicalModal";
import { Card } from "react-bootstrap";
import { useMedicalCondition } from "./useMedicalCondition";

/**
 * MedicalConditions:
 * Componente de presentación para visualizar y gestionar las condiciones médicas de un niño.
 * Usa el custom hook useMedicalConditions para manejar la lógica de datos.
 *
 * @returns {JSX.Element} - Componente de condiciones médicas
 */
export default function MedicalConditions() {
    const { kid, conditions, handleAddCondition } = useMedicalCondition();
    const { profileType } = useContext(UserContext);

    // Muestra un mensaje cuando no se ha seleccionado ningún niño
    if (!kid) {
        return (
            <>
                <h1 className="kinder-title">
                    <FontAwesomeIcon icon={faKitMedical} /> Condiciones Médicas
                </h1>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                </div>
            </>
        );
    }

    // Renderiza el contenido del componente cuando hay un niño seleccionado
    return (
        <>
            <h1 className="kinder-title">
                <FontAwesomeIcon icon={faKitMedical} /> Condiciones Médicas de {kid.nombre}
            </h1>

            {/* Muestra el modal para añadir condiciones solo si el perfil es progenitor */}
            {profileType === "progenitor" && (
                <MedicalModal kid={kid} onAddCondition={handleAddCondition} />
            )}

            {/* Muestra un mensaje cuando no hay condiciones, o bien la lista de condiciones */}
            {conditions.length === 0 ? (
                <p>No hay condiciones médicas especiales para {kid.nombre}.</p>
            ) : (
                conditions.map((condition) => (
                    <Card key={condition.id_registro} className="kinder-card">
                        <Card.Body>
                            <Card.Title>{condition.titulo}</Card.Title>
                            <Card.Text>{condition.descripcion}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
        </>
    );
}
