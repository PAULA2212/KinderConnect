/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { Table, Form, Alert } from 'react-bootstrap';
import { KidContext } from '../../Context/KidContext';
import axiosInstance from '../../utils/axiosInstance';
import { calculateAgeAtMilestone } from '../../utils/calculateAge';
import confetti from 'canvas-confetti';

export default function MilestonesTable({ milestones }) {
  const { kid } = useContext(KidContext);
  const [observedMilestones, setObservedMilestones] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const idKid = kid?.id_niño;

  // Fetch milestones for the kid
  const fetchMilestonesForKid = async (idKid) => {
    if (!idKid) return;
    try {
      const response = await axiosInstance.get(`/getMilestonesForKid/${idKid}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching milestones for kid:', error);
      setError('Failed to fetch milestones. Please try again later.');
      return [];
    }
  };

  // Save milestone observation for the kid
  const saveMilestoneForKid = async (idKid, id_hito, edad_conseguida) => {
    try {
      await axiosInstance.post('/saveMilestoneForKid', { idKid, id_hito, edad_conseguida });
      triggerConfetti(); // Trigger confetti on successful save
    } catch (error) {
      console.error('Error saving milestone for kid:', error);
      setError('Failed to save milestone. Please try again later.');
    }
  };

  // Function to trigger confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#b9f0ea', '#f0e5b9', '#3dc0c0', '#f0b9eb'],
      gravity: 0.5, // Ajustar la gravedad para que el confeti se caiga más lentamente
      shapes: ['circle'], // Forma del confeti
      scalar: 1.5
    });
  };

  useEffect(() => {
    const loadObservedMilestones = async () => {
      if (idKid && !loading) {
        setLoading(true);
        try {
          console.log('Loading milestones for kid ID:', idKid);
          const data = await fetchMilestonesForKid(idKid);
          console.log('Observed milestones:', data);
          setObservedMilestones(data);
        } catch (error) {
          console.error('Error fetching milestones for kid:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadObservedMilestones();
  }, [kid]);

  const handleCheckboxChange = async (milestoneId) => {
    console.log(`Checkbox changed for milestone ID: ${milestoneId}`); // Log when checkbox changes
    if (!kid?.fecha_nac) return;

    const ageAchieved = calculateAgeAtMilestone(kid.fecha_nac);
    console.log(`Calculated age achieved: ${ageAchieved}`); // Log the calculated age
    await saveMilestoneForKid(idKid, milestoneId, ageAchieved);

    console.log('Saving milestone for kid...'); // Log saving action
    setObservedMilestones((prevObservedMilestones) => [
      ...prevObservedMilestones.filter((m) => m.id_hito !== milestoneId),
      { id_hito: milestoneId, edad_observado: ageAchieved }
    ]);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((milestone) => {
            const observed = observedMilestones.find((m) => m.id_hito === milestone.id_hito);
            return (
              <tr key={milestone.id_hito}>
                <td>{milestone.descripcion}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{milestone.tipo}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  {observed ? (
                    <span>{observed.edad_observado} meses</span> // Correctly access edad_observada
                  ) : (
                    <Form.Check
                      type="checkbox"
                      onChange={() => handleCheckboxChange(milestone.id_hito)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
