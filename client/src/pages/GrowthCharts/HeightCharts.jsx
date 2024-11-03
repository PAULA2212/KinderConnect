import ModalChart from "./ModalCharts"; // Importa el componente para el modal de ingreso de datos
import GrowthTable from "./GrowthTable"; // Importa el componente que muestra la tabla de datos de crecimiento
import GrowthChartLine from "./GrowthChartsLine"; // Importa el componente para mostrar el gráfico de líneas
import './chartsstyles.css'; // Importa los estilos específicos para los gráficos

/**
 * Componente HeightCharts
 *
 * Este componente renderiza una tabla de datos de altura y un gráfico de líneas
 * que visualiza el crecimiento en altura de un niño. También incluye un modal
 * para añadir nuevos datos si el perfil del usuario es 'progenitor'.
 *
 * @param {Object} kid - Objeto que contiene información del niño.
 * @param {String} profileType - Tipo de perfil del usuario ('progenitor' o 'profesional').
 * @param {Array} values - Datos de altura a mostrar en la tabla y en el gráfico.
 * @param {Function} setValues - Función para actualizar el estado de los valores.
 * @param {Function} onAddData - Callback que se llama al añadir nuevos datos.
 * @returns {JSX.Element} - Renderiza la tabla y el gráfico de altura.
 */
export default function HeightCharts({ kid, profileType, values, setValues, onAddData }) {
    // Verificamos los valores que se están pasando a GrowthChartLine para depuración
    console.log('Values passed to GrowthChartLine:', values); // Log de los valores que se pasan al gráfico

    return (
        <>
            <div className='data-Charts'> {/* Contenedor principal para los gráficos y la tabla */}
                <div className="table-Charts"> {/* Contenedor para la tabla y el modal */}
                    <GrowthTable 
                        className='growth-table' // Clase CSS para la tabla
                        values={values} // Valores de altura para la tabla
                        setValues={setValues} // Función para actualizar los valores de la tabla
                        kid={kid} // Información del niño a mostrar en la tabla
                        type={'altura'} // Tipo de dato que se está mostrando (altura)
                        profileType={profileType} //perfil del usuario
                    />
                    {profileType === 'progenitor' && ( // Verifica si el perfil es de un progenitor
                        <ModalChart 
                            type={'altura'} // Tipo de dato para el modal
                            kid={kid} // Información del niño para el modal
                            onAddData={onAddData} // Callback al añadir nuevos datos
                        />
                    )}
                </div>
                <GrowthChartLine 
                    data={values} // Datos de altura que se pasan al gráfico
                    type={'altura'} // Tipo de dato para el gráfico
                    kid={kid} // Información del niño para el gráfico
                />
            </div>
        </>
    );
}
