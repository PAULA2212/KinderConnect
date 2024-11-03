import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'; // Asegúrate de tener este archivo CSS
import ModalProfile from './ModalProfile';
import { useProfile } from './useProfile';

/**
 * Componente principal `Profile` que muestra los datos de perfil del usuario
 * en una tarjeta (`Card`). Utiliza `useProfile` para gestionar el estado del perfil y los datos del formulario,
 * proporcionando una interfaz de visualización y edición de la información del usuario.
 *
 * @returns {JSX.Element} - Retorna el componente de perfil de usuario con una tarjeta de visualización de datos y
 * el componente `ModalProfile` para editar el perfil.
 */
export default function Profile() {

    // Extrae los datos y métodos relevantes del hook `useProfile` para gestionar el perfil del usuario.
    const {
        user,              // Información del usuario desde el contexto
        profileType,       // Tipo de perfil: puede ser "progenitor" o "educador"
        reloadUser,        // Función para recargar la información del usuario tras actualizaciones
        userId,            // ID único del usuario
        formData,          // Datos actuales del formulario para edición del perfil
        setFormData        // Función para actualizar los datos del formulario
    } = useProfile();
  
    const defaultText = 'Aún no hay datos'; // Texto predeterminado para campos vacíos

    return (
        <>
            <Card className="kinder-card">
                <Card.Body>
                    <Card.Title className="kinder-title">
                        {/* Título de la tarjeta con icono de usuario */}
                        <div><FontAwesomeIcon icon={faUser} /> Datos de tu perfil</div>
                        
                        {/* Componente `ModalProfile` para edición del perfil; se le pasa el perfil y los métodos de edición */}
                        <ModalProfile profileType={profileType} reloadUser={reloadUser} userId={userId} formData={formData} setFormData={setFormData}/>

                    </Card.Title>
                    <Card.Text className="kinder-text">
                        {/* Visualización de los datos de perfil del usuario o el texto predeterminado si no existen */}
                        <strong>Nombre: </strong> {user?.nombre || defaultText} <br />
                        <strong>Primer apellido: </strong> {user?.apellido_1 || defaultText} <br />
                        <strong>Segundo apellido: </strong> {user?.apellido_2 || defaultText} <br />
                        <strong>Teléfono: </strong> {user?.telefono || defaultText} <br />
                        <strong>Dirección: </strong> {user?.direccion || defaultText} <br />
                        
                        {/* Renderizado condicional de campos adicionales según el `profileType` */}
                        {profileType === 'progenitor' && (
                            <>
                                <strong>Ocupación: </strong> {user?.ocupacion || defaultText} <br />
                            </>
                        )}
                        {profileType === 'educador' && (
                            <>
                                <strong>Especialidad: </strong> {user?.especialidad || defaultText} <br />
                                <strong>Centro educativo: </strong> {user?.centro_educativo || defaultText} <br />
                            </>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}  
