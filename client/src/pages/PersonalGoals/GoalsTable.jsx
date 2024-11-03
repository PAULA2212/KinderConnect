import { Table, Form } from 'react-bootstrap';
import { useGoalsTable } from './useGoalsTable';

/**
 * Componente `GoalsTable`
 *
 * Este componente muestra una tabla de objetivos asociados a un niño específico (`kid`). Utiliza el hook
 * `useGoalsTable` para obtener los nombres de los educadores y gestionar los cambios de estado en los objetivos.
 * Incluye manejo de carga (`loading`) y actualización de objetivos a través de un callback (`onGoalUpdate`).
 *
 * @param {Array} goals - Array de objetivos a mostrar, cada uno asociado a un educador.
 * @param {boolean} loading - Indicador de carga para mostrar un mensaje de "Cargando..." en la UI.
 * @param {Function} onGoalUpdate - Callback para notificar al componente superior sobre la actualización de un objetivo.
 * @param {Object} kid - Objeto del niño asociado a estos objetivos, que contiene su información básica (e.g., nombre).
 * @param {boolean} isEducator - Indica si el usuario actual es un educador.
 */
export default function GoalsTable({ goals, loading, onGoalUpdate, kid, isEducator }) {
  
  // Extrae `teacherNames` y `handleCheckboxChange` del hook `useGoalsTable`
  const {
    teacherNames,
    handleCheckboxChange
  } = useGoalsTable({goals, onGoalUpdate});  // Pasa `onGoalUpdate` como dependencia del hook para actualización
  
  // Muestra mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Muestra mensaje si no existen objetivos para el niño actual (`kid`)
  if (goals.length === 0) {
    return <p className='m-2'>Aún no hay objetivos para {kid.nombre}.</p>;
  }

  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Objetivo</th>
          <th>Educador</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {goals.map((goal) => (
          <tr key={goal.id_registro}>
            {/* Muestra el contenido del objetivo */}
            <td>{goal.contenido}</td>
            
            {/* Muestra el nombre del educador obtenido desde `teacherNames` o un mensaje de carga */}
            <td>{teacherNames[goal.id_educador] || 'Cargando...'}</td>
            
            {/* Manejo del estado del objetivo mediante checkbox o texto del estado */}
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              {isEducator && goal.estado === 'pendiente' ? (
                // Checkbox para marcar como "conseguido" si el estado actual es "pendiente" y el usuario es un educador
                <Form.Check
                  type="checkbox"
                  onChange={() => handleCheckboxChange(goal.id_registro)}
                />
              ) : (
                // Muestra el estado actual si no es "pendiente" o el usuario no es educador
                <span>{goal.estado}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
