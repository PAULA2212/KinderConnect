import { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './CustomDropdown.css'; // Asegúrate de que el nombre del archivo CSS esté correctamente escrito
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faBars, faImages, faFile, faBaby, faAddressCard, faChildren, faEnvelope, faBook, faCalendarDays, faGlasses, 
    faStairs, faBullseye, faEye, faChartLine, faHouseMedical, faPersonDotsFromLine, faKitMedical, faUtensils } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
export default function CustomDropdown({ location }) {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleToggle = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    return (
        <div className={`custom-dropdown ${location}`}>
            <Dropdown
                onClick={() => handleToggle('dropdown-admin-perfiles')}
                className={openDropdown === 'dropdown-admin-perfiles' ? 'dropdown-open' : ''}
            >
                <Dropdown.Toggle className="custom-toggle" id="dropdown-admin-perfiles">
                    <FontAwesomeIcon icon={faBars} />Perfiles
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="perfil" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faAddressCard} />Tu Perfil
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="perfilniños" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faBaby} />Perfil del niño
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="elegirniño" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faChildren} />Selecionar niño
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown
                onClick={() => handleToggle('dropdown-comunicacion')}
                className={openDropdown === 'dropdown-comunicacion' ? 'dropdown-open' : ''}
            >
                <Dropdown.Toggle className="custom-toggle" id="dropdown-comunicacion">
                    <FontAwesomeIcon icon={faBars} />Comunicación
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="mensajeria" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faEnvelope} />Mensajería
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="diario" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faBook} />Diario
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="calendario" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faCalendarDays} />Calendario
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="club-lectura" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faGlasses} />Club de lectura
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown
                onClick={() => handleToggle('dropdown-seguimiento')}
                className={openDropdown === 'dropdown-seguimiento' ? 'dropdown-open' : ''}
            >
                <Dropdown.Toggle className="custom-toggle" id="dropdown-seguimiento">
                    <FontAwesomeIcon icon={faBars} />Seguimiento
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="hitos-desarrollo" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faStairs} />Hitos del desarrollo
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="objetivos-personales" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faBullseye} />Objetivos personales
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="evaluaciones" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faEye} />Evaluaciones
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="curvas-crecimiento" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faChartLine} />Curvas de crecimiento
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown
                onClick={() => handleToggle('dropdown-salud')}
                className={openDropdown === 'dropdown-salud' ? 'dropdown-open' : ''}
            >
                <Dropdown.Toggle className="custom-toggle" id="dropdown-salud">
                    <FontAwesomeIcon icon={faHouseMedical} />Seguridad y Salud
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="alergias" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faPersonDotsFromLine} />Alergias
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="condiciones-medicas" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faKitMedical} />Condiciones médicas especiales
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="alimentacion" className="custom-dropdown-item">
                        <FontAwesomeIcon icon={faUtensils} />Alimentación
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Button as={Link} to="imagenes" className="custom-button">
                <FontAwesomeIcon icon={faImages} />Galería de Imágenes
            </Button>
            <Button as={Link} to="archivos" className="custom-button">
                <FontAwesomeIcon icon={faFile} />Documentos Administrativos
            </Button>
            <Button as={Link} to="asistente-virtual" className="custom-button">
                <FontAwesomeIcon icon={faComments} /> Asistente Virtual
            </Button>
        </div>
    );
}
