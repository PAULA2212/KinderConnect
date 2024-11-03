import { percentilesHeight, percentilesWeight } from '../../utils/percentiles';
import { calculateAgeInMonths } from '../../utils/calculateAgeInMonths';

/**
 * Hook personalizado useGrowthChartLine
 *
 * Este hook procesa los datos de crecimiento, calcula la edad en meses
 * y asigna los percentiles correspondientes a cada punto de datos.
 *
 * @param {Array} data - Datos de crecimiento.
 * @param {String} type - Tipo de dato ('peso' o 'altura').
 * @param {Object} kid - Objeto que contiene información del niño.
 * @returns {Array} - Datos procesados con percentiles añadidos.
 */
export default function useGrowthChartLine(data, type, kid) {
  // Determina los percentiles en función del tipo de datos
  const percentiles = type === 'peso' ? percentilesWeight : percentilesHeight;

  // Calcula la edad en meses para cada punto de datos y ajusta los datos con percentiles
  const dataWithPercentiles = data.map(item => {
    const ageInMonths = calculateAgeInMonths(item.fecha, kid.fecha_nac); // Calcula la edad en meses
    const percentile = percentiles.find(p => p.month === ageInMonths) || {}; // Encuentra el percentil correspondiente

    return {
      ...item,
      edadMeses: ageInMonths,
      valor: parseFloat(item.valor), // Asegúrate de que 'valor' sea un número
      p3: percentile.p3 || null,
      p15: percentile.p15 || null,
      p50: percentile.p50 || null,
      p85: percentile.p85 || null,
      p97: percentile.p97 || null,
    };
  });

  return dataWithPercentiles; // Retorna los datos procesados
}
