import { useContext, useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import MilestonesTable from './MilestonesTable';
import { KidContext } from '../../Context/KidContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStairs } from '@fortawesome/free-solid-svg-icons';

export default function DevelopmentalMilestones() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { kid } = useContext(KidContext);

  const fetchMilestones = async () => {
    try {
      const response = await axiosInstance.get('/getmilestones'); // Reemplaza con la URL correcta de tu API
      setMilestones(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  // Función para filtrar hitos por rango de edad
  const filterMilestonesByAge = (ageRange) => {
    return milestones.filter((milestone) => milestone.edad_esperada === ageRange);
  };

  // Si no hay un niño seleccionado, mostrar un mensaje
  if (kid === null) {

    return (
      <>
        <h3 className='kinder-title'><FontAwesomeIcon icon={faStairs} />  Hitos del desarrollo</h3>
        <div>
          <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
          <Link to="/layout/elegirniño">Seleccionar niño</Link>
        </div>
      </>

    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3 className='kinder-title'><FontAwesomeIcon icon={faStairs} />  Hitos del desarrollo de {kid.nombre}</h3>
      <Tabs defaultActiveKey="0-3 meses" id="developmental-milestones-tabs" className='m-3'>
        <Tab eventKey="0-3 meses" title="0-3 meses">
          <MilestonesTable milestones={filterMilestonesByAge('0-3 meses')} />
        </Tab>
        <Tab eventKey="4-6 meses" title="4-6 meses">
          <MilestonesTable milestones={filterMilestonesByAge('4-6 meses')} />
        </Tab>
        <Tab eventKey="7-9 meses" title="7-9 meses">
          <MilestonesTable milestones={filterMilestonesByAge('7-9 meses')} />
        </Tab>
        <Tab eventKey="10-12 meses" title="10-12 meses">
          <MilestonesTable milestones={filterMilestonesByAge('10-12 meses')} />
        </Tab>
        <Tab eventKey="13-18 meses" title="13-18 meses">
          <MilestonesTable milestones={filterMilestonesByAge('13-18 meses')} />
        </Tab>
        <Tab eventKey="19-24 meses" title="19-24 meses">
          <MilestonesTable milestones={filterMilestonesByAge('19-24 meses')} />
        </Tab>
        <Tab eventKey="25-36 meses" title="25-36 meses">
          <MilestonesTable milestones={filterMilestonesByAge('25-36 meses')} />
        </Tab>
      </Tabs>
    </>
  );
}
