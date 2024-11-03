import { useContext } from 'react'; // Importa el hook useContext para acceder al contexto del usuario
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para redireccionar al usuario
import Button from 'react-bootstrap/Button'; // Importa el componente Button de react-bootstrap
import { UserContext } from '../../Context/UserContext'; // Importa el contexto del usuario para acceder a la información del usuario
import './Logout.css'; // Importa estilos específicos para el componente Logout

/**
 * Logout Component
 * 
 * Este componente proporciona una funcionalidad de cierre de sesión para los usuarios. 
 * Al hacer clic en el botón "Cerrar Sesión", se limpiará la información del usuario del 
 * contexto, se eliminarán los datos de sesión y se redirigirá al usuario a la página de 
 * inicio de sesión. Este componente es fundamental para asegurar que los usuarios 
 * puedan finalizar su sesión de manera segura.
 */

export default function Logout() {
    const navigate = useNavigate(); // Inicializa el hook para navegar a otras rutas
    const { user, profileType, clearUser } = useContext(UserContext); // Accede al contexto del usuario y a la función para limpiar los datos del usuario

    const handleLogout = () => {
        // Lógica para cerrar sesión
        console.log("Logout clicked"); // Registra en la consola que se hizo clic en el botón de logout
        
        // Limpia el contexto del usuario
        clearUser(); // Llama a la función para limpiar los datos del usuario del contexto
        const idUser = profileType === 'progenitor' ? user?.id_progenitor : user?.id_educador; // Obtiene el ID del usuario según su tipo de perfil
        sessionStorage.removeItem('authToken'); // Elimina el token de autenticación del sessionStorage
        sessionStorage.removeItem('user'); // Elimina los datos del usuario del sessionStorage
        sessionStorage.removeItem(`idKid_${idUser}`); // Elimina los datos del niño asociados al usuario del sessionStorage
        
        // Navega a la página de inicio de sesión
        navigate('/'); // Redirige al usuario a la página de inicio
    };

    return (
        <Button onClick={handleLogout} className="custom-button"> {/* Botón que ejecuta la función de logout */}
            Cerrar Sesión
        </Button>
    );
}
