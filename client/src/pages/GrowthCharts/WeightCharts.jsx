import GrowthChartLine from "./GrowthChartsLine"; // Importa el componente para mostrar el gráfico de líneas de peso
import GrowthTable from "./GrowthTable"; // Importa el componente que muestra la tabla de datos de peso
import ModalChart from "./ModalCharts"; // Importa el componente para el modal de ingreso de datos
import './chartsstyles.css'; // Importa los estilos específicos para los gráficos

/**
 * Componente WeightCharts
 *
 * Este componente renderiza una tabla de datos de peso y un gráfico de líneas
 * que visualiza el crecimiento en peso de un niño. También incluye un modal
 * para añadir nuevos datos si el perfil del usuario es 'progenitor'.
 *
 * @param {Object} kid - Objeto que contiene información del niño.
 * @param {String} profileType - Tipo de perfil del usuario ('progenitor' o 'profesional').
 * @param {Array} values - Datos de peso a mostrar en la tabla y en el gráfico.
 * @param {Function} setValues - Función para actualizar el estado de los valores.
 * @param {Function} onAddData - Callback que se llama al añadir nuevos datos.
 * @returns {JSX.Element} - Renderiza la tabla y el gráfico de peso.
 */
export default function WeightCharts({ kid, profileType, values, setValues, onAddData }) {
  return (
    <>
      <div className="data-Charts"> {/* Contenedor principal para los gráficos y la tabla */}
        <div className="table-Charts"> {/* Contenedor para la tabla y el modal */}
          <GrowthTable 
            className='growth-table' // Clase CSS para la tabla
            values={values} // Valores de peso para la tabla
            setValues={setValues} // Función para actualizar los valores de la tabla
            kid={kid} // Información del niño a mostrar en la tabla
            type={'peso'} // Tipo de dato que se está mostrando (peso)
            profileType={profileType}
          />
          {profileType === 'progenitor' && ( // Verifica si el perfil es de un progenitor
            <ModalChart 
              type={'peso'} // Tipo de dato para el modal
              kid={kid} // Información del niño para el modal
              onAddData={onAddData} // Callback al añadir nuevos datos
            />
          )}
        </div>
        <GrowthChartLine 
          data={values} // Datos de peso que se pasan al gráfico
          type={'peso'} // Tipo de dato para el gráfico
          kid={kid} // Información del niño para el gráfico
        />
      </div>
    </>
  );
}
