import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import GoalsTable from "./GoalsTable";
import GoalsModal from "./GoalsModal";
import { usePersonalGoals } from './usePersonalGoals';

/**
 * Componente `PersonalGoals`
 *
 * Este componente representa la interfaz para visualizar y gestionar los objetivos personales de un niño en particular.
 * La funcionalidad y el estado se gestionan mediante el hook `usePersonalGoals`, lo que facilita el manejo
 * de la lógica en un único lugar. Incluye una tabla de objetivos (`GoalsTable`) y un formulario modal (`GoalsModal`)
 * para agregar nuevos objetivos cuando el perfil del usuario corresponde a un educador.
 */
export default function PersonalGoals() {
  // Extrae los datos y funciones manejadas en `usePersonalGoals`
  const {
    handleAddGoal,
    handleGoalUpdate,
    user,
    profileType,
    goals,
    kid,
    isEducator
  } = usePersonalGoals()

  // Renderiza un mensaje si no se ha seleccionado un niño
  if (kid === null) {
    return (
      <>
        <h3 className='kinder-title'>
          <FontAwesomeIcon icon={faBullseye} />  Objetivos personales
        </h3>
        <div>
          <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Título del componente, que incluye el nombre del niño seleccionado */}
      <h1 className="kinder-title">
        <FontAwesomeIcon icon={faBullseye} />  Objetivos personales para {kid.nombre}
      </h1>
      
      {/* Renderiza `GoalsModal` solo si el perfil corresponde a un educador, permitiendo agregar objetivos */}
      {profileType === 'educador' &&
        <GoalsModal onAddGoal={handleAddGoal} kid={kid} user={user} />}
        
      {/* Renderiza la tabla de objetivos `GoalsTable`, que recibe los objetivos y el callback de actualización */}
      <GoalsTable goals={goals} onGoalUpdate={handleGoalUpdate} kid={kid} isEducator={isEducator}/>
    </>
  );
}
