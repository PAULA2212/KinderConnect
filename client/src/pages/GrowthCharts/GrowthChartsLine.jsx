import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from 'recharts';
import useGrowthChartLine from './useGrowthChartsLine'; // Importa el hook personalizado


/**
 * Componente GrowthChartLine
 *
 * Este componente renderiza un gráfico de líneas que muestra los datos de crecimiento
 * (peso o altura) de un niño a lo largo del tiempo, incluyendo los percentiles.
 *
 * @param {Array} data - Datos de crecimiento a mostrar en el gráfico.
 * @param {String} type - Tipo de dato ('peso' o 'altura').
 * @param {Object} kid - Objeto que contiene información del niño.
 * @returns {JSX.Element} - Renderiza el gráfico de líneas o un mensaje si no hay datos.
 */
export default function GrowthChartLine({ data = [], type, kid }) {
  // Verifica si no hay datos disponibles y muestra un mensaje correspondiente
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No hay datos para mostrar.</p>; // Mensaje de error si no hay datos
  }

  // Utiliza el hook personalizado para procesar los datos y calcular percentiles
  const dataWithPercentiles = useGrowthChartLine(data, type, kid);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={dataWithPercentiles} // Datos procesados para el gráfico
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }} // Margen del gráfico
      >
        <CartesianGrid strokeDasharray="3 3" /> {/* Cuadrícula del gráfico */}
        <XAxis
          dataKey="edadMeses" // Clave de datos para el eje X
          type="number" // Tipo de datos para el eje X
          domain={['auto', 'auto']} // Dominio automático para el eje X
          tickFormatter={(tick) => `${tick} meses`} // Formato de etiqueta para el eje X
        />
        <YAxis domain={['auto', 'auto']} /> {/* Dominio automático para el eje Y */}
        <Tooltip /> {/* Muestra un tooltip con información adicional al pasar el mouse */}
        <Legend /> {/* Leyenda del gráfico */}

        {/* Línea del valor real del crecimiento */}
        <Line
          type="monotone" // Tipo de línea para suavizar
          dataKey="valor" // Clave de datos para la línea
          stroke="#ff0000" // Color de la línea
          strokeWidth={2} // Grosor de la línea
          name={kid.nombre} // Nombre del niño para la leyenda
        />

        {/* Renderiza las líneas de percentiles solo si hay datos de percentiles */}
        {dataWithPercentiles.length > 0 && (
          <>
            <Line type="monotone" dataKey="p3" stroke="#3dc0c0" strokeDasharray="5 5" /> {/* Línea del percentil 3 */}
            <Line type="monotone" dataKey="p15" stroke="#3dc0c0" strokeDasharray="5 5" /> {/* Línea del percentil 15 */}
            <Line type="monotone" dataKey="p50" stroke="#035d6c" strokeDasharray="5 5" /> {/* Línea del percentil 50 (mediana) */}
            <Line type="monotone" dataKey="p85" stroke="#3dc0c0" strokeDasharray="5 5" /> {/* Línea del percentil 85 */}
            <Line type="monotone" dataKey="p97" stroke="#3dc0c0" strokeDasharray="5 5" /> {/* Línea del percentil 97 */}
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
