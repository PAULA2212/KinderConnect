import { useState } from 'react'; // Importa el hook useState de React para manejar el estado del componente.
import { Link } from 'react-router-dom'; // Importa el componente Link para la navegación entre rutas.
import Dropdown from 'react-bootstrap/Dropdown'; // Importa el componente Dropdown de react-bootstrap para crear menús desplegables.
import Button from 'react-bootstrap/Button'; // Importa el componente Button de react-bootstrap.
import './CustomDropdown.css'; // Importa los estilos CSS personalizados para el componente.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el componente para usar íconos de Font Awesome.
import { faComments, faBars, faImages, faFile, faBaby, faAddressCard, faEnvelope, faBook, faCalendarDays, faGlasses, 
    faStairs, faBullseye, faEye, faChartLine, faHouseMedical, faPersonDotsFromLine, faKitMedical, faUtensils } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos necesarios de Font Awesome.
import KidSelect from '../../pages/KidSelect/KidSelect'; // Importa el componente KidSelect para seleccionar un niño.

/**
 * Componente CustomDropdown
 *
 * Este componente renderiza un menú desplegable que permite la navegación a diferentes secciones de la aplicación,
 * como la galería de imágenes, documentos administrativos y la comunicación.
 * Contiene botones de acción y menús desplegables que agrupan funcionalidades relacionadas con:
 *  - Perfiles (tanto del usuario como del niño)
 *  - Comunicación (mensajería y diario)
 *  - Seguimiento del desarrollo (hitos, objetivos y evaluaciones)
 *  - Salud y bienestar (alergias y condiciones médicas)
 *
 * El componente también incluye un mecanismo para cerrar la barra de navegación 
 * cuando se seleccionan enlaces, mejorando la experiencia del usuario en el contexto del encabezado.
 */
export default function CustomDropdown({ location, closeNavbar }) { 
    const [openDropdown, setOpenDropdown] = useState(null); // Estado que gestiona qué menú desplegable está actualmente abierto.

    /**
     * Maneja el toggle de los menús desplegables, alternando su estado abierto/cerrado.
     *
     * @param {string} id - Identificador del menú que se desea abrir o cerrar.
     */
    const handleToggle = (id) => {
        setOpenDropdown(openDropdown === id ? null : id); // Si el menú está abierto, lo cierra; si no, lo abre.
    };

    /**
     * Maneja el clic en los enlaces, cerrando la barra de navegación si se encuentra en el encabezado.
     *
     * @param {string} to - Ruta a la que se desea navegar.
     */
    const handleLinkClick = (to) => {
        if (location === 'header') {
            closeNavbar(); // Llama a closeNavbar para cerrar el menú hamburguesa en el encabezado.
        }
    };

    return (
        <div className={`custom-dropdown ${location}`}> {/* Contenedor principal del dropdown con estilo basado en la ubicación. */}
            <KidSelect /> {/* Componente para seleccionar un niño, siempre visible en el dropdown. */}
            
            {/* Botones de navegación que dirigen a diferentes secciones */}
            <Button as={Link} to="imagenes" className="custom-button" onClick={() => handleLinkClick('imagenes')}>
                <FontAwesomeIcon icon={faImages} />Galería de Imágenes
            </Button>
            <Button as={Link} to="archivos" className="custom-button" onClick={() => handleLinkClick('archivos')}>
                <FontAwesomeIcon icon={faFile} />Documentos Administrativos
            </Button>
            <Button as={Link} to="asistente-virtual" className="custom-button" onClick={() => handleLinkClick('asistente-virtual')}>
                <FontAwesomeIcon icon={faComments} /> Asistente Virtual
            </Button>

            {/* Menú desplegable para la sección de Perfiles */}
            <Dropdown onClick={() => handleToggle('dropdown-admin-perfiles')} className={openDropdown === 'dropdown-admin-perfiles' ? 'dropdown-open' : ''}>
                <Dropdown.Toggle className="custom-toggle" id="dropdown-admin-perfiles">
                    <FontAwesomeIcon icon={faBars} />Perfiles
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="perfil" className="custom-dropdown-item" onClick={() => handleLinkClick('perfil')}>
                        <FontAwesomeIcon icon={faAddressCard} />Tu Perfil
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="perfilniños" className="custom-dropdown-item" onClick={() => handleLinkClick('perfilniños')}>
                        <FontAwesomeIcon icon={faBaby} />Perfil del niño
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Menú desplegable para la sección de Comunicación */}
            <Dropdown onClick={() => handleToggle('dropdown-comunicacion')} className={openDropdown === 'dropdown-comunicacion' ? 'dropdown-open' : ''}>
                <Dropdown.Toggle className="custom-toggle" id="dropdown-comunicacion">
                    <FontAwesomeIcon icon={faBars} />Comunicación
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="mensajeria" className="custom-dropdown-item" onClick={() => handleLinkClick('mensajeria')}>
                        <FontAwesomeIcon icon={faEnvelope} />Mensajería
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="diario" className="custom-dropdown-item" onClick={() => handleLinkClick('diario')}>
                        <FontAwesomeIcon icon={faBook} />Diario
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="calendario" className="custom-dropdown-item" onClick={() => handleLinkClick('calendario')}>
                        <FontAwesomeIcon icon={faCalendarDays} />Calendario
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="club-lectura" className="custom-dropdown-item" onClick={() => handleLinkClick('club-lectura')}>
                        <FontAwesomeIcon icon={faGlasses} />Club de lectura
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Menú desplegable para la sección de Seguimiento */}
            <Dropdown onClick={() => handleToggle('dropdown-seguimiento')} className={openDropdown === 'dropdown-seguimiento' ? 'dropdown-open' : ''}>
                <Dropdown.Toggle className="custom-toggle" id="dropdown-seguimiento">
                    <FontAwesomeIcon icon={faBars} />Seguimiento
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="hitos-desarrollo" className="custom-dropdown-item" onClick={() => handleLinkClick('hitos-desarrollo')}>
                        <FontAwesomeIcon icon={faStairs} />Hitos del desarrollo
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="objetivos-personales" className="custom-dropdown-item" onClick={() => handleLinkClick('objetivos-personales')}>
                        <FontAwesomeIcon icon={faBullseye} />Objetivos personales
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="evaluaciones" className="custom-dropdown-item" onClick={() => handleLinkClick('evaluaciones')}>
                        <FontAwesomeIcon icon={faEye} />Evaluaciones
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="curvas-crecimiento" className="custom-dropdown-item" onClick={() => handleLinkClick('curvas-crecimiento')}>
                        <FontAwesomeIcon icon={faChartLine} />Curvas de crecimiento
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Menú desplegable para la sección de Salud y Seguridad */}
            <Dropdown onClick={() => handleToggle('dropdown-salud')} className={openDropdown === 'dropdown-salud' ? 'dropdown-open' : ''}>
                <Dropdown.Toggle className="custom-toggle" id="dropdown-salud">
                    <FontAwesomeIcon icon={faHouseMedical} />Seguridad y Salud
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="alergias" className="custom-dropdown-item" onClick={() => handleLinkClick('alergias')}>
                        <FontAwesomeIcon icon={faPersonDotsFromLine} />Alergias
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="condiciones-medicas" className="custom-dropdown-item" onClick={() => handleLinkClick('condiciones-medicas')}>
                        <FontAwesomeIcon icon={faKitMedical} />Condiciones médicas especiales
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="alimentacion" className="custom-dropdown-item" onClick={() => handleLinkClick('alimentacion')}>
                        <FontAwesomeIcon icon={faUtensils} />Alimentación
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
