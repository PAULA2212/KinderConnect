import { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../App.css';
import LinkedProfileModal from './LinkedProfileModal';
import AddProfileModal from './AddProfileModal';
import UpdateProfileModal from './UpdateProfileModal';
import { useKidProfileParents } from './useKidProfileParents';

/**
 * Componente KidProfileParents
 *
 * Este componente se encarga de mostrar el perfil de los niños asociados a un progenitor.
 * Permite añadir, vincular y actualizar perfiles de niños a través de modales específicos.
 *
 * Utiliza el contexto de usuario para obtener información sobre el progenitor actual
 * y un hook personalizado para manejar la obtención de los perfiles de los niños.
 *
 * @returns {JSX.Element} Renderiza la interfaz de usuario para el perfil de niños.
 */
export default function KidProfileParents() {
    // Obtiene el contexto de usuario que incluye datos sobre el progenitor actual
    const { user, profileType } = useContext(UserContext);

    // Utiliza el hook personalizado para gestionar los perfiles de los niños
    const { niños, fetchNiños } = useKidProfileParents(user); 

    return (
        <>
            {/* Título de la sección de perfiles de niños */}
            <h1 className='kinder-title'><FontAwesomeIcon icon={faBaby} /> Perfil de los niños</h1>
            
            {/* Contenedor para los botones de añadir y vincular niños */}
            <div className="buttons-container">
                <AddProfileModal 
                    user={user}             // Pasa el objeto de usuario al modal
                    fetchNiños={fetchNiños} // Pasa la función para actualizar la lista de niños
                />
                <LinkedProfileModal 
                    user={user} 
                    profileType={profileType} // Pasa el tipo de perfil al modal de vinculación
                    fetchNiños={fetchNiños}   // Pasa la función para actualizar la lista de niños
                />
            </div>

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
                                {/* Modal para actualizar el perfil del niño */}
                                <UpdateProfileModal kid={niño} fetchNiños={fetchNiños} />
                            </Card.Title>
                            <Card.Text className="kinder-text">
                                {/* Información detallada del niño */}
                                <strong>Código: {niño.unique_code}</strong> (comparte este dato con los educadores o progenitores que quieras que accedan a los datos de tu hij@)<br />
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
