export   const calculateAgeInMonths = (date, birthDate) => {
    // Asegura de que las fechas son válidas
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
  