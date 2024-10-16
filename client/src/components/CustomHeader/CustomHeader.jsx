import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './CustomHeader.css';
import customIcon from '../../assets/degradadofondoblanco2.png';
import Logout from '../Logout/Logout';
import { UserContext } from '../../Context/UserContext';
import CustomDropdown from '../CustomDropdown/CustomDropdown';

export default function CustomHeader(props) {
    console.log('CustomHeader: Component render start');
    const [isOpen, setIsOpen] = useState(false);
    const { user, loading } = useContext(UserContext);

    console.log('CustomHeader: Loading state:', loading);
    console.log('CustomHeader: User:', user);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
        console.log('CustomHeader: Navbar toggled, new state:', !isOpen);
    };

    return (
        // eslint-disable-next-line react/prop-types
        <div className={props.className}>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-icon-title">
                        <Link to="/" className="navbar-logo">
                            <img src={customIcon} alt="Icono personalizado de KinderConnect" />
                        </Link>
                        <p className="navbar-title">KinderConnect</p>
                    </div>
                    <div className={isOpen ? 'navbar-menu active' : 'navbar-menu'}>
                        <ul className="navbar-items">
                            <li className={isOpen ? 'navbar-item user-dropdwon' : 'navbar-item user'}>
                                <i className={isOpen ? 'fa-solid fa-user user-icon-dropdown' : 'fa-solid fa-user user-icon'}></i>
                                {loading ? (
                                    <p className={isOpen ? 'nombre-dropdown' : 'nombre'}>Cargando...</p>
                                ) : (
                                    <p className={isOpen ? 'nombre-dropdown' : 'nombre'}>
                                        {user ? `${user.nombre} ${user.apellido_1}` : 'Ingresa datos del perfil'}
                                    </p>
                                )}
                            </li>
                            <li className="navbar-item">
                                <Logout />
                            </li>
                            {/* Renderizar CustomDropdown solo cuando isOpen es true */}
                            {isOpen && <li className="navbar-item"><CustomDropdown location="header" /></li>}
                        </ul>
                    </div>
                    <div className="navbar-toggle" onClick={toggleNavbar}>
                        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                </div>
            </nav>
        </div>
    );
}