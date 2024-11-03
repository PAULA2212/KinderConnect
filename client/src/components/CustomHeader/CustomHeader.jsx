import { useState, useContext } from 'react'; // Importación de hooks de React
import { Link } from 'react-router-dom'; // Importación para el enrutamiento
import './CustomHeader.css'; // Estilos personalizados para el componente
import customIcon from '../../assets/degradadofondoblanco2.png'; // Importación del ícono personalizado
import Logout from '../Logout/Logout'; // Importación del componente de cierre de sesión
import { UserContext } from '../../Context/UserContext'; // Importación del contexto de usuario
import CustomDropdown from '../CustomDropdown/CustomDropdown'; // Importación del menú desplegable personalizado

/**
 * CustomHeader Component
 * 
 * Este componente representa la cabecera de la aplicación, proporcionando navegación y un acceso rápido
 * a la información del usuario, así como a las opciones de cierre de sesión. Incluye un logotipo personalizado
 * y un menú desplegable que se activa cuando el usuario hace clic en el ícono de usuario.
 * 
 * Utiliza el contexto de usuario para mostrar el nombre del usuario y manejar el estado de carga.
 * También implementa un menú hamburguesa para una mejor usabilidad en dispositivos móviles.
 */

export default function CustomHeader(props) {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura del menú
    const { user, loading } = useContext(UserContext); // Obtiene el usuario y el estado de carga desde el contexto

    const toggleNavbar = () => {
        setIsOpen(!isOpen); // Cambia el estado de apertura del menú
    };

    const closeNavbar = () => {
        setIsOpen(false); // Cierra el menú
    };

    return (
        <div className={props.className}> {/* Clase CSS pasada como prop para personalización */}
            <nav className="navbar"> {/* Elemento de navegación principal */}
                <div className="navbar-container"> {/* Contenedor del menú de navegación */}
                    <div className="navbar-icon-title"> {/* Contenedor para el logotipo y el título */}
                        <Link to="/" className="navbar-logo"> {/* Enlace al inicio */}
                            <img src={customIcon} alt="Icono personalizado de KinderConnect" /> {/* Imagen del logotipo */}
                        </Link>
                        <p className="navbar-title">KinderConnect</p> {/* Título de la aplicación */}
                    </div>
                    <div className={isOpen ? 'navbar-menu active' : 'navbar-menu'}> {/* Menú que se activa según el estado */}
                        <ul className="navbar-items"> {/* Lista de elementos del menú */}
                            <li className={isOpen ? 'navbar-item user-dropdown' : 'navbar-item user'}> {/* Elemento del usuario */}
                                <i className={isOpen ? 'fa-solid fa-user user-icon-dropdown' : 'fa-solid fa-user user-icon'}></i> {/* Ícono del usuario */}
                                {loading ? ( // Muestra "Cargando..." si el estado de carga es verdadero
                                    <p className={isOpen ? 'nombre-dropdown' : 'nombre'}>Cargando...</p>
                                ) : (
                                    <p className={isOpen ? 'nombre-dropdown' : 'nombre'}> {/* Muestra el nombre del usuario o un mensaje alternativo */}
                                        {user ? `${user.nombre} ${user.apellido_1}` : 'Ingresa datos del perfil'}
                                    </p>
                                )}
                            </li>
                            <li className="navbar-item"> {/* Elemento para cerrar sesión */}
                                <Logout onClick={closeNavbar} /> {/* Componente de cierre de sesión que cierra el menú al hacer clic */}
                            </li>
                            {isOpen && ( // Muestra el menú desplegable si el menú está abierto
                                <li className="navbar-item">
                                    <CustomDropdown location="header" onClick={closeNavbar} /> {/* Menú desplegable personalizado */}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="navbar-toggle" onClick={toggleNavbar}> {/* Botón para alternar el menú en dispositivos móviles */}
                        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i> {/* Ícono que cambia según el estado del menú */}
                    </div>
                </div>
            </nav>
        </div>
    );
}
