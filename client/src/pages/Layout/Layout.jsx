// Importación de componentes personalizados
// Este componente Layout importa y estructura los componentes CustomFooter, CustomHeader y CustomSidebar,
// los cuales son elementos de la interfaz reutilizables para el encabezado, pie de página y barra lateral.
// También usa el componente Outlet de react-router-dom para renderizar componentes secundarios
// según la ruta actual.
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import CustomSidebar from "../../components/CustomSidebar/CustomSidebar";
import { Outlet } from 'react-router-dom';
import './Layout.css';

// Componente principal Layout
// Layout define la estructura general de la página usando un sistema de cuadrícula (grid) y asigna
// diferentes áreas (encabezado, contenido principal, barra lateral y pie de página) para facilitar
// una organización consistente en todas las vistas.
export default function Layout() {
    return (
        <div className="grid-container">
            {/* Renderiza el encabezado de la página en la parte superior de la cuadrícula */}
            <CustomHeader className="gridheader" />

            {/* Renderiza el contenido principal en el centro de la cuadrícula */}
            {/* El componente Outlet de react-router-dom actúa como un marcador de posición para
                renderizar componentes secundarios basados en la ruta */}
            <main className="gridmain">
                <Outlet />
            </main>

            {/* Renderiza la barra lateral en una columna dedicada en el diseño de cuadrícula */}
            <CustomSidebar className="gridsidebar" />

            {/* Renderiza el pie de página en la parte inferior de la cuadrícula */}
            <CustomFooter className="gridfooter" />
        </div>
    );
}
