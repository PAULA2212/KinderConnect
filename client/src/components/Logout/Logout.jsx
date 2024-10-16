import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../Context/UserContext'; // Asegúrate de importar el contexto
import './Logout.css';

export default function Logout() {
    const navigate = useNavigate();
    const { user, profileType, clearUser } = useContext(UserContext); // Obtén la función para limpiar el usuario
    

    const handleLogout = () => {
        // Lógica para cerrar sesión
        console.log("Logout clicked");
        
        // Limpia el contexto del usuario
        clearUser();
        const idUser = profileType === 'progenitor' ? user?.id_progenitor : user?.id_educador;
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem(`idKid_${idUser}`)
        
        
        // Navega a la página de login
        navigate('/');
    };

    return (
        <Button onClick={handleLogout} className="custom-button">
            Cerrar Sesión
        </Button>
    );
}
