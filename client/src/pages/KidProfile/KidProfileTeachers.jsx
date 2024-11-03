import { Card } from 'react-bootstrap';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../App.css';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import LinkedProfileModal from './LinkedProfileModal';
import useKidProfileTeachers from './useKidProfileTeachers';

/**
 * Componente KidProfileTeachers
 *
 * Este componente se encarga de mostrar el perfil de los niños asociados a un educador.
 * Permite vincular perfiles de niños a través de un modal específico.
 *
 * Utiliza el custom hook useKidProfileTeachers para obtener información sobre los niños
 * y renderiza una lista con sus detalles.
 *
 * @returns {JSX.Element} Renderiza la interfaz de usuario para el perfil de niños.
 */
export default function KidProfileTeachers() {
    const [niños, fetchNiños] = useKidProfileTeachers(); // Llama al custom hook para obtener niños
    const { user, profileType } = useContext(UserContext); // Se asume que se usa el contexto de usuario

    return (
        <>
            {/* Título de la sección de perfiles de niños */}
            <h1 className='kinder-title'><FontAwesomeIcon icon={faBaby} /> Perfil de los niños</h1>
            {/* Modal para vincular perfiles de niños */}
            <LinkedProfileModal user={user} fetchNiños={fetchNiños} profileType={profileType} />

            {/* Renderiza un mensaje si no hay niños asociados */}
            {niños.length === 0 ? (
                <Card className="kinder-card mb-3">
                    <Card.Body>
                        <Card.Title className="kinder-title">
                            <div><FontAwesomeIcon icon={faBaby} /> Aún no hay niños</div>
                        </Card.Title>
                    </Card.Body>
                </Card>
            ) : (
                // Mapea los niños y genera una tarjeta por cada uno
                niños.map((niño) => (
                    <Card key={niño.id_niño} className="kinder-card mb-3">
                        <Card.Body>
                            <Card.Title className="kinder-title">
                                <div><FontAwesomeIcon icon={faBaby} /> {niño.nombre}</div>
                            </Card.Title>
                            <Card.Text className="kinder-text">
                                {/* Información detallada del niño */}
                                <strong>Primer apellido: </strong> {niño.apellido_1} <br />
                                <strong>Segundo apellido: </strong> {niño.apellido_2} <br />
                                <strong>Fecha nacimiento: </strong> {niño.fecha_nac} <br />
                                <strong>Centro educativo: </strong> {niño.centro_educativo} <br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
        </>
    );
}
