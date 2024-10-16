import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye} from '@fortawesome/free-solid-svg-icons';
import ModalAssessment from './ModalAssessment';
import ListAssessment from './ListAssessment';
import axiosInstance from '../../utils/axiosInstance';
import { Link } from 'react-router-dom';
import { KidContext } from '../../Context/KidContext';
import { UserContext } from '../../Context/UserContext';

export default function Assessment() {
  const { kid } = useContext(KidContext);
  const { user, profileType } = useContext(UserContext);
  const [assessments, setAssessments] = useState([]);

  const getAssessmentForKid = async () => {
    if (kid) {
      const idKid = kid.id_niño;
      try {
        const response = await axiosInstance.get(`/getAssessment/${idKid}`);
        setAssessments(response.data);
      } catch (error) {
        console.error('No se han podido obtener las evaluaciones', error);
        setAssessments([]);
      }
    }
  };

  useEffect(() => {
    getAssessmentForKid();
  }, [kid]);

  const handleAssessmentUpdate = () => {
    getAssessmentForKid(); // Refresca la lista cuando se agregan nuevas evaluaciones
  };

  if (!kid) {
    return (
      <>
        <h3 className='kinder-title'>
          <FontAwesomeIcon icon={faEye} /> Evaluaciones
        </h3>
        <div>
          <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
          <Link to="/layout/elegirniño">Seleccionar niño</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="kinder-title">
        <FontAwesomeIcon icon={faEye} /> Evaluaciones de {kid.nombre}
      </h1>
      {profileType === 'educador' && (
        <ModalAssessment kid={kid} user={user} onAssessmentUpdate={handleAssessmentUpdate} />
      )}
      <ListAssessment assessments={assessments} />
    </>
  );
}
