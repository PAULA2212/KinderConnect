import React, { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaStar } from 'react-icons/fa';
import './listassessment.css'; // Asegúrate de tener el archivo de estilos

export default function ListAssessment({ assessments }) {
  // Log para verificar las props recibidas
  console.log('Renderizando ListAssessment con assessments:', assessments);

  useEffect(() => {
    // Log al montar el componente
    console.log('Componente ListAssessment montado');
    return () => {
      // Log al desmontar el componente
      console.log('Componente ListAssessment desmontado');
    };
  }, []);

  if (!assessments || assessments.length === 0) {
    console.log('No hay evaluaciones disponibles para mostrar.');  // Log cuando no hay evaluaciones
    return <p>No hay evaluaciones disponibles.</p>;
  }

  return (
    <VerticalTimeline layout="1-column-left">
      {assessments.map((assessment, index) => {
        console.log(`Renderizando evaluación #${index + 1}:`, assessment);  // Log por cada evaluación
        const dateFormatted = new Date(assessment.fecha).toLocaleDateString();
        return (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#fff', color: '#035d6c', border: '1px solid #035d6c', padding: '1rem' }}
            contentArrowStyle={{ borderRight: '8px solid #035d6c' }}
            iconStyle={{ background: '#035d6c', color: '#fff' }}
            icon={<FaStar />}
          >
            <h3 className="vertical-timeline-element-title kinder-title">{dateFormatted}</h3>
            <p>{assessment.contenido}</p>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
}
