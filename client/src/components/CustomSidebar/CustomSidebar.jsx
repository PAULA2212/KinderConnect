import CustomDropdown from "../CustomDropdown/CustomDropdown"; // Importación del componente de menú desplegable personalizado

/**
 * CustomSidebar Component
 * 
 * Este componente representa una barra lateral personalizada que contiene un menú desplegable.
 * Se utiliza para proporcionar navegación adicional y funcionalidades relacionadas con la 
 * aplicación. La barra lateral se puede personalizar mediante clases CSS pasadas como props.
 * 
 * Este componente simplemente renderiza el menú desplegable en la ubicación de la barra lateral.
 */

export default function CustomSidebar(props) {
    return (
        <div className={props.className}> {/* Clase CSS pasada como prop para permitir personalización */}
            <CustomDropdown location="sidebar" /> {/* Renderiza el menú desplegable en la barra lateral */}
        </div>
    );
}
