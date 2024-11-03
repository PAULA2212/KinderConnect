// Función para calcular la edad en meses a partir de la fecha de nacimiento
export const calculateAgeAtMilestone = (birthDate) => {
  // Crear un objeto Date a partir de la fecha de nacimiento proporcionada
  const birth = new Date(birthDate);
  
  // Crear un objeto Date que representa la fecha actual
  const today = new Date();
  
  // Calcular la diferencia en milisegundos entre la fecha actual y la fecha de nacimiento
  const diff = today.getTime() - birth.getTime();
  
  // Convertir la diferencia de milisegundos a meses (aproximando que un mes tiene 30.436875 días)
  const ageInMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.436875));
  
  // Retornar la edad en meses
  return ageInMonths;
};
