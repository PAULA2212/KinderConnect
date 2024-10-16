import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonDotsFromLine } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { KidContext } from '../../Context/KidContext';
import { UserContext } from "../../Context/UserContext";
import { Link } from 'react-router-dom';
import AllergiesModal from "./AllergiesModal";
import { getAllergensForKid } from "../../services/Allergies/getAllergensForKidService";
import AllergiesTable from "./AllergiesTable";
import './allergies.css';

export default function Allergies() {
    const { kid } = useContext(KidContext);
    const { profileType } = useContext(UserContext);
    const [allergies, setAllergies] = useState([]);

    const fetchAllergies = async () => {
        if (kid && kid.id_niño) {
            try {
                const data = await getAllergensForKid(kid.id_niño);
                console.log('Datos recibidos:', data);
                setAllergies(data);
            } catch (error) {
                console.error('Error al obtener alergias:', error);
            }
        }
    };

    useEffect(() => {
        fetchAllergies();
    }, [kid]);

    const handleAddAllergy = async () => {
        await fetchAllergies(); // Vuelve a obtener las alergias después de agregar una nueva
    };

    const valuesGrave = allergies.filter(allergy => allergy.grado === 'grave');
    const valuesModerada = allergies.filter(allergy => allergy.grado === 'moderado');
    const valuesLeve = allergies.filter(allergy => allergy.grado === 'leve');

    if (kid === null) {
        return (
            <>
                <h1 className="kinder-title"><FontAwesomeIcon icon={faPersonDotsFromLine} />  Alergias</h1>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                    <Link to="/layout/elegirniño">Seleccionar niño</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="kinder-title"><FontAwesomeIcon icon={faPersonDotsFromLine} />  Alergias de {kid.nombre}</h1>
            {profileType === 'progenitor' && (
                <AllergiesModal kid={kid} onAddAllergy={handleAddAllergy} />
            )}
            <div className="tables-container">
                <AllergiesTable type='grave' values={valuesGrave} />
                <AllergiesTable type='moderada' values={valuesModerada} />
                <AllergiesTable type='leve' values={valuesLeve} />
            </div>
        </>
    );
}
