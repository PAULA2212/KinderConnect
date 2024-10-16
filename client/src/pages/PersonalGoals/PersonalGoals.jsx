// PersonalGoals.js

import { useState, useEffect, useContext } from "react";
import { KidContext } from "../../Context/KidContext";
import { UserContext } from '../../Context/UserContext';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faPlus } from '@fortawesome/free-solid-svg-icons';
import GoalsTable from "./GoalsTable";
import GoalsModal from "./GoalsModal";
import axiosInstance from '../../utils/axiosInstance';

export default function PersonalGoals() {
  const { user, profileType } = useContext(UserContext);
  const { kid } = useContext(KidContext);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (kid) {
      fetchGoals();
    }
  }, [kid]);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/getGoals/${kid.id_niño}`);
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (goal) => {
    setLoading(true);
    try {
      await axiosInstance.post('/saveGoal', goal);
      fetchGoals(); // Refresh goals after adding a new one
    } catch (error) {
      console.error('Error saving goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoalUpdate = () => {
    fetchGoals(); // Refresh goals after updating an existing one
  };

  if (kid === null) {
    return (
      <>
        <h3 className='kinder-title'><FontAwesomeIcon icon={faBullseye} />  Objetivos personales</h3>
        <div>
          <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
          <Link to="/layout/elegirniño">Seleccionar niño</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="kinder-title"><FontAwesomeIcon icon={faBullseye}/>  Objetivos personales para {kid.nombre}  </h1> 
      {profileType === 'educador' &&
        <GoalsModal onAddGoal={handleAddGoal} kid={kid} user={user}/>}
      <GoalsTable goals={goals} loading={loading} onGoalUpdate={handleGoalUpdate} kid={kid} />
    </>
  );
}
