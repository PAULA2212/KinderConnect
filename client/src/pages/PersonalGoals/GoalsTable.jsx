/* eslint-disable react/prop-types */
// GoalsTable.js

import { Table, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function GoalsTable({ goals, loading, onGoalUpdate, kid }) {
  const [teacherNames, setTeacherNames] = useState({});

  useEffect(() => {
    const fetchTeacherNames = async () => {
      const uniqueEducators = [...new Set(goals.map(goal => goal.id_educador))];
      const names = {};

      for (const id of uniqueEducators) {
        try {
          const response = await axiosInstance.get(`/detalleUsuario/${id}/educador`);
          names[id] = `${response.data.nombre} ${response.data.apellido_1}`;
        } catch (error) {
          console.error(`Error fetching teacher with ID ${id}:`, error);
          names[id] = 'Nombre no disponible';
        }
      }

      setTeacherNames(names);
    };

    if (goals.length > 0) {
      fetchTeacherNames();
    }
  }, [goals]);

  const changeGoalState = async (goalId, newState) => {
    try {
      await axiosInstance.put(`/updateGoal/${goalId}`, { estado: newState });
      // Notify the parent component that a goal has been updated
      if (onGoalUpdate) onGoalUpdate(); // Refresh goals after changing state
    } catch (error) {
      console.error('Error updating goal state:', error);
    }
  };

  const handleCheckboxChange = async (goalId) => {
    const goal = goals.find(g => g.id_registro === goalId);
    if (goal.estado === 'pendiente') {
      const newState = 'conseguido';
      await changeGoalState(goalId, newState);
    }
  };

  // Render message if no goals are available
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (goals.length === 0) {
    return <p className='m-2'>Aún no hay objetivos para {kid.nombre}.</p>;
  }

  return (
    <Table striped bordered hover>
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
            <td>{goal.contenido}</td>
            <td>{teacherNames[goal.id_educador] || 'Cargando...'}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              {goal.estado === 'pendiente' ? (
                <Form.Check
                  type="checkbox"
                  onChange={() => handleCheckboxChange(goal.id_registro)}
                />
              ) : (
                goal.estado
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
