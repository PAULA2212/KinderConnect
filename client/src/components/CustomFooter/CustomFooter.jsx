/* eslint-disable react/prop-types */


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importación del ícono de FontAwesome
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // Importación de íconos de contacto
import './CustomFooter.css'; // Estilos personalizados para el componente
/**
 * CustomFooter Component
 * 
 * Este componente representa el pie de página de la aplicación, proporcionando información de contacto,
 * políticas de privacidad y un mensaje de derechos reservados. Utiliza el contexto de usuario para acceder
 * a la información del usuario actual, aunque en este caso no se utiliza directamente en el renderizado.
 * 
 * Se organiza en columnas utilizando Bootstrap para asegurar una disposición responsiva y centrada,
 * mejorando la experiencia del usuario en diferentes dispositivos.
 */
export default function CustomFooter(props) {

    return (
        <div className={props.className}> {/* Aplica la clase CSS pasada como prop */}
            <footer className="text-white"> {/* Estilo de texto blanco para el pie de página */}
                <div className="container-fluid"> {/* Usar contenedor fluido para ocupar todo el ancho disponible */}
                    <div className="row align-items-center py-4"> {/* Fila con alineación y espaciado vertical */}
                        <div className="col-md-4 mb-3 text-center mb-md-0"> {/* Columna para el mensaje de bienvenida */}
                            <h5>Donde padres y educadores se encuentran.</h5>
                            <a href="/politica-privacidad" className="enlace">Política de Privacidad</a> {/* Enlace a la política de privacidad */}
                        </div>
                        <div className="col-md-4 text-center mb-3 mb-md-0"> {/* Columna para información de contacto */}
                            <h5>Contacto</h5>
                            <p>
                                <FontAwesomeIcon icon={faEnvelope} /> atencionalcliente@kinderconnect.com<br /> {/* Correo electrónico con ícono */}
                                <FontAwesomeIcon icon={faPhone} /> +1 (555) 123-4567 {/* Número de teléfono con ícono */}
                            </p>
                        </div>
                        <div className="col-md-4 text-md-start text-center"> {/* Columna para derechos reservados */}
                            <p className="mb-0">&copy; 2024 KinderConnect. Todos los derechos reservados.</p> {/* Mensaje de derechos reservados */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
