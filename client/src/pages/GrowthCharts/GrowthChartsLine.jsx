import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Datos de percentiles para 0 a 36 meses
const percentilesWeight = [
    { month: 0, p3: 2.1, p15: 2.5, p50: 3.3, p85: 3.9, p97: 5 },
    { month: 1, p3: 2.9, p15: 3.4, p50: 4.5, p85: 5.1, p97: 6.6 },
    { month: 2, p3: 3.8, p15: 4.3, p50: 5.6, p85: 6.3, p97: 8 },
    { month: 3, p3: 4.4, p15: 5.0, p50: 6.4, p85: 7.2, p97: 9 },
    { month: 4, p3: 4.9, p15: 5.6, p50: 7.0, p85: 7.8, p97: 9.7 },
    { month: 5, p3: 5.3, p15: 6.0, p50: 7.5, p85: 8.4, p97: 10.4 },
    { month: 6, p3: 5.7, p15: 6.4, p50: 7.9, p85: 8.8, p97: 10.9 },
    { month: 7, p3: 5.9, p15: 6.7, p50: 8.3, p85: 9.2, p97: 11.4 },
    { month: 8, p3: 6.2, p15: 6.9, p50: 8.6, p85: 9.6, p97: 11.9 },
    { month: 9, p3: 6.4, p15: 7.1, p50: 8.9, p85: 9.9, p97: 12.3 },
    { month: 10, p3: 6.6, p15: 7.4, p50: 9.2, p85: 10.2, p97: 12.7 },
    { month: 11, p3: 6.8, p15: 7.6, p50: 9.4, p85: 10.5, p97: 13 },
    { month: 12, p3: 6.9, p15: 7.7, p50: 9.6, p85: 10.8, p97: 13.3 },
    { month: 13, p3: 7.1, p15: 7.9, p50: 9.9, p85: 11.0, p97: 13.7 },
    { month: 14, p3: 7.2, p15: 8.1, p50: 10.1, p85: 11.3, p97: 14 },
    { month: 15, p3: 7.4, p15: 8.3, p50: 10.3, p85: 11.5, p97: 14.3 },
    { month: 16, p3: 7.5, p15: 8.4, p50: 10.5, p85: 11.7, p97: 14.6 },
    { month: 17, p3: 7.7, p15: 8.6, p50: 10.7, p85: 12.0, p97: 14.9 },
    { month: 18, p3: 7.8, p15: 8.8, p50: 10.9, p85: 12.2, p97: 15.3 },
    { month: 19, p3: 8.0, p15: 8.9, p50: 11.1, p85: 12.5, p97: 15.6 },
    { month: 20, p3: 8.1, p15: 9.1, p50: 11.3, p85: 12.7, p97: 15.9 },
    { month: 21, p3: 8.2, p15: 9.2, p50: 11.5, p85: 12.9, p97: 16.2 },
    { month: 22, p3: 8.4, p15: 9.4, p50: 11.8, p85: 13.2, p97: 16.5 },
    { month: 23, p3: 8.5, p15: 9.5, p50: 12.0, p85: 13.4, p97: 16.8 },
    { month: 24, p3: 8.6, p15: 9.7, p50: 12.2, p85: 13.6, p97: 17.1 },
    { month: 25, p3: 8.8, p15: 9.8, p50: 12.4, p85: 13.9, p97: 17.5 },
    { month: 26, p3: 8.9, p15: 10.0, p50: 12.5, p85: 14.1, p97: 17.8 },
    { month: 27, p3: 9.0, p15: 10.1, p50: 12.7, p85: 14.3, p97: 18.1 },
    { month: 28, p3: 9.1, p15: 10.2, p50: 12.9, p85: 14.5, p97: 18.4 },
    { month: 29, p3: 9.2, p15: 10.4, p50: 13.1, p85: 14.8, p97: 18.7 },
    { month: 30, p3: 9.4, p15: 10.5, p50: 13.3, p85: 15.0, p97: 19.0 },
    { month: 31, p3: 9.5, p15: 10.7, p50: 13.5, p85: 15.2, p97: 19.3 },
    { month: 32, p3: 9.6, p15: 10.8, p50: 13.7, p85: 15.4, p97: 19.6 },
    { month: 33, p3: 9.7, p15: 10.9, p50: 13.8, p85: 15.6, p97: 19.9 },
    { month: 34, p3: 9.8, p15: 11.0, p50: 14.0, p85: 15.8, p97: 20.2 },
    { month: 35, p3: 9.9, p15: 11.2, p50: 14.2, p85: 16.0, p97: 20.4 },
    { month: 36, p3: 10.0, p15: 11.3, p50: 14.3, p85: 16.2, p97: 20.7 }
  ];
  

  const percentilesHeight = [
    { month: 0, p3: 46.3, p15: 47.9, p50: 49.9, p85: 51.8, p97: 53.4 },
    { month: 1, p3: 51.1, p15: 52.7, p50: 54.7, p85: 56.7, p97: 58.4 },
    { month: 2, p3: 54.7, p15: 56.4, p50: 58.4, p85: 60.5, p97: 62.2 },
    { month: 3, p3: 57.6, p15: 59.3, p50: 61.4, p85: 63.5, p97: 65.3 },
    { month: 4, p3: 60, p15: 61.7, p50: 63.9, p85: 66, p97: 67.8 },
    { month: 5, p3: 61.9, p15: 63.7, p50: 65.9, p85: 68.1, p97: 69.9 },
    { month: 6, p3: 63.6, p15: 65.4, p50: 67.6, p85: 69.8, p97: 71.6 },
    { month: 7, p3: 65.1, p15: 66.9, p50: 69.2, p85: 71.4, p97: 73.2 },
    { month: 8, p3: 66.5, p15: 68.3, p50: 70.6, p85: 72.9, p97: 74.7 },
    { month: 9, p3: 67.7, p15: 69.6, p50: 72, p85: 74.3, p97: 76.2 },
    { month: 10, p3: 69, p15: 70.9, p50: 73.3, p85: 75.6, p97: 77.6 },
    { month: 11, p3: 70.2, p15: 72.1, p50: 74.5, p85: 77, p97: 78.9 },
    { month: 12, p3: 70.1, p15: 73.3, p50: 75.7, p85: 78.2, p97: 80.2 },
    { month: 13, p3: 72.4, p15: 74.4, p50: 76.9, p85: 79.4, p97: 81.5 },
    { month: 14, p3: 73.4, p15: 5.5, p50: 78, p85: 80.6, p97: 82.7 },
    { month: 15, p3: 74.4, p15: 76.5, p50: 79.1, p85: 81.8, p97: 83.9 },
    { month: 16, p3: 75.4, p15: 77.5, p50: 80.2, p85: 82.9, p97: 85.1 },
    { month: 17, p3: 76.3, p15: 78.5, p50: 81.2, p85: 84, p97: 86.2 },
    { month: 18, p3: 77.2, p15: 79.5, p50: 82.3, p85: 85.1, p97: 87.3 },
    { month: 19, p3: 78.1, p15: 80.4, p50: 83.2, p85: 86.1, p97: 88.4 },
    { month: 20, p3: 78.9, p15: 81.3, p50: 84.2, p85: 87.1, p97: 89.5 },
    { month: 21, p3: 79.7, p15: 82.2, p50: 85.1, p85: 88.1, p97: 90.5 },
    { month: 22, p3: 80.5, p15: 83, p50: 86, p85: 89.1, p97: 91.6 },
    { month: 23, p3: 81.3, p15: 83.8, p50: 86.9, p85: 90, p97: 92.6 },
    { month: 24, p3: 82.1, p15: 84.6, p50: 87.8, p85: 91, p97: 93.6 },
    { month: 25, p3: 82.1, p15: 84.7, p50: 88, p85: 91.2, p97: 93.8 },
    { month: 26, p3: 82.8, p15: 85.5, p50: 88.8, p85: 92.1, p97: 94.8 },
    { month: 27, p3: 83.5, p15: 86.3, p50: 89.6, p85: 93, p97: 95.7 },
    { month: 28, p3: 84.2, p15: 87, p50: 90.4, p85: 93.8, p97: 96.6 },
    { month: 29, p3: 84.9, p15: 87.7, p50: 91.2, p85: 94.7, p97: 97.5 },
    { month: 30, p3: 85.5, p15: 88.4, p50: 91.9, p85: 95.5, p97: 98.3 },
    { month: 31, p3: 86.2, p15: 89.1, p50: 92.7, p85: 96.2, p97: 99.2 },
    { month: 32, p3: 86.8, p15: 89.7, p50: 93.4, p85: 97, p97: 100 },
    { month: 33, p3: 87.4, p15: 90.4, p50: 94.1, p85: 97.8, p97: 100.8 },
    { month: 34, p3: 88, p15: 91, p50: 94.8, p85: 98.5, p97: 101.5 },
    { month: 35, p3: 88.5, p15: 91.6, p50: 95.4, p85: 99.2, p97: 102.3 },
    { month: 36, p3: 89.1, p15: 92.2, p50: 96.1, p85: 99.9, p97: 103.1 }
  ];
  

  const calculateAgeInMonths = (date, birthDate) => {
    // Asegúrate de que las fechas son válidas
    if (!date || !birthDate) {
      console.error('Fechas inválidas:', { date, birthDate });
      return NaN;
    }
  
    // Convertir a objetos Date
    const start = new Date(birthDate);
    const end = new Date(date);
  
    // Verifica que ambas fechas son válidas
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error('Conversión de fecha fallida:', { start, end });
      return NaN;
    }
  
    // Calcular la diferencia en meses
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    // Ajusta si los días del mes del final son menores que los del inicio
    if (end.getDate() < start.getDate()) {
      months -= 1;
    }
  
    return Math.max(months, 0); // Asegura que no sea negativo
  };
  
  const GrowthChartLine = ({ data = [], type, kid }) => {
    // Verificación inicial de los datos recibidos
    console.log('Datos recibidos en GrowthChartLine:', data);
    
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Error: 'data' no es un arreglo o está vacío", data);
      return <p>No hay datos para mostrar.</p>;
    }
  
    // Determina los percentiles en función del tipo de datos
    const percentiles = type === 'peso' ? percentilesWeight : percentilesHeight;
  
    // Calcula la edad en meses para cada punto de datos y ajusta los datos con percentiles
    const dataWithPercentiles = data.map(item => {
      const ageInMonths = calculateAgeInMonths(item.fecha, kid.fecha_nac);
      const percentile = percentiles.find(p => p.month === ageInMonths) || {};
      
      console.log('Procesando item:', item);
      console.log('Edad en meses:', ageInMonths);
      console.log('Percentile encontrado:', percentile);
      
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
  
    console.log('Datos finales para el gráfico:', dataWithPercentiles);
  
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={dataWithPercentiles}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="edadMeses" 
            type="number" 
            domain={['auto', 'auto']} 
            tickFormatter={(tick) => `${tick} meses`}
          />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={"valor"} stroke="#ff0000"  strokeWidth={2} name={kid.nombre}/>
          {percentiles.length > 0 && (
            <>
              <Line type="monotone" dataKey="p3" stroke="#3dc0c0" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="p15" stroke="#3dc0c0" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="p50" stroke="#035d6c" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="p85" stroke="#3dc0c0" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="p97" stroke="#3dc0c0" strokeDasharray="5 5" />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  };
  
  export default GrowthChartLine;
