import { useContext, useEffect, useState } from "react";
import { KidContext } from '../../Context/KidContext'
import { UserContext } from "../../Context/UserContext";
import { faKitMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import MedicalModal from "./MedicalModal";
import { getConditions } from "../../services/MedicalConditions/getConditionService";
import { Card } from "react-bootstrap";


export default function MedicalConditions(){
    const {kid} = useContext(KidContext)
    const {profileType} = useContext(UserContext)
    const [conditions, setConditions] = useState([])
    const fetchConditions = async () => {
        if (kid && kid.id_niño) {
            try {
                const data = await getConditions(kid.id_niño);
                console.log('Datos recibidos:', data);
                setConditions(data);
            } catch (error) {
                console.error('Error al obtener condiciones:', error);
            }
        }
    }
    
    useEffect(()=>{
        
        fetchConditions()
    }, [kid])

    const handleAddCondition = async ()=>{
        await fetchConditions()
    }

    if (kid === null) {
        return (
            <>
                <h1 className="kinder-title"><FontAwesomeIcon icon={faKitMedical} />  Condiciones Medicas</h1>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                    <Link to="/layout/elegirniño">Seleccionar niño</Link>
                </div>
            </>
        );
    }
    return(
        <>
        <h1 className="kinder-title"><FontAwesomeIcon icon={faKitMedical} />  Condiciones Medicas de {kid.nombre}</h1>
        {profileType === 'progenitor' && (
            <MedicalModal kid={kid} onAddCondition={handleAddCondition}/>
        )}
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